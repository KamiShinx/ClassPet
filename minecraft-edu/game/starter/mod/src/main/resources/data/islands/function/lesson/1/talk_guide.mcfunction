# The player (@s) talks to Noa. What she says depends on where the lesson is.
execute if score #stage islands matches 0 run dialog show @s islands:l1/guide
execute if score #stage islands matches 1 run dialog show @s islands:l1/guide_hint
execute if score #stage islands matches 2.. run dialog show @s islands:l1/guide_done
