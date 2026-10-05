# What Makes A Good Spooky Stage? (Design Doc, 22.1 min)

**What it is:** Essay on "spooky" (scary + cozy, a tonal break) level design — aesthetic commitment, mechanic-matched darkness, tone flexibility, soft world-gating, contrast, power-removal, and a named case study in HOW to fail at tension.
**Substance:** substantive — widest range of examples in the batch (10+ games across genres), includes both positive design lessons and one explicit, well-argued negative case study; one Factor sponsor read (~90s).

## Ideas, in the video's order
- [0:02:23] Defines "spooky" as distinct from "scary": one part scary + one part cozy ("dangerous cozy"). A spooky LEVEL is usually a tonal break inside a non-horror game, not the whole game being horror.
- [0:02:53] Cheap/pure-aesthetic version (TF2's Halloween reskins) is fine, but "go all out" if going shallow — Banjo-Kazooie's Mad Monster Mansion stacks nearly every haunted-house trope at once rather than doing 1-2 halfheartedly. Commit fully or keep it purely cosmetic; don't half-commit.
- [0:04:00]-[0:04:31] Tone is flexible within "spooky" — parody/comedy (Pizza Tower's FNAF homage) or kid-friendly festivity (Costume Quest) work as well as dread, widening what's achievable without real horror craft.
- [0:05:33]-[0:08:16] Mechanic-matched spooky: darkness as the core gimmick (Shovel Knight's Lich Yard) — total-blackout navigation combined with sinking platforms, escalating gradually but with periodic lit "safe" rooms so tension doesn't tip into frustration. Explicitly a deliberate pacing choice, not an accident.
- [0:08:47]-[0:09:52] Spooky reskins pair well with a genre/structure shift (Mario's Ghost House archetype: hidden exits, P-switch secret doors, backwards-tricking layout) — the theme becomes an excuse to try a different level-logic (explore/backtrack puzzle) inside an otherwise-platforming game.
- [0:09:52] Practical, non-aesthetic use: spooky tropes solve open-world sequencing problems (Wind Waker's Ghost Ship needs a specific item to board, softly gating a late Triforce Quest area without a hard, arbitrary-feeling lock-and-key).
- [0:11:33]-[0:13:43] Hard tonal contrast as a design tool: Outer Wilds' Dark Bramble (foggy non-Euclidean maze, the game's only hostile creature, stealth-via-silence) works specifically because it's the one place that breaks the game's established friendly rules.
- [0:14:16]-[0:16:50] Spooky-as-psychological-horror via REMOVING player power: RE Village's Dollhouse sequence strips weapons and shifts pacing to quiet puzzle-solving — "take something away" as the reusable spooky-switch mechanism.
- [0:16:50]-[0:18:58] Explicit, named failure case: MGS3's "The Fear" boss undercuts its own spookiness by monologuing its own name, telegraphing every attack with an obvious sound cue, and handing the player overpowered counters (thermal goggles reveal traps; poison can be force-fed back). Rated literally "0/10 spooky" by the source — a concrete, memorable case study in how to fail at tension.
- [0:18:58] Arkham Asylum's Scarecrow sequences: level geometry itself morphs (looping hallways, a fake crash/reboot) tied to a character's psychological backstory — environmental storytelling via transformation, echoing the RPG-town video's environmental-storytelling bullet.

## What the frames add
The Lich Yard darkness sequence and the RE Village Dollhouse sequence are visually confirmed as near-total blackouts with carefully rationed light sources, matching the pacing description in the transcript. Otherwise standard gameplay clips across a wide range of games (Banjo-Kazooie, Mario Ghost Houses, Wind Waker, Outer Wilds, RE Village, MGS3, Arkham Asylum) confirming breadth but adding no unique diagrams; one sheet ([0:21:15]) shows a Design Doc self-plug article thumbnail, not useful content.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Go all-in or stay light" rule**: a spooky biome/structure either commits to many small trope details or stays purely cosmetic — don't half-commit, from [0:02:53].
- **"Take one thing away" prompt**: direct lift from RE Village's Dollhouse — design a mini-structure where the kid's usual item/weapon is temporarily disabled, forcing a different play style, as the spooky switch.
- **"Soft gate, not a locked door" worksheet**: use a mysterious structure (fog, a guard mob) to softly delay access to a late-game area instead of a hard key-item lock — direct lift from Wind Waker's Ghost Ship.
- **"Don't be The Fear" checklist**: for any scary mob, check it doesn't monologue its own attack, doesn't telegraph with an obvious sound cue before every move, and doesn't hand the player a trivial counter — concrete and funny, straight from the source's own named failure case.

### Survives the move to Minecraft?
Darkness-as-gimmick maps directly onto a dark dimension/structure with a light-management mechanic, close to vanilla cave mechanics already. A spooky biome with escalating trope density is pure build/decoration work within Blockbench+placement skill. A mob that "takes something away" (temporarily disables an item on hit) is a real, buildable NeoForge item/status-effect interaction. The soft-gate idea (a mob or fog guarding a structure until a condition) is directly buildable as a structure spawn condition.

### Doesn't transfer
Arkham Asylum's real-time level-geometry morphing (rooms reconfiguring, fake crash/reboot) needs scripted sequence/cutscene systems well beyond kid-buildable scope. MGS3's stealth-detection-by-sound system is a full AI subsystem — out of reach, though "the mob reacts to nearby noise" could work as a much simplified version if a kid really wants it.

## Honest caveats
The MGS3 "Fear" section is explicitly a negative case study (the source itself rates it 0/10) — flag it plainly to kids as a real, named example of a scary mob that failed, which lands more concretely than another positive checklist bullet.
