# What's the Point of Critical Hits? (Design Doc, 17.8 min)

**What it is:** Breaks critical hits down into two independent parts — the Trigger (what causes it: random roll, periodic, skill-based/positional) and the Bonus (what you get: extra damage, status effect, stress/resource change, negative side-effects) — and shows how varying either half changes a game's feel.
**Substance:** substantive; the Trigger/Bonus framing is the cleanest, most reusable mental model in the entire batch — explicitly named and illustrated with a title card.

## Ideas, in the video's order
- [0:01:45] Critical hits originated in 1970s tabletop RPGs (Empire of the Petal Throne's "Lucky Hit") as a way to simulate randomly landing a blow on a vital organ.
- [0:03:23] Core framing: a crit system is just two adjustable parts — **Trigger** (what causes it) and **Bonus** (what you get) — and creativity comes from varying either independently (0:04:25, explicit on-screen title card "TRIGGER / BONUS").
- [0:04:32] Trigger variant — player-controlled random chance: builds can push crit chance toward "always crits" rather than "rarely crits harder" (Hades' Artemis boons stacking to 90%+ crit chance) — same dice-roll trigger, but the player has agency over the odds via build choices, not just luck.
- [0:06:08] Random-chance triggers fit poorly in competitive skill-based genres — fighting games with luck-based moves (Smash's Dragon Quest Hero crits, Mr. Game & Watch's 9-roll instakill) draw community backlash because losing to RNG feels different from losing to a read.
- [0:07:39] Trigger variant — periodic/scheduled: a crit fires every Nth attack rather than randomly (League of Legends' Caitlyn passive) — more strategizable but can feel awkward without rhythm-game-style timing support.
- [0:08:13] Trigger variant — skill-based via precision: headshots (Goldeneye, TF2) reward aim rather than luck; still has a bit of "sometimes it lines up" random feel, but is fundamentally a repeatable, learnable skill.
- [0:08:47] Trigger variant — skill-based via timing commitment: Gears of War's Active Reload risks a worse outcome (slower reload) for a better one (faster reload + ammo) if timed right — risk/reward wrapped INTO the trigger itself.
- [0:09:51] Trigger variant — skill-based via positioning: backstabs (Dark Souls, TF2 Spy) and "sweet spot" hitboxes (Smash's Marth tipper, Falcon's knee) reward smart spacing rather than luck or reaction time.
- [0:10:59] The Bonus half is equally adjustable: it doesn't have to be "more damage" — it can be a 1-hit-KO with a real cost (Pokemon's Sheer Cold/Fissure sacrifice normal damage entirely for a ~30% instant-kill chance), a bonus status-effect roll, a resource/mental-state change (Darkest Dungeon crits also shift the whole party's Stress meter, even bystanders'), or tied to a skill-based combo trigger rather than random (Octopath Traveler's Break system rewards hitting elemental weaknesses enough times, not lucky rolls).
- [0:12:36] Balancing the size of the crit bonus is genuinely hard and has burned real games — Fire Emblem's old permadeath + high-damage random crits felt unfairly swingy; D&D avoided adding crits for ~20 years for the same reason. "Predictability is boring, unpredictability is frustrating, both are unfun" — the sweet spot needs playtesting.
- [0:14:42] Crit systems can apply to DEFENSE, not just offense: dodge/evasion chance is structurally the same Trigger+Bonus system; skill-based defensive crits exist too (Paper Mario's timed guard, Thousand-Year Door's Super Guard = full damage negation + counterattack on a tight window).
- [0:15:46] Bonus can be made partly negative to add tension: Monster Hunter's weapon "Affinity" stat can go negative, meaning some hits land WEAK instead of strong — some weapons trade high base damage for this added risk, and some games even add a "bitter critical" that turns some of those negative crits into extra-strong ones.

## What the frames add
The 4:15 frame is a genuine didactic title card: "TRIGGER" over a diagonal split from "BONUS" — the clearest non-gameplay diagram in the whole batch, worth reusing directly as a teaching visual (two labeled boxes). Otherwise standard b-roll (Hades, Smash, TF2, Gears of War, Paper Mario, Monster Hunter, Fire Emblem) confirming named examples.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Trigger + Bonus" build-your-crit worksheet (20 min)**: two-column template — left column picks ONE trigger type (random chance / positional-e.g.-sneak-attack / timing-based), right column picks ONE bonus (extra damage / apply a status effect / negative side-effect too). This is the single most portable framework in the batch — reusable for ANY kid mechanic, not just crits, and maps directly onto the "verdict" checklist the earlier game-design batch already established (risk/reward dial).
- **"Break your own crit" check (10 min)**: kid answers, in one sentence, whether their crit bonus could ever feel unfair the way the video's Fire Emblem example did (too big, too random, no way to see it coming) — reuses the video's own balance caution as a sanity check.

## Survives the move to Minecraft?
Excellent fit. Positional crits (sneak attacks/backstabs) are already close to Minecraft's real critical-hit system (falling attacks deal bonus damage) — a kid extending this ("attacks from behind deal +50% damage") is a straightforward NeoForge damage-event modifier. Trigger-based custom crit chance on a weapon (a "lucky sword" with a % chance to apply a bonus status on hit) is a well-trodden custom-item pattern. Negative-bonus crits (Monster Hunter's "sometimes hits weak") is a fun, buildable twist a kid could add to a risky weapon. Timing-based triggers (Active Reload, Super Guard) need custom input-window UI and precise client-side timing — harder for Gemini to one-shot reliably; flag as advanced/optional.

## Doesn't transfer
Applying crits to a full defensive/dodge system (Paper Mario timed guard) needs a custom UI/QTE layer Minecraft doesn't have — too much scope for a one-page spec. Periodic/scheduled triggers (every Nth hit) are mechanically fine but the video itself admits they're rare and can feel awkward without rhythm support — deprioritize.

## Honest caveats
Not oversold; every claim is backed by a specific example, and the video is upfront about the balance risk (Fire Emblem, D&D's 20-year hesitation) rather than presenting crits as an easy win. The Trigger/Bonus framing itself is the video's own invented vocabulary, not an industry-standard term — worth noting to kids/teachers that it's a teaching tool, not jargon they'll see elsewhere.
