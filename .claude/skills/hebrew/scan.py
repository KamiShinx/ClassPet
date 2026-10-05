"""Flag Hebrew that may sound translated from English. Candidates to REVIEW, not verdicts.

Usage: python scan.py <file.md|file.txt>
Rule codes refer to references/SOURCES-DISTILLED.md. HTML comments, [MARKERS] and # headings are skipped.
Rules added 29 Sep 2026 are marked "(29/9)", and those from section 10b "(29/9b)"; regression-tested on the
owner-approved ep01 v5.6 (0 rule hits).
"""
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
raw = open(sys.argv[1], encoding='utf-8').read().replace('\r\n', '\n')
raw = re.sub(r'<!--.*?-->', '', raw, flags=re.S)
lines = [l for l in raw.splitlines() if l.strip() and not l.startswith(('#', '[')) and l.strip() != '---']
text = '\n'.join(lines)

H = '֐-׿'
B = rf'(?<![{H}])'          # start of a Hebrew word
E = rf'(?![{H}])'           # end of a Hebrew word
P = r'[והבלמשכ]{0,2}'        # optional one/two-letter prefixes
NUM = r'(?:אחת|אחד|שתיים|שניים|שתי|שני|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה|עשר|עשרה|עשרים|שלושים|ארבעים|חמישים|שישים|שבעים|שמונים|תשעים)'
UNIT = r'(?:שנים|שנה|חודשים|חודש|שבועות|שבוע|ימים|יום|שעות|שעה|דקות|דקה|שניות)'
SAY = r'(?:אומר|אומרת|אומרים|אמר|אמרה|אמרו|שואל|שואלת|שאל|שאלה|צועק|צועקת|צעק|צעקה|לוחש|לוחשת|לחש|לחשה|עונה|ענה|ענתה|מוסיף|מוסיפה|הוסיף|הוסיפה|כותב|כותבת|כתב|כתבה)'

def w(alts):
    return B + P + '(?:' + alts + ')' + E

