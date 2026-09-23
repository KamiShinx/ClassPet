# Crypto Portfolio Tracker Web Dashboard Google Sheets & Apps Script | CRUD Admin/User Login | C39 (Mohammad Rameez Imdad, 8.1 min)

**What it is:** feature demo of a finished crypto portfolio tracker (login, add/edit/delete holdings, notes, granular per-user permissions). No AI, no build process.
**Substance:** thin-to-mixed: one genuinely useful concept (live prices via a Sheets formula, not an API), otherwise a straight click-through.

## Ideas, in the video's order
- [0:01:43] Live coin prices use the built-in `GOOGLEFINANCE()` formula, not a paid API — a real, free way to get live data into a sheet without any code (generic Sheets knowledge, but worth calling out since kids will reach for APIs by default).
- [0:02:51] Date-range and coin-name filters on the data table, applied client-side against data already fetched from the Sheet.
- [0:05:04] Three permission tiers demoed live: "add/edit/delete," "add/edit only," and "add only" — same login system, different capability, driven by a "Type" field in the login sheet's row (role stored as plain string, checked in code).
- [0:07:53] A built-in on-page calculator widget, unrelated to the backend — just a UI nicety.
- Generic: portfolio P/L coloring red/green (generic UI, not backend-relevant).

## What the frames add
[0:04:30] and [0:05:00] show the Sheet's "Login" tab with an Email/Password/Type/CRUD/DisplayName/WhatsApp column layout — passwords again stored as plain text (e.g. visible "Ra1234"-style values). [0:06:50] briefly shows the Apps Script code editor with a `doPost`-style handler and a `checkLogin(email, password)` function comparing the submitted password directly against the sheet value with `===` — confirms there is no hashing at all, a clear, concrete security trap for the course to call out explicitly. No AI prompting is shown anywhere.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Role stored as a plain field checked server-side; `GOOGLEFINANCE()` as a zero-code live-data source; permission levels beyond just admin/user (add-only, add+edit, full CRUD).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "class fantasy stock game" using `GOOGLEFINANCE` for real prices is a fun, well-scoped week-3/4 project that teaches reading external live data without needing any API key at all — good low-friction win before tackling a real API.

### Traps a kid will hit
Password compared with plain `===` in the Apps Script code (confirmed on screen) — an explicit, filmable example to show the class "this is not real security," tying directly to CONTEXT.md's warning about protecting a project (in this case protecting user data, not just code).

### Doesn't transfer, and why
No AI-build process shown; not useful for teaching prompting/workflow, only for spotting a real anti-pattern.

## Honest caveats
Thin video, mostly UI click-through with generic "hope you like it" filler at the end.
