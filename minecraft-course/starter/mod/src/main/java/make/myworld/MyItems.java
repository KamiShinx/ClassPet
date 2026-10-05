package make.myworld;

import net.minecraft.world.item.Item;
import net.neoforged.neoforge.registries.DeferredItem;

// כל חפץ בעולם שלכם הוא בלוק אחד כאן.
// התמונה שלו: קובץ PNG בגודל 16 על 16, עם אותו שם כמו הקוד של החפץ, בתיקייה
// src/main/resources/assets/myworld/textures/item/
public class MyItems {

    public static final DeferredItem<Item> FIRST_ITEM = Kit.item(
            "first_item",                          // הקוד: אנגלית, אותיות קטנות, בלי רווחים. כמו שם קובץ התמונה
            "החפץ הראשון",                         // השם במשחק
            "הכרטיס שלכם יהפוך אותו למשהו אחר.",   // ההסבר שמופיע מתחת לשם
            p -> p.stacksTo(16));                 // המספרים: כמה נכנסים בערימה אחת

    static void load() {}
}
