# Twice a second while the sorting quest is open: look into the two chests.
execute unless score #stage islands matches 1 run return 0
function islands:lesson/1/sort/one {id:"minecraft:oak_sapling",key:"sapling",gx:5,bx:7,slot:0}
function islands:lesson/1/sort/one {id:"minecraft:poppy",key:"flower",gx:5,bx:7,slot:1}
function islands:lesson/1/sort/one {id:"minecraft:cod_bucket",key:"fish",gx:5,bx:7,slot:2}
function islands:lesson/1/sort/one {id:"minecraft:stone",key:"stone",gx:7,bx:5,slot:3}
function islands:lesson/1/sort/one {id:"minecraft:water_bucket",key:"water",gx:7,bx:5,slot:4}
function islands:lesson/1/sort/one {id:"minecraft:bone",key:"bone",gx:7,bx:5,slot:5}
function islands:lesson/1/sort/one {id:"minecraft:feather",key:"feather",gx:7,bx:5,slot:6}
function islands:lesson/1/sort/debate {id:"minecraft:oak_log",key:"log"}
function islands:lesson/1/sort/debate {id:"minecraft:white_wool",key:"wool"}
function islands:lesson/1/sort/debate {id:"minecraft:turtle_egg",key:"egg"}
scoreboard players set #sorted islands 0
scoreboard players operation #sorted islands += #s_sapling islands
scoreboard players operation #sorted islands += #s_flower islands
scoreboard players operation #sorted islands += #s_fish islands
scoreboard players operation #sorted islands += #s_stone islands
scoreboard players operation #sorted islands += #s_water islands
scoreboard players operation #sorted islands += #s_bone islands
scoreboard players operation #sorted islands += #s_feather islands
scoreboard players operation #sorted islands += #s_log islands
scoreboard players operation #sorted islands += #s_wool islands
scoreboard players operation #sorted islands += #s_egg islands
execute unless score #sorted islands = #sorted_shown islands run function islands:lesson/1/sort/show
execute if score #sorted islands matches 10.. run return run function islands:lesson/1/sort/done
schedule function islands:lesson/1/sort/check 10t
