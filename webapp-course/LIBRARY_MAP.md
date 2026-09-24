# The hub library: map (draft 1, 24 Sep)

What this is: every video you sent plus my gap picks, triaged and sorted into **library pages** for the web-app
course hub. The library is the optional "overkill" layer: homework pages, never needed for the next class.
Leave comments on any line with 💬 (or `BEN:`). I read them when you say done.

**How it was made:** 547 videos (~525 h) → captions or Whisper transcripts → Sonnet triage (core / useful / skip, with
the best segments timestamped) → this map. Multi-hour marathons were **sampled** (first 30 min, or spread windows),
not heard whole; those are marked *(sampled)*. Raw verdicts: `library-research/triage/T01–T18.json` (T17–T18 re-judge the ones first decided from titles).

| | videos | share |
|---|---|---|
| triaged | 385 of 547 | the other 162 are the unsampled rest of marathon playlists (checked by title, not worth fetching) |
| core | 101 | teach it from these |
| useful | 102 | good segments inside, or optional depth |
| skip | 182 | Figma clicking, SQL-Server syntax, interview prep, Hindi, duplicates, PMP exam jargon |

**Rule for every page:** link the **segment**, not the video (YouTube `?start=&end=`). A 27-min lecture with 6 good
minutes becomes a 6-min watch. Every page = short Hebrew explanation (mine) + 1–3 segments + one "try it on your
app" task + one prompt to paste into Gemini.

Every kept video was judged from its transcript, none from its title alone. One video (a Gantt-chart lecture) could
not be downloaded and is left out.

---

## Three things to decide first

**1. Language.** Everything is English except code.org's Internet series, which has **real Hebrew captions**.
YouTube can auto-translate captions to Hebrew (CC → Settings → Auto-translate), which is rough but usable. Options:
(a) English + auto-translated captions, (b) prefer videos with Hebrew captions and I write Hebrew summaries for the
rest, (c) the pages carry the teaching in Hebrew and videos are "bonus".
My pick: **(c)**. Most 14-year-olds won't sit through 10 min of English lecture at home, but they will read a short
Hebrew page with a GIF and click a 2-minute clip.
💬

**2. YouTube at school.** The hub embeds YouTube inside the Apps Script page. If the Ministry network or the student
accounts block YouTube (or force Restricted Mode, which hides some videos), the library still works at home.
Add to the October day-zero test: open one embedded clip on a student account at school.
💬

**3. Size.** The map below has **60 pages**. Building all of them before November is not realistic, nor needed.
My proposal: build pages in the order the course reaches them (tag **P1–P4** = the phase that needs it; ★ = the
page a meeting links to as homework). The 22 ★ pages first, the rest during the year.
💬

---

## A. How the web works: what a backend actually is (P1 ★)

The strongest find in the whole triage lives here: **code.org's "How the Internet Works"** (short, made for
classrooms, Hebrew captions). The CodeAI playlist you sent is code.org's own channel; the videos are marked "made for
kids", which is why the downloader failed at first. Not dead.

**A1 ★ What happens when you open your app's link** (P1, meeting 1–2)
- `5o8CwafCxnU` IP & DNS · 1:24–2:38 (every device has an address) + 3:58–5:07 (DNS acted out as a phone-around skit)
- `kBXQZMmiA4s` HTTP & HTML · 1:15–4:54 — **the best "what is a backend" clip found.** GET = ask for a page, POST =
  send a form, the server answers with a cookie = its ID card for you. GET/POST are literally `doGet`/`doPost`.
- alt: `hJHvdBlSxug` Academind, "How the web works – big picture", 12 min, whole thing (DNS → HTTP → JSON → apps)
- Task: open your /exec link, find the GET in DevTools → Network.
💬

**A2 ★ Frontend, backend, database: who does what** (P1)
- `RA9ZGgtlDzE` Soper · 3:42–9:22: user → app → database layer, and why only the backend touches the data
- `oYxTTirKY8M` Hayk *(sampled)* · 0:00–6:01: one server, HTML for browsers vs JSON for apps
- `zjfViRCjT5U` Code Sensei · 21:40–23:38: three teams, one for the data, one for what you see, one in between
  (= Sheet / HTML / Code.gs); 16:58–17:55 HTML = text, CSS = looks, JS = behaviour
