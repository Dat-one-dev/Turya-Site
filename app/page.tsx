import Link from "next/link";
import Image from "next/image";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";

const activities = [
  {
    number: "01",
    title: "Hackathons",
    text: "Short, focused sprints for turning a half-formed idea into something you can show.",
    href: "#contact",
  },
  {
    number: "02",
    title: "Game jams",
    text: "A reason to make something weird, playable, and finished with other curious people.",
    href: "#contact",
  },
  {
    number: "03",
    title: "Learn by doing",
    text: "Practical education for the self-taught builder, from first syntax to shipping in public.",
    href: "#products",
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
              src="/silhouette.png"
              alt=""
              width={346}
              height={507}
              priority
            />
          </div>
        </section>

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
              <div className="product-topline">
                <span className="product-status">Live</span>
                <span>Education / 01</span>
              </div>
              <div>
                <h3>cbse<span>mastery</span><i>.in</i></h3>
                <p>
                  Programming and computer-science courses for students who
                  want to understand what they are doing, not just pass the
                  next exam.
                </p>
              </div>
              <a className="text-link" href="https://cbsemastery.in" target="_blank" rel="noreferrer">
                Visit cbsemastery.in <Arrow />
              </a>
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
