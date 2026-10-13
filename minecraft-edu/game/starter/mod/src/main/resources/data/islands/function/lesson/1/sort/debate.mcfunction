# A find with no single right answer (the log, the wool, the egg): either chest counts, and the class talks about it.
$execute store success score #now islands if items block 5 -50 35 container.* $(id)
$execute if score #now islands matches 0 store success score #now islands if items block 7 -50 35 container.* $(id)
$execute if score #now islands matches 1 unless score #s_$(key) islands matches 1 run function islands:lesson/1/sort/debated
$scoreboard players operation #s_$(key) islands = #now islands
