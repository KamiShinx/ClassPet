# The player (@s) talks to Sam.
execute if score #sam islands matches 0 run dialog show @s islands:l1/sam_intro
execute if score #sam islands matches 1 run dialog show @s islands:l1/sam_req1
execute if score #sam islands matches 2 run dialog show @s islands:l1/sam_req2
execute if score #sam islands matches 3 run dialog show @s islands:l1/sam_req3
execute if score #sam islands matches 4.. run dialog show @s islands:l1/sam_thanks
