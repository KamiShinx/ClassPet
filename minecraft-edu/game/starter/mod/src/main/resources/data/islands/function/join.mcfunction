# A player who hasn't entered this world yet (as the player). Waits until the island is built.
execute unless score #built islands matches 1 run return run title @s actionbar {text:"האי נבנה... עוד רגע",color:"yellow"}
tag @s add islands_in
gamemode adventure @s
scoreboard players enable @s islands_act
execute if score #lesson islands matches ..19 run function islands:island/goto_jetty
execute if score #lesson islands matches 20 run function islands:space/goto_start
function islands:lesson/arrive
