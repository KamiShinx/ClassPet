# The Ministry's CS pedagogy, applied to our class

> **Source:** "תכנית לימודים במקצוע מדעי המחשב לחטיבת הביניים — אלגוריתמיקה באמצעות שפת Python, חלק א'"
> (19 pages, 9 chapters, 60 hours). Ben supplied it as the ז' curriculum; its rationale page says כיתה ח'.
> **Taken:** the pedagogy only. **Not taken:** Python, Turtle, the topic list, the hour counts.
> **Applies to:** `04-creative-course-design.md`. Section 3 below rewrites 04's blocks in the Ministry's chapter
> format; section 4 lists what changes in 04.

---

## 1. What pedagogy the document actually contains

It's mostly a syllabus. The pedagogy is in three places: the rationale (p. 2), the "דרכי ההוראה" and
"דרכי הערכה" of each chapter, and the fixed template every chapter follows. Everything I found is below.

| # | Principle | Where (page) | What it says |
|---|---|---|---|
| 1 | **A fixed template for every unit** | every chapter | מטרת הפרק · מטרות ביצועיות · מושגים והכוונה · דרכי ההוראה · דרכי הערכה · חלוקת השעות |
| 2 | **Performance objectives** | every chapter | Each unit lists 3-9 "התלמיד ידע ל..." statements: observable, checkable |
| 3 | **Mostly hands-on** | p. 3-5 | 44 of 60 hours are התנסות, 16 are עיוניות: ~73% doing |
| 4 | **The tool isn't the subject** | p. 6 | "אין לייחס לסביבה עצמה חשיבות מיוחדת... עיקר הדגש הוא על חשיבות האלגוריתם" |
| 5 | **Spiral: every unit extends the same thing** | p. 8, 10, 11, 13, 15, 17 | "הפרק הוא המשך לפרקים הקודמים במובן שבו מתרחב האלגוריתם" |
| 6 | **From a verbal description to a working result** | p. 6, objective 7 | Turn an idea written in words (אלגוריתם מילולי) into a program that runs |
| 7 | **Structured tasks + free exploration** | p. 6 | "משימות מובנות ומשימות התנסות חופשית" |
| 8 | **Trace tables** | p. 8, 10 | Execution is demonstrated by tracing it step by step (טבלאות מעקב) |
| 9 | **Neutral pseudo-code and unplugged practice** | p. 11 | Teach the idea in plain words first ("חזור n פעמים"), also without a computer |
| 10 | **Correctness in your own words** | p. 11 | The student explains in their own words why the solution is correct, and that it ends |
| 11 | **Intermediate output to check the algorithm** | p. 6, 8 | "פלט ביניים לבדיקת האלגוריתם": make the program show you what it's doing |
| 12 | **One visual micro-world for every concept** | p. 3-5 | Every topic is also taught "באמצעות Turtle": the abstract idea always lands on screen |
| 13 | **"Why do we need this?" first** | p. 12, 17, 19 | Units open with "לשם מה?" before the how |
| 14 | **Pattern recognition** | p. 11, 15 | Identify which pattern a problem needs from its description (counter, accumulator, min/max, loop type) |
| 15 | **Documentation from day one** | p. 6, 7 | "יש להקפיד על תיעוד התכנית"; documenting is an objective |
| 16 | **Two kinds of assessment in every unit** | every chapter | מעשית (make/modify something that works) + עיונית (trace, explain, predict, identify) |
| 17 | **Practical assessment by modifying existing work** | p. 6 | Open an existing project, change a few things, add comments, save under a new name |
| 18 | **Each student to their potential** | p. 2 | "בהתאם לפוטנציאל כל תלמיד ותלמידה" |
| 19 | **Group work and personal responsibility, both** | p. 2 | "למידה בקבוצה והעצמה כיתתית מחד ואחריות אישית ויכולות חקר מאידך" |
| 20 | **Self-efficacy and self-learning** | p. 2 | Develop a sense that "I can learn this myself" (מסוגלות למידה עצמית) |
| 21 | **The course ends with a game** | p. 18 | Final practical assessment: write a game or animation using events |

---

## 2. How each principle lands in our class

Most of it already fits, because the course was built on the same instinct: Minecraft is the material, not the
subject. What's new is marked **NEW**.

