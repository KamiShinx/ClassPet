# Teachable Machine Tutorial 3: Export (Experiments with Google, 1.0 min)

**What it is:** Official tutorial, third of the Gather/Train/Export series. Screen-recording only.
**Substance:** thin but dense for its length: it's the one video in this trio that actually shows the export dialog and the two model-hosting URLs, which matters for embedding.

## Ideas, in the video's order
- [0:00:02] Preview panel lets you test live (webcam) before exporting — confidence bars per class shown in real time.
- [0:00:02] Export options: upload to get a shareable link, or download the model files to your computer.
- [0:00:35] Exporting the model never uploads your training images/audio, only the trained model itself — repeats the same privacy distinction the Coding Train video makes.
- [0:00:35] Saving the whole project (including your raw samples) is separate from exporting the model: either save the full project to Drive or download it as a file.

## What the frames add
Single sheet confirms the exact export dialog: a "Preview" panel with live webcam classification and confidence bars [0:00:00-0:00:30], then the "Export your model" modal with three format tabs (TensorFlow.js / TensorFlow / TensorFlow Lite) and, within TensorFlow.js, the Cloud (upload) vs Locally (download) vs "Upload my model" choice [0:00:30]. The shareable link field and a code-snippets box are visible but too small to read the exact URL text in this sheet — matches what's fully legible in the Coding Train sheets (kwcillcWOg0), which show the same dialog at readable size: `https://teachablemachine.withgoogle.com/models/<id>/` (the live test page) and `https://storage.googleapis.com/tm-model/<id>/model.json` (the actual hosted model file ml5/TF.js code loads).

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
The core "hosted resource with a permanent URL" idea — Google is effectively acting as a free static file host for the model, the same pattern as any CDN-hosted JSON/asset a frontend fetches. Good bridge to explain what "the model URL" actually is before kids paste it into code.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Right after Gather + Train: export, upload, copy the shareable URL, and paste it into the TM live-preview page to sanity-check the model works before writing any code against it — cheap debugging habit worth requiring every time.

### Traps a kid will hit
Copying the wrong URL (the human-facing preview page vs. the raw model.json endpoint the library actually needs) — both are shown side by side in the export dialog and it's easy to grab the wrong one. Re-exporting after retraining and forgetting to update the URL already pasted into their code (stale model bug that looks like the code is broken when it's actually just pointing at an old version — though the video notes "cloud model is up to date" auto-syncs the same URL, so this may be less of a trap than it seems, worth verifying live).

### Doesn't transfer, and why
Nothing platform-specific here that fails in Apps Script — export/upload happens entirely on the Teachable Machine site, before any of our code runs.

## Honest caveats
One minute, screen-only, no code shown at all — treat as a supplement to kwcillcWOg0's much clearer, larger export-dialog frames rather than a primary source. The "cloud model is up to date" auto-sync claim comes from the other video's frames, not this one, and should be verified against the current TM UI before repeating to kids as fact.
