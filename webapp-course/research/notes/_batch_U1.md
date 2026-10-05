# Batch U1 outline: UI basics, UX basics, user flows

Six videos, one (`pEibggX4Eek`, "UX Design - What is it?") is a 2019 career/job-titles talking-head video with zero
design content or visuals — **excluded from the library entirely**. The other five split cleanly into three
library pages matching the batch's three sub-themes.

## Page 1: "UI Design Basics: Contrast, Spacing & the 7 Fundamentals"
**Feeds from:** `uwNClNmekGU` (C.R.A.P., 9.2 min), `cf95Z7Ngg8k` (Spacing, 10.4 min), `vD3B6guUI0o` (7 Fundamentals
full course, 67.5 min — excerpted, not assigned whole).

**Why grouped:** all three are visual/CSS design-principle tutorials with the same teaching pattern (definition ->
live before/after -> rule of thumb). Ordering them C.R.A.P. -> Spacing -> 7 Fundamentals goes simple-vocabulary
first, then a deeper numeric system, then the most code-transferable, most complete treatment last.

**Sections:**
1. **Contrast, Repetition, Alignment, Proximity (C.R.A.P.)** — embed `uwNClNmekGU` [0:00:24]-[0:03:19] (contrast)
   and [0:04:59]-[0:07:10] (alignment/invisible axes). Four-term vocabulary intro, cheapest entry point.
2. **Spacing systems** — embed `cf95Z7Ngg8k` [0:04:33]-[0:06:50] (the outside-in 5-level method) and the labeled
   before/after at [0:06:56]-[0:08:56]. Skip the Mobbin sponsor segment entirely.
3. **Contrast you can measure (WCAG)** — embed `vD3B6guUI0o` [0:14:12]-[0:18:42]. This is the one segment across
   the whole batch with an actual numeric accessibility standard (4.5:1 / 3:1 / 7:1) — worth its own callout box.
4. **Visual hierarchy = combining the above** — embed `vD3B6guUI0o` [0:46:48]-[0:54:32] (the 5-squares diagram +
   the mailing-list form redesign). This is the unifying idea that ties C.R.A.P., spacing, and contrast together.
5. **Worked example: a dashboard** — embed `vD3B6guUI0o` [1:00:56]-[1:06:24] (sidebar + content dashboard). Closest
   thing in the batch to a screen kids will actually build for the course hub; also the only segment using real
   CSS (`grid-gap`, `padding`, `margin-left`) rather than a design tool.

**Exercises (combined, pick 2-3):** screenshot-and-circle the focal point; measure the biggest/smallest gaps in
your app and check the outside-in rule; check one text element's contrast against its background; sketch which
single element in a screen should be "most important" and confirm the CSS actually makes it so.

**Guide should add:** a short glossary translating Figma-speak (auto-layout, artboard) to actual CSS
(`padding`/`margin`/`gap`), since only the last segment uses real code.

## Page 2: "UX Basics: Nielsen's 10 Usability Heuristics"
**Feeds from:** `VMIP_2srCSk` (26.0 min) alone — strong enough to carry a page by itself.

**Sections:** one subsection per heuristic (10 total, each is short and self-contained in the source video), but
recommend the guide leads with the 3 most relevant to an Apps Script app and treats the rest as a reference list:
1. Visibility of system status [0:01:09] — feedback for every action.
2. Error prevention [0:10:25] — constraints, feedback, confirm risky choices.
3. Help users recognize/diagnose/recover from errors [0:19:44] — plain-language errors, no raw codes.
4. Reference list (shorter treatment): match system/real world, user control & freedom, consistency & standards
   (+ "mental models"), recognition rather than recall, flexibility & efficiency, aesthetic & minimalist design,
   help & documentation.

**Exercises:** click every button, check for visible feedback; find one irreversible action, add a confirm/undo;
screenshot a screen, strip anything not needed for the main task.

**Guide should add:** for each heuristic, one line translating the Amazon/Google example into an Apps Script
context (e.g. "system status" -> show a message while `google.script.run` waits on the server).

## Page 3: "Planning Your App: User Flow Diagrams"
**Feeds from:** `cvYhuowazh0` (10.3 min) alone — short, tight, assign in full (no padding to cut).

**Sections:**
1. The three required parts of any flow: entry point, steps to completion, final interaction [0:01:17]-[0:03:42].
2. The shape vocabulary: circle (start/end), rectangle (screen/step), diamond (decision), solid vs. dotted lines
   [0:03:42]-[0:06:36]. Embed the zoomed frames at [0:04:16]-[0:05:44] (clean, isolated shape examples).
3. Keep-it-clean rules: minimal color, meaningful labels, consistency [0:06:36]-[0:08:32].

**Exercises:** draw the flow for one feature using only the four shapes; add a missing decision diamond to an
existing feature; click through a built feature and diagram what you actually find (dead ends?).

**Guide should add:** this page should explicitly double as a "do this before you prompt Gemini" step for every
other project in the course — sketching entry/decision/end BEFORE asking the AI to build screens clarifies which
`google.script.run` calls are needed where. Recommend cross-linking it from the hub's project-kickoff instructions.

## Combined vocabulary list (all pages)
Contrast · Hierarchy (visual hierarchy) · Focal point · Repetition · Alignment (invisible axes) · Proximity ·
Padding vs. margin · Wrapper / container / group (outside-in spacing) · White space · Contrast ratio (WCAG,
4.5:1/3:1/7:1) · Scale · Typography (font family, line-height, letter-spacing, font-weight) · Color psychology /
hue family · System status / feedback · Mental model · Emergency exit / undo · Error prevention / constraint ·
Recognition rather than recall · Minimalist design · Plain-language error message · User flow · Entry point ·
Decision point / branch · Final interaction / end state · Steps to completion.

## Reply (5 lines)
- Wrote 6 per-video notes in `notes/` for batch U1 (UI basics, UX basics, user flows); `pEibggX4Eek` (UX job-titles
  video) has no design content and is flagged to exclude from the library.
- Strongest videos: `VMIP_2srCSk` (Nielsen's 10 heuristics, durable industry standard) and `cvYhuowazh0` (user
  flow diagram vocabulary) — both assignable in full.
- `vD3B6guUI0o` is the only video using real CSS rather than a design tool; recommend excerpting 3 segments
  (WCAG contrast, visual hierarchy, the dashboard challenge) rather than the full 67 minutes.
- Proposed 3 library pages in `notes/_batch_U1.md`: UI Design Basics (C.R.A.P. + Spacing + 7 Fundamentals
  excerpts), UX Basics (Nielsen's heuristics), and Planning Your App (user flow diagrams).
- Combined vocabulary list and exercises for all three pages are in `notes/_batch_U1.md`.
