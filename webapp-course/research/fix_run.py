"""Second pass: videos still missing get downloaded WITHOUT captions (a caption 429 used to sink the whole
download), then captions are fetched on their own, then Whisper / transcripts / sheets as in run_all.py."""
import glob, os, time
import yt_dlp
import pipeline as p

for v in p.videos():
    if os.path.exists(p.mp4(v)):
        continue
    ok = False
    for client in (None, "android", "web_safari"):
        opts = {"quiet": True, "no_warnings": True, "noprogress": True,
                "format": "18/bv*[height<=360]+ba/b[height<=360]/b", "merge_output_format": "mp4",
                "ffmpeg_location": os.path.dirname(p.FFMPEG),
                "outtmpl": os.path.join(p.vdir(v), "video.%(ext)s"), "sleep_interval": 6}
        if client:
            opts["extractor_args"] = {"youtube": {"player_client": [client]}}
        try:
            with yt_dlp.YoutubeDL(opts) as y:
                y.download([f"https://www.youtube.com/watch?v={v['id']}"])
            ok = os.path.exists(p.mp4(v))
        except Exception as e:
            err = str(e)[:100]
        if ok:
            break
        time.sleep(15)
    print("video", v["id"], "ok" if ok else "FAIL " + err, flush=True)

for v in p.videos():
    d = p.vdir(v)
    if glob.glob(os.path.join(d, "*.vtt")) or not os.path.exists(p.mp4(v)) \
            or os.path.exists(os.path.join(d, "whisper.txt")):
        continue
    try:
        with yt_dlp.YoutubeDL({"quiet": True, "no_warnings": True, "skip_download": True,
                               "writeautomaticsub": True, "writesubtitles": True,
                               "subtitleslangs": ["en", "en-US", "en-GB"], "subtitlesformat": "vtt",
                               "outtmpl": os.path.join(d, "video.%(ext)s"), "sleep_interval_subtitles": 8}) as y:
            y.download([f"https://www.youtube.com/watch?v={v['id']}"])
    except Exception:
        time.sleep(20)
    print("captions", v["id"], "yes" if glob.glob(os.path.join(d, "*.vtt")) else "none -> whisper", flush=True)

p.whisper()
os.system("python vtt2txt.py > transcripts.log 2>&1")
p.sheets()
ready = [v for v in p.videos() if os.path.exists(os.path.join(p.vdir(v), "transcript.txt"))
         and os.path.exists(os.path.join(p.vdir(v), "sheet_001.jpg"))]
print(f"DONE: {len(ready)} of {len(p.videos())} ready", flush=True)
