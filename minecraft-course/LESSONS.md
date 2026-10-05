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

**2. No editor for the kids: two clicks (5 Oct, after Ben asked how 11-year-olds would manage).** The kid's loop:
click the copy button on Gemini's code → double-click **Minecraft - Paste & Play** on the desktop. That button finds
the file the code belongs in (from its `public class` line), backs up the old version, saves the new one, builds and
opens Minecraft. If it fails, the error is already copied: back in Gemini, Ctrl+V, Enter. **Minecraft - Undo** brings
back the version before the last paste. **Minecraft - Pictures** opens the folder where textures go. VS Code is still
installed, for you.

**3. The starter project is built so that one thing = one block of code + one picture.** A new item is one
block in `MyItems.java` (name, Hebrew name, tooltip, numbers) plus a PNG dropped in a folder. The project creates
the model and language files on its own every time the kid presses Play. The same goes for effects
(`MyEffects.java`), creatures (`MyMobs.java`) and world rules (`MyRules.java`). Gemini only ever edits one of
these four files, so the kid always knows which file to paste into.

**4. Cards are on paper for now.** Printed Hebrew card sheets in a folder per laptop number, kept in class like
the laptops. The kid types the card into the Gem. A web platform can come later (maybe the web-app course's hub).
Nothing in the lessons depends on it.

**5. Saving and undo.** Every paste backs up the file it replaces (`C:\MAKE\saves`), and Undo steps back one paste
at a time. Once a month you copy the 8 laptops' `C:\MAKE\mod\src` folders to a USB stick, in case the school wipes
or swaps a laptop.

**6. Play works offline after the first time.** If the school internet dies mid-lesson, Minecraft still starts.

**7. Every kid's mod is called `myworld`** (package `make.myworld`), the same on all 8 laptops, so the Gem and the
lessons are identical for everyone. The world's real name is one line in `MyWorld.java`. Showcases run on each kid's own
laptop, so the mods never need to load together; if you ever want one shared world, I'll rename them then.

**8. Every lesson is "learn this, build this, bye" (Ben, 5 Oct).** 90 minutes, one idea, one thing built. No
rituals: no lies log, no stamps, no weekly silent playtest, no log lines, no tip-card series, no rule lists. The
story lives in names and tooltips. Bosses are a stretch goal only.

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

**Update (5 Oct): the school's filter will block most of the download sites, so the USB stick is the main plan.**
You install once on your laptop with `setup/install.bat`, run `setup/make-usb.bat` from the stick, and in lesson 1 each
kid double-clicks `install-from-usb.bat` on the stick (a copy, no internet; then Minecraft opens offline). Only Gemini
needs the school internet. Still worth asking IT to open the sites in row 5, so later fixes don't need a stick.

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

**Learn:** what a mod is; Gemini writes the code, you decide what to build and check that it did it.
**Build:** Minecraft running with the kid's (still empty) mod, a world card on paper, a first message to the Gem.
**You bring:** the USB sticks; printed world cards; the Gem already shared with the class.
**Lesson 1 is deliberately loose:** the real job is getting 8 laptops installed while you talk about the course.

### The plan (90 minutes)

| Min | What happens |
|---|---|
| 0-15 | **Install from the sticks.** One stick installs one laptop at a time (about 5 minutes), so with 3 sticks the last laptop starts around minute 10. Start talking once the first round is running |
| 15-20 | **What the course is about:** what a mod is, what they build in each part, the showcase with families at the end. Stretch this while installs are still running |
| 20-35 | **Learn.** Gemini writes the code; you decide and check. Live in plain Gemini: "תבנה לי חרב", then a filled card. Kids vote which answer is better |
| 35-50 | **Build: the world card**, on paper (worksheet below). Installs still running after that: the silhouette game on the projector (guess the mob from its black shape) |
| 50-80 | **Build: first look.** Minecraft is open: Creative world, screenshot, find the mod in Mods. Then Gemini: log in with the school account, open the Gem, send the world's line, answer its question. Done early: build in the Creative world |
| 80-90 | Cards into the folder. Laptops plugged in. An install that hasn't finished stays open. Write down which laptops didn't finish |

**If one laptop fails:** that kid pairs with a neighbour. You fix it after class.

### On the board (Hebrew, for the kids)

> **מתקינים את מיינקראפט**
> 1. מכניסים את הדיסק און קי למחשב.
> 2. פותחים את סייר הקבצים (Win + E) ולוחצים על הדיסק און קי, ברשימה בצד שמאל.
> 3. לוחצים פעמיים על `install-from-usb`.
>    אם קופץ חלון כחול ״Windows protected your PC״: לוחצים **More info** ואז **Run anyway**.
> 4. נפתח חלון שחור. **לא סוגרים אותו!**
> 5. כשכתוב You can take the stick out now, מעבירים את הדיסק למי שעוד לא התקין.
> 6. כשמיינקראפט נפתח לבד, סיימתם. מרימים יד.

### World card worksheet (Hebrew, printed)

> **כרטיס העולם שלי** · מחשב מספר: ___
>
> **העולם שלי בשש מילים או פחות:** ______________________
> (דוגמה: ״ברברים על כלבי מלחמה, כולם בפרוות״)
>
> **זה כמו ___ במיינקראפט הרגיל, חוץ מזה ש ___**
>
> **שלושה צבעים של העולם שלי:** ⬜ ______ ⬜ ______ ⬜ ______

💬 Comments:

---

## 4. How every lesson after that runs

Learn this, build this, bye. 90 minutes:

| Min | What |
|---|---|
| 0-10 | Kids double-click `שחק` the moment they sit down (it takes a minute). You show today's finished thing |
| 10-25 | **Learn:** one idea, then you build today's thing live: card → Gem → paste → play |
| 25-35 | They fill their card: name, what it does, 2-3 things they'll see in the game |
| 35-80 | **Build:** type the card into the Gem → paste the whole file → play → check it against the card. Stuck: the kid next to you, then you |
| 80-90 | Press `שמור`. One or two kids show theirs |

**Homework** (optional, never needed for the next lesson): drawing textures in Piskel (free, in the browser), saved
to their school Google Drive.

💬 Comments:

---

## 5. Lessons 2-20

A feature is taught only once the starter project has a working 26.2 example of it, easiest first.

### Block 1: the first things in the world (lessons 2-5)

**Lesson 2: my first item.** *Learn:* the loop: card → Gem → paste → play. *Build:* the template item with their
own name and texture, then their own first item. The mod gets the world's name.
💬

**Lesson 3: a 3D item.** *Learn:* Blockbench (free, in the browser, nothing to install). *Build:* the lesson-2
item as a 3D model in their hand. No code.
💬

**Lesson 4: an item with a cost.** *Learn:* a strong item needs a price (why does a bow need arrows?).
*Build:* an item with a power and a cost.
💬

**Lesson 5: an effect.** *Learn:* status effects change one thing: hunger, mining speed or jumping.
*Build:* a food or potion with their own effect.
💬

### Block 2: the place and the first creature (lessons 6-9)

**Lesson 6: the place.** *Learn:* small and full beats big and empty. *Build:* by hand in Creative, a small place
in their world with a chest holding their items. No code.
💬

**Lesson 7: a world rule.** *Learn:* a rule is "when... if... then...". *Build:* one rule that works in their
world (rain puts out fire, something changes at night).
💬

**Lesson 8: the first creature.** *Learn:* pick a vanilla mob for how it behaves, and give it a warning sign
before it attacks. *Build:* that mob with their name, their texture and the warning.
💬

**Lesson 9: connect.** *Learn:* where a creature lives and what it drops. *Build:* their creature lives in a
biome they pick and drops their item. Anyone behind catches up.
💬

### Lesson 10: showcase 1
Everyone plays everyone's world.
💬

### Block 3: the signature creature (lessons 11-15)

**Lesson 11: design it.** *Learn:* a clear outline, one main trait, 2-4 colours. *Build:* the creature on paper.
💬

**Lesson 12: model it.** *Learn:* Blockbench for creatures. *Build:* the model and its texture, starting from
the template mob's shape.
💬

**Lesson 13: into the game.** *Learn:* how a model gets into the mod. *Build:* their creature walking around in
the world. *The riskiest lesson in the course (unverified on 26.2, test 3 in `REVIEW.md`).*
💬

**Lesson 14: how it fights.** *Learn:* a good fight is won on the second try. *Build:* its attack and its
warning sign.
💬

**Lesson 15: achievements.** *Learn:* advancements. *Build:* three of them that lead a player through the
world: find the place, beat the creature, get the item.
💬

### Block 4: finish and show (lessons 16-20)

**Lessons 16-17: their choice.** *Build:* a second creature, a second world rule, or (only if I've built a
working example first) a boss.
💬

**Lesson 18: finish.** Nothing new, only fixes.
💬

**Lesson 19: dress rehearsal.** A partner plays their world; they fix what didn't work.
💬

**Lesson 20: showcase 2, families invited.** Families play the kids' worlds.
💬

**If holidays eat lessons** (expect to lose about 2): cut lesson 17 first, then 9, then 14 merges into 13.
Never cut 10, 18 or 20.

💬 Comments on the sequence as a whole:

---

## 6. What I build next

In this order, once you've read this:
1. **The install script + the starter project** (the `world01`-`world08` mod with the four `My...java` files,
   the template item, the desktop buttons `שחק` / `שמור`). I can't download Minecraft's build files from this
   cloud machine (that site is blocked here), so **you'll run the first test on a Windows laptop**. That's also
   check 7 above.
2. **The Gem's instructions**, ready to paste.
3. **Full lesson pages for 2-20**, written like lesson 1, with the card sheets in Hebrew.

💬 Comments:
