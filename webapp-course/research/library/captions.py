"""Captions-only pass: fetch English captions for every video in videos.json (no video download) and write
caps/<id>.txt with [h:mm:ss] stamps every ~30 s. Paced to avoid YouTube's bot check. Idempotent."""
import glob, html, json, os, re, time
import yt_dlp

ROOT = os.path.dirname(os.path.abspath(__file__))
CAPS = os.path.join(ROOT, "caps")
TMP = os.path.join(ROOT, "_vtt")
os.makedirs(CAPS, exist_ok=True); os.makedirs(TMP, exist_ok=True)
CUE = re.compile(r"^(\d+):(\d\d):(\d\d)\.\d+ --> ")


def fmt(t):
    return f"{t // 3600}:{t % 3600 // 60:02d}:{t % 60:02d}"


def vtt_to_text(path):
    chunks, cur_t, cur, last, t = [], None, [], None, 0
    for line in open(path, encoding="utf-8"):
        m = CUE.match(line)
        if m:
            t = int(m[1]) * 3600 + int(m[2]) * 60 + int(m[3]); continue
        text = " ".join(html.unescape(re.sub(r"<[^>]+>", "", line)).split())
        if not text or text == last or text.startswith(("WEBVTT", "Kind:", "Language:")):
            continue
        last = text
        if cur_t is None:
            cur_t = t
        cur.append(text)
        if t - cur_t >= 30:
            chunks.append(f"[{fmt(cur_t)}] {' '.join(cur)}"); cur_t, cur = None, []
    if cur:
        chunks.append(f"[{fmt(cur_t or 0)}] {' '.join(cur)}")
    return "\n".join(chunks) + "\n"


vs_all = {v["id"]: v for v in json.load(open(os.path.join(ROOT, "videos.json"), encoding="utf-8"))}
vs = [vs_all[i] for i in json.load(open(os.path.join(ROOT, "caption_queue.json")))]
for v in vs:
    out = os.path.join(CAPS, v["id"] + ".txt")
    if os.path.exists(out):
        continue
    ok = False
    for client in (None, "android"):
        opts = {"quiet": True, "no_warnings": True, "skip_download": True, "writeautomaticsub": True,
                "writesubtitles": True, "subtitleslangs": ["en"],
                "subtitlesformat": "vtt", "outtmpl": os.path.join(TMP, v["id"] + ".%(ext)s"),
                "sleep_interval_subtitles": 5}
        if client:
            opts["extractor_args"] = {"youtube": {"player_client": [client]}}
        try:
            with yt_dlp.YoutubeDL(opts) as y:
                y.download([f"https://www.youtube.com/watch?v={v['id']}"])
        except Exception as e:
            if "429" in str(e): time.sleep(45)
            else: time.sleep(10)
        found = sorted(glob.glob(os.path.join(TMP, v["id"] + ".*.vtt")), key=lambda f: ("en.vtt" not in f, f))
        if found:
            header = (f"# {v['title']}\n# channel: {v.get('ch')} | id: {v['id']} | "
                      f"{round((v.get('dur') or 0) / 60, 1)} min | source: YouTube captions\n\n")
            open(out, "w", encoding="utf-8").write(header + vtt_to_text(found[0]))
            for f in found:
                os.remove(f)
            ok = True
            break
    print("ok" if ok else "NOCAPS", v["id"], flush=True)
    time.sleep(4)
print("DONE", len(glob.glob(os.path.join(CAPS, "*.txt"))), "of", len(vs), flush=True)
