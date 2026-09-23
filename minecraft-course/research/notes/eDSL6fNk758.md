# What's the Deal with Fast Travel? (Design Doc, 18.8 min)

**What it is:** A survey of fast-travel system designs across many games — what problem each solves and what it costs the world design.
**Substance:** substantive: dense, example-driven, one clear throughline (fast travel is a dial, not a binary), though ~1.5 min is a sponsor read (Milanote, [0:00:46]-[0:01:50]).

## Ideas, in the video's order
- [0:01:50] Fast travel only exists as a concept once moving around has a real time/space cost — if all travel is already instant (point-and-click), fast travel is meaningless (generic but foundational framing).
- [0:02:54] "Anywhere-to-hub" teleport: jump from wherever you are to any unlocked point of interest (Skyrim's dense web of markers; BotW/Elden Ring's sparser towers/shrines/grace sites). Density of points controls how "go anywhere" the world feels.
- [0:04:35] Teleport fast travel is also a technical safety valve: escape from being stuck in geometry, and a completionist tool to skip re-walking cleared content.
- [0:04:35] "Hub-to-hub" teleport: you must physically reach a hub before you can travel from it (bus network/save-point framing). Forces some effort and is more diegetic than a menu warp.
- [0:05:39] Too many hubs placed too conveniently kills the "serendipity" of a game — players stop noticing the side content between two points and start just menu-hopping (explicit design tension named in the video).
- [0:06:11] Concrete failure case: FFXIV's Aetheryte crystal for a key story hub was placed far from the actual location for years, becoming a running community complaint until a fix item was patched in — lesson: fast-travel hub placement has to match where players actually need to go, not just be "present somewhere in the zone".
- [0:08:21] Shortcuts as a fast-travel substitute: level-design shortcuts back to the entrance after a dungeon (Dark Souls ladder/elevator), unlockable doors (Zelda), or ability-gated shortcuts (Metroidvania: a late upgrade lets you skip a whole earlier segment).
- [0:09:25] Paid shortcuts: Spelunky's Tunnel Man — give him items, he opens a permanent warp tunnel from start to a deeper level. Only a few fixed "hub" tunnels, but used on every run.
- [0:10:28] Whether a level-skip counts as "fast travel" depends on what progression means in that game — skipping is low-risk in Spelunky (progression = items you're currently carrying) but would break a game like Hades where a run's skill-build depends on going through every room.
- [0:11:02] Third option: speed up the player's own base movement instead of teleporting (horse, bike, better traversal kit) — keeps player control and lets them notice things along the way; can make teleport optional if movement itself is fun (Spider-Man swinging cited as the strongest example, plus density of side content along the route).
- [0:12:41] Convenience matters as much as speed: a traversal option only replaces fast travel if it's always readily available — friction kills adoption.
- [0:13:13] Counter-example of a "fun" movement option undercut by friction: BotW horses — must be caught/tamed/registered at a stable, can't cross rough terrain or rivers, can get stranded away from the player, so players use them briefly then abandon them in practice.
- [0:15:23] Limiters that keep fast travel from being a "get out of jail free" card: (a) force the player to reach a location the slow way at least once, so they have context before they can warp back (prevents skipping straight into content they're unprepared for); (b) charge a resource (money, gems, keys) to use it, tying it back into other systems; (c) gate it behind story progress (FF airships unlock mid/late game once the player already knows the map).
- [0:16:27] Piecemeal unlocks tied to progression work too, not just all-or-nothing: Pokémon Scarlet/Violet's mount gains new traversal abilities (sprint, swim, jump, glide, climb) one by one as you complete a questline, gradually easing exploration without a hard Metroidvania lockout.

## What the frames add
Confirms the games named with actual UI/gameplay footage — the Skyrim map/destination list, FFX-style destination-select menu, Spelunky's tunnel/level layout, Dark Souls elevator/shortcut prompts, Zelda overworld shortcuts, Pokémon mount traversal across biomes (beach/desert/snow) — but adds nothing the transcript doesn't already describe. No diagrams, no side-by-side comparisons, no original visual argument. Talking-head-adjacent B-roll video essay.

## For our class (11-13, Minecraft mod, Gemini writes the code)
### Becomes something kids do
- **"Design your fast travel dial" worksheet (20 min):** kid picks ONE fast-travel style for their mod world (teleport-anywhere, hub-to-hub, or "faster movement item") and fills in three blanks: what does it cost (item/currency/must-visit-first)? where are the points placed and why? what does it stop the player from doing (what do you lose by using it)? Comes directly from [0:15:23]'s three limiter types plus the anywhere-vs-hub distinction at [0:02:54]/[0:04:35].
- **"Place the fast travel points" map activity (30 min):** kid sketches or marks their world/structure layout and places 2-4 fast-travel points, then has to justify each placement against the FFXIV Vesper Bay lesson [0:06:11] — "would a player actually need to leave from here?" Cheap way to teach that good placement beats just having the feature.

### Survives the move to Minecraft?
Minecraft already ships two of these exactly: teleport-anywhere-you've-been (via /tp or a custom "waystone"-style block that stores a location) and resource-gated travel (Ender Pearls, a crafted item that costs materials). A kid's mod idea of "craft a teleport totem that costs 3 diamonds and only works between totems you've placed" is directly buildable — it's an item with a right-click behaviour that stores/reads block positions, well within Gemini/NeoForge's comfort zone. A "shortcut" idea (unlock a door after finding a key, or a boss-room exit warp) is also very buildable as a simple block/trigger. The "faster movement instead of teleport" idea (better boots, a mount) is squarely a Minecraft-native item-with-attribute-modifier — easy. The one thing that does NOT map cleanly: "must visit once before fast-travelling there" requires persisting per-player discovered-location state, which is more data-management than a beginner mod should attempt in week-by-week homework; better to just let the totem/waystone be placeable and used immediately.

### Doesn't transfer
The FFXIV hub-placement postmortem and the "serendipity vs menu-hopping" tension are real design lessons but are about balancing a large, already-built open world — not something an 11-13-year-old spec's on one page for a small mod dimension. Frame it as "keep your fast travel points few and spread out" as a one-line rule, not a whole worksheet.

## Honest caveats
The video's claims are all just observational commentary on shipped games — no data, no controversial claims to fact-check, nothing overstated beyond normal YouTube framing ("25 trillion games," hyperbole, not literal). No contradictions with anything else in this batch so far. My own addition, not the video's: the direct mapping to Minecraft's Ender Pearl/waystone-mod conventions — the video never mentions Minecraft.
