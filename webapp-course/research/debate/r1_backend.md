# Round 1: backend seat

Position: a kid knows what a backend is when they can point at their own app and say where each piece of data
lives, who may change it, and what travels over the wire. Gemini can't hand them that. So every project has
**one router, two doors**, and every concept is taught by **breaking or cheating something visible**, not lectures.

## 1. Course shape (20 meetings)

| Block | Meetings | Project | Backend concepts, each with the thing kids SEE |
|---|---|---|---|
| 0 Hello backend | 1-2 | **Cheat-me quiz** (Ben's, deliberately cheatable) + first deploy | Client vs server: find the answers in the page source (A1 RRQvySxaCW0 0:15:43). Request: type `?name=Dana` onto their own `/exec` and see JSON come back (S9 5C1HY1sSHos 0:22:29), then `JSON.stringify(e)` dumped live (S10 N3vnUgjQCGU 0:05:05). `/dev` vs `/exec`. |
| 1 Class Wall | 3-6 | Shout board / guestbook (delete only your own posts) | Rows as records, watched appearing live on the projector. **Statelessness**: a global `var count=0` that always comes back 1. **Concurrency**: whole class clicks at the count of 3, the shared counter reads 9 instead of 14, then `LockService` fixes it. Showcase-lite at M6. |
| 2 Unbeatable game | 7-10 | Any vibe-coded game, but **the server keeps the score and the answers**; leaderboard with two tabs (players + scores, linked by id) | Trust: client-side checks stop honest mistakes, not cheaters (A2 QXTPf25aSOE 0:00). GET vs POST. JSON shape (predict it before you generate). **Red-team day at M9**: kids try to cheat each other's leaderboards from the address bar and DevTools. Showcase at M10. |
| 3 AI sorter + the other door | 11-13 | Teachable Machine on an uploaded photo, result sent to the backend, which **decides** something (tally, streak, badge) instead of just logging it | M12-13: a plain HTML page outside Apps Script `fetch`es a classmate's or the hub's API. This is the Netlify rehearsal: CORS, the `text/plain` POST trick, the redirect (platform facts §5). |
| 4 Final | 14-20 | Netlify frontend with live camera/mic + their own Apps Script API | M14: pitch plus the **API menu** (the endpoint list) written before any code. M15-16: backend first, tested from the address bar and `test_` functions. M17-18: frontend. M19: no-screen explanation rehearsal. M20: public showcase. |

## 2. A typical meeting (M8, Block 2)

- **0-10 Break it.** "This score came from the browser. Predict: can I send 9999?" Ben types it into the URL; the leaderboard shows 9999.
- **10-15 Name it.** One sentence, one diagram on the hub card ("the server decides the score"). Max 5 minutes of talk.
- **15-20 Card.** Three "you will see" lines: *on the page*, *in the Sheet*, *over the wire* (action + data).
- **20-65 Build** with Gemini, following the rules in §4. At every paste, check the row in the Sheet, never the "success" message.
- **65-75 Cold test + cheat attempt** by a neighbour.
- **75-85 Trace ticket.** One button: click → front function → action → tab/row → what came back. Ben questions 3-4 kids aloud (rotation).
- **85-90** Save a version, update the contract; homework never needs code.

## 3. Teaching "backend" and proving it was understood

**The ladder** (G1, adapted): client vs server → request/response → URL and parameters → GET/POST → JSON → rows as
records, ids linking tabs → server logic and trust → statelessness → concurrency → an API used by a separate
frontend. Each rung has a **see-it moment** (above) and a **project that needs it that same day**; no theory-only
meetings. One video only: Tamara Jost's 5 minutes (G1 NzEYYemQ3_8), at M2.

**The two doors, my clear position.** Neither "google.script.run all year" nor "fetch from day one." Every kid's
`Code.gs` has **one** `api(action, data)` function. Two doors lead into it:
- `google.script.run.api(...)` from their own Apps Script page (the daily loop: no redeploy per backend edit, no CORS, works under domain-only access);
- `doGet`/`doPost` → `api(...)` (the URL door), opened in **week 2** and used every week for address-bar tests and red-teaming.

The frontend only calls one helper, `call(action, data)`; for the final, the kid swaps that helper from
`google.script.run` to `fetch` and the backend stays. This is how Ben's `webstreak/Code.gs` already works (page via
`google.script.run`, phone via `?action=`, handlers "shared by doGet and doPost"). `google.script.run` only makes the
final a rewrite (S5, SYNTHESIS #2). `fetch` only means a redeploy per backend edit, and (my knowledge, **untested**)
probably fails from a domain-only deployment, since a cross-origin fetch carries no login.

**How Ben knows**, with four checks, none of which Gemini can do for the kid:
1. **Predict, then run**: before pasting, the kid writes what row and what JSON will appear (kept on the hub).
2. **Trace tickets**, graded on correctness.
3. **Laptop closed**: at each showcase Ben points at a button; the kid draws the boxes and arrows.
4. **Fix a Bug Zoo app** (§5): 10 minutes without Gemini, then a written hypothesis before asking.

A **backend passport** on the hub records each rung as *demonstrated* (stamped by Ben or a peer), not as a quiz answered.

## 4. Surviving a forgetful Gemini (backend lens)

- **Contract at the top of Code.gs**: actions (name, input, output, tab) + guard comments "do not rename/remove"
  (G2 6XC-vN0Ox2k 12:05). Pasted into every chat.
- **One doGet, one doPost, one api**: Ctrl+F `function doGet` finds exactly one. Ben's webstreak header records the real
  case: a stale copy file with a second `doGet` silently broke habits.
- **One file per ask**: "change Index only" when styling.
- **`test_` functions** (S9 `tester()` pattern, 0:33:52): `test_addScore()` calls `api()` with fake data and checks
  the rows. Run after every paste: the kid's own alarm.
- **The Sheet is the truth**: Gemini nukes code, the data survives. That is what a database is for, and it lands best then.
- Named deployment versions; a "Gemini lied" log (Minecraft course).

## 5. The hub

The hub is **an API the kids poke**, not a slide deck.
- **Concept cards**, each with a live demo.
- **Bug Zoo**: deployed broken apps (misspelled server function, so nothing happens; stale `/exec`; answers stored in
  the page; a global-variable counter; a write with no lock; JSON sent as `application/json` from outside).
- **A public read-only JSON API** (`?action=projects`, `?action=leaderboard`) that Block 3 pages fetch.
- **A request log** on the projector: every hit appends a row (time, method, action, params); a kid sees their own request land.
- **Predictions, trace tickets, passport, project registry** (each kid's `/exec` + contract).
- **Its Code.gs shared view-only**, `LockService` on writes (like ClassPet): "a backend a person wrote."

## 6. Final project

**"An AI app with a real API."** Netlify frontend running a live camera/mic Teachable Machine model, plus their Apps Script
backend. Scope is capped by the API menu: **3-4 actions, at most 2 tabs**. The menu must include one validated write, one
read where the server computes something (filter, rank, tally), and one lock. Examples: a gesture-buzzer quiz where the
server judges who was first; a sound-controlled game with a server-held leaderboard; a "what is this" sorter
feeding live class stats. The kid ends with a public URL, a backend with contract and tests, a full passport, and a 2-minute no-screen
explanation given to an audience.

## 7. Claims, failure modes, predictions

**Strongest claims.**
1. One router, two doors makes Netlify a one-helper swap (S5 names the two mechanisms; webstreak already runs both into shared handlers).
2. Most rungs have a zero-lecture demo in the evidence: view-source (A1), `?name=` (S9), `e` dumped (S10), client vs
   server validation (A2). Statelessness and concurrency have none (SYNTHESIS #8): we build our own, since kids will hit both (platform facts rec. 4).
3. Assess acts Gemini can't perform: predict, trace, explain without the screen, fix (fits G1's continuous, multi-form PBL assessment).

**How it fails.**
- Weak Gemini rewrites to its default (`google.script.run.addScore` directly) and deletes the router; Ben rebuilds drifted contracts.
- Tickets and predictions decay into vague chores unless short and actually read.
- The access test (platform facts §0.3) may close the URL door to anonymous callers; managed devices may block DevTools,
  which kills cheating on Apps Script iframe pages (my knowledge, **untested**). Test both before M1.
- The concurrency demo may not reproduce on cue: rehearse it.
- webstreak uses GET for writes (`action=mark`); fine for a token-guarded personal app, but use it as a contrast, not a model.

**What I expect the other seats to get wrong.**
- **Fun:** games with all logic in the browser and a decorative backend that saves the score afterwards. Fun, nothing learned.
- **Gemini-survival:** so much ceremony that the kids' skill becomes managing Gemini, not understanding the system.
- **Hub:** an LMS of content pages instead of a live backend they call and watch.
- **Final/Netlify:** CORS and access level left for M18 instead of tested before M1; Teachable Machine as the star while the backend only logs.
