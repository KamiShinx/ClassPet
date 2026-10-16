# The commander walks to the stop #wp_cmd points at.
execute if score #wp_cmd islands matches 0 positioned 0.5 -54 6.5 as @e[tag=guide,limit=1] run function islands:lesson/20/path/cmd_0
execute if score #wp_cmd islands matches 1 positioned 30.5 -54 -42.5 as @e[tag=guide,limit=1] run function islands:lesson/20/path/cmd_1
execute if score #wp_cmd islands matches 2 positioned 54.5 -54 -42.5 as @e[tag=guide,limit=1] run function islands:lesson/20/path/cmd_2
execute if score #wp_cmd islands matches 3 positioned 74.5 -54 -42.5 as @e[tag=guide,limit=1] run function islands:lesson/20/path/cmd_3
execute if score #wp_cmd islands matches 4 positioned 100.5 -54 -42.5 as @e[tag=guide,limit=1] run function islands:lesson/20/path/cmd_4
execute if score #wp_cmd islands matches 5 positioned 128.5 -54 -42.5 as @e[tag=guide,limit=1] run function islands:lesson/20/path/cmd_5
execute if score #wp_cmd islands matches 6 positioned 156.5 -54 -42.5 as @e[tag=guide,limit=1] run function islands:lesson/20/path/cmd_6
execute if score #wp_cmd islands matches 7 positioned 172.5 -54 -42.5 as @e[tag=guide,limit=1] run function islands:lesson/20/path/cmd_7
