# Google Apps Script - Send Email from Sheets Custom HTML Template 2 Custom Font Email Part 2 (Laurence Svekis, 9.2 min)

**What it is:** tutorial, part 2 of the mini-project started in `s8oTvFzKeKM`, picking up exactly where it left off. Live-coded, full-screen editor/sheet, no talking head.

**Substance:** substantive and tight — finishes the project with two genuinely new, reusable ideas (HTML templating with injected data, and writing a "sent" status back to the sheet) in under 10 minutes.

## Ideas, in the video's order
- [0:00:34] Recaps the finished feature first (select row -> Approve -> email sent -> inbox check), same "show the destination" framing as part 1.
- [0:01:38]-[0:02:11] Creates a new HTML file (`temp.html`) specifically as an **email template**, separate from any web-app UI — a useful distinction for kids: HTML files in Apps Script aren't only for `doGet` pages, they can also be templates for generated content like emails or documents.
- [0:02:11]-[0:02:44] Adds inline CSS directly in the template (`font-family: fantasy`), i.e. a plain HTML/CSS lesson embedded in the middle of the backend lesson — worth noting as "yes, styling still works the normal way inside a template."
- [0:02:44]-[0:03:55] Introduces the scriptlet syntax `<?= user.first ?>` to inject server-side data into the template at send-time — the key new concept in this video, and the direct answer to "how do I stop hardcoding 'Hello World'."
- [0:03:55]-[0:05:02] On the `.gs` side: `HtmlService.createTemplateFromFile('temp')`, then `template.user = user` (attaching the user object under a name the template can reference), then `template.evaluate().getContent()` to turn the filled template into a plain HTML string ready for `MailApp.sendEmail`.
- [0:05:35] Comments out the old hardcoded "Hello World" message object from part 1 and replaces it with the evaluated template — an explicit, visible "here's the upgrade" moment worth showing kids directly (old code left in as a comment, not deleted).
- [0:06:10] Runs it, checks the actual inbox: styled font, "Congrats \<first\> \<last\>" rendered correctly from the sheet row's data.
- [0:06:10]-[0:07:16] **Second new idea:** writing a "sent" status back into the spreadsheet after the email goes out — `sheet.getRange(user.row, 4).setValue('sent')`, using the row number carried through from the original active-cell selection in part 1. This is the batch's only example of a full write-back-after-action loop (read row -> act -> confirm -> record outcome in the same row).
- [0:07:49]-[0:08:54] Confirms the status column updates correctly after a second test send, then shows customizing the template further (color, font-size) as "you can keep styling this however you want" — mostly cosmetic, low new-concept value.

## What the frames add
Sheets at 0:04-0:05 show `temp.html` with the scriptlet tags (`<?= user.first ?>`) directly next to the `.gs` code assigning `temp.user = user` — seeing both files side by side makes the "you name it on the server, you reference that same name in the template" link far clearer than the narration alone. Sheets at 0:08 show the actual rendered email (styled font, injected name) next to the spreadsheet with the "sent" status now visibly written into column D — good, concrete proof the write-back worked, worth reusing as a "before/after" pair for class material.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Server-side templating: filling a template with data before sending, as opposed to hardcoding strings — a clean, small-scale first example of "the server builds the actual content dynamically."
- Writing a result back to the same data source the request came from (`setValue('sent')` into the row that was just read) — this is the batch's clearest example of the "read row, do something, write outcome back to that row" loop the class's own project-seed language ("writing rows, reading them back") is aiming at, even though here it's Gmail rather than Sheets-as-database for the frontend.
- Implicitly (not stated in the video, our own extrapolation): there's no error handling around the write-back — if `MailApp.sendEmail` were to fail after the confirm dialog, the code as shown would still be positioned to mark the row "sent" only because it's sequenced after the send call, but nothing in the video discusses what happens if the send itself throws. Worth raising with kids as a "what could go wrong here?" discussion rather than presenting the pattern as complete.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Direct extension of the part-1 mini-project: add a "status" column and a `temp.html` template with the student's own styling, so the finished project is "personalized certificate/shout-out emailer with a sent-tracking column" — a complete, gradeable two-session milestone combining both videos.
- Small guided exercise: have kids intentionally add a `console.log`/`Logger.log` right before and after the `setValue('sent')` call and predict what happens if they comment out the `MailApp.sendEmail` line — a light, safe way to explore the "what if this step fails" question the video itself doesn't raise.

## Traps a kid will hit
- Referencing a template variable that was never attached to the template object (e.g. writing `<?= user.middle ?>` when `user` has no `middle` field) will fail or render blank with a cryptic error — worth a class rule: "every field you use with `<?= ?>` must exist on the object you attached with `template.x = ...`."
- The write-back to column 4 is a hardcoded column number (`setValue`'s target); if a kid's sheet has columns in a different order than the video's (first/last/email/status), the "sent" mark will land in the wrong column with no error at all — a classic silent, no-crash bug.
- No check for "is this row already marked sent" before re-sending — running Approve twice on the same row will send the email twice. Not raised in the video; worth flagging to kids as a natural next improvement (and a real first taste of idempotency).

### Doesn't transfer, and why
- Nothing web-app or REST-API specific here — this is Docs/Sheets/Gmail automation triggered from inside the Sheet's own UI, not a deployed HTTP endpoint. It won't directly inform the class's later Netlify-frontend-calling-Apps-Script-backend work, but it's a good, self-contained warm-up project before that architecture is introduced.

## Honest caveats
No AI-assisted building. Nothing outdated. Short and well-paced — no filler beyond the last ~90 seconds of cosmetic font/color tweaking. Should be taught as a pair with `s8oTvFzKeKM`; on its own it assumes the part-1 code already exists.
