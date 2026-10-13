# A right-click on an entity in lesson 1 (as the player; the entity has the tag islands_target).
execute if entity @e[tag=islands_target,tag=bench_clock] run return run function islands:lesson/1/bench/clock
execute if score #stage islands matches 1 if items entity @s weapon.mainhand minecraft:paper[minecraft:custom_data~{islands:"tag"}] run return run function islands:lesson/1/census/try
execute if score #stage islands matches 4 if score #sam islands matches 1..3 run function islands:lesson/1/sam/show
