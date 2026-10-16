# A dialog button ran /trigger islands_act set N (the only command kids may run). N says what to do.
#  1              = talk to the guide again
#  10..12, 20..25 = the old test panel: time of day, release 0-5 chickens
#  30, 31         = lesson 1: start the census, finish the lesson
#  40             = lesson 1: Sam's first "OK!"
#  300..399       = lesson 1: an answer to one of Noa's teaching questions (3, the talk, the answer)
#  41111..43333   = lesson 1: the quiz at the end (4 and one digit for each answer)
#  10000..19999   = lesson 1: an observation card (1KKWD)
#  200000..299999 = lesson 1: the test bench table (2ABCDE)
#  50, 51         = lesson 20 (space): start the tour, finish
#  500..599       = lesson 20: an answer to a stop's question (5, the stop, the answer)
#  60             = lesson 20: Max's first "OK!"
#  7111..7333     = lesson 20: the lab table (7 and one digit for each answer)
#  6111..6333     = lesson 20: the quiz (6 and one digit for each answer)
execute if score @s islands_act matches 1 run function islands:lesson/talk_guide
execute if score @s islands_act matches 10 run time set 1000
execute if score @s islands_act matches 11 run time set 6000
execute if score @s islands_act matches 12 run time set 18000
execute if score @s islands_act matches 20..25 run function islands:act/chickens
execute if score @s islands_act matches 30 run function islands:lesson/1/census/begin
execute if score @s islands_act matches 31 run function islands:lesson/1/finish
execute if score @s islands_act matches 40 run function islands:lesson/1/sam/begin
execute if score @s islands_act matches 300..399 run function islands:lesson/1/teach/answer
execute if score @s islands_act matches 41111..43333 run function islands:lesson/1/quiz/check
execute if score @s islands_act matches 10000..19999 run function islands:lesson/1/census/card
execute if score @s islands_act matches 200000..299999 run function islands:lesson/1/bench/check
execute if score @s islands_act matches 50 run function islands:lesson/20/begin
execute if score @s islands_act matches 51 run function islands:lesson/20/finish
execute if score @s islands_act matches 500..599 run function islands:lesson/20/teach/answer
execute if score @s islands_act matches 60 run function islands:lesson/20/max/begin
execute if score @s islands_act matches 7111..7333 run function islands:lesson/20/lab/check
execute if score @s islands_act matches 6111..6333 run function islands:lesson/20/quiz/check
scoreboard players set @s islands_act 0
scoreboard players enable @s islands_act
