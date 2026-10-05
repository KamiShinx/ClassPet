# Learn UI Design [7 Fundamentals Tutorial] - Full Course for Beginners (Scrimba / Gary Simon, 67.5 min)

**What it is / substance:** A long, structured beginner course (Scrimba's interactive-embed format: real HTML/CSS in
a live mini-browser) covering seven UI fundamentals in order — White Space, Alignment, Contrast, Scale, Typography,
Color, Visual Hierarchy — each taught as: definition slide -> live before/after CSS fix -> a "pause and try it
yourself" challenge -> presenter's own solution -> full before/after replay.
**Is it good enough to assign to a 14-year-old as homework?** With a guide, and only in excerpts — not as one
67-minute sitting. This is the one video in the batch that uses **real CSS** (padding, margin, line-height,
font-weight, grid-template-columns, grid-gap) rather than a design tool, which makes it the most directly
transferable to Apps Script HTML/CSS of anything in this batch. But it's long, has ~6 near-identical
practice/challenge cycles, and a kid doesn't need all of them.

**Watch-list (recommend excerpting, not the full video):**
- [0:14:12]-[0:18:42] **Contrast + WCAG ratios** — short, concrete numbers, directly reusable in class as an
  accessibility rule.
- [0:46:48]-[0:54:32] **Visual Hierarchy** — the abstract "5 squares" demo plus a full real-world form redesign;
  the single best unifying lesson in the video, ties all earlier fundamentals together.
- [1:00:56]-[1:06:24] **Final Chapter Challenge (dashboard)** — a sidebar+content dashboard layout, the closest
  thing in this whole batch to a screen the kids will actually build for their hub/app.

## The ideas (in order, with [h:mm:ss])
- [0:01:42] **White space** (negative space): the empty area between elements; controlled in CSS mainly with
  `padding` (inside an element) and `margin` (between elements). Demo increases card padding from 0 to ~1.5em and
  adds margin-bottom under the title — "looks so much better" with only 2-3 property changes.
- [0:06:13] **Leading** = line-height (space between lines of text); default ~1, bumped to ~1.5 for readability.
- [0:06:46] **Alignment**: "every element... has a series of rows and columns" — think of every UI element as
  living on an invisible column; a logo, headline, tagline and button that don't share the same left column look
  wrong even if nothing else is off.
- [0:14:12] **Contrast**: "being in a strikingly different state from something else." Cites **WCAG 2.0**: minimum
  ("AA") text contrast ratio of **4.5:1** (3:1 for large text); enhanced ("AAA") is **7:1** (4.5:1 for large text).
  Mentions browser plugins and Figma/Sketch/XD plugins as contrast-checking tools. Demo: a sub-headline at 1.82:1
  and a button at 2.46:1 (both failing) are fixed to 7.6:1 and 5.32:1 (both passing) just by changing text/button
  colors.
- [0:18:42] **Scale**: the size of elements relative to their importance and to the available space. Demo: a
  CSS grid using `repeat(3, 150px)` (wasting space) becomes `auto` (fills the layout); headline font-size goes from
  1.2em to 2.2em, establishing which text matters most.
- [0:23:24] **Challenge 2**: combine white space + alignment + contrast + scale on an "ugly" two-card layout — full
  before/after in frames [0:26:14]-[0:30:16].
- [0:30:48] **Typography**: keep to 1-2 font families max (the video argues for just one, most of the time); good
  typography = font choice + visual hierarchy + size + alignment + letter-spacing + line-height + color/contrast
  working together. Demo: three testimonial cards using 3 different fonts get unified into one (Montserrat);
  headline size increased; body copy gets more line-height; an oversized, unimportant "site" element is shrunk
  and muted in color to push it down the hierarchy.
- [0:36:56] **Color**: color carries meaning before the user even reads anything (**color psychology**, explicitly
  framed as culturally variable — e.g. green ~ "wealth, nature, growth", black ~ "luxury, sophistication, elegance"
  for some audiences). Two rules: (1) don't use too many unrelated colors — pick one palette; (2) prefer
  variations (lighter/darker shades) of the same hue over clashing hues. Demo: a card grid with 5+ random accent
  colors is reworked using consistent same-family color swatches; a purple hero page with a clashing yellow CTA
  is fixed with a complementary vibrant-yellow button that now actually stands out.
