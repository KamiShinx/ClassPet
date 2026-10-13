# A character leads the way (as the character; the position is the stop it is walking to).
# It waits, looking back, when the player is more than 16 blocks behind.
execute at @s unless entity @a[tag=islands_in,distance=..16] run return run tp @s ~ ~ ~ facing entity @p[tag=islands_in] eyes
execute facing entity @s feet positioned as @s rotated ~ 0 run tp @s ^ ^ ^-0.23 ~180 0
function islands:path/ground
