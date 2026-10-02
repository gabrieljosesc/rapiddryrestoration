import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects the information you share when you request emergency service.`,
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        answer={`${site.name} collects only the information needed to dispatch help, document your loss and bill your insurer. We never sell or rent your information.`}
        crumbs={[{ name: "Privacy Policy", href: "/privacy" }]}
      />
      <section className="section">
        <div className="container prose">
          <p className="updated">Last updated: September 29, 2026</p>
          <h2>What we collect</h2>
          <p>
            When you call or submit the emergency form we collect your name, phone number, property address, an
            optional email address and a description of what happened. On site, our technicians take photographs,
            moisture readings and notes about the property, which form part of your restoration file.
          </p>
          <h2>How we use it</h2>
          <ul>
            <li>To dispatch a crew and contact you about the job.</li>
            <li>To document the loss for your insurance claim and, with your Direction to Pay, bill your insurer.</li>
            <li>To send updates about drying progress and next steps.</li>
            <li>To measure which advertising brings emergency calls (aggregate analytics only).</li>
          </ul>
          <h2>Who we share it with</h2>
          <p>
            Your file is shared with your insurance company and adjuster when you make a claim, and with our sister
            company Rebuild Pro Contracting if you choose them for the rebuild. We use trusted service providers to
            store form submissions and send email alerts. We do not sell personal information.
          </p>
          <h2>Cookies and analytics</h2>
          <p>
            The site uses Google Analytics and Google Ads conversion tracking to understand which pages and ads
            lead to calls. These tools set cookies. You can block them in your browser without affecting your
            ability to reach us.
          </p>
          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete the personal information we hold by emailing{" "}
            <a href={site.emailHref}>{site.email}</a>. We keep restoration files for the period required for
            insurance and warranty purposes, then delete them.
          </p>
          <h2>Contact</h2>
          <p>
            {site.legalName}, {site.address.street}, {site.address.city}, {site.address.region}. Phone {site.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
