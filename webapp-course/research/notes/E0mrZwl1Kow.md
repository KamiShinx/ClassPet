# Integrate Google Calendar in Web App - Apps Script Web App Tutorial Part 6 (Learn Google Sheets & Excel Spreadsheets, 44.8 min)

**What it is:** step-by-step live-coding tutorial (2019), part 6 of a series. Adds a Materialize date-picker to an
existing form, wires it to a real Google Calendar so already-busy days are disabled.
**Substance:** substantive: real backend logic (CalendarApp read, date math, array dedup) built and debugged live, including two live mistakes and fixes.

## Ideas, in the video's order
- [0:00:36] Motivates the whole video with "seamless integration with Google services" — the reusable idea: Apps Script gives free access to Calendar/Gmail/Drive/etc. from inside a web app (generic but true and worth restating to kids).
- [0:03:34] Every form element needs a stable `id` to be grabbed by JS later — small but foundational habit.
- [0:05:59] Live bug: a stray `<label>` broke the Materialize datepicker init; fixed by trial and error. Good real example that "the AI/tutorial code doesn't always work first try."
- [0:07:07] Docs for the UI library were thin ("not a lot of documentation") — he had to guess at the `disabled` option API (outdated: Materialize-specific, not a general lesson).
- [0:09:25] Debugging technique shown explicitly: `console.log` + browser DevTools console (F12) to see what a callback receives. Directly reusable technique for kids.
- [0:11:48] Comparing two Date objects requires `.valueOf()` (timestamp) because objects are never `==` in JS — a real, non-obvious JS gotcha, explained clearly.
- [0:12:54]-[0:14:38] Builds up disabling multiple dates via an array + `.indexOf()` check — basic array-membership pattern.
- [0:17:26]-[0:19:10] `CalendarApp.getCalendarsByName(...)` — first attempt used the calendar's *display* name and failed; the real key is the calendar's **email address**, not its shown name. Concrete "traps a kid will hit" moment.
- [0:19:44] Getting events needs `getEvents(startDate, endDate)` with real `Date` objects — API shape shown directly on screen.
- [0:22:56]-[0:23:31] Explores an event object live (`getStartTime()`, etc.) instead of memorizing the API — models good "explore the object first" practice for AI-assisted coding.
- [0:26:06]-[0:28:37] Normalizes all times to midnight (`setHours(0,0,0,0)`) before deduping, both to compare correctly and because he didn't want exact meeting times leaking into client-side code (a light but real privacy/security instinct: don't expose more than the UI needs).
- [0:29:14]-[0:31:09] Manual de-duplication via `indexOf` + `push` loop — a bit clunky (a Set or `[...new Set()]` would be simpler) but shows the underlying idea plainly.
- [0:32:14] Runs the calendar-fetching function **on page load** (`DOMContentLoaded` → `google.script.run.withSuccessHandler`) rather than on every keystroke, and explicitly flags the trade-off ("could also run on click, simpler for now") — good example of a designed simplification, not just default.
- [0:38:09]-[0:40:29] Makes the queried date range dynamic ("today" through "one year from today") instead of hardcoded, and disables past dates too.

## What the frames add
Confirms transcript closely: `code.gs`/`page.html`/`page-js.html` three-pane Apps Script IDE throughout, Materialize date-picker widget shown live disabling specific calendar days (23rd/25th, later 24/26/27/30/9), a browser Logs dialog showing calendar objects, and the `getCalendarBusyDays()` function being iteratively built and re-run. No diagrams — pure screen-recording of code + UI; frames mainly confirm what's on screen matches narration, not additive by themselves.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Server-side call to a first-party Google API (`CalendarApp`) from Apps Script — "your backend can read other Google services, not just your own Sheet."
- Client asks server for data on page load via `google.script.run.withSuccessHandler(...)`, server returns an array, client uses it to configure UI (the request/response round trip made concrete).
- Data shaping on the server before sending to the client (stripping exact times, deduping) — an early, natural intro to "don't send the client more than it needs."

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **"Busy day" blocker for a sign-up app**: read a Sheet (or Calendar) of taken slots, disable them in a date/time picker on the client. Teaches: server reads data, shapes it into a simple array, client renders it into UI state. Doable with a plain HTML `<input type=date>` + JS instead of Materialize.
- **Calendar-backed booking form**: kids book study/gaming slots into their own Google Calendar via the app; teaches CalendarApp write (`createEvent`) as the natural next step after this video's read-only demo.

### Traps a kid will hit
- Calendar identity confusion: using the calendar's visible name instead of its ID/email (this video hit it directly at 0:17:26-0:22:23). Gemini-written code will likely make the same mistake; worth pre-flagging.
- Comparing Date objects with `==`/`===` silently fails; needs `.valueOf()` or `.getTime()`. A generic JS trap, but shown very concretely here.
- First-run permission prompts: he has to manually run the function once to trigger the calendar-access authorization dialog — same "authorize the script" flow kids will hit and need to understand isn't an error.
- Running a data-fetch function without an explicit trigger point (page load vs. click) is a design decision each time, not automatic — this is exactly the class of "why did nothing happen" confusion kids get with `google.script.run`.

### Doesn't transfer, and why
- Materialize's `M.Datepicker.init(...)` API specifics — outdated 2019 CSS/JS library, not worth teaching verbatim; the *idea* (init a picker, pass a `disableDayFn`) can be re-taught with any modern date input.
- The manual array de-dup loop is more verbose than needed (`Set` does it in one line) — fine to show the concept but simplify for kids.

## Honest caveats
- This is a real, unscripted build with two live bugs (label breaking init; wrong calendar name) — good faith example of AI/tutorial code not working first try, not padded content.
- Video is long (44.8 min) for what is conceptually a fairly small feature; a lot of runtime is typing/waiting on Apps Script's slow editor and re-deploys, not new ideas. For class use, an 8-10 min excerpt (debugging technique + calendar identity trap + dedup) would carry most of the value.
