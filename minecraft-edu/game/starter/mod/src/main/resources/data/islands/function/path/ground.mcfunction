# Keeps the character on the ground: step up out of a block, drop when there is air below, stay on top of water.
execute at @s unless block ~ ~ ~ #islands:passable run tp @s ~ ~1 ~
execute at @s unless block ~ ~ ~ #islands:passable run tp @s ~ ~1 ~
execute at @s if block ~ ~ ~ minecraft:water run tp @s ~ ~0.5 ~
execute at @s if block ~ ~-0.5 ~ #islands:passable unless block ~ ~-0.5 ~ minecraft:water run tp @s ~ ~-0.5 ~
