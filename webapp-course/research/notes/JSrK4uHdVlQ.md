# How to Get Sheet Row Data with Google Apps Script (Laurence Svekis, 20.6 min)

**What it is:** Screen-recorded tutorial, code-along style, no visible date but old-style Apps Script legacy editor UI mixed with new editor; likely 2020-2021 based on macro/editor chrome seen in frames.
**Substance:** substantive: full working example built live (read sheet rows, loop, send templated emails), every step shown on screen with code and output.

## Ideas, in the video's order
- [0:00:33] Bound script lives under Extensions > Apps Script on a spreadsheet; naming the Apps Script project is separate from the sheet's name (generic but true and worth restating to kids).
- [0:01:40] Bound scripts do NOT show up in Google Drive as their own file — only the container (the spreadsheet) shows. Standalone scripts do show in Drive. Important distinction for "where did my code go."
- [0:03:19] Duplicating a spreadsheet duplicates its bound script too (with the same name) — best practice: rename the copy's script so you don't confuse which is which.
- [0:04:59] Default new script file is `Code.gs` with an empty `myFunction`; best practice is to rename the function to something meaningful before writing logic.
- [0:05:33] Core pattern: `SpreadsheetApp.getActiveSpreadsheet()` -> `.getActiveSheet()`. Explains container object (spreadsheet) vs active sheet object — good beginner mental model for "the sheet you're looking at."
- [0:06:06] `Logger.log()` for debugging output shown in the Execution log — the basic print-debugging loop a kid will use constantly.
- [0:08:52] `sheet.getDataRange().getValues()` returns a 2D array (array of row-arrays) — this is THE core data-shape concept for anything touching Sheets as a database.
- [0:10:29] Two ways to loop the 2D array: classic `for` with index, or `.forEach`; presenter prefers forEach for readability (generic).
- [0:11:35] Removing the header row with `.slice(1)` before processing data — small but essential pattern for treating row 1 as "not data."
- [0:12:42] Accessing a specific column by index (email in column 4 = index 3) — reinforces zero-based array + spreadsheet column correspondence.
- [0:13:16] Building an HTML message per row using template literals (backticks) with row data interpolated — directly reusable pattern for "personalize a message per Sheet row."
- [0:14:22] `MailApp.sendEmail(recipient, subject, body)` — simpler/fewer permissions than `GmailApp`; good for "just send an email" tasks.
- [0:15:32–0:17:41] Full OAuth consent walkthrough live: "Google hasn't verified this app" warning -> Advanced -> go to app (unsafe) -> permissions list -> Allow. This is the exact screen kids will hit the first time any of their scripts sends mail or touches data.
- [0:17:41] Gmail "+" trick (`address+1@gmail.com`) to generate distinct-looking test addresses that still land in one inbox — handy for kids testing without real classmate emails.
- [0:18:45] Switching from plain-text body to `htmlBody` via the options-object form of `sendEmail({to, subject, htmlBody})` — shows both call signatures.

## What the frames add
Frames closely track the transcript: sheet contents (First/Last/ID/Email columns), the macros.gs/code.gs file list, the full "Google hasn't verified this app" -> "wants to access your Google Account" -> scope list ("View and manage spreadsheets", "Send email as you") -> Allow sequence across ~6 frames [0:15:45–0:17:15], and the final received emails with plain-text vs HTML rendering [0:19:15–0:19:45]. The OAuth sequence is worth showing kids directly as a slide/gif since it's exactly what they'll see.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Sheet-as-database: header row vs data rows, 2D array shape, reading "all rows" in one call rather than cell-by-cell (touches on Sheets read quotas/speed implicitly, though not named).
- Client-invisible "server" code: everything runs inside the Apps Script editor/log, not in a browser page — good for teaching "this code has no UI, it just runs and does things."
- Permissions/authorization as a real backend concept: the script needs the user's explicit consent to read Sheets and send mail — a concrete, visual example of "the backend asks permission to act on your behalf."

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Sign-up sheet emailer**: class fills a shared Sheet (name, email, favorite thing); write a script that reads all rows, skips the header, and sends each person a personalized HTML "welcome" email with their info. Teaches: 2D arrays, looping, string templating, MailApp permissions. Runnable in one ~90-min session.
- **Row-to-card generator**: turn each spreadsheet row into a nicely formatted HTML block (not emailed, just logged/displayed) — a stepping stone toward "generate content per user."

### Traps a kid will hit
- Off-by-one on the header row (forgetting `.slice(1)`) — sends "Hi undefined" or processes the column names as if they were data.
- Wrong column index when picking `row[3]` for email — very easy to get one field wrong; worth teaching them to log a full row first.
- Confusing bound vs standalone script location ("where did my project go") — a very likely real confusion for 14-year-olds since it's genuinely non-obvious.
- Google's "app not verified" screen looking scary/broken — kids may think they did something wrong; needs an explicit heads-up in class.
- Duplicating a sheet duplicates the bound script silently, which can cause kids to edit the wrong copy.

### Doesn't transfer, and why
- MailApp permission flow can be identical to what our class needs, but the "make sure Google verifies your app" tangent (mentioned only in passing) isn't relevant — our apps will never need to be published/verified for a public audience, just for the student's own account or Ben's.
- The video's use case (email-blast to a static roster) is adult/business-flavored; teens will respond better to a peer-facing framing (e.g. class poll, not "send a corporate welcome email").

## Honest caveats
This is a clean, well-paced code-along with no padding; every idea is demonstrated on-screen, not just described. It doesn't explain the client/server split explicitly or the deployed-web-app path at all — it's Sheets automation, not a web app.
