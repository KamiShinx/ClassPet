# Does a kid's Blockbench model get into a NeoForge 26.2 mod? (checked against the reference repo)

Batch J flagged this as open: the CountFrogg beginner tutorial uses Blockbench's "Generic Model" format, which
Blockbench itself says Minecraft can't load, and Mojang's Entity Wizard is aimed at Bedrock add-ons.

Checked in Kaupenjoe's working 26.2 mod (branch `68-mob-spawns`, which compiles against NeoForge 26.2.0.76):

- **3D items/blocks: proven.** `assets/tutorialmod/models/item/blizzard_staff.json` and `models/block/pedestal.json`
  are Blockbench "Java Block/Item" exports (`"credit": "Made with Blockbench"`, `"format_version": "1.21.11"`,
  cube `elements` with per-face UVs, 32x32 texture). Export, drop into `assets/<modid>/models/`, done. This is the
  easy path and needs no Java.
- **Mobs: proven, with a code step.** The Dodo mob is `DodoModel.java` (vanilla `EntityModel` with a named bone
  hierarchy: body > legs > toes...) plus `DodoAnimations.java` (vanilla `AnimationDefinition` keyframes) plus a
  render state and renderer. That is the shape of Blockbench's "Modded Entity" Java export and its animation export.
  No GeckoLib or other library. The export has to be adapted to 26.2's render-state classes; that is exactly the
  kind of edit Gemini can do while pointed at the reference files.
- **Not verified:** the exact Blockbench export settings (Modded Entity + Mojang mappings version) that produce code
  closest to 26.2. Needs Ben's hands-on test before any mob lesson.

Implication for the course: items and blocks in 3D are cheap and safe from early on. A custom mob with animation is
a multi-step job (model → export → Gemini adapts → renderer registered) and belongs later, after kids can debug.
