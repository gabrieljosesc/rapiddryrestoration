import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/images";
import { insuranceFaqs, insuranceSteps, site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { ArrowIcon, CameraIcon, CheckCircleIcon, DocumentIcon, PhoneIcon, ShieldIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "How Water Damage Insurance Claims Work in Ontario | Direct Billing",
  description:
    "Step-by-step: who pays for water damage restoration, deductibles, working with the adjuster and the Direction to Pay form that lets RapidDry bill your insurer directly.",
  alternates: { canonical: "/insurance-claims" },
};

const covered = [
  { title: "Usually covered", items: ["Burst or leaking pipes (sudden)", "Appliance failures: dishwasher, washer, water heater", "Overflowing tubs, sinks and toilets", "Ice dam and roof leaks from a storm", "Resulting tear-out, drying and rebuild"] },
  { title: "Only with an endorsement", items: ["Sewer or drain backup", "Overland flooding from rivers, lakes or heavy rain", "Sump pump failure (often bundled with backup)"] },
  { title: "Usually excluded", items: ["Seepage through the foundation or floor slab", "Gradual leaks and long-term damage", "Frozen pipes when heat was off and the home unchecked", "Wear, tear and lack of maintenance"] },
];

export default function InsuranceClaimsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance Claims"
        title="How Water Damage Insurance Claims Work"
        answer={`${site.name} bills your insurance company directly through a Direction to Pay form, so you pay only your deductible for covered work. Here is the whole process, from the first call to the final invoice.`}
        crumbs={[{ name: "Insurance Claims", href: "/insurance-claims" }]}
        image={images.insuranceMeeting}
        imageAlt="Homeowner reviewing an insurance claim with an adjuster"
        secondaryCta={{ label: "Download the Direction to Pay", href: "#direction-to-pay" }}
      />

      <section className="section">
        <div className="container content-grid">
          <article className="prose">
            <p className="lead">
              Emergency water damage is one of the most common home insurance claims in Ontario, and the process
              is more predictable than most homeowners expect. The key facts: call the restoration company first,
              document everything, and let a company that works with adjusters every week carry the paperwork.
            </p>

            <h2>What happens, step by step</h2>
            <ol className="steps">
              {insuranceSteps.map((s) => (
                <li key={s.n} className="step">
                  <span className="step__num">{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2>What does Ontario home insurance usually cover?</h2>
            <p>
              Standard Ontario policies cover sudden and accidental escape of water from plumbing, heating or
              appliances. Sewer backup and overland flood are optional endorsements that many insurers have offered
              since about 2015, and they must be on your policy before the loss. Your policy wording controls; we
              read it with you on the first visit.
            </p>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    {covered.map((c) => (
                      <th key={c.title}>{c.title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {covered.map((c) => (
                      <td key={c.title}>
                        <ul style={{ margin: 0, paddingLeft: 18 }}>
                          {c.items.map((i) => (
                            <li key={i}>{i}</li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>What is a deductible?</h2>
            <p>
              Your deductible is the part of any claim you pay yourself. The amount is set in your policy, and
              some policies carry a separate, higher water damage or sewer backup deductible. It comes
              off the insurer&apos;s payment to us, so you settle it at the end of the job rather than before work
              starts.
            </p>

            <h2>Working with the adjuster</h2>
            <p>
              The adjuster confirms the cause of loss, decides what the policy covers and reviews the scope. We
              prepare that scope in Xactimate, the estimating platform adjusters use, so line items match what
              they expect to see. We meet them on site, walk through the moisture map and photographs, and answer
              their questions. You are welcome to be there too. Most residential water claims are approved within
              days when the documentation is complete.
            </p>

            <h2 id="direction-to-pay">The Direction to Pay form</h2>
            <div className="callout">
              <div className="callout__title">What it does</div>
              <p>
                A one-page form you sign that instructs your insurer to pay {site.name} directly for the covered
                work. It is standard across the restoration industry. It does not change your coverage or your
                deductible; it only changes who the cheque is made out to, so you never front the cost. We bring
                it on the first visit and leave you a copy.
              </p>
            </div>

            <h2>What to document before we arrive</h2>
            <ul className="check-grid">
              <li>
                <CameraIcon size={20} /> <span>Photos and a short video of the water, the source and every affected room</span>
              </li>
              <li>
                <DocumentIcon size={20} /> <span>Your policy number and the broker or insurer phone number</span>
              </li>
              <li>
                <CheckCircleIcon size={20} /> <span>Receipts or photos of damaged contents (electronics, furniture, flooring)</span>
              </li>
              <li>
                <ShieldIcon size={20} /> <span>The time you noticed the water and what you did to stop it</span>
              </li>
            </ul>

            <h2>Insurance claim FAQ</h2>
            <Faq items={insuranceFaqs} openFirst={false} />
          </article>

          <aside className="sidebar">
            <div className="sidebar-card sidebar-card--navy">
              <h3>Start your claim the right way</h3>
              <p>Call us first. We stop the damage, document the loss and open the claim with you.</p>
              <CallLink location="insurance-sidebar" className="btn btn--red btn--block mt-2">
                <PhoneIcon size={18} /> {site.phone}
              </CallLink>
            </div>
            <div className="sidebar-card">
              <h3>Related reading</h3>
              <ul className="link-list">
                <li>
                  <Link href="/resources/does-home-insurance-cover-water-damage-ontario">
                    Does insurance cover water damage in Ontario? <ArrowIcon size={14} />
                  </Link>
                </li>
                <li>
                  <Link href="/resources/burst-pipe-vs-sewer-backup-whats-covered">
                    Burst pipe vs. sewer backup <ArrowIcon size={14} />
                  </Link>
                </li>
                <li>
                  <Link href="/resources/how-long-to-dry-flooded-basement">
                    How long drying takes <ArrowIcon size={14} />
                  </Link>
                </li>
                <li>
                  <Link href="/our-process">
                    Our restoration process <ArrowIcon size={14} />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="sidebar-card sidebar-card--blue">
              <h3>One claim, whole job</h3>
              <p>
                Rebuild Pro Contracting restores drywall, insulation, flooring and paint under the same claim once
                drying is complete.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section--alt section--tight">
        <div className="container split" style={{ gap: 32, alignItems: "center" }}>
          <div className="process__media" style={{ aspectRatio: "3/2" }}>
            <Image src={images.drying} alt="Air movers and dehumidifier drying a room after tear-out" fill sizes="(min-width: 960px) 45vw, 100vw" />
          </div>
          <div>
            <span className="eyebrow">Documentation adjusters trust</span>
            <h2 className="section-title">Every job leaves a paper trail</h2>
            <p className="section-lead">
              Moisture map, daily drying log, photo set, water category, equipment list and a scope in Xactimate
              format. It is the difference between a claim that is approved in days and one that drags for weeks.
            </p>
          </div>
        </div>
      </section>

      <CtaBand location="insurance-cta" />
    </>
  );
}
