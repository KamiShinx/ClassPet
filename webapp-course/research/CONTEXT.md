# Context for everyone analysing these videos

## The class
- Teacher: Ben, at MAKE (Israel). **10-15 kids, age 14, turning 15 during the year.** Hebrew speakers.
- **~20 meetings, November to May, ~90 real minutes each**, plus some homework.
- Kids use their **Israeli Ministry of Education student Google accounts** (Google Workspace for Education,
  admin-controlled) and a browser. Which Gemini model they get is unknown; assume the weaker one, with rate limits.
  Admin policy may limit Apps Script deployment and sharing outside the Ministry's domain.
- Stack: kids **vibe-code** (describe what they want; the AI writes the code) with **Gemini Pro**. The apps are
  **Google Apps Script web apps**: HTML/CSS/JS frontend served by `HtmlService`, server code in `.gs` files,
  **Google Sheets as the database**, deployed on the free `script.google.com/.../exec` address.
- Goals set by Ben: it must be **fun**; **project-based** (several small projects and one big final project);
  a game is fine, but the emphasis is on building an **app with a real backend**, and on kids actually
  understanding **what a backend is** (client vs server, database, API, requests), not just watching the AI
  produce something.
- Ben wants to combine it with **Google Teachable Machine** (kids train an image/pose/sound model and use it in
  their web app), so projects can be "AI apps". Note anything relevant: running ML models in the browser,
  camera/microphone use, sending model results to the backend.
- **Kids use the Gemini web app (gemini.google.com) to generate code and paste it into the Apps Script editor.**
  They will NOT use API keys or call AI APIs from their apps.
- **Assume a weak, forgetful AI.** Ben isn't sure the kids will have Gemini Pro. Plan for the free model that
  hallucinates, forgets earlier context, and "nukes" working projects by rewriting everything. So any workflow,
  habit or structure that protects a project from its own AI (saving versions, small asks, a project-memory file
  pasted into each chat, keeping code split into small files, checking a change before accepting it) is valuable.
  Note every instance in your videos of the AI (or human) breaking working code and how it was recovered.
- The videos are raw material, not the authority: flag where 2026 practice differs from what a video shows.
- Known constraint: webcam/microphone are very likely blocked inside Apps Script HtmlService pages (sandboxed
  iframe). So during the year AI features use image upload; **for the final project the frontend moves to Netlify
  (or similar)** and talks to the Apps Script backend over doPost/JSON. Note anything about hosting a frontend
  separately and calling an Apps Script endpoint (CORS, doPost, fetch, JSON).
- Ben also wants a **teaching platform ("hub")** for the course, built on the same stack (Apps Script + its Sheet,
  nothing external), which can double as a live example of a real backend.

## What we need from the videos
Not summaries for their own sake. We need:
1. **Concepts a 14-year-old must understand** to know what a backend is, and the clearest ways these videos
   explain or show them (diagrams, analogies, demos). Say which explanations are good enough to reuse in class.
2. **Project ideas and project shapes** that fit teens and this stack, and ideas that don't fit (adult business
   software is useful as architecture, rarely as a project a 14-year-old wants to build).
3. **The real traps** of Apps Script web apps (deployment versions, permissions, quotas, `google.script.run`
   async, CORS, Sheets speed, concurrency), and which ones a kid will hit.
4. **How AI-assisted building actually goes** in these videos (Gemini, Claude Code, ChatGPT, Antigravity): what
   the AI did well, where it broke, what the human had to know to fix it.
5. **Anything usable for the hub itself.**

## House rules for your notes
- **Don't exaggerate.** If a video is thin, padded, a promo, or mostly scrolling code without explanation, say so.
  If an idea is generic, say it's generic. Keep what the video says apart from your own extrapolation, and label
  your own knowledge as such.
- Cite `[h:mm:ss]` timestamps from `transcript.txt` for every idea you attribute to the video.
- No long quotes (max ~15 words, few of them). Paraphrase.
- You must actually look at the contact sheets (`sheet_NNN.jpg`, 16 timestamped frames each): code on screen,
  UI, diagrams. Say what the visuals add, or say plainly that they add nothing.
- Some videos are old (2019-2021): flag anything outdated (UI libraries like Materialize, deprecated APIs), but
  don't dismiss the underlying concept for it.
