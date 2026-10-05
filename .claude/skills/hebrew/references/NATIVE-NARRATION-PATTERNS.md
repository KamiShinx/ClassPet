# How native Hebrew YouTube narrators actually say things

Compiled 29 Sep 2026 for the `hebrew` skill, from a native-narration corpus
(not included). Use it with rule 20 of SKILL.md: when a phrase back-translates word for word
into English, this file shows how a native narrator builds the same thing.

## What the corpus is, and the one trap

- The zip holds 268 files, but only **22 are Hebrew narration**: BlueDropPlus videos (YouTube auto-captions, 53,700
  words). The rest is English (horror channels, editing and script sources). 13 of the 22 are auto-punctuated, so
  sentence and comma counts come from those 13 only, and they are machine punctuation: indicative, not exact.
- Auto-captions misspell names and rare words. Quotes below are verbatim except where marked [ASR fixed].
- **Register trap.** BlueDropPlus is the cheerful comedy-explainer voice the owner rejected on 22 Sep
  (`WRITING-RULES.md` section 2). Mine **grammar and phrasing only**. Never borrow from it:
  חברים וחברות · אשכרה · תכלס · סוג של (as a hedge) · פשוט / ממש as fillers · ממש ממש · כאילו · "תחשבו…" ·
  "אנחנו הולכים לגלות" · "בואו נ…" · אח שלי · asides in the first person · jokes · "I hope I'm saying the name right"
  (a hedge, banned by WRITING-RULES 3b).
