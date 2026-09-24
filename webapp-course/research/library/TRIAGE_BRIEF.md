# Triage brief: is this video worth a place in the library?

Working dir: `E:/Websites 2026/Vibecoding projects/library-research/`. Captions are in `caps/<id>.txt` (`[h:mm:ss]`
stamps every ~30 s); metadata in `videos.json`; your group of ids is in `groups.json` under your key.

**The library:** optional deep homework pages for a course where 10-15 kids aged 14-15 (Israel, decent English)
vibe-code web apps and browser games with Gemini. Gemini writes the code; the kids design, describe, test and
debug. Stack: Google Apps Script + Google Sheets as the database; turn-based/idle browser games; maybe Netlify for
the final. Library topics: UI design, UX, game design, character design, data/database design, how the web works,
APIs, debugging, planning/scoping, testing, game feel, level design, AI literacy.

**Your job is triage, not full notes.** For each video, decide whether it earns a place, based on what it actually
says (not its title).
- Videos under ~60 min: read the whole caption file.
- Longer videos: read the first 15 min, then 6 evenly spaced 3-minute windows, then the last 10 min; say "sampled".
- No caption file? Mark `nocaps` and judge from the title only, saying so.

Write `triage/<KEY>.json` (create the `triage/` folder if needed): a list, one object per video:
```
{"id": "...", "title": "...", "verdict": "core" | "useful" | "skip",
 "topics": ["ui", "ux", "data", "web", "api", "debug", "planning", "testing", "game-design", "game-feel",
            "level-design", "character", "ai", "accessibility", "mobile", "career"],
 "level": "teen-friendly" | "needs a guide" | "too advanced",
 "best": [{"from": "0:03:10", "to": "0:11:40", "what": "one line"}],
 "tool_specific": "none" | "Figma" | "Adobe XD" | "SQL" | "SAP" | ...,
 "needs_frames": true | false,
 "why": "one honest line",
 "sampled": true | false}
```
**Verdicts:**
- `core`: clear, correct, teen-followable, and on a library topic. A kid could watch it (or the `best` segment).
- `useful`: good material, but for the teacher/guide writer, or only a segment is worth it, or it needs our
  guide around it.
- `skip`: off-topic for this course (careers, portfolios, interviews, enterprise tools), duplicated by a better
  video, padded, outdated, or too advanced.

Be strict: the library is overkill on purpose, but padding helps nobody. Tool tutorials (Figma, Adobe XD) are
`skip` unless the *concept* taught transfers and is explained well. Kids won't use Figma; Gemini builds the UI.
`needs_frames` = true only when the visuals carry the teaching (before/after designs, diagrams) and the video is
`core` or `useful`.

Then write `triage/<KEY>_summary.md` (under 400 words): counts per verdict, the 5 best videos in the group and why,
duplicates you noticed, and anything surprising. Reply with 4 lines.
