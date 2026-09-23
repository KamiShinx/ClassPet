# How to Make Student Result Portal in Google Sheets + Apps Script | Admin & Teacher Dashboard (Mohammad Rameez Imdad, 9.3 min)

**What it is:** demo/promo of a school marks system with three access levels (admin, teacher, public "check my result" lookup). Same click-through format, no code taught.
**Substance:** thin as a tutorial, but the clearest three-tier role example in the batch (public lookup / teacher / admin), and a good, simple "computed grade from raw scores" example.

## Ideas, in the video's order
- [0:00:33] Teacher role is scoped to specific classes and subjects assigned to them (stored per-teacher, e.g. "these two classes") — role scope is data-driven (a list on the teacher's row), not hardcoded per account.
- [0:01:38] Adding a new class value to the source data sheet, then referencing it from a login/assignment row, makes it available to that teacher — same "edit the sheet, the dropdown/scope updates" pattern as other videos.
- [0:02:47] Teacher selects class + subject, then edits marks for the filtered list of students — a filtered read followed by scoped writes, a clean small example of "narrow your query before you edit."
- [0:03:54] **Public student-result lookup** requires no login at all — just a student ID — the third, unauthenticated access tier, distinct from admin/teacher.
- [0:04:27] Grade and composite score are **computed automatically from multiple raw fields** (test1, test2, written quiz, oral quiz, research) "on the basis of their criteria" — a derived/calculated field example, good for teaching "don't store what you can compute."
- [0:04:27] A printable "Academic Report Card" is generated from the same row data as the on-screen table — same data, a formatted report view (reused pattern across the batch).
- [0:05:00] Admin has unrestricted filters (any teacher/class/subject) where teacher's filter is locked to their own scope — visually demonstrates the difference between "admin query" and "scoped query" using the same UI.
- [0:08:28] Narrator makes a real, on-camera **usability slip**: adds a new student, then searches by teacher name in a field meant for student name, gets zero results, and has to explain the mistake — a small but genuine, unstaged moment showing what a wrong-field search looks like (rare in this batch, where mistakes are usually edited out).

## What the frames add
The frames are almost entirely the UI already described in the transcript (login screens, filter dropdowns, marks tables, and a formatted report-card print view at [4:00]-[4:30] and [8:00]-[9:00]) — no code, diagrams, or Sheet structure is shown on screen in this video beyond a brief glimpse of raw login/class data at [0:20]-[0:30]. Say plainly: frames add little beyond confirming the UI already described.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Three real access tiers in one app (public lookup / scoped teacher / full admin); scope-as-data (a role's allowed classes stored on their own row, not hardcoded); computed/derived fields (grade from raw scores); a formatted "report" view generated from the same rows as the editable table.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A **class quiz/points tracker**: students look up their own score by entering a code (public, no login); the teacher (admin) can edit any student's scores; if there are group leaders, they could be scoped to their own team only (mirrors the teacher-scope idea). The "compute a grade from raw numbers" piece is an excellent, small, self-contained milestone — a good first taste of writing a formula/function over stored data rather than storing the result.

### Traps a kid will hit
Search-by-wrong-field (shown live in the video itself) is a real, easy mistake once there are several text inputs on one screen — worth calling out explicitly as a UI/naming lesson (label your search fields clearly). Session storage for "stay logged in until manual logout" (mentioned at 0:02:12) is a piece of client-side state a kid will need explained, since Apps Script itself is stateless between requests.

### Doesn't transfer, and why
Nothing in this video is inherently adult/enterprise — it is one of the more teen-relevant demos in the batch by subject matter (school marks). No cuts needed here beyond simplifying to fewer fields (drop written/oral/research sub-scores down to 1-2 for a class project).

## Honest caveats
As with the rest of R3, no code is shown or explained, and there is no AI-assisted-building content (Gemini/Claude Code/ChatGPT/Antigravity) despite the batch's theme description — pure finished-product demo. The grade-calculation "criteria" is referenced but never shown, so we cannot confirm its exact formula.
