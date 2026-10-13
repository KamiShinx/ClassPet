#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Writes every file of lesson 1 (functions and dialogs). Coordinates, animals, finds and all the texts are here,
in one place: change this script and run it again.

  python3 tools/gen_lesson1.py

The lesson, in stages (score "#stage islands"):
  0  land, talk to Noa                 1  census: tag 8 kinds of animals (Noa walks with you)
  2  sort 10 finds: alive / not alive  3  test bench: a week passes, fill the table
  4  Sam (English): show him 3 animals 5  talk to Noa, summary               6  finished
A right-click on an entity arrives from the mod (LessonEvents.java) as islands:event/use_entity.
"""
import io, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import gen_island   # for the height of the ground at each stop

B = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "starter", "mod", "src", "main", "resources", "data", "islands") + "/"


def w(rel, text):
    p = B + rel
    os.makedirs(os.path.dirname(p), exist_ok=True)
    io.open(p, "w", encoding="utf-8", newline="\n").write(text.strip("\n") + "\n")


def wj(rel, obj):
    w(rel, json.dumps(obj, ensure_ascii=False, indent=2))


# ------------------------------------------------------------------ the data of the lesson
FINDS, ALIVE, NOT = "3 -50 35", "5 -50 35", "7 -50 35"
# (item id, score key, Hebrew name, kind): a = alive, n = not alive, d = no single right answer (the class talk)
ITEMS = [
    ("minecraft:oak_sapling", "sapling", "שתיל", "a"), ("minecraft:poppy", "flower", "פרח", "a"),
    ("minecraft:cod_bucket", "fish", "דג בדלי", "a"), ("minecraft:stone", "stone", "אבן", "n"),
    ("minecraft:water_bucket", "water", "דלי מים", "n"), ("minecraft:bone", "bone", "עצם", "n"),
    ("minecraft:feather", "feather", "נוצה", "n"), ("minecraft:oak_log", "log", "בול עץ", "d"),
    ("minecraft:white_wool", "wool", "צמר", "d"),
    # a clay ball that looks like an egg: a real egg can be thrown away
    ("minecraft:clay_ball", "egg", "ביצה", "d"),
]
N = len(ITEMS)
# (key, entity id, Hebrew, English with its article, which of Sam's requests it answers)
ANIMALS = [
    ("sheep", "minecraft:sheep", "כבשה", "a sheep", 0), ("cow", "minecraft:cow", "פרה", "a cow", 0),
    ("pig", "minecraft:pig", "חזיר", "a pig", 0), ("chicken", "minecraft:chicken", "תרנגולת", "a chicken", 1),
    ("horse", "minecraft:horse", "סוס", "a horse", 0), ("camel", "minecraft:camel", "גמל", "a camel", 3),
    ("rabbit", "minecraft:rabbit", "ארנב", "a rabbit", 0), ("armadillo", "minecraft:armadillo", "ארמדיל", "an armadillo", 0),
    ("goat", "minecraft:goat", "עז הרים", "a goat", 0), ("fox", "minecraft:fox", "שועל", "a fox", 0),
    ("frog", "minecraft:frog", "צפרדע", "a frog", 0), ("cod", "minecraft:cod", "דג בקלה", "a fish", 2),
    ("salmon", "minecraft:salmon", "דג סלמון", "a fish", 2),
]
CENSUS_GOAL = 8
PLACES_HE = ["אחו", "יער", "מדבר", "הר", "אגם/ים"]          # option ids 1..5
SEEN_HE = ["תנועה", "הזנה", "נשימה", "תקשורת עם הסביבה"]   # a characteristic of life the kid saw; option ids 1..4
# the test bench: (key, x, Hebrew, what happens after a week: 1 grew, 2 hatched, 3 nothing)
BENCH_Z, BENCH_Y = 35, -50
BENCH = [("sapling", -8, "שתיל", 1), ("egg", -6, "ביצה", 2), ("stone", -5, "אבן", 3), ("wool", -4, "צמר", 3), ("log", -3, "בול עץ", 3)]
BENCH_ANSWER = "2" + "".join(str(b[3]) for b in BENCH)   # the value the table sends when every row is right
CLOCK = "-6 -50 33"
SAM_AT = "8.5 -50 33.5"
# Noa's route across the island: (x, z, on the jetty?, what she says when the player reaches her there).
# Stops 1..TOUR_END are the census tour; she walks to the next stop when the player comes close.
NOA_ROUTE = [
    (1, 47, True, None),
    (0, 39, False, "זה המחנה שלנו. עוד נחזור אליו."),
    (7, 32, False, "בחווה שבאחו יש כבשה, פרה וחזיר. מתייגים!"),
    (-10, 37, False, "תרנגולות. מתקרבים, ומתייגים אחת."),
    (-18, 39, False, "סוסים באחו. מתקרבים, ומתייגים."),
    (-21, 6, False, "באגם גרים צפרדעים ודגי סלמון."),
    (-10, -19, False, "ביער גר שועל. מחזיקים Shift, ומתקרבים."),
    (0, -20, False, "למעלה על ההר גרות עיזי הרים."),
    (30, 8, False, "במדבר גמלים וארנבים, ואולי גם ארמדיל."),
    (4, 37, False, None), (-5, 37, False, None), (6, 36, False, None),
]
TOUR_END, WP_STATION, WP_BENCH, WP_SAM = 8, 9, 10, 11
# Sam's stops: the pasture, then one for each request (chickens, the jetty for the fish, the desert), then the camp.
SAM_ROUTE = [(8, 33, False), (-9, 39, False), (0, 52, True), (31, 10, False), (2, 37, False)]
# What Noa teaches at each stop of the tour: (stop number on NOA_ROUTE, the characteristic of life, what she says,
# the question, three answers, the number of the right answer, which animals to tag there).
TEACH = [
    (2, "הזנה", ["הכבשה אוכלת עשב כל היום. כל יצור חי צריך מזון: ממנו הוא מקבל אנרגיה, וחומרים לבניית הגוף.",
                 "צמחים לא אוכלים. הם מייצרים את המזון שלהם בעצמם, בעזרת אור השמש."],
     "מאיפה צמח מקבל את המזון שלו?", ["הוא אוכל אדמה", "הוא מייצר אותו בעצמו, בעזרת אור", "הוא לא צריך מזון"], 2,
     "מתייגים כאן: כבשה, פרה וחזיר."),
    (3, "רבייה", ["התרנגולת מטילה ביצים, ומהן בוקעים אפרוחים. יצורים חיים מעמידים צאצאים שדומים להם.",
                  "בלי רבייה, לא היו נשארות תרנגולות בעולם."],
     "מה מאלה הוא רבייה?", ["כבשה אוכלת עשב", "סוס רץ באחו", "פרה ממליטה עגל"], 3,
     "מתייגים כאן: תרנגולת."),
    (4, "תנועה", ["הסוס דוהר באחו. בעלי חיים זזים כדי למצוא מזון, כדי לברוח, וכדי למצוא בני זוג.",
                  "גם צמחים זזים, רק לאט: חמנייה צעירה פונה אל השמש."],
     "האם צמחים זזים?", ["לא, אף פעם", "כן, אבל לאט", "רק כשיש רוח"], 2,
     "מתייגים כאן: סוס."),
    (5, "נשימה", ["הצפרדע נושמת אוויר. הדג נושם בזימים את החמצן שמומס במים.",
                  "כל יצור חי נושם, גם צמחים. בנשימה הגוף מפיק אנרגיה מהמזון."],
     "איך דג נושם מתחת למים?", ["הוא לא נושם בכלל", "הוא עולה לנשום אוויר כל דקה", "בזימים, את החמצן שבמים"], 3,
     "מתייגים כאן: צפרדע ודג סלמון."),
    (6, "תקשורת עם הסביבה", ["השועל שמע אתכם, וברח. יצורים חיים קולטים מה שקורה מסביב, ומגיבים.",
                             "לזה קוראים תקשורת עם הסביבה: לראות, לשמוע, להריח, ולהגיב."],
     "מה מאלה הוא תקשורת עם הסביבה?", ["אבן מתגלגלת בהר", "שועל שומע צעדים ובורח", "ענן זז בשמיים"], 2,
     "מתייגים כאן: שועל. מחזיקים Shift, ומתקרבים לאט."),
    (7, "גדילה והתפתחות", ["גדי קטן גדל, ונהיה עז הרים בוגרת. כל יצור חי גדל, ומשתנה במהלך החיים.",
                           "גם אפרוח הופך לתרנגולת, וראשן הופך לצפרדע."],
     "מה מאלה גדל ומתפתח?", ["ערימת חול שגדלה ברוח", "שלולית שמתמלאת בגשם", "ראשן שהופך לצפרדע"], 3,
     "מתייגים כאן: עז הרים. היא למעלה, על ההר."),
    (8, "הפרשה", ["הגמל שותה הרבה, ומפריש מעט מאוד שתן. ככה הוא שומר מים במדבר.",
                  "כל יצור חי מפריש: מוציא מהגוף חומרים שהוא לא צריך."],
     "למה יצור חי מפריש?", ["כדי לגדול מהר יותר", "כדי להוציא מהגוף חומרים מיותרים", "כי הוא רעב"], 2,
     "מתייגים כאן: גמל, ארנב, ואולי גם ארמדיל."),
]
# The quiz at the end: (question, three answers, the number of the right answer).
QUIZ = [
    ("נהר זורם וזז כל הזמן. האם הוא חי?", ["כן, כי הוא זז", "לא: אין לו את שאר מאפייני החיים", "רק בחורף"], 2),
    ("מה מאלה אינו מאפיין חיים?", ["נשימה", "רבייה", "צבע"], 3),
    ("צמר הוא...", ["חומר שמקורו ביצור חי", "יצור חי", "דומם שאין לו קשר לחיים"], 1),
    ("איך ידענו בניסוי שהשתיל חי?", ["כי הוא ירוק", "כי הוא גדל והתפתח", "כי הוא עמד בשמש"], 2),
]
TAG_ITEM = 'minecraft:paper[minecraft:item_model="minecraft:name_tag",minecraft:custom_name={text:"תג המשלחת",italic:false},minecraft:custom_data={islands:"tag"}]'
HOLDS_TAG = 'minecraft:paper[minecraft:custom_data~{islands:"tag"}]'
ME = "@a[tag=islands_in,limit=1]"


# ------------------------------------------------------------------ small builders
def msg(t, width=300):
    return {"type": "minecraft:plain_message", "contents": {"text": t} if isinstance(t, str) else t, "width": width}


def act(label, n):
    return {"label": {"text": label}, "action": {"type": "minecraft:run_command", "command": "trigger islands_act set %d" % n}}


def notice(title, body, button="הבנתי"):
    return {"type": "minecraft:notice", "title": title, "body": body, "action": {"label": {"text": button}}}


def one_button(title, body, label, n):
    return {"type": "minecraft:multi_action", "title": title, "body": body, "actions": [act(label, n)], "columns": 1}


def gloss(text):
    """English with help: "a {small|קטן} animal" -> the word small is blue, and hovering over it shows the Hebrew."""
    parts, rest = [""], text
    while "{" in rest:
        before, rest = rest.split("{", 1)
        inner, rest = rest.split("}", 1)
        en, he = inner.split("|")
        if before:
            parts.append({"text": before})
        parts.append({"text": en, "color": "aqua", "underlined": True, "hover_event": {"action": "show_text", "value": {"text": he}}})
    if rest:
        parts.append({"text": rest})
    return parts


def line(holder, text, color="white"):
    return 'scoreboard players display name %s islands_q {text:"%s",color:"%s"}' % (holder, text, color)


def label(x, y, z, text, color, scale=1.6):
    return ('summon minecraft:text_display %s %s %s {text:{text:"%s",color:"%s",bold:true},billboard:"center",'
            'transformation:{translation:[0f,0f,0f],left_rotation:[0f,0f,0f,1f],scale:[%sf,%sf,%sf],right_rotation:[0f,0f,0f,1f]},Tags:["islands_l1"]}'
            % (x, y, z, text, color, scale, scale, scale))


NOA = {"text": "נועה, ראשת המשלחת", "color": "gold"}
SAM = {"text": "Sam", "color": "aqua"}
HELP_HE = {"text": "לא מבינים מילה? מעבירים את העכבר מעל מילה כחולה, ורואים מה היא אומרת.", "color": "gray"}

# ------------------------------------------------------------------ shared: events, following, the quest list
w("function/event/use_entity.mcfunction", """
# The player (@s) right-clicked an entity. It carries the tag islands_target while this runs (LessonEvents.java).
# Set "#cancel islands" to 1 to stop the game's own reaction to the click.
execute if entity @e[tag=islands_target,tag=guide] run return run function islands:event/talk_guide
execute if entity @e[tag=islands_target,tag=sam] run return run function islands:event/talk_sam
execute if score #lesson islands matches 1 run function islands:lesson/1/use_entity
""")
w("function/event/talk_guide.mcfunction", """
scoreboard players set #cancel islands 1
function islands:lesson/talk_guide
""")
w("function/event/talk_sam.mcfunction", """
scoreboard players set #cancel islands 1
execute if score #lesson islands matches 1 run function islands:lesson/1/talk_sam
""")
w("function/lesson/talk_guide.mcfunction", """
# Someone talks to the guide (as the player). Each lesson has its own talk.
execute if score #lesson islands matches 1 run function islands:lesson/1/talk_guide
""")
wj("tags/block/passable.json", {"values": ["#minecraft:air", "minecraft:water", "#minecraft:replaceable", "#minecraft:flowers",
                                           "#minecraft:saplings", "minecraft:snow", "#minecraft:wool_carpets", "#minecraft:crops"]})
w("function/path/walk.mcfunction", """
# A character leads the way (as the character; the position is the stop it is walking to).
# It waits, looking back, when the player is more than 16 blocks behind.
execute at @s unless entity @a[tag=islands_in,distance=..16] run return run tp @s ~ ~ ~ facing entity @p[tag=islands_in] eyes
execute facing entity @s feet positioned as @s rotated ~ 0 run tp @s ^ ^ ^-0.23 ~180 0
function islands:path/ground
""")
w("function/path/go.mcfunction", """
# A character walks to its stop without waiting for anyone (as the character; the position is the stop).
execute facing entity @s feet positioned as @s rotated ~ 0 run tp @s ^ ^ ^-0.3 ~180 0
function islands:path/ground
""")
w("function/path/ground.mcfunction", """
# Keeps the character on the ground: step up out of a block, drop when there is air below, stay on top of water.
execute at @s unless block ~ ~ ~ #islands:passable run tp @s ~ ~1 ~
execute at @s unless block ~ ~ ~ #islands:passable run tp @s ~ ~1 ~
execute at @s if block ~ ~ ~ minecraft:water run tp @s ~ ~0.5 ~
execute at @s if block ~ ~-0.5 ~ #islands:passable unless block ~ ~-0.5 ~ minecraft:water run tp @s ~ ~-0.5 ~
""")
w("function/path/stand.mcfunction", """
# A character at its stop looks at the player.
execute at @s run tp @s ~ ~ ~ facing entity @p[tag=islands_in] eyes
""")
w("function/quest/setup.mcfunction", """
# The quest list at the side of the screen. Each line is a fake player; its score only sets the order (higher = upper).
# The names must not start with "#": the sidebar hides those.
scoreboard objectives add islands_q dummy {text:"משימות",color:"gold",bold:true}
scoreboard objectives modify islands_q numberformat blank
scoreboard objectives setdisplay sidebar islands_q
""")

# ------------------------------------------------------------------ lesson 1: start, tick, talks
items_nbt = ",".join('{Slot:%db,id:"%s",count:1,components:{"minecraft:custom_name":{text:"%s",italic:false}%s}}'
                     % (i, it[0], it[2], ',"minecraft:item_model":"minecraft:egg"' if it[1] == "egg" else "") for i, it in enumerate(ITEMS))
fx, fy, fz = FINDS.split()
bench_build = []
for key, x, he, _ in BENCH:
    base = "minecraft:grass_block" if key == "sapling" else ("minecraft:hay_block" if key == "egg" else "minecraft:spruce_planks")
    bench_build.append("setblock %d %d %d %s" % (x, BENCH_Y, BENCH_Z, base))
    top = {"sapling": "setblock %d %d %d minecraft:oak_sapling" % (x, BENCH_Y + 1, BENCH_Z),
           "egg": 'summon minecraft:item_display %d.5 %s %d.5 {item:{id:"minecraft:egg",count:1},Tags:["islands_l1","bench_egg"],transformation:{translation:[0f,0f,0f],left_rotation:[0f,0f,0f,1f],scale:[0.8f,0.8f,0.8f],right_rotation:[0f,0f,0f,1f]}}' % (x, BENCH_Y + 1.3, BENCH_Z),
           "stone": "setblock %d %d %d minecraft:stone_button[face=floor]" % (x, BENCH_Y + 1, BENCH_Z),
           "wool": "setblock %d %d %d minecraft:white_carpet" % (x, BENCH_Y + 1, BENCH_Z),
           "log": "setblock %d %d %d minecraft:oak_log" % (x, BENCH_Y + 1, BENCH_Z)}[key]
    bench_build.append(top)
    bench_build.append(label("%d.5" % x, BENCH_Y + 2.6, "%d.5" % BENCH_Z, he, "white", 1.0).replace('Tags:["islands_l1"]', 'Tags:["islands_l1","bench_label_%s"]' % key))
cx, cy, cz = CLOCK.split()
w("function/lesson/1/start.mcfunction", "\n".join([
    "# Lesson 1 (נוחתים באי). Runs once, right after the island is ready. GENERATED by tools/gen_lesson1.py.",
    "function islands:island/guide_spot",
    "kill @e[type=minecraft:interaction,tag=talk_guide]",
    "# the sorting station at the camp",
    'setblock %s minecraft:barrel[facing=up]{CustomName:{text:"חבית הממצאים"},Items:[%s]}' % (FINDS, items_nbt),
    'setblock %s minecraft:chest[facing=south]{CustomName:{text:"חי"}}' % ALIVE,
    'setblock %s minecraft:chest[facing=south]{CustomName:{text:"לא חי"}}' % NOT,
    label("%s.5" % fx, int(fy) + 1.3, "%s.5" % fz, "חבית הממצאים", "gold"),
    label("5.5", -48.7, "35.5", "חי", "green"), label("7.5", -48.7, "35.5", "לא חי", "gray"),
    "# the test bench, and the clock that makes a week pass",
] + bench_build + [
    "setblock %s minecraft:smooth_stone" % CLOCK,
    'summon minecraft:item_display %s.5 %s %s.5 {item:{id:"minecraft:clock",count:1},billboard:"vertical",Tags:["islands_l1"]}' % (cx, int(cy) + 1.5, cz),
    'summon minecraft:interaction %s.5 %s %s.5 {width:1.1f,height:1.1f,response:1b,Tags:["islands_l1","bench_clock"]}' % (cx, int(cy) + 1, cz),
    label("%s.5" % cx, int(cy) + 2.4, "%s.5" % cz, "שולחן הניסוי", "gold", 1.2),
    "# numbers the lesson's sums need",
    "scoreboard players set #10 islands 10", "scoreboard players set #100 islands 100",
    "scoreboard players set #stage islands 0", "scoreboard players set #census islands 0",
    "scoreboard players set #week islands 0", "scoreboard players set #sam islands 0",
    "scoreboard players set #wp_noa islands 0", "scoreboard players set #wpmax_noa islands 0",
    "scoreboard players set #wp_sam islands 0", "scoreboard players set #said_noa islands -1",
    "scoreboard players set #learn islands 0", "scoreboard players set #quizdone islands 0", "scoreboard players set #quiz islands 0",
    "function islands:quest/setup",
    "scoreboard players set islands.q1 islands_q 9",
    line("islands.q1", "☐ מדברים עם נועה"),
]))
w("function/lesson/1/tick.mcfunction", """
# Every tick in lesson 1.
function islands:lesson/1/path/tick
# During the census the player always has the tag.
execute if score #stage islands matches 1 as %s unless items entity @s container.* %s unless items entity @s weapon.offhand %s run give @s %s 1
""" % (ME, HOLDS_TAG, HOLDS_TAG, TAG_ITEM))
w("function/lesson/1/talk_guide.mcfunction", """
# The player (@s) talks to Noa. What she says depends on where the lesson is.
execute if score #stage islands matches 0 run dialog show @s islands:l1/guide
execute if score #stage islands matches 1 run function islands:lesson/1/teach/talk
execute if score #stage islands matches 2 run dialog show @s islands:l1/guide_sort
execute if score #stage islands matches 3 run dialog show @s islands:l1/guide_bench
execute if score #stage islands matches 4 run dialog show @s islands:l1/guide_sam
execute if score #stage islands matches 5 unless score #quizdone islands matches 1 run dialog show @s islands:l1/quiz
execute if score #stage islands matches 5 if score #quizdone islands matches 1 run dialog show @s islands:l1/guide_done
execute if score #stage islands matches 6.. run dialog show @s islands:l1/guide_after
""")
w("function/lesson/1/use_entity.mcfunction", """
# A right-click on an entity in lesson 1 (as the player; the entity has the tag islands_target).
execute if entity @e[tag=islands_target,tag=bench_clock] run return run function islands:lesson/1/bench/clock
execute if score #stage islands matches 1 if items entity @s weapon.mainhand %s run return run function islands:lesson/1/census/try
execute if score #stage islands matches 4 if score #sam islands matches 1..3 run function islands:lesson/1/sam/show
""" % HOLDS_TAG)

wj("dialog/l1/guide.json", one_button(NOA, [
    msg("טוב שהגעתם. המטרה שלנו היום: לדעת מה ההבדל בין יצור חי לדומם, ואיך בודקים את זה."),
    msg("בדרך נעבור על שבעת מאפייני החיים, אחד בכל תחנה. בכל תחנה אשאל אתכם שאלה אחת."),
    msg("אחרי הכפתור תקבלו את תג המשלחת. מחזיקים אותו ביד, מתקרבים לבעל חיים, ולוחצים עליו קליק ימני. צריך לתייג %d סוגים שונים. אני הולכת לפניכם ומראה את הדרך." % CENSUS_GOAL)],
    "יוצאים לדרך", 30))
wj("dialog/l1/guide_census.json", notice(NOA, [
    msg("אני מחכה לכם בתחנה הבאה. כשמגיעים אליי, לוחצים עליי קליק ימני."),
    msg("על האי יש אחו (שדה של דשא), יער, מדבר, הר ואגם. צריך לתייג %d סוגים של בעלי חיים, וללמוד את כל שבעת המאפיינים." % CENSUS_GOAL)]))
wj("dialog/l1/guide_sort.json", notice(NOA, [
    msg("במחנה מחכה חבית של ממצאים. משלחת קודמת אספה אותם מכל האי, ועדיין אף אחד לא מיין אותם."),
    msg("עכשיו משתמשים במה שלמדתם בדרך. מי שיש לו מאפייני חיים (נושם, ניזון, גדל, מתרבה) הוא חי. מי שאין לו, הוא דומם: לא חי."),
    msg("לוקחים ממצא מהחבית, ושמים אותו בארגז המתאים: ״חי״ או ״לא חי״. שכחתם מאפיין? פותחים את המחברת במקש N.")]))
wj("dialog/l1/guide_bench.json", notice(NOA, [
    msg("על שולחן הניסוי יש חמישה דברים: שתיל, ביצה, אבן, צמר ובול עץ. אילו מהם חיים? לא מנחשים. בודקים: גדילה והתפתחות הן מאפייני חיים."),
    msg("לוחצים קליק ימני על השעון, וחודש עובר. אחר כך רושמים בטבלה מה קרה לכל אחד.")]))
wj("dialog/l1/guide_sam.json", notice(NOA, [
    msg("השתיל גדל, ומהביצה בקע אפרוח. גדילה והתפתחות הן מאפייני חיים, לכן הם חיים. האבן לא השתנתה: היא דומם."),
    msg("הצמר ובול העץ לא חיים, אבל הם חומרים שמקורם ביצורים חיים. גם העצם והנוצה."),
    msg("ועכשיו פוגשים את סם. הוא חוקר במשלחת ומדבר רק אנגלית. הוא מחכה ליד החווה. לוחצים עליו קליק ימני כדי לדבר איתו.")], "הולכים לסם"))
wj("dialog/l1/guide_done.json", one_button({"text": "סיכום השיעור", "color": "green"}, [
    msg("זהו, סיימתם את היום הראשון על האי. עכשיו אתם יודעים: ליצור חי יש שבעה מאפייני חיים, ולדומם אין."),
    msg("תייגתם בעלי חיים, מיינתם ממצאים, בדקתם בניסוי מה חי באמת, ועזרתם לסם. הכול רשום במחברת המחקר: לוחצים על המקש N.")],
    "להתראות בשיעור הבא", 31))
wj("dialog/l1/guide_after.json", notice(NOA, [msg("סיימתם את שיעור 1. אפשר להמשיך לטייל על האי, או לסגור את המשחק.")]))

# ------------------------------------------------------------------ the characters' routes
_, COLS = gen_island.gen_terrain()


def stop(x, z, jetty):
    return "%d.5 %d %d.5" % (x, gen_island.SEA_TOP + 2 if jetty else COLS[(x, z)] + 1, z)


tick_lines = ["# Each character walks to the stop its score points at (#wp_noa, #wp_sam)."]
for i, (x, z, jetty, say) in enumerate(NOA_ROUTE):
    tick_lines.append("execute if score #wp_noa islands matches %d positioned %s as @e[tag=guide,limit=1] run function islands:lesson/1/path/noa_%d" % (i, stop(x, z, jetty), i))
    lines = ["# Noa and stop %d (as Noa; the position is the stop)." % i,
             "execute unless entity @s[distance=..1.3] run return run function islands:path/%s" % ("walk" if i <= TOUR_END else "go"),
             "function islands:path/stand",
             "execute at @s unless entity @a[tag=islands_in,distance=..7] run return 0"]
    if any(t[0] == i for t in TEACH):
        # a teaching stop: she calls the player once, and moves on only after the question is answered (teach/right)
        lines.append('execute unless score #said_noa islands matches %d.. run title @a actionbar {text:"נועה: יש כאן משהו לראות. קליק ימני עליי.",color:"gold"}' % i)
        lines.append("execute unless score #said_noa islands matches %d.. run scoreboard players set #said_noa islands %d" % (i, i))
    else:
        if say:
            lines.append('execute unless score #said_noa islands matches %d.. run title @a actionbar {text:"נועה: %s",color:"gold"}' % (i, say))
            lines.append("execute unless score #said_noa islands matches %d.. run scoreboard players set #said_noa islands %d" % (i, i))
        lines.append("execute if score #wp_noa islands < #wpmax_noa islands run scoreboard players add #wp_noa islands 1")
    w("function/lesson/1/path/noa_%d.mcfunction" % i, "\n".join(lines))
for j, (x, z, jetty) in enumerate(SAM_ROUTE):
    tick_lines.append("execute if score #wp_sam islands matches %d positioned %s as @e[tag=sam,limit=1] run function islands:lesson/1/path/sam_%s" % (j, stop(x, z, jetty), "go" if j == len(SAM_ROUTE) - 1 else "lead"))
w("function/lesson/1/path/tick.mcfunction", "\n".join(tick_lines))
w("function/lesson/1/path/sam_lead.mcfunction", """
# Sam walks ahead to the place of his request, and waits when the player falls behind (as Sam; the position is the stop).
execute unless entity @s[distance=..1.3] run return run function islands:path/walk
function islands:path/stand
""")
w("function/lesson/1/path/sam_go.mcfunction", """
execute unless entity @s[distance=..1.3] run return run function islands:path/go
function islands:path/stand
""")

# ------------------------------------------------------------------ Noa teaches: one characteristic of life at each stop
def options(key, question, answers):
    return {"type": "minecraft:single_option", "key": key, "label": {"text": question}, "width": 300,
            "options": [dict({"id": str(j + 1), "display": {"text": t}}, **({"initial": True} if j == 0 else {})) for j, t in enumerate(answers)]}


talk = ["# The player (@s) talks to Noa during the tour: the talk of the stop she is at, if its question is still open."]
answer = ["# A teaching question was answered (as the player). islands_act = 3, the talk's number, the answer."]
for k, (stop_i, name, says, question, answers, right, tag_hint) in enumerate(TEACH):
    wj("dialog/l1/teach_%d.json" % k, {
        "type": "minecraft:multi_action", "title": {"text": "מאפיין חיים: " + name, "color": "gold"},
        "body": [msg(t) for t in says] + [msg({"text": tag_hint, "color": "gray"})],
        "inputs": [options("a", question, answers)],
        "actions": [{"label": {"text": "זאת התשובה שלי"}, "action": {"type": "minecraft:dynamic/run_command", "template": "trigger islands_act set 3%d$(a)" % k}}],
        "columns": 1})
    talk.append("execute if score #wp_noa islands matches %d if score #learn islands matches %d run return run dialog show @s islands:l1/teach_%d" % (stop_i, k, k))
    answer.append("execute if score #learn islands matches %d if score @s islands_act matches 3%d%d run return run function islands:lesson/1/teach/right" % (k, k, right))
talk.append("dialog show @s islands:l1/guide_census")
answer.append("dialog show @s islands:l1/teach_wrong")
w("function/lesson/1/teach/talk.mcfunction", "\n".join(talk))
w("function/lesson/1/teach/answer.mcfunction", "\n".join(answer))
wj("dialog/l1/teach_wrong.json", {"type": "minecraft:multi_action", "title": NOA,
   "body": [msg("לא בדיוק. קוראים שוב מה שאמרתי, ומנסים עוד פעם.")], "actions": [act("לנסות שוב", 1)], "columns": 1})
w("function/lesson/1/teach/right.mcfunction", """
# The right answer: the characteristic is marked in the notebook, and Noa walks on to the next stop.
scoreboard players add #learn islands 1
execute at @e[tag=guide,limit=1] run particle minecraft:happy_villager ~ ~1.2 ~ 0.4 0.5 0.4 0 20
playsound minecraft:entity.player.levelup master @s ~ ~ ~ 1 1.3
title @s actionbar {text:"נכון! המאפיין סומן במחברת (מקש N).",color:"green"}
execute store result storage islands:tmp q.n int 1 run scoreboard players get #learn islands
function islands:lesson/1/teach/show_line with storage islands:tmp q
execute if score #wp_noa islands < #wpmax_noa islands run scoreboard players add #wp_noa islands 1
function islands:lesson/1/census/maybe_done
""")
w("function/lesson/1/teach/show_line.mcfunction", '$scoreboard players display name islands.q7 islands_q {text:"☐ לומדים עם נועה: $(n) מתוך %d מאפיינים",color:"white"}' % len(TEACH))
w("function/lesson/1/census/maybe_done.mcfunction", "\n".join([
    "# The tour ends when both are done: %d kinds tagged, and all %d characteristics learned." % (CENSUS_GOAL, len(TEACH)),
    "execute unless score #stage islands matches 1 run return 0",
    "execute if score #census islands matches %d.. run %s" % (CENSUS_GOAL, line("islands.q2", "☑ מתייגים בעלי חיים: %d מתוך %d" % (CENSUS_GOAL, CENSUS_GOAL), "green")),
    "execute if score #learn islands matches %d.. run %s" % (len(TEACH), line("islands.q7", "☑ לומדים עם נועה: %d מתוך %d מאפיינים" % (len(TEACH), len(TEACH)), "green")),
    "execute if score #census islands matches %d.. if score #learn islands matches %d.. run function islands:lesson/1/census/done" % (CENSUS_GOAL, len(TEACH)),
]))

# the quiz at the end
wj("dialog/l1/quiz.json", {
    "type": "minecraft:multi_action", "title": {"text": "בוחן המשלחת", "color": "gold"},
    "body": [msg("ארבע שאלות על מה שלמדתם היום. עונים לבד, בלי לנחש.")],
    "inputs": [options("q%d" % (j + 1), q, a) for j, (q, a, _) in enumerate(QUIZ)],
    "actions": [{"label": {"text": "לסיים את הבוחן"}, "action": {"type": "minecraft:dynamic/run_command",
                 "template": "trigger islands_act set 4" + "".join("$(q%d)" % (j + 1) for j in range(len(QUIZ)))}}],
    "columns": 1})
quiz = ["# The quiz was sent (as the player). islands_act = 4 and then one digit for each answer.",
        "execute unless score #stage islands matches 5 run return 0",
        "scoreboard players operation #v islands = @s islands_act", "scoreboard players remove #v islands 40000", "scoreboard players set #quiz islands 0"]
div = 1000
for j, (_, _, right) in enumerate(QUIZ):
    quiz += ["scoreboard players operation #digit islands = #v islands", "scoreboard players set #div islands %d" % div,
             "scoreboard players operation #digit islands /= #div islands", "scoreboard players operation #digit islands %= #10 islands",
             "scoreboard players set #qz%d islands 0" % (j + 1),
             "execute if score #digit islands matches %d run scoreboard players set #qz%d islands 1" % (right, j + 1),
             "scoreboard players operation #quiz islands += #qz%d islands" % (j + 1)]
    div //= 10
quiz += ["scoreboard players set #quizdone islands 1",
         "execute store result storage islands:tmp q.n int 1 run scoreboard players get #quiz islands",
         "function islands:lesson/1/quiz/show with storage islands:tmp q",
         "dialog show @s islands:l1/guide_done"]
w("function/lesson/1/quiz/check.mcfunction", "\n".join(quiz))
w("function/lesson/1/quiz/show.mcfunction", "\n".join([
    '$scoreboard players display name islands.q6 islands_q {text:"☑ בוחן המשלחת: $(n) מתוך %d",color:"green"}' % len(QUIZ),
    "scoreboard players set islands.q8 islands_q 2",
    line("islands.q8", "☐ נפרדים מנועה"),
]))

# ------------------------------------------------------------------ stage 1: the census
w("function/lesson/1/census/begin.mcfunction", "\n".join([
    "# The button in Noa's first talk: the census starts, and Noa walks with the player.",
    "execute unless score #stage islands matches 0 run return 0",
    "scoreboard players set #stage islands 1",
    "scoreboard players set #wpmax_noa islands %d" % TOUR_END,
    line("islands.q1", "☑ מדברים עם נועה", "green"),
    "scoreboard players set islands.q7 islands_q 8",
    line("islands.q7", "☐ לומדים עם נועה: 0 מתוך %d מאפיינים" % len(TEACH)),
    "scoreboard players set islands.q2 islands_q 7",
    "function islands:lesson/1/census/show",
    'title @a actionbar {text:"מחזיקים את התג ביד: קליק ימני על בעל חיים.",color:"yellow"}',
]))
w("function/lesson/1/census/try.mcfunction", "\n".join(
    ["# The player right-clicked something with the tag in hand. Which animal is it?", "scoreboard players set #cancel islands 1"] +
    ['execute if entity @e[tag=islands_target,type=%s] run return run function islands:lesson/1/census/tag {kind:"%s",n:%d,he:"%s"}' % (a[1], a[0], i + 1, a[2])
     for i, a in enumerate(ANIMALS)]))
w("function/lesson/1/census/tag.mcfunction", """
# One kind of animal is tagged (arguments: kind, n = its number, he = its Hebrew name).
$execute if score #c_$(kind) islands matches 1 run return run title @s actionbar {text:"$(he): כבר תייגתם. מחפשים סוג אחר.",color:"gray"}
$scoreboard players set #c_$(kind) islands 1
scoreboard players add #census islands 1
$data merge entity @e[tag=islands_target,limit=1] {CustomName:{text:"$(he) ✔",color:"green"},CustomNameVisible:1b}
execute at @e[tag=islands_target,limit=1] run particle minecraft:happy_villager ~ ~1 ~ 0.4 0.4 0.4 0 16
playsound minecraft:entity.experience_orb.pickup master @s ~ ~ ~ 1 1.2
function islands:lesson/1/census/show
$dialog show @s islands:l1/card/$(kind)
""")
w("function/lesson/1/census/show.mcfunction", """
execute store result storage islands:tmp q.n int 1 run scoreboard players get #census islands
function islands:lesson/1/census/show_line with storage islands:tmp q
""")
w("function/lesson/1/census/show_line.mcfunction",
  '$scoreboard players display name islands.q2 islands_q {text:"☐ מתייגים בעלי חיים: $(n) מתוך %d",color:"white"}' % CENSUS_GOAL)
w("function/lesson/1/census/card.mcfunction", """
# The observation card was filled (as the player). islands_act = 1KKWD: KK the animal's number, W where, D what it did.
scoreboard players operation #v islands = @s islands_act
scoreboard players remove #v islands 10000
scoreboard players operation #k islands = #v islands
scoreboard players operation #k islands /= #100 islands
scoreboard players operation #wd islands = #v islands
scoreboard players operation #wd islands %= #100 islands
scoreboard players operation #where islands = #wd islands
scoreboard players operation #where islands /= #10 islands
scoreboard players operation #wd islands %= #10 islands
execute store result storage islands:tmp card.k int 1 run scoreboard players get #k islands
execute store result storage islands:tmp card.w int 1 run scoreboard players get #where islands
execute store result storage islands:tmp card.d int 1 run scoreboard players get #wd islands
function islands:lesson/1/census/card_save with storage islands:tmp card
function islands:lesson/1/census/maybe_done
""")
w("function/lesson/1/census/card_save.mcfunction", """
$scoreboard players set #w_$(k) islands $(w)
$scoreboard players set #d_$(k) islands $(d)
""")
w("function/lesson/1/census/done.mcfunction", "\n".join([
    "# Enough kinds are tagged: back to the camp, to the barrel of finds.",
    "scoreboard players set #stage islands 2",
    "scoreboard players set #wp_noa islands %d" % WP_STATION, "scoreboard players set #wpmax_noa islands %d" % WP_STATION,
    "clear @a %s" % HOLDS_TAG,
    "scoreboard players set islands.q3 islands_q 6",
    "scoreboard players set #sorted islands 0", "scoreboard players set #sorted_shown islands -1",
    "title @a times 10 60 20",
    'title @a subtitle {text:"תייגתם %d סוגים. חוזרים למחנה, לחבית הממצאים",color:"white"}' % CENSUS_GOAL,
    'title @a title {text:"כל הכבוד!",color:"green",bold:true}',
    "playsound minecraft:ui.toast.challenge_complete master @a ~ ~ ~ 1 1",
    "function islands:lesson/1/sort/check",
]))
for i, (key, _, he, _, _) in enumerate(ANIMALS):
    wj("dialog/l1/card/%s.json" % key, {
        "type": "minecraft:multi_action", "title": {"text": "כרטיס תצפית", "color": "green"},
        "body": [msg("תייגתם: %s. ממלאים את הכרטיס, ולוחצים על ״לרשום במחברת״." % he)],
        "inputs": [
            {"type": "minecraft:single_option", "key": "where", "label": {"text": "איפה מצאתם את בעל החיים?"}, "width": 260,
             "options": [dict({"id": str(j + 1), "display": {"text": t}}, **({"initial": True} if j == 0 else {})) for j, t in enumerate(PLACES_HE)]},
            {"type": "minecraft:single_option", "key": "doing", "label": {"text": "איזה מאפיין חיים ראיתם אצלו?"}, "width": 260,
             "options": [dict({"id": str(j + 1), "display": {"text": t}}, **({"initial": True} if j == 0 else {})) for j, t in enumerate(SEEN_HE)]},
        ],
        "actions": [{"label": {"text": "לרשום במחברת"}, "action": {"type": "minecraft:dynamic/run_command",
                     "template": "trigger islands_act set 1%02d$(where)$(doing)" % (i + 1)}}],
        "columns": 1})

# ------------------------------------------------------------------ stage 2: sorting
calls = []
for i, (iid, key, name, kind) in enumerate(ITEMS):
    if kind == "d":
        calls.append('function islands:lesson/1/sort/debate {id:"%s",key:"%s"}' % (iid, key))
    else:
        good, bad = (ALIVE, NOT) if kind == "a" else (NOT, ALIVE)
        calls.append('function islands:lesson/1/sort/one {id:"%s",key:"%s",gx:%s,bx:%s,slot:%d}' % (iid, key, good.split()[0], bad.split()[0], i))
sums = "\n".join("scoreboard players operation #sorted islands += #s_%s islands" % it[1] for it in ITEMS)
w("function/lesson/1/sort/check.mcfunction", """
# Twice a second while the sorting quest is open: look into the two chests.
execute unless score #stage islands matches 2 run return 0
%s
scoreboard players set #sorted islands 0
%s
execute unless score #sorted islands = #sorted_shown islands run function islands:lesson/1/sort/show
execute if score #sorted islands matches %d.. run return run function islands:lesson/1/sort/done
schedule function islands:lesson/1/sort/check 10t
""" % ("\n".join(calls), sums, N))
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
w("function/lesson/1/sort/wrong.mcfunction", """
# In the wrong chest: the find goes back to its place in the barrel, and the player gets a question to think about.
$data modify storage islands:tmp find set from block $(bx) -50 35 Items[{id:"$(id)"}]
$data modify storage islands:tmp find.Slot set value $(slot)b
data modify block %s Items append from storage islands:tmp find
$data remove block $(bx) -50 35 Items[{id:"$(id)"}]
playsound minecraft:entity.villager.no master @a %s 1 1
title @a actionbar {text:"הממצא חזר לחבית. זוכרים את מאפייני החיים?",color:"red"}
""" % (FINDS, FINDS))
w("function/lesson/1/sort/show.mcfunction", """
# The quest line shows how many finds are sorted.
scoreboard players operation #sorted_shown islands = #sorted islands
execute store result storage islands:tmp q.n int 1 run scoreboard players get #sorted islands
function islands:lesson/1/sort/show_line with storage islands:tmp q
""")
w("function/lesson/1/sort/show_line.mcfunction",
  '$scoreboard players display name islands.q3 islands_q {text:"☐ ממיינים: חי או לא חי? $(n) מתוך %d",color:"white"}' % N)
w("function/lesson/1/sort/done.mcfunction", "\n".join([
    "# Every find is in a chest: on to the test bench.",
    "scoreboard players set #stage islands 3",
    "scoreboard players set #wp_noa islands %d" % WP_BENCH, "scoreboard players set #wpmax_noa islands %d" % WP_BENCH,
    line("islands.q3", "☑ ממיינים: חי או לא חי? %d מתוך %d" % (N, N), "green"),
    "scoreboard players set islands.q4 islands_q 5",
    line("islands.q4", "☐ ניסוי: מה קורה אחרי חודש?"),
    "title @a times 10 60 20",
    'title @a subtitle {text:"מיינתם הכול. עכשיו הולכים לנועה, ליד שולחן הניסוי",color:"white"}',
    'title @a title {text:"יפה מאוד!",color:"green",bold:true}',
    "playsound minecraft:ui.toast.challenge_complete master @a %s 1 1" % FINDS,
]))

# ------------------------------------------------------------------ stage 3: the test bench
sap, egg = BENCH[0], BENCH[1]
w("function/lesson/1/bench/clock.mcfunction", """
# The clock on the test bench was clicked (as the player).
scoreboard players set #cancel islands 1
execute if score #stage islands matches ..2 run return run title @s actionbar {text:"השעון עוד לא עובד. קודם מתייגים וממיינים.",color:"gray"}
execute if score #stage islands matches 4.. run return run title @s actionbar {text:"הניסוי הסתיים. התוצאות במחברת: מקש N.",color:"gray"}
execute if score #week islands matches 2 run return run dialog show @s islands:l1/bench_table
execute if score #week islands matches 1 run return 0
scoreboard players set #week islands 1
scoreboard players set #spin islands 0
title @a times 5 100 10
title @a subtitle {text:"",color:"white"}
title @a title {text:"עובר חודש...",color:"yellow"}
function islands:lesson/1/bench/spin
""")
w("function/lesson/1/bench/spin.mcfunction", """
# The sun races across the sky: a month in a few seconds.
time add 3000
scoreboard players add #spin islands 1
execute if score #spin islands matches ..55 run return run schedule function islands:lesson/1/bench/spin 2t
function islands:lesson/1/bench/result
""")
w("function/lesson/1/bench/result.mcfunction", "\n".join([
    "# What a week did to each thing on the bench.",
    "time set 1000",
    "fill %d %d %d %d %d %d minecraft:oak_log" % (sap[1], BENCH_Y + 1, BENCH_Z, sap[1], BENCH_Y + 2, BENCH_Z),
    "fill %d %d %d %d %d %d minecraft:oak_leaves[persistent=true] keep" % (sap[1] - 1, BENCH_Y + 3, BENCH_Z - 1, sap[1] + 1, BENCH_Y + 3, BENCH_Z + 1),
    "setblock %d %d %d minecraft:oak_leaves[persistent=true]" % (sap[1], BENCH_Y + 4, BENCH_Z),
    "kill @e[tag=bench_label_sapling]",
    "particle minecraft:happy_villager %d.5 %s %d.5 0.6 1 0.6 0 30" % (sap[1], BENCH_Y + 2, BENCH_Z),
    "kill @e[tag=bench_egg]",
    'summon minecraft:chicken %d.5 %d %d.5 {Age:-24000,NoAI:1b,Tags:["islands_l1","bench_chick"]}' % (egg[1], BENCH_Y + 1, BENCH_Z),
    "particle minecraft:happy_villager %d.5 %s %d.5 0.3 0.3 0.3 0 20" % (egg[1], BENCH_Y + 1.5, BENCH_Z),
    "playsound minecraft:entity.chicken.egg master @a %d %d %d 1 1" % (egg[1], BENCH_Y, BENCH_Z),
] + ["particle minecraft:smoke %d.5 %s %d.5 0.2 0.2 0.2 0 8" % (b[1], BENCH_Y + 1.6, BENCH_Z) for b in BENCH[2:]] + [
    "scoreboard players set #week islands 2",
    'title @a title {text:"עבר חודש",color:"green"}',
    'title @a subtitle {text:"מסתכלים על השולחן. מה השתנה?",color:"white"}',
    "schedule function islands:lesson/1/bench/table 70t",
]))
w("function/lesson/1/bench/table.mcfunction", "execute if score #stage islands matches 3 run dialog show @a islands:l1/bench_table")
wj("dialog/l1/bench_table.json", {
    "type": "minecraft:multi_action", "title": {"text": "טבלת הניסוי", "color": "gold"},
    "body": [msg("מה קרה לכל אחד אחרי חודש? בוחרים בכל שורה, ולוחצים על ״לבדוק״. אפשר לסגור, ולחזור לטבלה בקליק ימני על השעון.")],
    "inputs": [{"type": "minecraft:single_option", "key": b[0], "label": {"text": b[2]}, "width": 240,
                "options": [{"id": "3", "display": {"text": "אין שינוי"}, "initial": True}, {"id": "1", "display": {"text": "גדילה"}}, {"id": "2", "display": {"text": "בקיעה"}}]}
               for b in BENCH],
    "actions": [{"label": {"text": "לבדוק"}, "action": {"type": "minecraft:dynamic/run_command",
                 "template": "trigger islands_act set 2" + "".join("$(%s)" % b[0] for b in BENCH)}}],
    "columns": 1})
w("function/lesson/1/bench/check.mcfunction", """
# The table was sent (as the player). islands_act = 2 and then one digit for each row.
execute unless score #stage islands matches 3 run return 0
execute if score @s islands_act matches %s run return run function islands:lesson/1/bench/done
title @s actionbar {text:"יש טעות. קליק ימני על השעון, ובודקים שוב.",color:"red"}
playsound minecraft:entity.villager.no master @s ~ ~ ~ 1 1
""" % BENCH_ANSWER)
w("function/lesson/1/bench/done.mcfunction", "\n".join([
    "# The table is right: Noa sums up, and Sam arrives.",
    "scoreboard players set #stage islands 4",
    "scoreboard players set #wp_noa islands %d" % WP_SAM, "scoreboard players set #wpmax_noa islands %d" % WP_SAM,
    line("islands.q4", "☑ ניסוי: מה קורה אחרי חודש?", "green"),
    "scoreboard players set islands.q5 islands_q 4",
    line("islands.q5", "☐ עוזרים לסם: 0 מתוך 3"),
    'summon minecraft:mannequin %s {profile:{texture:"islands:entity/sam",model:"wide"},immovable:1b,hide_description:1b,Invulnerable:1b,Silent:1b,Rotation:[90f,0f],CustomName:{text:"Sam",color:"aqua"},CustomNameVisible:1b,Tags:["islands_npc","sam"]}' % SAM_AT,
    "playsound minecraft:ui.toast.challenge_complete master @a ~ ~ ~ 1 1",
    "dialog show @a islands:l1/guide_sam",
]))

# ------------------------------------------------------------------ stage 4: Sam
REQ = [
    "Please {show|תראו} me a {small|קטן} {white|לבן} {animal|בעל חיים}. It {lives|גר} on the {farm|חווה}. It gives us {eggs|ביצים}.",
    "Now {show|תראו} me an {animal|בעל חיים}. It {lives|גר} in the {water|מים}. It can {swim|לשחות}. It has no {legs|רגליים}.",
    "{Show|תראו} me a {big|גדול} {desert|מדבר} {animal|בעל חיים}. People can {ride|לרכוב} it.",
]
HOW_HE = {"text": "סם הולך לפניכם. הולכים אחריו, ומראים לו: קליק ימני על בעל החיים.", "color": "gray"}
wj("dialog/l1/sam_intro.json", one_button(SAM, [
    msg(gloss("Hi! I am Sam. I only {speak|מדבר} {English|אנגלית}.")),
    msg(gloss("I {love|אוהב} animals. Can you {help|לעזור} me?")),
    msg(gloss("We use the {words|מילים} from {class|כיתה}.")),
    msg(HELP_HE)], "OK!", 40))
for i, text in enumerate(REQ):
    wj("dialog/l1/sam_req%d.json" % (i + 1), notice(SAM, [msg(gloss(text)), msg(HOW_HE), msg(HELP_HE)], "OK!"))
wj("dialog/l1/sam_thanks.json", notice(SAM, [msg(gloss("{Thank you|תודה}! {Great job|כל הכבוד}! See you {tomorrow|מחר}."))], "Bye!"))
w("function/lesson/1/talk_sam.mcfunction", """
# The player (@s) talks to Sam.
execute if score #sam islands matches 0 run dialog show @s islands:l1/sam_intro
execute if score #sam islands matches 1 run dialog show @s islands:l1/sam_req1
execute if score #sam islands matches 2 run dialog show @s islands:l1/sam_req2
execute if score #sam islands matches 3 run dialog show @s islands:l1/sam_req3
execute if score #sam islands matches 4.. run dialog show @s islands:l1/sam_thanks
""")
w("function/lesson/1/sam/begin.mcfunction", """
# The button "OK!" in Sam's first talk: Sam asks for the first animal, and walks ahead to where it lives.
execute unless score #sam islands matches 0 run return 0
scoreboard players set #sam islands 1
scoreboard players set #wp_sam islands 1
dialog show @s islands:l1/sam_req1
""")
w("function/lesson/1/sam/show.mcfunction", "\n".join(
    ["# The player shows Sam an animal (right-click). Which one is it, and is it the one he asked for?"] +
    ['execute if entity @e[tag=islands_target,type=%s] run return run function islands:lesson/1/sam/judge {en:"%s",he:"%s",n:%d}' % (a[1], a[3], a[2], a[4]) for a in ANIMALS]))
w("function/lesson/1/sam/judge.mcfunction", """
# Arguments: en (the animal in English), he (in Hebrew), n (the request it answers, or 0).
scoreboard players set #cancel islands 1
$execute if score #sam islands matches $(n) run return run function islands:lesson/1/sam/right {en:"$(en)"}
$title @s actionbar {text:"Sam: No, that is $(en). Try again!",color:"red"}
playsound minecraft:entity.villager.no master @s ~ ~ ~ 1 1.2
""")
w("function/lesson/1/sam/right.mcfunction", """
title @s title {text:"Yes!",color:"aqua"}
$title @s subtitle {text:"It is $(en). Thank you!",color:"white"}
title @s times 5 40 10
execute at @e[tag=islands_target,limit=1] run particle minecraft:happy_villager ~ ~1 ~ 0.4 0.4 0.4 0 16
playsound minecraft:entity.player.levelup master @s ~ ~ ~ 1 1.4
execute store result storage islands:tmp q.n int 1 run scoreboard players get #sam islands
function islands:lesson/1/sam/show_line with storage islands:tmp q
scoreboard players add #sam islands 1
scoreboard players operation #wp_sam islands = #sam islands
execute if score #sam islands matches 4.. run return run function islands:lesson/1/sam/done
schedule function islands:lesson/1/sam/next 50t
""")
w("function/lesson/1/sam/show_line.mcfunction", '$scoreboard players display name islands.q5 islands_q {text:"☐ עוזרים לסם: $(n) מתוך 3",color:"white"}')
w("function/lesson/1/sam/next.mcfunction", """
# Sam's next request, a moment after the last answer.
execute if score #sam islands matches 2 run dialog show @a islands:l1/sam_req2
execute if score #sam islands matches 3 run dialog show @a islands:l1/sam_req3
""")
w("function/lesson/1/sam/done.mcfunction", "\n".join([
    "# Sam has his three animals: back to Noa (she is right behind you).",
    "scoreboard players set #stage islands 5",
    line("islands.q5", "☑ עוזרים לסם: 3 מתוך 3", "green"),
    "scoreboard players set islands.q6 islands_q 3",
    line("islands.q6", "☐ בוחן המשלחת, אצל נועה"),
    "schedule function islands:lesson/1/sam/thanks 50t",
]))
w("function/lesson/1/sam/thanks.mcfunction", "dialog show @a islands:l1/sam_thanks")

# ------------------------------------------------------------------ the end
w("function/lesson/1/finish.mcfunction", "\n".join([
    "# The button at the end of Noa's last talk.",
    "execute unless score #stage islands matches 5 run return 0",
    "scoreboard players set #stage islands 6",
    line("islands.q8", "☑ סיימתם את שיעור 1", "green"),
    "title @a times 10 80 20",
    'title @a subtitle {text:"סיימתם את שיעור 1. להתראות בשיעור הבא",color:"white"}',
    'title @a title {text:"כל הכבוד!",color:"green",bold:true}',
    'execute at %s run summon minecraft:firework_rocket ~ ~2 ~ {LifeTime:20,FireworksItem:{id:"minecraft:firework_rocket",count:1,components:{"minecraft:fireworks":{flight_duration:1,explosions:[{shape:"large_ball",colors:[I;3066993,16766720]}]}}}}' % ME,
]))
print("lesson 1 written")
