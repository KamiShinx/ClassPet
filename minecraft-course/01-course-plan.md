# Minecraft Modding — 20-Week Course Plan

> **Students:** 8 kids, ~11–13, zero coding experience
> **Format:** 1×/week, 90 min scheduled (~65–70 min realistic) + homework
> **Stack:** Minecraft Java 26.2 · NeoForge · Java 25 · Google Antigravity + Gemini
> **Status:** Proposed shape — per-lesson materials not yet built

---

## 1. The account problem: solved

**Students do not need a Minecraft account for any of the coursework.**

NeoForge's `runClient` Gradle task launches the game with an **offline dev profile** by
default. Verified in the tutorial MDK's `build.gradle` — the `client` run config has no
`devLogin` flag, so it never authenticates:

```gradle
runs {
    client {
        client()
        systemProperty 'neoforge.enabledGameTestNamespaces', project.mod_id
    }
```

Authenticated runs are strictly opt-in (`devLogin = true`, which triggers a Microsoft
device-code flow). We simply never turn it on.

### What this means

| Activity | Account needed? |
|---|---|
| Writing mod code | No |
| `./gradlew runClient` — testing your mod in-game, 20 weeks of it | **No** |
| Data generation, building the `.jar` | No |
| Playing normal Minecraft / joining an online server | Yes |

So all 20 weeks run on zero accounts. MAKE's 9 licences are only wanted for the
**showcase sessions** — the moments when kids install their finished `.jar` into a real
launcher and play together.

### Using the 9 licences without abuse

A Minecraft licence is per-person, not per-seat, so sharing logins with 25 kids is both
against Mojang's terms and an admin nightmare. Keep it clean:

1. **Never give students credentials.** Ever. Credentials live in MAKE's password manager.
2. **Treat them as 9 stations, not 9 users.** Sign each account in once, on a designated
   MAKE-owned laptop, with "stay signed in". Students sit down to an already-authenticated
   launcher. Nobody types a password.
3. **8 students, 9 licences — one each, plus a spare.** Nothing is shared, so there is no
   rotation to manage and no abuse vector.
4. **Showcase days only.** Roughly weeks 10 and 20. The rest of the term is `runClient`.

See `02-how-testing-works.md` for the full picture of how students run and play their
mods day to day.

---

## 2. The three real risks

### Risk 1 — Setup eats the term
8 different laptops, Java 25, a multi-GB first build. Left to chance this consumes
weeks 1–4 and kills momentum.

**Mitigation:** a pre-built starter repo (pinned versions, Gradle wrapper so no Gradle
install, committed `gradle.properties`), a scripted setup, and a **pre-warm homework**
before week 1. Only two things get installed: **JDK 25** and **Antigravity**.

### Risk 2 — Gemini writes 2019 Forge code
26.X NeoForge is months old; the training corpus is overwhelmingly Forge 1.12–1.20.
Asked for "a custom sword," Gemini will confidently emit code that does not compile —
and a 12-year-old cannot distinguish "wrong API" from "I made a typo."

**Mitigation** (built before lesson 1):
- Kaupenjoe's matching 26.X branch vendored into every workspace as read-only reference
- A pinned rules file: *target 26.2 + NeoForge only; never `net.minecraftforge.*`;
  match the reference imports*
- `mcmodding-mcp` wired into Antigravity for live NeoForge docs search

### Risk 3 — 90 minutes is a long time for a 12-year-old
**Mitigation:** every lesson is a 3-beat loop — **build something visible in the first
25 minutes**, extend it, then free-build. Never a lesson that ends without something new
on screen.

---

## 3. Shape of the 20 weeks

Derived from Kaupenjoe's 68-episode 26.X spine, cut to ~18 teachable topics.

### Block A — Get it running (W1–4)
| W | Topic | They leave with |
|---|---|---|
| 1 | Setup, first launch, tour of Antigravity | Minecraft running from code |
| 2 | Your first item | An item with their own name |
| 3 | Textures + creative tab | Their own 16×16 art in-game |
| 4 | Your first block | A placeable block they made |

### Block B — A real mod (W5–9)
| W | Topic | They leave with |
|---|---|---|
| 5 | Recipes — crafting your item | A craftable item |
| 6 | Loot tables — block drops | A block that drops properly |
| 7 | Food | Something edible with effects |
| 8 | Tools | A custom pickaxe/sword set |
| 9 | Armor | A full wearable armor set |
| 10 | **Showcase #1** | `.jar` built, installed, played together |

### Block C — Make it feel alive (W11–14)
| W | Topic |
|---|---|
| 11 | Sounds + music disc |
| 12 | Potions & effects |
| 13 | Custom 3D models (Blockbench) |
| 14 | Animated textures + tooltips |

### Block D — Passion project (W15–18)
Pick one track, four weeks, teacher floats between groups:
- **Track Ore** — worldgen: custom ore, generation rules, a new tree
- **Track Mob** — a custom mob: model, sounds, loot, breeding
- **Track Machine** — block entity: a working custom furnace with a GUI

### Block E — Ship it (W19–20)
| W | Topic |
|---|---|
| 19 | Polish, mod icon, metadata, bug hunt |
| 20 | **Showcase #2** — final builds, LAN session, everyone plays everyone's mod |

---

## 4. Homework design

~30 min, must not require a working build. Mostly **creative, not code**:
- Pixel-art textures in Piskel (browser, free) — highest engagement, zero setup
- Design docs: "sketch the 5 items your mod will have"
- Blockbench models (Block C onward)
- "Ask Gemini to explain X, screenshot what it said, tell me if it was right"
  — teaches AI scepticism, which is half the point of the course

---

## 5. Still open

- **Antigravity free-tier limits** with 8 students hitting Gemini simultaneously — needs
  a live check before week 1; a rate-limit wall mid-lesson would be fatal.
- **Do students have admin rights on their own laptops** to install a JDK?
- **Second adult?** With 8 kids this is far less critical than at 25 — one teacher is
  workable, especially once the Block D project groups form.

---

> **⚠ Superseded in part.** The week-by-week breakdown in §3 is organised by API topic
> ("W5 recipes, W6 loot tables"), which teaches a topic list Gemini has already memorised.
> See `03-why-this-has-value.md` for the re-shaped course, organised by difficulty of
> thinking instead. The logistics in §1–§2 (accounts, setup risk, grounding) still stand.
