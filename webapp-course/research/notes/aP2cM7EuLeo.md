# Update for Sheets Data as JSON for Web API using JavaScript fetch (Laurence Svekis, 12.6 min)

**What it is:** a follow-up/maintenance video revisiting the gviz/tq no-Apps-Script approach (same family as `CtLRDP0jLNc`, `3QWzYqZd0w4`, `89wp3_5Vp5w`) after "changes" to how the endpoint behaves. Functionally a cleaner, consolidated retelling of the same technique.
**Substance:** substantive as a review/consolidation, though it covers ground already taught earlier in the same channel — useful mainly as "the current correct version" plus a real lesson about tutorials going stale.

## Ideas, in the video's order
- [0:00:00] Opens by naming the point directly: "there have been changes to outputting data from your spreadsheet... so everything still works, and there's actually more options." Explicitly framed as an update to earlier content — worth using as a talking point: real APIs/services change, and tutorials (even good ones) go stale.
- [0:02:11] Same `docs.google.com/spreadsheet/d/<id>/gviz/tq?` endpoint construction as the earlier videos in this family, confirming the technique itself is stable even if small details shift.
- [0:03:48] Same "response isn't valid JSON, strip 47 characters off the front and 2 off the back" hack as `CtLRDP0jLNc` — repeated verbatim, so it's evidently the standard (if fragile) technique across this whole gviz sub-series, not a one-off.
- [0:04:56] Notes a genuinely practical tip not stressed elsewhere: remove empty/unused columns directly in the spreadsheet itself to avoid the gviz response including bogus blank columns — a simple, actionable "clean data in, clean data out" habit.
- [0:06:05] Builds an actual `<table>` element (`createElement('tr')`/`createElement('td')`) instead of styled divs — a small but real upgrade over the div-grid hack used in `3QWzYqZd0w4`, and closer to semantically correct HTML.
- [0:08:51] Fixes a live bug where he references `main` instead of `main.c` for a row's cell array — another concrete, real, on-camera debugging moment (matches the pattern seen across this whole channel: mistakes happen and get fixed on screen, not edited out).
- [0:09:26] Adds the query-language layer on top (`select A,B`, `where C > 3`, `limit`), same idea as `89wp3_5Vp5w`, reconfirming query-string filtering works the same way after the "changes."

## What the frames add
Frames closely track a fairly ordinary code-writing session; nothing visually new versus the earlier gviz videos in this batch — same devtools console, same VS Code + Live Server setup. The one distinct visual: a proper HTML `<table>` render at [0:07:00]-[0:09:00] rather than the div-grid layout seen in `3QWzYqZd0w4`.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
Reinforces everything from the gviz sub-series (public-sheet endpoint, response unwrapping, query-language filtering) plus one new practical point: real services change over time, so code (and tutorials) need occasional updates — a useful, honest thing to tell kids about "vibe coding with AI," since Gemini's suggestions can also go stale.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
If teaching the gviz approach at all, use THIS video's version as the reference implementation rather than the earlier ones in the sub-series — it's the more polished, most-debugged version of the same technique (proper `<table>`, cleaner column handling).

### Traps a kid will hit
Confusing `main` (the whole row object) with `main.c` (the cell array inside it) — an easy mistake with gviz's nested shape, demonstrated live; leaving stray/empty columns in a sheet and getting extra junk columns in the response.

### Doesn't transfer, and why
Same limitation as the rest of the gviz family: read-only, requires public sharing, no write path — not the technique for anything needing privacy or writes.

## Honest caveats
This video is largely redundant with `CtLRDP0jLNc`/`3QWzYqZd0w4`/`89wp3_5Vp5w` — if only one gviz video is shown in class, this is probably the best single one to use since it's the most refined, but showing all four back-to-back would be repetitive for a 14-year-old audience.
