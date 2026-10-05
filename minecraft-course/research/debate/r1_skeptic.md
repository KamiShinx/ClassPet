# Round 1: skeptic

My question for every design: **what did the kid think that Gemini didn't, and how would Ben see it?**

Both proposals can end up empty. The earlier plan names a real skill, but a zero-coder can't judge Java. "Show me the line" is a prompting trick, not judgement, because the kid can't read the line. What's left is "did it crash?", which is thin and frustrating for 20 weeks. Ben's plan has the opposite problem. If Gemini writes the code and the kid also asks it for the lore, the mob names and the textures, the kid is a customer, not a maker. Millard's closing point is that AI-generated lore doesn't make players care (`bups0ZUQdvc` [0:20:33]). Sanderson says ideas are cheap and execution is the skill (`MEUh_y1IFZY` [0:50:17]). If Gemini does the execution *and* supplies the ideas, the kid does nothing.

**My thesis: the creative card IS the judgement skill, but only when it makes claims the game can pass or fail.** "Ash Wraith, sad ghost of a burned village" trains nothing. "Flees water; glows red 1 s before it lunges; dies in 4 sword hits; drops ash that works only at night" is a spec. The kid can check it in-game without reading any Java. So Ben's cards are the input and the earlier plan's verify loop is the method.

## 1. Course shape
- **W1-2, seed + pipeline.** Seed of joy (`hkVGTHLgOIQ` [0:01:38]) plus a place theme in ≤8 words (Stoneworks, D [0:08:59]). First loop: one item with a 2-sentence tooltip, specced, built, checked. First Gemini-Lied entry.
- **W3-5, one of everything small.** An item with a cost; a Blockbench block/item (the proven-easy path); a first mob built by reskinning a vanilla archetype chosen for its *behaviour* (`kE0PJJlhDFA` [0:01:12]).
- **W6-9, the place as a bent world rule** (Q1) + mob #2, which must make the player do something different from mob #1 (I). Every lore line gets a "found where in game" field.
- **W10, Showcase 1:** classmates play each other's mods cold. Blunt questions, "where were you bored" (`6xM9rJQbU1M` [1:13:44]).
- **W11-12, revise.** Only fixes that playtest turned up, logged as "changed X because Y".
- **W13-17, signature piece:** a custom-model mob or boss with one tell and 2 phases (L, P2). This is the risky multi-step pipeline, so it comes late, after the loop is routine.
- **W18-19, cut and polish:** the mod's first 60 seconds (`vt-xkWZH1aw`).
- **W20, Showcase 2** + the explain-it round (below).

