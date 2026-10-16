# The commander and stop 2 (as her; the position is the stop).
execute unless entity @s[distance=..1.3] run return run function islands:path/walk
function islands:path/stand
execute at @s unless entity @a[tag=islands_in,distance=..8] run return 0
execute unless score #said_cmd islands matches 2.. run title @a actionbar {text:"רוני: הגענו לתחנה 2. קליק ימני עליי.",color:"gold"}
execute unless score #said_cmd islands matches 2.. run scoreboard players set #said_cmd islands 2
