# Minecraft Education's own science lessons (the competitor), grade 5-6 range

Collected 2026-10-13. The public lesson pages (`education.minecraft.net/en-us/lessons/<slug>`) are built in the browser with JavaScript:
fetched with curl they return an empty shell, and my WebFetch calls on two lesson pages timed out (60 s).
So **I did not read the rendered pages.** The data below comes from the same public JSON service that the site's own script calls
(no login, no key, read-only):

- list: `https://net-secondary.web.minecraft-services.net/api/v1.0/edu/search/resources?languages=en-us&skip=0` (and `skip=1000`)
- detail: `https://net-secondary.web.minecraft-services.net/api/v1.0/edu/lesson/<LessonID>`

I pulled 1964 resources, 1136 of them lessons (subject "Science" on 308). I fetched the detail record of the 34 lessons below.
No world file or document was downloaded; only the metadata and the lesson text were read.

## What the library is (important for the comparison)

- **Most lessons are teacher-contributed community lessons, not Mojang / Microsoft-written.** In my 34, the author field is "Minecraft Education"
  for 7 (Natural and Artificial Light, Ecosystem Design Task, An Ecosystem Jigsaw, LUMEN Power Challenge, LUMEN City Challenge, Renewable Energy, Redstone & Sustainable Living)
  and a named teacher or partner for the rest.
- **Time and level are mostly "Unknown".** Only 5 of the 34 give a time (the others say "Unknown"): 15 min, 30 min, 45 min, 1 hour, "more than 3 hours".
- **Age bands are the site's tags** (6-7, 8-10, 11-13, 14-18). Grade 6 sits in 11-13 (some 8-10).
- **Light and optics is nearly absent.** One lesson on natural / artificial light (age 6-7) and one convex-lens ray-diagram lesson (14-18). **Nothing on the eye or on reflection / refraction for ages 10-12.**
- **No assessment is built into most lessons.** The teacher gets a world file (often), sometimes a lesson-plan docx, rubric, fact sheets or a PowerPoint. Quiz or scoring appears in a few (noted below).

## 1. Light and optics

| lesson (ID) | URL | age / time / author | what the kid does in the world | what the teacher gets |
|---|---|---|---|---|
| **Natural and Artificial Light** (2760) | https://education.minecraft.net/en-us/lessons/natural-and-artificial-light | 6-7, time "Unknown", Minecraft Education, 2019 | Walks a numbered path through a world, right-clicks NPCs for instructions, flips a switch and works out how to light a redstone lamp, rebuilds the circuit, then builds a house with natural and artificial light (nether-rack campfire), and edits a sign to say what they learned. Paired reading (strong + weak reader). | world file `Natural-and-Artificial-Light.zip`; teaching script with Introduce (10 min) and Teach & Learn (50 min); success criteria ("I can name types of natural and artificial light / build a circuit to turn on a light / build a house that uses both"); BrainPOP Jr. video link. No quiz. |
| **Images formed by a convex lens** (3259) | https://education.minecraft.net/en-us/lessons/images-formed-by-convex-lens | 14-18, time "Unknown", community | Draws ray diagrams on graph paper, then builds them in blocks with an object at 2f, between f and 2f, at f, and inside f; calculates magnification. | world zip, PPT "Refraction_Lenses", Word worksheet. Too old for grade 6. |
| Redstone Circuits (2364) | https://education.minecraft.net/en-us/lessons/redstone-circuits | 8-10 and 11-13, community (R. Elliott) | Follows a sustainable-energy unit: finds a village seed, maps it on grid paper, wires every house with redstone, daylight sensors and a switch per house, hidden underground. | description and success criteria only (no files). Light only as "lighting system". |

## 2. Ecosystems, biomes, food webs

