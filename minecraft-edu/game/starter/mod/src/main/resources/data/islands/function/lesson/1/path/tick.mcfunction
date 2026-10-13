# Each character walks to the stop its score points at (#wp_noa, #wp_sam).
execute if score #wp_noa islands matches 0 positioned 1.5 -52 47.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_0
execute if score #wp_noa islands matches 1 positioned 0.5 -52 39.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_1
execute if score #wp_noa islands matches 2 positioned 7.5 -50 32.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_2
execute if score #wp_noa islands matches 3 positioned -10.5 -52 37.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_3
execute if score #wp_noa islands matches 4 positioned -18.5 -50 39.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_4
execute if score #wp_noa islands matches 5 positioned -21.5 -47 6.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_5
execute if score #wp_noa islands matches 6 positioned -10.5 -41 -19.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_6
execute if score #wp_noa islands matches 7 positioned 0.5 -37 -20.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_7
execute if score #wp_noa islands matches 8 positioned 30.5 -49 8.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_8
execute if score #wp_noa islands matches 9 positioned 4.5 -50 37.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_9
execute if score #wp_noa islands matches 10 positioned -5.5 -50 37.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_10
execute if score #wp_noa islands matches 11 positioned 6.5 -50 36.5 as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_11
execute if score #wp_sam islands matches 0 positioned 8.5 -50 33.5 as @e[tag=sam,limit=1] run function islands:lesson/1/path/sam_lead
execute if score #wp_sam islands matches 1 positioned -9.5 -52 39.5 as @e[tag=sam,limit=1] run function islands:lesson/1/path/sam_lead
execute if score #wp_sam islands matches 2 positioned 0.5 -52 52.5 as @e[tag=sam,limit=1] run function islands:lesson/1/path/sam_lead
execute if score #wp_sam islands matches 3 positioned 31.5 -49 10.5 as @e[tag=sam,limit=1] run function islands:lesson/1/path/sam_lead
execute if score #wp_sam islands matches 4 positioned 2.5 -50 37.5 as @e[tag=sam,limit=1] run function islands:lesson/1/path/sam_go
