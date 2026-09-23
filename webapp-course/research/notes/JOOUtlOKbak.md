# AJAX to get Google Sheet Data with JavaScript Fetch Sheet Data as JSON output from web app Scripts (Laurence Svekis, 18.4 min)

**What it is:** tutorial, lesson 4 of the "Google Sheet Data API" course, continuing from frejbw3eJTY. Live coding in VS Code with Live Server, separate from the Apps Script editor. Current tooling.

**Substance:** substantive — this is the batch's clearest demonstration of a genuinely SEPARATE frontend (plain HTML/JS run locally via VS Code Live Server) calling a deployed Apps Script `doGet` endpoint with `fetch`. This is architecturally the closest video in the whole batch to the class's planned final-project shape (separately hosted frontend + Apps Script JSON API).

## Ideas, in the video's order
- [0:01:41] Sets up a plain `index.html` + `app.js`, opened with VS Code's **Live Server** extension — explicitly framed as a way to run a local dev server so the page behaves like a real deployed site rather than a `file://` page. Good practical tooling note for the class (a Netlify-like local preview workflow).
- [0:05:35] Copies the deployed **exec URL** from Apps Script "Manage deployments" into the frontend JS as a plain string constant — concretely shows that the exec URL is just a normal HTTP endpoint any JS `fetch` can hit, from any page, not just from inside Google's UI. This is the moment that most directly demystifies "web app URL" as "a real API endpoint."
- [0:06:41] `document.addEventListener('DOMContentLoaded', init)` pattern — waits for the page to load before running any code; generic but a necessary habit.
- [0:07:48] `fetch(url).then(res => res.json()).then(data => ...)` — the canonical fetch/promise chain, explained step by step (get response, parse as JSON, then use the data).
- [0:08:56] Confirms in the console that the object shape matches exactly what the Apps Script endpoint built (`{status: 'success', data: [...]}`) — reinforces that the envelope from the server-side video (frejbw3eJTY) is exactly what the client now has to unwrap.
- [0:09:30] Live demo: adds more rows to the actual Google Sheet, reloads the page, and the array length changes (19 items) — direct, visible proof that the frontend is reading live data, not a snapshot.
- [0:10:36] Builds a `makeOutput(data)` function that `forEach`s the rows and creates DOM `div`s dynamically (`document.createElement`, `.append`), including conditional styling (green text if `row.status` true, red if false) — first appearance in the batch of data-driven conditional UI rendering.
- [0:14:36] Adds a "Load Sheet Data" button with a click listener that re-runs `init()` — turns the page from auto-load-only into a re-fetchable, interactive tool; also has to explicitly clear old output first to avoid duplicate content stacking — a real, previously-invisible bug the video catches live and fixes.
- [0:17:22] Final polish: shows a "Loading..." placeholder text while the fetch is in flight, cleared once data arrives — basic but important UX/async feedback pattern.

## What the frames add
Frames [0:01:45]-[0:03:45] show the actual VS Code + Live Server setup (extensions panel, `app.js` file, live-reloading browser) — useful to show kids what local frontend development tooling looks like distinct from the Apps Script editor, which is otherwise all they'll have seen. Frames [0:05:45]-[0:06:45] show "Manage deployments" with the exec URL literally copied out — visually confirms the URL hand-off from backend to frontend project. Frames [0:08:00]-[0:11:00] show live DevTools console output of the fetched JSON object tree (expandable `data: Array(19)`, `status: "success"`) — a good visual for teaching kids to read a JSON object in the browser console. Frames [0:12:00]-[0:13:30] show the rendered colored name list (green/red rows) building up in the live page next to the spreadsheet — a clean "spreadsheet in, styled webpage out" side-by-side.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- The clearest full-loop demo in the batch: Sheet -> Apps Script `doGet`/JSON -> deployed URL -> separate frontend `fetch` -> DOM rendering. This is effectively a dry run of the class's planned final-project architecture (Apps Script backend + externally hosted frontend), just with Live Server standing in for Netlify.
- `fetch().then().then()` as the async request/response pattern — the direct sibling of `google.script.run.withSuccessHandler()` from 2E9RiYrNkwM; worth explicitly pairing the two in class ("here's the version for talking to your OWN Sheets add-on, here's the version for talking to any URL including your own deployed app").
- Live data confirmation via editing the Sheet and reloading — a simple, convincing classroom demo of "the database is the single source of truth."

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Strong final-project rehearsal: build a plain HTML/JS page (outside Apps Script, e.g. via Live Server or even a static Netlify draft) that fetches a class-made Sheets JSON endpoint (from the frejbw3eJTY project) and renders a styled list with a button to reload. This is essentially the frontend half of the whole course's architecture goal and could be assigned as-is, almost verbatim, as a milestone project once kids have a working JSON endpoint.
- Good add-on exercise: implement the "Loading..." state and the "clear old output before re-rendering" fix as an explicit debugging exercise — kids can be shown the video's duplicate-content bug and asked to find/fix it themselves before being shown the fix.

### Traps a kid will hit
- [0:14:36] Forgetting to clear old DOM output before re-rendering on a second fetch — causes visually duplicated/stacking content; the video hits this live and fixes it, good to pre-empt explicitly.
- CORS is NOT discussed at all in this video — it works here specifically because the deployment's "who has access: Anyone" setting plus Apps Script's default response headers happen to allow it. This is a real gap: when the class's final project moves the frontend to Netlify (a different origin over HTTPS, same general situation as Live Server's localhost), kids may hit CORS errors that this video gives them no framework for diagnosing. Flag explicitly as a documented gap in this material — worth building a short standalone CORS explainer/checklist for class rather than assuming this video covers it.
- The exec URL is hardcoded as a plain string in the frontend JS — fine for a classroom demo, but worth telling kids explicitly that anyone who can view page source can see and reuse that URL (no auth beyond the deployment's access setting) — a real security-awareness moment absent from the video.

### Doesn't transfer, and why
Nothing here is Docs/Forms-only; this is squarely on-topic and, architecturally, the most transferable video in the whole batch to the class's final-project shape. The one gap (CORS silence) needs to be patched separately, not because the video is wrong, but because it simply doesn't arise in this particular same-account, permissive-deployment setup.

## Honest caveats
No outdated APIs; tooling (VS Code + Live Server) is current and reasonable to show kids, though the class will likely use a simpler in-browser environment for most of the year and only move to a local/Netlify setup for the final project — worth noting that Live Server itself is optional for kids, just one way to preview a static page locally.
