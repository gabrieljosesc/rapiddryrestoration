import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { processSteps, sisterCompanies, site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { ArrowIcon, ExternalIcon, processIcons } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Water Damage Restoration Process | Call, Inspect, Remove, Dry, Rebuild",
  description:
    "What happens after you call RapidDry: dispatch within minutes, moisture mapping and documentation, extraction and tear-out, IICRC S500 structural drying, then the rebuild through Rebuild Pro Contracting.",
  alternates: { canonical: "/our-process" },
};

const processFaqs = [
  {
    q: "How long does the whole process take?",
    a: "Emergency extraction happens the same day. Tear-out is usually complete within 24 to 48 hours. Structural drying takes 3 to 5 days for most homes, longer for hardwood, concrete or heavily saturated assemblies. The rebuild through Rebuild Pro Contracting is scheduled once the drying log shows the structure is at its dry standard, typically starting within a week or two depending on scope and insurer approval.",
  },
  {
    q: "Do I need to be home during drying?",
    a: "No. Equipment runs unattended and we return daily to take moisture readings and adjust it. We need access for those visits, which takes about 20 minutes. Please leave the equipment running; turning it off overnight to save power extends the drying time and can allow mould to start.",
  },
  {
    q: "Who does the rebuild?",
    a: "Our sister company Rebuild Pro Contracting handles insulation, drywall, taping, paint, trim and flooring. Because the same group handled the tear-out, the rebuild scope matches the claim exactly and there is one point of contact from first call to final coat.",
  },
  {
    q: "What if the water came through the foundation?",
    a: "We dry the interior, and DryFort Waterproofing assesses the foundation for the permanent fix: crack injection, weeping tile, sump pump or exterior waterproofing. Fixing the root cause is often required by insurers before they will cover a repeat loss.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title="From Emergency Call to Full Restoration"
        answer={`Every ${site.name} job follows the same five steps: call, inspect, remove, dry and rebuild. You know what happens next at every stage, and your insurer gets the documentation it needs at each one.`}
        crumbs={[{ name: "Our Process", href: "/our-process" }]}
        image={images.drying}
        imageAlt="Structural drying equipment set up in a residential room"
        secondaryCta={{ label: "How insurance billing works", href: "/insurance-claims" }}
      />

      <section className="section">
        <div className="container">
          <div className="timeline" style={{ maxWidth: 860 }}>
            {processSteps.map((step) => {
              const Icon = processIcons[step.icon];
              return (
                <div key={step.n} className="timeline__item" id={step.title.toLowerCase()}>
                  <div className="timeline__icon">
                    <Icon size={30} />
                  </div>
                  <div>
                    <span className="timeline__step">Step {step.n} of 5</span>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                    {step.n === 5 && (
                      <a href={sisterCompanies[0].url} className="btn btn--blue btn--sm mt-2" target="_blank" rel="noopener">
                        Rebuild with {sisterCompanies[0].name} <ExternalIcon size={14} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section--alt section">
        <div className="container">
          <span className="eyebrow">What you get at each step</span>
          <h2 className="section-title">Documentation, not just equipment</h2>
          <div className="grid grid--4 mt-3">
            <div className="stat">
              <strong>60 min</strong>
              <span>Target arrival anywhere in the GTA</span>
            </div>
            <div className="stat">
              <strong>Day 1</strong>
              <span>Moisture map, photos, water category and written scope</span>
            </div>
            <div className="stat">
              <strong>Daily</strong>
              <span>Moisture readings logged until the dry standard is met</span>
            </div>
            <div className="stat">
              <strong>3–5 days</strong>
              <span>Typical drying time for a residential water loss</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid--2" style={{ gap: 40, alignItems: "start" }}>
          <div>
            <span className="eyebrow">Sister companies</span>
            <h2 className="section-title">One group from first call to final coat</h2>
            <p className="section-lead">
              Restoration, rebuild and root cause are handled by three companies that work as one team, each with
              its own trade licences and insurance.
            </p>
            <div className="mt-3" style={{ display: "grid", gap: 12 }}>
              {sisterCompanies.map((c) => (
                <a key={c.name} href={c.url} className="card" target="_blank" rel="noopener">
                  <h3>
                    {c.name} <ExternalIcon size={14} />
                  </h3>
                  <p>{c.description}</p>
                </a>
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow">Process questions</span>
            <h2 className="section-title" style={{ fontSize: "1.5rem" }}>
              What homeowners ask about the process
            </h2>
            <Faq items={processFaqs} />
            <Link href="/resources/how-long-to-dry-flooded-basement" className="btn btn--ghost mt-3">
              How long drying really takes <ArrowIcon size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section--tight section--alt">
        <div className="container process__media" style={{ aspectRatio: "21/9" }}>
          <Image src={images.hero} alt="RapidDry technician running a water extractor" fill sizes="100vw" />
        </div>
      </section>

      <CtaBand location="process-cta" />
    </>
  );
}
