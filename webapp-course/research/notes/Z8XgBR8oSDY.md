# How to Start with Google Apps Script: Getting Started with Google Apps Script for Workspace (Laurence Svekis, 8.7 min)

**What it is:** Editor/dashboard orientation tour — script.google.com dashboard, new-project creation, editor panes, logging, running code. Tutorial, not a build.
**Substance:** mixed: useful as a map of the tool, but mostly a narrated click-through with little conceptual content.

## Ideas, in the video's order
- [0:01:06] `script.google.com` dashboard: My Projects / All Projects / Shared with me / Deleted / Automation (triggers + executions/error log) — worth knowing this exists as the "control panel" separate from any one file.
- [0:02:11] Standalone project creation from the dashboard vs. bound scripts (covered elsewhere) — the two-ways-to-start distinction restated.
- [0:03:17] Multiple files per project: `.gs` script files or `.html` files, all linked together and able to call each other — this is the multi-file structure kids will use for HTML/CSS/JS + server code.
- [0:03:50] Libraries: a script project's functions can be reused in other projects via a Script ID — mostly irrelevant for teens but worth knowing it exists.
- [0:04:23] Adding Google services (advanced services / APIs) directly to a project, e.g. YouTube, Tasks — extends what Apps Script can call.
- [0:05:29] Logger/console for output; `Logger.log()` vs `console.log()` both usable, with an explanation that logs stream in real time (minor correction to earlier videos which only mention Logger).
- [0:06:02] Run vs Debug: Debug opens a debugger panel in addition to running (useful, not covered elsewhere in this batch as clearly).
- [0:07:08] Apps Script's JS is "similar to JavaScript" — variables, strings/numbers/booleans, arrays, objects, conditionals, array methods, for loops — basically confirms Apps Script IS JavaScript with Google's classes layered on top (good to say explicitly to kids coming in nervous about "a new language").

## What the frames add
Frames show the dashboard tabs (Starred/My Projects/Shared/Deleted, Automation), the new-project editor's Overview/Triggers/Executions/Project Settings tabs, the Add Library and Add Service dialogs (with a scrollable list of services like YouTube Analytics/Data API, Tag Manager, Tasks), and code-completion/debugging UI (breakpoints panel, "const" autocomplete). Confirms the tour is comprehensive of the whole editor chrome, which is worth a quick class demo but not a deep-dive source.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Almost none directly — this is IDE orientation, not client/server/API concepts. The one useful idea: multiple linked files (`.gs` + `.html`) in one project is literally the shape of an Apps Script web app (frontend HTML file(s) + backend `.gs` file(s)), worth pointing at explicitly even though the video doesn't build a web app here.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **"Tour the editor" 10-minute walkthrough** at the very start of the course: create a project, add a second `.gs` file and an `.html` file, run/debug a trivial function, look at the Triggers and Executions tabs. Not a project by itself, but a good literal first-day activity so the editor isn't a total mystery later.

### Traps a kid will hit
- None new shown here (no code is actually broken in this video) — it's a features tour, not a build.

### Doesn't transfer, and why
- Libraries and most advanced Google services (Tag Manager, Tasks, YouTube Analytics) are enterprise/adult-tool territory — skip explaining these to teens; only Sheets/Forms/Docs/Translate/URL Fetch are likely relevant.

## Honest caveats
This is the thinnest video conceptually in the batch — a menu tour with light narration, useful once as reference but shouldn't be assigned as "watch this to learn Apps Script." No outdated UI concerns; matches current Apps Script editor (Monaco-based, modern).
