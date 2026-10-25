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
[dir="ltr"] .hotbar{direction:ltr}
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
.sil .face{width:100%;max-width:110px}
.sil .face>i{transform:scale(4.5);transform-origin:var(--ox,30%) var(--oy,48%);transition:transform .6s}
.sil button.shown .face>i{transform:none}
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
.slide .sil .face{max-width:clamp(70px,11cqw,150px)}
.slide .sil button{padding:clamp(6px,1cqw,12px)}
.slide .sil{grid-template-columns:repeat(4,minmax(0,1fr))}
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

/* ---------- DOCK: Minecraft buttons at the top of the kids' hub ---------- */
#dock:empty{display:none}
.pbar:has(.dock){position:static}
.wrap #dock{margin-top:20px}
.dock{display:grid;gap:10px;background:var(--surface);border:2px solid var(--ink);border-radius:8px;padding:12px;box-shadow:0 4px 0 var(--ink)}
.dock-btns{display:grid;grid-template-columns:2fr repeat(5,1fr);gap:10px}
a.dbtn{text-decoration:none}
/* code lock */
.lockv{min-height:100vh;display:grid;place-items:center;padding:20px;background:var(--bg)}
.lockbox{background:var(--surface);border:3px solid var(--ink);border-radius:12px;box-shadow:0 6px 0 var(--ink);padding:28px 26px;display:grid;gap:12px;justify-items:center;text-align:center;width:min(420px,100%)}
.lockbox .lk-ico svg{width:46px;height:46px;color:var(--grass)}
.lockbox h1{font-size:1.9rem}
.lockbox p{color:var(--muted);margin:0}
.lk-dots{display:flex;gap:14px;margin:6px 0}
.lk-dots i{width:22px;height:22px;border-radius:50%;border:3px solid var(--ink)}
.lk-dots i.on{background:var(--grass);border-color:var(--grass)}
.lk-msg{min-height:1.5em;color:var(--red);font-weight:700}
.lk-pad{display:grid;grid-template-columns:repeat(3,72px);gap:10px}
.lk-pad button{height:64px;font:inherit;font-size:1.7rem;font-weight:800;border:3px solid var(--ink);border-radius:8px;background:var(--surface);box-shadow:0 3px 0 var(--ink);cursor:pointer;color:var(--ink)}
.lk-pad button:active{transform:translateY(2px);box-shadow:0 1px 0 var(--ink)}
.lk-low{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.dbtn{display:flex;align-items:center;justify-content:center;gap:10px;min-height:60px;padding:8px 12px;border:2px solid var(--ink);border-radius:6px;background:var(--surface);color:var(--ink);font-weight:800;font-size:1.05rem;box-shadow:0 3px 0 var(--ink)}
.dbtn svg{width:26px;height:26px;flex:none}
.dbtn:active{transform:translateY(2px);box-shadow:0 1px 0 var(--ink)}
.dbtn.go{background:var(--grass);color:var(--grass-ink);border-color:var(--grass);box-shadow:0 3px 0 color-mix(in srgb,var(--grass) 55%,#000);font-size:1.2rem}
.dbtn[disabled]{opacity:.4;cursor:default;box-shadow:none;transform:none}
.dock-status{display:flex;align-items:center;gap:10px;font-size:1.05rem;padding:8px 12px;border-radius:6px;background:var(--sunk);min-height:2.6em}
.dock-status.busy{background:var(--sky-soft)}
.dock-status.live{background:var(--grass-soft)}
.dock-status.bad{background:var(--xp-soft)}
.spin{width:16px;height:16px;flex:none;border:3px solid var(--sky);border-left-color:transparent;border-radius:50%;animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.dock-err{background:var(--xp-soft);border-radius:6px;padding:12px 14px;display:grid;gap:6px;font-size:1.1rem}
.dock-err ol{margin:0;padding-inline-start:1.3em;display:grid;gap:2px}
.dbtn[aria-expanded="true"]{background:var(--sunk)}
.dock-vers{border-top:1px solid var(--line);padding-top:10px;display:grid;gap:8px}
.dock-vers .vhead{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.vnote{color:var(--muted);font-size:.92em}
.nogem{display:grid;gap:4px;justify-items:start;margin-top:14px}
.st-entry{display:grid;grid-template-columns:1fr auto;gap:2px 14px;align-items:center;margin-top:16px;padding:14px 18px;border:3px solid var(--grass);border-radius:10px;background:var(--grass-soft);color:var(--ink);text-decoration:none;box-shadow:0 4px 0 var(--grass)}
.st-entry b{font-family:var(--display);font-weight:400;font-size:1.6rem;color:var(--grass)}
.st-entry span{grid-column:1;color:var(--ink)}
.st-entry i{grid-row:1 / span 2;grid-column:2;font-style:normal;font-size:1.8rem;color:var(--grass)}
[dir="ltr"] .st-entry i{transform:scaleX(-1)}
.nogem small{color:var(--muted)}
.drv{background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:8px 12px}
.drv h4{margin:0 0 4px}
.drv ol{margin:0;padding-inline-start:22px;display:grid;gap:6px}
.vlist{list-style:none;margin:0;padding:0;display:grid;gap:6px;max-height:280px;overflow:auto}
.vlist li{display:grid;grid-template-columns:auto auto 1fr auto;gap:12px;align-items:center;background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:6px 10px}
.vlist .vt{font-weight:800;font-variant-numeric:tabular-nums}
.vlist .vd{color:var(--muted);font-size:.9em}
.vlist .vw{min-width:0}
@media (max-width:760px){.dock-btns{grid-template-columns:1fr 1fr}.dbtn.go{grid-column:1 / -1}.vlist li{grid-template-columns:auto 1fr auto}.vlist .vd{display:none}}

/* ---------- LESSON 2: the loop, the item card, the pixel editor ---------- */
.flow{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px}
.flow .st{border:2px solid var(--ink);border-radius:6px;background:var(--bg);box-shadow:0 3px 0 var(--ink);padding:10px 14px;display:grid;gap:2px;text-align:center;min-width:120px}
.flow .st b{font-family:var(--display);font-weight:400;font-size:1.2em}
.flow .st small{color:var(--muted)}
.flow .st.go{background:var(--grass-soft);border-color:var(--grass);box-shadow:0 3px 0 var(--grass)}
.flow .ar{font-size:1.4em;color:var(--muted)}
.split{display:grid;grid-template-columns:1fr 1fr;gap:10px;direction:ltr}
.split div{border:2px dashed var(--line);border-radius:6px;padding:28px 10px;text-align:center;font-weight:700;background:var(--bg)}
.px{display:grid;gap:12px}
.px-top{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.px-top input{font:inherit;direction:ltr;border:1px solid var(--line);border-radius:4px;padding:.35em .6em;background:var(--surface);color:var(--ink);width:14em}
.px-main{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start}
.px canvas.big{width:min(340px,100%);aspect-ratio:1;image-rendering:pixelated;border:2px solid var(--ink);border-radius:4px;touch-action:none;cursor:crosshair;background:#fff}
.px-side{display:grid;gap:10px;min-width:0}
.px-pal{display:grid;grid-template-columns:repeat(8,28px);gap:4px}
.px-pal button{width:28px;height:28px;border:2px solid var(--line);border-radius:4px;padding:0}
.px-pal button.on{outline:3px solid var(--ink);outline-offset:1px}
.px-pal input[type=color]{width:28px;height:28px;padding:0;border:2px solid var(--line);border-radius:4px;background:none}
.px-tools{display:flex;flex-wrap:wrap;gap:6px}
.px-tools .btn{padding:.3em .7em}
.px-tools .btn.on{background:var(--sunk)}
.px-prev{display:flex;gap:12px;align-items:flex-end}
.px-prev canvas{image-rendering:pixelated;border:1px solid var(--line);background:repeating-conic-gradient(var(--sunk) 0 25%, var(--surface) 0 50%) 0 0/8px 8px}
.px-msg{min-height:1.4em;font-weight:700}
.px-msg.ok{color:var(--grass)}
.px-msg.bad{color:var(--red)}

/* Gemini screen mock (lesson 1) */
.gm{display:grid;grid-template-columns:150px 1fr;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--bg);min-height:260px}
.gm-side{background:var(--sunk);padding:12px;display:grid;align-content:start;gap:8px;font-size:.92em}
.gm-new{background:var(--surface);border-radius:16px;padding:6px 10px;font-weight:700}
.gm-lbl{color:var(--muted);font-size:.85em;margin-top:6px}
.gm-gem{background:var(--grass-soft);border-radius:6px;padding:6px 10px;font-weight:700}
.gm-main{padding:12px;display:grid;align-content:end;gap:10px;min-width:0}
.gm-code{position:relative;background:var(--console);color:var(--console-ink);border-radius:8px;padding:10px 12px;font-family:var(--mono);font-size:.8rem;text-align:left}
.gm-code pre{margin:0;white-space:pre-wrap}
.gm-copy{position:absolute;top:6px;right:8px;background:var(--xp);color:#111;border-radius:4px;padding:0 6px;font-family:var(--body);font-weight:800}
.gm-input{border:2px solid var(--ink);border-radius:20px;padding:8px 14px;color:var(--muted)}
.gm i{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:var(--xp);color:#111;font-style:normal;font-weight:800;font-size:.8em;margin-inline-start:6px}

/* ---------- pictures for the design talks ---------- */
.pc{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:14px;width:100%}
.pc figure{margin:0;display:grid;gap:8px;justify-items:center;align-content:start}
.pc .mc{width:100%}
.pc figcaption{font-family:var(--display);font-size:1.15em;line-height:1.2}
.pc figcaption small{display:block;font-family:var(--body);color:var(--muted);font-size:.8em}
.sws{display:flex;gap:6px;justify-content:center}
.sws i{width:clamp(26px,4.4cqw,58px);aspect-ratio:1;border:3px solid var(--ink);border-radius:4px}
.pal{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:18px;width:100%}
.pal figure{margin:0;display:grid;gap:10px;justify-items:center;background:var(--surface);border:3px solid var(--ink);border-radius:8px;padding:16px;box-shadow:0 5px 0 var(--ink)}
.pal figcaption{font-family:var(--display);font-size:1.6em;color:var(--grass)}
.its{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;width:100%}
.crafts{display:flex;flex-wrap:wrap;gap:22px;justify-content:center;width:100%}
.crafts figure{margin:0;display:grid;gap:8px;justify-items:center}
.crafts figcaption{display:grid;text-align:center;font-weight:700}
.crafts figcaption b{font-size:1.1rem}
.craft{display:flex;align-items:center;gap:10px;background:#C6C6C6;border:3px solid;border-color:#fff #555 #555 #fff;border-radius:4px;padding:10px}
.craft .cg{display:grid;grid-template-columns:repeat(3,44px);gap:3px}
.craft .cs{width:44px;height:44px;box-sizing:border-box;background:#8B8B8B;border:3px solid;border-color:#373737 #fff #fff #373737;padding:5px;position:relative;display:block}
.craft .co{width:54px;height:54px;padding:6px}
.craft .co b{position:absolute;bottom:0;right:4px;color:#fff;font-family:var(--display);font-weight:400;text-shadow:2px 2px 0 #3f3f3f}
.craft .ca{font-size:1.6rem;color:#8B8B8B}
.craft .mc.nomc img{visibility:hidden}
.its figure{margin:0;display:grid;gap:6px;justify-items:center;width:clamp(76px,10cqw,128px);align-content:start}
.mc{display:block;position:relative}
.mc img{display:block;width:100%;height:auto;image-rendering:pixelated}
.mc svg{display:none;width:100%;height:auto}
.mc.nomc>img,.mc.nomc>i,.mc.nomc>.tiles{display:none}
.mc.nomc>svg{display:block}
.mc.mslot{width:100%;box-sizing:border-box;background:var(--slot-in);border:3px solid;border-color:#555 #fff #fff #555;padding:clamp(4px,.9cqw,12px);aspect-ratio:1}
.mc.mslot>img,.mc.mslot>svg{width:100%;height:100%;object-fit:contain}
.scn{border:3px solid var(--ink);border-radius:4px;overflow:hidden;background:var(--air)}
.scn .tiles{display:grid;grid-template-columns:repeat(8,1fr);direction:ltr}
.scn .tiles>*{display:block;width:100%;aspect-ratio:1;object-fit:cover;object-position:top}
.scn .tiles .lf{filter:sepia(1) saturate(5) hue-rotate(55deg) brightness(.7)}
.scn svg{border:0!important;border-radius:0!important}
.face{overflow:hidden;border:3px solid var(--ink);border-radius:4px;background:var(--slot-in)}
.face>i{display:block;width:100%;background-repeat:no-repeat;image-rendering:pixelated}
.face>.probe{display:none!important}
.face svg rect{fill:var(--ink)}
.slotpx{display:block}
.its figcaption{font-weight:700;font-size:.85em;text-align:center;line-height:1.2}
.cmp{display:grid;grid-template-columns:auto 1fr 1fr;width:min(880px,100%);text-align:right;border:3px solid var(--ink);border-radius:8px;overflow:hidden;font-size:clamp(1rem,2.1cqw,1.55rem)}
.cmp>div{padding:.45em .8em;border-bottom:1px solid var(--line);background:var(--surface)}
.cmp .h{font-family:var(--display);background:var(--sunk)}
.cmp .x{background:var(--red-soft);font-weight:700}
.ab{display:grid;grid-template-columns:1fr auto 1fr;gap:16px;align-items:stretch;width:100%}
.ab>div{border:3px solid var(--ink);border-radius:8px;padding:1em;background:var(--surface);box-shadow:0 5px 0 var(--ink);display:grid;gap:.3em;align-content:center;font-size:clamp(1.1rem,2.5cqw,1.9rem);font-weight:700}
.ab .l{font-family:var(--display);font-weight:400;font-size:1.7em;color:var(--grass);line-height:1}
.ab .or{border:0;box-shadow:none;background:none;font-family:var(--display);font-weight:400;color:var(--muted);padding:0}
.bal{display:grid;gap:10px;width:min(940px,100%);font-size:clamp(.95rem,2cqw,1.45rem);text-align:right}
.bal .r{display:grid;grid-template-columns:clamp(54px,8cqw,92px) minmax(0,.7fr) minmax(0,1fr) minmax(0,1fr);gap:10px;align-items:stretch}
.bal .r>b{align-self:center;font-family:var(--display);font-weight:400;font-size:1.15em}
.bal .get,.bal .pay,.bal .job{border-radius:6px;padding:.45em .7em;display:grid;align-content:center}
.bal .get,.bal .job{background:var(--grass-soft)}
.bal .pay{background:var(--red-soft)}
.bal small{display:block;font-size:.68em;font-weight:800;letter-spacing:.03em}
.bal .get small,.bal .job small{color:var(--grass)}
.bal .pay small{color:var(--red)}
.bal .r.two{grid-template-columns:clamp(54px,8cqw,92px) minmax(0,.7fr) minmax(0,2fr)}
.stk{display:flex;gap:clamp(16px,4cqw,48px);justify-content:center;align-items:flex-end;flex-wrap:wrap;width:100%}
.stk figure{margin:0;display:grid;gap:8px;justify-items:center}
.stk .g{display:grid;gap:2px;width:clamp(96px,15cqw,176px)}
.stk .g i{aspect-ratio:1;border-radius:1px}
.stk figcaption{font-family:var(--display);font-size:1.5em;line-height:1.1}
.stk figcaption small{display:block;font-family:var(--body);font-size:.55em;color:var(--muted)}
.z16{display:flex;gap:clamp(16px,4cqw,44px);align-items:center;justify-content:center;flex-wrap:wrap;width:100%}
.z16 .big{width:clamp(180px,30cqw,330px)}
.z16 .big .mc{background:var(--slot-in);border:3px solid var(--ink)}
.z16 .big .mc::after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(0,0,0,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,.3) 1px,transparent 1px);background-size:6.25% 6.25%}
.z16 .side{display:grid;gap:14px;text-align:right;font-size:clamp(1rem,2.1cqw,1.5rem)}
.z16 .real{display:flex;gap:12px;align-items:center}
.z16 .real .mc{width:40px;flex:none;border-width:2px;padding:4px}
.z16 b{font-family:var(--display);font-weight:400;font-size:1.5em;color:var(--grass)}
.hero1{display:flex;gap:clamp(16px,4cqw,40px);align-items:center;justify-content:center;flex-wrap:wrap}
.hero1 .slotpx{width:clamp(110px,16cqw,190px)}
.hero1 div{text-align:right;display:grid;gap:6px}
.rules .who{display:flex;gap:10px;align-items:center}
.rules .who .face{width:clamp(46px,7cqw,88px);flex:none}
.rules small{color:var(--muted);font-weight:700}
.vid{width:min(100%,calc((100vh - 60px)*16/9));aspect-ratio:16/9;background:#000;border-radius:6px;overflow:hidden;display:grid;place-items:center;align-content:center;gap:12px;color:#fff;padding:0}
.vid iframe{width:100%;height:100%;border:0;display:block}
.vid .play{font-size:clamp(2rem,8cqw,5rem);line-height:1;opacity:.85}
.vid small{color:#ddd;max-width:34em;padding:0 16px}
.con-box .vid{width:100%}
.slide>*{animation:rise .38s both}
.slide>*:nth-child(2){animation-delay:.07s}.slide>*:nth-child(3){animation-delay:.14s}.slide>*:nth-child(4){animation-delay:.21s}.slide>*:nth-child(5){animation-delay:.28s}
@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
/* the same tiles outside a slide (kids' page) */
.work .rules{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.work .rules div{background:var(--bg);border:2px solid var(--line);border-radius:6px;padding:12px;display:grid;gap:4px}
.work .rules b{font-size:1.1em}
.work .rules .n{font-family:var(--display);font-size:1.6rem;color:var(--grass);line-height:1}

/* the small studio drawing in lesson steps */
.smock{border:2px solid var(--line);border-radius:10px;background:var(--bg);padding:10px;display:grid;gap:8px;font-size:.85rem;max-width:560px;margin-inline:auto}
.smock .sm-top{display:flex;gap:12px;align-items:center}
.smock .sm-top b{font-family:var(--display);font-weight:400;font-size:1.3rem}
.smock .sm-w{color:var(--muted);border-bottom:1px solid var(--line);padding:2px 6px}
.smock .sm-main{display:grid;grid-template-columns:120px 1fr;gap:8px}
.smock .sm-list{display:grid;gap:6px;align-content:start;background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:6px}
.smock .sm-card{display:flex;gap:6px;align-items:center;font-weight:700;border:2px solid var(--grass);border-radius:6px;padding:3px 5px;background:var(--grass-soft)}
.smock .sm-card i{width:14px;height:14px;background:#fed83d;border:1px solid #7a5a10}
.smock .sm-new{background:var(--grass);color:var(--grass-ink);font-weight:800;border-radius:6px;padding:4px 6px;text-align:center}
.smock .sm-edit{background:var(--surface);border:1px solid var(--line);border-radius:8px;overflow:hidden;display:grid}
.smock .sm-tabs{display:flex;border-bottom:1px solid var(--line)}
.smock .sm-tabs span{padding:5px 9px;font-weight:800;color:var(--muted)}
.smock .sm-tabs span.on{color:var(--ink);border-bottom:3px solid var(--grass)}
.smock .sm-body{display:grid;grid-template-columns:auto 1fr;gap:10px;padding:8px}
.smock .sm-grid{width:96px;height:96px;border:2px solid var(--ink);background:#eee}
.smock .sm-grid svg{width:100%;height:100%;display:block}
.smock .sm-fields{display:grid;gap:2px;align-content:start}
.smock .sm-fields small{color:var(--muted);font-weight:700}
.smock .sm-fields i{font-style:normal;border:1px solid var(--line);border-radius:4px;padding:1px 6px;background:var(--bg)}
.smock .sm-foot{display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding:6px 8px;color:var(--grass);font-weight:700}
.smock .sm-play{background:var(--grass);color:var(--grass-ink);border-radius:6px;padding:3px 10px}
.smock .hl{outline:3px solid #f5c400;outline-offset:2px;border-radius:6px;animation:smhl 1.4s ease-in-out infinite}
@keyframes smhl{50%{outline-color:transparent}}
@media (prefers-reduced-motion:reduce){.smock .hl{animation:none}}

/* a lesson's ready item */
.ready{display:grid;gap:16px;justify-items:center}
.ready .rb{display:grid;gap:6px;direction:rtl;min-width:280px}
.ready .rb div{padding:10px 14px;border-radius:8px;font-weight:800;color:#fff}
.ready .rb-h{background:hsl(35,45%,45%);border-radius:14px 14px 6px 6px}
.ready .rb-d{background:hsl(205,45%,45%);margin-inline-start:22px}
.ready .rb-p{background:hsl(0,45%,45%);margin-inline-start:22px}

/* ===== kids' hub, Oct rehaul: top bar, home card, one-step lesson screen ===== */
.tb{position:sticky;top:0;z-index:20;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px;background:var(--surface);border-bottom:1px solid var(--line);padding:8px 16px}
.tb-home{display:flex;align-items:center;gap:8px;text-decoration:none;color:var(--ink);font-family:var(--display);font-size:1.15rem}
.tb-home svg,.tb-menu svg{width:22px;height:22px}
.tb-mid{min-width:0;text-align:center}
.tb-lesson{font-family:var(--display);font-weight:400;font-size:1.1rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}
.tb-end{display:flex;align-items:center;gap:10px}
.tb-menu{display:flex;align-items:center;gap:6px;border:2px solid var(--line);background:var(--bg);border-radius:8px;padding:6px 12px;font-weight:700}
.tb-menu[aria-expanded="true"]{border-color:var(--grass);background:var(--grass-soft)}
.gpill{display:inline-flex;align-items:center;gap:6px;font-size:.85rem;font-weight:700;color:var(--muted);white-space:nowrap}
.gpill i{width:10px;height:10px;border-radius:50%;background:var(--line)}
.gpill.building i{background:var(--xp);animation:blink 1s infinite}
.gpill.running i{background:var(--grass)}
.gpill.error i{background:var(--red)}
.gpill.error{color:var(--red)}
.menu{background:var(--surface);border-bottom:2px solid var(--grass);padding:12px 16px;display:grid;gap:10px}
.menu[hidden]{display:none}
.menu-row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.menu .dock{border:0;box-shadow:none;padding:0;background:none}
.menu .dbtn{min-height:46px;font-size:.98rem}
.menu .seat{display:flex;gap:6px;align-items:center;font-weight:700;color:var(--muted)}
.gerr:empty{display:none}
.gerr{display:flex;gap:12px;align-items:center;flex-wrap:wrap;background:var(--red-soft);color:var(--ink);border-bottom:3px solid var(--red);padding:10px 16px}
.gerr b{color:var(--red)}
@keyframes blink{50%{opacity:.35}}
/* the game button inside a step */
[data-gbtn]{display:grid}
.gb-play{display:flex;align-items:center;justify-content:center;gap:14px;width:100%;max-width:520px;margin-inline:auto;padding:18px 24px;border:0;border-radius:12px;background:var(--grass);color:var(--grass-ink);font-family:var(--display);font-size:1.6rem;box-shadow:0 6px 0 color-mix(in srgb,var(--grass) 55%,#000)}
.gb-play svg{width:30px;height:30px}
.gb-play:active{transform:translateY(4px);box-shadow:0 2px 0 color-mix(in srgb,var(--grass) 55%,#000)}
.gb{display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap;max-width:620px;width:100%;margin-inline:auto;border-radius:12px;padding:16px 20px;border:2px solid var(--line);background:var(--bg)}
.gb div{display:grid;gap:2px}
.gb b{font-size:1.2rem}
.gb span{color:var(--muted)}
.gb.busy{border-color:var(--xp);justify-content:flex-start}
.gb.live{border-color:var(--grass);background:var(--grass-soft)}
.gb.bad{border-color:var(--red);background:var(--red-soft)}
.gb.off{color:var(--muted)}
.gb .spin,.spin{width:26px;height:26px;border:4px solid var(--line);border-top-color:var(--xp);border-radius:50%;animation:spin2 1s linear infinite;flex:none}
@keyframes spin2{to{transform:rotate(360deg)}}
/* home */
.h-hero{display:flex;gap:20px;align-items:center;justify-content:space-between;flex-wrap:wrap;background:var(--surface);border:3px solid var(--grass);border-radius:14px;padding:22px 24px;box-shadow:0 6px 0 var(--grass-soft)}
.h-txt{display:grid;gap:8px;min-width:240px;flex:1}
.h-txt small{color:var(--grass);font-weight:800}
.h-txt h1{font-size:clamp(1.6rem,4vw,2.4rem)}
.h-prog{height:12px;border-radius:6px;background:var(--sunk);overflow:hidden;max-width:420px}
.h-prog i{display:block;height:100%;background:var(--xp-bar);min-width:6px}
.h-step{color:var(--muted);font-weight:700}
.h-go{font-size:1.4rem;padding:.6em 1.6em}
.h-h{margin:34px 0 12px;font-size:1.4rem}
.h-h small{font-family:var(--body);font-size:.9rem;color:var(--muted);margin-inline-start:10px}
/* lesson */
.lp{min-height:100vh;display:grid;grid-template-rows:auto auto auto 1fr auto}
.lp-st{display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;padding:10px 16px;background:var(--bg)}
.lp-st button{display:flex;align-items:center;gap:8px;border:2px solid var(--line);background:var(--surface);border-radius:999px;padding:5px 14px 5px 8px;font-weight:700;color:var(--muted)}
.lp-st button span{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:var(--sunk);font-size:.85rem}
.lp-st button.done{color:var(--grass);border-color:var(--grass-soft)}
.lp-st button.done span{background:var(--grass);color:var(--grass-ink)}
.lp-st button.cur{color:var(--ink);border-color:var(--grass);background:var(--grass-soft)}
.lp-st button.cur span{background:var(--grass);color:var(--grass-ink)}
.lp-st i{width:22px;height:3px;background:var(--line);border-radius:2px}
.lp-main{padding:18px 16px 110px;display:grid;justify-items:center;align-items:start}
.lp-card{width:100%;max-width:980px;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:24px clamp(16px,3vw,32px);display:grid;gap:18px;box-shadow:0 4px 0 var(--line)}
.lp-head{display:flex;gap:16px;align-items:center}
.lp-tabs{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:-6px 0 -2px;padding-bottom:12px;border-bottom:1px solid var(--line)}
.lp-tabs > span{font-weight:800;color:var(--muted);margin-inline-end:4px}
.lp-tabs button{font:inherit;font-weight:800;padding:6px 14px;border:2px solid var(--line);border-radius:999px;background:var(--bg);color:var(--ink);cursor:pointer}
.lp-tabs button:hover{border-color:var(--grass)}
.lp-tabs button.on{background:var(--grass);border-color:var(--grass);color:var(--grass-ink)}
.lp-n{display:grid;place-items:center;flex:none;width:56px;height:56px;border-radius:14px;background:var(--grass);color:var(--grass-ink);font-family:var(--display);font-size:1.8rem}
.lp-head small{color:var(--muted);font-weight:700}
.lp-head h1{font-size:clamp(1.6rem,3.4vw,2.3rem)}
.lp-say{font-size:1.2rem;display:grid;gap:10px}
.lp-say ol,.lp-say ul{margin:0;padding-inline-start:1.4em;display:grid;gap:8px}
.lp-say li::marker{font-weight:800;color:var(--grass)}
.lp-do{display:grid;gap:14px}
.lp-expect{background:var(--grass-soft);border-radius:10px;padding:12px 16px;font-size:1.05rem}
.lp-expect b{display:block;color:var(--grass);font-size:.9rem}
.lp-note{background:var(--xp-soft);border-radius:10px;padding:12px 16px}
.lp-help{border:2px dashed var(--line);border-radius:10px;padding:10px 16px}
.lp-help summary{cursor:pointer;font-weight:800;color:var(--sky)}
.lp-help ul{margin:10px 0 0;padding:0;list-style:none;display:grid;gap:10px}
.lp-help li b{display:block}
.lp-card .chal{border-top:1px solid var(--line);padding-top:16px}
.lp-foot{position:fixed;bottom:0;left:0;right:0;z-index:15;display:grid;grid-template-columns:auto 1fr auto;gap:14px;align-items:center;background:var(--surface);border-top:1px solid var(--line);padding:12px 16px}
.lp-next{font-size:1.25rem;padding:.5em 1.6em}
.lp-dots{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}
.lp-dots i{width:12px;height:12px;border-radius:50%;background:var(--sunk);border:1px solid var(--line)}
.lp-dots i.done{background:var(--grass);border-color:var(--grass)}
.lp-dots i.cur{background:var(--xp);border-color:var(--xp);transform:scale(1.25)}
.lp-sub{font-size:1.4rem;margin-top:6px}
.ingame{margin:0;padding-inline-start:1.4em;display:grid;gap:8px;font-size:1.05rem}
.lp-studio{display:block}
.drv-in{display:grid;gap:12px;justify-items:start}
.drv-in ol{margin:0;padding-inline-start:1.3em;display:grid;gap:6px}
.drv-in svg{width:22px;height:22px}
/* the road of a lesson, drawn big on its first step */
.road{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;counter-reset:road}
.road div{position:relative;display:grid;gap:6px;justify-items:center;text-align:center;background:var(--bg);border:2px solid var(--line);border-radius:12px;padding:14px 10px}
.road b{font-size:1.1rem}
.road span{color:var(--muted);font-size:.95rem}
.road .rn{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--grass);color:var(--grass-ink);font-family:var(--display);font-size:1.2rem}
.road .mc{width:48px;height:48px}
@media (max-width:640px){.tb-home span,.tb-menu span,.gpill span{display:none}.lp-st i{display:none}.lp-foot{grid-template-columns:1fr 1fr}.lp-dots{display:none}}
`;
function injectStyle(doc){ const st = doc.createElement("style"); st.textContent = CSS; (doc.head || doc.documentElement).appendChild(st); }
const FONT_HREF = "https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700;800&family=Secular+One&family=JetBrains+Mono:wght@500&display=swap";

/* ===== settings ===== */
const GEM_LINK = "";

/* ===== storage (per laptop, optional) ===== */
const LS = {
  get(k, d){ try{ const v = localStorage.getItem("mkmod." + k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem("mkmod." + k, JSON.stringify(v)); }catch(e){} }
};
// Every button call carries the token the kids' page got from the code lock (index.html sets it).
const apiHeaders = () => ({ "X-Make":"1", "X-Token": (window.HUB && window.HUB.token) || "" });
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ===== course map ===== */
const UNITS = [
  { n:1, name:"מתחילים", sub:"מיינקראפט עובד, העולם שלי על נייר", color:"#3B8735", icon:"1",
    lessons:[ {n:1, title:"העולם שלי", build:"שם לעולם, ומיינקראפט שנפתח בכפתור אחד", open:true} ] },
  { n:2, name:"החפצים הראשונים", sub:"מהכרטיס אל תוך המשחק", color:"#2B6A99", icon:"2",
    lessons:[
      {n:2, title:"החפץ הראשון שלי", build:"חפץ משלכם, עם שם, ציור וכוח, בתוך המשחק", open:true},
      {n:3, title:"איך מכינים את החפץ?", build:"מתכון לחפץ שלכם: ממה מכינים אותו ב־Crafting Table", open:true},
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
      {n:12, title:"בונים לו מודל", build:"מודל מקוביות, ציור ותנועה, בסטודיו"},
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
  { name:"Creeper", map:["..####..","..####..","..####..","..####..","...##...","...##...","...##...","...##...","...##...","...##...",".######.",".######.",".##..##."] },
  { name:"Enderman", map:["..####..","..####..","..####..",".######.",".#.##.#.",".#.##.#.",".#.##.#.",".#.##.#.",".#....#.","..#..#..","..#..#..","..#..#..","..#..#..","..#..#..","..#..#.."] },
  { name:"Spider", map:["......####......",".##..######..##.","#..##########..#","...##########...","..#.########.#..",".#..#......#..#.","#..#........#..#"] },
  { name:"Ghast", map:["########","########","########","########","########","########","#.#.#.#.","#.#.#...","..#.#...","..#....."] },
  { name:"Pig", map:["..######........","..##############","################","..##############","..##############","..##############","...##.......##..","...##.......##..","...##.......##.."] },
  { name:"Zombie", map:["####","####","####","####"] },
  { name:"Skeleton", map:["####","####","####","####"] },
  { name:"Blaze", map:["####","####","####","####"] }
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
  <div class="me"><b>אתם: הבמאים</b><ul><li>ממציאים את העולם, השמות והסיפור</li><li>מציירים ובונים בסטודיו, בעצמכם</li><li>בודקים: זה מה שרציתי?</li></ul></div>
  <div class="ai"><b>ג׳מיני: שותף לרעיונות</b><ul><li>שואל שאלות שעוזרות לחשוב</li><li>בודק אם הבלוקים עושים מה שרציתם</li><li>לפעמים טועה, ובטוח שהוא צודק</li></ul></div>
</div>`;

function gemPromptBox(text){
  return `<div class="prompt"><div class="row"><b>כותבים בג׳מיני:</b><button class="btn ghost" data-copy="${esc(text)}">העתקה</button></div><pre>${esc(text)}</pre></div>`;
}


const COPY_FLOW = `<div class="flow" dir="rtl">
  <div class="st go"><b>להעתיק לג׳מיני</b><small>בסטודיו, בלשונית ג׳מיני</small></div><span class="ar">←</span>
  <div class="st"><b>Ctrl + V</b><small>בצ׳אט של ג׳מיני</small></div><span class="ar">←</span>
  <div class="st"><b>מה אתם רוצים</b><small>כותבים מתחת, ושולחים</small></div>
</div>`;

/* ===== pixel pictures for the design talks. All drawn here, by us. ===== */
function pxSVG(rows, pal, grid){
  const h = rows.length, w = rows[0].length;
  let r = "";
  rows.forEach((row, y) => { for (let x = 0; x < w; x++){ const c = pal[row[x]]; if (c) r += `<rect x="${x}" y="${y}" width="1.03" height="1.03" fill="${c}"/>`; } });
  if (grid){ for (let i = 0; i <= w; i++) r += `<path d="M${i} 0V${h}M0 ${i}H${w}" stroke="rgba(0,0,0,.28)" stroke-width=".04" fill="none"/>`; }
  return `<svg viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
}
const SCENES = {
  plains:{ air:"#7EC0EE", tiles:["....FFF.","....FFF.",".....W..","gggggggg","dddddddd"], name:"Plains", tag:"...?", sw:["#7EC0EE","#5DA130","#8A5A2B"],
    pal:{S:"#7EC0EE",C:"#FFFFFF",G:"#5DA130",D:"#8A5A2B",T:"#6B4423",L:"#2F7D32",Y:"#FFD83D"},
    map:["SSSSSSSSSSSSYYSS","SSCCSSSSSSSSYYSS","SCCCCSSSSLLLSSSS","SSSSSSSSLLLLLSSS","SSSSSSSSLLLLLSSS","SSSSSSSSSSTSSSSS","GGGGGGGGGGTGGGGG","DDDDDDDDDDDDDDDD","DDDDDDDDDDDDDDDD"] },
  nether:{ air:"#2A0C0C", tiles:["NNNNNNNN","..NG....","........","N.....NN","NMLLLLMN"], name:"Nether", tag:"אש ולבה", sw:["#6B1F1F","#FF7A1A","#FFE08A"],
    pal:{N:"#6B1F1F",n:"#4A1414",L:"#FF7A1A",l:"#FFC53D",B:"#2A0C0C",g:"#FFE08A"},
    map:["NNnNNNNNnNNNNNnN","NnNNgNNNNNNnNNNN","BBNBBBBnBBBBBgBB","BBBBBBBBBBBBBBBB","BBBBBBBBBBBBBBBB","NBBBBBBBBBBBBBNN","NNLLlLLLLLlLLNNN","NnNLLLLlLLLLNNnN","NNNNnNNNNNNnNNNN"] },
  end:{ air:"#0B0914", tiles:["........","...O....","...O....",".EEEEEE.","..EEEE.."], name:"End", tag:"ריק, סגול, דרקון", sw:["#0B0914","#E3E6A8","#B455E0"],
    pal:{K:"#0B0914",s:"#3B2A5C",E:"#E3E6A8",e:"#C9CC8A",O:"#2A1A47",P:"#B455E0",M:"#2B2B33"},
    map:["KKKsKKKKKKKKsKKK","KKKKKKKPKKKKKKKK","KsKKKKKOKKPKKKsK","KKKKKKKOKKMKKKKK","KKKKKKKOKKMKKKKK","KKKEEEEEEEEEEKKK","KKKKeEEEEEEeKKKK","KKKKKKeEEeKKKKKK","KKsKKKKKKKKKKsKK"] },
  deep:{ air:"#05090B", tiles:["DDDDDDDD","D......D","........","..H..X..","SSSCSSSS"], name:"Deep Dark", tag:"חושך ושקט", sw:["#05090B","#0C3B44","#29D3C4"],
    pal:{K:"#05090B",d:"#1E2529",c:"#0C3B44",t:"#29D3C4",h:"#D9E6C8"},
    map:["dddddddddddddddd","ddKKKKKKKKKKKKdd","dKKKKKKKKKKKKKKd","KKKKKKKKKKKKKKKK","KKKKKKKKKKKKKKKK","KKKKKhhKKKKKKKKK","cctccccccctccccc","ccccctcccccccctc","dddddddddddddddd"] }
};
// A real texture, hub/mc_<name>.png (copied out of the installed game by setup/update-hub.ps1). If it's missing, our drawing shows.
const NOMC = `onerror="this.closest('.mc').classList.add('nomc')"`;
const mcPic = (file, fallback, cls) => `<span class="mc ${cls||""}"><img src="mc_${file}.png" alt="" ${NOMC}>${fallback||""}</span>`;
const TILE = { N:"block_netherrack", G:"block_glowstone", L:"block_lava_still", M:"block_magma", E:"block_end_stone", O:"block_obsidian",
  D:"block_deepslate", S:"block_sculk", C:"block_sculk_catalyst_side", H:"block_sculk_shrieker_side", X:"block_sculk_sensor_side",
  g:"block_grass_block_side", d:"block_dirt", W:"block_oak_log", F:"block_oak_leaves" };
const sceneSVG = k => { const sc = SCENES[k];
  const tiles = sc.tiles.join("").split("").map(c => TILE[c] ? `<img src="mc_${TILE[c]}.png" alt="" ${c==="F"?'class="lf" ':""}${NOMC}>` : `<i></i>`).join("");
  return `<span class="mc scn" style="--air:${sc.air}"><span class="tiles">${tiles}</span>${pxSVG(sc.map, sc.pal)}</span>`; };
// A mob's real face, cut out of its skin texture.
const FACES = {
  creeper:{ name:"Creeper", tex:"entity_creeper_creeper", t:[64,32], f:[8,8,8,8] },
  enderman:{ name:"Enderman", tex:"entity_enderman_enderman", over:"entity_enderman_enderman_eyes", t:[64,32], f:[8,8,8,8], o:[18,62] },
  spider:{ name:"Spider", tex:"entity_spider_spider", t:[64,32], f:[40,12,8,8], o:[30,40] },
  ghast:{ name:"Ghast", tex:"entity_ghast_ghast", t:[64,32], f:[16,16,16,16], o:[30,40] },
  pig:{ name:"Pig", tex:"entity_pig_pig", t:[64,32], f:[8,8,8,8], o:[8,42] },
  zombie:{ name:"Zombie", tex:"entity_zombie_zombie", t:[64,64], f:[8,8,8,8], o:[25,55] },
  skeleton:{ name:"Skeleton", tex:"entity_skeleton_skeleton", t:[64,32], f:[8,8,8,8], o:[25,55] },
  blaze:{ name:"Blaze", tex:"entity_blaze", t:[64,32], f:[8,8,8,8], o:[30,48] },
  piglin:{ name:"Piglin", tex:"entity_piglin_piglin", t:[64,64], f:[8,8,10,8] },
  warden:{ name:"Warden", tex:"entity_warden_warden", t:[128,128], f:[10,42,16,16] }
};
function mobFace(k, fallback){ const m = FACES[k], [tw,th] = m.t, [x,y,w,h] = m.f;
  const bg = (m.over ? `url(mc_${m.over}.png),` : "") + `url(mc_${m.tex}.png)`;
  const pos = `${(x/(tw-w)*100).toFixed(3)}% ${(y/(th-h)*100).toFixed(3)}%`, size = `${(tw/w*100).toFixed(2)}% ${(th/h*100).toFixed(2)}%`;
  const o = m.o ? `--ox:${m.o[0]}%;--oy:${m.o[1]}%;` : "";
  return `<span class="mc face"><i style="${o}padding-top:${(h/w*100).toFixed(2)}%;background-image:${bg};background-position:${pos}${m.over?","+pos:""};background-size:${size}${m.over?","+size:""}"></i><img class="probe" src="mc_${m.tex}.png" alt="" ${NOMC}>${fallback||""}</span>`; }
const GUESS = ["creeper","enderman","spider","ghast","pig","zombie","skeleton","blaze"];
const guessGrid = () => `<div class="sil">${GUESS.map((k,i)=>`<button data-sil="${i}" aria-label="מי זה? ${i+1}">${mobFace(k, MOBS[i] && MOBS[i].map ? silSVG(MOBS[i]) : "")}<span class="nm">?</span></button>`).join("")}</div>`;
const swatches = k => `<div class="sws">${SCENES[k].sw.map(c=>`<i style="background:${c}"></i>`).join("")}</div>`;
const postcards = (keys, mode) => `<div class="pc">${keys.map(k=>`<figure>${sceneSVG(k)}${mode==="sw"?swatches(k):""}${mode?`<figcaption>${SCENES[k].name}${mode==="tag"?`<small>${SCENES[k].tag}</small>`:""}</figcaption>`:""}</figure>`).join("")}</div>`;

const ITEMS = {
  pick:{ tex:"item_iron_pickaxe", name:"Pickaxe", pal:{I:"#C8D0D4",W:"#8A5A2B"},
    map:[".IIIIIIII.","I...WW...I","....WW....","....WW....","....WW....","....WW....","....WW....","....WW....","....WW....",".........."] },
  pearl:{ tex:"item_ender_pearl", name:"Ender Pearl", pal:{T:"#1FA89A",t:"#7FE9DA",d:"#0E5F58"},
    map:["..........","...TTTT...","..TttTTT..",".TttTTTTT.",".TtTTTTTd.",".TTTTTTdd.",".TTTTTddd.","..TTTddd..","...dddd...",".........."] },
  bow:{ tex:"item_bow", name:"Bow", pal:{W:"#8A5A2B",s:"#F2F2F2"},
    map:["...WW.s...","..W...s...",".W....s...",".W....s...",".W....s...",".W....s...",".W....s...","..W...s...","...WW.s...",".........."] },
  apple:{ tex:"item_golden_apple", name:"Golden Apple", pal:{Y:"#FFD83D",y:"#E0A800",g:"#4CAF50",b:"#6B4423"},
    map:[".....b....","....gb....","..YYYYYY..",".YYyYYYYY.",".YYYYYYYY.",".YYYYYYyY.",".YYYYYYyY.","..YYYYyY..","...YYYY...",".........."] },
  totem:{ tex:"item_totem_of_undying", name:"Totem of Undying", pal:{Y:"#F2C94C",y:"#C99A1C",G:"#2ECC71"},
    map:["...YYYY...","..YGYYGY..","..YYYYYY..","...YyyY...",".YYYYYYYY.",".Y.YYYY.Y.","...YYYY...","...YyyY...","...Y..Y...",".........."] },
  wings:{ tex:"item_elytra", name:"Elytra", pal:{V:"#8F8FB3",v:"#6A6A8C"},
    map:[".VV....VV.","VVVV..VVVV","VVVV..VVVV","VVVVvvVVVV","VVVvvvvVVV",".VVv..vVV.",".VV....VV.","..V....V..","..V....V..",".........."] },
  potato:{ tex:"item_poisonous_potato", name:"Poisonous Potato", pal:{P:"#C9B458",p:"#9FAE3A",d:"#8A7A2E"},
    map:["..........","...PPPP...","..PPpPPP..",".PPPPPPdP.",".PpPPPPPP.",".PPPPdPPP.","..PPPPPP..","...PPpP...","..........",".........."] },
  dirt:{ tex:"block_dirt", name:"Dirt", pal:{D:"#8A5A2B",d:"#6E4520"},
    map:["DDDDDDDDDD","DdDDDDdDDD","DDDDdDDDDD","DDdDDDDDdD","DDDDDDDDDD","DdDDDdDDDD","DDDDDDDdDD","DDDdDDDDDD","DDDDDDdDDD","DDDDDDDDDD"] }
};
const itemSVG = k => mcPic(ITEMS[k].tex, pxSVG(ITEMS[k].map, ITEMS[k].pal), "mslot");
const itemRow = keys => `<div class="its">${keys.map(k=>`<figure>${itemSVG(k)}<figcaption>${ITEMS[k].name}</figcaption></figure>`).join("")}</div>`;
const SWORD16 = { pal:{C:"#5EEAD4",c:"#2BB3A3",k:"#3A2A1A",W:"#8A5A2B"},
  map:["..............CC",".............CcC","............CcC.","...........CcC..","..........CcC...",".........CcC....","........CcC.....",".......CcC......","..kk..CcC.......","..kkkCcC........","...kkkC.........","....kkk.........","...WWkkk........","..WW..kk........",".WW.............","WW.............."] };
const WARDEN = { name:"Warden", map:["#..####..#","#..####..#","##.####.##",".########.","##########","##########","##.####.##","##.####.##","...#..#...","...#..#...","..##..##.."] };
const PIGLIN = { name:"Piglin", map:["#.####.#","########","########",".######.","..####..",".######.","#.####.#","#.####.#","..#..#..","..#..#.."] };
const stackPic = (n, cols, color) => `<div class="g" style="grid-template-columns:repeat(${cols},1fr)${n===1?";width:clamp(26px,4cqw,44px)":""}">${`<i style="background:${color}"></i>`.repeat(n)}</div>`;

/* ===== the two design conversations ===== */
const WORLD_NEEDS = `<div class="today">
  <div><span class="num">1</span><b>רעיון אחד חזק</b><span>ה־Nether: אש ולבה. אפשר לתאר את העולם שלכם בכמה מילים?</span></div>
  <div><span class="num">2</span><b>מזהים אותו בשנייה</b><span>צבעים, קוביות ויצורים שיש רק שם.</span></div>
  <div><span class="num">3</span><b>משהו שונה</b><span>ב־Nether אין מים, ומיטה מתפוצצת. מה שונה אצלכם?</span></div>
  <div><span class="num">4</span><b>חוקים משלו</b><span>ליד Warden לא עושים רעש. איזה חוק יש רק בעולם שלכם?</span></div>
</div>`;
const ITEM_NEEDS = `<div class="today">
  <div><span class="num">1</span><b>בשביל מה הוא?</b><span>עם Pickaxe חוצבים. מה עושים עם החפץ שלכם?</span></div>
  <div><span class="num">2</span><b>מה המחיר?</b><span>Ender Pearl מעבירה אתכם רחוק, ופוצעת אתכם.</span></div>
  <div><span class="num">3</span><b>כמה הוא נדיר?</b><span>Dirt: 64 בערימה. Totem of Undying: אחד.</span></div>
  <div><span class="num">4</span><b>השם והצורה</b><span>Diamond Sword: יודעים מה היא עושה לפני שקוראים.</span></div>
</div>`;

/* ===== lesson 1 steps ===== */
/* ===== lessons 1 and 2, as one road: every step is one thing to do, done right on the step =====
   Steps hold widgets that index.html mounts: studio pieces (data-studio → STUDIO.mount), the game button (data-gbtn),
   the Drive save (data-drive). "stations" = the few stops shown above the step: [name, first step index]. */
const studioIn = o => `<div class="lp-studio" data-studio="${esc(JSON.stringify(o))}"></div>`;
const gameBtn = () => `<div data-gbtn></div>`;
const driveBox = () => `<div data-drive></div>`;
const road = list => `<div class="road">${list.map((x, i) => `<div><span class="rn">${i + 1}</span><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div>`;
const MC_MENU = `<div class="mcmenu"><div class="logo">MINECRAFT</div>
  <div class="mcbtn hot">Singleplayer <small>← 1</small></div><div class="mcbtn">Multiplayer</div><div class="mcbtn">Options...</div></div>`;
const IN_GAME = `<ol class="ingame"><li><b>Singleplayer</b>, ואז העולם שלכם. אין עולם? <b>Create New World</b>, ב־Game Mode בוחרים <b>Creative</b>, ו־<b>Create</b>.</li>
  <li>לוחצים <kbd>E</kbd>, ובלשוניות למעלה מוצאים את הלשונית עם השם של העולם שלכם.</li></ol>`;

const L1 = {
  n:1, unit:"יחידה 1 · מתחילים", title:"שיעור 1: העולם שלי",
  stations:[["הקוד",1],["העולם",2],["מיינקראפט",4],["דרייב",5]],
  steps:[
    { title:"ברוכים הבאים",
      body:`<p>בקורס הזה אתם בונים עולם משלכם בתוך מיינקראפט: חפצים, יצורים וחוקים שאתם ממציאים.</p><p>הכול קורה בדף הזה. עושים מה שכתוב בשלב, ולוחצים <b>הבא</b>.</p>`,
      visual:()=>road([["ממציאים","על דף, עם טושים"],["בונים בדף הזה","שמות, ציורים, ומה כל דבר עושה. בלי קוד"],["נכנסים למשחק","כפתור אחד, והעולם שלכם במיינקראפט"],["שומרים","בסוף כל שיעור, בדרייב"]]) },

    { title:"הקוד שלכם",
      body:`<p>כשפתחתם את הדף, בחרתם 4 ספרות. הקוד הזה פותח את העולם שלכם, ורק הוא.</p>
        <ul><li>לא מספרים לאף אחד את הקוד.</li><li>קמים מהמחשב? למעלה: <b>תפריט</b>, ואז <b>נעילה</b>.</li><li>שכחתם את הקוד? המורה פותח בקוד שלו, ובוחרים קוד חדש.</li></ul>` },

    { title:"איך קוראים לעולם שלכם?",
      body:`<p>בדף 1 כתבתם רעיון לעולם. כותבים כאן את השם שלו.</p>`,
      visual:()=>studioIn({ parts:["world"] }),
      expect:"השם נשמר לבד. במשחק זה יהיה השם של הלשונית שלכם." },

    { title:"כרטיס העולם",
      body:`<p>מעתיקים לכאן את דף 1. אין תשובות נכונות: זה העולם שלכם.</p>`,
      hints:[
        "חושבים על משהו שאתם אוהבים: חיה, מקום, תקופה, מאכל. מה קורה אם הוא ענק? מפחיד? חי בשמיים?",
        "דוגמאות: ״פיראטים בשמיים על איים מרחפים״ · ״יער שהלילה בו לא נגמר״ · ״דבורים ענקיות שבנו עיר מדבש״.",
        "תקועים על החוק? חושבים מה אסור לעשות בעולם שלכם, או מה קורה שם רק בלילה."
      ],
      visual:()=>worldCardForm() },

    { title:"נכנסים למיינקראפט",
      body:`<p>בעולם שלכם כבר מחכה חפץ: מקל ברקים. לוחצים על הכפתור הירוק, ומיינקראפט נפתח לבד אחרי דקה או שתיים.</p>`,
      visual:()=>studioIn({ ready:"lightning_stick", parts:["card"] }) + gameBtn()
        + `<ol class="ingame"><li><b>Singleplayer</b>, ואז <b>Create New World</b>. ב־Game Mode בוחרים <b>Creative</b>, ו־<b>Create</b>.</li><li>לוחצים <kbd>E</kbd>, ובלשוניות למעלה מוצאים את הלשונית עם השם של העולם שלכם.</li><li>לוקחים את מקל הברקים, ומכים במקל Zombie או חזיר.</li></ol>`,
      expect:"נופל ברק על היצור. בשיעור 2 ממציאים חפץ משלכם, ובוחרים מה הוא עושה.",
      stuck:[
        ["קפץ מסך Welcome to Minecraft","לוחצים Continue."],
        ["אין יצור בסביבה","בתפריט של E מחפשים Zombie Spawn Egg, מחזיקים אותה ביד, ולוחצים לחיצה ימנית על הרצפה."],
        ["לא מוצאים את הלשונית","בתפריט של E יש למעלה חצים לעמוד הבא של הלשוניות."],
        ["הופיעה מסגרת אדומה: המשחק לא נבנה","מרימים יד וקוראים למורה."]
      ] },

    { title:"שומרים בדרייב",
      body:`<p>המחשב של בית הספר יכול להתאפס. מה שבדרייב שלכם נשאר שלכם.</p>`,
      visual:()=>driveBox(),
      expect:"בדרייב יש קובץ ששמו מתחיל ב־myworld.",
      note:"אם בשבוע הבא המחשב יתאפס, או שתקבלו מחשב אחר, מחזירים את העולם מהדרייב: למעלה, <b>תפריט</b> ואז <b>דרייב</b>." }
  ],
  challenges:[
    {id:"card", lvl:"חובה", t:"כרטיס העולם", d:"העולם שלי בשורה אחת, שלושה צבעים וחוק אחד."},
    {id:"mc", lvl:"חובה", t:"מיינקראפט נפתח", d:"מצאתי את הלשונית של העולם שלי, והכיתי Zombie במקל הברקים."},
    {id:"drive", lvl:"חובה", t:"שמרתי בדרייב", d:"קובץ הגיבוי שלי נמצא בדרייב."}
  ]
};

/* ===== world card ===== */
const WC_FIELDS = [
  {id:"theme", label:"העולם שלי בשש מילים או פחות", ph:"פיראטים בשמיים על איים מרחפים"},
  {id:"like", label:"זה כמו ___ במיינקראפט הרגיל, חוץ מזה ש___", ph:"כמו ה־End, חוץ מזה שיש בו ספינות"},
  {id:"sign", label:"דבר אחד שרואים רק בעולם שלי", ph:"ספינות עם מפרשים מעננים"},
  {id:"rule", label:"חוק אחד שיש רק בעולם שלי", ph:"מי שנופל מאי לא מת, הוא נוחת על האי שמתחת"}
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
    notes:"15–20 דק׳. מוד זה תוספת למיינקראפט. הם ממציאים ובונים בעצמם בסטודיו, בלי קוד, וג׳מיני הוא שותף לרעיונות. אם יש לך מוד שעובד, מראים אותו עכשיו. קצר." },
  { label:"הדרך", html:`<h2>הדרך עד התערוכה</h2><ul class="big"><li>שיעורים 2–5: החפצים הראשונים</li><li>שיעורים 6–9: המקום שלכם והיצור הראשון</li><li><b>שיעור 10: תערוכה 1</b></li><li>שיעורים 11–15: יצור שרק אתם המצאתם</li><li><b>שיעור 20: תערוכה 2, המשפחות מגיעות</b></li></ul>`,
    notes:"מה בונים בכל חלק של הקורס. אפשר להאריך כאן אם ההתקנות עוד רצות." },
  { label:"סרטון: Diagon Alley", html:`<div class="vid" data-yt="5W-a0tl9Fu0"></div>`,
    notes:"20–26 דק׳. הסרטון משובץ בשקופית: Harry Potter, הכניסה הראשונה ל־Diagon Alley, 3:43 דקות, מהערוץ הרשמי. לוחצים כאן, בצד שמאל, על ״לנגן במקרן״. אחרי הסרטון שואלים מה למדו על העולם הזה, בלי שאף אחד הסביר. אם יוטיוב חסום בבית הספר: מספרים את הסצנה בעל פה, כולם מכירים אותה." },
  { label:"מה למדנו?", html:`<h2>מה למדנו בשלוש דקות?</h2><div class="rules"><div><span class="n">1</span><b>מה הרעיון של העולם הזה?</b>במשפט אחד.</div><div><span class="n">2</span><b>איך יודעים שאנחנו שם?</b>מה רואים רק שם?</div><div><span class="n">3</span><b>מה שונה מהעולם שלנו?</b></div><div><span class="n">4</span><b>איזה חוקים יש שם?</b></div></div><p class="sub">אף אחד לא עמד והסביר. העולם סיפר את עצמו.</p>`,
    notes:"26–32 דק׳. ארבע שאלות, כמה תשובות לכל אחת, וכותבים אותן על הלוח. מה שסביר שיעלה: קוסמים שחיים בסתר, ממש ליד העולם שלנו. ינשופים, מטאטאים, קדרות, גלימות. קיר לבנים שנפתח, בנק של גובלינים, כסף אחר. המסקנה: אף דמות לא עמדה והסבירה את העולם. ראינו חנויות וחפצים, והבנו לבד. ככה גם העולם שלכם יספר את עצמו: דרך החפצים, היצורים והמקומות שתבנו. את הלוח לא מוחקים: ארבע השאלות חוזרות עכשיו במיינקראפט." },
  { label:"מה עולם צריך?", html:`<h2>מה עולם צריך?</h2>${postcards(["nether","plains","end","deep"])}`,
    notes:"32–65 דק׳, ארבע־עשרה שקופיות. שיחה, לא הרצאה. אותן ארבע שאלות מהסרטון, עכשיו במיינקראפט. הצבעה בהרמת יד על כל תמונה: מי זוכר את המקום הזה הכי טוב? ה־Plains יקבל הכי מעט. שואלים: למה? כותבים את התשובות שלהם על הלוח. השקופיות הבאות הן ארבע תשובות." },
  { label:"1 · רעיון חזק", html:`<div class="eye">1 מתוך 4</div><h2>רעיון אחד חזק</h2>${postcards(["nether","end","deep","plains"], "tag")}<p class="sub">עולם שאפשר לתאר בכמה מילים הוא עולם שזוכרים.</p>`,
    notes:"לפני שמראים: תתארו את ה־Nether בשלוש מילים. ואת ה־End? ואת ה־Plains? (קשה. אין לו רעיון, ולכן לא זוכרים אותו.) לכל עולם שהם אוהבים יש רעיון אחד שאפשר להגיד בנשימה אחת." },
  { label:"1 · משפט אחד", html:`<div class="eye">1 מתוך 4</div><p class="quote">״ברברים על כלבי מלחמה, כולם בפרוות״</p><div class="rules"><div><b>מה לובשים שם?</b></div><div><b>איזה חיות יש?</b></div><div><b>חם שם, או קר?</b></div></div><p class="sub">אף אחד לא סיפר לכם, ובכל זאת אתם יודעים.</p>`,
    notes:"קוראים את המשפט ושואלים את שלוש השאלות. הם יענו בלי לחשוב. המסקנה: משפט אחד טוב עונה על עשרות שאלות, אז אחר כך לא צריך להמציא כל דבר מחדש. שואלים: מה אין בעולם הזה? (חלליות, רובוטים.) רעיון חזק גם אומר מה לא נכנס." },
  { label:"2 · מי אני?", html:`<div class="eye">2 מתוך 4</div><h2>שלושה צבעים. איזה מקום זה?</h2><div class="pal"><figure><figcaption>א</figcaption>${swatches("nether")}</figure><figure><figcaption>ב</figcaption>${swatches("end")}</figure><figure><figcaption>ג</figcaption>${swatches("deep")}</figure></div>`,
    notes:"משחק. נותנים להם לנחש רק מהצבעים. מי שצריך רמז: א׳, ״תקרה במקום שמיים, וחזירים שאוהבים זהב״. ב׳, ״שמיים שחורים, ויצורים גבוהים וסגולים״. ג׳, ״מישהו ששומע כל צעד״. התשובות בשקופית הבאה." },
  { label:"2 · מזהים בשנייה", html:`<div class="eye">2 מתוך 4</div><h2>מזהים אותו בשנייה</h2>${postcards(["nether","end","deep"], "sw")}<p class="sub">לכל עולם טוב יש צבעים, קוביות ויצורים משלו.</p>`,
    notes:"הם זיהו עולם שלם משלושה ריבועים של צבע. שואלים: איזה צבעים יהיו בעולם שלכם? ומה רואים רק שם: יצור, קובייה, צמח, בניין? בגלל זה בכרטיס בוחרים שלושה צבעים ודבר אחד שרואים רק שם." },
  { label:"3 · משהו שונה", html:`<div class="eye">3 מתוך 4</div><h2>מה שונה אצלו?</h2><div class="cmp"><div class="h"></div><div class="h">מיינקראפט הרגיל</div><div class="h">ה־Nether</div><div><b>מים</b></div><div>זורמים</div><div class="x">מתאדים מיד</div><div><b>מיטה</b></div><div>ישנים בה</div><div class="x">מתפוצצת</div><div><b>למעלה</b></div><div>שמיים</div><div class="x">תקרה מאבן</div><div><b>יום ולילה</b></div><div>יש</div><div class="x">אין</div></div>`,
    notes:"מכסים את העמודה של ה־Nether ושואלים שורה אחרי שורה: מה קורה למים ב־Nether? ולמי שהולך לישון שם? הצבעה: איזה הבדל הכי מפחיד? המסקנה: ה־Nether הוא לא עולם שהומצא מאפס. זה מיינקראפט, עם כמה דברים הפוכים." },
  { label:"3 · הנוסחה", html:`<div class="eye">3 מתוך 4</div><h2>כמו ___ , חוץ מזה ש___</h2><div class="rules"><div><b>כמו איים בשמיים,</b>חוץ מזה שאין קרקע מתחת. <small>ה־End</small></div><div><b>כמו אוקיינוס,</b>חוץ מזה שהמים הם לבה.</div><div><b>כמו כפר רגיל,</b>חוץ מזה שכולם שם ישנים ביום.</div></div><p class="sub">לוקחים מקום מוכר, ומשנים בו דבר אחד גדול.</p>`,
    notes:"סבב מהיר: כל אחד משלים את המשפט לעולם שלו, בקול. לא חייב להיות מושלם. מי שתקוע: בוחרים יחד מקום במיינקראפט, ושואלים ״מה הדבר הכי מוזר שיכול להיות שם?״ זו השורה השלישית בכרטיס." },
  { label:"4 · חוקים משלו", html:`<div class="eye">4 מתוך 4</div><h2>חוקים משלו</h2><div class="rules"><div><span class="who">${mobFace("enderman", silSVG(MOBS[1]))}<b>Enderman</b></span>לא מסתכלים לו בעיניים.<small>אז הולכים עם הראש למטה.</small></div><div><span class="who">${mobFace("warden", silSVG(WARDEN))}<b>Warden</b></span>לא עושים רעש.<small>אז מתגנבים.</small></div><div><span class="who">${mobFace("piglin", silSVG(PIGLIN))}<b>Piglins</b></span>לובשים זהב, והם לא תוקפים.<small>אז מחפשים זהב לפני שנכנסים.</small></div></div><p class="sub">חוק טוב משנה את מה שהשחקן עושה.</p>`,
    notes:"שואלים על כל אחד: מה החוק שלו? ומה אתם עושים בגלל החוק? החוק שינה את איך שמשחקים, וככה מזהים חוק טוב. עוד שאלה: איך יודעים שהחוק קיים? (ה־Enderman צועק ורועד, ה־Warden שומעים אותו מגיע.) לחוק טוב יש סימן שרואים או שומעים." },
  { label:"4 · הצבעה", html:`<div class="eye">4 מתוך 4</div><h2>איזה חוק יותר טוב?</h2><div class="ab"><div><span class="l">א</span>בעולם שלי יורד שלג.</div><div class="or">או</div><div><span class="l">ב</span>בעולם שלי, מי שעומד במקום קופא.</div></div>`,
    notes:"הצבעה בהרמת יד, ואז ״למה?״. א׳ הוא רק קישוט: השחקן עושה בדיוק מה שעשה קודם. ב׳ משנה את המשחק: אסור לעצור, אז איך בונים? איך נלחמים? אחר כך כל אחד אומר חוק אחד לעולם שלו, והכיתה אומרת מה היא הייתה עושה אחרת בגללו." },
  { label:"+ העולם מספר לבד", html:`<div class="eye">ועוד ארבעה דברים שבוני עולמות יודעים</div><h2>מה יותר מעניין למצוא?</h2><div class="ab"><div><span class="l">א</span>שלט: ״פעם הייתה כאן עיר גדולה.״</div><div class="or">או</div><div><span class="l">ב</span>חומה שבורה, תיבה ריקה, ושלד שמחזיק חרב.</div></div><p class="sub">לא כותבים את הסיפור. משאירים סימנים, והשחקן מבין לבד.</p>`,
    notes:"הצבעה, ואז ״למה?״. ב׳ גורם לשחקן לשאול מה קרה כאן. דוגמה ממיינקראפט: Ruined Portal. אף אחד לא מסביר מי בנה אותו ולמה הוא שבור, וכולם מדמיינים. שואלים: איזה סימן יספר משהו על העולם שלכם, בלי מילה אחת? זה בדיוק מה שראינו ב־Diagon Alley." },
  { label:"+ מה עוד משתנה?", html:`<h2>ואם זה נכון, מה עוד משתנה?</h2><div class="rules"><div><b>יש שם דרקונים</b><small>אז אף אחד לא בונה בית מעץ.</small></div><div><b>תמיד לילה</b><small>אז לפיד שווה יותר מזהב.</small></div><div><b>אין מים</b><small>אז בקבוק מים הוא אוצר.</small></div></div><p class="sub">לכל רעיון מגניב יש תוצאה. התוצאה הופכת אותו לעולם.</p>`,
    notes:"מכסים את השורה הקטנה ושואלים: יש דרקונים בעולם. מה האנשים שם עושים אחרת? נותנים להם להמציא עוד תוצאות. אחר כך כל אחד: מה הדבר הכי מגניב בעולם שלך, ומה השתנה בגללו? רעיון בלי תוצאה הוא קישוט. רעיון עם תוצאה כבר נותן חפצים, יצורים וחוקים לבנות." },
  { label:"+ תעלומה אחת", html:`<h2>משאירים תעלומה אחת</h2><p class="quote">Ancient City: מי בנה אותה?</p><p class="sub">ולמה יש שם מסגרת ענקית, שאף אחד לא יודע לפתוח?<br>לא חייבים לדעת את התשובה. מספיק שהשחקן שואל.</p>`,
    notes:"שואלים: מה לדעתכם יש מאחורי המסגרת הענקית ב־Ancient City? כל אחד יגיד משהו אחר, וזו בדיוק הנקודה: Mojang אף פעם לא ענו, וכולם עדיין מדברים על זה. דבר אחד בלי הסבר שווה יותר מעשרה דפים של סיפור. שואלים: מה יהיה הדבר שאף אחד לא מסביר בעולם שלכם? דלת נעולה, מגדל שאי אפשר להגיע אליו, סימן על קיר." },
  { label:"+ קטן ומלא", html:`<h2>באיזה עולם תישארו יותר זמן?</h2><div class="ab"><div><span class="l">א</span>עולם ענק. אפשר ללכת שעה, ואין בו כלום.</div><div class="or">או</div><div><span class="l">ב</span>כפר אחד קטן, ובכל בית יש בו משהו למצוא.</div></div><p class="sub">עולם קטן ומלא עדיף על עולם ענק וריק.</p>`,
    notes:"הצבעה. זו הטעות הכי נפוצה של מי שבונה עולם: מתכננים יבשת שלמה, ולא בונים אפילו בית אחד. בקורס כל אחד בונה מקום אחד קטן, ומלא. להגיד את זה עכשיו, כדי שאף אחד לא יצייר מפה של עולם שלם בכרטיס." },
  { label:"אז מה עולם צריך?", html:`<h2>אז מה עולם צריך?</h2><div class="rules"><div><span class="n">1</span><b>רעיון אחד חזק</b>כמה מילים.</div><div><span class="n">2</span><b>מזהים אותו בשנייה</b>צבעים, ודבר שרואים רק שם.</div><div><span class="n">3</span><b>משהו שונה</b>כמו... חוץ מזה ש...</div><div><span class="n">4</span><b>חוק משלו</b>שמשנה מה עושים שם.</div></div><p class="sub">אלה ארבע השורות בכרטיס שלכם.</p>`,
    notes:"חצי דקה, ועוברים לדף. ארבע השאלות מהסרטון, ארבע השורות בכרטיס." },
  { label:"כרטיס העולם", html:`<h2>כרטיס העולם שלכם</h2><div class="wcard">
      <div class="ln">העולם שלי בשש מילים או פחות</div>
      <div class="ln">שלושה צבעים, ודבר אחד שרואים רק שם</div>
      <div class="ln">זה כמו ___ במיינקראפט הרגיל, חוץ מזה ש___</div>
      <div class="ln">חוק אחד שיש רק בעולם שלי</div></div><p class="sub">15 דקות, על הדף, עם טושים</p>`,
    notes:"65–80 דק׳. מחלקים את הדפים המודפסים וטושים. מסתובבים, ושואלים כל ילד שאלה אחת על העולם שלו. מי שתקוע על החוק: ״מה אסור לעשות אצלך?״ מי שסיים: מצייר את העולם בריבוע הגדול שבדף." },
  { label:"דוגמאות", html:`<h2>עולם בשורה אחת</h2><ul class="big"><li>פיראטים בשמיים על איים מרחפים</li><li>יער שהלילה בו לא נגמר</li><li>דבורים ענקיות שבנו עיר מדבש</li></ul><p class="sub">קצר. מישהו אחר יכול לדמיין את זה מיד.</p>`,
    notes:"להשאיר על המסך בזמן שהם כותבים. מי שמעתיק דוגמה כמו שהיא, מחליף בה לפחות מילה אחת." },
  { label:"מי זה?", html:`<h2>מי זה?</h2>${guessGrid()}`,
    notes:"ממלא זמן: רק אם ההתקנות עוד רצות. כל ריבוע מראה כמה פיקסלים מהפנים של יצור. מנחשים, ואז לוחצים כאן על הריבוע: התמונה מתרחקת ורואים את כל הפנים, גם במקרן. אחרי כל אחד: ״איך ידעתם?״ (לפי הצבעים.)" },
  { label:"בדף: שיעור 1", html:`<h2>עכשיו בדף: שיעור 1</h2><ol class="big"><li>הקוד שלכם</li><li>השם של העולם</li><li>כרטיס העולם, מדף 1</li><li>נכנסים למיינקראפט, ומכים Zombie במקל הברקים</li><li>שומרים בדרייב</li></ol>`,
    notes:"80–88 דק׳. כל ילד פותח את Minecraft מתפריט Start, בוחר קוד, ולוחץ ״להתחיל״ בשיעור 1. אלה בדיוק ששת השלבים בדף שלהם. במיינקראפט: Singleplayer, Creative, Create New World, ואז E והלשונית עם השם של העולם שלהם. בפעם הראשונה קופץ מסך Welcome to Minecraft: לוחצים Continue. מי שמיינקראפט לא נפתח אצלו: רושמים את מספר המחשב, ובודקים בהפסקה." },
  { label:"סיום", html:`<h2>בשבוע הבא</h2><p class="quote">החפץ הראשון שלכם, בתוך המשחק</p><ul class="big"><li>שומרים בדרייב</li><li>סוגרים את מיינקראפט</li></ul>`,
    notes:"88–90 דק׳. השלב האחרון בדף שלהם הוא ״שומרים בדרייב״: הכפתור מוריד קובץ, ומעלים אותו לדרייב. לרשום אילו מחשבים לא סיימו, ולבדוק אותם בהפסקה, לפני שיעור 2." }
];


/* ===== lesson 2: my first item ===== */
const PAPER2 = `<div class="checks"><div><span class="ok"></span>שם החפץ, והמשפט שמתחתיו</div><div><span class="ok"></span>בשביל מה הוא?</div><div><span class="ok"></span>המחיר שלו</div><div><span class="ok"></span>איפה משיגים אותו, וכמה בערימה</div><div><span class="ok"></span>ציור של 16 על 16</div></div>`;
const L2 = {
  n:2, unit:"יחידה 2 · החפצים הראשונים", title:"שיעור 2: החפץ הראשון שלי",
  stations:[["דף 2",1],["מקל ברקים",2],["החפץ שלי",4],["במשחק",7],["דרייב",8]],
  // Steps about one item get tabs on top, to jump straight back to the picture or on to the blocks.
  groups:{ stick:"מקל ברקים", mine:"החפץ שלי" },
  steps:[
    { title:"היום: חפץ משלכם, בתוך המשחק",
      body:`<p>היום ממציאים חפץ ומכניסים אותו למשחק, עם שם, ציור וכוח שאתם בוחרים.</p>`,
      visual:()=>road([["דף 2","ממציאים את החפץ על דף"],["מקל ברקים","חפץ מוכן: מנסים אותו, ומשנים"],["החפץ שלי","שם, ציור, ומה הוא עושה"],["במשחק","בודקים שהכול עובד"]]),
      note:"העולם שלכם נעלם? כנראה המחשב התאפס, או שזה מחשב אחר. למעלה: <b>תפריט</b>, ואז <b>דרייב</b>, ומחזירים משם את העולם." },

    { title:"ממציאים על הדף",
      body:`<ol><li>לוקחים את דף 2 וטושים.</li><li>קודם הכרטיס: השם, המשפט מתחת לשם, בשביל מה החפץ, ומה המחיר שלו.</li><li>אחר כך הציור, ברשת של 16 על 16.</li></ol>`,
      hints:[
        "חפץ מהעולם שלכם: מה מוצאים שם? מה אוספים? במה סוחרים?",
        "המשפט מתחת לשם יכול לרמוז בשביל מה החפץ, או מה המחיר שלו.",
        "תקועים על המחיר? חושבים מה החפץ לא יכול לעשות, או מה מפסידים כשמשתמשים בו."
      ],
      visual:()=>PAPER2 },

    { title:"מקל ברקים: חפץ שכבר עובד", group:"stick", tab:"מנסים אותו",
      body:`<p>זה חפץ מוכן. ככה הוא נראה במשחק, וזה מה שהוא עושה:</p>`,
      visual:()=>studioIn({ ready:"lightning_stick", parts:["card"] }) + `<h2 class="lp-sub">מנסים אותו</h2>` + gameBtn()
        + `<ol class="ingame"><li><b>Singleplayer</b>, ואז העולם שלכם. אין עולם? <b>Create New World</b>, <b>Creative</b>, ו־<b>Create</b>.</li><li>לוחצים <kbd>E</kbd>, הלשונית של העולם שלכם, ולוקחים את מקל הברקים.</li><li>מכים במקל Zombie או חזיר.</li></ol>`,
      expect:"נופל ברק על היצור. אחרי כל מכה המקל נח 3 שניות.",
      stuck:[
        ["אין יצור בסביבה","בתפריט של E מחפשים Zombie Spawn Egg, מחזיקים אותה ביד, ולוחצים לחיצה ימנית על הרצפה."],
        ["לא קורה כלום כשמכים","מחזיקים את המקל ביד ומכים יצור, לא קובייה. ואם המקל נח, מחכים 3 שניות."],
        ["הופיעה מסגרת אדומה: המשחק לא נבנה","מרימים יד וקוראים למורה."]
      ] },

    { title:"משנים את מקל הברקים", group:"stick", tab:"משנים את הבלוקים",
      body:`<p>אלה הבלוקים של המקל. משנים בהם דבר אחד:</p><ul><li><b>קל:</b> לוחצים על המספר 3 וכותבים 10. עכשיו המקל נח יותר זמן בין מכה למכה.</li><li><b>מגניב:</b> מהתפריט ״עושים״ גוררים את ״לזמן Zombie״ אל מתחת לברק.</li></ul><p>אחר כך סוגרים את מיינקראפט, פותחים שוב, ובודקים.</p>`,
      visual:()=>studioIn({ ready:"lightning_stick", parts:["power"] }) + gameBtn(),
      note:"שינוי נכנס למשחק רק כשפותחים אותו מחדש." },

    { title:"החפץ שלכם: שם", group:"mine", tab:"שם",
      body:`<p>מעתיקים מהדף את השם ואת המשפט שמתחתיו. אחר כך בוחרים כמה נכנסים בערימה, וכמה החפץ נדיר.</p>`,
      visual:()=>studioIn({ tag:"l2", parts:["fields"] }),
      expect:"בצד רואים את החפץ כמו במשחק, והשם בצבע של הנדירות." },

    { title:"החפץ שלכם: ציור", group:"mine", tab:"ציור",
      body:`<p>מציירים לפי הציור שעל הדף. הציור נשמר לבד.</p>`,
      visual:()=>studioIn({ tag:"l2", parts:["paint"] }),
      hints:["מתחילים מקו מתאר כהה, ואז ממלאים.","שניים עד ארבעה צבעים מספיקים. צבע בהיר אחד נותן ברק.","לחיצה ימנית בעכבר מוחקת."] },

    { title:"החפץ שלכם: מה הוא עושה?", group:"mine", tab:"מה הוא עושה",
      body:`<ol><li>בוחרים דוגמה שמתאימה למה שכתבתם בדף: בשביל מה החפץ, ומה המחיר שלו.</li><li>משנים אותה עד שהיא שלכם: מספרים, יצורים, אפקטים, או בלוקים שלמים.</li></ol>`,
      visual:()=>studioIn({ tag:"l2", parts:["power"] }),
      hints:["אין דוגמה שמתאימה בדיוק? לוקחים את הכי קרובה, ומחליפים בה בלוק אחד.","לכל כוח יש מחיר. אם מחקתם את המחיר, מה ימנע מהשחקן להשתמש בו כל הזמן?"] },

    { title:"בודקים במשחק", group:"mine", tab:"בודקים במשחק",
      body:`<ol><li>מיינקראפט פתוח? סוגרים אותו.</li><li>לוחצים על הכפתור הירוק.</li><li>במשחק: <kbd>E</kbd>, הלשונית של העולם שלכם, והחפץ שלכם.</li><li>בודקים מול הדף: השם, המשפט, הציור, ומה החפץ עושה.</li></ol>`,
      visual:()=>studioIn({ tag:"l2", parts:["card","check"] }) + gameBtn(),
      expect:"הכול כמו בדף. ואם משהו שונה, זה בדיוק מה שמתקנים עכשיו: חוזרים לשלב שלו, משנים, ובודקים שוב.",
      stuck:[
        ["יש ריבוע סגול ושחור במקום הציור","לחפץ עוד אין ציור. חוזרים לשלב הציור, ואז סוגרים ופותחים את המשחק."],
        ["שיניתי, ובמשחק לא רואים","שינוי נכנס רק כשהמשחק נפתח מחדש. סוגרים את מיינקראפט, ופותחים שוב."],
        ["הופיעה מסגרת אדומה: המשחק לא נבנה","מרימים יד וקוראים למורה."]
      ] },

    { title:"שומרים ומסיימים",
      body:`<ul><li>מראים את החפץ למי שיושב לידכם.</li><li>סוגרים את מיינקראפט.</li><li>שומרים את העולם בדרייב:</li></ul>`,
      visual:()=>driveBox(),
      expect:"בשבוע הבא: כוחות עם ״אם״. רק בלילה, רק בסיכוי, רק עם Shift." }
  ],
  challenges:[
    {id:"card", lvl:"חובה", t:"דף 2", d:"בשביל מה החפץ, מה המחיר, ואיפה משיגים אותו."},
    {id:"tweak", lvl:"חובה", t:"מקל ברקים", d:"ניסיתי אותו במשחק, ושיניתי בו דבר אחד."},
    {id:"item", lvl:"חובה", t:"החפץ שלי", d:"החפץ במשחק, עם השם, המשפט והציור שלכם."},
    {id:"power", lvl:"חובה", t:"כוח לחפץ שלי", d:"החפץ שלי עושה משהו, מדוגמה ששיניתי."},
    {id:"second", lvl:"אתגר", t:"חפץ שני", d:"בסטודיו (תפריט, ואז הסטודיו): עוד חפץ מהעולם שלכם."},
    {id:"shade", lvl:"אתגר", t:"צל וברק", d:"בציור יש צבע כהה לצל וצבע בהיר לברק."}
  ]
};

/* ===== lesson 3: how the item is made (crafting). A kid asked for it; Ben, 24 Oct: "how you create an item and what
   you need for it". The recipe lives in the studio (it.recipe); tools/common.ps1 makes the game's recipe file. ===== */
/* A Minecraft recipe as in the game: 9 slots (picture names, "" = empty), the arrow, and what comes out. */
const craftPic = (g, out, n) => `<div class="craft" dir="ltr"><div class="cg">${g.map(t => `<span class="cs">${t ? mcPic(t, "", "") : ""}</span>`).join("")}</div><span class="ca">➜</span><span class="cs co">${mcPic(out, "", "")}${n > 1 ? `<b>${n}</b>` : ""}</span></div>`;
const RECIPES3 = lang => { const E = lang === "en";
  return `<div class="crafts">
  <figure>${craftPic(["","item_coal","","","item_stick","","","",""], "block_torch", 4)}<figcaption><b>Torch</b>${E ? "Cheap: one recipe makes 4." : "זול: מתכון אחד נותן 4."}</figcaption></figure>
  <figure>${craftPic(["","item_diamond","","","item_diamond","","","item_stick",""], "item_diamond_sword", 1)}<figcaption><b>Diamond Sword</b>${E ? "In the shape of a sword." : "בצורה של חרב."}</figcaption></figure>
  <figure>${craftPic(["item_gold_ingot","item_gold_ingot","item_gold_ingot","item_gold_ingot","item_apple","item_gold_ingot","item_gold_ingot","item_gold_ingot","item_gold_ingot"], "item_golden_apple", 1)}<figcaption><b>Golden Apple</b>${E ? "Expensive: 8 Gold Ingot for one apple." : "יקר: 8 Gold Ingot בשביל תפוח אחד."}</figcaption></figure>
</div>`; };
const L3 = {
  n:3, unit:"יחידה 2 · החפצים הראשונים", title:"שיעור 3: איך מכינים את החפץ?",
  stations:[["מתכונים",1],["מקל ברקים",2],["המתכון שלי",3],["במשחק",4],["דרייב",5]],
  groups:{ stick:"מקל ברקים", mine:"החפץ שלי" },
  steps:[
    { title:"היום: מתכון לחפץ שלכם",
      body:`<p>במיינקראפט כמעט כל חפץ מכינים ב־Crafting Table, מחומרים. היום ממציאים לחפץ שלכם מתכון: ממה מכינים אותו, ובאיזו צורה.</p>`,
      visual:()=>road([["מתכונים","איך מיינקראפט עושה את זה"],["מקל ברקים","מתכון מוכן: מכינים אותו במשחק"],["המתכון שלי","ממה מכינים את החפץ שלכם"],["במשחק","מכינים אותו ב־Crafting Table"]]),
      note:"העולם שלכם נעלם? כנראה המחשב התאפס, או שזה מחשב אחר. למעלה: <b>תפריט</b>, ואז <b>דרייב</b>, ומחזירים משם את העולם." },

    { title:"שלושה מתכונים של מיינקראפט",
      body:`<p>כל מתכון אומר שני דברים: מה צריך, ואיך מסדרים את זה במשבצות.</p>`,
      visual:()=>RECIPES3(),
      hints:[
        "למה Golden Apple עולה כל כך הרבה? מה הוא עושה?",
        "מה החומרים של Diamond Sword מספרים עליה?",
        "חפץ שמשתמשים בו הרבה, כמו Torch, צריך להיות זול. ומה עם החפץ שלכם?"
      ] },

    { title:"מקל ברקים: מתכון מוכן", group:"stick", tab:"מכינים אותו",
      body:`<p>זה המתכון של מקל הברקים: 3 Copper Ingot ו־2 Stick, בצורה הזאת.</p>`,
      visual:()=>studioIn({ ready:"lightning_stick", parts:["recipeview"] }) + `<h2 class="lp-sub">מכינים אותו במשחק</h2>` + gameBtn()
        + `<ol class="ingame"><li><b>Singleplayer</b>, ואז העולם שלכם.</li><li>לוחצים <kbd>E</kbd>, בחיפוש כותבים <b>crafting</b>, ומניחים Crafting Table על הרצפה.</li><li>גם את החומרים מוצאים בחיפוש: 3 Copper Ingot ו־2 Stick.</li><li>לוחצים לחיצה ימנית על ה־Crafting Table, ומסדרים את החומרים כמו במתכון.</li></ol>`,
      expect:"מקל הברקים מופיע בריבוע מימין. לוקחים אותו.",
      stuck:[
        ["לא מופיע כלום בריבוע מימין","בודקים שהחומרים מסודרים בדיוק כמו במתכון. כל משבצת חשובה."],
        ["מיינקראפט היה פתוח מקודם","מתכון נכנס למשחק רק כשהמשחק נפתח מחדש. סוגרים את מיינקראפט, ולוחצים שוב על הכפתור הירוק."],
        ["הופיעה מסגרת אדומה: המשחק לא נבנה","מרימים יד וקוראים למורה."]
      ] },

    { title:"המתכון של החפץ שלכם", group:"mine", tab:"המתכון",
      body:`<ol><li>בוחרים חומר מהרשימה, ולוחצים על משבצת: החומר נכנס אליה.</li><li>בוחרים כמה חפצים יוצאים מכל מתכון: 1, 2, 4 או 8.</li></ol>`,
      visual:()=>studioIn({ tag:"l2", parts:["recipe"] }),
      hints:[
        "ממה החפץ עשוי בעולם שלכם? בוחרים חומרים שמתאימים לו. במקל הברקים שהכנתם יש Copper Ingot, כמו ב־Lightning Rod של מיינקראפט.",
        "חפץ חזק צריך חומרים נדירים. Nether Star ו־Diamond יקרים, Stick ו־Cobblestone זולים.",
        "גם החפצים שלכם יכולים להיות חומרים. הם בסוף הרשימה.",
        "לוחצים לחיצה ימנית על משבצת כדי לרוקן אותה."
      ] },

    { title:"מכינים את החפץ במשחק", group:"mine", tab:"בודקים במשחק",
      body:`<ol><li>מיינקראפט פתוח? סוגרים אותו.</li><li>לוחצים על הכפתור הירוק.</li><li>במשחק לוקחים את החומרים מהתפריט של <kbd>E</kbd>, ומסדרים אותם ב־Crafting Table כמו במתכון.</li></ol>`,
      visual:()=>studioIn({ tag:"l2", parts:["recipeview"] }) + gameBtn(),
      expect:"החפץ שלכם מופיע בריבוע מימין, בכמות שבחרתם.",
      stuck:[
        ["יצא חפץ של מיינקראפט במקום החפץ שלי","למיינקראפט כבר יש מתכון כזה. מחליפים במתכון חומר אחד, ובודקים שוב."],
        ["לא מופיע כלום בריבוע מימין","בודקים שהצורה בדיוק כמו בסטודיו. או מסמנים בסטודיו ״הסדר לא משנה״."],
        ["שיניתי, ובמשחק לא רואים","שינוי נכנס רק כשהמשחק נפתח מחדש. סוגרים את מיינקראפט, ולוחצים שוב על הכפתור הירוק."],
        ["הופיעה מסגרת אדומה: המשחק לא נבנה","מרימים יד וקוראים למורה."]
      ] },

    { title:"שומרים ומסיימים",
      body:`<ul><li>מראים למי שיושב לידכם רק את המתכון, ושואלים: מה החפץ עושה?</li><li>סוגרים את מיינקראפט.</li><li>שומרים את העולם בדרייב:</li></ul>`,
      visual:()=>driveBox() }
  ],
  challenges:[
    {id:"stick", lvl:"חובה", t:"מקל ברקים", d:"הכנתי אותו ב־Crafting Table."},
    {id:"recipe", lvl:"חובה", t:"מתכון לחפץ שלי", d:"החומרים מתאימים לחפץ ולמחיר שלו."},
    {id:"craft", lvl:"חובה", t:"במשחק", d:"הכנתי את החפץ שלי ב־Crafting Table."},
    {id:"guess", lvl:"אתגר", t:"מתכון שמספר על החפץ", d:"מי שיושב לידי ניחש מה החפץ עושה, רק מהמתכון."},
    {id:"chain", lvl:"אתגר", t:"חפץ מחפץ", d:"במתכון של חפץ אחד יש חפץ אחר שלי."},
    {id:"any", lvl:"אתגר", t:"הסדר לא משנה", d:"הכנתי מתכון שעובד בכל סדר."}
  ]
};

const GEM_TEXT = `RULES FOR THIS CHAT. Follow them for every answer in this chat.
You are the Mod Helper for a class of 11-13-year-olds in Israel who are each building their own Minecraft mod. Their teacher is Ben. Answer in simple, short Hebrew. If the kid writes to you in English, answer in simple English. Code, file names and paths stay in English.

THE SETUP (never change it)
- Minecraft Java Edition 26.2, NeoForge 26.2.0.88, Java 25, ModDevGradle. Mojang's official names (the game is no longer obfuscated).
- Never use net.minecraftforge, Forge, Fabric, or code written for Minecraft 1.21 or older. Most tutorials online are for old versions.
- Known 26.x changes that old code gets wrong: ResourceLocation is now Identifier; entity save/load uses ValueInput/ValueOutput; entity renderers use render states.
- If you're not sure something exists in 26.2, say so plainly and tell the kid how to check it in the game. Never invent a method or class.

THE KID'S PROJECT
- Every kid has the same project: mod id "myworld", Java package make.myworld. You only ever write these five files:
  MyWorld.java (the world's name, in NAME), MyItems.java (items), MyEffects.java (effects), MyMobs.java (creatures), MyRules.java (world rules, as NeoForge game events).
- Never write Kit.java or any other file. Never write JSON, language or model files: the project makes the names and the item models by itself.
- An item is one field in MyItems.java:
  public static final DeferredItem<Item> HONEY_COIN = Kit.item("honey_coin", "<name in Hebrew>", "<line under the name, in Hebrew>", p -> p.stacksTo(16));
  The first three arguments are always plain string literals: the code name (lowercase English, digits and _), the name in the game, and the line under the name. A script reads them, so never build them from variables. The fourth argument sets numbers on Item.Properties (stacksTo, durability, rarity, food...). For an item with its own behaviour, add a fifth argument: p -> new Item(p) { @Override ... }.
- An effect is one field in MyEffects.java: Kit.effect("code", "<name in Hebrew>", () -> new MobEffect(MobEffectCategory.BENEFICIAL, 0xRRGGBB) { ... }), which returns Holder<MobEffect>.
- Every kid file keeps its line "static void load() {}".
- Pictures: the kid draws each item's 16x16 picture in the course hub and saves it under the item's code name. Never send images. If an item has no picture yet, remind the kid to draw one.

HOW YOUR CODE GETS INTO THE GAME
- The kid copies your code with the copy button and presses one button in the hub. That button finds the file by its "public class" line, keeps a backup, and builds the game. So: one whole file per answer, starting with "package make.myworld;". Never snippets, never "add this line here".
- The kid's message starts with these rules and the kid's current code (under "===== הקוד שלי ====="), and ends with what they want (under "===== מה אני רוצה ====="). If you don't have the kid's current code, ask the kid to press "להעתיק לג׳מיני" in the hub and paste it here with Ctrl+V. Always build on the latest code the kid pasted, and keep everything the kid didn't ask to change. Names and lines in Hebrew stay exactly as the kid wrote them.
- A failed build arrives as a message that starts with "המוד שלי לא עובד. זאת השגיאה:". Fix it and send the whole file again.

HOW YOU WORK WITH THE KID
1. Card first. Only write code when the kid has told you what they want: for an item, its name, its code name, the line under the name and how many fit in a stack. If the request is vague ("תבנה לי חרב", "תעשה משהו מגניב"), don't write code. Ask the card's questions, ONE question per message.
2. The ideas belong to the kid. Never suggest names, stories, lines, abilities, colours or pictures, even if they ask. You may ask hard questions ("מה קורה אם...?", "למה שחקן ירצה את זה?") and point out problems, but the kid chooses the answers. If they ask you to invent it, say kindly that this part is theirs, and ask one question that helps them think.
3. Before the code: one short Hebrew sentence saying which file it is and what changed. After the code: "במשחק אמורים לראות:" followed by what the kid asked for.
4. "לא עובד" is not a bug report. Ask: what did you do, what did you want to see, and what happened instead. Then fix it and send the whole file again.
5. If you were wrong, say "טעיתי" plainly and fix it.
6. Big ideas (a boss, a new world, a whole mini-game) are welcome, but never in one answer. Say in one sentence that you will build it in small steps. Build only the first step: the smallest piece that works in the game by itself. The next step comes only after the kid has tested it in the game. If something can't be done in these five files, say so plainly and offer the closest thing that can.

LIMITS
- Age-appropriate always. Never ask for their real name, school, address or photos, and tell them not to share these.
- Stay on the mod. If they drift, bring them back in one sentence.
- If the kid only says hello: greet them in one line, say in one line that you help turn their ideas into a working mod, and ask one question about their world.`;

const TEACHER_CHECK = [
  ["install","הרצת install.bat על המחשב שלך, ומיינקראפט נפתח","מהמחשב הזה מכינים את הדיסקים."],
  ["usb","הכנת דיסקים עם make-usb.bat","כמה שיותר: דיסק אחד מתקין מחשב אחד בכל פעם. עם 3 דיסקים המחשב האחרון מתחיל אחרי 10 דקות. פורמט exFAT או NTFS, לא FAT32."],
  ["school","הרצת school-check.bat על מחשב אחד של בית הספר","שולחים צילום של התוצאה ל־Claude."],
  ["laptops","המחשבים ממוספרים 1–8 וטעונים","כל ילד מקבל את אותו מחשב כל שבוע."],
  ["gemtest","בדקת את ג׳מיני עם חשבון תלמיד","נכנסים? עונה? מדביקים את החוקים ושואלים משהו, ורואים שהוא עונה בעברית."],
  ["drive","בדקת את הדרייב עם חשבון תלמיד","בהאב: דרייב, להוריד את קובץ הגיבוי, ולהעלות אותו לדרייב. אחר כך להוריד אותו משם ולהחזיר."],
  ["print","הדפסת את הדפים: כרטיס עולם וכרטיס חפץ לכל ילד","בדף הזה, למעלה: דפים להדפסה. 10 מכל אחד, ולהביא טושים."],
  ["proj","בדקת את ״הצגת שיעור 1״ על המקרן בכיתה",""]
];

function applyReveal(root, set){
  root.querySelectorAll("[data-sil]").forEach(b => { if (set.has(+b.dataset.sil)) { b.classList.add("shown"); b.querySelector(".nm").textContent = MOBS[+b.dataset.sil].name; } });
}
const LESSONS = { 1: L1, 2: L2, 3: L3 };
const DECKS = { 1: SLIDES };
window.HUB = { CSS, injectStyle, FONT_HREF, GEM_LINK, LS, esc, UNITS, MOBS, silSVG, EQ, ROLES, VAGUE_SPECIFIC,
  gemPromptBox, L1, worldCardForm, bindWorldCard, bindCopy, bindSil, applyReveal, SLIDES, GEM_TEXT, TEACHER_CHECK,
  LESSONS, DECKS, SCENES, sceneSVG, swatches, mobFace, mcPic, FACES, studioIn, gameBtn, driveBox, road, MC_MENU, RECIPES3 };
})();
