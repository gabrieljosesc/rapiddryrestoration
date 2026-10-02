import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { CheckIcon, PhoneIcon } from "@/components/Icons";
import { ThankYouTracker } from "@/components/ThankYouTracker";

export const metadata: Metadata = {
  title: "Request Received",
  description: "Your emergency request has been received. A dispatcher will call you back in minutes.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="section">
      <Suspense fallback={null}>
        <ThankYouTracker />
      </Suspense>
      <div className="container">
        <div className="confirmation">
          <div className="confirmation__icon">
            <CheckIcon size={32} />
          </div>
          <span className="eyebrow">Request received</span>
          <h1 className="section-title">We have your details. A dispatcher is calling you back.</h1>
          <p className="section-lead" style={{ margin: "0 auto 24px" }}>
            Expect a call within minutes, any hour of the day. If water is still
            coming in, do not wait for the callback: shut the main valve if you
            can reach it safely, keep clear of outlets near the water, and call
            the emergency line now.
          </p>
          <div className="actions" style={{ justifyContent: "center" }}>
            <CallLink location="thank-you" className="btn btn--red btn--lg">
              <PhoneIcon size={20} /> Call {site.phone}
            </CallLink>
            <Link href="/resources/first-hour-after-basement-flood" className="btn btn--ghost btn--lg">
              What to do in the first hour
            </Link>
          </div>
          <p className="form__note mt-4">
            While you wait: read <Link href="/insurance-claims">how the insurance claim works</Link> so you know what to expect.
          </p>
        </div>
      </div>
    </section>
  );
}
