# Every tick.
execute as @a[tag=!islands_in] run function islands:join
execute as @a[scores={islands_act=1..}] run function islands:act
execute as @e[type=minecraft:interaction,tag=islands_talk] if data entity @s interaction run function islands:talk/clicked
