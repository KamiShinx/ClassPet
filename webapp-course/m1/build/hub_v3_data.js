/* ===== the pet's design card: kept in this browser only ===== */
const CARD = [
  ["name", "איך קוראים לה?", "למשל: פופקורן", "שם"],
  ["kind", "איזו חיה היא?", "למשל: חתול־דג. אפשר להמציא", "איזו חיה", "הכי טוב חיה שאין בעולם: מחברים שתי חיות, או נותנים רגליים לענן."],
  ["shape", "מה הצורה שלה?", "למשל: עגולה כמו כדור", "צורה", "עגול נראה חמוד. מרובע נראה חזק. מחודד נראה מסוכן."],
  ["colors", "שניים או שלושה צבעים", "למשל: סגול וצהוב", "צבעים"],
  ["special", "דבר אחד שיש רק לה", "למשל: קרן אחת עקומה", "מה שיש רק לה", "דבר אחד, לא חמישה. ככה מזהים אותה גם מרחוק."],
  ["want", "מה היא הכי רוצה בעולם?", "למשל: שלא יפסיקו לשים לב אליה", "מה היא הכי רוצה"],
  ["voice", "מה היא אומרת כשהיא רעבה?", "למשל: אני גוססת פה! פיצה!!!", "מה היא אומרת כשהיא רעבה", "לפי מה שהיא רוצה: חיה שרוצה שקט וחיה שרוצה תשומת לב לא מדברות אותו דבר."]
];
const card = () => LS.get("card", {});
const cardText = () => { const c = card(); return CARD.map(x => x[3] + ": " + (c[x[0]] || "(עוד לא החלטתי)")).join("\n"); };
const cardRows = (from, to) => CARD.slice(from, to).map(([k, q, ph, , tip]) => `<label>${q}<input data-card="${k}" maxlength="120" placeholder="${esc(ph)}" value="${esc(card()[k] || "")}">${tip ? `<small class="tip">${tip}</small>` : ""}</label>`).join("");
const cardForm = () => `<div class="form"><h3>מי היא?</h3>${cardRows(0, 5)}<h3>מה היא רוצה?</h3>${cardRows(5, 7)}<h3>מה עושים איתה, ומה היא זוכרת?</h3><p>להאכיל וללטף יש לכל חיה. מתכננים כפתור שלישי, שמתאים רק לה. כל לחיצה עליו תירשם בגיליון, בשורה בשם שתבחרו.</p></div>${btnForm()}<small id="card-saved"></small>`;
function bindCard(root){
  root.querySelectorAll("[data-card]").forEach(i => i.addEventListener("input", () => { const c = card(); c[i.dataset.card] = i.value; LS.set("card", c); const s = root.querySelector("#card-saved"); if (s) s.textContent = "נשמר בדפדפן הזה"; }));
}

/* ===== messages to Gemini: a fixed frame, and the kid's own words inside it =====
   A "mine" box is text the kid has to write. The copy button wakes up only when it has enough words. */
const mine = () => LS.get("mine", {});
const words = s => String(s || "").trim().split(/\s+/).filter(Boolean).length;
const mineBox = (key, q, ph) => `<div class="form"><label>${q}<textarea data-mine="${key}" rows="2" maxlength="300" placeholder="${esc(ph)}">${esc(mine()[key] || "")}</textarea></label></div>`;
/* A prompt box that rebuilds itself while the kid types. need = [[key, minimum words], ...] */
const livePrompt = (id, title, need) => `<div class="prompt" data-live="${id}" data-need='${JSON.stringify(need || [])}'><div class="ph"><span>${title}</span><button class="btn go" data-copy>להעתיק</button></div><pre></pre></div>`;

const askPrompt = () => `אני בונה אפליקציה של חיה וירטואלית. העיצוב עליי, והקוד עליך.
זאת התוכנית של החיה:
${cardText()}

עדיין בלי קוד. קודם תשאל אותי 3 שאלות על איך היא נראית ואיך היא מתנהגת. שאלה אחת בכל פעם, ותחכה לתשובה שלי. אל תמציא במקומי.`;

