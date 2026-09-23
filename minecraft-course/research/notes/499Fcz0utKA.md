# Crazy (but not too crazy) Game Weather (Design Doc, 21.4 min)

**What it is:** Essay touring what weather can do in games — realism/randomness, difficulty modifier, special event, systemic connective tissue, place-marker, narrative centerpiece, and escalation/tension tool.
**Substance:** substantive — 10+ well-cited examples spanning wildly different genres, careful to distinguish shallow uses from deep ones; two sponsor reads (Boot.dev, ~90s total, skippable).

## Ideas, in the video's order
- [0:02:20]-[0:03:55] Weather isn't bound by real physics in games — total design freedom. Simplest use: add randomness to an existing mechanic (golf games' wind/rain altering shot physics adds a risk/reward decision each shot).
- [0:04:30]-[0:06:04] Weather as an explicit difficulty modifier: Mega Man Zero 4's per-stage "Special" weather condition (flagged on stage select) adds hazards (wind pushback, vision block, electrical hazards) as an alternative to a numeric difficulty slider, tied to an unlockable reward for clearing the harder version.
- [0:06:42]-[0:08:22] Weather as special event/opportunity: Slime Rancher 2's weather has escalating intensity tiers, each unlocking rarer resources/creatures — turns bad weather into something the player wants, not just something to survive.
- [0:08:56]-[0:10:01] **The strongest idea in the video**: systemic weather (BOTW/TOTK's Chemistry system) — rain douses fire and muffles footsteps (a stealth buff), boosts lightning's area of effect, makes climbing slip and burn stamina, punishes carrying metal. One weather state touches many existing subsystems at once "without having to explain it all."
- [0:10:31] Climate-as-place-marker: Hyrule's ~90 regions each get climate variables (day/night temp, weather-appearance rate, sky color) purely to give areas a distinct identity, independent of any gameplay hook — the weakest/most generic idea in the video ("give areas a distinct vibe").
- [0:11:03]-[0:13:08] Peak combines both: each biome gets 1-2 EXCLUSIVE weather hazards tailored to that biome's specific traversal geometry (slippery rain in a biome with exposed walkways, sideways gales in the same, freezing wind in the Alpines, heat+tornado in the Mesa) — explicit "hazard matches the biome's specific geometry" principle.
- [0:13:40]-[0:15:11] Weather as narrative/mood centerpiece with zero dialogue needed: Rain World's crushing rain cycle is a diegetic countdown forcing shelter-seeking; FFXIV ties a broken permanent-daylight weather state directly to the plot, resolving visibly as the story resolves.
- [0:17:16]-[0:19:57] Weather as escalation/tension curve: Pacific Drive's normal weather (rain/fog slow you, felt through tactile manual car controls) escalates into named "Squall" anomaly events that actively hunt the player — severity as a difficulty dial across a whole playthrough.

## What the frames add
Two sheets ([0:04:30]-[0:08:00] and [0:11:00]-[0:16:00]) show a genuinely wide range of weather UIs and implementations back to back — MMZ4's weather-select menu, Slime Rancher's in-game "Weather: Cyclone" info card, Zelda's slippery-climb rain, Peak's per-biome hazards, Pacific Drive's dashboard/wipers — confirming the BOTW systemic section is both the visual and conceptual high point (several subsystem interactions shown in one clip). No original diagrams beyond in-game UI captures.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"One weather, three systems" worksheet**: for a new weather type, kid must name 3 different things it changes (mobility, a status effect, an existing mob behavior) — direct lift from the BOTW chemistry-system idea, and very Minecraft-native since vanilla rain already extinguishes fire and thunder already charges creepers.
- **"Weather matches my biome" prompt**: reusing Peak's principle — design one hazard that specifically interacts with THIS biome's terrain/structures, not a generic reskin.
- **"Weather as reward, not just danger" prompt** (Slime Rancher): what rare drop/mob/resource only appears during this weather?

### Survives the move to Minecraft?
The best mechanics-bending idea in the batch: Minecraft already ships a working weather system (rain, thunder) with real hooks NeoForge can extend directly — a new weather-triggered status effect, a biome-specific storm, or a rare mob/loot tied to a weather state are all concretely buildable as items/mobs/status effects/biome rules.

### Doesn't transfer
Pacific Drive's tactile per-part car UI (manual headlight/wiper toggles) is a whole separate vehicle-sim system, not relevant here. FFXIV's plot-bound weather needs a scripted main-quest structure the course doesn't have.

## Honest caveats
No filler beyond the two sponsor reads. The "climate as place marker" idea ([0:10:31]) is close to generic advice ("give areas a distinct vibe") — flagged above as the weakest bullet, worth deprioritizing versus the systemic-hazard ideas when building a worksheet.
