/* ============================================================
   Code.gs — REST API only (no HTML serving)
   Frontend is hosted separately on a web server.
   ============================================================ */

// ---- CHANGE THIS to your Google Sheet ID ----
var SPREADSHEET_ID = '1noK7HnS4dzqb_iMo54s5wkvlR2ASoSkq6irYVepb2uM';

// ---- doGet: health check ----
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, message: 'ClassPet API running' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---- doPost: JSON action router ----
function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var action = payload.action;
    var data = payload.data || {};
    var result;

    // Read-only actions — no lock needed
    switch (action) {
      case 'getRoster':
        return jsonOk(getRoster());
      case 'loginStudent':
        return jsonOk(loginStudent(data.student_id, data.password));
      case 'getStudentState':
        return jsonOk(getStudentState(data.student_id));
      case 'getOpenLessons':
        return jsonOk(getOpenLessons(data.student_id));
      case 'getShop':
        return jsonOk(getShopAction(data.student_id));
      case 'loginTeacher':
        return jsonOk(loginTeacherAction(data.pin));
      case 'getClassDashboard':
        return jsonOk(getClassDashboard(data.token));
      case 'getStudentDetail':
        return jsonOk(getStudentDetailAction(data.token, data.student_id));
    }

    // Write actions — need lock
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) {
      return jsonError('Server busy, try again');
    }
    try {
      switch (action) {
        case 'submitRating':
          result = submitRatingAction(data.student_id, data.lesson_id, data.emotions);
          break;
        case 'buyItem':
          result = buyItemAction(data.student_id, data.item_id);
          break;
        case 'equipItem':
          result = equipItemAction(data.student_id, data.item_id, data.equipped);
          break;
        case 'createLesson':
          result = createLessonAction(data.token, data.topic, data.description, data.date);
          break;
        case 'addBehavior':
          result = addBehaviorAction(data.token, data.student_id, data.lesson_id, data.type, data.note);
          break;
        default:
          return jsonError('Unknown action: ' + action);
      }
    } finally {
      lock.releaseLock();
    }
    return jsonOk(result);
  } catch (err) {
    return jsonError(err.message || String(err));
  }
}

