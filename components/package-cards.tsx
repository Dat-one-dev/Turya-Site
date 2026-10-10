import { Arrow } from "@/components/arrow";

export type PackageId = "hackathon" | "course" | "ebook";

type Pkg = {
  id: PackageId;
  label: string;
  tag: string;
  title: string;
  price: string;
  strength?: string;
  blurb: string;
  features: string[];
  note: string;
  ctaHref: string;
  ctaLabel: string;
  featured?: boolean;
};

const packages: Record<PackageId, Pkg> = {
  hackathon: {
    id: "hackathon",
    label: "Package 01",
    tag: "IRL / Hackathon",
    title: "Hackathon",
    price: "Custom",
    strength: "Strongest format — your product taught live to a full room of builders.",
    blurb:
      "Get your brand into a real room with students. If a slot is available, we bring your product to an IRL hackathon with students.",
    features: [
      "Bite-sized tutorial made for your product",
      "Taught to students live at the hackathon, first",
      "Your brand on all banners and promotional material of the hackathon",
    ],
    note: "Custom pricing — depends on requirements.",
    ctaHref: "mailto:turya.sunya@gmail.com?subject=Package%2001%20—%20Hackathon",
    ctaLabel: "Claim Package 01",
    featured: true,
  },
  course: {
    id: "course",
    label: "Package 02",
    tag: "Video / Course",
    title: "Course",
    price: "Custom",
    blurb:
      "We make a full course for your product — length depends on the product. Nobody likes reading walls of text to learn, so we make it watchable instead.",
    features: [
      "Full-length edited video course for your product",
      "English voice-dubbed, ready to ship",
      "Yours to keep — use it as docs, upload it on your socials, even sell it commercially",
    ],
    note: "Custom pricing — depends on requirements.",
    ctaHref: "mailto:turya.sunya@gmail.com?subject=Package%2002%20—%20Course",
    ctaLabel: "Ask about Course",
  },
  ebook: {
    id: "ebook",
    label: "Package 03",
    tag: "Written / Ebook",
    title: "Ebook",
    price: "$100",
    blurb:
      "We make an ebook for your brand — a proper written course for your product, not a PDF dump.",
    features: [
      "Hosted on cbsemastery.in as a dedicated course",
      "Yours to keep — use it wherever you want",
      "Sell it commercially — full commercial rights included",
    ],
    note: "$100 covers up to 50 pages — +$20 per extra 10 pages.",
    ctaHref: "mailto:turya.sunya@gmail.com?subject=Package%2003%20—%20Ebook%20(%24100)",
    ctaLabel: "Ask about Ebook",
  },
};

// Renders package cards in the given order. Partners page uses the canonical
// 01/02/03 order; homepage passes course-first popularity order.
export function PackageCards({ order = ["hackathon", "course", "ebook"] }: { order?: PackageId[] }) {
  return (
    <>
      {order.map((id) => {
        const p = packages[id];
        return (
          <div key={p.id} className={`product-card${p.featured ? " product-card-featured" : ""}`}>
            <div className="product-topline">
              <span className="product-status">{p.label}</span>
              <span>{p.tag}</span>
            </div>
            <div>
              <h3>{p.title}</h3>
              <p className="package-price">{p.price}</p>
              {p.strength ? <p className="package-strength">{p.strength}</p> : null}
              <p>{p.blurb}</p>
              <ul className="package-features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="package-note">{p.note}</p>
            </div>
            <a className="text-link" href={p.ctaHref}>
              {p.ctaLabel} <Arrow />
            </a>
          </div>
        );
      })}
    </>
  );
}
