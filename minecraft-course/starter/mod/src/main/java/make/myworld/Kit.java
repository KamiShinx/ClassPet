package make.myworld;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.function.UnaryOperator;

import net.minecraft.core.Holder;
import net.minecraft.core.component.DataComponents;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.core.registries.Registries;
import net.minecraft.network.chat.Component;
import net.minecraft.world.effect.MobEffect;
import net.minecraft.world.item.CreativeModeTab;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;
import net.minecraft.world.item.component.ItemLore;
import net.neoforged.bus.api.IEventBus;
import net.neoforged.neoforge.registries.DeferredItem;
import net.neoforged.neoforge.registries.DeferredRegister;

/**
 * The plumbing behind MyItems, MyEffects and MyMobs. Kids never edit this file.
 * Names (lang files) and item models are written by tools/prepare.ps1 before every Play,
 * from the first two string arguments of each Kit.item / Kit.effect call.
 */
public final class Kit {
    private Kit() {}

    static final DeferredRegister.Items ITEMS = DeferredRegister.createItems(MyWorld.MOD_ID);
    static final DeferredRegister<MobEffect> EFFECTS = DeferredRegister.create(BuiltInRegistries.MOB_EFFECT, MyWorld.MOD_ID);
    static final DeferredRegister<CreativeModeTab> TABS = DeferredRegister.create(Registries.CREATIVE_MODE_TAB, MyWorld.MOD_ID);

    private static final List<DeferredItem<Item>> ALL_ITEMS = new ArrayList<>();

    static final Supplier<CreativeModeTab> TAB = TABS.register("my_world", () -> CreativeModeTab.builder()
            .title(Component.literal(MyWorld.NAME))
            .icon(() -> ALL_ITEMS.isEmpty() ? new ItemStack(Items.GRASS_BLOCK) : new ItemStack(ALL_ITEMS.get(0).get()))
            .displayItems((parameters, output) -> ALL_ITEMS.forEach(item -> output.accept(item.get())))
            .build());

    /** A plain item: id, name in the game, tooltip, numbers. */
    public static DeferredItem<Item> item(String id, String name, String tooltip, UnaryOperator<Item.Properties> numbers) {
        return item(id, name, tooltip, numbers, Item::new);
    }

    /** An item with its own behaviour: the last argument builds it, e.g. p -> new Item(p) { ... }. */
    public static DeferredItem<Item> item(String id, String name, String tooltip, UnaryOperator<Item.Properties> numbers,
                                          Function<Item.Properties, ? extends Item> make) {
        DeferredItem<Item> item = ITEMS.registerItem(id, props -> (Item) make.apply(numbers.apply(withTooltip(props, tooltip))));
        ALL_ITEMS.add(item);
        return item;
    }

    /** A status effect: id, name in the game, and how to build it. Its icon is textures/mob_effect/<id>.png. */
    public static Holder<MobEffect> effect(String id, String name, Supplier<? extends MobEffect> make) {
        return EFFECTS.register(id, make);
    }

    private static Item.Properties withTooltip(Item.Properties props, String tooltip) {
        if (tooltip == null || tooltip.isEmpty()) return props;
        return props.component(DataComponents.LORE, new ItemLore(List.of(Component.literal(tooltip))));
    }

    static void register(IEventBus modEventBus) {
        ITEMS.register(modEventBus);
        EFFECTS.register(modEventBus);
        TABS.register(modEventBus);
    }
}
