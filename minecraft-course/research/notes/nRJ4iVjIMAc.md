# What Makes Good Rhythm Game UX? (Design Doc, 16.1 min)

**What it is:** A UX checklist for rhythm games - input-lag calibration, sight-reading aids (color/shape cues), and how "rhythm hybrid" games (Hi-Fi Rush, No Straight Roads, BPM) succeed or fail at folding rhythm into another genre.
**Substance:** substantive and well-argued, but it's about audio/input-timing UX (lag calibration, note-highway readability) that has literally no equivalent system in Minecraft. Sponsor read (Displate) mid-video.

## Ideas, in the video's order
- [0:02:50]-[0:06:36] Lag calibration: rhythm games must compensate for a player's specific audio/video delay; automatic calibration (play a practice round, measure the average offset) beats asking players to guess a number. Pure audio/timing engineering, no Minecraft equivalent.
- [0:07:09]-[0:09:13] Sight-reading aids: color-coded beat cues (DDR), guitar-fret-shaped note highways (Guitar Hero), and a path shape that IS the input (A Dance of Fire and Ice) all let players react correctly to a pattern they've never seen before. Beat Saber's failure case: at high difficulty, direction arrows get physically hidden behind other blocks, breaking sight-reading.
- [0:09:46]-[0:12:57] Rhythm hybrids (Hi-Fi Rush, No Straight Roads, BPM) split player attention between genre mechanics and rhythm mechanics. Best case (Hi-Fi Rush): tie rhythm to EVERYTHING (world animation, attack timing, enemy movement) so it's not an optional layer - reinforced constantly, and off-beat play is punished consistently. Worst case (No Straight Roads): only the enemies/world keep the beat, not the player's own actions, which makes the whole rhythm layer feel disconnected and skippable. This is the one idea worth carrying forward: **commit a mechanic to everything it touches, or the half-applied version will feel like a bolt-on.**
- [0:13:27]-[0:14:02] Accessibility for newcomers: a toggleable on-screen timing-assist bar (Hi-Fi Rush) helps new players learn the rhythm, then can be turned off once they don't need it - good "scaffolding you can remove" pattern.

## What the frames add
Confirms the sight-reading claims visually: DDR's color-coded arrows, Guitar Hero's fretboard note highway, and Beat Saber's laser-sword cubes are all shown clearly, which does make the "shape/color as a legibility tool" point land better than text alone. Otherwise pure gameplay clips, no diagrams.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"All the way or not at all" consistency check**: if a kid adds a new mechanic (a status effect, a new resource, a biome rule), have them list every system it SHOULD touch, then check they applied it to all of them - not just the flashy one. Modeled on Hi-Fi Rush (rhythm touches world, attacks, enemies - feels essential) vs. No Straight Roads (rhythm touches only enemies - feels tacked on) [0:10:17]-[0:12:23]. ~15 min worksheet, genuinely new phrasing of a design discipline not quite covered by earlier batches' checklists.

### Survives the move to Minecraft?
The consistency-check idea survives as a spec-writing habit, no Minecraft-specific translation needed - it applies to any new mechanic a kid designs (a "cursed" item effect should probably affect combat AND movement AND maybe visuals, not just one stat, if it's meant to feel important). Buildable: NeoForge attribute modifiers and particle/sound hooks can touch multiple systems from one effect.

### Doesn't transfer
Everything audio-timing-specific (lag calibration, note-highway sight-reading, beat-synced choreography) has no Minecraft mechanic to attach to - there's no rhythm gameplay in a Minecraft mod, and building one from scratch is far outside a NeoForge item/mob/block mod's scope for this class.

## Honest caveats
Low relevance as flagged - most of the video is audio-engineering UX with zero Minecraft surface area. The one idea worth keeping (apply a mechanic consistently across every system it should touch, or it feels bolted on) is a genuinely distinct angle from this batch's other "does it transfer" and "stay focused" checklists, but it's still a small addition, not new content requiring its own module.
