# The quest line shows how many finds are sorted.
scoreboard players operation #sorted_shown islands = #sorted islands
execute store result storage islands:tmp q.n int 1 run scoreboard players get #sorted islands
function islands:lesson/1/sort/show_line with storage islands:tmp q
