import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { PhoneIcon } from "@/components/Icons";
import { JsonLd, breadcrumbSchema } from "@/components/JsonLd";

export type Crumb = { name: string; href: string };

/**
 * Inner-page hero. Renders the single H1, the answer-first paragraph the
 * brief asks for, breadcrumbs (with BreadcrumbList schema) and the call CTA.
 */
export function PageHero({
  eyebrow,
  title,
  answer,
  crumbs,
  image,
  imageAlt = "",
  meta,
  secondaryCta,
  children,
}: {
  eyebrow?: string;
  title: string;
  answer: string;
  crumbs: Crumb[];
  image?: string;
  imageAlt?: string;
  meta?: ReactNode;
  secondaryCta?: { label: string; href: string };
  children?: ReactNode;
}) {
  const allCrumbs: Crumb[] = [{ name: "Home", href: "/" }, ...crumbs];
  return (
    <section className={image ? "page-hero page-hero--media" : "page-hero"}>
      <JsonLd data={breadcrumbSchema(allCrumbs)} />
      {image && (
        <div className="page-hero__bg" aria-hidden="true">
          <Image src={image} alt={imageAlt} fill sizes="100vw" priority />
        </div>
      )}
      <div className="container">
        <div className="page-hero__inner">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumbs">
              {allCrumbs.map((c, i) => (
                <li key={c.href}>
                  {i < allCrumbs.length - 1 ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
          {eyebrow && <span className="eyebrow" style={{ marginTop: 16, color: "var(--blue-light)" }}>{eyebrow}</span>}
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__answer">{answer}</p>
          {meta && <div className="page-hero__meta">{meta}</div>}
          <div className="page-hero__actions">
            <CallLink location="page-hero" className="btn btn--red btn--lg">
              <PhoneIcon size={20} /> Call Now {site.phone}
            </CallLink>
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn btn--ghost-light btn--lg">
                {secondaryCta.label}
              </Link>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
