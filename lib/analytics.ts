/**
 * GA4 + Google Ads conversion tracking. No-ops until env vars are set.
 * Two conversions matter for an emergency service: the form submitted and the
 * phone number tapped. Call clicks fire from components/CallLink.tsx.
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
const ADS_CALL_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag(...args);
}

export function trackCallClick(location: string) {
  gtag("event", "phone_call_click", { location });
  if (GOOGLE_ADS_ID && ADS_CALL_LABEL) {
    gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${ADS_CALL_LABEL}` });
  }
}

const PENDING_KEY = "rd_pending_lead";

export function markPendingLead(id: string) {
  try {
    window.sessionStorage.setItem(PENDING_KEY, id);
  } catch {
    /* storage unavailable */
  }
}

/** True once for a given submission id, so the conversion fires exactly once. */
export function consumePendingLead(id: string) {
  try {
    if (window.sessionStorage.getItem(PENDING_KEY) !== id) return false;
    window.sessionStorage.removeItem(PENDING_KEY);
    return true;
  } catch {
    return false;
  }
}

export function trackLeadSubmitted(kind: string) {
  gtag("event", "generate_lead", { currency: "CAD", lead_type: kind });
  if (GOOGLE_ADS_ID && ADS_LEAD_LABEL) {
    gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${ADS_LEAD_LABEL}` });
  }
}
