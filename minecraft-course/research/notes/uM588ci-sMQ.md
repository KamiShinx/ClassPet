# The Evolution of Roguelike Design (Design Doc, 12.4 min)

**What it is:** Explains the 2008 "Berlin Interpretation" 8-point checklist for roguelikes, then walks through swapping one element at a time (turn-based -> real-time, dungeon -> ship encounters, permadeath -> partial retention, hack-and-slash -> tactics/cards) to show how Necrodancer, FTL, Dead Cells, Into the Breach, and Slay the Spire were each born from one deliberate tweak.
**Substance:** substantive: tightly structured, one clear framework applied consistently, almost no filler (no sponsor read in this one).

## Ideas, in the video's order
- [0:01:50]-[0:03:27] The Berlin Interpretation: 8 must-haves for a "pure" roguelike - random dungeon generation, permadeath, turn-based, non-modal (all abilities available from the start, no unlock-gated modes), emergent rule interactions, limited resources, hack-and-slash combat, mystery/unidentified items.
- [0:05:06] Central design method of the video: treat the 8 elements as a "mosaic," not a monolith - swap ONE wedge at a time and see what game falls out. This is the one clearly reusable idea in the video.
- [0:05:38] Low-value swap example: replace ASCII graphics with sprites (Dungeon Crawl Stone Soup) - same mechanics, easier to read.
- [0:06:10] Swap turn-based -> real-time: Binding of Isaac / Enter the Gungeon.
- [0:06:40] Swap turns -> musical beats, and note the compensating change: Crypt of the Necrodancer had to lower base difficulty because players have less time to plan.
- [0:08:13] Swap room-dungeon -> branching encounter map, keep real-time: FTL.
- [0:08:46] Soften permadeath -> keep a fragment of progress between runs, tied narratively to the loss: Dead Cells, Rogue Legacy.
- [0:09:18] "You won't feel like you wasted your time if you die by accident" - the design reasoning behind partial-permadeath (generic but well-argued).
- [0:09:48] Swap hack-and-slash -> tactics: Into the Breach (shows enemy intent every turn, so it "feels solvable").
- [0:10:18] Swap combat -> card hand-management: Slay the Spire.

## What the frames add
One real diagram: at [0:03:30] an 8-slice pie-wheel titled "Berlin Interpretation of Roguelikes," each slice a small icon (heart, skull, lock, sword, flask, dice, chicken, clock). It's shown again around [0:06:15]-[0:06:45] highlighting which wedge is being swapped for the "real-time combat" section. This wheel is genuinely worth copying as a worksheet layout (see below). The rest of the frames are pure gameplay footage of each named game - illustrative, not additive.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Spin the wheel" dungeon worksheet**: give kids an 8-slice wheel (reuse the video's visual, reworded for Minecraft: e.g. "random layout," "you lose things on death," "wait-your-turn vs real-time," "everything unlocked from the start," "rules interact (fire+wood, water+lava)," "limited resource," "melee-focused," "unidentified item effects"). Kids circle ONE wedge and write one sentence on how they'd change it for a Minecraft structure/dimension they design (e.g. "unidentified items -> potions in my dimension look identical until drunk once"). 20-25 min, one page, comes from [0:05:06] onward.
- **Compensate-for-the-swap prompt**: after picking a swap, ask "what do you have to make easier elsewhere to keep it fair?" - modeled directly on the Necrodancer difficulty-lowering example [0:06:40]-[0:07:11]. Good habit-forming question, teaches trade-off thinking in one line.

### Survives the move to Minecraft?
The wheel-worksheet survives as a spec-writing exercise fine - it's just a design-prompt page. But actually BUILDING even a modest version (regenerating structure layout, a resource that's scarce across a "run," partial-death penalty) is a real NeoForge feature: custom structure/loot-table generation, or a boss room with reset logic. That's buildable in principle (loot tables + structure blocks are things NeoForge/datapacks already support) but is a multi-session build, not a single week's homework. Realistic scope: pick ONE wedge, not the whole wheel, and pick a wedge Minecraft already half-supports (e.g. "unidentified items" -> potions with disguised effects, already a vanilla mechanic Gemini could extend).

### Doesn't transfer
- The historical trivia (Rogue's 1980 Unix origins, who's at the round-table panel discussion at [0:01:15]) is scene-setting, not usable.
- Most of the named games (FTL's ship-encounter abstraction, Into the Breach's full tactics-grid) assume systems (multi-unit tactics AI, procedural ship layouts) way past a NeoForge mod's item/mob/block scope for this class.

## Honest caveats
This is the batch's strongest video for our purposes, but "strongest" here is relative to a genuinely low-relevance batch - the one durable takeaway is a spec-writing frame (pick one system, swap one rule, ask what needs rebalancing), not new Minecraft mechanics content. It reinforces, rather than adds to, ideas already logged from Batch I (MDA, risk/reward): "swap one wedge, note the compensation" is really risk/reward's trade-off logic wearing a roguelike costume. Treat it as a second data point for a checklist we already have, not a new pillar.
