# Google Apps Script Send Email: how to send emails from Sheet data (Laurence Svekis, 8.4 min, Whisper transcript)

**What it is:** the same lesson as `N5N2oyF4Ok4` in this batch (custom Sheets menu → email whichever row is selected). Whisper transcript of what is effectively the same recording/content as the captions version. Pure Sheets/email automation, little to do with web apps.
**Substance:** substantive for its narrow scope, but a near-duplicate of another video in this batch — see `N5N2oyF4Ok4.md` for the full breakdown; this file only notes anything distinct.

## Ideas, in the video's order
Content matches `N5N2oyF4Ok4` beat for beat: `onOpen`+`createMenu` menu wiring [0:01:16]-[0:01:43], `getActiveRange()`→`getRow()` to find the user's selected row [0:02:16]-[0:04:19], building the target range for the email column [0:04:49], and `MailApp.sendEmail(email, subject, message)` [0:06:28]-[0:07:01]. No new ideas beyond the captions version.

## What the frames add
Same as `N5N2oyF4Ok4`: spreadsheet, code, live permission dialog, and the received email — frames appear to be from an identical or re-recorded run of the same demo.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Same as `N5N2oyF4Ok4`: reading user selection via `getActiveRange`, one-line email sending via `MailApp`.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Same project seed as `N5N2oyF4Ok4` ("notify a classmate" button) — don't double-count as a separate idea in the batch summary.

### Traps a kid will hit
Same as `N5N2oyF4Ok4`: function name must be a string in `addItem`; new permission needed the first time email-sending is added to a project.

### Doesn't transfer, and why
Same as `N5N2oyF4Ok4`: no web request/response, no HTML frontend, not a deployed web app.

## Honest caveats
This is a duplicate of `N5N2oyF4Ok4` in every substantive respect (same script, same spreadsheet, same demo). Flagging plainly so the batch summary doesn't double-count it as two distinct lessons or two distinct project seeds.
