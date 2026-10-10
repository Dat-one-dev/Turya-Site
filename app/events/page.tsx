import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { EventCard } from "@/components/event-card";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { events } from "@/lib/events";

export const metadata: Metadata = {
  title: "Turya — Events",
  description:
    "Hackathons and game jams for young builders — one unified calendar of sprints, shipped together.",
};

export default function EventsPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content">
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
                <a className="text-link" href="mailto:turya.sunya@gmail.com">
                  Get notified <Arrow />
                </a>
              </div>
            ) : (
              <div className="event-grid">
                {events.map((ev) => (
                  <EventCard key={ev.title} event={ev} />
                ))}
              </div>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="partner-contact">
              <p className="eyebrow">Want to host or co-build one?</p>
              <a href="mailto:turya.sunya@gmail.com" className="contact-email">
                turya.sunya@gmail.com <Arrow />
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
