# The tour ends when both are done: 8 kinds tagged, and all 7 characteristics learned.
execute unless score #stage islands matches 1 run return 0
execute if score #census islands matches 8.. run scoreboard players display name islands.q2 islands_q {text:"☑ מתייגים בעלי חיים: 8 מתוך 8",color:"green"}
execute if score #learn islands matches 7.. run scoreboard players display name islands.q7 islands_q {text:"☑ לומדים עם נועה: 7 מתוך 7 מאפיינים",color:"green"}
execute if score #census islands matches 8.. if score #learn islands matches 7.. run function islands:lesson/1/census/done
