# Juice it or lose it (grapefrukt, 15.6 min)
**What it is / substance:** a live conference talk (Nordic Game Jam-style stage, two speakers, no slides with bullet points — mostly a projected Breakout-clone demo) that adds one "juice" technique at a time to a plain grey Breakout clone until it's visually alive; substance is real and dense (this is the source talk the term "juice" comes from in game-dev culture). Yes, assign it — but as a **watch, not read**: the content is 90% "look what this one change does," not exposition, so a kid needs to actually watch the screen, not just skim a transcript.
**Watch-list:** [0:02:39]-[0:05:39] tweening/easing (the core reusable idea, includes the one-line lerp formula on screen); [0:08:05]-[0:09:26] the two-circles sound demo + adding all sound effects (cheapest, biggest win); [0:12:56]-[0:14:07] screen shake demo including "freight train mode."

## The ideas (in order, with [h:mm:ss])
- [0:00:11] **Juice** = a catch-all word for things in a game that wobble, squirt, bounce, or make noise — extra feedback layered on top of a game that already works, to make it feel alive. Not a technical term, just industry slang.
- [0:00:46] Definition borrowed from a Gamasutra article: a juicy game "responds to everything you do" with lots of visible/audible reaction for very little input from the player.
- [0:01:24] Claim (their opinion, stated as near-absolute): juice makes a game better basically 100% of the time, unlike most game-design advice which is situational.
- [0:02:04] They demo on a **Breakout clone** they built for this talk, adding effects one at a time so you can see the before/after.
- [0:02:04] **Color** — first fix: plain grey/brown blocks and paddle get actual colors so you can tell "good" bits from "bad" bits at a glance. Simplest change, immediate readability win.
- [0:02:39] **Tweening** (jargon, defined in-video): short for "in-betweening," the old hand-drawn-animation term for filling in frames between two key poses. In code it means: give a start value, an end value, a duration, and a math curve ("easing equation"), and let the computer animate between them instead of the value jumping instantly.
- [0:03:49] The cheap version, shown as actual code on screen: `x += (target - x) * 0.1` — every frame, move 10% of the remaining distance toward the target. Starts fast, slows down near the end. No animation library needed.
- [0:04:23] They tween the Breakout blocks' spawn-in position with different easing curves: **linear** (looks flat/robotic), **ease-out/slowdown** (blocks settle in smoothly), **overshoot** (blocks fly slightly past their spot then settle back — "very luxurious"), and a **bounce** curve (exaggerated, springy).
- [0:04:59] They also tween **rotation** and **scale**, not just position — the same technique works on any numeric property.
- [0:04:59] Adding a small **random delay** per block before it starts its tween (so blocks don't all move in perfect unison) reads as much more natural, for free.
- [0:05:39] **Squash and stretch** (their own umbrella term, not a formal API) — a bundle of small deform effects, mostly built with the same tweening: the paddle scales based on mouse-move offset (squishes as you move it fast); the ball scales up then eases back down on impact; the ball rotates to face its direction of travel; the ball stretches along its velocity vector and eases back; the ball flashes white then fades back to its normal color on hit.
- [0:06:49] Nearby blocks get a small scale-pulse tween too when the ball hits one, and the paddle's edge line "bounces" a bit on impact — same tweening technique reused everywhere.
- [0:07:29] **Sound** — their strongest single claim: "the most cost-effective thing you can add to a game." Demoed with a classic two-circles-passing-through-each-other clip (credited to Steve Swink's book Game Feel): silent, the circles look like they pass through each other; with a bounce sound added, the exact same animation reads as the circles bouncing off each other. Sound alone changes what the eye perceives as physically happening.
- [0:08:46] They then add real sound effects to the Breakout clone: wall bounce, block break, paddle hit, plus background music — after which they say it stops feeling like "a crappy demo" and starts feeling like a real game, with zero other changes.
- [0:09:26] **Particles** — claim: "you can't ever have too many particles," stated as a joke-but-not-really. Starts with a puff of smoke where the ball hits something.
- [0:10:03] Warning against a specific trap: building your own particle engine becomes a fun side-project that eats your time — use an existing one instead.
- [0:10:03] Blocks don't just vanish when destroyed — they tween-fade out, then (better) fall off-screen with gravity, get pushed by the ball's velocity, spin as they fall, and darken so they visually separate from blocks still in play. Each of these is a small independent tweak stacked on the last.
- [0:11:15] A **shatter effect** on block break (harder to implement, described as "not simple, but awesome") plus a deliberate slow-motion moment just so the audience can see it clearly.
- [0:11:49] More particle bursts on block break, particles on paddle hits, a confetti-style burst, and a **motion trail** behind the ball (drawing a fading line along its recent positions).
- [0:12:24] **Screen shake** — flagged explicitly as powerful and something to use carefully. Demoed live at increasing intensity: a small shake on every hit turns the ball from "a stupid tennis ball" into something with real impact; cranked further ("freight train mode") it becomes chaotic and almost breaks the readability of the screen — shown deliberately as the point where more is not better.
- [0:12:56] **Character/eyes trick**, credited to game designer Kyle Gabler: draw simple eyes on any game object (here, the paddle) for very little art or code effort. The "blink" is just briefly hiding the eyes. The eyes track the ball's position as it moves.
- [0:13:28] A mouth is added that smiles when the paddle hits the ball and frowns if the ball gets away — one scaled shape, driven by game state, adds a surprising amount of personality for almost no work.
- [0:14:07] Closing demo: toggle every effect off, look at the plain grey game, then toggle everything on at once — visibly a completely different, much more alive game from identical underlying rules. They joke the framerate suffers with everything on.

## Vocabulary for prompting Gemini
- **Tweening / easing** → animating a value smoothly from A to B over time instead of snapping → "when the score updates, animate the number counting up over 500ms instead of jumping instantly."
- **Ease-out** → motion that starts fast and slows into place → "make the card slide in and ease to a stop over 400ms, don't just appear."
- **Overshoot** → animation goes slightly past its target then settles back → "make the button pop 10% bigger than its final size, then settle back down, over 300ms."
- **Squash and stretch** → briefly deforming a shape on impact/movement then easing back to normal → "when the player earns points, scale the points icon to 130% then back to 100% over 250ms."
- **Screen shake** → the whole viewport jitters briefly on a big moment → "shake the game screen 4px for 100ms whenever the player loses a life."
- **Particles** → many small short-lived shapes/images spawned for a burst effect → "spawn 10 small circle particles that fly outward and fade over 600ms when an enemy is defeated."
- **Trail** → a fading line/afterimage following a moving object → "draw a fading trail behind the moving token for its last 8 positions."
- **Toast / flash feedback** (general term, not from this video) → a brief on-screen message or color flash confirming an action → "add a toast that says 'Saved' for 2 seconds after clicking Save."

## Juice techniques as Gemini prompts
In the order the talk adds them:
1. **Color-coding** [0:02:04] — "color the correct-answer button green and the wrong-answer buttons red instead of leaving them all grey."
2. **Tween a spawn-in position** [0:04:23] — "when a new card appears, animate it sliding up from below into place over 400ms with an ease-out curve."
3. **Overshoot easing** [0:04:59] — "make the new card overshoot its landing spot by 15px then settle back, over 350ms."
4. **Bounce easing** [0:04:59] — "use a bouncy easing curve so the popup wobbles twice before settling, over 600ms."
5. **Tween rotation/scale, not just position** [0:04:59] — "when a tile is placed, animate its rotation from -10deg to 0deg and its scale from 0.8 to 1 over 300ms."
6. **Random per-item delay** [0:04:59] — "stagger the 5 cards' entrance animations with a random 0-150ms delay each so they don't all move at once."
7. **Object reacts to input (squash on move)** [0:05:39] — "squash the button to 90% height for 100ms on click, then ease back to 100%."
8. **Scale-pulse on impact** [0:06:12] — "when the player clicks a target, scale it up to 120% then back to 100% over 200ms."
9. **Rotate to face direction of motion** [0:06:12] — "rotate the moving sprite to face the direction it's currently moving."
10. **Stretch along velocity** [0:06:49] — "stretch the ball slightly along its direction of travel when moving fast, and ease it back to round when it stops."
11. **Flash color on hit** [0:06:49] — "flash the clicked element white for 100ms, then fade back to its normal color over 300ms."
12. **Nearby objects pulse on event** [0:06:49] — "when a block breaks, make the 4 neighboring blocks briefly scale to 105% and back."
13. **Add sound to every core action** [0:08:46] — "play a short click sound on every button press, a different sound for correct vs. wrong answers, and background music that loops quietly."
14. **Particle burst on success/impact** [0:09:26] — "when the player wins a round, spawn 12 small particles that burst outward and fade over 700ms."
15. **Tween-fade an object out on removal** [0:10:03] — "when an item is deleted, fade its opacity to 0 and shrink it to 0% over 400ms before removing it."
16. **Fall-away with gravity + spin on destroy** [0:10:39] — "when a block is destroyed, make it fall downward with increasing speed and spin as it falls, then disappear after 800ms."
17. **Darken removed objects** [0:10:39] — "make destroyed blocks turn dark grey immediately so they read as 'gone' while they fall."
18. **Confetti burst on big win** [0:11:49] — "on game win, spawn a 2-second confetti burst of small colored rectangles falling from the top."
19. **Motion trail** [0:11:49] — "draw a fading trail of the last 8 positions behind the moving piece."
20. **Screen shake, tunable intensity** [0:12:24] — "when the player clicks, shake the whole screen 4px for 100ms; on a big hit, shake 12px for 200ms."
21. **Eyes on a game object** [0:12:56] — "draw two small circles as eyes on the player's paddle that briefly disappear every few seconds to look like blinking."
22. **Eyes track a target** [0:13:28] — "make the paddle's eyes shift slightly to look toward the ball as it moves."
23. **Expression tied to game state** [0:13:28] — "make the paddle's mouth curve into a smile when it hits the ball and a frown when the ball is missed, by scaling a simple shape."

## Before/after examples from the frames
- [0:00:00]-[0:02:00] (sheets 1-2): pure talking-heads on a conference stage, title slide "Juice it or lose it" on the projector — no game content yet, confirms the talk opens with framing/definitions before any demo.
- [0:02:08]-[0:02:32] (sheet 2): the projected Breakout grid visibly changes from plain white/grey blocks to colored (pink/red) blocks with an orange paddle — matches [0:02:04]'s color claim exactly, and the difference is genuinely visible even in a low-res still.
- [0:02:56]-[0:04:08] (sheet 2): four small graphs showing different easing curve shapes (linear, ease-out, overshoot, bounce), followed by the actual code line `x += (target - x) * .1` shown on the projector — this is the one moment the talk shows real code, worth pointing a kid at directly.
- [0:07:52]-[0:08:24] (sheet 4): the two-circles sound demo — two grey then brown circles slide toward each other and visually overlap/pass through with no other change; matches the transcript's claim that adding a sound at the overlap moment is what makes it read as "bouncing" rather than "passing through." The frames alone don't prove the sound difference (they're silent stills) but confirm the visual setup described.
- [0:12:00]-[0:12:16] (sheet 6): a green line trail visibly follows the ball's path across the screen — matches the ball-trail idea at [0:11:49].
- [0:14:48]-[0:15:12] (sheets 7-8): the projected screen shows a chaotic radiating burst of yellow lines and a blue-tinted flash covering most of the frame — visibly the "freight train mode" screen shake cranked to an extreme, exactly as described at [0:12:24], and it does look close to unreadable, supporting their own "be careful with this" warning.
- [0:15:04]-[0:15:20] (sheet 8): two small circles visible on the paddle (the eyes) once the game returns to a calmer state — confirms the eyes effect is present in the final "everything on" state, though the low-res frames can't show blinking or the smile/frown.

## Page material
- Rules of thumb:
  - Juice is feedback layered on top of a working game — build the mechanic first, then juice it; juice cannot fix a game that isn't fun.
  - Prefer easing (a curve over time) to instant snaps for anything that changes state: position, size, color, opacity.
  - Sound is the cheapest, highest-impact juice you can add — even one bounce sound changes what an animation reads as.
  - Small per-object randomness (a random delay, a slightly different pitch) reads as "alive"; perfect uniformity reads as robotic.
  - More is not always better — screen shake and other big effects have a point where they stop helping and start breaking the game (their own "freight train mode" example).
  - Don't build your own tools (particle engines, tween libraries) when a good one already exists — that's a time trap, not craftsmanship.
- Exercises:
  - Take a button or action in your own app and add ONE easing animation to it (e.g. a card that slides in over 400ms instead of appearing instantly). Screenshot before/after — can you feel the difference even though the layout is identical?
  - Add a sound effect to your app's main action (a click, a correct answer, a level-up) and compare with sound muted vs. unmuted. Which one feels more like "a real app" instead of a demo?
  - Pick one object in your game or app and give it "eyes" (two small circles) that track something relevant, or an expression that changes with game state. How much code did that actually take?
- Quiz:
  - Q: What's the difference between an object's position just "jumping" from A to B and it "tweening" from A to B? A: Tweening animates through intermediate values over a set duration using a curve (easing equation); jumping changes the value instantly with no animation.
  - Q: According to the talk, why did adding a sound effect to the two-circles clip change how people perceived the animation, even though nothing about the movement itself changed? A: The sound at the moment of overlap cued the brain to interpret it as a bounce/collision rather than the shapes passing through each other — juice/sound shapes perceived physics, not just decoration.
- For our Apps Script / Google Sheets games (turn-based or idle, no true real-time): almost everything in this talk is pure frontend (HTML/CSS/JS) and applies directly, because the "turn-based" limit is about server sync, not about what happens inside one browser page. Tweening/easing (CSS `transition`/`@keyframes` or a small JS lerp loop), color feedback, squash-and-stretch on click, particle bursts (canvas or absolutely-positioned divs), screen shake (briefly translating a container element), sound effects (`<audio>` tags), and the eyes/expression trick (simple divs or canvas shapes bound to game state) all work fine when a kid clicks "attack" or "end turn" and waits for the page to react — the juice happens client-side, instantly, before or after the Sheet write. What doesn't fit: none of it requires real-time sync, so nothing here is actually blocked by the turn-based constraint — the only things that wouldn't transfer are genuinely twitch-timing multiplayer effects (e.g. juice that depends on two players' inputs landing in the same frame), which this talk doesn't even cover since it's single-player.

## Caveats
Made in 2012 for Flash-era 2D game dev — the on-screen code snippet and "tweening engine" talk assume ActionScript/Flash conventions, but the underlying technique (`value += (target - value) * factor`, or CSS `transition`/`requestAnimationFrame` today) is identical in any language and is the actual reusable content, not the syntax. No tool names like Figma or Aseprite come up — this is a live-coded engine demo, not a tutorial in a specific art tool, so there's nothing tool-specific to strip out. The talk is short on explanation and long on demonstration ("look at it!") — it's a great watch but a thin read; don't rely on the transcript alone, the frames/video carry most of the actual content. Their "100% of the time" claim about juice making a game better is their own rhetorical flourish for a conference crowd, not a rigorous claim — treat it as "almost always a good idea for a nearly-finished game," not a universal law. Nothing here is a promo; it's genuinely a craft talk with real content, considered a classic in the field for good reason.
