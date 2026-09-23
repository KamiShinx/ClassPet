# Round 2: Advocate

All five seats share one small world, card-as-spec, a 2-sentence cap, items first, the reskinned mob before
the custom one, and showcases at W10/W20. We disagree about **what the kid is there for** and **where lore
lives**. The two new facts hit my design hardest.

## What I concede

1. **Hebrew in the game is the biggest blow to my plan.** My rule "nothing is lore until it's in the game"
   assumed Hebrew tooltips work; they may not (coordinator's note; realist r1 §3). Until Ben's week-1 test
   settles it, every card carries `tooltipHe` + `tooltipEn` and the game shows whichever renders. HebrewFix as a
   dependency only if it loads on 26.2 in that test (unverified). If Hebrew fails, the kid's full Hebrew voice
   lives on the platform, not in the game, which makes the world page more important (dispute 2).
2. **No boss, structure, quest or dialogue example exists in the reference** (engineer r1 §5.1). My "Ruin card"
   assumed a structure. Now the ruin is **hand-built in a saved showcase world** with a hand-placed loot chest:
   zero code, still Curious Archive's "a ruin is a story" (E). The foreshadowed-weak-point guardian becomes a
   **stretch tier**, gated on Ben building one reference boss; the floor is the kid's mob plus one rule the
   player learns earlier (Law 1 needs no boss bar). The quest chain stays: advancements are in the reference.
3. **My week-20 numbers were a good kid's.** I adopt the realist's floor and tiers, and drop "1,000-1,500
   words": in-game text is ~300-500 words; iceberg notes are optional and never count.
4. **Homework is art and cards, never code**, and **two buffer weeks** (realist, engineer).
5. **Playtesting is weekly** (gamedesign r1 §5B). My 5-minute check was too thin: ~10-minute cold swap.
6. **The skeptic found the hole in Ben's pitch.** If Gemini supplies the ideas too, the kid is a customer
   (Millard `bups0ZUQdvc` [0:20:33]; Sanderson `MEUh_y1IFZY` [0:50:17]).

## What I still dispute

1. **"Rules are the pillar" (gamedesign) is half right.** Q1 says places come *fused* with rules: one card
   holding both, not rules outranking bodies. A kid returns in week 14 for *their* ember wolf, not for
   "trigger → bonus". A two-week number-tuning sprint (W11-12) loses the story kids; tune inside each cold swap.
2. **"Lore only in tooltip fields, no world page" (realist) is too tight, more so after the Hebrew news.**
   Ben asked for "a place to express their creativity". The cure for the disease is a world page **generated
   from the cards** (gamedesign r1 §3), where a card with nothing in the game shows dimmed. It's also the one
   place Hebrew lore is sure to read right.
3. **The skeptic's paperwork.** Prediction, claims, build log, question wall and oral checks every session is
   too many forms (skeptic r1 §6 admits it). Keep 3 visible claims per card; cut the rest to one log line.
4. **The engineer puts the place at week 14**: ten weeks without a world. World card in W1, a hand-built area
   in the showcase save by W6-8; biome modifiers come later as an upgrade.

## The one idea I'd steal

**The skeptic's AI rule: Gemini may interview and criticise, but never write a card.** ("Ask me 5 hard
questions about my mob, don't suggest answers.") Hands make model and texture; Gemini makes code. This is
what keeps a creative-first course creative rather than a menu. (Adopted as plumbing: the engineer's
`registryName` join key and "copy lang" button, which is how a card lights up once its thing is in the jar.)

## Revised recommendation (10 lines)

1. The centre of gravity stays the kid's own world: creatures, items and a place they designed. Each kid gets one world card and theme in W1.
2. The unit of work is a card that is both lore and spec: Who/Want/Why, cost/limitation, tell, ≤2-sentence tooltip (He + En), 3 visible claims, `registryName`.
3. Gemini writes code only. It may interview and criticise, never author a card, name or texture.
4. Order by risk: 2D then 3D items (W1-4); status/world rule plus a hand-built place in the showcase save (W5-8); reskin mob (W8-9); W10 show.
5. Then the custom Blockbench creature (W11-14, only after Ben's end-to-end test), a quest chain as advancements, and one expanded power (Law 3).
6. The boss is a stretch tier, gated on Ben building a reference boss first. Buffers at W9 and W18; freeze at W18.
7. Every session: ≤10 min card on a timer, ~30 min build, ~10 min cold swap, then proof screenshot and commit. Homework is art or cards, never code.
8. The platform holds cards, and the world page, lore web and gallery are generated from them. A card with nothing in the game is shown dimmed.
9. Week-1 run tests Hebrew in tooltips, books and advancements (and HebrewFix); the in-game language is decided before W2.
10. Floor at W20 is 1 place, 3 items, 1 mob and 6-8 lines; typical adds a custom creature and a quest; top adds a boss. "Insane lore" means dense and connected, all of it the kid's own.
