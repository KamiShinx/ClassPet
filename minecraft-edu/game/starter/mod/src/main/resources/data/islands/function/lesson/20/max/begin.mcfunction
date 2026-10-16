# Max's "OK!" (as the player): his first request.
execute unless score #stage islands matches 3 run return 0
execute unless score #max islands matches 0 run return 0
scoreboard players set #max islands 1
function islands:lesson/20/max/request
