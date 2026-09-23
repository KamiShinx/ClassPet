# Web App - Search a Match in Spreadsheet - Google Apps Script Web App Tutorial - Part 5 (Learn Google Sheets & Excel Spreadsheets, 31.8 min)

**What it is:** Tutorial, part 5 of 5 (final of this batch), direct continuation. Builds a live "type a zip code, get a shipping estimate back" lookup: an `input` event listener (not a button) triggers a server call, which searches a second Sheet tab and returns a matched value, applied back to the UI via a success-handler callback. 2019.

**Substance:** substantive: the strongest video in the batch for showing **asynchronous** client/server interaction (not just click-to-submit) and a real search/lookup pattern against Sheet data, including debounce-style input gating and callback-based UI updates.

## Ideas, in the video's order
- [0:00:33]–[0:01:17] New "estimate" Sheet tab: zip codes (formatted as plain text, since zips can have leading zeros — a real Sheets gotcha) mapped to shipping costs.
- [0:03:39]–[0:04:49] Adds a disabled `<input>` field (view-only) for the estimate, alongside a normal zip-code input.
- [0:05:23]–[0:06:31] **Core new idea**: instead of a button-click listener, attaches an `input` event listener to the zip field, so the client function runs on every keystroke — first departure from the "click to submit" pattern used in Parts 1-4.
- [0:09:25]–[0:09:58] **Debounce-style gating, explained plainly**: don't call the server on every keystroke (wasteful/unnecessary for an incomplete zip); check `zipCode.length === 5` first, then call the server. A real, teachable performance/traffic-shaping idea, stated in plain language a 14-year-old could follow.
- [0:14:35]–[0:15:41] Client calls `google.script.run.getCost(zipCode)` — a server function named deliberately differently from the client function to avoid confusing students about which side is which.
- [0:15:41]–[0:22:15] Server `getCost(zipCode)`: reads the estimate sheet into a 2D array, maps it into two parallel 1D lists (zip codes, costs), uses `indexOf()` to find the position of the typed zip in the zip list, and returns the same-position value from the cost list, or `"unavailable"` if `indexOf` returns `-1` — narrated step by step, including drawing out the index-matching logic in words ("we found position 2, so we go to position 2 in the other list").
- [0:22:47]–[0:24:29] **`withSuccessHandler`**, the key async concept: `google.script.run.withSuccessHandler(updateEstimate).getCost(zipCode)` — because the server call takes time, the result is delivered later to a callback function rather than returned directly. This is the clearest and only explicit treatment of `google.script.run`'s asynchronous nature in the whole batch.
- [0:25:39]–[0:26:12] Formats the returned number with `.toFixed(2)` and a prefixed `$` — minor, cosmetic.
- [0:27:31]–[0:30:59] Wires the zip/estimate fields into the existing "save to sheet" submit flow so a full record (name, app, zip, estimate, date) gets appended on final submit — ties the new search feature back into the write path from Parts 1-2.

## What the frames add
Matches transcript; the useful visuals are the live "type a zip code, watch the estimate box update without clicking anything" sequence at [0:04:48]-[0:06:12] and [0:09:00]-[0:14:12] (shows the debounce condition working: partial zip codes like "5", "77654" do nothing until 5 digits are entered), which is a much clearer demonstration of "async, event-driven backend calls" than any diagram would be. One frame at [0:19:36] is a genuine capture glitch (solid black) — nothing lost, next frame recovers.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- **Asynchronous client/server calls with callbacks** (`withSuccessHandler`) — the single most important "how does a backend actually feel to use" concept in the batch: the page doesn't freeze while the server searches; the answer arrives later and updates the UI when ready. Directly explains why `google.script.run` needs callbacks instead of a normal return value.
- **Search/lookup as the core "backend" operation** — not just writing rows, but reading them back and matching against something the user typed. This is the shape of almost every "useful" app (leaderboard, roster check, answer key, item lookup).
- A plain-language justification for **not** hammering the server on every keystroke — an early, accessible introduction to "don't overload your backend," relevant later for Sheets-speed/quota concerns.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **"Live lookup" milestone**: type something (a code, a name, a word) and have the app search a Sheet and show a match in real time, no button — e.g., "type your student ID, see your locker number," "type a Pokémon name, see its stats," "type a word, see if it's on the banned-word list." Directly teaches: reading, searching, and callback-based UI updates — a natural "part 2" project after the class poll/write app.
- **Concept demo, teacher-led**: watch the Logs/network happen character-by-character as you type a zip code, pointing out the `.length === 5` gate — makes "don't call the server too often" concrete before quotas ever come up as a topic.
- Good real project seed for the "teaching hub": a "type your name, see if you're checked in" or "type an assignment code, see the instructions" lookup box is essentially this same pattern.

### Traps a kid will hit
- Forgetting the length/validity gate and firing a server call on every keystroke — wasteful, and will feel slow/laggy well before a kid understands why (early, gentle intro to the "Sheets speed" trap named in the brief).
- `withSuccessHandler` callback naming/wiring mistakes — since the result doesn't come back "in order" the way normal code does, a kid (or Gemini) mismatching the callback function name will get silent no-ops, same silent-failure family as `google.script.run` typos in Part 1.
- `indexOf()` returning `-1` and forgetting to check for it before indexing into the parallel array — a classic array-logic bug, explained here but easy for AI-generated code to skip.
- Sheet formatting trap: zip codes need to be formatted as plain text or leading zeros vanish — a real, easy-to-miss Sheets/data-integrity issue that will silently corrupt data (e.g., "00501" becomes "501").

### Doesn't transfer, and why
- Everything here is current-API and durable; no material that doesn't transfer.

## Honest caveats
Assumes the viewer already has the full Part 1-4 app (first name/last name/app dropdown/submit) as a base — not a standalone lesson. The two parallel-array (`zipCodesList`/`costsList`) + `indexOf()` search approach is a reasonable teaching simplification but doesn't scale (linear search, no error handling for duplicate zips); fine for a teen project, worth a one-line "this gets slow with big lists" caveat if reused. No AI-assisted building (2019, hand-typed).
