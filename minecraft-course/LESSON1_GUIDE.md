# Lesson 1, from zero

> **Update (5 Oct, later): no Gems.** Google replaces Gems with Skills on 17 Nov 2026, and Skills are 18+ only.
> Instead, the hub's "להעתיק לג׳מיני" button copies the course rules plus the kid's code into any normal Gemini chat.
> Sections 2-3 and 6 about making a Gem are obsolete.

> For you, the teacher. No assumptions: every piece is explained once, in plain words. Write under any `💬` line
> (or start a line with `BEN:`), then tell me "done". Nothing here is final, and nothing for lesson 2 happens until
> this makes sense to you.

---

## 1. The pieces, in plain words

**The laptop folder `C:\MAKE`.** Everything for the course lives in this one folder on each school laptop: Java
(the engine Minecraft runs on), Minecraft itself, and the kid's own mod. Nothing important is on the desktop.

**The "Minecraft" icon.** One icon, in the Start menu (press the Windows key, type "Minecraft") and also on the
desktop. Clicking it opens **the hub** in the browser. If the school deletes the desktop icon, the Start menu one
is still there.

**The hub.** A web page that lives on the laptop, not on the internet, so the school filter can't block it. It has two parts:
- the lessons: step-by-step instructions, one step per screen, in Hebrew;
- a bar of big buttons at the top that run Minecraft: paste code from Gemini and play, play, undo, versions, pictures.

**A mod.** Extra code that changes Minecraft: new items, new creatures, new rules. Each kid has one mod, called
"My World". It starts almost empty (one green gem item) and grows every lesson.

**How a mod is made, in this course.** Five small text files hold the kid's mod. One file is for items, one for
effects, one for creatures, one for world rules, and one holds the world's name. The kids never open these files.
They ask Gemini for the code, and the hub's paste button puts it in the right file, rebuilds the mod and opens
Minecraft. Building takes about a minute. If the code is broken, the hub copies the error, and the kid pastes it
back to Gemini, which fixes it.

**Gemini.** Google's AI chat, at gemini.google.com. Like ChatGPT. The kids log in with their Ministry of Education
Google account. You type a message at the bottom, press Enter, and it answers. When it writes code, the code appears
in a grey box with a small **copy** button in its corner. That copy button is the only thing the kids need to copy code.

**A Gem.** A saved version of Gemini with fixed instructions. Our Gem is called "עוזר המודים" (the Mod Helper). Its
instructions tell Gemini: we use Minecraft 26.2, these are the kid's five files, always send whole files, never
invent ideas for the kid, ask questions when the kid is vague. Without the Gem, plain Gemini writes old Minecraft
code that doesn't work, and invents names and ideas instead of the kid.

**The USB sticks.** Each stick holds a full copy of `C:\MAKE` from your laptop. In lesson 1 each kid copies it to
their laptop. It takes about 5 minutes and needs no internet. That's how we get around the school filter.

💬 Comments:

---

## 2. Things nobody has checked yet

These decide whether lesson 1 works. You can only check them at the school, with a student account.

| Question | Why it matters | If the answer is no |
|---|---|---|
| Does a school laptop run `school-check.bat` from the stick? | It tells us if the school's protection lets the course run | Then IT installs it for us. Tell me what failed |
| Can a kid's Ministry account open Gemini? | No Gemini, no code | We'd have to talk: the course changes a lot |
| Can a kid's Ministry account create a Gem? | See section 3 | Kids paste the Gem's instructions as the first message of each chat instead. It works, but weaker |
| Can a Gem made by you be opened by the kids? | Saves 5 minutes of setup per kid | Each kid makes the Gem themselves (section 3) |
| Which Gemini model do the kids get? | A weak model makes more mistakes | The hub's paste button is already built to survive sloppy answers |

💬 Comments:

---

## 3. Making the Gem (10 minutes, once)

