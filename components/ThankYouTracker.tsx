"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { consumePendingLead, trackLeadSubmitted } from "@/lib/analytics";

/** Fires the lead conversion exactly once per submission id on the confirmation page. */
export function ThankYouTracker() {
  const params = useSearchParams();
  useEffect(() => {
    const id = params.get("id");
    const kind = params.get("kind") ?? "emergency";
    if (id && consumePendingLead(id)) trackLeadSubmitted(kind);
  }, [params]);
  return null;
}
