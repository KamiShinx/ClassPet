package edu.islands;

import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.GuiGraphicsExtractor;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.client.input.KeyEvent;
import net.minecraft.network.chat.Component;
import net.minecraft.server.MinecraftServer;
import net.minecraft.world.item.DyeColor;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;

/**
 * The star log (the N key in the space demo, lesson 20): the six stages of a star's life, ticked as the commander
 * teaches them, the lab's result, Max's English words and the quiz. One open book, the same look as the research
 * notebook. It only reads the scores the datapack keeps (tools/gen_space.py).
 */
public final class StarLogScreen extends Screen {
    // ---- the same stages as STAGES in tools/gen_space.py, in the same order ----
    private static final String[] STAGE_HE = {"ערפילית", "פרוטוכוכב", "כוכב בוגר", "ענק אדום", "ננס לבן", "חור שחור"};
    private static final String[] STAGE_EN = {"Nebula", "Protostar", "Main sequence star", "Red giant", "White dwarf", "Black hole"};
    private static final String[] STAGE_LINE = {"גז ואבק: כאן נולדים כוכבים", "כוח המשיכה דוחס ומחמם את הגז",
            "מימן הופך להליום, ונוצר אור", "המימן נגמר, והכוכב מתנפח", "הסוף של כוכב כמו השמש", "הסוף של כוכב ענק, אחרי סופרנובה"};
    private static final Item[] STAGE_ICONS = {Items.STAINED_GLASS.pick(DyeColor.PURPLE), Items.MAGMA_BLOCK, Items.GLOWSTONE, Items.CONCRETE.pick(DyeColor.RED),
            Items.SEA_LANTERN, Items.CONCRETE.pick(DyeColor.BLACK)};
    private static final String[] WORDS_EN = {"cloud · gas · dust · born", "big · red · old", "place · light · escape"};
    private static final String[] WORDS_HE = {"ענן · גז · אבק · נולדים", "גדול · אדום · זקן", "מקום · אור · לברוח"};

    private static final int W = 404, H = 224;
    private static final int COVER = 0xFF1E2A44, COVER_EDGE = 0xFF111A2E, PAPER = 0xFFF6ECCF, PAPER_SHADE = 0xFFE9DCB6, SPINE = 0xFFCDBB8C;
    private static final int INK = 0xFF3A2E1F, FADED = 0xFF9C8F74, TEAL = 0xFF1F7F8C, GREEN = 0xFF2E8B57, RED = 0xFFB8483E, GOLD = 0xFFC8962E;

    private int left, top;

    public StarLogScreen() {
        super(Component.literal("יומן הכוכבים"));
    }

    @Override
    protected void init() {
        left = (width - W) / 2;
        top = Math.max(4, (height - H) / 2);
    }

    @Override
    public boolean isPauseScreen() {
        return false;
    }

    private static int score(String holder) {
        MinecraftServer server = Minecraft.getInstance().getSingleplayerServer();
        return server == null ? 0 : LessonEvents.getScore(server, holder);
    }

    private void rtl(GuiGraphicsExtractor g, String text, int rightX, int y, int color) {
        g.text(font, text, rightX - font.width(text), y, color, false);
    }

    private void centered(GuiGraphicsExtractor g, String text, int centerX, int y, int color) {
        g.text(font, text, centerX - font.width(text) / 2, y, color, false);
    }

    /** Right-aligned Hebrew that stays inside its page: a line wider than maxWidth continues on the next line. */
    private int wrapped(GuiGraphicsExtractor g, String text, int rightX, int y, int maxWidth, int color) {
        String rest = text;
        while (!rest.isEmpty()) {
            String line = rest;
            while (font.width(line) > maxWidth && line.contains(" ")) line = line.substring(0, line.lastIndexOf(' '));
            rtl(g, line, rightX, y, color);
            rest = rest.substring(line.length()).trim();
            y += 10;
        }
        return y;
    }

    @Override
    public void extractRenderState(GuiGraphicsExtractor g, int mouseX, int mouseY, float partialTick) {
        super.extractRenderState(g, mouseX, mouseY, partialTick);
        g.fill(0, 0, width, height, 0xB0080C14);
        g.fill(left - 6, top - 6, left + W + 6, top + H + 6, COVER_EDGE);
        g.fill(left - 4, top - 4, left + W + 4, top + H + 4, COVER);
        g.fill(left, top, left + W, top + H, PAPER);
        g.fillGradient(left + W / 2 - 10, top, left + W / 2, top + H, PAPER, PAPER_SHADE);
        g.fillGradient(left + W / 2, top, left + W / 2 + 10, top + H, PAPER_SHADE, PAPER);
        g.fill(left + W / 2 - 1, top, left + W / 2 + 1, top + H, SPINE);
        stages(g);
        labAndWords(g);
        // every Hebrew line starts with a Hebrew word, or the game lays it out left to right
        centered(g, "לסגור: N או Esc", left + W / 2, top + H + 10, 0xFFE8DCC0);
    }

