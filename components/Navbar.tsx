"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { CallLink } from "@/components/CallLink";
import { ChevronIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/Icons";
import { Logo } from "@/components/Logo";

export type NavLinkItem = { href: string; label: string; note?: string };

export function Navbar({
  serviceLinks,
  areaLinks,
}: {
  serviceLinks: NavLinkItem[];
  areaLinks: NavLinkItem[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href) || (href === "/areas" && pathname.startsWith("/water-damage-restoration-"));

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <Logo />

          <nav className="nav" aria-label="Primary">
            {navLinks.map((link) => {
              const menu = "menu" in link ? link.menu : undefined;
              return (
                <div className="nav__item" key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive(link.href) ? "nav__link nav__link--active" : "nav__link"}
                  >
                    {link.label}
                    {menu && <ChevronIcon size={14} />}
                  </Link>
                  {menu === "services" && (
                    <div className="nav__menu nav__menu--wide">
                      {serviceLinks.map((s) => (
                        <Link key={s.href} href={s.href} className="nav__menu-link">
                          {s.label}
                          {s.note && <small>{s.note}</small>}
                        </Link>
                      ))}
                    </div>
                  )}
                  {menu === "areas" && (
                    <div className="nav__menu">
                      {areaLinks.map((a) => (
                        <Link key={a.href} href={a.href} className="nav__menu-link">
                          {a.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="header__badge">
            <span className="header__badge-icon">24/7</span>
            <span>
              24/7 Emergency
              <br />
              Service
            </span>
          </div>

          <CallLink location="header" className="btn btn--red header__cta">
            <PhoneIcon size={18} />
            <span>
              <small>Call Now</small>
              <br />
              <strong>{site.phone}</strong>
            </span>
          </CallLink>

          <CallLink location="header-mobile" className="header__cta-mobile" ariaLabel={`Call ${site.phone}`}>
            <PhoneIcon size={20} />
          </CallLink>

          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </header>

      <div className={open ? "drawer drawer--open" : "drawer"} aria-hidden={!open}>
        <Link href="/" className="drawer__link">
          Home
        </Link>
        <details className="drawer__group">
          <summary>
            Services <ChevronIcon size={18} />
          </summary>
          <div className="drawer__sub">
            <Link href="/services">All services</Link>
            {serviceLinks.map((s) => (
              <Link key={s.href} href={s.href}>
                {s.label}
              </Link>
            ))}
          </div>
        </details>
        <Link href="/insurance-claims" className="drawer__link">
          Insurance Claims
        </Link>
        <Link href="/our-process" className="drawer__link">
          Our Process
        </Link>
        <details className="drawer__group">
          <summary>
            Areas We Serve <ChevronIcon size={18} />
          </summary>
          <div className="drawer__sub">
            {areaLinks.map((a) => (
              <Link key={a.href} href={a.href}>
                {a.label}
              </Link>
            ))}
          </div>
        </details>
        <Link href="/about" className="drawer__link">
          About
        </Link>
        <Link href="/reviews" className="drawer__link">
          Reviews
        </Link>
        <Link href="/resources" className="drawer__link">
          Resources
        </Link>
        <Link href="/contact" className="drawer__link">
          Contact
        </Link>
        <div className="drawer__cta">
          <CallLink location="drawer" className="btn btn--red btn--lg btn--block">
            <PhoneIcon size={20} /> Call {site.phone}
          </CallLink>
          <Link href="/contact" className="btn btn--ghost btn--block">
            Send an emergency request
          </Link>
        </div>
      </div>
    </>
  );
}
