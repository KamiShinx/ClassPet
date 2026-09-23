# How to create custom Web Apps with Google Apps Script (Laurence Svekis, 22.1 min)

**What it is:** Tutorial: build a standalone web app from scratch, deploy it, and use `e.parameter`/`e.parameters` request-query values to select a Sheet row and render it into returned HTML. Undated, YouTube captions.
**Substance:** substantive - this is the single best "deploy 101" video of the batch: clearest, most complete walkthrough of the deployment dialog, versioning, and query-string parameters.

## Ideas, in the video's order
- [0:01:42] Explicitly recommends standalone scripts over bound scripts as "best practice" for web apps (bound scripts *can* also host a web app, but standalone is preferred) - a direct, quotable architecture recommendation.
- [0:02:49] `doGet(e)` takes the request-parameters object `e`; return via `HtmlService.createHtmlOutput(...)`.
- [0:04:30]-[0:06:45] Fullest walkthrough in the batch of the deployment dialog: description field, "execute as" (me vs the accessing user - and what each implies for permissions), and "who has access" (only myself / anyone with a Google account / anyone) with plain-language tradeoffs for each. Good material to reuse almost verbatim for a class handout on deployment settings.
- [0:07:49]-[0:08:55] Distinguishes **dev/test URL** (only accessible to people with editor access, always shows latest saved code) from the **deployed/executable URL** (frozen at whatever version was deployed, needs explicit redeploy to update) - stated clearly and repeated with a live demo of editing code and seeing the dev URL update but not the deployed one.
- [0:09:30]-[0:10:34] Shows creating a *second, separate* deployment (a new URL) vs. updating an existing deployment with a new version (same URL) - concretely demonstrates that "redeploy" has two different meanings kids could easily conflate.
- [0:10:34]-[0:13:17] `e.parameter` vs `e.parameters`: `.parameter` gives only the first value of a repeated query key; `.parameters` gives all of them as an array. Demonstrated by adding a duplicate `id` in the query string and showing the different results side by side - a genuinely subtle, useful distinction, well demonstrated rather than just asserted.
- [0:13:17]-[0:13:50] Notes GET requests always have `contentLength: -1` (unused), while POST has real content length / postData - useful factual detail for later debugging doPost issues.
- [0:14:23]-[0:16:34] Builds `buildHtml(row)`: connects to a spreadsheet by ID, `getSheetByName('Sheet2').getDataRange().getValues()`, indexes into the row array - same core Sheet-read pattern as other videos in the batch, reinforcing it.
- [0:17:09]-[0:19:20] Wires the row-lookup to the actual `e.parameter.id` from the URL query string - so `?id=1`/`?id=2`/`?id=3` in the URL changes which spreadsheet row is rendered. This is a clean, minimal "URL parameter drives server logic" demo, good as a standalone teaching example.
- [0:21:31] Redeploys with the `id` parameter wired in and shows the live URL responding to `?id=...` changes end to end - closes the loop nicely.

## What the frames add
Frames give the clearest visual confirmation in the batch of the actual deploy dialog fields and dropdown options (sheet_002 @4:00-7:45 shows "Who has access" dropdown expanded with all three options visible, and the "Execute as" dropdown too) - genuinely useful to screenshot directly for a class handout instead of re-describing. Frames at [11:30]-[13:45] show the raw stringified `e` object rendered on the page (`{"parameter":{"id":"1"},...,"queryString":"id=1"}`), which is a good "here's literally what the request object looks like" visual aid worth reusing in class. No diagrams; text/code and dialog screenshots only.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Dev URL vs deployed/executable URL is one of the most important Apps Script-specific concepts for the class and this is the clearest treatment of it in the batch.
- Query-string parameters (`?id=1`) flowing into server code via `e.parameter` is a concrete, minimal example of "the URL itself can carry data to the backend" - simpler than a POST body, good as a first request-with-data exercise before doPost/fetch.
- Standalone vs bound script choice, stated as a real recommendation with a reason, not just left implicit.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- "Row picker": deploy a standalone web app that reads `?id=` from the URL and renders one Sheet row as HTML - a single-session exercise (no JS front end needed) that teaches request parameters, Sheet lookups, and the dev-vs-deployed URL distinction all at once. Natural warm-up before the JSON/fetch endpoint project from 8VcVm069N_0.
- A short "which URL am I looking at" exercise: have kids deliberately change code, check the dev URL (updates immediately) vs the deployed URL (doesn't), then walk through Manage Deployments to push a new version - directly rehearses the trap below.

### Traps a kid will hit
- Editing code, testing the dev URL, seeing it work, then sharing/bookmarking the *deployed* URL and being confused why their fix "isn't there" - this is explicitly demonstrated as a live gotcha and is very likely to recur constantly through the year every time a kid or the AI changes doPost/doGet code.
- Confusing "new version of the same deployment" with "brand new deployment" (two different buttons, two different resulting URLs) - shown explicitly as a point of confusion even for the instructor to narrate carefully.
- Using `e.parameter` when a form or script could actually send multiple values under the same key, silently dropping all but the first - low likelihood for a kid project but worth a one-line mention if repeated multi-select forms come up.

### Doesn't transfer, and why
- Nothing here is outdated or adult-business-specific; the whole video generalizes cleanly to teen projects. Its only limitation is scope: it stays at "read one row via query string," no writing, no JSON, no separate frontend - a good foundation lesson but not sufficient alone for the "real backend" goal.

## Honest caveats
No mention of doPost, no JSON output, no write-back to the Sheet - purely a read-only, query-string-driven single-page demo. Straightforward and honest as a first "deploy and share a URL" lesson; pairs well as a prerequisite to the more advanced doPost/JSON/fetch material in 8VcVm069N_0 and the scriptlet/template material in EiF_dpWKLNE.
