# One kind of animal is tagged (arguments: kind, n = its number, he = its Hebrew name).
$execute if score #c_$(kind) islands matches 1 run return run title @s actionbar {text:"$(he): כבר תייגתם. מחפשים סוג אחר.",color:"gray"}
$scoreboard players set #c_$(kind) islands 1
scoreboard players add #census islands 1
$data merge entity @e[tag=islands_target,limit=1] {CustomName:{text:"$(he) ✔",color:"green"},CustomNameVisible:1b}
execute at @e[tag=islands_target,limit=1] run particle minecraft:happy_villager ~ ~1 ~ 0.4 0.4 0.4 0 16
playsound minecraft:entity.experience_orb.pickup master @s ~ ~ ~ 1 1.2
function islands:lesson/1/census/show
$dialog show @s islands:l1/card/$(kind)
