# Meeting 1 setup (about 20 minutes, on the course's Google account, before Tuesday)

You build three things once: the **egg** (the template the kids copy), **your own pet** for the opening, and the
**hub** (the kids' step-by-step page and your slides). To copy a file's text: open its link, click **Raw**,
then Ctrl+A, Ctrl+C.

Files (branch `claude/make-courses`):
- The egg, four files in `webapp-course/m1/pet/`: `Code.gs` (the server), `Index.html` (the frame),
  `Engine.html` (connects the page to the server, shows a red strip when something breaks), `Pet.html` (the pet
  itself: the only file the kids and Gemini change).
- Hub server: `webapp-course/hub/Code.gs`
- Hub page: `webapp-course/hub/Index.html`

Links: https://github.com/KamiShinx/ClassPet/tree/claude/make-courses/webapp-course

## 1. The egg (10 min)
1. Open `sheets.new`. Name the Sheet **ביצה (תבנית)**.
2. **Extensions → Apps Script**. Name the project **החיה**.
3. In `Code.gs`, delete everything and paste the egg's `Code.gs`.
4. Three times: click **+** next to Files → **HTML**, and name the file **Index**, then **Engine**, then **Pet**
   (no `.html`, Apps Script adds it). In each one delete everything and paste the file with the same name.
5. Save (Ctrl+S). At the top choose **setup**, click **Run**, and allow the permissions
   (Review permissions → your account → Advanced → Go to החיה (unsafe) → Allow).
6. Back in the Sheet: two tabs appeared, `pet` and `log`. Delete the empty "Sheet1" tab.
7. **Share** → General access: **Anyone with the link → Viewer** → **Copy link**. This is the **template link**.

If you already have the old template: open its script, replace `Code.gs`, replace `Index.html`, add `Engine` and
`Pet`, delete the `pet` and `log` tabs in the Sheet, and run **setup** again. The link stays the same.

## 2. Your demo pet (5 min)
1. Open the template link, **File → Make a copy**, name it **החיה של המורה**.
2. **Extensions → Apps Script → Deploy → New deployment** → ⚙️ **Web app**. Execute as: **Me**. Who has access:
   **Anyone**. **Deploy**, allow the permissions, **copy the Web app URL** (ends in `/exec`). This is the **demo link**.
3. Best: do the kids' steps 6 to 10 on it yourself once, so your pet is hatched and has its own button. You then
   know every screen the kids will meet.
4. **Before every class:** in the demo Sheet's `pet` tab set `full` to about 20. At 100 the bar is full and feeding
   shows nothing.

(The old demo pet keeps working with the new hub, so this can wait.)

## 3. The hub (5 min)
1. Open `script.new` (a standalone script). Name it **MAKE hub**.
2. In `Code.gs`, paste the hub's `Code.gs`. Put your **template link** and **demo link** between the quotes on the two
   lines at the top.
3. **+ → HTML → Index**, paste the hub's `Index.html`. Save.
4. **Deploy → New deployment → Web app**, Execute as **Me**, access **Anyone**, **Deploy**. Copy the URL: this is the
   **hub link**. Bookmark it on every workplace computer.
5. Your slides: the hub link with `?page=slides1` at the end (or "למורה: המצגת" at the bottom of the hub's home).
   Ten slides, each one is something you click while you talk; what to say is in the notes under the slide.
   Move with the two arrow buttons at the top (the arrow keys work only after one click on the slide). **N** hides
   the notes, **F** is full screen. Nothing in the slides needs YouTube or the network, except the first one
   (the class feeds your real pet).

**After any change to a file: Deploy → Manage deployments → ✏️ → Version: New version → Deploy.** Without it the
link keeps showing the old version.

**Updating the hub after I change it:** open the hub's `Index.html` on GitHub → Raw → Ctrl+A, Ctrl+C. In your
"MAKE hub" script open `Index.html`, Ctrl+A, Ctrl+V, Ctrl+S, then the new-version steps above. `Code.gs` (with your
two links) stays as it is.

## Before class: one run on a student account (30 minutes, the most important thing on this page)
Do the kids' 12 steps yourself, on one Ministry student account, on a workplace computer. Nothing here has been
tried on a student account yet. What to watch:
1. Step 3: does "make a copy" keep the script (four files in the editor)?
2. Step 4: is there **Anyone** under "Who has access"? Does the link open in a private window without signing in?
3. Step 6: does the student's Gemini open? Does it show a copy button above the code?
4. Step 7: does Gemini send back the whole file, down to `<!-- END Pet -->`? Does **Deploy → Test deployments**
   give a `/dev` link that shows the change right after Ctrl+S?
5. Step 10: does a new row appear in the Sheet when you press your new button?
6. Step 11: can one student account send a link to another (mail or Chat)?

If Apps Script is blocked for students, tell me: the kids then design and build the pet inside Gemini only, and
the server and the Sheet are shown on your pet.
