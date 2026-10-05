# Batch Q2 — exploration and quests (fast travel, backtracking, battlefields, side quests, missions, time limits)

6 Design Doc videos, ~19-31 min each, dense and well-organized. This was the most consistently strong batch of the
project so far: no filler videos, real critique (not just praise) in every one, and — because "Minecraft has no
quest system" turns out to force useful translation work — most ideas land cleanly on advancements, structures,
loot tables, villager trades, boss bars and block-tick logic rather than needing a custom UI.

## Strongest ideas across the batch
1. **Fast travel as a cost dial, not a feature toggle** (eDSL6fNk758 [0:15:23]): teleport-anywhere vs hub-to-hub vs
   faster-movement, each gated by "visit once first," a resource cost, or story progress. Maps directly onto a
   craftable waystone/totem item.
2. **Lock-and-key structure gating** (wM4WF4MnZCc [0:15:16]): a visible door/structure you can't act on until you
   have a specific item — exactly the Metroidvania trick, and exactly what NeoForge advancement/inventory checks
   already do well.
3. **Terrain-reactive combat** (Z47fljJVy6M [0:05:36], [0:16:10]): weather-boosted mobs/potions and hazard blocks
   (Mega Man Battle Network's elemental panels) map onto Minecraft's existing rain/soul-sand/magma idiom almost
   exactly — the single most "already half-built in vanilla" idea in the batch.
4. **Three-part side quest spec + four content types** (yTJ_RjfhGVQ [0:01:48], [0:05:59]): start/middle/end, and
   fetch-or-kill / genuinely-different-activity / remix-an-existing-mechanic / optional-challenge-boss. The
   cleanest one-page worksheet template in the whole project so far.
5. **Stacked timers create planning, not just pressure** (frN8aED45rU [0:20:49], Pikmin 1): a day-budget AND a
   daily sub-deadline (Minecraft's day/night cycle already gives this for free) produces real decisions.
6. **"Backtracking is a content problem, not a geography problem"** (wM4WF4MnZCc [0:02:22]): the fix is always
   "put something new on the return trip," never "avoid revisiting places."
7. **Mission failure checklist** (Ys3yNeF60EY, all): escort-mob pathfinding, no-win states with no feedback,
   precision demands the controls can't support — a review tool for whatever the kids design, not a generator.

## Where videos agree or contradict
Two videos independently pick the **same weak example** from two angles: wM4WF4MnZCc criticizes Paper Mario TTYD's
backtracking (General White fetch quest), and yTJ_RjfhGVQ separately criticizes its Trouble Center quest-board
friction. That's real convergence, not coincidence — both land on "forced travel with nothing new along the way
kills motivation," the batch's single most repeated lesson. The fast-travel and battlefields videos also agree on
a shared design instinct (Design Doc's house style, consistent across the whole channel): **theme should feed
mechanics, not just decorate them** — a stage that's also a combat mechanic (Paper Mario's audience) beats a stage
that's just reskinned. No real contradictions surfaced; where videos overlap they reinforce rather than dispute
each other.

## Ideas to cut
Chrono Cross's RNG-dependent Field Effect (explicitly flagged by its own video as a failure — not a template);
Baldur's Gate 3-level physics interactions (needs AAA budget, said outright in the video); full quest-log/dialogue
UIs and Cook Serve Delicious-style multi-timer typing interfaces (custom UI, flagged hard by the GM brief);
precision-platforming/camera-polish failure cases (Mario Sunshine, Yooka-Laylee — about engine feel a beginner mod
can't touch); tailing missions (no version of this pattern was praised anywhere in the batch, not even the "good"
video); the Pikmin franchise case study itself (excellent theory, too advanced to hand a kid as a spec).

## Mechanic cards
- **Waystone**: "Craft a totem that only teleports between totems you've placed and costs 3 diamonds — what stops
  it being free fast travel everywhere?" (eDSL6fNk758 [0:15:23])
- **Locked door**: "Design a structure you can see from day one but can't open until you've found/crafted one
  specific item — what's worth the wait?" (wM4WF4MnZCc [0:15:16])
- **Changing arena**: "A boss whose room floor cracks, floods or catches fire partway through the fight — how does
  the player adapt?" (Z47fljJVy6M [0:02:19])
- **Weather mob**: "A mob or potion that's stronger in the rain — what do you give up by relying on it?"
  (Z47fljJVy6M [0:05:36])
- **Quest spec**: "Who gives this quest, what do you actually do, and what changes in the world when it's done?"
  (yTJ_RjfhGVQ [0:01:48])
- **Escape run**: "A structure starts collapsing once you grab the loot — how much time, how obvious the warning?"
  (frN8aED45rU [0:12:35])
- **Two-timer day**: "A day-budget to finish the goal, plus get back before night each day or lose progress — what
  do you do differently on day 1 vs day 10?" (frN8aED45rU [0:20:49], Pikmin 1)

## Verdict line
**Strengthens, doesn't overturn, the "layer, not pillar" verdict.** This batch is unusually Minecraft-compatible —
waystones, lock-and-key structures, terrain-reactive mobs and stacked day/night timers are all real, scoped,
one-page-spec mechanics Gemini can plausibly build — so it hands the checklist several new concrete entries
(cost-gated fast travel, lock-and-key, terrain-reactive combat, the quest 3-part template, stacked timers). But
none of them require a systemic quest ENGINE, branching dialogue, or persistent world-state tracking beyond what
advancements/loot tables/trades already give for free — they're still one-off worksheets that sit on top of
character and structure design, not a new pillar of the course.
