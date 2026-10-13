# Noa and stop 4 (as Noa; the position is the stop).
execute unless entity @s[distance=..1.3] run return run function islands:path/walk
function islands:path/stand
execute at @s unless entity @a[tag=islands_in,distance=..7] run return 0
execute unless score #said_noa islands matches 4.. run title @a actionbar {text:"נועה: הגענו לתחנה. קליק ימני עליי, ואלמד אתכם משהו חדש.",color:"gold"}
execute unless score #said_noa islands matches 4.. run scoreboard players set #said_noa islands 4
