# The lab clock was right-clicked (as the player).
scoreboard players set #cancel islands 1
execute if score #stage islands matches ..1 run return run title @s actionbar {text:"הניסוי עוד לא מוכן. קודם הולכים בשביל הכוכבים.",color:"gray"}
execute if score #stage islands matches 3.. run return run title @s actionbar {text:"הניסוי הסתיים. התוצאות ביומן הכוכבים: מקש N.",color:"gray"}
execute if score #lab islands matches 2 run return run dialog show @s islands:space/lab_table
execute if score #lab islands matches 1 run return 0
scoreboard players set #lab islands 1
title @a times 5 50 10
title @a subtitle {text:"עוברים מיליוני שנים...",color:"white"}
title @a title {text:"⏳",color:"yellow"}
execute as @a[tag=islands_in] at @s run playsound minecraft:block.beacon.power_select master @s ~ ~ ~ 1 0.6
schedule function islands:lesson/20/lab/step1 50t
