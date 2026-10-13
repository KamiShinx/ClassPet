# A dialog button ran /trigger islands_act set N (the only command kids may run). N says what to do.
#  1      = talk to the guide again
#  30     = lesson 1: start the sorting quest; 31 = lesson 1: finish
#  10..12 = time of day (morning, noon, night)
#  20..25 = release 0-5 chickens at the camp (the slider)
execute if score @s islands_act matches 1 run function islands:lesson/talk_guide
execute if score @s islands_act matches 30 run function islands:lesson/1/sort/begin
execute if score @s islands_act matches 31 run function islands:lesson/1/finish
execute if score @s islands_act matches 10 run time set 1000
execute if score @s islands_act matches 11 run time set 6000
execute if score @s islands_act matches 12 run time set 18000
execute if score @s islands_act matches 20..25 run function islands:act/chickens
scoreboard players set @s islands_act 0
scoreboard players enable @s islands_act
