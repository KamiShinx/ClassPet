# Build only when every corner is loaded.
execute unless loaded -48 0 -128 run return run schedule function islands:space/wait 10t
execute unless loaded -48 0 32 run return run schedule function islands:space/wait 10t
execute unless loaded 192 0 -128 run return run schedule function islands:space/wait 10t
execute unless loaded 192 0 32 run return run schedule function islands:space/wait 10t
function islands:space/build
