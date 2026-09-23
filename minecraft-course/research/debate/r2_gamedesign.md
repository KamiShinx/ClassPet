# Round 2 — gamedesign seat

## What I concede

1. **The 3-phase boss block goes.** The engineer found no boss, boss bar or structure in the reference mod, so my
   W13-17 bet on the one thing Gemini has no 26.2 code to copy. Now: **2 phases by health threshold, layered**
   (P2 [0:02:22]), only after Ben builds a reference boss; boss bar optional; realistic for "maybe 5 of 8".
   Everyone else: a second mob with one new attack (P1 reuse-and-vary, `5rkvHVSRN3w` [0:11:14]).
2. **"The Place" can't be a W3-6 structure.** A place = **vanilla biome + what spawns there + one night/weather
   rule** (event handler, the engineer's W14). The buildable part of Q1's "place as rule bundle" is the rule.
3. **Order follows the cost gradient**: item → status effect → reskinned mob → custom mob → boss. A mob before
   W8 bets the first showcase on an unverified pipeline (engineer, realist).
4. **No code homework.** I had "apply the fix" at home; unsupervised Gradle breaks projects. Fixes happen in class.
5. **Too many checklists.** Realist's "pick ~8" and the skeptic's "frameworks as recipes make cooks"
   (`SyuJI8xU0gc` [0:10:29]) land. I keep ~8 cards: warp ONE system, trigger+bonus, cost (Sanderson's four), one
   tell, "what must the player do differently", teach-it-cold, double-or-halve, "ever helpless?".
6. **Lower targets.** Floor: 1 place rule, 3 items, 1 reskinned mob. Typical: + 1 status effect, 1 custom mob,
   5-6 items with named costs, ~8 logged tunings. Top: 2-phase boss.

**Hebrew (new fact).** The risk hits text-borne lore hardest and behaviour-borne lore least: a mob that flees
water and glows before it lunges tells its story whatever the tooltip renderer does. A small point for
mechanics-first, not a big one. In-game text = names + ≤2 sentences; Rule cards, logs and the world page live on
the platform, which already does Hebrew RTL. Ben's week-1 test must include tooltips and books with the game
language set to Hebrew (vanilla only applies BiDi then); if it fails, in-game text language is decided before
any kid writes lore.

## What I still dispute

**Playtesting must be weekly AND change something.** Four of five seats already have a weekly cold swap
(advocate 60-65, skeptic 45-55, engineer 48-56, mine 48-58), so on minutes the "layer" position has lost. What
still separates us is what happens to the feedback. In the advocate's and engineer's sessions a partner gives one
line and the session ends: a mini-showcase, not iteration. The design skill is the next step: one number changed,
why, and whether the next tester behaved differently. Only playtesting tells you how a mechanic lands
(`iIOIT3dCy5w` [0:09:02]); "brains are terrible video game simulators" (`0m60QbT85Tc` [0:26:33]); Mojang patched
its own overpowered fox (`abs30d44yzg` [0:01:44]). The realist tests only at W10/W19/W20: two chances a year to
learn from a stranger playing your thing is too few.

**The advocate is right about the card, wrong about what counts as done.** All five cards converged (trigger,
cost, tell, worse-at, ≤2-sentence tooltip). The advocate celebrates lit lore links; the engineer "in game". I'd
celebrate **"tuned after a cold test"**. A link lights up for a mob nobody enjoys fighting.

**The skeptic's checkable claims are the best framing but stop at "matches my spec".** "Dies in 4 hits" can pass
and still be a damage sponge (`o0CKHLumTG0` [0:12:21]). Verification asks "did Gemini build what I asked?";
playtesting asks "was it worth asking for?". Both are needed; only the second is game design.

## The one idea I'd steal

**The skeptic's prediction box, aimed at the player instead of the code.** Before the swap the kid writes "my
tester will ___" ("back off when it glows red"), then compares it with what the tester did. That is MDA's
*dynamics* made checkable by a zero-coder, with no framework vocabulary, and nobody else (Gemini included) can
write it for the kid, which answers the skeptic's ownership worry too.

## Revised recommendation

1. Every card is a spec with pass/fail claims (skeptic), joined to the mod by `registryName` (engineer).
2. Cost-gradient order: item → status effect → reskinned mob (W8) → custom mob (W11) → place rule → optional boss.
3. Weekly, 10-15 min: predict what the tester will do → cold play → compare → change ONE thing (double/halve) → log why.
4. Platform v1: cards, a build/playtest log ("predicted / saw / changed / because"), gallery. Nothing else.
5. ~8 tooltip cards, one per session, never two; MDA lives only as the prediction question.
6. Code only in class; homework = Blockbench, textures, next week's card.
7. In-game text = names + ≤2 sentences, gated on the week-1 Hebrew render test.
8. Boss = 2-phase stretch after Ben's reference boss exists; fallback is a reused-and-varied second mob.
9. Showcases W10 and W20; W11-12 is revision driven only by playtest findings.
10. W20 success = every kid can show one mechanic they changed because of what a real player did.
