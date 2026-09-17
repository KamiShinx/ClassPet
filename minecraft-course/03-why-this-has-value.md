# What Are We Actually Teaching?

> The hard question: if Gemini writes the code, why does the course exist?
> Answer: because we are not teaching Minecraft modding. Minecraft is the material,
> not the subject.

---

## 1. The objection is correct

"There's a full curriculum, but you can just tell Gemini 'make me a sword'."

Yes. And it follows that:

- **Kaupenjoe's curriculum cannot be our syllabus.** Its value is teaching Java and the
  NeoForge API. If Gemini writes the Java, that value is gone. Following it week-by-week
  produces kids who watched someone else learn.
- **My week-by-week plan in `01-course-plan.md` has this exact flaw.** "W5 recipes,
  W6 loot tables, W7 food" is an API tour. Gemini already knows the API. Teaching a topic
  list the machine has memorised is teaching nothing.
- **A course that is "type a prompt, get a sword" is a 3-week course padded to 20.**

So the Kaupenjoe repo stays — as a **reference for us**, to know what is possible and what
correct 26.2 code looks like. It is not the lesson plan.

---

## 2. What is actually scarce now

When generating code is free, these are what remain hard — and none of them are things an
11-year-old already has:

### Specification
"Make me a sword" gets a generic sword. Getting *the sword in your head* requires saying:
how much damage, how much durability, what is it made of, how is it crafted, what does it
look like, what happens when it hits something. **Vague ask → garbage. Precise ask → the
thing you wanted.** This is the core skill of the next twenty years and almost nobody,
adult or child, is good at it.

### Verification
Gemini produces code that compiles but is wrong. The sword exists — but does 2 damage
instead of 12. Can the student tell *"it worked"* from *"it looks like it worked"*?
Children have essentially zero instinct for checking their own work. This is teachable.

### Debugging
It will break constantly. What do you do? Read the error. Isolate. Feed it back. Undo.
This discipline is fully intact in an AI world — arguably more important, because the
AI hands you broken things faster than you could write them.

### Decomposition
*"A boss that spawns in a custom dimension and drops an item that crafts into armour"* is
not one prompt. It is eight things in dependency order. Knowing how to break a big want
into small ordered asks is the transferable engineering skill.

### Reading code you did not write
The new literacy. They do not need to write Java from scratch. They need to look at 40
lines of generated Java and find the number that controls damage. That is achievable for
a twelve-year-old in a way that "write Java from scratch" is not.

### Judgement and taste
Is a sword that does 1000 damage fun? No. Balance is a human conversation the model cannot
have for them.

---

## 3. The lucky accident: the AI will fail

If everything worked first try, nothing would be learned.

Minecraft 26.X NeoForge is months old. Gemini's training data is overwhelmingly Forge
1.12–1.20. **It will confidently produce code that does not compile.** I flagged this
earlier as the course's biggest risk.

It is also the course's engine.

Every hallucination is a live, authentic lesson in *"the confident machine is wrong, and
you are the one who has to notice."* We do not need to manufacture difficulty. We need to
manage it so it stays productive instead of demoralising — which is what the grounding
setup (reference repo, rules file, docs MCP) is for: it turns a 90% failure rate into a
20% failure rate. Twenty percent is the sweet spot. Zero would be useless.

---

## 4. The mechanisms that create the value

The value is not in the topic list. It is entirely in the ritual around the AI.

| Mechanism | What it builds |
|---|---|
| **No prompt without a spec.** Before typing, write on paper: name, what it does, three numbers. | Specification |
| **"Show me the line."** After the AI writes it, the student points at the line that does the thing. 30-second teacher check. | Reading code |
| **Break-it-on-purpose.** Teacher sabotages a working mod; student fixes it. | Debugging |
| **The "Gemini Lied" log.** A running class list of times the AI was confidently wrong. Gamified, with a leaderboard. | Scepticism |
| **No-AI moments.** Some things are typed by hand: changing a number, making a texture. | Anchoring, ownership |
| **Balance constraint.** "Your mod must not ruin a survival world." | Judgement, design |
| **Explain it at showcase.** Cannot explain how it works = did not learn it. | Consolidation |

The "Gemini Lied" log is the highest-value item on this list. A generation that instinctively
distrusts confident AI output is worth more than a generation that can write Java.

---

## 5. The re-shaped course

Organised by **difficulty of thinking**, not by API topic. Minecraft features are the
vehicle at each stage, chosen for motivation.

### Block 1 (W1–5) — One prompt, one thing
*Skill: say exactly what you want, then check that you got it.*
Items, textures, a block. Each lesson is a single-feature ask with a written spec first and
a verification step after. Deliberately small, so the loop is felt.

### Block 2 (W6–10) — Many prompts, one system
*Skill: decomposition and dependency order.*
A tool set: item → material → recipe → loot → balance pass. One thing that requires five
correct asks in sequence. First showcase at W10.

### Block 3 (W11–14) — It is broken and you must fix it
*Skill: debugging and scepticism.*
Sabotage drills, deliberate version-mismatch traps, reading stack traces. Feature content
(sounds, effects, 3D models) is the excuse; the real subject is recovery. Git introduced
here as a safety net — "get back to when it worked."

### Block 4 (W15–19) — Nobody will tell you what to build
*Skill: autonomy, design, judgement.*
Self-chosen project — custom mob, worldgen, or a working machine. Student writes their own
spec, sequences their own work, fixes their own breakage. The teacher stops answering
"how" and only asks "what did you try?"

### W20 — Ship and explain
Build the jar, install on real Minecraft, everyone plays everything, everyone explains
their own.

---

## 6. The honest failure condition

**If this is taught as "follow Kaupenjoe but let Gemini type," it is worthless and should
not be run.**

The subject is not Minecraft modding. It is *directing a machine that builds things, and
being the person who can tell whether what came back is any good.* Minecraft is there
because eleven-year-olds care about it, and motivation is the scarcest input in the room.
