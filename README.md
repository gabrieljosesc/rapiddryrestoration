# RapidDry Restoration

Marketing + lead-capture site for **RapidDry Restoration**, 24/7 emergency water
damage restoration for Toronto and the GTA. Built on the same stack as DryFort
Waterproofing: **Next.js 16 (App Router) + TypeScript**, plain-CSS design
system, **Supabase** for leads, optional Resend alerts, GA4/GTM/Google Ads.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run typecheck` runs `tsc --noEmit`; `npm run build` produces the static/SSR build.

## Supabase

1. Create a project and run `supabase/schema.sql` in the SQL editor (creates `emergency_requests`).
2. Copy `.env.example` → `.env.local` and fill in the URL, anon key and service-role key.

Without env vars every form runs in demo mode: submissions are accepted, logged and not persisted.

## Placeholders Joe must supply before launch

Search the code for `PLACEHOLDER`. The important ones, all in `lib/site.ts`:

| Item | Where | Note |
| --- | --- | --- |
| Phone number | `MAIN_PHONE` | Must match the Google Business Profile. A call-tracking number can be set with `NEXT_PUBLIC_TRACKING_PHONE`. |
| Response-time promise | `site.responsePromise` / `responseMinutes` | Currently "On site in 60 minutes". |
| Address, email, legal name | `site.address`, `site.email`, `site.legalName` | Used in NAP footer + LocalBusiness schema. |
| Domain | `site.url` | Set once the .ca is purchased. Drives canonical URLs, sitemap, llms.txt, IndexNow. |
| Reviews | `reviews`, `reviewSummary` | Sample content. Replace with real Google/HomeStars reviews. |
| Certifications | `trustBadges` | IICRC/WSIB/insurance flagged `placeholder: true` until obtained. |
| Sister site URL | `sisterCompanies[0].url` | Rebuild Pro Contracting domain. |
| Imagery | `lib/images.ts`, `public/images/` | Four brand renders + verified Unsplash photos. Swap for job-site photography. |
| Before/after gallery | `app/reviews/page.tsx` | Sample pairs. |

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, quick services, 8 service cards, insurance split, process, reviews, FAQ, CTA |
| `/services`, `/services/<slug>` | Index + 8 unique service pages (leak detection, extraction, burst/frozen pipes, flooded basements, sewer backup, tear-out, structural drying, mould prevention) |
| `/insurance-claims` | Step-by-step process, coverage table, deductibles, adjusters, Direction to Pay, FAQ |
| `/our-process` | Call → Inspect → Remove → Dry → Rebuild (links to Rebuild Pro Contracting) |
| `/areas`, `/water-damage-restoration-<area>` | Index + 9 unique area pages (Toronto, North York, Etobicoke, Scarborough, Vaughan, Thornhill, Richmond Hill, Markham, Mississauga) |
| `/about` | Story, certifications (placeholders), standards, sister companies |
| `/reviews` | Reviews with Review/AggregateRating schema + before/after gallery |
| `/resources`, `/resources/<slug>` | Guide hub + 5 guides with last-updated dates |
| `/contact` | 24/7 line, full emergency form |
| `/thank-you` | Conversion page (fires lead conversion once per submission) |

Every page also gets the compact emergency form band (name, phone, address,
what happened) above the footer, the sticky mobile call bar, the header call
button and the "Sister companies" footer (Restoration / Rebuild Pro / DryFort).

## Content architecture

All copy lives in TypeScript so it is server-rendered as plain HTML:

- `lib/site.ts` – brand config, nav, process steps, insurance steps/FAQs, reviews, trust badges
- `lib/services/*.ts` – one file per service (`ServicePage` type in `lib/content-types.ts`)
- `lib/areas/*.ts` – one file per area (`AreaPage`)
- `lib/guides/*.ts` – one file per guide (`Guide` with block-based body)

Every service/area/guide page opens with a 1–2 sentence "answer" (AI-quotable),
uses question headings, and has its own FAQ.

## SEO / AI search

- One H1 per page; service + area keywords in titles; canonical URLs.
- JSON-LD: Organization/LocalBusiness (layout), Service + BreadcrumbList + FAQPage (service and area pages), Article (guides), Review/AggregateRating (reviews).
- `app/robots.ts` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Google-Extended, Bingbot.
- `app/sitemap.ts` – submit to Google Search Console and Bing Webmaster Tools.
- `/llms.txt` – company summary for AI assistants.
- IndexNow: set `INDEXNOW_KEY`, the key is served at `/indexnow.txt`; after each deploy run
  `curl -X POST https://<domain>/api/indexnow -H "x-indexnow-key: <key>"` to push the sitemap URLs to Bing.

## Tracking

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` enables GA4; `NEXT_PUBLIC_GTM_ID` the ads team's container; `NEXT_PUBLIC_GOOGLE_ADS_ID` + labels enable conversions.
- Two conversions: **form submitted** (fires on `/thank-you`) and **call button tapped** (`components/CallLink.tsx`, every phone link on the site, with a `location` label per placement).
- UTM parameters and `gclid` are stored with each lead (`utm` column).

## Launch checklist

- [ ] Names confirmed via Ontario Business Registry; buy `.ca` (+ `.com`)
- [ ] Set `site.url`, phone, address, email; run `npm run build`
- [ ] Supabase project + schema; env vars on the host
- [ ] Google Business Profile with matching NAP; add its URL to `site.sameAs`
- [ ] Submit sitemap to Google Search Console + Bing Webmaster Tools; set `INDEXNOW_KEY` and POST `/api/indexnow`
- [ ] GA4 + Google Ads conversions + call-tracking number
- [ ] Replace sample reviews and gallery; add IICRC badge once certified
- [ ] Cross-links live on DryFort and Rebuild Pro sites
