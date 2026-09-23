# Google Apps Script | Project Management System Dashboard with Task Reminders (Mohammad Rameez Imdad, 13.3 min)

**What it is:** demo/promo, an earlier/alternate version of the same project-management template as DtjtaCjnSU4 (no queue system here, but stronger on email notifications and multi-currency reporting). Click-through only, no code shown.
**Substance:** thin-to-mixed — largely overlaps with DtjtaCjnSU4 from the same channel; its most distinct content is the "due today" concept and a clearer look at email-on-status-change.

## Ideas, in the video's order
- [0:02:15] "Today's projects" and "due today" are computed by comparing a stored due-date field against the current date, surfaced as dashboard call-outs — same "derive a view from date math" idea as other batch videos, applied to a due-date instead of an expiry date.
- [0:03:23] Creating a project sends an **email to the client automatically** — same-day, at creation time, not on a schedule — reinforcing the "event-triggered notification" idea (contrast with 9l7iFYy5dgk's scheduled version).
- [0:04:30] A per-project toggle decides whether that specific record triggers emails — matches the per-record notification preference seen in DtjtaCjnSU4, confirming it's a repeated design choice across this template family.
- [0:06:08]–[0:07:17] Marking a project "in progress" or "completed" **also sends an email**, and the dashboard's "due today" counter visibly decrements in the same action — one write driving two visible effects (an email side-effect and a UI counter update) is a good concrete "one action, multiple consequences" example.
- [0:07:51] Multiple currencies tracked **simultaneously** across different projects, each summed separately in the revenue chart (USD/PKR/INR/BDT shown side-by-side, not converted into one) — different from whyc4LNa0bY's single global currency; here the app deliberately keeps amounts in their original currency rather than converting, which is actually the simpler and more honest approach for a class to imitate (skip currency conversion entirely).
- [0:08:56]–[0:09:28] Assigning a project to a specific user by matching a phone number field, then logging in as that user, shows a portal scoped to only their own projects — same ownership-scoping pattern repeated a third time in the batch.
- [0:10:00]–[0:10:32] An **auto-refresh** toggle with a configurable interval, plus a manual refresh button — the video's one explicit acknowledgment that the UI does not automatically know about server-side changes and must actively re-fetch (polling), a genuinely useful concept to name for kids.
- [0:12:13] Editing a due date sends an email whose body includes a specific "delay reason," defaulting to "schedule adjustment" if left blank — a small example of a default value filled in server-side when the user leaves a field empty.

## What the frames add
No Sheet structure or code is shown in this video's frames — like several others in the batch, it's UI-only. The frames do usefully show the **real Gmail inbox** receiving these notification emails at multiple points (1:10, 5:30, 9:30, 12:10), confirming the emails are genuinely sent, not just claimed.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Polling/manual refresh as an explicit, named alternative to real-time updates (the app does not push changes to the browser; it must be asked); event-triggered emails on both creation and status-change; tracking amounts in original currency rather than converting (a simplification worth copying); default values filled in server-side when a field is left blank.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
The **auto-refresh / manual-refresh toggle** is an excellent, small, concrete milestone for teaching "the browser doesn't know about a change on the server until it asks again" — have kids add a refresh button first, then a `setInterval` auto-refresh, to any existing project (e.g. their class poll or expense tracker). "Due today" style dashboard call-outs (comparing a stored date to today) are a good second use of the date-math idea already introduced via other videos in this batch, reinforcing rather than introducing a new concept.

### Traps a kid will hit
Auto-refresh on a timer will hit Apps Script's per-user or per-script quotas if the interval is too short or too many students run it during a live class — a real, concrete trap this video doesn't warn about at all. Sending an email on every status change (not just once) can flood an inbox if a kid clicks a button repeatedly while testing — worth explicit discussion of "should this really re-send every time?"

### Doesn't transfer, and why
Multi-currency revenue charts and freelancer-client billing language don't map to teen projects; keep only the underlying mechanics (date math, refresh, event emails).

## Honest caveats
Heavily overlapping content with DtjtaCjnSU4 from the same channel/template family — read that note first to avoid double-crediting ideas. No code shown or explained; no AI-assisted-building content, consistent with the rest of R3.
