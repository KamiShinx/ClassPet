# Every tick.
execute as @a[tag=!islands_in] run function islands:join
execute as @a[scores={islands_act=1..}] run function islands:act
execute if score #lesson islands matches 1 if score #built islands matches 1 run function islands:lesson/1/tick
