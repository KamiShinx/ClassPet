# Build only when every corner of the island is loaded.
execute unless loaded -80 -60 -80 run return run schedule function islands:island/wait 10t
execute unless loaded 80 -60 -80 run return run schedule function islands:island/wait 10t
execute unless loaded -80 -60 80 run return run schedule function islands:island/wait 10t
execute unless loaded 80 -60 80 run return run schedule function islands:island/wait 10t
function islands:island/build
