# Add Date into Google Doc at cursor Google Apps Script Lesson with Source Code (Laurence Svekis, 8.3 min)

**What it is:** Short live-build tutorial, bound script on a Google Doc: one UI-menu button inserts a formatted current date at the cursor. No year overlay; APIs current.

**Substance:** thin: smallest video in the batch, a single-feature demo, reusing the same boilerplate as the batch's other Docs videos.

## Ideas, in the video's order
- [0:00:34]-[0:02:48] Same `onOpen` / `createMenu` / `addItem` / `addToUi` pattern seen repeatedly in this batch — by this point in the batch it's clearly Svekis's fixed template for any "add a button to a Google Doc" lesson.
- [0:02:48]-[0:03:21] Clicking a menu item before its handler function exists throws a clean, informative error — a good "this is what happens when you wire up a button to nothing" demo.
- [0:03:21]-[0:05:00] `DocumentApp.getActiveDocument().getCursor()`, then `cursor.insertText(string)` — simplest possible cursor-insertion example, good as a first exposure before the image-insertion videos in this batch.
- [0:05:00]-[0:06:36] First-run OAuth walkthrough shown in detail: "Google hasn't verified this app" -> Advanced -> "Go to (project name)" -> permissions list -> Allow, plus a mention that permissions can be revoked later at myaccount.google.com/permissions. This is the clearest, most complete narrated walkthrough of the OAuth consent flow in the batch — better than the other videos' quicker mentions of the same screen.
- [0:06:36]-[0:07:43] Swaps the hardcoded string for `Utilities.formatDate(new Date(), timezone, 'yyyy-MM-dd')`, trimming the format string down to just date (no time/timezone shown) — small, reusable date-formatting fact.

## What the frames add
Code-editor + live Doc screen capture; frame [00:03:15] and [00:03:30] literally show empty function bodies mid-edit rather than a documented mistake, and the OAuth dialog sequence is fully visible across [00:05:00]-[00:06:00]-equivalent frames (matches the transcript's description). No diagrams.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
None specific to a backend/web app — cursor insertion and date formatting are Docs-scripting basics, not client/server concepts.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Not a project seed on its own. Its real value for the course is **the OAuth consent-screen walkthrough** [0:05:00]-[0:06:36] — worth lifting near-verbatim into a class reference slide/handout on "the first time you run your own script, here's the scary-looking screen and why it's normal," since every kid building any Apps Script project (web app or not) will hit this exact flow in their first session.

### Traps a kid will hit
- Wiring a menu item to a function name that doesn't exist yet — throws immediately, a mild but very common early mistake, well demonstrated here [0:02:48].
- The "Google hasn't verified this app" screen reads as an error/danger to a first-time user; without the explanation this video gives, a nervous 14-year-old might not click through.

### Doesn't transfer, and why
- No frontend beyond the Doc's own UI, no server endpoint, no Sheet, no deployment — entirely local Docs scripting.

## Honest caveats
This is a **Docs automation video with nothing to do with web apps**. Its only reusable asset for the course is the OAuth-consent-screen explanation, which is worth reusing as reference material regardless of the video's own (non-web-app) content.
