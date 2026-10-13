# Student account test (15 minutes, before Tuesday)

Do this once, logged in as **one Ministry student account**, on **one of your workplace computers**.
Take a screenshot at every 📸 and send them to me. If a step fails, screenshot the message and keep going.

## 1. Gemini (3 min)
1. Open `gemini.google.com`, logged in as the student.
2. 📸 The top-left model picker (which model names you see).
3. Type: `תכתוב לי דף אינטרנט עם כפתור שמשנה צבע` and send.
4. 📸 Does a **Canvas** panel open on the side with a live preview? Or only code in the chat?

## 2. Apps Script (5 min)
1. Open `sheets.new` (a new Google Sheet).
2. Menu **Extensions** → **Apps Script**. 📸 What opens (the editor, or a "disabled by your administrator" message)?
3. If the editor opened: delete everything in `Code.gs` and paste this:
```javascript
function doGet() {
  return HtmlService.createHtmlOutput('<button onclick="google.script.run.withSuccessHandler(function(){document.body.append(\' נשמר!\')}).addRow()">שמור שורה</button>');
}
function addRow() {
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].appendRow([new Date(), 'עובד']);
}
```
4. Click 💾 Save, choose `addRow` in the function list at the top, click **Run**.
5. 📸 The permission screens (all of them). Does it end in "blocked", or can you allow it?
6. Go back to the Sheet: is there a new row with a date and "עובד"?

## 3. Deploy as a website (4 min)
1. In the Apps Script editor: **Deploy** → **New deployment** → the ⚙️ next to "Select type" → **Web app**.
2. 📸 The **"Who has access"** list: which options exist? (Only myself / Anyone within [domain] / Anyone with a Google account / Anyone)
3. Pick the widest option, **Deploy**, copy the **Web app URL** (ends in `/exec`).
4. Open the URL, click the button. Does it say "נשמר!" and add a row to the Sheet?
5. Open the same URL in an **incognito window** (not logged in). 📸 Does it open, or ask to sign in?

## 4. Sharing with your account (2 min)
1. In the Sheet: **Share** → type **your personal Gmail** → Send. 📸 Allowed, or blocked/warning?
2. On your own account: open this sheet link I'll make for you (a template), as the student: **File → Make a copy**.
   📸 Does the copy work? *(Until I send the link, do this with any Sheet you share from your Gmail as "Anyone with the link".)*

## 5. YouTube (1 min)
Open any YouTube video, logged in as the student. 📸 Does it play, or is it blocked/restricted?

---
**What each answer changes:** Apps Script blocked → lesson 1 stays in Gemini only, and we ask IT to enable it.
No "Anyone" access → kids' apps open only for signed-in Ministry users (fine in class). Sharing blocked → you'll
need a Ministry teacher account to see their projects, or kids show you on their screen.
