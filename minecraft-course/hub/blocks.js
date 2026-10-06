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
const WHO = [["אני","me","me"],["היצור שפגעתי בו","the creature I hit","target"]];
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
const SOUNDS = [["רמה חדשה","Level up","entity.player.levelup"],["אבן קסם","Magic orb","entity.experience_orb.pickup"],["רעם","Thunder","entity.lightning_bolt.thunder"],
  ["פיצוץ","Explosion","entity.generic.explode"],["פעמון","Bell","block.note_block.bell"],["השתגרות","Teleport","entity.enderman.teleport"],["צרחה","Scream","entity.ghast.scream"],
  ["זיקוק","Firework","entity.firework_rocket.launch"],["יללה","Howl","entity.wolf.howl"],["מיאו","Meow","entity.cat.ambient"],["סדן","Anvil","block.anvil.land"],["נשיפת דרקון","Dragon","entity.ender_dragon.growl"]];
const DIMS = [["Overworld","Overworld","overworld"],["Nether","Nether","nether"],["End","End","end"]];
const opts = list => () => list.map(x => [en() ? x[1] : x[0], x[2]]);
const num = (name, value, min, max) => ({ type:"field_number", name, value, min, max, precision: 1 });

/* ---------- the blocks: [type, Hebrew, English, args, kind] ---------- */
const DEFS = [
  // when (triggers): the hats everything hangs from
  ["tr_use","כשלוחצים לחיצה ימנית עם החפץ %1","When you right-click with the item %1",[{type:"input_statement",name:"DO"}],"when"],
  ["tr_hit","כשמכים יצור עם החפץ %1","When you hit a creature with the item %1",[{type:"input_statement",name:"DO"}],"when"],
  ["tr_hold","כל שנייה שהחפץ ביד %1","Every second the item is in your hand %1",[{type:"input_statement",name:"DO"}],"when"],
  // do (actions)
  ["a_effect","תן %1 ל%2 למשך %3 שניות, בעוצמה %4","Give %1 to %2 for %3 seconds, strength %4",
    [{type:"field_dropdown",name:"E",options:opts(EFFECTS)},{type:"field_dropdown",name:"WHO",options:opts(WHO)},num("S",5,1,120),num("L",1,1,5)],"do"],
  ["a_heal","רפא את %1 ב־%2 לבבות","Heal %1 by %2 hearts",[{type:"field_dropdown",name:"WHO",options:opts(WHO)},num("N",2,1,20)],"do"],
  ["a_damage","פגע ב%1 ב־%2 לבבות","Hurt %1 by %2 hearts",[{type:"field_dropdown",name:"WHO",options:opts(WHO)},num("N",2,1,25)],"do"],
  ["a_fire","הצת את %1 ל־%2 שניות","Set %1 on fire for %2 seconds",[{type:"field_dropdown",name:"WHO",options:opts(WHO)},num("S",3,1,30)],"do"],
  ["a_lightning","ברק על %1","Lightning on %1",[{type:"field_dropdown",name:"WHO",options:opts(WHO)}],"do"],
  ["a_explode","פיצוץ ליד %1 בעוצמה %2, הורס קוביות %3","Explosion at %1, power %2, breaks blocks %3",
    [{type:"field_dropdown",name:"WHO",options:opts(WHO)},num("P",2,1,6),{type:"field_checkbox",name:"BREAK",checked:false}],"do"],
  ["a_launch","הקפץ את %1 למעלה בעוצמה %2","Launch %1 up, power %2",[{type:"field_dropdown",name:"WHO",options:opts(WHO)},num("P",1,1,5)],"do"],
  ["a_push","הדוף את %1 קדימה בעוצמה %2","Push %1 forward, power %2",[{type:"field_dropdown",name:"WHO",options:opts(WHO)},num("P",1,1,5)],"do"],
  ["a_tp","קפוץ %1 קוביות קדימה","Jump %1 blocks forward",[num("N",8,1,30)],"do"],
  ["a_spawn","זמן %1 ליד %2, %3 פעמים","Summon %1 next to %2, %3 times",[{type:"field_dropdown",name:"M",options:opts(MOBS)},{type:"field_dropdown",name:"WHO",options:opts(WHO)},num("N",1,1,5)],"do"],
  ["a_sound","השמע צליל: %1","Play a sound: %1",[{type:"field_dropdown",name:"SND",options:opts(SOUNDS)}],"do"],
  ["a_msg","כתוב על המסך %1","Show on screen %1",[{type:"field_input",name:"T",text:"!"}],"do"],
  // price
  ["p_cooldown","החפץ צריך לנוח %1 שניות","The item needs to rest %1 seconds",[num("S",5,1,120)],"price"],
  ["p_consume","החפץ נגמר: אחד יורד מהערימה","The item is used up: one less in the stack",[],"price"],
  ["p_hunger","אני מאבד %1 אוכל","I lose %1 food",[num("N",2,1,20)],"price"],
  // if, repeat
  ["c_if","אם %1 אז %2","If %1 then %2",[{type:"input_value",name:"C",check:"Boolean"},{type:"input_statement",name:"DO"}],"if"],
  ["c_ifelse","אם %1 אז %2 אחרת %3","If %1 then %2 otherwise %3",[{type:"input_value",name:"C",check:"Boolean"},{type:"input_statement",name:"DO"},{type:"input_statement",name:"ELSE"}],"if"],
  ["c_repeat","חזור %1 פעמים %2","Repeat %1 times %2",[num("N",3,1,10),{type:"input_statement",name:"DO"}],"if"],
  // questions (conditions)
  ["q_night","לילה","it's night",[],"q"], ["q_day","יום","it's day",[],"q"], ["q_rain","יורד גשם","it's raining",[],"q"],
  ["q_sneak","אני מתכופף (Shift)","I'm sneaking (Shift)",[],"q"],
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
    const k = { tr_use:"use", tr_hit:"hit", tr_hold:"hold" }[b.type];
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
  if (!B){ div.innerHTML = `<p class="st-noblk">${en() ? "The block editor didn't load. Open the page from Minecraft in the Start menu." : "עורך הקוביות לא נטען. פותחים את הדף מ־Minecraft בתפריט Start."}</p>`; return; }
  setLang(() => {
    defineAll();
    if (ws){ try { ws.dispose(); } catch(e){} ws = null; }
    ws = B.inject(div, { toolbox: toolbox(), rtl: !en(), media: "blockly/media/", sounds: false, trashcan: true,
      zoom: { controls: true, wheel: false, startScale: 0.85 }, move: { scrollbars: true, drag: true, wheel: true }, renderer: "zelos" });
    if (item.blocks){ try { B.serialization.workspaces.load(item.blocks, ws); } catch(e){} }
    let t = null;
    ws.addChangeListener(e => {
      if (e.isUiEvent) return;
      clearTimeout(t);
      t = setTimeout(() => { item.blocks = B.serialization.workspaces.save(ws); item.power = compile(ws); onChange(); }, 400);
    });
  });
}
function unmount(){ if (ws){ try { ws.dispose(); } catch(e){} ws = null; } }
window.STUDIO_BLOCKS = { mount, unmount, compile, DEFS };
})();
