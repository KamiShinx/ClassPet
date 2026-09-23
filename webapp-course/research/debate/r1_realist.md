# Round 1: realist (the teacher in the room)

Labels: **[ev]** = research files, **[mine]** = my own classroom knowledge, not evidence.

## 0. Before meeting 1: the day-zero account test (October, not November)
Ben signs in as **one real student account, on the room's machines and Wi-Fi** [mine: school filters block sites that work at home]. Each row gets its fallback decided now.

| # | Test | If it fails |
|---|---|---|
| 1 | Gemini: model, Canvas, **is chat history kept?** | If not, the CARD (§4) is the only memory. Plan assumes this anyway. |
| 2 | Bound script: save, run, write a row; OAuth shows a warning or "blocked"? | Blocked = no course. IT must enable the OU before November. |
| 3 | Deploy: which "Who has access" options exist | No "Anyone" = showcase on signed-in laptops; Netlify becomes optional. |
| 4 | Open `/exec` from a 2nd student, incognito, personal Gmail | Who can see kids' apps. |
| 5 | Student shares the Sheet with Ben | **If outside sharing is blocked and Ben is on personal Gmail, he sees no kid's project.** He needs a MoE account. |
| 6 | Gemini icon inside the Apps Script editor | If present, use it: no copy-paste ([ev] §1b). |
| 7 | `getUserMedia()` in a deployed page | Expected blocked ([ev] §5, R2). Photo upload all year. |
| 8 | Netlify page `fetch`-POSTs `text/plain` to a student `/exec`, gets JSON | Login page instead = Netlify is a demo on Ben's backend only. |
| 9 | TM: train, export, classify an uploaded photo inside an Apps Script page | Stale library ([ev] §6): if it breaks, TM moves to Netlify. |

Test 10, **15 kids on Gemini at once**, happens in M1; fallback is pairs sharing a chat.

## 1. Course shape: plan 16 meetings, not 20
[mine] Nov-May loses meetings: Hanukkah, January exams, Purim, the Pesach break, Memorial/Independence days, trips, strikes. Four meetings are **buffers**. Each small project is 2 meetings with a **bronze floor reachable in one**.

