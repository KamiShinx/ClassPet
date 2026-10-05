# How Do Games Design Around No Damage? (Design Doc, 21.2 min)

**What it is:** Survey of invincibility/no-damage design: why it's dangerous to a game's tension, the specific
jobs it can do (power fantasy, accessibility, tension-release, i-frames, tank-class ability, theme), and games
that redefine "failure" entirely once death is off the table.
**Substance:** substantive. Similar density and structure to the difficulty-options video (same channel, same
house style) — many distinct named cases, a real taxonomy, minimal padding beyond the War Thunder sponsor read.

## Ideas, in the video's order
- [0:02:24] Core warning: invincibility removes risk, and most games are built on risk/reward tension — turning it
  on without redesigning around it makes the game feel empty (the Game Genie cheat-code framing).
- [0:04:00] **Job 1 — Power fantasy / victory lap**: Metroid Dread's post-final-boss escape sequence gives you
  temporary true invincibility as a reward, kept short (~5 min) so it doesn't get boring.
- [0:05:07] **Job 2 — Accessibility**: an optional "can't be defeated" mode for story-focused or family/co-op
  games, letting players who don't want the mechanical challenge still finish the game (generic but concretely
  scoped: keep an on-screen marker that easy mode is active).
- [0:05:38] **Job 3 — Tension release/catharsis, not a free pass**: Pac-Man's power pellets are brief (and shrink
  each round), so the safety is a release valve, not a cancellation of danger. Pac-Man CE DX escalates this into a
  full scoring subsystem (chain up the "ghost train" before cashing in a pellet).
- [0:07:45] Invincibility as a build-around perk: Balatro's Mr. Bones joker sacrifices itself to save a losing run
  — invincibility as a consumable safety net tied to a resource cost (a joker slot).
- [0:08:17] **I-frames**: a short invulnerability window after taking a hit, so you can't be juggled to zero before
  reacting. Nearly universal — its absence (Sonic 1's "Spike Bug," knockback onto more spikes = instant death) is
  usually read as a bug, not a design choice.
- [0:10:24] I-frames as a **player-granted dodge tool**: Soulslikes' roll frees up enemy attack design to be big and
  dramatic, because the player has a reliable "get out of the blast" option, not just positioning.
- [0:11:27] I-frames at competitive depth: Smash Bros gives different moves (rolls, ledge get-up, wake-up) their
  own unique i-frame windows, some only on part of the body, and they decay with overuse (spammed rolls lose
  their i-frames) — a high-skill-ceiling detail most players never notice.
- [0:12:31] **Job 4 — Tactical panic button**: cooldown-gated invincibility skills in RPGs/MMOs/shooters. FFXIV's
  4 tank classes each give invincibility a different tradeoff (Paladin: clean 9s free invuln; Warrior: keep 1 HP,
  self-heal after; Gunbreaker: full invuln but HP drops to 0 first; Dark Knight: must "die" to trigger, heal back
  before a 10s timer or die for real) — same job, four different risk shapes = four different class identities.
- [0:14:36] **Job 5 — Theme/story**: Lost Odyssey's immortal protagonist grapples with outliving everyone he loves;
  mechanically, immortal vs. mortal party members recover from KO differently.
- [0:15:39] **Redefining failure when death is off the table**: if you can't lose your life, some OTHER resource has
  to carry the risk. Kirby's Epic Yarn: can't die, but a bead-collection rank replaces the stakes. Pizza Tower:
  no health at all outside bosses — the real "death" is a timer (Pizza Time chase) and the real challenge is a
  combo-multiplier rank (S vs. near-perfect P-rank).
- [0:18:53] Wario Land 2/3: Wario can't die, only get "tossed aside" — enemies inflict transformation status effects
  (float, shuffle) instead of damage, and levels are built so the wrong status blocks progress — but some
  transformations are secretly the KEY to secret areas (turning a disadvantage into an advantage on purpose).

## What the frames add
Nothing beyond illustration — gameplay montage synced to the named games (Pac-Man, Pac-Man CE DX, Balatro,
Smash Bros with i-frame highlight overlay visible around [0:11:27], FFXIV tank UI, Kirby's Epic Yarn, Pizza Tower,
Wario Land). No diagrams or on-screen taxonomy text.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"What replaces death?" worksheet (20-25 min)**: for a kid who wants to design a Wario-Land-style "can't die"
  item or effect (potion of invincibility, a shield mechanic), make them name the replacement stake in writing
  before Gemini builds anything — lose points/lose an item/lose time, but something. Directly answers the video's
  [0:15:39] thesis and prevents the "I made myself invincible and now it's boring" failure mode Ben will actually
  see kids hit.
- **"Same job, different shape" mini-exercise (15 min)**: show the FFXIV four-tank-class table [0:13:01] as a
  worked example, then have kids design TWO different items/effects that both grant temporary invincibility but
  with different costs (one gives it free for a short time, one costs your health first, one needs a "sacrifice"
  condition). Teaches that one mechanic (i-frames/invuln) can be reskinned into different tradeoffs — useful
  spec-writing practice before touching Gemini.
- **I-frame tooltip (5 min, not a full activity)**: "when your mob/player takes damage, give a half-second where
  they can't be hit again" — a one-line rule to hand Gemini so combat doesn't feel cheap. Comes straight from
  [0:08:17]-[0:09:52].

### Survives the move to Minecraft?
Minecraft already has i-frames (the invulnerability tick after taking damage) and a real invincibility item
(Potion of Fire Resistance/Totem of Undying) — kids can literally reskin or extend these via NeoForge attributes/
status effects instead of inventing invincibility from scratch, which is a much smaller, buildable spec. A
"resource replaces health" idea (Pizza Tower-style) maps onto Minecraft's hunger/saturation bar or a custom
status effect that drains something else instead of health — buildable as a NeoForge effect. The FFXIV
tank-ability idea maps onto a custom enchantment or consumable item with a cooldown, which NeoForge supports well.

### Doesn't transfer
- Pac-Man CE DX's chain-scoring meta-system (extend the timer by eating more before cashing in) needs a whole
  scoring/combo UI layer — too heavy for one item/mob spec.
- The Lost Odyssey immortality-as-narrative-theme angle is real worldbuilding material (a character who can't
  die and what that costs them) but belongs in the lore/character-design track, not the mod-mechanic track — flag
  as a crossover idea, not a mechanic spec.
- Smash Bros' per-move, per-body-part i-frame tuning is professional-fighting-game-depth detail; acknowledge it
  exists, don't ask an 11-13-year-old to spec it.

## Honest caveats
Like the difficulty-options video, this is a reference catalogue rather than one argument — pick ONE job
(power fantasy, accessibility, tension release, tactical panic button, or "redefine failure") per class activity,
don't try to cover all five. The Minecraft-attribute/status-effect technical framing above is my own extrapolation,
not something the video discusses (it never mentions Minecraft). The video's claim that "almost every game uses
some i-frames" is presented as fact but is really just "true of the games sampled here" — reasonable generalization,
not something independently verified.
