# Build a Gym Management System with Claude Code & Google Sheets (Mohammad Rameez Imdad, 15.3 min)

**What it is:** promotional feature-tour of a paid Google Sheets + Apps Script "Gym Membership Management System"
template, with a short closing segment (~[0:13:53]-[0:15:10]) framed as "how to build this with Claude." It is a
sales demo/funnel, not a build log, despite the title naming Claude Code.
**Substance:** mixed — the feature tour carries real backend patterns; the "Claude Code" segment promised by the
title is thin and does not show any actual AI-building.

## Ideas, in the video's order
- [0:00:04]-[0:00:22] Role system: owner/manager/trainer/receptionist/member, each row a checkbox grid of
  permissions; live demo of toggling a single trainer permission (view subscriptions: on, delete members: off).
- [0:00:44] The video explicitly promises: "by the end of this video I will tell you how you will get these
  prompts to make the same application with the help of the cloud [Claude]" — sets up what the ending actually
  delivers (see below).
- [0:01:14] Login again reads straight from a Sheet tab of usernames/passwords in plaintext — same pattern as
  the other video in this batch.
- [0:01:58] Dashboard KPIs: 6-month revenue, active members, subscriptions, check-ins, who's in the gym right now.
- [0:02:23]-[0:02:34] Date-range filters (7/30 day) and a global search across leads/members/plans/payments;
  typing a name jumps straight to that record (UX convenience, not really backend).
- [0:03:24] Leads & Inquiries: a "lead" is a separate pre-customer record from a "member."
- [0:03:44]-[0:04:08] Claims to use "SWR" caching: UI shows cached data instantly, then silently re-fetches from
  the server and updates — a real caching/perceived-performance concept, named explicitly (advanced for this
  class, worth a one-line mention only).
- [0:04:08]-[0:05:35] Converting a lead to a member is one action that creates a member record, a subscription,
  and (implicitly) login credentials in one step, and can carry a partial payment forward as a credit balance —
  a multi-record, multi-sheet write in a single user action.
- [0:07:10]-[0:07:59] CSV bulk-import for plans: download a template, fill it, re-upload; rows already present
  are skipped automatically (idempotent import logic).
- [0:07:59] Creating a subscription first checks the member's history before allowing a new plan — a
  lookup/validation step before a write.
- [0:09:30] "Collect payment" finds the specific outstanding balance and marks it paid, updating the UI live.
- [0:11:52]-[0:12:04] Check-in/out desk logs entry and exit time and computes duration automatically from the two
  timestamps.
- [0:12:44]-[0:13:10] Settings page lets you enable a daily scheduled email (set a time, e.g. 9:00) that reminds
  members before their plan expires — a genuine Apps Script time-driven trigger, named and shown as a toggle.
- [0:13:31]-[0:13:50] A static "Formulas & Business Logic" reference page is shown — plain-text descriptions of
  what fields like outstanding balance or expiry mean. This documents the logic in prose; it is not code.
- [0:13:53]-[0:14:20] Shows installing "Claude Code for VS Code" from the VS Code extensions marketplace — no
  further setup or use of the extension is shown.
- [0:14:30]-[0:14:50] Logs into a Google account, then into the creator's own paid "membership portal."
- [0:14:53] The portal lists a per-project locked prompt file (Venue Booking, Wallet, ISP Billing, Clinic, Gym,
  etc.), each behind a "View Video Prompts" button.
- [0:15:03] Opens one large wall-of-text "Prompt 1," says to copy it into Claude Code, and the video ends there —
  nothing is typed into Claude on screen, no generation, no error, no fix, no resulting code or app is ever shown.

