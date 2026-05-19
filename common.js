/* ============================================================
   common.js — Shared JS utilities (audio, session, API, toast)
   ============================================================ */

// ---- CHANGE THIS to your deployed Apps Script Web App URL ----
var API_URL = 'https://script.google.com/macros/s/AKfycbyFnliSnz8n1ZZs2L_4kg7w34aH-2rLE81He-7iaP-g3XPORl5vbGPaIUw88G0M9b4/exec';

// ---- Audio ----
var AudioCtx = window.AudioContext || window.webkitAudioContext;
var audioCtx;

function initAudio() {
  if (!audioCtx) audioCtx = new AudioCtx();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playTone(freq, type, duration, vol) {
  if (!audioCtx) return;
  vol = vol || 0.05;
  var osc = audioCtx.createOscillator();
  var gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(); osc.stop(audioCtx.currentTime + duration);
}

function vibe(ms) { if (navigator.vibrate) navigator.vibrate(ms); }
function sfxClick() { initAudio(); playTone(600, 'square', 0.1); vibe(15); }
function sfxSelect() { initAudio(); playTone(900, 'square', 0.15); vibe([20, 30, 20]); }
function sfxSuccess() {
  initAudio(); playTone(400, 'square', 0.1);
  setTimeout(function() { playTone(600, 'square', 0.1); }, 100);
  setTimeout(function() { playTone(800, 'square', 0.3); }, 200);
  vibe([30, 50, 30, 50, 100]);
}
function sfxError() { initAudio(); playTone(200, 'square', 0.3); vibe([50, 30, 50]); }
function sfxCoin() {
  initAudio(); playTone(1200, 'square', 0.08);
  setTimeout(function() { playTone(1500, 'square', 0.12); }, 80);
  vibe(20);
}

// ---- Session helpers ----
function getSession() {
  try { var s = localStorage.getItem('classpet_session'); return s ? JSON.parse(s) : null; }
  catch(e) { return null; }
}
function setSession(data) { localStorage.setItem('classpet_session', JSON.stringify(data)); }
function clearSession() { localStorage.removeItem('classpet_session'); }

function getTeacherToken() {
  try { return localStorage.getItem('classpet_teacher_token') || null; }
  catch(e) { return null; }
}
function setTeacherToken(token) { localStorage.setItem('classpet_teacher_token', token); }
function clearTeacherToken() { localStorage.removeItem('classpet_teacher_token'); }

// ---- API caller (fetch to Apps Script doPost) ----
function api(action, data) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: action, data: data || {} }),
    redirect: 'follow'
  })
  .then(function(res) { return res.json(); })
  .then(function(json) {
    if (json.ok) return json.result;
    throw new Error(json.error || 'Unknown error');
  });
}

// ---- Toast ----
function showToast(msg, isError) {
  var existing = document.querySelector('.toast');
  if (existing) existing.remove();
  var t = document.createElement('div');
  t.className = 'toast' + (isError ? ' error' : '');
  t.textContent = msg;
  document.body.appendChild(t);
  speak(msg);
  setTimeout(function() { t.remove(); }, 2500);
}

// ---- Encouragement strings ----
var encouragements = [
  '\u05D0\u05EA\u05D4 \u05D0\u05DC\u05D5\u05E3!',
  '\u05DB\u05DC \u05D4\u05DB\u05D1\u05D5\u05D3!',
  '\u05D9\u05D5\u05E4\u05D9 \u05E9\u05D0\u05EA\u05D4 \u05E4\u05D4!',
  '\u05DE\u05DE\u05E9\u05D9\u05DB\u05D9\u05DD \u05DC\u05D4\u05EA\u05E7\u05D3\u05DD!',
  '\u05D0\u05E0\u05D9 \u05E9\u05DE\u05D7!',
  '\u05D0\u05D9\u05D6\u05D4 \u05D9\u05D5\u05DD \u05D9\u05E4\u05D4!',
  '\u05DE\u05D7\u05DB\u05D4 \u05DC\u05DA!',
  '\u05D0\u05EA\u05D4 \u05DB\u05D5\u05DB\u05D1 \u05D0\u05DE\u05D9\u05EA\u05D9!',
  '\u05D9\u05E9\u05E9\u05E9!',
  '\u05D0\u05D9\u05D6\u05D5 \u05DB\u05D9\u05E3!',
  '\u05D1\u05D5\u05D0 \u05E0\u05E9\u05D7\u05E7!',
  '\u05D4\u05D7\u05D9\u05D5\u05DA \u05DE\u05EA\u05D7\u05D9\u05DC\u05D4'
];

function randomEncouragement() {
  return encouragements[Math.floor(Math.random() * encouragements.length)];
}

// ---- Text-to-Speech ----
var ttsEnabled = localStorage.getItem('classpet_tts') === 'true';

function speak(text) {
  if (!ttsEnabled || !text) return;
  window.speechSynthesis.cancel();
  var utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'he-IL';
  utter.rate = 0.9;
  utter.pitch = 1.1;
  // Try to find a Hebrew voice
  var voices = window.speechSynthesis.getVoices();
  var heVoice = voices.find(function(v) { return v.lang.indexOf('he') === 0; });
  if (heVoice) utter.voice = heVoice;
  window.speechSynthesis.speak(utter);
}

function toggleTTS() {
  ttsEnabled = !ttsEnabled;
  localStorage.setItem('classpet_tts', ttsEnabled);
  var btn = document.getElementById('ttsToggle');
  if (btn) {
    btn.textContent = ttsEnabled ? '\uD83D\uDD0A' : '\uD83D\uDD07';
    btn.title = ttsEnabled ? '\u05DB\u05D1\u05D4 \u05E7\u05E8\u05D9\u05D0\u05D4 \u05D1\u05E7\u05D5\u05DC' : '\u05D4\u05E4\u05E2\u05DC \u05E7\u05E8\u05D9\u05D0\u05D4 \u05D1\u05E7\u05D5\u05DC';
  }
  if (ttsEnabled) speak('\u05E7\u05E8\u05D9\u05D0\u05D4 \u05D1\u05E7\u05D5\u05DC \u05D4\u05D5\u05E4\u05E2\u05DC\u05D4');
  sfxClick();
}

// Preload voices + init button
if (window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = function() { window.speechSynthesis.getVoices(); };
}
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('ttsToggle');
  if (btn) btn.textContent = ttsEnabled ? '\uD83D\uDD0A' : '\uD83D\uDD07';
});

// ---- HTML escape ----
function escHtml(str) {
  var div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

// ---- Show/hide panel ----
function showPanel(id, show) {
  var el = document.getElementById(id);
  if (el) {
    if (show) el.classList.add('active');
    else el.classList.remove('active');
  }
}
