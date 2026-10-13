package edu.islands;

import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.screens.TitleScreen;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.Identifier;
import net.minecraft.resources.ResourceKey;
import net.minecraft.world.Difficulty;
import net.minecraft.world.flag.FeatureFlags;
import net.minecraft.world.level.GameRules;
import net.minecraft.world.level.GameType;
import net.minecraft.world.level.LevelSettings;
import net.minecraft.world.level.WorldDataConfiguration;
import net.minecraft.world.level.levelgen.WorldOptions;
import net.minecraft.world.level.levelgen.presets.WorldPreset;
import net.neoforged.api.distmarker.Dist;
import net.neoforged.bus.api.SubscribeEvent;
import net.neoforged.fml.common.EventBusSubscriber;
import net.neoforged.neoforge.client.event.ScreenEvent;

/**
 * The first time the title screen appears, open the lesson the hub asked for: the existing world if the kid has
 * already started this lesson, otherwise a new one (an endless sea; the datapack builds the island on top).
 * Without a lesson.txt (Minecraft started some other way) the title screen stays as it is.
 */
@EventBusSubscriber(modid = Islands.MOD_ID, value = Dist.CLIENT)
public final class LessonBoot {
    private LessonBoot() {}

    /** While we test, cheats stay on so the teacher can fix things with commands. For the kids this becomes false. */
    static final boolean ALLOW_COMMANDS = true;
    private static final ResourceKey<WorldPreset> SEA =
            ResourceKey.create(Registries.WORLD_PRESET, Identifier.fromNamespaceAndPath(Islands.MOD_ID, "sea"));

    private static boolean done = false;

    @SubscribeEvent
    public static void onScreenInit(ScreenEvent.Init.Post event) {
        if (done || !(event.getScreen() instanceof TitleScreen)) return;
        done = true;
        int lesson = Lesson.requested();
        if (lesson == 0) return;
        Minecraft mc = Minecraft.getInstance();
        // After the title screen has finished opening, not in the middle of it.
        mc.execute(() -> open(mc, lesson));
    }

    private static void open(Minecraft mc, int lesson) {
        String world = Lesson.worldName(lesson);
        Runnable back = () -> mc.setScreen(new TitleScreen());
        try {
            if (mc.getLevelSource().levelExists(world)) {
                mc.createWorldOpenFlows().openWorld(world, back);
                return;
            }
            LevelSettings settings = new LevelSettings(world, GameType.SURVIVAL, false, Difficulty.PEACEFUL,
                    ALLOW_COMMANDS, new GameRules(FeatureFlags.DEFAULT_FLAGS), WorldDataConfiguration.DEFAULT);
            WorldOptions options = new WorldOptions(20261013L, false, false);
            mc.createWorldOpenFlows().createFreshLevel(world, settings, options,
                    registries -> registries.lookupOrThrow(Registries.WORLD_PRESET).getOrThrow(SEA).value().createWorldDimensions(),
                    new TitleScreen());
        } catch (Exception e) {
            // Never leave the kid stuck: the normal title screen still works.
            org.slf4j.LoggerFactory.getLogger(Islands.MOD_ID).error("Could not open lesson " + lesson, e);
            back.run();
        }
    }
}
