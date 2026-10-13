# Grade 6 light, energy and technology: what the Ministry's own materials make students do

Research for the grade 6 Minecraft (Java) science course and its "book mode" workbook. Scope: energy types and
conversions, light (the school chose light, not sound), the eye, communication and the nervous system, electrical
energy, energy resources and power stations, the environment and climate, electricity consumption, technological
systems, production, the engineering design process (תכן הנדסי) and safety.

**How to read this.** Section 1 goes topic by topic. Each entry gives the source file (paths are relative to
`minecraft-edu/curriculum/science/`), one line on what the student actually does, the exercise types as tags, and
two lines marked **(idea)**: (a) how it could become a Minecraft task, and (b) how it could become a printed workbook
page. Everything that is not marked (idea) comes from the files. Section 2 counts the recurring exercise types,
section 3 covers assessment formats, and section 4 lists the gaps.

## 0. Before you use these files: five warnings

1. **The ten `.doc` extracts in the scratchpad `txt/` folder are unreadable.** Every Hebrew letter came out as `?`
   (Windows-1255 encoding). I re-extracted them as UTF-8 into
   `/tmp/claude-0/-home-user-ClassPet/debcc456-7ca9-5bcb-8107-2bc25319806b/scratchpad/docconv/`, using
   `soffice --headless --convert-to 'txt:Text (encoded):UTF8'`. The files affected:
   `light-energy__nisuy_ashpaha_shemesh`, both `pitron-beayot-technologya__al_dema_*`,
   `energyat-kol__kolot-zlilim`, `energyat-kol__raash_tachbura`, both `tahalich-heker-madai__Teaching_by_inquiry_6_grade_*`,
   `tu-shvat-mot__ezim_bair`, `heker-ziporim__tazpit_isuf`, `pothim-shana-madaim__nature-pasha`, and
   `curriculum/sci-curriculum-pedagogical-principles.doc`. Any other agent that read the old extracts saw nothing.
2. **INDEX.md swaps the two eye catalogue titles.** `catalog-eye-outside-*` is actually "מבנה העין – מה **שלא**
   רואים מבחוץ" (the inside of the eye, a lesson built on models). `catalog-external-eye-observation-*` is actually
   "מבנה העין – מה **שרואים** מבחוץ" (the front of the eye, a lesson built on observation). In both sets, files
   2–5 are generic method material: a teacher's guide, a slide deck and Hebrew and Arabic "navigation cards".
3. **There are no image-only PDFs in my topics.** `maarechet-neshima__virtual-lab.pdf` is almost empty (a QR code
   and links only) and has nothing on my topics. `heker-ziporim__hitbonenut.docx` and
   `madaey-kador-arezh-ayekom-astronomia__planeta-names.docx` are empty, but neither is mine.
4. **Most of the light and energy material is external and was never downloaded.** The topic pages
   (`web/sci-teaching-materials-topic-pages-and-resources.md`) and the content spec link to TAU MATAR, stemil.org,
   kids.gov.il, Canva and Google Slides. The STEM units the spec names (קטפולטה, טורבינות רוח, שבשבת הרוח בפעולה,
   כנפיים מעץ, אתגר הדאון, פיתרונימוס, סטתוסקופ, המטריה, אסון כתם הנפט, מארז משימות בנושא אנרגיה) exist here
   **only as titles and links**. I list their URLs in section 4.
5. **Grade labels.** Several technology projects (פחית שתייה, מסיבה מנייר) and the darkness-plague unit are labelled
   grade 5. The engineering design process is taught "in grade 5 **or** 6" (content spec), so they still apply.
   Items marked "2016 curriculum, grades 7–9" come from the junior-high part of the signed 2016 curriculum. They
   are not grade 6, but their exercise types carry over.

Source shorthand used below:
- **SPEC** = `curriculum/sci-content-spec-grade6-tashpaz.docx`, the activity column (פעילויות לימודיות). "Mandatory"
  means it is listed under התנסויות חובה.
- **2016** = `curriculum/sci-curriculum-elementary-grades1-6-signed-2016.docx`, the grade 6 activity column unless
  stated otherwise.
- **HAN** = `lessons/hanoka-mada__hanukkahefteacher.pdf`. This is the Hanukkah teacher's guide for grades 5–6, and
  it is in fact a complete light unit: sources, straight lines, reflection and absorption, shadows, refraction and
  the solar heater. Only the teacher version was downloaded; the matching student booklet was not.

---

## 1. Topic by topic

### 1.1 Energy types, conversions and transfers (6 h; teaching emphasis: "flow diagrams")

- **E1 Flow diagrams of conversions and transfers** · SPEC, plus 2016 ("ינתחו המרות אנרגיה במערכות טכנולוגיות").
  Does: identifies the types of energy in natural and technological examples and draws the conversions and
  transfers as a flow diagram. SPEC's own examples: a fan (electrical energy → motion), a hot cup on a table
  (heat passes to the table), and a kettle (electrical energy → heat → the water).
  Types: `flow-diagram` `sorting`
  (a) **(idea)** "Energy detective" walk. Every machine in a village (a furnace, a minecart on powered rails, a
  lamp, a note block) carries a sign. The kid clicks it and builds the chain from coloured "energy-type" items in a
  hopper row, and the game checks the order.
  (b) **(idea)** Arrow-box templates (◻→◻→◻) with energy-type stickers to cut out. Six everyday pictures to
  diagram.
- **E2 Build a device with at least two conversions and two transfers** · SPEC (challenge example).
  Does: designs and builds a contraption and names each conversion and transfer in it.
  Types: `build-device` `design-process`
  (a) **(idea)** A Rube-Goldberg redstone build in creative mode with a "conversion counter" (one scoreboard
  point for each kind of block used). This needs our own definitions of which blocks count as which conversion.
  (b) **(idea)** A planning page (sketch, a numbered list of steps, the energy type at each step) plus a photo slot.
- **E3 "Challenge task": does a glass cover speed up heating in the sun?** · `lessons/light-energy__nisuy_ashpaha_shemesh.doc`
  (grade 6, energy unit). The readable copy is in `docconv/`.
  Does: analyses a reported experiment (chocolate in the sun under a glass box versus uncovered, 3 repeats each:
  2.5/3/3.5 min versus 4.5/5/5.5 min). The student writes what was tested, a hypothesis, three things kept the
  same, the one thing changed and the measuring tool; explains why repeats matter; designs the results table
  ("how many columns? rows? title?"); draws a bar graph; writes a conclusion; and transfers it to "an object left in
  a hot car". Then an argument: "Almog says a lid makes the pot boil faster, Omer disagrees: who is right?" Optional
  challenge: a glass skylight in Beer Sheva versus Copenhagen.
  Types: `experiment-analysis` `data-table` `graph` `argument` `transfer-question`
  (a) **(idea)** Two identical "chocolate" blocks in the sun, one under a glass dome. Our mod gives blocks a
  temperature that rises under glass (a greenhouse model). The kid times melting with an in-game clock, repeats
  three times and enters the times into a book.
  (b) **(idea)** Port it almost as it is: an empty table grid, an empty bar-graph grid, and the Almog/Omer
  argument box.
- **E4 (2016, grades 7–9, transferable) Three forms of conversion diagram.** Draw the diagram for a lamp, a radio
  or a fan. Turn written statements into diagrams. Turn a diagram of components into a written description.
  Types: `flow-diagram`
- Named but not in the repo: the STEM units "קטפולטה" and "טורבינות רוח" (stemil.org), "מארז משימות בנושא אנרגיה"
  (Canva), and MATAR's "מוזיאון מדע כסביבת למידה – המרות ומעברי אנרגייה (כיתה ו)".

### 1.2 Light sources versus objects that reflect light (גופים מפיקי אור / מחזירי אור)

- **S1 Brainstorm and sort light sources** · HAN p.1.
  Does: answers "מה אומרת לי המילה אור?". Then lists natural sources (lightning, firefly, volcano) and artificial
  ones (torch, oil lamp, candle), and other light phenomena (the moon, the sun, stars, glowing animals, fire).
  Types: `brainstorm` `sorting`
  (a) **(idea)** A collecting quest: gather glowstone, a torch, glow lichen, a sea pickle, a lantern, a glow squid
  ink sac, a firefly bush (check that it exists in the target version) and a mirror item from our mod. Sort them
  into two chests, "produces light" and "only reflects light". The moon is a trick card.
  (b) **(idea)** A cut-and-sort card page with two columns, plus a "trap" card (the moon).
- **S2 "How can a larva become a torch?"** · HAN.
  Does: reads an article about the glow-worms in the Waitomo caves and answers comprehension questions (where,
  who used them, what bioluminescence is, how the light is made, how it helps the larva). Optional research
  question: which other animals glow, and why (prey, mates, defence, camouflage).
  Types: `reading-comprehension` `info-research`
  (a) **(idea)** A dark cave where glowing "larvae" (our mob, or glow lichen as a stand-in) lure insects. The kid
  answers a villager's questions.
  (b) **(idea)** A short text plus 6 questions, as in the original.
