# Minecraft-edu: decisions so far (13 Oct 2026)

A new project, separate from the MAKE modding course (`minecraft-course/`), but reusing its know-how.

- **What:** our own "Minecraft Education, but on Java": mods, worlds and maps that teach the Israeli elementary
  curriculum. Ben + his partner. Full control is the point; the kids' no-code studio is at most a small part.
- **Who:** grade 6 (כיתה ו) first.
- **Subjects:** science (מדע וטכנולוגיה) + English, combined. The game, its instructions and characters are in
  **Hebrew**; English is a subject learned inside it, like science (e.g. a quest asks for "three red flowers").
- **Order:** the school version first (45-minute periods, ~30 kids); a private-lesson / after-school (חוג) version later.
  Plan: offer it through Geffen (גפ"ן) next school year.
- **Tech call:** worlds + datapacks wherever possible, Java only where needed (less fragile).
- **Open issue:** Java licences. The MAKE hub runs the dev client (`runClient`, offline name), which works, but
  Mojang's licence wants each player to own the game. Don't pitch it as "free"; decide later who pays (school /
  Geffen / we bring laptops).
- **Curriculum:** the cloud box can't reach Ministry sites (pop/meyda/edu.gov.il blocked). Ben's PC session is
  downloading the grade 6 science + English curriculum, vocabulary lists and lesson plans into
  `minecraft-edu/curriculum/` with an `INDEX.md`. Next: read them and map topics to worlds/quests.

**13 Oct, later.** The curriculum arrived (`curriculum/`, 198 files, Ben's PC session, commit 199e399). Read: the
grade 6 science content spec for 2026-27 (120h; light OR sound; MITZAV 31.5.2027 weights: ecology 25%, materials 20%,
living systems 20%, energy 15%, astronomy 10%, technology 10%) and English 2020 (end of grade 6 = A1, Band I Core II).
English = one English-speaking villager in every world (Band I quests); everything else in Hebrew. Wrote
`YEAR_MAP.md` (6 worlds + a shared kit: measuring tools, research notebook, English villager, teacher remote).
Waiting for Ben's 💬 on: light/sound (rec. sound), first world (rec. the living island), meeting format.

**13 Oct, evening. Ben's decisions:** light (not sound); the living island first; Ben runs the meetings; NO hub
remote control and no hub programming (compiling is too slow; "that's overkill"). Play opens Minecraft
straight into the lesson's map, and everything (sliders, buttons, NPCs, Newton wheel, notebook) lives inside the
game, in one mod built once. The course must cover the ENTIRE year, and every lesson must work in the computer lab
or from a book. Research done (in `research/`): ecology + inquiry, light/energy/technology, English for the game,
plus a map of MAKE's base for reuse. Wrote `COURSE.md`: 60 meetings × 90 min = 120h (6 units: living island,
light, power, workshop, MITZAV, the giant), lessons 1–3 in full, a list of the pieces, build order. Waiting for Ben's 💬
on: 90/60 format, who builds the maps (rec.: test map by code), the name. Ben's PC session is collecting
released MITZAV tests, textbook exercise types (notes only, copyright) and Minecraft Education lessons into
`curriculum/exercises/`.
