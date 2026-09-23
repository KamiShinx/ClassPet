# Batch S1 — Laurence Svekis, Apps Script channel (3 videos: one ~2-hour overview course + a 2-part email mini-project)

**Theme note:** the batch label promises "web apps, JSON APIs, doGet/doPost, plus Docs/Forms/email automation." What's actually here: one long general overview course (`UIfslpbVu_U`, 114.9 min) that touches Docs, Gmail, Sheets writes, libraries, triggers, and a very thin `doGet` (text/HTML only, no JSON), plus a tight 2-part email-automation mini-project (`s8oTvFzKeKM` + `A9UdmnzIdfw`, 18.7 + 9.2 min). There is **no Forms content and no `doPost` anywhere in this batch** — say so plainly rather than implying the theme label is fully covered. If JSON-API/`doPost` material is needed for the course spine, pull it from batch S4 (`0aNN8MHdv_w` -> `frejbw3eJTY` -> `JOOUtlOKbak` -> `AfA8twIVxRg`), which covers that ground much better.

## How much is teachable content vs. filler, honestly
The 2-part email project is dense and well-paced — almost no filler in either video. The 2-hour overview course is the opposite: of its 115 minutes, only about 45-50 minutes is actual concept/API teaching (Docs object model, `Session`/`GmailApp`, Sheets `appendRow`+`JSON.parse`, `doGet`/`ContentService`/`HtmlService`, deployment versions, triggers, a real debugger walkthrough). The remaining ~65 minutes is a slow, narrated tour of IDE chrome — menus, sharing dialogs, the command palette, GCP project settings, editor themes — clicked through one option at a time with little payoff per minute for a class where Gemini, not the student, drives the actual editor. It isn't silent live-typing, but it has the same low information density and should be treated the same way: don't assign the full video, extract the ~10 flagged segments (see `notes/UIfslpbVu_U.md`).

## The strongest ideas for this class

1. **The confirm-before-act pattern** (`s8oTvFzKeKM` [0:05:55]-[0:07:32]): a custom Sheet menu item pops a Yes/No dialog with the specific data about to be affected ("Send to Laurence (email)?") before the server does anything irreversible. This is a small, concrete, teen-buildable version of a real backend habit (confirm before delete/send/pay) and should be taught as a named pattern early in the course.
2. **The row-read -> act -> write-back loop** (`A9UdmnzIdfw` [0:06:10]-[0:07:16]): read a spreadsheet row, do something (send an email), then write an outcome back into that same row (`setValue('sent')`). This is the clearest, simplest version in either this batch or S4 of "writing rows, reading them back" — recommend as the very first write-back exercise before anything more complex.
3. **Two graduated versions of "reshape raw spreadsheet data into something usable"**: `s8oTvFzKeKM` ([0:11:50]-[0:12:55]) does it at the simplest possible scale (one row, unwrap `data[0]`, build a `{first,last,email}` object) while S4's `frejbw3eJTY` does it across a whole dataset into JSON. Sequence them in that order — this batch's version is a good on-ramp before S4's harder one.
4. **The "why templates beat string concatenation" before/after**, split across the two email videos: `s8oTvFzKeKM` ends with a hardcoded `"Hello World"` email body; `A9UdmnzIdfw` immediately upgrades it to a real HTML template with injected data (`<?= user.first ?>`). Shown back-to-back with the old code left commented out on screen, this is a genuinely good "here's the upgrade" teaching moment worth reusing directly.
5. **A real, on-screen debugging session** (`UIfslpbVu_U` [0:50:55]-[0:59:44]): a variable that should increment is silently getting reset; the instructor sets a breakpoint, steps through, and finds the exact line. One of the only segments in the long video worth assigning in full — it's the kind of "read the state, don't guess" habit a Gemini-dependent class badly needs.
6. **The Gmail `+`-address trick** (`s8oTvFzKeKM` [0:02:42]): `name+test1@gmail.com` still delivers to `name@gmail.com`, letting one real inbox simulate many distinct "users" for testing. Directly reusable for the class — kids can test multi-user email/notification features without needing a roster of real addresses.

## Where videos agree or contradict

- **Consistent pattern across all three videos:** a fresh OAuth consent screen appears every time a *new* Google service/scope is touched (Docs, then Mail, then Sheets-write, then YouTube), not just once per project (`UIfslpbVu_U` [0:19:55],[0:29:17],[0:37:06],[1:29:05]; `s8oTvFzKeKM` [0:17:18]). Worth pre-teaching explicitly on day one so kids don't think each new prompt means something broke.
- **No contradiction, but a real gap the batch shares with itself:** `UIfslpbVu_U`'s `doGet` example ([1:37:29]-[1:46:00]) never returns JSON and never pairs with `doPost` — it's a weaker, thinner treatment of deployment than S4's dedicated videos on the same topic. Don't use this video as the primary deployment reference; use it only for the "what is `doGet` at all" first pass, then hand off to S4 material for the real JSON/`doPost` build.
- **A real, unaddressed gap across the whole batch:** none of the three videos discuss what happens if a step fails partway through a multi-step action (e.g., `MailApp.sendEmail` throwing after the confirm dialog but before the "sent" status is written). This needs a standalone class discussion; don't assume any video here covers reliability/error-handling.

## What to cut

