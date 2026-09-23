# How to Build a Wholesale Distribution System in Google Sheets & Apps Script - E50 (Mohammad Rameez Imdad, 19.8 min)

**What it is:** promo product demo (feature tour of a pre-built ERP-style dashboard, "Food Wholesaler") + a 90-second install/deploy walkthrough at the very end. Not a tutorial on how it was coded. 2026 (Gemini-3-era references in sibling videos on this channel).
**Substance:** thin on explanation, but the UI itself demonstrates a lot of real architecture (see below). One line: zero narration of *how*, extensive narration of *what it does*.

## Ideas, in the video's order
- [0:00:00] Five user roles (admin/manager/salesman/accountant/etc.), logged in as admin; role-based feature access is a running theme (generic but real pattern).
- [0:00:33] Dashboard = aggregated read of several sheets (revenue, customers, suppliers) — a "rollup" view built from the same tables used elsewhere.
- [0:01:06] Customer record has a `route` and `assigned salesman` field — foreign-key-style reference from one row to another entity (salesman ID), all inside Sheets.
- [0:01:38] "Block"/"inactive" customer flag hides them from future dropdowns elsewhere — one boolean field gating visibility across several screens (single source of truth pattern).
- [0:02:42] Product has its own `category` sub-CRUD (categories are a separate sheet/table, not a hardcoded list) — normalization instinct.
- [0:03:45] Searchable customer/product dropdowns instead of scrolling lists — usability detail, generic.
- [0:04:50 - 0:06:29] Quotation → status pipeline (draft → sent → accepted/rejected) → **convert to invoice** button copies/links a quotation row into the invoices sheet — a real "workflow with linked records across two tables" pattern, not just CRUD.
- [0:07:35 - 0:09:12] Invoice → Payment recorded in a separate Payments sheet → balance recalculated and invoice status flips to paid; **Sales Return** flow re-adjusts invoice balance and (for non-admin) needs admin approval (pending → approved/declined) — an approval-queue pattern.
- [0:10:49] Salesman **commission payout** is a derived calculation (percentage of sales) with its own ledger of what's paid vs owed — computed value tracked/paid down over time, not just displayed.
- [0:11:54 - 0:12:59] Delivery module: driver + vehicle entities, a delivery links multiple invoices to one driver/route, dispatch/delivered status toggle, printable "challan" (paper trail) — many-to-many link table (delivery ↔ invoices).
- [0:13:31 - 0:15:41] Purchase orders mirror sales side (supplier, PO → approve → receive → updates stock automatically; payment made to supplier tracked separately) — the same CRUD+status-pipeline shape reused for the purchasing side, good evidence the pattern generalizes.
- [0:15:41] Stock adjustment requires admin approval before it changes inventory — another approval-gate example.
- [0:17:51] **Activity log** sheet records who did what — an audit-trail table, append-only.
- [0:18:24] Explicit statement: role-permission matrix ("what each role can do") is itself stored as a data table (shown as a sheet grid in the frames), not hardcoded in script — config-as-data.
- [0:18:57 - 0:19:30] **Deploy walkthrough** (generic, reusable for class): "Make a copy" of the template Sheet → Extensions → Apps Script (code + index.html already there) → Deploy → New deployment → "who has access: Anyone" → Deploy → Google's "unverified app" warning → Advanced → "Go to (unsafe)" → Authorize → get the `.../exec` URL.

## What the frames add
Frames 1-6 are pure UI screenshots (dashboards, forms, tables) confirming the transcript — no extra info. Frame 7 (sheet_007, ~16:00-18:30) shows the **role-permission matrix as an actual data grid** (rows = features, columns = roles, cells = allow/deny icons) — useful visual for teaching "permissions as data, not code." Frame 8 (sheet_008, 18:40-19:40) shows the real deploy sequence: "Copy document" dialog, the raw Sheet with columns (id, name, email, password, role...), the Apps Script code editor (code visible but unreadable/not explained), the "New deployment" dialog, and Google's "Google hasn't verified this app" screen. This is the clearest visual reference in the batch for the deploy trap kids will hit.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Sheet-as-table, one tab per entity, rows = records.
- Status field driving a UI pipeline (draft/sent/paid, pending/approved/rejected) — good, concrete, transferable.
- Cross-sheet writes from a single user action (convert quotation → invoice touches 2+ sheets) — real distributed-write concept, though never explained as such.
- Config-as-data: permissions matrix and settings stored in a sheet, not code.
- The deploy sequence itself (Apps Script bound to a Sheet, `exec` URL, "anyone" access, auth screen) is the single most reusable teaching material here.

### Becomes something kids do (activity, mini-project, milestone)
- A **class supply-swap board**: item sheet + "claim" status pipeline (available → claimed → returned), teaches status-driven CRUD and one linked action.
- A **club membership tracker** with a role-gated admin view vs member view, teaches role-based access read from a Sheet.

### Traps a kid will hit
- Recreating a "convert quotation to invoice"-style cross-sheet update will be their first taste of Apps Script not having real transactions — a half-finished write (e.g. script times out mid-way) can leave the two sheets inconsistent.
- The deploy screen's "Google hasn't verified this app" warning will scare 14-year-olds; they need to be told in advance it's expected for a personal script.
- Every redeploy after an edit needs a **new deployment version** (or "manage deployments" update) or the live URL keeps serving old code — this video doesn't mention it, but it's the single most common Apps Script gotcha kids will hit.

### Doesn't transfer, and why
- The entire business domain (customer credit limits, commissions, delivery challans) is adult B2B logistics — no 14-year-old wants to build a wholesale distribution system. Only the *shape* (linked status-driven records) transfers, not the content.

## Honest caveats
This is a sales demo for a paid custom-project business ("contact us on WhatsApp", "334 projects available") — it never explains a single line of code or why anything works, only that it does. Treat every "architecture pattern" above as inferred from watching the UI behave, not as something the video teaches.
