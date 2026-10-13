#!/usr/bin/env python3
"""Generates the test island as datapack functions (fill / fillbiome / place / summon commands).

This is the code-built map for testing. A hand-built map (Ben's sister, in Creative) can replace it later:
the lesson functions only rely on the named places in PLACES below, which a hand-built map keeps.

The world is an endless flat sea (worldgen/world_preset/sea.json): bedrock -64, stone -63..-62, sand -61..-60,
water -59..-54. Land rises from the sea floor. North = -z.

Zones (by direction from the centre): north = snow and a mountain, east = desert, west = forest with a lake,
south = meadow with the research camp and the jetty.

Usage: python3 gen_island.py <path to resources/data/islands>
"""
import math
import os
import random
import sys

SEA_TOP = -54          # highest water block
FLOOR = -61            # sand floor of the sea
R = 56                 # island radius before noise
random.seed(7)

# Named places the lessons use (x, y, z). y is filled in after the terrain is known.
PLACES = {
    "jetty_end": (0, None, 62),
    "jetty_start": (0, None, 46),
    "camp": (0, None, 30),
    "guide": (3, None, 42),
    "lake": (-30, None, 4),
    "mountain": (0, None, -32),
    "desert": (32, None, 6),
}


def edge(theta):
    return R + 6 * math.sin(3 * theta) + 4 * math.cos(5 * theta + 1)


def zone(x, z):
    """snow / desert / forest / meadow, by angle from the centre, with the camp area always meadow."""
    if z > 12 and abs(x) < 26:
        return "meadow"
    a = math.degrees(math.atan2(x, -z)) % 360  # 0 = north, 90 = east
    if a < 50 or a >= 310:
        return "snow"
    if a < 140:
        return "desert"
    if a < 220:
        return "meadow"
    return "forest"


def noise(x, z):
    return (math.sin(x * 0.21) * math.cos(z * 0.17) + math.sin((x + z) * 0.11) * 0.7 + math.cos(x * 0.05 - z * 0.08) * 0.5)


def height(x, z):
    """Top land block y, or None for sea."""
    d = math.hypot(x, z)
    th = math.atan2(z, x)
    r = d / edge(th)
    if r > 1:
        return None
    zn = zone(x, z)
    amp = {"meadow": 4, "forest": 6, "desert": 5, "snow": 7}[zn]
    h = 1 + (1 - r * r) * amp + noise(x, z) * (1.5 if zn == "desert" else 1.0)
    # the mountain in the north, steep enough for goats
    m = math.hypot(x - PLACES["mountain"][0], z - PLACES["mountain"][2])
    h += 24 * math.exp(-(m / 12.0) ** 2)
    # the forest lake: a hollow below sea level, water is added later
    l = math.hypot(x - PLACES["lake"][0], z - PLACES["lake"][2])
    if l < 8:
        h = min(h, -2 + l * 0.4)
    # the camp: flat
    if abs(x - PLACES["camp"][0]) <= 9 and abs(z - PLACES["camp"][2]) <= 7:
        h = 3
    return SEA_TOP + max(-4, int(round(h)))


def top_blocks(x, z, h):
    """(top block, block under it) for a land column."""
    zn = zone(x, z)
    d = math.hypot(x, z) / edge(math.atan2(z, x))
    if h <= SEA_TOP:
        return "minecraft:sand", "minecraft:sand"
    if zn == "desert":
        return "minecraft:sand", "minecraft:sandstone"
    if zn == "snow":
        if h > SEA_TOP + 14:
            return "minecraft:stone", "minecraft:stone"
        return "minecraft:snow_block" if d > 0.85 else "minecraft:grass_block", "minecraft:dirt"
    if d > 0.88:
        return "minecraft:sand", "minecraft:sand"
    return "minecraft:grass_block", "minecraft:dirt"


BIOMES = {"meadow": "minecraft:plains", "forest": "minecraft:forest", "desert": "minecraft:desert", "snow": "minecraft:snowy_plains"}


