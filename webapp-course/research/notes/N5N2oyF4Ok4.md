# Google Apps Script: How to Send Email from menu within Google Sheets (Laurence Svekis, 8.4 min)

**What it is:** tutorial: custom Sheets menu item that emails whichever row a user has selected. Pure Sheets/email automation, little to do with web apps.
**Substance:** substantive for its narrow scope, but thin overall — one short function, one API call, no frontend.

**Note:** this video is functionally identical to `yBX6E-6YUz8` ("Google Apps Script Send Email...") in this same batch — same spreadsheet, same code, same permission flow, near-word-for-word transcript (one is YouTube captions, the other Whisper of what looks like the same recording/re-record). Treat them as one lesson; don't show both.

## Ideas, in the video's order
- [0:00:00] Demo: select any cell in a data row, click a custom "email" menu item, an email is sent to that row's address.
- [0:01:38]-[0:02:09] Standard custom-menu wiring again: `onOpen()` + `SpreadsheetApp.getUi().createMenu('functions').addItem('Email','senderEmail').addToUi()` — third occurrence of this exact pattern in the batch (also `OuchTYb0vYY`, `TW5ZFyo0FwI`).
- [0:02:42]-[0:04:22] Core idea worth reusing: `sheet.getActiveRange()` finds whichever cell/row the *user* clicked, then `.getRow()` gets that row number dynamically — so the script works no matter which cell in the row was selected. A genuinely nice "read user intent from the UI" trick, reusable in class.
- [0:04:56]-[0:05:29] Builds the target range explicitly with `getRange(row, 2, 1, 1).getValue()` to fetch just the email column from that row — reinforces row/column range addressing.
- [0:06:39]-[0:07:11] `MailApp.sendEmail(email, subject, message)` — the simplest possible way to send email from a script; needs an extra permission grant shown live on screen.

## What the frames add
Frames show the spreadsheet (username, email columns), the menu wiring code, the live permission dialog, and the received email in Gmail with subject "Sheet Email Tester" — confirms the round trip is real and screen-recorded, not staged.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Reading "what did the user select" from a Sheets UI (`getActiveRange`); server-side email sending as a one-line service call; the idea that a script can act on behalf of a signed-in account with explicit consent.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**"Notify a classmate" button** — select a row in a roster sheet, click a menu item, it emails that person a canned message. *Teaches: getActiveRange/getRow, range addressing, MailApp.* Small, good as a five-minute warm-up, not a milestone project; more useful as a first taste of "the server can act in the outside world" (send an email) before moving to real HTTP request/response content.

### Traps a kid will hit
Forgetting the function name must be passed as a **string** to `addItem` (the video itself hits this error live) — a small but real syntax trap kids using AI-generated menu code will also hit if the AI drops the quotes. Needing to grant a *new* permission (send-as-you) the first time email sending is added, separate from earlier Sheets-read permissions — reinforces that permissions are incremental per capability, not granted once for the whole project.

### Doesn't transfer, and why
No client/server web request at all — this is a bound script reacting to a UI selection, not a deployed web app. Doesn't teach `doGet`/`doPost`, HTML frontends, or JSON — not useful for "what is a backend" beyond "a script can call external services."

## Honest caveats
Genuinely thin/duplicate content — this and `yBX6E-6YUz8` should count as one lesson in the batch summary, not two. No outdated APIs shown.
