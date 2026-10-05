---
name: reference-video-research-pipeline
description: "How to \"watch\" a pile of YouTube videos/playlists for Ben and turn them into course material — the working pipeline, costs, and traps (built 23 Sep for the Minecraft course)"
metadata:
  node_type: memory
  type: reference
  originSessionId: b316a12b-8ab8-427a-8055-3553d4f67d84
  modified: 2026-09-25T22:44:15.228Z
---

Built for [[project-make-minecraft-course]]; reuse for any "watch these videos and build a course" ask.
Code: `E:/Websites 2026/Vibecoding projects/minecraft-course-research/pipeline.py` + `vtt2txt.py` (also committed in
ClassPet `minecraft-course/research/`).

**Pipeline that worked (145 videos / 56 h in a few hours):**
1. `videos.json` from yt-dlp metadata (`extract_flat` for playlists). Tag by category.
2. Download 360p mp4 + English auto-captions (yt-dlp python API, ffmpeg at `C:\Assistant\tools\ffmpeg\bin`).
   2 threads + `sleep_interval` 4-10 s: YouTube bot-checks after ~50 fast requests; retry 403s without subs.
3. **Transcripts: YouTube captions first; Whisper only for videos with none.** Ben: "if you got transcripts we
   dont need whisper". faster-whisper large-v3 on the 3060 Ti ≈ 13× realtime; `task="translate"` handles
   Japanese (Sakurai). vtt → dedupe rolling lines + `html.unescape` (`&nbsp;` junk).
4. Contact sheets: ffmpeg `-skip_frame nokey` (5× faster) + `fps=1/N,scale=400,drawtext pts,tile=4x4` — 16
   timestamped frames per jpg. N = 8 s for art videos, 15 s talks, 45 s lectures.
5. Sonnet analyst per batch of ~6 videos / ~2 h: read transcript in full + every sheet, write `notes/<id>.md`
   (template in ANALYST_BRIEF.md) + `_batch_X.md`. ~5-8 min each, run in parallel. Haiku only for skimming
   obviously irrelevant material, and spot-check it (it read 4 lectures in 53 s).
6. SYNTHESIS.md → 5 Opus debaters with opposing seats (advocate / hardliner / classroom realist / skeptic /
   engineer), 2 rounds via SendMessage. Converged well.

**yt-dlp 2026 needs a JS runtime:** without one, YouTube streams 403 / "format not available". Pass
`"js_runtimes": {"node": {}}` (Python API) or `--js-runtimes node` (Node v24 is installed), AND the solver package
`pip install "yt-dlp[default]"` (yt-dlp-ejs; installed 24 Sep). Without the solver you get "n challenge solving failed"
and streams throttled to ~4 KB/s. For "first 30 min of a long video" don't use `download_ranges` (ffmpeg pulls one
unchunked stream, throttled to ~1.5x realtime = 18 min per sample): take format 140's URL and fetch the byte prefix
with `&range=a-b` in 8 MB chunks (28 MB in 15 s; fragmented m4a decodes up to the cut) — `fetch_prefix` in
whisper_triage.py. Give `ffmpeg_location` the
full path to ffmpeg.exe (`C:\Assistant\tools\ffmpeg\bin\ffmpeg.exe`) or partial downloads (download_ranges) say
"ffmpeg is not installed". **Captions (timedtext) get 429-blocked after ~200 requests/day** — for triage of huge lists
use captions first, then fall back to audio-only + faster-whisper small.en (first 30 min of long videos):
`E:/Websites 2026/Vibecoding projects/library-research/whisper_triage.py`. Triage-by-captions before full processing
(Ben's idea, 24 Sep) cut 547 videos/~525 h to what's relevant.

**"Made for kids" videos** (code.org = channel "CodeAI", other kids' edu channels): yt-dlp says "This video is not
available" with every client, and the plain timedtext URL returns empty (needs the player's one-time `pot` token).
They play fine in the browser pane: run `library-research/grab_mfk_caps.js` there (patches fetch/XHR, reloads the
captions module per video, parses json3). The page's CSP blocks posting to localhost and clipboard is denied, so read
`window.__out` back in chunks. These often carry a Hebrew caption track ("iw").

**Screen-recording / slide channels (Brian Withers, 26 Sep):** don't contact-sheet every 10 s. Pull the BOARDS
(change detection, last frame of each slide) and the PIECES added with the words said as each lands, then count
signatures with a detector and verify every hit by eye. Tools + traps: [[reference-brian-visual-language]]
(`C:/Users/Ben/ai-gen-overflow/brian_visuals/`: boards.py, adds.py, detect.py, cross.py, whisper_one.py). 720p
video-only downloads of whiteboard videos are ~10 MB per 20 min.

**Traps:** don't tell analysts a prior verdict ("does this change X?") — all 14 agreed = anchoring. Keep videos on
E: (C: had 7.8 GB free) but E: is exFAT 1 MB blocks: few files per video. Delete videos after, keep
`transcripts.zip` + key frames.
