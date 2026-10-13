# The player (@s) right-clicked an entity. It carries the tag islands_target while this runs (LessonEvents.java).
# Set "#cancel islands" to 1 to stop the game's own reaction to the click.
execute if entity @e[tag=islands_target,tag=guide] run return run function islands:event/talk_guide
execute if entity @e[tag=islands_target,tag=sam] run return run function islands:event/talk_sam
execute if score #lesson islands matches 1 run function islands:lesson/1/use_entity
