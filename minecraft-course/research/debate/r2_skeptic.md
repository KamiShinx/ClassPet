# Round 2: skeptic

## What I concede

1. **Advocate: kids judge hardest when it's their own creature** (r1_advocate §7). Judgement is driven by ownership, not audit. Their "lore measured in lit links, not words" also beats my flat ~12-line cap.
2. **Game design: a well-verified boring mechanic is still boring** (r1_gamedesign §7). My claim check tests correctness, not fun. Only a weekly cold playtest tests fun (`0m60QbT85Tc` [0:26:33]).
3. **Realist: the teacher is the queue** (r1_realist §6). My 2 oral checks a week die the first time 3 builds break at minute 25, so "explain it" moves to the showcases only. And a card that takes over ~6 minutes gets junk answers; my 12-minute spec block shrinks to one claim line and one prediction line.
4. **Engineer: a `reference/` folder does more against Gemini lies than any log** (r1_engineer claim 2). Preventing lies beats celebrating them. The reference has **no boss, boss bar, structure, quest or dialogue**, and Gemini will be most wrong exactly there. With no working example to point Gemini at, a 12-year-old can't fix the wrongness, and the log becomes a list of complaints. That kills the advocate's quest chain and guardian, and everyone's W13-17 boss, **unless Ben builds a reference boss first** (as the engineer says).
5. **"Show me the line" is dead.** Nobody defended it, and a zero-coder can't use it.

## What I still dispute

- **No other seat says who writes the card.** All four make the card the spec: the advocate's Codex, the game-design seat's Rule card, the realist's and engineer's "copy as spec" buttons. None asks whether the kid wrote it or Gemini did. The advocate's ~80-word iceberg field, filled at home, is exactly where AI-written lore will land. "Design-only" homework on a laptop with Gemini one tab away is AI homework unless the AI's direction is a rule. Ideas are cheap and execution is the skill (`MEUh_y1IFZY` [0:50:17]). If Gemini supplies both, every seat's week-20 inventory still looks full and the kid did nothing. I still hold the rule: **Gemini interviews and critiques, it never authors a card. Hands make textures and models, Gemini makes code.** The realist's "approved to prompt" stamp is the cheapest place for Ben to ask "whose words?".
- **"Card = spec" only holds if the card makes a claim the game can fail.** The advocate's card fields (Who/Want/Why, trait, iceberg) are design prompts. The engineer's `oneLine` and the game-design seat's "one-sentence rule" come closest. Each card needs one line that says "in the game you will see ___", and the kid ticks it or doesn't. Without that, the "does the game match my card?" check (advocate, min 22-52) is a vibe check.
- **Volume targets.** The engineer's median is 8-12 items and 15-25 tooltips. The game-design seat wants a 3-phase boss for everyone and about 15 tunings. The advocate wants 1,000-1,500 words of lore. The realist's floor (1 place, 3 items, 1 reskinned mob, 6-8 tooltips) is the honest one. More objects than a kid can explain means Gemini made them and the kid collected them.
- **The engineer's "they can explain why Gemini's code didn't compile".** Kids can explain behaviour: "it said it would flee water; it didn't; I told it X". They can't explain compile errors, and pretending they can repeats the "show me the line" mistake.

## New fact: Hebrew in the game

If Hebrew tooltips or books render reversed on 26.2, or only render correctly with HebrewFix plus the game language set to Hebrew, then "lore reaches the player through the game" rests on an untested dependency. Every seat's lore path (the advocate's lit links, the engineer's lang export, the realist's written book) sits on it. It goes on the week-0 test list: tooltip, book, advancement text, with and without HebrewFix. The ownership angle: **cards stay in Hebrew, always**, because that's where the kid thinks, and the platform is already RTL. If in-game text has to be English, Gemini translates. The kid's small judgement task is then "does the English say what I meant?", read back to them in Hebrew. That's a real check, but it won't be reliable for kids with weak English.

## The one idea I'd steal

**The game-design seat's log line: "one change, number before/after, because the tester did X"** (r1_gamedesign §2, 58-65). It's the cleanest evidence I've seen that the kid, not Gemini, made a judgement. The tester supplies the observation, the kid decides the change, and the before/after makes it checkable. It covers iteration, taste and explanation in one line, and it does the job my oral checks were meant to do, at zero teacher cost.

## Revised recommendation

1. The unit of progress is one object working in the game (realist, engineer). A card is its spec, joined to the code by `registryName`.
2. Every card has one "in the game you will see ___" claim and one prediction, ticked pass/fail after `runClient`.
3. Weekly cold playtest + one logged change with before/after and the reason (game-design seat).
4. AI rule: Gemini interviews and critiques, never authors cards. Textures and models by hand, code by Gemini.
5. Order by technical risk: item W1-2, 3D item W3, effect and place, reskinned mob W8, Blockbench mob W11+. The boss happens only after Ben ships a reference boss. Quests, structures and dialogue stay off the default path.
6. `reference/` folder + a renames file to prevent lies. The Gemini-Lied log records only *caught and fixed* entries.
7. Week-0 Hebrew render test on 26.2 (with and without HebrewFix). Cards are always Hebrew.
8. Lore is capped at tooltips plus one book, measured in lit links, not words (advocate).
9. "Explain it", no screen, 2 minutes per kid, at W10 and W20 only.
10. Every kid gets the realist's floor. The engineer's median is the ceiling, not the target.
