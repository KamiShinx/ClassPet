# Apps Script Custom API from Google Sheets data 3: Endpoint Custom Data Pages (Laurence Svekis, 19.2 min)

**What it is:** direct continuation of `8YhwarXcPeU` (same "Jokes API" project) — part 3 of the series, adding category filtering and pagination to the custom JSON endpoint.
**Substance:** substantive: real, incremental engineering with live debugging, not just a demo.

## Ideas, in the video's order
- [0:00:02] Goal stated up front: filter the endpoint's response by a `category` query param and a `page` query param, chunking results server-side rather than sending everything every time.
- [0:02:40] `e.parameter['cat']` read inside `doGet(e)` for the first time in this series — this is the payoff of the unused `e` argument from part 1. Explicit pattern: "if no cat parameter, return null" (no filter applied).
- [0:03:50] Realistic live debugging: running the function without setting up fake `e.parameter` values first throws "cannot read parameters" — a genuine, reusable trap demo (testing a `doGet` function that expects request data, outside of an actual request).
- [0:05:01] Uses `Array.prototype.splice(start, count)` to chunk the filtered data into a page. Start point computed as `(page - 1) * perPage` — he initially gets an off-by-one bug (starts on the wrong row) and fixes it live at [0:07:47], a good "even the teacher gets this wrong" moment.
- [0:08:20] Adds defensive parsing: convert the page param to a Number, and if `isNaN`, default to page 1. Direct, concrete example of "never trust an incoming parameter."
- [0:10:35] Emphasizes explicitly: "every time you make updates you need to do the redeployment... you cannot connect to the developer URL [from outside], only the executable" — testing happens on the `/dev` URL while logged in, but the public, sharable URL is only the `/exec` one from a real deployment.
- [0:11:12] Computes `totalPages = Math.ceil(data.length / perPage)` and includes it in the response object — teaches that a real API tells the client how much data exists, not just the current slice (pagination metadata).
- [0:14:03] Adds a second endpoint action inside the same `doGet` — `getCats()` — returning the list of available categories, and hits a classic bug: nested arrays from `getValues()` need flattening with a manual `forEach`+`push` loop before they're usable as a simple array.
- [0:16:59] Final response shape bundles everything a front end would need: current page, category, filtered data, total pages, and the category list — a good example of designing a response payload around what the client actually needs, not just dumping raw sheet rows.
- [0:18:36] Explicitly reiterates that every logic change requires a *new* deployment (not just saving) to be visible outside dev mode — repeats and reinforces the same lesson from part 1, which suggests it's a real recurring trap for beginners.

## What the frames add
Frames show the console/execution log outputs at each debugging step ([0:03:30]-[0:04:00], [0:07:30]-[0:08:30]) — genuinely useful to see the actual error messages and log output a kid would see, not just hear about them. The "Test deployments" dialog and the final deployed JSON response with categories/pagination ([0:09:30]-[0:17:45]) confirm the end state clearly. Frame at [0:15:45] shows the full JSON response object with `status`, `data`, `total`, `cats`, `cur`, `cat` — worth screenshotting directly for class as a "what a well-designed API response looks like" example.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Query parameters (`e.parameter`) as how a client asks a server for something specific; server-side filtering vs sending everything to the client; pagination and why it exists (bandwidth/large data); validating/defaulting untrusted input; the redeploy-to-publish workflow reinforced a second time; designing an API response shape around client needs.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Extend the "class joke/fact API" project (from `8YhwarXcPeU`) with a `?category=` filter and `?page=` pagination — directly buildable in one class session since it's literally what this video does, on the same dataset. Good as week 2-3 follow-up once the basic API exists.

### Traps a kid will hit
Forgetting to redeploy after a logic change (called out twice in this video alone — treat as the single most common Apps Script beginner trap); off-by-one page math; calling a `doGet`-style test function directly without first faking the `e.parameter` object; not validating that a parameter is a number before doing arithmetic with it; forgetting `getValues()` returns arrays-of-arrays even for single-column selections.

### Doesn't transfer, and why
Nothing here is off-track — this is squarely "what is an API" material, more advanced than part 1. It assumes part 1's setup (openById, getSheetByName, doGet, deployment) so should be taught right after it, not standalone.

## Honest caveats
Fairly dense — filtering, splicing, pagination math, and a second endpoint action all in 19 minutes. For 14-year-olds this is likely two shorter sessions, not one, and Gemini should write the splice/pagination math rather than kids typing it by hand.
