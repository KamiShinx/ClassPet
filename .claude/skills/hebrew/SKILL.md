---
name: hebrew
description: Use before writing, rewriting, reviewing or checking ANY Hebrew text for an Israeli audience (narration scripts, captions, posts, and prompts that ask another model for Hebrew). Catches Hebrew that sounds translated from English - calques, English word order, wrong בניינים and verb collocations, prepositions carried over from English, gender and numeral agreement, construct state, stiff written-only register, full stops that break a spoken thought, and text-to-speech traps. 191 rules: 174 sourced (Academy of the Hebrew Language, Hebrew Wikipedia's translation and style guides, Ruvik Rosenthal, Shoshana Bahat, the public broadcaster's language advisers, translation studies and professional editors) and 17 from a native narration corpus and the owner's own catches, plus a scanner and a native-narration patterns reference. The native speaker's ear is always the final check.
---

# hebrew

## Start here: be honest about the limit

Claude's judgement of its own Hebrew is not reliable, and this skill exists because of it:
- Four Hebrew drafts were rejected by the owner (a native Israeli) as translated-sounding: "והם היו צודקים",
  an American idiom (לשתות את הקולאייד), editorial closers.
- The first pass of ep01 in Hebrew (23 Sep 2026) came out as chopped fragments, median 6-8 words a sentence, and it
  was caught only by measuring, not by reading.
So: never say "the Hebrew is natural". Say which checks it passed, and hand it to the native speaker's ear, which
outranks every rule here.

Full rules with sources: `references/SOURCES-DISTILLED.md` (9 sections, plus section 10 added 29 Sep 2026 for
English-draft interference in story narration).
Every source and how far to trust it: `references/SOURCE-LIST.md`.
How native Hebrew narrators actually introduce people, move time, report speech and say numbers, measured on 53,700
words of Hebrew YouTube narration: `references/NATIVE-NARRATION-PATTERNS.md`. Read it when rule 20 flags a phrase and
you need the native build. Its register is wrong for our narrator: take the grammar, never the tone.
Scanner: `python scan.py <file>` (in this folder). It flags candidates to review, not verdicts, and prints three
density lines (possessives, אז, בערך) against the native corpus and the approved ep01.

## Procedure

1. **Write from the meaning, not from the English sentence.** Read the English paragraph, close it, say it in Hebrew.
   A Hebrew sentence that tracks the English word order is the root of most of the rules below.
2. **Run `scan.py`** on the file. Fix real hits; ignore false positives (the scanner is deliberately greedy).
3. **Paragraph pass with the checklist below.** Top to bottom, every paragraph, every item. This is where the scanner
   is blind: tense sequence, continuative clauses, collocations, and meaning.
4. **Do NOT over-correct** (section 9 of the reference, and N13). Spoken narration keeps: אני לא יודע, הכי, הרבה
   אנשים, כולם, אז at the start of a sentence, a subject pronoun on the first verb, אחראי על. Native narrators and the
   approved ep01 also keep: X בשם Y · אחד ה־ / אחד מה־ · זה מה ש… · במשך N at the head of a sentence · a place
   appositive (בהאפי ואלי, פרבר שקט באורגון) · a thought tag in the middle (…, היא אמרה לעצמה, …) · מהסוג ש… /
   מהאנשים האלה ש… · משלו / משלה · a sentence that opens with ו (N14) · אחד את השני / אחד לשני (C34 is for careful
   writing; ep01 approved it) · בחזרה as an adverb (N15). A "fixed" line that turns stiff is a new error. Fix only
   what is broken (owner rule).
5. **Read it aloud as the voice will.** Every full stop is a pause. One spoken thought is one sentence.
6. **Hand it over** with a plain list of what was checked. The owner decides register.

## The checklist: the errors English causes most

Each: ✗ translated → ✓ natural. Codes point to `references/SOURCES-DISTILLED.md`.

1. **Tense sequence in reported speech/thought (S1).** Hebrew keeps the tense of the original moment.
   ✗ הוא אמר שהיא הייתה נקייה ✓ הוא אמר שהיא נקייה · ✗ היא ידעה שהוא היה משקר ✓ היא ידעה שהוא משקר
