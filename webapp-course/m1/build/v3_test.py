# -*- coding: utf-8 -*-
"""Local test of meeting 1, version 3: the egg starter (with the offline fake server) and the hub (steps, prompts, slides)."""
import io, json, sys, os
from playwright.sync_api import sync_playwright
REPO = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".."))
rd = lambda p: io.open(p, encoding="utf-8").read()
OUT = REPO + r"\m1\test-shots\v3" + "\\"; os.makedirs(OUT, exist_ok=True)
def pet_page(pet_html=None):
    return rd(REPO + r"\m1\pet\Index.html").replace("<?!= include('Engine') ?>", rd(REPO + r"\m1\pet\Engine.html")).replace("<?!= include('Pet') ?>", pet_html if pet_html is not None else rd(REPO + r"\m1\pet\Pet.html"))
def hub_page(pg=""):
    cfg = {"template": "https://docs.google.com/spreadsheets/d/TEMPLATE_ID/edit?usp=sharing", "demo": "https://script.google.com/macros/s/DEMO_ID/exec", "page": pg}
    return rd(REPO + r"\hub\Index.html").replace("<?!= cfg ?>", json.dumps(cfg))
PLAN = {"name": "פופקורן", "kind": "חתול־דג", "shape": "עגולה כמו כדור", "colors": "סגול וצהוב", "special": "קרן אחת עקומה", "want": "שלא יפסיקו לשים לב אליה", "voice": "אני גוססת פה! פיצה!!!"}
BTN = {"label": "לדגדג 🪶", "does": "היא מתגלגלת מצחוק", "says": "די!!! מספיק!!!", "key": "tickles"}
R = {}
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    ctx = b.new_context(viewport={"width": 1366, "height": 768}, locale="he-IL"); ctx.grant_permissions(["clipboard-read", "clipboard-write"])
    state = {"pet": None}
    def route(r):
        u = r.request.url
        if "/pet" in u: body = pet_page(state["pet"])
        else: body = hub_page("slides1" if "slides" in u else "")
        r.fulfill(status=200, content_type="text/html; charset=utf-8", body=body)
    ctx.route("http://localhost:9999/**", route)

    # ---------- the egg ----------
    pg = ctx.new_page(); errs = []; pg.on("pageerror", lambda e: errs.append(str(e)[:150]))
    pg.goto("http://localhost:9999/pet"); pg.wait_for_selector("#eng-foot")
    E = {"name": pg.inner_text("#name"), "full0": pg.inner_text("#fullNum")}
    for _ in range(5): pg.click("text=ללטף")
    pg.click("text=להאכיל"); pg.click("text=להאכיל")
    E["after"] = {"pats": pg.inner_text("#pats"), "full": pg.inner_text("#fullNum")}
    for _ in range(5): pg.click("text=להאכיל")
    E["full_max"] = pg.inner_text("#fullNum"); E["strip_hidden"] = pg.eval_on_selector("#eng-strip", "e => e.hidden")
    pg.screenshot(path=OUT + "egg.png"); E["errors"] = list(errs)
    # a truncated file from Gemini: the script never closes
    full = rd(REPO + r"\m1\pet\Pet.html"); state["pet"] = full[:full.index("function draw()")]
    pg.goto("http://localhost:9999/pet"); pg.wait_for_timeout(600)
    E["truncated_strip"] = pg.inner_text("#eng-strip")[:90]
    # a file with a runtime error inside draw
    state["pet"] = full.replace('document.getElementById("pats").textContent = pats;', 'document.getElementById("nope").textContent = pats;')
    pg.goto("http://localhost:9999/pet"); pg.wait_for_timeout(600)
    E["error_strip"] = pg.inner_text("#eng-strip")[:160]; pg.screenshot(path=OUT + "egg-red-strip.png")
    R["egg"] = E; state["pet"] = None

    # ---------- the hub ----------
    hp = ctx.new_page(); herr = []; hp.on("pageerror", lambda e: herr.append(str(e)[:150]))
    hp.goto("http://localhost:9999/hub"); hp.wait_for_selector(".hero"); hp.click("a.btn.go"); steps = []
    for i in range(12):
        hp.wait_for_selector("article.card"); info = {"n": i + 1, "title": hp.inner_text(".head h1"), "station": hp.eval_on_selector(".lp-st", "n => (n.querySelector('.cur')||{}).innerText.replace(/\\n/g,' ') || ''")}
        if i == 1:
            for k, v in PLAN.items(): hp.fill(f'[data-card="{k}"]', v)
            for k, v in BTN.items(): hp.fill(f'[data-mine="{k}"]', v)
        if i == 5:
            pre = hp.inner_text('[data-live="ask"] pre'); info["plan_in_prompt"] = all(v in pre for v in PLAN.values())
            hp.click('[data-live="ask"] [data-copy]'); hp.wait_for_timeout(200); info["clipboard_ok"] = hp.evaluate("navigator.clipboard.readText()").replace("\r\n", "\n").strip() == pre.strip()
        if i == 6:
            info["copy_disabled_before"] = hp.is_disabled('[data-live="hatch"] [data-copy]')
            hp.fill('[data-mine="decided"]', "עיניים ענקיות, רקע של לילה, וכשהיא רעבה היא נהיית אדומה")
            info["copy_disabled_after"] = hp.is_disabled('[data-live="hatch"] [data-copy]')
            pre = hp.inner_text('[data-live="hatch"] pre'); info["hatch_has_egg_and_end"] = ("server.add" in pre) and pre.rstrip().endswith("<!-- END Pet -->") and ("רקע של לילה" in pre); info["hatch_chars"] = len(pre)
            hp.click("details.help summary"); info["help_has_bug_and_reset"] = hp.locator('details.help [data-live="bug"]').count() == 1 and "END Pet" in hp.inner_text("details.help")
        if i == 7:
            hp.click('[data-talk="three"]'); hp.fill('[data-mine="talk"]', "למה שהיא אומרת כשהיא שמחה"); info["talk"] = hp.inner_text('[data-live="talk"] pre')
        if i == 8: info["options"] = hp.inner_text('[data-live="options"] pre').split("\n")[1:4]
        if i == 9:
            hp.fill('[data-mine="pick"]', "הצעה 2, אבל שהיא תקפוץ יותר גבוה"); info["build"] = hp.inner_text('[data-live="build"] pre').split("\n")[2:5]; info["sheet_row"] = hp.inner_text(".m-sheet .new")
        L = hp.evaluate("""() => { window.scrollTo(0, document.documentElement.scrollHeight); const f=document.querySelector('.foot').getBoundingClientRect(), c=document.querySelector('.card');
            const hid=[...c.querySelectorAll('.expect,.note,.help,.chal')].filter(e=>e.getBoundingClientRect().bottom>f.top+1).length; const o={hidden:hid, x:document.documentElement.scrollWidth>innerWidth+1}; window.scrollTo(0,0); return o }""")
        info.update(L)
        if i in (1, 4, 6, 7, 9, 10): hp.screenshot(path=OUT + "step-%02d.png" % (i + 1), full_page=True)
        steps.append(info)
        if i < 11: hp.click("#next")
    R["hub"] = {"steps": steps, "errors": herr}

    # ---------- the slides ----------
    sp = ctx.new_page(); serr = []; sp.on("pageerror", lambda e: serr.append(str(e)[:150]))
    sp.goto("http://localhost:9999/slides"); sp.wait_for_selector(".sl"); S = {"total": sp.inner_text(".count")}
    fit = lambda: sp.evaluate("(() => { const s=document.querySelector('.stage > div').getBoundingClientRect(), n=document.querySelector('.notes').getBoundingClientRect(); return s.bottom <= n.top + 1 && s.top >= 0 && document.documentElement.scrollWidth <= innerWidth + 1 })()")
    fits = []
    def shot(n): sp.wait_for_timeout(250); sp.screenshot(path=OUT + "slide-%02d.png" % n)
    fits.append(fit()); shot(1); sp.click("#sl-next")                                  # 2 needs
    sp.wait_for_timeout(4200); S["needs_say"] = sp.inner_text(".toy-say") if sp.locator(".toy-say").count() else ""; fits.append(fit()); shot(2)
    sp.click("[data-a=feed]"); sp.wait_for_timeout(200); S["after_feed_say"] = sp.locator(".toy-say").count(); sp.click("#sl-next")   # 3 shape
    sp.click("#shapes button >> nth=2"); sp.click("#extras button >> nth=0"); S["shape_word"] = sp.inner_text("#s3"); fits.append(fit()); shot(3)
    sp.click("#sil"); sp.wait_for_timeout(150); sp.screenshot(path=OUT + "slide-03-dark.png"); sp.click("#sl-next")                    # 4 wants
    sp.click("#wants button >> nth=1"); S["want_line"] = sp.inner_text(".toy-say"); fits.append(fit()); shot(4); sp.click("#sl-next")  # 5 plan
    for i in range(7): sp.click("#pool button >> nth=0")
    sp.click("#names"); S["plan_cols"] = sp.eval_on_selector_all(".pcol", "e => e.map(c => c.querySelectorAll('button').length)"); fits.append(fit()); shot(5); sp.click("#sl-next")  # 6 diagram
    sp.click("[data-a=feed]"); sp.wait_for_timeout(3200); S["dia_after_feed"] = [sp.inner_text(".cell"), sp.inner_text(".page .dnum")]
    sp.click("[data-a=kill]"); sp.click("[data-a=feed]"); sp.wait_for_timeout(1700); S["dia_dead"] = sp.inner_text(".dsay"); fits.append(fit()); shot(6)
    sp.click("[data-a=kill]"); sp.click("[data-a=friend]"); sp.click("[data-a=close]"); sp.wait_for_timeout(200); sp.screenshot(path=OUT + "slide-06-closed.png"); sp.click("#sl-next")  # 7 boss
    sp.click("[data-a=vague]"); sp.wait_for_timeout(1300); fits.append(fit()); shot(7); sp.click("[data-a=plan]"); S["plan_guess_named"] = sp.inner_text("#guess .toy-name"); sp.click("#sl-next")  # 8 chat
    for _ in range(8): sp.click("#more")
    S["chat_msgs"] = sp.locator(".msg").count(); S["chat_say"] = sp.inner_text(".toy-say"); fits.append(fit()); shot(8); sp.click("#sl-next")  # 9 fix
    sp.click("[data-a=bad]"); sp.click("[data-a=good]"); sp.click("[data-a=bug]"); fits.append(fit()); shot(9); sp.click("#sl-next")           # 10 path
    sp.click("#path"); sp.click("#path"); fits.append(fit()); shot(10)
    S["fits_1366x768"] = fits; S["end"] = sp.inner_text(".count"); S["errors"] = serr
    R["slides"] = S
    b.close()
sys.stdout.buffer.write(json.dumps(R, ensure_ascii=False, indent=1).encode("utf-8"))
