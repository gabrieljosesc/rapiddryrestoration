"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { markPendingLead } from "@/lib/analytics";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { CheckCircleIcon, PhoneIcon } from "@/components/Icons";

type Status = "idle" | "sending" | "sent" | "error";

function readUtm(): Record<string, string> | null {
  try {
    const p = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"];
    const out: Record<string, string> = {};
    for (const k of keys) {
      const v = p.get(k);
      if (v) out[k] = v;
    }
    return Object.keys(out).length ? out : null;
  } catch {
    return null;
  }
}

/**
 * The short emergency form the brief asks for on every page:
 * name, phone, address, what happened. `variant="band"` is the compact
 * horizontal layout that sits above the footer; `variant="card"` is the full
 * card used on the contact page, with optional email + service + insurance.
 */
export function EmergencyForm({
  variant = "card",
  kind = "emergency",
  heading,
  intro,
}: {
  variant?: "card" | "band";
  kind?: "emergency" | "contact";
  heading?: string;
  intro?: string;
}) {
  const pathname = usePathname();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind, source_page: pathname, utm: readUtm() }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      setStatus("sent");
      markPendingLead(String(json.id));
      window.location.assign(`/thank-you?id=${encodeURIComponent(String(json.id))}&kind=${kind}`);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please call us.");
    }
  }

  const busy = status === "sending" || status === "sent";
  const uid = variant === "band" ? "b" : "c";

  if (variant === "band") {
    return (
      <section className="eform-band" aria-labelledby="eform-band-title">
        <div className="container eform-band__inner">
          <div>
            <span className="eyebrow">Need help now?</span>
            <h2 className="section-title" id="eform-band-title">
              {heading ?? "Tell us what happened. We'll call you back in minutes."}
            </h2>
            <p className="section-lead">
              {intro ??
                "For active flooding, calling is fastest. Otherwise send the details and a dispatcher will call you right back, day or night."}
            </p>
            <ul className="eform-band__points">
              <li>
                <CheckCircleIcon size={20} /> We bill your insurance directly
              </li>
              <li>
                <CheckCircleIcon size={20} /> {site.responsePromise} across the GTA
              </li>
              <li>
                <CheckCircleIcon size={20} /> Live answer 24/7, 365 days
              </li>
            </ul>
            <div className="actions mt-3">
              <CallLink location="form-band" className="btn btn--red">
                <PhoneIcon size={18} /> Call {site.phone}
              </CallLink>
            </div>
          </div>

          <form className="eform form" onSubmit={handleSubmit} noValidate>
            {status === "error" && error && <div className="form__error">{error}</div>}
            <div className="form__row form__row--3">
              <div className="field">
                <label htmlFor={`name-${uid}`}>Name</label>
                <input id={`name-${uid}`} name="name" type="text" autoComplete="name" required maxLength={120} />
              </div>
              <div className="field">
                <label htmlFor={`phone-${uid}`}>Phone</label>
                <input id={`phone-${uid}`} name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={40} />
              </div>
              <div className="field">
                <label htmlFor={`address-${uid}`}>Address</label>
                <input id={`address-${uid}`} name="address" type="text" autoComplete="street-address" required maxLength={300} placeholder="Street, city" />
              </div>
            </div>
            <div className="field">
              <label htmlFor={`what-${uid}`}>What happened?</label>
              <textarea id={`what-${uid}`} name="what_happened" required maxLength={3000} placeholder="e.g. Basement flooded overnight, about 2 inches of water, still coming in" style={{ minHeight: 84 }} />
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor={`company-${uid}`}>Company</label>
              <input id={`company-${uid}`} name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <button type="submit" className="btn btn--blue btn--lg btn--block" disabled={busy}>
              {busy ? "Sending…" : "Request Emergency Help"}
            </button>
            <p className="form__note">
              No obligation. Your details are used only to dispatch help and are never shared.
            </p>
          </form>
        </div>
      </section>
    );
  }

  return (
    <form className="eform form" onSubmit={handleSubmit} noValidate>
      {(heading || intro) && (
        <div className="eform__head">
          {heading && <h3>{heading}</h3>}
          {intro && <p>{intro}</p>}
        </div>
      )}
      {status === "error" && error && <div className="form__error">{error}</div>}
      <div className="form__row">
        <div className="field">
          <label htmlFor={`name-${uid}`}>Full name</label>
          <input id={`name-${uid}`} name="name" type="text" autoComplete="name" required maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor={`phone-${uid}`}>Phone</label>
          <input id={`phone-${uid}`} name="phone" type="tel" autoComplete="tel" inputMode="tel" required maxLength={40} />
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor={`email-${uid}`}>Email (optional)</label>
          <input id={`email-${uid}`} name="email" type="email" autoComplete="email" maxLength={200} />
        </div>
        <div className="field">
          <label htmlFor={`service-${uid}`}>What do you need?</label>
          <select id={`service-${uid}`} name="service" defaultValue="">
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.navLabel}
              </option>
            ))}
            <option value="other">Something else</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={`address-${uid}`}>Property address</label>
        <input id={`address-${uid}`} name="address" type="text" autoComplete="street-address" required maxLength={300} placeholder="Street address, city" />
      </div>
      <div className="field">
        <label htmlFor={`what-${uid}`}>What happened?</label>
        <textarea id={`what-${uid}`} name="what_happened" required maxLength={3000} placeholder="Where is the water, when did it start, is it still coming in?" />
      </div>
      <div className="field">
        <label htmlFor={`ins-${uid}`}>Is this an insurance claim?</label>
        <select id={`ins-${uid}`} name="insurance_claim" defaultValue="">
          <option value="">Not sure</option>
          <option value="yes">Yes, or I plan to file one</option>
          <option value="no">No, I will pay directly</option>
        </select>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`company-${uid}`}>Company</label>
        <input id={`company-${uid}`} name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className="btn btn--red btn--lg btn--block" disabled={busy}>
        {busy ? "Sending…" : kind === "emergency" ? "Request Emergency Help" : "Send Message"}
      </button>
      <p className="form__note">
        If water is actively coming in, call {site.phone} instead. It is faster and a real person answers 24/7.
      </p>
    </form>
  );
}
