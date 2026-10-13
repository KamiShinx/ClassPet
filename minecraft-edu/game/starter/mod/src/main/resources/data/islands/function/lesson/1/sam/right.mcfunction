title @s title {text:"Yes!",color:"aqua"}
$title @s subtitle {text:"It is $(en). Thank you!",color:"white"}
title @s times 5 40 10
execute at @e[tag=islands_target,limit=1] run particle minecraft:happy_villager ~ ~1 ~ 0.4 0.4 0.4 0 16
playsound minecraft:entity.player.levelup master @s ~ ~ ~ 1 1.4
execute store result storage islands:tmp q.n int 1 run scoreboard players get #sam islands
function islands:lesson/1/sam/show_line with storage islands:tmp q
scoreboard players add #sam islands 1
scoreboard players operation #wp_sam islands = #sam islands
execute if score #sam islands matches 4.. run return run function islands:lesson/1/sam/done
schedule function islands:lesson/1/sam/next 50t
