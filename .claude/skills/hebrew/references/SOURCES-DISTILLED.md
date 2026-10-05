# Hebrew that does not sound translated: rules distilled from sources

Compiled 23 Sep 2026 for the `hebrew` skill. Target: **spoken narration** (slow, calm voice, read by a TTS engine),
natural modern Israeli register, neither slang nor literary.

## How to read this file

- Each rule: **English pattern** → ✗ the translated-sounding Hebrew → ✓ the natural Hebrew → source URL.
- Highest-frequency English→Hebrew errors come first inside each section.
- Every rule comes from a source I actually read, unless it is marked:
  - **[general knowledge, unsourced]**: my own knowledge, no source found. Treat as a hypothesis for the owner's ear.
  - **[owner rule]**: the owner's own instruction, from owner's project notes or his feedback memory. Binding for his
    projects, but not an external authority.
  - **(snippet)**: I saw the claim only in a search-result summary, not on the page itself. Lower confidence.
- **Register warning.** Most prescriptive sources (the Academy, Wikipedia) write for *careful written* Hebrew.
  Several of their "errors" are normal in speech and are fine for narration. Each such case is flagged
  **Narration note**. Section 9 lists the forms that must NOT be "corrected". Over-correcting is its own failure:
  it makes the voice stiff (see rule N1).
- Full bibliography with reliability notes: `SOURCE-LIST.md` in this folder.

## The ten checks that matter most for an English→Hebrew narration rewrite

1. **Tense sequence**: reported thought/speech keeps the tense of the original moment (S1).
2. **"could see / could hear" = ראה / שמע**, not יכול היה לראות (S2).
3. **Relative clauses**: ש + resumptive pronoun at the end, never a fronted בה / עליו / אותו, never אשר (S4–S6).
4. **Negative concord**: אף אחד **לא** / **לא** קרה שום דבר / **לא** אכל כלום (S16).
5. **Drop what English forces in**: repeated הוא/היא, שם (where), כאשר, a copula for every "is", הינו, מהווה (S12, S13).
6. **take/make/feel calques**: לקח חלק/אחריות/החלטה/תמונה, עושה שכל, זה מרגיש, גורם לכם להרגיש (C1–C9).
7. **Passive with "by"** → active verb; no על ידי, no chains of הוּפעל forms (S10, S11).
8. **"…, who then…" and "-ing" chains** → a new clause with ו, a finite verb (S9, S14).
9. **Front-loaded time/place phrases** → move the time phrase to the end, or put the verb first (S3).
10. **Numbers**: gender and construct forms (שלוש שנים / שלושה חודשים / שלושת הילדים / עשרים וחמישה אלף), and write
    them as words for the TTS engine (A1–A6, T6).

---

## 1. Calques and anglicisms (phrases translated word for word)

**C1. "it makes sense"**
✗ זה עושה שכל · זה לא עושה שום היגיון
✓ זה הגיוני · זה נשמע הגיוני · אין בזה היגיון
Rosenthal calls it an "עילגות"; the public broadcaster's language advisers try to keep it (and "קח צעד אמיץ") out of
ads as translated phrases "not in the spirit of Hebrew"; the Academy: "זה עושה שכל? ממש לא!".
https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf · https://hebrew-academy.org.il/wp-content/uploads/Almagor-Ramon.pdf ·
https://www.angoramedia.com/he/blog/english-expressions-wrong-use-in-hebrew · https://x.com/HebAcademy/status/1761725368145183000 (snippet)

**C2. "it feels (like)…" said of a thing or a place**
✗ זה מרגיש לא בסדר · זה הרגיש כמו נצח · הקירות מרגישים אחרת
✓ היא הרגישה שמשהו לא בסדר · הייתה לה הרגשה ש… · זה נמשך נצח
In Hebrew only a person הרגיש; things מעוררים הרגשה. Rosenthal traces "זה מרגיש טוב" to "it feels good".
https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf · https://www.angoramedia.com/he/blog/english-expressions-wrong-use-in-hebrew

**C3. "makes you feel…"**
✗ זה גורם לכם להרגיש לא בנוח
✓ restructure around the person: אתם מתחילים להרגיש לא בנוח · ופתאום לא נוח לכם
[owner rule]: "'גורם לכם להרגיש' is a translation artifact, not Hebrew." owner's project notes

**C4. take + noun for everyday actions**
✗ לקח מקלחת / אמבטיה · לקח אוטובוס · לקח תמונה · התמונה נלקחה
✓ התקלח / התרחץ · נסע באוטובוס, עלה על אוטובוס · צילם · התמונה צולמה
Rosenthal: these "refuse to be digested"; Bahat: "the translation turned us into a nation of 'takers'".
https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf · https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/ ·
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות

**C5. "take part"**
✗ לקח חלק בחיפושים · נטל חלק
✓ השתתף בחיפושים
Swapping לקח for נטל does not fix it (Bahat).
https://hebrew-academy.org.il/לקחת-חלק-ליטול-חלק/ · https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**C6. "take responsibility"**
✗ לקח אחריות
✓ קיבל עליו אחריות (agreed to be answerable) · נשא באחריות (after a failure: "הוא יישא באחריות")
"לקחת אחריות זר לעברית ומוטב להימנע ממנו."
https://hebrew-academy.org.il/אחריות-לוקחים-מקבלים-או-נושאים/

**C7. "make/take a decision"**
✗ לקח החלטה
✓ החליט · קיבל החלטה
https://www.angoramedia.com/he/blog/english-expressions-wrong-use-in-hebrew

**C8. take-idioms with a native equivalent**
✗ לקח את החוק לידיים · לקח את המילים בחזרה · לקח חלק
✓ עשה דין לעצמו · חזר בו · השתתף
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**C9. "take a step" / "make friends" / "make a difference"**
✗ לקח צעד · עשה חברים · זה עושה את ההבדל
✓ עשה צעד · התיידד, מצא חברים · זה משנה, זה מה שקובע
Sources flag the calques; the ✓ forms for the first two are [general knowledge, unsourced].
https://hebrew-academy.org.il/wp-content/uploads/Almagor-Ramon.pdf · https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf ·
https://www.angoramedia.com/he/blog/english-expressions-wrong-use-in-hebrew

**C10. "he was there for her" / "he's here to stay"**
✗ הוא היה שם בשבילה · הוא כאן בשביל להישאר
✓ הוא עמד לצידה, תמך בה · הוא לא הולך לשום מקום
Rosenthal lists both as calques he would rather never hear; the ✓ forms are [general knowledge, unsourced].
https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf

**C11. English discourse glue**
✗ זה למה (that's why) · רק ש… (only that = but) · על הדרך (by the way) · …והכול / וכל זה / וכאלה (and stuff) · …או משהו כזה
✓ בגלל זה / לכן · אלא ש… / אבל · דרך אגב · (drop) · (drop)
Rosenthal: the English influence on sentence structure is "most visible in openings, endings and linking phrases".
https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf

**C12. "at the end of the day"**
✗ בסופו של יום
✓ בסופו של דבר · בסוף
Rosenthal: a recent import via lawyers; also lists it as filler ("the lawyers' version of בסופו של דבר").
https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf · http://www.ruvik.co.il/הטור-השבועי/2002/30082002.aspx

**C13. Time phrases**
✗ עד ימינו (to this day) · שנה אחרי זה / שנה אחר כך (a year later) · חייו המוקדמים (early life)
✓ עד היום · עדיין · כעבור שנה · אחרי שנה · ילדותו · שנותיו הראשונות
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות

**C14. "last week" / "around the clock" / "that's the point"**
✗ בשבוע האחרון (for *last week*) · מסביב לשעון · זו הנקודה
✓ בשבוע שעבר · יומם ולילה · זה העניין
Translator Amatzia Porat, quoted in a secondary student paper. Medium-low confidence.
https://web.archive.org/web/2018/http://cdi.iugaza.edu.ps/Files/8ee3f33b-7547-4cdb-bd26-96f7576c6ee7.pdf

**C15. "released" / "under construction" / "in favour of"**
✗ האלבום שוחרר · הבניין היה תחת בנייה · היא עזבה את טקסס לטובת סן פרנסיסקו
✓ האלבום יצא · הבניין היה בבנייה · היא עזבה את טקסס ועברה לסן פרנסיסקו
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות

**C16. "following" (= after) / "follow the instructions"**
✗ בעקבות הארוחה הם יצאו · לעקוב אחרי ההוראות
✓ אחרי הארוחה הם יצאו · לפעול לפי ההוראות
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות

**C17. "as a result of"**
✗ כתוצאה מהסערה
✓ בגלל הסערה · בעקבות הסערה · מפני ש…
Bahat: the calque pushed out a dozen native cause words and "impoverishes" the language.
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**C18. "refer to / relate to / in reference to"**
✗ הוא התייחס לדברים שלה · בהתייחס ל…
✓ הוא הגיב על מה שאמרה · הוא דיבר על… · (for rules/taxes) חל על
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**C19. "on the face of it" / "proved himself"**
✗ על פניו הוא אשם · הוא הוכיח את עצמו
✓ לכאורה הוא אשם · הוא הראה מה הוא שווה
Bahat: הוכיח את עצמו means "rebuked himself" in traditional Hebrew; she glosses the English sense as "הראה את כוחו".
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**C20. "in light of" (= because of)**
✗ לאור המצב הם עזבו
✓ בגלל המצב · בעקבות המצב · לנוכח המצב · למשמע / למראה (when reacting to news or a sight)
The Academy accepts לאור for "in view of the findings", but not as a plain cause word, and not with dark contexts.
https://hebrew-academy.org.il/לאור/

**C21. Stock English idioms translated literally**
✗ השני הכי טוב · אנחנו על אותו עמוד · בקליפת אגוז · אל תשפטו ספר לפי הכריכה
✓ השני בטיבו · אנחנו תמימי דעים · בקצרה, על קצה המזלג · אל תסתכלו בקנקן אלא במה שיש בו
Rule: if Hebrew has its own idiom, use it; if not, say it plainly.
https://www.angoramedia.com/he/blog/english-expressions-wrong-use-in-hebrew · https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות

**C22. "the latter"**
✗ …ומשה מסר אותו ליהושע, וזה האחרון…
✓ repeat the noun, or use a pronoun: …ויהושע… / …והוא…
Bahat: fear of repeating a word breeds bad phrasing; in live Hebrew, repeating the plain word is correct.
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**C23. False friends that matter in true-crime stories**
✗ מאסר עולם ללא אפשרות חנינה (parole) · פיזיקאי (physician) · וטרינר (vet = veteran) · גנרל (for a commander who held no such rank) · ביליון
✓ מאסר עולם ללא אפשרות לשחרור מוקדם · רופא · חייל ותיק · מצביא · מיליארד
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות

---

## 2. Prepositions carried over from English

**P1. "with" meaning *by means of* or *in a manner***
✗ הוא היכה אותה עם מקל · אכל עם הידיים · הביטה בו עם עניין · התיישב עם אנחה
✓ הוא היכה אותה במקל · אכל בידיים · הביטה בו בעניין · התיישב באנחה
עם is for accompaniment of equals (ישבתי עם אחותי); ב is for instrument and manner. Wikipedia: "טעות נפוצה במיוחד".
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות · https://meyda.education.gov.il/files/Mazkirut_Pedagogit/MikzootAzmaeem/lemod_merachok_ivirit_melot_ychot.pdf

**P2. "win the game" / "sign the contract"** (English direct object)
✗ הם ניצחו את המשחק · ניצחו את הבחירות · הוא חתם חוזה
✓ הם ניצחו במשחק / ניצחו את היריבה · ניצחו בבחירות · הוא חתם על חוזה
https://hebrew-academy.org.il/לנצח-במשחק-ולא-את-המשחק/

**P3. "last week / next year" with no preposition**
✗ שבוע שעבר זה קרה · נתראה שנה הבאה · בְּשבוע שעבר (no article)
✓ בַּשבוע שעבר זה קרה · נתראה בַּשנה הבאה
Possibly English influence (last week, next year). Adverbs that already carry the time need no ב: מחר, אתמול, השבוע, הלילה.
**Narration note:** the ב-less form is common in speech; for a calm narrator use the full form.
https://hebrew-academy.org.il/שבוע-הבא-או-בשבוע-הבא/

**P4. "considered (as)"**
✗ הוא נחשב כחשוד
✓ הוא נחשב לחשוד
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**P5. "about"**
✗ הוא סיפר אודות המקרה
✓ הוא סיפר על המקרה (אודות only as על אודות, and על alone is better)
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**P6. "in addition" / "in addition to"**
✗ בנוסף, הוא… · בנוסף לזה
✓ וגם · ועוד דבר · נוסף על כך
The Academy recommends נוסף על and advises against bare בנוסף.
https://hebrew-academy.org.il/בנוסף-נוסף-ל-או-נוסף-על/

**P7. "as" rendered by כ־ everywhere**
✗ הוא הוכרז כאחד הבולטים · היא עבדה כמלצרית
✓ rephrase: הוא נחשב לאחד הבולטים · היא עבדה מלצרית / היא עבדה בתור מלצרית
Wikipedia calls this "מארת ה־כ'". שימש כ… is correct (WP), and בתור is accepted by most (Academy).
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות · https://hebrew-academy.org.il/בְּתוֹר/

**P8. "to him" after verbs of motion, longing and speech**
✗ היא הלכה לו · הוא התגעגע לה · היא אמרה אליו
✓ היא הלכה אליו · הוא התגעגע אליה · היא אמרה לו
Motion or feeling toward a target takes אל in the inflected form (אליו); a recipient or a speech verb takes ל (לו).
https://hebrew-academy.org.il/מילות-היחס-אל-ול־/

**P9. Repeat the preposition before each item**
✗ הם גרו בחיפה, ירושלים ותל אביב
✓ הם גרו בחיפה, בירושלים ובתל אביב
Recommended, with room for judgement in short close pairs.
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://hebrew-academy.org.il/בְּתופים-וּבִמחולות-חזרה-על-מילת-הי/

**P10. One object shared by verbs that take different prepositions** (English "think of and love")
✗ היא חשבה ואהבה את הילדים שלה · לפני ואחרי החופשה
✓ היא חשבה על הילדים שלה ואהבה אותם · לפני החופשה ואחריה
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://hebrew-academy.org.il/שני-נסמכים-לסומך-אחד/

**P11. "among them" (inclusion)**
✗ נעלמו כמה ילדים, ביניהם אחיה
✓ נעלמו כמה ילדים, ובהם אחיה
ביניהם means *between* them.
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**P12. "about / approximately" twice**
✗ בערך כאלף איש
✓ כאלף איש · בערך אלף איש
https://hebrew-academy.org.il/בערך-כ־/

**P13. "won / received / was criticised"**
✗ הוא זכה לביקורת
✓ הוא ספג ביקורת · (competition) זכה בפרס · (a good thing) זכה להצלחה
https://hebrew-academy.org.il/ב-או-ל/ · https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**P14. "we're talking about…" (identifying what the case is)**
✗ מדובר על עשרות אנשים
✓ מדובר בעשרות אנשים (identifying) · בתוכנית דובר על הפרשה (topic of talk)
https://hebrew-academy.org.il/מדובר-על-ומדובר-ב/

**P15. "they let me / agreed to let me"**
✗ ההורים שלה הסכימו לה לצאת
✓ ההורים שלה הרשו לה לצאת · הסכימו שהיא תצא
https://hebrew-academy.org.il/את-מסכימה-לי/

**P16. "responsible for"**
✓ אחראי ל (careful: אחראי למעשיו) · אחראי על is common and accepted for a job; ממונה על for a post.
**Narration note:** do not "fix" אחראי על.
https://hebrew-academy.org.il/אַחְרַאי/

---

## 3. Syntax and word order

**S1. Sequence of tenses (reported speech and thought)**
✗ הוא אמר לה שהיא הייתה חזקה (for "he told her she was strong") · היא ידעה שהוא היה משקר
✓ הוא אמר לה שהיא חזקה · היא ידעה שהוא משקר
English backshifts the tense inside the reported clause; Hebrew keeps the tense of the original moment.
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות

**S2. can/could + a perception verb**
✗ הוא יכול היה לראות אותה עולה לאוטובוס · היא יכלה לשמוע צעדים
✓ הוא ראה אותה עולה לאוטובוס · היא שמעה צעדים
In English "can" here is a mere auxiliary, not ability.
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות

**S3. Time or place phrase at the head of the sentence**
✗ שנה אחר כך הוא היה מת · ב־24 בפברואר יצא יוסף מהבית (WP: "sounds forced") · אחרי יום ההולדת שלו, דני קנה חתול
✓ הוא מת כעבור שנה · יוסף יצא מהבית ב־24 בפברואר · אחרי יום ההולדת שלו קנה דני חתול
Wikipedia: opening with the time is an English habit that "intensifies the symptoms of translationese".
Options: move the time phrase to the end (safest for narration), or put a past/future verb before the subject
("בראשית ברא"). With a present-tense predicate the subject stays first ("היום העיתון מפרסם"). A subject-first order after
an opener is not an error, only a lower register (WP), so do not force inversion into every line: it turns literary.
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות · https://he.wikipedia.org/wiki/ויקיפדיה:לשון ·
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**S4. Relative clause with a fronted preposition** (Academy decision)
✗ הדירה בה הם גרו · הבית אליו הגיעה · החדר ממנו יצא
✓ הדירה שהם גרו בה · הדירה שבה הם גרו · הבית שהיא הגיעה אליו · החדר שהוא יצא ממנו
Bahat: this "uprooted ש" came from Mandate-era translation of English "the man I saw"; the Academy ruled it out.
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/ · https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**S5. Direct-object relative clause**
✗ האיש אותו ראתה · המכתב שאותו כתב
✓ האיש שהיא ראתה · המכתב שהוא כתב
And no resumptive אותו either ("האיש שראיתי אותו" is not the fix).
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/ · https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**S6. "who / which / that" as אשר**
✗ השכן, אשר גר מעליהם
✓ השכן, שגר מעליהם
Bahat: אשר is used to make ש look "important". It is written-only.
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**S7. Cleft "It was X who…"** (Academy decision)
✗ הייתה זו השכנה שהתקשרה למשטרה
✓ השכנה היא שהתקשרה למשטרה · מי שהתקשרה למשטרה הייתה השכנה
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**S8. "the first to…"**
✗ היא הייתה הראשונה לשים לב · מהראשונים להגיע
✓ היא הראשונה ששמה לב · מהראשונים שהגיעו
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**S9. "…, who then…" (continuative relative clause)**
✗ היא התקשרה לאחיה, שהגיע אחרי עשר דקות · המכונית פגעה ברוכב שבנס יצא בלי פגע
✓ היא התקשרה לאחיה, והוא הגיע אחרי עשר דקות · המכונית פגעה ברוכב, אבל בנס הוא יצא בלי פגע
A relative clause gives earlier background; a *new event* gets its own clause with ו. The Academy calls the ✗ form
non-standard; Wikipedia: "שי"ן הזיקה אינה תחליף לוי"ו החיבור". Very common in English story narration.
https://hebrew-academy.org.il/פסוקית-זיקה-ממשיכה/ · https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**S10. Passive with "by"**
✗ הדלת נפתחה על ידי מישהו מבפנים · הם נעצרו על ידי המשטרה
✓ מישהו פתח את הדלת מבפנים · המשטרה עצרה אותם · את הדלת פתח מישהו מבפנים
Keep the passive only when the doer is unknown or irrelevant; then use ב/מ/מפי/בידי, not על ידי.
https://hebrew-academy.org.il/על-ידי-וחלופותיו/ · https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**S11. English past passives mapped onto הוּפעל**
✗ הוחל בחיפושים · הותחל מחדש · הועלתה השערה · שינוי נעשה
✓ התחילו לחפש · חידשו את… · מישהו העלה השערה · שינו
Wikipedia: banning these forms and sticking to פעל/הפעיל lifts a translation "by two levels".
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות

**S12. Pronouns and link words that English forces in**
✗ לאחר המהפכה הוא חזר לבית הספר, שם הוא פעל למען…
✓ לאחר המהפכה חזר ללימודים ופעל למען…
Usually removable: "כ", "שם" (where), "אשר", "הוא", "היא", "כאשר", "מה", "הינו", "ממוקם".
**Narration note:** in speech, a subject pronoun on the first verb is normal (הוא חזר הביתה); just do not repeat it on every clause.
https://he.wikipedia.org/wiki/ויקיפדיה:מדריך_לתרגום_ערכים · https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות

**S13. A copula for every English "is"**
✗ הבית הזה הינו ישן · הרחוב מהווה מקום מסוכן · השקט היווה סימן
✓ הבית הזה ישן · הרחוב הזה מסוכן · השקט היה סימן
Present-tense nominal sentences need no copula; when one is needed use הוא/היא; never הינו; avoid להוות.
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://hebrew-academy.org.il/הינו-בתפקיד-אוגד/

**S14. English "-ing" chains and "while doing"**
✗ מאו נשאר בשנות העשרים כשהוא נוסע ברחבי סין · היא ישבה שם, כשהיא מחכה
✓ בשנות העשרים נדד מאו ברחבי סין · היא ישבה שם וחיכתה
Replace the participle with a finite verb joined by ו. (Wikipedia's worked Mao example; its fix uses "תייר מאו ברחבי סין".)
https://he.wikipedia.org/wiki/ויקיפדיה:מדריך_לתרגום_ערכים

**S15. Main event first**
✗ הבן הבכור מבין ארבעה ילדים של איכר אמיד, מאו נולד בכפר…
✓ מאו נולד לאיכר אמיד בכפר…, והיה הבן הבכור מבין ארבעה ילדים
English can hold the main verb back behind a long appositive; the Hebrew version becomes "an impossible sentence".
https://he.wikipedia.org/wiki/ויקיפדיה:מדריך_לתרגום_ערכים

**S16. Negative concord ("nobody came", "nothing happened")**
✗ אף אחד בא · שום דבר קרה · אכלתי שום דבר מהבוקר
✓ אף אחד לא בא · לא קרה שום דבר · לא אכלתי כלום מהבוקר
אף אחד, שום, כלום are not negative by themselves; the verb needs לא. English speakers in Israel still produce
"אכלתי שום דבר" (Schwarzwald). A one-word answer is fine: "מי היה שם? – אף אחד."
https://hebrew-academy.org.il/אף-אחד-ודומיו/ · https://hebrew-academy.org.il/כלום-ושום-דבר/ ·
https://meyda.education.gov.il/files/Pop/0files/ivrit_hinuch_leshoni/Chativat-Beynayim/so1.pdf

**S17. Connectors in mid-sentence (European habit)**
✗ הם סיפרו לה, אם כן, הכול · היא, אמנם, לא ראתה אותו
✓ אז הם סיפרו לה הכול · אמנם היא לא ראתה אותו
Bahat: אמנם, אם כן, ובכן belong at the head of the clause; if you must put one mid-sentence, only אפוא. Also כבר / עדיין
before the verb: כבר יצא, עדיין לא חזר.
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**S18. "had the…" (possession of a definite thing)**
✗ היה לו את המפתח · יש לה את האומץ
✓ המפתח היה אצלו · היה לו המפתח · יש לה האומץ
The Academy traces "יש לי את" to European "I have"; in יש/אין the owned thing is the *subject*.
**Narration note:** very common in speech; for the narrator prefer rephrasing with אצל, which sounds neither stiff nor calqued.
https://hebrew-academy.org.il/יש-לי-את/

**S19. English past progressive ("was walking")**
✓ plain past is the default: הוא הלך ברחוב כשפתאום…
היה + בינוני is genuine Hebrew, not a calque, for habits (בקיץ היינו יורדים למעיין) and irrealis (הייתי שמח); the
"background action" use survives mostly in literature, so do not map every English "was -ing" onto it.
https://hebrew-academy.org.il/ישנתי-או-הייתי-ישן-על-המבנה-היה-בינוני/

**S20. Possessives: של vs the bound suffix**
✓ for narration, the analytic form is the spoken default: הבית שלהם, החדר שלה, הכלב שלו.
The Academy notes the modern trend to separate possessive pronouns ("הבית שלי"). Bound forms of most nouns (ביתם,
חדרה) sound written; common kin terms keep bound forms in speech (אשתו, בעלה, אחיה).
The register advice is [general knowledge, unsourced]; the trend is from https://hebrew-academy.org.il/את-ציין-המושא/

---

## 4. בניינים and verb choice

**V1. "continue" with no object**
✗ השקט המשיך · החגיגה ממשיכה · הדיון המשיך
✓ השקט נמשך · החגיגה נמשכת · הדיון נמשך
המשיך (הפעיל) is transitive: someone ממשיך את / ב־ something; the thing itself נמשך (נפעל). ("הגשם המשיך לרדת" is fine.)
https://hebrew-academy.org.il/החגיגה-נמשכת-ולא-ממשיכה/

**V2. borrow/lend, rent/let: English uses one verb for both directions**
✗ היא השאילה את הספר מהספרייה · הוא השכיר דירה מבעל הבית
✓ היא שאלה את הספר מהספרייה · הוא שכר דירה (בעל הבית השכיר לו)
קל = taking (שאל, לווה, שכר); הפעיל = giving (השאיל, הלווה, השכיר). Some tie the blur to European verbs that go both
ways, such as English "rent" (Academy). Careful usage keeps the distinction.
https://hebrew-academy.org.il/לָווה-והלווה-שאל-והשאיל-שכר-והשכיר/

**V3. English "be + adjective" where Hebrew has a verb**
✗ והם היו צודקים · הוא היה מפוחד · היא הייתה כועסת עליו (for a one-off event)
✓ והם צדקו · הוא פחד · היא כעסה עליו
[general knowledge, unsourced]; the owner rejected "והם היו צודקים" as a calque (22 Sep 2026).

**V4. "served (a sentence)"**
✗ הוא ריצה עשרים שנה · ריצה את עונשו
✓ הוא נשא בעונשו · ישב בכלא עשרים שנה
ריצה means "appeased". Law and Academy terms use נשיאת עונש. ("ישב בכלא" is [general knowledge, unsourced].)
https://hebrew-academy.org.il/ריצה-עונש-או-נשא-בעונש/

**V5. "served" for a role**
✓ שירת (army, police) · כיהן (elected or high public office) · שימש (everything else: שימש מנהל / כמנהל)
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**V6. "wrote"**
✗ היא רשמה לו מכתב
✓ היא כתבה לו מכתב · (quick note, name on a list) רשמה
https://hebrew-academy.org.il/רשם-לעומת-כתב/

**V7. "got lost" vs "made a mistake"**
✓ תעה ביער · הלך לאיבוד (lost the way) · טעה (erred, misjudged)
https://hebrew-academy.org.il/טעה-ותעה/ · https://hebrew-academy.org.il/אָבַד-נֶאֱבַד-והלך-לאיבוד/

**V8. "might / may"**
✓ עלול (a bad outcome: הוא עלול ליפול) · עשוי (neutral or good: היא עשויה להגיע מחר)
A modern distinction, supported by many editors, not by the classical sources; the Academy has not ruled.
https://hebrew-academy.org.il/עשוי-ועלול/

**V9. "unbelievable"**
✗ לא יאומן
✓ לא ייאמן (from אמונה, belief)
https://hebrew-academy.org.il/לא-ייאמן-או-לא-יאומן/ (page excerpt)

**V10. "pour" for solid food**
✗ היא מזגה לו אורז
✓ היא שמה לו אורז · הגישה לו
Only liquids are poured (מוזגים, יוצקים). The ✓ verbs are [general knowledge, unsourced].
https://hebrew-academy.org.il/האם-אפשר-למזוג-אוכל/ (page excerpt)

**V11. Body and household collocations**
✓ עצם את העיניים / פקח את העיניים · הציע את המיטה (or סידר את המיטה)
**Narration note:** סגר/פתח את העיניים is everyday speech and not wrong; עצם/פקח is the neutral narrative choice.
Sources: פקח עיניים https://hebrew-academy.org.il/החכם-עיניו-בראשו/ (excerpt); הציע את המיטה
https://milog.co.il/הציע_את_המיטה (snippet). עצם and the register note: [general knowledge, unsourced].

**V12. "died / was killed"**
✓ מת or נפטר (both fine for anyone) · נהרג (killed; not נפל) · [owner rule] "killed" is הרג, never רצח, unless a
murder conviction exists.
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · owner's project notes

---

## 5. Agreement: gender, number, numerals, construct state

**A1. Numbers 3–10: short form with feminine nouns, ה־form with masculine**
✗ שלושה שנים · חמישה דקות · שלוש חודשים
✓ שלוש שנים · חמש דקות · שלושה חודשים · תשעה ימים · ארבע שעות
The "reverse" gender of Semitic numerals; the Academy has no intention of dropping it.
https://hebrew-academy.org.il/שם-המספר-רקע-להחלטות-האקדמיה/

**A2. Number before a definite noun: construct form**
✗ שלושה הילדים · חמישה הימים
✓ שלושת הילדים · חמשת הימים · (feminine) שלוש הבנות
https://hebrew-academy.org.il/שם-המספר-רקע-להחלטות-האקדמיה/

**A3. Bare numbers (not counting anything) are feminine**
✓ קו חמש · דירה מספר שלוש · פרק חמש עשרה · "מספר אחת" · תרגילי חשבון, טלפונים
https://hebrew-academy.org.il/שם-המספר-רקע-להחלטות-האקדמיה/ · https://hebrew-academy.org.il/חידון-איך-נכון-לומר-את-המספר-פתרונות/

**A4. Thousands and millions: אלף and מיליון are masculine**
✗ עשרים וחמש אלף דירות · שבע עשרה אלף מכוניות
✓ עשרים וחמישה אלף דירות · שבעה עשר אלף מכוניות · חמישה עשר מיליון
The number counts the thousands, whatever the counted noun is.
https://hebrew-academy.org.il/שם-המספר-רקע-להחלטות-האקדמיה/

**A5. Singular or plural noun after a number**
✓ 2–10: plural (חמישה אחוזים, not חמישה אחוז; שלושה שקלים) · 11+: either (עשרים שנה / עשרים שנים)
Singular after 11+ is usual with often-counted nouns: שנה, יום, איש, נפש, אחוז, currencies.
https://hebrew-academy.org.il/עשרים-שקל-או-עשרים-שקלים/

**A6. Dates**
✓ באחד בחודש · בעשרים ושלושה בינואר (day numbers are masculine)
https://hebrew-academy.org.il/חידון-איך-נכון-לומר-את-המספר-פתרונות/

**A7. "twice / three times as much" (פי)**
✗ פי שתיים · פי עשר
✓ פי שניים · פי עשרה
**Narration note:** "פי עשר" is common in speech (WP); use the masculine for the narrator.
https://hebrew-academy.org.il/פי-שניים/ · https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**A8. Halves and fractions**
✓ שלוש שעות וחצי (preferred; שלוש וחצי שעות is allowed) · שנה וחצי · שעה ורבע · שלושה מיליון וחצי
✓ שלושה רבעים (not שלושת רבעי, except in construct: שלושת רבעי הכיתה) · שני שלישים (not שני שליש)
https://hebrew-academy.org.il/על-הבעת-המספר-המעורב/ · https://hebrew-academy.org.il/חידון-איך-נכון-לומר-את-המספר-פתרונות/

**A9. Clock time**
✓ speech: חמישה לחמש, שתיים ועשרה (masculine, a relic of רגע/דק). Careful: חמש דקות לחמש.
https://hebrew-academy.org.il/חמישה-לחמש-שתיים-ועשרה/

**A10. Nouns whose gender people get wrong**
✓ masculine: צומת, עט, שדה, and the paired objects אופניים, משקפיים, מכנסיים, מספריים (משקפיים שבורים)
✓ feminine: כיכר (square), מחבת; mostly feminine today: רוח, שמש, דרך, כוס
✓ either: סכין, גרב, פנים
https://hebrew-academy.org.il/מינם-הדקדוקי-של-שמות-אחדים/

**A11. Mixed-gender list → masculine plural**
✗ כל החלונות והדלתות היו פתוחות
✓ כל החלונות והדלתות היו פתוחים
https://hebrew-academy.org.il/מלפפונים-ועגבניות-טריים-ההתאם-במין/

**A12. היה/יהיה agrees with the thing that exists, not with "it"**
✗ לא היה לה ברירה · קרה לו את התאונה · אם יהיה לכם שאלות · מגיע לו את כל מחיאות הכפיים
✓ לא הייתה לה ברירה · קרתה לו התאונה · אם יהיו לכם שאלות · מגיעות לו כל מחיאות הכפיים
In speech the verb gets frozen as masculine singular; the Academy marks all of these as errors.
https://hebrew-academy.org.il/יש-לי-את/

**A13. Construct state: ה on the LAST noun**
✗ הבית ספר · המכונת כביסה · היום הולדת · החדר שינה · העורך דין
✓ בית הספר · מכונת הכביסה · יום ההולדת · חדר השינה · עורך הדין · (chains) סגן מפקד התחנה
https://hebrew-academy.org.il/דקדוק-הסמיכות/ · https://hebrew-academy.org.il/העורך-דין-או-עורך-הדין/

**A14. Construct plural and feminine: change the FIRST noun**
✗ בית ספרים · עורך דינית
✓ בתי ספר · ימי הולדת · עורכי דין · עורכת דין
https://hebrew-academy.org.il/דקדוק-הסמיכות/

**A15. One singular institution, then "they"**
✗ המשטרה הגיעה למקום. הם חיפשו בכל הבית.
✓ המשטרה הגיעה למקום. השוטרים חיפשו בכל הבית. (or: היא חיפשה…)
Wikipedia: never jump from singular to plural in the same stretch. (The police example is mine; the rule is WP's.)
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**A16. "amount of people"**
✗ כמות האנשים שהגיעו
✓ מספר האנשים שהגיעו · (mass nouns only) כמות הגשם
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**A17. Names and dates are already definite**
✗ ב־ה־22 ביולי · זכה בפרס האוסקר
✓ ב־22 ביולי · זכה בפרס אוסקר
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**A18. Women in roles get feminine forms**
✓ השוטרת, הבלשית, השופטת, המנכ"לית (the Academy: Hebrew distinguishes male and female)
https://hebrew-academy.org.il/תפקיד-או-תואר-של-אישה/ (page excerpt)

---

## 6. Register: written-only forms and their spoken equivalents

**R1. The governing principle**
"If you want to speak like everyone, say אני לא שומע" (Chaim Blank, quoted by Wikipedia). Bahat: "whatever is not good
in the spoken language is not good in the written one either", and of two synonyms "the everyday word is preferred".
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**R2. הינו / הינה / הנני**
✗ הוא הינו אדם שקט · הנני…
✓ הוא אדם שקט · אני…
An "artificial elevation, and an incorrect one" (Academy). Keep הנה only for real "look!/here is".
https://hebrew-academy.org.il/הינו-בתפקיד-אוגד/ · https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**R3. אולם / ברם / אך**
✗ אולם היא לא ענתה
✓ אבל היא לא ענתה
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**R4. כמו כן / בנוסף at the head of a sentence**
✗ כמו כן, הדלת הייתה פתוחה
✓ וגם הדלת הייתה פתוחה · ועוד דבר: הדלת הייתה פתוחה
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://hebrew-academy.org.il/בנוסף-נוסף-ל-או-נוסף-על/

**R5. על מנת**
✗ הוא חזר על מנת לבדוק
✓ הוא חזר כדי לבדוק · הוא חזר לבדוק
Originally a *condition*, not a purpose; editors advise avoiding it.
https://hebrew-academy.org.il/על-מנת/ · https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**R6. במידה ו / באם**
✗ במידה והוא יחזור · באם תשמעו משהו
✓ אם הוא יחזור · אם תשמעו משהו
"במידה ו" is a double error (Bahat); באם has no place in speech.
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**R7. בלבד / טרם / ישנו**
✗ הם היו שם שעה בלבד · הוא טרם חזר · ישנם אנשים ש…
✓ הם היו שם רק שעה · הוא עוד לא חזר · יש אנשים ש…
(ישנו stays in "הספר ישנו" = it is here.)
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות · https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://hebrew-academy.org.il/יש-או-ישנו/

**R8. Elevated synonyms**
✗ לשוח עם שקיעת החמה · רכש · נסוב סביב · מחל לו
✓ לטייל כשהשמש שוקעת · קנה · עוסק ב… · סלח לו
Bahat calls the ✗ style "ridiculous and pretentious" in ordinary writing.
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/ · https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://hebrew-academy.org.il/סליחה-ומחילה/

**R9. Filler words to cut**
בעצם · למעשה · כמובן · כידוע · בהחלט · האמת היא ש… · יש לציין ש… · חשוב לומר ש… · בקיצור · פשוט · ממש (rarely, where it earns it)
Rosenthal's "dictionary of redundant words": בעצם "can be removed from almost any sentence without damage".
http://www.ruvik.co.il/הטור-השבועי/2002/30082002.aspx · https://he.wikipedia.org/wiki/ויקיפדיה:לשון · [owner rule] on ממש

**R10. Adjective and intensifier inflation**
✗ ייסורים קשים · גדול מאוד מאוד · ממש ממש
✓ ייסורים · a concrete detail instead of מאוד · one intensifier at most
"ייסורים is a strong enough word; add 'קשים' and the fakeness shows" (Benny Ziffer, quoted by WP).
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · [owner rule] no doubled intensifiers

**R11. Slang intensifiers**
✗ נורא יפה · מצחיק רצח · טעים בטירוף
✓ יפה מאוד · מאוד מצחיק · טעים מאוד
The Academy traces "נורא" = "very" to European usage (terribly); fine in chat, wrong for this narrator.
https://hebrew-academy.org.il/נורא-יפה-נורא-ואיום/

**R12. English words dropped into Hebrew speech**
✗ יו נואו · סו וואט · דפנטלי · ווטאבר · בלאסט מיניט · און ליין (= live, on the spot)
✓ (drop) · אז מה · בטוח · לא משנה · ברגע האחרון · בזמן אמת
Rosenthal's "as-is dictionary" of slang. ✓ glosses are [general knowledge, unsourced].
https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf

**R13. Bureaucratic and legal Hebrew**
✗ הננו להודיעכם · ו/או · בגין · נא תשובתך
✓ plain speech: אנחנו רוצים להגיד לכם · או · בגלל
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**R14. בטח / בטוח as "surely"**
✓ spoken and understood; editors prefer ברור ש… · בלי ספק · בוודאי. For a calm narrator: ברור ש… or just state it.
https://hebrew-academy.org.il/בטח-בטוח-וביטחון/

**R15. Doubled meaning**
✗ שוב פעם · כמו לדוגמה · בעבר הוא כיהן · בערך כ־
✓ שוב / עוד פעם · כמו · הוא כיהן · כ־ or בערך
https://hebrew-academy.org.il/שוב-פעם/ · https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**R16. Emotional commentary by the narrator**
✗ למרבה הצער · למרבה המזל · וזה מה שמפחיד · תחשבו כמה זה מטורף
✓ state the fact and stop
Wikipedia bans the first two from neutral text; [owner rule]: "Never explain why something is frightening."
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · owner's project notes

---

## 7. Punctuation and rhythm for spoken narration

**D1. One spoken thought = one sentence**
✗ אבל כשהיא כיבתה את האור ונכנסה למיטה. היא שמעה צעדים.
✓ אבל כשהיא כיבתה את האור ונכנסה למיטה, היא שמעה צעדים.
A comma may follow a fronted subordinate clause unless it is very short (Academy §10); a full stop there makes the TTS
voice stop mid-thought ([owner rule]).
https://hebrew-academy.org.il/topic/hahlatot/punctuation/ · owner's project notes

**D2. Break monsters, but do not chop**
Wikipedia's 95-word sentence is split into three logical sentences. Rosenthal: Hebrew grows from the short biblical
verbal/nominal sentence. [owner rule]: median about 9–11 Hebrew words, a few short lines for beats, never a script of fragments.
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf · owner's project notes

**D3. A comma is a pause, so do not scatter them**
"Do not over-use commas, especially where structure words already show the structure, and between short units."
Short parentheticals need none: "כיום יש כמובן ידע רב יותר" (Academy §4). Each extra comma is an extra TTS pause.
https://hebrew-academy.org.il/topic/hahlatot/punctuation/

**D4. Relative-clause commas change the meaning**
✓ restrictive (which ones?): no comma → "השכנים שראו אותו התקשרו" (only those who saw him)
✓ non-restrictive (extra info): commas → "השכנים, שראו אותו, התקשרו" (all the neighbours saw him)
https://hebrew-academy.org.il/topic/hahlatot/punctuation/

**D5. Commas around ו**
✓ no comma before ו joining nouns: "הוא, אשתו והילדים"
✓ a comma before ו joining clauses with a new subject, optional if the second is short: "הכוהן עומד במזרח והלוי בדרום"
https://hebrew-academy.org.il/topic/hahlatot/punctuation/ · https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**D6. The dash (–) before the surprise**
✓ "…ואז הוא ראה אותו – עומד בפתח."
The Academy lists the dash "before a part of the sentence that carries surprise, or that one wants to emphasise", and
for an omitted verb ("בתצלום הראשון רואים את הצפון, ואילו בשני – את הדרום"). ElevenLabs: dashes read as pauses.
https://hebrew-academy.org.il/topic/hahlatot/punctuation/ · https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices

**D7. Ellipsis (…) for trailing off, hesitation, silence**
Academy §24ג: speech that is "hesitant and thoughtful, not continuous". Netflix Hebrew: use the single character U+2026 and
reserve it for a real pause. ElevenLabs: an ellipsis makes a hesitation. Sparingly, or it stops working.
https://hebrew-academy.org.il/topic/hahlatot/punctuation/ · https://partnerhelp.netflixstudios.com/hc/en-us/articles/220636427-Hebrew-Timed-Text-Style-Guide ·
https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices

**D8. Exclamation marks**
Netflix Hebrew: "use restraint", strong emotion only. A calm narrator almost never needs one.
https://partnerhelp.netflixstudios.com/hc/en-us/articles/220636427-Hebrew-Timed-Text-Style-Guide

**D9. Quotation marks**
✓ double quotes for direct speech, single quotes inside them. [owner rule]: words said by anyone but the narrator go in
double quotes, and are phrased the way an Israeli would say them.
https://hebrew-academy.org.il/topic/hahlatot/punctuation/ · https://partnerhelp.netflixstudios.com/hc/en-us/articles/220636427-Hebrew-Timed-Text-Style-Guide

**D10. Read it aloud**
Nurit Shai lists *not reading the translation aloud* as one of six common translator errors: clumsy sentences are easy
to miss on the page.
https://www.nurit-shai.com/behind-the-scenes/עריכת-תרגום/

**D11. ElevenLabs v3 pauses**
v3 does not support SSML `<break>` tags; control pauses with punctuation, ellipses, text structure and audio tags.
https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices

---

## 8. Text-to-speech specifics

**T1. Homographs: rewrite so the context decides**
ספר can be /sefer/ book, /sapar/ barber, /safar/ counted or /sfar/ outskirts; stress is not written even with nikud
(בירה = beer or capital; טחינה = tahini or grinding); the shva is ambiguous (בלונדון vs בלונדיני).
If a word is ambiguous in its sentence, change the word or the sentence (the fix is [general knowledge, unsourced]).
https://arxiv.org/abs/2506.12311

**T2. Force a reading only where needed**
Add nikud to the one ambiguous word (ElevenLabs Hebrew page, snippet). In v3, IPA between slashes forces a name's pronunciation.
https://elevenlabs.io/text-to-speech/hebrew (snippet) · https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices

**T3. Use the Academy's 2017 full spelling (כתיב מלא)**
✓ ו for o/u: תוכנית, צוהריים, אומנם, קורבן, עוצמה · ✓ י for i: אמיתי, לעיתים, איתך, מייד, שמיים, ליבי, לצידו
Fuller spelling leaves the engine less to guess (that inference is mine).
https://hebrew-academy.org.il/כללי-הכתיב-המלא-הכללים-החדשים-סיוון/

**T4. Consonantal ו and י**
✓ double consonantal ו mid-word and after prefixes: הוועדה, תקווה, בוויסקי; single at word start: ורד
✓ double consonantal י mid-word when not next to a vowel letter: מסיים, but מסוים, מצוין, אויב (not מסויים, מצויין)
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**T5. Verbs from ל"י roots keep the root י**
✗ העלתי · נהנתי · השתנתי · הנחתי אותו (meaning "I instructed him")
✓ העליתי · נהניתי · השתניתי · הנחיתי אותו
A missing י spells a different word (השתנתי = "I urinated"; הנחתי = "I assumed/placed"), and the engine reads it that way.
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**T6. Numbers as words, in the right gender**
Digits are normalised inconsistently ($1,000,000 read as "one thousand thousand"), and a Hebrew normaliser cannot know
that 3 before שנים must be שלוש. Write שלוש שנים, עשרים וחמישה אלף. (ElevenLabs advises words over digits for
multilingual models; the gender argument follows from A1–A4.)
https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices · https://hebrew-academy.org.il/שם-המספר-רקע-להחלטות-האקדמיה/

**T7. Dates, times, currency, units**
✓ בעשרים ושלושה בינואר · בשתיים בלילה · שלושים שקל · (Netflix) write currency names, convert to metric unless the plot needs otherwise.
https://hebrew-academy.org.il/חידון-איך-נכון-לומר-את-המספר-פתרונות/ · https://partnerhelp.netflixstudios.com/hc/en-us/articles/220636427-Hebrew-Timed-Text-Style-Guide

**T8. Abbreviations and symbols**
Expand them to their spoken form (ElevenLabs: "Expand all abbreviations to their full spoken forms"): ק"מ → קילומטר,
ד"ר → דוקטור, % → אחוז (Hebrew examples are mine).
https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices

**T9. Foreign names: spell for sound**
✓ T → ט, TH → ת; English J → ג', but J in other languages differs (French ז', Latin/German/Slavic י', Spanish ח').
[owner rule]: write names the way an Israeli would say them and keep one fixed spelling per name across episodes.
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות · owner's project notes

**T10. Stress of loanword plurals**
Broadcast norm stresses the Hebrew suffix on old loans (בנקים, טנקים, אוטובוסים, טלפונים, סטודנטים); newer ones
(ויטמינים, מינרלים) are left free. Listen for these.
https://hebrew-academy.org.il/wp-content/uploads/Almagor-Ramon.pdf

**T11. Inflected prepositions people misspell or mispronounce**
✗ אותכם · אצלהם · בשבילהן · ממכם · ממזמן · (pronunciation only, same letters) אֵליכם, כָּמוכם
✓ אתכם · אצלם · בשבילן · מכם · מזמן · אֲליכם, כְּמוכם
https://hebrew-academy.org.il/wp-content/uploads/תנו-יחס-למילות-היחס.pdf · https://hebrew-academy.org.il/מזמן-ולא-ממזמן/

**T12. Check by ear, not by transcript**
Hebrew ASR outputs unvocalised text, so a speech-to-text round trip is blind to wrong vowels and stress.
https://arxiv.org/abs/2506.12311

---

## 9. Do NOT over-correct: forms that are right for spoken narration

**N1. Fix only what is broken** [owner rule]
False positives cost as much as misses; a "fixed" line is often flatter than the original. Register is the owner's call.
(feedback memory `feedback_dont_over_edit_his_hebrew.md`)

**N2. לא + present tense**: "אני לא יודע", "היא לא זוכרת" are natural; "איני יודע" is stiff in speech. Editors ask for
אין/אינו only in writing and formal speech.
https://hebrew-academy.org.il/הוא-לא-מבין-הוא-אינו-מבין-על-שלילת-הבי/ · https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**N3. הכי**: "הכי מוזר", "הדבר הכי מפחיד" are spoken Hebrew; "הטוב ביותר" is the written form (Wikipedia's rule is for
the encyclopedia).
https://hebrew-academy.org.il/על-ענייני-ניסוח-או-ניסוח-ענייני/

**N4. הרבה + noun**: "הרבה אנשים", "הרבה שנים" are fully acceptable (attested in the Talmud); "אנשים רבים" is only higher register.
https://hebrew-academy.org.il/הרבה-דברים-או-דברים-רבים/

**N5. כולם for "everyone"**: the broadcaster's language advisers stopped forcing "הכול" decades ago; it changed the register.
https://hebrew-academy.org.il/wp-content/uploads/Almagor-Ramon.pdf · https://hebrew-academy.org.il/הכול-וכולם/

**N6. אז as a sentence opener** ("אז מה עושים?") is approved for spoken broadcast Hebrew; dropping it "hurts the flow".
[owner rule] also allows opening with אז / אבל / כי / עכשיו.
https://hebrew-academy.org.il/wp-content/uploads/Almagor-Ramon.pdf

**N7. לפני ש…, בגלל ש…, בתור**: all accepted in current usage (קודם ש / כיוון ש / כ־ are only more formal).
https://hebrew-academy.org.il/wp-content/uploads/Almagor-Ramon.pdf · https://hebrew-academy.org.il/בגלל-שֶׁ/ · https://hebrew-academy.org.il/בְּתוֹר/

**N8. Future tense as a request** ("תסתכלו על הדלת") is normal speech; the dispute is about formal writing only.
https://hebrew-academy.org.il/עתיד-בתפקיד-ציווי/

**N9. Pairs where both forms are standard**: חניתי / החניתי · שמנתי / השמנתי · אבד / נאבד / הלך לאיבוד · החל מ / החל ב ·
תרופה ביום / ליום · רוב האנשים הצביע / הצביעו · את אותו הספר · מדובר על (topic).
https://hebrew-academy.org.il/חָנָה-והֶחֱנָה/ · https://hebrew-academy.org.il/הִשְׁמִין-והִרְזָה-או-שָׁמַן-ורָזָה/ ·
https://hebrew-academy.org.il/אָבַד-נֶאֱבַד-והלך-לאיבוד/ · https://hebrew-academy.org.il/ב-או-ל/ ·
https://hebrew-academy.org.il/רוב-האנשים-הצביע-או-הצביעו-התאם-תחבי/ · https://hebrew-academy.org.il/את-אותו/

**N10. Calques that have become Hebrew**: ירח דבש, גן ילדים, סוף שבוע, נקודת ראות, לקח זמן, לקח בחשבון, קח את זה
בקלות, איך אתה?, אין בעיה, מפי הסוס, חי ובועט, רגע האמת, יצא מהארון. Rosenthal: "we got used to older loan
translations". Do not replace them with invented "pure" Hebrew.
https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf · https://he.wikipedia.org/wiki/תרגום_שאילה ·
(סוף שבוע, נקודת ראות) https://web.archive.org/web/2018/http://cdi.iugaza.edu.ps/Files/8ee3f33b-7547-4cdb-bd26-96f7576c6ee7.pdf

**N11. מישהו / משהו** are banned only in encyclopedia prose; in narration they are the natural words (מישהו עמד בחוץ).
https://he.wikipedia.org/wiki/ויקיפדיה:לשון

**N12. היה + בינוני for habits and wishes** ("כל לילה היא הייתה בודקת את המנעול", "הייתי רוצה לדעת") is classical
Hebrew, not a calque.
https://hebrew-academy.org.il/ישנתי-או-הייתי-ישן-על-המבנה-היה-בינוני/

---

## 10. English-draft interference in story narration (added 29 Sep 2026)

Why this section exists: ep02 v1 was written by Claude from an English draft of five American stories, and a test run
of this skill on it found errors the first nine sections do not name: English quote order, "Name, role, age"
appositives, "one of the X was Y", "own", device talk, possessives on everything. Each rule below says what backs it.
Sub-sections are split by the strength of that backing:
- **10a. Authoritative sources** (Academy of the Hebrew Language, Hebrew Wikipedia's style pages, Rosenthal, the
  broadcaster's language advisers).
- **10b. Practitioners and translation studies** (blog opinion is marked as such).
- **10c. Measured in native narration, or caught on this project** (no external source).

### 10a. Authoritative sources (research pass, 29 Sep 2026)

Access note: hebrew-academy.org.il returned HTTP 403 to every fetch in this pass, so every Academy item here is from a
search-result summary and marked (snippet). Hebrew Wikipedia (raw wikitext) and Rosenthal's site were read directly.
Quotes went through the fetch tool's summariser: close to the source, not guaranteed word for word.

**C30. "once" (= as soon as)**
✗ פעם שהדלת נסגרת, אין דרך החוצה · וואנס הוא נכנס…
✓ ברגע שהדלת נסגרת, אין דרך החוצה · מרגע שנכנס… · כשנכנס…
Wikipedia calls פעם ש a meaningless literal translation of "once" (fixes: משנפתח, ברגע שנפתח, משעה שנפתח); Rosenthal
calls "פעם שתקשיב לו, אתה אבוד" עילג and "וואנס" the creature it bred. ("בכל פעם ש…" is fine.)
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות · https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf
Reliability: high (two independent sources, both name English "once").

**C31. "kind of / sort of" as a hedge**
✗ זה היה סוג של אזהרה · הוא היה סוג של מוזר
✓ זה היה מעין אזהרה · הוא היה קצת מוזר · (drop the hedge)
Rosenthal: סוג של is spoken, slightly slangy Hebrew; fine when it really classifies ("האריות הם סוג של בעלי חיים"), and
for the hedging use he gives בערך as the standard alternative. ✓ מעין / קצת are [general knowledge, unsourced].
https://www.ruvik.co.il/שאל-את-רוביק/צירופי-לשון.aspx?page=54&q=9716 (question 796)
Reliability: high. **Narration note:** also a register item (WRITING-RULES section 2: the cheerful channel's hedge). Never
flag the classifying use.

**C32. "take shelter / take a lesson / take the lead"** (extends C4)
✗ הם לקחו מחסה במרתף · היא לקחה שיעורי נהיגה · הוא לקח מנהיגות
✓ הם תפסו מחסה במרתף (sudden danger) · היא למדה נהיגה · הוא נטל את ההנהגה
Rosenthal: לקחת מחסה is "already an Americanism, better avoided"; לתפוס מחסה is a legitimate calque carrying urgency.
His 2024 column calls לקח שיעור an Americanism (→ למד) and לקח מקלחת "a pure Americanism" (strengthens C4).
https://www.ruvik.co.il/שאל-את-רוביק/שימושי-מילים.aspx?page=8&q=30484 (question 107) · https://www.ruvik.co.il/הטור-השבועי/2024/2824.aspx
Reliability: high.

**C33. "put on" (clothes, shoes, a hat, jewellery)**
✗ היא שמה מעיל ונעליים ויצאה · הוא שם כובע
✓ היא לבשה מעיל, נעלה נעליים ויצאה · הוא חבש כובע · גרבה גרביים · ענדה שרשרת
Rosenthal (2024): "under English influence" שם now covers almost every garment, and לגרוב, לנעול, לענוד, לחבוש, even
ללבוש, are slowly disappearing.
https://www.ruvik.co.il/הטור-השבועי/2024/2824.aspx
Reliability: high. **Narration note:** שמה מעיל is everyday speech; the specific verbs are neutral, not literary
(ep01, approved: "הוא לובש את הבגדים של האבא", "לבשה חלוק").

**C34. "each other / one another"**
✗ (careful writing) הם האשימו אחד את השני
✓ הם האשימו זה את זה · הן לא דיברו זו עם זו
The Academy: אחד את השני is assumed to be a loan translation of European reciprocals ("one another"); language
editors recommend זה את זה.
https://hebrew-academy.org.il/אחד-את-השני-וחלופותיו/ (snippet)
Reliability: authoritative, snippet only. **Narration note: do NOT apply to narration.** אחד את השני is the ordinary spoken
form, and the owner approved "אמרו אחד לשני" and "צמודים אחד לשני" in ep01 (owner wins, N1).

**C35. "again" as בשנית**
✗ הוא ניסה להתקשר בשנית
✓ הוא ניסה להתקשר שוב · עוד פעם · פעם נוספת
https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות
Reliability: high.

**C36. English "of" as של on abstract nouns ("the thing of X", "this X of Y")**
✗ העניין של החקירה היה ש… · ישנו האבסורד הזה של המשטרה…
✓ name the real subject: החקירה נמשכה… · מה שלא הגיוני הוא שהמשטרה…
Rosenthal (1999, on a translated Feynman book): this של is "the English OF again" and "an Americanism"; "העניין של" is "a
common linguistic plague". ("העניין הוא ש…" alone is fine.)
https://www.ruvik.co.il/הטור-השבועי/1999/02071999.aspx
Reliability: high.

**C37. "questioned under caution"**
✗ הוא נחקר תחת אזהרה
✓ הוא נחקר באזהרה · חקירה באזהרה
An Academy ruling prescribes נחקר באזהרה; Hebrew Wikipedia's police-investigation article uses חקירה באזהרה and links it.
https://hebrew-academy.org.il/hahlatot/נחקר-באזהרה-חקירה-באזהרה/ (snippet) · https://he.wikipedia.org/wiki/חקירה_משטרתית
Reliability: authoritative, and directly relevant to true crime.

**C38. English-born crime slang**
✗ הוא זימר למשטרה · היא נפלה לסמים · הוא קנה את הסיפור
✓ הוא מסר מידע למשטרה · היא התמכרה לסמים · הוא האמין לסיפור
Rosenthal traces זימר to "sing", נפל לסמים to "fall into drugs", קנה (= believed) to "he bought it": loan translations
living in slang, not errors. ✓ forms are [general knowledge, unsourced].
https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf
Reliability: medium; the reason to avoid them is register (our narrator is not slangy), not correctness.

**C11 extension (English discourse glue).** Add: "…או מה?" closing a question ("just like in English", or what) ·
"ספר לי על זה" said ironically (tell me about it) · "שיחק קשה להשגה" (play hard to get). **R9 strengthened:** Rosenthal
renders "האמת היא ש…" as English "the truth is…". https://www.ruvik.co.il/media/623371/סלנג-ואנגלית-פידיאף.pdf

**S24. "asked whether" (indirect yes/no question)**
✗ השוטר שאל אותה האם היא ראתה משהו?
✓ השוטר שאל אותה אם היא ראתה משהו.
The Academy: האם opens a direct question, אם an indirect one; no question mark after an indirect question.
https://hebrew-academy.org.il/שאלה-עקיפה/ (snippet)
Reliability: authoritative (snippet).

**S25. An abstract action noun as the subject (English/European nominal style)**
✗ החקירה של המשטרה הובילה לגילוי של הגופה
✓ השוטרים חקרו, ובסוף מצאו את הגופה
Rosenthal: English, like German and French, makes abstractions (דגימה, קביעה) the subject; "בעברית זה נשמע רע". Hebrew
puts people doing things at the centre.
https://www.ruvik.co.il/הטור-השבועי/1999/02071999.aspx
Reliability: high; a general principle, apply with judgement.

**S22 strengthened (tense).** ויקיפדיה:לשון ("העבר חלף ואיננו") bans the present for dated past events ("ב־1989 נופלת חומת
ברלין"), and the translation-errors page says translations "tend" to do it ("בשנת 1920 הוא נוסע לפראג").
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://he.wikipedia.org/wiki/ויקיפדיה:שגיאות_תרגום_נפוצות
**Narration note:** this is an encyclopedia rule. The owner approved a narrative present for the scenes (ep01), so it does
not apply to them; it supports S22's narrower target: dated background facts and drift in and out of a tense.

**R18. האם at the head of a spoken question**
✗ האם הוא ידע שהיא בבית?
✓ הוא ידע שהיא בבית?
The Academy: some style editors avoid האם; in speech, and writing that mirrors speech, intonation or a question mark is
enough ("די בהנגנה"); formal writing needs a question word.
https://hebrew-academy.org.il/keyword/הַאִם (snippet)
Reliability: authoritative (snippet), and it separates speech from writing explicitly. **Narration note:** the native
corpus uses האם 83 times (mostly rhetorical questions), so it is not an error; for our cold narrator, prefer the
question without it. **TTS note** [unsourced]: keep the "?" so the voice rises; check by ear that the engine rises without האם.

**R19. ו where ש belongs: מאחר ו / היות ו / ייתכן ו / יש ו; also בכדי** (extends R6)
✗ מאחר והדלת הייתה נעולה · היות והוא לא ענה · ייתכן והיא ראתה אותו · בכדי לבדוק
✓ כי הדלת הייתה נעולה · מאחר שהדלת הייתה נעולה · ייתכן שהיא ראתה אותו · כדי לבדוק
Wikipedia: "יש להקפיד לכתוב 'מאחר ש־' ולא 'מאחר ו־'", and כדי, not בכדי. The Academy: "no place" for the joining ו instead
of the subordinating ש (their functions differ).
https://he.wikipedia.org/wiki/ויקיפדיה:לשון · https://hebrew-academy.org.il/היה-ו־-היות-ש־-היות-ו־-וביטויים-קרובים/ (snippet)
Reliability: high. (10b: Nurit Shai also rejects בכדי, https://www.nurit-shai.com/2025/01/13/למה-להגביה-אם-לא-צריך/)

**R20. "for (years)" as מזה**
✗ היא נעדרת מזה שלוש שנים
✓ היא נעדרת כבר שלוש שנים · זה שלוש שנים
The Academy: language editors reject מזה and keep the inherited זה; the Academy itself has not ruled.
https://hebrew-academy.org.il/זה-זמן-או-מזה-זמן/ (snippet)
Reliability: medium-high (an editors' norm). **Narration note:** מזה is widespread; כבר is the natural spoken fix.

**R21. English redundancy: "appointed to the position of", "born to his parents, X and Y"**
✗ הוא מונה לתפקיד המנהל · היא נולדה להוריה, ג'ון ומרי
✓ הוא מונה למנהל · היא נולדה לג'ון ולמרי
https://he.wikipedia.org/wiki/ויקיפדיה:לשון
Reliability: high; low impact.

**D12 corrected by this pass: quote order and the comma**
The Academy's punctuation rules (via Roni Hafner's site, which cites them) show that **the quote first and the verb after
it is standard written Hebrew, not an English order**: the Academy's own example is Bialik's "מסכן אבא", אמרה לי בצאתנו
משער החצר. In that order the comma goes **after** the closing quote mark (English puts it inside); ?, ! and … stay inside
with no comma after them; a full stop at the end may go inside or outside, consistently. A colon follows the reporting
verb before a quote ("והוא אמר: "אין דבר."").
https://www.safa-ivrit.org/punctuation/quotes.php · https://hebrew-academy.org.il/topic/hahlatot/punctuation/ (snippet)
Reliability: high (secondary site reproducing the Academy's rules). **So D12 stands, narrowed:** the comma inside the
closing quote is an English punctuation error; the order is a rule for the EAR, backed by the corpus (11 of 11 spoken
quotations speaker-first) and ep01, not a grammar rule. A short "הוא אומר" after a short quote is acceptable Hebrew; the
speaker-first order is preferred because a listener cannot see the quote marks.

**N14. Do not "fix" a sentence that opens with ו after a full stop** (protects owner rule N6)
✓ …והדלת נסגרה. ואז היא שמעה צעדים. · ומאז איש לא ראה אותה.
The Academy: many avoid it "as is customary in English", but Hebrew has no such prohibition.
https://hebrew-academy.org.il/ו-החיבור-לאחר-פסיק-ולאחר-נקודה/ (snippet)

**N15. More integrated calques that must not be "corrected"** (add to N10)
קריאת השכמה (a loan of "wake-up call", in the press since 1957) · לתפוס מחסה (legitimate and apt) · לחזור בחזרה (redundant,
but "redundancy is not necessarily an error; it adds emphasis"). Rosenthal also treats חזרה and בחזרה as ordinary adverbs
today, with no English link, so "לחבר אותה בחזרה" is not a calque.
https://www.ruvik.co.il/שאל-את-רוביק/מוצא-הצירופים.aspx?page=31&q=19323 · https://www.ruvik.co.il/שאל-את-רוביק/צירופי-לשון.aspx?page=14&q=26622

**Searched, found nothing authoritative** (so the 10c rules on these stay [corpus] or [general knowledge]): "own"
(של עצמו / משלו / בעצמו) · "named X" (בשם) · "one of the" (only an Academy snippet calling both אחד ה־ and אחד מה־
standard) · "-ly" as באופן / בצורה · להיות מסוגל · במונחים של · במילים שלה · בשבילה / מבחינתה · לעזור לתקן · ממש שם ·
"that's what X does" · "while" as contrast (Wikipedia only offers the written בו בזמן ש) · a Kan / IBA anglicism list
beyond the Almagor-Ramon PDF already used · Avshalom Kor transcripts.

### 10b. Practitioners and translation studies (research pass, 29 Sep 2026)

Access note: the fetch tool could not decode any PDF in this pass, so most academic papers (the Meta 1998 issue on
translation in Israel, Avner/Ordan/Wintner on Hebrew translationese, Ben-Shahar on translated dialogue) were readable only
as abstracts; see SOURCE-LIST.md section D. The summariser also invented anglicism content for two pages (Angora "31
טעויות", Ayelet Tzuri's guide) that a string check showed is not on them, so every example below was checked by exact
string match on the page. Most practitioner rules rest on one post: Nurit Shai's list of about 46 literal translations
from Israeli media, fiction and ads, each with her fix (**NS** below):
https://www.nurit-shai.com/תרגום-מילולי-לעברית/ . The ✗/✓ sentences are mine unless marked NS.

**R22. Spoken words set inside written-only syntax** (academic)
✗ ואז ניגש אליה בחור, אשר חיכה לה בחוץ, ושאל אם הכול בסדר איתה.
✓ ואז בחור שחיכה לה בחוץ ניגש אליה ושאל אם הכול בסדר.
Toury, citing Rina Ben-Shahar's 1983 PhD on dialogue in original and translated Hebrew plays: Hebrew translators
simulated speech by putting spoken words into grammatical and syntactic structures marked as written. So swapping in
colloquial words is not enough; the syntax has to be spoken too (ש not אשר, subject before verb, של). The fix is my
inference. Cross-refs: R1, S6, S20.
https://www.tau.ac.il/~tarbut/Toury/works/GT-Role-Norms.htm (footnote 5)
Reliability: academic (Toury, TAU), a historical description rather than a prescription.

**T14. Exact figures the story does not need**
✗ בחשבון שלו היו שלושים וארבעה אלף מאתיים וחמישה עשר דולר.
✓ בחשבון שלו היו קצת יותר משלושים וארבעה אלף דולר.
A broadcast-writing guide: round numbers off unless the exact number is significant. It also shortens what the TTS
must read (T6).
https://ask.ifas.ufl.edu/publication/WC193
Reliability: medium-high (University of Florida extension guide); English broadcast practice, not Hebrew-specific.

**Sources added to existing rules (no new code):**
- **D12** (10c): the same guide says attribution comes before a quotation, and before a paraphrase, because the listener
  must know who is speaking first. External backing for the speaker-first order.
- **A19** (10c): the same guide puts titles and ages before the name ("Smallville mayor Tom Smith") and keeps one idea
  per sentence, which is A19's fix for "X, a 24-year-old nurse, …".
- **P17** (10c): NS rewrites "זה סיפוק אדיר עבורי ליהנות" so the person is the one affected ("מספק אותי"): the same "for
  X, Y is" frame with עבור. Extending it to narration is my inference.
- **R19** (10a): Nurit Shai also rejects בכדי for כדי (https://www.nurit-shai.com/2025/01/13/למה-להגביה-אם-לא-צריך/).
- **N13** (10c): thoughts; see the bullet added there.

**S26. "while" as בעוד (ש)**
✗ בעוד שהיא ישנה, מישהו פתח את החלון · היא רצתה להישאר, בעוד שהוא רצה לעזוב
✓ כשהיא ישנה, מישהו פתח את החלון · היא רצתה להישאר, אבל הוא רצה לעזוב (או: ואילו הוא)
Nurit Shai: "זהו תרגום מאנגלית של המילה While". Join facts that neither contrast nor concern time with ו, contrasting
facts with a contrast word, and use a time word when time is the point. She also calls במקביל (geometry, not time)
wrong for simultaneous actions, and תוך כדי outdated, citing Abba Bendavid.
https://www.nurit-shai.com/2025/01/29/מולטיטסקינג-ריבוי-משימות-בסיפורת/
Reliability: medium (professional editor's blog). Fills 10a's "while as contrast" gap. **Narration note:** the native
corpus has "תוך כדי שהיא קוראת את הפתק היא מבינה" (S22), so do not flag תוך כדי. "בעוד שעה" (in an hour) is fine.

**S27. English dummy "It was a …" opener**
✗ זה היה לילה קר בינואר, והטלפון צלצל בשתיים.
✓ באותו לילה של ינואר היה קר מאוד, ובשתיים הטלפון צלצל.
NS corrects "זה היה ערב מיוחד" to "הערב היה מיוחד": the noun becomes the subject. Flag only when זה points at nothing
(the English empty "it"); "זה היה" pointing back at something just said is ordinary Hebrew, and "זה מה ש…" is native (N13).
Reliability: medium, with an over-correction risk; the owner's ear decides.

**S28. "not so X as to…" / "all they did was…"**
✗ זה לא היה חמור מספיק כדי לפתוח בחקירה · כל מה שהם עשו זה לחכות
✓ זה לא היה חמור עד כדי כך שיפתחו בחקירה · הם רק חיכו
NS pairs: "לא כל כך חמור כדי לדרוש חקירה" → "עד כדי כך שנדרשת חקירה"; "כל מה שעושים… זה לדבר" → "רק מדברים".
"מספיק כדי" (enough to) is my extension. "כל מה ש…" alone is native (ep01: "שמע כל מה שהם אמרו"); the target is
"כל מה ש… זה + verb".
Reliability: medium.

**V13. "is going to be" as הולך להיות**
✗ (narrator) זה הולך להיות לילה ארוך
✓ זה יהיה לילה ארוך · הלילה עומד להיות ארוך
NS flags הולך להיות in media Hebrew, with יהיה / עומד להיות as fixes. **Narration note** [unsourced]: inside a quoted
speaker's words it is how Israelis talk; fix it only in the narrator's voice (the scanner skips quotes).
Reliability: medium.

**V14. "drove her (somewhere)" as נהג אותה**
✗ אבא שלה נהג אותה לתחנה
✓ אבא שלה הסיע אותה לתחנה
NS pair: "הוא היה נוהג אותו" → "הוא היה מסיע אותו". [general knowledge, unsourced] נהג takes ב for the vehicle (נהג
במכונית) and no person as object.
Reliability: medium-high.

**C39. Surprise idioms: "didn't see it coming", "caught by surprise"**
✗ אף אחד לא ראה את זה מגיע · המעצר תפס אותו בהפתעה
✓ אף אחד לא ציפה לזה · (NS) לא חזיתי את זה · המעצר הפתיע אותו
NS pairs: "לא ראיתי את זה מגיע" → "לא חזיתי את זה"; "תפס אותי בהפתעה" → "הפתיע אותי". לא ציפה לזה is mine.
Reliability: medium.

**C40. "lost it", "crossed the line", "take chances"** (extends C4)
✗ באותו לילה הוא איבד את זה · הפעם הוא חצה את הקו · היא אהבה לקחת סיכונים
✓ באותו לילה הוא איבד שליטה (NS: לא שלט בעצמו, השתגע) · הפעם הוא הגזים / הרחיק לכת · היא אהבה להסתכן
[unsourced] "חצה את הקו האדום" is an established Israeli idiom: do not flag it. "לקחת סיכון" is common speech: review,
not an error.
Reliability: medium.

**C41. "the jury found him guilty" / "the court found that"**
✗ חבר המושבעים מצא אותו אשם · בית המשפט מצא כי הוא זכאי
✓ חבר המושבעים הרשיע אותו · בית המשפט זיכה אותו / פסק שהוא זכאי
NS corrects "בית המשפט מצא כי הנאשם זכאי" to פסק. הרשיע / זיכה are [general knowledge, unsourced]. Frequent in true crime.
Reliability: medium.

**C42. "had a headache" (have + an ache)**
✗ היה לה כאב ראש נוראי כל הערב
✓ כל הערב נורא כאב לה הראש
NS pair: "אם יש לך כאב ראש" → "אם כואב לך הראש". Other aches by analogy (כאבה לו הבטן) is my inference; a chronic
"היו לה כאבי ראש" is fine [unsourced].
Reliability: medium.

**C43. English swearing in quoted speech**
✗ "לעזאזל!" · "הנתונים הארורים" · "סתום את הפאקינג פה"
✓ the narrator reports it (הוא קילל אותה), or quotes what an Israeli would actually say [✓ unsourced]
A Walla column (Ido Yeshayahu, 2024): Israeli TV subtitles clean swearing up into לעזאזל, turn "fucking data" into
"נתונים ארורים", and transliterate "fuck" as פאק / פאקינג; the results distract from the plot.
https://e.walla.co.il/item/3645014
Reliability: low (opinion column), but it names the dubbing-Hebrew forms precisely.

**P18. "face (something)" / "under (someone's) direction"**
✗ היא הייתה חייבת להתמודד מול האמת · החיפושים התנהלו תחת פיקוחו של השריף
✓ היא הייתה חייבת להתמודד עם האמת · החיפושים התנהלו בפיקוחו של השריף
NS pairs: "להתמודד מול סכנות" → "להתמודד עם סכנות"; "תחת הנחייתו של" → "בהנחייתו של". Same family as C15 (תחת
בנייה) and C37 (תחת אזהרה).
Reliability: medium.

**R23. אמר vs הגיד by tense**
✗ הוא הגיד לה שהוא יחזור · היא לא תאמר לאף אחד
✓ הוא אמר לה שהוא יחזור · היא לא תגיד לאף אחד
Yaakov Etzion: spoken Hebrew uses א-מ-ר in the past and present and נ-ג-ד in the future (יגיד, תגיד); מגיד sounds
archaic or like a child who has not yet absorbed the system. (The infinitive להגיד is approved in ep01.)
https://musaf-shabbat.com/2011/09/17/תגיד-לי-או-תאמר-לי-יעקב-עציון-לפרשת-כי-ת/
Reliability: medium (a language column in Makor Rishon's Shabbat supplement, 2011); no second source. Review, not a ban.

**R24. ניתן / מבלי** (בכדי: see R19)
✗ ניתן היה לשמוע צעקות · הוא יצא מבלי לסגור את הדלת
✓ אפשר היה לשמוע צעקות · הוא יצא בלי לסגור את הדלת
Nurit Shai lists ניתן (for אפשר), מבלי and בכדי as artificial raising of register: keep ניתן for its sense "was
given"; many editors prefer the basic בלי.
https://www.nurit-shai.com/2025/01/13/למה-להגביה-אם-לא-צריך/
Reliability: medium; consistent with R5–R7.

**R25. באופן / בצורה + adjective for English "-ly"**
✗ הוא נעלם באופן פתאומי · היא הגיבה בצורה מוזרה מאוד
✓ הוא נעלם פתאום · התגובה שלה הייתה מוזרה
NS corrects "עקבת אחריה באופן מיוחד" to "התמקדת בה אחרת". **Narration note:** N13 counts באופן 26 and בצורה 31 times
in native narration, so they are not errors; flag only where a plain adverb (פתאום, מהר, לאט, אחרת) or a verb exists.
Reliability: low-medium (one example). Fills 10a's "-ly as באופן / בצורה" gap, weakly.

**D14. Speech tags, when the tag follows the quote**
✗ "אני לא יודעת," היא הפטירה בשקט.
✓ "אני לא יודעת", אמרה. (for the ear D12 still prefers: והיא אמרה: "אני לא יודעת.")
Nurit Shai: plain tags like "אמרה רונית" / "שאל דוד" are fine (verb before the name after a quote); showy tags (צעק,
לחש, בכה, זעקה) interrupt; avoid adverbs describing how it was said; no need to name the speaker after every line.
The comma after the closing quote mark is D12 (10a).
https://www.nurit-shai.com/2021/12/02/ככה-מדברים-2/
Reliability: medium (a fiction editor's advice); applies to quoted 911 calls and testimonies.

**Searched, found nothing solid in this pass:** Avner/Ordan/Wintner 2016 (the Hebrew translationese classifier: full text
blocked) · the Meta 43(1) 1998 issue (Ben-Shahar on 180 translated plays, Ben-Ari on avoiding repetition, Kaufmann on
audiovisual translation: abstracts only) · Ilana Shilo's 1992 TAU thesis on dialogue in fiction translated from English
(catalogue record only) · Ben-Ari's chapter "'תרגומית' או עברית של תרגומים" (preview only) · generic "you" vs the
impersonal plural (papers blocked; Hebrew Wikipedia's "גוף (בלשנות)" confirms only that the impersonal is the subjectless
masculine plural, "אומרים") · אחד as "a", בשם, של עצמו, "one of the", בחזרה, "in terms of", backshift drift · Hebrew
radio / Kan / Galei Tzahal writing guides (Bendavid & Shay's radio guide exists only as a book and downloadable exercises)
· Ktuvit / SubsCenter / Qsubs style guides (none; the subtitle material found is about shortening, the opposite of
narration's needs).

### 10c. Measured in native narration, or caught on this project (no external source)

Evidence here is the 22-video native corpus (`NATIVE-NARRATION-PATTERNS.md`, 53,700 words of Hebrew YouTube
narration), the owner-approved ep01 v5.6, and catches by the owner or the fresh-context reviewer. **[corpus]** = a
count from the native corpus; **[owner]** / **[reviewer]** = caught on ep01. Not an external authority: treat as strong
hypotheses for the owner's ear.

**D12. "'X,' he said" (quote first, then the speaker), read aloud**
✗ "אני החבר הכי טוב שלך," הוא אומר.
✓ והוא אומר לה: "אני החבר הכי טוב שלך."
Two parts, with different backing (see D12 in 10a): the comma **inside** the closing quote is English punctuation
(Academy rules: in quote-first order the comma goes after the quote mark). The **order** is not a grammar error: written
Hebrew allows the quote first ("מסכן אבא", אמרה לי). It is a rule for the ear: [corpus] all 11 spoken quotations are
speaker-first ("הוא שאל, "…""), and ep01 (approved) always does this, because a listener cannot see quote marks and
the TTS voice seems to say the words itself until the speaker comes.
External backing (added in 10b): broadcast writing puts the attribution before the quote so the listener knows who is
speaking first. https://ask.ifas.ufl.edu/publication/WC193 (medium-high; English broadcast practice)

**D13. A testimony quote with no speaker**
✗ (after narration) "ראיתי את הסרטון, והלב שלי פשוט…"
✓ אחר כך אשלי אמרה: "ראיתי את הסרטון, והלב שלי פשוט…"
English video scripts cut to an interview clip; read aloud, a bare first-person quote is heard as the narrator's "I".
A character's bare inner words inside the scene are fine (ep01: "רק אל תצא. רק אל תצא.").

**A19. "Name, role, age," appositive**
✗ אמא שלו, ג'יימי סאמיט, בת עשרים וארבע · אליסה, הבת שלהם, בת שמונה · תלמיד אחר, ג'ליל חסן, היה בן שבע עשרה
✓ אמא שלו, ג'יימי סאמיט, היא בת עשרים וארבע · הבת שלהם, אליסה, היא בת שמונה · גבר בן ארבעים ושבע נכנס…
[corpus] zero "X, Y, בן/בת N," appositives in 53,700 words; natives put the age on the noun ("גבר בן 47 נכנס לסניף")
or in its own clause. ep01 (approved): "קוראים לו בנימין בוקור, הוא בן ארבעים", "אמבר הייתה בת עשרים". Watch
"הבת שלהם, בת שמונה": בת twice in two senses.
External backing (added in 10b): broadcast writing puts titles and ages before the name and keeps one idea per
sentence. https://ask.ifas.ufl.edu/publication/WC193 (medium-high; English broadcast practice)

**A20. A superlative in the middle of a construct**
✗ חברת האבטחה לבתים הכי גדולה באמריקה
✓ חברת האבטחה הכי גדולה באמריקה · (if "home" matters) הכי גדולה באמריקה באבטחת בתים
English stacks a noun compound ("the largest home security company"); Hebrew puts the superlative after the whole noun
phrase ("חברת התעופה הסודית ביותר בעולם", corpus). [general knowledge, unsourced] for the rule itself.

**S21. "One of the X was Y" / "One of those calls goes to a woman named Y"**
✗ אחת המשפחות שקיבלו את השיחה הזאת הייתה המשפחה של אלקסיה פרדי · אחת השיחות האלה מגיעה לאישה בשם שיינה דוטי
✓ גם המשפחה של אלקסיה פרדי מקבלת את השיחה הזאת · שיינה דוטי מקבלת את אחת השיחות האלה
English opens with the set and ends with the member; Hebrew narration names the person as the subject. ("אחד ה־" and
"אחד מה־" themselves are native: 38 and 24 corpus hits.)

**S22. Tense drift inside a scene**
✗ (a present-tense story) …אחת המשפחות… **הייתה** המשפחה של אלקסיה · (a past sentence) המצלמה שמרה… עד הרגע שאליסה **יוצאת**
✓ …מקבלת · …עד הרגע שאליסה **יצאה**
Hebrew narration may run in the present with past backstory (ep01) or switch to the present at the climax
([corpus] "תוך כדי שהיא קוראת את הפתק היא מבינה…"); what reads as translated is a single English "was" dropping into a
present scene, or a present clause inside a past sentence.

**S23. Possessives on everything; the dative of possession**
✗ הוא מרים את היד שלו ומסתכל בטלפון שלו · הסלע נחת על היד שלו
✓ הוא מרים את היד ומסתכל בטלפון · הסלע נחת לו על היד
[corpus] native median 45 possessives (שלו/שלה/שלהם) per 10,000 words, range 5-131; ep01 (approved) 180, ep02 v1 221.
English must say "his/her"; Hebrew drops it when the owner is obvious, or marks the person with ל: "נחת לו על היד",
and ep01's "גר להם בבית", "התחיל להיעלם לה אוכל". Keep a possessive where it is the point ("בבית שלהם"). The scanner
prints the rate.

**C24. "in her (own) words"**
✗ במילים שלה: "איבדתי את תחושת הביטחון"
✓ היא אמרה אחר כך: "…" · כמו שהיא אומרת: "…"
[corpus] no hit; "זה מילים שלו, לא שלי" (a disclaimer) is the only native use. [general knowledge, unsourced]

**C25. "part of you"**
✗ גם בשינה, חלק ממך ממשיך להקשיב לו
✓ גם כשהם נרדמים, הם שומעים אותו בחצי אוזן
"חלק ממכם" in the corpus means "some of you" (a quantity), which is the Hebrew sense. [general knowledge, unsourced]

**C26. "right there"**
✗ הקול יוצא מהמצלמה, ממש שם, בתוך החדר
✓ הקול יוצא מהמצלמה, בתוך החדר
[corpus] one hit, emphatic ("הם היו שם ממש שם"), not "right there in the room". Review, do not ban.

**C27. "own" / "herself" as של עצמו / היא עצמה**
✗ מחוץ לבית של עצמה [reviewer, ep01] · המצלמה שהיא עצמה התקינה · אחד העובדים של החברה עצמה (as "the company's own")
✓ מחוץ לבית שלהם · המצלמה שהיא התקינה בעצמה · עובד של החברה עצמה (fine as emphasis) / טכנאי של החברה
Native: משלו/משלה (ep01 approved "מנעול משלו", "חדר משלה"), בעצמו (12 corpus hits); "של עצמו" is rare (2).

**C28. "In N years of X" / "for days after"**
✗ בעשר שנים של מקרים כמו זה · במשך ימים אחרי זה
✓ בעשר השנים האחרונות היו עוד הרבה מקרים כאלה, ו… · עוד כמה ימים אחרי זה
[general knowledge, unsourced]

**C29. English device and plan talk, word for word** (rule 20's family, from ep02 v1)
✗ המצלמה עושה הרבה · רוצים דרך לראות את הילדות · הוא לא יותר מזה · הם עושים את זה מהטלפון · והתשובה שחזרה ·
  הזמזום איתם בחדר · כדי לעזור לתקן
✓ יש בה הרבה · רוצים לראות את הבנות · זה כל הסיפור · הם מסובבים אותה מהטלפון · והתשובה הייתה ·
  ברור שהזמזום בא מהמצלמה · כדי לעזור לו
Same test as rule 20: the Hebrew back-translates word for word into the English. [general knowledge, unsourced]

**P17. "For X, Y is…" (sentence-initial בשביל)**
✗ בשביל ג'יימי, המצלמה הזאת היא הדרך לשבת סוף סוף לאכול
✓ מבחינת ג'יימי, … · בזכות המצלמה, ג'יימי יכולה סוף סוף לשבת לאכול
[corpus] "מבחינת־" 5 hits as the viewpoint word; בשביל as "for X, Y is" none. [general knowledge, unsourced]
Practitioner backing (added in 10b): Nurit Shai rewrites "זה סיפוק אדיר עבורי ליהנות" so the person is the one affected
("מספק אותי"), the same frame with עבור. https://www.nurit-shai.com/תרגום-מילולי-לעברית/ (medium; one example)

**R17. Written ש־ב chains ("that is in", "which lies in")**
✗ פוקואוקה שבדרום יפן [reviewer, ep01] · התחבר למצלמה שבבית שלה · על המסך הקטן שביד שלה
✓ פוקואוקה, בדרום יפן · התחבר למצלמה בבית שלה · על המסך הקטן בטלפון שהיא מחזיקה
ש + ב + a place, then a possessive, is a written relative chain. Short ones are fine and approved ("לטלפון שעל
הקיר", "בבוידעם שמעל הארון").

**T13. Words that sound two ways in an American story**
✗ ואחות בשם אשלי (nurse or sister?) · וכשנואה הולך לישון היום (today or nowadays?) · אליסה, הבת שלהם, בת שמונה
✓ אשלי, אחות בבית חולים, … · היום, כשנואה הולך לישון, … · הבת שלהם, אליסה, היא בת שמונה
Also two feminine nouns in play (a woman and a כתובת / מצלמה / חברה): ✗ היא קוראת אותה. היא לא שלה. ✓ היא קוראת את
הכתובת. זאת לא הכתובת שלה. The listener cannot see the gender of a thing. (Extends T1, and S12's pronoun rule.)

**N13. Native forms the corpus and ep01 show are fine (do not "fix")**
- "X בשם Y": 14 corpus hits ("פסיכולוג בשם…", "חוקר הולנדי בשם…"); ep01 "אישה בשם טרייסי".
- "אחד ה־" and "אחד מה־": both native.
- "זה מה ש…" / "זה מה שקרה להם" (ep01) / "כי זה מה שעושים עם פרי" (corpus).
- A duration at the head: "במשך 150 שנה של חפירת מאובנים, מדענים לא מצאו…" (corpus). S3 is an encyclopedia rule.
- A place appositive: "בהאפי ואלי, פרבר שקט באורגון, בארצות הברית" (ep01).
- A thought tag in the middle: "…, היא אמרה לעצמה, …", "…, היא חשבה, …" (ep01).
- Inner words in quote marks ("רק אל תצא. רק אל תצא.", ep01). Nurit Shai's fiction advice (no quote marks for thoughts,
  keep them in third person past, tag them sparingly; https://nurit-shai.com/2023/11/09/מה-עובר-לו-בראש) is for written
  fiction; the owner-approved ep01 wins (N1). Do not "fix". (Added in 10b.)
- "מהסוג ש…", "מהאנשים האלה ש…", "מהמקומות האלה ש…" (ep01) for "the kind of X that".
- "N אחרי זה / לאחר מכן" occurs in native speech ("כמה שנים לאחר מכן"): C13 is a preference, not an error.
- "בחזרה" as an adverb ("לחבר אותה בחזרה", "הסתובבה בחזרה") is ordinary Hebrew (Rosenthal, N15): not a calque of "back".
- "אחד את השני" / "אחד לשני" (ep01 approved): the Academy's C34 preference for זה את זה is for careful writing.
- האם, באופן, בצורה are all frequent in native YouTube narration (83, 26, 31 hits): a ban on them is a written-register
  rule. For our narrator: prefer the question without האם, and a plain adverb where one exists.

---

## Rule count

| Section | Rules |
|---|---|
| 1. Calques and anglicisms (C) | 23 |
| 2. Prepositions (P) | 16 |
| 3. Syntax and word order (S) | 20 |
| 4. בניינים and verb choice (V) | 12 |
| 5. Agreement and numerals (A) | 18 |
| 6. Register (R) | 16 |
| 7. Punctuation and rhythm (D) | 11 |
| 8. Text-to-speech (T) | 12 |
| 9. Do not over-correct (N) | 12 |
| 10a. English-draft interference, authoritative sources (29 Sep 2026) | 17 (C30-C38, S24, S25, R18-R21, N14, N15) |
| 10b. English-draft interference, practitioners + translation studies (29 Sep 2026) | 17 (C39-C43, P18, S26-S28, V13, V14, R22-R25, D14, T14) |
| 10c. English-draft interference, corpus + project evidence (29 Sep 2026) | 17 (16 rules + N13) |
| **Total** | **191** |

Unsourced or owner-only content is marked in place. Rules resting on one secondary source: C14 (Porat via a student
paper), V9 and V10 (page excerpts only), V11 (dictionary snippet).
Section 10a also extends C4, C11, R9, S22 and D12 without new codes. Its Academy items (C34, C37, S24, R18, R20, N14)
rest on search-result snippets: hebrew-academy.org.il returned HTTP 403 to every fetch on 29 Sep 2026. D12's punctuation
rests on Roni Hafner's site reproducing the Academy's rules.
Section 10b also adds sources to D12, A19, P17, R19 and N13 without new codes. Ten of its rules rest on one
practitioner post (Nurit Shai's list) and three on other posts of hers (S26, R24, D14); only R22 is academic; T14 and the
D12/A19 backing come from an English broadcast guide; R23 and C43 rest on press columns.
