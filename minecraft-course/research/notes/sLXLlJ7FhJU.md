# Hidden Game Mechanics: Design for the Human Psyche (Extra Credits, 7.7 min)

**What it is:** Extra Credits essay (with guest designer Jennifer Scheurle) on mechanics designers deliberately hide from the player to manipulate perception of fairness, tension and empowerment.
**Substance:** substantive: dense with concrete, named examples of real hidden systems, not just abstract advice — the strongest single idea-per-minute video in this batch.

## Ideas, in the video's order
- [0:01:43] Core premise: the human brain is bad at judging chance and self-awareness, so designers must design around that flaw, not around "true" randomness.
- [0:02:15] A stated 50% hit chance "feels wrong" if it plays out as several misses in a row, even though that's mathematically normal — players expect alternation, not true randomness.
- [0:02:50] XCOM's 95% "should hit" shots that miss feel like betrayal because players round 95% up to guaranteed — a concrete example of perceived-vs-real probability mismatch.
- [0:03:24]-[0:04:00] Named hidden-mechanic techniques: last sliver of health bar secretly represents more real HP than it displays; last few bullets secretly deal bonus damage; a lethal hit instead leaves you at 1 HP with a few seconds of invincibility ("mercy" mechanics) — all designed to manufacture close-call triumph.
- [0:04:35] Many health/damage curves are deliberately tuned to make you lose health fast early in a fight so the mercy mechanics can kick in and make the win feel earned.
- [0:04:54] Bioshock: enemies always miss their first shot at you, so you never feel unfairly ambushed while orienting yourself.
- [0:05:08] Shadow of Mordor slowly regenerates player health mid-fight to artificially extend fights for spectacle.
- [0:05:34] Coyote time: a short forgiveness window to jump after walking off a ledge; called near-universal in good platformers.
- [0:05:42] 1995 racing game High Octane: every vehicle behaved identically under the hood, but a displayed stats list made players debate "best" cars anyway — pure perception, zero real mechanical difference.
- [0:06:50]-[0:07:22] Framing point: games are "illusions," and hiding implicit rules under explicit ones is core to why they feel good; players "want to be fooled" (a claim, not something demonstrated further, but consistent with the examples above).

## What the frames add
Genuinely adds content, not just illustration: Extra Credits' house animation style visualizes several ideas as original diagrams, not stock footage — a "chance to hit: 9.2023119231121615125%" gag panel at [0:02:00], an animated door push/pull bad-design example at [0:01:09], a gun-stats shelf gag illustrating the "same stats, different feel" idea at [0:05:00], and a shotgun-vs-zombie panel dramatizing the 50%-hit-chance point at [0:02:15]. These are worth reusing directly as reference images for a class handout.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Fudge the odds" worksheet (20 min)**: kid picks one chance-based mechanic in their mod (an enchant, a mob drop, a status-effect proc) and writes down: the real percentage, and one hidden adjustment that would make it FEEL fairer than the math (e.g. "guarantee no more than 2 misses in a row," "boost the odds slightly right after a miss"). Directly buildable — Gemini can implement a pity-timer/streak-breaker on a probability check.
- **"Mercy window" spec (15 min)**: kid specs one forgiveness mechanic for their mod — a coyote-time jump window on a custom block, or a "one hit left" grace period on a custom mob fight. Concrete, single-page, and squarely inside what NeoForge can do (a timer variable and a damage-check override).
- **"Same stats, different feel" mini-lesson (10 min discussion)**: show the High Octane example and ask "where in your mod could you make something feel more special/different through flavor text or particle effects alone, without changing its real numbers?" — cheap, and teaches that presentation is part of design.

### Survives the move to Minecraft?
Very well. Every technique named (streak-breaking on chance, mercy invincibility windows, coyote-time-style forgiveness, first-hit leniency, cosmetic-only stat flavor) is a small, single-variable tweak to an existing Minecraft system (loot rolls, combat, jumping, item flavor text) — exactly the "bends an existing system" gold the GM brief calls out, and well within an 11-13-year-old's one-page spec and Gemini's NeoForge capability.

### Doesn't transfer
Nothing major; this is one of the most directly portable videos in the batch. The framing language ("games are illusions," "players want to be fooled") is philosophical scaffolding, not itself an activity — skip it in a handout and go straight to the technique list.

## Honest caveats
The video asserts several of its examples (Bioshock's first-miss rule, Shadow of Mordor's regen) without demonstrating them in footage — they're stated as fact by the presenters, not shown mechanically on screen, so treat them as reported claims rather than verified. Otherwise this is the batch's most reliable, most reusable video for actual mechanic specs.
