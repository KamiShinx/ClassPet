# Round 1 — gamedesign seat

**Position:** the unit of work in this course is a **playable rule**. Places, mobs, items and lore are the bodies
rules live in. Game design is not a checklist on character design; it is the weekly loop *build → someone plays it
cold → tune*, every session, week 1 to week 20.

## 1. Course shape

| Weeks | Block | Purpose (evidence) |
|---|---|---|
| 1-2 | **The Toy** | Playable in week 1: reskin/bend ONE vanilla status effect, then one item with a named cost; 3-word theme + one feeling word. (O `gEPeGx6IVUQ` [0:02:34],[0:09:27]; D Stoneworks [0:08:59]; MDA `iIOIT3dCy5w` [0:04:53]) |
| 3-6 | **The Place = a rule bundle** | One biome/structure, defined by 2-3 bent rules: night rule, weather that changes 3 things, a lock-and-key door. Lore = tooltips on things found there. (Q1 `9LgVqx-pV2k` [0:12:47], `499Fcz0utKA` [0:08:56]; Q2 `wM4WF4MnZCc` [0:15:16]; E Millard) |
| 7-10 | **The Creature** | One mob from function: base mob chosen by behaviour, a *want* (= AI goal), one tell, one thing it makes you do differently. (J `kE0PJJlhDFA` [0:01:12]; G `NHTYFX24BgQ` [0:06:01]; L `Vopm0YjjQcE` [0:05:07]; I) |
| **10** | **Showcase 1: "first 5 minutes"** | Classmates play each other's mods cold; the opening is tutorial + pitch. (L `vt-xkWZH1aw`, `ZIs5189lmRA` [0:01:37]) |
| 11-12 | **Balance sprint** | Fix what W10 found: double-or-halve, dominant strategy, hoarding. (`nkLmjJK3vOw` [0:05:26]; O `NmwjgvOYx5Q` [0:02:54]; N `HT-Z03YVBPI`) |
| 13-17 | **The Boss** | Reuse-and-vary the mob; one role; 3 phases layered by health; telegraph the threat not the solution; "ever helpless?" test; no HP sponge; reward = certificate. (P1 `5rkvHVSRN3w` [0:11:14], `o0CKHLumTG0` [0:12:21]; P2; I; N `R8EyVhHRjqc` [0:14:50]) |
| 18-19 | **The Loop** | Chain it all with advancements (criteria + prize), place → item → door → boss; one expressive flourish. (N [0:07:40]; K `hbzGO_Qonu0` [0:03:49]; L `nkLmjJK3vOw` [0:28:26]) |
| **20** | **Showcase 2** | Full cold playthrough + the kid's Rule Book. |

Items (N2 cost levers, R corpse-run/sleep dials) run through every block; they are the proven-easy build.

## 2. One 65-minute session (week 14, "boss phase 2")

- **0-6 Cold play:** partner plays last week's build, no explanation; owner watches silently.
- **6-12 One card, one clip:** e.g. "each phase keeps old attacks, adds exactly one" (P2), clip ≤90 s.
- **12-20 Spec:** fill the Rule card; the card *is* the Gemini prompt.
- **20-48 Build:** Gemini → `runClient`. Minute 35: forced "double or halve one number" pass.
- **48-58 Paired playtest:** three questions: *where were you bored? what confused you? what did you do?* (F
  `6xM9rJQbU1M`; descriptive, not prescriptive).
- **58-65 Log:** one change with number before/after; one tooltip line (≤2 sentences); card status.
- **Homework:** apply the fix; texture/Blockbench pass.

## 3. What the platform holds

- **Rule card** (core object, Hebrew labels): name · feeling word · trigger → bonus (O `fMFkd7edBR0` [0:03:23]) ·
  **cost** as one of Sanderson's cost/flaw/limitation/hindrance (`3Y9p53C1lP4` [0:59:12]) · tell · one-sentence
  rule (P1 `fbQbugePXcQ` [0:07:45]) · "which ONE Minecraft system does it warp?" · lore ≤2 sentences that must
  appear in game · status idea → spec → built → playtested → tuned. G notes these categories are unambiguous
  enough to hand to Gemini: card = spec, no separate document.
- **Bodies:** Place card (2-3 Rule cards + palette + hook), Creature card (silhouette/Blockbench shot, want, tell,
  "what it makes you do"), Item card (cost lever).
