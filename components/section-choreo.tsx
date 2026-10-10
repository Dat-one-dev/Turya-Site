"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_RULE, RULE_DURATION } from "@/lib/motion";

/**
 * ArtCraft-style section rule (spec §2c, `data-draw-rule`).
 *
 * A hairline that draws left→right (`scaleX` 0→1, `.7s power2.out`,
 * `origin-left`) when the section top approaches — the viewport bottom
 * margin of -12% approximates ArtCraft's ScrollTrigger start of `top 88%`.
 * Transform-only, runs once, static under reduced motion.
 *
 * Deliberate omission: ArtCraft's corner plus-ticks (`data-draw-tick`) are
 * not reproduced — this site has no HUD-tick visual language and they would
 * read as noise. The rule + eyebrow delay (applied by delaying the header
 * block that follows, spec `EYEBROW_DELAY`) carry the choreography.
 * ArtCraft's hairline is 1px; this uses the site's `.5px` hairline rhythm.
 */
export function SectionRule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const cls = className ? `section-rule ${className}` : "section-rule";
  // Reduced motion: opacity cross-fade, no scale draw.
  if (reduce)
    return (
      <motion.span
        aria-hidden="true"
        className={cls}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.2 }}
      />
    );
  return (
    <motion.span
      aria-hidden="true"
      className={cls}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: RULE_DURATION, ease: EASE_RULE }}
    />
  );
}
