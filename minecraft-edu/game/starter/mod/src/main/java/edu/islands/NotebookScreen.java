package edu.islands;

import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.GuiGraphicsExtractor;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.client.input.KeyEvent;
import net.minecraft.client.input.MouseButtonEvent;
import net.minecraft.network.chat.Component;
import net.minecraft.server.MinecraftServer;
import net.minecraft.world.item.DyeColor;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;

/**
 * The research notebook (the N key): what the kid has recorded in this lesson, drawn as an open book.
 * Three pages for lesson 1: who lives on the island (with a bar chart), alive or not alive, the experiment.
 * It only reads: everything it shows comes from the scores the datapack keeps (objective "islands").
 */
public final class NotebookScreen extends Screen {
    // ---- the same lists as tools/gen_lesson1.py, in the same order ----
    private static final String[] ANIMAL_KEYS = {"sheep", "cow", "pig", "chicken", "horse", "camel", "rabbit", "armadillo", "goat", "fox", "frog", "cod", "salmon"};
    private static final String[] ANIMAL_NAMES = {"כבשה", "פרה", "חזיר", "תרנגולת", "סוס", "גמל", "ארנב", "ארמדיל", "עז הרים", "שועל", "צפרדע", "דג בקלה", "דג סלמון"};
    private static final Item[] ANIMAL_ICONS = {Items.SHEEP_SPAWN_EGG, Items.COW_SPAWN_EGG, Items.PIG_SPAWN_EGG, Items.CHICKEN_SPAWN_EGG, Items.HORSE_SPAWN_EGG,
            Items.CAMEL_SPAWN_EGG, Items.RABBIT_SPAWN_EGG, Items.ARMADILLO_SPAWN_EGG, Items.GOAT_SPAWN_EGG, Items.FOX_SPAWN_EGG, Items.FROG_SPAWN_EGG,
            Items.COD_SPAWN_EGG, Items.SALMON_SPAWN_EGG};
    private static final String[] PLACES = {"אחו", "יער", "מדבר", "הר", "אגם/ים"};
    private static final int[] PLACE_COLORS = {0xFF6BBF59, 0xFF2F7D46, 0xFFE2C275, 0xFF9AA0A6, 0xFF4A90D9};

    private static final String[] FIND_KEYS = {"sapling", "flower", "fish", "stone", "water", "bone", "feather", "log", "wool", "egg"};
    private static final String[] FIND_NAMES = {"שתיל", "פרח", "דג בדלי", "אבן", "דלי מים", "עצם", "נוצה", "בול עץ", "צמר", "ביצה"};
    private static final Item[] FIND_ICONS = {Items.OAK_SAPLING, Items.POPPY, Items.COD_BUCKET, Items.STONE, Items.WATER_BUCKET, Items.BONE, Items.FEATHER,
            Items.OAK_LOG, Items.WOOL.pick(DyeColor.WHITE), Items.EGG};
    private static final int[] FIND_BOX = {0, 0, 0, 1, 1, 1, 1, 2, 2, 2};          // 0 alive, 1 not alive, 2 for the class talk

    private static final String[] BENCH_NAMES = {"שתיל", "ביצה", "אבן", "צמר", "בול עץ"};
    private static final Item[] BENCH_ICONS = {Items.OAK_SAPLING, Items.EGG, Items.STONE, Items.WOOL.pick(DyeColor.WHITE), Items.OAK_LOG};
    private static final String[] BENCH_AFTER = {"גדל והפך לעץ קטן", "בקע ממנה אפרוח", "לא השתנתה", "לא השתנה", "לא השתנה"};
    private static final boolean[] BENCH_ALIVE = {true, true, false, false, false};

    private static final String[] TABS = {"מי גר באי?", "חי או לא חי?", "הניסוי"};

    // ---- the look ----
    private static final int W = 404, H = 224;
    private static final int COVER = 0xFF5B3A1E, COVER_EDGE = 0xFF3A2412, PAPER = 0xFFF6ECCF, PAPER_SHADE = 0xFFE9DCB6, SPINE = 0xFFCDBB8C;
    private static final int INK = 0xFF3A2E1F, FADED = 0xFF9C8F74, TEAL = 0xFF26A09C, GREEN = 0xFF2E8B57, RED = 0xFFB8483E, GOLD = 0xFFC8962E;

    private int tab = 0;
    private int left, top;

    public NotebookScreen() {
        super(Component.literal("מחברת המחקר"));
    }

    @Override
    protected void init() {
        left = (width - W) / 2;
        top = Math.max(4, (height - H) / 2);
    }

    /** The island keeps living while the notebook is open. */
    @Override
    public boolean isPauseScreen() {
        return false;
    }

    void showPage(int page) {
        tab = Math.max(0, Math.min(TABS.length - 1, page));
    }

    private static int score(String holder) {
        MinecraftServer server = Minecraft.getInstance().getSingleplayerServer();
        return server == null ? 0 : LessonEvents.getScore(server, holder);
    }

    /** Hebrew text that ends at x (right-aligned), the way a Hebrew page is written. */
    private void rtl(GuiGraphicsExtractor g, String text, int rightX, int y, int color) {
        g.text(font, text, rightX - font.width(text), y, color, false);
    }

    private void centered(GuiGraphicsExtractor g, String text, int centerX, int y, int color) {
        g.text(font, text, centerX - font.width(text) / 2, y, color, false);
    }

    @Override
    public void extractRenderState(GuiGraphicsExtractor g, int mouseX, int mouseY, float partialTick) {
        super.extractRenderState(g, mouseX, mouseY, partialTick);
        g.fill(0, 0, width, height, 0xB0100C08);

        // the cover, the two pages and the spine
        g.fill(left - 6, top - 6, left + W + 6, top + H + 6, COVER_EDGE);
        g.fill(left - 4, top - 4, left + W + 4, top + H + 4, COVER);
        g.fill(left, top, left + W, top + H, PAPER);
        g.fillGradient(left + W / 2 - 10, top, left + W / 2, top + H, PAPER, PAPER_SHADE);
        g.fillGradient(left + W / 2, top, left + W / 2 + 10, top + H, PAPER_SHADE, PAPER);
        g.fill(left + W / 2 - 1, top, left + W / 2 + 1, top + H, SPINE);

        // the header: the notebook's name on the right page, the tabs on the left page
        rtl(g, "מחברת המחקר", left + W - 10, top + 8, INK);
        rtl(g, "שיעור 1: נוחתים באי", left + W - 10, top + 19, FADED);
        g.fill(left + W / 2 + 10, top + 31, left + W - 10, top + 32, SPINE);
        int tabW = 62;
        for (int i = 0; i < TABS.length; i++) {
            int x1 = left + W / 2 - 8 - i * (tabW + 3), x0 = x1 - tabW;
            boolean on = i == tab;
            g.fill(x0, top + 6, x1, top + 22, on ? TEAL : PAPER_SHADE);
            g.outline(x0, top + 6, tabW, 16, on ? TEAL : SPINE);
            centered(g, TABS[i], (x0 + x1) / 2, top + 10, on ? 0xFFFFFFFF : INK);
        }
        g.fill(left + 10, top + 31, left + W / 2 - 10, top + 32, SPINE);

        if (tab == 0) census(g);
        else if (tab == 1) sorting(g);
        else experiment(g);

        centered(g, "N או Esc: לסגור  ·  מקשי החצים: לעבור עמוד", left + W / 2, top + H + 10, 0xFFE8DCC0);
    }

    // ---- page 1: who lives on the island ----
    private void census(GuiGraphicsExtractor g) {
        int found = 0;
        int[] perPlace = new int[PLACES.length];
        // right page: the animals, in two columns
        for (int i = 0; i < ANIMAL_KEYS.length; i++) {
            boolean has = score("#c_" + ANIMAL_KEYS[i]) == 1;
            int place = score("#w_" + (i + 1));
            int col = i / 7, row = i % 7;
            int right = left + W - 12 - col * 94, y = top + 38 + row * 25;
            g.fill(right - 88, y, right, y + 22, has ? 0xFFFFF7DD : PAPER_SHADE);
            g.outline(right - 88, y, 88, 22, has ? GOLD : SPINE);
            if (has) {
                found++;
                g.item(new ItemStack(ANIMAL_ICONS[i]), right - 19, y + 3);
                rtl(g, ANIMAL_NAMES[i], right - 23, y + 3, INK);
                if (place >= 1 && place <= PLACES.length) {
                    perPlace[place - 1]++;
                    rtl(g, PLACES[place - 1], right - 23, y + 12, PLACE_COLORS[place - 1] & 0xFFC0C0C0 | 0xFF000000);
                } else {
                    rtl(g, "עוד לא נרשם", right - 23, y + 12, FADED);
                }
                g.text(font, "✔", right - 84, y + 7, GREEN, false);
            } else {
                rtl(g, "? ? ?", right - 8, y + 7, FADED);
            }
        }

        // left page: the bar chart
        int px0 = left + 14, px1 = left + W / 2 - 14;
        rtl(g, "איפה מצאתם אותם?", px1, top + 38, INK);
        rtl(g, "כמה סוגים תייגתם בכל מקום", px1, top + 49, FADED);
        int baseY = top + H - 44, chartTop = top + 70, maxBar = baseY - chartTop;
        int max = 1;
        for (int n : perPlace) max = Math.max(max, n);
        int scaleTop = Math.max(4, max);
        for (int v = 0; v <= scaleTop; v++) {                       // light grid lines with the numbers
            int y = baseY - v * maxBar / scaleTop;
            g.fill(px0 + 12, y, px1, y + 1, v == 0 ? INK : 0x30000000);
            g.text(font, String.valueOf(v), px0, y - 4, FADED, false);
        }
        int slot = (px1 - px0 - 14) / PLACES.length;
        for (int i = 0; i < PLACES.length; i++) {
            int cx = px1 - slot / 2 - i * slot;                     // the first place is on the right, as in Hebrew
            int barH = perPlace[i] * maxBar / scaleTop;
            g.fill(cx - 11, baseY - barH, cx + 11, baseY, PLACE_COLORS[i]);
            if (barH > 0) {
                g.fill(cx - 11, baseY - barH, cx + 11, baseY - barH + 2, 0x50FFFFFF);
                centered(g, String.valueOf(perPlace[i]), cx, baseY - barH - 10, INK);
            }
            centered(g, PLACES[i], cx, baseY + 4, INK);
        }
        rtl(g, "תייגתם " + found + " סוגים (באי יש " + ANIMAL_KEYS.length + ")", px1, top + H - 20, found >= 8 ? GREEN : INK);
    }

    // ---- page 2: alive or not alive ----
    private void sorting(GuiGraphicsExtractor g) {
        String[] titles = {"חי", "לא חי", "נדבר על זה בכיתה"};
        int[] colors = {GREEN, 0xFF6F6F6F, GOLD};
        int[] x1 = {left + W - 12, left + W - 12 - 94, left + W / 2 - 14};
        int[] wBox = {88, 88, W / 2 - 28};
        int sorted = 0;
        for (int b = 0; b < 3; b++) {
            int right = x1[b], boxLeft = right - wBox[b], y = top + 38;
            g.fill(boxLeft, y, right, y + 14, colors[b]);
            centered(g, titles[b], (boxLeft + right) / 2, y + 3, 0xFFFFFFFF);
            g.fill(boxLeft, y + 14, right, top + H - 28, 0xFFFFF7DD);
            g.outline(boxLeft, y, wBox[b], top + H - 28 - y, colors[b]);
            int row = 0;
            for (int i = 0; i < FIND_KEYS.length; i++) {
                if (FIND_BOX[i] != b) continue;
                boolean done = score("#s_" + FIND_KEYS[i]) == 1;
                int ry = y + 19 + row * 20;
                if (done) {
                    sorted++;
                    g.item(new ItemStack(FIND_ICONS[i]), right - 20, ry);
                    rtl(g, FIND_NAMES[i], right - 24, ry + 4, INK);
                } else {
                    g.outline(right - 20, ry, 16, 16, SPINE);
                    rtl(g, "? ? ?", right - 26, ry + 4, FADED);
                }
                row++;
            }
        }
        rtl(g, "לשלושה ממצאים אין תשובה אחת:", left + W / 2 - 14, top + H - 62, FADED);
        rtl(g, "חי? לא חי? משהו שבא ממשהו חי?", left + W / 2 - 14, top + H - 51, FADED);
        rtl(g, "מיינתם " + sorted + " מתוך " + FIND_KEYS.length + " ממצאים", left + W - 12, top + H - 20, sorted >= FIND_KEYS.length ? GREEN : INK);
    }

