# Create Views (Pages) in Web App - Apps Script Web App Tutorial Part 7 (Learn Google Sheets & Excel Spreadsheets, 13.6 min)

**What it is:** tutorial (2019), part 7. Refactors a single-page app into multiple "views": a homepage with a button, and the original form as a second page, switched by a URL query parameter.
**Substance:** substantive: introduces a real (if manual/pre-router) multi-page pattern for Apps Script web apps and a genuine gotcha about links inside an iframe.

## Ideas, in the video's order
- [0:00:33] States the goal plainly: one deployed app, several "views" (pages), navigated by clicking a button/link rather than always showing the same form.
- [0:01:09] Refactors inline functions into separate `.gs` files (`funcs.gs`, `utils.gs`) purely for organization — a code-hygiene habit worth modeling for kids as projects grow.
- [0:02:13]-[0:02:52] Moves the page-serving logic into its own `loadForm()` function, called from `doGet(e)` — sets up the pattern the next video (Part 8) turns into a router.
- [0:04:05]-[0:05:20] Core mechanic: `doGet(e)` reads `e.parameter.v` (a URL query parameter, e.g. `?v=form`) and an `if` branches which HTML file to serve. This is the whole "routing" idea in its simplest form, explained clearly.
- [0:06:41] Creates a second HTML page (`home.html`) by copying the shared head/CSS boilerplate — shows that every "page" in this pattern needs its own full HTML shell (before Part 8's templating cleans this up).
- [0:10:16]-[0:10:50] Adds a clickable link (`<a href="?v=form">`) to navigate between views.
- [0:11:25] **Key trap, explicitly demonstrated failing then fixed**: a relative link (`?v=form`) does not work once the app is embedded, because Apps Script serves pages inside an iframe — the relative link resolves against the iframe, not the top app. Fix: build the link dynamically with `ScriptApp.getService().getUrl()` on the server side so the href is always a full, correct URL.
- [0:12:41] Names the current design's weakness himself: hardcoded `if/else if` per view doesn't scale — directly sets up the router refactor in the next video (S/A2's Part 8).

## What the frames add
Straightforward screen-recording confirming the transcript: IDE views of `code.gs`, `page.html`, new `home.html`; a plain "Welcome!" page with an "ADD RECORD" button; clicking it correctly navigates to the form view once the dynamic URL fix is applied. Nothing additional beyond confirming the working end state. No diagrams.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- `doGet(e)` receiving URL query parameters (`e.parameter.xyz`) — the most basic form of client→server input in Apps Script, and the direct ancestor of real routing.
- Why an app "inside an iframe" behaves differently for links than a normal page — a concrete, teachable instance of client/server/hosting context mattering, not just abstract "it's complicated."

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Multi-page mini site milestone**: "home page with a button" → "second page" using a `?v=` parameter, before ever introducing a router library. Good as the very first "this is what multi-page even means" exercise, one step before the class does Part 8's full router.
- Any project needing distinct "landing page" vs "form page" vs "results page" (quiz app intro screen vs quiz screen vs score screen) can use this exact `e.parameter.v` pattern.

### Traps a kid will hit
- The iframe/relative-link trap is close to guaranteed to bite a kid the first time they add a link inside an Apps Script web app — worth pre-teaching as "always build full links with `ScriptApp.getService().getUrl()` server-side," since Gemini-generated code is likely to write a naive relative link too.
- Duplicating the full HTML boilerplate (head, CSS links) per page is tedious and error-prone (forgetting a `<script>` tag on a new page) — worth showing kids this pain point explicitly so Part 8's templating solution lands as a real relief, not an arbitrary abstraction.

### Doesn't transfer, and why
- Nothing Materialize-specific in this one; the pattern (query-param routing, iframe link gotcha) is stack-agnostic and directly reusable.

## Honest caveats
- This video is explicitly a stepping stone — it ends by naming its own limitation (doesn't scale past 2-3 views) and hands off to Part 8. Best taught paired with Part 8, not alone.
- Short and dense; almost no padding.
