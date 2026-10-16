# A right-click on an entity in the space demo (as the player; the entity has the tag islands_target).
execute if entity @e[tag=islands_target,tag=lab_clock] run return run function islands:lesson/20/lab/clock
execute if score #stage islands matches 3 if score #max islands matches 1..3 if entity @e[tag=islands_target,tag=star_mark] run function islands:lesson/20/max/show
