import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { GuideBlock } from "@/lib/content-types";
import { getGuide, guides } from "@/lib/guides";
import { images } from "@/lib/images";
import { getService } from "@/lib/services";
import { site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { ArrowIcon, CalendarIcon, ClockIcon, PhoneIcon } from "@/components/Icons";
import { JsonLd, ORG_ID } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: { absolute: g.metaTitle },
    description: g.metaDescription,
    alternates: { canonical: `/resources/${g.slug}` },
    openGraph: {
      type: "article",
      title: g.metaTitle,
      description: g.metaDescription,
      publishedTime: g.publishedAt,
      modifiedTime: g.updatedAt,
      images: [{ url: images[g.heroImage] }],
    },
  };
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

function Block({ b }: { b: GuideBlock }) {
  switch (b.type) {
    case "p":
      return <p>{b.text}</p>;
    case "h2":
      return <h2>{b.text}</h2>;
    case "h3":
      return <h3>{b.text}</h3>;
    case "ul":
      return (
        <ul>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol>
          {b.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="callout">
          <div className="callout__title">{b.title}</div>
          <p>{b.text}</p>
        </div>
      );
    case "table":
      return (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                {b.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.metaDescription,
    datePublished: g.publishedAt,
    dateModified: g.updatedAt,
    image: images[g.heroImage].startsWith("/") ? `${site.url}${images[g.heroImage]}` : images[g.heroImage],
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${site.url}/resources/${g.slug}`,
  };

  const relatedServices = g.relatedServices.map((s) => getService(s)).filter(Boolean);
  const relatedGuides = g.relatedGuides.map((s) => getGuide(s)).filter(Boolean);

  return (
    <>
      <JsonLd data={article} />
      <PageHero
        eyebrow="Guide"
        title={g.title}
        answer={g.answer}
        crumbs={[
          { name: "Resources", href: "/resources" },
          { name: g.title, href: `/resources/${g.slug}` },
        ]}
        image={images[g.heroImage]}
        meta={
          <>
            <span>
              <CalendarIcon size={16} /> Last updated {fmt(g.updatedAt)}
            </span>
            <span>
              <ClockIcon size={16} /> {g.readMinutes} min read
            </span>
          </>
        }
      />

      <section className="section">
        <div className="container content-grid">
          <article className="prose">
            <div className="guide-meta">
              <span>
                <CalendarIcon size={14} /> Published {fmt(g.publishedAt)}
              </span>
              <span>
                <CalendarIcon size={14} /> Updated {fmt(g.updatedAt)}
              </span>
              <span>By the {site.name} team</span>
            </div>
            {g.blocks.map((b, i) => (
              <Block key={i} b={b} />
            ))}
            <h2>Frequently asked questions</h2>
            <Faq items={g.faqs} openFirst={false} />
          </article>

          <aside className="sidebar">
            <div className="sidebar-card sidebar-card--navy">
              <h3>Dealing with this right now?</h3>
              <p>Skip the reading. A dispatcher answers 24/7 and a crew can be on the way in minutes.</p>
              <CallLink location={`guide-${g.slug}-sidebar`} className="btn btn--red btn--block mt-2">
                <PhoneIcon size={18} /> {site.phone}
              </CallLink>
            </div>
            {relatedServices.length > 0 && (
              <div className="sidebar-card">
                <h3>Related services</h3>
                <ul className="link-list">
                  {relatedServices.map((s) =>
                    s ? (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`}>
                          {s.navLabel} <ArrowIcon size={14} />
                        </Link>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            )}
            <div className="sidebar-card sidebar-card--blue">
              <h3>Keep reading</h3>
              <ul className="link-list">
                {relatedGuides.map((r) =>
                  r ? (
                    <li key={r.slug}>
                      <Link href={`/resources/${r.slug}`}>
                        {r.title} <ArrowIcon size={14} />
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
          </aside>
        </div>
      </section>

      <section className="section--alt section--tight">
        <div className="container">
          <div className="process__media" style={{ aspectRatio: "21/9" }}>
            <Image src={images[g.heroImage]} alt="" fill sizes="100vw" />
          </div>
        </div>
      </section>

      <CtaBand location={`guide-${g.slug}-cta`} />
    </>
  );
}
