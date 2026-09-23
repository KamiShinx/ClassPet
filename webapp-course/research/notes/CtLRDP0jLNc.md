# JSON Data from Google Spreadsheet: Setup and Shares on your Webpage (Laurence Svekis, 23.2 min)

**What it is:** tutorial teaching a DIFFERENT, no-Apps-Script-backend way to get Sheet data into a web page: share the Sheet publicly ("anyone with link") and query it directly via Google's Visualization API (`gviz/tq`) from client-side JS. No `doGet`, no deployment, no server code at all.
**Substance:** substantive, and architecturally important — this is a genuinely different pattern from the `doGet`/`fetch` custom-API videos elsewhere in this batch, worth teaching as an explicit alternative.

## Ideas, in the video's order
- [0:00:00] Frames the promise clearly: edit the sheet, refresh the page, see the update — "live" data with zero deploy step.
- [0:02:40] Sheet sharing: explicitly notes the *old* "Publish to the web" option still exists but is NOT what to use; the new way is Share > "Anyone with the link" (view access) on the spreadsheet itself. Good explicit "here's what changed" note, useful for flagging outdated tutorials elsewhere.
- [0:04:20] Builds the endpoint URL by hand from the spreadsheet's own share URL: `docs.google.com/spreadsheets/d/<ID>/gviz/tq?` — the sheet ID is pulled directly out of the normal edit URL.
- [0:07:04] First naive `fetch()` attempt on that URL throws a **CORS error live on screen** — genuinely useful, rarely-shown moment: shows the actual browser console CORS message and explains "CORS means we don't have access to that endpoint" before fixing it.
- [0:13:07] Fix: append `gviz/tq` visualization-API path + `?tq=` query param — this specific endpoint is built to allow cross-origin reads of public sheets (unlike a raw fetch to a Docs URL), which resolves the CORS error.
- [0:14:43] Critical, must-flag oddity: the raw response text is NOT valid JSON — it's a JS function call wrapper (`google.visualization.Query.setResponse(...)`). He strips it with `data.substring(47).slice(0, -2)` — literally hardcoded magic numbers to chop off the wrapper text before `JSON.parse` works. This is fragile (breaks if Google changes the wrapper text) and should be flagged to students as "this exact trick may need adjusting," not copied blindly.
- [0:16:57] Once parsed, data structure is `json.table.cols` (column metadata: id/label/type) and `json.table.rows`, where each row's cells are under `row.c`, and each cell's value is under `.v` (value) or `.f` (formatted string) — a genuinely different, more awkward JSON shape than a plain array-of-arrays, worth calling out explicitly as "Google's own quirky format," not a general JSON pattern to memorize.
- [0:20:50]-[0:22:00] Builds the output with `document.createElement('div')` + `classList.add` + inline styles (`display:inline-block; width:25%; text-align:center`) to fake a table/grid layout with plain divs — reasonable trick but low-effort CSS.

## What the frames add
The live CORS error in devtools console at [0:12:36] is worth reusing directly as a teaching image — a real console error a kid will actually see. Frames from [0:14:00]-[0:19:45] show the messy raw response text next to the cleaned-up parsed object, good side-by-side for explaining "why do we need to strip characters off this string." Final output frames ([0:22:00]-[0:23:00]) show plain numeric data laid out in a simple inline-block grid — visually thin, nothing fancy.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
A genuinely different "what is an API" example: a Google-hosted endpoint (gviz) that already exists and requires no backend code at all, only correct sharing permissions — good contrast against the custom `doGet` endpoints elsewhere in this batch, teaches that "an API" doesn't always mean code you write. Also a real, live demonstration of a CORS error and what causes it (cross-origin restriction, and how a properly CORS-enabled endpoint resolves it).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
A "zero-deploy dashboard": share a Sheet publicly and read it straight from a plain HTML page hosted (eventually) on Netlify, no Apps Script backend involved — good as a fast, low-setup week-1 demo of "your spreadsheet can already be an API," before the class ever writes `doGet`. Useful contrast lesson: show this AND the custom-API videos, then ask "why would you want your own `doGet` instead of this?" (answer: filtering/pagination/write-access/hiding data, all things gviz can't do).

### Traps a kid will hit
The CORS error itself (expect kids to hit this if they try a plain fetch to a Docs URL without the gviz path); the magic-number string stripping breaking silently if Google ever changes the wrapper format; forgetting to change sheet sharing to "Anyone with the link" (view) — without it, the endpoint returns nothing usable; the awkward `row.c[i].v` nested object shape being confusing compared to the plain arrays kids will have seen in the custom-API videos.

### Doesn't transfer, and why
This approach is read-only and requires the sheet to be shared publicly (view access) — not suitable once a project needs writes, privacy, filtering logic, or pagination; those need the custom Apps Script `doGet` approach instead (see `8YhwarXcPeU`/`fqQOdkwBr9E` in this batch).

## Honest caveats
The substring/slice(47, -2) hack is fragile and Ben should have Gemini write something a little more robust (e.g. regex-strip the wrapper) rather than teaching kids the exact magic numbers. Otherwise current and working as of this recording.
