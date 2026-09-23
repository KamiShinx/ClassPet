# Google Apps Script Lesson: SpreadsheetApp Class Cell Data and Conditions (Laurence Svekis, 12.9 min)

**What it is:** Apps Script tutorial on scanning a sheet's cells, applying a condition, and styling matching cells (background/font color/size). No web app, no `doGet`, no fetch, no JSON — pure server-side spreadsheet scripting run from the Apps Script editor's Run button.
**Substance:** substantive for what it is, but it is NOT a web-app/API video. Flagging plainly per the brief: this is spreadsheet automation, not "what is a backend" content.

## Ideas, in the video's order
- [0:00:00] Demo up front: find every cell equal to 5, color its background purple, font white, size 16 — and shows changing the target number (5 -> 6) re-runs the scan.
- [0:01:40] `SpreadsheetApp.getActiveSpreadsheet()` (bound script, no id needed) then `.getSheetByName('test')`.
- [0:03:51] `getDataRange().getValues()` returns the classic nested array; explicitly notes it auto-selects the full rectangular block with data, including blank cells in between filled ones.
- [0:06:04] `data.forEach((rowArr, rowIndex) => ...)` then a *nested* `rowArr.forEach((cell, colIndex) => ...)` — this is the clean two-level loop pattern for walking a 2D sheet array, well explained with the index values called out separately from the data values.
- [0:07:45] Applies a condition (`if (cell == 5)`) inside the nested loop and logs the matching row index — a direct, concrete "find matching rows" pattern.
- [0:08:53] Converts array indices back to sheet coordinates: `sheet.getRange(rowIndex + 1, colIndex + 1)` — explicitly explains the off-by-one because arrays are 0-based but sheet rows/columns are 1-based. This exact bug class (0- vs 1-based indexing) is worth calling out on its own, it will bite kids repeatedly.
- [0:09:58] Once a `Range` is selected: `.setBackground('red')`, `.setFontColor('white')`, `.setFontSize(16)` chained onto the returned range object.
- [0:12:08] Clean recap at the end restating the whole pipeline: active spreadsheet -> named sheet -> all values -> loop rows -> loop cells -> match condition -> convert indices -> get range -> style it. Good as a spoken summary to reuse verbatim with kids.

## What the frames add
Frames show live before/after coloring in the spreadsheet itself ([0:00:30], [0:09:45]-[0:11:00] — purple/blue/green background changes visible), and the execution log output of the nested arrays ([0:04:45]-[0:05:15]) which makes the "array of row-arrays" shape concrete rather than abstract. Also shows Apps Script autocomplete suggestions (rowArr, rowIndex, RangeError) which is mildly useful as "this is what autocomplete looks like," nothing more.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Reading structured data (2D arrays) server-side; nested loops over rows and columns; conditionals to filter/match data; the general idea that "the backend" can read AND write back to the data store (Sheets) based on logic — a genuine backend behavior, just without any web/HTTP layer attached.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "highlighter" mini-exercise: scan a class attendance or score sheet and auto-color rows above/below a threshold (e.g. highlight all scores under 60 red). Good 20-30 minute warm-up exercise for teaching loops+conditionals+Sheets before ever introducing `doGet`/web apps — a nice "backend logic without a frontend yet" stepping stone.

### Traps a kid will hit
The 0-based array index vs 1-based sheet row/column mismatch (explicitly the main bug in the video itself); assuming `getDataRange()` stops at the last non-empty row when actually one stray value far down pulls the whole range down with it (mentioned at [0:03:51]-[0:04:24]); confusing "the array index of a match" with "the actual sheet row number."

### Doesn't transfer, and why
No web app, no API, no JSON, no fetch, no deployment — entirely irrelevant to "what is a backend/API" for a 14-year-old building a web app. Useful only as an earlier building block for data-manipulation logic, not as API-explainer material. Don't count this video toward the class's "what is an API" goal.

## Honest caveats
None of the concerns above are outdated — this is current Apps Script (SpreadsheetApp.getRange/setBackground etc still work exactly like this). The caveat is purely about topical fit: this is Sheets scripting, not web-app backend content.
