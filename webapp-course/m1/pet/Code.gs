/* החיה שלי: השרת.
   הדף מבקש מהשרת שני דברים: לקרוא את החיה (getPet), או להוסיף מספר לאחת השורות שלה (add).
   רק השרת קורא וכותב בגיליון. הלשונית pet היא החיה, והלשונית log היא כל מי שביקר. */

const PET = 'pet';   // החיה: כל שורה היא דבר אחד שהיא זוכרת (שם השורה, הערך, והכי הרבה שמותר)
const LOG = 'log';   // כל ביקור: מתי, מי, ובאיזו שורה הוא נגע

/* פותח את הדף. רץ בכל פעם שמישהו פותח את הקישור של האפליקציה.
   הדף בנוי משלושה קבצים: Index (המסגרת), Engine (החיבור לשרת) ו-Pet (החיה עצמה). */
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('החיה שלי')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/* מכניס קובץ אחד לתוך הדף. */
function include(name) {
  return HtmlService.createHtmlOutputFromFile(name).getContent();
}

/* בונה את שתי הלשוניות, אם הן חסרות. בעותק מהתבנית הן כבר קיימות. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let pet = ss.getSheetByName(PET);
  if (!pet) {
    pet = ss.insertSheet(PET);
    pet.getRange(1, 1, 1, 3).setValues([['key', 'value', 'max']]).setFontWeight('bold');
    pet.getRange(2, 1, 2, 3).setValues([['name', 'ביצה', ''], ['full', 50, 100]]);
    pet.setFrozenRows(1);
  }
  let log = ss.getSheetByName(LOG);
  if (!log) {
    log = ss.insertSheet(LOG);
    log.getRange(1, 1, 1, 4).setValues([['time', 'who', 'key', 'amount']]).setFontWeight('bold');
    log.setFrozenRows(1);
  }
  return 'ok';
}

function petSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(PET) || (setup(), ss.getSheetByName(PET));
}

/* הדף מבקש: "מה מצב החיה?" השרת קורא את כל השורות מהגיליון ומחזיר אותן. */
function getPet() {
  const rows = petSheet_().getDataRange().getValues().slice(1);
  const pet = {};
  // תאריך הופכים לטקסט: השרת לא יכול לשלוח לדף אובייקט של תאריך
  rows.forEach(r => { if (r[0] !== '') pet[r[0]] = r[1] instanceof Date ? r[1].toISOString() : r[1]; });
  const log = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LOG);
  const n = log ? Math.max(log.getLastRow() - 1, 0) : 0;
  const last = n ? log.getRange(Math.max(2, log.getLastRow() - 4), 1, Math.min(5, n), 3).getValues() : [];
  pet.visits = last.reverse().map(r => ({ who: r[1], key: r[2] }));
  return pet;
}

/* הדף מבקש: "תוסיף amount לשורה key". אם אין שורה כזאת, השרת יוצר אותה.
   המספר לא יורד מתחת ל-0, ולא עולה מעל max (אם יש max). */
function add(key, amount, max, who) {
  key = String(key || '').trim().slice(0, 30);
  if (!key) return getPet();
  const sh = petSheet_();
  const keys = sh.getRange(1, 1, sh.getLastRow(), 1).getValues().map(r => String(r[0]));
  let row = keys.indexOf(key) + 1;
  if (!row) { sh.appendRow([key, 0, max === '' || max == null ? '' : Number(max)]); row = sh.getLastRow(); }
  const now = sh.getRange(row, 2, 1, 2).getValues()[0];
  let value = (Number(now[0]) || 0) + (Number(amount) || 0);
  if (now[1] !== '' && !isNaN(Number(now[1]))) value = Math.min(Number(now[1]), value);
  value = Math.max(0, value);
  sh.getRange(row, 2).setValue(value);
  const log = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LOG);
  if (log) log.appendRow([new Date(), String(who || 'אורח').slice(0, 20), key, Number(amount) || 0]);
  return getPet();
}
