# Learn How to Improve UX with Nielsen's 10 Usability Heuristics (Matt Borchert, 26.0 min)

**What it is / substance:** A slide-by-slide walkthrough of Jakob Nielsen's classic 10 usability heuristics (the
industry-standard UX checklist since 1994), each one paired with real screen-recorded examples mostly from Amazon,
plus Google, Zappos, and Photoshop.
**Is it good enough to assign to a 14-year-old as homework? Yes, with a guide.** This is the strongest single video
in the batch for "UX basics" — the heuristics are a genuinely durable industry-standard checklist (not a fad), each
one gets a plain-language rewrite plus a concrete example, and it maps almost one-to-one onto things a kid can
check in their own Apps Script app. The video itself is repetitive on screen (title slides are held motionless for
many frames while narration continues) but the content per heuristic is short and self-contained, so it splits
into digestible chunks well.

**Watch-list:** The video is naturally chaptered by heuristic; a kid doesn't need all 10 at once. Best 3 to assign
first for this course:
- [0:01:09]-[0:03:51] **Visibility of system status** — feedback, hover states, loading indicators. Most directly
  useful for a Sheets-backed web app (e.g. "show a loading spinner while `google.script.run` is talking to the
  server").
- [0:10:25]-[0:12:16] **Error prevention** — constraints, feedback, confirming risky choices. Very relevant to a
  Sheets-backed form (bad input crashes or corrupts data).
- [0:19:44]-[0:21:52] **Help users recognize, diagnose, and recover from errors** — plain-language error messages,
  no raw codes, offer a way out. Directly maps to "don't just show a raw Apps Script stack trace to the user."

## The ideas (in order, with [h:mm:ss])
1. [0:01:09] **Visibility of system status** — always give feedback for user actions within a reasonable time.
   Examples: hover-underline on links [0:02:47], an "undo" toast after deleting a Gmail conversation, a spinner
   ("system busy") or a progress/percentage bar during a long action.
2. [0:03:51] **Match between system and real world** — use words and metaphors from the user's world, not internal
   system jargon. Bad: `"Path: 2121 Not Found"`. Good: plain error text. Examples of good matches: the shopping
   cart icon, the folder icon, the trash/recycle bin icon — all borrow real-world concepts so no explanation is
   needed.
3. [0:06:05] **User control and freedom** — give a clear, easy "emergency exit": cancel a long download, undo a
   mistaken action, remove or fix an item without starting over. Demoed on the Amazon cart (delete item, change
   quantity, both instantly reversible).
4. [0:07:41] **Consistency and standards** — same word/action always means the same thing (don't mix "Save" and
   "Commit" for the same operation); consistent layout across screens (Google Sheets vs. Docs keep the same menu
   position); behavior should match the user's **mental model** — introduces this term with the classic "push
   door pulled by mistake" example [0:09:51].
5. [0:10:25] **Error prevention** — better than a good error message is preventing the error entirely. Three
   tactics: constraints (a date field that can't accept "day 132"), feedback (flag an invalid/duplicate email
   immediately), and confirmation before risky/irreversible actions (emptying trash, cancelling a big download).
6. [0:12:36] **Recognition rather than recall** — don't make users remember things; show them. Examples:
   direct-manipulation UI (buttons/menus visible instead of memorized commands), Amazon's left-sidebar filters
   always in the same place. Contrast case: passwords force recall (no way around it); voice assistants (Alexa/
   Siri) are a mixed case — ideally recognition-free, but sometimes need a "what can I ask?" prompt.
7. [0:14:40] **Flexibility and efficiency of use** — "accelerators" (keyboard shortcuts, bookmarks, customizable
   interfaces like Photoshop panels) that speed up experts without getting in a beginner's way — the beginner can
   ignore them and still complete the task the slow way.
8. [0:16:32] **Aesthetic and minimalist design** — don't show information that isn't needed; every extra element
   competes with what matters. Best example: the Google homepage (one search bar, two buttons, nothing else)
   [0:17:04]-[0:17:52]. Second example: Amazon/Zappos product grids — a consistent grid pattern with lots of white
   space makes it instantly obvious what is and isn't a clickable product.
9. [0:19:44] **Help users recognize, diagnose, and recover from errors** — plain-language error messages (no raw
   codes), precisely state the problem, suggest a fix; largely a combination of the earlier heuristics. Named
   example: a bad 404 page that just says "Error 404" vs. one that offers alternative suggestions.
10. [0:21:52] **Help and documentation** — ideally the product needs none, but when help is provided it should be
    searchable, task-focused, and give concrete steps (not a giant unfiltered FAQ index). Demoed with Amazon's
    per-product "answered questions" search [0:22:56]-[0:23:28].

## Vocabulary for prompting Gemini
- **System status / feedback** → visibly confirming an action happened → "show a checkmark or 'Saved!' message
  after the form submits."
- **Mental model** → what a user already expects something to do, based on past experience → "keep the delete
  button doing exactly what a trash icon should do — don't make it archive instead."
- **Emergency exit / undo** → an easy way to back out of or reverse an action → "add a 'cancel' option while the
  data is saving, and let the user undo a delete for a few seconds."
- **Error prevention / constraint** → stopping bad input before it's submitted, not just catching it after →
  "don't let the date picker accept a day higher than 31."
- **Recognition rather than recall** → show the user their options instead of making them remember commands →
  "show the available actions as buttons instead of expecting the user to know a keyboard shortcut."
- **Minimalist design** → showing only what's needed for the current task → "remove anything on this screen that
  isn't part of completing the current action."
- **Plain-language error message** → an error that says what went wrong and what to do next, not a code → instead
  of showing a raw script error, "show 'That row is missing a name — please fill it in and try again.'"

## Before/after examples from the frames
- [0:02:40]-[0:03:52] Amazon homepage screen recording: hover states, horizontal-scroll hint on image carousels,
  cursor changing to a hand icon on clickable items — several "visibility of system status" cues shown live, but
  it's a static example rather than a true before/after.
- [0:06:56]-[0:08:00] Amazon cart: delete button, quantity stepper with a "max 2 per customer" warning, cart
  emptying and re-filling — a genuine live demo of "user control and freedom," good to screenshot for the guide.
- [0:17:04]-[0:17:52] Google homepage frames: confirm it's literally just a logo, one search bar, two buttons —
  the cleanest minimalism example in the batch, easy for a kid to grasp instantly.
- [0:18:08]-[0:19:20] Amazon and Zappos product grids: consistent card layout (image/title/price repeated
  identically) makes "this is a product" obvious without labeling it — a good real example of using repetition
  (visual pattern) to reduce cognitive load, tying back to the C.R.A.P. video's "repetition" idea.
- Most other frames are a static orange/white Google Slides deck holding the same bullet text for many consecutive
  frames (narration continues while the slide doesn't change) — the sheets confirm there's no additional visual
  information beyond what the transcript already states; no separate "look at this diagram" content to add.

## Page material
- **Rules of thumb:**
  1. Every button/action in your app should give some visible response within about a second — even just a color
     change or a "Saving..." label — so the user knows it registered.
  2. Give users an easy way out of anything they didn't mean to do: a delete/cancel/undo, not a dead end.
  3. Use the same word for the same action everywhere in your app (don't call it "Save" in one place and "Submit"
     in another for the same operation).
  4. Prevent bad input before it happens (limit choices, validate as they type) rather than only showing an error
     after submission.
  5. Cut anything from a screen that isn't needed for the task at hand — every extra button or label competes for
     attention with the one thing that matters.
  6. If something goes wrong, say what went wrong in plain words and what to do next — never show a raw error
     code or technical message to the user.
- **Exercises:**
  1. Click every button in your app. Does each one visibly respond (color change, message, new screen) within a
     second? List any that give no feedback and describe the fix to Gemini.
  2. Find one action in your app that can't be undone (delete, submit, overwrite). Ask Gemini to add a
     confirmation step or an undo window before it's final.
  3. Screenshot one screen of your app and count the elements that aren't needed to complete the main task on that
     screen. Ask Gemini to remove or hide them.
- **Quiz:**
  1. Q: A form silently fails when a user enters a birthday of "February 30th" — which two heuristics does this
     break, and what's the fix? A: Error prevention (should never accept an impossible date) and error
     recognition/recovery (if it does fail, it should say why in plain language) — fix: validate the date field so
     invalid dates can't be entered.
  2. Q: What is a "mental model" and why does it matter for UI design? A: What a user already expects something to
     do based on prior experience (e.g. a trash icon means delete); breaking it (a trash icon that archives
     instead) causes confusion and mistakes.
- **For game videos:** N/A — general UX video, not game-specific, but every heuristic transfers directly to a
  turn-based/idle Apps Script game: visibility of system status (confirm a move/turn was registered), error
  prevention (don't let a player submit an invalid move), recognition over recall (show available actions as
  buttons, don't expect players to memorize commands), and minimalist design (don't clutter the game screen with
  unused stats).

## Caveats
- Extremely slide-heavy: most contact-sheet frames show a static orange/white Google Slides deck held for 8+
  seconds each while narration continues — visually repetitive, but this doesn't hurt the actual content quality,
  since the concepts and examples are still clearly explained in speech and the Amazon/Google/Zappos demos are
  real and current-looking.
- Nielsen's heuristics date to 1994 and the video is likely several years old (Amazon/Google UI shown may look
  slightly dated), but the ten heuristics themselves are still the industry-standard baseline checklist — flag
  this as one of the most durable, non-trendy pieces of content in the whole research set.
- All examples are consumer e-commerce/search (Amazon, Google, Zappos) — a kid will need help translating "product
  grid" or "shopping cart" examples into their own app's context (e.g. a game inventory, a class sign-up sheet);
  the guide should add 1-2 Apps-Script-specific translations per heuristic.
- No code shown anywhere, no Figma/design-tool content either — purely conceptual/UX, which makes it a good
  complement to the more visual/code-heavy videos in this batch rather than a replacement.
