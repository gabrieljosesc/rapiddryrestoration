import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { sisterCompanies, site, trustBadges } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon, BadgeIcon, CheckCircleIcon, ExternalIcon, ShieldIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us | Certifications, Insurance & Standards",
  description:
    "Who RapidDry Restoration is, how we work, and the standards, insurance and certifications behind every water damage job in Toronto and the GTA.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Answer first, dispatch second", body: "A live person answers the emergency line 24/7 and gives you the safety steps that matter before the crew is even on the road." },
  { title: "Document everything", body: "Photos, moisture maps and daily drying logs on every job. It protects your claim and it keeps us honest about when a structure is actually dry." },
  { title: "Dry it right, not fast", body: "We follow the IICRC S500 standard: equipment sized to the loss, readings taken daily, removed only when the dry standard is met." },
  { title: "Tell you when not to claim", body: "If a loss is small enough that a claim could cost you more at renewal than it saves, we say so and give you a direct-pay price instead." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About RapidDry Restoration"
        answer={`${site.name} is a Toronto-based emergency water damage restoration company serving the GTA 24/7. We extract water, dry structures to the IICRC S500 standard and bill insurers directly, then hand the rebuild to our sister company Rebuild Pro Contracting.`}
        crumbs={[{ name: "About", href: "/about" }]}
        image={images.team}
        imageAlt="Restoration technician at work"
      />

      <section className="section">
        <div className="container grid grid--2" style={{ gap: 40, alignItems: "center" }}>
          <div className="prose">
            <h2>Why we started RapidDry</h2>
            <p>
              Our group has been fixing wet basements across the GTA for years through DryFort Waterproofing.
              Again and again we met homeowners hours after a flood who had been told to wait until morning, who
              had no idea whether their policy covered the loss, and who were about to pay a restoration company
              up front and chase the insurer themselves.
            </p>
            <p>
              RapidDry Restoration exists to fix that: a true 24/7 line, a crew that targets arrival within 60
              minutes, documentation adjusters trust, and direct billing so you pay only your deductible. When the
              drying is done, Rebuild Pro Contracting restores the finishes and, if the water came through the
              foundation, DryFort fixes the cause.
            </p>
            <p>
              We are based in Toronto and serve North York, Etobicoke, Scarborough, Vaughan, Thornhill, Richmond
              Hill, Markham and Mississauga.
            </p>
          </div>
          <div className="process__media" style={{ aspectRatio: "4/3" }}>
            <Image src={images.hero} alt="RapidDry technician extracting water in a living room" fill sizes="(min-width: 720px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="section--alt section">
        <div className="container">
          <span className="eyebrow">Certifications &amp; trust</span>
          <h2 className="section-title">Standards behind every job</h2>
          <p className="section-lead mb-4">
            Items marked as pending are in progress and will be shown with the official badge once obtained.
          </p>
          <div className="trust-grid">
            {trustBadges.map((b) => (
              <div key={b.label} className="trust-badge">
                {b.placeholder ? <BadgeIcon size={34} /> : <ShieldIcon size={34} />}
                <strong>{b.label}</strong>
                <small>{b.note}</small>
                {b.placeholder && <span className="badge badge--placeholder">Pending</span>}
              </div>
            ))}
          </div>
          <div className="prose mt-6">
            <h2>What our technicians are trained to</h2>
            <ul className="check-grid">
              <li>
                <CheckCircleIcon size={20} /> <span>IICRC S500 water damage restoration standard (WRT and ASD certification in progress)</span>
              </li>
              <li>
                <CheckCircleIcon size={20} /> <span>Category 3 (sewage) containment, PPE and antimicrobial protocols</span>
              </li>
              <li>
                <CheckCircleIcon size={20} /> <span>Moisture mapping with pin and non-invasive meters and thermal imaging</span>
              </li>
              <li>
                <CheckCircleIcon size={20} /> <span>Xactimate scoping so estimates match what adjusters expect</span>
              </li>
              <li>
                <CheckCircleIcon size={20} /> <span>WSIB coverage and commercial general, pollution and mould liability insurance (PLACEHOLDER: confirm)</span>
              </li>
              <li>
                <CheckCircleIcon size={20} /> <span>Direction to Pay and insurer preferred-vendor program onboarding</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">How we work</span>
          <h2 className="section-title">Four rules we do not break</h2>
          <div className="grid grid--2 mt-3">
            {values.map((v) => (
              <div key={v.title} className="card">
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--alt section">
        <div className="container">
          <span className="eyebrow">Sister companies</span>
          <h2 className="section-title">Three companies, one team</h2>
          <div className="grid grid--3 mt-3">
            <div className="card">
              <h3>{site.name}</h3>
              <p>Emergency response, extraction, tear-out, drying and insurance claims. You are here.</p>
              <Link href="/services" className="card__link">
                Our services <ArrowIcon size={16} />
              </Link>
            </div>
            {sisterCompanies.map((c) => (
              <a key={c.name} href={c.url} className="card" target="_blank" rel="noopener">
                <h3>
                  {c.name} <ExternalIcon size={14} />
                </h3>
                <p>{c.description}</p>
                <span className="card__link">
                  Visit site <ArrowIcon size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CtaBand location="about-cta" />
    </>
  );
}
