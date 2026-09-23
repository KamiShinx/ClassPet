# Google sheet UI: add Menu Items with Google Apps Script Coding (Laurence Svekis, 6.3 min)

**What it is:** short tutorial: building a custom Sheets menu with multiple items, each running a different function that shows a toast popup. Pure Sheets UI automation, little to do with web apps.
**Substance:** thin: one short, simple pattern repeated three times (test1/test2/test3), no real app built on top of it.

## Ideas, in the video's order
- [0:00:00]-[0:00:34] Explains the target pattern up front: an array of `{name, functionName}` objects becomes menu items, each wired to run a corresponding Apps Script function on click.
- [0:01:37]-[0:03:16] `onOpen()` triggers automatically when the spreadsheet opens; builds the `menu` array as objects with `name` (label) and `functionName` (string) — the third distinct code sample in this batch of the exact same `createMenu`/`addToUi` boilerplate (also in `OuchTYb0vYY`, `N5N2oyF4Ok4`/`yBX6E-6YUz8`), but this is the cleanest, most isolated explanation of the pattern itself.
- [0:04:21]-[0:04:55] Shows the OAuth-style permission/verification screen explicitly ("this app isn't verified... I am the developer") — same live moment as in other videos in the batch, reinforcing this is a near-universal first-run step for any Apps Script project.
- [0:05:05]-[0:06:01] Each menu function just calls `SpreadsheetApp.getActiveSpreadsheet().toast('message')` — a good, very simple "give the user feedback" primitive, easier than building any real UI for quick confirmations.

## What the frames add
Frames show the three-item custom menu appearing in the spreadsheet's UI bar, and the toast popups appearing bottom-right when each item is clicked — confirms the demo is real and simple; nothing else.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
The cleanest single explanation in the batch of the menu-item-array → function-name-as-string wiring pattern; `toast()` as a minimal feedback mechanism without building any HTML UI.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Not a project on its own — this is glue/plumbing. Best used as a two-minute reference clip whenever a kid's project needs "add a button to the Sheets menu that runs my function," rather than as a project seed itself.

### Traps a kid will hit
Function names passed to `addItem`/the menu array must be strings, not references — the same trap seen elsewhere in the batch (`N5N2oyF4Ok4`), reinforcing this is a very common first mistake with Apps Script menus.

### Doesn't transfer, and why
No HTTP, no deployment, no client/server boundary — purely a bound-script UI convenience. Not useful for teaching "what is a backend," only useful as a small utility pattern.

## Honest caveats
Very thin (6 min, repeats the same pattern three times with placeholder functions that do nothing but toast a message). Fine as a quick reference, not as standalone class material.
