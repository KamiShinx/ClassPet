# The right model (as the player).
scoreboard players set #cancel islands 1
scoreboard players add #max islands 1
playsound minecraft:entity.player.levelup master @s ~ ~ ~ 1 1.5
title @s actionbar {text:"Max: Yes! Thank you!",color:"aqua"}
execute if score #max islands matches 4.. run return run function islands:lesson/20/max/done
function islands:lesson/20/max/request
