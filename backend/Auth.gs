/* ============================================================
   Auth.gs — Student/teacher auth helpers
   ============================================================ */

function verifyStudent(studentId) {
  var student = getById('Students', studentId);
  if (!student) throw new Error('Student not found');
  return student;
}

function createTeacherSession() {
  var token = nanoId('tk_');
  var cache = CacheService.getScriptCache();
  cache.put('teacher_' + token, 'active', 21600); // 6 hours
  return token;
}

function verifyTeacherToken(token) {
  if (!token) throw new Error('No token provided');
  var cache = CacheService.getScriptCache();
  var val = cache.get('teacher_' + token);
  if (!val) throw new Error('Invalid or expired token');
  return true;
}
