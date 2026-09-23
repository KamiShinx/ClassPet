# How to Build a Fleet Management System in Google Sheets | Apps Script Transport Dashboard | E29 (Mohammad Rameez Imdad, 9.9 min)

**What it is:** promo feature-tour demo of a pre-built taxi/transport-fleet dashboard. No code walkthrough, though frames show the raw Sheet and Apps Script editor briefly during a login sequence (not narrated).
**Substance:** thin — mostly click-through, but the **share-with-partner flag** is a clean, reusable access-control idea.

## Ideas, in the video's order
- [0:01:06 - 0:01:38] **Providers** (external partner companies supplying drivers/cars) vs **drivers** owned directly ("individual") — a `provider_id` field on a driver row is either set (foreign key to a provider) or blank (owned in-house). Same table, optional relationship — a real "nullable foreign key" pattern, useful vocabulary even if the video never uses that term.
- [0:01:38] A boolean **"shared with partner"** flag on each row controls whether a second class of logged-in user (a "partner", i.e. another business/city) can see that row at all — [0:08:44-0:09:21] confirms: partner login only sees rows flagged shared=true, and only has view rights on providers, edit rights on drivers. This is the clearest example in the batch of **row-level visibility controlled by a simple flag plus role**, worth reusing directly.
- [0:03:53 - 0:05:31] A "service" (a trip) computes **profit = client price − cost price** (cost is either provider price or driver price depending on which was used) — derived field from two other fields, and the two fields it derives from depend on a third field's value (provider-car vs driver-car) — a small conditional-calculation example.
- [0:04:58] Marking a service "completed" separately tracks **whether the provider was paid** and **whether the driver was paid** as two independent booleans on the same row — status isn't always one field; sometimes you need several independent yes/no flags per record.
- [0:06:05] "Daily work" is described explicitly as **temporary/scratch data** (today's running cash/card totals, entered once at day's end) distinct from the permanent services log — a deliberate separation between a durable table and a throwaway daily entry, worth naming for kids ("not everything needs to be permanent").
- [0:09:53] Explicit mobile-responsive design called out as a selling point across "all our applications."

## What the frames add
Frame 4 (sheet_004, ~08:00-09:50) shows something the transcript doesn't narrate: a **login screen**, then the **raw Google Sheet** with columns visible (email, password [plaintext-looking], role, driverId...) for about 10 seconds, then the **Apps Script code editor** with real (unexplained) code, then a split-screen mobile-responsive check with code visible alongside the rendered UI. This is a useful visual for class — "here is literally what the Users sheet looks like as the login table" — but also a red flag worth pointing out: the password column reads as plain text in the sheet, not a hash. Worth using as a live "why don't we store real passwords like this" discussion prompt.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Optional foreign key (driver may or may not belong to a provider) — a real, simple relational idea.
- Row-level visibility via a boolean flag + role check — directly maps to "if row.shared and user.role=='partner': show it."
- Conditional derived fields (profit depends on which cost source was used).
- Durable log table vs. scratch/temporary entry — a genuinely useful modeling distinction for a first backend course.

### Becomes something kids do (activity, mini-project, milestone)
- A **"share my note with a friend" toggle** on a class notes/journal app: each entry has a `shared` boolean, and a friend's login only ever sees entries flagged shared — directly reuses the partner-visibility pattern at a scale a 14-year-old cares about.
- A **field-trip cost splitter**: each expense row picks "who covered it" (a driver-vs-provider style choice) and the app computes each person's share — reuses the conditional-derived-field idea.

### Traps a kid will hit
- Storing passwords as plain readable text in a Sheet (as the frames show) is the single most important trap to flag explicitly to the class before they build any login: anyone who can open the underlying Sheet (a teacher demoing, a classmate with edit access) can read every password. Even a basic scramble/hash step should be taught as non-optional once kids add "accounts."
- Forgetting to check the `shared` flag server-side (and instead hiding rows only in the frontend after fetching everything) leaks data exactly like the payslip-lookup trap in AbFbc615J9M — same lesson, different video, reinforces it's a pattern not a one-off.

### Doesn't transfer, and why
- Taxi/logistics dispatching, driver commissions, and provider partnerships are adult small-business logistics with no teen appeal; keep only the visibility-flag and conditional-field ideas.

## Honest caveats
Standard promo demo; the plaintext-looking password column and the "shared" access-control idea are things we noticed by looking closely at the frames and reasoning about the UI, not things the narrator explains or names as concepts.
