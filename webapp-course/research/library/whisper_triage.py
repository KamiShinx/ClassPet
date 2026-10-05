"""Triage transcripts when YouTube blocks captions: download audio only (first 30 min of anything over 45 min),
transcribe with faster-whisper small.en on the GPU, write caps/<id>.txt in the same format as captions.py.
Idempotent; skips ids that already have a caps file."""
import glob, json, os, sys, time
# yt-dlp's partial (download_ranges) downloader looks for ffmpeg on PATH, not in ffmpeg_location
os.environ["PATH"] = r"C:\Assistant\tools\ffmpeg\bin" + os.pathsep + os.environ.get("PATH", "")
import yt_dlp
from faster_whisper import WhisperModel, BatchedInferencePipeline

ROOT = os.path.dirname(os.path.abspath(__file__))
CAPS, AUD = os.path.join(ROOT, "caps"), os.path.join(ROOT, "_aud")
os.makedirs(AUD, exist_ok=True)
FFMPEG_DIR = r"C:\Assistant\tools\ffmpeg\bin\ffmpeg.exe"
SAMPLE_OVER, SAMPLE_LEN = 45 * 60, 30 * 60

vs_all = {v["id"]: v for v in json.load(open(os.path.join(ROOT, "videos.json"), encoding="utf-8"))}
queue = [i for i in json.load(open(os.path.join(ROOT, sys.argv[1] if len(sys.argv) > 1 else "caption_queue.json")))
         if not os.path.exists(os.path.join(CAPS, i + ".txt"))]
FAILED = ["c9Wg6Cb_YlU", "y0ue4ZZlZwg", "r8jQ9hVA2qs", "qzaETC6SWgI", "Dxcc6ycZ73M", "ZhEf7e4kopM", "5o8CwafCxnU"]
DEAD_PL = "PLzdnOPI1iJNfMRZm5DDxco3U"  # CodeAI re-upload of code.org's Internet series: all videos removed
queue = [i for i in queue if not (vs_all[i].get("pl") or "").startswith(DEAD_PL)]
groups = json.load(open(os.path.join(ROOT, "groups.json"), encoding="utf-8"))
samples = {i for k in ("T04", "T11", "T12", "T13") for i in groups[k].get("sampled_ids", [])}
queue = ([i for i in queue if i in samples and i not in FAILED] + [i for i in queue if i not in samples and i not in FAILED]
         + [i for i in queue if i in FAILED])
print("to do:", len(queue), flush=True)


def fmt(t):
    t = int(t)
    return f"{t // 3600}:{t % 3600 // 60:02d}:{t % 60:02d}"


def fetch_prefix(v):
    """First SAMPLE_LEN of a long video's m4a: its URL from yt-dlp, then plain byte ranges in 8 MB chunks.
    yt-dlp's download_ranges pipes one unchunked stream through ffmpeg, which YouTube throttles to ~1.5x realtime.
    The m4a is fragmented MP4, so a truncated prefix decodes up to the cut."""
    import urllib.request
    with yt_dlp.YoutubeDL({"quiet": True, "no_warnings": True, "js_runtimes": {"node": {}}}) as y:
        info = y.extract_info(f"https://www.youtube.com/watch?v={v['id']}", download=False)
    f = next(x for x in info["formats"] if x.get("format_id") == "140")
    size = f.get("filesize") or f.get("filesize_approx")
    want = int(size * min(1.0, (SAMPLE_LEN + 60) / info["duration"]))
    out = os.path.join(AUD, v["id"] + ".m4a")
    with open(out + ".part", "wb") as fh:
        for start in range(0, want, 8 << 20):
            end = min(want, start + (8 << 20)) - 1
            req = urllib.request.Request(f["url"] + f"&range={start}-{end}", headers=f.get("http_headers") or {})
            fh.write(urllib.request.urlopen(req, timeout=60).read())
    os.replace(out + ".part", out)
    return out


def fetch(v):
    got = glob.glob(os.path.join(AUD, v["id"] + ".*"))
    if got:
        return got[0]
    if (v.get("dur") or 0) > SAMPLE_OVER:
        try:
            return fetch_prefix(v)
        except Exception as e:
            print("prefix-err", v["id"], str(e)[:120], flush=True)
    opts = {"quiet": True, "no_warnings": True, "noprogress": True, "format": "bestaudio[ext=m4a]/bestaudio",
            "outtmpl": os.path.join(AUD, v["id"] + ".%(ext)s"), "ffmpeg_location": FFMPEG_DIR, "sleep_interval": 3,
            "js_runtimes": {"node": {}}}  # YouTube needs a JS runtime to unlock streams (else 403s)
    if (v.get("dur") or 0) > SAMPLE_OVER:
        opts["download_ranges"] = yt_dlp.utils.download_range_func(None, [(0, SAMPLE_LEN)])
        opts["force_keyframes_at_cuts"] = False
    for client in (None, "android"):
        if client:
            opts["extractor_args"] = {"youtube": {"player_client": [client]}}
        try:
            with yt_dlp.YoutubeDL(opts) as y:
                y.download([f"https://www.youtube.com/watch?v={v['id']}"])
        except Exception as e:
            print("dl-err", v["id"], str(e)[:120], flush=True)
            time.sleep(8)
        got = glob.glob(os.path.join(AUD, v["id"] + ".*"))
        if got:
            return got[0]
    return None


model = BatchedInferencePipeline(WhisperModel("small.en", device="cuda", compute_type="float16"))
fails = 0
for i in queue:
    v = vs_all[i]
    path = fetch(v)
    if not path:
        fails += 1
        print("NOAUDIO", i, flush=True)
        time.sleep(300 if fails >= 3 else 30)
        continue
    fails = 0
    segs, _ = model.transcribe(path, batch_size=16, vad_filter=True)
    lines, cur_t, cur = [], None, []
    for s in segs:
        if cur_t is None:
            cur_t = s.start
        cur.append(s.text.strip())
        if s.end - cur_t >= 30:
            lines.append(f"[{fmt(cur_t)}] {' '.join(cur)}"); cur_t, cur = None, []
    if cur:
        lines.append(f"[{fmt(cur_t or 0)}] {' '.join(cur)}")
    sampled = (v.get("dur") or 0) > SAMPLE_OVER
    src = "whisper small.en" + (" (FIRST 30 MIN ONLY)" if sampled else "")
    header = (f"# {v['title']}\n# channel: {v.get('ch')} | id: {i} | {round((v.get('dur') or 0) / 60, 1)} min | "
              f"source: {src}\n\n")
    open(os.path.join(CAPS, i + ".txt"), "w", encoding="utf-8").write(header + "\n".join(lines) + "\n")
    os.remove(path)
    print("ok", i, len(lines), "chunks", "sampled" if sampled else "", flush=True)
print("DONE", flush=True)