- I write: the three-box picture of *their* app (page / Code.gs / Sheet).
💬

**A3 What's an API** (P1–P4)
- `j_uf3eJtLkw` waiter & restaurant, 2 min, whole
- `_YlYuNMTCc8` Gaurav Sen · 0:00–9:17: an API is a promise (not the code), name functions honestly, plan the error cases
- `WXsD0ZgxjRw` freeCodeCamp *(sampled)* · 0:00–17:43: remote controls, buttons, why REST won
- `oYxTTirKY8M` · 1:12:42–1:15:27: status codes 200/400/404/500
💬

**A4 The page talks to the server with fetch** (P4, the Netlify final)
- `Qblfirx_smU` PokeAPI · 0:00–3:44 + 6:32–7:05 (the gotcha: fetch doesn't fail on a bad address, you must check)
- `zOrejGF0oBA` · 7:27–11:29: button → fetch → result lands on the page
💬

**A5 Why is my app slow? (latency + caching)** (P2)
- `ZhEf7e4kopM` code.org · 2:58–3:31: bandwidth vs latency (why one server call takes a second)
- `zw7VwIlkPPc` Gaurav Sen · 0:00–3:47 + 6:42–8:38: caching and stale data
- `mJ_JZCKTki8` SCALER · 11:43–21:24: cache as the fridge (hit / miss)
- I write: Apps Script's CacheService in 5 lines; loading states → C8.
💬

**A6 Why live multiplayer is hard on Apps Script** (P3, if the game goes there)
- `ZotHUoS-RCE` SCALER *(sampled)* · 16:09–20:35: request/response vs an always-open WebSocket
- `vvhC64hQZMk` · 2:51–10:49: how WhatsApp's ticks work (the server can't call you back)
- I write: why our games are async (ghost races, turns) and what PeerJS on Netlify changes.
💬

**A-bonus (curiosity, no task):** What is the Internet `Dxcc6ycZ73M` (street interviews, fun) · Packets & routing
`AYdF7b3nMto` · How search works `LVV_93mBfSU` · Encryption `ZghMPWGXexs` · How big sites grow: pizza shop
`SqcXvc3ZmRU`, the Delicious story `8telu1SoCKM` 15:40–26:45 · Netflix `x9Hrn0oNmJM` · CDN `b4_6thkYZXs` ·
message queues `oUJbuFMyBDk` 0:00–2:32.
Cut: Cybersecurity & Crime (no cyber, per you), sharding, CAP, all interview videos.
💬

---

## B. The Sheet is a database (P1–P3)

Dr. Daniel Soper turned out to be the best source in the pile: 32 core videos, calm, concept-first, examples that
map straight onto tabs. His SQL-syntax videos are skipped (Gemini writes the code). Database Star supplies the
"design a database for X" worked examples, several of them apps a kid would actually build.

**B1 ★ Why one big list breaks** (P1)
- `tQzJMsuuw1M` Soper · 0:31–3:22: repeating the same customer on every row
- `jMTpsTUVGaM` Soper · 1:29–11:35: the insert / update / delete problems (car-repair shop)
- opener: `DUHOSFoYK7o` · 1:59–3:46 (a database is organisation + asking questions)
💬

**B2 ★ One tab per thing, linked by an ID** (P1)
- `T6EeA122DlY` Soper · 1:29–15:50 — **the single best video for "one tab per concept, linked by an ID column"**
- `BOW-Tc8YVPs` Soper · whole (9 min): what a "thing" (entity) is and which columns belong on its tab
- `el8cUJyh-T0` Soper · 0:00–15:47: the ID column that points to another tab, and why it must point at a real row
  (the rest is a SQL Server demo)
- `rqQxPSPibS8` · whole (8 min): the header row is the blueprint, each row is one thing
- `bKDsq4LkOMc` · 0:31–8:18: rules for a clean tab (one value per cell, no duplicate rows)
- `JlNYeFaWTzw` · 0:55–3:51: don't cram several facts in one cell (the address example)
💬

