# Claude AI Builds School Management System in Excel in 6 MINS (No Macros, No Code!) (Mohammad Rameez Imdad, 6.2 min)

**What it is:** a real, live AI-build session — but in Excel via a "Claude for Excel" add-in, not Google Sheets/Apps Script. Claude writes native Excel formulas (no macros) to build a school dashboard from one prompt. 2026-era (mentions "Claude Opus 4.7").
**Substance:** substantive as an AI-build workflow example (a rare one in this batch with real prompt text and a real permission/safety moment on screen), but the platform is wrong for our course (Excel, not Sheets/Apps Script) so treat as a transferable-lesson source only.

## Ideas, in the video's order
- [0:01:04] Presenter writes the prompt in Notepad first, then pastes it into the Claude panel — a good habit to model: draft your prompt somewhere editable before sending it, rather than typing directly into the chat.
- [0:01:36] The actual prompt is shown and read aloud: "Hey Claude, help me build a school management dashboard in Excel. Native features only, no macros... use demo1/demo2/demo3 for students and teachers and parents... Pakistani school context, fees in PKR, classes nursery..." — a real example of a scoped, constraint-heavy prompt (explicit tech constraint "no macros," explicit locale/currency, explicit fake demo names) rather than a vague one-liner.
- [0:02:41] After sending the prompt, Claude "asks a permission" before acting, and the presenter clicks **"dangerously always allow"** to skip future permission prompts — a real, filmable instance of a human turning off the AI's own safety checks for convenience, worth showing the class as a cautionary clip in itself.
- **[0:04:19] A genuine destructive-action warning appears on screen: "potential data loss, clear range A1:Z100"** — the AI asked before wiping a large range, and the human again clicked "dangerously always allow" through it. This is one of the only *unstaged, visible* AI-about-to-do-something-destructive moments across the whole batch, directly matching CONTEXT.md's ask to note every instance of the AI (or human) breaking/risking working data.
- [0:03:45] Presenter explicitly says Claude is "very very costly" and its "tokens is very limited" compared to ChatGPT, which he calls "budget-friendly... for students, freelancers" — a real, first-hand cost comparison worth relaying to Ben when picking which model the free-tier kids will realistically get.
- [0:05:57] "If you face any kind of errors... you just simply give them a natural language prompt, they will fix it for it" — stated as a general claim, not demonstrated on screen (no actual error-and-fix shown in this video, despite the claim).

## What the frames add
[0:01:20]-[0:02:30] show the actual Claude-for-Excel side panel with the typed prompt and Claude's response streaming in, plus the permission dialogs described above — genuinely useful screenshots of "what an AI asking permission before a risky action looks like," which the class can compare to whatever permission UI Gemini shows in Apps Script/Sheets. [0:03:20]-[0:05:10] show the resulting dashboard, student directory, attendance tracker, and weekly timetable, all built with native Excel formulas (visible formula bar in places) rather than macros or VBA.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Writing a scoped prompt with explicit constraints (tech limits, locale, fake test data); an AI asking permission before a risky/destructive action; the human's choice to disable those safety prompts ("dangerously always allow") for speed.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Use the "potential data loss, clear range A1:Z100" moment as a warm-up discussion in the very first lesson: show the clip, ask "would you click allow?", then set the class rule that nobody clicks through a destructive-sounding AI permission prompt without understanding what it will delete first.

### Traps a kid will hit
The habit of clicking "dangerously always allow" to stop being interrupted is exactly the kind of shortcut a 14-year-old will take under time pressure — this video is a ready-made cautionary example, since it shows a competent adult doing exactly that.

### Doesn't transfer, and why
Wrong platform entirely: Excel + a Microsoft-side Claude add-in, no Google Sheets, no Apps Script, no web deployment — none of the mechanics here (native Excel formulas, the add-in's permission model) map onto the course's stack. Use only for the prompting-habit and safety-permission lessons, not for any technical pattern.

## Honest caveats
No error-and-recovery is actually shown despite the claim that Claude "will fix it" — that claim is untested on screen. The video is otherwise a fairly straightforward promotional demo (course/business pitch at the end, generic "you can do it for your business" framing).
