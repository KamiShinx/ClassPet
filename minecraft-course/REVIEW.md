# Minecraft course: everything so far, for your review

> **How to comment:** write under any `💬` line, or anywhere, starting the line with `BEN:`. Then tell me it's
> done and I'll go through every comment. Nothing here is final.
>
> **What this file is:** the whole research and the course it led to, in one place. The detailed docs it
> summarises are `04-creative-course-design.md` (the course), `05-ministry-pedagogy-applied.md` (the Ministry
> pedagogy) and `research/` (notes per video, batch summaries, the debate).

---

## Contents
1. What you asked, and what I did
2. The short answer
3. What the research found: worldbuilding
4. What the research found: character and 3D design
5. What the research found: game design and mechanics
6. What the research found: Minecraft-specific
7. Your video lists, honestly
8. The debate
9. The course that came out of it
10. The Ministry pedagogy, added
11. Technical facts that shape the course
12. Decisions for you
13. Tests for you before week 1
14. Still open
15. Limits of this research

---

## 1. What you asked, and what I did

**You asked:** since the kids vibe-code, centre the course on the creative side (designing their own characters
and items in 3D, and worldbuilding), on a "platform" with tooltips and a place to express it, so that by the end
they have "insane lore and game mechanics". You suspected your videos weren't enough and that game design was
also needed. Later you sent a game-mechanics list and the Ministry's middle-school CS curriculum.

**What I did:**
- **145 videos, about 56 hours.** Your worldbuilding list (11 videos), Sanderson's 16-lecture playlist, your
  character-design list (12), your game-mechanics list (13) plus the two Design Doc playlists (~80), and 14 I
  added: Game Maker's Toolkit, Design Doc, Sakurai, Extra Credits, Jonas Tyroller, Mojang's own "How We Make
  Minecraft" episodes, and two Blockbench tutorials.
- Each video: full transcript (YouTube captions, or Whisper where there were none) and frames every 8-45 seconds,
  looked at, not just the audio.
- **20 analyst batches** wrote notes per video: what it teaches, what becomes a class activity, what doesn't
  survive the move to Minecraft, with timestamps.
- **A debate:** 5 reviewers with opposite briefs (your vision's advocate, a game-design hardliner, a classroom
  realist, a "what does the kid actually learn" skeptic, and a Minecraft engineer), two rounds each.
