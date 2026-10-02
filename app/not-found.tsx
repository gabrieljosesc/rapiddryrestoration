import Link from "next/link";
import { site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { PhoneIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="confirmation">
          <span className="eyebrow">404</span>
          <h1 className="section-title">That page is not here</h1>
          <p className="section-lead" style={{ margin: "0 auto 24px" }}>
            The link may be old or mistyped. If you have water coming in right now, skip the browsing and call.
          </p>
          <div className="actions" style={{ justifyContent: "center" }}>
            <CallLink location="404" className="btn btn--red">
              <PhoneIcon size={18} /> Call {site.phone}
            </CallLink>
            <Link href="/" className="btn btn--ghost">
              Back to home
            </Link>
            <Link href="/services" className="btn btn--ghost">
              Our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
