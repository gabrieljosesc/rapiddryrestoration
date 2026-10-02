import type { Metadata } from "next";
import Image from "next/image";
import { images } from "@/lib/images";
import { reviews, reviewSummary, site } from "@/lib/site";
import { CtaBand } from "@/components/CtaBand";
import { QuoteIcon, StarIcon } from "@/components/Icons";
import { JsonLd, ORG_ID } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Reviews & Before/After Gallery | Toronto Water Damage Restoration",
  description:
    "What Toronto and GTA homeowners say about RapidDry Restoration, plus before and after photos from flooded basements, burst pipes and sewer backups.",
  alternates: { canonical: "/reviews" },
};

/** PLACEHOLDER gallery pairs until real job photography is available. */
const gallery = [
  { title: "Flooded basement, Scarborough", note: "Category 1, 3 inches of water, dried in 4 days", before: images.floodedBasement, after: images.houseInterior },
  { title: "Burst pipe, Vaughan", note: "Kitchen and lower level, tear-out and rebuild", before: images.burstPipes, after: images.kitchen },
  { title: "Structural drying, Markham", note: "Drywall removed to 2 ft, dry standard reached day 5", before: images.drying, after: images.houseInterior },
];

function reviewSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: site.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewSummary.rating,
      reviewCount: reviewSummary.count,
      bestRating: 5,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
    })),
  };
}

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={reviewSchema()} />
      <PageHero
        eyebrow="Reviews"
        title="Trusted by Homeowners and Insurance Companies"
        answer={`${site.name} is rated ${reviewSummary.rating.toFixed(1)} out of 5 by homeowners across Toronto and the GTA for fast response, clean documentation and direct insurance billing.`}
        crumbs={[{ name: "Reviews", href: "/reviews" }]}
        meta={
          <span>
            <span className="stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon key={n} size={16} />
              ))}
            </span>
            {reviewSummary.rating.toFixed(1)} · Based on {reviewSummary.count}+ reviews (PLACEHOLDER until Google reviews are synced)
          </span>
        }
      />

      <section className="section">
        <div className="container">
          <div className="review-list">
            {reviews.map((r) => (
              <figure key={r.name + r.date} className="review-card">
                <QuoteIcon size={24} className="review-card__quote" />
                <span className="stars" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <StarIcon key={i} size={16} />
                  ))}
                </span>
                <blockquote className="mt-2">
                  <p>{r.text}</p>
                </blockquote>
                <figcaption>
                  <cite>
                    — {r.name}, {r.location} · {r.service}
                  </cite>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section--alt section">
        <div className="container">
          <span className="eyebrow">Before &amp; after</span>
          <h2 className="section-title">Real jobs, real results</h2>
          <p className="section-lead mb-4">
            Sample gallery. Replace with photo documentation from completed jobs (with the homeowner&apos;s
            permission) as the crew collects it.
          </p>
          <div className="gallery">
            {gallery.map((g) => (
              <div key={g.title} className="ba">
                <div className="ba__pair">
                  <div className="ba__img">
                    <span className="ba__tag">Before</span>
                    <Image src={g.before} alt={`Before: ${g.title}`} fill sizes="(min-width: 900px) 16vw, 50vw" />
                  </div>
                  <div className="ba__img">
                    <span className="ba__tag ba__tag--after">After</span>
                    <Image src={g.after} alt={`After: ${g.title}`} fill sizes="(min-width: 900px) 16vw, 50vw" />
                  </div>
                </div>
                <div className="ba__body">
                  <strong>{g.title}</strong>
                  <span>{g.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand location="reviews-cta" />
    </>
  );
}
