# Analyst brief (one batch of videos)

Working dir: `E:/Websites 2026/Vibecoding projects/webapp-course-research/`

1. Read `CONTEXT.md` first.
2. For EACH video id in your batch (listed in `batches.json` under your letter):
   - Read `vids/<id>/transcript.txt` **in full** (`[h:mm:ss]` stamps about every 30 s; read in chunks with
     offset/limit if long). The header says the source: YouTube captions (often auto-generated, no punctuation)
     or Whisper. Don't read the raw .vtt files.
   - Look at **every** `vids/<id>/sheet_NNN.jpg` (16 frames each, yellow timestamp per frame).
   - Write `notes/<id>.md` with the template below.
3. Then write `notes/_batch_<LETTER>.md` (under ~900 words): the strongest ideas across your batch for this class,
   where videos agree or contradict, what to cut, plus:
   - **Concept explainers worth reusing** (with timestamps).
   - **Project seeds**: 3-8 project ideas your batch suggests, rewritten at teen scale and tagged with the backend
     concept each one teaches (e.g. "class poll app: writing rows, reading them back, concurrency").
   - **Traps**: the Apps Script / AI-building problems your batch shows, and which a kid will hit.
4. Reply with 5-8 lines: what you finished, the single most useful and the single most overrated thing in the
   batch. Don't paste the notes back.

Write only inside `notes/`. Don't download anything. The E: drive charges 1 MB per file; write only these files.

## Template for `notes/<id>.md`

```
# <title> (<channel>, <minutes> min)

**What it is:** one or two lines (tutorial / demo / promo / lecture; year if visible).
**Substance:** substantive | mixed | thin: one line why.

## Ideas, in the video's order
- [h:mm:ss] idea in your own words. Mark generic advice (generic), outdated things (outdated).
  (8-20 bullets depending on density.)

## What the frames add
Code, UI, diagrams, before/after, with timestamps. Or: "nothing, talking head / b-roll".

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
### Traps a kid will hit
### Doesn't transfer, and why

## Honest caveats
```
