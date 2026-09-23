# How to Create a Bound script within Google Workspace: Creating a Bound Script (Laurence Svekis, 7.2 min)

**What it is:** Focused tutorial on bound scripts specifically: what they are, how they differ from standalone scripts, and building a custom spreadsheet UI menu with `onOpen`.
**Substance:** substantive for its narrow scope: clear before/after demo of adding a working menu to a spreadsheet.

## Ideas, in the video's order
- [0:00:00–0:00:35] Bound scripts behave like standalone scripts but live inside a parent container (a Sheet/Doc/Slide/Form) and get special triggers like `onOpen`, letting you add UI (e.g. a menu) that runs code without opening the script editor.
- [0:01:43] Bound scripts do **not** appear in Drive as their own file (same point made in the JSrK4uHdVlQ video — the two videos agree, good sign of consistency) and cannot be detached from their container once created.
- [0:02:50] Bound scripts still show up in the script.google.com dashboard, just with a different icon (container icon + script icon) to distinguish them from standalone scripts.
- [0:03:21] `onOpen` is a special/reserved trigger function that runs automatically whenever the bound document is opened — first appearance in this batch of an event-driven ("this runs when X happens") pattern rather than manually clicking Run.
- [0:03:54] Building a custom menu: `SpreadsheetApp.getUi()` -> `.createMenu(label)` -> `.addItem(displayLabel, functionName)` (display label and function name don't have to match) -> `.addToUi()`.
- [0:04:25] `ui.alert(...)` for simple pop-up dialogs triggered by menu clicks — simplest possible user-facing feedback mechanism, good for beginners before building real HTML UI.
- [0:05:33] Editor productivity features (right-click/keyboard shortcuts): peek definition, find references, rename symbol, format document, command palette — not backend concepts, just IDE tips (generic).

## What the frames add
Frames confirm the actual menu appearing in the spreadsheet toolbar after running the `onOpen`-building code, and the two alert dialogs popping up when "test1"/"test2" are clicked — visual proof the custom UI works, useful for a demo screenshot. Also shows the right-click context menu with Peek/Go to Definition/References etc. Nothing not already in the transcript.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- **Event-driven triggers (`onOpen`)**: first clean example in the batch of "code that runs automatically when something happens" rather than manual execution — an important backend/automation concept (the sheet equivalent of a server responding to an event) and a stepping stone toward the form-submit trigger used in the I2r5vJAA8T0 video.
- **Custom UI is optional sugar over the same backend functions**: `ui.alert` calling a plain function is a simple example of "UI triggers server logic," a miniature version of the client-calls-server idea before introducing `google.script.run` or HTML forms.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Custom menu mini-tool**: add a menu to a shared class spreadsheet ("Class Tools" > "Shuffle groups" / "Clear my row") that runs a function via `onOpen` + `createMenu`. Good small warm-up project that feels like "I added a real feature to Google Sheets," concrete and completable in one session, and teaches event triggers + simple UI feedback (`ui.alert`) before jumping to HTML-based web apps.

### Traps a kid will hit
- Forgetting `onOpen` only exists / only auto-runs in **bound** scripts, not standalone ones — a kid mixing the two script types (as taught in earlier videos) may wonder why their menu never appears.
- Menu doesn't show up until the script has been run/authorized once, or the sheet is reopened — confusing "I wrote the code but nothing happened" moment tied to needing a fresh document load to fire `onOpen`.
- addItem's two string parameters (button label vs. function name) look similar and are easy to swap or misalign, causing "wrong function runs" bugs.

### Doesn't transfer, and why
- Nothing here is out of scope; menus/alerts are a fine, safe UI primitive appropriate for teens (arguably safer/simpler than full HTML dialogs for a first activity).

## Honest caveats
Clean and consistent with the other Svekis videos on bound-vs-standalone terminology (JSrK4uHdVlQ makes the same claims) — a good reinforcing pair rather than a contradiction. The editor-shortcuts section at the end is generic IDE trivia, not backend content; can be skipped when reusing this material.
