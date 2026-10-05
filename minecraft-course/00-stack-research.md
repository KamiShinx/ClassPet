# Minecraft Modding Course — Stack Research & Verdict

> **Date:** 2026-09-17
> **Status:** Research complete. Course structure TBD.

---

## 1. The linked playlist: NOT viable for 2026

**Linked:** [Forge Modding Tutorials - Minecraft 1.21.1](https://www.youtube.com/playlist?list=PLKGarocXCE1GspJBXQEGuhazihZCSSLmK) (Kaupenjoe)

Three independent reasons it is dead for our purposes:

| Issue | Detail |
|---|---|
| **Wrong mod loader** | Forge is in maintenance mode for legacy versions. NeoForge (2023 fork by part of the original Forge team) is the standard for 1.21+ and owns the modern ecosystem. New features ship to NeoForge only. |
| **Wrong game version** | 1.21.1 shipped Aug 2024. Mojang moved to year-based versioning in 2026: 26.1 (Mar), 26.2 (Jun), 26.3 (Sep 15, 2026). We are ~4 generations past it. |
| **Abandoned** | Companion repo `Forge-Tutorial-1.21.X` last commit **2025-05-17** ("update to 1.21.3"). 16 months stale. |

**Verdict:** teaching it would have students writing code against an API that no longer exists, for a loader the ecosystem left behind.

---

## 2. Replacement: same creator, current series

**[NeoForge Modding Tutorials For Minecraft 26.X](https://www.youtube.com/playlist?list=PLKGarocXCE1FMoAF23TXkprPCuKmAdcTg)**
Repo: `Tutorials-By-Kaupenjoe/neoforge-tutorial-26.x` — **last commit 2026-09-05** (actively maintained).

- **68 episodes**, one git branch per episode = 68 known-good, version-correct checkpoints.
- Targets Minecraft **26.2**, NeoForge **26.2.0.76**, **Java 25**, Gradle 9.2.1.
- Series self-updates mid-stream (branch `30-update-to-26.2`).

### Episode arc (branch names, in order)
```
1-setup  3-items-and-datagen-setup  4-creative-mode-tab  5-blocks  6-loot-tables
7-recipes  8-advanced-item  9-advanced-block  10-food  11-fuel  12-tooltips  13-tags
14-stairs-and-slabs  15-pressure-plate-and-button  16-fences-gates-and-walls
17-doors-and-trapdoors  19-tools  20-armor  21-horse-armor  22-blockstates
23-data-components  24-bow  25-fov-and-events  26-3d-item-model  27-custom-3d-models
28-paintings  29-stats  30-update-to-26.2  31-crops  32-compostables  33-berry-bush
34-water-crop  35-sounds  36-music-disc  37-effect  38-potions  39-damage-type
40-animated-textures  41-advancements  42-villager-trades  43-villagers  44-keybinds
45-networking-c2s  46-global-loot-modifiers  47-simple-block-entity
48-block-entity-renderer  49-block-entity-menu  50-crafting-block-entity
51-lit-property  52-recipe-type  53-recipe-type-datagen  54-jei-compat
55-worldgen-setup  56-ore-gen  57-wood-type  58-tree-gen  59-bush-gen
60-trunk-placer  61-foliage-placer  62-dimension  63-custom-mob  64-mob-variant
65-mob-sounds  66-mob-loot  67-breedable-mobs  68-mob-spawns
```

This is a reference spine, not a syllabus. 68 episodes >> ~30 school sessions.

---

## 3. The central risk: LLMs are bad at Minecraft modding

This is the design problem the course has to solve, not a footnote.

Minecraft 26.X NeoForge is months old. Gemini's training corpus is dominated by **Forge 1.12–1.20** tutorials. Registries, mappings, data components and the Forge→NeoForge package moves all changed. Asked to "add a custom sword," an LLM will confidently emit 1.16-era Forge code that does not compile — and a 13-year-old cannot tell the difference between "wrong API" and "I typed it wrong."

Left unmanaged, this turns a 90-minute lesson into 90 minutes of red squiggles.

### Mitigations (all verified to exist)
1. **Ground the model in the repo.** Each student's workspace ships with the matching Kaupenjoe branch as reference. Gemini reads real 26.2 code instead of inventing it. This is the single highest-leverage fix.
2. **Docs MCP server.** `mcmodding-mcp` (OGMatrix) indexes official Fabric/NeoForge docs weekly and exposes search to the assistant. Antigravity supports MCP.
3. **Pin a rules file.** Project-level instructions: *target 26.2 + NeoForge only; never use `net.minecraftforge.*`; match the reference branch's imports.*

---

## 4. Stack decision (open)

### Option A — Java + NeoForge 26.2
- **For:** real Minecraft Java modding, the thing kids actually want; huge ecosystem; excellent maintained course to follow.
- **Against:** Java 25 JDK + Gradle per machine; multi-GB first-run dependency download; slow build/run cycle; the hallucination problem above is at its worst here; school machines often lack admin rights and RAM.

### Option B — Bedrock Add-Ons + Script API (JS/TS)
- **For:** no Gradle, no JDK, near-instant reload; JSON + JavaScript, which Gemini handles far better; Microsoft Learn docs are current; runs on locked-down Windows/school hardware.
- **Against:** not "real mods" in the Java sense — kids may feel short-changed; stable-vs-beta API split needs care.

**Leaning: A**, because the ask is "Minecraft modding" and B risks feeling like a consolation prize — but A only works if the grounding setup in §3 is built *before* lesson 1, and if the lab machines are confirmed capable.

---

## 5. Blocking unknowns

- Student age / prior coding experience
- Machine spec + admin rights on lab machines (decides A vs B outright)
- Java or Bedrock licences — which do the students actually own?
- Course length in weeks
- `Google Antigravity` assumed as the editor (Google's VS Code fork, Gemini 3.x agents, MCP support). Confirm.

---

## 6. Environment note

YouTube is blocked by this session's egress policy, so transcripts could not be pulled.
Not a loss: the companion repos give the exact per-episode source code, which is
better raw material for course-building than narration.
