# How Do Games Play With Poison? (Design Doc, 19.1 min)

**What it is:** A deep-dive on one specific status effect (poison) across mechanics, environment, and aesthetics, arguing it's the most flexible single effect in game design.
**Substance:** substantive — probably the most directly reusable video in the batch because poison maps almost 1:1 onto Minecraft's existing Poison effect, and the video's structure (mechanics -> environment -> aesthetic) is a ready-made lesson outline.

## Ideas, in the video's order
- [0:00:42] Poison is the single most common/adaptable status effect across genres because it works with minimal assumptions about the combat system (generic framing, but sets up everything else).
- [0:01:42] Basic model: poison-as-investment (pay a turn now, get damage later) — Slay the Spire's stacking poison (ticks down by 1/turn, so 20 stacks = a real burn window) is the clean version.
- [0:03:26] The most common failure mode: if the payoff is too small or the fight ends before it matters, players just skip poison and hit harder instead — a lot of Final Fantasy poison is "flat, small % of HP" and gets ignored.
- [0:04:32] Buildup/tiered poison (Monster Hunter): status doesn't land as binary hit/miss — it fills an invisible meter, and after each cure the monster needs a higher threshold next time, so poison stays viable but never trivializes a fight.
- [0:05:35] Poison can be inverted into a build-around resource instead of a punishment (Bug Fables' "Reverse Toxin" heals you while poisoned; "Weak Stomach" poisons you every time you heal; "Eternal Venom" makes poison never expire) — a whole glass-cannon playstyle built on staying poisoned on purpose.
- [0:06:40] Poison doesn't have to resolve when combat ends — it can tick down while walking around (Pokemon's overworld poison tick; Chrono Cross hides the ticking HP loss entirely from the player unless they check a menu).
- [0:07:45] Reframe poison as a "crisis" / soft timer rather than chip damage — Spelunky 2's scorpion poison drains a heart every 30s with very limited cures, forcing urgent decisions without literally being a countdown clock.
- [0:08:48] Poison doesn't have to touch HP at all — it can cap capability instead (Castlevania: Symphony of the Night's poison halves your damage and doubles damage taken, never kills you directly, but "opens you up" to everything else).
- [0:09:27] Poison as environmental area-denial (Super Mario 64's Hazy Maze Cave, Streets of Rage 4's acid pools you can kite enemies onto, Left 4 Dead 2 acid pools that combo badly with being pinned).
- [0:10:55] A single game can stack multiple poison "modes" at once for different purposes (Hades: player-applied Hangover as a set-and-forget DoT/synergy tool; enemy-applied Styx poison as a fast area-denial "final gauntlet" hazard with dedicated cure stations).
- [0:13:03] Poison as pure aesthetic/worldbuilding, independent of mechanics: whole biomes built on a poison/decay theme (Mario Odyssey's poison ocean, Sonic's industrial-pollution zones, Pokemon's entire Poison type roster, FromSoftware's signature poison-swamp areas in every game, Elden Ring's Scarlet Rot as a lore-carrying curse).

## What the frames add
The Monster Hunter "Aliment Effectiveness" bar-chart screen at 5:15 is an actual in-game diagram showing Initial Resistance / Next Threshold / Max Resistance / Buildup Degradation per monster — a genuinely useful reference image for explaining "buildup meter" status design to a visual learner. Otherwise standard gameplay b-roll confirming each named example is real (Hazy Maze Cave, Elden Ring Scarlet Rot, Bug Fables medals, Hades Styx pools).

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Poison, but why" worksheet (20 min)**: kid picks ONE of the video's five poison "modes" (investment DoT / capability cap / area hazard / build-around resource / pure aesthetic) and specs a Minecraft item or mob around it in one page. This is the single most concrete, teachable structure in the whole batch because it's already a menu of buildable options, not an abstract principle.
- **"Design a poison biome corner" tooltip**: 15-min worldbuilding exercise pairing with the aesthetic section — kid picks a poison/decay motif (industrial, swamp, fungal, cosmic) and describes one structure + one mob that fits it, feeding directly into the "worldbuilding" pillar of the course, not just mechanics.

### Survives the move to Minecraft?
Extremely well — better than any other video in this batch. Minecraft already ships Poison as a `MobEffect` with damage-over-time semantics, so "capability cap" (attack/mining-speed debuff instead of damage) and "build-around resource" (heal while poisoned, custom advancement for staying poisoned) are realistic one-file NeoForge additions. Area-denial poison pools are just a custom block with an AoE effect application on entity-inside tick — a very standard NeoForge pattern, good week-3-or-4 material. The Monster Hunter buildup-meter mechanic needs persistent per-entity data tracking (attachment capabilities in modern Forge/NeoForge) — flag as an advanced/optional add-on for kids who finish early, not baseline.

### Doesn't transfer
Chrono Cross's "hide the effect from the player entirely" trick is a legitimate design idea but risks feeling like a bug to an 11-13-year-old audience without careful framing — note as a caveat rather than a worksheet item. Nothing else in this video is a bad fit; unusually clean batch entry.

## Honest caveats
None of the claims are oversold — every example is backed by specific numbers or mechanics from a named game. The "invisible timer" framing (Spelunky poison) is the video's own interpretive spin rather than a stated dev intent, worth flagging as the video's own reading rather than confirmed developer commentary.
