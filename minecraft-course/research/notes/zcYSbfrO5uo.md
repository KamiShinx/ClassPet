# The Forgotten Depth of Kingdom Hearts (Design Doc, 7.9 min)

**What it is:** Video essay praising Kingdom Hearts 1's "Tech Points" system — bonus XP for skillful combat actions (parrying, hitting elemental weaknesses, guarding, deflecting projectiles) — as a rare example of an action-RPG rewarding mastery instead of just brute-force button mashing.
**Substance:** substantive for its single idea, which is described concretely with specific examples and contrasted against several other games' bonus-XP systems; the video is short and doesn't pad, but it also doesn't go beyond this one mechanic.

## Ideas, in the video's order
- [2:23] Kingdom Hearts 1's Tech Points: bonus EXP for hitting an enemy with its elemental weakness, for parrying an attack at the right moment, for guarding, or for deflecting a projectile back at an enemy — separate from and on top of normal kill-XP.
- [2:56] The game teaches this early and safely: the tutorial fights against friendly kids reward a successful parry with visible bonus XP (double the normal amount), so players learn the system has a "correct," rewarded way to play before it matters.
- [4:05] Contrast list of other games' bonus-XP systems and why they're worse: Persona 3's is random (a roulette wheel), Final Fantasy X's overkill bonus can be gamed by using excess resources or fighting weak enemies, and many games' "battle grade" screens grade performance without telling the player how to improve (generic critique of vague feedback, useful phrasing: "does very little to actually guide you into playing better").
- [6:14] Core thesis: bonus XP is best when it's an *active* reward that directly encourages getting better at combat, not brute force, luck, or an arbitrary milestone — and Dark Souls' whole design (mastery as a requirement, not just a bonus) is cited as the idea taken to its extreme.

## What the frames add
Nothing new — Kingdom Hearts 1/2 combat clips, HUD screenshots showing bonus-XP pop-ups after a parry ("Strength Increased!" style levels-up), and a still frame of the announcement of the (then-unreleased) Kingdom Hearts 3 used as a framing joke. Confirms what's narrated but adds no diagram or example the transcript doesn't already cover.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Reward the trick, not the kill" mob-design worksheet (20-25 min)**: kid picks a custom mob they're designing and specifies ONE telegraphed, skill-based counter to it (a wind-up you can dodge, a weak point that only opens briefly, an attack you can block for extra loot) that gives a bonus (extra drop, extra XP) beyond just killing it normally. They write the trigger condition in plain language for Gemini to implement (e.g. "if the player blocks within 0.3s of the mob's swing, drop 2x loot").

### Survives the move to Minecraft?
This is directly buildable in NeoForge (LivingHurtEvent / LivingAttackEvent checks for timing, shield-block detection, or elemental-type-matching already exist as vanilla patterns to extend) and is a clean instance of "bends an existing Minecraft mechanic" per the brief's filter — Minecraft already has shields, critical hits (jump-attacks), and weak-point-style mobs (Enderman eyes, Warden sonic-boom telegraph) that this pattern can piggyback on. Good candidate for a mechanic card.

### Doesn't transfer
The comparison games (Persona 3's roulette bonus, FFX's overkill bonus, general JRPG "battle grade" screens) are all menu-based, post-fight scoring screens — Minecraft combat is real-time and has no equivalent end-of-fight report screen, so those specific implementations don't port, only the underlying principle does.

## Honest caveats
None of the video's claims seem oversold — the parry/weakness/guard examples are concrete and specific, and the "reward mastery, not luck or grind" thesis holds up as a design principle independent of Kingdom Hearts. This is one of the stronger videos in an otherwise low-relevance batch.
