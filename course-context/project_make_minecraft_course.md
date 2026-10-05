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
