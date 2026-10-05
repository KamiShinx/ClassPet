# Designing AI Allies - How Games Create Great Party Members and Companions (Design Doc, 12.6 min)

**What it is:** A survey of AI-controlled companion characters (not player-controlled party members) across games, with case studies of what makes their automated behavior feel good or bad.
**Substance:** substantive: dense case-by-case analysis with a real throughline (framing + expectations + mechanics/story tension), not just a listicle.

## Ideas, in the video's order
- [1:13] Loss Aversion framing: an AI that occasionally gives bonuses (upside-only) feels better than one you "depend on" and can fail you, even at equal average value.
- [1:48] Monster Hunter's palicos: low damage but high utility (status weapons, heals, traps, stealing materials), no real penalty if they faint, autonomous but commandable. Works because the game never frames them as doing "real" hunting.
- [2:48] Design rule: an AI ally's power should match how the game frames its role. Overpromise the role (Star Fox Assault, Ace Combat 7 wingmen that are "just for show") and the mismatch reads as broken, even if by design they were never meant to carry weight.
- [3:19] Kingdom Hearts 1/2 Donald & Goofy: default AI wastes items/MP and can't keep up late-game; becomes decent only if the player manually reconfigures their skill/behavior settings. Lesson: exposing tuning knobs to the player can rescue a weak default AI.
- [6:58] Final Fantasy XII's gambit system: player explicitly programs allies with if-then rules ("if HP<30%, heal") and prioritizes rules top-to-bottom. Micromanagement is fine here because the game frames it as the core skill, unlike Kingdom Hearts where it's a workaround.
- [8:33] God of War 4's Atreus: contributes constantly via one button (shoot/summon), needs almost no micromanagement, and the game deliberately makes him unreliable during specific story beats to mirror the plot (generic).
- [9:36] Deltarune's Susie: an ally who sabotages a pacifist playstyle on purpose, as a characterization device rather than a real gameplay obstacle — annoying AI behavior can work if tied to a legible story reason.
- [10:36] Persona 3 (console versions): party members you can't fully control, only nudge with broad orders ("conserve SP"); can lose fights to bad ally AI decisions even though you did everything right — cited as a real design failure, not just spice.
- [11:40] Overall framework (generic but earned): companion AI has to balance "helps without stealing the fun" against "doesn't need constant hand-holding," and mismatched framing (what the game says vs. what the AI does) is the most common failure mode.

## What the frames add
Nothing beyond illustrating each game discussed (gameplay capture, a couple of text title cards like "GAINING SOMETHING / LOSS AVERSION / LOSING SOMETHING"). No original diagrams.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"One job" companion worksheet (20 min)**: before building a tameable companion mob, the kid answers on paper: what's the ONE thing it's good at (damage, distraction, buff, resource-finding)? What happens if it "fails" — does the player lose something, or just not gain a bonus this time? Comes from the Loss Aversion / palico idea [1:48]. Output: a one-paragraph spec Gemini can build a NeoForge mob-AI goal from.
- **Framing check tooltip**: a one-line rule card taped to the "mob behavior" section of the platform — "if you tell players your companion fights, it has to actually fight. If it can't, don't promise it." Comes from the Star Fox mismatch idea [2:48].

### Survives the move to Minecraft?
Directly buildable: a tamed companion mob (wolf/cat-style, tameable per CONTEXT.md) with a custom NeoForge AI goal that does ONE utility thing well (apply a status effect, mark/distract a hostile mob, pick up drops) rather than trying to out-damage the player. This is a real, scoped mod task Gemini can write. The gambit idea (player-authored if-then rules for an ally) is a stretch goal for an advanced kid — it's really just a simplified version of "tell the mob what to prioritize," which could become a crafted item (a "command tablet") that toggles a couple of preset behaviors, not a full rule editor.

### Doesn't transfer
Story-conditional AI behavior changes (Atreus/Susie turning unreliable at a scripted story beat) needs a story/state system this course doesn't have — no branching narrative engine. Full manual AI reconfiguration menus (Kingdom Hearts) and the FFXII gambit priority list are too much UI for a 65-min/week project; at most a toggle or two survives.

## Honest caveats
The video's framework ("framing must match capability") is solid and specific, not generic filler. The Atreus and Susie sections lean on story/game-feel points that are really character-design content, not mechanics a kid can spec in NeoForge terms — flagging as the weakest transfer of the video's ideas. No factual concerns.
