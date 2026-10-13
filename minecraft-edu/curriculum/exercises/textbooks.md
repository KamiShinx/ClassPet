# Grade 6 textbooks: science and English (notes only, own words)

Collected 2026-10-13. No publisher PDF, page image or sample chapter was saved; only catalogue facts and my own summaries.
Every fact below is tagged **[seen]** (I fetched the page myself today) or **[guess]** (my inference, not verified).

## 1. Where the approved list lives

The Ministry's approved-textbook data is the "Educational Catalogue" (הקטלוג החינוכי), `https://ecat.education.gov.il/` **[seen]**.
It is a shop-style site: each book has a page with grade, subject, publisher, authors, approval number, approval start year,
the school years it is approved for, supervision (state / state-religious), sector and paid/free. The Excel price list that the
Ministry's book-approval department publishes was not found by search, and the pop.education.gov.il science page that should link
to textbooks (`.../technology-science-pedagogy/books-broadcast/`) only shows two cards without the list **[seen]**.
The old Ministry page `edu.gov.il/special/.../six-grade/science-and-technology/Pages/Teaching-materials.aspx` redirects to
pop.education.gov.il (HTTP 302) and the new page has no book list **[seen]**.

Method I used: `ecat` sitemap (5128 product URLs), fetched every product page, kept those with grade ו (6) and subject
science and technology (מדע וטכנולוגיה) or English (אנגלית). The field values below are copied from those pages.
The sitemap covers only what the catalogue lists; a book approved but not in `ecat` would be missing **[guess: complete]**.

## 2. Science and technology, grade 6, Hebrew-sector, approved for 2026-27 (תשפ"ז) **[seen]**

| title | publisher | authors | approval no. / since | approved years | URL |
|---|---|---|---|---|---|
| במבט חדש, מדע וטכנולוגיה לכיתה ו (מהדורה מחודשת) | Ramot / Tel Aviv University science-education centre | המרכז לחינוך מדעי וטכנולוגי, ת"א | 2649 / 2016 | תשפ"ו, תשפ"ז | https://ecat.education.gov.il/במבט-חדש-מדע-וטכנולוגיה-לכיתה-ו-מהדורה-מחודשת |
| נפלאות המדע והטכנולוגיה, כיתה ו (new book) | Ramot | M. Dressler, N. Mashan, S. Zehavi | 20016 / 2026 | תשפ"ז only | https://ecat.education.gov.il/נפלאות-המדע-והטכנולוגיה-כיתה-ו |
| מסע מדע ו' - מסע ברכב שטח ביבשות רחוקות | Kinneret-Zmora | S. Kalchko, Dafna Lev | 2407 / 2010 | תשפ"ו, תשפ"ז | https://ecat.education.gov.il/מסע-מדע-ו-מסע-ברכב-שטח-ביבשות-רחוקות-2 |
| מדע בעידן טכנולוגי, חלק שישי | Reches Educational Projects | A. Ben-David, H. Gal | 2316 / 2007 | תשפ"ו, תשפ"ז | https://ecat.education.gov.il/מדע-בעידן-טכנולוגי-חלק-שישי |
| במבט חדש, מעשה בראשית, ו' | Ramot / TAU | TAU centre | 2913 / 2021 | תשפ"ו, תשפ"ז | https://ecat.education.gov.il/במבט-חדש-מעשה-בראשית-ו (likely the state-religious companion; **[guess]**) |

Digital copies of the Ramot book and a Kinneret-Zmora digital edition are also listed (paid). The Arabic sector has Bimabat Chadash in Arabic,
"Al-Kanz" (Al-Minbar) and a Sakhnin college book (not covered here).
No separate grade 6 science **workbook** (חוברת עבודה) exists in the catalogue for the Hebrew sector **[seen: none found]**.
The Ramot series instead sells "thinking booklets" (חוברות חשיבה), posters and a materials kit, per mabat.tau.ac.il **[seen]**.

**Which is most used: [guess].** Bimabat Chadash (2016) is a university-backed series for grades 3-6 with a free teacher site and lesson plans for every chapter (see 3 below), and it comes first in every catalogue search I ran, so I expect it to be the most common; the new "Nifl'ot" book replaces it from 2026-27. Kinneret-Zmora and
Reches are older (2007-2010) and I expect them to be minority choices. I found no sales or adoption statistics.

## 3. Bimabat Chadash grade 6 (Ramot / TAU): chapters and exercise kinds

