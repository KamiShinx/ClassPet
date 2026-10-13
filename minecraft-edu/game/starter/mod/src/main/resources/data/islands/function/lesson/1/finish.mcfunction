# The button at the end of Noa's last talk.
execute unless score #stage islands matches 5 run return 0
scoreboard players set #stage islands 6
scoreboard players display name islands.q6 islands_q {text:"☑ סיימתם את שיעור 1",color:"green"}
title @a times 10 80 20
title @a subtitle {text:"סיימתם את שיעור 1. להתראות בשיעור הבא",color:"white"}
title @a title {text:"כל הכבוד!",color:"green",bold:true}
execute at @a[tag=islands_in,limit=1] run summon minecraft:firework_rocket ~ ~2 ~ {LifeTime:20,FireworksItem:{id:"minecraft:firework_rocket",count:1,components:{"minecraft:fireworks":{flight_duration:1,explosions:[{shape:"large_ball",colors:[I;3066993,16766720]}]}}}}