| # | In our class |
|---|---|
| 1, 2 | **NEW.** Every block of the 20 weeks is written in the Ministry template, with "התלמיד ידע ל..." objectives (section 3). Those objectives become Ben's per-kid checklist on the teacher dashboard. |
| 3 | Our 65-minute session is already ~75% doing (build + cold swap ≈ 38 min, card + log ≈ 15 min, tip ≈ 8 min). Now stated per block. |
| 4 | Antigravity, Gemini and Blockbench are never the lesson. The lesson is the design and the check. |
| 5 | The kid's world is the "algorithm that expands": every block adds to the same mod, and every new card links to existing ones (lives in, drops, guards). |
| 6 | This is our core loop: **the card is the verbal algorithm, Gemini turns it into a program that runs.** The Ministry's first-chapter objective is literally our week 1. |
| 7 | **NEW (formalised).** Each block has one structured task everyone does from a template, and one free task (the kid's own twist). The free task is where the tiers in 04 §6 open up. |
| 8 | **NEW.** Our trace table is the **claims table**: *predicted → seen in game → pass/fail*. It's done for behaviour, not code, so a zero-coder can do it. Once per block, a paper trace too: "the player hits your mob 3 times; write what happens after each hit." |
| 9 | **NEW.** The card's rule field is written in plain "כאשר... / אם... / אז..." form ("כאשר השחקן פוגע בזאב, אם יורד גשם, אז הזאב בורח"). That's event-driven and conditional thinking with no code, and it's the Ministry's neutral pseudo-code. Plus unplugged activities: paper playtest, one kid acting out a mob's behaviour while another tries to beat it. |
| 10 | The "explain it" at the showcases, plus "why does my rule always end / never break the world?" for anything that repeats or spawns. |
| 11 | **NEW.** A real debugging move for zero-coders: ask Gemini to add a **visible signal** (a chat message, a particle, a sound) when a rule fires, then remove it once it works. "Did my rule even trigger?" becomes checkable in-game. |
| 12 | Minecraft is our Turtle. Every concept lands in the game the same session. |
| 13 | **NEW.** Every block opens with "לשם מה?": show a vanilla case first (a creeper's hiss is its tell; the bow's arrows are its cost), then ask why it's there. |
| 14 | **NEW.** Design patterns instead of counter/accumulator: the four costs, the tell, bend-one-system, reuse-and-vary, phase layering. Theory check: given a description ("a sword that heals you but breaks faster"), which cost type is it? |
| 15 | Documentation = the card's version history + the one-line log (*predicted / saw / changed / because*) + git commits. It's assessed, not optional. |
| 16, 17 | **NEW.** Every block ends with both kinds of assessment (section 3). The practical one often modifies existing work: "take the template mob and change three things on your card"; "a classmate's item is overpowered; change one number and justify it." |
| 18 | The floor / typical / top tiers in 04 §6. |
| 19 | Group: pairs for the cold swap, the class Gemini-Lied log, the showcases. Personal: your own mod, your own cards, your own log. |
| 20 | The help order (card → buddy → log → `reference/` folder → Ben), so kids learn to get unstuck without the teacher. |
| 21 | Week 20: every kid's world, played cold by families and classmates. |

---

## 3. The blocks, in the Ministry's template

Time ratio per block: roughly **75% התנסות / 25% עיוני**, as in the source. A "session" is ~65 real minutes.

### Unit 0 — Before week 1 (Ben, plus home install)
**מטרת הפרק:** a working template on every laptop before any lesson depends on it.
**מטרות ביצועיות:** the student can open the project, run Minecraft from it, and find their mod in the Mods list.
**דרכי הערכה:** מעשית — screenshot of the title screen with their mod loaded.

### Unit 1 — The first thing in the game (weeks 1-2)
**מטרת הפרק:** turn an idea written in words into an item that exists in the game, and start the world.
**לשם מה?** A vanilla item and its tooltip: why does it look and read the way it does?
**מטרות ביצועיות:** the student can
1. write a world card: theme in ≤6 words, "like vanilla X, except...", a 3-colour palette;
2. write an item card with a one-line rule and 2 claims ("in the game you will see ___");
3. turn the card into a Gemini prompt and get the item into the game;
4. paint a 16×16 texture and replace the default;
5. export a Blockbench 3D item and see it in hand;
6. tick each claim pass/fail and write one log line.
**מושגים:** card, claim, prediction, texture, 3D model, tooltip, registry name.
**דרכי ההוראה:** structured task: reskin the template item (new name, texture, one changed number, a 2-sentence
tooltip). Free task: their own first item. Tip card: silhouette + 2-4 colours.
**דרכי הערכה:** מעשית — the item works in the game and matches its claims. עיונית — given someone else's item card,
predict what you'll see in the game.
**זמן:** 2 sessions · ~75% build and test.

### Unit 2 — Items with a cost, and one bent rule (weeks 3-5)
**מטרת הפרק:** design items that make the player choose, and a status effect that bends one Minecraft system.
**לשם מה?** Why does the bow need arrows? What would Minecraft be like if it didn't?
**מטרות ביצועיות:** the student can
1. name an item's cost using the four types (cost / flaw / limitation / hindrance);
2. say what their item is worse at than the vanilla one;
3. write a rule in "כאשר / אם / אז" form;
4. design a status effect that bends exactly one existing system;
5. use a visible signal (chat message, particle) to check whether a rule fired, then remove it;
6. run a cold swap and log one change with its reason.
**מושגים:** cost, tell, trigger, condition, effect, "bend one system", cold playtest.
**דרכי ההוראה:** structured: add a cost to the unit-1 item. Free: a new item + the effect. Unplugged: paper
playtest of the effect before building it. Tip cards: the four costs; bend one system.
**דרכי הערכה:** מעשית — a classmate's overpowered item: change one number and justify it. עיונית — from a written
description, identify the cost type; trace what happens over 3 uses.
**זמן:** 3 sessions.

### Unit 3 — The place and the first creature (weeks 6-8)
**מטרת הפרק:** a small place with one world rule, and a creature chosen by behaviour.
**לשם מה?** Why does a zombie burn in daylight? What does that do to how you play at night?
**מטרות ביצועיות:** the student can
1. build a place by hand in their saved world with a loot chest of their items;
2. write and build one night or weather rule;
3. pick a vanilla mob for its behaviour and reskin it;
4. give the creature one tell before it acts;
5. write the creature's Who / Want / Why and one line of lore findable in the game;
6. link cards (lives in, drops, guards).
**מושגים:** place, world rule, behaviour, tell, lore line, link.
**דרכי ההוראה:** structured: reskin the template mob. Free: their own creature and place. Unplugged: one kid acts
the mob, another tries to beat it using only the tell. Tip cards: Who/Want/Why; one tell.
**דרכי הערכה:** מעשית — the creature's claims pass in the game. עיונית — paper trace: "the player hits your mob 3
times in the rain: what happens after each hit?"
**זמן:** 3 sessions.

### Unit 4 — Buffer and showcase 1 (weeks 9-10)
**מטרת הפרק:** finish, then play each other's worlds cold.
**מטרות ביצועיות:** the student can show their world to someone who knows nothing about it, and explain one mechanic
and one Gemini mistake they caught, without the screen.
**דרכי הערכה:** מעשית — the seat rotation. עיונית — 2-minute "explain it".
**זמן:** 2 sessions.

### Unit 5 — The signature creature (weeks 11-15)
**מטרת הפרק:** a creature of the kid's own design, modelled in Blockbench.
**לשם מה?** Look at three vanilla mobs in silhouette: why can you tell them apart from far away?
**מטרות ביצועיות:** the student can
1. design a creature that passes the silhouette test;
2. model and texture it in Blockbench within the 16×16 budget;
3. get it into the game (from the reference example, or the teacher template as a fallback);
4. say what the player must do differently to beat it compared with their first creature;
5. connect it to their world with advancements (criteria + prize).
**מושגים:** silhouette, model, animation, advancement, criteria, prize.
**דרכי ההוראה:** structured: the template mob, changed on three card fields. Free: their own model. Tip cards:
Mojang's six steps; "what must the player do differently?"; teach it cold.
**דרכי הערכה:** מעשית — the creature works and a classmate beats it on the second try (not the first, not never).
עיונית — identify the pattern: which of their creature's features is its tell, its cost, its weakness?
**זמן:** 5 sessions.

### Unit 6 — The signature choice (weeks 16-17)
**מטרת הפרק:** one deeper thing, chosen by tier: a 2-phase boss (only if a reference boss exists), a second creature
via reuse-and-vary, or a second world rule.
**מטרות ביצועיות:** the student can explain why they chose it, and what they cut to make time for it.
**דרכי הערכה:** מעשית — works against its claims. עיונית — for a boss: "each phase keeps the old attacks and adds
one"; write phase 2 in כאשר/אם/אז form before building it.
**זמן:** 2 sessions.

### Unit 7 — Finish, blunt questions, showcase 2 (weeks 18-20)
**מטרת הפרק:** a finished world a stranger can play cold, every piece of it explained by its maker.
**מטרות ביצועיות:** the student can answer a partner's blunt questions about their world, cut or fix what doesn't
survive, and give a 3-minute tour.
**דרכי הערכה:** מעשית — families and classmates play it. עיונית — "explain it", plus the card set as a
documentation check: is every card either in the game or deleted?
**זמן:** 3 sessions.

---

## 4. What this changes in 04

1. **Add to the session (04 §4):** a 2-minute "לשם מה?" opener on the first session of each unit; a short
   עיונית check at the end of each unit (paper trace, predict, or identify the pattern).
2. **Add to the card (04 §2):** the rule field is written as "כאשר... / אם... / אז...".
3. **Add a tip card:** "Did my rule fire?" Ask Gemini for a visible signal, check, then remove it.
4. **Add to the platform (04 §5):** each unit's objectives as a per-kid checklist on Ben's dashboard. It's also
   the document to hand MAKE if they ask how the course is assessed.
5. **Add unplugged moments:** paper playtest (unit 2), acting out a mob (unit 3).

Everything else in 04 stands.
