# A teaching question was answered (as the player). islands_act = 3, the talk's number, the answer.
execute if score #learn islands matches 0 if score @s islands_act matches 302 run return run function islands:lesson/1/teach/right
execute if score #learn islands matches 1 if score @s islands_act matches 313 run return run function islands:lesson/1/teach/right
execute if score #learn islands matches 2 if score @s islands_act matches 322 run return run function islands:lesson/1/teach/right
execute if score #learn islands matches 3 if score @s islands_act matches 333 run return run function islands:lesson/1/teach/right
execute if score #learn islands matches 4 if score @s islands_act matches 342 run return run function islands:lesson/1/teach/right
execute if score #learn islands matches 5 if score @s islands_act matches 353 run return run function islands:lesson/1/teach/right
execute if score #learn islands matches 6 if score @s islands_act matches 362 run return run function islands:lesson/1/teach/right
dialog show @s islands:l1/teach_wrong
