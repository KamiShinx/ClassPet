# Round 2: backend seat

All five seats independently put answers and scores on the server, had kids cheat them, graded understanding by acts
(trace, predict, break-it, explain) and cited webstreak's two-`doGet` bug. Engineer, hub and I reached the same "one
contract, two doors". That convergence is round 1's strongest result. What's left is where things sit, how much, and who writes it.

## What I concede
1. **Plan 16 meetings, not 20** (realist). My table assumed every meeting happens; the ladder must fit the real ones.
2. **The day-zero test comes in October, and realist's 9 rows are the right list.** I flagged the access risk but
   missed test 5: if Ben is on personal Gmail and the domain blocks outside sharing, he can't open a single kid's
   Sheet. That breaks every "Ben reads the code" assessment I proposed.
3. **Save point = Make a copy of the bound Sheet** (realist, fun). It's dumber and sturdier than my "named deployment
   versions", and it restores code and data together. Deployments stay the undo for `/exec` (engineer's framing:
   `/exec` = last save), not the backup.
4. **Drop my "backend passport".** Realist's 0-2 oral rubric plus exit tickets is the same check at a fraction of the
   admin. Ben reads 15 lines, not 15 passports.
5. **Engineer's `Date` catch** (my knowledge agrees, untested): a `Date` in a `google.script.run` result fails
   silently. It goes into the starter's read helper and the Bug Zoo.
6. **Hub's navigation trick answers my own worry.** Opening `hub/exec?p=score&s=7` as a page carries the kid's
   sign-in, so the URL door (address-bar tests, the leaderboard post) survives even a domain-only deployment. Only
   the cross-origin `fetch` dies. That means the concept can still be taught if test 3 fails.
7. **Attacks recur in every project** (fun), not on one red-team day: my break-it openers, better engine.
8. R4's `k90Za3mjy20` (Netlify for camera/GPS, real bug-fix cycle) backs the final's architecture, as long as tests 3 and 8 pass.

## What I still dispute
1. **The URL door can't wait until M7** (realist's block C) or M14 (hub's bridge). If the only door a kid uses
   for three months is `google.script.run`, then "request" is a word, not a thing. Every app, from P0, must answer
   `?action=...` with JSON in the address bar. It's one line in the starter, the demo costs zero code (S9 0:22:29), and it's
   the only rung that still survives when Netlify fails. **Bronze has to include it.** Realist's bronze has none, so a
   kid could reach bronze without ever having seen a request.
2. **Engineer's 8-file frozen skeleton in M1.** The contract is right. But 🔒 files Ben wrote and kids never
   open turn the backend into magic, and engineer names that risk themselves. I'd use realist's two files
   (`Code.gs`, `Index`). The router sits at the top of `Code.gs` in ~15 lines the kids **trace by hand in M2**, and tests go at the bottom.
   Engineer's "ask for one function, paste over one function" rule removes most of the reason for splitting files.
3. **Fun's polling Battleship**: with realist. 15 pollers near the 30-simultaneous limit (§5) plus Gemini's race
   conditions. Turn-based only, 5-10 s polling on Ben's tested starter, or cut.
4. **"Log the classifier's guess" is not a backend** (fun block C, realist P3, hub block 3). The backend has to
   *decide* something: a tally, a streak, a "first to 3 wins", a rule it refuses. Otherwise Teachable Machine is the star
   and the Sheet is just a notepad.
5. **Hub scope.** Help queue, XP ledger, teacher tiles and bug buttons together become the single point of failure
   the hub seat names, and they eat Ben's October. Day 1 needs a backend kids **call and watch**: public `?api=`
   JSON, rows landing on the projector, the naive leaderboard, the lock demo. Lesson pages are one Sheet row each (realist).
6. **Statelessness comes too late.** Only fun's block D (M11+) names it. It's a 5-minute demo (a global counter that
   always returns 1) that heads off Gemini's "my score resets" bug. Put it in M3-4.

## What I'd steal
**Engineer's logging `call()`**: every request and response printed to the console (`→ checkAnswer {id:3}` /
`← {correct:false}`). It shows the `google.script.run` door to the kids, which was the weak point of my own two-door
design. The trace ticket becomes "open the console and read it back", and Ben asks predict questions against it.

## Revised recommendation (10 lines)
1. October: realist's 9-row account test on the room's machines. Tests 2, 3, 5 and 8 decide the plan.
2. 16 real meetings. Three 2-3-meeting small projects (poll/wall → cheat-proof quiz → TM photo app), then the final, with showcases at ~M8 and the end.
3. Starter = bound Sheet with two files. `Code.gs` has one `route(action,data)` behind `rpc` (google.script.run), `doGet` and `doPost`. `call()` logs every request.
4. From M1, every app answers `?action=` with JSON in the address bar. That's part of bronze.
5. Each concept opens with a 5-10 min break/cheat moment and is used the same day. Statelessness and the lock demo are mandatory.
6. Every project has an attack round. Every project's backend must enforce or compute one rule.
7. Gemini: card pasted first, one function per ask, paste over one function, `test_` run and the row checked, Make-a-copy save point.
8. Proof of understanding: predict-the-JSON, console trace, 0-2 oral, fix-a-renamed-function without Gemini. No passport.
9. Hub v1 = a live backend (public JSON, projected request log, naive leaderboard, lock demo), plus one row per lesson.
10. Final: the contract (3-4 actions, ≤2 tabs, one refused input) comes before code. Bronze stays on Apps Script. Netlify + live Teachable Machine only if tests 3 and 8 pass.