**B3 ★ IDs: every row needs a name tag** (P1)
- `zi3OwBCBagk` · 4:01–7:07: why a name can't be the ID
- `-CAoJbwtHl8` · 0:57–7:21: picking a good ID (plate, email, student number…)
- `hqO4K0IAJs0` · 0:00–1:55: the invented ID (surrogate key)
- `vatOryRgJpQ` · 1:29–8:27: two columns together as the ID (flight + date)
- `PiMlUjQP-JM` · 1:31–3:02: phone numbers lose their leading 0 when stored as a number (**Sheets does this too**)
💬

**B4 One-to-many (a player has many scores)** (P2)
- `oeRlzvmUB8Q` Soper · 3:34–13:12: the reference column goes on the "many" side (player/team!), and the mess otherwise
- `-C2olg3SfvU` Database Star · whole (9 min): 7 steps from a sentence to two linked tabs
💬

**B5 ★ Many-to-many (inventories)** (P3, the game)
- `1eUn6lsZ7c4` · 0:00–3:50: why two IDs can't share a cell, and the link tab
- `6XSE3PWo29s` Soper · 2:57–8:00 + 11:10–21:43: the link tab, and "may the same player own the same item twice?"
- `zBZEz1vZdIQ` SCALER · whole (14 min): LinkedIn's features → tables
- `41BTnJ9o2fs` · 14:38–22:48: customers × courses × enrolment
- `Kzp5wkP9Lo8` · 4:56–10:26
💬

**B6 Draw it before you build it (boxes and lines)** (P2)
- `5S9LSy_QE8M` · 0:58–7:55: a tab as a box with its ID and required columns
- `Oxda-LTLTOc` · 0:57–4:01: the crow's-foot marks (zero / one / many)
- `1DAnVydNmxc` · whole (6 min): one vs many, and which side of the line the ID column lives on
- `ZWxuffTEyyg` · 2:49–6:29: when a 3-way relationship needs a 4th tab
💬

**B7 ★ Design a database from an idea** (P2–P4, the final project)
- `5RpUmDEsn1k` Database Star · 0:00–8:20 — **the master method**: write the idea, find the nouns, add columns, add
  the lines, review. Teach this one first.
- worked examples, pick by project: **Hogwarts** `FWobkkYD2s8` (the game one) · chat app `xL_tYrEcP9M` (fixes its
  own mistake live) · Trello `7Ck8wSoKJXI` · food delivery `vf_9sUqhjwM` · whole school `1YPT6VH256w`
- more: Facebook `sougyTO_Wjw` · Instagram `i_1CbyzzlDk` · StackOverflow `pAFA2jhTlD0` · course site `FZVHZTaot1E` ·
  Airbnb `U2_MBLS04aQ` · e-shop `1HamqOuv2Cw` · Instagram likes `QmX2NPkJTKg` 3:15–11:00
- `s6m8Aby2at8` · 7 first-design mistakes (0:00–2:23, 7:41–9:39)
💬

**B8 Blank cells and bad data** (P2)
- `U4Z4maN9ERI` · 0:00–8:51: empty ≠ 0 ≠ "", and empty as a decision (does every player need a team yet?)
- `3d78pO7-JKE` · 3:16–11:08: rules on what may go in a column + "does this ID exist?"
- `9gxxu5E2-SQ` · 0:00–5:13: rows that can't exist without a matching row elsewhere
💬

**B9 Store it or calculate it?** (P3)
- `O3ZHi2nW7tI` · 4:56–14:09: keep a running count and update it with a trigger (= an Apps Script onEdit)
- `QF3srvfb4GU` · 12:26–19:11: the trade-off (fewer lookups vs numbers that go stale)
💬

**B10 ★ Two players, one Sheet: the lost update** (P3, the game)
- `cy4uGB7Gc-U` Soper · 4:49–12:20 — **the story LockService exists for**: two people read the same number, both write
  back, one write silently vanishes
