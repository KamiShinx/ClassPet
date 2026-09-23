# Google DriveApp Example: List Files in Folder from Drive (Laurence Svekis, 5.7 min)

**What it is:** short tutorial: script that opens a Drive folder by ID and iterates through its files, logging names/URLs. Pure Drive automation, little to do with web apps.
**Substance:** thin but clean: one focused API pattern, no frontend, no HTTP request.

## Ideas, in the video's order
- [0:00:35]-[0:01:43] `DriveApp.getFolderById(id)` then `.getFiles()` returns a **FileIterator**, not a plain array — an important, correctly-explained distinction from a regular JS array.
- [0:03:22]-[0:03:58] The iterator pattern: `while (files.hasNext()) { const file = files.next(); ... }` — a clean, reusable explanation of the iterator interface, useful beyond Drive (also appears with Slides in `Mfhx8wPJLe4`).
- [0:03:58]-[0:04:33] Shows several `file.` methods (getName, getId, getDownloadUrl, getDescription, getOwner) as a quick tour of what metadata is available per file.
- [0:05:05] Notes explicitly that different files can share the same display name but are still distinct objects (distinguished by ID) — a small but real "name ≠ identity" lesson worth reusing.

## What the frames add
Frames show the Drive folder with real files, the folder-ID lookup from the Drive URL, the permission consent screen, and the Logger output listing file names/download URLs — confirms the folder actually has files with duplicate names, matching what the narration claims.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
The iterator pattern (`hasNext()`/`next()`) as an alternative to array loops — useful to contrast with the array-based patterns taught elsewhere in this batch; getting a resource "by ID" from the URL, a technique reused constantly across all these Apps Script services (Drive, Sheets, Docs, Slides all use the same `getXById(id)` idiom).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**Class file gallery**: list all files in a shared Drive folder (e.g. project submissions) with names and links, shown in a simple web page. *Teaches: iterators, folder/file IDs, connecting Drive data to a page (extend with a `doGet` + HTML to actually display it, since this video itself only logs to the console).* Minor project, useful as a component of something larger (e.g. a submission gallery) rather than a standalone milestone.

### Traps a kid will hit
Treating `getFiles()`'s return value as an array (`.forEach`, `.length`) will fail — it's an iterator, must use `hasNext()`/`next()`. Getting the folder ID wrong (must be copied precisely from the Drive URL) is a very easy manual-entry mistake for a 14-year-old.

### Doesn't transfer, and why
No web request, no deployment, no frontend — purely a script logging to the console. Doesn't teach "what is a backend"; useful only as a small Drive-API building block for a later web-app project.

## Honest caveats
Thin (5.7 min), single technique, no UI. Nothing outdated.
