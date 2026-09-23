# Instant Self-Grading Quizzes: Using Gemini and Apps Script to Automate Google Forms (Mr. Rozon, teacher, 7.2 min)

**What it is:** a real teacher's own workflow, filmed live including a moment of confusion, for turning an existing assignment into a self-marking Google Form using two separate Gemini prompts. Recent (references Gemini "thinking" mode toggle). Genuine how-to, not a product demo.
**Substance:** substantive: shows two distinct AI-assisted stages end to end, states an explicit verification habit, and documents one real, named trap plus its fix.

## Ideas, in the video's order
- [0:00:00] Motivating problem stated plainly: marking short-answer assignments takes too long; goal is to convert existing material into a multiple-choice format that grades itself.
- [0:00:32] **Stage 1 prompt**: upload the original assignment file to Gemini, ask "convert this assignment into a multiple choice quiz, there should be 15 questions and include answers" — a short, direct prompt, no elaborate role-setting.
- [0:01:09] Explicitly downplays this step's difficulty: "being able to make a multiple choice quiz... is really not that hard, you can use any AI to do that" — frames the *form-creation* step (next) as the actually hard part being solved.
- [0:01:42] Distinguishes this from Google Forms' own built-in AI (which can generate a quiz from a topic) — the point of this technique is converting an *existing* assignment's exact questions, not generating new ones from scratch.
- [0:02:16] Turned on Gemini's **"thinking" mode** deliberately "to increase the likelihood that my answers are going to come up better" — an explicit, named lever for output quality, not just a default setting.
- [0:02:49] **Named, repeated verification instruction**: "anytime you use AI, definitely, definitely verify everything, make sure it's correct" — stated twice for emphasis, framed as the teacher's/professional's job, not optional.
- [0:02:49] **Stage 2 prompt**: in the *same* chat, ask "create a script for me that I can use to create a Google Form from this quiz you made" — deliberately reusing context (the quiz just generated) rather than restating the questions.
- [0:03:53] **How code gets into the editor**: copy the code block from the Gemini reply, go to script.google.com, create a **new standalone project** (not bound to any Sheet or Form), delete the default boilerplate, paste the copied code in.
- [0:04:24] **Named, concrete trap + fix, shown live**: the Run button is greyed out; the presenter says "I was very confused why it was grayed out" — the fix is you must click **"Save project to Drive" first**, then Run becomes available. A real, first-hand-documented Apps Script UI trap.
- [0:04:24] Running for the first time prompts **one or two authorization dialogs** because the script needs to modify Google Drive (to create a new Form file) — presenter frames this as expected, not alarming.
- [0:04:55] Verifies success by going to Google Drive > Recent and finding the newly created Form — again, verifying the real artifact, not just a "done" message.
- [0:05:26] Confirms the generated Form already has the correct answer key pre-checked per question (True/False internally, per the earlier frame read) — the script wrote both the questions and the grading key.
- [0:05:59] States it scales trivially ("you could do a hundred questions") since it's the same two-prompt technique regardless of size.
- [0:05:59] **Recap given explicitly on camera** (good as a reusable "recipe card" for class): (1) attach an existing assignment, ask for multiple-choice conversion with N questions and answers included; (2) once happy with the quiz, prompt "create a script for me that I can use to create a Google Form from the quiz you've made"; (3) paste that script into a new project at script.google.com and run it.

## What the frames add
Frames confirm the exact two-stage chat flow: a Gemini chat generating a 15-question quiz with visible questions like "Define term X"/"What is Bitcoin?" at [00:00:00-00:30]; the "Where should we start?" Gemini landing page and a visible flow diagram Gemini itself renders showing its own reasoning steps ("Identifying Quiz Content," "Defining Shared Concepts," "Setting Application Examples") at [00:01:10-01:50] — a nice visual of the model literally showing intermediate planning; the interactive quiz preview with answer-checking (green/red marks) at [00:02:00-02:30]; the code-writing phase turning into raw JS with a `questions` array (question, options array, `correct: true/false` flags per option) visible at [00:03:20-03:50]; the actual Apps Script IDE with the pasted code, the **greyed-out Run button**, then the authorization dialog, then a successful execution log at [00:04:00-04:50]; and the resulting real Google Form, correctly checked answers, opened from Drive at [00:05:00-05:10].

## For our class (14-15, Gemini writes the code, Apps Script + Sheets)
### Backend concepts it shows or explains
A clean example of an **unbound/standalone Apps Script project** (not attached to any Sheet or Form) that uses `FormApp` (implied) and `DriveApp` to create a brand-new artifact from scratch — contrasts usefully with every other video in this batch, which are all Sheet-bound web apps. Also demonstrates that Apps Script projects need explicit authorization scoped to what they actually touch (Drive, here), and that a script can act as a **one-off generator/build tool** rather than a running app.

### Becomes something kids do (activity, mini-project, milestone), concrete enough to run next week
**Self-grading quiz generator, teacher tool angle**: give kids a short piece of text (an article, their own notes) and have them run this exact two-prompt recipe to (1) get Gemini to turn it into N multiple-choice questions with answers, then (2) ask Gemini for the Apps Script that builds a real, auto-graded Google Form from it, and run it as a **standalone project** (new script.google.com project, not bound to anything). Backend concept taught: **a script as a one-time generator that creates a new Google resource programmatically** (Form via `FormApp.create`), distinct from a persistently-running web app — a good bridge exercise before web apps are introduced, and a nice "your first script actually does something in the real world" win.

### Traps a kid will hit
- The exact greyed-out Run button trap is highly likely to recur for our kids on any standalone (non-bound) project — worth pre-teaching "Save to Drive first" as a fixed first step whenever Gemini hands you a script for a brand-new project.
- Two authorization popups in a row (not just one) can look like something went wrong; the video shows this is normal for a script touching Drive.
- Copying a whole quiz-plus-code answer as one long block from a chat reply risks losing earlier edits if a kid later asks for a tweak and pastes over their file wholesale — same full-file-replace risk noted in 5iCcbsaRebA.

### Doesn't transfer, and why
Nothing major — this is one of the most directly applicable videos in the batch. The one limit: it produces a *Google Form* (Google's own quiz UI), not an Apps Script HtmlService web page, so it's a detour from the "build your own frontend" thread of the course, useful mainly as a fast utility/teacher-tool exercise rather than a step toward the final web-app project.

## Honest caveats
Presenter is a teacher, not a professional developer, and says so ("I don't know if you necessarily need that or not") when unsure about a detail (whether "include answers" is strictly required) — a good real-world reminder that even the person demonstrating the workflow is genuinely learning it live, which matches the level our 14-year-olds will be working at.
