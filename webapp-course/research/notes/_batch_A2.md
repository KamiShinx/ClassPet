# Batch A2 summary — Learn Google Sheets & Excel Spreadsheets, Parts 6-14 (2019)

9 videos, watched in order, continuing directly from A1's Parts 1-5: one form/spreadsheet app gains Calendar
integration, multi-page views, a hand-built router, autocomplete, validation, iframe-embeddable deployment, tag
input, a live data table, and email confirmation. Because every video reuses prior code, this reads less like 9
lessons and more like one long, honest worked build — including live bugs, dead ends, and self-corrections.

## Strongest ideas for this class
The single most valuable throughline: **the same client/server round trip appears, unchanged, in six of nine
videos** — client fires `google.script.run.withSuccessHandler(callback).serverFunction()`, server reads the
Sheet (or Calendar) and returns data, callback updates the DOM. Calendar (E0mrZwl1Kow), Autocomplete
(GhAmyLukD6o) and Table (rXrOyTBjdjE) are the same lesson with different UI on top. Name this pattern explicitly
and early — once kids can explain it themselves, they can read most Gemini-generated Apps Script code in this
style.

Second throughline, appearing four times (router + render() in 9LHPU0dYyrU, validation in QXTPf25aSOE, table-row
generation in rXrOyTBjdjE): **"hardcode it once, notice it doesn't scale, extract a function or
config-object-plus-loop."** Part 8 (9LHPU0dYyrU) is the best video for this — builds a router from a plain JS
object with zero libraries, live, explaining every line. The most transferable "real software engineering"
moment in the batch; recommend as required viewing regardless of what else makes the cut, alongside Part 10's
validation refactor (same shape).

Part 10 (QXTPf25aSOE) also has the batch's best explanation of *why* a backend matters: client-side validation
stops honest mistakes, not deliberate bypasses; real enforcement needs a server-side check too — maps directly
onto CONTEXT.md's "concepts a 14-year-old must understand" and is usable almost verbatim.

Part 14 (gi_xlZ5K9rs)'s closing recap — form field -> client JS -> server -> template -> email — is the clearest
single "trace one request start to finish" walkthrough in the batch, and pairs well with Part 10 as a two-part
"what is a backend, concretely" mini-lecture.

## Agreement / what to cut
No contradictions; one narrator, one continuous build. Recurring agreement: four videos (Calendar, Autocomplete,
Chips, Email) show the same debugging habit — when unsure of an object/API shape, log it or check the docs
rather than guess. Worth naming as a general AI-era debugging skill.

**Materialize CSS specifics** (date-picker init, autocomplete/chips widgets, table classes, icon swaps) are 2019
library detail with no reason to survive into a Gemini + plain HTML/CSS class — the underlying ideas transfer,
the `M.Whatever.init()` calls don't. Part 12 (chips) is the weakest video: mostly trial-and-error with a niche,
dead widget's API; its one reusable idea (array of objects joined into a string) needs under 5 minutes, not 15.
Live doc-browsing (autocomplete, chips) pads runtime without new concepts past the first time (Calendar).

## Concept explainers worth reusing
- Client vs. server validation: QXTPf25aSOE [0:00:00]-[0:00:34].
- Routing built from a plain object, no library: 9LHPU0dYyrU [0:02:15]-[0:04:26].
- Full request chain recap (form -> client -> server -> template -> email): gi_xlZ5K9rs [0:15:36]-[0:16:44].
- Comparing Date objects needs `.valueOf()`, not `==`: E0mrZwl1Kow [0:11:48].
- Why relative links break inside an Apps Script iframe: U7cO8ZyRCk4 [0:11:25], reinforced in RJtaMJTlRhE
  [0:05:01].

## Project seeds
1. **Poll/RSVP + confirmation email** — write a Sheet row, send a personalized email. Concept: one request, two
   real side effects. (gi_xlZ5K9rs)
2. **Leaderboard/roster table** — read a Sheet tab (skip header), render live as HTML. Concept: reading rows
   back, server->client rendering. Strong milestone per CONTEXT.md. (rXrOyTBjdjE)
3. **"Already booked" scheduler** — disable taken dates/slots from a Sheet or Calendar. Concept: server-side
   filtering before sending data to the client. (E0mrZwl1Kow)
4. **Multi-page mini app** (home + form + about) — `?v=` query routing first, graduate to the hand-built router.
   Concept: `doGet(e)` parameters, routing. (U7cO8ZyRCk4, 9LHPU0dYyrU)
5. **Validated sign-up form** — required fields + one regex field, config-object-driven, plus a real
   server-side reject check. Concept: client vs. server validation. (QXTPf25aSOE)
6. **Searchable suggestion box** — type-ahead from a Sheet column via native `<datalist>`. Concept: reshaping
   Sheet rows into the format a UI needs. (GhAmyLukD6o)
7. **"Publish it" ritual** — embed the finished app in a free Google Site each project cycle for a clean,
   banner-free link. Not a project itself, but a recurring milestone. (RJtaMJTlRhE)
8. **Tagged list (stretch)** — multiple tag-like values per record, joined to a string for storage; use a plain
   "add tag" button, not a chips widget. Concept: array-to-string shaping. (RX9JPEOkf6Q)

## Traps
- **Deployment staleness**: editing code without redeploying leaves the live/embedded app showing old behavior —
  likely the most common "why isn't this working" ticket in the whole course (RJtaMJTlRhE).
- **`getElementById` returns null**: recurs constantly whenever an element is missing its `id` (date picker,
  chips, table body) — worth a standing checklist item.
- **Silent type mismatches**: `sendEmail`'s `htmlBody` needing a string, not an `HtmlOutput` object
  (gi_xlZ5K9rs [0:13:11]) — no error thrown, feature just does nothing. Teach "nothing happened, no error" as a
  wrong-data-type smell; Gemini output is equally susceptible.
- **Variable scope bugs**: declared inside one callback, unreadable from another (RX9JPEOkf6Q [0:07:31]) —
  common for beginners and AI-assisted code alike.
- **Off-by-one range math**: `getLastRow() - 1`, ranges starting at row 2 to skip headers (rXrOyTBjdjE
  [0:20:29]).
- **Iframe navigation gotchas**: relative links and `<base target>` mismatches breaking once embedded
  (U7cO8ZyRCk4, RJtaMJTlRhE).
- **First-run authorization prompts**: any new privileged service (Calendar, Gmail) needs one manual run to
  trigger consent before it can be wired into click handlers (E0mrZwl1Kow, gi_xlZ5K9rs).

## Honest caveats
All nine videos are 2019, unscripted, live-coding, one narrator, one continuous app — transparent about mistakes
(typos, wrong API calls, scope bugs), a real asset for "even experienced people hit bugs," but several run long
relative to idea density (Calendar, Autocomplete, Chips especially). Materialize CSS is pure skin, never required
knowledge. Nothing here covers quotas, concurrency, or CORS/doPost-from-external-frontend (relevant to Ben's
Netlify final-project plan) — those need to come from elsewhere in the corpus.
