import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using the ${site.name} website and requesting emergency restoration service.`,
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        answer="These terms cover use of this website and how emergency restoration work is authorised, billed and warranted."
        crumbs={[{ name: "Terms of Service", href: "/terms" }]}
      />
      <section className="section">
        <div className="container prose">
          <p className="updated">Last updated: September 29, 2026</p>
          <h2>Requesting service</h2>
          <p>
            Submitting the emergency form or calling the emergency line is a request for contact, not a binding
            order. Work begins only after you sign a work authorisation on site. Response times are targets, not
            guarantees, and depend on traffic, weather and crew availability.
          </p>
          <h2>Insurance billing</h2>
          <p>
            Where you sign a Direction to Pay, we invoice your insurer directly for covered work. You remain
            responsible for your policy deductible and for any work your insurer declines to cover, which we will
            quote in writing before proceeding.
          </p>
          <h2>Estimates and pricing</h2>
          <p>
            Cost ranges published on this site are typical figures for Toronto and the GTA and are provided for
            guidance. Actual pricing is set out in the written scope for your job, prepared in industry-standard
            estimating software.
          </p>
          <h2>Warranty</h2>
          <p>
            Drying work is complete when moisture readings meet the dry standard recorded in your drying log.
            Rebuild work is performed and warranted by Rebuild Pro Contracting under its own agreement.
          </p>
          <h2>Website content</h2>
          <p>
            Guides and articles are general information for Ontario homeowners and are not legal or insurance
            advice. Your policy wording governs your coverage. We update content regularly and show a last-updated
            date on key pages.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms: <a href={site.emailHref}>{site.email}</a> or {site.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
