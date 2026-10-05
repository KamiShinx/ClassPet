# So You Want to be a Level Designer - An Introduction to Level Design in Video Games (Extra Credits, 8.8 min)
**What it is / substance:** A 101 overview of the professional level designer role, guest-written by Max Pierce (senior level designer on The Division and Cyberpunk 2077), covering research, blockout/iteration, game-specific "metrics," communication, and player guidance. Roughly 20% of the runtime is a paid sponsor read plus patron credits. Good enough to assign only **with a guide** — the content is real and well-organized, but it's framed around AAA studio production (art teams, 3D blockout software, polygon budgets) that a solo 14-year-old on Apps Script doesn't have; a teacher needs to translate it.
**Watch-list:** [0:00:32]-[0:02:43] (the core process: research → blockout → detail pass), [0:03:16]-[0:04:53] (the two most concrete fundamentals: research and metrics), and [0:05:56]-[0:06:56] (player guidance, most transferable to browser-game UI). Skip [0:07:00] onward — pure ad and credits.

## The ideas (in order, with [h:mm:ss])
- [0:00:32] Level designers are the "architects" of game spaces — the job is geometry PLUS pacing, combat, puzzles, movement, and story beats, all combined to keep players hooked.
- [0:01:38] Level designers don't work alone: they coordinate with narrative, game design, environment art, lighting, effects, and audio teams. A lot of communication (design docs, pacing/flow diagrams, mood boards) happens before building starts, specifically so nobody has to rebuild a finished area later.
- [0:02:11] A **blockout** is a rough draft of a level — quick, simple 3D shapes or modular "kit pieces" in an engine — that gets reviewed and revised repeatedly before any detail work begins.
- [0:02:43] Once the blockout is approved, finer details (puzzles, story beats, combat encounters) get added. Later, testing shifts to checking pacing, how encounters feel, and whether the player's goal is clear.
- [0:03:16] Fundamental #1: **research before you build.** Gather references — photos, video, concept art — before touching the editor. Max's personal habit is around 50 references per level, to fuel ideas and stay consistent with the project's overall vision. Jargon: a **reference** is an example you study for ideas, not something you copy directly.
- [0:03:49] Research centers on real architecture and geology because they carry emotion: the video gives brutalist architecture as an example for dread, Art Nouveau for awe. Goal is to be "believable, not necessarily realistic" — you're allowed to bend a real source to fit gameplay.
- [0:04:21] Design around your game's specific **metrics**: environment dimensions, polygon/texture budgets, and character movement abilities — e.g. how wide a corridor needs to be for combat, how wide a chasm can be before the player can't jump it. Jargon: **metrics** here means the exact numbers your game's systems depend on.
- [0:05:04] Once metrics are locked in, you can design "with intention": narrow corridors to make a player feel small or timid, wide panoramic ledges to funnel movement in a direction — using space itself to create a feeling.
- [0:05:24] Fundamental #3: communication skills — sell your vision to teammates, but also listen, since good ideas can come from anywhere on the team.
- [0:05:56] Fundamental #4: player **guidance** — landmarks, signposts, shape/color, lighting, and composition are tools that nudge the player toward the right path without a map or on-screen text, e.g. a torch revealed as the player turns a corner.
- [0:06:28] The point of guidance is to keep players engaged with the challenges you designed on purpose, instead of getting lost or distracted by poorly-planned space.
- [0:06:56] Plug for Max's book, "Let's Design Exploration," for more depth — then the video moves into the sponsor read.

## Vocabulary for prompting Gemini
- **Reference (image)** — an example you study before building, for ideas and consistency → "Here's a screenshot of [app]'s shop page — style mine similarly, icons in a grid."
- **Blockout / rough draft** — an ugly, fast first version that proves an idea works before it's made pretty → "First just make the board and buttons work with plain grey boxes, no colors or images — we'll style it after it works."
- **Iteration** — testing and changing something in small repeated steps, not all at once → "Let's just get the dice roll working first, test it, then add the animation next."
- **Metrics (game-design sense)** — the exact numbers your game's rules depend on → "The board is always a 5x5 grid and each player starts with 20 gold — use those exact numbers everywhere in the code."
- **Guidance** — visual hints that show the player what to do next, without text instructions → "Make the button the player should click next glow or pulse."
- **Landmark / signpost** — a fixed, recognizable marker that helps players know where they are → "Always show a progress bar at the top so the player can see how close they are to the next level."
- **Pacing** — how fast or slow the game feels moment to moment → "After 3 hard questions in a row, give the player one easy one so it doesn't feel exhausting."

