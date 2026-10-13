# Hebrew that kids read: the checklist (from six audits, 13 Oct 2026)

Use it for every lesson page, game dialog, button and status message, in every course in this repo. The `hebrew`
skill in `.claude/skills/hebrew/` has the full rules; this is the short list of what kept going wrong.

## Before you hand over any Hebrew
1. Write it from the meaning, not from an English sentence.
2. Run `python .claude/skills/hebrew/scan.py <file>`.
3. Export every Hebrew line as a numbered list and run **two fresh audits, one after the other** (a new agent each
   time, with no memory of writing the text). The second one reads the fixed text and also looks for faults the fixes
   made. Give them different roles: a teacher reading aloud, a word-for-word back-translation test, a child of the
   target age, a language editor. Tell each one which decisions are final.
4. Judge the flags. Fix what is broken; do not rewrite good lines.
5. Say what changed in a few lines. The teacher's ear is the last check.

## The faults that keep coming back
- **"עם" copied from English "with"**: שמרתם עם Ctrl+S · מחוברים עם החשבון · פיתוח עם AI.
  Write: שמרתם (Ctrl+S) · מחוברים לחשבון · כשמפתחים בעזרת AI.
- **Singular masculine to the child**: שחק · אני המעצב · אני בוחר.
  Buttons are infinitives (לשחק, להמשיך, לסגור). Instructions are plural present (לוחצים, פותחים). A message the kid
  sends to the AI must work for a girl too (העיצוב עליי, והקוד עליך · אני אבחר).
- **Words with two readings** (no vowels): שם · שבעה · למה · סופרים · חיבור · שעה ביום.
  Reword, or add את or a noun: מקלידים 40 במקום המספר · השובע שלה · סופרים את בעלי החיים · החיבור למשחק נותק.
- **One thing, two names**: שומרים for Ctrl+S and also for a backup copy · מרעננים את הקישור / את הדף ·
  אפשרויות / הצעות / רעיונות. Pick one word for each thing and keep it everywhere.
- **English structure**: הכפתור בא ממה שהיא רוצה · חמש דקות של מאבק · 3 דרכים שזה יכול להיראות · הזמן ביום.
  Write: את הכפתור בוחרים לפי מה שהיא רוצה · תקועים על זה כבר חמש דקות? · 3 אפשרויות לאיך זה ייראה · איזו שעה ביום?
- **An instruction that does not say what to look for**, or an error message that does not say what to do next.
  End an experiment with the result to watch ("מה השתנה?"). "לא נבחר שיעור" becomes "קודם בוחרים שיעור".
- **A woman with a masculine title**: ראש המשלחת for נועה. Write ראשת המשלחת.
- **A real person's name in a message.** Write "למורה". This repo is public.
- **Overclaims**: "כל אפליקציה בנויה ככה". Write "כמעט כל".

## Not faults (auditors flag them; keep them)
מתחיל מהתחלה · "יאללה" on a button · short plural-present instruction lines · English names of things that are English
on the screen (Ctrl+S, Apps Script, file names).
