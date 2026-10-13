# Lesson 1 (נוחתים באי). Runs once, right after the island is ready.
# The guide waits on the jetty. At the camp: a barrel of finds and two chests, "alive" and "not alive".
function islands:island/guide_spot
setblock 3 -50 35 minecraft:barrel[facing=up]{CustomName:{text:"חבית הממצאים"},Items:[{Slot:0b,id:"minecraft:oak_sapling",count:1,components:{"minecraft:custom_name":{text:"שתיל",italic:false}}},{Slot:1b,id:"minecraft:poppy",count:1,components:{"minecraft:custom_name":{text:"פרח",italic:false}}},{Slot:2b,id:"minecraft:cod_bucket",count:1,components:{"minecraft:custom_name":{text:"דג בדלי",italic:false}}},{Slot:3b,id:"minecraft:stone",count:1,components:{"minecraft:custom_name":{text:"אבן",italic:false}}},{Slot:4b,id:"minecraft:water_bucket",count:1,components:{"minecraft:custom_name":{text:"דלי מים",italic:false}}},{Slot:5b,id:"minecraft:bone",count:1,components:{"minecraft:custom_name":{text:"עצם",italic:false}}},{Slot:6b,id:"minecraft:feather",count:1,components:{"minecraft:custom_name":{text:"נוצה",italic:false}}},{Slot:7b,id:"minecraft:oak_log",count:1,components:{"minecraft:custom_name":{text:"בול עץ",italic:false}}},{Slot:8b,id:"minecraft:white_wool",count:1,components:{"minecraft:custom_name":{text:"צמר",italic:false}}},{Slot:9b,id:"minecraft:turtle_egg",count:1,components:{"minecraft:custom_name":{text:"ביצה",italic:false}}}]}
setblock 5 -50 35 minecraft:chest[facing=south]{CustomName:{text:"חי"}}
setblock 7 -50 35 minecraft:chest[facing=south]{CustomName:{text:"לא חי"}}
summon minecraft:text_display 3.5 -48.7 35.5 {text:{text:"חבית הממצאים",color:"gold",bold:true},billboard:"center",see_through:0b,transformation:{translation:[0f,0f,0f],left_rotation:[0f,0f,0f,1f],scale:[1.6f,1.6f,1.6f],right_rotation:[0f,0f,0f,1f]},Tags:["islands_l1"]}
summon minecraft:text_display 5.5 -48.7 35.5 {text:{text:"חי",color:"green",bold:true},billboard:"center",see_through:0b,transformation:{translation:[0f,0f,0f],left_rotation:[0f,0f,0f,1f],scale:[1.6f,1.6f,1.6f],right_rotation:[0f,0f,0f,1f]},Tags:["islands_l1"]}
summon minecraft:text_display 7.5 -48.7 35.5 {text:{text:"לא חי",color:"gray",bold:true},billboard:"center",see_through:0b,transformation:{translation:[0f,0f,0f],left_rotation:[0f,0f,0f,1f],scale:[1.6f,1.6f,1.6f],right_rotation:[0f,0f,0f,1f]},Tags:["islands_l1"]}
scoreboard players set #stage islands 0
function islands:quest/setup
scoreboard players set islands.q1 islands_q 9
scoreboard players display name islands.q1 islands_q {text:"☐ מדברים עם נועה",color:"white"}
