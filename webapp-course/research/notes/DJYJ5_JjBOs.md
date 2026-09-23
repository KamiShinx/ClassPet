# Classroom Leaderboard and XP Calculator with Google Forms (Advanced, Secondary Level) (Chris Hesselbein, 8.6 min)

**What it is:** a how-to for a no-code (no Apps Script at all) gamification setup: Google Form → Sheet → formula-driven leaderboard → embedded in a Google Site. Circa 2017-2020 (old Google Sites branding referenced as "new" — outdated).
**Substance:** substantive for what it covers (real formulas, real structure) but it's Forms+Sheets+Sites only, no Apps Script/web app — a different tech path than the rest of the class's stack.

## Ideas, in the video's order
- [0:00:32] A 2-question Google Form (Name = multiple choice, Points = short answer) is the *only* data-entry surface — teacher or students submit "give Jerry 20 points" as a form response.
- [0:01:04] Form responses auto-populate a linked Sheet — this is the video's implicit "backend": the Form is the write path, the Sheet is the table.
- [0:01:38] The XP calculator itself is someone else's pre-built template Sheet the teacher copies in ("Copy to..." menu) rather than builds — copying a whole spreadsheet-as-a-tool is treated as normal practice.
- [0:02:43] Three color-coded sections in the copied sheet: orange = roster (names, avatar, guild/team, "hour"/class period), yellow = config (XP thresholds per level, level titles), green = computed output (rank, level, totals) — a clean separation of input / config / derived-view that's a good mental model regardless of tech stack.
- [0:03:51] (**Named trap, stated explicitly**) "the most important and trickiest part": the names typed into the roster (column A) must *exactly* match the multiple-choice options on the Form's Name question, or a submission won't map to a student — a manual, error-prone sync between two independent surfaces (generic problem — duplicated data source — is called out as tricky by the video itself).
- [0:04:58] Output section aggregates: per-student rank/level/title, plus rollups by class period and by "guild" (team), with several pre-built charts.
- [0:06:08] To publish on a website, the sheet's sharing must be set to "anyone with the link can view" (a whole-sheet permission, not row-level) before charts embedded in Google Sites will render for visitors — direct analogue of Apps Script's "who has access" deploy setting.
- [0:06:40] A Google Site is built purely by inserting the Sheet's charts (Insert > Charts) — the "frontend" here is a static chart embed, not an interactive app; it live-updates because the chart is bound to the sheet, not because of any code.
- [0:07:13] Explicitly says: once set up, the teacher never touches the website again — every new Form submission recalculates and republishes automatically (all via Sheets formulas + chart binding, not any push mechanism).

## What the frames add
Frames at [sheet_002.jpg-003.jpg] show the full XP Calculator sheet structure clearly: roster columns → yellow threshold/title config table → a lookup-driven Level column → green output block with Student/XP/Rank/Avatar/Level/Title/Guild/Hour. A per-guild and per-class aggregation table appears at [00:05:20-05:50], and the final chart dashboard ("Advanced Classroom Leaderboard" — gauge + 4 bar charts) is shown assembled inside Google Sites at [00:06:30-07:50]. Confirms the whole thing is formulas (VLOOKUP/SUMIF-style patterns, not visible in detail) plus charts — no script editor is ever opened.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
The separation of **raw input data vs. config vs. computed/derived view** is the strongest transferable idea — it maps directly onto "the Sheet is the database, and some sheets/ranges are really just queries over other sheets." Also a clean real example of **read-only publishing** (sharing settings) as the crude ancestor of a deployed web app's "who has access."

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**Automatic class leaderboard/XP tracker**, rebuilt as an actual Apps Script web app instead of Forms+Sites: one sheet of raw XP-award rows (student, points, reason, timestamp — written by a small teacher-only form page), a computed leaderboard (sum by student, sort descending, assign rank/level from a threshold table), and a public read-only view page. Backend concept taught: **aggregation (sum/group-by) and sorting as a derived view over raw event rows** — directly connects to G2's own "automatic leaderboard" theme video (`6gl4tMuYUBQ`, `=SORT()`), just wrapped in a proper deployed app instead of a public link to a live-editable Sheet.

### Traps a kid will hit
- The "names must match exactly" trap the video calls out is exactly what a kid's own leaderboard will hit if student names are typed independently in two places (e.g., a roster tab and a submission form) — solve it by having ONE source of truth (a dropdown/select populated from the roster, not free text).
- Publishing "anyone with the link can view" on a *whole* Sheet (rather than exposing only derived, non-sensitive columns through a proper backend endpoint) leaks every student's raw data (including individual point history) to anyone with the link — worth flagging as a privacy trap the Forms+Sites path invites, and one a real Apps Script `doGet` avoids by only returning the fields you choose to serialize.

### Doesn't transfer, and why
The whole delivery mechanism (Forms + Sites + sharing settings + chart embeds) is not the class's stack (Apps Script HtmlService web apps) — don't teach Google Sites or the "copy this template sheet" habit; use it only for the input/config/output mental model and the leaderboard math.

## Honest caveats
This is entirely no-code (Forms/Sheets/Sites); it never touches Apps Script, so it can't show anything about AI-assisted coding, deployment, or `doGet`/`doPost`. Treat purely as a concept/structure reference, not a build guide for this course. The UI (Google Sites chart insertion, "new Google Sites") looks dated; current Sites/Sheets chart embedding still works similarly as of 2026 but exact menu wording will differ.
