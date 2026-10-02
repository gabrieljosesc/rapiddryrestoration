import { site } from "@/lib/site";
import type { Faq } from "@/lib/site";

/** Renders one or more schema.org objects as JSON-LD. */
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

export const ORG_ID = `${site.url}/#organization`;

export function organizationSchema() {
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/images/hero-extraction.jpg`,
    description: site.description,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postal,
      addressCountry: a.country,
    },
    areaServed: [
      "Toronto",
      "North York",
      "Etobicoke",
      "Scarborough",
      "Vaughan",
      "Thornhill",
      "Richmond Hill",
      "Markham",
      "Mississauga",
    ].map((name) => ({ "@type": "City", name: `${name}, Ontario` })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    knowsAbout: [
      "water damage restoration",
      "emergency water extraction",
      "structural drying",
      "sewer backup cleanup",
      "mould prevention",
      "insurance claims for water damage",
    ],
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.href}`,
    })),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
  offers?: { low: number; high: number };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    serviceType: input.name,
    description: input.description,
    url: `${site.url}${input.url}`,
    provider: { "@id": ORG_ID },
    areaServed: input.areaServed ?? "Toronto and the Greater Toronto Area, Ontario",
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: { "@type": "ContactPoint", telephone: site.phone, contactType: "emergency" },
      availableLanguage: "en",
    },
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    ...(input.offers
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "CAD",
            lowPrice: input.offers.low,
            highPrice: input.offers.high,
          },
        }
      : {}),
  };
}
