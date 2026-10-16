package edu.islands;

import net.minecraft.client.KeyMapping;
import net.minecraft.client.Minecraft;
import net.neoforged.api.distmarker.Dist;
import net.neoforged.bus.api.SubscribeEvent;
import net.neoforged.fml.common.EventBusSubscriber;
import net.neoforged.neoforge.client.event.ClientTickEvent;
import net.neoforged.neoforge.client.event.RegisterKeyMappingsEvent;

/** The N key opens the research notebook, while the player is in a lesson and no other screen is open. */
@EventBusSubscriber(modid = Islands.MOD_ID, value = Dist.CLIENT)
public final class NotebookKey {
    private NotebookKey() {}

    private static final KeyMapping OPEN = new KeyMapping("key.islands.notebook", 78, KeyMapping.Category.MISC);   // 78 = N

    @SubscribeEvent
    public static void onRegisterKeys(RegisterKeyMappingsEvent event) {
        event.register(OPEN);
    }

    @SubscribeEvent
    public static void onClientTick(ClientTickEvent.Post event) {
        Minecraft mc = Minecraft.getInstance();
        while (OPEN.consumeClick()) {
            if (mc.player != null && mc.gui.screen() == null && mc.getSingleplayerServer() != null) {
                int lesson = Lesson.fromWorldName(mc.getSingleplayerServer().getWorldData().getLevelName());
                if (lesson == 20) mc.gui.setScreen(new StarLogScreen());      // the space demo has its own log
                else if (lesson != 0) mc.gui.setScreen(new NotebookScreen());
            }
        }
        // For scripted tests: the score "#notebook_test islands" opens the notebook on a page (1 to 4), once; 9 opens the star log.
        if (mc.player != null && mc.getSingleplayerServer() != null && LessonEvents.getScore(mc.getSingleplayerServer(), "#notebook_test") == 9) {
            LessonEvents.setScore(mc.getSingleplayerServer(), "#notebook_test", 0);
            mc.gui.setScreen(new StarLogScreen());
        }
        if (mc.player != null && mc.getSingleplayerServer() != null) {
            int page = LessonEvents.getScore(mc.getSingleplayerServer(), "#notebook_test");
            if (page >= 1 && page <= 4) {
                LessonEvents.setScore(mc.getSingleplayerServer(), "#notebook_test", 0);
                NotebookScreen screen = mc.gui.screen() instanceof NotebookScreen open ? open : new NotebookScreen();
                screen.showPage(page - 1);
                if (mc.gui.screen() != screen) mc.gui.setScreen(screen);
            }
        }
    }
}
