# A teaching question was answered (as the player). islands_act = 5, the stop's number, the answer.
execute if score #learn islands matches 0 if score @s islands_act matches 501 run return run function islands:lesson/20/teach/right
execute if score #learn islands matches 1 if score @s islands_act matches 513 run return run function islands:lesson/20/teach/right
execute if score #learn islands matches 2 if score @s islands_act matches 522 run return run function islands:lesson/20/teach/right
execute if score #learn islands matches 3 if score @s islands_act matches 533 run return run function islands:lesson/20/teach/right
execute if score #learn islands matches 4 if score @s islands_act matches 542 run return run function islands:lesson/20/teach/right
execute if score #learn islands matches 5 if score @s islands_act matches 553 run return run function islands:lesson/20/teach/right
dialog show @s islands:space/wrong
