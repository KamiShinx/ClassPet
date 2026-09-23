# Round 1: the realist seat

My lens: week 7. Two kids missed last week, one laptop won't launch, Gemini invented a 1.20 method, one kid only
wants to spawn TNT. **[practice]** = my own classroom or tooling knowledge, not from the videos.

## 1. Course shape: one small world, shipped one object at a time

The unit of progress is **one object that works in the game**. A document doesn't count. Each block ends with
the new thing running.

| Weeks | Block | Ships |
|---|---|---|
| 0 (before W1) | Setup night / take-home install | Template project launches on every laptop |
| 1-2 | First win | A reskinned vanilla item: new name, 16x16 texture, one changed number, 2-sentence tooltip. Plus the mod's theme in a few words (Stoneworks, D [0:08:59]) |
| 3-5 | Items | 2-3 more items, at least one with a Blockbench 3D model. Each has a trigger+bonus and a cost (O) |
| 6-8 | The place | One built structure with a loot chest holding their items and one "world rule" (Q1) |
| 9 | **Buffer** | Catch-up, fix, polish |
| 10 | **Showcase 1** | Seat rotation: everyone plays everyone's mod on the owner's laptop, "first 60 seconds" framing (L) |
| 11-15 | The mob | One vanilla-base mob, picked for its behaviour, then reskinned (J, `kE0PJJlhDFA` [0:01:12]). Own model, one changed behaviour, one tell |
| 16-17 | The signature thing | Choice by tier: a boss phase, a status effect, or a second mob |
| 18 | **Buffer + freeze** | Nothing new after this week, only fixes |
| 19 | Playtest | A partner asks "annoying questions" (E, Millard); patch the holes |
| 20 | **Showcase 2** | Same rotation, family invited |

Buffers are not padding **[practice]**: holidays, sickness and a dead-network day take ~2 sessions from any
20-week run. Unused, they become polish.

## 2. One typical session (week 7, "the place")

- **0-6** Laptops open, `runClient` started first thing, because Gradle is slow and it runs while we talk
  **[practice]**. Two kids show last week's object in-game on the projector, 90 seconds each.
- **6-14** One card, taught in Hebrew: e.g. "a place is one bent rule" (Q1). One vanilla example, one bad example.
  At most 8 minutes. Never two cards in one session.
- **14-20** Fill this week's object card on the platform: 5 fields, max 2 sentences each. Teacher stamps it
  "approved to prompt" on a walk-round. A kid who did the homework skips straight to building.
- **20-54** Build: prompt, run, check. Help order: card, buddy, class "Gemini-lied" log, teacher
  **[practice]**. Tiers: must (fits this session even if you missed last week), should, could.
- **54-61** In-game screenshot onto the card; status works / half / broken; one line on what Gemini got wrong.
- **61-65** Save and commit. Homework assigned (design only).

**Homework is design-only, never code** **[practice]**: unsupervised vibecoding breaks projects and next session
goes on repairs. Fill next card, paint a texture, play vanilla. Half will skip it, so no session depends on it.

## 3. What the platform holds

The whole platform is five objects. Nothing else goes in v1:

1. **My Mod page.** The theme line, then the countable scope grid (J, `B6auN-GIUeM` [0:04:18]-[0:06:27]):
   1 place, 1 mob, 3-5 items, 1 signature thing. Each box has designed / built / works ticks. This is the
   anti-disease device.
2. **Object cards** (Item, Place, Mob). Fields: name; what it does (trigger + bonus); its cost or what it's worse
   at; tell/silhouette (Blockbench screenshot or 2-4 colour pick, no drawing); tooltip (~2 sentences, enforced by
   the field, per Millard, E); where the player finds it. A "copy as spec" button turns the card into the Gemini
   prompt: the card IS the spec, not an extra chore.
3. **Tooltip cards.** ~12, one idea each (silhouette test, Mojang's 4 steps (J), one tell (L), one system warped
   (O), the cost...), shown inline at the matching field. No library to browse.
4. **Gemini-lied log.** Shared by the class, one line per catch. It is also the "judge the machine" record.
5. **Gallery.** Screenshots, one row per kid.