- [0:42:25] **Colors Challenge**: redesign a contact form using ONLY 5 given color codes. Presenter shows 3 valid
  solutions (dark scheme, alt dark scheme, light scheme) — explicitly teaching that a constrained palette still
  allows multiple correct answers, as long as contrast holds up.
- [0:46:48] **Visual Hierarchy**: "every element... has a level of importance... visual hierarchy is how we
  establish this importance" — achieved by *combining* the other fundamentals (not a separate technique). Abstract
  demo: 5 identical white squares (no hierarchy) become hierarchical via, in turn, whitespace/alignment (moved
  apart), contrast (dimmed the others), color (one turned yellow), and scale (one enlarged) — then several stacked
  together. Real demo: a "Join the mailing list" form — headline enlarged, form container given a subtly
  lighter/matching background, label bolded, and the CTA button given a saturated color, white bold text, no
  border — turns a flat form into one with an obvious first-glance/second-glance/third-glance order.
- [0:54:32] **Visual Hierarchy Challenge**: a "Pay your debts" card where an SVG down-arrow icon was accidentally
  the most eye-catching element despite being the least important — shrunk from 5em to 2.7em; the actual headline
  enlarged and bolded; body text's line-height increased and color slightly muted; the "Find out how" link turned
  into a real button (background + padding) so it reads as clickable.
- [1:00:56] **Final Chapter Challenge**: a dashboard with a sidebar — `grid-gap` increased for whitespace between
  sidebar and content, content card given a background color close-in-hue to the page for contrast/definition
  (constraint: two brand colors must stay fixed), padding added inside the content card, the "Dashboard" h1
  enlarged and its stray `margin-left` reset to 0 so it aligns to the same column as the content below it — a
  worked example combining all four fundamentals covered so far (visual hierarchy, whitespace, color, alignment).
- [1:06:24] Course wrap-up + recap of the 7 fundamentals + pitch for a paid "UI Design Bootcamp" (skip).

## Vocabulary for prompting Gemini
- **White space / negative space** → empty space around and inside elements → "add more white space (padding)
  inside this card, it feels cramped."
- **Padding vs. margin** → padding = space *inside* an element's own box; margin = space *outside* it, between it
  and its neighbors → "add 16px of padding inside the card, and 24px of margin between cards."
- **Leading / line-height** → vertical space between lines of text → "increase the line-height on this paragraph
  so it's easier to read."
- **Alignment / shared column** → elements lining up on an invisible vertical or horizontal line → "align the logo,
  headline and button to the same left edge."
- **Contrast ratio** → a measured number describing how different two colors are (WCAG has minimum thresholds for
  text) → "make sure the button text has enough contrast against the button background — at least 4.5:1."
- **Scale** → the relative size of an element vs. others, used to signal importance → "make the price bigger than
  the product name so it's the first thing people notice."
- **Typography** → everything about how text looks: font choice, size, weight, spacing, line-height, color →
  "use only one font family across the whole app."
- **Color psychology / hue family** → colors carry emotional associations; sticking to shades of one hue looks
  more cohesive than mixing unrelated hues → "use different shades of the same blue for these related buttons
  instead of five random colors."
- **Visual hierarchy** → the order in which a user notices things, built by combining size, color, contrast and
  spacing → "make sure the most important button on this screen is also the most visually prominent one."

## Before/after examples from the frames
- [0:14:16]-[0:18:06] "Take a vacation" hero: pale, low-contrast sub-headline and button text become clearly
  readable (7.6:1 and 5.32:1) — good frame to embed for teaching the WCAG numbers concretely.
- [0:19:12]-[0:22:16] "Our Colors" 2x3 badge grid: colors that clash (bright pink next to orange, mismatched
  saturation) become a coordinated palette — clean visual for the "pick one hue family" rule.
- [0:32:00]-[0:34:56] Testimonial cards: 3 mismatched fonts unify into 1 (Montserrat), oversized "site" text
  shrinks and dims — a clear, simple before/after for typography.
