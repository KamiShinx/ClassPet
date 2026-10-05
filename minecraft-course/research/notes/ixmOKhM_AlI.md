# What Makes A Game Speedrun Friendly? (Design Doc, 15.6 min)

**What it is:** A checklist of UX/polish features that make a game friendlier to speedrunners - skippable cutscenes and tutorials, fast retries, low RNG on the critical path - then a case study of Neon White as an accessible, self-teaching speedrun game.
**Substance:** substantive as a UX checklist, but it's aimed at a finished, polished commercial game with cutscenes, tutorials, save/reload systems, and leaderboards - infrastructure an 8-kid class building one mod each doesn't have reason to build. Sponsor read (Raycon) near the top.

## Ideas, in the video's order
- [0:02:31]-[0:04:41] Cutscenes/tutorials should be skippable, but the skip must require deliberate input (press-and-hold or confirm) so new players don't accidentally skip content - generic UX safety pattern.
- [0:05:13]-[0:06:13] "Prove-it" tutorials: instead of a text box, put a small test right after teaching a skill (Celeste's double-jump platform) so players demonstrate mastery instead of reading about it. This is the one idea with some transfer value (see below).
- [0:07:17]-[0:08:25] Fast retries matter as much as skippability - Stuntman's full level reload after every failed take is presented as a cautionary tale.
- [0:08:58]-[0:09:30] Remove RNG from the critical path where possible (random loot, random stats, unpredictable AI pathing) because a run-ending bad roll feels as wasteful as a long cutscene.
- [0:10:38]-[0:14:21] Neon White case study: a drip-fed goal ladder (Neon Ranks), in-game hints that point at a faster route without solving it, built-in timers/leaderboards, and friend-leaderboards instead of only world-record chasing - makes competitive mastery approachable for casual players.

## What the frames add
Section title cards ("UNSKIPPABLE TUTORIALS," "'PROVE-IT' TUTORIALS") over gameplay footage - the cards organize the video's checklist visually but add no information beyond the narration. Otherwise pure gameplay clips of each named game.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Prove it, don't tell it" tooltip design**: when a kid's mod teaches the PLAYER something (a new item's use, a boss's tell), have them design a first encounter that lets the player try the skill immediately in a safe spot, rather than a sign or book with instructions. Comes from Celeste's example [0:05:13]. This is the one idea concrete enough to reuse, and it's really about teaching design more than "speedrunning."

### Survives the move to Minecraft?
The "prove it" idea survives fine as a design habit for any custom mechanic a kid builds (an item, a mob attack) - Minecraft already has this instinct (advancements, structure-based puzzles). Everything else (skip buttons, retry/reload speed, built-in leaderboards, friend rankings) is engine/UI infrastructure that either already exists in vanilla Minecraft (F3+quick respawn, no cutscenes to skip) or is out of scope for a kid's item/mob/block-level mod.

### Doesn't transfer
- RNG-removal-on-critical-path assumes a finished game with a "critical path" to optimize; a kid's single mob or item doesn't have one.
- Leaderboards, friend rankings, and drip-fed rank-gated level unlocks (Neon White) are meta-game/live-service features, not buildable as a NeoForge mod mechanic in this course's scope.
- Cutscene/tutorial-skip UX assumes the mod has cutscenes or lengthy tutorials to skip, which nothing in this course's scope produces.

## Honest caveats
This video is about polishing a complete, shippable game for a speedrunning community - a context that doesn't exist for an 8-kid class where nobody is optimizing anyone else's playthrough. Low relevance, as flagged. The single reusable idea (prove-it teaching) is generic instructional design, not specific to speedrunning or to Minecraft, and should not be oversold as new content.
