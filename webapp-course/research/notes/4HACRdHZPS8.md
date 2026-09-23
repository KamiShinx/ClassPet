# Google Apps Script how to set Web App HTML Service Parameters: Get URI parameters to use in code (Laurence Svekis, 16.8 min)

**What it is:** Tutorial focused entirely on reading URL query parameters inside doGet and using them to branch logic / pull specific Sheet rows.
**Substance:** substantive: builds progressively from static HTML output to a working "get row N from the sheet via `?row=N`" mini-endpoint, with visible debugging.

## Ideas, in the video's order
- [0:01:39]–[0:02:46] `HtmlService.createHtmlOutputFromFile('index')` serves a real `.html` file (not an inline string) with its own `<style>` and `<script>` tags — normal front-end code runs inside it, confirmed via devtools console.
- [0:05:35]–[0:06:41] Core concept: `e` (the event object passed into `doGet(e)`) holds `e.parameter` (singular values) and `e.parameters` (arrays) — both dumped via `JSON.stringify(e)` to show students exactly what's inside. This is the clearest raw look at the request object in the batch.
- [0:07:51]–[0:08:57] Two ways to read the same query value: `e.parameter.name` (or `e.parameter['name']`) vs `e.parameters.name[0]`. Explains why `parameters` is an array — a URL can repeat the same key multiple times.
- [0:10:38]–[0:11:44] Builds a `?row=N` endpoint: reads the row parameter, checks it against `data.length` (bounds-checking), and returns either the row's content or "Row was not available."
- [0:15:06]–[0:15:38] Live off-by-one bug: row 12 in the UI mapped to `data[12]` returning `undefined` because arrays are 0-indexed — has to subtract 1. Directly useful, realistic index-math trap.
- [0:16:11] Fixes the bounds check itself (`<` vs `<=`) after the off-by-one fix — shows iterative debugging, not perfect-on-first-try code.

## What the frames add
Frames at [0:06:00]-[0:07:00] show the literal JSON dump of the `e` object in-browser (`{"parameter":{"id":"100"},...}`), which is the single best visual in the batch for demystifying "what does the browser actually send the server." Frames at [0:13:00]-[0:16:00] show the row-lookup app live, including the "Row was not available" error state and the correct row-12 output — good before/after/error-state trio for a lesson.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Query parameters are how a GET request carries data without a form — `?id=100&name=Laurence`.
- Bounds-checking / validating input before using it (row parameter vs sheet length) — a real, minimal example of "never trust the client's input," relevant for backend safety even at a beginner level.
- 0-indexed arrays vs 1-indexed human row numbers — small but common cross-language gotcha.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
"Row lookup game": each kid puts trivia questions/answers in a Sheet, then builds `?row=N` (or `?id=...`) to fetch one row at a time — a natural stepping stone toward a quiz app, and it makes "the URL is an API call" completely concrete for a 14-year-old (they can literally type different URLs and see different answers).

### Traps a kid will hit
- Off-by-one row/index errors (the video hits this itself).
- Confusing `e.parameter` (single value) with `e.parameters` (array) — easy to mix up variable names.
- Forgetting to validate the parameter exists before using it, causing `undefined` errors instead of a friendly message.

### Doesn't transfer, and why
Nothing objectionable — squarely on-topic, current UI, no adult-business framing. The final row-lookup app is single-purpose (a demo, not a full "project"), so treat it as a building block, not a project seed on its own.

## Honest caveats
This video and vdP6sZKp4hU both cover "look up a row from a Sheet," but from opposite ends: this one is about reading the *request* (query parameter) side; vdP6sZKp4hU is about *searching* sheet data server-side. Pair them rather than picking one.
