# How to Make Great Game Tutorials (GDC talk, Asher Vollmer / Threes!, 25.0 min)

**What it is / substance:** A GDC conference talk by the creator of the puzzle game *Threes!* on how to design a
game tutorial, using *Threes!* as the running example. No screen-recording or tool demo — pure talk with slides.
Substantive, no padding, and the single most game-specific, non-generic video in the batch. **Good enough to assign
as-is** for the first 12:34; the Q&A after that is optional bonus.

**Watch-list:** [0:00–12:34] the actual talk (everything else is audience Q&A); within that, [4:56–6:00] (get out
of the player's way / anti-pop-up rule) and [8:42–11:30] (make the goals into puzzles — the core insight, with real
*Threes!* examples) are the two sections worth watching twice.

## The ideas (in order, with [h:mm:ss])
- [1:11–3:51] **Design by picking overlapping/conflicting goals.** For *Threes!*: arrow-keys-only, mobile
  (turn-based, playable in short bursts), tiny (no sprawling content), and playable forever. **Goals that conflict
  with each other narrow the design space more than goals that agree** — pick tensions, not a wishlist.
- [3:51–5:28] The tutorial has its own competing goals: **teach**, **comfort** (don't make the new player feel bad),
  **excite** (mobile users bail in ~4 seconds if bored), and — the one most tutorials skip — **respect the player**
  (don't treat them like they have no brain; most tutorial hate comes from tutorials that don't respect the
  player).
- [5:28–6:00] "Tell the player what to do" (teaches + comforts, but is boring/unexciting/mildly disrespectful) is
  the opposite pole from "**stay out of the player's way**" (respects + excites, but can feel uncomfortable for
  brand-new players). Concrete anti-pattern: **pop-ups nobody reads.** If you must have one, put it at the very
  start, before the player is "in flow" — a wall of text mid-session makes players angry.
- [7:38–8:42] **Give the player a safe space** to fail and retry without real punishment — game studios often skip
  this under a fake sense of urgency (time pressure, fall damage) during the tutorial itself, which is
  disrespectful of learning-by-experimentation.
- [8:42–11:30] **Make the goals into puzzles** — the core, most quotable idea. Anti-pattern: **big yellow arrows**
  that just say "click here" — the player advances but learns nothing, because they're complying, not
  understanding. *Threes!* phrases its tutorial challenge as "rearrange numbers by pushing them into walls" (a
  puzzle to solve) instead of "swipe left twice" (a literal instruction) — the player has to build a mental model,
  which sticks. Later challenges compound ("use the walls to add these together," then "make [a bigger number]") so
  the player has to combine what they already figured out.
- [12:03–12:34] **Iterate constantly** — even a tutorial you're sure is perfect is wrong; *Threes!* went through 3–4
  full redesigns based on playtesting. "You're going to have to make it again, and again."
- **From Q&A** [12:34+]: deliberately not explaining every game rule in the tutorial (how tiles spawn, which pair
  merges first) was intentional — it seeds questions players discuss with each other, a side benefit of *not*
  over-explaining. [19:10–20:15] A UI change (adding a "+" icon on tiles that could be bigger than 3) was made
  because without it, players could "count cards" like a casino — and counting cards worked *against* the "mobile"
  design goal (can't put the game down without losing an edge). [20:51–21:25] Depth beats usability when they
  conflict — never simplify the game itself just to make the tutorial easier.

## Vocabulary for prompting Gemini
- **Tutorial as a puzzle** → phrase the first challenge as something to figure out, not a literal instruction →
  "instead of saying 'click the + button twice,' make the first goal 'get the counter to reach 10' and let them
  discover how."
- **Safe space** → an area/turn where failing has no real penalty → "give the player 2 free practice turns before
  mistakes start costing resources."
- **Big yellow arrow (anti-pattern)** → a pointer that makes players comply without understanding → avoid; don't
  ask Gemini to "add an arrow pointing at the button," ask for a challenge that requires finding the button.
- **Locus of attention** → where the player is actually looking/focusing → "don't split the tutorial across two
  areas of the screen at once, the player will miss one."
- **Mental model** → the player's internal understanding of how the game's systems work → "the tutorial should
  build a mental model of how turns work, not just tell them the rule."

## Before/after examples from the frames
The frames are almost entirely the speaker at a podium with slide title-cards (large text: "GET OUT OF THE PLAYER'S
WAY," "GIVE THE PLAYER A SAFE SPACE," each with a small Teach/Comfort/Respect/Excite label row) — **say plainly: the
visuals add very little beyond restating the talk's section headers.** The few real content images: [6:32–7:20] a
tower-defense-style pop-up tutorial box mid-tutorial (used as the "walls of text nobody reads" anti-example) next to
a Skyrim-style snowy-mountain shot (used as a positive "safe-feeling but visually dramatic" tutorial example);
[7:44–8:24] a plain padded gray room, used as a literal metaphor slide for "safe space" (not a real game
screenshot); [13:04–13:12] the closing "TEACH / COMFORT / RESPECT / EXCITE" Venn diagram with "GREAT TUTORIAL" in
the overlapping center — worth reusing as a class diagram, it's the whole talk in one image.

## Page material
- **Rules of thumb:** (1) list your tutorial's goals and notice which ones conflict — that tension is where the
  real design decisions are; (2) if you need a text pop-up, put it at the very start, never mid-session; (3) let the
  player fail for free before anything in the game actually punishes them; (4) phrase the first challenge as a
  puzzle to solve, not a step-by-step instruction, so the player has to think instead of just comply; (5) plan to
  redesign your tutorial more than once after watching real people play it.
- **Exercises:** (1) Watch someone else play your game/app for the first time without helping them, and write down
  every moment they look confused. (2) Take one instruction in your project written as a literal command ("click
  the button") and rewrite it as a small puzzle ("can you make the number reach 10?").
- **Quiz:** Q: What are the 4 competing goals a game tutorial has to balance? A: teach, comfort, excite, respect the
  player. Q: Why does the speaker dislike "big yellow arrows"? A: the player advances by complying, not by
  understanding — nothing sticks.
- **Game angle (this is a game video — applies almost directly):** for a turn-based/idle Apps Script game: (1) the
  first turn can be a small solvable puzzle ("collect 3 coins") instead of an instruction wall, since Sheets-backed
  turn-based games have no reflex pressure — plenty of time for the player to think; (2) a genuinely safe first
  level (no real fail-state, no lost progress) costs nothing to build and matches "give a safe space"; (3) skip big
  arrow overlays; word the first goal as something to figure out. What doesn't transfer: *Threes!*'s specific
  mechanic (swipe-merge, reflex timing) and the "card counting" story are specific to that one real-time-feeling
  game, not to a slow Sheets-backed game.

## Caveats
Pure talk, zero code or design-tool content — nothing here is a "how to build it" video, only "how to think about
it," which is exactly why it pairs well as a *concept* video before the more hands-on ones in this batch. The Q&A
after 12:34 is optional/bonus and fairly *Threes!*-specific trivia (card-counting AI, cut monster mechanic) — good
color, not required watching. The talk is from ~2014 GDC; nothing about the actual advice is stale, only the
speaker's own game references (Uncharted 2, Braid, Telltale) will be unfamiliar to a 2026 14-year-old and may need a
one-line gloss ("an old story-heavy game" is enough, the specific titles don't matter).
