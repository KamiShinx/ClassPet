# Build a Dynamic Quiz App with Google Sheets! (Admin + Student Login) | C50 (Mohammad Rameez Imdad, 12.9 min)

**What it is:** a feature demo/walkthrough of a finished quiz web app (admin + student roles), narrated as a product tour, not a build tutorial — it shows the Sheet-as-database and one glimpse of code, but never shows prompting an AI or writing the script from scratch.
**Substance:** mixed: rich in visible backend behavior (auth, timers, email, categories) but shallow on explanation — the presenter clicks through features fast without saying *how* each is implemented.

## Ideas, in the video's order
- [0:00:02] Admin and student are different logins into the same web app, with different menus (role-based UI).
- [0:00:35] Login records the device's IP address; "no one other person can login through this IP" — one IP tied to one account at a time (an anti-sharing/anti-cheat control, generic idea but concretely implemented here).
- [0:01:09] Admin-only sections (manage users, manage questions) are simply hidden/absent from the student's menu — client-side role gating.
- [0:01:44] Each quiz category has a configurable "allowed questions" count and a per-question timer (10s/30s seen); unanswered questions auto-advance when the timer hits zero.
- [0:02:51] Quiz history and stats (average score, high score, total attempts, badges) are stored and recalculated per user.
- [0:03:57] Explicitly narrates going "to understand the backend concepts" — opens the Sheet: Login sheet columns are username, password, name, role, contact, IP, and an OTP column.
- [0:04:31] Demonstrates the IP lock live: reusing a username from a new session is rejected because the IP column is already populated for another user.
- [0:05:07] Categories are just a comma-separated list in a cell (column H) — admin adds "finance" by literally editing the cell text and clicking Add.
- [0:05:41] Forgot-password flow: enter email → OTP generated into a sheet cell → emailed → user pastes it back to verify → set new password. Classic OTP-via-Sheets-and-MailApp pattern, entirely visible end to end (through ~0:07:24).
- [0:09:03] Admin "manage users" is basic CRUD on the Login sheet's rows (add/edit a user record, save).
- [0:09:37] A newly-added user only sees the one category the admin allocated to them — per-user category permissions likely stored as a cell value read at login.
- [0:11:16] Admin "manage questions": pick a category, load its question sheet, add/edit/delete rows; a question's image can be a pasted Google-image URL or an uploaded file.
- [0:12:20] Per-category default question time (30s) is a value in the category/config sheet, not hardcoded — but the video says there's *no* UI to edit it, "you need to update the time from the sheets" directly.

## What the frames add
Confirms via frames: login sheet columns (Email, Password, Name, Admin?, Contact, IP, PhotoURL, Subjects) at [00:04:00–04:10]; a raw client error dialog "This IP is already used by another user" at [00:04:20]; two real Gmail notification emails — a login alert and a quiz-submission summary with correct answers — at [00:04:30–04:50]; and a few seconds of the actual `Code.gs` editor with an array of badge objects (`name`, `color`, threshold logic) at [00:01:50]. This is the only code glimpse in the whole video — not enough to reconstruct the logic, but it does prove the whole thing runs as one Apps Script project bound to the Sheet.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Authentication against a Sheet ("login sheet" as a user table); session/device restriction (IP-per-account); server-triggered email (`MailApp`/`GmailApp`) for OTP and notifications; timed client state with auto-submit; per-user permissions read from a data row; admin CRUD panel over the same Sheet the app reads from.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**Quiz app with simple login** (matches the G2 brief exactly): a Users sheet (name, password — plaintext is fine and should be named as a real trade-off in class), a Questions sheet per subject, and a student flow that logs in, picks a category, answers N timed questions, and writes a Results row. Backend concepts taught: **the Sheet as a user table (auth is just a row lookup)**, **reading rows into the frontend as JSON**, **writing a result row back**, and **a timer that lives in the client but the score lives in the server data**. Drop the IP-lock and OTP-by-email for the first pass (real but advanced); OTP-via-email is a great *stretch goal* once kids are comfortable with `MailApp.sendEmail`.

### Traps a kid will hit
- Confusing "hide the admin menu in HTML" with real security — the video's role gating looks client-side only; a curious student could view-source or call the server function directly and act as admin. Worth calling out explicitly as a lesson (client-side hiding ≠ access control) — this is my own inference, the video doesn't discuss it.
- Any edit that needs "you need to update it from the sheets directly" (no UI) is a sign the AI-generated app has an incomplete admin panel — a realistic trap when Gemini forgets to wire up an edit control for every config value.
- Category lists stored as one comma-separated cell (rather than one row per category) is a fragile pattern a kid (or a forgetful Gemini) might copy; easy to typo a comma and silently break parsing.

### Doesn't transfer, and why
IP-based single-session locking is overkill/confusing for a classroom of consenting friends on shared school wifi (multiple students could share one IP and get locked out of each other) — flag as a feature to skip, not copy.

## Honest caveats
No AI-building process is shown at all — this is a finished-product tour, useful purely as a **project shape and feature reference** for "quiz app with logins," not as a workflow example. Attribution of exact mechanisms (e.g., whether IP-lock is enforced server-side or just checked at login) is my inference from watching the UI, not something the presenter explains.
