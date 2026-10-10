"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/events", label: "Events" },
  { href: "/media", label: "Media" },
  { href: "/blog", label: "Blog" },
  { href: "/partners", label: "For brands" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 160);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const headerClass = [
    "site-header",
    scrolled ? "is-scrolled" : "",
    hidden && !open ? "is-hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClass}>
        <Link className="header-mark" href="/" aria-label="Turya home" translate="no">
          TURYA
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? "is-active" : undefined}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          className="mobile-nav-toggle"
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className="scroll-progress" aria-hidden="true" />
      </header>
      <button
        type="button"
        className={`mobile-drawer-backdrop${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
        aria-label="Close navigation menu"
        tabIndex={open ? 0 : -1}
      />
      <aside className={`mobile-drawer${open ? " open" : ""}`} aria-label="Mobile navigation">
        <div className="mobile-drawer-top">
          <span className="header-mark" translate="no">TURYA</span>
          <button
            className="mobile-drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>
        <nav>
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              <span className="mobile-drawer-index">0{i + 1}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mobile-drawer-foot">An ecosystem for young builders</p>
      </aside>
    </>
  );
}
