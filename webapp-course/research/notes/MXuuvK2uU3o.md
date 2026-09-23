# How to setup UI menu tabs Apps Script UI Alert and Prompt (Laurence Svekis, 18.9 min)

**What it is:** step-by-step tutorial, screen recording with live coding. No visible date but modern Apps Script editor UI (Extensions > Apps Script) is shown, so recent-ish (post-2020 UI move).

**Substance:** substantive for what it covers, but it is entirely inside the Sheets UI (menus, alerts, prompts), not a web app at all — no `doGet`, no HTML frontend, no client/server split. It's Apps Script scripting basics, not web-app building.

## Ideas, in the video's order
- [0:02:45] `onOpen(e)` trigger auto-runs when the spreadsheet opens; used to build a custom menu (`SpreadsheetApp.getUi().createMenu().addItem().addToUi()`).
- [0:03:52] Method chaining pattern for building menus (`.addItem().addItem()...addToUi()`), explicitly taught as "the same statement, just chained."
- [0:04:59] Menu item wires a label to a function name by string — kids must keep the string matching the function name exactly (easy typo trap).
- [0:06:05] `ui.alert(question)` shows a native blocking dialog; return value is captured synchronously into a variable — first taste of "the script waits for the user."
- [0:06:38] Button sets: `ui.ButtonSet.YES_NO_CANCEL`, `OK_CANCEL`, etc. — customizing dialog buttons.
- [0:07:43] Reading back which button was pressed via `ui.Button.YES` / `.NO` / `.CANCEL` / `.CLOSE` comparison — a small state machine of if/else-if.
- [0:11:02] `ui.prompt(question, buttonSet)` — like alert but also collects free text; response has both `.getSelectedButton()` and `.getResponseText()`.
- [0:14:55] Adds input validation: reject empty text (`message.length > 0`).
- [0:15:27] Refactors into a recursive-style loop: a `checker(ui)` function that calls itself again if input is invalid, otherwise returns the valid message (generic pattern: "keep asking until valid," reusable idea, but implemented as blocking recursive calls, not a real loop — could recurse a lot if user retries many times; not flagged as a risk in the video).
- [0:18:15] Wrap-up: says to make your own version — generic (task, not concept).

## What the frames add
Screen recording of the Apps Script editor and native Sheet dialog boxes (small white modal windows with OK/Cancel/Yes/No buttons layered over a grey spreadsheet). Frames [0:06:30]-[0:11:30] show the actual alert/prompt popups appearing over the sheet — useful as a visual for "this only works inside a Google Sheet, it's not a web page." Frame [0:11:15]-[0:11:30] shows Apps Script autocomplete listing `LanguageApp`, `LinearOptimizationService`, `LockService`, `Logger` — a glimpse of the wider Apps Script service catalog, incidental. No diagrams, no architecture visuals. Code is legible in most frames (small font but readable at zoom).

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Triggers (`onOpen`) — event-driven code, useful analogy for "the server runs this automatically when something happens," a real backend idea even though delivered via a Sheets menu, not a web app.
- Synchronous request/response with a human: `ui.alert()`/`ui.prompt()` block until the user responds and the value comes back into the script — a gentle, ungraded way to introduce "the code waits for a response" before jumping to async `fetch`.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- A 15-minute warm-up exercise (not a real project): "build a custom Sheets menu that greets you by name using a prompt loop." Good for day-1 Apps Script familiarity before touching `doGet`/web apps. Teaches trigger + UI object + control flow without deployment, permissions, or HTML.

### Traps a kid will hit
- [0:04:59] String-matched function names in `addItem(label, functionName)` — a typo breaks the menu silently (no error until clicked).
- [0:16:xx] The recursive `checker()` retry pattern: a kid (or Gemini) could build an infinite-recursion bug if they don't understand that each rejected prompt is a new function call, not a loop iteration.
- Authorization/consent screen (implied by other videos in batch, not shown here) will appear the first time any script touches services — not covered in this video specifically.

### Doesn't transfer, and why
- The entire lesson (menus, alerts, prompts, sidebars) is Sheets-native UI, not a deployed web app — none of it involves `doGet`, HTML frontend, JSON, or a URL kids can share. It's useful only as a first taste of Apps Script syntax and triggers, not as a building block for the class's actual web-app projects.

## Honest caveats
Thin relative to the class's actual goal (client/server web apps): zero web-app content. Treat as an optional Apps Script warm-up, not core curriculum. No outdated APIs; UI shown matches current Apps Script editor.