## What the frames add
Sheets 001-005 are pure screen-recordings of the finished gym dashboard — same pattern as the other video in
this batch: tables, KPI cards, modals, a Kanban-style class-booking board, a role/permission matrix, a theme
picker. No code and no AI tool appear anywhere in that stretch. Sheet 006 is the only place anything
"build"-related appears: [0:13:20]-[0:13:50] shows the static formulas/business-logic reference pages (text, not
code); [0:13:50]-[0:14:20] shows the VS Code welcome screen and the Claude Code for VS Code marketplace listing
being installed — an install screen only, no chat, no prompt typed, no output; [0:14:30]-[0:14:40] a Google
account chooser; [0:14:50] the paid "Files with Video Prompts" portal page with locked prompt cards for several
different systems; [0:15:00]-[0:15:10] one long prompt text block titled "Prompt 1" with a copy button, and a
title card reading "Google Sheets + Apps Script + Claude Code = NO CODE." That title card and the portal page
are the clearest visual evidence that this is a paid-prompt sales funnel, not a demonstration of AI-assisted
building.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Role-based permission checks; a lead→member conversion as a multi-record write triggered by one user action;
idempotent CSV import (skip duplicates); a validation/lookup step before a write (check history before allowing
a new subscription); timestamp arithmetic (check-in/check-out duration); an Apps Script time-driven trigger for
scheduled emails, named and shown as a real toggle in Settings.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
1. **Class check-in kiosk**: a form that logs a name/ID and timestamp to a Sheet on "check in," then a second
   button that finds that row and stamps a check-out time and computes minutes spent — a direct, simple version
   of [0:11:52].
2. **Sign-up → confirmed pipeline**: a "waiting list" sheet plus a button that copies a row into a "confirmed"
   sheet with today's date — a scaled-down version of the lead→member conversion at [0:04:08], and a good way to
   teach "moving data between sheets" without the multi-record complexity of the original.
3. **Daily reminder emailer**: use Apps Script's time-driven trigger to email a reminder if something in a sheet
   (e.g. a library "due date" column) is tomorrow — directly mirrors [0:12:44], is realistic scope for a weak
   AI, and teaches `MailApp` + triggers, both genuinely useful for the "hub" project too.
4. **Simple KPI card**: count rows matching a status and display it as a number on the page — mirrors
   [0:01:58], a good first "the backend did real work" milestone.

### Traps a kid will hit
Same plaintext-password-in-a-Sheet anti-pattern as the other video [0:01:14] — flag it, don't copy it. The
lead→member conversion that writes to 2-3 sheets in one click [0:04:08] is a good illustration of exactly the
"AI nukes/forgets" risk CONTEXT.md warns about: a weak/free Gemini asked to build a multi-sheet cascading write
in one prompt is likely to drop a step or desync the sheets, and a kid won't notice unless they check each sheet
by hand. The CSV import's "skip if already present" logic [0:07:10] is the kind of fiddly edge case a weak AI
silently gets wrong. The SWR/caching claim [0:03:44] is real but too advanced to build from scratch at this
level — worth a one-line "this exists" mention, not a project.

### Doesn't transfer, and why
The segment the title promises — "how you will get these prompts to make the same application with the help of
Claude" [0:00:44] — turns out to be: install a VS Code extension, log into a paid portal, and copy a
pre-written mega-prompt [0:13:53]-[0:15:10]. Nothing is typed into Claude, no code is generated on screen, no
error appears, nothing is fixed. There is no real AI-workflow content here to teach from — no example of
iterative prompting, no example of catching or correcting a mistake, which is exactly what this class most needs
to see. This segment should not be presented to students as an example of AI-assisted coding.

## Honest caveats
Whisper transcript is fluent throughout but the speaker's English is non-native and occasionally ungrammatical;
paraphrase generously rather than quoting. Every UI frame across all 6 sheets is a finished-product screen
recording — at no point in 15.3 minutes does an AI chat interface, generated code, a terminal, or an error
message appear, despite "Claude Code" being in the title. Use this video only for the UI/backend patterns listed
above, and as a concrete example (worth naming to Ben) of a channel that markets "built with AI" without showing
any AI building.
