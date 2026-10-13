# -*- coding: utf-8 -*-
"""Writes lesson 1's files: the quest list, the sorting station (alive / not alive) and Noa's talks.
The coordinates and the ten finds are in one place here, so change this script and run it again:
  python3 tools/gen_lesson1.py"""
import io, json, os
B = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "starter", "mod", "src", "main", "resources", "data", "islands") + "/"
def w(rel, text):
    p = B + rel; os.makedirs(os.path.dirname(p), exist_ok=True)
    io.open(p, "w", encoding="utf-8", newline="\n").write(text.lstrip("\n")); print("wrote", rel)
def wj(rel, obj): w(rel, json.dumps(obj, ensure_ascii=False, indent=2) + "\n")

FINDS, ALIVE, NOT = "3 -50 35", "5 -50 35", "7 -50 35"
# (item id, score key, Hebrew name, kind): kind a = alive, n = not alive, d = no single right answer (the class talk)
ITEMS = [
    ("minecraft:oak_sapling", "sapling", "שתיל", "a"), ("minecraft:poppy", "flower", "פרח", "a"),
    ("minecraft:cod_bucket", "fish", "דג בדלי", "a"), ("minecraft:stone", "stone", "אבן", "n"),
    ("minecraft:water_bucket", "water", "דלי מים", "n"), ("minecraft:bone", "bone", "עצם", "n"),
    ("minecraft:feather", "feather", "נוצה", "n"), ("minecraft:oak_log", "log", "בול עץ", "d"),
    ("minecraft:white_wool", "wool", "צמר", "d"), ("minecraft:turtle_egg", "egg", "ביצה", "d"),
]
N = len(ITEMS)

# ---------------- dialogs ----------------
def btn(label, n): return {"label": {"text": label}, "action": {"type": "minecraft:run_command", "command": "trigger islands_act set %d" % n}}
def msg(t): return {"type": "minecraft:plain_message", "contents": {"text": t}, "width": 300}
NOA = {"text": "נועה, ראשת המשלחת", "color": "gold"}
wj("dialog/l1/guide.json", {"type": "minecraft:multi_action", "title": NOA, "body": [
    msg("טוב שהגעתם. משלחת קודמת אספה ממצאים מכל האי, והשאירה אותם בחבית במחנה."),
    msg("אף אחד עוד לא מיין אותם. מה מהם חי, ומה לא חי? במחנה מחכים לכם שני ארגזים.")],
    "actions": [btn("יוצאים למחנה", 30)], "columns": 1})
wj("dialog/l1/guide_hint.json", {"type": "minecraft:notice", "title": NOA, "body": [
    msg("הולכים בשביל למחנה. לוקחים ממצא מהחבית, ושמים אותו בארגז המתאים: ״חי״ או ״לא חי״."),
    msg("לא בטוחים? בודקים: הוא גדל? הוא צריך מזון ומים? הוא צריך אוויר?")],
    "action": {"label": {"text": "הבנתי"}}})
wj("dialog/l1/guide_done.json", {"type": "minecraft:multi_action", "title": {"text": "סיכום שיעור 1", "color": "green"}, "body": [
    msg("מיינתם את כל עשרת הממצאים. כל הכבוד."),
    msg("שלושה מהם לא היו קלים: בול העץ, הצמר והביצה. חי או לא חי? אולי משהו שבא מצמח או מבעל חיים? על זה נדבר בכיתה.")],
    "actions": [btn("להתראות בשיעור הבא", 31)], "columns": 1})
# the old test window (time of day, chickens) moves aside; lesson 3 will use its controls
old = B + "dialog/l1/guide_test.json"

# ---------------- quest list (the sidebar) ----------------
def line(holder, text, color="white"):
    return 'scoreboard players display name %s islands_q {text:"%s",color:"%s"}' % (holder, text, color)
w("function/quest/setup.mcfunction", """
# The quest list at the side of the screen. Each line is a fake player; its score only sets the order (higher = upper).
# The names must not start with "#": the sidebar hides those.
scoreboard objectives add islands_q dummy {text:"משימות",color:"gold",bold:true}
scoreboard objectives modify islands_q numberformat blank
scoreboard objectives setdisplay sidebar islands_q
""")
w("function/quest/clear.mcfunction", """
scoreboard players reset islands.q1 islands_q
scoreboard players reset islands.q2 islands_q
scoreboard players reset islands.q3 islands_q
""")

# ---------------- lesson 1 ----------------
items_nbt = ",".join('{Slot:%db,id:"%s",count:1,components:{"minecraft:custom_name":{text:"%s",italic:false}}}' % (i, it[0], it[2]) for i, it in enumerate(ITEMS))
def label(pos, text, color):
    x, y, z = pos.split(); return 'summon minecraft:text_display %s.5 %.1f %s.5 {text:{text:"%s",color:"%s",bold:true},billboard:"center",see_through:0b,transformation:{translation:[0f,0f,0f],left_rotation:[0f,0f,0f,1f],scale:[1.6f,1.6f,1.6f],right_rotation:[0f,0f,0f,1f]},Tags:["islands_l1"]}' % (x, int(y) + 1.3, z, text, color)
w("function/lesson/1/start.mcfunction", f"""
# Lesson 1 (נוחתים באי). Runs once, right after the island is ready.
# The guide waits on the jetty. At the camp: a barrel of finds and two chests, "alive" and "not alive".
function islands:island/guide_spot
setblock {FINDS} minecraft:barrel[facing=up]{{CustomName:{{text:"חבית הממצאים"}},Items:[{items_nbt}]}}
setblock {ALIVE} minecraft:chest[facing=south]{{CustomName:{{text:"חי"}}}}
setblock {NOT} minecraft:chest[facing=south]{{CustomName:{{text:"לא חי"}}}}
{label(FINDS, "חבית הממצאים", "gold")}
{label(ALIVE, "חי", "green")}
{label(NOT, "לא חי", "gray")}
scoreboard players set #stage islands 0
function islands:quest/setup
scoreboard players set islands.q1 islands_q 9
{line("islands.q1", "☐ מדברים עם נועה")}
""")
w("function/lesson/1/talk_guide.mcfunction", """
# The player (@s) talks to Noa. What she says depends on where the lesson is.
execute if score #stage islands matches 0 run dialog show @s islands:l1/guide
execute if score #stage islands matches 1 run dialog show @s islands:l1/guide_hint
execute if score #stage islands matches 2.. run dialog show @s islands:l1/guide_done
""")
w("function/lesson/talk_guide.mcfunction", """
# Someone talks to the guide (as the player). Each lesson has its own talk.
execute if score #lesson islands matches 1 run function islands:lesson/1/talk_guide
""")
w("function/lesson/1/sort/begin.mcfunction", f"""
# The button "יוצאים למחנה" in Noa's first talk.
execute unless score #stage islands matches 0 run return 0
scoreboard players set #stage islands 1
{line("islands.q1", "☑ מדברים עם נועה", "green")}
scoreboard players set islands.q2 islands_q 8
scoreboard players set #sorted islands 0
scoreboard players set #sorted_shown islands -1
title @a actionbar {{text:"הולכים בשביל למחנה. לוקחים ממצא מהחבית.",color:"yellow"}}
function islands:lesson/1/sort/check
""")
calls = []
for i, (iid, key, name, kind) in enumerate(ITEMS):
    if kind == "d": calls.append('function islands:lesson/1/sort/debate {id:"%s",key:"%s"}' % (iid, key))
    else:
        good, bad = (ALIVE, NOT) if kind == "a" else (NOT, ALIVE)
        calls.append('function islands:lesson/1/sort/one {id:"%s",key:"%s",gx:%s,bx:%s,slot:%d}' % (iid, key, good.split()[0], bad.split()[0], i))
