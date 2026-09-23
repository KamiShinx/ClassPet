# Web-app course (14-15, Gemini + Sheets + Apps Script): everything, for your review

> **How to comment:** write under any `💬` line, or anywhere, starting the line with `BEN:`. Tell me when you're
> done and I'll answer every comment. Nothing here is final.
>
> Evidence behind every claim is in `research/`: notes per video, 19 batch summaries, the 2026 platform-facts
> check, and a two-round debate between five reviewers.

---

## Contents
1. What you asked, and what I did
2. The short answer
3. Things that change the plan (found during research)
4. What the research found
5. The debate
6. The course
7. The working method: surviving a forgetful Gemini
8. How you'll know a kid understands the backend
9. The hub
10. The final project
11. Tests before November (October)
12. Decisions for you
13. Limits of this research

---

## 1. What you asked, and what I did

**You asked:** a ~20-meeting course (Nov-May) where 14-15-year-olds vibe-code web apps with Gemini, Sheets and
Apps Script, frontend and backend. It should be fun and project-based, with several small projects and one big
final, and kids must actually learn what a backend is. You also asked for a hub to teach from (Apps Script only),
Teachable Machine for an "AI app", a Netlify final project, and a design that assumes a weak, forgetful Gemini.

**What I did:**
- **169 videos, about 45 hours:** your 4 playlists (143) plus 26 I added for the gaps: backend explainers,
  running PBL classes, teen-scale projects, real 2025-26 Gemini-to-Apps-Script workflows, and Teachable Machine.
  Each one transcribed and its frames looked at; 19 analyst batches wrote notes.
- **A platform-facts check** on 2026: Ministry accounts, Gemini tiers, Apps Script limits, CORS, Teachable Machine.
- Read your own apps as prior art: `GoolWidget/webstreak` and ClassPet.
- **A debate:** 5 reviewers (fun/PBL, backend understanding, classroom realist, AI-workflow engineer, hub
  designer), two rounds.

💬 Comments:

---

## 2. The short answer

- **Kids learn the backend by cheating each other's apps.** Every project runs the same loop: build it, a classmate
  attacks it, move what got attacked onto the server, they attack again. Quiz answers in the page? A classmate reads
  them in view-source. Score sent from the browser? A classmate sends 9999 through the address bar. The fix is always
  "the server decides", which is what a backend *is*. It's also fun, and it's PBL's critique-and-revise loop.
- **Every app has one entry point with two doors.** Its page calls the server the easy Apps Script way, and from
  week 2 the same entry point also answers plain web requests (`?action=` in the address bar → JSON). The page only
  talks through one small helper, so moving the frontend to Netlify in May changes one file, not the app.
- **The Sheet is the save point and the proof.** "File → Make a copy" of the project Sheet saves code and data in one
  click, and when Gemini wrecks the code, the data is still there. Kids check the row, never the "success!" message.
- **Plan 16 meetings of content and keep 4 as buffers.** Holidays, exams and lost setup time will take them.
- **The hub is the class's shared backend, not a website of lesson pages.** Kids use it before they can build
  anything, watch their own requests land in its Sheet, and cheat its naive leaderboard first.
- **Before any of this: one Ministry student account, tested in October.** Several things the whole plan needs are
  admin settings nobody can confirm from outside (section 3).

💬 Comments:

---

## 3. Things that change the plan (found during research)

1. **The kids' accounts are Ministry of Education Workspace accounts.** Gemini is Ministry-licensed for grades 7-12
   (independent use from grade 8), so 14-15 is covered. The model/tier isn't stated anywhere. **Unknown until
   tested:** is Apps Script enabled for students? Can they deploy web apps? Can an app be opened by "Anyone"
   (anonymous) or only "inside the Ministry domain"? That last one decides whether parents at a showcase, and a
   Netlify page, can reach a kid's app.
2. **Camera and microphone are blocked inside Apps Script pages** (sandboxed frame). During the year, Teachable
   Machine image models work on an **uploaded photo**; sound and live pose need the **Netlify final**. The only real
   AI-built app in your playlists (an attendance app, Rameez `k90Za3mjy20`) put its frontend on Netlify for exactly
   this reason.
