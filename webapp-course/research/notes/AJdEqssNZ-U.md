# Jan Willem Nijman - Vlambeer - "The art of screenshake" at INDIGO Classes 2013 (Dutch Game Garden, 44.1 min)

**What it is / substance:** A Vlambeer co-founder builds "juice" (game feel) into a bare-bones shooter live, one small trick at a time, then takes audience questions. Substance is real — this is one of the most-cited game-feel talks ever, and the demo section is dense with concrete, buildable tricks, not theory. Good enough for homework? **With a guide.** The first ~30 minutes (the live build) is excellent and worth assigning; the last ~13 minutes is an informal, rambly Q&A with audience chit-chat, one long personal anecdote, and a "let an audience member play it" bit — low density, skippable for most kids. Don't assign all 44 minutes raw.

**Watch-list:**
- [0:07:27]–[0:17:06] — the core buildup: sound/animation, enemy/bullet tuning, muzzle flash, hit effects, knockback, permanence, camera lerp, screen shake. This is the spine of the talk.
- [0:18:06]–[0:22:49] — hit-pause ("Sleep"), gun delay/kickback, and the bass-boost sound anecdote. Short, punchy, and transfers to almost any game.
- [0:25:04]–[0:29:37] — camera kick, bigger explosions, smoke, and the slow-motion ending. Shows how far "juice" can be pushed and why story/stakes ("meaning") still matters.
Everything from [0:30:52] onward (Q&A) is optional/skippable for a 14-year-old; at most point them to [0:32:18]–[0:33:43] (playtesting blind spots) and [0:38:02]–[0:39:57] (screen shake isn't a bug, every game benefits, but it's invisible marketing).

## The ideas (in order, with [h:mm:ss])

