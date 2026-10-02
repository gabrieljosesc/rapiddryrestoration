import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { guides } from "@/lib/guides";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon, CalendarIcon, ClockIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Water Damage Guides for Toronto Homeowners | Resources",
  description:
    "Plain-language guides on what to do after a basement flood, what Ontario home insurance covers, drying times, and burst pipes vs. sewer backup.",
  alternates: { canonical: "/resources" },
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

export default function ResourcesPage() {
  const sorted = [...guides].sort((x, y) => (x.updatedAt < y.updatedAt ? 1 : -1));
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Water Damage Guides for Toronto & GTA Homeowners"
        answer={`Practical, specific answers from ${site.name} on the questions we hear on the emergency line: what to do first, what insurance covers in Ontario and how long drying takes. New guides are added at least twice a month.`}
        crumbs={[{ name: "Resources", href: "/resources" }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--2" style={{ gap: 22 }}>
            {sorted.map((g) => (
              <Link key={g.slug} href={`/resources/${g.slug}`} className="card card--media">
                <div className="card__media">
                  <Image src={images[g.heroImage]} alt="" fill sizes="(min-width: 720px) 50vw, 100vw" />
                </div>
                <div className="card__body">
                  <div className="card__meta">
                    <span>
                      <CalendarIcon size={13} style={{ verticalAlign: "-2px" }} /> Updated {fmt(g.updatedAt)}
                    </span>
                    <span>
                      <ClockIcon size={13} style={{ verticalAlign: "-2px" }} /> {g.readMinutes} min read
                    </span>
                  </div>
                  <h3>{g.title}</h3>
                  <p>{g.excerpt}</p>
                  <span className="card__link">
                    Read the guide <ArrowIcon size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand location="resources-cta" />
    </>
  );
}
