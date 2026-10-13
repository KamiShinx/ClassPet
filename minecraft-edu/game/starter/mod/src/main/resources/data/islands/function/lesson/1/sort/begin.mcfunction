# The button "יוצאים למחנה" in Noa's first talk.
execute unless score #stage islands matches 0 run return 0
scoreboard players set #stage islands 1
scoreboard players display name islands.q1 islands_q {text:"☑ מדברים עם נועה",color:"green"}
scoreboard players set islands.q2 islands_q 8
scoreboard players set #sorted islands 0
scoreboard players set #sorted_shown islands -1
title @a actionbar {text:"הולכים בשביל למחנה. לוקחים ממצא מהחבית.",color:"yellow"}
function islands:lesson/1/sort/check