- **Playtest log:** the three answers + the change, every session; the year's visible evidence of design thinking.
- **Mechanic deck:** ~60 kid-level cards from K-S to remix.
- **World page, auto-generated** from the kid's in-game tooltip lines, grouped by place. The world bible is
  *derived* from what was built, so lore cannot outgrow the mod.

## 4. What a kid has at week 20

Target: 1 place with 3 bent rules; 2 mobs (one reused-and-varied); 1 boss with 3 layered phases; 4-6 items each
with a named cost; 1 custom status effect; 1 advancement chain; 12-15 lore lines, all findable in game; ~15
playtest logs with ~15 documented tunings. Floor: 1 place, 1 mob, 1 two-phase boss, 3 items.
They can explain, for any mechanic: what the code does / what the player does / how it feels; why each cost
exists; one thing a tester did that surprised them and what they changed.

## 5. Three strongest claims

**A. The research's best material says mechanics are the spine and lore rides on them.** Q1: a place idea "is
rarely just decoration", it is almost always a rule. Q2: theme should *feed* mechanics. Sanderson's Laws are
mechanic design (G) and he ranks worldbuilding the least important leg (`3Y9p53C1lP4` [0:03:50]). The
worldbuilding batches are strongest exactly where lore becomes mechanics: cool ideas need consequences (D Sins
[0:11:58]), lore answers questions rather than padding volume (E Millard), cool thing first, justify backward (H,
Zeroeth Law). If worldbuilding's best output is rules, rules are the pillar.

**B. "Layer" confuses the size of each idea with the nature of the discipline.** Every batch reasoned "each idea
is a 15-30 min worksheet, so: layer". Worldbuilding's ideas are worksheets too (two-column brainstorm, 3-word
theme) and nobody calls it a layer. Game design *is* a loop that no checklist delivers: only playtesting tells
you how a mechanic lands (`iIOIT3dCy5w` [0:09:02]); "our brains are terrible video game simulators"
(`0m60QbT85Tc` [0:26:33]); Mojang shipped an overpowered fox and patched it (`abs30d44yzg` [0:01:44]). The
analyst's "no time for playtesting loops" (note on `iIOIT3dCy5w`) is extrapolation and wrong for this stack:
`runClient` is already how they test, a cold play is 6 minutes, 8 kids = 4 pairs. ~16 min/session.

**C. Mechanics-first is the cure for the #1 risk.** Worldbuilder's disease (SYNTHESIS #1) is planning with nothing
to play. GMTK: prototype first, plan only once you've found the fun (`B6auN-GIUeM` [0:02:46]). A session that
must end in a cold playtest cannot become three weeks of lore. Ben asked for "insane ... game mechanics" and called
game design "very important". *Own knowledge:* 11-13-year-olds are motivated by playing and by watching friends
play their thing far more than by documents.

Concession to the layer side: "insane" must mean *one rule that surprises*, not many systems (I); AAA
multi-system material doesn't transfer. I keep that cut.

## 6. How this fails in a real room

**The build fails, so there is nothing to playtest.** Gemini is often confidently wrong on 26.2, and mechanics are
code while lore is text. If a third of the kids have broken builds at minute 48, the loop collapses into waiting.
Mitigations: status effects and items before mobs; Ben pre-tests one template per block; a *paper playtest*
fallback (partner tries to break the spec, `Ys3yNeF60EY`); a broken build still gets its last working version
tested. Secondary: "playtesting" drifts into just playing (timer + three-question card); story-first kids find
number-tuning dull (tooltips, flourishes and the boss's "why is it here", P2 [0:04:02], are their outlet, but I
concede some will feel it is too mechanical); peer critique stings at 11-13; untested rate limits.

## 7. What I expect the other seats to get wrong

- **Worldbuilding:** a world bible *before* the first playable thing, lore measured in pages (Millard: more volume
  makes game worldbuilding worse).
- **Character/3D:** over-invests in custom mobs (the riskiest multi-step pipeline) and ships pretty mobs with flat
  behaviour: "reskinned mechanics aren't new mechanics" (I).
- **Coding/verification:** right that the spec is the skill, but a well-verified boring mechanic is still boring.
  The Rule card should be their spec.
- **Everyone:** treats playtesting as a W10/W20 event. If it is not weekly, no design is being taught.
