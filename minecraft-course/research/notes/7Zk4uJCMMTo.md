# What Makes A Great Sleep Mechanic? (Design Doc, 22.0 min)

**What it is:** Survey of sleep as a game mechanic across three jobs — status effect (offense/defense), resource
restoration (resting), and a skeuomorphic tool for time-skips/stealth — plus a section on where sleep mechanics
go wrong (forced pacing interruptions) and how to fix that (make sleep feel like a bonus, not an obligation).
**Substance:** substantive. Same house style and density as the rest of the batch; genuinely wide genre spread
(Pokemon, Monster Hunter, Baldur's Gate 3, Sims, Outer Wilds, Metal Gear Solid, Kingdom Hearts, Final Fantasy XV).
Two Boot.dev sponsor reads (start and mid-video) are cleanly separable.

## Ideas, in the video's order
- [0:02:18] **Job 1 — Sleep as offensive/defensive status effect.** Pokemon: sleep as a long-duration turn-skip
  with real nuance — instant vs. delayed onset (Yawn = next turn, Sleep Powder = immediate but less accurate),
  counterplay items (Chesto Berry wakes instantly), and combo synergy (Rest + Chesto Berry = a free full heal
  with the drawback removed).
- [0:03:56] Monster Hunter: sleep as an OFFENSIVE setup window — any attack on a sleeping monster does double
  damage, so players build toward inflicting sleep specifically to land their slowest, highest-damage move, or
  even stack explosive barrels around the target first.
- [0:04:28] **Asymmetric sleep**: Monster Hunter gives the player a warning/cure window before sleep fully lands
  on THEM, but monsters get no such warning — sleep can feel totally different depending on which side of it
  you're on, worth designing deliberately.
- [0:05:00] Kirby: sleep as a deliberately BAD copy ability (you just sleep, nothing else) — a rare example of a
  designed "trap" choice in an otherwise all-upside system, teaching kids caution before grabbing everything.
- [0:06:06] **Job 2 — Sleep as resource restoration.** Baldur's Gate 3 splits resting into short rest (partial
  refill, safe to do often) and long rest (full refill, but risks missing time-limited world events — a real
  example given: leave an owlbear encounter to rest, and by the time you return everyone involved is dead).
  Also gates long rest behind consumable camp supplies, creating a real push-or-stop dilemma.
- [0:08:52] **Why sleep specifically (vs. any other status name) works well as a mechanic label: it's intuitive.**
  Players immediately understand what "sleep" implies without tutorializing, unlike an invented status name
  (Elden Ring's "Scarlet Rot" needs explanation; "sleep" doesn't) — a genuinely useful, generalizable UX point.
- [0:09:24] Citizen Sleeper: sleep as a HARD reset button with a cost — each cycle restores your dice/energy but
  permanently degrades your character a little, tying rest directly into a decay/mortality theme.
- [0:10:29] The Sims: sleep modeled with real consequence pressure — an energy bar drains, mood suffers as it gets
  low, and ignoring it entirely causes an involuntary collapse (passing out mid-task) rather than a clean prompt.
- [0:11:35] Outer Wilds: sleep as a skeuomorphic FAST-FORWARD tool — lets the game silently advance its
  time-loop state to whenever the player chooses to wake, without needing a separate "skip time" UI.
- [0:12:12] **Job 3 — Sleep as an alternative to combat, rewarded.** Dave the Diver: tranquilizing fish instead of
  killing them yields better-quality catches (more meat, better dishes, rarer drops) — sleep as the "do it the
  better way" path, not just a stealth gimmick.
- [0:13:18] Metal Gear Solid: tranquilizer darts as a full non-lethal toolkit across the series, with real depth
  (headshots = instant, leg shots = delayed; MGS5 has enemies adapt by wearing helmets/gas masks if you overuse
  one method, closing the loop between player tactic and enemy counter-response).
- [0:15:35] **Where sleep goes wrong: forced, poorly-timed obligation.** Kingdom Hearts Dream Drop Distance's Drop
  meter forces an immediate, uncontrollable swap to the OTHER campaign whenever it hits zero — including
  mid-boss-fight, resetting that boss's health — called out explicitly as bad pacing design, mitigated only
  partially by consumables or a manual pre-empt.
