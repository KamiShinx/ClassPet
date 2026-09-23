# Google Apps Script create HTMLService WebApp Output Code Examples of HTMLService (Laurence Svekis, 22.3 min)

**What it is:** A denser follow-on tutorial about HTML *templating* inside Apps Script: `createTemplateFromFile`, scriptlets, `include()`, and passing a data object from server to template.
**Substance:** mixed — the individual techniques are real and useful, but the video spends a lot of time on trial-and-error (several "script completed but returned value not supported" errors) that a viewer must sit through; the explanations of *why* are thinner than the code-fixing.

## Ideas, in the video's order
- [0:00:37] Sets the agenda: separate HTML/CSS/JS into different files and `include()` them, pass an object of data into the template, and use scriptlets/conditions inside HTML.
- [0:05:45]–[0:08:04] Building `include(filename)`: first tries `HtmlService.createHtmlOutputFromFile`, which throws an error, because using scriptlets requires `createTemplateFromFile(...).evaluate()` instead — the "output vs template" distinction is the real lesson here, learned the hard way on screen (generic technique, but demonstrated concretely).
- [0:09:12] Splits `style.html` and `js.html` out of the main file and pulls them back in via `<?!= include('style'); ?>` — a real technique for keeping Apps Script's file-only editor readable (Apps Script has no native folders/imports for HTML).
- [0:13:13] `HTML.evaluate()` is separately required again when returning an object built with `HtmlService.createTemplate(...)` from data, not just from a file — reinforces the same evaluate-or-error rule.
- [0:15:30]–[0:16:39] The `<?!= ... ?>` (bang) syntax forces raw, un-escaped HTML output, vs `<?= ... ?>` which escapes it as plain text — important distinction for anyone building dynamic HTML fragments (XSS-adjacent concept, though not named as such).
- [0:16:39]–[0:18:19] Shows conditional logic (`if data.val > 5`) written directly inside the HTML file via scriptlets — author's own aside at [0:17:46]: "usually my preference is to not do the calculations in HTML... it does become a little bit harder to read." Worth flagging to kids as a style warning, not just a feature.
- [0:20:36] Live bug: reusing the variable name `output` inside both server-passed data and a client `<script>` caused a naming collision — realistic scoping trap.
- [0:20:36]–[0:21:42] A `findBugs()` helper function that just logs `HtmlService.createTemplateFromFile('index').getCode()` to the Logger — a crude but real debugging technique for templates unique to Apps Script.

## What the frames add
The bright red full-screen frames at [0:01:30], [0:12:00]-[0:13:15], [0:16:00], and [0:20:45] show the live page mid-error or mid-build with large styled text ("Laurence Svekis" heading, quiz question text) — useful to see the actual visual output of scriptlet-driven HTML, but mostly redundant with the code already visible in other frames. No diagrams anywhere.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Templates let server-side data flow directly into HTML before it's sent to the browser (as opposed to the client fetching data separately after page load) — a legitimate alternate "backend renders the page" pattern, worth contrasting with the fetch/JSON pattern taught elsewhere in the batch.
- `.evaluate()` as the step that actually executes server-side code embedded in HTML — a small but real "compile step" concept.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Not a strong standalone project seed — it's an editor/tooling technique (multi-file HTML), better absorbed as "how to keep your HTML from becoming one giant unreadable file" once kids are already several weeks in and their `index.html` has grown large. Could become a short "split your CSS and JS into separate files using include()" refactor exercise.

### Traps a kid will hit
- Using `createHtmlOutputFromFile` when scriptlets are present instead of `createTemplateFromFile(...).evaluate()` — the video itself hits this twice.
- Variable name collisions between server-injected data and client script variables (the `output` collision shown).
- Forgetting the exclamation mark (`<?!= ?>` vs `<?= ?>`) and getting escaped/garbled HTML instead of rendered markup.

### Doesn't transfer, and why
This is the most "fiddly Apps-Script-specific plumbing" video in the batch; it teaches real technique but is not aligned with "what is a backend" the way the doGet/JSON/ContentService videos are. Treat as optional/advanced material for kids who are already comfortable, not core curriculum.

## Honest caveats
Substantial run time (22 min) spent on trial-and-error debugging of the same "evaluate() missing" mistake in two different contexts — a tighter 8-minute cut would teach the same lesson. Not outdated technically, but padded relative to its actual concept density.
