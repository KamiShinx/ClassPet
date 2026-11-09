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
// Who it happens to, with the Hebrew preposition each block needs: לי / ליצור / ליצורים מסביבי...
const WHO = [["אני","me","me"],["היצור","the creature","target"],["היצורים מסביבי","the creatures around me","around"],["הנקודה","the spot","spot"]];
const who = (he1, he2, en1, en2) => [[he1, en1, "me"], [he2, en2, "target"]];
const who3 = (he, en) => [[he[0], en[0], "me"], [he[1], en[1], "target"], [he[2], en[2], "around"]];      // me, the creature, the creatures around me
const where3 = (he, en) => [[he[0], en[0], "me"], [he[1], en[1], "target"], [he[2], en[2], "spot"]];      // me, the creature, the spot
const EFFECTS = [["מהירות","Speed","speed"],["איטיות","Slowness","slowness"],["קפיצה גבוהה","Jump Boost","jump_boost"],["כוח","Strength","strength"],
  ["חולשה","Weakness","weakness"],["התחדשות","Regeneration","regeneration"],["עמידות","Resistance","resistance"],["עמידות לאש","Fire Resistance","fire_resistance"],
  ["נשימה במים","Water Breathing","water_breathing"],["היעלמות","Invisibility","invisibility"],["ראיית לילה","Night Vision","night_vision"],["זוהר","Glowing","glowing"],
  ["ריחוף","Levitation","levitation"],["נפילה איטית","Slow Falling","slow_falling"],["רעל","Poison","poison"],["עיוורון","Blindness","blindness"],
  ["סחרחורת","Nausea","nausea"],["רעב","Hunger","hunger"],["חציבה מהירה","Haste","haste"],["לבבות זהב","Absorption","absorption"],["Wither","Wither","wither"],
  ["חציבה איטית","Mining Fatigue","mining_fatigue"],["מזל","Luck","luck"],["כוח הדולפין","Dolphin's Grace","dolphins_grace"],["כוח הים","Conduit Power","conduit_power"],["חושך","Darkness","darkness"]];
const MOBS = [["Zombie","Zombie","zombie"],["Skeleton","Skeleton","skeleton"],["Creeper","Creeper","creeper"],["Spider","Spider","spider"],["Enderman","Enderman","enderman"],
  ["Slime","Slime","slime"],["Blaze","Blaze","blaze"],["Phantom","Phantom","phantom"],["Wolf","Wolf","wolf"],["Cat","Cat","cat"],["Fox","Fox","fox"],["Bee","Bee","bee"],
  ["Cow","Cow","cow"],["Pig","Pig","pig"],["Chicken","Chicken","chicken"],["Sheep","Sheep","sheep"],["Horse","Horse","horse"],["Parrot","Parrot","parrot"],
  ["Axolotl","Axolotl","axolotl"],["Frog","Frog","frog"],["Allay","Allay","allay"],["Iron Golem","Iron Golem","iron_golem"],["Snow Golem","Snow Golem","snow_golem"],
  ["Villager","Villager","villager"],["Bat","Bat","bat"],["Witch","Witch","witch"],["Ghast","Ghast","ghast"],["Piglin","Piglin","piglin"],["Hoglin","Hoglin","hoglin"],
  ["Wither Skeleton","Wither Skeleton","wither_skeleton"],["Magma Cube","Magma Cube","magma_cube"],["Silverfish","Silverfish","silverfish"],["Vex","Vex","vex"],
  ["Ravager","Ravager","ravager"],["Camel","Camel","camel"],["Panda","Panda","panda"],["Polar Bear","Polar Bear","polar_bear"],["Turtle","Turtle","turtle"],
  ["Dolphin","Dolphin","dolphin"],["Goat","Goat","goat"],["Llama","Llama","llama"],["Rabbit","Rabbit","rabbit"],["Sniffer","Sniffer","sniffer"],["Breeze","Breeze","breeze"],
  ["Armadillo","Armadillo","armadillo"],["Warden","Warden","warden"],["Ender Dragon","Ender Dragon","ender_dragon"],["Wither","Wither","wither"]];
const SOUNDS = [["עלייה ברמה","Level up","entity.player.levelup"],["איסוף XP","XP orb","entity.experience_orb.pickup"],["רעם","Thunder","entity.lightning_bolt.thunder"],
  ["פיצוץ","Explosion","entity.generic.explode"],["פעמון","Bell","block.note_block.bell"],["שיגור","Teleport","entity.enderman.teleport"],["צרחה","Scream","entity.ghast.scream"],
  ["זיקוק","Firework","entity.firework_rocket.launch"],["יללה","Howl","entity.wolf.howl"],["מיאו","Meow","entity.cat.ambient"],["סדן","Anvil","block.anvil.land"],["נהמת דרקון","Dragon","entity.ender_dragon.growl"],
  ["ירייה בקשת","Bow shot","entity.arrow.shoot"],["כדור אש","Fireball","entity.blaze.shoot"],["קסם","Magic","block.enchantment_table.use"],["פורטל","Portal","block.portal.travel"],
  ["זכוכית נשברת","Glass breaking","block.glass.break"],["רוח","Wind","entity.breeze.shoot"],["גונג","Gong","block.bell.use"],["חליל","Flute","block.note_block.flute"],
  ["תוף","Drum","block.note_block.basedrum"],["כבשה","Sheep","entity.sheep.ambient"],["פרה","Cow","entity.cow.ambient"],["קריפר","Creeper","entity.creeper.primed"]];
const DIMS = [["Overworld","Overworld","overworld"],["Nether","Nether","nether"],["End","End","end"]];
// Blocks and items keep their English names, as in the game (like the recipe ingredients).
const BLOCKS = ["air","stone","cobblestone","dirt","grass_block","sand","gravel","glass","ice","packed_ice","blue_ice","snow","snow_block","powder_snow","obsidian","oak_planks","oak_log","oak_leaves",
  "water","lava","fire","soul_fire","cobweb","tnt","gold_block","diamond_block","emerald_block","iron_block","glowstone","sea_lantern","slime_block","honey_block","magma_block",
  "netherrack","soul_sand","end_stone","purpur_block","sponge","hay_block","torch","pumpkin","jack_o_lantern","bookshelf","amethyst_block","sculk","moss_block","mud","bedrock"]
  .map(id => [id === "air" ? "כלום (אוויר)" : nice(id), id === "air" ? "Nothing (air)" : nice(id), id]);
