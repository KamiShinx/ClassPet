# Google Apps Script Code Example: Create custom functions, Docs/Sheets (Laurence Svekis, 12 min)

**What it is:** tutorial building a "remove duplicate rows" tool triggered from a custom Sheets UI menu item. Pure Sheets automation.
**Substance:** substantive for what it is, but it has little to do with web apps — say so plainly: this is server-side array/Sheets logic with a spreadsheet menu trigger, no HTML frontend, no `doGet`/`doPost`, no client-server request at all.

## Ideas, in the video's order
- [0:00:00] Demo: a custom menu item runs a script that dedupes rows across the active sheet.
- [0:02:12]-[0:03:17] `SpreadsheetApp.getActiveSheet()` + `getDataRange().getValues()` returns the whole sheet as a 2D array — a clean, reusable explanation of "sheet as data" for any Sheets-backed project (generic technique, not web-specific).
- [0:04:54]-[0:07:05] Builds the dedupe algorithm manually: loop rows, `.join(',')` each row to compare as a string, track a boolean flag, push unique rows into a new array. This is real algorithmic thinking (a boolean-flag inner-loop pattern), not just API calls — decent for teaching "compare complex data by turning it into a string key," but somewhat advanced/fiddly for a first pass.
- [0:08:42]-[0:09:50] Writing back: `sheet.clearContents()` then `getRange(1,1,rows,cols).setValues(dataClean)` — the standard "read all, transform, write all back" Sheets pattern.
- [0:10:23]-[0:11:27] Wires the function into `onOpen()` + `SpreadsheetApp.getUi().createMenu(...).addItem(...).addToUi()` — the standard custom-menu recipe, identical to what's taught in `TW5ZFyo0FwI` and `N5N2oyF4Ok4`/`yBX6E-6YUz8` in this same batch (recurring boilerplate across the channel).

## What the frames add
Frames show the actual spreadsheet with duplicate rows highlighted, the Apps Script editor typing the loop logic, the accepted OAuth permission screen (edit access to the sheet), and the final deduped result. Nothing beyond what the transcript already describes — no diagrams.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Server-side data transformation (read all rows, process in memory, write back); custom UI menu wiring (`onOpen` + `createMenu`); a taste of algorithmic thinking (string-keyed dedup) done without any built-in Sheets function.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**Cleanup utility for a class roster sheet** — menu button that removes duplicate sign-ups/entries. *Teaches: reading/writing whole ranges, basic array algorithms, custom menus.* Minor, not a flagship project — good as a short warm-up exercise on "server code that transforms data," not as a milestone.

### Traps a kid will hit
Off-by-one between 0-indexed array vs 1-indexed sheet rows/columns when constructing `getRange(1,1,...)` — the classic Sheets/array indexing trap that recurs across this whole channel. `clearContents()` wiping the sheet before the new data is confirmed correct — a "the AI just deleted everything" risk if a kid tests carelessly; worth calling out under CONTEXT.md's "AI breaking working code" theme, since a weak model regenerating this function could easily clear the sheet without writing valid replacement data back, silently emptying a project's spreadsheet.

### Doesn't transfer, and why
No client/server request-response boundary, no `doGet`/`doPost`, no HTML page — none of "what is a backend" (client vs server, HTTP request) is demonstrated. Purely a bound script with a UI trigger, so as a "concept explainer" for what a backend is, this is off-target. Useful only as a small Sheets-scripting exercise.

## Honest caveats
Correctly categorized as Docs/Sheets automation with little to do with web apps, per the brief. No outdated APIs; legacy editor toggle visible but not discussed.