    // ---- the right page: the life of a star ----
    private void stages(GuiGraphicsExtractor g) {
        int right = left + W - 12, pageLeft = left + W / 2 + 12;
        rtl(g, "יומן הכוכבים", right, top + 8, INK);
        rtl(g, "מחזור החיים של כוכב", right, top + 19, FADED);
        int learned = score("#learn");
        for (int i = 0; i < STAGE_HE.length; i++) {
            int y = top + 33 + i * 31;
            boolean has = learned > i;
            g.fill(pageLeft, y, right, y + 28, has ? 0xFFFFF7DD : PAPER_SHADE);
            g.outline(pageLeft, y, right - pageLeft, 28, has ? GOLD : SPINE);
            g.fill(right - 24, y + 1, right - 1, y + 27, PAPER_SHADE);
            g.item(new ItemStack(STAGE_ICONS[i]), right - 20, y + 6);
            rtl(g, STAGE_HE[i], right - 28, y + 4, has ? INK : FADED);
            if (has) {
                g.text(font, STAGE_EN[i], pageLeft + 4, y + 4, TEAL, false);
                rtl(g, STAGE_LINE[i], right - 28, y + 16, FADED);
            } else {
                rtl(g, "עוד לא למדתם", right - 28, y + 16, FADED);
            }
        }
    }

    // ---- the left page: the lab, Max's words, the quiz ----
    private void labAndWords(GuiGraphicsExtractor g) {
        int right = left + W / 2 - 14, pageLeft = left + 14, width = right - pageLeft;
        int lab = score("#lab");
        rtl(g, "הניסוי במעבדה", right, top + 8, INK);
        rtl(g, "כוכב קטן מול כוכב ענק", right, top + 19, FADED);
        int y = top + 33;
        g.fill(pageLeft, y, right, y + 14, TEAL);
        rtl(g, "הכוכב", right - 4, y + 3, 0xFFFFFFFF);
        rtl(g, "אחרי מיליוני שנים", right - 62, y + 3, 0xFFFFFFFF);
        String[] who = {"הכוכב הקטן", "הכוכב הענק"};
        String[] after = {"עדיין זוהר", "התפוצץ: חור שחור"};
        for (int i = 0; i < 2; i++) {
            int ry = y + 14 + i * 18;
            g.fill(pageLeft, ry, right, ry + 18, i == 0 ? 0xFFFFF7DD : PAPER_SHADE);
            rtl(g, who[i], right - 4, ry + 5, INK);
            rtl(g, lab >= 2 ? after[i] : "?", right - 62, ry + 5, lab >= 2 ? (i == 0 ? GREEN : RED) : FADED);
        }
        g.outline(pageLeft, y, width, 50, TEAL);
        y += 56;
        if (lab >= 3) y = wrapped(g, "כוכב ענק שורף את הדלק שלו מהר, ולכן הוא חי פחות זמן.", right, y, width, INK);
        else y = wrapped(g, "הניסוי עוד לא נגמר.", right, y, width, FADED);

        y = Math.max(y + 4, top + 104);
        rtl(g, "המילים של מקס", right, y, INK);
        y += 12;
        int max = score("#max");
        // each pair on two lines: the Hebrew on the right, the English under it on the left, so they never meet
        for (int i = 0; i < WORDS_EN.length; i++) {
            boolean has = max > i + 1;
            g.fill(pageLeft, y, right, y + 23, i % 2 == 0 ? 0xFFFFF7DD : PAPER_SHADE);
            rtl(g, has ? WORDS_HE[i] : "?", right - 4, y + 2, has ? INK : FADED);
            if (has) g.text(font, WORDS_EN[i], pageLeft + 4, y + 12, TEAL, false);
            y += 24;
        }
        if (score("#quizdone") == 1) rtl(g, "בוחן הבסיס: " + score("#quiz") + " מתוך 3", right, top + H - 16, GREEN);
    }

    @Override
    public boolean keyPressed(KeyEvent event) {
        if (event.key() == 78) {                       // N closes the log, the same key that opened it
            onClose();
            return true;
        }
        return super.keyPressed(event);
    }
}
