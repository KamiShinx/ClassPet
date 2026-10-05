# Aseprite Guide for Beginners (Pixelart Tutorial) (MortMort, 19.0 min)

**What it is / substance:** a straight button-by-button walkthrough of the Aseprite drawing tool's toolbar, layers panel and color panel, ending in a 4-second "before/after" title card and a speedrun cat drawing. **Is it good enough to assign to a 14-year-old as homework? With a guide.** It teaches a specific paid tool's UI (not free, ~$20 on Steam/itch.io), so a kid without Aseprite gets almost nothing from parts of it; but the underlying ideas it touches on (pixel-perfect lines, symmetry, layers, limited palettes, premade console palettes) are real pixel-art concepts that exist in free tools like Piskel too, just under different buttons/shortcuts.

**Watch-list:**
- [0:00:52]–[0:02:09] pencil/pen tool basics, pixel-perfect mode, symmetry tool — the most broadly useful minute.
- [0:12:29]–[0:12:48] speed-paint of a cat using only the tools already covered — shows the tools in real use, not just menus.
- [0:14:56]–[0:16:53] palette editor, sorting, and premade palettes (NES, Game Boy, Pico-8) — useful if a kid wants a "why does old-game pixel art look like that" answer.

## The ideas (in order, with [h:mm:ss])
- [0:00:12] Pencil/pen tool (key `B`): left-click draws, right-click erases, as long as the background color is set to "mask" (transparent).
- [0:00:47] Brush size can be typed or scrolled; brush shape can be square, line, or circle-with-angle.
- [0:01:05] **Pixel perfect mode**: an Aseprite-specific toggle that removes the doubled/jagged pixels you'd otherwise get from a normal mouse-drawn line, so quick strokes still look clean.
- [0:01:37] **Symmetry tool**: draw on one side of a guide line and Aseprite mirrors it to the other side automatically, horizontally or vertically.
- [0:01:37]–[0:02:09] **Ink modes**: "alpha" ink lets you control paint opacity (useful for blending); "simple" ink is flat, full-opacity color. Jargon: "ink" here just means how the pen's color is applied, not literal ink.
- [0:02:16] Line tool (`L`): drag to draw a straight line; hold Shift to snap to clean angles; hold Ctrl to draw from the center outward; combine both.
- [0:02:57] Curve line (`Shift+L`): after drawing a line, drag again to bend it into a curve — can be curved twice for an S-shape.
- [0:03:52] Shape tool (`U`): rectangles and ellipses, outline or filled (press `U` again to toggle), Shift = equal width/height, Ctrl = draw from center.
- [0:05:12] Contour tool (`D`): freehand-draw a closed outline and it auto-fills; polygon variant (`Shift+D`) clicks straight-line points instead.
- [0:06:16] Middle-click or Space+drag pans the canvas; scroll wheel zooms.
- [0:06:48] Eraser (`E`): same brush controls as the pen, but erases.
- [0:07:20] Eyedropper: instead of clicking the eyedropper icon, hold `Alt` to sample a color under the cursor, release to go back to the previous tool — a speed trick, not a new concept.
- [0:07:52] Paint bucket (`G`): fills connected color under the cursor. The **"continuous" option**, when unchecked, fills every pixel of that color on the whole layer, not just the connected blob — useful for recoloring, e.g. every red pixel becomes green in one click.
- [0:09:11] Selection tool (`M`) drags a rectangular selection you can move, fill, or draw inside — drawing is clipped to the selection. Magic wand (`W`) selects by clicked color; unchecking "contiguous" selects every matching pixel across the whole layer, and holding Shift adds more colors to the selection.
- [0:11:56]–[0:12:48] Speed-paint demo: draws a cat sprite using only pen, eraser, eyedropper, paint bucket, and selection — shown as proof these five tools cover most real work.
- [0:12:48] **Layers**: hidden by default; press `Tab` to show the layers/timeline panel at the bottom. Aseprite mixes layers with a frame-based timeline (more like Flash than Photoshop) — if you're not animating, ignore the frame numbers and only look at the layer rows.
- [0:13:36] Double-click a layer to open its properties: name, blend mode (leave as "normal" for now), and opacity (transparency).
- [0:14:06] New layer: `Shift+N`. Layers can be removed, duplicated, or merged down (combined with the layer below) via right-click.
- [0:14:56] Palette editor (`F4`): edit a color's exact value, switch between HSB/RGB, etc.
- [0:15:28] Sort palette by luminance, brightness, saturation, etc. — reorders swatches so similar colors sit together.
- [0:15:54] Gradient tool: select a range of palette swatches and it interpolates colors between them.
- [0:16:20] **Presets**: built-in community and console color palettes (NES, Game Boy, Pico-8) you can load and use directly, with credit links to their creators.
- [0:17:26] "Options" section: palette swatch size, layout presets, save/load a custom palette as a file, set a default palette for new documents, and "create palette from current sprite" (auto-extracts every color used in a loaded image into a usable palette).

