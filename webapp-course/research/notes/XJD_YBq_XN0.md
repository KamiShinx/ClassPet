# Build a Gesture Controlled Game in Scratch Using Teachable Machine (Vizuara, 27.2 min)

**What it is:** Tutorial/build-along. An instructor builds a full mini-game (dinosaur-game clone: jump over a hazard, collect points) in MIT's block-based "Playground" tool (branded "RAISE Playground" on screen — auto-captions garble the URL as "playground.ra.mmit.edu"/"playground.it.edu"; the real product is MIT RAISE's AI-extension for Scratch-like block coding), using a Teachable Machine gesture model to control the character.
**Substance:** substantive: real build, real bugs, real fixes, all on screen — the most concretely useful video in this batch for "TM model → live game" even though the target platform isn't ours.

## Ideas, in the video's order
- [0:02:12] The whole point of this playground vs. plain Scratch: it has a built-in Teachable Machine extension block, so a trained vision model can drive game logic with zero traditional code.
- [0:06:44]-[0:07:48] Trains a 2-class image model (raise-left-hand "jump" vs. neutral "stay") with ~100 webcam images per class, moving slightly during capture for variety (echoes DFBbSTvtpy4's advice) — default training settings are fine, advanced hyperparameters skipped as unnecessary for beginners (generic but consistent across this whole batch).
- [0:08:53]-[0:09:58] Export → upload to Google's cloud → copy the shareable link → paste it into a "Teachable Machine" extension block inside the playground (`use model at [URL]`) — the exact same export/URL pattern as the other TM videos, just consumed by blocks instead of code.
- [0:10:32]-[0:11:07] Model-driven logic is event-based: "when green flag clicked" → connect the model; "when model detects [class]" is its own trigger block, one per class, that you drag onto the sprite you want it to control.
- [0:13:57]-[0:14:30] Trap, shown live: nothing happens when the game runs because the "turn on video" block (also under the Teachable Machine category, not under Sensing) was never added — a required, easy-to-forget wiring step, exactly the kind of thing an AI-assisted build silently omits too.
- [0:16:15]-[0:18:20] Building the actual game: sprite motion via "glide to position" for the jump animation, tuned by trial and error (jump height, up/down timing) until it visually reads as a jump.
- [0:16:44]-[0:20:17] Obstacle motion is a manual wrap-around loop: `forever { if x-position < left-edge, set x to right-edge; else change x by -N }` — recreated twice (once per hazard) by copy-pasting the whole script and reassigning it to the second sprite.
- [0:20:51]-[0:23:08] Scoring: `forever { if touching(hazard-A) → change score by 1; if touching(hazard-B) → set score to 0 }`.
- [0:24:13] Live bug: score jumps by 9 instead of 1 on one pass, because the "touching" check fires every frame for as long as the sprites overlap, not once per crossing — the instructor diagnoses it live as multiple-frame double-counting, a genuine event-vs-continuous-state bug.
- [0:24:47]-[0:25:56] Recording the screen while also playing visibly slows reaction time / the webcam classification loop — an honest performance caveat about running capture + inference + game loop simultaneously on modest hardware.

## What the frames add
Confirms the extension UI: a "Teachable Machine" block category appears in the palette only after adding the extension [0:09:00-0:09:30], the model-URL block and "when model detects [class]" block are visibly distinct pieces [0:09:30-0:10:30], and the two custom classes ("jump"/"stay") from the trained model auto-populate as dropdown options in that block — meaning the block UI reads the class list directly from the hosted model, not from anything hand-typed. The full game screen [0:13:20]-[0:15:50] and later gameplay with visible score counter [0:23:20]-[0:23:50] confirm the final result actually works, webcam feed and all.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
A trained model's class list is read live from its hosted URL, not hardcoded into the consuming app — concretely shows "the model is a resource, the app that uses it is a separate client," even in a no-code tool. The forgotten "turn on video" step is a clean, concrete illustration of the more general "wiring a feature requires an explicit step the AI/tutorial may skip" lesson CONTEXT.md flags as important.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
As a rapid, code-free warm-up (not in Apps Script, on MIT's own site): train a 2-gesture model, wire it to a block game, ship something visibly working in under 30 minutes — good confidence-builder in week 1-2 before any real coding starts, and a natural place to introduce "what is a model URL" before Gemini-written code hides it. Not itself a candidate for our stack since it runs entirely on MIT's platform, but its shape (gesture → class → game reaction → score) is the direct template for the "gesture-controlled trivia buzzer" project on the Netlify final build, once video is allowed.

### Traps a kid will hit
Forgetting the "turn on video" wiring block exactly as shown; expecting `touching()` to fire once per collision instead of once per frame of overlap (will produce the same runaway-score bug, and it's an easy trap to recreate in Apps Script/JS collision or "same value submitted twice" logic too — a debouncing lesson that generalizes past this one game); tuning animation timings (glide durations) being fiddly trial-and-error with no formula, which will eat time if kids expect it to "just work."

### Doesn't transfer, and why
The tool itself (MIT's block playground) is not our stack at all — no Apps Script, no Sheets, no HTML/JS. Live webcam gesture control is squarely in the "needs a live camera" bucket per CONTEXT.md, so this exact game (as shown) only becomes buildable in our stack once the frontend moves to Netlify for the final project; during the year, the same TM model would have to be driven by an uploaded photo per "turn," which changes the game feel substantially (no real-time reaction).

## Honest caveats
No date on screen, but "playground.raise.mit.edu"-style tools and this TM extension are current; nothing here reads as outdated. The instructor mis-speaks "convolutional neural network" a few times where "the trained image classifier" is more accurate, and overstates precision ("pretty accurate model") based on a two-second glance — treat performance claims as anecdotal, not measured. This is the longest video in the batch and the pacing is slow (much manual sprite-dragging); a written summary of the block wiring (as above) covers the reusable content faster than watching it.
