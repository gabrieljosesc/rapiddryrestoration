import { site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { BadgeIcon, PhoneIcon } from "@/components/Icons";

/** The navy "Need help now?" band from the homepage design, reusable on inner pages. */
export function CtaBand({
  title = "Need Help Now?",
  sub = "Call 24/7 for immediate assistance.",
  location = "cta-band",
}: {
  title?: string;
  sub?: string;
  location?: string;
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div className="cta-band__item">
          <span className="cta-band__icon">
            <PhoneIcon size={24} />
          </span>
          <div>
            <strong>{title}</strong>
            <span>{sub}</span>
          </div>
        </div>
        <CallLink location={location} className="btn btn--red btn--lg">
          <PhoneIcon size={20} /> Call Now {site.phone}
        </CallLink>
        <div className="cta-band__item">
          <span className="cta-band__icon">
            <BadgeIcon size={24} />
          </span>
          <div>
            <strong>Fast. Reliable. Professional.</strong>
            <span>That&apos;s the RapidDry difference.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
