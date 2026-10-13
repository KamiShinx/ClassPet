# Science in Minecraft, grade 6: the full year + lessons 1–3

Your choices: **light** (not sound), **the living island** first, **you run the meetings**, and everything happens
**inside Minecraft** (Play opens the lesson's map; no remote control from the hub).
Write comments in the `💬` slots and start each with `BEN:`.

Sources: the grade 6 science spec for 2026-27, the Ministry lesson files and the English research, all under
`minecraft-edu/` (`curriculum/`, `research/`). Every row below says which Ministry activity it comes from where there
is one. Where the Ministry has nothing (the research found real gaps), the row is our own.

## Contents
0. How it works
1. The year at a glance
2. All 60 meetings
3. Lessons 1–3 in full
4. What we build, and where each piece first appears
5. Build order and what you test
6. Decisions for you

---

## 0. How it works

**One meeting = 90 minutes** (two school periods). **60 meetings = the full 120 hours** of the grade 6 spec,
about two a week from September to June.

**Every lesson has two modes, with the same goal, the same tasks and the same pages:**
- **Computer lab:** the kid clicks the lesson in the hub → Play → Minecraft opens straight into that lesson's map,
  with no title screen and no world menu. The map holds everything: a guide character who explains in Hebrew,
  quests on screen, measuring tools, control panels with sliders, the research notebook, and the English villager.
- **Book:** the same tasks on a printed page. The data the game would have produced is printed instead (identical
  numbers), or there's a real experiment where the Ministry requires one (prism, the straw in the box, a real
  generator).

**The workbook is shared by both modes.** Each lesson's content (questions, tables, cards) is written once. The mod
shows it as notebook pages in the game, and the hub prints the same pages as the workbook. A teacher can switch
modes in any lesson, and the kid's notebook looks the same.

**What makes this better than Minecraft Education:** real measuring in the game (light, temperature, counts, pulse),
inquiry with a table and graph built from what the kid measured, a year that follows the Israeli curriculum
hour by hour, and a full book mode.

**Technical decisions (mine):**
- A copy of the MAKE base (installer, hub, Play, USB stick, update) in its own folder, root and port, so it never
  touches your live class.
- **One mod, built once.** Each lesson is a map saved inside the mod. Play copies a fresh copy and opens it, so every
  kid starts from the same state and a broken world doesn't carry over to next week.
- **The notebook is saved outside the world**, so it carries over from lesson to lesson and can be printed.
- Single player on every laptop, offline. No class server (school networks block it, and the MAKE course shows that
  offline works).
- **Vanilla first:** predation, light levels, plant growth, frogs by temperature, bees, camels and goats are all real
  in the game. The mod adds only what vanilla can't: measuring tools, light that travels in a straight line
  (in the game it spreads around corners), a prism, a Newton wheel, a simple population model, screens and characters.

💬 Comments:

---

## 1. The year at a glance

The units are islands in one archipelago. The class is a research expedition that moves from island to island.

| Unit | Meetings | Hours | Months | Spec topics (hours in the spec) |
|---|---|---|---|---|
| 1. **The living island** | 1–20 | 40 | Sep–Dec | ecology (28) + inquiry (12 of 15) |
| 2. **The island of light** | 21–32 | 24 | Jan–Feb | light (12), the eye (6), eye health (3), communication (2) |
| 3. **The power island** | 33–43 | 22 | Mar–Apr | energy types and conversions (6), electricity (4), resources (2), electricity production (6), environment and climate (4) |
| 4. **The workshop island** | 44–49 | 12 | Apr–May | technological system (6), production (enrichment), engineering design (rest of inquiry/design) |
| 5. **Getting ready for MITZAV** | 50–53 | 8 | May (exam 31.5.2027) | review of grades 4–6 (the exam also covers materials and astronomy from grades 4–5) |
| 6. **The giant** (inside the body) | 54–58 | 10 | June | the heart and blood, the body as a system (enrichment) |
| Final: the expedition's exhibition | 59–60 | 4 | June | presenting a research project |

The light unit comes after ecology on purpose: meeting 15 ("does a plant need light?") is the bridge.

💬 Comments:

---

## 2. All 60 meetings

Short columns: **in the game** = what the kid does in the map · **book** = the same lesson without computers
(Ministry source in brackets) · **English** = the English villager's quest. Every English word is from the official
Band I list, unless marked *(glossed)*: the villager shows a picture.

### Unit 1: The living island (meetings 1–20)

| # | Lesson | Spec | In the game | Book | English |
|---|---|---|---|---|---|
| 1 | נוחתים באי | diversity, characteristics of living things | Land at the jetty; binoculars on animals fill observation cards; sort chests "alive / not alive" | Island poster + observation sheet + sorting cards ("בעין המצלמה" unit) | "Find a small white animal. It lives on the farm." |
| 2 | מה כל בעל חיים צריך? | needs: food, water, air, temperature, shelter | Five pens, each missing one need; fix it and the icon above the animal turns green; thermometer | Circle the needs + matching lines (the hyrax unit) | "My rabbit is hungry. Give it food." |
| 3 | מי גר איפה? סופרים | observation and counting protocol, data table, graph | Count at two points (meadow / forest), three repeats, morning vs night on a time panel; notebook builds a chart | List → form → table → bar chart (arthropod unit) | "How many sheep are there?" |
| 4 | החיים במדבר | adaptations to dryness and heat, structural vs behavioural | Desert: camel, rabbits; thermometer by day and by night; sort adaptations into two chests | Ibex on the cliffs (adaptations unit) | "It is hot. Find an animal with long legs." *(glossed: long)* |
| 5 | החיים בשלג ובהר | camouflage, cold, goats on cliffs | Find the white fox in the snow (a real variant); goats jump on cliffs; temperature low on the mountain | Camouflage page + structure → function table | "Find a white animal in the snow." |
| 6 | צפרדעים וטמפרטורה | effect of the environment, life cycle | Raise tadpoles in three places (warm / mild / cold) → three frog colours (real mechanics) | Tadpole vs frog comparison table + life-cycle cut-out (frog unit) | "Put the baby in the water." |
| 7 | מקור לכל ציפור | structure fits function | Feeding stations: a bird with each beak type tries seeds / fish / nectar (our bird mob) | Kitchen tool ↔ beak, characterisation cards (beak unit) | "This bird eats fish. Which bird?" |
| 8 | אגם מול חורש | two habitats (the spec's lake and woodland) | Count and measure at the lake and in the woodland: light, water, which animals | Two-habitat comparison table | "Is it near the river or in the forest?" |
| 9 | מי אוכל את מי? | food chains, herbivores / carnivores / omnivores | Watch real predation (fox→chicken, wolf→sheep, axolotl→fish); a camera logs every "meal" as an arrow | Sort predators / prey + read a web (wild animals unit) | "The cat eats the fish. Is it true?" |
| 10 | בונים מארג מזון | food web, omnivore (the fox eats berries too) | Build the island's food web on a wall with arrows; the game checks against what was logged | Build a web from cards (a Ministry gap; ours) | "Who eats grass?" |
| 11 | ניסוי: מזון או טורפים? | inquiry: variables, control, repeats | Experiment station with **sliders**: number of foxes, fence on/off, amount of grass; time speeds up; counts per "month" | The hyrax and jackals study, data tables (inquiry booklet, study 6) | "Count the rabbits. Write the number." |
| 12 | מעלימים חיה אחת | systems thinking, prediction | Remove the wolves → sheep increase → grass disappears (our model); predict, run, check | Predict + chain of consequences | "There are no dogs. What happens to the sheep?" |
| 13 | ביחד: הדדיות וטפילות | mutualism, parasitism | Bees near the crops: measure growth with and without a hive (real mechanics) | Ants and thistle (study 4) + head lice (parasitism) | "The bees help the flowers. How?" *(glossed: bees)* |
| 14 | תחרות על אור | competition between plants | Flowers under a dense forest don't grow (light below 9); measure with the light meter | "Pine deserts" (study 1) | "Is it dark or light here?" |
| 15 | האם צמח צריך אור? | light as a condition for life (a required inquiry ✧) | Identical wheat plots under different light, repeats, growth stages | Narcissus study (study 3) + real germination in an egg carton | "Which plant is big? Which is small?" |
| 16 | מתכננים מחקר | research question, hypothesis, variables | The expedition lab: all the tools; pick a question from a bank; planning sheet in the notebook | Planning sheets (inquiry booklet, part B) | "What is your question?" |
| 17 | מבצעים את המחקר | measuring, repeats, recording | Run your experiment in the lab | Real experiment or given data | "How many times?" |
| 18 | מתוצאות למסקנה | table → graph → conclusion | The notebook builds the graph; write the conclusion; supports or refutes | Graph page + poster template | "What did you find?" |
| 19 | בונים כפר | human benefit vs environmental cost | Build houses for the village; choose where; animal counter shows the loss; cut down the forest and the parrots disappear (mod) | Save the rainforests (MITZAV-style literacy task with a rubric) | "We need houses. Where?" |
| 20 | שמורת טבע | reserves, laws, reducing damage | Mark a reserve, set rules (no hunting); island health score; summary of the unit | Easter Island: chain of consequences + argument | "Draw a line around the park." *(park ✓)* |

### Unit 2: The island of light (meetings 21–32)

| # | Lesson | Spec | In the game | Book | English |
|---|---|---|---|---|---|
| 21 | מי מאיר ומי רק מחזיר? | objects that give light vs reflect it | Collect light sources and sort them; the moon is the trap | Sorting cards (Hanukkah unit) | "Is the moon a light?" |
| 22 | האור הולך ישר | light travels in straight lines | Our light ray: a straight tube vs a bent one; a dark box (vanilla light spreads around corners, so we say so honestly) | The shoebox and the straw (a real experiment) | "Can you see the light?" |
| 23 | צללים | shadows, opaque / transparent | The ray throws shadows on a wall; a shadow puzzle; tinted glass as a trap | Shadow theatre (silhouettes unit) | "Make a big shadow." *(glossed: shadow)* |
| 24 | מראה ובליעה | reflection, absorption, light and dark objects | Mirror blocks bend the ray: a laser maze; white panel vs black panel | Paper squares in a dark box (required) | "Turn left. Turn right." |
| 25 | צבע וחום | does colour affect heating? (a required inquiry ✧) | Coloured water tanks in the sun, a thermometer over a day | Fair-test planner + a real experiment | "Which is hot? Which is cold?" |
| 26 | האור הלבן | the spectrum, prism, Newton wheel | Prism block splits the ray into 7; Newton wheel block spins and turns white | A real prism + a printed Newton disc on a pencil | "What colors can you see?" |
| 27 | שבירת אור | refraction | Lens block bends the ray (vanilla water doesn't refract) | Spoon in a glass of water (real is better) | "Look at the spoon. Is it straight?" *(glossed: spoon)* |
| 28 | פריסקופ ודוד שמש | technological uses of light | Build a periscope from mirrors to see over a wall; a solar collector heats water | Build a real periscope (engineering design) | "Look over the wall." |
| 29 | איך המוח יודע? | communication: stimulus → nerve → brain → response | Reaction lab: a light lights up, you react, reaction time measured | Flow diagram | "Ready? Go!" |
| 30 | בתוך העין | eye structure and the process of vision | A walk-through giant eye: pupil, lens, retina, optic nerve; follow the ray | Label the eye + flow diagram (eye units) | "Find the eye. Look in." |
| 31 | עין ומצלמה | technological vs biological system | A dark room with a small hole (camera obscura); compare to the eye | Comparison table | "Take a photo." |
| 32 | שומרים על העיניים | eye health | An eye-test chart in the game (English letters!), sunglasses and protective goggles; summary of the unit | Rules for healthy eyes | "Read the letters." |

### Unit 3: The power island (meetings 33–43)

| # | Lesson | Spec | In the game | Book | English |
|---|---|---|---|---|---|
| 33 | אנרגיה בכל מקום | types of energy | Energy scanner item: point at a thing and say what energy it has | Sorting | "Is it hot? Is it moving?" |
| 34 | אנרגיה משנה צורה | conversions and transfers, flow diagrams | Redstone machines; trace each conversion; a flow diagram in the notebook | Flow diagrams (spec emphasis) | "First… then…" |
| 35 | אתגר: 2 המרות ו־2 מעברים | the spec's challenge | Build a chain machine | Draw it or build it for real | "Show me your machine." *(glossed: machine)* |
| 36 | ברק וחשמל סטטי | electricity in nature | A storm, a lightning rod protects the village (vanilla) | Reading + questions | "It is a storm!" |
| 37 | מגנט וסליל | producing current (required) | Generator block: turning a crank → redstone power, a meter | A real coil + galvanometer | "Turn it. Look at the light." |
| 38 | מה מסובב טורבינה? | wind, water, steam (required) | One turbine, three drivers: wind (height), flowing water, steam; compare the output | A real pinwheel with wind / water | "Wind, water or fire?" |
| 39 | בונים תחנת כוח | parts of a steam power station | Fuel → boiler → turbine → generator → the village's lamps | Label and order | "Turn on the lights." |
| 40 | מתכלה או מתחדש | energy resources | A coal field that runs out vs wind and sun (daylight detector) that don't | Comparison table | "Is there more coal?" *(glossed: coal)* |
| 41 | המחיר: עשן והתחממות | environment and climate | Pollution meter, smoke, island health | Climate texts + questions | "The air is dirty." |
| 42 | איפה לבנות את התחנה? | decision + argument | A map with a village, forest and river: choose, see the score | Argument writing (MITZAV style) | "Here or there? Why?" |
| 43 | חוסכים חשמל | consumption, the bill | The village meter; turn off lights; a bill in the notebook | Reading a real electricity bill | "Turn off the light!" |

### Unit 4: The workshop island (meetings 44–49)

| # | Lesson | Spec | In the game | Book | English |
|---|---|---|---|---|---|
| 44 | מה זה מערכת טכנולוגית? | input → process → output | Tour of machines: furnace (ore + fuel → iron + smoke) | The olive press visit sheet | "What goes in? What comes out?" |
| 45 | תוצר רצוי ולא רצוי | desired and undesired outputs, machine vs body | Find what each machine produces that we didn't want | Comparison table | "Is it good or bad?" |
| 46 | ביד או במפעל | handmade vs industrial production (enrichment) | You alone vs a line of workers (characters), on a timer | A real assembly line in class (better on paper) | "Who is first?" |
| 47–49 | אתגר: השקיה אוטומטית | engineering design (the spec's own example) | Need → requirements → ideas → build in redstone → test on a field → improve | The same process with simple materials | "The plants need water. Build it!" |

### Unit 5: Getting ready for MITZAV (meetings 50–53)

| # | Lesson | In the game | Book |
|---|---|---|---|
| 50–53 | Exam units in the MITZAV format: a passage → about 8 questions, half closed and half open | Review quests on the islands; MITZAV-style questions in the notebook | Released MITZAV tests (being collected now) |

The exam also covers grades 4–5 (materials 20%, astronomy 10%), so there's a review of those too.

### Unit 6: The giant (meetings 54–58) and the exhibition (59–60)

| # | Lesson | In the game | Book |
|---|---|---|---|
| 54 | הלב | A walk-through heart: atria, ventricles, valves | Observing a heart (required in the spec as an option) |
| 55 | הדם נוסע | Riding with a red blood cell: lungs → heart → body | Circulation flow diagram |
| 56 | הדופק במאמץ | A pulse meter in the game: running raises it; experiment | A real pulse-after-exercise experiment |
| 57 | הגוף כמערכת | Systems working together: running = breathing + heart | Systems map |
| 58 | תרומת דם ובריאות הלב | Summary quest | Reading + questions |
| 59–60 | התערוכה | Each kid shows their research in the game (the expedition lab) | Poster |

💬 Comments:

---

## 3. Lessons 1–3 in full

These three show **every mechanism** at least once, so after them you know what the whole year looks like.

Every lesson has the same shape: **you demonstrate on the projector (10 min) → the kids work in the game or the book
(~65 min) → a short class talk (10 min) → the notebook is saved automatically and they close (5 min).**

### Lesson 1: נוחתים באי (Landing on the island)

**Goal:** know what lives on the island, and tell living things from things that aren't alive.
**New mechanisms:** the lesson map opens from Play · a guide character with a dialogue screen in Hebrew · the
quest list on screen · the research notebook (the N key) · binoculars · sorting chests that check themselves ·
the English villager · the lesson's end screen.

**In the game:**
1. The kid arrives by boat at the jetty. The guide waits at the jetty and explains in two lines:
   "ברוכים הבאים לאי. אנחנו משלחת מחקר, ואתם החוקרים. קודם כול, בואו נבדוק מי גר כאן."
2. **Quest 1 (top right of the screen): "מצאו 6 בעלי חיים שונים."** The binoculars (right click on an animal) open
   an observation card in the notebook: the game fills in the name and a picture; the kid fills in *where it was*,
   *what it was doing* and *what it might eat* (choosing from options).
3. **Quest 2: "חי או לא חי?"** Ten things on a table at the research camp: a seedling, an egg, a wooden log, a bone,
   wool, a stone, a fish in a bucket, a flower, a feather, water. Two chests. When a thing goes in the right chest
   there are green sparks; in the wrong one, nothing happens and the guide gives a hint. The traps (the log, wool,
   the egg) are for the class talk at the end.
4. **The English villager (Sam)** stands next to the farm:
   "Hello! I am Sam. I love animals. Find a small white animal. It lives on the farm. It gives us eggs."
   The kid brings a chicken (right click with a lead or a bag). Next: "Find an animal. It lives in the river." → a fish.
5. **End:** the lesson's end screen: what you found, what's left, "see you next lesson".

**Book:** an island poster (screenshots from the map) with numbered animals · 6 observation cards (the same fields) ·
10 cards to cut out and sort · Sam's text as read-and-circle.

**Class talk (10 min):** "Is a wooden log alive? Was it alive?" → characteristics of living things.

### Lesson 2: מה כל בעל חיים צריך? (What every animal needs)

**Goal:** five needs: food, water, air, a suitable temperature, shelter. The environment supplies them.
**New mechanisms:** a status display over animals (5 icons) · a fix-it puzzle that checks itself · the thermometer.

**In the game:**
1. Five pens at the camp. Each animal lacks one need: a sheep with no grass, a cow with no water, a fish on dry
   land, a rabbit in an open pen with no shelter for the night, a chicken in a hot pen in the sun with no shade.
2. Above each animal: five icons (food, water, air, temperature, shelter). The kid diagnoses with the thermometer
   and their eyes, fixes it (lays grass, digs a ditch for water, builds a roof…), and the icon turns green.
3. **Notebook:** a needs table: animal | what was missing | what I did | how the environment supplies it in nature.
4. **Sam:** "My rabbit is hungry. Give it food." / "The cow wants water."

**Book:** the hyrax circle-the-needs exercise (7 options) + matching lines need ↔ how the animal gets it + 5 pictures
of pens: "what's missing?".

### Lesson 3: מי גר איפה? סופרים (Who lives where? Counting)

**Goal:** a counting protocol, recording, repeats, a table and a bar chart. This opens the inquiry thread for the year.
**New mechanisms:** a **control panel with a slider** (time of day) · the counter (a timed counting circle) ·
a data table in the notebook that **builds a graph automatically** · repeats and a mean.

**In the game:**
1. Two observation points: a meadow and a forest. At each one there's a circle on the ground and a counter: stand
   in the circle, press, and the game counts the animals in the circle for 60 seconds. **The kid writes the numbers
   in the table themselves** (the game shows them live). The skill is the recording, not the counting.
2. Three repeats at each point (the protocol: same circle, same time).
3. **Control panel at the observation tower:** a slider for time of day (morning / noon / night). Repeat the count
   at night: foxes sleep in the day and come out at night (real game behaviour), and the night creatures appear.
4. The notebook builds a bar chart from the kid's table: meadow vs forest, day vs night. One question: "what's the
   difference, and why?"
5. **Sam:** "How many sheep are there? Count them!" → the kid types a number in English (or chooses it).

**Book:** the arthropod sequence: a long list of findings → a counting form → a table → a double bar chart. The
data is exactly what the game would give.

💬 Comments:

---

## 4. What we build, and where each piece first appears

| Piece | What it does | First appears | Vanilla or mod |
|---|---|---|---|
| Play → straight into the lesson's map | Fresh copy each time, no menus | 1 | mod + hub |
| Guide character (Hebrew) | A dialogue screen with buttons | 1 | mod |
| Quest list on screen | Lesson tasks, ticks itself | 1 | mod |
| Research notebook (N) | Cards, tables, graphs, answers; saved outside the world; printable | 1 | mod + hub |
| Binoculars | An observation card for an animal | 1 | mod |
| Self-checking chests | Sorting with feedback | 1 | mod |
| English villager (Sam) | Band I quests, picture glosses | 1 | mod |
| End screen | Summary of the lesson | 1 | mod |
| Status display over animals | 5 needs icons | 2 | mod |
| Thermometer | Temperature by biome, height and time | 2 | mod (reads the game's biome temperature) |
| Control panel with sliders | Time, number of animals, light, fence… | 3 | mod |
| Counter | A circle, 60 seconds, live count | 3 | mod |
| Light meter | Light level (0–15) | 8 | vanilla data, our display |
| Meal log | Predation becomes an arrow in the notebook | 9 | mod (listens to real predation) |
| Simple population model | Births, starvation, competition (vanilla has none of this) | 11 | mod |
| Light ray, mirror, prism, lens, Newton wheel | Light that behaves like real light | 22–27 | mod |
| Walk-through giant eye and heart | Big built structures | 30, 54 | map |
| Generator, turbine, boiler, pollution meter | Energy | 37–41 | mod (redstone as electricity) |
| Pulse meter | Pulse that rises with running | 56 | mod |

💬 Comments:

---

## 5. Build order and what you test

1. **The base:** copy MAKE's installer, hub and Play into `minecraft-edu/` with its own root, port and mod
   name. Play opens a map directly. Test: install on a laptop, Play, land on an (empty) test island.
2. **Lesson 1:** guide, quests, notebook, binoculars, chests, Sam, end screen + the lesson map. Test: you play
   lesson 1 from start to end.
3. **Lessons 2–3:** status display, thermometer, slider panel, counter, graph. Test: the same.
4. **The workbook for lessons 1–3** from the same content.
5. Then lesson by lesson, in the order of the year.

As in the MAKE course, the cloud can't run Minecraft (Mojang and the NeoForge maven are blocked), so **every Java
piece needs your Windows test**. I'll send each test as a short list.

💬 Comments:

---

## 6. Decisions for you

**A. 90 minutes and 60 meetings.** Does that fit the way you'll actually work in schools? If it's 45 minutes, every
row splits in two and the year doesn't change.

💬 BEN:

**B. Who builds the maps?** I can generate a working map by code (terrain + stations), and that's enough to test.
For a map that looks good enough to sell, someone needs to build it by hand in Creative, using our blocks: you, your
partner, or a hired builder. My recommendation: I build the test map by code now, and the pretty map comes later.

💬 BEN: (in chat, 13 Oct) a test map by code now; later my sister may build the real maps, she loves this.

**C. A name.** I'm using "the islands" and "the expedition" as working names. If you have a name for the program,
give it to me now: it goes into the hub, the mod and the maps.

💬 BEN:
