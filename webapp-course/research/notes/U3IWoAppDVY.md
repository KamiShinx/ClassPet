# Forms Service: Creating forms with Apps Script — Dynamically Generate Forms with Apps Script Code (Laurence Svekis, 24.1 min)

**What it is:** Code-along covering the FormApp service: building forms entirely from code (not the visual builder), adding question types, page breaks, and a full quiz mode with points/feedback/validation.
**Substance:** substantive as a FormApp reference; less about backend concepts, more about one specific Google service's API surface.

## Ideas, in the video's order
- [0:01:37] `FormApp.create(name)` creates a form object; items are added via `form.addTextItem()`, `.addCheckboxItem()`, `.addMultipleChoiceItem()`, etc., each returned as an item object you configure with `.setTitle()`, `.setRequired()`.
- [0:03:19] `form.getPublishedUrl()` (the link respondents use) vs `form.getId()` (used to reopen the form later with `FormApp.openById(id)`) — same open-by-id pattern as Sheets/Docs in this batch, worth pointing out as a recurring convention.
- [0:07:45–0:08:20] Reopening an existing form by ID to add more questions across multiple functions/runs — shows forms can be built up incrementally across separate script executions, not just in one shot.
- [0:08:52] `setChoices([...])` takes an array of choice strings for a multiple-choice/checkbox item — array-of-strings pattern.
- [0:09:24–0:10:35] Building feedback-aware choices: `item.createChoice(value, isCorrect)` where `isCorrect` is a boolean — sets up correctness tracking used later for the quiz.
- [0:11:39] `form.addPageBreakItem().setTitle(...)` creates a new page within the form — useful for breaking a longer form/survey into sections.
- [0:13:19–0:16:04] Building an actual quiz: `form.setIsQuiz(true)`, `item.setPoints(n)`, and constructing feedback objects via `FormApp.createFeedback().setText(...).build()` then `.setFeedbackForCorrect(...)` / `.setFeedbackForIncorrect(...)` — full quiz mechanics with per-question point values and canned feedback messages.
- [0:18:49–0:19:56] Response validation: `FormApp.createTextValidation().requireNumberEqualTo(n).build()` (later corrected to `requireNumberBetween(min, max)`) applied via `item.setValidation(...)` — restricts what a respondent can type into a text answer, with the UI showing a validation error message if they violate it.
- [0:22:06] Explicit best-practice tip: build the form's skeleton by code, but for fiddly manual tweaks (fixing answer keys, adjusting feedback text) it's often easier to just edit the form afterward in the visual Form editor rather than fight with code for every small change — a pragmatic "code isn't always the best tool" admission worth repeating to kids using an AI that will otherwise over-engineer everything via code.
- [0:23:12] A live example of the validation bug: the number-equals-15 validation was too strict; demonstrated the resulting user-facing error, then fixed it to a range check.

## What the frames add
Frames confirm the actual generated forms (a simple one-question form, then a full quiz "Quiz 1" with a favorite-app multiple-choice question worth points), the FormApp method autocomplete lists (addCheckboxItem/addDateItem/addPageBreakItem/etc, and separately setChoiceValues/setFeedbackForCorrect/setPoints/setRequired/setTitle/setValidation), the quiz's actual "Responses" grading view with the answer key and feedback fields editable in the Form UI, and the on-screen validation error ("must be between the values") when testing an out-of-range number. Frames also show `MailApp` being used again here to email the form's published URL to the creator — a repeated pattern across this batch (create-a-Google-thing, then email yourself the link).

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
- Not much "backend" conceptually — this is entirely about the Forms API surface (a specific Google service), similar in category to the DocumentApp video. The one transferable idea: **server-side validation** (`createTextValidation`) is a real backend/data-integrity concept — the form itself enforces "this must be a number in this range" before the response is even recorded, which is the same idea as validating input before it reaches a database.
- Building a form dynamically from an array of question data (implied but not explicitly done here — the presenter hardcodes each question) suggests a natural extension: generate a quiz FROM a Sheet of question data, which would combine Sheets-as-database with Forms generation.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
- **Auto-generated class quiz**: write a script that reads a small array/Sheet of {question, choices, correctAnswer, points} and builds a Google Form quiz from it via `FormApp`. Teaches: iterating over structured data to generate UI, `setIsQuiz`/points/feedback, and is a fun, shareable teen-appropriate output (a real quiz they can send to friends). Good week 2-4 project once kids are comfortable with arrays/objects.
- Less central to the "build a web app with a real backend" goal than the Forms->Sheet->email video (I2r5vJAA8T0), since this one skips the trigger/automation side entirely and is purely form construction.

### Traps a kid will hit
- Validation rules that are too strict/wrong (e.g. requiring an exact number instead of a range) silently reject valid-looking answers — shown live in this video, a good one to flag explicitly.
- Method names are easy to get subtly wrong (`setChoiceValues` vs `setChoices` vs `createChoice`, differing by item type) — a kid (or their AI) mixing up which item type uses which method is a very plausible hallucination trap; the FormApp reference should be checked, not guessed.
- Editing a form after generating it by code, then re-running the generator script, may create duplicate questions rather than update existing ones (this video reopens by ID to *add* to a form each run — easy to accidentally double up content if the script is re-run without changing what it appends).

### Doesn't transfer, and why
- Quiz/points/feedback mechanics are closer to an "assessment tool" than a "web app with a backend" — fun and usable as one of several small projects, but shouldn't anchor the "what is a backend" teaching goal since it doesn't touch deployment, doGet/doPost, or client-server separation at all.

## Honest caveats
Long (24 min) relative to how much is genuinely new after the first ~10 minutes — much of the back half is incremental variations on the same "add item, set choices, set validation" pattern. Useful as a FormApp reference to dip into for a specific method, less useful as something to show kids start-to-finish. No outdated material.
