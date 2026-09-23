# How to Make PHP CRUD Web Dashboard with Google Sheets Backend (Mohammad Rameez Imdad, 9.9 min)

**What it is:** demo/promo, but with a twist: the frontend/admin dashboard is **PHP hosted on ordinary web hosting (Hostinger)**, and Google Sheets is used purely as the remote database via an Apps Script API. This is the only video in the batch that is directly relevant to the class's stated end-of-year plan (external frontend + Apps Script backend over HTTP).
**Substance:** mixed — thin on explanation as always, but the architecture shown (external app calling a Sheet-backed Apps Script endpoint) is exactly the pattern CONTEXT.md flags as needed for the final project (Netlify frontend -> Apps Script backend).

## Ideas, in the video's order
- [0:00:02]–[0:01:08] A PHP-hosted login page authenticates against username/hashed-password rows living in a Google Sheet, not a PHP/MySQL database — i.e., the Sheet is the entire persistence layer for a non-Apps-Script frontend.
- [0:01:41] The PHP dashboard is explicitly called "not a complete dashboard, just to show a PHP-based web app connected to Google Sheets" — the video's honest framing of itself as a proof-of-concept, not a product.
- [0:02:15] CRUD (edit/delete) works from the PHP UI on rows that live in the Sheet — confirms writes go both directions over the API, not just reads.
- [0:02:50]–[0:04:31] Setup sequence: upload PHP files to hosting's file manager -> copy code.gs into a **new**, separate Google Sheet's Apps Script project -> Deploy as Web app (Anyone) -> authorize -> copy the resulting `/exec` URL into the PHP app's `config.php`. This is the clearest demonstration in the whole batch of "an external app talks to an Apps Script backend by URL," directly matching the class's planned final-project architecture (Netlify frontend calling an Apps Script `doPost`/`doGet` endpoint).
- [0:05:05] "Test Connection" button in the PHP setup page explicitly checks that the configured URL can reach the Sheet and reports success/failure — a real example of testing an API connection before building on it, good practice to imitate with a class project.
- [0:05:38] "Run Setup" auto-creates the needed sheet tabs and seeds one demo row — an example of a setup/bootstrap script that provisions its own database structure (an idea worth simplifying for class: "first run creates the sheet headers if missing").
- [0:07:49] A ~0.5 second delay is explicitly named as "server latency" when fetching from the Sheet to the PHP frontend — one of the only moments in this whole batch where a video acknowledges request latency as a real, expected thing (not glossed over as instant).

## What the frames add
[3:30]-[4:40] shows the actual Apps Script project ("Untitled project") including the **deployment-type picker with "API Executable" listed alongside "Web app"** — a good, concrete visual of the choice a builder makes, even though this video picks the standard Web app / doGet-doPost route. [4:20]-[4:30] shows Google's real OAuth consent screen text ("Untitled project wants to access your Google Account... See, edit, create, and delete your Google Sheets spreadsheets") — an excellent, ready-made screenshot for teaching kids what they are actually granting when they authorize a script. [4:40]-[5:00] shows the raw `config.php` file with the Apps Script URL constant being pasted in — the literal glue between an external app and the Sheet backend, directly useful as a reference for the class's Netlify/doPost plan.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
An Apps Script Web app used purely as an HTTP JSON-ish API for a completely separate frontend (proves client/server really are decoupled, since the client here isn't even JavaScript/HTML — it's PHP); the OAuth consent/scopes screen made visible; a connection self-test before relying on an API; request latency named explicitly; a setup/bootstrap step that creates missing sheet structure.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A small milestone that rehearses the final project's architecture early: build a tiny static HTML page (can live on Netlify or even just opened locally) that calls a deployed Apps Script `doGet` endpoint with `fetch()` and displays the JSON it gets back — no PHP needed, same idea. This is a good "rehearsal" project months before the real final-project pivot to an external frontend, and it's a natural place to also introduce CORS problems if they hit any.

### Traps a kid will hit
Getting the deployment URL, authorizing it, and pasting it into the *right* config file/variable is a multi-step, easy-to-fumble process — this video's own presenter fumbles it slightly on screen. `doGet`/`doPost` need `ContentService`/JSON output for an external caller to parse, which is a step beyond what a same-app HtmlService project needs (`google.script.run` skips this entirely) — a real jump in difficulty the class will hit at the Netlify pivot. CORS is not shown or discussed at all here, which is odd for an external-frontend example — kids should expect to hit it even though this video didn't.

### Doesn't transfer, and why
Uploading files to a paid PHP host (Hostinger) is irrelevant — the class's plan is Netlify (free, static). The PHP language itself is not part of this course; only the "external app -> Apps Script API" shape matters.

## Honest caveats
No code is explained line-by-line; the "how" of connecting PHP to a Sheet is entirely inferred from watching config.php get a URL pasted into it. This is still a demo/promo video (a template for sale), not a tutorial — but it is the single most architecturally relevant video in the R3 batch to the class's final-project plan. No AI-assisted-building content shown.
