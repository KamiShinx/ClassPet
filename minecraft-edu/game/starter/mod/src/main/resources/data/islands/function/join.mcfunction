# A player who hasn't entered this world yet (as the player). Waits until the island is built.
execute unless score #built islands matches 1 run return run title @s actionbar {text:"האי נבנה... עוד רגע",color:"yellow"}
tag @s add islands_in
scoreboard players enable @s islands_act
function islands:island/goto_jetty
function islands:lesson/arrive