I recommend **each kid makes the Gem themselves in lesson 1**. A Gem you make may not open on their accounts (yours
isn't a Ministry account), and making it takes a kid about 3 minutes. The instructions come from the hub, with a
copy button.

The steps, so you can try it first on any account:
1. Open gemini.google.com.
2. In the menu on the side, click **Gems** (on some accounts: "Explore Gems"), then **New Gem**.
3. Name: עוזר המודים.
4. Instructions: paste the text from the teacher page (the "העתקת ההוראות" button).
5. Click **Save**. The Gem now appears in the side menu. Clicking it opens a chat that follows those instructions.

What the kids need to know about it: "always open עוזר המודים from the side menu, not a plain Gemini chat."

💬 Comments:

---

## 4. Lesson 1, minute by minute

The goal: every laptop has the course installed, every kid has talked to Gemini once, and every kid knows what the
course is. It's a loose lesson on purpose, because the installing takes time.

**Before the kids arrive:** laptops out, numbered 1 to 8 with a sticker (each kid gets the same laptop every week),
plugged in to charge. The USB sticks on your desk. Your laptop on the projector with the teacher page open.

| Minutes | You | The kids |
|---|---|---|
| 0-15 | Hand out laptops and sticks. Say: "plug in the stick, open it, double-click install-from-usb, don't close the black window" | Install from the stick. A black window copies files for about 5 minutes, then Minecraft opens by itself. Then they pass the stick to the next kid |
| 15-20 | **What the course is:** "in 20 lessons you build your own world in Minecraft: items, creatures, a place, rules. At the end your families come and play it" | Listen. Installs keep running |
| 20-35 | **How we build: you decide, Gemini writes the code.** Live on the projector: ask plain Gemini "תבנה לי חרב". Show what comes back (it picks everything itself, often old code). Then send a precise request (name, what it does, how strong). Ask: which answer is better, and why? | Watch, vote, say why |
| 35-50 | **The world card:** each kid writes, in the hub, what their world is in 6 words, plus 3 colours | Type it in the hub (lesson 1, step "כרטיס העולם") |
| 50-80 | **Meet Gemini:** show on the projector how it works (below), then each kid makes the Gem and says hello to it | Log in, make the Gem, send their world's line, answer its question. Done early: play in Minecraft, Creative mode |
| 80-90 | Close: "next week, your first item, in the game". Write down any laptop that didn't finish installing | Close Minecraft. Laptops back, plugged in |

**"How Gemini works", the 5 things to show on the projector (minute 50):**
1. Logging in with the Ministry account at gemini.google.com.
2. Where you type, and that Enter sends.
3. The side menu: **New chat**, and where the Gem appears.
4. The grey code box and its **copy** button.
5. Gemini doesn't remember older chats. So in this course you always send it your current code first (the hub has a button for that).

💬 Comments:

---

## 5. What I'm changing in the hub after you read this

The lines you flagged were written for someone who already knew everything. Here is what they meant, and what replaces them:

| The confusing line | What it meant | What I'll do |
|---|---|---|
| "שמים את כרטיס העולם בתיקייה, לפי מספר המחשב" | A paper folder per laptop, to keep the paper world cards at school | **Drop it.** The world card is typed in the hub and stays on the laptop. No paper |
| "מחברים את המחשב לחשמל" | Charge the laptop for next week | Moves to your notes, not the kids' screen |
| "החלון השחור עוד עובד? משאירים את המחשב פתוח" | The install window still copying | **Drop it.** Copying from the stick takes 5 minutes, so it's done long before the end |
| "פותחים את ה־Gem של הכיתה... המורה ייתן את הקישור" | The kids open a Gem you made and shared | Replaced by "making the Gem" steps, with screenshots-style pictures of where to click, if section 3 is OK with you |
| "מעתיקים ושולחים ב־Gem" | The copy box sends text to the Gem | Each box will say exactly where to paste it and what happens next |

Also: lesson 1 gets a real "how Gemini works" step for the kids (the 5 things above), and a step that explains how a
mod works, in kid words.

💬 Comments:

---

## 6. One question

Section 3: should each kid make the Gem themselves in lesson 1 (my pick), or do you want to try sharing one Gem
from your account first?

💬
