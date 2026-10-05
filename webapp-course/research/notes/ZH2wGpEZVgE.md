# Design Club - Super Mario Bros: Level 1-1 - How Super Mario Mastered Level Design (Extra History, 5.7 min)
**What it is / substance:** A tight, entirely-substance breakdown of the first ~30 seconds of Mario 1-1, naming a specific design technique for nearly every screen (affordance, safe first encounters, signaling danger, graduated difficulty, secrets). Good enough to assign as-is (yes) — it is short, dense, and ends with its own homework prompt.
**Watch-list:** It's only 5.7 min, watch the whole thing. If time-pressed, the three load-bearing chunks are [0:00:39]-[0:02:15] (opening screen + first enemy), [0:02:15]-[0:02:48] (the mushroom), and [0:03:22]-[0:04:28] (the pipes + secrets).

## The ideas (in order, with [h:mm:ss])
- [0:00:39] The opening screen is static and empty in front of Mario: nothing moves, nothing threatens. This gives the player free time to test the controls with zero risk before anything is asked of them.
- [0:00:39]-[0:01:12] Mario starts facing right, off-center, with open space ahead — the game shows you which way to go ("go right") through the picture alone, no text or cutscene needed. The video calls this an **affordance**: a visual clue about what to do, without being told.
- [0:01:12] The first thing the player meets is a flashing "?" block — inviting but not threatening, so the player approaches on their own.
- [0:01:43] The first Goomba appears right after. The video says the player reads it as dangerous for two reasons: its sprite has angry eyebrows, and — more importantly — it moves toward the player, unlike the still "?" block. A stationary Goomba "wouldn't be nearly as threatening" even with the same sprite. This is **signaling**: using shape/motion, not text, to say "this is bad."
- [0:01:43] The Goomba's placement forces the player to learn to jump before they can continue — the game blocks progress until you've learned the one skill you need.
- [0:02:15] If the player dies here, they respawn a very short distance back and can try again immediately. The video calls this a **short iteration cycle** — failing costs almost nothing, so the player isn't afraid to experiment.
- [0:02:15]-[0:02:48] The first mushroom power-up teaches physics through observation, not explanation: it moves right (so you can watch it safely before touching it), drops when it clears the block it came from (gravity), and bounces off a pipe (solid objects). The level geometry is built so that even a player trying to avoid the mushroom (jumping over it) gets knocked back down into it by the blocks above — the designers engineer a "safe forced encounter" with a new mechanic.
- [0:03:22] A row of pipes of increasing height teaches an unintuitive mechanic: Mario's jump height depends on how long you hold the jump button. The player can't proceed without learning this.
- [0:03:22]-[0:03:55] The same pipes double as a low-stakes rehearsal space: the pit beneath them (with two Goombas in it) lets the player practice "pit-jumping" — a skill the level will demand for real later — before it actually matters.
- [0:03:55] Two secrets appear at the end of this stretch: a secret coin room (a shortcut, aimed at veteran/repeat players, doesn't affect new-player experience) and an invisible block before the first pit that gives a struggling player who jumps early a hidden safety net.
- [0:04:28] The video explicitly stops at 30 seconds in and challenges the viewer to keep analyzing the rest of 1-1 themselves — it does not cover the whole level.

## Vocabulary for prompting Gemini
- **Affordance** — a visual clue about what something does, without words → "Make the Play button glow and have rounded corners with a shadow, so it looks clickable without a label."
- **Negative space** — empty area that draws the eye to what matters → "Leave the area above the score number empty so the player's eye goes straight to the Roll Dice button."
- **Safe first encounter** — the first time a player meets something new, it shouldn't be able to hurt them yet → "On the very first turn, show the monster's move but don't let it attack yet, so the player sees how it works first."
- **Signaling** — using color, shape, or motion (not text) to say "danger" or "good" → "Give enemy cards a red border and a growl icon so kids can tell them apart from friendly cards at a glance."
- **Short iteration cycle** — failing costs the player almost no time, so they try again right away → "If they get the answer wrong, don't restart the whole quiz — just let them try the same question again immediately."
- **Graduated difficulty** — one new challenge at a time, stacked gradually → "Level 1 has one weak enemy. Level 2 has two of the same enemy. Level 3 introduces a new enemy type — never more than one new thing per level."
- **Secret / optional content** — a hidden bonus that rewards exploring but is never required → "Add a hidden bonus if you click the logo three times — most players won't find it, and the game should work fine if they never do."

## Before/after examples from the frames
The frames are straight emulator gameplay footage (not an annotated map or diagram of the level), sometimes with simple text or arrow callouts timed to the narration, and occasionally B-roll from other levels (World 1-2, 2-1, 4-2) unrelated to the 1-1 analysis. They mostly confirm the narration rather than add new information:
- [0:00:40] The NES box art and instruction booklet float over gameplay — reinforces the claim that the game teaches without a manual [0:00:39].
- [0:01:20] The words "MOVE RIGHT" appear over Mario at the level's start next to open ground — a literal restatement of the affordance point about starting position and facing direction [0:00:39]-[0:01:12].
- [0:01:44] A "2." and a purple arrow point at the Goomba over gameplay — visualizes the transcript's numbered list of "two reasons you know it's an enemy" [0:01:43].
- [0:02:00] An NES controller graphic is overlaid on gameplay, showing its four buttons — ties to the point that players are expected to experiment with buttons without instructions [0:01:43].
- [0:02:16] The words "short iteration" appear over calm gameplay — direct label for the death-penalty point [0:02:15].
- [0:02:32]-[0:02:48] A mushroom sits on a brick ledge, then a purple arrow points at it as Mario nears it — visualizes the mushroom-teaches-physics section [0:02:15]-[0:02:48].
- [0:04:32] Another purple arrow marks Mario mid-air near a pipe — ties to the jump-height/pipe section [0:03:22].
There is no annotated top-down diagram of 1-1's full layout anywhere in the sheets — don't expect a map.

## Page material
- 3-6 "rules of thumb" for the library page:
  1. Your first screen should be calm and empty enough that a stranger could try it with zero instructions.
  2. Introduce every new danger or mechanic once, safely, before you ever use it to challenge the player.
  3. Use shape, color, or motion — not text — to signal "good" vs "bad."
  4. Make failure cheap: get the player back to trying again in seconds, not minutes.
  5. Add difficulty one new thing at a time, never several at once.
  6. Hidden bonus content is fine; hidden *required* content is not.
- Exercises:
  1. Screenshot the very first screen of your own app or game. Would a stranger know what to do without being told anything? What's missing?
  2. Pick one enemy, obstacle, or important choice in your game. Write down two visual signals (not text) that would tell a new player "this matters" or "this is dangerous."
  3. Time how long it takes to fail and try again in your game. If it's more than a few seconds, how could you shorten it?
- Quiz:
  1. Q: Why does the first Goomba move toward Mario instead of standing still? A: because motion, not just the sprite, is what reads as "danger" to a player — a stationary version of the same sprite wouldn't feel threatening.
  2. Q: Why does the level put a row of increasingly tall pipes with a Goomba-filled pit below them before the real pit-jumps later on? A: to make the player rehearse jump-height control and pit-jumping in a low-stakes spot, before that skill is required for real.
- How this applies to a turn-based/idle browser game built with Gemini on Apps Script:
  - **Dungeon crawler:** make turn 1 a single, clearly hostile monster with nothing else going on — no traps, no menus — so the player learns the "attack" button. Signal danger with a red icon or growl sound, not just a name.
  - **Idle clicker:** your opening screen is Mario's opening screen — one big, obviously clickable button and nothing else. Only after the first click do you reveal the next mechanic (an upgrade, an auto-clicker), one at a time, same as Mario introducing controls, then an enemy, then a power-up.
  - **Quiz/trivia game:** "short iteration" means a wrong answer should let the student retry that same question (or move straight to the next one) instead of restarting the whole quiz.
  - **Secrets:** an idle game or dungeon crawler can hide a bonus upgrade behind an unusual click — never something needed to finish or win.
  - **What doesn't fit:** variable jump height by holding a button, the mushroom's bounce-off-a-pipe physics, and the exact pixel placement of an invisible block relative to a jump arc are all real-time/physics mechanics. Apps Script games are turn-based or idle with no jump physics or real-time collision, so these specific mechanics don't transfer literally — but the underlying lesson ("teach a mechanic once, safely, before requiring it") applies to any first move, first turn, or first click.

## Caveats
- The video's own outro card and "EC" podium graphic read "Extra Credits" (this is their "Design Club" segment), not "Extra History" as labeled in this assignment — worth flagging as a possible channel-metadata mismatch, though it doesn't affect the content.
- Footage is unmodified original 8-bit Mario, so there's nothing here that's dated in a way that matters — the design lessons (affordances, safe encounters, signaling, iteration cost, graduated difficulty) are evergreen theory, not tied to any engine or tool.
- The video covers only the first ~30 seconds of the level and openly hands the rest to the viewer as an exercise — treat it as a model of *how to analyze*, not a complete breakdown of Mario 1-1.
- Nothing here is about backends, data, or code — it's pure UI/level design. The teacher needs to make the "first screen of your app" bridge explicitly; the video doesn't do it for you.
- Nothing in the video felt overrated or padded — every claim is tied to a specific, checkable moment in the level.
