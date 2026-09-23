# What Makes A Good Difficulty Option? (Design Doc, 26.5 min)

**What it is:** A tour of difficulty-option design across many games: what gets tweaked (numbers, qualities,
objectives), adaptive/dynamic difficulty, and how to get players to actually try harder difficulties.
**Substance:** substantive. Dense, well-organized survey with ~20 distinct named examples and a clear taxonomy
(quantities vs. qualities vs. objectives vs. player-facing challenges). About 3 min of sponsor read (Brilliant) cut
cleanly at the start.

## Ideas, in the video's order
- [0:01:47] Difficulty options exist because "sweet spot" of challenge differs per player AND per session for the
  same player over time (generic, but well argued).
- [0:04:56] Devs are bad judges of their own game's difficulty because they've played it thousands of times
  ("difficulty blinders") — argues for playtesting with fresh players (generic).
- [0:06:03] **Tier 1: Game Quantities** — the basic slider tweaks (health, damage, enemy count, AI accuracy/aggression).
  Halo example: Legendary roughly halves your survivability and doubles enemy count/accuracy.
- [0:07:09] Warning case: Metroid Dread's Hard Mode only cranks numbers (enemies hit harder) without changing
  enemy behavior/placement — criticized as lazy, barely changes the experience for skilled players.
- [0:08:45] **Adaptive/rubber-band difficulty**: Resident Evil secretly tunes item drops/enemy strength based on
  player performance (health, ammo on hand), stays subtle so it doesn't feel patronizing. A locked "Professional"
  mode disables the safety net once you're ready.
- [0:10:21] **Tier 2: Game Qualities** — changing what the game fundamentally IS, not just numbers. Beat Saber
  example: toggle failure off, remove obstacles, slow down 30%, or add harder variants (faster, no guide arrows,
  ghost notes) — a whole menu of orthogonal difficulty knobs instead of one slider.
- [0:11:55] Anti-pattern: Tiny Toon Adventures' "Children" difficulty deletes entire levels/bosses rather than
  making them easier — "cutting out big chunks of a game is a little sloppy."
- [0:12:30] **House rule: don't punish players for picking easy mode.** Cuphead's Simple mode removes boss phases
  but locks you out of the game's finale even after finishing everything else on Normal — presented as a design
  mistake, contradiction between offering the option and punishing its use.
- [0:14:03] **Tier 3: Objectives** — change what the game asks you to DO, not just numbers. GoldenEye's 3 difficulty
  tiers add escalating objective lists (just reach the exit -> disable alarms -> plant bugs) — cheap to build,
  changes the qualitative feel without new level geometry.
- [0:15:39] **Optional challenge content as an alternative to a hard mode**: Celeste B/C-Sides, Super Meat Boy Dark
  World, Hat in Time Death Wish — isolated remix challenges with new stipulations (no-hit, time limits) layered on
  existing levels, rewarded with cosmetics not power.
- [0:17:20] **Skill ceiling instead of hard mode**: Pizza Tower's rank system (S rank vs. mythical "P-Rank" — perfect
  combo + full collection + no hits + second lap) makes mastery itself the difficulty axis, no explicit "hard" toggle.
- [0:19:25] Problem: players rarely revisit the difficulty setting once chosen — word of mouth is the only way they
  learn a harder mode is worth it.
- [0:19:55] **Incentivize switching via better rewards, not just harder numbers**: Bug Fables' Hard Mode medal gives
  better post-boss loot; Hades' Pact of Punishment lets you stack modifiers for "Heat" points needed to unlock content,
  each modifier named and specific (enemies faster, traps hurt 4x, lose a boon per region).
- [0:23:01] **Cautionary case: risk/reward difficulty needs the player to feel in control.** Kid Icarus Uprising's
  intensity slider (0-9, more reward for higher) worked because losing just drops your intensity automatically.
  Smash Bros ported the same idea to Classic Mode but added randomized 8-player chaos and items — losing there felt
  "cheap" rather than "challenging" because luck, not skill, decided the outcome.

## What the frames add
Nothing beyond illustration — pure gameplay-footage montage cut to match each named game (Halo, Metroid Dread,
Beat Saber, Cuphead, GoldenEye, Celeste, Pizza Tower, Bug Fables, Hades, Kid Icarus Uprising, Smash). No diagrams,
checklists, or on-screen text summarizing the taxonomy — the three-tier structure (quantities/qualities/objectives)
exists only in the narration, never written on screen.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Three ways to make it harder" worksheet (25 min)**: kid picks one of their own mod mechanics (a mob, an
  item) and fills three boxes — a *quantity* change (more damage/health), a *quality* change (new attack pattern
  or behavior), an *objective* change (a new win/lose condition tied to that mechanic). Directly from the video's
  own three-tier structure [0:06:03]-[0:14:36]. Ends with a one-paragraph spec Gemini can build against.
- **"Don't punish the easy choice" red-flag check (10 min, tooltip not full activity)**: before a kid locks in a
  difficulty-gated feature, ask "does picking easy mode block something a player would want?" Modeled directly on
  the Cuphead critique [0:12:30]. Good as a standing checklist line, not a session on its own.
- **Reward-for-risk mini-brief (15-20 min)**: kids design ONE optional modifier for their mod ("if you toggle this
  on, X gets harder, Y gets better") mirroring Hades' Pact of Punishment [0:19:55]. Good, concrete, buildable spec
  exercise; pairs naturally with the batch's status-effect material (see Batch O).

### Survives the move to Minecraft?
Minecraft already ships Peaceful/Easy/Normal/Hard plus Hardcore — a real, in-engine quantities-tier example kids
already know. The class's version of "objectives" tier maps well onto Minecraft advancements (a kid could design a
custom advancement chain that only exists on a harder difficulty). "Qualities" tier (new attack patterns, mob
behavior changes) is realistic for NeoForge: mob AI goals and attributes are moddable and Gemini can plausibly
write a "different behavior on hard difficulty" branch using `Difficulty` checks. The Hades-style stacking-modifier
system is heavier — doable as a single custom game rule or a "hardcore toggle" item, but a full point-buy modifier
menu is out of scope for one class.

### Doesn't transfer
- Rubber-band/adaptive difficulty (Resident Evil) needs live telemetry and tuning most kids can't judge by eye in
  a 65-min session — flag as "cool idea, too fiddly to spec, let alone test, in one week."
- The Smash Bros/Kid Icarus "risk must feel controlled, not luck-based" lesson is real game-feel nuance, worth
  saying aloud, but it's a critique skill (judging someone else's design), not a buildable spec on its own.
- Full remix/challenge-mode level packs (Celeste B-Sides) assume a level editor and hours of polish — not
  realistic for a single mod feature.

## Honest caveats
Extremely list-heavy — this is closer to a reference catalogue than a single teachable argument, which is a
strength for a "sample everything" mode but means the class activity has to pick ONE of the three tiers, not try
to teach all three in one sitting. The video never discusses Minecraft directly (that link is my own extrapolation
in "Survives the move to Minecraft?"). The claim that Smash's Classic Mode difficulty is "less great" than Kid
Icarus's is the host's stated opinion, not an objective fact — worth keeping as "a design lesson," not gospel.
