# Runs once, right after the island is ready: puts the lesson's people and things in place.
execute if score #lesson islands matches 1 run function islands:lesson/1/start
execute if score #lesson islands matches 20 run function islands:lesson/20/start
