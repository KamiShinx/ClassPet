# Update Ben's laptop (hub pages, course tools, Minecraft pictures)

**From now on:** double-click `C:\MAKE\update.bat`. It always takes the newest version on the branch: no hash to copy.
It runs the updater that is already on the laptop (`C:\MAKE\mod\tools\update-hub.ps1`), which downloads only the course
files. It updates `C:\MAKE\hub` (the kids' page, the teacher page and its slides, the print page) and the course tools in
`C:\MAKE\mod\tools` (never the kid's own files), and copies the Minecraft pictures out of the installed game. Then:

1. Open **Minecraft** from Start (this starts the hub).
2. **Minecraft - Teacher** for the slides.
3. Run `make-usb.bat` again for every stick.

**Why no Win+R line any more (6 Oct 2026):** Windows Defender flagged the old line
(`powershell -c "... irm ... | iex"`) as `Trojan:Win32/Commando.A!ml`: download-and-run in one command is a malware
pattern. Defender flagged the command line, not the hub files.

**First time only** (a laptop without `C:\MAKE\update.bat`): download
[update.bat](https://github.com/KamiShinx/ClassPet/blob/claude/make-courses/minecraft-course/setup/update.bat) (the
"Download raw file" button), double-click it from Downloads, and if Windows asks, More info → Run anyway. It fetches the
updater once with curl, updates, and puts `update.bat` in `C:\MAKE` for next time.

**Whoever changes anything in `hub/`, `starter/mod/tools/` or `setup/update-hub.ps1`:** push; Ben double-clicks
`update.bat`. Changes to the updater itself take effect from the run after the one that downloads them.
