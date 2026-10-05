# Batch U4 — game feel/juice, pixel art, level design, AI-UI prompting

## Proposed library pages

### Page 1: "Juice: Making Clicks Feel Good"
Sources: `216_5nu4aVQ` (GMTK intro, 5.3min), `Fy0aCDmgnxg` (Juice it or Lose it, 15.6min), `AJdEqssNZ-U` (Art of Screenshake, 44.1min — assign [0:07:27]-[0:29:37] only, skip Q&A).
- **Sections:** (1) What is juice? — blank-room test, feedback loop diagram [`AJdEqssNZ-U` 0:02:06-0:05:57]. (2) Watch the demo — embed `Fy0aCDmgnxg` [0:02:39]-[0:09:26] (tweening + sound) as the spine, it's the clearest single watch. (3) The full technique list (below) as a lookup table, each with a paste-ready Gemini prompt. (4) "Turn-based still gets to be juicy" — all of it is frontend JS/CSS firing on click or on `google.script.run` callback; no real-time needed.
- **Embeds:** `Fy0aCDmgnxg` [0:02:39]-[0:05:39] (tween code + easing curves), [0:07:29]-[0:09:26] (the two-circles sound demo); `AJdEqssNZ-U` [0:12:56]-[0:14:07] (screenshake + "freight train mode" — the "more isn't always better" warning); `216_5nu4aVQ` [0:02:42]-[0:04:23] (fastest overview if short on time).
- **Exercises:** screenshot your main action button, list what happens in the 200ms after clicking it, add one thing from the table; add one sound effect and compare muted vs. not; give one object "eyes" that track game state.
- **Quiz:** juice vs. game feel; what tweening is; why sound changed the two-circles' perceived physics.

### Page 2: "Drawing Your Own Sprites"
Sources: `Md6W79jtLJM` (Aseprite Guide, 19min), `WUlgvNe4BLU` (How do you start Pixel Art, 12.7min).
- **Sections:** (1) Tool note up front — both use paid tools (Aseprite/Photoshop); kids use Piskel (free), buttons differ but concepts match. (2) Core moves: pixel-perfect lines, symmetry tool, 5-tool minimum (pen/eraser/eyedropper/fill/select) [`Md6W79jtLJM` 0:00:52-0:02:09, 0:11:56-0:12:48]. (3) Starting from a template, not a blank canvas; 3-color-limit exercise [`WUlgvNe4BLU` 0:02:44-0:03:48, 0:10:13-0:11:51]. (4) Making it work in a browser: `image-rendering: pixelated`, sprite sheets, frame-swapping, `imageSmoothingEnabled = false` — none of this is in either video, it's the bridge the teacher supplies.
- **Embeds:** `Md6W79jtLJM` [0:12:29]-[0:12:48] (speed-paint using only 5 tools); `WUlgvNe4BLU` [0:06:16]-[0:08:04] (live sprite edit, the only real before/after) and [0:10:13]-[0:11:51] (3-color exercise).
- **Exercises:** draw a face using a 2x2/1x2 pixel block for eyes; recolor a sprite with max 3 colors; check your sprite reads clearly at actual display size, not zoomed in.
- **Quiz:** what "contiguous/continuous" fill means; why start from a template.

### Page 3: "Level Design Without Words"
Sources: `ZH2wGpEZVgE` (Mario 1-1, 5.7min — assign whole thing), `pNvUWHquSHc` (So You Want to be a Level Designer, 8.8min, skip [0:07:00]+ sponsor).
- **Sections:** (1) Mario 1-1 walkthrough — affordance, signaling, safe first encounter, short iteration, graduated difficulty, secrets [`ZH2wGpEZVgE` 0:00:39-0:04:28]. (2) The professional version — research/reference, blockout-before-polish, metrics (your game's fixed numbers), player guidance [`pNvUWHquSHc` 0:00:32-0:06:56]. (3) Applying it to a turn-based dungeon crawler / idle clicker / quiz game — concrete per-genre translations already drafted in both notes' "Page material" sections.
- **Embeds:** `ZH2wGpEZVgE` full video (it's 5.7min and dense throughout); `pNvUWHquSHc` [0:00:32]-[0:02:43] and [0:05:56]-[0:06:56].
- **Exercises:** screenshot your app's first screen, would a stranger know what to do; write your game's fixed numbers as a list and paste it into every Gemini chat about that project; time how long "fail and retry" takes.
- **Quiz:** why the first Goomba moves instead of standing still; what a blockout is and why it's ugly on purpose.

### Page 4: "Prompting Gemini to Design UI"
Sources: `de068yMaf88` (Figma-Quality UI with AI, 18.5min — the core of this page), `qaB5HF4ax9M` (Fireship/Stitch, 4.8min — show 45sec clip only, don't assign whole).
- **Sections:** (1) Basic vs. detailed prompt, why vague prompts give generic results [`de068yMaf88` 0:02:14-0:05:35]. (2) The 6-part prompt formula (product, design direction, layout skeleton, visual system, components, technical) [0:06:10-0:08:27] — the single most reusable artifact in this whole batch. (3) One section/component at a time, never the whole page [0:10:42, 0:12:23-0:14:05]. (4) The "design notes" habit — write your style rules once, paste them into every new chat, since Gemini forgets [`qaB5HF4ax9M` 0:00:00-0:00:47, cross-referenced with `de068yMaf88`'s "skill" idea 0:08:58-0:11:48].
- **Embeds:** `de068yMaf88` [0:06:24]-[0:08:24] (the formula typed live, clearest teaching moment in the batch); [0:09:52]-[0:10:32] (a full example design-system doc, model its structure); `qaB5HF4ax9M` [0:00:00]-[0:00:47] only.
- **Exercises:** describe your current app's UI using the 6 categories, see what's missing; write a component-only refinement prompt vs. a whole-page one, compare accidental side-changes.
- **Quiz:** basic vs. detailed prompt; name the 6 formula parts.

## Combined juice technique list (deduplicated, grouped)
*Merged from `216_5nu4aVQ` (16), `Fy0aCDmgnxg` (23), `AJdEqssNZ-U` (31). Full source timestamps and exact wording are in each note; sources marked [A]=216_5nu4aVQ, [B]=Fy0aCDmgnxg, [C]=AJdEqssNZ-U.*

**Screen & camera:** "shake the screen 4px for 150ms on hit" [A/B/C] · "lerp the camera/highlight to its new spot over 200ms instead of snapping" [C] · "punch the camera 6px opposite the action direction, ease back over 150ms" [C] · "offset the view 10% toward whatever the player is acting on" [C] — camera reframing toward danger doesn't fit a static layout, treat as inspiration only [A/C].

**Timing (tween/pause/slow-mo):** "animate value changes over 300-500ms with an ease-out curve instead of snapping" [B] · "make it overshoot its target by 10-15% then settle back" [B] · "use a bouncy easing curve so it wobbles twice before settling" [B] · "stagger 5 items' entrance with a random 0-150ms delay each" [B] · "freeze all motion for 20ms (60ms on a big kill) right when a hit lands, before showing the result" [A/C] · "slow everything to ~1/3 speed for 2 seconds on the winning moment only" [C].

**Object reaction:** "flash the hit object white for 100ms then fade back" [A/B/C] · "nudge a hit object 8-10px away from the attacker and back" [A/B/C] · "squash to 90-95% then spring back over 100-200ms on click/impact" [A/B] · "nudge the acting element itself back 5-6px on its own action (recoil)" [A/C] · "rotate a moving sprite to face its direction of travel" [B] · "swap to a different sprite/animation on hit or defeat" [A].

**Sound:** "play a short, bassy, punchy sound the instant an action connects" [A/C] · "randomize between 2-3 sound variants (or ±10% pitch) so repeats don't sound identical" [A/C] · "raise pitch 10% per hit in a combo streak, reset on miss" [A] · "add a sound to every core action plus quiet looping background music" [B].

**Particles, trails, persistence:** "spawn 6-12 small particles that fly outward and fade over 300-700ms on impact/success" [A/B/C] · "draw a fading trail of the last 8 positions behind a moving object" [B] · "leave defeated enemies/results greyed-out on screen instead of deleting instantly" [A/C] · "fade + shrink a removed object over 400ms rather than popping it away" [B].

**Numbers/pacing (tuning, not code):** "make projectiles/icons at least 24px, not a tiny realistic dot" [A/C] · "prefer more, weaker opponents over one tanky one for the same total difficulty" [C] · "give a 20-33% random bonus-effect chance on success, purely for feel" [C].

**Personality & meaning:** "draw two circles as eyes on a game object that briefly hide every few seconds (blink)" [B] · "make an object's expression (smile/frown) track game state via a simple scaled shape" [B] · "reserve your biggest effect (slow-mo, big flash) for the one moment that's actually the point — not every action" [C] · "put all your juice on the game's core verb (click, roll, place) and leave everything else calm" [A].

**Accessibility:** "add a 'reduce motion' checkbox that turns off shake/flash effects" [C].

## Combined vocabulary (non-juice)
Affordance, negative space, signaling, short iteration cycle, graduated difficulty, secret/optional content, reference (image), blockout, metrics (game-design sense), guidance, landmark, pacing, `image-rendering: pixelated`, sprite sheet, frame-swapping/`steps()`, `imageSmoothingEnabled=false`, "vibe" description, design system, design.md (the habit, not the file), basic vs. detailed prompt, the 6-part prompt formula, "act as [role]" framing, avoid-list, section-by-section prompting, component-level follow-up edit, duplicate-then-edit.
