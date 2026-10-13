# The observation card was filled (as the player). islands_act = 1KKWD: KK the animal's number, W where, D what it did.
scoreboard players operation #v islands = @s islands_act
scoreboard players remove #v islands 10000
scoreboard players operation #k islands = #v islands
scoreboard players operation #k islands /= #100 islands
scoreboard players operation #wd islands = #v islands
scoreboard players operation #wd islands %= #100 islands
scoreboard players operation #where islands = #wd islands
scoreboard players operation #where islands /= #10 islands
scoreboard players operation #wd islands %= #10 islands
execute store result storage islands:tmp card.k int 1 run scoreboard players get #k islands
execute store result storage islands:tmp card.w int 1 run scoreboard players get #where islands
execute store result storage islands:tmp card.d int 1 run scoreboard players get #wd islands
function islands:lesson/1/census/card_save with storage islands:tmp card
execute if score #stage islands matches 1 if score #census islands matches 8.. run function islands:lesson/1/census/done
