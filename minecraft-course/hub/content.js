/* Shared content and styles for the Minecraft course hub (kids: index.html) and the teacher page (teacher.html). */
(function(){
"use strict";
const CSS = `/* Layout: makers-lab model. Course map as a vertical unit timeline; lesson player = step panel (right, RTL) +
   visual workspace (left), Minecraft hotbar as the step rail, XP bar as progress; presenter = one slide + notes strip. */
:root{
  --bg:#F1F4EC; --surface:#FFFFFF; --sunk:#E6EBE0; --ink:#1D271F; --muted:#56645A; --line:#CFD8CA;
  --grass:#3B8735; --grass-ink:#FFFFFF; --grass-soft:#DFF0D9;
  --xp:#C98A0C; --xp-bar:#7BC63C; --xp-soft:#FAF0D4;
  --red:#B23A27; --red-soft:#F7E0DA; --sky:#2B6A99; --sky-soft:#DCEAF4;
  --console:#101510; --console-ink:#C9E7C1; --slot:#8B8B8B; --slot-in:#C6C6C6;
  --display:"Secular One","Segoe UI",Arial,sans-serif;
  --body:"Assistant","Segoe UI",Arial,sans-serif;
  --mono:"JetBrains Mono",Consolas,"Courier New",monospace;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --bg:#121813; --surface:#1B231C; --sunk:#232D24; --ink:#E6EEE3; --muted:#9CAD9F; --line:#334035;
  --grass:#62B858; --grass-ink:#0E160F; --grass-soft:#1F3320;
  --xp:#F0BE48; --xp-bar:#8CD84B; --xp-soft:#33290F;
  --red:#E26C57; --red-soft:#3A1E19; --sky:#6FB0E0; --sky-soft:#15283A;
  --console:#060906; --console-ink:#B7DCAE; --slot:#4A4A4A; --slot-in:#2C2C2C; color-scheme:dark}}
:root[data-theme="dark"]{
  --bg:#121813; --surface:#1B231C; --sunk:#232D24; --ink:#E6EEE3; --muted:#9CAD9F; --line:#334035;
  --grass:#62B858; --grass-ink:#0E160F; --grass-soft:#1F3320;
  --xp:#F0BE48; --xp-bar:#8CD84B; --xp-soft:#33290F;
  --red:#E26C57; --red-soft:#3A1E19; --sky:#6FB0E0; --sky-soft:#15283A;
  --console:#060906; --console-ink:#B7DCAE; --slot:#4A4A4A; --slot-in:#2C2C2C; color-scheme:dark}

*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:17px;line-height:1.55}
#app{min-height:100%}
#app.big{font-size:20px}
h1,h2,h3{font-family:var(--display);font-weight:400;line-height:1.2;text-wrap:balance;margin:0}
p{margin:0}
a{color:var(--sky)}
button{font:inherit;color:inherit;cursor:pointer}
:focus-visible{outline:3px solid var(--xp);outline-offset:2px}
code,.mono{font-family:var(--mono);font-size:.88em;direction:ltr;unicode-bidi:isolate}
kbd{font-family:var(--mono);font-size:.82em;background:var(--sunk);border:1px solid var(--line);border-bottom-width:3px;border-radius:4px;padding:0 .4em;direction:ltr;display:inline-block}

/* block buttons */
.btn{display:inline-flex;align-items:center;gap:.4em;border:2px solid var(--ink);background:var(--surface);padding:.45em 1em;border-radius:4px;box-shadow:0 3px 0 var(--ink);font-weight:700;text-decoration:none;color:var(--ink)}
.btn:active{transform:translateY(2px);box-shadow:0 1px 0 var(--ink)}
.btn.go{background:var(--grass);color:var(--grass-ink);border-color:var(--grass);box-shadow:0 3px 0 color-mix(in srgb,var(--grass) 55%,#000)}
.btn.ghost{border-color:var(--line);box-shadow:0 3px 0 var(--line);font-weight:600}
.btn[disabled]{opacity:.4;cursor:default}
.chip{display:inline-block;font-size:.78em;font-weight:700;padding:.1em .6em;border-radius:3px;background:var(--sunk);color:var(--muted);letter-spacing:.02em}
.chip.go{background:var(--grass-soft);color:var(--grass)}
.chip.gold{background:var(--xp-soft);color:var(--xp)}

/* XP bar */
.xp{height:12px;background:var(--console);border:2px solid var(--console);border-radius:2px;display:grid;grid-template-columns:repeat(var(--n),1fr);gap:2px;padding:1px}
.xp i{background:color-mix(in srgb,var(--xp-bar) 18%,var(--console))}
.xp i.on{background:var(--xp-bar)}

/* ---------- HOME ---------- */
.wrap{max-width:1080px;margin:0 auto;padding-inline:16px;padding-block:28px 60px}
.top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:16px}
.brand h1{font-size:clamp(2rem,5vw,3rem)}
.brand p{color:var(--muted);font-size:1.1em}
.tools{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.seat{display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--line);border-radius:4px;padding:.35em .7em}
.seat select{font:inherit;background:var(--sunk);color:var(--ink);border:1px solid var(--line);border-radius:3px;padding:.1em .3em}
.progress{margin-top:24px;background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:16px 18px;display:grid;gap:10px}
.progress .row{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.timeline{margin-top:36px;display:grid;gap:34px;position:relative}
.unit{display:grid;grid-template-columns:56px 1fr;gap:16px}
.unit .ico{width:56px;height:56px;border-radius:4px;display:grid;place-items:center;color:#fff;font-family:var(--display);font-size:1.5rem;box-shadow:inset 0 -6px 0 rgba(0,0,0,.22)}
.unit .head{display:flex;flex-wrap:wrap;align-items:baseline;gap:10px;margin-bottom:12px}
.unit .head h2{font-size:1.5rem}
.unit .head span{color:var(--muted)}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}
.lcard{background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:14px 16px;display:grid;gap:6px;text-align:right;text-decoration:none;color:var(--ink)}
.lcard .n{font-size:.8em;color:var(--muted);font-weight:700}
.lcard h3{font-size:1.15rem}
.lcard .b{color:var(--muted);font-size:.92em}
.lcard .meta{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
a.lcard.open{border:2px solid var(--grass);box-shadow:0 3px 0 var(--grass)}
a.lcard.open:hover{transform:translateY(-1px)}
.lcard.soon{opacity:.62}
.foot{margin-top:48px;display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;color:var(--muted);font-size:.9em}

/* ---------- PLAYER ---------- */
.pl{display:grid;grid-template-rows:auto 1fr auto;min-height:100vh}
.pbar{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--surface);border-bottom:1px solid var(--line);padding-inline:16px;padding-block:10px;display:grid;gap:10px}
.pbar .r1{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:10px}
.pbar .t{display:grid}
.pbar .t small{color:var(--muted);font-size:.8em}
.pbar .t b{font-family:var(--display);font-weight:400;font-size:1.2rem}
.hotbar{display:flex;gap:3px;background:var(--slot);padding:3px;border-radius:2px;width:max-content;max-width:100%;overflow-x:auto;direction:rtl}
.slot{width:40px;height:40px;flex:0 0 40px;background:var(--slot-in);border:2px solid;border-color:#555 #fff #fff #555;display:grid;place-items:center;font-family:var(--display);font-size:1.05rem;color:#3a3a3a;position:relative}
:root[data-theme="dark"] .slot{color:#ddd;border-color:#222 #666 #666 #222}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]) .slot{color:#ddd;border-color:#222 #666 #666 #222}}
.slot.done{color:var(--grass)}
.slot.cur{outline:3px solid #fff;outline-offset:-1px;box-shadow:0 0 0 3px #222}
.pmain{display:grid;grid-template-columns:minmax(0,420px) minmax(0,1fr);gap:16px;padding:16px;align-items:start}
.panel{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:18px;display:grid;gap:14px}
.panel .k{display:flex;justify-content:space-between;align-items:center}
.panel h2{font-size:1.7rem}
.panel .body{display:grid;gap:10px}
.panel ol,.panel ul{margin:0;padding-inline-start:1.3em;display:grid;gap:6px}
.box{border-radius:6px;padding:10px 12px;font-size:.95em}
.box b{display:block;font-size:.85em}
.box.expect{background:var(--grass-soft);color:var(--ink)}
.box.expect b{color:var(--grass)}
.box.why{background:var(--sky-soft)}
.box.why b{color:var(--sky)}
.box.note{background:var(--xp-soft)}
.box.note b{color:var(--xp)}
.helprow{display:flex;gap:8px;flex-wrap:wrap}
.reveal{display:grid;gap:8px}
.reveal .item{background:var(--sunk);border-radius:6px;padding:8px 12px;font-size:.95em}
.reveal .item b{display:block}
.chal{border:1px solid var(--line);border-radius:6px;padding:12px;display:grid;gap:8px}
.chal h3{font-size:1.05rem}
.chal label{display:grid;grid-template-columns:auto 1fr;gap:8px;align-items:start;font-size:.95em}
.chal input{width:20px;height:20px;accent-color:var(--grass);margin-top:3px}
.chal small{color:var(--muted)}
.work{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:22px;min-height:440px;display:grid;align-content:center;gap:18px;min-width:0}
.pfoot{position:sticky;bottom:0;background:var(--surface);border-top:1px solid var(--line);padding-inline:16px;padding-block:10px calc(10px + env(safe-area-inset-bottom,0px));display:flex;justify-content:space-between;align-items:center;gap:10px}
.pfoot small{color:var(--muted);text-align:center}
@media (max-width:860px){.pmain{grid-template-columns:1fr}.work{min-height:0}.pfoot small{display:none}}

/* workspace visuals */
.today{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}
.today div{border:2px solid var(--line);border-radius:6px;padding:14px;display:grid;gap:6px;background:var(--bg)}
.today .num{font-family:var(--display);font-size:2rem;color:var(--grass);line-height:1}
.today b{font-size:1.1em}
.win{border:1px solid var(--line);border-radius:6px;overflow:hidden;background:var(--bg);direction:ltr;text-align:left}
.win .tb{background:var(--sunk);padding:6px 10px;font-size:.8em;color:var(--muted);display:flex;justify-content:space-between}
.win .side{display:grid;grid-template-columns:150px 1fr;min-height:180px}
.win .nav{border-right:1px solid var(--line);padding:8px;font-size:.85em;display:grid;align-content:start;gap:4px}
.win .nav div{padding:3px 6px;border-radius:3px}
.win .nav .sel{background:var(--sky-soft);color:var(--sky);font-weight:700}
.win .files{padding:10px;display:grid;align-content:start;gap:6px;font-size:.9em}
.file{display:flex;gap:8px;align-items:center;padding:4px 8px;border-radius:3px}
.file .fi{width:16px;height:18px;background:var(--line);border-radius:2px;flex:none}
.file.hot{background:var(--xp-soft);outline:2px dashed var(--xp);font-weight:700}
.file.hot .fi{background:var(--xp)}
.callout{direction:rtl;text-align:right;font-weight:700;color:var(--xp);font-size:.95em}
.console{background:var(--console);color:var(--console-ink);font-family:var(--mono);font-size:.82rem;padding:14px 16px;border-radius:6px;direction:ltr;text-align:left;line-height:1.6;white-space:pre-wrap;overflow-x:auto}
.console .w{color:#fff;font-weight:700}
.eq{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;font-family:var(--display);font-size:1.4rem}
.eq .blk{border:2px solid var(--ink);border-radius:4px;padding:.5em .8em;background:var(--bg);box-shadow:0 3px 0 var(--ink);text-align:center}
.eq .blk small{display:block;font-family:var(--body);font-size:.6em;color:var(--muted)}
.eq .blk.you{background:var(--grass-soft);border-color:var(--grass);box-shadow:0 3px 0 var(--grass)}
.roles{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.roles div{border-radius:6px;padding:14px;display:grid;gap:6px}
.roles .me{background:var(--grass-soft)}
.roles .ai{background:var(--sky-soft)}
.roles ul{margin:0;padding-inline-start:1.2em}

/* world card form */
.wcard{border:2px solid var(--ink);border-radius:6px;background:var(--bg);padding:16px;display:grid;gap:12px;box-shadow:0 4px 0 var(--ink)}
.wcard .hd{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.wcard h3{font-size:1.35rem}
.fld{display:grid;gap:4px}
.fld label{font-weight:700;font-size:.92em}
.fld small{color:var(--muted)}
.fld input[type=text],.fld textarea{font:inherit;width:100%;border:1px solid var(--line);border-radius:4px;padding:.45em .6em;background:var(--surface);color:var(--ink)}
.fld textarea{min-height:2.6em;resize:vertical}
.sw{display:flex;gap:10px;flex-wrap:wrap}
.sw input[type=color]{width:56px;height:44px;border:2px solid var(--ink);border-radius:4px;padding:2px;background:var(--surface)}
.saved{font-size:.85em;color:var(--grass);min-height:1.2em}

/* silhouettes */
.sil{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px}
.sil button{background:var(--bg);border:2px solid var(--line);border-radius:6px;padding:12px;display:grid;gap:8px;justify-items:center}
.sil svg{width:100%;max-width:100px;height:100px}
.sil svg rect{fill:var(--ink)}
.sil .nm{font-weight:700;min-height:1.5em}
.sil button.shown{border-color:var(--grass)}
.sil button.shown .nm{color:var(--grass)}

/* minecraft menu mock */
.mcmenu{background:#3c2a1c;border-radius:6px;padding:18px;display:grid;gap:8px;justify-items:center;direction:ltr}
.mcmenu .logo{font-family:var(--display);color:#e8e8e8;font-size:1.5rem;letter-spacing:.06em;text-shadow:2px 2px 0 #000}
.mcbtn{width:min(280px,100%);background:#6f6f6f;border:2px solid #000;box-shadow:inset 2px 2px 0 #a8a8a8,inset -2px -2px 0 #444;color:#fff;text-align:center;padding:6px;font-size:.95em;text-shadow:1px 1px 0 #333}
.mcbtn.hot{outline:3px solid #ffd84a}
.mcbtn small{color:#ffd84a}
.chat{display:grid;gap:10px}
.bub{max-width:88%;border-radius:12px;padding:10px 14px;font-size:.95em}
.bub.me{background:var(--grass-soft);justify-self:start;border-bottom-right-radius:3px}
.bub.ai{background:var(--sunk);justify-self:end;border-bottom-left-radius:3px}
.bub b{display:block;font-size:.8em;color:var(--muted)}
.prompt{border:2px dashed var(--grass);border-radius:6px;padding:12px;display:grid;gap:8px;background:var(--bg)}
.prompt pre{margin:0;white-space:pre-wrap;font-family:var(--body);font-size:1.02em}
.prompt .row{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}
.vs{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}
.vs > div{border-radius:6px;padding:14px;display:grid;gap:8px;align-content:start}
.vs .bad{background:var(--red-soft)}
.vs .good{background:var(--grass-soft)}
.vs h4{margin:0;font-size:1.05rem}
.vs .bad h4{color:var(--red)}
.vs .good h4{color:var(--grass)}
.vs dl{margin:0;display:grid;gap:4px;font-size:.93em}
.vs dt{font-weight:700}
.vs dd{margin:0 0 4px}
.checks{display:grid;gap:8px}
.checks div{display:flex;gap:10px;align-items:center;background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:10px 12px}
.checks .ok{width:22px;height:22px;border-radius:3px;background:var(--grass);flex:none;box-shadow:inset 0 -4px 0 rgba(0,0,0,.2)}

/* ---------- PRESENTER ---------- */
.pr{display:grid;grid-template-rows:auto 1fr auto auto;min-height:100vh;background:var(--bg)}
.prbar{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding-inline:16px;padding-block:10px;border-bottom:1px solid var(--line);background:var(--surface)}
.prbar .r{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.stage{display:grid;place-items:center;padding:clamp(16px,4cqw,56px);min-width:0;container-type:inline-size}
.slide{width:min(1100px,100%);display:grid;gap:clamp(14px,2.4cqw,28px);text-align:center;justify-items:center}
.slide .eye{color:var(--grass);font-weight:800;letter-spacing:.04em;font-size:clamp(.95rem,1.6cqw,1.2rem)}
.slide h1{font-size:clamp(2.2rem,6cqw,4.6rem)}
.slide h2{font-size:clamp(1.8rem,4.6cqw,3.4rem)}
.slide .sub{font-size:clamp(1.15rem,2.4cqw,1.8rem);color:var(--muted);max-width:30em}
.slide ul.big,.slide ol.big{text-align:right;font-size:clamp(1.15rem,2.5cqw,1.9rem);display:grid;gap:.5em;margin:0;padding-inline-start:1.2em;justify-self:center}
.slide .vs{width:100%;text-align:right;font-size:clamp(.95rem,1.6cqw,1.25rem)}
.slide .vs h4{font-size:1.3em}
.slide .eq{font-size:clamp(1.3rem,3cqw,2.4rem)}
.slide .sil{width:100%;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.slide .sil svg{max-width:140px;height:140px}
.slide .wcard{text-align:right;width:min(720px,100%);font-size:clamp(1rem,1.8cqw,1.35rem)}
.slide .wcard .ln{border-bottom:2px dotted var(--line);padding-bottom:6px}
.slide .wcard .ln span{color:var(--muted);font-size:.85em}
.slide .quote{font-family:var(--display);font-size:clamp(1.6rem,4cqw,3rem);color:var(--grass)}
.slide .rules{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;width:100%;text-align:right}
.slide .rules div{background:var(--surface);border:2px solid var(--ink);box-shadow:0 4px 0 var(--ink);border-radius:6px;padding:16px;display:grid;gap:6px;font-size:clamp(1rem,1.6cqw,1.2rem)}
.slide .rules b{font-family:var(--display);font-weight:400;font-size:1.35em}
.slide .rules .n{color:var(--grass);font-family:var(--display);font-size:1.8em;line-height:1}
.notes{background:var(--sunk);border-top:1px solid var(--line);padding-inline:16px;padding-block:10px;font-size:1rem}
.notes b{font-size:.8em;color:var(--muted);display:block}
.prfoot{display:flex;justify-content:space-between;align-items:center;gap:10px;padding-inline:16px;padding-block:10px calc(10px + env(safe-area-inset-bottom,0px));background:var(--surface);border-top:1px solid var(--line)}
.prfoot small{color:var(--muted)}
.map{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;padding:16px}
.map button{background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:10px;text-align:right;display:grid;gap:4px}
.map button.cur{border:2px solid var(--grass)}
.map small{color:var(--muted)}

/* ---------- TEACHER ---------- */
.tsec{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:18px;display:grid;gap:12px;margin-top:18px}
.tsec h2{font-size:1.4rem}
.tsec p,.tsec li{max-width:70ch}
.tlist{display:grid;gap:8px}
.tlist label{display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start}
.tlist input{width:20px;height:20px;accent-color:var(--grass);margin-top:4px}
.tlist small{color:var(--muted);display:block}
.ttable{overflow-x:auto}
.ttable table{border-collapse:collapse;width:100%;min-width:560px;font-size:.95em}
.ttable th,.ttable td{border-bottom:1px solid var(--line);padding:8px;text-align:right;vertical-align:top}
.ttable th{font-size:.85em;color:var(--muted)}
.ttable td:first-child{white-space:nowrap;font-variant-numeric:tabular-nums;font-weight:700}
.gem{background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:14px;font-family:var(--mono);font-size:.8rem;white-space:pre-wrap;direction:ltr;text-align:left;max-height:420px;overflow:auto;line-height:1.55}
@media (prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
@media print{.pbar,.pfoot,.tools,.helprow,.btn{display:none!important}}

/* ---------- PRESENTER CONSOLE (teacher laptop) + AUDIENCE (projector) ---------- */
.con{min-height:100vh;display:grid;grid-template-rows:auto 1fr auto;background:var(--bg)}
.con-main{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:16px;padding:16px;align-items:start}
.con-box{background:var(--surface);border:1px solid var(--line);border-radius:8px;overflow:hidden}
.con-box.live{border:2px solid var(--grass)}
.con-label{display:flex;justify-content:space-between;gap:8px;font-size:.8rem;color:var(--muted);font-weight:700;padding:6px 12px;background:var(--sunk)}
.con-box .stage{padding:20px;background:var(--bg)}
.con-side{display:grid;gap:16px}
.con-notes{padding:16px;font-size:1.3rem;line-height:1.6}
.con-next{padding:12px 16px;display:grid;gap:4px}
.con-next b{font-family:var(--display);font-weight:400;font-size:1.3rem}
.timer{font-family:var(--mono);font-size:1.25rem;font-variant-numeric:tabular-nums;direction:ltr}
.con-warn{background:var(--red-soft);color:var(--ink);border-radius:6px;padding:10px 14px}
.aud-on{color:var(--grass);font-weight:700}
body.aud .stage{min-height:100vh}
.aud-hint{position:fixed;bottom:8px;left:12px;color:var(--muted);font-size:12px;margin:0}
@media (max-width:860px){.con-main{grid-template-columns:1fr}}
`;
function injectStyle(doc){ const st = doc.createElement("style"); st.textContent = CSS; (doc.head || doc.documentElement).appendChild(st); }
const FONT_HREF = "https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&family=Secular+One&family=JetBrains+Mono:wght@500&display=swap";

/* ===== settings ===== */
// Ben: after you create the Gem, its share link goes here.
const GEM_LINK = "";

/* ===== storage (per laptop, optional) ===== */
const LS = {
  get(k, d){ try{ const v = localStorage.getItem("mkmod." + k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem("mkmod." + k, JSON.stringify(v)); }catch(e){} }
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ===== course map ===== */
const UNITS = [
  { n:1, name:"מתחילים", sub:"מיינקראפט עובד, העולם שלי על נייר", color:"#3B8735", icon:"1",
    lessons:[ {n:1, title:"התקנה והעולם שלי", build:"כרטיס העולם, ומיינקראפט שעובד על המחשב", open:true} ] },
  { n:2, name:"החפצים הראשונים", sub:"מהכרטיס אל תוך המשחק", color:"#2B6A99", icon:"2",
    lessons:[
      {n:2, title:"החפץ הראשון שלי", build:"חפץ עם שם, ציור והסבר שלכם, בתוך המשחק"},
      {n:3, title:"חפץ בתלת־ממד", build:"מודל ב־Blockbench שמחזיקים ביד"},
      {n:4, title:"חפץ עם מחיר", build:"חפץ חזק שיש לו חיסרון"},
      {n:5, title:"אפקט שמשנה את המשחק", build:"אוכל או שיקוי עם אפקט חדש"} ] },
  { n:3, name:"המקום והיצור הראשון", sub:"עולם שיש בו חוקים", color:"#8A5A2B", icon:"3",
    lessons:[
      {n:6, title:"המקום שלי", build:"מקום בעולם, עם תיבת אוצר"},
      {n:7, title:"חוק של העולם", build:"חוק ״כש... אם... אז...״ שעובד במשחק"},
      {n:8, title:"היצור הראשון", build:"יצור עם סימן אזהרה לפני שהוא תוקף"},
      {n:9, title:"הכול מתחבר", build:"יצור שחי במקום שלכם ומפיל חפץ שלכם"} ] },
  { n:4, name:"תערוכה 1", sub:"כולם משחקים בעולם של כולם", color:"#C98A0C", icon:"★",
    lessons:[ {n:10, title:"תערוכה 1", build:"כולם משחקים בעולמות של כולם"} ] },
  { n:5, name:"יצור החתימה", sub:"היצור שרק אתם יכולתם להמציא", color:"#7A3E9D", icon:"5",
    lessons:[
      {n:11, title:"מעצבים יצור", build:"צללית, תכונה אחת, 2–4 צבעים"},
      {n:12, title:"בונים לו מודל", build:"מודל וציור ב־Blockbench"},
      {n:13, title:"מכניסים למשחק", build:"היצור שלכם זז בתוך העולם"},
      {n:14, title:"איך הוא נלחם", build:"אפשר לנצח אותו, אבל לא בניסיון הראשון"},
      {n:15, title:"שביל הסיפור", build:"הישגים שמובילים את השחקן בעולם"} ] },
  { n:6, name:"מסיימים ומראים", sub:"עולם שלם שאחרים משחקים בו", color:"#B23A27", icon:"6",
    lessons:[
      {n:16, title:"הבחירה שלכם א׳", build:"יצור שני, חוק שני, או בוס"},
      {n:17, title:"הבחירה שלכם ב׳", build:"ממשיכים את מה שבחרתם"},
      {n:18, title:"מסיימים", build:"שום דבר חדש, רק תיקונים"},
      {n:19, title:"חזרה גנרלית", build:"שותף משחק בעולם שלכם, ואתם מתקנים מה שלא עבד"},
      {n:20, title:"תערוכה 2", build:"המשפחות מגיעות ומשחקות בעולם שלכם"} ] }
];

/* ===== pixel silhouettes (side or front view, # = filled) ===== */
const MOBS = [
  { name:"קריפר", map:["..####..","..####..","..####..","..####..","...##...","...##...","...##...","...##...","...##...","...##...",".######.",".######.",".##..##."] },
  { name:"אנדרמן", map:["..####..","..####..","..####..",".######.",".#.##.#.",".#.##.#.",".#.##.#.",".#.##.#.",".#....#.","..#..#..","..#..#..","..#..#..","..#..#..","..#..#..","..#..#.."] },
  { name:"עכביש", map:["......####......",".##..######..##.","#..##########..#","...##########...","..#.########.#..",".#..#......#..#.","#..#........#..#"] },
  { name:"תרנגולת", map:["..###...",".####...","..###...","..######","..######","...#####","....#.#.","...##.##"] },
  { name:"גאסט", map:["########","########","########","########","########","########","#.#.#.#.","#.#.#...","..#.#...","..#....."] },
  { name:"חזיר", map:["..######........","..##############","################","..##############","..##############","..##############","...##.......##..","...##.......##..","...##.......##.."] }
];
function silSVG(m){
  const h = m.map.length, w = m.map[0].length;
  let r = "";
  m.map.forEach((row, y) => { for (let x = 0; x < w; x++) if (row[x] === "#") r += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`; });
  return `<svg viewBox="-1 -1 ${w+2} ${h+2}" preserveAspectRatio="xMidYMax meet" aria-hidden="true">${r}</svg>`;
}

/* ===== shared visuals ===== */
const VAGUE_SPECIFIC = `
<div class="vs">
  <div class="bad"><h4>״תבנה לי חרב״</h4>
    <p>ג׳מיני מנחש הכול: השם, מה היא עושה, כמה היא חזקה. לפעמים הוא גם כותב קוד למיינקראפט ישן, שלא עובד אצלנו.</p>
    <p><b>ואיך תדעו אם זה מה שרציתם? הרי לא אמרתם מה אתם רוצים.</b></p>
  </div>
  <div class="good"><h4>כרטיס</h4>
    <dl>
      <dt>שם</dt><dd>להב הגחלת</dd>
      <dt>מה הוא עושה</dt><dd>מצית את האויב ל־3 שניות</dd>
      <dt>המחיר</dt><dd>כל מכה מורידה לכם חצי נקודת רעב</dd>
      <dt>במה הוא פחות טוב מחרב ברזל</dt><dd>נשבר פי 2 יותר מהר</dd>
      <dt>במשחק תראו</dt><dd>האויב בוער אחרי מכה · הרעב יורד · החרב נשברת מהר</dd>
    </dl>
    <p><b>עכשיו אפשר לבדוק אם ג׳מיני עשה מה שביקשתם.</b></p>
  </div>
</div>`;

const EQ = `<div class="eq">
  <div class="blk">מיינקראפט<small>המשחק הרגיל</small></div><span>+</span>
  <div class="blk you">המוד שלכם<small>חפצים, יצורים, חוקים</small></div><span>=</span>
  <div class="blk">העולם שלכם<small>שאחרים יכולים לשחק בו</small></div>
</div>`;

const ROLES = `<div class="roles">
  <div class="me"><b>אתם: הבמאים</b><ul><li>ממציאים את העולם, השמות והסיפור</li><li>מציירים ובונים מודלים בעצמכם</li><li>בודקים: זה מה שרציתי?</li></ul></div>
  <div class="ai"><b>ג׳מיני: כותב הקוד</b><ul><li>הופך כרטיס לקוד</li><li>שואל שאלות כשמשהו לא ברור</li><li>לפעמים טועה, ובטוח שהוא צודק</li></ul></div>
</div>`;

function gemPromptBox(text){
  return `<div class="prompt"><div class="row"><b>מעתיקים ושולחים ב־Gem:</b><button class="btn ghost" data-copy="${esc(text)}">העתקה</button></div><pre>${esc(text)}</pre></div>`;
}

/* ===== lesson 1 steps ===== */
const L1 = {
  n:1, unit:"יחידה 1 · מתחילים", title:"שיעור 1: התקנה והעולם שלי",
  steps:[
    { type:"פתיחה", title:"מה עושים היום",
      body:`<p>היום עושים שלושה דברים. מתחילים בהתקנה, כי היא לוקחת זמן. בזמן שהמחשב עובד, אנחנו מדברים וממציאים עולם.</p>`,
      expect:"בסוף השיעור: מיינקראפט פתוח על המחשב שלכם, וכרטיס עולם מלא.",
      visual:()=>`<div class="today">
        <div><span class="num">1</span><b>מתקינים</b><span>מהדיסק און קי. המחשב עושה את העבודה.</span></div>
        <div><span class="num">2</span><b>ממציאים עולם</b><span>כרטיס העולם שלכם, על נייר.</span></div>
        <div><span class="num">3</span><b>פוגשים את ג׳מיני</b><span>העוזר שיכתוב בשבילכם את הקוד.</span></div>
      </div>` },

    { type:"הוראה", title:"מתקינים מהדיסק און קי",
      body:`<ol>
        <li>מכניסים את הדיסק און קי למחשב.</li>
        <li>פותחים את סייר הקבצים: <kbd>Win</kbd> + <kbd>E</kbd>.</li>
        <li>ברשימה בצד שמאל, לוחצים על הדיסק און קי.</li>
        <li>לוחצים פעמיים על <code>install-from-usb</code>.</li>
        <li>נפתח חלון שחור. לא סוגרים אותו.</li>
      </ol>`,
      expect:"החלון השחור כותב Copying... ואחרי כמה דקות: You can take the stick out now.",
      note:"לא מוציאים את הדיסק עד שכתוב שאפשר. אחר כך מעבירים אותו למי שעוד לא התקין.",
      stuck:[
        ["לא רואים את הדיסק און קי","מוציאים ומכניסים שוב, או מנסים כניסת USB אחרת."],
        ["קפץ חלון כחול: Windows protected your PC","לוחצים More info ואז Run anyway."],
        ["כתוב ERROR","לא סוגרים את החלון. מרימים יד ומראים למורה."],
        ["החלון נסגר מיד","מרימים יד. כנראה שהמחשב חוסם את זה, והמורה יבדוק."]
      ],
      visual:()=>`<div class="win"><div class="tb"><span>File Explorer</span><span>USB Drive (E:)</span></div>
        <div class="side"><div class="nav"><div>Desktop</div><div>Documents</div><div>Downloads</div><div>This PC</div><div class="sel">USB Drive (E:)</div></div>
        <div class="files"><div class="file"><span class="fi"></span>MAKE</div><div class="file hot"><span class="fi"></span>install-from-usb</div><div class="file"><span class="fi"></span>make-usb</div><div class="file"><span class="fi"></span>school-check</div>
        <p class="callout">← לוחצים פעמיים כאן</p></div></div></div>` },

    { type:"הוראה", title:"החלון השחור עובד. לא סוגרים!",
      body:`<p>המחשב מעתיק את מיינקראפט, ואחר כך פותח אותו לבד. בינתיים, עיניים למורה.</p><p>מדי פעם מציצים: מה כתוב בחלון?</p>`,
      expect:"בסוף נפתח חלון של מיינקראפט, לבד. מרימים יד כשזה קורה.",
      note:"לא לוחצים עם העכבר בתוך החלון השחור. לחיצה יכולה לעצור אותו. אם הוא נעצר, לוחצים Enter.",
      visual:()=>`<div class="console"><span class="w">MAKE - Minecraft modding - install from USB</span>
Do NOT close this window and do NOT pull out the stick.

[1/3] Copying from the stick ...
[1/3] Copy OK
[2/3] "Minecraft - Play" and "Minecraft - Code" are on the desktop
Copy finished at 16:12. <span class="w">You can take the stick out now.</span>

[3/3] Starting Minecraft to check it works. No internet needed.
&gt; Task :runClient</div>` },

    { type:"שיחה", title:"מה זה מוד, ומי כותב את הקוד?",
      body:`<p><b>מוד</b> זה תוספת שמשנה את מיינקראפט: חפצים חדשים, יצורים חדשים, חוקים חדשים.</p>
        <p>את הקוד יכתוב <b>ג׳מיני</b>. אתם הבמאים: אתם מחליטים מה יהיה בעולם, ובודקים שהוא באמת עשה את זה.</p>`,
      why:"מי שאומר לבינה מלאכותית ״תבנה לי את זה״ מקבל משהו שהוא לא בחר. מי שמסביר בדיוק מה הוא רוצה, יכול גם לבדוק שקיבל את זה.",
      visual:()=>EQ + ROLES },

    { type:"שיחה", title:"״תבנה לי חרב״ מול כרטיס",
      body:`<p>המורה שולח לג׳מיני את שתי הבקשות, על המסך.</p><p><b>מצביעים:</b> איזו תשובה יותר טובה? למה?</p>`,
      note:"ג׳מיני לפעמים טועה, ובטוח שהוא צודק. לכן תמיד בודקים במשחק.",
      visual:()=>VAGUE_SPECIFIC },

    { type:"פעילות", title:"כרטיס העולם שלי",
      body:`<p>10 דקות. ממלאים על הנייר, או כאן.</p><p>אין תשובות נכונות. זה העולם שלכם.</p>`,
      why:"משפט קצר על העולם עונה בשבילכם על המון שאלות אחר כך: איזה יצורים יש, איזה צבעים, מה מסוכן.",
      hints:[
        "חושבים על משהו שאתם אוהבים: חיה, מקום, תקופה, מאכל. מה קורה אם הוא ענק? מפחיד? חי בשמיים?",
        "דוגמאות: ״פיראטים בשמיים על איים מרחפים״ · ״יער שהלילה בו לא נגמר״ · ״דבורים ענקיות שבנו עיר מדבש״."
      ],
      visual:()=>worldCardForm() },

    { type:"בדיקה", title:"מיינקראפט נפתח!",
      body:`<ol>
        <li>לוחצים <b>Singleplayer</b>.</li>
        <li>לוחצים על <b>Game Mode</b> עד שכתוב <b>Creative</b>, ואז <b>Create New World</b>.</li>
        <li>כשאתם בתוך העולם, לוחצים <kbd>F2</kbd>. זה מצלם את המסך.</li>
        <li>לוחצים <kbd>Esc</kbd>, ואז <b>Mods</b>, ומחפשים את המוד ברשימה.</li>
      </ol>`,
      expect:"ברשימת המודים יש מוד בשם Example Mod. זה המוד שלכם. בשיעור הבא הוא יקבל את השם של העולם שלכם.",
      note:"קפץ מסך Welcome to Minecraft? לוחצים Continue. מיינקראפט עוד לא נפתח? זה בסדר: ממשיכים לשלב הבא ובודקים שוב בסוף.",
      visual:()=>`<div class="mcmenu"><div class="logo">MINECRAFT</div>
        <div class="mcbtn hot">Singleplayer <small>← 1</small></div><div class="mcbtn">Multiplayer</div><div class="mcbtn hot">Mods <small>← 4</small></div><div class="mcbtn">Options...</div></div>` },

    { type:"בדיקה", title:"פוגשים את ג׳מיני",
      body:`<ol>
        <li>פותחים את Chrome ונכנסים ל־<code>gemini.google.com</code>.</li>
        <li>מתחברים עם חשבון משרד החינוך שלכם.</li>
        <li>${GEM_LINK ? `פותחים את ה־Gem של הכיתה: <a href="${esc(GEM_LINK)}" target="_blank" rel="noopener">עוזר המודים</a>.` : `פותחים את ה־Gem של הכיתה, <b>עוזר המודים</b>. המורה ייתן את הקישור.`}</li>
        <li>מעתיקים את ההודעה מהמסגרת, מוסיפים בסוף את העולם שלכם, ושולחים.</li>
        <li>עונים על השאלה שג׳מיני שואל.</li>
      </ol>`,
      expect:"ג׳מיני עונה בעברית ושואל אתכם שאלה על העולם שלכם.",
      note:"לא כותבים לג׳מיני את השם האמיתי שלכם, את בית הספר או איפה אתם גרים.",
      stuck:[["לא מצליחים להתחבר","בודקים שזה החשבון של משרד החינוך. אם זה עדיין לא עובד, מרימים יד."],["כתוב שאין גישה ל־Gemini","מרימים יד."]],
      visual:()=>gemPromptBox("שלום! היום מתחילים מוד למיינקראפט. העולם שלי: ") + `<div class="chat"><div class="bub me"><b>אתם</b>שלום! היום מתחילים מוד למיינקראפט. העולם שלי: פיראטים בשמיים על איים מרחפים</div><div class="bub ai"><b>עוזר המודים</b>נשמע מסקרן! שאלה ראשונה: מה מחזיק את האיים באוויר?</div></div>` },

    { type:"סיום", title:"מסיימים",
      body:`<ul><li>שמים את כרטיס העולם בתיקייה, לפי מספר המחשב.</li><li>מחברים את המחשב לחשמל.</li><li>החלון השחור עוד עובד? משאירים את המחשב פתוח.</li></ul>`,
      expect:"בשיעור הבא: החפץ הראשון שלכם, בתוך המשחק.",
      visual:()=>`<div class="checks"><div><span class="ok"></span>מיינקראפט נפתח וצילמתי מסך</div><div><span class="ok"></span>כרטיס העולם מלא ובתיקייה</div><div><span class="ok"></span>ג׳מיני ענה לי</div></div>` }
  ],
  challenges:[
    {id:"mc", lvl:"חובה", t:"מיינקראפט עובד", d:"נכנסתי לעולם Creative ומצאתי את המוד ברשימה."},
    {id:"card", lvl:"חובה", t:"כרטיס עולם", d:"העולם שלי בשורה אחת, ושלושה צבעים."},
    {id:"gem", lvl:"חובה", t:"ג׳מיני ענה", d:"שלחתי הודעה ל־Gem ועניתי על שאלה אחת."}
  ]
};

/* ===== world card ===== */
const WC_FIELDS = [
  {id:"theme", label:"העולם שלי בשש מילים או פחות", ph:"פיראטים בשמיים על איים מרחפים"},
  {id:"like", label:"זה כמו ___ במיינקראפט הרגיל, חוץ מזה ש___", ph:"כמו ה־End, חוץ מזה שיש בו ספינות"}
];
function worldCardForm(){
  const v = LS.get("worldcard", {});
  const cols = v.colors || ["#4A90C2","#E8D9B0","#7A4B2A"];
  return `<div class="wcard"><div class="hd"><h3>כרטיס העולם שלי</h3><span class="chip">מחשב ${esc(LS.get("seat","?"))}</span></div>
    ${WC_FIELDS.map(f=>`<div class="fld"><label for="wc-${f.id}">${f.label}</label><input type="text" id="wc-${f.id}" data-wc="${f.id}" placeholder="למשל: ${esc(f.ph)}" value="${esc(v[f.id]||"")}" maxlength="120"></div>`).join("")}
    <div class="fld"><label>שלושה צבעים של העולם שלי</label><div class="sw">${cols.map((c,i)=>`<input type="color" id="wc-c${i}" data-wcc="${i}" value="${esc(c)}" aria-label="צבע ${i+1}">`).join("")}</div></div>
    <div class="saved" id="wc-saved"></div></div>`;
}
function bindWorldCard(root){
  const save = () => {
    const v = {};
    root.querySelectorAll("[data-wc]").forEach(i => v[i.dataset.wc] = i.value);
    v.colors = [...root.querySelectorAll("[data-wcc]")].map(i => i.value);
    LS.set("worldcard", v);
    const s = root.querySelector("#wc-saved"); if (s) s.textContent = "נשמר על המחשב הזה";
  };
  root.querySelectorAll("[data-wc],[data-wcc]").forEach(i => i.addEventListener("input", save));
}

/* ===== copy ===== */
function bindCopy(root){
  root.querySelectorAll("[data-copy]").forEach(b => b.addEventListener("click", () => {
    const text = b.dataset.copy;
    const done = () => { const o = b.textContent; b.textContent = "הועתק"; setTimeout(()=>b.textContent = o, 1400); };
    const fallback = () => { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try{ document.execCommand("copy"); done(); }catch(e){} t.remove(); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  }));
}
function bindSil(root){
  root.querySelectorAll("[data-sil]").forEach(b => b.addEventListener("click", () => {
    b.classList.add("shown"); b.querySelector(".nm").textContent = MOBS[+b.dataset.sil].name;
  }));
}

/* ===== lesson 1 slides ===== */
const SLIDES = [
  { label:"פתיחה", html:`<div class="eye">שיעור 1 · מודים למיינקראפט</div><h1>העולם שלכם מתחיל היום</h1><p class="sub">20 שיעורים. בסוף, המשפחות והחברים ישחקו בעולם שאתם המצאתם.</p>`,
    notes:"0–15 דק׳. עוד לפני שמדברים: מחלקים מחשבים לפי מספר ומעבירים את הדיסק און קי. המסך הבא הוא הוראות ההתקנה." },
  { label:"מתקינים", html:`<h2>מתחילים להתקין</h2><ol class="big"><li>דיסק און קי במחשב</li><li><kbd>Win</kbd> + <kbd>E</kbd> ← לוחצים על הדיסק</li><li>לחיצה כפולה על <code>install-from-usb</code></li><li>חלון שחור נפתח. <b>לא סוגרים!</b></li><li>כשכתוב שאפשר, מעבירים את הדיסק הלאה</li></ol>`,
    notes:"דיסק אחד מתקין מחשב אחד בכל פעם, בערך 5 דקות. עם 3 דיסקים, המחשב האחרון מתחיל רק אחרי 10 דקות, אז מתחילים לדבר כשהסבב הראשון רץ ולא מחכים לכולם. מי שקיבל ERROR: לא לסגור, לצלם, להמשיך עם שותף." },
  { label:"מה נעשה", html:`<h2>מה נעשה בקורס</h2>${EQ}<p class="sub">חפצים · יצורים · מקום · חוקים · סיפור. הכול שלכם.</p>`,
    notes:"15–20 דק׳. אם יש לך מוד שעובד, מראים אותו עכשיו. בסוף הקורס המשפחות באות ומשחקות. קצר." },
  { label:"הדרך", html:`<h2>הדרך עד התערוכה</h2><ul class="big"><li>שיעורים 2–5: החפצים הראשונים</li><li>שיעורים 6–9: המקום שלכם והיצור הראשון</li><li><b>שיעור 10: תערוכה 1</b></li><li>שיעורים 11–15: יצור שרק אתם המצאתם</li><li><b>שיעור 20: תערוכה 2, המשפחות מגיעות</b></li></ul>`,
    notes:"מה בונים בכל חלק של הקורס. אפשר להאריך כאן אם ההתקנות עוד רצות." },
  { label:"מי עושה מה", html:`<h2>מי כותב את הקוד?</h2>${ROLES}`,
    notes:"ג׳מיני כותב קוד, אתם ממציאים ובודקים." },
  { label:"״תבנה לי חרב״", html:`<h2>״תבנה לי חרב״ מול כרטיס</h2>${VAGUE_SPECIFIC}`,
    notes:"20–35 דק׳. הדגמה חיה על המקרן, בג׳מיני הרגיל (לא ב־Gem: הוא לא כותב קוד בלי כרטיס): קודם ״תבנה לי חרב למיינקראפט״, מראים מה חזר (שמות שהוא בחר, אולי net.minecraftforge, כלומר קוד ישן). אחר כך מדביקים את הכרטיס. הצבעה: איזו תשובה יותר טובה ולמה." },
  { label:"כרטיס העולם", html:`<h2>כרטיס העולם שלכם</h2><div class="wcard">
      <div class="ln">העולם שלי בשש מילים או פחות<br><span>״ברברים על כלבי מלחמה, כולם בפרוות״</span></div>
      <div class="ln">זה כמו ___ במיינקראפט הרגיל, חוץ מזה ש___</div>
      <div class="ln">שלושה צבעים של העולם שלי</div></div><p class="sub">10 דקות</p>`,
    notes:"35–50 דק׳. מחלקים כרטיסים מודפסים. בדרך בודקים אילו מחשבים כבר פתחו את מיינקראפט." },
  { label:"דוגמאות", html:`<h2>עולם בשורה אחת</h2><ul class="big"><li>פיראטים בשמיים על איים מרחפים</li><li>יער שהלילה בו לא נגמר</li><li>דבורים ענקיות שבנו עיר מדבש</li></ul><p class="sub">קצר. מישהו אחר יכול לדמיין את זה מיד.</p>`,
    notes:"להשאיר על המסך בזמן שהם כותבים. מי שמעתיק דוגמה כמו שהיא, מחליף בה לפחות מילה אחת." },
  { label:"צלליות", html:`<h2>מי זה?</h2><div class="sil">${MOBS.map((m,i)=>`<button data-sil="${i}" aria-label="צללית ${i+1}">${silSVG(m)}<span class="nm">?</span></button>`).join("")}</div>`,
    notes:"ממלא זמן: רק אם ההתקנות עוד רצות. לוחצים על צללית כדי לחשוף. אחרי כל אחת: ״איך ידעתם?״" },
  { label:"מיינקראפט נפתח?", html:`<h2>מיינקראפט נפתח?</h2><ol class="big"><li>Singleplayer</li><li>Game Mode: <b>Creative</b> ← Create New World</li><li><kbd>F2</kbd> מצלם את המסך</li><li><kbd>Esc</kbd> ← Mods ← מוצאים את המוד</li></ol>`,
    notes:"50–80 דק׳, יחד עם השקופית הבאה. בפעם הראשונה קופץ מסך Welcome to Minecraft: לוחצים Continue. מי שמיינקראפט עוד לא נפתח אצלו מתחיל מג׳מיני. מי שסיים הכול: בונה בעולם שלו." },
  { label:"ג׳מיני", html:`<h2>פוגשים את ג׳מיני</h2><ol class="big"><li><code>gemini.google.com</code></li><li>חשבון משרד החינוך</li><li>פותחים את ה־Gem: <b>עוזר המודים</b></li><li>שולחים: ״שלום! העולם שלי: ...״</li><li>עונים על השאלה שהוא שואל</li></ol>`,
    notes:"בודקים כבר היום שכל ילד מגיע לג׳מיני, ולא מגלים בשיעור 2 שזה חסום. ההתחברות לוקחת זמן: מי שמחכה למיינקראפט מתחיל מכאן. לרשום מספרי מחשבים שלא הצליחו." },
  { label:"סיום", html:`<h2>בשבוע הבא</h2><p class="quote">החפץ הראשון שלכם, בתוך המשחק</p><ul class="big"><li>כרטיס העולם ← לתיקייה</li><li>מחשב ← לחשמל</li><li>החלון השחור עוד עובד? משאירים פתוח</li></ul>`,
    notes:"80–90 דק׳. לרשום אילו מחשבים לא סיימו את ההתקנה, ולבדוק אותם אחרי השיעור." }
];

/* ===== teacher ===== */
const GEM_TEXT = `You are "עוזר המודים" (the Mod Helper), a helper for a class of 11-13-year-olds in Israel who are each building their own Minecraft mod. Their teacher is Ben. Always answer in simple, short Hebrew. Code, file names and paths stay in English.

THE SETUP (never change it)
- Minecraft Java Edition 26.2, NeoForge 26.2.0.88, Java 25, ModDevGradle. Mojang's official names (the game is no longer obfuscated).
- The project is the official NeoForge 26.2 MDK. Java code is in src/main/java/..., assets in src/main/resources/assets/<modid>/...
- Never use net.minecraftforge, Forge, Fabric, or code written for Minecraft 1.21 or older. Most tutorials online are for old versions.
- Known 26.x changes that old code gets wrong: ResourceLocation is now Identifier; entity save/load uses ValueInput/ValueOutput; every item needs a client item file in assets/<modid>/items/<name>.json; entity renderers use render states.
- If you're not sure something exists in 26.2, say so plainly and tell the kid how to check it in the game. Never invent a method or class.

HOW YOU WORK WITH THE KID
1. Card first. Only write code when the kid gives you a filled card: a name, what it does in one sentence, its cost or weakness, and 2-3 things they will see in the game. If the request is vague ("תבנה לי חרב", "תעשה משהו מגניב"), don't write code. Ask the card's questions, ONE question per message.
2. The ideas belong to the kid. Never suggest names, stories, tooltips, abilities, colours or textures, even if they ask. You may ask hard questions ("מה קורה אם...?", "למה שחקן ירצה את זה?") and point out problems, but the kid chooses the answers. If they ask you to invent it, say kindly that this part is theirs, and ask one question that helps them think.
3. Whole files only. One complete file per answer, ready to paste, with the full file path on the first line. Never snippets, never "add this line here". If more files are needed, say how many, and send the next one when the kid writes "הבא".
4. Before the code: one short Hebrew sentence saying what the file does. After the code: "במשחק אמורים לראות:" followed by the claims from the kid's card.
5. "לא עובד" is not a bug report. Ask: what did you do, what did you expect, what happened instead, and what is the first red error line (a screenshot is fine). Then fix it and send the whole file again.
6. If you were wrong, say "טעיתי" plainly and fix it.

LIMITS
- Age-appropriate always. Never ask for their real name, school, address or photos, and tell them not to share these.
- Stay on the mod. If they drift, bring them back in one sentence.
- If the kid only says hello: greet them in one line, say in one line that you help turn their cards into a working mod, and ask one question about their world.`;

const TEACHER_CHECK = [
  ["install","הרצת install.bat על המחשב שלך, ומיינקראפט נפתח","מהמחשב הזה מכינים את הדיסקים."],
  ["usb","הכנת דיסקים עם make-usb.bat","כמה שיותר: דיסק אחד מתקין מחשב אחד בכל פעם. עם 3 דיסקים המחשב האחרון מתחיל אחרי 10 דקות. פורמט exFAT או NTFS, לא FAT32."],
  ["school","הרצת school-check.bat על מחשב אחד של בית הספר","שולחים צילום של התוצאה ל־Claude."],
  ["laptops","המחשבים ממוספרים 1–8 וטעונים","כל ילד מקבל את אותו מחשב כל שבוע."],
  ["gem","יצרת את ה־Gem ״עוזר המודים״ ושיתפת עם הכיתה","ההוראות למטה. את קישור השיתוף שולחים ל־Claude, כדי שייכנס לדף של הילדים."],
  ["gemtest","בדקת את ג׳מיני עם חשבון תלמיד","יש גישה? ה־Gem נפתח? כמה זמן לוקחת ההתחברות?"],
  ["print","הדפסת 10 כרטיסי עולם","8 ועוד 2 לגיבוי. אפשר להדפיס מהשלב ״כרטיס העולם״."],
  ["proj","בדקת את ״הצגת שיעור 1״ על המקרן בכיתה",""]
];

function applyReveal(root, set){
  root.querySelectorAll("[data-sil]").forEach(b => { if (set.has(+b.dataset.sil)) { b.classList.add("shown"); b.querySelector(".nm").textContent = MOBS[+b.dataset.sil].name; } });
}
window.HUB = { CSS, injectStyle, FONT_HREF, GEM_LINK, LS, esc, UNITS, MOBS, silSVG, EQ, ROLES, VAGUE_SPECIFIC,
  gemPromptBox, L1, worldCardForm, bindWorldCard, bindCopy, bindSil, applyReveal, SLIDES, GEM_TEXT, TEACHER_CHECK };
})();
