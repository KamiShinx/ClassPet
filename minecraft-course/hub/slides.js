/* Interactive slides for the teacher page: Minecraft in 3D, things you click and drag, live votes, a countdown and the
   class board. Loaded by teacher.html after content.js. Every picture is a real Minecraft texture, hub/mc_<name>.png,
   copied out of the installed game by setup/update-hub.ps1 (never in the repo); our own drawings only show when one
   is missing.

   How the state works: one ctx object per deck (votes, flips, rotations, timers...) and one board object for the class
   world and the class item. STAGE.apply(root, ctx, board) paints that state onto any copy of a slide (the console
   preview, the projector window, the full-screen view). STAGE.bind(root, ctx, board, changed) makes a copy clickable;
   changed() tells the teacher page to save and repaint the other copies. */
(function(){
"use strict";
const H = window.HUB, esc = H.esc;

/* ---------- textures ---------- */
const T = n => `mc_${n}.png`;
const NOMC = `onerror="this.closest('[data-mcw]')&&this.closest('[data-mcw]').classList.add('nomc')"`;
const img = (n, cls) => `<img src="${T(n)}" alt="" class="${cls||""}" ${NOMC}>`;
// A missing texture leaves its 3D face blank; this probe marks the whole widget so a flat fallback can show instead.
const probe = n => `<img class="probe" src="${T(n)}" alt="" ${NOMC}>`;

/* ---------- 3D: a block ---------- */
const CUBES = {
  grass:{ top:"block_grass_block_top", side:"block_grass_block_side", bottom:"block_dirt", tint:"#79C05A", name:"Grass Block", drop:"block_dirt" },
  stone:{ all:"block_stone", name:"Stone", drop:"block_cobblestone" },
  log:{ top:"block_oak_log_top", side:"block_oak_log", bottom:"block_oak_log_top", name:"Oak Log" },
  sand:{ all:"block_sand", name:"Sand" },
  diamond:{ all:"block_diamond_ore", name:"Diamond Ore", dropItem:"item_diamond" },
  tnt:{ top:"block_tnt_top", side:"block_tnt_side", bottom:"block_tnt_bottom", name:"TNT" },
  table:{ top:"block_crafting_table_top", side:"block_crafting_table_side", front:"block_crafting_table_front", bottom:"block_oak_planks", name:"Crafting Table" },
  planks:{ all:"block_oak_planks", name:"Oak Planks" },
  obsidian:{ all:"block_obsidian", name:"Obsidian" }
};
function cube(id, k, opts){
  const c = CUBES[k], o = opts || {};
  const f = side => c.all || (side === "top" ? c.top : side === "bottom" ? c.bottom : (side === "front" && c.front) || c.side);
  const face = (cls, side) => `<i class="f ${cls}" style="background-image:url(${T(f(side))})${side==="top"&&c.tint?`;--tint:${c.tint}`:""}"></i>`;
  return `<figure class="cb ${o.mine?"mine":""}" data-c="rot" data-id="${id}" ${o.mine?`data-mine="${id}"`:""} data-mcw>
    <div class="cube3"><div class="rig">${face("ft","front")}${face("bk","side")}${face("rt","side")}${face("lf","side")}${face("tp"+(c.tint?" tint":""),"top")}${face("bt","bottom")}</div>
    ${o.mine ? `<div class="drop">${c.dropItem ? img(c.dropItem) : `<div class="rig mini">${face("ft","front")}${face("rt","side")}${face("tp"+(c.tint?" tint":""),"top")}</div>`}</div>` : ""}</div>
    ${probe(f("side"))}${o.label===false?"":`<figcaption>${c.name}</figcaption>`}</figure>`;
}

/* ---------- 3D: a mob, built from its skin texture like the game does ---------- */
// box: [u, v, w, h, d, x, y, z, pivot?]  (texels; y grows downwards from the top of the head)
const MOBS3 = {
  steve:{ tex:"entity_player_wide_steve", tw:64, th:64, name:"Steve", parts:[
    [0,0,8,8,8, 0,4,0], [16,16,8,12,4, 0,14,0], [40,16,4,12,4, -6,14,0,"arm"], [32,48,4,12,4, 6,14,0,"arm2"], [0,16,4,12,4, -2,26,0,"leg"], [16,48,4,12,4, 2,26,0,"leg2"] ] },
  zombie:{ tex:"entity_zombie_zombie", tw:64, th:64, name:"Zombie", parts:[
    [0,0,8,8,8, 0,4,0], [16,16,8,12,4, 0,14,0], [40,16,4,12,4, -6,14,0,"zarm"], [40,16,4,12,4, 6,14,0,"zarm"], [0,16,4,12,4, -2,26,0,"leg"], [0,16,4,12,4, 2,26,0,"leg2"] ] },
  creeper:{ tex:"entity_creeper_creeper", tw:64, th:32, name:"Creeper", parts:[
    [0,0,8,8,8, 0,10,0], [16,16,8,12,4, 0,20,0], [0,16,4,6,4, -2,29,-4,"leg"], [0,16,4,6,4, 2,29,-4,"leg2"], [0,16,4,6,4, -2,29,4,"leg2"], [0,16,4,6,4, 2,29,4,"leg"] ] },
  skeleton:{ tex:"entity_skeleton_skeleton", tw:64, th:32, name:"Skeleton", parts:[
    [0,0,8,8,8, 0,4,0], [16,16,8,12,4, 0,14,0], [40,16,2,12,2, -5,14,0,"zarm"], [40,16,2,12,2, 5,14,0,"zarm"], [0,16,2,12,2, -2,26,0,"leg"], [0,16,2,12,2, 2,26,0,"leg2"] ] },
  enderman:{ tex:"entity_enderman_enderman", eyes:"entity_enderman_enderman_eyes", tw:64, th:32, name:"Enderman", parts:[
    [0,0,8,8,8, 0,-10,0], [32,16,8,12,4, 0,0,0], [56,0,2,30,2, -5,9,0,"arm"], [56,0,2,30,2, 5,9,0,"arm2"], [56,0,2,30,2, -2,21,0,"leg"], [56,0,2,30,2, 2,21,0,"leg2"] ] }
};
function box3(tex, tw, th, b, eyes){
  const [u,v,w,h,d] = b;
  const face = (cls, fu, fv, fw, fh) => `<i class="f ${cls}" style="--w:${fw};--h:${fh};background-image:${eyes?`url(${T(eyes)}),`:""}url(${T(tex)});background-size:calc(${tw}*var(--p)) calc(${th}*var(--p));background-position:calc(${-fu}*var(--p)) calc(${-fv}*var(--p))"></i>`;
  return `<div class="bx" style="--bw:${w};--bh:${h};--bd:${d}">`
    + face("ft", u+d, v+d, w, h) + face("bk", u+d+w+d, v+d, w, h)
    + face("rt", u, v+d, d, h) + face("lf", u+d+w, v+d, d, h)
    + face("tp", u+d, v, w, d) + face("bt", u+d+w, v, w, d) + `</div>`;
}
function mob(id, k, opts){
  const m = MOBS3[k], o = opts || {};
  // Each part hangs from its top (shoulder, hip, neck), so arms and legs swing from there.
  const parts = m.parts.map(p => `<div class="pt" style="--x:${p[5]};--y:${p[6]};--z:${p[7]};--ph:${p[3]}"><div class="sw ${p[8]||""}">${box3(m.tex, m.tw, m.th, p, k==="enderman"&&p===m.parts[0]?m.eyes:null)}</div></div>`).join("");
  return `<figure class="mb mb-${k}" data-c="rot" data-id="${id}" data-mcw><div class="mob3"><div class="rig">${parts}</div></div>${probe(m.tex)}
    <span class="flat">${H.mobFace ? "" : ""}</span>${o.label===false?"":`<figcaption>${m.name}</figcaption>`}</figure>`;
}

/* ---------- day and night ---------- */
function dayNight(id){
  const ground = Array.from({length:12}, () => `<i style="background-image:url(${T("block_grass_block_side")})"></i>`).join("");
  const stars = Array.from({length:22}, (_, i) => `<b style="left:${(i*37)%97}%;top:${(i*53)%55}%"></b>`).join("");
  return `<div class="dn" data-c="dn" data-id="${id}">
    <div class="sky"><div class="stars">${stars}</div>
      <div class="orb sun">${img("environment_celestial_sun")}</div><div class="orb moon">${img("environment_celestial_moon_full_moon")}</div></div>
    <div class="walkers">${mob(id+"z1","zombie",{label:false})}${mob(id+"z2","skeleton",{label:false})}${mob(id+"z3","zombie",{label:false})}${mob(id+"z4","creeper",{label:false})}</div>
    <div class="ground">${ground}</div><div class="shade"></div>
    <input type="range" min="0" max="100" value="0" aria-label="יום ולילה" class="dn-r">
  </div>`;
}

/* ---------- the portal: Overworld, Nether, End ---------- */
const WORLDS = [ { k:"plains", name:"Overworld" }, { k:"nether", name:"Nether" }, { k:"end", name:"End" } ];
function portal(id){
  const frame = Array.from({length:4*5}, (_, i) => { const x = i % 4, y = Math.floor(i / 4); const edge = x === 0 || x === 3 || y === 0 || y === 4;
    return edge ? `<i style="background-image:url(${T("block_obsidian")})"></i>` : `<i class="pp"></i>`; }).join("");
  return `<div class="ptl" data-c="pt" data-id="${id}">
    <button class="frame" aria-label="לעבור עולם">${frame}</button>
    <div class="worlds">${WORLDS.map((w, i) => `<figure data-w="${i}">${H.sceneSVG(w.k)}<figcaption>${w.name}</figcaption></figure>`).join("")}</div>
    <div class="flash"></div></div>`;
}

/* ---------- hotbar and Minecraft tooltips ---------- */
const RAR = { common:"#FFFFFF", uncommon:"#FFFF55", rare:"#55FFFF", epic:"#FF55FF" };
function tooltip(name, lines, rarity){
  return `<div class="tip"><b style="color:${RAR[rarity||"common"]}">${name}</b>${(lines||[]).map(l => `<span>${l}</span>`).join("")}</div>`;
}
function hotbar(id, items){
  return `<div class="hb" data-c="hb" data-id="${id}">
    <div class="tips">${items.map((it, i) => `<div class="tw" data-i="${i}">${tooltip(it.name, it.lines, it.r)}</div>`).join("")}</div>
    <div class="bar">${items.map((it, i) => `<button class="sl" data-i="${i}" aria-label="${esc(it.name)}">${it.tex ? img(it.tex) : it.html}</button>`).join("")}</div></div>`;
}

/* ---------- click to reveal, flip cards, votes, timer ---------- */
const flip = (id, front, back, cls) => `<button class="fl ${cls||""}" data-c="rv" data-id="${id}"><span class="fa">${front}</span><span class="fb">${back}</span></button>`;
function vote(id, opts){
  return `<div class="vt" data-c="vt" data-id="${id}">${opts.map((o, i) => `<button class="vo" data-i="${i}"><span class="l">${o.l}</span><span class="t">${o.t}</span><span class="bar"><i></i></span><span class="n">0</span></button>`).join(`<span class="or">או</span>`)}</div>`;
}
const timer = (id, sec) => `<button class="tm" data-c="tm" data-id="${id}" data-sec="${sec}"><span class="d">${fmt(sec*1000)}</span></button>`;
function fmt(ms){ const t = Math.max(0, Math.ceil(ms/1000)); return String(Math.floor(t/60)).padStart(2,"0") + ":" + String(t%60).padStart(2,"0"); }

/* ---------- sorting game ---------- */
function sortGame(id, buckets, items){
  return `<div class="so" data-c="so" data-id="${id}">
    <div class="pool">${items.map((it, i) => `<button class="it" data-i="${i}" aria-label="${esc(it.name)}">${img(it.tex)}</button>`).join("")}</div>
    <div class="bks">${buckets.map((b, j) => `<div class="bk"><b>${b}</b><div class="in">${items.map((it, i) => it.b === j ? `<span class="got" data-i="${i}">${img(it.tex)}<small>${it.name}</small></span>` : "").join("")}</div></div>`).join("")}</div></div>`;
}

/* ---------- zoom from hotbar size to 16x16 ---------- */
const zoom = (id, tex) => `<div class="zm" data-c="zm" data-id="${id}"><div class="win"><div class="pic">${img(tex)}<i class="grid"></i></div></div><input type="range" min="0" max="100" value="0" aria-label="זום" class="zm-r"></div>`;

/* ---------- the class board (lives across slides, saved on the teacher's laptop) ---------- */
const field = (key, ph, cls) => `<span class="fld ${cls||""}" data-f="${key}" data-ph="${esc(ph)}"></span>`;
const DYES = ["#F9FFFE","#9D9D97","#474F52","#1D1D21","#835432","#B02E26","#F9801D","#FED83D","#80C71F","#5E7C16","#169C9C","#3AB3DA","#3C44AA","#8932B8","#C74EBD","#F38BAA"];
const colors3 = () => `<div class="c3s" data-c="colors"><div class="pick">${[0,1,2].map(i => `<button class="sw3" data-k="${i}"></button>`).join("")}</div>
  <div class="dyes">${DYES.map(c => `<button class="dy" data-col="${c}" style="background:${c}" aria-label="${c}"></button>`).join("")}</div></div>`;
const chips = (key, opts) => `<div class="chs" data-c="chips" data-f="${key}">${opts.map(o => `<button data-v="${esc(o)}">${o}</button>`).join("")}</div>`;
function paint16(){
  return `<div class="p16" data-c="p16"><div class="grid16">${"<i></i>".repeat(256)}</div>
    <div class="dyes">${DYES.map(c => `<button class="dy" data-col="${c}" style="background:${c}" aria-label="${c}"></button>`).join("")}<button class="dy er" data-col="" aria-label="מחק">×</button></div></div>`;
}
// The class item as it looks in the game: its picture in a slot, and its tooltip.
const classItem = () => `<div class="ci" data-c="ci"><div class="tip"><b class="ci-n"></b><span class="ci-l"></span></div><div class="sl big"><canvas width="16" height="16"></canvas></div></div>`;
const worldCard = () => `<div class="wc2" data-c="wc">
  <div class="r"><small>העולם שלנו</small>${field("idea","...")}</div>
  <div class="r"><small>הצבעים</small><span class="cols"><i></i><i></i><i></i></span></div>
  <div class="r"><small>רואים רק שם</small>${field("only","...")}</div>
  <div class="r"><small>זה כמו</small><span>${field("like","...")} <em>חוץ מזה ש</em>${field("except","...")}</span></div>
  <div class="r"><small>החוק</small>${field("rule","...")}</div>
  <div class="r"><small>ולכן</small>${field("conseq","...")}</div>
  <div class="r"><small>התעלומה</small>${field("mystery","...")}</div></div>`;

/* ======================================================================================
   STATE: paint and bind
   ====================================================================================== */
function getV(o, k, d){ return o && o[k] !== undefined ? o[k] : d; }
function apply(root, ctx, board){
  if (!root) return;
  ctx.rot = ctx.rot || {}; ctx.rv = ctx.rv || {}; ctx.vt = ctx.vt || {}; ctx.tm = ctx.tm || {}; ctx.dn = ctx.dn || {};
  ctx.pt = ctx.pt || {}; ctx.hb = ctx.hb || {}; ctx.so = ctx.so || {}; ctx.zm = ctx.zm || {}; ctx.mine = ctx.mine || {};
  root.querySelectorAll('[data-c="rot"]').forEach(el => applyRot(el, ctx));
  root.querySelectorAll("[data-mine]").forEach(el => el.classList.toggle("mined", !!ctx.mine[el.dataset.mine]));
  root.querySelectorAll('[data-c="rv"]').forEach(el => el.classList.toggle("on", !!ctx.rv[el.dataset.id]));
  root.querySelectorAll('[data-c="vt"]').forEach(el => {
    const n = ctx.vt[el.dataset.id] || [], max = Math.max(1, ...n.map(x => x || 0));
    el.querySelectorAll(".vo").forEach(b => { const c = n[+b.dataset.i] || 0; b.querySelector(".n").textContent = c; b.querySelector(".bar i").style.width = (c / max * 100) + "%"; b.classList.toggle("lead", c > 0 && c === max); });
  });
  root.querySelectorAll('[data-c="dn"]').forEach(el => applyDN(el, getV(ctx.dn, el.dataset.id, 0)));
  root.querySelectorAll('[data-c="pt"]').forEach(el => { const i = getV(ctx.pt, el.dataset.id, 0); el.querySelectorAll("[data-w]").forEach(w => w.classList.toggle("on", +w.dataset.w === i)); });
  root.querySelectorAll('[data-c="hb"]').forEach(el => { const i = getV(ctx.hb, el.dataset.id, -1);
    el.querySelectorAll(".sl").forEach(s => s.classList.toggle("on", +s.dataset.i === i)); el.querySelectorAll(".tw").forEach(s => s.classList.toggle("on", +s.dataset.i === i)); });
  root.querySelectorAll('[data-c="so"]').forEach(el => { const s = ctx.so[el.dataset.id] || {};
    el.querySelectorAll(".it").forEach(b => b.classList.toggle("gone", !!s[b.dataset.i])); el.querySelectorAll(".got").forEach(g => g.classList.toggle("on", !!s[g.dataset.i])); });
  root.querySelectorAll('[data-c="zm"]').forEach(el => applyZoom(el, getV(ctx.zm, el.dataset.id, 0)));
  tick(root, ctx);
  applyBoard(root, board);
}
function applyRot(el, ctx){
  const r = ctx.rot[el.dataset.id];
  el.classList.toggle("held", !!r);
  if (r){ el.style.setProperty("--ry", r.y + "deg"); el.style.setProperty("--rx", r.x + "deg"); }
}
function applyDN(el, v){
  const t = v / 100;
  el.style.setProperty("--t", t);
  const mix = (a, b, k) => a.map((x, i) => Math.round(x + (b[i] - x) * k));
  const day = [120,167,255], dusk = [242,140,91], night = [11,16,48];
  const c = t < .5 ? mix(day, dusk, t*2) : mix(dusk, night, (t-.5)*2);
  el.style.setProperty("--sky", `rgb(${c.join(",")})`);
  const r = el.querySelector(".dn-r"); if (r && document.activeElement !== r && r.ownerDocument.activeElement !== r) r.value = v;
}
function applyZoom(el, v){
  const t = v / 100; el.style.setProperty("--z", t);
  el.classList.toggle("gridon", t > .55);
  const r = el.querySelector(".zm-r"); if (r && r.ownerDocument.activeElement !== r) r.value = v;
}
function tick(root, ctx){
  if (!root) return;
  root.querySelectorAll('[data-c="tm"]').forEach(el => {
    const s = ctx.tm && ctx.tm[el.dataset.id], sec = +el.dataset.sec;
    const left = !s ? sec*1000 : s.end ? s.end - Date.now() : s.left;
    el.querySelector(".d").textContent = fmt(left);
    el.classList.toggle("run", !!(s && s.end && left > 0));
    el.classList.toggle("done", left <= 0);
  });
}
function applyBoard(root, board){
  root.querySelectorAll("[data-f].fld").forEach(el => {
    if (el.ownerDocument.activeElement === el) return;
    const v = board[el.dataset.f] || "";
    el.textContent = v || el.dataset.ph; el.classList.toggle("empty", !v);
  });
  root.querySelectorAll('[data-c="colors"]').forEach(el => { const c = board.colors || [];
    el.querySelectorAll(".sw3").forEach(s => { const x = c[+s.dataset.k]; s.style.background = x || ""; s.classList.toggle("empty", !x); }); });
  root.querySelectorAll('[data-c="wc"] .cols i').forEach((s, i) => { const x = (board.colors || [])[i % 3]; s.style.background = x || ""; s.classList.toggle("empty", !x); });
  root.querySelectorAll('[data-c="chips"]').forEach(el => el.querySelectorAll("button").forEach(b => b.classList.toggle("on", board[el.dataset.f] === b.dataset.v)));
  root.querySelectorAll('[data-c="p16"]').forEach(el => { const px = board.px || [];
    el.querySelectorAll(".grid16 i").forEach((c, i) => { c.style.background = px[i] || ""; });
    el.querySelectorAll(".dy").forEach(d => d.classList.toggle("on", (board.brush === undefined ? "#1D1D21" : board.brush) === d.dataset.col)); });
  root.querySelectorAll('[data-c="ci"]').forEach(el => {
    el.querySelector(".ci-n").textContent = board.iname || "?";
    el.querySelector(".ci-l").textContent = board.ilore || "";
    drawPx(el.querySelector("canvas"), board.px);
  });
  root.querySelectorAll("canvas.pxc").forEach(c => drawPx(c, board.px));
}
function drawPx(cv, px){
  if (!cv) return; const g = cv.getContext("2d"); g.clearRect(0, 0, 16, 16);
  (px || []).forEach((c, i) => { if (c){ g.fillStyle = c; g.fillRect(i % 16, Math.floor(i / 16), 1, 1); } });
}

function bind(root, ctx, board, changed){
  const doc = root.ownerDocument;
  // drag to turn a block or a mob
  root.querySelectorAll('[data-c="rot"]').forEach(el => {
    let sx = 0, sy = 0, base = null, moved = false;
    el.addEventListener("pointerdown", e => { if (e.button) return; sx = e.clientX; sy = e.clientY; moved = false;
      const r = ctx.rot[el.dataset.id] || { x:-18, y:spinNow(el) }; base = { x:r.x, y:r.y }; el.setPointerCapture(e.pointerId); });
    el.addEventListener("pointermove", e => { if (!base) return; const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) + Math.abs(dy) > 4) moved = true; if (!moved) return;
      ctx.rot[el.dataset.id] = { y: base.y + dx * .6, x: Math.max(-80, Math.min(80, base.x - dy * .6)) }; changed("rot", el.dataset.id); });
    el.addEventListener("pointerup", () => { const was = moved; base = null;
      if (!was && el.dataset.mine){ ctx.mine[el.dataset.mine] = !ctx.mine[el.dataset.mine]; changed("mine"); }
      else if (!was && ctx.rot[el.dataset.id]){ delete ctx.rot[el.dataset.id]; changed("rot", el.dataset.id); } });
  });
  root.querySelectorAll('[data-c="rv"]').forEach(el => el.addEventListener("click", () => { ctx.rv[el.dataset.id] = !ctx.rv[el.dataset.id]; changed("rv"); }));
  root.querySelectorAll('[data-c="vt"]').forEach(el => el.querySelectorAll(".vo").forEach(b => {
    const bump = d => { const n = ctx.vt[el.dataset.id] = ctx.vt[el.dataset.id] || []; n[+b.dataset.i] = Math.max(0, (n[+b.dataset.i] || 0) + d); changed("vt"); };
    b.addEventListener("click", e => bump(e.shiftKey ? -1 : 1));
    b.addEventListener("contextmenu", e => { e.preventDefault(); bump(-1); });
  }));
  root.querySelectorAll('[data-c="tm"]').forEach(el => el.addEventListener("click", () => {
    const id = el.dataset.id, sec = +el.dataset.sec, s = ctx.tm[id];
    if (!s) ctx.tm[id] = { end: Date.now() + sec*1000 };
    else if (s.end){ const left = s.end - Date.now(); ctx.tm[id] = left > 0 ? { left } : null; if (!ctx.tm[id]) delete ctx.tm[id]; }
    else ctx.tm[id] = { end: Date.now() + s.left };
    changed("tm");
  }));
  root.querySelectorAll('[data-c="dn"] .dn-r').forEach(r => r.addEventListener("input", () => { ctx.dn[r.closest('[data-c="dn"]').dataset.id] = +r.value; changed("dn"); }));
  root.querySelectorAll('[data-c="zm"] .zm-r').forEach(r => r.addEventListener("input", () => { ctx.zm[r.closest('[data-c="zm"]').dataset.id] = +r.value; changed("zm"); }));
  root.querySelectorAll('[data-c="pt"]').forEach(el => el.querySelector(".frame").addEventListener("click", () => {
    const id = el.dataset.id; ctx.pt[id] = (getV(ctx.pt, id, 0) + 1) % WORLDS.length;
    el.classList.remove("go"); void el.offsetWidth; el.classList.add("go"); changed("pt");
  }));
  root.querySelectorAll('[data-c="hb"] .sl').forEach(s => s.addEventListener("click", () => { const id = s.closest('[data-c="hb"]').dataset.id;
    ctx.hb[id] = getV(ctx.hb, id, -1) === +s.dataset.i ? -1 : +s.dataset.i; changed("hb"); }));
  root.querySelectorAll('[data-c="so"] .it').forEach(b => b.addEventListener("click", () => { const id = b.closest('[data-c="so"]').dataset.id;
    const s = ctx.so[id] = ctx.so[id] || {}; s[b.dataset.i] = true; changed("so"); }));
  root.querySelectorAll('[data-c="so"] .got').forEach(b => b.addEventListener("click", () => { const id = b.closest('[data-c="so"]').dataset.id;
    const s = ctx.so[id] = ctx.so[id] || {}; delete s[b.dataset.i]; changed("so"); }));
  // the class board: type straight onto the slide
  root.querySelectorAll("[data-f].fld").forEach(el => {
    el.contentEditable = "plaintext-only"; if (el.contentEditable !== "plaintext-only") el.contentEditable = "true";
    el.spellcheck = false;
    el.addEventListener("focus", () => { if (el.classList.contains("empty")){ el.textContent = ""; el.classList.remove("empty"); } });
    el.addEventListener("input", () => { board[el.dataset.f] = el.textContent.trim(); changed("board"); });
    el.addEventListener("blur", () => applyBoard(root, board));
    el.addEventListener("keydown", e => { e.stopPropagation(); if (e.key === "Enter" || e.key === "Escape"){ e.preventDefault(); el.blur(); } });
  });
  root.querySelectorAll('[data-c="colors"]').forEach(el => {
    el.querySelectorAll(".dy").forEach(d => d.addEventListener("click", () => { const c = (board.colors || []).filter(Boolean); if (c.length >= 3) c.shift(); c.push(d.dataset.col); board.colors = c; changed("board"); }));
    el.querySelectorAll(".sw3").forEach(s => s.addEventListener("click", () => { const c = (board.colors || []).slice(); c.splice(+s.dataset.k, 1); board.colors = c; changed("board"); }));
  });
  root.querySelectorAll('[data-c="chips"]').forEach(el => el.querySelectorAll("button").forEach(b => b.addEventListener("click", () => {
    board[el.dataset.f] = board[el.dataset.f] === b.dataset.v ? "" : b.dataset.v; changed("board"); })));
  root.querySelectorAll('[data-c="p16"]').forEach(el => {
    el.querySelectorAll(".dy").forEach(d => d.addEventListener("click", () => { board.brush = d.dataset.col; changed("board"); }));
    const cells = [...el.querySelectorAll(".grid16 i")];
    let down = false, erase = false;
    const paintAt = e => { const t = doc.elementFromPoint(e.clientX, e.clientY); const i = cells.indexOf(t); if (i < 0) return;
      const px = board.px = board.px || Array(256).fill(""); const col = erase ? "" : (board.brush === undefined ? "#1D1D21" : board.brush);
      if (px[i] !== col){ px[i] = col; changed("board"); } };
    const g = el.querySelector(".grid16");
    g.addEventListener("pointerdown", e => { down = true; erase = e.button === 2; g.setPointerCapture(e.pointerId); paintAt(e); e.preventDefault(); });
    g.addEventListener("pointermove", e => { if (down) paintAt(e); });
    g.addEventListener("pointerup", () => { down = false; });
    g.addEventListener("contextmenu", e => e.preventDefault());
  });
}
// Where an auto-spinning block is right now, so grabbing it doesn't make it jump.
function spinNow(el){
  const rig = el.querySelector(".rig"); if (!rig) return 30;
  const m = getComputedStyle(rig).transform; if (!m || m === "none") return 30;
  const v = m.match(/matrix3d\(([^)]+)\)/); if (!v) return 30;
  const a = v[1].split(",").map(Number); return Math.round(Math.atan2(a[8], a[0]) * 180 / Math.PI) * -1;
}

