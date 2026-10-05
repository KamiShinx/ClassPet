# Empty States in product design: 5 practical tips for UI designers (Nick Babich, 5.0 min)

**What it is / substance:** A short, focused explainer on what an "empty state" is (a screen with no content yet),
why it matters, its anatomy, and 5 tips for designing one. No fluff, one idea per minute, backed by clean diagrams.
**Good enough to assign as-is** — it's the shortest, clearest video in the batch and every claim has a matching
frame.

**Watch-list:** Whole thing (5 min). If trimming: [1:04–2:00] "anatomy of empty state" diagram, [2:16–4:07] the 5
tips.

## The ideas (in order, with [h:mm:ss])
- [0:00–1:00] Three situations that create an empty state: an **error state** (no internet), **no content yet** (no
  emails, no saved items), or **user action required** (haven't connected a payment method / finished setup — common
  during onboarding).
- [1:04–2:00] **Anatomy of an empty state**: header (short label of what's happening), body text/tagline (why), an
  illustration (optional, sets tone), and a button/action (what to do next). Jargon: **empty state** = a screen a
  user sees when there is no data to show yet, as opposed to an error or a fully loaded page.
- [2:32–3:07] Tip 1: **analyze the user flow** to find every place a user *can* land with nothing to show (e.g. "no
  search results" in a shopping flow) — shown as an actual flowchart (Start → Home → Search → Found? → ...).
- [3:07–3:37] Tip 2: **avoid dead-end pages.** An empty state with no guidance and no action is a dead end; the fix
  gives a direct path forward (e.g. a "choose photos" button instead of a blank gray box).
- [3:37–4:00] Tip 3: **keep it visually simple** — minimal text, one clear illustration, no clutter.
- [4:00–4:07] Tip 4: **bake emotion into it.** A neutral or lightly humorous illustration builds a human connection
  ("you don't have permission to view this board — keep moving," shown with a friendly robot).
- [4:07–4:35] Tip 5: **design success states too** — the moment a task list hits zero remaining items is a chance to
  congratulate the user, not just show nothing.

## Vocabulary for prompting Gemini
- **Empty state** → the screen shown when there's no data yet → "when the sheet has 0 rows, show an empty state with
  a short message and a button, not a blank page."
- **Error state** → a screen shown when something failed (no connection, request failed) → "add an error state that
  says 'couldn't load — try again' if the fetch fails."
- **Dead end** → a page with no way forward → "don't leave the user on a dead end — always give a button or link
  out."
- **Success state** → a screen celebrating a completed task → "when the last task is checked off, show a success
  state, not just an empty list."
- **Call to action (CTA)** → the one button telling the user what to do next → "give the empty state one clear call
  to action: 'Add your first task.'"

## Before/after examples from the frames
- [0:32–0:56] Three real error/empty screenshots side by side (no-internet error, "No collections" empty folder,
  "You have no expenses" with an Import Card button) — good real-world reference set, not mock-ups.
- [1:04–2:00] A literal labeled diagram (magnifying-glass-with-sad-face icon + header + body text bars + yellow
  button) built up piece by piece: text tagline → header/body split → illustration added → button labeled "action."
  This diagram is directly reusable as a teaching slide.
- [2:32–2:56] A generic checkout flowchart (Start → Home → Search → Found product? → Shipping → Cart → Billing →
  Order confirmation → Finish) used to explain "map the flow to find empty-state spots," plus a real flight-search
  "No results, clear all filters" screen.
- [3:20–3:36] Instagram-style empty message-thread illustration ("Oops, your connection seems off... tap to retry")
  paired with the anatomy labels (simple illustration / easy-to-understand text).
- [4:00–4:08] A friendly line-art robot illustration for a "you don't have permission" state — example of tip 4
  (bake in emotion) in practice.
- [4:16–4:40] Two real success-state examples: a checklist app showing "You've got no more tasks, well done!" and a
  weather-style success animation.

## Page material
- **Rules of thumb:** (1) every empty state answers: what's happening, why, what can I do; (2) never leave a dead
  end — always give a next action; (3) keep it to one line of header + one line of body + one button; (4) an
  illustration is optional but should match your app's tone, not be generic clip art; (5) design the *success* state
  (task-list-complete, all-caught-up) as deliberately as the empty one.
- **Exercises:** (1) Open your own app/game with a fresh (empty) Google Sheet backing it and screenshot what the
  user currently sees — is it blank, or does it explain what's happening and offer a button? (2) Find 3 empty states
  in apps on your phone (search-with-no-results is an easy one to trigger) and note whether each one follows the
  anatomy: header / body / action.
- **Quiz:** Q: What three things should the text in a good empty state tell the user? A: what's happening, why it's
  happening, what they can do about it. Q: What's a "dead end" empty state, and why is it bad? A: one with no
  guidance or action — it confuses the user and makes them give up.
- **Game angle:** For a turn-based/idle Apps Script game: "no items in your inventory yet," "no other players on the
  leaderboard yet" (since there's no real-time presence), and the very first launch before any save data exists are
  all empty states that need a header + explanation + button (e.g. "Play your first round" instead of a blank
  table). A cleared quest list or "you've completed today's tasks" is the success-state equivalent from tip 5.

## Caveats
Nothing Figma- or tool-specific here — pure UI concept, transfers 1:1 to HTML/CSS. Examples (e-commerce, to-do
apps, file managers) are adult-app-flavored but the pattern is universal. No outdated UI references. If anything
this video slightly overstates how much an illustration matters — for a 14-year-old's small project, "header + body
+ button, and don't dead-end" is 90% of the value; a custom illustration is a nice-to-have, not a requirement.
