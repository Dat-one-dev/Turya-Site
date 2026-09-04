import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { CbsemasteryCard } from "@/components/cbsemastery-card";

export const metadata: Metadata = {
  title: "Turya — Media",
  description:
    "Courses and content made by the Turya team — practical education for builders, in public.",
};

export default function MediaPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="partner-hero">
          <Reveal>
            <p className="eyebrow">Courses & content</p>
            <h1>
              Learn by
              <br />
              making it.
            </h1>
            <p className="partner-lede">
              Media and courses from the studio — built from real work, not theory. The first one is live,
              more are in the works.
            </p>
          </Reveal>
        </section>

        <section className="partner-details section-panel">
          <Reveal>
            <p className="eyebrow">Featured — live now</p>
            <div className="product-grid">
              <Reveal className="product-card product-card-featured" delay={0.06}>
                <CbsemasteryCard />
              </Reveal>
              <Reveal className="product-card" delay={0.12}>
                <div className="product-topline">
                  <span className="product-status product-status-muted">Next</span>
                  <span>Media / 02</span>
                </div>
                <div>
                  <h3>More in the works</h3>
                  <p>
                    New courses, guides, and content drops are being built alongside the community. No
                    fake placeholders — they’ll appear here when they’re ready.
                  </p>
                </div>
                <span className="text-link text-link-muted">Coming soon</span>
              </Reveal>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="empty-state empty-state--media">
              <p className="empty-state-title">One live course — more to come.</p>
              <p className="empty-state-copy">
                cbsemastery.in is the first media product from Turya. Future courses and series will be
                added here as real cards, not mockups — adding one is just adding one object to the data
                array.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="partner-contact">
              <p className="eyebrow">Have a topic you want taught?</p>
              <a href="mailto:hello@turya.in" className="contact-email">
                hello@turya.in <Arrow />
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer">
        <Link href="/">← Back to Turya</Link>
        <span>© Turya 2026</span>
        <span>Media</span>
      </footer>
    </div>
  );
}
