# The player (@s) talks to Noa. What she says depends on where the lesson is.
execute if score #stage islands matches 0 run dialog show @s islands:l1/guide
execute if score #stage islands matches 1 run dialog show @s islands:l1/guide_census
execute if score #stage islands matches 2 run dialog show @s islands:l1/guide_sort
execute if score #stage islands matches 3 run dialog show @s islands:l1/guide_bench
execute if score #stage islands matches 4 run dialog show @s islands:l1/guide_sam
execute if score #stage islands matches 5 run dialog show @s islands:l1/guide_done
execute if score #stage islands matches 6.. run dialog show @s islands:l1/guide_after
