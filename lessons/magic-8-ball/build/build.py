# -*- coding: utf-8 -*-
"""Extend the Hebrew App Inventor lesson with Part 2: building the Magic 8-Ball."""
import os, sys
from pptx import Presentation
from pptx.util import Emu, Pt
from pptx.dml.color import RGBColor
import crops
crops.run(verbose=False)
crops.derived()
from deckkit import *
import deckkit as K

SRC = "../deck/lesson1.pptx"
DST = "../out/lesson1_with_8ball.pptx"
IN = Inches

# tutorial media file  ->  generated stand-in
MISSING = []


def A(name):
    """Every picture on these slides comes from the MIT tutorial itself."""
    p, real = art(name)
    if p is None:
        MISSING.append(name)
        raise SystemExit("missing tutorial media: " + name)
    return p


prs = Presentation(SRC)
D = Deck(prs)
CARD = "F1F3FA"

# ============================================================ slide kinds ==
def s_full(title, paras, sz=2800):
    s = D.new(); D.title(s, title, sz=sz); D.box(s, BODY_FULL, paras); return s


def s_split(title, paras, image, caption=None, box=None):
    s = D.new(); D.title(s, title, half=True)
    D.box(s, BODY_HALF, paras)
    if image:
        b = box or IMG_HALF
        if caption:
            b = (b[0], b[1], b[2], b[3] - 240000)
        D.pic(s, image, b)
        if caption:
            D.box(s, (b[0], b[1] + b[3] + 30000, b[2], 260000),
                  [para(R(caption, color=GREY, sz=900), align="ctr")], anchor="t")
    return s


def s_hero(title, sub, image, note=None):
    s = D.new()
    D.box(s, (IN(4.30), IN(1.15), IN(5.40), IN(1.35)),
          [para(R(title, color=PINK, sz=4000, font=F_TITLE), line=95)], anchor="b")
    D.box(s, (IN(4.30), IN(2.60), IN(5.40), IN(1.90)),
          [para(R(sub, color=INK, sz=1500), line=95)])
    if image:
        D.pic(s, image, (IN(0.55), IN(0.85), IN(3.45), IN(3.45)))
    if note:
        D.box(s, (IN(0.40), IN(4.35), IN(9.20), IN(0.55)),
              [para(R(note, color=TEAL, sz=1200, b=True), align="ctr")])
    return s


def s_bigimg(title, image, paras=None, caption=None):
    s = D.new(); D.title(s, title)
    top, bot = IN(1.66), IN(4.85)
    if paras:
        D.box(s, (IN(0.34), IN(1.63), IN(9.32), IN(0.74)), paras)
        top = IN(2.42)
    if caption:
        bot -= IN(0.30)
    D.pic(s, image, (IN(0.55), top, IN(8.90), bot - top))
    if caption:
        D.box(s, (IN(0.40), bot + IN(0.04), IN(9.20), IN(0.30)),
              [para(R(caption, color=GREY, sz=1000), align="ctr")], anchor="t")
    return s


def s_blocks(title, intro, rows, note=None):
    """Bilingual block reference: the real English block on the right,
    the Hebrew reading of it on the left."""
    s = D.new(); D.title(s, title)
    top = IN(1.66)
    if intro:
        D.box(s, (IN(0.34), IN(1.63), IN(9.32), IN(0.42)), [para(intro)])
        top = IN(2.10)
    bot = IN(4.38) if note else IN(4.85)
    n = len(rows)
    gap = IN(0.08)
    rh = int((bot - top - gap * (n - 1)) / n)
    y = top
    for img, he_title, he_desc in rows:
        D.rrect(s, (IN(0.30), y, IN(9.40), rh), fill=CARD, radius=0.10)
        D.pic(s, img, (IN(5.05), y + IN(0.06), IN(4.55), rh - IN(0.12)),
              max_dpi=170)
        ps = [para(R(he_title, color=INK, sz=1300, b=True), line=95)]
        if he_desc:
            ps.append(para(R(he_desc, color=INK2, sz=1100), before=220, line=92))
        D.box(s, (IN(0.44), y, IN(4.52), rh), ps, anchor="ctr")
        y += rh + gap
    if note:
        D.box(s, (IN(0.34), IN(4.42), IN(9.32), IN(0.42)),
              [para(R(note, color=TEAL, sz=1150, b=True), line=95)])
    return s


def s_two(title, left_head, left, right_head, right):
    """Two comparison columns."""
    s = D.new(); D.title(s, title)
    for i, (hd, ps) in enumerate(((right_head, right), (left_head, left))):
        x = IN(0.34) + i * IN(4.78)
        D.rrect(s, (x, IN(1.66), IN(4.54), IN(3.19)), fill=CARD, radius=0.06)
        D.box(s, (x + IN(0.16), IN(1.76), IN(4.22), IN(0.42)),
              [para(R(hd, color=PINK, sz=1400, b=True, font=F_TITLE))])
        D.box(s, (x + IN(0.16), IN(2.20), IN(4.22), IN(2.58)), ps)
    return s



# ============================================================== shorthand ==
def P(*runs, **kw): return para(list(runs), **kw)
def TX(t, **kw):    return para(R(t, **kw), after=110, line=95)
def B(t, **kw):     return para(R(t, **kw), kind="b", after=110, line=95)
def H(t):           return para(R(t, color=PINK, sz=1500, b=True, font=F_TITLE),
                                before=280, after=90, line=95)
