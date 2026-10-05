# What Makes A Hot Fire Level? (Design Doc, 18.0 min)

**What it is:** Essay on fire/heat as a level theme — as pure barrier, as a tool, as a light source, as safety, and as symbol — organized around one repeated umbrella rule: pick and choose which real-world properties of fire to keep and ignore the rest.
**Substance:** substantive — wide range of named examples (Mega Man, Mighty Switch Force, Fire Emblem, BOTW/TOTK, Mario Odyssey, Haiku the Robot, Star Fox 64, DKC Tropical Freeze) with a consistent design thesis running through them; one Brilliant.org sponsor read (~90s).

## Ideas, in the video's order
- [0:02:52] Core framing: fire levels are almost always "don't touch it" barriers by default — Character-vs-Nature conflict, danger communicated automatically.
- [0:03:27] Weakest/baseline version: Mega Man 11's Torch Man stage — inferno walls kill instantly, no interaction possible, only run. Cited as a floor, not a model to imitate.
- [0:04:00] Fire as the player's own TOOL, not obstacle: Mighty Switch Force 2's firehose — half the stage's puzzles come from "what else can extinguishing/heat do" (melt mud blocks, push enemies).
- [0:04:31] Fire as a soft, recurring-damage barrier (Fire Emblem's lava tiles) rather than a hard lock.
- [0:05:04] Fire changes what a player's ITEMS can do nearby (BOTW: wood weapons/arrows catch fire near Death Mountain, bomb arrows auto-explode) — item behavior as a design lever, not just player HP.
- [0:06:07] The umbrella design rule stated directly: pick and choose fire's real-world properties selectively (a fire-carrying item that doesn't burn up is "all upside, no downside" by design).
- [0:06:37] Fire as a puzzle OBJECT: BOTW's Blue Flame shrine — carry/transfer a flame across a level via torches/weapons while avoiding water, testing the player's internalized "rules of fire."
- [0:07:12] Fire as the sole light source in darkness (NSMB Wii underground stage) — killing an enemy also kills its light, turning enemies into a resource, not just a threat.
- [0:08:14] Fire/light as SAFETY, not danger — **Minecraft named explicitly** alongside Don't Starve/Terraria: torches ward off night spawns. Direct validation of vanilla Minecraft's own light mechanic.
- [0:08:47]-[0:09:19] Heat as a gauge/meter barrier with a heat-shield item as the key — flagged as often "forgettable" once the player has the immunity item, since the interaction stops there.
- [0:09:53]-[0:10:58] The stronger fix for that problem: heat changes what the player CAN DO instead of just blocking them (Mario Odyssey's capture-swap between lava-immune/non-immune forms; Haiku the Robot's overheat gauge maxes out in hot rooms, locking special moves) — heat as an ongoing constraint, not a pass/fail gate.
- [0:14:12] Fire as pure SYMBOL/narrative device, separate from mechanics — hellscape trope, or fire destroying a home/starting town to kick off a hero's journey (DKC Tropical Freeze's Bright Savannah turning to "Scorch and Torch" mid-game). Minimal mechanical demand, purely tonal.

## What the frames add
Sheets show a wide range of fire implementations confirming breadth (Mega Man Zero's magnetic-hazard map, Mighty Switch Force's hose puzzles, BOTW's Death Mountain, Mario Odyssey's broth-lava capture mechanic, Star Fox 64's Solar level, Tears of the Kingdom's cooled-magma platforming) but nothing not already named in narration — no unique diagrams, standard talking-over-gameplay format.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Fire does 3 jobs" worksheet**: barrier / tool / light-source — kid picks 1-2 jobs for their fire-or-heat mechanic, explicitly avoiding the "instant death wall" default (the video's own weakest example).
- **"Beyond the heat-shield" prompt**: reusing the Haiku/Odyssey lesson — don't just give an immunity item that turns the mechanic off; make heat change what the player CAN do while affected (a build-up meter, a temporary ability lock) so the interaction persists.
- **"Torch keeps me safe" tooltip**: reinforce vanilla Minecraft's own light-vs-mobs system as the class's fire/light reference point before kids invent something new from scratch.

### Survives the move to Minecraft?
Extremely well-matched batch entry: heat/fire as a gauge-based status effect (a custom "Overheat" effect capping ability use), fire-as-transferable-tool (a torch/wand item with pickup-carry logic), and a biome-specific fire hazard (a volcanic biome with lava-based mobs) are all directly buildable as NeoForge status effects, items, and biomes. Minecraft's fire/light system already is the base the video's "fire as safety" section describes — the class extends it, doesn't invent it.

### Doesn't transfer
The narrative/symbolic hellscape material ([0:14:12]) is tone, not mechanic — fine as flavor text for a kid's biome description but shouldn't anchor a worksheet. Mario Odyssey's capture-swap traversal (switching player bodies) is a separate player-control system, not buildable as a simple item/mob/effect.

## Honest caveats
The video repeats "pick and choose fire's properties, ignore the rest" as its central thesis across several examples spread from [0:04:31] to [0:09:19] — worth stating once as an umbrella rule to kids rather than as several separate bullets, which is how it's compressed above.
