import { Arrow } from "@/components/arrow";

export function CbsemasteryCard() {
  return (
    <>
      <div className="product-topline">
        <span className="product-status">Live</span>
        <span>Education / 01</span>
      </div>
      <div>
        <h3>
          cbse<span>mastery</span>
          <i>.in</i>
        </h3>
        <p>
          Programming and computer-science courses for students who want to understand what they are doing, not
          just pass the next exam.
        </p>
      </div>
      <a className="text-link" href="https://cbsemastery.in" target="_blank" rel="noreferrer">
        Visit cbsemastery.in <Arrow />
      </a>
    </>
  );
}
