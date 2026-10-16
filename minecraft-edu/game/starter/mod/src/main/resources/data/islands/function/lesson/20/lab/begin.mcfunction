# The path is done: to the lab (as the player).
scoreboard players set #stage islands 2
scoreboard players display name islands.s2 islands_q {text:"☑ שביל הכוכבים: 6 מתוך 6 תחנות",color:"green"}
scoreboard players display name islands.s3 islands_q {text:"☐ ניסוי במעבדה: קליק ימני על השעון",color:"white"}
dialog show @s islands:space/guide_lab
