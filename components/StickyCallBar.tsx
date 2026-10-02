import { site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { PhoneIcon } from "@/components/Icons";

/** Mobile-only sticky click-to-call bar. Hidden at >= 900px (see globals.css). */
export function StickyCallBar() {
  return (
    <CallLink location="sticky-mobile" className="sticky-call" ariaLabel={`Call ${site.phone} now`}>
      <PhoneIcon size={22} />
      <span>
        <small>24/7 Emergency · Tap to call</small>
        {site.phone}
      </span>
    </CallLink>
  );
}
