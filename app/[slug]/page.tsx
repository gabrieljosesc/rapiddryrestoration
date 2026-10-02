import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas, areaUrl, getArea } from "@/lib/areas";
import { images } from "@/lib/images";
import { getService, services } from "@/lib/services";
import { site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { ArrowIcon, CheckCircleIcon, ClockIcon, PhoneIcon, PinIcon, ShieldIcon, serviceIcons } from "@/components/Icons";
import { JsonLd, serviceSchema } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

/**
 * Area pages live at /water-damage-restoration-<area> (keyword-in-URL, same
 * pattern as DryFort). This catch-all only builds the known area slugs.
 */
const PREFIX = "water-damage-restoration-";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return areas.map((a) => ({ slug: `${PREFIX}${a.slug}` }));
}

function resolve(slug: string) {
  if (!slug.startsWith(PREFIX)) return undefined;
  return getArea(slug.slice(PREFIX.length));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = resolve(slug);
  if (!a) return {};
  return {
    title: { absolute: a.metaTitle },
    description: a.metaDescription,
    alternates: { canonical: areaUrl(a.slug) },
    openGraph: { title: a.metaTitle, description: a.metaDescription, images: [{ url: images[a.heroImage] }] },
  };
}

export default async function AreaPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = resolve(slug);
  if (!a) notFound();

  const nearby = a.nearby.map((n) => getArea(n)).filter(Boolean);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Water Damage Restoration in ${a.name}`,
          description: a.metaDescription,
          url: areaUrl(a.slug),
          areaServed: `${a.name}, ${a.municipality === a.name ? "Ontario" : `${a.municipality}, Ontario`}`,
        })}
      />
      <PageHero
        eyebrow={`Serving ${a.name}`}
        title={a.h1}
        answer={a.answer}
        crumbs={[
          { name: "Areas We Serve", href: "/areas" },
          { name: a.name, href: areaUrl(a.slug) },
        ]}
        image={images[a.heroImage]}
        imageAlt={`Homes in ${a.name}`}
        meta={
          <>
            <span>
              <ClockIcon size={16} /> {site.responsePromise}
            </span>
            <span>
              <ShieldIcon size={16} /> Insurance billed directly
            </span>
            <span>
              <PinIcon size={16} /> Crews positioned across the GTA
            </span>
          </>
        }
        secondaryCta={{ label: "Request a callback", href: "/contact" }}
      />

      <section className="section">
        <div className="container content-grid">
          <article className="prose">
            <h2>Water damage in {a.name}: what we see most</h2>
            {a.localContext.map((p, i) => (
              <p key={i} className={i === 0 ? "lead" : undefined}>
                {p}
              </p>
            ))}

            <div className="grid grid--2 mt-4 mb-4" style={{ gap: 14 }}>
              {a.commonIssues.map((issue) => (
                <div key={issue.title} className="card">
                  <h3>{issue.title}</h3>
                  <p>{issue.body}</p>
                </div>
              ))}
            </div>

            <h2>How fast can you reach {a.name}?</h2>
            <p>{a.responseNote}</p>

            <h2>Restoration services we provide in {a.name}</h2>
            <ul className="check-grid">
              {a.serviceLines.map((line) => {
                const s = getService(line.slug);
                return (
                  <li key={line.slug}>
                    <CheckCircleIcon size={20} />
                    <span>
                      {s && (
                        <Link href={`/services/${s.slug}`} style={{ display: "block", marginBottom: 2 }}>
                          {s.navLabel}
                        </Link>
                      )}
                      {line.line}
                    </span>
                  </li>
                );
              })}
            </ul>

            <h2>{a.name} neighbourhoods we serve</h2>
            <p>
              {a.neighbourhoods.join(", ")}. If you are just outside these, call anyway: crews cover the whole GTA
              and the dispatcher will give you a real arrival window.
            </p>

            <h2>Questions from {a.name} homeowners</h2>
            <Faq items={a.faqs} openFirst={false} />
          </article>

          <aside className="sidebar">
            <div className="sidebar-card sidebar-card--navy">
              <h3>Flooding in {a.name} right now?</h3>
              <p>Live answer 24/7. Tell the dispatcher your address and what happened.</p>
              <CallLink location={`area-${a.slug}-sidebar`} className="btn btn--red btn--block mt-2">
                <PhoneIcon size={18} /> {site.phone}
              </CallLink>
            </div>
            <div className="sidebar-card">
              <h3>Services</h3>
              <ul className="link-list">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`}>
                      {s.navLabel} <ArrowIcon size={14} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sidebar-card sidebar-card--blue">
              <h3>Nearby areas</h3>
              <ul className="link-list">
                {nearby.map((n) =>
                  n ? (
                    <li key={n.slug}>
                      <Link href={areaUrl(n.slug)}>
                        {n.name} <ArrowIcon size={14} />
                      </Link>
                    </li>
                  ) : null
                )}
                <li>
                  <Link href="/areas">
                    All areas we serve <ArrowIcon size={14} />
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section--alt section--tight">
        <div className="container">
          <span className="eyebrow">Emergency services in {a.name}</span>
          <div className="service-cards">
            {services.map((s) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="service-card">
                  <Icon size={36} className="service-card__icon" />
                  <span className="service-card__label">{s.navLabel}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand location={`area-${a.slug}-cta`} sub={`Crews dispatched to ${a.name} 24/7.`} />
    </>
  );
}
