# Game Mechanics & Systems Thinking (Indie Game Clinic, 40.8 min)

**What it is:** A definitional/philosophical breakdown of rules vs. mechanics vs. systems, framed through the
metaphor of a game as a machine that produces a specific emotional outcome (MDA theory).
**Substance:** substantive but self-consciously theoretical — the presenter explicitly says this is "thought
exercises," not "10 top tips," and the video is longer than it needs to be for the density of new ideas. No
sponsor read; some slow stretches with gameplay b-roll and no new content.

## Ideas, in the video's order
- [0:01:06] Rules = the underlying "if this, then this" logic; a rule is what becomes code.
- [0:02:10] Mechanics = made of rules, but specifically the player-facing verbs/actions/goals — and also what the
  game does back to the player (an enemy AI acting like an opposing player).
- [0:03:47] The same verb (e.g. "collect") can be built from very different underlying rules across games, and
  that choice changes how it feels — the low-level rule is never neutral.
- [0:04:52] A game's most-repeated core mechanic (a jump, a menu click) deserves early, careful polish, because
  refining the main verb is "integral to the game," not superfluous. (generic-sounding, but a real warning
  against treating the core verb as an afterthought.)
- [0:05:26] Sid Meier's "double it or halve it" rule: make large changes when prototyping a variable, not tiny
  tweaks, to actually feel the effect. (generic craft tip, concrete and testable.)
- [0:06:31] Systems = the larger container (e.g. a progression system); mechanics are how the player interacts
  with it (gathering XP = mechanic; opening a menu to view a skill tree = an "informational" mechanic; spending
  points = an "activation" mechanic).
- [0:08:08] Clean one-line definition: "mechanics = verbs; systems = the nouns you do the verbs to."
- [0:09:13] Don't fully build a system early — fake/mock it first (a deck-builder doesn't need real varied decks
  yet) to feel out whether the mechanic is fun before investing in the engineering.
- [0:10:19] Warning: devs who spend months building procedural generation (a system) before they have any actual
  mechanics aren't really making a game, they're doing "a technical hobby" — system-first development is a trap.
- [0:13:38] MDA restated directly: mechanics -> (played) dynamics -> emotional/aesthetic outcome — a game
  "machine" is built to produce a specific feeling, the way a coffee machine's job is to produce coffee.
- [0:15:50] Stated preference (his opinion, not universal law): build a fun set of interactions FIRST, then art
  and setting around it — rather than building a fictional world first and cramming mechanics in to simulate it.
- [0:18:01] Genre = "a prepackaged set of mechanics we already know work together" and a promise to the audience
  they'll understand parts of the gameplay; remove a core piece (e.g. shooting from an FPS) and you must replace
  it with something of equal weight, or the "machine" breaks.
- [0:20:14] "Understand how other games work before you copy and change them" — a literacy requirement, echoes
  video 0m60QbT85Tc's "play the genre you work in."
- [0:28:26] "Expressive mechanics" = things a player can do that don't help them win (petting a cat, smashing
  empty boxes, changing a hairstyle, emoting). These non-functional, frivolous interactions are often the
  difference between a good game and a great one, and they read to players as "attention to detail."
- [0:33:18] "Cognitive mechanics" — in walking-sims/visual novels, judging, noticing, and deducing (things
  happening only in the player's head) still count as a designed mechanic, even with zero button presses.
- [0:36:33] "A mechanic only makes sense in its context" — copying a rule from another game without understanding
  why it's load-bearing there (his example: removing hand-discard from a deck-builder) breaks the system around it.

## What the frames add
Heavy use of deliberate on-screen pull-quote text restating the speaker's key lines (not auto-captions — designed
graphics), plus three reusable diagrams: a 3D "MECHANICS" engine render, an MDA icon chain (Designer -> M -> D ->
A -> smiley face, [0:14:00]), and a repeated "player verb -> engine -> emotional output" arrow diagram
([0:13:30]-[0:15:00]). These are good redrawable teaching aids — the arrow diagram is a clean alternate visual for
the MDA checklist the earlier game-design batch already recommended.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **Expressive-mechanic add-on**: after the core mechanic is built and playtested, add ONE frivolous, win-
  irrelevant interaction (a taunt sound, an idle animation, a particle effect). 15-20 min. Fits the
  "insane lore and character" goal directly, since expressive mechanics are where personality lives.
- **Fake-the-system-first rule**: before asking Gemini to build a whole system (e.g. a full upgrade tree), mock
  the end state first (hardcode one fake upgrade) and playtest whether the core verb feels good. Prevents scope
  explosion inside a 65-min week.
- **MDA poster reuse**: the verb -> machine -> emotion diagram as a one-pager ("what does the CODE do? -> what
  does the PLAYER do? -> how does it FEEL?") — corroborates, does not replace, the earlier batch's MDA checklist.

### Survives the move to Minecraft?
Expressive mechanics is the best-fitting idea here: Minecraft mob/item design already rewards small non-
functional flourishes, and Gemini can plausibly build "play sound X when idle" or "spawn particle Y on
right-click" without deep systems work. "Systems=nouns, mechanics=verbs" and "fake the system first" both map
cleanly onto scoping weekly homework.

### Doesn't transfer
Cognitive mechanics (walking-sim/visual-novel "judgment as a mechanic") barely applies — Minecraft mods are
action/systems games, not narrative-judgment games. The "game studio as a specialised factory" business framing
is irrelevant to 8 kids each building their own mod.

## Honest caveats
By the presenter's own admission this is philosophical, not actionable advice — a chunk of the middle (the
rules/mechanics/systems taxonomy) is definitional housekeeping a teacher could compress into one slide. The
MDA/expressive-mechanics content is the highest-value part; the MDA section specifically is confirmation of the
earlier batch's checklist, not a new addition, and should be logged as such rather than treated as a 6th checklist.
