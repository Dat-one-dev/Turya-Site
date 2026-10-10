# ArtCraft Motion Specification (getartcraft.com)

Reference: https://getartcraft.com/ — inspected 2026-10-10 via static HTML,
stylesheet, and shipped JS bundles (no live desktop-browser session was
available; see §10 Limitations).

Stack observed: Next.js + GSAP + ScrollTrigger + a WebGL hero field. All
scroll choreography is gated behind `prefers-reduced-motion: no-preference`
via `gsap.matchMedia`.

> Rule for readers: entries tagged **Verified** were seen directly in source.
> Entries tagged **Inferred** are plausible readings of code or markup whose
> on-screen behavior could not be visually confirmed. Do not present inferred
> values as measured timings.

---

## 1. Global motion character

ArtCraft's site uses one calm reveal language everywhere, plus exactly two
ambient loops (hero galaxy drift, model-ticker marquee), plus scroll-gated
demo video. There is no page-transition animation, no scroll-jacking, and no
classic parallax (backgrounds do not translate at a different rate from
content — **verified absent**: no `background-position` / parallax transform
in HTML, CSS, or the choreography bundle).

Hierarchy of motion:

1. Hero intro sequence (once per visitor, fast-forwardable) — §2.
2. Scroll reveals for headings, copy, cards — §3.
3. Section chrome choreography (hairline rule draw, corner ticks) — §4.
4. Ambient loops kept subordinate (marquee, galaxy idle) — §5–§6.
5. Hover feedback only (invert flashes, opacity fades) — §7.

Easing palette is GSAP `power2.out` / `power3.out` only. No springs, no
bounces, no elastic easings were found in the choreography code.

---

## 2. Hero intro sequence (the timed overture)

**Verified** from `91672` tunables + `29wilaqtb26u5.js` driver +
`223tafwc4nxdm.js` wordmark + inline `<script>` in `<head>` + CSS
`html[data-intro] .wm-letter{opacity:0}`.

### 2a. Intro clock and gating

- `html` carries `data-intro` only when reduced-motion is NOT preferred
  (inline head script checks
  `matchMedia("(prefers-reduced-motion: reduce)").matches` before setting
  the attribute). While `data-intro` is present, every `.wm-letter` is
  forced to `opacity: 0` by CSS — this is the FOUC guard.
- A shared `introClock = { t: 0, scale: 1, done: false }` advances on
  `gsap.ticker`: `t += min(dt,100)/1000 * scale`.
- Default beats (tunable defaults, `defineTunables("intro",…)`):
  `wordAt 0.35s`, `wordDur 0.85s`, `instrAt 0.7s`, `copyAt 1.05s`,
  `cardsAt 1.0s`. Logo fade-in starts at `0s` (opacity `t/0.3`).
- Completion: when `t > cardsAt + 3` (≈4s), `done = true`,
  `data-intro` is removed, `localStorage["artcraft-intro-seen"] = "1"`,
  and wheel/pointer/key listeners are detached.
- Repeat visitors read the flag and run the whole timeline at
  `returnScale` (default `1`, described as "much shorter" — exact value is
  a tunable, not measured on screen).
- Interruption never jump-cuts: any `wheel`, `pointerdown`, `keydown`, or
  `touchstart` during the intro calls `introFastForward()`, which raises
  the clock to `ffScale` (default `4×`). Timelines adopt the new scale via
  `timeScale()`. **Verified** in `29wilaqtb26u5.js`.
- Reduced-motion: driver sets `introClock.t = 999, done = true` immediately
  and returns — no ticker, no timeline. **Verified.**

### 2b. Wordmark formation — **Verified** (`223tafwc4nxdm.js`)

- Element: `div[role="img"][aria-label="ARTCRAFT"]` sized with
  `container-type: inline-size`, `font-size: 17.8cqw`, Archivo weight 750,
  `font-stretch: 125%`. Eight `.wm-letter` spans: slot 0 is the ArtCraft
  blade logo (inline SVG), slots 1–7 are the letters `R T C R A F T`.
  Each has `will-change: transform, opacity` and layered `text-shadow`
  glows plus SVG `drop-shadow` filters.
