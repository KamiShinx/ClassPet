# The button in Noa's first talk: the census starts, and Noa walks with the player.
execute unless score #stage islands matches 0 run return 0
scoreboard players set #stage islands 1
scoreboard players set #wpmax_noa islands 8
scoreboard players display name islands.q1 islands_q {text:"☑ מדברים עם נועה",color:"green"}
scoreboard players set islands.q2 islands_q 8
function islands:lesson/1/census/show
title @a actionbar {text:"מחזיקים את התג ביד: קליק ימני על בעל חיים.",color:"yellow"}
