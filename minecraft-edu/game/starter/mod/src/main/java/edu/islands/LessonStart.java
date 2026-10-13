package edu.islands;

import net.minecraft.server.MinecraftServer;
import net.neoforged.neoforge.event.server.ServerStartedEvent;

/**
 * When a lesson world starts, hand over to the datapack: set the lesson number and run islands:boot.
 * The datapack decides the rest (build the island the first time, then the lesson's start), so lessons change
 * without touching Java.
 */
public final class LessonStart {
    private LessonStart() {}

    static void onServerStarted(ServerStartedEvent event) {
        MinecraftServer server = event.getServer();
        int lesson = Lesson.fromWorldName(server.getWorldData().getLevelName());
        if (lesson == 0) return;
        run(server, "scoreboard objectives add islands dummy");
        run(server, "scoreboard players set #lesson islands " + lesson);
        run(server, "function islands:boot");
    }

    private static void run(MinecraftServer server, String command) {
        server.getCommands().performPrefixedCommand(server.createCommandSourceStack().withSuppressedOutput(), command);
    }
}
