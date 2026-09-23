# Google Sheets JSON data for web pages: Sheet Data with Headings (Laurence Svekis, 20.8 min)

**What it is:** direct continuation of `CtLRDP0jLNc` (same gviz/tq, no-Apps-Script approach), adding: selecting a specific sheet by name, treating the first row as column headers, and button-triggered (not auto-on-load) fetch requests.
**Substance:** substantive, practical follow-on with a real live-debugged error.

## Ideas, in the video's order
- [0:00:00] Recaps: change `output sheet` value to any sheet name, and headers (first row) automatically drive the output structure — demoed on two different sheets with different column counts.
- [0:03:16] Adds a `<button>` with a click listener instead of firing the fetch on page load — a small but useful UX/pattern shift: on-demand requests instead of automatic.
- [0:05:27] `tqx=out:csv` shown as an alternative output format to JSON (comma-separated instead) — useful as "APIs can often return different formats depending on what you ask for," a genuine, transferable API concept (content negotiation, simplified).
- [0:06:34] Selecting a specific sheet via `&sheet=people` query param — reinforces query-params-as-configuration, same idea as `fqQOdkwBr9E`'s category/page params but on a totally different (no-code) endpoint.
- [0:07:38] When the first row has string values, gviz auto-treats them as column headers/labels, changing the response `cols` metadata (label field populated) — directly demoed with before/after.
- [0:09:15] Builds a reusable `makeCell(parent, html, classAdd)` helper function that creates a div, appends it to a parent, adds a class, and returns the element — good small reusable-function pattern worth reusing verbatim in class as "how to avoid repeating `createElement`/`appendChild`/`classList.add` five times."
- [0:11:29] Uses the helper to build a header row and a data-row grid, looping `table.cols` for headers and `table.rows` for data — consistent with the awkward gviz `row.c[i].v` shape noted in the previous video.
- [0:16:58]-[0:19:42] **Live real bug, genuinely instructive**: switching to a raw new sheet throws an error because that sheet has no header row yet — gviz assigns default column ids (A, B, C…) and if a column has a blank top cell after another column got a label, gviz nulls out `v` for the whole column, breaking the header-render code (`data.v is null`). He walks through diagnosing it via console.log of the raw object, then fixes it by ensuring every column that has data also has a non-blank header cell. This is one of the more realistic "here's what actually goes wrong and how you'd debug it" segments across the whole batch.
- [0:20:14] Adds `output.innerHTML = ''` before each new render so repeated button clicks don't just append duplicate rows — a basic but essential "clear before re-render" pattern.

## What the frames add
Frames confirm the header-mismatch bug visually: [0:16:30]-[0:19:00] show the malformed `cols` object in devtools with `label: null` and the console error, directly matching the transcript's debugging narrative — genuinely useful to show kids the *actual* error text they'd see. Earlier frames ([0:09:00]-[0:13:00]) show the incremental table-building code next to its live rendered output, a decent side-by-side reference.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Query parameters selecting *which* resource/sheet to read (a real REST-ish idea, simplified); an API returning different output formats on request (`tqx=out:json/csv`); headers-from-first-row as an implicit schema; defensive UI patterns (clear-before-render, click-triggered fetch instead of auto).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "pick your sheet" mini-dashboard: one HTML page with a dropdown or button per Sheet tab (e.g. per class period, per team) that fetches and renders whichever sheet is selected — teaches query-param-driven selection concretely, and is a natural follow-on to the CtLRDP0jLNc lesson.

### Traps a kid will hit
The "blank header cell breaks everything downstream" bug demonstrated live — very likely to recur when kids build their own sheets casually and leave a header blank; forgetting to clear `output.innerHTML` before re-rendering, causing data to visibly duplicate on repeated clicks; confusing the gviz `label` field (header text) with `id` field (default column letter) when headers are missing.

### Doesn't transfer, and why
Same caveat as `CtLRDP0jLNc`: this is the no-backend, public-sheet, read-only approach — doesn't extend to write operations, private data, or server-side filtering logic. Fine for the "reading" half of the course, not the whole story.

## Honest caveats
Nothing outdated; this is a natural, well-paced continuation lesson. The live bug-fix segment is the standout teaching moment in this video and is worth watching in full rather than summarizing to students secondhand.
