/* The studio: where kids build their world without code. Items now; creatures, rules and places come next.
   The design lives in C:\MAKE\design\world.json (server: /api/studio, /api/studio-save). Kit.java reads it when the
   game starts, so nothing here can break the build. Gemini is a design partner: it gets the design as text and may
   answer with a small ```studio block, which the studio checks before the kid accepts it.
   Loaded by index.html after content.js; index.html calls STUDIO.render(app) for #studio. */
(function(){
"use strict";
const H = window.HUB, esc = H.esc;
const S = { world: null, sel: -1, saving: null, msg: "", err: "", tool: "pen", color: "#1d1d21", undo: [], sugg: null, loaded: false };
const RARITY = [["common","רגיל","#FFFFFF"],["uncommon","לא נפוץ","#FFFF55"],["rare","נדיר","#55FFFF"],["epic","אגדי","#FF55FF"]];
const COLORS = ["#1d1d21","#474f52","#9d9d97","#f9fffe","#b02e26","#f9801d","#fed83d","#80c71f","#5e7c16","#169c9c","#3ab3da","#3c44aa","#8932b8","#c74ebd","#f38baa","#835432"];
const ID_RX = /^[a-z][a-z0-9_]{0,39}$/;
const codeOf = t => String(t || "").toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "").slice(0, 40);
const rarCol = r => (RARITY.find(x => x[0] === r) || RARITY[0])[2];
const b64 = t => { let s = ""; new TextEncoder().encode(t).forEach(c => s += String.fromCharCode(c)); return btoa(s); };

/* ---------- talking to the computer ---------- */
async function load(){
  try { const r = await H.api("/api/studio"); if (r.status === 401) return H.lock(); S.world = await r.json(); }
  catch(e){ S.world = { version:1, items:[] }; S.err = "הסטודיו עובד רק כשפותחים את הדף מ־Minecraft בתפריט Start."; }
  S.world.items = Array.isArray(S.world.items) ? S.world.items : [];
  S.world.world = S.world.world || {};
  if (S.sel < 0 && S.world.items.length) S.sel = 0;
  S.loaded = true;
}
let saveT = null;
function save(){ clearTimeout(saveT); S.msg = "שומר..."; paintStatus(); saveT = setTimeout(doSave, 600); }
async function doSave(){
  try {
    const r = await H.api("/api/studio-save", { method:"POST", body: b64(JSON.stringify(S.world)) });
    if (r.status === 401) return H.lock();
    const j = await r.json(); S.msg = j.ok ? "נשמר" : ""; S.err = j.ok ? "" : j.result;
  } catch(e){ S.msg = ""; S.err = "לא נשמר. פותחים את הדף מ־Minecraft בתפריט Start."; }
  paintStatus();
}
let picT = null;
function savePicture(it){
  clearTimeout(picT);
  picT = setTimeout(async () => {
    if (!ID_RX.test(it.id || "") || !(it.px || []).some(Boolean)) return;
    const c = document.createElement("canvas"); c.width = c.height = 16; drawPx(c, it.px);
    try { await H.api("/api/save-picture", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ id: it.id, png: c.toDataURL("image/png").split(",")[1] }) }); } catch(e){}
  }, 700);
}

/* ---------- drawing ---------- */
function drawPx(cv, px, scale){
  const g = cv.getContext("2d"), k = scale || 1; g.clearRect(0, 0, cv.width, cv.height);
  (px || []).forEach((c, i) => { if (c){ g.fillStyle = c; g.fillRect((i % 16) * k, Math.floor(i / 16) * k, k, k); } });
}
const thumb = (it, size) => `<canvas class="st-th" width="16" height="16" data-px="${esc(JSON.stringify(it.px || []))}" style="width:${size}px;height:${size}px"></canvas>`;
function paintThumbs(root){ root.querySelectorAll("canvas[data-px]").forEach(c => { try { drawPx(c, JSON.parse(c.dataset.px)); } catch(e){} }); }

