# Learn Google Apps Script Use a Doc as a template to populate with Sheet data and email as PDF (Laurence Svekis, 15.3 min)

**What it is:** Live-build tutorial, standalone (unbound) script: loop over Sheet rows, copy a Google Doc template per row, replace placeholder text, convert to PDF, email it, delete the temp copy. No year overlay; APIs (DriveApp, DocumentApp, MailApp) are current.

**Substance:** thin-to-mixed for our purposes: it's a clean, well-structured mail-merge script, but it is Docs/Sheets/Drive automation with no client-facing web app, no doGet/doPost, no deployment step at all. Directly relevant only as a Sheet-as-database / templating pattern, not as backend architecture.

## Ideas, in the video's order
- [0:01:06]-[0:02:44] Open Sheet by ID, `getSheetByName('data')`, `getDataRange().getValues()`, then `.slice(1)` to drop the header row before looping — a reusable "read rows, skip header" pattern.
- [0:03:54]-[0:05:33] `DriveApp.getFileById(templateId)`, `.makeCopy(destinationFolder)` — copies a Doc template into a temp folder per recipient rather than editing the original (generic, but a correct habit).
- [0:07:46]-[0:08:52] Placeholder substitution: loop the header row, `body.replaceText('{heading}', row[index])` — text between curly braces in the template doc gets swapped for the matching column's value. This is a genuinely reusable "mail merge" concept, order-independent because it matches by heading name.
- [0:10:00]-[0:10:33] `doc.getAs(MimeType.PDF)` converts the (still-open) Doc to a PDF blob for emailing.
- [0:10:33]-[0:12:12] `MailApp.sendEmail({to, subject, htmlBody, attachments:[blob]})` using the row's email column and a template-literal message.
- [0:12:12]-[0:12:46] `file.setTrashed(true)` on the temp copy so nothing accumulates in Drive.
- [0:13:21]-[0:13:54] **Real bug hit live**: PDFs came out blank/stale because the script converted to PDF before `saveAndClose()` on the doc — pending edits weren't flushed yet. Fixed by calling `.saveAndClose()` before `getAs(MimeType.PDF)`. Good concrete "order of operations matters, and the failure is silent" example.

## What the frames add
Code-editor screen capture throughout, all 4 sheets; no diagrams. Frame at [0:00:00] shows a title card only. Nothing beyond what the transcript already describes — confirmed no on-screen material worth citing beyond the code.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Sheet-as-database read pattern (open by ID, get values, strip header) — reusable vocabulary.
- Server-side templating: string/placeholder substitution driven by column headers, which is the same idea kids will need for any "personalize a message per row" feature.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Certificate/report generator**: kids design one Doc template with `{name}`/`{score}` placeholders, a Sheet of names+scores, and a script that emails each person a personalized PDF — a satisfying, visual mini-project, though it teaches Docs/Drive scripting rather than the doGet/doPost web-app pattern the course is centered on. Good as an optional side-project or one-off lesson, not a milestone in the main app-building arc.

### Traps a kid will hit
- **Stale content in the exported PDF** because the Doc wasn accessed/edited without `saveAndClose()` first [0:13:21] — the video's own bug, a good "the AI's script looks right but silently exports old data" example to flag explicitly, since a forgetful AI could easily omit this call.
- Placeholder text in the template must match the Sheet header exactly (case/spelling) or `replaceText` silently does nothing — no error is thrown.
- Leftover temp files piling up in Drive if `setTrashed(true)` is forgotten.

### Doesn't transfer, and why
- No web app, no deployment, no client/server split — this whole video is server-side batch scripting triggered manually from the Apps Script editor, not a backend serving requests. Doesn't teach doGet/doPost, permissions, or anything about a frontend talking to a server.

## Honest caveats
This is a **Docs/Drive/Sheets automation video with little to do with web apps** — no HTML frontend, no deployed endpoint, no client/server request cycle. Keep any class use of it narrow (the placeholder-templating and PDF-export patterns only), not as a model for the app-building milestones.
