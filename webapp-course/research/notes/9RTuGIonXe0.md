# How to Build Income Expense System in Google Sheets with AI (2026) - E46 (Mohammad Rameez Imdad, 11.8 min)

**What it is:** feature demo of a finished "trust/club" income-expense tracker with an approval workflow, budget limits, and several Gemini-powered AI features (predictions, reports, receipt templates). No build process shown. 2026-dated.
**Substance:** mixed: several concrete, small, teen-relevant patterns (approval states, budget thresholds, scoped AI access) buried in a long feature tour.

## Ideas, in the video's order
- [0:01:09] AI-predicted next month's totals based on the past 5 months' data, shown right on the dashboard — a light "AI forecasting" feature, interesting but not something to build early.
- [0:01:43] **Three-state approval workflow: pending → approved/rejected → resubmit.** A non-super-admin's entries start "pending" and only become real once a super admin approves them; rejected entries can be "resubmitted." This is a clean, concrete state-machine pattern that's well within teen reach (e.g., a club expense request that a treasurer approves).
- **[0:05:35] Budget guardrail: entering an expense that would push a department over its budget is blocked outright** ("Budget exceeded... Cannot add this expense") with the exact numbers shown (limit 330,000, already spent 25,000, this entry would bring it to 32,000 — wait, video says over the department's limit and refuses the write). This is a genuinely good, simple "check before you write" backend rule: compare the new total against a stored limit before saving.
- [0:07:49] The **AI chat/report feature is explicitly scoped by role**: "if is the user, they can only able to access the data of the particular user... AI will reply according to user's data only... your user cannot able to steal your information" — the AI's answers are filtered by the same permission model as the rest of the app, not given blanket access to everything. A good, concrete security idea worth naming directly: "the AI should never see more than the logged-in user is allowed to see."
- [0:08:23] Gemini API key obtained free from `aistudio.google.com`, then pasted into `code.gs` — confirms, once again, the "paste your key into Settings/code" pattern without ever showing the safer Script-Properties alternative.
- [0:10:06] "Generate with AI" rewrites a WhatsApp/email receipt template on request, including removing an unwanted logo it added — an example of iterating on AI output with a short follow-up instruction rather than a full re-prompt.
- Generic: currency symbol setting, activity log, profile section (generic app furniture).

## What the frames add
Frames confirm the dashboard's income/expense/net totals, the AI-predicted-next-month panel with red/green trend numbers, the pending-approval badge counts, and a budget-exceeded scenario mid-transaction. No Apps Script code or prompting UI is shown in the sampled frames (all frames are the deployed web app), so visual confirmation is limited to the finished feature set, not the build process.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
A pending/approved/rejected/resubmit state machine; a "check a stored limit before allowing a write" guardrail; scoping an AI feature's data access to match the logged-in user's own permissions.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "class treasury with approval" — a student submits an expense request, it sits as pending until the treasurer (a second role) approves it — is a strong, well-scoped project that teaches both roles/permissions and a simple state machine, and ties in nicely with the budget-limit-check idea as a stretch goal ("don't let total spending go over the class's budget").

### Traps a kid will hit
If kids later add an "ask AI about our data" feature, the natural first version will let the AI see everything regardless of who's asking — this video's explicit "AI only sees this user's own data" design is worth teaching as the correct target, even before kids build it, so they don't default to the insecure version.

### Doesn't transfer, and why
The AI-prediction and AI-report-generation features are polish, not core-concept, and not needed for a first project; skip demonstrating those to keep focus on the approval/budget-guardrail ideas which are the real teachable content here.

## Honest caveats
No AI failure or mistake is shown anywhere in this video — it's a smooth, successful feature tour throughout, so treat the AI-report and AI-prediction quality as best-case and unverified.
