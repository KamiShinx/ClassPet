# The player (@s) talks to the commander during the tour: the question of the stop she is at, if it is still open.
execute if score #wp_cmd islands matches 1 if score #learn islands matches 0 at @s if entity @e[tag=guide,distance=..9] run return run dialog show @s islands:space/teach_0
execute if score #wp_cmd islands matches 2 if score #learn islands matches 1 at @s if entity @e[tag=guide,distance=..9] run return run dialog show @s islands:space/teach_1
execute if score #wp_cmd islands matches 3 if score #learn islands matches 2 at @s if entity @e[tag=guide,distance=..9] run return run dialog show @s islands:space/teach_2
execute if score #wp_cmd islands matches 4 if score #learn islands matches 3 at @s if entity @e[tag=guide,distance=..9] run return run dialog show @s islands:space/teach_3
execute if score #wp_cmd islands matches 5 if score #learn islands matches 4 at @s if entity @e[tag=guide,distance=..9] run return run dialog show @s islands:space/teach_4
execute if score #wp_cmd islands matches 6 if score #learn islands matches 5 at @s if entity @e[tag=guide,distance=..9] run return run dialog show @s islands:space/teach_5
dialog show @s islands:space/guide_walk
