# Course design v2: each kid's world, built one card at a time

> **Date:** 2026-09-23 · **Status:** recommendation, not yet approved by Ben
> **Built from:** 145 YouTube videos (~56 h) transcribed and watched frame by frame, 20 batch analyses, and a
> two-round debate between five reviewers with opposing briefs. Evidence lives in `research/` (see §10).
> **Supersedes:** the week-by-week shape in `03-why-this-has-value.md` §5. The pedagogy in 03 (spec first, judge
> the machine) is kept, and folded into the card (§2).

---

## 1. Verdict on Ben's idea

**Yes to the creative centre.** Each kid designs their own world, creatures and items, in 3D, and Gemini builds
them. The research supports that, **on one condition that every source agrees on: lore only counts once it is in
the game.** The biggest risk found anywhere in the research is "worldbuilder's disease": planning and lore-writing
feel productive and eat the time meant for building. Sanderson, Stoneworks, the "7 Deadly Sins" video, Joriam
Ramos, Rick's Creations, Adam Millard and two game-dev scope diaries all name it independently. Millard goes
further: in games, *more* lore makes worldbuilding worse; short lore a player can find, and that survives a blunt
question, makes it better.

**Game design: Ben's hunch was right.** None of the worldbuilding or character videos say how "a fire spirit
boss" becomes attacks, a cost, a tell and a way to beat it. It doesn't need to be a separate unit, though. It
lives in two places:
1. **The questions on every card**: what does it cost, what can't it do, what's its tell, what must the player
   do differently, which one Minecraft system does it bend.
2. **A cold playtest every week**: a classmate plays it with no explanation, the kid watches, then changes one
   thing and logs why. Only playtesting shows whether a mechanic is fun; the checklists don't.

**"Insane lore and game mechanics", honestly:** one small, dense world where everything connects, every piece
is the kid's own, and a stranger can play it cold. Not pages of lore, not dozens of systems. §6 has the numbers.

