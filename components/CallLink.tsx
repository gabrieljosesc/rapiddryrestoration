"use client";

import type { ReactNode } from "react";
import { trackCallClick } from "@/lib/analytics";
import { site } from "@/lib/site";

/**
 * Every phone link on the site goes through this component so a tap on the
 * number is recorded as a conversion (GA4 event + Google Ads call conversion).
 * `location` names where the tap happened, which the ads team uses to see
 * which placement converts.
 */
export function CallLink({
  location,
  className,
  children,
  ariaLabel,
}: {
  location: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={site.phoneHref}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackCallClick(location)}
    >
      {children}
    </a>
  );
}
