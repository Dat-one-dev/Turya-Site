export type EventType = "hackathon" | "jam";
export type EventStatus = "upcoming" | "past" | "open";

export type Event = {
  title: string;
  type: EventType;
  date: string;
  description: string;
  status: EventStatus;
  ctaLink: string;
  ctaLabel?: string;
  cover?: string;
};

// Add a new event by adding one object to this array — no new markup needed.
// Shared by /events and the homepage "Upcoming events" section.
export const events: Event[] = [
  {
    title: "Falling Sun",
    type: "hackathon",
    date: "24–25 Oct · Delhi",
    description:
      "A two-day IRL sprint in Delhi. Show up with a rough idea, leave with something shipped — built alongside other young builders.",
    status: "upcoming",
    ctaLink: "https://fallingsun.in",
    ctaLabel: "Visit fallingsun.in",
    cover: "https://www.fallingsun.in/logo_transparent.webp",
  },
];

export function statusLabel(status: EventStatus) {
  if (status === "open") return "Open for signup";
  if (status === "past") return "Past";
  return "Upcoming";
}

export function upcomingEvents(): Event[] {
  return events.filter((e) => e.status === "upcoming" || e.status === "open");
}
