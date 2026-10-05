package make.myworld;

import net.neoforged.bus.api.IEventBus;
import net.neoforged.fml.common.Mod;

@Mod(MyWorld.MOD_ID)
public class MyWorld {
    public static final String MOD_ID = "myworld";

    // השם של העולם שלכם. מופיע בתפריט של מצב יצירה (Creative).
    public static final String NAME = "העולם שלי";

    public MyWorld(IEventBus modEventBus) {
        MyItems.load();
        MyEffects.load();
        MyMobs.load();
        Kit.register(modEventBus);
    }
}
