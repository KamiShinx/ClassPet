"""Download, transcribe (Whisper large-v3) and contact-sheet every video in videos.json.

Stages are idempotent: re-running skips finished work.
  python pipeline.py download   # 360p mp4 + English auto captions
  python pipeline.py whisper    # GPU transcripts -> <id>/whisper.txt
  python pipeline.py sheets     # ffmpeg contact sheets -> <id>/sheet_NNN.jpg
Videos live in vids/<id>/ (E: is exFAT with 1 MB blocks, so few files per video).
"""
import json, os, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.abspath(__file__))
FFMPEG = r"C:\Assistant\tools\ffmpeg\bin\ffmpeg.exe"
VIDS = os.path.join(ROOT, "vids")
# seconds between sampled frames, by category: art videos need a closer look than lectures
INTERVAL = {"p1": 12, "p2": 10, "p3": 15, "p4": 10, "gx": 10}
TILE = (4, 4)


def videos():
    return json.load(open(os.path.join(ROOT, "videos.json"), encoding="utf-8"))


def vdir(v):
    d = os.path.join(VIDS, v["id"])
    os.makedirs(d, exist_ok=True)
    return d


def mp4(v):
    return os.path.join(vdir(v), "video.mp4")


def download_one(v):
    import yt_dlp
    if os.path.exists(mp4(v)):
        return f"skip {v['id']}"
    opts = {
        "quiet": True, "no_warnings": True,
        "format": "18/bv*[height<=360]+ba/b[height<=360]/b",
        "merge_output_format": "mp4",
        "ffmpeg_location": os.path.dirname(FFMPEG),
        "outtmpl": os.path.join(vdir(v), "video.%(ext)s"),
        "writeautomaticsub": True, "writesubtitles": True,
        "subtitleslangs": ["en", "en-US", "en-GB"], "subtitlesformat": "vtt",
        # YouTube started bot-checking at ~50 videos; pace the requests
        "sleep_interval": 4, "max_sleep_interval": 10, "sleep_interval_subtitles": 3,
    }
    try:
        with yt_dlp.YoutubeDL(opts) as y:
            y.download([f"https://www.youtube.com/watch?v={v['id']}"])
    except Exception as e:  # captions sometimes 429 while the video itself landed
        if not os.path.exists(mp4(v)):
            return f"FAIL {v['id']}: {e}"
    return f"ok {v['id']}"


def download():
    with ThreadPoolExecutor(2) as ex:
        for r in ex.map(download_one, videos()):
            print(r, flush=True)


def fmt(t):
    t = int(t)
    return f"{t // 3600}:{t % 3600 // 60:02d}:{t % 60:02d}"


def whisper():
    from faster_whisper import WhisperModel, BatchedInferencePipeline
    model = BatchedInferencePipeline(WhisperModel("large-v3", device="cuda", compute_type="float16"))
    # short videos first so analysis can start while the long lecture playlist is still transcribing
    for v in sorted(videos(), key=lambda v: (v["tag"] == "wbpl", v.get("dur") or 0)):
        out = os.path.join(vdir(v), "whisper.txt")
        if os.path.exists(out) or not os.path.exists(mp4(v)):
            continue
        if any(f.endswith(".vtt") for f in os.listdir(vdir(v))):
            continue  # YouTube captions exist; Whisper is only for videos without them
        # translate: Sakurai speaks Japanese; for English audio this is plain transcription
        segs, info = model.transcribe(mp4(v), task="translate", batch_size=16, vad_filter=True)
        lines = [f"[{fmt(s.start)}] {s.text.strip()}" for s in segs]
        header = f"# {v['title']}\n# channel: {v.get('ch')} | id: {v['id']} | {round((v.get('dur') or 0) / 60, 1)} min\n\n"
        open(out + ".tmp", "w", encoding="utf-8").write(header + "\n".join(lines) + "\n")
        os.replace(out + ".tmp", out)
        print("whisper", v["id"], len(lines), "segments", flush=True)


def sheets_one(v):
    d = vdir(v)
    if not os.path.exists(mp4(v)) or os.path.exists(os.path.join(d, "sheet_001.jpg")):
        return f"skip {v['id']}"
    every = INTERVAL.get(v["tag"], 15)
    cols, rows = TILE
    # each tile carries its own timestamp so the reader never has to do arithmetic
    draw = ("drawtext=fontfile='C\\:/Windows/Fonts/arialbd.ttf':text='%{pts\\:hms}':"
            "x=6:y=6:fontsize=20:fontcolor=yellow:box=1:boxcolor=black@0.7")
    vf = f"fps=1/{every},scale=400:-2,{draw},tile={cols}x{rows}:padding=4:color=white"
    r = subprocess.run([FFMPEG, "-v", "error", "-skip_frame", "nokey", "-i", mp4(v), "-vf", vf, "-q:v", "4",
                        os.path.join(d, "sheet_%03d.jpg")], capture_output=True, text=True)
    n = len([f for f in os.listdir(d) if f.startswith("sheet_")])
    return f"sheets {v['id']} {n} {r.stderr[:200]}"


def sheets():
    with ThreadPoolExecutor(6) as ex:
        for r in ex.map(sheets_one, videos()):
            print(r, flush=True)


if __name__ == "__main__":
    {"download": download, "whisper": whisper, "sheets": sheets}[sys.argv[1]]()
