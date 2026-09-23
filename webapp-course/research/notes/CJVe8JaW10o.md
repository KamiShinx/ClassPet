# Build a Personal Finance Dashboard in Google Sheets & Apps Scripts (Income & Expenses) (Mohammad Rameez Imdad, 8.4 min)

**What it is:** promo/demo walkthrough of a finished income/expense tracker template ("Expense Tracker"); the narrator clicks through the UI and, in the last 2 minutes, shows the generic copy-sheet -> Apps Script -> deploy steps. Not a build tutorial — no code is written on screen, no line of logic is explained.
**Substance:** thin. It is a feature tour plus a stock deployment recipe reused verbatim across this channel's whole catalogue; nothing about *why* anything works.

## Ideas, in the video's order
- [0:00:00] Two user roles, admin and user, share one dashboard UI; only the data scope differs (generic, but the specific "same UI, filtered query" pattern is a clean way to explain roles to kids).
- [0:00:33] Dashboard shows aggregated totals (income, expense, net balance, transaction count) computed from row data — a first look at "the sheet is the source of truth, the dashboard just summarizes it."
- [0:01:07] A transaction form (date auto-fills, category from a dropdown or free text) writes one row per Add Income / Add Expense click — the CRUD "Create" op made concrete.
- [0:01:41] Categories and payment methods are themselves editable lists stored in their own sheet tabs, populated live into the form's dropdown — config data driving UI, not hardcoded.
- [0:03:20] Admin sees all users' data, a regular user only their own rows — role-based row filtering, the same idea repeated at 0:03:54 for a live login-as-user demo.
- [0:04:28] "Whenever a transaction is added, an email is sent to that user" — an event-triggered notification (writes a row -> also sends mail), shown live in Gmail at [0:05:20].
- [0:05:36]-[0:06:43] The reused deployment recipe: make a copy of the Sheet into your Drive -> Extensions > Apps Script (code already present) -> Deploy > New deployment > select type Web app > Execute as me, Who has access "Anyone" > Deploy -> authorize -> get the `/exec` URL. This exact sequence recurs in nearly every video in this batch (generic but worth teaching once, well).
- [0:06:43] Sign-up flow: a new visitor can "create an account" with email + password on the web app itself, independent of Google login — this Sheet has its own Users table and does its own auth, it does not use Google Sign-In.
- Dark/light mode and "mobile responsive" are mentioned as selling points, not explained (generic UI polish, not backend).

## What the frames add
Real value here: [5:50-6:10] the raw code.js in the Apps Script editor (unreadable in detail but shows a `.gs` file structure with functions), and the actual Sheet tabs visible in the tab bar at [5:30]: `Users`, `Transactions`, `PaymentMethods`, `Categories`, `Settings` — a concrete, small example of "one spreadsheet, several tabs = several tables." [6:10-6:30] shows the real "New deployment" dialog including the "Execute as" / "Who has access: Anyone" dropdown, useful as a screenshot reference for teaching deployment. [4:40-5:10] shows a mobile-width responsive layout side-by-side with code, implying (not explained) that CSS media queries are involved.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Sheet-as-multi-table database (one tab per entity); role-based data filtering (same UI, different query scope); config-driven dropdowns (categories/payment methods editable without touching code); event-triggered email on write; a non-Google signup/login system layered on top of Apps Script.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A **class expense tracker**: each kid logs "spending" (e.g. allowance) to their own rows; dashboard aggregates totals; teacher (admin) sees everyone's, students see only their own. Teaches: writing rows, reading them back filtered by user, and a simple sum/aggregate. Natural stepping-stone project — the category-management sub-feature (add a category, it appears in the dropdown next load) is a good "config sheet drives the UI" milestone.

### Traps a kid will hit
Forgetting to redeploy ("New deployment", not just Save) after editing code — the video glosses over this entirely. The "Execute as / Who has access" choice being invisible-but-critical. Auth flow (Apps Script's own signup, not Google login) is more code than a beginner will want to write from scratch — better to standardize on Google-account identity for the class's real backend concepts.

### Doesn't transfer, and why
The custom domain / "embed this URL" framing is small-business web-dev talk, not something a 14-year-old cares about. INR/currency-conversion settings are dead weight for a class project.

## Honest caveats
Zero explanation of *how* client and server talk (no mention of `google.script.run`, no discussion of what happens on Save). No mention of AI-assisted building despite the batch's theme (Gemini/Claude Code/etc.) — this video shows only a finished product, never the making of it. Treat all "concept" bullets above as our own inference from watching the UI, not something the video itself teaches.
