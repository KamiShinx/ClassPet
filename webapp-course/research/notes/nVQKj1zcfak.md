# Apps Script Create a Doc: How to create a Google Doc using Code (Laurence Svekis, 6.5 min)

**What it is:** short tutorial: creates a new Google Doc from a script, then reopens it by ID and appends content (paragraphs, horizontal rule) to its body. Pure Docs automation, little to do with web apps.
**Substance:** thin but clean: a focused two-function walkthrough (create, then update), no frontend, no HTTP.

## Ideas, in the video's order
- [0:00:34]-[0:01:10] `DocumentApp.create('doc name')` creates a brand-new Doc — the simplest possible "make a resource from a script" example in the batch, good as a first exposure to a Docs-like service before Sheets/Drive/Slides.
- [0:02:19]-[0:03:27] Getting the **ID** of a just-created doc via `doc.getId()`, then later opening the *same* doc later with `DocumentApp.openById(id)` — makes explicit the "create once, ID is the durable reference, reopen by ID later" pattern that underlies every Apps Script service in this batch (Drive, Slides, Sheets all work the same way).
- [0:03:27]-[0:04:33] Explains where to find a doc's ID manually if needed: it's embedded in the doc's Drive URL — same technique shown for folders/files elsewhere in the batch.
- [0:04:00]-[0:05:05] Introduces the **body object** (`doc.getBody()`) as the thing you actually write content into, distinct from the doc object itself — and lists available body methods (paragraph, list item, table, image, horizontal rule) via editor autocomplete on screen.
- [0:05:40]-[0:06:12] Loops to append 10 paragraphs using a template literal for dynamic content, and explicitly notes updates are **additive** — re-running the script keeps adding more paragraphs rather than replacing content, unlike the Sheets `clearContents()`+`setValues()` overwrite pattern seen elsewhere in the batch. A useful, concrete contrast to point out in class.

## What the frames add
Frames show the newly created empty Doc in Drive, the live autocomplete listing of `body.append*` methods (a good visual index of "what can I add to a Doc"), and the final doc with 10 appended paragraphs and a horizontal rule — confirms the additive behavior claimed in the narration.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Create-then-reference-by-ID as a universal Apps Script resource pattern; the distinction between a "container" object (the Doc) and its editable content object (the Body) — a genuinely reusable mental model; additive vs overwrite update semantics as something that differs per service and must be checked, not assumed.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**Auto-generated report/journal doc**: script creates a Doc per class session (or reuses one by stored ID) and appends a dated entry each time it's run — e.g. an attendance log, a running class journal, or per-student feedback notes. *Teaches: create-vs-reopen-by-ID, body vs document, additive writes.* Small but genuinely useful component — pairs naturally with a Sheets-driven trigger (e.g. "generate a doc for each row in this sheet").

### Traps a kid will hit
Confusing the Doc object with its Body — trying to call paragraph/append methods directly on `doc` instead of `doc.getBody()` will fail; the video itself makes this distinction only after first logging the (empty, useless) body object to see what it actually is. Not realizing updates are additive: a kid re-running a "generate my report" script expecting a fresh clean doc will instead get duplicated content piling up — a real, easy-to-hit trap for a kid (or an AI) that assumes all Apps Script writes behave like Sheets' overwrite pattern.

### Doesn't transfer, and why
No web request, no frontend, no deployment — a script run manually from the editor, working only with Drive/Docs resources. Doesn't teach "what is a backend" in the client/server sense at all; useful only as a Docs-API building block.

## Honest caveats
Very short (6.5 min) and simple; no outdated APIs. Good as a five-minute reference clip, not a standalone lesson.
