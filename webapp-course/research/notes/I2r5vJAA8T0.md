# Google Form Submission to Spreadsheet: Sheet data, Autoresponder and Custom Automation Apps Script (Laurence Svekis, 27.9 min)

**What it is:** Full code-along building a real Form -> Sheet -> trigger -> autoresponder-email(+PDF) pipeline. Whisper transcript (has punctuation, cleaner to read than most others in this batch).
**Substance:** substantive: the most feature-complete, closest-to-a-real-project video in the whole batch — builds an actual working automation end to end, including debugging live errors on screen.

## Ideas, in the video's order
- [0:00:00–0:01:50] Building a Google Form visually (Form builder: short-answer questions, required fields, response validation, collecting email addresses via "Requested"/sign-in) — the visual form-builder path as an alternative/complement to building forms with code (covered in the U3IWoAppDVY video).
- [0:03:52] Connecting a Form to a new response Spreadsheet from the Form's Responses tab — this is the "Form writes to a Sheet automatically" wiring, done via UI not code.
- [0:04:55–0:06:56] Setting up an installable trigger in code: `ScriptApp.newTrigger('adder').forSpreadsheet(sheet).onFormSubmit().create()` — a second, code-based way to wire the "on form submit" event (vs. clicking Triggers in the UI). Directly reinforces the event-driven trigger idea from vIiuAkum30U's `onOpen`.
- [0:07:56] The event object (`e`) passed to the trigger function contains `namedValues` (object of question -> array of answers), `range` (the edited cell range), and other UI-source values — this is the actual shape of "form submission data" a kid will need to destructure.
- [0:08:27] Logging the raw event object via `JSON.stringify(e)` and appending it to a separate "log" sheet for debugging — good "see the actual shape of the data" habit, directly useful for a class taught to work with an AI that hallucinates field names.
- [0:16:00] **A live bug and fix, on screen**: appending `[userInfo]` (wrapping already-array-like data in another array) inserted an object/array-as-string into the sheet instead of clean values; fixed by not double-wrapping. This is a genuine, unstaged example of "the code produced garbage data, here's why, here's the fix" — exactly the kind of AI/human building trap the class brief asks to note.
- [0:21:03] Comment (best practice) not to add extra columns directly to the Form's own response sheet — create a separate sheet for derived/tracked data, because editing/renaming form questions changes the response sheet's columns and can silently break code that assumes a fixed column layout.
- [0:22:04] Explicit warning: renaming a Form question changes the corresponding column header in the response sheet, which will break code that reads it by name — a real, concrete "the data source changed shape under you" trap.
- [0:23:30–0:26:31] Building the autoresponder: looping over `Object.keys(user)` to build an HTML `<table>` row-by-row from an object (a nice generic "objects to HTML table" pattern), `MailApp.sendEmail({to, subject, htmlBody, cc})`, and finally generating a PDF on the fly via `Utilities.newBlob(html, MimeType.HTML).getAs(MimeType.PDF)` attached to the email — genuinely impressive and reusable "auto-generate a PDF from data" trick.
- [0:22:57–0:24:33] **A second live bug**: forgot to accept a permission for `MailApp.sendEmail` even though the sheet-write worked; shows that permissions are requested *incrementally* per capability used, not all at once — the same script can partially work and then fail on a not-yet-authorized call.

## What the frames add
Frames show the actual Google Form being built (question types, required toggle, response validation, "Collect email addresses" toggle, quiz-adjacent settings under Responses/Presentation/Defaults), the deployed Form as seen by a respondent, the Log sheet filling with raw JSON event data, the Apps Script Triggers list entry (owner "Me," event "From spreadsheet - On form submit," function "adder"), an actual "test form 1 wants to access your Google Account" consent screen, and the final HTML-table email body being constructed. The frames of the Triggers screen and the raw JSON log rows are the most reusable visuals — good to show kids literally what a webhook-like trigger payload looks like.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- **Event payloads / webhooks-in-miniature**: `onFormSubmit()` firing a function with a structured event object is the clearest analog in this whole batch to "an API endpoint receiving a request with a data payload" — very reusable for explaining what a backend "listens for" and "receives."
- **Data shape drift breaking code**: renaming a form question changes the response sheet's column header, silently breaking code that reads by name — a concrete, memorable lesson in why a fixed "schema"/contract matters, and how fragile string-key access is.
- **Incremental permission grants per capability**: sending mail requires its own authorization separate from writing to a sheet — reinforces that "the backend" only gets to do what it's specifically been allowed to do, action by action.
- **Generating a document (PDF) from a template of data** — a satisfying, visible "the server can *produce* something new," not just store/retrieve.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Class feedback form with auto-confirmation email**: build a Form (2-3 questions), Sheet response collection, an `onFormSubmit` trigger that logs the submission and emails the submitter a "thanks, here's what you told us" HTML email. This is a complete, satisfying, teen-appropriate project that touches almost every core backend idea (event trigger, reading a payload, writing to a "database," sending a response) in one afternoon. Strongest single project seed in this batch.
- **"Generate my certificate" stretch goal**: extend the above to attach a generated PDF (e.g. "Certificate of participation" with the student's name) — a fun payoff feature built on the exact PDF-blob trick shown at [0:25:02].
- **Debug-the-payload exercise**: have kids trigger a form submit, then open the raw JSON logged to the log sheet and manually find the field they need — teaches reading real data before writing code that assumes its shape, a good habit against a hallucinating AI.

### Traps a kid will hit
- Wrapping data in an extra array/object before appending to a sheet (the [0:16:00] bug) — an easy mistake when building an array to append and not being sure what shape `Object.values()` or similar already returns.
- Forgetting that permissions are requested per capability, not all at once — a script that "worked" up to the point of hitting sheet writes may suddenly throw on the send-email line the first time, and it isn't obviously a "new" bug, it's just an unauthorized capability.
- Renaming/editing form questions after wiring up code — breaks named-value lookups silently until run, a very likely mistake for kids iterating on their form design.
- Sending "a copy" of form submissions to the submitter (a Forms UI setting) can overlap/confuse with the code-based autoresponder email, causing kids to get two emails and think something's broken.

### Doesn't transfer, and why
- Nothing here is adult/business-only in flavor — a form + autoresponder + PDF is a genuinely appealing feature set for teens once reframed (e.g. "your app confirms someone joined your quest," not "confirm your TPS report"). No outdated material; matches the modern Forms/Apps Script UI.

## Honest caveats
This is the strongest, most complete video in the batch for our purposes — it's dense (27.9 min, whisper transcript, no visible padding) and worth a full watch by whoever plans the "forms -> sheet -> email" unit, not just these notes. The two on-screen bugs are genuinely instructive and not exaggerated for effect — they read as real mistakes the presenter made and fixed live.
