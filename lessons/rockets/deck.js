/* ============================================================
   MAKE · שיעור רקטות — לוגיקת המצגת
   ניווט, חידונים, משחקים, אפקטים
   ============================================================ */
(function () {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ============================================================
     רקע כוכבים (2D)
     ============================================================ */
  (function stars() {
    const c = $('#stars'), g = c.getContext('2d');
    let W, H, pts = [];
    function build() {
      W = c.width = innerWidth * devicePixelRatio;
      H = c.height = innerHeight * devicePixelRatio;
      c.style.width = innerWidth + 'px';
      c.style.height = innerHeight + 'px';
      const n = Math.round((innerWidth * innerHeight) / 5200);
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: (Math.random() * 1.25 + .25) * devicePixelRatio,
        a: Math.random(), s: .25 + Math.random() * .9,
        h: Math.random() < .12,
      }));
    }
    build();
    addEventListener('resize', build);
    let t = 0;
    (function loop() {
      requestAnimationFrame(loop);
      t += .016;
      g.clearRect(0, 0, W, H);
      for (const p of pts) {
        const a = .18 + .62 * Math.abs(Math.sin(t * p.s + p.a * 9));
        g.globalAlpha = a;
        g.fillStyle = p.h ? '#8fc9ff' : '#ffffff';
        g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.283); g.fill();
      }
      g.globalAlpha = 1;
    })();
  })();

  /* ============================================================
     אפקטים: קונפטי + הבזק
     ============================================================ */
  const FX = (function () {
    const c = $('#fx'), g = c.getContext('2d');
    let W, H, parts = [];
    function size() {
      W = c.width = innerWidth * devicePixelRatio;
      H = c.height = innerHeight * devicePixelRatio;
      c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px';
    }
    size(); addEventListener('resize', size);
    const COLORS = ['#ffc61e', '#f5a421', '#0094ff', '#4db4ff', '#ffffff', '#2fd07a'];
    (function loop() {
      requestAnimationFrame(loop);
      g.clearRect(0, 0, W, H);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += 0.34 * devicePixelRatio;
        p.vx *= .995;
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        p.life -= 1;
        if (p.life <= 0 || p.y > H + 60) { parts.splice(i, 1); continue; }
        g.save();
        g.translate(p.x, p.y); g.rotate(p.rot);
        g.globalAlpha = clamp(p.life / 45, 0, 1);
        g.fillStyle = p.c;
        g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        g.restore();
      }
      g.globalAlpha = 1;
    })();
    return {
      burst(x, y, n) {
        x = (x === undefined ? innerWidth / 2 : x) * devicePixelRatio;
        y = (y === undefined ? innerHeight / 2 : y) * devicePixelRatio;
        for (let i = 0; i < (n || 90); i++) {
          const a = Math.random() * Math.PI * 2, sp = (4 + Math.random() * 13) * devicePixelRatio;
          parts.push({
            x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 6 * devicePixelRatio,
            w: (5 + Math.random() * 7) * devicePixelRatio, h: (8 + Math.random() * 10) * devicePixelRatio,
            rot: Math.random() * 6, vr: (Math.random() - .5) * .35,
            c: COLORS[(Math.random() * COLORS.length) | 0], life: 90 + Math.random() * 60,
          });
        }
      },
      rain(n) {
        for (let i = 0; i < (n || 120); i++) {
          parts.push({
            x: Math.random() * W, y: -40 * devicePixelRatio - Math.random() * H * .5,
            vx: (Math.random() - .5) * 3 * devicePixelRatio, vy: (2 + Math.random() * 5) * devicePixelRatio,
            w: (5 + Math.random() * 7) * devicePixelRatio, h: (9 + Math.random() * 11) * devicePixelRatio,
            rot: Math.random() * 6, vr: (Math.random() - .5) * .3,
            c: COLORS[(Math.random() * COLORS.length) | 0], life: 240,
          });
        }
      },
    };
  })();

  /* ============================================================
     ספירה לאחור 3·2·1 — הרגע שבו כל הכיתה סופרת בקול
     ============================================================ */
  const Countdown = (function () {
    const box = $('#countdown'), num = box.querySelector('b');
    let busy = false;
    return {
      get busy() { return busy; },
      run(done) {
        if (busy) return;
        busy = true;
        const seq = ['3', '2', '1', 'שיגור!'];
        let k = 0;
        box.classList.add('on');
        (function step() {
          if (k >= seq.length) {
            box.classList.remove('on');
            busy = false;
            done && done();
            return;
          }
          num.textContent = seq[k];
          num.classList.toggle('go', k === seq.length - 1);
          // Web Animations — מובטח שמתחיל מחדש בכל ספרה, בלי טריקים של reflow
          num.animate(
            [{ transform: 'scale(2.05)', opacity: 0 },
             { transform: 'scale(1)', opacity: 1, offset: .30 },
             { transform: 'scale(1)', opacity: 1 }],
            { duration: 600, easing: 'cubic-bezier(.15,1.5,.4,1)' }
          );
          k++;
          setTimeout(step, 620);
        })();
      },
    };
  })();

  /* ============================================================
     ניקוד + טיימר
     ============================================================ */
  let score = 0;
  function addScore(n) {
    score += n;
    const el = $('#score-n');
    el.textContent = score;
    el.parentElement.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }],
      { duration: 420, easing: 'cubic-bezier(.2,1.4,.4,1)' }
    );
  }

  const Timer = (function () {
    let left = 15 * 60, running = false, id = null;
    const el = $('#timer-t');
    function paint() {
      const m = Math.floor(Math.max(0, left) / 60), s = Math.max(0, left) % 60;
      el.textContent = m + ':' + String(s).padStart(2, '0');
      el.style.color = left <= 60 ? '#ff5c6e' : (left <= 180 ? '#ffc61e' : '');
    }
    paint();
    function tick() { if (left > 0) { left--; paint(); } }
    $('#timer').addEventListener('click', () => (running ? stop() : start()));
    function start() { if (running) return; running = true; id = setInterval(tick, 1000); $('#timer').style.borderColor = 'rgba(255,198,30,.5)'; }
    function stop() { running = false; clearInterval(id); $('#timer').style.borderColor = ''; }
    return { start, stop, get running() { return running; } };
  })();

  /* ============================================================
     ניווט בין שקפים
     ============================================================ */
  const slides = $$('.slide');
  const dotsWrap = $('#dots');
  let idx = -1;

  slides.forEach((s, i) => {
    const d = document.createElement('button');
    d.className = 'dot kind-' + (s.dataset.kind || 'learn');
    d.title = 'שקף ' + (i + 1);
    d.addEventListener('click', () => go(i));
    dotsWrap.appendChild(d);
  });
  const dots = $$('.dot');

  function go(i) {
    i = clamp(i, 0, slides.length - 1);
    if (i === idx) return;
    if (idx >= 0) slides[idx].classList.remove('active');
    idx = i;
    const s = slides[idx];
    s.classList.add('active');

    dots.forEach((d, k) => {
      d.classList.toggle('active', k === idx);
      if (k <= idx) d.classList.add('seen');
    });
    $('#prev').disabled = idx === 0;
    $('#next').disabled = idx === slides.length - 1;

    // חיבור סצנת התלת-ממד
    const sceneName = s.dataset.scene;
    const host = s.querySelector('.stage');
    if (sceneName && host && window.Stage3D) {
      Stage3D.mount(sceneName, host);
    } else if (window.Stage3D) {
      Stage3D.unmount();
    }
    const c = Ctl[s.dataset.id];
    if (c && c.enter) c.enter();
    if (!Timer.running && idx > 0) Timer.start();
  }

  $('#next').addEventListener('click', () => go(idx + 1));
  $('#prev').addEventListener('click', () => go(idx - 1));
  $$('[data-go="next"]').forEach(b => b.addEventListener('click', () => go(idx + 1)));

  addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    // RTL: חץ שמאל = קדימה
    if (e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(idx + 1); }
    else if (e.key === 'ArrowRight' || e.key === 'PageUp') { e.preventDefault(); go(idx - 1); }
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(slides.length - 1);
    else if (e.key === 'f' || e.key === 'F') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    }
  });

  // החלקה במגע
  (function swipe() {
    let x0 = null, y0 = null;
    $('#slides').addEventListener('touchstart', e => {
      if (e.touches.length !== 1) return;
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    $('#slides').addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      const dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 1.6) go(idx + (dx > 0 ? -1 : 1));
      x0 = null;
    }, { passive: true });
  })();

  /* ============================================================
     מחוונים — צביעת המסלול
     ============================================================ */
  function paintRange(r) {
    const pct = ((r.value - r.min) / (r.max - r.min)) * 100;
    r.style.setProperty('--pct', pct + '%');
  }
  $$('input[type=range]').forEach(r => {
    paintRange(r);
    r.addEventListener('input', () => paintRange(r));
  });

  /* ============================================================
     חידונים
     ============================================================ */
  function initQuiz(box, onDone) {
    const answer = parseInt(box.dataset.answer, 10);
    const opts = $$('.opt', box);
    const explain = $('.explain', box);
    let tries = 0, solved = false;
    opts.forEach((o, i) => {
      o.addEventListener('click', () => {
        if (solved) return;
        tries++;
        if (i === answer) {
          solved = true;
          o.classList.add('correct', 'locked');
          opts.forEach(x => { x.classList.add('locked'); if (x !== o) x.classList.add('dimmed'); });
          explain.classList.add('show');
          const r = o.getBoundingClientRect();
          FX.burst(r.left + r.width / 2, r.top + r.height / 2, 110);
          addScore(tries === 1 ? 10 : 5);
          if (onDone) onDone();
        } else {
          o.classList.add('wrong');
          setTimeout(() => o.classList.remove('wrong'), 500);
          o.classList.add('dimmed', 'locked');
        }
      });
    });
  }
  $$('.quiz').forEach(q => initQuiz(q));

  /* ============================================================
     בקרים לכל שקף — ממופתחים לפי data-id ולא לפי מיקום,
     כדי שאפשר יהיה להוסיף/להסיר שקפים בלי לשבור כלום
     ============================================================ */
  const Ctl = {};

  /* ---------- ניוטון ---------- */
  Ctl.newton = (function () {
    const sl = $('#nw-slider'), out = $('#nw-inf');
    const go = $('#nw-go'), rst = $('#nw-reset');
    let launched = 0;
    function sync() {
      out.textContent = sl.value + '%';
      const s = Stage3D.inst('newton');
      if (s) s.setInflate(sl.value / 100);
    }
    sl.addEventListener('input', sync);
    go.addEventListener('click', () => {
      const s = Stage3D.inst('newton');
      if (!s) return;
      s.release();
      launched++;
      FX.burst(undefined, innerHeight * .5, 30);
      if (launched === 1) addScore(5);
      go.disabled = true;
      s.onLand = () => { go.disabled = false; };
      setTimeout(() => { go.disabled = false; }, 5000);
    });
    rst.addEventListener('click', () => { const s = Stage3D.inst('newton'); if (s) s.reset(); go.disabled = false; });
    return { enter: sync };
  })();

  /* ---------- מנוע רקטי ---------- */
  Ctl.engine = (function () {
    const sl = $('#en-slider'), out = $('#en-ex');
    const fire = $('#en-fire'), cut = $('#en-cut'), lab = $('#en-lab');
    const bLiq = $('#en-liquid'), bSol = $('#en-solid');
    const cLiq = $('#en-card-liquid'), cSol = $('#en-card-solid');
    let on = false, cutOn = true, labOn = true, solid = false;

    function setFuel(v) {
      solid = v;
      bLiq.classList.toggle('on', !v);
      bSol.classList.toggle('on', v);
      cLiq.hidden = v; cSol.hidden = !v;
      const s = Stage3D.inst('engine');
      if (s) s.setSolid(v);
    }
    bLiq.addEventListener('click', () => setFuel(false));
    bSol.addEventListener('click', () => setFuel(true));
    function sync() {
      out.textContent = sl.value + '%';
      const s = Stage3D.inst('engine');
      if (s) s.setExplode(sl.value / 100);
    }
    sl.addEventListener('input', sync);
    fire.addEventListener('click', () => {
      const s = Stage3D.inst('engine'); if (!s) return;
      on = !on; s.setIgnition(on);
      fire.textContent = on ? '⏹ כיבוי מנוע' : '🔥 הצתה!';
      fire.classList.toggle('blue', on);
      if (on) FX.burst(innerWidth * 0.32, innerHeight * 0.75, 45);
    });
    cut.addEventListener('click', () => {
      const s = Stage3D.inst('engine'); if (!s) return;
      cutOn = !cutOn; s.setCut(cutOn);
      cut.classList.toggle('on', cutOn);
      cut.textContent = cutOn ? 'חתך פתוח' : 'חתך סגור';
    });
    lab.addEventListener('click', () => {
      const s = Stage3D.inst('engine'); if (!s) return;
      labOn = !labOn; s.setLabels(labOn);
      lab.classList.toggle('on', labOn);
    });
    return {
      enter() {
        const s = Stage3D.inst('engine'); if (!s) return;
        s.setSolid(solid); s.setExplode(sl.value / 100);
        s.setCut(cutOn); s.setLabels(labOn); s.setIgnition(on);
      },
    };
  })();

  /* ---------- משחק ההרכבה ---------- */
  Ctl.build = (function () {
    // המונחים תואמים למינוח שבתוכנית הלימודים: מקטע הנעה / ניהוג וייצוב / מטען מועיל
    const PARTS = [
      { i: 0, em: '🔥', name: 'מקטע ההנעה', sub: 'המנוע והסנפירים — תמיד למטה' },
      { i: 1, em: '🛢️', name: 'מיכלי הדלק', sub: 'מה שנשרף' },
      { i: 2, em: '📦', name: 'המטען המועיל', sub: 'מה שהרקטה נושאת — בשביל זה טסים' },
      { i: 3, em: '🔺', name: 'החרטום', sub: 'חותך את האוויר בראש' },
    ];
    const wrap = $('#bd-parts'), track = $('#bd-track');
    const launch = $('#bd-launch'), reset = $('#bd-reset'), verdict = $('#bd-verdict');
    let next = 0, scored = false;

    function build() {
      wrap.innerHTML = '';
      track.innerHTML = '';
      PARTS.forEach((_, k) => {
        const s = document.createElement('div');
        s.className = 'slot';
        s.textContent = ['תחתית ↓', 'שלב 2', 'שלב 3', 'ראש ↑'][k];
        track.appendChild(s);
      });
      const order = PARTS.slice().sort(() => Math.random() - .5);
      order.forEach(p => {
        const b = document.createElement('button');
        b.className = 'part';
        b.innerHTML = `<span class="em">${p.em}</span><span>${p.name}<small>${p.sub}</small></span>`;
        b.addEventListener('click', () => pick(p, b));
        wrap.appendChild(b);
      });
    }

    function pick(p, btn) {
      if (btn.classList.contains('used')) return;
      const s = Stage3D.inst('build');
      if (p.i === next) {
        btn.classList.add('used');
        const slot = track.children[next];
        slot.classList.add('filled');
        slot.textContent = p.em + ' ' + p.name;
        if (s) s.place(p.i);
        next++;
        verdict.className = 'verdict good';
        verdict.textContent = next < 4 ? `יופי! ${next} מתוך 4 — מה בא אחריו?` : '🎉 הרקטה מוכנה. לחצו "שגרו"!';
        if (next === 4) {
          launch.disabled = false;
          FX.burst(undefined, innerHeight * .5, 90);
          if (!scored) { scored = true; addScore(15); }
        }
      } else {
        btn.classList.add('bad');
        setTimeout(() => btn.classList.remove('bad'), 420);
        verdict.className = 'verdict bad';
        verdict.textContent = next === 0
          ? 'לא מזה מתחילים. מה תמיד נמצא בתחתית של רקטה?'
          : 'עוד לא. תחשבו: מה בא ישר מעל ' + PARTS[next - 1].name + '?';
      }
    }

    launch.addEventListener('click', () => {
      launch.disabled = true;
      verdict.className = 'verdict';
      verdict.textContent = '📣 כל הכיתה סופרת: 3 · 2 · 1…';
      Countdown.run(() => {
        const s = Stage3D.inst('build'); if (s) s.launch();
        FX.rain(140);
        verdict.className = 'verdict good';
        verdict.textContent = '🚀 שיגור מוצלח!';
      });
    });
    reset.addEventListener('click', () => { next = 0; launch.disabled = true; build(); const s = Stage3D.inst('build'); if (s) s.reset(); verdict.className = 'verdict'; verdict.textContent = 'מחכה לחלק הראשון…'; });

    build();
    return { enter() { } };
  })();

  /* ---------- ציר הזמן ---------- */
  Ctl.history = (function () {
    const ERAS = [
      {
        y: '1232', n: 'חץ האש הסיני', s: 'סין · הרקטה הראשונה',
        t: 'לוחמים סינים לקחו קנה במבוק, מילאו אותו באבק שריפה וקשרו אותו לחץ. האבק בער, הגזים יצאו מהקצה — והחץ טס לבד. זו הרקטה הראשונה בעולם. 800 שנה עברו מאז, והעיקרון לא השתנה בכלל.',
      },
      {
        y: '1926', n: 'הרקטה של גודארד', s: 'ארה"ב · הראשונה עם דלק נוזלי',
        t: 'רוברט גודארד שיגר בשדה של הדודה שלו את הרקטה הראשונה בעולם שרצה על דלק נוזלי. היא עלתה 12 מטר, עפה שתי שניות וחצי, ונפלה בשדה כרוב. בעיתונים צחקו עליו — והיום כל רקטה בעולם בנויה לפי הרעיון שלו.',
      },
      {
        y: '1942', n: 'V-2', s: 'גרמניה · הראשונה שהגיעה לחלל',
        t: 'הרקטה הראשונה שהצליחה להגיע עד לחלל — 188 ק"מ למעלה. בנו אותה בגרמניה הנאצית ככלי נשק, ואת העבודה הקשה עשו אסירים שהוכרחו לזה. אחרי המלחמה המדענים והתוכניות הגיעו לאמריקה ולרוסיה — ומשם התחיל המרוץ לחלל.',
      },
      {
        y: '1957', n: 'ספוטניק 1', s: 'רוסיה · הלוויין הראשון',
        t: 'כדור מתכת בגודל של כדורסל עם ארבע אנטנות. זה החפץ הראשון שבני אדם שלחו להקיף את כדור הארץ. כל שעה וחצי הוא השלים סיבוב, ושידר "ביפ… ביפ…" שכל אחד בעולם יכול היה לשמוע ברדיו.',
      },
      {
        y: '1969', n: 'סטרן 5 · אפולו 11', s: 'ארה"ב · לירח וחזרה',
        t: 'הרקטה הכי גדולה שהטיסה בני אדם: גובה של בניין בן 36 קומות. כמעט כל המשקל שלה היה דלק — והוא נשרף כולו תוך 12 דקות. היא לקחה שלושה אנשים עד הירח והחזירה אותם הביתה.',
      },
      {
        y: '2015', n: 'פאלקון 9', s: 'ספייס-אקס · הרקטה שחוזרת',
        t: 'בפעם הראשונה אי פעם, רקטה סובבה את עצמה באוויר, הדליקה מנועים כדי לבלום, ונחתה בעמידה על ארבע רגליים. עד אז כל רקטה הייתה לשימוש אחד בלבד. מאותו יום אפשר לתדלק ולשגר שוב — וטיסה לחלל נעשתה הרבה יותר זולה.',
      },
    ];
    const list = $('#hi-list'), title = $('#hi-title'), text = $('#hi-text');
    let cur = -1, visited = 0;

    ERAS.forEach((e, i) => {
      const b = document.createElement('button');
      b.className = 'tl-item';
      b.innerHTML = `<span class="yr">${e.y}</span><span class="nm">${e.n}<small>${e.s}</small></span>`;
      b.addEventListener('click', () => show(i));
      list.appendChild(b);
    });
    const items = $$('.tl-item', list);

    function show(i) {
      cur = i;
      items.forEach((b, k) => b.classList.toggle('on', k === i));
      title.textContent = ERAS[i].y + ' · ' + ERAS[i].n;
      text.textContent = ERAS[i].t;
      const s = Stage3D.inst('history');
      if (s) s.show(i);
      if (!items[i].dataset.seen) {
        items[i].dataset.seen = '1';
        visited++;
        if (visited === ERAS.length) { addScore(10); FX.burst(undefined, innerHeight * .5, 80); }
      }
    }
    return { enter() { show(cur < 0 ? 0 : cur); } };
  })();

  /* ---------- רקטה מול טיל מונחה ---------- */
  Ctl.guided = (function () {
    const bPlain = $('#gd-plain'), bGuided = $('#gd-guided');
    const go = $('#gd-go'), rst = $('#gd-reset'), verdict = $('#gd-verdict');
    let guided = false, triedPlain = false, triedGuided = false;

    function setMode(v) {
      guided = v;
      bPlain.classList.toggle('on', !v);
      bGuided.classList.toggle('on', v);
      go.textContent = v ? '🎯 שגרו את הטיל המונחה!' : '🚀 שגרו את הרקטה!';
      const s = Stage3D.inst('guided');
      if (s) { s.reset(); s.setGuided(v); }
      verdict.className = 'verdict';
      verdict.textContent = v
        ? 'לטיל הזה יש מוח בראש. נראה אם זה עוזר…'
        : 'לרקטה הזאת אין הגה. מכוונים — ומקווים.';
    }
    bPlain.addEventListener('click', () => setMode(false));
    bGuided.addEventListener('click', () => setMode(true));

    go.addEventListener('click', () => {
      const s = Stage3D.inst('guided'); if (!s) return;
      if (s.state !== 'idle') s.reset();
      s.setGuided(guided);
      go.disabled = true;
      verdict.className = 'verdict';
      verdict.textContent = '📣 כולם סופרים בקול!';
      Countdown.run(() => fire(s));
    });

    function fire(s) {
      s.launch();
      verdict.className = 'verdict';
      verdict.textContent = '🚀 בדרך למטרה…';
      s.onResult = (hit) => {
        go.disabled = false;
        if (hit) {
          verdict.className = 'verdict good';
          verdict.textContent = '🎯 פגיעה! המוח בראש תיקן את הכיוון תוך כדי טיסה.';
          FX.burst(undefined, innerHeight * .45, 90);
          if (!triedGuided) { triedGuided = true; addScore(10); }
        } else {
          verdict.className = 'verdict bad';
          verdict.textContent = 'החטאנו. כוח המשיכה והרוח הסיטו אותה — ואין לה איך לתקן. נסו את הטיל המונחה!';
          if (!triedPlain) { triedPlain = true; addScore(5); }
        }
      };
      setTimeout(() => { go.disabled = false; }, 8000);
    }

    rst.addEventListener('click', () => {
      const s = Stage3D.inst('guided'); if (s) { s.reset(); s.setGuided(guided); }
      go.disabled = false;
    });

    setMode(false);
    return { enter() { const s = Stage3D.inst('guided'); if (s) { s.reset(); s.setGuided(guided); } } };
  })();

  /* ---------- רקטת הבקבוק ---------- */
  Ctl.bottle = (function () {
    const ex = $('#bo-slider'), exOut = $('#bo-ex');
    const wa = $('#bo-water'), waOut = $('#bo-w');
    function sync() {
      exOut.textContent = ex.value + '%';
      waOut.textContent = wa.value + '%';
      const s = Stage3D.inst('bottle');
      if (!s) return;
      s.setExplode(ex.value / 100);
      s.setWater(wa.value / 100);
    }
    ex.addEventListener('input', sync);
    wa.addEventListener('input', sync);
    return { enter: sync };
  })();

  /* ---------- סימולטור השיגור ---------- */
  Ctl.sim = (function () {
    const wa = $('#sm-water'), waOut = $('#sm-w');
    const ba = $('#sm-bar'), baOut = $('#sm-p');
    const hOut = $('#sm-h'), vOut = $('#sm-v'), bOut = $('#sm-best');
    const go = $('#sm-go'), rst = $('#sm-reset'), verdict = $('#sm-verdict');
    let best = 0, shots = 0;

    function cfg() { return { w: wa.value / 100, b: ba.value / 10 }; }
    function sync() {
      const c = cfg();
      waOut.textContent = wa.value + '%';
      baOut.textContent = c.b.toFixed(1) + ' בר';
      const s = Stage3D.inst('sim');
      if (s) { const r = s.preview(c.w, c.b); vOut.textContent = Math.round(r.dv); }
    }
    wa.addEventListener('input', sync);
    ba.addEventListener('input', sync);

    function advise(w, h) {
      if (w > 0.62) return ['bad', '💧 יותר מדי מים! לא נשאר מספיק אוויר שידחוף אותם החוצה.'];
      if (w < 0.18) return ['bad', '💨 כמעט רק אוויר. אין מספיק מים לזרוק אחורה — אז אין ממה להידחף.'];
      if (w >= 0.28 && w <= 0.45) return ['good', '🎯 בול! בערך שליש מים — בדיוק מה שנעשה בחוץ.'];
      return ['', '🙂 לא רע! נסו להתקרב לשליש מים (33%) — שם מגיעים הכי גבוה.'];
    }

    go.addEventListener('click', () => {
      const s = Stage3D.inst('sim'); if (!s) return;
      if (s.state !== 'idle') { s.reset(); }
      const c = cfg();
      go.disabled = true;
      verdict.className = 'verdict';
      verdict.textContent = '📣 כולם סופרים בקול!';
      Countdown.run(() => fire(s, c));
    });

    function fire(s, c) {
      const r = s.launch();
      if (!r) { go.disabled = false; return; }
      shots++;
      hOut.textContent = '…'; vOut.textContent = Math.round(r.dv);
      verdict.className = 'verdict';
      verdict.textContent = '🚀 בדרך למעלה…';
      s.onLand = (apex) => {
        const h = Math.round(apex);
        hOut.textContent = h;
        const [cls, msg] = advise(c.w, h);
        verdict.className = 'verdict ' + cls;
        verdict.textContent = msg;
        if (h > best) {
          best = h; bOut.textContent = best;
          FX.burst(undefined, innerHeight * .45, 80);
          if (shots === 1) addScore(5);
          if (cls === 'good') addScore(10);
        }
        go.disabled = false;
      };
      setTimeout(() => { go.disabled = false; }, 12000);
    }

    rst.addEventListener('click', () => { const s = Stage3D.inst('sim'); if (s) s.reset(); go.disabled = false; verdict.className = 'verdict'; verdict.textContent = 'בחרו כמה מים וכמה אוויר — ושגרו.'; hOut.textContent = '—'; });

    return { enter() { const s = Stage3D.inst('sim'); if (s) s.reset(); sync(); } };
  })();

  /* ---------- סיום ---------- */
  Ctl.finale = { enter() { setTimeout(() => FX.rain(160), 350); } };

  /* ============================================================
     הפעלה
     ============================================================ */
  function boot() {
    if (!window.THREE) {
      $('#loader').innerHTML = '<div class="lw"><p style="color:#ff5c6e">שגיאה בטעינת מנוע התלת־ממד.<br>ודאו שהתיקייה vendor/ נמצאת ליד הקובץ.</p></div>';
      return;
    }
    try {
      Stage3D.init();
    } catch (e) {
      console.error(e);
      $('#loader').innerHTML = '<div class="lw"><p style="color:#ff5c6e">הדפדפן לא תומך ב־WebGL.<br>נסו כרום או פיירפוקס מעודכנים.</p></div>';
      return;
    }
    go(0);
    setTimeout(() => $('#loader').classList.add('hide'), 650);
    setTimeout(() => { const l = $('#loader'); if (l) l.remove(); }, 1400);
  }

  if (document.readyState === 'complete') boot();
  else addEventListener('load', boot);
})();
