# How to Build a Restaurant POS System in Google Sheets – Full Web App Tutorial (D22V2) (Mohammad Rameez Imdad, 12.6 min)

**What it is:** demo/promo, the "upgraded version" of AHFuxehkqiA (same channel, same four-role restaurant concept), adding finance/stock/reporting modules on top. Click-through only, no code shown. Read AHFuxehkqiA's note first — this one repeats the core order-state-machine idea and adds new material on top.
**Substance:** mixed — the state-machine content overlaps with AHFuxehkqiA, but the finance/stock additions here are new and worth their own notes.

## Ideas, in the video's order
- [0:00:34]–[0:03:52] Same order-lifecycle state machine as AHFuxehkqiA (pending -> preparing -> ready -> served -> billed -> table dirty -> cleaned), walked through live again with a slightly different UI — confirms this workflow design is the deliberate core of this template family, not a one-off.
- [0:04:26]–[0:05:35] **Finance module**: billing an order writes to a separate finance/ledger view distinct from the order record itself — income is tracked as its own entity referencing the order, not just a field on the order.
- [0:05:35] Manually adding a **stock purchase expense** (e.g. buying Coke bottles from a vendor) alongside sales income, both landing in the same finance report — a simple two-sided ledger (money in from orders, money out from purchases), net profit computed as their difference.
- [0:06:10] A **searchable-by-date** finance report shows income/expense/profit for one specific day — filtering an aggregate report by a date range, a distinct skill from filtering a raw list.
- [0:08:25] Assigning additional tables to a newly added waiter is done by directly appending a value into the raw Sheet, then refreshing the app — a rare on-camera moment of the presenter demonstrating that editing the Sheet directly (not just through the app's UI) is a valid way to change data, useful for showing kids the Sheet and the app are the same data, always.
- [0:09:01]–[0:10:41] A second waiter's panel is used to run through the **entire order lifecycle a second time**, confirming the workflow generalizes across multiple concurrent staff/orders rather than being a one-off demo.

## What the frames add
[0:00:30] shows the raw Sheet with tabs: `Login`, `Tables`, `Orders`, `OrderItems`, `Billing`, `Menu`, `KOT`, `Finance`, `Stock` — the most tab-rich schema example in the batch, and a good concrete illustration that a real small app can end up with 8-9 related tabs, each a distinct entity (orders vs. order *items* being split into two tabs is itself worth pointing out — a one-to-many relationship modeled as two sheets linked by an order ID). [8:20]-[8:30] shows the raw Sheet being hand-edited (adding a waiter's assigned tables directly in the spreadsheet) rather than through the app, reinforcing "the Sheet is not just a database behind the app, it's directly editable."

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
A one-to-many relationship split across two Sheet tabs (Orders + OrderItems, linked by an order ID) rather than crammed into one row — the clearest example of this important modeling idea in the whole batch; a simple two-sided ledger (income and expense rows, profit = their difference); filtering an aggregate report by date; directly editing the Sheet as a legitimate way to change app data (useful for debugging/seeding test data).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Extending the AHFuxehkqiA-style "class ticket system" project seed: once an order/ticket can have **multiple items**, split it into two sheets (Tickets, TicketItems) linked by a ticket ID — a natural, well-motivated moment to teach one-to-many relationships, since cramming a variable number of items into one row visibly doesn't work. A simple income/expense ledger with a profit total is a good, small, standalone milestone (e.g. a class "bake sale" tracker: log sales and costs, see running profit).

### Traps a kid will hit
Splitting into two related tabs means writes must now happen in the right order (create the order row first, get its ID, then create the item rows referencing it) — a genuine sequencing bug source for beginners used to one-row-per-thing. Editing the raw Sheet directly (shown here) is fine for the teacher/admin but a trap if kids do it casually mid-testing and forget the app has its own validation the raw edit bypasses (e.g. no duplicate check, no required-field check).

### Doesn't transfer, and why
POS/finance vocabulary (KOT = kitchen order ticket, stock purchase, tax percentage) is restaurant-specific; keep only the one-to-many modeling and ledger ideas, discard the restaurant framing (already recommended to swap for a class-ticket theme per AHFuxehkqiA's note).

## Honest caveats
No code shown or explained; this video substantially overlaps with AHFuxehkqiA (their own "v1"), so treat shared ideas as one data point, not two independent confirmations. No AI-assisted-building content shown, consistent with the rest of R3.
