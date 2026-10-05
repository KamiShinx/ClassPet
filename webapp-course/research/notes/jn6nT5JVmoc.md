# The easy and effective way to run a usability test (Samuel Fabayo, 13.2 min)
**What it is / substance:** a product designer's sponsored walkthrough of running an unmoderated usability test end-to-end (plan -> set up in a paid tool -> recruit -> analyze), using a fake swim-coaching app as the example, A/B-testing two subscription-screen designs.
**With a guide.** The planning framework and how-to-read-results parts are solid and reusable; the middle third is a live ad for a $$ research platform (Listnr) that kids will never use, and it walks through a Figma prototype workflow kids don't have either.

## The ideas (in order, with [h:mm:ss])
- [0:01:08]-[0:02:12] **Plan before you build anything.** Write 3-5 research objectives (not more — "not trying to learn too many things at the same time"), decide who you want to test with (qualifying criteria), and write out the "test details": a summary, a welcome message, instructions, follow-up questions, and an optional thank-you message. He keeps this in a doc so he can copy-paste it into the tool later.
- [0:03:18]-[0:04:54] **Screener questions** filter out the wrong participants before they even start — e.g. he deliberately picks people who *don't* already track workouts with an app, because people who already have a habit would be biased testers for a new tracking app. Jargon: *screener question* = a qualifying question asked before the real test starts.
- [0:05:27]-[0:06:31] **Goal screen** = the screen that means "task done" — you mark it so the tool knows when a tester has succeeded.
- [0:07:36]-[0:08:11] He tests **two variants** of the same flow (only the subscription screen differs) to compare which one performs better — a real A/B test, not just one design.
- [0:10:22]-[0:12:32] **Reading results**: task completion time (average seconds/minutes), and averaged 1-5 ratings for ease, clarity, confidence, overall experience, and likelihood to subscribe. Prototype A wins on every metric, so that's the one that ships. This is the clearest part of the video for teaching "how do you decide with numbers, not vibes."

## Vocabulary for prompting Gemini
- **Usability test** → watching real users try to do a task in your app, unsupervised or supervised → "let's usability-test the sign-up screen before I show it to the class."
- **Research objective** → the specific question a test is trying to answer → "my objective is: can a new user find the leaderboard in under 10 seconds?"
- **Screener question** → a question that decides if someone is the right kind of tester → not directly Gemini-prompt vocabulary, but useful for planning who to test with.
- **Task completion time** → how long it took a user to finish a task → "add a timer that logs how long the user takes from clicking Start to clicking Submit."
- **A/B test / variant** → two versions of the same screen shown to different people to see which works better → "make version B of the score screen with the button moved to the top, so I can compare it to version A."

## Before/after examples from the frames
The two prototypes are shown side by side at [0:12:48]: Prototype A (left) scores higher on ease of completion (5.0 vs 4.3), clarity (4.5 vs 4.7 — B actually wins this one), onboarding experience (4.3 vs 4.2) and likelihood to subscribe (4.2 vs 3.5). This screenshot is the single most useful frame in the video — it's a template for "here's how you lay out a results comparison," worth recreating on the library page even without the rest of the video. Frames of the Listnr web tool itself (test builder, recruiting screen, results dashboard, [0:04:16]-[0:10:32]) are just the paid tool's UI and add nothing a kid can use directly.

## Page material
- **Rules of thumb:**
  1. Write down what you're trying to learn (3-5 objectives) before you ask anyone to test anything.
  2. Prepare your test script in advance: a welcome line, clear task instructions, and the questions you'll ask after — so every tester gets the same experience.
  3. If you're testing two designs, change only ONE thing between them (here: just the subscription screen) so you know what caused the difference.
  4. Decide your "goal" in advance — the exact screen or action that counts as "the user succeeded."
  5. Compare results side by side with numbers (time, 1-5 ratings), not just gut feeling.
- **Exercises:**
  1. Write a 3-objective test plan for your own app or game: what do you want to learn, and from what kind of tester?
  2. Sit a classmate down, don't help them, and time how long it takes them to do one task in your app. Ask them to rate ease 1-5 out of loud. Write down the number.
  3. Make one small change to a screen (like button color or wording) and re-test with a different classmate — did the number get better or worse?
- **Quiz:**
  1. Q: Why did he screen OUT people who already use a fitness-tracking app? A: Because they'd already be used to the pattern being tested and give biased, less useful feedback.
  2. Q: Why test two variants instead of just polishing one? A: You can't know which design is actually better without comparing it to an alternative with real users.
- **For a Gemini/Apps Script game:** the planning discipline (objectives, script, goal screen) transfers directly — kids can write it as a plain checklist and run it live on a classmate instead of a paid platform. Task-completion-time is easy to fake in Apps Script (start a `new Date()` on load, log the diff to a Sheet row on submit). A/B testing two variants is harder in a single-file Apps Script project — simplest version is "make two versions, save them as two separate deployments, test one on one classmate and the other on another." Recruiting/screener questions don't apply at classroom scale — say so.

## Caveats
The whole video is essentially an ad: Listnr is credited as sponsor at [0:02:12], and roughly [0:02:46]-[0:10:16] is a screen-recorded product demo of that tool's UI, not usability-testing theory. None of it is available to a 14-year-old (paid product, needs a Figma prototype, needs real recruited testers). Strip the tool-specific parts and keep only the planning framework and the results-reading example. No AI-building content at all.
