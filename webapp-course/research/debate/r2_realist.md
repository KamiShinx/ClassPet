# Round 2: realist

Read: r1_fun, r1_backend, r1_engineer, r1_hub, plus the coordinator's notes (ClassPet `LockService` confirmed at `C:/Users/Ben/code/ClassPet/backend/Code.gs:44`; R4 `k90Za3mjy20`). [mine] = my classroom judgement.

## What I concede
1. **One router, two doors (backend, engineer).** Without one `call(action, data)` helper and one router from P1, my M15 is a rewrite (S5, SYNTHESIS #2). It goes in the starter.
2. **Kids attack each other; it's not just Ben (fun, backend).** "Ben cheats each quiz" doesn't scale to 15 quizzes. A peer heist does, with fun's guards: attack days only, a reference target always up.
3. **Concurrency gets a demo meeting.** I left `LockService` at gold. The 3-2-1 race is cheap and is how kids meet "other users." The lock goes in the starter's write helper (ClassPet shape); the demo shows why.
4. **The hub in M1 as a zero-code backend (hub).** Your nickname landing as a row, then JSON in the address bar, beats my P0 deploy alone as the first 20 minutes.
5. **Hub identity:** if test 5 shows Ben has a Ministry-domain account, deploying "Anyone in domain" and using `getActiveUser()` beats my nickname+PIN. PIN stays the fallback.
6. **Engineer's framing: `/exec` = last save, `/dev` = work in progress.** It turns the top trap in the whole corpus into the undo button. It goes on the wall.
7. **R4 `k90Za3mjy20`** shows Apps Script backend + Netlify camera frontend working, with a real bug-and-fix ("run the setup function"), which joins the trap checklist. But it used a personal account with "Anyone" access; tests 3 and 8 still decide.

## What I still dispute
1. **Nobody else budgets for lost meetings.** Fun expects ~17 but schedules 20; backend, engineer and hub put the only final showcase at M20. [mine] May has Memorial/Independence days and strikes; lose M20 and the year has no ending. Showcase at **M19**, plus two in-year buffers.
2. **Fun's 4-meeting battleship block (polling + locks + turn checks) for everyone.** Fun calls it the likely grind; with weak Gemini writing races into two-player state, that's where the bottom third quits. Make it a **gold option** on Ben's tested skeleton.
3. **Engineer's 8-file skeleton and "paste over one function, never Select All."** [mine] The weaker third can't reliably find where a function ends, and each extra file is another wrong-paste target; engineer admits kids will paste whole files anyway. **Three files**: `Code.gs` (router under guard comments), `Index`, frozen `Client` (`call()`). One-function replacement is for kids ahead of the class.
4. **Live-camera Teachable Machine on Netlify as the requirement (fun, backend, engineer; hub "encourages").** It rests on two untested admin settings and a stale-looking TM library. Bronze stays Apps Script with photo upload; Netlify/live TM are silver/gold, which most kids reach if tests 3, 8, 9 pass.
5. **Hub scope (hub).** Help queue, XP ledger, bug gallery, teacher tiles, POST leaderboard: a second course to build and a single point of failure. I accept its **four v1 screens**; the CARD stays in the kid's own Sheet so it survives a hub outage.
6. **Assessment volume (backend's passport + predictions + trace tickets + explain-backs; hub's 4 ticked checks).** Ben can't grade that weekly. Keep an exit question (read, not graded) and a rotating 2-minute trace oral; heists and break-it drills are evidence he watches, not paperwork.
7. **DevTools cheating (backend, engineer).** Managed laptops may block it; heists must work from view-source and the address bar. Add it to day-zero.

## The one idea I'd steal
**Engineer's `selfTest()`**: a Run button that checks there is exactly one `doGet`, that the frozen marker is present, and that one write lands a row. It turns "tick the function names" into a 5-second check a kid can't talk past, and catches Ben's two-`doGet` bug. The starter ships one working check line.

## Revised recommendation (10 lines)
1. October: the 10-row day-zero test on a real student account, the room machines and Wi-Fi (plus the DevTools test); fallbacks decided before M1.
2. Plan 16 content meetings, 2 in-year buffers, final showcase M19, M20 reserve.
3. Starter = a Sheet copy with 3 files: `Code.gs` (router + locked `addRow` + `selfTest`), `Index`, frozen `Client` (`call()`).
4. M1: hub zero-code demo, then P0 deploy. P1 poll (race demo, lock), P2 quiz with a peer heist, M7 "URL door" (`?action=` JSON), P3 TM photo app.
5. Every small project has a bronze level reachable in one meeting; a kid who missed two meetings takes the current starter and gets there.
6. Gemini routine: CARD in the kid's Sheet, new chat per feature, run selfTest after every paste, check the row, `SAVE` copy on green, practised nuke drill in M2.
7. Final: pick a shape; ≥2 tabs, a server-enforced rule. Bronze = Apps Script, silver = Netlify via `Client` swap, gold = live TM or turn-based multiplayer.
8. Hub v1 = today page, submit link, gallery, exit tickets, "Gemini broke it" wall; it also serves as the backend example (JSON in the address bar, its Sheet shown to the class).
9. Evidence Ben uses: exit ticket each meeting plus a rotating trace oral, and heists and break-it drills he watches.
10. Weekly prep target: one Meetings row plus one tested starter tweak, well under two hours.
