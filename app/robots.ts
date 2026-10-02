import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Search engines and AI crawlers are all explicitly allowed. AI search
 * (ChatGPT, Claude, Perplexity, Google AI Overviews) is a first-class
 * acquisition channel for this brand, so each crawler is named rather than
 * relying on the wildcard alone.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/thank-you"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
