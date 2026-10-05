"""Rebuild setup/starter.zip from starter/. Run after any change to starter/, then bump STARTER_VER in install.bat."""
import pathlib, zipfile
here = pathlib.Path(__file__).resolve().parent
src = here.parent / "starter"
with zipfile.ZipFile(here / "starter.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for f in sorted(src.rglob("*")):
        if f.is_file():
            z.write(f, f.relative_to(src).as_posix())
print("wrote", here / "starter.zip")