/* ---------- the page ---------- */
function render(app){
  if (window.STUDIO_BLOCKS) window.STUDIO_BLOCKS.unmount();
  if (!S.loaded){ app.innerHTML = `<div class="wrap"><p>טוען...</p></div>`; load().then(() => render(app)); return; }
  const items = S.world.items, it = items[S.sel];
  app.innerHTML = `<div class="wrap studio">
    <div class="top"><div class="brand"><h1>הסטודיו</h1><p>העולם שלכם, בלי קוד</p></div>
      <div class="tools"><a class="btn ghost" href="#home">→ לקורס</a>${H.langBtn ? H.langBtn() : ""}</div></div>
    <div id="dock"></div>
    <div class="st-world"><label for="st-wname">שם העולם שלכם</label><input id="st-wname" maxlength="40" value="${esc(S.world.world.name || "")}" placeholder="למשל: עיר הדבורים"><small>מופיע במשחק, בלשונית של מצב יצירה.</small></div>
    <nav class="st-tabs" aria-label="חלקי העולם"><button class="on">חפצים</button><button disabled>יצורים <small>בקרוב</small></button><button disabled>חוקים <small>בקרוב</small></button><button disabled>מקומות <small>בקרוב</small></button></nav>
    <div class="st-main">
      <aside class="st-list"><h2>החפצים שלי</h2>
        <div class="st-cards">${items.map((x, i) => `<button class="st-card ${i === S.sel ? "on" : ""}" data-sel="${i}">${thumb(x, 40)}<span style="--rc:${rarCol(x.rarity)}">${esc(x.name || "בלי שם")}</span></button>`).join("")}</div>
        <button class="btn go" id="st-new">+ חפץ חדש</button>
        ${H.LS.get("itemcard", null) && (H.LS.get("itemcard", {}).name) ? `<button class="btn ghost" id="st-fromcard">מכרטיס החפץ שכתבתם</button>` : ""}
      </aside>
      <section class="st-edit">${it ? editor(it) : `<div class="st-empty"><h2>עוד אין חפצים</h2><p>לוחצים על ״חפץ חדש״, וממציאים את החפץ הראשון של העולם שלכם.</p></div>`}</section>
    </div>
    <div class="st-status" id="st-status" role="status"></div>
  </div>`;
  bind(app); paintThumbs(app); paintStatus();
  const blk = app.querySelector("#st-blk");
  if (blk && it && window.STUDIO_BLOCKS) window.STUDIO_BLOCKS.mount(blk, it, save);
  if (H.afterRender) H.afterRender();
}
function editor(it){
  return `<div class="st-grid">
    <div class="st-paint">
      <h3>הציור, 16 על 16</h3>
      <canvas id="st-c" width="320" height="320" aria-label="לוח ציור 16 על 16"></canvas>
      <div class="st-pal">${COLORS.map(c => `<button data-col="${c}" style="background:${c}" class="${c === S.color ? "on" : ""}" aria-label="צבע"></button>`).join("")}<input type="color" id="st-cc" value="#ff66aa" aria-label="צבע משלכם"></div>
      <div class="st-tools">${[["pen","עיפרון"],["erase","מחק"],["fill","דלי"]].map(([k, t]) => `<button class="btn ghost ${S.tool === k ? "on" : ""}" data-tool="${k}">${t}</button>`).join("")}<button class="btn ghost" id="st-undo">צעד אחורה</button><button class="btn ghost" id="st-clear">לנקות</button></div>
      <small>לחיצה ימנית מוחקת. קו מתאר כהה, ושניים עד ארבעה צבעים.</small>
    </div>
    <div class="st-fields">
      <div class="st-prev"><div class="tip"><b id="pv-n" style="color:${rarCol(it.rarity)}">${esc(it.name || "?")}</b><span id="pv-l">${esc(it.lore || "")}</span></div><div class="sl"><canvas id="pv-c" width="16" height="16"></canvas></div><small>ככה זה ייראה במשחק</small></div>
      <label>השם במשחק<input data-f="name" maxlength="40" value="${esc(it.name || "")}" placeholder="למשל: מטבע דבש"></label>
      <label>המשפט מתחת לשם<input data-f="lore" maxlength="80" value="${esc(it.lore || "")}" placeholder="למשל: הדבורים מקבלות רק אותו."></label>
      <label>הקוד באנגלית<input data-f="id" dir="ltr" maxlength="40" value="${esc(it.id || "")}" placeholder="honey_coin"><small>אותיות קטנות, בלי רווחים. ככה המשחק מכיר את החפץ.</small></label>
      <div class="st-row"><span>כמה בערימה</span><div class="chs">${[1,16,64].map(n => `<button data-stack="${n}" class="${+it.stack === n ? "on" : ""}">${n}</button>`).join("")}</div><input data-f="stack" type="number" min="1" max="64" value="${+it.stack || 64}" dir="ltr"></div>
      <div class="st-row"><span>כמה נדיר</span><div class="chs">${RARITY.map(([k, t, c]) => `<button data-rar="${k}" class="${(it.rarity || "common") === k ? "on" : ""}" style="--rc:${c}"><i></i>${t}</button>`).join("")}</div></div>
      <details class="st-more" ${it.job || it.price || it.where ? "open" : ""}><summary>בשביל מה, המחיר, ואיפה משיגים <small>נכנס למשחק בשיעור הבא</small></summary>
        <label>בשביל מה הוא?<input data-f="job" maxlength="120" value="${esc(it.job || "")}"></label>
        <label>המחיר שלו<input data-f="price" maxlength="120" value="${esc(it.price || "")}"></label>
        <label>איפה משיגים אותו?<input data-f="where" maxlength="120" value="${esc(it.where || "")}"></label></details>
      <div class="st-acts"><button class="btn go" id="st-play">לשחק עם השינויים</button><button class="btn ghost" id="st-del">למחוק את החפץ</button></div>
    </div>
  </div>
  <div class="st-blocks"><h3>מה החפץ עושה?</h3><p>גוררים קוביות מהתפריט: קודם ״מתי״, ובתוכה מה קורה. אל תשכחו מחיר.</p><div id="st-blk"></div>
    <div class="st-acts"><button class="btn ghost" id="st-blk2g">להעתיק את הקוביות לג׳מיני</button><small>ג׳מיני יגיד מה טוב, מה אפשר לשפר, וישלח גרסה משופרת. אתם מחליטים אם לקחת אותה.</small></div></div>
  <div class="st-gem"><h3>ג׳מיני, שותף לעיצוב</h3>
    <ol><li><button class="btn ghost" id="st-tog">להעתיק לג׳מיני</button> ובג׳מיני לוחצים <kbd>Ctrl</kbd> + <kbd>V</kbd>. מתחת כותבים מה אתם רוצים: רעיון, שאלה, או שינוי.</li>
    <li>ג׳מיני הציע שינוי? מעתיקים את כל התשובה שלו, ולוחצים <button class="btn ghost" id="st-fromg">הדבקה מג׳מיני</button></li></ol>
    <div id="st-sugg">${S.sugg ? suggestion() : ""}</div></div>`;
}
function paintStatus(){ const el = document.getElementById("st-status"); if (!el) return; el.className = "st-status" + (S.err ? " bad" : ""); el.textContent = S.err || S.msg; }

