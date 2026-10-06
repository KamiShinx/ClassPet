---
name: project-make-minecraft-course
description: "Ben's MAKE class — 20-week Minecraft modding course for 8 kids (11-13) vibe-coding with Gemini in Antigravity; where the docs live, what's decided, what's next"
metadata:
  node_type: memory
  type: project
  originSessionId: b316a12b-8ab8-427a-8055-3553d4f67d84
  modified: 2026-09-23T13:00:10.554Z
---

Ben teaches a weekly class at MAKE (his workplace): 8 kids 11-13, zero coding, 20 weeks, ~65-70 real minutes + homework.

**Docs: GitHub KamiShinx/ClassPet, branch `claude/minecraft-modding-course-fsj9o7`, folder `minecraft-course/`.**
Read HANDOFF.md, then **`04-creative-course-design.md` (the current plan, 23 Sep)**. Research behind it in
`minecraft-course/research/` (notes per video, 20 batch syntheses, 5-seat debate). Local clone:
`C:/Users/Ben/code/ClassPet` (C:, not E:). Reference mod clone: `C:/Users/Ben/code/neoforge-tutorial-26.x`
(Kaupenjoe, MIT, branch 68-mob-spawns = working 26.2 mod). Raw videos/transcripts/frames (145 videos) at
`E:/Websites 2026/Vibecoding projects/minecraft-course-research/` — videos DELETED 23 Sep (Ben's OK); kept
`transcripts.zip` (all 145) and `key_frames.zip` (Mojang/Drelix/Stoneworks/GMTK/Proko/Blockbench sheets).
`05-ministry-pedagogy-applied.md` = the Ministry middle-school CS curriculum's pedagogy (not its Python) mapped
onto the course, blocks in the Ministry unit template.

Locked: Minecraft 26.2 + NeoForge 26.2.0.76 + Java 25. Not an API-topic course.

**🔴 BLOCKER found 23 Sep: Google Antigravity is 18+ and personal-accounts-only** (antigravity.google/docs/faq:
"unavailable to under-18 users"; Workspace accounts discouraged). The kids are 11-13 (and may be on Ministry of
Education Workspace accounts). The "Gemini in Antigravity" plan is dead; likely replacement = Gemini web app +
a free editor, copy-paste. Flagged in REVIEW.md §14; awaiting Ben's decision.

23 Sep: Ben moved the centre to the CREATIVE side (own world, creatures, items in 3D, lore) with Gemini writing
code, wants a "platform" with tooltips, and "insane lore and game mechanics". Research + debate outcome: the card
(lore + design + Gemini spec) is the unit; lore counts only once in the game; weekly cold playtest; order items →
3D item → effect → reskinned mob → Blockbench mob → optional boss; Gemini may interview/critique but never write
cards. Windows-only laptops; kid-facing text Hebrew. Platform: **Ben said 23 Sep "forget about the make-class"** —
don't build on or ask about make-class.web.app; where the platform lives is open.

**STATE 23 Sep (end of session): Ben is reading `minecraft-course/REVIEW.md`** — one file summarising all research,
the debate, the course, the Ministry pedagogy, 4 decisions (lore amount, weekly tuning, bosses, when the world
appears) and 5 tests, with `💬` / `BEN:` comment slots. When he says he's done: read every comment in REVIEW.md
(pull the branch first; he may edit on GitHub), answer each, then update 04/05. He then switched to building a
second work course (see [[project-make-second-course]] if it exists).

**Not yet approved by Ben.** Next: Ben's pre-week-1 tests (04 §7: install on school network, Hebrew rendering in
Minecraft tooltips/books with/without HebrewFix, Blockbench mob export to 26.2, Gemini rate limits), then the
starter workspace.

**How to apply:** read 04 before any course work. Ben's own game-design video picks were mostly weak (2/8 strong);
say so plainly rather than inflating. See [[feedback-how-ben-wants-answers]].

