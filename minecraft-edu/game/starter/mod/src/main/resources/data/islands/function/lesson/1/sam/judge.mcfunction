# Arguments: en (the animal in English), he (in Hebrew), n (the request it answers, or 0).
scoreboard players set #cancel islands 1
$execute if score #sam islands matches $(n) run return run function islands:lesson/1/sam/right {en:"$(en)"}
$title @s actionbar {text:"Sam: No, that is $(en). Try again!",color:"red"}
playsound minecraft:entity.villager.no master @s ~ ~ ~ 1 1.2
