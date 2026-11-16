package make.myworld;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.stream.Stream;

import net.minecraft.core.BlockPos;
import net.minecraft.core.registries.Registries;
import net.minecraft.network.chat.Component;
import net.minecraft.network.protocol.game.ClientboundSetTitleTextPacket;
import net.minecraft.resources.Identifier;
import net.minecraft.resources.ResourceKey;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.entity.ai.attributes.AttributeInstance;
import net.minecraft.world.entity.ai.attributes.AttributeModifier;
import net.minecraft.world.entity.ai.attributes.Attributes;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.level.levelgen.Heightmap;
import net.minecraft.world.level.storage.LevelResource;
import net.neoforged.neoforge.common.NeoForge;
import net.neoforged.neoforge.event.server.ServerAboutToStartEvent;
import net.neoforged.neoforge.event.tick.ServerTickEvent;

/**
 * The kid's own dimension, designed in the studio's "my dimension" panel. Its ground, sky and plants are data files
 * that tools/common.ps1 writes before every Play (data/myworld/dimension/my_dimension.json and the files it names).
 * This class does the rest: where you land when you arrive, and the dimension's gravity. Kids never edit this file.
 */
public final class MyDimension {
    private MyDimension() {}

    public static final ResourceKey<Level> KEY = ResourceKey.create(Registries.DIMENSION, Identifier.fromNamespaceAndPath(MyWorld.MOD_ID, "my_dimension"));
    private static final Identifier GRAVITY = Identifier.fromNamespaceAndPath(MyWorld.MOD_ID, "dimension_gravity");

    /** "low", "normal" or "high", from the studio. */
    static String gravity = "normal";
    /** The dimension's name from the studio: shown big on the screen when you arrive. */
    static String name = "";
    /** The ground's design (shape, layers, sea, mineral, plants) as text, to see when it changed. */
    static String ground = "";

    static void register() {
        NeoForge.EVENT_BUS.addListener(MyDimension::onServerTick);
        NeoForge.EVENT_BUS.addListener(MyDimension::onAboutToStart);
    }

    /**
     * A new ground design means a new dimension. Minecraft keeps the ground it already made, so places you visited
     * would stay as they were. Before the world opens, the dimension's saved ground moves aside (to
     * my_dimension_before, one copy), and the game makes it again from the new design.
     */
    private static void onAboutToStart(ServerAboutToStartEvent event) {
        try {
            Path dims = event.getServer().getWorldPath(LevelResource.ROOT).resolve("dimensions").resolve(MyWorld.MOD_ID);
            Path dir = dims.resolve("my_dimension"), stamp = dir.resolve("myworld_ground.txt");
            String old = Files.exists(stamp) ? Files.readString(stamp, StandardCharsets.UTF_8) : null;
            if (Files.isDirectory(dir.resolve("region")) && !ground.equals(old)) {
                Path before = dims.resolve("my_dimension_before");
                if (Files.exists(before)) try (Stream<Path> all = Files.walk(before)) { all.sorted(Comparator.reverseOrder()).forEach(p -> p.toFile().delete()); }
                Files.move(dir, before);
            }
            Files.createDirectories(dir);
            Files.writeString(stamp, ground, StandardCharsets.UTF_8);
        } catch (IOException | RuntimeException e) {
            System.err.println("[myworld] dimension ground not checked: " + e);
        }
    }

    /** Twice a second: a player in the dimension gets its gravity, and loses it again when they leave. */
    private static void onServerTick(ServerTickEvent.Post event) {
        if (event.getServer().getTickCount() % 10 != 0) return;
        double change = switch (gravity) { case "low" -> -0.7; case "high" -> 0.8; default -> 0; };
        for (ServerPlayer p : event.getServer().getPlayerList().getPlayers()) {
            AttributeInstance g = p.getAttribute(Attributes.GRAVITY);
            if (g == null) continue;
            if (change != 0 && p.level().dimension() == KEY) {
                g.addOrUpdateTransientModifier(new AttributeModifier(GRAVITY, change, AttributeModifier.Operation.ADD_MULTIPLIED_BASE));
                AttributeInstance fall = p.getAttribute(Attributes.SAFE_FALL_DISTANCE);   // low gravity: long falls don't hurt
                if (fall != null && change < 0) fall.addOrUpdateTransientModifier(new AttributeModifier(GRAVITY, 20, AttributeModifier.Operation.ADD_VALUE));
            } else if (g.getModifier(GRAVITY) != null) {
                g.removeModifier(GRAVITY);
                AttributeInstance fall = p.getAttribute(Attributes.SAFE_FALL_DISTANCE);
                if (fall != null) fall.removeModifier(GRAVITY);
            }
        }
    }

    /** The dimension's name in big letters, as the game shows a new place. */
    static void welcome(ServerPlayer p) {
        if (!name.isBlank()) p.connection.send(new ClientboundSetTitleTextPacket(Component.literal(name)));
    }

    /**
     * A safe place to land near x, z: on the ground, with room to stand, not in a sea of lava. Looks a little way
     * around for land (islands in the air have gaps), and builds a small floor of glass if it finds none.
     */
    static BlockPos arrive(ServerLevel to, int x, int z) {
        boolean roof = to.dimensionType().hasCeiling();
        for (int r = 0; r <= 96; r += 16) {   // islands in the air can be far apart
            for (int dx = -r; dx <= r; dx += 16) for (int dz = -r; dz <= r; dz += 16) {
                if (Math.max(Math.abs(dx), Math.abs(dz)) != r) continue;
                BlockPos at = stand(to, x + dx, z + dz, roof);
                if (at != null) return at;
            }
        }
        int y = Math.max(to.getMinY() + 2, Math.min(to.getSeaLevel() + 1, to.getMaxY() - 4));
        BlockPos at = new BlockPos(x, roof ? to.getMinY() + to.getLogicalHeight() / 2 : y + 20, z);
        for (int dx = -1; dx <= 1; dx++) for (int dz = -1; dz <= 1; dz++) {
            to.setBlockAndUpdate(at.offset(dx, -1, dz), Blocks.GLASS.defaultBlockState());
            for (int dy = 0; dy < 3; dy++) to.setBlockAndUpdate(at.offset(dx, dy, dz), Blocks.AIR.defaultBlockState());
        }
        return at;
    }

    private static BlockPos stand(ServerLevel to, int x, int z, boolean roof) {
        to.getChunk(x >> 4, z >> 4);   // loads (or makes) the ground there first: an unloaded chunk has no height
        int top = roof ? to.getMinY() + to.getLogicalHeight() - 2 : to.getHeight(Heightmap.Types.MOTION_BLOCKING_NO_LEAVES, x, z);
        for (int y = top; y > to.getMinY() + 1; y--) {
            BlockPos p = new BlockPos(x, y, z);
            BlockState below = to.getBlockState(p.below());
            if (!roof && y < top) return null;   // open sky: only the top of the ground counts
            if (to.getBlockState(p).isAir() && to.getBlockState(p.above()).isAir() && below.isSolid() && below.getFluidState().isEmpty()) return p;
        }
        return null;
    }
}