def SP(h=200):      return para(R(" ", sz=600), after=h)
def NOTE(t):        return para(R(t, color=TEAL, sz=1200, b=True), before=280, line=95)
def CB(he, en, sz=1300):
    """One bilingual line: Hebrew first (RTL), then the English block wording."""
    return P(R(he, color=INK, sz=sz), R("   =   ", color=GREY, sz=sz),
             code(en, color=INK2, sz=sz - 100), kind="b", after=100, line=95)


def s_gloss(title, left, right, lh, rh):
    s = D.new(); D.title(s, title)
    for i, (hd, rows) in enumerate(((rh, right), (lh, left))):
        x = IN(0.34) + i * IN(4.78)
        D.rrect(s, (x, IN(1.66), IN(4.54), IN(3.19)), fill=CARD, radius=0.05)
        D.box(s, (x + IN(0.14), IN(1.74), IN(4.26), IN(0.38)),
              [para(R(hd, color=PINK, sz=1300, b=True, font=F_TITLE))])
        ps = [P(R(he, color=INK, sz=1150, b=True), R("  ", sz=1150),
                code(en, color=INK2, sz=1100), after=95, line=92)
              for en, he in rows]
        D.box(s, (x + IN(0.14), IN(2.14), IN(4.26), IN(2.64)), ps)
    return s


# ============================================================== bridge =====
# the old closing slide promised the app "next lesson" - it now opens part two
for sh in prs.slides[27].shapes:
    if sh.has_text_frame:
        for p_ in sh.text_frame.paragraphs:
            for r_ in p_.runs:
                if "שיעור הבא" in r_.text:
                    r_.text = "ועכשיו - בחלק השני של השיעור נבנה את האפליקציה הראשונה שלנו!"

# ============================================================== part two ===
s_hero("חלק 2: כדור הקסם",
       "בחלק הראשון הכרנו את שלבי הפיתוח, את הלוגיקה ואת סביבת העבודה של "
       "MIT App Inventor. עכשיו נשתמש בכל מה שלמדנו ונבנה יחד את האפליקציה "
       "הראשונה שלנו: Magic 8-Ball - כדור הקסם שחוזה את העתיד.",
       A("8ball_big"),
       note="שואלים שאלה   ←   מנערים את הטלפון   ←   מקבלים תשובה")

s_split("מה זה כדור הקסם?", [
    TX("כדור הקסם הוא צעצוע אמריקאי מפורסם משנת 1950: כדור ביליארד שחור עם "
       "המספר 8, ובתוכו נוזל וקובייה צפה עם 20 תשובות. שואלים שאלה של כן או לא, "
       "מנערים את הכדור, והתשובה צפה אל החלון."),
    H("ומה אנחנו נבנה?"),
    B("תמונה של כדור הקסם על המסך"),
    B("לחיצה על הכדור (ובהמשך - ניעור הטלפון) תשמיע צליל"),
    B("ותציג אחת מהתשובות שנכתוב מראש"),
    NOTE("הכדור לא באמת יודע לחזות את העתיד - הוא בוחר תשובה אקראית מתוך "
         "רשימה. בדיוק את זה נלמד לתכנת."),
], A("8ball_big"), box=(IN(5.30), IN(1.10), IN(4.10), IN(3.40)))

s_two("שלושת שלבי הפיתוח - הפעם באמת",
      "איך זה מתורגם לכדור הקסם?", [
          B("תכנון: נחליט מה האפליקציה עושה ואילו רכיבים היא צריכה"),
          B("עיצוב: נגרור רכיבים ב-Designer ונקבע להם תכונות"),
          B("תכנות התנהגות: נחבר בלוקים ב-Blocks Editor"),
          NOTE("אחרי כל שלב נבדוק על הטלפון שהכול עובד - לפני שממשיכים."),
      ],
      "מה למדנו בחלק הראשון?", [
          TX("ראינו שכל פיתוח אפליקציה מורכב משלושה שלבים:"),
          B("שלב התכנון - מה נבנה ולמה"),
          B("שלב העיצוב - איך זה ייראה"),
          B("שלב תכנות ההתנהגות - מה יקרה כשהמשתמש יפעיל אותה"),
          NOTE("שלושת השלבים האלה מלווים כל אפליקציה, גדולה כקטנה."),
      ])

s_full("שלב התכנון: בונים בשלוש פעימות", [
    TX("לא בונים אפליקציה בבת אחת. מוסיפים יכולת אחת, בודקים שהיא עובדת, "
       "ורק אז ממשיכים. ככה עובדים מתכנתים אמיתיים - וככה נבנה גם אנחנו:"),
    P(R("שלב 1", color=PINK, sz=1500, b=True, font=F_TITLE),
      R("   לוחצים על תמונת הכדור   ←   נשמע צליל", color=INK, sz=1400),
      before=300, line=95),
    P(R("שלב 2", color=PINK, sz=1500, b=True, font=F_TITLE),
      R("   לוחצים על הכדור   ←   מופיעה תשובה אקראית + נשמע צליל",
        color=INK, sz=1400), before=200, line=95),
    P(R("שלב 3", color=PINK, sz=1500, b=True, font=F_TITLE),
      R("   מנערים את הטלפון   ←   מופיעה תשובה אקראית + נשמע צליל",
        color=INK, sz=1400), before=200, line=95),
    NOTE("שלב 3 דורש טלפון או טאבלט אמיתי עם חיישן תאוצה. באמולטור אי אפשר "
         "לנער את המכשיר - אז מי שעובד באמולטור יעצור בשלב 2."),
])

