# Build a Real Estate CRM System – Leads, Deals, Invoices & ChatGPT | Apps Script (Mohammad Rameez Imdad, 13.9 min)

**What it is:** a promo/demo walkthrough of a finished, paid Apps Script + Sheets CRM template, filmed 2024-2025-ish (dark-mode SaaS UI, no dated APIs visible). Not a build log. Ends with a pitch to hire the channel for custom projects and to buy VIP membership for the source code.
**Substance:** thin — the entire 13:55 is a narrated click-through of a finished dashboard's features (add property, add lead, kanban, print an agreement...). No code is written on screen, no AI prompt is typed, no bug appears. Despite "ChatGPT" in the title, ChatGPT is a feature *inside* the finished product (an end-user chat widget that queries the Sheet), not the tool used to build it — the video never claims otherwise but the title implies an AI-build story that isn't there.

## Ideas, in the video's order
- [0:00:00] Pitch framing: one dashboard to manage properties, leads, appointments (generic marketing language).
- [0:00:10] Three roles (admin/manager/agent) with a **permission matrix**: a grid of checkboxes per role x page x action (view/add/edit/delete). Admin toggles a checkbox and the change applies live.
- [0:00:57] "AI chat assistant": user types a natural-language question ("summarize this month's deals and commissions"); the backend reads the Google Sheet and the assistant answers with numbers pulled from it. Explicitly stated: "we are using Google Sheets as a database for our web application."
- [0:01:23] Theme/dark-mode color picker (generic, cosmetic).
- [0:02:13] Add-property form: two paths — single manual entry, or **bulk CSV import**.
- [0:03:32] Import logic described in words: download a CSV template, fill it, re-upload; the import "checks if the data is already available in your Google Sheet" and skips existing rows, only adding new ones (idempotent/dedupe-on-import behaviour, described not shown in code).
- [0:03:05] "360 view" pattern: one modal aggregating everything related to one record (an owner's profile, properties, deals) — a reusable UI idea more than a backend concept.
- [0:04:44] Browser-generated PDF for a property brochure (server-side or client-side PDF generation, not explained).
- [0:07:24] Claims the dashboard "is working fast" because it uses "SWR technology, state while revalidate." This is very likely a marketing misuse of a real term (SWR is a client-side React caching library/pattern) bolted onto an Apps Script backend claim — flagged as a dubious/inflated technical claim, not something to repeat in class.
- [0:11:01] **Round-robin auto-assignment**: a new lead is automatically assigned to whichever agent is least busy — a concrete, explainable load-balancing rule (generic idea, well-illustrated).
- [0:11:39] Settings page stores agency-wide constants (commission %, agent share, renewal increment) — a "config row in a sheet" pattern.
- [0:11:39] Optional OpenAI API key entered in Settings to enable the AI assistant; explicitly optional — "if you don't want to use the AI assistant... it will work without that."
- [0:12:25] Global search across all sheets/sections ("360 search").
- [0:12:25] Activity log (audit trail of actions) and a **Trash/soft-delete section** — deleted records are recoverable, not hard-deleted.
- [0:12:50] "About App" page documents the formulas/business logic used (seen in frames, not narrated in detail).
- [0:13:15] Sales pitch: more templates, "VIP membership" to get source code, contact for custom builds.

## What the frames add
Mostly confirm the transcript's feature tour (forms, kanban, modals) — nothing that needs separate description. Two frames carry real information:
- [0:01:00] (sheet_001, frame 6) a raw Google Sheet grid is briefly visible behind the AI assistant chat — concrete visual confirmation that the "database" is an actual Sheet with rows/columns, not a mock.
- [0:12:50]-[0:13:00] (sheet_005/006) an "About App" static page titled "Formulas & Business Logic" lists named formulas in a table, followed by a "Data Storage" panel showing demo login credentials (admin / agent1 usernames+passwords) and a developer contact card. This is documentation, not code — useful only as an example of *documenting an app's rules in-app*.
No code editor, Apps Script IDE, or AI chat interface generating code appears anywhere in the video.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Google Sheets explicitly used and named as "the database" for a web app [0:00:57] — matches our stack exactly, good for the "what is a database" talk.
- Role-based permission matrix (who can view/add/edit/delete per section) [0:00:10].
- Config values stored as rows in a settings sheet, read by the app [0:11:39].
- Soft delete / trash instead of permanent delete [0:12:25] (generic, but a clean idea to reuse).
- Auto-assignment / simple load-balancing rule [0:11:01] (generic).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **"Soft delete" milestone**: add a `status` column (active/trashed) instead of deleting rows, plus a "trash" view that lists trashed rows and can restore them — teaches that a database rarely truly deletes data, and is a one-sitting add-on to any existing sheet-backed app.
- **Permission-lite milestone**: two roles only (e.g. "teacher" vs "student") controlling which buttons render/which server functions are callable — simplified version of [0:00:10]'s matrix, scoped to one boolean per role rather than a full grid.
- **Config-row milestone**: move a hard-coded number in a kid's app (e.g. points-per-answer in a quiz app) into a "Settings" sheet row the app reads at runtime — small, concrete, teaches config vs code.

### Traps a kid will hit
- None of this video's traps are shown on screen (no build process at all), so nothing here is drawn from evidence — only generic extrapolation: an import that "skips if already present" [0:03:32] requires checking every existing row before writing, which on Apps Script means looping over `getValues()` — a kid's naive version will be slow or wrong on first try. Flagged as our own extrapolation, not something the video demonstrates.

### Doesn't transfer, and why
- Multi-entity enterprise domain (properties, owners, leads, deals, tenants, agreements, invoices) is far beyond a 14-year-old's project scope and interest.
- OpenAI API key entered by the end user [0:11:39] directly conflicts with our course rule (no API keys, no calling AI APIs from the kids' apps).
- WhatsApp redirect links, printable legal agreements/PDF generation, and multi-branch business reporting are adult-business features with no teen-project analog.

## Honest caveats
- This is a sales video for a paid template/service, ending in a membership pitch [0:13:15]-[0:13:35] — treat every claim ("working fast," "AI assistant") as marketing copy, not a verified engineering claim.
- No AI-assisted build process is shown anywhere despite "ChatGPT" in the title — the AI is a finished, optional, end-user-facing chat feature over the Sheet data, requiring the user's own OpenAI key. There is no instance of the AI writing code, breaking code, or being corrected in this video, so nothing here supports or contradicts the "weak, forgetful AI" concern — it simply isn't tested by this video.
- The "SWR technology" performance claim [0:07:24] is dubious and should not be repeated as fact.
