# Batch G3: Google Teachable Machine (train, export, embed, gesture game)

Six videos: The Coding Train's two build-along tutorials (image [kwcillcWOg0], sound [TOrVsLklltM]), Google's own three short Gather/Train/Export clips (DFBbSTvtpy4, CO67EQ0ZWgA, n-zeeRLBgd0), and Vizuara's gesture-controlled Scratch-style game (XJD_YBq_XN0). Together they cover the entire TM pipeline end to end, three project types (image, sound, pose), and one full no-code consuming app.

## The pipeline, agreed across every video
Gather (webcam or upload, 25-50 images/class is enough — kwcillcWOg0 [0:02:12] explicitly corrects its own over-collection; XJD_YBq_XN0 [0:06:44] uses ~100) → Train (runs locally in-browser, keep tab open, retrain after adding data — CO67EQ0ZWgA) → Export (Upload gets a permanent shareable URL; only the model is uploaded, never the training data — n-zeeRLBgd0, kwcillcWOg0 [0:07:11]) → load that URL in a library (`ml5.imageClassifier`/`ml5.soundClassifier`) → classify. Every video that shows it treats "the exported model is a resource at a URL, separate from the app that uses it" as obvious — that's the one backend concept worth building a whole lesson around, since it's the clearest bridge between "AI model" and "API endpoint" a 14-year-old will meet.

## Where they diverge (a real, useful contrast)
Image classification needs a manual re-poll loop (`classify()` → callback → call `classify()` again — kwcillcWOg0 [0:15:27]); sound classification listens continuously and just keeps firing the callback on its own (TOrVsLklltM [0:07:19]). Worth teaching side by side as two shapes of async: request-response vs. event-driven, since kids will meet both again in Apps Script (`google.script.run` vs. triggers).

## Concept explainers worth reusing
- Transfer learning, in one breath: a pretrained model (MobileNet for images, Speech Commands 18w for sound) already knows how to reduce raw input to meaningful numbers; TM swaps its last layer for your classes and retrains only that, which is why 25-50 examples work. [kwcillcWOg0 0:03:17-0:04:23]
- Spectrograms: "sound classification" is secretly still image classification — the model is fed a picture of frequency-over-time, not audio directly. [TOrVsLklltM 0:05:10]
- A classifier always answers, even to nothing/noise — it just returns the closest trained class, never "I don't know," unless you explicitly train a background/unknown class. Shown twice independently (idle image frame defaulting to "train" [kwcillcWOg0 0:16:33]; presenter's own voice misclassified as a trained sound because no "talking" class existed [TOrVsLklltM 0:07:58]) — two videos hitting the same wall independently makes this a strong, reusable rule.
- Model reliability depends on how distinct your signal is, not on how much you trained: ukulele chords/notes gave noisy results even after multiple retrains, while spoken words worked cleanly on the same base model. [TOrVsLklltM 0:08:47-0:13:17] — good live-demo material, better than a slide.

## Project seeds (backend concept tagged)
1. **Upload-a-photo mood/costume classifier → logged to a Sheet.** Kid trains a 2-4 class image model, uploads a photo (not webcam) in the app, gets a label, POSTs it to `doPost`. Teaches: writing a row to a database.
2. **Class object show-and-tell leaderboard.** Everyone trains their own object classifier; correct-guess submissions append to a shared Sheet leaderboard. Teaches: concurrent writes / two people submitting at once.
3. **"Guess the target class" daily challenge.** Server picks/stores today's target class in a Sheet; frontend fetches it via `doGet` before letting a kid submit a classification attempt. Teaches: reading data from the server (GET, JSON).
4. **Gesture-controlled trivia buzzer (Netlify final project).** Direct translation of XJD_YBq_XN0's game shape: raise-hand gesture model buzzes in, hosted frontend calls Apps Script `doPost` to log buzz order + timestamp. Teaches: CORS, doPost, fetch, cross-origin JSON.
5. **Sound-triggered high-score board (Netlify final project).** TOrVsLklltM's Snake-by-voice idea, wired to a scores Sheet. Teaches: a second backend "resource" (scores) alongside the main app data, plus a simple shared-secret check on the endpoint.
6. **Same gesture model, two capture modes.** Rebuild XJD_YBq_XN0's game logic in our own stack: during the year, "gesture" comes from an uploaded photo per turn (turn-based, not real-time); on Netlify, swap in live webcam for the real-time version. Teaches directly: same model, same URL, different client — the client/server split made concrete.

## What to cut
The three official Gather/Train/Export clips (DFBbSTvtpy4, CO67EQ0ZWgA, n-zeeRLBgd0) are each under 2.5 minutes and mostly redundant with each other and with the two Coding Train videos, which show the same screens at higher resolution with a working example attached. Keep them only as fast screenshots; don't assign as viewing.

## Traps a kid will hit
Forgetting to re-define a callback before it's referenced (`gotResults is not defined`, shown live [kwcillcWOg0 0:12:38]) — a real async/hoisting trap Gemini-written code could also introduce. Forgetting a required wiring step that has no visible error (XJD_YBq_XN0's "forgot to turn on video," [0:13:57]) — the single best illustration in this batch of "the AI/tutorial can skip a step and nothing tells you," which CONTEXT.md flags as the core AI-breakage risk to document. A collision/state bug from checking `touching()` every frame instead of once per event, causing a score to jump by 9 instead of 1 [XJD_YBq_XN0 0:24:13] — generalizes past Scratch into any "did this thing already happen" logic in JS.

## Doesn't transfer
Live webcam and live mic are the load-bearing feature of 4 of 6 videos (image capture in kwcillcWOg0, all of TOrVsLklltM, all of XJD_YBq_XN0) and are almost certainly blocked inside Apps Script HtmlService per CONTEXT.md. None of the six videos shows or even mentions running a TM model against a pre-recorded/uploaded file for sound; image classification is the only project type confirmed here to work equally well against an uploaded `<img>` instead of live video, since `classify()` just takes an image-like element. Sound and pose (live gestures) should be reserved for the Netlify final project.
