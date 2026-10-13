# Every tick in lesson 1.
function islands:lesson/1/path/tick
# During the census the player always has the tag.
execute if score #stage islands matches 1 as @a[tag=islands_in,limit=1] unless items entity @s container.* minecraft:paper[minecraft:custom_data~{islands:"tag"}] unless items entity @s weapon.offhand minecraft:paper[minecraft:custom_data~{islands:"tag"}] run give @s minecraft:paper[minecraft:item_model="minecraft:name_tag",minecraft:custom_name={text:"תג המשלחת",italic:false},minecraft:custom_data={islands:"tag"}] 1
