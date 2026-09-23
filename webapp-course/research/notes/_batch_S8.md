# Batch S8 -- Laurence Svekis: "AJAX Dynamic Quiz from Sheets Data as JSON" (single video, 118 min)

One video, so there's no cross-video agreement/contradiction to report -- this note is a distillation of the single build, checked for what actually transfers to our class.

## Strongest ideas for this class
1. **The whole project is a strong Milestone-3/4 candidate as-is, teen-scaled.** Sheet as quiz-question bank -> `doGet` serves it as JSON -> vanilla JS plays it -> `doPost` writes score to a second sheet. This is architecturally identical to what Ben wants: real backend, real Sheet-as-DB, visible client/server split, fun output. [0:00:01]-[1:57:08]
2. **The deploy/permissions screen is the single best concrete teaching aid in the video.** "Execute as" + "Who has access: Anyone" walked through step by step [0:20:18]-[0:22:30], reinforced three more times when it bites him [0:24:10], [0:40:45], [1:28:30], [1:43:45]. This should become a fixed checklist slide in our course ("every time you change code: redeploy, and set access to Anyone").
3. **The doPost debugging technique (mock the `e` object locally with a `tester()` function) is the most transferable "how AI-assisted building actually goes" lesson in the batch** [1:26:19]-[1:41:15]. doPost can't be run/debugged in the IDE the way doGet can; faking the event object is a workaround every kid building a doPost endpoint will need, and it's a pattern Gemini can write for them once shown.
4. **The visual "JS + Sheets -> DATA -> WebApp" title card** [0:16:30] is the clearest one-frame mental model of what a backend API is in the whole video -- worth adapting as our own diagram when introducing "what is a backend."

## Where it's thin / what to cut
- **~14 minutes (0:25:47-0:39:56) building a plain HTML `<table>` from raw array data, by hand, with a custom `createElement` helper -- then throwing it away** once the data gets reshaped into objects. Zero reason to walk kids through this; Gemini will produce equivalent rendering from one prompt. Cut entirely.
- Large stretches are pure narrated re-typing of previously-established patterns (e.g. re-doing the same `document.createElement`/`appendChild`/`classList.add` dance for every new label or input field, 1:29-1:53). Visually confirmed across all 30 contact sheets: this is close to wall-to-wall code-editor/DevTools screen capture, not lecture. **Rough estimate: ~15% of the 118 minutes is transferable concept/explanation; ~85% is live typing/narration of typing** that a kid would either skip (watching at 2x) or not need at all if Gemini is writing the code. Don't assign the raw video; extract the concepts into short demos instead.
- The option-shuffle (`sort(() => Math.random()-0.5)`) [1:00:52] is a commonly-taught but statistically biased shuffle -- fine to reuse, not worth presenting as "correct randomness" if a sharp kid asks.

## Concept explainers worth reusing
- "Data -> WebApp" graphic [0:16:30] -- adapt as our own backend-explainer diagram.
- Deploy dialog walkthrough [0:20:18]-[0:22:30] -- reuse near-verbatim as a class checklist/slide.
- `tester()` mock-event debugging pattern [1:26:19]-[1:41:15] -- worth a dedicated 10-minute class demo on its own, decoupled from the quiz.
- "Dump the raw payload into a cell so you can see what actually arrived" [1:26:51], visible at frame 1:24:45 -- good general debugging habit to teach early (log first, guess never).

## Project seeds (backend concept each teaches)
1. **Sheet-as-API viewer** -- publish `doGet` returning a Sheet as raw JSON, view it in browser: reading Sheets, ContentService, deploy/access settings.
2. **"Read it into a page"** -- fetch that JSON into a rendered list/table (Gemini writes the template, skip hand-rolled DOM building): fetch, JSON parsing, basic client rendering.
3. **Class quiz app** -- this video's project, teen-scaled (kids write their own questions into the shared Sheet): state machine (question index/score), event handling, visual feedback.
4. **"Send it back" score submission** -- add doPost writing name+score to a second sheet: doPost, FormData, appendRow, and the tester() debugging pattern.
5. **Class poll / vote app** -- one question, everyone submits at once: writing rows, reading them back, and (unlike this video) an explicit discussion of what happens when many kids submit simultaneously -- concurrency, not covered here at all.
6. **"Debug your own API" exercise** -- take any doPost a kid has built and have them write a `tester()` mock before touching the live endpoint: a process/debugging milestone, not an app.

## Traps (Apps Script / AI-building) a kid will hit
- **Stale deployment**: editing `.gs` code does nothing to the live exec URL until a **new deployment** is cut. Recurs four separate times in this one video -- treat as the #1 rule to drill.
- **Access set to "Only myself"** instead of "Anyone" -- works for the builder, 401s for every classmate.
- **First-run OAuth scare screen** ("Google hasn't verified this app") -- needs a guided walkthrough or kids will bail.
- **Wrong/garbled Sheet ID** pasted into `openById` -- produces an opaque error a 14-year-old can't read.
- **Hardcoded column positions** (`row[0]`, `row[1]`, fixed option count) instead of reading headers dynamically -- the video's own creator explicitly considers the dynamic, safer approach and rejects it [0:44:54]-[0:45:28], a good "which choice was more robust, and why" class discussion.
- **`e.parameter` vs `e.parameters`** -- singular silently drops multi-value fields with no error.
- **Unexplained "failed to fetch" after code worked minutes earlier** [1:54:45]-[1:56:05] -- even the instructor's fix (rename function + recheck URL) looks more like trial-and-error than diagnosis; kids need "redeploy and re-verify the exec URL" as step one, not a last resort.
- **No quota/concurrency handling anywhere** -- a real gap if 15 kids' apps hit the same doPost endpoint in the same class period; the video never surfaces this risk.

## For the hub itself
Nothing in this video is Apps Script "admin"/teaching-platform shaped -- it's a single student-facing app, not infrastructure. The one reusable idea is structural: **the deploy-dialog checklist and the tester()-mock debugging pattern are both generic enough to become their own short reference pages inside the hub**, since every kid's project (not just the quiz) will hit both.
