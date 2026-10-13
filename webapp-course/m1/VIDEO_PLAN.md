# Meeting 1 and the video research: what to change (proposals, 13 Oct)

**BUILT 13 Oct (Ben: "can you make the changes?"):** everything in Parts 1–3 is now in `hub/Index.html`, plus the
bugs from the test. Tested locally at 1366×768 and 1920×1080 (`test-shots/after-changes/`). Not yet live: Ben pastes
the new `Index.html` into the hub script and publishes a new version. Part 4 (meetings 2–4) is still a plan.

Meeting 1 (the hub's 12 steps and 7 slides) was written without the video research. This file goes through it step
by step and slide by slide and says where the research teaches it better. Nothing in the hub was changed.
Write under any 💬 (or start a line with `BEN:`), say "done", and the approved ones get built.

**Where the material comes from:** the library triage (`research/library/T01–T18.json`, 385 videos judged), the
Apps Script research (`research/notes/_batch_A1, A2, G1, G2, U2, U4`), and the Minecraft course's character-design
notes (`minecraft-course/research/notes/_batch_A, B, C`).

**Three honest limits:**
- Timestamps are from our transcript notes. I did not re-watch the clips today. Check each one once before class.
- Everything is in English except code.org's Internet series, which has real Hebrew captions. So in class the
  Hebrew slide carries the idea and a clip is at most 1–2 minutes.
- The Apps Script series (Learn Google Sheets, 2019) shows the old editor. Its ideas and traps are right; its
  screens are not what the kids will see. Never show it as "click here".

---

## The five changes I'd make first

1. **Move "חבר מאכיל" (step 11) to right after "הגיליון הוא הזיכרון" (step 8).** A friend feeding your pet from another
   computer is the moment the backend makes sense. Today it sits behind the drawing and "new version", the two most
   fragile steps. A kid who gets stuck there never reaches it.
2. **Teach two links, not "new version" as a chore.** The most repeated trap in the whole research (6 batches) is "I
   changed it and nothing happened". The fix the videos give: a working link that always shows the newest code
   (ends in `/dev`), and the friends' link (`/exec`) that only changes when you publish a new version.
3. **Open "where does the pet live?" with 100 seconds of code.org** (Hebrew captions): a browser asks a server, and a
   form sends information to it. Then your Sheet filling up is the proof.
4. **Give the design card the three things every character-design video agrees on:** a clear shape, 2–3 colours, one
   special thing. Round shapes read as cute, sharp ones as dangerous. Gemini's drawing gets better and more "theirs".
5. **One habit sentence from the Gemini-workflow videos: "לא מאמינים למסך. בודקים בגיליון."** Every working Gemini +
   Apps Script build in the research checks the real row, not the success message. Say it in step 8, repeat it all year.

💬

---

## Part 1: the slides

### Slide 2, "תאכילו את החיה שלי"
No video. Two things from today's test instead (see the test report): the demo pet is at 100/100, so feeding it
changes nothing on screen; and one click took 19 seconds. Before class, set `full` and `joy` to about 20 in the demo
Sheet, and tell the kids "one click each, then wait".
💬

### Slide 3, "רגע. איפה החיה גרה?"
**Add a clip before the Sheet reveal:** code.org, "The Internet: HTTP & HTML", `kBXQZMmiA4s`, Hebrew captions on.
- **1:15–2:26** (71 s): your computer talks to another computer far away, called a server, and asks it for a page.
- **3:05–3:38** (33 s): when you fill something in and send it, the browser sends that information to the server.

Then the slide as it is, and your Sheet's `log` tab filling up live.
The link to say out loud: "opening the pet's link is the first clip. Pressing להאכיל is the second."
Don't say doGet or doPost in meeting 1. The pet's buttons use a different mechanism; the idea is the same, the
names would be wrong.
💬

### Slide 4, "דף · שרת · גיליון"
**One picture from the research, in Hebrew, no clip:** the restaurant. Three explainers use it (`j_uf3eJtLkw`
0:00–2:22 is the cleanest, `s7wmiS2mSXY` and `1mXrxc_sv1o` 0:00–0:32 are the same idea).
- הדף הוא הלקוח. השרת הוא המלצר. הגיליון הוא המטבח.
- לקוח לא נכנס למטבח. הוא מבקש מהמלצר.

That last line is the real point of a backend, and it comes from Dr. Soper's database course (`RA9ZGgtlDzE`
3:42–9:22): only one layer is allowed to touch the data. Add it to the notes as a question for the kids: "מי כתב
עכשיו בגיליון שלי, אתם או השרת?"