| M | Block | What | Teaches |
|---|---|---|---|
| 1 | A. It lives on a server | Log-in rescue (expect 2-3 forgotten passwords [mine]), Gemini load test, **P0 "Hello row"**: copy starter, deploy, button writes your name, open a classmate's link | the `/exec` URL is the internet; the row is the proof |
| 2-3 | | **P1 Class poll**: vote, count, show. M2 includes the **nuke drill** | page → server → Sheet → page ([ev] A2: 6 of 9 videos) |
| 4-5 | B. The server decides | **P2 Quiz + scoreboard**, answers in `.gs`; **cheat challenge** | why a backend exists ([ev] synthesis #5, R2) |
| 6 | | **Buffer** (pre-Hanukkah) | |
| 7 | C. Talking over HTTP | `?name=Dana` → JSON ([ev] S9); `doGet` JSON; `fetch` | the second way to talk to a server ([ev] S5) |
| 8-9 | | **P3 Teachable Machine photo app**: upload → label → `doPost` logs it | the model is a resource at a URL ([ev] G3) |
| 10 | | **Showcase 1** + buffer | |
| 11 | D. Final | Pitch, CARD, paper sketch of tabs + functions | |
| 12-14 | | Build in Apps Script. **Bronze checkpoint M14** | |
| 15 | | Frontend to Netlify with Ben's tested `api.js` (if tests 3+8 passed) | CORS, `text/plain`, redirect ([ev] §5) |
| 16-17 | | Cold tests, fixes, live-camera TM for gold | |
| 18 | | **Buffer** | |
| 19 | | **Final showcase** | |
| 20 | | Buffer, else retro | |

Cut: real-time multiplayer and class chat. [mine] No push, ~1 s per call; 15 browsers polling one kid's app approach the 30-simultaneous-executions limit ([ev] §5). **Turn-based works** (poll every 5 s: tic-tac-toe, buzzer queue).

## 2. A typical meeting (90 on paper, ~70 real)
- **0-10** Arrive, log in, open three tabs: project Sheet, hub "today" page, fresh Gemini chat.
- **10-20** One concept, unplugged (e.g. paper-slip request game: browser/server/Sheet kids pass slips). Learning target on the board, tracked by kids ([ev] GExtTQytNNo).
- **20-27** Ben demos the one new thing live and **breaks it on purpose** once.
- **27-65** Build. Rule: "CARD, trap list, neighbour, then Ben." **At ~50: mandatory save point + neighbour cold-test.**
- **65-78** Two or three kids show; one "Gemini lied" story goes on the wall.
- **78-85** Exit ticket in the hub: one backend question.
- **85-90** Slack. It will be used.

## 3. How Ben knows a kid understands "backend"
Not from the app (Gemini built it). From **the kid acting**:
1. **Trace-your-code oral (2 min):** the kid points at their own code: browser part, server part, where the row is written, what comes back. 0-2 rubric; 4-5 kids per meeting, each kid every ~3 meetings.
2. **Cheat challenge (P2):** answers kept in `Index` get cheated live via view-source; the kid moves the check into `.gs` and says why that fixes it.
3. **Break-it drill:** Ben renames one server function; "nothing happens" ([ev] A1, A2 silent failures); the kid finds it.
4. **Exit tickets:** Ben reads 15 lines, not 15 codebases. At the showcase every kid does the trace live.

## 4. Surviving a forgetful Gemini
- **The project is a Sheet**, script bound to it. Data survives any code disaster.
- **CARD tab** in that Sheet, ≤10 lines: what the app does; tabs and columns; **server function names and what each returns**; do-not-touch list ([ev] G2 guard comments); today's one ask. Pasted at the top of **every new chat, one chat per feature**.
- **Two files only**: `Code.gs`, `Index`. **No new `.gs` unless Ben says.** [ev] Ben's own `webstreak/Code.gs` header: a stale copied file with a second `doGet` silently broke his app (one global scope). Same header: name it `Index`, or you get `Index.html.html`.
- **Save point = File → Make a copy** of the Sheet (bound code comes along), named `SAVE 3 poll works - DON'T EDIT`. One click, restores code and data.
- **Check before pasting:** tick the CARD's function names off in Gemini's answer. One missing = don't paste. Thirty seconds; catches most nukes.
- **Verify the row, not the "Success!"** ([ev] G2). **Build on `/dev`, redeploy before sharing** (top trap in A1, A2, S2, S4, S6, S8, S10).

**"Gemini nuked my project" routine**, practised in M2 on a deliberately wrecked copy:
1. Stop. Don't paste again, don't ask Gemini to "fix it."
2. Ctrl+Z in that file (works while the tab is open).
3. Else open the last `SAVE`, copy its two files back.
4. New chat: CARD + working file + one small ask + "don't rename or remove any function; return the whole file."
5. Log it on the hub's "Gemini broke it" wall.

## 5. The hub: small, built in October, cheap weekly
One Apps Script app + Sheet, `?p=` routing ([ev] G2):
- **Meeting pages**: target, concept, screenshots, starter `/copy` link, traps checklist (redeploy, OAuth warning, greyed-out Run, `Index` naming). One row per meeting, so weekly prep = filling a row.
- **Roster board**: each kid's `/exec` link and bronze/silver/gold per project. Ben's view of who's behind.
- **Exit tickets**, the **"Gemini broke it" wall**, **showcase gallery**.

Kids log in by nickname + class PIN (`getActiveUser()` is blank across domains [mine]). **It doubles as the backend example:** in M3 Ben opens its Sheet: "last week's exit tickets are these rows." Not in v1: badges, auto-grading, chat.

## 6. Final project
Solo or pairs (pairs survive an absence; **both** do the oral). Pick a **shape**: quiz/game with scores, poll, queue, tracker, TM classifier. Scope: ≥2 tabs, ≥1 write, ≥1 read, **one rule the server enforces**.
- **Bronze (everyone):** deployed Apps Script app on its own Sheet, the CARD, a paper diagram of its loop, the 2-min trace.
- **Silver:** frontend on Netlify calling `doGet`/`doPost` JSON.
- **Gold:** live camera/mic TM on Netlify, an admin role checked server-side, or `LockService` on shared writes.

**A kid who missed two meetings** reads the hub pages, takes the current starter, hits bronze. Homework never gates progress ([ev] synthesis, Minecraft rule); it's collecting TM photos or cold-testing a classmate.

## 7. Claims, failure modes, predictions
1. **Deploy/OAuth friction, not concepts, eats meetings.** Stale `/exec` is the top trap in 8+ batches; S5: budget OAuth time every week. Hence starters, `/dev`, the checklist.
2. **The save point must be dumber than Gemini.** Full-file paste overwrites hand edits (G2); weak AI drops steps (R1). A Sheet copy needs no diff-reading.
3. **Understanding shows in what the kid does** (cheat, trace, break-it), because the artifact is Gemini's.
4. **Plan 16.** [mine] + [ev] G1 "under-budgeting prep time."

**How it fails:** strong kids are bored at bronze and Ben has no attention left for them; starters drift toward the worksheet trap ([ev] GExtTQytNNo); kids edit the SAVE copy; orals pull Ben from unsticking kids; if test 2 fails nothing survives.

**Others will get wrong:** 20 content meetings; real-time multiplayer; PBL rituals eating 25 of 70 minutes; a hub with auth and gamification Ben builds instead of teaching; Netlify as a given before tests 3 and 8; assuming Gemini history persists, kids read diffs, homework happens.
