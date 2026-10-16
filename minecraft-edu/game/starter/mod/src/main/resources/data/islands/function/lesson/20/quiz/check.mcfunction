# The quiz was sent (as the player). islands_act = 6 and then one digit for each answer.
execute unless score #stage islands matches 4 run return 0
scoreboard players operation #v islands = @s islands_act
scoreboard players remove #v islands 6000
scoreboard players set #quiz islands 0
scoreboard players operation #digit islands = #v islands
scoreboard players set #div islands 100
scoreboard players operation #digit islands /= #div islands
scoreboard players operation #digit islands %= #10 islands
execute if score #digit islands matches 2 run scoreboard players add #quiz islands 1
scoreboard players operation #digit islands = #v islands
scoreboard players set #div islands 10
scoreboard players operation #digit islands /= #div islands
scoreboard players operation #digit islands %= #10 islands
execute if score #digit islands matches 1 run scoreboard players add #quiz islands 1
scoreboard players operation #digit islands = #v islands
scoreboard players set #div islands 1
scoreboard players operation #digit islands /= #div islands
scoreboard players operation #digit islands %= #10 islands
execute if score #digit islands matches 3 run scoreboard players add #quiz islands 1
scoreboard players set #quizdone islands 1
scoreboard players set #stage islands 5
execute store result storage islands:tmp q.n int 1 run scoreboard players get #quiz islands
function islands:lesson/20/quiz/show with storage islands:tmp q
dialog show @s islands:space/done
