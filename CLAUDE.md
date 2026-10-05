# MAKE courses (branch `claude/make-courses`): read this first

This branch holds two courses Ben teaches at MAKE (Israel). The rest of the repo (ClassPet: `index.html`, `backend/`…)
is an older, unrelated class app; leave it alone unless asked.

Work on this branch. Commit and push when a piece is done. Ben reads on his phone/PC: big results go in ONE organised
`.md` review file with `💬` comment slots, plus a short chat reply. He comments in the file (`💬` / `BEN:` lines) and says
"done"; then read his comments.

## Read in this order

1. `course-context/` — what Ben decided and how he wants to be worked with. This was the previous sessions' memory;
   a cloud session has no other memory. Start with `feedback_how_ben_wants_answers.md`,
   `feedback_courses_conversation_is_the_skill.md`, then the two `project_make_*.md` files (full decision history).
2. The course you're asked about (below).

## Course A: web-app course (`webapp-course/`) — the active one

Kids 14–15, 10–15 of them, ~20 meetings × 90 min, November–May. Ministry of Education student Google accounts.
They vibe-code with the **Gemini web app** (copy-paste; **no API keys**) + **Google Sheets + Apps Script**. Assume a
weak, forgetful Gemini. PBL, fun, "create cool things, store data as backend"; **no cyber/attack lessons**, no
class-wide leaderboard.

- `COURSE_DRAFT.md` — course draft 1. Ben's answers since: Phase 1 = ONE app across meetings 1–4; Phase 2 = the SAME
  game for everyone, each kid builds their own version (bring 2–3 candidate games); final = solo; UI/UX is a core
  strand; meeting = 10–15 min live demo → ~60 min solo work → 5 min save/show.
- `LIBRARY_MAP.md` — the hub's optional homework library: 547 videos triaged into 60 pages with timestamped segments.
  **Waiting for Ben's 💬 on its three decisions** (language, YouTube at school, build order).
- `REVIEW.md` — older design review; its course sections are OUTDATED versus `course-context/project_make_webapp_course.md`.
- `research/` — per-video notes (`notes/`, incl. `_batch_U1–U4.md` UI/UX page proposals), the 5-reviewer debate
  (`debate/`), `SYNTHESIS.md`, `library/` (triage verdicts `T01–T18.json`, `_ALL_KEEP.md`, `transcripts.zip`),
  `hub_ref/` (screenshots + `NOTES.md` of coworker Yuval's "makers-lab" lesson platform: THE model for the hub).

**Next steps:** (1) game-design library pages, pulled from `minecraft-course/research/notes/_batch_*.md`;
(2) course draft 2 from Ben's answers; (3) rewrite `REVIEW.md`; (4) design the hub = a makers-lab-style step-by-step
lesson player rebuilt on Apps Script + a Sheet, maximal spoon-feeding (exact prompts with copy buttons, screenshots
of where to paste, expected result). Build the COURSE before the hub.

## Course B: Minecraft modding course (`minecraft-course/`)

8 kids aged 11–13, 20 weeks, Minecraft 26.2 / NeoForge, Windows laptops, Hebrew kid text. Read `HANDOFF.md`, then
`04-creative-course-design.md` and `05-ministry-pedagogy-applied.md`. Ben comments in `REVIEW.md`.
**Open blocker (REVIEW §14):** Google Antigravity is 18+ and personal-accounts-only, so the kids can't use it; a
replacement tool is undecided. The make-class platform idea is dropped.

## Rules

- Never use an API key or any paid service without asking Ben first, each time.
- Hebrew for anything kids read; write it directly, plain and short.
- No real names or IDs of kids anywhere (Ministry rule).
- Videos are raw material: design for 2026 practice and for Gemini, not for what a tutorial happened to show.
- A cloud session can't download YouTube video reliably; the transcripts are already in `transcripts.zip`.
