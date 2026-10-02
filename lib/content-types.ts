import type { ImageKey } from "./images";

export type Faq = { q: string; a: string };

export type ServiceSlug =
  | "leak-detection"
  | "emergency-water-extraction"
  | "burst-frozen-pipes"
  | "flooded-basements"
  | "sewer-backup"
  | "tear-out"
  | "structural-drying-dehumidification"
  | "mould-prevention";

export type ServiceIcon =
  | "leak"
  | "extraction"
  | "pipes"
  | "basement"
  | "sewer"
  | "tearout"
  | "drying"
  | "mould";

export type ContentSection = {
  /** A real question a homeowner asks, e.g. "What should I do if my basement floods?" */
  heading: string;
  body: string[];
  bullets?: string[];
};

export type ServicePage = {
  slug: ServiceSlug;
  /** Full title, e.g. "Leak Detection" */
  title: string;
  /** Short label for menus and cards */
  navLabel: string;
  /** Small caption under the card label, e.g. "(Find the source)" */
  cardNote?: string;
  icon: ServiceIcon;
  /** <= 60 chars, includes the service keyword and "Toronto" */
  metaTitle: string;
  /** <= 155 chars */
  metaDescription: string;
  /** The single H1 on the page */
  h1: string;
  /** 1–2 sentence direct answer that opens the page (AI-quotable) */
  answer: string;
  heroImage: ImageKey;
  /** 2–3 paragraphs */
  intro: string[];
  /** 3–5 sections with question headings */
  sections: ContentSection[];
  /** 5–7 concrete steps of what the crew does on site */
  whatWeDo: string[];
  /** Typical cost range in CAD for Toronto, with an honest note on what moves it */
  costRange?: { low: number; high: number; note: string };
  /** e.g. "Extraction same day; structural drying 3–5 days" */
  timeline?: string;
  /** What home insurance in Ontario usually covers for this specific situation */
  insuranceNote: string;
  faqs: Faq[];
  /** Other service slugs */
  related: ServiceSlug[];
};

export type AreaSlug =
  | "toronto"
  | "north-york"
  | "vaughan"
  | "thornhill"
  | "richmond-hill"
  | "markham"
  | "mississauga"
  | "etobicoke"
  | "scarborough";

export type AreaPage = {
  slug: AreaSlug;
  /** Display name, e.g. "North York" */
  name: string;
  /** Municipality for schema, e.g. "Toronto" for North York/Etobicoke/Scarborough, otherwise same as name */
  municipality: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  answer: string;
  heroImage: ImageKey;
  /** 2–3 paragraphs of genuinely local context: housing stock, flood history, watershed/sewer facts, risks */
  localContext: string[];
  neighbourhoods: string[];
  /** 3–4 local problem patterns */
  commonIssues: { title: string; body: string }[];
  /** Dispatch / response note specific to this area */
  responseNote: string;
  /** 4–6 lines tying services to this area */
  serviceLines: { slug: ServiceSlug; line: string }[];
  faqs: Faq[];
  nearby: AreaSlug[];
};

export type GuideSlug =
  | "first-hour-after-basement-flood"
  | "does-home-insurance-cover-water-damage-ontario"
  | "water-damage-restoration-cost-toronto"
  | "how-long-to-dry-flooded-basement"
  | "burst-pipe-vs-sewer-backup-whats-covered";

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export type Guide = {
  slug: GuideSlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** 1–2 sentence direct answer that opens the guide */
  answer: string;
  /** One-paragraph teaser for the hub page */
  excerpt: string;
  /** ISO date, e.g. "2026-09-29" */
  publishedAt: string;
  updatedAt: string;
  readMinutes: number;
  heroImage: ImageKey;
  blocks: GuideBlock[];
  faqs: Faq[];
  relatedServices: ServiceSlug[];
  relatedGuides: GuideSlug[];
};