sums = "\n".join("scoreboard players operation #sorted islands += #s_%s islands" % it[1] for it in ITEMS)
w("function/lesson/1/sort/check.mcfunction", f"""
# Twice a second while the sorting quest is open: look into the two chests.
execute unless score #stage islands matches 1 run return 0
{chr(10).join(calls)}
scoreboard players set #sorted islands 0
{sums}
execute unless score #sorted islands = #sorted_shown islands run function islands:lesson/1/sort/show
execute if score #sorted islands matches {N}.. run return run function islands:lesson/1/sort/done
schedule function islands:lesson/1/sort/check 10t
""")
w("function/lesson/1/sort/one.mcfunction", """
# One find with a clear answer. Arguments: id, key, gx (x of the right chest), bx (x of the other chest), slot (its place in the barrel).
# Both chests stand at y -50, z 35.
$execute store success score #now islands if items block $(gx) -50 35 container.* $(id)
$execute if score #now islands matches 1 unless score #s_$(key) islands matches 1 positioned $(gx) -50 35 run function islands:lesson/1/sort/right
$scoreboard players operation #s_$(key) islands = #now islands
$execute if items block $(bx) -50 35 container.* $(id) run function islands:lesson/1/sort/wrong {id:"$(id)",bx:$(bx),slot:$(slot)}
""")
w("function/lesson/1/sort/debate.mcfunction", """
# A find with no single right answer (the log, the wool, the egg): either chest counts, and the class talks about it.
$execute store success score #now islands if items block 5 -50 35 container.* $(id)
$execute if score #now islands matches 0 store success score #now islands if items block 7 -50 35 container.* $(id)
$execute if score #now islands matches 1 unless score #s_$(key) islands matches 1 run function islands:lesson/1/sort/debated
$scoreboard players operation #s_$(key) islands = #now islands
""")
w("function/lesson/1/sort/right.mcfunction", """
# In the right chest (positioned at the chest): green sparks and a sound.
particle minecraft:happy_villager ~0.5 ~1.2 ~0.5 0.3 0.3 0.3 0 14
playsound minecraft:entity.experience_orb.pickup master @a ~ ~ ~ 1 1.2
""")
w("function/lesson/1/sort/debated.mcfunction", """
title @a actionbar {text:"מעניין! נדבר על זה בכיתה.",color:"yellow"}
playsound minecraft:block.note_block.chime master @a 5 -50 35 1 1
""")
w("function/lesson/1/sort/wrong.mcfunction", f"""
# In the wrong chest: the find goes back to its place in the barrel, and the player gets a question to think about.
$data modify storage islands:tmp find set from block $(bx) -50 35 Items[{{id:"$(id)"}}]
$data modify storage islands:tmp find.Slot set value $(slot)b
data modify block {FINDS} Items append from storage islands:tmp find
$data remove block $(bx) -50 35 Items[{{id:"$(id)"}}]
playsound minecraft:entity.villager.no master @a {FINDS} 1 1
title @a actionbar {{text:"הממצא חזר לחבית. הוא גדל? הוא צריך מזון, מים ואוויר?",color:"red"}}
""")
w("function/lesson/1/sort/show.mcfunction", """
# The quest line shows how many finds are sorted.
scoreboard players operation #sorted_shown islands = #sorted islands
execute store result storage islands:tmp q.n int 1 run scoreboard players get #sorted islands
function islands:lesson/1/sort/show_line with storage islands:tmp q
""")
w("function/lesson/1/sort/show_line.mcfunction", f"""
$scoreboard players display name islands.q2 islands_q {{text:"☐ ממיינים: חי או לא חי? $(n) מתוך {N}",color:"white"}}
""")
w("function/lesson/1/sort/done.mcfunction", f"""
# Every find is in a chest.
scoreboard players set #stage islands 2
{line("islands.q2", "☑ ממיינים: חי או לא חי? %d מתוך %d" % (N, N), "green")}
scoreboard players set islands.q3 islands_q 7
{line("islands.q3", "☐ חוזרים לנועה")}
title @a times 10 50 20
title @a subtitle {{text:"חוזרים לנועה",color:"white"}}
title @a title {{text:"מיינתם את כל הממצאים!",color:"green",bold:true}}
playsound minecraft:ui.toast.challenge_complete master @a {FINDS} 1 1
""")
w("function/lesson/1/finish.mcfunction", f"""
# The button at the end of Noa's last talk.
execute unless score #stage islands matches 2 run return 0
scoreboard players set #stage islands 3
{line("islands.q3", "☑ סיימתם את שיעור 1", "green")}
""")
print("done")
