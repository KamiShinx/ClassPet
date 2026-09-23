# Complete Project Management Dashboard in Google Sheets & Apps Script (Mohammad Rameez Imdad, 9.9 min)

**What it is:** demo/promo, explicitly framed as "the updated version" of an earlier template — a freelancer's client/project tracker with a queue system. Click-through only, no code shown.
**Substance:** mixed — the clearest example in the batch of a **cascading write**: one form submission (add customer) creates a second entity (a user account) automatically, plus a genuinely distinct "queue" concept worth calling out.

## Ideas, in the video's order
- [0:01:05] Adding a customer **automatically creates a linked user account**, using their email as both username and password — one form submission triggers two related writes (a Customers row and a Users row) behind the scenes; a concrete example of "creating one record can cascade into creating another."
- [0:03:22] Logging in as that auto-created customer shows a **portal scoped to their own projects only**, with read-only project stats — same ownership-scoping pattern as the rest of the batch, but notable here because the account itself, not just the data, was server-generated.
- [0:04:29] A project record links a client, a currency, a paid/total amount, dates, and optional external file URLs (Google Doc/Sheet links) — an example of a record referencing outside resources by URL rather than storing the content itself.
- [0:05:37] **Project Queue**: separate from status (pending/in-progress/completed), a project also has a queue *position* relative to other projects — e.g. "you are number 16, meaning 15 projects are ahead of you." This is a distinct ordering concept from a simple status field, worth calling out as its own idea.
- [0:06:46] "Start working" on a queued project updates its status and, implicitly, re-numbers the queue for everyone behind it — a small but real example of one row's state change affecting the *relative order* of other rows, not just its own fields.
- [0:07:55] Completing a project sends an update to both the dashboard (admin side) and the customer's own portal on next refresh — read-your-own-writes across two different logged-in sessions (admin's and the client's), a good concrete way to explain "the same underlying sheet, viewed by two different people, updates for both."
- [0:01:39]–[0:05:37] Multiple currencies are supported per-project (not a single global setting like in whyc4LNa0bY) — worth noting as a variant of the "currency" idea seen elsewhere in the batch.
- Email notifications toggle per-project (yes/no) when creating or updating — a per-record notification preference, not just a global on/off.

## What the frames add
[0:00] shows a glimpse of the channel's own video library (thumbnails for "Employee Shift Scheduling," "App Tracker with Google Sheets," "HTML Form Maker") confirming this is one entry in a large template-selling catalogue, useful context for judging how much to trust any single video as "the" way to build something. No Sheet structure, code, or deployment sequence is shown in this video's frames — entirely UI-only, consistent with a "look how much I added since v1" promotional framing.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Cascading writes (one submission creates a related second record); ownership-scoped portals for an automatically-provisioned account; a queue/ordering concept distinct from status; state on one row implicitly affecting the order of others; per-record (not just global) notification preferences.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A **class "help desk" or "turn queue"** (e.g. sign up for help with a coding problem, see your position in line, teacher marks one "in progress" at a time) is a strong, genuinely fun teen-relevant project built directly from the queue idea here — much more compelling to a 14-year-old than "client project management." The cascading-write idea (one form creates two related rows) is a good, scoped milestone for any project with accounts: "when you sign up, also create your profile row automatically."

### Traps a kid will hit
Auto-generating an account (username/password) from another form is more complex than it looks — kids will need to understand where that account's credentials come from and how login then checks them, a two-step mental model. A queue that "re-numbers" as items complete needs either a stored position that gets recalculated, or a live-computed position from filtering/sorting — a subtlety that could easily be gotten wrong (hardcoding position at creation time only) and is a good discussion point.

### Doesn't transfer, and why
Multi-currency, tax percentage, and freelancer invoicing language don't map to a teen project; keep only the underlying queue and cascading-write mechanics, not the business framing.

## Honest caveats
No code, formulas, or Sheet screenshots are shown; all backend concepts above are inferred from observed cause-and-effect in the UI, not confirmed or explained by the narrator. No AI-assisted-building content shown, consistent with the rest of the R3 batch.
