# -*- coding: utf-8 -*-
"""Cut individual App Inventor blocks out of the original tutorial screenshots."""
from PIL import Image
import os

T, O = "tutorial", "tutorial/crop"
os.makedirs(O, exist_ok=True)

CROPS = {
    # name: (source, (l, t, r, b))
    "blk_when_click":    ("finalblocks.png",  (58, 26, 472, 98)),
    "blk_set_text":      ("finalblocks.png",  (136, 96, 618, 160)),
    "blk_pick_random":   ("finalblocks.png",  (598, 98, 1002, 158)),
    "blk_make_list":     ("finalblocks.png",  (1000, 98, 1272, 158)),
    "blk_text_filled":   ("finalblocks.png",  (1268, 98, 1534, 158)),
    "blk_call_start":    ("finalblocks.png",  (136, 550, 508, 616)),
    "blk_list_drawer":   ("Listdrawer.png",   (520, 175, 910, 432)),
    "blk_predictions":   ("finalblocks.png",  (1252, 88, 1706, 568)),
    "blk_list_items":    ("finalblocks.png",  (996, 88, 1706, 215)),
    "blk_pick_palette":  ("Listdrawer.png",   (497, 933, 1002, 1018)),
    "prog_part1_view":   ("Listdrawer.png",   (1400, 388, 2362, 602)),
    "blk_set_bgcolor":   ("Label2.Text.png",  (552, 306, 1215, 382)),
    "blk_set_text2":     ("Label2.Text.png",  (552, 1180, 1020, 1258)),
    "blk_get_label2text":("Label2.Text.png",  (528, 1096, 870, 1162)),
    "dropdown_menu":     ("Label2.Text.png",  (1688, 528, 2192, 1018)),
    "blk_when_shaking":  ("shaking.png",      (60, 58, 738, 132)),
}


def run(verbose=True):
    made = {}
    for name, (src, box) in CROPS.items():
        p = os.path.join(T, src)
        if not os.path.exists(p):
            continue
        im = Image.open(p).convert("RGBA")
        l, t, r, b = box
        r, b = min(r, im.width), min(b, im.height)
        out = os.path.join(O, name + ".png")
        im.crop((l, t, r, b)).save(out)
        made[name] = out
        if verbose:
            print("%-20s %-20s %sx%s" % (name, src, r - l, b - t))
    return made


if __name__ == "__main__":
    m = run()
    from PIL import ImageDraw
    ims = [(n, Image.open(p).convert("RGB")) for n, p in m.items()]
    ims = [(n, (i.resize((900, int(i.height * 900 / i.width)), Image.LANCZOS)
                if i.width > 900 else i)) for n, i in ims]
    W = max(i.width for _, i in ims) + 24
    H = sum(i.height + 26 for _, i in ims) + 20
    c = Image.new("RGB", (W, H), (250, 250, 250)); d = ImageDraw.Draw(c); y = 8
    for n, i in ims:
        d.text((10, y), n, fill=(190, 0, 80)); y += 14
        c.paste(i, (12, y)); y += i.height + 12
    c.save("tutorial/crop/sheet.jpg", quality=88); print(c.size)


def derived():
    """Images assembled from the original screenshots."""
    fb = Image.open(os.path.join(T, "finalblocks.png")).convert("RGBA")
    # the part-one program = the event block's header row stacked straight onto
    # its closing row, taken from the real part-two screenshot
    header = fb.crop((54, 28, 462, 92))        # when Button1.Click
    wall   = fb.crop((54, 300, 140, 400))       # gold left wall of the C
    bar_t  = fb.crop((54, 80, 462, 91))         # clean gold band, both borders
    bar_b  = fb.crop((54, 618, 462, 648))       # the C's closing bar + corners
    call   = fb.crop((135, 552, 501, 618))      # call Player1.Start
    px = call.load()                            # let the C's gold show through
    for yy in range(call.height):               # the notch the green block left
        for xx in range(call.width):
            r, g, b, _ = px[xx, yy]
            if g > r + 25 and g > b + 15:
                px[xx, yy] = (r, g, b, 0)
    do     = fb.crop((74, 104, 126, 146))       # the "do" label
    pad = 9
    body_h = call.height + pad * 2
    W = max(header.width, 79 + call.width + 4)
    H = header.height + body_h + 10 + bar_b.height
    out = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    out.paste(header, (0, 0))
    out.paste(wall.resize((wall.width, body_h), Image.LANCZOS), (0, header.height))
    out.paste(bar_t.resize((bar_t.width, 10), Image.LANCZOS),
              (0, header.height + body_h))
    out.paste(bar_b, (0, header.height + body_h + 10))
    out.paste(call, (79, header.height + pad))
    out.paste(do, (20, header.height + pad + (call.height - do.height) // 2))
    out.save(os.path.join(O, "prog_part1.png"))

    ball = Image.open(os.path.join(T, "8ball.png")).convert("RGBA")
    ball.resize((ball.width * 5, ball.height * 5), Image.LANCZOS).save(
        os.path.join(O, "8ball_big.png"))

    qr = Image.open(os.path.join(T, "Magic8BallBarcode.png")).convert("RGBA")
    qr.resize((qr.width * 4, qr.height * 4), Image.NEAREST).save(
        os.path.join(O, "barcode_big.png"))
    print("derived: prog_part1, 8ball_big, barcode_big")
