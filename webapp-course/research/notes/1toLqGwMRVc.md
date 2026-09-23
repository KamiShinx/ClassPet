# Template Partials & Passing Objects - Google Apps Script Web App Tutorial - Part 2 (Learn Google Sheets & Excel Spreadsheets, 17.8 min)

**What it is:** Tutorial, part 2 of 5, direct continuation of Part 1's app. Adds more form fields, bundles them into one JS object sent to the server, then splits the single `page.html` file into `page.html` + `page-css.html` + `page-js.html` using Apps Script's `include()` templating trick. Screen recording, narrated, 2019.

**Substance:** substantive: the object-passing pattern and the file-splitting/templating pattern are both real, reusable techniques shown with working code, not just described.

## Ideas, in the video's order
- [0:00:33]–[0:02:13] Adds first name, last name, and an HTML `<select>` dropdown to the form — plain unstyled HTML, explicitly not a CSS lesson.
- [0:05:49]–[0:07:30] **Core idea**: `google.script.run` only takes single arguments cleanly, so multiple form fields get bundled into one JS object (`userInfo = {}`, then `.firstName`, `.lastName`, `.app` assigned) before being sent — "we can only pass it in a single variable."
- [0:09:15] States plainly, as an aside, that you should validate input before writing to the sheet, but skips it "to keep this simple" — worth flagging to kids as a real shortcut, not a best practice.
- [0:11:31]–[0:12:41] Motivation for splitting files: a single HTML file gets "really really cluttered" once CSS + JS + markup pile up. Creates `page-css.html` and `page-js.html` as separate files.
- [0:12:41]–[0:13:19] The `<?!= include('page-css'); ?>` / `<?!= include('page-js'); ?>` scriptlet syntax to pull those files into `page.html` at render time — calls this "kind of similar to PHP" for anyone who knows PHP.
- [0:13:51]–[0:15:32] The `include()` function itself is not built-in — has to be hand-written in the `.gs` file (`HtmlService.createHtmlOutputFromFile(filename).getContent()`), and this only works once the main page is rendered via `createTemplateFromFile(...).evaluate()` instead of `createHtmlOutputFromFile(...)` — a real Apps Script quirk (partials require the templating API, not the plain HTML-output API).
- [0:16:41] Final test with a fourth "other" option, confirms the object round-trip still works after the refactor.

## What the frames add
Frame-for-frame matches the transcript. Two things worth pulling as class visuals:
- [0:11:48]–[0:12:24] "New > HTML file" menu inside the Apps Script editor, showing exactly how a kid creates `page-css.html`/`page-js.html` — useful step-by-step screenshot.
- [0:12:36]–[0:13:48] Side-by-side of the `<?!= include(...) ?>` tags actually sitting inside `<head>`/before `</body>` in the real file, which clarifies placement (CSS include in head, JS include at the bottom) better than the narration alone.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Grouping multiple pieces of client data into one object before sending to the server — a real, minimal step toward "designing a request payload," which is exactly what `doPost`/JSON bodies will look like later in the year when the frontend moves to Netlify.
- Apps Script's server-side templating (`createTemplateFromFile` + scriptlets) as a way to reuse HTML fragments — conceptually the same idea as components/partials in any web framework, good bridge if Ben later shows React-style thinking.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Refactor drill, not a new project:** take last week's one-button app (Part 1) and (a) bundle two+ fields into one object before sending, (b) split the HTML into 3 files once it exceeds ~40 lines. Good "keep your code from becoming spaghetti" lesson tied to something they already built.
- Could be Gemini-assisted: ask Gemini to "split this HTML file into CSS/JS/markup and wire up include()" — a good test of whether Gemini gets the Apps Script-specific `<?!= include(...) ?>` idiom right or invents something wrong (framing note 4 in the brief: worth testing before doing it live in class).

### Traps a kid will hit
- Using `createHtmlOutputFromFile` (works fine for a single file) and then adding `include()` scriptlets that silently do nothing/error, because partials require switching to `createTemplateFromFile(...).evaluate()`. This is a genuine, non-obvious Apps Script-specific trap the video walks straight into and fixes on screen.
- Object-vs-multiple-arguments confusion in `google.script.run` calls — a kid changing a function signature on one side (client) without updating the other (server) will break silently, same class of bug as Part 1's typo trap.

### Doesn't transfer, and why
- No new content on deployment, permissions, or Sheets speed — pure client-side/templating refactor, so it doesn't add "real traps" beyond what Part 1 covers.

## Honest caveats
Short, tightly scoped video; skips input validation on purpose and says so — fine for a tutorial, but our class materials should not skip it the same way once kids are storing real classmate data. No AI-assisted building; still 2019 legacy editor UI (deploy menu not shown again here, inherited from Part 1).