**How it fits the earlier pivot ("judge the machine"):** the card *is* the spec. A kid who can't read Java can
still judge Gemini, by checking the game against claims on their own card ("glows red 1 second before it
lunges; dies in 4 hits"). The Gemini-Lied log stays, but only for lies that were *caught and fixed*. "Show me the
line" is dropped: a zero-coder can't read the line.

---

## 2. The unit of work: the card

Every creature, item and place is a card on the platform. The card is the lore, the design and the Gemini prompt
at once. Fields (Hebrew labels):

| Field | Why it's there | Source |
|---|---|---|
| Name + `registryName` (e.g. `ember_wolf`) | The same string as the files in the mod, so the platform knows when the thing exists in the game | engineer |
| Who / Want / Why (creatures) or the rule in one sentence (items, places) | Motivation turns into a mob's AI goal; a rule you can't say in one sentence frustrates players | Drelix (B); Sanderson (G); Design Doc (P1) |
| Cost: cost / flaw / limitation / hindrance | Limits are more interesting than powers | Sanderson's 2nd Law (G); cost shapes (N2) |
| What it's worse at than vanilla | Stops "best at everything" | Extra Credits (I) |
| Its tell | One unmistakable warning before it acts | Design Doc (L) |
| **"In the game you will see ___"** (2-3 claims) | Things you can see or count, ticked pass/fail after running | skeptic |
| **"My tester will ___"** | Prediction about the player, checked in the cold playtest | game-design seat |
| Tooltip, ≤2 sentences, **Hebrew + English** | The lore that actually reaches the player | Millard (E); Hebrew risk (§8) |
| Iceberg, ≤80 words, never shown in game | An outlet for the writer kids, capped | Sanderson (H); advocate |
| Picture | Silhouette filled black, or a Blockbench screenshot. No drawing skill needed | all 12 character videos (A-C) |
| Status | idea → spec → in the game → tested cold → tuned | all seats |

**The AI rule (the one thing no seat wanted to lose):** Gemini may **interview** a kid ("ask me 5 hard questions
about my mob, don't suggest answers") and **critique** a card. It never writes a card, a name or a texture. Hands
make the models and textures; Gemini makes the code. Otherwise the kid is a customer, not a maker.

---

## 3. The 20 weeks

| Weeks | Block | What ships |
|---|---|---|
| **0** | **Ben's week** (see §7) | Template, Hebrew test, mob-export test, install night |
| 1-2 | First item | A textured item in the game in week 1, a Blockbench 3D item by week 2 (JSON drop-in, no code). World card: theme in ≤6 words, "like vanilla X, except...", a 3-colour palette |
| 3-5 | Items with a cost | 2-3 more items, each with a cost and a tell; one custom status effect that bends ONE existing system (hunger, mining speed, sleep...) |
| 6-8 | The place | Hand-built in the kid's saved world with a loot chest of their items; one night or weather rule; their mobs/ores spawning in a chosen vanilla biome. First creature: a vanilla mob picked **for its behaviour**, reskinned, with a tell |
| 9 | Buffer | Catch-up and polish (holidays and dead-network days will eat ~2 sessions) |
| **10** | **Showcase 1** | Seat rotation: everyone plays everyone's mod on the owner's laptop. 2-minute "explain it" per kid, no screen |
| 11-15 | Signature creature | The kid's own Blockbench mob with animations. Fallback: a teacher-built template mob where the kid swaps the texture and one behaviour. Advancements as the lore path (criteria + prize) |
| 16-17 | Signature choice, by tier | A 2-phase boss (only if a reference boss exists, §7), or a second mob via reuse-and-vary, or a second world rule |
| 18 | Freeze | Nothing new, only fixes |
| 19 | Blunt questions | A partner interrogates the world; holes get cut or fixed |
| **20** | **Showcase 2** | Families invited. Same rotation, same "explain it" |

**The ordering rule:** a feature is taught only once the `reference/` folder has a working 26.2 example of it.
Gemini is mostly trained on old Forge and is most wrong where it has nothing to copy. Order follows the cost map:
item → 3D item → status effect → reskinned mob → Blockbench mob → boss.

---

## 4. One 65-minute session

| Min | What |
|---|---|
| 0-5 | Start `runClient` first (Gradle is slow). One kid's thing from last week on the projector |
| 5-13 | One tip card, taught in Hebrew, with one vanilla example. Never two cards in a session |
| 13-20 | Fill or update the card: claims + prediction. Ben stamps it "approved to prompt" on a walk-round |
| 20-50 | Build: "copy spec" → Gemini → run → tick claims. Help order: card, buddy, Gemini-Lied log, Ben |
| 50-58 | Cold swap: partner plays with no explanation. Broken build? Test the last working commit |
| 58-65 | One log line: *predicted / saw / changed / because*. Screenshot to the card, status updated, commit |

**Homework is art and cards, never code.** Unsupervised builds break projects and the next session goes on
repairs. No session depends on homework, because half the kids won't do it.

---

## 5. The platform (on MAKE's system)

v1 holds five things and nothing else:
1. **Cards** (§2), with "copy spec" (the Gemini prompt) and "copy lang" (exports tooltips into `he_il.json` and
   `en_us.json`, keyed by `registryName`).
2. **~10 tip cards** shown next to the field they belong to (§5.1), not as a library to browse.
3. **The Gemini-Lied log**, shared by the class: caught-and-fixed entries only.
4. **Gallery**: screenshots, one row per kid.
5. **World page, generated from the cards.** Anything not yet in the game is shown dimmed. Links between cards
   (creature lives in place, drops item) turn green when both ends are in the game. That is "insane lore"
   measured in connections, not words.

**Where it lives:** make-class.web.app is a FlutterFlow (Flutter web) app on Firebase Auth + Firestore. Its
source isn't available to us. Best route: a separate course app on the **same Firebase project**, so kids use
the same login. Needs Firebase access from Ben/MAKE. A plain list of links replaces a drawn "lore web", because
FlutterFlow has no native graph view.

### 5.1 The tip cards (≈10, one per session)
Silhouette test · one dominant trait + 2-4 colours · Mojang's six steps (appeal, don't unbalance the ecosystem,
don't ruin player builds, give it a purpose, stay consistent, "reign it in with the cubes": 16×16) ·
Who/Want/Why · the four costs · bend ONE system · one tell before it acts · "what must the player do
differently?" · teach it cold (safe → hard → combined) · double-or-halve a number · two sentences that survive a
blunt question · reuse and vary.
Plus an **inspiration deck**: ~100 mechanics catalogued from two compilation videos and ~60 kid-level mechanic
cards from the Design Doc/GMTK batches (`research/notes/_batch_M.md` and batches K-T2).

---

## 6. What a kid has at week 20

| | Every kid, even after missing sessions | Typical | Top third |
|---|---|---|---|
| Items | 3 (1 in 3D) | 5, each with a named cost | 6-10 |
| Creatures | 1 reskinned mob with a tell | + their own Blockbench mob | + a second mob or a 2-phase boss |
| Place | 1 bent world rule | hand-built place with a loot chest | + advancement lore path |
| Lore | 6-8 tooltips, all findable in game | 12-15 + one book | 20+, all connected |
| Can explain | what their mob does and how you see it coming; why one item has a cost; one Gemini lie they caught | + one change they made because of what a tester did | + why the boss is where it is |

**Out of reach, stated plainly:** dialogue, quest logs beyond advancements, custom menus/screens, companions that
take orders, a dimension per kid, generated structures and new terrain biomes. None has a 26.2 example in the
reference mod.

---

## 7. Before week 1: Ben's test list

This decides several things above, so it comes before the starter workspace is built.
1. **Install + first build on a laptop on the school network.** Time it. (Up to an hour per the NeoForge docs.)
2. **Hebrew in the game** (~1 hour): item name, tooltip, advancement, effect name, written book, sign × (game
   language English / Hebrew / Hebrew + the HebrewFix mod). Vanilla only reorders right-to-left text when the game
   language is Hebrew, and has open RTL bugs. Result decides the in-game language: Hebrew works → Hebrew;
   only HebrewFix works → pin it in the template; neither → in-game text in English, cards stay Hebrew.
3. **Blockbench → 26.2**: a 3D item (expected easy) and a mob end to end (Modded Entity export → Gemini adapts
   it with the reference's Dodo mob open). If the mob fails, weeks 11-15 use the teacher template mob.
4. **Gemini rate limits** with several Antigravity sessions at once.
5. **A reference boss** (optional). Without it, bosses stay out of the course.

Then the **starter workspace** (paused deliverable, HANDOFF §8) is rebuilt around this: a unique mod id per kid,
a `reference/` folder with one working 26.2 example per feature in the order above, a rules file of the 26.2
renames Gemini gets wrong (`Identifier`, `ValueInput/ValueOutput`, render states, `items/*.json`...), a
`play.bat` running `runData` then `runClient`, and the Hebrew decision.

---

## 8. Where the reviewers still disagree (Ben decides)

| Question | Options | My pick |
|---|---|---|
| How much lore? | Tooltips only (realist) · tooltips + ~80-word iceberg per card + one book (advocate) | Tooltips + iceberg + one book. Measured in connections, not words |
| Weekly tuning? | Change one number every week, logged (game design) · lighter | Weekly cold swap is fixed; the logged change is one line, not a timed class step |
| Bosses | For everyone (game design) · stretch only (everyone else) | Stretch, and only after a reference boss exists |
| When does the world appear? | Week 14 (engineer) · week 1 card, place by week 6-8 (advocate) | World card week 1, place weeks 6-8 |

---

## 9. What I think, briefly

- The idea is better than the version it replaces. "Judge the machine" on its own was thin for zero-coders: they
  can't read Java, so it shrank to "did it crash?". Ben's creative centre gives them something they care about
  enough to judge.
- The risk is also real. A lore-first course with Gemini one tab away can end with 8 kids who collected things
  Gemini wrote. The AI rule and the claims on the card are what stop that. They're worth defending even when
  they slow a session down.
- **No more video research.** One round of game-design videos was worth it: it produced the cost questions, the
  tell, "bend one system" and the playtest loop. A second round would repeat them. What's missing now can only
  come from Ben running week 1 himself (§7).

---

## 10. The research behind this

In `research/`:
- `CONTEXT.md`, `SYNTHESIS.md`: the brief and the combined findings.
- `notes/<videoId>.md`: one file per video, timestamped. `notes/_batch_*.md`: 20 batch syntheses.
- `debate/r1_*.md`, `debate/r2_*.md`: the five reviewers (advocate, game design, classroom realist, learning
  skeptic, engineer), two rounds each.
- `videos.json`: all 145 videos with titles, channels and lengths.

Honest limits:
- **Anchoring:** the 14 game-mechanics batches were shown an earlier verdict ("game design is a layer, not a
  pillar") and asked if it changed. All agreed, which is weaker evidence than it looks. The debate tested the
  question afresh, with one reviewer assigned to argue the opposite.
- Of Ben's own game-mechanics picks, 2 of 8 were strong (Extra Credits' hidden mechanics, GMTK on engagement);
  the rest were recap, filler, a Godot coding tutorial, or too abstract for this age.
- Two Design Doc batches (RPG and genre case studies) were low relevance. Sanderson's four publishing lectures
  were irrelevant; a small model skimmed them and a keyword check agreed. The 2-hour Drawing Codex video has
  ~15-20 minutes of content. One analyst sampled frames instead of checking all of them.
- Transcripts: YouTube captions for most videos, Whisper large-v3 for five without captions.