2. **"could see / could hear" is just the verb (S2).** ✗ היא יכלה לשמוע צעדים ✓ היא שמעה צעדים.
   For a view ("she could see it from her bed"): ✓ ומהמיטה היא ראתה אותו / רואים אותו מהמיטה.
3. **Relative clauses (S4-S6).** ✗ הדירה בה הם גרו · האיש אותו ראתה · אשר ✓ הדירה שהם גרו בה / שבה הם גרו · האיש שהיא ראתה · ש
4. **Negative concord (S16).** אף אחד / שום / כלום need לא: ✓ אף אחד לא בא · לא קרה שום דבר
5. **A new event gets its own clause, not "…, who then…" (S9).** ✗ היא התקשרה לאחיה, שהגיע ✓ היא התקשרה לאחיה, והוא הגיע
6. **take / make / feel calques (C1-C9).** ✗ לקח החלטה/חלק/אחריות/מקלחת/תמונה · זה עושה שכל · זה הרגיש כמו נצח · גורם לכם להרגיש
   ✓ החליט · השתתף · קיבל עליו אחריות · התקלח · צילם · זה הגיוני · זה נמשך נצח / נראה לה כמו נצח · restructure around the person
   Only a person מרגיש; things don't (C2).
7. **Passive with "by" → active (S10, S11).** ✗ הדלת נפתחה על ידי מישהו · הוחל בחיפושים ✓ מישהו פתח את הדלת · התחילו לחפש
8. **"with" for an instrument or manner is ב (P1).** ✗ האיר עם הפנס · הביטה בו עם עניין ✓ האיר בפנס · הביטה בו בעניין. עם = together with.
9. **המשיך needs an object or an infinitive; the thing itself נמשך (V1).** ✗ השקט המשיך · הבית המשיך כרגיל ✓ השקט נמשך · החיים בבית נמשכו כרגיל · (✓ הגשם המשיך לרדת)
10. **Numbers (A1-A5, T6).** ✓ שלוש שנים · שלושה חודשים · חמש דקות · שלושת הילדים · עשרים וחמישה אלף · ages use the short form: בן חמישים ושבע, בת עשרים.
    Write numbers as words: the TTS engine cannot choose the gender from a digit.
    **TTS homographs (ep01 voice, 25 Sep 2026).** The owner hears these at once. On ep01, ElevenLabs v3 read these wrong:
    - מראה (mirror): said "mar'e"
    - השכן: said "hashaken"
    - מחנה (parks): said "machane", i.e. "camp"
    - מטענים (chargers): said "mit'anim"

    v3 often ignores vowel marks. For the voice text only, respell with a silent א: מֶחאנֶה, השאחן, המראא. Better still,
    when writing, choose a word with one reading. Run a homograph check before voicing.
11. **Construct state: ה on the LAST noun (A13).** ✗ החדר שינה · הבית ספר ✓ חדר השינה · בית הספר
12. **Collective then plural (A15).** ✗ המשטרה הגיעה. הם חיפשו ✓ השוטרים הגיעו. הם חיפשו / המשטרה הגיעה ולקחה אותו
13. **Gender of nouns people get wrong (A10).** מצלמה is feminine (✗ המצלמה… הוא מצלם). אופניים, משקפיים are masculine plural. סכין either.
14. **Habitual past is היה + בינוני, and it's genuine Hebrew (S19).** ✓ הם היו נועלים דלת ומוצאים אותה פתוחה · היא הייתה יורדת להתקלח
15. **Written-only words (R2-R8, R13).** אשר · הינו · אולם · כמו כן · בנוסף · על מנת · במידה ו · באם · בלבד · טרם · ישנם · כאשר · נאלץ (in plain narration) · נגזר עליו
    → ש · (drop) · אבל · וגם · כדי · אם · רק · עוד לא · יש · כש · היה צריך · קיבל
