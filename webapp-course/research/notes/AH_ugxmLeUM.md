# 7 UI/UX mistakes that SCREAM you're a beginner (Kole Jain, 7.3 min)

**What it is / substance:** A Figma designer redesigns one recipe-app screen live, fixing 7 (+1 bonus) common beginner
mistakes one at a time, with visible before/after. Concrete, visual, no padding. **Good enough to assign as-is** —
short, every point has a picture, nothing requires Figma to understand.

**Watch-list:** Whole thing is only 7 min, watch it all. If short on time: [0:00–1:06] flow, [1:52–2:47] spacing,
[3:21–4:28] icons, [5:34–6:07] interactive feedback.

## The ideas (in order, with [h:mm:ss])
1. **[0:00–1:06] User flow.** Sketch the screens on paper first, or you miss states: an allergy-picker with 6 preset
   buttons but no search box and no "skip" option. Jargon: **user flow** = the sequence of screens a user moves
   through to finish a task; **hidden state** = a state of the UI you forgot to design (empty, loading, error).
2. **[1:06–2:13] Overusing effects.** Beginners pile on gradients and drop shadows. Fix: use one-color gradients (or
   none), and for shadows switch the color to light gray + big blur instead of just lowering opacity. Less visual
   noise = cleaner.
3. **[1:52–2:47] Spacing.** Cramped beginner UIs need a grid (frames shown: 3-column, 2-column) and more vertical
   breathing room, especially on mobile. Jargon: **auto layout** = a way to make a group resize/space itself
   automatically instead of manual pixel-pushing (Figma feature; CSS equivalent is flexbox/grid gap).
4. **[2:47–3:21] Inconsistent components.** Same button (back/skip) drawn two different ways in the same app reads as
   amateur. Fix: one corner radius (10px) for all small components, one style per element type.
5. **[3:21–4:28] Icons.** No icons on list rows forces users to read more. Mixed icon styles (different stroke width/
   fill) look sloppy — pick one icon set. Well-known icons (house, bookmark, person) don't need labels; unusual ones
   do (or add a tooltip). Different icon "families" are fine if they're visually separated by area of the screen.
6. **[5:01–5:34] Redundant elements.** Cut decorative arrows a swipe gesture already implies, cut unneeded strokes/
   outlines — visual clutter for no functional reason.
7. **[5:34–6:07] Interactive feedback.** If a tap doesn't visibly react for a split second, it looks broken. Fix:
   gray out a button on click, add a loading spinner if the wait is longer, fill in an icon (e.g. a save/heart icon)
   so state change is obvious.
8. **[6:07–6:40] Bonus: charts.** An overdesigned chart (no axis, 16 bars for 7 days, rounded bar tops that hide the
   real value) is *less* readable than a plain one. Simple > pretty for data.

## Vocabulary for prompting Gemini
- **User flow** → the path of screens for one task → "walk me through what happens if the user has no allergies —
  do we need a skip button?"
- **Drop shadow** → soft shadow under an element to lift it off the background → "give this card a soft light-gray
  shadow, not the default harsh one."
- **Corner radius** → how rounded a box's corners are → "make every button and input use the same 10px corner
  radius."
- **Auto layout / flex spacing** → elements that space themselves automatically → "use flexbox with consistent gaps
  so these cards don't need manual margins."
- **Loading state** → the interface state shown while waiting → "gray out the button and show a spinner while it
  saves."
- **Redundant element** → a decoration doing no job → "remove that arrow icon, the swipe already implies it."

## Before/after examples from the frames
- [0:00–0:24] Travel/Airbnb-style explore screens shown only as *good* reference (not the redesign subject).
- [0:33–1:04] Allergy screen: adds a search bar and a "skip" affordance the original lacked (matches the flow
  critique in the transcript).
- [1:04–2:00] Gradient icon panel shown mid-cleanup; drop-shadow settings panel (Figma "Drop shadow" properties:
  position, blur, spread, color) visible on screen — useful visual for what a shadow "is" as parameters, not magic.
- [3:36] A clean icon row (home/bowl/bookmark/grid/person) next to a "Good" status pill — shows the *end state* of
  consistent, same-style icons from mistake 5.
- [6:24–6:48] Two chart pairs side by side: cluttered purple bar chart with no axis vs. the same data, clean, with
  labeled days — the clearest single before/after in the video.

## Page material
- **Rules of thumb:** (1) sketch the flow before the visuals; (2) when in doubt, remove an effect rather than add
  one; (3) one corner radius, one icon set, one button style per app; (4) every tap needs a visible reaction within
  the same second; (5) a chart with no axis is not a chart.
- **Exercises:** (1) Screenshot your own app/game UI and circle every place two similar things (buttons, cards) are
  styled differently — fix one. (2) Click a button in your app and count how long before anything visibly changes;
  if it's more than instant, add a pressed/disabled visual state.
- **Quiz:** Q: Name two things Kole Jain removes rather than adds when cleaning up a design. A: gradients/heavy drop
  shadows and redundant arrows/strokes. Q: What's the fix for a button that "does nothing" for a moment after a
  click? A: give it an immediate visual state change (grayed out, pressed) even before the real result loads.
- **Game angle:** The recipe app isn't a game, but "every tap needs feedback within the same second" is exactly game
  feel/juice — a turn-based Apps Script game should flash/disable a button the instant it's clicked, before the
  server round-trip (`google.script.run`) returns. Consistent icon style and one corner-radius rule apply to any
  card-based game UI (inventory, shop). Grid/spacing rules apply less literally (there's no "3-column grid" concept
  needed for a small game UI) — treat as optional.

## Caveats
Entirely a Figma design exercise, not code — vocabulary transfers, workflow (auto layout, components, Flaticon
plugin) does not, since kids vibe-code HTML/CSS directly. The Mobbin-style "look at real apps for inspiration" habit
is good general advice but isn't demonstrated here. Nothing here is outdated. The chart bonus tip and the icon
library recommendation (Flaticon/feather/phosphor icons) are tool-specific asides, easily swapped for "use one
consistent icon set from one free site" as the transferable rule.