- `-CXWjbYX1MY` · whole (5 min): lock everything vs lock nothing
- `O3ey0Mggz84` Soper · 0:00–13:22: the lock itself, as "one customer in the shop at a time" with an inventory example
- `x1wZPXKz40k` · 0:00–14:16: pessimistic vs optimistic locking (Wikipedia vs credit cards)
- `PydAvj0eu8o` · 6:28–15:14: a multi-step save that fails halfway (transactions)
- deeper: dirty/phantom reads `ch65WIjhF4M` · ACID `BwaFhBCPDdc` 0:00–5:06
💬

**B11 Finding a row fast** (P3, optional)
- `Zc54pFX6VxY` · 3:17–7:05: the textbook index
- `kpXXHCfN8zI` · 6:40–22:14: live Excel demo, scanning vs sorted as the rows grow
💬

**B12 Words: CRUD, hierarchies, types** (reference)
- CRUD `RM_NiPSaPG0` 0:59–2:58 · a tab that points to itself (manager, sub-category) `On4ITNnhSKc` ·
  character classes = shared columns + type-only columns `zf0_jg1rXrs` 1:29–8:05 · one Users tab with a role column
  vs a tab per role `Pg0ADtwt32k`
💬

**B-teacher (for you, not kids):** SQL SELECT / JOIN / GROUP BY / COUNT–AVG (Soper `wf2pUrCBr7U` `gmvodoXjGiw`
`jK6XLv6cALw` `wM_Q-z8eLLo` `upS5D27ZsuQ`, Database Star `UfgRTbRN9FM`). Useful only to translate into Sheets words:
JOIN ≈ VLOOKUP/XLOOKUP, GROUP BY ≈ pivot/QUERY, COUNT/AVG ≈ same names in Sheets.
💬

---

## C. UI: how it looks (P1–P4)

Merged with the 13 UI/UX pages proposed in the first research round (Kevin Powell, NN/g, DesignCourse, Juice, etc.).
Big pattern: DesignCourse's **review** videos are core (fast good-vs-bad fixes); his **challenge** videos are 90%
Figma clicking and skipped. Nobody here uses Figma: Gemini builds the UI, so we keep ideas and vocabulary, never tool
steps.

**C1 ★ UI vs UX in 5 minutes** (P1, meeting 1)
- `SbVZCiYBVoU` DesignCourse · 0:33–3:53: the ketchup packet
- `rX9vee7ITVE` · 2:46–4:56: a pretty bank app that works badly (Enter doesn't submit, nothing shows it's clickable)
- `ziQEqGZB8GE` CareerFoundry · 3:10–5:54: the toaster and the door you push when it says pull
💬