const hatchPrompt = () => `עכשיו בונים. זה הקובץ Pet.html מהאפליקציה שלי. כרגע יש בו ביצה.
מה שאני רוצה: ${mine().decided || "____"}

תחליף את הביצה בחיה שלי: ציור חדש ב־SVG, צבעים, רקע, והמשפטים שהיא אומרת.
חוקים:
1. תשנה רק את הקובץ הזה.
2. אל תיגע בשורות שיש בהן server.add, ואל תשנה את השם של הפונקציה draw.
3. תשלח את הקובץ המלא, מהשורה הראשונה ועד <!-- END Pet -->. בלי "..." ובלי "שאר הקוד נשאר אותו דבר".

הקובץ:
${EGG}`;

const TALK = [
  ["only", "לשנות דבר אחד", "מה לשנות, ואיך?", "למשל: את העיניים, שיהיו גדולות פי שניים", t => `תשנה רק את זה: ${t}\nכל השאר נשאר בדיוק כמו שהוא. תשלח שוב את הקובץ המלא, עד <!-- END Pet -->.`],
  ["three", "לבקש 3 אפשרויות", "אפשרויות למה?", "למשל: למשפט שהיא אומרת כשהיא שמחה", t => `תן לי 3 אפשרויות: ${t}\nעדיין בלי קוד. אני אבחר, ורק אז תשנה.`],
  ["no", "זה לא מה שהתכוונתי", "למה התכוונתם?", "למשל: שהיא תהיה מרובעת, לא עגולה", t => `זה לא מה שהתכוונתי. התכוונתי לזה: ${t}\nתשנה רק את זה, ותשלח שוב את הקובץ המלא, עד <!-- END Pet -->.`]
];
const talkPrompt = () => { const m = mine(), t = TALK.find(x => x[0] === (m.talkKind || "only")); return t[4](m.talk || "____"); };
const talkBox = () => { const k = mine().talkKind || "only", t = TALK.find(x => x[0] === k);
  return `<div class="chips">${TALK.map(x => `<button data-talk="${x[0]}" class="${x[0] === k ? "on" : ""}">${x[1]}</button>`).join("")}</div>` + mineBox("talk", t[2], t[3]) + livePrompt("talk", "מדביקים באותו צ׳אט", [["talk", 2]]); };

const BTN = [
  ["label", "הכפתור שלה: שם ואימוג׳י", "למשל: לדגדג 🤣"],
  ["does", "מה קורה לה כשלוחצים?", "למשל: היא מתגלגלת מצחוק"],
  ["says", "ומה היא אומרת?", "למשל: די!!! מספיק!!!"],
  ["key", "כל לחיצה נספרת בגיליון. איך קוראים לשורה? מילה אחת, באנגלית", "למשל: tickles"]
];
const btnForm = () => `<div class="form">${BTN.map(([k, q, ph]) => `<label>${q}<input data-mine="${k}" maxlength="80" placeholder="${esc(ph)}" value="${esc(mine()[k] || "")}" ${k === "key" ? 'dir="ltr" style="text-align:left"' : ""}></label>`).join("")}</div>`;
const keyName = () => (String(mine().key || "").toLowerCase().replace(/[^a-z0-9]/g, "") || "clicks");
const optionsPrompt = () => { const m = mine(); return `אני רוצה להוסיף לחיה שלי כפתור חדש.
הכפתור: ${m.label || "____"}
מה קורה לה כשלוחצים: ${m.does || "____"}
מה היא אומרת: ${m.says || "____"}

עדיין בלי קוד. תציע 3 אפשרויות שונות לאיך זה ייראה על המסך, שתי שורות לכל אפשרות. אני אבחר.`; };
const buildPrompt = () => `${mine().pick || "____"}

עכשיו תוסיף את הכפתור לקובץ Pet.html.
החיה צריכה לזכור כל לחיצה: server.add("${keyName()}", 1) מוסיף 1 לשורה ${keyName()} בגיליון, והמספר העדכני נמצא ב־pet.${keyName()}. תציג את המספר הזה בדף.
תשנה רק מה שצריך בשביל הכפתור. תשלח את הקובץ המלא, עד <!-- END Pet -->.

הקובץ שלי עכשיו:`;
const bugPrompt = () => { const m = mine(); return `משהו נשבר.
מה עשיתי: ${m.bugDid || "____"}
מה ציפיתי שיקרה: ${m.bugWant || "____"}
מה קרה בפועל: ${m.bugGot || "____"}
ההודעה האדומה במסך: ${m.bugErr || "אין"}

תתקן רק את זה, בלי לשנות שום דבר אחר. תשלח את הקובץ המלא, עד <!-- END Pet -->.`; };
const bugBox = () => `<div class="form"><label>מה עשיתם?<input data-mine="bugDid" placeholder="למשל: הדבקתי את הקובץ החדש ולחצתי על לדגדג" value="${esc(mine().bugDid || "")}"></label>
  <label>מה ציפיתם שיקרה?<input data-mine="bugWant" placeholder="למשל: שהמספר יעלה ב-1" value="${esc(mine().bugWant || "")}"></label>
  <label>מה קרה בפועל?<input data-mine="bugGot" placeholder="למשל: שום דבר לא זז" value="${esc(mine().bugGot || "")}"></label>
  <label>יש הודעה אדומה במסך? מעתיקים אותה לכאן<input data-mine="bugErr" dir="ltr" style="text-align:left" value="${esc(mine().bugErr || "")}"></label></div>` + livePrompt("bug", "מדביקים באותו צ׳אט", [["bugDid", 2], ["bugGot", 2]]);
