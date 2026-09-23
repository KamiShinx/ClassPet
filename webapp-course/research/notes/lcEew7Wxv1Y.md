# Advanced Menu & Action Tracking in Sheets (Laurence Svekis, 20.0 min)

**What it is:** Live-build tutorial, bound script on a Google Sheet: a custom menu adds four admin actions (log, info modal, emailer, PDF generator) on top of a "Users" sheet, plus a tiny deployed web app used purely as an email open-tracking pixel. No year overlay; APIs current.

**Substance:** mixed: most of the video is Sheet/UI/Docs scripting with no client-facing app, but the last third does deploy a real `doGet` web app (the tracking pixel), which is a genuine, if narrow, backend example — a request arrives, the server increments a Sheet cell, and returns a 1x1 image. Worth more than the batch's pure-Docs videos for that reason.

## Ideas, in the video's order
- [0:02:46]-[0:03:50] Custom `onOpen` menu with **four** items at once (Log/Info/Emailer/PDF) — a step up in menu complexity from the batch's single-button videos.
- [0:03:50]-[0:06:36] `sheetLogger(message)` helper: opens (or creates, if missing) a "log" sheet and appends a message + timestamp row — a small reusable audit-log pattern, called from every other function in the video. Good "how do you observe what your backend actually did" idea for kids debugging a forgetful AI's changes.
- [0:06:36]-[0:07:43] `checkSel()`: reads the sheet name and the user's current cell selection (`SpreadsheetApp.getActiveRange()`), returns an object `{sName, results}` only if the active sheet is "Users" — an explicit **guard clause** pattern (wrong sheet -> early return) that recurs through the rest of the video.
- [0:07:43]-[0:08:16] `getUser(row, cols)`: reads one row by range and manually maps positional values to named fields (`id, first, last, email`) — same "hardcoded column position" approach flagged as a trap in the S9 batch's other Svekis video (`5C1HY1sSHos`), here without the safer header-matching alternative.
- [0:08:52]-[0:10:30] **Info modal**: `HtmlService.createTemplateFromFile('temp')`, scriptlet-populated with the selected user's data, shown via `SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Details')`. If no row is selected, shows a plain alert "Sorry no Data!" instead — demonstrated live both ways [frames 00:10:15, 00:10:30]. This HtmlService-template-plus-modal pattern is a genuinely reusable "how do you show a rich popup from a script" idea, distinct from a full web app.
- [0:10:30]-[0:12:10] **Emailer**: builds an HTML email from the same template mechanism, `MailApp.sendEmail`, then writes "sent" into a status column on the Sheet — i.e., the Sheet doubles as both data source and a mutable status/audit column, a pattern worth naming for kids ("the database also tracks what happened, not just the input").
- [0:12:10]-[0:14:58] **Web app as a tracking pixel**: `doGet(e)` checks for an `id` parameter, logs it, and increments a "Viewed" counter cell for the matching row; deployed with the same New Deployment -> "Anyone" flow seen elsewhere in the batch. The email's HTML body embeds `<img src="{execUrl}?id={userId}" width="1" height="1">` so opening the email fires a real GET request to the deployed endpoint. This is the batch's clearest example of "a backend request can be triggered by something other than a user clicking a button" — worth calling out explicitly, since it's a genuinely surprising, teachable idea (a 1x1 image is itself an API call).
- [0:14:58]-[0:15:32] Live demo: sends an email, opens it in Gmail, comes back to the Sheet and the Viewed count is now 1 (then 2, since the video's own email client also fetched the pixel while loading it) — a good live "sometimes you get more requests than you expect" moment, though not discussed as a lesson about redundant/duplicate requests.
- [0:15:32]-[0:19:23] **PDF generator**: same copy-template / `replaceText` / `getAs(MimeType.PDF)` / `MailApp.sendEmail` with `attachments` pattern as `CnEodUTV_Ak` in this batch, here triggered per-selected-row from the Sheet's menu rather than looped over the whole sheet, and writing the resulting file's URL back into a Sheet column.

## What the frames add
Consistent code-editor + live Sheet/Doc/Gmail screen capture. Concretely useful: the "Sorry no Data!" alert vs. the populated modal dialog shown side by side [00:10:15 vs 00:10:30]; the tracking-pixel email opened in Gmail next to the Sheet's Viewed column ticking up [00:19:30-00:19:45]; the `getFileById`/`makeCopy`/`replaceText`/`getAs(PDF)` chain visible in one continuous code view [00:16:00-00:18:45]. No standalone diagrams.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- **A request doesn't require a visible button**: an `<img>` tag firing a GET request against a deployed `doGet` is a sharp, concrete way to show that "the backend just responds to any HTTP request, from anywhere" — arguably the single most conceptually interesting moment in the whole S9 batch for explaining what an API actually is.
- Guard-clause pattern (`checkSel`) for "is the app in a state where this action makes sense" — a real, transferable defensive-programming habit.
- Sheet-as-status-tracker: writing back "sent"/"viewed"/counts into the same row that was read from, distinct from just reading or just writing.
- HtmlService templates + modal dialogs as a lighter-weight alternative to a full deployed web app when you only need a popup inside the Sheet UI itself.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **"Did you open it?" read-receipt milestone**: kids build a tiny doGet endpoint that increments a counter, then embed it as a 1x1 image in an email or even a shared doc/link — directly reuses this video's most interesting idea and is very concrete and surprising for teens ("your phone secretly told my server you opened this").
- **Admin panel over a class roster**: a custom Sheet menu (Info/Email/Log) over a shared class-roster sheet — teaches guard clauses, modals, and the audit-log pattern, and is a believable "teacher tool" project, possibly reusable for Ben's own "hub" idea (a lightweight admin panel bound to a sheet, no separate frontend needed).
- **Certificate/PDF milestone**: same idea as `CnEodUTV_Ak` in this batch, here triggered per-row from a menu instead of batch-looped — a reasonable alternate framing ("generate this one kid's certificate on demand") for the same underlying template-and-PDF pattern.

### Traps a kid will hit
- Hardcoded column positions in `getUser` (`vals[0]`, `vals[1]`...) instead of matching by header — same trap flagged in the batch's `5C1HY1sSHos` note; a column reorder silently breaks everything with no error.
- Multiple `doGet` requests for what feels like "one open" (Gmail itself fetching the pixel once while rendering the message, once more if the user views it) — the video shows the count jumping by 2 without ever explaining why; worth flagging explicitly in class as "one user action can generate more than one request," relevant to concurrency/quota discussions elsewhere in the course.
- Same deploy/permissions checklist trap as the rest of the batch (Execute as / Who has access) applies here too, shown again at [0:13:17].
- Silent no-op if a menu action runs while the wrong sheet is active or nothing is selected — mitigated here by `checkSel`'s guard clause, but only because the instructor thought to add it; an AI-written first draft might not.

### Doesn't transfer, and why
- The bulk of the video (menu wiring, modal dialogs, PDF templating) is single-user, script-editor-triggered Sheets automation, not a client-facing app — most of its runtime has no relevance to the doGet/doPost/HtmlService frontend pattern the course is built around, aside from the tracking-pixel segment.

## Honest caveats
Mixed video: **mostly Sheets/Docs automation with limited relevance to web apps**, but its tracking-pixel `doGet` segment [0:12:10]-[0:14:58] is a real, small, and pedagogically sharp backend example worth pulling out on its own rather than assigning the whole 20 minutes.
