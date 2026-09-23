# What Makes a Good New Game Plus? (Design Doc, 21.8 min)

**What it is:** A taxonomy of New Game Plus (NG+) design into four flavors — God Mode, Secondary Challenge, Skill Ramp, Narrative Device — with pros/cons and named-game case studies for each.
**Substance:** substantive: clean four-way taxonomy stated up front and followed through systematically with 15+ games as evidence; one sponsor read.

## Ideas, in the video's order
- [0:02:22] Four NG+ flavors: God Mode (carry over power, replay easy), Secondary Challenge (carry over power, but game gets harder too), Skill Ramp (the moveset/tech tree is deliberately bigger than one playthrough can unlock), Narrative Device (repeat playthrough reveals new story). A game can mix more than one.
- [0:02:52] God Mode NG+ (RE4, Dead Space): carry weapons/money/unlocks forward, buy absurdly strong gear — cheap for developers since content doesn't change, but risks trivializing everything and burning out fast [0:06:05].
- [0:04:28] MGS3's God Mode is earned incrementally: specific bonuses (weapon, camo) unlocked based on how well you did last run (speed, stealth, no kills) rather than just handed out flat.
- [0:06:35] Secondary Challenge (Souls, Dark Souls II adds new enemy placements/phantoms across up to 7 NG+ cycles): keep your power, but the world pushes back harder — good for players who already love the systems, bad if it's "phoned in" as just health/damage sliders (Code Vein flagged as the lazy version) [0:08:13].
- [0:08:44] Best Secondary-Challenge NG+ examples also change something structural, not just numbers: Arkham City removes the on-screen counter-attack indicator on NG+, forcing players to read animations instead of a UI cue.
- [0:09:16] "Whole remixed mode as a 100%-completion reward" (Zelda Second Quest / Master Quest, Super Luigi Galaxy, DKC Returns hard mode): different layouts/enemy placement/character quirks, not just a slider change — but it's expensive to build.
- [0:11:26] Skill Ramp (generic label, coined in video): design a moveset/tech tree deliberately too big to fully unlock in one playthrough (Devil May Cry V has 17 skill sets for one character alone), so NG+ is "still building your first character," not starting over.
- [0:14:08] Skill Ramp warning: if the STARTING moveset is too thin because most abilities are unlock-gated, the first playthrough itself becomes unfun before NG+ even matters (cites Legend of Korra as a game that gated too much for too long).
- [0:15:42] Narrative Device (Chrono Trigger — the game that coined "New Game Plus"; Nier/Nier Automata; Undertale): NG+ exists purely to reveal new/altered story content; works only if the story is strong enough to sustain a second telling — The Quiet Man is cited as a story that wasn't (a mechanic can't save weak writing) [0:20:43].
- [0:19:08] Undertale's version: no carried-over gear at all — NG+ is purely meta-commentary, characters "remember" prior playthroughs and certain endings lock out based on choices made in earlier runs.

## What the frames add
Mostly rapid-fire gameplay clips of whichever named game is on screen — no diagrams beyond one clean title card at [0:01:00] that lists the four categories as icons (cloud="God Mode", mountain="Secondary Challenge", bar chart="Skill Ramp", open book="Narrative Device") — useful as a one-glance summary graphic if we ever want to build a poster/worksheet header for this taxonomy. Otherwise: talking-head intro/outro only, no example designs or before/after comparisons shown visually beyond what the narration already describes.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Second time through" design card (20 min)**: after a kid finishes a first pass on their mod's core item/mob/mechanic, ask them to pick ONE of the four flavors and write one sentence for what changes on a "second playthrough" of their own creation (a harder version of their boss, a secret recipe that only unlocks after beating it once, extra lore revealed after finding all their custom items). Ties directly into advancements, which Minecraft already has as a completion-tracking system.
- **"Don't gate the fun" checklist (5 min, generic-but-transferable)**: before a kid finalizes which abilities of their custom item/mob are locked behind late-game unlocks, ask "is what you get to use in week 1 already fun on its own?" — directly from the Skill Ramp warning [0:14:08].

### Survives the move to Minecraft?
Minecraft already supports a form of Skill Ramp and Narrative Device natively via advancements (unlock a recipe/reveal lore text after an achievement) and enchanting/loot tables (deeper gear only found later) — a kid's mod can bend these by adding a custom advancement that unlocks a new recipe, structure, or trade once a boss is beaten, which is squarely buildable by Gemini (advancement JSON + reward function). True "God Mode"/"Secondary Challenge" NG+ (restart the whole world but keep gear, or scale up mob difficulty on a second run) does NOT map to a normal Minecraft mod project — Minecraft worlds are persistent and not run-based, so a kid would need a whole new system (a "prestige" command, or an NBT flag that scales mob stats) to fake it. That's a stretch goal, not a core deliverable.

### Doesn't transfer
The deep story-driven NG+ examples (Nier, Chrono Trigger, Undertale, RE2's Zapping System) are about elaborate branching narratives — a single kid building a mod over 20 weeks cannot write that much story, and Minecraft mods aren't narrative-branching engines. Skip as design references; keep only as "second time through" framing, not as a model to imitate directly.

## Honest caveats
The video's core claim ("almost every NG+ is just a way to start a new game without starting completely from scratch") is a fair generalization but is really a repackaging of the same "reward the time already invested" logic as the leveling-systems video in this batch — both videos independently converge on "spread rewards across a whole playthrough, not all at the end" and "extra power without extra danger gets boring fast," so we should present that as one throughline, not two separate insights (see batch notes). Nothing in the video is specific to sandbox/persistent-world games like Minecraft; every example is a linear or semi-linear game with a defined "beat the game" endpoint, so the whole NG+ framing needs real translation work before it fits our class, more than most of this batch's other videos.
