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
.dock-btns{display:grid;grid-template-columns:2fr repeat(6,1fr);gap:10px}
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
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ===== course map ===== */
const UNITS = [
  { n:1, name:"מתחילים", sub:"מיינקראפט עובד, העולם שלי על נייר", color:"#3B8735", icon:"1",
    lessons:[ {n:1, title:"התקנה והעולם שלי", build:"כרטיס העולם, ומיינקראפט שעובד על המחשב", open:true} ] },
  { n:2, name:"החפצים הראשונים", sub:"מהכרטיס אל תוך המשחק", color:"#2B6A99", icon:"2",
    lessons:[
      {n:2, title:"החפץ הראשון שלי", build:"חפץ עם שם, ציור והסבר שלכם, בתוך המשחק", open:true},
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
  <div class="me"><b>אתם: הבמאים</b><ul><li>ממציאים את העולם, השמות והסיפור</li><li>מציירים ובונים מודלים בעצמכם</li><li>בודקים: זה מה שרציתי?</li></ul></div>
  <div class="ai"><b>ג׳מיני: כותב הקוד</b><ul><li>הופך כרטיס לקוד</li><li>שואל שאלות כשמשהו לא ברור</li><li>לפעמים טועה, ובטוח שהוא צודק</li></ul></div>
</div>`;

function gemPromptBox(text){
  return `<div class="prompt"><div class="row"><b>כותבים בג׳מיני:</b><button class="btn ghost" data-copy="${esc(text)}">העתקה</button></div><pre>${esc(text)}</pre></div>`;
}


/* What Gemini's screen looks like, with the 4 things the kids need */
const GEMINI_MOCK = `<div class="gm" dir="rtl">
  <div class="gm-side"><div class="gm-new">+ צ׳אט חדש <i>3</i></div><div class="gm-lbl">צ׳אטים קודמים</div></div>
  <div class="gm-main">
    <div class="bub ai"><b>ג׳מיני</b>זה הקובץ MyItems.java עם החפץ החדש:</div>
    <div class="gm-code" dir="ltr"><span class="gm-copy">⧉ <i>4</i></span><pre>public class MyItems {
  ...
}</pre></div>
    <div class="gm-input">כותבים כאן, ו־Enter שולח <i>2</i></div>
  </div>
</div>`;

const COPY_FLOW = `<div class="flow" dir="rtl">
  <div class="st go"><b>להעתיק לג׳מיני</b><small>בדף הזה, למעלה</small></div><span class="ar">←</span>
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
const L1 = {
  n:1, unit:"יחידה 1 · מתחילים", title:"שיעור 1: התקנה והעולם שלי",
  steps:[
    { type:"פתיחה", title:"מה עושים היום",
      body:`<p>היום עושים שלושה דברים. מתחילים בהתקנה, כי היא לוקחת זמן. בזמן שהמחשב עובד, אנחנו מדברים וממציאים עולם.</p>`,
      expect:"בסוף השיעור: מיינקראפט פתוח על המחשב שלכם, וכרטיס עולם מלא.",
      visual:()=>`<div class="today">
        <div><span class="num">1</span><b>מתקינים</b><span>מהדיסק און קי. המחשב עושה את העבודה.</span></div>
        <div><span class="num">2</span><b>ממציאים עולם</b><span>מדברים על מה עולם צריך, וממלאים כרטיס עולם על דף.</span></div>
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
  Desktop: Minecraft
Copy finished at 16:12. <span class="w">You can take the stick out now.</span>

[3/3] Starting Minecraft to check it works. No internet needed.
&gt; Task :runClient</div>` },

    { type:"שיחה", title:"מה זה מוד, ומי כותב את הקוד?",
      body:`<p><b>מוד</b> זה תוספת שמשנה את מיינקראפט: חפצים חדשים, יצורים חדשים, חוקים חדשים.</p>
        <p>את הקוד יכתוב <b>ג׳מיני</b>. אתם הבמאים: אתם מחליטים מה יהיה בעולם, ובודקים שהוא באמת עשה את זה.</p>
        <p>המוד שלכם הוא כמה קבצים עם קוד. אתם לא צריכים לפתוח אותם: ג׳מיני כותב את הקוד, וכפתור אחד בדף הזה מכניס אותו למוד ופותח את מיינקראפט.</p>`,
      why:"מי שאומר לבינה מלאכותית ״תבנה לי את זה״ מקבל משהו שהוא לא בחר. מי שמסביר בדיוק מה הוא רוצה, יכול גם לבדוק שקיבל את זה.",
      visual:()=>EQ + ROLES },

    { type:"שיחה", title:"מה עולם צריך?",
      body:`<p>איזה מקום במיינקראפט אתם הכי זוכרים? למה דווקא אותו?</p>
        <p>לעולם שזוכרים יש ארבעה דברים. מדברים עליהם יחד, ואחר כך כל אחד ממציא את העולם שלו.</p>`,
      why:"עולם שאין בו רעיון, צבעים וחוקים משלו נראה כמו עוד Plains. אף אחד לא זוכר Plains.",
      visual:()=>postcards(["nether","end","deep","plains"], "tag") + WORLD_NEEDS },

    { type:"פעילות", title:"כרטיס העולם שלי",
      body:`<p>15 דקות. קודם על הדף, עם טושים.</p><p>אחר כך מעתיקים לכאן, וזה נשמר במחשב. אין תשובות נכונות. זה העולם שלכם.</p>`,
      why:"משפט קצר על העולם עונה בשבילכם על המון שאלות אחר כך: איזה יצורים יש, איזה צבעים, מה מסוכן.",
      hints:[
        "חושבים על משהו שאתם אוהבים: חיה, מקום, תקופה, מאכל. מה קורה אם הוא ענק? מפחיד? חי בשמיים?",
        "דוגמאות: ״פיראטים בשמיים על איים מרחפים״ · ״יער שהלילה בו לא נגמר״ · ״דבורים ענקיות שבנו עיר מדבש״.",
        "תקועים על החוק? חושבים מה אסור לעשות בעולם שלכם, או מה קורה שם רק בלילה."
      ],
      visual:()=>worldCardForm() },

    { type:"בדיקה", title:"מיינקראפט נפתח!",
      body:`<ol>
        <li>לוחצים <b>Singleplayer</b>.</li>
        <li>לוחצים על <b>Game Mode</b> עד שכתוב <b>Creative</b>, ואז <b>Create New World</b>.</li>
        <li>כשאתם בתוך העולם, לוחצים <kbd>F2</kbd>. זה מצלם את המסך.</li>
        <li>לוחצים <kbd>Esc</kbd>, ואז <b>Mods</b>, ומחפשים את המוד ברשימה.</li>
      </ol>`,
      expect:"ברשימת המודים יש מוד בשם My World. זה המוד שלכם.",
      note:"קפץ מסך Welcome to Minecraft? לוחצים Continue. מיינקראפט עוד לא נפתח? זה בסדר: ממשיכים לשלב הבא ובודקים שוב בסוף.",
      visual:()=>`<div class="mcmenu"><div class="logo">MINECRAFT</div>
        <div class="mcbtn hot">Singleplayer <small>← 1</small></div><div class="mcbtn">Multiplayer</div><div class="mcbtn hot">Mods <small>← 4</small></div><div class="mcbtn">Options...</div></div>` },

    { type:"שיחה", title:"מה זה ג׳מיני",
      body:`<p><b>ג׳מיני</b> הוא הצ׳אט של גוגל עם בינה מלאכותית, כמו ChatGPT. כותבים לו הודעה, והוא עונה.</p>
        <ol><li>נכנסים ל־<code>gemini.google.com</code> ומתחברים עם החשבון של משרד החינוך.</li>
        <li>למטה יש תיבה. כותבים בה ולוחצים <kbd>Enter</kbd> כדי לשלוח.</li>
        <li>בצד יש תפריט. שם פותחים צ׳אט חדש.</li>
        <li>כשג׳מיני כותב קוד, הקוד מופיע בתיבה אפורה, ובפינה שלה יש כפתור העתקה. ככה מעתיקים קוד.</li></ol>`,
      why:"ג׳מיני לא זוכר צ׳אטים קודמים. לכן בקורס הזה שולחים לו כל פעם את הקוד שלכם מחדש.",
      note:"לא כותבים לג׳מיני את השם האמיתי שלכם, את בית הספר או איפה אתם גרים.",
      stuck:[["לא מצליחים להתחבר","בודקים שזה החשבון של משרד החינוך. אם זה עדיין לא עובד, מרימים יד."],["כתוב שאין גישה ל־Gemini","מרימים יד."]],
      visual:()=>GEMINI_MOCK },

    { type:"שיחה", title:"איך מדברים עם ג׳מיני בקורס",
      body:`<p>בכל פעם שמבקשים משהו מג׳מיני, עושים אותו דבר:</p>
        <ol><li>לוחצים בדף הזה, למעלה, על <b>להעתיק לג׳מיני</b>. זה מעתיק את החוקים של הקורס ואת הקוד שלכם.</li>
        <li>בג׳מיני לוחצים <kbd>Ctrl</kbd> + <kbd>V</kbd>.</li>
        <li>מתחת כותבים מה אתם רוצים, ושולחים.</li></ol>`,
      why:"בלי החוקים, ג׳מיני כותב קוד למיינקראפט ישן שלא עובד אצלנו, וממציא בשבילכם שמות ורעיונות. והוא לא זוכר צ׳אטים קודמים, אז שולחים לו את החוקים ואת הקוד כל פעם מחדש.",
      note:"החוקים באנגלית. ככה ג׳מיני מבין אותם הכי טוב, והוא עונה לכם בעברית.",
      visual:()=>COPY_FLOW },

    { type:"בדיקה", title:"מדברים עם ג׳מיני",
      body:`<ol>
        <li>בג׳מיני פותחים צ׳אט חדש.</li>
        <li>לוחצים למעלה על <b>להעתיק לג׳מיני</b>, ובג׳מיני לוחצים <kbd>Ctrl</kbd> + <kbd>V</kbd>.</li>
        <li>מתחת כותבים את השורה מהמסגרת, עם העולם שלכם מכרטיס העולם, ושולחים.</li>
        <li>עונים על השאלה שג׳מיני שואל.</li>
      </ol>`,
      expect:"ג׳מיני עונה בעברית ושואל שאלה על העולם שלכם.",
      stuck:[["אין למעלה כפתור להעתיק לג׳מיני","פותחים את הדף מהסמל Minecraft. או מעתיקים את החוקים מהכפתור כאן, ומדביקים אותם בג׳מיני."]],
      visual:()=>gemPromptBox("היום מתחילים מוד למיינקראפט. העולם שלי: ") + `<div><button class="btn ghost" data-copy="${esc(GEM_TEXT)}">להעתיק רק את החוקים</button></div><div class="chat"><div class="bub me"><b>אתם</b>(החוקים והקוד) היום מתחילים מוד למיינקראפט. העולם שלי: פיראטים בשמיים על איים מרחפים</div><div class="bub ai"><b>ג׳מיני</b>נשמע מסקרן! שאלה ראשונה: מה מחזיק את האיים באוויר?</div></div>` },

    { type:"סיום", title:"מסיימים",
      body:`<ul><li>סוגרים את מיינקראפט.</li><li>לוחצים למעלה על <b>דרייב</b>, ושומרים את העולם בדרייב שלכם לפי השלבים שם.</li></ul>`,
      why:"המחשב של בית הספר יכול להתאפס, ואולי בשבוע הבא תשבו ליד מחשב אחר. מה שבדרייב שלכם נשאר שלכם.",
      expect:"בשיעור הבא: החפץ הראשון שלכם, בתוך המשחק.",
      visual:()=>`<div class="checks"><div><span class="ok"></span>מיינקראפט נפתח</div><div><span class="ok"></span>כרטיס העולם מלא</div><div><span class="ok"></span>ג׳מיני ענה לי</div><div><span class="ok"></span>העולם שלי שמור בדרייב</div></div>` }
  ],
  challenges:[
    {id:"mc", lvl:"חובה", t:"מיינקראפט עובד", d:"נכנסתי לעולם Creative ומצאתי את המוד ברשימה."},
    {id:"card", lvl:"חובה", t:"כרטיס עולם", d:"העולם שלי בשורה אחת, שלושה צבעים, וחוק אחד."},
    {id:"gem", lvl:"חובה", t:"ג׳מיני ענה", d:"שלחתי לו את החוקים ואת העולם שלי, ועניתי על שאלה אחת."}
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


/* ===== lesson 2: the loop, the item card, the pixel editor ===== */
const FLOW = `<div class="flow" dir="rtl">
  <div class="st"><b>כרטיס</b><small>מחליטים מה רוצים</small></div><span class="ar">←</span>
  <div class="st"><b>ג׳מיני</b><small>החוקים, הקוד והכרטיס</small></div><span class="ar">←</span>
  <div class="st go"><b>הדבקה</b><small>הדבקה מג׳מיני ושחק</small></div><span class="ar">←</span>
  <div class="st"><b>בדיקה</b><small>זה מה שרציתם?</small></div>
</div>`;

const IC_FIELDS = [
  {id:"name", label:"שם החפץ במשחק", ph:"מטבע דבש"},
  {id:"use", label:"בשביל מה הוא?", ph:"משלמים בו לדבורים, והן פותחות את השער לעיר"},
  {id:"cost", label:"המחיר שלו", ph:"מי שמחזיק מטבע, הדבורים רודפות אחריו"},
  {id:"where", label:"איפה משיגים אותו?", ph:"רק בכוורות ישנות, אחד בכל כוורת"},
  {id:"code", label:"הקוד באנגלית (אותיות קטנות, בלי רווחים)", ph:"honey_coin", ltr:true},
  {id:"line", label:"המשפט שמופיע מתחת לשם", ph:"הדבורים מקבלות רק אותו."},
  {id:"stack", label:"כמה נכנסים בערימה אחת (1 עד 64)", ph:"16", ltr:true}
];
const codeName = t => t.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
function itemCardForm(){
  const v = LS.get("itemcard", {});
  return `<div class="wcard"><div class="hd"><h3>כרטיס החפץ</h3><span class="chip">שיעור 2</span></div>
    ${IC_FIELDS.map(f=>`<div class="fld"><label for="ic-${f.id}">${f.label}</label><input type="text" id="ic-${f.id}" data-ic="${f.id}" ${f.ltr?'dir="ltr"':""} placeholder="למשל: ${esc(f.ph)}" value="${esc(v[f.id]||"")}" maxlength="80"></div>`).join("")}
    <div class="saved" id="ic-saved"></div></div>`;
}
function bindItemCard(root){
  root.querySelectorAll("[data-ic]").forEach(i => i.addEventListener("input", () => {
    const v = LS.get("itemcard", {});
    v[i.dataset.ic] = i.dataset.ic === "code" ? codeName(i.value) : i.value;
    if (i.dataset.ic === "code" && i.value !== v.code) i.value = v.code;
    LS.set("itemcard", v);
    const s = root.querySelector("#ic-saved"); if (s) s.textContent = "נשמר על המחשב הזה";
  }));
}
function itemCardPrompt(){
  const v = LS.get("itemcard", {});
  return "חפץ חדש לעולם שלי.\nשם: " + (v.name||"") + "\nקוד: " + (v.code||"") + "\nמשפט מתחת לשם: " + (v.line||"") + "\nכמה בערימה: " + (v.stack||"");
}

/* The 16x16 pixel editor. Saves straight into the item's picture when the hub runs from the "Minecraft" icon. */
const PX_COLORS = ["#1d1d21","#474f52","#9d9d97","#f9fffe","#b02e26","#f9801d","#fed83d","#80c71f","#5e7c16","#169c9c","#3ab3da","#3c44aa","#8932b8","#c74ebd","#f38baa","#835432"];
function pixelEditorHTML(){
  return `<div class="px" id="px">
    <div class="px-top"><label for="px-id"><b>הקוד של החפץ:</b></label><input id="px-id" list="px-items" placeholder="honey_coin" autocomplete="off"><datalist id="px-items"></datalist></div>
    <div class="px-main">
      <canvas class="big" id="px-c" width="320" height="320" aria-label="לוח ציור 16 על 16"></canvas>
      <div class="px-side">
        <div class="px-pal" id="px-pal">${PX_COLORS.map((c,i)=>`<button data-c="${c}" style="background:${c}" class="${i===0?"on":""}" aria-label="צבע ${i+1}"></button>`).join("")}<input type="color" id="px-custom" value="#ff66aa" aria-label="צבע משלכם"></div>
        <div class="px-tools">
          <button class="btn ghost on" data-tool="pen">עיפרון</button>
          <button class="btn ghost" data-tool="erase">מחק</button>
          <button class="btn ghost" data-tool="fill">דלי</button>
          <button class="btn ghost" id="px-undo">צעד אחורה</button>
          <button class="btn ghost" id="px-clear">לנקות הכול</button>
        </div>
        <div class="px-prev"><canvas id="px-p1" width="16" height="16" style="width:32px;height:32px"></canvas><canvas id="px-p2" width="16" height="16" style="width:64px;height:64px"></canvas><small>ככה זה ייראה במשחק</small></div>
        <div><button class="btn go" id="px-save">לשמור את הציור</button></div>
        <div class="px-msg" id="px-msg"></div>
      </div>
    </div>
  </div>`;
}
function mountPixelEditor(root, served){
  const el = root.querySelector("#px"); if (!el) return;
  const N = 16, C = el.querySelector("#px-c"), g = C.getContext("2d"), cell = C.width / N;
  const P1 = el.querySelector("#px-p1").getContext("2d"), P2 = el.querySelector("#px-p2").getContext("2d");
  const idIn = el.querySelector("#px-id"), msg = el.querySelector("#px-msg");
  let px = new Array(N*N).fill(null), color = PX_COLORS[0], tool = "pen", down = false, hist = [];
  const card = LS.get("itemcard", {}); if (card.code) idIn.value = card.code;
  const say = (t, ok) => { msg.textContent = t; msg.className = "px-msg " + (ok === true ? "ok" : ok === false ? "bad" : ""); };
  function draw(){
    for (let y=0; y<N; y++) for (let x=0; x<N; x++){
      const c = px[y*N+x];
      g.fillStyle = c || (((x+y)%2) ? "#e9ece6" : "#ffffff");
      g.fillRect(x*cell, y*cell, cell, cell);
    }
    g.strokeStyle = "rgba(0,0,0,.12)"; g.lineWidth = 1;
    for (let i=1; i<N; i++){ g.beginPath(); g.moveTo(i*cell+.5,0); g.lineTo(i*cell+.5,C.height); g.stroke(); g.beginPath(); g.moveTo(0,i*cell+.5); g.lineTo(C.width,i*cell+.5); g.stroke(); }
    [P1,P2].forEach(p => { p.clearRect(0,0,N,N); px.forEach((c,i)=>{ if (c){ p.fillStyle = c; p.fillRect(i%N, Math.floor(i/N), 1, 1); } }); });
  }
  const snap = () => { hist.push(px.slice()); if (hist.length > 40) hist.shift(); };
  function at(e){ const r = C.getBoundingClientRect(); const x = Math.floor((e.clientX - r.left) / r.width * N), y = Math.floor((e.clientY - r.top) / r.height * N); return (x<0||y<0||x>=N||y>=N) ? -1 : y*N+x; }
  function fill(i, to){ const from = px[i]; if (from === to) return; const st = [i]; while (st.length){ const k = st.pop(); if (px[k] !== from) continue; px[k] = to; const x = k%N, y = Math.floor(k/N); if (x>0) st.push(k-1); if (x<N-1) st.push(k+1); if (y>0) st.push(k-N); if (y<N-1) st.push(k+N); } }
  function paint(e){ const i = at(e); if (i < 0) return; const erase = tool === "erase" || e.buttons === 2; if (tool === "fill" && !erase){ fill(i, color); } else { px[i] = erase ? null : color; } draw(); }
  C.addEventListener("contextmenu", e => e.preventDefault());
  C.addEventListener("pointerdown", e => { e.preventDefault(); snap(); down = true; C.setPointerCapture(e.pointerId); paint(e); });
  C.addEventListener("pointermove", e => { if (down && tool !== "fill") paint(e); });
  C.addEventListener("pointerup", () => { down = false; });
  el.querySelectorAll("#px-pal [data-c]").forEach(b => b.addEventListener("click", () => { color = b.dataset.c; el.querySelectorAll("#px-pal [data-c]").forEach(x => x.classList.toggle("on", x === b)); if (tool === "erase") setTool("pen"); }));
  el.querySelector("#px-custom").addEventListener("input", e => { color = e.target.value; el.querySelectorAll("#px-pal [data-c]").forEach(x => x.classList.remove("on")); });
  function setTool(t){ tool = t; el.querySelectorAll("[data-tool]").forEach(b => b.classList.toggle("on", b.dataset.tool === t)); }
  el.querySelectorAll("[data-tool]").forEach(b => b.addEventListener("click", () => setTool(b.dataset.tool)));
  el.querySelector("#px-undo").addEventListener("click", () => { if (hist.length){ px = hist.pop(); draw(); } });
  el.querySelector("#px-clear").addEventListener("click", () => { snap(); px.fill(null); draw(); });
  function load(id){
    if (!served || !/^[a-z0-9_]+$/.test(id)) return;
    const img = new Image();
    img.onload = () => { const t = document.createElement("canvas"); t.width = t.height = N; const tg = t.getContext("2d"); tg.drawImage(img, 0, 0, N, N); const d = tg.getImageData(0,0,N,N).data; snap(); px = px.map((_,i) => d[i*4+3] > 20 ? "#" + [0,1,2].map(k => d[i*4+k].toString(16).padStart(2,"0")).join("") : null); draw(); say("נטען הציור הקיים של " + id + "."); };
    img.src = "/picture/" + id + ".png?" + Date.now();
  }
  idIn.addEventListener("input", () => { idIn.value = codeName(idIn.value); });
  idIn.addEventListener("change", () => load(idIn.value));
  el.querySelector("#px-save").addEventListener("click", async () => {
    const id = idIn.value;
    if (!/^[a-z0-9_]{1,40}$/.test(id)) { say("קודם כותבים את הקוד של החפץ, באנגלית.", false); idIn.focus(); return; }
    if (!px.some(Boolean)) { say("הלוח ריק. קודם מציירים.", false); return; }
    if (!served) { say("כדי לשמור, פותחים את הדף מהסמל Minecraft בשולחן העבודה.", false); return; }
    const t = document.createElement("canvas"); t.width = t.height = N; const tg = t.getContext("2d");
    px.forEach((c,i)=>{ if (c){ tg.fillStyle = c; tg.fillRect(i%N, Math.floor(i/N), 1, 1); } });
    try {
      const r = await fetch("/api/save-picture", { method:"POST", headers:{ "X-Make":"1", "Content-Type":"application/json" }, body: JSON.stringify({ id, png: t.toDataURL("image/png").split(",")[1] }) });
      const j = await r.json(); say(j.result, j.ok);
    } catch(e){ say("הציור לא נשמר. נסו שוב.", false); }
  });
  if (served) fetch("/api/items", { cache:"no-store" }).then(r => r.json()).then(list => {
    el.querySelector("#px-items").innerHTML = list.map(it => `<option value="${esc(it.id)}">${esc(it.name)}</option>`).join("");
    if (idIn.value && list.some(it => it.id === idIn.value && it.hasPicture)) load(idIn.value);
  }).catch(()=>{});
  draw();
}

/* ===== lesson 1 slides ===== */
const SLIDES = [
  { label:"פתיחה", html:`<div class="eye">שיעור 1 · מודים למיינקראפט</div><h1>העולם שלכם מתחיל היום</h1><p class="sub">20 שיעורים. בסוף, המשפחות והחברים ישחקו בעולם שאתם המצאתם.</p>`,
    notes:"0–15 דק׳. עוד לפני שמדברים: מחלקים מחשבים לפי מספר ומעבירים את הדיסק און קי. המסך הבא הוא הוראות ההתקנה." },
  { label:"מתקינים", html:`<h2>מתחילים להתקין</h2><ol class="big"><li>דיסק און קי במחשב</li><li><kbd>Win</kbd> + <kbd>E</kbd> ← לוחצים על הדיסק</li><li>לחיצה כפולה על <code>install-from-usb</code></li><li>חלון שחור נפתח. <b>לא סוגרים!</b></li><li>כשכתוב שאפשר, מעבירים את הדיסק הלאה</li></ol>`,
    notes:"דיסק אחד מתקין מחשב אחד בכל פעם, בערך 5 דקות. עם 3 דיסקים, המחשב האחרון מתחיל רק אחרי 10 דקות, אז מתחילים לדבר כשהסבב הראשון רץ ולא מחכים לכולם. מי שקיבל ERROR: לא לסגור, לצלם, להמשיך עם שותף." },
  { label:"מה נעשה", html:`<h2>מה נעשה בקורס</h2>${EQ}<p class="sub">חפצים · יצורים · מקום · חוקים · סיפור. הכול שלכם.</p>`,
    notes:"15–20 דק׳. מוד זה תוספת למיינקראפט. ג׳מיני כותב את הקוד, והם ממציאים ובודקים. אם יש לך מוד שעובד, מראים אותו עכשיו. קצר." },
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
  { label:"מיינקראפט נפתח?", html:`<h2>מיינקראפט נפתח?</h2><ol class="big"><li>Singleplayer</li><li>Game Mode: <b>Creative</b> ← Create New World</li><li><kbd>F2</kbd> מצלם את המסך</li><li><kbd>Esc</kbd> ← Mods ← מוצאים את המוד</li></ol>`,
    notes:"80–88 דק׳. בפעם הראשונה קופץ מסך Welcome to Minecraft: לוחצים Continue. מי שמיינקראפט עוד לא נפתח אצלו: רושמים את מספר המחשב, ובודקים בהפסקה." },
  { label:"ג׳מיני", html:`<h2>מה זה ג׳מיני</h2><ol class="big"><li><code>gemini.google.com</code>, עם החשבון של משרד החינוך</li><li>כותבים למטה, <kbd>Enter</kbd> שולח</li><li>תפריט בצד: צ׳אט חדש</li><li>כפתור העתקה בפינה של כל קוד</li><li>ג׳מיני לא זוכר צ׳אטים קודמים</li></ol>`,
    notes:"רק אם נשאר זמן. אחרת עושים את זה בתחילת שיעור 2. מראים את כל זה על המקרן, בחשבון שלך. בנקודה האחרונה מסבירים: בגלל זה בכל שיעור שולחים לו את הקוד מחדש." },
  { label:"מדברים עם ג׳מיני", html:`<h2>איך מדברים עם ג׳מיני בקורס</h2>${COPY_FLOW}<p class="sub">החוקים של הקורס והקוד שלכם, בכל הודעה מחדש</p>`,
    notes:"רק אם נשאר זמן. אחרת בתחילת שיעור 2. מראים על המקרן: צ׳אט חדש, להעתיק לג׳מיני, Ctrl+V, ומתחת ״העולם שלי: ...״. אחר כך הם עושים את אותו דבר. מי שלא הספיק: עושה את זה בתחילת שיעור 2." },
  { label:"סיום", html:`<h2>בשבוע הבא</h2><p class="quote">החפץ הראשון שלכם, בתוך המשחק</p><ul class="big"><li>סוגרים את מיינקראפט</li></ul>`,
    notes:"88–90 דק׳. שומרים בדרייב. לרשום אילו מחשבים לא סיימו את ההתקנה, ולבדוק אותם בהפסקה, לפני שיעור 2." }
];


/* ===== lesson 2: my first item ===== */
const L2 = {
  n:2, unit:"יחידה 2 · החפצים הראשונים", title:"שיעור 2: החפץ הראשון שלי",
  steps:[
    { type:"פתיחה", title:"מה עושים היום",
      body:`<p>היום החפץ הראשון שלכם נכנס למשחק, עם שם, משפט וציור שאתם בחרתם.</p>`,
      expect:"בסוף השיעור החפץ שלכם נמצא במשחק, בתפריט של מצב יצירה, עם הציור שציירתם.",
      note:"כרטיס העולם שלכם נעלם? כנראה המחשב התאפס, או שזה מחשב אחר. לוחצים למעלה על <b>דרייב</b>, ומחזירים את העולם שלכם מהדרייב.",
      visual:()=>`<div class="today">
        <div><span class="num">1</span><b>מה הופך חפץ למעולה?</b><span>מדברים על זה יחד.</span></div>
        <div><span class="num">2</span><b>ממציאים חפץ</b><span>כרטיס וציור של 16 על 16, על דף.</span></div>
        <div><span class="num">3</span><b>ג׳מיני כותב את הקוד</b><span>אתם מדביקים ובודקים.</span></div>
      </div>` },

    { type:"שיחה", title:"מה הופך חפץ למעולה?",
      body:`<p>מה החפץ הכי טוב במיינקראפט? ומה החפץ שאתם אף פעם לא משתמשים בו?</p>
        <p>לחפץ מעולה יש ארבעה דברים. מדברים עליהם יחד, ואחר כך כל אחד ממציא חפץ לעולם שלו.</p>`,
      why:"חרב שהורגת כל דבר במכה אחת כיפית לחמש דקות. אחר כך כבר אין סכנה, ואין משחק. המחיר הוא החלק המעניין.",
      visual:()=>itemRow(["pick","pearl","bow","apple","totem","wings","potato","dirt"]) + ITEM_NEEDS },

    { type:"פעילות", title:"כרטיס החפץ",
      body:`<p>קודם על הדף, עם טושים: הכרטיס, וציור של החפץ ברשת של 16 על 16.</p><p>אחר כך מעתיקים את הכרטיס לכאן.</p>`,
      note:"היום נכנסים למשחק השם, המשפט, הציור, וכמה נכנסים בערימה. הכוח והמחיר נכנסים למשחק בשיעור 4, ועד אז הם שמורים בכרטיס.",
      hints:[
        "חפץ מהעולם שלכם: מה מוצאים שם? מה אוספים? במה סוחרים?",
        "המשפט מתחת לשם יכול לרמוז בשביל מה החפץ, או מה המחיר שלו.",
        "הקוד באנגלית הוא גם השם של הציור. למשל sky_shell או honey_coin: אותיות קטנות, בלי רווחים."
      ],
      visual:()=>itemCardForm(), mount:(root)=>bindItemCard(root) },

    { type:"פעילות", title:"מציירים את החפץ",
      body:`<ol><li>כותבים למעלה את הקוד של החפץ, כמו בכרטיס.</li><li>מציירים בריבוע של 16 על 16, לפי הציור שעל הדף.</li><li>לוחצים <b>לשמור את הציור</b>.</li></ol>`,
      why:"במיינקראפט כל חפץ הוא 16 על 16 משבצות. כשיש מעט משבצות, מחליטים מה הכי חשוב בצורה.",
      hints:["מתחילים מקו מתאר כהה, ואז ממלאים.","שניים עד ארבעה צבעים מספיקים. צבע בהיר אחד נותן ברק.","לחיצה ימנית בעכבר מוחקת."],
      visual:()=>pixelEditorHTML(), mount:(root, served)=>mountPixelEditor(root, served) },

    { type:"שיחה", title:"ככה בונים כל דבר בקורס",
      body:`<ol><li><b>כרטיס:</b> מחליטים מה רוצים.</li><li><b>ג׳מיני:</b> שולחים לו את החוקים, הקוד שלכם והכרטיס.</li><li><b>הדבקה:</b> מעתיקים את הקוד ש־ג׳מיני כתב, ולוחצים למעלה <b>הדבקה מג׳מיני ושחק</b>.</li><li><b>בדיקה:</b> במשחק בודקים שזה מה שרציתם.</li></ol>`,
      why:"ג׳מיני זוכר רק מה שכתוב בצ׳אט. לכן כל פעם שולחים לו את הקוד שלכם, וככה הוא לא מוחק את מה שכבר בניתם.",
      visual:()=>FLOW },

    { type:"הוראה", title:"פותחים את ג׳מיני",
      body:`<ol><li>נכנסים ל־<code>gemini.google.com</code> עם החשבון של משרד החינוך.</li><li>פותחים צ׳אט חדש.</li><li>שמים את ג׳מיני בצד אחד של המסך ואת הדף הזה בצד השני.</li></ol>`,
      note:"כדי להצמיד חלון לצד: <kbd>Win</kbd> + חץ ימינה, או <kbd>Win</kbd> + חץ שמאלה.",
      visual:()=>`<div class="split"><div>הדף הזה</div><div>ג׳מיני</div></div>` },

    { type:"פעילות", title:"שולחים לג׳מיני",
      body:`<ol><li>לוחצים למעלה על <b>להעתיק לג׳מיני</b>, ובג׳מיני לוחצים <kbd>Ctrl</kbd> + <kbd>V</kbd>.</li><li>מתחת מדביקים את הכרטיס מהמסגרת, ושולחים.</li><li>מעתיקים את הקובץ ש־ג׳מיני שולח, ולוחצים למעלה <b>הדבקה מג׳מיני ושחק</b>.</li></ol>`,
      note:"ג׳מיני כותב את הקוד, אבל את הרעיונות אתם ממציאים. אם הוא מציע שם או משפט, אומרים לו שזה שלכם.",
      visual:()=>gemPromptBox(itemCardPrompt()) },

    { type:"בדיקה", title:"בודקים במשחק",
      body:`<ol><li>נכנסים לעולם במצב יצירה.</li><li>לוחצים <kbd>E</kbd> ומוצאים את הלשונית של העולם שלכם.</li><li>בודקים מול הכרטיס: השם, המשפט, הציור, וכמה נכנסים בערימה.</li></ol>`,
      expect:"הכול כמו בכרטיס. ואם משהו שונה, זה בדיוק מה שמתקנים עכשיו.",
      stuck:[
        ["יש ריבוע סגול ושחור במקום הציור","הקוד של הציור לא זהה לקוד בכרטיס. בודקים את שניהם, אות אחרי אות."],
        ["המשחק לא נפתח והופיעה מסגרת צהובה","השגיאה כבר הועתקה. בג׳מיני לוחצים Ctrl + V ואז Enter."]
      ],
      visual:()=>`<div class="checks"><div><span class="ok"></span>השם של החפץ, כמו בכרטיס</div><div><span class="ok"></span>המשפט מתחת לשם</div><div><span class="ok"></span>הציור שלכם</div><div><span class="ok"></span>כמה נכנסים בערימה</div></div>` },

    { type:"שיחה", title:"משהו לא כמו שרציתם?",
      body:`<p>אומרים לג׳מיני בדיוק מה שונה: מה רציתם, ומה קרה במשחק. ומדביקים שוב את הקוד שלכם.</p>`,
      visual:()=>`<div class="vs"><div class="bad"><h4>״זה לא עובד״</h4><p>ג׳מיני לא יודע מה לא עובד, אז הוא מנחש.</p></div><div class="good"><h4>מה רציתם ומה קרה</h4><p>״רציתי שייכנסו 16 בערימה, ובמשחק נכנסים 64. הנה הקוד שלי:״</p></div></div>` },

    { type:"פעילות", title:"נשאר זמן? שם לעולם",
      body:`<p>רק אחרי שהחפץ שלכם במשחק.</p><ol><li>לוחצים למעלה על <b>להעתיק לג׳מיני</b>, ובג׳מיני לוחצים <kbd>Ctrl</kbd> + <kbd>V</kbd>.</li><li>מתחת כותבים את השורה מהמסגרת, עם השם מכרטיס העולם, ושולחים.</li><li>ג׳מיני שולח את הקובץ MyWorld.java. לוחצים על כפתור ההעתקה שליד הקוד.</li><li>לוחצים למעלה <b>הדבקה מג׳מיני ושחק</b>.</li></ol>`,
      expect:"במשחק, במצב יצירה, יש לשונית עם השם של העולם שלכם.",
      stuck:[
        ["ג׳מיני שואל שאלות ולא כותב קוד","עונים לו. הוא שואל כדי להבין בדיוק מה אתם רוצים."],
        ["כתוב: מה שהעתקתם זה לא קובץ שלם","בג׳מיני לוחצים על כפתור ההעתקה שליד הקוד, ולא מסמנים בעכבר."],
        ["הופיעה מסגרת צהובה","השגיאה כבר הועתקה. בג׳מיני לוחצים Ctrl + V ואז Enter."]
      ],
      visual:()=>gemPromptBox("תשנה את השם של העולם שלי ל: ") },

    { type:"סיום", title:"מסיימים",
      body:`<ul><li>מראים את החפץ למי שיושב לידכם.</li><li>סוגרים את מיינקראפט.</li><li>לוחצים למעלה על <b>דרייב</b>, ושומרים את העולם בדרייב שלכם.</li></ul>`,
      expect:"בשבוע הבא: החפץ שלכם בתלת־ממד.",
      visual:()=>`<div class="checks"><div><span class="ok"></span>החפץ שלי במשחק</div><div><span class="ok"></span>מראים למי שיושב לידכם</div><div><span class="ok"></span>העולם שלי שמור בדרייב</div></div>` }
  ],
  challenges:[
    {id:"card", lvl:"חובה", t:"כרטיס החפץ", d:"בשביל מה הוא, מה המחיר, ואיפה משיגים אותו."},
    {id:"item", lvl:"חובה", t:"החפץ שלי", d:"החפץ במשחק, עם השם, המשפט והציור שלכם."},
    {id:"world", lvl:"אתגר", t:"שם לעולם", d:"הלשונית במשחק נקראת בשם של העולם שלכם."},
    {id:"second", lvl:"אתגר", t:"חפץ שני", d:"עוד חפץ מהעולם שלכם, עם ציור משלו."},
    {id:"shade", lvl:"אתגר", t:"צל וברק", d:"בציור יש צבע כהה לצל וצבע בהיר לברק."}
  ]
};

const SLIDES2 = [
  { label:"פתיחה", html:`<div class="eye">שיעור 2 · מודים למיינקראפט</div><h1>החפץ הראשון שלכם</h1><p class="sub">היום יוצא מכאן חפץ שאתם ציירתם, בתוך המשחק.</p>`,
    notes:"0–5 דק׳. הילדים לוחצים פעמיים על הסמל Minecraft, והדף נפתח לבד. מי שלא שלח הודעה לג׳מיני בשיעור 1, עושה את זה עכשיו." },
  { label:"מה הופך חפץ למעולה?", html:`<h2>מה הופך חפץ למעולה?</h2>${itemRow(["pick","pearl","bow","apple","totem","wings","potato","dirt"])}`,
    notes:"5–35 דק׳, אחת־עשרה שקופיות. שיחה, לא הרצאה. הצבעה בהרמת יד על כל חפץ: מי לוקח אותו תמיד? מי אף פעם לא? כותבים על הלוח שתי רשימות. שואלים: מה ההבדל בין הרשימות? השקופיות הבאות הן ארבע תשובות." },
  { label:"1 · בשביל מה", html:`<div class="eye">1 מתוך 4</div><h2>בשביל מה הוא?</h2><div class="bal"><div class="r two">${itemSVG("pick")}<b>Pickaxe</b><div class="job">חוצבים איתו.</div></div><div class="r two">${itemSVG("pearl")}<b>Ender Pearl</b><div class="job">מגיעים רחוק, ברגע.</div></div><div class="r two">${itemSVG("potato")}<b>Poisonous Potato</b><div class="job">...?</div></div></div><p class="sub">חפץ בלי תפקיד נשאר בתיבה.</p>`,
    notes:"עוברים על החפצים שעל הלוח: מה עושים עם כל אחד? חפץ טוב עונה במשפט אחד. על Poisonous Potato הם ייתקעו, וזו בדיוק הנקודה." },
  { label:"1 · ארבעה תפקידים", html:`<div class="eye">1 מתוך 4</div><h2>ארבעה תפקידים לחפץ</h2><div class="rules"><div><b>כלי</b>עושים איתו משהו.<small>Pickaxe, Fishing Rod</small></div><div><b>נשק או מגן</b>נלחמים איתו.<small>Sword, Shield</small></div><div><b>אוצר</b>אוספים אותו וסוחרים בו.<small>Emerald</small></div><div><b>מפתח</b>פותח או מפעיל משהו.<small>Eye of Ender</small></div></div>`,
    notes:"כל אחד אומר: מה החפץ שלו, ואיזה מהארבעה הוא. היום הכי קל לבנות אוצר או מפתח, כי הם לא צריכים כוחות: מספיק שם, משפט, ציור, וכמה בערימה. מי שרוצה נשק: בונה היום את החפץ, והכוח שלו נכנס בשיעור 4." },
  { label:"2 · המחיר", html:`<div class="eye">2 מתוך 4</div><h2>מה מקבלים, ומה משלמים</h2><div class="bal"><div class="r">${itemSVG("pearl")}<b>Ender Pearl</b><div class="get"><small>מקבלים</small>מגיעים רחוק, ברגע.</div><div class="pay"><small>משלמים</small>נפצעים בנחיתה.</div></div><div class="r">${itemSVG("wings")}<b>Elytra</b><div class="get"><small>מקבלים</small>עפים.</div><div class="pay"><small>משלמים</small>אין שריון על החזה.</div></div><div class="r">${itemSVG("bow")}<b>Bow</b><div class="get"><small>מקבלים</small>פוגעים מרחוק.</div><div class="pay"><small>משלמים</small>כל ירייה עולה חץ.</div></div></div>`,
    notes:"מכסים את העמודה האדומה ושואלים: מה המחיר של Ender Pearl? של Elytra? הם יודעים, רק אף פעם לא קראו לזה מחיר. המסקנה: לכל חפץ חזק במיינקראפט יש מחיר. זה לא במקרה, מישהו תכנן את זה." },
  { label:"2 · ארבעה מחירים", html:`<div class="eye">2 מתוך 4</div><h2>ארבעה סוגים של מחיר</h2><div class="rules"><div><b>עולה משהו</b>חצים, אוכל, זהב.</div><div><b>פוגע בכם</b>כמו Ender Pearl.</div><div><b>מוותרים על משהו</b>Elytra, או שריון.</div><div><b>עובד רק לפעמים</b>רק בלילה. רק בגשם.</div></div><p class="sub">המחיר הוא החלק המעניין בחפץ.</p>`,
    notes:"שואלים כל אחד: מה המחיר של החפץ שלך, ואיזה סוג הוא? מי שאומר ״אין לו מחיר״: איזה מהארבעה הכי מתאים לעולם שלך? להגיד בבירור: את המחיר כותבים היום בכרטיס, והוא נכנס למשחק בשיעור 4." },
  { label:"2 · הצבעה", html:`<div class="eye">2 מתוך 4</div><h2>עם איזו חרב יותר כיף אחרי שעה?</h2><div class="ab"><div><span class="l">א</span>הורגת כל דבר במכה אחת. תמיד.</div><div class="or">או</div><div><span class="l">ב</span>חזקה מאוד, ונשברת אחרי עשר מכות.</div></div>`,
    notes:"הצבעה. רובם יבחרו א׳. שואלים: ומה קורה אחרי חמש דקות עם א׳? אין יותר סכנה, אז אין משחק. עם ב׳ צריך להחליט על מי שווה לבזבז מכה. חפץ טוב גורם לשחקן להחליט משהו." },
  { label:"3 · נדירות", html:`<div class="eye">3 מתוך 4</div><h2>כמה הוא נדיר?</h2><div class="stk"><figure>${stackPic(64,8,"#8A5A2B")}<figcaption>64<small>Dirt · בכל מקום</small></figcaption></figure><figure>${stackPic(16,4,"#1FA89A")}<figcaption>16<small>Ender Pearl · צריך לחפש</small></figcaption></figure><figure>${stackPic(1,1,"#F2C94C")}<figcaption>1<small>Totem of Undying · רק מאויב אחד</small></figcaption></figure></div><p class="sub">כמה נכנסים בערימה אחת. ככל שהחפץ נדיר יותר, המספר קטן יותר.</p>`,
    notes:"שואלים: למה מ־Ender Pearl נכנסות רק 16 בערימה? (אחרת הייתם מתעופפים בכל המפה בלי לחשוב.) ולמה מ־Totem of Undying רק אחד? המספר הזה הוא הדבר שג׳מיני מכניס למשחק כבר היום, אז כל אחד בוחר: 1, 16 או 64, ולמה." },
  { label:"3 · רק למצוא", html:`<div class="eye">3 מתוך 4</div><div class="hero1"><div class="slotpx">${itemSVG("apple")}</div><div><h2>Enchanted Golden Apple</h2><p class="quote">אי אפשר להכין אותו. רק למצוא.</p></div></div>`,
    notes:"שואלים את השאלה שעל המסך. (אף אחד לא היה שמח למצוא יהלום.) מה שקשה להשיג, שומרים לרגע הנכון. שואלים כל אחד: איפה משיגים את החפץ שלך? רק במקום אחד? רק מיצור אחד? זו השורה ״איפה משיגים אותו״ בכרטיס." },
  { label:"4 · השם", html:`<div class="eye">4 מתוך 4</div><h2>מה החפץ הזה עושה?</h2><div class="rules"><div><b>פטיש הרעם</b><small>?</small></div><div><b>מגפי ענן</b><small>?</small></div><div><b>מטבע דבש</b><small>?</small></div></div><p class="sub">אם כולם מנחשים אותו דבר, השם טוב.</p>`,
    notes:"משחק. אף אחד מהחפצים האלה לא קיים, ובכל זאת כולם ינחשו כמעט אותו דבר. אחר כך כל אחד אומר רק את שם החפץ שלו, והכיתה מנחשת מה הוא עושה. מי שניחשו אצלו לא נכון, מחליף שם." },
  { label:"4 · 16 על 16", html:`<div class="eye">4 מתוך 4</div><h2>וגם הצורה מספרת</h2><div class="z16"><div class="big">${mcPic("item_diamond_sword", pxSVG(SWORD16.map, SWORD16.pal, true))}</div><div class="side"><div><b>256 משבצות</b><br>זה כל הציור.</div><div class="real">${mcPic("item_diamond_sword", pxSVG(SWORD16.map, SWORD16.pal), "mslot")}<span>וככה רואים אותו במשחק.</span></div></div></div><p class="sub">רק הצורה הכי חשובה נכנסת. קו מתאר כהה, ושניים עד ארבעה צבעים.</p>`,
    notes:"שואלים: איך יודעים שזו חרב, גם כשהיא קטנטנה? (הצורה: להב ארוך, ידית, ומשהו לרוחב.) סופרים יחד את הצבעים בציור: ארבעה. בדף שלהם יש רשת כזאת בדיוק, של 16 על 16." },
  { label:"אז מה חפץ צריך?", html:`<h2>אז מה חפץ צריך?</h2><div class="rules"><div><span class="n">1</span><b>תפקיד</b>בשביל מה הוא?</div><div><span class="n">2</span><b>מחיר</b>מה משלמים עליו?</div><div><span class="n">3</span><b>נדירות</b>איפה משיגים, וכמה בערימה?</div><div><span class="n">4</span><b>שם וצורה</b>שמספרים מה הוא עושה.</div></div><p class="sub">אלה השורות בכרטיס החפץ.</p>`,
    notes:"חצי דקה, ועוברים לדף. להזכיר: היום נכנסים למשחק השם, המשפט, הציור, וכמה בערימה. התפקיד והמחיר נשארים בכרטיס עד שיעור 4." },
  { label:"כרטיס החפץ", html:`<h2>כרטיס החפץ</h2><div class="wcard">
      <div class="ln">שם החפץ</div>
      <div class="ln">בשביל מה הוא?</div>
      <div class="ln">המחיר שלו</div>
      <div class="ln">איפה משיגים אותו, וכמה נכנסים בערימה</div>
      <div class="ln">המשפט שמופיע מתחת לשם</div></div><p class="sub">15 דקות, על הדף, עם טושים: כרטיס וציור</p>`,
    notes:"35–50 דק׳. מחלקים דפים וטושים. קודם הכרטיס, אחר כך הציור ברשת של 16 על 16. מסתובבים, ולכל ילד שאלה אחת: ״ומה המחיר?״" },
  { label:"ציור 16 על 16", html:`<h2>ציור של 16 על 16</h2><ul class="big"><li>מתחילים מקו מתאר כהה</li><li>שניים עד ארבעה צבעים</li><li>צבע בהיר אחד לברק</li><li>מה שלא צובעים, נשאר שקוף</li></ul>`,
    notes:"להשאיר על המסך בזמן שהם מציירים על הדף. כדאי להראות חפץ של מיינקראפט מוגדל, למשל יהלום: כמה מעט צבעים יש בו." },
  { label:"ככה בונים", html:`<h2>ככה בונים כל דבר בקורס</h2>${FLOW}`,
    notes:"50–57 דק׳, יחד עם השקופית הבאה. אותם ארבעה צעדים בכל השיעורים." },
  { label:"הדגמה", html:`<h2>הדגמה</h2><ol class="big"><li>כרטיס</li><li>להעתיק לג׳מיני, ובג׳מיני <kbd>Ctrl</kbd> + <kbd>V</kbd></li><li>מתחת: הכרטיס</li><li>הדבקה מג׳מיני ושחק</li></ol>`,
    notes:"בונים חפץ אחד על המקרן, מהר, מהכרטיס ועד המשחק. אם יוצאת שגיאה, מצוין: מראים את המסגרת הצהובה ואת Ctrl+V בג׳מיני." },
  { label:"עכשיו אתם", html:`<h2>עכשיו אתם</h2><ol class="big"><li>מעתיקים את הכרטיס מהדף למחשב</li><li>מציירים בעורך, לפי הדף</li><li>ג׳מיני</li><li>בודקים במשחק</li><li>נשאר זמן? שם לעולם</li></ol>`,
    notes:"57–85 דק׳. מסתובבים בכיתה. מי שתקוע: קודם שואל את מי שיושב לידו. מי שלא מספיק היום, ממשיך בתחילת שיעור 3." },
  { label:"משהו לא עבד?", html:`<h2>משהו לא עבד?</h2><div class="rules">
      <div><b>מסגרת צהובה</b>השגיאה כבר הועתקה. בג׳מיני: Ctrl + V.</div>
      <div><b>לא מה שרציתם</b>אומרים לג׳מיני מה רציתם ומה קרה.</div>
      <div><b>הכול השתבש</b>לוחצים ביטול ההדבקה.</div></div>`,
    notes:"להשאיר על המסך בזמן העבודה." },
  { label:"סיום", html:`<h2>בשבוע הבא</h2><p class="quote">החפץ שלכם בתלת־ממד</p><ul class="big"><li>מראים למי שיושב לידכם</li><li>סוגרים את מיינקראפט</li><li>דרייב ← שומרים את העולם</li></ul>`,
    notes:"85–90 דק׳. שניים או שלושה ילדים מראים את החפץ שלהם על המקרן." }
];

/* ===== teacher ===== */
const GEM_TEXT = `RULES FOR THIS CHAT. Follow them for every answer in this chat.
You are the Mod Helper for a class of 11-13-year-olds in Israel who are each building their own Minecraft mod. Their teacher is Ben. Always answer in simple, short Hebrew. Code, file names and paths stay in English.

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
const LESSONS = { 1: L1, 2: L2 };
const DECKS = { 1: SLIDES, 2: SLIDES2 };
window.HUB = { CSS, injectStyle, FONT_HREF, GEM_LINK, LS, esc, UNITS, MOBS, silSVG, EQ, ROLES, VAGUE_SPECIFIC,
  gemPromptBox, L1, worldCardForm, bindWorldCard, bindCopy, bindSil, applyReveal, SLIDES, GEM_TEXT, TEACHER_CHECK,
  LESSONS, DECKS };
})();
