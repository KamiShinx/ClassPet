# Apps Script Coding Examples WebApp Client Server Side Code Communication with Apps Script and HTML (Laurence Svekis, 14.3 min)

**What it is:** Tutorial dedicated specifically to the client↔server round trip using `google.script.run`, including success and failure handlers.
**Substance:** substantive: builds two full round trips (write-to-sheet, and read-current-user) with success and deliberately-triggered failure paths.

## Ideas, in the video's order
- [0:00:00]–[0:01:40] Frames the whole video as "client side to server side" communication: client buttons call server functions via `google.script.run`, server functions return values picked up by client-side "success handler" functions.
- [0:04:23] `google.script.run.fun1()` — calling a server function from client JS with no return value used (fire-and-forget), first without passing data.
- [0:04:56]–[0:06:04] Server function `fun1()` opens a Sheet and does `ss.appendRow(['done'])` — every button click writes a new log row; demonstrated running twice to show it's cumulative, not overwriting.
- [0:06:36] Adds `new Date()` as a second logged column — practical timestamp pattern for any submission log.
- [0:07:46]–[0:08:19] Wires an input field's value into the call: `google.script.run.fun1(myInput.value)` — the actual "send form data to the server" pattern, mirrored across several videos in this batch.
- [0:08:52]–[0:09:58] Client-side `success(response)` function, wired via `.withSuccessHandler(success)`, updates the page's `<h1>` with whatever the server returned (the server returned `Date()`, but explicitly noted "this can be any value").
- [0:10:31]–[0:11:36] Deliberately breaks the server function (typo'd variable, bad spreadsheet id) to show `.withFailureHandler(failCall)` catching the error — genuinely useful because most tutorials only show the happy path.
- [0:12:46]–[0:13:50] Second full example: `find my user` calls `Session.getActiveUser().getEmail()` server-side and returns it to populate an input field — a real "who's currently using this app" demo relevant to any project with per-user data (e.g. individual scores).

## What the frames add
[0:02:00]-[0:02:45] frames show the actual browser UI with the two buttons ("Adder", "Get User") and their live results ("Laurence Svekis" typed into an input, then "Laurence1000" appearing after "Get User" is clicked) — a clean before/after of a working client-server round trip, useful as a reference screenshot. No diagrams; otherwise straightforward code screenshots matching the transcript.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- The success/failure handler pattern is the cleanest, most complete explanation of `google.script.run`'s asynchronous nature in the batch — directly useful for explaining "the server call doesn't finish instantly, so you register callbacks for what happens after."
- `Session.getActiveUser().getEmail()` — server-side identity of the visiting Google account, a real and simple way to attach a name to submitted data without building a login system.
- Appending timestamped rows to a Sheet as a lightweight event log — reusable everywhere (submissions, game scores, attendance).

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
"Class check-in" mini-project: a button that logs the current Google account's email + timestamp to a Sheet when clicked — teaches identity, writing rows, and the success/failure handler pattern in one very small build. Natural precursor to any leaderboard/poll project since it establishes "who is submitting."

### Traps a kid will hit
- Forgetting `.withFailureHandler` and having errors silently vanish (nothing happens, no console message a beginner would notice) — the video explicitly demonstrates why you want this.
- Hardcoding a wrong Sheet id and getting a cryptic "cannot get open by id" error — shown live.
- `Session.getActiveUser().getEmail()` requires the visitor be logged into a Google account the deployment allows — will interact with the "who has access" deployment choice covered in O2cPaUrZGdA; if the class wants anonymous kid-friendly nicknames instead of real emails, this needs a design decision.

### Doesn't transfer, and why
Like NlATpkrxdes, this is `google.script.run`-based, not fetch/doPost — won't work once a project's frontend moves to Netlify for the final build. Should be explicitly framed to students as "the shortcut version that only works while everything lives inside Apps Script."

## Honest caveats
No JSON, no ContentService, no doGet/doPost shown at all — purely the `google.script.run` RPC channel. Pairs well conceptually with O2cPaUrZGdA (which is pure doGet/ContentService) to show students the two different client-server mechanisms Apps Script offers, but they should not be conflated.
