# Dynamic Quiz App from Google Sheet Data JavaScript AJAX JSON No Server Data as API in web app (Laurence Svekis, 19.3 min)

**What it is:** tutorial, lesson 5 of the "Google Sheet Data API" course — builds the JSON API endpoint for a quiz app (data prep + Apps Script side only; the front-end game logic is built in the next video, 8VKh6WdY-qc). Live coding.

**Substance:** substantive — a second, different worked example of the Sheet -> array-of-objects -> JSON pattern already taught in frejbw3eJTY, but with a more interesting, irregular data shape (variable-length answer arrays) that pushes the transform logic further.

## Ideas, in the video's order
- [0:00:00] Sheet structure: `question | correct | answer1 | answer2 | answer3 | answer4` — up to four extra distractor answers, explicitly variable in count. Good real example of "not every row is uniform," a step up from the fixed-column examples earlier in the batch.
- [0:08:52] `SpreadsheetApp.openById(id).getSheetByName('quiz').getDataRange().getValues()` — same standalone-script pattern as before, now against a dedicated "quiz" tab.
- [0:09:26] `rows = sheetData.slice(1)` to drop the header row (no headings array needed this time since the column meaning is fixed/known, contrasted with the dynamic-headings approach in frejbw3eJTY — good implicit lesson that "sometimes you hardcode structure when you know it, sometimes you read headers dynamically").
- [0:10:32] Builds each row into `{question: row[0], correct: row[1], arr: [...]}` where `arr` is built by looping `i` from 2 to 5 and pushing non-empty cell values — the meaningful new logic: converting a fixed-width sparse row (up to 4 possible answers, some blank) into a clean variable-length array, skipping blanks.
- [0:13:20]-[0:13:53] A real live debugging moment: an off-by-one index (`val.length` check reading the wrong index / loop starting at the wrong number) initially yields an empty array for one row; walked through and fixed on screen, then further corrected at [0:13:53] to intentionally start the loop at index 1 (not 2) so the "correct" answer is included in the options array (needed so the quiz can shuffle the correct answer in among distractors) — subtle but important design intent: the correct answer must be one of the options, not separate from them.
- [0:14:25] Explicit design rationale stated out loud: options array includes the correct answer so it can be "randomized... and match it against whatever the correct answer is" — a genuine little bit of app-design thinking, not just syntax.
- [0:14:53]-[0:16:08] Wraps in `doGet`/`JSON.stringify({status, data: outputData()})` + `ContentService.createTextOutput(...).setMimeType(JSON)` — same pattern as frejbw3eJTY, now applied to quiz data.
- [0:16:08] Deploys as a NEW web app ("Quiz 1") — again generates a fresh exec URL, access set to "Anyone."
- [0:16:42] Sets up a minimal front-end fetch (`fetch(url).then(res=>res.json()).then(data=>console.log(data))`) purely to confirm the endpoint works — stops here, defers building the actual quiz UI to the next video.

## What the frames add
Frames [0:07:00]-[0:08:30] show the real Google OAuth consent screen again (third time in this batch) for the standalone quiz script — reinforces that every new standalone project needs its own authorization. Frames [0:11:00]-[0:13:45] show the Apps Script execution log with the actual nested array/object output at each debugging step (empty array bug, then corrected version with real answer arrays) — useful, honest "debugging in progress" footage rather than only clean final code, good to show kids that even the instructor's first attempt has bugs. Frame [0:18:30] shows the live spreadsheet alongside the DevTools console tree showing `data: Array(3)` with each question object expandable — confirms end-to-end correctness visually.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Handling variable-length / sparse data from a fixed-width spreadsheet (blank cells for unused answer slots) — a step beyond the simpler fixed-shape examples elsewhere in the batch, and a realistic problem kids will hit the moment their own data isn't perfectly rectangular.
- Reinforces (a second time, different data) the array-of-arrays -> array-of-objects -> JSON -> ContentService pipeline, which is worth teaching as a named, repeatable recipe rather than one-off code.
- Small but real API/game-design idea: the correct answer must live inside the same options list the client shuffles, not be tracked separately — a "shape your data for how it'll be used" lesson.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Direct project seed: "build your own quiz data API" — kids design a Sheet with question/correct/up to N distractor columns (any topic they like), write the `outputData`/`doGet` pair (with Gemini's help) mirroring this video, and confirm the JSON in a browser tab. Natural lead-in to the next video's actual playable game (8VKh6WdY-qc).
- Good explicit exercise: deliberately leave some answer cells blank in the demo sheet and have kids verify their code doesn't choke on missing values — directly recreates the video's own live bug as a teaching moment.

### Traps a kid will hit
- Off-by-one loop bounds when scanning a fixed range of optional columns (2 to 5, or 1 to 5 depending on whether the correct answer is included) — the video itself gets this wrong once on screen before fixing it; a kid using Gemini to generate similar code should be told to expect and test for this exact class of bug.
- Blank cells in the Sheet come back as empty strings, not `null`/`undefined` — a kid checking `if (val)` vs `if (val.length > 0)` needs to understand what "empty" actually looks like from `getValues()`.
- Same redeploy-changes-URL trap noted in frejbw3eJTY, repeated here for a second, differently-named deployment ("Quiz 1") — worth reinforcing that each new project+deployment gets its own URL and OAuth consent.

### Doesn't transfer, and why
Fully on-topic, no Docs/Forms/email content. The only limitation: this video is deliberately incomplete on its own (data/API only, no UI) — needs to be paired with 8VKh6WdY-qc to be a usable classroom unit; don't assign this video in isolation.

## Honest caveats
No outdated APIs. The mid-video debugging detour (0:13:20-0:13:53) is a little confusing in narration alone — the frames make it clearer than the transcript does; recommend using the contact sheets, not just the transcript, if reusing this section for a walkthrough.
