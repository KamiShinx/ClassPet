#!/usr/bin/env python3
"""Draws the skins of the two characters, 64x64 Minecraft player skins made here from scratch.
  Noa (the head of the research team): dark hair, a teal bandana, a khaki field shirt, olive trousers, boots.
  Sam (the English-speaking researcher): short fair hair, a red cap band, a blue shirt, sand trousers.
Each is a `minecraft:mannequin` whose profile points at its texture (islands:entity/noa, islands:entity/sam).

Usage: python3 gen_skins.py <path to resources/assets/islands>
Needs Pillow."""
import os
import random
import sys

from PIL import Image


PALETTES = {
    "noa": dict(SKIN=(226, 176, 144), SKIN_D=(204, 150, 120), HAIR=(78, 48, 32), HAIR_D=(58, 34, 22), SHIRT=(200, 174, 116), SHIRT_D=(166, 142, 90),
                PANTS=(96, 106, 66), PANTS_D=(76, 86, 52), BOOT=(72, 50, 36), TEAL=(38, 160, 156), TEAL_D=(26, 126, 124), IRIS=(52, 112, 74), LONG=True, SEED=11),
    "sam": dict(SKIN=(238, 196, 160), SKIN_D=(214, 168, 134), HAIR=(196, 150, 78), HAIR_D=(166, 122, 58), SHIRT=(66, 118, 196), SHIRT_D=(46, 90, 160),
                PANTS=(194, 174, 132), PANTS_D=(168, 148, 108), BOOT=(232, 232, 232), TEAL=(206, 58, 52), TEAL_D=(168, 40, 38), IRIS=(60, 96, 150), LONG=False, SEED=23),
}


