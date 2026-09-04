import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Turya — Events",
  description:
    "Hackathons and game jams for young builders — one unified calendar of sprints, shipped together.",
};

type EventType = "hackathon" | "jam";
type EventStatus = "upcoming" | "past" | "open";

type Event = {
  title: string;
  type: EventType;
  date: string;
  description: string;
  status: EventStatus;
  ctaLink: string;
  ctaLabel?: string;
};

// Add a new event by adding one object to this array — no new markup needed.
// Leave empty for now: we have no real events scheduled yet, so the page renders
// a clean empty state instead of fabricated placeholders.
const events: Event[] = [];

function statusLabel(status: EventStatus) {
  if (status === "open") return "Open for signup";
  if (status === "past") return "Past";
  return "Upcoming";
}

export default function EventsPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="partner-hero">
          <Reveal>
            <p className="eyebrow">Events — hackathons & game jams</p>
            <h1>
              Build together,
              <br />
              ship together.
            </h1>
            <p className="partner-lede">
              Turya hosts hackathons and game jams as one unified calendar of build sprints. Short, focused
              weekends where half-formed ideas become playable, working things — with people who love to make.
            </p>
          </Reveal>
        </section>

        <section className="partner-details section-panel">
          <Reveal>
            <p className="eyebrow">Upcoming & past</p>
            {events.length === 0 ? (
              <div className="empty-state">
                <p className="empty-state-title">No events live right now — check back soon.</p>
                <p className="empty-state-copy">
                  We’re putting the next sprint together. No fake dates or placeholder lineups — when
                  sign-ups open, they’ll appear here first.
                </p>
                <a className="text-link" href="mailto:hello@turya.in">
                  Get notified <Arrow />
                </a>
              </div>
            ) : (
              <div className="event-grid">
                {events.map((ev) => (
                  <div key={ev.title} className="event-card">
                    <div className="product-topline">
                      <span className="product-status">
                        {ev.type === "hackathon" ? "Hackathon" : "Game jam"}
                      </span>
                      <span>{ev.date}</span>
                      <span className={`event-status event-status--${ev.status}`}>{statusLabel(ev.status)}</span>
                    </div>
                    <div>
                      <h3>{ev.title}</h3>
                      <p>{ev.description}</p>
                    </div>
                    {ev.ctaLink ? (
                      <a
                        className={ev.status === "open" ? "text-link" : "text-link text-link-muted"}
                        href={ev.ctaLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {ev.ctaLabel ?? (ev.status === "open" ? "Sign up" : "View recap")} <Arrow />
                      </a>
                    ) : (
                      <span className="text-link text-link-muted">Details soon</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="partner-contact">
              <p className="eyebrow">Want to host or co-build one?</p>
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
        <span>Events</span>
      </footer>
    </div>
  );
}
