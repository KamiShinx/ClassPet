# I Built AI Assistant 3D Printing ERP + CRM in Google Sheets (Mohammad Rameez Imdad, 17.0 min)

**What it is:** promotional feature-tour of a paid Google Sheets + Apps Script ERP/CRM template ("3D Print Manager
Dashboard") for a 3D-printing business, ending in a purchase call-to-action. Recent (dashboard shows dates in
September 2026).
**Substance:** mixed — no AI-build content at all (see caveats), but the feature tour itself contains real,
reusable backend/UX patterns.

## Ideas, in the video's order
- [0:00:00] Pitched as "no hosting cost" because it's just Sheets + Apps Script — a fair, reusable framing for
  why this stack works for a school project.
- [0:01:13] Login page with an animated 3D hero graphic; cosmetic, not backend.
- [0:01:26] Username/password are read straight out of a Sheet tab (column A / column C), in plaintext, and the
  login form just checks against those cells.
- [0:01:58]-[0:02:56] Role & Permission system: super admin/admin/manager/staff/viewer, each with a checkbox
  grid of feature permissions. Toggling one checkbox live changes what that role can do (generic idea, but a
  clean live demo of authorization-by-role).
- [0:02:41] A role can't be deleted while users are still assigned to it — a referential-integrity guard rail
  (generic backend safety concept, well demonstrated).
- [0:02:56] "Add role" can copy permissions from an existing role as a starting template.
- [0:03:19] Dashboard KPI cards (revenue, profit, overdue, delivered-this-month) computed live from the data —
  the "dashboard = summary math over rows" idea.
- [0:03:32] Clicking a calendar date surfaces just the deliveries due that day (filtering by date).
- [0:04:31] Orders list can be grouped/ungrouped by customer.
- [0:05:28] Opening an order shows a full linked record (items, cost, balance due) plus call/WhatsApp action
  buttons — UI convenience, not really backend.
- [0:05:55]-[0:06:09] Adding a customer writes to the Sheet and instantly appears back in the UI — the
  write-then-reread loop, shown plainly.
- [0:06:28]-[0:07:12] Creating a quotation: pick customer + item, choose material/color/weight, auto-computed
  total, "save draft," and a version history ("360° view") per quotation.
- [0:07:35] Quotation status pipeline: sent → accepted/rejected/revised — a simple state-machine idea worth
  explaining generically.
- [0:08:03] Follow-up log records call/WhatsApp/email contact history per customer — a CRM "activity log" pattern.
- [0:08:25] New shipment auto-fills the delivery address from the linked customer record (linked records, not
  re-typed data).
- [0:09:28]-[0:10:18] Print-job board: a job moves Approval → Start → Finish → Quality Check → Pass/Reject
  (Kanban-style status pipeline, same shape as the quotation one).
- [0:11:33] Printer inventory computes cost-per-print from purchase cost, expected life and power draw — a
  derived/computed field.
- [0:12:54]-[0:14:16] Filament batches are added, then "log usage" decrements stock and a separate Stock Ledger
  tab shows every movement automatically — an audit-log/ledger pattern.
- [0:14:42] Billing section distinguishes invoice/proforma/delivery-challan/credit-note as different document
  types against the same order.
- [0:16:18] Ends on "grab the link in the description" and watch a separate install video — a purchase funnel,
  not a tutorial.

## What the frames add
Every sheet (001-007) is a screen-recording of the finished, polished dashboard UI — tables, cards, modals,
Kanban boards. No Apps Script editor, no AI chat window, no terminal, no code of any kind appears in the whole
17 minutes. The one exception is [0:01:26]-[0:01:40] (sheet_001), which briefly shows the raw Google Sheet
backing the login: plain columns of Username/Password/Role in cleartext — confirms the transcript's claim and
is itself a caveat, not a good practice to copy. The final frames [0:16:20]-[0:16:30] (sheet_007) are the
creator's own YouTube channel page, browsing thumbnails of his other paid-template videos — confirms the whole
video functions as an upsell funnel. Nothing else in the frames adds information beyond the transcript.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Role-based permission checks (a lookup table of role → allowed actions); a simple status/workflow pipeline
(quote → order → production → shipped, or job board columns); linked records across sheets (customer → orders →
shipments, one write cascading into related views); computed/aggregated dashboard numbers from row data; an
audit-log/ledger pattern for stock (every change appended, balance derived).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "class store" or "club sign-up tracker" mini-project: one Sheet of items/events, one Sheet of "orders" with a
status column (new → confirmed → done), and an Apps Script web page that (a) writes a new row on submit, (b)
shows a KPI card counting rows by status, mirroring [0:03:19]. As a stretch, add a second sheet of "customers"
and have the order form look up/autofill from it by name, mirroring [0:08:25]'s linked-record idea — this is a
good half-lesson on "one Sheet referencing another."

### Traps a kid will hit
Storing usernames/passwords in plaintext in a Sheet [0:01:26] is an anti-pattern to flag explicitly, not copy —
better to check `Session.getActiveUser().getEmail()` against an allow-list. The 5-role × many-permission matrix
[0:01:58] is realistic scope for an adult SaaS product but far too much state for a weak/free Gemini to keep
consistent across a UI and a Sheet in one session — if attempted, expect the AI to silently drop or mis-map
permissions. The whole app is 15+ modules; a kid trying to "build this" in one shot will get an AI that produces
a shallow, broken skeleton rather than a working slice — this video is a caution about scope, not a template to
clone.

### Doesn't transfer, and why
This is an adult small-business ERP for a specific niche (3D-print costing, filament/printer depreciation,
courier performance, tax invoices) — not a project a 14-year-old wants to build or would find fun, and nothing
here shows how the app was actually made, so there is no AI-workflow lesson to extract from it.

## Honest caveats
Despite the clickbait title ("AI Assistant... Built"), no AI tool (Gemini, ChatGPT, Claude, Antigravity) is
named or shown anywhere in this video — it is a pure product demo for a paid template, and the "AI Assistant"
in the title does not correspond to any feature actually shown. Treat this video only as a source of UI/backend
*patterns* to explain, never as evidence of how such an app gets built with a weak/forgetful AI.