/* ======================================================================================
   STYLES
   ====================================================================================== */
const CSS = `
.slide [data-mcw]{position:relative}
.slide .probe{display:none!important}
.slide .row3{display:flex;gap:clamp(14px,3cqw,44px);justify-content:center;align-items:flex-end;flex-wrap:wrap;width:100%}
.slide .lead2{font-size:clamp(1.1rem,2.3cqw,1.7rem);color:var(--muted);max-width:32em}
.slide .duo{display:grid;grid-template-columns:1fr 1fr;gap:clamp(14px,3cqw,40px);align-items:center;width:100%}
.slide .duo>*{min-width:0}
/* 3D blocks */
.cb{margin:0;display:grid;justify-items:center;gap:10px;cursor:grab;touch-action:none;user-select:none;--s:clamp(70px,13cqw,170px)}
.cb.big{--s:clamp(120px,24cqw,300px)}
.cb figcaption,.mb figcaption{font-family:var(--display);font-size:clamp(.95rem,1.7cqw,1.3rem)}
.cube3{width:calc(var(--s)*1.6);height:calc(var(--s)*1.6);display:grid;place-items:center;perspective:calc(var(--s)*6);position:relative}
.cube3 .rig{position:relative;width:var(--s);height:var(--s);transform-style:preserve-3d;transform:rotateX(-22deg) rotateY(30deg);animation:spin 14s linear infinite}
.cb.held .rig,.mb.held .rig{animation:none;transform:rotateX(var(--rx)) rotateY(var(--ry))}
@keyframes spin{from{transform:rotateX(-22deg) rotateY(0)}to{transform:rotateX(-22deg) rotateY(-360deg)}}
.cube3 .f{position:absolute;inset:0;background-size:100% 100%;image-rendering:pixelated;backface-visibility:hidden}
.cube3 .ft{transform:translateZ(calc(var(--s)/2))}
.cube3 .bk{transform:rotateY(180deg) translateZ(calc(var(--s)/2))}
.cube3 .rt{transform:rotateY(90deg) translateZ(calc(var(--s)/2));filter:brightness(.8)}
.cube3 .lf{transform:rotateY(-90deg) translateZ(calc(var(--s)/2));filter:brightness(.8)}
.cube3 .tp{transform:rotateX(90deg) translateZ(calc(var(--s)/2));filter:brightness(1.08)}
.cube3 .bt{transform:rotateX(-90deg) translateZ(calc(var(--s)/2));filter:brightness(.6)}
.cube3 .tint{background-color:var(--tint);background-blend-mode:multiply}
.cb .drop{position:absolute;inset:0;display:none;place-items:center}
.cb .drop>img{width:calc(var(--s)*.42);image-rendering:pixelated;animation:bob 1.6s ease-in-out infinite}
.cb .drop .rig.mini{width:calc(var(--s)*.3);height:calc(var(--s)*.3);animation:spin 3s linear infinite,bob 1.6s ease-in-out infinite;--s:calc(var(--s)*.3)}
.cb .drop .rig.mini .f{transform-origin:center}
.cb.mined>.cube3>.rig{transform:scale(0)!important;transition:transform .25s ease-in;animation:none}
.cb.mined .drop{display:grid}
@keyframes bob{0%,100%{translate:0 0}50%{translate:0 -12%}}
/* 3D mobs */
.mb{margin:0;display:grid;justify-items:center;gap:8px;cursor:grab;touch-action:none;user-select:none;--p:clamp(3.4px,.62cqw,8.4px)}
.mb.small{--p:clamp(1.6px,.3cqw,4px)}
.mob3{width:calc(var(--p)*30);height:calc(var(--p)*38);display:grid;place-items:center;perspective:calc(var(--p)*200)}
.mb-enderman .mob3{height:calc(var(--p)*48)}
.mob3 .rig{position:relative;width:0;height:0;transform-style:preserve-3d;transform:rotateX(-10deg) rotateY(25deg);animation:mspin 18s linear infinite;translate:0 calc(var(--p)*-16)}
.mb-creeper .mob3 .rig{translate:0 calc(var(--p)*-19)}
.mb-enderman .mob3 .rig{translate:0 calc(var(--p)*-8)}
@keyframes mspin{from{transform:rotateX(-10deg) rotateY(0)}to{transform:rotateX(-10deg) rotateY(-360deg)}}
.mob3 .pt{position:absolute;transform-style:preserve-3d;transform:translate3d(calc(var(--x)*var(--p)),calc((var(--y) - var(--ph)/2)*var(--p)),calc(var(--z)*var(--p)))}
.mob3 .sw{position:absolute;transform-style:preserve-3d}
.mob3 .bx{position:absolute;transform-style:preserve-3d}
.mob3 .f{position:absolute;width:calc(var(--w)*var(--p));height:calc(var(--h)*var(--p));left:calc(var(--w)*var(--p)/-2);top:calc(var(--h)*var(--p)/-2);image-rendering:pixelated;background-repeat:no-repeat;backface-visibility:hidden}
.mob3 .ft{transform:translateZ(calc(var(--bd)*var(--p)/2))}
.mob3 .bk{transform:rotateY(180deg) translateZ(calc(var(--bd)*var(--p)/2))}
.mob3 .rt{transform:rotateY(-90deg) translateZ(calc(var(--bw)*var(--p)/2));filter:brightness(.82)}
.mob3 .lf{transform:rotateY(90deg) translateZ(calc(var(--bw)*var(--p)/2));filter:brightness(.82)}
.mob3 .tp{transform:rotateX(90deg) translateZ(calc(var(--bh)*var(--p)/2))}
.mob3 .bt{transform:rotateX(-90deg) translateZ(calc(var(--bh)*var(--p)/2));filter:brightness(.6)}
/* arms and legs swing from the top */
.mob3 .sw>.bx{transform:translateY(calc(var(--ph)*var(--p)/2))}
.mob3 .zarm{rotate:x 90deg}
.mob3 .leg{animation:walk 1.2s ease-in-out infinite}
.mob3 .leg2{animation:walk 1.2s ease-in-out infinite reverse}
.mob3 .arm{animation:walk 1.2s ease-in-out infinite reverse}
.mob3 .arm2{animation:walk 1.2s ease-in-out infinite}
@keyframes walk{0%,100%{rotate:x 22deg}50%{rotate:x -22deg}}
.mb .flat{display:none}
/* day and night */
.dn{position:relative;width:min(980px,100%);aspect-ratio:16/8;border:3px solid var(--ink);border-radius:8px;overflow:hidden;background:var(--sky,rgb(120,167,255));transition:background .3s}
.dn .sky{position:absolute;inset:0}
.dn .stars b{position:absolute;width:3px;height:3px;background:#fff;opacity:calc((var(--t,0) - .55)*2.4)}
.dn .orb{position:absolute;width:13%;left:43.5%;top:6%;transform-origin:50% 420%;image-rendering:pixelated;mix-blend-mode:screen}
.dn .orb img{width:100%;image-rendering:pixelated;display:block;mix-blend-mode:screen}
.dn .sun{rotate:calc(var(--t,0)*180deg)}
.dn .moon{rotate:calc(var(--t,0)*180deg - 180deg);width:16%;left:42%}
.dn .sun img{rotate:calc(var(--t,0)*-180deg)}
.dn .moon img{rotate:calc(180deg - var(--t,0)*180deg)}
.dn .ground{position:absolute;left:0;right:0;bottom:0;height:16%;display:grid;grid-template-columns:repeat(12,1fr)}
.dn .ground i{background-size:100% 100%;image-rendering:pixelated;aspect-ratio:1}
.dn .shade{position:absolute;inset:0;background:#06081C;opacity:calc(var(--t,0)*.45);pointer-events:none}
.dn .walkers{position:absolute;left:0;right:0;bottom:15%;display:flex;justify-content:space-around;align-items:flex-end;opacity:calc((var(--t,0) - .55)*3);z-index:1;pointer-events:none}
.dn .walkers .mb{--p:clamp(1.8px,.36cqw,4.6px)}
.dn .walkers .mob3{height:calc(var(--p)*34)}
.dn .dn-r{position:absolute;bottom:3%;left:50%;translate:-50% 0;width:40%;z-index:3;accent-color:#FED83D}
body.aud .dn .dn-r{display:none}
/* portal */
.ptl{position:relative;display:grid;grid-template-columns:auto 1fr;gap:clamp(14px,3cqw,40px);align-items:center;width:min(1000px,100%)}
.ptl .frame{display:grid;grid-template-columns:repeat(4,1fr);width:clamp(110px,18cqw,220px);padding:0;border:0;background:none;cursor:pointer}
.ptl .frame i{aspect-ratio:1;background-size:100% 100%;image-rendering:pixelated}
.ptl .frame .pp{background-image:url(mc_block_nether_portal.png);background-size:100% 3200%;animation:portal 1.6s steps(32) infinite;opacity:.9}
@keyframes portal{from{background-position:0 0}to{background-position:0 100%}}
.ptl .worlds{position:relative;aspect-ratio:16/10}
.ptl .worlds figure{position:absolute;inset:0;margin:0;display:grid;gap:8px;opacity:0;transition:opacity .4s}
.ptl .worlds figure.on{opacity:1}
.ptl .worlds .mc{width:100%;border:3px solid var(--ink);border-radius:6px;overflow:hidden}
.ptl .worlds figcaption{font-family:var(--display);font-size:clamp(1.3rem,3cqw,2.4rem)}
.ptl .flash{position:absolute;inset:0;background:radial-gradient(#B455E0,#4B1C7A);opacity:0;pointer-events:none;border-radius:8px}
.ptl.go .flash{animation:flash .7s ease-out}
@keyframes flash{0%{opacity:.85}100%{opacity:0}}
/* hotbar */
.hb{display:grid;gap:10px;justify-items:center;width:100%}
.hb .tips{min-height:clamp(64px,10cqw,120px);display:grid;place-items:end center;width:100%}
.hb .tw{display:none}.hb .tw.on{display:block}
.tip{background:rgba(16,0,16,.94);border:3px solid;border-image:linear-gradient(#5000FF,#28007F) 1;padding:.45em .8em;display:grid;gap:.15em;text-align:right;font-size:clamp(1rem,2.2cqw,1.7rem);box-shadow:0 0 0 2px #100010;max-width:min(640px,90cqw)}
.tip b{font-family:var(--display);font-weight:400}
.tip span{color:#AAAAAA}
.tip span.pu{color:#A85CF0;font-style:italic}
.hb .bar{display:flex;background:#555;border:3px solid #222;padding:3px;gap:0}
.hb .sl,.ci .sl{width:clamp(50px,8.4cqw,96px);aspect-ratio:1;background:#8B8B8B;border:3px solid;border-color:#373737 #fff #fff #373737;padding:clamp(4px,.9cqw,10px);display:grid;place-items:center;cursor:pointer}
.hb .sl img,.ci .sl canvas{width:100%;height:100%;image-rendering:pixelated;object-fit:contain}
.hb .sl.on{outline:4px solid #fff;outline-offset:-1px;position:relative;z-index:1;transform:scale(1.08)}
/* flip cards */
.fl{border:0;background:none;padding:0;perspective:900px;display:grid;cursor:pointer;font:inherit;color:inherit;min-width:0}
.fl>span{grid-area:1/1;backface-visibility:hidden;transition:transform .5s;border:3px solid var(--ink);border-radius:8px;box-shadow:0 4px 0 var(--ink);padding:clamp(10px,1.6cqw,20px);display:grid;gap:6px;place-content:center;font-size:clamp(1rem,2cqw,1.5rem);min-height:clamp(70px,10cqw,130px);background:var(--surface)}
.fl .fa{font-weight:700}
.fl .fb{transform:rotateY(180deg);background:var(--grass-soft);font-weight:700}
.fl.on .fa{transform:rotateY(-180deg)}.fl.on .fb{transform:rotateY(0)}
.fl .q{font-family:var(--display);font-size:2em;color:var(--muted);line-height:1}
.fl small{font-weight:400;color:var(--muted);font-size:.8em}
.fls{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:clamp(10px,2cqw,20px);width:100%}
/* votes */
.vt{display:grid;grid-template-columns:1fr auto 1fr;gap:16px;width:100%;align-items:stretch}
.vt .or{align-self:center;font-family:var(--display);color:var(--muted);font-size:clamp(1rem,2cqw,1.6rem)}
.vo{border:3px solid var(--ink);border-radius:8px;background:var(--surface);box-shadow:0 5px 0 var(--ink);padding:1em;display:grid;gap:.4em;text-align:right;font:inherit;color:inherit;cursor:pointer;font-size:clamp(1.05rem,2.3cqw,1.8rem);font-weight:700}
.vo .l{font-family:var(--display);font-weight:400;color:var(--grass);font-size:1.6em;line-height:1}
.vo .bar{height:12px;background:var(--sunk);border-radius:6px;overflow:hidden}
.vo .bar i{display:block;height:100%;width:0;background:var(--grass);transition:width .3s}
.vo .n{font-family:var(--display);font-weight:400;font-size:1.3em}
.vo.lead{border-color:var(--grass);box-shadow:0 5px 0 var(--grass)}
/* timer */
.tm{border:3px solid var(--ink);border-radius:10px;background:var(--console);color:var(--console-ink);font-family:var(--mono);font-size:clamp(2rem,7cqw,5rem);padding:.1em .6em;cursor:pointer;line-height:1.2}
.tm.run{color:#9BE36D}.tm.done{color:#FF6B57;animation:blink 1s steps(2) infinite}
@keyframes blink{50%{opacity:.35}}
/* sorting */
.so{display:grid;gap:clamp(12px,2.4cqw,26px);width:100%}
.so .pool{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;min-height:clamp(56px,8cqw,96px)}
.so .it{width:clamp(52px,8cqw,92px);aspect-ratio:1;background:#8B8B8B;border:3px solid;border-color:#373737 #fff #fff #373737;padding:6px;cursor:pointer}
.so .it img,.so .got img{width:100%;image-rendering:pixelated}
.so .it.gone{visibility:hidden}
.so .bks{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.so .bk{border:3px solid var(--ink);border-radius:8px;background:var(--surface);padding:10px;display:grid;gap:8px;align-content:start;min-height:clamp(110px,16cqw,200px)}
.so .bk b{font-family:var(--display);font-weight:400;font-size:clamp(1.1rem,2.4cqw,1.8rem)}
.so .in{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
.so .got{display:none;width:clamp(46px,6.6cqw,76px);text-align:center;cursor:pointer}
.so .got.on{display:grid;animation:pop .35s}
.so .got small{font-size:clamp(.6rem,1cqw,.85rem);line-height:1.1}
@keyframes pop{from{transform:scale(.3)}to{transform:none}}
/* zoom */
.zm{display:grid;gap:12px;justify-items:center}
.zm .win{width:clamp(200px,34cqw,400px);aspect-ratio:1;display:grid;place-items:center;background:var(--slot-in);border:3px solid var(--ink);border-radius:6px;overflow:hidden}
.zm .pic{position:relative;width:calc(8% + var(--z,0)*92%);aspect-ratio:1}
.zm .pic img{width:100%;height:100%;image-rendering:pixelated;display:block}
.zm .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(0,0,0,.35) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.35) 1px,transparent 1px);background-size:6.25% 6.25%;opacity:0;transition:opacity .3s}
.zm.gridon .grid{opacity:1}
.zm .zm-r{width:clamp(200px,34cqw,400px);accent-color:var(--grass)}
body.aud .zm .zm-r{visibility:hidden}
.zm .n256{font-family:var(--display);font-size:clamp(2rem,6cqw,4.5rem);color:var(--grass);opacity:var(--z,0)}
/* class board */
.fld{display:inline-block;min-width:4ch;border-bottom:3px solid var(--grass);color:var(--ink);font-weight:800;padding:0 .2em;outline:none;cursor:text}
.fld.empty{color:var(--muted);font-weight:400}
.fld:focus{background:var(--grass-soft)}
body.aud .fld{cursor:default}
.board{display:grid;gap:clamp(8px,1.6cqw,16px);width:min(900px,100%);text-align:right;font-size:clamp(1.15rem,2.6cqw,2rem);background:var(--surface);border:3px solid var(--grass);border-radius:10px;padding:clamp(12px,2cqw,24px);box-shadow:0 5px 0 var(--grass)}
.board .tag{font-size:.6em;color:var(--grass);font-weight:800;letter-spacing:.03em}
.c3s{display:grid;gap:12px;justify-items:center}
.c3s .pick{display:flex;gap:14px}
.sw3{width:clamp(56px,9cqw,110px);aspect-ratio:1;border:4px solid var(--ink);border-radius:8px;cursor:pointer}
.sw3.empty{background:repeating-linear-gradient(45deg,var(--sunk) 0 8px,var(--surface) 8px 16px)!important}
.dyes{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;max-width:min(560px,92cqw)}
.dy{width:clamp(26px,3.6cqw,42px);aspect-ratio:1;border:3px solid var(--ink);border-radius:4px;cursor:pointer;padding:0;font-weight:800}
.dy.on{outline:3px solid var(--grass);outline-offset:2px}
.dy.er{background:var(--surface)}
body.aud .dyes{visibility:hidden}
.chs{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.chs button{border:3px solid var(--ink);border-radius:999px;background:var(--surface);font:inherit;font-weight:800;padding:.2em .9em;cursor:pointer;font-size:clamp(.95rem,1.9cqw,1.4rem)}
.chs button.on{background:var(--grass);color:var(--grass-ink);border-color:var(--grass)}
.p16{display:grid;gap:10px;justify-items:center}
.grid16{display:grid;grid-template-columns:repeat(16,1fr);width:clamp(200px,30cqw,360px);aspect-ratio:1;border:3px solid var(--ink);background:repeating-conic-gradient(var(--slot-in) 0 25%,var(--surface) 0 50%) 0 0/12.5% 12.5%;direction:ltr;touch-action:none;cursor:crosshair}
.grid16 i{border:1px solid rgba(0,0,0,.12)}
.ci{display:grid;gap:10px;justify-items:center}
.ci .sl.big{width:clamp(80px,13cqw,150px)}
.ci .ci-n{color:#FFFF55}
.ci .sl img{width:100%;height:100%;image-rendering:pixelated;object-fit:contain}
.fl .ico{width:clamp(40px,6cqw,72px);image-rendering:pixelated;justify-self:center}
.wc2{display:grid;gap:clamp(6px,1.2cqw,12px);width:min(900px,100%);text-align:right;font-size:clamp(1.05rem,2.3cqw,1.75rem);background:#F6EFD9;color:#2A1F12;border:4px solid #5A3E1B;border-radius:6px;padding:clamp(14px,2.4cqw,28px);box-shadow:0 6px 0 #5A3E1B}
.wc2 .r{display:grid;grid-template-columns:clamp(90px,15cqw,170px) 1fr;gap:12px;align-items:baseline;border-bottom:2px dotted #B59B6A;padding-bottom:6px}
.wc2 small{color:#7A5A2A;font-weight:800;font-size:.7em}
.wc2 .fld{color:#2A1F12;border-color:#B59B6A}
.wc2 .cols{display:flex;gap:10px}
.wc2 .cols i{width:1.6em;aspect-ratio:1;border:3px solid #2A1F12;border-radius:4px}
.wc2 .cols i.empty{background:repeating-linear-gradient(45deg,#E9DFC2 0 6px,#F6EFD9 6px 12px)}
.wc2 em{font-style:normal;color:#7A5A2A}
/* scenes made of real blocks */
.scene{display:grid;grid-template-columns:repeat(var(--cols),1fr);width:min(760px,100%);border:3px solid var(--ink);border-radius:6px;overflow:hidden;background:var(--air,#7EC0EE);position:relative}
.scene>i{aspect-ratio:1;background-size:100% 100%;image-rendering:pixelated;position:relative}
.scene>i.tint{background-color:#59A43A;background-blend-mode:multiply}
.scene .hot{position:absolute;z-index:2}
.pin{width:clamp(34px,5cqw,58px);aspect-ratio:1;border-radius:50%;border:3px solid #fff;background:var(--grass);color:#fff;font-family:var(--display);font-size:clamp(1rem,2.2cqw,1.6rem);display:grid;place-items:center;cursor:pointer;box-shadow:0 3px 8px rgba(0,0,0,.4)}
.pin .lbl{position:absolute;top:110%;white-space:nowrap;background:rgba(16,0,16,.92);color:#fff;font-family:var(--body);font-weight:700;padding:.15em .6em;border-radius:4px;font-size:clamp(.85rem,1.7cqw,1.25rem);opacity:0;transition:opacity .3s;pointer-events:none}
.pin.on .lbl{opacity:1}
.pin.on{background:#5000FF}
.scene .skel{left:70%;bottom:21%;display:flex;align-items:flex-end;pointer-events:none}
.scene .skel .mb{--p:clamp(1.6px,.34cqw,4.4px)}
.scene .skel .mob3 .rig{animation:none;transform:rotateX(-8deg) rotateY(-35deg) rotateZ(78deg);translate:0 0}
.scene .skel .swd{width:clamp(22px,4cqw,50px);image-rendering:pixelated;rotate:-40deg;margin-inline-start:-8px}
.hide{visibility:hidden}
.reveal-line{opacity:0;transition:opacity .4s}
.reveal-line.on{opacity:1}
.stk2{display:flex;gap:clamp(18px,4cqw,56px);justify-content:center;align-items:flex-end;flex-wrap:wrap;width:100%}
.stk2 figure{margin:0;display:grid;gap:8px;justify-items:center}
.stk2 .g{display:grid;gap:2px}
.stk2 .g img{width:100%;image-rendering:pixelated;display:block}
.stk2 figcaption{font-family:var(--display);font-size:clamp(1.4rem,3.2cqw,2.6rem);line-height:1}
.stk2 figcaption small{display:block;font-family:var(--body);font-size:.45em;color:var(--muted)}
.steps{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;width:100%;counter-reset:s}
.steps>div{border:3px solid var(--ink);border-radius:8px;background:var(--surface);padding:12px 10px;display:grid;gap:6px;justify-items:center;text-align:center;font-size:clamp(.9rem,1.7cqw,1.25rem);box-shadow:0 4px 0 var(--ink)}
.steps>div::before{counter-increment:s;content:counter(s);font-family:var(--display);color:var(--grass);font-size:1.8em;line-height:1}
.steps b{font-family:var(--display);font-weight:400;font-size:1.15em}
.steps .ico{width:clamp(40px,6cqw,72px);image-rendering:pixelated}
.steps .ico.k{font-family:var(--body);font-weight:800;font-size:clamp(.85rem,1.6cqw,1.2rem);border:2px solid var(--ink);border-radius:6px;padding:.2em .5em;width:auto;background:var(--grass-soft)}
.vid iframe{width:min(1100px,100%);aspect-ratio:16/9;border:0;border-radius:8px}
/* teacher area */
.tch .next{margin-top:18px;background:var(--surface);border:3px solid var(--grass);border-radius:10px;padding:18px;display:grid;gap:16px;box-shadow:0 5px 0 var(--grass)}
.tch .nh{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap}
.tch .nh small{color:var(--grass);font-weight:800}
.tch .nh h2{font-size:clamp(1.4rem,3vw,2rem)}
.tch .btn.big{font-size:1.25rem;padding:.6em 1.4em}
.tch .tl{display:flex;gap:4px;width:100%;overflow-x:auto}
.tch .tl>div{min-width:92px;border-top:8px solid var(--c);background:var(--bg);border-radius:4px;padding:8px;display:grid;gap:2px;align-content:start}
.tch .tl b{font-size:.95rem;line-height:1.25}
.tch .tl small{color:var(--muted);font-variant-numeric:tabular-nums;font-size:.8rem}
.tch .tl span{font-size:.8rem;color:var(--muted);line-height:1.3}
.tch .chk{display:grid;gap:10px}
.tch .ck{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:start}
.tch .ck>i{width:22px;height:22px;border-radius:50%;border:3px solid var(--line);margin-top:3px;display:grid;place-items:center}
.tch .ck.ok>i{background:var(--grass);border-color:var(--grass)}
.tch .ck.ok>i::after{content:"✓";color:#fff;font-style:normal;font-size:13px;font-weight:800}
.tch .ck.bad>i{background:var(--red);border-color:var(--red)}
.tch .ck.bad>i::after{content:"!";color:#fff;font-style:normal;font-size:13px;font-weight:800}
.tch .ck.man>i{border-style:dashed}
.tch .ck small{color:var(--muted);display:block}
.tch .lessons{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
.tch .ls{border:1px solid var(--line);border-radius:8px;padding:12px;display:grid;gap:4px;background:var(--bg)}
.tch .ls.cur{border:2px solid var(--grass)}
.tch .ls small{color:var(--muted)}
.tch .ls span{color:var(--muted);font-size:.9rem}
.tch .ls .btn{justify-self:start;margin-top:6px}
.tch .bview{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px}
.tch .bview div{background:var(--bg);border-radius:6px;padding:8px 10px;display:grid}
.tch .bview small{color:var(--muted);font-size:.8rem}
.tch details>summary{cursor:pointer;list-style:none}
.tch details>summary::-webkit-details-marker{display:none}
.tch details>summary h2{display:inline}
.tch details>summary::before{content:"+ ";font-weight:800;color:var(--grass)}
.tch details[open]>summary::before{content:"− "}
/* full-screen view on the teacher's laptop (projector mirrors the laptop) */
.fsv{position:fixed;inset:0;z-index:50;background:var(--bg);display:grid;grid-template-rows:1fr auto}
.fsv .stage{min-height:0;overflow:auto}
.fsv .fsbar{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:6px 14px;background:var(--surface);border-top:1px solid var(--line);font-size:.85rem;color:var(--muted)}
@media (prefers-reduced-motion:reduce){.cube3 .rig,.mob3 .rig{animation:none}}
`;

