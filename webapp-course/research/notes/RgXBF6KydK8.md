# Learn more about Google Apps Script: Getting Help with Apps Script — Tips, Resources and Source Code (Laurence Svekis, 3.2 min)

**What it is:** A pointer video — where to find docs/help (Stack Overflow, developers.google.com/apps-script) plus a 30-second demo of the LanguageApp translate service. Not a build tutorial.
**Substance:** thin: mostly a list of links and a one-line code snippet; the actual content is "here's where to look things up," not a taught concept.

## Ideas, in the video's order
- [0:00:00] Stack Overflow's `google-apps-script` tag is called out as one of the best resources (generic pointer, not evaluable content).
- [0:00:32] developers.google.com/apps-script: has guides, reference (all Workspace services/classes/methods), samples/quickstarts, release notes.
- [0:01:04] The reference docs are organized service -> class -> methods, and you have to drill down through that hierarchy to find a specific method's signature — useful to tell kids this is how they (or Gemini) should verify an API call actually exists, rather than trusting a hallucinated method name.
- [0:01:37] Demoed: `LanguageApp.translate(text, sourceLang, targetLang)` — copy a snippet from the docs, wrap it in a function, run it, see translated output in the log. Shown as an example of "grab a snippet from the docs and try it."
- [0:02:10] Also mentions Utility services, scripting resources for triggers/manifest/quotas and limits — namechecked but not explained (no numbers given here for what the quotas/limits actually are).
- [0:02:44] Editor's own Support menu (documentation/training/updates/tour) as another way in.

## What the frames add
Frames show the actual Stack Overflow tag page (44,988 questions), the developers.google.com/apps-script landing page (Automations/Custom functions/Add-ons/Chat tools cards), the reference sidebar/method-list drill-down, and the LanguageApp translate method signature in the docs alongside the working code (`LanguageApp.translate('This is a test', 'en', 'es')` logging `Hola Mundo`). Confirms the "how to navigate the reference docs" workflow visually but adds no concept not in the transcript.

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- None substantive — this is a "where to find help" video, not a concept-teaching one.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **"Check it yourself" habit**: when Gemini writes a line of Apps Script code that calls some `XApp.method(...)`, teach kids to paste the service name into the Apps Script reference docs and confirm the method and its parameters actually exist before trusting it — directly useful given our "assume a weak, forgetful AI that hallucinates" planning constraint. This is the one idea from this video worth carrying into class, even though the video itself doesn't frame it that way.
- Not really a project seed; more of a research/debugging habit to teach in passing.

### Traps a kid will hit
- Not shown in this video (no code breaks on screen) — nothing new here.

### Doesn't transfer, and why
- The specific resources listed (Stack Overflow, developer docs) are standard, appropriate, and don't need adaptation — but the video itself is too generic/short to build a lesson around directly.

## Honest caveats
This is the weakest video in the batch by content density — 3.2 minutes of mostly link-pointing with one small demo. Treat as a footnote/reference link for teachers, not something to show kids directly. No outdated material (Stack Overflow and the docs site are both current).
