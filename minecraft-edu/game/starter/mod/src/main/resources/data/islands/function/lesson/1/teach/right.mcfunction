# The right answer: the characteristic is marked in the notebook, and Noa walks on to the next stop.
scoreboard players add #learn islands 1
execute at @e[tag=guide,limit=1] run particle minecraft:happy_villager ~ ~1.2 ~ 0.4 0.5 0.4 0 20
playsound minecraft:entity.player.levelup master @s ~ ~ ~ 1 1.3
title @s actionbar {text:"נכון! המאפיין סומן במחברת (מקש N).",color:"green"}
execute store result storage islands:tmp q.n int 1 run scoreboard players get #learn islands
function islands:lesson/1/teach/show_line with storage islands:tmp q
execute if score #wp_noa islands < #wpmax_noa islands run scoreboard players add #wp_noa islands 1
function islands:lesson/1/census/maybe_done
