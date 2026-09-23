# Batch R summary — player experience: difficulty, no-damage, pain feedback, inventory UX, saves, corpse runs, sleep

Seven Design Doc videos, same house style (gameplay-footage montage, minimal on-screen text, taxonomy stated only
in narration). All substantive except the 5-minute Pain video, a thin early-channel primer. Corpse runs and sleep
are this batch's best material because Minecraft already ships a version of each system for kids to bend — the
brief's gold-standard case. Saves and inventory UX are the clearest "too heavy" cases: their best studies are
UI/save-file engineering no 11-13-year-old + Gemini pipeline can rebuild in a week.

## The 7 strongest ideas for this class

1. **Minecraft already has a corpse run — tune the dial, don't invent one** (`LDKIf16xSWg` [0:15:22] vanilla
   drop+despawn, [0:05:02]-[0:08:24] Soulslike severity dial, [0:12:42]-[0:19:11] failure cases). Best "bends an
   existing system" idea in the batch: pick one dial (severity, placement risk, a rescue item) and get a real
   NeoForge grave-block spec.
2. **Minecraft already has beds — tune what sleep costs, skips, or restores** (`7Zk4uJCMMTo` [0:06:06] BG3 rest
   costs, [0:19:52] FFXV reframes rest as reward not obligation). Second-best "bends an existing system" idea.
3. **"Don't punish the easy/optional choice" is a reusable cross-batch red flag.** Independently: Cuphead's
   Simple mode locking the finale (`Gpfgh02qJ4I` [0:12:30]), Kingdom Hearts' forced mid-fight sleep-swap
   (`7Zk4uJCMMTo` [0:15:35]). Worth a standing checklist line across every worksheet, not one lesson.
4. **"Redefine the resource, not just the number."** Once death is off the table, some OTHER resource must carry
   risk — Pizza Tower's combo rank, Wario Land's status effects (`F1RUOphHig4` [0:15:39]-[0:19:26]). Stops a
   kid's "invincible" item from becoming boring.
5. **"Two feedback channels, always"** (`0zs_2eEyKTc` [0:03:15]-[0:03:51]): every damage/effect needs a
   non-numeric signal (sound, particle, knockback) alongside the stat change. 5-10 min, applies to any combat
   mechanic all year.
6. **Risk/reward difficulty only works if the player feels in control of the risk** (`Gpfgh02qJ4I` [0:23:01]):
   Kid Icarus's intensity slider felt fair (losing tied to your own performance); Smash's port felt cheap once
   luck (random items, 8-player chaos) decided outcomes. A sharp lens for reviewing kids' own risk/reward items.
7. **"Scarce or abundant?" as a one-line spec question** (`5_3BUU9ZmNo` [0:07:27]) for any container/bag/currency
   item — useful even though the video's own case studies mostly don't transfer.

## Where videos agree, contradict, or leave a gap open

- **Three-way agreement on "don't ambush or punish the player for engaging with your own system"**: difficulty
  (Cuphead), sleep (Kingdom Hearts), and implicitly corpse runs (bad bloodstain placement) land on the same
  failure. Best candidate for a permanent class rubric line.
- **Unresolved tension between the two "redefine risk" videos**: no-damage argues invincibility needs a
  replacement stake to stay interesting; the corpse-run host says he personally dislikes high-stakes versions of
  exactly that, and his audience agrees. Both right for different games — tell Ben "match stakes to the feeling
  you want," not a rule to resolve.
- **Saves and inventory UX are a fit problem, not a contradiction**: well-made videos, but nearly all their best
  case studies are save-file or menu-screen engineering a NeoForge mod can't touch. Use only the buildable
  slivers flagged in each `notes/<id>.md`, not a full session.
- The pain/feedback video isn't wrong, just thin — fold its one good line into other sessions, no own slot.

## What I'd cut

- `rzk5CESZMDQ` (saves) beyond the respawn-anchor-cost idea — passwords, freeform-vs-designated saves, autosave
  soft-locking, save-scumming need save-file control the class doesn't have.
- `5_3BUU9ZmNo`'s menu/screen redesigns (Wind Waker GamePad, quickwheels, RE4 Tetris-packing, OoT Iron Boots) —
  real UI programming; keep only "scarce vs. abundant" and the cursed-item spec exercise.
- `0zs_2eEyKTc` as a standalone session — fold into whichever combat activity needs its one good line.
- Kingdom Hearts' dual-campaign swap, Citizen Sleeper's dice-economy, Brave Fencer Musashi's degrading-movement
  meter — each needs a bespoke system from scratch, too large for one spec-and-build class.

## Mechanic cards

- **"Grave dial"** — "Items drop on death like now, but you get 3 extra minutes if a mob is guarding the spot —
  fair, or does it punish dying near danger?" (`LDKIf16xSWg` [0:05:02]-[0:07:52])
- **"Sleep tax"** — "Sleeping instantly restores a stat, but only with 3 golden wheat on hand — what if you can't
  afford to sleep?" (`7Zk4uJCMMTo` [0:06:06]-[0:08:18], BG3 camp supplies)
- **"Stakes you control"** — "A potion makes you invincible 10s, but you take double damage the moment it wears
  off — fair, or does it need a warning?" (`Gpfgh02qJ4I` [0:23:01]; `F1RUOphHig4` [0:04:00])
- **"No free easy mode"** — "A weaker boss drops half the loot — should beating it still unlock the true final
  boss?" (`Gpfgh02qJ4I` [0:12:30] Cuphead Simple mode)
- **"Sleep as the better way"** — "Tranquilizing a mob gives a rarer drop than killing it — how much rarer before
  nobody fights it normally?" (`7Zk4uJCMMTo` [0:12:12] Dave the Diver)
- **"Redefine the loss"** — "This item makes you unkillable, but every hit drops one inventory item instead —
  what's the right trade?" (`F1RUOphHig4` [0:15:39]-[0:19:26])

## Verdict line

**Strengthens** the "layer, not pillar" verdict, unevenly. Corpse runs and sleep are the strongest "bend a real
Minecraft system" material found in any batch so far — player experience earns its place as tooltips/worksheets
layered onto mod features, not a new pillar, fitting the existing checklist approach (MDA, risk/reward dial).
Saves and inventory are the clearest examples yet of ideas that look like game design but are really engineering
scope the class can't reach — confirming the earlier batch's caution was correctly calibrated.
