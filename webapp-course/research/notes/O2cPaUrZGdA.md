# How to create Google Apps Script Web Apps: Web App Parameters, ContentService (Laurence Svekis, 12.0 min)

**What it is:** Foundational, slow-paced tutorial: builds the simplest possible doGet web app from an empty project, then extends it to output JSON.
**Substance:** substantive — this is the clearest, most reusable "what is a web app" explainer in the batch, despite (or because of) its simplicity.

## Ideas, in the video's order
- [0:01:07] States the hard requirement plainly: a web app "must contain either a doGet or a doPost" — a function that runs automatically and returns HtmlService or ContentService output. Good one-sentence definition for kids.
- [0:01:38] Both standalone scripts and scripts bound to a Sheet/Doc/Form can become web apps — relevant since our Sheets-as-DB projects will be bound scripts.
- [0:02:46] Simplest possible server: `return ContentService.createTextOutput(val)` where `val` is a plain string — "hello world" as literally as it gets.
- [0:03:19]–[0:04:54] Full walkthrough of the Deploy dialog: description, "Execute as" (you vs the visiting user — and visiting users may lack your Drive permissions, so scripts should usually run as the owner), "Who has access" (only me / anyone with Google account / anyone with link / org-only for Workspace accounts). This is the clearest explanation of deployment permissions in the whole batch.
- [0:05:28]–[0:06:36] Explains dev URL (`/dev`) vs executable URL (`/exec`): the dev URL always reflects the latest saved code; the exec URL is frozen to whatever was last deployed, so an edit won't show until you redeploy. Important operational trap.
- [0:08:14]–[0:09:19] Second example: build a plain JS object, `JSON.stringify()` it, and note that `JSON.stringify` is required — otherwise the raw object prints as `[object Object]`.
- [0:10:26] Sets the MIME type explicitly: `ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON)` — visually identical in the browser, but this is what makes a caller (e.g. `fetch()`) treat it as real JSON.
- [0:11:31] Redeploying creates a *new* URL/version — old integrations calling the old URL keep hitting the old code unless updated. Directly relevant to any Netlify frontend calling this endpoint.

## What the frames add
Frames from [0:03:15]-[0:04:45] show the actual "New deployment" modal in full, including the "Execute as" dropdown with both options visible — worth reusing as a labeled screenshot in class material, since kids will face this exact dialog. [0:06:15]/[0:06:45] show plain "Hello World" browser output — confirms visually indistinguishable text vs JSON output, reinforcing why MIME type matters even though nothing "looks" different.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- What a "backend endpoint" minimally is: a function that runs when a URL is hit and returns something.
- Deployment identity and access control (who is "the server" vs who is "the visitor") — this is the single clearest explanation of a genuinely confusing permission model in the whole batch.
- Dev vs exec URLs, and that redeploying changes the address — a real-world "your API has versions" lesson.
- MIME type as metadata that changes how a response is interpreted, even when the bytes look the same.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Week-1 milestone: "deploy your first web app that outputs `{status:"alive"}` as JSON, and hit it from a normal browser tab." Then have them deliberately break the exec URL vs dev URL distinction: edit the code, refresh exec (nothing changes) vs refresh dev (changes appear), then redeploy and confirm exec catches up. This single exercise teaches the most commonly-hit real trap in the whole course.

### Traps a kid will hit
- Editing code and being confused the live `/exec` app didn't change — need to redeploy, not just save.
- Choosing "Execute as: User accessing the web app" and then getting permission errors because the visitor doesn't have the owner's Drive access — the video calls this out directly.
- Forgetting `setMimeType(JSON)`, so an external caller (e.g. a fetch from Netlify) gets `text/plain` instead of `application/json` and JSON.parse choke points appear.

### Doesn't transfer, and why
Nothing to flag — this is squarely core material, no age-inappropriate or adult-business content, no outdated UI (the deploy flow shown matches the current Apps Script editor).

## Honest caveats
The video repeats the deploy-dialog walkthrough almost identically to other videos in this batch (4HACRdHZPS8, HleUATukPzk) — good for reinforcement but redundant if teaching from the whole batch; pick one as the canonical deploy-flow reference for class material rather than re-teaching it four times.
