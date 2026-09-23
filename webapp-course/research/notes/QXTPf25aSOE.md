# Form Validation HTML5 + JavaScript + RegEx - Apps Script Web App Tutorial Part 10 (Learn Google Sheets & Excel Spreadsheets, 23.6 min)

**What it is:** tutorial (2019), part 10. Adds client-side validation (HTML5 `required`, `checkValidity()`, a regex `pattern`) to the form, then generalizes it into a reusable, data-driven validator.
**Substance:** substantive: the clearest, most reusable explanation of client vs. server validation in the whole batch, and a genuinely good refactor (hardcoded checks -> a validation config object + loop) shown being built live.

## Ideas, in the video's order
- [0:00:00]-[0:00:34] **Explicit, well-phrased security concept, stated up front**: client-side ("user-side") validation only stops accidental bad input from honest users; it does nothing against someone bypassing the browser and hitting the server directly. Real server-side validation is a separate, still-needed thing. This is a genuinely good, reusable explanation of client vs. server trust boundaries — worth reusing verbatim in class.
- [0:00:34]-[0:01:42] Demonstrates the vulnerable baseline: an empty form currently submits fine and writes a blank row to the Sheet — makes the problem concrete before fixing it (good pedagogy pattern: show the bug, then the fix).
- [0:02:22]-[0:03:30] `required` attribute alone isn't enough — the browser shows red, but the JS click-handler still runs and still saves the record, because the code never actually checks validity before acting. Important, concrete point: HTML5 visual validation and your own logic are two different things.
- [0:05:51]-[0:06:28] `element.checkValidity()` returns true/false — the actual JS hook that makes `required`/`pattern` meaningful to your own code.
- [0:07:02]-[0:08:44] First pass: one hardcoded `if (!isValid) { warn } else { addRecord }`, plus a Materialize toast for the error message — establishes the mechanism before generalizing it.
- [0:09:17]-[0:09:49] Explicitly names the scaling problem: "we can't have 17 if-statements" for 17 fields — sets up the refactor, mirroring Part 8's router video's own "this doesn't scale" moment. Good recurring lesson across the series: notice repetition, then abstract.
- [0:09:49]-[0:12:17] Extracts `checkIfValid(elementId, message)` as a standalone, reusable function that returns true/false and shows the toast itself — a clean single-responsibility function.
- [0:12:17]-[0:16:35] Builds a **validation config object** (`{fn: "First name is required", ln: "Last name is required", ...}`), loops its keys with `Object.keys(...).forEach(...)`, calls `checkIfValid` for each, and ANDs the results into one `allValid` flag before deciding whether to submit. This is the same "config object + loop over its keys" shape as Part 8's `render()` — worth telling kids explicitly that this is a repeating pattern, not a one-off trick.
- [0:21:24]-[0:23:06] Adds a regex `pattern="^\d{5}$"` for 5-digit zip code validation via plain HTML5, no extra JS — shows regex as a lightweight validation tool without writing a validation function by hand.

## What the frames add
Confirms the before/after: empty submissions succeeding then being blocked; live toast messages ("First name is required", "Please enter a valid zip code"); the final `page-js.html` showing the `toValidate` object and the `forEach`/`allValid` loop clearly on screen, useful as a ready reference snippet. No diagrams; frames mainly validate the code state at each stage.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Client vs. server validation and why both matter — arguably the single best "what is a backend for" explanation available in this batch, since it makes the client's limits concrete (a user, not just an attacker, can always bypass client JS).
- The recurring "hardcode it once -> notice it doesn't scale -> extract a config object + loop" refactor arc, now the third time this exact shape appears in the series (routing, templating, now validation) — strong candidate for an explicit "this shape comes up everywhere" lesson to kids.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Milestone: "make the form reject bad input."** Any class project with a form (sign-up sheet, poll, booking form) gets a required-fields + one regex-pattern validation pass using exactly this technique — small, visible, and testable in one sitting.
- **Follow-on milestone**: pair with a *server-side* check (e.g. `doPost`/`userClicked` function rejects if `firstName` is empty even if the client was bypassed) to make the client-vs-server point real rather than just told — directly requested by Ben's goal that kids understand what a backend actually guards against.

### Traps a kid will hit
- Believing `required`/`pattern` alone is "validation done" and forgetting their own code still needs to check `checkValidity()` before acting — the exact mistake demonstrated and fixed at 0:02:22.
- Regex is genuinely hard for 14-year-olds to write from scratch; fine for Gemini to generate a pattern, but kids should be able to describe in plain words what `^\d{5}$` means (starts, 5 digits, ends) — good "explain it back" checkpoint.
- Config-object-plus-loop validators are an appealing target for Gemini to over-engineer; watch for AI-generated validation code that's needlessly abstract for a first project — simpler per-field `if` checks are fine for early milestones, with this pattern introduced later once repetition actually hurts.

### Doesn't transfer, and why
- The Materialize toast (`M.toast(...)`) call for showing the error message is library-specific; any visible error text (a `<div>` or `alert()`) teaches the same lesson without the CDN dependency.

## Honest caveats
- Substantive throughout; little padding. The clearest "why does backend/client-server split matter" explanation in the batch — worth flagging to the other analysts/synthesizer as reusable class material even outside this specific project.
