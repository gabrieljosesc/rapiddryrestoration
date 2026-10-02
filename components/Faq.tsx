import type { Faq as FaqItem } from "@/lib/site";
import { ChevronIcon } from "@/components/Icons";
import { JsonLd, faqSchema } from "@/components/JsonLd";

/**
 * Accessible FAQ using native <details>, so every answer is in the server
 * HTML for crawlers and AI assistants, plus FAQPage structured data.
 */
export function Faq({
  items,
  withSchema = true,
  openFirst = true,
}: {
  items: FaqItem[];
  withSchema?: boolean;
  openFirst?: boolean;
}) {
  return (
    <>
      {withSchema && <JsonLd data={faqSchema(items)} />}
      <div className="faq">
        {items.map((f, i) => (
          <details className="faq__item" key={f.q} open={openFirst && i === 0}>
            <summary className="faq__q">
              <span>{f.q}</span>
              <ChevronIcon size={20} />
            </summary>
            <div className="faq__a">
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
