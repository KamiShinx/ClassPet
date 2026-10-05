# Batch T1 — genre-specific RPG case studies (9 videos, all Design Doc)

All nine videos are Design Doc essays on classic JRPGs (FFIX, FFVIII, FFX vs FFXIII, Octopath Traveler, Golf Story,
Kingdom Hearts, Paper Mario: Color Splash, random battles, turn-based combat theory). As flagged in the batch brief,
this is the lowest-relevance batch reviewed so far: most of the content is turn-based menu combat, fixed-camera
level linearity, or scripted-JRPG story structure — none of which exist in Minecraft's real-time, player-built
sandbox. Roughly two-thirds of these nine videos produced nothing usable beyond a one-line "doesn't transfer"
note. The handful of ideas that do transfer are strong exactly because they're small, discrete mechanics rather
than whole genre conventions — which is the same shape of idea the earlier game-design batch already favored.

## Strongest ideas across the batch
1. **Reward mastery, not just kills** (Kingdom Hearts Tech Points, zcYSbfrO5uo [2:23]) — bonus XP/loot for a
   telegraphed skill move (parry, weak-point hit, block) is concrete, well-explained, and maps directly onto
   Minecraft's existing shields/crits/weak-point mobs (Enderman eyes, Warden telegraph).
2. **Mimic-style disguised danger** (random battles video, 2AoDncT2xc8 [12:26]) — an object that looks exactly like
   a safe one (chest, crop, sleeping villager) but is secretly hostile. Directly buildable, directly fun, directly
   "bends an existing Minecraft system."
3. **Visible stat feedback** (Golf Story, WqegUV4H_40 [3:58, 6:10]) — a stat boost should be something a player can
   SEE happen in the world (further ball flight, faster break animation), not just a hidden percentage. Best-argued
   idea in the batch; vanilla Minecraft enchants (Sharpness, Efficiency) already do this well, giving kids concrete
   examples to point at.
4. **Risky vs. safe version of the same verb** (Octopath Path Actions, tuKHsssldTE [2:53]) — same tool, two uses:
   a safe low-reward one and a risky high-reward one with a real cost if caught. Clean worksheet format (two-column
   card, screenshotted at [3:00] in that video).
5. **Optional deep content, separate from required progression** (Disgaea Item World via ktogjiX3eI4 [16:20]) — an
   optional structure/dimension with escalating floors that rewards depth without gating the main mod content on it.
6. **Gear teaches you an ability the more you use it** (FFIX AP system, SKEp3fX1JT4 [8:47]) — a permanent unlock
   earned through use rather than a level-gate; buildable as a use-counter + advancement trigger.

## Where videos agree or contradict
- Several videos (FFVIII/hptoJEQPcSg, Paper Mario/39l8AEa6rY8, turn-based/ktogjiX3eI4) independently converge on the
  same caution: a system can look deep or ambitious and still fail if new players can't learn how to use it, or if
  its trappings are kept without the substance that made them work. None of these give a buildable mechanic, but
  the *caution* is worth saying out loud during spec review: "can you teach this in one sentence?"
- No real contradictions between videos — they're all the same channel with a consistent design vocabulary — but
  several (FFX vs FFXIII, Octopath's story-structure critique) spend most of their runtime on scripted-narrative or
  fixed-level-design problems that plainly don't exist in an open, player-built Minecraft world, and say so
  implicitly by never touching a sandbox-relevant example.

## Ideas to cut
- All turn-based combat mechanics specifically (Break/Guard weakness systems, BP banking, turn economy, ATB,
  action-command QTEs) — no real-time equivalent, and Minecraft's combat model makes the entire "turn" concept moot.
- All "hide the linear map" level-design tricks (pit-stop NPCs, minigame detours, hidden treasure in an
  author-built corridor) — assumes an author-controlled critical path Minecraft's open world doesn't have.
- Marc LeBlanc's 8-types-of-fun taxonomy (hptoJEQPcSg [7:50]) — real design theory, but too abstract for an
  11-13-year-old worksheet; MDA (already in the earlier batch per the brief) is the simpler, already-adopted lens.
- Scripted multi-protagonist story-structure fixes (Octopath's chapter-pairing proposal) — novelist/showrunner
  craft, belongs to worldbuilding lore at most, not game mechanics.

## Mechanic cards
1. **"A mob only drops its rare loot if you block its telegraphed attack within a tight window instead of just
   tanking it — what stops players from just face-tanking anyway?"** (Kingdom Hearts Tech Points, zcYSbfrO5uo [2:23])
2. **"A chest looks completely normal but is secretly a hostile mob in disguise — how often can you use the trick
   before players stop trusting normal chests?"** (random battles / Mimics, 2AoDncT2xc8 [12:26])
3. **"An enchantment that boosts a stat the player can actually SEE happen (further knockback, faster swing) instead
   of a hidden number in a tooltip — which vanilla enchants already do this, and which don't?"** (Golf Story,
   WqegUV4H_40 [6:10])
4. **"A tool has a safe use and a risky 'rogue' use on the same target — the risky one gives more but can turn a
   village hostile if you're caught — what's the tell that warns the player they're pushing their luck?"** (Octopath
   Path Actions, tuKHsssldTE [2:53])
5. **"An optional dimension with floors that get harder and better-rewarding the deeper you go, but the mod's main
   content never requires you to enter it — how do you reward the players who love it without punishing the ones
   who skip it?"** (Disgaea Item World via ktogjiX3eI4 [16:20])
6. **"Wearing a piece of gear slowly teaches you its special move permanently, even after you take the gear off —
   how do you make swapping gear before a fight feel like discovery instead of a menu chore?"** (FFIX AP system,
   SKEp3fX1JT4 [8:47])

## Verdict line
This batch does not change the "layer, not pillar" verdict — if anything it reinforces it. The videos that carry
the most runtime (turn-based combat pain points, linear-level disguising, scripted-story structure) have almost
zero surface area with a real-time, open-world, player-built Minecraft mod, which is a stronger version of the
"probably low relevance" warning the brief predicted. The handful of ideas that DO transfer are exactly the same
shape as the earlier batch's checklist items (a risk/reward dial, a mob that asks something different of the
player, a boss telegraph) — small, one-page-spec-able mechanic cards, not a new systemic pillar. If anything, this
batch argues for trusting genre-agnostic mechanic sources over genre-specific ones going forward: every idea that
survived here (mastery rewards, disguised danger, visible feedback, risky/safe verbs, optional depth, use-based
unlocks) is a general game-design pattern the JRPG case study happened to illustrate, not something unique to
JRPGs that a Minecraft mod needed JRPG research to discover.
