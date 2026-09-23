# Learn Google Apps Script Project Lesson Create PDF from Docs Using Google Sheet Data send Emails (Laurence Svekis, 32.8 min)

**What it is:** Tutorial, no visible year (modern editor UI, ~2022 based on similar-series timestamps in sheet data). Builds a mail-merge: Sheet rows -> populate a Doc template -> export PDF -> email -> mark row as sent -> UI menu button.
**Substance:** substantive: a real end-to-end pipeline built incrementally with visible mistakes and fixes (e.g. hardcoded index bug caught and fixed on screen), not just a code dump.

## Ideas, in the video's order
- [0:00:00] Whole pipeline preview: Sheet data -> Doc template -> PDF -> email -> mark sent.
- [0:03:15] Template convention: `{FIELD}` placeholders in the Doc, uppercase, matched to sheet column headers - a reusable pattern for any mail-merge project.
- [0:06:02] `SpreadsheetApp.openById(id).getSheetByName('data')` then `getDataRange().getValues()` - standard read-the-whole-sheet pattern.
- [0:08:51] First permissions prompt appears only once Spreadsheet service is touched; each new service (Drive, Docs, Gmail) triggers a new consent screen - good concrete example of Apps Script's per-service authorization scopes.
- [0:10:27] Never edit the template directly: `DriveApp.getFileById(id).makeCopy(folder)` per row, then edit the copy. Protects the source template from being overwritten by a bug (directly relevant to "protect the project from its own AI" theme, even though this is human-written, not AI-written).
- [0:13:14] Live bug: forgot to loop with the index, so every doc's replace used `row[1]` (hardcoded) instead of the current row - all 4 docs got the same name until fixed at [0:18:23]. Good real example of "silent wrong output, not a crash" for kids to watch for.
- [0:19:34] `doc.getAs(MimeType.PDF)` returns a Blob; `doc.saveAndClose()` must run first or the replace won't be flushed into the export.
- [0:21:48] `MailApp.sendEmail({to, subject, htmlBody, attachments:[blob]})` - object-form email with a PDF attachment.
- [0:24:37] Housekeeping: `file.setTrashed(true)` removes the intermediate Doc copy after the PDF is made, so Drive doesn't fill up with junk copies.
- [0:26:16] Idempotency pattern: write today's date into a "sent" column, then check `row[4]` is blank before processing - prevents re-sending emails on re-run. This is the clearest example in the batch of a concurrency/re-run guard.
- [0:29:44] `SpreadsheetApp.getUi().createMenu('Email Out').addItem('Send email','sender').addToUi()` inside `onOpen()` - turns the script into a one-click tool for a non-technical user opening the sheet. (getUi only works in a bound script, not standalone - stated explicitly.)

## What the frames add
Confirms each step visually: the Doc template with `{FIRST}`/`{ID}` placeholders [sheet_001 @1:30-1:45], the populated PDF/email output [sheet_001 @3:45], the permission dialogs per new service [sheet_003 @8:15-8:30], and the code building up from a hardcoded `'FIRST'` string literal to a dynamic `${header1}` template literal [sheet_005 @16:00-17:45]. Useful to see the actual sequence of small edits, not just the final script.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Sheet-as-database (read/write rows), Drive as file storage, service-specific OAuth scopes appearing one at a time, and a manual "sent flag" as a primitive idempotency/de-dupe mechanism.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
"Certificate/report generator": kids fill a Sheet (name, score, badge), a Doc template with `{NAME}` placeholders, one button generates a personalized PDF per row and emails it. Teaches: template placeholders, Sheet-as-DB, file generation, the sent-flag guard against duplicate work.

### Traps a kid will hit
Editing the template directly instead of copying it (destroys the master); forgetting `saveAndClose()` before export; using a loop variable name that shadows itself (the `row[1]` bug shown on screen is exactly the class of mistake Gemini will introduce too); re-running the whole script and re-emailing everyone because there's no sent-flag check.

### Doesn't transfer, and why
The full PDF/Docs/Gmail chain is heavier than most teen project ideas need; treat it as a "capstone-style" activity, not a first project. No JS frontend/fetch/backend-boundary concept here at all - this is 100% server-side Apps Script, no relevance to the Netlify-calls-Apps-Script final project.

## Honest caveats
Long (32.8 min) for a fairly linear feature build; a lot of screen time is normal Google Drive UI navigation (creating folders, dragging files) that a teen audience doesn't need narrated. No mention of quotas (MailApp has a daily send cap) which matters for a class of 10-15 kids testing simultaneously.
