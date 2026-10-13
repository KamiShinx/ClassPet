# -*- coding: utf-8 -*-
"""Builds the new hub Index.html: keeps the shell (styles, pages, router), swaps the lesson data and slides, embeds the egg file."""
import io, json, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = r"C:\Users\Ben\code\ClassPet\webapp-course"
HUB = REPO + r"\hub\Index.html"
rd = lambda p: io.open(p, encoding="utf-8").read()
src = rd(HUB).replace("\r\n", "\n")

CSS = r"""
/* meeting 1, version 3: the kid's own words, the Sheet, and the slides' toys */
.form textarea{resize:vertical}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chips button{border:2px solid var(--line);background:var(--surface);border-radius:999px;padding:6px 16px;font-weight:700}
.chips button.on{background:var(--pri);border-color:var(--pri);color:var(--pri-ink)}
.cycle{background:var(--sunk);border-radius:12px;padding:10px 14px}
.m-sheet{border-collapse:collapse;direction:ltr;margin-inline:auto;font-family:var(--mono);font-size:14px;background:#fff;color:#202124}
.m-sheet td,.m-sheet th{border:1px solid #dadce0;padding:4px 14px;text-align:left}
.m-sheet th{background:#f1f3f4;font-weight:400;color:#5f6368}
.m-sheet .new td{background:#fff8d6}
.help h3{margin-top:16px;font-size:1.1rem}
.help .form,.help .prompt{margin-top:10px}
.toybox{position:relative;width:220px;display:grid;justify-items:center}
.toybox.sm{width:110px}.build .toybox{width:240px}.toybox.xl{width:min(300px,34vh);cursor:pointer}
.toy{width:100%;display:block}
.toy-name{font-size:1.4rem}
.toy-say{position:absolute;top:-10px;inset-inline-start:-60px;background:#fff;color:#231B3A;border:3px solid #231B3A;border-radius:16px;padding:4px 12px;font-weight:800;white-space:nowrap}
.hop{animation:hop .35s}
@keyframes hop{40%{transform:translateY(-22px) rotate(-5deg)}}
.dia{position:relative;display:grid;grid-template-columns:repeat(3,1fr);gap:40px;width:min(1050px,92vw);padding-bottom:70px}
.dc{background:var(--surface);border:3px solid var(--line);border-radius:18px;padding:14px;display:grid;gap:8px;justify-items:center;align-content:start;font-size:1.3rem;min-height:min(290px,38vh)}
.dc .ico{font-size:4rem}
.dc.closed{background:#1b1b1b;border-color:#1b1b1b;color:#888}.dc.closed > *:not(b){visibility:hidden}
.dc.dead{opacity:.3}
.dbar{width:140px;height:14px;background:var(--sunk);border-radius:7px;overflow:hidden}.dbar i{display:block;height:100%;background:#F29E38;transition:width .3s}
.dnum{font-weight:800;font-size:1.6rem}
.dsay{color:#C62828;font-weight:700;min-height:1.2em;font-size:1rem}
.lane{position:absolute;left:0;right:0;bottom:8px;height:50px;border-top:4px dashed var(--line)}
.pkt{position:absolute;top:8px;transform:translateX(50%);background:var(--hl);color:#231B3A;border-radius:999px;padding:4px 16px;font-weight:800;font-size:1.2rem;transition:inset-inline-start .6s ease-in-out;white-space:nowrap}
.pkt[hidden]{display:none}
.dctl{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center}
.dc.friend{min-height:0;display:flex;gap:14px;padding:6px 16px;align-items:center}
.dc.friend[hidden]{display:none}
.duo,.two{display:grid;grid-template-columns:1fr 1fr;gap:60px;width:min(1000px,90vw)}
.who,.col{display:grid;gap:14px;justify-items:center;align-content:start}
.who .ico{font-size:5rem;line-height:1}.who b{font-size:1.8rem}
.bub{background:var(--surface);border:3px solid var(--ink);border-radius:18px;padding:8px 20px;font-size:1.5rem;font-weight:700}
#guess{min-height:220px;align-content:center}.q{font-size:6rem;color:var(--muted)}
.build{display:grid;grid-template-columns:1fr 240px;gap:50px;align-items:center;width:min(1050px,92vw)}
.build > .toybox:first-child{order:2}
.chips.big{justify-content:center}.chips.big button{font-size:1.4rem;padding:10px 22px}
.chat{height:min(46vh,420px);overflow:auto;display:grid;gap:10px;align-content:start;text-align:start;padding:6px}
.msg{max-width:85%;padding:10px 16px;border-radius:16px;font-size:1.25rem}
.msg.me{background:var(--pri);color:var(--pri-ink);justify-self:start}
.msg.ai{background:var(--surface);border:2px solid var(--line);justify-self:end}
.bugcard{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;width:min(1000px,90vw)}
.bugcard[hidden]{display:none}
.bugcard b{background:var(--warn-soft);border-radius:12px;padding:12px;font-size:1.25rem}
.form h3{margin-top:10px;font-size:1.15rem;color:var(--pri)}
.dbar.wide{width:min(420px,60vw);height:22px;border-radius:11px}
.sil .toy *{fill:#16131f !important;stroke:#16131f !important}
.plan{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;width:min(1050px,92vw)}
.pcol{background:var(--surface);border:3px solid var(--line);border-radius:18px;padding:12px;min-height:min(250px,34vh);display:grid;gap:8px;align-content:start;justify-items:center}
.pcol > b{font-size:1.8rem}.pcol > small{font-size:1.3rem;font-weight:800;color:var(--pri);visibility:hidden}
.plan.named .pcol > small{visibility:visible}
.pcol button{font-size:1.15rem !important;padding:6px 14px !important}
.path{display:flex;gap:26px;align-items:center;cursor:pointer}
.path div{display:grid;gap:8px;justify-items:center;opacity:.22;transition:opacity .3s,transform .3s}
.path div.on{opacity:1;transform:scale(1.08)}
.path span{font-size:clamp(4rem,9vw,7rem);line-height:1.1}.path b{font-size:1.6rem}.path i{font-style:normal;font-size:2.4rem;color:var(--muted)}
"""
if "version 3" in src:   # rebuild: drop the old block first
    src = src[:src.index("\n/* meeting 1, version 3")] + "\n" + src[src.index("</style>"):]
