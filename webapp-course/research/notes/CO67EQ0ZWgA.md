# Teachable Machine Tutorial 2: Train (Experiments with Google, 0.9 min)

**What it is:** Official tutorial, second of the Gather/Train/Export series. Screen-recording only, no talking head.
**Substance:** thin: one button, three caveats, nothing else.

## Ideas, in the video's order
- [0:00:03] Training happens locally on your computer, so the tab must stay open; if you don't want to watch it, move that tab to its own separate window instead of closing it.
- [0:00:03] Preview panel expands on the right once training finishes.
- [0:00:36] Any time you add more data to a class, you must retrain — the model doesn't update itself.
- [0:00:36] Advanced panel exposes real training settings (epochs, batch size, learning rate implied) and an "under the hood" visualization, but the video explicitly says beginners don't need either.

## What the frames add
Nothing beyond the transcript: nine near-identical screenshots of the same idle screen, then the standard "Don't switch tabs" dialog appearing partway through, matching what's described. No code, no new UI not already covered by the Gather video.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
None — this is entirely client-side model training, the one part of the whole TM pipeline that never touches a server.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Not standalone; folds into the same session as Gather + Export as "click Train, wait, don't touch the tab."

### Traps a kid will hit
Adding more samples after training and expecting the model to already reflect them (forgetting to retrain) — worth a one-line warning in our own instructions. Also closing the laptop lid or switching apps mid-training on a school Chromebook, which could pause/kill the tab.

### Doesn't transfer, and why
Nothing here is Apps-Script-specific; it's purely about the Teachable Machine site itself.

## Honest caveats
Under a minute long and almost entirely padding (repeated static screenshots). Include only as a one-line callout ("keep the tab open while training") — not worth more class time than that.
