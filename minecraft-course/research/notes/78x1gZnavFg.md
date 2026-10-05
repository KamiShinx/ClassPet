# What's Up With These Sketchy Tutorials? (Design Doc, 19.1 min)

**What it is:** Three case studies of subtly broken tutorials: an open-world tutorial that never clearly ends
(BOTW vs. TOTK), a tactics game that teaches lessons at the wrong time (Unicorn Overlord), and a party game that
hides a core rule from players (Hypnotorious).
**Substance:** substantive: dense case studies throughout; ~90s Surfshark sponsor read near the top is clearly
separated and skippable.

## Ideas, in the video's order
- [0:01:47] Lesson 1, "the tutorial is leaking": a tutorial needs a clear, legible END point — BOTW's Great
  Plateau cleanly closes its tutorial after 4 shrines and hands over the whole map.
- [0:03:53] TOTK's Great Sky Island copies BOTW's structure, but the tutorial doesn't actually end there — it
  continues informally (Lookout Landing still gates the paraglider/towers; the Depths and Geoglyph questlines are
  effectively hours-long secret tutorials with no clear finish line).
- [0:07:08] TOTK's 7 "Combat Training Shrines" are explicit tutorial content placed far off the main path (one is
  hours away in Akkala); because of the scattered placement, useful mechanics like Sneakstrike become easily,
  silently missable for the entire game.
- [0:08:41] Takeaway: an open-world game that keeps "secretly" tutorializing well past its stated tutorial zone
  blurs what's required knowledge vs. optional, undermining the open structure itself.
- [0:09:14] Lesson 2, "timing is everything": a lesson sticks best the closer it is to when the player actually
  needs to use it — the tighter that gap, the better, especially for complex lessons.
- [0:10:18] Unicorn Overlord's class-showcase fights teach a class's strengths/counters at essentially random
  points in the open world, sometimes before the player even has the countered unit type yet, so the lesson can't
  be applied when it's given.
- [0:11:55] The "overleveling is the backup plan" trap: if a player can brute-force past a "lesson" fight by being
  a higher level, they win without ever engaging with the taught mechanic — so it never sticks, and bites them
  later when the game gets harder (the in-game reference encyclopedia is too thin to help retroactively).
- [0:13:33] Lesson 3, "don't hold back": tutorials are the wrong place to be an "unreliable narrator" — withholding
  a core rule from the player breaks their ability to play meaningfully.
- [0:14:04] Hypnotorious (Jackbox Party Pack 10) hides the existence of a secret "Outlier" role from all players,
  including the outlier themself, until two-thirds through the round — the outlier has been playing with zero
  knowledge of their actual objective for most of the game, and even repeat players report it's still unclear how
  to play correctly.
- [0:16:48] The tell-tale sign of a broken tutorial: players start informally reteaching the game to newcomers
  before the game's own tutorial gets to it — "if your players feel compelled to rewrite the tutorial, that's a
  sign it isn't doing its job."

## What the frames add
Mostly gameplay b-roll matching the narration exactly (BOTW/TOTK exploration and shrine footage, Unicorn
Overlord's tactics UI). The Hypnotorious screens ([0:14:00]-[0:17:45]) do visually clarify the actual game flow
(category-reveal cards, brain-cartoon "X is the Outlier" reveal, group-matching screens) better than the
transcript alone, though this detail isn't decision-relevant for our class since the game itself doesn't transfer.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **Clear finish-line check**: for any in-mod hint (floating text, sign, advancement toast), the kid must be able
  to answer "at what exact moment is a classmate expected to know everything they need?" If the answer is fuzzy,
  the tutorial is leaking. 10-15 min discussion + fix.
- **Teach-it-where-it's-used rule**: if an item/mob teaches a specific counter or technique, the FIRST place a
  classmate can learn it must also be the first place they NEED it — no separate "showcase room" divorced from
  real use.
- **No-hidden-rules honesty pass**: playtest with a classmate who has zero context, then ask afterward "was there
  anything about how this worked that you only found out by accident, or that I never told you?" If yes, that's a
  leak or a withheld rule to fix. The most directly showcase-relevant single exercise in the whole batch — it
  literally simulates the W10/W20 cold-play condition.

### Survives the move to Minecraft?
All three lessons are structure/communication design, not engine-heavy — fully buildable with vanilla-feeling
advancement toasts, signs, particle cues, or simple ability gating, no custom UI required. A very good fit for a
single-mechanic mod demo specifically because the failure modes described (leaking, bad timing, hidden rules) are
exactly what an untested student build is likely to suffer from.

### Doesn't transfer
The specific genre mechanics used as examples (Unicorn Overlord's tactics class system, Hypnotorious's
social-deduction category logic) don't need to be reproduced — only the three named lessons are portable, not the
systems illustrating them.

## Honest caveats
No exaggeration needed here; the three case studies are well-argued and the sponsor read is cleanly separated.
The video's claims about BOTW/TOTK and the named games are the presenter's own critical analysis (a reasonable,
widely-shared reading) rather than settled fact — presented here as their argument, not verified ground truth.
