# Teaching Game Mechanics Well - Guidance VS. Hand Holding (Design Doc, 11.8 min)

**What it is:** A breakdown of the "isolation principle" for teaching a mechanic through play instead of text,
plus two case studies of handholding gone wrong (Final Fantasy 13's forced linearity, Zelda's over-obvious boss
weak points).
**Substance:** substantive: dense, example-driven throughout, no filler or sponsor read.

## Ideas, in the video's order
- [0:01:04] The core tension: too little guidance (mystery, used deliberately for tone, e.g. Dark Souls) vs. too
  much (handholding tutorials that interrupt flow) — both fail; the best designs thread the needle.
- [0:01:37] The "isolation principle," 3 steps: (1) introduce a mechanic in a safe space where mistakes aren't
  punished, (2) develop it with harder examples once the safety net is removed, (3) combine it with other
  established mechanics for a brand-new challenge.
- [0:02:43] Super Mario 3D World's "Cakewalk Flip" level walks through exactly these 3 steps with flipping
  platforms, then layers in a shockwave enemy as the "combine" step.
- [0:03:16] Portal is roughly 90% tutorial the entire way through but never feels like one, because every lesson
  is delivered as a mechanical challenge, not a text popup.
- [0:03:49] The isolation principle is harder to apply to turn-based strategy/RPGs with abstract stat systems
  (Civilization's "happiness," "science") — sometimes direct text explanation is genuinely necessary.
  (generic-by-necessity, low relevance to our class.)
- [0:04:21] Case study: Final Fantasy 13 ("Final Hallway 13") restricts player agency for a full 20 hours (forced
  linear paths, an AI-driven Auto Battle default, locked party size) before its real Paradigm combat system opens
  up — the tutorial period is far too long relative to the system's actual complexity.
- [0:08:14] A separate handholding failure mode: making a puzzle's answer too visually obvious kills challenge
  even if the tutorial itself is otherwise fine — this is "too much visual obviousness," distinct from "too much
  text."
- [0:08:47] Zelda's "dungeon item = win" problem: handing the player a new tool right before a boss that is ONLY
  solvable with that tool telegraphs the answer before the fight starts, turning a battle into a puzzle with an
  obvious solution (contrasted with Dark Souls bosses, which are about pattern-reading/execution, not finding
  "the" weak point).
- [0:09:21] Concrete example: Majora's Mask 3DS Woodfall boss — flower launchpads plus a giant glowing eyeball
  shown in the intro cutscene hand the player the solution before the fight starts; the boss "just stands there"
  while it's bombed.

## What the frames add
Pure gameplay clips matching narration exactly (Mario 3D World, Portal, FF13 combat UI, Zelda boss fights, a
brief Pokemon/Civilization montage) — nothing beyond what the transcript already describes.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **3-step isolation worksheet**: for any new item/mob ability, answer (1) where/how does a player first meet
  this with zero risk? (2) where do they need to actually use it under real pressure? (3) where does it combine
  with an existing vanilla Minecraft mechanic to make something new? 20-25 min, one page per mechanic, hands
  straight to Gemini as a build order.
- **Don't-hand-them-the-answer boss check**: if a kid is building a boss/mob with a clear weak point, the weak
  point itself must NOT be visually telegraphed before the fight (contrast with the companion video
  Vopm0YjjQcE, which says attacks SHOULD be telegraphed — see caveats for the distinction).

### Survives the move to Minecraft?
The isolation principle maps almost one-to-one onto a single NeoForge item/mob ability and is realistically
buildable — "safe room," "harder room," "combine with vanilla mechanic" are level-design and testing choices, not
new code. Likely the single most reusable checklist in this batch for the brief's "teach a mechanic to a player
who's never seen it" angle.

### Doesn't transfer
The FF13/Civilization "abstract numeric systems sometimes need text" caveat is low-relevance — kids are unlikely
to build deep menu-driven stat systems in a 20-week Minecraft mod project. Keep as background context, not a
worksheet.

## Honest caveats
Worth flagging explicitly: this video says telegraph the answer LESS (don't show the boss's weak point for
free), while Vopm0YjjQcE (Mario/Dark Souls character design) says telegraph attacks MORE (always show what's
coming). These sound contradictory but aren't — one is about readability of an incoming threat (always show it),
the other is about not handing over the solution to the whole encounter (don't show that). This distinction is my
own synthesis across the two videos, not stated explicitly in either one; teachers should present both together
so kids don't collapse them into a single, wrong instruction.
