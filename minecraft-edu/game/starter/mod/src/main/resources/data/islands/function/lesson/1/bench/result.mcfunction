# What a week did to each thing on the bench.
time set 1000
fill -8 -49 35 -8 -48 35 minecraft:oak_log
fill -9 -47 34 -7 -47 36 minecraft:oak_leaves[persistent=true] keep
setblock -8 -46 35 minecraft:oak_leaves[persistent=true]
kill @e[tag=bench_label_sapling]
particle minecraft:happy_villager -8.5 -48 35.5 0.6 1 0.6 0 30
kill @e[tag=bench_egg]
summon minecraft:chicken -6.5 -49 35.5 {Age:-24000,NoAI:1b,Tags:["islands_l1","bench_chick"]}
particle minecraft:happy_villager -6.5 -48.5 35.5 0.3 0.3 0.3 0 20
playsound minecraft:entity.chicken.egg master @a -6 -50 35 1 1
particle minecraft:smoke -5.5 -48.4 35.5 0.2 0.2 0.2 0 8
particle minecraft:smoke -4.5 -48.4 35.5 0.2 0.2 0.2 0 8
particle minecraft:smoke -3.5 -48.4 35.5 0.2 0.2 0.2 0 8
scoreboard players set #week islands 2
title @a title {text:"עבר חודש",color:"green"}
title @a subtitle {text:"מסתכלים על השולחן. מה השתנה?",color:"white"}
schedule function islands:lesson/1/bench/table 70t
