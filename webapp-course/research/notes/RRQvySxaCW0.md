# Google Sheets Web App Example - Google Apps Script Web App Tutorial - Part 1 (Learn Google Sheets & Excel Spreadsheets, 31.7 min)

**What it is:** Tutorial, part 1 of 5. Builds a bare Apps Script web app from zero: `doGet`, deploy, `google.script.run`, and writing form input to a Sheet. Screen recording, narrated, no script — genuinely teaching as he types. Dated 2019 (log timestamps read "19-01-10").

**Substance:** substantive: covers the full client/server round trip end to end, with real mistakes left in (a wrong method name, an `undefined` value) rather than edited out.

## Ideas, in the video's order
- [0:00:34] Apps Script project created from Drive ("Connect more apps" -> Google Apps Script), kept separate from a bound Sheets script — he frames it as "a web app," not a Sheets add-on.
- [0:01:06] Minimum contract: a web app needs a `doGet(e)` function that returns text or `HtmlService` output.
- [0:02:12] `HtmlService.createHtmlOutputFromFile('page')` renders a separate `page.html` file — first look at separating server code from client-visible HTML.
- [0:03:16] Explicitly declines to teach HTML/CSS in these videos — assumes it as a prerequisite. Relevant: our 14-year-olds may not have this, so Ben's course needs to cover that gap or lean harder on AI to generate it.
- [0:03:51] Deploy as web app: version, "execute as," "who has access." He deploys as himself, access "only myself" during dev.
- [0:04:58] Google's interstitial warning screen on `script.google.com/.../exec` links ("this app was created by another user, not by Google") — every deployed app shows this to any visitor who isn't the owner. Worth flagging to kids up front so they don't panic.
- [0:05:34] Introduces the `e` (event) parameter of `doGet(e)` — logs it so kids can literally see what's inside.
- [0:06:06]–[0:06:40] **Versioning trap, stated explicitly**: editing code does nothing to the live deployed URL until you redeploy with a new version number; reusing the same version silently keeps serving old code.
- [0:07:12]–[0:08:54] Shows the dev/test loop: "test web app for your latest code" (the `/dev` URL) refreshes without redeploying — the fix for the versioning trap, and the one every class must use during build time.
- [0:07:48]–[0:09:28] URL query params demoed live (`?name=Joe&age=34`) and read back via `e.parameter` (single value) vs `e.parameters` (array, for repeated keys like `category=6,44,2`). Concrete, working demo of GET params as "the data").
- [0:11:11]–[0:11:44] Live bug: typed `e.param` instead of `e.parameter`, got `undefined`, fixed it on screen. Good real debugging moment, not scripted.
- [0:11:44]–[0:15:43] Button + `document.getElementById` + `addEventListener('click', ...)` in the page's `<script>` tag calling a **page-side** JS function, distinct from anything in the `.gs` file — this is the actual client/server seam.
- [0:15:43]–[0:16:15] Explicit client/server security note: HTML/JS in `page.html` is public ("anybody can right-click, view source"); code in the `.gs` file is not visible to the browser. This is the clearest one-line "why do we even have a server" explanation in the batch.
- [0:17:56]–[0:19:01] `google.script.run.functionName()` — the actual bridge call. Live bug again: typed `run.script` instead of `script.run`, nothing happened, no error shown, until fixed. **Realistic trap**: `google.script.run` fails silently on typos with no console error surfaced to a beginner.
- [0:19:37]–[0:24:41] Input box -> `.value` -> passed as an argument into `google.script.run.userClicked(name)` -> server function receives it and logs/uses it. Full named-argument round trip.
- [0:24:41]–[0:29:07] Writing to a Sheet from server code: `SpreadsheetApp.openByUrl(url)`, `getSheetByName('data')`, `appendRow([...])`. Needs an authorization consent screen the first time (shown on-screen).
- [0:29:07]–[0:30:15] `new Date()` appended as a second column — first "richer" write.
- [0:30:15] Final deploy step reiterated: new version + description before sharing, and the access level should usually not stay "only myself" once done.

