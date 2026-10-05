# Round 1: Advocate (Ben's creative-first vision, steelmanned)

**Position.** The centre of gravity is the kid's world: its creatures, items and places, designed in 3D and
written as short lore. That is not decoration on top of a coding course. Done right, **the lore card is the
spec**: every card asks the mechanical questions (what it wants, what it costs, what it can't do, how the player
learns it), so writing it is game design, and prompting Gemini is just handing the card over. The one rule that
makes this survive the research: **nothing is lore until it is in the game.**

## 1. Course shape (20 weeks)

| Weeks | Block | What it's for |
|---|---|---|
| 1-4 | **Seed and first artifact** | Theme in a few words (D, Stoneworks [0:08:59]); one place, not a world (D [0:10:47]). A 3D item from Blockbench in the game by week 2 (the proven drop-in path, `_blockbench_pipeline_check.md`), with a 2-line tooltip. **W4 mini-show:** everyone holds everyone's item. |
| 5-10 | **Your place and your creature** | The place as 2-3 bent vanilla rules (night, weather, fire/light: Q1). First creature as a reskin of a vanilla mob chosen by behaviour (J, `kE0PJJlhDFA` [0:01:12]). One ruin that tells a story without text (J, `RwlnCn2EB9o` [0:01:44]). **W10 showcase: World Tour**, classmates play each other's mods and ask the "annoying questions" (E, Millard `bups0ZUQdvc` [0:09:46]). |
| 11-16 | **Lore becomes power** | The signature power and its cost (Sanderson Law 2, G `3Y9p53C1lP4` [0:49:39], [0:59:12]). A guardian/boss whose weak point is shown safely earlier (Law 1 [0:18:30], Helm's Deep [0:22:22]). A 3-5 step quest as advancements: promise, progress, payoff (F). Law 3 gate on every new idea: "can this be a variant of something you have?" ([1:09:01]). |
| 17-20 | **Polish and the Codex** | Cut, fix, finish. Every card must be in-game or deleted. **W20 showcase: Launch**, families and classmates play; the kid gives a 3-minute tour of their world. |

## 2. One typical 65-minute session (week 12, "the power and its cost")

- **0-5 Loot drop.** One kid's homework screenshot on the projector; class guesses what it does from the look
  alone (B, Blaze).
- **5-12 Tooltip lesson.** One idea: Sanderson's four boxes (cost / flaw / limitation / hindrance), with one
  vanilla example (the bow needs arrows).
- **12-22 Card sprint, hard timer.** Kid fills the Power card on the platform. Timer ends, card locks for the
  session. This is Sanderson's time-boxed iceberg (H, #9.5 [0:00:32]-[0:01:37]) as furniture, not a speech.
- **22-52 Build.** Kid pastes the card into Antigravity; Gemini builds; kid tests in `runClient`. The judging
  question is concrete: "does the game match my card?"
- **52-60 Proof.** Screenshot or 10-second clip uploaded; card status flips from *draft* to *in the game*.
- **60-65 Partner check.** Partner plays it cold and says where they got confused ("where were you bored", F).

Ratio: ~10 min writing, ~40 building/testing, ~15 seeing and judging.

## 3. What the platform holds

A **Codex** per kid: a set of cards, each a short form that doubles as a Gemini spec. Six card types:

- **World card** (one): theme in ≤6 words; "like vanilla X, except..." (contrast hook, H #9 [0:09:08]); 3-colour
  palette the whole world shares (C, Drawing Codex [1:10:23]).
- **Place card**: what's different here at night / in rain / near fire (Q1 cards 1-3); one landmark visible from
  far away (E, Hello Future Me); one thing never explained (D, [0:10:38]).
- **Creature card**: Who / Want / Why (B, Drelix); one dominant trait (A); silhouette screenshot filled black
  (A, B, C: all 12 character videos); primary/secondary/tertiary shape (C, Cuora [0:09:22]); vanilla base mob
  by behaviour; its one tell before it attacks (L); "what must the player do differently to beat it?" (I).
- **Item/Power card**: the rule in one line the player can learn by playing; the four boxes; what it's worse at
  than vanilla (I); where it's found.
- **Ruin card**: "what happened here?", answered only by blocks and loot; partner's guess recorded.
- **Mystery card**: the one question the world refuses to answer.

Every card has a **tooltip field capped at 2 sentences** (Millard, E) and
an **iceberg field capped at ~80 words** that never appears in the game. Cards link to each other (creature
lives in place, drops item, guards ruin). The platform draws those links as a **lore web**, and only links
whose both ends are *in the game* light up. "Insane lore" is measured in lit links, not words.

The tooltip field is literally the item's lore line, the advancement text or the mob's name; the platform
exports it as text Gemini wires in. That is the path from lore to game.

## 4. What a kid has at week 20

- 1 world, 1 dense place with 2-3 bent rules, 1 ruin with loot that tells a story.
- 4-6 custom 3D items/blocks (cheap path), each with a tooltip and a cost.
- 2 creatures: one reskin-level, one signature with a custom model (animated if the pipeline holds), one of
  them a guardian with a foreshadowed weak point.
- 1 quest chain of 3-5 advancements.
- 12-20 Codex entries, each ≤2 sentences shown in game, ~1,000-1,500 words of total lore, 15+ lit links.
- For any object they can say why it exists, what it costs, what it can't do, how a player learns it before
  it matters, and what Gemini got wrong building it. "Insane lore" in the only sense the research supports:
  dense and connected, not long.

## 5. Three strongest claims

1. **Creative-first already contains game design, if the cards ask the right questions.** Sanderson's Laws are
   mechanic design almost unmodified (G, `3Y9p53C1lP4` [0:59:12]); motivation converts to a mob's AI goal (G,
   `NHTYFX24BgQ` [0:06:01]); Who/Want/Why yields both tooltip and mechanical direction in one pass (B); the best
   "places" arrive as world rules (Q1, `499Fcz0utKA` [0:08:56]). Ben's instinct that game design is missing is
   right; the fix is to put it *inside* the creative cards, not beside them.
2. **Every source that names worldbuilder's disease also gives the cure, and the cure is structural.** Time-box
   (H), start with one region (D), 2-sentence cap and dense-over-broad (E, Millard [0:10:19]), cool thing first,
   justify backward (H, #9 [0:46:27]), write down what's OUT (J, `OrRDekltDOQ` [0:04:00]). Millard shows lore
   *volume* hurts games; he also shows short, answerable, player-found lore is what makes them good. That's a
   spec for lore, not an argument against it.
3. **3D design is the cheapest place to put ownership, and it survives cubes.** Silhouette, shape language,
   2-4 colours, one trait: all 12 character videos converge (A, B, C), and it matters *more* at 16x16 (B).
   Mojang's checklist is class-ready (J, `abs30d44yzg`, `UlVZgIdoR_A`). The item path is proven in 26.2, so a
   kid holds their own design in the game in week 2. *My own knowledge, not the research:* at 11-13, autonomy
   and visible competence keep kids in a 20-week elective; "my creature" carries a kid through a week of Gemini
   errors, "the lesson on specs" doesn't.

## 6. How this fails in a real room

**Most likely: the build lags the design.** Cards are fast; Gemini on 26.2 is often wrong; mobs are multi-step
with unverified export settings (`_blockbench_pipeline_check.md`). By week 12 a kid has 15 beautiful cards,
three things in the game, and a signature creature stuck in a renderer error. The lore web stays dark and the
kid feels the course lied. Second: the talker/builder split. One kid writes 3,000 words in the iceberg field
at home, another writes nothing and just wants swords. Third: the platform isn't ready (Firebase access, an
unseen FlutterFlow codebase), and cards live in a Google Doc where no cap or link is enforced.
**Mitigations:** Ben tests the mob pipeline before week 6; reskin-first so every kid has a creature by week 9;
"in the game or deleted" enforced at W10 and W20; paper cards as fallback.

## 7. What I expect the other seats to get wrong

- **Judgement seat:** makes "verify Gemini" the subject. Right skill, wrong motive: kids judge hardest when
  what's broken is *their* creature. My minutes 22-52 already contain it.
- **Game-design seat:** teaches MDA and risk/reward as frameworks. Sanderson calls frameworks diagnostics, not
  checklists (F); without the kid's own world they're homework.
- **Skeptic seat:** reads "worldbuilder's disease" as "cut lore". The research says cap it and route it into the
  game. Cut it and you get 8 generic sword mods and no reason to come back in week 14.
