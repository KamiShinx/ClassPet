# Round 2, seat: FUN

**Convergence:** all five seats put a cheat or red-team moment in the quiz block, independently. The attack is the most fun thing in the course and the clearest proof of what a backend is. My job now is to make it the rhythm of every project, not a one-off.

## What I concede

1. **Plan 16 meetings, with buffers, and run the day-zero test in October** (realist). My "~17 real ones" was hopeful. Every block needs a bronze floor reachable in one meeting.
2. **My Block D (a four-meeting two-player game) goes.** The concurrency lesson is cheaper as the hub's "3-2-1, everyone click" counter that lands short and then gets locked (backend, hub, engineer; the lock shape is real in ClassPet `Code.gs` line 44 and TrumpPrize). Four meetings of polling and race conditions was exactly the grind I warned against. A turn-based game survives only as a final-project shape (realist: poll every 5 s or more).
3. **One router, two doors, from week 2** (backend, engineer). My plan had a single Netlify rehearsal at meeting 14 and no answer to "`google.script.run` all year makes the final a rewrite" (S5). Concretely: one `api(action, data)` in `Code.gs` and one `call()` helper on the page.
4. **The attacks can't depend on DevTools.** Managed laptops may block it (backend, untested). The URL door solves this: `?action=submitScore&points=9999` in the address bar is the heist, and it teaches GET at the same moment. View-source stays as the first attack.
5. **"The server knows who you are" needs the access test.** `getActiveUser()` is blank across domains (realist) and only maybe works inside one (hub). Shout Wall impersonation falls back to "anyone can type any name, so the server needs a class code".
6. **The backend seat's warning about my own seat is fair.** A game whose logic is all in the browser, with a backend that only saves the score, teaches nothing. Every project and the final need **one rule the server decides** (realist, backend), and attack day checks it.
7. **The leaderboard lives in the hub as an append-only ledger**, and XP comes only from verified acts (hub). That is better than my loose "class board", and it's a lesson in its own right.

## What I still dispute

- **Realist: live-camera Teachable Machine as "gold" only, and final shapes like "queue" or "tracker".** The one thing Apps Script can't do is the reason to move to Netlify, and it's the payoff kids have been promised since Fool the AI. R4's k90Za3mjy20 shows a real build that put its frontend on Netlify precisely to get the camera. If tests 3 and 8 pass, **everyone** gets live TM, using Ben's tested `api.js`. The final's driving question stays "something the Demo Night audience wants to play". A tracker is fine architecture but a weak reason to come back in April.
- **Engineer: the 8-file skeleton, frozen files and one-function asks.** The engineer admits kids will paste whole files anyway. And files the kid may not open make the backend magic, which works against "understand it". I'd use two or three files, a contract at the top of `Code.gs` (backend), the check that exactly one `doGet` exists, and save = Make a copy of the Sheet (realist). The engineer's reframe **"`/exec` = last save, `/dev` = work in progress"** I take whole.
- **Hub: v1 scope.** Help queue, teacher tiles, cards, ledger, API and pitch form are too much for "four screens". Before meeting 1: gallery (play plus report bug), submit link, exit ticket, the deliberately naive leaderboard. The rest waits until it's needed. Fun comes from kids playing *each other's* apps. The hub aggregates that play; it isn't the only game.
- **Realist: an oral in every meeting.** Right idea, but hold them on attack days and at showcases, where there's a live audience instead of a queue at Ben's desk.
- **Everyone: a single mid-year showcase with an outside audience is enough.** Yes, but add **one attack day at the end of every project** (15 minutes, classmates as attackers, the owner defends by pointing at the `.gs` line). It's cheap, and it's what makes kids polish between showcases.

## The one idea I steal

**The realist's bronze floor, reachable in one meeting.** It answers my own biggest worry, that the leaderboard and attack days leave the bottom three behind. A kid with a working bronze has something to defend and show. A kid with nothing just watches.

## Revised recommendation

1. October: day-zero test on a student account (realist's 9 rows). Plan 16 meetings plus 4 buffers.
2. Every project runs the same loop: build to bronze → attack day → move the attacked thing to the server → re-attack → show.
3. Projects: Hello row + Shout Wall (1-3) → Rigged Quiz with heist (4-6) → hub click-race and lock (7) → Fool the AI with TM on uploaded photos (8-9) → **Arcade showcase** (10) → Netlify rehearsal on the URL door (11) → final (12-19) → **Demo Night**.
4. The code has one `api(action,data)`, two doors from week 2, a contract at the top of `Code.gs`, one `doGet`, save = copy the Sheet, `/exec` = last save.
5. The final is a team game an audience plays, with live camera or mic TM on Netlify, one rule the server decides, and a leaderboard from `doGet`.
6. Understanding is proven by acts Gemini can't do: defend the fix on attack day, predict the JSON, find Ben's sabotage, give a no-screen trace at the showcases.
7. The hub v1 has gallery, submit, exit tickets and a naive leaderboard (its first heist target). XP comes from an append-only ledger of verified acts only.
8. Engagement comes from classmates as players and attackers, two outside audiences, and a "Gemini fail of the week", not from novelty.
