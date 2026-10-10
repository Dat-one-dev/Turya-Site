// Shared motion tokens implementing the `artcraft-motion-language` skill on
// this project's existing stack (framer-motion + CSS). No new dependencies.
//
// Source of truth:
// `.opencode/skills/artcraft-motion-language/references/motion-specification.md`
// (reverse-engineered from https://getartcraft.com/).
//
// Conventions:
// - Durations/triggers marked [V] are literals from the reference.
// - Cubic-bezier arrays marked [I] are inferred framer-motion mappings of
//   GSAP eases (power2.out = cubic-out, power3.out = quart-out). They are
//   close approximations, not exact ports — do not "correct" them to exact
//   bezier fits without re-validating feel in the browser.
// - Host adaptations (documented at each use site): hairlines stay .5px,
//   corner ticks omitted (no HUD-tick language on this site), vertical lists
//   keep a small temporal stagger instead of ArtCraft's horizontal relX delay.

/** GSAP `power3.out` (quart-out) approximation — ArtCraft reveal/tick ease [I]. */
export const EASE_REVEAL: [number, number, number, number] = [0.25, 1, 0.5, 1];

/** GSAP `power2.out` (cubic-out) — ArtCraft rule/nav ease [I]. */
export const EASE_RULE: [number, number, number, number] = [
  0.215, 0.61, 0.355, 1,
];

/** Reveal: rise distance [V] (`y: 28`). */
export const REVEAL_Y = 28;

/** Reveal: starting blur [V] (`blur(8px)` → `blur(0px)`). */
export const REVEAL_BLUR = "blur(8px)";

/** Reveal duration [V] (`duration: .9`). */
export const REVEAL_DURATION = 0.9;

/** Load-gated cascade stagger [V] (`stagger: .08`, hero copy group). */
export const REVEAL_STAGGER = 0.08;

/** Scroll-group cascade ceiling [V] (`delay = relX * .18`, §1). */
export const GRID_CASCADE_MAX = 0.18;

/** Section rule draw duration [V] (`scaleX` 0→1, `.7s power2.out`). */
export const RULE_DURATION = 0.7;

/**
 * Choreography offsets [V] (§2c timeline): rule @0s, eyebrow @+.15s,
 * ticks @+.35s (stagger .06). Ticks are omitted on this site; the eyebrow
 * offset is applied by delaying the header block that follows the rule.
 */
export const EYEBROW_DELAY = 0.15;

/** Intro fast-forward multiplier [V] (`ffScale: 4` — accelerate, never cut). */
export const FF_SCALE = 4;

/**
 * Horizontal cascade helper mirroring ArtCraft's scroll-group delay
 * (`(el.left - group.left) / group.width * .18`, spec §1).
 * Currently used for documentation/future multi-column grids; the homepage
 * activity list is single-column so it keeps a small temporal stagger.
 */
export function cascadeDelay(left: number, groupWidth: number): number {
  if (!(groupWidth > 0)) return 0;
  const rel = Math.min(1, Math.max(0, left / groupWidth));
  return rel * GRID_CASCADE_MAX;
}
