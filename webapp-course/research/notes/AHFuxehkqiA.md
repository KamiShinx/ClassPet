# Build a Restaurant Management Dashboard with Google Sheets & Apps Script (Mohammad Rameez Imdad, 9.8 min)

**What it is:** demo/promo of a restaurant order/table system with four distinct roles (admin, waiter, kitchen, cleaner). Click-through only, no code shown. Note: this is the "v1"; aHIP6R6sswE is this channel's later "upgraded version" of the same app — read that note alongside this one to avoid double-crediting overlapping ideas.
**Substance:** mixed — the clearest **state-machine / workflow** example in the entire batch: an order and a table each move through a fixed sequence of states, and different roles are only allowed to act on certain states.

## Ideas, in the video's order
- [0:00:35] Four roles, each seeing a **different, purpose-built screen** for the same underlying orders (admin/waiter/kitchen/cleaner) — role isn't just "more or less data," it's a genuinely different UI per job function, the clearest example of that idea in the batch.
- [0:02:14] A table can be reassigned mid-order from a dropdown — editing a foreign-key-like reference (which table an order belongs to) after creation.
- [0:02:50]–[0:03:57] **Order status state machine**, watched live end to end: pending -> preparing -> ready (kitchen) -> served (waiter) -> billed -> table marked dirty -> cleaned (cleaner) -> available again. Each transition is a specific role's action on a specific screen, and the next role only sees the order once it reaches the state relevant to them — a genuinely well-designed example of a workflow that different people cooperate on asynchronously through shared data.
- [0:03:23] Items can be **added to an existing, already-created order** ("update order"), not just at creation — order editing as a distinct operation from order creation.
- [0:05:38] Generating a bill computes a tax percentage on top of the order total — a small computed-field example (subtotal -> tax -> total), same pattern seen in other videos but worth reinforcing.
- [0:06:09] Billing an order **automatically marks its table "dirty"**, which then blocks new orders at that table until a cleaner explicitly marks it clean — one action (billing) changing a second entity's state (the table) as a side effect, a good example of "your write can ripple to other rows."
- [0:07:53]–[0:09:33] Admin can assign specific tables to specific waiters (e.g. "this waiter only handles tables 1-3"), and a waiter's screen only shows orders for their assigned tables — a fourth flavor of row/scope restriction in the batch, here scoped by an explicit many-to-one assignment rather than by "rows I created."

## What the frames add
No Sheet structure, code, or deployment sequence appears in this video's frames — pure UI walkthrough. The frames do make the **four different role screens** visually obvious side-by-side (Admin Panel / Waiter Panel / Kitchen Panel / Cleaner Panel headers, distinct layouts each), which is a clean, ready visual for explaining "the same data, four different views, four different permitted actions" to a class.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
A multi-step status/workflow field where each transition is restricted to a specific role (a real state machine, not just a free-text status); one write (billing) triggering a state change on a *different* row (the table); role-specific screens built from the same data rather than just filtered lists; assignment-based scoping (waiter <-> table) distinct from ownership-based scoping seen elsewhere.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A **class "ticket" system for group projects or a school café/kiosk run by students** maps directly onto this: a request/order moves through fixed stages (submitted -> being worked on -> ready -> done), and different classmates (or roles: "cashier," "maker," "runner") only act at their stage — this is one of the strongest, most directly reusable project shapes in the whole R3 batch, precisely because the state-machine idea is simple to explain and fun to build with a physical "roles" story kids intuitively get (this literally is a group project simulator).

### Traps a kid will hit
A workflow with several states and several roles multiplies the number of "who is allowed to do what, from which state" rules fast — kids will need a simple table (state x role -> allowed actions) sketched on paper *before* coding, or the logic sprawls into a tangle of `if` statements. A write that changes a second row (billing -> table dirty) is an easy place to forget to update the second row at all, leaving the app looking inconsistent (order billed, table still shows available).

### Doesn't transfer, and why
Nothing about the restaurant framing itself needs to survive — swap "table" for "ticket/task" and "waiter/kitchen/cleaner" for classroom roles, and the entire mechanic transfers cleanly; that substitution is exactly the recommended project seed.

## Honest caveats
No code shown or explained; all state-machine structure above is inferred by watching the sequence of role actions on screen, not confirmed by the narrator. This video substantially overlaps with aHIP6R6sswE (same channel's later version of the same app) — expect repeated ideas between the two notes. No AI-assisted-building content shown.
