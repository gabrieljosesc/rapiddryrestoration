import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { areas, areaUrl } from "@/lib/areas";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon, PinIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Areas We Serve | Water Damage Restoration Across Toronto & the GTA",
  description:
    "24/7 water damage restoration in Toronto, North York, Etobicoke, Scarborough, Vaughan, Thornhill, Richmond Hill, Markham and Mississauga. Local flood risks, subsidies and response notes for each area.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service Area"
        title="Water Damage Restoration Across Toronto & the GTA"
        answer={`${site.name} dispatches emergency crews 24/7 to ${site.serviceAreaLong} Our target is to be on site within ${site.responseMinutes} minutes of your call.`}
        crumbs={[{ name: "Areas We Serve", href: "/areas" }]}
        image={images.houseSuburban}
        imageAlt="Residential street in the Greater Toronto Area"
      />

      <section className="section">
        <div className="container">
          <div className="split-head">
            <div>
              <span className="eyebrow">Choose your area</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Local pages with local facts
              </h2>
            </div>
            <p className="section-lead" style={{ maxWidth: 420 }}>
              Each page covers that area&apos;s housing stock, flood history, subsidy programs and the questions
              its homeowners actually ask.
            </p>
          </div>
          <div className="grid grid--3">
            {areas.map((a) => (
              <Link key={a.slug} href={areaUrl(a.slug)} className="card card--media">
                <div className="card__media">
                  <Image src={images[a.heroImage]} alt={`Homes in ${a.name}`} fill sizes="(min-width: 720px) 33vw, 100vw" />
                </div>
                <div className="card__body">
                  <h3>
                    <PinIcon size={16} style={{ verticalAlign: "-2px", marginRight: 4, color: "var(--blue)" }} />
                    {a.name}
                  </h3>
                  <p>{a.answer}</p>
                  <span className="card__link">
                    Water damage restoration in {a.name} <ArrowIcon size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand location="areas-cta" />
    </>
  );
}
