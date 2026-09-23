# Create Routes, Render Views in Web App - Apps Script Web App Tutorial Part 8 (Learn Google Sheets & Excel Spreadsheets, 20.2 min)

**What it is:** tutorial (2019), part 8, direct continuation of Part 7. Replaces the `if/else` view-switching with a small hand-built router object, plus a reusable `render(file, args)` templating helper.
**Substance:** substantive: this is the most transferable "software engineering idea" video in the batch — building a tiny abstraction (a route table) from scratch and explaining why, not just copying a library.

## Ideas, in the video's order
- [0:00:35]-[0:01:41] States the problem plainly: adding each new view currently means adding another `else if` branch — not sustainable. Wants `Route.path('form', loadForm)` style registration instead.
- [0:02:15]-[0:04:26] Builds the router by hand: a plain JS object `Route = {}`, and a `Route.path(name, callback)` function that does `Route[name] = callback` — i.e. **a router is just an object used as a lookup table, plus a function that adds to it.** This is presented and explained step by step, in real time, including his own mid-build correction (a stray comma). Excellent, honest "here's what an abstraction actually is under the hood" moment — no magic, no library.
- [0:04:56]-[0:06:40] Rewires `doGet(e)` to check `if (Route[e.parameter.v])` then `return Route[e.parameter.v]()` — executing a function that was stored as a value. Concretely demonstrates "functions are values" in JS, a concept worth calling out explicitly to kids since Gemini-written code leans on it constantly.
- [0:07:16]-[0:08:32] Adds a second route (`about`) in two lines, proving the payoff: registering a new page no longer touches `doGet` at all.
- [0:09:04]-[0:10:45] Introduces the second reusable idea: a `render(file, argsObject)` function to replace the repeated 3-line "create template, set properties, evaluate" boilerplate — designed up front to take an optional object of template variables (`{list: ..., title: ...}`).
- [0:11:19]-[0:15:21] Builds `render()`: `HtmlService.createTemplateFromFile(file)`, then loops `Object.keys(argsObject)` and assigns each onto the template (`tmp[key] = argsObject[key]`) before evaluating. This is a second, distinct "how do dynamic keys work" lesson (`Object.keys` + bracket assignment), valuable independent of the router.
- [0:17:06]-[0:19:30] Demonstrates passing multiple named variables into a template (`title`, `other`) and using them with Apps Script's `<?= title ?>`-style template syntax — the actual mechanism by which server data reaches HTML.

## What the frames add
Pure code screen-recording of `code.gs` being built line by line; confirms router object and `render()` function exactly as narrated; a plain "About Us" page and a form page render correctly by the end. No new information beyond transcript; frames are useful mainly to see the *shape* of the final `Route`/`render` code side by side (helpful as a copyable reference for class material).

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Routing as "a lookup table from a string to a function," built with zero libraries — the clearest explanation of routing conceptually in this whole batch.
- Functions as first-class values (storing a function in a variable/object property, then calling it later).
- Template variables: how server-side data (a Sheet lookup, a computed value) actually lands inside HTML the browser renders.
- The value of a small reusable helper (`render()`) once a pattern repeats 2+ times — a real, teachable "notice repetition -> extract a function" moment.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Milestone: "add a page in 2 lines."** After building the router once (or being handed it as a starter snippet), each kid adds a new page (e.g. an "about me" or "rules" page) to their existing app using only `Route.path('new', loadNew)` — a satisfying, low-effort payoff that makes the abstraction's value visible immediately.
- **Router as shared class boilerplate**: since Ben wants a hub built on this same stack, this exact `Route`/`render` pair (cleaned up) is a strong candidate for a starter template every kid's project begins from, and for the hub itself.

### Traps a kid will hit
- Case sensitivity of route names/keys (`route` vs `Route` mentioned explicitly at 0:03:20) — small but real JS gotcha kids and Gemini both trip on.
- Forgetting to register a route (typo'd path string) silently falls through to "else" home page with no error — worth teaching kids to expect silent-not-loud failures in this pattern and to check the URL parameter matches exactly.
- `Object.keys().forEach()` on an args object is a slightly advanced pattern for 14-year-olds to write unaided; fine for Gemini to generate, but kids should be able to explain in their own words what it's doing (loop through the object's property names, copy each value onto the template) — good target for the "explain the code back" checkpoint Ben wants.

### Doesn't transfer, and why
- Nothing Materialize/library-specific here — this video is the most stack-agnostic and durable in the batch.

## Honest caveats
- Dense and code-heavy but not padded; every minute adds something. Best watched right after Part 7 since it explicitly continues that video's ending problem.
- The live typo/correction moments (missing comma, wrong variable name) are authentic bugs, not staged — good "even the tutorial author makes typos" reassurance for kids doing AI-assisted coding.
