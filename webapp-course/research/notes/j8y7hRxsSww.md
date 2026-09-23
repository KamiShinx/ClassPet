# Learn Google Apps Script: Create a WebApp with Data to the Client Side HTML CSS and JavaScript (Laurence Svekis, 14.0 min)

**What it is:** tutorial on Apps Script's `HtmlService` templating pattern — serving an HTML page from `doGet` and injecting server-side data directly into it at render time via a "scriptlet," as opposed to a separate page calling a JSON API with `fetch`.
**Substance:** substantive: a genuinely different, important backend pattern from the rest of the batch, taught cleanly.

## Ideas, in the video's order
- [0:00:00] States the two things this teaches: run an HTML file as a web app in the browser, AND pass data from Apps Script (server) into that page's client-side JavaScript directly at load time.
- [0:03:13] `doGet` explained again as "the function name Apps Script looks for when the browser opens the web app" — consistent, reinforcing definition across this whole channel's videos.
- [0:03:46] Creates an HTML file *inside the Apps Script project itself* (Files > + > HTML, named `index`) — this is the key structural difference from `8YhwarXcPeU`'s pattern, where the HTML lived in a separate project entirely. Both are valid; this one keeps everything in one Apps Script project, closer to what our class's single-project Apps Script + Sheets stack will look like.
- [0:04:53] `HtmlService.createTemplateFromFile('index')` then `.evaluate()` inside `doGet`, returned directly — the whole mechanism for serving a page from Apps Script.
- [0:06:00] Deployment walkthrough repeated (consistent across the channel): test deployments (`/dev`, requires login) vs full deployment (`/exec`, the public one); "execute as" (whose identity runs server code — matters if the script touches Drive files the visitor shouldn't see) vs "who has access" (who can open the URL at all). Explicitly: if set to "user accessing the web app," each visitor must individually accept permissions and won't see the developer's own private files unless shared.
- [0:10:56] The core new concept: attach a data object to the HTML template BEFORE evaluating (`html.dataV = {...}`), then inside the HTML file's own `<script>` tag use a *scriptlet* — `<?!= JSON.stringify(data) ?>` — to have Apps Script inject that server value directly into the page's JavaScript source as it renders. This is templating/server-side rendering, distinctly different from the fetch-a-JSON-endpoint pattern used elsewhere in the batch.
- [0:13:09] Notes the injected variable can be renamed freely (`data`, `dataV`, `dataQ`...) as long as the client-side reference matches what was set on the template object — reinforces it's just a normal JS object being embedded as literal source text, not magic.

## What the frames add
Frames at [0:00:00]-[0:00:45] show, unusually, the *browser console* first — full of unrelated "Unrecognized feature: speaker / web-share / vibrate / ambient-light-sensor" warnings and errors (11 issues) alongside the actual `hello` log output. This is noise from Apps Script's own iframe sandbox permissions policy, NOT anything the student's code caused — worth pre-empting explicitly in class ("ignore these particular warnings, they're not your bug") so kids don't panic debugging noise that isn't theirs. Frames from [0:06:30]-[0:08:45] show the full deployment dialog sequence (type > description > execute as > who has access) clearly, consistent with other videos in this channel. The red "Hello World V2" background at [0:09:30]-[0:10:45] confirms basic CSS injection works through this same page.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
A second, distinct pattern for getting server data to the client (templating/scriptlet injection at render time) vs the fetch-a-JSON-API pattern taught elsewhere in the batch — genuinely useful to teach both and contrast them: templating is simpler for a single self-contained page; a JSON API is needed once the frontend is hosted elsewhere (our plan for the final project on Netlify) or needs to refresh data without a full page reload.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "one-page Apps Script app" milestone: single Apps Script project, one HTML file, `doGet` injects a Sheet-derived value (e.g. today's featured joke, a leaderboard snapshot) straight into the page via scriptlet — good as the *very first* full web-app milestone before introducing `fetch`/JSON APIs, since it's simpler (no separate endpoint, no CORS, no deploy-twice confusion).

### Traps a kid will hit
The scriptlet syntax itself (`<?!= ... ?>` vs `<?= ... ?>` — the `!` suppresses HTML-escaping, easy to get wrong and either break JSON or introduce an XSS-shaped bug, worth a plain warning even though this video doesn't dwell on it); the unrelated browser-console noise from Apps Script's sandbox (documented above) being mistaken for a real bug; forgetting that the injected data is baked in at page-LOAD time, not live — unlike the fetch approach, refreshing data means reloading the whole page, not just re-fetching.

### Doesn't transfer, and why
This pattern doesn't work once the frontend is hosted separately (e.g. Netlify for the final project) — templating only works when Apps Script itself serves the HTML. For the final-project architecture (frontend elsewhere, calling Apps Script via `doPost`/JSON), the fetch-based API pattern from `8YhwarXcPeU` is the one that transfers, not this one. Worth being explicit with kids that this is a "training wheels" pattern for early in the year.

## Honest caveats
Clean, focused, and honestly one of the better single-concept explainers in the batch — the scriptlet mechanism is explained plainly without hand-waving. The console-noise frames are the only thing worth pre-empting so it doesn't confuse students watching along.