- Initial state: all letters `opacity: 0` (CSS guard + JS re-assert on
  replay until `t > wordAt + wordDur + 0.5`).
- Motion: from `wordAt (0.35s)` over `wordDur (0.85s)`, letters slide out
  from behind the logo with a cubic ease-in-out
  (`o<.5 ? 4o³ : 1−(−2o+2)³/2`, i.e. the `easeInOutCubic` curve shape —
  **verified** from the expression) via `translate3d(y px, 0, 0)`, and
  trailing letters are progressively unclipped with
  `clip-path: inset(-20% 0 -20% <px>)`. The logo glides from center to its
  slot over the same window and fades in over the first 0.3s.
- Cleanup: once formed (`progress ≥ 1` and `t > 0.35`), all inline
  `transform` / `opacity` / `clip-path` are removed. The wordmark ends as
  plain static text — no residual transforms to fight later layout.
- Viewport: `cqw` sizing keeps the lockup proportional at any width;
  letter metrics are re-measured on `resize` (`ResizeObserver` +
  `document.fonts.ready`).

### 2c. Nav stagger-in — **Verified** (`29wilaqtb26u5.js`)

- Elements: `#site-nav > div > *` (logo cell, links, theme button, Launch
  App button, mobile toggles).
- Initial: `autoAlpha: 0, y: -6`. Timeline waits `instrAt (0.7s)`, then
  animates to visible with `duration: 0.5, stagger: 0.08,
  ease: "power2.out"`, `clearProps: "all"`, adopting the intro clock scale.
- Scroll-back: one-shot; cleanup clears props. No re-hide.

### 2d. Galaxy card field — **Verified in code, visual timing inferred**

The hero background (`div[aria-hidden].absolute.inset-0` inside `#hero`) is
a WebGL spiral conveyor of demo cards plus a line underlay. Tunable
defaults (`defineTunables("galaxyLayout" | "galaxyMobile" | "galaxyMotion" |
"galaxyPointer" | "galaxyLook")` in `223tafwc4nxdm.js`):

- Layout: 6 arms, 1.05 turns/arm, outer radius 0.7 × half-diagonal, birth
  radius 0.08, 64 cards at 1.65 Mpx reference (scaled down on smaller
  viewports), card-height ceiling 0.25 × viewport height, arm desync 0.76,
  16 ticks/arm, construction circle 0.56, 1× guides, 300px dedup
  reassignment. Mobile profile (< 0.6 Mpx): 3 arms, 0.7 turns, 14 cards,
  0.8 outer radius, 0.3 height cap.
