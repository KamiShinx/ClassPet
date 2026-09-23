# Round 2: engineer

Tags as in round 1: **[repo]** = checked in the 26.2 reference mod; **[own]** = my own knowledge, unchecked.

## What I concede

1. **Realist: buffers and a smaller floor.** Holidays, illness and a dead-network day will cost about 2 sessions.
   My plan fits a creature, a place and a boss into 20 weeks with only one bug-fix week and one freeze week, so it
   has no slack. The realist's floor is right (1 place, 3 items, 1 reskinned mob, 6-8 tooltips); my boss was the typical kid.
2. **Realist: run the showcase as a seat rotation on the owners' laptops,** not jars loaded together on Ben's
   machine. That removes the load-order risk I raised.
3. **Skeptic: a zero-coder can't judge Java.** My week-20 item "can explain why Gemini's code didn't compile" was
   weak. What a kid can judge is **behaviour against their own claims** ("glows red 1 s before it lunges"). The
   Gemini-Lied log should record behaviour gaps, not stack traces.
4. **Game design:** a 6-minute cold playtest fits every session, not only showcases.
5. **Advocate:** a 3D item by week 2 is doable (a JSON drop-in, [repo]). My week 3 was too cautious.

## What I still dispute

- **Game design, "the Place = rule bundle" in weeks 3-6 and a 3-phase boss.** A night rule, weather that "changes
  3 things", and a lock-and-key door are all event-handler or custom-block code. The reference has one example
  of this kind of code: `LivingDamageEvent` in `ModEvents` [repo]. So those weeks are exactly where Gemini has
  the least to copy, and the kids have the least debugging behind them. Keep one rule, after the items. A boss
  has no reference at all, so the target is 2 phases, with 3 as a stretch.
- **Advocate and realist, "one ruin" and "one built structure".** Making a structure generate in the world
  (worldgen) is unverified: the repo has ore, trees, bushes and mob spawns, but no structure. **Engineering
  answer:** the place is **hand-built in a saved world** (creative mode, the kid's own blocks, a chest filled by
  the kid's loot table [repo: loot tables exist]). That costs no worldgen code and tells the story just as well.
  Showcases load that world.
- **Advocate, the drawn "lore web".** [own] FlutterFlow has no native graph view. Show links as a list, green
  only when both cards are *in game*: the same "lit links" metric, without the drawing.
- **Skeptic, 3 mobs and the paste flag.** A third mob competes with the signature mob for debugging time.
  [own] Paste detection and version history are custom work in FlutterFlow; the oral "explain it" check does
  the same job for free.

## Hebrew, and the fallback for "copy lang"

**The coordinator's new facts:** vanilla reorders right-to-left text (BiDi) only when the game language is
Hebrew or Arabic; chat input still renders reversed; Mojang has open RTL bugs; a community mod, HebrewFix,
supports 26.1-26.3. Tooltips and books on 26.2 are unverified. **The design survives, because the join key never
depends on the language.** Each card stores `registryName`, `tooltip_he` (the kid writes it) and `tooltip_en`.
"Copy lang" exports the same keys (`item.<modid>.<name>`, `tooltip.<modid>.<name>.tooltip` [repo pattern]) into
`he_il.json` and `en_us.json`. Which file the players see is a setting, not a course redesign.

**Test on day 0 (Ben, 1 hour):** an item name, a tooltip, an advancement title and description, an effect
name, a written book and a sign. Run each in three setups: (a) game language English, (b) game language Hebrew,
(c) game language Hebrew with HebrewFix in the dev run [own: added as a runtime-only dependency, so the kids'
code never touches it; its license and 26.2 build need checking].
**Decision rule:**
1. (b) renders correctly → every laptop, including at the showcase, plays in Hebrew. Chat is never used for lore.
2. Only (c) renders correctly → ship HebrewFix in the template, pinned to one version.
3. Neither → **in-game text is English** (2 short sentences, Ben or a classmate checks the translation; Gemini
   may translate but not write). The Hebrew original stays the card's main field on the platform and in the
   showcase tour. Lore still reaches the player through the game, just in English.

## The one idea I'd steal

**Skeptic's checkable claims:** 2-3 things you can see or count, predicted before the run and ticked after it.
They make the card the test for what Gemini builds, the only verification a zero-coder can do. On the platform
it is one repeating field with a tick box.

## Revised recommendation (10 lines)

1. **Week 0 is Ben's:** template (own mod id, `reference/` folder of 26.2 examples, rules file of renames, one `play.bat`), Hebrew test, mob-pipeline dry run, install night.
2. **Weeks 1-4:** textured item in week 1, 3D item in week 2, tooltips, food/tool stats, one status effect. Objects that work beat documents.
3. **Weeks 5-8:** block + recipe + loot; the place hand-built in a saved world with a loot chest; ONE night/weather rule; a reskinned mob.
4. **Week 9 buffer; week 10 showcase** as a seat rotation.
5. **Weeks 11-15:** the signature Blockbench mob, with a teacher template as the fallback. Weeks 16-17: 2-phase boss or a second rule (tiered).
6. **Week 18 freeze and advancement lore path; week 19 playtest; week 20 showcase.**
7. **Every session:** card with 2-3 claims → build in class → claims ticked → 6-minute cold swap → commit. Homework is design and art only.
8. **Platform v1:** one `cards` collection (registryName, claims, `tooltip_he`/`tooltip_en`, status, links), tips, the Gemini-Lied log, the gallery.
9. **Out of reach:** dialogue, quests beyond advancements, GUIs, companions, a dimension per kid, worldgen structures and biomes.
10. **Floor:** realist's. **Typical kid:** a custom mob, a boss for the stronger half.
