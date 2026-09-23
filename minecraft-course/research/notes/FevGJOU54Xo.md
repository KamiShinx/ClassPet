# Games That Make Stealing Fun (Design Doc, 25.4 min)

**What it is:** A survey of stealing mechanics across genres — Open World (Skyrim/Fallout), CRPG (Baldur's Gate 3, Divinity: Original Sin 2), JRPG (Final Fantasy IX/Dragon Quest steal commands), Action (Sly Cooper, GTA), multiplayer PvP (Mario Party, Dokapon Kingdom), and Hitman's disguise-as-theft system.
**Substance:** substantive: the longest and mechanically densest video in the batch — organized explicitly around SYSTEMS (detection, risk/reward, economy limits, RNG loot tables), not narrative, and lines up almost perfectly with this batch's "a thief mob" prompt.

## Ideas, in the video's order
- [3:02] Two independent flavors of stealing exist in Open World games: pickpocketing (from people, gated by their awareness + your skill) and burglary (from the environment, gated mostly by being seen). Splitting these into two systems, not one, is itself a useful design move.
- [4:07] Detection is usually simplified to a hard yes/no ("are you seen right now") rather than true line-of-sight simulation, because true visibility is hard to judge on screen — a pragmatic simplification, not a compromise (generic-ish, but a real engineering lesson).
- [5:14] Consequence systems for getting caught, layered together rather than any one being sufficient alone: NPCs turn hostile, a hidden "karma"-style score tracks it even unseen (Fallout: New Vegas), guards can arrest/fine you (Bethesda games).
- [6:18] Economy-limiting mechanisms so stealing doesn't break the game's money balance: shops have limited gold to buy stolen goods, weight/encumbrance caps how much you can carry, and skill level gates what tier of item you're even ALLOWED to steal (Skyrim blocks equipped/weapon items until skill is high).
- [8:22] CRPG-style stealing (Baldur's Gate 3) reframes the same actions as a planned, multi-step team heist: distract with one character, go invisible with another, get advantage before the attempt — the fun comes from PLANNING, not real-time reflexes.
- [9:58] Divinity: Original Sin 2 caps each NPC to being pickpocketed exactly ONCE ever, plus weight/value/skill limits — shown as a case of a powerful economic tool needing hard restrictions to avoid breaking the game.
- [11:06] JRPG-style "steal" as a dedicated battle action with RNG: separate loot table from normal kill-drops, percent chance per item, better items = lower odds (Final Fantasy IX). Explicitly named design trap: Dragon Quest's steal rates are bad AND the rewards are usually worthless duplicates of normal drops — "a mechanic with no real upside isn't worth using," a clean, quotable negative lesson.
- [15:44] Action-game stealing (Sly Cooper) shows a thievery FANTASY can be sold almost entirely through presentation/animation/sound rather than deep mechanics — pickpocketing itself is trivial, but framing missions as heists with prep-work makes each feel purposeful.
- [19:29] Multiplayer stealing changes the dynamic entirely — Mario Party's Snowflake Lake board has no other way to gain stars except taking them from other players, forcing real negotiation/retaliation between actual people (not applicable to single-player Minecraft, but the "zero-sum resource forces social dynamics" idea is portable).
- [22:08] Hitman's disguise system: "stealing" an identity grants both physical access (new areas) and behavioral cover (NPCs treat you differently), and each new disguise unlocks paths to yet more disguises — theft as a branching access-tree, not just an inventory transaction.

## What the frames add
Nothing beyond the games shown as gameplay b-roll; no diagrams (confirmed the channel's usual format holds across the full 25 minutes).

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Design your thief mob" worksheet (25-30 min)**: what does it take (an item from your hotbar/inventory), what's the tell before/during (does it sneak up, or is it obvious once triggered), what do you have to do to get it back (chase it down, kill it, find its nest)? Directly usable, maps to this batch's named "thief mob" prompt.
- **Mechanic card, pickpocket chest/mob**: right-click interaction with a percent success chance, gated by something the player controls (sneaking, light level, or a tool), from [3:02]/[6:18].

### Survives the move to Minecraft?
The BEST-fitting video in the entire batch for "character meets mechanics." Multiple pieces are directly buildable in NeoForge:
- A thief mob that steals an item from the player's inventory on hit/proximity and flees, chaseable to get it back — custom mob AI + inventory manipulation.
- A pickpocket/steal interaction on a mob or structure with a percent-chance outcome, gated by sneaking or a tool, with a real chance of failure triggering aggro — item-interaction + probability + mob-state change.
- The Dragon Quest lesson translates directly into a design rule for kids: if you build a steal mechanic, the reward table must be worth the risk, or nobody will use it.
The Hitman disguise-as-access-tree idea is a stretch goal (a wearable item that changes how certain mobs react to the player) — buildable in principle but needs a much tighter spec than an 11-13-year-old will likely produce alone.

### Doesn't transfer
Multiplayer social dynamics (Mario Party/Dokapon's PvP stealing) don't apply — the class's mods are single-player mob/item/block features, not multiplayer economy design. Full branching-disguise mission design (Hitman's "murder diorama" levels) is too large in scope for one mod feature.

## Honest caveats
None of the video's factual claims raised concerns. This is the strongest single video in the batch for mechanics — worth flagging to Ben as the one he should point a kid at directly if they want to build a thief mob, rather than making them sit through the whole batch.
