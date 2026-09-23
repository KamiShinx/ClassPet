# Sheets Data to a Web Page Part 1 (Laurence Svekis, 19.4 min)

**What it is:** step-by-step tutorial, building a custom Apps Script JSON API from scratch and consuming it with `fetch` on a separate HTML page. No visible year but modern editor UI (post-2022 Apps Script IDE).
**Substance:** substantive: full working pipeline shown end to end, nothing skipped.

## Ideas, in the video's order
- [0:00:00] Frames the whole lesson as: connect a web page to a spreadsheet via a web-app URL endpoint, using `fetch`. Sets up the mental model "sheet -> endpoint -> fetch -> page" before touching code.
- [0:01:38] Builds the Sheet by hand: a "jokes" sheet (id, title, content, response, category, status) and a second "categories" sheet fed by `=UNIQUE()` off the jokes sheet. Shows spreadsheet-as-database with a derived/lookup sheet, not just one flat table.
- [0:04:19] Opens the bound script editor (Tools > Script editor), names the project clearly ("Jokes API") — he explicitly notes a good name matters because you'll see it later in Google's permission-grant screens (generic knowledge, but grounded in what's shown).
- [0:05:53] `SpreadsheetApp.openById(SHEETID)` used instead of `getActiveSpreadsheet()`, with the id stored as a global constant — deliberate choice so the script isn't tied to being bound to one sheet.
- [0:06:58] `getSheetByName('jokes')` -> `getDataRange()` -> `getValues()` returns a nested array (array of row-arrays). Explicit: "each row is a separate array."
- [0:08:02] First run triggers the OAuth consent screen; explains this is because the script needs edit-level access to the spreadsheet, and that unverified locally-built scripts show scary warnings — normal, not a bug.
- [0:09:42] Wraps the row data in an object `{status: 'success', data: rows}`, `JSON.stringify`s it, returns via `ContentService.createTextOutput(...)`. This status/data envelope pattern is a clean, reusable API shape.
- [0:11:51] `doGet(e)` is introduced as the function name Apps Script always calls for web requests; the `e` parameter (request event) is mentioned but not used yet — sets up for later filtering lessons.
- [0:12:22] Deploy walkthrough: New deployment > type "web app" > execute as (whose Google identity runs the code) > who has access (Only myself / Google account / Anyone). Explicitly says it must be "Anyone" for the front-end fetch to reach it with no login.
- [0:13:27] Pastes the `/exec` URL straight into a browser to sanity-check the raw JSON before writing any client code — good debugging habit worth reusing in class.
- [0:14:32] Separate plain HTML+JS page (not Apps Script) does `fetch(url)` — first `.then(rep => rep.text())` — explicitly shows this returns a *string*, not usable JSON yet.
- [0:16:12] Chains `JSON.parse` on that string to get a real JS object, then `data.data.forEach(el => ...)` to walk the rows.
- [0:17:50] Final step: builds an HTML string with a template literal per row and injects with `.innerHTML +=`, pulling out `el[1]` / `el[2]` (title/response) by array index since the row is still just `[id, title, content, response, category, status]`.

## What the frames add
Frames closely track the transcript: sheet layout with headers ([00:01:45]-[00:03:00]), the Apps Script editor writing `tester()` then `doGet()` line by line ([00:06:00]-[00:12:00]), the Google OAuth consent dialogs in full ([00:08:00]-[00:08:45] — good to show kids exactly what this looks like so it's not scary), the Deploy dialog with "Execute as / Who has access" fields visible ([00:12:45]-[00:13:15]), and the final browser console showing the parsed array of objects and the rendered joke list on the page ([00:16:30]-[00:19:15]). The frames are a genuinely useful screen-recording of the whole deploy flow — reusable as a reference sequence in class.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Client vs server split (separate HTML/JS page fetching from a deployed Apps Script URL); a server "endpoint" as a URL that returns data; request/response cycle via `fetch`; JSON as the wire format and why `.text()` then `JSON.parse()` are both needed; deployment as a distinct, explicit publish step separate from saving code; the "execute as / who has access" permission model.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "class joke/fact API": each kid (or the class together) fills a Sheet with id/text/category/status, writes `doGet` to return it as JSON, deploys as Anyone, and a partner's separate HTML page fetches and displays it. Teaches: Sheet-as-database, JSON endpoint, and the fetch/parse/render loop — a full backend concept demo in one sitting (~45-60 min with Gemini writing the code).

### Traps a kid will hit
Forgetting to redeploy after changing code (dev URL vs `/exec` URL are different — a kid who edits and reloads the exec URL and sees no change will think it's broken); the OAuth consent screen looking scary/broken; setting "who has access" to "Only myself" and then getting a permission error from a partner's fetch; forgetting `.text()` before `JSON.parse` and getting a cryptic parse error.

### Doesn't transfer, and why
Nothing here is a dead end for our stack — it's close to the canonical pattern we want kids to learn. The one gap: this lesson still has kids write raw JS in a separate editor+live-server setup (VS Code), not inside the Apps Script HtmlService page itself; for our class the front end and the Sheets logic will more often live in the same Apps Script project (see `j8y7hRxsSww` in this batch for the HtmlService pattern).

## Honest caveats
No mention of quotas, concurrency, or what happens with many simultaneous requests — reasonable for an intro lesson but we'll need to add that ourselves later in the year. The video is polished and the pacing is fast; a 14-year-old will need it paused/rewatched, not just narrated.
