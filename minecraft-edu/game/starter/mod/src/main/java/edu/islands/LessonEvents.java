package edu.islands;

import net.minecraft.commands.CommandSourceStack;
import net.minecraft.server.MinecraftServer;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.InteractionResult;
import net.minecraft.world.entity.Entity;
import net.minecraft.world.scores.Objective;
import net.minecraft.world.scores.ReadOnlyScoreInfo;
import net.minecraft.world.scores.ScoreHolder;
import net.minecraft.world.scores.Scoreboard;
import net.neoforged.neoforge.event.entity.player.PlayerInteractEvent;
import net.neoforged.neoforge.event.tick.ServerTickEvent;

/**
 * Hands the player's right-click on an entity over to the datapack, which decides what it means
 * (talk to a character, tag an animal, show an animal to Sam).
 *
 * The clicked entity gets the tag "islands_target" while the function islands:event/use_entity runs as the player.
 * If the function sets the score "#cancel islands" to 1, the game's own reaction to the click (riding a camel,
 * milking a cow) is skipped.
 */
public final class LessonEvents {
    private LessonEvents() {}

    static void onEntityInteract(PlayerInteractEvent.EntityInteract event) {
        if (event.getHand() != InteractionHand.MAIN_HAND) return;
        if (!(event.getEntity() instanceof ServerPlayer player)) return;
        MinecraftServer server = player.level().getServer();
        if (server == null || Lesson.fromWorldName(server.getWorldData().getLevelName()) == 0) return;

        Entity target = event.getTarget();
        setScore(server, "#cancel", 0);
        target.addTag("islands_target");
        try {
            CommandSourceStack source = server.createCommandSourceStack()
                    .withEntity(player).withPosition(player.position()).withSuppressedOutput();
            server.getCommands().performPrefixedCommand(source, "function islands:event/use_entity");
        } finally {
            target.removeTag("islands_target");
        }
        if (getScore(server, "#cancel") == 1) {
            event.setCanceled(true);
            event.setCancellationResult(InteractionResult.SUCCESS);
        }
    }

    /**
     * For scripted tests (nobody can click in a test run): when the score "#click_test islands" is 1, the first player
     * right-clicks the entity that has the tag "islands_click_test", through the game's real click path.
     * Without that score this does nothing.
     */
    static void onServerTick(ServerTickEvent.Post event) {
        MinecraftServer server = event.getServer();
        if (getScore(server, "#click_test") != 1) return;
        setScore(server, "#click_test", 0);
        for (ServerPlayer player : server.getPlayerList().getPlayers()) {
            for (Entity entity : player.level().getAllEntities()) {
                if (entity.entityTags().contains("islands_click_test")) {
                    player.interactOn(entity, InteractionHand.MAIN_HAND, entity.position());
                    return;
                }
            }
            return;
        }
    }

    private static final String OBJECTIVE = "islands";

    static int getScore(MinecraftServer server, String holder) {
        Scoreboard board = server.getScoreboard();
        Objective objective = board.getObjective(OBJECTIVE);
        if (objective == null) return 0;
        ReadOnlyScoreInfo info = board.getPlayerScoreInfo(ScoreHolder.forNameOnly(holder), objective);
        return info == null ? 0 : info.value();
    }

    static void setScore(MinecraftServer server, String holder, int value) {
        Scoreboard board = server.getScoreboard();
        Objective objective = board.getObjective(OBJECTIVE);
        if (objective == null) return;
        board.getOrCreatePlayerScore(ScoreHolder.forNameOnly(holder), objective).set(value);
    }
}
