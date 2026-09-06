# Lesson 1 — App Development / פיתוח אפליקציות

Hebrew App Inventor lesson deck, 68 slides, two parts:

1. **Slides 1–28** — what an app is, hardware vs. software, logic, drag-and-drop
   programming, and a tour of the MIT App Inventor workspace. *(Existing material;
   only the closing line of slide 28 changed, so it leads into part 2 instead of
   promising it "next lesson".)*
2. **Slides 29–68** — building the **Magic 8-Ball** app end to end, following the
   official MIT tutorial, with every App Inventor block shown in English next to
   its Hebrew reading.

Deliverable: `שיעור-1-פיתוח-אפליקציות-כדור-הקסם.pptx`

## Part 2 at a glance

| Slides | Content |
|---|---|
| 29–34 | What a Magic 8-Ball is, the three build stages, new project, media files |
| 35–43 | Stage 1 — Button + Player, the two blocks, bilingual reading, testing |
| 44–56 | Stage 2 — VerticalArrangement, Labels, `set`/`pick a random item`/`make a list`/text blocks, the 8 answers in English and Hebrew |
| 57–61 | Stage 3 — AccelerometerSensor, `when …Shaking`, packaging to the phone |
| 62–68 | TextToSpeech challenge, extensions, EN↔HE block glossary, troubleshooting, recap |

Body and display type throughout the deck is **Assistant**. Install it
(<https://fonts.google.com/specimen/Assistant>) on any machine that opens the file,
or PowerPoint will substitute.

## Rebuilding

`build/` regenerates part 2 from the part-1 deck plus the tutorial media:

```
pip install python-pptx pillow
cd build
python build.py          # expects ../../lesson1.pptx and ./tutorial/
```

- `crops.py` cuts the individual blocks out of the full tutorial screenshots and
  assembles the stage-1 program from real block pixels.
- `deckkit.py` reproduces the deck's own geometry, palette and RTL typography.
- `build.py` holds all slide content.

## Media credits

Every screenshot in part 2 comes from the MIT App Inventor *Magic 8-Ball* tutorial:
<https://appinventor.mit.edu/explore/ai2/magic-8-ball>

© 2012–2025 Massachusetts Institute of Technology, licensed
[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
