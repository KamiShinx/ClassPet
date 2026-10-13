# The quest list at the side of the screen. Each line is a fake player; its score only sets the order (higher = upper).
# The names must not start with "#": the sidebar hides those.
scoreboard objectives add islands_q dummy {text:"משימות",color:"gold",bold:true}
scoreboard objectives modify islands_q numberformat blank
scoreboard objectives setdisplay sidebar islands_q
