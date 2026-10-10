---
name: Artcraft Motion Language
description: Reproduce getartcraft.com motion principles — scroll reveals, hero intro sequencing, marquee, video gating, hover, and reduced-motion — using the project's existing animation stack.
---

# Artcraft Motion Language

Use this skill when adding, changing, or reviewing marketing-site motion that
should feel like https://getartcraft.com/.

Do not copy ArtCraft's visuals. Reproduce its motion principles: one calm
reveal language, deliberate sequencing, ambient loops kept subordinate to
content, and reduced-motion that disables motion rather than slowing it.

## When to use

- New landing / section work that needs scroll reveals or a hero entrance.
- Adding marquee strips, auto-playing demo clips, sticky section headers, or
  hairline draw-on-scroll details.
- Reviewing a page that feels busy, flickery, overlapping, or inaccessible.

## When not to use

- App UI micro-interactions, game feel, or Remotion video work.
- Adding motion for its own sake. If the hierarchy does not need it, add
  nothing.

## Workflow

1. Read `references/motion-specification.md` first. It is the source of
   truth. Every pattern there is marked **Verified** (observed in HTML, CSS,
   or JS) or **Inferred / unverified** (plausible but not proven).
2. Reproduce principles, not effects. Design each animation as a complete
   sequence before writing code:
   - element, trigger, initial state, final state
   - animated properties (prefer `transform` + `opacity`)
   - duration, easing, delay relative to siblings
   - once vs. repeat, scroll-back behavior, mobile behavior
3. Coordinate through shared tokens. Prefer one reveal primitive, one timing
   set, and one stagger rule over scattered hardcoded effects.
4. Use the framework already in the project. In this repo that is
   **Framer Motion + CSS + IntersectionObserver**. Do not introduce GSAP,
   Lenis, or a new scroll library unless there is a written reason the
   existing stack cannot do the job.
5. Prevent the standard failures: layout shift, flash of unstyled content,
   overlapping siblings, clipping errors, competing transforms, and
   scroll jank. See "Coordination rules" below.
6. Preserve scrolling, navigation, responsiveness, and interaction
   performance. Gate expensive effects behind capability checks.
7. Support `prefers-reduced-motion` from the start, not as a patch.
8. Validate in a real browser whenever tooling permits. If browser tooling is
   unavailable, say what was not visually verified.

## Coordination rules

- One reveal language per page. ArtCraft uses a single hidden state
  (`opacity 0`, `y +28px`, `blur 8px`) and a single shown state for almost
  everything. Do the same: define one `Reveal` variant and reuse it.
- Sequence, don't stack. Hero copy staggers (~80ms between siblings);
  card grids stagger left-to-right (max ~180ms across the row). Never fire a
  headline, subline, CTA row, and background flourish on the same frame
  unless the spec calls for a choreographed beat.
- Separate choreography from content. Section rules draw (`scaleX`) and
  corner ticks pop (`scale` + `opacity`) on their own short timeline while
  headings reveal independently. Keep decorative timelines independent of
  text timelines so one can fail without breaking the other.
- Keep triggers one-shot. ArtCraft reveals run `once: true` and do not
  reverse on scroll-back. Do not re-hide content when it leaves the
  viewport unless the design explicitly requires it.
- Isolate transforms. An element that slides (`y`) must not also be the
  element that scales, clips, or hosts a backdrop blur on the same frame.
  Nest wrappers: outer for position, inner for clip/blur/frame.
- Reserve space. Media slots keep `aspect-video` + a sunken background so
  lazy video never shifts layout when it loads or plays.
- Gate ambient work. Continuous motion (marquee, galaxy drift, twinkle) is
  low-contrast, transform-only, pausable, and disabled under reduced-motion
  or on weak devices. Content motion always wins.

## Implementation mapping for this repo

This repo is Next.js 14 + React 18 + Framer Motion 11 + Tailwind 3
(`package.json`, `components/reveal.tsx`, `app/globals.css`).

- Scroll reveals: extend `components/reveal.tsx` (`whileInView`, `once:
  true`). Add blur only if cheap on the target page; ArtCraft's blur is
  `8px → 0px` over `0.9s` and is cleared after finish (`clearProps`).
  The existing local default (`y 28`, `0.65s`, `ease [0.22,1,0.36,1]`)
  is an acceptable stand-in — do not chase exact parity.
- Marquee: CSS keyframes only, duplicated track for a seamless loop, pause
  on hover, hard-disable under reduced-motion. See spec pattern M1.
- Demo video: `preload="none"`, muted + loop + playsInline, play/pause via
  `IntersectionObserver` with a `160px` root margin. Under reduced-motion,
  do not autoplay; show a poster frame. See spec pattern V1.
- Sticky HUD headers: `position: sticky`, translucent background +
  `backdrop-blur`, high `z-index`, never animated on scroll. See spec
  pattern C1.
- Hairline draws: `scaleX` / `scale` transforms with `transform-origin`
  set explicitly, run once at `top 88%`. See spec pattern C2.
- Hero entrances: CSS load-in (`rise`) or a small Framer stagger, not a
  full WebGL scene. Do not port ArtCraft's galaxy/instrument/WebGL hero
  unless the project explicitly commissions it. See spec section 2 and
  "What not to port".
- Reduced-motion: a global CSS block that collapses durations and kills
  marquee/scroll-progress loops, plus JS gates (`matchMedia`) that skip
  observers, tickers, and ambient scenes. Copy the shape of
  `app/globals.css` `@media (prefers-reduced-motion: reduce)`, do not rely
  on it alone for JS-driven motion.

## What not to port

- The WebGL galaxy field, instrument assembly, per-letter wordmark
  choreography, and tuner system are ArtCraft-specific showpieces. Treat
  them as reference for pacing (fast-forward, never jump-cut; wave reveals;
  scroll-linked drift) rather than components to rebuild.
- The pointer compare-wipe (`clip-path inset` + divider line) is verified
  in JS but its homepage placement could not be confirmed from static
  source. Do not rebuild it from guesswork.

## Validation checklist

- [ ] Spec read; each animation has a written start state, end state, and
  trigger.
- [ ] Shared timing tokens used; no one-off durations/easings without a
  comment explaining why.
- [ ] No layout shift: media slots sized, fonts/display swaps contained,
  sticky offsets correct.
- [ ] No overlap or clipping: staggered siblings measured at 360px and
  1280px widths.
- [ ] Reduced-motion checked: animations collapse, video does not autoplay,
  ambient loops stop, content remains fully readable.
- [ ] Keyboard and screen-reader check: decorative layers `aria-hidden`,
  media has labels, focus order unchanged by motion.
- [ ] Browser-rendered check performed, or limitation stated explicitly.
