# Round 1: hub seat

Position: the hub is the first backend kids use, read and call from their own apps, not a portal around the
course. One Apps Script project bound to one "Class" Sheet, deployed by Ben; v1 is four screens.

## 1. Course shape (20 meetings)
| Block | Meetings | Project | What it teaches |
|---|---|---|---|
| 0 | 1-2 | Use the hub, then "Hello backend" logger (A1 Part 1): button → own Sheet row | the loop page → server fn → Sheet → page; deploy; `/dev` vs `/exec` |
| 1 | 3-6 | **Cheat-proof quiz**: answers + scoring in `.gs`; score posts to the hub's class leaderboard | why a backend exists (view-source cheat, A1 15:43); server-side checks (A2, QXTPf25aSOE) |
| 2 | 7-10 | **Class poll / shout board** with 2 linked tabs | many writers, concurrency, ids across tabs, append + poll |
| 3 | 11-13 | **Teachable Machine photo classifier** (upload) that logs results; the app exposes its own `?api=` JSON | ML in the browser, the result goes to the backend, your app as an API |
| — | 13 | **Mid-year showcase** in the hub gallery (classmates + a second class inside the domain) | |
| 4 | 14-15 | **The bridge**: one static page on Netlify calling your own `/exec` with `fetch` (the text/plain trick) | `google.script.run` vs HTTP (S5); CORS; the redirect |
| 5 | 15-19 | **Final project**, weekly checkpoints | |
| — | 20 | **Showcase night** | |

## 2. A typical meeting (meeting 8, poll block)
- **0-5** Hub "Today" on the projector: mission + last week's top "Gemini broke it" story.
- **5-20** Concept beat on the hub: an unlocked read→+1→write vote counter; 15 kids press on "3-2-1", the count
  lands short; the locked version lands on 15. (My knowledge: `appendRow` rarely loses rows; read-modify-write does.)
- **20-25** Open today's feature card in the hub and update your project card.
- **25-65** Build; "I'm stuck" joins the hub help queue (Ben works it from his phone); checkpoint at first-working.
- **65-75** Cold test: the hub hands each kid a random classmate's link, and they file a bug row.
- **75-85** Three kids explain-back at Ben's desk; the rest fix reported bugs.
- **85-90** Submit `/exec` link + exit question in the hub ("which function wrote your row?").

## 3. Teaching "what is a backend", and checking it
- **Meeting 1, zero code:** type a nickname into the hub, watch the row appear on the projected Sheet; type
  `hub/exec?api=gallery` in the address bar, get raw JSON (S9, A1 `e.parameter`). Tamara Jost's 5 boxes (G1) on the
  wall, labelled with the hub's own names.
- **The deliberately naive leaderboard (block 1):** the hub's score endpoint trusts anything; a kid will post
  999999 from the address bar within minutes. Lesson: Ben adds a per-kid key + plausibility check server-side,
  kids do the same to their quiz (A2: client checks stop honest mistakes, not cheaters).
