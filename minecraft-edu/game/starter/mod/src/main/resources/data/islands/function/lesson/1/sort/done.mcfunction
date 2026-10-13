# Every find is in a chest.
scoreboard players set #stage islands 2
scoreboard players display name islands.q2 islands_q {text:"☑ ממיינים: חי או לא חי? 10 מתוך 10",color:"green"}
scoreboard players set islands.q3 islands_q 7
scoreboard players display name islands.q3 islands_q {text:"☐ חוזרים לנועה",color:"white"}
title @a times 10 50 20
title @a subtitle {text:"חוזרים לנועה",color:"white"}
title @a title {text:"מיינתם את כל הממצאים!",color:"green",bold:true}
playsound minecraft:ui.toast.challenge_complete master @a 3 -50 35 1 1
