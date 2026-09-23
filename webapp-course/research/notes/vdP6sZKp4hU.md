# Google Apps Script Search Sheet: Get cell data with Google Sheets, select column data or entire sheet (Laurence Svekis, 11.0 min)

**What it is:** A server-side-only Sheets coding tutorial — no web app, no doGet/doPost, no HTML at all. Builds a custom search function over spreadsheet data using a hand-written `Array.prototype` extension.
**Substance:** mixed: technically solid array/search logic, but it is Sheets data-wrangling, not a web-app or client/server lesson — closer to a plain JavaScript exercise than to this batch's stated focus.

## Ideas, in the video's order
- [0:01:44]–[0:02:51] `sheet.getDataRange().getValues()` vs `sheet.getRange(startRow, col, numRows).getValues()` — full-sheet read vs a targeted range/column read; a real, reusable distinction for anyone querying a big Sheet efficiently (generic Sheets API knowledge, not web-app specific).
- [0:06:11]–[0:07:52] Adds a custom `Array.prototype.finder = function(val) {...}` that loops the array and returns the row index of the first match, or `-1` — teaches prototype extension in JS, a moderately advanced concept for 14-year-olds (touches "everything is an object," "you can add your own methods").
- [0:08:59] Off-by-one note: because the search started at row 2 (skipping headers), the returned index doesn't line up with the actual spreadsheet row — needs a manual `+1`/`+2` correction, called out explicitly on screen.
- [0:09:32]–[0:10:37] Extends `finder` to collect *all* matching rows into an array (via `.push`) instead of returning just the first match — a natural "find one vs find all" lesson.

## What the frames add
Nothing beyond code — every frame is the Apps Script editor or the plain spreadsheet with sample string data ("test", numbers). No web app UI, no diagrams, no before/after visuals; talking-through-code only.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Not really a backend/client-server concept — this is "how do I search an array/Sheet efficiently," which is server-side logic that *could* live inside a doGet/doPost handler, but the video never wires it to a web app.
- Row-index vs displayed-row-number mismatches when skipping header rows — a genuinely useful practical gotcha for any Sheets-backed feature (leaderboards, search-by-name, etc.).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Only as a component inside a bigger project: e.g. "search my class roster Sheet by name and return that student's score" — the finder logic here is a reasonable building block for such a feature, but it needs to be wrapped in a doGet/doPost (as shown in other videos in this batch) to actually become a web app feature. Not a project on its own.

### Traps a kid will hit
- Off-by-one errors from skipping header rows (video hits this itself).
- Reassigning/extending built-in prototypes (`Array.prototype`) is a slightly risky pattern to teach 14-year-olds without a warning — it can silently affect all arrays in the whole project, including ones written by Gemini's generated code, causing confusing bugs elsewhere.

### Doesn't transfer, and why
This video has little to do with web apps specifically — it's a Sheets/JavaScript array-searching exercise with no doGet, doPost, ContentService, or client/server transfer at all. Per the brief: flag plainly that this is NOT a web-app video, just Sheets scripting that happens to be useful as a helper function inside one.

## Honest caveats
The custom `Array.prototype.finder` pattern is clever but non-standard; a simpler, more teachable approach for 14-year-olds would be `data.findIndex(row => row[col] === searchVal)` (built into modern JS) rather than hand-rolling a prototype method — worth having Gemini use the standard method instead when this pattern comes up in class.
