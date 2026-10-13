# First start of a lesson world: keep the island's chunks loaded, then build once they are.
scoreboard players set #building islands 1
time set 1000
forceload add -80 -80 80 80
schedule function islands:island/wait 20t
