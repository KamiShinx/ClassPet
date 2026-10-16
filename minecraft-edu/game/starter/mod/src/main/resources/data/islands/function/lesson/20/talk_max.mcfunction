# The player (@s) talks to Max.
scoreboard players set #cancel islands 1
execute unless score #stage islands matches 3.. run return run title @s actionbar {text:"Max: Hi! The commander needs you first.",color:"aqua"}
execute if score #stage islands matches 4.. run return run dialog show @s islands:space/max_thanks
execute if score #max islands matches 0 run return run dialog show @s islands:space/max_intro
function islands:lesson/20/max/request