const LIVE = { ask: askPrompt, hatch: hatchPrompt, talk: talkPrompt, options: optionsPrompt, build: buildPrompt, bug: bugPrompt };
function bindMine(root){
  const fill = () => root.querySelectorAll("[data-live]").forEach(box => {
    box.querySelector("pre").textContent = LIVE[box.dataset.live]();
    const need = JSON.parse(box.dataset.need || "[]"), m = mine(), okNow = need.every(([k, n]) => words(m[k]) >= n);
    const b = box.querySelector("[data-copy]"); b.disabled = !okNow; b.title = okNow ? "" : "קודם כותבים בתיבות, במילים שלכם";
  });
  root.querySelectorAll("[data-mine]").forEach(i => i.addEventListener("input", () => { const m = mine(); m[i.dataset.mine] = i.value; LS.set("mine", m); fill(); }));
  root.querySelectorAll("[data-talk]").forEach(b => b.addEventListener("click", () => { const m = mine(); m.talkKind = b.dataset.talk; LS.set("mine", m); renderLesson(); }));
  fill();
}

/* ===== drawings of the screens: where to click (numbered yellow marks) ===== */
const mock = (title, inner) => `<div class="mock" aria-hidden="true"><div class="bar"><i></i><i></i><i></i><span>${title}</span></div><div class="in">${inner}</div></div>`;
const MOCK = {
  gemini: () => mock("gemini.google.com", `<div class="m-cols"><div class="m-side"><span class="m-btn mk" data-n="1">+ צ׳אט חדש</span><span style="color:#5f6368">צ׳אטים קודמים</span></div>
    <div style="display:grid;gap:40px;align-content:space-between;min-height:150px"><b style="font-size:20px">שלום, איך אפשר לעזור?</b><div class="m-input mk" data-n="2">מדביקים כאן (Ctrl+V), ולוחצים Enter</div></div></div>`),
  copy: () => mock("Google Sheets", `<div class="m-dialog"><b>ליצור עותק של המסמך? (Copy document)</b><div>שם: <span class="m-btn mk" data-n="1">החיה של ___</span></div><div class="m-row" style="justify-content:flex-end"><span class="m-btn m-blue mk" data-n="2">יצירת עותק (Make a copy)</span></div></div>`),
  ext: () => mock("Google Sheets", `<div class="m-menu"><span>קובץ</span><span>עריכה</span><span>תצוגה</span><span>הוספה</span><span>עיצוב</span><span>נתונים</span><span class="mk" data-n="1">תוספים (Extensions)</span><span>עזרה</span></div>
    <div class="m-drop" style="margin-inline-start:260px"><div>תוספים</div><div class="mk" data-n="2">Apps Script</div></div>`),
  editor: () => mock("Apps Script", `<div class="m-row" style="justify-content:space-between"><b>החיה של ___</b><span class="m-btn m-blue">פריסה (Deploy) ▾</span></div>
    <div class="m-cols"><div class="m-side"><b>קבצים</b><span>Code.gs</span><span>Index.html</span><span>Engine.html</span><span class="mk" data-n="1">Pet.html</span></div>
    <div class="m-code">&lt;!-- Pet.html: כל מה ששייך לחיה שלי --&gt;\n&lt;style&gt;\n  ...\n&lt;!-- END Pet --&gt;</div></div>`),
  perm: () => mock("accounts.google.com", `<div class="m-dialog"><b>Google לא אימתה את האפליקציה הזו</b><div style="color:#5f6368">זו האפליקציה שלכם. זה בסדר.</div><div class="m-row"><span class="mk" data-n="1" style="color:#1a73e8">מתקדם (Advanced)</span></div><div class="mk" data-n="2" style="color:#1a73e8">מעבר אל החיה של ___ (לא בטוח)</div><div class="m-row" style="justify-content:flex-end"><span class="m-btn m-blue mk" data-n="3">אישור (Allow)</span></div></div>`),
  deploy: () => mock("Apps Script", `<div class="m-row" style="justify-content:flex-end"><span class="m-btn m-blue mk" data-n="1">פריסה (Deploy) ▾</span></div>
    <div class="m-drop" style="margin-inline-start:auto;margin-inline-end:0"><div class="mk" data-n="2">פריסה חדשה (New deployment)</div><div>ניהול פריסות (Manage deployments)</div></div>
    <div class="m-dialog"><div class="m-row"><span class="mk" data-n="3">⚙️</span> בחירת סוג: <b>אפליקציית אינטרנט (Web app)</b></div><div>הפעלה בתור (Execute as): <b>אני (Me)</b></div><div>למי יש גישה (Who has access): <span class="m-btn mk" data-n="4">כל אחד (Anyone) ▾</span></div><div class="m-row" style="justify-content:flex-end"><span class="m-btn m-blue mk" data-n="5">פריסה (Deploy)</span></div></div>`),
  url: () => mock("Apps Script", `<div class="m-dialog"><b>הפריסה עודכנה ✓</b><div>אפליקציית אינטרנט (Web app)</div><div class="m-row"><span class="m-code mk" data-n="1" style="flex:1">https://script.google.com/macros/s/.../exec</span><span class="m-btn mk" data-n="2">העתקה</span></div></div>`),
  testdep: () => mock("Apps Script", `<div class="m-row" style="justify-content:flex-end"><span class="m-btn m-blue mk" data-n="1">פריסה (Deploy) ▾</span></div>
    <div class="m-drop" style="margin-inline-start:auto;margin-inline-end:0"><div>פריסה חדשה (New deployment)</div><div>ניהול פריסות (Manage deployments)</div><div class="mk" data-n="2">בדיקת פריסות (Test deployments)</div></div>
    <div class="m-dialog"><div>אפליקציית אינטרנט (Web app)</div><div class="m-row"><span class="m-code mk" data-n="3" style="flex:1">https://script.google.com/macros/s/.../dev</span><span class="m-btn">העתקה</span></div></div>`),
  manage: () => mock("Apps Script", `<div class="m-row" style="justify-content:flex-end"><span class="m-btn m-blue mk" data-n="1">פריסה (Deploy) ▾</span></div>
    <div class="m-drop" style="margin-inline-start:auto;margin-inline-end:0"><div>פריסה חדשה (New deployment)</div><div class="mk" data-n="2">ניהול פריסות (Manage deployments)</div></div>
    <div class="m-dialog"><div class="m-row" style="justify-content:space-between"><b>הפריסה הפעילה</b><span class="mk" data-n="3">✏️</span></div><div>גרסה (Version): <span class="m-btn mk" data-n="4">גרסה חדשה (New version) ▾</span></div><div class="m-row" style="justify-content:flex-end"><span class="m-btn m-blue mk" data-n="5">פריסה (Deploy)</span></div></div>`),
  paste: () => mock("Apps Script · Pet.html", `<div class="m-code"><span class="mk" data-n="1" style="background:#fde68a">&lt;!-- Pet.html: כל מה ששייך לחיה שלי ...\n&lt;style&gt;\n  ...                 Ctrl+A מסמן הכול, Ctrl+V מדביק במקומו\n&lt;/script&gt;</span>\n<span class="mk" data-n="2">&lt;!-- END Pet --&gt;</span>   ← השורה האחרונה. חייבת להיות שם</div>`),
  sheet: key => mock("Google Sheets · pet", `<table class="m-sheet"><tr><th>key</th><th>value</th><th>max</th></tr><tr><td>name</td><td>ביצה</td><td></td></tr><tr><td>full</td><td>65</td><td>100</td></tr>${key ? `<tr class="new"><td><span class="mk" data-n="1">${esc(key)}</span></td><td>7</td><td></td></tr>` : ""}</table>`)
};
const road = list => `<div class="road">${list.map((x, i) => `<div><span class="rn">${i + 1}</span><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div>`;
const TRIO = `<div class="trio"><div><span class="ico">🖥️</span><b>הדף</b><span>מה שרואים. שוכח הכול ברענון</span></div><i>⇄</i>
  <div><span class="ico">⚙️</span><b>השרת</b><span>מקבל בקשות, וכותב בגיליון</span></div><i>⇄</i>
  <div><span class="ico">📊</span><b>הגיליון</b><span>הזיכרון של החיה</span></div></div>`;
const demoLink = () => ok(CFG.demo) ? `<a class="big-link" href="${esc(CFG.demo)}" target="_blank" rel="noopener">🐲 להאכיל את החיה של המורה</a>` : `<p class="missing">הקישור לחיה של המורה עוד לא הוגדר.</p>`;
const templateLink = () => ok(CFG.template) ? `<a class="big-link" href="${esc(copyLink(CFG.template))}" target="_blank" rel="noopener">🥚 לקחת ביצה</a>` : `<p class="missing">הקישור לביצה עוד לא הוגדר. מרימים יד.</p>`;
const vs = (bad, badWhy, good, goodWhy) => `<div class="vs"><div class="bad"><b>״${bad}״</b>${badWhy}</div><div class="good"><b>״${good}״</b>${goodWhy}</div></div>`;
const cycle = `<p class="cycle"><b>כל פעם אותו סיבוב:</b> מעתיקים את הקוד מג׳מיני ← ב־Pet.html: <kbd>Ctrl</kbd>+<kbd>A</kbd>, <kbd>Ctrl</kbd>+<kbd>V</kbd> ← <kbd>Ctrl</kbd>+<kbd>S</kbd> ← מרעננים את הדף שלכם.</p>`;
/* What to do when Gemini broke the pet: shown under "נתקעתי" in every step that talks to Gemini. */
const BROKE = [
  ["החיה נעלמה, או שהדף נשבר", "קודם כול: בעורך, <kbd>Ctrl</kbd>+<kbd>Z</kbd> כמה פעמים, עד שחוזר הקוד שעבד. <kbd>Ctrl</kbd>+<kbd>S</kbd>, ומרעננים."],
  ["יש הודעה אדומה בראש הדף", "מעולה, זה בדיוק מה שג׳מיני צריך לראות. מעתיקים אותה, וממלאים את דוח הבאג כאן למטה."],
  ["ג׳מיני הסתבך לגמרי", "גוללים למעלה בצ׳אט, לקוד האחרון שעבד, ומעתיקים אותו שוב. תקועים על זה כבר חמש דקות? מנסחים את הבקשה אחרת."]
];

/* ===== meeting 1: one action per step ===== */
const M1 = {
  n:1, title:"מפגש 1: החיה שלי",
  stations:[["מתחילים",0],["התוכנית",1],["הביצה",2],["בוקעת",5],["הכפתור שלי",8],["חברים",10]],
  steps:[
    { title:"היום: חיה שאתם המצאתם, באפליקציה אמיתית",
      body:`<p>עד סוף המפגש תהיה לכם אפליקציה עם חיה שאין לאף אחד אחר, וקישור שאפשר לשלוח לחברים.</p><p>קוד אתם לא כותבים. אתם מחליטים, וג׳מיני מקליד.</p>`,
      visual:() => road([["תוכנית","מי היא, ומה היא זוכרת"],["ביצה","אפליקציה אמיתית, באוויר"],["בוקעת","ג׳מיני בונה מה שתיארתם"],["כפתור משלכם","והיא זוכרת כל לחיצה"],["חבר","לוחץ מהמחשב שלו"]]) },

    { title:"התוכנית של החיה",
      body:`<p>זה החלק הכי חשוב היום. את הקוד ג׳מיני יכתוב בחצי דקה. להחליט מי היא, את זה הוא לא יכול לעשות במקומכם.</p><p>כל מה שתכתבו כאן, ג׳מיני יבנה. מה שלא תכתבו, הוא ינחש.</p>`,
      visual:() => cardForm(), mount:root => { bindCard(root); bindMine(root); },
      hints:["אין רעיון? מחברים שתי חיות (חתול־דג, ינשוף־קקטוס), או נותנים רגליים לענן.","את הכפתור בוחרים לפי מה שהיא רוצה. רוצה תשומת לב? לדגדג 🤣. רוצה שקט? לכבות לה את האור 🌙.","השורה בגיליון סופרת משהו: כמה פעמים דגדגו אותה, כמה שירים שרו לה."] },

    { title:"לוקחים ביצה",
      body:`<ol><li>לוחצים על הכפתור. נפתח חלון של Google.</li><li>בשם כותבים <b>החיה של</b> ואת הכינוי שלכם, ולוחצים <b>יצירת עותק</b>.</li><li>בגיליון שנפתח: <b>תוספים</b>, ואז <b>Apps Script</b>.</li></ol>`,
      visual:() => templateLink() + MOCK.copy() + MOCK.ext() + MOCK.editor(),
      expect:"נפתח עורך עם ארבעה קבצים. Pet.html הוא הקובץ של החיה, וכרגע יש בו רק ביצה.",
      note:"קיבלתם אפליקציה ריקה: דף, שרת וגיליון, וביצה באמצע. כל מה שיקרה לביצה מעכשיו, אתם מחליטים.",
      stuck:[["כתוב שאין הרשאה","בודקים שאתם מחוברים לחשבון של משרד החינוך. לא עוזר? מרימים יד."],["אין Apps Script בתפריט, או שכתוב שהוא חסום","מרימים יד. בינתיים ממשיכים לשלב ״ג׳מיני שואל, אתם עונים״."]] },

    { title:"מעלים את הביצה לאוויר",
      body:`<ol><li>בעורך: <b>פריסה</b>, ואז <b>פריסה חדשה</b>.</li><li>ליד ״בחירת סוג״ לוחצים על ⚙️, ובוחרים <b>אפליקציית אינטרנט</b>.</li><li>ב״למי יש גישה״ בוחרים <b>כל אחד</b>, ולוחצים <b>פריסה</b>.</li><li>Google שואלת אם מותר לאפליקציה לכתוב בגיליון שלכם. עונים שמותר: <b>הרשאת גישה</b>, בוחרים את החשבון, <b>מתקדם</b>, <b>מעבר אל החיה של...</b>, <b>אישור</b>.</li><li>מעתיקים את הקישור, ופותחים אותו בכרטיסייה חדשה.</li></ol>`,
      visual:() => MOCK.deploy() + MOCK.perm() + MOCK.url(),
      expect:"ביצה, באינטרנט, בכתובת שהיא רק שלכם.",
      stuck:[["אין ״כל אחד״ ברשימה","בוחרים את האפשרות הכי פתוחה שיש, ומרימים יד."],["״Google לא אימתה את האפליקציה״","ברור שלא: בניתם אותה לפני דקה. מתקדם, ואז מעבר אל החיה של..."],["הדף ריק","חוזרים לעורך ובודקים שיש ארבעה קבצים. חסר אחד? מרימים יד."]] },

    { title:"מה הביצה זוכרת?",
      body:`<ol><li>מלטפים את הביצה 5 פעמים, ומאכילים אותה פעמיים.</li><li>מרעננים את הדף (<kbd>F5</kbd>). מה נשאר, ומה התאפס?</li><li>חוזרים לגיליון, ללשונית <b>pet</b>. מה כתוב ליד <b>full</b> (השובע)?</li><li>ליד <b>full</b> כותבים <b>5</b>, ולוחצים <kbd>Enter</kbd>. חוזרים לביצה, ומחכים כמה שניות. מה השתנה?</li></ol>`,
      visual:() => TRIO,
      expect:"הליטופים התאפסו, והשובע נשאר. הליטופים היו רק בדף, ודף שוכח הכול ברגע שמרעננים אותו. השובע עבר דרך השרת ונכתב בגיליון. ומה שכתוב בגיליון, זה מה שהחיה זוכרת." },

    { title:"ג׳מיני שואל, אתם עונים",
      body:`<ol><li>פותחים את <a href="https://gemini.google.com" target="_blank" rel="noopener"><b>gemini.google.com</b></a> בכרטיסייה חדשה, בחשבון של משרד החינוך.</li><li>מעתיקים את ההודעה, ומדביקים אותה בג׳מיני.</li><li>עונים לו על כל שאלה. שאלה משעממת? כותבים לו ״שאלה אחרת״.</li></ol>`,
      visual:() => livePrompt("ask", "מדביקים בג׳מיני") + MOCK.gemini() + vs("תעשה לי חיה", "ג׳מיני ממציא חיה שלא אתם בחרתם.", "זאת התוכנית. תשאל אותי קודם", "ג׳מיני בונה את החיה שלכם."),
      mount:root => bindMine(root),
      note:"ג׳מיני לא מכיר את החיה שלכם. כל מה שלא תגידו לו, הוא ינחש.",
      stuck:[["כתוב שאין גישה לג׳מיני","בודקים שזה החשבון של משרד החינוך, ולא חשבון אחר. עדיין אין גישה? מרימים יד."],["הוא התחיל לכתוב קוד בלי לשאול","כותבים לו: ״עצור. עדיין בלי קוד. קודם תשאל אותי 3 שאלות.״"]] },

    { title:"הביצה בוקעת",
      body:`<ol><li>כותבים בתיבה מה סיכמתם עם ג׳מיני, במילים שלכם.</li><li>מעתיקים את ההודעה, ומדביקים אותה באותו צ׳אט.</li><li>ג׳מיני שולח קוד. לוחצים על כפתור ההעתקה שמעל הקוד.</li><li>בעורך פותחים את <b>Pet.html</b>. <kbd>Ctrl</kbd>+<kbd>A</kbd> מסמן הכול, <kbd>Ctrl</kbd>+<kbd>V</kbd> מדביק במקומו. שומרים: <kbd>Ctrl</kbd>+<kbd>S</kbd>.</li><li><b>פריסה</b>, ואז <b>בדיקת פריסות</b>. מעתיקים את הקישור שנגמר ב־<code>/dev</code>, ופותחים אותו.</li><li>היא עדיין נקראת ״ביצה״? השם שלה כתוב בגיליון. בלשונית <b>pet</b>, ליד <b>name</b>, כותבים את השם האמיתי שלה.</li></ol>`,
      visual:() => mineBox("decided", "מה סיכמתם עם ג׳מיני?", "למשל: עיניים ענקיות, רקע של לילה, וכשהיא רעבה היא נהיית אדומה") + livePrompt("hatch", "מדביקים באותו צ׳אט", [["decided", 4]]) + MOCK.paste() + MOCK.testdep(),
      mount:root => bindMine(root),
      expect:"הביצה בקעה, ויש לכם חיה שאין לאף אחד אחר. הקישור הזה הוא שלכם: הוא תמיד מראה את מה ששמרתם הרגע. משאירים אותו פתוח.",
      note:"השורה האחרונה בקובץ חייבת להיות <code>&lt;!-- END Pet --&gt;</code>. אין אותה? ג׳מיני נעצר באמצע. כותבים לו: ״נעצרת באמצע. תשלח שוב את הקובץ המלא, עד END Pet.״",
      tools:true },

    { title:"לא בדיוק מה שרציתם?",
      body:`<p>זה אף פעם לא יוצא מושלם בפעם הראשונה. גם לא למי שזה המקצוע שלו. בוחרים דבר אחד שמפריע לכם, ואומרים לג׳מיני בדיוק מה.</p>`,
      visual:() => talkBox() + cycle + vs("זה לא יפה, תתקן", "ג׳מיני מנחש מה לא יפה. לפעמים הוא מחליף לכם את כל החיה.", "תשנה רק את העיניים: גדולות פי שניים", "משתנה רק מה שביקשתם."),
      mount:root => bindMine(root),
      expect:"החיה נראית כמו שרציתם? מגבים: בגיליון, <b>קובץ</b>, <b>יצירת עותק</b>, ובשם כותבים <b>גיבוי 1</b>. אם משהו יישבר בהמשך, יש לאן לחזור.",
      tools:true },

    { title:"כפתור שיש רק לחיה שלכם",
      body:`<p>עכשיו הכפתור שתכננתם בהתחלה. רוצים לשנות בו משהו? זה הזמן.</p><ol><li>עוברים על ארבע התשובות שלכם.</li><li>מעתיקים את ההודעה, ומדביקים באותו צ׳אט.</li><li>קוראים את שלוש האפשרויות של ג׳מיני, ובוחרים אחת.</li></ol>`,
      visual:() => btnForm() + livePrompt("options", "מדביקים באותו צ׳אט", [["label", 1], ["does", 2], ["says", 1]]),
      mount:root => bindMine(root),
      hints:["אף אפשרות לא טובה? כותבים לו: ״עוד 3, יותר מצחיקות״.","אפשרות טובה, חוץ מדבר אחד? בשלב הבא כותבים לו מה לשנות בה."] },

    { title:"והיא זוכרת",
      body:`<ol><li>כותבים בתיבה איזו אפשרות בחרתם, ומה לשנות בה.</li><li>מעתיקים את ההודעה, ומדביקים בג׳מיני. <b>עוד לא שולחים.</b></li><li>בעורך, ב־<b>Pet.html</b>: <kbd>Ctrl</kbd>+<kbd>A</kbd>, <kbd>Ctrl</kbd>+<kbd>C</kbd>. חוזרים לג׳מיני, מדביקים מתחת להודעה, ושולחים.</li><li>את הקוד שחוזר מדביקים ב־<b>Pet.html</b>, במקום כל מה שיש שם (<kbd>Ctrl</kbd>+<kbd>A</kbd>, <kbd>Ctrl</kbd>+<kbd>V</kbd>). <kbd>Ctrl</kbd>+<kbd>S</kbd>, ומרעננים את הדף שלכם.</li><li>לוחצים על הכפתור החדש כמה פעמים, ופותחים את הגיליון, בלשונית <b>pet</b>.</li></ol>`,
      visual:() => mineBox("pick", "איזו אפשרות בחרתם, ומה לשנות בה?", "למשל: אפשרות 2, אבל שהיא תקפוץ יותר גבוה") + livePrompt("build", "מדביקים באותו צ׳אט, ומתחת מדביקים את הקובץ", [["pick", 3]]) + MOCK.sheet(keyName()),
      mount:root => bindMine(root),
      expect:"בגיליון יש שורה חדשה, בשם שאתם בחרתם, והמספר בה עולה בכל לחיצה. לא אתם כתבתם אותה: הדף ביקש מהשרת, והשרת כתב. עכשיו מקלידים 40 במקום המספר הזה, וחוזרים לחיה. אחרי כמה שניות המספר משתנה גם בדף.",
      tools:true },

    { title:"חבר לוחץ",
      body:`<p>אם תשלחו עכשיו את הקישור לחבר, הוא יראה ביצה. הקישור של החברים מתעדכן רק כשמפרסמים גרסה חדשה.</p><ol><li><b>פריסה</b>, <b>ניהול פריסות</b>, ואז ✏️.</li><li>ב״גרסה״ בוחרים <b>גרסה חדשה</b>, ולוחצים <b>פריסה</b>.</li><li>שולחים לחבר את הקישור שנגמר ב־<code>/exec</code>: במייל של משרד החינוך, או בצ׳אט של Google.</li><li>החבר כותב כינוי, ולוחץ על הכפתור שהמצאתם.</li></ol>`,
      visual:() => MOCK.manage() + TRIO,
      expect:"המספר בגיליון שלכם עלה, והלחיצה הייתה במחשב של החבר. הוא לא נגע בגיליון, ולא שלח לכם שום קובץ. הדף אצלו ביקש מהשרת שלכם, והשרת כתב.",
      stuck:[["החבר עדיין רואה ביצה","לא פרסמתם גרסה חדשה, או שלא שמרתם קודם (Ctrl+S)."],["החבר צריך להתחבר לחשבון","בפריסה, ב״למי יש גישה״, לא נבחר ״כל אחד״. בוחרים אותו, ומפרסמים שוב גרסה חדשה."],["אי אפשר לשלוח קישור","החבר בא אליכם ולוחץ אצלכם, או שמרימים יד."]] },

    { title:"מגבים, וזהו",
      body:`<ol><li>בגיליון: <b>קובץ</b>, ואז <b>יצירת עותק</b>.</li><li>בשם כותבים <b>גיבוי 2</b>.</li></ol>`,
      expect:"בשבוע הבא היא מתחילה לחיות: היא נהיית רעבה לבד, יש לה מצבי רוח, והיא מתגעגעת כשאתם לא באים.",
      note:`רוצים להבין איפה החיה גרה באמת? יש על זה דף נפרד: <a href="#lib1"><b>איפה החיה שלי גרה?</b></a> לא חובה.` }
  ],
  challenges:[
    ["btn2", "עוד כפתור", "כפתור רביעי, עם שורה משלו בגיליון. אותו סיבוב כמו קודם."],
    ["lines", "שלושה משפטים", "מבקשים מג׳מיני 3 אפשרויות למשפט שהיא אומרת כשהיא שמחה, ובוחרים אחת."],
    ["why", "מה זה server.add?", "מבקשים מג׳מיני להסביר בשתי שורות, בלי קוד, מה קורה מהרגע שלוחצים על הכפתור ועד שהמספר בגיליון משתנה."]
  ]
};
