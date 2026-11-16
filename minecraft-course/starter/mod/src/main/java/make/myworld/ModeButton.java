package make.myworld;

import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.components.Button;
import net.minecraft.client.gui.screens.PauseScreen;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.client.gui.screens.inventory.CreativeModeInventoryScreen;
import net.minecraft.client.gui.screens.inventory.InventoryScreen;
import net.minecraft.client.server.IntegratedServer;
import net.minecraft.network.chat.Component;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.level.GameType;
import net.neoforged.api.distmarker.Dist;
import net.neoforged.bus.api.SubscribeEvent;
import net.neoforged.fml.common.EventBusSubscriber;
import net.neoforged.neoforge.client.event.ScreenEvent;

/**
 * A button in the corner of the pause menu (Esc) and the inventory (E): one click switches between Creative and
 * Survival, so kids can test their items both ways. Only in a world on this computer, and it works without cheats.
 * Kids never edit this file.
 */
@EventBusSubscriber(modid = MyWorld.MOD_ID, value = Dist.CLIENT)
public final class ModeButton {
    private ModeButton() {}

    @SubscribeEvent
    static void onScreen(ScreenEvent.Init.Post event) {
        Screen screen = event.getScreen();
        if (!(screen instanceof PauseScreen || screen instanceof InventoryScreen || screen instanceof CreativeModeInventoryScreen)) return;
        Minecraft mc = Minecraft.getInstance();
        IntegratedServer server = mc.getSingleplayerServer();
        if (mc.player == null || server == null) return;
        boolean creative = mc.player.isCreative();
        Component label = Component.literal(creative ? "→ Survival" : "→ Creative");
        event.addListener(Button.builder(label, b -> {
            var id = mc.player.getUUID();
            server.execute(() -> {
                ServerPlayer p = server.getPlayerList().getPlayer(id);
                if (p != null) p.setGameMode(p.isCreative() ? GameType.SURVIVAL : GameType.CREATIVE);
            });
            screen.onClose();   // the inventory looks different in each mode, so it closes
        }).bounds(4, 4, 96, 20).build());
    }
}