def gen_terrain():
    cmds = []
    span = int(R + 12)
    cols = {}
    for z in range(-span, span + 1):
        for x in range(-span, span + 1):
            h = height(x, z)
            if h is not None:
                cols[(x, z)] = h
    for z in range(-span, span + 1):
        x = -span
        while x <= span:
            if (x, z) not in cols:
                x += 1
                continue
            h = cols[(x, z)]
            top, sub = top_blocks(x, z, h)
            x2 = x
            while (x2 + 1, z) in cols and cols[(x2 + 1, z)] == h and top_blocks(x2 + 1, z, h) == (top, sub):
                x2 += 1
            if h - 1 >= FLOOR:
                cmds.append(f"fill {x} {FLOOR} {z} {x2} {h - 1} {z} {sub}")
            cmds.append(f"fill {x} {h} {z} {x2} {h} {z} {top}")
            if top == "minecraft:snow_block" or (zone(x, z) == "snow" and top == "minecraft:grass_block"):
                cmds.append(f"fill {x} {h + 1} {z} {x2} {h + 1} {z} minecraft:snow")
            x = x2 + 1
    return cmds, cols


def gen_biomes(cols):
    cmds = []
    span = int(R + 12) // 4 * 4 + 4
    for cz in range(-span, span, 4):
        row = []
        for cx in range(-span, span, 4):
            land = any((cx + i, cz + j) in cols for i in range(4) for j in range(4))
            row.append(BIOMES[zone(cx + 2, cz + 2)] if land else None)
        i = 0
        n = len(row)
        while i < n:
            b = row[i]
            if b is None:
                i += 1
                continue
            j = i
            while j + 1 < n and row[j + 1] == b:
                j += 1
            x1 = -span + i * 4
            x2 = -span + j * 4 + 3
            cmds.append(f"fillbiome {x1} -64 {cz} {x2} 0 {cz + 3} {b}")
            i = j + 1
    lx, lz = PLACES["lake"][0], PLACES["lake"][2]
    cmds.append(f"fillbiome {lx - 10} -64 {lz - 10} {lx + 10} 0 {lz + 10} minecraft:swamp")
    return cmds


def free(x, z, cols, avoid=4):
    for name in ("camp", "lake", "jetty_start"):
        px, _, pz = PLACES[name]
        if math.hypot(x - px, z - pz) < (12 if name == "camp" else 10 if name == "lake" else 6) + avoid:
            return False
    return (x, z) in cols


def gen_details(cols):
    cmds = []
    # the lake: water up to the sea's level, with lily pads
    lx, lz = PLACES["lake"][0], PLACES["lake"][2]
    for (x, z), h in cols.items():
        if math.hypot(x - lx, z - lz) < 8 and h < SEA_TOP:
            cmds.append(f"fill {x} {h + 1} {z} {x} {SEA_TOP} {z} minecraft:water")
    for k in range(6):
        a = random.uniform(0, 2 * math.pi)
        r = random.uniform(1, 5)
        cmds.append(f"setblock {int(lx + r * math.cos(a))} {SEA_TOP + 1} {int(lz + r * math.sin(a))} minecraft:lily_pad")
    # trees and plants, on a jittered grid
    for gz in range(-70, 71, 7):
        for gx in range(-70, 71, 7):
            x = gx + random.randint(-2, 2)
            z = gz + random.randint(-2, 2)
            if not free(x, z, cols):
                continue
            h = cols[(x, z)]
            if h <= SEA_TOP:
                continue
            zn = zone(x, z)
            top, _ = top_blocks(x, z, h)
            if zn == "forest" and top == "minecraft:grass_block":
                f = random.choice(["oak", "oak", "birch", "fancy_oak"])
                cmds.append(f"place feature minecraft:{f} {x} {h + 1} {z}")
            elif zn == "snow" and top == "minecraft:grass_block" and h < SEA_TOP + 12 and random.random() < 0.7:
                cmds.append(f"place feature minecraft:spruce {x} {h + 1} {z}")
            elif zn == "desert" and top == "minecraft:sand":
                if random.random() < 0.5:
                    cmds.append(f"setblock {x} {h + 1} {z} minecraft:cactus")
                else:
                    cmds.append(f"setblock {x} {h + 1} {z} minecraft:dead_bush")
            elif zn == "meadow" and top == "minecraft:grass_block" and random.random() < 0.25:
                cmds.append(f"place feature minecraft:oak {x} {h + 1} {z}")
    # grass and flowers in the meadow
    for _ in range(140):
        x, z = random.randint(-50, 50), random.randint(-10, 56)
        if free(x, z, cols, avoid=0) and zone(x, z) == "meadow":
            h = cols[(x, z)]
            if top_blocks(x, z, h)[0] == "minecraft:grass_block":
                b = random.choice(["minecraft:short_grass"] * 4 + ["minecraft:dandelion", "minecraft:poppy", "minecraft:cornflower"])
                cmds.append(f"setblock {x} {h + 1} {z} {b} keep")
    return cmds


