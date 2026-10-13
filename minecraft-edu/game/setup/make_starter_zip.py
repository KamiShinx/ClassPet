#!/usr/bin/env python3
"""Packs starter/ into setup/starter.zip (what install.bat lays over the NeoForge template).
Run after changing anything under starter/, then bump STARTER_VER in install.bat."""
import os
import zipfile

here = os.path.dirname(os.path.abspath(__file__))
src = os.path.join(here, "..", "starter")
out = os.path.join(here, "starter.zip")
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for dp, _, files in os.walk(src):
        for f in sorted(files):
            p = os.path.join(dp, f)
            z.write(p, os.path.relpath(p, src).replace(os.sep, "/"))
print("wrote", out, os.path.getsize(out), "bytes")