- Motion: idle 0.57 journeys/min, scroll scrub 0.2 journeys/1000px
  (reversible), global spin −50°/min (cards stay upright), wobble 6px @
  0.25Hz. Intro: 4s reveal wave from `cardsAt`, 0.12 roll-in chunk, 3×
  speed burst easing over 2.5s, 220px wave band, 0.2 dispersion flare with
  0.4s lag. Pointer: 320px field, 8px tug, 200px surface warp, flare
  `+0.032` decaying at 3/s, hold 0.15s / rest 1s, click ripples 900px/s.
  Look: density 0.82, 10px corners (**the one deliberate exception to the
  site's zero-radius rule**), birth blur 0.12 resolving by 18% of journey,
  16:9 by 30%, decoders only past 14%, aberration 0.019, curve 32px, frame
  0.22, arm lines 0.15 @ 2px, ticks 0.3. FPS governor sheds cards below
  30fps sustained.
- Gating (**verified**): only runs when WebGL is available AND
  `(pointer: fine) and (min-width: 768px)` AND reduced-motion is not
  preferred. Otherwise the hero is the static wordmark + copy.
- Behavior on scroll-back: the conveyor is scroll-scrubbed (reversible),
  but the intro wave itself does not replay — replay only happens through
  the registered `Intro ↻` tuner action.

### 2e. Instrument assembly — **Inferred, do not rebuild from this text**

The tuner copy says at `instrAt` "the instrument assembles: the ruler's
tick cascade begins and the navbar contents stagger in", and the frame loop
fades line/tick underlay opacity over 1.2s from `instrAt`
(`clamp((t − instrAt)/1.2)`). No ruler/instrument element was present in the
homepage static HTML snapshot, so its DOM, geometry, and exact choreography
are **unverified**. Treat only the timing slot (0.7s) and the principle
(ruler ticks cascade while nav staggers) as reference.

---

## 3. Scroll reveals (the core reusable pattern)

**Verified** from `00w_rn99g79n5.js` (`a`/`o` objects, three registration
loops) + `data-reveal` / `data-reveal-group` attributes across all homepage
sections (55 `data-reveal` hits in the snapshot).

### R1 — Solo reveal

- Selector: `[data-reveal]:not([data-reveal-group] [data-reveal])` —
  e.g. section `h2`s ("The control that mere *words* cannot buy.",
  "Stop *renting* from websites.", "Made *with* ArtCraft.",
  "Start *crafting*.") and their lede paragraphs.
- Trigger: `ScrollTrigger.create({ trigger: el, start: "top 85%", once: true })`.
- Hidden → shown:
  `{ autoAlpha: 0, y: 28, filter: "blur(8px)" }` →
  `{ autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out", overwrite: true, clearProps: "all" }`.
- Runs once; scrolling back does not reverse or replay. `clearProps`
  removes inline styles so later layout/hover is unaffected.
- **Do not invent** an `amount`/`rootMargin` equivalent: the source gives a
  ScrollTrigger position (`top 85%`), not an IntersectionObserver fraction.

### R2 — Group reveal (grids and hero copy stack)

- Selector: `[data-reveal-group]` containers; children `[data-reveal]`.
  Used for: hero copy stack (badge, wordmark wrapper, `h1`, subline, CTA
  row, proof row), feature grid (7 articles + app CTA), ownership trio,
  community trio, final CTA.
- Non-hero groups: each child gets its own trigger at `top 88%`, `once:
  true`, with a positional delay —
  `delay = (childLeft − groupLeft) / groupWidth × 0.18`. Net effect: a
  left-to-right cascade capped at 180ms across the row. Same `0.9s
  power3.out` tween as R1.
- Hero group (`closest("#hero")`): children are pre-hidden, then released
  together with `stagger: 0.08` once `introClock.t >= copyAt (1.05s)`,
  polled on the GSAP ticker. Replay-safe via `onIntroReplay`.
- Scroll-back: once-only, no reverse. **Verified** (`once: true` on every
  trigger).

### R3 — What is NOT revealed

Sticky section eyebrow bars (`01 / Crafting features`, `02 / Ownership`,
`03 / Proof`) are `data-draw-eyebrow` choreography (next section), not
`data-reveal` content. The nav and footer have no scroll reveal. The
marquee has no reveal. Keep chrome and content on separate timelines.

---

## 4. Section chrome choreography

**Verified** from the `[data-choreo]` loop + section markup
(`#features`, `#ownership`, `#made-with`, `#start`).

### C1 — Sticky HUD headers (static, not animated on scroll)

- Markup per section: `div.sticky.top-12.z-30.border-y.border-line.
  bg-bg/60.backdrop-blur-md` with `px-6 py-3 md:px-10`, containing a HUD
  label (`01 / Crafting features — Real footage captured in ArtCraft`,
  etc.). `top-12` parks it directly under the 3rem sticky site nav.
- No scroll-linked transform was found on these bars. Their motion role is
  entrance only (eyebrow fade/rise, §C2). Do not add parallax to them.

### C2 — Rule draw + tick pop + eyebrow rise (one timeline, three voices)

- Trigger: per `section[data-choreo]`, `start: "top 88%"`, `once: true`,
  inside the reduced-motion-off matchMedia branch.
- Setup: `[data-draw-rule]` → `scaleX: 0` (`origin-left`, a 1px top border
  spanning the section); `[data-draw-tick]` (two `+` corner ticks per
  section) → `scale: 0, opacity: 0`; `[data-draw-eyebrow]` → the R hidden
  state (`autoAlpha 0, y 28, blur 8px`).
- Timeline: rule draws `scaleX → 1` over `0.7s power2.out` at `0`;
  eyebrow reveals with the standard `0.9s power3.out` at `0.15s`; ticks
  pop to `scale 1, opacity 1` over `0.35s power3.out, stagger 0.06` at
  `0.35s`. All clear props afterward.
- Purpose: the hairline grid literally draws itself as each section
  arrives. Copy this principle (chrome draws, content rises, ticks punctuate)
  rather than the exact tick graphics.

---

## 5. Marquee ticker — **Verified** (CSS only)

- Markup: `div.marquee.border-t.border-line > ul.marquee-track × 2`
  (second `aria-hidden`), each track holding the 9 model/capability items
  (`Seedance 2.5, Nano Banana 2, Image to Location, 3D Compositing,
  Character Posing, Image to 3D Mesh, Background Removal, 2D Compositing,
  Mixed Assets`) as `hud-label … px-6 py-3` items with `▪` accent separators.
- CSS (`08lws5bl8f5l4.css`):
  `.marquee{ display:flex; overflow:hidden }`,
  `.marquee-track{ flex-shrink:0; min-width:100%; animation: 36s linear infinite marquee-scroll; display:flex }`,
  `@keyframes marquee-scroll{ to{ transform: translate(-100%) } }`.
  Two full-width tracks translating −100% yields the seamless loop.
- Duration/easing: **36s linear infinite** — the only verified loop timing
  on the site. Transform-only (compositor-friendly).
- Reduced-motion: global `@media (prefers-reduced-motion: reduce)` forces
  `animation-duration: .01ms; iteration-count: 1` (plus a
  `motion-reduce:animate-none` utility). The marquee effectively freezes.
- Hover pause was NOT found in ArtCraft's CSS (contrast with this repo's
  local marquee, which pauses on hover — keep the local behavior; it is a
  strict improvement).

