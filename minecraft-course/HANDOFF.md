# HANDOFF — Minecraft Modding Course

> **Purpose:** complete context transfer for a fresh Claude Code session.
> **Last session:** 2026-09-17 · **Branch:** `claude/minecraft-modding-course-fsj9o7`
> Read this file first, then the four numbered docs beside it.

> **UPDATE 2026-09-23: read `04-creative-course-design.md` before anything below.** Ben moved the course's
> centre to the creative side (each kid's own world, creatures and items in 3D, lore) with Gemini writing the
> code. 145 videos were researched and five reviewers debated it (`research/`). Result: the card (lore + design +
> Gemini spec in one) is the unit of work, lore counts only once it's in the game, a cold playtest every week,
> items → 3D → effects → mobs order. Decided the same day: kids' laptops are **Windows only**; kid-facing text is
> **Hebrew**; the course will be hosted on/beside MAKE's system (make-class.web.app, FlutterFlow + Firebase,
> source not yet available). The starter workspace (§8) is still the next build, but only after Ben's
> pre-week-1 tests in 04 §7 (Hebrew in-game rendering, Blockbench mob export, install on the school network).

---

## 0. TL;DR for the next instance

Ben teaches a weekly class at a company called **MAKE**. He asked me to vet a YouTube
Minecraft-modding playlist for 2026 relevance and build a course from it. The playlist
turned out to be obsolete; I found the maintained replacement. Then Ben asked the question
that reframed everything — *"if it's all vibecoding, what's the value?"* — and the course
was restructured around teaching **judgement over an AI**, not teaching the Minecraft API.

Nothing has been built yet. Four planning docs exist. The next concrete deliverable is the
**starter workspace**.

---

## 1. The class

| | |
|---|---|
| Teacher | Ben (benmaltabashi@gmail.com), works at **MAKE** |
| Students | **8 kids, ~11–13, zero coding experience** |
| Schedule | 1×/week, **90 min scheduled — Ben says realistically ~65–70 min** ("usually less with all the bs") |
| Homework | Yes, expected. ~30 min. |
| Length | **20 weeks** |
| Hardware | Students use **their own laptops** |
| Licences | MAKE owns **9 Minecraft Java accounts** |
| AI tooling | **Gemini** inside **Google Antigravity** (Google's VS Code fork — Ben couldn't recall the name; this is it) |

---

## 2. What was asked, and what happened

**Original ask:** check <https://youtube.com/playlist?list=PLKGarocXCE1GspJBXQEGuhazihZCSSLmK>
for 2026 relevance. If relevant → pull transcripts, watch via ffmpeg, build the course.
If not → find a replacement.

**Result:** not relevant. Replacement found. Course designed. Then re-designed after Ben's
pedagogy challenge.

---

## 3. Verified technical findings

Everything below was **verified**, not assumed. Evidence noted.

### 3.1 The linked playlist is dead — do not use it
It is Kaupenjoe's **"Forge Modding Tutorials - Minecraft 1.21.1"**.

| Problem | Evidence |
|---|---|
| **Wrong loader.** Forge is maintenance-mode; NeoForge is the standard for 1.21+ and gets all new development. | Multiple 2026 sources |
| **Wrong version.** 1.21.1 = Aug 2024. Mojang moved to year-versioning in 2026: 26.1 (Mar) → 26.2 (Jun) → **26.3 (Sep 15, 2026)**. | Minecraft wiki / release coverage |
| **Abandoned.** Companion repo `Forge-Tutorial-1.21.X` last commit **2025-05-17**. | `git log` on the cloned repo |

### 3.2 The replacement
**[NeoForge Modding Tutorials For Minecraft 26.X](https://www.youtube.com/playlist?list=PLKGarocXCE1FMoAF23TXkprPCuKmAdcTg)** — same creator, actively maintained.

- Repo: `https://github.com/Tutorials-By-Kaupenjoe/neoforge-tutorial-26.x`
- **Last commit 2026-09-05** (`ccac11a` "mob spawns")
- **68 episodes, one git branch each** — 68 known-good version-correct checkpoints
- Branch list is in `00-stack-research.md`

### 3.3 Exact stack (from the MDK's `gradle.properties` / `build.gradle`)
```
minecraft_version = 26.2
neo_version       = 26.2.0.76
Java toolchain    = 25        # "Mojang ships Java 25 to end users in 26.1.2"
Gradle wrapper    = 9.2.1     # wrapper included -> no Gradle install needed
moddev plugin     = net.neoforged.moddev 2.0.141
```
**Only two things get installed on a student laptop: JDK 25 and Antigravity.**

### 3.4 Students need NO Minecraft account for the coursework — this is load-bearing
`./gradlew runClient` **downloads and launches the real Minecraft client** with an offline
dev profile. It is not a simulator. Verified in `build.gradle`:
```gradle
runs {
    client {
        client()      // no devLogin flag => offline profile, never authenticates
```
Authenticated runs are opt-in only (`devLogin = true` → Microsoft device-code flow). We
never enable it.

Students get the full game — title screen, world creation, survival/creative, their mod
loaded. Game files land in a project-local `run/` folder (confirmed in `.gitignore`).
In-game name is `Dev`. Edit→run cycle is **~20–40s** after first build.

What they lose without login: custom skins, the official launcher, public servers. Nothing
else.

### 3.5 Multiplayer
- **No accounts:** `./gradlew runServer`, then in the generated `run/` set `eula=true` and
  `online-mode=false`. Dev clients connect over LAN.
- **Showcase (real game):** `./gradlew build` → jar → official NeoForge 26.2 installer →
  drop all 8 jars in `mods/`. **8 students vs 9 licences = one account each + a spare.**
  No sharing, so no abuse problem. Keep credentials in MAKE's password manager; Ben signs
  each laptop in once with "stay signed in"; no student ever types a password.

### 3.6 Week 1 is a trap
NeoForge docs state the first Gradle setup downloads all of Minecraft **and decompiles it** —
*"up to an hour, depending on your hardware and network strength."* Eight laptops doing this
simultaneously on venue wifi = a lost lesson.
**Mitigation: make it pre-warm homework the week before.** "Run this command at home,
screenshot the Minecraft title screen."

---

## 4. THE MOST IMPORTANT PART — the pedagogy pivot

Ben pushed back, correctly:

> *"My question though is if it's all going to be vibecoding what value. There's a full
> curriculum there's even give us if you can just tell Gemini hey make me a sword lol"*

**He is right, and it invalidated the first draft of the plan.** Do not undo this.

### What follows from it
1. **Kaupenjoe's curriculum cannot be the syllabus.** Its value was teaching Java + the
   NeoForge API. Gemini does that now. The repo is **our reference** (what's possible, what
   correct 26.2 code looks like) — *not* the lesson plan.
2. **An API-topic syllabus is worthless.** "W5 recipes, W6 loot tables, W7 food" teaches a
   topic list the model has memorised. §3 of `01-course-plan.md` has this flaw and is
   **marked superseded**.
3. **"Type a prompt, get a sword" is a 3-week course padded to 20.** If it's taught that
   way, it shouldn't run.

### The actual subject
**Directing a machine that builds things, and being the person who can tell whether what
came back is any good.** Minecraft is the *material*, not the topic — it's there because
11-year-olds care about it and motivation is the scarcest input in the room.

### What's scarce once code generation is free
Specification · Verification · Debugging · Decomposition · Reading code you didn't write ·
Judgement and taste. Full argument in `03-why-this-has-value.md`.

### The lucky accident — the AI failing is the engine
26.X is months old; Gemini's training data is overwhelmingly Forge 1.12–1.20. It **will**
confidently emit non-compiling code. That's not a bug in the course — every instance is a
live lesson in *"the confident machine is wrong and you have to notice."*

The grounding setup exists to drag the failure rate from ~90% to **~20%, not to zero.**
Zero would be useless. **Do not try to engineer the failures away completely.**

### The mechanisms that carry the value
| Mechanism | Builds |
|---|---|
| **No prompt without a spec** — on paper first: name, what it does, 3 numbers | specification |
| **"Show me the line"** — student points at the line that does the thing | reading code |
| **Break-it-on-purpose** — teacher sabotages a working mod, student fixes it | debugging |
| **The "Gemini Lied" log** — class leaderboard of confident AI wrongness | scepticism |
| **No-AI moments** — numbers and textures typed by hand | ownership |
| **Balance rule** — "must not ruin a survival world" | judgement |
| **Explain it at showcase** — can't explain = didn't learn | consolidation |

The **"Gemini Lied" log** is the highest-value item. A generation that instinctively
distrusts confident AI output is worth more than one that can write Java.

### Current course shape — by difficulty of thinking, not API topic
- **W1–5 — One prompt, one thing.** Spec → ask → verify. Deliberately small.
- **W6–10 — Many prompts, one system.** Tool set: item → material → recipe → loot → balance. Showcase at W10.
- **W11–14 — It's broken, fix it.** Sabotage drills, version traps, stack traces. Git as safety net.
- **W15–19 — Nobody tells you what to build.** Own project (mob / worldgen / machine), own spec, own breakage.
- **W20 — Ship and explain.**

---

## 5. Files in this directory

| File | Contents | Status |
|---|---|---|
| `00-stack-research.md` | Playlist verdict, replacement, full 68-branch episode list, build requirements | Current |
| `01-course-plan.md` | Logistics: accounts, setup risk, grounding, homework design | **§1–2 current; §3 week-by-week SUPERSEDED** |
| `02-how-testing-works.md` | How students run/play/test; the `runClient` explanation; multiplayer; week-1 warning | Current |
| `03-why-this-has-value.md` | **The pedagogy. Most important doc.** Read this one properly. | Current |
| `HANDOFF.md` | This file | — |

Reference clone (may not exist in a fresh container — re-clone if missing):
```bash
git clone https://github.com/Tutorials-By-Kaupenjoe/neoforge-tutorial-26.x
git ls-remote --heads origin   # the 68 episode branches
```

---

## 6. Environment notes

- **YouTube is blocked** by this session's egress proxy (403 on CONNECT). `yt-dlp` and
  WebFetch both fail. No transcripts were obtainable. **GitHub works**, which is why the
  approach was to read the companion repos' source instead.
- `docs.neoforged.net` is **also blocked**. Facts about NeoForge were verified from the
  cloned MDK's own build files plus web search.
- **Ben intends to run a session from his home machine** so YouTube is reachable. Worth
  knowing: this matters **less** than it seems — we are not teaching Kaupenjoe's
  curriculum, so his narration isn't needed; his *code* is, and we already have all 68
  checkpoints. Transcripts would only help sanity-check per-session pacing and dependency
  order. Useful, not blocking.

---

## 7. Open questions for Ben

1. **Do students have admin rights on their own laptops** to install JDK 25?
2. **Antigravity free-tier limits** with 8 students hitting Gemini simultaneously — needs a
   live check before week 1. A rate-limit wall mid-lesson would be fatal. Couldn't test
   from this environment.
3. **Second adult in the room?** Less critical at 8 than at 25, but affects Block 4.
4. Mod theme — free choice per student, or a shared class theme?

---

## 8. Next deliverable (agreed, not started)

**The starter workspace.** Ben's stated plan: build it, then run week 1 on himself to find
the pain before eight kids do.

Should contain:
1. **Pinned 26.2 NeoForge project** — Gradle wrapper committed, versions locked, mod id
   templated per student
2. **Grounding config** — the thing that stops Gemini writing 2019 Forge code:
   - matching Kaupenjoe 26.X branch vendored as read-only reference
   - rules file: *target 26.2 + NeoForge only; never `net.minecraftforge.*`; match the
     reference imports*
   - `mcmodding-mcp` (OGMatrix) wired into Antigravity — indexes official NeoForge/Fabric
     docs weekly
3. **Pre-warm setup script** — the week-0 homework that avoids the hour-long first build
4. **The spec-sheet worksheet** — the paper artifact for "no prompt without a spec"

---

## 9. Working agreements

- Work on branch `claude/minecraft-modding-course-fsj9o7`, commit and push.
- Ben pushes back on weak reasoning and is right when he does. **Argue honestly; don't
  sell.** The pivot in §4 came from him, and the course is better for it.
- Don't let the course drift back into being an API tour. That's the failure mode.
