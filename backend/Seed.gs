var SHEET_ID = '1noK7HnS4dzqb_iMo54s5wkvlR2ASoSkq6irYVepb2uM';

function setupSheets() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var tabs = {
    'Students': ['id', 'name', 'password', 'coins', 'stars', 'level', 'equipped_items', 'world_id', 'created_at'],
    'Lessons': ['id', 'date', 'topic', 'description', 'created_at'],
    'Ratings': ['id', 'student_id', 'lesson_id', 'emotion_text', 'emotion_score', 'coins_awarded', 'stars_awarded', 'timestamp'],
    'Behaviors': ['id', 'student_id', 'lesson_id', 'type', 'coins_delta', 'stars_delta', 'teacher_note', 'timestamp'],
    'ShopItems': ['id', 'name_he', 'category', 'emoji', 'price_coins', 'required_level', 'layer_z', 'offset_x', 'offset_y'],
    'Inventory': ['id', 'student_id', 'item_id', 'acquired_at'],
    'Config': ['key', 'value']
  };
  for (var name in tabs) {
    var sheet = ss.getSheetByName(name);
    if (!sheet) { sheet = ss.insertSheet(name); }
    sheet.clear();
    var headers = tabs[name];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  Logger.log('All sheets created with headers.');
}

function seedConfig() {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Config');
  if (sheet.getLastRow() > 1) { sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).clear(); }
  var configs = [
    ['teacher_pin', '1234'],
    ['class_name', 'כיתה ז1'],
    ['attendance_points', '10'],
    ['good_behavior_bonus', '5'],
    ['late_penalty', '-3'],
    ['absent_penalty', '0'],
    ['disruption_penalty', '-2'],
    ['stars_per_level', '100'],
    ['max_level', '200']
  ];
  configs.forEach(function(row) { sheet.appendRow(row); });
  Logger.log('Config seeded.');
}

function seedShop() {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('ShopItems');
  if (sheet.getLastRow() > 1) { sheet.getRange(2, 1, sheet.getLastRow() - 1, 9).clear(); }
  var items = [
    ['hat_cap',        'כובע מצחייה 🧢', 'hat',        '🧢', 30,  1, 30, 0, -20],
    ['flower_pink',    'פרח ורוד 🌸',     'accessory',  '🌸', 25,  1, 20, 15, -5],
    ['glasses_sun',    'משקפי שמש 🕶️',   'glasses',    '🕶️', 40,  2, 25, 0, 5],
    ['hat_top',        'מגבעת 🎩',        'hat',        '🎩', 50,  2, 30, 0, -22],
    ['bow_red',        'פפיון 🎀',        'accessory',  '🎀', 35,  2, 22, 0, -8],
    ['mushroom_buddy', 'חבר פטרייה 🍄',   'accessory',  '🍄', 100, 3, 15, 20, 10],
    ['hat_crown',      'כתר 👑',          'hat',        '👑', 200, 5, 35, 0, -25],
    ['bg_stars',       'רקע כוכבים ✨',    'background', '✨',  150, 4, 0,  0, 0]
  ];
  items.forEach(function(row) { sheet.appendRow(row); });
  Logger.log('Shop items seeded (' + items.length + ' items).');
}

function seedRoster() {
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Students');
  if (sheet.getLastRow() > 1) { sheet.getRange(2, 1, sheet.getLastRow() - 1, 9).clear(); }
  var now = new Date().toISOString();
  for (var i = 1; i <= 30; i++) {
    var id = 's_' + Math.random().toString(36).substring(2, 10);
    var pin = String(1000 + i);
    sheet.appendRow([id, 'תלמיד ' + i, pin, 0, 0, 1, '[]', 'meadow', now]);
  }
  Logger.log('Roster seeded with 30 students.');
}

function seedAll() {
  setupSheets();
  seedConfig();
  seedShop();
  seedRoster();
  Logger.log('=== All seed data complete! ===');
}
