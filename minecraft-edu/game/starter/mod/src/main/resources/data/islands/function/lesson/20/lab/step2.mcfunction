# Supernova: the big star explodes and leaves a black hole.
function islands:space/big_hole
particle minecraft:explosion_emitter 184 -48 -50 2 2 2 0 6 force
particle minecraft:end_rod 184 -48 -50 3 3 3 0.4 300 force
execute as @a[tag=islands_in] at @s run playsound minecraft:entity.generic.explode master @s ~ ~ ~ 1 0.5
title @a subtitle {text:"הכוכב הענק התפוצץ",color:"white"}
title @a title {text:"סופרנובה!",color:"gold",bold:true}
scoreboard players set #lab islands 2
schedule function islands:lesson/20/lab/step3 60t
