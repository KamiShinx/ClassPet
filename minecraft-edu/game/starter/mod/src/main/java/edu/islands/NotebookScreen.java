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
 * Four pages for lesson 1: from class (the characteristics of life), who lives on the island (with a bar chart),
 * alive or not alive, the experiment.
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
    private static final String[] BENCH_WHY = {"הוא גדל", "היא התפתחה", "דומם", "מקורו ביצור חי", "מקורו ביצור חי"};
    private static final String[] BENCH_AFTER_SHORT = {"גדל לעץ קטן", "בקע אפרוח", "לא השתנתה", "לא השתנה", "לא השתנה"};

    // the characteristics of life, as the Ministry's content spec lists them, each with a line a kid can check against
    private static final String[] LIFE = {"נשימה", "הזנה", "הפרשה", "גדילה והתפתחות", "רבייה", "תנועה", "תקשורת עם הסביבה"};
    private static final String[] LIFE_LINE = {"קולטים חמצן מהאוויר או מהמים", "צריכים מזון כדי לחיות", "מוציאים מהגוף חומרי פסולת",
            "גדלים, ומשתנים עם הזמן", "מעמידים צאצאים", "זזים. גם צמחים, רק לאט", "קולטים את הסביבה, ומגיבים"};
    private static final Item[] LIFE_ICONS = {Items.GLASS_BOTTLE, Items.APPLE, Items.BONE_MEAL, Items.OAK_SAPLING, Items.EGG, Items.FEATHER, Items.BELL};
    // Noa teaches them in the order of her route: this is the place of each one in that order (score #learn counts them)
    private static final int[] LIFE_TAUGHT_AT = {3, 0, 6, 5, 1, 2, 4};
    private static final String[] SEEN = {"תנועה", "הזנה", "נשימה", "תקשורת"};

    private static final String[] TABS = {"מאפיינים", "מי גר באי", "המיון", "הניסוי"};

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
        int tabW = 44;
        for (int i = 0; i < TABS.length; i++) {
            int x1 = left + W / 2 - 8 - i * (tabW + 3), x0 = x1 - tabW;
            boolean on = i == tab;
            g.fill(x0, top + 6, x1, top + 22, on ? TEAL : PAPER_SHADE);
            g.outline(x0, top + 6, tabW, 16, on ? TEAL : SPINE);
            centered(g, TABS[i], (x0 + x1) / 2, top + 10, on ? 0xFFFFFFFF : INK);
        }
        g.fill(left + 10, top + 31, left + W / 2 - 10, top + 32, SPINE);

        if (tab == 0) fromClass(g);
        else if (tab == 1) census(g);
        else if (tab == 2) sorting(g);
        else experiment(g);

        // A line that starts with a Latin letter is laid out left to right, and its Hebrew comes out in the wrong order:
        // every Hebrew line here starts with a Hebrew word.
        centered(g, "לסגור: N או Esc  ·  לעבור עמוד: מקשי החצים", left + W / 2, top + H + 10, 0xFFE8DCC0);
    }

    // ---- page 1: from class, the characteristics of life ----
    private void fromClass(GuiGraphicsExtractor g) {
        int right = left + W - 12;
        int learned = score("#learn");
        rtl(g, "שבעת מאפייני החיים", right, top + 38, INK);
        wrapped(g, "לכל יצור חי יש את כולם.", right, top + 49, W / 2 - 26, FADED);
        for (int i = 0; i < LIFE.length; i++) {
            boolean has = learned > LIFE_TAUGHT_AT[i];
            int col = i < 4 ? 0 : 1, row = i < 4 ? i : i - 4;
            int r = col == 0 ? right : left + W / 2 - 14, y = top + 64 + row * 30;
            int boxLeft = r - 174;
            g.fill(boxLeft, y, r, y + 26, has ? 0xFFFFF7DD : PAPER_SHADE);
            g.outline(boxLeft, y, 174, 26, has ? GOLD : SPINE);
            g.fill(r - 24, y + 1, r - 1, y + 25, PAPER_SHADE);
            g.item(new ItemStack(LIFE_ICONS[i]), r - 20, y + 5);
            rtl(g, LIFE[i], r - 28, y + 4, has ? INK : FADED);
            rtl(g, has ? LIFE_LINE[i] : "עוד לא למדתם עם נועה", r - 28, y + 15, FADED);
            if (has) g.text(font, "✔", boxLeft + 5, y + 9, GREEN, false);
        }
        if (score("#quizdone") == 1) rtl(g, "בוחן המשלחת: " + score("#quiz") + " מתוך 4", right, top + H - 20, GREEN);
        int lx = left + W / 2 - 14, y = top + 64 + 3 * 30;
        g.fill(lx - 174, y, lx, y + 26, 0xFFE9F3EC);
        g.outline(lx - 174, y, 174, 26, GREEN);
        rtl(g, "אין לו מאפייני חיים? הוא לא חי.", lx - 6, y + 4, INK);
        rtl(g, "צמר ועץ: חומרים שמקורם ביצורים חיים.", lx - 6, y + 15, FADED);
    }

    // ---- page 2: who lives on the island ----
    private void census(GuiGraphicsExtractor g) {
        int found = 0;
        int[] perPlace = new int[PLACES.length];
        // right page: the animals, in two columns
        for (int i = 0; i < ANIMAL_KEYS.length; i++) {
            boolean has = score("#c_" + ANIMAL_KEYS[i]) == 1;
            int place = score("#w_" + (i + 1)), seen = score("#d_" + (i + 1));
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
                    // the row is narrow: the lake and the sea are "water" here, so the line stays inside its box
                    String under = (place == 5 ? "מים" : PLACES[place - 1]) + (seen >= 1 && seen <= SEEN.length ? " · " + SEEN[seen - 1] : "");
                    rtl(g, under, right - 23, y + 12, FADED);
                } else {
                    rtl(g, "עוד לא נרשם", right - 23, y + 12, FADED);
                }
                g.text(font, "✔", right - 84, y + 2, GREEN, false);
            } else {
                rtl(g, "? ? ?", right - 8, y + 7, FADED);
            }
        }

        // left page: the bar chart
        int px0 = left + 14, px1 = left + W / 2 - 14;
        rtl(g, "איפה מצאתם אותם?", px1, top + 38, INK);
        wrapped(g, "כמה סוגים תייגתם בכל מקום", px1, top + 49, px1 - px0, FADED);
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

    // ---- page 3: alive or not alive ----
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
        rtl(g, "לשלושה ממצאים אין תשובה אחת:", left + W / 2 - 20, top + H - 62, FADED);
        rtl(g, "חי? דומם? מקורם ביצור חי?", left + W / 2 - 20, top + H - 51, FADED);
        rtl(g, "מיינתם " + sorted + " מתוך " + FIND_KEYS.length + " ממצאים", left + W - 12, top + H - 20, sorted >= FIND_KEYS.length ? GREEN : INK);
    }

    // ---- page 4: the experiment ----
    // The right page is the table of what happened; the left page is what it means. Nothing crosses the spine.
    private void experiment(GuiGraphicsExtractor g) {
        boolean monthPassed = score("#week") == 2;
        boolean checked = score("#stage") >= 4;
        int right = left + W - 12, pageLeft = left + W / 2 + 12;           // the right page
        int lRight = left + W / 2 - 14, lLeft = left + 14;                 // the left page
        rtl(g, "מה קורה אחרי חודש?", right, top + 38, INK);
        wrapped(g, monthPassed ? "עבר חודש. זה מה שקרה על שולחן הניסוי:" : "הניסוי עוד לא התחיל. קליק ימני על השעון בשולחן הניסוי.",
                right, top + 49, right - pageLeft, FADED);
        int y = top + 74, rowH = 22;
        g.fill(pageLeft, y, right, y + 14, TEAL);
        rtl(g, "מה בדקנו", right - 4, y + 3, 0xFFFFFFFF);
        rtl(g, "אחרי חודש", right - 78, y + 3, 0xFFFFFFFF);
        g.fill(lLeft, y, lRight, y + 14, TEAL);
        rtl(g, "חי או לא חי?", lRight - 4, y + 3, 0xFFFFFFFF);
        for (int i = 0; i < BENCH_NAMES.length; i++) {
            int ry = y + 14 + i * rowH;
            int shade = i % 2 == 0 ? 0xFFFFF7DD : PAPER_SHADE;
            g.fill(pageLeft, ry, right, ry + rowH, shade);
            g.item(new ItemStack(BENCH_ICONS[i]), right - 20, ry + 3);
            rtl(g, BENCH_NAMES[i], right - 24, ry + 7, INK);
            rtl(g, monthPassed ? BENCH_AFTER_SHORT[i] : "?", right - 78, ry + 7, monthPassed ? INK : FADED);
            g.fill(lLeft, ry, lRight, ry + rowH, shade);
            if (checked) rtl(g, BENCH_ALIVE[i] ? "✔ חי: " + BENCH_WHY[i] : "✘ " + BENCH_WHY[i], lRight - 4, ry + 7, BENCH_ALIVE[i] ? GREEN : RED);
            else rtl(g, "?", lRight - 4, ry + 7, FADED);
        }
        g.outline(pageLeft, y, right - pageLeft, 14 + BENCH_NAMES.length * rowH, TEAL);
        g.outline(lLeft, y, lRight - lLeft, 14 + BENCH_NAMES.length * rowH, TEAL);
        if (checked) wrapped(g, "גדילה והתפתחות הן אחד ממאפייני החיים. צמר ועץ הם חומרים שמקורם ביצורים חיים.", lRight, top + 38, lRight - lLeft, INK);
    }

    /** Right-aligned Hebrew that stays inside its page: a line wider than maxWidth continues on the next line. */
    private void wrapped(GuiGraphicsExtractor g, String text, int rightX, int y, int maxWidth, int color) {
        String rest = text;
        while (!rest.isEmpty()) {
            String line = rest;
            while (font.width(line) > maxWidth && line.contains(" ")) line = line.substring(0, line.lastIndexOf(' '));
            rtl(g, line, rightX, y, color);
            rest = rest.substring(line.length()).trim();
            y += 10;
        }
    }

    // ---- moving between the pages ----
    @Override
    public boolean mouseClicked(MouseButtonEvent event, boolean doubleClick) {
        int tabW = 44;
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
