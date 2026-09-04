import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";

export default function PartnersPage() {
  return (
    <div className="site-shell partners-page">
      <SiteHeader />
      <main>
        <section className="partner-hero">
          <Reveal>
            <p className="eyebrow">For brands / partners</p>
            <h1>Support the<br />next builder.</h1>
            <p className="partner-lede">
              Turya is an ecosystem for young builders. We bring thoughtful
              partners into the rooms where young people learn to make — through
              hackathons, game jams, and practical education shaped around
              participation, not just placement.
            </p>
          </Reveal>
        </section>

        <section className="partner-details section-panel">
          <Reveal>
            <p className="eyebrow">Ways to show up</p>
            <div className="partner-list">
              <div><span>01</span><h2>Back a build</h2><p>Put resources behind a focused hackathon or game jam.</p></div>
              <div><span>02</span><h2>Teach a room</h2><p>Share a real practice, tool, or point of view with builders.</p></div>
              <div><span>03</span><h2>Build with us</h2><p>Shape a brief or challenge that gives people something worth making.</p></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="partner-contact">
              <p className="eyebrow">Start a conversation</p>
              <a href="mailto:partners@turya.in" className="contact-email">partners@turya.in <Arrow /></a>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="site-footer">
        <Link href="/">← Back to Turya</Link>
        <span>© Turya 2026</span>
        <span>Partners</span>
      </footer>
    </div>
  );
}