## What the frames add
Confirms the transcript closely; nothing surprising beyond narration, but three visuals are worth reusing directly in class:
- [0:02:12]–[0:02:48] the actual `HtmlService` autocomplete dropdown (`createHtmlOutput`, `createHtmlOutputFromFile`, `createTemplateFromFile`, `createTemplate` etc.) — a genuinely useful "here are your options" screenshot for the API surface.
- [0:03:36]–[0:05:12] the full "Deploy as web app" dialog sequence (version dropdown, execute-as, access level, resulting URL) — better than any diagram for showing kids exactly what they'll click.
- [0:08:24]–[0:09:24] the Logger/`Logs` popup literally showing the JSON of `e.parameter`/`e.parameters` growing as URL params are added — this is the single best concrete "here is a request object" visual in the batch.
- [0:22:24]–[0:28:36] OAuth consent screen ("Basic WebApp wants to access your Google Account... See, edit, create, and delete your spreadsheets in Google Drive") when the script first touches Sheets — good for a permissions-concept lesson.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Client (HTML/JS in the browser, visible to anyone) vs. server (`.gs`, invisible, runs on Google's machines) — stated directly and usefully at [0:15:43].
- Request/response for `doGet`: the browser asks for a page, the server function decides what HTML comes back, on every load.
- `google.script.run` as the async bridge from client JS to a server function — shown as literally the only way page JS can call server code.
- A very concrete idea of "the database": Sheets rows, written via `appendRow`.
- Deployment as a separate, manual publishing step from saving code — a real backend concept many web frameworks hide, but Apps Script does not.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Milestone 0 ("hello, backend"):** deploy a one-button page that writes the student's name + timestamp to a shared class Sheet. This is literally what this video builds; it's small enough for a single 90-minute session and gives every kid a working URL and a row in a spreadsheet with their name in it — a strong first "I made something real" moment.
- **Concept demo, teacher-led:** open the Logs panel and watch `e.parameter` fill in live as you edit the URL query string by hand — makes "the server receives a request with data in it" tangible before any code is written.
- **Debugging drill:** deliberately plant the `google.script.run` typo (or `.script.run` vs `.run.script`) bug from the video and have kids find why nothing happens — teaches that this call fails silently, which they will hit constantly when vibe-coding with Gemini.

### Traps a kid will hit
- Editing code and testing the live `/exec` URL without redeploying — confused about why nothing changed. Fix: always test via "latest code" (dev) URL during build, deploy only at milestones.
- `google.script.run` failing with zero error output on a typo or wrong function name — a kid (or Gemini) will misname a function and get silence, not a red error.
- First Sheets access requiring an OAuth consent click that a 14-year-old may dismiss or panic at ("this app wants to access your Google Account").
- The "this app was created by another user, not by Google" warning banner on every shared link — needs an upfront one-line explanation or kids will think they broke something.

### Doesn't transfer, and why
- Menu path shown ("Publish > Deploy as web app") is the pre-2021 Apps Script editor. Current editor uses "Deploy > New deployment" / "Manage deployments," and access options ("Execute as," "Who has access") are the same concepts but the UI has moved. Needs a live re-check before teaching, not a rewrite of the concept.
- HTML/CSS is assumed knowledge, explicitly skipped — our class needs its own short HTML/CSS primer or must lean on Gemini to generate structure while the lesson focuses on the client/server wiring.

## Honest caveats
2019 channel using the legacy Apps Script editor and legacy deploy menu (confirmed outdated by "Publish" menu instead of today's "Deploy" button, and no mention of the V8 runtime or Editor's newer UI). Concepts (doGet, HtmlService, google.script.run, appendRow) are all still exactly correct in 2026 Apps Script. No AI-assisted building shown — this is 100% hand-typed, pre-Gemini/pre-vibe-coding, so nothing here speaks to point 4 of the brief.
