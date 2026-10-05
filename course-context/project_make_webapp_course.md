---
name: project-make-webapp-course
description: "Ben's second work course (started 23 Sep) — 14-15 year olds vibe-code full web apps (frontend + backend) with Gemini Pro + Google Sheets + Apps Script, ~20 meetings Nov-May"
metadata:
  node_type: memory
  type: project
  originSessionId: b316a12b-8ab8-427a-8055-3553d4f67d84
  modified: 2026-09-24T15:01:16.552Z
---

Second course for Ben's work (MAKE?), started 2026-09-23 right after [[project-make-minecraft-course]].

**Facts from Ben:** ~20 meetings, November to May; **10-15 kids, ~90 real minutes**; age 14, turning 15 during the
year; kids use their **Israeli Ministry of Education student Google accounts** ("משתמש תלמיד של משרד החינוך" =
Workspace for Education, admin-controlled) — NOT personal Gmail (Ben corrected this 23 Sep). Which Gemini models
they get is unknown; Pro has rate limits regardless. Admin policy may restrict Apps Script, web-app "Anyone" access,
sharing outside the domain — must be tested with one student account. Stack: vibe-coding with **Gemini Pro + Google Sheets + Apps
Script**, frontend AND backend. Must be FUN, **PBL**, several small projects + one big final project; a game is
fine, but the emphasis is building an app + a backend and actually teaching **what a backend means**.

