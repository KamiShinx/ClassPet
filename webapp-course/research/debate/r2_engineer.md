# Round 2: engineer

Most seats reached the same spine on their own: one router with two doors, answers on the server, cheat, trace
and break-it checks, and the webstreak two-`doGet` bug. I won't re-argue it.

## What I concede
1. **Too many files.** My 8-file starter is too much for M1 (realist). Revised: **4 files**. The kid owns
   `Code.gs` (logic) and `Index.html` (page + CSS). Ben owns and freezes `Api.gs` (router, `doGet`/`doPost`/`rpc`,
   Db helpers, lock) and `ApiClient.html` (`call()`). Kids never create a `.gs` file (realist's rule), and that
   takes out most of the global-scope risk at its source.
2. **The undo is a Sheet copy, not a deployment.** Realist and fun are right: a deployed version keeps *serving*
   old code, but getting the *source* back through Project History is clunky and unverified. A "Make a copy" of
   the Sheet, named `SAVE 3 poll works`, brings back code and data with no diff to read. I withdraw claim 3 as an
   undo mechanism. `/exec` = "last published" still stands as the explanation for "nothing changed".
3. **The card lives outside the code.** A comment file inside the project gets eaten when Gemini returns a whole
   file. The card goes in a `CARD` tab of the Sheet (realist), so every SAVE copy carries it.
4. **Plan 16 meetings plus buffers** (realist). My 20-meeting table was wishful.
5. **Ben needs a Ministry-domain account** (realist test 5, hub §5). Without one he can't see kids' projects,
   `getActiveUser()` is blank, and the hub can't identify kids. This goes into the day-zero test as a blocker.
6. **DevTools may be locked on managed laptops** (backend). My `call()` console log and every "cheat from the
   console" exercise would die with it. Fix: `ApiClient.html` draws its own **wire log**, a small on-page panel
   showing `→ checkAnswer {id:3}` / `← {correct:false}`, so the request is visible with no DevTools. Cheats go
   through the address bar (`?action=submitScore&points=999`), which always works.
7. **ClassPet exists** (`C:/Users/Ben/code/ClassPet/backend/Code.gs:44`). It's the better model: reads skip the
   lock and only writes take `tryLock`. `Api.gs` copies that split.
8. **k90Za3mjy20** confirms the final's shape: Netlify for camera/GPS, "Anyone" access, the `/exec` URL in a
   `const`, a `doPost` taking 3-5 s with an image. **The note doesn't show how cross-origin was handled**, so the
   `text/plain` trick stays on the day-zero list. Two things I'm adopting: its only bug was an unrun setup
   function, so `Api.gs` creates missing tabs on first call (as webstreak's `sheet_()` does); and a 3-5 s call
   means `call()` shows a busy state and disables the button, or kids double-submit.

## What I still dispute
- **Realist's "return the whole file".** That is exactly how hand edits die (G2), and a weak Gemini on a 32K
  free-tier context loses functions from a growing `Code.gs`. For `.gs`: **one function per ask**, pasted over
  that function only. For `Index.html`, a whole file is acceptable *because* `call()` lives in a frozen file it
  can't touch. Realist's 30-second "tick off the function names" check stays as the pre-paste check. `selfTest()`
  stays as the post-paste alarm (backend's `test_` functions are the same idea).
- **Netlify as silver/optional** (realist). The brief fixes Netlify for the final. If day-zero tests 3 and 8
  pass, everyone does it, and with the one-helper swap it's one meeting, not a tier. It becomes optional only if
  those tests fail.
- **Fun's Block D battleship** (4 meetings of polling multiplayer). Two writers, turn checks, a lock and polling
  against 30 simultaneous executions is the likeliest block to grind (fun admits this). Keep turn-based games as
  a final-project option on a tested skeleton, not a class block.
- **Hub posting kids' scores into the hub leaderboard in block 1.** It makes Ben's hub a live dependency of 15
  projects on day 3. Their own leaderboard lives in their own Sheet; the hub reads it later over the URL door.
- **Fun's `google.script.run.submitScore(999)` from the console.** Inside the HtmlService iframe you have to
  switch the console context to the user-code frame (my knowledge). That's fiddly, and dead if DevTools is locked.
  Use the address-bar door.

## The one idea I'd steal
**Hub's "Copy for Gemini" button.** It puts the kid's card together with the house rules ("return only the
function I name; never rename these; plain JS, no libraries, no fetch headers") and the reject list in one click.
Rules on a wall decay; a button that builds the prompt makes the safe path the lazy path. The fallback, if the
hub is down, is the `CARD` tab copied by hand.

## Revised recommendation
1. Day-zero test in October on a real student laptop: Apps Script, deploy access levels, incognito `/exec`, Netlify
   `text/plain` fetch, DevTools, Ben's Ministry account, TM in HtmlService.
2. Starter = a Sheet with a `CARD` tab and 4 files; Ben freezes `Api.gs` and `ApiClient.html`; kids own `Code.gs`
   and `Index.html`.
3. One contract (`allowed` list), two doors: `rpc` via `google.script.run` daily, `doGet`/`doPost` JSON from week 2
   for address-bar tests and cheats.
4. Paste loop: "Copy for Gemini" → one function → tick names → paste over that function → `selfTest` → look at the
   row → `SAVE n` copy when green; publish a new version of the *same* deployment before sharing.
5. `ApiClient` shows the wire log on the page and a busy state; `Api.gs` auto-creates tabs, locks only writes, and
   keeps Dates as ISO strings.
6. 16 planned meetings: hello row → poll (race + lock) → quiz (cheat) → TM photo → the other door (Netlify
   rehearsal) → final. Showcases mid-year and at the end.
7. Final: 3-4 actions, 2 tabs, one server-enforced rule, live TM on Netlify via the swapped `api.js`. Plan B
   (top-level navigation hand-off) only if "Anyone" is blocked.