- Every pattern below is marked with whether the owner-approved ep01 v5.6 already does it. Where ep01 differs and was
  approved, **ep01 wins** (owner's ear > corpus).

## The numbers (per 10,000 Hebrew words)

| Marker | Native (22 videos) | ep01 v5.6 (approved) | ep02 v1 draft | Reading |
|---|---|---|---|---|
| Median sentence length (words) | 12 (p25 7, p75 19) | 10 | 10 | Natives run a thought longer; ep01 is inside the owner's 9-11 target |
| Sentences of 4 words or fewer | 13% | 18% | 14% | fine |
| Quote first, then "he said" | **0** of 11 quotations | 0 | 1 | allowed in writing, but natives speak speaker-first |
| "Name, role, age N," appositive | **0** | 0 | 3 | English; natives say "גבר בן 47 נכנס…" or "הוא בן ארבעים" |
| Possessive שלו / שלה / שלהם | 45 (median; range 5-131) | 180 | 221 | English "his/her/their"; ep02 is above every native video |
| אז | 50 | 130 | 139 | English "so" carried into Hebrew |
| ואז | 10 | 25 | 22 | English "then" |
| בערך | 3 | 18 | 45 | English "about"; the research shows through |
| כי | 49 | 14 | 22 | natives explain with כי; we under-use it |
| ככה ש / רק ש / למרות ש / בגלל ש | 5 / 6 / 4 / 4 | 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 | native joins we never use |
| פתאום | 7 | 0 | 4 | |

The scanner prints the three density lines (possessives, אז, בערך) with the native and ep01 benchmarks. They are
tendencies, not errors: ep01 was approved at 18 possessives per 1,000 words.

## The patterns

### N1. Introducing a person: role + בשם + name + the verb, in one clause
> "בשנת 1973 פסיכולוג בשם דיוד רוזנן החליט לקחת את השאלה הזאתי"

Also: "חוקר הולנדי בשם…", "קיסר צעיר בשם…", "בחור בשם ג'ון…" (14 hits of בשם in 8 videos). So "X בשם Y" is **native,
not a calque**; do not flag it (ep01 approved "אישה בשם טרייסי", "גורה בשם תיאה"). What natives do not do is stop the
sentence to introduce: the verb comes straight after the name.
- ✗ ערב בעיירה קטנה במיסיסיפי, ואחות בשם אשלי למיי מתארגנת לצאת לעבודה. (also: אחות = nurse or sister, T1)
- ✓ …ואשלי למיי, אחות במשמרות לילה, מתארגנת לצאת לעבודה.

### N2. Or: "there was / there's someone… and his name is"
> "ויש אחד שעלה לשלטון וקוראים לו בוריס ילסין"

The existential opener, then the name as a new clause with וקוראים לו / וקראו לו (27 hits in 16 videos). ep01 does
this at the reveal: "קוראים לו בנימין בוקור, הוא בן ארבעים". Good for a name that lands late.

### N3. Age goes on the noun, or in its own clause; never "Name, role, 24,"
> "גבר בן 47 נכנס לסניף דואר במתחם ביג בבאר שבע"

Zero "X, Y, בן/בת N," appositives in 53,700 words. ep01 (approved): "אמבר הייתה בת עשרים", "הוא היה בן חמישים ושבע
וגר שם לבד", "קראו לה טטסוקו הוריקאווה, היא הייתה בת חמישים ושמונה".
- ✗ אמא שלו, ג'יימי סאמיט, בת עשרים וארבע. · ✗ אליסה, הבת שלהם, בת שמונה (two בת in a row: daughter, aged)
- ✓ אמא שלו, ג'יימי סאמיט, היא בת עשרים וארבע. · ✓ הבת שלהם, אליסה, היא בת שמונה.

### N4. Setting the place: small to large, no repeated "in", and a gloss with שזה / כלומר
> "זה אי קטן מבודד במפרץ סן פרנסיסקו בארצות הברית" [ASR fixed: במפר]
> "בביה, שזה מחוז בגרמניה" (Bavaria, ASR spelling)

A foreign term gets a Hebrew gloss joined by ", שזה…" or ", כלומר…" ("עם JCB, כלומר דחפור"). ep01 (approved) uses a
bare appositive for places: "בהאפי ואלי, פרבר שקט באורגון, בארצות הברית"; both are fine. The English habit to avoid
is the long appositive that explains a thing before the sentence has a verb:
- ✗ בגלל זה, בבלאק פריידיי, יום המבצעים הגדול של סוף נובמבר, אשלי קונה…
- ✓ אז בבלאק פריידיי, שזה יום המבצעים הגדול בסוף נובמבר, אשלי קונה…

### N5. Opening a story in time
> "הסיפור הבא שלנו קורה בשנת 2000."

Also "הסיפור שלנו מתחיל ב…", "והסיפור שלנו מתרחש ב…". A year is often "בשנת 1973" (23 hits), as often as bare
"ב־1973". ep01 (approved): "זה קורה בהאפי ואלי", "זה היה באלפיים ושמונה", "זה יום שישי בערב". A duration may open the
sentence: "במשך 150 שנה של חפירת מאובנים, מדענים לא מצאו…" is native, so do not force every time phrase to the end
(S3 is an encyclopedia rule).

### N6. Moving time forward
> "ואחרי כמה שעות בהם הוא לא הצליח למצוא את הסנטינלים, הוא חזר" [ASR fixed name]

The native set: ואז (for the next event), אחרי כמה שעות / אחרי שלושה חודשים (after + duration), בסוף ("אבל בסוף
המשטרה הצליחה לעקוב…"), בשלב הזה ("בשלב הזה הוא כבר כמה ימים בתוך הקניון"), ככל שעברו השנים, עברו 13 שנה,
עד ש, בשנייה ש / מהשנייה ש, ברגע ש. "N later" does occur ("כמה שנים לאחר מכן", "שנה אחת בלבד אחרי זה": 2 hits),
so Wikipedia's C13 is a written-register preference, not an error; "אחרי + duration" is as common (4 hits) and reads
cleaner for a calm narrator:
- (prefer) שלושה חודשים אחר כך הם תובעים את בתי הספר → אחרי שלושה חודשים הם תובעים את בתי הספר · כעבור שלושה חודשים…

### N7. Reporting speech: the speaker first, then the words
> "הוא שאל, "מה יקרה אם אנחנו ניקח אנשים רגילים לגמרי…""

All 11 quotations in the corpus are speaker-first ("הוא אמר, …", "שואל אותו, …", "שאומר, …"); none is quote-then-"he says". For a listener this matters: the voice
must tell him who speaks before the words, or he hears the narrator. ep01 (approved): "הוא מסתכל עליהם ואומר: "זה לא
הבית שלכם."", "אבל בריטני אומרת: "…"". (Written Hebrew does allow the quote first, per the Academy's punctuation
rules, with the comma after the closing quote mark; see D12 in SOURCES-DISTILLED 10a. This is a rule for the ear.)
- ✗ "אני החבר הכי טוב שלך," הוא אומר.
- ✓ והוא אומר לה: "אני החבר הכי טוב שלך."
Natives also embed a line with no quote marks: "והשודד מעלה הילוך ואומר לה שימי את הכסף בתיק מהר" (keep quote
marks in our scripts: owner rule D9). A thought tag in the middle is approved in ep01 ("…, היא אמרה לעצמה, …"), so
that one is not an error.

### N8. Indirect speech keeps the tense (S1, confirmed in the wild)
> "הוא אמר להם שהוא שומע מחשבות של אנשים אחרים בראש שלו"

Past verb of saying, present tense inside, as the Academy and Wikipedia rule (S1).

### N9. Reveals and turns
> "אז מה שהוא עשה זה שהוא לקח אבוקדו"
> "מסתבר שהשודד שלנו רצה לשדוד" [ASR fixed: a garbled word dropped]

Native turn devices: מסתבר ש (22 hits), מה שהוא עשה זה ש, "X זה לא Y, אלא Z" ("וג'נט זה לא איזה חברת תעופה…, אלא…"),
"ואז הגיעה…". Neutral enough for a cold narrator (not slang); ep01 does not use them yet.

### N10. Tense: past setup, then present at the moment itself
> "תוך כדי שהיא קוראת את הפתק היא מבינה שמשהו פה חשוד"

The robbery is set up in the past ("הלך לפקידה ופשוט נתן לה פתק") and switches to the present when the danger starts.
ep01 does the reverse frame (present scenes, past backstory) and was approved; both are native. The English habit to
avoid is drifting between tenses inside one scene without a reason.

### N11. Possession: the dative, and fewer possessives
> "הסלע… נחת לו על היד"

Hebrew marks the person affected with לו / לה and the thing with ה־: "נחת לו על היד", "דפק לו את המוח". ep01 (approved)
is full of it: "גר להם בבית", "התחיל להיעלם לה אוכל", "מחזיק להם את הדלת". English writes "his hand", "her room",
"their camera" every time, and our drafts carry it: 180-221 possessives per 10,000 words against a native median of 45.
- ✗ הוא מסתכל בטלפון שלו, ורואה את החדר שלה על המסך שלו.
- ✓ הוא מסתכל בטלפון, ורואה על המסך את החדר שלה.
Keep a possessive where it carries the horror ("בבית שלהם", "בחדר שלה"): that is the point, not a calque.

### N12. Numbers, money and units
> "תכשיטים בשווי 143,000 פאונד" · "350 פאונד, שזה בערך 159 קילו"

Foreign money keeps its own name (פאונד, דולר; not converted to shekels); a foreign unit gets a conversion with ", שזה
בערך…". A count is a plain clause: "הם היו שמונה אנשים, כולל החוקר עצמו". בערך is rare (3 per 10,000 words): natives
round and state. Write numbers as words for the TTS (T6).

### N13. Companies and brands: say what it is, then the name
> "חברה שאולי תשמע לכם מוכרת, וקוראים לה בואינג"

The thing first, the brand as its name. For our register: "חברת אבטחה גדולה, קוראים לה איי די טי" or "איי די טי, חברת
האבטחה הגדולה באמריקה". Superlatives go after the whole noun phrase ("חברת התעופה הסודית ביותר בעולם"), not in the
middle of a construct.
- ✗ חברת האבטחה לבתים הכי גדולה באמריקה
- ✓ חברת האבטחה הכי גדולה באמריקה (לבתים)

### N14. "One of the": both forms are native
> "ובאחד מהמקרים…"

אחד ה־ (38 hits) and אחד מה־ (24 hits) are both native, and ep01 uses both. Not a calque. The English habit is the
sentence built as "One of X was Y": "אחת המשפחות שקיבלו את השיחה הייתה המשפחה של אלקסיה" → "גם המשפחה של אלקסיה קיבלה
את השיחה הזאת."

### N15. Joins we never use
ככה ש (result), רק ש (but), למרות ש, בגלל ש, עד ש, כי (explain). Natives join clauses with these where our drafts start a
new sentence with אז. A calm narrator can use all of them. Not every אז needs replacing (owner rule N6: אז is an
approved opener); just do not let it carry every consequence.

## What this corpus cannot tell us

- Register for a cold, slow narrator (it is the wrong voice).
- Spelling, nikud and homographs (auto-captions are machine text).
- Exact punctuation (machine-inserted; 9 of the 22 have none).
- Anything about written Hebrew. For that, SOURCES-DISTILLED.md.