- **How Ben knows:** four checks, ticked as rows in the teacher view; 3 explain-backs/meeting ≈ 4-5 per kid a year.
  1. *Point at the row*: "press this button. Which tab and row changed, and which function did it?"
  2. *Predict the JSON*: before loading `?api=x`, write down its shape (S4 kata).
  3. *Silent-failure hunt*: Ben renames one server function in a copy; the kid finds it (A1, A2's silent failures).
  4. *Cheat test*: a classmate tries to beat the kid's quiz from view-source or the console.

## 4. Surviving a forgetful Gemini
The rules only stick if a tool makes them the easy path, so the hub carries them:
- **Project card lives in the hub**: what the app does, tabs + columns, function names that must not change.
  **"Copy for Gemini"** prepends the house rules (*return only the changed function; never rename guarded functions;
  Code.gs and Index.html are separate files*). Every new chat starts with it. (Guard comments: 6XC-vN0Ox2k 12:05.)
- **Checkpoint = a deployed version** with a description, logged in the hub (my knowledge, verify: editor project
  history shows old versions' code). Before any big ask: Make a copy.
- **One feature per chat. When it gets confused, start a fresh chat with the card.**
- **Split files:** `Code.gs` (routes), `Data.gs`, `Index.html`, `Mine.gs` (hand edits Gemini never sees). Ben's
  webstreak header records the failure: a stale copied file held a second `doGet`; load order picked the winner.
- **Verify the row, never the "success" message** (G2).
- **Broke-it log** in the hub: what I asked, what broke, how I got it back. It opens the next meeting.

## 5. What the hub holds
**Kid view:** Today (mission, 3 tips, the feature card), My project card + Copy for Gemini, Submit link +
checkpoint, Gallery (every kid's live app, "play" and "report bug"), Help queue, Broke-it log, My progress.
**Teacher view:** 15 tiles (working / stuck / submitted), the queue, explain-back ticks.
**Admin = the Sheet itself.** Ben edits the `Meetings` tab rows, and no admin UI gets built. Tabs: Students, Meetings,
Submissions, Help, BrokeIt, Scores, Checks, Ledger.
**As a backend example:**
- `?api=today|gallery|scores&game=` returns JSON, and a POST `{action:"score"}` writes a score.
- The kids' apps post to the class leaderboard. In block 1 that's a plain link (`hub/exec?p=score&game=quiz&s=7`
  opened as a page). A navigation carries the kid's sign-in, so it works even under domain-only access. In block 4 it
  becomes a real `fetch` from Netlify.
- The class gets viewer access to the hub's script, so kids read a real backend: ClassPet's shape (action
  router, `LockService.getScriptLock()` + `tryLock` on every write, `Db.gs` getAll/insertRow).
**XP/badges earn their place only as a lesson:** block 2 opens the `Ledger` tab and asks "how does the hub count your
XP?" (it's an append-only ledger, a project seed). XP comes only from classmate-verified submissions, explain-backs,
and broke-it entries that include a recovery. Nothing for clicks.

**Build reality.** v1 before meeting 1, reusing ClassPet's router/lock/Db: Today, Submit, Gallery, Help, teacher
tiles. API + leaderboard by meeting 3; broke-it log, cards, Ledger by meeting 7. Ben edits on `/dev`, deploys only
between meetings: the hub models the habit it teaches.
**Concurrency.** Every write sits behind the lock; 15 appends queue in a few seconds. The real limit is 30
simultaneous executions per user. Deployed "Execute as: me", every kid's call counts as Ben's (my reading of
the quota). So no polling faster than every 20-30 s, and reads are cached ~10 s with CacheService.
**Access (day-zero test).** Ben deploys from a Ministry-domain account, "Execute as: me", "Anyone in domain".
Kids never grant OAuth to the hub, which avoids the under-18 third-party block (§0.4). My knowledge: in the
same domain, `Session.getActiveUser().getEmail()` identifies the kid with no login. If Ben's account is outside the
domain, fall back to ClassPet's pick-your-name plus a class code.

## 6. Final project
A one-sentence app built from a Netlify frontend, the kid's own `/exec` JSON API and a Sheet with 2+ tabs. Scope
limits: at most 3 endpoints, one write with a server-side check, Teachable Machine live (camera, mic or pose now
that it's off the iframe) encouraged. A pitch form in the hub requires the tabs, the endpoints and "what the
server refuses" before any code. Each kid ends with a Netlify URL, an API with an **API card** in the hub that
classmates can call, a checkpoint history, broke-it entries and a recorded 2-minute trace of one request.

## 7. Claims, failure, predictions
**Strongest claims:**
1. **The hub makes "backend" visible before a kid can build one.** Rows appearing, JSON in the address bar and the
   hacked leaderboard are the zero-code demos the evidence ranks highest (S9, A1, A2). No other artefact in the
   course is a backend on day one.
2. **Only a shared backend creates many users.** Polls, leaderboards, concurrency and "someone else's data" need
   other people. No video tests concurrency (A1, S5), and the platform facts recommend teaching the lock early (§5).
   The hub supplies the other users and the lock.
3. **It's cheap because Ben already wrote it twice.** ClassPet has the router, lock and Db helpers. webstreak has
   `doGet` serving a page, a JSON `?action=` API and `include()`. v1 is a reuse, not an invention.

**How it fails in a real room:** access test fails → no identity, domain-only API (link fallback survives,
cross-app `fetch` doesn't). It eats Ben's prep time, or a Gemini edit breaks it on a meeting morning: single point
of failure (mission also on the board; deploy freeze). Kids farm XP or zone out. A 2-second poll hits the quota.

**Other seats will get wrong:** treating the hub as an LMS (Classroom does that) and missing that it's the backend
example; over-scoping it (chat, realtime, auth); anti-Gemini rules on paper with no button to enforce them; one
shared Sheet for every kid's app (kids own their Sheets; only the hub is shared).
