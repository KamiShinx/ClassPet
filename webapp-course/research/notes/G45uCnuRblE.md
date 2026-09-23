# Vibe Coding Just Got FREE: This AI Builds Full Apps AND Dashboards From One Prompt (Google Sheets) (Mohammad Rameez Imdad, 10.3 min)

**What it is:** demo of a third-party, proprietary "AI App Builder" SaaS tool (not raw Gemini/Claude + Apps Script) that turns a one-line prompt into a Google-Sheets-backed schema, CRUD UI, dashboard, and automations. Uses the user's own free Gemini or OpenAI API key under the hood. No hand-written code is ever shown — the builder generates everything internally.
**Substance:** mixed: the schema-design-then-approve workflow is a genuinely good pattern to borrow conceptually, but the tool itself is not something the class can use (it's a paid/freemium closed product, not Gemini prompting Apps Script directly).

## Ideas, in the video's order
- [0:00:00] One prompt ("build a gym membership management app") produces a full relational schema (members, plans, staff, classes, sessions, bookings, payments) shown as an editable table list plus a relationship diagram — a strong visual of "the AI designs your database first," worth showing kids even if they won't use this exact tool.
- [0:01:07] **"Approve and apply" gate**: the AI's proposed schema is NOT written to the real Google Sheet until the human explicitly approves it — the single best safety habit in this entire batch, directly answering CONTEXT.md's ask for "checking a change before accepting it." Worth calling out by name in class as the pattern to imitate every time Gemini proposes a big change.
- [0:02:11] "Refine with AI": instead of manually adding columns, you describe what you need in plain language and the tool converts it into more columns — a small model of prompt-refinement loop.
- [0:03:52] "Seed sample data" — AI generates fake demo rows on request, useful pattern for testing without real data (a good practice to teach: fill in fake rows before building real features so the screen isn't empty and confusing).
- [0:06:34] Drag-and-drop dashboard widgets bound to live sheet data (KPI cards, bar/pie/line charts) — same "charts from data" concept the class will eventually want, just via a GUI instead of Gemini-written chart code.
- [0:07:06] "Reset and rebuild" — a one-click nuke-and-recreate-all-sheets option, explicitly destructive and explicitly named as such ("all the sheets... will be deleted automatically") — a good real example of "the AI can destroy your whole project with one click," matching CONTEXT.md's warning almost exactly, even though here it's a deliberate reset feature rather than an accidental nuke.
- [0:08:11] Settings has separate "AI API Keys" fields for Gemini and OpenAI, entered once and reused across the whole app.
- Generic: template gallery (CRM, inventory, library, task tracker, POS, clinic, school) — mostly adult-business templates, only "task tracker" and "event manager" have any teen-project resonance.

## What the frames add
Frames confirm the "Doing the magic" loading spinner appears before every AI action (schema generation, refine, automations) — a visible, honest "this takes a few seconds, please wait" state, good UX to point out. [0:00:40]-[0:01:00] show the schema/relationship-diagram view clearly. [0:07:10]-[0:07:40] show the reset confirmation dialog. Settings/API-key screens confirm the free-tier framing (no payment required for a basic Gemini key).

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Schema design as a first, separate step from building the UI; an explicit human-approval gate before AI writes to the real data; seeding fake data for testing; destructive "reset" operations named and confirmed.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Teach the "approve and apply" habit directly: before letting Gemini's code changes take effect (e.g. copy-pasting into the Apps Script editor), have kids describe out loud (or in a shared doc) what change they expect, then compare it to what actually happened — a low-tech imitation of this tool's approval gate.

### Traps a kid will hit
None directly (kids aren't using this tool), but the "reset and rebuild" feature is a vivid, filmable example to show the class of exactly the kind of one-click data-nuking CONTEXT.md warns about — good as a cautionary screenshot even from a tool they won't touch.

### Doesn't transfer, and why
The tool itself is a closed, proprietary product distinct from Gemini+Apps Script — the class cannot use it, and it hides the actual generated code entirely, so it teaches nothing about reading or debugging AI-written Apps Script.

## Honest caveats
Promotional in tone throughout ("does everything for you," "you don't need to hire any developer"); the AI's schema-generation quality is never stress-tested on screen (no failure, no bad output shown) — treat the smooth demo as best-case, not representative.
