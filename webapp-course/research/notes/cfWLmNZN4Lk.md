# Apps Script Lesson Select Emails using Regex on Doc Body text apply style for highlighting selection (Laurence Svekis, 9.8 min)

**What it is:** Short live-build tutorial, bound script on a Google Doc: adds a custom UI menu button that regex-searches the doc body for email addresses and highlights them (yellow background). No year overlay; APIs current.

**Substance:** thin for our purposes: a neat, self-contained regex/UI-menu demo, but pure Docs scripting with no server, no data source beyond the doc itself, and no relation to a web app's client/server/database split.

## Ideas, in the video's order
- [0:01:22]-[0:02:17] `onOpen()` + `DocumentApp.getUi().createMenu(...).addItem(...).addToUi()` — the standard custom-menu boilerplate, same pattern as several other videos in this batch.
- [0:03:16]-[0:03:45] Gets the doc body as plain text (`body.getText()`), builds a regex for email addresses, `bodyText.match(exp)` to get an array of matches.
- [0:05:13]-[0:05:43] Builds a style object using `DocumentApp.Attribute.FOREGROUND_COLOR` / `BACKGROUND_COLOR` keys with hex values — generic "how Apps Script represents rich text styling" fact.
- [0:06:09]-[0:08:25] Loops paragraphs, then loops matches per paragraph, `paragraph.findText(email)` to get a `RangeElement` (text location), checks it's not null and offset isn't -1, then `textElement.setAttributes(startOffset, endOffsetInclusive, style)` to apply the highlight. This start/end-offset styling API is the one moderately reusable idea: "how do you style just part of a text run" comes up any time you'd want to highlight/flag text server-side.
- [0:09:22] Demonstrated live: adds new plain-text emails to the doc, reruns, all get highlighted — confirms the regex approach generalizes.

## What the frames add
All code-editor + live Doc screen capture; a documentation tooltip for `DocumentApp.Element` is visible at [0:08:00]-[0:08:30] (auto-generated help text, not authored content). No diagrams. Nothing beyond the transcript.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
None specific to web apps/backends. It's a client-less script triggered by a doc's own UI menu, not a request/response cycle.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- Not a strong fit for the app-building arc. At most, the regex-match idea (`text.match(/pattern/g)`) is reusable if a project needs to validate or scan user-submitted text server-side (e.g. flagging emails/links in a message-board app's doPost handler) — worth mentioning in passing, not worth a dedicated activity.

### Traps a kid will hit
- `findText` returning `null` when no match exists — the video's own explicit null-check [0:07:28] is a good small lesson in "check before you use" that generalizes to any lookup.
- Regex correctness (a bad or copy-pasted email regex silently under- or over-matches) — the video doesn't discuss this risk at all, just uses "one of the ones online."

### Doesn't transfer, and why
- Entirely Docs-object-model scripting (paragraphs, text ranges, attribute styling) — none of it maps onto Sheets-as-DB, HtmlService frontends, or doGet/doPost, which are the actual backend concepts this course needs.

## Honest caveats
This is a **Docs automation video with essentially nothing to do with web apps** — no server, no deployment, no client. Keep it out of the main teaching sequence; at most a one-line mention of the regex-match and offset-based text-styling APIs if a project happens to need them.
