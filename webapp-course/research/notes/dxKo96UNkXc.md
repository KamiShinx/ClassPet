# Apps Script Simple Triggers, onOpen, Bound Script UI menu creator lesson (Laurence Svekis, 29.8 min)

**What it is:** Tutorial on **bound** scripts attached to a Sheet: custom UI menus (`SpreadsheetApp.getUi()`), the `onOpen` simple trigger, and three example functions that read/highlight/rewrite selected cell ranges. Undated, YouTube captions.
**Substance:** mixed - genuinely useful for bound-script/UI-menu concepts and for showing live debugging of data-type bugs, but has **no web app, no doGet/doPost, no HTML frontend at all**. It's Sheets automation, not web-app building.

## Ideas, in the video's order
- [0:02:12]-[0:03:20] Bound script created via Extensions > Apps Script from inside a Sheet; explicitly states `getUi()` is "one of the bound script's special methods... available only within bound scripts" - a clean, correct statement of what makes bound scripts different from standalone.
- [0:03:20]-[0:05:31] Builds a custom menu: `ui.createMenu('Adv').addItem('Test1','test1')...addToUi()`, run manually once, then see the new menu appear next to Help in the Sheets UI - concrete, satisfying "I made a menu" first win, good for a first bound-script exercise.
- [0:05:31]-[0:06:38] Introduces `onOpen()` as a **reserved, automatically-triggered function name** - runs whenever the spreadsheet is opened, no manual wiring needed. Directly useful "simple trigger" concept.
- [0:06:38] Notes a real side detail: because it's a bound script, refreshing the spreadsheet closes the open script editor tab - a minor but real friction point worth mentioning to kids so they don't think something broke.
- [0:07:11]-[0:08:18] `ui.alert(val)` for simple pop-up output; first-run permission/authorization screen shown again (consistent with other videos - reinforces this is a recurring, expected step).
- [0:09:24]-[0:10:27] Reads the **active selected range** (`getActiveRange().getValues()`), loops and joins into a message string - demonstrates that a script can react to whatever the user currently has selected, not just fixed cells.
- [0:11:33]-[0:16:33] Builds a "find Lawrence and highlight yellow" function: loops rows, uses `indexOf` to check for an exact match, computes the found cell's row/col via `range.getRow()+index` / `range.getColumn()+checker`, and sets `cell.setBackground('yellow')` - a full worked example of "search selected data, then write a style change back to specific cells."
- [0:17:41]-[0:29:21] Builds a third, more complex function that **prefixes selected cells with a running counter** (`1. value`, `2. value`, ...), and this section turns into an extended live-debugging sequence:
  - [0:22:44]-[0:23:52] Numbers silently get converted into **Date objects** by Sheets' automatic type coercion, corrupting the output - a real, non-obvious bug.
  - [0:23:52]-[0:24:24] Fix requires manually setting cell **Format > Plain Text** before rerunning, plus forcing string output in code - explicitly shown as the fix, not just mentioned.
  - [0:24:57]-[0:26:03] A second bug appears (extra "." characters bleeding into output) from unwanted dot-splitting logic; fixed by adjusting the `slice` index.
  - [0:26:03] A third bug (extra trailing space) is fixed by adding `.trim()`.
  - This whole stretch is a strong, authentic "the fix didn't fully work, then the next attempt didn't either, then it did" sequence - good raw material for teaching kids that debugging is iterative, not one-shot.

## What the frames add
Frames make the spreadsheet-side effects legible in a way the transcript alone doesn't: sheet_005 (@16:00-19:45) shows cells actually turning yellow where "Lawrence" was found, and sheet_007 (@24:00-24:45) shows the corrupted Date-object output (`1.1`, `3/2/2022`-style values) next to the working numbered-prefix output once fixed - a genuinely good before/after visual for teaching "silent type coercion is a real bug source." Sheet_003 (@08:00) shows the "Authorization Required" permission dialog again, consistent across the batch. No web-app UI appears anywhere in this video's frames, confirming the "no web app content" assessment.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Bound vs standalone scripts, and what bound-only capabilities (`getUi()`, `onOpen`) actually unlock - useful context even though it's not "web app" material per se.
- Reading/writing specific cell ranges and reacting to the *current user selection* - useful for any Sheet-as-database project where kids need to understand rows/columns/ranges as the underlying data model, before they ever see a web frontend.
- The extended debugging sequence is arguably the most valuable thing in this video for the class's "weak, forgetful AI" concern: it's a real demonstration of a fix not working, needing a second and third correction, and the instructor keeping the working code intact while iterating - modeling small, incremental fixes rather than a big rewrite.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- "Custom menu + find & highlight" as a short bound-script warm-up exercise (not a web app): add a menu item that searches the selected cells for a keyword and highlights matches - teaches ranges, loops, and `onOpen` in one sitting, useful as Sheets-fluency scaffolding before web apps are introduced.
- Explicitly narrate the Date-coercion bug as a "gotcha corner" mini-lesson: have kids format a column as plain text vs automatic and watch a script's output change - cheap, vivid demonstration of why Sheets-as-database has quirks.

### Traps a kid will hit
- Sheets auto-converting numeric-looking strings into Date objects, silently changing values a script writes or reads - a strong candidate for the class's list of "real traps of Apps Script + Sheets" since it's invisible until you inspect actual cell contents.
- Confusing "must run the function manually once" (for permissions, or to trigger `onOpen` outside of an actual open event) with a broken script - the instructor hits this friction naturally.
- Bound-script editor closing on spreadsheet refresh - trivial but disorienting the first time.

### Doesn't transfer, and why
- No web app, no HTML frontend, no doGet/doPost, no deployment at all - if the class's priority per this batch's brief is web-app/API material, this video should be flagged as **out of scope** for that specific goal, useful only as general Sheets/Apps Script fluency (menus, ranges, onOpen) rather than for the "real backend" architecture goal.
- The counter/prefix function's complexity (nested map, dot-index slicing, trim) is more intricate JS than a 14-year-old's first bound script needs; keep as an instructor reference for "look how messy real debugging gets," not as a template to assign directly.

## Honest caveats
This is Sheets/UI automation, not web-app building - it has essentially nothing to do with doPost/doGet, custom web apps, or deploying/sharing a URL. Its value for this course is narrow: bound-script menu/trigger concepts, and a good real debugging story. Treat it as supplementary Sheets-fluency material, not core web-app curriculum.
