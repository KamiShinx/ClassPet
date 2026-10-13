# Noa and stop 8 (as Noa; the position is the stop).
execute unless entity @s[distance=..1.3] run return run function islands:path/walk
function islands:path/stand
execute at @s unless entity @a[tag=islands_in,distance=..7] run return 0
execute unless score #said_noa islands matches 8.. run title @a actionbar {text:"נועה: במדבר גמלים וארנבים, ואולי גם ארמדיל.",color:"gold"}
execute unless score #said_noa islands matches 8.. run scoreboard players set #said_noa islands 8
execute if score #wp_noa islands < #wpmax_noa islands run scoreboard players add #wp_noa islands 1
