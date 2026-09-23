# Sheets Custom Modal SideBar with Client Server code interactions Apps Script UI Menu SideMenu (Laurence Svekis, 26.3 min)

**What it is:** tutorial, live coding in Apps Script editor, building on the previous alert/prompt video's menu. Current Apps Script UI.

**Substance:** substantive and the most directly relevant video in the batch for "client/server communication," even though it's still Sheets-bound (modals/sidebars, not a deployed web app with a URL). This is the clearest, most complete demo of `google.script.run` in the batch.

## Ideas, in the video's order
- [0:00:00] Frames the lesson explicitly as modal vs modal-less vs sidebar, and "client side to server side" interaction — good explicit vocabulary.
- [0:04:53] An HTML file is a separate object in the project; `HtmlService.createHtmlOutputFromFile('name')` turns it into displayable output — the "compile a file into output" step, worth explaining plainly to kids as "the server prepares a page, then hands it to the UI to show."
- [0:06:03] `ui.showModalDialog(html, title)` vs `ui.showModelessDialog(...)`: modal grays out and blocks the sheet; modal-less lets you keep clicking cells — a concrete, visual distinction of blocking vs non-blocking UI.
- [0:06:35] First run triggers Google's OAuth consent screen ("Google hasn't verified this app") — shown on screen with the real warning text. Good real teaching moment: authorization is a wall every kid's script hits on first execution.
- [0:11:01] `showSidebar(html)` — persistent right-hand panel, alternative to a popup.
- [0:11:33] Notes `showDialog` is deprecated in favor of `showModelessDialog` — small outdated/deprecated-API flag, useful to avoid teaching a dead API.
- [0:12:07] `html.setHeight(px)` / `.setWidth(px)` on the HtmlOutput object — sizing popups.
- [0:13:46] `HtmlService.createHtmlOutput(rawHtmlString)` as an alternative to loading from a file — building HTML output directly from a string, not just a file.
- [0:14:53] Client-side button wired with `google.script.host.close()` — the frontend can tell the host (the dialog chrome) to close itself. Introduces `google.script.host` as the "talk to the dialog shell" API, distinct from `google.script.run` (talk to the server).
- [0:19:48] `google.script.run.run1(value)` — the core client→server call. Explicitly says: "this runs a script on the server side" and passes a JS value as an argument.
- [0:21:31] `google.script.run.withSuccessHandler(success).getData()` — adds a callback for the return value; frames it as "once we get a successful callback we can do something with the code." This is the async pattern kids need to internalize (no return value; you get a callback).
- [0:23:15] Server function `getData()` reads `SpreadsheetApp.getActiveSheet().getDataRange().getValues()` and returns the raw array — the read side of Sheets-as-database, inside a client-triggered call rather than a page load.
- [0:23:48] Client `success(data)` callback receives the array and does `data.forEach(row => row.forEach(cell => ...))` to build an HTML table string, then sets `output.innerHTML` — full round trip demoed end-to-end.
- [0:25:27] Explicitly states: change the spreadsheet, click again, get updated content — i.e., no caching, always live. Good one-line explanation of "hitting the database live" for kids.

## What the frames add
Very code-heavy — nearly every frame after 00:03:00 shows real Apps Script/HTML/JS source, legible at zoom. Frames [0:06:45]-[0:07:45] show the actual Google OAuth "hasn't verified this app" consent flow (useful to show kids exactly what they'll see and reassure them it's normal for a self-made app). Frames [0:08:45], [0:13:15] show the rendered modal ("My Modal") and sidebar over the spreadsheet, i.e., what the different popup styles actually look like next to each other. Frame [0:25:30]-[0:25:45] shows the final "Client Side to Server Side" panel with Adder/Invoke/Data buttons and a live-rendered table pulled from the sheet — a good "final result" screenshot to reuse when explaining the concept to the class.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- The clearest available explanation in this batch of the client/server split within Apps Script: HTML+JS running in the dialog/sidebar is "the client," `.gs` functions are "the server," and `google.script.run` is the bridge between them.
- Async callbacks: `withSuccessHandler()` demonstrated concretely as "the response comes back later, not right away" — this is the same mental model kids will need for `fetch().then()` later in the year when the frontend moves to Netlify.
- Read-only "live" data flow: client asks, server reads the Sheet fresh every time, no caching — a simple, correct mental model of a database read.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- "Click-to-load class data" mini-project: a Sheets sidebar with a button that calls `google.script.run.getData()` and renders a table from a class roster sheet. Direct copy of the video's loader/success pattern, swapping the demo data for something like a class scoreboard. Teaches: `google.script.run`, success handlers, building HTML from an array.
- Small add-on: a sidebar "counter" (Adder button, [0:19:14]) as a zero-risk first exercise before doing any server call at all — purely client-side JS DOM updates, good day-1 warm-up before introducing `google.script.run`.

### Traps a kid will hit
- [0:06:35] OAuth consent screen wording ("Google hasn't verified this app") reads as scary/broken to a first-time user — worth pre-empting explicitly in class so kids don't think they did something wrong.
- Mixing up `google.script.host` (talk to the dialog shell, e.g. `.close()`) with `google.script.run` (talk to the server) — same-looking API, different target, easy to confuse.
- [0:23:19] Every code change to `.gs` or the HTML file needs a save and a fresh run/reopen of the dialog — the video repeatedly re-runs `onOpen` to refresh the menu; a kid who edits code and just refreshes the sheet won't see updates, a common "why isn't my change showing" trap tied to this bound-script/menu model (deployment-version traps proper only show up in the doGet/web-app videos elsewhere in the batch).
- Callback-based flow means code after `google.script.run.X()` does NOT wait for the result — a kid writing code that assumes synchronous return will get `undefined` used before the callback ever fires.

### Doesn't transfer, and why
- This is still all inside the Sheets UI (modal/sidebar), not a deployed, URL-addressable web app — there's no `doGet`, no public URL, no separate frontend hosting. The `google.script.run` mechanism itself is Sheets/Docs-add-on-only and does NOT carry over to the class's planned final-project architecture (Netlify frontend + Apps Script `doPost` JSON API) — that will need `fetch()`/CORS instead, a genuinely different mechanism that only superficially resembles this one (both are "async call, then handle the response").

## Honest caveats
No dates/version flags beyond the one explicit "deprecated" callout ([0:11:33] `showDialog`). Nothing promo, no padding — a working, focused tutorial. The one thing to correct when reusing this material: don't let kids think `google.script.run` is the same mechanism they'll use for the Netlify final project; it looks similar but is a different API family (bound-script only, no CORS, no URL).
