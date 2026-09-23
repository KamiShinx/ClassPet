# CRUD Web App for Managing Projects and Codes with Google Sheets | C10 (Mohammad Rameez Imdad, 9.6 min, Whisper transcript)

**What it is:** the setup/installation companion video to `qYlqj_r9Qsg`'s app — same project-tracker template, but this one specifically walks through copying the Sheet and deploying the Apps Script web app from scratch. No AI-build shown (it's copying a pre-written template), but it is the clearest **deployment mechanics** video in the whole batch.
**Substance:** mixed: the deploy walkthrough at the very end is genuinely valuable and worth reusing almost verbatim as a checklist; the middle is a standard feature click-through.

## Ideas, in the video's order
- [0:01:22] Data table refreshes "every 3 seconds" (a different, faster polling number than the sibling video's "7 seconds" — worth noting the inconsistency; these presets are seemingly tuned per project rather than a fixed rule).
- [0:01:51] Same self-service "add country to the dropdown" pattern as other C-series videos.
- [0:03:49] A "Codes" sheet used purely as the presenter's personal link library (title + Drive link) — not really a backend lesson, but a nice minimal single-sheet CRUD example (2 columns, add/search/copy) good for a very first lesson.
- **[0:08:19]-[0:09:05] Full deployment walkthrough, step by step:** File → Make a copy (of the template Sheet) → Extensions → Apps Script (code is already there) → Deploy → New deployment → gear icon → Web app → "who has access: Anyone" → Deploy → grant permissions → copy the resulting `.../exec` URL → embed it wherever needed (Blogger, Google Sites, iframe).
- Toggle-theme feature reappears (generic, cosmetic).

## What the frames add
Frames are almost entirely the deployed web app's UI (project table, code-link table, theme toggle) — no Apps Script editor or deploy dialog is actually captured in the contact sheets themselves (the walkthrough is described verbally over screen capture that the sheet sampling missed). The four sheets add little beyond confirming the app's look; the deploy-steps value here comes from the transcript, not the frames.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
The full copy → open Apps Script → deploy → set access → get URL sequence, spoken as a clean numbered list; polling-based "real time" refresh (3 seconds here).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Use this transcript's deploy sequence almost as-is for the first lesson where kids actually deploy their first "hello world" Apps Script web app — it is the cleanest verbal walkthrough in the batch and matches the real Apps Script UI (confirmed against the actual deploy dialog seen in other videos in this batch, e.g. `qYlqj_r9Qsg` and `k90Za3mjy20`).

### Traps a kid will hit
"Who has access: Anyone" is stated flatly with no mention of the privacy tradeoff (anyone with the link can open the app, and depending on code, potentially call its functions) — the course must add the missing safety discussion this video skips.

### Doesn't transfer, and why
No AI involved at all — this is a hand-built template being copied, not something Gemini generated, so it cannot show prompting or AI mistakes.

## Honest caveats
Whisper transcript has some repeated/garbled lines (e.g. 0:03:07-0:03:26 repeats "we will select on the half paid" many times) — likely a transcription artifact, not real repeated speech; treat literally repeated phrases with suspicion.
