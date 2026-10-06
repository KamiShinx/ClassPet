# Update Ben's laptop (hub pages + Minecraft pictures)

Last hub change: **536ade8** (6 Oct, after class 1). Press Win+R, paste this whole line, press Enter:

```
powershell -NoExit -c "[Net.ServicePointManager]::SecurityProtocol='Tls12';$s='536ade88608688bcea967992c524bcb51728b240';irm https://raw.githubusercontent.com/KamiShinx/ClassPet/$s/minecraft-course/setup/update-hub.ps1|iex"
```

It updates only `C:\MAKE\hub` (the kids' page, the teacher page and its slides, the print page) and copies 66 Minecraft pictures out of
the game already installed there. It should end with "Minecraft pictures: 66 of 66". Then:

1. Double-click the **Minecraft** icon (this starts the hub; the teacher page needs it running for the embedded video).
2. Double-click **Minecraft - Teacher** for the slides.
3. Run `make-usb.bat` again for every stick.

**Whoever changes anything in `hub/` or `setup/update-hub.ps1`:** after pushing, put the new full commit hash in the
line above and in "Last hub change", and commit this file. The hash must be a commit that already contains the change,
so this file is always committed one step after it.
