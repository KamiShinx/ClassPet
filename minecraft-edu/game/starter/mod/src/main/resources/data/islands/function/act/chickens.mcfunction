# The slider's value is islands_act - 20.
scoreboard players operation #n islands = @s islands_act
scoreboard players remove #n islands 20
execute if score #n islands matches 1.. run function islands:act/chicken_loop
