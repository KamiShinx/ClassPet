# The button at the end of Noa's last talk.
execute unless score #stage islands matches 2 run return 0
scoreboard players set #stage islands 3
scoreboard players display name islands.q3 islands_q {text:"☑ סיימתם את שיעור 1",color:"green"}
