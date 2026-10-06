/* Logic blocks for the studio: what an item DOES. Kids drag Hebrew blocks ("when you right-click with it → if it's
   night → lightning on the creature"); the studio turns them into a small program (JSON) that Kit.java's StudioPower
   runs inside the game. No code is written, so a kid's blocks can't break the build.
   Uses Blockly (hub/blockly/, Apache 2.0). Block ideas follow MCreator's procedure blocks (GPL-3.0), simplified for
   11-13 year olds. Loaded by index.html after studio.js. */
(function(){
"use strict";
const H = window.HUB;
const en = () => H.LS.get("lang", "he") === "en";

/* ---------- lists for the dropdowns: [Hebrew, English, id in the game] ---------- */
const WHO = [["אני","me","me"],["היצור","the creature","target"]];
// Who it happens to, with the Hebrew preposition each block needs: לי / ליצור, אותי / את היצור...
const who = (he1, he2, en1, en2) => [[he1, en1, "me"], [he2, en2, "target"]];
const EFFECTS = [["מהירות","Speed","speed"],["איטיות","Slowness","slowness"],["קפיצה גבוהה","Jump Boost","jump_boost"],["כוח","Strength","strength"],
  ["חולשה","Weakness","weakness"],["התחדשות","Regeneration","regeneration"],["עמידות","Resistance","resistance"],["עמידות לאש","Fire Resistance","fire_resistance"],
  ["נשימה במים","Water Breathing","water_breathing"],["היעלמות","Invisibility","invisibility"],["ראיית לילה","Night Vision","night_vision"],["זוהר","Glowing","glowing"],
  ["ריחוף","Levitation","levitation"],["נפילה איטית","Slow Falling","slow_falling"],["רעל","Poison","poison"],["עיוורון","Blindness","blindness"],
  ["סחרחורת","Nausea","nausea"],["רעב","Hunger","hunger"],["חציבה מהירה","Haste","haste"],["לבבות זהב","Absorption","absorption"],["Wither","Wither","wither"]];
const MOBS = [["Zombie","Zombie","zombie"],["Skeleton","Skeleton","skeleton"],["Creeper","Creeper","creeper"],["Spider","Spider","spider"],["Enderman","Enderman","enderman"],
  ["Slime","Slime","slime"],["Blaze","Blaze","blaze"],["Phantom","Phantom","phantom"],["Wolf","Wolf","wolf"],["Cat","Cat","cat"],["Fox","Fox","fox"],["Bee","Bee","bee"],
  ["Cow","Cow","cow"],["Pig","Pig","pig"],["Chicken","Chicken","chicken"],["Sheep","Sheep","sheep"],["Horse","Horse","horse"],["Parrot","Parrot","parrot"],
  ["Axolotl","Axolotl","axolotl"],["Frog","Frog","frog"],["Allay","Allay","allay"],["Iron Golem","Iron Golem","iron_golem"],["Snow Golem","Snow Golem","snow_golem"],
  ["Villager","Villager","villager"],["Bat","Bat","bat"]];
const SOUNDS = [["עלייה ברמה","Level up","entity.player.levelup"],["איסוף XP","XP orb","entity.experience_orb.pickup"],["רעם","Thunder","entity.lightning_bolt.thunder"],
  ["פיצוץ","Explosion","entity.generic.explode"],["פעמון","Bell","block.note_block.bell"],["שיגור","Teleport","entity.enderman.teleport"],["צרחה","Scream","entity.ghast.scream"],
  ["זיקוק","Firework","entity.firework_rocket.launch"],["יללה","Howl","entity.wolf.howl"],["מיאו","Meow","entity.cat.ambient"],["סדן","Anvil","block.anvil.land"],["נהמת דרקון","Dragon","entity.ender_dragon.growl"]];
const DIMS = [["Overworld","Overworld","overworld"],["Nether","Nether","nether"],["End","End","end"]];
const opts = list => () => list.map(x => [en() ? x[1] : x[0], x[2]]);
const num = (name, value, min, max) => ({ type:"field_number", name, value, min, max, precision: 1 });

/* ---------- the blocks: [type, Hebrew, English, args, kind] ---------- */
const DEFS = [
  // when (triggers): the hats everything hangs from
  ["tr_use","כשלוחצים לחיצה ימנית עם החפץ %1","When you right-click with the item %1",[{type:"input_statement",name:"DO"}],"when"],
  ["tr_hit","כשמכים יצור עם החפץ %1","When you hit a creature with the item %1",[{type:"input_statement",name:"DO"}],"when"],
  ["tr_usemob","כשלוחצים לחיצה ימנית על יצור %1","When you right-click a creature %1",[{type:"input_statement",name:"DO"}],"when"],
  ["tr_hold","כל שנייה שהחפץ ביד %1","Every second the item is in your hand %1",[{type:"input_statement",name:"DO"}],"when"],
  // do (actions)
  ["a_effect","לתת %2 %1 למשך %3 שניות, בעוצמה %4","Give %1 %2 for %3 seconds, strength %4",
    [{type:"field_dropdown",name:"E",options:opts(EFFECTS)},{type:"field_dropdown",name:"WHO",options:opts(who("לי","ליצור","to me","to the creature"))},num("S",5,1,120),num("L",1,1,5)],"do"],
  ["a_heal","לרפא %1 ב־%2 לבבות","Heal %1 by %2 hearts",[{type:"field_dropdown",name:"WHO",options:opts(who("אותי","את היצור","me","the creature"))},num("N",2,1,20)],"do"],
  ["a_damage","להוריד %1 %2 לבבות","Take %2 hearts from %1",[{type:"field_dropdown",name:"WHO",options:opts(who("לי","ליצור","me","the creature"))},num("N",2,1,25)],"do"],
  ["a_fire","להצית %1 ל־%2 שניות","Set %1 on fire for %2 seconds",[{type:"field_dropdown",name:"WHO",options:opts(who("אותי","את היצור","me","the creature"))},num("S",3,1,30)],"do"],
  ["a_lightning","ברק %1","Lightning %1",[{type:"field_dropdown",name:"WHO",options:opts(who("עליי","על היצור","on me","on the creature"))}],"do"],
  ["a_explode","פיצוץ %1 בעוצמה %2, הורס קוביות %3","Explosion %1, power %2, breaks blocks %3",
    [{type:"field_dropdown",name:"WHO",options:opts(who("לידי","ליד היצור","next to me","next to the creature"))},num("P",2,1,6),{type:"field_checkbox",name:"BREAK",checked:false}],"do"],
  ["a_launch","להקפיץ %1 למעלה בעוצמה %2","Launch %1 up, power %2",[{type:"field_dropdown",name:"WHO",options:opts(who("אותי","את היצור","me","the creature"))},num("P",1,1,5)],"do"],
  ["a_push","להדוף %1 קדימה בעוצמה %2","Push %1 forward, power %2",[{type:"field_dropdown",name:"WHO",options:opts(who("אותי","את היצור","me","the creature"))},num("P",1,1,5)],"do"],
  ["a_tp","לקפוץ %1 קוביות קדימה","Jump %1 blocks forward",[num("N",8,1,30)],"do"],
  ["a_spawn","לזמן %1 %2, כמות: %3","Summon %1 %2, how many: %3",[{type:"field_dropdown",name:"M",options:opts(MOBS)},{type:"field_dropdown",name:"WHO",options:opts(who("לידי","ליד היצור","next to me","next to the creature"))},num("N",1,1,5)],"do"],
  ["a_sound","להשמיע צליל: %1","Play a sound: %1",[{type:"field_dropdown",name:"SND",options:opts(SOUNDS)}],"do"],
  ["a_msg","לכתוב על המסך %1","Show on screen %1",[{type:"field_input",name:"T",text:"!"}],"do"],
  // price
  ["p_cooldown","החפץ נח %1 שניות","The item rests %1 seconds",[num("S",5,1,120)],"price"],
  ["p_consume","החפץ נגמר: אחד יורד מהערימה","The item is used up: one less in the stack",[],"price"],
  ["p_hunger","האוכל שלי יורד ב־%1","My food goes down by %1",[num("N",2,1,20)],"price"],
  // if, repeat
  ["c_if","אם %1 אז %2","If %1 then %2",[{type:"input_value",name:"C",check:"Boolean"},{type:"input_statement",name:"DO"}],"if"],
  ["c_ifelse","אם %1 אז %2 אחרת %3","If %1 then %2 otherwise %3",[{type:"input_value",name:"C",check:"Boolean"},{type:"input_statement",name:"DO"},{type:"input_statement",name:"ELSE"}],"if"],
  ["c_repeat","לחזור %1 פעמים %2","Repeat %1 times %2",[num("N",3,1,10),{type:"input_statement",name:"DO"}],"if"],
  // questions (conditions)
  ["q_night","לילה","it's night",[],"q"], ["q_day","יום","it's day",[],"q"], ["q_rain","יורד גשם","it's raining",[],"q"],
  ["q_sneak","Shift לחוץ","Shift is held",[],"q"],
  ["q_chance","בסיכוי של %1 אחוז","with a %1 percent chance",[num("P",50,1,100)],"q"],
  ["q_health","יש לי פחות מ־%1 לבבות","I have less than %1 hearts",[num("N",5,1,10)],"q"],
  ["q_target","היצור הוא %1","the creature is %1",[{type:"field_dropdown",name:"M",options:opts(MOBS)}],"q"],
  ["q_dim","אני ב־%1","I'm in the %1",[{type:"field_dropdown",name:"D",options:opts(DIMS)}],"q"],
  ["q_and","%1 וגם %2","%1 and %2",[{type:"input_value",name:"A",check:"Boolean"},{type:"input_value",name:"B",check:"Boolean"}],"q"],
  ["q_or","%1 או %2","%1 or %2",[{type:"input_value",name:"A",check:"Boolean"},{type:"input_value",name:"B",check:"Boolean"}],"q"],
  ["q_not","לא %1","not %1",[{type:"input_value",name:"A",check:"Boolean"}],"q"]
];
const KIND = { when:{ colour:35 }, do:{ colour:205 }, price:{ colour:0 }, if:{ colour:285 }, q:{ colour:125 } };
const CATS = [["when","מתי","When"],["do","עושים","Do"],["price","מחיר","Price"],["if","אם וחזרה","If & repeat"],["q","שאלות","Questions"]];

function defineAll(){
  const B = window.Blockly; if (!B) return false;
  DEFS.forEach(([type, he, enText, args, kind]) => {
    const j = { type, message0: en() ? enText : he, args0: args, colour: KIND[kind].colour, inputsInline: true };
    if (kind === "when") j.inputsInline = false;          // a hat: nothing above or below it
    else if (kind === "q") j.output = "Boolean";
    else { j.previousStatement = null; j.nextStatement = null; }
    if (type === "c_if" || type === "c_ifelse" || type === "c_repeat") j.inputsInline = false;
    B.Blocks[type] = { init(){ this.jsonInit(j); if (kind === "when") this.hat = "cap"; } };
  });
  return true;
}
function toolbox(){
  return { kind:"categoryToolbox", contents: CATS.map(([k, he, enT]) => ({ kind:"category", name: en() ? enT : he, colour: String(KIND[k].colour),
    contents: DEFS.filter(d => d[4] === k).map(d => ({ kind:"block", type:d[0] })) })) };
}

/* ---------- blocks -> program (JSON) for StudioPower in Kit.java ---------- */
function cond(b){
  if (!b) return null;
  const f = n => b.getFieldValue(n), v = n => cond(b.getInputTargetBlock(n));
  switch (b.type){
    case "q_night": return { c:"night" }; case "q_day": return { c:"day" }; case "q_rain": return { c:"rain" }; case "q_sneak": return { c:"sneak" };
    case "q_chance": return { c:"chance", p:+f("P") }; case "q_health": return { c:"health", n:+f("N") };
    case "q_target": return { c:"target", m:f("M") }; case "q_dim": return { c:"dim", d:f("D") };
    case "q_and": return { and:[v("A"), v("B")] }; case "q_or": return { or:[v("A"), v("B")] }; case "q_not": return { not:v("A") };
  }
  return null;
}
function stmts(b){
  const out = [];
  for (; b; b = b.getNextBlock()){
    if (!b.isEnabled()) continue;
    const f = n => b.getFieldValue(n);
    const s = { a: b.type.replace(/^[ap]_/, "") };
    switch (b.type){
      case "a_effect": Object.assign(s, { e:f("E"), who:f("WHO"), s:+f("S"), l:+f("L") }); break;
      case "a_heal": case "a_damage": Object.assign(s, { who:f("WHO"), n:+f("N") }); break;
      case "a_fire": Object.assign(s, { who:f("WHO"), s:+f("S") }); break;
      case "a_lightning": s.who = f("WHO"); break;
      case "a_explode": Object.assign(s, { who:f("WHO"), p:+f("P"), brk: f("BREAK") === "TRUE" }); break;
      case "a_launch": case "a_push": Object.assign(s, { who:f("WHO"), p:+f("P") }); break;
      case "a_tp": s.n = +f("N"); break;
      case "a_spawn": Object.assign(s, { m:f("M"), who:f("WHO"), n:+f("N") }); break;
      case "a_sound": s.snd = f("SND"); break;
      case "a_msg": s.t = String(f("T") || "").slice(0, 80); break;
      case "p_cooldown": s.s = +f("S"); break;
      case "p_consume": break;
      case "p_hunger": s.n = +f("N"); break;
      case "c_if": out.push({ if: cond(b.getInputTargetBlock("C")), then: stmts(b.getInputTargetBlock("DO")) }); continue;
      case "c_ifelse": out.push({ if: cond(b.getInputTargetBlock("C")), then: stmts(b.getInputTargetBlock("DO")), else: stmts(b.getInputTargetBlock("ELSE")) }); continue;
      case "c_repeat": out.push({ repeat: +f("N"), do: stmts(b.getInputTargetBlock("DO")) }); continue;
      default: continue;
    }
    out.push(s);
  }
  return out;
}
function compile(ws){
  const on = {};
  ws.getTopBlocks(true).forEach(b => {
    const k = { tr_use:"use", tr_hit:"hit", tr_usemob:"use_mob", tr_hold:"hold" }[b.type];
    if (k && b.isEnabled()) on[k] = (on[k] || []).concat(stmts(b.getInputTargetBlock("DO")));
  });
  Object.keys(on).forEach(k => { if (!on[k].length) delete on[k]; });
  return Object.keys(on).length ? { on } : null;
}

/* ---------- the editor inside the studio ---------- */
let ws = null, heMsg = null;
function setLang(cb){
  const B = window.Blockly;
  if (!heMsg) heMsg = Object.assign({}, B.Msg);
  if (!en()){ Object.assign(B.Msg, heMsg); return cb(); }
  if (window.__blocklyEn){ Object.assign(B.Msg, window.__blocklyEn); return cb(); }
  const s = document.createElement("script"); s.src = "blockly/msg_en.js";
  s.onload = () => { window.__blocklyEn = Object.assign({}, B.Msg); cb(); }; s.onerror = cb; document.head.appendChild(s);
}
function mount(div, item, onChange){
  const B = window.Blockly;
  if (!B){ div.innerHTML = `<p class="st-noblk">${en() ? "The block editor didn't load. Open the page from Minecraft in the Start menu." : "עורך הבלוקים לא נטען. פותחים את הדף מ־Minecraft בתפריט Start."}</p>`; return; }
  setLang(() => {
    defineAll();
    if (ws){ try { ws.dispose(); } catch(e){} ws = null; }
    ws = B.inject(div, { toolbox: toolbox(), rtl: !en(), media: "blockly/media/", sounds: false, trashcan: true,
      zoom: { controls: true, wheel: false, startScale: 0.85 }, move: { scrollbars: true, drag: true, wheel: true }, renderer: "zelos" });
    if (item.blocks){ try { B.serialization.workspaces.load(item.blocks, ws); } catch(e){} }
    item.power = compile(ws);   // the program always comes from the blocks on screen
    let t = null;
    ws.addChangeListener(e => {
      if (e.isUiEvent) return;
      clearTimeout(t);
      t = setTimeout(() => { item.blocks = B.serialization.workspaces.save(ws); item.power = compile(ws); onChange(); }, 400);
    });
  });
}
function unmount(){ if (ws){ try { ws.dispose(); } catch(e){} ws = null; } }
/* ---------- a program back into blocks (for Gemini's improved version) ---------- */
const ACT = { effect:"a_effect", heal:"a_heal", damage:"a_damage", fire:"a_fire", lightning:"a_lightning", explode:"a_explode", launch:"a_launch",
  push:"a_push", tp:"a_tp", spawn:"a_spawn", sound:"a_sound", msg:"a_msg", cooldown:"p_cooldown", consume:"p_consume", hunger:"p_hunger" };
const FIELDMAP = { a_effect:{E:"e",WHO:"who",S:"s",L:"l"}, a_heal:{WHO:"who",N:"n"}, a_damage:{WHO:"who",N:"n"}, a_fire:{WHO:"who",S:"s"}, a_lightning:{WHO:"who"},
  a_explode:{WHO:"who",P:"p",BREAK:"brk"}, a_launch:{WHO:"who",P:"p"}, a_push:{WHO:"who",P:"p"}, a_tp:{N:"n"}, a_spawn:{M:"m",WHO:"who",N:"n"},
  a_sound:{SND:"snd"}, a_msg:{T:"t"}, p_cooldown:{S:"s"}, p_consume:{}, p_hunger:{N:"n"} };
const LISTS = { E:EFFECTS, WHO:WHO, M:MOBS, SND:SOUNDS, D:DIMS };
const RANGE = { S:[1,120], L:[1,5], N:[1,30], P:[1,100] };
function defOf(type){ return DEFS.find(d => d[0] === type); }
function fieldVal(type, f, v){
  const def = defOf(type), arg = def && def[3].find(a => a.name === f);
  if (!arg) return null;
  if (arg.type === "field_dropdown") return arg.options().some(x => x[1] === v) ? v : null;
  if (arg.type === "field_number"){ const n = Math.round(Number(v)); if (!isFinite(n)) return null; return Math.max(arg.min, Math.min(arg.max, n)); }
  if (arg.type === "field_checkbox") return v === true || v === "TRUE" ? "TRUE" : "FALSE";
  if (arg.type === "field_input") return String(v == null ? "" : v).slice(0, 80);
  return null;
}
// Checks a program from outside (Gemini) and turns it into blocks. Returns {blocks} or {error}.
function condBlock(c, depth){
  if (!c || typeof c !== "object" || depth > 8) throw "cond";
  const two = (type, list) => { if (!Array.isArray(list) || list.length < 2) throw "cond";
    let b = { type, inputs:{ A:{ block: condBlock(list[0], depth+1) }, B:{ block: condBlock(list[1], depth+1) } } };
    for (let i = 2; i < list.length; i++) b = { type, inputs:{ A:{ block:b }, B:{ block: condBlock(list[i], depth+1) } } };
    return b; };
  if (c.and) return two("q_and", c.and);
  if (c.or) return two("q_or", c.or);
  if (c.not) return { type:"q_not", inputs:{ A:{ block: condBlock(c.not, depth+1) } } };
  const simple = { night:"q_night", day:"q_day", rain:"q_rain", sneak:"q_sneak" }[c.c];
  if (simple) return { type: simple };
  if (c.c === "chance"){ const P = fieldVal("q_chance", "P", c.p); if (P == null) throw "cond"; return { type:"q_chance", fields:{ P } }; }
  if (c.c === "health"){ const N = fieldVal("q_health", "N", c.n); if (N == null) throw "cond"; return { type:"q_health", fields:{ N } }; }
  if (c.c === "target"){ const M = fieldVal("q_target", "M", c.m); if (M == null) throw "mob"; return { type:"q_target", fields:{ M } }; }
  if (c.c === "dim"){ const D = fieldVal("q_dim", "D", c.d); if (D == null) throw "cond"; return { type:"q_dim", fields:{ D } }; }
  throw "cond";
}
function chain(list, depth){
  if (!Array.isArray(list)) return null;
  if (depth > 6) throw "deep";
  const blocks = list.map(s => {
    if (!s || typeof s !== "object") throw "step";
    if (s.if){ const b = { type: s.else && s.else.length ? "c_ifelse" : "c_if", inputs:{ C:{ block: condBlock(s.if, 0) } } };
      const t = chain(s.then, depth+1); if (t) b.inputs.DO = { block:t };
      if (b.type === "c_ifelse"){ const e = chain(s.else, depth+1); if (e) b.inputs.ELSE = { block:e }; }
      return b; }
    if (s.repeat !== undefined){ const b = { type:"c_repeat", fields:{ N: fieldVal("c_repeat", "N", s.repeat) || 1 } }; const d = chain(s.do, depth+1); if (d) b.inputs = { DO:{ block:d } }; return b; }
    const type = ACT[s.a]; if (!type) throw "act:" + s.a;
    const fields = {};
    for (const [F, key] of Object.entries(FIELDMAP[type])){
      const v = fieldVal(type, F, s[key] !== undefined ? s[key] : (F === "WHO" ? "me" : defOf(type)[3].find(a => a.name === F).value));
      if (v == null) throw (F === "M" ? "mob" : F === "E" ? "effect" : F === "SND" ? "sound" : "field") + ":" + s[key];
      fields[F] = v;
    }
    return { type, fields };
  });
  for (let i = blocks.length - 2; i >= 0; i--) blocks[i].next = { block: blocks[i+1] };
  return blocks[0] || null;
}
function toBlocks(prog){
  try {
    if (!prog || typeof prog !== "object" || !prog.on || typeof prog.on !== "object") return { error:"shape" };
    const tops = []; let y = 20;
    [["use","tr_use"],["hit","tr_hit"],["use_mob","tr_usemob"],["hold","tr_hold"]].forEach(([k, type]) => {
      if (!Array.isArray(prog.on[k]) || !prog.on[k].length) return;
      const b = { type, x:20, y }; const c = chain(prog.on[k], 0); if (c) b.inputs = { DO:{ block:c } };
      tops.push(b); y += 60 + 50 * JSON.stringify(c).split('"type"').length;
    });
    if (!tops.length) return { error:"empty" };
    return { blocks:{ blocks:{ languageVersion:0, blocks: tops } } };
  } catch(e){ return { error: String(e) }; }
}
/* ---------- blocks as readable lines (for the "before / after" view and for Gemini) ---------- */
function label(type, f, v){
  const arg = defOf(type)[3].find(a => a.name === f);
  if (arg && arg.type === "field_dropdown"){ const x = arg.options().find(x => x[1] === v); return x ? x[0] : v; }
  if (f === "BREAK") return v === "TRUE" ? (en() ? "yes" : "כן") : (en() ? "no" : "לא");
  return String(v);
}
function describe(b, depth){
  const out = [];
  for (; b; b = b.next && b.next.block){
    const def = defOf(b.type); if (!def) continue;
    let text = en() ? def[2] : def[1]; const subs = [];
    const firstStmt = def[3].findIndex(a => a.type === "input_statement");
    if (firstStmt >= 0) text = text.slice(0, text.indexOf("%" + (firstStmt + 1)));
    def[3].forEach((a, i) => {
      let r = "";
      if (a.type === "input_statement"){ if (b.inputs && b.inputs[a.name]) subs.push([a.name, b.inputs[a.name].block]); }
      else if (a.type === "input_value") r = b.inputs && b.inputs[a.name] ? "(" + describe(b.inputs[a.name].block, 0).join(" ") + ")" : "( )";
      else r = label(b.type, a.name, b.fields ? b.fields[a.name] : "");
      text = text.replace("%" + (i + 1), r);
    });
    out.push("  ".repeat(depth) + text.replace(/\s+/g, " ").trim());
    subs.forEach(([name, sb]) => { if (name === "ELSE") out.push("  ".repeat(depth) + (en() ? "otherwise:" : "אחרת:")); out.push(...describe(sb, depth + 1)); });
  }
  return out;
}
function readable(prog){ const r = toBlocks(prog); if (r.error) return []; return r.blocks.blocks.blocks.flatMap(b => describe(b, 0)); }
function loadInto(item, prog){ const r = toBlocks(prog); if (r.error) return r; item.blocks = r.blocks; item.power = prog; return { ok:true }; }
/* ---------- quick checks, without Gemini: the logic mistakes kids make most ---------- */
function lint(prog){
  const out = [], seen = new Set(), add = t => { if (!seen.has(t)){ seen.add(t); out.push(t); } };
  if (!prog || !prog.on) return out;
  const E = en();
  const strong = new Set(["lightning","explode","spawn","tp","fire"]);
  let anyPrice = false, anyStrong = false;
  const walk = (list, trig) => (list || []).forEach(s => {
    if (!s) return;
    if (s.if){ if (!(s.then || []).length) add(E ? "An \"if\" has nothing inside it." : "יש ״אם״ בלי שום דבר בתוכו."); cond(s.if, trig); walk(s.then, trig); walk(s.else, trig); return; }
    if (s.repeat){ if (!(s.do || []).length) add(E ? "A \"repeat\" has nothing inside it." : "יש ״לחזור״ בלי שום דבר בתוכו."); walk(s.do, trig); return; }
    if (s.who === "target" && trig !== "hit" && trig !== "use_mob") add(E ? "A block points at \"the creature\", but only \"When you hit a creature\" and \"When you right-click a creature\" have one. Elsewhere it does nothing." : "יש בלוק שמכוון אל ״היצור״, אבל יש יצור רק ב״כשמכים יצור״ וב״כשלוחצים לחיצה ימנית על יצור״. בכל מקום אחר הבלוק לא עושה כלום.");
    if (["cooldown","consume","hunger"].includes(s.a)) anyPrice = true;
    if (strong.has(s.a) || (s.a === "damage" && s.who === "target") || (s.a === "effect" && s.l >= 3)) anyStrong = true;
    if (trig === "hold" && strong.has(s.a)) add(E ? "Under \"Every second\", this happens every second as long as you hold it." : "ב״כל שנייה״ זה יקרה כל שנייה, כל עוד מחזיקים את החפץ.");
    if (s.a === "explode" && s.who === "me") add(E ? "An explosion next to you hurts you too." : "פיצוץ לידכם פוגע גם בכם.");
  });
  const cond = (c, trig) => { if (!c) return add(E ? "An \"if\" has no question in it." : "יש ״אם״ בלי שאלה.");
    if (c.c === "target" && trig !== "hit" && trig !== "use_mob") add(E ? "\"The creature is...\" only works when there's a creature: \"When you hit a creature\" or \"When you right-click a creature\"." : "״היצור הוא...״ עובד רק כשיש יצור: ב״כשמכים יצור״ או ב״כשלוחצים לחיצה ימנית על יצור״.");
    (c.and || c.or || []).forEach(x => cond(x, trig)); if (c.not) cond(c.not, trig); };
  Object.keys(prog.on).forEach(k => walk(prog.on[k], k));
  if (anyStrong && !anyPrice) add(E ? "A strong power with no price. What stops a player from using it all the time?" : "כוח חזק בלי מחיר. מה ימנע מהשחקן להשתמש בו כל הזמן?");
  return out;
}
window.STUDIO_BLOCKS = { mount, unmount, compile, DEFS, toBlocks, readable, loadInto, LISTS, lint };
})();