## 6. Demo video gating — **Verified**

- Elements: seven feature clips (`WorldLabs_Demo_2, Panel, Editor, Make_3D,
  Mixed, Character-Pose, Background.webm`) in
  `div.relative.aspect-video.overflow-hidden.bg-bg-sunken` slots with
  `video.absolute.inset-0.h-full.w-full.object-cover`, all `muted loop
  playsInline preload="none"` with `aria-label`s.
- Logic (`3144` module): if reduced-motion is preferred, set
  `preload = "metadata"` and return (poster frame only, never autoplay).
  Otherwise an `IntersectionObserver` with `rootMargin: "160px 0px"`
  calls `play()` on intersect and `pause()` off intersect
  (errors swallowed). Teardown on unmount.
- Principle: video is scroll-gated content, not background ambience —
  it pre-loads nothing, plays only near the viewport, and cedes to
  reduced-motion. Reuse exactly.
- Community films: thumbnail (`i.ytimg.com … /hqdefault.jpg`, `loading:
  lazy`) + `bg-black/20 → group-hover:bg-black/10` scrim + `Play` badge;
  click swaps in a `youtube-nocookie` iframe with `autoplay=1`. **Verified.**

## 7. Hover and pointer feedback — **Verified** (CSS + JS)

- `invert-block`: `transition: background-color .12s linear, color .12s
  linear`; hover (or `data-active`) swaps to `--invert-bg`/`--invert-fg`.
  Used on secondary CTAs and icon buttons. Fast, linear, no lift/shadow.
- Primary CTA: `transition-opacity hover:opacity-80 duration-150`.
  Nav links: inner `span` gets `group-hover:bg-invert-bg
  group-hover:text-invert-fg`. Chevron icons rotate 180° on open
  (`group-data-[state=open]:rotate-180`).
- Feature-card video overlay and Play badge use color/opacity transitions
  only — no scale, no translate on hover anywhere on the page.
- Pointer-warp compare wipe: `00w_rn99g79n5.js` contains a
  pointer-driven wipe (`pointermove` → target `10 + 80·nx`, idle sine
  `50 + 16·sin(t/3.4s)`, critically-damped-style lerp
  `l += (target − l)·(1 − e^(−5·dt))`, applied as
  `clip-path: inset(0 ${100−l}% 0 0)` + divider at `left: l%` with accent
  glow, gated behind `pointer: fine + min-width: 768px +
  no-preference`). **Code-verified but placement-unverified**: the
  "3D blocking — your control" overlay string exists only in JS, not in the
  homepage snapshot. Do not rebuild its layout from guesswork.

