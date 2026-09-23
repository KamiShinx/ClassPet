# Apps Script Web app Data transfer from ClientSide to ServerSide WebApp Sheet data and more (Laurence Svekis, 19.5 min)

**What it is:** The most complete applied example in the batch: builds a small "add user to sheet" form, combining server→client data on page load (via template) and client→server writes (via google.script.run), with a response value shown back to the user.
**Substance:** substantive: a genuinely small, complete, working feature end to end, including bug fixes and a visible final output.

## Ideas, in the video's order
- [0:02:10]–[0:03:16] `HtmlService.createTemplateFromFile('index')`, then attaches a `data` object onto the template (`html.data = {status:'ready', data: myObjectData}`) before `.evaluate()` — server data is baked into the page at render time, not fetched afterward.
- [0:03:48]–[0:04:57] Client script reads that baked-in data via a scriptlet: `const data = <?!= JSON.stringify(data) ?>;` turning server data into a real client-side JS object usable by normal JS — a concrete bridge between server-render and client-JS patterns.
- [0:06:03] Live bug: forgot a semicolon ending the scriptlet-generated JS, breaking the whole page — realistic syntax trap when mixing scriptlets and JS.
- [0:07:41] `data.first` used to set `<h1>` text content directly from the server-supplied object — shows the payoff of the template-data pattern.
- [0:08:15]–[0:10:47] Builds an actual input form (first/last name) plus an "Add to Sheet" button; client JS reads both input values into a temp object and sends them with `google.script.run.testFun(temp)`.
- [0:11:27] `sheet.appendRow(data)` writes the new row; **then** `sheet.getLastRow()` is returned back to the client as the response — a genuinely useful "confirm what happened" pattern (not just "success," but "here's exactly which row").
- [0:15:48]–[0:16:20] `.withSuccessHandler(onSuccess)` picks up that row number and writes "Item added to row 11" into a page `<div class="output">` — full visible confirmation loop for the user, not just a console log.
- Whole video never uses doGet/doPost with fetch/JSON — everything server-facing here is `google.script.run`, same family as NlATpkrxdes and 9EaT4CLC7Oc.

## What the frames add
[0:10:30] shows the actual live web app with "Laurence"/"Svekis" input fields and an "Add to Sheet" button — good reference UI screenshot. [0:13:15]/[0:13:30] show the underlying spreadsheet with real added rows (Mike Doe 8, Jane Doe 11, Jack Doe 8, etc.) confirming the write actually worked, not just simulated. Devtools console frames at [0:12:00] catch an actual "Uncaught" error mid-build, again useful for showing kids real debugging, not just clean final code.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Two distinct data flows in one project: server→client on page load (template data) and client→server on user action (google.script.run write) — a good single example that shows both directions at once, which most other videos in this batch only show one of.
- Returning a meaningful confirmation value (the row number) instead of just "ok" — teaches that a backend response can carry useful information, not just a status.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
This is close to being a ready-made "class sign-up sheet" or "name that game / guess who" mini-project as-is: a form writes a new row to a shared Sheet and confirms which row it landed in. Strong candidate for an early (week 2-3) milestone since it's small, complete, and visibly rewarding — kids see their own name land in a live spreadsheet.

### Traps a kid will hit
- Missing semicolon after a scriptlet-generated JS line silently breaking the whole page (shown on screen).
- Needing to select the correct sheet by index/name (`Sheet2`) when a spreadsheet has multiple tabs — an easy kid mistake (writes to the wrong tab).
- First-run OAuth consent screen (shown at [0:12:15]) interrupting the demo — expect this each time a new script needs a new permission scope.
- No concurrency handling shown: if two kids click "Add to Sheet" at nearly the same moment, this video doesn't address whether `appendRow` from two simultaneous calls could collide — worth testing with the actual class size (10-15 concurrent Sheet writes) before trusting it under load.

### Doesn't transfer, and why
Like other `google.script.run`-based videos, this pattern breaks once the frontend is hosted outside Apps Script (Netlify) for the final project — would need to be rebuilt using doPost + fetch + JSON at that point. Flag this explicitly when reusing the "add to sheet" concept for the final-project version.

## Honest caveats
No error/failure handler shown for the write itself (only success is wired up) — a lost network call or Sheet permission issue would fail silently from the user's point of view, unlike 9EaT4CLC7Oc which explicitly demonstrates a failure handler.