- [0:17:41] Brave Fencer Musashi: a tiredness meter degrades movement/attack speed as it climbs, then forces sleep
  outright at 100% (even mid-boss-fight) — judged as "a workable idea, [that] needs another refining pass," i.e.
  a real but imperfect middle case, not a flat failure.
- [0:19:52] **The fix: make sleeping feel like a bonus, not a punishment.** Final Fantasy XV has NO sleep status
  effect at all — instead, XP you've earned doesn't actually apply until you check into a hotel/campsite and
  rest, and BETTER hotels literally multiply the XP gain (up to 3x at a luxury suite). Reframes "you have to
  stop and rest" as "resting is where the reward happens," fitting the game's road-trip tone.

## What the frames add
Nothing beyond illustration — gameplay footage of Pokemon (sleep status, Wake-Up Slap dialogue box visible),
Monster Hunter, Baldur's Gate 3, Sims, Outer Wilds, Metal Gear Solid (multiple entries), Kingdom Hearts, Final
Fantasy XV. No diagrams or on-screen summary of the three-job taxonomy.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Bend the bed" worksheet (20-25 min) — the batch's second-strongest Minecraft-native activity.** Minecraft
  already has beds (skip night, set respawn) — kids redesign ONE property using the video's own menu: what does
  sleeping COST (nothing now; could cost hunger, an item, or a cooldown like BG3's camp supplies), what does it
  SKIP or RESTORE (currently just night; could restore a custom stat, or — FFXV-style — be the moment a
  held-back buff/XP actually "locks in"), or what RISK does it carry (currently none in Peaceful; could spawn a
  guarded window like BG3's owlbear event, where something can happen if you rest at the wrong time). Ends in a
  one-page spec for a custom bed/sleep-effect NeoForge mixes into vanilla's existing sleep hook.
- **"Sleep as the better way" mini-brief (10-15 min)**: modeled on Dave the Diver — design ONE mob that can be
  captured/pacified via a sleep-inducing item instead of killed, with a stated BETTER reward for doing it that
  way (rarer drop, bonus item). Concrete, single-mechanic, teaches "reward the non-violent path" without needing
  a whole stealth system.
- **"Don't ambush the player" red-flag tooltip (5 min, standing rule not a session)**: never force sleep/skip
  control away from the player mid-action without warning — modeled directly on the Kingdom Hearts Drop-meter
  critique [0:15:35]. Good as a general reviewer checklist line across ALL mechanic specs, not just sleep ones.

### Survives the move to Minecraft?
Very well for the "resource restoration" and "bend an existing system" angles — beds are a real, familiar,
already-moddable vanilla hook (sleep, respawn point, phantom-prevention via `statistics:timeSinceRest`), so a
custom effect or requirement layered onto sleeping is realistic NeoForge scope (a mixin/event listener on
"player wakes up," or a custom bed block). The "sleep as combat alternative" (Monster Hunter/MGS-style) maps
onto Minecraft as a status effect item (a sleep-inducing arrow/potion) that briefly disables a mob — buildable
as a custom `MobEffect` with an AI-goal override, well within scope.

### Doesn't transfer
- Citizen Sleeper's dice-based daily-resource-allocation game and the whole "each rest degrades you permanently"
  decay/mortality system needs its own resource-management framework built from scratch — too large a system for
  one 65-min class session, even as a single item; flag as inspiration for lore/lorewriting, not a mechanic spec.
- The Sims-style forced-collapse-if-ignored tiredness system and Brave Fencer Musashi's movement-degradation
  meter both need continuous stat-tracking and animation-state changes tied to it — technically possible in
  NeoForge but a multi-session build, not a single spec-and-build activity.
- Kingdom Hearts' dual-campaign character-swap mechanic has no Minecraft analogue at all — skip.

## Honest caveats
Alongside the corpse-run video, this is one of the batch's two strongest "bend an existing Minecraft system"
sources per the GM brief's own test — anchor both videos together as the batch's best mechanic-card material.
The FFXV "sleep = reward lock-in" reframe [0:19:52] is presented by the host as unambiguously the correct fix for
sleep's pacing problems; it's a strong idea but it is his design opinion, framed as a solution rather than
"one option among several" — worth noting to Ben as persuasive rather than proven. Everything else in the note
is directly attributable to specific named games in the transcript, not extrapolation, except the Minecraft
mod-scoping language in the "Survives the move to Minecraft?" section, which is mine.
