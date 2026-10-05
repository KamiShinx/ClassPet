# Designing Narrative Choice - Add Branching Paths to Game Stories Without a AAA Budget (Design Doc, 10.6 min)

**What it is:** How games fake meaningful narrative choice cheaply, since fully branching stories multiply production cost, using techniques like short-lived choices, meter/points-based endings, and reusing the same content with different context.
**Substance:** substantive as a piece of production-design thinking, but it is fundamentally about the cost of BRANCHING DIALOGUE/STORY systems — exactly the category the GM brief already flags as hard for a NeoForge mod. Useful mainly as a "why we're not doing this" reference.

## Ideas, in the video's order
- [1:21] Illustrative example (Star Wars/Luke as RPG branch point) showing how one early narrative choice can silently double the required content (two entirely different games bundled into one).
- [3:02] Cheap technique 1 — short-lived choices: let the player pick something (who to hang out with), but rejoin the same main plot the next beat (Night in the Woods) — isolates the choice's cost.
- [3:36] Failure mode of the "keep branching" approach: Shadow the Hedgehog's many splitting paths cause replay fatigue (you re-slog old content to reach new content) — a caution more than a technique.
- [4:14] Cheap technique 2 — meter/points-based endings (KOTOR light/dark, Mass Effect paragon/renegade, Dishonored order/chaos): small choices accumulate toward a small number of distinct endings, so you only build N endings, not 2^N.
- [5:21] Named failure of the meter approach: the middle path is usually the worst-designed one (least content, weakest options), which ironically makes players pick an extreme and the game feel MORE linear despite having "choice."
- [6:23] Cheap technique 3 — reuse the same map/content with different context depending on an earlier choice (Tactics Ogre: same battle map, fought from opposite directions for opposite factions) — the one technique here that's really an ENVIRONMENT/level-reuse trick rather than a dialogue-writing trick.
- [9:02] Thesis: lower graphical fidelity (a small/indie-scoped game) makes branching cheaper to produce, which is why bigger budgets paradoxically make meaningful choice HARDER, not easier (generic but well-argued).

## What the frames add
Nothing; gameplay clips only, no diagrams.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- Nothing as a primary activity. At most, a single throwaway line in a "things we're not building" tooltip: "games fake branching stories by reusing the same map for different outcomes — we can do the reuse-the-structure trick, but not full branching dialogue."

### Survives the move to Minecraft?
Only technique 3 (reuse the same structure/content, swap context via a flag) has a real Minecraft-mod translation, and it's a stretch: build one structure (a village/outpost), and gate its mob spawns/loot table on a Minecraft advancement the player earned earlier (e.g., "occupied" version spawns hostile mobs and locked chests; "liberated" version spawns friendly villagers and open chests). This is buildable in NeoForge (structure + advancement-gated loot table/mob spawn swap) and is genuinely the kind of "narrative choice on a budget" trick the video describes, scaled down.

### Doesn't transfer
Everything else: branching dialogue trees, meter-based alignment systems with distinct endings, character-recruitment-based story unlocks (Chrono Cross). These all assume a dialogue/quest/ending system this course's tech stack does not have and isn't going to build. This is close to the clearest "kill it" video in the whole batch.

## Honest caveats
This video is arguably the strongest argument FOR the "layer, not pillar" verdict from the earlier game-design batch: even AAA studios with real budgets struggle to make branching narrative choice affordable, so an 11-13-year-old with 65 minutes a week and Gemini has no real path to it either. Worth citing directly if Ben asks "why can't we just let kids add dialogue choices."
