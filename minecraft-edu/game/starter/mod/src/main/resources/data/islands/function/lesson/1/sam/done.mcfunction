# Sam has his three animals: back to Noa (she is right behind you).
scoreboard players set #stage islands 5
scoreboard players display name islands.q5 islands_q {text:"☑ עוזרים לסם: 3 מתוך 3",color:"green"}
scoreboard players set islands.q6 islands_q 4
scoreboard players display name islands.q6 islands_q {text:"☐ מדברים עם נועה",color:"white"}
schedule function islands:lesson/1/sam/thanks 50t
