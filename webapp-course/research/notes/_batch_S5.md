# Batch S5 — Laurence Svekis, Apps Script channel

All ten videos are genuinely web-app/backend-relevant on inspection — despite the batch label calling this "mixed" with Docs/Forms/email automation, only two videos (vdP6sZKp4hU, -1ko7pP0_ww) turn out to be tangential, and neither is Docs/Forms/email fluff: they're Sheets-array-search and spreadsheet-triggers respectively. No video in this batch is a pure promo or padded filler; all are hands-on, code-on-screen tutorials, several including live bugs and fixes rather than clean pre-baked demos. UI matches the current Apps Script editor throughout (no visibly outdated tooling, no deprecated APIs flagged).

## The single biggest thing this batch surfaces: two unrelated "client-server" mechanisms
Apps Script actually has two completely different ways for client and server code to talk, and this batch teaches both without ever naming the split explicitly:
1. **`google.script.run`** (NlATpkrxdes, 9EaT4CLC7Oc, V6HKfKiLQ2w) — Apps Script's own RPC bridge. Only works while the HTML page is itself served by that same Apps Script project (`HtmlService`). No fetch, no CORS, no URL.
2. **doGet/doPost + ContentService/JSON** (O2cPaUrZGdA, HleUATukPzk, 4HACRdHZPS8, Rwau69hCC4Y) — a real HTTP endpoint a browser or `fetch()` call can hit from anywhere, including an external site.

This matters directly for the course's stated arc: kids build inside Apps Script all year using `google.script.run` (fast, simple, no CORS headaches), then for the final project move the frontend to Netlify — which **requires** switching to doPost + `fetch()` + JSON, since `google.script.run` won't exist outside the Apps Script page. None of the ten videos states this transition explicitly; it has to be taught as our own bridging lesson. Worth building a one-slide diagram contrasting the two before the Netlify migration week.

## Concept explainers worth reusing
- **What a web app minimally is** — O2cPaUrZGdA [0:01:07]: "must contain a doGet or doPost... returns HtmlService or ContentService." Best one-line definition in the batch.
- **Deployment identity & access** — O2cPaUrZGdA [0:03:19]-[0:04:54]: Execute-as (you vs visitor) and Who-has-access, plus dev vs exec URL. The clearest walkthrough; reuse this one video's deploy segment as the canonical reference instead of re-teaching the same dialog four separate times across the batch.
- **The request object** — 4HACRdHZPS8 [0:06:00]: raw `JSON.stringify(e)` dump showing `parameter` vs `parameters`. Best "what does the browser actually send" visual in the batch.
- **Async client-server with success/failure** — 9EaT4CLC7Oc [0:10:31]: deliberately breaks the server call to show `.withFailureHandler` catching it — the only video in the batch that shows a failure path on purpose.
- **Sheets as a live JSON API** — HleUATukPzk [0:04:34]-[0:06:19]: ~6 lines turning a Sheet into a GET JSON endpoint. Closest thing to "this is literally your backend" in the batch.

## Project seeds (teen scale, tagged by backend concept)
1. **Row-lookup trivia** (from 4HACRdHZPS8 + vdP6sZKp4hU): `?row=N` fetches one Q&A row from a Sheet — teaches query parameters + bounds-checking.
2. **Class check-in button** (9EaT4CLC7Oc): one click logs `Session.getActiveUser().getEmail()` + timestamp to a Sheet — teaches identity + writing rows + success/failure handlers.
3. **Name-drop sign-up sheet** (V6HKfKiLQ2w): a small form appends a row and confirms which row number it landed in — teaches writing rows + meaningful response values; strong week 2-3 milestone, nearly a complete mini-project already.
4. **Live leaderboard/roster feed** (HleUATukPzk): expose a Sheet as read-only JSON — teaches "Sheets IS the database" and doubles as the exact shape a Netlify frontend would fetch later.
5. **Photo/meme drop box** (NlATpkrxdes): client uploads an image, saved to Drive + logged to Sheet — teaches binary data (base64) crossing the client/server boundary; good "why can't I just send the file" lesson, but uses `google.script.run` so must be rebuilt for the Netlify phase.
6. **Scheduled leaderboard reset** (-1ko7pP0_ww): a time-driven trigger wipes/recomputes a Sheet nightly — teaches "backend code can run without a request," good hub candidate.

## Traps a kid will hit (real, shown on screen)
- Editing code and not seeing changes on `/exec` — must redeploy, not just save (O2cPaUrZGdA).
- `Execute as: user accessing the app` breaking because the visitor lacks the owner's Drive permissions (O2cPaUrZGdA).
- Forgetting `setMimeType(JSON)` so a `fetch()` caller gets `text/plain` (O2cPaUrZGdA, HleUATukPzk).
- Off-by-one errors between 0-indexed arrays and 1-indexed sheet rows (4HACRdHZPS8, vdP6sZKp4hU).
- Mixing quote types / missing semicolons in scriptlet-generated JS silently breaking the whole page (Rwau69hCC4Y, V6HKfKiLQ2w).
- `createHtmlOutputFromFile` vs `createTemplateFromFile(...).evaluate()` — wrong one throws or silently fails to run scriptlets (5Uir84-e2xs).
- First-run OAuth consent screens interrupting every lesson that touches Drive/Sheets/Session — budget time for this every single week.
- No concurrency testing anywhere in the batch: nothing shown handles 10-15 kids writing to the same Sheet near-simultaneously — worth stress-testing with real class size before trusting any "everyone submits at once" project (polls, sign-ups) shown here.

## What to cut
5Uir84-e2xs's HTML-templating deep dive is real but padded (22 min of mostly repeated "forgot evaluate()" debugging) and is Apps-Script-specific plumbing more than a backend concept — treat as optional/advanced, not core. -1ko7pP0_ww (triggers) and vdP6sZKp4hU (array search) are both solid on their own narrow topics but are not "backend" lessons in the request/response sense the class needs most; keep them as secondary/labeled-differently material rather than folding them into the core doGet/doPost sequence.
