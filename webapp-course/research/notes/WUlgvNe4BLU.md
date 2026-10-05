# "How do you start Pixel Art?"...Here's what I did! (Brandon James Greer, 12.7 min)

**What it is / substance:** a personal-journey talk (not a tool tutorial — done in Photoshop, shown briefly) about how the creator learned pixel art by editing existing NES Mega Man-style sprites before finding his own style, plus a live demo of limiting a palette to 3 colors. **Is it good enough to assign to a 14-year-old as homework? With a guide.** The core advice (small canvas, few colors, learn from an existing template) is solid and stated plainly, but a third of the runtime is autobiography/portfolio history ("in 2016 I did this, in 2017 I did that") that a 14-year-old will likely tune out; point them at specific timestamps rather than the whole thing.

**Watch-list:**
- [0:02:44]–[0:03:48] why the Mega Man sprite works as a learning template (clear outlines, readable eyes) — the single most transferable idea in the video.
- [0:06:16]–[0:08:04] live edit of the Blanca-style sprite — the only real "before/after, here's what and why" segment.
- [0:10:13]–[0:11:51] the 3-color-limit exercise and the "off-white highlight" tip — concrete and easy to copy.

## The ideas (in order, with [h:mm:ss])
- [0:00:32] His standard advice to beginners: use a **low resolution** (small canvas) and **restrict yourself to a few colors**. He admits this advice is easy to say after 8 years but unhelpful on its own if you don't know what pixel art is even supposed to look like.
- [0:01:06] He started by making **sprite edits** ("paint-overs") of existing NES Mega Man sprites rather than drawing from nothing.
- [0:02:11] He calls Mega Man-style edits a cliché starting point — many beginners do exactly this, and you can usually find existing fan edits of any character.
- [0:02:44] Why Mega Man specifically works as a **template**: the body's bold line work clearly separates where gloves/boots/other pieces go, so you can swap in new shapes without guessing the proportions.
- [0:03:15] Jargon: the eyes are built from a "2x2 unit" (a 2x2-pixel block) with white space around it for readability, and a smaller "1x2" for the other eye to suggest the head is turned — i.e., a few pixels' arrangement can imply facial expression and perspective.
- [0:03:48] Once the existing line work runs out (a headband, a flat-top haircut), the beginner has to invent new pixel shapes — he calls this the point where you actually start "learning pixel logic," meaning: how to translate a real-world shape into a small grid of pixels.
- [0:04:20] Over time, making many characters this way builds what he calls a **mental library of design solutions** — shapes and tricks you've already solved once, reusable on future sprites.
- [0:04:52] He's careful to say this is not "trace everything forever" — early derivative work is normal (he calls it "training wheels"), and personal style comes later.
- [0:05:25] His jump to a personal style came when the tiny Mega Man-sized sprites felt too restrictive to fit detail or better poses — he moved to a **larger canvas size** (Star Wars characters, then Titanfall 2 faction leaders).
- [0:05:57] General idea, not tied to size: **experiment with a design once you have a base** — deviating from the template on purpose is what builds a personal style.
- [0:06:16]–[0:08:04] Live example: reworking a Street-Fighter-style sprite (Blanca). He enlarges the head to fit a tooth, removes the clashing eye shape, redraws the eyes as solid white, stretches the whole sprite larger, thickens the hair silhouette, adds extra corner pixels to line work to read as "spiky," and adjusts the pose (hunched stance, dropped head) to feel more monstrous — ends up "much larger-feeling" without being much taller, because it got wider.
- [0:08:16]–[0:09:41] Second live example (Guile-style): posing fists forward by drawing the arm separately then pasting/nudging it into place so it doesn't cover the face; shrinking oversized cartoon eyes to feel more focused; tilting a flat-top haircut at an angle for dynamism; using a **dotted line** instead of a solid line to separate hair from head (softer than a hard outline, adds texture) — reused along the boots to suggest grip texture.
- [0:09:41] His point about small pixel canvases: at low resolution, one pixel's placement makes a disproportionately large visual difference, so it's worth experimenting pixel by pixel.
- [0:10:13] Alternative to using an existing character template: start from primitive shapes (a circle for a head, plus simple shapes for hands/feet) — a template just gives you built-in guidance on proportions and color placement that you'd otherwise have to work out yourself.
- [0:10:45]–[0:11:17] **3-color-limit exercise**: recolor several sprites using at most 3 colors each — typically black, white, and one accent color. Constraint forces you to reuse colors cleverly (e.g. he only thought to add hair highlights because he needed another use for his limited palette).
- [0:11:17] **Tip**: instead of pure white for your lightest tone, use a color with a slight hue (he uses a warm yellowish tone) — reads as softer contrast and doubles as a skin-tone-adjacent color.
- [0:11:51] He offers a free downloadable blank character template + a starter palette (adapted from NES-style colors) for viewers to practice with.

## Vocabulary for prompting Gemini
This video, like the Aseprite one, is entirely about manual drawing/design craft (in Photoshop) — it has **no code or web-display terminology at all**. The table below is my own addition, not from the video, offered because the same "small sprite, few colors" art these techniques produce needs specific code handling to look right in a browser game:

| Term | Meaning | Example prompt phrase |
|---|---|---|
| `image-rendering: pixelated` | CSS rule stopping the browser from blurring a scaled-up pixel image | "scale the sprite up 4x in CSS but keep the edges sharp, not blurry" |
| Sprite sheet / frame index | One image holding several poses/frames; code picks which frame to show by its position | "the sprite sheet has 4 frames in a row, show frame 2 when the character is hit" |
| CSS `steps()` animation | A CSS animation-timing function that jumps between frames instead of smoothly sliding, matching hand-drawn frame animation | "animate the walk cycle using steps() so it snaps between frames instead of sliding" |
| Canvas `drawImage()` without smoothing | Drawing a pixel-art image onto an HTML canvas at a larger size while disabling smoothing so it stays crisp | "draw the sprite on the canvas at double size without smoothing" |
| Palette-consistent hex codes | Keeping the exact colors from the drawn palette in the CSS/JS instead of new random colors, so UI matches the art | "use the same 3 hex colors from my character's palette for the health bar" |

## Before/after examples from the frames
The contact sheets confirm two clear iterative-refinement sequences (matching the transcript, not just claimed from audio):
- **[0:06:24]–[0:08:00]** (sheet_004): a small tan/gold ape-like reference sprite sits next to a green Blanca-style recolor that visibly changes across the frames — the green figure's hair grows taller and thicker, the torso widens, and the stance shifts from upright to more hunched between roughly [0:06:32] and [0:07:52]. By [0:08:00] a 4-step arrow sequence is shown (small → progressively refined) summarizing the transformation.
- **[0:08:24]–[0:09:20]** (sheet_005): a similar two-sprite layout (reference figure + a green/yellow recolor) shows the yellow-haired figure's fists and stance change pose across frames, with a 4-frame arrow progression again shown around [0:09:20].
- **[0:09:28]–[0:10:32]** (sheet_005/006): full grids of 8 characters (Ryu, Ken, Chun-Li, Guile, plus 4 Marvel-style figures) shown first fully grayscale/outline-only, then fully colored — a "roster complete" moment rather than a step-by-step change.
- **[0:02:40]–[0:03:20]** (sheet_002): a callout frame explicitly labeled "24px" measures the Mega Man template's height, and later frames zoom into just the eye (a black square in a white border) with an arrow — visually matching the transcript's point about the 2x2/1x2 eye unit and canvas-size reference.
- **[0:12:00]–[0:12:24]** (sheet_006): the promised downloadable template appears on screen — a grid of grey silhouette heads/bodies plus a labeled palette swatch, and separate rows of sample circles, hands, heads and eyes to practice drawing variations of each.
- Frames at [0:02:16]–[0:02:24] (sheet_002) show a Google Images search results page for Mega Man pixel art fan sprites — illustrating his point ([0:02:11]) that this is a common, easy-to-find style to copy from, not a demonstrated technique.

## Page material
- **Rules of thumb:**
  - Start from an existing, well-designed sprite (a "template") instead of a blank canvas — copy its proportions and line work, then swap in your own shape ideas.
  - Keep your first canvas small and your first palette to 3 colors (black, white, one accent) — the constraint forces useful decisions instead of overwhelming choice.
  - Use an off-white/slightly tinted color for highlights instead of pure white — softer contrast, and it can double as a skin tone.
  - A dotted line (instead of solid) can separate two adjacent shapes (like hair and head) more softly and add texture.
  - It's fine — expected, even — for early work to look derivative of what you copied; your own style comes from later, deliberate deviation from the template.
  - At small pixel sizes, moving a single pixel or changing one small shape (like an eye) has an outsized visual effect — it's worth experimenting.
- **Exercises:**
  1. Take any character (from a game, show, or your own game) and try to redraw its face using only a handful of pixels, focusing on making the eyes read clearly at a glance.
  2. Recolor a sprite (yours or a placeholder) using a maximum of 3 colors; notice what you have to give up or combine.
  3. Screenshot your in-progress game character and check: does it read clearly at the actual size it'll be shown on screen, or only when zoomed in?
- **Quiz:**
  1. Q: Why does the video recommend starting from an existing sprite/template instead of a blank canvas? A: A good template already shows proportions and how colors divide up the body, so a beginner isn't solving proportion and shape from scratch at the same time as drawing.
  2. Q: What's the suggested alternative to using pure white as your lightest color, and why? A: A slightly tinted/off-white color (e.g. pale yellow) — it gives softer contrast and can double as a useful color (like skin tone).
- **For game videos — Apps Script/turn-based fit:** the video's core lessons (small consistent canvas size, limited palette, copying a template to learn proportions, iterating a pose) apply directly to drawing a player/enemy sprite for a turn-based or idle browser game — none of it requires real-time or smooth movement. What doesn't fit: the pose-refinement work shown (fists forward, hunching stance, dynamic angles) is aimed at expressive action poses for a side-scrolling action game; a turn-based/idle Apps Script game usually just needs one or two static poses per character (idle + maybe "attack" or "hurt"), so a kid can skip the heavier pose-iteration advice and focus on the palette-limiting and template-copying ideas instead.

## Caveats
- Made in Photoshop, not a dedicated pixel-art tool — no Aseprite/Piskel-specific buttons to flag, which also means everything here transfers to any tool including free ones.
- Large chunks (roughly [0:01:06]–[0:02:11] and [0:04:20]–[0:05:57]) are autobiographical portfolio narration (what he made in which year) rather than teaching — accurate as description of his own history but not something to hold a 14-year-old's attention; safe to skip.
- The "Mega Man edit" starting method is explicitly framed by the creator himself as a common/clichéd approach ([0:02:11]) — not a unique technique, just a reliably good beginner entry point.
- The video never shows resolution or exact pixel dimensions being chosen deliberately (aside from the one "24px" height callout) — a kid looking for a concrete "use a 32x32 canvas" rule won't find one here; that specificity is not in this video.
- Nothing here is outdated exactly, but it assumes a level of comfort with re-drawing/tracing over reference sprites for learning purposes — worth a quick note that this is meant as a private practice method, not something to publish as original work.