## 2. A typical 65 minutes
- **0-5:** one story. A Gemini-Lied entry from the class, or a mechanic card from the deck.
- **5-17, spec with Antigravity closed.** Update the card and write 2-3 claims. Then **predict**: "when I spawn it, I'll see ___". A partner asks 2 blunt questions (Millard's rule, `bups0ZUQdvc` [0:09:46]); any line the kid can't answer gets cut or fixed.
- **17-45, build.** Paste the card into Gemini, run, and tick each claim pass/fail. On a fail, the kid describes the *behaviour* gap to Gemini ("it doesn't flee water"). Blockbench/texture work fills Gemini's wait times, and alternating weeks can lean on it.
- **45-55, cold swap.** A partner plays without being told anything and gives descriptive feedback, not prescriptive (`MEUh_y1IFZY` [1:01:12]).
- **55-65, log.** Claims ticked, one Gemini-Lied or "surprised me" line, card status updated. Ben asks **2 kids** an oral "explain it" (30 s, no screen), so every kid gets one every 4 weeks.
- **Homework (30 min):** next week's card draft, or texture painting. It is never "ask Gemini for ideas".

## 3. What the platform holds
- **Place card:** theme (≤8 words), one bent world rule, one thing left unexplained (D), lore lines of ≤2 sentences, each with a "found where" field.
- **Mob card:** Who/Want/Why, one line each (`nkoJTc_WzFI` [0:05:44]); one trait; a black-fill silhouette screenshot; 2-4 colours; cost/limitation (`3Y9p53C1lP4` [0:59:12]); the tell; "what the player must do differently"; 3 claims.
- **Item card:** what it does, what it's *worse* at than vanilla (I), its cost shape, the tooltip, claims.
- **Build log** (one per feature per session): card version → prediction → claims pass/fail → Gemini-Lied line → fix.
- **Question wall:** partners' blunt questions plus the kid's answers. "Cut it" counts as an answer.
- **Tooltips:** one screen each (silhouette, cost types, teach-it-cold, 16×16 budget from `UlVZgIdoR_A`).
- **Card status:** draft → built → verified (all claims pass) → playtested. That status line is the link between the platform and Minecraft.
- **Provenance (my proposal, unverified against FlutterFlow):** keep version history, and mark large pastes into cards as "pasted" on Ben's dashboard. The point isn't policing. It lets Ben ask "whose words?".
- **One AI rule for the creative side:** Gemini may *interview* ("ask me 5 hard questions about my mob, don't suggest answers") and critique. It doesn't author cards. Hands make the model and texture. Gemini makes the code.

## 4. At week 20
One place with a bent rule. 3 mobs, one of them a custom-model signature mob. 4-5 items. ~12 lore lines, all findable in-game, plus one deliberate mystery. **~30 claims verified and ~10 Gemini-Lied entries,** each one "it said X, the game did Y, I fixed it by Z". The kid can explain, without the screen: why each mob asks something different, what each item costs, one bug they caught, and one thing they cut and why. That's less lore than Ben's "insane lore", and I'd defend that (D, E, H: volume makes game lore worse).

## 5. Three strongest claims
1. **A lore card is not judgement. A checkable spec is.** Chef vs cook means knowing *why* something works so you can fix it (`MEUh_y1IFZY` [0:10:47]). Sanderson's cost/flaw/limitation categories are, per batch G, "nearly the same document" as a technical spec. Millard's test (can the world answer a blunt question, [0:09:46]) is a pass/fail check. Put those together and "judging Gemini" becomes something a zero-coder can do: judge behaviour against their own claims, not code.
2. **Ownership has to be protected by the direction the AI works in, not by trust.** Write-before-you-draw (`j9cHhwmeNRM` [0:12:15], Drelix) only helps if the writing is yours. *Own knowledge, labelled:* the generation effect in memory research says people understand and retain what they produce better than what they read. Prediction-before-running is a standard way to make thinking visible. A kid who picks from Gemini's five mob names has practised shopping, not designing.
3. **3D and texture are where ownership is cheapest to guarantee.** Items and blocks from Blockbench are proven easy on 26.2 (SYNTHESIS). The 16×16 = 256 px budget (`UlVZgIdoR_A`) and silhouette-first (all of A, B) make it doable without drawing skill. *Own knowledge, unverified here:* general image generators are poor at true palette-limited 16×16 pixel art. So hand-making textures costs little and is visibly the kid's own work.

## 6. How this fails in a real room
The loop turns into paperwork. Eleven-year-olds write claims like "it is cool", log "didn't work" as a Gemini lie, and the prediction box gets filled in after the run. Meanwhile Ben is firefighting 8 broken Gradle builds on a brutal network, and the oral checks stop happening by week 6. Then my measurability costs more than it protects: kids feel audited and the dragon never ships. Two mitigations: a claim must name something you can *see or count*, and Ben models 3 good claims and 3 bad ones in W2. But I'm not sure they hold. Second risk: kids ask Gemini for lore at home anyway, and the paste flag only catches the lazy ones.

## 7. What I expect others to get wrong
- **Creative seats** will measure success by volume (pages of lore, 10 mobs). That's the worldbuilder's disease (SYNTHESIS #1), and it skips the question of who wrote it.
- **Game-design seats** will turn MDA/risk-reward/Sanderson's laws into fill-in checklists. That's the Lucas trap Sanderson names (`SyuJI8xU0gc` [0:10:29]): frameworks used as recipes make cooks.
- **Defenders of the earlier plan** will overrate what "verify" means for zero-coders. It has to be behavioural, and the log needs *fixed* entries, not complaints.
- **Everyone** will under-budget setup and the custom-mob pipeline. A custom mob before W10 bets the first showcase on unverified export settings.
