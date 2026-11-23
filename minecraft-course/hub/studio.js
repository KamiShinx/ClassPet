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
  // Every item gets an English code by itself; kids never have to invent one.
  let fixed = false;
  S.world.items.forEach(it => { if (!it.id){ it.id = nextId(); fixed = true; } });
  if (fixed) save();
  if (S.sel < 0 && S.world.items.length) S.sel = 0;
  S.loaded = true;
}
/* item_1, item_2...: the code the game knows an item by. Kept short and unique. */
function nextId(){ const used = new Set((S.world ? S.world.items : []).map(x => x.id)); let n = 1; while (used.has("item_" + n)) n++; return "item_" + n; }
let saveT = null;
function save(){ clearTimeout(saveT); S.dirty = true; S.msg = "שומר..."; paintStatus(); saveT = setTimeout(doSave, 600); }
/* Before the game builds: send whatever is still waiting to be saved. */
async function flush(){ clearTimeout(saveT); if (S.dirty) await doSave(); return !S.err; }
async function doSave(){
  S.dirty = false;
  try {
    const r = await H.api("/api/studio-save", { method:"POST", body: b64(JSON.stringify(S.world)) });
    if (r.status === 401) return H.lock();
    const j = await r.json(); S.msg = j.ok ? "נשמר" : "";
    // Clear only a saving problem: a message from another button stays until the kid changes something.
    if (j.ok){ if (S.saveErr){ S.err = ""; S.saveErr = false; } } else { S.err = j.result; S.saveErr = true; }
  } catch(e){ S.msg = ""; S.err = "לא נשמר. פותחים את הדף מ־Minecraft בתפריט Start."; S.saveErr = true; }
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

/* ---------- recipes: how the item is made in a Crafting Table ----------
   it.recipe = { g: 9 slots, left to right and top to bottom ("" = empty, else "minecraft:stick" or "myworld:item_2"),
   n: how many items one crafting makes, any: true when the order in the grid doesn't matter }.
   tools/common.ps1 writes it as a Minecraft recipe file before every Play, so a broken recipe can never break the build.
   Ingredients keep their English Minecraft names, as in the game. Pictures: hub\mc_<tex>.png (setup/update-hub.ps1). */
const ING = [
  ["חומרים פשוטים", [["stick","Stick"],["oak_planks","Oak Planks","block"],["oak_log","Oak Log","block"],["cobblestone","Cobblestone","block"],["sand","Sand","block"],["glass","Glass","block"],["string","String"],["feather","Feather"],["leather","Leather"],["paper","Paper"],["flint","Flint"],["bone","Bone"]]],
  ["מתכות ואבנים יקרות", [["coal","Coal"],["copper_ingot","Copper Ingot"],["iron_ingot","Iron Ingot"],["gold_ingot","Gold Ingot"],["redstone","Redstone Dust"],["lapis_lazuli","Lapis Lazuli"],["amethyst_shard","Amethyst Shard"],["emerald","Emerald"],["diamond","Diamond"],["netherite_ingot","Netherite Ingot"]]],
  ["מהטבע ומהיצורים", [["apple","Apple"],["wheat","Wheat"],["sugar","Sugar"],["egg","Egg"],["honeycomb","Honeycomb"],["slime_ball","Slimeball"],["gunpowder","Gunpowder"],["rotten_flesh","Rotten Flesh"],["spider_eye","Spider Eye"]]],
  ["נדירים", [["glowstone_dust","Glowstone Dust"],["blaze_rod","Blaze Rod"],["ender_pearl","Ender Pearl"],["ghast_tear","Ghast Tear"],["prismarine_shard","Prismarine Shard"],["phantom_membrane","Phantom Membrane"],["obsidian","Obsidian","block"],["echo_shard","Echo Shard"],["nether_star","Nether Star"]]]
];
const ING_BY = {}; ING.forEach(([, list]) => list.forEach(([id, name, kind]) => { ING_BY["minecraft:" + id] = { name, tex: (kind || "item") + "_" + id }; }));
/* Every Minecraft item: hub\mc_items.json = [id, English name, Hebrew name, picture number or -1, 1 if it's a block], and
   all the pictures in one sheet, mc_items.png (16 x 16 each, 40 to a row). setup/update-hub.ps1 reads both out of the
   installed game. Until they load (or on a computer without them) the menu is the short list above. */
let MC = null, mcHook = null;
const MC_ROW = 40;
const FOOD = new Set(("apple golden_apple enchanted_golden_apple melon_slice sweet_berries glow_berries chorus_fruit carrot golden_carrot potato baked_potato "
  + "poisonous_potato beetroot beetroot_soup dried_kelp beef cooked_beef porkchop cooked_porkchop mutton cooked_mutton chicken cooked_chicken rabbit "
  + "cooked_rabbit cod cooked_cod salmon cooked_salmon tropical_fish pufferfish bread cookie cake pumpkin_pie mushroom_stew rabbit_stew suspicious_stew "
  + "honey_bottle milk_bucket rotten_flesh spider_eye").split(" "));
const TOOL_RX = /(_sword|_pickaxe|_axe|_shovel|_hoe|_helmet|_chestplate|_leggings|_boots|_spear|_horse_armor|_nautilus_armor|_harness|bundle|_bucket|arrow|potion)$|^(bow|crossbow|trident|mace|shield|fishing_rod|shears|flint_and_steel|brush|spyglass|compass|recovery_compass|clock|elytra|wolf_armor|turtle_helmet|carrot_on_a_stick|warped_fungus_on_a_stick|lead|name_tag|saddle|totem_of_undying|wind_charge|fire_charge|snowball|ender_eye|bucket|map|filled_map|writable_book|written_book|goat_horn|firework_rocket|experience_bottle|trial_key|ominous_trial_key)$/;
const mcCat = (id, block) => /_spawn_egg$/.test(id) ? "egg" : FOOD.has(id) ? "food" : TOOL_RX.test(id) ? "tool" : block ? "block" : "mat";
const ING_TABS = [["fav","נפוצים"],["mat","חומרים"],["food","אוכל"],["tool","כלים, נשק ושריון"],["block","קוביות"],["egg","ביצי זימון"]];
fetch("mc_items.json").then(r => r.ok ? r.json() : null).then(list => {
  if (!Array.isArray(list) || !list.length) return;
  MC = list.map(([id, en, he, pic, block]) => ({ id, en: String(en || id), he: String(he || ""), pic: +pic, cat: mcCat(id, !!block), block: !!block }));
  MC.forEach(m => { const k = "minecraft:" + m.id; ING_BY[k] = Object.assign(ING_BY[k] || { name: m.en }, { he: m.he, pic: m.pic }); });
  if (mcHook) mcHook();
}).catch(() => {});
const ING_RX = /^(minecraft|myworld):[a-z0-9_]{1,40}$/;
const emptyRecipe = () => ({ g: Array(9).fill(""), n: 1, any: false });
const ownOf = code => code.startsWith("myworld:") ? S.world.items.find(x => x.id === code.slice(8)) || (S.world.blocks || []).find(x => x.id === code.slice(8)) : null;
const ingName = code => { const v = ING_BY[code]; if (v) return v.name; const o = ownOf(code); return o ? (o.name || "בלי שם") : code.replace(/^.*:/, ""); };
/* One ingredient's picture: the game's own texture, or the kid's drawing for their own items. */
function ingPic(code){
  const v = ING_BY[code];
  if (v && v.pic >= 0) return `<span class="rc-pic"><i class="mcs" style="--c:${v.pic % MC_ROW};--r:${Math.floor(v.pic / MC_ROW)}"></i></span>`;
  if (v && v.tex) return `<span class="rc-pic"><img src="mc_${v.tex}.png" alt="" onerror="this.nextElementSibling.hidden=false;this.remove()"><em hidden>${esc(v.name.slice(0, 3))}</em></span>`;
  if (v) return `<span class="rc-pic"><em>${esc(v.name.slice(0, 3))}</em></span>`;
  const o = ownOf(code);
  return o ? `<span class="rc-pic">${thumb(o, 32)}</span>` : `<span class="rc-pic"><em>?</em></span>`;
}
/* The ingredient menu: a search box, tabs like the game's Creative menu, and the items of the tab or the search. */
const ingBtn = code => { const v = ING_BY[code];
  return `<button class="rc-ing${S.ing === code ? " on" : ""}" data-ing="${code}" title="${esc(ingName(code) + (v && v.he ? " · " + v.he : ""))}">${ingPic(code)}<small>${esc(ingName(code))}</small></button>`; };
function ingList(){
  const q = (S.ingQ || "").trim().toLowerCase();
  if (q && MC){
    const qi = q.replace(/\s+/g, "_"), hits = MC.filter(m => m.id.includes(qi) || m.en.toLowerCase().includes(q) || m.he.includes(q));
    return hits.length ? hits.slice(0, 300).map(m => ingBtn("minecraft:" + m.id)).join("") : `<p class="rc-none">לא מצאנו את זה. אפשר לחפש באנגלית או בעברית.</p>`;
  }
  const tab = MC ? (S.ingTab || "fav") : "fav";
  if (tab === "fav") return ING.map(([t, list]) => `<div class="rc-grp"><b>${t}</b><div>${list.map(([id]) => ingBtn("minecraft:" + id)).join("")}</div></div>`).join("");
  return MC.filter(m => m.cat === tab).map(m => ingBtn("minecraft:" + m.id)).join("");
}
const ingTabs = () => MC ? ING_TABS.map(([k, t]) => `<button data-tab="${k}" class="${!S.ingQ && (S.ingTab || "fav") === k ? "on" : ""}">${t}</button>`).join("") : "";

/* What you need for one crafting, counted: "2 × Diamond, 1 × Stick". */
function needList(r){
  const n = {}; (r && r.g || []).forEach(c => { if (c) n[c] = (n[c] || 0) + 1; });
  return Object.keys(n).map(c => [n[c], c]);
}
function recipeLint(it){
  const r = it.recipe, out = [];
  if (!r || !r.g.some(Boolean)) return ["עוד אין מתכון, אז אי אפשר להכין את החפץ. במשחק לוקחים אותו רק מהתפריט של E."];
  if (r.g.includes("myworld:" + it.id)) out.push("חפץ לא יכול להיות חומר במתכון שלו. מחליפים אותו בחומר אחר.");
  r.g.forEach(c => { if (c.startsWith("myworld:") && !ownOf(c)) out.push("במתכון יש חפץ שכבר לא קיים. מוחקים אותו מהמשבצת."); });
  const same = S.world.items.find(x => x !== it && x.recipe && !!x.recipe.any === !!r.any && JSON.stringify(x.recipe.g) === JSON.stringify(r.g));
  if (same) out.push("לחפץ ״" + (same.name || same.id) + "״ יש בדיוק אותו מתכון. מחליפים חומר אחד, כדי שהמשחק ידע מה להכין.");
  return [...new Set(out)];
}
/* The Crafting Table as in the game: the 3 × 3 grid, an arrow, and the item that comes out. ro = look only. */
function recipeHTML(it, ro){
  const r = it.recipe || emptyRecipe(), need = needList(r);
  const grid = r.g.map((c, i) => `<button class="rc-slot${c ? " full" : ""}" ${ro ? "disabled" : `data-slot="${i}"`} aria-label="${c ? esc(ingName(c)) : "משבצת ריקה"}">${c ? ingPic(c) : ""}</button>`).join("");
  const out = `<div class="rc-outw"><small>מה יוצא</small><div class="rc-slot rc-res">${(it.px || []).some(Boolean) ? thumb(it, 40) : `<span class="rc-onm">${esc(it.name || "?")}</span>`}${r.n > 1 ? `<b>${r.n}</b>` : ""}</div></div>`;
  const whoRow = ro ? "" : `<div class="rc-who"><span>המתכון של:</span>${S.world.items.filter(x => ID_RX.test(x.id || "")).map(x => `<button data-rcw="${esc(x.id)}" class="${x === it ? "on" : ""}">${thumb(x, 20)}<span>${esc(x.name || "בלי שם")}</span></button>`).join("")}</div>`;
  let h = `<div class="rc${ro ? " ro" : ""}">${whoRow}<div class="rc-table"><div class="rc-grid">${grid}</div><span class="rc-arrow" aria-hidden="true">➜</span>${out}</div>
    <div class="rc-need">${need.length ? `<b>מה צריך:</b> ${need.map(([n, c]) => `<span>${n} × ${esc(ingName(c))}</span>`).join("")}<span class="rc-gets">יוצאים: ${r.n} × ${esc(it.name || "החפץ")}</span>` : `<b>עוד אין מתכון.</b>`}${r.any ? `<small>הסדר לא משנה</small>` : ""}</div>`;
  if (!ro){
    const mine = S.world.items.filter(x => x !== it && ID_RX.test(x.id || ""));
    h += `<div class="st-row"><span>כמה יוצאים</span><div class="chs">${[1,2,4,8].map(n => `<button data-rcn="${n}" class="${r.n === n ? "on" : ""}">${n}</button>`).join("")}</div>
        <label class="rc-any"><input type="checkbox" id="rc-any" ${r.any ? "checked" : ""}> הסדר לא משנה</label><button class="btn ghost" id="rc-clear">לנקות את המתכון</button></div>
      <ul class="st-lint rc-lint">${recipeLint(it).map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="rc-pal"><div class="rc-tools"><button class="rc-ing${S.ing === "" ? " on" : ""}" data-ing="" title="מחק"><span class="rc-pic rc-erase">✕</span><small>מחק</small></button>
          <input type="search" class="rc-q" placeholder="חיפוש: diamond, יהלום..." value="${esc(S.ingQ || "")}" ${MC ? "" : "hidden"}></div>
        <div class="rc-tabs">${ingTabs()}</div>
        <div class="rc-list">${ingList()}</div>
        ${mine.length ? `<div class="rc-grp"><b>החפצים שלכם</b><div>${mine.map(x => `<button class="rc-ing${S.ing === "myworld:" + x.id ? " on" : ""}" data-ing="myworld:${x.id}" title="${esc(x.name || x.id)}">${ingPic("myworld:" + x.id)}<small>${esc(x.name || "בלי שם")}</small></button>`).join("")}</div></div>` : ""}</div>`;
  }
  return h + `</div>`;
}
function bindRecipe(app, it){
  const box = app.querySelector(".rc:not(.ro)"); if (!box) return;
  const redo = () => { const r = it.recipe; if (r && !r.g.some(Boolean) && r.n === 1 && !r.any) delete it.recipe; save(); box.outerHTML = recipeHTML(it); paintThumbs(app); bindRecipe(app, it); };
  const rec = () => { if (!it.recipe) it.recipe = emptyRecipe(); return it.recipe; };
  // The menu: one listener for all its buttons, because the search and the tabs swap the list under it.
  const pal = box.querySelector(".rc-pal");
  const relist = () => { pal.querySelector(".rc-tabs").innerHTML = ingTabs(); pal.querySelector(".rc-list").innerHTML = ingList(); };
  pal.addEventListener("click", e => {
    const b = e.target.closest("[data-ing]");
    if (b){ S.ing = b.dataset.ing; pal.querySelectorAll("[data-ing].on").forEach(x => x.classList.remove("on")); b.classList.add("on"); return; }
    const t = e.target.closest("[data-tab]");
    if (t){ S.ingTab = t.dataset.tab; S.ingQ = ""; pal.querySelector(".rc-q").value = ""; relist(); pal.querySelector(".rc-list").scrollTop = 0; }
  });
  const q = pal.querySelector(".rc-q");
  q.addEventListener("input", () => { S.ingQ = q.value; relist(); });
  // The full list arrives a moment after the page: then show it, unless the kid is already typing.
  mcHook = () => { if (!document.body.contains(box) || document.activeElement === q) return; box.outerHTML = recipeHTML(it); paintThumbs(app); bindRecipe(app, it); };
  box.querySelectorAll("[data-slot]").forEach(b => {
    b.addEventListener("click", () => { const r = rec(), i = +b.dataset.slot; r.g[i] = (S.ing === undefined || S.ing === r.g[i]) ? "" : S.ing; redo(); });
    b.addEventListener("contextmenu", e => { e.preventDefault(); if (!it.recipe) return; it.recipe.g[+b.dataset.slot] = ""; redo(); });
  });
  box.querySelectorAll("[data-rcn]").forEach(b => b.addEventListener("click", () => { rec().n = +b.dataset.rcn; redo(); }));
  // Pick what comes out: a chip in "המתכון של", or one of the kid's items dropped on the result slot.
  box.querySelectorAll("[data-rcw]").forEach(b => b.addEventListener("click", () => recipeFor(app, b.dataset.rcw)));
  const res = box.querySelector(".rc-res");
  if (res) res.addEventListener("click", () => { if (S.ing && S.ing.startsWith("myworld:")){ const id = S.ing.slice(8); S.ing = undefined; recipeFor(app, id); } });
  const any = box.querySelector("#rc-any"); if (any) any.addEventListener("change", () => { rec().any = any.checked; redo(); });
  const cl = box.querySelector("#rc-clear"); if (cl) cl.addEventListener("click", () => { delete it.recipe; redo(); });
}

// Show the recipe of another of the kid's items, here and in the next lesson step.
function recipeFor(app, id){
  const j = S.world.items.findIndex(x => x.id === id); if (j < 0) return;
  S.sel = j; S.rcSel = id; S.undo = [];
  if (host && document.body.contains(host.el)){ host.opts = { tag: host.opts.tag, ready: host.opts.ready, parts: host.opts.origParts || host.opts.parts }; mountPart(host.el, host.opts); }
  else render(app);
}

/* ---------- my blocks and my dimension (lesson 5) ----------
   S.world.blocks = [{ id:"block_1", name, px, light: 0|7|15, hard: "soft"|"normal"|"hard", drop: "" (itself) or an item code, n }]
   S.world.dim = { name, shape, top, under, deep, fluid, sky, fog, time, gravity, ore: { b, rare, depth } | null, plants: [], nobed, nowater }
   tools/common.ps1 turns both into game files before every Play. A block the game doesn't know becomes stone there, so a
   design can never stop the world from opening. Kit.java and MyDimension.java do the rest (gravity, where you land). */
const blocksOf = () => (S.world.blocks = Array.isArray(S.world.blocks) ? S.world.blocks : []);
function nextBlockId(){ const used = new Set(S.world.items.map(x => x.id).concat(blocksOf().map(x => x.id))); let n = 1; while (used.has("block_" + n)) n++; return "block_" + n; }
const LIGHTS = [[0,"לא מאירה"],[7,"מאירה קצת"],[15,"מאירה חזק"]];
const HARDS = [["soft","רכה"],["normal","רגילה"],["hard","קשה"]];
function blockCheck(b){
  const hard = [], soft = [];
  if (!ID_RX.test(b.id || "")) hard.push("הקוד באנגלית לא תקין.");
  if (!b.name) soft.push("חסר שם.");
  if (!(b.px || []).some(Boolean)) soft.push("עוד אין ציור, אז במשחק היא תהיה סגולה ושחורה.");
  return { hard, soft };
}
/* The block as the game draws it in your hand: three faces of a cube, the top one lighter. */
function drawCube(cv, px){
  const g = cv.getContext("2d"), W = cv.width, s = W / 2, t = document.createElement("canvas"); t.width = t.height = 16; drawPx(t, px);
  g.clearRect(0, 0, W, cv.height); g.imageSmoothingEnabled = false;
  const face = (m, dark) => { g.save(); g.setTransform(...m); g.drawImage(t, 0, 0, 16, 16);
    if (dark){ g.globalCompositeOperation = "source-atop"; g.fillStyle = `rgba(0,0,0,${dark})`; g.fillRect(0, 0, 16, 16); } g.restore(); };   // shade only the drawn pixels
  const k = s / 16, h = s / 2;
  face([k, h / 16, -k, h / 16, s, 0], 0);                       // top
  face([k, h / 16, 0, k, 0, h], 0.25);                          // left
  face([k, -h / 16, 0, k, s, h * 2], 0.45);                     // right
}
function blockFields(b){
  const dropName = b.drop ? ingName(b.drop) : (b.name || "הקובייה עצמה");
  return `<div class="st-prev bk-prev"><canvas id="bk-cube" width="96" height="104"></canvas><div class="tip"><b id="pv-n" style="color:#fff">${esc(b.name || "?")}</b></div></div>
    <label>השם במשחק<input data-bf="name" maxlength="40" value="${esc(b.name || "")}" placeholder="למשל: אבן ירח"></label>
    <div class="st-row"><span>אור</span><div class="chs">${LIGHTS.map(([v, t]) => `<button data-bl="${v}" class="${(+b.light || 0) === v ? "on" : ""}">${t}</button>`).join("")}</div></div>
    <div class="st-row"><span>כמה קשה לשבור</span><div class="chs">${HARDS.map(([v, t]) => `<button data-bh="${v}" class="${(b.hard || "normal") === v ? "on" : ""}">${t}</button>`).join("")}</div></div>
    <div class="st-row"><span>מה יוצא ממנה</span><button class="dm-cur" data-pick="drop">${b.drop ? ingPic(b.drop) : `<span class="rc-pic">${thumb(b, 32)}</span>`}<small>${esc(dropName)}</small></button>
      ${b.drop ? `<div class="chs">${[1,2,4].map(n => `<button data-bn="${n}" class="${(+b.n || 1) === n ? "on" : ""}">${n}</button>`).join("")}</div><button class="btn ghost" data-bself>הקובייה עצמה</button>` : ""}</div>
    ${S.pick === "drop" ? pickPal(false) : ""}`;
}
function blocksHTML(embed){
  const list = blocksOf();
  if (S.bsel === undefined || S.bsel < 0 || S.bsel >= list.length) S.bsel = list.length ? 0 : -1;
  const b = list[S.bsel];
  const chips = `<div class="bk-list">${list.map((x, i) => `<button class="st-card ${i === S.bsel ? "on" : ""}" data-bsel="${i}">${thumb(x, 32)}<span>${esc(x.name || "בלי שם")}</span></button>`).join("")}
    <button class="btn go" id="bk-new">+ קובייה חדשה</button></div>`;
  const body = b ? `<div class="st-grid">${paintHTML()}<div class="st-fields">${blockFields(b)}</div></div>`
    : `<div class="st-empty"><h2>עוד אין קוביות</h2><p>לוחצים על ״קובייה חדשה״, ומציירים את הקובייה הראשונה של הממד שלכם.</p></div>`;
  const foot = b && !embed ? `<div class="st-foot"><div class="st-check" id="st-check">${blockCheckHTML(b)}</div><button class="btn go" id="st-play">לנסות במשחק</button><button class="btn ghost st-del" id="bk-del">למחוק</button><div class="st-status" id="st-status" role="status"></div></div>` : "";
  return `<div class="bk">${chips}<div class="st-pane">${body}</div>${foot}</div>`;
}
function blockCheckHTML(b){
  const c = blockCheck(b), list = l => l.map(t => ` <span>${esc(t)}</span>`).join("");
  if (c.hard.length) return `<b class="bad">עוד לא תיכנס למשחק:</b>${list(c.hard.concat(c.soft))}`;
  if (c.soft.length) return `<b class="warn">תיכנס למשחק, אבל:</b>${list(c.soft)}`;
  return `<b class="ok">מוכנה למשחק.</b>`;
}

/* The block menu for the dimension's layers, its rare mineral and what a block drops: a search, then pictures.
   Blocks only for the ground (no torches, doors or flowers: a world can't be made of them). */
const NOT_GROUND = /torch|button|door|sign|banner|carpet|rail|pressure_plate|sapling|_pane$|fence|_wall$|bars$|ladder|vine|lantern|candle|_head$|skull|flower_pot|slab|stairs|trapdoor|_bed$|chain$|lever|tripwire|coral_fan|bush|^short_grass|^tall_grass|fern|roots|^(red|brown)_mushroom$|lichen|dripleaf|^azalea$|seagrass|kelp|sea_pickle|frogspawn|lily|redstone_wire|scaffolding|cobweb|^(wheat|carrots|potatoes|beetroots)$|_stem$|command_block|structure_|jigsaw|barrier|^light$|portal|end_gateway|spawner|^vault$|piston_head|^test_|_sign$|pointed_dripstone|amethyst_bud|amethyst_cluster|^(poppy|dandelion|allium|azure_bluet|cornflower|lily_of_the_valley|blue_orchid|oxeye_daisy|wither_rose|torchflower|pitcher_plant|sunflower|lilac|rose_bush|peony)$|_tulip$|hanging|^snow$|^cake$|^bell$|anvil|^conduit$|_banner|^beacon$|^lectern$|^grindstone$|^stonecutter$|^bamboo$|sugar_cane|^cactus$|^chorus|fungus$|^big_dripleaf|^cocoa|sweet_berry|cave_vines|weeping|twisting|^hopper$|^cauldron|brewing_stand|enchanting_table|^campfire|^soul_campfire|candle_cake|turtle_egg|sniffer_egg|^decorated_pot$|^crafter$|copper_bulb|^lightning_rod|heavy_core|trial_spawner|_shelf$/;
function pickList(ground){
  const q = (S.pickQ || "").trim().toLowerCase(), qi = q.replace(/\s+/g, "_");
  const own = (ground ? blocksOf() : S.world.items.concat(blocksOf())).filter(x => ID_RX.test(x.id || ""));
  const hit = m => !q || m.id.includes(qi) || m.en.toLowerCase().includes(q) || m.he.includes(q);
  const mine = own.filter(x => !q || (x.name || "").toLowerCase().includes(q)).map(x => `<button class="rc-ing" data-ing="myworld:${x.id}" title="${esc(x.name || x.id)}">${ingPic("myworld:" + x.id)}<small>${esc(x.name || "בלי שם")}</small></button>`).join("");
  const mc = MC ? MC.filter(m => (!ground || (m.block && !NOT_GROUND.test(m.id))) && hit(m)).slice(0, 400).map(m => ingBtn("minecraft:" + m.id)).join("") : "";
  return (mine ? `<div class="rc-grp"><b>${ground ? "הקוביות שלכם" : "החפצים והקוביות שלכם"}</b><div>${mine}</div></div>` : "") + (mc || (MC ? `<p class="rc-none">לא מצאנו את זה. אפשר לחפש באנגלית או בעברית.</p>` : ""));
}
const pickPal = ground => `<div class="rc-pal dm-pal"><div class="rc-tools"><input type="search" class="rc-q" id="dm-q" placeholder="חיפוש: stone, אבן..." value="${esc(S.pickQ || "")}"><button class="btn ghost" data-pick="">סגור</button></div><div class="rc-list" id="dm-list">${pickList(ground)}</div></div>`;

const SHAPES = [["flat","שטוח","M0 26h64v14H0z"],["hills","גבעות וים","M0 30q8-10 16-4t16-2 16-8 16 4v20H0z"],["mountains","הרים ענקיים","M0 38l10-24 8 14 12-26 10 20 8-10 16 26z"],
  ["islands","איים באוויר","M4 18h18l-4 8h-10zM34 10h24l-6 9h-12zM24 32h16l-3 6h-10z"],["caves","מערה ענקית","M0 0h64v10q-10 6-20 2t-24 4-20-4zM0 40h64v-10q-12-6-24-2t-22 0-18 4z"]];
const SEAS = [["water","מים"],["lava","לבה"],["none","בלי ים"]];
const TIMES5 = [["cycle","יום ולילה"],["day","תמיד יום"],["night","תמיד לילה"]];
const GRAVS = [["low","חלש"],["normal","רגיל​"],["high","חזק"]];   // ​: not the rarity "רגיל" in the translations
const RARES = [["very","נדיר מאוד"],["rare","נדיר\u200B"],["lots","יש הרבה"]];   // \u200B: not the item rarity "נדיר" in the translations
const DEPTHS = [["deep","עמוק למטה"],["middle","באמצע"],["top","קרוב למעלה"]];
const SKIES = [["#78a7ff","#c0d8ff"],["#3a0e0e","#ff7a1a"],["#000000","#181318"],["#2a0b3d","#8a4dff"],["#0b3d1a","#8cff66"],["#ff8a3d","#ffd6a0"],["#0a1a3a","#4ad0ff"],["#f2f2f2","#ffffff"]];
/* What can grow, and what it grows on: Minecraft's own plants keep their own rules. */
const PLANTS = [["grass","דשא","short_grass","על Grass Block או Dirt"],["flowers","פרחים","poppy","על Grass Block או Dirt"],["oak","עצי אלון","oak_sapling","על Grass Block או Dirt"],
  ["birch","עצי ליבנה","birch_sapling","על Grass Block או Dirt"],["cherry","עצי דובדבן","cherry_sapling","על Grass Block או Dirt"],["spruce","עצי אשוח","spruce_sapling","על Grass Block או Dirt"],
  ["mushrooms","פטריות","red_mushroom","רק בחושך"],["crimson","יער אדום","crimson_fungus","על Crimson Nylium"],["warped","יער כחול","warped_fungus","על Warped Nylium"],
  ["chorus","Chorus","chorus_flower","על End Stone"],["cactus","קקטוסים","cactus","על Sand"],["amethyst","גבישים","amethyst_cluster","בתוך האדמה"],["lichen","אזוב זוהר","glow_lichen","על קירות במערות"]];
/* The kid's own tree (Ben, 24 Nov): trunk and leaves from any block, theirs first, in one of Minecraft's tree shapes.
   S.world.dim.tree = { trunk, leaves, shape, n } or null; tools/common.ps1 writes it as a Minecraft tree. */
const TREES = [["oak","עגול","M30 40h4V24h-4zM32 4a14 12 0 1 0 .1 0z"],["birch","גבוה ודק","M30 40h4V18h-4zM32 2a9 11 0 1 0 .1 0z"],
  ["fancy","ענק","M30 40h4V14h-4zM14 16a10 8 0 1 0 .1 0zM50 14a10 8 0 1 0 .1 0zM32 0a12 9 0 1 0 .1 0z"],["spruce","חרוטי","M30 40h4v-6h-4zM32 2L16 34h32z"],
  ["cherry","רחב","M30 40h4V22h-4zM32 6a24 10 0 1 0 .1 0z"],["dark","עבה","M27 40h10V22H27zM32 2a18 14 0 1 0 .1 0z"]];
const TREEN = [["few","מעט"],["some","בינוני"],["lots","הרבה"]];
function ensureDim(){
  if (!S.world.dim){ S.world.dim = { name:"", shape:"hills", top:"minecraft:grass_block", under:"minecraft:dirt", deep:"minecraft:stone", fluid:"water", sky:"#78a7ff", fog:"#c0d8ff", time:"cycle", gravity:"normal", ore:null, plants:[], nobed:false, nowater:false }; save(); }
  return S.world.dim;
}
const chs = (key, list, cur) => `<div class="chs">${list.map(([v, t]) => `<button data-dk="${key}" data-dv="${v}" class="${cur === v ? "on" : ""}">${t}</button>`).join("")}</div>`;
const curBtn = (key, code, ph) => `<button class="dm-cur${S.pick === key ? " on" : ""}" data-pick="${key}">${code ? ingPic(code) : `<span class="rc-pic"><em>?</em></span>`}<small>${esc(code ? ingName(code) : ph)}</small></button>`;
function dimHTML(){
  const d = ensureDim(), o = d.ore || {}, tr = d.tree, pal = S.pick && S.pick !== "drop" ? pickPal(true) : "";
  const at = k => S.pick === k ? pal : "";
  return `<div class="dm">
    <div class="dm-top"><label class="st-wn st-wn-big"><span>השם של הממד</span><input data-dt="name" maxlength="40" value="${esc(d.name || "")}" placeholder="למשל: ממלכת הלבה"></label>
      <canvas id="dm-view" width="480" height="240" aria-label="הממד, בחתך"></canvas></div>
    <section><h3>הצורה של האדמה</h3><div class="dm-shapes">${SHAPES.map(([v, t, p]) => `<button data-dk="shape" data-dv="${v}" class="${d.shape === v ? "on" : ""}"><svg viewBox="0 0 64 40"><path d="${p}"/></svg><span>${t}</span></button>`).join("")}</div></section>
    <section><h3>השכבות</h3><div class="dm-layers">
      <div><span>למעלה</span>${curBtn("top", d.top, "בוחרים")}</div><div><span>מתחת</span>${curBtn("under", d.under, "בוחרים")}</div><div><span>הכי עמוק</span>${curBtn("deep", d.deep, "בוחרים")}</div></div>
      ${at("top")}${at("under")}${at("deep")}
      ${d.shape === "flat" || d.shape === "islands" ? "" : `<div class="st-row"><span>הים</span>${chs("fluid", SEAS, d.fluid || "water")}</div>`}</section>
    <section><h3>המינרל הנדיר</h3><div class="st-row">${curBtn("ore", o.b, "בלי מינרל")}${o.b ? `<button class="btn ghost" data-noore>בלי מינרל</button>` : ""}</div>${at("ore")}
      ${o.b ? `<div class="st-row"><span>כמה</span>${chs("rare", RARES, o.rare || "rare")}</div><div class="st-row"><span>איפה</span>${chs("depth", DEPTHS, o.depth || "deep")}</div>` : ""}</section>
    <section><h3>השמיים והערפל</h3><div class="st-row dm-sky"><label>שמיים<input type="color" data-dt="sky" value="${esc(d.sky)}"></label><label>ערפל<input type="color" data-dt="fog" value="${esc(d.fog)}"></label>
      <div class="dm-skies">${SKIES.map(([s, f]) => `<button data-sky="${s},${f}" style="background:linear-gradient(${s},${f})" aria-label="שמיים"></button>`).join("")}</div></div>
      <div class="st-row"><span>הזמן</span>${chs("time", TIMES5, d.time || "cycle")}</div></section>
    <section><h3>החוקים</h3><div class="st-row"><span>כוח המשיכה</span>${chs("gravity", GRAVS, d.gravity || "normal")}</div>
      <div class="st-row"><span>מה אי אפשר לעשות שם</span><label class="rc-any"><input type="checkbox" data-dc="nowater" ${d.nowater ? "checked" : ""}> לשפוך מים: הם מתאדים</label><label class="rc-any"><input type="checkbox" data-dc="nobed" ${d.nobed ? "checked" : ""}> לישון: המיטה מתפוצצת</label></div></section>
    <section><h3>מה צומח?</h3><div class="dm-plants">${PLANTS.map(([v, t, pic, on]) => `<button data-plant="${v}" class="${(d.plants || []).includes(v) ? "on" : ""}">${ingPic("minecraft:" + pic)}<b>${t}</b><small>${on}</small></button>`).join("")}</div></section>
    <section><h3>עץ משלכם</h3>${tr ? `<div class="dm-layers"><div><span>הגזע</span>${curBtn("ttrunk", tr.trunk, "בוחרים")}</div><div><span>העלים</span>${curBtn("tleaves", tr.leaves, "בוחרים")}</div></div>${at("ttrunk")}${at("tleaves")}
      <div class="dm-shapes dm-trees">${TREES.map(([v, t, p]) => `<button data-dk="tshape" data-dv="${v}" class="${tr.shape === v ? "on" : ""}"><svg viewBox="0 0 64 40"><path d="${p}"/></svg><span>${t}</span></button>`).join("")}</div>
      <div class="st-row"><span>כמה עצים</span>${chs("tn", TREEN, tr.n || "some")}<button class="btn ghost" data-notree>בלי עץ משלי</button></div>
      <small class="st-hint">העץ צומח על כל אדמה. הקוביות שציירתם מופיעות ראשונות בתפריט.</small>`
      : `<div class="st-row"><button class="btn" data-addtree>+ עץ משלי</button><small class="st-hint">גזע ועלים מהקוביות שלכם, בצורה שאתם בוחרים.</small></div>`}</section>
  </div>`;
}

/* The dimension in a cut, like the page from last week: sky into fog, the ground's shape, the three layers, the sea. */
const SHEET5 = new Image(); SHEET5.src = "mc_items.png";
function tileOf(code){
  const c = document.createElement("canvas"); c.width = c.height = 16; const g = c.getContext("2d"), v = ING_BY[code];
  if (v && v.pic >= 0 && SHEET5.complete && SHEET5.naturalWidth) g.drawImage(SHEET5, (v.pic % MC_ROW) * 16, Math.floor(v.pic / MC_ROW) * 16, 16, 16, 0, 0, 16, 16);
  else { const o = ownOf(code || ""); if (o) drawPx(c, o.px); else { g.fillStyle = "#777"; g.fillRect(0, 0, 16, 16); } }
  return c;
}
function drawDim(cv){
  if (!cv) return; const d = ensureDim(), g = cv.getContext("2d"), W = cv.width, Hh = cv.height, T = 12, cols = Math.ceil(W / T), rows = Math.ceil(Hh / T);
  const dark = c => { if (d.time !== "night" || !/^#[0-9a-f]{6}$/i.test(c)) return c; const v = [1, 3, 5].map(i => Math.round(parseInt(c.substr(i, 2), 16) * 0.25)); return `rgb(${v.join(",")})`; };
  const sky = g.createLinearGradient(0, 0, 0, Hh * 0.7); sky.addColorStop(0, dark(d.sky)); sky.addColorStop(1, dark(d.fog));
  g.fillStyle = sky; g.fillRect(0, 0, W, Hh); g.imageSmoothingEnabled = false;
  if (d.shape === "caves"){ g.fillStyle = "rgba(12,12,16,.7)"; g.fillRect(0, 0, W, Hh); }   // inside a cave the sky is far away
  const top = tileOf(d.top), under = tileOf(d.under), deep = tileOf(d.deep), ore = d.ore && d.ore.b ? tileOf(d.ore.b) : null;
  const sea = d.shape === "flat" || d.shape === "islands" || d.fluid === "none" ? 0 : Math.round(rows * 0.55);
  const surf = x => { const s = d.shape; return s === "flat" ? Math.round(rows * 0.5) : s === "mountains" ? Math.round(rows * 0.55 - Math.abs(Math.sin(x / 4.2)) * rows * 0.4 - Math.sin(x / 1.7) * 1.5)
    : s === "caves" ? Math.round(rows * 0.72 + Math.sin(x / 3) * 1.5) : Math.round(rows * 0.5 + Math.sin(x / 3.1) * 2.5 + Math.sin(x / 1.3)); };
  const put = (t, x, y) => g.drawImage(t, x * T, y * T, T, T);
  const rnd = (x, y) => ((x * 73856093) ^ (y * 19349663)) % 7 === 0;
  for (let x = 0; x < cols; x++){
    if (d.shape === "islands"){
      [[3, 6, 7, 3], [10, 3, 9, 4], [22, 5, 8, 3], [31, 2, 7, 4], [17, 12, 6, 2], [27, 13, 7, 3]].forEach(([x0, y0, w, h]) => {
        if (x < x0 || x >= x0 + w) return; const edge = Math.min(x - x0, x0 + w - 1 - x), depth = Math.min(h + 1, h - 1 + edge);
        for (let y = y0; y <= y0 + depth; y++) put(y === y0 ? top : y < y0 + 3 ? under : deep, x, y);
      });
      continue;
    }
    const s = Math.max(1, surf(x));
    if (d.shape === "caves"){ const c = Math.round(rows * 0.18 + Math.sin(x / 2.3) * 1.5); for (let y = 0; y <= c; y++) put(deep, x, y); }
    for (let y = s; y < rows; y++){
      const k = y - s, t = k === 0 ? top : k < 4 ? under : deep;
      put(ore && k >= 4 && rnd(x, y) ? ore : t, x, y);
    }
    if (d.tree && d.shape !== "caves" && x % 9 === 4 && (!sea || s <= sea)){
      const tk = tileOf(d.tree.trunk), lv = tileOf(d.tree.leaves);
      for (let y = s - 1; y >= s - 3; y--) put(tk, x, y);
      for (let dx = -1; dx <= 1; dx++) for (let y = s - 5; y <= s - 4; y++) put(lv, x + dx, y);
      put(lv, x, s - 6);
    }
    if (sea) for (let y = sea; y < s; y++){ g.fillStyle = d.fluid === "lava" ? "rgba(255,110,0,.85)" : "rgba(40,90,220,.7)"; g.fillRect(x * T, y * T, T, T); }
  }
}

function bindPick(app, set, ground){
  const pal = app.querySelector(".dm-pal"); if (!pal) return;
  const q = pal.querySelector("#dm-q"), list = pal.querySelector("#dm-list");
  q.addEventListener("input", () => { S.pickQ = q.value; list.innerHTML = pickList(ground); });
  list.addEventListener("click", e => { const b = e.target.closest("[data-ing]"); if (!b) return; S.pick = ""; S.pickQ = ""; set(b.dataset.ing); });
  mcHook = () => { if (document.body.contains(list) && document.activeElement !== q) list.innerHTML = pickList(ground); };
  q.focus();
}
function bindDim(app){
  const box = app.querySelector(".dm"); if (!box) return;
  const d = ensureDim(), key = S.pick, again = () => { save(); box.outerHTML = dimHTML(); paintThumbs(app); bindDim(app); };
  drawDim(box.querySelector("#dm-view"));
  if (!SHEET5.complete) SHEET5.onload = () => drawDim(document.getElementById("dm-view"));
  box.querySelectorAll("[data-dt]").forEach(inp => inp.addEventListener("input", () => { d[inp.dataset.dt] = inp.type === "color" ? inp.value : inp.value.trim(); save(); drawDim(box.querySelector("#dm-view")); }));
  box.querySelectorAll("[data-dk]").forEach(b => b.addEventListener("click", () => {
    const k = b.dataset.dk, v = b.dataset.dv;
    if (k === "rare" || k === "depth") d.ore[k] = v; else if (k === "tshape" || k === "tn") d.tree[k === "tshape" ? "shape" : "n"] = v; else d[k] = v;
    again();
  }));
  box.querySelectorAll("[data-dc]").forEach(c => c.addEventListener("change", () => { d[c.dataset.dc] = c.checked; save(); }));
  box.querySelectorAll("[data-sky]").forEach(b => b.addEventListener("click", () => { [d.sky, d.fog] = b.dataset.sky.split(","); again(); }));
  box.querySelectorAll("[data-plant]").forEach(b => b.addEventListener("click", () => {
    const p = b.dataset.plant; d.plants = (d.plants || []).includes(p) ? d.plants.filter(x => x !== p) : (d.plants || []).concat(p); again();
  }));
  box.querySelectorAll("[data-pick]").forEach(b => b.addEventListener("click", () => { S.pick = S.pick === b.dataset.pick ? "" : b.dataset.pick; S.pickQ = ""; again(); }));
  const no = box.querySelector("[data-noore]"); if (no) no.addEventListener("click", () => { d.ore = null; again(); });
  const nt = box.querySelector("[data-notree]"); if (nt) nt.addEventListener("click", () => { d.tree = null; S.pick = ""; again(); });
  const at = box.querySelector("[data-addtree]"); if (at) at.addEventListener("click", () => { d.tree = { trunk:"minecraft:oak_log", leaves:"minecraft:oak_leaves", shape:"oak", n:"some" }; again(); });
  bindPick(box, code => { if (key === "ore") d.ore = Object.assign({ rare:"rare", depth:"deep" }, d.ore || {}, { b: code }); else if ((key === "ttrunk" || key === "tleaves") && d.tree) d.tree[key.slice(1)] = code; else if (key) d[key] = code; again(); }, true);
}
function bindBlocks(app, embed){
  const box = app.querySelector(".bk"); if (!box) return;
  const list = blocksOf(), again = () => { save(); if (embed) return mountPart(host.el, host.opts); render(app); };
  box.querySelectorAll("[data-bsel]").forEach(b => b.addEventListener("click", () => { S.bsel = +b.dataset.bsel; S.undo = []; S.pick = ""; again(); }));
  box.querySelector("#bk-new").addEventListener("click", () => { list.push({ id: nextBlockId(), name:"", px:[], light:0, hard:"normal", drop:"", n:1 }); S.bsel = list.length - 1; S.undo = []; again(); });
  const b = list[S.bsel]; if (!b) return;
  const cube = () => { const c = box.querySelector("#bk-cube"); if (c) drawCube(c, b.px); const n = box.querySelector("#pv-n"); if (n) n.textContent = b.name || "?"; };
  bindPainter(box, b, `[data-bsel="${S.bsel}"]`, () => { cube(); const c = box.querySelector("#st-check"); if (c) c.innerHTML = blockCheckHTML(b); });
  cube();
  box.querySelectorAll("[data-bf]").forEach(inp => inp.addEventListener("input", () => { b.name = inp.value; const c = box.querySelector(`[data-bsel="${S.bsel}"] span`); if (c) c.textContent = b.name || "בלי שם"; cube(); save(); }));
  box.querySelectorAll("[data-bl]").forEach(x => x.addEventListener("click", () => { b.light = +x.dataset.bl; again(); }));
  box.querySelectorAll("[data-bh]").forEach(x => x.addEventListener("click", () => { b.hard = x.dataset.bh; again(); }));
  box.querySelectorAll("[data-bn]").forEach(x => x.addEventListener("click", () => { b.n = +x.dataset.bn; again(); }));
  const self = box.querySelector("[data-bself]"); if (self) self.addEventListener("click", () => { b.drop = ""; b.n = 1; again(); });
  box.querySelectorAll("[data-pick]").forEach(x => x.addEventListener("click", () => { S.pick = S.pick === "drop" || !x.dataset.pick ? "" : "drop"; S.pickQ = ""; again(); }));
  bindPick(box, code => { b.drop = code === "myworld:" + b.id ? "" : code; again(); }, false);
  const del = box.querySelector("#bk-del");
  if (del) del.addEventListener("click", () => { if (!confirm("למחוק את הקובייה " + (b.name || "") + "?")) return; list.splice(S.bsel, 1); S.bsel = Math.min(S.bsel, list.length - 1); again(); });
  const play = box.querySelector("#st-play");
  if (play) play.addEventListener("click", async () => { clearTimeout(saveT); await doSave(); if (S.err || !H.act) return; await H.act("play"); S.msg = "כשמיינקראפט נפתח: E, ואז הלשונית של העולם שלכם."; paintStatus(); });
}

/* ---------- the portal to my dimension (lesson 6) ----------
   S.world.portal = { id:"dimension_portal", px (the inside, drawn), frame (a block code), key (an item code), shape: "stand"|"flat", w, h }
   (w = 0: any size). Kit.java hands it to MyPortal.java; tools/common.ps1 turns the drawing into the portal's picture. */
function ensurePortal(){
  if (!S.world.portal){
    const own = blocksOf().find(b => ID_RX.test(b.id || ""));
    S.world.portal = { id:"dimension_portal", px:[], frame: own ? "myworld:" + own.id : "minecraft:crying_obsidian", key:"minecraft:flint_and_steel", shape:"stand", w:2, h:3 };
    save();
  }
  return S.world.portal;
}
const PSHAPES = [["stand","עומד, כמו ב־Nether"],["flat","שוכב על הרצפה, כמו ב־End"]];
function portalHTML(){
  const p = ensurePortal(), flat = p.shape === "flat", pal = S.pick === "pframe" ? pickPal(true) : S.pick === "pkey" ? pickPal(false) : "";
  const sizes = (key, list, cur) => `<div class="chs">${list.map(v => `<button data-ps="${key}" data-pv="${v}" class="${+cur === v ? "on" : ""}">${v || "כל גודל"}</button>`).join("")}</div>`;
  return `<div class="pt">
    <div class="st-grid">${paintHTML()}<div class="st-fields">
      <div class="pt-prev"><canvas id="pt-view" width="240" height="240" aria-label="הפורטל"></canvas></div>
      <small class="st-hint">מציירים את מה שרואים בתוך הפורטל. משבצת ריקה תהיה שקופה.</small></div></div>
    <section><h3>המסגרת</h3><div class="st-row"><span>ממה בונים אותה</span>${curBtn("pframe", p.frame, "בוחרים")}</div>${S.pick === "pframe" ? pal : ""}</section>
    <section><h3>איך מדליקים אותו</h3><div class="st-row"><span>מדליקים בעזרת</span>${curBtn("pkey", p.key, "בוחרים")}</div>${S.pick === "pkey" ? pal : ""}</section>
    <section><h3>הצורה</h3><div class="chs">${PSHAPES.map(([v, t]) => `<button data-pshape="${v}" class="${(p.shape || "stand") === v ? "on" : ""}">${t}</button>`).join("")}</div>
      <div class="st-row"><span>${flat ? "הפנים: אורך" : "הפנים: רוחב"}</span>${sizes("w", [0, 1, 2, 3, 4], p.w)}</div>
      ${+p.w ? `<div class="st-row"><span>${flat ? "רוחב" : "גובה"}</span>${sizes("h", flat ? [1, 2, 3, 4] : [2, 3, 4, 5], p.h)}</div>` : ""}</section>
  </div>`;
}
/* The portal as it will stand in the game: the frame around, the drawing inside (from the front, or from above). */
function drawPortal(cv){
  if (!cv) return; const p = ensurePortal(), g = cv.getContext("2d"), w = +p.w || 2, h = +p.h || 3, cols = w + 2, rows = h + 2;
  const T = Math.floor(Math.min(cv.width / cols, cv.height / rows)), ox = (cv.width - T * cols) / 2, oy = (cv.height - T * rows) / 2;
  g.clearRect(0, 0, cv.width, cv.height); g.imageSmoothingEnabled = false;
  const frame = tileOf(p.frame), inside = document.createElement("canvas"); inside.width = inside.height = 16;
  if ((p.px || []).some(Boolean)) drawPx(inside, p.px); else { const q = inside.getContext("2d"); q.fillStyle = "rgba(140,60,220,.75)"; q.fillRect(0, 0, 16, 16); }
  for (let x = 0; x < cols; x++) for (let y = 0; y < rows; y++){
    const edge = x === 0 || y === 0 || x === cols - 1 || y === rows - 1;
    g.drawImage(edge ? frame : inside, ox + x * T, oy + y * T, T, T);
  }
}
function bindPortal(app){
  const box = app.querySelector(".pt"); if (!box) return;
  const p = ensurePortal(), key = S.pick, again = () => { save(); box.outerHTML = portalHTML(); paintThumbs(app); bindPortal(app); };
  drawPortal(box.querySelector("#pt-view"));
  if (!SHEET5.complete) SHEET5.onload = () => drawPortal(document.getElementById("pt-view"));
  bindPainter(box, p, ".pt-none", () => drawPortal(box.querySelector("#pt-view")));
  box.querySelectorAll("[data-pshape]").forEach(b => b.addEventListener("click", () => { p.shape = b.dataset.pshape; if (p.shape === "flat" && +p.h > 4) p.h = 4; if (p.shape !== "flat" && +p.h < 2) p.h = 3; again(); }));
  box.querySelectorAll("[data-ps]").forEach(b => b.addEventListener("click", () => { p[b.dataset.ps] = +b.dataset.pv; again(); }));
  box.querySelectorAll("[data-pick]").forEach(b => b.addEventListener("click", () => { S.pick = S.pick === b.dataset.pick ? "" : b.dataset.pick; S.pickQ = ""; again(); }));
  bindPick(box, code => { if (key === "pframe") p.frame = code; else if (key === "pkey") p.key = code; again(); }, key !== "pkey");
}

/* ---------- the page ---------- */
/* One item at a time, in tabs: how it looks, what it does, how it's made, and Gemini. */
const PANES = [["look","הציור והשם"],["power","מה הוא עושה?"],["craft","איך מכינים אותו?"],["gem","ג׳מיני"]];
function render(app){
  host = null;
  if (window.STUDIO_BLOCKS) window.STUDIO_BLOCKS.unmount();
  if (!S.loaded){ app.innerHTML = `<div class="wrap"><p>טוען...</p></div>`; load().then(() => render(app)); return; }
  const items = S.world.items, it = items[S.sel], last = H.LS.get("lastLesson", 0), kind = S.kind || "items";
  S.pane = S.pane || H.LS.get("stpane", "look");
  if (S.bsel === undefined) S.bsel = blocksOf().length ? 0 : -1;
  const kinds = `<nav class="st-kinds">${[["items","חפצים"],["blocks","קוביות"],["dim","הממד שלי"],["portal","הפורטל"]].map(([k, t]) => `<button data-kind="${k}" class="${kind === k ? "on" : ""}">${t}</button>`).join("")}</nav>`;
  app.innerHTML = `${H.topBar ? H.topBar(`<b class="tb-lesson">הסטודיו</b>`) : ""}<div class="wrap studio">
    <div class="st-top"><label class="st-wn"><span>העולם:</span><input id="st-wname" maxlength="40" value="${esc(S.world.world.name || "")}" placeholder="שם העולם שלכם"></label>
      ${last ? `<a class="btn ghost" href="#lesson${last}">→ חזרה לשיעור ${last}</a>` : ""}</div>
    ${kinds}
    ${kind === "blocks" ? `<div class="st-edit st-wide">${blocksHTML(false)}</div>` : kind === "dim" ? `<div class="st-edit st-wide st-pane">${dimHTML()}</div><div class="st-status" id="st-status" role="status"></div>` : kind === "portal" ? `<div class="st-edit st-wide st-pane">${portalHTML()}</div><div class="st-status" id="st-status" role="status"></div>` : `<div class="st-main">
      <aside class="st-list"><h2>החפצים שלי</h2>
        <div class="st-cards">${items.map((x, i) => `<button class="st-card ${i === S.sel ? "on" : ""}" data-sel="${i}">${thumb(x, 36)}<span>${esc(x.name || "בלי שם")}</span><i class="st-dot ${state(x)}"></i></button>`).join("")}</div>
        <button class="btn go" id="st-new">+ חפץ חדש</button>
      </aside>
      <section class="st-edit">${it ? editor(it) : `<div class="st-empty"><h2>עוד אין חפצים</h2><p>לוחצים על ״חפץ חדש״, וממציאים את החפץ הראשון של העולם שלכם.</p></div>`}</section>
    </div>
    ${it ? "" : `<div class="st-status" id="st-status" role="status"></div>`}`}
  </div>`;
  app.querySelectorAll("[data-kind]").forEach(b => b.addEventListener("click", () => { S.kind = b.dataset.kind; S.pick = ""; S.undo = []; render(app); }));
  if (kind === "blocks"){ bindBlocks(app, false); paintThumbs(app); paintStatus(); if (H.afterRender) H.afterRender(); return; }
  if (kind === "dim"){ bindDim(app); paintThumbs(app); paintStatus(); if (H.afterRender) H.afterRender(); return; }
  if (kind === "portal"){ bindPortal(app); paintThumbs(app); paintStatus(); if (H.afterRender) H.afterRender(); return; }
  bind(app); paintThumbs(app); paintStatus();
  const blk = app.querySelector("#st-blk");
  if (blk && it && window.STUDIO_BLOCKS){ window.STUDIO_BLOCKS.mount(blk, it, () => { paintLint(it); save(); }); paintLint(it); }
  if (H.afterRender) H.afterRender();
}
function editor(it){
  return `<nav class="st-panes">${PANES.map(([k, t]) => `<button data-pane="${k}" class="${S.pane === k ? "on" : ""}">${t}</button>`).join("")}</nav>
  <div class="st-pane">${S.pane === "power" ? powerPane(it) : S.pane === "gem" ? gemPane(it) : S.pane === "craft" ? recipeHTML(it) : lookPane(it)}</div>
  <div class="st-foot"><div class="st-check" id="st-check">${checkHTML(it)}</div>
    <button class="btn go" id="st-play">לנסות במשחק</button><button class="btn ghost st-del" id="st-del">למחוק</button>
    <div class="st-status" id="st-status" role="status"></div></div>`;
}
function lookPane(it){
  return `<div class="st-grid">${paintHTML()}<div class="st-fields">${previewHTML(it)}${fieldsHTML(it, true)}</div></div>`;
}
function paintHTML(){
  return `<div class="st-paint">
      <canvas id="st-c" width="320" height="320" aria-label="לוח ציור 16 על 16"></canvas>
      <div class="st-pal">${COLORS.map(c => `<button data-col="${c}" style="background:${c}" class="${c === S.color ? "on" : ""}" aria-label="צבע"></button>`).join("")}<input type="color" id="st-cc" value="#ff66aa" aria-label="צבע משלכם"></div>
      <div class="st-tools">${[["pen","עיפרון"],["erase","מחק"],["fill","דלי"]].map(([k, t]) => `<button class="btn ghost ${S.tool === k ? "on" : ""}" data-tool="${k}">${t}</button>`).join("")}<button class="btn ghost" id="st-undo">צעד אחורה</button><button class="btn ghost" id="st-clear">לנקות</button></div>
    </div>`;
}
/* The item as the game shows it: picture in a slot, and the name in its rarity colour. */
const previewHTML = it => `<div class="st-prev"><div class="sl"><canvas id="pv-c" width="16" height="16"></canvas></div><div class="tip"><b id="pv-n" style="color:${rarCol(it.rarity)}">${esc(it.name || "?")}</b><span id="pv-l">${esc(it.lore || "")}</span></div></div>`;
function fieldsHTML(it, withCode){
  return `<label>השם במשחק<input data-f="name" maxlength="40" value="${esc(it.name || "")}" placeholder="למשל: מטבע דבש"></label>
      <label>המשפט מתחת לשם<input data-f="lore" maxlength="80" value="${esc(it.lore || "")}" placeholder="למשל: הדבורים מקבלות רק אותו."></label>
      ${withCode ? `<label>הקוד באנגלית <small>המחשב בחר אותו. אפשר לשנות: אותיות קטנות, בלי רווחים.</small><input data-f="id" dir="ltr" maxlength="40" value="${esc(it.id || "")}" placeholder="honey_coin"></label>` : ""}
      <div class="st-row"><span>כמה בערימה</span><div class="chs">${[1,16,64].map(n => `<button data-stack="${n}" class="${+it.stack === n ? "on" : ""}">${n}</button>`).join("")}</div><input data-f="stack" type="number" min="1" max="64" value="${+it.stack || 64}" dir="ltr" aria-label="כמה בערימה"></div>
      <div class="st-row"><span>כמה נדיר</span><div class="chs">${RARITY.map(([k, t, c]) => `<button data-rar="${k}" class="${(it.rarity || "common") === k ? "on" : ""}" style="--rc:${c}"><i></i>${t}</button>`).join("")}</div></div>`;
}
function powerPane(it, noExamples){
  const X = (window.STUDIO_BLOCKS && window.STUDIO_BLOCKS.EXAMPLES) || [], E = H.LS.get("lang", "he") === "en";
  const ex = noExamples ? "" : `<details class="st-ex" ${it.power ? "" : "open"}><summary>מתחילים מדוגמה</summary>
      <div class="st-exs">${X.map(x => `<button data-ex="${x.id}"><b>${esc(exText(x)[0])}</b><small>${esc(exText(x)[1])}</small></button>`).join("")}</div>
      <small>הדוגמה נכנסת לחפץ הזה, ואז משנים בה מה שרוצים: מספרים, יצורים, אפקטים, או בלוקים שלמים.</small></details>`;
  return `${ex}<p class="st-lead">גוררים בלוקים מהתפריט: קודם ״מתי״, ובתוכו מה קורה. אל תשכחו מחיר.</p><div id="st-blk"></div><ul class="st-lint" id="st-lint"></ul>`;
}
/* An example's name and line: Hebrew, English, or Russian (ru.js; its third entry is the line under the name). */
const exText = x => { const l = H.LS.get("lang", "he"), r = l === "ru" && window.HUB_RU && window.HUB_RU.blocks.examples[x.id];
  return r || (l === "en" || l === "ru" ? x.en : x.he); };
/* An example's picture rows → the studio's 256 colours. */
const picOf = pic => { const px = Array(256).fill(""); if (!pic) return px; pic.rows.forEach((r, y) => [...r].forEach((ch, x) => { if (pic.pal[ch]) px[y * 16 + x] = pic.pal[ch]; })); return px; };
/* A lesson's ready item: picture, name and blocks, straight into the studio (index.html calls this from a lesson step). */
async function ensureReady(exId){
  const B = window.STUDIO_BLOCKS, x = B && B.EXAMPLES.find(e => e.id === exId); if (!x) return -1;
  if (!S.loaded) await load();
  const items = S.world.items, E = H.LS.get("lang", "he") === "en";
  let i = items.findIndex(t => t.id === x.id);
  if (i < 0){
    const it = { id: x.id, name: exText(x)[0], lore: exText(x)[2] !== undefined ? exText(x)[2] : x.lore ? x.lore[E ? 1 : 0] : "", stack: 1, rarity: x.rarity || "common", px: picOf(x.pic) };
    if (x.recipe) it.recipe = JSON.parse(JSON.stringify(x.recipe));
    B.loadInto(it, x.prog); items.push(it); i = items.length - 1;
    savePicture(it); clearTimeout(saveT); await doSave();
  } else if (x.recipe && !items[i].recipe){
    // Made before it had a recipe (lessons 1-2): it gets the ready recipe the first time a lesson shows it.
    items[i].recipe = JSON.parse(JSON.stringify(x.recipe)); clearTimeout(saveT); await doSave();
  }
  return i;
}
async function addReady(exId){
  const i = await ensureReady(exId); if (i < 0) return;
  S.sel = i; S.pane = "power"; S.undo = []; S.sugg = null;
  if (location.hash === "#studio") render(document.getElementById("app")); else location.hash = "#studio";
}
/* A lesson's own item ("tag" = which lesson step made it). Made empty the first time, with an automatic code. */
function ensureTagged(tag){
  const items = S.world.items;
  let i = items.findIndex(t => t.tag === tag);
  if (i < 0){ items.push({ id: nextId(), tag, name:"", lore:"", stack:64, rarity:"common", px:[] }); i = items.length - 1; save(); }
  return i;
}

/* ---------- studio pieces inside a lesson step ----------
   index.html calls STUDIO.mount(el, {ready | tag, parts}) so a kid names, draws or programs the lesson's item right
   in the step, without leaving the lesson. parts: "world", "fields", "paint", "card", "power", "check". */
let host = null;
function rerender(app){ if (host && document.body.contains(host.el)) return mountPart(host.el, host.opts); host = null; render(app); }
/* The whole item on one card: picture, name and line as in the game, and its blocks (its "code"), read-only. */
function cardHTML(it){
  return `<div class="st-cardv"><div class="st-itemc">${previewHTML(it)}</div>
    ${it.power ? `<div class="st-code"><b>מה הוא עושה: הבלוקים שלו</b><div id="st-blk-ro"></div></div>` : `<div class="st-code st-nocode">עוד אין לחפץ בלוקים, אז הוא לא עושה כלום. זה בסדר.</div>`}</div>`;
}
function partHTML(p, it){
  if (p === "blocks") return blocksHTML(true);
  if (p === "dim") return `<div class="st-dimw">${dimHTML()}</div>`;
  if (p === "portal") return `<div class="st-dimw">${portalHTML()}</div>`;
  if (p === "world") return `<label class="st-wn st-wn-big"><span>השם של העולם שלכם</span><input id="st-wname" maxlength="40" value="${esc(S.world.world.name || "")}" placeholder="למשל: עיר הדבורים"></label>`;
  if (!it) return "";
  if (p === "fields") return `<div class="st-grid st-grid-f"><div class="st-fields">${fieldsHTML(it, false)}</div><div>${previewHTML(it)}</div></div>`;
  if (p === "paint") return `<div class="st-grid">${paintHTML()}<div class="st-fields">${previewHTML(it)}<small class="st-hint">לחיצה ימנית מוחקת. קו מתאר כהה, ושניים עד ארבעה צבעים.</small></div></div>`;
  if (p === "card") return cardHTML(it);
  if (p === "power") return powerPane(it, host && host.opts.ready);
  if (p === "recipe") return recipeHTML(it);
  if (p === "recipeview") return recipeHTML(it, true);
  if (p === "check") return `<div class="st-check" id="st-check">${checkHTML(it)}</div>`;
  if (p === "first") return `<p class="st-first"><b>לחפץ שלכם עוד אין שם או ציור.</b><span>קודם נותנים לו שם ומציירים אותו. אחר כך בונים לו מתכון.</span><span>עבדתם בשבוע שעבר על מחשב אחר? תפריט ← ״דרייב״, ומביאים משם את העולם שלכם.</span></p>`;
  return "";
}
async function mountPart(el, opts){
  if (window.STUDIO_BLOCKS) window.STUDIO_BLOCKS.unmount();
  if (!S.loaded){ el.innerHTML = `<p class="st-loading">טוען...</p>`; await load(); }
  let i = -1;
  if (opts.ready) i = await ensureReady(opts.ready); else if (opts.tag) i = ensureTagged(opts.tag);
  // A lesson's recipe steps follow the item the kid picked in "המתכון של".
  if (opts.parts.some(p => p === "recipe" || p === "recipeview") && S.rcSel){ const j = S.world.items.findIndex(x => x.id === S.rcSel); if (j >= 0) i = j; }
  if (i >= 0){ if (S.sel !== i) S.undo = []; S.sel = i; }
  const it = S.world.items[S.sel];
  // A recipe for an item with no name or picture is a recipe for nothing: this step shows its name and drawing first.
  // Decided once per step, so the pieces don't vanish while the kid is still drawing.
  if (it && !opts.first && opts.parts.includes("recipe") && (!(it.name || "").trim() || !(it.px || []).some(Boolean)))
    opts = Object.assign({}, opts, { first: true, origParts: opts.parts, parts: ["first", "fields", "paint"].concat(opts.parts) });
  host = { el, opts };
  const edits = opts.parts.some(p => p === "fields" || p === "paint" || p === "power" || p === "world" || p === "recipe" || p === "blocks" || p === "dim" || p === "portal");
  el.innerHTML = `<div class="studio st-embed">${opts.parts.map(p => partHTML(p, it)).join("")}${edits ? `<div class="st-status" id="st-status" role="status"></div>` : ""}</div>`;
  bind(el); paintThumbs(el); paintStatus();
  if (it) paintPreview(el, it);
  const blk = el.querySelector("#st-blk"), ro = el.querySelector("#st-blk-ro");
  if (blk && it && window.STUDIO_BLOCKS){ window.STUDIO_BLOCKS.mount(blk, it, () => { paintLint(it); save(); }); paintLint(it); }
  else if (ro && it && window.STUDIO_BLOCKS) window.STUDIO_BLOCKS.mount(ro, it, null, true);
  if (opts.parts.includes("blocks")){ if (S.bsel === undefined || S.bsel < 0) S.bsel = blocksOf().length ? 0 : -1; bindBlocks(el, true); paintThumbs(el); }
  if (opts.parts.includes("dim")){ bindDim(el); paintThumbs(el); }
  if (opts.parts.includes("portal")){ bindPortal(el); paintThumbs(el); }
  if (H.afterEmbed) H.afterEmbed(el);
}
function gemPane(it){
  return `<div class="st-gcards">
    <div class="st-gcard"><h3>רעיונות</h3><p>ג׳מיני שואל שאלות ועוזר לחשוב על העולם ועל החפץ. את הרעיונות אתם ממציאים.</p>
      <div><button class="btn ghost" id="st-tog">להעתיק לג׳מיני</button></div><small>בג׳מיני לוחצים Ctrl + V, ומתחת כותבים מה אתם רוצים.</small></div>
    <div class="st-gcard"><h3>בדיקת הבלוקים</h3>
      <label class="st-intent">במילים שלכם: מה החפץ אמור לעשות?<textarea data-f="intent" maxlength="300" rows="2" placeholder="למשל: כשמכים יצור בלילה, נופל עליו ברק. אחרי זה המקל צריך לנוח.">${esc(it.intent || "")}</textarea></label>
      <div><button class="btn ghost" id="st-blk2g">להעתיק את הבלוקים לג׳מיני</button></div><small>ג׳מיני בודק אם הבלוקים עושים את מה שכתבתם, ומציע תיקון. אתם מחליטים אם לקחת אותו.</small></div>
  </div>
  <div class="st-back">ג׳מיני הציע שינוי? מעתיקים את כל התשובה שלו, ולוחצים <button class="btn go" id="st-fromg">הדבקה מג׳מיני</button></div>
  <div id="st-sugg">${S.sugg ? suggestion() : ""}</div>`;
}
/* Is the item ready for the game? "hard" keeps it out of the game; "soft" lets it in, with a gap. */
function check(it){
  const hard = [], soft = [];
  if (!it.id) hard.push("חסר הקוד באנגלית.");
  else if (!ID_RX.test(it.id)) hard.push("הקוד באנגלית מתחיל באות, ויש בו רק אותיות קטנות, מספרים וקו תחתון.");
  else if (S.world.items.filter(x => x.id === it.id).length > 1) hard.push("יש עוד חפץ עם אותו קוד באנגלית.");
  if (!it.name) soft.push("חסר שם.");
  if (!(it.px || []).some(Boolean)) soft.push("עוד אין ציור, אז במשחק יופיע ריבוע סגול ושחור.");
  return { hard, soft };
}
const state = it => { const c = check(it); return c.hard.length ? "bad" : c.soft.length ? "warn" : "ok"; };
function checkHTML(it){
  const c = check(it);
  const list = l => l.map(t => ` <span>${esc(t)}</span>`).join("");
  if (c.hard.length) return `<b class="bad">עוד לא ייכנס למשחק:</b>${list(c.hard.concat(c.soft))}`;
  if (c.soft.length) return `<b class="warn">ייכנס למשחק, אבל:</b>${list(c.soft)}`;
  return `<b class="ok">מוכן למשחק.</b>`;
}
function paintCheck(app, it){
  const el = app.querySelector("#st-check"); if (el) el.innerHTML = checkHTML(it);
  const d = app.querySelector(`[data-sel="${S.sel}"] .st-dot`); if (d) d.className = "st-dot " + state(it);
}
function paintLint(it){
  const el = document.getElementById("st-lint"); if (!el || !window.STUDIO_BLOCKS) return;
  const list = window.STUDIO_BLOCKS.lint(it.power);
  el.innerHTML = list.map(t => `<li>${esc(t)}</li>`).join("");
}
function paintStatus(){ const el = document.getElementById("st-status"); if (!el) return; el.className = "st-status" + (S.err ? " bad" : ""); el.textContent = S.err || S.msg; }

/* ---------- behaviour ---------- */
function bind(app){
  const items = S.world.items;
  app.querySelectorAll("[data-sel]").forEach(b => b.addEventListener("click", () => { S.sel = +b.dataset.sel; S.undo = []; S.sugg = null; if (!S.saveErr) S.err = ""; rerender(app); }));
  const nb = app.querySelector("#st-new");
  if (nb) nb.addEventListener("click", () => { items.push({ id: nextId(), name:"", lore:"", stack:64, rarity:"common", px:[] }); S.sel = items.length - 1; S.undo = []; S.pane = "look"; save(); rerender(app); });
  const wn = app.querySelector("#st-wname");
  if (wn) wn.addEventListener("input", () => { S.world.world.name = wn.value.trim(); save(); });
  const it = items[S.sel]; if (!it) return;
  app.querySelectorAll("[data-pane]").forEach(b => b.addEventListener("click", () => { S.pane = b.dataset.pane; H.LS.set("stpane", S.pane); rerender(app); }));
  // fields
  app.querySelectorAll("[data-f]").forEach(inp => inp.addEventListener("input", () => {
    const f = inp.dataset.f;
    if (f === "id"){ const v = codeOf(inp.value); if (v !== inp.value) inp.value = v; const old = it.id; it.id = v; if (old !== v) savePicture(it); }
    else if (f === "stack"){ it.stack = Math.max(1, Math.min(64, parseInt(inp.value, 10) || 1)); app.querySelectorAll("[data-stack]").forEach(b => b.classList.toggle("on", +b.dataset.stack === it.stack)); }
    else it[f] = inp.value;
    if (!S.saveErr) S.err = "";
    if (f === "name"){ const c = app.querySelector(`[data-sel="${S.sel}"] span`); if (c) c.textContent = it.name || "בלי שם"; }
    paintPreview(app, it); paintCheck(app, it); save();
  }));
  app.querySelectorAll("[data-stack]").forEach(b => b.addEventListener("click", () => { it.stack = +b.dataset.stack; app.querySelector('[data-f="stack"]').value = it.stack; app.querySelectorAll("[data-stack]").forEach(x => x.classList.toggle("on", x === b)); save(); }));
  app.querySelectorAll("[data-rar]").forEach(b => b.addEventListener("click", () => { it.rarity = b.dataset.rar; app.querySelectorAll("[data-rar]").forEach(x => x.classList.toggle("on", x === b)); paintPreview(app, it); save(); }));
  const del = app.querySelector("#st-del");
  if (del) del.addEventListener("click", () => { if (!confirm("למחוק את החפץ " + (it.name || "") + "?")) return; items.splice(S.sel, 1); S.sel = Math.min(S.sel, items.length - 1); save(); rerender(app); });
  const play = app.querySelector("#st-play");
  if (play) play.addEventListener("click", async () => {
    const c = check(it);
    if (c.hard.length){ S.err = "החפץ הזה עוד לא ייכנס למשחק: " + c.hard[0]; paintStatus(); return; }
    if (!S.saveErr) S.err = "";
    clearTimeout(saveT); await doSave(); if (S.err || !H.act) return;
    await H.act("play"); S.msg = "כשמיינקראפט נפתח: E, ואז הלשונית של העולם שלכם."; paintStatus(); window.scrollTo(0, 0);
  });
  // examples
  app.querySelectorAll("[data-ex]").forEach(b => b.addEventListener("click", () => {
    const x = window.STUDIO_BLOCKS.EXAMPLES.find(e => e.id === b.dataset.ex); if (!x) return;
    if (it.power && !confirm("להחליף את הבלוקים של החפץ בדוגמה? את הבלוקים הקודמים אפשר להחזיר ב״גרסאות״.")) return;
    window.STUDIO_BLOCKS.loadInto(it, x.prog); S.msg = "הדוגמה נכנסה. עכשיו משנים בה מה שרוצים."; S.err = ""; save(); rerender(app);
  }));
  if (!app.querySelector(".bk, .pt")) bindPainter(app, it, `[data-sel="${S.sel}"]`, () => paintCheck(app, it));   // a block or portal step has its own board
  // Gemini
  const tog = app.querySelector("#st-tog");
  if (tog) tog.addEventListener("click", async () => {
    try { await H.api("/api/copy-text", { method:"POST", body: b64(geminiText(it)) }); S.msg = "הועתק. בג׳מיני לוחצים Ctrl + V, ומתחת כותבים מה אתם רוצים."; S.err = ""; } catch(e){ S.err = "לא הועתק. נסו שוב."; }
    paintStatus();
  });
  const b2g = app.querySelector("#st-blk2g");
  if (b2g) b2g.addEventListener("click", async () => {
    if (!it.power){ S.err = "עוד אין בלוקים. קודם בונים ב״מה הוא עושה?״, אחר כך משפרים עם ג׳מיני."; paintStatus(); return; }
    try { await H.api("/api/copy-text", { method:"POST", body: b64(blocksText(it)) }); S.msg = "הבלוקים הועתקו. בג׳מיני לוחצים Ctrl + V ושולחים. אחר כך מעתיקים את כל התשובה ולוחצים ״הדבקה מג׳מיני״."; S.err = ""; } catch(e){ S.err = "לא הועתק. נסו שוב."; }
    paintStatus();
  });
  const fg = app.querySelector("#st-fromg");
  if (fg) fg.addEventListener("click", async () => {
    let text = ""; try { text = (await (await H.api("/api/clip")).json()).text || ""; } catch(e){}
    const r = /```\s*blocks/i.test(text) ? parseBlocks(text, it) : parseSuggestion(text);
    if (r.error){ S.sugg = null; S.err = r.error; paintStatus(); app.querySelector("#st-sugg").innerHTML = ""; return; }
    S.sugg = r; S.err = ""; S.msg = ""; paintStatus();
    const box = app.querySelector("#st-sugg"); box.innerHTML = suggestion(); bindSuggestion(app);
  });
  bindSuggestion(app);
  bindRecipe(app, it);
}
/* The 16 x 16 drawing board, for an item or a block. thumbSel = its card in the list, after = what to update after a stroke. */
function bindPainter(app, it, thumbSel, after){
  const cv = app.querySelector("#st-c");
  if (!cv) return;
  const K = 20; it.px = Array.isArray(it.px) && it.px.length === 256 ? it.px : Array(256).fill("");
  const redraw = () => { const g = cv.getContext("2d"); g.clearRect(0, 0, 320, 320);
    for (let i = 0; i < 256; i++){ const x = i % 16, y = Math.floor(i / 16); g.fillStyle = (x + y) % 2 ? "#d9d9d9" : "#f2f2f2"; g.fillRect(x*K, y*K, K, K); if (it.px[i]){ g.fillStyle = it.px[i]; g.fillRect(x*K, y*K, K, K); } }
    g.strokeStyle = "rgba(0,0,0,.12)"; for (let i = 0; i <= 16; i++){ g.beginPath(); g.moveTo(i*K, 0); g.lineTo(i*K, 320); g.stroke(); g.beginPath(); g.moveTo(0, i*K); g.lineTo(320, i*K); g.stroke(); }
    paintPreview(app, it); const th = app.querySelector(thumbSel + " canvas"); if (th) drawPx(th, it.px); };
  const cell = e => { const r = cv.getBoundingClientRect(); const x = Math.floor((e.clientX - r.left) / r.width * 16), y = Math.floor((e.clientY - r.top) / r.height * 16); return x >= 0 && x < 16 && y >= 0 && y < 16 ? y * 16 + x : -1; };
  const fill = (i, col) => { const from = it.px[i]; if (from === col) return; const st = [i]; while (st.length){ const k = st.pop(); if (it.px[k] !== from) continue; it.px[k] = col; const x = k % 16; if (x > 0) st.push(k-1); if (x < 15) st.push(k+1); if (k >= 16) st.push(k-16); if (k < 240) st.push(k+16); } };
  let down = false, erase = false;
  const paint = e => { const i = cell(e); if (i < 0) return; const col = (erase || S.tool === "erase") ? "" : S.color;
    if (S.tool === "fill" && !erase){ fill(i, col); down = false; } else it.px[i] = col; redraw(); };
  const done = () => { save(); savePicture(it); after(); };
  cv.addEventListener("pointerdown", e => { S.undo.push(it.px.slice()); if (S.undo.length > 40) S.undo.shift(); down = true; erase = e.button === 2; cv.setPointerCapture(e.pointerId); paint(e); if (!down) done(); });
  cv.addEventListener("pointermove", e => { if (down) paint(e); });
  cv.addEventListener("pointerup", () => { if (!down) return; down = false; done(); });
  cv.addEventListener("contextmenu", e => e.preventDefault());
  app.querySelectorAll("[data-col]").forEach(b => b.addEventListener("click", () => { S.color = b.dataset.col; if (S.tool === "erase") S.tool = "pen"; app.querySelectorAll("[data-col]").forEach(x => x.classList.toggle("on", x === b)); app.querySelectorAll("[data-tool]").forEach(x => x.classList.toggle("on", x.dataset.tool === S.tool)); }));
  app.querySelector("#st-cc").addEventListener("input", e => { S.color = e.target.value; app.querySelectorAll("[data-col]").forEach(x => x.classList.remove("on")); });
  app.querySelectorAll("[data-tool]").forEach(b => b.addEventListener("click", () => { S.tool = b.dataset.tool; app.querySelectorAll("[data-tool]").forEach(x => x.classList.toggle("on", x === b)); }));
  app.querySelector("#st-undo").addEventListener("click", () => { if (S.undo.length){ it.px = S.undo.pop(); redraw(); done(); } });
  app.querySelector("#st-clear").addEventListener("click", () => { S.undo.push(it.px.slice()); it.px = Array(256).fill(""); redraw(); save(); after(); });
  redraw();
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

YOUR JOB, in this order:
1. LOGIC REVIEW. Under "===== מה אני רוצה שהחפץ יעשה =====" the kid wrote, in their own words, what the item should do. Check whether the blocks really do that. Find logic mistakes and explain each one in one simple sentence, the way a teacher would: a block under the wrong "when", "the creature" where there is none (it exists only in "hit", "use_mob", "kill", "hurt" and where a projectile hits), steps in the wrong order, a missing or wrong condition, a price that comes before the power so it never pays, a repeat that does too much. If the kid wrote nothing, say what the blocks do in plain words and ask if that's what they meant. The studio's own checks are under "===== בדיקות של הסטודיו =====".
2. GAME DESIGN. One sentence on what is good, then up to two improvements: is there a price? Is it too strong or too weak? Does the player get a clear sign that something happened?
3. Then send ONE fixed version as a block, and list in Hebrew, line by line, what you changed and why:
\`\`\`blocks
{"on":{"use":[...]}}
\`\`\`
Keep the kid's idea. Change as little as needed. Never invent a new story or name: those belong to the kid.

THE PROGRAM FORMAT (the only things that exist)
@@FORMAT@@`;
function blocksText(it){
  const B = window.STUDIO_BLOCKS;
  const rules = BLOCK_RULES.replace("@@FORMAT@@", B.format());
  return rules + "\n\n===== החפץ =====\n" + (it.name || "") + (it.lore ? " (" + it.lore + ")" : "") + (it.job ? "\nבשביל מה: " + it.job : "") + (it.price ? "\nהמחיר שתכננתי: " + it.price : "")
    + "\n\n===== מה אני רוצה שהחפץ יעשה =====\n" + (it.intent || "(לא כתבתי)")
    + "\n\n===== הבלוקים שלי =====\n" + B.readable(it.power).join("\n") + "\n\n===== התוכנית (JSON) =====\n" + JSON.stringify(it.power)
    + "\n\n===== בדיקות של הסטודיו =====\n" + (B.lint(it.power).join("\n") || "אין הערות")
    + "\n\n===== מה אני רוצה =====\nתבדקו אם הבלוקים שלי עושים את מה שכתבתי, ואיך אפשר לשפר.\n";
}
function blockList(){
  const B = window.STUDIO_BLOCKS; if (!B) return "";
  const cat = {}; B.CATS.forEach(([k, he]) => { cat[k] = he; });
  return B.DEFS.map(d => "- [" + cat[d[4]] + "] " + d[1].replace(/%\d/g, "___")).join("\n");
}
function geminiText(it){
  const w = { world: S.world.world, items: S.world.items.map(x => ({ id:x.id, name:x.name, lore:x.lore, stack:x.stack, rarity:x.rarity, job:x.job, price:x.price, where:x.where, power: x.power ? x.power.on : "none yet", recipe: x.recipe ? needList(x.recipe).map(([n, c]) => n + " x " + ingName(c)).join(", ") + " -> " + x.recipe.n : "none yet", picture: (x.px || []).some(Boolean) ? "drawn" : "none yet" })) };
  return RULES.replace("@@BLOCKS@@", blockList()) + "\n\n===== העולם שלי =====\n" + JSON.stringify(w, null, 1) + "\n\n===== החפץ שאני עובד עליו =====\n" + (it.id || it.name || "") + "\n\n===== מה אני רוצה =====\n";
}
const FIELDS = { id:"קוד", name:"שם", lore:"משפט", stack:"בערימה", rarity:"נדירות", job:"בשביל מה", price:"מחיר", where:"איפה משיגים" };
function parseSuggestion(text){
  if (!text || !text.trim()) return { error:"עוד לא העתקתם את התשובה של ג׳מיני. בג׳מיני לוחצים על כפתור ההעתקה שמתחת לתשובה." };
  let raw = null;
  const m = text.match(/```\s*studio\s*([\s\S]*?)```/i) || text.match(/```\s*(?:json)?\s*(\{[\s\S]*?"items"[\s\S]*?\})\s*```/i);
  if (m) raw = m[1]; else { const a = text.indexOf("{"), b = text.lastIndexOf("}"); if (a >= 0 && b > a && /"items"/.test(text.slice(a, b))) raw = text.slice(a, b + 1); }
  if (!raw) return { error:"בתשובה של ג׳מיני אין שינוי לעיצוב. אם רציתם שינוי, כתבו לו: ״תשלח את השינוי כבלוק studio״." };
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
  let j; try { j = JSON.parse(m[1]); } catch(e){ return { error:"ג׳מיני שלח בלוקים שבורים. כתבו לו: ״הבלוקים שלך לא תקינים, תשלח אותם שוב״." }; }
  const B = window.STUDIO_BLOCKS, r = B.toBlocks(j);
  if (r.error){ const what = String(r.error).split(":")[0];
    return { error: { mob:"ג׳מיני השתמש ביצור שאין בסטודיו.", effect:"ג׳מיני השתמש באפקט שאין בסטודיו.", sound:"ג׳מיני השתמש בצליל שאין בסטודיו.", act:"ג׳מיני המציא בלוק שלא קיים." }[what] || "ג׳מיני שלח בלוקים שהסטודיו לא מכיר. כתבו לו: ״תשתמש רק בבלוקים מהרשימה״." }; }
  return { program: j, before: B.readable(it.power), after: B.readable(j) };
}
function suggestion(){
  if (S.sugg.program) return `<div class="st-sg"><b>ג׳מיני מציע גרסה משופרת לבלוקים:</b>
    <div class="sg-ba"><div><small>עכשיו</small><pre>${esc(S.sugg.before.join("\n") || "—")}</pre></div><div><small>אחרי</small><pre>${esc(S.sugg.after.join("\n"))}</pre></div></div>
    <div class="st-acts"><button class="btn go" id="sg-ok">לקבל</button><button class="btn ghost" id="sg-no">לא, תודה</button></div></div>`;
  return `<div class="st-sg"><b>ג׳מיני מציע:</b>${S.sugg.changes.map(c => `<div class="sg-it"><span class="sg-h">${c.isNew ? "חפץ חדש: " : ""}${esc((c.cur && c.cur.name) || c.ch.name || c.id)}</span><ul>${Object.keys(c.ch).map(k => `<li><span>${FIELDS[k] || k}</span>${c.cur && c.cur[k] !== undefined && c.cur[k] !== "" ? `<s>${esc(show(k, c.cur[k]))}</s> ← ` : ""}<b>${esc(show(k, c.ch[k]))}</b></li>`).join("")}</ul></div>`).join("")}
    <div class="st-acts"><button class="btn go" id="sg-ok">לקבל</button><button class="btn ghost" id="sg-no">לא, תודה</button></div></div>`;
}
function bindSuggestion(app){
  const ok = app.querySelector("#sg-ok"), no = app.querySelector("#sg-no"); if (!ok) return;
  ok.addEventListener("click", () => {
    if (S.sugg.program){ const it = S.world.items[S.sel]; window.STUDIO_BLOCKS.loadInto(it, S.sugg.program); S.sugg = null; S.msg = "הבלוקים של ג׳מיני נכנסו. אפשר לשנות אותם, ולהחזיר את הקודמים ב״גרסאות״."; save(); rerender(app); return; }
    S.sugg.changes.forEach(c => { if (c.isNew) S.world.items.push(Object.assign({ id:c.id, name:"", lore:"", stack:64, rarity:"common", px:[] }, c.ch)); else Object.assign(c.cur, c.ch); });
    S.sugg = null; S.msg = "השינוי נכנס לעיצוב."; save(); rerender(app); });
  no.addEventListener("click", () => { S.sugg = null; app.querySelector("#st-sugg").innerHTML = ""; });
}

/* ---------- styles ---------- */
const CSS = `
.studio .st-kinds{display:flex;gap:6px;margin-top:14px}
.studio .st-kinds button{font:inherit;font-weight:800;font-size:1.05rem;padding:8px 20px;border:2px solid var(--line);border-radius:999px;background:var(--surface);color:var(--muted);cursor:pointer}
.studio .st-kinds button.on{border-color:var(--grass);background:var(--grass-soft);color:var(--ink)}
.studio .st-wide{margin-top:14px}
.studio .bk-list{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:12px 16px;border-bottom:1px solid var(--line);background:var(--bg)}
.studio .bk-list .st-card{flex:none;max-width:200px;background:var(--surface);border-color:var(--line)}
.studio .bk-list .st-card.on{border-color:var(--grass);background:var(--grass-soft)}
.studio .bk-prev{align-items:center}
.studio .st-prev.bk-prev canvas{width:96px;height:104px;image-rendering:pixelated;flex:none}
.studio .dm,.studio .pt{display:grid;gap:14px}
.studio .pt section{display:grid;gap:8px;padding:12px 14px;border:1px solid var(--line);border-radius:10px;background:var(--surface)}
.studio .pt h3{margin:0;font-size:1.05rem}
.studio .pt-prev{display:grid;place-items:center;padding:12px;border-radius:8px;background:#3a3a3a}
.studio #pt-view{width:200px;height:200px;image-rendering:pixelated}
.studio .dm section{display:grid;gap:8px;padding:12px 14px;border:1px solid var(--line);border-radius:10px;background:var(--surface)}
.studio .dm h3{margin:0;font-size:1.05rem}
.studio .dm-top{display:flex;gap:16px;flex-wrap:wrap;align-items:flex-start;justify-content:space-between}
.studio #dm-view{width:480px;max-width:100%;height:auto;aspect-ratio:2/1;border-radius:8px;border:3px solid #373737;image-rendering:pixelated;background:#78a7ff}
.studio .dm-shapes{display:flex;flex-wrap:wrap;gap:8px}
.studio .dm-shapes button{display:grid;justify-items:center;gap:4px;width:118px;padding:8px;font:inherit;font-weight:700;border:2px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);cursor:pointer}
.studio .dm-shapes svg{width:64px;height:40px;fill:#5d8c3a;background:#bcdcff;border-radius:4px}
.studio .dm-shapes button.on,.studio .dm-plants button.on{border-color:var(--grass);background:var(--grass-soft);outline:2px solid var(--grass)}
.studio .dm-layers{display:flex;flex-wrap:wrap;gap:12px}
.studio .dm-layers>div{display:grid;gap:4px;font-weight:700;color:var(--muted)}
.studio .dm-cur{display:flex;gap:8px;align-items:center;min-width:170px;padding:5px 10px 5px 6px;font:inherit;font-weight:700;border:2px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);cursor:pointer}
.studio .dm-cur.on,.studio .dm-cur:hover{border-color:var(--grass)}
.studio .dm-cur .rc-pic{width:32px;height:32px}
.studio .dm-cur small{font-size:.9rem;unicode-bidi:plaintext}
.studio .dm-pal{padding:10px;border:2px solid var(--grass);border-radius:10px;background:var(--bg)}
.studio .dm-sky label{display:flex;gap:6px;align-items:center;font-weight:700}
.studio .dm-sky input[type=color]{width:46px;height:34px;padding:0;border:2px solid var(--line);border-radius:6px;background:none;cursor:pointer}
.studio .dm-skies{display:flex;flex-wrap:wrap;gap:6px}
.studio .dm-skies button{width:34px;height:34px;border:2px solid var(--line);border-radius:6px;cursor:pointer}
.studio .dm-plants{display:flex;flex-wrap:wrap;gap:8px}
.studio .dm-plants button{display:grid;justify-items:center;gap:2px;width:112px;padding:6px 4px;font:inherit;border:2px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);cursor:pointer}
.studio .dm-plants .rc-pic{width:32px;height:32px}
.studio .dm-plants small{font-size:.72rem;color:var(--muted);text-align:center;unicode-bidi:plaintext}
.studio .st-top{display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.studio .st-wn{display:flex;gap:8px;align-items:center;font-weight:700;color:var(--muted)}
.studio .st-wn input{font:inherit;font-size:1.1rem;font-weight:700;color:var(--ink);padding:4px 10px;border:2px solid transparent;border-bottom-color:var(--line);border-radius:6px;background:transparent;width:16em;max-width:60vw}
.studio .st-wn input:hover,.studio .st-wn input:focus{border-color:var(--grass);outline:none;background:var(--bg)}
.studio .st-main{display:grid;grid-template-columns:210px 1fr;gap:16px;margin-top:14px;align-items:start}
.wrap.studio{padding-top:16px}
.studio .st-list{display:grid;gap:8px;align-content:start;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:12px}
.studio .st-list h2{font-size:1.05rem;margin:0}
.studio .st-cards{display:grid;gap:4px}
.studio .st-card{display:flex;gap:8px;align-items:center;text-align:start;font:inherit;font-weight:700;padding:5px 6px;border:2px solid transparent;border-radius:6px;background:transparent;color:var(--ink);cursor:pointer}
.studio .st-card:hover{background:var(--bg)}
.studio .st-card.on{border-color:var(--grass);background:var(--grass-soft)}
.studio .st-card span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.studio .st-dot{width:10px;height:10px;border-radius:50%;flex:none;background:var(--grass)}
.studio .st-dot.warn{background:var(--xp)}
.studio .st-dot.bad{background:var(--red)}
.studio .st-th{image-rendering:pixelated;background:#8B8B8B;border:2px solid;border-color:#373737 #fff #fff #373737;flex:none}
.studio .st-edit{background:var(--surface);border:1px solid var(--line);border-radius:10px;overflow:hidden}
.studio .st-empty{display:grid;place-content:center;text-align:center;min-height:300px;color:var(--muted);padding:20px}
.studio .st-panes{display:flex;border-bottom:1px solid var(--line);background:var(--bg)}
.studio .st-panes button{font:inherit;font-weight:800;padding:12px 18px;border:0;border-bottom:4px solid transparent;background:transparent;color:var(--muted);cursor:pointer}
.studio .st-panes button.on{color:var(--ink);border-bottom-color:var(--grass);background:var(--surface)}
.studio .st-pane{padding:16px}
.studio .st-foot{display:flex;gap:10px;align-items:center;flex-wrap:wrap;border-top:1px solid var(--line);padding:12px 16px;background:var(--bg)}
.studio .st-check{flex:1;min-width:200px}
.studio .st-check .ok{color:var(--grass)}
.studio .st-check .warn{color:var(--xp)}
.studio .st-check .bad{color:var(--red)}
.studio .st-del{color:var(--muted);border-color:transparent}
.studio .st-grid{display:grid;grid-template-columns:auto 1fr;gap:22px}
.studio .st-paint{display:grid;gap:10px;justify-items:center;align-content:start}
.studio #st-c{width:320px;height:320px;max-width:80vw;max-height:80vw;border:3px solid var(--ink);touch-action:none;cursor:crosshair;image-rendering:pixelated}
.studio .st-pal{display:grid;grid-template-columns:repeat(9,28px);gap:4px}
.studio .st-pal button{width:28px;height:28px;border:2px solid var(--ink);border-radius:4px;cursor:pointer;padding:0}
.studio .st-pal button.on{outline:3px solid var(--grass);outline-offset:1px}
.studio .st-pal input{width:28px;height:28px;padding:0;border:2px solid var(--ink);border-radius:4px}
.studio .st-tools{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
.studio .st-tools .btn{padding:.35em .8em}
.studio .st-tools .btn.on{background:var(--grass-soft);border-color:var(--grass)}
.studio .st-fields{display:grid;gap:14px;align-content:start}
.studio .st-fields label{display:grid;gap:4px;font-weight:700}
.studio .st-fields input{font:inherit;font-weight:400;padding:8px 10px;border:2px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink)}
.studio .st-fields input:focus{border-color:var(--grass);outline:none}
.studio .st-fields label small{font-weight:400;color:var(--muted)}
.studio .st-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-weight:700}
.studio .st-row input{width:70px}
.studio .chs{display:flex;gap:6px;flex-wrap:wrap}
.studio .chs button{font:inherit;font-size:.95rem;font-weight:800;padding:.2em .7em;border:2px solid var(--line);border-radius:999px;background:var(--surface);color:var(--ink);cursor:pointer}
.studio .chs button.on{background:var(--grass);color:var(--grass-ink);border-color:var(--grass)}
.studio .chs button i{display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--rc);border:1px solid var(--ink);margin-inline-end:6px}
.studio .st-prev{display:flex;gap:14px;align-items:center;background:#3a3a3a;border-radius:8px;padding:12px}
.studio .st-prev .tip{font-size:1.1rem}
.studio .st-prev .sl{width:56px;height:56px;background:#8B8B8B;border:3px solid;border-color:#373737 #fff #fff #373737;padding:5px;display:grid;flex:none}
.studio .st-prev canvas{width:100%;height:100%;image-rendering:pixelated}
.studio .st-lead{margin:0 0 10px;color:var(--muted)}
.studio .st-ex{border:1px solid var(--line);border-radius:8px;padding:8px 12px;margin-bottom:12px;background:var(--bg)}
.studio .st-ex summary{cursor:pointer;font-weight:800}
.studio .st-ex > small{color:var(--muted)}
.studio .st-exs{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px;margin:10px 0 6px}
.studio .st-exs button{display:grid;gap:2px;text-align:start;font:inherit;padding:8px 10px;border:2px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);cursor:pointer}
.studio .st-exs button:hover{border-color:var(--grass)}
.studio .st-exs small{color:var(--muted);line-height:1.35}
.studio #st-blk{height:460px;border:1px solid var(--line);border-radius:8px;overflow:hidden;direction:ltr}
.studio .st-noblk{padding:16px;color:var(--red)}
.studio .st-lint{margin:10px 0 0;padding:0;list-style:none;display:grid;gap:4px}
.studio .st-lint:empty{display:none}
.studio .st-lint li{background:var(--xp-soft);border-inline-start:4px solid var(--xp);border-radius:4px;padding:6px 10px;font-weight:700}
.studio .st-gcards{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.studio .st-gcard{display:grid;gap:8px;align-content:start;border:1px solid var(--line);border-radius:8px;padding:14px;background:var(--bg)}
.studio .st-gcard h3{font-size:1.1rem;margin:0}
.studio .st-gcard p{margin:0}
.studio .st-gcard small{color:var(--muted)}
.studio .st-intent{display:grid;gap:4px;font-weight:700}
.studio .st-intent textarea{font:inherit;font-weight:400;padding:8px 10px;border:2px solid var(--line);border-radius:6px;background:var(--surface);color:var(--ink);resize:vertical}
.studio .st-back{margin-top:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;font-weight:700}
.studio #st-sugg:not(:empty){margin-top:12px}
.studio .st-sg{border:3px solid var(--sky);border-radius:8px;padding:12px;display:grid;gap:8px;background:var(--sky-soft)}
.studio .sg-h{font-weight:800}
.studio .sg-ba{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.studio .sg-ba pre{margin:4px 0 0;white-space:pre-wrap;background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:8px;font-family:var(--body);font-size:.95rem;line-height:1.5}
.studio .st-sg ul{margin:4px 0 0;padding-inline-start:20px}
.studio .st-sg li span{color:var(--muted);margin-inline-end:8px}
.studio .st-sg s{color:var(--muted)}
.studio .st-acts{display:flex;gap:10px;flex-wrap:wrap}
.studio .st-status{flex-basis:100%;font-weight:700;color:var(--grass)}
.studio .st-status:empty{display:none}
.studio .st-status.bad{color:var(--red)}
.studio .tip{background:rgba(16,0,16,.94);border:3px solid;border-image:linear-gradient(#5000FF,#28007F) 1;padding:.35em .7em;display:grid;gap:.1em;text-align:start;color:#fff}
.studio .tip b{font-family:var(--display);font-weight:400}
.studio .tip span{color:#AAAAAA}
/* studio pieces inside a lesson step */
.st-embed{display:grid;gap:14px}
.st-embed .st-grid-f{grid-template-columns:1fr auto;align-items:start}
.st-embed .st-hint{color:var(--muted)}
.st-embed .st-status{min-height:1.4em}
.studio .st-wn-big{display:grid;gap:6px;color:var(--ink);font-size:1.05rem}
.studio .st-wn-big input{font-size:1.4rem;border:2px solid var(--line);background:var(--surface);width:100%;max-width:520px}
.studio .st-cardv{display:grid;gap:12px;justify-items:start}
.studio .st-readable{border:2px solid var(--line);border-radius:8px;padding:10px 14px;background:var(--surface)}
.studio .st-readable b{color:var(--muted);font-size:.9rem}
.studio .st-readable pre{margin:4px 0 0;font-family:var(--body);font-size:1.1rem;font-weight:700;line-height:1.6;white-space:pre-wrap}
.studio .st-itemc .st-prev{padding:16px 18px}
.studio .st-itemc .sl{width:96px;height:96px;padding:8px}
.studio .st-itemc .tip{font-size:1.35rem}
.studio .st-cardv{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:start;justify-items:stretch}
.studio #st-blk-ro .blocklyScrollbarHorizontal,.studio #st-blk-ro .blocklyScrollbarVertical{display:none}
.studio .st-code{display:grid;gap:6px}
.studio .st-code b{color:var(--muted)}
.studio #st-blk-ro{height:210px;border:1px solid var(--line);border-radius:10px;overflow:hidden;direction:ltr;background:#fff}
.studio .st-nocode{color:var(--muted);align-self:center}
.st-embed .st-status{font-size:.9rem;color:var(--muted)}
.st-embed .st-status.bad{color:var(--red);font-size:1rem}
@media (max-width:900px){.studio .st-cardv{grid-template-columns:1fr}}
.st-loading{color:var(--muted)}
/* the Crafting Table */
.studio .rc{display:grid;gap:14px;justify-items:start}
.studio .rc-table{direction:ltr;display:flex;align-items:center;gap:18px;background:#C6C6C6;border:3px solid;border-color:#fff #555 #555 #fff;border-radius:4px;padding:14px 18px}
.studio .rc-grid{display:grid;grid-template-columns:repeat(3,58px);gap:4px}
.studio .rc-slot{width:58px;height:58px;box-sizing:border-box;background:#8B8B8B;border:3px solid;border-color:#373737 #fff #fff #373737;padding:6px;display:grid;place-items:center;position:relative;font:inherit;cursor:pointer}
.studio .rc-slot:not([disabled]):hover{background:#a3a3a3}
.studio .rc-slot[disabled]{cursor:default;color:inherit}
.studio .rc-res{width:72px;height:72px;padding:8px;cursor:default}
.studio .rc-outw{display:grid;justify-items:center;gap:3px}
.studio .rc-res{cursor:pointer}
.studio .rc-who{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:8px}
.studio .rc-who>span{font-weight:700}
.studio .rc-who button{display:inline-flex;align-items:center;gap:6px;padding:4px 10px 4px 6px;border:2px solid var(--line);border-radius:999px;background:var(--surface);color:inherit;font:inherit;cursor:pointer}
.studio .rc-who button.on{border-color:var(--grass);background:var(--grass-soft,#1f3a1c);font-weight:700}
.studio .rc-who .st-th{width:20px!important;height:20px!important}
.studio .rc-outw>small{font-weight:700;color:#3f3f3f;font-size:.8rem}
.studio .rc-onm{display:grid;place-items:center;height:100%;font-size:.75rem;font-weight:700;color:#1d1d1d;text-align:center;line-height:1.1;word-break:break-word}
.st-first{display:grid;gap:4px;margin:0;padding:12px 14px;border-radius:8px;background:var(--gold-soft,#3a3214);border:2px solid var(--gold,#F2C200)}
.studio .rc-res b{position:absolute;bottom:2px;right:5px;color:#fff;font-family:var(--display);font-weight:400;font-size:1.1rem;text-shadow:2px 2px 0 #3f3f3f}
.studio .rc-res .st-th{width:100%!important;height:100%!important;border:0;background:transparent}
.studio .rc-arrow{font-size:2rem;color:#8B8B8B}
.studio .rc-pic{display:grid;place-items:center;width:100%;height:100%}
.studio .rc-pic img{width:100%;height:100%;image-rendering:pixelated}
.studio .rc-pic em{font-style:normal;font-size:.7rem;font-weight:800;color:#222;direction:ltr}
.studio .rc-pic .st-th{width:100%!important;height:100%!important;border:0;background:transparent}
.studio .rc-need{display:flex;gap:8px 14px;flex-wrap:wrap;align-items:baseline;font-weight:700}
.studio .rc-need span{unicode-bidi:plaintext}
.studio .rc-need .rc-gets{color:var(--grass)}
.studio .rc-need small{color:var(--muted)}
.studio .rc-any{display:flex;gap:6px;align-items:center;font-weight:700}
.studio .rc-pal{display:grid;gap:10px;width:100%}
.studio .rc-grp{display:grid;gap:4px}
.studio .rc-grp > b{font-size:.95rem;color:var(--muted)}
.studio .rc-grp > div,.studio .rc-tools{display:flex;flex-wrap:wrap;gap:6px}
.studio .rc-ing{display:grid;justify-items:center;gap:2px;width:76px;padding:5px 3px;font:inherit;border:2px solid var(--line);border-radius:8px;background:var(--surface);color:var(--ink);cursor:pointer}
.studio .rc-ing:hover{border-color:var(--grass)}
.studio .rc-ing.on{border-color:var(--grass);background:var(--grass-soft);outline:2px solid var(--grass)}
.studio .rc-ing .rc-pic{width:32px;height:32px}
.studio .rc-ing small{font-size:.72rem;line-height:1.15;text-align:center;unicode-bidi:plaintext;overflow:hidden;max-width:100%}
.studio .rc-erase{font-size:1.4rem;color:var(--red)}
.studio .rc-tools{align-items:center}
.studio .rc-q{flex:1;min-width:180px;font:inherit;font-size:1rem;padding:8px 12px;border:2px solid var(--line);border-radius:999px;background:var(--surface);color:var(--ink)}
.studio .rc-q:focus{outline:none;border-color:var(--grass)}
.studio .rc-tabs{display:flex;flex-wrap:wrap;gap:6px}
.studio .rc-tabs:empty{display:none}
.studio .rc-tabs button{font:inherit;font-size:.9rem;font-weight:700;padding:.25em .8em;border:2px solid var(--line);border-radius:999px;background:var(--surface);color:var(--ink);cursor:pointer}
.studio .rc-tabs button.on{border-color:var(--grass);background:var(--grass-soft)}
.studio .rc-list{display:flex;flex-wrap:wrap;gap:6px;align-content:flex-start;max-height:360px;overflow:auto;padding:2px}
.studio .rc-list > .rc-grp{flex-basis:100%}
.studio .rc-none{margin:6px 2px;color:var(--muted)}
.studio .mcs{--s:32px;display:block;width:var(--s);height:var(--s);background:url(mc_items.png) no-repeat;background-size:calc(var(--s) * 40) auto;
  background-position:calc(var(--c) * var(--s) * -1) calc(var(--r) * var(--s) * -1);image-rendering:pixelated}
.studio .rc-slot .mcs{--s:40px}
.studio .rc-lint:empty{display:none}
@media (max-width:900px){.studio .st-main,.studio .st-grid,.studio .st-gcards,.st-embed .st-grid-f{grid-template-columns:1fr}}
`;
window.STUDIO = { render, CSS, addReady, mount: mountPart, flush, blocks: () => S.world ? blocksOf() : [], check: () => S.world ? S.world.items.map(it => ({ name: it.name, id: it.id, hard: check(it).hard })) : [], item: tag => S.world && S.world.items.find(t => t.tag === tag || t.id === tag), reset: () => { S.loaded = false; S.sel = -1; S.sugg = null; S.pane = ""; } };
})();
