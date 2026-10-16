# The right answer: the stage is marked in the star log, and the commander walks on.
scoreboard players add #learn islands 1
execute at @e[tag=guide,limit=1] run particle minecraft:happy_villager ~ ~1.2 ~ 0.4 0.5 0.4 0 20
playsound minecraft:entity.player.levelup master @s ~ ~ ~ 1 1.3
title @s actionbar {text:"נכון! השלב סומן ביומן הכוכבים (מקש N).",color:"green"}
execute store result storage islands:tmp q.n int 1 run scoreboard players get #learn islands
function islands:lesson/20/teach/show_line with storage islands:tmp q
scoreboard players add #wp_cmd islands 1
execute if score #learn islands matches 6.. run function islands:lesson/20/lab/begin
