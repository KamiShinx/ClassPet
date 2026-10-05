# How To Make Great Game Rivals - Pokemon and Devil May Cry (Design Doc, 11.8 min)

**What it is:** A three-part framework for what makes a rival character (as opposed to a generic boss) memorable: premise (contrast with the player), conflict (does the fight itself feel distinct), and persistence (do they keep showing up and staying roughly one step ahead).
**Substance:** substantive: tight framework, two well-matched case studies (a good version and a broken version of the same character type), and the most directly Minecraft-mechanic-relevant video in the batch alongside the stealing one.

## Ideas, in the video's order
- [0:38] Three factors for a good rival: premise (who they are relative to you), conflict (does the fight stand out mechanically and feel earned), persistence (do they recur and stay competitive with your progress). A good boss fight needs only one or two; a great RIVAL needs all three.
- [2:15] Pokemon rival fights are NOT mechanically distinct from regular trainer fights — same rules, just a harder team. Persistence carries the whole rivalry: Blue fights the player up to 8 times across the game, always slightly ahead, converging to a final title match.
- [3:53] Gen 6's four rivals fail because they're one-dimensional and lack persistence/buildup — the game just tells you they're rivals instead of earning it (a clean negative example of the same framework).
- [4:54] DMC3's Vergil: literal mirror-build boss (same moveset family as the player, but not a 1:1 copy — has his own variants), fought 3 times across the game in an escalating arc (lose → stalemate → win), each fight forcing the player to be more mechanically flexible than before.
- [7:07] Design detail: Vergil punishes single-strategy play (spam one move and he counters it), which conditions the player to adapt within the fight itself, not just across fights.
- [8:10] DmC (2013) reboot's Vergil is the counter-example: he's written as an ally/ops-leader for almost the whole game and only "turns" in the last few minutes with no build-up — conflict and persistence are both skipped, so the rivalry (premise alone) doesn't land even though the character contrast is still there.

## What the frames add
Nothing beyond gameplay clips of the fights described; no diagrams.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Design your rival mob" worksheet (25-30 min)**: three boxes matching the video's framework — (1) how does it look/act different from you but related, (2) what does it fight WITH (does it use your own tools/enchantments back at you?), (3) how many times and how does it come back stronger. Directly usable, and it's the clearest 1:1 mapping of any idea in this batch onto the "does this mob ask the player something different?" checklist the earlier game-design batch already established.
- **Mechanic card**: "A rival mob that copies whatever weapon/enchantment you're currently using and gets a little stronger each time you beat it, and shows up again a few in-game days later" [2:15]+[4:54]. Buildable: NeoForge custom mob that reads the player's held item/enchant on spawn, a persistent NBT counter for "times defeated," and an event-triggered respawn (e.g., on a day-count or advancement trigger).

### Survives the move to Minecraft?
This is the strongest translation in the batch. "Persistence" (recurring, scaling encounters) is squarely a mob-behavior + event-trigger task Gemini can build. "Conflict" (fight forces you out of one strategy) maps to giving the rival mob an attack or resistance that punishes a single tactic (e.g., it dodges/reflects if you only ever hit it with the same weapon type) — buildable, though needs a fairly precise spec from the kid or Gemini will build something generic.

### Doesn't transfer
"Premise" (personal backstory/contrast) is a worldbuilding/character-design task, not code — fine, that's covered elsewhere; just don't expect it to become a mechanic. The multi-act narrative escalation (DMC3's 3 acts each with a different story beat) is more structure than an 11-13-year-old needs to plan; "it comes back stronger a few times" is enough.

## Honest caveats
None of the video's claims are dubious. The one thing to flag for Ben: the framework is explicitly presented as "3 factors, use 1-2 for an ordinary boss, all 3 for a great rival" — worth keeping that framing when this gets folded together with the batch's existing boss-design checklists (P1/P2 batches), since "rival" here is really "a boss with persistence added," not a separate category.
