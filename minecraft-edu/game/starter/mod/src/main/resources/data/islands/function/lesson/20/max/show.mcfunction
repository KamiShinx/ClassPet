# The player right-clicked a pedestal while Max is asking (as the player).
execute if score #max islands matches 1 if entity @e[tag=islands_target,tag=mark_nebula] run return run function islands:lesson/20/max/right
execute if score #max islands matches 2 if entity @e[tag=islands_target,tag=mark_redgiant] run return run function islands:lesson/20/max/right
execute if score #max islands matches 3 if entity @e[tag=islands_target,tag=mark_blackhole] run return run function islands:lesson/20/max/right
execute if entity @e[tag=islands_target,tag=mark_nebula] run title @s actionbar {text:"Max: No, that is the nebula. Try again!",color:"red"}
execute if entity @e[tag=islands_target,tag=mark_protostar] run title @s actionbar {text:"Max: No, that is the protostar. Try again!",color:"red"}
execute if entity @e[tag=islands_target,tag=mark_sunlike] run title @s actionbar {text:"Max: No, that is a star like our Sun. Try again!",color:"red"}
execute if entity @e[tag=islands_target,tag=mark_redgiant] run title @s actionbar {text:"Max: No, that is the red giant. Try again!",color:"red"}
execute if entity @e[tag=islands_target,tag=mark_whitedwarf] run title @s actionbar {text:"Max: No, that is the white dwarf. Try again!",color:"red"}
execute if entity @e[tag=islands_target,tag=mark_blackhole] run title @s actionbar {text:"Max: No, that is the black hole. Try again!",color:"red"}
