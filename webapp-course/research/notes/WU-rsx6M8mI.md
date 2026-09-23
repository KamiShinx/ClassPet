# Google Sheets Data EndPoint AJAX Web page: Data from Google Sheets as JSON (Laurence Svekis, 34 min)

**What it is:** live-build tutorial: a public Google Sheet published to the web, queried from a plain HTML/JS page via `fetch`, cleaned into JSON, and rendered as a colored table. No Apps Script backend at all — the "server" is Google's own gviz endpoint.
**Substance:** substantive: the longest, most hands-on API/data-wrangling lesson in the batch, with real live bugs and fixes on screen throughout.

## Ideas, in the video's order
- [0:00:00]-[0:01:04] Demo: edit the spreadsheet, refresh the web page, the page reflects the change — establishes "the spreadsheet IS the live data source" before any code.
- [0:02:40]-[0:03:46] File → Publish to the web, **and** separately set sharing to "Anyone with the link" as Viewer — the video flags this distinction explicitly: publishing alone shows a page, but the API needs link-sharing permission too. A real, useful nuance most kids/AIs will miss.
- [0:04:50]-[0:05:23] Constructs the gviz endpoint URL by hand: `https://docs.google.com/spreadsheets/d/<id>/gviz/tq?tqx=out:json&tq=<query>` — good concrete example of "a URL is a configurable request."
- [0:05:58]-[0:07:06] Shows the `tq` parameter works like a SQL `SELECT` query against the sheet, and `tqx=out:csv` vs `out:json` change the response format — a real, reusable "query language over a spreadsheet" concept.
- [0:10:59]-[0:12:41] Live discovery that the JSON response is **not valid JSON** — it's wrapped in `google.visualization.Query.setResponse(...)` — and has to be string-replaced/sliced before `JSON.parse` works. This exact trap (and fragile fix) recurs across this whole channel's gviz-based videos (see also batch S2's notes on `CtLRDP0jLNc`/`aP2cM7EuLeo`).
- [0:13:07]-[0:15:23] Debugs the replace chain live across several failed attempts (extra trailing bracket, `undefined` appearing) — an unusually honest, drawn-out real-time debugging sequence, good raw material for "here's what actually happens when cleaning messy data."
- [0:16:32]-[0:19:49] Parses the cleaned object's `table.rows`/`table.cols` structure: each cell is `{v: value}` or `null`; loops with nested `forEach`, filtering out `null` cells — teaches "the shape of a real API response you didn't design" rather than a toy example.
- [0:19:49]-[0:22:04] Extra nuance: headers/column labels come from a **separate** `columns` array, not the rows — data and labels are two different things sitting in the same JSON payload; a good "don't assume a flat structure" lesson.
- [0:26:38]-[0:28:58] Builds the DOM output from scratch: `createElement('div')`, nested `createElement('span')` per cell, `appendChild` — plain-JS DOM building, no framework, a good baseline before any UI library.
- [0:30:43]-[0:32:24] Conditional styling from data: reads a boolean column (`vals[3] === 'true'`... actually string `'TRUE'`/`'FALSE'` from Sheets) and sets `main.style.backgroundColor` green/red accordingly — nice concrete "data drives UI" moment.

## What the frames add
Frames confirm every step is live-coded with real console errors shown (`Uncaught SyntaxError: Unexpected token`) at [0:13:30]-[0:15:00], the raw messy JSON printed to console before cleanup, and the final colored table matching the spreadsheet's true/false values side by side. The sharing-permission dialogs (Get link, Anyone with the link, Viewer) are shown explicitly around [0:02:45]-[0:03:45] — useful as a "this is literally the checkbox to click" reference.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
A URL as a configurable request (query strings); a response that must be parsed/cleaned before use; the idea that "an API" doesn't have to be code you wrote — Google's own gviz service is treated as a read-only API; CSV vs JSON as two response shapes for the same data; DOM rendering of fetched data.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**Zero-backend class data viewer**: publish a class Sheet (e.g. sign-ups, scores, a poll's results) to the web, fetch it via gviz `tq`, render as a styled list/table with conditional colors. *Teaches: request/response, JSON cleanup, DOM building, data-driven styling.* Good FIRST project before introducing a real Apps Script `doGet` backend, since it needs zero deployment — but must be paired with a real backend lesson afterward so kids don't conclude "APIs = public spreadsheets" (this gviz approach is read-only and requires the sheet to be link-shared, which is a real privacy tradeoff worth discussing explicitly).

### Traps a kid will hit
The gviz response isn't valid JSON out of the box — needs a string-replace hack that will silently break if Google ever changes the wrapper text (the video's own multi-minute live struggle is the best evidence for this in the whole batch). Confusing "Publish to the web" (view a page) with "Share: anyone with the link" (API access) — two separate settings that both have to be set. Cell values coming back as `null` for blanks and needing explicit guards. Headers not being in the rows array — a kid who doesn't inspect the raw response will hard-code wrong column indices.

### Doesn't transfer, and why
Because there's no Apps Script backend at all here, this teaches nothing about `doGet`/`doPost`, deployment, or write access — it's read-only and public by design. Don't let this be a kid's only mental model of "a backend"; contrast explicitly against a real `doGet` JSON API lesson (none in this batch, but standard on this channel — see batch S2 notes for `8YhwarXcPeU`/`fqQOdkwBr9E`).

## Honest caveats
Long (34 min) with a lot of real-time backtracking during the JSON-cleanup section — good raw honesty but should be shown as an edited highlight reel to a class, not full length. The sharing settings shown (2026-era Google Drive sharing UI) look current, not outdated.
