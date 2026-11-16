/* Russian help for the kids' page (Ben, 16 Nov: kids who came from Russia and Ukraine). The lessons stay in Hebrew,
   with niqqud (niqqud.js, made by DictaBERT on this PC), and every part of a step gets a Russian line under it.
   Buttons, menus, the studio and the logic blocks are in Russian. Loaded by index.html after en.js.
   Made by setup/make-ru.py from the translations; edit the translations there, not here. */
(function(){
"use strict";
const H = window.HUB, LS = H.LS;
const NIQ = window.HUB_NIQ || {};
const isRu = () => LS.get("lang", "he") === "ru";

/* ---------- buttons, labels, messages: exact Hebrew text -> Russian ---------- */
const D = __D__;
const RX = [
  [/^שלב (\d+) מתוך (\d+)$/, "Шаг $1 из $2"], [/^(\d+) מתוך (\d+) שיעורים$/, "$1 из $2 уроков"],
  [/^→ חזרה לשיעור (\d+)$/, "→ Назад к уроку $1"], [/^(\d+) שלבים$/, "Шагов: $1"], [/^שיעור (\d+)$/, "Урок $1"], [/^שלב (\d+) \/ (\d+)$/, "Шаг $1 / $2"],
  [/^רמז (\d+)$/, "Подсказка $1"], [/^בונים: (.*)$/, k => "Строим: " + (D[k.slice(7)] || k.slice(7))],
  [/^החפץ הזה עוד לא ייכנס למשחק: (.*)$/, k => "Этот предмет пока не попадёт в игру: " + (tr(k.replace(/^החפץ הזה עוד לא ייכנס למשחק: /, "")) || "")],
  [/^בחפץ ״(.*)״ הקוד באנגלית לא תקין.*$/, "У предмета «$1» неправильный код на английском: маленькие буквы, цифры и _, в начале буква."],
  [/^בקובייה ״(.*)״ הקוד באנגלית לא תקין.*$/, "У блока «$1» неправильный код на английском: маленькие буквы, цифры и _, в начале буква."],
  [/^יש שני חפצים עם הקוד (\w+)\. בחפץ ״(.*)״ בוחרים קוד אחר\.$/, "У двух предметов код $1. Выбери другой код для «$2»."],
  [/^כבר יש חפץ או קובייה עם הקוד (\w+)\. בוחרים קוד אחר\.$/, "Уже есть предмет или блок с кодом $1. Выбери другой код."],
  [/^הציור נשמר בשם (.*)\. לוחצים שחק כדי לראות אותו במשחק\.$/, "Рисунок сохранён под именем $1. Нажми «Играть», чтобы увидеть его в игре."],
  [/^יותר מדי ניסיונות\. מחכים (\d+) שניות\.$/, "Слишком много попыток. Подожди $1 сек."],
  [/^יוצאים: (\d+) × (.*)$/, (m, n, x) => "Получается: " + n + " × " + (x === "החפץ" ? "предмет" : x)],
  [/^לחפץ ״(.*)״ יש בדיוק אותו מתכון\..*$/, "У предмета «$1» точно такой же рецепт. Поменяй один материал, чтобы игра знала, что делать."],
  [/^הקוד נכנס לקובץ (\w+\.java)$/, "Код попал в файл $1"], [/^נטען הציור הקיים של (.*)$/, "Загружен рисунок предмета $1"]
];
function tr(t){
  const k = t.trim(); if (!k || !/[א-ת]/.test(k) || /[ְ-ׇ]/.test(k)) return null;   // text with niqqud is a lesson: it stays Hebrew
  // Each Russian phrase is isolated left-to-right (U+2066 ... U+2069), so its punctuation stays in place on a right-to-left page.
  if (D[k] !== undefined) return t.replace(k, "⁦" + D[k] + "⁩");
  for (const [re, to] of RX) if (re.test(k)) return t.replace(k, "⁦" + (typeof to === "function" ? to(k) : k.replace(re, to)) + "⁩");
  return null;
}

/* ---------- lesson steps: the Hebrew with niqqud, and the Russian under it ---------- */
const S = __S__;
const niq = s => (s && NIQ[s]) || s || "";
const ru = (n, i, f) => S[n + "|" + i + "|" + f] || "";
const line = (r, tag) => r ? `<${tag} class="ru-l" lang="ru" dir="ltr">${r}</${tag}>` : "";
const both = (he, r, tag) => he ? niq(he) + line(r, tag || "span") : he;
function step(n, i, he){
  const s = Object.assign({}, he);
  s.title = both(he.title, ru(n, i, "title"));
  ["body", "expect", "note"].forEach(f => { if (he[f]) s[f] = both(he[f], ru(n, i, f), "div"); });
  if (he.tab) s.tab = ru(n, i, "tab") || he.tab;
  if (he.hints) s.hints = he.hints.map((h, k) => both(h, ru(n, i, "hint" + k)));
  if (he.stuck) s.stuck = he.stuck.map(([q, a], k) => [both(q, ru(n, i, "stuckq" + k)), both(a, ru(n, i, "stucka" + k))]);
  return s;
}
function lesson(n){
  const L = H.LESSONS[n]; if (!L || !S[n + "|-1|title"]) return null;
  return { title: ru(n, -1, "title"), unit: ru(n, -1, "unit"),
    stations: (L.stations || []).map(([x, k], j) => [ru(n, -1, "station" + j) || x, k]),
    groups: Object.fromEntries(Object.entries(L.groups || {}).map(([k, v]) => [k, ru(n, -1, "group." + k) || v])) };
}
function challenges(n, list){
  return list.map(c => Object.assign({}, c, { t: both(c.t, ru(n, -2, "ch." + c.id + ".t")), d: both(c.d, ru(n, -2, "ch." + c.id + ".d")),
    lvl: c.lvl === "חובה" ? "обязательно" : "задание" }));
}

/* ---------- swap the words in a part of the page ---------- */
function translate(root){
  if (!root) return;
  const w = root.ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
  nodes.forEach(n => { const t = tr(n.nodeValue); if (t !== null) n.nodeValue = t; });
  root.querySelectorAll("[placeholder],[aria-label],[title]").forEach(el => ["placeholder","aria-label","title"].forEach(a => {
    const v = el.getAttribute(a); if (v){ const t = tr(v); if (t !== null) el.setAttribute(a, t); } }));
}
let mo = null;
function watch(app){
  if (mo || !app) return;
  mo = new MutationObserver(list => { if (!isRu()) return;
    list.forEach(m => { if (m.type === "characterData"){ const t = tr(m.target.nodeValue); if (t !== null) m.target.nodeValue = t; }
      else m.addedNodes.forEach(n => { if (n.nodeType === 3){ const t = tr(n.nodeValue); if (t !== null) n.nodeValue = t; } else if (n.nodeType === 1) translate(n); }); }); });
  mo.observe(app, { subtree:true, childList:true, characterData:true });
}
const CSS = `
.ru-l{display:block;direction:ltr;text-align:left;unicode-bidi:isolate;font-family:Arial,"Segoe UI",sans-serif;font-size:.9em;font-weight:400;color:var(--muted);margin-top:.3em;line-height:1.45}
h1 .ru-l{font-size:.55em;margin-top:.2em}
#app.ru .lp-card h1,#app.ru .lp-say,#app.ru .lp-expect,#app.ru .lp-note,#app.ru .lp-help,#app.ru .chal{font-family:Arial,"Segoe UI",sans-serif;line-height:1.75}
#app.ru .lp-say li,#app.ru .lp-help li{margin-bottom:.45em}`;
const st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);

window.HUB_RU = {
  translate: root => { translate(root); watch(document.getElementById("app")); },
  step, challenges, lesson,
  // For blocks.js and studio.js: block labels, menu lists, the checker's messages, and the examples' names.
  blocks: __B__
};
})();
