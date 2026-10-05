# Round 2: the realist seat

**[practice]** = my own classroom or tooling knowledge, not from the research.

## What I concede

1. **My "place" assumed a worldgen structure, and the reference has none.** It also has no boss, boss bar,
   quest or dialogue example (r1_engineer §5.1). I take the engineer's version of the place: biome spawns and
   ores via `ModBiomeModifiers`, plus one night or weather rule. **[practice]** The hand-built ruin and loot chest
   live in the kid's saved world. The showcase runs on the owner's laptop, so nothing has to generate.
2. **Cold playtests every week, not only at showcases** (r1_gamedesign §5.B). My projector slot was
   show-and-tell. A 6-8 minute swap is the most motivating part of a session at this age **[practice]**. My
   condition: a broken build gets its last working commit tested, so the swap never stalls.
3. **My cards were forms, and forms get filled with junk.** The skeptic's fix: each card carries **2-3 claims you
   can see or count** ("glows red 1 s before it lunges; dies in 4 hits"). Judging Gemini on behaviour rather than
   Java is something a zero-coder can do (r1_skeptic §5.1). I also take the skeptic's rule: Gemini interviews and
   critiques, but never writes the cards.
4. **The writer kid needs more than one lore book.** The advocate's ~80-word iceberg field gives them a bounded
   outlet. "Nothing is lore until it is in the game" is my claim A, better phrased.
5. **Hebrew is partly confirmed.** Vanilla reorders right-to-left text only when the game language is set to
   Hebrew or Arabic (coordinator's check). Platform text is Hebrew. The in-game language waits on Ben's week-1
   test. I would not make every kid's mod depend on a community mod (HebrewFix).
6. **Adopted from the engineer:** a unique mod id from day 1, and a `play.bat` that runs `runData` then
   `runClient`.

## What I still dispute

- **A boss in the week-20 floor** (gamedesign seat). No boss exists in the reference, so Ben must build one
  first, and the engineer's own estimate is "maybe 5 of 8". A floor must survive two missed sessions
  **[practice]**. The boss is a stretch goal.
- **The engineer's "median" is really the top third**: 8-12 items, 2 effects, an animated mob, 5-8
  advancements. The line counts measure a tutorial author, not an 11-year-old. After absences, setup debt and the
  queue for Gemini help, the median is about half that list.
- **The advocate's "1,000-1,500 words of lore" doesn't fit their own 2-sentence cap.** Twenty tooltips come to
  about 400 words; the rest is iceberg nobody plays. The quest chain and guardian boss have no reference example.
  The lit lore-web is a good idea but a costly one: v2, after the cards work.
- **The skeptic's paperwork**: a build log per session, a prediction box, weekly oral checks and a paste flag.
  The skeptic predicts it dies by week 6. Keep the claims. Move the oral "explain it" to the showcases. The card
  status plus one Gemini-lied line replaces the build log.
- **"Double or halve at minute 35."** Mid-build, eight kids are at eight different points and someone is always
  stuck **[practice]**. Make it a tip card kids pull when they need it, not a timed class step.
- **Weeks 1-3.** Without an install before week 1, the first item lands in week 3.

## The one idea I'd steal

**The engineer's `reference/` folder plus a rules file of 26.2 renames.** My worry was the teacher becoming the
queue, and this is the only proposal that cuts Gemini failures *before* they reach Ben. What follows from it
should decide the syllabus: **a feature is cheap only if a working 26.2 example exists to copy.** Still untested:
whether Gemini adapts well when pointed at the reference.

## Revised recommendation (10 lines)

1. **Week 0 is a real session:** install at home with a checklist and a Gradle cache on USB. Ben tests Hebrew in
   the game, the mob export, and one boss.
2. **Syllabus rule:** a feature is taught only once `reference/` has a working example of it. Until Ben adds
   a boss, bosses stay stretch-only.
3. **Order:** item (W1-2), items with costs and 3D (W3-5), bend one system (effect, night/weather rule, biome
   spawns: W6-8), buffer (W9), **showcase (W10)**, reskinned mob then Blockbench mob (W11-15), signature choice
   (W16-17), freeze (W18), playtest (W19), **showcase (W20)**.
4. **Session:** start runClient; one card (8 min); claims (6); build (~30); cold swap (7); screenshot, status,
   commit.
5. **Homework** is art and writing only. No session depends on it.
6. **Platform v1:** scope grid, object cards (`registryName`, 2-sentence tooltip, 80-word iceberg, claims,
   status), inline tips, Gemini-lied log, gallery.
7. **Floor, absences included:** 3 items (1 in 3D), 1 bent rule, 1 reskinned mob with a tell, 6-8 tooltips found
   in the game.
8. **Typical kid:** 5 items, a Blockbench mob, a hand-built ruin. **Top third:** a 2-phase boss or a second mob.
9. **"Insane"** means one small, dense world where everything connects and a stranger can play it cold.
10. **Fallback, always:** the last working commit plus the template mob.
