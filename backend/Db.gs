/* ============================================================
   Db.gs — Sheet read/write helpers
   ============================================================ */

function getSpreadsheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID);
}

function getSheet(name) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error('Sheet not found: ' + name);
  return sheet;
}

function getHeaders(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
}

function getAll(sheetName) {
  var sheet = getSheet(sheetName);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  var headers = getHeaders(sheet);
  var data = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  return data.map(function(row) {
    var obj = {};
    headers.forEach(function(h, i) { obj[h] = row[i]; });
    return obj;
  });
}

function getById(sheetName, id) {
  var sheet = getSheet(sheetName);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  var headers = getHeaders(sheet);
  var idCol = headers.indexOf('id');
  if (idCol === -1) return null;
  var data = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  for (var i = 0; i < data.length; i++) {
    if (String(data[i][idCol]) === String(id)) {
      var obj = {};
      headers.forEach(function(h, j) { obj[h] = data[i][j]; });
      return obj;
    }
  }
  return null;
}

function insertRow(sheetName, obj) {
  var sheet = getSheet(sheetName);
  var headers = getHeaders(sheet);
  var row = headers.map(function(h) { return obj[h] !== undefined ? obj[h] : ''; });
  sheet.appendRow(row);
  return obj;
}

function updateById(sheetName, id, patch) {
  var sheet = getSheet(sheetName);
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) throw new Error('No data in ' + sheetName);
  var headers = getHeaders(sheet);
  var idCol = headers.indexOf('id');
  if (idCol === -1) throw new Error('No id column in ' + sheetName);
  var data = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
  for (var i = 0; i < data.length; i++) {
    if (String(data[i][idCol]) === String(id)) {
      var rowNum = i + 2;
      for (var key in patch) {
        var colIdx = headers.indexOf(key);
        if (colIdx !== -1) {
          sheet.getRange(rowNum, colIdx + 1).setValue(patch[key]);
        }
      }
      return true;
    }
  }
  throw new Error('Row not found: ' + id);
}

function getConfig(key) {
  var sheet = getSheet('Config');
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  var data = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  for (var i = 0; i < data.length; i++) {
    if (String(data[i][0]) === String(key)) return String(data[i][1]);
  }
  return null;
}

function getAllConfig() {
  var sheet = getSheet('Config');
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return {};
  var data = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
  var config = {};
  data.forEach(function(row) { config[String(row[0])] = String(row[1]); });
  return config;
}

function nanoId(prefix) {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var id = '';
  for (var i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return (prefix || '') + id;
}
