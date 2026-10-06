package make.myworld;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.function.UnaryOperator;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

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
import net.minecraft.world.item.Rarity;
import net.minecraft.world.item.component.ItemLore;
import net.neoforged.bus.api.IEventBus;
import net.neoforged.neoforge.common.NeoForge;
import net.neoforged.neoforge.registries.DeferredItem;
import net.neoforged.neoforge.registries.DeferredRegister;

/**
 * The plumbing behind MyItems, MyEffects and MyMobs. Kids never edit this file.
 * Names (lang files) and item models are written by tools/prepare.ps1 before every Play,
 * from the first two string arguments of each Kit.item / Kit.effect call.
 * It also builds everything the kid designed in the hub's studio (assets/myworld/studio/world.json).
 */
public final class Kit {
    private Kit() {}

    static final DeferredRegister.Items ITEMS = DeferredRegister.createItems(MyWorld.MOD_ID);
    static final DeferredRegister<MobEffect> EFFECTS = DeferredRegister.create(BuiltInRegistries.MOB_EFFECT, MyWorld.MOD_ID);
    static final DeferredRegister<CreativeModeTab> TABS = DeferredRegister.create(Registries.CREATIVE_MODE_TAB, MyWorld.MOD_ID);

    private static final List<DeferredItem<Item>> ALL_ITEMS = new ArrayList<>();
    private static final Set<String> IDS = new HashSet<>();
    /** The world's name from the studio, if the kid gave one there. */
    static String studioName = null;

    static final Supplier<CreativeModeTab> TAB = TABS.register("my_world", () -> CreativeModeTab.builder()
            .title(Component.literal(studioName != null ? studioName : MyWorld.NAME))
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
        IDS.add(id);
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

    /** Everything the kid made in the studio. A broken entry is skipped, never a crash. */
    static void loadStudio() {
        try (InputStream in = Kit.class.getResourceAsStream("/assets/myworld/studio/world.json")) {
            if (in == null) return;
            JsonObject root = JsonParser.parseReader(new InputStreamReader(in, StandardCharsets.UTF_8)).getAsJsonObject();
            if (root.has("world") && root.get("world").isJsonObject()) {
                String n = text(root.getAsJsonObject("world"), "name");
                if (!n.isBlank()) studioName = n;
            }
            if (root.has("items") && root.get("items").isJsonArray()) {
                for (JsonElement e : root.getAsJsonArray("items")) {
                    try {
                        JsonObject o = e.getAsJsonObject();
                        String id = text(o, "id");
                        if (!id.matches("[a-z][a-z0-9_]{0,39}") || IDS.contains(id)) continue;
                        int stack = o.has("stack") ? Math.max(1, Math.min(64, o.get("stack").getAsInt())) : 64;
                        Rarity rarity = switch (text(o, "rarity")) {
                            case "uncommon" -> Rarity.UNCOMMON;
                            case "rare" -> Rarity.RARE;
                            case "epic" -> Rarity.EPIC;
                            default -> Rarity.COMMON;
                        };
                        if (o.has("power") && o.get("power").isJsonObject()) {
                            JsonObject power = o.getAsJsonObject("power");   // the kid's logic blocks, run by StudioPower
                            item(id, text(o, "name"), text(o, "lore"), p -> p.stacksTo(stack).rarity(rarity), p -> new StudioPower.PowerItem(p, power));
                        } else {
                            item(id, text(o, "name"), text(o, "lore"), p -> p.stacksTo(stack).rarity(rarity));
                        }
                    } catch (RuntimeException bad) {
                        System.err.println("[myworld] studio item skipped: " + bad);
                    }
                }
            }
        } catch (Exception ex) {
            System.err.println("[myworld] studio not loaded: " + ex);
        }
    }

    private static String text(JsonObject o, String key) {
        return o.has(key) && o.get(key).isJsonPrimitive() ? o.get(key).getAsString() : "";
    }

    static void register(IEventBus modEventBus) {
        loadStudio();
        NeoForge.EVENT_BUS.addListener(StudioPower::onEntityInteract);   // right-click on a creature with a studio item
        ITEMS.register(modEventBus);
        EFFECTS.register(modEventBus);
        TABS.register(modEventBus);
    }
}
