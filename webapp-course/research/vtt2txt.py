"""Turn each video's transcript into vids/<id>/transcript.txt with [h:mm:ss] stamps every ~30 s.

Whisper output wins when it exists; otherwise the YouTube caption .vtt is used. Auto-captions repeat each line
as it scrolls, so consecutive duplicate lines are dropped.
"""
import glob, html, os, re
import pipeline as p

CUE = re.compile(r"^(\d+):(\d\d):(\d\d)\.\d+ --> ")


def from_vtt(path):
    chunks, cur_t, cur, last = [], None, [], None
    t = 0
    for line in open(path, encoding="utf-8"):
        m = CUE.match(line)
        if m:
            t = int(m[1]) * 3600 + int(m[2]) * 60 + int(m[3])
            continue
        text = " ".join(html.unescape(re.sub(r"<[^>]+>", "", line)).split())
        if not text or text == last or text.startswith(("WEBVTT", "Kind:", "Language:")):
            continue
        last = text
        if cur_t is None:
            cur_t = t
        cur.append(text)
        if t - cur_t >= 30:
            chunks.append(f"[{p.fmt(cur_t)}] {' '.join(cur)}")
            cur_t, cur = None, []
    if cur:
        chunks.append(f"[{p.fmt(cur_t or 0)}] {' '.join(cur)}")
    return chunks


for v in p.videos():
    d = p.vdir(v)
    out = os.path.join(d, "transcript.txt")
    w = os.path.join(d, "whisper.txt")
    if os.path.exists(w):
        src, body = "whisper large-v3", open(w, encoding="utf-8").read().split("\n\n", 1)[-1]
    else:
        vtts = sorted(glob.glob(os.path.join(d, "*.vtt")), key=lambda f: "en.vtt" not in f)
        if not vtts:
            print("MISSING", v["id"]); continue
        src, body = "YouTube captions", "\n".join(from_vtt(vtts[0])) + "\n"
    header = (f"# {v['title']}\n# channel: {v.get('ch')} | id: {v['id']} | "
              f"{round((v.get('dur') or 0) / 60, 1)} min | source: {src}\n\n")
    open(out, "w", encoding="utf-8").write(header + body)
    print("ok", v["id"], src, len(body.split()), "words")
