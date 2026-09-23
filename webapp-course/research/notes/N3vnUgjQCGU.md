# Apps Script Web App as Get and Post endpoint for JavaScript Google Apps Script Coding Example (Laurence Svekis, 30.3 min)

**What it is:** Tutorial, modern editor UI (Chrome, VS Code + Live Server, ~2022-era). Builds a Google Apps Script web app that serves `doGet`/`doPost` as a JSON API, then builds a **separate, external** plain HTML/JS page that calls it with `fetch`. This is the closest match in the whole research set to the final-project architecture (Netlify frontend -> Apps Script backend).
**Substance:** substantive: covers the full loop - deploy, test URL, query params, JSON responses, reading from a Sheet, and a real external page making GET and POST fetch calls to the deployed `/exec` URL, with the differences between the two methods shown live.

## Ideas, in the video's order
- [0:00:00] Framing: a web app deployment gives you a URL you can `fetch()` from any external JavaScript, both GET and POST, and vary the response by query-string parameter.
- [0:01:40] `doGet(e)` is the entry point; must `return ContentService.createTextOutput(...)` - no return = "script completed but did not return anything" (shown as an actual error at [sheet_005 @18:15]).
- [0:03:21] Deploy > New deployment > Web app > "Execute as" + "Who has access: Anyone" - the exact setting a kid must pick to let an external page (Netlify) call the endpoint without login.
- [0:03:53] The deployed `/exec` URL stays fixed across code edits **only if you redeploy** (or use the dev "Test deployments" URL while iterating) - a real trap: kids will edit code and wonder why nothing changed because they're hitting the stale deployed version, not the dev URL. Explicitly called out as "one of the best ways to develop."
- [0:05:05] `JSON.stringify(e)` dumped straight into the response - excellent, simple way to let a kid SEE what `e.parameter`/`e.parameters` actually contain, live, in the browser. Good classroom trick for demystifying the request object.
- [0:06:05] `.setMimeType(ContentService.MimeType.JSON)` chained onto `createTextOutput` - required for the client to receive real JSON, not just a JSON-shaped string.
- [0:07:10] Server-side data can be a hardcoded array/object (demo) or pulled live via `SpreadsheetApp...getDataRange().getValues()` - i.e. the Sheet is the live database behind the endpoint.
- [0:11:35] `e.parameter.type` (singular) = the first/only value for a key; `e.parameters.type` (plural) = an array, for when the same key repeats in the query string. Worth teaching explicitly since kids will hit both forms in Gemini's generated code.
- [0:13:46] Branches the response on `?type=1/2/3` using `if/else if`, each returning different shaped data (sheet rows vs hardcoded object vs "nothing found") - a simple mental model for "the same URL, different query = different data," i.e. a tiny REST-ish API.
- [0:17:30 - 0:18:08] **Do `doPost` need its own `return`?** Yes - author initially forgot the return in doPost, got nothing back, and had to add it; refactors both into one shared `output(e)` helper called from both `doGet` and `doPost`. Good concrete "why do these look almost identical" moment.
- [0:18:44] Cuts to VS Code + a local `index.html` opened with the Live Server extension - i.e. an **external, non-Apps-Script page** on `localhost`, calling the deployed `/exec` URL. This is structurally identical to "Netlify page calls Apps Script backend."
- [0:22:34-0:23:41] Plain `fetch(url1).then(res => res.json()).then(data => ...)` GET call, output changes live as the `type` query param changes - exactly the fetch pattern the final project needs.
- [0:25:15] POST version: `fetch(url1, {method:'POST', body: formData})` using a `FormData` object (not JSON body) - `e.parameter`/`e.parameters` on the Apps Script side still populate the same way from FormData as from a GET query string.
- [0:27:15] Confirms: query-string params on the URL **still work even on a POST request** (`type=3` from the URL was read inside `doPost`) - i.e. GET-style query params and POST body params are both available in `e` simultaneously. Worth flagging as a subtlety, not obvious to a beginner.
- [0:29:16] Direct, if vague, troubleshooting claim: "develop with doGet first ... a lot of times this will avoid the problems when you're getting the CORS issue... CORS typically is something with the code, it can also be permissions." No concrete CORS fix or error is actually shown or reproduced in this video - the external fetch calls all just worked. Treat this line as anecdotal, not a real CORS walkthrough (see caveats).

## What the frames add
Confirms the whole path end to end: query-string test URLs typed directly into the deployed URL bar [sheet_006 @16:30, sheet_007 @17:15], a real two-pane VS Code + Chrome DevTools setup with the external `index.html`/`app.js` files and the live `fetch` console output [sheet_007 @19:15 onward, sheet_008 throughout] - this is the only video in the batch that visually shows a genuinely separate frontend page (not `HtmlService`) talking to a deployed Apps Script endpoint. Console panel shows the actual JSON responses for GET vs POST side by side [sheet_008 @28:00-28:45], including `data.type` echoing back which method was used.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Client/server boundary made concrete: a separate HTML/JS page (stand-in for the eventual Netlify page) calling a deployed Apps Script URL over `fetch`, with GET query strings vs POST body, and JSON as the wire format both ways. Also: dev-URL vs deployed-URL distinction, and the request object `e` shape.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
"Two-file experiment," directly reusable as a milestone before the final project: kids deploy a `doGet`/`doPost` that reads a class Sheet (e.g. a poll or leaderboard) and returns JSON; then build a *separate* local `index.html` (can even be opened straight from disk, or Live Server, no Netlify needed yet) that fetches it and displays the data. This is the natural rehearsal for "Netlify frontend calls Apps Script backend" and should probably run 1-2 sessions before the final project starts, per CONTEXT.md's plan to move the frontend off Apps Script.

### Traps a kid will hit
Forgetting to redeploy after editing code and testing against a stale `/exec` URL (a version of the "AI nukes/reverts a working project" problem, but self-inflicted by the deploy model itself - very likely to bite in this class); forgetting `return` in `doGet`/`doPost` (silent empty response, confusing for a beginner); mixing up `e.parameter` vs `e.parameters`; setting deployment access to "Only myself" instead of "Anyone" and then not understanding why the external page's fetch fails.

### Doesn't transfer, and why
None of the JSON/database branching logic (`type=1/2/3`) is teen-project-shaped as shown (it's a generic demo, not a real app feature) - use it only as a syntax example, not a project template.

## Honest caveats
The CORS claim at [0:29:16] is asserted, not demonstrated - the video never triggers or fixes an actual CORS error, so it should not be treated as proof that Apps Script web apps are CORS-safe by default; flag for the class that CORS behavior with `fetch` against `script.google.com/.../exec` should be verified directly against 2026 Apps Script/Chrome behavior before the final project, not assumed from this video. The video's "GET vs POST" client code is otherwise clean and directly reusable.
