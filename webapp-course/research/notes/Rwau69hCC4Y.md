# How to Output Google Doc Contents to WebApp using Google Apps Script (Laurence Svekis, 13.9 min)

**What it is:** Hands-on coding tutorial, no visible year marker but UI matches ~2021-2022 Apps Script editor. Builds a doGet web app that loads a Google Doc's content as HTML.
**Substance:** substantive: real doGet + UrlFetchApp + auth-token code shown and debugged live, not just talk.

## Ideas, in the video's order
- [0:00:34] The web app reads a doc ID from request parameters and renders that doc's live content — demoed by editing the doc and refreshing the page.
- [0:01:06] Core method: `doGet(e)`, read `e.parameter.id`, call the Google feeds "download/documents/export" endpoint with that id, swap in the id via string replace.
- [0:01:40] `UrlFetchApp.fetch()` converts the exported doc into HTML text, then `HtmlService.createHtmlOutput(html)` returns it as the page.
- [0:06:09]–[0:07:51] Builds the fetch `params` object: `method:'get'`, `headers:{Authorization:'Bearer '+ScriptApp.getOAuthToken()}`, `muteHttpExceptions:true`. This is the clearest on-screen demonstration in the batch of using the script's own OAuth token to call a Google API.
- [0:08:23] Live bug: mixed single/double quotes threw "improper argument" — realistic debugging moment, not scripted-clean.
- [0:10:38] Adds a condition — `if ('id' in e.parameter)` — to read the id dynamically from the URL, else fall back to a default id, so the same web app can load different docs.
- [0:12:20] Deploys via New Deployment, sets access to "only myself" because the docs being loaded are private to the author's Drive.
- [0:13:25] Demonstrated with docs containing images and colored/bold text — all came through in the HTML output. (generic capability demo, not a concept)
- Whole video: single doGet function, no doPost, no ContentService JSON — this is HTML output only, not an API.

## What the frames add
Frames [0:06:00]-[0:08:00] show the actual `param` object being typed with headers/Authorization/muteHttpExceptions — useful as a literal code reference for OAuth-token fetches. [0:12:30] shows the real "New deployment" dialog (Execute as / Who has access), same UI kids will use. [0:02:00]-[0:03:00] show the Google Doc being edited and the file list side panel — nothing conceptually new, just confirms the demo is live and not faked.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- doGet reads a query parameter (`?id=...`) to decide what to return — dynamic request handling.
- The script can authenticate itself to another Google service using `ScriptApp.getOAuthToken()` — shows there's a difference between "the app acting as its owner" vs "the visitor."

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "mail-merge viewer": pick one Google Doc (e.g. a story or rules doc), have kids write a doGet that loads `?id=<docId>` and renders it. Good five-minute demo of "the URL controls what the server does," but not more than that — doesn't teach Sheets-as-database, which is our main DB story.

### Traps a kid will hit
- Mixed quote types breaking JSON-like objects (the video itself hits this).
- The doc-export/feeds URL is an old, semi-undocumented Google endpoint; brittle, worth avoiding as a taught technique.
- Permissions: script needs to request Drive/Docs scopes the first run — kids will hit the "authorize" screen and need to click through it.

### Doesn't transfer, and why
The whole "export a Doc as HTML via feeds URL + Bearer token" trick is a niche party trick specific to Google Docs export, not a general backend lesson. It won't generalize to the class's real project shapes (forms, polls, games with Sheets as DB). Skip as a project seed; keep only the doGet-with-parameter and OAuth-token ideas as talking points.

## Honest caveats
No ContentService/JSON at all in this video — it's HtmlService only. The "feeds" export URL trick is old and could break if Google changes that endpoint; not verified by us to still work in 2026.
