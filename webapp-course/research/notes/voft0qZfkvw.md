# How to Share Google Apps Script: Sharing and Deploying Scripts (Laurence Svekis, 5.8 min)

**What it is:** Short, focused tutorial on deployment types and the sharing/permissions model for Apps Script projects. Tutorial, no padding.
**Substance:** substantive: this is the single most directly relevant video in the batch for our final-project deployment questions, despite being short.

## Ideas, in the video's order
- [0:00:00] Web apps need a `doGet` function (reserved/special name) that returns content to display — the entry point for any Apps Script web app; foundational for our whole model.
- [0:00:33–0:01:39] Deploy menu: New deployment / Manage deployments / Test deployments. Deployment types: Web app, API executable, Add-on, Library. Library deploys give the project a shareable Script ID others can import.
- [0:01:39] `doGet` uses `HtmlService` to return HTML content into the browser — names the exact service our HtmlService-based web apps depend on.
- [0:02:13–0:02:47] Web-app deployment config: "Execute as" (whose account runs the code) and "Who has access" (Only myself / Anyone with a Google account / Anyone) — this access-control choice is exactly the "who can open the deployed URL" decision kids will need to make, and matters for their personal-Gmail-account setup.
- [0:03:20–0:04:24] **Test deployment vs. (live) deployment**: test deployment reflects code changes immediately as you edit; the live/executable deployment only updates when you redeploy. URLs differ too — dev URL ends `/dev`, live URL ends `/exec`. This is one of THE traps of Apps Script web apps and needs to be taught explicitly (kids will edit code, refresh their live `/exec` link, and see nothing change).
- [0:04:24] The `/dev` URL is only usable by users with edit/owner permission on the script — can't be shared with someone who only has view access.
- [0:04:24–0:04:58] Sharing the underlying Apps Script project itself (not just the deployed web app) works like any Drive file: add people/groups, set Viewer vs Editor permission.

## What the frames add
Frames confirm the exact deployment dialog flow: Select type -> Web app -> Configuration -> "Who has access" dropdown (Only myself / Anyone with Google account / Anyone) -> Deploy -> "Deployment successfully updated" with Deployment ID and copyable web-app URL. Also shows the Test deployments screen ("New Project (version 1)", listing `testScript1()`/`testScript2()`) and the doGet code with `HtmlService.createHtmlOutput(html)` autocomplete. Also captures the Share dialog for the script project itself (separate from web-app access). All of this is exactly what kids will click through, so it's a good screen-recording reference for building an in-class demo/slide deck.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- **`doGet` as the request handler / entry point**: the clearest explanation in this whole batch of "the server has a function that runs when someone loads the URL" — a genuinely reusable explainer for what a backend route does.
- **Deployment versioning**: code changes aren't live until redeployed (except in dev/test mode) — a real, concrete illustration of "the server you're talking to might be running old code," which is a useful backend concept (deployed state vs. source state).
- **Access control as a first-class concept**: "who can open this URL" is decided at deploy time, distinct from who can edit the code — good bridge into auth/permissions ideas.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **"Deploy your first web app" milestone**: write a `doGet` that returns a personalized "Hello, [name]" HTML string, deploy as a web app with access set to "Anyone with a Google account," and have each kid open a classmate's link. Teaches: entry point, HtmlService, access levels, and the exec URL. This should be an early-course milestone (maybe week 2-3) since it's the minimum viable "I made a web app" moment.
- **"Break it on purpose" exercise**: deploy, then edit the code and reload the SAME exec URL — nothing changes. Then redeploy and reload — now it changes. Directly teaches the versioning trap experientially rather than just being told about it.

### Traps a kid will hit
- **The single biggest trap in this batch**: editing code, refreshing the live URL, and being confused it "didn't save" — actually it saved, but the live deployment needs a new version. This will happen constantly with a forgetful AI rewriting code; kids (and Gemini) need a habit of "redeploy after every change you want to see live," or better, always test via the `/dev` (test deployment) URL while iterating and only redeploy to `/exec` at milestones.
- Sharing the exec URL with "Only myself" access means classmates literally cannot open it — an easy mistake when demoing to a partner.
- Confusing "share the script project" (who can edit code) with "who has access to the web app" (who can open the URL) — two separate permission systems shown back to back in this video, easy to conflate.

### Doesn't transfer, and why
- Nothing outdated or adult-only here — this material is squarely core-curriculum and age-appropriate as-is. The "Library" and "Add-on" deployment types are not relevant to our stack (skip in class).

## Honest caveats
Short and tightly focused, no filler. It's a rules-of-the-tool video, not a code-building one — pair it with something that constructs a slightly bigger `doGet`/`doPost` app (this batch has thin doGet coverage; deeper doGet/doPost/JSON API material may live in other batches per this batch's theme note).
