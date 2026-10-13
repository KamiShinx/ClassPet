# Someone right-clicked a talk spot (an interaction entity tagged islands_talk). As the spot.
execute if entity @s[tag=talk_guide] on target run dialog show @s islands:l1/guide
data remove entity @s interaction
