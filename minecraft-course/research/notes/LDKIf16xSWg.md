# What's The Deal With Corpse Runs? (Design Doc, 22.3 min)

**What it is:** A deep dive on the corpse-run mechanic (recover your stuff from where you died): its origin in
MUDs, the Diablo/Soulslike template and its variations, lighter-touch versions (Mario Odyssey, Tunic), Minecraft's
own version, and an extended critique of what goes wrong (bad bloodstain placement, Silksong as the breaking
point) plus the host's explicit negative verdict on the mechanic overall.
**Substance:** substantive. The most opinionated and argument-driven video in the batch — the host states a
clear personal verdict ("I really don't like the corpse run") backed by named failure cases, not just a neutral
survey. Boot.dev sponsor read is cleanly bounded.

## Ideas, in the video's order
- [0:02:20] **Core definition**: on death, some resource (gear, gold, XP) stays where you died; recovering it is
  the whole mechanic. Traces to 1970s MUDs, popularized by Diablo (items/gold drop in place, nothing about the
  world resets — the enemy that killed you is still camping your loot).
- [0:03:26] **Why it works**: makes players actually fear losing a character, gift-wraps a concrete goal ("go get
  your stuff back, right where you last saw it"), and reframes a death as "beat the challenge that beat you" —
  contrasted with a lives system or checkpoint reload, where death has much less felt weight.
- [0:05:02] **The Soulslike template (Demon's Souls onward)**: half your max health gone on death, lose currency
  AND experience together (souls), one bloodstain only — lose that one too and it's gone forever. High stakes are
  the point: reinforces slow, cautious, observant play.
- [0:07:18] **Franchise shows the knob can be tuned**: Dark Souls 1 removed the health penalty; Dark Souls 2 made
  it a small 5%-per-death stack instead of a single big hit; Bloodborne made you FIGHT an enemy that absorbed your
  bloodstain instead of just walking up to it; Elden Ring shortened the average run with more frequent checkpoints
  near bosses. Same core idea, four different severity dials.
- [0:08:55] Hollow Knight adds narrative weight: your "Shade" isn't a static pickup, it actively attacks you with
  your OWN learned spells, and can be bought off (bypassed) for a price if you don't want to fight it — mechanic
  and story reinforce each other.
- [0:10:31] **Lighter-touch versions exist and work fine in a different tone**: Mario Odyssey drops only 10 coins
  (cosmetic currency, no real pressure — becomes a "remember dying here" marker, not a demand). Tunic drops 20
  gold tied to a ghost, slightly more tension than Odyssey but nowhere near Soulslike stakes.
- [0:11:36] WoW's classic "walk of shame" corpse run had a social side-effect: it became downtime for guildmates
  to chat/debrief mid-raid — a mechanical cost accidentally created a social good.
- [0:12:42] **The host's stated verdict: he personally dislikes the mechanic, and says viewer feedback on his
  preview post was "almost universally negative"** — flagged explicitly as his opinion plus informal audience
  sentiment, not a claimed objective fact.
- [0:12:42] **Failure case 1 — placement is genuinely hard to get right**: Shovel Knight's money bags can land
  literally on top of the hardest platforming section or directly above the pit that killed you, sometimes making
  recovery near-impossible; the host calls it borderline "not good for the overall experience."
- [0:13:44] **Failure case 2**: Blasphemous's bloodstains ("Guilt Fragments") can spawn bugged INSIDE walls or on
  instant-kill spikes — an unintentional design failure (vs. Shovel Knight's possibly-deliberate one), partially
  patched with a pay-to-recover NPC.
- [0:15:22] **Minecraft's own corpse run, described directly**: on death, your inventory spills out like a
  piñata and stays put — but disappears after a hard 5-minute timer regardless of how far you are from where you
  died. Framed as a notably strict/unforgiving version once you account for travel time.
- [0:16:58] **Failure case 3 — Silksong, treated as the mechanic's breaking point**: your cocoon (bloodstain
  equivalent) often lands INSIDE a boss arena or amid a mob horde, so retrieving it requires re-committing to the
  fight that killed you — a sunk-cost spiral that can grind pacing to a halt for underprepared players, though
  Team Cherry added mitigations (convert cash to a carried item beforehand; a one-time "retrieve from anywhere"
  consumable; an equippable that keeps half your rosaries on death).
- [0:21:47] **Final synthesis**: corpse runs are genuinely two-faced — real stakes/tension for some players, pure
  discouragement/padding for others — and there's no universally correct answer, only "match the mechanic to
  the vibe you want."

## What the frames add
Nothing beyond illustration for most of the runtime — gameplay footage of Diablo, Dark Souls, Bloodborne, Hollow
Knight, Blasphemous, Silksong, Shovel Knight. **One directly relevant exception**: real Minecraft Survival-mode
footage appears at [0:15:30]-[0:15:53] showing an actual player death with items scattered on sand/beach terrain
— useful as a literal screenshot reference for "this is what we're bending," worth grabbing as a still for a
class handout instead of re-describing it.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Tune Minecraft's own corpse run" worksheet (20-25 min) — the batch's strongest Minecraft-native activity.**
  Kids start from the REAL vanilla rule (items drop, 5-minute despawn timer, no world reset) and change exactly
  ONE dial using the video's own comparison table: severity (lose nothing extra vs. lose XP too, Soulslike-style),
  placement/recovery risk (does the mob that killed you guard the loot, Diablo/Bloodborne-style), or a rescue
  valve (a craftable item that recovers your grave instantly, like Silksong's Silkeater or Blasphemous's paid
  NPC). Ends with a one-page spec Gemini can plausibly build as a custom "grave" mechanic (a `GraveMod`-style
  block/entity holding a dead player's drops with custom rules) — NeoForge has real precedent for this
  (community grave mods exist), so it's buildable, not speculative.
- **"Where would this break?" placement audit (10-15 min)**: given a kid's own base/world area, ask them to spot
  a place their own custom grave/bloodstain mechanic could land somewhere unrecoverable (a cliff edge, lava,
  inside a wall) — directly from the Shovel Knight/Blasphemous failure cases [0:12:42]-[0:14:51]. Good paired
  peer-review exercise.

### Survives the move to Minecraft?
Very well — better than any other video in this batch — because Minecraft ALREADY HAS a corpse-run system
(item drop + 5-min despawn), so kids aren't inventing a mechanic from nothing, they're tuning an existing,
familiar one. This is exactly the brief's "bends an existing Minecraft system" gold case. A custom "grave" that
preserves items past 5 minutes, adds an XP/soul-shard penalty, or requires braving a spawned guardian mob to
reclaim your stuff are all realistic NeoForge scopes (custom block/entity + inventory NBT capture on death +
despawn-timer override) — well within "can Gemini plausibly build this" for a NeoForge mod.

### Doesn't transfer
- The social-downtime side effect (WoW guild chat during a corpse run) is an emergent multiplayer phenomenon,
  irrelevant to a mostly-singleplayer class project.
- Narrative-weight versions (Hollow Knight's Shade fighting you with your own spells) require a scripted
  enemy-AI-mirrors-player-progress system — too complex to spec in one page for this age group; worth mentioning
  as "cool but advanced," not assigning.
- Password/no-reset MUD-era history is background context only, not a design lever kids can turn.

## Honest caveats
This is the batch's best single video for the "bends an existing Minecraft system" test the GM brief asks for —
flag it as the anchor video for this batch's mechanic-card section. The host's stated dislike of the mechanic
[0:12:42] and the "almost universally negative" viewer reaction he cites are both explicitly his own read of an
informal comment-section reaction, not measured data — don't present that as "corpse runs are bad," present it
as "this designer and his audience skew negative on high-stakes versions, lighter versions (Mario Odyssey) get no
such complaint," which is the more accurate and more useful takeaway for kids designing their own dial.
