# Batch S10 - Laurence Svekis, Apps Script web apps + Docs/Forms/email automation

Five Laurence Svekis tutorials. One (N3vnUgjQCGU) is the batch's centerpiece and the most useful video seen so far for the
final-project architecture; the other four are Docs/Sheets/Forms/Gmail automation with no client/server split, useful only
as minor side material.

## Concept explainers worth reusing
- **The request object, dumped live.** N3vnUgjQCGU [0:05:05]: putting `JSON.stringify(e)` straight into the response and
  opening the URL in a browser lets a learner literally see what `e.parameter`/`e.parameters` contain. This is the single
  best "make the abstract concrete" move across the batch - reuse it verbatim when teaching request objects.
- **Dev URL vs deployed URL.** N3vnUgjQCGU [0:03:53, 0:29:16]: the "Test deployments" URL always reflects the latest saved
  code; the real `/exec` URL only updates on redeploy. Kids will absolutely hit "I changed the code and nothing happened" -
  worth a dedicated five-minute explainer before anyone deploys anything for real.
- **Same server function, different outputs.** KcqniAL1leY [0:10:30]: one `getContent()` function feeds both an email body
  and a `doGet` web page. Small but clean illustration that "the backend" is just functions, and different callers can
  reuse the same one.
- **Built-in logs vs your own log.** Qxqcsytk0kg [0:07:55, 0:08:27]: trigger-fired runs don't show in the normal execution
  log the way manual runs do; the fix (append JSON to a "log" sheet) is a pattern worth teaching early, independent of
  this specific form-submit context - any AI-written script that silently fails benefits from a visible, persistent log.

## Project seeds
1. **Class poll/leaderboard API** (from N3vnUgjQCGU) - `doGet` reads a Sheet and returns JSON, a *separate* local
   `index.html`/`app.js` (no Apps Script HtmlService) fetches and renders it. Teaches: client/server boundary, fetch,
   query params, JSON. This is the direct rehearsal for the final project and should run before it.
2. **GET vs POST toggle demo** (N3vnUgjQCGU [0:23:45 frames]) - two buttons on one page, one does `fetch(url)`, one does
   `fetch(url, {method:'POST', body: formData})`; both hit the same deployed endpoint. Teaches the method distinction
   concretely, cheap to build in one session.
3. **Certificate/report PDF generator** (ikf-oJsStd4) - Sheet of names/scores -> Doc template with `{FIELD}` placeholders
   -> one-click PDF + email per row, with a "sent" flag column so re-running doesn't double-send. Teaches: Sheet-as-DB,
   templating, and a real idempotency guard - good capstone-adjacent project, not a first project (too many services).
4. **Class feedback form with a live log** (Qxqcsytk0kg) - Form -> onSubmit trigger -> normalized row in a separate log
   tab -> auto-thank-you to the student + notify-teacher email. Teaches event-driven triggers as a second "shape" of
   backend, distinct from a web app.
5. **"Turn a Doc into a webpage"** (KcqniAL1leY), optional/stretch only - export a Doc as cleaned HTML and serve it via
   `doGet`. Cute but fragile (regex-based cleanup); only worth it for a kid who specifically wants a Docs-editable page.
6. Not really a project on its own, but useful as a **debugging exercise**: vYOi_J7PU50's word-counter mismatch (double
   spaces inflate the count) - good 10-minute warm-up on "why doesn't my number match the real one," if DocumentApp ever
   comes up.

## Traps
- **Stale deployment.** Editing code but testing the old deployed `/exec` URL (N3vnUgjQCGU) - almost certainly the #1 trap
  this class will hit once kids start deploying web apps, and it will look exactly like "the AI broke my app" when it's
  actually a deploy-workflow issue, not a code issue. Worth an explicit rule: after any code change, redeploy (or use the
  dev URL while iterating) before concluding something is broken.
- **Missing `return` in `doGet`/`doPost`.** (N3vnUgjQCGU) - silent empty response, no error, confusing for a beginner and
  for Gemini alike since nothing throws.
- **`e.parameter` vs `e.parameters` vs `e.namedValues`** (N3vnUgjQCGU, Qxqcsytk0kg) - three related but different shapes
  (singular value / array / arrays-in-an-object) across the two request styles (web app vs form trigger). Worth one
  unified reference sheet for the class rather than relying on each video's ad hoc explanation.
- **No idempotency guard = duplicate work on re-run.** ikf-oJsStd4's sent-flag pattern is the fix; without it (as in
  Qxqcsytk0kg's simpler demo) every re-run repeats every side effect (emails, PDFs).
- **A frontend setting silently breaks backend code.** Qxqcsytk0kg [0:16:26]: Form's "collect email addresses" toggle was
  off, so `namedValues['Email Address']` didn't exist and the script threw. Good real example that bugs aren't always in
  the script.
- **Deployment access setting.** "Execute as" + "Who has access: Anyone" (N3vnUgjQCGU [0:03:21]) is the exact setting a
  kid must get right for an external page to be able to call the endpoint at all; easy to leave on a restrictive default.

## Where videos agree or contradict / what to cut
The four non-central videos agree implicitly on the same base pattern (get a service object, read/write with it, mind
permission prompts) but none touch the client/server boundary - cut ikf-oJsStd4's Drive/folder-navigation narration and
vYOi_J7PU50 almost entirely; neither adds anything a 14-year-old building web apps needs. Keep N3vnUgjQCGU as required
viewing for the final-project unit.

## Honest caveat carried up from N3vnUgjQCGU
Its CORS claim ("developing with doGet avoids CORS issues... it's the code or permissions") is asserted, not demonstrated
- no CORS error or fix is ever shown, the external fetch calls simply worked throughout. Do not treat this as verified
CORS guidance for the Netlify-frontend-calls-Apps-Script final project; confirm current (2026) CORS behavior for
`script.google.com/.../exec` independently before relying on it.
