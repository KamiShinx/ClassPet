package edu.islands;

import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.screens.AccessibilityOnboardingScreen;
import net.minecraft.client.gui.screens.TitleScreen;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.Identifier;
import net.minecraft.resources.ResourceKey;
import net.minecraft.world.Difficulty;
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
 * The first time the title screen (or, on a new computer, the welcome screen) appears, open the lesson the hub asked for: the existing world if the kid has
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

    /** Lesson 20 is the space demo: a moon plain under a black sky (tools/gen_space.py). */
    private static final ResourceKey<WorldPreset> MOON =
            ResourceKey.create(Registries.WORLD_PRESET, Identifier.fromNamespaceAndPath(Islands.MOD_ID, "moon"));

    private static boolean done = false;

    @SubscribeEvent
    public static void onScreenInit(ScreenEvent.Init.Post event) {
        // The very first start on a computer shows Minecraft's accessibility welcome screen instead of the title screen.
        boolean welcome = event.getScreen() instanceof AccessibilityOnboardingScreen;
        if (done || !(welcome || event.getScreen() instanceof TitleScreen)) return;
        done = true;
        int lesson = Lesson.requested();
        if (lesson == 0) return;
        Minecraft mc = Minecraft.getInstance();
        if (welcome) mc.options.onboardingAccessibilityFinished();   // answered once, never shown again
        // After the title screen has finished opening, not in the middle of it.
        mc.execute(() -> open(mc, lesson));
    }

    private static void open(Minecraft mc, int lesson) {
        String world = Lesson.worldName(lesson);
        Runnable back = () -> mc.gui.setScreen(new TitleScreen());
        try {
            if (mc.getLevelSource().levelExists(world)) {
                mc.createWorldOpenFlows().openWorld(world, back);
                return;
            }
            // 26.2: difficulty, hardcore and "difficulty locked" travel together; game rules are no longer passed here.
            LevelSettings settings = new LevelSettings(world, GameType.ADVENTURE,
                    new LevelSettings.DifficultySettings(Difficulty.PEACEFUL, false, false),
                    ALLOW_COMMANDS, WorldDataConfiguration.DEFAULT);
            WorldOptions options = new WorldOptions(20261013L, false, false);
            mc.createWorldOpenFlows().createFreshLevel(world, settings, options,
                    registries -> registries.lookupOrThrow(Registries.WORLD_PRESET).getOrThrow(lesson == 20 ? MOON : SEA).value().createWorldDimensions(),
                    new TitleScreen());
        } catch (Exception e) {
            // Never leave the kid stuck: the normal title screen still works.
            org.slf4j.LoggerFactory.getLogger(Islands.MOD_ID).error("Could not open lesson " + lesson, e);
            back.run();
        }
    }
}
