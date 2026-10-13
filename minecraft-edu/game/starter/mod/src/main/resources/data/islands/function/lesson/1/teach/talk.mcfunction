# The player (@s) talks to Noa during the tour: the talk of the stop she is at, if its question is still open.
execute if score #wp_noa islands matches 2 if score #learn islands matches 0 run return run dialog show @s islands:l1/teach_0
execute if score #wp_noa islands matches 3 if score #learn islands matches 1 run return run dialog show @s islands:l1/teach_1
execute if score #wp_noa islands matches 4 if score #learn islands matches 2 run return run dialog show @s islands:l1/teach_2
execute if score #wp_noa islands matches 5 if score #learn islands matches 3 run return run dialog show @s islands:l1/teach_3
execute if score #wp_noa islands matches 6 if score #learn islands matches 4 run return run dialog show @s islands:l1/teach_4
execute if score #wp_noa islands matches 7 if score #learn islands matches 5 run return run dialog show @s islands:l1/teach_5
execute if score #wp_noa islands matches 8 if score #learn islands matches 6 run return run dialog show @s islands:l1/teach_6
dialog show @s islands:l1/guide_census