**C2 ★ Hierarchy: where does the eye go first** (P1)
- `WwroSqXjrLM` Simplilearn · 2:15–8:18: 7 tools (size, colour, contrast, type, balance, closeness, F/Z reading)
- `08MrVhy2qk8` · 2:50–9:00: 7 UI principles with good/bad examples
- `EcbgbKtOELY` Kole Jain · 0:00–3:03: signifiers (how a screen shows what's clickable) + "grids optional, white space
  not", with real spacing numbers
- `hN65NAkGOw4` Simplilearn *(sampled)* · 17:48–29:34: the Gestalt rules (closeness, similarity, closure…) with examples
- + first-round page "contrast, spacing, the 7 fundamentals" (Kevin Powell / Figma-free segments)
💬

**C3 Colour** (P1)
- `TqsYDUBoIxQ` · 1:44–10:26 or `h9r_UpOzajA` · 1:44–8:30 (same content, pick one)
- contrast you can measure (4.5 : 1): `EZBwM1aOwLc` 16:45–19:02
- dark mode: `wqTZuEQ2P-s` 1:05–3:20 (shift lightness, don't jump to pure black)
💬

**C4 Type** — `C5h1ZE1AhlI` · 1:04–4:38 (serif/sans, weights, headings vs body) 💬

**C5 Layout and phones** (P2)
- `SKvsPh0qdQU` · 0:34–5:13: grid, gutter, margin, breakpoints
- `gJ6cvzZ0ewQ` · 0:32–11:05: Figma's auto layout = CSS flexbox reasoning (direction, gap, padding) — I'll bridge
- `TPNheq7g1P8` · 1:06–3:51 + `exQKEte8cmQ` 6:32–7:36 + `rGheGnrcdgc` 6:42–8:20: collapsing columns without orphans
- + first-round page "responsive layout"
💬

**C6 ★ The parts of a screen: nav, hero, cards, forms, dashboards** (P1–P2)
- nav `XdtwJdFjoVs` 1:38–5:58 · hero `cYnJLT36Oxo` 0:36–7:14 · forms `I5Vz2pl8pPI` 2:14–4:26 (strongest form video) ·
  dashboards `uMQnKUIXUSI` 3:51–5:32 · mixed fixes `IUTmJ_ZYDRg` 2:49–4:28
- cards `D1TFx9iZB08` 0:48–1:40 + 4:54–7:37 (a shadow must be darker than what it sits on; declutter) · busy
  backgrounds `OiQ54LUy29E` 1:35–4:13 + the one-breath summary 11:11–11:59 · list pages `QKrglAsEgY8` 0:55–1:51,
  5:00–5:56 (text that looks clickable but isn't)
- what a contact form actually needs (3 fields) `EKjCC4PwjFo` 0:00–1:33 · what a dashboard needs `C95S7gW2-_U`
  0:47–1:39
💬

**C7 Same look on every screen** (P2)
- `YVdm3e1NBf4` · 0:32–1:37: a second page must feel like the same app
- `sG1n8umTJnI` · 2:18–7:45: design system / component, in words
- `HE4rLEQpiXY` Kole Jain · whole (6 min): start from what the user wants, keep conventions, design systems
💬

**C8 ★ Loading, empty, error** (P2)
- `4HuI9oHYpNs` · whole (1:40): skeleton vs spinner, when each
- `EcbgbKtOELY` · 6:47–8:36: every button has 4 states (normal / hover / pressed / disabled), inputs have focus + error
- `EKjCC4PwjFo` · 8:32–9:27: a form field's three looks: default, focus, error
- + first-round page on states; I write: what their app shows during the 1–2 s server call (ties to A5)
💬

**C9 Motion and juice** (P2–P3)
- `YfsR96CgzkE` · 4:27–5:00: snappy beats slow
- `l-gMLFgJ1Ww` · 1:06–3:30: easing words (ease-in/out, bounce) = what to ask Gemini for
- + first-round page "Juice: making clicks feel good" (the 70-technique list, merged)
💬

**C10 Before / after gallery** (anytime)
- `YlN28RNChl0` uxpeak · 0:32–8:22 + 9:30–14:32: a sleep app and a bank transfer redesigned, junior → senior
- `wIuVvCuiJhU` "world's shortest UI/UX course", 7 min, one real project start to finish
💬

**C11 Icons and images** — `k9ZfioRgGMM` · 0:04–4:23: SVG beats PNG (1 KB, sharp, recolourable), check the licence 💬

**C12 ★ Design words for prompting Gemini** (P1 onward) — first-round page 4 (U4) + the vocabulary lists from all
UI videos. This is where the UI strand meets "the conversation is the skill".
💬

---

## D. UX: how it works (P1–P4)

**D1 ★ The whole process in one story** (P1)
- `ODpB9-MCa5s` Simplilearn · 0:00–7:19 — **Sam builds a homework app**: research → wireframe → look → structure →
  test. The best beginner explainer found (the same story sits inside the 23-hour marathon).
- alternatives: design thinking `-_lK35Wczfc` 1:22–7:27 · Uber's fixes `XhPQbUsD9c0` 0:37–3:19 · human-centred
  design `COTOz4XmhWU` 1:42–6:04 · design sprint (5 days → our weeks) `xbcZrENvGd8` 3:26–7:19
💬

**D2 Who is it for? (personas, 5 short interviews)** (P2, P4)
- `3PkwYR1xuGk` · 1:29–4:50: a persona in 4 parts
- `bAARmsv1tms` · 3:24–12:32: interview 5 people; open vs leading questions
- `kbZejnPXyLM` *(sampled)* · 15:41–24:09: persona + one task flow, and why you design one flow, not everything
💬

**D3 ★ Sketch it ugly first (wireframes)** (P1)
- `UU_eyUGWIEI` · whole (3 min): grey boxes first so feedback is about the flow, not the colours
- `qpH7-KFWZRI` · 2:41–11:26: a login screen sketched by hand, live
- `rLdpn0vHV-M` · 0:33–7:15: low / mid / high fidelity
- + first-round page "user flow diagrams"
💬

**D4 Where things live (information architecture)** — `OJLfjgVlwDo` · 0:34–11:34 (Amazon's menus, live) 💬

**D5 The named rules** (P2, reference)
- `n5UsQb6OnPU` · 1:03–8:12: 12 UX laws, each with an app (Fitts, Hick, Jakob, Miller…)
- `FZ1r5nlqpuc` Simplilearn *(sampled)* · 18:10–24:21: Nielsen's 10 heuristics, each with an app you know
- + first-round page "Nielsen's 10 heuristics"
💬

**D6 The words on screen (button text, errors)** (P2)
- `hsMLqUFtPbU` CareerFoundry *(sampled)* · 0:00–33:21: microcopy, the Hawaii missile alert, five 404 pages
- I write: Gemini's default error text is bad; how to ask for better.
💬

**D7 ★ Test it on a person** (P2 onward, every project)
- first-round page "test it before you ship it" (5 users, several rounds; the 2-minute classmate test)
- `MMa4AVdBCZY` · 0:36–3:53: positive / negative / break-it tests → I make a kid-size template
💬

**D8 Everyone can use it (accessibility)** (P2)
- first-round page (real `<button>`, tab through without a mouse, alt text, contrast)
- `2yVZjPbqs-4` inclusive design · 11:30–24:36: colour-blind mode in Trello, neutral icons (touches identity topics;
  you may want to frame it)
💬

**D9 The first 60 seconds (onboarding)** — first-round page 3 (U2) 💬

---

## E. Planning a project (P3 game, P4 final)

**E1 ★ Build the skateboard first (MVP)** (P3–P4)
- `MHqz8oNSraI` · 0:33–2:41: skateboard → bike → car, not a quarter of a car
- `AGWyx96lP8U` Tech With Tim · 0:32–9:17: goal → user stories → data → cut to MVP → paper sketch (skip sponsor 3:49–4:55)
- `b49qBJM8rTk` · 1:08–2:14: a 10-minute plan page before the first prompt
💬

**E2 ★ Scope creep** (P4)
- `pTtt4Ui1OA4` · whole (2 min)
- `tXXxfYHblXs` · 0:00–4:33: **gold plating**: adding a feature nobody asked for because you think it's better (the
  vibe-coder's disease)
- `QKrglAsEgY8` DesignCourse · 2:33–3:16: a design with extras nobody asked for gets rejected outright
- `VVS90RgEunw` · 5:15–9:48: stick to the goal, write down what's in and what's out
- `5nRuHDvPDb8` · 3:22–9:37: what the app does vs the work to build it
💬

**E3 Break it into pieces** (P4)
- `5MDr9iOMxcM` IIT · 4:20–13:57: divide and conquer, worked through planning an event
- `QLoYKsOP9Ig` · 1:39–7:02: a software project → phases → chunks → tasks
- `tpTQurUhX_M` · 14:31–16:19: a website project broken down (pages, database, server…)
- `rhoPX7q2lP4` IIT · 0:15–3:27: use the simplest planning tool that works (a list is often enough)
💬

**E4 Change early, it's cheap** — `Hr-arfbX37w` · 19:53–21:35: the cost-of-change curve; 0:15–2:12 stakeholders = your users 💬

**E5 What must it do vs how well** — `j4WITZFLkUM` · 1:30–8:31: what it does (functional) vs how well: fast,
reliable, easy (non-functional). Becomes two columns on the final-project plan card. 💬

**E-teacher:** project idea bank `zTElKDsC9Fw` (portfolio-flavoured but a good list).

---

## F. Working with Gemini and fixing bugs (P1 onward)

**F1 ★ Why Gemini makes things up** (P1)
- `u8tjByJtFrg` · 0:00–2:12: cat in the hat vs cat in the house (probability → hallucination); 3:49–4:21 what helps
- `LPZh9BOjkQs` 3Blue1Brown · 0:00–3:33: how an LLM picks the next word
💬

**F2 ★ Talk it through (rubber duck)** — `fdaqudiSo5c` · 56 seconds, whole. Pairs with the bug-report card. 💬

**F3 ★ Asking for help that gets answered** (P1)
- `mWl99g9El2A` · 2:45–7:45: smallest example that shows the bug, say what you tried (I retarget it at Gemini)
- `QlSJCCctsnw` · 1:06–3:46: the 6 parts of a bug report (the video is a ClickUp ad: I write our own card from it)
💬

**F4 Inspect the page (DevTools)** (P2)
- `H0XScE08hy8` Chrome · 1:05–6:39: breakpoints, stepping, one real bug start to finish
- `ZaOZFkHTloM` · 8:12–10:55: step / step into / step out
💬

**F5 Edge cases and "try to break it"** — `MYrKrJrDTSM` · 0:00–1:41 (only the first example) · `b49qBJM8rTk`
3:55–5:35 (test the real flow as you build) 💬

**F6 ★ Save points** (P1)
- `hwP7WQkmECE` Fireship "Git in 100 seconds": the idea of snapshots / branches
- `b49qBJM8rTk` · 5:35–7:13: the safety net when the AI changes more than you asked
- I write: our version = "Make a copy" of the Sheet + Apps Script version history (no git for kids).
- optional: `tRZGeaHPoaw` 0:00–17:52 (real git, for the curious)
💬

**F-teacher:** `vyWFS4DPpqA` 11:20–14:46 AI pitfalls (discussion starter) · `mQHiil7R2Wc` password hashing (why we
never store real passwords in a Sheet: one line on a page, not a lesson).

---

## G. Game design (P3)

Most of this already exists from the Minecraft research (93 game-mechanics videos, 12 character design, 8 scope/level
storytelling: `minecraft-course-research/notes/_batch_A…T2.md`). The next pass pulls the pages that fit an async
browser game. New from this round:

- **G1 Idle games: why they're fun** — `Lu-RjxeDpU8` GDC · 12:54–14:36 (the "welcome back" moment), 19:58–24:46
  (exponential growth + prestige, with the curve maths), 25:19–26:54 (make the pacing bumpy). **The closest match to
  the async-MMO frame.**
- **G2 Randomness that feels fair** — `dwI5b-wRLic` GMTK · 5:29–8:40 + 11:18–12:29 (pity timers, Tetris bag)
- **G3 Coins in, coins out (economy)** — `IqxVwvNEp68` · 0:02–3:17 faucets and sinks (strip the NFT talk)
- **G4 Turns as states** — `G1bd75R10m4` · 0:33–1:38 (the problem only; the Unity part is skipped)
- **G5 Juice, sprites, levels** — first-round pages (U4): juice, drawing sprites, level design without words
- **next pass**, pulled from the Minecraft notes: mechanic cards, cost/tell, playtest loop, character design sheet.
💬

---

## Pages with no good video (I write them)

- **Optimistic UI**: show the change now, save in the background, undo if the server says no (A5/C8)
- **Your data and privacy**: no real names or IDs in Gemini or in shared Sheets (Ministry rule)
- **Naming, pitching and shipping your project** (P4 final)
- **Moving to Netlify**: same backend, new front door (P4)
- **Hebrew on screen**: RTL, fonts, mixed English numbers (nothing in the pile covers it)
💬

---

## What I skipped, so you can overrule

- **Figma tutorials** (most of T01, the DesignCourse challenge halves, Ali Hassan's tool videos): tool clicking.
- **The four Simplilearn "UI/UX Full Course 2026" marathons**: two are word-for-word copies of each other; the useful
  10 minutes also exist as short videos. The other 22 in that playlist: not fetched.
- **SCALER / Gaurav Sen interview prep**: sharding, CAP, consistent hashing, Uber/Tinder system design.
- **SAP ABAP debugging** (27 videos): transaction codes and SAP GUI tricks; nothing transfers to a browser.
- **PMP / IIT project management**: exam jargon and civil-engineering scheduling maths; a handful of early lectures
  kept (E2–E3).
- **Hindi-language videos.**
💬
