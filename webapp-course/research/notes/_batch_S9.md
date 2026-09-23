# Batch S9 -- Laurence Svekis Apps Script channel: web apps, JSON APIs, doGet/doPost, plus Docs/Forms/email automation

Eight videos, wide range of substance. Only one (`5C1HY1sSHos`, 60.8 min) is a genuine web app build with a client/server/database split. One more (`lcEew7Wxv1Y`, 20 min) is mostly Sheets/Docs automation but has a real, small `doGet` example worth extracting. The other six are **Docs/Drive/Sheets automation with little to do with web apps** — no frontend, no client, no request/response cycle beyond shared deploy/OAuth mechanics. Don't let batch size make these six look more central to "what is a backend" than they are.

## Strongest ideas for this class
1. **`5C1HY1sSHos` is close to a ready-made Milestone-2/3 project, teen-scaled as-is**: plain HTML form -> `doGet`/`doPost` endpoint -> Sheet as DB -> confirmation + admin email, built from empty. Hits every CONTEXT.md concept (client vs server, database, API, requests) in one build, and is the video the brief explicitly flags. Full breakdown in `notes/5C1HY1sSHos.md`.
2. **GET-params-in-the-browser demo** [`5C1HY1sSHos` 0:22:29] — pasting `?id=1000&name=Laurence` onto a deployed `doGet` URL and reading the raw JSON back is the cheapest, most concrete "this is what an API request/response is" demo in the batch. No code needed; good first-day activity.
3. **Tracking-pixel `doGet`** [`lcEew7Wxv1Y` 0:12:10-0:14:58] is the sharpest single idea in the batch: an `<img src=".../exec?id=5" width=1 height=1>` embedded in an email fires a real GET request and increments a Sheet counter. Shows a backend responds to *any* request, not just clicks on your own app's buttons.
4. **The deploy dialog (Execute as / Who has access) recurs identically** in `5C1HY1sSHos` and `lcEew7Wxv1Y`, and the "Google hasn't verified this app" OAuth screen recurs in *five* of eight videos — strong enough agreement to deserve fixed slides/checklists.
5. **The `tester()` mock-event debugging pattern** [`5C1HY1sSHos` 0:33:52-0:39:00] — since `doPost` can't be single-stepped in the IDE, Svekis fakes the event object locally to test server logic without touching the live endpoint. Exactly the AI-project-protecting habit CONTEXT.md asks us to flag.

## Where videos agree or contradict
- **Hardcoded column positions**: `5C1HY1sSHos` weighs and rejects hardcoding Sheet columns in favor of matching headers by name; `lcEew7Wxv1Y`'s `getUser` hardcodes positions anyway, uncommented — good "which is more robust, and why" contrast; the channel isn't consistent about its own best advice.
- **No video discusses concurrency, quotas, or many users hitting one endpoint at once** — a consistent gap the instructor must fill directly.

## What to cut
The six pure Docs/Drive/Sheets videos (`CnEodUTV_Ak`, `cfWLmNZN4Lk`, `_cRYUm9kjN8`, `mZIQZIGHoGU`, `TOlqHhidH28`, `zSPrhSsxMH4`) should not be screened as web-app material — none has a frontend or a request/response cycle. Mine only for isolated facts: `UrlFetchApp.fetch()` as a server making its own outbound request (`mZIQZIGHoGU`); the `insertImage` signature-mismatch-across-object-types bug (`zSPrhSsxMH4`, 0:24:00-0:25:30); the placeholder/`replaceText` mail-merge pattern (`CnEodUTV_Ak`) if a certificate side-project comes up. Within `5C1HY1sSHos`, skip the manual form-validation/UX-polish line by line — generic DOM work Gemini produces on request.

## Concept explainers worth reusing
- Backend-in-one-line pitch [`5C1HY1sSHos` 0:00:00]: JS frontend + Apps Script server + Sheet + email, no traditional backend needed.
- GET-params-in-browser demo [`5C1HY1sSHos` 0:22:29-0:23:35] — first-week activity.
- Deploy dialog walkthrough [`5C1HY1sSHos` 0:20:00-0:21:45, `lcEew7Wxv1Y` 0:13:17] — fixed checklist slide.
- OAuth consent-screen walkthrough, most complete in `TOlqHhidH28` [0:05:00-0:06:36] — reuse near-verbatim as a handout.
- Tracking-pixel doGet [`lcEew7Wxv1Y` 0:12:10-0:14:58] — standalone demo that requests can come from anywhere.

## Project seeds (backend concept each teaches)
1. **"Message in a bottle" form** (from `5C1HY1sSHos`, scaled down) — posts to `doPost`, appends a timestamped Sheet row: request body parsing, appendRow.
2. **"Confirm my submission"** (extends #1) — server emails the submitter their row number: source-of-truth is the server, not the client.
3. **GET-params scavenger hunt** — paste `?name=X&mood=Y` onto a deployed `doGet`: request/response made tangible, zero code.
4. **"Did you open it?" read-receipt** (from `lcEew7Wxv1Y`) — 1x1-image doGet that increments a counter, embedded in an email: server-side state, requests from something other than a click.
5. **Class admin panel over a roster Sheet** (from `lcEew7Wxv1Y`) — custom menu, guard clauses, modal popup, audit-log sheet: defensive programming, candidate pattern for Ben's course "hub."
6. **"Debug your own doPost" exercise** — kids write a `tester()` mock before touching a live endpoint: protecting a project from its own AI.

## Traps
- **Stale/wrong deployment URL**: `5C1HY1sSHos` cycles through 4+ deployment URLs in one build; redeploy-in-place-and-verify should be a class rule.
- **Execute as / Who has access set wrong** — "Only myself" or "user accessing the app" breaks it for classmates.
- **`doPost` can't be debugged in the IDE** — `tester()` is the fix; without it, kids fall into guess-and-redeploy debugging (`5C1HY1sSHos` 1:54:45-1:56:05).
- **Hardcoded Sheet column positions** — breaks silently on reorder; the channel itself is inconsistent about avoiding this.
- **OAuth screen mistaken for an error** — recurs in 5/8 videos; needs a one-line "this is normal" heads-up before a kid's first run.
- **Same-named API method behaves differently on different object types** (`insertImage` on Sheet vs. Doc, `zSPrhSsxMH4` 0:24:00-0:25:30) — a plausible AI call can still be wrong; read the actual error.
- **No concurrency/quota discussion anywhere in the batch** — must come from the instructor.
- **Duplicate request counts** (`lcEew7Wxv1Y`'s pixel jumps by 2 per open, unexplained) — good lead-in to "one action, multiple requests."

## For the hub itself
`lcEew7Wxv1Y`'s custom-menu-over-a-Sheet pattern (guard clauses, HtmlService modals, an audit-log sheet, a tracking-pixel doGet) is the batch's best fit for Ben's teaching-hub idea: an admin panel bound to its own Sheet, no separate frontend. The deploy-dialog checklist and OAuth explainer, recurring across the batch, are generic enough to become hub reference pages (already noted in the S8 batch).