Source: the publisher's free teacher pages `https://mabat.tau.ac.il/סביבות-למידה/כיתה-ו/` and the four free lesson-planning documents
(תכנון לימודים, docx) linked from them **[seen: I extracted the text of the five planning documents and read their task lists; I did not read every cell]**. Page numbers are the student-book pages quoted in those documents.
The student book itself is paid and I did not see it.

Four "gates" (שערים) **[seen]**:

1. **Energy and technological systems** (אנרגיה ומערכות טכנולוגיות): ch.1 Energy around us; ch.2 Technological systems; ch.3 Electrical energy in the service of people. Lesson plan: `.../wp-content/uploads/2025/08/01-תכנון-לימודים-אנרגיה-וומערכות-בפעולה.docx`.
2. **A look inside the body** (מבט אל תוך הגוף): ch.1 Circulatory system; ch.2 Nervous system. Lesson plan: `.../2025/09/02-תכנון-לימודים-מבט-אל-תוך-הגוף.docx`.
3. **Light to see, sound to hear** (אור ולראות, קול ולשמוע): ch.1 Light and vision; ch.2 Sound and hearing. Lesson plans: `.../2025/09/תכנון-לימודים-אור-ולראות-03-1.docx`, `.../תכנון-לימודים-קול-ולשמוע-03-1.docx`.
4. **Ties of coexistence** (קשרי קיום): ch.1 The secret of planet Earth; ch.2 Diversity of living things; ch.3 Living in living environments (ecology). Lesson plan: `.../2025/09/תכנון-לימודים-קשרי-קיום-02-1.docx`.

The planning documents name each student-book task and say what it trains. The task kinds, with paraphrased examples:

| exercise kind | example from the book (paraphrase) | pages |
|---|---|---|
| Predict, then test a phenomenon | kids guess why a ruler half in water looks bent, then observe | 150-151 |
| Do-the-experiment-and-conclude | make a shadow with different objects, then state a general rule about shadows | 140-141 |
| Compare evidence: single example vs sample | three pupils look through three holes into a lit box; was one case enough to claim "light goes everywhere"? | 136-137 |
| Fair-test design (question, hypothesis, changed/kept factors, control, repeats) | investigate what happens to light that a body absorbs; guided by a "research process navigator" card | 146-147 |
| Fill a data table, read a table | measure heart rate in different situations, tabulate, conclude about fitness and heart rate | 105-107 |
| Observe real thing + model | learn eye structure by looking at each other's eyes plus models and diagrams (structural model) | 159-162 |
| Explain with cause-and-effect | "what would happen if one part of the eye were damaged?" | 163-164 |
| Process model | present how hearing works as a chain model | 200 |
| Build something + test materials | build a string telephone, then test which materials carry sound best | 188-189 |
| Technology design challenge | build a model living room with sound insulation | 208-211 |
| Read rules / info and answer questions | eye-health rules, then questions | 166 |
| Survey / attitudes + persuasion | study attitudes to blood donation, then plan how to persuade people | 101-103 |
| Food chain / web | "who eats whom" cards and food webs in nature | 255-261 |
| Adaptation tasks | plants and animals in dry conditions | 241-244 |
| Full inquiry on a mystery | an "oak grove mystery": ask a research question, hypotheses, controls, repeats | 218-222 |
| Case study with data and consequences | habitat-loss example (disappearing winter pools and amphibians); benefit people get from biodiversity | 269-273 |
| Think-science boxes | short question set on the evidence behind an explanation | e.g. 137, 147 |
| Review and summary tasks | "review" page at chapter end, assessment tasks in the teacher guide | e.g. 157, 168 |

The digital companion ("במבט מקוון") adds simulations and short tasks named in the plans, for example "light sources", "Newton's disc", "heating water in a solar boiler",
"colouring a shade over a playground" (simulation), "how do we see?" **[seen: names only, I did not open them; the platform needs an account]**.

## 4. Other science books: what I could and could not see

| book | what I got | what is missing |
|---|---|---|
| נפלאות המדע והטכנולוגיה (Ramot, 2026) | catalogue page; the publisher page lists the topics: energy sources and types, light, sound, electricity, power stations, nervous / vision / hearing / blood systems, species diversity and living things with their environment; names "literacy tasks", "thinking booklets", posters, toolbox, materials list **[seen]** | no chapter list, no sample, no exercise text |
| מסע מדע ו' (Kinneret-Zmora) | catalogue facts only **[seen]**; title suggests a story frame (a trip in an off-road vehicle across continents) **[guess]** | no table of contents or preview found by search |
| מדע בעידן טכנולוגי ו (Reches) | catalogue facts only **[seen]** | no table of contents or preview found by search |

