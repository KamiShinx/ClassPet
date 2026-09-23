# How to Copy All Images from Doc into your Google Drive apps script blob file creator (Laurence Svekis, 7.6 min)

**What it is:** Short live-build tutorial, bound script on a Google Doc: adds a UI menu button that extracts every image embedded in the doc and saves each as a separate file in a Drive folder. No year overlay; APIs current.

**Substance:** thin: a small, single-purpose utility script. Useful only as a blob-handling reference, not as web-app material.

## Ideas, in the video's order
- [0:01:23]-[0:02:21] Same `onOpen` + custom UI menu boilerplate as the other Docs videos in this batch.
- [0:02:47]-[0:03:45] `doc.getBody().getImages()` returns all inline images in the doc as an array — the one doc-specific API fact here.
- [0:04:12]-[0:04:40] `DriveApp.getFolderById(folderId)` selects the destination folder (created manually beforehand, ID copied from its URL) — same "copy the ID from the URL" habit seen across this whole batch.
- [0:04:40]-[0:06:12] Loop images, `image.getBlob()`, `.copyBlob()` (don't mutate the original), `.setName('image' + (index+1))`, and manually appends a `.jpg` extension + sets content type from it. `folder.createFile(blob)` writes it to Drive.
- [0:06:42] Demonstrated live: adding a new web image into the doc and rerunning picks it up automatically — confirms the loop is driven by the doc's current state, not hardcoded.

## What the frames add
Code-editor + live Doc/Drive screen capture only; no diagrams. Nothing beyond transcript.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
None specific to backends/web apps — this is local Drive file manipulation triggered from a doc's menu, no request/response cycle at all.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Not a good fit for the app-building arc directly. The one transferable fragment is the **blob pattern** (`fetch a resource -> get it as a blob -> attach a content type -> save/send it`), which recurs in the batch's bigger video (S9's `5C1HY1sSHos`) for PDFs/emails and would be useful if a later project needs to handle uploaded images (e.g. with Teachable Machine).

### Traps a kid will hit
- Forgetting `.copyBlob()` and mutating/reusing the same blob object across a loop (the video does remember to call it, but doesn't explain why it matters) — worth a one-line explanation if reused in class ("each file needs its own copy of the data").
- Manually appending file extensions/content types rather than reading them from the source — brittle if the source image isn't actually a JPEG, though the video doesn't hit this bug live.

### Doesn't transfer, and why
- No HTML frontend, no server endpoint, no Sheet involved — it's Drive/Docs object-model scripting exclusively.

## Honest caveats
This is a **Docs/Drive automation video with nothing to do with web apps** — no client, no server, no deployment. Skip for the main sequence; only the generic "blob" concept is worth a passing mention.