## Vocabulary for prompting Gemini
This video is 100% about the manual craft of drawing in one specific paid tool (Aseprite). It contains **no code, no web/canvas terminology, and nothing about displaying or animating sprites in a browser** — there is nothing in the transcript to extract here honestly. The terms below are my own addition (not from the video), included because they're the natural next step once a kid has drawn a sprite in Aseprite/Piskel and wants Gemini to make it work correctly in their Apps Script web app:

| Term | Meaning | Example prompt phrase |
|---|---|---|
| `image-rendering: pixelated` | CSS rule that stops the browser from blurring a pixel-art image when it's scaled up | "make sure the sprite image doesn't get blurry when it's bigger — add image-rendering: pixelated in the CSS" |
| Sprite sheet | One image file containing multiple frames/poses laid out in a grid | "I have one image with 4 walking frames side by side, use it as a sprite sheet" |
| Frame swapping | Switching which image (or which part of a sprite sheet) is shown, on a timer, to animate | "swap the image every 200 milliseconds to animate the walk cycle" |
| `imageSmoothingEnabled = false` | Canvas setting that stops blurring when drawing a pixel-art image with `drawImage()` at a larger size | "when drawing the sprite on the canvas, turn off image smoothing so the pixels stay sharp" |
| Export size / canvas size mismatch | The pixel dimensions the art was drawn at (e.g. 32x32) vs. how big it's displayed | "the sprite was drawn at 32 by 32 pixels but should display at 128 by 128 — scale it up without blurring" |

## Before/after examples from the frames
Only one true before/after appears, at the very end: [0:18:24] a closing title card reading "That's the basic to get you started," showing a plain grey humanoid blob labeled "Before" next to a cleaner, shaded, better-posed grey character labeled "After," with a signpost graphic captioned "the road ahead!" No specifics are given about what changed technically — it's a motivational closing image, not a worked example, so there's nothing more to extract from it.

Elsewhere the frames just document tool use, not improvement: e.g. sheet_005/006 [0:09:04]–[0:10:56] show the "test Koopa Trooper" sprite being selected, magic-wand-selected by color, and partially erased purely to demonstrate the selection tools — the sprite itself isn't being improved.

## Page material
- **Rules of thumb:**
  - Turn on "pixel perfect" drawing mode (or equivalent) before freehand lines — it removes the stair-stepped doubles a mouse naturally makes.
  - Keep your background/erase color set to transparent ("mask"), or the eraser won't actually erase.
  - Learn 5 tools well (pen, eraser, eyedropper, fill, selection) before anything fancier — MortMort's own speed-paint only used those five.
  - Hold the eyedropper shortcut (Alt in Aseprite) instead of clicking the tool — sampling colors is something you'll do constantly.
  - Uncheck "contiguous" on the fill/select tool when you want to recolor every instance of a color at once, not just one blob.
  - Start from a premade palette (NES, Game Boy, Pico-8, or any small set) instead of picking colors freely — constraint makes early art look more consistent.
- **Exercises:**
  1. Draw any small shape with the pen tool, then try to recreate it using only the line and shape tools instead — notice which is faster for which parts.
  2. Make two layers, draw something different on each, then hide/show each with the layer panel to see how they combine.
  3. Load or type in a 4-color palette (even just black, white, and two others) and draw something using only those colors.
- **Quiz:**
  1. Q: What does "continuous" (or "contiguous") mean for the paint bucket/selection tool, and what happens when you turn it off? A: On, it only affects pixels touching where you clicked; off, it affects every pixel of that color across the whole layer.
  2. Q: Why would you use a limited color palette instead of picking any color? A: It's a real constraint from the video's toolset (premade console palettes) and, more generally, keeps small art visually consistent and easier to read.

## Caveats
- Almost entirely Aseprite-specific: exact keyboard shortcuts (`B`, `L`, `U`, `D`, `M`, `W`, `G`, `Shift+N`, `Tab`, `F4`), menu layout, and features like "pixel perfect" mode and the symmetry guide are this tool's implementation, though the underlying ideas (clean lines, mirrored/symmetrical drawing, layers, palettes) exist in free tools like Piskel under different names/buttons.
- Aseprite itself costs money; Ministry-account kids should use Piskel or a similar free tool and expect to hunt for equivalent buttons rather than following this video's clicks literally.
- The video is a feature tour, not a lesson in composition, shading, or "how to actually design a sprite" — it never explains why you'd pick one tool over another for a given result, just what each button does. A kid watching the whole thing gets tool fluency, not art skill.
- Nothing here is overrated or wrong, just narrow in scope — treat it as a reference/lookup video (watch the segment for the tool you need) rather than a single sit-through lesson.
