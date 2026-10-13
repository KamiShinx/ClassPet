# The table was sent (as the player). islands_act = 2 and then one digit for each row.
execute unless score #stage islands matches 3 run return 0
execute if score @s islands_act matches 212333 run return run function islands:lesson/1/bench/done
title @s actionbar {text:"יש טעות. קליק ימני על השעון, ובודקים שוב.",color:"red"}
playsound minecraft:entity.villager.no master @s ~ ~ ~ 1 1
