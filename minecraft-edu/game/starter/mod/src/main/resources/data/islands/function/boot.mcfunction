# Called by the mod when a lesson world starts (LessonStart.java), after it set #lesson islands = the lesson number.
scoreboard objectives add islands dummy
scoreboard objectives add islands_act trigger
gamerule max_command_sequence_length 1000000
gamerule max_block_modifications 1000000
gamerule spawn_mobs false
gamerule spawn_monsters false
gamerule spawn_phantoms false
gamerule spawn_wandering_traders false
gamerule spawn_patrols false
gamerule advance_weather false
gamerule advance_time false
gamerule keep_inventory true
gamerule fall_damage false
gamerule show_advancement_messages false
gamerule command_block_output false
gamerule send_command_feedback false
weather clear
# Adventure mode: kids explore and talk, they don't dig the island up.
defaultgamemode adventure
execute if score #lesson islands matches ..19 unless score #built islands matches 1 unless score #building islands matches 1 run function islands:island/start
# lesson 20 is the space demo: a moon instead of an island (tools/gen_space.py)
execute if score #lesson islands matches 20 unless score #built islands matches 1 unless score #building islands matches 1 run function islands:space/start
