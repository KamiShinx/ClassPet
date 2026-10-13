# The button "OK!" in Sam's first talk: Sam asks for the first animal, and walks ahead to where it lives.
execute unless score #sam islands matches 0 run return 0
scoreboard players set #sam islands 1
scoreboard players set #wp_sam islands 1
dialog show @s islands:l1/sam_req1