s_split("יוצרים פרויקט חדש", [
    TX("נכנסים ל-ai2.appinventor.mit.edu ומתחברים עם חשבון הגוגל, בדיוק "
       "כמו שראינו בחלק הראשון. ואז:"),
    B("בתפריט העליון: Project ואז My Projects"),
    B("לוחצים על Start new project"),
    B("נותנים שם ולוחצים OK"),
    NOTE("חשוב! בשם הפרויקט אסור רווחים, הוא חייב להתחיל באות, ומותרים בו "
         "רק אותיות באנגלית, ספרות וקו תחתון. לכן: Magic8Ball ולא Magic 8 Ball."),
], A("newproject"), box=(IN(4.75), IN(1.35), IN(5.05), IN(2.75)))

s_split("הקבצים שנצטרך", [
    TX("לאפליקציה דרושים שני קבצים בלבד:"),
    B("תמונה אחת של כדור הקסם - 8ball.jpg"),
    B("קובץ צליל אחד - למשל Tada.mp3, Cha_Ching.mp3 או "
      "Clinking_Teaspoon.mp3"),
    H("איפה מורידים?"),
    B("מדף השיעור של MIT: appinventor.mit.edu/explore/ai2/magic-8-ball"),
    B("או מספריית המדיה: appinventor.mit.edu/explore/media-library"),
    NOTE("אפשר גם תמונה וצליל משלכם. שמרו את הקבצים במקום שתזכרו במחשב - "
         "עוד רגע נעלה אותם לפרויקט."),
], A("8ball_big"), box=(IN(5.30), IN(1.20), IN(4.10), IN(3.20)))

# ------------------------------------------------------- DESIGN, stage 1 --
s_split("עיצוב: מוסיפים את הכפתור", [
    TX("הרכיב הראשון הוא כפתור - Button. הכפתור הוא הכדור עצמו: נשים עליו "
       "תמונה, וכשלוחצים עליו יקרה משהו."),
    B("בעמודה השמאלית (Palette) פותחים את המגירה User Interface"),
    B("גוררים את Button אל תוך המסך שב-Viewer"),
    B("בחלון Components מופיע רכיב חדש בשם Button1"),
    NOTE("App Inventor נותן לכל רכיב שם אוטומטי עם מספר - Button1, Button2 "
         "וכן הלאה. בשם הזה נשתמש אחר כך בבלוקים."),
], A("newbutton"), box=(IN(4.72), IN(1.15), IN(5.10), IN(3.10)))

s_split("עיצוב: תכונות הכפתור", [
    TX("עכשיו נהפוך את הכפתור האפור לכדור קסם. בוחרים את Button1, "
       "ומשנים לו שתי תכונות בחלון Properties:"),
    P(code("Image"), R("   לוחצים על ...None, אחר כך Upload File, בוחרים את "
                       "תמונת הכדור ומאשרים ב-OK", color=INK, sz=1300),
      kind="b", after=150, line=95),
    P(code("Text"), R("   מוחקים את המילה Text, כדי שלא תופיע כתובית על הכדור",
                      color=INK, sz=1300), kind="b", after=150, line=95),
    NOTE("התמונה שהעליתם נשמרת אוטומטית בחלון Media, שם נמצאים כל קבצי "
         "המדיה של הפרויקט."),
], A("buttonproperties"), box=(IN(6.20), IN(0.75), IN(2.30), IN(4.25)))

s_split("עיצוב: מוסיפים נגן צלילים", [
    TX("כדי להשמיע צליל צריך רכיב שיודע לנגן, ושמו Player."),
    B("במגירה Media גוררים את Player אל המסך"),
    B("שימו לב - Player לא נראה על המסך! הוא צונח לאזור "
      "Non-visible components שמתחת לטלפון"),
    B("בוחרים את Player1, ובתכונה Source מעלים את קובץ הצליל"),
    NOTE("רכיב בלתי נראה עושה עבודה מאחורי הקלעים: נגן, חיישן, שעון. "
         "הוא קיים באפליקציה - המשתמש פשוט לא רואה אותו."),
], A("soundproperties"), box=(IN(4.72), IN(1.05), IN(5.10), IN(3.30)))

s_split("עוברים ל-Blocks Editor", [
    TX("סיימנו את העיצוב של שלב 1. בפינה הימנית העליונה לוחצים על Blocks."),
    H("מה יש שם?"),
    B("Built-in - המגירות הכלליות: Control, Logic, Math, Text, Lists ועוד"),
    B("Screen1 - הרכיבים שהוספנו: Button1, Player1..."),
    B("לחיצה על מגירה פותחת את כל הבלוקים שלה"),
    NOTE("גוררים בלוק מהמגירה אל הקנבס. בלוקים נצמדים זה לזה כמו פאזל "
         "מגנטי - ורק אם הם באמת מתאימים."),
], A("blocks_drag"), box=(IN(4.72), IN(1.00), IN(5.10), IN(3.40)))

s_blocks("הבלוקים של שלב 1 - אנגלית ועברית", None,
         [(A("blk_when_click"),
           "כאשר לוחצים על Button1 - בצע",
           "when = כאשר   |   Click = לחיצה   |   do = בצע. "
           "בלוק אירוע: הוא לא רץ כל הזמן, אלא מחכה שהמשתמש ילחץ. "
           "נמצא במגירה Button1."),
          (A("blk_call_start"),
           "הפעל את Player1 - התחל לנגן",
           "call = הפעל / קרא ל   |   Start = התחל. "
           "פקודה לרכיב: אמרנו ל-Player1 לנגן את הצליל שהגדרנו לו ב-Source. "
           "נמצא במגירה Player1.")],
         note="שימו לב: הפעולה של רכיב Player נקראת Start (ולא Play).")

