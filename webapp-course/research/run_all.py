"""Whole pipeline in one go: download (2 passes), fill missing captions, Whisper the rest, transcripts, sheets."""
import glob, os, time
import yt_dlp
import pipeline as p

for attempt in (1, 2):
    p.download()
    missing = [v for v in p.videos() if not os.path.exists(p.mp4(v))]
    print(f"pass {attempt}: {len(missing)} without video", flush=True)
    if not missing:
        break
    time.sleep(60)

# Captions are skipped when YouTube rate-limits them; try once more, slowly.
for v in p.videos():
    d = p.vdir(v)
    if glob.glob(os.path.join(d, "*.vtt")) or not os.path.exists(p.mp4(v)):
        continue
    try:
        with yt_dlp.YoutubeDL({"quiet": True, "no_warnings": True, "skip_download": True,
                               "writeautomaticsub": True, "writesubtitles": True,
                               "subtitleslangs": ["en", "en-US", "en-GB"], "subtitlesformat": "vtt",
                               "outtmpl": os.path.join(d, "video.%(ext)s"), "sleep_interval_subtitles": 5}) as y:
            y.download([f"https://www.youtube.com/watch?v={v['id']}"])
    except Exception:
        pass
    print(v["id"], "captions" if glob.glob(os.path.join(d, "*.vtt")) else "none -> whisper", flush=True)

p.whisper()
os.system("python vtt2txt.py > transcripts.log 2>&1")
p.sheets()
ready = [v for v in p.videos() if os.path.exists(os.path.join(p.vdir(v), "transcript.txt"))
         and os.path.exists(os.path.join(p.vdir(v), "sheet_001.jpg"))]
print(f"DONE: {len(ready)} of {len(p.videos())} ready", flush=True)
