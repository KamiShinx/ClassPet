# Batch G2 — teen-scale Sheets/Apps Script projects + vibe-coding Apps Script with Gemini (2025-26)

9 videos: `bKq2sNR6kDU` (chat promo), `P17Gqfhaupc` (quiz app tour), `DJYJ5_JjBOs` (Forms/Sheets leaderboard, no code), `6gl4tMuYUBQ` (SORT formula), `6XC-vN0Ox2k` (Gemini web-app wizard), `5iCcbsaRebA` (Google's own Gemini-chat-to-Apps-Script tutorial), `JY0xTwPJPqk` (Gemini form/CRUD builder), `mWHbwA_l_FM` (teacher's two-prompt self-grading quiz), `Qu0mJj1nLbw` (Gemini side panel inside Apps Script IDE).

## The actual Gemini workflows, compared
Five videos show a real build workflow, splitting into two families:

1. **Plain chat, full-file copy-paste** (`5iCcbsaRebA`, `mWHbwA_l_FM`, manual-paste half of `6XC-vN0Ox2k`): open gemini.google.com separately from script.google.com, write a structured prompt (role + goal + trigger + "generate Apps Script code"), copy the whole reply, paste into the editor (sometimes a fresh standalone project), save, run, grant OAuth, verify the real result, not the success message. Iteration = ask again, paste the whole updated file over the old one. This is almost certainly **what our class will actually do**.
2. **In-IDE side panel with diff-based edits** (`Qu0mJj1nLbw`): Gemini lives inside the Apps Script editor, edits only the currently open file, shows changes as a green diff, and has a one-click "Fix errors with Gemini" reading the execution-log stack trace directly — the best-documented AI-debugging loop in the batch, but it explicitly needs a paid Workspace plan with admin approval, so our kids on personal Gmail almost certainly won't have it. Reference only, not a lesson plan.

All five agree on three checkpoints: paste into the editor, run once and grant OAuth, verify the real side effect (Sheet row / Calendar event / Form), never just the "success" text. They diverge on safety: full-file replace (family 1) silently overwrites any hand edit, while diff-accept (family 2, unavailable to us) at least shows what changed first — the sharpest argument for keeping a kid's own manual tweaks in a small separate function.

**Best find for the "forgetful AI" problem**: `6XC-vN0Ox2k` [12:05] — the presenter leaves inline "guard condition" comments in the HTML telling Gemini not to change how the frontend calls the backend, so a cosmetic prompt can't quietly break a working feature. Directly teachable: before any big prompt, tell Gemini in writing which function names/endpoints must not change.

**Most concrete trap, caught on camera**: `mWHbwA_l_FM` [4:24] — a greyed-out Run button on a brand-new standalone script confused the presenter; fix is "Save project to Drive" first. Will happen to our kids on their first unbound script.

## Concept explainers worth reusing
- `6gl4tMuYUBQ` [0:00-1:06]: `=SORT(range, col, false)` — cleanest 60-second proof that "a leaderboard is just a table plus a query." Good warm-up before Apps Script.
- `DJYJ5_JjBOs` [2:43]: orange/yellow/green (input/config/output) sheet coloring is a reusable visual vocabulary for raw data vs. settings vs. derived view.
- `5iCcbsaRebA` [1:00]: the on-screen prompt (role + goal + trigger + explicit code ask) is worth lifting almost verbatim as a prompt-writing worksheet.
- `Qu0mJj1nLbw` [3:40]: three closing rules (per-file context only, all-or-nothing accept, external files need explicit reference) should become class rules even without the tool — plain Gemini chat has the same blind spots, worse (no "open file" concept at all).

## Project seeds
1. **Quiz app with login** (`P17Gqfhaupc`, drop IP-lock/OTP for v1) — users sheet as row-lookup login; timed category quiz; results row written back. *Concept: auth as a row lookup, writing results, reading config from a sheet.*
2. **Automatic class leaderboard** (`6gl4tMuYUBQ` + `DJYJ5_JjBOs`, rebuilt as a web app, not Forms+Sites) — raw XP rows, computed sorted view, public read-only page. *Concept: aggregation/sort as a derived view over raw rows.*
3. **Class chat/shout-board** (from `bKq2sNR6kDU`'s idea, built from scratch — no code shown) — message log sheet, append-on-submit, poll-to-refresh. *Concept: append + poll as a substitute for real-time push; concurrency.*
4. **Self-grading quiz generator** (`mWHbwA_l_FM`) — feed Gemini notes, get a scored Google Form via a standalone script. *Concept: unbound script as a one-off generator (DriveApp/FormApp) vs. a persistent web app.*
5. **Class hub with owner-only admin** (idea from `JY0xTwPJPqk`'s `?p=formbuilder` routing + owner check) — one deployed app, `doGet(e)` branches on `e.parameter.p`, admin gated by `Session.getActiveUser().getEmail()`. *Concept: server-side identity vs. fake client-side hiding; query-string routing in one `doGet`.*
6. **First-script calendar automation** (`5iCcbsaRebA`), as literal assignment 1 — read a sheet, write to Calendar, triggered by a custom menu item. *Concept: simplest "server does something on a UI trigger," before HtmlService exists.*

## Traps a kid will hit
- Full-file copy-paste overwrites hand edits since the last generation — the default workflow in this batch's most representative videos, not a misuse of it.
- Forgetting to refresh the Sheet after pasting new code before a custom menu appears (`5iCcbsaRebA`).
- Greyed-out Run button on a new standalone project until saved to Drive (`mWHbwA_l_FM`).
- Client-side-only "hiding" of admin menus that looks like but isn't access control (`P17Gqfhaupc`).
- Fragile duplicated data: comma-separated category lists in one cell, or names that must exactly match across two independent lists (`DJYJ5_JjBOs` calls this "the trickiest part" itself) — patterns a forgetful AI will happily reproduce.
- Sharing a whole Sheet "anyone with the link can view" to publish charts (`DJYJ5_JjBOs`) leaks every raw row, not just the intended output.

## What to cut
`bKq2sNR6kDU` — no code, no explanation, pure promo; usable only as a screenshot of "this is achievable." The two meta-tools (`6XC-vN0Ox2k`, `JY0xTwPJPqk`) generate opaque schemas/code kids can't inspect — extract only the prompting-structure and access-control ideas, never teach the tools themselves. `Qu0mJj1nLbw`'s side panel is excellent documentation for the wrong audience — Ben should read it, but shouldn't expect it in the room. Google Sites (`DJYJ5_JjBOs`) is off-stack; use only for its input/config/output mental model.

## Honest caveats
Only `Qu0mJj1nLbw` shows a real error-and-fix cycle on camera; the rest of the workflow videos are happy-path, first-try demos (most obviously the two tool promos). None show what happens after many rounds of iteration, which is where "forgetful AI nukes the project" actually bites — this batch documents the loop's mechanics, not its long-run failure mode.
