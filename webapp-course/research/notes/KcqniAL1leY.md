# Doc as HTML Get the HTML code from your Google Doc Send Doc as HTML email or output to webapp (Laurence Svekis, 14.2 min)

**What it is:** Tutorial, standalone script (not bound), modern UI. Exports a Google Doc's contents as raw HTML (via the undocumented `/export?format=html` download path + a Bearer OAuth token), cleans it up with regex, then either emails it as an HTML body or serves it through a `doGet` web app.
**Substance:** mixed: the HTML-export trick and the `UrlFetchApp` + OAuth token pattern are genuinely useful and slightly advanced; the actual output (a doc's HTML embedded in an email/page) is a narrow use case for this class.

## Ideas, in the video's order
- [0:01:37] Every Drive file has a fixed export path: `https://docs.google.com/feeds/download/documents/export?id=<ID>&exportFormat=html`.
- [0:05:28] `UrlFetchApp.fetch(url, {method:'get', headers:{Authorization:'Bearer '+ScriptApp.getOAuthToken()}, muteHttpExceptions:true})` - **this is the one clean example in the batch of the script authenticating to a Google endpoint with its own token**, a pattern that generalizes to calling other Google APIs from Apps Script.
- [0:09:26] `html.replace(/<head>.*<\/head>/, '')` then strips `<span>`, ids/classes/styles via more regex - shows that Docs' auto-exported HTML is extremely bloated and needs manual cleanup before reuse.
- [0:10:30] The cleaned HTML is generic and reusable for two different outputs: as `MailApp.sendEmail({htmlBody})` OR as `doGet(){ return HtmlService.createHtmlOutput(getContent()) }` for a web app - i.e. the same server function feeding two different channels.
- [0:12:07] A Doc can double as a lightweight CMS/email template: edit the Doc, re-run the script, get an updated HTML email or webpage without touching code - a good "why would you want this" hook for kids.

## What the frames add
Shows the actual before/after: the raw exported HTML full of inline styles and spans [sheet_005 @9:00-9:15] versus the stripped version with just an `<h1><span>` and the image tag [sheet_005 @10:30ish]; the same content rendered three ways - as a Doc, as a web app page, and as a Gmail message [sheet_005 @6:45, sheet_006 @8:30].

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
`doGet` returning `HtmlService.createHtmlOutput(...)` from server-generated content (rather than a static HTML file) - useful minor variant of "web app" for kids to know exists. Also: calling an external URL from server code with `UrlFetchApp` + auth token, i.e. the backend making its own outbound request (server-to-server), distinct from a browser calling the backend.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Low priority for this class; if used at all, a stretch/optional activity: "turn a Doc into a webpage" for a kid who wants a simple CMS-style project (e.g. an about-me page editable from Docs instead of code).

### Traps a kid will hit
The regex cleanup is fragile (breaks on any Doc formatting the author didn't anticipate) - not a good pattern to hand a 14-year-old relying on Gemini, since debugging broken regex-stripped HTML is hard for a beginner.

### Doesn't transfer, and why
Not related to the Netlify/external-fetch architecture - this is Docs-to-HTML content plumbing, a side feature, not a client/server example.

## Honest caveats
Relies on an undocumented Google export URL path and a manually-maintained regex cleanup - fragile, not something to teach as a first pattern; flag as "cute trick," not core curriculum.
