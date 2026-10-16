# The commander and stop 5 (as her; the position is the stop).
execute unless entity @s[distance=..1.3] run return run function islands:path/walk
function islands:path/stand
execute at @s unless entity @a[tag=islands_in,distance=..8] run return 0
execute unless score #said_cmd islands matches 5.. run title @a actionbar {text:"רוני: הגענו לתחנה 5. קליק ימני עליי.",color:"gold"}
execute unless score #said_cmd islands matches 5.. run scoreboard players set #said_cmd islands 5
