---
name: feedback-how-ben-wants-answers
description: "How Ben wants to be answered — full artefacts not snippets, no reasoning at him when he asked something simple, no flattery, and statistics he can check."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4836970f-e39c-4245-b079-ca32ebe33d95
  modified: 2026-09-15T11:37:55.917Z
---

Corrections he gave directly during 2026-09-08. He interrupts mid-answer when something
is wrong, so treat an interruption as data, not noise.

## Give the whole artefact, never fragments

Verbatim: *"give me full prompt stop giving me snippets"*. When iterating on a prompt, a
script or a config, output the **entire current version** every time, ready to paste. He
is pasting these into other tools; a diff or a "swap this block" costs him assembly work
and invites mistakes.

**Why:** he caught a stray word in a block I asked him to splice in, and separately I
dropped "trousers" while rewriting a prompt, which produced a character in shorts. Partial
edits are where errors enter.

## Don't reason at him when he asked something simple

Verbatim: *"I don't want you to reason with me I asked for something simple"*, and
*"that's not a good reasoning"* when I explained nostalgia as a CRT artefact. When he asks
a direct question, answer it. Save the analysis for when he asks for analysis, or when
the reasoning changes what he should do.

**How to apply:** if the answer fits in two sentences, use two sentences. He will ask for
more if he wants it.

## No answers optimised to satisfy him

Verbatim: *"I know you're a language model that's just trying to reason and answer that's
going to satisfy me so I'm pointing this at the top of this prompt, don't."* He asks for
the uncomfortable version explicitly and means it. Tell him when something won't work,
when he's spending time on the wrong thing, and when his own framework contradicts his
plan.

## Statistics he can check

He challenged a set of findings with *"are you sure on the n= and (p) of your claims based
on a 100 videos from one creator that also might get a lot of views because she's hot?"* —
and he was right. Bootstrap CIs on those topic medians were 43–65x wide and the claim did
not survive.

**How to apply:** give n with every comparison, run a real test when one is available, and
retract loudly when something fails. Distinguish what a sample can support (within-account
contrasts) from what it cannot (absolute levels, other creators). He would rather have
three solid findings than ten shaky ones.

## Do exactly the change he asked for, nothing added

Verbatim (2026-09-11): *"i dont like whgen you over produce / i just asked for pink background
not cropping or anything or stars jesus"*. He asked for a pink background behind his character
for the profile picture; I made three variants with a head crop, sparkles, a sticker outline and
a gradient. What he wanted was his image as-is with the white swapped for one flat pink.

**How to apply:** a request to change one thing (colour, background, a word) means change that
one thing on his original, full frame. No crops, extras or variants unless he asks. If you think
something more is needed, ask in one line after delivering the plain version.

## Don't over-iterate on the thing that doesn't matter

I told him the mascot was not the engine, then spent twelve generations on it. He was
happy to keep going, but the point stands: name the low-value component once, then either
commit to iterating or move on. His own stated failure mode is perfectionism eating weeks
— see [[project-hebrew-jester-persona]].

## Make the engineering calls yourself

Verbatim (2026-09-15, fourth approval click on the Google Drive storage design): *"bro i donnt know ill just continue
clicking looks right i dont know even about what, i trust you"*. Section-by-section technical approvals were noise to him.

**How to apply:** for technical design, decide and state the decision in a line or two. Ask him only for:
- what only he can do (logins, API keys, payments)
- content and taste
- anything that removes or risks his data

One big "here's the plan" is fine. A string of yes/no clicks about internals is not.

## Voice-dictated input

His messages are voice-transcribed, so typos and run-ons are normal. Read through obvious
errors ("this is my dick" = deck, "cancer type videos" = Kinzer-type) rather than
analysing the typo. Do not correct his spelling.

## Anything he must act on goes in the FINAL message

2026-09-15: I wrote the GPT icon-sheet prompt as text between tool calls in the middle of a long turn. He never saw it:
*"you never gave me prompt for gpt sheet"*. He also saw a stray line of my working notes ("~500 left") and read it as
tokens running out.

**How to apply:** prompts to paste, links, files and questions for Ben belong in the last message of the turn, or in a
SendUserFile. A short progress line mid-turn is fine, but never put the only copy of something he needs there.

## Results over carefulness (22 Sep 2026)

Verbatim: *"i love you but idc about your programming. i care about produce a spesific result,
which is a hookey clickbaity script that will make views and money."* And earlier: *"i dont say
'make up stuff' im saying that dont be obssesed on fact checking if some are the sources are off."*

**Why:** I kept letting trained caution leak into deliverables — hedging about sources on camera,
disclosing thin sourcing inside the story, stalling on provenance when two outlets disagreed on a
date. Each time it cost the thing he actually asked for.

**How to apply:** optimise for the stated result. Where sources disagree on a detail, take the
most commonly reported version and keep moving; never narrate the disagreement. The one line that
holds regardless: don't invent actions, quotes or traits for real named people. That is a research
constraint handled BEFORE writing, never something that appears in the output.
Related: [[feedback_no_sources_on_camera]], [[project-creepy-channel]].

- **One thing at a time** (1 Oct, rap-doc): two comparison sheets sent back to back = "im confused and overwhelmed. one at a time". Send one deliverable, one question, wait.
