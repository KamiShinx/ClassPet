# HTML Table from Spreadsheet Data - Apps Script Web App Tutorial Part 13 (Learn Google Sheets & Excel Spreadsheets, 25.8 min)

**What it is:** tutorial (2019), part 13. Builds a new "table" view (using this series' route/render system from Part 8) that renders an HTML `<table>` from hardcoded data first, then swaps in live Sheet data.
**Substance:** substantive: this is the clearest single explanation in the batch of "read a table from a Sheet and show it in the UI" — a concept explicitly named as a class-milestone target in the brief.

## Ideas, in the video's order
- [0:00:34]-[0:01:06] Explicitly names an alternative simpler approach (server builds the HTML string directly, like the earlier dropdown) and says he's deliberately choosing the more complex client-side-build approach instead because it's "more dynamic" — a good moment to discuss trade-offs with kids: sometimes the "simpler" way is genuinely better for a first project.
- [0:01:41]-[0:06:15] Sets up a brand-new view (`table`/`loadTable`) reusing the router/render pattern from Part 8, and a new button on the home page — concretely shows the earlier abstraction paying off on a new feature.
- [0:07:24] Grabs Materialize's example table HTML as a starting structure, then strips the hardcoded rows — again "start from the library's own demo."
- [0:09:10]-[0:09:48] Gives the table body an `id` (`table-body`) specifically so JS can target and fill it — same "elements need ids to be grabbed" lesson as earlier videos, now applied to a table.
- [0:11:35]-[0:14:37] Builds one row/cell manually with `document.createElement('tr')`, `createElement('td')`, `appendChild`, `textContent` — this is real, vanilla DOM manipulation taught step by step with no library, valuable because it is the actual mechanism behind "render data as a table," transferable to any future JS.
- [0:17:00]-[0:18:41] **Generalizes to a loop**: wraps the single hardcoded row in `data.forEach(row => ...)`, replacing hardcoded `"Apple"` with `row[0]`, `row[1]`, `row[2]` — the "hardcode once, then loop over an array" pattern appears yet again (same shape as router/render/validation videos), worth explicitly naming to kids as THE recurring move in this whole series.
- [0:18:41]-[0:19:56] Extracts the whole row-building block into `generateTable(dataArray)` — another live "notice repetition -> extract a function" refactor.
- [0:20:29]-[0:22:55] Server function `getTableData()`: computes the row count with `ws.getLastRow() - 1` (minus the header row) then `getRange(2, 1, rowCount, 3).getValues()` — concrete, correct technique for reading "all data rows, skip the header" from a Sheet, a near-universal need for any Sheets-backed project.
- [0:23:29]-[0:25:07] Final wiring: `google.script.run.withSuccessHandler(generateTable).getTableData()` on page load — the fourth time in the batch the exact same client/server round-trip shape appears (Calendar, Autocomplete, now Table), strong evidence this is THE pattern to drill with kids until automatic.

## What the frames add
Confirms table rendering progressing from a single hardcoded "Apple | 33 | 99" row, to a 3-row hardcoded array, to live Sheet data (`Jack, 55`; `Ana, 76`; `Linda, 44` matching a separate "table" tab in the spreadsheet) rendered correctly in the browser. Also shows the actual Sheet layout (id/name/price columns) side-by-side with the rendered HTML table — useful concrete before/after pairing for teaching "this cell became this table row."

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- The exact concept the brief calls out as a milestone candidate: reading a Sheet's data rows (skipping the header) and rendering them as a live-updating table in the browser.
- Vanilla DOM manipulation (`createElement`, `appendChild`, `textContent`) as the real mechanism under "displaying data," not just something a library does for you — valuable even though kids will mostly use AI-generated code, because it demystifies what that code is actually doing.
- The `getLastRow() - 1` / header-row-skipping technique is a small but load-bearing detail that recurs in almost any Sheets-as-database project.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Strong milestone candidate, as flagged in the brief**: "leaderboard / class roster / poll results table" — read a Sheet tab, render it as an HTML table on page load. This video is close to a direct blueprint for that milestone; the loop-and-render pattern (`data.forEach` building `<tr>`s) is exactly reusable.
- Natural follow-on: sortable/filterable table (click a header to reorder) as a stretch goal for stronger kids, building on this base.

### Traps a kid will hit
- Off-by-one errors in range math (`getLastRow() - 1`, `getRange(2, 1, ...)`) — a classic spot for a kid (or Gemini) to get an extra blank row or miss the last row; worth a dedicated "why minus 1, why start at row 2" explanation.
- Forgetting to set an `id` on the table body element and then wondering why `getElementById` returns `null` — recurring trap across this whole series, now specifically on a table.
- Wiring the wrong CSS/JS filenames when copy-pasting a new page's boilerplate (he hits exactly this at 0:14:43 — forgot to update `page.js`/`page-css` references to `table.js`/`table-css`) — a very plausible, very confusing-to-debug mistake for a kid duplicating a page.

### Doesn't transfer, and why
- The Materialize table CSS classes (`striped`, `highlight`) are cosmetic only; any HTML `<table>` plus basic CSS achieves the same visible result without the library.

## Honest caveats
- One of the strongest, most directly class-relevant videos in the batch, with almost no padding; recommend prioritizing this one (with Part 8 and Part 10) if only a subset of A2 can be shown in class.