/* ---------- a scene for "what happened here?" made of real blocks ---------- */
const SB = { " ":"", g:"block_grass_block_top", G:"block_grass_block_side", d:"block_dirt", c:"block_cobblestone", m:"block_mossy_cobblestone",
  b:"block_stone_bricks", k:"block_cracked_stone_bricks", o:"block_obsidian", y:"block_crying_obsidian", r:"block_reinforced_deepslate_side", S:"block_sculk", D:"block_deepslate", n:"block_netherrack", s:"block_stone", l:"block_oak_leaves" };
function blockScene(rows, air, pins){
  const cols = rows[0].length;
  const cells = rows.join("").split("").map(ch => SB[ch] ? `<i ${ch==="l"?'class="tint"':""} style="background-image:url(${T(SB[ch])})"></i>` : `<i></i>`).join("");
  return `<div class="scene" style="--cols:${cols};--air:${air}">${cells}${pins||""}</div>`;
}
const pin = (id, n, label, x, y) => `<button class="pin hot" data-c="rv" data-id="${id}" style="left:${x}%;top:${y}%">${n}<span class="lbl">${label}</span></button>`;

/* ---------- items used in the deck ---------- */
const IT = {
  sword:{ tex:"item_diamond_sword", name:"Diamond Sword", lines:["+7 נזק"], r:"common" },
  bow:{ tex:"item_bow", name:"Bow", lines:["יורה חצים מרחוק"], r:"common" },
  pearl:{ tex:"item_ender_pearl", name:"Ender Pearl", lines:["זורקים, ועוברים לשם"], r:"common" },
  apple:{ tex:"item_golden_apple", name:"Golden Apple", lines:["מרפא, ונותן לבבות זהב"], r:"rare" },
  totem:{ tex:"item_totem_of_undying", name:"Totem of Undying", lines:["מציל ממוות, פעם אחת"], r:"uncommon" },
  elytra:{ tex:"item_elytra", name:"Elytra", lines:["כנפיים לרחף איתן"], r:"epic" },
  bread:{ tex:"item_bread", name:"Bread", lines:["אוכל פשוט"], r:"common" },
  compass:{ tex:"item_compass_00", name:"Compass", lines:["מצביע הביתה"], r:"common" },
  potato:{ tex:"item_poisonous_potato", name:"Poisonous Potato", lines:["...?"], r:"common" },
  pick:{ tex:"item_iron_pickaxe", name:"Iron Pickaxe" }, diamond:{ tex:"item_diamond", name:"Diamond" },
  rod:{ tex:"item_fishing_rod", name:"Fishing Rod" }, trident:{ tex:"item_trident", name:"Trident" }, beef:{ tex:"item_cooked_beef", name:"Steak" },
  emerald:{ tex:"item_emerald", name:"Emerald" }, mace:{ tex:"item_mace", name:"Mace" }
};
const hbItems = keys => keys.map(k => IT[k]);
const stackOf = (tex, n, cols, w) => `<div class="g" style="grid-template-columns:repeat(${cols},1fr);width:${w}">${img(tex).repeat(n)}</div>`;

