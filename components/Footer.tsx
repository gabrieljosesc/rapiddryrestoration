import Link from "next/link";
import { areas, areaUrl } from "@/lib/areas";
import { guides } from "@/lib/guides";
import { services } from "@/lib/services";
import { sisterCompanies, site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { ExternalIcon } from "@/components/Icons";
import { Logo } from "@/components/Logo";

export function Footer() {
  const a = site.address;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            <Logo variant="light" />
            <p className="footer__about">
              24/7 emergency water damage restoration for Toronto and the GTA. We
              find the source, remove the water, dry the structure and bill your
              insurance company directly.
            </p>
            <div className="footer__nap">
              <strong>{site.legalName}</strong>
              <span>
                {[a.street, `${a.city}, ${a.region}`, a.postal].filter(Boolean).join(", ")}
              </span>
              <CallLink location="footer">{site.phone} (24/7)</CallLink>
              <a href={site.emailHref}>{site.email}</a>
              <span>{site.hours}</span>
            </div>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.navLabel}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Areas We Serve</h4>
            <ul>
              {areas.map((c) => (
                <li key={c.slug}>
                  <Link href={areaUrl(c.slug)}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/insurance-claims">Insurance Claims</Link>
              </li>
              <li>
                <Link href="/our-process">Our Process</Link>
              </li>
              <li>
                <Link href="/about">About &amp; Certifications</Link>
              </li>
              <li>
                <Link href="/reviews">Reviews &amp; Gallery</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
            <h4 style={{ marginTop: 26 }}>Guides</h4>
            <ul>
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/resources/${g.slug}`}>{g.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__sisters">
          <h4>Sister Companies</h4>
          <div className="sister-grid">
            <div className="sister-card sister-card--self">
              <em>Restoration</em>
              <strong>{site.name}</strong>
              Emergency water removal, drying and insurance claims. You are here.
            </div>
            {sisterCompanies.map((c) => (
              <a
                key={c.name}
                href={c.url}
                className="sister-card"
                target="_blank"
                rel="noopener"
              >
                <em>{c.role}</em>
                <strong>
                  {c.name} <ExternalIcon size={14} />
                </strong>
                {c.description}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </span>
          <span>
            <Link href="/privacy">Privacy Policy</Link>
            {" · "}
            <Link href="/terms">Terms of Service</Link>
            {" · "}
            <a href="/llms.txt">llms.txt</a>
          </span>
          <span>24/7 Emergency Water Damage Restoration · {site.serviceArea}</span>
        </div>
      </div>
    </footer>
  );
}
