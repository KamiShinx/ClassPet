# Master Spacing in UI Design (Jesse Showalter, 10.4 min)

**What it is / substance:** A Figma demo teaching a systematic approach to spacing in mobile UI: pick a base grid
(8px), follow a few hard numeric rules, then use a 5-level "outside-in" method to decide how much space goes where
(wrapper -> container -> group -> card -> element), redesigning a job-listing card feed as the demo.
**Is it good enough to assign to a 14-year-old as homework?** Yes, with a guide. The numeric rules and the
outside-in structure are concrete and directly quotable in a Gemini prompt. Needs a guide because ~2.5 min is an
unskippable sponsor read (Mobbin) that adds nothing.

**Watch-list:**
- [0:00:20]-[0:02:39] The base-grid idea + the two hard numeric rules (6px minimum spacing, 12-42px between
  tappable buttons). Skip the Mobbin sponsor segment [0:03:07]-[0:04:05].
- [0:04:05]-[0:06:50] The "outside-in" 5-level method — the most reusable idea in the whole video.
- [0:06:50]-[0:09:14] The full before/after redesign with exact pixel numbers at each level — best single frame set
  to show a kid.

## The ideas (in order, with [h:mm:ss])
- [0:00:20] **Pick a spacing system and stick to it.** The presenter uses an "8-pixel grid": every spacing value,
  corner radius, and font size is a multiple of 8 (or sometimes 4). The point isn't the number 8, it's having ONE
  number system so you stop guessing.
- [0:01:45] **Hard rule #1:** keep at least ~6px between any two elements, or the design looks cluttered and is
  hard to read at a glance. Shown with a badge+text example that's cramped at 1px vs. clean at 6px+.
- [0:02:39] **Hard rule #2:** tappable buttons need roughly 12-42px between them (depends on button size) so
  fingers don't misfire. Also states the general tension: embrace white space, but don't push related items so far
  apart they stop looking related.
- [0:04:33] **The "outside-in" method** — 5 nested levels, each with a suggested pixel range, spacing shrinks as
  you move inward:
  1. **Wrapper** (outermost container holding everything): ~24-30px padding from the screen edge.
  2. **Containers** (a whole section, e.g. "Full-time jobs" vs "Freelance jobs"): spacing between containers, e.g.
     32px.
  3. **Groups** (a set of repeated same-type items, e.g. a stack of cards): spacing between siblings in the group,
     e.g. 16-24px, usually a bit less than the container-to-title gap.
  4. **Cards/rows**: internal padding inside one card (e.g. 16px between its own contents).
  5. **Individual elements** inside a card (icon-to-text, tag-to-tag): smallest spacing, e.g. 6-8px.
- [0:06:50] Full redesign walkthrough with these exact numbers applied: 24px wrapper padding, 32px between
  sections, 24px between a section's title and its cards, 16px inside cards, 8px between buttons/tags, 6px between
  the smallest elements — spacing *decreases* as you move from outer structure to inner detail.
- [0:09:14] Closing point: this rule set is *why* auto-layout / systematic spacing tools matter — once numbers are
  decided, applying them becomes mechanical and fast.

## Vocabulary for prompting Gemini
- **Spacing system / base grid** → all spacing values are multiples of one number (e.g. 8) → "use 8px, 16px, 24px,
  32px as the only spacing values in this page, nothing in between."
- **Padding** → space inside a container, between its edge and its content → "add 16px of padding inside the card."
- **Wrapper** → the outer container holding the whole page's content, with margin from the screen edge → "wrap the
  whole page in a container with 24px of padding on all sides."
- **Container / section** → a named grouping of related content (a whole card list, a whole form) → "put the
  profile section and the settings section in separate containers with a gap between them."
- **Group** → a set of repeated, same-type items (e.g. a list of cards) → "these five item cards are a group —
  give them all equal, even spacing between them."
- **Outside-in spacing** → decide spacing from the biggest structure down to the smallest detail, using larger
  gaps outside and smaller gaps inside → "make the gap between sections bigger than the gap between items inside
  one section."
- **White space** → empty, unfilled space around elements, used deliberately → "leave more white space around the
  hero image instead of cramming other elements next to it."

## Before/after examples from the frames
- [0:01:45]-[0:02:10] A logo+text lockup at ~1px spacing (illegible when scaled) vs. the same at 6px+ (clean) —
  good side-by-side for teaching the minimum-spacing rule.
- [0:00:40]-[0:01:25] Figma canvas switches from a 6-column layout grid (doesn't dictate spacing) to an 8px dot
  grid (used to snap every spacing decision) — frames show the visual difference but this is Figma-tool-specific
  and not transferable to Apps Script/HTML.
- [0:06:56]-[0:08:56] The job-card feed before (cramped, inconsistent gaps between title/cards/tags) and after
  (labeled overlay showing 24px wrapper padding, 32px section gaps, 24px title gaps, 16px card padding, 8px button
  spacing, 6px element spacing) — this is the single best frame to embed on the library page; it's a fully labeled
  diagram of the whole method.

## Page material
- **Rules of thumb:**
  1. Pick one base number (8 is a common, easy one) and only use multiples of it for spacing — stop guessing pixel
     values one at a time.
  2. Never let two unrelated elements sit closer than about 6px apart, or it reads as cluttered/broken.
  3. Give tappable buttons enough gap (roughly 12px+) so a finger can't hit the wrong one.
  4. Spacing should shrink as you go from "whole page" to "one button": biggest gaps around sections, smallest
     gaps around a single icon+label.
  5. If you can't tell whether two elements are related just by looking at the gap between them, the spacing is
     wrong, not the elements.
- **Exercises:**
  1. Screenshot your app. Measure (roughly, by eye) the biggest gap and the smallest gap on screen. Is the biggest
     gap around your main sections, and the smallest gap inside one component? If not, describe the fix to Gemini.
  2. Pick one screen and ask Gemini to "use only 8, 16, 24, 32px spacing everywhere on this page" — compare
     before/after screenshots.
  3. Find two elements in your app you *meant* to be related (e.g. a label and its input) — is the gap between
     them noticeably smaller than the gap to the next unrelated element? Fix the one that isn't.
- **Quiz:**
  1. Q: Why pick ONE base number for all your spacing instead of using whatever pixel value looks right each time?
     A: Consistency — it removes guesswork, makes the design look intentional, and makes elements that use the
     same spacing feel related to each other.
  2. Q: In the outside-in method, should the gap between two sections be bigger or smaller than the gap between two
     items inside one section? A: Bigger — space shrinks as you move from outer structure to inner detail.
- **For game videos:** N/A — general UI video. For an Apps Script idle/turn-based game, the outside-in method maps
  directly: page wrapper padding, gap between game panels (inventory vs. stats), gap between repeated item cards
  in an inventory grid, padding inside one item card, and tight spacing between an icon and its count number.

## Caveats
- ~1 minute is a straight sponsor ad for Mobbin (a design-inspiration site); skip it entirely in any excerpt or
  guide — irrelevant to Apps Script kids and not free/kid-appropriate to sign up for.
- All specific pixel numbers (8px grid, 24px wrapper, 32px sections) are the presenter's personal system, not a
  universal law — the guide should present them as "a reasonable starting point," not "the correct numbers."
- 100% Figma; no code shown. The mapping from "Figma auto-layout padding" to actual CSS (`padding`, `gap`,
  `margin`) is left to us to add in the guide — the video never touches CSS.
- Everything here is about visual spacing, not layout mechanics (flexbox/grid) — a kid still needs to know how to
  actually *tell* Gemini "add 16px gap" in CSS terms, which this video doesn't teach.
