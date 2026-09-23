# Research synthesis for the web-app course debate

Read `CONTEXT.md` first. This is what ~169 videos (~45 h) plus a platform-facts check came to. Evidence is in
`notes/_batch_*.md` (summaries) and `notes/<videoId>.md` (per video, timestamped). The platform facts, with
sources, are in `notes/_2026_platform_facts.md`: read its section 0 and 1 before arguing about tools.

## What was processed
| Source | Batches | What it is, honestly |
|---|---|---|
| Learn Google Sheets web-app series (2019) | A1, A2 | One continuous, honest live build: pages, routing, reading/searching Sheet data, validation, email. Parts 1,2,4,5,8,10,14 are strong; Materialize CSS parts are dead weight. |
| Laurence Svekis (73 videos) | S1-S10 | About a third is real web-app/API material (doGet/doPost, JSON endpoints, fetch from a separate page, deployment). The rest is Docs/Forms/Drive/email automation, off-topic. |
| Mohammad Rameez Imdad (56) | R1-R4 | Mostly sales demos of adult business dashboards. Titles naming Gemini/Claude/ChatGPT/Antigravity almost never show an AI build (one POS video does, one-shot and error-free). Useful only for architecture patterns seen in the UI. |
| Gap videos we added (26) | G1, G2, G3 | Backend explainers + PBL practice (G1), teen projects + real 2025-26 Gemini→Apps Script workflows (G2), Teachable Machine (G3). |
| Platform facts (web research) | `_2026_platform_facts.md` | Ministry accounts, Gemini tiers, Apps Script limits, CORS, Teachable Machine status. |

## Hard constraints discovered (these override any video)
1. **Accounts:** Ministry of Education student accounts (Workspace for Education). Gemini is Ministry-licensed
   for grades 7-12 (independent use from grade 8). Model/tier unknown. **Unverified and must be tested with one
   student account:** Apps Script enabled? web-app deploy allowed? which access levels ("Anyone" anonymous vs
   "Anyone in domain")? Gemini side panel in the Apps Script editor present?
2. **Workflow:** kids use the **Gemini web app** (chat/Canvas) and **copy-paste** into the Apps Script editor.
   No API keys, no CLI, no Antigravity (Antigravity is 18+ and personal-accounts-only), no AI Studio (18+).
   Canvas makes ONE self-contained client-side page; it doesn't produce the `Code.gs` + `Index.html` split
   unless asked, and its preview can't run Apps Script at all.
3. **Assume a weak, forgetful Gemini** that rewrites whole files and silently drops working code. Full-file
   copy-paste overwrites any hand edit (G2).
4. **Camera/mic are blocked inside Apps Script pages** (sandboxed iframe). Teachable Machine image models work on
   an **uploaded photo**; sound and pose need live mic/camera → only in the **Netlify final project**.
   Teachable Machine's library looks unmaintained (≈2019-21 versions): needs a live test.
5. **Showcase/Netlify risk:** if the Ministry domain removes "Anyone" (anonymous) access, parents at a showcase and a
   Netlify page calling `/exec` both hit a Google sign-in wall.
6. Apps Script limits: 6-min execution, ~30 simultaneous executions per user, redirects via
   script.googleusercontent.com, POST from another site needs the `text/plain` trick to avoid a CORS preflight.

## Where the evidence converges
1. **The one pattern to name early:** page → server function → Sheet → back to the page. It appears unchanged in
   6 of 9 A2 videos; once kids can explain it, they can read most Gemini-written Apps Script (A2).
2. **Two unrelated ways for a page to talk to the server** (S5): `google.script.run` (only inside Apps Script)
   vs real HTTP `fetch` → `doGet`/`doPost` → JSON (works from anywhere, needed for Netlify). No video names the
   split. If the year runs only on `google.script.run`, the final project is a rewrite.
3. **The most common trap across all batches: "I edited it but nothing changed"**: the `/exec` address serves the
   last deployed version; `/dev` serves the latest code (A1, A2, S2, S6, S7, S10).
