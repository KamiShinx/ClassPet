# Batch R3 — Mohammad Rameez Imdad: business dashboards on Sheets + Apps Script

All 15 videos are one channel selling finished Sheets+Apps Script templates. Every video is the same format: a
narrator clicks through a finished app for 8-13 minutes, then (in about half of them) repeats one boilerplate
deploy recipe. **None of the 15 show or mention Gemini, Claude Code, ChatGPT, or Antigravity, or any AI-assisted
build process**, despite the batch theme naming those tools — this is pure demo/promo, closer to an infomercial
than a tutorial. No code is ever explained; at most a code.js file flashes on screen unread. Treat everything
below as our own inference from watching cause and effect in the UI, not as anything the videos themselves teach.
Given that, the batch's honest value is entirely as **architecture reference** — fifteen worked examples of the
same handful of CRUD-app design decisions, made concrete.

## Where the batch agrees
Every single video repeats: (1) admin sees all rows, a regular user sees only their own — role scoping is the
one idea every video demonstrates; (2) a "reference" sheet tab (categories, payment methods, settings) feeds a
form's dropdowns live, so editing the sheet changes the app with no code touched; (3) the same deploy recipe
(make a copy -> Extensions > Apps Script -> Deploy > New deployment > Web app, Execute as me, Anyone -> authorize
-> `/exec` URL) recurs almost verbatim in CJVe8JaW10o, 9l7iFYy5dgk, zVITEJVGdtc, AHFuxehkqiA's family, and
HtcmWnotK9E; (4) "same data, different output" (a print view, a PDF, a report) recurs constantly. Where they
differ is mostly cosmetic (industry, color scheme); the underlying design decisions are a small, recycled set.

## Strongest ideas for this class
1. **State-machine workflow with role gates** (AHFuxehkqiA, aHIP6R6sswE, [00:02:50]-[00:03:57]): an order/table
   moves through fixed states, and each role can only act on specific states. This is the single best pattern in
   the batch — concrete, teachable, and maps directly onto a fun class project (see seeds).
2. **Config sheet drives the UI** (QuBYx7qv5LY, [00:04:55]-[00:06:35]): a Settings tab defines field type/required/
   filter/chart, read by the app to build forms. Too advanced to build in full, but worth one lesson as "this is
   how real low-code tools work."
3. **One-to-many via two linked tabs** (aHIP6R6sswE, [00:00:30] frame — Orders + OrderItems): the clearest
   relational-modeling moment in the batch, worth a dedicated lesson on when one row isn't enough.
4. **Ledger, not a mutable balance** (1Aj3Oi-Imxc, [00:03:58]-[00:04:31]): advances/loans are transactions, and
   the balance is always computed from history — an important habit to install early.
5. **Reversible writes** (HtcmWnotK9E, [00:07:48]): deleting an invoice restores the stock it had consumed — a
   rare example of undoing a side effect, not just deleting a row.
6. **Scheduled server-side jobs** (9l7iFYy5dgk, [00:05:04]-[00:06:45]): a daily 9am trigger plus a manual
   "test" dry-run button — the clearest time-driven-trigger example, with a good practice (test before trusting
   the schedule) attached.
7. **External frontend calling an Apps Script API** (zVITEJVGdtc, [00:02:50]-[00:05:05]): a PHP app authenticates
   against and edits a Sheet purely over HTTP — directly rehearses the class's planned Netlify/doPost pivot, and
   is the only video that shows Apps Script's real OAuth consent screen ([00:04:20]).

## Concept explainers worth reusing
- The OAuth consent screen ("...wants to access your Google Account... create and delete your Sheets") shown in
  zVITEJVGdtc [00:04:20] and 9l7iFYy5dgk [00:03:40] — good, ready screenshots for teaching what authorizing a
  script actually grants.
- HtcmWnotK9E [00:06:08]-[00:06:42] is the one moment in the entire batch where the narrator actually explains a
  concept in words (what a Sheet ID is, where to find it) rather than just clicking — short, reusable as-is.
- The deploy-dialog sequence (New deployment -> select type -> Web app -> Execute as/Who has access -> Deploy),
  seen identically enough times across the batch that it can be taught once as "the" recipe with confidence.

## Project seeds (teen scale)
1. **Turn-queue / help-desk ticket system** (from AHFuxehkqiA's order workflow) — submit a request, watch it move
   submitted -> in progress -> done, different roles act at different stages. *Teaches: state-machine writes,
   role-gated actions.*
2. **Class points bank** (from 1Aj3Oi-Imxc's loan ledger) — every earn/spend is its own row; balance is always
   computed, never stored-and-edited. *Teaches: append-only history, computed aggregates.*
3. **Split-the-bill calculator** (from 1E12PkCcurA, [00:07:29]) — total + names in, each person's share out,
   track who's paid back. *Teaches: a self-contained calculation, pending/done status.*
4. **Supply checkout with stock** (from HtcmWnotK9E) — borrowing decrements stock and blocks over-borrowing;
   returning restores it. *Teaches: cross-table validation, reversible writes.*
5. **"Days until" reminder + digest email** (from 9l7iFYy5dgk) — due-date math drives a status color, a daily
   trigger emails a summary. *Teaches: date math, time-driven triggers.*
6. **Public swap-meet listing** (from hmun3dE--vA) — anyone browses without login; adding an item needs an
   account, which starts "pending" until approved. *Teaches: public read vs. authenticated write, approval gates.*
7. **Class quiz lookup** (from R2Zkfnkq1fg) — a public, no-login score lookup by ID alongside a teacher-scoped
   edit view and full admin. *Teaches: three real access tiers in one app; computed grade from raw scores.*

## Traps a kid will hit
Forgetting "New deployment" (not just Save) after a code change — every video glossing over this is itself the
trap. Time-driven triggers must be created/enabled separately from the code (9l7iFYy5dgk). External API calls
need `UrlFetchApp` and can fail with no fallback shown anywhere in the batch (1E12PkCcurA). Camera/scanner access
inside HtmlService (KFaJgIKDjZc, [00:06:43]) is unverifiable as reliable and directly contradicts CONTEXT.md's
webcam caveat — do not promise it works; stick to image upload during the year. A workflow with several roles
multiplies "who can do what from which state" fast — sketch the state table on paper first. Auto-incrementing IDs
by counting rows (HtcmWnotK9E) breaks once rows are deleted.

## What to cut
Currency conversion/multi-currency, payroll/HR vocabulary, restaurant/POS framing, freelancer invoicing, license/
subscription billing — none map to a 14-year-old's world; keep only the underlying mechanics named above.
