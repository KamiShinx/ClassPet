# Everything you need to know about Mobile App UI's in 8 minutes (Kole Jain, 7.6 min)

**What it is / substance:** How mobile UI differs from desktop, demonstrated by building a notes app ("Notely")
live: navigation, type size, layout direction, the 4 "building blocks," gestures, contextual actions, and empty
states. Dense but concrete, every claim is shown on the actual app being built. **Good enough to assign as-is.**

**Watch-list:** [0:00–2:11] navigation + sizing (the most broadly useful part), [3:15–4:53] "one screen does one
thing" + bottom sheets, [6:31–end] empty states revisited for mobile specifically.

## The ideas (in order, with [h:mm:ss])
- [0:00–1:06] **Navigation**: no room for a sidebar, so use a bottom nav bar (3–5 icons max, 3–4 ideal), floating,
  with the primary action visually distinct. Every tap target should be **44px minimum** ("fat fingers"). If there
  are too many links for a bottom bar, turn the sidebar into its own home-page screen instead.
- [1:39–2:11] **Type doesn't shrink on mobile — it often grows.** iOS's base font size (17px) is actually *bigger*
  than macOS's (13px). Jargon: **type scale** = the set of font sizes an app uses consistently.
- [2:11–2:43] **Layout direction**: desktop dashboards can lay content out in two directions at once (rows AND
  columns); on mobile, pick **one direction per section** — either stack vertically or scroll horizontally, never
  both like a desktop grid.
- [2:43–3:15] **The four building blocks**: cards, text/links, images, inputs — nearly everything else is one of
  these wrapped in a card. Avoid **double-nesting cards** (a card inside a card) — it stacks padding on padding and
  wastes your limited space; group with plain white space instead.
- [3:15–3:48] **"One screen does one thing."** Don't throw extra widgets onto a screen that has a clear single job
  (e.g. the notes editor is just a notes editor) — add a new *page*, not a new layout, when you need more.
- [3:48–4:21] **Bottom sheets**: a panel that slides up from the bottom (title + search + confirm/cancel) used when
  you need more UI without leaving the current context (e.g. picking a template while editing a note).
- [5:26–5:58] **Gestures**: swipe right to go back (with a parallax-style background shift), swipe down to dismiss a
  bottom sheet, swipe up to search (Slack-style), **long press** = mobile's right-click (blur background, show
  actions, slight zoom).
- [5:58–6:31] **Contextual/collapsing actions**: don't keep controls permanently on screen if there's no room — hide
  the nav bar while editing a note and show only the 1–2 relevant actions (confirm, cancel) instead.
- [6:31–7:03] **Empty states, mobile-specific**: first-launch empty state should draw attention to the main action
  (the "+" button) with a simple full-screen message; a "no search results" empty state needs imagery + an
  acknowledgment of the missing term + suggestions (e.g. for a typo) + an exit action.

## Vocabulary for prompting Gemini
- **Bottom nav bar** → fixed row of 3–5 icons at the screen bottom for primary navigation → "add a bottom nav bar
  with icons for Home, Shop, and Profile."
- **Tap target** → the clickable area of a button/icon (should be ≥44px) → "make sure every button is at least 44
  pixels tall so it's easy to tap."
- **Card** → a boxed grouping of related content → "put each item in its own card with rounded corners."
- **Bottom sheet** → a panel that slides up from the bottom of the screen → "when they tap 'choose template', open a
  bottom sheet instead of a new page."
- **Long press** → press-and-hold to reveal extra actions → "long-press an item to show delete/rename options."
- **Contextual action** → a control that only appears when relevant → "hide the nav bar while editing and just show
  Save and Cancel."

## Before/after examples from the frames
- [0:00–2:00] Dark-mode "Notely" notes app: sidebar (desktop) replaced by a bottom bar (Overview/Notes/Calendar/
  Tasks + floating "+"), shown mid-transition from wide layout to phone-width layout.
- [2:08–2:32] A finance-dashboard screenshot ("New report, $528,976...") shown as the "two-direction desktop grid"
  example, immediately contrasted with the same app's stacked, one-direction mobile calendar/notes view.
- [4:16–4:32] Split-screen icon panel: nav icons vs. food/recipe icons vs. app-specific icons shown deliberately
  differing in style but grouped by area — a live example of "different icon families are OK if visually separate"
  (echoes AH_ugxmLeUM's icon rule).
- [4:56–5:12] "Tasks" screen with a real bottom sheet open ("Start style guide for website," "Required changes"
  checklist) — a clean, concrete bottom-sheet example.
- [6:56–7:04] "Oops, nothing found. Your search didn't turn anything up. Did you mean 'Sprint'?" — the exact
  no-results empty state described in the transcript, with a typo-suggestion.

## Page material
- **Rules of thumb:** (1) bottom nav, 3–5 icons, 44px minimum tap size; (2) one layout direction per section on
  mobile — stack or scroll, not both; (3) never nest a card inside a card; (4) one screen = one job, add a new page
  instead of cramming; (5) use a bottom sheet for "more options without leaving the page"; (6) hide controls that
  aren't relevant right now instead of showing everything all the time.
- **Exercises:** (1) Count the icons in your app/game's main navigation — if it's more than 5, pick the 3–4 most
  important and move the rest into a menu. (2) Find one screen in your project that's doing more than "one thing"
  and split it into two screens or a bottom sheet.
- **Quiz:** Q: What's the recommended minimum tap-target size and why? A: 44px, because fingers are much less
  precise than a mouse cursor. Q: What's the mobile equivalent of a desktop right-click? A: long-press.
- **Game angle:** Directly useful for an Apps Script game viewed on a phone browser: a bottom nav (Play / Inventory
  / Leaderboard) with big tap targets, one screen per game mode instead of cramming everything on one page, and a
  bottom sheet for a shop or item-details panel instead of a full page navigation. Swipe/long-press gestures need
  extra JS (`touchstart`/`touchend` listeners) inside the HtmlService iframe — doable but more advanced than a
  first project; flag as optional polish, not a requirement.

## Caveats
A ~1-minute mid-video segment [4:32–4:56, 4:56 mention] is a sponsor plug for the app "Mobbin" — skip it, it's an ad,
not content. Everything else is genuinely instructional. Nothing shown is Figma-only; the "Notely" app demo is a
real interactive-feeling prototype, useful as a visual reference even without Figma access. No outdated UI patterns.
