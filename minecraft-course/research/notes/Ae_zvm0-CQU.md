# What Makes a Good Level Up System? (Design Doc, 17.9 min)

**What it is:** A survey of leveling-system design across RPGs/action games: intrinsic vs extrinsic progression, plain EXP-threshold leveling, point-allocation, skill trees, and currency-based unlocks, with named-game examples throughout.
**Substance:** substantive: dense, example-driven essay with a real taxonomy (intrinsic/extrinsic, then five sub-styles of extrinsic leveling), not padding beyond the two sponsor reads.

## Ideas, in the video's order
- [0:02:51] Progression is the reason games stay interesting; leveling is just one implementation of "progression." (generic but true framing)
- [0:03:26] Intrinsic progression = player's own skill/knowledge growth, game gives no explicit reward (chess, fighting games). Deep but brutal on beginners.
- [0:06:11] Extrinsic progression = the game hands out a guaranteed, visible reward for time spent, regardless of skill. Easier to design, reliably satisfying.
- [0:07:13] Baseline case: Pokemon's EXP-threshold leveling is dressed up only by periodic new moves/evolutions — without those "events" a pure EXP grind reads as a treadmill.
- [0:08:17] A leveling system that is just a number going up (no new content tied to it) is recognized as a treadmill by experienced players and feels less rewarding.
- [0:08:49] Super Paper Mario's mistake: mechanical leveling (score-based) is completely divorced from story progression, so the level-up system feels pointless — no gating, no mystery, no agency.
- [0:09:22] FFIX/Lost Odyssey: overlapping multiple leveling tracks at once (stats + equipment-based abilities + passive "magic stone" slots) means the player is "leveling something" almost every fight, which hides the grind.
- [0:11:27] Point-allocation systems (Castle Crashers: level up, then spend points yourself across a few stats) give agency and a build identity cheaply.
- [0:12:30] Skill trees are point allocation applied to abilities instead of stats: they parcel out new moves one at a time so players aren't overwhelmed and each move gets "its own spotlight" before the next unlocks.
- [0:14:06] Too many overlapping currencies/systems (XP + 6 token types + story unlocks in Spider-Man) gets unwieldy; Devil May Cry simplifies to one currency for everything.
- [0:15:11] Dark Souls: currency AND experience are the same resource ("souls"), and it's lost at your death spot unless you recover it — this risk/reward loop is what makes the leveling economy tense.
- [0:15:43] FFXV: banking XP until you rest introduces a "dominant strategy" trap — better hotels give bonus XP, so players beeline to them and skip other content. (Caution: optimizing systems can accidentally suppress the content you wanted people to see.)
- [0:17:13] Closing thesis: dot the leveling path with new features/options, and show tangible benefit for time spent, or it's just a treadmill.

## What the frames add
Mostly a talking-head intro/outro (sheet_001, sheet_005) plus wall-to-wall gameplay clips illustrating whatever game is being named at that second (Persona, Chrono Trigger, Pokemon, Souls, Hollow Knight, Smash, chess, Spider-Man, FFXV) — pure illustrative b-roll, adds nothing beyond what's already said in the transcript. One partial exception: [0:13:15]-[0:13:30] actually shows Spider-Man's real skill-tree UI (three named branches — Innovator/Defender/Webslinger — with node icons, cost %, and a "purchase skill" button), which is a clean visual reference for what a legible in-game skill-tree screen looks like, useful if we ever want to mock one up as a worksheet diagram.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Design your enchantment path" worksheet (25-30 min)**: from the point-allocation/skill-tree idea [0:11:58]-[0:13:05], have each kid sketch 4-6 upgrade nodes for a custom item or armor set they're building (e.g., "tier 1: faster mining, tier 2: pick one of [fire resist / night vision], tier 3: ..."), forcing them to decide what's gated by what. This becomes the spec they hand to Gemini for a custom enchantment or item NBT/data-driven ability tree.
- **"One currency, not five" review pass (10 min, generic-but-useful rule)**: before finalizing a mod's reward plan, ask each kid to list every resource they planned to add (XP, custom currency, tokens, drops) and cut down to as few as defensible, using the Spider-Man/Devil May Cry contrast [0:14:06] as the cautionary example. Directly prevents scope creep in an 8-kid group project.
- **"Treadmill test" tooltip (5 min gut-check, reusable every week)**: "does leveling up your thing give something NEW (an ability, a look, a place) or just a bigger number?" — apply to any progression mechanic a kid proposes.

### Survives the move to Minecraft?
Minecraft already has an XP/enchanting system (extrinsic, threshold-based) plus advancements (achieve-criteria unlocks) and villager trading. The video's ideas mostly bend existing systems rather than needing new ones:
- Point-allocation / skill trees are NOT native to vanilla Minecraft — NeoForge capabilities + a custom GUI or command-driven "choose your upgrade" system would be needed. This is buildable by Gemini (custom item NBT + right-click menu or an advancement-triggered dialog) but is a bigger ask than reskinning enchanting.
- The "risk/reward currency you can lose on death" (Dark Souls souls) directly maps onto a custom XP-drop-on-death variant, or reusing/tuning vanilla XP-drop-on-death, which Minecraft already partly does — an easy bend of an existing system.
- The "don't let a bonus system create a dominant strategy" caution (FFXV hotels) is a genuinely useful general design-review question for any custom mechanic a kid adds to trading, brewing, or enchanting.

### Doesn't transfer
- The deep narrative-gating examples (Undertale, Chrono Trigger, Nier) are about story systems irrelevant to a game-mechanics-only mod; skip.
- Comparing 10+ different games' numeric tuning (EXP curves, multiple XP bars) is analysis for its own sake — too abstract and not spec-able by an 11-13-year-old in one page.

## Honest caveats
The video is a solid, non-padded essay but it is entirely about single-player RPG/action-game leveling curves — it never touches multiplayer or sandbox games, so nothing here is Minecraft-specific; every idea needs translating by us. The claim that "a leveling system can't really fall into feeling static" once it's extrinsic [0:06:43] is stated too strongly — the video's own Pokemon/Paper Mario examples show extrinsic leveling absolutely can still feel like a treadmill. Worth flagging: this video and the New Game Plus video (also in this batch) both independently land on "spread rewards across the whole playthrough, don't front/back-load them" — a idea that recurs across the batch (see batch notes).