16. **Fillers (R9, R10).** בעצם · למעשה · כמובן · ממש ממש · מאוד מאוד: cut, or one intensifier where it earns it.
17. **Punctuation for speech (D1-D3).** ✗ כשהיא כיבתה את האור ונכנסה למיטה. היא שמעה צעדים. ✓ …ונכנסה למיטה, היא שמעה צעדים.
    Don't scatter commas: each is a pause too.
18. **Collocations (V11, V6).** עצם / פקח עיניים · הציע את המיטה · כתב מכתב (not רשם) · עלול for a bad outcome, עשוי for neutral (V8).
19. **Literal English idioms and false friends (C21, C23).** If Hebrew has its own idiom use it, else say it plainly.
    parole ≠ חנינה (✓ שחרור מוקדם). "killed" = הרג; רצח only with a murder conviction (owner rule, V12).

20. **English physical and descriptive phrases carried word for word.** The blind spot the sourced rules miss:
    every word is fine, the phrase is English. Caught by the owner's ear on ep01 (23 Sep 2026), after this skill's
    first pass had passed them:
    - "a house makes noises" ✗ בית עושה רעשים → ✓ בכל בית יש רעשים
    - "you can see what's wrong with it" ✗ רואים מה לא בסדר בה → ✓ רואים את הבעיה
    - "gets down low" ✗ יורד נמוך → ✓ מתכופף
    Same pattern, found on the re-read those three prompted: "on his hands and knees" ✗ על הידיים והברכיים → ✓ על ארבע ·
    "the roof comes down so low" ✗ הגג יורד כל כך נמוך → ✓ הגג כל כך נמוך · "the sound of someone running" ✗ יש קול של
    מישהו רץ → ✓ שומעים מישהו רץ · "the noise has a place" ✗ לרעש יש מקום → ✓ ברור מאיפה הרעש מגיע · "the kind (of
    camera) that sits and waits" ✗ מצלמה שיושבת ומחכה → ✓ מצלמה עם חיישן תנועה · "forces his way in" ✗ נדחף פנימה →
    ✓ פורץ פנימה · "a place to live" ✗ מקום לחיות בו → ✓ פינה לגור בה · "everything they do, they do on top of it"
    ✗ כל מה שהם עושים, הם עושים מעל → ✓ כל החיים שלהם קורים מעל.
    The fresh-context reviewer (the back-translate test, run on the Hebrew alone) then found 46 more on ep01, 6 of
    them clear errors: "הבנים בדרך שלו" (= on his way; → עומדים לו בדרך) · police "מקיפים את הבניין" (= surround it;
    → הולכים מסביב לבניין) · "מחוץ לבית של עצמה" (English 'own'; → מחוץ לבית שלהם) · "השאיר לא נעולה" (→ לא נעל) ·
    "לא גילה מי הוא היה" (backshift, S1; → מי הוא) · "לכל מקום חדש יש רעשים" (→ בכל מקום). Plus the written "X שב־Y"
    chain (פוקואוקה שבדרום יפן → פוקואוקה, בדרום יפן), "הטלפון קיבל תמונה" (→ הגיעה לו תמונה), "עבר על הבית" (a list,
    not a search; → חיפש בכל הבית), and a TTS homograph: "אמבר לא ישנה" can be read "isn't old".
    **Test: if the Hebrew sentence back-translates word for word into the English one, suspect it.** Ask how an
    Israeli would say the picture, not the words. Hebrew often has one verb or idiom (מתכופף, על ארבע, פורץ) where
    English builds a phrase.

### Added 29 Sep 2026: what an English draft of an American story leaves behind

Found by a fresh test on ep02 v1 and measured against 53,700 words of native narration
(`references/NATIVE-NARRATION-PATTERNS.md`). Codes are in section 10 of `SOURCES-DISTILLED.md`.

