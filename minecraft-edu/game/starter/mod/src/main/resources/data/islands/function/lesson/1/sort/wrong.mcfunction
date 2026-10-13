# In the wrong chest: the find goes back to its place in the barrel, and the player gets a question to think about.
$data modify storage islands:tmp find set from block $(bx) -50 35 Items[{id:"$(id)"}]
$data modify storage islands:tmp find.Slot set value $(slot)b
data modify block 3 -50 35 Items append from storage islands:tmp find
$data remove block $(bx) -50 35 Items[{id:"$(id)"}]
playsound minecraft:entity.villager.no master @a 3 -50 35 1 1
title @a actionbar {text:"הממצא חזר לחבית. הוא גדל? הוא צריך מזון?",color:"red"}