const ITEMS = ["diamond","emerald","gold_ingot","iron_ingot","netherite_ingot","golden_apple","enchanted_golden_apple","cooked_beef","bread","cookie","cake","apple","arrow",
  "ender_pearl","snowball","egg","tnt","torch","totem_of_undying","experience_bottle","firework_rocket","wind_charge","fire_charge","diamond_sword","bow","shield","elytra",
  "trident","oak_planks","cobblestone","water_bucket","lava_bucket","saddle","name_tag","bone","string","feather"].map(id => [nice(id), nice(id), id]);
const PROJ = [["חץ","Arrow","arrow"],["חץ זוהר","Spectral Arrow","spectral_arrow"],["כדור שלג","Snowball","snowball"],["ביצה","Egg","egg"],["פנינת אנדר","Ender Pearl","ender_pearl"],
  ["כדור אש קטן","Small Fireball","small_fireball"],["כדור אש גדול (מתפוצץ)","Big Fireball (explodes)","fireball"],["כדור אש של דרקון","Dragon Fireball","dragon_fireball"],
  ["מטען רוח","Wind Charge","wind_charge"],["קלשון","Trident","trident"],["יריקת לאמה","Llama Spit","llama_spit"]];
const PARTS = [["להבות","Flames","flame"],["להבות כחולות","Blue flames","soul_fire_flame"],["לבבות","Hearts","heart"],["עשן","Smoke","smoke"],["עשן כבד","Thick smoke","large_smoke"],
  ["ענן","Cloud","cloud"],["סגול של פורטל","Portal purple","portal"],["אותיות קסם","Magic letters","enchant"],["פיצוץ","Explosion","explosion"],["טוטם","Totem","totem_of_undying"],
  ["פתיתי שלג","Snowflakes","snowflake"],["תווים","Music notes","note"],["ניצוצות ירוקים","Green sparkles","happy_villager"],["עננים כועסים","Angry clouds","angry_villager"],
  ["אורות לבנים","White lights","end_rod"],["ניצוצות של מכה","Hit sparks","crit"],["קסם של מכשפה","Witch magic","witch"],["זוהר","Glow","glow"],["ניצוצות חשמל","Electric sparks","electric_spark"],
  ["זיקוקים","Fireworks","firework"],["טיפות לבה","Lava drops","lava"],["אפר","Ash","ash"],["נשמות","Souls","sculk_soul"],["גל קול של ה־Warden","Warden's sonic boom","sonic_boom"]];
const BIOMES = ["plains","forest","birch_forest","dark_forest","desert","savanna","jungle","swamp","taiga","snowy_plains","ice_spikes","mushroom_fields","badlands","cherry_grove",
  "meadow","beach","ocean","river","lush_caves","dripstone_caves","deep_dark","pale_garden","nether_wastes","crimson_forest","warped_forest","soul_sand_valley","basalt_deltas","the_end"]
  .map(id => [nice(id), nice(id), id]);
