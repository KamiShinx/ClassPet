# How to Create a PDF and Email from Sheet data using Google Apps Script code lesson (Laurence Svekis, 11.1 min)

**What it is:** Tutorial: standalone script reads Sheet rows, builds HTML, converts to a PDF blob, emails it as an attachment via `MailApp`, and writes a "sent" status back to the Sheet. Undated, YouTube captions.
**Substance:** thin for this batch's purpose - competent and complete on its own narrow terms, but **entirely Docs/Sheets/email automation with zero web app, doGet/doPost, or frontend of any kind**.

## Ideas, in the video's order
- [0:00:00]-[0:01:06] Frames the whole pipeline: read Sheet row -> build HTML -> blob -> PDF -> email attachment -> write "sent" flag back to the Sheet - a clean example of chaining several Apps Script services together (Spreadsheet, Utilities, Mail) in one function.
- [0:02:12]-[0:03:20] `SpreadsheetApp.openById(id)` with ID copied from the browser URL bar, plus the recurring first-run OAuth consent screen (consistent with every other video in the batch - worth noting to kids as a universal, one-time-per-script step, not something unique to this lesson).
- [0:04:24]-[0:05:32] Loops rows with `forEach((row, index))`, builds an HTML string with template literals per row - same Sheet-read-and-loop pattern seen across the whole batch, reinforcing it as the standard idiom.
- [0:06:06]-[0:06:39] `Utilities.newBlob(html, 'text/html', name)` then implicitly converts to PDF via `getAs(MimeType.PDF)` when attaching - a good concrete example of Apps Script's blob/MIME conversion utilities, useful if kids ever want a "generate a certificate/report" feature.
- [0:07:13]-[0:08:50] `MailApp.sendEmail({to, subject, htmlBody, attachments:[blob.getAs('application/pdf')]})` - full working send-with-attachment example; confirmed working by checking the actual inbox on screen.
- [0:09:25]-[0:10:31] Writes back to the Sheet: `sheet.getRange(index+2, 5).setValue('sent')` - explicitly explains the `+2` offset (accounting for the header row and zero-based index), a small but real "off-by-one" lesson worth calling out.

## What the frames add
Frames (sheet_001 @0:00-0:45) show the actual generated PDF opened in a viewer with real formatted content ("Laurence Svekis... Welcome your id is 10... Thank You"), and the final inbox with four sent emails and PDF attachments - a satisfying concrete "it worked" visual, useful if this exact demo is ever shown to kids as a finished-product example. No diagrams, no web app or deployment screens anywhere - confirms there is no web-app content to see.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Chaining multiple Apps Script services (Spreadsheet -> Utilities -> MailApp) in one function is a reasonable small example of "the backend can do several things in sequence," even without an HTTP request in sight.
- Writing a status flag back to the source Sheet after an action completes is a genuinely useful small pattern (e.g., for later doPost-driven flows: "process a request, then record what happened") - worth keeping as a concept even though this video never wires it to a web request.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Not a web-app project. Could be repurposed as a **non-web bonus feature** for an existing Sheet-backed project (e.g., "email yourself a certificate when you finish"), but shouldn't anchor a lesson on its own for this course's core goal.

### Traps a kid will hit
- Off-by-one/header-row indexing when writing back to a specific row (`index+2`) - a small but very real and recurring class of bug whenever Sheet rows are looped with a zero-based `index` but the sheet itself has 1-based rows plus a header.
- MailApp/GmailApp daily send quotas (not mentioned in the video at all) are a realistic trap once multiple kids' apps start sending test emails from the same class Google Workspace - worth a standalone warning in the traps section of the batch summary since this video is silent on it.

### Doesn't transfer, and why
- No web app, no HTML frontend, no deployment, no request/response cycle of any kind - this is Docs/Sheets/email automation. Per the batch instructions, flagged plainly: **not relevant to the web-app/API goal**, useful only as an example of Apps Script's document/email services if a specific kid project wants a "generate and email a PDF" feature bolted onto an otherwise web-app-based project.

## Honest caveats
This is the batch's clearest example of "Docs/Forms/email automation with little to do with web apps" - it should be weighted low in the batch summary. No mention of quotas, rate limits, or error handling if `MailApp.sendEmail` fails partway through a loop (e.g., an invalid email address on row 3 would presumably throw and abort the whole run without a try/catch) - worth flagging as a silent gap since the class's "weak AI breaks things" concern applies directly: an AI-written loop like this with no error handling could fail on one bad row and never notify anyone why the rest didn't send.
