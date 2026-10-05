# Round 1: engineer (what can actually be built, in what order)

**[repo]** = checked in `C:/Users/Ben/code/neoforge-tutorial-26.x` @ `68-mob-spawns` (NeoForge 26.2.0.76, Gradle
9.2.1, Java 25); line counts are commit insertions incl. generated JSON. **[own]** = my own knowledge, unchecked.

## 1. Course shape: cheap and visible first, hard things after the kids can debug

| Weeks | Block | What gets built (cost from the repo) |
|---|---|---|
| 1 | Setup + first item | Template runs; one item with the kid's own 16x16 texture in the game |
| 2-4 | Items that tell the world | Items, tooltips (5 files/63 lines), food/tool stats; W3 = **Blockbench 3D item** (8 files/260 lines, 247 of them Blockbench's own JSON, so about 13 lines of glue) |
| 5-7 | Bend one system | Status effect (6 files/64) + potion (5/43); block + recipe + loot; W7 advancements as the lore path (7/233) |
| 8-9 | First mob, cheap version | A vanilla archetype reused with a new texture, vanilla AI goals [own: no model/animation files]; bug-fix week |
| **10** | **Showcase 1** | Classmates play each other's mods cold |
| 11-13 | Their own creature | Blockbench mob: model → export → Gemini adapts to 26.2 → spawn, sound, drop (Dodo = 38 files/~809 lines over 6 commits [repo]) |
| 14 | The place | Mob spawns + ore/plant in chosen vanilla biomes (`ModBiomeModifiers` [repo]) + one night/weather rule (event handler) |
| 15-17 | Boss | Their W11 mob scaled up: boss bar, 2 phases by health, "layering" (P2 [0:02:22]). **No boss in the reference**: Ben builds one first |
| 18 | Lock-and-key | Boss drops the key item; advancement chain closes the lore (Q2 [0:15:16]) |
| 19 | Freeze | Bug fixes, screenshots and the jar uploaded to the platform |
| **20** | **Showcase 2** | |

3D design starts in week 3 because 3D items need no Java ([repo] `blizzard_staff.json`, a 14-cube "Java
Block/Item" export). The custom mob waits for week 11: it is the first multi-step pipeline, and needs kids who
have read error messages for 10 weeks.

## 2. One 65-minute session (week 5, status effect)

- **0-5** Start `runClient` at once [own: even a warm build takes minutes; the wait goes under the talk].
- **5-15** Mini-lesson: one lens, "warp ONE system" (O, 4 of 8 videos converge). Ben shows his reference effect in the game.
- **15-22** Fill the mechanic card on the platform: trigger + bonus + cost, a tooltip of 2 sentences or fewer, and the registry name.
- **22-48** Build: the "copy for Gemini" button gives the spec plus "follow `reference/effect/StinkyEffect.java`". Run, then check against the card. Ben circulates. Each Gemini mistake goes in the Gemini-Lied log.
- **48-56** Swap: a neighbour plays it cold and writes one line of feedback (L).
- **56-65** Screenshot to the card, status set to *in game*, **git commit**, homework handed out.

**Homework is art and writing** (Blockbench, textures, cards). It needs no Gemini, no Gradle and no Ben. **Code is
done in class**, where Ben can unstick it. This puts each kind of failure where it can be fixed.

## 3. What the platform holds (the simplest thing that works on Firebase)

One Firestore collection, `cards`, plus a static `tips` collection. No GitHub sync, no Cloud Functions. [own]
FlutterFlow does Firestore list/form pages natively; MAKE's app already runs Hebrew RTL with the same logins.

Each card has: `owner`, `type` (world | place | creature | item | mechanic), `name`, **`registryName`** (e.g.
`ember_wolf`, the SAME string as the file names in the mod), `oneLine`, `tooltipText` (2 sentences or fewer),
`image` (a sketch or a Blockbench screenshot in Firebase Storage), `status` (idea → spec → in game → tested by a
classmate), and type-specific fields:
- **creature**: vanilla archetype, one job, the tell before it attacks, drop, silhouette sketch (A-C, J)
- **mechanic**: which ONE system it bends, trigger/bonus, cost, "what is it worse at" (O, I)
- **place**: which vanilla biome, the night/weather rule, what spawns there (Q1)

**How a card reaches the mod:** the registry name is the join key, and the lore text becomes **lang entries**.
Tooltips, advancement titles and descriptions, and effect names are all `lang/*.json` lines in the repo (tooltips
881e6e8; advancements added 12 lang lines in 2f72512). A "copy lang" button exports a kid's tooltip texts as JSON
lines. That is how "lore must reach the player through the game" (SYNTHESIS #3) gets built. `tips` = the
checklists (Mojang's 6 steps, "which ONE system", teach-it-cold), shown on the card type they belong to. The
teacher dashboard = cards filtered by class and status.

## 4. What a kid has at week 20 (realistic median, not the best kid)

One mod jar with a **unique mod id** (needed from day 1: if all 8 kids keep `tutorialmod`, their jars can't load
together at a showcase [own]). Inside it: 8-12 items (3-4 in 3D), 2-3 blocks, 2 status effects, 1-2 recipe
chains, 1 reskinned mob, 1 Blockbench mob with idle and walk animations, 5-8 advancements forming one lore path,
15-25 two-sentence tooltips. **A 2-phase boss for maybe 5 of the 8.** On the platform: 1 world card, 1-2 places,
6-10 mechanic cards. They can explain the spec → prompt → check loop, why Gemini's code didn't compile, and what each mechanic bends.

## 5. Three strongest claims

1. **The cost gradient is measurable, and it ends where the reference ends.** [repo] Beyond the table: food 36
   lines, dimension 16 files/339, GUI screen 206 on top of a 554-line block entity, armor set 82 files. **Bosses, boss bars,
   structures, per-entity meters, quests and dialogue have zero examples in the repo** (grep for `BossEvent`,
   `Structure`, `AttachmentType`: nothing). So for those features Gemini has no working 26.2 code to copy.
2. **Gemini's failure mode is concrete, and a reference folder is the fix.** The 26.2 code uses `Identifier`,
   `ValueInput/ValueOutput` for saving, render states with `submit(SubmitNodeCollector)`, `KeyframeAnimation.bake`,
   `hurtServer(ServerLevel, …)`, `appendHoverText(…, TooltipDisplay, Consumer)`, `items/*.json` item definitions
   and `advancements.predicates` [repo]. [own] Old Forge used `ResourceLocation`, `CompoundTag`, `render(...)` and
   `advancements.critereon`, which is what Gemini will write by default. The starter template should ship a
   `reference/` folder (one working example per feature above) plus a rules file of these renames. Caveat:
   "Gemini adapts well when pointed at the reference" is a prediction in the pipeline note, not a tested result.
3. **The mob pipeline needs a cheap version before the full one.** Batch J idea 3 (choose a vanilla mob by the
   behaviour you want, then reskin it) gives week 8 a creature with no model code. The full Blockbench mob is
   `DodoModel` (188 lines) + `DodoAnimations` (165) + a render state + a renderer + client registration + an
   attributes event [repo]. The Blockbench export settings that fit 26.2 are still unverified
   (`_blockbench_pipeline_check.md`). Ben must run it end to end before week 11.

## 6. How this fails in a real room

**Weeks 1-3, setup.** 8 personal Windows laptops, Java 25, Antigravity, and Gradle 9.2.1 downloading Minecraft
on a "pretty brutal" network. [own] A 4-8 GB laptop running Gradle, Minecraft and an AI editor at once will
crawl. Gemini rate limits with 8 kids are untested. If week 1 ends without an item in the game, the course starts
in debt. Mitigations: install checklist sent home first; a pre-filled Gradle cache on USB [own]; one `play.bat`
running `runData` then `runClient` (the reference has 433 datagen files vs 98 hand-written; skipping `runData`
gives the purple-black missing texture [own]). The second failure point is **weeks
11-13**: 8 broken mob builds and one Ben debugging all of them. The fallback is always the week-8 reskin plus
git reset to the last working commit.

## 7. What I expect the other seats to get wrong

- **Out of reach, stated plainly** ([own] judgement; none has a reference example): dialogue, a quest log, companions that take orders, custom GUIs, cutscenes, a
  dimension per kid (possible for one strong kid as a stretch, 339+ lines), new terrain biomes, jigsaw
  structures, multiplayer sync, and "buildup meter" statuses on entities. "Insane mechanics" really means 6-10
  small mechanics that each bend one vanilla system, one custom creature and one 2-phase boss. That is still a
  lot for a 12-year-old.
- **The lore-first case:** a wiki-shaped platform (factions, maps, timelines) with no `registryName`. A card that
  points at nothing in the game is worldbuilder's disease in a database (SYNTHESIS #1).
- **The game-design case:** mechanic cards from the AAA examples their own analysts flagged unbuildable (O, Q2, R).
- **The classroom case:** week 1 as a lesson instead of an install; homework that needs a Gradle build without Ben.
- **Everyone:** treating "Gemini writes it" as free. A feature is only cheap if a working 26.2 example exists to copy.
