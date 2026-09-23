# How to Create Automatic Leaderboard in Google Sheets (Better Sheets, 1.2 min)

**What it is:** a pure spreadsheet-formula micro-tutorial: one function (`SORT`), no Apps Script, no web app, no login. Generic Sheets skills content, undated but evergreen (the `SORT` function is stable).
**Substance:** thin but clean: does exactly one thing and explains it correctly; nothing padded, nothing wrong.

## Ideas, in the video's order
- [0:00:00] Starting point: a column of names and a column of scores, in arbitrary order.
- [0:00:00] `=SORT(range, sort_column, ascending_boolean)` re-orders a range by any column without touching the original data — this is the entire technique.
- [0:00:00] Sort column is given as an index (2, for the 2nd column of the selected range), and `false` for ascending means descending (highest first) — a common index-off-by-one/boolean-flip trap for beginners, worth calling out (generic Sheets-syntax gotcha, not specific to this video).
- [0:00:33] Duplicates a copy of the same idea onto a second tab named "Leaderboard," pointing `SORT` at the *other* sheet's range (`=SORT(Scores!A2:B, 2, false)` in spirit) — i.e., the leaderboard tab holds no data of its own, it's 100% a live query over the input tab.
- [0:00:33] Demonstrates the "automatic" part live: editing one score in the source tab (Bart: 99) instantly updates his rank on the separate Leaderboard tab, no manual re-sort.

## What the frames add
[sheet_001.jpg] Frame-by-frame confirms the exact click sequence: select a Scores tab with Name/Score, type `=SORT(...)` in a formula bar, see the two-tab setup (Scores, Leaderboard), and watch the leaderboard tab visibly re-order after an edit (grid shows Andy/Bart/Carl/... reordering to Dale/Jack/Jane/... across consecutive 10s frames). No code, no Apps Script UI at any point — purely the Sheets grid and formula bar.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
This is the cleanest, shortest illustration in the whole batch of **a derived/computed view vs. raw stored data** — the leaderboard tab has zero of its own data, it's a live query. Directly names the same idea DJYJ5_JjBOs shows at spreadsheet scale, and is the natural "level 0" before building the same thing as an Apps Script `doGet` that computes and returns a sorted list.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Use this **as the very first 10-minute warm-up exercise**, not a project: before touching Apps Script at all, have kids build this exact two-tab `SORT()` leaderboard by hand in a blank Sheet. Then immediately ask Gemini to "write an Apps Script function that returns the scores sorted highest to first, as JSON" and compare — the formula and the script solve the identical problem two ways. Backend concept taught: **sorting/derived data**, and the bridge from "what a formula does" to "what a server function does" (both are just: take rows in, return rows out, in a different order).

### Traps a kid will hit
- `SORT`'s column index is relative to the *range you selected*, not the sheet's absolute column letters — a very common off-by-one error a kid (or Gemini, if it writes an equivalent script) will make when the range doesn't start at column A.
- Nothing about concurrency, permissions, or deployment — those don't exist in this scope, so a kid could wrongly assume a "leaderboard" is always this simple; the real project (below) needs to add write access, multiple contributors, and a public view, none of which this video addresses.

### Doesn't transfer, and why
No Apps Script, no web app, no multi-user writes — it's a single-sheet, single-editor exercise. Fine as a stepping stone, not a project on its own.

## Honest caveats
Extremely short and narrow by design — evaluate it as a formula-syntax reference, not course content. Nothing here about AI-assisted building since there's no code to generate.
