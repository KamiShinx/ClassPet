# Round 1, seat: FUN

**Position:** the course lives or dies on whether a 14-year-old wants to come back. Novelty runs out by week 3, so the engine is a loop that repeats in every project: **build it, a classmate attacks it, move what got attacked onto the server, they attack again.** Each backend concept arrives as the fix to an attack the kid just suffered. That loop is also PBL's critique and revision, with a public product and an audience.

## 1. Course shape (20 meetings; expect ~17 real ones after holidays)

| Block | Mtgs | Project (kid picks the theme) | Attack | Backend idea it forces |
|---|---|---|---|---|
| A. Shout Wall | 1-3 | Class guestbook | "Post as someone else" (the name field is client-side) | page → server → row → back; `/dev` vs `/exec`; the server knows who you are, the page can lie |
| B. Rigged Quiz | 4-7 | A quiz on their own obsession, plus a scoreboard | **Heist day:** a perfect score on a classmate's quiz, any way you can | view-source shows the answers; `google.script.run.submitScore(999)` works from the console (my knowledge, demo it live). So answers and scoring move to `.gs` |
| C. Fool the AI | 8-10 | Teachable Machine classifier on uploaded photos, every guess logged to a Sheet | Photos that fool a classmate's model score points | the model is a resource at a URL (G3); a classifier always answers, so train a "nothing" class (kwcillcWOg0 0:16:33, TOrVsLklltM 0:07:58) |
| **Showcase 1: Arcade** | 10 | Another MAKE group plays everything on school laptops | | a mid-year audience |
| D. Sink My Ship | 11-14 | Two-player battleship-style game, state in the Sheet, polling | Peek at the ships; move out of turn; both click at once | the server forgets everything between requests; server-side turn check; `LockService` (Ben's ClassPet); `?action=state` read as raw JSON in the URL bar (S9) |
| | 14 | **Netlify rehearsal:** a tiny Netlify page `fetch`es their game state | | real HTTP vs `google.script.run` (S5); tests the domain "Anyone" risk 6 weeks early |
| E. Final | 15-20 | Team game on Netlify with live camera/mic, Apps Script backend | Attack day at 18 | all of the above, plus `doPost`, CORS, `text/plain` |
| **Showcase 2: Demo Night** | 20 | Parents play; the hub's big screen shows every team's live board | | |

Small projects are capped at 3-4 meetings. Final-project ideas collect on the hub from meeting 10, and teams form at 14. Homework never needs code: play a classmate's app and file a bug, train a TM model, answer predict questions.

## 2. One 90-minute meeting (meeting 5, Heist day)

- **0-5** Hub on the projector: the class board, plus "Gemini fail of the week".
- **5-15** Heist: 8 minutes to post a perfect score on classmates' quizzes (links on the hub). Scores land live.
- **15-30** Debrief: "How did you cheat?" Ben draws the 5-box diagram (NzEYYemQ3_8) and asks where the answers were living. The rule: *the browser is enemy territory.* Fist-to-five (JBK4C6agqAA).
- **30-65** Pair sprint. The navigator holds the card: "the answers are not in view-source; a 999 sent from the console is rejected". Gemini → paste → test on `/dev` → **check the Sheet row** → save point.
- **65-80** Re-heist on each other's v2. Failed attacks get logged as bug reports on the hub.
- **80-90** Exit ticket: one predict question, plus "trace your submit button using your real function names". Update the memory file.

## 3. Teaching "backend", and how Ben knows they got it

Through attacks. Three points the research makes: page code is public (RRQvySxaCW0 0:15:43), client checks stop honest mistakes but not cheaters (QXTPf25aSOE 0:00:00), and filtering in the browser isn't privacy (AbFbc615J9M). Kids *do all three to each other* before Ben names them. Meeting 11 is unplugged: kids act out browser, server and Sheet with paper requests, and one plays the cheater.

Evidence that doesn't depend on what Gemini produced:
1. **Defend your fix:** the owner shows the attacker the `.gs` line that stopped them.
2. **Predict before run:** questions on the hub, answers stored per kid.
3. **Ben breaks it:** he renames a server function and the kid diagnoses the silent failure (A1/A2).
4. **Explain your request** live to a stranger at both showcases (G1 seed 4).

## 4. Surviving a forgetful Gemini

- **`_MEMORY.gs`**: a comments-only file that lives *inside* the project: purpose, files, Sheet columns, the function names that must not change. It's pasted at the top of every chat. One feature per chat.
- **The card is the prompt**, with checkable "you will see ___" claims (Minecraft course). Kids get starters, never paste-scripts (GExtTQytNNo).
- **Guard comments** around the frontend-backend calls (6XC-vN0Ox2k 12:05).
- **Before pasting:** Ctrl+F every protected name in Gemini's reply, and confirm there's exactly **one** `doGet`. The header of Ben's own webstreak `Code.gs` records this failure: a stale second file carried a second `doGet`, and a feature "never worked".
- **Save point = "Make a copy" of the project** at each working milestone. Deployments keep old versions serving but don't give you the old source back (my knowledge; test it).
- **Two strikes:** if the same fix fails twice, go back to the save point and start a fresh chat.
- **The "Gemini broke it" log is a game** with a weekly award, so the frustration becomes content.

## 5. The hub

- **Arcade directory** (every kid's current link), plus the project cards and attack rules.
- **Class board:** points for shipping, owner-confirmed bug reports, surviving attacks and fixing. There are no "best app" points, so a weak coder can still score by finding bugs.
- **Exit tickets and predict questions**, feeding Ben's per-kid understanding view.
- **Reference pages:** deploy checklist and `tester()` mock (S8), a "nothing happened" flowchart, the memory-file template.
- **Showcase mode:** full-screen live boards.
- **A backend example with a planted bug.** At meeting 7 Ben announces that the hub has a client-side-trust bug, and the first kid to find it gets a bounty. Kids then read its cleaned `Code.gs` and Sheet tabs. Nicknames only, per the MoE privacy rule.

## 6. The final project

The driving question: *"Build something the Demo Night audience will want to play, powered by an AI that sees or hears them."* Teams of 2-3 with roles (hnzCGNnU_WM 3:08): AI/frontend, backend/data, tester/producer. Examples: gesture-buzzer trivia (G3 seed 4), a voice-controlled game with shared high scores (G3 seed 5), a pose "freeze" game.

Scope is 3 must-have cards (a live TM model; `doPost` writes a row; `doGet` returns a leaderboard) plus stretch cards. The MVP is due at meeting 17. Meeting 18 is attack day plus a critique gallery walk, 19 is revise and rehearse, 20 is the show.

**Each kid ends with** a public link, their Sheet, a hand-drawn diagram of their own request cycle, and the experience of having explained it to a parent.

## 7. Claims, failure modes, predictions

**Three strongest claims**
1. **Attack-then-fix teaches the backend better than explaining it.** The corpus's best "why a backend" material is all about trust: view-source (A1), cheatable validation (A2), leaky lookups (AbFbc615J9M). SYNTHESIS #5 already says the quiz answers live "on the server, or anyone can cheat." I make the kids do the cheating. *(My judgment that experience beats lecture; not measured.)*
2. **Audience, peer feedback and revision are the PBL, not frosting.** An outside audience deepens thinking (hnzCGNnU_WM 1:34). Peer feedback is the most useful kind, and the culminating event is "a big deal" (JBK4C6agqAA 1:40). Revision gets fixed time (GExtTQytNNo 1:09). The re-heist *is* the revision.
3. **Teachable Machine is fun when it's social and can be fooled.** Kids play "fool your friend's AI" mid-year, and live camera is held back as the final's payoff, since HtmlService blocks camera and mic (platform facts, G3). A week-1 wow demo wastes it.

**How it fails in a real room**
- Heists turn personal: slurs on a wall, a humiliated kid. Rules: attacks only on attack days, you attack code and not people, Ben reads every row. Moderation is a real cost.
- The board entrenches and the bottom three quit. Bug points only partly fix this.
- Half the targets will be broken on heist day, so Ben keeps a reference target that is always up.
- Block D (polling, locks) is where it could turn into a grind, and Gemini *will* write race conditions. The fallback is a tested game-server skeleton from Ben that kids extend.
- All the social play assumes classmates can open each other's `/exec` links as "Anyone within domain". **This is untested (§0.3).** If students can't deploy at all, every seat fails.

**What I expect the other seats to get wrong**
- Concept-first openings (HTTP, status codes), and adult CRUD apps (tickets, ledgers, inventory) as the projects themselves. Those are architecture, not motivation.
- Process rituals that eat the meeting. The memory file, the checks and the save point together must fit in 10 minutes.
- A single showcase at meeting 20, so nothing gets polished before May.
- Over-building the hub. Ben's prep time is finite (Ruhl's menus took years to build, UCFg9bcW7Bk).
