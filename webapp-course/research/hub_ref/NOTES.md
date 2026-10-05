# Yuval's makers-lab: what our hub copies and what it fixes

Screenshots in this folder (captured 24 Sep from a local run of C:/Users/Ben/code/ref/makers-lab).

## Copy as-is
- **Course journey home** (`03_home_student.png`): units as a vertical timeline, lesson cards ("בונים: …", steps,
  90 min), progress bar + badge chips at the top, team name top-left.
- **Lesson player** (`05`-`07`): header with lesson title, progress "4/17", a clickable step rail; the big workspace
  left, the step panel right (step type chip, title, instruction, "למה", "מה אמור לקרות", "שימו לב", "זהירות");
  buttons רמז (one at a time) / אני תקוע (troubleshooting one at a time) / ציוד לשלב הזה; lesson challenges with
  חובה / אתגר / Hacker Challenge checkboxes; big הבא / חזרה at the bottom, arrow keys work.
- **Join** (`02_join.png`): class code + team name, "we only keep the team name".
- **Teacher "כיתה עכשיו"** (`10`): a card per team with lesson, step and progress bar, refreshed every 10 s; help queue.
- **Presenter** (`12`): projector deck derived from the lesson, teacher notes strip at the bottom.
- Accessibility (text size, contrast), print view, Hebrew RTL, light palette.

## What it lacks, which is exactly what Ben asked for
- **Instruction steps show only an icon + the same text** in the big workspace (`06_player_step4`: "פותחים את
  MakeCode"; `07_arduino_step9`: "פותחים את Arduino IDE... Tools → Board"). No screenshot of where to click.
  → Ours: the workspace shows an **annotated screenshot or a short animation of the exact click path**.
- No "copy this" affordance. → Ours: **prompt boxes with a copy button** (blanks for the kid's own ideas), and
  "paste here" screenshots of the Gemini chat and the Apps Script editor.
- No model of talking to an AI. → Ours: **conversation steps** (an annotated example chat), **vague vs specific**
  side by side, the **bug-report template**, and **design worksheets** (game / character / level cards) whose
  filled-in answers feed the prompt.

## Stack difference
makers-lab is Next.js + Prisma/SQLite on Node. Ours is Apps Script + one Sheet (tabs = its tables:
Units, Lessons, Steps, Hints, Troubleshooting, Challenges, Classes, Teams, Progress, Help, Worksheets), one
HtmlService single-page player, `google.script.run` for progress/help/worksheets, polling for the teacher board.
