# Common Coding Examples for Google Apps Script Files and Folders Google Apps Script Images and Files (Laurence Svekis, 27.0 min)

**What it is:** Live-build "cookbook" tutorial, standalone script (not bound to any doc/sheet): a grab-bag of core Drive/Sheets/Docs operations — create a sheet, create a folder, move files between them, fetch a web image and insert it into a sheet or a doc, copy a Drive image into a sheet/doc. No year overlay; APIs current.

**Substance:** thin-to-mixed: no single narrative, just back-to-back small examples strung together ("core basic functionality... then images"). Useful purely as a reference for individual API calls, not as a project or backend concept.

## Ideas, in the video's order
- [0:02:13]-[0:03:18] `SpreadsheetApp.create('name')` makes a brand-new spreadsheet from scratch (not opening an existing one) — a fact not shown elsewhere in this batch, useful if a project needs to programmatically create its own data store.
- [0:03:52]-[0:05:00] `DriveApp.createFolder('name')` — same "create, don't just open" pattern for folders.
- [0:05:35]-[0:08:20] `DriveApp.getFileById(id).moveTo(folder)` — moves a file/sheet into a folder; refactored live down to one chained statement, another "get it working, then compress it" moment like `mZIQZIGHoGU` in this batch.
- [0:09:26]-[0:12:38] `ss.getSheets()[0]` to grab "whichever sheet is first" rather than by name, `sheet.getName()`, `sheet.appendRow([1,2,3,4,5])` — basic Sheets-writing vocabulary.
- [0:12:38]-[0:16:29] **Web image into a Sheet**: `UrlFetchApp.fetch(url).getContent()` (binary data, not `.getBlob()` this time) -> `Utilities.newBlob(data, 'image/png', 'name')` -> `sheet.insertImage(blob, col, row)`. Two calls at different cells demonstrate images "float" over cells rather than sitting inside them [0:15:57] — a small but concrete gotcha about how Sheets handles inserted images.
- [0:16:29]-[0:18:43] Same web image saved as an actual Drive **file** (`DriveApp.createFile(blob)`) rather than just inserted into a sheet, then moved into the earlier folder — shows the same blob being used three different ways (inserted into a sheet, saved as a file, later inserted into a doc), a good "one blob, many destinations" mental model.
- [0:19:16]-[0:21:32] Drive-sourced image (by file ID) inserted into a sheet via `.getBlob()` instead of a fresh fetch — contrasts with the web-fetch path just shown.
- [0:22:04]-[0:23:41] `DocumentApp.create('name')` — same "create from scratch" pattern applied to Docs, then moved into the folder exactly like the sheet was.
- [0:24:00]-[0:25:30] **Real bug hit live**: `body.insertImage(blob)` throws "parameters don't match the method signature" [frame 00:25:30] because `insertImage` on a Doc body needs a **child index**, unlike a Sheet's `insertImage(blob, col, row)` — fixed by adding an explicit index (`body.insertImage(5, blob)`). Good concrete example of "the same-sounding method means something different on a different object," and of reading the actual error message to fix an AI-plausible-but-wrong call.
- [0:25:45]-[0:26:45] Adds several paragraphs first so the image has somewhere to land at index 5, confirms the same blob can be inserted multiple times at different indices.

## What the frames add
Wall-to-wall code-editor + live Sheet/Doc/Drive screen capture across all 7 sheets; the OAuth "Google hasn't verified this app" dialog appears again [00:03:15, 00:14:00] (now the fourth time in this batch); the live error dialog for `insertImage`'s wrong signature is clearly visible [00:25:30] — a good screenshot for a "read the error" teaching moment. No standalone diagrams.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
None specific to a web app/backend — this is a pure "how do Drive/Sheets/Docs objects work" reference reel, useful vocabulary but no client/server/request material at all.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Not project-shaped on its own; it's better used as a **teacher reference sheet** ("if a kid's project needs to programmatically create a sheet/folder/doc, or insert a fetched image into one, here are the exact calls and their gotchas") than as an assigned video.

### Traps a kid will hit
- **Same-named methods behaving differently per object type** (`insertImage` on a Sheet takes col/row; on a Doc body it takes a child index and throws a signature-mismatch error otherwise) [0:24:00]-[0:25:30] — a strong, concrete example of why kids (and their AI) can't assume an API call works the same way everywhere; worth reusing this exact error as a class example of "read the error message, don't just guess a fix."
- Inserted images in Sheets float over cells rather than living inside them — cosmetically confusing if a kid expects an image "in" a cell.
- Fourth OAuth "hasn't verified this app" prompt in this batch — reinforces that this is normal and expected, not a one-off.
- `getContent()` (raw binary) vs `getBlob()` (already-typed blob) used interchangeably across the video's own examples without ever explaining the difference — a kid copying one pattern into a context that needs the other will hit a silent type mismatch.

### Doesn't transfer, and why
- No HTML frontend, no deployed endpoint, no doGet/doPost — entirely local object-model scripting across three Google apps (Sheets, Docs, Drive), run manually from the script editor.

## Honest caveats
This is a **Docs/Sheets/Drive "cookbook" video with nothing to do with web apps** — no client, no server, no deployment, and no unifying project. Its only real value is as an API-quirks reference (the `insertImage` signature mismatch is the standout, reusable teaching moment); don't assign the full 27 minutes.
