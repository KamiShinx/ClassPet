# Automate Your Tasks in 5 Minutes: Apps Script + Gemini for Beginners (Google Workspace Developers, official channel, 2.7 min)

**What it is:** an official, short Google tutorial showing the plainest possible "chat with Gemini, copy code into Apps Script" loop. No promo, no third-party tool — just gemini.google.com and script.google.com. Recent (references current Gemini app, multimodal upload).
**Substance:** substantive despite the short runtime: every step of the actual workflow is shown, nothing skipped or hand-waved, and it's the workflow closest to what our class will actually do.

## Ideas, in the video's order
- [0:00:00] Framing: "automate a task... without writing a single line of code" — the human's job is describing the task, not typing syntax.
- [0:00:00] Starting point is an ordinary Sheet of events the presenter wants pushed into Google Calendar — a plain data-entry table, not a web app.
- [0:00:30] **Gemini is used as a general chat app (gemini.google.com), completely separate from Apps Script** — this is the baseline "no in-editor AI" pattern, unlike Qu0mJj1nLbw's side panel.
- [0:00:30] Gemini is fed a **screenshot** of the Sheet (multimodal input) rather than pasted text/cells — explicitly noted as one option ("you could also copy and paste the table or cells").
- [0:01:00] The prompt given on screen is a full worked example, useful as a reusable template: role ("You are an expert at coding automations using Apps Script"), goal (read this data, do this action), a concrete trigger ("start the automation by clicking a custom menu item named X"), and an explicit ask for "the code for this automation in Apps Script."
- [0:01:00] Gemini's reply includes **both the code and a separate step-by-step guide** for wiring it up — i.e., a two-part answer (code + instructions), which the presenter follows literally.
- [0:01:30] **How code gets into the editor: pure manual copy-paste.** Copy from the chat reply, open (or create) an Apps Script project attached to the Sheet, rename it, paste the whole thing in.
- [0:01:30] Must **refresh the Sheet tab** after pasting/saving before a custom menu item added by the script will appear — a real, easy-to-miss step.
- [0:01:30] Running the new menu item for the first time triggers the **standard OAuth authorization prompt**, explicitly shown as expected/normal, not an error.
- [0:02:00] Verifies success by checking the *actual* Calendar, not just a "success" message in the app — models good practice (verify the real side effect, not just the confirmation text).
- [0:02:00] **How a follow-up feature request is handled**: ask Gemini (same chat) to add a feature (a status-tracking column), Gemini updates the code in the chat, and the human again copies and pastes the whole updated code into the Apps Script IDE — no diff, no partial merge, full-file replace each time.

## What the frames add
Frames closely track the transcript and add: the exact Gemini chat UI showing a *very long single message* (the whole structured prompt pasted as one block) rather than typed live, at [00:00:50-01:00]; the Apps Script editor with a real `.gs` file (function names like `addEventsToCalendar`, use of `SpreadsheetApp` and `CalendarApp`) visible at [00:01:20-01:40]; a custom menu literally reading "Add events to Calendar" in the Sheet's menu bar at [00:01:30]; the real OAuth consent screen ("Event automation wants access to your Google Account") at [00:01:50]; and the resulting events actually placed on a Calendar month view at [00:02:00].

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
The whole video is a clean model of the **describe → generate → paste → authorize → run → verify** loop kids will use for nearly every assignment. It also shows `CalendarApp`/cross-service Apps Script calls (Sheets data driving a different Google service) as a lightweight example of "the backend talks to other systems," and models custom menu items as the simplest possible "UI trigger" before kids build an HtmlService frontend.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**Use this as the literal template for "Assignment 1: your first AI-written Apps Script."** Have kids write a Sheet of some data (their own choosing — reminders, a homework list, birthdays), then have them copy this exact prompt shape into Gemini: role + goal + trigger + "generate Apps Script code." Backend concept taught: **the custom-menu-triggered server function** — the simplest possible "backend does something when I ask it to" before any web app UI exists at all. This is a strong candidate for literally the first exercise of the course, before HtmlService is introduced.

### Traps a kid will hit
- Forgetting to refresh the Sheet after pasting code, then wondering why the menu item isn't there — worth pre-warning explicitly since the video shows it's a required, non-obvious step.
- Full-file copy-paste on every iteration (shown explicitly for the "add tracking" follow-up) means a kid who has since hand-edited the pasted code will silently lose their edits when they paste Gemini's next version over it — this is precisely the "AI nukes working changes" risk Ben flagged, and this video shows it's baked into the *basic, recommended* workflow, not a misuse of it.
- The authorization prompt looks alarming (a bold "wants access to your Google Account" screen) — a kid unfamiliar with OAuth may think something broke; needs normalizing early.

### Doesn't transfer, and why
Nothing here doesn't transfer — this is the cleanest, most representative video in the batch for the plain "no special tools" workflow the class will actually use.

## Honest caveats
Very short (2.7 min) so it only covers one small, successful automation on the first try — no failure/debugging moment is shown (contrast with Qu0mJj1nLbw, where an error and fix are shown live). Treat this as the "happy path" reference and pair it with a debugging-focused video for the fuller picture.
