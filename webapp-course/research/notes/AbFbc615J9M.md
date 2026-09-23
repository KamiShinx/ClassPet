# How to Make a Free Payslip Management System Web Dashboard with Google Apps Script & Sheets | E35 (Mohammad Rameez Imdad, 10.0 min)

**What it is:** promo feature-tour demo of a pre-built payslip/HR dashboard. No code or build explanation. 2026 (references "January 2026" data in the demo).
**Substance:** thin — pure click-through narration.

## Ideas, in the video's order
- [0:00:35] **Public, no-login lookup**: anyone can type an employee ID and see just that person's payslips — a deliberately narrow public "read" endpoint next to the full authenticated admin app. Good concrete example of "not everything needs a login."
- [0:01:10] Lookup returns a **list of available months** for that ID before showing a slip — the app queries the sheet for matching rows and only lets you drill into what actually exists (avoids showing empty results).
- [0:02:48] "View payslip history" per employee = a filtered read of one sheet by employee ID — the single most common query shape in this whole batch (filter one table by a foreign key).
- [0:03:20] Employee record stores a `join date`; the app auto-computes months/years of tenure — derived field from a date, computed at render time, not stored.
- [0:05:01] Generating a payslip pulls together many manually entered numbers (incentives, bonuses, advances, LOP days) into one **computed net pay** — a real "many inputs, one derived total" calculation, worth being explicit that Apps Script just does this in JS math, nothing exotic.
- [0:06:08 - 0:06:42] Same record can be rendered three ways: on-screen, **print view**, and **generated PDF** (saved to Drive) — one data row, multiple output formats is a genuinely reusable idea.
- [0:06:42] Single-record email vs [0:08:20] **bulk email** (loop over all employees for a given month) — same `MailApp` call, looped; a clean example of moving from one row to "for each row."
- [0:07:48] **Monthly report** aggregates totals (gross, deductions, net, paid vs pending count) across all employees for a given month — a summary/aggregate query over the same sheet used for individual records.
- [0:09:25] Logging in as "employee" shows a cut-down version of the same data (their own slips only) — same backend, different frontend view depending on role, reinforcing the read-scoping pattern seen elsewhere in the batch.

## What the frames add
All UI: modals for add/edit employee and generate-payslip, the printed payslip layout, the monthly report table. No code or Sheet columns are shown at all in this video (unusual for the batch) — the frames add nothing beyond confirming the transcript.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Public, unauthenticated read endpoint alongside an authenticated app — maps directly to `doGet(e)` with a query parameter, no session needed.
- Filter-by-ID as the dominant query pattern.
- One record → many render targets (screen/print/PDF/email) — teaches that "the data" and "how you show it" are separate concerns.
- Looping a single-row action (email one) into a bulk action (email all) — a good, small, concrete intro to iterating over rows server-side.

### Becomes something kids do (activity, mini-project, milestone)
- A **"check your grade/attendance" public lookup page**: type your student ID, see only your own row, no login — directly mirrors the payslip lookup and is something a 14-year-old immediately understands the stakes of (privacy: don't leak other students' rows).
- A **certificate/report-card generator**: pick a name, computed summary from several input fields, "download as PDF" — reuses the compute-then-render-three-ways idea at kid scale.

### Traps a kid will hit
- The public lookup-by-ID pattern is an easy place to accidentally leak everyone's data if the server function returns the whole sheet instead of filtering server-side before sending to the client — worth calling out as the first real "backend vs frontend trust" lesson: filtering in the browser after fetching everything is not privacy.
- PDF/Drive generation requires Drive scope permissions kids will need to grant and will find confusing the first time (another "unverified app" moment).

### Doesn't transfer, and why
- Payroll math (LOP days, service charges, bill tips) is adult workplace content with zero appeal to a 14-year-old; only the compute → render → send shape is worth keeping.

## Honest caveats
Another advertisement-style demo ("subscribe our channel") with no explanation of how anything is built — every backend concept listed above is our own inference from watching behavior, not something the video teaches or names.