3. **Teachable Machine's web library looks unmaintained** (last visible versions ≈2019-21). It needs a live test
   before any lesson depends on it.
4. **Gemini's Canvas writes one self-contained page** and won't split code into server (`Code.gs`) and page
   (`Index.html`) unless asked. Its preview can't run Apps Script. "Ask for the page, then ask separately for the
   matching server code" is a lesson step in its own right, and a backend lesson.
5. **Gemini now has a side panel inside the Apps Script editor** (2026, beta) that edits the files and reads real
   errors. It needs a paid tier; check whether Ministry accounts have it. If yes, it beats copy-paste.
6. **Google Antigravity is 18+ and personal-accounts-only.** Not relevant here (you chose the Gemini web app), but
   it breaks the Minecraft course's plan. That's flagged separately in its own REVIEW.md.
7. **Your ClassPet already has the final project's exact shape:** `common.js` calls an Apps Script backend with
   `fetch` POST, `text/plain`, a JSON body. `backend/Code.gs` locks every write. It ran from your own account, not a
   Ministry one.

💬 Comments:

---

## 4. What the research found

**Your playlists, honestly:**
| Source | Verdict |
|---|---|
| Learn Google Sheets web-app series (14) | One honest live build from 2019. Parts 1, 2, 4, 5, 8 (router from a plain object), 10 (client vs server validation), 14 (trace one request end to end) are strong. The Materialize CSS parts are dead weight. |
| Laurence Svekis (73) | About a third is real web-app/API material: `doGet`/`doPost`, JSON endpoints, a separate page calling the backend with `fetch`, deploy walkthroughs. The rest is Docs/Forms/Drive/email automation, off-topic. His 2-hour quiz build is ~15% concepts. |
| Mohammad Rameez Imdad (56) | Mostly sales demos of adult business software. Titles naming Gemini, Claude, ChatGPT or Antigravity almost never show an AI build (8 of 10 in one batch show none). Two real exceptions: a POS built with Claude Code (one-shot, zero errors) and the Netlify attendance app (real bug-and-fix cycle). Useful for architecture patterns seen in the UI and for deploy-screen screenshots. |

**The strongest findings:**
- **The #1 trap in the whole corpus:** "I edited it but nothing changed". The `/exec` address serves the last
  deployed version; `/dev` serves the latest code. Reframed for the class: `/exec` = last save, `/dev` = work in
  progress.
- **Silent failures:** a misspelled server function, a wrong callback, a `Date` in a reply → nothing happens, no
  error. "Nothing happened" becomes a named debugging situation.
- **Why a backend exists, in teen terms:** page code is public (view-source), server code isn't. Checks in the
  browser stop honest mistakes, not cheaters.
- **The best zero-code API demo:** type `?name=Dana` onto a deployed address and see raw JSON come back.
- **The best explainer to show:** Tamara Jost, 5 minutes, one example (booking an Airbnb) through
  page → API → server → database and back.
- **Gaps no video covers,** filled by our own design: two users writing at once (the lock), CORS in practice, modern
  POST handling, quotas.

**Project seeds that recur, teen-scale:** quiz with server-side answers + scoreboard · class poll/vote · leaderboard
(a table plus a sort) · guestbook with delete-your-own · class shout board · ticket queue with a status pipeline ·
class points bank as an append-only ledger ("+5, won the quiz") · two linked tabs (members + teams) · RSVP with
confirmation email · Teachable Machine photo classifier logging to a Sheet · gesture buzzer / voice game on Netlify.

💬 Comments:

---

## 5. The debate

| Seat | Argued | Moved to |
|---|---|---|
| **Fun** | Build → classmate attacks → move it to the server → re-attack; showcases; a 2-player game block | Dropped the game block to an option; accepted 16 meetings and bronze floors |
| **Backend** | One router, two doors; every concept shown by breaking something; assess what Gemini can't do | Dropped the "passport" for orals + exit questions; accepted the Sheet-copy save |
| **Realist** | Plan 16 not 20; bronze in one meeting; 2 files; October account test | Accepted the router + helper, peer attacks, weekly cold tests |
| **Engineer** | Frozen starter files; one function per ask; `selfTest()`; `/exec` = last save | Cut 8 files to 4; accepted the Sheet copy as the real undo |
| **Hub** | The hub as the first backend kids use and read | Cut to a small v1, no XP; card lives in the kid's own Sheet |

**All five ended up agreeing on:**
- The attack loop in every project.
- One entry point with two doors, and one page helper.
- The Sheet copy as the save point.
- A project card pasted into every new Gemini chat.
- Check the row, not the "success" message.
- Plan 16 meetings and keep 4 as buffers.
- A small hub that doubles as the class backend.
- Judge understanding by what kids do without Gemini.
- Test one Ministry account in October.
- Turn-based games only; no real-time multiplayer.

**What they didn't agree on** → section 12.

💬 Comments:

---

## 6. The course

**16 content meetings + 4 buffers.** Buffers float to wherever a holiday or exam lands (Hanukkah, Purim, Pesach).
Every project has a **bronze** level a kid can reach in one meeting, so a kid who missed two still ships.

| Meetings | Block | Project | The attack | The backend idea it forces |
|---|---|---|---|---|
| 1-3 | **A. It lives on a server** | Use the hub (your row appears in its Sheet; `?action=` returns JSON). Copy the starter, deploy, **"Hello row"**. Then a **Shout Wall** | "Post as someone else" | page → server → Sheet → page; `/dev` vs `/exec`; the router traced by hand; statelessness (a counter that always comes back 1); **the nuke drill** (M2) |
| 4-6 | **B. The server decides** | **Rigged Quiz** on their own obsession + scoreboard | **Heist day:** get a perfect score on a classmate's quiz, any way you can | answers and scoring move to the server; checks in the browser stop mistakes, not cheaters; GET vs POST |
| 7-8 | **C. Many users** | **Class poll** or **points bank** (append-only ledger), two linked tabs | Everyone clicks at once | the count comes out short → the lock; ids linking two tabs |
| 9-10 | **D. The AI app** | **Teachable Machine photo judge:** upload a photo, the model labels it, the server **decides** something (a tally, a streak, a badge), not just logs it | "Fool your friend's AI" | the model is a file at a URL; a classifier always answers, so train a "nothing" class |
| **10** | **Showcase 1: Arcade** | Another group plays everything | | |
| 11-12 | **E. The other door** | A plain page on **Netlify** calls their own app's JSON | | a separate frontend calling a backend: CORS, the `text/plain` trick, the redirect. It rehearses May in February. |
| 13-19 | **F. Final** | Section 10 | Attack day at 18 | all of it |
| **19** | **Showcase 2: Demo Night** | Families play | | |
| 20 | reserve | | | |

**A typical meeting (90 on paper, ~70 real):**
| Min | What |
|---|---|
| 0-10 | Log in, open three tabs: project Sheet, hub "Today", a fresh Gemini chat. Does last week's `/exec` still work? |
| 10-20 | **Break-it moment:** one concept shown by cheating or breaking something live, then named in one sentence. "לשם מה?" |
| 20-25 | Update the card: today's ask + 2-3 claims ("in the Sheet you'll see ___") |
| 25-60 | **Build loop** (section 7). Help order: card → neighbour → "Gemini broke it" wall → Ben |
| 60-70 | **Cold test + attack:** a classmate uses the app with no explanation and tries one cheat |
| 70-80 | Exit question in the hub; one "Gemini broke it" line; save a copy |
| 80-90 | Slack. It will be used. |

**Homework never needs code:** collect photos for a Teachable Machine model, play a classmate's app and file a bug,
answer a predict question.

**The Ministry pedagogy you sent for the Minecraft course applies here too:** each block written as a unit with
"התלמיד ידע ל..." objectives, practical + theory assessment, ~75% doing, a "לשם מה?" opener, trace tables, unplugged
moments (kids acting out browser / server / Sheet with paper requests). I'll write the blocks in that template once
the shape is approved.

💬 Comments:

---

## 7. The working method: surviving a forgetful Gemini

