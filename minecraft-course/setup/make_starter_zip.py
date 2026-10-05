"""Rebuild setup/starter.zip from starter/. Run after any change to starter/ or to the rules, then bump STARTER_VER in install.bat.
Also writes starter/mod/tools/rules.txt from GEM_TEXT in hub/content.js, so the rules exist in one place only."""
import pathlib, zipfile
here = pathlib.Path(__file__).resolve().parent
src = here.parent / "starter"
js = (here.parent / "hub" / "content.js").read_text(encoding="utf-8")
start = js.index("const GEM_TEXT = `") + len("const GEM_TEXT = `")
rules = js[start:js.index("`;", start)]
(src / "mod" / "tools" / "rules.txt").write_text(rules + "\n", encoding="utf-8")
with zipfile.ZipFile(here / "starter.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for f in sorted(src.rglob("*")):
        if f.is_file():
            z.write(f, f.relative_to(src).as_posix())
print("wrote", here / "starter.zip")
