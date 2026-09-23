# Apps Script PDF from Slides: How to Generate PDF files from Google Slides (Laurence Svekis, 24 min)

**What it is:** tutorial: converts a Slides presentation to PDF, emails it as an attachment, and separately loops through slides to generate one PDF per slide. Pure Slides/Drive/email automation, little to do with web apps.
**Substance:** substantive: a real multi-step build with live debugging, but entirely server-side batch processing — no frontend, no HTTP request/response.

## Ideas, in the video's order
- [0:03:48]-[0:04:57] `DriveApp.getFileById(id).getBlob()` converts a Slides file to a Blob — the recurring "everything becomes a Blob" pattern for cross-format conversion in Apps Script (also used for file uploads in `1cIkUafhhIk`).
- [0:05:58]-[0:07:48] `DriveApp.createFile(blob)` from that blob automatically produces a PDF (Google infers the conversion from context) — a slightly "magic" behavior worth explaining explicitly rather than leaving as implicit.
- [0:07:48]-[0:08:53] Can create the file inside a specific folder instead of Drive root by getting the folder object first — same `getFolderById` pattern reused across the whole channel.
- [0:09:58]-[0:11:04] `file.getAs('application/pdf')` explicitly requests the PDF representation as an object/blob — contrasted with just creating a file from the blob directly; shows there are two related-but-different ways to get "a PDF."
- [0:11:38]-[0:12:46] `MailApp.sendEmail(email, subject, body, {attachments: [file.getAs(MimeType.PDF)], name: 'My PDF'})` — the batch's clearest example of an **options object** as the 4th parameter pattern, useful to reuse when explaining "some functions take a plain object of extra settings."
- [0:14:23]-[0:14:57] `file.setTrashed(true)` removes the Drive copy after emailing it — a real "clean up after yourself" step, good to note as a habit.
- [0:15:32]-[0:22:21] The multi-slide-PDF loop is the most complex, most instructive debugging sequence in the batch: opens the deck via `SlidesApp`, creates a **temporary holder file**, appends each slide into the holder one at a time, generates a PDF from the holder, then must **remove the previous slide from the holder before the next iteration** (or slides accumulate). Hits and fixes two real bugs live: (a) calling `getFolderById` where `getFileById` was needed [0:19:58]-[0:21:07], (b) forgetting to call `.saveAndClose()` on the holder before reading its blob, so the file appeared empty [0:21:07]-[0:22:21].
- [0:22:56] Off-by-one fix: uses `index + 1` so generated files are named "slide1.pdf", "slide2.pdf" instead of starting at 0 — same class of index math trap as in `gWO1wU-gDRI`/`OuchTYb0vYY`.

## What the frames add
Frames are essential to following the multi-slide loop: they show the temporary "holder" presentation window flashing between different slide contents as the script iterates [0:14:45]-[0:15:30], the live "did it actually generate content or is it blank" check [0:20:30]-[0:21:00], and the final three separate PDF files each matching one slide's design [0:23:30]-[0:24:15]. Also shows the OAuth consent screen for Slides access specifically (separate scope from Drive) at [0:13:15]-[0:13:45].

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Cross-service orchestration (Slides → Blob → Drive → Gmail all working together); the idea of a temporary/scratch resource used mid-process and cleaned up; options objects as a parameter pattern; the general shape of "batch server-side jobs" as opposed to request/response web apps.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**Certificate/report generator**: fill in a Slides template with each student's name (via find/replace, not shown here but a natural next step), convert to PDF, and email it. *Teaches: Blob conversion, cross-service Apps Script orchestration, options-object parameters, cleanup.* Good end-of-unit or club-style project (e.g. auto-generating certificates for a class event) — high "wow" factor, moderately complex, best attempted after kids are comfortable with basic Apps Script services individually.

### Traps a kid will hit
Calling the wrong `getXById` service method (Folder vs File) is an easy copy-paste mistake, and the error message doesn't clearly say which — a strong, concrete example of "AI-written code that looks plausible but calls the wrong method name," exactly the class of bug CONTEXT.md flags for a weak/forgetful AI: a kid pasting AI-generated Apps Script with a `getFolderById`/`getFileById` mixup will see a real runtime error but may not know how to read it. Forgetting `.saveAndClose()` before reading a document/presentation object's contents — state changes made via the API aren't guaranteed persisted until explicitly saved; a real and non-obvious trap that could easily eat a lot of debugging time. Accumulating state in a reused "holder" object across loop iterations if not explicitly cleared each time — a subtle bug class (mutable shared state across iterations) that's genuinely hard for beginners (and a weak AI) to reason about.

### Doesn't transfer, and why
No web request/response, no frontend, no deployment as a web app — entirely a script run manually from the editor. Not useful for "what is a backend," but a good example of "a backend doing real work on scheduled/batch jobs," which is a legitimate but different concept worth distinguishing explicitly from request-driven web apps.

## Honest caveats
Long (24 min) with two separate live bugs that take real time to resolve — valuable but should be shown as an edited "watch the human find the bug" clip, not full-length, if used for the batch's "AI-assisted building" material (note: no AI tool is actually used in this video — Laurence hand-writes all the code, so it's not directly evidence of *AI-assisted* building despite being good debugging material).