**And build the three boxes one at a time** instead of showing all three at once. The best explainer in the research
(Tamara Jost, `NzEYYemQ3_8` 1:10–2:30) does exactly this: one box, then an arrow, then the next. On our slide that
is three key presses.
💬

### Slide 5, "ג׳מיני: מדברים, לא מפקדים"
The slide is right. Two additions to the notes, no clip in class:
- **Why "תעשה לי חיה" gives a generic pet:** Gemini fills every gap with the most common answer
  (`u8tjByJtFrg` 0:00–2:12, the clearest short explanation we have). One sentence: "מה שלא אמרתם לו, הוא מנחש."
- **The card is the plan.** A vibe-coding video in the triage (`b49qBJM8rTk` 1:08–2:14) calls it "ten minutes of
  planning before the first prompt". That is step 3. Say that this is what people who build with AI for a living do.
💬

### Slide 6, "היום אתם"
Change the list to the new order (see Part 2): card and Gemini asks → copy → wake the server, go live → **a friend
feeds** → drawing from Gemini → your two links.
In the notes, replace "the hardest are permissions and new version" with what the research says to watch for:
1. The Run button is grey: the project isn't saved yet (`mWHbwA_l_FM` 4:24, caught on camera).
2. Google asks for permission the first time anything runs (`E0mrZwl1Kow`, `gi_xlZ5K9rs`: every new permission needs
   one manual run).
3. "I changed it and nothing happened": wrong link, or no new version (`RRQvySxaCW0` 6:06–11:11).
💬

---

## Part 2: the 12 steps

### New order
| Now | Proposed |
|---|---|
| 8 הגיליון הוא הזיכרון | 8 הגיליון הוא הזיכרון |
| 9 ציור מג׳מיני | **9 חבר מאכיל** |
| 10 גרסה חדשה | 10 ציור מג׳מיני |
| 11 חבר מאכיל | **11 שני קישורים: שלי ושל החברים** |
| 12 שומרים ומסיימים | 12 שומרים ומסיימים |

Why: with 60 minutes of solo work, steps 5–7 (copy, permissions, deploy) will eat most of it for some kids. In the
new order everyone who gets the site up also gets the payoff. The drawing becomes what the fast kids do with the
rest of the time, and nobody leaves without "a friend fed my pet".
💬

### Step 3, כרטיס החיה
All twelve character-design videos in the Minecraft research agree on the same three rules (silhouette first, a
small palette, one dominant trait: `_batch_A`, `_batch_B`, `_batch_C`). Three of them add shape language: round
reads as soft, square as solid, sharp as dangerous (`8wm9ti-gzLM`, `nkoJTc_WzFI`, `4iw8XLusQ7s` 9:22–12:40).

