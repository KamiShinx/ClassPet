# NEW Google Apps Script Web Dashboard Template for ALL Future Projects! | Custom Colors & Dark Mode (Mohammad Rameez Imdad, 8.0 min)

**What it is:** a channel-announcement / thank-you video, not a project demo. The narrator talks directly to the audience about the channel's 3-year history and introduces a shared **UI template** (per-user color theme, profile picture, dark mode, inactive-user lockout) that will be reused across all his future dashboard videos. 2026 (recorded 28 Dec 2025 per narrator, for a 2026 upload).
**Substance:** thin — no architecture beyond what's below; mostly channel promotion and gratitude to viewers.

## Ideas, in the video's order
- [0:01:38] **Per-user color theme** is saved to the backend (a per-user settings row), not just a browser preference — confirmed at [0:03:19] when a second logged-in user has their own independent theme that persists across refresh. Genuinely useful pattern: user preferences as a database field, not local-only state.
- [0:03:19] Session note: a logged-in user "stays logged in for 1 hour" via a cache — an explicit mention of session/cache duration, one of the only times any MRI video names a technical mechanism (cache) rather than just showing behavior.
- [0:04:27] **Profile picture upload** stored per user, requested repeatedly by viewers per the narrator — small, concrete "file upload tied to a user record" feature.
- [0:06:39] **Inactive user lockout**: setting a user's status to inactive immediately blocks their next login attempt ("Account is inactive. Please contact administrator") — demonstrated live, a clean small access-control feature worth reusing as a teaching example (a boolean gate checked at login time).

## What the frames add
Frames are almost all the same near-empty template dashboard (loading skeletons, color pickers). Frame 1 (~00:01:20-00:02:00) shows the **color-customization panel** with a live code editor visible in a background split-pane (code not legible/explained). Nothing new beyond the transcript; frames mostly confirm this is a bare, half-built scaffold rather than a working feature-rich app.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Per-user settings stored server-side (theme, picture) vs. purely client-side preferences — a clean, small illustration of "the backend remembers things about you specifically."
- Session duration / cache mention — the only video in the batch to name a caching mechanism explicitly, even briefly; worth pointing to as evidence that "stay logged in" is implemented with a time-boxed cache, not magic.
- Active/inactive gate checked at login — simple boolean access control.

### Becomes something kids do (activity, mini-project, milestone)
- Add a **"pick your avatar color" setting** to any class app kids build, stored per user in the Sheet and re-applied on next login — a fun, low-effort way to teach "your backend remembers you" without needing a whole new project.
- A **"freeze this account" admin toggle** for a class app (e.g., disable a login without deleting their data) — reuses the inactive-lockout idea and is a realistic, useful feature for a teacher-run app.

### Traps a kid will hit
- If "stay logged in for 1 hour" is implemented with `CacheService`, kids need to understand cache entries expire and are NOT the same as the Sheet data — a common confusion point (cache says logged in, but if the cache expires mid-session, a save can silently fail auth). Worth flagging before kids build any session/cache logic.

### Doesn't transfer, and why
- The video itself isn't a project at all — it's UI-template branding for the channel — so there's no business content to filter out; only the two small mechanisms above are worth extracting.

## Honest caveats
This is the weakest video in the batch for our purposes: no product demo, no code, mostly the creator thanking his audience and previewing a reusable UI template for his own future videos. Flag it honestly as low-value beyond the two small backend mechanisms noted above (per-user settings, session cache, inactive gate).
