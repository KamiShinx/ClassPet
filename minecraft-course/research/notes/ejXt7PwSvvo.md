# What Makes A Good Super Move? (Design Doc, 26.4 min)

**What it is:** A tour of "super move" / ultimate-ability systems across fighting games, action games, JRPGs, MOBAs and racing games, organized around how each one keeps its most powerful move from either being useless or dominating the whole game.
**Substance:** substantive: the whole video is organized around one clear design tension (must be strong, can't be too strong) and works through named case studies of both successes and failures, not just examples. Sponsor read (Milanote) is short and cleanly separated.

## Ideas, in the video's order
- [0:02:58] The core paradox stated outright: a super move has to be strong enough that the buildup pays off, but not so strong it makes every other strategic option meaningless — this is the central question for any powerful item or ability.
- [0:03:32] Basic meter-fills-through-good-play loop (fighting games, Hyrule Warriors): your strongest tool becomes more available the better you're already playing — reward compounds skill.
- [0:04:37] Splatoon's meter fills via a neutral, non-combat action (inking terrain), which creates a real strategic choice: build meter safely vs. fight for tempo now.
- [0:05:09] Punch-Out's Star system combines risk-adjusted timing (harder counters earn more stars) with a full loss-aversion penalty (getting hit resets your banked stars to zero) — timing skill AND risk management, same mechanic.
- [0:07:17] Counter-example of an alternate balancing lever: Soul Calibur 2's unblockable supers cost nothing and have no meter, but are balanced purely by being extremely slow and telegraphed — recovery/wind-up time can substitute for cost.
- [0:08:19] Transformation-style supers (Devil May Cry's Devil Trigger) self-balance through brevity: short duration makes it an emergency tool, not a new default state.
- [0:08:51] Named failure case: Jak 2's Dark Jak forces melee range in a game built entirely around ranged combat — a super that fights the game's own core loop is weak no matter how much raw power it has.
- [0:09:54] Kingdom Hearts 2's Drive Forms carry an escalating risk of backfiring into a strictly worse, inescapable Anti-Form the more you use them — overuse of your best tool raises the odds of being punished for it.
- [0:14:08] Named failure case: Metroid Prime 3's Hypermode costs almost nothing (one energy tank) for near-total power, and using it can recharge the very resource that paid for it — reward is wildly bigger than the risk, a clean example of broken balance to hold up against a kid's own design.
- [0:15:44] Cooldown-based supers (MOBAs, Red Alert 2) let the designer set a fixed cadence rather than tying it to player skill; when the cooldown is visible to the opponent it becomes a second layer of mind games (bait/deny), not just a personal resource.
- [0:16:51] Named failure case, frequency not power: Mario Tennis Ultra Smash hands out its game-ending super so often that "special" stops meaning anything and normal play becomes irrelevant.
- [0:19:29] Supers as a catch-up mechanic: Advance Wars CO Powers fill faster from being attacked than from attacking — explicitly rewards the losing player, not the one already ahead.
- [0:20:32] F-Zero 99's Skyway is singled out as "brilliant" catch-up balancing: only trailing racers get a meaningfully long ride on it, so the reward scales inversely with how well you're already doing, and it's self-limiting.
- [0:23:18] Contested case: UMVC3's X Factor gets stronger the fewer teammates a player has left, letting an almost-defeated player swing a match — the video calls this "unearned" feeling even though it's balanced on paper, i.e. mathematically fair isn't always emotionally fair.
- [0:24:55] Smash Bros.'s Final Smash is deliberately unbalanced and that's fine for a casual/party context — not every powerful move needs competitive-level balance if the audience is playing for spectacle over fairness.

## What the frames add
Nothing beyond illustrating the game being cited at each timestamp: fighting-game and action-game combat clips, a few seconds of a Milanote screen-recording during the sponsor segment, and title/credits cards. No comparison charts or diagrams of the systems being discussed.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **Super Move Spec Card (20 min):** kid picks ONE trigger type for their ability from a short menu drawn straight from this video — builds by fighting, builds by a neutral action, fixed cooldown, or one-time-per-life — and one cost/risk from another short menu (short duration, backfire chance, requires commitment). This is the single most direct, ready-to-run worksheet in the whole batch.
- **"Break my own idea" exercise (10 min):** using the Hypermode case [0:14:08] as the model, kids re-read their own super move idea and answer "what stops me from just using this constantly?" If they can't answer, the item needs a real cost.
- **Catch-up vs. snowball check (10 min):** kids mark whether their ability helps a losing player recover or helps a winning player pull further ahead, using the Advance Wars/F-Zero 99 vs. X Factor contrast at [0:19:29]-[0:23:18] as the reference pair.

### Survives the move to Minecraft?
This is the most directly buildable video in the batch. NeoForge items already have a native cooldown API (like ender pearls), so a cooldown-based super is nearly the easiest thing to build. A meter that fills from combat or a neutral action (mining, walking) needs a small custom player-attribute/capability, which is more work but well within what Gemini can plausibly write for a single ability. Backfire/risk mechanics (Anti-Form-style) are buildable as a chance check when the ability triggers. Catch-up scaling (get more power the lower your health or the fewer kills you have) is an easy conditional check inside the item's use code.

### Doesn't transfer
Frame-perfect fighting-game timing windows and visible-cooldown opponent mind games need either PvP infrastructure or a UI layer the class won't have time to build. The MOBA "opponent sees your cooldown" idea is a nice concept to mention but not a week-one build.

## Honest caveats
The video treats "unearned-feeling but mathematically balanced" (X Factor) as basically settled criticism; that's the reviewer's own read of competitive-community sentiment, not a universal design law, and worth flagging to kids as an opinion, not a rule. Everything under "For our class" is my extrapolation — Minecraft is never mentioned in the source.