Split the one "איך היא נראית?" question into three, and add one:
- **מה הצורה שלה?** `למשל: עגולה כמו כדור` · hint: צורות עגולות נראות חמודות. צורות מחודדות נראות מסוכנות.
- **שניים או שלושה צבעים** `למשל: סגול, צהוב`
- **דבר אחד מיוחד** `למשל: קרן אחת` (the card already hints "דבר אחד מיוחד מספיק"; make it the field)
- **מה היא הכי רוצה?** `למשל: שלא יפסיקו לשחק איתה` (from the "who / wants / why" card in `nkoJTc_WzFI`; it sets up
  meeting 2's moods: a pet that wants something can be unhappy about it)

And in the drawing prompt (now step 10), add two lines: "רק 2–3 צבעים" and "צורה פשוטה וברורה, שמזהים גם כשהיא קטנה".
💬

### Step 4, ג׳מיני שואל אתכם
Keep. One line to add to the note, from the Gemini-workflow batch (`_batch_G2`): Gemini only knows what is written
in this chat. "ג׳מיני לא מכיר את החיה שלכם. הוא יודע רק מה שכתבתם לו בצ׳אט הזה."
(Small bug found in the test: in the copied message the fifth card line comes out as "מה האופי שלה עצלנית..." with
no question mark. See the test report.)
💬

### Step 6, מעירים את השרת
The research explains the permission screen better than "Google asks if it's allowed". Proposed wording:
- **Why it asks:** "השרת שלכם רוצה לכתוב בגיליון שלכם. Google שואלת פעם אחת: אתם מרשים לו?"
- **"If it appears"**, not "it will appear": on a school account the "not verified" screen may not show at all for
  the kid's own script. Wording: "אם Google כותבת שהאפליקציה לא אומתה: זה בסדר, זו האפליקציה שלכם."
- **Add to נתקעתי:** "הכפתור הפעלה אפור" → "שומרים קודם: Ctrl + S." (`mWHbwA_l_FM` 4:24)

This step is also the longest on screen: at 1366×768 it is almost two screens of three stacked drawings. Consider
showing one drawing per sub-step.
💬

### Step 7, מעלים לאוויר
Keep the steps. Change the last line of "מה אמור לקרות" to start the habit:
"לוחצים להאכיל, והפס עולה. **עוד לא מאמינים למסך:** בשלב הבא בודקים בגיליון."
Source: every working build in `_batch_G2` (`5iCcbsaRebA`, `mWHbwA_l_FM`, `6XC-vN0Ox2k`) ends by checking the real
side effect, never the success message.
💬

### Step 8, הגיליון הוא הזיכרון
Add one sentence to "מה אמור לקרות": "לא מאמינים למסך. בודקים בגיליון." It becomes the course's habit sentence.

Add a second small experiment, because it shows who is in charge. It works with today's starter:
"בגיליון, ליד `full`, כותבים 5. מרעננים את האתר. מה החיה אומרת?" (She says she's hungry.) The page didn't decide that.
The Sheet did.
💬

### New step 9, חבר מאכיל
As written, moved up. One line from the code.org clip to tie it together: "החבר שלכם פתח את הקישור: המחשב שלו ביקש
מהשרת שלכם את הדף. הוא לחץ להאכיל: המחשב שלו שלח לשרת שלכם בקשה."
If sending the link by school mail or chat is blocked on the student accounts, the fallback is the neighbour typing
it, which is painful. Test this on the student account.
💬

### New step 10, ציור מג׳מיני
Keep pasting only between `PET START` and `PET END`. Say why, in the note. The Gemini-workflow videos show the
failure this prevents: pasting a whole new file from Gemini silently deletes working code (`_batch_G2`), and one
presenter protects his code with comments that mark what Gemini must not touch (`6XC-vN0Ox2k` 12:05).
Wording: "מחליפים רק את מה שבין שני הסימנים. כל השאר הוא החיבור לשרת, ואם הוא נמחק, החיה מפסיקה לעבוד."
💬

### New step 11, שני קישורים: שלי ושל החברים (replaces "גרסה חדשה")
The research's number one trap, in six batches: you edit, refresh, nothing changes
(`RRQvySxaCW0` 6:06–11:11 shows it happening and the fix). The fix is two addresses:
- **הקישור שלי** (ends in `/dev`): Deploy → Test deployments. Always shows the newest saved code. Only the owner can
  open it. This is where a kid looks while working.
- **הקישור של החברים** (ends in `/exec`): changes only when you publish a new version.

Kid wording:
"יש לכם שני קישורים. **שלי**: מראה כל שינוי, מיד אחרי Ctrl + S. **של החברים**: מתעדכן רק כשמעלים גרסה חדשה. ככה חברים
לא רואים את החיה שלכם באמצע העבודה."
Then the same three clicks for a new version as today.
This turns "new version" from a chore they forget into a choice: show friends when it's ready. In meetings 2–4 they
change code every few minutes, and without the working link every change costs five clicks.
Check on a student account that "Test deployments" is there.
💬

### Step 12, שומרים ומסיימים
Keep. It matches the research: a saved copy before the AI changes things is the safety net (`b49qBJM8rTk` 5:35–7:13,
`hwP7WQkmECE`).
💬

---

## Part 3: meeting 1's homework page (optional, never needed for meeting 2)

**שם הדף: איפה החיה שלי גרה?**

**The Hebrew text (outline, about 150 words when written):**
1. החיה שלכם לא גרה במחשב שלכם. היא גרה במחשב של Google, שנקרא שרת. בגלל זה חבר יכול לבקר אותה גם כשהמחשב שלכם כבוי.
2. כשמישהו פותח את הקישור, המחשב שלו מבקש מהשרת את הדף. כשהוא לוחץ להאכיל, המחשב שלו שולח לשרת בקשה.
3. השרת הוא היחיד שנוגע בגיליון. הדף רק מבקש. כמו במסעדה: הלקוח לא נכנס למטבח.
4. הגיליון הוא הזיכרון. מה שכתוב בו נכון, גם אם הדף מראה משהו אחר.
5. לכל אפליקציה שאתם מכירים יש את אותם שלושה חלקים: דף, שרת, זיכרון.

**Clips (5 minutes in total):**
- `kBXQZMmiA4s` code.org HTTP & HTML · 1:15–3:38 · Hebrew captions · a browser asks a server, and a form sends to it
- `5o8CwafCxnU` code.org IP Addresses & DNS · 3:58–5:07 · Hebrew captions · how a name becomes an address, acted out
  (what the long `/exec` link actually is)
- `j_uf3eJtLkw` the waiter and the restaurant · 0:00–2:22 · English, short and visual

**Try it on your pet:**
1. פותחים את האתר של החיה בטלפון, ומאכילים פעם אחת. אחר כך מאכילים פעם אחת מהמחשב.
2. בגיליון, בלשונית log: איזו שורה היא מהטלפון, ואיזו מהמחשב? איך אפשר לדעת?
3. בגיליון, ליד `full`, כותבים 5, ומרעננים את האתר. מה החיה אומרת? מי החליט את זה?

**A prompt for Gemini:**
```
בניתי אתר עם חיה וירטואלית ב-Google Apps Script. יש לי דף (Index.html), שרת (Code.gs) וגיליון.
תסביר לי בלי קוד, כמו לבן 14, מה קורה מהרגע שחבר שלי לוחץ "להאכיל" ועד שהמספר בגיליון משתנה.
אחר כך תשאל אותי 3 שאלות, אחת אחרי השנייה, כדי לבדוק שהבנתי. אל תגלה את התשובה לפני שעניתי.
```
💬

---

## Part 4: meetings 2–4, in short

### Meeting 2: היא חיה (moods and bars)
**The idea:** the pet's state lives on the server; the page only shows it. And a button has more than one look.
- **Clips:** `EcbgbKtOELY` 6:47–8:36 (every button has states: normal, pressed, disabled; the pet's "רגע..." is one) ·
  `Fy0aCDmgnxg` 2:39–5:39 ("juice": the same action with and without a reaction; the pet's bounce) ·
  `4HuI9oHYpNs` 0:00–1:40 (what to show while the server is thinking).
- **From the character research:** a face shows the mood before any text does. Give each mood a face, and keep the
  shape and colours from meeting 1's card so it's still the same pet.
- **From the database course:** a bar is 0 to 100 and the server enforces it (`3d78pO7-JKE` 3:16–11:08, rules on what a
  cell may hold). The starter already does this with `Math.min(100, ...)`; have them find that line.
- **Traps to put in נתקעתי:** "לחצתי ולא קרה כלום, ואין שגיאה": a function's name changed (`RRQvySxaCW0` 17:56–19:01).
  And in every code prompt: "אל תשנה את השמות getPet, feed, play" (the guard-comment idea, `6XC-vN0Ox2k` 12:05).
- **Homework page:** "פרצופים ומצבים" · try it: a third mood of your own · prompt: Gemini asks what the pet feels at 0,
  50 and 100 before drawing anything.
💬

### Meeting 3: הזמן עובר (hunger while you're away)
**The idea:** the server doesn't run while nobody visits. It writes down *when* she last ate, and works out how
hungry she is when someone opens the page.
- **Clips:** `O3ZHi2nW7tI` 4:56–14:09 and `QF3srvfb4GU` 12:26–19:11 (store a number, or work it out when asked: the
  trade-off) · `Lu-RjxeDpU8` 12:54–14:36 (why "welcome back, here's what happened" feels good in idle games) ·
  `KvGi-UDfy00` from 0:30 (a server remembers nothing between requests; the Sheet does).
- **2026 call, not from a video:** no timers and no scheduled triggers. Hunger is worked out when the page asks. It
  is simpler, it can't run out of quota, and it needs no new permission.
- **Traps:** an empty "last fed" cell is not zero (`U4Z4maN9ERI` 0:00–4:52) · comparing two dates directly gives wrong
  answers (`E0mrZwl1Kow` 11:48).
- **Homework page:** "מה קרה כשלא הייתי" · try it: change the "last fed" time in the Sheet to yesterday and refresh ·
  prompt: Gemini explains, without code, how a game knows how long you were gone.
💬

### Meeting 4: מבקרים (the whole class at once, and the lock)
**The idea:** two visitors read the same number, both add one, and one feeding disappears.
- **The demo is already built in:** the starter's `feed` reads, then writes, with no lock. Everyone feeds your pet
  for 20 seconds; then compare the `feeds` number with the number of rows in `log`. They won't match. Nobody
  cheated. That's the lesson.
- **Clips:** `cy4uGB7Gc-U` 4:49–12:20 (the lost update, with two salespeople and one stock number: the best single
  clip for this meeting) · `-CXWjbYX1MY` 0:00–5:16 (lock everything, or nothing?) · `O3ey0Mggz84` 0:00–13:22 (the
  lock as "one customer in the shop at a time").
- **Also worth a minute:** why the page asks "anything new?" every 4 seconds instead of being told
  (`ZotHUoS-RCE` 16:09–20:35: a server like ours can't call the page).
- **Later, for the showcase:** embedding the site in a Google Site removes Google's grey banner at the top
  (`RJtaMJTlRhE`).
- **Homework page:** "שניים בבת אחת" · try it: feed from two tabs as fast as you can, before and after the lock ·
  prompt: Gemini explains the lost update with two kids and one cookie jar, then asks them where else it happens.
💬

---

## What I would not use
- **Any screen recording of the 2019 Apps Script editor** as a "where to click" clip. The buttons moved.
- **The business-dashboard videos** (56 of them): adult ERP and CRM demos, nothing a 14-year-old wants to build.
- **Gemini's side panel inside the Apps Script editor** (`Qu0mJj1nLbw`): good, but it needs a paid plan the kids
  won't have. Its three rules are worth keeping as ours: Gemini sees one file, it's all-or-nothing, and other files
  must be named.
- **Anything about breaking into or cheating an app.** The research has a strong "the page is public, the server
  isn't" line (`RRQvySxaCW0` 15:43). I used only the friendly half: the server is the one that touches the Sheet.
💬
