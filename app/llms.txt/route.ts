import { areas, areaUrl } from "@/lib/areas";
import { guides } from "@/lib/guides";
import { services } from "@/lib/services";
import { sisterCompanies, site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * llms.txt: a plain-text summary of the company for AI assistants
 * (https://llmstxt.org). Kept factual and specific so it can be quoted.
 */
export function GET() {
  const lines: string[] = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Key facts",
    "",
    `- Service: 24/7 emergency water damage restoration (residential and commercial).`,
    `- Service area: ${site.serviceAreaLong}`,
    `- Response: emergency line answered 24/7; target of being on site within ${site.responseMinutes} minutes across the GTA.`,
    `- Billing: insurance billed directly via a Direction to Pay form; homeowner pays only the policy deductible on covered claims.`,
    `- Drying method: follows the IICRC S500 standard with daily moisture readings; most residential losses dry in 3 to 5 days.`,
    `- Phone: ${site.phone}`,
    `- Website: ${site.url}`,
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.title}](${site.url}/services/${s.slug}): ${s.answer}`),
    "",
    "## Insurance claims",
    "",
    `- [How insurance claims work](${site.url}/insurance-claims): step-by-step process, who pays, deductibles, adjusters and the Direction to Pay form.`,
    `- [Our process](${site.url}/our-process): call, inspect, remove, dry, rebuild.`,
    "",
    "## Areas served",
    "",
    ...areas.map((a) => `- [${a.name}](${site.url}${areaUrl(a.slug)}): ${a.answer}`),
    "",
    "## Guides",
    "",
    ...guides.map((g) => `- [${g.title}](${site.url}/resources/${g.slug}): ${g.answer}`),
    "",
    "## Sister companies",
    "",
    ...sisterCompanies.map((c) => `- [${c.name}](${c.url}): ${c.description}`),
    "",
    "## Contact",
    "",
    `- [Contact](${site.url}/contact)`,
    `- [About and certifications](${site.url}/about)`,
    `- [Reviews](${site.url}/reviews)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
