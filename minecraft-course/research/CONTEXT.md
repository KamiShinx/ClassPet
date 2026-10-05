# Context for everyone analysing these videos

## The class
- Teacher: Ben, at a place called MAKE. **8 kids, ages 11-13, zero coding experience.**
- **20 weeks, one session a week.** 90 min on paper, realistically **65-70 min**. ~30 min homework a week.
- Kids' own **Windows** laptops. Kids speak **Hebrew** (Israel); on-paper material is in Hebrew.
- Stack is LOCKED, do not question it: **Minecraft Java 26.2 + NeoForge + Java 25**. Kids never write code
  by hand; they describe what they want to **Gemini inside Google Antigravity** (an AI code editor) and it writes
  the Java. They test by launching real Minecraft from their project (`gradlew runClient`).
- 3D models for Minecraft are made in **Blockbench** (free, blocky, cube-based models); textures are pixel art,
  usually 16x16 per face. Minecraft's look is chunky, low-res, silhouette-driven. Whatever a kid designs has to
  survive being turned into cubes and 16x16 pixels.

## What was decided before
The first plan was an API tour (week 5 recipes, week 6 loot tables...). Killed, because Gemini already knows the
API, so teaching it teaches nothing. Replaced by: "the subject is directing a machine and judging what comes back"
(write a spec before prompting, verify the result, debug when Gemini is wrong, which it often is on a months-old
Minecraft version).

## Ben's new idea (what this research is for)
Because the coding is mostly vibe-coding, Ben wants the course's centre of gravity to be the **creative side**:
1. **3D design**: kids design their own characters/mobs and items.
2. **Worldbuilding**: lore, places, factions, history.
He wants the course to feel like a **"platform"**: tooltips/guides plus a place for each kid to express their
world and character designs, and then they "just vibecode their ideas". By the end of the year each kid should
have **"insane lore and game mechanics"**.
He suspects his video list (worldbuilding + character design) is **not enough** and that **game design** content
(what makes mechanics fun to play) is also needed. He called that "very important".

## What we need from the videos
Not summaries for their own sake. We need: which ideas can become **concrete class activities, worksheets,
design prompts or "tooltips"** for 11-13-year-olds building a Minecraft mod, and which ideas do NOT transfer
(e.g. 2D drawing technique that dies in 16x16 cubes, novelist craft that needs 100k words, publishing business).

## House rules for your notes
- **Don't exaggerate.** If a video is thin, padded or mostly vibes, say so. If an idea is generic ("be
  consistent"), say it is generic. Distinguish what the video actually says from your own extrapolation.
- Cite timestamps `[h:mm:ss]` from `whisper.txt` for every idea you attribute to the video.
- No long quotes (max ~15 words per quote, and few of them). Paraphrase.
- You must actually look at the contact sheets (`sheet_NNN.jpg`, 16 timestamped frames each). Say what the
  visuals add, or say plainly that they add nothing (talking head, stock b-roll).
