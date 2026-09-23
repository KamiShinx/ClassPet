# Automation with Google Apps Script Triggers: Simple Triggers automation and more (Laurence Svekis, 12.9 min)

**What it is:** Tutorial on Apps Script's automatic triggers (onOpen, onEdit, time-driven), entirely about spreadsheet automation — not about web apps, doGet, or doPost.
**Substance:** substantive on its own topic, but that topic is automation/triggers, not "what is a backend" in the request/response sense this batch is meant to cover.

## Ideas, in the video's order
- [0:00:32] Names the two trigger families: "simple triggers" (built-in, like onOpen) and "installable triggers" (created via code, more flexible, can run on standalone scripts too).
- [0:02:44] Explicitly connects this to web apps: "we did see within the web applications that we can use doGet and doPost... there's another one contained within the sheets... this is the onOpen." Useful framing sentence for class: doGet/doPost run "when a URL is visited," while onOpen/onEdit run "when this specific spreadsheet is opened/edited" — different trigger *sources* for the same underlying idea ("code that runs automatically").
- [0:03:16]–[0:04:20] Builds a custom menu via `SpreadsheetApp.getUi()` that appears in the Sheet's toolbar whenever it's opened — a nice non-web-app way to give a Sheet its own mini "app" feel.
- [0:05:27] `onEdit(e)` receives an event object describing exactly what changed (user, range, old/new value) — logged via `JSON.stringify(e)`. Directly parallels the `doGet(e)`/request-parameters pattern taught elsewhere in the batch: "the event object tells you what happened."
- [0:06:31]–[0:08:10] Installable trigger example: `log_me()` opens a spreadsheet by id, appends a row with `Math.random()`, runnable standalone (not bound to the open Sheet) — the code itself doesn't need to be attached to the specific Sheet it's automating.
- [0:08:42]–[0:09:48] Sets up a **time-driven** trigger through the UI (every hour / every N hours / every minute / specific date-time) — directly analogous to a cron job, explicitly compared to one on screen. Also covers email notification options on trigger failure (immediately/hourly/daily/weekly).
- [0:11:25]–[0:12:30] Same time-driven trigger created via code instead of the UI: `ScriptApp.newTrigger('logMe').timeBased().everyHours(4).create()` — must be run once to register, after which it persists even with the editor closed.

## What the frames add
[0:00:45] shows the "Edit Trigger" dialog UI (choose function, failure notification settings, "which runs at deployment," event source, time-driven) — a full screenshot of a dialog kids will actually use if they set up automation, worth keeping as reference. [0:08:00]-[0:10:45] step through the entire "Add Trigger" flow (event source dropdown showing spreadsheet/calendar/time-driven options; interval pickers for hour/minute/day/week/month) — genuinely useful as a labeled walkthrough since the UI has several nested dropdowns a first-timer could get lost in.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Server-side code can run without any user visiting a URL at all — contrasts usefully with doGet/doPost, which only run on request. Good for the "what is a backend, really" conversation: a backend isn't only "answers requests," it can also "does things on its own schedule."
- The event object pattern (`onEdit(e)` carrying who/what/when) is structurally the same idea as `doGet(e)` carrying request parameters — worth explicitly bridging the two in class so triggers don't feel like an unrelated topic.
- Quotas/limits exist on trigger failures and execution — the failure-notification settings hint at this, though the video doesn't discuss Apps Script's daily execution-time quotas directly.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "daily class announcement" or "auto-reset the leaderboard sheet every Monday" trigger — small, satisfying, and demonstrates code running without anyone opening anything. Good for the "hub" idea (e.g. a nightly job that recomputes stats). Not a web-app project per se, more a nice extension once a Sheet-based project already exists.

### Traps a kid will hit
- Forgetting that installable triggers, once created, keep running in the background even after closing the editor — kids may create duplicate triggers by re-running "create the trigger" code multiple times, and need to know to check/delete old ones in the Triggers panel (shown at [0:09:48]).
- Time-driven triggers are approximate ("might be slightly randomized... depends on Google servers"), not exact-to-the-minute — a kid expecting a trigger at exactly 3:00pm will be confused.
- First-run permission prompt again (shown at [0:07:35]) for any trigger touching a Sheet.

### Doesn't transfer, and why
Per the brief's instruction to flag when a video has little to do with web apps: this one is honestly automation/Sheets scripting, not a request-driven backend lesson. It's still solid and relevant to the class (Ben wants Apps Script + Sheets fluency generally), but should not be presented as "how a backend works" — it's a different, complementary mechanism. Worth including in the course as a distinct topic ("automation") rather than folding it into the doGet/doPost/API lessons.

## Honest caveats
No JSON, ContentService, or client-facing web app anywhere in this video. If the goal is strictly "what a backend/API is," this video is the least central in the batch; it earns its place only as a secondary, clearly-labeled topic (scheduled/event-driven code vs request-driven code).