- **S3 "Why do we see objects that aren't light sources?"** · HAN.
  Does: a challenge question for discussion only. The box experiment in T1 answers it.
  Types: `discussion`
- **S4 Seven lighting technologies in historical order** · `lessons/hagada-matza-mada__10-Plagues-darkness.pdf` (grade 5).
  Does: draws lines from 7 pictured lamps to their order of invention, using a word bank (עץ בוער, נורת שמן, נר
  שעווה, נורת נפט, נורת ליבון, פלואורסנטית, לד), and names the human need they meet.
  Types: `ordering` `matching`
  (a) **(idea)** A "museum corridor" with seven empty display plinths. The kid places the lamps in order and the
  doors open when the order is right.
  (b) **(idea)** A timeline strip with pictures to cut out and glue.
- **S5 The oil lamp: a fuel, its parts and their functions** · `lessons/70-shnot-madaa-vehamtzaa__7minim.pdf`
  activity 7 (grades 3–6), plus `lessons/70-shnot-madaa-vehamtzaa__semel.pdf` (make an oil lamp and observe it).
  Does: watches the teacher burn olive oil in a spoon ("does olive oil burn?" → heat and light are released).
  Identifies the parts of an ancient oil lamp (the filling hole, the nozzle, the handle) and explains how its
  structure fits its function. Fills a comparison table for an oil lamp versus a wax candle (parts, fuel, how it
  works).
  Types: `demonstration` `labelling` `comparison-table`
  (a) **(idea)** A crafting recipe for an oil lamp (clay + olive oil + wick) that gives light only while it holds
  fuel. Show the fuel draining.
  (b) **(idea)** A drawing of the lamp with label lines, and a two-column comparison table.
- Named but not in the repo: MATAR "לאור הירח – מואר או מאיר (כיתה ו)", which is exactly the moon-as-reflector
  lesson.

### 1.3 Light travels in straight lines (extension in SPEC)

- **T1 The shoebox and the straw** · HAN.
  Does: makes a small hole in a closed shoebox, pushes a straw or black tube into it and seals it with plasticine,
  and looks through it at a phone torch. With the tube straight the torch is visible; bent, it is not. Then a small
  object is placed in the box: it is visible with the torch on and invisible with the torch off and the lid shut.
  The student explains in writing ("light from the torch hits the eraser and from there reaches our eyes").
  Types: `experiment` `yes-no-recording` `explanation`
  (a) **(idea)** Honest note: **vanilla Minecraft light does not travel in straight lines.** Block light floods
  around corners and drops by one level per block. Show it with a datapack "ray" instead: particles step forward
  from a light block and stop at the first opaque block. A straight tube versus a bent tube of glass gives the
  same result as the straw. Then the dark box: an item frame inside is visible only while the "torch ray" reaches
  it. This could also become a deliberate lesson: "the game is wrong, here is how real light behaves".
  (b) **(idea)** A two-picture page (straight / bent) with yes/no boxes and a "why" line.
- **T2 Content statement** · SPEC: light moves in straight lines in all directions (a torch beam). It travels
  through transparent materials and through a vacuum, and a wall blocks it. There is no activity attached.

### 1.4 White light and the spectrum (prism, Newton disc)

- **W1 Prism on the wall** · SPEC (mandatory).
  Does: aims a triangular prism at the light, looks at the colours on the wall, draws a conclusion and compares it
  with other groups' conclusions.
  Types: `observation` `argument` `compare-groups`
  (a) **(idea)** This needs our mod: a prism block that splits a white "ray" into seven coloured beams on a wall.
  A vanilla stand-in is the beacon beam through stained glass, but that shows colour **mixing**, not splitting.
  Say so to the kids.
  (b) **(idea)** A "draw the colours you saw, in order" strip and a sentence frame ("האור הלבן מורכב מ…").
- **W2 Spin the Newton disc** · SPEC (mandatory); also HAN ("כאשר מסובבים במהירות את הגלגל מתקבל הצבע הלבן").
  Does: spins a seven-colour disc fast and explains why it looks white.
  Types: `observation` `argument`
  (a) **(idea)** A rotating block-display disc. It needs a custom texture or shader to blend to white, so it is
  hard to do convincingly. Better done physically, or as a printed disc.
  (b) **(idea)** A printable Newton disc to cut out and spin on a pencil. This is the best medium for it.
- **W3 The rainbow** · HAN.
  Does: looks at a rainbow photo, writes what is the same and what differs, and lists the colours.
  Types: `observation` `comparison`
- **W4 (2016, grades 7–9, transferable)** Watch a filmed experiment in which a prism splits white light and a second
  prism recombines it. View different light sources through a diffraction grating and compare their spectra.
  Types: `observation` `comparison`
- **W5** `lessons/assessment__model-task-accessible.pdf` uses "a model that explains white light as built of
  different wavelengths" as its sample of a scientific model.

### 1.5 Reflection, absorption and transmission (light and dark objects)

- **R1 Light and dark paper squares in a dark box** · SPEC (mandatory).
  Does: looks at light and dark squares of paper inside a dark box and concludes which objects reflect more light.
  Types: `observation` `argument`
  (a) **(idea)** A dark room with white and black wool panels. A single "torch ray" (datapack) bounces visibly off
  the white panel and stops at the black one.
  (b) **(idea)** A peep-box template to fold, and a results line.
- **R2 Does colour affect heating in the sun?** · SPEC (mandatory; ✧ plan the research; safety: use a thermometer
  without mercury). The 2016 version: coloured sheets, measuring light intensity and temperature under them with a
  **light sensor**. MATAR's "חם במגרש" and "חימום חומרים בשמש בקופסאות בצבעים שונים" are external.
  Does: plans and runs a fair test: containers of different colours in the sun, measuring the temperature change.
  Types: `experiment` `data-table` `graph`
  (a) **(idea)** Coloured concrete tanks of water in the sun, each with a "thermometer" (our item reads a
  temperature value). Vanilla's **daylight detector** can act as a light sensor that gives a 0–15 redstone
  reading.
  (b) **(idea)** A fair-test planner (what we change / what we keep the same / what we measure) and a
  colour-by-minute table.
- **R3 The "magic lantern" (פנס הקסם)** · HAN.
  Does: draws on a clear plastic sleeve over black paper, so the drawing is invisible. Slides a white paper
  "lantern" underneath and the drawing appears. Explains it with absorption and reflection. Then designs their own
  experiment (aim → hypothesis → procedure written as verbs: "נבחר צבע, נשים בשמרדף…" → results "without
  explaining" → conclusion), varying the background colour, and compares results across groups ("results that
  match across groups give the conclusion validity").
  Types: `build-device` `experiment-design` `explanation` `compare-groups`
  (a) **(idea)** Map art drawn on a black map: the kid can't read it until a "white-light lantern" item is held
  over the item frame. A hidden message or treasure map makes it fun.
  (b) **(idea)** Do it physically. The workbook gives the experiment frame with the verb hints.
- **R4 Transparent or opaque: shadow or no shadow** · `lessons/light-energy__silhouettes.pptx` slides 4–9, and HAN.
  Does: shines a torch on a glass cup, a mug, a plastic bottle, a book and a spoon placed 5 cm from a white wall,
  and circles "נוצר צל / לא נוצר צל" for each. Concludes which bodies are opaque (אטום) and which transparent
  (שקוף), then circles the right classification.
  Types: `experiment` `circle-answer` `sorting`
  (a) **(idea)** Vanilla gives a nice trap: **tinted glass** looks see-through but blocks light, and plain glass
  passes it. Use it as a discussion point ("is this physically honest?").
  (b) **(idea)** A five-row results table with circle-one options.
- **R5 Mini word puzzle** · HAN.
  Does: fills in five clue words (מנסרה, גוף שקוף, נורה, שבירת אור, בליעת אור); their letters spell "מקור אור".
  Types: `word-game`
  (b) **(idea)** Port it as it is.

### 1.6 Shadows

- **SH1 How does a shadow form? (plus everyday uses)** · `lessons/light-energy__silhouettes.pptx` (grade 6, 20
  slides), mirrored in HAN.
  Does: solves a riddle (what do these photos have in common? shadows), watches a solar-eclipse video, does the
  torch-and-objects test (R4) and reads the explanation: "האור אינו יכול לעבור דרך גוף אטום… מאחוריו נוצר אזור
  חשוך". Then searches at home and online for everyday uses of shadow (a sundial, bus shelters, beach parasols).
  Types: `experiment` `explanation` `info-research`
  (a) **(idea)** A "shade hunt" photo quest: find five builds in the village that use shade (a shelter, an awning,
  a sundial).
  (b) **(idea)** A "where do we use shadows?" photo/drawing collage page.
- **SH2 Build a shadow theatre** · silhouettes.pptx slides 13–16, HAN. SPEC calls it a "STEM unit".
  Does: writes a short story, draws characters on black bristol board, cuts them out, tapes them to skewers,
  darkens the room, performs with a desk lamp on a white wall, and films a video to send to the teacher.
  Types: `build-device` `creative-product`
  (a) **(idea)** This is the best fit for a datapack. Block-display "puppets" on sticks in front of a lamp block;
  a raycast paints a black "shadow" silhouette onto a white wall, scaled by distance. Kids stage a story and record
  it.
  (b) **(idea)** Puppet templates to cut out, plus a story storyboard.
- **SH3 The case of Dor: how do we get bigger shadows without bigger puppets?** · silhouettes.pptx slides 17–20, HAN.
  Does: turns the problem into a research question, writes a hypothesis ("ככל ש… מקור האור רחוק/קרוב יותר אורך
  הצללית יהיה…"), lists tools, measures shadow length with the torch at 5/10/15/20 cm, fills the table, circles the
  correct conclusion and the correct scientific explanation, returns to the story to advise Dor ("put the torch
  closer to the puppets"), and then writes another research question using the frame "כיצד משפיע ____ על גודל
  הצללית".
  Types: `experiment` `data-table` `circle-answer` `argument` `question-asking`
  (a) **(idea)** On the SH2 stage, a lamp the kid can move along a rail. The game measures shadow height in blocks
  and logs it to a book. This is a real controlled experiment.
  (b) **(idea)** Port it nearly verbatim: the case story, a hypothesis frame, a distance/length table, circle-one
  conclusions and an advice box.
- **SH4 "Make an interesting picture with several different shadows of the same object"** · SPEC (challenge example).
  Types: `creative-product`
- **SH5 Conditions for a shadow; judge your peers' conclusions** · SPEC (mandatory).
  Types: `experiment` `peer-critique`
- **SH6 Build a sundial** · topic page "סוגרים שנה" ("בונים שעון שמש", grades 3–6, external) and
  `lessons/closing-year-in-science__sum2021.pdf`.
  Types: `build-device`
  (a) **(idea)** Vanilla Minecraft has a real sun arc and real shadows of a sort (sky-light differences). A sundial
  made of a pillar and floor markers is plausible with a datapack that marks the shadow tip each in-game hour.

### 1.7 Refraction (שבירת אור)

- **RF1 The "broken" pencil and the coin in the bowl** · HAN.
  Does: looks at a photo of a pencil and a toothbrush in water ("are they broken?"), reads "הידעתם?". Then puts a
  coin in a bowl, moves back until the coin is hidden, pours water in, sees the coin appear and explains why.
  Types: `observation` `explanation`
  (a) **(idea)** Minecraft water does not refract at all. This needs our mod, or a shader, or a staged illusion: an
  item frame that "jumps" when the water block is placed. It is more honest to keep this one physical.
  (b) **(idea)** A before/after drawing page and a "why" box.
- **RF2 A straw, spoon or pencil before and after going into water** · SPEC (mandatory). Same activity, explained
  in writing.
  Types: `observation` `argument`

### 1.8 Technological uses of light (mirror, solar water heater collector, lenses, periscope, kaleidoscope)

- **TU1 The solar water heater (דוד שמש)** · HAN.
  Does: looks at a photo of a solar water heater and answers: why is the collector black? Why is it worth using in
  Israel? Does it reduce air pollution, like a solar cell? Then reads a "הידעתם?" box: an Israeli invention; the
  collector is a box covered in glass with a black inner wall; light is converted to heat, which passes to the
  water in the pipe.
  Types: `reading-comprehension` `explanation`
  (a) **(idea)** A buildable "collector" multiblock (glass on top, black concrete inside, a water pipe). A
  thermometer item shows the tank warming during the day and not at night or in shade. It pairs naturally with R2.
  (b) **(idea)** A labelled cross-section of a collector, and the three questions.
- **TU2 Explain how a light property appears in a product (a solar heater, a mirror)** · SPEC.
  Types: `explanation`
- **TU3 Design and build a product that uses reflection, absorption or refraction** · SPEC (challenge examples:
  "בניית פריסקופ שיאפשר לראות מעבר למכשול", "בנייה של קולט שיתחמם ככל האפשר מאור השמש", "בניית קלידוסקופ").
  The technology section adds binoculars (משקפת) as a design-process product.
  Types: `build-device` `design-process`
  (a) **(idea)** Periscope: a 2-mirror block pair. Looking into the bottom mirror moves the camera to the top one
  (a mod, or `/spectate` on a marker entity). The challenge is to see over a wall into a locked courtyard and read
  a code. Collector: a "hottest collector" competition with a logged temperature. Kaleidoscope: realistically
  physical only; an in-game alternative is a mirror-symmetry building puzzle **(idea)**.
  (b) **(idea)** A design-process sheet (see section 1.19) with a periscope template: a milk carton, two mirrors at
  45°.
- **TU4 Build a solar cell / a solar oven** · topic page "סוגרים שנה" ("בונים תא סולרי (כיתות ה-ו)", external);
  `lessons/closing-year-in-science__case-study-in-summer.pdf` (a solar oven, plus a UV-bead inquiry with
  sunscreen).
  Types: `build-device` `experiment`
- **Lenses:** no activity. The only Ministry content is the eye's lens ("עדשה דו-קמורה המרכזת את האור", in the eye
  units). The spyglass in vanilla Minecraft is a ready-made "lens" object **(idea)**.

### 1.9 Light is essential to living things (germination, growth, photosynthesis)

- **LV1 Germination or growth in light versus dark** · SPEC (mandatory, ✧ plan the research). The challenge
  example is "מהי השפעת האור על צמיחה / על נביטה של צמח? ביצוע תהליך חקר". 2016 has the same: "יתכננו ויבצעו
  ניסויים לבדיקת השפעת האור על תהליכי התפתחות בצמחים".
  Does: compares plants (or seeds) kept in light and in dark, collects findings over days and concludes.
  Types: `experiment` `observation-log`
  (a) **(idea)** **This works natively.** Vanilla crops and saplings don't grow below light level 9, while
  mushrooms (fungi, which don't photosynthesise) grow in the dark. Two sealed rooms, one lit and one dark, with the
  same seeds. Kids log growth stages each in-game day. Honest caveat: game crops don't "germinate"; they just
  stall.
  (b) **(idea)** A 10-day log grid (date / light pot / dark pot / drawing).
- **LV2 "Pine deserts" (מדבריות האורנים): a real study as a data puzzle** · `lessons/tahalich-heker-madai__Teaching_by_inquiry_6_grade_student.doc`
  (grade 6), research 1. The readable copy is in `docconv/`.
  Does: reads why nothing grows under pine trees. First, a lab test: 6 pots of soil, with and without pine
  needles, 20 radish seeds each, placed by a window. A table of seeds germinated and seedlings grown shows no
  difference. The student answers questions on the aim, the controls, why there are 3 pots of each, the result and
  the conclusion. Then the field test: once the needle layer is removed, seeds sprout; where it stays, none do.
  "Seedlings can't develop without light." The student concludes, explains with evidence and completes a diagram of
  the research process.
  Types: `data-interpretation` `experiment-analysis` `data-table` `research-process-diagram`
  (a) **(idea)** A pine-forest plot where a needle "carpet" block makes a light level of 0. The kid removes it
  from half the plots and watches seedlings appear.
  (b) **(idea)** Reprint the table and questions. It is strong as it is.
- **LV3 Why don't plants live in caves? Light, melatonin and screens** · `lessons/hagada-matza-mada__10-Plagues-darkness.pdf` (grade 5).
  Does: reads short passages and answers: why there are no plants in caves; what melatonin does (darkness → the
  brain releases melatonin → tiredness); why experts advise less screen time before sleep (blue light lowers
  melatonin).
  Types: `reading-comprehension`
  Also links to eye health (1.11).
- **LV4 Germination logs** · `lessons/tu-shvat-mot__TuBishvat_Tests.pdf`, station 4 (an egg-tray germination, "place
  in a lit area", draw daily). `lessons/tahalich-heker-madai__netivim.pdf` describes a grade 3 lesson on germination
  conditions: water, air, light and temperature; daily reports and photos.
  Types: `observation-log`
- **Photosynthesis:** no activity for grade 6. It appears only as a word in concept lists
  (`hashpaat-adam-al-sviva__climate.d.pdf`, `catalog-rainforests-1.pdf`).

### 1.10 The eye: structure, the process of vision, eye versus camera (6 h)

- **EY1 The front of the eye, by observation** · `lessons/catalog-external-eye-observation-1.pdf` (grade 6; the
  INDEX title is swapped, see section 0).
  Does, in four parts:
  1. **"Eyes in language".** Groups interpret 2–3 Hebrew idiom cards (עיניים טובות, כהרף עין, עין תחת עין…), then
     discuss whether they are scientific knowledge.
  2. **Eye movements, in pairs.** Time how long a partner can keep their eyes open without blinking. Observe the
     partner for 1 minute and list the eye movements. Then, using a "movement bank" (למצמץ, לקרוץ, לפזול, להשפיל…),
     sort the movements by function (protection, wider field of view, emotion).
  3. **The front parts.** Draw your eye from memory and label it. Observe your own eye in a mirror and draw it.
     Read a short text (קשתית, אישון, לובן העין, קרנית, עדשה) with a diagram, then redraw and colour your eye.
     Compare with a partner and with photos of eyes from different peoples (what is alike, what differs).
  4. **Question-asking** with a "question map".

  Summary tasks: label the front parts on a diagram; draw lines from each part to its description.
  Types: `observation` `drawing` `sorting` `labelling` `matching` `question-asking`
  (a) **(idea)** A giant walk-in eye (about 40 blocks across). Kids find and "tag" each front part with a name
  sign. Eye movements could be a mini-game: a villager blinks and winks, and the kid names each movement.
  (b) **(idea)** A "draw from memory → draw with a mirror → draw after reading" triptych page, plus the labelling
  and matching tasks.
- **EY2 The inside of the eye, through models** · `lessons/catalog-eye-outside-1.pdf` (grade 6).
  Does:
  - Activity 1 ("human limitation"): tries to see inside a partner's eye, can't, and suggests ways round it
    (X-ray, imaging, models).
  - Activity 2: takes apart a physical eye model and identifies the optic nerve, the vitreous body (זגוגית) and
    the retina, noting what is near the front and what is near the brain. Draws it. Watches a virtual model and
    writes the pros and cons of real versus virtual models.
  - Activity 3: compares the model with a real eye (size, colours: "for what purpose is the model enlarged and
    coloured?"), then a guided-imagery "journey into your eye" with background music.
  - Activity 4: **builds an eye model to stated requirements.** It must include the iris, cornea, lens, pupil,
    retina, optic nerve and vitreous body, with correct positions, relative sizes and connections. Uses a
    work-plan table (stage / aim / actions / materials), assigns roles, self-evaluates against the requirements,
    gets peer feedback and writes a reflection.

  Summary tasks: label the inner parts; match the vitreous body, retina and optic nerve to their descriptions.
  Info box: "the retina receives the light… the optic nerve carries the information to the brain… the brain
  processes it".
  Types: `model-analysis` `model-building` `drawing` `labelling` `matching` `guided-imagery` `reflection` `peer-critique`
  (a) **(idea)** The walk-in eye is the "virtual model". The kid enters through the pupil, follows a light-ray
  particle trail through the lens and the vitreous body to the retina, then rides a "nerve" minecart rail to a
  brain room. Activity 4 becomes a build challenge (in survival, or creative with a limited palette) with an
  in-game checklist. Activity 3's "model versus reality" questions transfer perfectly: "why is our eye 40 blocks
  wide and coloured?"
  (b) **(idea)** A cross-section diagram to label, matching lines, and a requirements checklist plus a work-plan
  table for a paper or clay model.
- **EY3 Identify the parts; draw the light path as a flow diagram** · SPEC: "יזהו בדגם / איור / הדמיה של עין את
  החלקים המרכזיים… יבנו תרשים זרימה המתאר את מסלול האור בעין" (✧). 2016: observe an eye and an eye model, and
  conclude how structure fits function. Challenge: "כיצד מתרחש תהליך הראייה מרגע כניסת האור לעין ועד שאנו רואים?"
  Types: `labelling` `flow-diagram`
  (a) **(idea)** The minecart ride in EY2 *is* the flow diagram. At each station the kid places the next sign in
  order: object → light → cornea/pupil → lens → retina → optic nerve → brain.
  (b) **(idea)** A 6-box flow template with a word bank.
- **EY4 The onion-tears product ("אל-דמע")** · `lessons/pitron-beayot-technologya__al_dema_talmid.doc` plus the
  teacher guide (grade 6). The full design process is in 1.19; it ties the eye (structure, tears) to technology.
- **Eye versus camera:** SPEC names it as **the** example of comparing a technological system with a biological
  one ("דוגמה: העין והמצלמה"). There is **no activity** for it. Note that vanilla Java has no camera item, so
  this needs our mod or a "camera obscura" room build **(idea)**.

### 1.11 Eye health (3 h): glasses, sunglasses, eye tests

- **EH1 Write eye-health rules and explain them** · SPEC: "ינסחו כללים לשמירה על בריאות העיניים ויסבירו אותם"
  (values: personal responsibility for health). 2016 has the same. Content: eye tests, sunglasses, safety goggles,
  glasses, contact lenses. Challenge: "באילו מצבים בחיי היום־יום העיניים שלנו עלולות להיפגע וכיצד נגן עליהן?"
  Types: `argument` `rules-writing`
  (a) **(idea)** A "risk spot" walk: a welding forge (goggles), a beach (sunglasses), a screen-lit bedroom at night
  (LV3). The kid equips the right item at each spot. An "eye-test" villager has a Snellen chart drawn in map art.
  (b) **(idea)** A "situation → risk → protection" three-column table, and a rule poster.
- **EH2 Related:** screens and sleep (LV3). The UV-bead plus sunscreen inquiry in
  `closing-year-in-science__case-study-in-summer.pdf` is about skin, not eyes, but it is the same fair-test format.

### 1.12 Communication and the nervous system (stimulus → nerve → brain → response)

- **C1 Flow diagram: from information in the environment to a response** · SPEC: "יציגו בתרשים זרימה את המידע
  העובר מהסביבה ועד לתגובה בעקבות קבלת המידע במוח". Content examples: seeing a predator → movement; smelling food →
  eating.
  Types: `flow-diagram`
- **C2 Match stimulus ↔ sense organ ↔ response** · 2016: "יתאימו בין גירוי לאיבר הקולט ולתגובה ויסבירו את חשיבות
  הקליטה של הגירוי והתגובה עליו".
  Types: `matching` `explanation`
  (a) **(idea)** Vanilla mobs already behave this way: a creeper hisses, a sheep follows wheat, a zombie burns in
  daylight, a skeleton flees from a wolf. Kids watch a mob and fill a "stimulus → organ → nerve → brain → response"
  book page. Sculk sensors (vibration in, redstone signal out) are a perfect "sense organ + nerve" analogy.
  (b) **(idea)** A 3-column matching page, plus a 5-box flow template.
- **C3 A cane for the blind inspired by bats** · `lessons/hagada-matza-mada__10-Plagues-darkness.pdf` activity 3 (grade 5).
  Does: reads about bat echolocation and the Hebrew University "smart cane" (it sends a signal, times the echo and
  vibrates the handle), then answers: which bat feature inspired it? What is the advantage over a normal cane?
  ("ביומימיקרי").
  Types: `reading-comprehension`
- Challenge example (SPEC): "כיצד בעלי חיים קולטים מידע מהסביבה ומשתמשים בו כדי להתמצא, להשיג מזון ולהתגונן?"
  There is no worksheet.

### 1.13 Electrical energy (4 h): lightning, static, magnet + coil, generator

- **EL1 Move a magnet in a copper coil** · SPEC (mandatory).
  Does: moves a magnet through a copper coil connected to a sensitive ammeter and concludes that motion produces
  current.
  Types: `experiment` `argument`
- **EL2 Watch a generator work** · SPEC (mandatory). Does: watches a generator and concludes how electricity is
  produced.
  Types: `observation` `argument`
- **EL3 Challenge examples** · SPEC: "כיצד נוכל להדליק נורה בלי להשתמש בסוללה?"; "בניית מתקן שממיר אנרגיית תנועה
  לאנרגיה חשמלית".
  Types: `build-device`
  (a) **(idea for EL1–EL3)** Our mod: a "coil" block and a "magnet" item. Moving the magnet through the coil
  (pushing it with a piston, or a minecart passing it) sends a redstone pulse to a lamp. Faster or more passes give
  more pulses. The generator is a waterwheel or crank feeding the coil. Lightning and static: the vanilla
  **lightning rod** emits a redstone signal when struck, which is a natural hook for "lightning is electricity". The
  vanilla game has nothing for static.
  (b) **(idea)** A "what moved, what happened to the needle" observation table and a crank-generator diagram to
  label.
- **EL4 A lemon battery** · `lessons/tu-shvat-mot__TuBishvat_Tests.pdf`, station 2 (Haredi district, a Tu BiShvat
  fair).
  Does: pushes a 1-shekel coin (zinc) and a 10-agorot coin (copper) into half a lemon, wires them to an ammeter,
  reads the needle, repeats with an orange, a tomato and a potato, records the results and revises the conclusion.
  Types: `experiment` `data-table`
- **EL5** · 2016: compare electrical energy with other kinds of energy for getting the same result (light, heat,
  motion). Spec content: the advantages of electricity are convenience, availability, speed, cleanness at the
  point of use, and range of uses.
  Types: `comparison`
- Named but not in the repo: MATAR "השראה אלקטרומגנטית (כיתה ו)"; kids.gov.il "הפקת אנרגייה מתנועת המים / הרוח
  (כיתה ו)"; Galim "חשמל סטטי (כיתה ו)" (needs a login); many videos.

### 1.14 Energy resources (2 h) and electricity production in power stations (6 h)

- **P1 What can turn a turbine? Air, water, steam** · SPEC (mandatory; the skill is a simple argument).
  Does: blows on a pinwheel or uses a fan; pours water on a pinwheel; watches the **teacher** boil water in a
  conical flask with a tube and aim the steam at a pinwheel (safety: at least 1.5 m from the students, steam pointed
  away). Concludes the ways to drive a turbine.
  Types: `experiment` `demonstration` `argument`
  (a) **(idea)** Three test bays: a fan (our block), a water stream, and a boiler (furnace + water + steam
  particles), each with a turbine block whose spin rate shows on a dial. Then a full coal power station:
  fuel → furnace → boiler → steam → turbine → generator → the village lamps. The kid wires the chain in order. The
  Create mod has waterwheels and windmills **(check version)**; our own mod is safer.
  (b) **(idea)** Three pinwheel tests in a results table, plus a power-station picture whose stages the kid numbers
  and names (שריפת דלק, הפקת קיטור, סיבוב טורבינה, הנעת המחולל).
- **P2 Build a model wind or water power station (design process)** · SPEC challenge. The STEM units "טורבינות
  רוח" and "שבשבת הרוח בפעולה" are external; `closing-year-in-science__sum2021.pdf` has pinwheels made from used
  bottles (grades 5–6, a wind-energy inquiry).
  Types: `build-device` `design-process`
- **P3 Station types** · `lessons/hashpaat-adam-al-sviva__climate.d.pdf` (grade 6). The concept list: coal,
  hydroelectric, wind turbine, solar cells, nuclear; renewable versus non-renewable resources. These are concepts,
  not an exercise.
- **P4 A power station as a model** · `lessons/assessment__model-task-accessible.pdf` ("מבנה של תחנת כוח… מודל
  המתמקד בתיאור חלקיה של מערכת") and `assessment__model-task-mavo.pdf` (the cause-and-effect model example is
  "נשיבת רוח גורמת להנעת טורבינת רוח").
  Types: `model-building`
- **P5 Muscle versus electric power at the olive press** · `7minim.pdf` activity 3: once a donkey turned the
  millstone, now electricity does. "אילו יתרונות יש לשימוש באנרגיה חשמלית?"
  Types: `explanation`
- 2016: "יסבירו את החסרונות שבהפקת חשמל באמצעות חומרי דלק".

### 1.15 The environmental cost of electricity, and climate (4 h)

- **CL1 Merge sources: why invest in biogas?** · SPEC (information merging; the skill is to argue the efficiency of
  a solution, including its effects on society and the environment). External: the MATAR biogas lesson.
  Types: `info-research` `argument`
- **CL2 A reasoned proposal to the authorities to subsidise solar panels for low-income families** · SPEC (written
  expression; values: environmental responsibility and equality).
  Types: `argument` `letter-writing`
  (a) **(idea)** The village council (villagers) receives the kid's written-book proposal. The panels then appear,
  and the village's smoke particles drop.
  (b) **(idea)** A letter template with "claim / data / why it's fair" sections.
- **CL3 Siting challenges** · SPEC: "כיצד נוכל לספק חשמל ליישוב שלנו / לבית הספר שלנו תוך צמצום הפגיעה בסביבה?"
  and "היכן כדאי להקים תחנה להפקת חשמל כדי לצמצם את הפגיעה באדם ובסביבה?". Spec solutions: chimney filters, reusing
  coal ash, better fuels, renewables, natural gas, siting far from towns, saving electricity.
  Types: `decision-making` `argument`
  (a) **(idea)** A map with a village, a forest, a river, a beach and wind. The kid places a station; the game
  scores air pollution near homes, damage to the landscape and output, and the kid defends the choice to a
  villager. This is already in YEAR_MAP.
  (b) **(idea)** A printed map with zones, and a criteria table to score three sites.
- **CL4 Grade 6 climate-change lesson plan** · `lessons/hashpaat-adam-al-sviva__climate.d.pdf` (grade 6, 3–4 h).
  Does:
  - A gallery walk: choose a photo or station, stand by it, pair-share your feelings and give it a title.
  - Optional stations: a video, a graph of temperature and rainfall changes, a newspaper article, and a
    "blanket / sleeping bag" demo of warming.
  - Group research at one station (waste, climate, air, water, soil, **energy**, biodiversity, trees): what is
    the problem, its causes, its dangers.
  - A creative presentation (a skit, a newscast, a riddle), personal solutions, and a scientific hypothesis for
    global warming.
  - A reflection, then homework: find a news article and analyse it (problems, solutions, your own idea, your
    opinion, the link to the Paris conference).

  Types: `gallery-walk` `info-research` `creative-product` `reflection` `media-analysis`
- **CL5 Climate escape box** · `lessons/hashpaat-adam-al-sviva__climate.c.pdf` (written for grade 4, "fits 5–6").
  Does: sorts picture cards of air-pollution sources into transport, industry and agriculture; reads a pie chart
  (Israel's CO₂ in 2018: electricity production 48%, transport 20%, industry and buildings 13%…); watches an
  animation; plays dominoes matching "a normal climate" to "a climate emergency"; decodes a cipher to pick the true
  pro-environment sentences; gets a "climate guardian" certificate.
  Types: `sorting` `graph-reading` `matching` `cipher` `escape-room`
  (a) **(idea)** An escape room is the most natural Minecraft format: locked doors, a chest per puzzle, the code
  entered on a redstone combination lock. "48% from electricity" makes a good door code.
  (b) **(idea)** The same puzzles on paper: cards, a pie chart, dominoes, a cipher wheel.
- **CL6 Extreme weather** · `lessons/climate-changing__Extremeclimate.docx` plus `.pptx` (grades 5–7, 150 min).
  Does: identifies extreme weather in photos (flood, heatwave, haze, storm, fire, snowstorm, melting glaciers).
  Each group researches one phenomenon (name / causes / where / damage / how to reduce) into a shared table, then
  marks what is common and what differs and draws conclusions. Watches "Before the Flood" (with timestamps), writes
  a "do and don't" sheet, takes on a "climate trustees" homework commitment of 2–3 family actions, and reflects.
  The teacher's list of actions: switch off unused devices, efficient bulbs, a solar water heater, the AC at 25°,
  drying laundry in the sun, carpooling.
  Types: `photo-identification` `info-research` `summary-table` `compare` `pledge` `reflection`
- **CL7 Ecological footprint** · `lessons/hashpaat-adam-al-sviva__climate.a.pdf` (grade 5): a "step forward if…"
  line game, a footprint questionnaire, a class **bar graph**, a joint slide deck.
  Types: `survey` `graph`
- **CL8 (2016, grades 7–9, transferable)** A greenhouse-effect model: a closed transparent box versus an open one
  in the sun, tracking temperature, then comparing the model with reality. It is close to E3.

### 1.16 Electricity consumption and the bill

- **B1 Read the electricity bill to use electricity wisely** · SPEC content: "הפקת מידע מחשבון החשמל לצורך שימוש
  נבון בחשמל". The 2003 standards have the same. The factors (higher standard of living, population growth) are an
  extension. There is no worksheet in the repo.
- **B2 Read consumption graphs and change habits** · 2016: "יפיקו מידע מגרפים המציגים את צריכת החשמל
  הביתית/הבית ספרית ויסיקו מסקנות"; "יפעילו את המודל לשינוי התנהגות בנושא חיסכון בצריכת החשמל" (collect findings,
  analyse, set goals, plan actions).
  Types: `graph-reading` `behaviour-change-plan`
  (a) **(idea)** Every powered device in the kid's house logs "kWh" to a scoreboard, and a monthly bill book
  arrives from a villager. Challenge: cut next month's bill by 20% without going dark (daylight sensors, switching
  devices off).
  (b) **(idea)** A simplified real bill to annotate (period, kWh, price), plus a home "appliance audit" table.
- External titles: "בית חסכוני באנרגייה (כיתה ו)" and "מתכננים ובונים בית חסכוני באנרגיה (כיתות ה-ו)".

### 1.17 Technological systems: input–process–output, components, desired and undesired outputs, technological versus biological (6 h)

- **TS1 Spec frame** · SPEC: components and how they interact; why their organisation matters; input (energy,
  information, materials) → process → output (desired **and undesired**); technological versus biological systems
  (the eye and the camera). Teach it with a juicer, a washing machine or a food processor, ideally "בהקשר של תחנת
  החשמל". Challenge examples: "מערכת שתשקה עציץ באופן מבוקר", "מערכת שתפיק תנועה באמצעות רוח או מים". Mandatory:
  design and build a product or system.
  Types: `design-process` `build-device`
- **TS2 A visit to an olive press (בית בד)** · `lessons/70-shnot-madaa-vehamtzaa__7minim.pdf` activity 3 (grades 3–6).
  This is the best ready-made "technological system" worksheet in the repo.
  Does:
  - Before the visit: what is a בית בד and why that name? What human need does it meet? Write the problem it
    solves as a question. Write 5 questions for the guide.
  - At the press: identify the components and their roles (the stone basin "ים", the millstone "ממל", the beam);
    who turns the stone (a donkey then, electricity now).
  - The **desired product** (oil and liquid) and the **undesired product** (גפת, the pressed pulp): "מה עושים
    אתו?" How the oil is separated from the watery liquid (oil floats).
  - After the visit: **draw a flow diagram** of oil production (action → product). Compare a modern press with a
    traditional one.

  Types: `field-observation` `component-identification` `desired-undesired-outputs` `flow-diagram` `comparison`
  (a) **(idea)** An olive-press multiblock in-game: olives → crusher → press → separator, with the oil as the
  desired output and the pulp as an undesired item the kid must decide what to do with (compost it? burn it as
  fuel?). The same template works for the power station: electricity is desired; smoke, heat and ash are undesired.
  (b) **(idea)** An I-P-O box template, plus a desired/undesired T-chart. The olive press is the worked example
  and the kid fills in a washing machine.
- **TS3 Functional diagram and structural diagram** · `lessons/technologia-maasei-adam__Designing-building-product.pdf`.
  Does: draws a **functional model** as a box diagram, input (information, energy, materials) → processes (energy
  conversion, information processing, material processing) → output (desired and undesired), and a **structural
  diagram** (parts with true proportions). The worked example is an electric toilet brush: information (on/off) +
  electrical energy + soap → electrical energy converted to rotary motion. Warm-up game: one student describes 3D
  shapes without names or numbers while another draws and builds them from cardboard; then the same with a
  "professional" description, then from a drawing. Discuss why technical drawings matter.
  Types: `flow-diagram` `drawing` `communication-game`
  (a) **(idea)** The describe-and-build game works perfectly in Minecraft between two kids: one sees a hidden
  build and describes it, the other builds it. Round 1 without numbers, round 2 with block counts.
  (b) **(idea)** A functional/structural diagram template with the toilet-brush example.
- **TS4** · 2016: "ינתחו מערכות טכנולוגיות בהיבטים של קלט, תהליך ופלט ויציגו את הממצאים בתרשימי זרימה";
  reverse engineering (material, shape, fit to function); "יסבירו מהי מערכת טכנולוגית באמצעות מאפייניה". External
  units: "קוצץ ירקות ידני – הנדסה הפוכה (ה-ו)" and "האם קן של ציפור הוא טכנולוגיה? (ה-ו)", the second being the
  only technological-versus-biological item, and it is not in the repo.
  Types: `flow-diagram` `reverse-engineering`
  (a) **(idea)** Reverse-engineer a vanilla redstone contraption (an auto-farm): list its parts, what each does,
  its input, process and output, and what happens if one part is removed. The last question is the spec's ✧
  systems skill: "predict how a change in one component affects the system".

### 1.18 Handmade versus industrial production (extension, grade 5 or 6)

- **PR1 Olive harvest by hand versus by machine** · `7minim.pdf` activity 2.
  Does: circles which hand method they know (picking, "milking" (חליבה), beating (נקיפה)) and decides which suits
  table olives and which suits oil. Reads about machine harvest (shaking, suction). **Builds a comparison table
  with their own criteria**, then answers what is alike and what differs, the pros and cons, and when to use each.
  Class debate, including social reasons (the family working together).
  Types: `comparison-table` `argument` `debate`
- **PR2 How the can was made** · `technologia-maasei-adam__Technology-problem-solving-project(-tech).pdf`
  activity 2 (grade 5).
  Does: reads the history of the can. Writes two differences between hand and industrial production; which
  operations machines on the production line freed people from; why the price fell; why iron gave way to
  aluminium. Adds the terms to a "בונים שפה טכנולוגית" glossary.
  Types: `reading-comprehension` `glossary`
- **PR3 The story of paper** · `technologia-maasei-adam__paper-party-stu/tech.pdf` activity 2 (grade 5).
  Does: builds a historical timeline of paper making from three texts (handmade from papyrus and rags →
  industrial), lists the handmade steps and their drawbacks, and the industrial changes and their environmental
  effects. Glossary entries: ייצור ידני = "באמצעות ידי אדם בבתי מלאכה"; ייצור תעשייתי = "ייצור המוני באמצעות מכונות
  בפסי ייצור".
  Types: `ordering` `reading-comprehension` `glossary`
- **PR4 Candles: from hand to mould** · `lessons/hanoka-mada__Developmentofthecandle1.pdf`.
  Does: reads that Roman-era moulds made oil lamps cheap and popular, then makes candles by dipping and pouring
  (supervised by an adult).
  Types: `hands-on-making`
- **PR5 Spec frame and challenge** · SPEC: "כיצד נוכל לייצר בכיתה סדרה של מוצרים זהים בזמן קצר?" The features
  listed: workstations, one worker per station, a conveyor belt, uniformity, speed. 2016: compare the two and
  conclude the pros and cons.
  Types: `production-simulation` `comparison`
  (a) **(idea)** A race. Round 1: each kid hand-crafts 10 lanterns from raw materials. Round 2: the class runs an
  assembly line with one station per kid (smelting, crafting, packing), with item hoppers as the conveyor. Vanilla
  1.21's **crafter** block allows a fully automated line for round 3. Compare time, uniformity and fun.
  (b) **(idea)** A paper-folding line (for example, a paper cup) run in two rounds, plus a timing and quality table.

### 1.19 The engineering design process (תכן הנדסי, 15 h in grade 5 or 6)

- **D1 The process navigator** · `lessons/technologia-maasei-adam__engineering-process.pdf`. A two-page diagram:
  3 tasks (define the problem, requirements and constraints → generate and choose ideas → plan and build a model
  or prototype), each run through 3 actions (investigate / carry out / evaluate). "אפשר להתחיל את התהליך מכל
  מקום, אפשר לחזור על משימות".
- **D2 Define the problem, requirements and constraints** · `technologia-maasei-adam__requirements-constraints-stu.pdf`.
  Does: describes the current state (מצב מצוי), the desired state (מצב רצוי) and the need; writes the problem as a
  question with a "thinking map"; lists essential and non-essential requirements and the constraints. A
  "look back" checklist. An investigation-planning table (what we need to know ↔ how we'll find out: the web, a
  survey, an interview, observation, a science test). Answers with their sources cited. Then improves the
  definitions.
  Types: `design-process` `planning-table` `self-check`
- **D3 Generate ideas and choose one** · `technologia-maasei-adam__Choosing-appropriate-idea.pdf`.
  Does: brainstorms an "idea sun" ("no rejecting ideas now"; every member adds one); investigates to widen it;
  merges and drops ideas; writes an **idea card** for each (name / problem / description / fit to requirements /
  feasibility under constraints); fills a **comparison matrix** scoring each idea 0–3 against every requirement and
  constraint; crosses out ideas that fail an essential requirement; each member votes privately, then the group
  takes a round and discusses until it agrees.
  Types: `brainstorm` `rating-matrix` `decision-making`
- **D4 Design and build** · `technologia-maasei-adam__Designing-building-product.pdf`.
  Does: writes an engineering spec (description and name, functions, operating sequence, **safety standards**,
  ergonomics, look, dimensions, materials, parts); a work plan (parts, tools, materials, assembly steps with
  drawings, timing, who does what, a check after each stage); builds it; then evaluates and improves in a loop
  ("בודקים… ושוב משפרים…"); presents it.
  Types: `design-process` `build-device` `drawing` `evaluation`
- **D5 "אל-דמע": a grade 6 unit around cutting onions** · `pitron-beayot-technologya__al_dema_talmid.doc` plus the
  teacher guide (in `docconv/`).
  Does:
  - A story (Noam cries while chopping onion), then observes a real onion-cutting "scene" and lists every element
    in it (the knife, the board, the onion, the eye, the air temperature…).
  - Current and desired state; the problem written with "כיצד? באיזו דרך?"; the need.
  - **At least 10 questions**: drops repeats, merges, and sorts them into information questions, inquiry questions
    and technological questions. Answers them, runs one inquiry, and **surveys** who is sensitive to onions and
    whether it depends on age.
  - The target population; a table of essential and desired requirements; the constraints; existing products on
    the market; ideas for each scene element, scored 1–5 in a table.
  - A materials list, a sketch and a work plan; a prototype; an evaluation table; then publishing (a poster, an
    advert, a video).

  Types: `design-process` `question-sorting` `survey` `rating-matrix` `build-device` `creative-product`
  (a) **(idea)** A village "problem board": villagers post problems (the farmer's crops dry out, the guard can't see
  over the wall, the baker's onions make him cry). The kid takes one ticket and goes through define → ideas card →
  build → villager tests it against the requirements.
  (b) **(idea)** A reusable 6-page design-process pack: problem frame, requirements T-chart, idea cards, 0–3
  matrix, sketch grid, evaluation table.
- **D6 Whole projects with a portfolio** · `technologia-maasei-adam__Technology-problem-solving-project(-tech).pdf`
  (a drink can, grade 5) and `paper-party-stu/tech.pdf` (a paper party, grade 5). Story-driven projects with a
  portfolio (תלקיט, chapters A–F) and a product file (תיק מוצר). Includes a "drawback → which human need it harms →
  desired state" table (for example, drinking straight from the can → health).
  Types: `portfolio` `design-process`
- **Named STEM units** (spec, technology section) are all external: אסון כתם הנפט, שבשבת הרוח בפעולה, כנפיים מעץ,
  אתגר הדאון, קטפולטה, טורבינות רוח, פיתרונימוס, סטתוסקופ, המטריה (URLs in section 4).

### 1.20 Safety

- **SF1 Classroom safety poster** · `lessons/betihot-mada-tehnologia__kraza_yesodi_heb.pdf` (elementary).
  Rules: enter only with the teacher; follow instructions; plug devices in only when told; only the teacher lights
  burners; never taste or smell substances; don't walk around during activities; tie back hair; report damaged or
  broken items and spills; wash hands; work over a tray; leave the place tidy.
  Types: `rules`
- **SF2 Students help write the rules** · 2016: "מומלץ לשתף את התלמידים בניסוח כללי בטיחות מותאמים למעבדת בית
  הספר". The spec adds activity-specific notes: a thermometer without mercury, the steam demo at 1.5 m, and
  heating rules.
  Types: `rules-writing`
- **SF3 Safety as a design requirement** · Designing-building-product: check for "חלקים חדים, חלקים קטנים, חלקים
  שבירים, חומרים רעילים, חומרים שאינם ידידותיים לסביבה".
  Types: `checklist`
- **SF4 Demo safety box** · 7minim activity 7 (teacher only, 1.5 m away, goggles, tied hair, extinguisher).
- The rest of the `betihot-*` files are for staff (storage, fume hoods, mercury, material lists, emergency drills,
  wartime guidance). They contain nothing for students.
- (a) **(idea)** A "lab inspector" mini-quest: a messy in-game lab with eight hazards, and the kid fixes them.
  Electrical-safety hazards fit too (a cable near water, which the external grade 3 "בטיחות בחשמל" materials
  cover).
  (b) **(idea)** A "spot the 8 hazards" picture, plus a class rule card the kids co-write and sign.

### 1.21 Sound unit: exercise types worth borrowing (the school is not teaching sound)

- **K1 "קולי ועל-קולי"** · `lessons/energyat-kol__koli-peilot.pdf` (identical to `koli_al_koli.pdf`), an assessment
  task. It mixes short hands-on tests (a ticking clock in a cardboard tube, a board held over it to reflect the
  sound, a paper ear-trumpet, the clock on cotton wool versus straight on the table) with circle-one answers; a
  reading passage (ultrasound, sonar, bats and dolphins) with a **multi-select** item ("circle all the data needed
  to compute the sea's depth"), fill-in items with a choice of two words, open explanations, "suggest another
  invention inspired by nature", and **write an advert** for an ultrasonic tape measure.
  Light version **(idea)**: a periscope or solar-heater advert.
- **K2 "קולות וצלילים"** · `energyat-kol__kolot-zlilim.doc` and `kolot-lmora.pdf` (grades 5–6, an assessment task).
  Pairs build 4 string telephones (string, fishing line, copper wire, embroidery thread; slack or taut) and test
  the variables. The teacher page carries a **skills ↔ question-number matrix** (aim, hypothesis, reading a table,
  isolating variables, conclusion…).
  Light version **(idea)**: 4 periscopes or 4 collectors.
- **K3 "רעש תחבורה בעיר"** · `energyat-kol__raash_tachbura.doc` (grade 6): a literacy task. An info text →
  situation, need, problem, source, ideas, then reading a **noise graph** (title, vertical axis, horizontal axis,
  what it shows, peak hours).
  Light version **(idea)**: a graph of the school's electricity use by hour.
- **K4** · SPEC sound: build a cone amplifier and measure the opening diameter against loudness with a sound sensor
  (✧). This is the same "build + measure with a sensor" pattern as R2.

---

## 2. Recurring exercise types (counted over the Ministry activities in section 1)

Method: section 1 has **76 activities with a "Types:" line**. Ideas, external-only titles and the sound entries
K1–K4 (which have no tags) are excluded. Each row counts the activities that carry at least one tag from that group,
so one activity can count in several rows. The counts came from a script over the tags, not from estimates.

| # | Type (tags grouped) | Activities | Best examples |
|---|---|---|---|
| 1 | **Argument / explanation / conclusion writing** (`argument` `explanation` `letter-writing` `debate` `rules-writing`) | 23 | E3 Almog versus Omer (use the data to decide who is right); CL2 the solar-panel subsidy proposal |
| 2 | **Observation, including teacher demos** (`observation` `observation-log` `field-observation` `demonstration`) | 15 | EY1 eye movements and front parts (memory → mirror → text); TS2 the olive-press visit |
| 3 | **Build a device or model** (`build-device` `model-building` `hands-on-making`) | 14 | EY2 activity 4 (eye model to explicit requirements, peer review); SH2 the shadow theatre |
| 4 | **Hands-on experiment** (mostly "do it, record, conclude"; few true fair tests) | 12 | SH3 the Dor shadow-size experiment (hypothesis frame, table, circle-one conclusion, back to the story); R3 the magic lantern (students design the test) |
| 5 | **Comparison** (`comparison` `comparison-table` `compare-groups`) | 10 | PR1 olive harvest by hand versus by machine (students choose the criteria); S5 oil lamp versus candle |
| 6 | **Matching / ordering / labelling** | 9 | EY1/EY2 label the diagram + draw lines from part to description; S4 order seven lighting technologies |
| 7 | **Flow diagram / input–process–output diagram** | 8 | TS2 the olive-press flow (action → product, desired versus undesired); TS3 the functional plus structural diagram |
| 8 | **Design process** (`design-process` `portfolio`) | 8 | D5 אל-דמע (the full cycle); D3 the idea matrix |
| 9 | **Data table** (fill in or design) | 7 | E3 "plan the table: how many columns, rows, titles?"; LV2 the pine-desert data |
| 10 | **Reading comprehension** (passage + questions) | 7 | S2 the glow-worm article; LV3 melatonin and screens |
| 11 | **Sorting / classification** | 6 | EY1 sort eye movements by function; D5 sort questions into information / inquiry / technological |
| 12 | **Reflection / self-check / peer critique** | 6 (and inside nearly every TAU unit) | EY2 "מה היה קשה? מה הפתיע?"; D2 the "look back" checklist |
| 13 | **Graph** (draw or read) | 5 | E3 draw a bar graph; CL5 read Israel's CO₂ pie chart |
| 14 | **Information research / merging sources** | 5 | CL1 the biogas merged text; SH1 find everyday uses of shadow |
| 15 | **Creative product** (theatre, skit, advert, poster, video) | 5 | SH2 the shadow theatre with a video; D5 publish an advert |
| 16 | **Drawing** (from memory, from observation, technical) | 4 | EY1 draw your eye from memory, then with a mirror; TS3 the structural diagram |
| 17 | **Circle the answer / yes–no** | 3 | R4 "נוצר צל / לא נוצר צל"; SH3 circle the right conclusion. Untagged: K1's multi-select "circle all the data you need" |
| 18 | **Rating matrix and decision** (0–3 or 1–5 against requirements) | 3 | D3 the matrix + individual vote + round; D5 ideas scored 1–5 |
| 19 | **Question-asking / question sorting** | 3 | EY1 "question map"; D5 ten questions, filter, merge, sort |
| 20 | **Games / puzzles** (word puzzle, cipher, escape box, describe-and-build) | 3 | CL5 the climate escape box; TS3 describe-and-build |
| 21 | **Survey** | 2 | D5 onion sensitivity by age; CL7 the footprint questionnaire |
| 22 | **Guided imagery** | 1 | EY2 the journey into your eye |

**Patterns that stand out.**
- **The story-problem frame.** Almost every unit opens with a short story about a child with a problem (Dor's
  shadows, Noam's onion, the drink can at the cinema, the paper party on 100 ₪). The class returns to the story at
  the end to give the child advice. This maps directly onto villager quests **(idea)**.
- **"Write it, then circle the right conclusion."** Sentence frames ("ככל ש… כך…") and circle-one conclusions
  scaffold the writing.
- **Compare with other groups.** "Do other groups' results match? That gives the conclusion validity."
- **Flow diagrams are the Ministry's universal representation** for energy, the eye, nerves, hearing,
  production and systems. One reusable in-game and on-paper "chain builder" covers 8+ spec items **(idea)**.

---

## 3. Assessment formats found for these topics

1. **MITZAV / Tnufa (national exam), grade 6** · `mitzav/mitzav-sci-spec-grade6-2027.pdf`, `-2026`,
   `-2025-tvuna`.
   - About 30 questions in **units built around an information passage** on one phenomenon, each unit mixing
     content areas.
   - About half are **closed** (multiple choice, matching and more) and half are **open** ("checks correct use of
     scientific language").
   - Weights: energy about **15%**, technology (עולם מעשה ידי אדם) about **10%**. Grade 6 reports group "physics:
     energy and technological systems" together.
   - Required content only (no extensions). On light-or-sound, students answer only the strand they studied (2025
     spec).
   - 90 minutes, on 31.5.2027. The 2025 version was digital, with some videos and simulations, and typed open
     answers.
   - Workbook implication **(idea)**: end each chapter with a one-page "MITZAV-style unit" (a passage, 2 closed
     and 2 open questions).
2. **Alternative assessment tasks ("חלופות בהערכה"), grades 4–6, all 2023–24, all with staged rubrics (מחוונים)
   and peer feedback.**
   - **Build an escape room** · `assessment__escape-room-task-grades5-6.pdf` plus worksheets. Groups build a
     digital or physical escape room on a studied topic, with a flow diagram of the puzzles, peer testing and
     reflection.
   - **Build a learning game** · `assessment__game-task.pdf` plus worksheets: board or digital, with a rubric and
     peer review ("does the design catch the eye?").
   - **Build a scientific model** · `assessment__model-task-mavo.pdf`, `-accessible.pdf`, `-worksheets.pdf`. Model
     types are cause-and-effect (example: "wind blowing turns a wind turbine"), structural (electric circuits, a
     power station), developmental, classification and scale. The accessible deck uses white light as wavelengths
     and a power station as examples. Rubrics cover the lecture and the final product.
   - **Photograph a phenomenon + write a scientific explanation** · `assessment__photo-task.pdf`, worksheets and
     slides. Uses **claim → evidence → reasoning** (טענה, ראיות, הנמקה), with a 4-item rubric scored 0/1/3/5
     (opens with a claim; based on facts; objective language with no personification; scientific terms). The
     slide examples include **a solar field reducing global warming**. A Minecraft screenshot could stand in for
     the photo **(idea)**.
3. **Topic-level assessment tasks.**
   - **Sound** (borrow the format): K1 mixed hands-on, passage and creative task; K2 build-and-test with a
     skills/question matrix.
   - **The eye**: EY2 activity 4 "build an eye model" is explicitly the assessment step of the model lesson
     (requirements = criteria, self-evaluation, peer review). The summary tasks are label-the-diagram plus
     match-the-description.
   - **Inquiry**: the grade 6 inquiry booklet, part D, has a rubric for the inquiry process and a feedback sheet
     (adapted from the bio-inquiry rubric).
   - **Design process**: product evaluation tables (does it meet each requirement, does it work, is it safe and
     comfortable, is the design appealing) and portfolio chapters for peer and teacher assessment (drink-can and
     paper-party projects).
4. **Light-specific "assessment"** exists only as worksheet items (circle-one conclusions, the HAN word puzzle).
   **There is no dedicated light or electricity assessment task in the repo.**

---

## 4. Gaps: required or named topics with no Ministry activity in the repo

| Topic | What exists | What's missing |
|---|---|---|
| Periscope, kaleidoscope, lenses, mirror as a device | Named in SPEC as challenge examples; binoculars named in technology | **No worksheet at all.** "קלידוסקופ" appears only as a metaphor in `netivim.pdf` |
| Prism / spectrum / Newton disc | Mandatory experiences in SPEC; one line in HAN | No student worksheet |
| Light sources versus reflectors (the moon) | HAN brainstorm; SPEC content list | The MATAR lesson "לאור הירח – מואר או מאיר (כיתה ו)" is external |
| Straight-line travel | HAN shoebox test (T1) | Catalogue item "התפשטות האור (כיתה ו)" is external |
| Photosynthesis | Concept-list mentions only | **No activity** |
| Light versus dark germination (mandatory) | SPEC description; pine study (LV2); grade 3 and Tu BiShvat logs | No grade 6 light-versus-dark worksheet |
| Process of vision as a flow diagram | SPEC only | The eye units cover structure, not the light path |
| Eye versus camera (technological versus biological systems) | SPEC "דוגמה: העין והמצלמה" | **No activity**; nothing on technological versus biological systems at all ("קן של ציפור" is external) |
| Eye health, glasses, eye tests | SPEC "write rules"; LV3 screens and melatonin | **No worksheet** |
| Nervous system, stimulus → response | SPEC/2016 flow diagram and matching | **No worksheet** |
| Lightning, static electricity | Videos and external links | **No activity** |
| Magnet + coil, generator | Mandatory in SPEC | No worksheet; MATAR "השראה אלקטרומגנטית (כיתה ו)" is external |
| Steam turbine / power station | SPEC pinwheel experiments; climate.d concepts | No worksheet |
| Renewable versus non-renewable resources | climate.d concepts; extreme-climate action list | No sorting or comparison exercise |
| Electricity bill and consumption | SPEC/2016 lines | **No worksheet** ("בית חסכוני באנרגייה" is external) |
| Energy conversions (flow diagrams) | SPEC; TS3 functional diagram | No dedicated worksheet; the STEM units and "מארז משימות" are external |
| Communication between animals using light | SPEC extension ("לתקשורת בין בעלי חיים") | Only the glow-worm article (S2) |

**External STEM units named by SPEC** (titles only; the content is not in the repo; worth downloading from Ben's
PC):
- קטפולטה → https://www.stemil.org/post/קטפולטה
- טורבינות רוח → https://www.stemil.org/post/טורבינות-רוח
- פיתרונימוס → https://www.stemil.org/post/פתרון-בעיות
- סטתוסקופ → https://www.stemil.org/post/סטטוסקופ
- מארז משימות בנושא אנרגיה → Canva `DAGEdFv_kVk`
- אסון כתם הנפט → matar.tau.ac.il `…/2022/09/אסון-כתם-הנפט-פעילויות-בגישת-סטם-מונגש.pdf`
- שבשבת הרוח בפעולה → matar.tau.ac.il `…/2023/02/יחידת-לימוד-בגישת-סטאם-חוקרים-את-שבשבת-הרוח-10.1.23.pdf`
- כנפיים מעץ / אתגר הדאון → Google Slides `1eI8kPFB…` / `1OKXjHtY…`
- המטריה → Canva `DAG_C1bGqew`

The full links are in the spec docx hyperlinks, extracted with `unzip` of `word/_rels/document.xml.rels`.

**The external grade 6 light and electricity items on the topic pages most worth fetching:**
- MATAR: "לאור הירח – מואר או מאיר", "חיישן אור וחיישן טמפרטורה: חם במגרש", "השראה אלקטרומגנטית"
- The catalogue item "התפשטות האור"
- kids.gov.il "לקטוף אנרגייה מן השמש", "הפקת אנרגייה מתנועת המים/הרוח"
- The Ministry LMS digital course "אנרגיית אור" (lesson 4 "מעבר אור" is cited in silhouettes.pptx)

**Bottom line for design.** For light, the only Ministry student material in the repo is HAN plus silhouettes.pptx
plus the chocolate experiment. For the eye, there are the two TAU catalogue units. For technology, there is a rich
set (D1–D6, the olive press, אל-דמע). For electricity, power stations, the bill and photosynthesis, there are only
SPEC one-liners. Those topics are where we will have to write our own activities.