**5 Oct 2026 (cloud session): Minecraft is TOP PRIORITY.** New fact: kids use **school laptops that stay at school**.
Lesson 1 = one-click install (`install.bat` into the user folder, no admin; downloads JDK 25, VS Code zip, starter
project, runs first build) while Ben talks (vague-vs-specific demo, Gemini-lies log, world card on paper, silhouette
game, Gem login check). Calls made in `minecraft-course/LESSONS.md` §1: Gemini web app via one Gem (refuses vague asks,
asks card questions without suggesting answers, outputs whole files); VS Code; starter project = one thing per block in
MyItems/MyEffects/MyMobs/MyRules.java + datagen; paper cards; save/undo buttons; play works `--offline`; mod ids
world01-08 by laptop number. Pre-lesson school checks in §2 (same laptop weekly, wipe-on-restart, RAM ≥8 GB, run .bat
without admin, sites open, Gemini on an 11-13 account, timed dry run). Awaiting Ben's 💬 on LESSONS.md.

**5 Oct, Ben on the lesson pages:** "we need to clean all the BS, the lessons are 'learn this, build this, bye' we dont need
all the fancy יומן השקרים and all this bs, we got 90 min with them barley". Then: "lesson 1 should be still filler because
its the lesson we want to try to install stuff on the laptops while i teach what the course will be about". Applied to
`LESSONS.md` §3-5 and the hub (commit after b4da902). Don't reintroduce ceremony from `04`/`05`.

**5 Oct, later: install works end to end on Ben's work laptop** (Windows 11, 6 GB RAM; decompile+recompile ≈ 7 min;
needed Java 21 as well as 25 for NeoForge's downloadAssets). Starter project built (`minecraft-course/starter/`, shipped
as `setup/starter.zip`, laid over the official MDK by install.bat): mod id `myworld` on every laptop, `Kit.java` +
MyWorld/MyItems/MyEffects/MyMobs/MyRules.java; one `Kit.item(id, name, tooltip, numbers[, factory])` block + one PNG per
item; `tools/prepare.ps1` writes lang + item model JSON before every Play. Kids never use an editor: **Paste & Play**
(clipboard → right file by its class name, backup, build; on failure the error is copied for Gemini), **Undo**,
**Pictures**. Ben asked how 11-year-olds would cope with copy/paste/compile; this loop is the answer. Waiting for Ben's
test of the starter before updating GEM_TEXT and building lesson 2 (his explicit order).

**5 Oct, later still: the kids' hub is the control panel.** Ben rejected .bat buttons ("we need a better hub") and asked
for HTML, "simplest UI/UX, works with every kid", plus backups/undo. Built: desktop icon "Minecraft" → hidden PowerShell
`tools/server.ps1` (localhost:47811 only; buttons need header X-Make) → opens the kids' hub in the browser with a dock:
הדבקה מג׳מיני ושחק / שחק / ביטול ההדבקה / גרסאות (list + restore + save now) / תמונות; status line; yellow error card
(error auto-copied). Shared logic in `tools/common.ps1`. End-to-end tested in the cloud with a fake build (pwsh 7 +
Playwright). He also floated an in-game paste button; I advised against for now (needs the desktop path anyway when
the build breaks). In-game Hebrew reads correctly with the game in English (Ben checked).

**5 Oct, end of day: Ben got lost.** Quote: "you forgot this course is for humans, i dont know what you even mean in 90%
of the things" and "you speak with me about lesson 2 when i dont understand even how to run lesson 1". He flagged
unexplained jargon (Gem, "the class Gem link", paper folders by laptop number, "black window", charging) and no
explanation of Gemini's interface or how the mod works. Also: don't put things on the desktop (school wipes it): the
icon now also goes in the Start menu. Lesson 2 (built, in the hub) is paused. Wrote `minecraft-course/LESSON1_GUIDE.md`
for him. Rule for next sessions: explain every piece in plain words before building more; one thing at a time.
Also built today: forgiving paste (fixes package/imports, merges lone Kit.item lines), copy-my-code button, 16x16
pixel editor in the hub. Ben worries Gemini will hand kids a weak Flash model; design assumes it.

**5 Oct, last: Gems dropped.** Ben found that Google replaces Gems with "Skills" on 17 Nov 2026; Skills are 18+ only and need
Keep Activity, so the kids lose Gems as the course starts. Now: the hub button "להעתיק לג׳מיני" copies the course rules +
the kid's current code + a "מה אני רוצה" heading; the kid pastes into any normal Gemini chat and types the request.
Every message carries its own rules, so it works with any account and any (weak, forgetful) model. Lesson 1 steps:
"מה זה ג׳מיני" (screen picture), "איך מדברים עם ג׳מיני בקורס", "מדברים עם ג׳מיני". Rules live once: GEM_TEXT in
hub/content.js; make_starter_zip.py writes starter/mod/tools/rules.txt from it.

