# Update Ben's laptop (hub pages + Minecraft pictures)

Last hub change: **f08fc67** (studio blocks + Gemini improves them). Press Win+R, paste this whole line, press Enter:

```
powershell -NoExit -c "[Net.ServicePointManager]::SecurityProtocol='Tls12';$s='f08fc67a3ae7d8cf5a740477be7618d7d4d966c5';irm https://raw.githubusercontent.com/KamiShinx/ClassPet/$s/minecraft-course/setup/update-hub.ps1|iex"
```

It updates `C:\MAKE\hub` (the kids' page, the teacher page and its slides, the print page) and the course tools in
`C:\MAKE\mod\tools` (never the kid's own files), and copies 66 Minecraft pictures out of
the game already installed there. It should end with "Minecraft pictures: 66 of 66". Then:

1. Double-click the **Minecraft** icon (this starts the hub; the teacher page needs it running for the embedded video).
2. Double-click **Minecraft - Teacher** for the slides.
3. Run `make-usb.bat` again for every stick.

**Whoever changes anything in `hub/` or `setup/update-hub.ps1`:** after pushing, put the new full commit hash in the
line above and in "Last hub change", and commit this file. The hash must be a commit that already contains the change,
so this file is always committed one step after it.
