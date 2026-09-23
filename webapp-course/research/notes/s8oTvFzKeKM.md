# Google Apps Script - Send Email from Sheets Custom HTML Template 1 Custom Font Email (Laurence Svekis, 18.7 min)

**What it is:** tutorial, part 1 of a 2-part mini-project (continues in `A9UdmnzIdfw`). Live-coded bound script, current Apps Script editor. No talking-head overlay in this one — full-screen editor/sheet only.

**Substance:** substantive. A single continuous project with a clear before/after (a spreadsheet of names/emails -> a working "select a row, click Approve, send an email" tool), built entirely on-screen with no skipped steps.

## Ideas, in the video's order
- [0:00:32] Opens with the finished demo first (select a row, click Send Email > Approve, confirmation popup, email arrives) before building it — a good "show the destination" framing worth copying in class.
- [0:02:42] Google's `+` trick for Gmail addresses (`name+test1@gmail.com` still delivers to `name@gmail.com`) used to simulate multiple distinct test users from one real inbox — genuinely useful, reusable classroom trick for testing email features without needing real student emails.
- [0:03:45] This is a **bound script** (Tools > Script editor from inside the Sheet), explicitly because it needs to react to "whatever cell is currently selected" — ties the standalone-vs-bound distinction to a concrete reason, not just a definition.
- [0:04:18]-[0:05:55] `onOpen()` + `SpreadsheetApp.getUi().createMenu('send email').addItem('approve', 'approver').addToUi()` — builds a genuine custom menu item in the Sheet's own toolbar, function-per-click pattern.
- [0:05:55]-[0:06:59] `ui.alert(question, ui.ButtonSet.YES_NO)` — a confirm-before-acting dialog; the response is checked afterward before continuing. This "confirm before the server does something" pattern is a good, simple analogue for confirm-before-delete/confirm-before-send in any real app.
- [0:06:59]-[0:08:03] **Real trap, explicitly demonstrated:** running the menu item from inside the Sheet UI shows no `Logger.log` output anywhere visible; you only see logs by running the function directly from the Apps Script editor/dashboard instead. Worth teaching before kids get confused debugging their own menu-triggered functions.
- [0:08:36]-[0:09:41] `SpreadsheetApp.getActiveSheet().getActiveCell().getRow()` — pulling "which row is selected" from the UI into the script; needs its own permission grant (editing/reading the active spreadsheet), shown live.
- [0:09:41]-[0:11:18] `sheet.getRange(row, 1, 1, 3).getValues()` — explains the four `getRange` arguments (start row, start column, number of rows, number of columns) plainly as "top-left starting point, then how many rows and columns to grab."
- [0:11:50]-[0:12:55] **Real trap, explicitly demonstrated:** `getValues()` returns an array-of-arrays even for one row (`[[first, last, email]]`), so `data[0]` is needed to unwrap it before `data[0][0]` etc. work as expected. Reshapes into a plain `{first, last, email}` object right after, calling out array 0-indexing explicitly.
- [0:14:03]-[0:14:35] Puts the extracted first-name/email into the confirm dialog's text (`Send to ${user.first} (${user.email})?`) so the human approver can visually double-check before sending — reinforces the confirm-before-send pattern with the actual data in view.
- [0:15:08]-[0:16:14] `if (res == ui.Button.YES) { sendUser(user) }`, a separate `sendUser` function, first pass at `MailApp.sendEmail({to, subject, htmlBody})` with a hardcoded "Hello World" HTML string — deliberately left basic; templating comes in part 2.
- [0:17:18]-[0:17:51] OAuth re-consent triggered specifically by the new Mail-sending permission (same "new scope = new consent screen" pattern seen across the batch) — shown fully, then the actual received email checked.

## What the frames add
Sheets at 0:08-0:11 show the raw execution log (blank on first attempt, then populated once run from the dashboard) side by side with the code — makes the "logs are invisible from the Sheet menu" trap visually obvious, more so than the narration alone. Sheets at 0:16-0:18 show the finished `sendUser` function, the plain "Hello World" email actually arriving in Gmail, and the spreadsheet with test rows/plus-addressed emails filled in — confirms the whole pipeline works end to end on screen, not just described.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Reading "what the user currently has selected" from a UI into server code (`getActiveCell`) — a simple, concrete first example of client state informing a server action.
- A confirm-before-write/send pattern (`ui.alert` + Yes/No branch) — teaches "the server doesn't have to act immediately just because a button was clicked," an important habit for any app that sends messages or changes data.
- Raw spreadsheet reads coming back as nested arrays, and why you reshape them into named-field objects before using them — the same lesson S4's JSON-API videos teach at data-set scale, but here at the simplest possible scale (one row, three columns), a good on-ramp before that harder version.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Direct build target: "class shout-out" tool — a Sheet of classmates' names/emails (or a fake test list using the `+` trick), a custom menu button, a confirm dialog, and a plain-text/HTML email sent on approval. This video alone is close to a complete spec for a first mini-project.
- Debugging habit to teach alongside it: "if your menu button doesn't show any log output, run the function directly from the editor instead" — should be taught as a standing rule before kids build any bound-script UI.

### Traps a kid will hit
- Building `onOpen` menu items and expecting them to appear immediately without re-opening the Sheet (the video works around this by manually re-running `onOpen` from the editor) — the menu will not update on its own; a kid needs to either reload the Sheet or re-run `onOpen` once to see menu changes.
- Expecting `Logger.log` output to appear somewhere in the Sheet UI when a custom menu item is clicked — it doesn't; logs only show when the function is run from the script editor/dashboard.
- Forgetting the `[0]` unwrap on `getRange(...).getValues()` and getting a nested array where a flat value was expected — this is exactly the kind of silent, no-error "wrong shape of data" bug Gemini-written code is also likely to produce.

### Doesn't transfer, and why
- The email itself is still a hardcoded string at the end of this video ("Hello World") — the actual customized-template piece (the part that would generalize to, say, a certificate or a personalized message) is deferred to part 2 (`A9UdmnzIdfw`); don't treat this video alone as the finished pattern.

## Honest caveats
No AI-assisted building — fully hand-typed by the instructor, useful as a reference for correct structure only. Nothing outdated; APIs and UI match the current Apps Script editor. Genuinely one of the tighter, better-paced videos: 18.7 minutes with very little filler, in contrast to the batch's very long overview course.
