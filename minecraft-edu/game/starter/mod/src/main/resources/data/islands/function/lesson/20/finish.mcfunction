# "Finish the tour" (as the player).
title @s times 10 70 20
title @s subtitle {text:"סיימתם את הסיור בבסיס הירח",color:"white"}
title @s title {text:"כל הכבוד!",color:"gold",bold:true}
execute at @s run particle minecraft:end_rod ~ ~1 ~ 1 1 1 0.05 60
playsound minecraft:ui.toast.challenge_complete master @s ~ ~ ~ 1 1
