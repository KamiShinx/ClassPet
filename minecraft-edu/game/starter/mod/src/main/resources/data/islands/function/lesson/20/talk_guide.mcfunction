# The player (@s) talks to the commander. What she says depends on where the lesson is.
execute if score #stage islands matches 0 run dialog show @s islands:space/guide
execute if score #stage islands matches 1 run function islands:lesson/20/teach/talk
execute if score #stage islands matches 2 run dialog show @s islands:space/guide_lab
execute if score #stage islands matches 3 run dialog show @s islands:space/guide_wait_max
execute if score #stage islands matches 4 run dialog show @s islands:space/quiz
execute if score #stage islands matches 5.. run dialog show @s islands:space/after
