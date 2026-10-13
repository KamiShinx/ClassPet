# The player shows Sam an animal (right-click). Which one is it, and is it the one he asked for?
execute if entity @e[tag=islands_target,type=minecraft:sheep] run return run function islands:lesson/1/sam/judge {en:"a sheep",he:"כבשה",n:0}
execute if entity @e[tag=islands_target,type=minecraft:cow] run return run function islands:lesson/1/sam/judge {en:"a cow",he:"פרה",n:0}
execute if entity @e[tag=islands_target,type=minecraft:pig] run return run function islands:lesson/1/sam/judge {en:"a pig",he:"חזיר",n:0}
execute if entity @e[tag=islands_target,type=minecraft:chicken] run return run function islands:lesson/1/sam/judge {en:"a chicken",he:"תרנגולת",n:1}
execute if entity @e[tag=islands_target,type=minecraft:horse] run return run function islands:lesson/1/sam/judge {en:"a horse",he:"סוס",n:0}
execute if entity @e[tag=islands_target,type=minecraft:camel] run return run function islands:lesson/1/sam/judge {en:"a camel",he:"גמל",n:3}
execute if entity @e[tag=islands_target,type=minecraft:rabbit] run return run function islands:lesson/1/sam/judge {en:"a rabbit",he:"ארנב",n:0}
execute if entity @e[tag=islands_target,type=minecraft:armadillo] run return run function islands:lesson/1/sam/judge {en:"an armadillo",he:"ארמדיל",n:0}
execute if entity @e[tag=islands_target,type=minecraft:goat] run return run function islands:lesson/1/sam/judge {en:"a goat",he:"עז הרים",n:0}
execute if entity @e[tag=islands_target,type=minecraft:fox] run return run function islands:lesson/1/sam/judge {en:"a fox",he:"שועל",n:0}
execute if entity @e[tag=islands_target,type=minecraft:frog] run return run function islands:lesson/1/sam/judge {en:"a frog",he:"צפרדע",n:0}
execute if entity @e[tag=islands_target,type=minecraft:cod] run return run function islands:lesson/1/sam/judge {en:"a fish",he:"דג בקלה",n:2}
execute if entity @e[tag=islands_target,type=minecraft:salmon] run return run function islands:lesson/1/sam/judge {en:"a fish",he:"דג סלמון",n:2}
