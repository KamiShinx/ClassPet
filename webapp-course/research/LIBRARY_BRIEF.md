# Library analyst brief (UI/UX, game feel, pixel art, level design)

Working dir: `E:/Websites 2026/Vibecoding projects/webapp-course-research/`. Read `CONTEXT.md` first for the class
(14-15-year-olds, Gemini web + Apps Script + Sheets, games and apps, Hebrew speakers).

**What these notes are for:** the course hub has an optional "library" of deep homework pages. Each page is built
around 1-3 of these videos plus a guide we write ourselves. Your notes are the raw material for those pages, so
they need to be concrete, accurate and kid-usable. The kids will describe UI to Gemini, so **vocabulary matters**:
the names of things (card, modal, toast, hierarchy, affordance, empty state, screenshake, hit-pause...) are gold.

For EACH video in your batch (`batches.json`, your key):
- Read `vids/<id>/transcript.txt` in full and look at every `vids/<id>/sheet_NNN.jpg`. These videos are visual:
  say what the frames show (before/after examples, diagrams).
- Write `notes/<id>.md`:

```
# <title> (<channel>, <minutes> min)
**What it is / substance:** one line each. Is it good enough to assign to a 14-year-old as homework? (yes / with a
guide / no, why)
**Watch-list:** the best 1-3 segments with [h:mm:ss] ranges, if a kid should only watch part.

## The ideas (in order, with [h:mm:ss])
Each idea in plain words a 14-year-old understands. Mark jargon and define it.

## Vocabulary for prompting Gemini
Term → one-line meaning → how a kid would use it in a prompt ("add a toast that says 'Saved' for 2 seconds").

## Before/after examples from the frames
What changed and why it's better, with timestamps.

## Page material
- 3-6 "rules of thumb" for the library page.
- 1-3 short exercises a kid can do at home with their own app or game (e.g. "screenshot your app, circle the 3
  most important things; are they the biggest?").
- 1-2 quiz questions with answers.
- For game videos: how each idea applies to a browser game built with Gemini on Apps Script (turn-based/idle,
  no real-time). Say what doesn't fit.

## Caveats
Outdated bits, tool-specific parts (Figma, Aseprite) and what transfers anyway, anything overrated.
```

Then write `notes/_batch_<KEY>.md` (under ~900 words): a proposed outline for the library page(s) your batch
feeds (page title, sections, which video segments to embed, the exercises), plus the combined vocabulary list.
Reply with 5 lines. Write only in `notes/`.
