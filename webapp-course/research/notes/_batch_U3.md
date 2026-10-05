# Batch U3 outline: usability testing, accessibility, game UI/HUD

Six videos split cleanly into two library pages plus one optional add-on. Full notes: `notes/jn6nT5JVmoc.md`,
`notes/RhgUirqki50.md`, `notes/cOmehxAU_4s.md`, `notes/z8xUCzToff8.md`, `notes/ONYmBBZiBj8.md`, `notes/VY8TsXKRySU.md`.

## Page 1: "Test it before you ship it" (usability testing)
**Feeds:** jn6nT5JVmoc (Fabayo, 13.2 min) + RhgUirqki50 (NNgroup, 3.6 min)

**Sections:**
1. **Why test at all** — open with RhgUirqki50 in full (it's short, clean, no tool needed): the "5 users, several rounds beats 20 users once" idea, with the "20 users = 4 iterations x 5 users each" formula slide embedded as the header image.
2. **How to plan a test** — from jn6nT5JVmoc [0:01:08]-[0:02:12]: 3-5 objectives, screener questions, welcome message, instructions, follow-up questions. Give kids a fill-in-the-blank template based on this list rather than making them watch the tool-demo middle of the video.
3. **Reading results** — embed the jn6nT5JVmoc results-comparison screenshot [0:12:48] (Prototype A vs B, five metrics side by side) as a worked example of "here's what a finished comparison looks like," paired with the [0:10:22]-[0:12:32] narration.
4. **Do it yourself** — the exercises from both notes files, reframed as one combined mini-project: write a 3-objective test plan, sit a classmate down for 2 minutes untimed-help, time one task, ask 3 follow-up questions (ease/clarity/would-use-again, 1-5), log it in a Sheet. Do a second round after one fix.

**Watch-list for kids:** RhgUirqki50 whole (3.6 min); jn6nT5JVmoc only [0:01:08]-[0:02:12] and [0:10:22]-[0:13:04] (skip the ~8-minute Listnr tool demo entirely — it's a sponsored ad for a product they'll never use).

**Exercises to embed:** (1) write the 3-objective test plan, (2) run one live 2-minute test on a classmate and log time + ratings, (3) fix one thing and re-test with a different classmate — did the numbers move?

## Page 2: "Nobody can use what nobody can reach" (accessibility)
**Feeds:** cOmehxAU_4s (A11ycasts #11, 12.3 min) + z8xUCzToff8 (Accessibility Fundamentals, 28.2 min)

**Sections:**
1. **What's actually happening** — open with z8xUCzToff8's DOM -> accessibility tree diagram [0:16:40]-[0:16:48] (redraw it) and the teapot/affordance idea [0:02:44]-[0:04:24]. One paragraph, not the whole 28 minutes.
2. **The golden rule** — "use the right HTML element and you get accessibility for free" [0:10:33]-[0:14:23], with the button-vs-div before/after (real button announces "button"; styled div announces "group"). Directly actionable: tell Gemini "use a real `<button>` element."
3. **A 10-minute self-check checklist** — built entirely from cOmehxAU_4s: Tab through with no mouse and check focus rings [0:00:32]-[0:01:36]; check alt text on images [0:03:46]-[0:04:24]; check heading order H1->H2->H3 [0:05:56]-[0:07:35]; check contrast with Chrome DevTools [0:08:42]-[0:10:53]. This is the checklist a kid actually runs on their own app.
4. **When you need ARIA** — briefly, from z8xUCzToff8's checkbox demo [0:19:56]-[0:26:32]: only for custom widgets with no native element, and it changes only what's announced, never behavior. Embed the split-screen label frame [0:22:08]-[0:23:20] as the visual.
5. **Do it yourself** — the Tab-only test and the DevTools contrast check from cOmehxAU_4s's exercises.

**Watch-list for kids:** cOmehxAU_4s [0:00:32]-[0:03:13] (tab/focus) and [0:08:42]-[0:10:53] (contrast tools) — both concretely redoable in Chrome DevTools kids already have open for Apps Script. z8xUCzToff8 only [0:02:44]-[0:04:24] (affordances) and [0:19:56]-[0:22:48] (the checkbox demo) — skip the rest, it's talk-paced and repetitive.

**Exercises to embed:** (1) Tab-only test on your own app, list where you got stuck; (2) open DevTools Accessibility panel on one button, check its computed Name; (3) find one div-styled-as-button and ask Gemini to make it a real `<button>`.

## Optional page 3 (lower priority): "Make your game's screen part of its world" (game UI vocabulary)
**Feeds:** ONYmBBZiBj8 (Jeff Chow, GDC) + VY8TsXKRySU (Margaret Robertson, GDC) — **both professional-level**, per the brief;
this page should be framed explicitly as "vocabulary + inspiration," not a process kids can run.

- From ONYmBBZiBj8: just the four terms — diegetic/non-diegetic, skeuomorphic/flat — with the pro/con two-column frame
  [0:09:52]-[0:10:24] as the visual, and the simplified rule "pick 3 colors + 1 font matching your theme, reuse everywhere."
- From VY8TsXKRySU (the more usable of the two talks): hide, merge, evacuate/kill, with the Dotson Co purchase-screen
  before/after/after-again sequence [0:17:46]-[0:19:26] embedded directly — this is concrete enough to be an exercise,
  not just vocabulary. Color-blind-safe design as a direct Gemini prompt line.
- Skip entirely: research-phase mood-boarding, IAP/hard-currency examples, AR/VR section, all Q&A except the
  "why non-diegetic for Google Maps" answer (useful analogy for "task tools" vs "game worlds").

## Combined vocabulary list (for prompting Gemini)
Usability test, research objective, screener question, task completion time, A/B test/variant | focus ring, skip link,
alt text, landmark, heading hierarchy, contrast ratio | accessibility tree, role, native/implicit semantics, ARIA,
aria-label/aria-labelledby, aria-checked/state | diegetic UI, non-diegetic UI, HUD, skeuomorphic, flat design | hide
(progressive disclosure), merge, evacuate/cull, color-blind-safe, non-visual feedback.

## Notes for whoever builds the pages
Every video in this batch needed trimming — none should be assigned start-to-finish. jn6nT5JVmoc is 60% sponsor ad;
z8xUCzToff8 and VY8TsXKRySU are talk-paced GDC/conference recordings with lots of restated slides; ONYmBBZiBj8 is
explicitly professional-level and should be framed as "look, don't build." RhgUirqki50 is the one video in the batch
short and clean enough to assign whole with no editing.