**Lore lives only in tooltip fields.** No world-bible page. The writer kid gets an in-game outlet: a written book
in their structure's loot chest. Test in week 0: **Hebrew may render wrongly in Java tooltips and books** (my
recollection is poor right-to-left support; unverified on 26.2). If so, the in-game text language is decided
before week 1.

## 4. What a kid has at week 20

**The floor (every kid, including the one who missed 4 sessions):** 1 place with a loot chest, 3 items (1 in 3D),
1 reskinned mob with its own texture and one changed behaviour, and 6-8 two-sentence tooltips. That is
roughly 150-250 words of lore, and all of it can be found in the game.

**Typical kid:** 4-5 items, the mob has a tell and a weakness, the place has one world rule, and there is one lore
book.

**Top 2-3 kids:** a 2-phase boss or a custom status effect, plus a second mob.

Every kid can explain: what their mob does and how you'd see it coming; why one item has a cost; one time
Gemini was wrong and how they caught it.

Not "insane lore and game mechanics": **one small, dense world where everything connects**. That is what the
evidence calls good game worldbuilding (E #2), and what 20 x 65 minutes can produce.

## 5. My three strongest claims

**A. Ship objects, not documents; lore is capped and attached to objects.** Worldbuilder's disease is the
research's most convergent finding: Sanderson (H, #8 [0:20:52]), Stoneworks (D [0:03:37]), Sins video
(D [0:15:16]), Millard and Rick's (E). Both scope devlogs unlock output only once scope is written in countable
units (`B6auN-GIUeM` [0:05:24]-[0:06:59]; `OrRDekltDOQ` [0:04:00]). A lore page is where fast writers hide and
slow writers stall **[practice]**.

**B. Every design step must work for a kid who can't draw or can't write.** The drawing-free tools exist:
Proko's "2-3 items make an archetype" (`zUATd5Lbo-w` [0:12:08]), Who/Want/Why (`nkoJTc_WzFI` [0:05:44]),
guess-the-silhouette/ability games (`nkoJTc_WzFI` [0:09:13], `5eymH15AfAU` [0:07:38]), base mob by behaviour
(`kE0PJJlhDFA` [0:01:12]), "reskin it" (`gEPeGx6IVUQ` [0:02:34]). The 2-sentence cap helps the weak writer as
much as it reins in the strong one.

**C. Order follows technical risk: items first, mobs after kids can debug, all from teacher-built templates.**
3D items are a drop-in; mobs are multi-step with unverified export settings (`_blockbench_pipeline_check.md`);
the beginner tutorial's format can't load (`vLvjhhzPtME` [0:01:20]); Gemini is often wrong on 26.2. A mob in
week 4 is the week half the class gives up **[practice]**.

## 6. How my design fails

- **The teacher becomes the queue.** Eight Gemini errors at minute 25 means one adult and eight raised hands.
  The help order reduces it, doesn't remove it: expect 2-3 kids per session with nothing working. Hence a small
  "must" tier.
- **Week 0 doesn't happen**: weeks 1-2 go on Java 25 installs and Gradle downloads over a brutal network. First
  win slips to week 3.
- **The mob block stalls** if Ben hasn't proven the Blockbench-to-26.2 mob pipeline before week 11; then it fails
  for everyone at once. Fallback **[practice]**: a teacher-built template mob; the kid swaps texture and edits one
  behaviour.
- **Cards feel like school forms.** Over ~6 minutes, they get filled with junk.
- **The "just wants to play" kid gets bored.** Give them the tester role at every rotation and a TNT-grade "could"
  tier.
- **Prep [practice, estimate]:** ~20-30 hours before week 1 (template, mob pipeline test, 12 cards, platform v1),
  then 1-2 hours a week. More weekly prep than that won't survive Ben's real week.

## 7. What I expect the other seats to get wrong

- **Lore/creativity seat:** a world bible and weekly writing prompts. Works for two kids; six write three
  paragraphs in week 3 and never open it again.
- **Game-design seat:** all ~15 checklists. At one card per session that's a worksheet course. Pick ~8.
- **Platform/tech seat:** feeds, comments, lore wiki, AI helpers. Each is Ben's maintenance on top of teaching.
- **Everyone:** 65 real minutes, full attendance, homework done, Hebrew that just works, showcases that run
  themselves. A showcase is a seat rotation on owners' laptops (not jars swapped between machines), rehearsed in
  week 9.
