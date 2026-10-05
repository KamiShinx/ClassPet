# Inventory UX Design - How Zelda, Resident Evil, and Doom Make Great Game Menu UX (Design Doc, 16.6 min)

**What it is:** A history of inventory UX (Zork -> Final Fantasy -> point-and-click -> Doom hotkeys -> Elder
Scrolls encumbrance -> Resident Evil attache case -> Moonlighter curses) followed by two concrete UX guidelines:
optimize for the most common task, and decide whether the world pauses while the inventory is open.
**Substance:** substantive. Good throughline (form should match what the inventory is FOR), several genuinely
sharp before/after case studies (Ocarina of Time Iron Boots, Majora's Mask hotbar crunch, Wind Waker Wii U port).
Squarespace sponsor read bookends it cleanly.

## Ideas, in the video's order
- [0:00:31] UX (how it FEELS to navigate/understand) vs UI (the visual layer) — worth stating precisely once,
  generic terminology but useful vocabulary for kids designing menus at all (generic).
- [0:02:03] Zork: inventory as pure text list — its job was just to make the world feel persistent/rememberable,
  aesthetics irrelevant to that job.
- [0:02:34] Final Fantasy: inventory as unlimited hoarding ledger — works because individual items don't carry
  much unique weight, so a spreadsheet view is fine.
- [0:03:07] Point-and-click adventures: sprites let the inventory become a puzzle surface itself (visual item
  combos, "use X on Y"), which a text list can't support.
- [0:04:12] Doom: hotkey weapon-swap invented specifically because action-paced games can't afford a menu
  detour — genre pace dictates inventory shape (a strong general principle).
- [0:04:47] Elder Scrolls encumbrance: item WEIGHT as a system tied into the inventory for realism/immersion, but
  flagged as risky — min-maxing it (carry 100 featherlight items, or become stuck 1 lb over) can break immersion
  the system was trying to create.
- [0:05:55] Resident Evil 4's attache case: Tetris-style physical packing, aesthetic and mechanic reinforce the
  same message ("you have a hard limit, plan around it") — the video's best example of form matching purpose.
- [0:06:26] Moonlighter: item curses that spread to neighboring slots turn inventory arrangement into an active
  puzzle, not passive storage.
- [0:07:27] **Core design question, stated directly: what is this inventory supposed to make the player FEEL —
  scarcity or abundance — and does the aesthetic match?** This is the video's real thesis.
- [0:08:01] **Guideline 1: optimize the most COMMON task, not every task equally.** Burying a frequently-used
  item deep in a menu makes the whole game feel clunkier even if rare tasks are handled fine.
- [0:08:36] Case study (bad): OoT's Iron Boots were filed as "equipment," not hotkeyable like items — a multi-step
  menu dive every time you needed to sink underwater, made a disliked dungeon (Water Temple) actively worse.
  Fixed in the 3DS remake.
- [0:09:39] Case study (bad): Majora's Mask crammed dozens of masks + all normal items into only 3 hotbar slots
  (N64 hardware limit) — constant re-swapping ate back any time the hotbar was supposed to save.
- [0:10:10] Case study (good fix): Wind Waker's Wii U port put an always-on touchscreen inventory on the GamePad
  — removes the "open menu" step entirely and lets drag-and-drop replace cursor-hunting; also moved
  context-specific tools (sail) out of the main menu and onto auto-context D-pad slots while sailing.
- [0:11:46] **Quickwheel pattern**: hold a button, use the analog stick to pick from up to ~8 slots around a
  circle — squeezes more one-press slots out of a controller with few buttons, without a menu dive.
- [0:12:56] **Guideline 2: decide, on purpose, whether the game WORLD pauses while the inventory is open** — no
  universally right answer, real tradeoff. Dark Souls/ZombiU: keeps running (more immersive, more tense, but
  demands a very clean, quick-to-use inventory since fumbling can kill you). DOOM 2016: slows time (not full
  pause) specifically for its fast, high-variety weapon wheel, but instant-swap to "last weapon used" for the
  single most common case. Full pause is the safe default that lets players think without risk.

## What the frames add
The frames are genuinely useful here, more than most of this batch — real screenshots of every named UI: Zelda
inventory grids, the RE4 attache-case Tetris pack, Skyrim/Witcher menus, the Wind Waker Wii U GamePad
touchscreen inventory in actual use (a hand tapping the second screen, [0:10:30]-[0:11:00]), and old-school
text-adventure screens (Zork-style parser output). Good source material if building a visual "inventory style
gallery" handout — screenshot several of these directly rather than re-describing them.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"What should this inventory make me feel?" one-liner (10 min)**: before specifying any custom
  container/bag/curse item, kid writes one sentence: does this want to feel scarce (RE4-style) or abundant
  (FF-style)? Directly from [0:07:27]. Cheap, concrete, and forces intent before building.
- **"Most common action" audit (15 min)**: kid lists the 3 actions a player will do most often with their custom
  item/mechanic, then checks whether their planned design buries any of them (an OoT Iron Boots-style trap).
  Straight from Guideline 1 [0:08:01]. Good as a review checklist applied to another kid's design, not just
  your own — peer-review format works well here.
- **Moonlighter-style "cursed item" spec (15-20 min)**: design one item whose curse/blessing affects nearby
  inventory slots (e.g., "while held, items next to it get X"). Concrete, bounded, and a natural item-behavior
  mod spec Gemini can plausibly build.

### Survives the move to Minecraft?
Mixed, and this is the batch's clearest instance of the brief's "too heavy" warning. Minecraft's inventory grid,
hotbar, and menu-open/pause behavior (the world keeps running while your inventory is open, no ZombiU-style
risk) are hard-coded engine UI, not something an 11-13-year-old + Gemini can rebuild in NeoForge in a 20-week
after-school class — a custom inventory SCREEN (new grid layout, drag-and-drop redesign, a quickwheel) is a real
UI-programming project, out of reach here. What DOES transfer cleanly: item BEHAVIOR that piggybacks on the
existing inventory (a cursed item that debuffs neighboring slots via a tick-based NBT/data-component check,
encumbrance-style weight limits via a capability, a container block with a themed texture). Frame this explicitly
to Ben: "inventory feel" is buildable through item effects, "inventory UI" is not.

### Doesn't transfer
- Any redesign of the inventory SCREEN itself (Wind Waker's touchscreen rebuild, quickwheels, Tetris-packing
  like RE4) needs real UI/screen programming — flag as too heavy per the brief's own rule.
- The world-pauses-or-not design question is a fixed Minecraft engine behavior kids can't change — worth
  mentioning as a "notice this, don't design it" discussion point, not a spec exercise.
- Zork's pure-text inventory and old point-and-click "combine items" puzzle logic don't map onto a block/cube
  game at all.

## Honest caveats
This video is the strongest single argument in the batch for "match the aesthetic to the mechanic's purpose" —
but almost all of its best case studies (Iron Boots, Majora's Mask hotbar, Wind Waker's GamePad) are exactly the
kind of UI/screen work the class can't build. Don't oversell this one to Ben as a buildable activity source; it's
better used for the "what should this feel like" framing question than for hands-on specs. The video's claim
that Elder Scrolls encumbrance risks breaking immersion via exploits is presented as the host's own critique, not
a sourced fact — reasonable but worth labeling as opinion if quoted to Ben.