**Kids use the Gemini WEB app (gemini.google.com) to generate code — NO API keys** (Ben, 23 Sep: "they wont use api
keys"). I wrongly proposed "Gemini API key in Script Properties" as the why-a-backend lesson; retracted. Use instead:
answers/scores live on the server so view-source can't cheat (quiz answers in the Sheet, server checks and scores).

**Assume a weak Gemini (Ben, 23 Sep):** kids may NOT have Gemini Pro; plan for a free model that hallucinates,
forgets context and "nukes full projects" by rewriting everything. Course must teach survival habits: save a
version before every prompt (Apps Script version history), a project-memory file pasted into every chat, one
function per ask, check before accepting, a "Gemini broke it" log.

**Teachable Machine (Ben, 23 Sep):** combine the course with Google Teachable Machine so kids build an "AI APP"
(TF.js model in the web app). Webcam/mic are very likely BLOCKED inside the Apps Script HtmlService sandboxed iframe
(googleusercontent opaque origin; Rameez's fix repo + Google restrictions doc) — Ben to confirm with a 10-min test.
Inside Apps Script: image UPLOAD + TM image model works. **Ben, 23 Sep: "by the end of the year we'll move to
netlify or something for the final project"** → final project = frontend on Netlify (live camera/mic + TM) talking to
the Apps Script backend via doPost/JSON: the course's culminating "separate frontend + API backend" lesson.

**THE HUB = Yuval's "makers-lab" (24 Sep, Ben sent `YuvalsPlatform.zip`; extracted copy in the session scratchpad
`hub_zip/makers-lab`, Next.js 16 + Prisma/SQLite, docs/ARCHITECTURE.md, LESSON_CONTENT_MODEL.md, TEACHER_GUIDE.md):**
a step-by-step LESSON PLATFORM — course → units → lessons as data; one LessonPlayer with step types (intro,
instruction, code w/ progressive line highlight, test "what should happen", checkpoint that blocks Next, question,
worksheet autosaved per team, challenge 🟢🔵🔴), hints one at a time, "I'm stuck" troubleshooting then help request
with context, class code + team join (no personal data), teacher live board (10 s poll) + help queue, projector deck
derived from the lesson, print view, badges, accessibility, Hebrew RTL. Ben's hub = THIS rebuilt on Apps Script +
Sheet (tabs = tables), circuit engine replaced by course step types (paste card into Gemini, check the row, save a
copy, game-design worksheets). NOT the "class site with gallery/help/leaderboard/request log" I first proposed —
he rejected that. The C# alarm-clock zip was the wrong file.

**Hub = maximal spoon-feeding (Ben, 24 Sep: "the simplest האכלה בכפית possible for kids, step by step to the core,
how to prompt, what to prompt, what to copy, where to copy, screenshots, animations"):** every step = exact prompt
with a copy button (blanks for the kid's own ideas), annotated screenshot of where to paste in Gemini/Apps Script,
short animation (GIF/video) for fiddly click paths (deploy, make a copy, permission screen), screenshot of the
expected result + "if you see this instead". Coworker Yuval built makers-lab for robotics; Ben wants "the same thing
in a way". Reference copy at C:/Users/Ben/code/ref/makers-lab (node_modules DELETED 24 Sep to free C — run `npm install`
before `npm run dev`; launch config "makers-lab-ref" port 3200).
**Disk rule (Ben, 24 Sep): C and D are nearly full — put all research/media on E.**

Screenshots of makers-lab + what to copy vs fix: `webapp-course-research/hub_ref/NOTES.md` (its instruction steps show
only an icon + text — no click-path screenshot; that's the gap our spoon-fed hub fills).

**Teaching platform ("hub"):** Ben wants one to teach from. Stack = Apps Script only: "no external storage, just
everything on the appscript itself, including the domain it provides" (the script.google.com /exec URL + its
bound Sheet). Doubles as a live example of a real backend for the kids.
He sent a zip as hub inspiration but it was the WRONG file (a C# WinForms alarm clock) — he may resend.

**Reference architecture already built:** `GoolWidget/webstreak/` (Code.gs 656 lines + Index.html + Data.html):
Sheet as DB, doGet serves HtmlService page, google.script.run api* functions (no CORS), token-protected JSON API
(doGet action= / doPost) for the phone app. Real traps inside it: redeploy a new version after every edit;
`Index` not `Index.html` (becomes Index.html.html); two doGet in one project = load-order roulette.

**STATE 23 Sep (end): design done, Ben reviewing `webapp-course/REVIEW.md`** in GitHub KamiShinx/ClassPet, branch
`claude/webapp-course` (clone C:/Users/Ben/code/ClassPet; research in `webapp-course/research/`). Core: attack loop
(build → classmate cheats it → move it to the server), one router + `call()` helper (two doors: google.script.run
and doGet/doPost JSON), Sheet "Make a copy" = save point, CARD tab + hub "Copy for Gemini", selfTest(), 16 content
meetings + 4 buffers, bronze/silver(Netlify)/gold(live TM), hub = small shared class backend with request log, a
10-row October day-zero test on one Ministry student account. 6 decisions pending in REVIEW §12. Raw videos still
on E: (`webapp-course-research/vids/`), to delete after his review (keep transcripts + key frames).
ClassPet `common.js` already does fetch POST text/plain to Apps Script = the final project's shape.

**24 Sep, course shape (Ben): build the COURSE first, then implement it in the hub.** Phases he named: 1 build apps,
2 game mechanics + character design (skip worldbuilding), 3 build games, 4 Teachable Machine in apps and games, then a
multi-week final. He felt it's too much for ~6 months x 4/month; torn between a fun MMO-type game with backend and a
"proud" app (restaurant staff etc.). My advice: weave design into building, TM as a 2-meeting add-on, final = kid's
choice game OR app (same backend); "MMO" = async browser-MMO (Travian/OGame/idle: persistent rows, timers, trading) not
real-time. **Ben's solution to "too much": the hub gets an overkill LIBRARY** — deep optional pages/videos/guides
(game design, character design, prompting...) assigned as homework; class time = core only; homework never required
for the next class. Draft outline in `webapp-course-research/COURSE_DRAFT.md`.
**Meeting format (Ben, 24 Sep): 10-15 min talking to the class, then kids work SOLO while he walks around helping
one by one.** Agreed, with: the talk = a LIVE DEMO (build today's feature in the real Gemini chat, incl. an error and
the fix; on design days a group brainstorm); help order hub hints/"I'm stuck" → neighbour → hub help queue → Ben
(queue shows wait time + what they tried); nobody idles (design card / next sketch while waiting; bonus + hacker
challenges for fast kids); 5-min close (save a copy + 1-2 kids show). Shape: 10-15 demo → ~60 solo → 5 save/show.
**Ben's answers on the draft (24 Sep):** Phase 1 = ONE app built across M1-M4 (not three small ones). Phase 2 = the
SAME game for everyone, each kid builds their own version (which game = still to be discussed; bring 2-3 candidate
games with pros/cons). Final = push for SOLO (pairs only if the group is big). He hadn't read the draft yet.
**UI/UX is a core strand too (Ben, 24 Sep: "should also very much be about ui and ux... we need a lotttt of extra
stuff, game design, ui ux, anything relevant").** In class: a screen sketch on every design card + a UI dose per
meeting (layout, forms/feedback/states, shared UI, HUD + game feel, user testing). Library: a big UI/UX section
(hierarchy, spacing, colour/type, states, forms, mobile, RTL, accessibility, onboarding, game UI/juice, user testing,
design vocabulary for prompting Gemini) + pixel art + 2D level design. Research round launched for these videos.

**24 Sep, library research DONE:** Ben's huge video list + my gap picks (547 videos, ~525 h) triaged by captions/
Whisper (Ben: "start with captions to understand if theyre even relevant") → 385 judged: 101 core / 102 useful / 182
skip. Map of 60 library pages (22 ★ homework-first, tagged P1–P4) in ClassPet `webapp-course/LIBRARY_MAP.md` (commit
a068398) + `research/library/T01–T18.json`; working copy `E:/.../library-research/`. Best finds: code.org "How the
Internet Works" (CodeAI channel, made-for-kids, HAS HEBREW CAPTIONS; HTTP & HTML = the "what is a backend" clip),
Dr. Daniel Soper database course (32 core: tabs/IDs/relationships/lost update → LockService), Database Star "design a
DB for X" (Hogwarts one for games), DesignCourse REVIEW videos (challenge ones = Figma filler). 3 decisions put to Ben
in the map: language (my pick: Hebrew pages carry the teaching, clips are bonus), YouTube at school (add to day-zero
test), build order (★ first). Sent for his 💬 comments. Next: game-design pages from minecraft-course-research notes,
then course draft 2.

**24 Sep, Ben rejected the attack/cheat loop:** "that's boring asf... the course should legit be 'create fun cool
things, store data as backend'. i aint tryna teach them cyberstuff." Also CUT: the class-wide leaderboard on the hub ("over engineering and a key for disaster") — kids' apps
never write to the hub; each game keeps its own high scores in its own Sheet. Keep the hub simple. Security = at most one 10-min moment if a fake
leaderboard score happens naturally; no heist days. Backend concepts come from what the game needs to store/share.

**24 Sep, Ben's new idea (not yet in REVIEW.md, he's reading the old version):** make the course's mainframe a GAME,
using the Minecraft course's game-design research (mechanic cards, cost/tell, playtest loop) + a backend for
multiplayer. My position: yes, the server as referee is the backend lesson; but NO real-time online multiplayer on
Apps Script (1-3 s per request, no push, ~30 concurrent) — a sidescroller works with ghost races (recorded runs as
rows), published levels (Mario-Maker style, levels as Sheet data), same-keyboard 2P; live online versus only as
gold via PeerJS (WebRTC) on Netlify, if the school network allows (test it). Floor = single-player game + server
leaderboard. Offered to rewrite REVIEW.md around this; awaiting his comments first.

**Research:** 4 playlists, 143 unique videos (~42 h) in `E:/Websites 2026/Vibecoding projects/webapp-course-research/`
using [[reference-video-research-pipeline]] (run_all.py). P1 Learn Google Sheets web-app series; P2+P4 Mohammad
Rameez Imdad AI-built business dashboards (adult ERP/CRM, not kid project ideas); P3 Laurence Svekis (doGet/doPost,
JSON APIs, plus Docs/Forms automation). Deliver results as one REVIEW-style md ([[feedback-review-files-for-comments]]).
