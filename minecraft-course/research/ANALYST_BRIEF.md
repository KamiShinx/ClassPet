# Analyst brief (one batch of videos)

Working dir: `E:/Websites 2026/Vibecoding projects/minecraft-course-research/`

1. Read `CONTEXT.md` first. It explains the class and the house rules.
2. For EACH video id in your batch:
   - Read `vids/<id>/transcript.txt` **in full** (`[h:mm:ss]` stamps roughly every 30 s; read it in chunks with
     offset/limit if long). The header says its source: YouTube captions (usually auto-generated: no punctuation,
     some misheard names) or Whisper large-v3. Don't read the raw .vtt files.
   - Look at **every** `vids/<id>/sheet_NNN.jpg`. Each is 16 frames with a yellow timestamp per frame.
   - Write `notes/<id>.md` using the template below.
3. After all videos in the batch, write `notes/_batch_<LETTER>.md`: the 5-10 strongest ideas ACROSS your batch
   for this class, where videos agree or contradict each other, and the ideas you'd cut. Keep it under 900 words.
4. Reply to me with 5-8 lines: what you finished, and the single most useful and the single most overrated idea
   in the batch. Do not paste the notes back.

Don't write anything outside `notes/`. Don't download anything. The E: drive charges 1 MB per file, so write only
the files listed here.

## Template for `notes/<id>.md`

```
# <title> (<channel>, <minutes> min)

**What it is:** one or two lines.
**Substance:** substantive | mixed | thin: one line why. (Padding, sponsor reads and vibes count against it.)

## Ideas, in the video's order
- [h:mm:ss] idea in your own words. Mark generic advice as (generic).
  (Aim for 8-20 bullets depending on density. A 2-hour video will need more; a 4-minute one fewer.)

## What the frames add
What the visuals show that the transcript doesn't (example designs, diagrams, before/after), with timestamps.
Or: "nothing, talking head / b-roll".

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **Name of activity/worksheet/tooltip**: what the kid does, roughly how long, what they end up with, and which
  idea above it comes from. Be concrete enough that a teacher could run it next week.
### Survives the move to Minecraft? 
How the idea changes when the design must become Blockbench cubes, 16x16 textures, or something Gemini can
actually build as a mod mechanic (item behaviour, mob behaviour, block, structure, dimension, effects).
### Doesn't transfer
Ideas that die here, and why (needs drawing skill, needs a novel's length, publishing business, too abstract
for 11-13, etc.).

## Honest caveats
Where the video is wrong, oversold, or contradicts another source you know of. Your own extrapolations labelled.
```
