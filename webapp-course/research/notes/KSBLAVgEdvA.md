# How to Build a Complete Billing & Inventory System in Google Sheets - E47 (Mohammad Rameez Imdad, 15.2 min)

**What it is:** promo feature-tour demo of a pre-built billing/inventory dashboard; ends with a pitch for 334 other template projects, not a build tutorial. No deploy walkthrough in this one.
**Substance:** thin — one line why: pure "click this, see that" narration, zero code or architecture explanation.

## Ideas, in the video's order
- [0:00:32] Two roles only (admin/user), simpler than the five-role videos — role count is a design choice, not fixed.
- [0:00:32] Dashboard shows sales/purchase totals + trend charts, computed from other sheets (rollup view again, generic).
- [0:01:05] Sidebar shows a **live badge count** (e.g. "1" low-stock item) — a computed value surfaced as a notification, recalculated from the products sheet each load.
- [0:01:39] Low-stock item has inline **add-stock/deduct-stock** buttons that write directly to a quantity cell without opening the full edit form — a shortcut mutation, still a normal CRUD update under the hood.
- [0:01:39] "Product list" print view doubles as a **paper reorder form** for staff without computer access — data leaving the app entirely as a printable artifact, worth noting as a real off-line/on-line boundary.
- [0:04:59] Invoices have three types (invoice/proforma/quotation) and **only "invoice" decrements stock** — same table, a type field changes side-effects. Good example of "not all rows of one table behave the same."
- [0:04:59] "Payment terms: Net 60" auto-computes a due date field from today + N days — simple derived-field logic.
- [0:05:31] "Quick add customer" inline inside the invoice form (mini-CRUD nested inside another form) — avoids leaving context, a genuinely good UX pattern to reuse.
- [0:05:31] Overdue invoices get a bulk **"send now" reminder email** button — batch email trigger over filtered rows.
- [0:09:19 - 0:10:58] Purchase order → "mark received" → **stock auto-updates**; return → stock auto re-added — the same cross-sheet cascade pattern as other MRI videos (received stock and returns both mutate the products sheet from a different sheet's action).
- [0:14:14] **Email automations list** shown as a settings page: welcome email on user creation, return confirmation, forgot-password OTP, low-stock alert (daily scheduled trigger), daily sales summary (daily scheduled trigger) — this is the clearest enumeration in the batch of what Apps Script time-based triggers are actually used for in a real system.

## What the frames add
All UI screenshots, no code shown, no deploy sequence in this video (channel promo screen at the very end instead). One frame (sheet_006, ~13:20-13:50) shows the **permission matrix table** again (feature rows × role columns, allow/deny/view-only cells) and an **email automations table** listing trigger type → recipient — both reusable as class handouts for "what does a scheduled trigger actually send, to whom."

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Time-driven triggers (daily digest, daily low-stock check) vs event-driven actions (button click sends email) — this video is the best evidence in the batch that both trigger types exist in a real project side by side.
- A single field (invoice `type`) branching behavior (does/doesn't touch inventory) — teaches "not every row does the same thing," relevant once kids add a status/type column of their own.
- Nested mini-forms (quick-add customer inside invoice creation) as a real UX/data-entry technique.

### Becomes something kids do (activity, mini-project, milestone)
- A **class snack-shop ledger**: product sheet with quantity, a "sale" record type that decrements stock and a "restock" record type that increments it — same field, opposite effect, teaches type-branching directly.
- A **daily digest email** (Apps Script time trigger + `MailApp.sendEmail`) summarizing that day's class sign-ups/scores — cheap, concrete, and demonstrates a trigger kids can see fire on a schedule instead of on a click.

### Traps a kid will hit
- Time-based triggers must be set up manually per script (Extensions → Apps Script → Triggers) and silently stop firing if the account's authorization expires or the trigger is deleted on redeploy — invisible failure mode, worth calling out explicitly before kids build one.
- "Quick add" nested forms are easy to break if the two forms don't refresh each other's dropdown state — a state-sync bug kids will hit the first time they try it.

### Doesn't transfer, and why
- Purchase orders/supplier/commission logic is pure small-business bookkeeping; no teen project needs it. Only the automation/trigger idea and the type-branching idea are worth reusing.

## Honest caveats
Like the other MRI videos, this is advertising for a custom-dashboard business (ends with "334 projects... contact us"). No code is shown or explained at all in this one — even the deploy steps are skipped. Everything above is inferred from watching the UI, not stated by the narrator as a lesson.
