# How to create a webapp with Google Sheet Data JSON Output for API endpoint URL (Laurence Svekis, 11.8 min)

**What it is:** tutorial, lesson 3 of the "Google Sheet Data API" course, continuing directly from 0aNN8MHdv_w. Live coding.

**Substance:** substantive — this is the "array to object to JSON API endpoint" video: reshaping raw Sheet rows into named objects, then outputting real JSON via `ContentService`, then redeploying and confirming the JSON endpoint works.

## Ideas, in the video's order
- [0:01:38] Pulls `headings` out of `data[0]` (the header row) and lowercases them with `.map(val => val.toString().toLowerCase())` — normalizing header names so they can safely become object property names later (practical "don't trust raw sheet text" habit).
- [0:03:17] `rows = data.slice(1)` — separates header row from data rows.
- [0:04:26] Writes `covObjects(rows, headings)` — a function name shorthand for "convert to objects"; walks through building it live, including a wrong-turn debugging moment (missing values, empty array) later resolved in the earlier quiz video pattern.
- [0:06:15] Inside the mapper, builds each row into a `{heading: value}` object using `headings.forEach((heading, index) => myObj[heading] = row[index])` — the core array-of-arrays -> array-of-objects transform, done from first principles rather than a library, good for teaching kids what a "real" API response shape looks like and why raw Sheet data isn't already in that shape.
- [0:07:45] Confirms via `Logger.log` that the output is now `[{first, last, status, id}, ...]` — one object per row, matching JS object literal syntax.
- [0:08:20] `doGet(e)` rewritten: builds `output = JSON.stringify({status: 'success', data: outputData()})` — wraps the array in an envelope object with a status field, a real-world API convention (not just a bare array).
- [0:09:45] `return ContentService.createTextOutput(output).setMimeType(ContentService.MimeType.JSON)` — the actual mechanism for a real JSON HTTP response instead of an HTML page; contrasted directly with the previous video's `HtmlService`/template approach.
- [0:10:15] Redeploys via New Deployment (not just updating existing deployment) — explicitly notes the deployed URL is a **new URL**, different from the previous "Hello World" deployment's URL, and to make a note of that when copying it. Confirms the exec-URL-changes-on-redeploy trap mentioned as a risk in the previous video's notes.
- [0:11:34] Explicit hand-off line: "that's ready for setting up our endpoint to be retrieved... using an ajax request from front-end code" — sets up the next video (JOOUtlOKbak) directly.

## What the frames add
Frames [0:00:45] show `Logger.log` execution output listing the raw sheet rows as arrays (`[first, last, status, id, ...]`) — good "before" picture to pair with the "after" JSON object view. Frames [0:10:15]-[0:11:00] show the New Deployment dialog and the final deployed page rendering literal `{"status":"success","data":[...]}` text in the browser at a real `script.google.com/.../exec` URL — a valuable, concrete "this is what a JSON API response actually looks like in a browser tab" screenshot, worth reusing directly when first introducing kids to what an endpoint is. Code frames throughout are legible and show the full transform function build up incrementally.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- The array-of-arrays -> array-of-objects reshape is the clearest, most teachable "why can't I just send the raw Sheet data" moment in the batch — Sheets naturally gives you rows-as-arrays; an API needs named fields. Worth building as a guided kata in class (hand kids a small 2-column sheet and have them write `covObjects` themselves, ideally with Gemini, then explain each line back).
- `ContentService` + `setMimeType(JSON)` vs `HtmlService` — two different "shapes" of doGet response (a page vs. a data feed) is a clean, class-usable distinction: "some endpoints serve pages for humans, some serve JSON for other programs to read."
- Envelope objects (`{status, data}`) — worth explicitly naming as a convention, not a requirement, so kids understand it's a design choice they'll see across real APIs too.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- "Turn your Sheet into a JSON API" milestone: take any 3-column class Sheet (e.g., favorite games/colors survey results), write `doGet` that returns `{status, data}` JSON, deploy, and open the raw JSON in a browser tab as proof it works. This is a clean, achievable, single-session project that directly sets up the next lesson (fetching it from a real front end).
- Good paired exercise: before writing `covObjects`, have kids manually predict/sketch what the JSON should look like, then check their Gemini-generated code against it — builds the "what shape do I want" instinct that AI-assisted building otherwise skips.

### Traps a kid will hit
- [0:10:15] Redeploying via "New deployment" changes the exec URL — a kid who shares/bookmarks the old URL will find it stops reflecting new code (or still serves old code, depending which deployment they call); needs explicit callout that redeploying to the SAME deployment (via "Manage deployments" -> edit -> new version) keeps the URL stable, which this video does not do (it always makes a new deployment) — worth correcting/clarifying in class rather than copying the video's habit.
- Silent bugs from mismatched header casing/whitespace: the lowercasing step is done for a reason (case-sensitivity) but a kid who skips it and later does `row.status` vs a header literally reading `"Status "` (trailing space) will get `undefined` with no error.
- The `covObjects` debugging moment in the video itself (an accidental empty array from a length check) is left partly unexplained in the narration — a kid pattern-matching this code without understanding the `if (val.length > 0)` guard could reproduce the same bug.

### Doesn't transfer, and why
Nothing here is Docs/Forms/email-adjacent; fully on-topic for the class's JSON/backend goals. The one caveat: `ContentService`/JSON output pairs naturally with the class's planned `doPost`+Netlify final-project architecture (this is literally the GET-JSON half of that pattern), so this video transfers unusually well compared to others in the batch — recommend it as required viewing alongside 0aNN8MHdv_w and JOOUtlOKbak.

## Honest caveats
No outdated APIs. One narration/edit rough patch around 0:13-0:14 equivalent (the empty-array debugging moment) is glossed over rather than explained — a teacher reusing this should pause and explain that moment rather than assuming the video does.
