# Project Management Crud Web Application Using Google Apps Script | Crud Web App | C11 (Mohammad Rameez Imdad, 11.0 min, Whisper transcript)

**What it is:** feature demo of a finished freelancer/agency dashboard (projects, code links, sales, income/expense). No AI-build shown, but does show real Apps Script code and the deploy screen briefly.
**Substance:** mixed: the secret-key second-factor login and the visible code snippets are genuinely useful; the rest is a standard click-through.

## Ideas, in the video's order
- [0:02:10] A "secret key" second login step, entered after username/password, re-verified on every page refresh — a simple, teachable extra-auth-factor pattern (not real 2FA, just a second shared secret, good to name that distinction for the class).
- [0:03:23] Theme toggle (light/dark/custom) stored per user — minor but a nice "personalization saved server-side" example.
- [0:03:49] New drop-down options (countries, payment platforms, statuses) can be added from inside the app itself, which writes back into a "Dropdown" config sheet — same self-service-config pattern seen in other C-series videos.
- [0:06:51] On-screen note: "our data is being refreshed on real time... after 7 seconds" — explicit confirmation of client-side polling (setInterval-style refresh), useful concrete number for explaining latency/polling to students.
- [0:09:11] A simple income/expense tracker inside the same app computes net profit live as rows are added/removed — good small backend exercise (sum a column, show the total).
- Generic: PDF/Excel export buttons (generic UI, not backend-relevant).

## What the frames add
[0:01:00]-[0:01:10] show real Apps Script source: a login handler and a secret-key verification block (`if (incorrect secret key) show error / else activate session`) — one of only a few videos in this batch to show actual authentication code on screen. [0:02:10]-[0:03:00] show the deployed "CRUD Web App" login and dashboard shell. [0:07:40]-[0:09:20] show a genuine "New deployment" Apps Script dialog (type, description, Execute as, Who has access) — a rare visible instance of the actual deploy screen, useful to screenshot for class material. Passwords are, again, visible as plain text in the Login sheet.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
A second shared-secret login step; self-service dropdown configuration; live polling refresh (named "every 7 seconds"); a running total computed from sheet rows.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "class treasury" mini-app (add income/expense, see running total) is a perfect two-lesson project: read rows, sum a column, write a new row — the minimum viable backend exercise, and this video's income/expense screens are a ready-made mockup to show students first.

### Traps a kid will hit
Explicit 7-second polling interval is a good discussion point for "what happens with 15 kids all polling the same sheet every 7 seconds" — a real quota/concurrency conversation prompted directly by this video's own UI text.

### Doesn't transfer, and why
Still a demo, not a build session — no prompting or AI errors shown, so it cannot teach the AI-collaboration workflow itself.

## Honest caveats
Whisper transcript is rougher than the YouTube-caption videos (repeated lines, garbled phrasing around 0:03:07-0:03:26); treat exact wording with more caution, though the on-screen content and frames are unambiguous.
