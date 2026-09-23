# How to Add Images from Drive and the web into Google Doc with Apps Script one click UI menu (Laurence Svekis, 11.4 min)

**What it is:** Live-build tutorial, bound script on a Google Doc: three UI-menu buttons that each insert an image at the cursor — one fetched from a web URL, two from Drive by file ID. No year overlay; APIs current.

**Substance:** thin: small demo of `UrlFetchApp`, `DriveApp`, and cursor-based insertion. Not a web app.

## Ideas, in the video's order
- [0:02:13]-[0:02:44] Standard `onOpen` + UI menu boilerplate again.
- [0:03:17]-[0:03:48] `DocumentApp.getActiveDocument().getCursor()` — gets an insertion point object; checked for existence before use.
- [0:03:48]-[0:04:54] **Web image**: `UrlFetchApp.fetch(imageUrl).getBlob()` returns the remote image as a blob; first run triggers the OAuth "review permissions" flow for external requests specifically (a distinct permission from Drive/Docs access) [0:04:54]-[0:05:27], visible on screen as the "Google hasn't verified this app" dialog at [00:09:15].
- [0:05:27]-[0:06:01] `cursor.insertInlineImage(blob)` drops the fetched image exactly where the cursor was.
- [0:06:33]-[0:08:16] **Drive image**: get the file's share link, strip it down to the bare ID (`/d/<ID>/view` -> `<ID>`), then `DriveApp.getFileById(id).getBlob()` — same insertion call as the web-image path. Shows a live copy-paste-and-trim-the-URL workflow for extracting a Drive file ID, a very concrete "this is what an ID looks like and where it comes from" demo.
- [0:08:48]-[0:09:23] Live bug: wrong method name (`getFilesById` instead of `getFileById`) throws an error, walked through and fixed on screen — realistic small-scale debugging.
- [0:09:57]-[0:10:31] Shortens the whole thing to one chained statement (`DriveApp.getFileById(id).getBlob()`) once working — a "get it working, then compress it" habit worth naming explicitly for kids working with an AI that tends to over-write.

## What the frames add
Code-editor + live Doc screen capture; the OAuth "hasn't verified this app" dialog is visible at [00:09:15] frame — same first-run friction point noted in other videos in this batch and in `5C1HY1sSHos`. No diagrams.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
`UrlFetchApp.fetch()` as "the server making its own outbound HTTP request" is a genuinely relevant backend concept (a script isn't only receiving requests, it can make them too) — worth a one-line callout if the class ever needs a project to pull data from an external URL (e.g. a public API), which fits Ben's "AI apps" ambitions better than most of this batch's other Docs videos.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Not part of the core doGet/doPost arc, but the `UrlFetchApp.fetch(url).getBlob()` pattern is worth keeping in a reference page: any project that needs the server to fetch an external image/file (e.g. pulling a profile picture by URL, or a Teachable-Machine-adjacent image-processing step) reuses exactly this call.

### Traps a kid will hit
- Two similarly-named Drive methods (`getFileById` vs a nonexistent `getFilesById`) — the video's own live typo [0:08:48] is a realistic example of an AI hallucinating a plausible-but-wrong method name; a kid needs to know to read the error message and check the actual API.
- Separate OAuth scope prompts for separate services (Drive vs external fetch vs Docs) — confusing if kids expect "accept once, done forever."
- Extracting an ID by hand-trimming a share URL is fiddly and easy to get wrong (extra slash, wrong segment).

### Doesn't transfer, and why
- Still no HTML frontend, no deployed web app, no Sheet — pure Docs-menu scripting.

## Honest caveats
This is a **Docs/Drive automation video with little to do with web apps**, aside from the reusable `UrlFetchApp.fetch()` idea. Keep the note short; the OAuth-friction and outbound-fetch points are its only exportable value.