## Before/after examples from the frames
There is no real before/after in this video — it's a talking-head-style explainer illustrated with simple cartoon gags timed to the narration, not screenshots of an actual level being built or improved. Two frames are direct, literal illustrations of a specific claim; the rest are generic mood gags:
- [0:00:48] A scatter of colored toy-block shapes (triangular prism, cube, bricks, an arch) — a visual pun for "modular kit pieces," next to narration about geometry being a major component of the job [0:00:32].
- [0:02:16], [0:02:40], [0:03:28] The same grey 3D cube with an axis-gizmo, labeled "Autodesk 3ds Max," reused three times — a generic illustration of the blockout step [0:02:11]; no actual level blockout is ever shown, just this one placeholder cube.
- [0:04:32] A whiteboard sketch of two balloons and a running stick figure — loosely visualizes "design docs / flow diagrams" from [0:01:38], not tied to a specific example.
- [0:05:52] A cartoon signpost being hammered into the ground — a direct, literal illustration of "signposts" as a guidance tool [0:05:56].
- [0:06:00] A lit torch on a path leading to a dark tower on a hill, viewed by two characters — a direct illustration of the video's own example, a torch revealed as a player turns a corner [0:05:56].
Everything else (a Kratos-and-companion cameo at [0:01:28], Mario/Luigi/Goomba cameos at [0:01:36] and [0:04:48], a character peeking over a fence at [0:05:04], a green gift-wrapped block at [0:05:12]) is a joke or mood illustration with no specific design content behind it.

## Page material
- Rules of thumb:
  1. Look at 2-3 real examples before you build anything — the video's habit of ~50 references is a professional-scale number, not a homework-scale one.
  2. Build the ugly version first (plain boxes, no styling) to prove the idea works, then make it pretty.
  3. Decide your game's fixed numbers (board size, number of players, turn limit) before you start prompting, and write them down.
  4. Use color, icons, and position — not paragraphs of instructions — to show the player what to do next.
  5. Add one new feature at a time and test it before asking for the next one.
  6. When you show your app to a classmate, listen to what confuses them — that's your version of "team feedback."
- Exercises:
  1. Find 2 apps or games similar to what you want to build. Screenshot one thing whose *feel* (not code) you'd like to borrow.
  2. Write your game's fixed numbers (grid size, starting resources, number of turns) as a short list, and paste that list at the top of every Gemini chat about this project.
  3. Add one visual "landmark" to your app (a fixed logo, a progress bar, a color-coded status) and check with a friend: can they tell where they are in the app without you explaining?
- Quiz:
  1. Q: Why does the video say to gather references before opening the editor? A: so you're building on real inspiration and staying consistent with a vision, instead of guessing at what "feels right."
  2. Q: What is a "blockout" and why is it made ugly and fast? A: a rough, quickly-editable draft used to test whether an idea works, before spending time on decoration — because early ideas change a lot and often get thrown away.
- How this applies to a turn-based/idle browser game built with Gemini on Apps Script:
  - **Dungeon crawler:** "metrics" means deciding the grid size (e.g. 6x6), enemy types, and starting HP before you prompt Gemini — write these as constants at the top of Code.gs and repeat them in every chat, which also protects against a forgetful AI overwriting your numbers.
  - **Idle clicker:** "guidance" tools are a progress bar, a highlighted "next upgrade" button, and a toast message — the same job the video describes: keep the player oriented with no map or instructions page.
  - **Quiz/trivia game:** "blockout" means getting the question-and-answer flow working in plain HTML with a hardcoded 3-question array before wiring it to the Sheet as a database — that's the grey-box draft before "finer details."
  - **What doesn't fit:** 3D software (3ds Max) and engine kit pieces, polygon/texture budgets, and corridor-width-for-melee-combat assume a 3D engine and a production team, neither of which exist here. The underlying habits (reference first, rough draft first, fixed numbers, visual guidance) transfer directly; the specific tools, disciplines (environment art, lighting, effects), and team structure do not.

## Caveats
- About 20% of the runtime (roughly [0:07:00] to the end, ~1:40 of 8:48) is a paid sponsor read for "One Day University" plus a long patron-name scroll — skip it, zero design content.
- This is a career-overview video aimed at people considering level design as a job in AAA studios. Several fundamentals (team collaboration, 3D blockout software, polygon/texture budgets) assume a studio production pipeline a solo teen doesn't have; a teacher needs to actively translate "team" into "you and Gemini" and "engine" into "HTML/CSS/JS."
- Nothing is technically outdated (it's a general overview, not tied to a specific software version), but it is scale- and tool-mismatched for this course more than it is dated.
- The illustrations are mostly generic cartoon gags, not real level screenshots or diagrams — only two frames ([0:05:52] signpost, [0:06:00] torch) directly illustrate a specific claim; don't expect example levels or before/after comparisons.
- Not overrated as content — the four fundamentals are standard, well-established practice; the only inflation is the usual YouTube sponsor-block structure.
