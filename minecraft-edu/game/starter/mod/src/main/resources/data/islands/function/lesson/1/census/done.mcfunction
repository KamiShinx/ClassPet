# Enough kinds are tagged: back to the camp, to the barrel of finds.
scoreboard players set #stage islands 2
scoreboard players set #wp_noa islands 9
scoreboard players set #wpmax_noa islands 9
clear @a minecraft:paper[minecraft:custom_data~{islands:"tag"}]
scoreboard players display name islands.q2 islands_q {text:"☑ מתייגים בעלי חיים: 8 מתוך 8",color:"green"}
scoreboard players set islands.q3 islands_q 7
scoreboard players set #sorted islands 0
scoreboard players set #sorted_shown islands -1
title @a times 10 60 20
title @a subtitle {text:"תייגתם 8 סוגים. חוזרים למחנה, לחבית הממצאים",color:"white"}
title @a title {text:"כל הכבוד!",color:"green",bold:true}
playsound minecraft:ui.toast.challenge_complete master @a ~ ~ ~ 1 1
function islands:lesson/1/sort/check
