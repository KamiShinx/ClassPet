# How to Build Accounting Software in Google Sheets Apps Script (Complete Cash Book + Dashboard) | E30 (Mohammad Rameez Imdad, 8.9 min)

**What it is:** promo feature-tour demo of a pre-built cash-book/ledger dashboard. No code shown. Ends with a generic "share this video" close, no deploy walkthrough.
**Substance:** thin, but the **reconciliation** feature is the single most conceptually interesting thing in the whole batch (see below) — worth reading closely even though it's still just a demo.

## Ideas, in the video's order
- [0:01:06 - 0:02:46] **"Reconcile" button**: recalculates every party's running balance from scratch by replaying all ledger entries, and reports a diff table (old balance vs new balance vs difference) for any party whose stored balance had drifted from the true sum of their transactions. This is a real, teachable backend concept: **cached/denormalized totals can go stale**, and you need an explicit recompute step because Sheets has no live foreign-key constraints or triggers that keep a running total honest automatically.
- [0:02:46 - 0:03:52] Every cash-in/cash-out entry updates a party's balance and the day's till balance — two derived numbers touched by one write, which is exactly the kind of drift the reconcile button exists to fix.
- [0:04:58] "Daily summary: regenerate all" — same idea as reconcile but for daily opening/closing balances across the whole cash book, computed from the day's entries (opening balance carries from previous day's closing) — a rolling-forward calculation, a genuinely nontrivial backend idea.
- [0:07:07] **Voucher sequence** with an explicit "next number" counter and a manual reset-to-zero option — shows that auto-incrementing IDs in a spreadsheet are just a stored counter cell, not something magic, and that it can be reset (and therefore broken) by a user.
- [0:07:39] Per-user color theme stored and reapplied on login — small but real example of **per-user settings persisted server-side**, not just in the browser.
- [0:08:20] Narrator states the system "can handle above 10,000 rows efficiently" — an unverified performance claim, no evidence shown; flag as marketing, not a fact to repeat to kids (Sheets does slow down well before 10k rows if queries aren't optimized, per general knowledge, label as our own knowledge).

## What the frames add
Pure UI screenshots throughout (dialogs for add-party, add-entry, reconcile progress spinner, ledger tables, color-theme picker). No code or raw Sheet columns are shown. Frames add nothing beyond confirming what's described in the transcript.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- **Denormalization drift and reconciliation** — the clearest, most concrete illustration in this whole batch of why you sometimes store a computed total instead of recalculating it live (speed), and why that means you need a "recompute everything" operation. This is worth building a mini-lesson around.
- Rolling-forward daily balances (today's opening = yesterday's closing) — sequential dependency between rows, a good "gotcha" for kids to discover.
- Auto-increment counters as an ordinary stored value, not a database feature.

### Becomes something kids do (activity, mini-project, milestone)
- A **class point/currency tracker** (e.g. a classroom economy) where each transaction updates a running balance, and a "recalculate everyone's balance" button recomputes from the transaction log — this directly reuses the reconcile pattern and is a natural, fun 14-year-old project (points for participation, a shop to spend them in).
- Have kids **intentionally break** a stored balance (edit a Sheet cell directly) and then run their own "reconcile" function to fix it — turns the abstract "stale cache" idea into something they can see and repair.

### Traps a kid will hit
- If kids store a running balance as its own field (for speed) instead of always summing the transaction log, they will hit exactly this staleness bug the first time two people write near-simultaneously or a script errors out mid-update — teach the reconcile pattern *before* they hit it, not after.
- Resetting an auto-increment counter to zero while old rows still use higher numbers creates duplicate IDs — an easy trap once they build the "voucher number" idea.

### Doesn't transfer, and why
- Multi-party credit/debit accounting, payment terms, bank references — none of this is content a teen project needs; only the recompute/reconciliation *mechanism* is worth keeping.

## Honest caveats
Pure demo, no code, no architecture explained in words — the "reconciliation" insight above is our own extrapolation from watching the feature work, not something the narrator frames as a lesson. The "10,000 rows, no slowdown" claim is unverified marketing and should not be repeated as fact.
