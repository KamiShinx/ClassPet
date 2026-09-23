# Google Form Submit Capture onSubmit custom Google Apps Script Code Create custom Logger Lesson (Laurence Svekis, 18.3 min)

**What it is:** Tutorial, modern UI. Builds a Google Form -> installable "on form submit" trigger -> logs the submission into a custom "log" sheet, and auto-replies to the submitter plus notifies the script owner by email.
**Substance:** mixed: the trigger setup and the `e.namedValues` object-shape gotchas are genuinely useful and shown with real live debugging; the email/notification part is routine and quick.

## Ideas, in the video's order
- [0:05:15] Installable trigger required for form-submit automation: Extensions > Apps Script, then Triggers (clock icon) > add trigger > event source "From spreadsheet" > event type "On form submit" - **not** just defining a function; a kid must separately wire the trigger, and must re-accept permissions for it specifically.
- [0:07:55] `Logger.log()` output does **not** appear in the regular Execution log for trigger-fired runs the way it does for manual runs - only in "cloud logs" - a genuine confusion trap: "you won't see anything in the execution logs, even though it actually completes."
- [0:08:27] Workaround: write your own logger - a dedicated `addLog(data)` function that does `sheet.appendRow([JSON.stringify(data)])` into a separate "log" sheet, so submissions are visible without hunting through Apps Script's execution history. Directly reusable teaching pattern: "when the built-in logs are inconvenient, log to a Sheet yourself."
- [0:11:04-0:13:14] `e.namedValues` is an object whose values are **arrays** even for single answers (e.g. `namedValues['Number'][0]`), because a question could in theory repeat - a real gotcha most kids (and Gemini) will get wrong on the first try, shown live as the author has to adjust indexing more than once.
- [0:14:48] Two separate emails demoed: an auto-reply "thank you" to the submitter's captured email (`MailApp.sendEmail` to `namedValues['Email Address'][0]`, guarded by `!= null` in case email collection is off) and a separate notification to `Session.getActiveUser().getEmail()` (the script owner) - a simple "notify the teacher when a student submits" pattern.
- [0:16:26] Live bug: sends fails at first because Email Address collection was off in Form settings, so `namedValues['Email Address']` doesn't exist - author has to go back into Form settings and turn on "Collect email addresses" to fix it; good real example of a frontend/data-source setting silently breaking backend code.

## What the frames add
Shows the Form settings toggle for "Collect email addresses" being off then on [sheet_005 @16:00-16:45], the actual triggers panel and its own execution list separate from the main one [sheet_003 @8:30-9:30], and the raw `e` object dumped as JSON in the log sheet showing the real `namedValues`/`range`/`triggerUid` shape [sheet_003 @10:30-11:45] - useful as a literal reference for what a form-submit event object actually looks like, more precise than the narration alone.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Event-driven server code (trigger fires on user action, no page load involved) - a different "backend" shape from a web app, worth contrasting explicitly: web app = client asks server; trigger = an external event (form submit) wakes the server up on its own. Also: writing a custom log as a Sheet, and validating that expected data exists (`!= null`) before using it.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
"Class feedback form with a live log and auto-thank-you": a Form feeds a Sheet, an onSubmit trigger appends a normalized row to a separate log tab and emails the teacher a summary - teaches triggers, event objects, and defensive null-checking on user data.

### Traps a kid will hit
Forgetting to add the installable trigger (function alone does nothing); assuming `Logger.log` will show trigger output where they're used to looking; treating `namedValues` values as plain strings instead of one-element arrays; relying on a form field (like email) that isn't actually being collected.

### Doesn't transfer, and why
No fetch/client call, no deployed web app - forms triggers are a different automation shape from the GET/POST endpoint the final project needs, so keep this as a separate, optional module rather than folding it into the "backend" unit.

## Honest caveats
Narration in the transcript reads as a script read aloud (unusually clean grammar for auto-captions) - it may be a paraphrased/dubbed re-upload rather than a raw live recording; content and screen actions still line up correctly, so this doesn't affect the technical notes above.
