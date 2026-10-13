summon minecraft:chicken 3 -50 34
scoreboard players remove #n islands 1
execute if score #n islands matches 1.. run function islands:act/chicken_loop
