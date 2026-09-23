# Web App - Load Data From Spreadsheet - Google Apps Script Web App Tutorial - Part 4 (Learn Google Sheets & Excel Spreadsheets, 27.1 min)

**What it is:** Tutorial, part 4 of 5, direct continuation. Teaches passing data **from server to client** (the reverse direction of Parts 1-2): reads a list of dropdown options out of a new "options" Sheet tab and renders it into the HTML template dynamically, instead of hard-coding `<option>` tags. 2019.

**Substance:** substantive: this is the single most important concept video in the batch — it's the one place the series explains server-to-client data flow and Apps Script's templating/escaping rules in real depth, with a live bug (`ReferenceError: title is not defined`) left in.

## Ideas, in the video's order
- [0:01:07]–[0:01:46] Motivates the lesson directly: the dropdown's four options are currently hard-coded in the HTML; goal is to store them in a Sheet tab ("options") and populate the dropdown from there.
- [0:02:52]–[0:05:10] Introduces Apps Script scriptlet output syntax: `<?= variable ?>` prints a variable's value into the page (escaped as text); a variable with nothing defined throws `ReferenceError`.
- [0:05:48]–[0:06:59] **Key security point, explained with a live demo**: `<?= ?>` HTML-escapes output (so `<i>hello</i>` prints literally as text), while `<?!= ?>` renders raw HTML. States explicitly: avoid `<?!= ?>` for anything that came from user input, because it will execute as real HTML/script — a real, correctly-explained XSS-adjacent caution, rare to see stated this clearly in a beginner tutorial.
- [0:08:05]–[0:10:24] Shows how a variable actually gets from server to template: build a `HtmlTemplate` object via `createTemplateFromFile(...)` (not evaluated yet), set a property on it (`tmp.title = 'my title'`), then `.evaluate()` it — the property becomes available inside the HTML as that same variable name.
- [0:08:24] **Live bug, left in**: forgets to set the `title` property before evaluating, gets `ReferenceError: "title" is not defined (line 3, file "Code")` in the Apps Script error page — genuinely useful as a "here's what a real server-side error looks like" screenshot.
- [0:10:24]–[0:15:31] Passes an **array** (`tmp.list = ['GS','Excel']`) to the template, loops over it inside the HTML with a `<? for (...) { ?> ... <? } ?>` scriptlet block spanning multiple tags — shows that template control flow (loops) is possible directly inside the HTML file, and that the opening/closing braces of a JS block can straddle separate `<? ?>` tags.
- [0:15:31]–[0:19:24] Replaces the hard-coded array with real Sheet data: `worksheet.getRange('A1').getDataRegion().getLastRow()` to find how many rows exist without hard-coding a count, then `getValues()` to pull them — flags this depends on an earlier "last row" video (i.e., assumes some prior Sheets API knowledge).
- [0:18:20]–[0:19:58] `getValues()` returns a 2D array (array of rows, each a 1-element array here) — uses `.map(row => row[0])` to flatten to a simple 1D list. Explicit "if you haven't watched my array videos, maybe you should."
- [0:21:46]–[0:26:34] Shows a **second approach**: instead of looping in the HTML template, build the finished `<option>...</option>` HTML string entirely in server code (`.map()` + `.join('')`) and pass one pre-built HTML string to the template via `<?!= list ?>` — presents this as the cleaner pattern he'd actually use, and it does keep the HTML file simpler.

## What the frames add
Matches the transcript closely; the standout frame is the real Apps Script runtime error page at [0:08:24] ("Google Apps Script — ReferenceError: 'title' is not defined (line 3, file 'Code')") — a genuinely useful screenshot of what a server-side crash looks like to a user, since Apps Script shows raw stack-trace-style errors, not a friendly message. Also useful: [0:12:48]-[0:13:48] shows the for-loop scriptlet literally split across two `<? ?>` tags in the HTML editor, clarifying a syntax that's easy to garble from narration alone.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- **Server-to-client data flow**, the missing half of what Parts 1-2 covered (client-to-server). This is exactly the concept the class needs for anything beyond a write-only form: "the server can also hand data back when the page loads."
- Escaping/XSS caution (`<?= ?>` vs `<?!= ?>`) — a real security concept, explained simply and correctly, reusable close to verbatim for teens: "don't let the browser run text that came from a stranger as if it were code."
- A visible, unfiltered server error (ReferenceError) — good for demystifying "the backend crashed" as an ordinary, readable event rather than a mysterious failure.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **"Dynamic dropdown" milestone**: extend the Part-1/2 app so the dropdown's options come from a Sheet tab instead of being typed into the HTML — directly teaches read-from-database-into-page, and is small enough to build on top of an existing project in one session.
- **Concept demo, teacher-led**: deliberately show the escaped-vs-raw-HTML difference (`<?= "<b>hi</b>" ?>` vs `<?!= "<b>hi</b>" ?>`) side by side — a two-minute, very concrete "this is why servers escape user text" demo that a 14-year-old can see with their own eyes.
- Good candidate for "have Gemini build this" then check: ask Gemini to add a feature that reads a list from a Sheet and populates a dropdown, and see whether it defaults to the safe `<?= ?>` pattern or reaches for `<?!= ?>` carelessly when it shouldn't.

### Traps a kid will hit
- Forgetting to set a template property before `.evaluate()` → `ReferenceError` — exactly the bug shown on screen, and a very plausible Gemini-generated-code bug too (AI forgets to wire a variable through).
- Using `<?!= ?>` out of habit (because it "just makes it render") on data that includes user input, silently opening an HTML/script-injection hole — a trap a vibe-coder relying on AI-suggested code could easily fall into if Gemini isn't told to care about this.
- 2D vs 1D arrays from `getValues()` — a very common Sheets-API confusion; kids (and Gemini) will get an "array of arrays" back and not realize it needs flattening/indexing.

### Doesn't transfer, and why
- Nothing structurally outdated here — `HtmlService`, templating, and `getValues()` are all current APIs; this is the most durable video in the batch.

## Honest caveats
Assumes prior knowledge from the channel's separate Sheets/array/"last row" tutorials (stated explicitly at [0:15:31] and [0:19:58]) — our class would need to backfill that Sheets-API literacy separately, or lean on Gemini to write the range/lastRow logic while the lesson stays focused on the client/server concept. No AI-assisted building shown (2019, hand-typed).
