package make.myworld;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import net.minecraft.core.BlockPos;
import net.minecraft.core.Direction;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.Identifier;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.sounds.SoundSource;
import net.minecraft.world.InteractionResult;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.SoundType;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.level.block.state.StateDefinition;
import net.minecraft.world.level.block.state.properties.BlockStateProperties;
import net.minecraft.world.level.block.state.properties.EnumProperty;
import net.minecraft.world.level.levelgen.Heightmap;
import net.neoforged.neoforge.common.NeoForge;
import net.neoforged.neoforge.event.entity.player.PlayerInteractEvent;
import net.neoforged.neoforge.event.tick.ServerTickEvent;
import net.neoforged.neoforge.registries.DeferredBlock;

/**
 * The portal to the kid's dimension, designed in the studio's "portal" tab: the frame block, the inside (the kid's
 * drawing), the item that lights it, standing up (like the Nether's) or lying on the ground (like the End's), and the
 * size of the inside. Build the frame in the game, light it from inside with the key item, and step in: you arrive in
 * the dimension next to a portal home. Kids never edit this file.
 */
public final class MyPortal {
    private MyPortal() {}

    /** The purple inside of the portal. It looks like the Nether's (tools/common.ps1 writes its model). */
    public static class PortalBlock extends Block {
        public static final EnumProperty<Direction.Axis> AXIS = BlockStateProperties.AXIS;   // y = lying on the ground
        public PortalBlock(Properties p) { super(p); registerDefaultState(stateDefinition.any().setValue(AXIS, Direction.Axis.X)); }
        @Override protected void createBlockStateDefinition(StateDefinition.Builder<Block, BlockState> b) { b.add(AXIS); }
    }

    static final DeferredBlock<Block> PORTAL = Kit.BLOCKS.registerBlock("dimension_portal",
            p -> new PortalBlock(p.noCollision().noOcclusion().instabreak().noLootTable().lightLevel(s -> 11).sound(SoundType.GLASS)));

    /** From the studio: the frame block and the key item, e.g. "myworld:block_1" and "minecraft:flint_and_steel". */
    static String frame = "minecraft:crying_obsidian", key = "minecraft:flint_and_steel";
    /** Lying on the ground, and the inside's size (0 = any size). */
    static boolean flat = false;
    static int width = 2, height = 3;

    private static final Map<UUID, Integer> INSIDE = new HashMap<>();     // how long each player has stood in a portal
    private static final Set<UUID> ARRIVED = new HashSet<>();             // just came through: wait until they step out
    private static final Map<UUID, BlockPos> HOME = new HashMap<>();      // where they left the Overworld

    static void load() {}

    static void register() {
        NeoForge.EVENT_BUS.addListener(MyPortal::onClick);
        NeoForge.EVENT_BUS.addListener(MyPortal::onServerTick);
    }

    private static Block frameBlock() {
        Identifier id = Identifier.tryParse(frame);
        return id != null && BuiltInRegistries.BLOCK.containsKey(id) ? BuiltInRegistries.BLOCK.getValue(id) : Blocks.CRYING_OBSIDIAN;
    }

    /** Right-click the frame with the key: if the frame is closed, the inside fills with portal. */
    private static void onClick(PlayerInteractEvent.RightClickBlock event) {
        if (!(event.getLevel() instanceof ServerLevel level) || event.getFace() == null) return;
        Identifier keyId = Identifier.tryParse(key);
        if (keyId == null || !BuiltInRegistries.ITEM.containsKey(keyId)) return;
        Item keyItem = BuiltInRegistries.ITEM.getValue(keyId);
        if (!level.getBlockState(event.getPos()).is(frameBlock())) return;
        if (!event.getItemStack().is(keyItem)) {
            // Building the frame (a block in hand) stays quiet; anything else is a kid trying to light it.
            if (!(event.getItemStack().getItem() instanceof BlockItem) && event.getEntity() instanceof ServerPlayer p)
                p.sendOverlayMessage(Component.literal("Light the portal with: " + keyItem.getName(keyItem.getDefaultInstance()).getString()));
            return;
        }
        event.setCanceled(true);
        event.setCancellationResult(InteractionResult.SUCCESS);
        // Kids click the frame from the front, the side or the top: try the space on every side of the clicked block.
        BlockPos lit = null;
        if (light(level, event.getPos().relative(event.getFace()))) lit = event.getPos().relative(event.getFace());
        for (Direction d : Direction.values()) if (lit == null && light(level, event.getPos().relative(d))) lit = event.getPos().relative(d);
        if (lit != null) {
            sound(level, lit, "block.portal.trigger");
        } else if (event.getEntity() instanceof ServerPlayer p) {
            String size = width > 0 ? " The inside must be " + width + " x " + height + "." : "";
            p.sendOverlayMessage(Component.literal("The portal didn't light: build the whole frame, and light it from the inside." + size));
        }
    }

