# Teachable Machine Tutorial 1: Gather (Experiments with Google, 2.3 min)

**What it is:** Short official tutorial, one of a 3-part series (Gather / Train / Export), demoing the data-collection screen of Teachable Machine.
**Substance:** thin: one screen, one idea per project type, no code and no explanation of what happens after; it's a UI walkthrough, not a concept lesson.

## Ideas, in the video's order
- [0:00:02] Classes = categories you're teaching the computer to tell apart; every ML workflow starts with gathering labeled data (generic but a clean one-liner for class).
- [0:00:02] Two ways to add samples to a class: upload files from disk, or record from webcam.
- [0:00:35] Moving the object/yourself around while recording adds variety to the dataset — implicit lesson that a model is only as good as the range of its examples.
- [0:01:08] Image and audio projects share the same interface; audio data is visualized as a spectrogram instead of photos.
- [0:01:08] Audio projects require one deliberately long (20s) "background noise" class, which TM then auto-slices into 1-second samples, because short sound classes (clap, whistle) need something to be compared against.
- [0:01:42] Pose projects track body keypoints (e.g. head tilt, raised arm) rather than raw pixels.
- [0:01:42] Data stays on-device the entire time; nothing is sent to a server during gathering — you can download samples or save the project to Drive if you want to keep them.

## What the frames add
Single contact sheet, screen-recording only (no talking head). Shows the actual TM interface: two-column class list with webcam/upload buttons per class [0:00:00-0:00:40], the audio interface with a spectrogram thumbnail feed while recording background noise [0:01:00-0:01:20], and the pose interface with a skeleton overlay on the webcam feed [0:01:40-0:02:00]. Useful as literal screenshots for a slide showing "this is what the TM screen looks like for each project type."

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
None directly — this is pre-backend, just data collection. The one transferable idea is "data stays where you put it until you explicitly export/upload it," a privacy point worth repeating when we talk about what a Sheet as a database actually stores.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A 10-minute in-class exercise: everyone opens Teachable Machine, picks an Image Project, and gathers 2 classes (e.g. "thumbs up" / "thumbs down") using upload instead of webcam (phone photos exported and dragged in) — this doubles as a rehearsal for the "upload, don't rely on camera" habit they'll need all year.

### Traps a kid will hit
Kids will default to webcam because it's the obvious button and then hit the camera-blocked wall once the same workflow moves into an Apps Script page — worth explicitly practicing the upload path here so it's not a surprise later. For audio, forgetting the 20-second background class (min 20s) will silently produce a model that can't tell "sound" from "silence."

### Doesn't transfer, and why
The webcam capture UI itself (this is Teachable Machine's own site, not our app) — irrelevant to Apps Script either way, since kids use TM externally and only bring the exported model URL into their own project.

## Honest caveats
No dates or version numbers visible; interface matches the current (2026) Teachable Machine closely enough to trust. Too short to independently justify use — mainly useful paired with the Train and Export videos as a 3-part reference, and even then adds little beyond what a 2-minute live demo in class would cover.
