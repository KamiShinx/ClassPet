# Round 2: hub seat

## What I concede
1. **Plan for 16 real meetings, not 20** (realist): four buffers, a bronze floor per project. Hub v1 is finished in October.
2. **The memory card belongs in the project, not in the hub.** Realist (a CARD tab), engineer (`README.gs`) and fun
   (`_MEMORY.gs`) all put it inside the kid's project, and they're right. It travels with Make a copy, it's in the
   tab where the pasting happens, and it survives the hub being down. The hub keeps only the template and the house rules.
3. **Save point = Make a copy of the Sheet** (realist), not a deployed version, which doesn't give the source back
   (fun, engineer). Versions keep a different job: `/exec` is the last save that works while `/dev` is broken.
4. **Identity defaults to nickname + class PIN.** Realist's test 5 is sharper than mine: if Ben is on personal
   Gmail and outside sharing is blocked, he can't even open a kid's Sheet. Automatic email identity is a bonus
   the day-zero test might unlock. It's not the plan.
5. **One router, two doors from week 2** (backend, engineer). I put the bridge at meetings 14-15, which repeats the
   "`google.script.run` all year, then rewrite" mistake S5 warns about. The hub must be built the same way and
   show it: page door and URL door into one `route()`.
6. **No XP or badges.** I gave them a Ledger lesson as an alibi. Realist and fun (the bottom three quit) are right
   that they cost more than they teach. They're out of v1, and probably out for good.
7. **I overstated the quota risk.** Recomputed: 15 kids polling every 5 s, at about 1 s per call, is about 3
   simultaneous executions against the 30 limit. The real danger is a kid's 1-second loop, or showcase night with
   extra screens. A 10 s minimum poll plus a 10 s CacheService read covers both.

## What I still dispute
1. **A hub of meeting pages isn't worth building.** Realist's hub is mostly lesson pages, a roster, exit tickets and
   a wall; Classroom plus a Doc does that at no build cost. The hub earns Ben's October hours only as **the class's
   shared backend**: opened in the address bar in M1, its leaderboard cheated in the quiz block, called by the Netlify
   rehearsal (backend and engineer agree). Its Sheet should be visible every week, not a one-time M3 show-and-tell.
2. **Correcting a fact in engineer's file.** ClassPet exists: `C:/Users/Ben/code/ClassPet/backend/Code.gs`
   lines 43-50 use `getScriptLock()`, `tryLock(10000)` and `finally releaseLock()`. More important, ClassPet
   is **already the final project's shape**. Its `Code.gs` header says "REST API only, frontend hosted
   separately". `common.js` `api()` does `fetch` POST with `Content-Type: text/plain`, a JSON body
   `{action, data}` and `redirect:'follow'` into a `doPost` action router with read/write split and a lock on writes.
   So the engineer's `api.js` already exists in Ben's code. It ran from Ben's own account, though, not a Ministry one:
   realist's test 8 still decides it.
3. **Eight files in M1 (engineer) is too many.** The contract idea is right, but a kid on day one owns two files
   (realist). The hub can *show* the full skeleton as the example kids read, then kids grow into it by block C.
4. **Fun's class board scores people.** Bug-bounty points for finding bugs are fine. A running per-kid ranking
   in the hub isn't. Rank the *apps' leaderboards*, not the kids.

**New evidence (R4, k90Za3mjy20).** A Netlify frontend (for camera/GPS) calls an Apps Script `doPost`; first
login fails until `setupDemoData()` is run. So: (a) the final-project architecture is confirmed working in practice, not just
reasoned; (b) a new trap goes on the checklist: *if the first thing after deploying fails, run `setup()`*. The
hub should demonstrate that with its own idempotent `setup()` (ClassPet's `Seed.gs` shape). This is the one
video worth assigning whole, at the Netlify rehearsal.

## The idea I steal
**Backend's request log on the projector.** Every hit on the hub, from either door, appends a row: time, door,
action, params, nickname. It shows live on the projector. A kid clicks "vote" or types `?action=leaderboard`
and watches their own request become a row. That's one tab and one `addRow` in `route()`, cheaper than my
"backend X-ray" and a clearer lesson. The same log catches the heist in the act ("row 212:
`score`, 999999, from the URL door").

## Revised recommendation
1. Before November: realist's day-zero test on the room's machines. It decides identity, access, Netlify, and
   whether the hub can be called from outside.
2. Plan 16 meetings plus 4 buffers: Hello row → poll → cheat-proof quiz → TM photo app plus a Netlify rehearsal →
   final on Netlify (the brief fixes this; Apps Script-only is the fallback floor if test 8 fails), gold = live camera/mic.
3. Every project, and the hub, uses one `route()` with two doors (`google.script.run` and `doGet`/`doPost`), locked
   writes and a `setup()`. Ben's ClassPet is the reference.
4. Kids' projects hold their own CARD. The save point is Make a copy. `/exec` stays the last save.
5. Hub v1, built in October, is small: Today (a Meetings row that Ben edits in the Sheet), Submit link, Gallery +
   cold-test assignment, Help queue, "Gemini broke it" wall, exit tickets.
6. The hub is also the shared backend: public read actions, a deliberately naive score endpoint cheated in the quiz
   block and then fixed, and a request log on the projector. Kids get viewer access to its code.
7. No XP, no badges, no chat, no personal rankings, no hub edits on meeting days.
8. Understanding is judged from what kids do: trace, predict, break-it, cheat test. Ticks are rows in the hub.
