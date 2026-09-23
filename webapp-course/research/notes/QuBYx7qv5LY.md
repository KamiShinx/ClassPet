# How to Build DYNAMIC CRUD Admin Panel with Import/Export | Google Sheets Dashboard (Mohammad Rameez Imdad, 11.9 min)

**What it is:** demo/promo of a schema-driven, multi-database CRUD admin panel template ("MRI SCRIPTS"). Pure UI walkthrough narrated by the seller; no code is written or explained on screen.
**Substance:** mixed-to-thin as a tutorial (nothing is taught), but the *architecture idea it demonstrates* is the most interesting single concept in this whole batch — a genuinely reusable pattern worth translating for class, even though the video itself never explains it in backend terms.

## Ideas, in the video's order
- [0:00:34] Multiple independent "databases" (= extra Sheet tabs) can coexist in one app; each shows up in the sidebar automatically once you create the tab and give it a name — "adding a table" is "adding a sheet tab," no code change.
- [0:01:06] **Schema comes from the sheet itself**: inserting a new column in the Sheet (e.g. "Fee") makes a new field appear in the web UI after a refresh — the video's central, if unstated, idea: the UI is *generated from* the sheet's structure rather than hardcoded per-field.
- [0:01:38]–[0:02:44] Renaming/adding a sheet tab (e.g. "Database 3") makes it appear as a new section in the app with zero code touched.
- [0:03:16] Admin vs user, admin sees everything, user sees only their own rows (recurring pattern across the batch).
- [0:04:22] A separate **Theme** settings tab lets you map a specific cell value (e.g. an email address) to a highlight color, applied live in the table — config-driven UI styling, another instance of "a sheet row that isn't user data, it's app configuration."
- [0:04:55]–[0:06:35] A **Settings** tab defines each field's type (text/email/phone/number/date/dropdown/URL/image-upload), whether it's required, and whether it should get a filter or a chart — this is the "dynamic form" idea made explicit: the Settings sheet is essentially a tiny form-builder schema, and the app reads it to construct the Add/Edit form, the filters, and the chart automatically.
- [0:07:07] Charts (donut/pie) are themselves configured per-field from that Settings sheet, not coded per report.
- [0:08:14] Per-user permissions: each user can be marked read-only and scoped to specific "databases" (sheet tabs) — row-level *and* table-level access control combined.
- [0:10:27] **Duplicate detection** on Add Record (matching name/phone/email) — an explicit example of server-side validation before a write.
- [0:11:02]–[0:11:50] CSV export and import, with a choice on import to "skip duplicates" or "merge/update duplicates" — a real data-sync workflow, not just a toy button.

## What the frames add
This is the batch's best evidence for the "config sheet drives the UI" pattern: [4:55]-[7:50] shows the actual Settings-tab UI with field name / type / dropdown options / required / filter / chart columns laid out as an editable table — you can literally see the schema being edited as data. [8:20]-[9:00] shows the per-user "Allowed Sheets" checkboxes in the Add User dialog — a clean visual for row/table-level permissions. The image-upload field (5:30-6:35) shows a file going to Google Drive and the resulting URL being written back into the sheet cell — useful concrete image-handling reference.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Metadata/schema-driven UI generation (a config table describing fields, read by the app to build forms/filters/charts); per-user, per-table access control; server-side duplicate detection before writing; CSV import/export with conflict resolution (skip vs. merge).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Full dynamic-schema generation is too advanced to build from scratch with a 14-year-old in ~90-minute sessions, but the *idea* is a great teaching moment: "imagine your app read a 'Settings' sheet to decide what fields to show — that's a config table, and it's how real low-code tools like Airtable work." A scoped, buildable milestone: add ONE settings-driven feature to an existing project — e.g. a small "Fields" sheet listing which columns should show a color badge (like the Theme tab here), and have Gemini write the code that reads that sheet to decide the badge color. That's an approachable, real taste of config-driven behavior without a full form-builder.
Duplicate-prevention-on-add and CSV export are both good, scoped milestones for any CRUD project (e.g. class sign-up sheet: block duplicate names/emails; export the roster as CSV).

### Traps a kid will hit
Dynamic/schema-driven code is genuinely hard to reason about — a kid debugging "why doesn't my new column show up" will have two moving parts (the sheet AND the settings-row) instead of one. Import/export with duplicate-merge logic requires careful thinking about what counts as "the same row," a trap even adults get wrong.

### Doesn't transfer, and why
Multi-tenant "unlimited databases" and granular read-only per-table permissions are enterprise admin-panel features with no teen project analogue; skip building this, keep only the "config drives UI" idea as a concept lesson.

## Honest caveats
The video never states or explains the schema-driven mechanism in words — it is entirely our own inference from watching cause (edit the sheet) and effect (UI changes). Take the "how it works" claims here as reasonable speculation, not confirmed fact, since we never see the underlying code. No AI-building content shown (no Gemini/Claude Code/ChatGPT/Antigravity), consistent with the rest of the batch — purely a finished-template sales demo.
