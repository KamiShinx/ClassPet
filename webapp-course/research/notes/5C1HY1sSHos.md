# How to Create a Web Form that can send emails using your Gmail account no backend code JavaScript (Laurence Svekis, 60.8 min)

**What it is:** Live-build tutorial, three parts stitched into one video: vanilla-JS contact form -> Apps Script web app (doGet/doPost) -> Sheet logging -> confirmation + admin email. No year overlay visible, channel style suggests ~2022-2023; APIs used (ContentService, MailApp, SpreadsheetApp) are all current in 2026.

**Substance:** substantive. It is exactly the doGet/doPost/Sheets/MailApp pattern our class needs, built from an empty project to a working deployed endpoint, including the debugging detour (mock `tester()` function) and the "no backend code" framing Ben's brief flags as directly relevant.

## Ideas, in the video's order
- [0:00:00] Pitch: JS front end + Apps Script "backend server" + Sheet + email, no traditional backend needed. This is the video's own "what is a backend" framing — worth quoting almost verbatim in class.
- [0:02:13]-[0:05:31] Plain HTML form (name/email/message + submit), IDs on every field, labels as `display:block`. Generic, low value to walk through live (Gemini writes this in one prompt).
- [0:06:03]-[0:07:42] `addEventListener('submit', ...)` + `e.preventDefault()` explained by first **not** calling preventDefault and showing the page reload/query-string side effect. Good concrete demo of what preventDefault actually prevents.
- [0:08:14]-[0:12:37] Manual validation (length checks), error `<div>` created/prepended/removed via `setTimeout`, border-color feedback. Straightforward DOM técnique, not backend-specific.
- [0:13:10]-[0:14:45] Bundles form fields into one plain object (`myObj`) before sending — this object's shape becomes the API "contract" the rest of the video hinges on.
- [0:18:06]-[0:19:12] Explains Apps Script itself: "runs as JavaScript in the cloud," connects to Google services, can be deployed as a web app endpoint. Clean one-line definition of Apps Script as backend.
- [0:19:12]-[0:21:23] doGet skeleton -> `ContentService.createTextOutput` -> **Deploy > New deployment > Web app**. Walks "Execute as" (must be the developer's own account, since the client has no Google login) vs "Who has access" (**Anyone**, not "Anyone with Google account", not "Only myself") [frames 00:20:00-00:21:30]. This is the single clearest deploy/permissions walkthrough in the batch — matches the S8 batch's video almost move for move.
- [0:22:29]-[0:23:35] `setMimeType(ContentService.MimeType.JSON)`, then demonstrates GET query-string parameters landing in `e.parameter` / `e.parameters` by pasting `?id=1000&name=Laurence` into the browser and reading the raw JSON echoed back — a good "look, this is literally what a request is" demo for a 14-year-old.
- [0:24:41]-[0:26:57] Builds `fetch(url)` in the client JS, `.then(res => res.json())`, logs the round trip; shows the URL string concatenation for a query param (`url + '?id=100'`) as one way to pass data on GET.
- [0:26:57]-[0:29:15] Converts to POST: renames function to `doPost(e)`, reads `e.postData.contents` and `JSON.parse`s it; client side adds `method:'POST', body: JSON.stringify(data)` to the fetch options. Clean before/after of GET vs POST server code side by side [frame 00:28:30].
- [0:29:42]-[0:32:00] New Sheet created, ID copied from the URL, `SpreadsheetApp.openById(id).getSheetByName('emails')`, `appendRow`. First attempt appends the whole JSON string as one cell (visible in the sheet) [frame 00:32:30] — an explicit "that's not what we wanted" moment before fixing it, good for showing iteration is normal.
- [0:33:45]-[0:39:00] Introduces a **`tester()` function** to simulate `e` locally with a hardcoded string, since `doPost` can't be run/debugged directly in the IDE [0:33:52]: "it's a very hard to troubleshoot the do post method." Loops sheet headers against the JSON object to build a row array (`holder`) in the correct column order rather than hardcoding positions — an explicit "match by header name, not column index" choice.
- [0:44:00]-[0:47:45] `validateEmail` with a regex, `MailApp.sendEmail({to, subject, htmlBody})`. Shows the "Google hasn't verified this app" OAuth consent screen when a new service (Mail) is first authorized [0:49:15, frame], and clicking through it — a real first-run friction point.
- [0:47:45]-[0:53:24] Sends two emails per submission: one to the site owner with the raw form data, one "thank you" reply to the submitter's own address using their row ID from the Sheet as confirmation. Demonstrated live in Gmail inbox [frames 00:42:00-00:43:00].
- [0:55:36]-[1:00:33] UX polish: disable the submit button and hide the form on submit, show a "Waiting..." div, replace it with "Message Sent, Your ID is N" using the server's returned row number, restore the form/button on error. Standard optimistic-UI pattern layered on top of the working endpoint.
- [1:00:33] Wrap-up, encourages viewers to build their own version.

## What the frames add
Heavy code-editor + live-app screen capture throughout (all 16 sheets are code/UI, no talking-head-only stretches after the intro). Concretely useful: the New Deployment dialog sequence with "Execute as / Who has access" dropdowns fully visible [00:20:00-00:21:45]; raw JSON responses shown in-browser for GET requests with query params [00:22:30-00:23:30]; side-by-side doGet vs doPost code [00:28:30]; the "Google hasn't verified this app" warning dialog [00:49:15]; and the final live Gmail inbox showing both the owner-notification and the auto-reply emails [00:42:00-00:43:00]. These visuals are strong enough to lift directly into a slide deck (deploy dialog, OAuth warning, JSON echo).

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Client (form/JS) vs server (Apps Script function) vs database (Sheet) as three distinct pieces talking over HTTP — the whole video is a working example of exactly this split.
- Request/response cycle made visible: pasting a URL with `?params` into the browser and seeing raw JSON back is a very direct "this is what an API is" demo, no abstraction needed.
- GET vs POST: same-looking Apps Script functions (`doGet`/`doPost`) with different jobs (read/query vs a payload in the body) — a clean side-by-side for the "what's the difference" question kids will ask.
- Deploy/permissions as the thing that actually makes a backend reachable by "anyone," distinct from the code being correct — echoes the S8 batch note that this deserves to be a fixed class checklist.
- Sheet as database: `openById`, `getSheetByName`, `getDataRange().getValues()`, `appendRow` — the full CRUD-lite vocabulary our stack needs, all in one video.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **"Message in a bottle" form**: a one-field form (just a message) that posts to a doPost endpoint and appends it with a timestamp to a Sheet — the minimal version of this video's project, buildable in one 90-minute session, and a natural lead-in to a class-wide guestbook/wall.
- **"Confirm my submission" milestone**: extend the above so the server emails the submitter a "got it, you're #N" message using MailApp and the appended row number — directly reuses this video's confirmation-email idea and teaches that the server, not the client, decides what happened (source of truth).
- **GET-params scavenger hunt**: before any project, have kids paste `?name=X&mood=Y` onto their own deployed doGet's URL and read the JSON that comes back, exactly as the video does at [0:22:29] — cheap, concrete, no code needed, makes "a request carries data" tangible.

### Traps a kid will hit
- **Deploy dialog fields set wrong**: "Execute as: User accessing the web app" (breaks because kids have no login flow) or "Who has access: Only myself" (breaks for classmates) — both shown going wrong-then-right in the video.
- **Stale deployment / testing the wrong URL**: the video juggles at least four separate "new deployment" URLs across the build (testing output, GET, POST, sheet data, POST-ready) — a kid (or a forgetful Gemini) copy-pasting an old exec URL is a near-certain trap; worth an explicit "one URL, redeploy in place" rule for class, even though the video itself doesn't use that safer option.
- **`doPost` can't be single-stepped/run in the editor** — the video's own workaround (a `tester()` function faking `e`) is the fix, and it's exactly the kind of habit (test server logic without the network) that protects a project from a forgetful AI silently breaking the live endpoint.
- **First-run OAuth warning** ("Google hasn't verified this app") the first time a new service (Mail, Drive, Sheets) is touched — will scare a 14-year-old into thinking they broke something; needs a one-line "this is normal for our own scripts" explanation in advance.
- **Column-order mismatch**: appending a raw stringified object into one cell [0:32:00] instead of matching Sheet headers to JSON keys — an easy mistake for an AI to make silently (columns shift, data lands in the wrong field) with no error thrown.
- **Object-vs-value confusion in email/validate helpers** [0:45:40]-[0:46:12]: the video itself hits a real bug (passing a bare string where `{email: ...}` was expected) and has to debug it live — a realistic example of "the AI's function signature and your call site don't agree" that a kid will absolutely hit too.

### Doesn't transfer, and why
- The UX polish section (disable button, hide form, "Waiting..." div swap) is generic front-end state management, not backend-specific — fine to let Gemini generate on request, not worth class time.
- Manual regex email validation is a nice-to-have, not a concept kids need to hand-derive; Gemini can supply it on ask.

## Honest caveats
Despite the brief's warning, this video is squarely a web-app build with a real client/server/DB split — it is *not* one of the Docs/Drive-automation videos in this batch. No outdated APIs or deprecated UI spotted (ContentService/MailApp/SpreadsheetApp are all current). The video never discusses concurrency (many kids submitting to one Sheet at once), quotas, or CORS, and never revisits the multiple-deployment-URL juggling as a bad habit — those gaps should be filled by the instructor, not assumed covered.
