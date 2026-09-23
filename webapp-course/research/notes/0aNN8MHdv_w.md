# Google Sheet Data setup WebApp Apps Script WebApp with JSON data from Sheet Contents (Laurence Svekis, 17.6 min)

**What it is:** tutorial, lesson 2 of the "Google Sheet Data API" course (follows the intro trailer i-xz34p-hvM). Live coding, current Apps Script editor.

**Substance:** substantive — this is the single clearest "how does a deployed Apps Script web app actually work" video in the batch: standalone script, `openById`, `doGet`, template evaluation, and the full deployment flow with screenshots of every dialog.

## Ideas, in the video's order
- [0:00:00] Frames the lesson as two parts: (1) pull spreadsheet data into a standalone script, (2) build a `doGet` web app that outputs that data into HTML.
- [0:02:47] Uses a **standalone** script (not bound) that reaches into a Sheet via `SpreadsheetApp.openById(id)` — explicit contrast with the bound-script pattern in the other two videos in this batch; the id is copied from the Sheet's URL.
- [0:03:54] `ss.getSheetByName('data1')` — selecting a specific tab by name; recommends keeping id/sheet name as named variables at the top of the file for easy reuse across projects (generic good practice).
- [0:05:01] First run triggers permission/consent flow — shown fully: "Google hasn't verified this app," Advanced -> go to app anyway. Same wall as in 2E9RiYrNkwM, now for a standalone script accessing another file by ID (cross-file access, a stricter permission case worth flagging).
- [0:07:13] `getDataRange().getValues()` returns the sheet as a nested array (array of row-arrays) — explicit callout that rows are nested inside the main array, i.e. how Sheets data naturally looks in code before any reshaping.
- [0:08:20] Introduces `doGet(e)` as "the function that's built-in that automatically runs the web app whenever the GET request is made to that web app" — clean, quotable one-line definition of the entry point, worth reusing verbatim style in class.
- [0:08:54] `HtmlService.createTemplateFromFile('data1')` + `.evaluate()` inside `doGet` — the HTML file must be created separately under Files > HTML and its name must match the string.
- [0:09:58] Deploy flow walked through completely: Deploy > New deployment > type "Web app" > description > "Execute as" (your account vs. accessing user) > "Who has access" (Only myself / Anyone with Google account / Anyone / org-only if Workspace) — a genuinely thorough, screenshot-backed walkthrough of every deployment option kids will face.
- [0:12:10] Explains **exec vs dev URLs**: the deployed `/exec` URL is frozen at deploy time — code changes are NOT visible there until you redeploy; the `/dev` URL (from Test deployments) always reflects the latest saved code but is only visible to accounts the project is shared with. This is a core, easy-to-miss trap and it's explained clearly and concretely.
- [0:13:50] Passes a server-side variable into the HTML template using scriptlets: `html.myString = 'Hello World 5'` on the .gs side, `<?= myStr ?>` on the HTML side.
- [0:15:32] Explains the `<?= ?>` (with `=`) vs `<? ?>` (without) distinction: `=` prints and HTML-escapes/renders the value; without `=`, the scriptlet just executes without forcing output — and demonstrates that if the passed-in value itself contains HTML tags, the non-`=` bare scriptlet won't render them as HTML while `<?!= ?>` (force-print, unescaped) will. This is genuinely one of the better plain explanations of templating/escaping in the batch, though delivered a bit confusingly out loud (worth re-explaining more simply for 14-year-olds; the frames of the actual code changes are clearer than the narration).

## What the frames add
Extremely useful for the deployment flow specifically: frames [0:09:45]-[0:12:00] are a complete, legible, step-by-step screenshot sequence of the New Deployment dialog (type select, description field, execute-as dropdown, access-level dropdown with all four options visible, final "Deployment successfully updated" screen with the exec URL and Deployment ID). This sequence alone is good enough to reuse as a class handout/reference for "how to deploy your web app," rather than re-explaining from scratch. Frames [0:05:30]-[0:06:45] show the real consent screens (choose account, "wants to access your Google Account," scope list, "Authorization successful") — same value as in 2E9RiYrNkwM but for the standalone-script case. Frame [0:12:45] and [0:14:45] show the actual rendered "Hello World" / "Hello World 5" web pages at a real script.google.com URL — confirms this is genuinely a public web page, not just an internal preview.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- `doGet(e)` as the server's entry point for any browser visiting the web app URL — the cleanest "this is where a request comes in" moment in the whole batch.
- The deploy/exec/dev distinction is a real, correctly-explained backend concept (versioned deployments) that maps directly onto what "redeploy to go live" will mean for the class's Apps Script backends all year.
- Server-to-template variable passing (`html.myStr = ...` / `<?= myStr ?>`) — first appearance in the batch of the server actually injecting dynamic data into a page before sending it, as opposed to the client fetching JSON after load (contrast this with JOOUtlOKbak/AfA8twIVxRg's AJAX approach — worth explicitly contrasting the two patterns in class: "baked in at request time" vs "fetched after load").

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Direct next-week exercise: "deploy your first Apps Script web app that says hello with your name and today's date," following this video's deploy dialog almost exactly — good first deployment milestone before anything data-driven.
- A slightly bigger step: pull one cell of a personal Sheet (e.g., a class attendance count) into a scriptlet-templated `doGet` page — teaches the `openById` + `doGet` + template pattern together.

### Traps a kid will hit
- [0:12:10] Editing code and refreshing the `/exec` URL and seeing nothing change — the single most likely "it's not working!" support request this video predicts and explains; worth pre-teaching explicitly.
- [0:05:01] Cross-file access via `openById` triggers its own consent screen distinct from a bound script's — a kid copying a Sheet ID into a new standalone project will hit this fresh each time.
- The exec URL changes on some redeploys (mentioned in a later batch video, frejbw3eJTY) — not covered here, but the seed of the trap (versioned deployments) is planted in this video.
- Scriptlet escaping (`<?= ?>` vs `<?!= ?>`) is a subtle syntax a kid (or Gemini) could get wrong silently — output either doesn't render or isn't escaped, with no error message.

### Doesn't transfer, and why
- Nothing here is Docs/Forms/email-only; this video is squarely web-app content and transfers well. The one limitation: the templating approach shown (`<?= ?>` scriptlets baking server data directly into HTML) is Apps-Script-specific and won't carry over to the class's planned Netlify-hosted final-project frontend, which will fetch JSON via `doPost`/`fetch` instead — worth flagging as "one way to do it, but not the way you'll use for your final project."

## Honest caveats
No outdated APIs. Genuinely one of the strongest, most reusable videos in the batch for teaching the deploy workflow and `doGet` concept — recommend prioritizing this one and 2E9RiYrNkwM as the two "must watch" videos if only picking two from S4.
