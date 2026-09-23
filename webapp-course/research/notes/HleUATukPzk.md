# Web App Output as JSON data: Web App JSON Feed ContentService from Sheets Data as JSON API endpoint (Laurence Svekis, 9.3 min)

**What it is:** Tight, focused tutorial: three variations of a doGet that outputs JSON — from an external API, from a WordPress feed, and (most relevant) from a Google Sheet.
**Substance:** substantive: short, dense, and directly builds the exact shape ("Sheet as JSON API") our class needs for a real backend.

## Ideas, in the video's order
- [0:01:07] `UrlFetchApp.fetch(url).getContentText()` pulls JSON from a public external API (randomuser.me) inside doGet, then passes it straight through as the web app's own output — the app becomes a thin proxy for another API.
- [0:02:51] `ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON)` — same MIME-type pattern as O2cPaUrZGdA, reinforced with a live external JSON payload as proof it round-trips correctly.
- [0:04:01] Notes you can point this at *any* url you're allowed to fetch, e.g. a WordPress json feed — generalizes the "your web app can also be a JSON relay" idea.
- [0:04:34]–[0:06:19] The Sheets-as-database example: `SpreadsheetApp.openById(id).getSheetByName('data1')`, `.getDataRange().getValues()`, `JSON.stringify(data)`, returned with JSON mime type. This is the closest thing in the batch to "Sheets as your app's real database, exposed as an API."
- [0:06:19] Live bug: `getSheetByName()` was called without an argument at first, threw "parameters string don't match the method signature" — small but realistic API-signature trap.
- [0:08:34] Final line: "once you're ready... this is the endpoint you can connect to from other applications" — explicitly frames the deployed web app as a general-purpose API other apps/frontends can call. This is the exact shape needed for Netlify → Apps Script doPost/JSON later, even though this particular video only shows doGet.

## What the frames add
Frame [0:03:00] shows raw output of the randomuser.me JSON payload rendered directly in-browser — useful to show kids "this is what an API response looks like," since it's dense, real, nested JSON rather than a toy object. No diagrams; otherwise just code-on-screen, matching the transcript closely.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- A Sheet can be exposed as a read-only JSON API in ~6 lines of code — this is the cleanest teachable example in the batch of "Sheets IS the database, this function IS the API."
- The idea that "your backend" can itself be a client of someone else's backend (the fetch-and-relay pattern) — useful for explaining chained services if a project needs it (e.g. combining a public API with the class's own data).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
"Turn your class roster / poll results Sheet into a live JSON feed": pick a Sheet, write a doGet that returns `getDataRange().getValues()` as JSON. Directly reusable in a later step where the frontend (even one hosted on Netlify) fetches this same URL to render a leaderboard or list. This is a strong, concrete, one-lesson milestone.

### Traps a kid will hit
- Calling a sheet method (`getSheetByName`) with no or wrong argument and getting a signature-mismatch error — exactly what happens on screen.
- Forgetting `setMimeType(JSON)` so the consuming `fetch()` on the frontend gets `text/plain` and `.json()` fails.
- Not realizing `getDataRange().getValues()` returns rows as arrays of arrays (not objects with column names) — will need a small transform step (not shown in this video) to turn rows into `{col: val}` objects for a cleaner API, which Gemini can be asked to add.

### Doesn't transfer, and why
Nothing here doesn't transfer — this is squarely core, current, and age-appropriate. The external-API-relay example (randomuser.me) is a nice-to-have illustration, not essential.

## Honest caveats
Only doGet is shown; no doPost/writing data. For a two-way backend (submit + read), this needs to be paired with a doPost video (see V6HKfKiLQ2w in this batch) — this video alone only covers reading.