- **The IDE-chrome tour inside `UIfslpbVu_U`** ([0:39:21]-[0:51:00] menus/sharing, [0:59:44]-[1:08:00] autocomplete tour, [1:08:00]-[1:16:42] left-nav/GCP settings, [1:46:25]-[1:55:00] editor productivity tips): skip assigning these to students outright; Gemini already knows the editor, and none of it is a backend concept.
- **The library-deployment workflow** ([1:16:15]-[1:37:00]): the video's own instructor calls this "best avoided in large-scale projects" — don't teach it to kids at all beyond a passing mention that separate `.gs` files exist for organizing code.
- **The cosmetic font/color tweaking at the end of `A9UdmnzIdfw`** ([0:07:49]-[0:08:54]): low new-concept value, fine to skip or skim.

## Concept explainers worth reusing

- Standalone vs. bound/linked scripts, tied to a concrete reason ("this needs the currently selected cell, so it has to be bound") — `s8oTvFzKeKM` [0:03:45], reinforced abstractly in `UIfslpbVu_U` [0:04:23]-[0:08:49].
- "`getRange`'s four arguments are: top-left starting row, starting column, how many rows, how many columns" — `s8oTvFzKeKM` [0:09:41]-[0:11:18], plain and reusable near-verbatim.
- `getValues()` returns an array of row-arrays even for a single row, so `data[0]` unwraps it before individual fields are usable — `s8oTvFzKeKM` [0:11:50]-[0:12:55], a clean, simple first version of the "raw storage shape vs. usable code shape" lesson.
- Template variable injection: "name it on the server (`template.user = user`), reference that same name in the template (`<?= user.first ?>`)" — `A9UdmnzIdfw` [0:03:55]-[0:05:02].
- "Logs from a function triggered by a Sheet menu click don't show anywhere in the Sheet — run the function directly from the editor to see them" — `s8oTvFzKeKM` [0:06:59]-[0:08:03], an important, concrete debugging-workflow rule.

## Project seeds (backend concept each teaches)

1. **"Approve & notify" class tool** (direct lift from `s8oTvFzKeKM`+`A9UdmnzIdfw`): a Sheet of names/emails, a custom menu button, a Yes/No confirm dialog, a personalized HTML email, and a "sent" status written back to the row. Teaches: bound-script custom menus, confirm-before-act, reading/writing specific cells, HTML templating with injected data.
2. **Personalized certificate/shout-out emailer**: kids design their own `temp.html` styling and send themselves (or a `+`-addressed test inbox) a certificate populated from a Sheet row. Teaches: HTML templates as a distinct concept from web-app UI HTML, server-side data injection, inline CSS.
3. **"My first API" milestone**: deploy a `doGet` that returns "Hello, \<name\>" as plain text, then upgrade to a full HTML page (from `UIfslpbVu_U` [1:37:29]-[1:46:00]). Teaches: request entry point, deployment as a distinct step from saving code, dev vs. exec URLs. Flag explicitly to kids/staff that JSON output and `doPost` are *not* covered here and come from other course material.
4. **Debugging kata**: hand kids a broken for-loop (variable reset instead of incremented, lifted from `UIfslpbVu_U` [0:55:18]-[0:58:00]) and have them find it with breakpoints rather than by reading code. Teaches: breakpoints, stepping, reading variable state instead of guessing.
5. **"Log my data" write-loop, without the API/library detour**: adapt `UIfslpbVu_U`'s `appendRow` loop ([1:32:29]-[1:35:51]) to any small array of strings/objects kids type in by hand, skipping YouTube/library complexity entirely. Teaches: writing structured data into a Sheet in a loop, the Sheets-as-database write path.
6. **Class time-triggered digest (from `UIfslpbVu_U`'s triggers section, [1:10:13]-[1:12:53])**: a function that runs on a schedule (e.g., daily) and emails a summary of a Sheet's contents, with no button click involved. Teaches: server-side automation independent of any client action, the client/server split made concrete by "this runs even when nobody's looking at the page."

## Traps (Apps Script / AI-building problems a kid will hit)

- A new OAuth consent screen appears with every newly touched service/scope, worded scarily ("Google hasn't verified this app") — expect it repeatedly, don't treat it as a bug.
- Custom-menu-triggered functions produce **no visible log output** in the Sheet itself; logs only appear when the function is run directly from the script editor. A kid debugging their own menu button will be baffled by "nothing's happening" when logs are actually just invisible from where they're looking.
- `onOpen()`-built menus don't refresh live — editing the menu code requires reloading the Sheet or manually re-running `onOpen` once to see the change, not just re-clicking.
- `getRange(...).getValues()` returns a nested array even for one row; forgetting the `[0]` unwrap is a silent, no-error "wrong shape of data" bug — exactly the kind Gemini-generated code is also likely to produce when reshaping Sheets data.
- Hardcoded column numbers in `setValue()` calls put data in the wrong column with zero error if a kid's sheet layout differs even slightly from the video's — another silent failure mode worth calling out explicitly.
- No duplicate-action guard anywhere in the batch: running "Approve" twice on the same row sends the email twice with nothing stopping it. Not raised in any video — worth introducing as the class's first taste of idempotency.
- `doGet` deployment freezes at the exec URL's last deploy; code edits won't show up on the public URL until redeployed. Touched on thinly here — treat `UIfslpbVu_U`'s version as a first pass only, and use S4's deployment videos as the fuller reference before kids build anything they'll actually share.

## AI-assisted building
None of the three videos show any AI tool in use — all code is hand-typed by the instructor. There is nothing in this batch to report on how Gemini/Claude/Antigravity actually behave, what they get wrong, or how a human recovers from a bad AI edit. Useful only as ground-truth reference code for judging what an AI produces, not as a model of the AI-assisted workflow itself.
