# Ministry activities: ecology + scientific inquiry (grade 6), mined for Minecraft and workbook porting

Scope: ecology / life environments (מערכות אקולוגיות) and the scientific inquiry process (תהליך חקר מדעי), plus the assessment tasks and MITZAV formats.
Source: Ministry of Education files in `minecraft-edu/curriculum/science/` (see `curriculum/INDEX.md`).
Everything under "Does" and "Type" is in the files. The "MC" and "Book" lines are my porting notes. Activities that are not in any file are marked **(idea)**.

Notes on the sources:
- **Broken extracts.** Six `.doc` extracts in the scratchpad `txt/` folder are garbled. The Hebrew came out as `????` because the files use code page 1255. I re-converted five of them with LibreOffice, and the clean text is in the scratchpad folder `reconv/`: `tahalich-heker-madai__Teaching_by_inquiry_6_grade_student/teacher`, `heker-ziporim__tazpit_isuf`, `pothim-shana-madaim__nature-pasha` and `tu-shvat-mot__ezim_bair`. Those are among the richest files here.
- **Mislabelled or wrong-grade files.**
  - `catalog-arthropods-2.pdf` is in Arabic. It is a different unit: vultures, "نبسط الأجنحة على النسور".
  - `catalog-arthropods-3.ppt` is the teacher slides for arthropods-1.
  - `catalog-variety-plants-1.pdf` says grades 3–4 in its own intro.