**The starter project** (a copy of one template Sheet with the script bound to it):
| File | Who owns it | What's in it |
|---|---|---|
| `Code.gs` | the kid | their actions (`getQuestions`, `checkAnswer`...), one function each |
| `Index.html` | the kid | their page |
| `Server.gs` | frozen (kids read it in M2) | the ~15-line router with its list of allowed actions, `doGet`/`doPost`, the locked write helper, `selfTest()` |
| `Client.html` | frozen | `call(action, data)`: the one door, which also prints every request and reply on the page |

Plus a **CARD tab** in the Sheet: the app in one sentence, tabs and columns, the action names and what each returns,
the do-not-touch list, the last good save.

**The paste loop** (on the wall and in the hub):
1. **New chat per task.** The hub's **"Copy for Gemini"** button puts the card + house rules at the top.
2. **Ask for one thing.** Say which file. For a short file, the whole file is fine.
3. **Before pasting, tick the card's function names** in Gemini's reply. One missing → don't paste.
4. **Paste → run `selfTest()` → look at the row in the Sheet.** `selfTest` also catches a second `doGet`, the silent
   bug recorded in your own webstreak header.
5. **Green → File → Make a copy** ("SAVE 4 quiz works - DON'T EDIT").

**Reject a reply on sight** if it has a second `function doGet`, renames an action, adds a framework or
`<script src>` you didn't ask for, or rewrites a frozen file.

**"Gemini nuked my project"** (drilled in M2 on a deliberately wrecked copy): stop, don't ask Gemini to fix it →
Ctrl+Z → else copy the two files back from the last SAVE → new chat with the card and one small ask → log it on the
"Gemini broke it" wall, which gets a weekly award.

**Also:** buttons show "working..." (calls take 3-5 s); the server creates its own missing tabs on first run; no real
names or IDs typed into Gemini (Ministry privacy rule); answers and scores never in the page.

💬 Comments:

---

## 8. How you'll know a kid understands the backend

Not from the app, since Gemini built it. From what the kid does:
1. **Exit question every meeting** in the hub ("which function wrote your row?"). You read 15 lines, not 15 codebases.
2. **Predict the JSON** before opening `?action=...`.
3. **Defend the fix:** after a failed heist, the owner shows the attacker the server line that stopped them.
4. **Break-it drill:** you rename one server function; the kid finds it without Gemini for the first 10 minutes.
5. **2-minute oral, laptop closed**, rotating 4-5 kids per meeting: point at a button, draw the boxes and arrows.
   At each showcase, every kid does it for a stranger.

💬 Comments:

---

## 9. The hub

**One Apps Script project + its own Sheet, built by you in October with AI help, reusing ClassPet's router, lock and
data helpers and webstreak's page + JSON API.** You manage it by editing its Sheet (the `Meetings` tab is the lesson
plan: one row per meeting); no admin screens.

