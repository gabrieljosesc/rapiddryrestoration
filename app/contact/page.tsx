import type { Metadata } from "next";
import Link from "next/link";
import { areas, areaUrl } from "@/lib/areas";
import { site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { EmergencyForm } from "@/components/EmergencyForm";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact Us | 24/7 Emergency Line Toronto & GTA",
  description: `Call ${site.phone} any hour for emergency water damage help in Toronto and the GTA, or send the short emergency form and a dispatcher calls you back in minutes.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const a = site.address;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact RapidDry Restoration"
        answer={`Call ${site.phone} for a live dispatcher 24 hours a day, or send the emergency form below and we call you back within minutes. Serving ${site.serviceAreaLong}`}
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      <section className="section">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">Reach us</span>
            <h2 className="section-title">Fastest is always the phone</h2>
            <div>
              <div className="contact-card">
                <span className="contact-card__icon">
                  <PhoneIcon size={22} />
                </span>
                <div>
                  <strong>24/7 emergency line</strong>
                  <CallLink location="contact-page">{site.phone}</CallLink>
                  <p className="small muted">Live answer, every hour of every day.</p>
                </div>
              </div>
              <div className="contact-card">
                <span className="contact-card__icon">
                  <MailIcon size={22} />
                </span>
                <div>
                  <strong>Email (non-urgent)</strong>
                  <a href={site.emailHref}>{site.email}</a>
                  <p className="small muted">Claims paperwork, adjuster requests, general questions.</p>
                </div>
              </div>
              <div className="contact-card">
                <span className="contact-card__icon">
                  <PinIcon size={22} />
                </span>
                <div>
                  <strong>Office</strong>
                  <p>
                    {a.street && (
                      <>
                        {a.street}
                        <br />
                      </>
                    )}
                    {a.city}, {a.region} {a.postal}
                  </p>
                </div>
              </div>
              <div className="contact-card">
                <span className="contact-card__icon">
                  <ClockIcon size={22} />
                </span>
                <div>
                  <strong>Hours</strong>
                  <p>{site.hours}</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 style={{ fontSize: "1rem", marginBottom: 10 }}>Service area</h3>
              <div className="actions">
                {areas.map((c) => (
                  <Link key={c.slug} href={areaUrl(c.slug)} className="badge">
                    <PinIcon size={12} /> {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div>
            <EmergencyForm
              variant="card"
              kind="emergency"
              heading="Send an emergency request"
              intro="Name, phone, address and what happened. That is all a dispatcher needs to send the right crew."
            />
          </div>
        </div>
      </section>
    </>
  );
}
