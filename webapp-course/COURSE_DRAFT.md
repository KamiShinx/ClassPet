# The course, draft 1 (web apps & games with Gemini)

> **How to comment:** reply in chat with the meeting number or section and your comment, e.g. "M6: swap with M7".
> Nothing is final. This is the course only; the hub gets built from it afterwards.

**The frame:** 10-15 kids, 14-15, ~20 real meetings (Nov-May, 90 min), Ministry Google accounts, Gemini web +
Apps Script + one Sheet per project.
**Two layers:**
- **In class:** the core only. Every meeting builds one thing, step by step, spoon-fed.
- **Library (homework):** deep, optional pages you assign. Never needed for the next meeting.

**The spine of every meeting: design → describe → talk → check.** Kids never type "תבנה לי את זה" or "זה לא עובד":
1. Every build starts from a **design card**. The filled card *is* the prompt.
2. Gemini is a **conversation**: "ask me 5 questions first", "give me 3 options", "change only X".
3. Every problem is a **bug report**: what I did, what I expected, what happened, the error or a screenshot.
4. Every build is **checked** by looking at the row in the Sheet, then **saved** (File → Make a copy).

---

## Phase 1: Apps (M1-M4)
*Goal: kids get what a backend is by building apps whose whole point is their data.*

| M | In class, they build… | The backend idea | Library homework after it |
|---|---|---|---|
| **1** | **"Hello, internet."** Join the hub, copy the starter, have their first real Gemini conversation, deploy. Their page writes their name into their Sheet, and a classmate opens it on their own laptop. | a page, a server, a database; the app lives on the internet | *What is a backend?* (Tamara Jost's 5-min video + our page) · *Talking to Gemini 101* · *The Apps Script editor, a tour* |
| **2** | **"My collection."** An app for something they collect or like (sneakers, cards, games, songs): add, list, delete. First **nuke drill**: Gemini wrecks it, they restore the save. | save and read data; the Sheet as a table | *Vague vs specific: 10 prompts side by side* · *The bug report* · *Save points and undo* |
| **3** | **"Two tabs."** A manager for something with two linked kinds of things (their football team: players + matches; a playlist: songs + artists). | linking tables with an id; filtering and searching | *Designing your data (tables, rows, ids)* · *Reading an error message* |
| **4** | **"Everyone writes."** A class app many people use at once: poll, marketplace, or event signup. The whole class clicks at once and the count comes out wrong, then they add the lock. | many users, one database; the lock; `/dev` vs `/exec` | *What happens when 15 people click at once* · *Deploying and versions* |

---

## Phase 2: Games (M5-M11)
*Goal: game design and character design, learned by building. Each meeting opens with ~20 minutes of design (the
card), then they build it. Each kid builds their own browser game that grows every week into a small
**browser-MMO**: many players, a persistent world in the Sheet, no real-time.*

| M | Design first (~20 min) | Then they build… | The backend idea | Library homework |
|---|---|---|---|---|
| **5** | **What makes it fun:** the core loop, one verb, "what does the player do again and again?" | A **clicker/idle core**: click, earn, the score saves to their Sheet and survives a refresh | game state lives on the server | *Game design 1: loops and verbs* · *10 great one-button games* |
| **6** | **Character design:** silhouette, shape language (round/square/triangle), 2-4 colours, one trait, Who/Want/Why | **Their character** (drawn, pixel art, or Gemini-drawn SVG from their card) with stats stored as a row | a player = a row: stats, level, inventory | *Character design: silhouette, shapes, colours* · *Design a character nobody's seen* |
| **7** | **Costs and choices:** every upgrade has a cost; risk and reward rise together; "what is it worse at?" | An **upgrade shop and inventory** | inventory as rows; the server checks you can afford it | *Game design 2: costs, risk and reward* · *Why "best at everything" kills a game* |
| **8** | **Time and rhythm:** things that grow while you're away; daily quests; "come back tomorrow" | **Idle growth** worked out on login + **daily quests** | timestamps; the server works out what happened while you were gone | *Game design 3: pacing and rewards* · *How idle games hook you (and when it's evil)* |
| **9** | **Enemies and bosses:** one tell before the attack; "what must the player do differently?"; phases | A **boss or event** in their world (turn-based fight, a timed event) | server-side rules; turn state | *Game design 4: enemies and bosses* · *Boss phases: keep the old, add one* |
| **10** | **Other players:** why other people make it fun; trading, guilds, "beat my score" | **Multiplayer:** classmates log in with a nickname and play; a world leaderboard; trading between players | many players in one world; who's asking | *Game design 5: multiplayer without real-time* · *Ghost races and async play* |
| **11** | **Playtest day:** predict what the tester will do, watch silently, change one number | **Balance pass** + mini showcase: the class plays everyone's worlds | reading real data to tune a game | *How to playtest* · *Numbers that make games fun* |

---

## Phase 3: Teachable Machine (M12-M13)
*Goal: an "AI app". Inside Apps Script the camera is blocked, so it works on uploaded photos.*

| M | In class | Library homework |
|---|---|---|
| **12** | Train a model (image), export it, a page where you upload a photo and it's labelled; the label saves to the Sheet. "A classifier always answers, so train a 'nothing' class." | *How a model learns from 30 photos* · *Sound and pose models (for the final)* |
| **13** | **Add it to their game or an app:** a photo-powered item, a "what's this" sorter, a mood-check-in | *Ideas: 20 things to build with Teachable Machine* |

---

## Phase 4: Final project (M14-M19, M20 reserve)
*Their choice, pairs: **a game** (extend their world, or a new one) or **an app** for something real (their team,
a school event, a class marketplace, a study group). Same backend either way. Teachable Machine included.*

| M | What happens |
|---|---|
| **14** | Pitch + design doc: the idea in one sentence, the cards (game or app), the Sheet tabs, the features in order |
| **15-17** | Build, week after week, one feature per meeting, each checked and saved. Checkpoint at 16: the core works |
| **17** | *Optional:* move the page to **Netlify** for live camera or mic (Teachable Machine live), if the October tests allow it |
| **18** | Playtest/user-test by classmates, fix, polish |
| **19** | **Demo Night:** families and friends use it; each kid explains how their app works in 2 minutes |
| **20** | Reserve (a holiday will eat one) |

---

## The library, in one list
Everything "too much for 90 minutes" lives here, assigned as homework.
- **Talking to AI:** Gemini 101 · vague vs specific · "ask me questions first" · the bug report · when to start a
  fresh chat · real example conversations, annotated.
- **Backend:** what a backend is · tables/rows/ids · many users and the lock · deploying and versions · reading errors ·
  (bonus) how the internet actually works (HTTP, URLs).
- **Game design:** loops and verbs · costs and risk/reward · pacing and rewards · enemies and bosses · multiplayer
  without real-time · playtesting · balancing numbers · 100-mechanics inspiration deck.
- **Character design:** silhouette · shape language · colour palettes · one strong trait · Who/Want/Why · from card to
  sprite.
- **Teachable Machine:** training · exporting · image vs sound vs pose · ideas.
- **Traps:** the Apps Script trap list (nothing changed after my edit, nothing happens and no error, the permission
  screen, `Index.html.html`, two `doGet`s).

---

## Open questions for you
1. **Phase 1 apps:** are "my collection", "two tabs" and "class poll/marketplace" the right kind of thing, or do you
   want one bigger app built over the 4 meetings?
2. **Phase 2:** each kid builds their **own** browser-MMO world (my draft), or the whole class builds features for
   **one shared** world?
3. **Final:** pairs or solo?
4. Anything you'd cut to make room?