21. **Quotes: the speaker first (D12, D13).** ✗ "אני החבר הכי טוב שלך," הוא אומר. ✓ והוא אומר לה: "אני החבר הכי טוב שלך."
    A testimony quote needs its speaker just before it, or the listener hears the narrator say "I":
    ✗ (after narration) "ראיתי את הסרטון…" ✓ אחר כך אשלי אמרה: "ראיתי את הסרטון…". Written Hebrew allows the quote
    first ("מסכן אבא", אמרה לי), so the order is a rule for the ear (native corpus: 11 of 11 spoken quotations
    speaker-first; ep01 the same); the comma inside the closing quote is the English error. (A thought tag in
    mid-sentence, "…, היא אמרה לעצמה, …", is approved in ep01; keep it.)
22. **Introducing a person (A19).** "X בשם Y" is native: keep it. The English appositive with the age is not:
    ✗ אמא שלו, ג'יימי סאמיט, בת עשרים וארבע · אליסה, הבת שלהם, בת שמונה ✓ אמא שלו, ג'יימי סאמיט, היא בת עשרים וארבע ·
    הבת שלהם, אליסה, היא בת שמונה · (native) גבר בן ארבעים ושבע נכנס לסניף…
23. **"One of the X was Y" (S21).** ✗ אחת המשפחות שקיבלו את השיחה הייתה המשפחה של אלקסיה · אחת השיחות מגיעה לאישה בשם שיינה
    ✓ גם המשפחה של אלקסיה מקבלת את השיחה · שיינה דוטי מקבלת את אחת השיחות. Make the person the subject.
24. **own, herself, in her words, part of you, right there (C24-C27).** ✗ מחוץ לבית של עצמה · המצלמה שהיא עצמה התקינה ·
    במילים שלה: · חלק ממך ממשיך להקשיב · ממש שם, בתוך החדר ✓ מחוץ לבית שלהם · שהיא התקינה בעצמה · היא אמרה: ·
    הם שומעים אותו בחצי אוזן · בתוך החדר. (משלו / משלה are native: keep.)
25. **English openers "With X," and "For X," (P1, P17).** ✗ עם האפליקציה הזאת, הם יכולים… · בשביל ג'יימי, המצלמה היא…
    ✓ באפליקציה הזאת הם יכולים… · מבחינת ג'יימי… / בזכות המצלמה, ג'יימי יכולה…
