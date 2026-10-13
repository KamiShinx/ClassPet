# Noa and stop 2 (as Noa; the position is the stop).
execute unless entity @s[distance=..1.3] run return run function islands:path/walk
function islands:path/stand
execute at @s unless entity @a[tag=islands_in,distance=..7] run return 0
execute unless score #said_noa islands matches 2.. run title @a actionbar {text:"נועה: יש כאן משהו לראות. קליק ימני עליי.",color:"gold"}
execute unless score #said_noa islands matches 2.. run scoreboard players set #said_noa islands 2