## 8. Backgrounds, scrims, and layering — **Verified**

- Wordmark scrim: `absolute inset:-88px -128px` radial gradient
  (`color-mix(var(--bg) 78%, transparent) → transparent`) behind the hero
  copy, plus a `-inset-x-[6%] -inset-y-[34%]` layer with `backdrop-filter:
  blur(12px)` masked to `radial-gradient(closest-side, black 45%,
  transparent 100%)`. Effect: the galaxy shows through around the text but
  text stays legible — depth without parallax.
- Section containers: `max-w-[1280px] border-x border-line` grid with
  `gap-px bg-line` dividers — the hairline grid IS the background.
- Sticky bars use `bg-bg/60 + backdrop-blur-md`; site nav uses
  `bg-bg/95 + backdrop-blur-sm`. No scroll-linked background motion.
- Theme switching animates color variables over 0.4s
  (`--bg, --ink, --line … .4s`) with a `theme-anim` guard that zeroes
  durations during the swap. **Verified** in CSS.

## 9. Viewport, performance, accessibility adaptations

- Viewport: wordmark scales via `cqw`; galaxy swaps to the mobile profile
  below 0.6 Mpx (3 arms, 14 cards, larger caps); grids collapse
  (`md:grid-cols-2/3` → single column); sticky offsets unchanged. No
  separate mobile motion language — same reveals, fewer/smaller ambient
  cards.
- Performance: reveals animate `autoAlpha` (opacity + visibility),
  `y`, `filter: blur`, `scaleX/scale` — no layout properties. Tweens
  `clearProps` after finishing. Videos are `preload="none"` with at most a
  few live decoders (galaxy caps concurrent playback at ~8 visible +
  cull timer 0.25s, pausing off-screen clips). Galaxy sheds cards below
  30fps sustained. Marquee is a single transform loop.
- Accessibility (**verified**, reuse all of it):
  - Everything motion-gated behind `prefers-reduced-motion`: GSAP branch,
    intro driver, galaxy, video autoplay, marquee kill-switch, `.01ms`
    duration collapse, `scroll-behavior: auto`.
  - Decorative layers are `aria-hidden`; the wordmark has `role="img"` +
    `aria-label`; videos carry `aria-label`s; community buttons carry full
    `Play video: …` labels.
  - Focus is never moved by motion; triggers are `once: true` so content
    cannot disappear on scroll-back; content is fully present with JS
    animation disabled (SSR HTML holds final copy; hidden states are
    applied at runtime, except the `data-intro` CSS guard which is itself
    reduced-motion-aware).

## 10. Limitations and file paths

- Browser automation was unavailable (no desktop browser connected to the
  session), so no screenshots, scroll recordings, hover captures, or
  framerate measurements were taken. All timings above come from shipped
  source, not stopwatch measurement. Durations the source does not state
  (e.g. perceived tick-loop length, exact paint order during the galaxy
  wave) are documented as unknown rather than estimated.
- Evidence fetched 2026-10-10 into `/tmp/opencode/artcraft-assets/`:
  `artcraft-home.html` (100,781 bytes, the SSR snapshot),
  `app.css` (`08lws5bl8f5l4.css`, 63,721 bytes),
  `00w_rn99g79n5.js` (11,156 bytes — reveal/choreo/video/wipe),
  `0bcsxmid94pmr.js` (116,794 bytes — intro tunables + clock),
  `223tafwc4nxdm.js` (45,566 bytes — wordmark + galaxy),
  `29wilaqtb26u5.js` (103,028 bytes — nav intro driver).
  Chunk filenames are build-hashed and will change; re-fetch and
  re-`grep` for `data-reveal`, `data-choreo`, `introTuner`, `wm-letter`
  when verifying against a newer deploy.
- Explicitly unverified: instrument/ruler geometry (§2e), compare-wipe
  placement (§7), galaxy per-card visual pacing beyond tunable defaults,
  mobile Safari behavior, and anything behind login (`app.getartcraft.com`).
