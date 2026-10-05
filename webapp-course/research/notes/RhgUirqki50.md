# Usability Testing w. 5 Users: Design Process (video 1 of 3) (NNgroup, 3.6 min)
**What it is / substance:** Jakob Nielsen, talking head + simple text overlay, delivers one single, well-evidenced idea: test with 5 users per round, not more, and do several rounds instead of one giant one.
**Yes** — assign as-is. Short, single-idea, no jargon, no tool demo, ages fine (concept has not changed).

## The ideas (in order, with [h:mm:ss])
- [0:00:00]-[0:01:02] Each new tester shows you less and less *new* information: tester #1 is all new, but by tester #5 you're mostly seeing things you already saw from testers #1-4. Watching more than 5 becomes boring and wasteful because so little is new.
- [0:01:02]-[0:01:33] So: **stop at 5, fix the design, test the new version with another 5**, and repeat as many rounds as your budget allows.
- [0:01:33]-[0:02:03] Worked example: with a budget for 20 test users total, it's much better to run **4 rounds of 5** (4 different design iterations, each improved from the last) than **1 round of 20** on a single design. You learn a little more per-round with more testers, but you get *far* more total improvement from iterating.
- [0:02:03]-[0:02:37] Exception: this "5 is enough" rule is for **qualitative** usability testing (the goal is finding problems / driving up quality). It does NOT apply to **quantitative** research (the goal is a statistically solid number/metric) — that needs a much bigger sample size. Also excluded: card sorting and some eye-tracking studies, which need more people by their nature.

## Vocabulary for prompting Gemini
- **Usability testing round / iteration** → one cycle of "watch people use it, then fix problems" → "let's do a quick round of testing after this next change, not just at the very end."
- **Qualitative vs quantitative testing** → qualitative = watching a few people to find problems; quantitative = testing many people to get a reliable number → not something kids will prompt Gemini with directly, but useful when deciding whether "ask 3 friends" is enough (usually yes, for finding bugs/confusion).

## Before/after examples from the frames
No before/after UI examples — this is 100% talking head on a green screen. The only visual add is text overlay reinforcing the math at [0:01:44]-[0:02:32]: "20 users total = 4 iterations x 5 users each," which is a clean, reusable formula to put on the library page as-is. Nothing else in the frames adds anything (see notes/jn6nT5JVmoc.md for a real UI example to pair with this).

## Page material
- **Rules of thumb:**
  1. Test with about 5 people at a time — more than that mostly repeats what you already learned.
  2. Fix what you found, then test again with a fresh 5 — repeat as many rounds as you have time for.
  3. More rounds of testing beats more people per round, if the goal is finding and fixing problems.
  4. This 5-per-round rule is for finding problems, not for getting an exact statistic (like "73% of users clicked X") — that needs many more people.
- **Exercises:**
  1. Round up 3-5 classmates (or family) over a week. Watch each one try your app for 2 minutes without helping them. After each one, write down the ONE most confusing moment you saw. Did tester #4 or #5 show you anything new, or was it the same problem again?
  2. Plan how you'd split 15 total testers across your semester: one big test at the end, or 3 smaller tests spread out? Write down why.
- **Quiz:**
  1. Q: If you have 15 people you can test with over the semester, is it better to test once with all 15, or 3 times with 5 each? A: 3 times with 5 each — you get more total design improvement because you fix problems between rounds.
  2. Q: When would you actually need more than 5 testers? A: When you need a reliable statistic/number (quantitative research), not just to find usability problems.
- **For a Gemini/Apps Script game:** applies directly and needs no adaptation — after each build milestone, get 5 classmates to try the game/app for a few minutes, fix what confused them, then test the next 5 on the improved version. This is cheap, needs no tools, and fits a school project's natural pace (a few small releases across the year) far better than one big test at the end.

## Caveats
None to flag — this is timeless advice, generic enough to still be correct, and short enough that its total runtime cost is trivial next to its value. No AI-building content, no code, no outdated UI.
