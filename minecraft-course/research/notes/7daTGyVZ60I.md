# The Secret of Mario's Jump (and other Versatile Verbs) (Game Maker's Toolkit, 12.5 min)

**What it is:** Mark Brown catalogs ways a single button/action ("verb") can be made to do multiple things depending on how it's pressed, held, released, combined or timed, using Mario's jump and a dozen other games as examples.

**Substance:** substantive: a clear taxonomy (press vs. hold, hold-then-release, double-press, verb+verb combos, verb+movement) each illustrated with 2-4 named games. Ends with an honest accessibility caveat. No padding.

## Ideas, in the video's order
- [0:00:00] Mario's jump in Donkey Kong (1981) was a simple "press A, get one fixed jump" verb; in later games it became "versatile" - one button with many outcomes depending on how it's used.
- [0:01:07] Core concept: a "versatile verb" is one action that produces different results depending on execution, which gives interesting choices, expression and satisfaction from very few buttons.
- [0:01:39] Press vs. hold can do nothing extra (Owlboy) or unlock a different behavior (Mega Man X: tap = weak shot, hold = charged shot).
- [0:02:46] Hold, then release-to-fire (cooked grenade in shooters) turns timing into a risk/reward decision, distinct from a simple charge shot.
- [0:03:18] Hold one button to do action A, but must release the SAME button to do action B (Luftrausers: hold to shoot, release to repair/heal; Dark Souls: hold shield to block, but stamina only regens when you drop it) - forces the player to oscillate between offense and defense using one input.
- [0:04:56] Press the button a second time within a timing window for a different/better outcome: double jump, reload-timing bonus in Gears of War (this is a "second-press" verb, distinct from holding).
- [0:06:02] Combining TWO different verbs/buttons in sequence within a timing window creates a new, third move (Psychonauts: attack right after jump = new "palm bomb" move) - button combos should feel like the natural result of combining the two actions, not an arbitrary new bind.
- [0:07:41] Combining a button with analog-stick direction multiplies outcomes hugely (Mario's jump arc/height/direction is shaped by movement speed and stick input before and during the jump).
- [0:08:16] Mario's jump also combines with crouch: crouch+jump = backflip, run+crouch+jump = long jump, crouch in midair = ground pound (which can chain into another jump). These advanced moves are optional - never required to finish the game, just expression/speedrun tech for players who want it.
- [0:09:22] Benefit: versatile verbs reduce the number of buttons/systems a game needs (Luftrausers ties healing to the shoot button instead of adding a heal button + pickups).
- [0:09:55] Caveat (important, stated directly): versatile verbs built on holding, mashing or multi-button combos can be genuinely inaccessible to players with motor disabilities - check accessibility guidelines.
- [0:11:37] Framed as "part one" - promises a follow-up video on other things that make verbs interesting (not covered here).

## What the frames add
Confirms this is entirely illustrative gameplay footage (Mario 3D World, Mega Man X, Motorstorm, Dark Souls, Devil Daggers, etc.) plus clean diagram cards, nothing beyond the transcript in content terms. Two diagrams are directly reusable as teaching visuals: [0:05:12] shows the combo chain as "A -> B, A -> C" (press A once = one move, press A again = a different move) and [0:08:12] shows one button fanning out into many outcomes ("A + [8 directions] -> 8 different labelled moves: float/drop, jump/ground pound/spring jump, triple jump" etc. at 0:10:48-0:11:12). These are a ready-made "one verb, many branches" flowchart format a teacher could put on a worksheet.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"One item, three uses" worksheet (15 min):** for a custom item a kid is designing, they fill in a branching chart (reused from the video's own A->B/A->C diagrams): what happens on a quick right-click vs. holding right-click vs. right-click while sneaking/sprinting. Forces them to spec exactly what Gemini should build instead of "make it do something cool."
- **Verb combo card game (10 min, whole class or pairs):** hand out Minecraft's existing verbs (mine, place, hit, sneak, sprint, jump) on cards; kids pick two and invent what combining them could unlock for their custom item/mob (e.g., "sneak + right-click on my item = throws it as a boomerang"). Directly modeled on the Psychonauts jump+attack example.
- **Accessibility check-in (2 min, folded into any item pitch):** "does using this require mashing or holding for a long time? Would that be hard for someone?" - a real, video-sourced habit that costs almost nothing to teach.

### Survives the move to Minecraft?
This maps unusually well onto NeoForge item coding, because Minecraft/Forge items already expose exactly these hooks: `useOnRelease` / hold-duration (bow, trident, crossbow charge), right-click vs. sneak+right-click, and item-use tick counters - a kid's "hold to charge, release to fire" design is a very natural custom-item ability for Gemini to implement, not a stretch. The crouch/jump-combo material (Mario's ground pound chain) maps onto mob AI or a custom "ability" triggered by sneak+jump, which is buildable but needs Gemini to hook player input events - more advanced than a simple item, better suited to a mid-course lesson once kids already have a working custom item.

### Doesn't transfer
The framing "Minecraft already has its own verbs" cuts hard here: Mario's verb design is about inventing a single, elegant core mechanic (the jump) from scratch and mining it for depth over an entire game. A Minecraft mod kid isn't inventing a new movement verb - they're adding ONE item/mob on top of an existing, already-verb-rich game. The "one verb carries the whole game" framing doesn't apply; the transferable unit is much smaller: "make my one item's single interaction do 2-3 different things depending on how it's used," not "design Minecraft's jump." Say this directly in the batch file - it's the single biggest scope mismatch in this batch.

## Honest caveats
The video's own thesis (versatile verbs reduce button count and add depth) is really a lesson for a character-action-game protagonist's core moveset - not obviously true for a single modded item in an already-complete game like Minecraft, where "button count" isn't the constraint (Minecraft already has right-click, left-click, sneak, sprint, etc., all fixed by vanilla). The teacher's hunch that this content teaches "insane mechanics" should be tempered: the actual transferable takeaway is narrower than the video's scope - "give your one item 2-3 context-dependent behaviors" - not the full Mario-jump-style verb design the video is really about.
