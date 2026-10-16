# "Put on the suit and go" (as the player): the suit, and the tour starts.
execute unless score #stage islands matches 0 run return 0
item replace entity @s armor.head with minecraft:glass
item replace entity @s armor.chest with minecraft:leather_chestplate[minecraft:dyed_color=16383998]
item replace entity @s armor.legs with minecraft:leather_leggings[minecraft:dyed_color=16383998]
item replace entity @s armor.feet with minecraft:leather_boots[minecraft:dyed_color=16383998]
scoreboard players set #stage islands 1
scoreboard players set #wp_cmd islands 1
scoreboard players display name islands.s1 islands_q {text:"☑ מדברים עם מפקדת הבסיס",color:"green"}
scoreboard players display name islands.s2 islands_q {text:"☐ שביל הכוכבים: 0 מתוך 6 תחנות",color:"white"}
title @s actionbar {text:"הולכים אחרי רוני לתחנה הראשונה",color:"gold"}
