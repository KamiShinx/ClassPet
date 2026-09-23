# How to Build a Complete AI-Powered Web Dashboard using Google Apps Script & Google Sheets (Mohammad Rameez Imdad, 9.9 min)

**What it is:** demo/promo of a "subscription/document expiry reminder" dashboard (employee passports, visas, company licenses) with an "AI email" feature. Same channel, same format as the rest of the batch: click-through tour, then the standard deploy recipe.
**Substance:** mixed — thinner on CRUD (already covered by other videos in the batch) but the one video in this batch that actually shows two backend mechanisms worth reusing: a scheduled trigger and an LLM API call from Apps Script.

## Ideas, in the video's order
- [0:00:34] Admin vs user roles again; admin sees all records, user sees only their own (repeated pattern, see other notes in this batch).
- [0:01:07] Status color-coding driven by a date computation: green = not expiring, blue = 30 days left, yellow = 5 days left — a concrete "compute a derived field from today's date minus a stored date" idea, good for teaching date math over sheet rows.
- [0:01:40] Filters (by expiry zone / status) applied client-side over the fetched rows.
- [0:02:16] Free-text-or-dropdown pattern: typing a new value into what looks like a dropdown adds it as a new option — same "config sheet grows from user input" idea as other videos.
- [0:03:24] The "AI Email" feature: pick a recipient, click "Write with AI," it takes ~3 seconds and returns a drafted email referencing that user's real expiry data — i.e. the backend assembles a prompt from sheet data, calls an external API, and returns generated text into the form. Confirmed at [0:09:31] as **DeepSeek's API**, described as "completely free," with a setup link (not shown in transcript/frames).
- [0:05:04] "Automation" section: a toggle to enable/disable **daily email checks** and a stated schedule ("every day at 9:00 a.m. for documents expiring within 14 days") — this is Apps Script's **time-driven trigger** feature, named in the UI as "Trigger Status: ACTIVE/INACTIVE."
- [0:05:36]–[0:06:11] Multiple admin emails can be added as recipients — a small "notify a list, not just one user" pattern.
- [0:06:45] A "Test" button sends a one-off test run of the daily job and reports counts (emails sent / errors) — an explicit human-triggered dry-run of a scheduled job, good practice to imitate.
- [0:07:20]–[0:08:58] Same deploy recipe as the rest of the batch, with one extra step: replace an API key placeholder at a specific code.js line number before deploying — the only video in the batch that shows "you must edit the code, not just the sheet, to configure this."

## What the frames add
[6:40] the raw sheet tabs: `Users`, `Employee Data`, `Company Data`, `Daily Reports`, `Admin Emails`, `How to Do Setup` — another concrete multi-tab schema example, and notably a `Daily Reports` tab that is clearly written to *by the trigger*, not by a user form (log table pattern). [6:50]-[7:10] shows the automation's "Trigger Status: ACTIVE" panel and a real Gmail inbox with an auto-generated "Urgent Action Required" email — good visual for explaining "the server can act on a timer, without any user present." [7:40]-[8:30] repeats the familiar Apps Script deployment dialog and Google's OAuth consent screen ("This application was created by a Google Apps Script user... wants to access your Google Account").

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Derived/computed fields from date math; time-driven triggers (cron-like scheduled server code); calling an external AI API from server-side Apps Script and writing the result back into the UI; a dry-run/test button for a scheduled job; a log-table tab written only by server code.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A **"days until" reminder app** (e.g. library book due dates, homework deadlines): store a due date per row, compute status color from today's date, and set up a daily trigger that emails a digest. This is a genuinely good, scoped milestone — one trigger, one email template — much more teachable than the full app. The "AI email" idea maps directly to "call Gemini's API from Apps Script with `UrlFetchApp` to draft a message" — an excellent, concrete AI+backend integration project for this class, since Gemini is already the class's assistant.

### Traps a kid will hit
Time-driven triggers need to be created and enabled explicitly (Apps Script's trigger UI, separate from the code); forgetting this means "my scheduled job never runs" with no obvious error. Calling an external API requires enabling `UrlFetchApp` external requests and handling the API key safely (a real trap: don't hardcode secrets kids will screenshot). Editing a specific line number in code.js to add an API key is fragile and a likely kid mistake (wrong line, wrong quoting).

### Doesn't transfer, and why
Storing employee passport/visa/CPR numbers is enterprise HR territory, not a class project; the "AI email" content (subscription dunning language) has no teen use case beyond the mechanism itself.

## Honest caveats
No explanation of *how* the trigger or the API call is implemented — we only see the resulting UI. "Completely free" AI API claim is the narrator's marketing line, not something to take as fact for planning. Nothing here shows or narrates use of Gemini, Claude Code, ChatGPT, or Antigravity to build the app, despite the batch theme description — it is a pure feature demo of DeepSeek-power app, sourced from a template being sold, not a coding tutorial.