RULES = [
    ('S2  could see/hear', B + r'(?:יכול|יכלה|יכלו|יכולה)\s+(?:היה|הייתה|היו)?\s*ל(?:ראות|שמוע)' + E),
    ('S4/S5 fronted relative', rf'{B}ה[{H}]+\s+(?:בה|בו|בהם|אליו|אליה|ממנו|ממנה|עליו|עליה|אותו|אותה|שאותו|שאותה)\s+(?:הוא|היא|הם|הן|אני|אנחנו|הייתי)' + E),
    ('S6  אשר', B + r'(?!מאשר' + E + r')' + P + r'אשר' + E),   # מאשר (= than) is fine
    ('S10 passive על ידי', B + r'על\s+ידי' + E),
    ('S18 יש/היה ל... את', B + r'(?:יש|היה|הייתה)\s+ל[{H}]*\s+את'.replace('{H}', H) + E),
    ('S18 יש את / ל... יש את (29/9)', B + r'(?:(?:ו|ש)?(?:יש|אין)\s+את|ל[' + H + r']+\s+(?:יש|אין|היה|הייתה)\s+את)' + E),
    ('C1  עושה שכל', r'עושה\s+שכל'),
    ('C2  it feels (thing as subject)', w(r'זה\s+(?:הרגיש|מרגיש|הרגישו|מרגישים)')),
    ('C3  גורם ל... להרגיש', r'גורמ?\S*\s+ל\S+\s+להרגיש'),
    ('C4-C7 take-calques', B + r'(?:לקח|לקחה|לקחו|לוקח|לוקחת|לקחת)\s+(?:החלטה|חלק|אחריות|מקלחת|אמבטיה|תמונה|צעד|מחסה|שיעור|שיעורי|שיעורים|מנהיגות)' + E),   # C32 (29/9): מחסה, שיעור, מנהיגות
    ('C12 בסופו של יום', r'בסופו\s+של\s+יום'),
    ('C13 "N later" = N אחר כך (29/9, prefer אחרי N / כעבור N)', B + r'(?:' + NUM + r'(?:\s+ו?' + NUM + r')?\s+' + UNIT + r'|שנתיים|חודשיים|שבועיים|יומיים|שנה|חודש|שבוע)\s+(?:אחר\s+כך|אחרי\s+זה|לאחר\s+מכן|מאוחר\s+יותר)' + E),
    ('C17 כתוצאה מ', B + r'כתוצאה\s+מ'),
    ('C20 לאור (as because)', w('לאור')),
    ('C24 "in her words" במילים שלה (29/9)', B + r'ו?במילים\s+(?:שלו|שלה|שלהם|שלהן)' + E),
    ('C25 "part of you" חלק ממך (29/9)', B + r'ו?חלק\s+(?:ממך|ממכם|מכם|ממני|ממנו|ממנה)' + E),
    ('C26 "right there" ממש שם (29/9, review)', B + r'ממש\s+שם' + E),
    ('P1  עם + instrument (review)', B + r'עם\s+ה?(?:פנס|פנסים|מקל|הידיים|הפטיש|פטיש|סכין|היד)' + r'(?!\s+ביד)' + E),
    ('P1  sentence opens "With X," (29/9)', r'(?:^|[.?!:]\s+)ו?עם\s+ה[' + H + r']+(?:\s+ה?[' + H + r']+){0,2}\s*,'),
    ('P6  בנוסף', w('בנוסף')),
    ('P17 "For X, Y is" בשביל X, (29/9)', r'(?:^|[.?!]\s+)ו?בשביל\s+(?!זה\b|כך\b|מה\b)[' + H + r'\'"]+(?:\s+[' + H + r'\'"]+)?\s*,'),
    ('V1  המשיך with no object (review)', B + r'(?:המשיך|המשיכה|המשיכו|ממשיך|ממשיכה|ממשיכים)\s+(?:כרגיל|כמו|הלאה)' + E),
    ('S11 past passive הוּפעל (29/9, review: impersonal active plural?)', w(r'הותקנו|הותקנה|הותקן|הוכנסו|הוכנסה|הוכנס|הועברו|הועברה|הועבר|הוחלט|הוחל|הועלתה|הועלו|הושארו|הושארה|הושאר|הוזזו|הוזזה|הונחו|הונחה|הוצבו|הוצבה|הוחזרו|הוחזרה|הוחלפו|הוחלפה|הודלקו|הודלקה')),
    ('A1  numeral gender', B + r'(?:(?:שלושה|ארבעה|חמישה|שישה|שבעה|תשעה|עשרה)\s+(?:שנים|דקות|שעות|שניות|פעמים|נשים|בנות|דלתות|פחיות|מילים)|(?:שלוש|ארבע|חמש|שש|שבע|תשע|עשר)\s+(?:חודשים|ימים|שבועות|ילדים|גברים|לילות|רחובות|צעדים|אנשים|חדרים))' + E),
    ('A8  "N and a half UNIT" → N UNIT וחצי (29/9)', B + NUM + r'\s+וחצי\s+(?:שנים|שעות|חודשים|דקות|ימים|שבועות|שניות|קילומטרים|מטרים)' + E),
    ('A12 frozen masculine היה', B + r'לא\s+היה\s+ל[' + H + r']*\s+ברירה' + E),
    ('A13 construct ה on first noun', B + r'(?:החדר\s+שינה|הבית\s+ספר|היום\s+הולדת|המכונת|העורך\s+דין|החדר\s+אמבטיה|הדלת\s+כניסה|העליית\s+גג)' + E),
    ('A10 מצלמה + masculine (review)', r'מצלמה[^.]{0,40}\s(?:הוא|שיושב|רואה|מצלם|שולח)' + E),
    ('A19 "Name, role, age N" appositive (29/9)', r',[^,.\n]{2,30},\s+(?:בן|בת)\s+' + NUM + E),
    ('D12 quote first, then "he says" (29/9, for the EAR: written Hebrew allows it)', r'[.,?!…]?["”]\s*,?\s*(?:ו?(?:הוא|היא|הם|הן)\s+)?' + SAY + E),
    ('D12 comma inside closing quote (29/9, English punctuation)', r',["”]'),
    ('R   written-only words', w(r'הינו|הינה|אולם|ברם|כמו\s+כן|על\s+מנת|במידה\s+ו|באם|בלבד|טרם|ישנם|ישנן|כאשר|נאלץ|נאלצה|נאלצו|נגזרו|נגזר|הנני')),
    ('R9  fillers', w(r'בעצם|למעשה|כמובן|כידוע|בהחלט|ממש\s+ממש|מאוד\s+מאוד|האמת\s+היא\s+ש[' + H + r']*')),
    ('R17 ש+ב+place+possessive chain (29/9, review)', B + r'ש(?:ב|מ)ה?(?:בית|חדר|דירה|מטבח|בניין|מחשב|טלפון|מצלמה|רחוב|עיר|עיירה|מסך|אוטו|מכונית|יד|ידיים)\s+(?:שלו|שלה|שלהם|שלהן)' + E),
    ('C11 English discourse glue', w(r'זה\s+למה|על\s+הדרך|או\s+מה(?=\?)|ספר\s+לי\s+על\s+זה|ספרו\s+לי\s+על\s+זה|(?:שיחק|שיחקה|שיחקו|משחק|משחקת)\s+קשה\s+להשגה')),
    ('T13 homograph אחות (nurse or sister?) (29/9)', B + r'ו?ה?אחות' + r'(?!\s+(?:של|שלו|שלה|שלי|שלנו|שלהם|שלך|שלכם|שלה|גדולה|קטנה))' + E),
    ('T5  ל"י verbs missing י', w('העלתי|נהנתי|השתנתי')),
    ('C30 "once" = פעם ש (29/9)', r'(?:^|[.,:?!]\s+)ו?פעם\s+ש(?!נייה|ניה|לישית|ישית|ביעית|מינית|עברה)[' + H + r']+'),
    ('C33 "put on" clothes = שם (29/9, review)', B + r'(?:שם|שמה|שמו|שמתי|שמים|שמה)\s+(?:את\s+ה)?(?:מעיל|כובע|נעליים|גרביים|שרשרת|טבעת|חולצה|מכנסיים|שמלה|משקפיים|עגילים|שעון)' + E),
    ('C35 "again" = בשנית (29/9)', w('בשנית')),
    ('C36 English "of": העניין של (29/9)', B + r'ו?העניין\s+של' + E),   # "עניין של זמן" (a matter of) is fine
    ('C37 נחקר תחת אזהרה → באזהרה (29/9)', B + r'תחת\s+אזהרה' + E),
    ('C38 English-born crime slang (29/9, register)', B + r'(?:זימר|זימרה|זימרו|מזמר|מזמרת|נפל\s+לסמים|נפלה\s+לסמים|קנה\s+את\s+הסיפור|קנתה\s+את\s+הסיפור|קנו\s+את\s+הסיפור)' + E),
    ('S24 indirect question with האם (29/9)', B + r'(?:שאל|שאלה|שאלו|שואל|שואלת|שואלים|לשאול)(?:\s+(?:אותו|אותה|אותם|אותן|את\s+[' + H + r']+))?\s+האם' + E),
    ('R18 האם opening a spoken question (29/9, review: prefer the question without it)', r'(?:^|[.?!:"]\s*)ו?האם' + E),
    ('R19 ו for ש: מאחר ו / היות ו / ייתכן ו / בכדי (29/9)', B + r'(?:מאחר\s+ו|היות\s+ו|ייתכן\s+ו|יתכן\s+ו|בכדי' + E + r')'),
    ('R20 "for N years" = מזה (29/9)', B + r'מזה\s+(?:כמה|' + NUM + r')(?:\s+ו?' + NUM + r')?\s+' + UNIT + E),
    # Section 10b (29/9b): practitioner rules. Time words after בעוד ש- (בעוד שעה / שבוע / שלושה ימים) are excluded.
    ('S26 "while" = בעוד (ש) (29/9b) → כש / אבל / ואילו / ו', B + r'ו?בעוד\s+(?:ש(?!(?:עה|עות|עתיים|בוע|בועות|בועיים|נה|נים|נתיים|לוש|לושה|לושים|ניים|תיים|תי|ני|ש|שה|שים|יש|ישה|ישים|בע|בעה|בעים|מונה|מונים|ניות|נייה|ניה)' + E + r')[' + H + r']+|(?:הוא|היא|הם|הן|אני|אנחנו|אתה|את)' + E + r')'),
    ('V14 "drove her" = נהג אותה (29/9b) → הסיע', B + r'(?:נהג|נהגה|נהגו|נוהג|נוהגת|נוהגים|לנהוג|ינהג|תנהג)\s+(?:אותו|אותה|אותם|אותן|אותי|אותנו|אותך|אתכם)' + E),
    ('C39 "didn\'t see it coming" / "caught by surprise" (29/9b)', B + r'(?:(?:ראה|ראתה|ראו|ראיתי|ראינו|רואה|רואים|לראות)\s+את\s+זה\s+(?:מגיע|בא|באה)|(?:תפס|תפסה|תפסו|תופס|תופסת|תופסים)\s+(?:אותו|אותה|אותם|אותן|אותי|אותנו|את\s+[' + H + r']+)\s+בהפתעה)' + E),
    ('C40 "lost it" / "crossed the line" / "take chances" (29/9b, review)', B + r'(?:(?:איבד|איבדה|איבדו|מאבד|מאבדת)\s+את\s+זה|(?:חצה|חצתה|חצו|חוצה|לחצות)\s+את\s+הקו(?!\s+האדום)|(?:לקח|לקחה|לקחו|לוקח|לוקחת|לקחת)\s+סיכונים)' + E),
    ('C41 "found him guilty" / "the court found" (29/9b) → הרשיע / זיכה / פסק', B + r'(?:(?:מצא|מצאה|מצאו|מוצא|מוצאת|מוצאים)\s+(?:אותו|אותה|אותם|אותן|את\s+[' + H + r']+(?:\s+[' + H + r']+)?)\s+(?:אשם|אשמה|אשמים|אשמות|זכאי|זכאית|זכאים|חף|חפה|חפים)|ו?(?:בית\s+המשפט|השופט|השופטת|המושבעים|חבר\s+המושבעים)\s+(?:מצא|מצאה|מצאו))' + E),
    ('C42 "had a headache" = היה לה כאב ראש (29/9b) → כאב לה הראש', B + r'(?:יש|היה|הייתה|יהיה|תהיה)\s+ל[' + H + r']*\s+כאב\s+(?:ראש|בטן|גרון|שיניים|גב)' + E),
    ('C43 dubbing-Hebrew swearing: לעזאזל / ארור / פאקינג (29/9b)', w(r'לעזאזל|ארור|ארורה|ארורים|ארורות|פאקינג')),
    ('P18 "face" = התמודד מול / "under his direction" = תחת (29/9b)', B + r'(?:(?:להתמודד|התמודד|התמודדה|התמודדו|מתמודד|מתמודדת|מתמודדים)\s+מול|תחת\s+(?:הנחיית|הנחייתו|הנחייתה|פיקוח|פיקוחו|פיקוחה|השגחת|השגחתו|השגחתה|הנהגת|הובלת|ניהול|ניהולו))' + E),
    ('R23 הגיד in the past / תאמר in the future (29/9b, review: spoken = אמר / יגיד)', B + r'ו?(?:הגיד|הגידה|הגידו|הגדתי|הגדנו|יאמר|תאמר|יאמרו|תאמרו|תאמרי)' + E),
    ('R24 ניתן / מבלי (29/9b; ניתן = "was given" is fine) → אפשר / בלי', w(r'ניתן|מבלי')),
    ('R25 באופן / בצורה + adjective (29/9b, review: native narration uses them; prefer a plain adverb)', B + r'ו?(?:באופן|בצורה)\s+(?!(?:זה|זו|זאת|הזה|הזאת|כזה|כזאת|כזו|ש|של|שבו|שבה|דומה)' + E + r')[' + H + r']+' + E),
    ('D14 showy speech verb הפטיר (29/9b) → אמר', w(r'הפטיר|הפטירה|הפטירו')),
]
for name, pat in RULES:
    hits = []
    for l in lines:
        for m in re.finditer(pat, l):
            if name.startswith('A1 ') and re.search(r'(?:אחת|שתים|שלוש|ארבע|חמש|שש|שבע|שמונה|תשע)\s+$', l[:m.start()]):
                continue  # teen numbers (חמש עשרה שניות) are correct
            s = max(0, m.start() - 25)
            hits.append(l[s:m.end() + 25].strip())
    if hits:
        print(f'{name}  ({len(hits)})')
        for h in hits[:8]:
            print('      ', h)

# V13 (29/9b): "going to be" = הולך להיות, in the narrator's voice only. Quoted speech is stripped first, because
# inside a speaker's words it is how Israelis talk.
GOING = B + r'ו?(?:הולך|הולכת|הולכים|הולכות)\s+להיות' + E
going = []
for l in lines:
    u = re.sub(r'["“”][^"“”\n]*["“”]', ' ', l)
    for m in re.finditer(GOING, u):
        s = max(0, m.start() - 25)
        going.append(u[s:m.end() + 25].strip())
if going:
    print(f'V13 "going to be" = הולך להיות outside quotes (29/9b) → יהיה / עומד להיות  ({len(going)})')
    for h in going[:8]:
        print('      ', h)

# D1: a sentence that starts with a subordinator and has no comma is probably a cut-off clause
sents = [s.strip() for s in re.split(r'(?<=[.?!])\s+', text) if s.strip()]
STOP = r'(?:שם|שום|שני|שתי|שנה|שנים|שלוש|שלושה|שש|שבע|שבעה|שבוע|שבועיים|שעה|שכן|שוב|שקט|שמונה|שבת|שלה|שלו|שלהם)' + E
frag = [s for s in sents if re.match(rf'^(?:ו)?(?:כש|ש|אחרי ש|לפני ש|בזמן ש|עד ש)[{H}]', s) and not re.match(r'^(?:ו)?' + STOP, s) and ',' not in s and len(s.split()) < 12]
if frag:
    print(f'D1  sentence starts with a subordinator, no main clause?  ({len(frag)})')
    for s in frag[:8]:
        print('      ', s)

# S16: אף אחד / שום / כלום without לא or אין in the same sentence ("זה כלום לעומת..." is fine)
neg = [s for s in sents if re.search(w(r'אף\s+אחד|אף\s+אחת|שום|כלום'), s) and not re.search(w('לא|אין|בלי|ללא'), s)
       and not re.search(w(r'כלום\s+לעומת|זה\s+כלום'), s)]
if neg:
    print(f'S16 negative word without לא/אין (review)  ({len(neg)})')
    for s in neg[:8]:
        print('      ', s)

# D13 (29/9): a first-person testimony quote with no speaker named just before it.
# Native narration names the speaker first ("הוא אמר, "..."" / "היא אומרת: "...""); a bare "I saw..." quote after
# narration is heard as the narrator's own words. (A character's bare inner words, like ep01's "רק אל תצא", are fine.)
FIRST = B + r'(?:אני|אנחנו|שלי|שלנו|לי|לנו|אותי|אותנו|[' + H + r']{2,}(?<!אמי)(?<!מ)(?<!ש)תי|[' + H + r']{3,}נו)' + E
bare = []
for i, s in enumerate(sents):
    if re.match(r'^["”]', s):
        prev = sents[i - 1] if i else ''
        named = re.search(SAY + r'\s*[:,]?\s*$', prev) or re.search(r'["”]', prev) or re.search(SAY, s)
        if not named and re.search(FIRST, s):
            bare.append(s[:70])
if bare:
    print(f'D13 quote with no speaker named just before it (review)  ({len(bare)})')
    for s in bare[:8]:
        print('      ', s)

words = re.findall(rf'[{H}"\']+', text)
lens = sorted(len(re.findall(rf'[{H}"\']+', s)) for s in sents if re.search(f'[{H}]', s))
if lens:
    print(f'\n{len(words)} Hebrew words, {len(lens)} sentences, median sentence {lens[len(lens) // 2]} words, '
          f'{sum(x <= 4 for x in lens) / len(lens):.0%} of sentences are 4 words or fewer (D1-D2: chopped if the median is under ~8)')

# Density of English-habit markers (29/9). Benchmarks from NATIVE-NARRATION-PATTERNS.md: native = median of 22
# Hebrew YouTube narrations (53k words); ep01 = the owner-approved ep01 v5.6. Tendencies, not errors.
nw = len(re.findall(rf'[{H}]+', text)) or 1
def per_k(pat):
    return len(re.findall(B + '(?:' + pat + ')' + E, text)) / nw * 1000
dens = [
    ('possessive שלו/שלה/שלהם (S20: drop it or use לו/לה when the owner is obvious)', per_k(r'שלו|שלה|שלהם|שלהן'), 5, 18),
    ('אז (English "so")', per_k(r'ו?אז'), 5, 13),
    ('בערך (English "about")', per_k(r'ו?בערך'), 0.3, 1.8),
]
print('Density per 1,000 words (native / approved ep01 / this file):')
for label, v, nat, ep in dens:
    flag = '   <- above the approved ep01, review' if v > ep * 1.15 else ''
    print(f'   {label}: {nat} / {ep} / {v:.1f}{flag}')
