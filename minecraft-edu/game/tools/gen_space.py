#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Writes the space demo (lesson 20, "בסיס ירח": the life cycle of a star): the moon world, its build, and the lesson.
Run it again after any change:

  python3 tools/gen_space.py

The world: a flat moon plain (worldgen/world_preset/moon.json) under a black sky with stars and the Sun
(dimension_type/moon.json, biome moon.json). Gravity is a sixth of the Earth's (the player's gravity attribute).
The topic comes from a middle-school space syllabus (astrophysics: the life cycle of stars, supernovae, black holes).
The lesson, in stages (score "#stage islands"), the same shape as lesson 1:
  0  land, talk to the base commander
  1  the star path: 6 models (nebula ... black hole), one question at each; she walks ahead
  2  the lab: a small star and a big star, a clock, millions of years; a table of what happened
  3  Max (English only, words with a Hebrew hover): show him 3 models
  4  back to her: a 3-question quiz      5  finished
"""
import io, json, math, os

B = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "starter", "mod", "src", "main", "resources", "data", "islands") + "/"


def w(rel, text):
    p = B + rel
    os.makedirs(os.path.dirname(p), exist_ok=True)
    io.open(p, "w", encoding="utf-8", newline="\n").write(text.strip("\n") + "\n")


def wj(rel, obj):
    w(rel, json.dumps(obj, ensure_ascii=False, indent=2))


LESSON = 20
SURF, FEET = -55, -54          # the top block of the moon plain, and where feet stand
TAG = "islands_l20"
ME = "@a[tag=islands_in,limit=1]"
CMD = {"text": "רוני, מפקדת הבסיס", "color": "gold"}
SUIT = 16383998                # the white of the suit
LOAD = (-48, -128, 192, 32)    # x0 z0 x1 z1 kept loaded while building

# ------------------------------------------------------------------ the world: dimension type, biome, preset
wj("dimension_type/moon.json", {
    "ambient_light": 0.0,
    "attributes": {
        "minecraft:audio/background_music": {"default": {"max_delay": 24000, "min_delay": 12000, "sound": "minecraft:music.end"}},
        "minecraft:gameplay/bed_rule": {"can_set_spawn": "never", "can_sleep": "never", "explodes": False},
        "minecraft:gameplay/respawn_anchor_works": False,
        # space: a black sky with stars and the Sun all day; no clouds; the Moon of the sky is under the horizon
        "minecraft:visual/sky_color": "#000000",
        "minecraft:visual/fog_color": "#000000",
        "minecraft:visual/cloud_color": "#00ffffff",
        "minecraft:visual/star_brightness": 0.6,
        "minecraft:visual/sun_angle": 50.0,
        "minecraft:visual/moon_angle": 230.0,
        "minecraft:visual/ambient_light_color": "#0a0a0a",
    },
    "coordinate_scale": 1.0, "default_clock": "minecraft:overworld", "has_ceiling": False, "has_ender_dragon_fight": False,
    "has_fixed_time": True, "has_skylight": True, "height": 384, "infiniburn": "#minecraft:infiniburn_overworld",
    "logical_height": 384, "min_y": -64, "monster_spawn_block_light_limit": 0, "monster_spawn_light_level": 0,
    "timelines": "#minecraft:universal"})
wj("worldgen/biome/moon.json", {
    "attributes": {"minecraft:visual/sky_color": "#000000", "minecraft:visual/fog_color": "#000000"},
    "carvers": [], "downfall": 0.0, "effects": {"water_color": "#3f76e4"}, "features": [[] for _ in range(11)],
    "has_precipitation": False, "spawn_costs": {},
    "spawners": {k: [] for k in ["ambient", "axolotls", "creature", "misc", "monster", "underground_water_creature", "water_ambient", "water_creature"]},
    "temperature": 0.5})
wj("worldgen/world_preset/moon.json", {"dimensions": {
    "minecraft:overworld": {"type": "islands:moon", "generator": {"type": "minecraft:flat", "settings": {
        "biome": "islands:moon", "features": False, "lakes": False, "structure_overrides": [],
        "layers": [{"block": "minecraft:bedrock", "height": 1}, {"block": "minecraft:stone", "height": 8},
                   {"block": "minecraft:light_gray_concrete_powder", "height": 1}]}}},
    "minecraft:the_end": {"type": "minecraft:the_end", "generator": {"type": "minecraft:noise", "biome_source": {"type": "minecraft:the_end"}, "settings": "minecraft:end"}},
    "minecraft:the_nether": {"type": "minecraft:the_nether", "generator": {"type": "minecraft:noise",
        "biome_source": {"type": "minecraft:multi_noise", "preset": "minecraft:nether"}, "settings": "minecraft:nether"}}}})


# ------------------------------------------------------------------ small builders (the same as lesson 1's)
def msg(t, width=300):
    return {"type": "minecraft:plain_message", "contents": {"text": t} if isinstance(t, str) else t, "width": width}


def act(label, n):
    return {"label": {"text": label}, "action": {"type": "minecraft:run_command", "command": "trigger islands_act set %d" % n}}


def notice(title, body, button="הבנתי"):
    return {"type": "minecraft:notice", "title": title, "body": body, "action": {"label": {"text": button}}}


def one_button(title, body, label, n):
    return {"type": "minecraft:multi_action", "title": title, "body": body, "actions": [act(label, n)], "columns": 1}


def options(key, question, answers):
    return {"type": "minecraft:single_option", "key": key, "label": {"text": question}, "width": 300,
            "options": [dict({"id": str(j + 1), "display": {"text": t}}, **({"initial": True} if j == 0 else {})) for j, t in enumerate(answers)]}


def line(holder, text, color="white"):
    return 'scoreboard players display name %s islands_q {text:"%s",color:"%s"}' % (holder, text, color)


def label(x, y, z, text, color, scale=1.6):
    return ('summon minecraft:text_display %s %s %s {text:{text:"%s",color:"%s",bold:true},billboard:"center",'
            'transformation:{translation:[0f,0f,0f],left_rotation:[0f,0f,0f,1f],scale:[%sf,%sf,%sf],right_rotation:[0f,0f,0f,1f]},Tags:["%s"]}'
            % (x, y, z, text, color, scale, scale, scale, TAG))


def h(*a):
    """A fixed pseudo-random number in 0..1 for a position: the same build every time."""
    v = 0
    for n in a:
        v = (v * 73856093 ^ (int(n) * 19349663 + 83492791)) & 0xFFFFFFFF
    v = (v ^ (v >> 13)) * 1274126177 & 0xFFFFFFFF
    return (v & 0xFFFF) / 65535.0


def runs(cells):
    """cells: {(x, y, z): block}. Joins neighbours along x with the same block into one fill."""
    out = []
    for (y, z) in sorted({(c[1], c[2]) for c in cells}):
        xs = sorted(c[0] for c in cells if c[1] == y and c[2] == z)
        start = prev = xs[0]
        for x in xs[1:] + [None]:
            if x is not None and x == prev + 1 and cells[(x, y, z)] == cells[(start, y, z)]:
                prev = x
                continue
            b = cells[(start, y, z)]
            out.append("setblock %d %d %d %s" % (start, y, z, b) if start == prev else "fill %d %d %d %d %d %d %s" % (start, y, z, prev, y, z, b))
            if x is not None:
                start = prev = x
    return out


def sphere(cx, cy, cz, r, color):
    cells, R = {}, int(math.ceil(r))
    for dx in range(-R, R + 1):
        for dy in range(-R, R + 1):
            for dz in range(-R, R + 1):
                if dx * dx + dy * dy + dz * dz <= r * r:
                    cells[(cx + dx, cy + dy, cz + dz)] = color(dx, dy, dz, r)
    return runs(cells)


# ------------------------------------------------------------------ the build
def pick(t, *blocks):
    return blocks[min(int(t * len(blocks)), len(blocks) - 1)]


def smooth(dx, dy, dz, s, seed):
    """A soft pattern on a sphere (for continents and spots)."""
    return (math.sin(dx * s + seed) + math.sin(dy * s * 1.3 + seed * 2) + math.sin(dz * s * 0.9 + seed * 3) + 3) / 6


def c_sun(dx, dy, dz, r):
    return "minecraft:ochre_froglight" if h(dx, dy, dz, 1) < 0.35 else ("minecraft:shroomlight" if h(dx, dy, dz, 2) < 0.3 else "minecraft:glowstone")


def c_earth(dx, dy, dz, r):
    if abs(dy) >= r - 1.2:
        return "minecraft:white_concrete"
    if h(dx, dy, dz, 7) < 0.08:
        return "minecraft:white_concrete"                       # clouds
    v = smooth(dx, dy, dz, 0.55, 1.7)
    return "minecraft:lime_concrete" if v > 0.62 else ("minecraft:green_concrete" if v > 0.57 else "minecraft:blue_concrete")



# The star life path: one model for each stage of a star's life, floating north of the path.
# (key, Hebrew, English, colour of the name, x, the item drawn for it in the notebook)
STAR_Z, STAR_Y, PATH_Z = -54, FEET + 14, -42
STAGES = [
    ("nebula", "ערפילית", "Nebula", "light_purple", 30),
    ("protostar", "פרוטוכוכב", "Protostar", "gold", 54),
    ("sunlike", "כוכב בוגר", "Main sequence star", "yellow", 74),
    ("redgiant", "ענק אדום", "Red giant", "red", 100),
    ("whitedwarf", "ננס לבן", "White dwarf", "white", 128),
    ("blackhole", "חור שחור", "Black hole", "dark_purple", 156),
]
LAB_X = 176                                   # the lab at the end of the path: two stars and a clock
SMALL_STAR = (168, FEET + 4, -50, 1.6)
BIG_STAR = (184, FEET + 6, -50)
CLOCK = (176, FEET, -46)
MAX_AT = (176, -36)
EARTH_SKY = (-10, FEET + 40, -110, 9.0)
CRATER = (-30, -38, 9, 5)                    # x, z, radius, depth
SMALL_CRATERS = [(14, -26, 3), (-14, 8, 3), (30, 10, 4), (-40, -10, 4), (40, -20, 3), (-5, -72, 4), (60, -10, 3), (110, -20, 4), (150, -12, 3)]
BASE = (12, -6, 5)                           # the glass dome: x, z, radius
LANDER = (-7, 15)                            # to the side: the player looks past it at the commander
JUMP_Z = -24

# the commander's route: (x, z). Stop 0 is by the lander, 1..6 are the six stages, 7 is the lab.
ROUTE = [(0, 6)] + [(s[4], PATH_Z) for s in STAGES] + [(LAB_X - 4, PATH_Z)]


def crater(cx, cz, r, depth):
    out = []
    R = r + 2
    for dx in range(-R, R + 1):
        for dz in range(-R, R + 1):
            d = math.sqrt(dx * dx + dz * dz)
            x, z = cx + dx, cz + dz
            if d <= r:
                k = int(round(depth * (1 - (d / r) ** 2)))
                if k > 0:
                    out.append("fill %d %d %d %d %d %d minecraft:air" % (x, SURF - k + 1, z, x, SURF, z))
                    out.append("setblock %d %d %d %s" % (x, SURF - k, z, "minecraft:gray_concrete_powder" if h(x, z, 5) < 0.3 else "minecraft:light_gray_concrete_powder"))
            elif d <= r + 1.6 and h(x, z, 6) < 0.85:
                out.append("setblock %d %d %d %s" % (x, SURF + 1, z, "minecraft:andesite" if h(x, z, 8) < 0.5 else "minecraft:light_gray_concrete_powder"))
    return out


build = ["# The moon base and the solar system. GENERATED by tools/gen_space.py. Don't edit by hand."]
# the plain: grey spots and stones
x0, z0, x1, z1 = LOAD
for x in range(x0, x1 + 1):
    for z in range(z0, z1 + 1):
        t = h(x, z, 11)
        if t < 0.015:
            build.append("setblock %d %d %d minecraft:gray_concrete_powder" % (x, SURF, z))
        elif t < 0.022:
            build.append("setblock %d %d %d minecraft:andesite" % (x, SURF + 1, z))
build.append("# the path to the planets")
build.append("fill %d %d %d %d %d %d minecraft:smooth_stone" % (20, SURF, PATH_Z - 1, 150, SURF, PATH_Z + 1))
build.append("# craters")
build += crater(*CRATER)
for cx, cz, r in SMALL_CRATERS:
    build += crater(cx, cz, r, max(1, r // 2))
# the lander
lx, lz = LANDER
build += ["# the lander",
          "fill %d %d %d %d %d %d minecraft:iron_bars" % (lx - 2, FEET, lz - 2, lx - 2, FEET + 1, lz - 2),
          "fill %d %d %d %d %d %d minecraft:iron_bars" % (lx + 2, FEET, lz - 2, lx + 2, FEET + 1, lz - 2),
          "fill %d %d %d %d %d %d minecraft:iron_bars" % (lx - 2, FEET, lz + 2, lx - 2, FEET + 1, lz + 2),
          "fill %d %d %d %d %d %d minecraft:iron_bars" % (lx + 2, FEET, lz + 2, lx + 2, FEET + 1, lz + 2),
          "fill %d %d %d %d %d %d minecraft:gold_block" % (lx - 2, FEET + 2, lz - 2, lx + 2, FEET + 2, lz + 2),
          "fill %d %d %d %d %d %d minecraft:white_concrete" % (lx - 1, FEET + 3, lz - 1, lx + 1, FEET + 5, lz + 1),
          "setblock %d %d %d minecraft:light_blue_stained_glass" % (lx, FEET + 4, lz - 1),
          "fill %d %d %d %d %d %d minecraft:iron_block" % (lx - 1, FEET + 6, lz - 1, lx + 1, FEET + 6, lz + 1),
          "setblock %d %d %d minecraft:lightning_rod" % (lx, FEET + 7, lz)]
# the base: a glass dome with a door to the west
bx, bz, br = BASE
dome = {}
for dx in range(-br, br + 1):
    for dz in range(-br, br + 1):
        for dy in range(0, br + 1):
            d = math.sqrt(dx * dx + dy * dy + dz * dz)
            if br - 0.75 <= d <= br + 0.25:
                dome[(bx + dx, FEET + dy, bz + dz)] = "minecraft:white_stained_glass" if dy < 2 else "minecraft:light_blue_stained_glass"
        if dx * dx + dz * dz <= br * br:
            dome[(bx + dx, SURF, bz + dz)] = "minecraft:white_concrete"
for dy in range(0, 3):
    for dz in (0, 1):
        dome.pop((bx - br, FEET + dy, bz + dz), None)
build += ["# the base"] + runs(dome)
build += ["setblock %d %d %d minecraft:smooth_stone_slab" % (bx + 1, FEET, bz), "setblock %d %d %d minecraft:smooth_stone_slab" % (bx + 2, FEET, bz),
          "setblock %d %d %d minecraft:sea_lantern" % (bx, FEET + br - 1, bz)]
# the jump field: rocks, each higher than the one before
build.append("# the jump field")
for i, hgt in enumerate([2, 3, 4, 5, 6]):
    x = -6 + i * 3
    build.append("fill %d %d %d %d %d %d minecraft:andesite" % (x, FEET, JUMP_Z, x + 1, FEET + hgt - 1, JUMP_Z + 1))
# Earth in the sky
ex, ey, ez, er = EARTH_SKY
build += ["# the Earth, high in the sky"] + sphere(ex, ey, ez, er, c_earth)


def cloud(cx, cy, cz, rx, ry, rz, share, blocks, seed):
    """A loose cloud: some of the cells inside an ellipsoid, more of them near the middle."""
    cells = {}
    for dx in range(-rx, rx + 1):
        for dy in range(-ry, ry + 1):
            for dz in range(-rz, rz + 1):
                d = (dx / rx) ** 2 + (dy / ry) ** 2 + (dz / rz) ** 2
                if d <= 1 and h(dx, dy, dz, seed) < share * (1.2 - d):
                    cells[(cx + dx, cy + dy, cz + dz)] = blocks[int(h(dx, dy, dz, seed + 1) * len(blocks)) % len(blocks)]
    return runs(cells)


def shell(cx, cy, cz, r0, r1, share, blocks, seed):
    cells, R = {}, int(math.ceil(r1))
    for dx in range(-R, R + 1):
        for dy in range(-R, R + 1):
            for dz in range(-R, R + 1):
                d = math.sqrt(dx * dx + dy * dy + dz * dz)
                if r0 <= d <= r1 and h(dx, dy, dz, seed) < share:
                    cells[(cx + dx, cy + dy, cz + dz)] = blocks[int(h(dx, dy, dz, seed + 1) * len(blocks)) % len(blocks)]
    return runs(cells)


def disk(cx, cy, cz, r0, r1, blocks):
    cells = {}
    for dx in range(-int(r1), int(r1) + 1):
        for dz in range(-int(r1), int(r1) + 1):
            d = math.sqrt(dx * dx + dz * dz)
            if r0 <= d <= r1:
                cells[(cx + dx, cy, cz + dz)] = blocks[min(int((d - r0) / (r1 - r0 + 0.01) * len(blocks)), len(blocks) - 1)]
    return runs(cells)


def mix(*pairs):
    """mix((block, share), ...): a block chosen by a fixed random number."""
    def color(dx, dy, dz, r):
        t, acc = h(dx, dy, dz, 21), 0.0
        for b, share in pairs:
            acc += share
            if t < acc:
                return b
        return pairs[-1][0]
    return color


def black_hole(cx, cy, cz, r, d0, d1):
    return (sphere(cx, cy, cz, r, lambda *a: "minecraft:black_concrete")
            + disk(cx, cy, cz, d0, d1, ["minecraft:pearlescent_froglight", "minecraft:ochre_froglight", "minecraft:orange_concrete", "minecraft:red_concrete"]))


X = {s[0]: s[4] for s in STAGES}
build += ["# 1 the nebula: gas and dust, and a few new stars in it"]
build += cloud(X["nebula"], STAR_Y, STAR_Z, 11, 6, 7, 0.45, ["minecraft:magenta_stained_glass", "minecraft:purple_stained_glass",
                                                             "minecraft:pink_stained_glass", "minecraft:light_blue_stained_glass", "minecraft:blue_stained_glass"], 31)
build += ["setblock %d %d %d minecraft:sea_lantern" % (X["nebula"] + dx, STAR_Y + dy, STAR_Z + dz) for dx, dy, dz in [(-4, 1, 0), (3, -2, 2), (6, 2, -1)]]
build += ["# 2 the protostar: a hot ball in a disk of gas"]
build += sphere(X["protostar"], STAR_Y, STAR_Z, 2.6, mix(("minecraft:magma_block", 0.5), ("minecraft:orange_concrete", 0.3), ("minecraft:red_concrete", 0.2)))
build += disk(X["protostar"], STAR_Y, STAR_Z, 4, 8, ["minecraft:orange_stained_glass", "minecraft:brown_stained_glass", "minecraft:gray_stained_glass"])
build += ["# 3 a star like the Sun"]
build += sphere(X["sunlike"], STAR_Y, STAR_Z, 5.0, c_sun)
build += ["# 4 the red giant"]
build += sphere(X["redgiant"], STAR_Y + 2, STAR_Z - 2, 10.0, mix(("minecraft:red_concrete", 0.55), ("minecraft:orange_concrete", 0.2), ("minecraft:magma_block", 0.15), ("minecraft:red_terracotta", 0.1)))
build += ["# 5 the white dwarf, inside the shell of gas its star let go"]
build += sphere(X["whitedwarf"], STAR_Y, STAR_Z, 1.5, lambda *a: "minecraft:sea_lantern")
build += shell(X["whitedwarf"], STAR_Y, STAR_Z, 6.5, 8.0, 0.35, ["minecraft:cyan_stained_glass", "minecraft:light_blue_stained_glass", "minecraft:lime_stained_glass", "minecraft:magenta_stained_glass"], 41)
build += ["# 6 what a supernova leaves: torn gas, and a black hole in the middle"]
build += shell(X["blackhole"], STAR_Y, STAR_Z, 9.0, 12.0, 0.12, ["minecraft:red_stained_glass", "minecraft:orange_stained_glass", "minecraft:yellow_stained_glass", "minecraft:light_blue_stained_glass"], 51)
build += black_hole(X["blackhole"], STAR_Y, STAR_Z, 2.5, 4, 7)
build += ["# the lab: a bench, two stars and a clock"]
build += ["fill %d %d %d %d %d %d minecraft:white_concrete" % (LAB_X - 12, SURF, PATH_Z - 12, LAB_X + 12, SURF, PATH_Z - 3)]
cx_, cy_, cz_ = CLOCK
build += ["setblock %d %d %d minecraft:polished_andesite" % (cx_, cy_, cz_)]
sx, sy, sz, sr = SMALL_STAR
build += ["fill %d %d %d %d %d %d minecraft:iron_block" % (sx, FEET, sz, sx, sy - 3, sz)] + sphere(sx, sy, sz, sr, c_sun)
bx_, by_, bz_ = BIG_STAR
build += ["fill %d %d %d %d %d %d minecraft:iron_block" % (bx_, FEET, bz_, bx_, by_ - 5, bz_)]
# the big star in its three looks, as functions the lab runs
clear = "fill %d %d %d %d %d %d minecraft:air" % (bx_ - 6, by_ - 4, bz_ - 6, bx_ + 6, by_ + 6, bz_ + 6)
w("function/space/big_blue.mcfunction", "\n".join(["# The big star, young: blue-white and huge. GENERATED by tools/gen_space.py.", clear]
                                                   + sphere(bx_, by_, bz_, 3.2, mix(("minecraft:sea_lantern", 0.5), ("minecraft:light_blue_concrete", 0.3), ("minecraft:white_concrete", 0.2)))))
w("function/space/big_red.mcfunction", "\n".join(["# The big star, old: a red supergiant. GENERATED by tools/gen_space.py.", clear]
                                                  + sphere(bx_, by_ + 1, bz_, 5.0, mix(("minecraft:red_concrete", 0.6), ("minecraft:orange_concrete", 0.25), ("minecraft:magma_block", 0.15)))))
w("function/space/big_hole.mcfunction", "\n".join(["# The big star after its supernova: a black hole. GENERATED by tools/gen_space.py.", clear]
                                                   + black_hole(bx_, by_, bz_, 1.5, 2.5, 4.5)))
build += ["function islands:space/big_blue"]
build += ["# the path"] + ["fill %d %d %d %d %d %d minecraft:smooth_stone" % (20, SURF, PATH_Z - 1, LAB_X - 4, SURF, PATH_Z + 1)]
build += ["setworldspawn 0 %d 17" % FEET,
          "scoreboard players set #built islands 1", "scoreboard players reset #building islands", "function islands:lesson/start"]

w("function/space/start.mcfunction", """
# First start of the moon world: keep its chunks loaded, then build once they are. GENERATED by tools/gen_space.py.
scoreboard players set #building islands 1
forceload add %d %d %d %d
schedule function islands:space/wait 20t
""" % LOAD)
w("function/space/wait.mcfunction", "\n".join(
    ["# Build only when every corner is loaded."] +
    ["execute unless loaded %d 0 %d run return run schedule function islands:space/wait 10t" % (x, z) for x in (x0, x1) for z in (z0, z1)] +
    ["function islands:space/build"]))
w("function/space/build.mcfunction", "\n".join(build))
w("function/space/goto_start.mcfunction", """
# Puts the player (@s) next to the lander, facing the base commander. GENERATED by tools/gen_space.py.
tp @s 0.5 %d 17.5 facing 0.5 %d 6.5
""" % (FEET, FEET + 1))

# ------------------------------------------------------------------ the texts
TEACH = [   # (what she says, the question, the answers, the right one, a grey line under it) - one per stage, in order
    (["זו ערפילית: ענן ענק של גז ואבק בחלל. רוב הגז הוא מימן.",
      "כאן נולדים כוכבים. כוח המשיכה מושך חלקים של הענן זה אל זה, והם נעשים צפופים יותר ויותר."],
     "מה יש בערפילית?", ["גז ואבק", "מים וקרח", "סלעים וחול"], 1,
     "הנקודות הלבנות בתוך הענן הן כוכבים חדשים."),
    (["הגוש הכתום הוא פרוטוכוכב: כוכב שעדיין לא סיים להיווצר. כוח המשיכה דוחס את הגז, והגוש מתחמם.",
      "כשהמרכז שלו מגיע לחום של מיליוני מעלות, מתחיל בו היתוך גרעיני (בתחנה הבאה נסביר מה זה), ונולד כוכב."],
     "מה דוחס את הגז ומחמם אותו?", ["רוח שנושבת בחלל", "האור של כוכבים אחרים", "כוח המשיכה"], 3,
     "הדיסקה מסביב היא גז שעוד נופל אל הכוכב."),
    (["זה כוכב בוגר, כמו השמש שלנו. במרכז שלו המימן הופך להליום. זה נקרא היתוך גרעיני.",
      "ההיתוך משחרר אנרגיה עצומה: האור והחום שמגיעים אלינו. השמש נמצאת בשלב הזה כבר בערך 4.5 מיליארד שנה."],
     "מאיפה מגיעים האור והחום של כוכב?", ["מאש של עצים שבוערים בו", "מהיתוך גרעיני במרכז שלו", "מהאור של כוכבים אחרים"], 2,
     "רוב הכוכבים בגלקסיה שלנו נמצאים בשלב הזה."),
    (["כשהמימן במרכז נגמר, הכוכב מתנפח מאוד. השכבות החיצוניות שלו מתקררות, ולכן הוא נראה אדום.",
      "גם השמש תהפוך לענק אדום, בעוד בערך 5 מיליארד שנה."],
     "למה הענק האדום נראה אדום?", ["הוא החם ביותר מכל הכוכבים", "הוא עשוי מאבנים אדומות", "השכבות החיצוניות שלו קרות יותר מהשכבות של השמש"], 3,
     "ענק אדום יכול להיות רחב פי מאה ויותר מהשמש."),
    (["כוכב כמו השמש מסיים את חייו בשקט. הוא משחרר לחלל את השכבות החיצוניות שלו, והן יוצרות ענן צבעוני.",
      "מה שנשאר במרכז הוא ננס לבן: כוכב קטן, בערך בגודל של כדור הארץ, שמתקרר לאט מאוד."],
     "מה נשאר בסוף מכוכב כמו השמש?", ["חור שחור", "ננס לבן", "כלום"], 2,
     "הענן הצבעוני מסביב הוא השכבות שהכוכב שחרר."),
    (["כוכב ענק הוא כוכב כבד הרבה יותר מהשמש. כוכב כזה מסיים את חייו בפיצוץ אדיר: סופרנובה.",
      "אחרי הפיצוץ יכול להישאר חור שחור: כוח המשיכה שלו חזק כל כך, שאפילו אור לא יכול לברוח ממנו."],
     "למה חור שחור נקרא ״שחור״?", ["כי הוא צבוע בשחור", "כי הוא רחוק מאוד", "כי אפילו אור לא יכול לברוח ממנו"], 3,
     "החמצן והפחמן שבגוף שלכם נוצרו בתוך כוכבים, ופוזרו בחלל כשהכוכבים מתו."),
]
LAB = [("מה קרה לכוכב הקטן?", ["הוא התפוצץ", "הוא נעלם", "הוא עדיין זוהר"], 3),
       ("מה קרה לכוכב הענק?", ["הוא עדיין זוהר", "הוא התפוצץ, ונשאר ממנו חור שחור", "הוא הפך לכוכב קטן"], 2),
       ("איזה כוכב חי יותר זמן?", ["הכוכב הקטן", "הכוכב הענק", "שניהם חיים אותו זמן"], 1)]
LAB_ANSWER = 7000 + 100 * LAB[0][2] + 10 * LAB[1][2] + LAB[2][2]
QUIZ = [("איפה נולדים כוכבים?", ["בחור שחור", "בערפילית", "בענק אדום"], 2),
        ("מה יקרה לשמש בעוד בערך 5 מיליארד שנה?", ["היא תהפוך לענק אדום", "היא תהפוך לחור שחור", "היא תתפוצץ בסופרנובה"], 1),
        ("מה מחזיק את הגז של כוכב יחד?", ["הרוח בחלל", "האבק", "כוח המשיכה"], 3)]
# Max speaks only English. (the request, with the hard words glossed; the stage it asks for)
MAX = {"text": "Max", "color": "aqua"}
REQ = [("Show me a {cloud|ענן} of {gas|גז} and {dust|אבק}. {Stars|כוכבים} are {born|נולדים} there.", "nebula"),
       ("Now show me a {big|גדול} {red|אדום} {star|כוכב}. It is {old|זקן}.", "redgiant"),
       ("Show me the {place|מקום} where {light|אור} cannot {escape|לברוח}.", "blackhole")]
EN_NAME = {"nebula": "the nebula", "protostar": "the protostar", "sunlike": "a star like our Sun", "redgiant": "the red giant",
           "whitedwarf": "the white dwarf", "blackhole": "the black hole"}
NT = len(TEACH)
HELP_HE = {"text": "לא מבינים מילה? מעבירים את העכבר מעל מילה כחולה, ורואים מה היא אומרת.", "color": "gray"}


def gloss(text):
    """English with help: "a {small|קטן} star" -> the word small is blue, and hovering over it shows the Hebrew."""
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


def english(word):
    return msg([{"text": "באנגלית: ", "color": "gray"}, {"text": word, "color": "aqua", "bold": True}])


wj("dialog/space/welcome.json", notice({"text": "בסיס ירח", "color": "gold"}, [
    msg("נחתתם על הירח! מפקדת הבסיס מחכה לכם ליד החללית."),
    msg("כדי לדבר איתה, לוחצים עליה קליק ימני.")], "לצאת מהחללית"))
wj("dialog/space/guide.json", one_button(CMD, [
    msg("ברוכים הבאים לבסיס הירח. אני רוני, מפקדת הבסיס."),
    msg("לירח אין אוויר, ולכן השמיים כאן שחורים, וגם ביום רואים כוכבים. היום נלמד איך כוכב נולד, חי ומת."),
    msg("נלך יחד בשביל הכוכבים. בכל תחנה יש דגם של שלב אחד בחיים של כוכב, ואשאל אתכם שאלה אחת."),
    msg({"text": "כוח המשיכה כאן הוא רק שישית מכוח המשיכה בכדור הארץ, אז קופצים גבוה!", "color": "gray"})],
    "ללבוש חליפה ולצאת", 50))
wj("dialog/space/guide_walk.json", notice(CMD, [msg("בואו אחריי לתחנה הבאה. כשמגיעים אליי, לוחצים עליי קליק ימני.")]))
wj("dialog/space/guide_lab.json", notice(CMD, [
    msg("ראיתם את כל שלבי החיים של כוכב. עכשיו ניסוי: במעבדה, בסוף השביל, יש שני כוכבים, כוכב קטן וכוכב ענק."),
    msg("לוחצים קליק ימני על השעון, וכך מדלגים קדימה מיליוני שנים. מה יקרה לכל אחד מהם?")], "ללכת למעבדה"))
wj("dialog/space/guide_max.json", notice(CMD, [
    msg("נכון! כוכב ענק שורף את הדלק שלו מהר מאוד, ולכן הוא חי רק מיליוני שנים. כוכב קטן חי מיליארדי שנים."),
    msg("ועכשיו פוגשים את מקס. הוא חוקר כוכבים, ומדבר רק אנגלית. הוא מחכה ליד המעבדה. לוחצים עליו קליק ימני.")], "ללכת למקס"))
wj("dialog/space/guide_wait_max.json", notice(CMD, [msg("מקס מחכה לעזרה שלכם, ליד המעבדה.")]))
wj("dialog/space/quiz.json", {
    "type": "minecraft:multi_action", "title": {"text": "בוחן הבסיס", "color": "gold"},
    "body": [msg("שלוש שאלות על מה שלמדתם היום. עונים לבד, בלי לנחש.")],
    "inputs": [options("q%d" % (j + 1), q, a) for j, (q, a, _) in enumerate(QUIZ)],
    "actions": [{"label": {"text": "לסיים את הבוחן"}, "action": {"type": "minecraft:dynamic/run_command",
                 "template": "trigger islands_act set 6" + "".join("$(q%d)" % (j + 1) for j in range(len(QUIZ)))}}],
    "columns": 1})
wj("dialog/space/done.json", one_button({"text": "סיכום הסיור", "color": "green"}, [
    msg("סיימתם את הסיור בבסיס הירח!"),
    msg("כוכב נולד בערפילית, הופך לפרוטוכוכב, וחי רוב חייו ככוכב בוגר. אחר כך הוא מתנפח לענק אדום."),
    msg("כוכב כמו השמש מסתיים בננס לבן. כוכב ענק מתפוצץ בסופרנובה, ויכול להשאיר חור שחור."),
    msg("הכול רשום ביומן הכוכבים: לוחצים על המקש N.")],
    "לסיים את הסיור", 51))
wj("dialog/space/after.json", notice(CMD, [msg("סיימתם את הסיור. אפשר להמשיך לקפוץ על הירח, או לסגור את המשחק.")]))
wj("dialog/space/wrong.json", {"type": "minecraft:multi_action", "title": CMD,
   "body": [msg("לא בדיוק. קוראים שוב מה שאמרתי, ומנסים עוד פעם.")], "actions": [act("לנסות שוב", 1)], "columns": 1})
for k, (says, question, answers, right, hint) in enumerate(TEACH):
    key, he, en, col, x = STAGES[k]
    wj("dialog/space/teach_%d.json" % k, {
        "type": "minecraft:multi_action", "title": {"text": "תחנה %d: %s" % (k + 1, he), "color": "gold"},
        "body": [msg(t) for t in says] + [english(en), msg({"text": hint, "color": "gray"})],
        "inputs": [options("a", question, answers)],
        "actions": [{"label": {"text": "זאת התשובה שלי"}, "action": {"type": "minecraft:dynamic/run_command", "template": "trigger islands_act set 5%d$(a)" % k}}],
        "columns": 1})
wj("dialog/space/lab_table.json", {
    "type": "minecraft:multi_action", "title": {"text": "מה ראיתם במעבדה?", "color": "gold"},
    "body": [msg("עברו מיליוני שנים. עונים לפי מה שראיתם. אפשר לסגור, להסתכל שוב, ולחזור בקליק ימני על השעון.")],
    "inputs": [options("l%d" % (j + 1), q, a) for j, (q, a, _) in enumerate(LAB)],
    "actions": [{"label": {"text": "לבדוק"}, "action": {"type": "minecraft:dynamic/run_command",
                 "template": "trigger islands_act set 7" + "".join("$(l%d)" % (j + 1) for j in range(len(LAB)))}}],
    "columns": 1})
wj("dialog/space/max_intro.json", one_button(MAX, [
    msg(gloss("Hi! I am Max. I only {speak|לדבר} {English|אנגלית}.")),
    msg(gloss("I {study|לחקור} {stars|כוכבים}. Can you {help|לעזור} me?")),
    msg(HELP_HE)], "OK!", 60))
for j, (text, _) in enumerate(REQ):
    wj("dialog/space/max_req%d.json" % (j + 1), notice(MAX, [
        msg(gloss(text)),
        msg({"text": "הולכים אל הדגם הנכון לאורך השביל, ולוחצים קליק ימני על הבלוק שמתחת למספר, מול הדגם.", "color": "gray"}), msg(HELP_HE)], "OK"))
wj("dialog/space/max_thanks.json", notice(MAX, [msg(gloss("{Thank you|תודה}! {Great job|כל הכבוד}! Now go back to the {commander|מפקדת}."))], "Bye!"))

# ------------------------------------------------------------------ the lesson
L = "function/lesson/%d/" % LESSON
F = "islands:lesson/%d/" % LESSON
suit = 'minecraft:leather_%s[minecraft:dyed_color=%d]' % ("%s", SUIT)


def person(x, y, z, rot, skin, name, color, tag):
    return ("summon minecraft:mannequin %s %s %s {profile:{texture:\"islands:entity/%s\",model:\"wide\"},immovable:1b,hide_description:1b,"
            "Invulnerable:1b,Silent:1b,Rotation:[%sf,0f],CustomName:{text:\"%s\",color:\"%s\"},CustomNameVisible:1b,Tags:[\"islands_npc\",\"%s\"],"
            "equipment:{head:{id:\"minecraft:glass\",count:1},chest:{id:\"minecraft:leather_chestplate\",count:1,components:{\"minecraft:dyed_color\":%d}},"
            "legs:{id:\"minecraft:leather_leggings\",count:1,components:{\"minecraft:dyed_color\":%d}},feet:{id:\"minecraft:leather_boots\",count:1,components:{\"minecraft:dyed_color\":%d}}}}"
            % (x, y, z, skin, rot, name, color, tag, SUIT, SUIT, SUIT))


marks, labels = [], [label("%d.5" % BASE[0], FEET + BASE[2] + 1.5, "%d.5" % BASE[1], "בסיס ירח", "white"),
                     label("0.5", FEET + 8, "%d.5" % JUMP_Z, "שדה הקפיצות", "white"),
                     label("%d.5" % CRATER[0], FEET + 4, "%d.5" % CRATER[1], "מכתש", "white"),
                     label("%d.5" % LAB_X, FEET + 4, "%d.5" % (PATH_Z - 4), "המעבדה", "gold", 2.0),
                     label("%d.5" % SMALL_STAR[0], SMALL_STAR[1] + 2.6, "%d.5" % SMALL_STAR[2], "כוכב קטן", "white", 1.2),
                     label("%d.5" % BIG_STAR[0], BIG_STAR[1] + 6.5, "%d.5" % BIG_STAR[2], "כוכב ענק", "white", 1.2),
                     label("%d.5" % CLOCK[0], CLOCK[1] + 2.4, "%d.5" % CLOCK[2], "השעון", "gold", 1.2)]
for i, (key, he, en, col, x) in enumerate(STAGES):
    top = STAR_Y + (12 if key == "redgiant" else 8 if key in ("nebula", "protostar", "sunlike") else 9 if key == "whitedwarf" else 13)
    labels.append(label("%d.5" % x, top + 1.0, "%d.5" % STAR_Z, he, col, 2.2))
    labels.append(label("%d.5" % x, top, "%d.5" % STAR_Z, en, "aqua", 1.4))
    # a pedestal in front of each model, the thing you right-click to show it to Max
    marks += ["setblock %d %d %d minecraft:lodestone" % (x, FEET, PATH_Z - 3),
              'summon minecraft:interaction %d.5 %d %d.5 {width:1.2f,height:2.0f,response:1b,Tags:["%s","star_mark","mark_%s"]}' % (x, FEET, PATH_Z - 3, TAG, key),
              label("%d.5" % x, FEET + 1.6, "%d.5" % (PATH_Z - 3), "%d" % (i + 1), "gold", 1.0)]
w(L + "start.mcfunction", "\n".join([
    "# The space demo (בסיס ירח: מחזור החיים של כוכב). Runs once, right after the moon is built. GENERATED by tools/gen_space.py.",
    person("0.5", FEET, "6.5", 180, "noa", CMD["text"], "gold", "guide"),
    person("%d.5" % MAX_AT[0], FEET, "%d.5" % MAX_AT[1], 180, "sam", "Max", "aqua", "sam"),
    'summon minecraft:interaction %d.5 %d %d.5 {width:1.1f,height:1.1f,response:1b,Tags:["%s","lab_clock"]}' % (CLOCK[0], CLOCK[1] + 1, CLOCK[2], TAG),
    'summon minecraft:item_display %d.5 %s %d.5 {item:{id:"minecraft:clock",count:1},billboard:"vertical",Tags:["%s"]}' % (CLOCK[0], CLOCK[1] + 1.5, CLOCK[2], TAG),
] + marks + labels + [
    "scoreboard players set #10 islands 10", "scoreboard players set #100 islands 100",
    "scoreboard players set #stage islands 0", "scoreboard players set #learn islands 0",
    "scoreboard players set #wp_cmd islands 0", "scoreboard players set #said_cmd islands 0",
    "scoreboard players set #lab islands 0", "scoreboard players set #max islands 0",
    "scoreboard players set #quizdone islands 0", "scoreboard players set #quiz islands 0",
    "function islands:quest/setup",
] + ["scoreboard players set islands.s%d islands_q %d" % (i, 10 - i) for i in range(1, 6)] + [
    line("islands.s1", "☐ מדברים עם מפקדת הבסיס"),
    line("islands.s2", "☐ שביל הכוכבים: 0 מתוך %d תחנות" % NT, "gray"),
    line("islands.s3", "☐ ניסוי במעבדה", "gray"),
    line("islands.s4", "☐ עוזרים למקס, באנגלית", "gray"),
    line("islands.s5", "☐ בוחן הבסיס", "gray"),
]))
w(L + "arrive.mcfunction", """
# The first moment on the moon (as the player). Gravity here is a sixth of the Earth's.
attribute @s minecraft:gravity base set 0.0133
title @s times 10 60 20
title @s subtitle {text:"הדגמה: מחזור החיים של כוכב",color:"white"}
title @s title {text:"בסיס ירח",color:"gold",bold:true}
dialog show @s islands:space/welcome
""")
w(L + "tick.mcfunction", "# Every tick of the space demo.\nfunction %spath/tick" % F)
w(L + "talk_guide.mcfunction", """
# The player (@s) talks to the commander. What she says depends on where the lesson is.
execute if score #stage islands matches 0 run dialog show @s islands:space/guide
execute if score #stage islands matches 1 run function %steach/talk
execute if score #stage islands matches 2 run dialog show @s islands:space/guide_lab
execute if score #stage islands matches 3 run dialog show @s islands:space/guide_wait_max
execute if score #stage islands matches 4 run dialog show @s islands:space/quiz
execute if score #stage islands matches 5.. run dialog show @s islands:space/after
""" % F)
w(L + "use_entity.mcfunction", """
# A right-click on an entity in the space demo (as the player; the entity has the tag islands_target).
execute if entity @e[tag=islands_target,tag=lab_clock] run return run function %slab/clock
execute if score #stage islands matches 3 if score #max islands matches 1..3 if entity @e[tag=islands_target,tag=star_mark] run function %smax/show
""" % (F, F))
w(L + "talk_max.mcfunction", """
# The player (@s) talks to Max.
scoreboard players set #cancel islands 1
execute unless score #stage islands matches 3.. run return run title @s actionbar {text:"Max: Hi! The commander needs you first.",color:"aqua"}
execute if score #stage islands matches 4.. run return run dialog show @s islands:space/max_thanks
execute if score #max islands matches 0 run return run dialog show @s islands:space/max_intro
function %smax/request
""" % F)
w(L + "begin.mcfunction", "\n".join([
    "# \"Put on the suit and go\" (as the player): the suit, and the tour starts.",
    "execute unless score #stage islands matches 0 run return 0",
    "item replace entity @s armor.head with minecraft:glass",
    "item replace entity @s armor.chest with " + suit % "chestplate",
    "item replace entity @s armor.legs with " + suit % "leggings",
    "item replace entity @s armor.feet with " + suit % "boots",
    "scoreboard players set #stage islands 1", "scoreboard players set #wp_cmd islands 1",
    line("islands.s1", "☑ מדברים עם מפקדת הבסיס", "green"),
    line("islands.s2", "☐ שביל הכוכבים: 0 מתוך %d תחנות" % NT),
    'title @s actionbar {text:"הולכים אחרי רוני לתחנה הראשונה",color:"gold"}',
]))
# the route
ptick = ["# The commander walks to the stop #wp_cmd points at."]
for i, (x, z) in enumerate(ROUTE):
    ptick.append("execute if score #wp_cmd islands matches %d positioned %d.5 %d %d.5 as @e[tag=guide,limit=1] run function %spath/cmd_%d" % (i, x, FEET, z, F, i))
    lines = ["# The commander and stop %d (as her; the position is the stop)." % i,
             "execute unless entity @s[distance=..1.3] run return run function islands:path/%s" % ("go" if i == len(ROUTE) - 1 else "walk"),
             "function islands:path/stand"]
    if 1 <= i <= NT:
        lines += ["execute at @s unless entity @a[tag=islands_in,distance=..8] run return 0",
                  'execute unless score #said_cmd islands matches %d.. run title @a actionbar {text:"רוני: הגענו לתחנה %d. קליק ימני עליי.",color:"gold"}' % (i, i),
                  "execute unless score #said_cmd islands matches %d.. run scoreboard players set #said_cmd islands %d" % (i, i)]
    w(L + "path/cmd_%d.mcfunction" % i, "\n".join(lines))
w(L + "path/tick.mcfunction", "\n".join(ptick))
# teaching
talk = ["# The player (@s) talks to the commander during the tour: the question of the stop she is at, if it is still open."]
answer = ["# A teaching question was answered (as the player). islands_act = 5, the stop's number, the answer."]
for k, t in enumerate(TEACH):
    talk.append("execute if score #wp_cmd islands matches %d if score #learn islands matches %d at @s if entity @e[tag=guide,distance=..9] run return run dialog show @s islands:space/teach_%d" % (k + 1, k, k))
    answer.append("execute if score #learn islands matches %d if score @s islands_act matches 5%d%d run return run function %steach/right" % (k, k, t[3], F))
talk.append("dialog show @s islands:space/guide_walk")
answer.append("dialog show @s islands:space/wrong")
w(L + "teach/talk.mcfunction", "\n".join(talk))
w(L + "teach/answer.mcfunction", "\n".join(answer))
w(L + "teach/right.mcfunction", "\n".join([
    "# The right answer: the stage is marked in the star log, and the commander walks on.",
    "scoreboard players add #learn islands 1",
    "execute at @e[tag=guide,limit=1] run particle minecraft:happy_villager ~ ~1.2 ~ 0.4 0.5 0.4 0 20",
    "playsound minecraft:entity.player.levelup master @s ~ ~ ~ 1 1.3",
    'title @s actionbar {text:"נכון! השלב סומן ביומן הכוכבים (מקש N).",color:"green"}',
    "execute store result storage islands:tmp q.n int 1 run scoreboard players get #learn islands",
    "function %steach/show_line with storage islands:tmp q" % F,
    "scoreboard players add #wp_cmd islands 1",
    "execute if score #learn islands matches %d.. run function %slab/begin" % (NT, F),
]))
w(L + "teach/show_line.mcfunction", '$scoreboard players display name islands.s2 islands_q {text:"☐ שביל הכוכבים: $(n) מתוך %d תחנות",color:"white"}' % NT)
# the lab
w(L + "lab/begin.mcfunction", "\n".join([
    "# The path is done: to the lab (as the player).",
    "scoreboard players set #stage islands 2",
    line("islands.s2", "☑ שביל הכוכבים: %d מתוך %d תחנות" % (NT, NT), "green"),
    line("islands.s3", "☐ ניסוי במעבדה: קליק ימני על השעון"),
    "dialog show @s islands:space/guide_lab",
]))
w(L + "lab/clock.mcfunction", "\n".join([
    "# The lab clock was right-clicked (as the player).",
    "scoreboard players set #cancel islands 1",
    'execute if score #stage islands matches ..1 run return run title @s actionbar {text:"הניסוי עוד לא מוכן. קודם הולכים בשביל הכוכבים.",color:"gray"}',
    'execute if score #stage islands matches 3.. run return run title @s actionbar {text:"הניסוי הסתיים. התוצאות ביומן הכוכבים: מקש N.",color:"gray"}',
    "execute if score #lab islands matches 2 run return run dialog show @s islands:space/lab_table",
    "execute if score #lab islands matches 1 run return 0",
    "scoreboard players set #lab islands 1",
    "title @a times 5 50 10",
    'title @a subtitle {text:"עוברים מיליוני שנים...",color:"white"}',
    'title @a title {text:"⏳",color:"yellow"}',
    "execute as @a[tag=islands_in] at @s run playsound minecraft:block.beacon.power_select master @s ~ ~ ~ 1 0.6",
    "schedule function %slab/step1 50t" % F,
]))
w(L + "lab/step1.mcfunction", "\n".join([
    "# The big star has used up its fuel: it swells into a red supergiant. The small one is still the same.",
    "function islands:space/big_red",
    'title @a actionbar {text:"הכוכב הענק התנפח והאדים...",color:"red"}',
    "schedule function %slab/step2 60t" % F,
]))
w(L + "lab/step2.mcfunction", "\n".join([
    "# Supernova: the big star explodes and leaves a black hole.",
    "function islands:space/big_hole",
    "particle minecraft:explosion_emitter %d %d %d 2 2 2 0 6 force" % BIG_STAR,
    "particle minecraft:end_rod %d %d %d 3 3 3 0.4 300 force" % BIG_STAR,
    "execute as @a[tag=islands_in] at @s run playsound minecraft:entity.generic.explode master @s ~ ~ ~ 1 0.5",
    'title @a subtitle {text:"הכוכב הענק התפוצץ",color:"white"}',
    'title @a title {text:"סופרנובה!",color:"gold",bold:true}',
    "scoreboard players set #lab islands 2",
    "schedule function %slab/step3 60t" % F,
]))
w(L + "lab/step3.mcfunction", "\n".join([
    "# The lab's question table.",
    "execute as @a[tag=islands_in] run dialog show @s islands:space/lab_table",
]))
w(L + "lab/check.mcfunction", "\n".join([
    "# The lab table was sent (as the player). islands_act = 7 and then one digit for each answer.",
    "execute unless score #stage islands matches 2 run return 0",
    'execute unless score @s islands_act matches %d run return run title @s actionbar {text:"יש טעות. קליק ימני על השעון, ובודקים שוב.",color:"red"}' % LAB_ANSWER,
    "scoreboard players set #stage islands 3",
    "scoreboard players set #lab islands 3",
    "playsound minecraft:entity.player.levelup master @s ~ ~ ~ 1 1.3",
    line("islands.s3", "☑ ניסוי במעבדה", "green"),
    line("islands.s4", "☐ עוזרים למקס, באנגלית"),
    "dialog show @s islands:space/guide_max",
]))
# Max
w(L + "max/begin.mcfunction", "\n".join([
    "# Max's \"OK!\" (as the player): his first request.",
    "execute unless score #stage islands matches 3 run return 0",
    "execute unless score #max islands matches 0 run return 0",
    "scoreboard players set #max islands 1",
    "function %smax/request" % F,
]))
w(L + "max/request.mcfunction", "\n".join(["# Max asks for what #max points at (as the player)."] +
    ["execute if score #max islands matches %d run dialog show @s islands:space/max_req%d" % (j + 1, j + 1) for j in range(len(REQ))]))
show = ["# The player right-clicked a pedestal while Max is asking (as the player)."]
for j, (_, want) in enumerate(REQ):
    show.append("execute if score #max islands matches %d if entity @e[tag=islands_target,tag=mark_%s] run return run function %smax/right" % (j + 1, want, F))
for key in EN_NAME:
    show.append('execute if entity @e[tag=islands_target,tag=mark_%s] run title @s actionbar {text:"Max: No, that is %s. Try again!",color:"red"}' % (key, EN_NAME[key]))
w(L + "max/show.mcfunction", "\n".join(show))
w(L + "max/right.mcfunction", "\n".join([
    "# The right model (as the player).",
    "scoreboard players set #cancel islands 1",
    "scoreboard players add #max islands 1",
    "playsound minecraft:entity.player.levelup master @s ~ ~ ~ 1 1.5",
    'title @s actionbar {text:"Max: Yes! Thank you!",color:"aqua"}',
    "execute if score #max islands matches %d.. run return run function %smax/done" % (len(REQ) + 1, F),
    "function %smax/request" % F,
]))
w(L + "max/done.mcfunction", "\n".join([
    "# All of Max's requests (as the player): back to the commander for the quiz.",
    "scoreboard players set #stage islands 4",
    line("islands.s4", "☑ עוזרים למקס, באנגלית", "green"),
    line("islands.s5", "☐ בוחן הבסיס: מדברים עם רוני"),
    "dialog show @s islands:space/max_thanks",
]))
# the quiz
quiz = ["# The quiz was sent (as the player). islands_act = 6 and then one digit for each answer.",
        "execute unless score #stage islands matches 4 run return 0",
        "scoreboard players operation #v islands = @s islands_act", "scoreboard players remove #v islands 6000", "scoreboard players set #quiz islands 0"]
div = 100
for j, (_, _, right) in enumerate(QUIZ):
    quiz += ["scoreboard players operation #digit islands = #v islands", "scoreboard players set #div islands %d" % div,
             "scoreboard players operation #digit islands /= #div islands", "scoreboard players operation #digit islands %= #10 islands",
             "execute if score #digit islands matches %d run scoreboard players add #quiz islands 1" % right]
    div //= 10
quiz += ["scoreboard players set #quizdone islands 1", "scoreboard players set #stage islands 5",
         "execute store result storage islands:tmp q.n int 1 run scoreboard players get #quiz islands",
         "function %squiz/show with storage islands:tmp q" % F,
         "dialog show @s islands:space/done"]
w(L + "quiz/check.mcfunction", "\n".join(quiz))
w(L + "quiz/show.mcfunction", '$scoreboard players display name islands.s5 islands_q {text:"☑ בוחן הבסיס: $(n) מתוך %d נכונות",color:"green"}' % len(QUIZ))
w(L + "finish.mcfunction", """
# "Finish the tour" (as the player).
title @s times 10 70 20
title @s subtitle {text:"סיימתם את הסיור בבסיס הירח",color:"white"}
title @s title {text:"כל הכבוד!",color:"gold",bold:true}
execute at @s run particle minecraft:end_rod ~ ~1 ~ 1 1 1 0.05 60
playsound minecraft:ui.toast.challenge_complete master @s ~ ~ ~ 1 1
""")
print("space demo written: %d build lines" % len(build))
