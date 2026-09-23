# How to Make Subscription Management Dashboard in Google Sheets + Apps Script (Mohammad Rameez Imdad, 8.9 min)

**What it is:** demo/promo of a software-license/subscription tracker (expiry reminders, revenue reports). Same channel format throughout the batch: click-through, no code shown.
**Substance:** thin — closely overlaps with the batch's other "expiring-thing tracker" video (9l7iFYy5dgk) but without the AI/trigger features; mostly repeats patterns already covered elsewhere in R3.

## Ideas, in the video's order
- [0:01:08] Expiry countdown ("6 days left") drives a manual "send reminder" action to the admin or the client's email — same date-math-driven status idea as other videos, but here the email send is a manual button click, not an automated trigger (contrast with 9l7iFYy5dgk's daily 9am trigger).
- [0:02:50] Bulk delete via checkboxes + a confirm dialog — a small but genuine multi-row operation pattern (select several rows, one destructive action, confirm before committing).
- [0:03:56] "Manage Categories" lets the user add a new dropdown option inline from within the Add form itself (not a separate settings page) — a slightly different UX for the same "config sheet grows from user input" idea seen elsewhere.
- [0:05:03] License duration is picked from fixed options (1 month/6 month/1 year/2 years) and presumably used to compute the expiry date from the start date — implied date arithmetic, not shown explicitly.
- [0:06:44] A currency setting changes formatting **app-wide** from one settings screen — a simple "one setting affects every view" example.
- [0:07:50] Same admin/user split as the rest of the batch: user only sees subscriptions they personally added, not the full list.
- [0:08:23] Login session kept in browser (Chrome) storage so refreshing doesn't log the user out — again, client-side state layered on a stateless backend, same idea flagged in other notes.

## What the frames add
Nothing beyond the UI already described in the transcript — no Sheet structure, no code, and no deployment sequence is shown in this video's frames (unusual for this channel; this particular video skips the setup portion entirely). Say plainly: the frames add nothing not already covered by transcript description or by other videos in this batch.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Manual (button-triggered) reminders vs the automated-trigger version seen elsewhere in the batch — useful to contrast the two approaches directly for kids: "you could check and send it yourself, or you could let the server do it on a timer." Bulk actions over multiple selected rows. A single global setting (currency) affecting formatting everywhere.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Not a strong standalone project idea for teens (subscription/license billing has no teen use case), but its two clean, small mechanics are reusable pieces for any class CRUD project: (1) a bulk "select several + delete/confirm" control, and (2) a global settings row (e.g. class name, theme color) read by every page. Suggest folding these into whichever project a kid is already building rather than building this app itself.

### Traps a kid will hit
Bulk-select-then-act needs to track a list of selected row IDs correctly across re-renders — a common source of "I deleted the wrong thing" bugs for beginners. A single global settings value read on every page load, if not cached, means an extra sheet read per page — worth a small discussion of when to fetch once vs. every time.

### Doesn't transfer, and why
Currency conversion, license/supplier/salesperson fields, and per-subscription profit margins are all adult SaaS-billing bookkeeping with no teen project mapping.

## Honest caveats
This is the thinnest video in the R3 batch: no code, no Sheet screenshots, no deployment walkthrough, almost entirely overlapping content with other videos in the batch under a different label. No AI-assisted-building content shown.