- [0:02:06]–[0:05:57] **The "game feel" model**: game → player (via sight/sound) → player pushes a button (input) → game changes → player sees the change → player thinks something. He draws this as a loop of arrows and says Vlambeer's whole specialty is the one arrow between "player presses a button" and "game changes and shows it back" — that's what the rest of the talk is about. Mostly scene-setting; skip if short on time, but it's a good one-sentence explanation of *why* juice matters (it's the feedback arrow, not the whole game).
- [0:07:58] **Basic animation + sound** on jump/shoot (made with SFXR, a free sound-effect generator). His claim: sound alone makes shooting "feel much better."
- [0:08:35] **Lower enemy HP** — kills happen faster, feels better. This is a gameplay-tuning idea, not a visual effect, but he treats "feel" as including numeric tuning, not just VFX.
- [0:09:10] **Higher rate of fire** — shoot more often, feels more like an action game.
- [0:09:39] **More, weaker enemies** instead of one tanky enemy — same total HP, feels more active.
- [0:10:09] **Bigger bullets** — his rule: tiny realistic bullet-dot sprites are "a beginner mistake"; make bullets chunky and visible.
- [0:10:40] **Muzzle flash** — cheap trick: just show one extra circle-shaped frame at the gun tip when firing.
- [0:10:40] **Faster bullet speed.**
- [0:11:13] **Less accuracy / random spread** — bullets scatter a bit each shot so the game "looks different every single time" (avoiding visual repetition).
- [0:11:44] **Impact effects** — a small effect plays where a bullet hits a wall or enemy, so misses/hits are visible, not silent.
- [0:12:14] **Hit flash on enemies** — enemy sprite flashes white and shifts pose for a moment when hit; this is the feedback ("red arrow") that tells the player their input changed something.
- [0:12:45] **Enemy knockback** — enemies get shoved a couple of pixels on hit. Tiny, barely noticed consciously, but it changes enemy positions enough to create "dynamic combat" (flanking-looking situations) as a side effect.
- [0:13:11]–[0:14:07] **Permanence** — dead bodies, corpses, and rubble stay on screen instead of disappearing. His argument: computers can handle it, and it silently tells the player "there was a fight here," turning empty rooms into a record of what happened.
- [0:14:34] **Camera lerp** (linear interpolation) — the camera doesn't snap to the player, it eases/lags slightly behind and smooths in. Subtle but "feels better to move around."
- [0:15:06]–[0:16:07] **Camera framing toward the action** — camera isn't centered on the player, it's offset to show what's ahead/what the player is shooting at. In Luftrausers this got dynamic: camera nudges toward incoming bullets and low toward water so danger is visible before it hits.
- [0:16:37] **Screen shake** — the talk's namesake trick. His pitch: "it's super easy and it makes your game better," and it's the single most common piece of advice he gives other devs.
- [0:17:06]–[0:18:06] **Player knockback on firing** — shooting pushes the player back slightly, which is also a gameplay mechanic (you move slower while shooting, so there's a real reason not to hold the fire button forever).
- [0:18:06]–[0:19:01] **Hit-pause / freeze-frame** — called "Sleep" in GameMaker: the whole game pauses for about **20 milliseconds** on impact (and a bit longer on enemy death). Too short to consciously notice, but it makes hits register as more impactful ("your brain remembers it more because it took longer, but you don't notice").
- [0:19:18] **Gun delay** — the held weapon sprite lags slightly behind the character's movement (originally a bug he kept because it looked like the character was physically carrying the gun).
- [0:19:55] **Gun kickback** — the gun sprite itself recoils a few pixels when firing.
- [0:20:09] **Strafing** — player can walk backward while shooting and flip direction; another small reason to stop firing occasionally.
- [0:20:29]–[0:21:00] **More permanence: shell casings** stay on the ground forever and visibly pile up (he jokes you could even add physics so they pile into drifts).
- [0:21:19]–[0:22:49] **Bass-boost the sound effect** — anecdote about a AAA studio "fixing" a bad gun purely by adding **12 decibels of bass** in an audio editor. No visual change, no code change to gameplay — just louder low end — and it reads as "fixed."
- [0:23:16] **Multiple weapon types** (e.g. a triple-shot machine gun) — variety, not hard to add once you have one working gun.
- [0:23:42] **Random explosion chance on death** — a **33%** chance any enemy explodes when killed, "even if it makes no sense."
- [0:23:42]–[0:24:48] **Faster enemies** — pacing/tuning again, added because the other changes made the game feel too easy/slow by comparison.
- [0:25:04]–[0:26:22] **Camera kick** — distinct from random screen shake: the camera punches a fixed distance in the *opposite direction* of the direction you're shooting, i.e. directional recoil for the camera itself.
- [0:26:50]–[0:27:19] **Bigger explosions** — the single lesson he says shaped his whole career ("make really big explosions," from another developer, Cactus). Explosion is just a circle that flashes from black to white.
- [0:27:54] **Lingering smoke** after an explosion, fading out slowly — more "permanence."
- [0:28:28]–[0:29:37] **"Meaning"** — gameplay/story payoff: he stages a final boss kill, then drops the frame rate to about **10 fps** for a few seconds to fake slow motion on a cheap projector, timed to a "you were the monster all along" text reveal. His point: juice without any stakes or story is still empty; this is the "thoughts" part of his feedback-loop model finally paying off.
- [0:32:18]–[0:32:48] (Q&A) **Screen shake needs an off switch** — Nuclear Throne added a settings toggle because some players got nauseous; he warns devs get "addicted" to their own juice and stop noticing how much they've added, so playtesting with others (not yourself) is the only check.
- [0:38:02]–[0:39:57] (Q&A) He denies screen shake was an accidental bug (a *different*, unwanted camera-jitter bug exists in some low-res games, but Vlambeer's shake is hand-coded and intentional); claims **"probably every game would benefit from screen shake,"** even a puzzle game; and says juice is invisible marketing — players who don't have it say "this game sucks," players who do have it "just play and they're happy" without knowing why.

## Vocabulary for prompting Gemini

- **Game feel / juice** → the small audiovisual feedback (sound, flash, shake, pause) that makes an action *feel* like it landed, separate from whether it changed the actual game state → "make hitting the button feel punchy — add a small flash and sound, not just the number changing."
- **Lerp (linear interpolation)** → smoothly sliding a value (like a camera or a UI element) toward a target instead of snapping instantly → "make the camera/highlight lerp to the new position over 200ms instead of jumping there instantly."
- **Hit-pause / freeze-frame** → briefly pausing all motion for a few milliseconds at the moment of an impact, so the hit reads as more powerful → "when an attack lands, freeze the screen for 60ms before the damage number appears."
- **Permanence** → letting the effects of past actions stay visible (corpses, shells, marks) instead of disappearing, so the screen shows a history → "keep the last 5 dice-roll results shown on screen instead of clearing them each turn."
- **Spread / randomization** → adding small random variation to an effect (angle, pitch, timing) so repeats don't look/sound identical → "randomize the pitch of the click sound by ±10% each time so it doesn't sound robotic on repeat clicks."
- **Knockback** → a small forced displacement applied to something after it's hit, as visible proof the hit registered → "when a card is played, animate it sliding away 20px before it's removed."

## Juice techniques as Gemini prompts

Every distinct technique this talk actually shows or names, in the order it appears, each with a ready-to-paste Gemini request. Where JW gives a real number, it's used; where he doesn't, the number is my own suggestion for a starting point (labeled), not something from the video.

1. **Basic sound + animation on action** [0:07:58] → "When the player clicks the attack button, play a short click sound and briefly scale the button down to 95% and back over 100ms."
2. **Lower target 'HP' / faster kills** [0:08:35] (tuning, not code trick) → "Lower the enemy's hit points from 5 to 2 so fights resolve faster."
3. **Higher action rate** [0:09:10] → "Let the player click the attack button once every 500ms instead of once every 2 seconds" *(for a turn-based game, adapt as: "let the player take more actions per turn").*
4. **More, weaker opponents** [0:09:39] → "Instead of 1 enemy with 60 HP, spawn 6 enemies with 10 HP each."
5. **Bigger 'bullets' / bigger visual elements** [0:10:09] → "Make the projectile icon at least 24px wide, not a 4px dot — it should be easy to see."
6. **Muzzle flash / action flash** [0:10:40] → "When the player fires, show a small white circle at the gun position for 1 frame (about 50ms) before it disappears."
7. **Faster projectile/animation speed** [0:10:40] → "Make the projectile travel across the screen in 200ms instead of 600ms."
8. **Spread / randomize repeated effects** [0:11:13] → "Randomize the bullet's landing spot by ±5px each shot so it doesn't look identical every time."
9. **Impact effect on hit** [0:11:44] → "When a projectile hits a target or wall, show a small burst animation at the impact point for 150ms."
10. **Hit flash on the thing hit** [0:12:14] → "When an enemy is hit, flash its image white (CSS filter brightness 200%) for 100ms then fade back to normal."
11. **Knockback on hit** [0:12:45] → "When an enemy is hit, nudge its position 8px away from the player over 100ms, then let it settle back."
12. **Permanence — leave evidence behind** [0:13:11] → "Don't remove defeated-enemy sprites from the board; grey them out and leave them in place so the player can see the battlefield fill up."
13. **Camera/view lerp (smooth follow)** [0:14:34] → "Make the highlighted card or viewport smoothly slide (CSS transition, 200ms ease-out) to the new position instead of snapping there instantly."
14. **Offset the view toward the action** [0:15:06] → "Shift the camera/viewport 10% toward wherever the player is aiming or acting, instead of always centering on the player."
15. **Screen shake** [0:16:37] → "When the player takes damage, shake the whole screen by moving it randomly within 4px for 200ms, then settle back to center."
16. **Recoil / self-knockback on the actor** [0:17:06] → "When the player fires, nudge the player sprite back 6px for 150ms."
17. **Hit-pause / freeze-frame** [0:18:06], JW's own number is ~20ms on hit (longer on a kill) → "When an attack lands, pause all animation/movement on screen for 20ms (about 60ms on a killing blow) before continuing."
18. **Delayed/lagging follower element** [0:19:18] → "Make the weapon icon lag slightly behind the character sprite (a 50–100ms delayed follow) instead of moving in perfect sync."
19. **Weapon/element kickback animation** [0:19:55] → "When firing, move the weapon icon back 5px and return it over 100ms."
20. **Directional flip / strafing feedback** [0:20:09] → "When the player changes direction, flip the sprite horizontally instantly, and let them act while facing either way."
21. **More permanence: small leftover details** [0:20:29] → "Leave a small 'shell' icon on the board for every shot fired this game, so the player can see how many actions they've taken."
22. **Bass-boost / punch up the sound** [0:21:19], his number: 12dB → "Make the click/impact sound effect noticeably bassier and louder — describe it as 'a deeper, punchier thud' rather than a thin click."
23. **Weapon/action variety** [0:23:16] → "Add a second action type that does 3 smaller hits instead of 1 big hit, using the same underlying attack code."
24. **Random bonus effect on success** [0:23:42], his number: 33% chance → "Give defeated enemies a 33% random chance to show a small explosion animation, purely for effect."
25. **Escalate pace to match the added juice** [0:23:42] → "Now that hits feel bigger, speed up the enemy's actions slightly so the pace still feels fair."
26. **Camera kick (directional, not random)** [0:25:04] → "When the player fires, punch the camera 6px in the opposite direction of the shot, then ease it back over 150ms — this is different from random screen shake."
27. **Bigger flash-based explosions** [0:26:50] → "Make the explosion a circle that flashes from solid black to white and fades out over 300ms, sized about a third of the screen width."
28. **Lingering smoke after an effect** [0:27:54] → "After an explosion, fade in a soft grey blob that slowly fades out over 2 seconds, left behind at the explosion's spot."
29. **Fake slow motion via reduced frame rate** [0:29:06], his number: ~10fps → "For the final winning moment, slow all animations to about a third speed for 2 seconds before showing the result."
30. **Tie a big effect to a meaningful moment ("meaning")** [0:28:28] → "Only play the big slow-motion/explosion combo on the final, story-relevant win — not on every ordinary action — so it stays special."
31. **Add a screen-shake off switch (accessibility)** [0:32:18] → "Add a settings checkbox labeled 'Reduce motion' that turns off screen shake and flash effects when checked."

## Before/after examples from the frames

The presentation itself is a GameMaker slideshow he built and drives live; the projector frames show a small top-down/platform arena (light blue-green background, blocky grey platforms, circular "dot" enemies) that visibly changes as tricks are added, with the trick's name flashed as plain white text on screen for a beat before the demo continues (confirmed labels include "HIT ANIMATION" around [0:12:08], "ENEMY KNOCKBACK" around [0:12:40], "PLAYER KNOCKBACK" around [0:19:04], "FASTER ENEMIES" around [0:24:08], "MORE ENEMIES" around [0:24:40], "BIGGER EXPLOSIONS" around [0:27:12]–[0:27:20], and the ending text "YOU WERE THE MONSTER ALL ALONG" around [0:28:56]–[0:29:12]).
- **Sheets 1–3 [0:00:00]–[0:06:24]**: talking-head slides plus an animated diagram of his game/player feedback loop (a computer icon and a stick-figure player connected by looping arrows that build up step by step) — matches the model he describes in the transcript at [0:02:06]–[0:05:57]. Purely conceptual, no game footage yet.
- **Sheets 4–5 [0:07:28]–[0:10:40]**: the arena starts nearly empty (a few blocky platforms, one slow dot enemy, tiny bullets) and by the end of sheet 5 gains visible muzzle flashes and bigger bullets — a real before/after within the frame sheets themselves.
- **Sheets 6–9 [0:12:00]–[0:19:00]**: enemies visibly flash and scatter (hit animation + knockback), more enemies appear on screen at once, and the camera visibly framing shifts.
- **Sheets 10–15 [0:20:00]–[0:29:00]**: screen fills with more enemies, bullets, and shell-casing clutter on the ground (permanence); a big white/black flash fills much of the screen at the "BIGGER EXPLOSIONS" moment (~[0:27:12]); final sheet 15/16 shows the arena mostly empty again with the "YOU WERE THE MONSTER ALL ALONG" text overlay at the story-ending beat.
- **Sheets 17–20 [0:34:00]–[0:42:40]**: switches to a straightforward talking-head shot of the speaker (Q&A) with occasional cutbacks to the stage; sheet 17 briefly re-shows the closing "game feel" diagram slide as a recap. These frames add nothing new visually — confirms the Q&A section has no further demo content worth watching for frames alone.

## Page material

- **Rules of thumb:**
  - Juice is the feedback for an action, not the action itself — a button press needs a sound/flash/motion even if the underlying data change is instant.
  - Small, cheap effects (a flash, a nudge, a sound) add up; no single trick here needs more than a few minutes to add.
  - Randomize repeated effects slightly (spread, pitch, timing) so nothing looks or sounds identical every time.
  - Let the effects of past actions stay visible (permanence) — it turns empty state into a visible history.
  - Every juice effect needs an off-switch if it can physically bother someone (motion/flash sensitivity).
  - Juice never fixes a game with no stakes — pair the biggest effects with the moments that actually matter ("meaning").
- **Exercises:**
  - Take one button in your own app or game and list every piece of feedback it currently gives (sound? animation? color change?) — if the list is empty or just "the number changes," add one flash and one sound this week.
  - Pick one repeating visual/sound in your project (a click, a roll, a hit) and add a small random variation (±10% size, pitch, or position) so two repeats never look/sound exactly the same.
  - Screenshot your game after a "battle" or big action — is there any visible trace it happened, or does the screen reset to looking untouched? Add one piece of "permanence."
- **Quiz:**
  - Q: What does "lerp" mean, and where did the talk use it? A: Linear interpolation — smoothly sliding a value toward a target instead of snapping; he used it to make the camera ease/lag behind the player instead of jumping.
  - Q: Name one number JW actually gives for a specific effect. A: Any of: ~20ms hit-pause on impact, 12dB bass boost on the gunshot sound, 33% chance of random explosion on enemy death, ~10fps for the slow-motion ending.
- **How this applies to a turn-based/idle Apps Script browser game:** Almost every effect above is pure frontend (HTML/CSS/JS) and works fine even though the *game logic* is turn-based — a button click, a dice roll, or an idle-tick update can still get a CSS flash, a shake via `transform: translate()` with `setTimeout`/`requestAnimationFrame`, a short freeze before revealing a result, and a sound via the `Audio()` object, all without any server round-trip. Screen shake, hit flash, knockback-style nudges, hit-pause, camera lerp on a highlighted element, permanence (leaving results on screen instead of clearing them), and randomized micro-variation all transfer directly. **What doesn't fit:** anything requiring true real-time sync between two simultaneous players (e.g. two players seeing each other's screen shake at the exact same instant as it happens) — Apps Script/Sheets is not built for that; each player's juice plays locally on their own turn or view. Haptic feedback (mentioned in Q&A, [0:37:30]) is also unrealistic — it needs device vibration APIs not available inside an Apps Script `HtmlService` iframe on most platforms.

## Caveats

- 2013 talk, GameMaker-specific terms ("Sleep" command) — the *concept* (hit-pause/freeze-frame) transfers everywhere; the exact API name doesn't.
- SFXR (sound effect tool) and Audacity are period tools; any modern free sound generator or royalty-free sound clip works the same way for a kid's project.
- The "game feel" theoretical model at the start [0:02:06]–[0:05:57] is presented by the speaker himself as "probably all wrong... but it works for us" — treat it as one working developer's mental model, not an established academic theory (he says outright he's not an academic or psychologist).
- The claim "probably every game would benefit from screen shake" [0:38:57] is his personal, fairly confident opinion stated in a Q&A, not something demonstrated on a puzzle game in this talk — worth flagging as an opinion, not a proven rule.
- Nothing here is overrated relative to how it's presented; if anything the talk undersells how much of this is just "add a CSS transition and a sound," which makes it very achievable for a 14-year-old's Apps Script frontend.
- Sound and video quality of the live recording are rough in places (informal stage audio, occasional swearing) — fine for a teenager but worth a heads-up before assigning it.
