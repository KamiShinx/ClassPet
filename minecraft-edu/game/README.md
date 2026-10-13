# Science Islands: the game (mod + hub + installer)

The course plan is `../COURSE.md`. This folder is the software.

- `starter/` → laid over the official NeoForge 26.2 template by `setup/install.bat` (into `C:\ISLANDS`).
  - `mod/src/main/java/edu/islands/`: the Java. Small on purpose: open the lesson's map from Play (LessonBoot),
    and tell the datapack which lesson it is (LessonStart).
  - `mod/src/main/resources/data/islands/`: everything else, as a datapack: the world preset (endless sea), the
    island (`function/island/`, generated), lessons (`function/lesson/<n>/`), dialogs (`dialog/`).
  - `mod/tools/server.ps1`: the hub server (port 47812). `shortcuts.ps1`: the "Science Islands" icon.
- `hub/index.html`: the lesson list with Play.
- `setup/`: `install.bat`, and `make_starter_zip.py` (run after changing `starter/`, then bump STARTER_VER).
- `tools/check_datapack.py`: checks every command against the real 26.2 command tree and registries. Run it
  before every push: `python3 tools/check_datapack.py starter/mod/src/main/resources/data`
- `tools/gen_island.py`: generates the code-built test island. `island_preview.png` is its map from above.

How a lesson starts: hub Play → writes `mod/run/islands/lesson.txt` → `gradlew runClient` → LessonBoot opens
`islands_lesson_<n>` (creates it on the first time) → LessonStart sets `#lesson` and runs `islands:boot` → the first
time, the island is built and `islands:lesson/start` runs → each player's first entry runs `islands:lesson/arrive`.
Kids click dialog buttons, which run `/trigger islands_act set N` (allowed without cheats); `islands:act` reacts.