s_bigimg("התוכנית המלאה של שלב 1", A("prog_part1"), paras=[
    TX("גוררים את when Button1.Click לקנבס, ואז מכניסים את "
       "call Player1.Start אל תוך החלל של do. זהו - זו כל התוכנית.")],
    caption="when Button1.Click  →  do  →  call Player1.Start")

s_full("איך קוראים את זה בעברית?", [
    P(R("כאשר ", color=GOLD, sz=1700, b=True),
      R("לוחצים על הכפתור ", color=INK, sz=1700),
      R("Button1", color=GOLD, sz=1700, b=True, font=F_CODE),
      R(" אז ", color=INK, sz=1700),
      R("נגן את הצליל", color=PURPLE, sz=1700, b=True), line=95),
    SP(150),
    TX("זוכרים את מתג האור מהחלק הראשון? אם אני לוחץ על המתג - אז האור "
       "נדלק. כאן זה בדיוק אותו הדבר, רק עם כפתור וצליל."),
    H("מה קורה מאחורי הקלעים?"),
    B("האפליקציה יושבת ומחכה - היא לא עושה כלום עד שקורה אירוע (event)"),
    B("הלחיצה על הכפתור היא האירוע שמפעיל את הבלוק"),
    B("כל מה שנמצא בתוך ה-do ירוץ, פקודה אחרי פקודה, מלמעלה למטה"),
])

s_blocks("סוגי הבלוקים והצבעים שלהם", None,
         [(A("blk_when_click"), "בלוק אירוע (Event) - כתום",
           "when ... do  =  כאשר קורה משהו, בצע. תמיד הבלוק החיצוני ביותר."),
          (A("blk_call_start"), "בלוק פקודה (Method) - סגול",
           "call ...  =  הפעל פעולה של רכיב: נגן, דבר, צלם."),
          (A("blk_set_text2"), "בלוק קביעת תכונה (Set) - ירוק",
           "set ... to  =  שנה תכונה של רכיב: טקסט, צבע, גודל."),
          (A("blk_make_list"), "בלוק רשימה (Lists) - כחול",
           "make a list  =  צור רשימה. אוסף מסודר של פריטים."),
          (A("blk_text_filled"), "בלוק טקסט (Text) - ורוד",
           'טקסט חופשי בין גרשיים. באנגלית קוראים לזה string.')])

s_split("בודקים שהכול עובד", [
    TX("אפליקציה בודקים על מכשיר, לא רק בעיניים. שתי דרכים:"),
    P(code("AI2 Companion"),
      R("   מתקינים את האפליקציה בטלפון, לוחצים במחשב על Connect ואז "
        "AI Companion, וסורקים את הברקוד שמופיע", color=INK, sz=1300),
      kind="b", after=150, line=95),
    P(code("Emulator"),
      R("   טלפון וירטואלי על המחשב, למי שאין מכשיר אנדרואיד",
        color=INK, sz=1300), kind="b", after=150, line=95),
    NOTE("לוחצים על הכדור - אמור להישמע הצליל. לא נשמע? בדקו שעוצמת הקול "
         "פתוחה, ושבאמת בחרתם קובץ בתכונה Source של Player1."),
], A("align"), box=(IN(4.72), IN(1.20), IN(5.10), IN(3.00)))

# ------------------------------------------------------------- stage 2 ----
s_full("שלב 2: הכדור נותן תשובה", [
    TX("עכשיו נוסיף את הדבר החשוב באמת - התשובה. לשם כך נצטרך תוספות "
       "בשני העולמות שהכרנו:"),
    H("ב-Designer (עיצוב)"),
    B("שתי תוויות (Labels): Label1 להוראות, ו-Label2 לתשובה עצמה"),
    B("מסדר אנכי (VerticalArrangement) שיסדר את הכול אחד מתחת לשני"),
    H("ב-Blocks Editor (תכנות)"),
    B("רשימה של תשובות שנכתוב מראש"),
    B("בלוק שבוחר מהרשימה תשובה אקראית ומציג אותה ב-Label2"),
])

s_split("עיצוב: מסדר אנכי", [
    TX("בלי מסדר, הרכיבים יתפזרו על המסך. המסדר האנכי הוא כמו קופסה: "
       "כל מה שנשים בתוכה יסתדר אחד מתחת לשני, לפי הסדר."),
    B("במגירה Layout גוררים VerticalArrangement אל המסך"),
    B("בהתחלה זו רק מסגרת ריקה - וזה בסדר גמור"),
    B("בתכונה AlignHorizontal אפשר לבחור Center כדי למרכז את התוכן"),
    NOTE("יש גם HorizontalArrangement שמסדר רכיבים זה לצד זה, "
         "ו-TableArrangement שמסדר אותם בטבלה."),
], A("viewer_addvertarr"), box=(IN(4.90), IN(1.15), IN(4.85), IN(3.15)))

s_split("עיצוב: שתי התוויות", [
    TX("Label הוא רכיב שכל תפקידו להציג טקסט. גוררים שני Labels מהמגירה "
       "User Interface אל תוך המסדר, ומשנים להם את התכונה Text:"),
    P(code("Label1"), R("   שאל את כדור הקסם שאלה", color=INK, sz=1300),
      kind="b", after=150, line=95),
    P(code("Label2"), R("   גע בכדור הקסם כדי לקבל תשובה", color=INK, sz=1300),
      kind="b", after=150, line=95),
    NOTE("Label1 הוא ההוראה למשתמש והוא לא ישתנה לעולם. Label2 הוא זה "
         "שהבלוקים יחליפו לו את הטקסט בכל לחיצה."),
], A("vert_addlabel"), box=(IN(4.72), IN(1.15), IN(5.10), IN(3.10)))

s_split("עיצוב: מסדרים הכול יחד", [
    TX("לבסוף גוררים גם את Button1 אל תוך ה-VerticalArrangement, מתחת "
       "לשתי התוויות. עכשיו שלושת הרכיבים מסודרים בטור אחד."),
    NOTE("גרירה פנימה היא עבודה עדינה עם העכבר. סימן שהצלחתם: המסגרת של "
         "המסדר גדלה בעצמה כדי להכיל את הכול, וב-Components הרכיבים "
         "מופיעים מוזחים פנימה מתחת ל-VerticalArrangement1."),
    H("בדקו את עץ הרכיבים"),
    B("Screen1  ←  VerticalArrangement1  ←  Label1, Label2, Button1"),
    B("Player1 יושב בנפרד - הוא רכיב בלתי נראה"),
], A("align"), box=(IN(4.72), IN(1.20), IN(5.10), IN(3.00)))

s_blocks("בלוק חדש: קביעת טקסט לתווית", None,
         [(A("blk_set_bgcolor"), "כך הבלוק מגיע מהמגירה",
           "גוררים מהמגירה Label2 את הבלוק הירוק set, והוא מגיע עם התכונה "
           "BackgroundColor - וזו לא התכונה שאנחנו צריכים."),
          (A("blk_set_text2"), "קבע את הטקסט של Label2 להיות...",
           "לוחצים על המילה BackgroundColor, נפתחת רשימה, ובוחרים Text. "
           "set = קבע   |   to = להיות.")],
         note="את הבלוק הזה מכניסים לתוך ה-do, מעל הבלוק call Player1.Start.")

s_split("הרשימה הנפתחת (Dropdown)", [
    TX("הרבה בלוקים ב-App Inventor הם בלוק אחד שמשרת הרבה תכונות. "
       "המשולש הקטן שליד המילה מסמן רשימה נפתחת."),
    B("לוחצים על המילה BackgroundColor שבתוך הבלוק"),
    B("נפתחת רשימת כל התכונות של Label: FontSize, Height, Text, "
      "TextColor, Visible, Width ועוד"),
    B("בוחרים Text - והבלוק משנה את עצמו ל-set Label2.Text to"),
    NOTE("אותו טריק עובד גם על שם הרכיב: אפשר ללחוץ על Label2 ולהחליף "
         "אותו ב-Label1 בלי לגרור בלוק חדש."),
], A("dropdown_menu"), box=(IN(5.60), IN(0.90), IN(3.60), IN(3.90)))

s_blocks("בלוקים של רשימות (Lists)",
         R("רשימה היא אוסף מסודר של פריטים - כמו רשימת קניות. שני הבלוקים "
           "האלה נמצאים במגירה Lists שתחת Built-in:", color=INK, sz=1300),
         [(A("blk_pick_palette"), "בחר פריט אקראי מתוך הרשימה",
           "pick a random item = בחר פריט אקראי   |   list = רשימה. "
           "בכל הפעלה הוא מגריל פריט אחר. זה סוד הקסם של הכדור."),
          (A("blk_make_list"), "צור רשימה",
           "make a list = צור רשימה   |   item = פריט. "
           "כאן נכתוב את כל התשובות האפשריות.")],
         note="מחברים את make a list אל השקע שבצד ימין של pick a random item.")

s_split("המוטטור - גלגל השיניים", [
    TX("הבלוק make a list מגיע עם שני שקעים בלבד. איך מוסיפים עוד?"),
    B("לוחצים על גלגל השיניים הכחול שבפינת הבלוק"),
    B("נפתח חלון קטן עם בלוק list ובלוקי item"),
    B("גוררים item נוסף לתוך ה-list - וכל גרירה מוסיפה שקע חדש"),
    B("לוחצים שוב על הגלגל כדי לסגור"),
    NOTE("בלוק שאפשר להרחיב ולכווץ ככה נקרא mutator - בלוק מִשְׁתַּנֶּה. "
         "גם create empty list ו-add items to list הם מוטטורים."),
], A("blk_list_drawer"), box=(IN(5.40), IN(1.25), IN(4.00), IN(2.90)))

s_blocks("בלוק הטקסט - כותבים את התשובות",
         R("נשאר רק למלא את הרשימה. את בלוק הטקסט לוקחים מהמגירה Text:",
           color=INK, sz=1300),
         [(A("blk_text_filled"), "בלוק טקסט אחד",
           "לוחצים על השדה הלבן שבין הגרשיים וכותבים בפנים את התשובה. "
           "אפשר לכתוב גם בעברית."),
          (A("blk_list_items"), "כל תשובה בבלוק משלה",
           "כל בלוק טקסט מתחבר לשקע item משלו בתוך make a list - "
           "וכך נבנית רשימת התשובות.")],
         note="מומלץ 8 עד 20 תשובות. ככל שיש יותר - כך הכדור מרגיש אקראי יותר.")

s_bigimg("התוכנית המלאה של שלב 2", A("finalblocks"), paras=[
    TX("ככה נראית התוכנית אחרי שחיברנו את הכול. שימו לב שהבלוקים מקוננים "
       "זה בתוך זה, כמו קופסאות בתוך קופסאות.")])

s_full("קוראים את התוכנית שורה-שורה", [
    P(R("כאשר לוחצים על Button1, בצע:", color=GOLD, sz=1500, b=True), line=95),
    P(R("קבע את הטקסט של Label2 להיות...", color="3E8A63", sz=1400, b=True),
      before=220, line=95),
    P(R("...פריט אקראי מתוך רשימה...", color="3D8FBA", sz=1400, b=True),
      before=130, line=95),
    P(R("...המורכבת משמונה התשובות שכתבנו", color="B32D5E", sz=1400, b=True),
      before=130, line=95),
    P(R("ואז הפעל את Player1 והשמע את הצליל", color=PURPLE, sz=1400, b=True),
      before=220, line=95),
    NOTE("הסדר חשוב: קודם מציגים את התשובה, ורק אחר כך משמיעים צליל. "
         "המחשב מבצע את הפקודות אחת אחרי השנייה, מלמעלה למטה."),
])

s_split("שמונה התשובות של המדריך", [
    TX("אלה שמונה התשובות שמופיעות בתמונה, והתרגום שלהן:", sz=1300),
    CB("זה בטוח", "It is certain", 1250),
    CB("ללא ספק", "Without a doubt", 1250),
    CB("כפי שאני רואה זאת - כן", "As I see it, yes", 1250),
    CB("שאל אותי שוב מאוחר יותר", "Ask again later", 1250),
    CB("התשובה מעורפלת, נסה שוב", "Reply hazy try again", 1250),
    CB("אל תסמוך על זה", "Don't count on it", 1250),
    CB("המקורות שלי אומרים שלא", "My sources say no", 1250),
    CB("התחזית לא משהו", "Outlook not so good", 1250),
], A("blk_predictions"), box=(IN(5.70), IN(1.00), IN(3.60), IN(4.00)))

s_two("עוד תשובות לבחירתכם",
      "תשובות שליליות ומתחמקות", [
          CB("תשובתי היא לא", "My reply is no", 1100),
          CB("מוטל בספק רב", "Very doubtful", 1100),
          CB("עדיף שלא אגיד לך עכשיו", "Better not tell you now", 1100),
          CB("לא ניתן לחזות כרגע", "Cannot predict now", 1100),
          CB("התרכז ושאל שוב", "Concentrate and ask again", 1100),
          NOTE("אפשר וכדאי לכתוב תשובות בעברית - App Inventor תומך בעברית "
               "בתוך בלוקי טקסט."),
      ],
      "תשובות חיוביות", [
          CB("כן, בהחלט", "Yes definitely", 1100),
          CB("אפשר לסמוך על זה", "You may rely on it", 1100),
          CB("סביר מאוד", "Most likely", 1100),
          CB("התחזית טובה", "Outlook good", 1100),
          CB("הסימנים מצביעים על כן", "Signs point to yes", 1100),
          NOTE("בכדור המקורי יש בדיוק 20 תשובות: 10 חיוביות, 5 מתחמקות "
               "ו-5 שליליות."),
      ])

# ------------------------------------------------------------- stage 3 ----
s_full("שלב 3: מנערים את הטלפון", [
    TX("האפליקציה עובדת - אבל כדור קסם אמיתי לא לוחצים, מנערים! "
       "בשביל זה נשתמש בחיישן התאוצה - AccelerometerSensor."),
    H("מה זה חיישן תאוצה?"),
    B("רכיב חומרה שיושב בתוך הטלפון ומודד תאוצה בשלושה צירים"),
    B("הוא זה שיודע מתי סובבתם את המסך, כמה צעדים הלכתם, ומתי ניערתם"),
    B("App Inventor כבר עשה בשבילנו את החישוב המסובך והכין אירוע מוכן "
      "בשם Shaking"),
    NOTE("שימו לב: את השלב הזה אפשר לבצע רק על טלפון או טאבלט אמיתי. "
         "באמולטור אי אפשר לדמות ניעור - אז דלגו ישר לאתגר."),
])

s_full("עיצוב: מוסיפים את החיישן", [
    TX("זהו הרכיב היחיד שנוסיף בשלב הזה - ושלושה צעדים קטנים:"),
    B("חוזרים ל-Designer"),
    B("במגירה Sensors גוררים את AccelerometerSensor אל המסך"),
    B("גם הוא רכיב בלתי נראה, ולכן צונח לאזור "
      "Non-visible components יחד עם Player1"),
    H("תכונה ששווה להכיר"),
    B("Sensitivity (רגישות) - אפשר לבחור weak, moderate או strong. "
      "אם הכדור מגיב יותר מדי בקלות, בחרו weak"),
    NOTE("החיישן לא צריך שום עיצוב ולא תופס מקום על המסך - הוא פשוט "
         "יושב שם ומחכה שהמכשיר יזוז."),
])

s_blocks("הבלוק החדש של שלב 3", None,
         [(A("blk_when_shaking"),
           "כאשר מנערים את הטלפון - בצע",
           "when = כאשר   |   Shaking = ניעור   |   do = בצע. "
           "בדיוק כמו when Button1.Click, רק שהפעם האירוע הוא ניעור "
           "המכשיר במקום לחיצה. נמצא במגירה AccelerometerSensor1."),
          (A("prog_part1"),
           "מה עושים עם הבלוקים הישנים?",
           "מוציאים את כל הבלוקים מתוך ה-do של when Button1.Click, "
           "מכניסים אותם לתוך ה-do של when AccelerometerSensor1.Shaking, "
           "ואז מוחקים את הבלוק הריק שנשאר.")],
         note="טיפ: גוררים את הבלוק העליון ביותר - וכל הבלוקים המחוברים אליו "
              "באים איתו. למחיקה: גוררים לפח האשפה, או Delete במקלדת.")

s_bigimg("התוכנית הסופית", A("shaking"), paras=[
    TX("אותה תוכנית בדיוק - רק שהאירוע שמפעיל אותה הוא ניעור הטלפון "
       "ולא לחיצה על כפתור. הכפתור נשאר על המסך בתור התמונה של הכדור.")])

s_split("מתקינים את האפליקציה על הטלפון", [
    TX("כל עוד אתם מחוברים ב-Companion, האפליקציה חיה על השרת של MIT. "
       "כדי שהיא תישאר בטלפון גם אחרי הניתוק, צריך לארוז אותה:"),
    B("בתפריט העליון: Build"),
    B("בוחרים Android App (.apk)"),
    B("מחכים לבנייה, ואז סורקים את הברקוד עם הטלפון - או מורידים "
      "את קובץ ה-apk למחשב"),
    NOTE("הברקוד שמשמאל הוא של אפליקציית הדוגמה של MIT. הברקוד שלכם "
         "יהיה שונה, והוא תקף לשעתיים בלבד."),
], A("barcode_big"), box=(IN(6.20), IN(1.55), IN(2.60), IN(2.60)))

# ------------------------------------------------------- challenges -------
s_full("אתגר 1: שהכדור ידבר", [
    TX("במקום (או בנוסף) להציג את התשובה כטקסט - אפשר לגרום לטלפון "
       "להקריא אותה בקול. כך עושים את זה:"),
    H("ב-Designer"),
    B("מהמגירה Media גוררים רכיב TextToSpeech - גם הוא בלתי נראה"),
    H("ב-Blocks Editor"),
    B("מהמגירה TextToSpeech1 גוררים את call TextToSpeech1.Speak"),
    B("מכניסים אותו לתוך ה-do, אחרי בלוק ה-set"),
    B("לשקע message מחברים את הבלוק Label2.Text מהמגירה Label2 - "
      "כך הוא יקריא בדיוק את מה שכתוב על המסך"),
    NOTE("call TextToSpeech1.Speak message = הקרא בקול את ההודעה. "
         "ברוב מכשירי האנדרואיד זה עובד מיד; אם לא - צריך להתקין "
         "או להפעיל TTS בהגדרות המכשיר."),
])

s_two("אתגרים והרחבות",
      "רעיונות לאפליקציות דומות", [
          B("קובייה: הגרילו מספר בין 1 ל-6 עם בלוק random integer"),
          B("הטלת מטבע: רשימה עם שני פריטים בלבד - עץ ופלי"),
          B("מגריל שמות: רשימת התלמידים בכיתה, ולחיצה בוחרת אחד"),
          B("מחולל צבעים אקראי לבדיקת הסתברות"),
          NOTE("כל אלה הם אותה תוכנית בדיוק - רק עם רשימה אחרת."),
      ],
      "שדרוגים לכדור עצמו", [
          B("שהתמונה תסתובב או תתחלף בזמן הניעור"),
          B("תמונה שונה לכל סוג תשובה - חיובית, שלילית או מתחמקת"),
          B("שהמשתמש יוכל להוסיף תשובות משלו לרשימה"),
          B("החליפו את התשובות לתשובות מצחיקות משלכם"),
          NOTE("כל שדרוג כזה מתחיל באותה שאלה: איזה רכיב ואיזה בלוק "
               "אני צריך?"),
      ])

# -------------------------------------------------------- reference -------
s_gloss("מילון הבלוקים: אנגלית - עברית",
        [("when ... do", "כאשר ... בצע"),
         ("call", "הפעל / קרא ל"),
         ("set ... to", "קבע ... להיות"),
         ("Click", "לחיצה"),
         ("Shaking", "ניעור"),
         ("Start / Play", "התחל לנגן"),
         ("Text", "טקסט"),
         ("Speak / message", "דבר / הודעה"),
         ("Image", "תמונה"),
         ("Source", "מקור (הקובץ)")],
        [("make a list", "צור רשימה"),
         ("pick a random item", "בחר פריט אקראי"),
         ("list / item", "רשימה / פריט"),
         ("length of list", "אורך הרשימה"),
         ("is list empty?", "האם הרשימה ריקה?"),
         ("add items to list", "הוסף פריטים לרשימה"),
         ("create empty list", "צור רשימה ריקה"),
         ("select list item", "בחר פריט לפי מיקום"),
         ("index in list", "המיקום ברשימה"),
         ("random integer", "מספר שלם אקראי")],
        "בלוקים של רכיבים", "בלוקים של רשימות")

s_gloss("מילון סביבת העבודה",
        [("Designer", "מסך העיצוב"),
         ("Blocks Editor", "עורך הבלוקים"),
         ("Palette", "מגירת הרכיבים"),
         ("Viewer", "הקנבס / התצוגה"),
         ("Components", "רשימת הרכיבים"),
         ("Properties", "תכונות הרכיב"),
         ("Media", "קבצי המדיה"),
         ("Non-visible component", "רכיב בלתי נראה"),
         ("Built-in", "המגירות המובנות"),
         ("Mutator", "בלוק מִשְׁתַּנֶּה (גלגל שיניים)")],
        [("Button", "כפתור"),
         ("Label", "תווית טקסט"),
         ("Player", "נגן צלילים"),
         ("VerticalArrangement", "מסדר אנכי"),
         ("HorizontalArrangement", "מסדר אופקי"),
         ("AccelerometerSensor", "חיישן תאוצה"),
         ("TextToSpeech", "המרת טקסט לדיבור"),
         ("Screen", "מסך"),
         ("Event", "אירוע"),
         ("Property", "תכונה")],
        "רכיבים ומושגים", "אזורי המסך")

s_two("פתרון תקלות נפוצות",
      "בעיות בבלוקים", [
          B("הבלוק לא נכנס? בדקו את הצורה - בלוק פקודה נכנס רק לתוך do"),
          B("סימן קריאה אדום או משולש צהוב? יש בלוק ריק או בלוק "
            "שלא מחובר לכלום"),
          B("שכחתם לשנות את BackgroundColor ל-Text ברשימה הנפתחת"),
          B("הבלוק נעלם? אולי גררתם אותו לפח - Ctrl+Z מחזיר"),
      ],
      "בעיות באפליקציה", [
          B("אין צליל? בדקו עוצמת קול, ושבחרתם קובץ ב-Source"),
          B("אין תשובה? ודאו שהבלוק set מצביע על Label2 ולא על Label1"),
          B("הניעור לא עובד? זה עובד רק על מכשיר אמיתי, לא באמולטור"),
          B("אותה תשובה כל הזמן? זה יכול לקרות באקראיות - נסו שוב, "
            "או הוסיפו עוד תשובות לרשימה"),
      ])

s_full("אז מה למדנו היום?", [
    B("בנינו אפליקציה שלמה מאפס - מרעיון ועד קובץ שרץ על הטלפון"),
    B("הכרנו רכיבים חדשים: Button, Label, Player, VerticalArrangement "
      "ו-AccelerometerSensor"),
    B("למדנו מה זה רכיב בלתי נראה, ומה ההבדל בין תכונה (Property) "
      "לבין פעולה (Method)"),
    B("הבנו מה זה אירוע (Event): הקוד מחכה, ומשהו מבחוץ מפעיל אותו"),
    B("עבדנו עם רשימה (List) ולמדנו לבחור ממנה פריט אקראי"),
    B("ראינו שאותה תוכנית בדיוק יכולה לרוץ מאירועים שונים - "
      "לחיצה או ניעור"),
    NOTE("בשיעור הבא נמשיך לאפליקציה מורכבת יותר - ונוסיף משתנים, "
         "תנאים ומסכים נוספים."),
])

# ------------------------------------------------------------- credits ----
s = D.new()
D.title(s, "קרדיטים ומקורות")
D.box(s, BODY_FULL, [
    TX("השיעור מבוסס על המדריך הרשמי Magic 8-Ball של MIT App Inventor:"),
    TX("appinventor.mit.edu/explore/ai2/magic-8-ball", color=INK2, sz=1300),
    SP(150),
    TX("צילומי המסך והתמונות בחלק זה לקוחים מהמדריך המקורי."),
    TX("© 2012-2025 Massachusetts Institute of Technology, "
       "ברישיון Creative Commons Attribution-ShareAlike 4.0 International "
       "(CC BY-SA 4.0).", color=GREY, sz=1200),
    NOTE("אפשר להוריד את קוד המקור (קובץ aia.) של האפליקציה מדף המדריך, "
         "ולפתוח אותו דרך Projects  ←  Import project (.aia) from my computer."),
])

# =========================================== house font: Assistant ========
def use_assistant(prs, body=("Alef",), heavy=("Open Sans ExtraBold",),
                  to="Assistant"):
    """Swap the deck's Hebrew faces for Assistant, old slides included.
    Runs that used the ExtraBold display face keep their weight via b=1."""
    from pptx.oxml.ns import qn
    swapped = 0
    parts = [sl._element for sl in prs.slides]
    parts += [l._element for m in prs.slide_masters for l in m.slide_layouts]
    parts += [m._element for m in prs.slide_masters]
    for root in parts:
        for el in root.iter():
            tag = el.tag.split("}")[-1]
            if tag in ("rPr", "endParaRPr", "defRPr"):
                bold = False
                for ch in el:
                    if ch.tag.split("}")[-1] in ("latin", "ea", "cs", "sym"):
                        tf = ch.get("typeface")
                        if tf in heavy:
                            bold = True
                        if tf in body or tf in heavy:
                            ch.set("typeface", to); swapped += 1
                if bold:
                    el.set("b", "1")
            elif tag == "buFont" and el.get("typeface") in body + heavy:
                el.set("typeface", to)
    return swapped


print("font runs swapped to Assistant:", use_assistant(prs))

# ================================================================= save ===
os.makedirs(os.path.dirname(DST), exist_ok=True)
prs.save(DST)
print("slides:", len(prs.slides.__iter__.__self__._sldIdLst))
print("saved:", DST)
if MISSING:
    print("MISSING MEDIA:", MISSING)