26. **Device and plan talk carried word for word (C28, C29; rule 20's family).** ✗ היא עושה הרבה · רוצים דרך לראות ·
    הוא לא יותר מזה · עושים את זה מהטלפון · בעשר שנים של מקרים כמו זה · והתשובה שחזרה ✓ יש בה הרבה · רוצים לראות ·
    זה כל הסיפור · מסובבים אותה מהטלפון · בעשר השנים האחרונות היו עוד מקרים כאלה · והתשובה הייתה.
27. **One tense per scene (S22).** A present-tense story must not drop into one English "was", and a past sentence
    must not end in the present: ✗ …אחת המשפחות… הייתה · המצלמה שמרה… עד הרגע שאליסה יוצאת ✓ …מקבלת · …שאליסה יצאה.
    (Present scenes with past backstory, as in ep01, are fine; so is switching to the present at the climax.)
28. **Possessives and "she/it" (S23, T13).** Drop שלו/שלה where the owner is obvious, or use the dative:
    ✗ הסלע נחת על היד שלו ✓ הסלע נחת לו על היד (ep01: "גר להם בבית"). Native median 5 per 1,000 words, ep01 18; the
    scanner prints yours. With a woman and a feminine thing (כתובת, מצלמה, חברה) in play, name the thing:
    ✗ היא קוראת אותה. היא לא שלה. ✓ היא קוראת את הכתובת. זאת לא הכתובת שלה.
29. **Words that sound two ways in a US story (T13).** אחות (nurse or sister) · היום (today or nowadays) · בת next to
    בת (daughter, aged) · ישן (T1). ✗ ואחות בשם אשלי ✓ אשלי, אחות בבית חולים, … · ✗ כשנואה הולך לישון היום ✓ היום,
    כשנואה הולך לישון, …
30. **Small written or English forms the scanner now catches.** ✗ ארבע וחצי שנים ✓ ארבע שנים וחצי (A8) · ✗ יש את
    המצלמה · למשפחה יש את מה ש… ✓ יש מצלמה · המשפחה מקבלת את מה ש… (S18) · ✗ למצלמה שבבית שלה ✓ למצלמה בבית שלה
    (R17) · ✗ חברת האבטחה לבתים הכי גדולה ✓ חברת האבטחה הכי גדולה (A20) · ✗ אז הותקנו מצלמות ✓ אז התקינו להם
    מצלמות (S11) · (prefer) ✗ שלושה חודשים אחר כך ✓ אחרי שלושה חודשים (C13). And two tics: אז carries every
    consequence in our drafts (13 per 1,000 words, native 5; vary with כי, ככה ש, רק ש, בסוף), and בערך shows the
    research (native 0.3 per 1,000): round the number or state it.
31. **More English calques, sourced (C30-C38, S24, S25, R18-R20; Wikipedia, Rosenthal, the Academy).**
    ✗ פעם שהדלת נסגרת · לקחו מחסה / לקחה שיעורים · שמה מעיל · ניסה בשנית · העניין של החקירה · נחקר תחת אזהרה ·
    שאל אותה האם ראתה · מאחר והדלת / ייתכן ו / בכדי · נעדרת מזה שלוש שנים · סוג של (a hedge) · זימר / קנה את הסיפור
    ✓ ברגע שהדלת נסגרת · תפסו מחסה / למדה · לבשה מעיל · ניסה שוב · החקירה… · נחקר באזהרה · שאל אותה אם ראתה ·
    מאחר שהדלת / כי · ייתכן ש · כדי · נעדרת כבר שלוש שנים · (drop it) · מסר מידע / האמין לסיפור.
    A spoken question needs no האם (R18; keep the "?"). People, not abstractions, as the subject (S25):
    ✗ החקירה של המשטרה הובילה לגילוי הגופה ✓ השוטרים חקרו, ובסוף מצאו את הגופה.

## The control group: real errors from this project

From Gemini's ep01 Hebrew (22-23 Sep 2026), each a rule above:
- הראתה את **הבפנים** של הבית (literal "the inside") → תמונה מתוך הבית
- הדלת **נטרקת פתוחה** (literal "bangs open"; נטרקת = slams shut) → נפתחת בכוח
- **נאבק לזוז** מעל הבידוד ("scrambles" read as "struggles") → זוחל מהר
- בכל פעם שהוא **יעזוב** (יעזוב = leaves for good) → יוצא
- **מצלמה… הוא** מצלם (gender)
- **המשיכה להעסיק את עצמה** ("kept herself busy") → המשיכה בחיים שלה
- **מקום להיות בו** ("a place to stay") → איפה לגור
- **לממן לו אוכל** (register) → להאכיל אותו
- צורה **מקופלת** על הצד (folded) → מכורבלת
- **רצח** for a manslaughter plea (fact error)
- a full stop in the middle of almost every thought: median 5-6 words a sentence, 505 full stops against 266 in the
  joined version. The voice pauses at each one.
From Claude's own drafts: "והם היו צודקים" (→ והם צדקו, V3); "זה הרגיש כמו חמש דקות" (C2); "האיר עם הפנס" (P1);
"השוטר אמר שהיא הייתה נקייה" (S1); "הבית המשיך כרגיל" (V1); median 6-8 in a first pass (D1).
Test run of rules 21-30, **not yet confirmed by the owner**: ep02 v1 (29 Sep 2026), 70 suspects (21 clear), in
a test file (not included). When the owner rules on them, move the confirmed ones up here and
drop any rule he rejects.

## Conflicts, and who wins

- **Dash before the surprise:** the Academy allows it (D6), but the owner's projects ban dashes. The owner wins; use a
  separate line or an ellipsis, sparingly.
- **Prescriptive vs spoken:** the Academy and Wikipedia write for careful written Hebrew. For narration, section 9 wins.
- **Channel register rules** (e.g. a project's own writing rules: no אשכרה/תכלס, no literary Hebrew)
  sit on top of this skill, and a project's own scanner may check them.
