# Income & Expense Budget Tracker Dashboard | Google Sheets & Apps Script (D23) (Mohammad Rameez Imdad, 11.9 min)

**What it is:** demo/promo of another income/expense tracker (overlaps heavily with CJVe8JaW10o from the same channel), but adds live currency conversion and a "friend debt splitting" feature. Click-through only, no code shown.
**Substance:** mixed — the batch's clearest example of calling a **live external exchange-rate API** and using its result inside a calculation, plus a genuinely distinct bill-splitting feature.

## Ideas, in the video's order
- [0:00:36] Multi-currency totals are converted to a common display currency "using API keys" — the video's own words confirm an external exchange-rate API is called server-side, not a hardcoded conversion table.
- [0:01:44]–[0:02:19] Payment methods are configured to accept only specific currencies (e.g. "UPI only accepts INR") — a validation/constraint rule tied to a config row, not just a flat list.
- [0:02:52]–[0:03:28] Live worked example: enter 499 INR, a 20% tax is applied, and the **net USD-equivalent amount is computed and shown before saving** — a genuine multi-step calculation combining a stored tax rate, a live conversion rate, and the entered amount, shown with visible intermediate values (original / tax / net, in both currencies) at [0:03:10] and again at [0:03:20].
- [0:05:48] A **pending vs received** payment status models money held by a third party (e.g. a friend's PayPal account) before it reaches the user's own account — a workflow state beyond simple paid/unpaid, useful as an example of modeling a real multi-party process as data.
- [0:06:22] Flipping a payment from pending to received updates the dashboard's "pending amount" total live — same "one write moves multiple aggregate numbers" idea seen elsewhere in the batch.
- [0:07:29]–[0:08:38] **Splitting a group expense** among named friends: enter total spent, number of people, and whether "I paid for friends" or "I borrowed from friends," and the app computes each person's share automatically — a distinct, well-scoped calculation feature (divide a total across N people) not seen elsewhere in this batch.
- [0:09:11] A restricted "limited user" role can see only specific payment methods (UPI/PayPal) and can mark pending payments as transferred, without full admin access — a third variant of role-based restriction in the batch, this time scoped by *payment method* rather than by owned rows.

## What the frames add
No Sheet structure, code, or deployment sequence is shown in this video's frames — entirely UI-only, consistent with several others in the batch. The frames do show, step by step, the calculation-preview panel (original amount / tax / converted amount) at [0:02:40]-[0:03:20], which is a clean visual for explaining "the server computed several derived numbers from one input before saving."

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Calling a live external API (exchange rates) from server-side code and using the result in a calculation; a constraint rule attached to a config row (this payment method only accepts these currencies); a pending/received workflow state modeling a real multi-step process; splitting a total across N people (a small, self-contained calculation).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A **"split the pizza bill" calculator**: enter a total and a list of names, compute each person's share, and optionally track who has "paid back" (pending/received) — this maps directly and appealingly to a teen scenario (group snacks, event costs) and reuses the exact split-and-track-status mechanics shown here. Calling a real, free public API (e.g. a currency or a fun-fact API) and using its result in a calculation is a good, concrete "backend calls another backend" milestone, distinct from just reading/writing the class's own sheet.

### Traps a kid will hit
External API calls from Apps Script need `UrlFetchApp`, which counts against daily quotas and can fail (rate limits, API downtime) — a kid's project will look "broken" if the exchange-rate API is unreachable, and there's no fallback shown in this video for that case. Splitting logic ("I paid for friends" vs "I borrowed from friends") has two symmetric cases that are easy to get backwards — a good discussion point about testing both directions.

### Doesn't transfer, and why
Binance/crypto references and multi-currency bookkeeping for freelance income are adult-finance specific; keep only the bill-splitting and live-API-call mechanics.

## Honest caveats
No code or Sheet screenshots shown; the exact API used for exchange rates is never named. This video overlaps substantially with CJVe8JaW10o (same channel, same broad concept) — read both, but expect repetition. No AI-assisted-building content shown.
