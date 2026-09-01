import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="header-mark" href="/" aria-label="Turya home">
        TURYA
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        <Link href="/#what-we-do">What we do</Link>
        <Link href="/#products">Products</Link>
        <Link href="/partners">For brands</Link>
      </nav>
      <details className="mobile-menu">
        <summary aria-label="Open navigation menu">
          <span />
          <span />
        </summary>
        <nav aria-label="Mobile navigation">
          <Link href="/#what-we-do">What we do</Link>
          <Link href="/#products">Products</Link>
          <Link href="/partners">For brands</Link>
        </nav>
      </details>
    </header>
  );
}