def gen_camp_and_jetty(cols):
    cmds = []
    cx, _, cz = PLACES["camp"]
    y = SEA_TOP + 3
    # gravel path from the jetty to the camp
    for z in range(cz + 7, PLACES["jetty_start"][2] + 1):
        if (0, z) in cols and cols[(0, z)] > SEA_TOP:
            hz = cols[(0, z)]
            cmds.append(f"fill -1 {hz} {z} 1 {hz} {z} minecraft:gravel")
            cmds.append(f"fill -1 {hz + 1} {z} 1 {hz + 2} {z} minecraft:air")
    # the jetty: oak planks on posts, out into the sea
    j0 = PLACES["jetty_start"][2]
    j1 = PLACES["jetty_end"][2]
    cmds.append(f"fill -1 {SEA_TOP + 1} {j0 - 2} 1 {SEA_TOP + 1} {j1} minecraft:oak_planks")
    for z in range(j0, j1 + 1, 4):
        cmds.append(f"fill -2 {FLOOR + 1} {z} -2 {SEA_TOP + 1} {z} minecraft:oak_log")
        cmds.append(f"fill 2 {FLOOR + 1} {z} 2 {SEA_TOP + 1} {z} minecraft:oak_log")
    cmds.append(f"fill -2 {SEA_TOP + 2} {j0} -2 {SEA_TOP + 2} {j1} minecraft:oak_fence")
    cmds.append(f"fill 2 {SEA_TOP + 2} {j0} 2 {SEA_TOP + 2} {j1} minecraft:oak_fence")
    cmds.append(f"setblock 0 {SEA_TOP + 1} {j1 + 1} minecraft:oak_planks")
    cmds.append(f"summon minecraft:oak_boat 0 {SEA_TOP + 1} {j1 + 3}")
    # the camp: a floor of planks, two tents (wool), a table, a lantern
    cmds.append(f"fill {cx - 8} {y} {cz - 6} {cx + 8} {y} {cz + 6} minecraft:grass_block")
    cmds.append(f"fill {cx - 8} {y + 1} {cz - 6} {cx + 8} {y + 6} {cz + 6} minecraft:air")
    cmds.append(f"fill {cx - 3} {y} {cz - 2} {cx + 3} {y} {cz + 2} minecraft:spruce_planks")
    for tx, color in ((-7, "minecraft:white_wool"), (5, "minecraft:light_gray_wool")):
        cmds.append(f"fill {cx + tx} {y + 1} {cz - 5} {cx + tx + 2} {y + 1} {cz - 3} {color}")
        cmds.append(f"fill {cx + tx} {y + 2} {cz - 5} {cx + tx + 2} {y + 2} {cz - 3} {color}")
        cmds.append(f"fill {cx + tx + 1} {y + 3} {cz - 5} {cx + tx + 1} {y + 3} {cz - 3} {color}")
        cmds.append(f"fill {cx + tx + 1} {y + 1} {cz - 3} {cx + tx + 1} {y + 2} {cz - 3} minecraft:air")
    cmds.append(f"setblock {cx} {y + 1} {cz} minecraft:crafting_table")
    cmds.append(f"setblock {cx + 1} {y + 1} {cz} minecraft:lectern")
    cmds.append(f"setblock {cx - 1} {y + 1} {cz} minecraft:barrel")
    cmds.append(f"setblock {cx} {y + 1} {cz + 2} minecraft:lantern")
    cmds.append(f"setblock {cx + 3} {y + 1} {cz + 2} minecraft:campfire")
    # a fenced pasture next to the camp
    px, pz = cx + 14, cz + 2
    cmds.append(f"fill {px - 5} {y + 1} {pz - 5} {px + 5} {y + 1} {pz + 5} minecraft:oak_fence hollow")
    cmds.append(f"fill {px - 4} {y + 1} {pz - 4} {px + 4} {y + 1} {pz + 4} minecraft:air")
    cmds.append(f"setblock {px - 5} {y + 1} {pz} minecraft:oak_fence_gate[facing=west]")
    return cmds


