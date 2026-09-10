import Image from "next/image";
import { Arrow } from "@/components/arrow";
import { statusLabel, type Event } from "@/lib/events";

export function EventCard({ event: ev }: { event: Event }) {
  return (
    <div className={`event-card${ev.cover ? " event-card--with-cover" : ""}`}>
      <div className="product-topline">
        <span className="product-status">{ev.type === "hackathon" ? "Hackathon" : "Game jam"}</span>
        <span>{ev.date}</span>
        <span className={`event-status event-status--${ev.status}`}>{statusLabel(ev.status)}</span>
      </div>
      <div>
        {ev.cover ? (
          <div className="event-cover">
            <Image src={ev.cover} alt={`${ev.title} cover art`} width={1280} height={1280} />
          </div>
        ) : null}
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
  );
}