function jsonOk(result) {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, result: result }))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonError(message) {
  return ContentService.createTextOutput(JSON.stringify({ ok: false, error: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
// Action implementations
// ============================================================

function getRoster() {
  var students = getAll('Students');
  return students.map(function(s) { return { id: s.id, name: s.name }; });
}

function loginStudent(studentId, password) {
  var student = getById('Students', studentId);
  if (!student) throw new Error('Student not found');
  if (String(student.password) !== String(password)) throw new Error('Wrong password');
  return buildStudentState(student);
}

function getStudentState(studentId) {
  var student = getById('Students', studentId);
  if (!student) throw new Error('Student not found');
  return buildStudentState(student);
}

function buildStudentState(student) {
  var inventory = getAll('Inventory').filter(function(inv) { return inv.student_id === student.id; });
  var ratings = getAll('Ratings').filter(function(r) { return r.student_id === student.id; });
  var config = getAllConfig();
  var level = calcLevel(parseInt(student.stars) || 0, parseInt(config.stars_per_level) || 100, parseInt(config.max_level) || 200);
  return {
    id: student.id,
    name: student.name,
    coins: parseInt(student.coins) || 0,
    stars: parseInt(student.stars) || 0,
    level: level,
    equipped_items: safeJsonParse(student.equipped_items, []),
    world_id: student.world_id || 'meadow',
    inventory: inventory.map(function(inv) { return inv.item_id; }),
    ratings_count: ratings.length
  };
}

function getOpenLessons(studentId) {
  verifyStudent(studentId);
  var lessons = getAll('Lessons');
  var ratings = getAll('Ratings').filter(function(r) { return r.student_id === studentId; });
  var ratedLessonIds = {};
  ratings.forEach(function(r) { ratedLessonIds[r.lesson_id] = true; });

  var cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 3);
  var cutoffStr = formatDate(cutoff);

  return lessons.filter(function(l) {
    return !ratedLessonIds[l.id] && l.date >= cutoffStr;
  }).map(function(l) {
    return { id: l.id, date: l.date, topic: l.topic, description: l.description || '' };
  });
}

function submitRatingAction(studentId, lessonId, emotions) {
  verifyStudent(studentId);
  var lesson = getById('Lessons', lessonId);
  if (!lesson) throw new Error('Lesson not found');

  var existing = getAll('Ratings').filter(function(r) {
    return r.student_id === studentId && r.lesson_id === lessonId;
  });
  if (existing.length > 0) throw new Error('Already rated this lesson');

  var catalog = getEmotionCatalog();
  var totalCoins = 0;
  var totalStars = 0;

  emotions.forEach(function(emotionText) {
    var emo = catalog[emotionText];
    if (!emo) return;
    var coinsAwarded = Math.max(0, emo.score) > 0 ? emo.score : 0;
    var starsAwarded = coinsAwarded;
    insertRow('Ratings', {
      id: nanoId('r_'),
      student_id: studentId,
      lesson_id: lessonId,
      emotion_text: emotionText,
      emotion_score: emo.score,
      coins_awarded: coinsAwarded,
      stars_awarded: starsAwarded,
      timestamp: new Date().toISOString()
    });
    totalCoins += coinsAwarded;
    totalStars += starsAwarded;
  });

  var student = getById('Students', studentId);
  var newCoins = Math.max(0, (parseInt(student.coins) || 0) + totalCoins);
  var newStars = (parseInt(student.stars) || 0) + Math.max(0, totalStars);
  var config = getAllConfig();
  var newLevel = calcLevel(newStars, parseInt(config.stars_per_level) || 100, parseInt(config.max_level) || 200);
  updateById('Students', studentId, { coins: newCoins, stars: newStars, level: newLevel });

  student.coins = newCoins;
  student.stars = newStars;
  student.level = newLevel;
  return buildStudentState(student);
}

function getShopAction(studentId) {
  var student = getById('Students', studentId);
  if (!student) throw new Error('Student not found');
  var items = getAll('ShopItems');
  var inventory = getAll('Inventory').filter(function(inv) { return inv.student_id === studentId; });
  var ownedIds = {};
  inventory.forEach(function(inv) { ownedIds[inv.item_id] = true; });

  var coins = parseInt(student.coins) || 0;
  var config = getAllConfig();
  var level = calcLevel(parseInt(student.stars) || 0, parseInt(config.stars_per_level) || 100, parseInt(config.max_level) || 200);

  return items.map(function(item) {
    var price = parseInt(item.price_coins) || 0;
    var reqLevel = parseInt(item.required_level) || 1;
    return {
      id: item.id, name_he: item.name_he, category: item.category, emoji: item.emoji,
      price_coins: price, required_level: reqLevel,
      layer_z: parseInt(item.layer_z) || 0, offset_x: parseInt(item.offset_x) || 0, offset_y: parseInt(item.offset_y) || 0,
      owned: !!ownedIds[item.id], affordable: coins >= price, level_ok: level >= reqLevel
    };
  });
}

function buyItemAction(studentId, itemId) {
  var student = getById('Students', studentId);
  if (!student) throw new Error('Student not found');
  var item = getById('ShopItems', itemId);
  if (!item) throw new Error('Item not found');

  var inventory = getAll('Inventory').filter(function(inv) {
    return inv.student_id === studentId && inv.item_id === itemId;
  });
  if (inventory.length > 0) throw new Error('Already owned');

  var coins = parseInt(student.coins) || 0;
  var price = parseInt(item.price_coins) || 0;
  var config = getAllConfig();
  var level = calcLevel(parseInt(student.stars) || 0, parseInt(config.stars_per_level) || 100, parseInt(config.max_level) || 200);
  var reqLevel = parseInt(item.required_level) || 1;

  if (level < reqLevel) throw new Error('Level too low');
  if (coins < price) throw new Error('Not enough coins');

  insertRow('Inventory', {
    id: nanoId('inv_'), student_id: studentId, item_id: itemId, acquired_at: new Date().toISOString()
  });

  var equipped = safeJsonParse(student.equipped_items, []);
  equipped.push(itemId);
  var newCoins = coins - price;
  updateById('Students', studentId, { coins: newCoins, equipped_items: JSON.stringify(equipped) });

  student.coins = newCoins;
  student.equipped_items = JSON.stringify(equipped);
  return buildStudentState(student);
}

function equipItemAction(studentId, itemId, equipped) {
  var student = getById('Students', studentId);
  if (!student) throw new Error('Student not found');

  var inv = getAll('Inventory').filter(function(i) {
    return i.student_id === studentId && i.item_id === itemId;
  });
  if (inv.length === 0) throw new Error('Item not owned');

  var equippedArr = safeJsonParse(student.equipped_items, []);
  if (equipped) {
    if (equippedArr.indexOf(itemId) === -1) equippedArr.push(itemId);
  } else {
    equippedArr = equippedArr.filter(function(id) { return id !== itemId; });
  }

  updateById('Students', studentId, { equipped_items: JSON.stringify(equippedArr) });
  student.equipped_items = JSON.stringify(equippedArr);
  return buildStudentState(student);
}

function loginTeacherAction(pin) {
  var config = getAllConfig();
  if (String(pin) !== String(config.teacher_pin)) throw new Error('Wrong PIN');
  var token = createTeacherSession();
  return { ok: true, token: token };
}

function getClassDashboard(token) {
  verifyTeacherToken(token);
  var students = getAll('Students');
  var lessons = getAll('Lessons');
  var behaviors = getAll('Behaviors');
  var config = getAllConfig();

  var today = formatDate(new Date());
  var todayLessons = lessons.filter(function(l) { return l.date === today; });
  var recentBehaviors = behaviors.slice(-50);

  var roster = students.map(function(s) {
    var level = calcLevel(parseInt(s.stars) || 0, parseInt(config.stars_per_level) || 100, parseInt(config.max_level) || 200);
    var todayBeh = behaviors.filter(function(b) {
      return b.student_id === s.id && b.timestamp && b.timestamp.substring(0, 10) === today;
    });
    var attendanceStatus = 'none';
    todayBeh.forEach(function(b) {
      if (b.type === 'attendance') attendanceStatus = 'present';
      if (b.type === 'late') attendanceStatus = 'late';
      if (b.type === 'absent') attendanceStatus = 'absent';
    });
    return { id: s.id, name: s.name, coins: parseInt(s.coins) || 0, stars: parseInt(s.stars) || 0, level: level, attendance: attendanceStatus };
  });

  return {
    roster: roster,
    todayLessons: todayLessons.map(function(l) { return { id: l.id, topic: l.topic, date: l.date }; }),
    allLessons: lessons.slice(-20).reverse().map(function(l) { return { id: l.id, topic: l.topic, date: l.date }; }),
    recentActivity: recentBehaviors.reverse().map(function(b) {
      var studentName = '';
      students.forEach(function(s) { if (s.id === b.student_id) studentName = s.name; });
      return { student_name: studentName, type: b.type, coins_delta: b.coins_delta, note: b.teacher_note || '', timestamp: b.timestamp };
    })
  };
}

function createLessonAction(token, topic, description, date) {
  verifyTeacherToken(token);
  if (!topic) throw new Error('Topic required');
  var lessonId = nanoId('l_');
  insertRow('Lessons', { id: lessonId, date: date || formatDate(new Date()), topic: topic, description: description || '', created_at: new Date().toISOString() });
  return { lesson_id: lessonId };
}

function addBehaviorAction(token, studentId, lessonId, type, note) {
  verifyTeacherToken(token);
  var student = getById('Students', studentId);
  if (!student) throw new Error('Student not found');

  var config = getAllConfig();
  var deltas = getBehaviorDeltas(type, config);

  insertRow('Behaviors', {
    id: nanoId('b_'), student_id: studentId, lesson_id: lessonId || '', type: type,
    coins_delta: deltas.coins, stars_delta: deltas.stars, teacher_note: note || '', timestamp: new Date().toISOString()
  });

  var newCoins = Math.max(0, (parseInt(student.coins) || 0) + deltas.coins);
  var newStars = (parseInt(student.stars) || 0) + Math.max(0, deltas.stars);
  var newLevel = calcLevel(newStars, parseInt(config.stars_per_level) || 100, parseInt(config.max_level) || 200);
  updateById('Students', studentId, { coins: newCoins, stars: newStars, level: newLevel });

  return { id: student.id, name: student.name, coins: newCoins, stars: newStars, level: newLevel };
}

function getStudentDetailAction(token, studentId) {
  verifyTeacherToken(token);
  var student = getById('Students', studentId);
  if (!student) throw new Error('Student not found');

  var ratings = getAll('Ratings').filter(function(r) { return r.student_id === studentId; });
  var behaviors = getAll('Behaviors').filter(function(b) { return b.student_id === studentId; });
  var lessons = getAll('Lessons');
  var lessonMap = {};
  lessons.forEach(function(l) { lessonMap[l.id] = l.topic; });
  var config = getAllConfig();

  return {
    student: { id: student.id, name: student.name, coins: parseInt(student.coins) || 0, stars: parseInt(student.stars) || 0,
      level: calcLevel(parseInt(student.stars) || 0, parseInt(config.stars_per_level) || 100, parseInt(config.max_level) || 200) },
    ratings: ratings.map(function(r) {
      return { lesson_topic: lessonMap[r.lesson_id] || '', emotion_text: r.emotion_text, emotion_score: r.emotion_score, timestamp: r.timestamp };
    }),
    behaviors: behaviors.map(function(b) {
      return { type: b.type, coins_delta: b.coins_delta, stars_delta: b.stars_delta, note: b.teacher_note || '', lesson_topic: lessonMap[b.lesson_id] || '', timestamp: b.timestamp };
    })
  };
}

// ---- Helpers ----
function safeJsonParse(str, fallback) {
  try { return JSON.parse(str); } catch(e) { return fallback; }
}

function formatDate(d) {
  var y = d.getFullYear();
  var m = ('0' + (d.getMonth() + 1)).slice(-2);
  var day = ('0' + d.getDate()).slice(-2);
  return y + '-' + m + '-' + day;
}

function getEmotionCatalog() {
  return {
    '\u05D4\u05E4\u05EA\u05D9\u05E2 \u05D0\u05D5\u05EA\u05D9 \u{1F92F}': { score: 2 },
    '\u05D2\u05D9\u05DC\u05D9\u05EA\u05D9 \u05DE\u05DC\u05D0 \u{1F4A1}': { score: 1 },
    '\u05E8\u05D5\u05E6\u05D4 \u05E2\u05D5\u05D3 \u2728': { score: 2 },
    '\u05E0\u05D4\u05E0\u05D9\u05EA\u05D9 \u05D1\u05D8\u05D9\u05E8\u05D5\u05E3 \u{1F929}': { score: 2 },
    '\u05D4\u05DC\u05DB\u05EA\u05D9 \u05DC\u05D0\u05D9\u05D1\u05D5\u05D3 \u{1F635}': { score: -1 },
    '\u05D4\u05D9\u05D4 \u05E8\u05D2\u05D9\u05DC \u{1F610}': { score: 0 },
    '\u05D4\u05D9\u05D4 \u05E7\u05E9\u05D4 \u{1F975}': { score: -1 },
    '\u05E9\u05E2\u05DE\u05DD \u05D0\u05D5\u05EA\u05D9 \u{1F971}': { score: -2 }
  };
}

function getBehaviorDeltas(type, config) {
  switch (type) {
    case 'attendance': return { coins: parseInt(config.attendance_points) || 10, stars: parseInt(config.attendance_points) || 10 };
    case 'good_behavior': return { coins: parseInt(config.good_behavior_bonus) || 5, stars: parseInt(config.good_behavior_bonus) || 5 };
    case 'late': return { coins: parseInt(config.late_penalty) || -3, stars: parseInt(config.late_penalty) || -3 };
    case 'absent': return { coins: parseInt(config.absent_penalty) || 0, stars: parseInt(config.absent_penalty) || 0 };
    case 'disruption': return { coins: parseInt(config.disruption_penalty) || -2, stars: parseInt(config.disruption_penalty) || -2 };
    default: return { coins: 0, stars: 0 };
  }
}
