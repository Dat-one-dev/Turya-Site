"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/events", label: "Events" },
  { href: "/media", label: "Media" },
  { href: "/blog", label: "Blog" },
  { href: "/partners", label: "For brands" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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

  return (
    <header className="site-header">
      <Link className="header-mark" href="/" aria-label="Turya home">
        TURYA
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map((l) => (
          <Link key={l.href} href={l.href}>
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
      <div
        className={`mobile-drawer-backdrop${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside className={`mobile-drawer${open ? " open" : ""}`} aria-label="Mobile navigation">
        <div className="mobile-drawer-top">
          <span className="header-mark">TURYA</span>
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
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              <span className="mobile-drawer-index">0{i + 1}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="mobile-drawer-foot">An ecosystem for young builders</p>
      </aside>
    </header>
  );
}
