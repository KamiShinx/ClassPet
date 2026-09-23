# Web App Materialize CSS AutoComplete with JavaScript - Apps Script Web App Tutorial Part 9 (Learn Google Sheets & Excel Spreadsheets, 22.7 min)

**What it is:** tutorial (2019), part 9. Adds an autocomplete text field to the form, populated from a list of values stored in the Sheet, mirroring the earlier calendar video's read-Sheet-then-configure-widget pattern.
**Substance:** mixed: the "read a column from Sheets, reshape it into the object shape a JS widget wants" idea is solid and reusable; a large fraction of runtime is Materialize-specific wiring and a UI icon swap that teaches nothing transferable.

## Ideas, in the video's order
- [0:00:00]-[0:01:10] Demonstrates what autocomplete is using Materialize's own docs example before building it — models "check the library's own demo first" as a habit.
- [0:02:15] New list of suggestion words is just typed straight into a spare area of the existing Sheet — reinforces Sheets-as-database with zero ceremony (generic but reflects real house style of the whole series).
- [0:06:17]-[0:06:49] Notes Materialize's autocomplete wants data as `{word: null}` key-value pairs (optionally `{word: "image-url"}`), not a plain array — a concrete "the library dictates the shape of your data" lesson, generalizable beyond Materialize.
- [0:07:24]-[0:09:41] Server function `getWords()`: pulls a range from the Sheet, `.getDataRegion()` to size the range automatically to however much data exists rather than hardcoding row counts — small but genuinely useful technique (self-sizing range) worth calling out.
- [0:10:19]-[0:12:59] Converts the 2D array of Sheet rows into the required object via `data.forEach(value => options[value[0]] = null)` — same "reshape array into the shape a UI widget wants" pattern as Part 6's calendar video; worth explicitly telling kids this is a repeating motif, not a one-off trick.
- [0:14:07] Cleans up code placement: moves setup code inside the `DOMContentLoaded` listener "for good practice," acknowledging it wasn't strictly necessary — a nice explicit statement that some refactors are about code quality, not correctness.
- [0:15:17]-[0:17:34] Same `google.script.run.withSuccessHandler(...)` round-trip pattern as prior videos (server returns object, success handler populates the widget) — reinforcing repetition across the whole series is itself useful for spotting the durable pattern versus one-off UI details.
- [0:22:14] Swaps the field's icon by editing a Material Icons class name — purely cosmetic Materialize detail, flagged here as outdated/library-specific, not concept.

## What the frames add
Confirms the demo autocomplete widget (typing "L" shows vlookup/hlookup), the Sheet's flat word list (`vlookup, hlookup, match, query, textjoin, join, ...`), and the finished `getWords()`/`populateWords()` functions on screen. No new information; purely visual confirmation of the object-shape conversion and the working widget.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Reading a Sheet range that auto-sizes to actual data (`getDataRegion()`), avoiding hardcoded row counts — a small robustness habit worth teaching early.
- Repetition, now for the third time in the batch (Calendar video, Table video later), of the core "server function returns data -> client success-handler consumes it -> client updates UI" loop. Worth naming explicitly as THE Apps Script client/server pattern kids will use in nearly every project.
- The general idea that any JS UI component (autocomplete, dropdown, chart) has its own expected input data shape, and "backend work" partly means converting your raw data into that shape.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Autocomplete search box for any list-based project** (e.g. type a friend's name, a game character, a vocabulary word) sourced live from a Sheet column — good small milestone once the class already has a working form, reusing the exact `getWords()`-style function.
- Swap the specific widget: a plain HTML5 `<input list="..."><datalist>` gets 90% of this feature with zero external library and zero of the Materialize-specific wiring — worth considering as the class's version of "autocomplete," since it needs no CDN script and is one native tag.

### Traps a kid will hit
- Mismatching the data shape a library expects (object vs. array) — this video's central trap, and one that Gemini output can plausibly get wrong (e.g. handing a plain array to something wanting `{key: value}`).
- Autocomplete/data flows that only run once on page load will go stale if the Sheet changes while the app is open — not addressed in the video but worth flagging to kids as a limitation of the pattern all these tutorials use.

### Doesn't transfer, and why
- Materialize's specific `M.Autocomplete.init()` call, its icon class names, and the whole "how do I disable/clear the widget" back-and-forth (0:11:49-0:13:56 of the chips video and similar patterns here) — 2019 CSS framework detail with no modern equivalent worth teaching; a native `<datalist>` replaces the whole widget for a class project.

## Honest caveats
- Meaningfully padded relative to its idea density: swapping an icon, restating the same `getWords`-style boilerplate seen in earlier videos, and extensive Materialize doc-browsing pad the runtime. The reusable idea (reshape Sheet data into a widget's expected shape) could be taught in 5 minutes.
