# Free online activities for grade 6 science (CET / Matach and others), notes only

Collected 2026-10-13. Nothing here was downloaded. "Status" is what I saw when I requested the URL without logging in
(I never logged in anywhere). A one-line description marked **[title only]** is inferred from the title or from the Ministry label, not from using the activity.

## Key finding

Most CET (Matach) grade 6 science activities that the Ministry's topic pages link to are **not openly usable**:
the Ministry's own labels say "requires Ministry of Education login" (נדרשת הזדהות משרד החינוך), the older `science.cet.ac.il` and `lib.cet.ac.il` sites now show a "site taken offline for technical problems" notice,
and BrainPOP needs a subscription. The Ministry's list of grade 6 topic pages is in `../science/web/sci-teaching-materials-topic-pages-and-resources.md` (from round 1).
That file has 23 CET / BrainPOP links under grade 6 topics. I tested 8 of them (the ones in table B plus the microscope); exactly one of those 8 opens and works for anyone (the microscope applet). The other 15 I did not test.

## A. Opens without login

| what | URL | status | what the kid does |
|---|---|---|---|
| "Through the microscope" (מבעד למיקרוסקופ), CET applet | https://apps.assets.cet.ac.il/library/science/microscope/he/index.-77575834666333.htm | HTTP 200, page text read | Switches on a virtual light microscope, picks a specimen (micro-organisms, cells, processes inside cells) and views images / videos at different magnification, adjusting the lamp brightness. |
| Ministry grade 4-6 summer-study science page, with student activity PDFs | https://pop.education.gov.il/maagal_hashana/summer-study-program/summer-school/science-technology-4-6grades/ | HTTP 200 | A list of hands-on STEM activities; the PDFs open directly (below). |
| "Learning by experiment: snowman" (גבר בק et al., Matar / TAU), activity PDF | https://meyda.education.gov.il/files/Pop/0files/mada-technology/yesodi/mshabim/snowman.pdf | HTTP 200, %PDF | Written as a hands-on experiment sheet (title page read); topic is heat and melting **[title only]**. |
| "Learning by STEM experience: paper cups" (Matar / TAU) | https://meyda.education.gov.il/files/Pop/0files/mada-technology/yesodi/mshabim/paper_cups.pdf | HTTP 200, %PDF | Build-and-test activity with paper cups **[title only]**. |
| "Making noise!" (Ministry + Matar teachers' centre) | https://meyda.education.gov.il/files/Pop/0files/mada-technology/yesodi/mshabim/making_noise.pdf | HTTP 200, %PDF (7 MB) | Sound activity (title and cover read) **[content not read]**. |
| Student learning booklet "Food and nutrition", grades 5-6, 2025-26 | https://meyda.education.gov.il/files/Pop/0files/mada-technology/yesodi/hovrot/food.pdf | HTTP 200, %PDF (36 MB), cover read | Pupil booklet with a QR code to the teacher's version; covers food and nutrition (the MITZAV-style unit `mitzav/sci6-unit-food-and-nutrition-6-*` is the same topic). |
| "River challenge" (Google AI Quests, Hebrew), student sheet and teacher overview | https://meyda.education.gov.il/files/Pop/0files/mada-technology/yesodi/river_challenge_student.pdf | HTTP 200, text read | Kid helps a character and her community prepare for floods by building a flood-prediction AI model; the online quest itself is at research.google/ai-quests (not opened). |
| "Desert challenge" (Google AI Quests, Hebrew), teacher guide | https://meyda.education.gov.il/files/Pop/0files/mada-technology/yesodi/desert_challenge_teacher.pdf | HTTP 200, text read | Pupils play AI researchers working out how doctors can use AI to diagnose disease. |
| Electricity-game unit for teachers (Davidson Institute) | https://davidson.org.il/vod/wp-content/uploads/sites/2/2020/10/metachnenim-mischak_hashmal-stati_teacher_0-34.pdf | HTTP 200, %PDF; first lines unreadable (font encoding) | File name says "game programmers: static electricity, teacher" **[title only]**. |
| Ministry electricity / physics unit "ogdan pizika" | https://meyda.education.gov.il/files/MadaTech/Technology/hativa/atuda_behativa/yehidot_horaa/ogdan_pizika_t.pdf | HTTP 200, %PDF (2.8 MB) | Teaching-unit PDF; cover page mentions NASA photo credit; content not read **[title only]**. |
| Ministry grade 5-6 assessment tasks (escape room, scientific model, photo task) | see `../science/lessons/assessment__*` (round 1) | already saved | Performance tasks, printable. |

## B. Needs a Ministry login, offline, or a subscription (so not usable by my pupils without an account)

| what | URL | status |
|---|---|---|
| "The eye and vision" (העין והראייה), CET learning object, grade 6 | https://lo.cet.ac.il/player/?document=5750ff78-8639-4d85-b180-fb8195727c1f&language=he&sitekey=ebag | HTTP 200 but only the title text in the shell; Ministry page marks it login-only |
| "The ear and hearing" (האוזן והשמיעה), grade 6 | https://lo.cet.ac.il/player/?document=75040d4e-be4d-4f65-8826-6df2d80a9256&language=he&sitekey=ebag | same, login-only per Ministry label |
| Interactive electricity station "From power station to home" | https://science.cet.ac.il/science/electricity/station/home.asp?nID=1 | redirects to `inactivesite.cet.ac.il`: "site taken down due to technical problems" |
| "Electricity and the environment" quiz, "Transport system" test | https://science.cet.ac.il/science/electricity/environment/quest.asp , .../transportation/test/test1.asp | same offline notice |
| "Closing circuits" (grade 3) | https://circuit.cet.ac.il/act10.aspx | no connection (curl exit code 000) |
| CET "Ofek" search for ecology tasks, grade 6 | https://myofek.cet.ac.il/he/search?allFields=יחסי גומלין בטבע&ageGrades=grade6 | HTTP 200 but a JavaScript app; the results are not in the HTML, so I could not read them |
| BrainPOP Israel: eyes, sound and speech, hearing, symbiosis, vertebrates (grade 6) | e.g. https://il.brainpop.com/category_13/subcategory_137/subjects_2827/ | page is a loading shell; Ministry labels say login or subscription |
| Ramot "במבט מקוון" (Bimabat Online) companion to the grade 6 book | https://mabatmekuvan.ramot.org/ | not opened; requires an account per the publisher page |

## C. What is missing

- I did not find a CET Matach list of grade 6 units on light, the eye, ecology or energy that is free and open. The CET catalogue pages that exist (`cet-catalogue.cet.ac.il`, `school.kotar.cet.ac.il`) are shops or a login library; I did not open them.
- The CET site `www.cet.ac.il` redirects `lib.cet.ac.il` to the "inactive site" page, so library items listed in the Ministry's pages (`lib.cet.ac.il/Pages/sub.asp?...`) are likely gone **[inferred from one test of the root]**.
- Search for "free CET grade 6 science units" returned no CET page (only Ministry, Ramot / TAU and shop pages).
