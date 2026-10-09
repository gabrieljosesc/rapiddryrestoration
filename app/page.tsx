import Image from "next/image";
import Link from "next/link";
import { areas, areaUrl } from "@/lib/areas";
import { images } from "@/lib/images";
import { services } from "@/lib/services";
import { homeFaqs, insuranceSteps, processSteps, quickServices, reviews, reviewSummary, site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import {
  ArrowIcon,
  CheckCircleIcon,
  ClockIcon,
  PhoneIcon,
  PinIcon,
  QuoteIcon,
  ShieldIcon,
  StarIcon,
  processIcons,
  quickIcons,
  serviceIcons,
} from "@/components/Icons";

export default function HomePage() {
  const featured = reviews[0] ?? null;
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <span className="hero__pill">
              <ClockIcon size={16} /> 24/7 Emergency Service
            </span>
            <h1 className="hero__title">
              Water Damage?
              <span>We&apos;re on it.</span>
            </h1>
            <p className="hero__lead">
              Fast, professional water damage restoration to get your property back to normal, 24/7. {site.name}{" "}
              serves Toronto and the GTA and bills your insurance directly.
            </p>
            <div className="hero__trust">
              <div className="trust-item">
                <ShieldIcon size={30} className="trust-item__icon" />
                <span>
                  We Bill Your Insurance
                  <br />
                  Directly
                </span>
              </div>
              <div className="trust-item">
                <ClockIcon size={30} className="trust-item__icon" />
                <span>
                  {site.responsePromise.split(" in ")[0]} in
                  <br />
                  {site.responsePromise.split(" in ")[1] ?? ""}
                </span>
              </div>
            </div>
            <div className="hero__actions">
              <CallLink location="hero" className="btn btn--red btn--lg">
                <PhoneIcon size={20} /> Call Now {site.phone}
              </CallLink>
              <Link href="/contact" className="btn btn--ghost-light">
                Request a callback
              </Link>
            </div>
          </div>
          <div className="hero__media">
            <div className="hero__img">
              <Image
                src={images.hero}
                alt="RapidDry technician extracting standing water from a flooded living room"
                fill
                priority
                sizes="(min-width: 900px) 55vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Quick services strip ---------------- */}
      <section className="quick" aria-label="Core services">
        <div className="container">
          <div className="quick__grid">
            {quickServices.map((q) => {
              const Icon = quickIcons[q.icon];
              return (
                <Link key={q.label} href={q.href} className="quick__item">
                  <Icon size={36} className="quick__icon" />
                  {q.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className="section">
        <div className="container services-home">
          <div>
            <span className="eyebrow">Our Services</span>
            <h2 className="section-title">Complete Water Damage Restoration Services</h2>
            <p className="section-lead">
              From emergency water removal to structural drying, we handle it all. Our team works quickly to
              minimise damage and get your property back to pre-loss condition, then hands off to our sister
              company Rebuild Pro Contracting for the rebuild.
            </p>
            <Link href="/services" className="btn btn--blue mt-3">
              View All Services <ArrowIcon size={18} />
            </Link>
          </div>
          <div className="service-cards">
            {services.map((s) => {
              const Icon = serviceIcons[s.icon];
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="service-card">
                  <Icon size={40} className="service-card__icon" />
                  <span className="service-card__label">
                    {s.navLabel}
                    {s.cardNote && <span className="service-card__note">{s.cardNote}</span>}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Insurance ---------------- */}
      <section className="section--alt">
        <div className="split">
          <div className="split__media">
            <Image
              src={images.insuranceDocs}
              alt="Homeowner signing an insurance claim form"
              fill
              sizes="(min-width: 960px) 45vw, 100vw"
            />
          </div>
          <div className="split__body">
            <span className="eyebrow">Insurance Claims</span>
            <h2 className="section-title">We Work Directly with Your Insurance Company</h2>
            <div className="split__cols">
              <div>
                <p className="section-lead">
                  Take the stress out of the claims process. We bill your insurance directly, so you can focus on
                  getting your life back to normal. You pay only your deductible for covered work.
                </p>
                <ul className="checklist">
                  <li>
                    <CheckCircleIcon size={20} className="checklist__icon" /> Step-by-step claims process
                  </li>
                  <li>
                    <CheckCircleIcon size={20} className="checklist__icon" /> Photo, moisture and video documentation
                  </li>
                  <li>
                    <CheckCircleIcon size={20} className="checklist__icon" /> We meet your adjuster on site
                  </li>
                  <li>
                    <CheckCircleIcon size={20} className="checklist__icon" /> Direct billing (no out-of-pocket beyond
                    your deductible)
                  </li>
                </ul>
                <Link href="/insurance-claims" className="btn btn--ghost mt-3">
                  How insurance claims work <ArrowIcon size={16} />
                </Link>
              </div>
              <div className="how-card">
                <h3>How It Works</h3>
                <ol>
                  {insuranceSteps.map((s) => (
                    <li key={s.n}>
                      <span className="step-num">{s.n}</span>
                      {s.title}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section className="section">
        <div className="container process">
          <div>
            <span className="eyebrow">Our Process</span>
            <h2 className="section-title">From Emergency Call to Full Restoration</h2>
            <p className="section-lead">
              We make the process simple and stress-free, with clear communication at every step.
            </p>
            <div className="process__grid">
              {processSteps.map((step) => {
                const Icon = processIcons[step.icon];
                return (
                  <div key={step.n} className="process-step">
                    <Icon size={34} className="process-step__icon" />
                    <div className="process-step__title">
                      {step.n}. {step.title}
                    </div>
                    <div className="process-step__short">
                      {step.n === 5 ? (
                        <>
                          We restore to pre-loss condition.{" "}
                          <Link href="/our-process#rebuild" style={{ color: "var(--blue)" }}>
                            (Rebuild via our GC site)
                          </Link>
                        </>
                      ) : (
                        step.short
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <Link href="/our-process" className="btn btn--ghost mt-4">
              See the full process <ArrowIcon size={16} />
            </Link>
          </div>
          <div className="process__media">
            <Image
              src={images.houseSuburban}
              alt="Brick homes on a residential street in the Greater Toronto Area"
              fill
              sizes="(min-width: 960px) 38vw, 100vw"
            />
            <div className="area-card">
              <div>
                <div className="area-card__label">
                  <PinIcon size={16} /> Service Area
                </div>
                <h3 className="area-card__title">{site.serviceArea}</h3>
              </div>
              <Link href="/areas" className="btn btn--blue btn--sm">
                View Areas We Serve <ArrowIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Reviews ---------------- */}
      <section className="section--alt section--tight">
        <div className="container reviews-strip">
          <div>
            <span className="eyebrow">What Our Clients Say</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Trusted by Homeowners and Insurance Companies
            </h2>
          </div>
          {featured ? (
            <figure className="review-card">
              <QuoteIcon size={28} className="review-card__quote" />
              <blockquote>
                <p>&ldquo;{featured.text}&rdquo;</p>
              </blockquote>
              <figcaption>
                <cite>
                  — {featured.name}, {featured.location}
                </cite>
              </figcaption>
            </figure>
          ) : (
            <div className="review-card">
              <QuoteIcon size={28} className="review-card__quote" />
              <p>
                Every review on this site comes from a verified RapidDry customer. We are a new brand from the
                team behind DryFort Waterproofing, and the first reviews will appear here as jobs are completed.
              </p>
              <cite>Verified reviews only. Nothing is paid for or staged.</cite>
            </div>
          )}
          <div className="rating">
            {reviewSummary ? (
              <>
                <span className="rating__stars" aria-label={`${reviewSummary.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <StarIcon key={n} size={22} />
                  ))}
                </span>
                <span className="rating__score">{reviewSummary.rating.toFixed(1)}</span>
                <div className="rating__note">Based on {reviewSummary.count}+ reviews</div>
              </>
            ) : (
              <div className="rating__note">Google reviews coming soon</div>
            )}
            <Link href="/reviews" className="small" style={{ color: "var(--blue)", fontWeight: 700 }}>
              See our work &amp; reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="section">
        <div className="container">
          <div className="grid grid--2" style={{ gap: 40, alignItems: "start" }}>
            <div>
              <span className="eyebrow">Common Questions</span>
              <h2 className="section-title">Water damage questions, answered plainly</h2>
              <p className="section-lead">
                Straight answers on response times, who pays, what Ontario insurance covers and what to do right
                now. More detail lives in our <Link href="/resources" style={{ color: "var(--blue)", fontWeight: 700 }}>guides</Link>.
              </p>
              <div className="mt-4">
                <h3 style={{ fontSize: "1rem", marginBottom: 12 }}>Areas we serve</h3>
                <div className="actions">
                  {areas.map((a) => (
                    <Link key={a.slug} href={areaUrl(a.slug)} className="badge">
                      <PinIcon size={12} /> {a.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Faq items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaBand location="home-cta" />
    </>
  );
}
