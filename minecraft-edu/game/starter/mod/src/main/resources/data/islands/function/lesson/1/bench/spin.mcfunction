# The sun races across the sky: a month in a few seconds.
time add 3000
scoreboard players add #spin islands 1
execute if score #spin islands matches ..55 run return run schedule function islands:lesson/1/bench/spin 2t
function islands:lesson/1/bench/result
