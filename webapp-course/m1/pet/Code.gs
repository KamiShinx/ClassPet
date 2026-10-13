/* החיה שלי: השרת.
   הדף (Index.html) מבקש מהשרת לקרוא את החיה או להאכיל אותה. השרת קורא וכותב בגיליון.
   הגיליון הוא מסד הנתונים: הלשונית pet היא החיה, והלשונית log היא כל מי שביקר. */

const PET = 'pet';   // החיה: כל שורה היא תכונה אחת (שם, ערך, הסבר)
const LOG = 'log';   // כל ביקור: מתי, מי, ומה הוא עשה

/* פותח את הדף. רץ בכל פעם שמישהו פותח את הקישור של האתר. */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('החיה שלי')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/* מריצים פעם אחת מהעורך: בוחרים setup ולוחצים הפעלה. זה בונה את שתי הלשוניות, אם הן חסרות. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let pet = ss.getSheetByName(PET);
  if (!pet) {
    pet = ss.insertSheet(PET);
    pet.getRange(1, 1, 1, 3).setValues([['key', 'value', 'מה זה']]);
    pet.getRange(2, 1, 6, 3).setValues([
      ['name', 'בלובי', 'השם של החיה. אפשר לשנות כאן!'],
      ['full', 50, 'שובע: 0 עד 100'],
      ['joy', 50, 'שמחה: 0 עד 100'],
      ['feeds', 0, 'כמה פעמים האכילו אותה'],
      ['lastBy', '', 'מי ביקר אחרון'],
      ['born', new Date(), 'מתי היא נולדה']
    ]);
    pet.setFrozenRows(1);
    pet.getRange('A1:C1').setFontWeight('bold');
    pet.setColumnWidth(3, 220);
  }
  let log = ss.getSheetByName(LOG);
  if (!log) {
    log = ss.insertSheet(LOG);
    log.getRange(1, 1, 1, 3).setValues([['time', 'who', 'what']]).setFontWeight('bold');
    log.setFrozenRows(1);
  }
  return 'ok';
}

/* קורא את החיה: כל תכונה בעמודה A, והערך שלה בעמודה B. */
function readPet_() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PET) || (setup(), SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PET));
  const rows = sh.getRange(2, 1, Math.max(sh.getLastRow() - 1, 1), 2).getValues();
  const pet = {};
  // תאריך הופכים לטקסט: השרת לא יכול לשלוח לדף אובייקט של תאריך
  rows.forEach(r => { if (r[0]) pet[r[0]] = r[1] instanceof Date ? r[1].toISOString() : r[1]; });
  return pet;
}

/* כותב ערך אחד ליד התכונה שלו. */
function writePet_(key, value) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PET);
  const keys = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().map(r => r[0]);
  const i = keys.indexOf(key);
  if (i >= 0) sh.getRange(i + 2, 2).setValue(value);
  else sh.appendRow([key, value, '']);
}

/* את שלוש הפעולות האלה הדף מבקש מהשרת, דרך google.script.run. */
function getPet() {
  const pet = readPet_();
  const log = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LOG);
  const n = Math.max(log.getLastRow() - 1, 0);
  const last = n ? log.getRange(Math.max(2, log.getLastRow() - 4), 1, Math.min(5, n), 3).getValues() : [];
  pet.visits = last.reverse().map(r => ({ who: r[1], what: r[2] }));
  return pet;
}

function feed(who) {
  const pet = readPet_();
  writePet_('full', Math.min(100, Number(pet.full) + 15));
  writePet_('feeds', Number(pet.feeds) + 1);
  visit_(who, 'האכיל');
  return getPet();
}

function play(who) {
  const pet = readPet_();
  writePet_('joy', Math.min(100, Number(pet.joy) + 15));
  visit_(who, 'שיחק');
  return getPet();
}

/* רושם בלשונית log מי בא ומה הוא עשה. */
function visit_(who, what) {
  const name = String(who || 'אורח').slice(0, 20);
  writePet_('lastBy', name);
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LOG).appendRow([new Date(), name, what]);
}
