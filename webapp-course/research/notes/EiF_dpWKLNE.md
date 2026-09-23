# Learn more about creating web apps with Google Apps Script - Do more with Web Apps (Laurence Svekis, 27.6 min)

**What it is:** Tutorial survey of the different ways a `doGet` can produce output: `ContentService` text/JSON output vs `HtmlService` output (from string, from file, from template with `.evaluate()`), plus scriptlets (`<?= ?>` / `<? ?>`) for server-side logic inside HTML templates. Undated, YouTube captions (auto, no punctuation, lightly reflowed here).
**Substance:** substantive - it's the clearest single explainer in the batch of the *difference* between raw content output and the templated HtmlService approach, and the only video that demonstrates GAS scriptlets end to end.

## Ideas, in the video's order
- [0:00:00]-[0:02:13] Up front, names the five output styles it will cover: string via ContentService, JSON via ContentService, HTML from a raw string, HTML from a file, and HTML from an evaluated template - good outline structure to reuse when explaining "there's more than one way to answer a web request."
- [0:03:20]-[0:03:52] `ContentService.createTextOutput('Hello World')` returned directly from `doGet` - simplest possible endpoint; explicitly states `doGet`/`doPost` are "invoked whenever the request is made to the script's URL."
- [0:04:26]-[0:04:59] Deploy dialog walked through again (web app type, execute as me, "anyone" access) - same content as other videos in the batch, confirms it's a stable, repeated UI across Svekis's lessons.
- [0:05:31]-[0:07:45] JSON output via `ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)` - same core JSON-endpoint pattern as 8VcVm069N_0, reinforced.
- [0:08:19]-[0:09:24] Key conceptual distinction made explicit: `ContentService` output is **not framed** (raw content at the URL, URL doesn't stay script.google.com) vs `HtmlService` output which **is framed** into the Apps Script web-app iframe wrapper and keeps the `/exec` URL. This "framed vs not framed" distinction is genuinely useful and rarely stated this clearly elsewhere.
- [0:09:56]-[0:11:35] `HtmlService.createHtmlOutputFromFile('index')` - serving a separate `.html` file instead of an inline string; shows adding a new HTML file via the Files + button.
- [0:12:07]-[0:12:39] Introduces `HtmlService.createTemplate(htmlString)` and immediately hits (and shows on screen) the "unsupported output type" error when forgetting `.evaluate()` - a good, authentic bug-and-fix moment.
- [0:13:45]-[0:15:22] Scriptlet syntax explained by direct PHP comparison: `<?= val ?>` prints, `<? code ?>` (no `=`) runs but doesn't print. This PHP analogy may not land for 14-year-olds who've never seen PHP - worth noting as an explanation that won't transfer to this audience without adaptation.
- [0:15:22]-[0:17:34] Demonstrates passing a JS variable from server (`output.val = '...'`) into a `<script>` block inside the evaluated template so client-side JS (`alert($val)`) can use a server value - concretely shows the server->client data handoff, which is the essence of "backend serves data to frontend."
- [0:20:18]-[0:21:56] Live bug: forgets to pass a `boo` variable into the template's output object, gets `ReferenceError: boo is not defined` inside the rendered page - genuine, instructive failure showing that scriptlet variables must be explicitly attached to the template's `output` object, they aren't automatically in scope.
- [0:21:56]-[0:24:41] `for`/`forEach` loops inside scriptlets to build a `<ul>` from an array, then extends to calling a *named GAS function* (`fromSheet()`) directly from inside the scriptlet to pull Sheet data live into the template - this is the fullest demonstration in the batch of "the whole page is generated server-side from Sheet data, live."
- [0:25:47]-[0:27:24] Final `fromSheet` function connects to a spreadsheet by ID, `getSheetByName('Sheet2').getDataRange().getValues()` - and the closing line notes explicitly that editing the Sheet and reloading the page shows new data automatically, closing the loop on "your web app IS a live view of your Sheet."

## What the frames add
Frames capture the actual scriptlet syntax on screen very legibly (sheet_004 @12:00-15:45 shows `<?= val ?>` growing into full conditional blocks with `<? if (true) { ?>...<? } else { ?>`), which is fiddly enough in text description that seeing the real angle-bracket/question-mark syntax matters. Frame at [20:15]-[21:15] shows the literal `ReferenceError: boo is not defined` error page rendered in the browser - a good "this is what breaking it looks like" reference. No UI or diagram value beyond code; talking-head/title-card intro only at [0:00].

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- The framed-vs-raw output distinction is a clean, reusable way to explain "your server can hand back different kinds of things" (data vs a full page).
- Server variables must be deliberately passed into templates (`output.val = ...`) - directly teaches "nothing crosses the client/server boundary unless you explicitly send it," a core backend idea.
- Live-Sheet-backed page (calling a GAS function from inside a scriptlet) is a strong "wow, the page is talking to the spreadsheet" demo moment for a first lesson on backends.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- "Live leaderboard/roster page": an HtmlService template that scriptlet-loops over Sheet rows and prints them as a list, refreshed on reload - almost identical to the final demo here, good as a first "your page reads real data" milestone, distinct from and simpler than the JSON/fetch endpoint pattern in 8VcVm069N_0.
- A short "break it on purpose" exercise: have kids remove a variable from the `output` object and observe the `ReferenceError`, to build the habit of expecting and reading real errors rather than panicking or asking the AI to "fix everything."

### Traps a kid will hit
- Forgetting `.evaluate()` after `createTemplate(...)` - a plausible mistake for AI-generated code too, and the error message shown ("script error... not returning back the right supported type") is not self-explanatory to a beginner.
- Assuming a normal JS variable declared in `doGet` is automatically visible inside the scriptlet - it isn't; must be explicitly attached via the template's output object. Likely a recurring "the AI wrote it but it doesn't work" case.

### Doesn't transfer, and why
- The PHP comparison for scriptlet syntax is an instructor aside that won't mean anything to 14-year-olds with no PHP exposure; needs a fresh analogy (e.g. "like fill-in-the-blank" or "mail merge") if used in class.
- Deep-dive into five different output methods (raw text, JSON, HTML string, HTML file, evaluated template) is more taxonomy than a 14-year-old project needs up front; only the "HTML file" and "evaluated template from file" methods are likely to matter for actual kid projects, the ContentService/raw-text methods matter mainly for the doPost JSON-endpoint use case covered better in 8VcVm069N_0.

## Honest caveats
No mention of bound vs standalone scripts, permissions/quotas, or doPost at all - this video is purely about doGet output styles. The scriptlet material, while clear, is a fairly deep and somewhat old-fashioned Apps Script feature (template scriptlets read like early-2010s server-side templating); most modern Gemini-generated Apps Script web apps skip scriptlets entirely in favor of `google.script.run` or fetch-based JSON APis, so treat this section as "good to know exists" rather than "core to teach."