## 5. English, grade 6: approved books

All **[seen]** in `ecat`, subject English, grade ו. Elementary English books are organised by the Ministry's levels
(Pre-Foundation, Foundation Stage 1 / 2 / 3). Original-language imports ("for English speakers only", e.g. Collins, Spectrum, Macmillan) are listed too and are not core classroom books.

| title | publisher | authors | approval since | approved years | URL |
|---|---|---|---|---|---|
| Ready (SB + WB) | English Adventure | Y. Bejarano, S. Ben Yoseph | 2026 | תשפ"ז | https://ecat.education.gov.il/ready-sb |
| Take A Look (SB + WB) | ATS-Books | A. Toledano, T. Stern | 2024 | תשפ"ו, תשפ"ז | https://ecat.education.gov.il/take-a-look-sb |
| Be A Hero (SB + WB) | UPP (university projects) | G. Sabri, S. Stern | 2021 | תשפ"ו, תשפ"ז | https://ecat.education.gov.il/be-a-hero |
| Think About It (pack) | Arik Cohen | M. Melamud | 2022 | תשפ"ו | https://ecat.education.gov.il/think-about-it-מארז |
| The Detectives, Foundation Stage 3 (pack) | English Adventure | K. King-Ya'ari | 2011 | תשפ"ו | https://ecat.education.gov.il/the-detectives-foundation-level-stage-3-מארז |
| Cool Alternative, Foundation Stage 2 (SB + WB; for pupils still acquiring the language) | Arik Cohen | J. Alexander, V. Tzur | 2019 | תשפ"ו | https://ecat.education.gov.il/copy-of-cool-alternative-3 |
| Stories For You 3, Foundation Stage 3 (reader) | Arik Cohen | S. Cohen-Shear, E. Vos Amit | n/a | תשפ"ו, תשפ"ז | https://ecat.education.gov.il/stories-for-you-3-foundation-level-stage-3 |
| Take It Easy (pack), English Tomorrow (pack) | ATS-Books; P. Frenkel | - | 44 (as shown) | none shown | https://ecat.education.gov.il/take-it-easy-מארז |
| Words and More 1 / 2 / 3, Word Power Band 1 Part 2 (vocabulary booklets) | Arik Cohen; Barbara's English Books | - | 2022-2024 | תשפ"ו, תשפ"ז | https://ecat.education.gov.il/words-and-more-1 |

Which are most used: **[guess]**, the newest large series (Ready, Take A Look, Be A Hero). I have no adoption data.

### What exercises the English books contain: **no book interior was publicly visible**

Searches for tables of contents, previews or sample units of Ready, Take A Look and Be A Hero returned nothing from the publishers (one hit,
"Be a Hero Project" on openstuff.co.il, is a teacher unit, not the book, **[seen]**). I therefore do not claim the books' chapter lists.

What I can say instead, from the Ministry's own released grade 5-6 English tests and tasks (which every approved book is written to prepare for) **[seen: read test text]**:

- **Match picture to word or phrase** (4-option multiple choice with a picture; Task 1 of the 2025 grade 6 test).
- **Read a table (a weekly calendar) and follow written instructions**: draw three balls on Monday, circle the date, copy the time into a box, write a word under a heading.
- **Short answer in a full sentence** ("What is Rani doing on Friday?") and **explain a feeling with "because"**.
- **Read a poem**: tick all correct names, multiple choice on cause and meaning of a quoted line, two-point list answers, find words that rhyme, fill a number (age next birthday), say what "they" refers to, guess the pet and give a reason from the text.
- **Label pictures with one correctly spelled word** (spelling is scored).
- **Read an information text** (a short biography of the telephone's inventor): complete sentences from the text, vocabulary-in-context ("interested in" means...), a table "question / answer", spot the writer's opinion, copy one sentence that proves a claim, and an open opinion question ("what would you say to him?").
- Older grade 5 tests and the RAMA units add: sentence-completion listening ("follow different instructions"), listen-and-tick, word-card games, SMS / diary / letter reading, short-paragraph writing with a prompt.

Files: `mitzav/eng6-2025-test.pdf`, `mitzav/eng5-20*-test.*`, `mitzav/eng5-unit-*`, `mitzav/eng56-perf-*`.
See `item-types.md` for a cross-subject list.
