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