- **Image-only or empty files (not OCR'd).**
  - `heker-ziporim__hitbonenut.docx`: 1 byte of text.
  - `madaey-kador…__planeta-names.docx`: 0 bytes.
  - `hanoka-mada__Hidon-Hanuka-Teva.pdf`: mostly images; the riddles are partly readable.

Two Minecraft facts limit how far the ecology can be simulated. Every "MC" line assumes them:
- **What vanilla Java does simulate:**
  - predation: wolves, foxes, ocelots/cats, axolotls and frogs hunt
  - light-level rules for growth and spawning
  - water rules: farmland hydration, coral dies out of water, axolotls and tadpoles dry out, dolphins need air
  - biome temperature: snow vs rain, and which frog variant a tadpole becomes
  - bees pollinating crops
  - composters (a decomposition analogue)
  - trees that do not come back unless replanted
- **What it does not simulate:**
  - animals reproducing on their own (the player breeds them by feeding)
  - starvation, competition for food or habitat dependence
  - water temperature, dissolved O₂, pH or turbidity
  - erosion, and heat or cold damage (only powder snow freezes)

Anything in that second group needs a datapack, our mod, or the kids treating it as a stated rule of the model.

---

# Part 1: Activities by topic

## 0. Where the activities sit in the grade 6 spec (מפרט תשפ"ז, נושא מרכזי 2: מערכות אקולוגיות)

| Spec sub-topic | Spec goal (short) | Sections below |
|---|---|---|
| המגוון בטבע | "תנאים ייחודיים על פני כדור הארץ מאפשרים קיום"; unity and diversity; adaptations ↔ conditions and needs; why species diversity matters | §1, §2 |
| יחסי גומלין יצורים–סביבה ובין יצורים | environment supplies needs; biotic ↔ abiotic; competition / mutualism / parasitism (תחרות, הדדיות, טפילות); food chains and webs (שרשרות ומארגי מזון) | §3, §4 |
| מעורבות האדם במרכיבי הסביבה | benefit vs environmental cost; habitat loss, resource depletion; ways to reduce damage | §5 |
| תהליך חקר (15 h in grade 6) | research question, hypotheses, influencing and constant factors, control, repeats (שאלת חקר, השערות, גורמים משפיעים, גורמים קבועים, בקרה וחזרות) | §6 |

Grade 5 prerequisites (from the grade 5 spec):
- the geosphere as a habitat: rocks, soil formation, sandy vs clay soil
- human damage: habitats, soil pollution, quarries
- the solar system

The grade 5 spec has no living-ecology content. Grade 6 ecology starts from needs (צורכי קיום) and the classes of animals, as the units below assume.

---

## 1. Conditions for life on Earth vs other planets

**No Ministry ecology activity exists for this.** The only material is in the astronomy and climate files.

- **1.1 "Picnic in the solar system"** (`madaey-kador-arezh-ayekom-astronomia__masa-avoda.docx`, with `masa-kiteymeyda.docx` info passages)
  - Does:
    - chooses a planet, moon or asteroid and reads the passages
    - describes the approach to it
    - plans a temporary or permanent camp there
    - lists the problems "טמפרטורות נמוכות מאוד, היעדר אוויר… סכנת פגיעה של מטאוריטים" with a solution for each
    - presents it in any format: story, comic, travel guide, ad poster or model
  - The passages give the comparison data:
    - Mercury: +350 / −170 °C and no atmosphere
    - Venus: sulphuric-acid clouds and an atmosphere 90× Earth's
    - Earth: an O₂/N₂ atmosphere that protects life, and 70% water
    - Mars: −143 to −27 °C and a thin atmosphere
  - Type: reading comprehension → design task → open product.
  - MC: very strong. The three dimensions act as three "planets".
    - The Nether has no liquid water (a bucket evaporates) and no day/night; beds explode there.
    - The End has no weather or day/night.
    - Kids fill a "what does life need here?" table, then build a survival base on the hostile dimension.
    - Honest caveat: Minecraft has no airless or heat-damage planet, and the Nether/End have their own adapted life. That makes this a better adaptation lesson than an "only Earth has life" lesson.
  - Book: a comparison table of planet data with columns "water / air / temperature / life possible? why".
- **1.2 Kepler light-curve** (`…__planets-talmid.docx`)
  - Does: counts unhidden pixels per day, plots the points, joins them, decides "is this a planet?" and gives a reason (groups A/B/C get different data).
  - Type: constructing and interpreting a graph.
  - MC: weak. Book only.
  - Book: good as written; a ready-made page.
- **1.3 Greenhouse background** (`hashpaat-adam-al-sviva__climate.c.pdf`, teacher background)
  - Without the greenhouse effect Earth would average about −18 °C instead of +15 °C. This is the only "why Earth is habitable" statement found.
  - Teacher text only, no student task.
- **1.4 (idea) "Which needs does each biome supply?"**
  - Reuse the hyrax "circle the needs" item (§2.2): מזון / מים / אוויר / טמפרטורה מתאימה / קרקע / מחסה.
  - Apply it to Overworld biomes, then to the Nether and the End.

---

## 2. Diversity and adaptations (desert cliffs, rocky habitat, winter pool, beaks, frogs)

- **2.1 Ibex on desert cliffs** (`catalog-adaptation-animals-1.pdf`, gr 6, 4–6 h, built on Psalm 104:18 "הָרִים הַגְּבֹהִים לַיְּעֵלִים")
  - Does:
    - looks at 3 photos of Judean Desert gorges and says what is common to them
    - finds landscape features in the photos (cliffs, canyons, crevices "נקיקים", a pool)
    - lists the dangers of climbing
    - writes 2 "wow" questions using a question-word bank (מחסן מילות שאלה)
    - hypothesises what lets the ibex climb
    - reads a passage and names 1 structural and 1 behavioural adaptation (התאמה מבנית / התנהגותית), saying how each helps
    - gives the passage a title
    - solves a crossword
  - Type: photo observation → hypothesis → reading for information → classifying adaptations as structural or behavioural; crossword.
  - MC: goats live on mountain cliffs and jump high, so they stand in for the ibex. Kids observe goats on jagged peaks and "find the adaptation" (jumping, ramming). The hoof structure is not in the game, so the structural part stays verbal.
  - Book: very printable (photo page + passage + 2-column table).
- **2.2 Rock hyrax: needs and adaptations** (same file)
  - Does:
    - circles which needs a rocky habitat supplies (multi-select from 7)
    - reads about basking and thermoregulation and names the need and the behavioural adaptation
    - matches each need to how the hyrax meets it (מתחו קו)
    - writes a summary of how the hyrax is adapted
    - a second crossword
  - Type: multiple select, matching, short answer.
  - MC: no hyrax. The armadillo, which rolls up when threatened, is a real behavioural-adaptation mob for the "hide from danger" item. Needs matching can be done with signs and item frames.
  - Book: excellent (matching lines, circling).
- **2.3 Design challenges from adaptations** (same file)
  - Does:
    - (a) designs a climbing-shoe sole inspired by the ibex hoof (biomimicry, ביומימיקרי): shape, parts, materials and why, then a sketch
    - (b) designs a safari enclosure for a hyrax family: lists needs, researches special needs, sketches or models it, writes 5 care instructions for keepers
  - Type: design/engineering, drawing, procedural writing.
  - MC: (b) is a natural build: an enclosure that supplies every need of an MC animal (water, food block, shelter, light), checked against a needs list. (a) suits the book or a craft lesson.
  - Book: a sketch page plus a 5-line instruction list.
- **2.4 Teacher game "5 ברצף"** (same file, appendix)
  - Teams answer 3-option MCQs and true/false items (e.g. "שפן הוא סוג של ארנבון נכון/לא נכון"); a correct answer marks a square; 5 in a row wins.
  - Type: quiz game (MCQ + T/F).
  - MC: a quiz board with redstone lamps, or wool squares placed per right answer.
  - Book: a printable board and question cards.
- **2.5 "Whose beak?"** (`catalog-beak-birds-1.pdf`, gr 6, multiple-intelligences model, 2012). Five parallel "ways of understanding", all aimed at "התאמת מבנה המקור לתפקודו":
  - **Verbal:** reads the poem about the kingfisher who swapped its beak. Compares the poem with a photo, says which functions failed with the new beak, and draws a conclusion. Makes characterisation cards (כרטיסי אפיון) for 4 of 7 birds: beak shape, a drawing, habitat, food, functions, fit. Generalises, then writes a summary and a limerick.
  - **Logical:** reads a table and bar chart of birds counted around a school. Answers how many types, which is most and least common, and what in the yard attracts them. Judges a fictional student's claim that "a feeding station → more species" and writes an argument. Hypothesises food per beak from a food bank, solves a riddle (a new bird appears after a fish pond is built), argues "more food types → more bird species", and **designs an experiment**: influencing factor and treatments, affected factor and how to measure it, data table, processing, presentation.
  - **Visual:** watches a video of a cattle egret ("could it eat with a duck's beak?"). Matches **kitchen tools to beaks** (pliers, tweezers, sieve, nutcracker, syringe…) with reasons. Hypothesises food, checks it in sources and corrects it. Surveys schoolyard food sources, predicts the birds, then tracks them. Invents an imaginary bird.
  - **Musical:** identifies birds in a video, fills cards, records calls in the field, designs a "guess the bird by its call" game.
  - **Movement:** acts out the fable of the fox and the stork. Plays a card-matching game (bird info card ↔ beak picture). Answers "מה היה קורה אילו" questions, e.g. a woodpecker with a sparrow's beak. Makes up a pantomime game.
  - Type: matching, characterisation tables, data interpretation, argument writing, experiment design, counterfactual reasoning, creative products, field observation.
  - MC: real birds are thin (chicken, parrot). The **tool analogy ports well** **(idea)**: "which MC tool does this beak work like: shears, hoe, bucket, fishing rod, pickaxe?" Custom bird textures would need a resource pack or our mod. "Invent a bird" suits the mod's item/mob painter.
  - Book: the strongest single unit for the workbook. The tool↔beak and bird↔beak matching, the cards, the bar chart and the counterfactuals are all ready-made pages.
- **2.6 Winter pool adaptations** (`catalog-winter-puddle-1.pdf`, teacher background plus card 10)
  - Does: hypothesises why animals can live in the pool and "מה קורה ליצורים בקיץ" when it dries. The background lists 4 adaptations: dormant eggs, summer dormancy in mud, a life cycle only partly in water, flying away.
  - Type: hypothesis, open answer.
  - MC: a seasonal pond can only be scripted with a datapack. Tadpoles do die out of water, which is a hook.
  - Book: a hypothesis page with the 4 adaptations as a check list.
- **2.7 Frog** (`hagada-matza-mada__10-Plagues-frogs.pdf`, gr 4, Passover plagues)
  - Does:
    - fills a structure→function table
    - fills a **tadpole vs adult comparison table** (habitat, movement organ, breathing organ, food)
    - cuts out life-cycle pictures and orders them
    - gives evidence for "amphibian"
    - reads about Israel's 7 endangered amphibians and why to protect them
    - picks a fact and writes 2 questions
    - reads about cold adaptations (migration, dormancy, the wood frog that freezes)
    - plays a land/water movement game matching habitat to stage
  - Type: comparison table, sequencing, question writing.
  - MC: strong. Real tadpoles grow into frogs, and **the frog variant depends on biome temperature** (temperate/cold/warm). Tadpoles dry out on land; frogs eat small slimes and magma cubes.
  - Book: sequencing cut-outs and the comparison table.
- **2.8 Diversity of animals and plants around school "בעין המצלמה"** (`catalog-animals-environment-1.pdf` gr 4–6; `catalog-variety-plants-1.pdf` gr 3–4)
  - Does:
    - makes a mind map
    - observes ≥5 animals in the yard and fills an observation sheet: season, class, appearance, behaviour, lifestyle "פעיל יום/לילה… טורף/צמחוני/אוכל כל", habitat "מתחת לאבן…", adaptations
    - identifies them with keys or Google Lens
    - writes 5 follow-up questions
    - makes digital characterisation cards and a group presentation
    - self-checks against 5 yes/no criteria, gives peer feedback, writes a reflection
  - The plant version adds circling the plant type, measured height and trunk, leaf shape, margin and texture, flower part counts, and repeat observations every 2 weeks (phenology).
  - Type: field observation with a structured sheet, classification, characterisation cards, presentation.
  - MC: a **mob census** of a biome: observation sheet in a book & quill, F2 screenshots as "photos". Good, because the sheet fields map onto mobs (day/night activity, what it eats, where it spawns).
  - Book: the observation sheet is the template for every "field page".
- **2.9 Sage leaf adaptation** (`70-shnot-madaa-vehamtzaa__semel.pdf`, gr 3–6)
  - Observes a plant and its leaves (rubs them: why does the smell get stronger?), then reads that glandular hairs and essential oil protect from radiation, cool the leaf, attract pollinators and repel enemies. Short answers.
  - MC: no. Book: a small page.

---

## 3. Organism ↔ environment (light, temperature, water, oxygen, soil)

- **3.1 Winter pool field study** (`catalog-winter-puddle-1.pdf`, gr 6, about 3 h in the field + 4–5 h in class). This is the main abiotic-measurement activity in the corpus.
  - Card 1, open observation:
    - free description, sounds, a photo or drawing
    - questions written with a word bank "מה ההשפעה? מה הקשר? מי נמצא? מהם התנאים? מהו ההבדל?"
  - Cards 2–5, abiotic group:
    - temperature, turbidity (a Secchi-type "squares disappear" depth), dissolved O₂ and pH
    - each measured at 10 / 25 / 50 cm / max depth, **3 repeats + mean**, plus air temperature ("hold the thermometer by its tip")
  - Cards 6–9, biotic group:
    - small animals on the surface, near the surface (net swept in a figure 8, 5 random sweeps "בלי לרדוף אחרי יצורים מסוימים"), at 20–30 cm, and in bottom mud
    - identified with a key; species and count ×3 checks; totals and means
  - Class work:
    - class tables A (abiotic by depth) and B (species and individuals by zone)
    - "differences? why?"
    - choose a representation (table / bar graph / other)
    - write research questions, judged against 5 criteria: empirical, relevant, feasible, knowledge-based, focused
    - put the inquiry stages in order using sticky notes
  - Type: instrument measurement with repeats, tally tables, means, choosing a representation, research-question writing.
  - MC: partial. **Light level falls with water depth and is readable in F3**, so "light vs depth" is a real MC measurement. Temperature, O₂, pH and turbidity are not modelled. The biotic sweep works as a count of fish, squid, axolotls and tadpoles by depth zone in a pond or ocean **(idea)**.
  - Book: the data tables (depth × repeat × mean) are ideal workbook pages with given data in book mode.
- **3.2 "Pine deserts" (מדבריות האורנים)** (`tahalich-heker-madai__Teaching_by_inquiry_6_grade_student.doc`, study 1)
  - Does:
    - reads about bare ground under pines
    - reads a lab experiment: 6 pots, 3 with plain soil and 3 with needles, 20 radish seeds each, a table of germinated and grown
    - answers why soil came from outside the forest, why equal pots and water (controls), and why 3 pots each (repeats)
    - judges whether the conclusion supports or refutes the hypothesis
    - reads a field experiment (needles removed in 2 of 4 plots) → the needle layer blocks **light**
    - thinks about how fire helps pine regrowth
    - completes the inquiry diagram
  - Type: evaluating a given experiment; interpreting a table; conclusion.
  - MC **(idea)**: saplings and grass need light ≥9. "Litter" slabs or carpets over plots vs open plots reproduce the field experiment faithfully.
  - Book: a ready-made page.
- **3.3 Narcissus in the schoolyard** (same booklet, study 3)
  - Does:
    - asks questions, reads about where narcissus grows, decides where to plant
    - reads a field experiment: 3 beds (full sun / 5–6 h / no direct sun) × 20 bulbs, same soil, depth and water
    - interprets tables: leaves after 1 week 0/8/15; flowers and height
    - spots a **confound** (sunny beds dried out) and says how to fix it
    - reads the year-2 redesign and compares it with year 1
    - decides between two fictional students' claims with an argument and proposes an experiment
  - Type: evaluating an experiment, finding a confounding variable, argument.
  - MC: crops need light ≥9 and hydrated farmland, so MC would show "more light = better". That is the **opposite** of the narcissus result, which makes it a useful "model vs reality" discussion **(idea)**. A controlled MC version: identical wheat plots under different light levels / hydration, with `randomTickSpeed` to speed growth and parallel plots as repeats.
  - Book: a ready-made page.
- **3.4 Seasonal tree observation** (`tu-shvat-mot__ezim_bair.doc`, gr 6 literacy task "עצים בעיר")
  - Does:
    - lists 3 benefits of city trees and 1 nuisance, plus pros and cons of birds and bats
    - says how 2 benefits differ ("מי/מה מושפע")
    - predicts seasonal change in the tree and in animal activity
    - interprets a 3-observation table (Jan/Apr/Jun: leaves, flowers, fruit, insects, butterflies, birds)
    - agrees or disagrees with "a tree is a habitat for many creatures" with reasons, and says which needs a tree supplies
    - judges whether observing a *different* tree species in another city is a valid follow-up (no: a changed subject)
    - (challenge) writes a research question comparing two species
  - Type: data-table interpretation, argument, spotting an invalid comparison, research-question writing.
  - MC: weak (trees have no seasons in vanilla). Book: a ready MITZAV-style page.
- **3.5 Hyrax thermoregulation and water** (`catalog-adaptation-animals-1.pdf`; booklet study 6)
  - Reads passages: basks to warm up, gets water from its food, feeds for under 1 h a day. Short answers: which need, what advantage.
  - Book only.
- **3.6 Soil / rocks** (`geosfera__Properties-of-rocks.pdf`, gr 5)
  - Acid test on 3 rocks with a table and characterisation card. Not ecology; prerequisite only.
  - MC: no. Book: a table page.
- Light, temperature and water also appear in §4.3 (ants and soil minerals), §2.7 (frogs and cold) and §6 (the spec's own suggested activity: "השפעת האור על נביטה/צמיחה").

---

## 4. Interactions between organisms (predation, food chains/webs, mutualism, parasitism, competition)

- **4.1 Predators, prey, food chain and web** (`hagada-matza-mada__10-Plagues-wild-animals.pdf`, gr 6)
  - Does:
    - lists what makes an animal a predator (body and behaviour) and gives 10 examples ("גם יצור קטן")
    - lists insect traits and 10 insects
    - reads a chain (carrot → rabbit → fox; "החיצים מסמלים את כיוון מעבר המזון")
    - reads a web diagram: "what does the fly → gecko arrow mean? does the gecko eat only flies?"
    - **sorts the web's animals into predators / prey** and explains which appear in both
    - plays a 12-card riddle game "ערוב קובע"
  - Type: interpreting a diagram, two-column sorting, card game.
  - MC: strong **(idea)**. Real predation edges are observable: wolf → sheep/rabbit/fox/skeleton; fox → chicken/rabbit/fish and **sweet berries (a true omnivore)**; ocelot or cat → chicken/rabbit/baby turtle; axolotl → fish/squid; frog → small slimes; sheep → grass. Kids can *draw the Overworld food web from their own observations*, which no Ministry file asks for.
  - Book: sorting table plus the web diagram.
- **4.2 Hyrax vs jackals: food or predators?** (`…Teaching_by_inquiry_6_grade_student.doc`, study 6)
  - Does:
    - reads that hyraxes increase in rainy years and jackals do too
    - judges two fictional students' claims (food vs predators)
    - reads field experiment 1: **fenced plots exclude predators**, counts in Feb/Sep, rainy vs normal year (85+92 = 177 vs 58+54 = 112)
    - reads experiment 2: unfenced plots (82 vs 66); jackals rose from 12 to 19
    - **builds table 3** combining both
    - concludes on food and on predation, judges both claims ("טענה + נימוק"), names the relationship type
  - Type: data tables, combining tables, argument structure, predator–prey reasoning.
  - MC: strong **(idea)**. Fenced vs unfenced plots with rabbits or chickens and foxes or wolves: predation is real and fences work. A "rainy year" = the class may breed (feed) twice as many animals. Honest caveat: prey breeding is player-driven, so food abundance is a stated rule, not an emergent effect.
  - Book: the tables as given.
- **4.3 Harvester ants and thistle: mutualism (הדדיות) and competition (תחרות)** (same booklet, study 4)
  - Does:
    - picks the sentence that states the phenomenon (MCQ)
    - reads observations: soil near nests has 3× the minerals; thistles there are 9× bigger
    - reads a field experiment (250 seeds at nests that had no thistles, across the country): ants remove the fatty part of the seed
    - explains observation vs experiment
    - answers "מה מרוויחות הנמלים? מה מרוויחים צמחי הגדילן?"
    - reads that near nests there are 7 plant species vs 24 elsewhere: what relationship is there between thistle and other plants, and between the two thistle species?
  - Type: MCQ, reading data, classifying the relationship type.
  - MC: no ants. Mutualism analogue: **bees pollinate crops and get nectar / honey**, a real mechanic **(idea)**. Competition is not simulated.
  - Book: a ready page. It is the corpus's only competition item.
- **4.4 Head lice: parasitism (טפילות)** (`hagada-matza-mada__10-Plagues-Lice.pdf`, gr 6)
  - Does:
    - labels body parts (matching lines)
    - fills a structure→function table from a function bank
    - reads the definition "טפיל – יצור חי שקיומו תלוי ביצור חי אחר וגורם לו נזק" and gives evidence the louse is a parasite
    - names the 2 substances it secretes
    - completes a life-cycle diagram
    - marks T/F and corrects the false statements
    - marks 9 myths T/F, then verifies one in sources
  - Type: labelling, table, definition + evidence, T/F with correction.
  - MC: none. Book: ready-made.
- **4.5 Vulture secondary poisoning: chains of effects** (`catalog-arthropods-2.pdf`, Arabic, gr 6, "consequences map" מפת השלכות)
  - Does:
    - reads a report (Golan vultures near extinction from eating poisoned carcasses; 2004 and 2007 data)
    - explains secondary poisoning with an example, says who is responsible, finds 2 reasons to save vultures
    - suggests ≥3 solutions and rates each on a 4-point **attitude questionnaire**
    - pools class answers in a spreadsheet → bar chart
    - builds a **consequences map** (cause→effect chains, then grouped into perspectives)
    - transfer task: a news report about ~100 poisoned jackals → describe, 3 solutions, recommend the tool to the parks authority
  - Type: reading, Likert, class bar chart, systems-mapping diagram, argument.
  - MC: weak (no scavengers). The cause→effect map belongs in the book.
  - Book: map organiser plus Likert table.
- **4.6 Bee dance (communication)** (booklet study 5)
  - Von Frisch's observation and field experiment; questions on hypothesis, why repeat, conclusion.
  - MC: bees exist but have no dance. Book only.
- **4.7 Mosquitoes: who gets bitten** (booklet study 2)
  - Field vs lab experiment on sweat as repellent or attractant (left hand = control, 10 per group).
  - A table comparing the field and lab experiments by criteria; when to use each; which of two products to develop, with an argument.
  - Animal–human interaction, but mainly an inquiry item (§6). Book only.

---

## 5. Human impact (habitat loss, deforestation, poisoning, climate, laws and reserves)

- **5.1 Save the rainforests** (`catalog-rainforests-1.pdf`, gr 6 "משימת אוריינות" with a full **scoring rubric** (מחוון); the clearest MITZAV-style unit)
  - A. Petition news item (Brazil cuts protected rainforest from 80% to 50%): MCQ inference, then the two positions with "בעד/נגד".
  - B. Climate passage: MCQ on climate, "why called a *rain* forest", what allows high diversity.
  - C.
    - pick 2 of 7 fictional students' claims against logging (oxygen, food web, warming, soil fertility, erosion, undiscovered species, a global problem) and explain each claim
    - role-play the justifications of a farmer and of a furniture maker
    - **bar graph** of deforested km² per year: axes, what the bars show, peak year, trend 2004–15, hypothesis
    - passage: 2 explanations (fines, more reserves)
    - **draw the 2016 bar** (double 2015)
  - D. Ungraded 1–4 attitude scale.
  - Type: MCQ, reading for information, cause–effect explanation, perspective-taking argument, graph reading and drawing, attitude.
  - MC: jungle logging is real and trees don't regrow unless replanted. The consequences (parrots or ocelots lost, erosion) are not simulated. A datapack could remove parrots when jungle logs fall below N **(idea)**. Better: keep the data in the book and use MC for a before/after build or survey.
  - Book: copy the structure for every human-impact page.
- **5.2 Easter Island** (`pothim-shana-madaim__nature-pasha.doc`)
  - Does:
    - reads the collapse story (palms cut, rats eat palm nuts, 6 land birds extinct, rain declines)
    - locates the island on a map / Google Earth
    - lists the island's resources and **sorts them into living vs non-living**
    - **draws a diagram of the chain of consequences of over-cutting trees**
    - answers why it collapsed and how it could have been saved
  - Type: reading, sorting, cause–effect diagram.
  - MC: excellent **(idea)**. A shared class island: wood is needed for "statues" and boats, and trees only come back if the class replants. A real common-pool dilemma. The rats are not simulable without the mod.
  - Book: story + chain diagram.
- **5.3 Ibex protection** (`catalog-adaptation-animals-1.pdf`, "הידעתם")
  - Endangered by hunting; the 1955 wildlife protection law; annual census by the Nature and Parks Authority; population recovered.
  - The only law/reserve content for Israeli fauna, and it is info only, with no task.
- **5.4 Winter pools disappearing** (`catalog-winter-puddle-1.pdf`, teacher background)
  - Causes: building, drainage, pollution. Protection: cleanup, signs, fencing, invasive-species control, keeping the vegetation.
  - Teacher text only.
- **5.5 Ecological footprint** (`hashpaat-adam-al-sviva__climate.a.pdf` gr 5; `climate.b.pptx` template)
  - Does:
    - "step line" game: step forward for each unsustainable "yes" (disposables, meat, car, new toy, flight)
    - or a questionnaire summed to a score
    - class bar graph
    - traces own footprint and computes the % of floor area covered
    - 6 groups research a problem (overfishing, quarries, consumerism, deforestation, transport, disposables) into a shared slide template: science background / uses / damages / national solutions / home solutions
    - presents creatively, explains 3 concepts, reflection roulette, family footprint homework
  - Type: movement game, self-survey, bar graph, structured research slide.
  - MC: "blocks mined/placed per player" stats could be a footprint **(idea)**. Weak but fun.
  - Book: the slide template = a one-page research organiser.
- **5.6 Global-warming escape box** (`hashpaat-adam-al-sviva__climate.c.pdf`, gr 4, ok for 5–6)
  - Riddles, each giving a lock code:
    - sort pictures of air-pollution sources into transport/industry/agriculture (the counts give code 512)
    - **read a pie chart** of greenhouse-gas sources (the answers give 1314)
    - QR video → **match** statements to "climate change" vs "consequences"
    - domino: normal climate ↔ climate emergency
    - cipher: pick the **true** statements (2, 3, 5 → 523)
    - certificate
  - Type: sorting, pie-chart reading, matching, T/F.
  - MC: native fit. Number locks with command blocks or redstone, each room a riddle.
  - Book: works as a "code puzzle" page.
- **5.7 Climate change stations** (`climate.d.pdf`, gr 6)
  - Picture gallery (choose a picture, feelings, a title); 7–8 info stations (waste, air, water, soil, energy, biodiversity/extinction, trees) → problem / causes / dangers; 5-minute creative presentation; **formulate a hypothesis explaining global warming**; personal solutions; homework: analyse a news article (problems, solutions, own idea, position).
  - Type: station reading, hypothesis, presentation, media analysis.
  - MC: low. Book: an article-analysis template.
- **5.8 Extreme climate** (`climate-changing__Extremeclimate.docx`, gr 5–7)
  - Identify phenomena in pictures; group research on one phenomenon → a **class summary table**; mark what is common and what differs; causes; which ones humans can reduce; video questions; "do and don't" sheet; family "climate trustee" commitments.
  - MC: weather and lightning fires are weak analogues. Book: a comparison-table page.
- **5.9 Food waste** (`meniat-bizbuz-mazon__OvdanMazonYesodi.pdf`, gr 3–6; `packing.pdf` gr 5)
  - Weigh family food waste for a week; neighbourhood questionnaire → spreadsheet; pairs make a research slide; write rules; re-weigh and graph.
  - The packing experiment: packaging type vs fruit freshness, with hypothesis, photos, observation table over time and conclusion.
  - MC: none. Book: data-log pages.
- **5.10 Seder Tu B'Shvat "ecological confession"** (`tu-shvat-mot__Seder-Tu-BShvat.pdf`)
  - A ceremonial alphabetical list of human damages ("כרתנו יערות… עקרנו ציפורים ממחוזות קינון…"). No task.
  - Usable as raw text for a sorting exercise **(idea)**.

---

## 6. The inquiry process (תהליך חקר מדעי), including observation and data representation

- **6.1 "From phenomenon to explanation" (מתופעה להסבר)**, the Ministry grade 6 inquiry booklet (`tahalich-heker-madai__Teaching_by_inquiry_6_grade_student.doc` + teacher guide, re-converted). This is the backbone.
  - Part A: 6 worked studies (§3.2, §3.3, §4.2, §4.3, §4.6, §4.7). Each pairs a story with data, a recurring question set and a process diagram to complete:
    - "מדוע לקחו עציצים שווים…? מדוע 3 עציצים?" (controls, repeats)
    - "המסקנה תומכת/מפריכה?" (supports or refutes)
    - "מה ההבדל בין תצפית לניסוי?" (observation vs experiment)
    - field vs lab comparison table
  - Part B, own full inquiry:
    - tour, then a class-agreed observation sheet
    - pick a phenomenon and list its parts: living / non-living / conditions
    - **question table: question | why I asked | expected answer**
    - **filter, merge and sort the questions** (worked wasp example)
    - sort into "information questions vs other"
    - look up answers; list remaining and new questions
    - mark which questions need **measurement / focused observation / experiment**, with a reason
    - plan a measurement (what, instrument, how, when, how many repeats, data table)
    - plan an observation (where, when, how long, what, repeats)
    - plan an experiment (how many set-ups, what stays constant, what is tested and how, data table), each with a "חושבים רגע!" checklist
    - run it, analyse with a table or graph, conclude
    - complete the diagram, suggest follow-ups
    - report template with sources
  - Part C: a 9-slide presentation template and a science poster.
  - Part D: rubric and feedback (see Part 3).
  - Teacher guide school examples: egrets roosting on schoolyard pines (parents wanted the trees cut, so students investigated), with a full question bank sorted info vs inquiry and observation forms; lichens on a wall near an AC drip.
  - Type: evaluating given experiments, question sorting, choosing a method, planning tables, report.
  - MC: this is where Minecraft is a real lab **(idea)**. Variables are controllable: light (torches), water (hydration), bone meal, `randomTickSpeed`, biome. Repeats = identical parallel plots. Observation vs experiment maps onto "count mobs in two biomes" vs "change one thing in a plot". The question table and planning sheets live in a book & quill or the printed workbook.
  - Book: Part B is essentially a ready workbook chapter.
- **6.2 Inquiry starter pack** (`tahalich-heker-madai__oraat-taalih-heker.docx`)
  - Video → write the stages; research-question templates "מה הקשר בין… לבין…? / מה ההבדל בין…? / כיצד משפיע… על…?"; examples (soil type vs plant amount; feeding boxes vs number of birds); go to the yard → ≥1 research question per group; **QR-code stations → write 3 research questions from given experiments**; 3 repeats; poster; school fair.
  - MC: QR stations = signs at MC experiment stations. Book: question-template page.
- **6.3 Inquiry flowchart** (`tarshimheker.pdf`, gr 5–6)
  - Phenomenon → questions → sort → info vs research question → hypothesis → experiment or observation → data → analysis → conclusion → support/refute → new cycle.
  - Usable as a cut-and-order card set (the puddle unit does this with sticky notes).
- **6.4 Observation skills** (`heker-ziporim__tazpit.pdf`, slides)
  - Class exercise: describe a plant freely vs with a detailed guide → "טיב התצפית תלוי בסוג ההנחיות"; optical illusions → "we see what we expect"; find differences between two songbirds → infer food or habitat; look 30 s, then list from memory / with notes / "only what's edible".
  - MC: the memory exercise works with a screenshot or an MC scene. Book: good warm-up page.
- **6.5 Bird-study protocol** (`heker-ziporim__hadraha_plia.docx`, `tazpit_isuf.doc`, `citizens_collaborate_with_science.pdf`)
  - Wonder walk: quiet approach, don't point, 20 min (5 settle / 10 observe / 5 record). Identify by size, tail, crest, colour, location and by **sound** (near or far, call and answer, record). How to focus binoculars.
  - Structured data sheet:
    - site type and weather; vegetation cover %
    - phenology codes 0–4 for leaves, flowers and fruit
    - animals by class with location and activity signs
    - bird species × count × location
    - 10-minute behaviour log with location and activity codes (preening, mobbing, nest-building…)
  - Citizen-science backyard count rules: 50 m radius, 15 min, 07–10, ≥300 m between sites, max simultaneous count per species, one form per site.
  - Type: protocol-driven field count, coded behaviour log.
  - MC: excellent for **protocol discipline** **(idea)**. A "mob count" with the same rules: radius, time window, max simultaneous count, one form per site. `/execute if entity @e[type=…,distance=..50]` gives a check count.
  - Book: the coded data sheet is reusable as is.
- **6.6 Representing data in different ways: arthropod monitoring** (`catalog-arthropods-1.pdf`, gr 6, 4–6 h)
  - Does:
    - reads real student pitfall-trap results from Ramat Hanadiv (pine grove vs shrubland) as a long verbal list: what's wrong with a list?
    - fills a tally form by class and type
    - designs a **comparison table** (purpose, objects, criteria, rows, columns, title)
    - designs a **double bar chart** (axes, legend, title), describes it in words and concludes
    - says which representation is better, and why
    - a meta table of representation types
    - transfer task: 4 fictional students want different things about birds in two habitats; assign each a representation and justify
  - Type: data transformation (list → form → table → chart), choosing a representation.
  - MC: strong **(idea)**. "Monitor" two biomes (forest vs plains), tally mob types, then the same table → chart sequence. Monitoring = repeating the count on later game days.
  - Book: ready-made sequence of 4 pages.
- **6.7 Also in the corpus**:
  - experiment-design items in the beak unit (§2.5 logical way)
  - research-question criteria and question writing in the puddle unit (§3.1)
  - the Tu B'Shvat paper-flower station: hypothesis, "מהו הגורם המשפיע / המושפע", how to measure opening speed (`tu-shvat-mot__TuBishvat_Tests.pdf`)
  - germination in an egg carton with a 10-day observation sheet (same file)
  - the packing experiment (§5.9)

---

# Part 2: Recurring exercise types (count = number of distinct units/files using it, out of about 34 units reviewed)

| Type | Units | Best examples |
|---|---|---|
| Read a passage → open short answers (הפקת מידע מטקסט) | 20 | rainforests; inquiry booklet studies |
| Fill or design a table (observation sheet, characterisation card, comparison table, structure→function) | 14 | winter-pool cards 2–9; beak characterisation cards |
| Reflection / metacognition questions | 11 | beaks (process / knowledge / experience); winter pool |
| Creative product or presentation (slides, poster, limerick, clip, comic) | 12 | animals around school "בעין המצלמה"; inquiry poster template |
| Write questions / research questions (often with a question-word bank) | 9 | inquiry Part B question table; winter-pool card 1 |
| Diagram or model drawing (food web, life cycle, consequences map, inquiry diagram, design sketch) | 9 | Easter Island consequence chain; vultures consequences map |
| Sorting / classification into categories | 8 | predators/prey (wild animals); info vs research questions (inquiry) |
| Interpret a given table or graph | 8 | hyrax fenced/unfenced tables; rainforest deforestation bar graph |
| Construct a graph or choose a representation | 8 | arthropod double bar chart; "add the 2016 bar" |
| Hypothesis formulation | 8 | beaks (food per beak); winter pool "what happens in summer" |
| Field observation outdoors | 8 | winter pool; bird count protocol |
| Games / puzzles (crossword, 5-in-a-row, card match, riddle cards, escape box, pantomime) | 7 | climate escape box; beak↔info card match |
| Matching (draw lines, cards, domino) | 6 | hyrax need↔how; kitchen tool↔beak |
| Argument (claim + reason), incl. role perspectives | 6 | hyrax two-claims argument; rainforest farmer vs furniture maker |
| Design own experiment or investigation | 5 | beaks Way 2 (influencing/affected factor); inquiry Part B planning sheets |
| True/false (incl. "correct the false ones") | 4 | lice life cycle; climate cipher |
| Design a product or habitat (biomimicry, enclosure) | 3 | ibex shoe sole; hyrax safari enclosure |
| Multiple choice | 3 (plus about half of MITZAV) | rainforests Q A1 / B1; ants "which sentence states the phenomenon" |
| Instrument measurement with repeats and means | 3 | winter pool (3 repeats × 4 depths) |
| Attitude scale (Likert, ungraded) | 3 | rainforests D; vultures |
| Evaluate a given experiment (why controls, repeats, field vs lab, confounds) | 2 units, but ~30 items | pine deserts; narcissus confound; "Eldad's tree" |

Pattern: almost every unit is **passage or data → short open answers → one transformation** (table, chart, diagram or argument) → reflection. Pure recall items are rare. MCQ and T/F appear mainly in games and in the one literacy task.

---

# Part 3: Assessment: what is asked and what is graded

- **MITZAV / Tnufa grade 6 spec** (`mitzav-sci-spec-grade6-2027.pdf`; 2026 and Haredi versions are the same in structure)
  - About 30 questions, about half closed ("רב-ברירה, שאלות התאמה ועוד") and half open. Open answers are also graded for "שימוש נכון בשפה מדעית".
  - Organised in **units**, each opening with an information passage on a phenomenon. A unit mixes content areas.
  - 90 min (+30).
  - **Ecology is the largest share: ~25%** (Haredi version also 25%).
  - Built on 4 literacy core abilities:
    - (א) nature of science: scientific vs non-scientific questions, methods, judging media reports
    - (ב) explaining phenomena: models, systems thinking, predicting the effect of changing a component
    - (ג) designing and evaluating inquiry: questions, hypotheses, design, limitations, reliability
    - (ד) interpreting data and evidence: analysis, representations, judging conclusions
  - The 2025 version was **digital**: typed answers, some units with videos or simulations, partly auto-scored.
  - No school, class or student grades are reported.
- **The ready-made MITZAV-like items in our files**:
  - `catalog-rainforests-1.pdf`: one passage-based unit with MCQ + open + graph read/draw + ungraded attitude, and a **rubric giving each question's skill (מטרת השאלה) with 100% / 50% / 0** criteria. The graph question is split 16%×4 + 18%×2.
  - `tu-shvat-mot__ezim_bair.doc`: a "משימה אוריינית", same pattern.
  - The real RAMA item bank and the "מבדק תנופה ו' תשפ"ה" are behind teacher login and **not in our files**.
- **Inquiry rubric** (`…6_grade_teacher.doc`, Part D)
  - Levels low / medium / high = 3/7/10 per stage (question stage 5/10/15; follow-up ideas 1/3/5). Stages:
    1. phenomenon presented (place, why chosen, scientific language)
    2. question tables: components, info questions with answers, chosen research questions "ברורה, ממוקדת ומעשית" (clear, focused, practical)
    3. plan: aim, materials, **control, repeats**, timing
    4. execution per plan, orderly data table, photos
    5. processed tables + verbal description
    6. conclusions answer the research question; class-wide synthesis; sources cited
    7. follow-up questions; summary report; presentation
  - Plus a student feedback form (11 statements on a 1–5 scale + 2 "improve" and 2 "liked").
- **Four "alternative assessment" performance tasks** (`assessment__*`, gr 4–6, topic-agnostic; the teacher picks the topic). All share a 4–5 stage process:
  - meet the task
  - **collect and organise information** (≥2 reliable sources, a short summary in scientific language)
  - **plan** (planning sheet + "בודקים ומתקנים" self-check)
  - final product, with **peer feedback** and changes documented
  - group and personal reflection
  - Rubrics on a 0 / 1–2 / 3 / 4 / 5 scale. Escape-room and game tasks weight process 45% (info 15%, planning 30%) and expertise 55% (product 30%, accompanying document 15%, conduct 10%).
  - **Escape room**: students *build* one: sub-topics per room, a plot, riddles of different types and difficulty, hints, locks, a flow diagram, ≥30 minutes of play.
  - **Educational game**: students build a game; first they analyse existing games with a yes/no checklist (name, audience, contents, rules, goal, how it ends).
  - **Scientific model**: choose a model type (cause–effect, structural, developmental, classification, scale), detailed diagram, **compare model vs reality via a legend**. Rubric: process 35% / execution 65%.
  - **Photo**: photograph a phenomenon and write a **scientific explanation = claim + evidence + reasoning** (worked example: seed dispersal by harvester ants). Rubric: opens with a claim; relies on facts; objective language "ללא פרשנות אישית וללא האנשה"; uses scientific terms (0/1/3/5).
  - **These four port to Minecraft almost one-to-one:**
    - build an escape room or game in MC
    - build a model in MC whose legend says what MC gets wrong (a direct use of the model rubric)
    - "photo" = an F2 screenshot of an in-game phenomenon + claim–evidence–reasoning
  - This is the most useful assessment finding.
- **Other graded or checked items**:
  - the "בעין המצלמה" self-check: 5 yes/no criteria (built to plan? clear message? attractive? clear text/images? on time?)
  - peer review: "מה אהבתם? מה לשפר?"
  - the beak and puddle units grade nothing explicitly (reflection only)

---

# Part 4: Gaps (spec topics with no, or only thin, Ministry activity in our files)

- **Conditions for life, Earth vs other planets:** no ecology activity. Only the astronomy "picnic" design task, the planet info passages and one greenhouse sentence (§1).
- **Competition (תחרות):** only 2 questions inside the ants/thistle study.
- **Mutualism:** only ants/thistle (plus pollination mentions).
- **Parasitism:** only head lice.
- **Food webs:** students *read* one given web and sort predators/prey. No file has students *build* a web from data, and decomposers appear only in teacher background (arthropods).
- **Herbivore / carnivore / omnivore:** only as a field on the observation sheet ("טורף/צמחוני/אוכל כל") and the predator/prey sort. No dedicated exercise.
- **Habitats:**
  - Desert: covered through ibex and hyrax (cliffs, rocks). **No camel activity**; desert plants appear only as a video link.
  - Lake: only the temporary winter pool; fish adaptations only as a video link.
  - Woodland (חורש): pine grove vs shrubland (arthropods) and pine deserts. No dedicated woodland unit.
  - Beaks: well covered.
- **Oxygen:** only dissolved O₂ in the pool and one rainforest claim; no oxygen experiment.
- **Soil:** only grade 5 rocks, plus ants and minerals, plus needles.
- **Laws and reserves:** only info boxes (the 1955 wildlife law and ibex census; Brazil's forest law, fines and reserves); no task on Israeli reserves or protected plants.
- **Listed on the Ministry grade 6 topic pages but not downloaded** (worth fetching next):
  - "שומרים על הסנוניות"
  - "מצילים את גינת הפרפרים"
  - "מיינה מצויה – מין פולש" (invasive species)
  - the matar "יחסי גומלין" activity
  - "הסוואה וחיקוי בטבע" with its **task / rubric / test-map** set (an adaptations assessment)
  - "מגוון ביולוגי (כיתה ו)"
  - research stories (Van Helmont, Semmelweis)
  - "הצעות לשאלות חקר לתלמידי כיתה ו"
  - "מילות שאלה" poster
  - matar "משימות אוריינות" (password)
  - RAMA item bank and Tnufa tests (login)
- **Out of scope but scanned:** eye/ear units, energy and sound, technology/engineering, safety, Hanukkah/Purim chemistry, darkness and hail plagues, Mediterranean plate, olive-harvest comparison table (7minim). None has ecology exercises beyond what is noted above.