/* ---------- behaviour ---------- */
function bind(app){
  const items = S.world.items;
  app.querySelectorAll("[data-sel]").forEach(b => b.addEventListener("click", () => { S.sel = +b.dataset.sel; S.undo = []; S.sugg = null; render(app); }));
  app.querySelector("#st-new").addEventListener("click", () => { items.push({ id:"", name:"", lore:"", stack:64, rarity:"common", px:[] }); S.sel = items.length - 1; S.undo = []; save(); render(app); });
  const fc = app.querySelector("#st-fromcard");
  if (fc) fc.addEventListener("click", () => { const v = H.LS.get("itemcard", {}); items.push({ id: codeOf(v.code), name: v.name || "", lore: v.line || "", stack: Math.max(1, Math.min(64, parseInt(v.stack, 10) || 64)), rarity:"common", job: v.use || "", price: v.cost || "", where: v.where || "", px:[] }); S.sel = items.length - 1; save(); render(app); });
  const wn = app.querySelector("#st-wname");
  wn.addEventListener("input", () => { S.world.world.name = wn.value.trim(); save(); });
  const it = items[S.sel]; if (!it) return;
  // fields
  app.querySelectorAll("[data-f]").forEach(inp => inp.addEventListener("input", () => {
    const f = inp.dataset.f;
    if (f === "id"){ const v = codeOf(inp.value); if (v !== inp.value) inp.value = v; const old = it.id; it.id = v; if (old !== v) savePicture(it); }
    else if (f === "stack"){ it.stack = Math.max(1, Math.min(64, parseInt(inp.value, 10) || 1)); app.querySelectorAll("[data-stack]").forEach(b => b.classList.toggle("on", +b.dataset.stack === it.stack)); }
    else it[f] = inp.value;
    S.err = f === "id" && it.id && !ID_RX.test(it.id) ? "הקוד באנגלית מתחיל באות." : S.err;
    if (f === "name"){ const c = app.querySelector(`[data-sel="${S.sel}"] span`); if (c) c.textContent = it.name || "בלי שם"; }
    paintPreview(app, it); save();
  }));
  app.querySelectorAll("[data-stack]").forEach(b => b.addEventListener("click", () => { it.stack = +b.dataset.stack; app.querySelector('[data-f="stack"]').value = it.stack; app.querySelectorAll("[data-stack]").forEach(x => x.classList.toggle("on", x === b)); save(); }));
  app.querySelectorAll("[data-rar]").forEach(b => b.addEventListener("click", () => { it.rarity = b.dataset.rar; app.querySelectorAll("[data-rar]").forEach(x => x.classList.toggle("on", x === b)); paintPreview(app, it); const c = app.querySelector(`[data-sel="${S.sel}"] span`); if (c) c.style.setProperty("--rc", rarCol(it.rarity)); save(); }));
  app.querySelector("#st-del").addEventListener("click", () => { if (!confirm("למחוק את החפץ " + (it.name || "") + "?")) return; items.splice(S.sel, 1); S.sel = Math.min(S.sel, items.length - 1); save(); render(app); });
  app.querySelector("#st-play").addEventListener("click", async () => { clearTimeout(saveT); await doSave(); if (!S.err && H.act) H.act("play"); window.scrollTo(0, 0); });
  // painter
  const cv = app.querySelector("#st-c"), K = 20; it.px = Array.isArray(it.px) && it.px.length === 256 ? it.px : Array(256).fill("");
  const redraw = () => { const g = cv.getContext("2d"); g.clearRect(0, 0, 320, 320);
    for (let i = 0; i < 256; i++){ const x = i % 16, y = Math.floor(i / 16); g.fillStyle = (x + y) % 2 ? "#d9d9d9" : "#f2f2f2"; g.fillRect(x*K, y*K, K, K); if (it.px[i]){ g.fillStyle = it.px[i]; g.fillRect(x*K, y*K, K, K); } }
    g.strokeStyle = "rgba(0,0,0,.12)"; for (let i = 0; i <= 16; i++){ g.beginPath(); g.moveTo(i*K, 0); g.lineTo(i*K, 320); g.stroke(); g.beginPath(); g.moveTo(0, i*K); g.lineTo(320, i*K); g.stroke(); }
    paintPreview(app, it); const th = app.querySelector(`[data-sel="${S.sel}"] canvas`); if (th) drawPx(th, it.px); };
  const cell = e => { const r = cv.getBoundingClientRect(); const x = Math.floor((e.clientX - r.left) / r.width * 16), y = Math.floor((e.clientY - r.top) / r.height * 16); return x >= 0 && x < 16 && y >= 0 && y < 16 ? y * 16 + x : -1; };
  const fill = (i, col) => { const from = it.px[i]; if (from === col) return; const st = [i]; while (st.length){ const k = st.pop(); if (it.px[k] !== from) continue; it.px[k] = col; const x = k % 16; if (x > 0) st.push(k-1); if (x < 15) st.push(k+1); if (k >= 16) st.push(k-16); if (k < 240) st.push(k+16); } };
  let down = false, erase = false;
  const paint = e => { const i = cell(e); if (i < 0) return; const col = (erase || S.tool === "erase") ? "" : S.color;
    if (S.tool === "fill" && !erase){ fill(i, col); down = false; } else it.px[i] = col; redraw(); };
  cv.addEventListener("pointerdown", e => { S.undo.push(it.px.slice()); if (S.undo.length > 40) S.undo.shift(); down = true; erase = e.button === 2; cv.setPointerCapture(e.pointerId); paint(e); });
  cv.addEventListener("pointermove", e => { if (down) paint(e); });
  cv.addEventListener("pointerup", () => { if (!down && S.tool !== "fill") return; down = false; save(); savePicture(it); });
  cv.addEventListener("contextmenu", e => e.preventDefault());
  app.querySelectorAll("[data-col]").forEach(b => b.addEventListener("click", () => { S.color = b.dataset.col; if (S.tool === "erase") S.tool = "pen"; app.querySelectorAll("[data-col]").forEach(x => x.classList.toggle("on", x === b)); app.querySelectorAll("[data-tool]").forEach(x => x.classList.toggle("on", x.dataset.tool === S.tool)); }));
  app.querySelector("#st-cc").addEventListener("input", e => { S.color = e.target.value; app.querySelectorAll("[data-col]").forEach(x => x.classList.remove("on")); });
  app.querySelectorAll("[data-tool]").forEach(b => b.addEventListener("click", () => { S.tool = b.dataset.tool; app.querySelectorAll("[data-tool]").forEach(x => x.classList.toggle("on", x === b)); }));
  app.querySelector("#st-undo").addEventListener("click", () => { if (S.undo.length){ it.px = S.undo.pop(); redraw(); save(); savePicture(it); } });
  app.querySelector("#st-clear").addEventListener("click", () => { S.undo.push(it.px.slice()); it.px = Array(256).fill(""); redraw(); save(); });
  redraw();
  // Gemini
  app.querySelector("#st-tog").addEventListener("click", async () => {
    try { await H.api("/api/copy-text", { method:"POST", body: b64(geminiText(it)) }); S.msg = "הועתק. בג׳מיני לוחצים Ctrl + V, ומתחת כותבים מה אתם רוצים."; S.err = ""; } catch(e){ S.err = "לא הועתק. נסו שוב."; }
    paintStatus();
  });
  const b2g = app.querySelector("#st-blk2g");
  if (b2g) b2g.addEventListener("click", async () => {
    if (!it.power){ S.err = "עוד אין קוביות. קודם בונים, אחר כך משפרים עם ג׳מיני."; paintStatus(); return; }
    try { await H.api("/api/copy-text", { method:"POST", body: b64(blocksText(it)) }); S.msg = "הקוביות הועתקו. בג׳מיני לוחצים Ctrl + V ושולחים. אחר כך מעתיקים את כל התשובה ולוחצים ״הדבקה מג׳מיני״."; S.err = ""; } catch(e){ S.err = "לא הועתק. נסו שוב."; }
    paintStatus();
  });
  app.querySelector("#st-fromg").addEventListener("click", async () => {
    let text = ""; try { text = (await (await H.api("/api/clip")).json()).text || ""; } catch(e){}
    const r = /```\s*blocks/i.test(text) ? parseBlocks(text, it) : parseSuggestion(text);
    if (r.error){ S.sugg = null; S.err = r.error; paintStatus(); app.querySelector("#st-sugg").innerHTML = ""; return; }
    S.sugg = r; S.err = ""; S.msg = ""; paintStatus();
    const box = app.querySelector("#st-sugg"); box.innerHTML = suggestion(); bindSuggestion(app);
  });
  bindSuggestion(app);
}
function paintPreview(app, it){
  const n = app.querySelector("#pv-n"), l = app.querySelector("#pv-l"), c = app.querySelector("#pv-c");
  if (n){ n.textContent = it.name || "?"; n.style.color = rarCol(it.rarity); } if (l) l.textContent = it.lore || ""; if (c) drawPx(c, it.px);
}

/* ---------- Gemini: what we send, and what we accept back ---------- */
const RULES = `RULES FOR THIS CHAT. Follow them for every answer in this chat.
You are the design partner of a kid (11-13, Israel) who is building their own Minecraft world in our course's studio. The studio has no code: the kid designs, the studio builds. Answer in short, simple Hebrew. If the kid writes in English, answer in simple English.

WHAT YOU DO
- Help the kid THINK about their design: ask one good question at a time ("למה שחקן ירצה את זה?", "מה המחיר שלו?", "מה קורה אם...?") and point out problems.
- The ideas belong to the kid. Never invent names, stories, lines, pictures or powers for them, even if they ask. Say kindly that this part is theirs, and ask a question that helps them decide.
- Never write Java or any other code. The studio does the building.

WHEN THE KID ASKS FOR A CHANGE
Only when the kid clearly asked you to change something in their design, add ONE block like this at the end of your answer, and say in one Hebrew sentence what it changes:
\`\`\`studio
{"items":[{"id":"honey_coin","stack":16}]}
\`\`\`
- "items" is a list. Each entry needs "id" (the item's code) and only the fields that change.
- Fields: id (lowercase English letters, digits, _ ; starts with a letter), name (the name in the game, up to 40 characters), lore (the line under the name, up to 80 characters), stack (1-64), rarity ("common", "uncommon", "rare" or "epic"), job, price, where (the kid's design notes).
- A new item needs id and name. Use the kid's own words for name and lore.
- Powers (what an item DOES) are not in the JSON: the kid builds them from logic blocks in the studio. If the kid asks for a power, never send it in the block. Explain in Hebrew which blocks to drag and in what order, using only the blocks listed under "THE LOGIC BLOCKS", and ask what the price of the power should be.
- Never send pictures. The kid draws them in the studio.

THE LOGIC BLOCKS (the only ones that exist; names as the kid sees them)
@@BLOCKS@@

THE KID'S WORLD
It comes right after these rules, as JSON (under "===== העולם שלי ====="), then what the kid wants (under "===== מה אני רוצה =====").`;
const BLOCK_RULES = `RULES FOR THIS CHAT. Follow them for every answer in this chat.
A kid (11-13, Israel) built a power for a Minecraft item from logic blocks in our course's studio. There is no code: the blocks run inside the game. Below are the kid's blocks as readable lines and as a program (JSON). Answer in short, simple Hebrew (simple English if the kid writes in English).

YOUR JOB: review it like a friendly game designer.
1. One sentence on what is good about it.
2. Up to two improvements, about game design: is there a price? Is it too strong or too weak? Does the player get a clear sign that something happened? Is there a surprise?
3. Then send ONE improved version as a block, and list in Hebrew, line by line, what you changed and why:
\`\`\`blocks
{"on":{"use":[...]}}
\`\`\`
Keep the kid's idea. Change as little as needed. Never invent a new story or name: those belong to the kid.

THE PROGRAM FORMAT (the only things that exist)
{"on":{"use":[steps],"hit":[steps],"hold":[steps]}}   use = right-click with the item, hit = hitting a creature, hold = every second in the hand
Steps:
{"a":"effect","e":EFFECT,"who":"me"|"target","s":seconds 1-120,"l":strength 1-5}
{"a":"heal","who":...,"n":hearts 1-20}   {"a":"damage","who":...,"n":hearts 1-25}   {"a":"fire","who":...,"s":seconds 1-30}
{"a":"lightning","who":...}   {"a":"explode","who":...,"p":power 1-6,"brk":true|false}   {"a":"launch","who":...,"p":1-5}   {"a":"push","who":...,"p":1-5}
{"a":"tp","n":blocks forward 1-30}   {"a":"spawn","m":MOB,"who":...,"n":1-5}   {"a":"sound","snd":SOUND}   {"a":"msg","t":"text up to 80 characters"}
Price: {"a":"cooldown","s":seconds 1-120}   {"a":"consume"}   {"a":"hunger","n":food 1-20}
{"if":COND,"then":[steps],"else":[steps]}   {"repeat":1-10,"do":[steps]}
COND: {"c":"night"} {"c":"day"} {"c":"rain"} {"c":"sneak"} {"c":"chance","p":1-100} {"c":"health","n":hearts} {"c":"target","m":MOB} {"c":"dim","d":"overworld"|"nether"|"end"} {"and":[COND,COND]} {"or":[COND,COND]} {"not":COND}
"target" (the creature that was hit) exists only inside "hit".
EFFECT: @@E@@
MOB: @@M@@
SOUND: @@S@@`;
function blocksText(it){
  const B = window.STUDIO_BLOCKS, L = B.LISTS;
  const rules = BLOCK_RULES.replace("@@E@@", L.E.map(x => x[2]).join(", ")).replace("@@M@@", L.M.map(x => x[2]).join(", ")).replace("@@S@@", L.SND.map(x => x[2]).join(", "));
  return rules + "\n\n===== החפץ =====\n" + (it.name || "") + (it.lore ? " (" + it.lore + ")" : "") + (it.job ? "\nבשביל מה: " + it.job : "") + (it.price ? "\nהמחיר שתכננתי: " + it.price : "")
    + "\n\n===== הקוביות שלי =====\n" + B.readable(it.power).join("\n") + "\n\n===== התוכנית (JSON) =====\n" + JSON.stringify(it.power)
    + "\n\n===== מה אני רוצה =====\nאיך אפשר לשפר את הכוח הזה?\n";
}
function blockList(){
  const B = window.STUDIO_BLOCKS; if (!B) return "";
  const cat = { when:"מתי", do:"עושים", price:"מחיר", if:"אם וחזרה", q:"שאלות" };
  return B.DEFS.map(d => "- [" + cat[d[4]] + "] " + d[1].replace(/%\d/g, "___")).join("\n");
}
function geminiText(it){
  const w = { world: S.world.world, items: S.world.items.map(x => ({ id:x.id, name:x.name, lore:x.lore, stack:x.stack, rarity:x.rarity, job:x.job, price:x.price, where:x.where, power: x.power ? x.power.on : "none yet", picture: (x.px || []).some(Boolean) ? "drawn" : "none yet" })) };
  return RULES.replace("@@BLOCKS@@", blockList()) + "\n\n===== העולם שלי =====\n" + JSON.stringify(w, null, 1) + "\n\n===== החפץ שאני עובד עליו =====\n" + (it.id || it.name || "") + "\n\n===== מה אני רוצה =====\n";
}
const FIELDS = { id:"קוד", name:"שם", lore:"משפט", stack:"בערימה", rarity:"נדירות", job:"בשביל מה", price:"מחיר", where:"איפה משיגים" };
function parseSuggestion(text){
  if (!text || !text.trim()) return { error:"עוד לא העתקתם את התשובה של ג׳מיני. בג׳מיני לוחצים על כפתור ההעתקה שמתחת לתשובה." };
  let raw = null;
  const m = text.match(/```\s*studio\s*([\s\S]*?)```/i) || text.match(/```\s*(?:json)?\s*(\{[\s\S]*?"items"[\s\S]*?\})\s*```/i);
  if (m) raw = m[1]; else { const a = text.indexOf("{"), b = text.lastIndexOf("}"); if (a >= 0 && b > a && /"items"/.test(text.slice(a, b))) raw = text.slice(a, b + 1); }
  if (!raw) return { error:"בתשובה של ג׳מיני אין שינוי לעיצוב. אם רציתם שינוי, כתבו לו: ״תשלח את השינוי בבלוק studio״." };
  let j; try { j = JSON.parse(raw); } catch(e){ return { error:"ג׳מיני שלח שינוי שבור. כתבו לו: ״הבלוק שלך לא תקין, תשלח אותו שוב״." }; }
  const list = Array.isArray(j.items) ? j.items : [];
  const out = [];
  for (const e of list){
    if (!e || typeof e !== "object") continue;
    const id = codeOf(e.id);
    if (!ID_RX.test(id)) return { error:"ג׳מיני שלח קוד לא תקין לחפץ. כתבו לו: ״הקוד צריך להיות באותיות קטנות באנגלית״." };
    const cur = S.world.items.find(x => x.id === id);
    const ch = {};
    if (typeof e.name === "string") ch.name = e.name.slice(0, 40);
    if (typeof e.lore === "string") ch.lore = e.lore.slice(0, 80);
    if (e.stack !== undefined){ const n = parseInt(e.stack, 10); if (n >= 1 && n <= 64) ch.stack = n; }
    if (typeof e.rarity === "string" && RARITY.some(r => r[0] === e.rarity)) ch.rarity = e.rarity;
    ["job","price","where"].forEach(k => { if (typeof e[k] === "string") ch[k] = e[k].slice(0, 120); });
    if (!cur && !ch.name) continue;
    if (Object.keys(ch).length) out.push({ id, isNew: !cur, ch, cur });
  }
  if (!out.length) return { error:"ג׳מיני לא שלח שום שינוי שהסטודיו מכיר." };
  return { changes: out };
}
const show = (k, v) => k === "rarity" ? (RARITY.find(r => r[0] === v) || [0, v])[1] : v;
function parseBlocks(text, it){
  const m = text.match(/```\s*blocks\s*([\s\S]*?)```/i);
  let j; try { j = JSON.parse(m[1]); } catch(e){ return { error:"ג׳מיני שלח קוביות שבורות. כתבו לו: ״הבלוק שלך לא תקין, תשלח אותו שוב״." }; }
  const B = window.STUDIO_BLOCKS, r = B.toBlocks(j);
  if (r.error){ const what = String(r.error).split(":")[0];
    return { error: { mob:"ג׳מיני השתמש ביצור שאין בסטודיו.", effect:"ג׳מיני השתמש באפקט שאין בסטודיו.", sound:"ג׳מיני השתמש בצליל שאין בסטודיו.", act:"ג׳מיני המציא קובייה שלא קיימת." }[what] || "ג׳מיני שלח קוביות שהסטודיו לא מכיר. כתבו לו: ״תשתמש רק בקוביות מהרשימה״." }; }
  return { program: j, before: B.readable(it.power), after: B.readable(j) };
}
function suggestion(){
  if (S.sugg.program) return `<div class="st-sg"><b>ג׳מיני מציע גרסה משופרת לקוביות:</b>
    <div class="sg-ba"><div><small>עכשיו</small><pre>${esc(S.sugg.before.join("\n") || "—")}</pre></div><div><small>אחרי</small><pre>${esc(S.sugg.after.join("\n"))}</pre></div></div>
    <div class="st-acts"><button class="btn go" id="sg-ok">לקבל</button><button class="btn ghost" id="sg-no">לא, תודה</button></div></div>`;
  return `<div class="st-sg"><b>ג׳מיני מציע:</b>${S.sugg.changes.map(c => `<div class="sg-it"><span class="sg-h">${c.isNew ? "חפץ חדש: " : ""}${esc((c.cur && c.cur.name) || c.ch.name || c.id)}</span><ul>${Object.keys(c.ch).map(k => `<li><span>${FIELDS[k] || k}</span>${c.cur && c.cur[k] !== undefined && c.cur[k] !== "" ? `<s>${esc(show(k, c.cur[k]))}</s> ← ` : ""}<b>${esc(show(k, c.ch[k]))}</b></li>`).join("")}</ul></div>`).join("")}
    <div class="st-acts"><button class="btn go" id="sg-ok">לקבל</button><button class="btn ghost" id="sg-no">לא, תודה</button></div></div>`;
}
function bindSuggestion(app){
  const ok = app.querySelector("#sg-ok"), no = app.querySelector("#sg-no"); if (!ok) return;
  ok.addEventListener("click", () => {
    if (S.sugg.program){ const it = S.world.items[S.sel]; window.STUDIO_BLOCKS.loadInto(it, S.sugg.program); S.sugg = null; S.msg = "הקוביות של ג׳מיני נכנסו. אפשר לשנות אותן, ולהחזיר ב״גרסאות״."; save(); render(app); return; }
    S.sugg.changes.forEach(c => { if (c.isNew) S.world.items.push(Object.assign({ id:c.id, name:"", lore:"", stack:64, rarity:"common", px:[] }, c.ch)); else Object.assign(c.cur, c.ch); });
    S.sugg = null; S.msg = "השינוי נכנס לעיצוב."; save(); render(app); });
  no.addEventListener("click", () => { S.sugg = null; app.querySelector("#st-sugg").innerHTML = ""; });
}

/* ---------- styles ---------- */
const CSS = `
.studio .st-world{display:grid;grid-template-columns:auto 1fr;gap:6px 12px;align-items:center;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:12px 14px;margin-top:14px}
.studio .st-world input{font:inherit;font-size:1.15rem;font-weight:700;padding:6px 10px;border:2px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink)}
.studio .st-world small{grid-column:2;color:var(--muted)}
.studio .st-tabs{display:flex;gap:6px;margin-top:14px;flex-wrap:wrap}
.studio .st-tabs button{font:inherit;font-weight:800;padding:8px 16px;border:2px solid var(--ink);border-radius:8px 8px 0 0;background:var(--surface);color:var(--ink)}
.studio .st-tabs button.on{background:var(--grass);color:var(--grass-ink);border-color:var(--grass)}
.studio .st-tabs button[disabled]{opacity:.45}
.studio .st-tabs small{font-weight:400}
.studio .st-main{display:grid;grid-template-columns:230px 1fr;gap:14px;background:var(--surface);border:2px solid var(--grass);border-radius:0 8px 8px 8px;padding:14px}
.studio .st-list{display:grid;gap:10px;align-content:start}
.studio .st-list h2{font-size:1.2rem}
.studio .st-cards{display:grid;gap:6px}
.studio .st-card{display:flex;gap:10px;align-items:center;text-align:start;font:inherit;font-weight:700;padding:6px 8px;border:2px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink);cursor:pointer}
.studio .st-card.on{border-color:var(--grass);background:var(--grass-soft)}
.studio .st-card span::before{content:"";display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--rc);border:1px solid var(--ink);margin-inline-end:6px}
.studio .st-th{image-rendering:pixelated;background:#8B8B8B;border:2px solid;border-color:#373737 #fff #fff #373737;flex:none}
.studio .st-empty{display:grid;place-content:center;text-align:center;min-height:300px;color:var(--muted)}
.studio .st-grid{display:grid;grid-template-columns:auto 1fr;gap:18px}
.studio .st-paint{display:grid;gap:8px;justify-items:center;align-content:start}
.studio .st-paint h3,.studio .st-gem h3{font-size:1.1rem}
.studio #st-c{width:320px;height:320px;max-width:80vw;max-height:80vw;border:3px solid var(--ink);touch-action:none;cursor:crosshair;image-rendering:pixelated}
.studio .st-pal{display:grid;grid-template-columns:repeat(9,28px);gap:4px}
.studio .st-pal button{width:28px;height:28px;border:2px solid var(--ink);border-radius:4px;cursor:pointer;padding:0}
.studio .st-pal button.on{outline:3px solid var(--grass);outline-offset:1px}
.studio .st-pal input{width:28px;height:28px;padding:0;border:2px solid var(--ink);border-radius:4px}
.studio .st-tools{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.studio .st-tools .btn.on{background:var(--grass-soft);border-color:var(--grass)}
.studio .st-paint small{color:var(--muted)}
.studio .st-fields{display:grid;gap:12px;align-content:start}
.studio .st-fields label{display:grid;gap:4px;font-weight:700}
.studio .st-fields input{font:inherit;font-weight:400;padding:8px 10px;border:2px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink)}
.studio .st-fields input:focus{border-color:var(--grass);outline:none}
.studio .st-fields label small{font-weight:400;color:var(--muted)}
.studio .st-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-weight:700}
.studio .st-row input{width:80px}
.studio .chs{display:flex;gap:6px;flex-wrap:wrap}
.studio .chs button{font:inherit;font-weight:800;padding:.3em .9em;border:2px solid var(--ink);border-radius:999px;background:var(--surface);color:var(--ink);cursor:pointer}
.studio .chs button.on{background:var(--grass);color:var(--grass-ink);border-color:var(--grass)}
.studio .chs button i{display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--rc);border:1px solid var(--ink);margin-inline-end:6px}
.studio .st-prev{display:flex;gap:14px;align-items:center;flex-wrap:wrap;background:#3a3a3a;border-radius:8px;padding:12px}
.studio .st-prev small{color:#ddd;flex-basis:100%}
.studio .st-prev .tip{font-size:1.15rem}
.studio .st-prev .sl{width:64px;height:64px;background:#8B8B8B;border:3px solid;border-color:#373737 #fff #fff #373737;padding:6px;display:grid}
.studio .st-prev canvas{width:100%;height:100%;image-rendering:pixelated}
.studio .st-more{border:1px dashed var(--line);border-radius:6px;padding:8px 10px}
.studio .st-more summary{cursor:pointer;font-weight:700}
.studio .st-more summary small{font-weight:400;color:var(--muted)}
.studio .st-more label{margin-top:8px}
.studio .st-power{display:grid;gap:2px;background:var(--xp-soft);border-radius:6px;padding:10px 12px}
.studio .st-power span{color:var(--muted)}
.studio .st-acts{display:flex;gap:10px;flex-wrap:wrap}
.studio .st-blocks{margin-top:16px;display:grid;gap:6px}
.studio .st-blocks p{margin:0;color:var(--muted)}
.studio #st-blk{height:440px;border:2px solid var(--line);border-radius:8px;overflow:hidden;direction:ltr}
.studio .st-noblk{padding:16px;color:var(--red)}
.studio .st-gem{margin-top:16px;border-top:1px solid var(--line);padding-top:12px;display:grid;gap:8px}
.studio .st-gem ol{margin:0;display:grid;gap:10px;padding-inline-start:22px}
.studio .st-sg{border:3px solid var(--sky);border-radius:8px;padding:12px;display:grid;gap:8px;background:var(--sky-soft)}
.studio .sg-h{font-weight:800}
.studio .sg-ba{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.studio .sg-ba pre{margin:4px 0 0;white-space:pre-wrap;background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:8px;font-family:var(--body);font-size:.95rem;line-height:1.5}
.studio .st-blocks .st-acts{align-items:center}
.studio .st-blocks .st-acts small{color:var(--muted)}
.studio .st-sg ul{margin:4px 0 0;padding-inline-start:20px}
.studio .st-sg li span{color:var(--muted);margin-inline-end:8px}
.studio .st-sg s{color:var(--muted)}
.studio .st-status{position:sticky;bottom:0;margin-top:12px;min-height:1.6em;font-weight:700;color:var(--grass);background:var(--bg);padding:6px 0}
.studio .st-status.bad{color:var(--red)}
.studio .tip{background:rgba(16,0,16,.94);border:3px solid;border-image:linear-gradient(#5000FF,#28007F) 1;padding:.35em .7em;display:grid;gap:.1em;text-align:start;color:#fff}
.studio .tip b{font-family:var(--display);font-weight:400}
.studio .tip span{color:#AAAAAA}
@media (max-width:900px){.studio .st-main{grid-template-columns:1fr}.studio .st-grid{grid-template-columns:1fr}}
`;
window.STUDIO = { render, CSS, reset: () => { S.loaded = false; S.sel = -1; S.sugg = null; } };
})();