- Checked the technical claims against a real, working 26.2 mod (Kaupenjoe's tutorial repo).
- Read the Ministry curriculum and pulled out its pedagogy.

💬 Comments:

---

## 2. The short answer

- **Your creative centre is right, with one hard rule: lore only counts once it's in the game.** The single
  biggest risk in the whole research is "worldbuilder's disease": kids plan and write lore instead of building,
  and it feels productive. Seven separate sources name it. In games, more lore makes the world *worse*; short lore
  the player finds makes it better.
- **Your hunch about game design was right.** None of the worldbuilding or character videos say how "a fire
  spirit boss" becomes attacks, a weakness and a way to win. But it doesn't need to be a separate unit. It lives in
  (a) the questions every design card asks, and (b) a classmate playtesting your thing cold every week.
- **The unit of work is a card.** One card per creature, item or place. It's the lore, the design and the prompt
  for Gemini at once. Writing it *is* the game design.
- **"Insane lore and mechanics", honestly:** one small, dense world where everything connects, all of it the kid's
  own, playable by a stranger. Not pages of lore, not dozens of systems.
- **No more video research needed.** What's missing now can only come from you running the first week yourself.

💬 Comments:

---

## 3. What the research found: worldbuilding

Sources: Large Lads Studios, Stoneworks, Hello Future Me (x2), Joriam Ramos, Curious Archive, Adam Millard
(Architect of Games), Alex Renard, Rick's Creations, Sanderson's lectures.

**The strongest findings (agreed by several independent sources):**
1. **Worldbuilder's disease.** Sanderson, Stoneworks, the "7 Deadly Sins" video, Joriam Ramos, Rick's Creations,
   Millard and two game-dev diaries all warn about it independently. Planning feels like progress and eats the
   building time. For 11-13-year-olds with 65 minutes a week, it's the #1 way the course fails.
2. **Small and dense beats big and thin.** One village, one place, one hook. "Start with one region, not the
   continent" (Stoneworks, Joriam Ramos, Rick's).
3. **In games, lore volume hurts.** Millard shows games with *more* lore feeling flatter. Good game lore is short,
   answers questions the player actually has, and survives a blunt question. → **2-sentence cap on in-game text.**
4. **Lore reaches the player through things, not text walls:** items, ruins, mobs, loot, tooltips. "A ruin is a
   story and a question it never answers" (Curious Archive).
5. **Start with a theme in a few words** ("barbarians on war dogs, everyone wears fur"): it answers design
   questions and rules things out (Stoneworks). The best "where do I start" procedure found.
6. **Cool ideas need consequences.** If you add something cool, something else in the world should change because
   of it (Sins video, Stoneworks, Alex Renard).
7. **Leave one thing unexplained on purpose** (Hello Future Me, Alex Renard): a locked door, an unreachable tower.
8. **Cool thing first, justify it backwards** (Sanderson's "zeroth law"). This fits vibe-coding: the kid wants a
   thing, then writes why it exists.

**Sanderson, specifically (16 lectures, ~17 hours):**
- **His Laws of Magic are game design almost unchanged**, and the most useful thing in the whole playlist:
  1. a power can only solve problems as far as the player understands it;
  2. limits are more interesting than powers (cost / flaw / limitation / hindrance);
  3. expand what you have before adding something new.
- Promise → progress → payoff maps well onto how a mod reveals its world.
- He ranks worldbuilding the *least* important of plot, character and world.
- Four lectures (publishing business) are irrelevant. The prose craft (viewpoint, dialogue, tense) doesn't transfer.

**Doesn't transfer:** map geography rules, institutions and economies, conlangs, novel structure (three-act,
hero's journey), anything needing a novel's length.

💬 Comments:

---

## 4. What the research found: character and 3D design

Sources: Proko, Cuora, Drelix, BaM Animation, Blaze, Kirbs, pikat, KeshArt, Map Crow, Draw like a Sir, Pixel Pete,
The Drawing Codex, plus Mojang's own design videos.

**What survives when a character becomes cubes and 16×16 pixels:**
1. **Silhouette first.** All 12 character videos agree. It matters *more* in Minecraft, where a mob far away is
   read almost only by outline. → a black-fill silhouette test on every creature.
2. **Shape language:** round = soft, square = stable, triangle = danger (three videos). A kid can build it from
   cubes without drawing.
3. **2-4 colours with one "pop" colour.** A 16×16 texture forces this anyway.
4. **One dominant trait, not five.** "Overdesign is the #1 mistake" (Drelix, BaM).
5. **Design from function and story, before looks:** Who / Want / Why (Drelix), write before you draw (Kirbs).
6. **"2-3 items reskin an archetype"** (Proko: a plain figure becomes cowboy/pirate/agent by swapping a few items).
   Zero drawing needed.
7. **Can you guess its ability from the look alone?** (Blaze on Concord.) A ready-made class game.

**Kids who can't draw aren't locked out:** trait card, silhouette guessing, reskin-an-archetype, choosing cubes.

**Doesn't transfer:** line quality, anatomy, facial expression, shading, Photoshop technique, style imitation.

**One contradiction worth knowing:** Map Crow calls T-poses worthless, but a Blockbench model needs exactly that
kind of clean rest pose.

💬 Comments:

---

## 5. What the research found: game design and mechanics

Sources: Game Maker's Toolkit, Design Doc (two playlists), Sakurai, Extra Credits, Jonas Tyroller, Game Design
Library, and the channels in your list.

**The ideas that transfer best (all turn into a one-page card a kid can fill in):**
1. **MDA:** what the code does → what the player does → how it feels (GMTK).
2. **Risk and reward rise together** (Sakurai).
3. **Every cost has a shape:** rarity, cooldown, a sacrifice, risk to yourself (Design Doc items videos).
4. **A good status effect bends ONE system the game already has** (hunger, mining speed, sleep). 4 of 8 status-effect
   videos say this independently. The most Minecraft-ready idea of all.
5. **One tell before an attack:** a flash, a sound, a pause. Can a classmate dodge it the first time?
6. **"What does this mob make the player do differently?"** Reskinned mechanics aren't new mechanics.
7. **Teach a mechanic cold:** safe → harder → combined with something else (Mario, Portal).
8. **Bosses:** each phase keeps the old attacks and adds one; don't inflate health to seem epic; reuse your mob with
   one new twist instead of building from scratch.
9. **Minecraft systems to bend:** the death drop (a corpse run), sleep, day/night, weather, advancements
   (criteria + prize), villager trading.
10. **Places are rules.** The best "place" designs are a world rule (a storm puts out fire and makes one mob
    stronger). This is where your worldbuilding and your mechanics meet.
11. **Only playtesting shows if it's fun.** "Our brains are terrible game simulators" (GMTK). Mojang shipped an
    overpowered fox and had to patch it.

**Raw material for kids:** ~100 mechanics catalogued from two compilation videos, and ~60 kid-level "mechanic cards"
like: *"A healing item that takes 2 seconds to use; if a mob hits you mid-use you lose it: when do you risk
healing?"* · *"A mob that steals an item from your hotbar and runs."* · *"A chest that's secretly a monster."* ·
*"A potion that's stronger the lower your health is: what stops it being the best potion?"*

**Doesn't transfer:** turn-based combat, kart racing, rhythm games, save systems, inventory screens, dialogue
trees, companions that take orders, anything needing a whole game's systems.

💬 Comments:

---

## 6. What the research found: Minecraft-specific

- **Mojang's own design rules** (their "How We Make Minecraft" videos): make it appealing · don't unbalance the
  ecosystem · don't ruin player builds · give it a purpose · stay consistent · "rein it in with the cubes"
  (16×16 = 256 pixels). A ready-made checklist.
- **Pick a vanilla mob for its behaviour, then reskin it.** The cheapest way to a first creature.
- **Blockbench:** modelling + texturing a simple item is about 1.5 sessions for a beginner. **Two traps:** the
  popular beginner tutorial uses a format Minecraft can't load, and Mojang's Entity Wizard is for Bedrock, not our
  Java setup.

💬 Comments:

---

## 7. Your video lists, honestly

| List | Verdict |
|---|---|
| Worldbuilding (11) | Good. Two are really about *game* worldbuilding (Millard, Hello Future Me) and those are the most useful. Stoneworks gives the best starting procedure. |
| Sanderson playlist (16) | The magic-system lecture is gold. Plot and character lectures: partly useful. 4 publishing lectures: irrelevant. |
| Character design (12) | Useful, and they all agree on silhouette. Mostly 2D illustration, so a lot doesn't transfer. The 2-hour Drawing Codex video has ~15-20 minutes of content. |
| Game mechanics, your picks (8 intro videos) | **2 strong** (Extra Credits' "hidden mechanics", GMTK on engagement). The rest: recap, thin, a Godot coding tutorial, or too abstract for 11-13. |
| Design Doc playlists (~80) | The status-effect, item, boss, place and player-experience videos are very useful. The genre case studies (Final Fantasy, kart racers, rhythm games) mostly aren't. |
| Game Design Library compilations (2) | Great raw ideas, though a third of one is 8 near-identical golf games. |

**Should you send more videos?** No. This round was worth it (it produced the cost questions, the tell, "bend one
system" and the playtest loop), but another round would repeat them.

💬 Comments:

---

## 8. The debate

Five reviewers, each told to argue one side hard, then read the others and revise.

| Seat | Argued | Moved to |
|---|---|---|
| **Advocate** (your vision) | Creative first; "the lore card is the spec"; lore only counts in the game | Kept the centre; accepted lower targets and the no-AI-writing rule |
| **Game design** | Mechanics must be a full pillar; weekly playtesting | Accepted items-before-mobs and bosses as stretch; kept weekly playtests that change something |
| **Classroom realist** | What survives a bad week with 8 kids; small floor; buffers | Accepted weekly playtests and checkable claims on cards |
| **Skeptic** | If Gemini writes code *and* lore, what did the kid do? | Dropped heavy paperwork; kept "Gemini never writes the cards" |
| **Engineer** | What can actually be built on 26.2, and in what order | Accepted buffers, a smaller floor, and the claims idea |

**What all five ended up agreeing on:**
- The card is the unit, and it's the Gemini prompt.
- Lore only counts when it's in the game.
- Order by difficulty: items → 3D items → effects → a reskinned mob → their own Blockbench mob → optional boss.
- A cold playtest every week.
- Homework is art and cards, never code.
- **Gemini may interview and critique a kid's ideas but never writes their cards, names or textures.** Otherwise
  the kid is a customer, not a maker.
- **A feature is taught only once a working example of it exists to copy** (Gemini is often wrong on Minecraft 26.2).

**What they didn't agree on** → section 12.

💬 Comments:

---

## 9. The course that came out of it

### The card
Name · internal name (links it to the mod) · Who/Want/Why (creatures) or the rule (items, places) · its cost
(Sanderson's four) · what it's worse at than vanilla · its tell · **2-3 claims: "in the game you will see ___"** ·
**prediction: "my tester will ___"** · tooltip ≤2 sentences (Hebrew + English) · optional hidden note ≤80 words ·
a picture (silhouette or Blockbench screenshot) · status: idea → spec → in game → tested cold → tuned.

A kid who can't read Java still judges Gemini, by checking the game against their own claims.

### The 20 weeks
| Weeks | What ships |
|---|---|
| 0 | Setup (your tests, home install) |
| 1-2 | First item in the game, a 3D item by week 2; the world card (theme in ≤6 words, 3 colours) |
| 3-5 | Items with a cost; one status effect that bends one system |
| 6-8 | A hand-built place with a loot chest; one night/weather rule; first creature (reskinned vanilla mob with a tell) |
| 9 | Buffer |
| **10** | **Showcase 1:** everyone plays everyone's mod cold; 2-minute "explain it" |
| 11-15 | Their own Blockbench creature; advancements as the lore path |
| 16-17 | By level: a 2-phase boss, a second creature, or a second world rule |
| 18 | Freeze |
| 19 | A partner asks blunt questions; fix or cut |
| **20** | **Showcase 2**, families invited |

### A session (65 min)
Start Minecraft first (it's slow) + show one kid's thing → one tip card (8 min) → fill the card (7 min) → build
with Gemini (~30 min) → cold swap with a partner (8 min) → one log line: *predicted / saw / changed / because*.

### What a kid has at week 20
| | Every kid, even after missing sessions | Typical | Top third |
|---|---|---|---|
| Items | 3 (1 in 3D) | 5 with a cost each | 6-10 |
| Creatures | 1 reskinned mob with a tell | + their own Blockbench mob | + a boss or second mob |
| Place | 1 world rule | a hand-built place | + an advancement lore path |
| Lore | 6-8 tooltips found in the game | 12-15 + a book | 20+, all connected |

### Out of reach
Dialogue, quest logs, custom menus, companions that take orders, a dimension per kid, generated structures and
biomes.

### The platform
Holds: the cards, ~10 tip cards (silhouette, 2-4 colours, Mojang's six steps, Who/Want/Why, the four costs, bend
one system, one tell, "what must the player do differently", teach it cold, double-or-halve, 2 sentences that
survive a blunt question, reuse and vary), the class Gemini-Lied log, a gallery, and a world page built from the
cards (anything not yet in the game shown dimmed). **Where it lives is open** (see 14).

💬 Comments:

---

## 10. The Ministry pedagogy, added

From the middle-school CS curriculum you sent (its pedagogy only, not the Python). Full version in
`05-ministry-pedagogy-applied.md`.

- **Every unit written in their template:** goal · "התלמיד ידע ל..." objectives · key terms · teaching methods ·
  practical *and* theory assessment · time. The objectives become your checklist per kid.
- **~75% doing, ~25% theory** (theirs is 73%, ours already matched).
- **"לשם מה?" first:** each unit opens with a vanilla example of why the thing exists.
- **Rules on cards written as "כאשר / אם / אז"**: their plain-words pseudo-code, which trains event and condition
  thinking without code.
- **Trace tables → a claims table** (predicted / seen / pass-fail), plus one paper trace per unit.
- **"Intermediate output" → a debugging trick for zero-coders:** ask Gemini for a chat message or particle when a
  rule fires, check it, then remove it.
- **Structured task + free task** in every unit; practical assessment often means changing existing work.
- **Unplugged moments:** a paper playtest; one kid acts out a mob while another tries to beat it.

💬 Comments:

---

## 11. Technical facts that shape the course

- **3D items and blocks from Blockbench: proven easy** on 26.2 (a file drop-in, no code).
- **Custom mobs: possible but multi-step,** and the exact Blockbench export for 26.2 is unverified → test 3 below.
- **The reference mod has no boss, structure, quest or dialogue example.** Gemini has nothing correct to copy
  there, so those are the riskiest features.
- **Gemini is trained mostly on old Minecraft code** and will be confidently wrong on 26.2. Fix: the starter
  project ships a folder of working 26.2 examples, and a rules file listing the new names Gemini gets wrong.
- **Hebrew inside Minecraft Java is a real risk.** The game only reorders right-to-left text when its language is
  set to Hebrew, and there are open bugs. A community fix mod exists (HebrewFix). → test 2 below.
- **Every kid needs their own mod id from day 1**, or their mods can't be loaded together.

💬 Comments:

---

## 12. Decisions for you

1. **How much lore?**
   A: tooltips only (2 sentences each, in the game).
   B: tooltips + a hidden note of ≤80 words per card (never shown in the game) + one in-game book.
   *My pick: B. It gives the writer kids an outlet, with a cap.*
   💬

2. **Weekly tuning?**
   A: every week the kid changes one number after the playtest and logs why.
   B: lighter. The cold playtest is weekly; the logged change is one line when there is one.
   *My pick: B.*
   💬

3. **Bosses?**
   A: every kid builds one.
   B: a stretch goal for stronger kids, only after you build a working example boss.
   *My pick: B.*
   💬

4. **When does the kid's world appear?**
   A: world card in week 1, a hand-built place by weeks 6-8.
   B: the place waits until week 14.
   *My pick: A. Otherwise they go 10 weeks without a world.*
   💬

---

## 13. Tests for you before week 1

1. **Install and first build on the school network.** Time it. Up to an hour for the first build. Tells us whether
   the install has to be homework.
   💬
2. **Hebrew inside Minecraft (~1 hour).** Hebrew in an item name, tooltip, advancement, effect name, book and sign,
   each with game language English / Hebrew / Hebrew + HebrewFix.
   Works → Hebrew. Only with the fix → the fix goes in the template. Neither → in-game text in English, cards
   stay Hebrew.
   💬
3. **A Blockbench mob into 26.2, end to end.** If it fails, weeks 11-15 use a template mob you build.
   💬
4. **Gemini limits:** several Antigravity windows at once, to see if 8 kids hit a limit mid-lesson.
   💬
5. **Optional: one example boss.** Without it, bosses stay out.
   💬

---

## 14. Still open

- **Where the platform lives** (make-class is off the table). Options: a small web app of its own, a Google
  Sites/Docs setup, or paper cards for v1.
  💬
- **The starter workspace** (the project each kid gets): waiting on tests 1-3.
  💬

---

## 15. Limits of this research

- **Anchoring:** the 14 game-mechanics batches were shown an earlier verdict ("game design is a layer, not a
  pillar") and asked if it changed. They all agreed, which is weaker evidence than it looks. The debate re-tested
  it with a reviewer assigned to argue the other side.
- The 4 publishing lectures were skimmed by a small model; a keyword check agreed they're irrelevant. One analyst
  sampled frames instead of checking all of them.
- Everything about what 11-13-year-olds will actually do is prediction until week 1.
- Transcripts: YouTube captions for most videos, Whisper for 5.
- The videos are deleted; all 145 transcripts and the useful frames are kept in `minecraft-course-research/` on E:.

💬 Comments:
