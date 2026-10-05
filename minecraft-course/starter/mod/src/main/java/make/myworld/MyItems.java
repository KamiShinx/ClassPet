package make.myworld;

import net.minecraft.world.item.Item;
import net.neoforged.neoforge.registries.DeferredItem;

// כאן כתובים כל החפצים בעולם שלכם, כל חפץ בחלק משלו.
// לכל חפץ יש תמונה: קובץ PNG של 16 על 16 פיקסלים, והשם שלו הוא הקוד של החפץ.
// התמונות נמצאות בתיקייה src/main/resources/assets/myworld/textures/item/
public class MyItems {

    public static final DeferredItem<Item> FIRST_ITEM = Kit.item(
            "first_item",                          // הקוד: באנגלית, באותיות קטנות, בלי רווחים. בדיוק כמו שם התמונה
            "החפץ הראשון",                         // השם במשחק
            "הכרטיס שלכם יהפוך אותו למשהו אחר.",   // ההסבר שמופיע מתחת לשם
            p -> p.stacksTo(16));                 // המספרים: כמה חפצים נכנסים בערימה אחת

    static void load() {}
}
