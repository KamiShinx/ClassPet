# Every find is in a chest: on to the test bench.
scoreboard players set #stage islands 3
scoreboard players set #wp_noa islands 10
scoreboard players set #wpmax_noa islands 10
scoreboard players display name islands.q3 islands_q {text:"☑ ממיינים: חי או לא חי? 10 מתוך 10",color:"green"}
scoreboard players set islands.q4 islands_q 6
scoreboard players display name islands.q4 islands_q {text:"☐ ניסוי: מה קורה אחרי חודש?",color:"white"}
title @a times 10 60 20
title @a subtitle {text:"מיינתם הכול. עכשיו הולכים לנועה, ליד שולחן הניסוי",color:"white"}
title @a title {text:"יפה מאוד!",color:"green",bold:true}
playsound minecraft:ui.toast.challenge_complete master @a 3 -50 35 1 1
