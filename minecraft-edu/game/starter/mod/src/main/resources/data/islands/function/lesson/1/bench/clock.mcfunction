# The clock on the test bench was clicked (as the player).
scoreboard players set #cancel islands 1
execute if score #stage islands matches ..2 run return run title @s actionbar {text:"הניסוי עוד לא מוכן. קודם מתייגים בעלי חיים וממיינים ממצאים.",color:"gray"}
execute if score #stage islands matches 4.. run return run title @s actionbar {text:"הניסוי הסתיים. התוצאות במחברת: מקש N.",color:"gray"}
execute if score #week islands matches 2 run return run dialog show @s islands:l1/bench_table
execute if score #week islands matches 1 run return 0
scoreboard players set #week islands 1
scoreboard players set #spin islands 0
title @a times 5 100 10
title @a subtitle {text:"",color:"white"}
title @a title {text:"עובר חודש...",color:"yellow"}
function islands:lesson/1/bench/spin
