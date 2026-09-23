# How to create Custom Functions in Sheets with Google Apps Script code (Laurence Svekis, 19.7 min)

**What it is:** Tutorial: write custom `=MYFUNCTION()` formulas usable directly in Sheets cells, backed by Apps Script - simple math, string concatenation, sales tax, and a geocoding lookup via `Maps.newGeocoder()`. Undated, YouTube captions.
**Substance:** mixed - solid, clean coverage of custom functions as a concept, but **entirely bound-script/formula territory, no web app, no doGet/doPost, no deployment at all**.

## Ideas, in the video's order
- [0:00:31]-[0:02:10] Frames custom functions as "your own formulas," usable in a cell exactly like `SUM` - a good accessible framing for kids who already know spreadsheet formulas.
- [0:03:19]-[0:04:26] `myCustom(value){ return value*value+10; }` - simplest possible custom function, called as `=MYCUSTOM(32)`, then dragged down a column like a normal formula. Directly reinforces "this is just Sheets, with a superpower."
- [0:05:33]-[0:08:51] Shows that a custom function called on a **range** (multiple cells) either silently returns the whole range mapped 1:1 (if it only touches `val`) or throws `#NUM!` if it tries numeric ops on an array - and that nesting a built-in function (`SUM(...)`) inside the custom function call is the fix for "reduce a range to one value first." Genuinely useful, concrete gotcha + fix.
- [0:09:24]-[0:09:57] States naming rules for custom functions: must be distinct from built-in function names, can't end in underscore, conventionally uppercase - small but accurate practical detail.
- [0:09:57]-[0:11:36] `FULLNAME(first,last)` (string concatenation) and a computed length example - shows custom functions work with strings, not just numbers.
- [0:11:36]-[0:12:40] `SALESTAX(val)` returns `val*0.15` (editable rate) - a nice, small "change one number and the whole sheet recalculates" demo of why formulas beat hardcoded values.
- [0:12:40]-[0:19:16] `LATLONGFIND(location)` using `Maps.newGeocoder().geocode(val)` - the most advanced example: a custom function that calls an external Google service (Maps geocoding), parses a deep nested response object down to `location.lat`/`location.lng`, and wraps it in `try/catch` to return `'Not Found'` gracefully instead of throwing. This is a genuinely good, complete example of "call an external API and defensively handle failure," even though it's inside a formula, not a web request.

## What the frames add
Frames mostly confirm the code-and-spreadsheet split-screen format consistent with the rest of the channel; sheet_003 (@8:00-11:45) shows the actual Apps Script documentation reference page for custom function naming rules and built-in function categories (a real, citable Google doc, not just narrated) which could be linked directly in class materials. Sheet_004 (@14:00-15:45) shows the live `Logger` execution output of the raw Maps geocoder response object (deeply nested JSON: `geometry`, `viewport`, `address_components`...) - a good visual for "real API responses are big and messy, you have to dig into them," reusable as an example of why you inspect objects with logging before trying to use them blind.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Calling an external service (`Maps.newGeocoder()`) and defensively parsing/handling its response is a small-scale preview of what calling any external API looks like - useful bridge concept even though it's not HTTP/fetch based.
- The `try/catch` -> graceful fallback value pattern is worth calling out explicitly as "handle the case where things don't work," relevant everywhere doPost/fetch code appears elsewhere in the batch.
- Logging a raw response object to inspect its shape before writing code to use it - a good general debugging habit to instill early, applicable to Sheet data, API responses, and POST bodies alike.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Not a web-app milestone on its own, but a good **half-session Sheets warm-up**: write 2-3 custom functions (a math one, a string one, a "safe" one with try/catch) - reinforces JS fundamentals (parameters, return values, string building) in a context kids already understand (spreadsheet formulas), before introducing HTTP requests.
- The geocoder example could seed a "distance calculator" or "find my city's weather" mini-project later using a similar defensive external-call pattern, once fetch/doPost are introduced.

### Traps a kid will hit
- Calling a custom function on a whole selected range and getting silent wrong output or a `#NUM!` error instead of an obvious crash - worth flagging generally: Sheets functions behave differently on ranges vs single cells, and this is invisible until you test it.
- Not naming a function distinctly from a built-in one, or not knowing the naming restriction (no trailing underscore) - low-stakes but a plausible early confusion.

### Doesn't transfer, and why
- No web app, no HTTP endpoint, no deployment, no frontend of any kind - this is pure Sheets-formula scripting. If the class's project goal is "an app with a real backend," this material doesn't get them there; it belongs as Sheets/JS fluency practice, not as part of the API/web-app track.

## Honest caveats
Despite the batch theme mentioning "doGet/doPost," this video contains **neither** - it is 100% custom-function (bound script formula) content. Flag it plainly as Sheets automation, not web-app building, when summarizing for Ben. The Maps geocoder example is the one piece worth keeping as a defensive-coding/external-API pattern reference.
