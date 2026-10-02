import type { MetadataRoute } from "next";
import { areas, areaUrl } from "@/lib/areas";
import { guides } from "@/lib/guides";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const CONTENT_UPDATED = "2026-09-29";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(CONTENT_UPDATED);
  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
  ) => ({ url: `${site.url}${path}`, lastModified: updated, changeFrequency, priority });

  return [
    entry("", 1, "weekly"),
    entry("/services", 0.9),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.9)),
    entry("/insurance-claims", 0.9),
    entry("/our-process", 0.8),
    entry("/areas", 0.8),
    ...areas.map((a) => entry(areaUrl(a.slug), 0.85)),
    entry("/about", 0.6),
    entry("/reviews", 0.7),
    entry("/resources", 0.7, "weekly"),
    ...guides.map((g) => ({
      url: `${site.url}/resources/${g.slug}`,
      lastModified: new Date(g.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    entry("/contact", 0.8),
    entry("/privacy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];
}
