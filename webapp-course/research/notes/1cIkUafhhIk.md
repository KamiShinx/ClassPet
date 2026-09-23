# Learn Google Apps Script Image and PDF Uploads to Google Drive Folder using Web App Script (Laurence Svekis, 39 min)

**What it is:** live-build tutorial, no visible year markers but modern legacy-editor UI; builds a full client-to-server file upload web app step by step.
**Substance:** substantive: a real, complete request/response build with actual bugs hit and fixed on screen, not just a finished demo.

## Ideas, in the video's order
- [0:00:00] Demo first: pick a file in a web app, click upload, it lands in a Drive folder and returns a link — sets the target before building.
- [0:01:37] Names the whole pattern up front: frontend `FileReader` reads the file, sends base64 + mime type + filename to Apps Script, which builds a Blob and writes it to Drive.
- [0:04:59]-[0:05:31] Develops the frontend HTML/JS in VS Code and just drags the file into a browser tab to test — no server needed for pure client-side JS, only for the Apps Script call (generic workflow tip, but genuinely useful habit).
- [0:09:18]-[0:10:58] Explains `FileReader` as a real Web API: `onload` fires after an async read completes, `readAsDataURL` turns the file into a base64 data URL — one of the better plain explanations of a real async browser API in the batch.
- [0:13:41]-[0:14:16] Hits a real bug live: `files` input returns an array-like `FileList` even for one file; forgetting `[0]` throws. Good authentic debugging moment.
- [0:18:08] Introduces `google.script.run.withSuccessHandler(success).doUpload(data)` as the client→server call pattern — the core "how a browser talks to Apps Script" mechanic.
- [0:20:20]-[0:21:03] Shows manually parsing the data-URL string (`data:image/jpeg;base64,....`) with `substring`/`indexOf` to split mime type from payload — fragile string-hacking, flagged by video itself as needing more work later.
- [0:23:43]-[0:24:15] Live permissions dialog: explains the OAuth-style consent screen naming exactly what scopes (edit/create/delete Drive) the script is requesting — a good moment to show kids "the browser is asking on your behalf."
- [0:24:15]-[0:31:03] A genuinely long live-debug sequence: error because Apps Script doesn't know the blob's mime type, so the data gets restructured into a proper `{fileName, mimeType, data}` object on the client and decoded with `Utilities.base64Decode` + `Utilities.newBlob` on the server. This is the best "AI/human debugging in real time" material in the batch (see traps).
- [0:36:29] Small but real UX bug: link opens in the same framed Apps Script page; fixed with `setAttribute('target','_blank')` (also catches a typo: `attributes` vs `attribute`).
- [0:37:36] Deployment: new deployment as a Web App, access restricted to "only myself" — explicit privacy choice shown on screen.
- [0:38:42] Ends with a concrete, easy extension: validate `mimeType` server-side to restrict allowed file types (a real, simple security/validation lesson).

## What the frames add
Frames are essential here, not decorative: they show the actual code being typed (index.html, Code.gs split panes), the live error banners in the execution log/console, the OAuth consent screens step by step [0:23:00-0:24:00 region], and the final working upload with a hyperlink appearing on the page [0:35:00-0:38:00]. Confirms this is a real screen-recorded build, not a cut demo — errors are visibly debugged, not edited out.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Client/server split via `google.script.run`; asynchronous callbacks (`withSuccessHandler`); binary data over the wire as base64; server creating a file (Blob → Drive file) from client-supplied data; OAuth consent/scopes shown honestly; deploying a web app with an access-level choice (private vs shared).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**Photo/PDF drop box**: kids build a page with a file picker and upload button; Apps Script saves the file to a named Drive folder and returns a shareable link, shown on the page. *Teaches: FileReader/base64, google.script.run request/response, Blob creation, permissions.* Natural pairing later with Teachable Machine: same upload UI but sending an image for classification instead of storage.

### Traps a kid will hit
- Treating `input.files` as a single File instead of a FileList (`.files[0]`).
- Sending raw base64 with no separated mime type, then the server not knowing what to do with it — a strong real example of "weak AI writes code that looks done but silently fails at the data-shape boundary," worth flagging per CONTEXT.md's note about a weak/forgetful AI: this bug was **exactly** the kind of thing a kid pasting a Gemini-generated snippet won't catch without testing.
- `google.script.run` calls are fire-and-forget from the caller's perspective — nothing happens synchronously; kids must understand `withSuccessHandler` runs later, asynchronously.
- Iframe sandboxing making links open "stuck" inside the Apps Script frame unless `target="_blank"` is set.
- Must re-accept permissions every time new scopes (e.g. sending, writing) are added — not just once.

### Doesn't transfer, and why
Nothing structural doesn't transfer — this is squarely in-scope web-app content. The manual base64/data-URL string-slicing shown early [0:20:20] is a fragile technique the video itself replaces with a cleaner object-based approach by the end; teach the final version, not the first attempt.

## Honest caveats
Long (39 min) and includes a lot of real-time typos/backtracking — good for showing authentic debugging but should be shown in excerpts, not full-length, to a class. No mention of file-size/quota limits for uploads (Apps Script has practical limits on `UrlFetchApp`/content size) — not addressed at all.
