# How to Build Complete HR System with Google Apps Script - Attendance, Payroll & Dashboard | E10 (Mohammad Rameez Imdad, 11.3 min)

**What it is:** promo feature-tour demo of a pre-built HR/attendance/payroll dashboard, two roles (admin, employee). No code walkthrough. The narrator also live-edits a hardcoded admin email inside `code.js` and `index.html` mid-demo — the only video in the batch where the presenter actually touches source code on camera, even briefly.
**Substance:** thin narration overall, but the **device-binding anti-fraud feature** is the single most distinctive idea anywhere in this batch.

## Ideas, in the video's order
- [0:00:33 - 0:01:38] **Device-ID binding for attendance**: each employee's clock-in is tied to the specific device (browser/computer) they first used; trying to log in as a *different* employee from an already-registered device is explicitly rejected ("This device is already registered with any other user. Only one user can mark attendance from one device"), demonstrated live as a genuine anti-buddy-punching / anti-proxy-attendance control. This is a real fraud-prevention pattern (bind a sensitive action to a device fingerprint, not just a password) that no other video in the batch attempts, and is conceptually interesting even at a simple level (likely just storing a browser-generated ID and comparing it, not true hardware fingerprinting).
- [0:00:33] Attendance also records **IP address and location** alongside clock-in/out — combined with device binding, this is the batch's clearest example of using several weak signals together for one trust decision.
- [0:02:43] **Loan module**: an employee applies for a loan (amount, purpose, term), admin approves/sets an interest rate, and the system auto-generates a **repayment schedule** (multiple future-dated installment rows) from one approval action — a real "one write fans out into N derived rows" pattern, more elaborate than anything else in the batch.
- [0:04:53 - 0:05:57] **Deductions and salary** are separate line items from the loan repayments, all converging into one employee's pay picture — modeling a person's finances as several independent linked tables (loans, deductions, salary, leave) rather than one flat record.
- [0:05:57] **Leave balance system**: a fixed annual allowance (e.g. 21 days), a running "used" count, and remaining days computed and displayed as a percentage — a derived value from a request log, another example of a computed total that could drift (same conceptual risk as the cash-book reconciliation in YeSCYs6bNs0, though this video shows no reconcile mechanism for it).
- [0:08:08] Basic **admin-to-employee messaging** feature (an inbox-like chat scoped to one employee at a time) — the only in-app messaging feature shown anywhere in the batch.
- [0:08:42 - 0:09:48] **Live on-camera code edit**: narrator opens `code.js`, finds a hardcoded admin email address, edits it, then does the same in `index.html`, explaining "our admin email is dead... we need to find that particular email ID... and change with our original email ID." This is a first-hand, unintentional demonstration of a real bad practice (a hardcoded email baked into both server and client code in multiple places, requiring manual find-and-replace in two files to change) — genuinely useful as a cautionary example: config values like "who is the admin" should live in one place (e.g. a settings sheet), not be duplicated across files.

## What the frames add
UI-only screenshots throughout (attendance dashboard, loan application/approval forms, leave request/approval, messaging panel) — no code or raw Sheet views appear in any of the five frame sheets for this video, despite the on-camera code edit described in the transcript; the frames don't capture that moment. Nothing in the visuals adds beyond the transcript.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Device/IP binding as a lightweight trust signal — a genuinely novel idea for the class to discuss (how would you even implement "this device already claimed" in Apps Script? Likely a browser-generated random ID stored in `localStorage` or a cookie, sent up and checked against a Sheet column).
- One approval action generating multiple derived rows (a loan's repayment schedule) — a step up in complexity from the batch's usual single-row status updates.
- Hardcoded config values duplicated across files as a real, observed anti-pattern (not theoretical) — directly useful as a "why we put settings in a sheet, not in the code" teaching moment.

### Becomes something kids do (activity, mini-project, milestone)
- A **class attendance/streak tracker** with a simple device-binding check (store a random ID in the browser, compare against what's recorded for that student) — approachable version of the anti-fraud idea, and inherently interesting to teens (can you cheat the system? how would you prevent it?).
- A **"borrow and repay" points system** (e.g. borrow bonus points against future good behavior, repaid over weeks) — reuses the loan → auto-generated repayment schedule idea in a fun, low-stakes form.
- Explicit exercise: have kids **grep their own project for a hardcoded value** (an email, a name, a number) that should instead live in a settings sheet — directly inspired by watching the narrator do exactly that live.

### Traps a kid will hit
- Implementing device binding without understanding it's just a client-supplied ID (not real hardware verification) will give kids false confidence — worth being explicit that a determined student could clear browser storage or use a different browser to fake a "new device"; this is a lesson in why device binding is a deterrent, not real security.
- A loan-style "one action creates many future rows" feature is the first place in this batch where a kid would need to loop and write multiple new Sheet rows from one function call — a step up in Apps Script complexity (arrays of new rows, `setValues` for a range) that's worth flagging as harder than basic single-row CRUD.
- Hardcoded values duplicated in both `.gs` and `.html` (as the narrator demonstrates having to fix in two places) is exactly the kind of thing Gemini will produce by default if not told to centralize config — worth pre-empting with an explicit "put settings in one sheet" rule early in the course.

### Doesn't transfer, and why
- Payroll, loans-with-interest, and HR leave policy are adult workplace concepts a 14-year-old has no use for as a real project; only the device-binding, cascading-writes, and centralized-config lessons are worth extracting, rebuilt around a classroom-appropriate theme.

## Honest caveats
Narrator states he is not confident in English ("I will get a little confused with my English language") which likely explains the unusually thin, repetitive narration across this whole channel rather than any deliberate pedagogical choice; nothing in this video is explained as a lesson — every backend idea listed above is our own inference from watching behavior and the one accidental on-camera code edit.
