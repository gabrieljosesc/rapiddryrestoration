import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon, serviceIcons } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Water Damage Restoration Services in Toronto & the GTA",
  description:
    "Leak detection, emergency water extraction, burst pipes, flooded basements, sewer backup, tear-out, structural drying and mould prevention. 24/7 across Toronto and the GTA, insurance billed directly.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Water Damage Restoration Services in Toronto & the GTA"
        answer={`${site.name} handles every stage of a water loss: finding the source, extracting water, removing damaged materials, drying the structure and preventing mould. Every service is available 24/7 and billed to your insurer directly.`}
        crumbs={[{ name: "Services", href: "/services" }]}
        secondaryCta={{ label: "How insurance claims work", href: "/insurance-claims" }}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--2" style={{ gap: 20 }}>
            {services.map((s) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="card">
                  <span className="card__icon">
                    <Icon size={28} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.answer}</p>
                  <div className="card__meta">
                    {s.timeline && <span>{s.timeline}</span>}
                    {s.costRange && (
                      <span>
                        Typically ${s.costRange.low.toLocaleString()} to ${s.costRange.high.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <span className="card__link">
                    {s.navLabel} details <ArrowIcon size={16} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section--alt section">
        <div className="container">
          <div className="grid grid--3">
            <div>
              <span className="eyebrow">One team</span>
              <h2 className="section-title" style={{ fontSize: "1.5rem" }}>
                Emergency response, then the rebuild
              </h2>
              <p className="muted">
                After drying, our sister company Rebuild Pro Contracting restores drywall, insulation, flooring
                and paint under the same claim. One scope, one adjuster meeting, one point of contact.
              </p>
            </div>
            <div>
              <span className="eyebrow">Root cause</span>
              <h2 className="section-title" style={{ fontSize: "1.5rem" }}>
                Fix why it happened
              </h2>
              <p className="muted">
                When water came through the foundation, DryFort Waterproofing handles crack injection, weeping
                tile and sump pumps so the next storm does not put you back where you started.
              </p>
            </div>
            <div>
              <span className="eyebrow">Standards</span>
              <h2 className="section-title" style={{ fontSize: "1.5rem" }}>
                Dried to the IICRC S500 standard
              </h2>
              <p className="muted">
                Daily moisture readings, a written drying log and photo documentation on every job. It is what
                adjusters expect and what keeps mould from starting.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand location="services-cta" />
    </>
  );
}