const WEATHER = [["שמש","Clear","clear"],["גשם","Rain","rain"],["סופת ברקים","Thunderstorm","thunder"]];
const TIMES = [["בוקר","Morning","day"],["צהריים","Noon","noon"],["ערב","Evening","evening"],["חצות","Midnight","midnight"]];
const SHAPES = [["כדור","ball","ball"],["קיר עגול","round wall","shell"],["רצפה עגולה","round floor","floor"]];
function nice(id){ if (id === "tnt") return "TNT"; return id.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ").replace(/ Of /g, " of ").replace(/ O /g, " o'"); }
const opts = list => () => list.map(x => [en() ? x[1] : x[0], x[2]]);
const num = (name, value, min, max, precision) => ({ type:"field_number", name, value, min, max, precision: precision || 1 });
const dd = (name, list) => ({ type:"field_dropdown", name, options: opts(list) });
const DO_IN = name => ({ type:"input_statement", name });

/* ---------- the blocks: [type, Hebrew, English, args, kind] ----------
   Block ideas follow MCreator's procedure blocks: triggers, entity actions, projectiles, world actions, waits and conditions. */
const DEFS = [
  // when (triggers): the hats everything hangs from
  ["tr_use","כשלוחצים לחיצה ימנית עם החפץ %1","When you right-click with the item %1",[DO_IN("DO")],"when"],
  ["tr_hit","כשמכים יצור עם החפץ %1","When you hit a creature with the item %1",[DO_IN("DO")],"when"],
  ["tr_usemob","כשלוחצים לחיצה ימנית על יצור %1","When you right-click a creature %1",[DO_IN("DO")],"when"],
  ["tr_useblock","כשלוחצים לחיצה ימנית על קובייה %1","When you right-click a block %1",[DO_IN("DO")],"when"],
  ["tr_break","כששוברים קובייה עם החפץ %1","When you break a block with the item %1",[DO_IN("DO")],"when"],
  ["tr_kill","כשהורגים יצור עם החפץ %1","When you kill a creature with the item %1",[DO_IN("DO")],"when"],
  ["tr_hurt","כשמשהו פוגע בי והחפץ ביד %1","When something hurts me while the item is in my hand %1",[DO_IN("DO")],"when"],
  ["tr_hold","כל שנייה שהחפץ ביד %1","Every second the item is in your hand %1",[DO_IN("DO")],"when"],
  // do: to me and to creatures
  ["a_effect","לתת %2 %1 למשך %3 שניות, בעוצמה %4","Give %1 %2 for %3 seconds, strength %4",
    [dd("E", EFFECTS),{type:"field_dropdown",name:"WHO",options:opts(who3(["לי","ליצור","ליצורים מסביבי"],["to me","to the creature","to the creatures around me"]))},num("S",5,1,120),num("L",1,1,5)],"do"],
  ["a_clear","להסיר את כל האפקטים %1","Remove all effects from %1",[{type:"field_dropdown",name:"WHO",options:opts(who3(["ממני","מהיצור","מהיצורים מסביבי"],["me","the creature","the creatures around me"]))}],"do"],
  ["a_heal","לרפא %1 ב־%2 לבבות","Heal %1 by %2 hearts",[{type:"field_dropdown",name:"WHO",options:opts(who3(["אותי","את היצור","את היצורים מסביבי"],["me","the creature","the creatures around me"]))},num("N",2,1,20)],"do"],
  ["a_damage","להוריד %1 %2 לבבות","Take %2 hearts from %1",[{type:"field_dropdown",name:"WHO",options:opts(who3(["לי","ליצור","ליצורים מסביבי"],["me","the creature","the creatures around me"]))},num("N",2,1,25)],"do"],
  ["a_fire","להצית %1 ל־%2 שניות","Set %1 on fire for %2 seconds",[{type:"field_dropdown",name:"WHO",options:opts(who3(["אותי","את היצור","את היצורים מסביבי"],["me","the creature","the creatures around me"]))},num("S",3,1,30)],"do"],
  ["a_freeze","להקפיא %1 ל־%2 שניות","Freeze %1 for %2 seconds",[{type:"field_dropdown",name:"WHO",options:opts(who3(["אותי","את היצור","את היצורים מסביבי"],["me","the creature","the creatures around me"]))},num("S",3,1,20)],"do"],
  ["a_launch","להקפיץ %1 למעלה בעוצמה %2","Launch %1 up, power %2",[{type:"field_dropdown",name:"WHO",options:opts(who3(["אותי","את היצור","את היצורים מסביבי"],["me","the creature","the creatures around me"]))},num("P",1,1,5)],"do"],
  ["a_push","לדחוף %1 בעוצמה %2","Push %1 away, power %2",[{type:"field_dropdown",name:"WHO",options:opts(who3(["אותי קדימה","את היצור","את היצורים מסביבי"],["me forward","the creature","the creatures around me"]))},num("P",1,1,5)],"do"],
  ["a_pull","למשוך %1 אליי בעוצמה %2","Pull %1 to me, power %2",[{type:"field_dropdown",name:"WHO",options:opts([["את היצור","the creature","target"],["את היצורים מסביבי","the creatures around me","around"]])},num("P",1,1,5)],"do"],
  ["a_tp","לקפוץ %1 קוביות קדימה","Jump %1 blocks forward",[num("N",8,1,30)],"do"],
  ["a_tpspot","לקפוץ אל הנקודה","Jump to the spot",[],"do"],
  ["a_ride","לרכוב על היצור","Ride the creature",[],"do"],
  ["a_give","לקבל %1, כמות: %2","Get %1, how many: %2",[dd("I", ITEMS),num("N",1,1,64)],"do"],
  ["a_xp","לקבל %1 נקודות XP","Get %1 XP points",[num("N",10,1,500)],"do"],
  ["a_sound","להשמיע צליל: %1","Play a sound: %1",[dd("SND", SOUNDS)],"do"],
  ["a_msg","לכתוב על המסך %1","Show on screen %1",[{type:"field_input",name:"T",text:"!"}],"do"],
  // projectiles
  ["a_shoot","לירות %1 במהירות %2, וכשזה פוגע: %3","Shoot %1, speed %2, and when it hits: %3",[dd("PR", PROJ),num("V",2,1,5),DO_IN("HIT")],"shoot"],
  ["a_rain","גשם: %1 %2, כמות: %3","Rain of %1 %2, how many: %3",[dd("PR", PROJ),{type:"field_dropdown",name:"WHO",options:opts(where3(["מעליי","מעל היצור","מעל הנקודה"],["over me","over the creature","over the spot"]))},num("N",5,1,20)],"shoot"],
  // the world
  ["a_lightning","ברק %1","Lightning %1",[{type:"field_dropdown",name:"WHO",options:opts(where3(["עליי","על היצור","על הנקודה"],["on me","on the creature","on the spot"]))}],"world"],
  ["a_explode","פיצוץ %1 בעוצמה %2, הורס קוביות %3","Explosion %1, power %2, breaks blocks %3",
    [{type:"field_dropdown",name:"WHO",options:opts(where3(["לידי","ליד היצור","בנקודה"],["next to me","next to the creature","at the spot"]))},num("P",2,1,6),{type:"field_checkbox",name:"BREAK",checked:false}],"world"],
  ["a_spawn","לזמן %1 %2, כמות: %3","Summon %1 %2, how many: %3",[dd("M", MOBS),{type:"field_dropdown",name:"WHO",options:opts(where3(["לידי","ליד היצור","בנקודה"],["next to me","next to the creature","at the spot"]))},num("N",1,1,5)],"world"],
  ["a_setblock","לשים %1 %2","Put %1 %2",[dd("B", BLOCKS),{type:"field_dropdown",name:"WHO",options:opts(where3(["מתחתיי","איפה שהיצור עומד","בנקודה"],["under me","where the creature stands","at the spot"]))}],"world"],
  ["a_fill","לבנות %1 מ־%2 בגודל %3, %4","Build a %1 of %2, size %3, %4",[dd("SH", SHAPES),dd("B", BLOCKS),num("R",2,1,5),{type:"field_dropdown",name:"WHO",options:opts(where3(["סביבי","סביב היצור","סביב הנקודה"],["around me","around the creature","around the spot"]))}],"world"],
  ["a_dig","לשבור קוביות %1 בגודל %2","Break blocks %1, size %2",[{type:"field_dropdown",name:"WHO",options:opts(where3(["סביבי","סביב היצור","סביב הנקודה"],["around me","around the creature","around the spot"]))},num("R",1,1,3)],"world"],
  ["a_particles","חלקיקים: %1 %2, כמות: %3","Particles: %1 %2, how many: %3",[dd("PT", PARTS),{type:"field_dropdown",name:"WHO",options:opts(where3(["סביבי","סביב היצור","בנקודה"],["around me","around the creature","at the spot"]))},num("N",20,1,100)],"world"],
  ["a_weather","מזג האוויר: %1","Weather: %1",[dd("W", WEATHER)],"world"],
  ["a_time","לשנות את השעה: %1","Set the time to %1",[dd("TM", TIMES)],"world"],
  ["a_dim","לעבור לממד %1","Go to the %1",[dd("D", DIMS)],"world"],
  // price
  ["p_cooldown","החפץ נח %1 שניות","The item rests %1 seconds",[num("S",5,1,120)],"price"],
  ["p_consume","החפץ נגמר: אחד יורד מהערימה","The item is used up: one less in the stack",[],"price"],
  ["p_hunger","האוכל שלי יורד ב־%1","My food goes down by %1",[num("N",2,1,20)],"price"],
  ["p_xpcost","המחיר: %1 רמות XP","Costs %1 XP levels",[num("N",1,1,30)],"price"],
  // if, repeat, wait
  ["c_if","אם %1 אז %2","If %1 then %2",[{type:"input_value",name:"C",check:"Boolean"},DO_IN("DO")],"if"],
  ["c_ifelse","אם %1 אז %2 אחרת %3","If %1 then %2 otherwise %3",[{type:"input_value",name:"C",check:"Boolean"},DO_IN("DO"),DO_IN("ELSE")],"if"],
  ["c_repeat","לחזור %1 פעמים %2","Repeat %1 times %2",[num("N",3,1,20),DO_IN("DO")],"if"],
  ["c_wait","לחכות %1 שניות","Wait %1 seconds",[num("S",1,0.5,30,0.5)],"if"],
  // questions (conditions)
  ["q_night","לילה","it's night",[],"q"], ["q_day","יום","it's day",[],"q"], ["q_rain","יורד גשם","it's raining",[],"q"], ["q_thunder","יש סופת ברקים","there's a thunderstorm",[],"q"],
  ["q_sneak","Shift לחוץ","Shift is held",[],"q"],
  ["q_chance","בסיכוי של %1 אחוז","with a %1 percent chance",[num("P",50,1,100)],"q"],
  ["q_health","יש לי פחות מ־%1 לבבות","I have less than %1 hearts",[num("N",5,1,10)],"q"],
  ["q_thealth","ליצור יש פחות מ־%1 לבבות","the creature has less than %1 hearts",[num("N",5,1,100)],"q"],
  ["q_target","היצור הוא %1","the creature is %1",[dd("M", MOBS)],"q"],
  ["q_effect","יש לי %1","I have %1",[dd("E", EFFECTS)],"q"],
  ["q_water","אני במים","I'm in water",[],"q"], ["q_burning","יש עליי אש","I'm on fire",[],"q"], ["q_air","אני באוויר","I'm in the air",[],"q"],
  ["q_on","מתחתיי יש %1","there's %1 under me",[dd("B", BLOCKS)],"q"],
  ["q_high","אני בגובה מעל %1","I'm higher than %1",[num("N",100,-60,320)],"q"],
  ["q_dim","אני ב־%1","I'm in the %1",[dd("D", DIMS)],"q"],
  ["q_biome","אני ב־%1","I'm in %1",[dd("BI", BIOMES)],"q"],
  ["q_and","%1 וגם %2","%1 and %2",[{type:"input_value",name:"A",check:"Boolean"},{type:"input_value",name:"B",check:"Boolean"}],"q"],
  ["q_or","%1 או %2","%1 or %2",[{type:"input_value",name:"A",check:"Boolean"},{type:"input_value",name:"B",check:"Boolean"}],"q"],
  ["q_not","לא %1","not %1",[{type:"input_value",name:"A",check:"Boolean"}],"q"]
];
const KIND = { when:{ colour:35 }, do:{ colour:205 }, shoot:{ colour:20 }, world:{ colour:160 }, price:{ colour:0 }, if:{ colour:285 }, q:{ colour:125 } };
const CATS = [["when","מתי","When"],["do","לי וליצורים","Me & creatures"],["shoot","קליעים","Projectiles"],["world","העולם","The world"],["price","מחיר","Price"],["if","אם, חזרה וזמן","If, repeat & wait"],["q","שאלות","Questions"]];

function defineAll(){
  const B = window.Blockly; if (!B) return false;
  DEFS.forEach(([type, he, enText, args, kind]) => {
    // In Hebrew a label that starts with a comma ("%2, כמות:") would show the comma at its far end: a right-to-left mark keeps it in place.
    const j = { type, message0: en() ? enText : he.replace(/(%\d),/g, "$1\u200F,"), args0: args, colour: KIND[kind].colour, inputsInline: true };
    if (kind === "when") j.inputsInline = false;          // a hat: nothing above or below it
    else if (kind === "q") j.output = "Boolean";
    else { j.previousStatement = null; j.nextStatement = null; }
    if (args.some(a => a.type === "input_statement")) j.inputsInline = false;
    B.Blocks[type] = { init(){ this.jsonInit(j); if (kind === "when") this.hat = "cap"; } };
  });
  return true;
}
function toolbox(){
  return { kind:"categoryToolbox", contents: CATS.map(([k, he, enT]) => ({ kind:"category", name: en() ? enT : he, colour: String(KIND[k].colour),
    contents: DEFS.filter(d => d[4] === k).map(d => ({ kind:"block", type:d[0] })) })) };
}

/* ---------- blocks -> program (JSON) for StudioPower in Kit.java ----------
   Each action block: {"a": its name, then its fields under short keys}. FIELDMAP says which field goes to which key. */
const TRIG = { tr_use:"use", tr_hit:"hit", tr_usemob:"use_mob", tr_hold:"hold", tr_useblock:"use_block", tr_break:"break", tr_kill:"kill", tr_hurt:"hurt" };
const FIELDMAP = { a_effect:{E:"e",WHO:"who",S:"s",L:"l"}, a_clear:{WHO:"who"}, a_heal:{WHO:"who",N:"n"}, a_damage:{WHO:"who",N:"n"}, a_fire:{WHO:"who",S:"s"},
  a_freeze:{WHO:"who",S:"s"}, a_launch:{WHO:"who",P:"p"}, a_push:{WHO:"who",P:"p"}, a_pull:{WHO:"who",P:"p"}, a_tp:{N:"n"}, a_tpspot:{}, a_ride:{},
  a_give:{I:"i",N:"n"}, a_xp:{N:"n"}, a_sound:{SND:"snd"}, a_msg:{T:"t"}, a_shoot:{PR:"pr",V:"v"}, a_rain:{PR:"pr",WHO:"who",N:"n"},
  a_lightning:{WHO:"who"}, a_explode:{WHO:"who",P:"p",BREAK:"brk"}, a_spawn:{M:"m",WHO:"who",N:"n"}, a_setblock:{B:"b",WHO:"who"},
  a_fill:{SH:"sh",B:"b",R:"r",WHO:"who"}, a_dig:{WHO:"who",R:"r"}, a_particles:{PT:"pt",WHO:"who",N:"n"}, a_weather:{W:"w"}, a_time:{TM:"tm"}, a_dim:{D:"d"},
  p_cooldown:{S:"s"}, p_consume:{}, p_hunger:{N:"n"}, p_xpcost:{N:"n"} };
const STMT_IN = { a_shoot:{ HIT:"hit" } };     // actions that hold blocks of their own
const ACT = {}; Object.keys(FIELDMAP).forEach(t => { ACT[t.replace(/^[ap]_/, "")] = t; });
// Questions: [the "c" name, fields]
const QMAP = { q_night:["night",{}], q_day:["day",{}], q_rain:["rain",{}], q_thunder:["thunder",{}], q_sneak:["sneak",{}], q_chance:["chance",{P:"p"}],
  q_health:["health",{N:"n"}], q_thealth:["thealth",{N:"n"}], q_target:["target",{M:"m"}], q_effect:["effect",{E:"e"}], q_water:["water",{}], q_burning:["burning",{}],
  q_air:["air",{}], q_on:["on",{B:"b"}], q_high:["high",{N:"n"}], q_dim:["dim",{D:"d"}], q_biome:["biome",{BI:"bi"}] };
const QBY = {}; Object.keys(QMAP).forEach(t => { QBY[QMAP[t][0]] = t; });
function fieldOut(b, f){
  const arg = defOf(b.type)[3].find(a => a.name === f), v = b.getFieldValue(f);
  if (arg.type === "field_number") return +v;
  if (arg.type === "field_checkbox") return v === "TRUE";
  if (arg.type === "field_input") return String(v || "").slice(0, 80);
  return v;
}
function cond(b){
  if (!b) return null;
  const v = n => cond(b.getInputTargetBlock(n));
  if (b.type === "q_and") return { and:[v("A"), v("B")] };
  if (b.type === "q_or") return { or:[v("A"), v("B")] };
  if (b.type === "q_not") return { not:v("A") };
  const q = QMAP[b.type]; if (!q) return null;
  const o = { c:q[0] }; Object.entries(q[1]).forEach(([F, k]) => { o[k] = fieldOut(b, F); });
  return o;
}
function stmts(b){
  const out = [];
  for (; b; b = b.getNextBlock()){
    if (!b.isEnabled()) continue;
    switch (b.type){
      case "c_if": out.push({ if: cond(b.getInputTargetBlock("C")), then: stmts(b.getInputTargetBlock("DO")) }); continue;
      case "c_ifelse": out.push({ if: cond(b.getInputTargetBlock("C")), then: stmts(b.getInputTargetBlock("DO")), else: stmts(b.getInputTargetBlock("ELSE")) }); continue;
      case "c_repeat": out.push({ repeat: +b.getFieldValue("N"), do: stmts(b.getInputTargetBlock("DO")) }); continue;
      case "c_wait": out.push({ wait: +b.getFieldValue("S") }); continue;
    }
    const fm = FIELDMAP[b.type]; if (!fm) continue;
    const s = { a: b.type.replace(/^[ap]_/, "") };
    Object.entries(fm).forEach(([F, k]) => { s[k] = fieldOut(b, F); });
    Object.entries(STMT_IN[b.type] || {}).forEach(([I, k]) => { s[k] = stmts(b.getInputTargetBlock(I)); });
    out.push(s);
  }
  return out;
}
function compile(ws){
  const on = {};
  ws.getTopBlocks(true).forEach(b => {
    const k = TRIG[b.type];
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
function mount(div, item, onChange, readOnly){
  const B = window.Blockly;
  if (!B){ div.innerHTML = `<p class="st-noblk">${en() ? "The block editor didn't load. Open the page from Minecraft in the Start menu." : "עורך הבלוקים לא נטען. פותחים את הדף מ־Minecraft בתפריט Start."}</p>`; return; }
  setLang(() => {
    defineAll();
    if (ws){ try { ws.dispose(); } catch(e){} ws = null; }
    // Read-only: the blocks shown as a picture of the item's "code" (a lesson's ready item), nothing to drag.
    ws = B.inject(div, readOnly ? { readOnly: true, rtl: !en(), media: "blockly/media/", sounds: false, renderer: "zelos", move: { scrollbars: true, drag: true, wheel: false } }
      : { toolbox: toolbox(), rtl: !en(), media: "blockly/media/", sounds: false, trashcan: true,
      zoom: { controls: true, wheel: false, startScale: 0.85 }, move: { scrollbars: true, drag: true, wheel: true }, renderer: "zelos" });
    if (item.blocks){ try { B.serialization.workspaces.load(item.blocks, ws); } catch(e){} }
    if (readOnly){ const fit = () => { try { B.svgResize(ws); ws.zoomToFit(); if (ws.getScale() > 1) ws.setScale(1); ws.scrollCenter(); } catch(e){} }; fit(); setTimeout(fit, 60); return; }
    // Blocks wider than the box (the new projectile blocks are): zoom out so the kid sees all of them.
    setTimeout(() => { try { const mm = ws.getMetricsManager(), c = mm.getContentMetrics(), v = mm.getViewMetrics();
      if (c.width > v.width || c.height > v.height){ ws.zoomToFit(); if (ws.getScale() > 0.85) ws.setScale(0.85); } ws.scrollCenter(); } catch(e){} }, 80);
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
const LISTS = { E:EFFECTS, WHO:WHO, M:MOBS, SND:SOUNDS, D:DIMS, B:BLOCKS, I:ITEMS, PR:PROJ, PT:PARTS, BI:BIOMES, W:WEATHER, TM:TIMES, SH:SHAPES };
function defOf(type){ return DEFS.find(d => d[0] === type); }
function fieldVal(type, f, v){
  const def = defOf(type), arg = def && def[3].find(a => a.name === f);
  if (!arg) return null;
  if (arg.type === "field_dropdown") return arg.options().some(x => x[1] === v) ? v : null;
  if (arg.type === "field_number"){
    const p = arg.precision || 1, n = Math.round(Number(v) / p) * p;
    if (!isFinite(n)) return null; return Math.max(arg.min, Math.min(arg.max, n)); }
  if (arg.type === "field_checkbox") return v === true || v === "TRUE" ? "TRUE" : "FALSE";
  if (arg.type === "field_input") return String(v == null ? "" : v).slice(0, 80);
  return null;
}
const ERRNAME = { M:"mob", E:"effect", SND:"sound", B:"block", I:"item", PR:"projectile", PT:"particle", BI:"biome" };
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
  const type = QBY[c.c]; if (!type) throw "cond";
  const fields = {};
  for (const [F, k] of Object.entries(QMAP[type][1])){
    const v = fieldVal(type, F, c[k]); if (v == null) throw (ERRNAME[F] || "cond") + ":" + c[k];
    fields[F] = v;
  }
  return Object.keys(fields).length ? { type, fields } : { type };
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
    if (s.wait !== undefined) return { type:"c_wait", fields:{ S: fieldVal("c_wait", "S", s.wait) || 1 } };
    const type = ACT[s.a]; if (!type) throw "act:" + s.a;
    const fields = {};
    for (const [F, key] of Object.entries(FIELDMAP[type])){
      const def = defOf(type)[3].find(a => a.name === F);
      const dflt = def.type === "field_dropdown" ? def.options()[0][1] : def.type === "field_checkbox" ? false : def.value !== undefined ? def.value : def.text;
      const v = fieldVal(type, F, s[key] !== undefined ? s[key] : dflt);
      if (v == null) throw (ERRNAME[F] || "field") + ":" + s[key];
      fields[F] = v;
    }
    const b = { type, fields };
    Object.entries(STMT_IN[type] || {}).forEach(([I, k]) => { const c = chain(s[k], depth+1); if (c){ b.inputs = b.inputs || {}; b.inputs[I] = { block:c }; } });
    return b;
  });
  for (let i = blocks.length - 2; i >= 0; i--) blocks[i].next = { block: blocks[i+1] };
  return blocks[0] || null;
}
function toBlocks(prog){
  try {
    if (!prog || typeof prog !== "object" || !prog.on || typeof prog.on !== "object") return { error:"shape" };
    const tops = []; let y = 20;
    Object.entries(TRIG).forEach(([type, k]) => {
      if (!Array.isArray(prog.on[k]) || !prog.on[k].length) return;
      const b = { type, x:20, y }; const c = chain(prog.on[k], 0); if (c) b.inputs = { DO:{ block:c } };
      tops.push(b); y += 60 + 50 * JSON.stringify(c).split('"type"').length;
    });
    if (!tops.length) return { error:"empty" };
    return { blocks:{ blocks:{ languageVersion:0, blocks: tops } } };
  } catch(e){ return { error: String(e) }; }
}
// The program format, for Gemini (studio.js puts it into its rules). Made from the blocks above, so it never falls behind them.
function format(){
  const ids = list => list.map(x => x[2]).join(", ");
  return `{"on":{"use":[steps],"hit":[steps],"use_mob":[steps],"use_block":[steps],"break":[steps],"kill":[steps],"hurt":[steps],"hold":[steps]}}
use = right-click with the item (in the air), hit = hitting a creature, use_mob = right-clicking a creature, use_block = right-clicking a block, break = breaking a block with the item, kill = killing a creature with the item, hurt = something hurts me while I hold the item, hold = every second in the hand
Steps (who: "me" | "target" = the creature | "around" = every creature within 5 blocks of me | "spot" = where I'm aiming, the block that was clicked or broken, or where the projectile hit):
{"a":"effect","e":EFFECT,"who":"me"|"target"|"around","s":seconds 1-120,"l":strength 1-5}   {"a":"clear","who":"me"|"target"|"around"}
{"a":"heal","who":"me"|"target"|"around","n":hearts 1-20}   {"a":"damage","who":"me"|"target"|"around","n":hearts 1-25}   {"a":"fire","who":"me"|"target"|"around","s":seconds 1-30}
{"a":"freeze","who":"me"|"target"|"around","s":seconds 1-20}   {"a":"launch","who":"me"|"target"|"around","p":1-5}   {"a":"push","who":"me"|"target"|"around","p":1-5}   {"a":"pull","who":"target"|"around","p":1-5}
{"a":"tp","n":blocks forward 1-30}   {"a":"tpspot"}   {"a":"ride"} (ride the creature)   {"a":"give","i":ITEM,"n":1-64}   {"a":"xp","n":points 1-500}
{"a":"sound","snd":SOUND}   {"a":"msg","t":"text up to 80 characters"}
Projectiles: {"a":"shoot","pr":PROJECTILE,"v":speed 1-5,"hit":[steps that run where it hits; "target" there = the creature it hit]}   {"a":"rain","pr":PROJECTILE,"who":"me"|"target"|"spot","n":1-20}
The world: {"a":"lightning","who":"me"|"target"|"spot"}   {"a":"explode","who":"me"|"target"|"spot","p":power 1-6,"brk":true|false}   {"a":"spawn","m":MOB,"who":"me"|"target"|"spot","n":1-5}
{"a":"setblock","b":BLOCK,"who":"me"(under me)|"target"|"spot"}   {"a":"fill","sh":"ball"|"shell"|"floor","b":BLOCK,"r":size 1-5,"who":"me"|"target"|"spot"}   {"a":"dig","who":"me"|"target"|"spot","r":1-3}
{"a":"particles","pt":PARTICLE,"who":"me"|"target"|"spot","n":1-100}   {"a":"weather","w":"clear"|"rain"|"thunder"}   {"a":"time","tm":"day"|"noon"|"evening"|"midnight"}   {"a":"dim","d":"overworld"|"nether"|"end"}
Price: {"a":"cooldown","s":seconds 1-120}   {"a":"consume"}   {"a":"hunger","n":food 1-20}   {"a":"xpcost","n":levels 1-30}
{"if":COND,"then":[steps],"else":[steps]}   {"repeat":1-20,"do":[steps]}   {"wait":seconds 0.5-30} (the steps after it wait)
COND: {"c":"night"} {"c":"day"} {"c":"rain"} {"c":"thunder"} {"c":"sneak"} {"c":"chance","p":1-100} {"c":"health","n":hearts} {"c":"thealth","n":the creature's hearts} {"c":"target","m":MOB} {"c":"effect","e":EFFECT} {"c":"water"} {"c":"burning"} {"c":"air"} {"c":"on","b":BLOCK} (under me) {"c":"high","n":height} {"c":"dim","d":"overworld"|"nether"|"end"} {"c":"biome","bi":BIOME} {"and":[COND,COND]} {"or":[COND,COND]} {"not":COND}
"target" exists only inside "hit", "use_mob", "kill" (already dead there), "hurt" (whoever hurt me) and a projectile's "hit".
EFFECT: ${ids(EFFECTS)}
MOB: ${ids(MOBS)}
SOUND: ${ids(SOUNDS)}
BLOCK: ${ids(BLOCKS)}
ITEM: ${ids(ITEMS)}
PROJECTILE: ${ids(PROJ)}
PARTICLE: ${ids(PARTS)}
BIOME: ${ids(BIOMES)}`;
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
  const strong = new Set(["lightning","explode","spawn","tp","tpspot","fire","shoot","rain","fill","dig","give","dim","freeze"]);
  const hasTarget = t => ["hit","use_mob","kill","hurt","shot"].includes(t);
  let anyPrice = false, anyStrong = false;
  const walk = (list, trig) => (list || []).forEach(s => {
    if (!s) return;
    if (s.if){ if (!(s.then || []).length) add(E ? "An \"if\" has nothing inside it." : "יש ״אם״ בלי שום דבר בתוכו."); cond(s.if, trig); walk(s.then, trig); walk(s.else, trig); return; }
    if (s.repeat){ if (!(s.do || []).length) add(E ? "A \"repeat\" has nothing inside it." : "יש ״לחזור״ בלי שום דבר בתוכו."); walk(s.do, trig); return; }
    if (s.wait !== undefined){ if (trig === "hold" && s.wait >= 1) add(E ? "A \"wait\" under \"Every second\": the next second starts again before the wait ends." : "״לחכות״ בתוך ״כל שנייה״: השנייה הבאה מתחילה שוב לפני שההמתנה נגמרת."); return; }
    if ((s.who === "target" || s.a === "ride") && !hasTarget(trig)) add(E ? "A block points at \"the creature\", but there's a creature only in \"hit\", \"right-click a creature\", \"kill\", \"something hurts me\" and where a projectile hits. Elsewhere it does nothing." : "יש בלוק שמדבר על ״היצור״, אבל יש יצור רק ב״כשמכים יצור״, ב״כשלוחצים לחיצה ימנית על יצור״, ב״כשהורגים יצור״, ב״כשמשהו פוגע בי״, ובתוך ״לירות״. בכל מקום אחר הבלוק לא עושה כלום.");
    if (trig === "kill" && s.who === "target" && ["effect","heal","damage","fire","freeze","launch","push","pull","clear"].includes(s.a)) add(E ? "In \"When you kill a creature\" the creature is already dead, so this does nothing to it. Use \"the spot\" (where it died) instead." : "ב״כשהורגים יצור״ היצור כבר מת, אז זה לא עושה לו כלום. אפשר להשתמש ב״נקודה״, המקום שבו הוא מת.");
    if (["cooldown","consume","hunger","xpcost"].includes(s.a)) anyPrice = true;
    if (strong.has(s.a) || (s.a === "damage" && s.who !== "me") || (s.a === "effect" && s.l >= 3)) anyStrong = true;
    if (trig === "hold" && strong.has(s.a)) add(E ? "Under \"Every second\", this happens every second as long as you hold it." : "ב״כל שנייה״ זה יקרה כל שנייה, כל עוד מחזיקים את החפץ.");
    if (s.a === "explode" && s.who === "me") add(E ? "An explosion next to you hurts you too." : "פיצוץ לידכם פוגע גם בכם.");
    if (s.a === "fill" && s.who === "me" && s.sh === "ball") add(E ? "A ball around you fills the place where you stand. A round wall or a round floor won't trap you." : "כדור סביבכם ממלא גם את המקום שבו אתם עומדים. קיר עגול או רצפה עגולה לא יתקעו אתכם.");
    if (s.a === "shoot") walk(s.hit, "shot");
  });
  const cond = (c, trig) => { if (!c) return add(E ? "An \"if\" has no question in it." : "יש ״אם״ בלי שאלה.");
    if ((c.c === "target" || c.c === "thealth") && !hasTarget(trig)) add(E ? "A question about the creature only works where there's a creature: \"hit\", \"right-click a creature\", \"kill\", \"something hurts me\" or where a projectile hits." : "שאלה על היצור עובדת רק איפה שיש יצור: ב״כשמכים יצור״, ב״כשלוחצים לחיצה ימנית על יצור״, ב״כשהורגים יצור״, ב״כשמשהו פוגע בי״ או בתוך ״לירות״.");
    (c.and || c.or || []).forEach(x => cond(x, trig)); if (c.not) cond(c.not, trig); };
  Object.keys(prog.on).forEach(k => walk(prog.on[k], k));
  if (anyStrong && !anyPrice) add(E ? "A strong power with no price. What stops a player from using it all the time?" : "כוח חזק בלי מחיר. מה ימנע מהשחקן להשתמש בו כל הזמן?");
  return out;
}

/* ---------- ready-made examples: a kid loads one into an item, then changes it ----------
   Each has a price, so the examples teach "power + price". lesson = the lesson that introduces it. */
const EXAMPLES = [
  { id:"lightning_stick", lesson:2, he:["מקל ברקים","מכים יצור, ונופל עליו ברק. אחר כך המקל נח."], en:["Lightning stick","Hit a creature and lightning strikes it. Then the stick rests."],
    lore:["הברק יודע את מי להכות.","The lightning knows whom to strike."], rarity:"rare",
    pic:{ pal:{ k:"#2b1d0e", w:"#8a5a2b", y:"#fed83d", Y:"#fff6b0" }, rows:["..........kkkk..","........kkyyyk..","........kyYyk...",".......kyyyk....","......kyyyyykk..",".......kkyyyk...","........kyyk....",".......kwkk.....","......kwk.......",".....kwk........","....kwk.........","...kwk..........","..kwk...........",".kwk............","kwk.............","kk.............."] },
    prog:{ on:{ hit:[{a:"lightning",who:"target"},{a:"cooldown",s:3}] } },
    // Lesson 3: how it's made in a Crafting Table (copper, like a Lightning Rod).
    recipe:{ g:["","minecraft:copper_ingot","","minecraft:copper_ingot","minecraft:stick","minecraft:copper_ingot","","minecraft:stick",""], n:1, any:false } },
  { id:"fire_sword", lesson:3, he:["חרב אש","מכים יצור, והוא עולה באש. כל מכה מורידה אוכל."], en:["Fire sword","Hit a creature and it catches fire. Every hit costs food."],
    prog:{ on:{ hit:[{a:"fire",who:"target",s:4},{a:"hunger",n:1}] } } },
  { id:"spring", lesson:3, he:["קפיץ","לחיצה ימנית, ואתם עפים למעלה."], en:["Spring","Right-click and you fly up."],
    prog:{ on:{ use:[{a:"launch",who:"me",p:2},{a:"sound",snd:"entity.firework_rocket.launch"},{a:"cooldown",s:2}] } } },
  { id:"jump_stone", lesson:3, he:["אבן הקפיצה","לחיצה ימנית, ואתם קופצים 8 קוביות קדימה."], en:["Jump stone","Right-click and you jump 8 blocks forward."],
    prog:{ on:{ use:[{a:"tp",n:8},{a:"sound",snd:"entity.enderman.teleport"},{a:"cooldown",s:5}] } } },
  { id:"speed_potion", lesson:3, he:["שיקוי מהירות","לחיצה ימנית: רצים מהר. השיקוי נגמר."], en:["Speed potion","Right-click: you run fast. The potion is used up."],
    prog:{ on:{ use:[{a:"effect",e:"speed",who:"me",s:15,l:2},{a:"sound",snd:"entity.player.levelup"},{a:"consume"}] } } },
  { id:"push_glove", lesson:3, he:["כפפת הדיפה","לחיצה ימנית על יצור, והוא עף אחורה."], en:["Push glove","Right-click a creature and it flies back."],
    prog:{ on:{ use_mob:[{a:"push",who:"target",p:3},{a:"cooldown",s:2}] } } },
  { id:"friend_cookie", lesson:3, he:["עוגיית חברות","לחיצה ימנית על יצור: הוא מתרפא וזוהר. העוגייה נגמרת."], en:["Friendship cookie","Right-click a creature: it heals and glows. The cookie is used up."],
    prog:{ on:{ use_mob:[{a:"heal",who:"target",n:4},{a:"effect",e:"glowing",who:"target",s:10,l:1},{a:"consume"}] } } },
  { id:"night_charm", lesson:4, he:["קמע הלילה","כשהוא ביד ויש לילה, רואים בחושך."], en:["Night charm","While you hold it at night, you see in the dark."],
    prog:{ on:{ hold:[{if:{c:"night"},then:[{a:"effect",e:"night_vision",who:"me",s:12,l:1}]}] } } },
  { id:"luck_stick", lesson:4, he:["מקל המזל","מכים יצור: לפעמים פיצוץ, ולפעמים כלום."], en:["Luck stick","Hit a creature: sometimes an explosion, sometimes nothing."],
    prog:{ on:{ hit:[{if:{c:"chance",p:25},then:[{a:"explode",who:"target",p:2,brk:false}],else:[{a:"msg",t:"פספוס!"}]},{a:"cooldown",s:2}] } } },
  { id:"wolf_whistle", lesson:4, he:["משרוקית הזאבים","Shift ולחיצה ימנית: שני זאבים מגיעים לעזור."], en:["Wolf whistle","Shift and right-click: two wolves come to help."],
    prog:{ on:{ use:[{if:{c:"sneak"},then:[{a:"spawn",m:"wolf",who:"me",n:2},{a:"sound",snd:"entity.wolf.howl"},{a:"cooldown",s:30}],else:[{a:"msg",t:"לוחצים Shift כדי לקרוא לזאבים"}]}] } } },
  // Lesson 4: the new blocks (projectiles, the world, dimensions, waits, new "when"s).
  { id:"snow_wand", lesson:4, he:["שרביט שלג","לחיצה ימנית: יורה כדור שלג. איפה שהוא פוגע יורד שלג, ויצור שנפגע קופא."], en:["Snow wand","Right-click: shoots a snowball. Where it hits snow falls, and a creature it hits freezes."],
    lore:["החורף בא איתו.","Winter comes with it."], rarity:"uncommon",
    pic:{ pal:{ k:"#1d2b3a", w:"#8a5a2b", s:"#7cc4f0", S:"#ffffff" }, rows:["...........S....","........S..S..S.",".........S.s.S..","........SSsSsSS.",".........S.s.S..","........S..S..S.","...........S....","........kwk.....",".......kwk......","......kwk.......",".....kwk........","....kwk.........","...kwk..........","..kwk...........",".kwk............","kk.............."] },
    prog:{ on:{ use:[{a:"shoot",pr:"snowball",v:3,hit:[{a:"particles",pt:"snowflake",who:"spot",n:30},{a:"setblock",b:"snow",who:"spot"},{a:"freeze",who:"target",s:3}]},{a:"cooldown",s:2}] } } },
  { id:"storm_staff", lesson:4, he:["מטה הסופה","לחיצה ימנית: סופת ברקים, ושלושה ברקים בנקודה שמכוונים אליה."], en:["Storm staff","Right-click: a thunderstorm, and three lightning bolts where you aim."],
    prog:{ on:{ use:[{a:"weather",w:"thunder"},{repeat:3,do:[{a:"lightning",who:"spot"},{wait:1}]},{a:"cooldown",s:30}] } } },
  { id:"portal_key", lesson:4, he:["מפתח הממדים","לחיצה ימנית: עוברים ל־Nether. ב־Nether: חוזרים הביתה."], en:["Dimension key","Right-click: go to the Nether. In the Nether: go back home."],
    prog:{ on:{ use:[{if:{c:"dim",d:"nether"},then:[{a:"dim",d:"overworld"}],else:[{a:"dim",d:"nether"}]},{a:"sound",snd:"block.portal.travel"},{a:"cooldown",s:10}] } } },
  { id:"fire_bow", lesson:4, he:["קשת האש","לחיצה ימנית: יורה כדור אש קטן. כל ירייה עולה אוכל."], en:["Fire bow","Right-click: shoots a small fireball. Every shot costs food."],
    prog:{ on:{ use:[{a:"shoot",pr:"small_fireball",v:3},{a:"hunger",n:1},{a:"cooldown",s:1}] } } },
  { id:"arrow_rain", lesson:4, he:["גשם החצים","לחיצה ימנית: עשרה חצים נופלים על הנקודה שמכוונים אליה."], en:["Arrow rain","Right-click: ten arrows fall where you aim."],
    prog:{ on:{ use:[{a:"rain",pr:"arrow",who:"spot",n:10},{a:"sound",snd:"entity.arrow.shoot"},{a:"cooldown",s:8}] } } },
  { id:"thorn_shield", lesson:4, he:["מגן הקוצים","כשמשהו פוגע בכם והמגן ביד, מי שפגע נפגע בחזרה."], en:["Thorn shield","When something hurts you while you hold the shield, it gets hurt back."],
    prog:{ on:{ hurt:[{a:"damage",who:"target",n:2},{a:"particles",pt:"crit",who:"target",n:15}] } } }
];
window.STUDIO_BLOCKS = { mount, unmount, compile, DEFS, CATS, toBlocks, readable, loadInto, LISTS, lint, EXAMPLES, format };
})();
