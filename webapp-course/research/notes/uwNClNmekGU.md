# 4 Foundational UI Design Principles | C.R.A.P. (Jesse Showalter, 9.2 min)

**What it is / substance:** A Figma speed-demo teaching the classic C.R.A.P. acronym (Contrast, Repetition,
Alignment, Proximity) by fixing an ugly bike-shop landing page live, one principle at a time.
**Is it good enough to assign to a 14-year-old as homework?** Yes, with a guide. It's short, visual, and every idea
is shown as a concrete before/after, not just talked about. The guide should tell kids to ignore the Figma UI chrome
(they'll never touch Figma) and focus only on what changed on the page.

**Watch-list:**
- [0:00:24]-[0:03:19] Contrast — the single most useful segment, has the clearest before/after (headline size/weight
  jump, colored button block).
- [0:04:59]-[0:07:10] Alignment — the "invisible axes" idea, good for teaching kids to actually look at whether
  things line up.
- [0:06:35]-[0:08:47] Proximity — short, ends the video, has the full recap slide.

## The ideas (in order, with [h:mm:ss])
- [0:00:24] **C.R.A.P.** = Contrast, Repetition, Alignment, Proximity. Presented as "the four most important
  foundational design principles."
- [0:00:34] **Contrast**: organize the design, establish hierarchy, emphasize a focal point, add visual interest.
  Achieved via color, weight, size, imagery.
- [0:01:42] Demo: headline goes from 24px/medium to 54px/semi-bold, gets a color; a plain rectangle becomes a filled
  color block behind the bike image; nav items get aligned; result "looks about 100 times better."
- [0:03:19] **Repetition**: increases consistency and the user's ability to learn the interface; reduces confusion.
  Demo: a messy "yard sale" layout of scattered bike cards gets one consistent pattern applied to all cards (same
  bike orientation, same card alignment, even spacing).
- [0:04:59] **Alignment**: organizes and groups elements, creates rhythm, "brings order to chaos." Introduces the
  idea of **invisible axes** — horizontal/vertical lines elements silently line up on. Demo shows the layout still
  "works" even rotated diagonally, because the elements still align to each other along their own axis.
- [0:07:10] **Proximity**: makes elements that belong together look like they belong together, by spacing them
  closer; unrelated elements get pushed apart. Demo: nav items grouped, body copy pulled closer to its headline,
  a promo tag placed directly under its button and grouped with it.
- [0:08:15] Final result compared to the start: "a hundred times better" — attributed to stacking all four
  principles, not any single one.

## Vocabulary for prompting Gemini
- **Contrast** → making one element visually stand out (bigger, bolder, different color) so the eye goes there
  first → "make the headline much bigger and bolder than the body text so it's the first thing you see."
- **Hierarchy** → the order in which things should be noticed (most important first) → "give the price the most
  visual weight on the card, then the title, then the description."
- **Focal point** → the one thing on screen meant to grab attention first → "make the 'Start' button the focal
  point of the page."
- **Repetition** → reusing the same style/spacing/pattern for similar elements → "make every product card use the
  exact same layout and spacing."
- **Alignment** → elements lining up on shared invisible edges → "align all the card titles to the same left edge."
- **Proximity** → grouping related things close together and putting space between unrelated things → "move the
  label right next to its input box, and add space before the next section."

## Before/after examples from the frames
- [0:01:12]-[0:02:08] Headline "Let's go outside and ride bikes" grows from small/thin to large/bold, gets closer
  to the body copy, and the bike image gets a colored block behind it — visibly turns a flat page into one with a
  clear focal point.
- [0:03:36]-[0:04:24] Three scattered bike/text blocks (different sizes, misaligned) become three identical,
  evenly-spaced cards — this is the clearest "repetition" before/after, easy for a kid to copy as a test.
- [0:05:04]-[0:06:16] Left-aligned text vs. centered/scattered text; the diagonal rotation demo shows alignment is
  about relative position, not about being horizontal — a nice "aha" frame but slightly abstract for a beginner.
- [0:07:20]-[0:08:24] Final hero section: nav grouped, headline+subtext pulled together, two buttons grouped
  side-by-side, promo text tucked under them — a full "real-looking" landing page by the end.

## Page material
- **Rules of thumb:**
  1. Before touching color, check: is there ONE clear focal point on this screen? If everything is the same size,
     nothing stands out.
  2. If two elements repeat (two cards, two buttons), make them pixel-identical in style — don't let AI improvise
     variations.
  3. Draw an imaginary line down the left edge of a group of items — do they all touch it? If not, that's a
     misalignment bug.
  4. Things that belong together should be close together; things that don't should have a gap. If you can't tell
     which label belongs to which input, they're too far apart.
  5. Fix contrast, repetition, alignment and proximity in that order — contrast first because it decides what the
     user notices first.
- **Exercises:**
  1. Screenshot your own app/game's main screen. Circle the one element you want the user to notice first. Is it
     actually the biggest/boldest thing on screen? If not, describe the contrast fix to Gemini in one sentence.
  2. Pick two repeated UI elements in your app (two buttons, two list rows). Do they look identical? List every
     difference (size, color, spacing) and ask Gemini to make them match.
  3. Zoom into a screenshot and draw a vertical line through your leftmost elements. Which ones miss the line? Ask
     Gemini to align them.
- **Quiz:**
  1. Q: Your app has a "Save" button and a "Delete" button right next to each other with no gap, but they do
     unrelated things. Which C.R.A.P. principle fixes this, and how? A: Proximity — add space between them since
     they aren't related actions (and maybe contrast, to make Delete visually distinct/warning-colored).
  2. Q: What's the difference between alignment and proximity? A: Alignment is about elements lining up on shared
     edges/axes; proximity is about the distance between elements signaling whether they're related.
- **For game videos:** N/A — this is a general UI video, not game-specific. All four principles apply directly to
  a turn-based/idle Apps Script game's screens (inventory cards, stat panels, buttons) exactly as shown.

## Caveats
- 100% Figma UI in the demo (layers panel, alignment tools, auto layout) — kids never touch this; the guide must
  translate every fix into plain English for a Gemini prompt, not a Figma menu path.
- No code, no HTML/CSS — purely visual design theory. Useful as a "what to ask for" vocabulary lesson, not a
  coding lesson.
- Very short and a bit repetitive itself (same "C.R.A.P. done" recap slide reused ~5 times) — genuinely thin
  content stretched with recap slides; the actual teaching content is about 5 minutes of the 9.2.
- The "diagonal alignment" demo [0:06:35] is visually cool but conceptually confusing for a first-timer; skip it in
  the guide unless a kid asks.