| lesson (ID) | URL | age / time / author | what the kid does | what the teacher gets |
|---|---|---|---|---|
| **Ecosystem Design Task** (2758) | https://education.minecraft.net/en-us/lessons/ecosystem-design-task | 8-10 (4th-grade US NGSS), several class periods, Minecraft Education, 2022 | In pairs, plans an ecosystem on a planning guide, gets teacher feedback, explores an unknown biome, uses camera and book-and-quill to gather evidence, spawns life and grows plants, models what happens if plants or animals become scarce or overabundant. Submission is through Canvas. | 4th-grade planning guide PDF, rubric (PNG), feedback slip (docx). This is the one with a real rubric. |
| **An Ecosystem Jigsaw** (4259) | https://education.minecraft.net/en-us/lessons/an-ecosystem-jigsaw | 8-10 and 11-13, 1 hour, beginner, Minecraft Education, 2024 | Plays a predator-prey game (be a leopard hunting impala), then studies how habitat loss breaks the relation. | fact sheets (impala, leopard) docx, PPT, three video / website links. |
| Know your Ecosystem (2261) | https://education.minecraft.net/en-us/lessons/know-your-ecosystem | 11-13 and 14-18, community (C. Agarwal), 2022 | Picks a scenario ("save our ecosystem"), builds a part of it (forest scene, animal life cycle, farm), shows biotic and abiotic parts. | "Power pyramid" image, ecosystem snapshot image, link to a world on OneDrive. |
| Habitats (4290) | https://education.minecraft.net/en-us/lessons/habitats | 8-10, 45 min, beginner, K12 Inc., 2025 | "How plants and animals work together to create a balanced ecosystem" (teaching guide only; I did not read the PDF). | Teaching-guide PDF. |
| Habitats: Human Impact (2395) | https://education.minecraft.net/en-us/lessons/habitats-human-impact | 8-10 and 11-13, community (J. Wood), 2018 | Mission-based: investigates a biome, studies the impact of civilisation, designs a biome that balances people and nature. | links to BBC and Nat Geo; no files. |
| Biome Hunter (3054) | https://education.minecraft.net/en-us/lessons/biome-hunter | 6-7 to 11-13, community (M. Grundel), 2018 | Explorer's-guild frame: researches real biomes (animals, plants, where on the globe, latitude / longitude), hunts the Minecraft biomes and fills a worksheet. | worksheet docx and PDF, world link. |
| World Biomes (1102) | https://education.minecraft.net/en-us/lessons/world-biomes | 8-10 to 14-18, community (P. Martikainen), 2020 | Groups research a biome, build a nature trail, present the life in it. | one example student world zip. |
| Design a Zoo (1690) | https://education.minecraft.net/en-us/lessons/design-a-zoo | 8-10, community, 2018 | Research 8 ecosystems with an animal each, build a zoo with 5 ecosystems. | none. |
| Extinction (118) | https://education.minecraft.net/en-us/lessons/extinction | 8-10 and 11-13, community, 2018 | Groups study extinction causes and effects on an ecosystem. | PDFs (extinct animals, IUCN list), Sway links. |
| Dynamic Ecosystems Project (428) | https://education.minecraft.net/en-us/lessons/dynamic-ecosystems-project | 8-10 to 18+, community, 2017 | Builds the digital version of an ecosystem they researched. | external wiki link. |
| Build With Bees: Pollination (3627) | https://education.minecraft.net/en-us/lessons/build-with-bees-pollination | 8-10, community (S. Red-Laird), 2025 | Dissects a flower (worksheet) to link flower parts to a pollinator's body and behaviour; then builds in the Kids and Bees world. | PDFs (pollination anatomy, worksheet, teacher guide), videos. |

No food-web lesson was found by title. The nearest is the leopard / impala predator-prey lesson above.

## 3. Energy, electricity, circuits

| lesson (ID) | URL | age / time / author | what the kid does | what the teacher gets |
|---|---|---|---|---|
| **Redstone Basics** (4345) | https://education.minecraft.net/en-us/lessons/redstone-basics | 8-10 and 11-13, 30 min, beginner, community (L. Ahumada), 2025 | A "redstone museum" with six rooms: fix a redstone path, use a comparator, "light it up" (complete circuits with an energy source), repair a roller coaster, test area, showroom of complex machines. Marks visited rooms on a hall panel, writes notes with camera and book and quill. | description and success criteria; no download listed. |
| **Energy Transfer** (1037) | https://education.minecraft.net/en-us/lessons/energy-transfer | 8-10 (US 4th grade NGSS), community (J. Miller), 2022 | Codes in Code Builder: three stations modelling light, sound / electrical, and heat transfer (glass greenhouse roof with the fill command; note-block beat with a button; fire charge heating wood). | world zip and lesson-plan docx `4S_Energy-Transfer`. |
| **LUMEN Power Challenge** (2783) | https://education.minecraft.net/en-us/lessons/lumen-power-challenge | 8-10 and 11-13, Minecraft Education, 2025 | Five challenges around a town (red beacons): each is a way to generate electricity; fills pros / cons tables. | lesson-plan docx with tables and quiz; world link `aka.ms/PowerChallengeWorld`. |
| **LUMEN City Challenge** (2784) | https://education.minecraft.net/en-us/lessons/lumen-city-challenge | 8-10 and 11-13, Minecraft Education, 2025 | Builds a sustainable city: picks among 6 power-source types; the town centre shows live energy, pollution, population and city rating. | lesson-plan docx tables; world link `aka.ms/CityChallengeWorld`. |
| Renewable Energy (1664) | https://education.minecraft.net/en-us/lessons/renewable-energy | 8-10 and 11-13, Minecraft Education | Groups pick a renewable source, find a matching biome, build the power source and a home using it. | starter worlds zip; links. |
| Renewable Energy (Wind Power) (1094) | https://education.minecraft.net/en-us/lessons/renewable-energy-wind-power | all ages, community (T. Wills), 2022 | Reads theory boards in a building, does wind-farm calculations, records in book and quill. | world zip, answer sheet docx, task card PDF. |
| Green Energy City (4230) | https://education.minecraft.net/en-us/lessons/green-energy-city | all ages, "more than 3 hours", beginner, BlockWorks, 2026 | A city powered by renewables (battery tech to solar). Student activities are inside the plans. | lesson-plans zip. |
| The Voltaic Propulsion Lab (2806) | https://education.minecraft.net/en-us/lessons/the-voltaic-propulsion-lab | 8-10 and 11-13, community, 2020 | Collects raw materials and uses machines to build an electric car. | resources zip. |
| The Force of Minecraft! (2625) | https://education.minecraft.net/en-us/lessons/the-force-of-minecraft | 8-10 and 11-13, community (L. Barker), 2018 | Students write the "Forces and Energy" unit themselves from the syllabus. | syllabus PDF, thinking-routine PDFs. |
| Solar Panel Setback (1888) | https://education.minecraft.net/en-us/lessons/solar-panel-setback | 8-10 and 11-13, Phygital Labs, 2025 | Multi-day: solar oven (s'mores) then ISS solar-panel repair, robots in space. | video links; no files. |
| Let it rain! Water Cycle (3575), Minecraft Watercycle (2324) | https://education.minecraft.net/en-us/lessons/let-it-rain-water-cycle | 8-10 and 11-13, community | Groups build the stages of the water cycle in 3D; the second exports with a structure block. | objectives checklist PDF; rubric and requirements images. |

