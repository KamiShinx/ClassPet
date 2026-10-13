# Noa and stop 5 (as Noa; the position is the stop).
execute unless entity @s[distance=..1.3] run return run function islands:path/walk
function islands:path/stand
execute at @s unless entity @a[tag=islands_in,distance=..7] run return 0
execute unless score #said_noa islands matches 5.. run title @a actionbar {text:"נועה: באגם גרים צפרדעים ודגי סלמון.",color:"gold"}
execute unless score #said_noa islands matches 5.. run scoreboard players set #said_noa islands 5
execute if score #wp_noa islands < #wpmax_noa islands run scoreboard players add #wp_noa islands 1