    /** Fills the space inside a closed frame of the right shape and size with portal. */
    static boolean light(ServerLevel level, BlockPos start) {
        if (!empty(level.getBlockState(start))) return false;
        Block f = frameBlock();
        Direction.Axis[] planes = flat ? new Direction.Axis[] { Direction.Axis.Y } : new Direction.Axis[] { Direction.Axis.X, Direction.Axis.Z };
        for (Direction.Axis axis : planes) {
            Set<BlockPos> inside = new HashSet<>();
            Deque<BlockPos> todo = new ArrayDeque<>();
            todo.add(start);
            boolean closed = true;
            while (!todo.isEmpty() && closed) {
                BlockPos p = todo.poll();
                if (!inside.add(p)) continue;
                if (inside.size() > 64) { closed = false; break; }   // not a frame: open space
                BlockPos[] next = axis == Direction.Axis.X ? new BlockPos[] { p.above(), p.below(), p.east(), p.west() }
                                : axis == Direction.Axis.Z ? new BlockPos[] { p.above(), p.below(), p.south(), p.north() }
                                : new BlockPos[] { p.east(), p.west(), p.south(), p.north() };
                for (BlockPos n : next) {
                    if (inside.contains(n)) continue;
                    BlockState s = level.getBlockState(n);
                    if (s.is(f)) continue;
                    if (empty(s)) todo.add(n); else { closed = false; break; }
                }
            }
            if (closed && inside.size() >= 2 && fits(inside, axis)) {
                BlockState st = PORTAL.get().defaultBlockState().setValue(PortalBlock.AXIS, axis);
                for (BlockPos p : inside) level.setBlock(p, st, Block.UPDATE_CLIENTS);
                return true;
            }
        }
        return false;
    }

    /** Air, or grass, flowers and snow that the portal simply replaces (a frame built on a lawn has grass inside). */
    private static boolean empty(BlockState s) {
        return s.isAir() || (s.canBeReplaced() && s.getFluidState().isEmpty() && !s.is(PORTAL.get()));
    }

    /** The inside is a full rectangle of the size the kid chose (width across, height up; lying down: width by height). */
    private static boolean fits(Set<BlockPos> inside, Direction.Axis axis) {
        int minA = Integer.MAX_VALUE, maxA = Integer.MIN_VALUE, minB = Integer.MAX_VALUE, maxB = Integer.MIN_VALUE;
        for (BlockPos p : inside) {
            int a = axis == Direction.Axis.Z ? p.getZ() : p.getX(), b = axis == Direction.Axis.Y ? p.getZ() : p.getY();
            minA = Math.min(minA, a); maxA = Math.max(maxA, a); minB = Math.min(minB, b); maxB = Math.max(maxB, b);
        }
        int w = maxA - minA + 1, h = maxB - minB + 1;
        if (w * h != inside.size()) return false;   // not a rectangle
        if (width <= 0) return true;
        return axis == Direction.Axis.Y ? (w == width && h == height) || (w == height && h == width) : w == width && h == height;
    }

    /** Standing in a portal: a moment in Creative, two seconds in Survival, then you go through. */
    private static void onServerTick(ServerTickEvent.Post event) {
        if (event.getServer().getTickCount() % 5 != 0) return;
        for (ServerPlayer p : event.getServer().getPlayerList().getPlayers()) {
            UUID id = p.getUUID();
            boolean in = p.level().getBlockState(p.blockPosition()).is(PORTAL.get());
            if (!in) { INSIDE.remove(id); ARRIVED.remove(id); continue; }
            if (ARRIVED.contains(id)) continue;
            int t = INSIDE.merge(id, 5, Integer::sum);
            if (t >= (p.isCreative() ? 5 : 40)) {
                INSIDE.remove(id);
                ARRIVED.add(id);
                go(p);
            }
        }
    }

    /** Through the portal: from anywhere to the kid's dimension, and from there home to the Overworld. */
    static void go(ServerPlayer p) {
        if (!(p.level() instanceof ServerLevel from)) return;
        boolean home = from.dimension() == MyDimension.KEY;
        ServerLevel to = from.getServer().getLevel(home ? Level.OVERWORLD : MyDimension.KEY);
        if (to == null) {
            p.sendOverlayMessage(Component.literal("There's no dimension yet: build it in the studio, then open the game again."));
            return;
        }
        int x = (int) Math.floor(p.getX()), z = (int) Math.floor(p.getZ());
        BlockPos at;
        if (home) {
            at = HOME.get(p.getUUID());
            if (at == null) { to.getChunk(x >> 4, z >> 4); at = new BlockPos(x, to.getHeight(Heightmap.Types.MOTION_BLOCKING_NO_LEAVES, x, z), z); }
        } else {
            if (from.dimension() == Level.OVERWORLD) HOME.put(p.getUUID(), p.blockPosition());
            at = MyDimension.arrive(to, x, z);
            portalHome(to, at);
        }
        p.teleportTo(to, at.getX() + 0.5, at.getY(), at.getZ() + 0.5, Set.of(), p.getYRot(), p.getXRot(), true);
        p.resetFallDistance();
        sound(to, at, "block.portal.travel");
        if (!home) MyDimension.welcome(p);
    }

    /** The way back: the kid's portal, already built and lit, two steps from where you arrive. */
    private static void portalHome(ServerLevel level, BlockPos at) {
        BlockState f = frameBlock().defaultBlockState();
        int w = width > 0 ? width : 2, h = height > 0 ? height : 3;
        BlockState in = PORTAL.get().defaultBlockState().setValue(PortalBlock.AXIS, flat ? Direction.Axis.Y : Direction.Axis.X);
        for (int a = 0; a <= w + 1; a++) for (int b = 0; b <= h + 1; b++) {
            boolean edge = a == 0 || a == w + 1 || b == 0 || b == h + 1;
            BlockPos p = flat ? at.offset(a + 2, -1, b - 1) : at.offset(a + 2, b - 1, 0);
            level.setBlock(p, edge ? f : in, Block.UPDATE_CLIENTS);
        }
    }

    private static void sound(ServerLevel level, BlockPos pos, String name) {
        Identifier id = Identifier.parse("minecraft:" + name);
        if (BuiltInRegistries.SOUND_EVENT.containsKey(id)) level.playSound(null, pos, BuiltInRegistries.SOUND_EVENT.getValue(id), SoundSource.BLOCKS, 0.6f, 1f);
    }
}