src = src.replace("\n</style>", CSS + "</style>", 1)

egg = rd(REPO + r"\m1\pet\Pet.html").replace("\r\n", "\n").rstrip("\n")
egg_js = json.dumps(egg, ensure_ascii=False).replace("</", "<\\/").replace("<!--", "<\\!--")
data = rd(HERE + r"\hub_v3_data.js").replace("<!-- END Pet -->", "${END}")
slides = rd(HERE + r"\hub_v3_slides.js")
block = ("/* The starter's Pet.html (the egg), copied here by the build so that the first message to Gemini can carry it. */\n"
         "const EGG = " + egg_js + ";\n"
         'const END = "<" + "!-- END Pet --" + ">";\n'
         "const yt = (id, a, b) => `<div class=\"yt\"><iframe src=\"https://www.youtube.com/embed/${id}?start=${a}&end=${b}&rel=0&cc_load_policy=1&cc_lang_pref=iw&hl=he\" allow=\"autoplay; fullscreen; encrypted-media\" allowfullscreen referrerpolicy=\"strict-origin-when-cross-origin\" title=\"סרטון\"></iframe></div>`;\n"
         + data + "\n" + slides + "\n")
a = src.index("/* The starter's Pet.html") if "/* The starter's Pet.html" in src else src.index("/* ===== the pet's design card")
b = src.index("/* ===== the optional page of meeting 1")
src = src[:a] + block + src[b:]

def swap(old, new, count=1):
    global src
    assert old in src or new in src, "missing: " + old[:60]
    src = src.replace(old, new, count)

swap('''      ${help.length ? `<details class="help"><summary>נתקעתי</summary><ul>${help.join("")}</ul></details>` : ""}''',
     '''      ${help.length || s.tools ? `<details class="help"><summary>${s.tools ? "נתקעתי, או שג׳מיני שבר משהו" : "נתקעתי"}</summary><ul>${help.concat(s.tools ? BROKE.map(([q, a]) => `<li><b>${q}</b>${a}</li>`) : []).join("")}</ul>${s.tools ? `<h3>דוח באג</h3>` + bugBox() + `<h3>להתחיל מחדש מהביצה</h3><p>מעתיקים, ומדביקים על כל Pet.html. החיה נמחקת, אבל האפליקציה חוזרת לעבוד.</p>` + promptBox("Pet.html של הביצה", EGG) : ""}</details>` : ""}''')
swap('''  try { window.focus(); } catch(e){}   // so the arrow keys work without clicking the page first''',
     '''  if (S1[si].mount) S1[si].mount(app.querySelector(".stage"));''')
swap('''if (e.key === "ArrowLeft" || e.key === " "){ si++; renderSlides(); }''',
     '''if (e.key === "ArrowLeft" || (e.key === " " && !e.target.closest("button"))){ si++; renderSlides(); }''')
swap('''יש לי דף (Index.html), שרת (Code.gs) וגיליון.''', '''יש לי דף (Pet.html), שרת (Code.gs) וגיליון.''')
swap('''<p>הגיליון הוא הזיכרון. מה שכתוב בו נכון, גם אם הדף מראה משהו אחר.</p>''', '''<p>הגיליון הוא הזיכרון. מה שכתוב בו הוא מה שנכון, גם אם הדף מראה משהו אחר.</p>''')
swap('''<h2>שלושה סרטונים קצרים</h2>''', '''<h2>שלושה סרטונים קצרים, למי שרוצה</h2>''')
swap('''<li>בגיליון, ליד <b>joy</b>, כותבים <b>5</b>, ומרעננים את האתר. מה החיה אומרת? מי החליט את זה?</li>''', '''<li>בגיליון, ליד <b>full</b>, כותבים <b>5</b>, וחוזרים לחיה. מה היא אומרת? מי החליט את זה?</li>''')
swap('''<div class="tile soon"><b>מפגש 2: היא חיה</b><span>רעב, מצבי רוח, ופרצופים</span></div>''', '''<div class="tile soon"><b>מפגש 2: היא חיה</b><span>היא נהיית רעבה, ויש לה מצבי רוח</span></div>''')
io.open(HUB, "w", encoding="utf-8", newline="\n").write(src)
print("ok", len(src), "chars;", src.count("\n"), "lines")
