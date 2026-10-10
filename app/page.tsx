import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/arrow";
import { EventCard } from "@/components/event-card";
import { PackageCards } from "@/components/package-cards";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { CbsemasteryCard } from "@/components/cbsemastery-card";
import { Marquee } from "@/components/marquee";
import { upcomingEvents } from "@/lib/events";

const activities = [
  {
    number: "01",
    title: "Hackathons & Game Jams",
    text: "Weekend sprints where rough ideas become playable, working things — built together and shipped together.",
    href: "/events",
  },
  {
    number: "02",
    title: "Content & Design",
    text: "Writing, video, and visuals — learning to make things people actually want to watch, read, and share.",
    href: "/media",
  },
  {
    number: "03",
    title: "Course Creation",
    text: "Hands-on courses and learning paths built from real work, not textbooks — made to teach what we wish we had.",
    href: "/media",
  },
  {
    number: "04",
    title: "Teaching & Mentorship",
    text: "Builders teaching builders — critiques, office hours, and small-group mentorship from people a few steps ahead.",
    href: "/events",
  },
  {
    number: "05",
    title: "Learn by Building",
    text: "For the self-taught and curious — pick up skills by shipping real projects in public, with feedback that helps you improve.",
    href: "/blog",
  },
];

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-inner">
            <p className="eyebrow hero-kicker">A place to begin</p>
            <h1 id="hero-title" className="hero-title">
              Go Beyond.
              <br />
              <span>Make Something.</span>
            </h1>
            <p className="hero-statement">
              Turya is where young people pick up real skills — through
              game jams, hackathons, and hands-on projects that actually ship.
            </p>
            <div className="hero-actions">
              <a className="hero-primary" href="mailto:hello@turya.in">
                Get in touch
              </a>
              <a className="hero-secondary" href="#what-we-do">
                Explore more <span aria-hidden="true">→</span>
              </a>
            </div>

          </div>

          <div className="hero-visual" aria-hidden="true">
            <Image
              className="hero-silhouette"
              src="/men.gif"
              alt=""
              width={692}
              height={1014}
              priority
              unoptimized
            />
          </div>
        </section>

        <Marquee items={activities.map((a) => a.title)} />

        <section id="what-we-do" className="content-section section-panel">
          <div className="section-heading">
            <Reveal>
              <p className="eyebrow">The practice</p>
              <h2>Ecosystem<br />in action.</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="section-intro">
                Turya is where young builders pick up real skills — by doing, not
                just watching. We create the conditions for ideas to become real
                things, together, in public, without needing permission first.
              </p>
            </Reveal>
          </div>

          <div className="activity-list">
            {activities.map((activity, index) => (
              <Reveal key={activity.number} delay={index * 0.06}>
                <Link className="activity-row" href={activity.href}>
                  <span className="row-number">{activity.number}</span>
                  <span className="row-title">{activity.title}</span>
                  <span className="row-text">{activity.text}</span>
                  <Arrow />
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="products" className="content-section products-section">
          <Reveal>
            <div className="section-label-line">
              <p className="eyebrow">Things worth opening</p>
              <span className="section-index">02 / 03</span>
            </div>
            <div className="products-heading">
              <h2>Useful things,<br />already in motion.</h2>
              <p className="section-intro">
                Small, focused products for the long road from curious to
                capable. Start where you are. Keep going.
              </p>
            </div>
          </Reveal>

          <div className="product-grid">
            <Reveal className="product-card product-card-featured" delay={0.08}>
              <CbsemasteryCard />
            </Reveal>

            <Reveal className="product-card" delay={0.14}>
              <div className="product-topline">
                <span className="product-status product-status-muted">Next</span>
                <span>Experiments / 02</span>
              </div>
              <div>
                <h3>Open shelf</h3>
                <p>
                  A growing collection of prompts, tools, and tiny starting
                  points for the next thing you want to build.
                </p>
              </div>
              <span className="text-link text-link-muted">Coming into focus</span>
            </Reveal>
          </div>
        </section>

        <section id="events" className="content-section section-panel">
          <Reveal>
            <div className="section-label-line">
              <p className="eyebrow">Upcoming events</p>
              <Link className="quiet-link" href="/events">View all events <Arrow /></Link>
            </div>
            <div className="products-heading">
              <h2>Show up<br />and ship.</h2>
              <p className="section-intro">
                Our next sprints — dates locked, rooms booked. Come build with
                other young builders, leave with something shipped.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            {upcomingEvents().length === 0 ? (
              <div className="empty-state">
                <p className="empty-state-title">No dates locked right now — check back soon.</p>
                <p className="empty-state-copy">
                  When sign-ups open, they appear here first.
                </p>
                <Link className="text-link" href="/events">All events <Arrow /></Link>
              </div>
            ) : (
              <div className="event-grid">
                {upcomingEvents().map((ev) => (
                  <EventCard key={ev.title} event={ev} />
                ))}
              </div>
            )}
          </Reveal>
        </section>

        <section id="packages" className="content-section products-section">
          <Reveal>
            <div className="section-label-line">
              <p className="eyebrow">Popular packages</p>
              <Link className="quiet-link" href="/partners">For brands <Arrow /></Link>
            </div>
            <div className="products-heading">
              <h2>Most loved,<br />first.</h2>
              <p className="section-intro">
                How brands work with us, ranked by what gets picked most —
                course, then hackathon, then ebook.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="product-grid package-grid">
              <PackageCards order={["course", "hackathon", "ebook"]} />
            </div>
          </Reveal>
        </section>

        <section id="contact" className="closing-section section-panel">
          <Reveal>
            <p className="eyebrow">Find your people</p>
            <h2>There is always<br />room for one more.</h2>
            <p className="closing-copy">
              Bring a half-built idea, a question, or just the urge to make
              something. The next build starts with you.
            </p>
            <a className="button-link" href="mailto:hello@turya.in">
              Say hello <Arrow />
            </a>
          </Reveal>
        </section>

        <section className="partners-teaser">
          <div>
            <p className="eyebrow">A separate doorway</p>
            <p className="partners-copy">For organisations that want to back the young builders building what is next.</p>
          </div>
          <Link className="quiet-link" href="/partners">Partner with us <Arrow /></Link>
        </section>
      </main>

      <footer className="site-footer">
        <span>© Turya 2026</span>
        <span>An ecosystem for young builders</span>
        <Link href="/partners">For brands</Link>
      </footer>
    </div>
  );
}
