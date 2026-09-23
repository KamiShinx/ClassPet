# How to create a Quiz with JavaScript and Google Sheet Data Quiz App 2 JSON data from Google Sheets (Laurence Svekis, 39.0 min)

**What it is:** tutorial, lesson 6 (final) of the "Google Sheet Data API" course, builds the full playable quiz front end on top of the JSON endpoint from AfA8twIVxRg. Live coding, longest video in the batch.

**Substance:** substantive — the most complete single build in the batch: takes a working JSON API and turns it into an actual interactive game (buttons, scoring, feedback, replay), entirely with vanilla DOM JS. No backend concepts beyond what earlier videos already showed (it's a `fetch` once at load, then pure front-end state), but strong as a "how far can you take client-side JS on top of one JSON call" example.

## Ideas, in the video's order
- [0:07:45]-[0:09:15] Builds `init()` -> `start()` flow: a disabled "Start Game" button that becomes enabled only once the `fetch` promise resolves (`btn.disabled = true` until data loads) — a real, useful async-UX pattern: don't let the user act before the data they need has arrived.
- [0:10:15] `game.total = data.data.length` — derives game state (total questions) directly from the fetched array length, no hardcoding.
- [0:13:15]-[0:14:45] Introduces a `maker(eleType, html, cla, parent)` helper to wrap the repetitive `document.createElement` + `innerHTML` + `classList.add` + `append` pattern — a reusable DOM-building utility; good example of factoring out repeated code, a generic but well-motivated refactor.
- [0:17:15] Hits a real live bug: `TypeError: Cannot read reading '0'` from `game.arr[game.question]` — undefined because of a property name mismatch (`game.data` vs an old variable name) — shown and fixed on screen, good authentic debugging footage.
- [0:19:30]-[0:21:00] Builds the multiple-choice options dynamically: `val.arr.forEach(opt => ...)` creates one clickable box per answer, reusing `maker()`.
- [0:24:00]-[0:24:45] `removeClicks()` — after an answer is picked, loops over all option boxes and calls `removeEventListener('click', checker)` on each so a user can't click twice or pick multiple answers — a real "prevent double actions" pattern worth calling out explicitly to kids (a common bug class in interactive apps).
- [0:25:15] `checker(e)` reads `e.target.myObj` — stores custom data directly on a DOM element as a property (not a `data-*` attribute) so the click handler can recover which option/answer it corresponds to; contrasted implicitly with the more standard `dataset` approach — worth telling kids both exist, this video's way is quick but slightly non-standard.
- [0:32:00]-[0:32:45] Scoring and feedback: compares `e.target.myObj.opt === val.answer`, sets background color green/red, increments `game.score`, builds a feedback message + "Next Question" button dynamically.
- [0:34:15]-[0:34:30] End-of-game check: `game.question >= game.total ? 'End Game' : 'Next Question'` — ternary driving both button label and behavior, and at [0:35:15] triggers the actual Game Over screen with final score.
- [0:36:30] A real uncaught `DOMException` shown on screen: `classList.add` called with an empty-string token ("contains HTML space characters" style error) — happens when a button label argument is passed in the wrong slot; fixed shortly after. Another genuine, instructive live bug.
- [0:37:15]-[0:38:00] "Play Again" wiring: resets `game.question`, `game.score`, `game.data` and re-fetches, confirming the full reset-and-replay loop works.

## What the frames add
Essential here — this video is best understood from the frames, not the transcript, since it's almost entirely incremental UI-building with sparse narration of *why*. Frames show the actual quiz being played end-to-end multiple times: question screen with colored answer buttons (Blue/Red/Green/Purple), a red "Wrong!" flash, a green "Correct!" flash, a "Next Question" button, and a final "Game Over — You got 2 out of 3 correct" screen with "Play Again." Frames [0:36:30] and [0:34:15]/[0:34:30] show real red-highlighted uncaught errors in the browser console at the exact moment they happen — valuable, authentic "this is what a bug looks like and here's the message" material for teaching debugging literacy, more useful than any clean final code.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- None new beyond what earlier videos in the batch cover (`fetch`, JSON parsing) — this video is 95% client-side app logic, not client/server communication. Only one backend-relevant idea: fetching once at load and then treating the data as a local in-memory game state for the rest of the session (no repeated server calls during play) — worth naming explicitly as a design choice ("load once, play offline from memory" vs "ask the server on every click").

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- This is the single best "week 3-4 milestone" candidate in the whole batch: pairs directly with AfA8twIVxRg's data API to give a complete project a kid can build almost end-to-end with Gemini's help — Sheet of questions -> JSON endpoint -> playable quiz with score and replay. Recommend using this exact two-video pair as a project spec, not to be shown to kids verbatim (39 minutes of narrated live-coding is too long for a 14-year-old to sit through) but as the teacher's own reference for what "done" looks like, then letting Gemini generate the bulk of the code from a spec derived from it.
- Good smaller milestone within that project: implement the "disable button until data loads" and "disable options after one click" patterns as explicit, separately-graded requirements — both are realistic bugs a vibe-coded first draft will likely have (a kid clicking Start before data loads, or clicking two answers).

### Traps a kid will hit
- Exactly the two live bugs shown in the video are highly representative of what Gemini-generated code will also produce: (1) property-name mismatches between the fetched data shape and the code reading it (`game.arr` vs `game.data`), and (2) passing arguments to a helper function in the wrong order/slot (the `classList.add('')` DOMException). Both produce real browser console errors with reasonably readable messages — worth explicitly teaching kids to open DevTools console and read the first line of a red error before asking Gemini to fix it blindly.
- Forgetting to remove old event listeners before adding new ones on re-render (`removeClicks()`) — a kid who skips this will see answers register multiple times or stack up extra listeners across replays; a classic vibe-coding bug since it produces no error, just weird behavior.
- Storing state as a custom property directly on a DOM element (`e.target.myObj`) works but is non-standard; if Gemini writes code using `dataset` attributes instead in a similar app, a kid pattern-matching this video's approach could get confused mixing the two conventions.

### Doesn't transfer, and why
Not Docs/Forms/email-adjacent — fully on-topic as a front-end capstone for the batch's data-API arc. The main limitation: it teaches essentially no NEW client/server concept (everything backend-relevant was already covered in AfA8twIVxRg and earlier); treat it as the "now build something fun with what you already learned" project, not as required conceptual viewing.

## Honest caveats
No outdated APIs. At 39 minutes this is by far the longest and most meandering video in the batch, with real (uncommented) trial-and-error — good for a teacher building a lesson plan, too long and unfocused to assign as direct student viewing. The two authentic bugs are a genuine strength, not padding, but they're easy to miss unless watching the frames closely; the transcript alone undersells them.
