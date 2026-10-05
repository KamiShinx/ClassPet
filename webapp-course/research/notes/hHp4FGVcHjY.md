# How to get micro-interactions right using Figma (Flux Academy, 21.6 min)

**What it is / substance:** A hands-on Figma tutorial building 3 micro-interactions from scratch: a heart/like
button, a toggle switch, and an FAQ accordion — each built as multiple named "states," linked with Figma's
prototyping tools, and tuned by feel (timing, easing, bounce). Deep and honest about the iterative "does this feel
right?" process. **Assign with a guide** — the concepts (states, transitions, timing) are gold, but it's 100%
Figma-prototype-building, which a kid vibe-coding HTML/CSS in Apps Script cannot follow step-by-step; a guide needs
to translate each Figma move into its CSS equivalent.

**Watch-list:** [0:00–6:14] the heart/like button (shortest, cleanest demo of the state → transition → state
pattern); [14:08–16:15] the accordion's icon-rotation trick. The toggle section [6:14–10:32] is mostly repetitive
numeric fiddling ("let's try 600... no, 400...") — skippable/skimmable.

## The ideas (in order, with [h:mm:ss])
- [0:33–2:49] Every micro-interaction needs **at least 2 states** (here: 3 — empty/transition/filled) as separate
  named layers/components. Jargon: **state** = one visual snapshot of an element (e.g. a button before vs. after a
  click); a color fill is kept present at 0% opacity even in the "empty" state so it can fade in smoothly instead of
  popping in — the *invisible starting value* trick.
- [3:24–5:38] States are linked with **Smart Animate** (Figma auto-interpolates between two same-named layers),
  using an **easing** curve (ease-in-out) and a **duration** in milliseconds (~100–200ms) — plus an automatic delay
  step so the "grown" middle state settles back down without a second click. Jargon: **easing** = the speed curve of
  an animation (e.g. starts fast, slows down at the end) — CSS equivalent: `transition: all 200ms ease-in-out`.
- [6:14–9:28] Toggle switch: two states (on/off), animated with a **spring** (physics-based bounce, tuned by
  **stiffness** and **damping** sliders) instead of a fixed easing curve — gives a springier, more playful feel.
  Fixing the circle overshooting the track edge required shrinking the circle to leave room, not just fewer bounce
  frames — an actual design fix, not just a timing tweak.
- [11:15–16:15] FAQ accordion: two states (open/closed) using **Auto Layout** set to "hug contents" so the drawer
  grows/shrinks to fit whatever text is typed in — this only works if every container has Auto Layout on and is set
  to hug vertically / fill horizontally. The "+" icon is duplicated, rotated 90° and nudged, so Smart Animate reads
  it as a twist into a "−" instead of a jarring shape swap.
- [19:10–20:51] The second half of the accordion section is about spacing consistency across repeated instances
  (20px gaps, 40px top padding) — same instinct as AH_ugxmLeUM's spacing/consistency mistakes, applied to a
  real component.

## Vocabulary for prompting Gemini
- **State** → one visual version of an element (before/after a click) → "the heart icon needs two states: empty
  outline and filled pink."
- **Transition** → the animated change from one state to another → "make the heart grow slightly then settle back
  to normal size when clicked."
- **Easing** → the speed curve of an animation → "use an ease-in-out transition, not a linear one, so it feels
  natural."
- **Duration (ms)** → how long an animation takes → "keep the transition under 200 milliseconds so it feels snappy."
- **Auto Layout / "hug contents"** → a container that resizes to fit whatever's inside it (CSS: flex/grid with
  `height: auto`) → "make the FAQ answer box grow to fit the text instead of having a fixed height."
- **Accordion** → a collapsible section that expands/collapses on click → "turn each FAQ question into an accordion
  that opens when clicked."

## Before/after examples from the frames
- [0:16] Real product thumbnail (ceramic teacups) with a plain heart-outline icon — the "before."
- [0:40–1:52] Figma canvas: heart outline drawn once, then duplicated into 2 more copies side by side — visually
  shows "you need multiple copies to make multiple states," a concrete illustration of the state concept.
- [1:36–2:00] The Figma "Create component set" menu and the resulting 3 labeled variants (empty/transition/filled)
  framed in a dashed purple box — this is what a Figma **component** looks like as an object, useful even just as a
  picture of "this is what 'component' means."
- [4:16–4:48] Heart states filled progressively pink (white → pink outline → solid pink) inside the purple
  variant frame — the actual before/after of the finished interaction.
- [8:32–10:16] Toggle purple/gray pill states with the prototype-link arrows visible connecting "on" state to "off"
  state — shows what a *prototype link* (the arrow that says "on click, go to this other state") looks like as a
  diagram, not just words.
- [12:48–14:00] The accordion open state showing the full FAQ answer text wrapped in a purple dashed selection box —
  demonstrates "hug contents" growing around real text.
- [14:40–14:48] The "+" icon mid-rotation into "−" — a clean single-frame illustration of the icon-twist trick.

## Page material
- **Rules of thumb:** (1) every interactive element needs at least 2 states, and CSS's job is to animate *between*
  them, not snap; (2) keep durations short (100–300ms) — longer feels laggy; (3) a spring/bounce feel needs its own
  CSS approach (`cubic-bezier` or a JS animation library) — plain `ease` won't bounce; (4) let a container's height
  be `auto` (hug its content) instead of hard-coding a pixel height, especially for anything with variable text; (5)
  reuse the same icon shape and just rotate/recolor it for an "opposite" state instead of swapping to a totally
  different icon.
- **Exercises:** (1) Add a CSS `transition` to one button in your app so a hover or click changes its color/size
  smoothly instead of snapping. (2) Build a collapsible FAQ or details section and ask Gemini specifically for
  "smooth open and close, height animates instead of jumping."
- **Quiz:** Q: What are the (at least) two states every micro-interaction needs? A: a starting state and an ending
  state (often a middle "transition" state too). Q: What CSS property makes a UI change animate instead of jumping
  instantly? A: `transition`.
- **Game angle:** Not a game video, but the state/transition/timing vocabulary applies directly to game feel:
  a card flip when revealing an item, a number counting up instead of jumping, or a button press "squash" are all
  CSS-transition-sized wins for a turn-based Apps Script game. Figma's spring physics (stiffness/damping) has no
  direct CSS equivalent without a JS animation library — treat as advanced/optional, plain `ease` transitions cover
  most needs for a first project.

## Caveats
100% Figma-tool-specific process (component sets, variants, Smart Animate, prototype mode, spring sliders) — kids
have no Figma access and won't reproduce these steps; a guide must translate "state + Smart Animate + easing" into
"CSS class + `transition` property." The video is long (21.6 min) with a lot of live numeric trial-and-error that
adds little on rewatch (the toggle bounce-tuning especially). Nothing is outdated — Figma's current UI matches what's
shown.
