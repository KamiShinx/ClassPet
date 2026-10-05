# Research synthesis for the course-shape debate

Read `CONTEXT.md` first (the class, the locked stack, Ben's idea). This file is what 145 videos (~56 hours) came
to, and it points at the per-batch files in `notes/` where the evidence lives. Every claim in `notes/` cites a
video timestamp; go there when you need the evidence behind a claim.

## What was processed
| Area | Batches (`notes/_batch_X.md`) | Videos |
|---|---|---|
| Worldbuilding (Ben's list) | D, E | 10 |
| Sanderson BYU 2025 lectures | F (plot), G (character + magic systems), H (worldbuilding), H2 (publishing, skimmed by a small model: irrelevant) | 16 |
| Character design (Ben's list, 2D illustration) | A, B, C | 12 |
| Game design (our additions) | I (GMTK, Sakurai, Design Doc, Extra Credits) | 6 |
| Scope, level storytelling, Mojang art rules, Blockbench | J | 8 |
| Game mechanics (Ben's second list + 2 Design Doc playlists) | K, L, M, N, N2, O, P1, P2, Q1, Q2, R, S, T1, T2 | 93 |
Also: `notes/_blockbench_pipeline_check.md` (checked against the real 26.2 reference mod).

## Where the evidence converges (strongest first)
1. **"Worldbuilder's disease" is the main risk of Ben's plan.** Named independently by Sanderson (H), Stoneworks,
   the 7 Sins video, Joriam Ramos (D), Rick's Creations and Millard (E), plus both scope devlogs (J): planning and
   lore-writing feel productive and eat all the time meant for building. Millard's evidence goes further: in games,
   more lore VOLUME makes worldbuilding worse; short, answerable, player-facing lore makes it better. Sanderson
   himself ranks worldbuilding the least important of plot/character/world (F, G).
2. **Small and dense beats big and thin.** One village/place per kid, one hook, ~2-sentence tooltips (D, E, H, J).
3. **Lore must reach the player through the game** (items, ruins, mobs, structures, tooltips, loot), never
   through text walls. "Every lore entry must be findable in the game" follows from D, E, F, H.
4. **Character design that survives Minecraft = silhouette, shape language, 2-4 colour palette, one dominant
   trait, design-from-function.** All 12 character videos converge on silhouette first (A, B, C). Line quality,
   anatomy, rendering and Photoshop craft do not survive cubes and 16x16. Drawing-free entry points exist
   (trait card Who/Want/Why, Proko's "2-3 items reskin an archetype", silhouette guessing game).
5. **Mojang's own design rules** (J): craft appeal, don't unbalance the ecosystem, don't ruin player builds,
   give it a purpose, stay consistent, "reign it in with the cubes" (16x16 = 256 px budget). Class-ready checklist.
6. **Game design is genuinely missing from Ben's first list** (every character and worldbuilding batch says so).
   Worldbuilding says WHAT the world is; nothing in it says HOW "a fire spirit boss" becomes attacks, phases, a
   cost, a win condition.
7. **Sanderson's Laws of Magic are game-mechanic design almost unmodified** (G): a power resolves problems only
   as far as the player understands it; limitations (cost / flaw / limitation / hindrance) are more interesting
   than powers; expand what you have before adding new things. This is the natural bridge between Ben's lore
   interest and mechanics.
8. **The most buildable game-design material bends a system Minecraft already has**: status effects ("a good
   effect warps ONE existing system", 4 of 8 videos in O), corpse run / death drop and sleep (R), advancements
   and loot as criteria+prize (N), weather/terrain-reactive mobs and lock-and-key structures (Q2), boss phases by
   health threshold with the "layering" formula (P2), reuse-and-vary bosses (P1), item cost shapes (N2).
8b. **Places arrive already fused with mechanics** (Q1): the best "place" designs are a world rule, not lore
   (a biome where storms douse fire and buff one mob; a status only active at night; torches as safety). Minecraft
   ships day/night and weather working, so a kid's place = a small bundle of bent rules. This is where Ben's
   worldbuilding and his "insane mechanics" meet, and it cuts against treating them as separate strands.
9. **Teaching a mechanic cold** (L): isolate it safe -> hard -> combined; one unmistakable tell before an attack.
   Directly serves the W10/W20 showcases where classmates play each other's mods.
10. **~100 catalogued mechanics** from two compilations (M) plus 60+ kid-level "mechanic cards" across batches
    K-T2: raw material for an inspiration deck.

## The contested question, and a caveat about it
Batch I concluded game design should be **"a layer on character design, not a third pillar"**: a handful of
15-30 min checklists (MDA, risk/reward dial, boss-role picker, "does this mob ask something different?",
versatile verbs), later extended by the mechanics batches (cost shapes, "which ONE system does this warp?",
scope via one core verb, teach-it-cold, reuse-and-vary).
**Caveat: all 14 mechanics batches agreed, but their brief told them this verdict and asked if they changed it.
That is anchoring, not independent confirmation.** Treat "layer vs pillar" as open. It may also be a false
dichotomy: the real question is how the 20 weeks x 65 min are spent and what each kid ends up with.

## Honest quality notes
- Ben's own mechanics picks (K): ~2 of 8 strong (Extra Credits hidden mechanics, GMTK engagement); the rest recap,
  filler, a Godot coding tutorial, or too abstract for 11-13.
- Two genre batches (T1, T2) were low relevance, as predicted. The Drawing Codex 2-hour video has ~15-20 min of
  content. Sanderson's publishing lectures: irrelevant (skim-checked). Most Design Doc frames are gameplay b-roll.
- One analyst (Q2) sampled frames instead of checking every one.

## Technical facts that constrain the design (verified, not guessed)
- **3D items/blocks from Blockbench: proven easy** in 26.2 ("Java Block/Item" JSON drop-in). **Custom mobs:
  proven possible but multi-step** (Blockbench "Modded Entity" Java + animations, adapted to 26.2 render states by
  Gemini with the reference open). Exact export settings unverified. The Blockbench beginner tutorial uses a format
  Minecraft can't load, and Mojang's Entity Wizard is Bedrock-oriented: both are traps.
- Gemini is trained mostly on old Forge; on 26.2 NeoForge it will be confidently wrong often. The earlier plan
  made that failure the engine of a "judge the machine" skill (spec first, "show me the line", Gemini-Lied log).
- The kids' coding happens in Google Antigravity on their own Windows laptops; the school network is "pretty
  brutal". Antigravity/Gemini free-tier rate limits with 8 kids at once are untested.
- **The "platform"**: Ben wants to host the classes on MAKE's existing system, https://make-class.web.app (a
  FlutterFlow/Flutter web app on Firebase Auth + Firestore, Hebrew UI, student login + teacher dashboard).
  Its source isn't available to us yet. Most likely route: a separate course web app on the same Firebase project
  (same logins, same database), which needs Firebase access from Ben/MAKE. Whatever the debate proposes for the
  "platform" (world bible, character cards, mechanic cards, tooltips, gallery) must fit that.

## Ben's words, for reference
- "because the course will be mainly vibecoding i would want to focus it on 3d elements, like how they can
  actually design their characters and items [and] worldbuilding ... this way they focus on the creatives and on
  developing their minds and creativity while they let gemini code for them"
- "a 'platform' where kids have tooltips and a place to express their creativity in world and character design,
  and then they easily just vibecode their ideas, and by the end of the year they have insane lore and game
  mechanics"
- "maybe the videos i sent are not enough and we need more 'game design' videos ... very important"
