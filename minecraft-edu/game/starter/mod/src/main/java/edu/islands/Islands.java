package edu.islands;

import net.neoforged.bus.api.IEventBus;
import net.neoforged.fml.common.Mod;
import net.neoforged.neoforge.common.NeoForge;

/**
 * The islands course mod. Almost everything a lesson does lives in the datapack under resources/data/islands
 * (functions, dialogs, the world preset). Java only does what a datapack can't:
 *   - LessonBoot (client): Play in the hub opens Minecraft straight into the chosen lesson's map;
 *   - LessonStart (server): tells the datapack which lesson this world is, once it starts;
 *   - LessonEvents (server): passes a right-click on a character or an animal to the datapack.
 */
@Mod(Islands.MOD_ID)
public class Islands {
    public static final String MOD_ID = "islands";

    public Islands(IEventBus modEventBus) {
        NeoForge.EVENT_BUS.addListener(LessonStart::onServerStarted);
        NeoForge.EVENT_BUS.addListener(LessonEvents::onEntityInteract);
        NeoForge.EVENT_BUS.addListener(LessonEvents::onServerTick);
    }
}
