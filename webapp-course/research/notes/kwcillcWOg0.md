# Teachable Machine 1: Image Classification (The Coding Train, 20.0 min)

**What it is:** Tutorial/demo. Dan Shiffman trains an image model in Teachable Machine 2.0 (launch-day video, so ~2019) and wires it into a p5.js + ml5.js sketch from scratch, live, including the mistakes.
**Substance:** substantive: full pipeline shown start to finish with real errors and fixes, not just slides.

## Ideas, in the video's order
- [0:01:39] TM assumes at least two classes; you pick your own class names instead of "Class 1".
- [0:02:12] He over-collects (400+ images/class) and immediately flags it as bad practice: 25-50 images per class is enough to start; more images = longer training for no real gain (self-correction worth reusing).
- [0:03:17]-[0:04:23] Clear explanation of transfer learning: MobileNet is a model pretrained on ImageNet (1000 categories), TM strips its final layer and retrains just that layer on your classes, which is why a few dozen images work instead of a huge dataset. Good class-ready analogy.
- [0:04:23] "Don't switch tabs" warning: training runs locally in the browser; nothing is uploaded during training.
- [0:07:11] Export Model: options are TensorFlow, TensorFlow Lite, or TensorFlow.js (what ml5 needs). Two paths: locally download the model (fully private, nothing uploaded) or "Upload" to Google's servers to get a permanent shareable URL (only the trained model is uploaded, never the training images) — subtle distinction he calls out explicitly.
- [0:08:47] The uploaded model gets a live test page at `teachablemachine.withgoogle.com/models/<id>/` — useful for debugging a model in isolation before touching code.
- [0:09:19]-[0:10:22] He deliberately starts from a bare template (video capture only) rather than pasting the ready snippet, to narrate every added line for beginners.
- [0:10:56] Code: `let classifier; function preload(){ classifier = ml5.imageClassifier('<model URL>'); }` — loading in `preload()` so it's ready before `setup()`.
- [0:11:31]-[0:12:38] `classifyVideo(){ classifier.classify(video, gotResults); }` — classify() is async, takes a callback; forgetting to define `gotResults` throws `gotResults is not defined` on screen (real error, kept in).
- [0:12:38]-[0:13:44] `gotResults(error, results)` — error-first callback convention; `results` is an array of `{label, confidence}` sorted highest-first; `results[0].label` is the top guess.
- [0:15:27]-[0:16:33] The classify→callback→classify-again pattern is the whole "prediction loop": call classify once at start, and call it again inside its own result handler, not inside `draw()`, since each call takes time.
- [0:16:33] Default/idle behavior: with nothing distinctive in frame the model still picks its closest class (here, "train" won by default) — worth telling kids a classifier always answers, it never says "I don't know" unless you add a class for that.
- [0:18:24] Explicitly suggests training a "background" class so "nothing interesting happening" has its own label instead of forcing a false positive (generic but correct and directly reusable).
- [0:18:57] Webcam feed from TM/ml5 is mirrored for you automatically during training capture, but the raw camera feed in your own sketch is not — a flip function exists in ml5 to match what training saw (easy-to-miss mismatch bug).

## What the frames add
Real code on screen throughout [0:09:00]-[0:17:20]: preload/setup/draw structure, the exact ml5 calls, and two real runtime errors (a 404 when the model URL is wrong, and the `gotResults is not defined` ReferenceError) with their message text visible — good to reuse as "here's what an error actually looks like" screenshots. [0:10:20] shows the raw script tags: p5.js, p5.dom addon, and ml5 loaded from unpkg. [0:03:30]-[0:04:30] has simple hand-drawn-style diagrams: MobileNet box, a generic neural-net mesh, and "image → brain → label" boxes for Training vs Prediction — plain enough to reuse as a class visual for transfer learning. [0:07:40]-[0:08:40] shows the actual Export Model dialog (Cloud upload vs Locally download vs Upload my model) and the resulting model URL.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Client vs. pretrained-service split (MobileNet as a "backend" someone else already built you can build on); async callback pattern (classify now, get an answer later) is the same shape as any `fetch`/`google.script.run` call; the idea that a model URL is just another resource you load, like an API endpoint.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Train a 3-4 class image model on personal objects (25-50 webcam or uploaded photos each), export/upload it, and get a page working that prints the top label as text — this is a clean, scoped first AI milestone before any backend is added. Next step: POST that label + confidence to an Apps Script `doPost` and append a row to a Sheet (name, label, confidence, timestamp) — turns the classifier into a logged event.

### Traps a kid will hit
Forgetting to define the callback function before it's referenced (exact error shown on screen — great one to pre-empt); pasting the wrong export tab's snippet (TensorFlow vs TensorFlow.js); calling `classify()` once instead of re-calling it in the callback (model looks "frozen"); assuming a low-confidence answer means "unsure" when the model always returns a top label.

### Doesn't transfer, and why
Live webcam capture (`createCapture(VIDEO)`) is the whole basis of this workflow and is very likely blocked inside the Apps Script HtmlService sandboxed iframe (per CONTEXT.md) — during the year kids must swap `video` for an uploaded `<img>`/file input as the classify() target (ml5 accepts an image element as-is, this video just never shows it). Live-camera version is fine for the Netlify final project.

## Honest caveats
2019-era video (TM 2.0 launch), but the pipeline (train → export/upload → load by URL → classify → callback) is unchanged in the current Teachable Machine. The "upload lots of images" mistake and its correction are the presenter's own on-camera realization, not a general TM rule — still good advice. No mention of CORS, hosting, or non-p5 vanilla JS; this is p5/ml5-specific, which we are not using, so the concepts transfer but the exact code (`preload`, `createCapture`) would need Gemini to translate to plain HTML/JS or to Apps Script equivalents.
