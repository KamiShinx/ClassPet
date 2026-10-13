# The player right-clicked something with the tag in hand. Which animal is it?
scoreboard players set #cancel islands 1
execute if entity @e[tag=islands_target,type=minecraft:sheep] run return run function islands:lesson/1/census/tag {kind:"sheep",n:1,he:"כבשה"}
execute if entity @e[tag=islands_target,type=minecraft:cow] run return run function islands:lesson/1/census/tag {kind:"cow",n:2,he:"פרה"}
execute if entity @e[tag=islands_target,type=minecraft:pig] run return run function islands:lesson/1/census/tag {kind:"pig",n:3,he:"חזיר"}
execute if entity @e[tag=islands_target,type=minecraft:chicken] run return run function islands:lesson/1/census/tag {kind:"chicken",n:4,he:"תרנגולת"}
execute if entity @e[tag=islands_target,type=minecraft:horse] run return run function islands:lesson/1/census/tag {kind:"horse",n:5,he:"סוס"}
execute if entity @e[tag=islands_target,type=minecraft:camel] run return run function islands:lesson/1/census/tag {kind:"camel",n:6,he:"גמל"}
execute if entity @e[tag=islands_target,type=minecraft:rabbit] run return run function islands:lesson/1/census/tag {kind:"rabbit",n:7,he:"ארנב"}
execute if entity @e[tag=islands_target,type=minecraft:armadillo] run return run function islands:lesson/1/census/tag {kind:"armadillo",n:8,he:"ארמדיל"}
execute if entity @e[tag=islands_target,type=minecraft:goat] run return run function islands:lesson/1/census/tag {kind:"goat",n:9,he:"עז הרים"}
execute if entity @e[tag=islands_target,type=minecraft:fox] run return run function islands:lesson/1/census/tag {kind:"fox",n:10,he:"שועל"}
execute if entity @e[tag=islands_target,type=minecraft:frog] run return run function islands:lesson/1/census/tag {kind:"frog",n:11,he:"צפרדע"}
execute if entity @e[tag=islands_target,type=minecraft:cod] run return run function islands:lesson/1/census/tag {kind:"cod",n:12,he:"דג בקלה"}
execute if entity @e[tag=islands_target,type=minecraft:salmon] run return run function islands:lesson/1/census/tag {kind:"salmon",n:13,he:"דג סלמון"}
