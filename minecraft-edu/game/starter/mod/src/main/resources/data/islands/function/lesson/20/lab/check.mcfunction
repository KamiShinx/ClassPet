# The lab table was sent (as the player). islands_act = 7 and then one digit for each answer.
execute unless score #stage islands matches 2 run return 0
execute unless score @s islands_act matches 7321 run return run title @s actionbar {text:"יש טעות. קליק ימני על השעון, ובודקים שוב.",color:"red"}
scoreboard players set #stage islands 3
scoreboard players set #lab islands 3
playsound minecraft:entity.player.levelup master @s ~ ~ ~ 1 1.3
scoreboard players display name islands.s3 islands_q {text:"☑ ניסוי במעבדה",color:"green"}
scoreboard players display name islands.s4 islands_q {text:"☐ עוזרים למקס, באנגלית",color:"white"}
dialog show @s islands:space/guide_max
