# Apps Script Doc word Counter App Example (Laurence Svekis, 8.9 min)

**What it is:** Short tutorial, bound script attached to a Google Doc; no web app/deployment involved at all.
**Substance:** thin: a single small feature (count words in a doc, write the count back into the doc), built live but with no backend/client concept - pure `DocumentApp` API practice.

## Ideas, in the video's order
- [0:00:00] Goal: replicate Google Docs' built-in Tools > Word count as a custom Apps Script function, then write the result back into the document.
- [0:02:13] `DocumentApp.getActiveDocument().getBody()` then `.getText()` - gets all doc text as one string (bound-script-only pattern, generic).
- [0:04:57] Naive `split(' ')` overcounts when the doc has double spaces (49 vs Google's own 51 count diverge because of this) - a small but real "your code and the built-in tool disagree, and here's the exact reason" moment.
- [0:06:04] Fix: `text.replace(/\s+/g, ' ')` (regex, collapse runs of whitespace) before splitting - the only regex used in the whole batch.
- [0:07:10] Two ways to write the result back: `body.getParagraphs()[0].setText(...)` (overwrite the top paragraph) vs `body.appendParagraph(...)` (add a new one, so the count grows every re-run since it's appending its own line, a minor but visible bug the author doesn't fully resolve).

## What the frames add
Nothing beyond the transcript: mostly the Doc content and the execution log side panel showing the returned word count matching (or not matching) Google's own Tools > Word count dialog.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
None relevant to client/server or APIs - this is local document manipulation only.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
Not worth a dedicated project; at most a 10-minute Docs-API warm-up exercise, and only if the class ever touches DocumentApp at all (unlikely given the Sheets-as-database, web-app focus described in CONTEXT.md).

### Traps a kid will hit
The double-space/regex counting mismatch is a nice small "why doesn't my number match" debugging exercise if ever reused, but low priority.

### Doesn't transfer, and why
No web app, no fetch, no Sheet-as-database, no client/server split - doesn't serve the final-project architecture at all.

## Honest caveats
Video doesn't fully fix its own appendParagraph-grows-every-run bug; treat as a partial, not a clean reference implementation.
