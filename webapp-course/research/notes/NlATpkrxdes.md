# Google Apps Script How to Create a WebApp File Upload to Drive (Laurence Svekis, 24.1 min)

**What it is:** Long hands-on tutorial building a client-side file-upload form that sends a file to Apps Script, which saves it to Drive and logs it to a Sheet.
**Substance:** substantive: full working feature built and debugged on screen, including a real bug fix.

## Ideas, in the video's order
- [0:00:34] Client picks a file, JS reads it, and calls `google.script.run...adderFile(obj)` — NOT `fetch()`/doPost. This is Apps Script's own RPC bridge, only usable when the HTML page is itself served by that same Apps Script project.
- [0:02:46] `HtmlService.createHtmlOutputFromFile('upload')` — separate html file for the upload form.
- [0:05:04]–[0:06:09] Client JS listens for form submit, calls `e.preventDefault()` so the page doesn't reload — the "AJAX-style" pattern kids need for any interactive form.
- [0:08:27] Server function `adderFile(data)` gets the file via `DriveApp.getFolderById(id).createFile(blob)`.
- [0:11:14]–[0:12:57] Client converts the picked file into a base64 data URL with `FileReader`, then sends `{fileName, mimeType, data}` as a plain object to the server — the *only* way to move binary-ish data through `google.script.run`.
- [0:14:37] Live bug: forgot to strip the `data:image/png;base64,` prefix before decoding — had to `split(',')` the result. Real, useful trap for any file-upload feature.
- [0:14:37]–[0:15:42] Server: `Utilities.newBlob(Utilities.base64Decode(data.data), data.mimeType, data.fileName)` reconstructs the file server-side.
- [0:17:53] Server returns a response object (`{url, name}`) back to client on success; client builds a clickable link from it — shows a full round trip with a rich return value, not just a string.
- [0:20:38]–[0:22:59] Also appends a log row to a Sheet (`url`, `name`, `mime type`, `file id`) every time a file is uploaded — same "Sheet as a log/database" pattern useful elsewhere.

## What the frames add
Console/devtools panels at [0:16:15] and [0:17:15] show the real client-side error ("Uncaught at adderFile") and the object being logged before the fix — genuinely useful for showing kids what a JS console error looks like mid-debug, not just clean finished code. [0:17:30] shows the successfully uploaded JS-logo image previewed inside Drive.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Client → server data transfer via `google.script.run`, distinct from a JSON API called with `fetch()`. Important to name this distinction explicitly: this pattern only works while the frontend lives *inside* the Apps Script web app, and will NOT work once the class moves the frontend to Netlify for the final project (that needs doPost + fetch + CORS instead).
- Binary data (a file) has to be base64-encoded to cross the client/server boundary — a very concrete "why can't I just send the file" lesson.
- Server-side response objects flow back to a named client callback (`withSuccessHandler`).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "submit your meme" or "photo drop" mini-project: kids upload an image from the browser, it lands in a shared Drive folder and gets logged (uploader name, timestamp, file link) to a Sheet — same shape as a class poll, but with files. Good bridge between "simple form" and "real user-generated content" project.

### Traps a kid will hit
- Forgetting to strip the base64 data-URL prefix (`data:image/png;base64,`) before decoding — the video itself hits this.
- `google.script.run` has no return value on the calling line — kids will try `let x = google.script.run.foo()` and be confused it's undefined; must use `withSuccessHandler`.
- Needing to specify or create the Drive destination folder id ahead of time.
- First-run permission prompts (Drive scope) will interrupt kids mid-lesson.

### Doesn't transfer, and why
This is entirely `google.script.run`-based, which is Apps-Script-only magic — it does not exist when the frontend is hosted elsewhere (Netlify). For the class's stated end goal (frontend on Netlify calling an Apps Script doPost/JSON endpoint), this specific RPC mechanism is a dead end and needs to be flagged to kids as "the version that only works while your page is hosted inside Apps Script."

## Honest caveats
No doGet/doPost/ContentService JSON anywhere in this video — despite matching our batch's stated backend focus on paper, the actual mechanism (`google.script.run`) is a different, Apps-Script-proprietary channel, not a generic client/server HTTP request. Worth teaching, but must be clearly labeled apart from the doPost/fetch pattern the final project needs.
