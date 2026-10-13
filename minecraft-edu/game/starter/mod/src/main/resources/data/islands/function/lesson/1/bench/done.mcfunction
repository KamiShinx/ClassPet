# The table is right: Noa sums up, and Sam arrives.
scoreboard players set #stage islands 4
scoreboard players set #wp_noa islands 11
scoreboard players set #wpmax_noa islands 11
scoreboard players display name islands.q4 islands_q {text:"☑ ניסוי: מה קורה אחרי חודש?",color:"green"}
scoreboard players set islands.q5 islands_q 4
scoreboard players display name islands.q5 islands_q {text:"☐ עוזרים לסם: 0 מתוך 3",color:"white"}
summon minecraft:mannequin 8.5 -50 33.5 {profile:{texture:"islands:entity/sam",model:"wide"},immovable:1b,hide_description:1b,Invulnerable:1b,Silent:1b,Rotation:[90f,0f],CustomName:{text:"Sam",color:"aqua"},CustomNameVisible:1b,Tags:["islands_npc","sam"]}
playsound minecraft:ui.toast.challenge_complete master @a ~ ~ ~ 1 1
dialog show @a islands:l1/guide_sam
