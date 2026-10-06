# For the PC session: make the studio's code blocks work in the game

Ben's laptop: the studio item shows up in the game (name, picture, stack) but its blocks do nothing. The cloud session
can't run Minecraft, so please test and fix it locally. Branch `claude/make-courses`; Ben updates with `C:\MAKE\update.bat`.

## How it is meant to work
1. Hub studio (`hub/studio.js`, blocks in `hub/blocks.js`) saves `C:\MAKE\design\world.json`. Each item with blocks has
   `"power": {"on": {"use": [...], "hit": [...], "hold": [...]}}` (program format: `BLOCK_RULES` in `hub/studio.js`).
2. "לנסות במשחק" / "שחק" → `Start-Game` (server.ps1) → `Copy-StudioToMod` copies it to
   `mod/src/main/resources/assets/myworld/studio/world.json`, then `gradlew runClient`.
3. `Kit.loadStudio()` reads it at startup; an item with `power` becomes `StudioPower.PowerItem`.
4. `StudioPower.java` runs the program: `use` (right-click), `hurtEnemy` (hit a mob), `inventoryTick` (held, once a second).
   A failing step prints `[myworld] studio block skipped: ...` to the log and is skipped.

## Where to look, in order
1. `C:\MAKE\design\world.json`: is `power` there for the item? No → hub side (blocks.js `compile`, saved 400 ms after a
   change). Yes → check the copy in `mod\src\main\resources\assets\myworld\studio\` and in `mod\build\resources\main\...`.
2. The log (`C:\MAKE\mod\run\logs\latest.log`, and the hub's build log): `[myworld] studio item skipped`,
   `studio not loaded`, `studio block skipped`.
3. Simplest test program: "כשלוחצים לחיצה ימנית עם החפץ" + "לתת לי מהירות" (`{"on":{"use":[{"a":"effect","e":"speed","who":"me","s":5,"l":1}]}}`),
   then "הודעה". Note: a block aimed at "היצור" does nothing under right-click by design (only under "כשמכים יצור").
4. 26.2 suspects (the code follows MCreator's 26.1.2 templates): is `Item.use` / `hurtEnemy` / `inventoryTick` still
   what 26.2 calls (it compiles, but a hook may have moved, e.g. to `postHurtEnemy`)? `BuiltInRegistries.MOB_EFFECT.get(...)`
   lookups, sound/entity ids, `EntityTypes` (entity constants moved there in 26.2). `use()` returns SUCCESS on both sides.

## Rules
- Never touch the kid's files (MyWorld/MyItems/MyEffects/MyMobs/MyRules.java, pictures, worlds).
- Commit to `claude/make-courses`, and write in `course-context/project_make_minecraft_course.md` what you changed, so
  the cloud session doesn't undo it. Run `python setup/make_starter_zip.py` after changing anything in `starter/`.
