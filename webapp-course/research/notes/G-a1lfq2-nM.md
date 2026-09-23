# How to Build a Complete Business Management Dashboard in Google Sheets | E25 (Mohammad Rameez Imdad, 9.9 min)

**What it is:** promo feature-tour demo of a pre-built "appraisal" (property valuation services) management dashboard with five roles. No code walkthrough.
**Substance:** thin — click-through narration, but the multi-stage **workflow timeline** is the most detailed status pipeline shown in the batch.

## Ideas, in the video's order
- [0:00:00] Five roles (admin, manager, coordinator, appraiser, finance), each scoped to a subset of screens — same role-gated pattern as other MRI videos, confirmed live at [0:07:37-0:09:16] by logging in as each role in turn and showing their reduced menu.
- [0:01:37] File attachments (PDF/images, multiple files) attached to a client record, uploaded to Drive — same upload-then-store-URL pattern seen elsewhere, here explicitly "multiple files allowed."
- [0:01:37] **Duplicate-email validation** on the client form (shown live: adding a client with an existing email is rejected) — a real server-side (or client-side pre-check) uniqueness constraint, worth naming since Sheets has no native unique-constraint enforcement — it has to be coded.
- [0:03:49 - 0:05:26] An "offer" (a project/job) moves through **six explicit workflow stages** (entered → approved → data processing → surveying → evaluating → submitted), each advanced by a button click ("move to X"); reaching "processing" auto-fills an approved date and computes a submission deadline from a configurable number of days — the most granular multi-stage pipeline shown in this batch, good as a reference for "state machine with more than 2-3 states."
- [0:04:00-0:04:10] A **"workflow timeline" modal** visualizes the stage history for one record (a mini activity log scoped to a single row) — distinct from the global activity log seen in other MRI videos; worth noting as "per-record history" vs "whole-system history."
- [0:05:26] Invoices generate a **PDF saved to Drive with a shareable link**, separate from the on-screen invoice — same one-record/many-outputs idea as the payslip video.
- [0:06:32] Invoice number **auto-increments from the previous number if left blank** — same counter-as-a-value idea as the voucher sequence in YeSCYs6bNs0, reinforcing it's a recurring implementation, not a one-off.

## What the frames add
All UI screenshots (client/offer/invoice forms, the workflow-timeline modal, five sequential role logins). No code or raw Sheet columns shown. The frames mainly confirm the six-stage workflow visually (a small vertical stepper with checkmarks) which is worth showing in class as a picture of "a status field visualized as steps," more elaborate than the simple chevron-pipeline UI used in other MRI videos (invoices/quotations).

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- A multi-stage (6-state) workflow as the clearest example in the batch that "status" isn't always binary/ternary — good for a lesson on designing a status field with more than a couple of values.
- Per-record history (workflow timeline) vs whole-system activity log — two different granularities of "audit trail," worth distinguishing explicitly for kids designing their own logging.
- Uniqueness validation (duplicate email rejected) as something that must be explicitly coded, not automatic in Sheets.

### Becomes something kids do (activity, mini-project, milestone)
- A **project/assignment tracker** for a school club or group project: stages like "assigned → in progress → review → done," each with a timeline of who moved it and when — directly reuses the six-stage workflow + per-record timeline idea at a scale kids actually live with.
- A **"no duplicate sign-ups" check** on any class sign-up form (e.g., don't let the same email claim two raffle tickets) — reuses the uniqueness-validation idea as a concrete, checkable milestone.

### Traps a kid will hit
- Implementing "no duplicates" naively (checking only in the browser before submit, not on the server) fails under two people submitting at nearly the same time — the same underlying concurrency issue that shows up whenever multiple users can write to the same sheet; worth flagging as a recurring class topic (server-side validation, race conditions).
- A 6-value status field invites "forgetting a legal transition" bugs (e.g., a button that skips a stage) — worth having kids draw their state diagram before coding it, since Gemini will happily wire buttons that break the intended stage order if not told explicitly what's allowed.

### Doesn't transfer, and why
- Property appraisal / real-estate valuation workflow terms (surveying, evaluating) are opaque adult-industry jargon with no teen appeal; only the *state-machine shape* and *validation* ideas are worth keeping.

## Honest caveats
Standard promo demo, no code shown or explained; the "six-stage workflow" and "per-record timeline vs global log" distinctions are our own reading of the UI behavior, not something the narrator frames conceptually — he moves through it quickly ("because the time is short... need to complete the video around 9 to 10 minutes"), which itself signals padding-to-length rather than careful teaching.