/* ======================================================================================
   LESSON 2 DECK: Minecraft in 3D, worlds, items, page 2, into the game
   ====================================================================================== */
const DECK2 = [
  { label:"פתיחה", html:`<div class="eye">שיעור 2 · מודים למיינקראפט</div><div class="row3">${cube("o1","grass",{label:false})}${mob("o2","creeper",{label:false})}</div><h1>עולמות וחפצים</h1><p class="sub">היום החפץ שלכם נכנס למשחק.</p>`,
    notes:"0–1 דק׳. בשבוע שעבר: הסרטון ודף 1. היום: קודם מה זה בכלל העולם של מיינקראפט, אחר כך איך בונים עולם, איך ממציאים חפץ, ובסוף כל אחד מכניס חפץ משלו למשחק. גוררים את הקובייה או את ה־Creeper כדי לסובב אותם." },

  { label:"קוביות", html:`<h2>הכול כאן קוביות</h2><div class="row3">${["grass","stone","log","sand","diamond","tnt"].map((k, i) => cube("b"+i, k, {mine:true})).join("")}</div>`,
    notes:"1–2 דק׳. בשביל מי שלא שיחק: כל העולם בנוי מקוביות של מטר על מטר. שוברים כל קובייה, והיא הופכת לחפץ קטן שאוספים ובונים איתו במקום אחר. לוחצים על קובייה: היא נשברת וקופץ ממנה חפץ, בדיוק כמו במשחק. לחיצה נוספת מחזירה. שואלים: מה הייתם בונים מהן? מה יוצא מ־Diamond Ore?" },

  { label:"יצורים", html:`<h2>מי גר כאן?</h2><div class="row3">${mob("m1","steve")}${mob("m2","zombie")}${mob("m3","creeper")}${mob("m4","enderman")}</div>`,
    notes:"2–3 דק׳. Steve: זה אתם, השחקן. Zombie: תוקף, ויוצא רק בלילה. Creeper: מתגנב בשקט, ומתפוצץ. Enderman: שקט, עד שמסתכלים לו בעיניים. גוררים כל אחד כדי לסובב אותו. שואלים את מי ששיחק: ממי הכי מפחדים, ולמה? (שימו לב שכל אחד מזוהה מיד לפי הצורה והצבע.)" },

  { label:"יום ולילה", html:`<h2>יום ולילה</h2>${dayNight("dn1")}`,
    notes:"3–4 דק׳. מזיזים את המחוון שבתחתית התמונה לאט, מיום ללילה. בלילה יוצאים Zombies, Skeletons ו־Creepers. שואלים: מה עושים ביום? (בונים, אוספים.) ובלילה? (מסתתרים, או נלחמים.) זה חוק של העולם: הוא משנה מה השחקן עושה. נחזור לזה עוד מעט." },

  { label:"שלושה עולמות", html:`<h2>שלושה עולמות במשחק אחד</h2>${portal("p1")}`,
    notes:"4–5 דק׳. לוחצים על השער: עוברים מה־Overworld ל־Nether, ומשם ל־End. לכל עולם צבעים, יצורים וחוקים משלו. ב־Nether אין מים ואין לילה. ב־End יש דרקון. המשפט לסיום: עד סוף הקורס יהיה במשחק עוד עולם: שלכם." },

  { label:"מה קרה כאן?", html:`<h2>מה קרה כאן?</h2>${blockScene([
      "              ",
      "      yo      ",
      "     o  y     ",
      " b   o        ",
      " bk  y   o    ",
      " kb  oyoyo  m ",
      "GGGGGGGGGGGGGG",
      "dddddddddddddd"], "#9FC5E8",
      pin("w1",1,"חומה שבורה",8,32) + pin("w2",2,"שער לעולם אחר, הרוס",38,8) + pin("w3",3,"אבנים בוכות",62,50) + pin("w4",4,"מישהו השאיר כאן חרב",74,40)
      + `<div class="hot skel">${mob("wsk","skeleton",{label:false})}${img("item_iron_sword","swd")}</div>`)}
    <p class="sub reveal-line" data-c="rv" data-id="w5">אף אחד לא כתב כאן מילה. המקום סיפר את הסיפור.</p>`,
    notes:"5–8 דק׳. בלשים. שואלים: מה קרה כאן? לוחצים על המספרים אחד אחד, וכל פעם שואלים מה זה אומר. נותנים לשניים או שלושה לספר סיפור שלם: מי היה כאן, ולמה הכול הרוס? כל סיפור שונה, וכולם נכונים. בסוף לוחצים על השורה התחתונה (היא מופיעה). במשחק זה נקרא Ruined Portal: Mojang אף פעם לא הסבירו מי בנה אותו. בדיוק כמו ב־Diagon Alley: אף אחד לא הסביר, והבנו לבד." },

  { label:"משפט אחד", html:`<p class="quote">״ברברים על כלבי מלחמה, כולם בפרוות״</p><div class="fls">${flip("s1",'<span class="q">?</span>מה לובשים שם?',"פרוות. כולם.")}${flip("s2",'<span class="q">?</span>איזה חיות יש?',"כלבים, זאבים, דובים")}${flip("s3",'<span class="q">?</span>חם שם, או קר?',"קר. מאוד.")}</div>
    <div class="board"><span class="tag">העולם של הכיתה</span><span>${field("idea","העולם שלנו בכמה מילים")}</span></div>`,
    notes:"8–11 דק׳. קוראים את המשפט ושואלים את שלוש השאלות. הופכים כל כרטיס אחרי שענו. אף אחד לא סיפר להם, ובכל זאת הם יודעים: משפט אחד טוב עונה על המון שאלות. עכשיו בונים יחד עולם של הכיתה, שילווה אותנו עד סוף השיעור: לוחצים על השורה הירוקה ומקלידים את הרעיון שהכיתה בחרה. כמה הצעות, הצבעה מהירה, וכותבים. Enter מסיים." },

  { label:"שלושה צבעים", html:`<h2>שלושה צבעים. איזה עולם?</h2><div class="fls">${["nether","end","deep"].map((k, i) => flip("c"+i, `<span class="q">${"אבג"[i]}</span>${H.swatches(k)}`, `${H.sceneSVG(k)}<span>${H.SCENES[k].name}</span>`, "tall")).join("")}</div>`,
    notes:"11–13 דק׳. משחק ניחושים. רק מהצבעים. רמזים למי שצריך: א׳, תקרה במקום שמיים וחזירים שאוהבים זהב. ב׳, שמיים שחורים ויצורים גבוהים וסגולים. ג׳, מישהו ששומע כל צעד. לוחצים על כרטיס כדי להפוך אותו. המסקנה: זיהיתם עולם שלם משלושה ריבועים של צבע." },

  { label:"הצבעים שלנו", html:`<div class="duo"><div class="c3w"><h2>הצבעים של העולם שלנו</h2>${colors3()}</div><div class="board"><span class="tag">ומה רואים רק אצלנו?</span><span>${field("only","יצור, קובייה, צמח, בניין")}</span></div></div>`,
    notes:"13–14 דק׳. בוחרים יחד שלושה צבעים לעולם של הכיתה: לוחצים על צבע בפלטה (צבע רביעי מחליף את הראשון, לחיצה על ריבוע גדול מוחקת אותו). ודבר אחד שרואים רק בעולם שלנו. שואלים: אם מישהו נכנס לעולם שלנו, מה הדבר הראשון שהוא רואה?" },

  { label:"כמו... חוץ מ...", html:`<h2>ה־Nether: מיינקראפט, עם כמה דברים הפוכים</h2><div class="fls">${[["מים","זורמים","מתאדים מיד"],["מיטה","ישנים בה","מתפוצצת"],["למעלה","שמיים","תקרה של אבן"],["לילה","יש","אין"]].map((r, i) => flip("n"+i, `<b>${r[0]}</b><small>במיינקראפט הרגיל: ${r[1]}</small>`, `<b>${r[0]}</b>ב־Nether: ${r[2]}`)).join("")}</div>
    <div class="board"><span class="tag">העולם שלנו</span><span>זה כמו ${field("like","מקום מוכר")}, חוץ מזה ש${field("except","דבר אחד גדול שונה")}</span></div>`,
    notes:"14–16 דק׳. שואלים כרטיס אחרי כרטיס: מה קורה למים ב־Nether? ולמי שהולך לישון שם? הופכים אחרי שענו. ה־Nether לא הומצא מאפס: זה מיינקראפט, עם כמה דברים הפוכים. עכשיו העולם של הכיתה: כמו מה הוא, ומה הדבר הגדול ששונה בו? כותבים בשתי השורות." },

  { label:"חוקים", html:`<h2>חוקים משלו</h2><div class="fls">${flip("r1",`<span class="who">${H.mobFace("enderman")}</span><b>Enderman</b>`, `לא מסתכלים לו בעיניים.<small>אז הולכים עם הראש למטה.</small>`)}${flip("r2",`<span class="who">${H.mobFace("warden")}</span><b>Warden</b>`, `לא עושים רעש.<small>אז מתגנבים.</small>`)}${flip("r3",`<span class="who">${H.mobFace("piglin")}</span><b>Piglin</b>`, `מי שלובש זהב, הם לא תוקפים.<small>אז מחפשים זהב לפני שנכנסים.</small>`)}</div>`,
    notes:"16–17 דק׳. על כל אחד: מה החוק שלו? (הופכים.) ומה אתם עושים בגללו? בגלל החוק משחקים אחרת, וככה מזהים חוק טוב. ועוד: איך יודעים שהחוק קיים? ה־Enderman רועד וצועק, את ה־Warden שומעים מתקרב. לחוק טוב יש סימן שרואים או שומעים." },

  { label:"איזה חוק?", html:`<h2>איזה חוק יותר טוב?</h2>${vote("v1",[{l:"א",t:"בעולם שלי יורד שלג."},{l:"ב",t:"בעולם שלי, מי שעומד במקום קופא."}])}
    <div class="board"><span class="tag">החוק של העולם שלנו</span><span>${field("rule","מה אסור לעשות אצלנו? מה קורה רק אצלנו?")}</span></div>`,
    notes:"17–19 דק׳. הצבעה בהרמת יד: לוחצים על כל תשובה פעם אחת לכל יד (לחיצה ימנית מורידה). אחר כך: למה? א׳ הוא קישוט: השחקן עושה בדיוק מה שעשה קודם. ב׳ משנה את המשחק: אסור לעצור, אז איך בונים? איך נלחמים? עכשיו החוק של העולם שלנו: חוק שמשנה מה עושים בו. כותבים." },

  { label:"ולכן...", html:`<h2>ואם זה נכון, מה עוד משתנה?</h2><div class="fls">${flip("q1","<b>יש שם דרקונים</b>","אז אף אחד לא בונה בית מעץ.")}${flip("q2","<b>תמיד לילה</b>","אז לפיד שווה יותר מזהב.")}${flip("q3","<b>אין מים</b>","אז בקבוק מים הוא אוצר.")}</div>
    <div class="board"><span class="tag">בעולם שלנו, בגלל החוק</span><span>${field("conseq","מה עוד משתנה?")}</span></div>`,
    notes:"19–20 דק׳. יש דרקונים בעולם. מה האנשים שם עושים אחרת? נותנים להם להמציא, ורק אחר כך הופכים. לכל רעיון מגניב יש תוצאה, והתוצאה הופכת אותו לעולם. עכשיו: בגלל החוק שלנו, מה עוד משתנה? כותבים." },

  { label:"תעלומה", html:`<div class="duo"><div>${blockScene(["        ","DrrrrrrD","Dr    rD","Dr    rD","Dr    rD","DrrrrrrD","SSSSSSSS"], "#070B0E")}</div><div><h2>משאירים תעלומה אחת</h2><p class="lead2">ב־Ancient City יש מסגרת ענקית, שאף אחד לא יודע לפתוח. Mojang אף פעם לא הסבירו.</p><div class="board"><span class="tag">התעלומה של העולם שלנו</span><span>${field("mystery","דבר אחד שאף אחד לא מסביר")}</span></div></div></div>`,
    notes:"20–21 דק׳. שואלים: מה יש מאחורי המסגרת? כל אחד יגיד משהו אחר, וזה בדיוק העניין: אף אחד לא ענה, וכולם עדיין מדברים על זה. דבר אחד בלי הסבר שווה יותר מעשרה דפים של סיפור. מה התעלומה של העולם שלנו? דלת נעולה, מגדל שאי אפשר להגיע אליו, סימן על קיר. ועוד דבר, בקצרה: עולם קטן ומלא עדיף על עולם ענק וריק." },

  { label:"העולם של הכיתה", html:`<h2>העולם שבנינו</h2>${worldCard()}`,
    notes:"21–22 דק׳. קוראים בקול את כל הכרטיס. בנינו עולם שלם בחמש־עשרה דקות, שאלה אחרי שאלה. אלה בדיוק השאלות בדף 1 שלכם. (אפשר לתקן כאן כל שורה.) עכשיו: מה שמים בעולם הזה? חפצים." },

  { label:"חפצים", html:`<h2>מה יש לכם ביד?</h2>${hotbar("h1", hbItems(["sword","bow","pearl","apple","totem","elytra","bread","compass","potato"]))}`,
    notes:"22–24 דק׳. לוחצים על חפץ בשורה, ומעליו מופיע מה שרואים במשחק כשמצביעים עליו: השם, וצבע השם לפי כמה הוא נדיר. שואלים על כל אחד: מה עושים איתו? ואיזה חפץ הייתם לוקחים איתכם תמיד? על Poisonous Potato הם ייתקעו (בשביל מה הוא?), וזה בדיוק העניין: חפץ טוב עונה במשפט אחד." },

  { label:"סרטון: Mojang", html:`<div class="vid" data-yt="UlVZgIdoR_A" data-start="192" data-end="362"></div>`,
    notes:"24–27 דק׳. שלוש דקות מתוך ״How We Make Minecraft״, הסדרה הרשמית של Mojang. באנגלית, עם הרבה בדיחות ותמונות: איך מעצבים במיינקראפט, ולמה 16 על 16. הקטע מתחיל ב־3:12 ונגמר ב־6:02. אחרי הסרטון שואלים מה הבינו: 256 משבצות זה כל הציור. מה שפשוט נראה טוב. וגם במיינקראפט הסקיצה הראשונה לא דומה לסופית, ומותר לשנות. אם יוטיוב חסום: מדלגים, השקופית הבאה אומרת את אותו דבר." },

  { label:"16 על 16", html:`<div class="duo"><div>${zoom("z1","item_diamond_sword")}</div><div><h2>256 משבצות</h2><p class="lead2">זה כל הציור. קו מתאר כהה, ושניים עד ארבעה צבעים.</p></div></div>`,
    notes:"27–28 דק׳. מזיזים את המחוון לאט: מהגודל שרואים במשחק, עד שרואים כל משבצת. שואלים: איך יודעים שזו חרב, גם כשהיא קטנטנה? (להב ארוך, ידית, ומשהו לרוחב.) סופרים יחד כמה צבעים יש בה. בדף 2 שלהם יש רשת בדיוק כזאת." },

  { label:"תפקידים", html:`<h2>בשביל מה הוא?</h2>${sortGame("so1",["כלי","נשק","אוכל","אוצר"],[
      {tex:"item_iron_pickaxe",name:"Pickaxe",b:0},{tex:"item_diamond_sword",name:"Sword",b:1},{tex:"item_bread",name:"Bread",b:2},{tex:"item_diamond",name:"Diamond",b:3},
      {tex:"item_fishing_rod",name:"Fishing Rod",b:0},{tex:"item_bow",name:"Bow",b:1},{tex:"item_golden_apple",name:"Golden Apple",b:2},{tex:"item_emerald",name:"Emerald",b:3},
      {tex:"item_compass_00",name:"Compass",b:0},{tex:"item_trident",name:"Trident",b:1},{tex:"item_cooked_beef",name:"Steak",b:2}])}`,
    notes:"28–30 דק׳. משחק מיון. מצביעים על חפץ ושואלים: לאיזו קופסה? לוחצים עליו והוא עף לקופסה הנכונה (לחיצה עליו בקופסה מחזירה). על Golden Apple אפשר להתווכח: אוכל, או אוצר? ויכוח טוב. המסקנה: לכל חפץ יש תפקיד אחד ברור. בכרטיס זו השורה ״בשביל מה הוא?״" },

  { label:"המחיר", html:`<h2>מה מקבלים, ומה משלמים</h2><div class="fls">${[["pearl","מגיעים רחוק, ברגע","נפצעים בנחיתה"],["elytra","עפים","אין שריון על החזה"],["apple","מרפא חזק","עולה 8 מטילי זהב"],["totem","חוזרים מהמוות","נעלם אחרי פעם אחת"]].map((r, i) => flip("pr"+i, `${img(IT[r[0]].tex,"ico")}<b>${IT[r[0]].name}</b><span>מקבלים: ${r[1]}</span>`, `<b>משלמים:</b>${r[2]}`)).join("")}</div>`,
    notes:"30–32 דק׳. על כל חפץ: מה הוא נותן? ומה המחיר שלו? הם יודעים, רק אף פעם לא קראו לזה מחיר. הופכים אחרי שענו. לכל חפץ חזק במיינקראפט יש מחיר, ומישהו תכנן את זה בכוונה." },

  { label:"תקנו את החפץ", html:`<div class="duo"><div class="ci">${tooltip("חרב הכול",["הורגת כל דבר במכה אחת.","לא נשברת אף פעם."],"epic")}<div class="sl big" style="width:clamp(80px,13cqw,150px)">${img("item_netherite_sword")}</div></div><div><h2>עם החרב הזאת יהיה כיף אחרי שעה?</h2>${vote("v2",[{l:"כן",t:"ברור!"},{l:"לא",t:"משעמם"}])}</div></div>
    <div class="board"><span class="tag">המחיר שהכיתה קובעת לה</span><span>${field("fix","מה החרב הזאת עולה?")}</span></div>`,
    notes:"32–34 דק׳. הצבעה. רובם יגידו כן. שואלים: ומה קורה אחרי חמש דקות? אין סכנה, אז אין משחק. מה שחפץ לא יכול לעשות מעניין יותר ממה שהוא יכול. עכשיו מתקנים: איזה מחיר קובעים לחרב? (נשברת אחרי עשר מכות? מאטה אתכם? עובדת רק בלילה?) כותבים את המחיר שהכיתה בחרה." },

  { label:"נדירות", html:`<h2>כמה נכנסים בערימה?</h2><div class="stk2"><figure>${stackOf("block_dirt",64,8,"clamp(120px,18cqw,220px)")}<figcaption>64<small>Dirt · בכל מקום</small></figcaption></figure><figure>${stackOf("item_ender_pearl",16,4,"clamp(70px,10cqw,124px)")}<figcaption>16<small>Ender Pearl · צריך לחפש</small></figcaption></figure><figure>${stackOf("item_totem_of_undying",1,1,"clamp(36px,5cqw,62px)")}<figcaption>1<small>Totem of Undying · נדיר</small></figcaption></figure></div>`,
    notes:"34–35 דק׳. שואלים: למה מ־Ender Pearl נכנסות רק 16? (אחרת הייתם מתעופפים בכל המפה בלי לחשוב.) ולמה Totem רק אחד? מה שקשה להשיג, שומרים לרגע הנכון. המספר הזה נכנס למשחק כבר היום, אז כל אחד יבחר: 1, 16 או 64." },

  { label:"החפץ של הכיתה", html:`<div class="duo"><div class="p16w">${paint16()}</div><div style="display:grid;gap:14px;justify-items:center">${classItem()}
    <div class="board"><span>שם: ${field("iname","שם שמספר מה הוא עושה")}</span><span>מתחת לשם: ${field("ilore","משפט קצר")}</span><span>בשביל מה: ${field("ijob","תפקיד")}</span><span>המחיר: ${field("iprice","מה משלמים?")}</span>${chips("istack",["1","16","64"])}</div></div></div>`,
    notes:"35–40 דק׳. החפץ של העולם שלנו, יחד. קודם השם (שם שמספר מה הוא עושה), המשפט, התפקיד, המחיר וכמה בערימה. אחר כך הציור: בוחרים צבע ומציירים במשבצות (לחיצה ימנית מוחקת). אפשר להזמין ילד אחד לצייר. בצד מופיע החפץ כמו שייראה במשחק. את החפץ הזה נכניס עוד מעט למשחק, בהדגמה." },

  { label:"אז מה חפץ צריך?", html:`<h2>אז מה חפץ צריך?</h2><div class="rules"><div><span class="n">1</span><b>תפקיד</b>בשביל מה הוא?</div><div><span class="n">2</span><b>מחיר</b>מה משלמים עליו?</div><div><span class="n">3</span><b>נדירות</b>איפה משיגים, וכמה בערימה?</div><div><span class="n">4</span><b>שם וצורה</b>מבינים מה הוא עושה לפני שקוראים.</div></div><p class="sub">אלה השורות בדף 2.</p>`,
    notes:"חצי דקה, ועוברים לדף." },

  { label:"דף 2", html:`<h2>כרטיס החפץ</h2><div class="duo"><div class="wcard">
      <div class="ln">שם החפץ, והמשפט שמתחתיו</div><div class="ln">בשביל מה הוא?</div><div class="ln">המחיר שלו</div><div class="ln">איפה משיגים אותו, וכמה בערימה</div><div class="ln">ציור של 16 על 16</div></div><div>${timer("t1",12*60)}</div></div>`,
    notes:"40–52 דק׳. מחלקים את דף 2 וטושים. לוחצים על השעון כדי להפעיל (לחיצה נוספת עוצרת). קודם הכרטיס, אחר כך הציור. מסתובבים, ולכל ילד שאלה אחת: ״ומה המחיר?״ מי שסיים מוקדם: חפץ שני, בצד השני של הדף." },

  { label:"הדגמה", html:`<h2>מהדף למשחק</h2><div class="steps">
      <div><span class="ico k">Minecraft</span><b>פותחים את הדף</b>מהסמל, בתפריט Start</div>
      <div><span class="ico k">+ חפץ חדש</span><b>בסטודיו</b>השם, המשפט והקוד מהדף</div>
      <div><span class="ico k">16×16</span><b>מציירים</b>לפי הציור שעל הדף</div>
      <div><span class="ico k">לנסות במשחק</span><b>המחשב בונה</b>דקה או שתיים</div>
      <div>${img("block_grass_block_side","ico")}<b>במשחק</b>E, והלשונית של העולם שלכם</div></div><div class="row3">${classItem()}</div>`,
    notes:"52–60 דק׳. מדגימים על המקרן, עם החפץ של הכיתה, צעד אחרי צעד. 1. לוחצים על Minecraft בתפריט Start, מקלידים את הקוד, והדף נפתח. 2. הסטודיו, ״+ חפץ חדש״: השם, המשפט, קוד באנגלית, כמה בערימה וכמה נדיר. 3. מציירים לפי הציור של הכיתה, ומראים שהתצוגה ליד הלוח משתנה. 4. מתחת לחפץ כתוב ״מוכן למשחק״. לוחצים ״לנסות במשחק״. 5. מיינקראפט נפתח (דקה או שתיים: בינתיים מסבירים), Creative, E, הלשונית, והחפץ של הכיתה שם. מראים בקצרה את הלשונית ״מה הוא עושה?״ ואומרים: בשבוע הבא." },

  { label:"עכשיו אתם", html:`<h2>עכשיו אתם</h2><div class="duo"><ol class="big"><li>הסטודיו: ״+ חפץ חדש״</li><li>השם, המשפט והקוד מהדף</li><li>מציירים לפי הדף</li><li>לנסות במשחק</li><li>מוצאים את החפץ במשחק</li></ol><div>${timer("t2",25*60)}</div></div>`,
    notes:"60–85 דק׳. מפעילים את השעון. מסתובבים בכיתה. מי שתקוע: קודם שואל את מי שיושב לידו. מי שסיים: חפץ שני, או שם לעולם (בסטודיו, למעלה). מיינקראפט לא נפתח, או כתוב שהוא כבר פתוח? ״לסגור את מיינקראפט״ ואז שוב ״שחק״." },

  { label:"משהו לא עבד?", html:`<h2>משהו לא עבד?</h2><div class="rules">
      <div><b>החפץ לא במשחק</b>מתחת לחפץ בסטודיו כתוב מה חסר.</div>
      <div><b>ריבוע סגול ושחור</b>עוד אין ציור. מציירים, וסוגרים ופותחים את המשחק.</div>
      <div><b>שיניתי, ולא רואים</b>שינוי נכנס כשהמשחק נפתח מחדש.</div>
      <div><b>המשחק לא נפתח</b>״לסגור את מיינקראפט״, ואז שוב ״שחק״.</div></div>`,
    notes:"להשאיר על המסך בזמן העבודה, אם לא צריך את השעון." },

  { label:"סיום", html:`<div class="ci">${tooltip("החפץ שלכם",["???"],"epic")}</div><h1>ומה הוא עושה?</h1><p class="sub">בשבוע הבא.</p>`,
    notes:"85–90 דק׳. שניים או שלושה מראים את החפץ שלהם על המקרן. אחר כך כולם: דרייב ← שומרים את העולם, וסוגרים את מיינקראפט. המשפט לסיום: היום לחפץ שלכם יש שם וציור. בשבוע הבא הוא יעשה משהו." }
];

H.DECKS[2] = DECK2;
window.STAGE = { apply, bind, tick, CSS, fmt };
const baseInject = H.injectStyle;
H.injectStyle = doc => { baseInject(doc); const st = doc.createElement("style"); st.textContent = CSS; (doc.head || doc.documentElement).appendChild(st); };
})();
