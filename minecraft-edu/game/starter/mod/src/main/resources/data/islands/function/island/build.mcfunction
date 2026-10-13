# Builds the code-made test island, then starts the lesson. A hand-built map would skip this.
function islands:island/terrain
function islands:island/biomes
function islands:island/details
function islands:island/camp
function islands:island/places
function islands:island/animals
function islands:island/spawn
scoreboard players set #built islands 1
scoreboard players reset #building islands
function islands:lesson/start