    // ---- page 3: the experiment ----
    private void experiment(GuiGraphicsExtractor g) {
        boolean weekPassed = score("#week") == 2;
        boolean checked = score("#stage") >= 4;
        int right = left + W - 12, tLeft = left + 14;
        rtl(g, "מה קורה אחרי חודש?", right, top + 38, INK);
        rtl(g, weekPassed ? "עבר חודש. זה מה שקרה על שולחן הניסוי:" : "הניסוי עוד לא התחיל. קליק ימני על השעון בשולחן הניסוי.", right, top + 49, FADED);
        int y = top + 66;
        int cName = right, cAfter = right - 110, cAlive = tLeft + 60;
        g.fill(tLeft, y, right, y + 14, TEAL);
        rtl(g, "מה בדקנו", cName - 4, y + 3, 0xFFFFFFFF);
        rtl(g, "אחרי חודש", cAfter - 4, y + 3, 0xFFFFFFFF);
        rtl(g, "חי?", cAlive - 4, y + 3, 0xFFFFFFFF);
        for (int i = 0; i < BENCH_NAMES.length; i++) {
            int ry = y + 14 + i * 22;
            g.fill(tLeft, ry, right, ry + 22, i % 2 == 0 ? 0xFFFFF7DD : PAPER_SHADE);
            g.item(new ItemStack(BENCH_ICONS[i]), cName - 20, ry + 3);
            rtl(g, BENCH_NAMES[i], cName - 24, ry + 7, INK);
            rtl(g, weekPassed ? BENCH_AFTER[i] : "?", cAfter - 4, ry + 7, weekPassed ? INK : FADED);
            if (checked) rtl(g, BENCH_ALIVE[i] ? "✔ חי" : "✘ לא חי", cAlive - 4, ry + 7, BENCH_ALIVE[i] ? GREEN : RED);
            else rtl(g, "?", cAlive - 4, ry + 7, FADED);
        }
        g.outline(tLeft, y, right - tLeft, 14 + BENCH_NAMES.length * 22, TEAL);
        if (checked) {
            rtl(g, "השתיל גדל והביצה בקעה, לכן הם חיים.", right, top + H - 31, INK);
            rtl(g, "הצמר ובול העץ לא חיים, אבל שניהם באו ממשהו חי.", right, top + H - 20, INK);
        }
    }

    // ---- moving between the pages ----
    @Override
    public boolean mouseClicked(MouseButtonEvent event, boolean doubleClick) {
        int tabW = 62;
        for (int i = 0; i < TABS.length; i++) {
            int x1 = left + W / 2 - 8 - i * (tabW + 3), x0 = x1 - tabW;
            if (event.x() >= x0 && event.x() <= x1 && event.y() >= top + 6 && event.y() <= top + 22) {
                tab = i;
                return true;
            }
        }
        return super.mouseClicked(event, doubleClick);
    }

    @Override
    public boolean keyPressed(KeyEvent event) {
        int key = event.key();
        if (key == 78) {                               // N closes the notebook, the same key that opened it
            onClose();
            return true;
        }
        if (key == 263) {                              // left arrow: the next page (Hebrew books turn leftwards)
            tab = (tab + 1) % TABS.length;
            return true;
        }
        if (key == 262) {                              // right arrow: the page before
            tab = (tab + TABS.length - 1) % TABS.length;
            return true;
        }
        return super.keyPressed(event);
    }
}
