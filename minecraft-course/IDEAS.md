# Ideas for later lessons (from Ben, 17 Nov 2026)

Not built yet. Each idea has how Minecraft does it and how big the job is.
**Small** = the studio writes a few more game files, no new Java. **Medium** = some Java in `Kit.java`.
**Big** = new Java and its own lesson.

What a kid's block can do today: a 16×16 picture, a name, soft / normal / hard, how much light it gives
(the whole block glows), and what it drops. Any tool, or a bare hand, breaks it.

## 1. Glow pencils: only part of the block glows
Minecraft lights a block as a whole, but a model can draw a second picture on top that is always full-bright
(like the eyes of a spider). NeoForge allows this per part of a model.
The studio gets a "glow pencil": what it draws goes onto the top picture and glows in the dark; the rest stays
normal. The block's own light level stays a separate choice.
**Small to medium.** Two pictures per block and a model file with a full-bright layer.

## 2. Transparent pencils
Two kinds: a clear pencil (holes, like leaves or glass) and a see-through pencil (coloured glass, ice).
Minecraft calls them "cutout" and "translucent". The block also has to stop hiding the blocks behind it.
**Small.** One line in the model file and one in the block's settings.

## 3. Animated blocks
Minecraft animates a block by putting the frames one under the other in one picture and adding a small file that
says how fast (magma, sea lantern and prismarine work this way).
The studio gets frames: draw frame 1, copy it, change it, pick a speed.
**Small** for the game, **medium** for the drawing board (frames, onion skin, play button).

## 4. The dimension's sea in their own colour and picture
- Colour only: water can be tinted per dimension. **Small.**
- Lava in another colour, or a sea with their own picture (slime, honey, ink): that is a new liquid, with its own
  bucket, still and flowing pictures and fog colour. **Big**, its own lesson.

## 5. Blocks that do things: a chest of their own, and more
Kinds of block a kid could pick, from easy to hard:
- slab, stairs, wall, fence, pane (Minecraft's own shapes with their picture). **Small to medium.**
- door and trapdoor that open. **Medium.**
- a lamp that turns on with redstone, a jump pad, a block that hurts or heals when you stand on it. **Medium.**
- a chest of their own (holds items, opens a menu). A barrel-style one (no lid animation) is **medium**;
  a chest with an opening lid is **big**.

**The kids asked for this one most (Ben, 17 Nov): moving parts, like the chest lid opening.** In Minecraft that
is a block with a model of its own, drawn and moved by code every frame (chest lid, bell swing, a door that
slides). The studio already builds models from cubes in Blockbench style (lesson 3), so the plan is: the kid
builds the block's model, marks the part that moves (the lid), picks how it moves (opens up, spins, slides) and
when (when you open it, when someone is near, all the time). **Big**: one shared piece of Java that plays any
kid's movement, then each kid only makes choices. Worth its own lesson, maybe two.

## 6. More layers and richer generation
All of this is game files the studio writes, no Java:
- more layers than three, each with how deep it goes;
- different top blocks by height (snow on peaks, sand at the shore);
- more than one rare ore, in veins or in blobs, each with its own depth;
- caves on or off, and how many;
- several biomes inside one dimension, each with its own ground and plants.
**Medium.** The game handles it; the work is a studio screen that stays simple for an 11-year-old.

## 7. How the block is mined
- Which tool is right: pickaxe, shovel, axe or hoe (it breaks faster with the right one).
- Which tool level is needed: wood, stone, iron, diamond. With the wrong tool, nothing drops (like iron ore with a
  wooden pickaxe).
- A special item that keeps the block whole (like silk touch): with it, the block itself drops; with anything
  else, the normal drop.
- A drop that changes with the tool, or with luck (Fortune).
**Small.** Minecraft does all of this with tags and a drop file; the studio adds three choices to each block.

## Order I'd teach them in
7 (mining) and 2 (transparent) first: small, and every kid's block gets better at once. Then 1 (glow pencil) and
3 (animation), which are drawing lessons. Then 5 with moving parts (their chest with a lid), since the kids want
it most, then 6 (generation) as a second dimension lesson, and 4 (their own liquid) last.
