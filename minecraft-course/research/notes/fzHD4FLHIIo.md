# How Can You Spice Up A Healing System? (Design Doc, 23.9 min)

**What it is:** Survey of healing/recovery mechanics across action games, JRPGs, tactics games, roguelikes and shooters, organized around one question: what does the player give up to heal?
**Substance:** substantive: consistently returns to the same design question across every example and includes at least one honest critique of a beloved game (Zelda BOTW/TOTK). Sponsor read (Boot.dev) is short and separated at the top.

## Ideas, in the video's order
- [0:00:42] Central design question stated directly: if healing erases the consequences of combat too easily, does combat have real stakes? What is the player willing to give up in exchange for healing?
- [0:02:26] Kingdom Hearts 1→2 case study: unlimited/cheap Cure made KH1 trivial once unlocked; KH2 fixed it by making Cure cost the player's ENTIRE MP bar rather than a flat amount — cost that scales with what you have, not a fixed number, as the fix, and it made attack spells more appealing as a side effect.
- [0:04:40] Named critique of a beloved game: Zelda BOTW/TOTK's cooking system lets players stack unlimited full-heal meals with no real cost, which the video says "dramatically alters how combat feels," even while agreeing the games are fun for other reasons — an honest, not-fawning example.
- [0:06:42] Advance Wars ties a unit's combat power directly to its remaining HP, so partial damage is meaningfully worse than a full health bar, not just a countdown to zero — health affects gameplay beyond just "am I dead yet."
- [0:07:17] Merge-to-heal in Advance Wars: healing consumes another unit entirely (they're gone, can't be split back out) — the cost is permanent and structural, not just a resource number.
- [0:08:58] Sacrifice-based healing (Othercide): higher-level characters are sacrificed to heal and upgrade survivors, which discourages players from getting too attached to any one unit — the cost is emotional/strategic investment, not HP or gold.
- [0:09:31] Animation-lock healing (Hollow Knight's Focus, Dark Souls' Estus, Monster Hunter potions): the cost is TIME and vulnerability, not resource — commit to a window, get hit mid-cast, and you take damage AND waste the item without healing.
- [0:11:42] The same animation-lock idea is shown as a tunable dial, not a binary: later Monster Hunter games let you move or roll out of a heal partway through, relaxing the punishment without removing it.
- [0:12:46] Named overcorrection/failure: Metroid Other M ties healing to a physical Wii-remote gesture — called out as "a step too far," breaking flow for a hardware/format reason rather than a balance reason.
- [0:13:53] "Ironic healing": tie the reward for healing to AGGRESSIVE play instead of defensive play (DOOM's Glory Kills, Ultrakill's blood pickups) — reverses the natural instinct to hang back when low on health, actively pushing players toward the intended fantasy.
- [0:15:55] F-Zero puts health and the speed-boost resource on the SAME bar, forcing a constant trade between offense (boosting) and survival, with healing itself scarce (a few pads per track).
- [0:17:30] "Red health" in tag-team fighters (Marvel vs. Capcom, DBFZ, Skullgirls): recent damage is recoverable only if you bench that character, and any unrecovered red health is lost the instant you tag back in — the cost is tied to time and opportunity, not a resource spend.
- [0:18:36] FTL: repairing your ship competes directly against other permanent upgrades for the same currency, so the cost of healing is explicitly framed as "what you didn't get instead."
- [0:21:48] Team Fortress 2's Medic: healing is risky to the HEALER, not the healed — the beam is visibly attached to whoever's healing, painting a target on them and making the act of healing a tactical liability worth exploiting.
- [0:23:26] Closing thesis (generic but useful): healing happens during a game's highest-stakes moments, so it's some of the highest-leverage design space in the game — worth deliberately spicing up rather than defaulting to "add HP back."

## What the frames add
Nothing beyond illustrating each example: gameplay clips from each specific title as it's named, a couple of code-editor/website screenshots during the Boot.dev sponsor segment, and title/credits cards. No comparison chart of the healing systems.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **Healing Cost Menu (20-25 min):** the single best worksheet in this batch. Kids pick their healing item's cost from a short named menu drawn straight from the video: takes time to use (animation lock), costs more the more you have to lose (scaling cost), consumes something else permanently (sacrifice/merge), or rewards aggression instead of retreat (ironic healing). Forces a specific, buildable spec instead of "it heals 4 hearts."
- **"What am I giving up instead?" card (10 min):** modeled on FTL's opportunity-cost framing [0:18:36] — if a kid's item heals, what does picking it mean they did NOT get this turn/this craft?
- **Risky-to-who? check (10 min):** using the TF2 Medic idea [0:21:48], kids decide: is my item risky to the person using it, or does using it put someone else (a teammate, or the user by revealing their position) at risk?

### Survives the move to Minecraft?
Very buildable. Animation-lock healing already exists as a Minecraft mechanic (eating/drinking takes time and you can be interrupted) — a custom healing item that takes N ticks to use and cancels if hit is a natural, well-scoped NeoForge build. Cost-scales-with-what-you-have (spend your whole mana/hunger bar, not a flat number) is a straightforward conditional. Ironic healing (heal on landing a hit, not on defense) is easy: trigger the heal off an attack-dealt event instead of an item-use event, which is arguably simpler to build than a normal potion. The TF2 "healing paints a target on you" idea needs a particle/visual effect plus mobs that can react to it — doable but more advanced, better as a stretch goal.

### Doesn't transfer
Permanent unit-sacrifice healing (Othercide, Advance Wars merge) doesn't fit a game built around one persistent player character rather than a squad — could work only if a kid's mod adds tamed companion mobs. Motion-control gestures obviously don't apply on a Windows laptop. Tag-team "red health" needs a two-character swap system Minecraft doesn't have.

## Honest caveats
The critique of BOTW/TOTK's cooking system [0:04:40] is presented as a clear flaw; that's a legitimate design point but is also just one video's opinion about a game most kids in the class will love, so it's worth presenting to them as "here's a tradeoff the developers made," not "Zelda got this wrong." Everything under "For our class" is my extrapolation — the video never mentions Minecraft.
