/* ===== teacher slides for meeting 1 (open ?page=slides1; arrows to move, N for notes) =====
   Every slide is something to click, not something to read. The explanation is what the teacher says (the notes). */
/* The toy pet of the slides: one drawing, changed by options. */
const toy = (o = {}) => `<svg class="toy" viewBox="0 0 200 200">${o.egg
  ? `<path d="M100 22 C146 22 168 92 168 128 C168 164 138 182 100 182 C62 182 32 164 32 128 C32 92 54 22 100 22 Z" fill="#FFFDF5" stroke="#231B3A" stroke-width="5"/><circle cx="76" cy="96" r="10" fill="#F29E38"/><circle cx="126" cy="128" r="14" fill="#F29E38"/><circle cx="92" cy="152" r="7" fill="#F29E38"/>`
  : `${o.horn ? `<path d="${o.bent ? "M88 54 Q84 12 124 8 Q106 26 114 54 Z" : "M88 54 L100 8 L112 54 Z"}" fill="#FFC83D" stroke="#231B3A" stroke-width="4" stroke-linejoin="round"/>` : ""}
    ${o.tri ? `<path d="M100 40 L176 180 L24 180 Z" fill="${o.c || "#B9B4C7"}" stroke="#231B3A" stroke-width="5" stroke-linejoin="round"/>` : `<rect x="34" y="48" width="132" height="132" rx="${o.sq ? 16 : 66}" fill="${o.c || "#B9B4C7"}" stroke="#231B3A" stroke-width="5"/>`}
    ${(o.tri ? [[80, 126], [120, 126]] : [[72, 104], [128, 104]]).concat(o.eyes3 ? [[100, o.tri ? 96 : 76]] : []).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${o.big ? (o.tri ? 14 : 19) : 10}" fill="#fff" stroke="#231B3A" stroke-width="4"/><circle cx="${x}" cy="${y}" r="${o.big ? 8 : 4}" fill="#231B3A"/>`).join("")}
    <path d="M80 ${o.tri ? 160 : 142} Q100 ${(o.sad ? 128 : 162) + (o.tri ? 16 : 0)} 120 ${o.tri ? 160 : 142}" fill="none" stroke="#231B3A" stroke-width="5" stroke-linecap="round"/>
    ${o.yarn ? `<circle cx="172" cy="170" r="17" fill="#FF7AA8" stroke="#231B3A" stroke-width="4"/><path d="M160 164 Q172 174 184 162 M161 176 Q172 168 182 178" fill="none" stroke="#231B3A" stroke-width="2"/>` : ""}`}</svg>${o.name ? `<b class="toy-name">${o.name}</b>` : ""}${o.say ? `<span class="toy-say">${o.say}</span>` : ""}`;
const pick = a => a[Math.floor(Math.random() * a.length)];
const randomToy = () => ({ c: pick(["#7BD389", "#FF9F68", "#6EC6FF", "#FF7AA8", "#C9A227", "#9AA0A6"]), sq: Math.random() < .5, horn: Math.random() < .4, eyes3: Math.random() < .35, big: Math.random() < .4, sad: Math.random() < .3 });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const hop = el => { el.classList.remove("hop"); void el.offsetWidth; el.classList.add("hop"); };

/* slide 2: one press, from the page to the server to the Sheet and back */
function diaMount(root){
  const st = { sheet: 50, page: 50, open: true, on: true, friend: false, busy: false }, $ = s => root.querySelector(s), P = 16, S = 50, G = 84;
  const paint = () => {
    $(".cell").textContent = st.sheet; $(".dc.page").classList.toggle("closed", !st.open); $(".dc.srv").classList.toggle("dead", !st.on);
    $(".page .dnum").textContent = st.page == null ? "?" : st.page; $(".page .dbar i").style.width = (st.page || 0) + "%";
    $("[data-a=close]").textContent = st.open ? "סוגרים את הדף" : "פותחים את הדף"; $("[data-a=kill]").textContent = st.on ? "מכבים את השרת" : "מדליקים את השרת";
    $(".dc.friend").hidden = !st.friend; $(".friend .dnum").textContent = st.on ? st.sheet : "?";
  };
  const fly = async (text, from, to) => { const p = $(".pkt"); p.textContent = text; p.style.transition = "none"; p.style.insetInlineStart = from + "%"; p.hidden = false; void p.offsetWidth; p.style.transition = ""; p.style.insetInlineStart = to + "%"; await sleep(620); };
  const ask = async (msg, change) => {
    $(".dsay").textContent = "";
    await fly(msg, P, S);
    if (!st.on){ $(".pkt").textContent = "✗"; await sleep(700); $(".pkt").hidden = true; st.page = null; $(".dsay").textContent = "אופס. השרת לא עונה"; paint(); return; }
    await fly(msg, S, G);
    if (change){ st.sheet = Math.min(100, st.sheet + change); paint(); hop($(".cell")); }
    await sleep(300); await fly(String(st.sheet), G, S); await fly(String(st.sheet), S, P);
    $(".pkt").hidden = true; st.page = st.sheet; paint(); hop($(".page .toy"));
  };
  root.querySelectorAll("[data-a]").forEach(b => b.addEventListener("click", async () => {
    if (st.busy) return; st.busy = true; const a = b.dataset.a;
    if (a === "feed" && st.open) await ask("להאכיל!", 15);
    if (a === "refresh" && st.open){ st.page = null; paint(); await sleep(450); await ask("מה המצב?", 0); }
    if (a === "close"){ st.open = !st.open; if (st.open){ st.page = null; paint(); await ask("מה המצב?", 0); } else paint(); }
    if (a === "kill"){ st.on = !st.on; paint(); }
    if (a === "friend"){ st.friend = !st.friend; paint(); }
    st.busy = false;
  }));
  paint();
}
/* slide 5: a conversation that moves one message per click */
const CHAT = [
  ["me", "זאת החיה שלי: פופקורן, סגולה, עם קרן אחת. עדיין בלי קוד. תשאל אותי 3 שאלות.", { c: "#9B6BFF", horn: true, name: "פופקורן" }],
  ["ai", "שאלה 1: הקרן שלה ישרה או עקומה?"],
  ["me", "עקומה. כמו בננה.", { bent: true }],
  ["ai", "שאלה 2: מה הדבר הראשון שרואים כשמסתכלים עליה?"],
  ["me", "את העיניים. הן ענקיות.", { big: true }],
  ["ai", "שאלה 3: מה היא אומרת כשהיא רעבה?"],
  ["me", "תן לי 3 אפשרויות."],
  ["ai", "1. ״אני גוועת ברעב.״<br>2. ״פיצה. עכשיו.״<br>3. ״מישהו ראה את האוכל שלי?״"],
  ["me", "2, אבל שתצעק.", { say: "פיצה!!! עכשיו!!!" }]
];
const POP = { c: "#9B6BFF", horn: true, bent: true, big: true, name: "פופקורן" };
const SHAPES = [["עגולה", {}, "חמודה"], ["מרובעת", { sq: true }, "חזקה"], ["מחודדת", { tri: true }, "מסוכנת"]];
const EXTRAS = [["קרן", { horn: true }], ["שלוש עיניים", { eyes3: true }], ["כדור צמר", { yarn: true }]];
const WANTS = [["תשומת לב", "היי! מישהו?! אני פה!!!"], ["שקט", "אוכל. ואז שיעזבו אותי."], ["פיצה", "פיצה!!! עכשיו!!!"]];
const PLAN = [["הציור של פופקורן", 0], ["כפתור: לדגדג 🤣", 1], ["כמה פעמים דגדגו אותה", 2], ["״פיצה!!! עכשיו!!!״", 0], ["כפתור: להאכיל 🍎", 1], ["השובע שלה", 2], ["השם שלה", 2]];
let slideTimer = 0;

const S1 = [
  { html:`<div class="toybox xl" id="t1">${toy({ c: "#8C7FFF", big: true })}</div><h1>תאכילו אותה</h1>${demoLink()}`,
    mount: r => r.querySelector("#t1").addEventListener("click", e => hop(e.currentTarget)),
    notes:"0–3 דק׳. לפני השיעור: בגיליון של החיה שלך, full על 20. ״זאת החיה שלי, והיא באמת באינטרנט. כל אחד פותח את הדף של הקורס, לוחץ על הכפתור הסגול, ומאכיל אותה פעם אחת.״ על המקרן, בחלון שני: הגיליון שלך. מרעננים, והשורות ב־log מתמלאות. ״אף אחד מכם לא שלח לי כלום. אז מי כתב אצלי בגיליון?״" },

  { html:`<div class="toybox" id="t2"></div><div class="dbar wide"><i id="b2"></i></div><div class="dctl"><button class="btn go" data-a="feed">להאכיל 🍎</button><button class="btn" data-a="needs">חיה בלי צרכים</button></div><p class="sub" id="s2">היא צריכה אתכם</p>`,
    mount: r => { let full = 80, needs = true; const paint = () => { r.querySelector("#t2").innerHTML = toy(Object.assign({}, POP, needs ? { sad: full < 35, say: full < 35 ? "אני רעבה!!!" : "" } : {})); r.querySelector("#b2").style.width = (needs ? full : 100) + "%"; r.querySelector(".dbar").style.visibility = needs ? "" : "hidden"; r.querySelector("#s2").textContent = needs ? "היא צריכה אתכם" : "סתם ציור"; r.querySelector("[data-a=needs]").textContent = needs ? "חיה בלי צרכים" : "חיה עם צרכים"; };
      clearInterval(slideTimer); slideTimer = setInterval(() => { if (!r.isConnected) return clearInterval(slideTimer); if (!needs || full <= 0) return; const was = full; full = Math.max(0, full - 3); if ((was >= 35) !== (full >= 35)) paint(); else r.querySelector("#b2").style.width = full + "%"; }, 280);
      r.querySelector("[data-a=feed]").addEventListener("click", () => { if (needs){ full = Math.min(100, full + 35); } paint(); if (needs) hop(r.querySelector("#t2")); });
      r.querySelector("[data-a=needs]").addEventListener("click", () => { needs = !needs; paint(); }); paint(); },
    notes:"3–5 דק׳. לא אומרים כלום, ונותנים לפס לרדת עד שהיא צועקת. ״מי רוצה להאכיל אותה?״ מאכילים. ואז ״חיה בלי צרכים״, ולוחצים להאכיל: כלום. ״מה ההבדל? אותו ציור בדיוק. ההבדל הוא שהיא צריכה משהו, ושרואים עליה שהיא צריכה. חיה שלא צריכה אתכם היא סתם תמונה. זה מה שמתכננים היום: מה היא צריכה, ואיך רואים את זה עליה.״" },

  { html:`<div class="build"><div style="display:grid;gap:18px"><div class="chips big" id="shapes">${SHAPES.map((x, i) => `<button data-i="${i}">${x[0]}</button>`).join("")}</div><div class="chips big" id="extras">${EXTRAS.map((x, i) => `<button data-i="${i}">${x[0]}</button>`).join("")}</div><div class="chips big"><button id="sil">בחושך</button></div></div><div class="toybox" id="t3"></div></div><p class="sub" id="s3"></p>`,
    mount: r => { let sh = 0, sil = false; const ex = new Set(), paint = () => { const t = r.querySelector("#t3"); t.innerHTML = toy(Object.assign({ c: "#9B6BFF" }, SHAPES[sh][1], ...[...ex].map(i => EXTRAS[i][1]))); t.classList.toggle("sil", sil); r.querySelector("#s3").textContent = SHAPES[sh][2]; r.querySelectorAll("#shapes button").forEach((b, i) => b.classList.toggle("on", i === sh)); r.querySelectorAll("#extras button").forEach((b, i) => b.classList.toggle("on", ex.has(i))); r.querySelector("#sil").classList.toggle("on", sil); };
      r.querySelectorAll("#shapes button").forEach(b => b.addEventListener("click", () => { sh = +b.dataset.i; paint(); hop(r.querySelector("#t3")); }));
      r.querySelectorAll("#extras button").forEach(b => b.addEventListener("click", () => { const i = +b.dataset.i; ex.has(i) ? ex.delete(i) : ex.add(i); paint(); }));
      r.querySelector("#sil").addEventListener("click", () => { sil = !sil; paint(); }); paint(); },
    notes:"5–8 דק׳. קודם שלוש הצורות, בלי להסביר: ״את מי הייתם מחבקים? ממי הייתם בורחים?״ ״לא שיניתי פנים, ולא שיניתי צבע. רק צורה. עגול נראה חמוד, מרובע נראה חזק, מחודד נראה מסוכן. מי שמעצב דמויות בוחר צורה לפני כל דבר אחר.״ ואז ״בחושך״: ״מזהים אותה?״ מוסיפים קרן: ״ועכשיו?״ מוסיפים את שלושתם: ״עכשיו זה כבר בלגן. דבר אחד מיוחד מספיק. ככה מזהים דמות גם מהצללית שלה.״" },

  { html:`<div class="toybox" id="t4"></div><p class="sub">מה היא הכי רוצה?</p><div class="chips big" id="wants">${WANTS.map((x, i) => `<button data-i="${i}">${x[0]}</button>`).join("")}</div>`,
    mount: r => { const paint = i => { r.querySelector("#t4").innerHTML = toy(Object.assign({}, POP, { sad: true, say: i == null ? "אני רעבה." : WANTS[i][1] })); r.querySelectorAll("#wants button").forEach((b, k) => b.classList.toggle("on", k === i)); if (i != null) hop(r.querySelector("#t4")); };
      r.querySelectorAll("#wants button").forEach(b => b.addEventListener("click", () => paint(+b.dataset.i))); paint(null); },
    notes:"8–10 דק׳. ״היא רעבה. מה היא אומרת? תלוי מה היא רוצה.״ לוחצים על שלושתם. ״אותה חיה, אותו ציור, אותו רעב. ויצאו שלוש חיות שונות לגמרי. האופי שלה הוא לא הציור. האופי שלה הוא מה שהיא רוצה, ואיך היא מדברת בגלל זה.״" },

  { html:`<div class="plan"><div class="pcol" data-c="0"><b>רואים</b><small>הדף</small></div><div class="pcol" data-c="1"><b>עושים</b><small>השרת</small></div><div class="pcol" data-c="2"><b>זוכרת</b><small>הגיליון</small></div></div><div class="chips big" id="pool">${PLAN.map((x, i) => `<button data-i="${i}">${x[0]}</button>`).join("")}</div><button class="btn go" id="names">ובאפליקציה?</button>`,
    mount: r => { r.querySelectorAll("#pool button").forEach(b => b.addEventListener("click", () => { const c = r.querySelector(`.pcol[data-c="${PLAN[+b.dataset.i][1]}"]`); b.classList.add("on"); c.appendChild(b); hop(b); }));
      r.querySelector("#names").addEventListener("click", () => r.querySelector(".plan").classList.add("named")); },
    notes:"10–13 דק׳. ״זאת התוכנית של פופקורן. כל דבר בה שייך לאחד משלושה מקומות.״ על כל פתק שואלים את הכיתה לאן, ולוחצים עליו. ״כפתור: לדגדג״ שייך ל״עושים״: ״הכפתור עצמו נמצא על המסך. אבל כשלוחצים עליו, מישהו צריך לעשות משהו.״ בסוף ״ובאפליקציה?״: ״לשלושת המקומות האלה יש שמות. מה שרואים זה הדף. מי שעושה זה השרת. ומה שהיא זוכרת נמצא בגיליון. תכננתם חיה, ויצאה לכם תוכנית של אפליקציה.״" },

  { html:`<div class="dia"><div class="dc page"><b>הדף</b><div class="toybox sm">${toy({ c: "#8C7FFF", big: true })}</div><div class="dbar"><i></i></div><span class="dnum">50</span><small class="dsay"></small><button class="btn" data-a="feed">להאכיל 🍎</button></div>
      <div class="dc srv"><b>השרת</b><span class="ico">⚙️</span></div>
      <div class="dc sheet"><b>הגיליון</b><table class="m-sheet"><tr><th>key</th><th>value</th></tr><tr><td>full</td><td class="cell">50</td></tr></table></div>
      <div class="lane"><span class="pkt" hidden></span></div></div>
    <div class="dctl"><button class="btn" data-a="refresh">רענון</button><button class="btn" data-a="close">סוגרים את הדף</button><button class="btn" data-a="friend">דף של חבר</button><button class="btn" data-a="kill">מכבים את השרת</button><div class="dc friend" hidden><b>הדף של חבר</b><span class="dnum"></span></div></div>
    <p class="sub">הדף מראה · השרת מחליט · הגיליון זוכר</p>`,
    mount: diaMount,
    notes:"13–16 דק׳. ״ועכשיו נראה איך שלושת המקומות האלה עובדים.״ לוחצים ״להאכיל״: ״הדף לא יודע כלום. הוא מבקש מהשרת, והשרת כותב בגיליון.״ ״רענון״: ״דף שוכח הכול. הוא שואל שוב, ומקבל את התשובה מהגיליון.״ ״סוגרים את הדף״: ״החיה מתה? לא. היא בגיליון.״ ״דף של חבר״: ״כל דף שייפתח, שלי, שלכם, של חבר, שואל את אותו שרת.״ ״מכבים את השרת״ ואז ״להאכיל״: ״בלי שרת, הדף הוא סתם ציור.״ ולסיום: ״כל אפליקציה שיש לכם בטלפון בנויה ככה. משהו שרואים, מישהו שמחליט, ומשהו שזוכר.״" },

  { html:`<div class="duo"><div class="who"><span class="ico">🎨</span><b>אתם</b><span class="bub" id="bub">תעשה לי חיה</span><div class="dctl"><button class="btn" data-a="vague">״תעשה לי חיה״</button><button class="btn go" data-a="plan">עם התוכנית</button></div></div><div class="who"><span class="ico">🤖</span><b>ג׳מיני</b><div class="toybox" id="guess"><span class="q">?</span></div></div></div><p class="sub">מה שלא אמרתם, הוא מנחש</p>`,
    mount: r => { const g = r.querySelector("#guess");
      r.querySelector("[data-a=vague]").addEventListener("click", async () => { r.querySelector("#bub").textContent = "תעשה לי חיה"; for (let i = 0; i < 9; i++){ g.innerHTML = toy(randomToy()); await sleep(110); } hop(g); });
      r.querySelector("[data-a=plan]").addEventListener("click", () => { r.querySelector("#bub").textContent = "פופקורן: עגולה, סגולה, קרן אחת עקומה, עיניים ענקיות"; g.innerHTML = toy(POP); hop(g); }); },
    notes:"16–18 דק׳. ״תעשה לי חיה״ שלוש־ארבע פעמים, וכל פעם יוצאת חיה אחרת. ״אותה בקשה בדיוק. למה כל פעם יוצא משהו אחר? כי לא אמרתי לו כלום, אז הוא ניחש.״ ואז ״עם התוכנית״, כמה פעמים: תמיד פופקורן. ״כשמפתחים בעזרת AI, אתם המעצבים, ואתם הבוס. ג׳מיני מקליד, ומהר מאוד. אבל כשהבוס שותק, המקליד ממציא. בגלל זה החלק הכי חשוב היום הוא התוכנית, ולא הקוד.״" },

  { html:`<div class="build"><div class="chat" id="chat"></div><div class="toybox" id="t5"></div></div><button class="btn go" id="more">הלאה</button>`,
    mount: r => { let n = 0; const o = {}, step = () => { if (n >= CHAT.length) return; const [who, text, change] = CHAT[n++]; const c = r.querySelector("#chat"); c.insertAdjacentHTML("beforeend", `<div class="msg ${who}">${text}</div>`); c.scrollTop = c.scrollHeight;
        if (change){ Object.assign(o, change); r.querySelector("#t5").innerHTML = toy(o); hop(r.querySelector("#t5")); } if (n >= CHAT.length) r.querySelector("#more").disabled = true; };
      r.querySelector("#t5").innerHTML = toy(o); r.querySelector("#more").addEventListener("click", step); step(); },
    notes:"18–20 דק׳. לוחצים ״הלאה״, הודעה אחרי הודעה. ״לא חייבים לתת לו פקודות. אפשר לדבר איתו. תגידו לו: תשאל אותי קודם. תגידו לו: תן לי שלוש אפשרויות. הוא מציע, ואתם מחליטים.״" },

  { html:`<div class="two"><div class="col"><span class="bub">זה לא יפה, תתקן</span><button class="btn" data-a="bad">לשלוח</button><div class="toybox" id="bad">${toy({ c: "#9B6BFF", horn: true, bent: true, name: "פופקורן" })}</div></div>
      <div class="col"><span class="bub">שנה רק את העיניים: גדולות פי שניים</span><button class="btn" data-a="good">לשלוח</button><div class="toybox" id="good">${toy({ c: "#9B6BFF", horn: true, bent: true, name: "פופקורן" })}</div></div></div>
    <button class="btn go" data-a="bug">ואם משהו נשבר?</button><div class="bugcard" id="bugcard" hidden><b>מה עשיתי</b><b>מה ציפיתי שיקרה</b><b>מה קרה בפועל</b><b>ההודעה האדומה</b></div>`,
    mount: r => { r.querySelector("[data-a=bad]").addEventListener("click", () => { const b = r.querySelector("#bad"); b.innerHTML = toy({ c: "#7BD389", sq: true, eyes3: true, sad: true, name: "?!" }); hop(b); });
      r.querySelector("[data-a=good]").addEventListener("click", () => { const g = r.querySelector("#good"); g.innerHTML = toy({ c: "#9B6BFF", horn: true, bent: true, big: true, name: "פופקורן" }); hop(g); });
      r.querySelector("[data-a=bug]").addEventListener("click", () => { r.querySelector("#bugcard").hidden = false; }); },
    notes:"20–22 דק׳. קודם ״לשלוח״ בצד של ״תתקן״: ״׳תתקן׳ לא אומר לו כלום, אז הוא מתחיל מהתחלה. וככה נעלמת לכם חיה שעבדתם עליה חצי שעה.״ ואז בצד השני: ״אומרים לו מה לשנות, ומה לא.״ ואז ״ואם משהו נשבר?״: ״ג׳מיני טועה. הרבה. ׳זה לא עובד׳ לא עוזר לו. מספרים לו מה עשיתם, מה ציפיתם שיקרה, ומה קרה. כמו שמספרים לרופא.״" },

  { html:`<div class="path" id="path"><div><span>🥚</span><b>ביצה</b></div><i>←</i><div><span>🐣</span><b>בוקעת</b></div><i>←</i><div><span>👆</span><b>כפתור משלי</b></div><i>←</i><div><span>🤝</span><b>חבר</b></div></div>`,
    mount: r => { let n = 0; const d = [...r.querySelectorAll("#path > div")], go = () => { n = (n % d.length) + 1; d.forEach((x, i) => x.classList.toggle("on", i < n)); }; r.querySelector("#path").addEventListener("click", go); go(); },
    notes:"22 דק׳, ונשאר על המקרן עד הסוף. ״מתחילים מביצה: אפליקציה אמיתית, אבל ריקה. אתם וג׳מיני גורמים לה לבקוע. אחר כך ממציאים לה כפתור שאין לאף חיה אחרת. ובסוף חבר לוחץ עליו מהמחשב שלו.״ כולם בדף של הקורס, ״להתחיל״. בזמן העבודה: מי שתקוע פותח ״נתקעתי״ בתחתית השלב, אחר כך שואל את השכן, ורק אז אותך. בדקה 78: שלושה־ארבעה מראים את החיה שלהם על המקרן, עם הגיליון לידה. כולם שומרים עותק." }
];
