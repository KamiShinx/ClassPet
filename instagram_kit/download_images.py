#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ClassPet / T.A.V.A.S. — Instagram carousel image fetcher
=========================================================
Downloads ONE free, openly-licensed image for every frame of every carousel
(posts by Ben & Ram) from Wikimedia Commons.

WHY A SCRIPT INSTEAD OF READY IMAGES?
    The environment where these posts were written blocks outbound access to
    image hosts, so the pictures couldn't be bundled directly. This script
    fetches them on YOUR machine instead — nothing but Python 3 required.

HOW TO RUN:
    python3 download_images.py

WHAT YOU GET:
    images/PostX_.../PX_topic_frameN.jpg   <- one image per frame, named by post+frame
    images/CREDITS.csv                     <- author + license + source page for each
    images/gallery.html                    <- open in a browser to preview everything

All images come from Wikimedia Commons and are free to use. ALWAYS keep the
attribution from CREDITS.csv (author + license) when you publish — most licenses
(CC-BY / CC-BY-SA) legally require crediting the author.

If an image isn't a perfect fit, just search Wikimedia Commons yourself for a
better one and drop it in with the same filename.
"""

import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

API = "https://commons.wikimedia.org/w/api.php"
UA = "ClassPet-Instagram-ImageFetcher/1.0 (educational; contact: T.A.V.A.S.)"
WIDTH = 1200  # px; Instagram square is 1080 — 1200 leaves a little room to crop

# ---------------------------------------------------------------------------
# Every frame: (post_folder, file_slug, search_query, hebrew_description)
# The search runs against the Wikimedia Commons *File* namespace and grabs the
# top matching image. Queries were chosen to fit each slide of each post.
# ---------------------------------------------------------------------------
FRAMES = [
    # ---------- POST 1 — Ben — Mars ----------
    ("Post1_Ben_Mars", "P1_Mars_frame1_title",     "Mars planet globe",           "שקף 1 — כותרת: מאדים"),
    ("Post1_Ben_Mars", "P1_Mars_frame2_redsurface","Mars surface Curiosity rover","שקף 2 — פני השטח האדומים"),
    ("Post1_Ben_Mars", "P1_Mars_frame3_duststorm", "Mars global dust storm",      "שקף 3 — קור, אטמוספירה, קרינה"),
    ("Post1_Ben_Mars", "P1_Mars_frame4_olympus",   "Olympus Mons",                "שקף 4 — אולימפוס מונס / קרח"),
    ("Post1_Ben_Mars", "P1_Mars_frame5_rover",     "Perseverance rover Mars",     "שקף 5 — MOXIE / ייצור חמצן"),
    ("Post1_Ben_Mars", "P1_Mars_frame6_starship",  "SpaceX Starship rocket",      "שקף 6 — התיישבות / Starship"),

    # ---------- POST 2 — Ben — Moon / Artemis ----------
    ("Post2_Ben_Moon-Artemis", "P2_Moon_frame1_title",    "Full Moon",                 "שקף 1 — כותרת: הירח"),
    ("Post2_Ben_Moon-Artemis", "P2_Moon_frame2_apollo11", "Buzz Aldrin Apollo 11 Moon","שקף 2 — אפולו 11, 1969"),
    ("Post2_Ben_Moon-Artemis", "P2_Moon_frame3_astronaut","Apollo 17 astronaut Moon",  "שקף 3 — 12 בני אדם על הירח"),
    ("Post2_Ben_Moon-Artemis", "P2_Moon_frame4_artemis",  "Artemis I launch SLS",      "שקף 4 — תוכנית ארטמיס"),
    ("Post2_Ben_Moon-Artemis", "P2_Moon_frame5_southpole","Lunar south pole",          "שקף 5 — קרח בקוטב הדרומי"),
    ("Post2_Ben_Moon-Artemis", "P2_Moon_frame6_orion",    "Orion spacecraft NASA",     "שקף 6 — אוריון / SLS"),

    # ---------- POST 3 — Ben — Jupiter & Europa ----------
    ("Post3_Ben_Jupiter-Europa", "P3_Europa_frame1_title",  "Europa moon Galileo",        "שקף 1 — כותרת: אירופה"),
    ("Post3_Ben_Jupiter-Europa", "P3_Europa_frame2_jupiter","Jupiter Great Red Spot",     "שקף 2 — צדק והכתם האדום"),
    ("Post3_Ben_Jupiter-Europa", "P3_Europa_frame3_surface","Europa moon surface lineae", "שקף 3 — פני הקרח של אירופה"),
    ("Post3_Ben_Jupiter-Europa", "P3_Europa_frame4_ocean",  "Europa water plumes",        "שקף 4 — אוקיינוס תת-קרחוני"),
    ("Post3_Ben_Jupiter-Europa", "P3_Europa_frame5_interior","Europa internal structure", "שקף 5 — חימום גאות / מבנה פנימי"),
    ("Post3_Ben_Jupiter-Europa", "P3_Europa_frame6_clipper","Europa Clipper spacecraft",  "שקף 6 — משימות Clipper / JUICE"),

    # ---------- POST 4 — Ben — Journey to space ----------
    ("Post4_Ben_Journey-to-Space", "P4_Space_frame1_title",   "Rocket launch night",          "שקף 1 — כותרת: המסע לחלל"),
    ("Post4_Ben_Journey-to-Space", "P4_Space_frame2_sputnik", "Sputnik 1 satellite",          "שקף 2 — ספוטניק 1, 1957"),
    ("Post4_Ben_Journey-to-Space", "P4_Space_frame3_gagarin", "Yuri Gagarin cosmonaut",       "שקף 3 — גגארין, 1961"),
    ("Post4_Ben_Journey-to-Space", "P4_Space_frame4_saturnv", "Saturn V launch Apollo 11",    "שקף 4 — איך טיל ממריא"),
    ("Post4_Ben_Journey-to-Space", "P4_Space_frame5_earthlimb","Earth atmosphere limb space", "שקף 5 — קו קארמאן / כדוה\"א מהחלל"),
    ("Post4_Ben_Journey-to-Space", "P4_Space_frame6_iss",     "International Space Station",   "שקף 6 — תחנת החלל / ההווה"),

    # ---------- POST 5 — Ram — Sensors ----------
    ("Post5_Ram_Sensors", "P5_Sensors_frame1_title",     "Humanoid robot",                "שקף 1 — כותרת: רובוט"),
    ("Post5_Ram_Sensors", "P5_Sensors_frame2_ultrasonic","HC-SR04 ultrasonic sensor",     "שקף 2 — חיישן מרחק"),
    ("Post5_Ram_Sensors", "P5_Sensors_frame3_linefollow","Line following robot",          "שקף 3 — חיישני אור/צבע/מגע"),
    ("Post5_Ram_Sensors", "P5_Sensors_frame4_imu",       "MEMS accelerometer chip",       "שקף 4 — מד-תאוצה / ג'ירוסקופ"),
    ("Post5_Ram_Sensors", "P5_Sensors_frame5_vision",    "Robot camera computer vision",  "שקף 5 — מצלמה ומיקרופון"),
    ("Post5_Ram_Sensors", "P5_Sensors_frame6_selfdrive", "Waymo self driving car lidar",  "שקף 6 — מכונית אוטונומית"),

    # ---------- POST 6 — Ram — Robotics in Israeli agriculture ----------
    ("Post6_Ram_Agri-Robotics", "P6_Agri_frame1_title",     "Agricultural drone field",     "שקף 1 — כותרת: רובוטים בשדה"),
    ("Post6_Ram_Agri-Robotics", "P6_Agri_frame2_fruitpick", "Agricultural harvesting robot", "שקף 2 — רובוט קטיף פירות"),
    ("Post6_Ram_Agri-Robotics", "P6_Agri_frame3_tractor",   "Autonomous tractor",           "שקף 3 — טרקטור אוטונומי"),
    ("Post6_Ram_Agri-Robotics", "P6_Agri_frame4_spraying",  "Agricultural drone spraying",  "שקף 4 — רחפני ריסוס וניטור"),
    ("Post6_Ram_Agri-Robotics", "P6_Agri_frame5_bees",      "Honey bee pollination flower", "שקף 5 — ניטור AI / דבורים"),
    ("Post6_Ram_Agri-Robotics", "P6_Agri_frame6_field",     "Drip irrigation Israel field", "שקף 6 — יבול / חקלאות ישראל"),

    # ---------- POST 7 — Ram — micro:bit ----------
    ("Post7_Ram_microbit", "P7_Microbit_frame1_title",   "BBC micro:bit board",          "שקף 1 — כותרת: מיקרו:ביט"),
    ("Post7_Ram_microbit", "P7_Microbit_frame2_front",   "Micro:bit front LED display",  "שקף 2 — מסך LED וכפתורים"),
    ("Post7_Ram_microbit", "P7_Microbit_frame3_back",    "Micro:bit back sensors",       "שקף 3 — חיישנים על הלוח"),
    ("Post7_Ram_microbit", "P7_Microbit_frame4_code",    "Micro:bit MakeCode programming","שקף 4 — תכנות בבלוקים / Python"),
    ("Post7_Ram_microbit", "P7_Microbit_frame5_robot",   "Micro:bit robot project",      "שקף 5 — פרויקטים ורובוטים"),
    ("Post7_Ram_microbit", "P7_Microbit_frame6_kids",    "Children programming computer","שקף 6 — לומדים ליצור"),
]


def api_get(params):
    params = dict(params)
    params["format"] = "json"
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def strip_html(s):
    if not s:
        return ""
    s = re.sub(r"<[^>]+>", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def find_image(query):
    """Return dict with thumburl, descriptionurl, artist, license, title — or None."""
    data = api_get({
        "action": "query",
        "generator": "search",
        "gsrsearch": query,
        "gsrnamespace": 6,              # File: namespace
        "gsrlimit": 5,
        "prop": "imageinfo",
        "iiprop": "url|extmetadata|mime",
        "iiurlwidth": WIDTH,
    })
    pages = (data.get("query") or {}).get("pages") or {}
    # keep search rank order
    ordered = sorted(pages.values(), key=lambda p: p.get("index", 999))
    for p in ordered:
        info = (p.get("imageinfo") or [{}])[0]
        mime = info.get("mime", "")
        # skip non-photographic / vector-only unless nothing else
        if mime.startswith("image/") and info.get("thumburl"):
            meta = info.get("extmetadata", {}) or {}
            return {
                "title": p.get("title", ""),
                "thumburl": info.get("thumburl"),
                "descriptionurl": info.get("descriptionurl", ""),
                "artist": strip_html((meta.get("Artist") or {}).get("value", "")) or "Unknown",
                "license": (meta.get("LicenseShortName") or {}).get("value", "") or "see source page",
                "licenseurl": (meta.get("LicenseUrl") or {}).get("value", ""),
            }
    return None


def download(url, path):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=120) as r:
        data = r.read()
    with open(path, "wb") as f:
        f.write(data)
    return len(data)


def main():
    base = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")
    os.makedirs(base, exist_ok=True)
    credits = []
    gallery_rows = []
    total = len(FRAMES)

    print("Fetching %d images from Wikimedia Commons...\n" % total)
    for i, (folder, slug, query, desc_he) in enumerate(FRAMES, 1):
        outdir = os.path.join(base, folder)
        os.makedirs(outdir, exist_ok=True)
        print("[%2d/%2d] %-34s  <- \"%s\"" % (i, total, slug, query))
        try:
            hit = find_image(query)
            if not hit:
                print("        !! no image found — search manually for: %s" % query)
                credits.append([slug, folder, desc_he, query, "NOT FOUND", "", "", ""])
                continue
            ext = ".png" if hit["thumburl"].lower().endswith(".png") else ".jpg"
            fname = slug + ext
            fpath = os.path.join(outdir, fname)
            size = download(hit["thumburl"], fpath)
            print("        OK  %s  (%.0f KB)  by %s [%s]" %
                  (fname, size / 1024, hit["artist"][:40], hit["license"]))
            rel = os.path.join(folder, fname)
            credits.append([slug, folder, desc_he, query, hit["title"],
                            hit["artist"], hit["license"], hit["descriptionurl"]])
            gallery_rows.append((rel, slug, desc_he, hit["artist"], hit["license"], hit["descriptionurl"]))
        except Exception as e:
            print("        !! error: %s" % e)
            credits.append([slug, folder, desc_he, query, "ERROR: %s" % e, "", "", ""])
        time.sleep(0.4)  # be polite to the API

    # ---- CREDITS.csv ----
    import csv
    cpath = os.path.join(base, "CREDITS.csv")
    with open(cpath, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.writer(f)
        w.writerow(["file", "folder", "frame", "search_query",
                    "source_file", "author", "license", "source_page_url"])
        w.writerows(credits)
    print("\nWrote credits -> %s" % cpath)

    # ---- gallery.html ----
    gpath = os.path.join(base, "gallery.html")
    with open(gpath, "w", encoding="utf-8") as f:
        f.write('<!doctype html><meta charset="utf-8"><title>ClassPet carousel images</title>')
        f.write('<style>body{font-family:sans-serif;background:#111;color:#eee;margin:24px}'
                'h1{font-size:20px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px}'
                '.card{background:#1d1d1d;border-radius:10px;padding:8px}'
                'img{width:100%;border-radius:6px;background:#000}'
                '.slug{font-size:12px;color:#8cf;word-break:break-all;margin-top:6px}'
                '.he{font-size:12px;direction:rtl}.cr{font-size:10px;color:#999;margin-top:4px}'
                'a{color:#9cf}</style>')
        f.write("<h1>ClassPet / T.A.V.A.S. — %d carousel images</h1><div class='grid'>" % len(gallery_rows))
        for rel, slug, he, artist, lic, page in gallery_rows:
            f.write("<div class='card'><img src='%s' loading='lazy'>"
                    "<div class='slug'>%s</div><div class='he'>%s</div>"
                    "<div class='cr'>%s · %s · <a href='%s'>source</a></div></div>"
                    % (rel.replace(os.sep, "/"), slug,
                       he, artist[:50], lic, page))
        f.write("</div>")
    print("Wrote gallery -> %s   (open it in a browser to preview)" % gpath)
    print("\nDone. Attribution for each image is in CREDITS.csv — keep it when you publish.")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(1)
