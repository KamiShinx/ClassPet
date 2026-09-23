# Spreadsheet Service (SpreadsheetApp): Automate Google Sheets Data with Workspace Apps Script Code (Laurence Svekis, 26.6 min)

**What it is:** Long code-along covering the SpreadsheetApp service broadly: creating spreadsheets, creating/naming/deleting sheets within one, multiple ways to select ranges, writing values, and a language-translation content-generation demo.
**Substance:** substantive: probably the single best "Sheets as a database" reference video in the batch, directly reinforces and extends JSrK4uHdVlQ's reading-focused lesson with the writing side.

## Ideas, in the video's order
- [0:03:15–0:04:52] `SpreadsheetApp.create(name, rows, columns)` makes a brand-new spreadsheet with a specified size; `ss.getUrl()` retrieves its link, then `Session.getActiveUser().getEmail()` + `MailApp.sendEmail(...)` emails the creator a link — same "make a Google resource, then email yourself the link" pattern seen in the Forms/Docs videos (a real recurring convention worth naming explicitly to kids as "the Svekis pattern").
- [0:06:28] Opening an existing spreadsheet by ID (extracted from its URL) via `SpreadsheetApp.openById(id)` — same open-by-id convention as Docs/Forms.
- [0:08:41–0:12:30] Adding new sheets in a loop with `ss.insertSheet()`, checking `ss.getSheetByName(name)` first to avoid duplicate-name errors (returns `null` if it doesn't exist) — a concrete "check before you create" idempotency pattern, genuinely reusable and important (naive re-running of a "create sheet" script without this check throws an error).
- [0:13:36–0:14:42] `sheet.appendRow(array)` for adding a full row at once vs. selecting `sheet.getRange(row, col)` and `.setValue()`/`.setValues()` for precise cell/range placement — two different writing strategies for two different needs (append vs. targeted update).
- [0:15:48–0:20:41] **Range dimension mismatch errors, demonstrated live and repeatedly**: `range.setValues(data)` throws "the number of columns/rows in the data does not match the number of rows/columns in the range" whenever the 2D array shape you're writing doesn't exactly match the range you selected (rows × columns). This happens multiple times on screen as the presenter iterates — a very real, very common trap.
- [0:19:02] Range can also be selected by A1-notation string (e.g. `sheet.getRange('E3')`) as an alternative to row/column numbers, and can include the sheet name in the notation (`'S6!A1:C2'`) to target a specific sheet directly.
- [0:21:12–0:23:24] Using `LanguageApp.translate(word, 'en', targetLangCode)` to generate translated content and append rows per language — a lightweight "generate varied content from one seed word via a Google service" demo, reappearing from RgXBF6KydK8 but actually applied here to build real rows of data.
- [0:23:24–0:26:09] Cleanup routine: loop over all sheets, check `sheet.getDataRange().getValues()` length/shape to detect "empty" sheets (length <= 1, i.e. nothing but a blank first cell), log their names, then delete them with `ss.deleteSheet(sheet)` — a practical "garbage collect empty structure" utility, and running it twice shows it's safe/idempotent (nothing left to delete the second time).

## What the frames add
Frames show the actual multi-sheet spreadsheet with S1-S10 tabs being created and some pre-existing ones (S6/S7) being correctly skipped, the OAuth "SpreadsheetApp test wants to access your Google Account" consent dialog (same pattern as every other video), the live range-mismatch error text in the Execution log ("the number of columns in the data does not match the number of columns in the range... data has 2 but range has..."), and the final S7 sheet filled with English/Spanish/Latvian/Korean translated rows. The repeated range-error frames are worth reusing directly as a "here's exactly what this error looks like" teaching image.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- **Sheets as a real database, read AND write side**: this video is the clearest, most complete demonstration in the batch of treating a Sheet as a data store — creating structure (sheets/tabs as "tables"), checking existence before creating (avoiding duplicate/conflicting writes), targeted range writes vs. appends, and cleanup. This maps directly onto standard "CRUD" thinking (create sheet, read data range, update via setValues, delete empty sheets) without ever using that jargon — good raw material for teaching CRUD concretely.
- **Dimension/shape mismatches as a data-integrity concept**: the range-size-must-match-data-size errors are a concrete, visual introduction to why data has to be the right "shape" to be stored correctly — a backend/database concept (schema/shape mismatch) made tangible.
- **Idempotency / check-before-create**: the `getSheetByName` null-check before `insertSheet` is a small but genuinely important habit — avoids errors on re-run, which matters a lot for a forgetful-AI workflow where scripts get run repeatedly during iteration.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Class roster/leaderboard builder**: script that creates a new sheet per group/team (checking it doesn't already exist), appends rows of scores, and can be safely re-run without erroring or duplicating — directly teaches the create/read/update patterns plus the idempotency habit. Good mid-course project once kids are past "hello world" and need a slightly bigger structured-data exercise.
- **"Fix the range error" debugging exercise**: deliberately give kids a `setValues()` call with a mismatched array shape and have them diagnose and fix it using the exact error message shown in this video — turns a real trap into a guided exercise.

### Traps a kid will hit
- **Range/data shape mismatch** — far and away the most repeated, most concrete trap shown anywhere in this batch (happens 3+ times on screen). Very likely to bite kids the first time they try `setValues()` with a hand-built or AI-generated array that doesn't exactly match their `getRange(...)` dimensions.
- Re-running a "create sheet" script without an existence check throws on the second run — kids will hit this constantly while iterating, since rerunning the same script is the normal workflow with an AI-assisted editor.
- A1-notation ranges that include a sheet name (`'S6!A1:C2'`) look similar to plain ranges (`'A1:C2'`) — easy to typo or apply to the wrong sheet.

### Doesn't transfer, and why
- Nothing adult-only here — spreadsheet CRUD is squarely core material. The `LanguageApp.translate` demo is a nice-to-have flourish, not essential.

## Honest caveats
Long (26.6 min) but not padded — nearly every segment demonstrates a new, distinct SpreadsheetApp capability or a real error. This is a strong companion piece to JSrK4uHdVlQ (read side) for a "Sheets as your app's database" teaching unit; together they cover read + write + create/delete + error-shape well. No outdated material; matches the current SpreadsheetApp API and editor UI.
