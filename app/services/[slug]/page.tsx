import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas, areaUrl } from "@/lib/areas";
import { images } from "@/lib/images";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { ArrowIcon, CheckCircleIcon, ClockIcon, PhoneIcon, PinIcon, ShieldIcon, serviceIcons } from "@/components/Icons";
import { JsonLd, serviceSchema } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: { absolute: s.metaTitle },
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, images: [{ url: images[s.heroImage] }] },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = s.related.map((r) => getService(r)).filter(Boolean);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: s.title,
          description: s.metaDescription,
          url: `/services/${s.slug}`,
          offers: s.costRange ? { low: s.costRange.low, high: s.costRange.high } : undefined,
        })}
      />
      <PageHero
        eyebrow="Service"
        title={s.h1}
        answer={s.answer}
        crumbs={[
          { name: "Services", href: "/services" },
          { name: s.navLabel, href: `/services/${s.slug}` },
        ]}
        image={images[s.heroImage]}
        imageAlt={s.title}
        meta={
          <>
            <span>
              <ClockIcon size={16} /> 24/7 emergency response
            </span>
            <span>
              <ShieldIcon size={16} /> Insurance billed directly
            </span>
            {s.timeline && s.timeline.length <= 70 && (
              <span>
                <CheckCircleIcon size={16} /> {s.timeline}
              </span>
            )}
          </>
        }
        secondaryCta={{ label: "Request a callback", href: "/contact" }}
      />

      <section className="section">
        <div className="container content-grid">
          <article className="prose">
            {s.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "lead" : undefined}>
                {p}
              </p>
            ))}

            <h2>What we do on site</h2>
            <ul className="check-grid">
              {s.whatWeDo.map((item) => (
                <li key={item}>
                  <CheckCircleIcon size={20} /> <span>{item}</span>
                </li>
              ))}
            </ul>

            {s.sections.map((sec) => (
              <div key={sec.heading}>
                <h2>{sec.heading}</h2>
                {sec.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                {sec.bullets && (
                  <ul>
                    {sec.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="callout">
              <div className="callout__title">Does insurance cover this?</div>
              <p>{s.insuranceNote}</p>
            </div>

            <h2>Frequently asked questions</h2>
            <Faq items={s.faqs} openFirst={false} />
          </article>

          <aside className="sidebar">
            <div className="sidebar-card sidebar-card--navy">
              <h3>Water coming in right now?</h3>
              <p>Live answer 24/7. {site.responsePromise} anywhere in the GTA.</p>
              <CallLink location={`service-${s.slug}-sidebar`} className="btn btn--red btn--block mt-2">
                <PhoneIcon size={18} /> {site.phone}
              </CallLink>
            </div>

            {s.costRange && (
              <div className="cost-box">
                <h3>Typical cost in Toronto</h3>
                <strong>
                  ${s.costRange.low.toLocaleString()} – ${s.costRange.high.toLocaleString()}
                </strong>
                <p>{s.costRange.note}</p>
                {s.timeline && <p className="mt-1">Timeline: {s.timeline}</p>}
              </div>
            )}

            <div className="sidebar-card">
              <h3>Related services</h3>
              <ul className="link-list">
                {related.map((r) =>
                  r ? (
                    <li key={r.slug}>
                      <Link href={`/services/${r.slug}`}>
                        {r.navLabel} <ArrowIcon size={14} />
                      </Link>
                    </li>
                  ) : null
                )}
                <li>
                  <Link href="/insurance-claims">
                    How insurance claims work <ArrowIcon size={14} />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sidebar-card sidebar-card--blue">
              <h3>Where we provide {s.navLabel.toLowerCase()}</h3>
              <div className="actions">
                {areas.map((a) => (
                  <Link key={a.slug} href={areaUrl(a.slug)} className="badge">
                    <PinIcon size={12} /> {a.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section--alt section--tight">
        <div className="container">
          <div className="split-head">
            <div>
              <span className="eyebrow">All services</span>
              <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: 0 }}>
                Other ways we can help
              </h2>
            </div>
            <Link href="/services" className="btn btn--ghost btn--sm">
              View all services <ArrowIcon size={14} />
            </Link>
          </div>
          <div className="service-cards">
            {services
              .filter((o) => o.slug !== s.slug)
              .map((o) => {
                const Icon = serviceIcons[o.icon];
                return (
                  <Link key={o.slug} href={`/services/${o.slug}`} className="service-card">
                    <Icon size={36} className="service-card__icon" />
                    <span className="service-card__label">{o.navLabel}</span>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      <CtaBand location={`service-${s.slug}-cta`} />
    </>
  );
}