**v1 screens:** Today (the mission, 3 tips, the traps checklist, starter copy link) · Submit your link + exit
question · Gallery (everyone's live app; "play" and "report bug"; cold-test pairing) · Help queue · "Gemini broke it"
wall · Copy for Gemini · a teacher view (who's working / stuck / behind).

**As the class backend:** public read actions (`?action=today|gallery|leaderboard`), a deliberately naive score
endpoint that kids cheat in block B and you fix in front of them, and a **request log** on the projector: every call
through either door appends a row live, so a kid watches their own request land and the heist shows up as it
happens. Kids get read access to its code: "a backend a person wrote".

**Identity:** nickname + class PIN by default (Ministry privacy rule). Rules: no XP farming, no edits on meeting days
(you model the `/dev` habit), polling no faster than every 10 s.

💬 Comments:

---

## 10. The final project

**Pairs** (they survive an absence; both do the oral). Pick a shape: a game with scores, a quiz, a poll, a queue, a
tracker, a classifier. **Written as a contract before any code** (M13): 3-4 actions, at most 2 tabs, one input the
server refuses. Must include Teachable Machine.

| Level | What it is |
|---|---|
| **Bronze** (every pair) | Deployed Apps Script app on its own Sheet, the card, a paper diagram of its loop, the 2-minute trace. Teachable Machine on uploaded photos. |
| **Silver** | Frontend on **Netlify** calling its own backend's JSON (only the `Client` helper changes). |
| **Gold** | Live camera or mic Teachable Machine on Netlify, or a turn-based 2-player game, or an admin role checked by the server. |

Timeline: M13 pitch + contract · M14-15 backend first, tested from the address bar and `selfTest` · M15 bronze
checkpoint · M16-17 frontend, Netlify, live AI · M18 attack day + critique gallery · M19 Demo Night.

💬 Comments:

---

## 11. Tests before November (October)

On **one real student account, on the room's own laptops and Wi-Fi**. Each has a fallback decided now.

| # | Test | If it fails |
|---|---|---|
| 1 | Gemini: which model, is Canvas there, is chat history kept? | The card is the only memory (planned anyway) |
| 2 | Apps Script: create a Sheet-bound script, save, run, write a row. Permission screen shows a warning or "blocked"? | Blocked = no course until IT enables it for the class |
| 3 | Deploy a web app: which "Who has access" options exist? | No "Anyone" → showcases on signed-in laptops; Netlify becomes a demo on your backend only |
| 4 | Open the app from a 2nd student account, a logged-out window, a personal Gmail | Tells us who can use kids' apps |
| 5 | A student shares their Sheet with you | If blocked and you're on personal Gmail, you can't see any kid's project: you need a Ministry account |
| 6 | Gemini icon inside the Apps Script editor? | If present, use it instead of copy-paste |
| 7 | Camera in a deployed page (`getUserMedia`) | Expected blocked → photo upload all year |
| 8 | A Netlify page sends a POST to a student's `/exec` and gets JSON back | Login page instead → Netlify is silver/gold only, on your backend |
| 9 | Teachable Machine: train, export, classify an uploaded photo inside an Apps Script page | Library broken → Teachable Machine moves to Netlify only |
| 10 | DevTools open on the school laptops? | Blocked → all heists go through the address bar (planned that way) |
| — | 15 kids on Gemini at once (in M1) | Pairs share a chat |

💬 Comments:

---

## 12. Decisions for you

1. **Netlify in the final: for everyone, or a silver level?**
   Engineer + fun: everyone, it's the point of the year. Realist: silver, because it rests on untested admin
   settings.
   *My pick: everyone aims for Netlify if tests 3 + 8 pass; bronze (Apps Script only) is the floor for any pair that
   can't get there.*
   💬
2. **Live-camera Teachable Machine: for everyone, or gold?**
   *My pick: gold. Photo upload is required; live camera is the showpiece for pairs who reach it. It depends on the
   stale library and test 8.*
   💬
3. **Solo, pairs, or teams of 3 for the final?**
   *My pick: pairs.*
   💬
4. **A 2-player turn-based game block (4 meetings) in the middle of the year?** Fun wanted it; realist and engineer
   say it's where weaker kids quit.
   *My pick: no block; it's a gold option in the final.*
   💬
5. **Starter files: 2 or 4?** Backend + fun: just `Code.gs` + `Index.html`, router visible and traced by hand.
   Engineer + realist: add frozen `Server.gs` + `Client.html` so Gemini can't wreck the plumbing.
   *My pick: 4, with kids reading the two frozen files in M2 so they aren't magic.*
   💬
6. **Your own account:** do you have a Ministry teacher account to deploy the hub from and see kids' Sheets?
   💬

---

## 13. Limits of this research

- The Rameez playlists (a third of the videos) were mostly sales demos; their value is small and stated as such.
- The Ministry facts are what's public. Every admin setting that matters is unverified until test day.
- Several technical claims are the reviewers' own 2026 knowledge, labelled in the debate files: `Date` values
  silently failing through `google.script.run`, `text/plain` avoiding a CORS preflight, DevTools blocked on managed
  laptops. They're on the test list or in the starter's `selfTest`.
- Whatever 14-year-olds actually do is a prediction until meeting 1.
- Transcripts: YouTube captions for most, Whisper for the rest. Videos will be deleted after your review; transcripts
  and key frames are kept.

💬 Comments:
