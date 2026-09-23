# How To Think Like A Game Designer (Game Maker's Toolkit, 13 min)

**What it is:** Mark Brown explains the MDA framework (Mechanics -> Dynamics -> Aesthetics) as a tool for deciding whether a borrowed or invented mechanic fits your game, using Alien: Isolation's save system as a running example.

**Substance:** substantive: one clear framework (MDA), explained with a real before/after case study (Alien: Isolation's checkpoint save vs. manual save) and eight or nine supporting examples (Zelda weapon durability, Flower, DOOM, Dead Space score, Hi-Fi Rush). No padding, no sponsor read.

## Ideas, in the video's order
- [0:00:00] Case study: Alien Isolation originally used automatic checkpoint saves (copied from other games) because it was easy and familiar, not because it fit the game.
- [0:01:06] It's fine to borrow mechanics from other games, but you must understand *why* they work in the source before reusing them (generic-sounding but the video backs it with the case study).
- [0:01:39] The MDA framework: Mechanics = the rules/code/numbers. Dynamics = how the player behaves in response. Aesthetics = how the player feels (not graphics/art style - emotional response).
- [0:02:44] Mechanics happen in code, dynamics happen in player actions, aesthetics happen in player feelings - designers only directly control mechanics; dynamics/aesthetics cascade from that.
- [0:03:14] Worked example: high ammo -> reckless/powerful dynamics and aesthetics; scarce ammo -> cautious dynamics, fear/disempowerment aesthetics. Same "give player ammo" mechanic, opposite tuning, opposite feeling.
- [0:03:47] Apply MDA as a question to any existing mechanic: "why does X work in this game?" (example: Zelda weapon durability -> forces switching/sneaking -> feels crafty, underpowered, like an explorer in decay).
- [0:04:53] Aim for specific emotion words (powerful, sneaky, tense, curious, deceitful) rather than vague "fun" - this is the actual design vocabulary the video is teaching.
- [0:05:23] Case: Flower cut levelling, spells, resource management and time limits because they clashed with the intended feeling of relaxation, even though they're "normal" game features.
- [0:05:55] Have a one-line "vision statement" for the whole game/project (Subnautica: "thrill of the unknown"; Resident Evil Village: "struggle to survive"; DOOM 2016: "push forward combat") and use it to judge every mechanic.
- [0:06:56] Non-mechanic elements (music, art, animation, camera) also create aesthetics and should point the same direction as the mechanics (Dead Space score rewritten because it made players feel heroic instead of scared).
- [0:08:02] A real game is not one mechanic but hundreds/thousands interacting, and they can undermine each other (Callisto Protocol: scarce ammo for fear, but an instant-kill stealth kill that makes you feel powerful - contradicts itself).
- [0:09:02] You can guess how a mechanic will land, but only playtesting tells you for sure; players can find unintended ("degenerate") strategies, like beelining to the next checkpoint to die safely in Alien: Isolation.
- [0:09:34] Sometimes you want the emotional arc to change over the game (character starts weak, ends powerful) - mechanics should be able to shift accordingly.
- [0:10:07] Aesthetics are subjective and skill-dependent: a scoring system excites one player and stresses another; Hi-Fi Rush's rhythm mechanic makes a skilled player feel like a rockstar and an unskilled one feel inept.
- [0:10:38] Resolution of the case study: Alien Isolation switched to slow, manual, interruptible saves - which made saving itself a tense, feared act that reinforced the horror vision.

## What the frames add
Confirms the video is talking-head + game footage b-roll + clean text/diagram title cards, nothing not already in the transcript. The MDA flow is shown as literal text cards ("MECHANICS -> DYNAMICS -> AESTHETICS", each with an icon: gear/lightbulb/mask) at [0:01:48], [0:03:36] and [0:11:48] - a ready-made three-box diagram a teacher could redraw on the whiteboard format. Otherwise nothing: gameplay clips (DOOM, Zelda, Callisto Protocol, Rocket League, Hi-Fi Rush) are illustrative, not additional information.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Name the feeling" card (10 min):** before a kid designs any item/mob/block, they write one word for the feeling they want the player to have when using/fighting it (powerful, scared, sneaky, smart, silly...). This becomes the one-line brief they hand to Gemini, replacing "make it cool."
- **Mechanic-to-feeling worksheet (15-20 min, pairs):** for an existing vanilla Minecraft mechanic (creeper explosion, elytra, totem of undying, hunger), kids fill in Mechanic / Dynamic (what do you do?) / Aesthetic (how do you feel?) in three boxes, then invent ONE new item/mob whose mechanic is designed to produce the SAME feeling from a different action. Directly reuses the video's own 3-box diagram.
- **"Does it fit?" check before building (5 min, ongoing habit):** once a kid has a mod idea, they ask "does this make the player feel the thing my world/character is about?" - a cheap filter against random unrelated gimmicks, tying game design back to their worldbuilding.

### Survives the move to Minecraft?
The MDA framework survives almost unchanged - it's medium-agnostic and doesn't require complex mechanics to apply. A single custom item with one on-use effect is enough to ask "what will this make the player DO, and how will that FEEL." The "vision statement" idea maps well onto "what is my mod's world about" (which the worldbuilding half of the course already does) - this is the natural bridge Ben was looking for between worldbuilding and game design. The multi-system interaction points (0:08:02, mechanics undermining each other) are realistic for a mod with 2-3 custom items but won't come up until kids have several mechanics live at once - worth flagging in week planning, not week 1.

### Doesn't transfer
The playtesting/iteration argument (0:09:02) is real but the class has no time for real playtesting loops - 8 kids, one mechanic each, 65-70 min sessions. Best this can become is "ask a neighbor to try it and tell you how it felt," not a design-test-redesign cycle. The accessibility-of-versatile-verbs point isn't in this video (that's the next one) so no note here.

## Honest caveats
Nothing in this video is wrong or oversold for our purposes - it's a tight, well-cited piece (quotes named designers throughout) and the single framework (MDA) is genuinely the most transferable idea in this batch. My own extrapolation: the video's examples are all AAA games with complex, interacting systems; scaling the framework down to "one item, one feeling" for an 11-13-year-old in one lesson is my simplification, not something the video demonstrates - it never shows MDA applied to something as small as a single Minecraft item.