4. **Silent failures:** a misspelled server function, wrong callback, wrong data type → nothing happens, no error
   (A1, A2). "Nothing happened" must become a named debugging situation.
5. **Why a backend exists, in teen terms:** page code is public (view-source), `.gs` isn't (A1); client-side
   validation stops honest mistakes, not cheaters, so the server must check too (A2). Our own framing: **the quiz
   answers and the scores live on the server, or anyone can cheat.**
6. **Zero-code API demo:** type `?name=Dana` onto the deployed address and see raw JSON come back (S9); watch
   `e.parameter` fill in live (A1).
7. **Best concept explainer:** Tamara Jost's 5-min frontend→API→backend→database walkthrough (G1). Concept ladder
   in `_batch_G1.md`: client/server → the full loop → HTTP (URL, GET/POST, status codes, statelessness) → rows as
   records → linking two tables → backend as logic, not just storage → external frontend calling a backend.
8. **Gaps no video covers:** two users writing at once (concurrency: Ben's own ClassPet backend uses
   `LockService.getScriptLock()` on every write), CORS in practice, modern `JSON.parse(e.postData.contents)`,
   quotas.
9. **Protecting a project from its AI** (G2 + R1): "guard comments" telling Gemini which functions/endpoints must
   not change (6XC-vN0Ox2k 12:05); verify the real side effect (the row in the Sheet), never the "success"
   message; the AI got a real app "60-70% built" and needed staged prompts (R1); Google's own rules for its
   in-editor Gemini (per-file context, all-or-nothing accept, other files must be referenced explicitly) apply
   even more to plain chat.
10. **PBL (G1, Edutopia):** real-world connection, core-to-learning (not decoration), structured collaboration
    with roles, student-driven but heavily scaffolded up front, critique and revision, continuous assessment,
    a public product/showcase. Warning: handing out exact prompts to paste turns PBL into a worksheet.

## Project seeds that recur (teen-scale)
Quiz with server-side answers + scoreboard · class poll/vote with live counts · leaderboard (a table + a sort)
· guestbook/comment wall with delete-your-own · class chat / shout board (append + poll) · ticket queue with a
status pipeline (pending → in progress → done, from the restaurant demo) · class points bank as an append-only
ledger with reasons · two-tab lookup app (members + teams linked by id) · "already booked" scheduler · RSVP with
confirmation email · Teachable Machine photo classifier that logs results to a Sheet · gesture-controlled buzzer or
voice-controlled game on Netlify (final project) · multi-page app with routing.

## Reference architecture we already own
`GoolWidget/webstreak/Code.gs` (656 lines, Ben's real app): Sheet as the database, `doGet` serving the page,
`api*` functions called from the page, a token-protected JSON API (`doGet ?action=`, `doPost`) for a phone app,
`include()` for partials, writes batched in one `setValues`, header comments explaining every trap. Also
`ClassPet/backend/*.gs`: LockService on writes. Both can be shown to kids as "a real backend someone built".

## From our Minecraft course (same teacher, transferable)
The card = spec (a feature card with checkable claims "in the app you will see ___" is the Gemini prompt); a
"Gemini lied / Gemini broke it" log; cold testing by a classmate every week; homework never depends on code;
the Ministry pedagogy template (unit goal, "התלמיד ידע ל..." objectives, practical + theory assessment, ~75%
hands-on, "לשם מה?" openers, trace tables, unplugged moments) in `ClassPet/minecraft-course/05-ministry-pedagogy-applied.md`.

## Ben's words
- "it should be fun, and in a web platform to help me teach them"
- "remember this should be fun, pbl, and etc, with a big final project and multiple small projects"
- "i dont mind if they will vibe code a game, the emphasis is about building an app + a backend, we need to
  actually teach them what a backend means"
- hub: "this stack. i dont think we even want external storage, just everything on the appscript itself,
  including the domain it provides"
- "by the end of the year we'll move to netlify or something for the final project"
- "assume itll include many hallucinations etc of nuking full projects and changing the entire thing"
- "obviously beyond the videos, use your judgment on how things should be done in 2026. mind you, they will do it
  with gemini."
