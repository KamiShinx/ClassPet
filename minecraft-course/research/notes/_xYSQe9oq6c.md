# Roguelikes Are Getting Weird (Design Doc, 27.6 min)

**What it is:** A tour of ~12 recent roguelike/roguelite games (BAZR, Splatoon 3: Side Order, Going Under, Peglin, Tape to Tape, Haste, Drop Duchy, Balatro-likes, Blue Prince) showing how far the genre has stretched past its 1980 Rogue origin.
**Substance:** mixed: it's a well-argued genre essay, not padding, but it's a game-critic's listicle of existing commercial games, not a design-lesson video. Two sponsor reads eat ~3 min.

## Ideas, in the video's order
- [0:03:24] The "Berlin Interpretation" - 8-point 2008 checklist purists use to define a "pure" roguelike (random dungeons, permadeath, turn-based, non-modal, emergent rules, limited resources, hack-and-slash, mystery items). Presented mainly to then argue it's too rigid.
- [0:08:12]-[0:08:44] Core thesis: a roguelike can be "as simple as an extra set of rules on top of an existing structure" - BAZR bolts scarce/random resource cards onto vanilla Mario 64 and that alone creates roguelike tension.
- [0:11:28] Setting doesn't have to be a dungeon - Going Under reskins the dungeon-crawl as an office basement with corporate-satire enemies and items.
- [0:14:10]-[0:15:47] Peglin: the whole game (combat AND navigation) runs through one mechanic (ball-bounce physics), which is why it stays legible despite randomness. (generic "focus on one interaction" point, echoes ideas we've already logged from other videos)
- [0:20:04] "Roguelike is just some structure over intuitive, emergent mechanics" - genre is a structural label, not a look or setting.
- [0:22:46]-[0:26:32] Blue Prince: procedurally-drafted rooms + mystery-solving; presenter explicitly says the room-drafting template could be reused for other settings (mall, palace, office).

## What the frames add
Pure gameplay footage of each game named (Going Under's dungeon-basement, Peglin's peg boards, Blue Prince's room map) - useful for seeing what each game looks like, but nothing beyond what the narration already describes. No diagrams, no design breakdowns on screen. Two sponsor cards (Boot.dev, generic) waste frame budget.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Rules bolted on" worksheet**: pick one existing Minecraft system (a biome, a structure) and write down ONE extra scarcity rule that would make it feel run-based (e.g., "every time you enter this cave, one random ore type is disabled until you leave"). ~20 min. Comes from the BAZR idea [0:08:44]. This is the one idea in the video concrete enough to hand a kid.

### Survives the move to Minecraft?
A full "roguelike dungeon" (regenerating room layout, permadeath, meta-progression between runs) is a real NeoForge/mod undertaking - custom dimension or structure generation, save-state tracking across "runs." That is far beyond a one-page spec for an 11-13-year-old in a 65 min/week slot; it's the kind of thing that needs its own multi-week arc, not a single worksheet. The scaled-down version that survives is a single mechanic tweak (see above), not the genre.

### Doesn't transfer
- Genre-taxonomy debate (Berlin Interpretation, roguelike vs roguelite labels) - trivia, not a design tool.
- Nearly all the specific games described (Blue Prince's mystery-house, Drop Duchy's Tetris-deckbuilder hybrid, Tape to Tape's hockey sim) are full commercial products; interesting but not a source of one-page mod specs.

## Honest caveats
This video is descriptive film criticism of the roguelike genre's recent history, not instructional design content - it never tells you HOW to build any of this, only what other people built. The one line that transfers (bolt scarcity rules onto an existing structure) is a single sentence in a 27-minute video; everything else is genre trivia. Doesn't transfer well to a Minecraft mod class; the runner-based/procedural-dungeon idea is more thoroughly and usefully covered in the companion video "The Evolution of Roguelike Design" (uM588ci-sMQ) in this same batch.
