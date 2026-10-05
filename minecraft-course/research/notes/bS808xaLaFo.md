# BOLD Status Effects (Design Doc, 21.1 min)

**What it is:** Third in the Design Doc status-effect trilogy: status effects that are dramatic/game-defining, pulled from outside typical RPGs (a rail shooter, a car-survival game, a word-puzzle roguelike, an immersive-sim dialogue RPG).
**Substance:** substantive, but the last two case studies (Cursed Words, Disco Elysium) stretch the definition of "status effect" pretty far and the video admits it ("it's a bit of a leap, stay with me here" at 13:48) — flag that self-aware hedge to kids/teachers rather than treating it as settled doctrine.

## Ideas, in the video's order
- [0:02:34] Omori's emotion system (Neutral/Happy/Angry/Sad) works as a rock-paper-scissors triangle AND a stat modifier (Happy = +speed/+crit/-accuracy, Angry = +attack/-defense, Sad = +defense/-speed/juice-loss on hit) layered under normal status-effect slots.
- [0:04:08] The system becomes a "cornerstone" once party skills can inflict specific emotions on allies AND enemies, and boss fights are built as emotion puzzles (a boss heals off "happy" adds, so you have to depress them first, then flip the boss angry for a type-advantage beatdown) (0:04:38-0:05:45).
- [0:06:20] A single strong, ever-present-threat status can define a whole genre's difficulty curve without complex tiers (Star Fox 64's wing-loss: 3 hits removes your best weapons and mobility; "Expert" mode drops that to 1 hit, and that alone is most of what makes Expert hard).
- [0:08:28] A status doesn't need a clean on-screen icon — it can be diagnosed like a mystery (Pacific Drive's car "quirks": randomized trigger-behavior pairs, e.g. wipers-on triggers fuel gauge glitch; player has to notice, hypothesize, and test a fix with limited guesses).
- [0:12:12] A status/curse system can BE the entire genre-bending hook of a game (Cursed Words: board tiles carry curses — wildcard numbers, chess-piece movement, poker-hand suits — that escalate and turn a word game into geometry/sequence/set-collection puzzles).
- [0:16:37] Long-term personality stats can act like slow-burn status effects outside combat entirely (Disco Elysium's 24 skills: too HIGH a skill causes narrative problems, e.g. maxed Authority makes you overreact, maxed Encyclopedia floods your internal monologue with useless trivia) — "too much of a good thing" as a design lever.

## What the frames add
Mostly illustrative b-roll. The Omori battle-UI frames (4:00-5:45) are useful for a teacher to show kids what a genuinely bold in-game status HUD looks like (big colored emotion portraits, not a tiny debuff icon). The Cursed Words frames (12:00-15:45) show the actual letter-tile curse UI, which is a nice concrete "here's a tiny indie team building a status-effect-driven game" reference for kids doing solo mod projects.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Design a threat, not a debuff" prompt (15 min)**: instead of designing a numeric buff/debuff, kid designs ONE always-looming threat status tied to a single system (like Wingless in Star Fox), e.g., "if your armor durability hits 0 while fighting, you get Exposed for 30s: -50% defense, screen edges flash red." Concrete, one page, directly buildable.
- **"Diagnose it" bonus tooltip (optional, for advanced kids)**: a status with no clean UI icon, only environmental/behavioral tells (particle color changes, sound cues) that the player has to notice and match to a cause — teaches the class that "no icon" is itself a design choice, not a bug.

### Survives the move to Minecraft?
The "one big threat status tied to one system" idea (Star Fox wings) maps cleanly onto Minecraft: durability, hunger, oxygen, and armor are all existing bars a custom `MobEffect` or event listener can hook into. The "diagnose it" idea is buildable (suppress the vanilla effect icon via NeoForge event, expose only particles/sound) but is an advanced/optional stretch, not core curriculum. Omori-style multi-emotion combat layering and Disco Elysium's 24-skill personality system are full custom stat frameworks — out of scope for a one-page spec or a 20-week beginner course.

### Doesn't transfer
Cursed Words' curse-as-genre-transformer is a whole game's core loop, not a status effect a kid could add to an existing game — cut entirely. Disco Elysium's narrative-branch-on-stat-extreme needs a dialogue/quest system Minecraft/NeoForge doesn't have and a beginner course won't build — flag as "cool but not for us."

## Honest caveats
The video itself flags that the last two examples are a stretch of the "status effect" label; worth repeating that caution rather than presenting Cursed Words or Disco Elysium as literal status-effect case studies to kids. Otherwise not oversold — Star Fox and Pacific Drive claims are backed by specific mechanical detail, not vibes.
