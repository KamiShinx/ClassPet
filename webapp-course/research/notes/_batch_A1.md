# Batch A1 — "Learn Google Sheets & Excel Spreadsheets" Apps Script web-app series, Parts 1-5

Five videos, one continuous project, watched in order (2019, legacy Apps Script editor/deploy UI). Parts 1-2-4-5 are genuinely useful for teaching backend concepts; Part 3 (Materialize CSS) is filler for our purposes. Total ~2h13m.

## Concept explainers worth reusing
- **Client vs. server, one line** [RRQvySxaCW0, 0:15:43]: HTML/JS in the page is public, "anybody can right-click, view source"; the `.gs` file is not. The cleanest, most teen-ready "why a backend exists" line in the batch — build the concept lesson around it.
- **The request object made visible** [RRQvySxaCW0, 0:08:24-0:09:24]: watching `e.parameter`/`e.parameters` fill in live in the Logs panel as URL params are typed beats any diagram as a "here is a request" demo.
- **Escaping / why servers don't trust input** [f9dqsHDrQCc, 0:05:48-0:06:59]: `<?= ?>` escapes output as text, `<?!= ?>` renders raw HTML — shown live with `<i>hello</i>` printing literally vs. italic. A correct, simple, age-appropriate first touch of an XSS-adjacent idea.
- **Async calls need a callback** [lc8-vJ5r3e0, 0:22:47-0:24:29]: `google.script.run.withSuccessHandler(updateEstimate).getCost(zip)` — the batch's only explicit treatment of why `google.script.run` isn't a normal return-a-value call. Pair with the live typing demo [0:04:48-0:14:12] where an estimate box updates itself with no button click.
- **Real, unfiltered server errors** [RRQvySxaCW0 silent-typo bug; f9dqsHDrQCc 0:08:24, `ReferenceError: "title" is not defined`]: both videos leave genuine bugs and raw error output on screen — good for showing what an Apps Script crash actually looks like.
- **Deployment ≠ saving** [RRQvySxaCW0, 0:06:06-0:11:11]: editing code does nothing to a shared `/exec` link until redeployed; the `/dev` "latest code" link is the fix. Will burn every student in week one if not taught up front.

## Project seeds
1. **"Hello, backend" logger** (Part 1, almost as-is) — one button, one input, writes a row to a shared class Sheet. Teaches `doGet`, deploy, `google.script.run`, `appendRow`. Literal week-1 milestone.
2. **Dynamic dropdown / config-from-a-sheet** (Part 4) — populate a `<select>` from a Sheet tab instead of hard-coding options. Teaches server-to-client data flow, template variables, escaping.
3. **Live lookup box** (Part 5, generalized) — type something, get a matched answer with no button (locker number by student ID, quiz answer, "is this word allowed"). Teaches search, `withSuccessHandler`, a debounce instinct. Trivially reskinned into a game for the "must be fun" goal.
4. **Class poll / signup app** (synthesis, not in any single video) — submit a vote, see live counts. Teaches writing + reading rows, and — once two kids submit at once — concurrency, which none of these five videos touch but which the brief flags as a trap to surface.
5. **Restyle-with-AI exercise** (reaction to Part 3) — have Gemini restyle an existing project; kids verify nothing broke (especially anything JS reads by `id`). Turns the weakest video into a 10-minute AI-appropriate exercise instead of a 25-minute doc-browsing detour.
6. **"Backend crashed, why?" debugging drill** — break a deployed app (rename a function `google.script.run` calls, or evaluate a template without setting a property) and have kids diagnose from the Logs/error page alone.
7. **Teaching-hub self-check-in box** — a `withSuccessHandler` name-lookup ("type your name, see if you're marked present") reuses the shipping-estimate pattern and is directly usable inside the hub Ben wants built on this same stack.

## Traps
- **Silent failures, not errors** — the batch's most consistent, most transferable warning. `google.script.run` calls to a misspelled function do nothing visible (RRQvySxaCW0, 0:17:56-0:19:01); a mismatched `withSuccessHandler` callback fails just as quietly (lc8-vJ5r3e0). A kid (or Gemini) will assume the bug is elsewhere. Worth explicit framing: "if nothing happens, check your function names first."
- **Deployment versioning** (RRQvySxaCW0) — kids edit code, refresh the shared link, see no change. Teach the `/dev` link as the default working URL from day one.
- **2D vs 1D arrays from `getValues()`** (f9dqsHDrQCc, lc8-vJ5r3e0) — Sheets always returns arrays-of-arrays; both videos need `.map()` to flatten. Easy for AI-generated code to get subtly wrong.
- **`indexOf()` returning -1 unchecked** (lc8-vJ5r3e0) — classic missing-case bug, explained on screen but a real risk in AI-written search code.
- **Sheets formatting silently destroying data** (lc8-vJ5r3e0, 0:00:33) — zip codes need plain-text formatting or leading zeros vanish. A general "your database can silently change your data's type" lesson.
- **Framework needing manual re-init** (yu-nNEPw83k) — not Apps-Script-specific, but a real "the UI library needs a JS call to actually render" gotcha that recurs whenever AI-generated code pastes a static library snippet without it.
- **Not shown anywhere in this batch, but expected**: quotas, concurrency (two users writing at once), CORS/hosted-frontend-to-Apps-Script patterns. All five videos are single-user, single-tab demos. Needs another source or direct testing.

## Where videos agree / contradict, what to cut
Parts 1, 2, 4, 5 form one coherent arc (write → structure/refactor → read-back → search) and should be taught as a single unit. Part 3 is the one to cut or compress to five minutes: it teaches no backend concept, and hand-integrating a CSS framework runs against a 2026 AI-assisted workflow where styling is something you ask Gemini for. Keep only its two transferable asides: stable IDs survive restyling, and UI libraries sometimes need manual init. No contradictions between videos — one continuous project, one instructor. The series' biggest gap versus the class's needs is concurrency: nothing here models or warns about simultaneous writes, which a real classroom will produce immediately. Source that separately or test it directly against Ben's own class Sheet before relying on the `appendRow` pattern at scale.
