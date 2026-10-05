# Minecraft course: lesson 1 (install) and lessons 2-20

> **How to comment:** write under any `💬` line, or anywhere, starting the line with `BEN:`. Say "done" and I'll
> go through every comment.
>
> **What changed since `REVIEW.md`:** the kids now use **school laptops that stay at school**. So nobody installs
> at home, lesson 1 is the install, and nothing in the course can rely on the laptop going home. I also made the
> calls that were still open (the AI tool, where the cards live). They're in §1. Override any of them.

---

## Contents
1. Calls I made (the Antigravity blocker and others)
2. Before lesson 1: what you need to check at the school
3. Lesson 1: install while you talk
4. How every lesson after that runs
5. Lessons 2-20
6. What I build next

---

## 1. Calls I made

**1. AI tool: the Gemini web app, through one Gem you make. No Antigravity.**
Antigravity is 18+ only, so it's out. Google opened Gemini to Workspace for Education students of every age in
2025-2026 (a stricter "youth" mode; chats aren't used for training). The school's admin has to have it switched
on, and since there's no separate under-13 setting, it's on for everyone or no one.
What you do: build one **Gem** ("עוזר המודים"), share it with the kids, and they only ever use that. The Gem
carries what Antigravity's rules file would have:
- the Minecraft 26.2 / NeoForge rules and the renames Gemini gets wrong;
- the layout of our starter project;
- "always answer with **whole files**, one file per answer, with the file path on the first line";
- **"if the kid's message isn't a filled card, don't write code. Ask the card's questions one at a time, and
  never suggest answers."** So "תבנה לי חרב" gets questions back, not code. Your pedagogy ends up built into the
  tool itself.

**2. Editor: VS Code, installed by the same install script, with no extensions.** The kid's loop: copy the
whole file from Gemini → open that file in VS Code → Ctrl+A, Ctrl+V, Ctrl+S → double-click `שחק` on the desktop.

**3. The starter project is built so that one thing = one block of code + one picture.** A new item is one
block in `MyItems.java` (name, Hebrew name, tooltip, numbers) plus a PNG dropped in a folder. The project creates
the model and language files on its own every time the kid presses Play. The same goes for effects
(`MyEffects.java`), creatures (`MyMobs.java`) and world rules (`MyRules.java`). Gemini only ever edits one of
these four files, so the kid always knows which file to paste into.

**4. Cards are on paper for now.** Printed Hebrew card sheets in a folder per laptop number, kept in class like
the laptops. The kid types the card into the Gem. A web platform can come later (maybe the web-app course's hub).
Nothing in the lessons depends on it.

**5. Saving and undo.** The desktop gets two more buttons: `שמור` (saves a version, takes a second) and, for
you only, a way back to the last saved version when a kid's project is broken. Once a month you copy all 8
projects to a USB stick, in case the school wipes or swaps a laptop.

**6. Play works offline after the first time.** If the school internet dies mid-lesson, Minecraft still starts.

**7. Mod names come from laptop numbers** (`world01` … `world08`), not kid names (Ministry rule). The world's
real name, the one the kid picks, is shown in the game and can change any time.

**8. The open decisions in `REVIEW.md` §12** I took my picks: tooltips + an ≤80-word hidden note + one book;
weekly cold playtest with a one-line logged change; bosses are a stretch goal only; world card in lesson 1.

💬 Comments:

---

## 2. Before lesson 1: what you need to check at the school

Lesson 1 fails if any of these come back wrong, so check them 2 or more weeks ahead. Most are one question to the
school's IT person.

| # | Check | Why | If it's a no |
|---|---|---|---|
| 1 | **Does each kid get the same laptop every week?** Number them 1-8 | Their project lives on the laptop | Then the project has to live on a USB stick per kid. Tell me and I'll change the install |
| 2 | **Is the laptop wiped on restart?** (Deep Freeze or similar) | A wipe deletes everything every week | Ask IT to exclude one folder, or use USB sticks |
| 3 | **RAM: 8 GB or more?** Disk: 10 GB free? | Minecraft plus the build tool need about 4-6 GB of RAM. On 4 GB it crawls or crashes | 4 GB laptops: this course can't run on them. That has to be known now |
| 4 | **Can a student run a downloaded `.bat` file without admin?** | That's the whole install. It installs only into the user's own folder, so no admin needed | IT runs it once per laptop before lesson 1 |
| 5 | **Are these sites open on the school network:** github.com, api.adoptium.net, maven.neoforged.net, piston-data.mojang.com, resources.download.minecraft.net, update.code.visualstudio.com, gemini.google.com | The install downloads from them | IT opens them, or the USB plan below |
| 6 | **Gemini on a student account aged 11-13:** log in with one and open gemini.google.com | Whether the Ministry or school switched it on for this age | No AI tool for the kids. Course still runs, but it's a different course. We'd have to talk |
| 7 | **Dry run:** you run the install on one school laptop, on the school wifi, and time it | Tells us whether the download fits in one lesson | See below |

**The dry run decides lesson 1's shape:**
- Under 45 minutes → lesson 1 as written below.
- Over 45 minutes, or the wifi chokes with 8 at once → the download still starts in lesson 1, the laptops
  stay on and plugged in after class (sleep off), and it finishes on its own. Lesson 2 opens with the check.
- The school network blocks it → **USB plan:** you install on one laptop, copy the finished folder to a USB stick,
  and the kids copy it from the stick in lesson 1 (about 5 minutes each, no download).

My estimate, unverified: the first start downloads about 1-1.5 GB per laptop and then builds for 5-15 minutes.
8 laptops at once on school wifi: probably 30-60 minutes. That's why you test it.

💬 Comments:

---

## 3. Lesson 1: install while you talk

**Goal:** by the end, every laptop has Minecraft running with the kid's (still empty) mod in it, every kid has
opened the Gem, and every kid has a world card on paper.
**Ships:** a screenshot of the title screen; a filled world card.
**You bring:** the short link on the board; printed world cards; 6-8 black mob silhouettes (printed or on the
projector); a working mod on your own laptop to show; the Gem already shared with the class.

### The plan (65 minutes)

| Min | What happens | Notes |
|---|---|---|
| 0-10 | **Start the download.** Laptops numbered; Windows login; the steps from the board (below). Walk the room until all 8 black windows are running | The only part where every kid needs you. Everything after can be interrupted |
| 10-15 | **"What you'll make."** Show your working mod on the projector: a weird item, a creature, a tooltip in Hebrew. Then the end: in lesson 20 families come and play your world, and you explain it | The hook. Keep it short |
| 15-25 | **Vague vs specific, live.** In Gemini on the projector, first type "תבנה לי חרב". Show what comes back (generic, maybe old code that won't even work). Then paste a filled card. Kids vote which answer is better and say why | The core of the course, on day 1 |
| 25-30 | **"Gemini lies."** One example of a confident wrong answer (I'll prepare one from 26.2). Introduce the class Gemini-Lied log: you get to write a lie in it only when you caught it **and** fixed it | Check the black windows on your way |
| 30-45 | **The world card, on paper** (worksheet below). Alone for 10 minutes, then 5 in pairs: your partner reads your card and asks one question you can't answer yet | No laptops needed. If a kid finishes early: a second theme |
| 45-50 | **Silhouette game.** Black shapes of vanilla mobs; kids guess. "How did you know it was a creeper?" That's tip card #1: a creature is recognised by its outline from far away | Fills time if the download is slow; cut it if it's fast |
| 50-58 | **First look.** Whoever has Minecraft open: create a Creative world, open Mods, find their mod, take a screenshot. Everyone: log in to Gemini with the school account, open the Gem, send "שלום". Whatever the Gem asks back, they answer one question | Checks the AI works for every kid in lesson 1, not lesson 2 |
| 58-65 | **Close.** Cards into the folder. Laptops plugged in. If a download hasn't finished: leave the laptop open and running | Write down which laptop numbers didn't finish |

**If it all finishes in 20 minutes:** move the silhouette game earlier and add "the first look" sooner. Nothing
else changes.
**If one laptop fails:** that kid pairs with a neighbour for the rest of the lesson. You fix it after class.

### On the board (Hebrew, for the kids)

> **מתקינים את מיינקראפט**
> 1. פותחים את הדפדפן ונכנסים לקישור שעל הלוח.
> 2. לוחצים על `install` והקובץ יורד.
> 3. לוחצים פעמיים על הקובץ שירד.
>    אם קופץ חלון כחול "Windows protected your PC": לוחצים **More info** ואז **Run anyway**.
> 4. כותבים את המספר של המחשב (1 עד 8) ולוחצים Enter.
> 5. נפתח חלון שחור שכותב הרבה דברים. **לא סוגרים אותו!** הוא מוריד את המשחק.
> 6. כשמיינקראפט נפתח לבד, סיימתם. מרימים יד.

### World card worksheet (Hebrew, printed)

> **כרטיס העולם שלי** · מחשב מספר: ___
>
> **העולם שלי בשש מילים או פחות:** ______________________
> (דוגמה: "ברברים על כלבי מלחמה, כולם לובשים פרווה")
>
> **זה כמו ___ במיינקראפט הרגיל, חוץ מזה ש ___**
>
> **שלושה צבעים של העולם שלי:** ⬜ ______ ⬜ ______ ⬜ ______
>
> **דבר אחד בעולם שלי שאף אחד לא מסביר:** ______________________
> (דלת נעולה, מגדל שאי אפשר להגיע אליו...)
>
> **שאלה שהשותף שלי שאל ואין לי עדיין תשובה:** ______________________

💬 Comments:

---

## 4. How every lesson after that runs

Same rhythm as `04` §4, adjusted for the paper cards and the Gem:

| Min | What |
|---|---|
| 0-5 | Kids double-click `שחק` the moment they sit down (it takes a minute). One kid's thing from last week on the projector |
| 5-15 | Your demo: one tip card, one vanilla example ("לשם מה?"), and you build the lesson's thing live, card → Gem → paste → play |
| 15-22 | Fill the card on paper: the rule, 2-3 claims ("במשחק תראו ___"), a prediction ("הבודק שלי ___"). You stamp it on a walk-round. **No stamp, no Gem** |
| 22-50 | Build: type the card into the Gem → paste the whole file → play → tick the claims. Help order: the card, your buddy, the Gemini-Lied log, then you |
| 50-58 | Cold swap: your partner plays it and you say nothing. Watch |
| 58-65 | One log line on the card: *חזיתי / ראיתי / שיניתי / כי*. Press `שמור` |

**Homework** (optional, never needed for the next lesson): art and cards only. Textures in Piskel (free, in the
browser) saved to their school Google Drive, card drafts on paper. Nothing that needs the laptop.

💬 Comments:

---

## 5. Lessons 2-20

Order follows the rule from `04`: a feature is taught only once the starter project has a working 26.2 example
of it, from easiest to hardest. Each line below becomes a full lesson page (like lesson 1) once you OK the
sequence.

### Block 1: the first things in the world (lessons 2-5)

**Lesson 2: my first item.** Structured task: the template item gets a new name, a texture, one changed number
and a 2-sentence Hebrew tooltip. Free task: their own first item from a card. First time through the whole loop
(card → Gem → paste → play). Also: rename the mod to the world's name.
Tip card: 2-4 colours, one pop colour. *Ships: one item of their own, with its texture, in the game.*
💬

**Lesson 3: a 3D item.** Blockbench (free, in the browser, nothing to install): model the lesson-2 item, export,
drop into the folder. No code at all. Tip card: "rein it in with the cubes" (16×16).
*Ships: the item in 3D in their hand.*
💬

**Lesson 4: an item with a cost.** "Why does a bow need arrows?" The four costs (cost / flaw / limitation /
hindrance) and "what is it worse at than the vanilla one?". Each item gets a tell. Theory check: given a
description, which cost is it?
*Ships: 1-2 items, each with a named cost.*
💬

**Lesson 5: a status effect that bends one system.** Hunger, mining speed, sleep, jumping: pick ONE. Delivered
through food or a potion. Unplugged first: a paper playtest. Debugging trick: ask the Gem for a chat message when
the effect kicks in, check it, then remove it.
*Ships: one custom effect.*
💬

### Block 2: the place and the first creature (lessons 6-9)

**Lesson 6: the place.** Hand-built in their own saved world, in Creative: one small place, a loot chest with
their items, one thing nobody explains. No code. Tip card: small and dense beats big. Then the card for a world
rule, in כאשר / אם / אז form.
*Ships: the place, and a world-rule card.*
💬

**Lesson 7: the world rule.** Build the rule from lesson 6 (a storm puts out fire, at night something changes,
standing in their place does something). Visible signal to check it fires.
*Ships: one rule that works in their world.*
💬

**Lesson 8: the first creature.** Pick a vanilla mob **for how it behaves**, then reskin it: new name, texture,
one tell before it acts. Unplugged: one kid acts out the mob, another beats it using only the tell. Tip card:
Who / Want / Why.
*Ships: a reskinned creature with a tell.*
💬

**Lesson 9: connect and catch up.** The creature spawns in a chosen vanilla biome and drops one of their items; a
tooltip that points at their place. Links between cards: lives in / drops / guards. Anyone behind catches up.
*Ships: three things in the world that point at each other.*
💬

### Lesson 10: showcase 1
Seat rotation: everyone plays everyone's world on the owner's laptop, cold. Then 2 minutes per kid, no screen:
"what does my creature do, how do you see it coming, one lie I caught from Gemini."
💬

### Block 3: the signature creature (lessons 11-15)

**Lesson 11: design it.** Silhouette first, one dominant trait, 2-4 colours, "what must the player do
differently from my first creature?". The Gem interviews them (5 hard questions, no suggested answers). Paper.
💬

**Lesson 12: model it.** Blockbench, from the template mob's shape. Fallback for anyone stuck: the template mob
with three things changed on their card.
💬

**Lesson 13: into the game.** Model + texture into the mod, with the Gem using the working example.
*This is the riskiest lesson in the course (unverified on 26.2, test 3 in `REVIEW.md`).*
💬

**Lesson 14: how it fights.** Behaviour and its tell; a classmate should beat it on the second try, not the
first, not never. Playtest twice in this lesson.
💬

**Lesson 15: the lore path.** Advancements (criteria + a prize) that lead a player through the world: find the
place, beat the creature, get the item. The lore lives in their names and descriptions, 2 sentences each.
💬

### Block 4: finish and show (lessons 16-20)

**Lessons 16-17: their choice, by level.** A second creature by reusing and changing the first, a second world
rule, or (only if I've built a working example boss first) a 2-phase boss.
💬

**Lesson 18: freeze.** Nothing new, only fixes. The one book in the game. Tooltips tidied.
💬

**Lesson 19: blunt questions.** A partner interrogates the world: "why does this exist?", "how was I supposed
to know that?". Holes get fixed or cut. Rehearse the 2-minute explanation.
💬

**Lesson 20: showcase 2, families invited.** Same rotation, same "explain it". Families play the kids' worlds.
💬

**If holidays eat lessons** (Hanukkah, Passover, strikes: expect to lose about 2): cut lesson 17 first, then 9's
catch-up half, then 14 merges into 13. Never cut 10, 18 or 20.

💬 Comments on the sequence as a whole:

---

## 6. What I build next

In this order, once you've read this:
1. **The install script + the starter project** (the `world01`-`world08` mod with the four `My...java` files,
   the template item, the desktop buttons `שחק` / `שמור`). I can't download Minecraft's build files from this
   cloud machine (that site is blocked here), so **you'll run the first test on a Windows laptop**. That's also
   check 7 above.
2. **The Gem's instructions**, ready to paste, and the example of Gemini lying for lesson 1.
3. **Full lesson pages for 2-20**, written like lesson 1, with the card sheets in Hebrew.

💬 Comments:
