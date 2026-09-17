# How Students Actually Play & Test Their Mods

> Answers: "how do they test without a Minecraft install and an account?"
> Short version: **Gradle installs Minecraft for them. They just never log in.**

---

## 1. The misconception

`./gradlew runClient` is not a simulation, a test harness, or a headless check.
**It downloads and launches the real Minecraft game.**

The first time a student runs it, Gradle:
1. Downloads the actual Minecraft 26.2 client jar from Mojang's servers
2. Downloads all game assets — textures, sounds, fonts, language files
3. Downloads and decompiles NeoForge
4. Compiles the student's mod
5. **Opens Minecraft in a window**, with their mod already loaded

They get the title screen. They click Singleplayer. They create a world. They
play — survival, creative, full game, keyboard and mouse. Their custom sword is
in the creative menu. They mine with it, eat their custom food, wear their armor.

Everything lands in a `run/` folder inside their project — worlds, screenshots,
`options.txt`. It is a normal Minecraft installation that happens to live next to
their code instead of in `%appdata%\.minecraft`.

---

## 2. The classroom loop

This is the rhythm of every lesson from week 2 onward:

```
Edit code in Antigravity  →  ./gradlew runClient  →  Minecraft opens
       ↑                                                    ↓
       └──────────  close game, change something  ←─────────┘
```

Roughly **20–40 seconds per cycle** after the first build. A student can go
"add a laser sword" → see a laser sword → "make it purple" → see it purple,
several times in one lesson. That tight loop is what makes the course work for
11-year-olds.

---

## 3. What they lose by not logging in

| | Works without an account? |
|---|---|
| Full singleplayer — build, mine, fight, fly | ✅ |
| Their mod's items, blocks, mobs, world gen | ✅ |
| Saving worlds, screenshots, settings | ✅ |
| Multiplayer with each other on a local server | ✅ (see §4) |
| Custom skin | ❌ — everyone is default Steve/Alex |
| Playing via the official Minecraft Launcher | ❌ |
| Joining public servers (Hypixel etc.) | ❌ |

Their in-game name is `Dev`. That is the entire practical difference for 18 of
the 20 weeks.

---

## 4. Playing together

### During the term — no accounts needed
`./gradlew runServer` starts a dedicated server on `localhost`. Two one-time edits
in the generated `run/` folder:
- `eula.txt` → `eula=true`
- `server.properties` → `online-mode=false`

Then every student's dev client can connect over the classroom LAN. No
authentication, no licences. Good for mid-term "show me what you made" sessions.

### Showcase days — this is what the licences are for

**8 students, 9 licences. One account each, with a spare.** Nothing is shared,
so there is no abuse problem to solve — the earlier rotation scheme is unnecessary.

The showcase is the emotional payoff of the course, and it needs the real game:

1. Each student runs `./gradlew build` → produces `theirmod.jar`
2. Collect all 8 jars into one class modpack
3. Install **NeoForge 26.2** (official installer) into a real Minecraft install
4. Drop all 8 jars into `mods/`
5. Everyone joins one world — **each kid sees their own mod running alongside
   everyone else's, in real Minecraft, on a real account**

That moment — "my block is in the game and my friend is holding it" — is worth
the whole term.

### Keeping the licences clean
- Credentials live in MAKE's password manager and are **never typed by a student**
- You sign each account in once on a MAKE laptop with "stay signed in"
- Students sit down to an already-authenticated launcher
- Accounts stay MAKE property; they are stations, not gifts

---

## 5. Week 1 warning: the first build is slow

NeoForge's own docs are blunt about this: the first Gradle setup downloads all of
Minecraft plus NeoForge **and decompiles it** — *"up to an hour, depending on your
hardware and network strength."*

Eight laptops doing that simultaneously over school wifi is a lost lesson.

**Mitigations, in order of preference:**
1. **Pre-warm as homework.** Students run the setup at home the week before
   lesson 1, on home internet. Turn it into the first assignment: "run this one
   command and screenshot the Minecraft title screen."
2. **Stagger it.** If it must happen in class, kick off all 8 builds in the first
   5 minutes, then teach something offline — mod design, pixel-art textures on
   paper — while they churn.
3. **Never let them delete the caches.** `~/.gradle` and the project `build/`
   folder hold the expensive artifacts. A "let me just reinstall" instinct costs
   another hour.

Budget **all of week 1** for setup and expect it to be unglamorous. Every week
after is fast.
