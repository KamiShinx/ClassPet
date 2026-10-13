# Sam walks ahead to the place of his request, and waits when the player falls behind (as Sam; the position is the stop).
execute unless entity @s[distance=..1.3] run return run function islands:path/walk
function islands:path/stand
