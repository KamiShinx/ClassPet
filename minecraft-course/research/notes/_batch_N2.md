# Batch N2: items, power-ups, super moves, healing

Four Design Doc videos (Mario Kart items, Mario power-ups, super moves, healing systems). All four are substantive,
not padded beyond a short sponsor read each, and all four visually are pure gameplay b-roll of the games being
discussed — no diagrams, no comparison charts. Nothing in the frames adds information the transcript doesn't
already give in words.

## Strongest ideas across the batch
1. **Every "cool item" is really a cost, and the cost has a small number of shapes.** All four videos keep
   returning to the same levers: rarity/frequency, resource cost that scales with what you have (not a flat
   number), time/vulnerability (animation lock), opportunity cost, permanent sacrifice, and risk-to-the-user-vs-
   risk-to-someone-else. The single most reusable idea in the batch — pick one lever, get a real spec instead of
   "it heals/does damage."
2. **The four-bucket item taxonomy** (speed yourself up / slow others ahead / slow others behind / grant
   immunity), from Mario Kart, is a clean starting frame for "what kind of item am I even making?"
3. **Gain-then-lose beats start-strong-then-weaken.** Mario's own devs found losing power feels far worse than
   earning it — useful for how a kid frames an item's downside.
4. **Frequency breaks balance even when individual power doesn't.** Mario Tennis Ultra Smash and Mario Kart Wii
   are both "fine items, ruined by showing up too often" — a check against just adding more items.
5. **Catch-up items should scale with how badly you're doing, not just exist.** F-Zero 99's Skyway (praised) vs.
   UMVC3's X Factor (called "unearned") is a useful contrast: both help a losing player, but one tapers off and
   one snowballs.
6. **Ironic healing — tie recovery to aggression, not retreat.** DOOM's Glory Kills flips "hang back when hurt";
   a clean, buildable Minecraft potion/effect idea.
7. **"Balanced" on paper can still feel bad.** X Factor and the blue shell are both flagged as mathematically
   fine but emotionally unsatisfying — a spreadsheet number isn't the whole job.

## Where the videos agree or contradict each other
They agree strongly: all four converge on "the cost/catch is the actual design, not the power number," using
different vocabulary (drop tables, meters, animation lock, opportunity cost) for the same idea. Mario Kart and
Super Move also agree that visible/predictable timing (telegraphed unblockables, broadcast superweapon
cooldowns) is a legitimate substitute for a hard resource cost.

They push against each other once: the healing video calls Zelda BOTW/TOTK's cooking too cheap and
tension-draining, while the super-move video treats Devil May Cry's Devil Trigger — also easy to trigger — as a
fine "emergency tool." The difference the videos themselves supply is duration: Devil Trigger runs out fast,
BOTW meals don't. Rule for kids: if a strong effect is easy to get, it needs a leash — short, or costly.

## What I'd cut
- The Mario Kart video's blow-by-blow trivia (exact drop percentages, which GameCube item got cut where) — fun
  for a fan, too granular for a spec-writing exercise.
- The CPU-cheating sections (rubber-banding, fake bot drop tables) — an "AI cheats" story, not an item-design
  lesson, and doesn't map to a single-player-first mod.
- The Metroid Other M motion-control healing example — a good "what not to do" aside but a dead end on Windows
  laptops; one line is enough, no activity needed.

## Mechanic cards
- "A throwable item that's easy to dodge but hits hard, vs. one that auto-homes but only does a little — which
  goes in a kid's toolbar?" — *RJg8ka9bwRI [0:03:34]*
- "An item that gets stronger for whoever is losing (fewest hearts/kills) but ONLY the losing player can get it —
  fair, or does it feel earned?" — *RJg8ka9bwRI [0:20:20]*
- "A power-up that makes you invincible and strong for exactly 8 seconds, and you can't control when it ends —
  what do you do with the window?" — *D-d65os0qf0 [0:04:34]*
- "An ultimate move that gets stronger the fewer allies/hearts you have left, letting an almost-beaten player turn
  a fight around — does that feel earned, or cheap?" — *ejXt7PwSvvo [0:23:18]*
- "An ability that fills up by fighting well, but using it risks a 'backfire' into a worse form if you lean on it
  too much — how often do you risk it?" — *ejXt7PwSvvo [0:09:54]*
- "A healing item that takes 2 full seconds to use, and if a mob hits you mid-use you lose the item AND don't
  heal — how does that change when players choose to heal?" — *fzHD4FLHIIo [0:09:31]*
- "A potion that only heals you if you just landed a hit on something, not if you're hiding — how does that
  change how someone plays low-health?" — *fzHD4FLHIIo [0:13:53]*
- "A healing effect that glows so bright every mob nearby knows exactly where you are while it's active." —
  *fzHD4FLHIIo [0:21:48]*

## Verdict line
This batch **strengthens** the existing "layer, not pillar" verdict — nothing here needs a third course pillar.
It hands the planned risk/reward-dial checklist a ready-made vocabulary (four item buckets, six cost levers, the
catch-up-vs-snowball contrast) that plugs into the very first thing kids build: a custom item. It also bridges
back to character design — Mario Kart's character-locked specials ([RJg8ka9bwRI 0:19:20]) are a ready prompt for
tying a signature item to a kid's own character, not a rival to worldbuilding.
