# Google Apps Script Search Sheet: custom UI menu item to invoke a search (Laurence Svekis, 11 min)

**What it is:** tutorial building a search function over spreadsheet data, triggered via manual "Run" (menu wiring is described but not the focus). Pure Sheets/array-logic automation, little to do with web apps.
**Substance:** substantive for its scope — a real algorithmic exercise (extending `Array.prototype`) — but entirely server-side script logic, no frontend, no HTTP.

## Ideas, in the video's order
- [0:00:33]-[0:02:18] Standard data pull: `getActiveSheet()` → `getDataRange().getValues()`, with an aside on restricting to a specific column/range via `getRange(startRow, col, numRows, numCols)` — useful concrete range-addressing example.
- [0:03:26]-[0:04:32] Deliberately skips the header row by starting the range at row 2, and uses `getLastRow()` to size the range dynamically instead of hardcoding row counts — a good "don't hardcode array bounds" habit.
- [0:05:39]-[0:07:52] Core technique: extends `Array.prototype.finder = function(val) {...}` to add a custom search method directly onto arrays, looping with `indexOf` on each stringified row. Teaches prototypal extension, a genuinely intermediate-to-advanced JS concept — worth flagging as **not beginner-friendly**; interesting for a stronger kid, likely to confuse a weaker one if presented without simplification.
- [0:08:25]-[0:09:32] Returns just the first match (`return i`) initially, then the video points out this only returns the first row and one match, not all.
- [0:09:32]-[0:10:37] Extends it to return **all** matching rows by pushing indices into an array instead of returning on first hit — reinforces "return early" vs "collect results" as two different loop patterns.
- [0:10:05]-[0:10:37] Off-by-two nuance: since the search started at row 2 and the array is 0-indexed, the real sheet row = array index + 2 — a very concrete demonstration of index math errors.

## What the frames add
Frames show the spreadsheet with sample "test" strings, the Apps Script editor building the prototype function, and Logger output showing raw match indices — nothing beyond what the transcript describes; no diagrams or UI beyond the code editor and Logger panel.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Range addressing with explicit start row/col/counts; treating a whole column/sheet as a searchable array; the general idea of writing a custom function to answer a question about server-held data (a primitive form of "search" before any real backend API is introduced).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**"Find my entry" tool** — search a class roster or log sheet for a name/keyword and log matching rows. *Teaches: range addressing, looping/searching arrays, index math.* Small exercise, not a milestone; better framed as a warm-up for later building a real search **endpoint** (a `doGet(e)` that takes `?q=...` and returns matches as JSON) — this video stops short of exposing the search as a web request at all.

### Traps a kid will hit
0-indexed array vs 1-indexed sheet row math (index+2 in this example) — a recurring trap across this whole channel/batch (also seen in `OuchTYb0vYY`). Modifying `Array.prototype` globally is a code smell a kid copying this pattern into a larger project could accidentally apply everywhere arrays are used — worth a caution rather than teaching as the default technique; a plain helper function achieves the same result more safely and is easier for a weak AI to reason about without side effects.

### Doesn't transfer, and why
No web request/response anywhere — it's a script run manually or from a menu, not a deployed `doGet` endpoint. Doesn't touch client/server separation, JSON, or deployment at all, so it's not useful as "what is a backend" material; it's a plain data-structures/algorithms exercise that happens to run in Apps Script.

## Honest caveats
The `Array.prototype` extension technique, while clever, is more advanced than most of what's needed for this course and could be confusing if taught as-is; if reused, simplify to a standalone `findRows(data, val)` function instead of monkey-patching the built-in Array type.