def draw(name, P):
    global img, px, SKIN, SKIN_D, HAIR, HAIR_D, SHIRT, SHIRT_D, PANTS, PANTS_D, BOOT, TEAL, TEAL_D, IRIS
    SKIN, SKIN_D, HAIR, HAIR_D = P["SKIN"], P["SKIN_D"], P["HAIR"], P["HAIR_D"]
    SHIRT, SHIRT_D, PANTS, PANTS_D, BOOT = P["SHIRT"], P["SHIRT_D"], P["PANTS"], P["PANTS_D"], P["BOOT"]
    TEAL, TEAL_D, IRIS = P["TEAL"], P["TEAL_D"], P["IRIS"]
    img = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
    px = img.load()
    random.seed(P["SEED"])
    SKIN, SKIN_D = (226, 176, 144), (204, 150, 120)
    HAIR, HAIR_D = (78, 48, 32), (58, 34, 22)
    SHIRT, SHIRT_D = (200, 174, 116), (166, 142, 90)
    PANTS, PANTS_D = (96, 106, 66), (76, 86, 52)
    BOOT, BELT, GOLD = (72, 50, 36), (58, 40, 28), (222, 186, 84)
    TEAL, TEAL_D = (38, 160, 156), (26, 126, 124)
    WHITE, IRIS, MOUTH, BROW = (246, 246, 246), (52, 112, 74), (176, 98, 92), (64, 38, 26)

    img = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
    px = img.load()


    def put(x, y, c, noise=7):
        n = random.randint(-noise, noise) if noise else 0
        px[x, y] = (max(0, min(255, c[0] + n)), max(0, min(255, c[1] + n)), max(0, min(255, c[2] + n)), 255)


    def box(x0, y0, w, h, c, noise=7):
        for y in range(y0, y0 + h):
            for x in range(x0, x0 + w):
                put(x, y, c, noise)


    # ---- head: top, bottom, right, front, left, back ----
    box(8, 0, 8, 8, HAIR)                    # top
    box(16, 0, 8, 8, SKIN)                   # bottom (chin)
    for x0 in (0, 16):                       # the two sides: hair, with a bit of cheek low at the front
        box(x0, 8, 8, 8, HAIR)
    front_edge = {0: 6, 16: 0}               # where the face side of each side panel is
    for x0, fx in front_edge.items():
        box(x0 + fx, 13, 2, 3, SKIN)
    box(24, 8, 8, 8, HAIR)                   # back
    box(27, 10, 2, 6, HAIR_D)                # the ponytail
    box(8, 8, 8, 8, SKIN)                    # the face
    box(8, 8, 8, 2, HAIR)                    # fringe
    for x in (8, 9, 10):
        put(x, 10, HAIR)                     # side-swept fringe
    for y in range(10, 14):
        put(8, y, HAIR); put(15, y, HAIR)    # hair framing the face
    for x in (9, 10, 13, 14):
        put(x, 11, BROW, 3)                  # eyebrows
    put(9, 12, WHITE, 0); put(10, 12, IRIS, 3); put(13, 12, IRIS, 3); put(14, 12, WHITE, 0)   # eyes
    put(11, 13, SKIN_D, 3); put(12, 13, SKIN_D, 3)                                          # nose shadow
    put(11, 14, MOUTH, 3); put(12, 14, MOUTH, 3)                                            # mouth
    put(9, 13, (232, 160, 140), 3); put(14, 13, (232, 160, 140), 3)                         # cheeks

    # ---- the hat layer: only the bandana (the one thing you recognise her by) ----
    for x0, w in ((32, 8), (40, 8), (48, 8), (56, 8)):   # right, front, left, back
        box(x0, 9, w, 2, TEAL)
        for x in range(x0, x0 + w, 3):
            put(x, 10, TEAL_D, 3)
    box(59, 11, 2, 3, TEAL_D)                # the knot at the back
    box(40, 0, 8, 8, (0, 0, 0))              # (cleared below: the top of the hat layer stays empty)
    for y in range(0, 8):
        for x in range(40, 48):
            px[x, y] = (0, 0, 0, 0)

    # ---- body: top, bottom, right, front, left, back ----
    box(20, 16, 8, 4, SHIRT)                 # shoulders
    box(28, 16, 8, 4, PANTS)                 # under
    for x0, w in ((16, 4), (20, 8), (28, 4), (32, 8)):   # right, front, left, back
        box(x0, 20, w, 9, SHIRT)
        box(x0, 29, w, 1, BELT, 3)
        box(x0, 30, w, 2, PANTS)
    put(23, 20, SKIN, 3); put(24, 20, SKIN, 3)           # open collar
    put(22, 20, SHIRT_D, 3); put(25, 20, SHIRT_D, 3); put(22, 21, SHIRT_D, 3); put(25, 21, SHIRT_D, 3)
    for y in range(21, 29):
        put(24, y, SHIRT_D, 3)                           # the button line
    for x in (25, 26):
        put(x, 23, SHIRT_D, 3); put(x, 25, SHIRT_D, 3)   # a chest pocket
    put(26, 24, SHIRT_D, 3)
    put(23, 29, GOLD, 3); put(24, 29, GOLD, 3)           # belt buckle
    box(34, 20, 4, 3, TEAL_D, 3)                         # the tail of the bandana down her back

    # ---- arms (4 wide): shirt sleeve rolled to the elbow, then skin ----
    def arm(top_xy, side_xy):
        tx, ty = top_xy; sx, sy = side_xy
        box(tx, ty, 4, 4, SHIRT)             # shoulder
        box(tx + 4, ty, 4, 4, SKIN)          # hand, from below
        box(sx, sy, 16, 5, SHIRT)            # sleeve, all four sides
        box(sx, sy + 5, 16, 1, SHIRT_D, 3)   # the rolled cuff
        box(sx, sy + 6, 16, 6, SKIN)         # forearm
        box(sx, sy + 11, 16, 1, SKIN_D, 3)   # hand

    arm((44, 16), (40, 20))                  # right arm
    arm((36, 48), (32, 52))                  # left arm

    # ---- legs: trousers, boots ----
    def leg(top_xy, side_xy):
        tx, ty = top_xy; sx, sy = side_xy
        box(tx, ty, 4, 4, PANTS)
        box(tx + 4, ty, 4, 4, BOOT)
        box(sx, sy, 16, 9, PANTS)
        for y in range(sy, sy + 9, 4):
            box(sx, y, 16, 1, PANTS_D, 3)    # folds
        box(sx, sy + 9, 16, 3, BOOT)

    leg((4, 16), (0, 20))                    # right leg
    leg((20, 48), (16, 52))                  # left leg

    if not P["LONG"]:      # short hair: no ponytail, no hair beside the face, no bandana tail down the back
        box(27, 10, 2, 6, HAIR)
        for y in range(10, 14):
            put(8, y, SKIN); put(15, y, SKIN)
        for x in (9, 10):
            put(x, 10, SKIN)
        box(34, 20, 4, 3, SHIRT)
        box(59, 11, 2, 3, HAIR)
        for y in range(11, 14):
            for x in range(59, 61):
                px[x, y] = (0, 0, 0, 0)
    out = os.path.join(sys.argv[1], "textures", "entity", name + ".png")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    img.save(out)
    print("wrote", out)


for _name, _pal in PALETTES.items():
    draw(_name, _pal)