**5 Oct, night: the big redesign (Ben agreed; build AFTER the first lesson day, 6 Oct).**
- Lesson 2 worked on Ben's laptop. Lessons 1 and 2 both run on day 1 (6 Oct). Hub got a **דרייב** button: one
  `myworld DD-MM HH-MM.zip` (5 code files, pictures/models, worlds, hub notes) to upload to the kid's Drive and load back
  on a reset or different laptop (loading saves a version first). Tested in the cloud only. Starter v8.
- Ben's fears: laptops reset or change between lessons (→ Drive button); kids want complex mods (a dragon over months).
- Ben's diagnosis, agreed: whole-file editing breaks as the mod grows. A weak Gemini gets lazy on long files ("// rest
  unchanged", drops items) and paste then deletes work. And the kids end up in code and debugging, not design.
- **Decision: designer mode, fixed templates.** I write and test one template per kind of thing: item, weapon,
  food/potion, creature, boss, place, world rule (Ben may swap one). Each is a fixed file/class, so paste always knows
  where it goes. A kid's copy is changed in 3 levels: (1) stats and looks in a hub form, no Gemini, can't break;
  (2) behaviour picked from ready parts (fire breath, flying, minions, enrage at half HP, drops), Gemini edits only those
  known lines; (3) one free "something special" box where Gemini may write any small code, auto-undo if it breaks.
  Framing for kids: this is how studios work (programmers build systems, designers tune them); not "fake freedom".
- **Course re-plan around "what does a world need?"** Each lesson opens with that question; the answer is the lesson's
  template (identity → treasure/item → danger/creature → weapon → survival/food-potion → place → rules → climax/boss).
  Design talk first, then tune the template.
- **On hold (Ben's open question):** a catalog of famous Minecraft things (golden apple etc.) as cards with their real
  numbers, dumped once from the game on Ben's laptop; "build one like this" fills our template, so nothing of Mojang's
  is copied or injected. Open: also allow changing real Minecraft things' stats (e.g. zombies 30 HP), or only remixes?
- **Lessons 1 and 2 need 30-40 minutes of game design / world design discussion each**, from the research (SYNTHESIS.md,
  notes/_batch_*), before the kids plan on paper with markers. The hub had none of this. Handed to Ben's PC session.

**5 Oct, late night (Ben's PC session): design talks built for 6 Oct.** Lesson 1 has a 35-minute "what does a world
need?" conversation (one strong idea / recognised in a second / something different / its own rules, all with Minecraft
examples) before the world card; lesson 2 has a 30-minute "what makes a great item?" (what it's for / its price / how
rare / name and shape) before the item card and 16x16 sketch. Both in the teacher decks (questions and votes in the
notes) and as kids' steps (`WORLD_NEEDS`, `ITEM_NEEDS` in `hub/content.js`). Cards grew: world card +one thing you only
see there +one rule; item card +what it's for +price +where you get it (these three are NOT sent to Gemini; powers come
in lesson 4). `hub/print.html` = two A4 pages for markers. Cut/moved, Ben told: lesson 1's "תבנה לי חרב" demo and "who
writes the code" slide; lesson 2's "name the world" step is now "if there's time"; lesson 2 build time 45 -> 28 minutes.
`setup/update-hub.ps1` updates only the hub pages on Ben's laptop from a pinned commit. Timings: `LESSONS.md` section 3.
Ben then asked whether the talks were "really comprehensive with graphics... a real experience, not lame": they were
bullet slides. Rebuilt the same night as visual decks: lesson 1 = 10 talk slides (pixel-art postcards of four places,
guess-the-place-from-three-colours, normal-vs-Nether table, rule cards with silhouettes, an A/B vote), lesson 2 = 11
(pixel items, what-you-get/what-you-pay board, four jobs, four kinds of price, stack pictures 64/16/1, name-guessing,
16x16 zoom). All art is our own pixel maps in `hub/content.js` (`SCENES`, `ITEMS`, `pxSVG`); no Mojang images, the repo
is public. Ben's bar for slides: pictures and activities on every slide, not text.
**Then Ben: "use actual minecraft assets and english, hebrew + your stuff is cringe"; "even for your hidden mobs we need
minecraft assets and not rebuilds".** Rules from now on: (1) pictures in slides and pages are REAL Minecraft textures,
never our own drawings (ours stay only as the fallback when a texture is missing); (2) Minecraft names are written in
English as in the game (Nether, End, Deep Dark, Warden, Ender Pearl, Totem of Undying...), inside Hebrew sentences.
How, with a public repo: `setup/update-hub.ps1` copies 34 textures out of the Minecraft jar already installed under
C:\MAKE into `C:\MAKE\hub\mc_<name>.png` (flat names: the hub's local server refuses paths with a folder). They are
gitignored and never committed. Items = item textures; places = grids of real block textures (`SCENES[*].tiles`); mobs =
the real face cut from the skin texture with CSS (`FACES`, `mobFace`); the "who is it?" filler game zooms in on a few
pixels of a face and zooms out on click. The game files hold no full-body mob pictures or screenshots of places; the
wiki blocks scripted downloads. Trap: a CSS class named `slot` collides with the hub's hotbar style; ours is `mslot`.
**6 Oct (lesson day), Ben: add a LOTR or Harry Potter video as the worldbuilding intro, with time to watch and talk; "even
though I gave you like 3000 videos of world building I don't feel it enough in my slide".** Lesson 1's teacher deck now
opens the talk with the official "Harry Visits Diagon Alley | Full Scene" (youtube 5W-a0tl9Fu0, 3:43; a button in the
presenter console opens it in its own window, since YouTube embeds fail from a file:// page) and a "what did we learn in
three minutes?" slide with the four questions. After the four Minecraft ideas come four more from the research: the
world tells its own story (signs, not text; Ruined Portal), every cool idea has a consequence, leave one mystery
(Ancient City's frame), small and full beats huge and empty. Deck = 27 slides. To make room, lesson 1's Gemini intro
is "if there's time", otherwise the first minutes of lesson 2. Needs YouTube open on the school network.
**Slide rule (Ben, 6 Oct): no overt instructions on the slides** ("we are humans, we don't need these"), e.g. "while
watching: what do you learn about this world?". A slide shows the thing (picture, statement, vote, clip). The questions
Ben asks out loud live only in his notes. Removed five such lines from the two decks.
**Video slide = only the video, embedded, no titles (Ben, 6 Oct: "just put the video embedded in the slide man why do
I need all these titles?").** A slide with `data-yt="<id>"` gets a YouTube iframe in the projector window; the console
shows a "play on the projector" button. YouTube refuses to play inside a file:// page, so `teacher.html` opened from the
desktop icon hops to `http://localhost:47811/teacher.html` when the hub server is running (double-click the Minecraft
icon first); if it isn't, the video opens in its own window. Verified: the embed loads from a localhost page.

**6 Oct morning: USB sticks made (2.8 GB, ~17 min per stick from Ben's laptop; teacher.html left off on purpose).** Kids
install from the stick today as is. Agreed: course updates (hub lessons, templates, Kit, tools) ship later as a small
`update-from-usb.bat` that copies only hub/ and our mod machinery and NEVER the kid's files (5 code files, textures,
models, worlds, saves). Ben expects big changes within a few lessons (the template redesign); that update must carry
each kid's lesson 1-2 work over (world card, item) or the kid rebuilds it from the paper card. Also pending: make
install-from-usb.bat skip existing kid files, so running it again on a used laptop can't overwrite their work.
**6 Oct, after class 1 (Ben's report).** Install from the sticks went smoothly on every laptop. School problems ate
time: only half of lesson 1 happened, no lesson 2, no Gemini. The design talk failed: Ben showed the wrong slides (old
mob silhouettes, no Harry Potter, no worldbuilding; probably the kids' lesson-1 page or a stale teacher page) and
improvised; kids did page 1 of the 2 print pages. Kids loved Minecraft. The class: 3 new immigrants with little Hebrew,
1 shy girl, 3 enthusiastic boys, 1 half-interested kid. Laptops are shared at school: Ben removed the desktop icon and
wants each kid's hub and project protected by a password. Next week: Ben installs one patch on every laptop before
class, then the lesson goes straight into the course.
**6 Oct, evening.** Built and pushed the interactive lesson 2 deck (`hub/slides.js`) and a new teacher area; UPDATE_LINE
pinned to 536ade8 (66 textures). Ben repeated the course's centre: world building, game design, character design, rules,
logic; Minecraft is only where the easy implementation happens. A kid's first wish: "a portal to another world where
legendary pokemon go when they get hurt; the ones that die go to a hell world and come back stronger". Read as design:
two places, original creatures (not Pokemon: their own characters), and two if-then rules (hurt -> moved to the rest
world; dies -> reborn stronger in the hell world). Buildable with the planned templates (creature, place, world rule)
plus a portal template. Same kid asked about multiplayer: Java mods are multiplayer by nature, but players need the
same mod; realistic options are playing on the owner's laptop at exhibitions, LAN with matching mods, or a merged
class mod near the end (untested on the school network).
**6 Oct, late.** Kids' patch pushed (71a264a): code lock (teacher code chosen once per stick by update-from-usb.bat),
"build without Gemini" button in lesson 2, English option (`hub/en.js`), update-from-usb.bat, install-from-usb no longer
overwrites kid files. Ben then asked: why Gemini at all? Prebuild everything (bosses, mobs, items, blocks, places) and
let kids design purely in the hub, building their own rules slowly; Gemini only for special cases. My recommendation
(awaiting his answer): yes, as a data-driven "world studio": one Java engine written and tested once, the hub writes
the kid's design as data (cards, stats, picked parts, if-then rules), no compile errors possible; Gemini stays only as the
optional "special" box. Cost: every part needs one Windows test; build it in course order. Open: does MAKE promise
"coding with AI" in this course?
**6 Oct, night: decision, we build our own modding software ("the studio").** Ben: not MCreator as a product; it must be
ours, part of the lesson ecosystem, behind the kid's code, mostly Hebrew; open source is fine (publish when done; GPL
OK). Kids must really MODEL their mobs (boxes, paint, animate), not pick premade ones. He'll reinstall all laptops next
week (an hour early); no patching kids' laptops until it's all built. Course name stays "modding with Minecraft"; AI was
mentioned, not promised. Gemini = design partner that talks to the studio in data (```studio blocks), never Java.
Taken from MCreator's GPL source (sparse clone, plugins/): 523 Blockly block definitions, 65 triggers, NeoForge 26.1.2
code templates (procedures, living entities, dimensions, custom portals) as reference for our engine. Plan: step 1
items (built 4ec3ffb: `hub/studio.js`, design in C:\MAKE\design\world.json, Kit.java reads it with Gson; needs Ben's
Windows test), step 2 item powers with logic blocks (Blockly + MCreator's blocks, a data interpreter in Java), step 3
the mob modeller (boxes, paint, animation) + a generic data-driven mob, then rules, places, portals, bosses.
Maven Central is reachable from the cloud (Gson jar for stub compiles); Mojang and NeoForge maven were not.
**6 Oct, night, later.** Ben thought blocks were dropped: no, blocks are the core; with them kids build behaviour
themselves and Gemini becomes optional advice. Built studio step 2 (38cd796): `hub/blocks.js` on Blockly 13.3.0
(bundled in `hub/blockly/`, Apache 2.0), Hebrew RTL + English, 30 blocks in 5 groups (מתי / עושים / מחיר / אם וחזרה /
שאלות); compiled to JSON `power` per item; `StudioPower.java` interprets it in the game (right-click, hit, every
second in hand). Stub-compiled only: Ben's Windows test is the gate (studio item + a block power).
**6 Oct, latest.** Gemini's two jobs in the studio, both after the kid built it themselves: (1) design partner for an
item's fields (```studio blocks), (2) reviewer of the kid's logic: the kid writes in their own words what the item
should do, "copy the blocks to Gemini" sends intent + blocks + program + the studio's quick checks; Gemini reviews the
logic first, then design, then sends a fixed version (```blocks); the studio validates it, shows now/after, and loads it
as real blocks on accept (596e03b). Quick checks run live without Gemini. Next: the creature modeller (Ben: "a must"):
our own three.js editor in the hub (boxes on body parts, per-face pixel painting, idle/walk/attack keyframes, templates),
stored Java-native so one generic mob engine builds every kid's mob (Kaupenjoe's 26.x Dodo shows the 26.x entity,
render state, layer and KeyframeAnimation API). Not ready for next week (items lesson).
