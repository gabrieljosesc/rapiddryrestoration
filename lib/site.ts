/**
 * Central brand/config for RapidDry Restoration.
 *
 * PLACEHOLDERS (Joe supplies before launch):
 *  - phone / phoneHref   → set to the real line; must match the Google Business Profile
 *  - responsePromise     → confirm the response-time promise
 *  - address             → registered business address
 *  - certifications      → IICRC badge only once obtained
 *  - reviews             → real Google / HomeStars reviews
 *  - sister site URLs    → Rebuild Pro Contracting domain once purchased
 */

const trackingPhone = process.env.NEXT_PUBLIC_TRACKING_PHONE?.trim();

function toHref(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:+1${digits.length === 11 ? digits.slice(1) : digits}`;
}

const MAIN_PHONE = "(647) 478-0804"; // Joe-supplied, 2026-10-09

export const site = {
  name: "RapidDry Restoration",
  shortName: "RapidDry",
  legalName: "RapidDry Restoration", // PLACEHOLDER: confirm via Ontario Business Registry
  tagline: "24/7 Emergency Water Damage Restoration",
  description:
    "RapidDry Restoration provides 24/7 emergency water damage restoration across Toronto and the GTA. Leak detection, water extraction, tear-out, structural drying and mould prevention, with insurance billed directly.",
  url: "https://www.rapiddryrestoration.ca",

  phone: trackingPhone || MAIN_PHONE,
  phoneHref: toHref(trackingPhone || MAIN_PHONE),
  email: "help@rapiddryrestoration.ca", // PLACEHOLDER
  emailHref: "mailto:help@rapiddryrestoration.ca",
  /** Street and postal code are left empty until Joe supplies the registered
   *  business address; the site and schema then show "Toronto, ON" only. */
  address: {
    street: "",
    city: "Toronto",
    region: "ON",
    postal: "",
    country: "CA",
  },
  hours: "Emergency crews: 24/7, 365 days a year",

  /** PLACEHOLDER: Joe to confirm the exact promise. */
  responsePromise: "On site in 60 minutes",
  responseMinutes: 60,

  serviceArea: "Toronto & the GTA",
  serviceAreaLong:
    "Toronto, North York, Etobicoke, Scarborough, Vaughan, Thornhill, Richmond Hill, Markham and Mississauga.",

  /** Google Business Profile / directory listings for Organization sameAs. Fill in as created. */
  sameAs: [] as string[],
  /** Direct "write a review" link from the Google Business Profile, once created. */
  googleReviewUrl: "",
} as const;

export const sisterCompanies = [
  {
    name: "Rebuild Pro Contracting",
    role: "Insurance rebuilds & renovations",
    description:
      "Our general contracting sister company. Framing, insulation, drywall, electrical, plumbing and finishing to restore your home to pre-loss condition after the dry-out.",
    url: "https://www.rebuildprocontracting.ca", // PLACEHOLDER: set once the domain is purchased
  },
  {
    name: "DryFort Waterproofing",
    role: "Foundation waterproofing",
    description:
      "Fixes the root cause when water came through the foundation: crack injection, weeping tile, sump pumps and exterior waterproofing.",
    url: "https://www.dryfortwaterproofing.ca",
  },
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", menu: "services" },
  { label: "Insurance Claims", href: "/insurance-claims" },
  { label: "Our Process", href: "/our-process" },
  { label: "Areas We Serve", href: "/areas", menu: "areas" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
] as const;

export type QuickIcon = "drop" | "shield" | "fan" | "mould" | "house" | "clock";

/** The six quick-service tiles under the hero. */
export const quickServices: { label: string; icon: QuickIcon; href: string }[] = [
  { label: "Water Removal & Extraction", icon: "drop", href: "/services/emergency-water-extraction" },
  { label: "Insurance Claims Assistance", icon: "shield", href: "/insurance-claims" },
  { label: "Drying & Dehumidification", icon: "fan", href: "/services/structural-drying-dehumidification" },
  { label: "Mould Prevention", icon: "mould", href: "/services/mould-prevention" },
  { label: "Tear-Out & Repairs", icon: "house", href: "/services/tear-out" },
  { label: "24/7 Emergency Response", icon: "clock", href: "/contact" },
];

export type ProcessStep = {
  n: number;
  title: string;
  short: string;
  detail: string;
  icon: "phone" | "search" | "drop" | "fan" | "house";
};

export const processSteps: ProcessStep[] = [
  {
    n: 1,
    title: "Call",
    short: "We're available 24/7.",
    detail:
      "Call the emergency line any hour. A dispatcher takes your address and what happened, gives you immediate safety steps (shut the main valve, stay away from outlets near water) and sends the nearest crew. Our target is to be on site within 60 minutes anywhere in the GTA.",
    icon: "phone",
  },
  {
    n: 2,
    title: "Inspect",
    short: "We assess the damage and create a plan.",
    detail:
      "The lead technician finds the source, classifies the water (clean, grey or black) and maps how far moisture has travelled using pin and non-invasive moisture meters and thermal imaging. Everything is photographed and logged, because that documentation is what your insurer uses to approve the claim.",
    icon: "search",
  },
  {
    n: 3,
    title: "Remove",
    short: "We extract water and remove damaged materials.",
    detail:
      "Truck-mounted and portable extractors pull standing water out. Materials that cannot be dried safely, such as soaked drywall, wet insulation, delaminated laminate flooring and contaminated carpet, are cut out, bagged and removed. Salvageable contents are moved and protected.",
    icon: "drop",
  },
  {
    n: 4,
    title: "Dry",
    short: "We use professional equipment to dry your space.",
    detail:
      "Air movers and commercial dehumidifiers are set following the IICRC S500 standard. We take moisture readings every day and adjust the equipment until the structure is back to its dry standard, usually within 3 to 5 days. You get the drying log for your claim file.",
    icon: "fan",
  },
  {
    n: 5,
    title: "Rebuild",
    short: "We restore to pre-loss condition with our GC sister company.",
    detail:
      "Once the structure is dry, our sister company Rebuild Pro Contracting handles the rebuild: insulation, drywall, taping, paint, trim and flooring, billed to the same claim. If water came through the foundation, DryFort Waterproofing fixes the cause so it does not happen again.",
    icon: "house",
  },
];

export type Review = {
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  date: string;
};

/**
 * Real customer reviews only. Empty until Joe supplies verified Google /
 * HomeStars reviews; the UI shows a "reviews coming soon" state and no
 * Review/AggregateRating schema is published while this is empty.
 */
export const reviews: Review[] = [];

/** Aggregate rating from the Google Business Profile. Leave null until real. */
export const reviewSummary: { rating: number; count: number } | null = null;

export type TrustBadge = { label: string; note: string; placeholder?: boolean };

export const trustBadges: TrustBadge[] = [
  { label: "IICRC S500 Drying Standard", note: "Certification badge shown once obtained", placeholder: true },
  { label: "WSIB Covered", note: "Clearance certificate on request", placeholder: true },
  { label: "Fully Insured", note: "Liability, pollution & mould coverage", placeholder: true },
  { label: "Direct Insurance Billing", note: "Direction to Pay form on every claim" },
];

export type Faq = { q: string; a: string };

export const homeFaqs: Faq[] = [
  {
    q: "How fast can RapidDry get to my home in Toronto?",
    a: "Our emergency line is answered 24/7 and crews are positioned across the GTA. Our target is to be on site within 60 minutes of your call anywhere in Toronto, York Region and Mississauga. Traffic and weather can extend that, and the dispatcher will give you a realistic arrival window when you call.",
  },
  {
    q: "Do I have to pay for water damage restoration up front?",
    a: "No. For covered claims we bill your insurance company directly using a Direction to Pay form. You are responsible only for your policy deductible. If a loss is not covered, we explain the scope in writing before any chargeable work starts.",
  },
  {
    q: "Does home insurance cover water damage in Ontario?",
    a: "Most Ontario home policies cover sudden and accidental water damage, such as a burst pipe or an appliance failure. Sewer backup and overland flooding are optional endorsements that must be added to the policy. Gradual seepage, long-term leaks and lack of maintenance are usually excluded. We help you confirm your coverage with your broker on the first day.",
  },
  {
    q: "What should I do while I wait for the crew?",
    a: "If it is safe, shut off the main water valve and turn off the power to any area with standing water at the breaker panel. Do not walk through water near outlets or appliances. Move valuables and electronics up off the floor. Take photos of everything before touching it. Do not use a household vacuum on water.",
  },
  {
    q: "How long does the drying process take?",
    a: "Most residential water losses dry in 3 to 5 days once extraction and tear-out are complete. Hardwood floors, concrete and heavily saturated assemblies can take longer. We measure moisture every day and remove the equipment only when readings are back to the dry standard.",
  },
  {
    q: "Which areas do you serve?",
    a: "RapidDry Restoration serves Toronto, North York, Etobicoke, Scarborough, Vaughan, Thornhill, Richmond Hill, Markham and Mississauga. Each area has its own page with local flood risks, subsidy programs and response notes.",
  },
];

export type InsuranceStep = { n: number; title: string; body: string };

export const insuranceSteps: InsuranceStep[] = [
  {
    n: 1,
    title: "Contact us (24/7)",
    body: "Call the emergency line first, not your insurer. Stopping the damage quickly is what every policy expects of you, and our crew documents the loss from the moment we arrive.",
  },
  {
    n: 2,
    title: "We inspect & document",
    body: "Moisture maps, photos, a video walkthrough, the water category and a written scope. This is the evidence your adjuster needs and it is what gets the claim approved.",
  },
  {
    n: 3,
    title: "We handle the claim",
    body: "You sign a Direction to Pay so the insurer pays us directly. We open the claim with you, send the scope in the Xactimate format adjusters use, and meet the adjuster on site.",
  },
  {
    n: 4,
    title: "We restore your property",
    body: "Extraction, tear-out, drying and mould prevention, then the rebuild through Rebuild Pro Contracting. You pay only your deductible for covered work.",
  },
];

export const insuranceFaqs: Faq[] = [
  {
    q: "Who pays for water damage restoration?",
    a: "For a covered loss your insurance company pays the restoration company, minus your deductible. RapidDry bills the insurer directly, so you are not out of pocket for the emergency work. If the cause is not covered, you pay the restoration company yourself, and we agree the scope with you in writing first.",
  },
  {
    q: "What is a deductible and when do I pay it?",
    a: "The deductible is the portion of any claim you pay yourself. The amount is set by your policy, and some policies carry a higher water damage deductible. It is deducted from the insurer's payment, so you settle it with us at the end of the job, not before work starts.",
  },
  {
    q: "What does an insurance adjuster do?",
    a: "The adjuster represents the insurer. They confirm the cause of loss, decide what the policy covers and review the scope. We meet them on site, walk them through the moisture map and photos, and answer their questions so the claim moves quickly. You can be present too.",
  },
  {
    q: "What is a Direction to Pay form?",
    a: "A Direction to Pay is a short form you sign that instructs your insurer to pay RapidDry directly for the covered work. It is standard in the restoration industry and means you never have to front the cost and wait for reimbursement. We bring it on the first visit.",
  },
  {
    q: "Should I call my insurance company or a restoration company first?",
    a: "Call us first. Every policy requires you to mitigate further damage, and every hour water sits raises the cost. We can help you open the claim as soon as the emergency work is under way, and many insurers will ask which restoration company is already on site.",
  },
  {
    q: "Will my premiums go up if I make a water damage claim?",
    a: "Possibly. Claims history is one factor insurers use at renewal, and this varies by company. For a small loss below or near your deductible it may be cheaper to pay directly. We tell you honestly when a job is small enough that a claim may not be worth it.",
  },
  {
    q: "What is not covered by home insurance?",
    a: "Common exclusions in Ontario are gradual leaks, seepage through the foundation, wear and tear, frozen pipes when the heat was off and the home unchecked, and sewer backup or overland flood when the endorsement was not purchased. Your policy wording controls. We will read it with you.",
  },
];