- [0:47:12]-[0:48:40] The 5 white squares: the single clearest, simplest visual-hierarchy diagram in the whole
  batch — worth embedding directly since it needs no context to understand (whitespace/alignment -> contrast ->
  color -> scale, each isolating one technique).
- [1:01:04]-[1:06:16] The dashboard: cramped sidebar/content with no breathing room becomes a proper two-panel
  layout with real spacing, a distinguishable content card, and an aligned, appropriately-sized page title — the
  best "this looks like a real app" example for the hub/dashboard project.

## Page material
- **Rules of thumb:**
  1. Padding is space *inside* a box, margin is space *outside* it — if a kid confuses these in a Gemini prompt,
     the AI may fix the wrong element.
  2. Check text contrast against its background numerically when possible — aim for at least 4.5:1 for normal
     text (WCAG AA); don't eyeball it if it "feels" hard to read.
  3. Pick ONE font family for the whole app (two at most) — mixing fonts reads as unpolished even if each font is
     fine on its own.
  4. Stick to one color family (a "hue") and vary its lightness/darkness, rather than picking multiple unrelated
     bright colors.
  5. Visual hierarchy isn't a separate trick — it's whitespace, contrast, color and scale all pointed at the same
     goal: which element should the eye land on first?
  6. Before adding an icon or decoration, ask: does it deserve the attention it's about to get? (the "Pay your
     debts" arrow icon example — it was stealing focus from the actual headline).
- **Exercises:**
  1. Screenshot your app. Pick the ONE element that should be noticed first. Using only whitespace, color, or
     size (pick one), describe to Gemini how to make it stand out more.
  2. Check two pieces of text in your app against their background (roughly, by eye, or with an online contrast
     checker) — is either one hard to read? Ask Gemini to fix the color to meet a ~4.5:1 contrast ratio.
  3. Count how many different fonts and how many different unrelated colors are in your app right now. If it's
     more than 1-2 fonts or more than one color family, ask Gemini to consolidate.
- **Quiz:**
  1. Q: What's the difference between padding and margin? A: Padding is space inside an element (between its edge
     and its content); margin is space outside it (between it and other elements).
  2. Q: A button has grey text on a light-grey background and is hard to read. What UI fundamental is broken, and
     roughly what number should the fix target? A: Contrast — aim for at least a 4.5:1 contrast ratio between text
     and background (WCAG AA minimum).
- **For game videos:** N/A — general UI/CSS fundamentals, not game-specific. All seven ideas apply directly to an
  Apps Script app's screens. The **dashboard final challenge is the most relevant single segment for the hub
  project** (sidebar navigation + main content area is a very common layout for a teaching-platform hub). For a
  turn-based/idle game built on this stack, contrast and visual hierarchy matter most for making the "important"
  button (attack, collect, upgrade) the obvious thing to tap.

## Caveats
- This is the most code-transferable video in the U1 batch — it's real CSS the kids could plausibly ask Gemini to
  write directly (`padding`, `margin`, `line-height`, `grid-gap`, `font-weight`), unlike the Figma-only videos.
  Flag this explicitly in the library page.
- 67.5 minutes is too long for one sitting; the practice-challenge format repeats the same rhythm ~6 times. A
  guide should assign 2-3 specific segments, not the whole video.
- The "em units for everything" convention (font-size, padding, margin all in em) is presented as if it's the
  standard approach; it's one reasonable convention, not the only correct one — a kid using px or rem values isn't
  wrong.
- Color-psychology claims (green = wealth/nature/growth, black = luxury) are explicitly flagged by the video
  itself as audience/culture-dependent — good, no need to over-correct, but don't present them as universal rules
  in the guide either.
- No JavaScript, no responsive design (media queries), no actual backend content at all — this is 100% visual
  CSS. Doesn't touch anything about client/server or data.
- Last ~1 minute is a paid-course ("UI Design Bootcamp") pitch — skip entirely.
- Minor: an early recap slide briefly lists "Proximity" in place of one of the seven named fundamentals before
  settling into the seven actually taught (White Space, Alignment, Contrast, Scale, Typography, Color, Visual
  Hierarchy) — a small inconsistency in the video's own outline slides, not worth mentioning to kids.
