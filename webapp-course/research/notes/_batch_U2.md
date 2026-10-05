# Batch U2 outline — UI details, mobile/responsive, onboarding

8 videos, quality spread from thin (LdavX-UVK8I) to excellent (Uf7xLHUpKHE, KIPuLa4wqGY). Three natural library
pages instead of one, since the theme splits into design-craft, code-adjacent-craft, and onboarding clusters.

## Page 1: "UI basics that separate you from a beginner"
**Videos:** AH_ugxmLeUM (mistakes) + KIPuLa4wqGY (empty states) + Gfsd8NNuD9g (mobile UI patterns). All three are
short (5–8 min), visual, tool-agnostic enough to assign as-is, and stack into one coherent "everyday UI craft"
lesson.
- **Sections:** (1) 7 beginner mistakes — embed [0:00–1:06] flow, [1:52–2:47] spacing, [5:34–6:07] feedback from
  AH_ugxmLeUM. (2) Empty & success states — embed [1:04–2:00] anatomy diagram + [2:32–4:35] the 5 tips from
  KIPuLa4wqGY (this diagram is the strongest single reusable image across the whole batch). (3) Mobile-specific
  rules — embed [0:00–2:11] nav/sizing + [3:15–4:53] one-thing-per-screen/bottom sheets from Gfsd8NNuD9g.
- **Exercises:** screenshot your own app, circle every inconsistent button/spacing; design an empty state for your
  Sheet-backed list when it has 0 rows; count your nav icons (cap at 5, min 44px tap targets).
- **Our guide adds:** translate "Figma component/auto layout" into "reusable CSS class," since none of these are
  code tutorials.

## Page 2: "Making it feel good: micro-interactions and responsive layout"
**Videos:** hHp4FGVcHjY (micro-interactions) + _2wqNI_Ch6g (breakpoints). Grouped because both are the most
code-adjacent videos in the batch — one teaches the *feel* vocabulary (state/transition/easing), the other teaches
the *layout* mechanism (media queries) — and both need the same guide move: translate a tool demo (Figma /
DevTools) into a CSS instruction for Gemini.
- **Sections:** (1) States and transitions — embed [0:33–2:49] heart-button states + [14:08–16:15] accordion icon
  twist from hHp4FGVcHjY; skip the toggle-tuning section (repetitive). (2) Breakpoints hands-on — embed [1:02–2:00]
  Apple breakpoint crossing + [7:28–8:24] the 4-thumbnail breakpoint summary + [17:46–20:16] adaptive-vs-responsive
  from _2wqNI_Ch6g.
- **Exercises:** add one CSS `transition` to a button; open your own app in DevTools, shrink the window, screenshot
  where it breaks, fix it with one `@media` rule.
- **Our guide must explicitly map:** Figma "state" → CSS class; "Smart Animate + easing" → `transition: ... ease`;
  "Auto Layout hug contents" → `height: auto`/flexbox; Figma breakpoint inspection → Chrome's own free DevTools
  device toolbar (skip the paid extension the video plugs).

## Page 3: "First 60 seconds: onboarding and tutorials"
**Videos:** LdavX-UVK8I (4 types, thin) + QMo2T5apdYw (Cal AI funnel, needs an ethics note) + Uf7xLHUpKHE (GDC
game-tutorial talk, excellent). Ordered weakest-to-strongest deliberately: LdavX-UVK8I gives the vocabulary in 90
seconds, QMo2T5apdYw shows the psychology (with a caveat), Uf7xLHUpKHE gives the actual game-design framework kids
should walk away remembering.
- **Sections:** (1) The 4 types (vocabulary only) — embed [0:34–2:46] from LdavX-UVK8I, no exercise needed here,
  just definitions. (2) Why onboarding works, with a warning — embed [0:32–3:19] + [8:14–9:54] (Gen Z Bible, the
  *good* short example) from QMo2T5apdYw; explicitly flag the paywall/disguised-market-research tricks as a
  discussion point, not a template. (3) Tutorials as puzzles — embed [3:51–6:00] (4 competing goals) + [8:42–11:30]
  (puzzle framing, the batch's best single idea) from Uf7xLHUpKHE; embed the "TEACH/COMFORT/RESPECT/EXCITE" Venn
  diagram frame [13:04].
- **Exercises:** write a 3–4 screen onboarding for your own project (welcome+benefit, one personalizing question,
  start button — no paywall); rewrite one literal instruction in your game as a puzzle ("can you get the number to
  10?" instead of "click twice"); watch someone else's first 60 seconds with your app cold and log every confusion.
- **Discussion prompt (ours):** which onboarding tricks from QMo2T5apdYw are fine to use, and which (disguised
  market research, "bait and switch" paywalls) are manipulative and shouldn't be copied even though they work?

## Combined vocabulary (all 8 videos)
User flow, hidden state, drop shadow, corner radius, auto layout/flexbox, loading state, redundant element •
Empty state, error state, dead end, success state, call to action (CTA) • Bottom nav bar, tap target (44px), card,
double-nesting, bottom sheet, long press, contextual action, type scale • Passive/active/tip/checklist onboarding,
tooltip • Onboarding flow, social proof, personalization question, affirmation screen, paywall • State, transition,
easing, duration (ms), spring/bounce, "hug contents," accordion • Breakpoint, media query, responsive, adaptive,
mobile portrait/landscape/tablet/desktop • Tutorial-as-puzzle, safe space, big yellow arrow (anti-pattern), locus of
attention, mental model.

## Notes for whoever builds these pages
Weakest video (LdavX-UVK8I) should never anchor a page alone — it's folded into Page 3 as a 90-second vocabulary
intro only. Strongest video (Uf7xLHUpKHE) deserves the most embed time and its Venn diagram reused as a standalone
teaching image. QMo2T5apdYw needs an explicit "don't copy the paywall/dark-pattern stuff" framing line near its
embed, not just in our notes — a 14-year-old skimming will otherwise take "disguise market research as a question"
as a neutral tip rather than the ethics flag it should be.
