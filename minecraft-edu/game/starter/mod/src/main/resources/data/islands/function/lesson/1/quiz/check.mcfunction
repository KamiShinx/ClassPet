# The quiz was sent (as the player). islands_act = 4 and then one digit for each answer.
execute unless score #stage islands matches 5 run return 0
scoreboard players operation #v islands = @s islands_act
scoreboard players remove #v islands 40000
scoreboard players set #quiz islands 0
scoreboard players operation #digit islands = #v islands
scoreboard players set #div islands 1000
scoreboard players operation #digit islands /= #div islands
scoreboard players operation #digit islands %= #10 islands
scoreboard players set #qz1 islands 0
execute if score #digit islands matches 2 run scoreboard players set #qz1 islands 1
scoreboard players operation #quiz islands += #qz1 islands
scoreboard players operation #digit islands = #v islands
scoreboard players set #div islands 100
scoreboard players operation #digit islands /= #div islands
scoreboard players operation #digit islands %= #10 islands
scoreboard players set #qz2 islands 0
execute if score #digit islands matches 3 run scoreboard players set #qz2 islands 1
scoreboard players operation #quiz islands += #qz2 islands
scoreboard players operation #digit islands = #v islands
scoreboard players set #div islands 10
scoreboard players operation #digit islands /= #div islands
scoreboard players operation #digit islands %= #10 islands
scoreboard players set #qz3 islands 0
execute if score #digit islands matches 1 run scoreboard players set #qz3 islands 1
scoreboard players operation #quiz islands += #qz3 islands
scoreboard players operation #digit islands = #v islands
scoreboard players set #div islands 1
scoreboard players operation #digit islands /= #div islands
scoreboard players operation #digit islands %= #10 islands
scoreboard players set #qz4 islands 0
execute if score #digit islands matches 2 run scoreboard players set #qz4 islands 1
scoreboard players operation #quiz islands += #qz4 islands
scoreboard players set #quizdone islands 1
execute store result storage islands:tmp q.n int 1 run scoreboard players get #quiz islands
function islands:lesson/1/quiz/show with storage islands:tmp q
dialog show @s islands:l1/guide_done
