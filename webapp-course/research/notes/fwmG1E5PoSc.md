# SheetData Copy: Apps Script SpreadsheetApp copyTo Coding Examples (Laurence Svekis, 21.8 min)

**What it is:** an Apps Script tutorial on the `Range.copyTo()` and `Sheet.copyTo()` family of methods — duplicating sheets, copying ranges within/between sheets, and copying with contentsOnly/formatOnly options. No web app, no `doGet`, no JSON, no fetch — this is Sheets automation, not web-app backend content.
**Substance:** substantive for what it is (a real, methodical tour of a specific API surface), but clearly off-topic for "what is a backend/API" — flagging plainly per the brief, this is squarely in the "little to do with web apps" bucket.

## Ideas, in the video's order
- [0:00:00] Demos up front: duplicate a whole sheet, copy only formatting (colors/styling) between sheets, copy only content (strip formatting), copy specific row/column ranges into a brand-new sheet, and copy within the same sheet to a different column range.
- [0:03:58] `SpreadsheetApp.getActiveSpreadsheet()` + `getSheetByName('Sheet1')` + `.copyTo(spreadsheetObject)` — duplicates the *entire sheet* into a brand-new spreadsheet, with `.setName(...)` and `.activate()` chained on the result.
- [0:07:11] `getSheets()` returns all sheets as an array (0-indexed, "sheets are like arrays"); loops it with `forEach` to log every sheet name — small reusable pattern for "list everything in this spreadsheet."
- [0:09:25] `sourceSheet.getRange('A:B')` -> `.copyTo(destinationRangeObject)` copies a whole column-range's contents+formatting to a different location within the same sheet.
- [0:12:11] `sheet1.getDataRange()` -> `.copyTo(sheet2)` copies the full used range from one sheet to another named sheet — different from the earlier whole-sheet duplication, this copies *into* an existing sheet.
- [0:15:02] `copyTo(dest, {contentsOnly: true})` vs `copyTo(dest, {formatOnly: true})` demoed side by side — content-only strips styling/formulas, format-only strips values but keeps colors — a clean, concrete illustration of an options-object parameter pattern (passing a config object as a second argument), which is a genuinely transferable JS pattern beyond just this API.
- [0:17:46]-[0:20:36] Builds a precise partial copy: `sourceSheet.getRange(row, col, numRows, numCols)` to select just the first 3 rows/4 columns, then `insertSheet().setName(...)` to create the destination, hits a live error (ranges not matching) and fixes it by using `getDataRange()` on the destination instead of a mismatched manual range.

## What the frames add
Frames mostly show the Apps Script editor and Sheets data side by side as ranges get copied ([0:00:15]-[0:02:00], [0:13:00]-[0:20:00]) — functional confirmation of each copy operation, colors and all, but nothing conceptually new beyond the transcript. No diagrams; pure code+spreadsheet screen recording throughout all 21+ minutes.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Options-object parameters (`{contentsOnly: true}`) as a pattern for configuring a function call — transferable idea beyond Sheets; otherwise this is Sheets-specific data-management automation (archiving, templating, duplicating), not client/server/API concepts.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
An "archive this week's data" utility: copy the current week's sheet to a dated, contents-only backup sheet with one button/menu action — a nice small admin feature to bolt onto a bigger project (e.g. weekly-reset poll app) later in the year, but not standalone "what is an API" content.

### Traps a kid will hit
Mismatched source/destination range sizes throwing errors (demonstrated live and fixed); confusing whole-sheet `.copyTo(spreadsheet)` (creates a new duplicate sheet) with range `.copyTo(range)` (copies into an existing location) — same method name, different behavior depending on what's passed in, genuinely confusing for a beginner.

### Doesn't transfer, and why
Zero web-app/API content: no `doGet`, no deployment, no client, no JSON. This is server-side (Apps-Script-side) spreadsheet bookkeeping only. Useful later as a "the backend also does housekeeping on its own data" side note, but should not be used to teach "what is a backend/API" — it teaches the opposite half (data admin, not client-server communication).

## Honest caveats
Well-made and clearly explained for its actual topic (sheet-to-sheet copying), but per the batch's assigned lens (judging API/web-app clarity), this is a clear miss — should be explicitly called out to Ben as "not about web apps" if it comes up in planning.
