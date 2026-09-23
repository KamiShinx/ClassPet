# Super Mario Power-Ups Retrospective (1985-1992) (Design Doc, 25.0 min)

**What it is:** History of Mario power-ups from the original Super Mario Bros. through Super Mario Land 2 (1992), covering the classic-era trio (mushroom/flower/star) plus everything added in Mario 2, 3, World, and the Game Boy games.
**Substance:** substantive: traces specific dev decisions (with a cited Miyamoto rationale) behind each power-up, not just a list. Light sponsor read (GameMaker) at the start.

## Ideas, in the video's order
- [0:02:30] Core design decision, stated directly by the devs: start SMALL and gain power, not start powerful and lose it — losing an ability feels much worse than gaining one, so the game is built around ramping up, not ramping down.
- [0:03:31] The Super Mushroom doubles as your extra hit point AND your ability grant — losing health also means losing your toolkit, which is what keeps tension present even once you're powerful.
- [0:04:01] The upgrade chain is tiered on purpose: small → big (extra hit, breaks blocks) → fire (ranged attack, no extra hit) — each tier trades a different thing for a different thing, not just "bigger number."
- [0:04:34] The Starman sits OUTSIDE the upgrade chain entirely: short duration, total invincibility — it swaps "don't lose my power" tension for "use this window well" urgency, a different kind of pressure from the same genre.
- [0:09:56] Nintendo's own postmortem: the true Japanese Super Mario Bros. 2 (Lost Levels) was judged too hard and never released in the West — a direct example of a studio catching and correcting a difficulty miscalculation before shipping wider.
- [0:10:30] Mario 3's inventory system lets you bank a power-up across levels and lives instead of losing everything the moment you get hit — turns a single-use pickup into a resource you can plan around.
- [0:11:00] New power-ups in Mario 3 change HOW you play, not just how strong you are — Raccoon Mario adds a melee attack and flight, opening entirely new paths through old level layouts.
- [0:11:32] The devs deliberately limited their own strong new ability: flight requires a running start and a meter that takes time to fill, and the "no restrictions" version (P-Wing) was kept as a rare one-time item instead of the default. Explicitly cited as "a real design argument among the devs."
- [0:12:41] Rare power-ups are balanced by being situational rather than simply weak: the Hammer Suit can one-shot anything but is very rare (use it carefully); the Frog Suit is great underwater and bad everywhere else.
- [0:17:49] Super Mario World keeps your previous power-up "boxed" in reserve, so getting hit downgrades you but you can often recover it right away — softens the punishment without removing the consequence entirely.
- [0:20:37] Yoshi functions less like a power-up and more like a nested nested system: which color Koopa shell he eats determines a whole extra persistent ability while you're riding him — an example of one "item" actually being several stacked mechanics.
- [0:23:47] A power-up that got away from its own balancing: the Carrot in Super Mario Land 2 can be exploited by mashing the jump button to barely descend, letting you skip huge sections of levels — a cautionary example of a mechanic breaking under a play pattern the designers didn't fully account for.
- [0:24:00] Wario uses the Carrot and Fire Flower against the player in his boss fight — the power-up is treated as a shared object that exists "in the world," not only as a player-only HUD stat.

## What the frames add
Nothing beyond illustrating the specific game being discussed at each timestamp: gameplay clips from each Mario title in release order, a couple of talking-head developer-interview clips (unsubtitled, Japanese), and title/credits cards. No diagrams or comparison charts of the power-ups themselves.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Gain, don't lose" pitch check (10 min):** before designing a custom item, kids answer one question — does my mod take something away from the player, or add something? If it takes away, can I reframe it as the player starting without something and earning it? Straight from [0:02:30].
- **Power-Up Tier Card (20-25 min):** kids design a 2-3 step upgrade chain for one item/ability (e.g. wooden charm → iron charm → enchanted charm) and must state what changes at each tier besides "does more damage" — from the Mushroom→Flower tiering at [0:04:01].
- **"What's the honest cost of my flight/dash ability?" worksheet (15 min):** modeled on the Raccoon Mario meter debate at [0:11:32] — kids must pick a real limiter (needs a run-up, drains on use, only works for N seconds) for any movement-boosting item, rather than leaving it unlimited.

### Survives the move to Minecraft?
The tier-chain idea (small → big → fire) maps directly onto Minecraft item/armor upgrade paths, which NeoForge can absolutely do (check what the player is wearing/holding and grant an effect). The "start weak, earn power" framing fits a custom enchantment or a quest-gated item well. The "boxed reserve" idea (keep your previous item safe when you get hit) is buildable as an item that stores its previous state, though it's a bit more advanced. Yoshi-as-nested-system is the hardest of these to scope down — it's really a small system of its own (mount + swallow + persistent buff), good as a stretch/ambitious project for a strong kid, not a first item.

### Doesn't transfer
The literal level-design payoff (secret areas only reachable with a specific power-up) needs a hand-built world the kids likely won't have time to construct alongside their mod. The Game Boy hardware-compromise story (Super Mario Land shrinking the whole game down) is interesting franchise history but not a transferable design lesson.

## Honest caveats
The Carrot exploit example [0:23:47] is presented a bit gleefully as "the game breaking" rather than a design failure to avoid — worth reframing for kids as "here's what happens when you don't test extreme inputs," since that's the actual lesson. Everything under "For our class" is my extrapolation; the video never mentions Minecraft or mods.