def gen_animals(cols):
    cmds = []
    cx, _, cz = PLACES["camp"]
    y = SEA_TOP + 4
    px, pz = cx + 14, cz + 2
    for k in range(3):
        cmds.append(f"summon minecraft:sheep {px - 2 + k * 2} {y} {pz - 2}")
    cmds.append(f"summon minecraft:cow {px} {y} {pz + 2}")
    cmds.append(f"summon minecraft:pig {px + 2} {y} {pz + 2}")

    def on_land(x, z):
        return cols.get((x, z), SEA_TOP) + 1

    for k in range(4):
        cmds.append(f"summon minecraft:chicken {cx - 12 + k} {y} {cz + 8}")
    for k in range(2):
        cmds.append(f"summon minecraft:horse {-20 + k * 3} {on_land(-20 + k * 3, 40)} 40")
    dx, _, dz = PLACES["desert"]
    for k in range(2):
        cmds.append(f"summon minecraft:camel {dx + k * 4} {on_land(dx + k * 4, dz)} {dz}")
    for k in range(3):
        cmds.append(f"summon minecraft:rabbit {dx - 4 + k * 3} {on_land(dx - 4 + k * 3, dz + 8)} {dz + 8}")
    cmds.append(f"summon minecraft:armadillo {dx + 6} {on_land(dx + 6, dz - 6)} {dz - 6}")
    mx, _, mz = PLACES["mountain"]
    for k in range(3):
        cmds.append(f"summon minecraft:goat {mx - 3 + k * 3} {on_land(mx - 3 + k * 3, mz + 4)} {mz + 4}")
    for k in range(2):
        cmds.append(f"summon minecraft:fox {-12 + k * 4} {on_land(-12 + k * 4, -22)} -22")
    lx, _, lz = PLACES["lake"]
    for k in range(3):
        cmds.append(f"summon minecraft:frog {lx + 9} {on_land(lx + 9, lz + k)} {lz + k}")
    for k in range(4):
        cmds.append(f"summon minecraft:cod {k * 3 - 4} {SEA_TOP - 2} 66")
    for k in range(3):
        cmds.append(f"summon minecraft:salmon {lx - 2 + k * 2} {SEA_TOP - 1} {lz}")
    return cmds


def write(base, name, cmds, header):
    path = os.path.join(base, "function", "island", name + ".mcfunction")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write("# " + header + "\n# GENERATED by tools/gen_island.py. Don't edit by hand: change the script and run it again.\n")
        f.write("\n".join(cmds) + "\n")


def main(base):
    terrain, cols = gen_terrain()
    write(base, "terrain", terrain, "The island's land, column by column.")
    write(base, "biomes", gen_biomes(cols), "Biomes: snow in the north, desert in the east, forest in the west, meadow in the south.")
    write(base, "details", gen_details(cols), "The lake, trees, cactus and flowers.")
    write(base, "camp", gen_camp_and_jetty(cols), "The research camp, the path and the jetty.")
    write(base, "animals", gen_animals(cols), "The animals of the island.")
    # the places, as a function the lessons can read (storage islands:places)
    lines = []
    for name, (x, _, z) in PLACES.items():
        y = (cols.get((x, z), SEA_TOP) + 1) if name not in ("jetty_end", "jetty_start", "guide") else SEA_TOP + 2
        lines.append(f"data modify storage islands:places {name} set value [{x}d,{y}d,{z}d]")
    write(base, "places", lines, "Named places of this map.")
    jx, _, jz = PLACES["jetty_end"]
    write(base, "spawn", [f"setworldspawn {jx} {SEA_TOP + 2} {jz}"], "Where new players appear: the end of the jetty.")
    write(base, "goto_jetty", [f"tp @s {jx} {SEA_TOP + 2} {jz} facing {jx} {SEA_TOP + 2} 0"], "Puts the player (@s) at the end of the jetty, facing the island.")
    gx, _, gz = PLACES["guide"]
    gy = cols[(gx, gz)] + 1
    write(base, "guide_spot", [
        f'summon minecraft:villager {gx} {gy} {gz} {{NoAI:1b,Invulnerable:1b,Silent:1b,PersistenceRequired:1b,Rotation:[0f,0f],CustomName:{{text:"נועה, ראש המשלחת",color:"gold"}},CustomNameVisible:1b,Tags:["islands_npc","guide"]}}',
        f'summon minecraft:interaction {gx} {gy} {gz} {{width:1.2f,height:2.2f,response:1b,Tags:["islands_talk","talk_guide"]}}',
    ], "The guide (Noa) and the spot you right-click to talk to her.")
    print("terrain", len(terrain), "commands; columns", len(cols))


if __name__ == "__main__":
    main(sys.argv[1])
