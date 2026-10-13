# Meeting 1 setup (about 20 minutes, on your Gmail, before Tuesday)

You build three things once: the **template** the kids copy, **your own pet** for the opening demo, and the
**hub** (the kids' step-by-step page and your slides). To copy a file's text: open its link, click **Raw**,
then Ctrl+A, Ctrl+C.

Files (branch `claude/make-courses`):
- Pet server: `webapp-course/m1/pet/Code.gs`
- Pet page: `webapp-course/m1/pet/Index.html`
- Hub server: `webapp-course/hub/Code.gs`
- Hub page: `webapp-course/hub/Index.html`

Links: https://github.com/KamiShinx/ClassPet/tree/claude/make-courses/webapp-course

## 1. The template (10 min)
1. Open `sheets.new`. Name the Sheet **החיה (תבנית)**.
2. **Extensions → Apps Script**. Name the project **החיה**.
3. In `Code.gs`, delete everything and paste the pet's `Code.gs`.
4. Click **+** next to Files → **HTML** → name it **Index** (just `Index`, Apps Script adds `.html`). Delete everything
   in it and paste the pet's `Index.html`.
5. Save (Ctrl+S). At the top choose **setup**, click **Run**, and allow the permissions
   (Review permissions → your account → Advanced → Go to החיה (unsafe) → Allow).
6. Back in the Sheet: two tabs appeared, `pet` and `log`. Delete the empty "Sheet1" tab.
7. **Share** → General access: **Anyone with the link → Viewer** → **Copy link**. This is the **template link**.

## 2. Your demo pet (5 min)
1. Open the template link, **File → Make a copy**, name it **החיה של בן**.
2. In your copy: in the `pet` tab change `name` to your pet's name.
3. **Extensions → Apps Script → Deploy → New deployment** → ⚙️ **Web app**. Execute as: **Me**. Who has access:
   **Anyone**. **Deploy**, allow the permissions, **copy the Web app URL** (ends in `/exec`). This is the **demo link**.
4. Open it, feed your pet once. Optional: give it a drawing from Gemini (hub step 9) and redeploy as a new version.

## 3. The hub (5 min)
1. Open `script.new` (a standalone script). Name it **MAKE hub**.
2. In `Code.gs`, paste the hub's `Code.gs`. Put your **template link** and **demo link** between the quotes on the two
   lines at the top.
3. **+ → HTML → Index**, paste the hub's `Index.html`. Save.
4. **Deploy → New deployment → Web app**, Execute as **Me**, access **Anyone**, **Deploy**. Copy the URL: this is the
   **hub link**. Bookmark it on every workplace computer.
5. Your slides: the hub link with `?page=slides1` at the end (or "למורה: המצגת" at the bottom of the hub's home).
   Arrow keys move, **N** hides the notes, **F** is full screen.

**After any change to a file: Deploy → Manage deployments → ✏️ → Version: New version → Deploy.** Without it the
link keeps showing the old version. (This is also step 10 for the kids.)

## Before class
- Run `STUDENT_ACCOUNT_TEST.md` on one student account. If Apps Script is blocked, tell me: lesson 1 then stays in
  Gemini, and the kids feed only your pet.
- Open the hub link once on a student account at your workplace: it should open without asking for anything.
