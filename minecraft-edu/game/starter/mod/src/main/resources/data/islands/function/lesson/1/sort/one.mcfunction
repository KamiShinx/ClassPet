# One find with a clear answer. Arguments: id, key, gx (x of the right chest), bx (x of the other chest), slot (its place in the barrel).
# Both chests stand at y -50, z 35.
$execute store success score #now islands if items block $(gx) -50 35 container.* $(id)
$execute if score #now islands matches 1 unless score #s_$(key) islands matches 1 positioned $(gx) -50 35 run function islands:lesson/1/sort/right
$scoreboard players operation #s_$(key) islands = #now islands
$execute if items block $(bx) -50 35 container.* $(id) run function islands:lesson/1/sort/wrong {id:"$(id)",bx:$(bx),slot:$(slot)}