## 4. The human body

| lesson (ID) | URL | age / time / author | what the kid does | what the teacher gets |
|---|---|---|---|---|
| Field Trip Through The Heart (2736) | https://education.minecraft.net/en-us/lessons/field-trip-through-the-heart | 8-10 to 14-18, community (M. Daniel), 2025 | After a model / illustration, walks the heart and lungs in a world with an NPC guide "Dr. Mobogo"; answers questions at the end. | world `.mcworld.zip`; video link. |
| Circulatory System (2494) | https://education.minecraft.net/en-us/lessons/circulatory-system | 8-10 to 14-18, community (R. Otaka), 2021 | Teams each research one part (right heart, left heart, alveoli, capillary exchange) and teach it. | world file. |
| Heart Chambers (2515) | https://education.minecraft.net/en-us/lessons/heart-chambers | 11-13, 15 min, beginner, community, 2022 | Travels through the heart naming chambers, then a race review. | world (Spanish: `Corazon.mcworld`). |
| Operation: Aorta (4206) | https://education.minecraft.net/en-us/lessons/operation-aorta-exploring-the-human-body-and-blood-system | 11-13 and 14-18 | A journey through the body to learn about blood (title and blurb only; not opened). | not checked. |
| MineHeart (1881), Modelling the heart (1213) | https://education.minecraft.net/en-us/lessons/mineheart-2 | 11-13 and 14-18, community | Students build models of the circulatory system and of a four-chamber heart with coloured fluid for blood. | MineHeart world zip. |
| Human Body and Organs (1525), Create Fred the Human Body! (168) | https://education.minecraft.net/en-us/lessons/human-body-organs | 11-13 and 6-13, community, 2016-2017 | Class builds a body and its organs, using NPCs / signs to explain each function. | videos only. |
| Unity in diversity: cells (2505), Animal Cell Tour (2734) | https://education.minecraft.net/en-us/lessons/unity-in-diversity-cells | 11-13 and 14-18, community | Build and label plant / animal cell models; tour a 3D cell. | not checked. |

**There is no official lesson on the eye, vision, the ear or hearing**, and none on the nervous system, in the library I read (I searched titles and short descriptions of all 1136 lessons for eye, vision, ear, hearing, brain, senses, sound, nervous, lens, reflect, refract, mirror, shadow, prism, periscope; the only near hits are "Rainbow Skies" (2137, 8-13: make a rainbow with Code Builder; not opened) and "Five Senses" (4065, an English-language lesson). Full-text of lesson bodies was not searched.)
Sound appears only inside the Energy Transfer lesson (note blocks) and the music redstone lessons (Melody Lane, Music Coding Projects; titles only).

## What this means for the comparison

1. Grade 6 topics Minecraft Education covers well: renewable energy (several), circulatory system / heart (several), water cycle, biomes, ecosystems-as-design-task.
2. Topics it covers thinly or not at all: light behaviour (reflection, refraction, shadow, colour), the eye, sound and hearing, ecological food webs with data, fair-test inquiry steps, circuit with series / parallel as a science concept (it is redstone logic, not real circuits).
3. Teacher support is uneven. Only the Minecraft-authored ones have a script with timings and success criteria, and a rubric exists in one (Ecosystem Design Task). No lesson has an auto-graded assessment in the game itself.
4. Pedagogy is mostly "build a model and present it", seldom "predict, test, record data, conclude".

Not checked: the "Challenges" and "Training" items (45 + 16), the non-English translations, and the Marketplace / "Education collection" worlds. Also not checked: whether the in-app library shows the same lessons; I used the website's data.
