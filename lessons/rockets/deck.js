/* ============================================================
   MAKE · שיעור רקטות — לוגיקת המצגת
   ============================================================ */
(function () {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ============================================================
     קונפטי
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
    const COLORS = ['#ffc61e', '#f5a421', '#0094ff', '#4db4ff', '#1a9e5c', '#e0364c'];
    (function loop() {
      requestAnimationFrame(loop);
      g.clearRect(0, 0, W, H);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += .34 * devicePixelRatio;
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
            w: (6 + Math.random() * 8) * devicePixelRatio, h: (9 + Math.random() * 11) * devicePixelRatio,
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
            w: (6 + Math.random() * 8) * devicePixelRatio, h: (10 + Math.random() * 12) * devicePixelRatio,
            rot: Math.random() * 6, vr: (Math.random() - .5) * .3,
            c: COLORS[(Math.random() * COLORS.length) | 0], life: 240,
          });
        }
      },
    };
  })();

  /* ============================================================
     מייקי — ספרייטים מהרנדרים המקוריים.
     הנתונים מוטמעים ולא נטענים ב-fetch, כדי שיעבוד גם מ-file://
     ============================================================ */
  const MIKI = {
    hay:  { frames: 18, w: 262, h: 300, fps: 14 },
    like: { frames: 16, w: 262, h: 300, fps: 14 },
    jump: { frames: 16, w: 186, h: 300, fps: 16 },
    show: { frames: 18, w: 404, h: 300, fps: 14 },
    walk: { frames: 16, w: 205, h: 300, fps: 16 },
  };
  const mikis = [];
  function initMiki(el) {
    const d = MIKI[el.dataset.clip];
    if (!d) return;
    el.style.backgroundImage = `url(img/miki/${el.dataset.clip}.png)`;
    el.style.backgroundSize = (d.frames * 100) + '% 100%';
    el.style.height = (el.dataset.h || 26) + 'vh';
    el.style.aspectRatio = d.w + ' / ' + d.h;
    el.style.width = 'auto';
    mikis.push({ el, d, i: 0, acc: 0 });
  }
  $$('.miki').forEach(initMiki);
  (function tick() {
    requestAnimationFrame(tick);
    const now = performance.now();
    mikis.forEach(m => {
      if (!m.el.isConnected || !m.el.offsetParent) return;
      if (!m.last) m.last = now;
      const dt = Math.min(now - m.last, 200); m.last = now;
      m.acc += dt;
      const step = 1000 / m.d.fps;
      while (m.acc >= step) {
        m.acc -= step;
        m.i = (m.i + 1) % m.d.frames;
        m.el.style.backgroundPositionX = (m.i / (m.d.frames - 1) * 100) + '%';
      }
    });
  })();

  /* ============================================================
     ספירה לאחור
     ============================================================ */
  const Countdown = (function () {
    const box = $('#countdown'), num = box.querySelector('b');
    let busy = false;
    return {
      run(done) {
        if (busy) { done && done(); return; }
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
          num.animate(
            [{ transform: 'scale(2.05)', opacity: 0 },
             { transform: 'scale(1)', opacity: 1, offset: .3 },
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
     קרוסלה — פאנל שלא נגלל: פריט אחד בכל פעם
     ============================================================ */
  function initCarousel(root) {
    const items = $$('.car-item', root);
    if (!items.length) return null;
    const dots = document.createElement('div'); dots.className = 'car-dots';
    const prev = document.createElement('button'); prev.className = 'car-arrow'; prev.innerHTML = '→';
    const next = document.createElement('button'); next.className = 'car-arrow'; next.innerHTML = '←';
    const nav = document.createElement('div'); nav.className = 'car-nav';
    nav.append(prev, dots, next);
    root.appendChild(nav);
    let i = 0;
    const dotEls = items.map((_, k) => {
      const d = document.createElement('button');
      d.className = 'car-dot';
      d.addEventListener('click', () => show(k));
      dots.appendChild(d);
      return d;
    });
    function show(k) {
      i = clamp(k, 0, items.length - 1);
      items.forEach((el, n) => el.classList.toggle('on', n === i));
      dotEls.forEach((d, n) => d.classList.toggle('on', n === i));
      prev.disabled = i === 0;
      next.disabled = i === items.length - 1;
      if (root.onShow) root.onShow(i);
    }
    prev.addEventListener('click', () => show(i - 1));
    next.addEventListener('click', () => show(i + 1));
    show(0);
    return { show, get index() { return i; }, count: items.length };
  }
  const carousels = {};
  $$('.carousel').forEach(c => { carousels[c.dataset.car || c.id] = initCarousel(c); });

  /* ============================================================
     ניקוד + טיימר
     ============================================================ */
  let score = 0;
  function addScore(n) {
    score += n;
    const el = $('#score-n');
    el.textContent = score;
    el.parentElement.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.22)' }, { transform: 'scale(1)' }],
      { duration: 420, easing: 'cubic-bezier(.2,1.4,.4,1)' }
    );
  }

  const Timer = (function () {
    let left = 15 * 60, running = false, id = null;
    const el = $('#timer-t');
    function paint() {
      const m = Math.floor(Math.max(0, left) / 60), s = Math.max(0, left) % 60;
      el.textContent = m + ':' + String(s).padStart(2, '0');
      el.style.color = left <= 60 ? '#e0364c' : (left <= 180 ? '#c97a00' : '');
    }
    paint();
    $('#timer').addEventListener('click', () => (running ? stop() : start()));
    function start() { if (running) return; running = true; id = setInterval(() => { if (left > 0) { left--; paint(); } }, 1000); }
    function stop() { running = false; clearInterval(id); }
    return { start, get running() { return running; } };
  })();

  /* ============================================================
     ניווט
     ============================================================ */
  const slides = $$('.slide');
  const dotsWrap = $('#dots');
  let idx = -1;

  slides.forEach((s, i) => {
    const d = document.createElement('button');
    d.className = 'dot kind-' + (s.dataset.kind || 'learn');
    d.addEventListener('click', () => go(i));
    dotsWrap.appendChild(d);
  });
  const dots = $$('.dot');

  function go(i) {
    i = clamp(i, 0, slides.length - 1);
    if (i === idx) return;
    if (idx >= 0) {
      const prev = slides[idx];
      prev.classList.remove('active');
      const pc = Ctl[prev.dataset.id];
      if (pc && pc.leave) pc.leave();
    }
    idx = i;
    const s = slides[idx];
    s.classList.add('active');

    dots.forEach((d, k) => {
      d.classList.toggle('active', k === idx);
      if (k <= idx) d.classList.add('seen');
    });
    $('#prev').disabled = idx === 0;
    $('#next').disabled = idx === slides.length - 1;

    const sceneName = s.dataset.scene;
    const host = s.querySelector('.stage');
    if (sceneName && host && window.Stage3D) Stage3D.mount(sceneName, host);
    else if (window.Stage3D) Stage3D.unmount();

    const c = Ctl[s.dataset.id];
    if (c && c.enter) c.enter();
    if (!Timer.running && idx > 0) Timer.start();
  }

  $('#next').addEventListener('click', () => go(idx + 1));
  $('#prev').addEventListener('click', () => go(idx - 1));
  $$('[data-go="next"]').forEach(b => b.addEventListener('click', () => go(idx + 1)));

  addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(idx + 1); }
    else if (e.key === 'ArrowRight' || e.key === 'PageUp') { e.preventDefault(); go(idx - 1); }
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(slides.length - 1);
    else if (e.key === 'f' || e.key === 'F') {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    }
  });

  (function swipe() {
    let x0 = null, y0 = null;
    $('#slides').addEventListener('touchstart', e => {
      if (e.touches.length !== 1) return;
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    $('#slides').addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 1.6) go(idx + (dx > 0 ? -1 : 1));
      x0 = null;
    }, { passive: true });
  })();

  /* מחוונים */
  function paintRange(r) {
    r.style.setProperty('--pct', ((r.value - r.min) / (r.max - r.min)) * 100 + '%');
  }
  $$('input[type=range]').forEach(r => { paintRange(r); r.addEventListener('input', () => paintRange(r)); });

  /* ============================================================
     חידונים
     ============================================================ */
  $$('.quiz').forEach(box => {
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
        } else {
          o.classList.add('wrong');
          setTimeout(() => o.classList.remove('wrong'), 500);
          o.classList.add('dimmed', 'locked');
        }
      });
    });
  });

  /* ============================================================
     בקרים
     ============================================================ */
  const Ctl = {};

  /* ---------- הבלון ---------- */
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
      const s = Stage3D.inst('newton'); if (!s) return;
      s.release();
      if (++launched === 1) addScore(5);
      go.disabled = true;
      s.onLand = () => { go.disabled = false; };
      setTimeout(() => { go.disabled = false; }, 5000);
    });
    rst.addEventListener('click', () => { const s = Stage3D.inst('newton'); if (s) s.reset(); go.disabled = false; });
    return { enter: sync };
  })();

  /* ---------- מנוע רקטי ---------- */
  Ctl.engine = (function () {
    const LIQUID = [
      { k: 'shell', c: '#c3cede', n: 'מעטפת חיצונית',
        t: 'הגוף שעוטף את הכול. הוא צריך להיות חזק מספיק כדי לא להתקמט מהאוויר שנלחץ עליו במהירות של אלפי קמ״ש, וקל מספיק כדי שיהיה כדאי להרים אותו. עשוי מסגסוגות אלומיניום דקות מפחית שתייה — אבל מחוזקות מבפנים בטבעות.' },
      { k: 'ox', c: '#5ec0ff', n: 'מיכל מחמצן',
        t: 'כדי שמשהו יישרף צריך חמצן. במכונית הוא נשאב מהאוויר, אבל בחלל אין אוויר — אז הרקטה נושאת חמצן משלה, נוזלי וקפוא במינוס 183 מעלות. זה בדיוק מה שהופך מנוע רקטי לשונה מכל מנוע אחר בעולם.' },
      { k: 'fuel', c: '#ffc61e', n: 'מיכל דלק',
        t: 'מה שנשרף בפועל: נפט מזוקק, מימן נוזלי או מתאן. המיכל תופס את רוב האורך של הרקטה, ורוב המשקל בשיגור הוא פשוט דלק — בסטרן 5, מתוך 2,900 טון, כ־2,700 טון היו דלק ומחמצן.' },
      { k: 'pump', c: '#c9803a', n: 'משאבות טורבו',
        t: 'הלב של המנוע. הן שואבות דלק ומחמצן ודוחפות אותם פנימה בלחץ עצום — כמות מספיקה למלא בריכה ביתית בכמה שניות. הן מסתובבות כל כך מהר שהן מייצרות בעצמן כוח של מאות מכוניות.' },
      { k: 'chamber', c: '#b4c2d6', n: 'תא הבעירה',
        t: 'כאן הדלק והמחמצן נפגשים דרך מאות חורים זעירים, מתערבבים ונשרפים. הטמפרטורה מגיעה ל־3,300 מעלות — חם יותר ממה שהמתכת עצמה יכולה לסבול. הפתרון: הדלק הקר זורם בצינורות בתוך הקירות ומקרר אותם מבפנים לפני שהוא נשרף.' },
      { k: 'throat', c: '#8fa3bc', n: 'הגרון',
        t: 'הנקודה הצרה ביותר במנוע, וגם החשובה ביותר. הגז הלוהט נדחס לעבור דרך פתח קטן, ובדיוק כמו לשים אצבע על צינור מים — הוא יוצא הרבה יותר מהר. כאן הגז שובר את מהירות הקול.' },
      { k: 'nozzle', c: '#93a4bd', n: 'פעמון הסילון',
        t: 'החרוט הגדול בתחתית אינו קישוט. הגז שיצא מהגרון ממשיך להתפשט לאורכו וממשיך להאיץ, עד פי חמישה ממהירות הקול. ככל שהרקטה גבוהה יותר והאוויר דליל יותר, כך הפעמון צריך להיות רחב יותר — ולכן למנועי חלל יש פעמונים ענקיים.' },
    ];
    const SOLID = [
      { k: 'shell', c: '#c3cede', n: 'מעטפת חיצונית',
        t: 'אותה מעטפת בדיוק. מבחוץ אי אפשר לדעת אם המנוע נוזלי או מוצק.' },
      { k: 'solid', c: '#6b5a4a', n: 'גוש הדלק המוצק',
        t: 'כאן אין מיכלים, אין משאבות ואין צנרת. הדלק והמחמצן מעורבבים מראש לגוש קשה אחד, כמו גומי, עם חור בצורת כוכב לכל אורכו. האש מתחילה בחור ומתקדמת החוצה — וצורת הכוכב היא שקובעת כמה חזק המנוע ידחוף בכל רגע.' },
      { k: 'nozzle', c: '#93a4bd', n: 'פעמון הסילון',
        t: 'אותו תפקיד בדיוק: מכוון את הגז ומאיץ אותו החוצה.' },
    ];

    const list = $('#en-parts'), title = $('#en-title'), text = $('#en-text');
    const bExp = $('#en-explode'), bFire = $('#en-fire');
    const bLiq = $('#en-liquid'), bSol = $('#en-solid');
    let solid = false, fired = false, cur = null;

    function render() {
      const data = solid ? SOLID : LIQUID;
      list.innerHTML = '';
      data.forEach(p => {
        const b = document.createElement('button');
        b.className = (p.k === cur ? 'on' : '');
        b.innerHTML = `<span class="sw" style="background:${p.c}"></span><span>${p.n}</span>`;
        b.addEventListener('click', () => pick(p));
        list.appendChild(b);
      });
    }
    function pick(p) {
      cur = p.k;
      title.textContent = p.n;
      text.textContent = p.t;
      const s = Stage3D.inst('engine');
      if (s) s.select(p.k);
      render();
    }
    function setFuel(v) {
      solid = v; cur = null;
      bLiq.classList.toggle('on', !v);
      bSol.classList.toggle('on', v);
      title.textContent = 'בחרו חלק';
      text.textContent = v
        ? 'מנוע דלק מוצק בנוי מפחות חלקים — וזה בדיוק היתרון שלו.'
        : 'כל חלק במנוע עושה עבודה אחרת. לחצו על אחד מהם.';
      const s = Stage3D.inst('engine');
      if (s) { s.setSolid(v); s.clearSelection(); }
      render();
    }
    bLiq.addEventListener('click', () => setFuel(false));
    bSol.addEventListener('click', () => setFuel(true));

    bExp.addEventListener('click', () => {
      const s = Stage3D.inst('engine'); if (!s) return;
      const now = !s.exploded;
      s.setExploded(now);
      bExp.textContent = now ? 'הרכיבו בחזרה' : 'פרקו את המנוע';
    });
    bFire.addEventListener('click', () => {
      const s = Stage3D.inst('engine'); if (!s) return;
      const now = !s.ignition;
      s.setIgnition(now);
      bFire.textContent = now ? 'כיבוי' : 'הצתה';
      if (now && !fired) { fired = true; addScore(5); }
    });

    render();
    return {
      enter() {
        const s = Stage3D.inst('engine'); if (!s) return;
        s.setSolid(solid);
        if (cur) s.select(cur); else s.clearSelection();
        bExp.textContent = s.exploded ? 'הרכיבו בחזרה' : 'פרקו את המנוע';
        bFire.textContent = s.ignition ? 'כיבוי' : 'הצתה';
      },
    };
  })();

  /* ---------- משחק ההרכבה ---------- */
  Ctl.build = (function () {
    const PARTS = [
      { i: 0, em: '🔥', name: 'מקטע ההנעה' },
      { i: 1, em: '🛢️', name: 'מיכלי הדלק' },
      { i: 2, em: '📦', name: 'המטען המועיל' },
      { i: 3, em: '🔺', name: 'החרטום' },
    ];
    const wrap = $('#bd-parts'), track = $('#bd-track');
    const launch = $('#bd-launch'), reset = $('#bd-reset'), verdict = $('#bd-verdict');
    let next = 0, scored = false;

    function build() {
      wrap.innerHTML = ''; track.innerHTML = '';
      PARTS.forEach((_, k) => {
        const s = document.createElement('div');
        s.className = 'slot';
        s.textContent = ['תחתית', '2', '3', 'ראש'][k];
        track.appendChild(s);
      });
      PARTS.slice().sort(() => Math.random() - .5).forEach(p => {
        const b = document.createElement('button');
        b.className = 'part';
        b.innerHTML = `<span class="em">${p.em}</span><span>${p.name}</span>`;
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
        verdict.textContent = next < 4 ? `${next} מתוך 4` : 'הרקטה מוכנה לשיגור';
        if (next === 4) {
          launch.disabled = false;
          FX.burst(undefined, innerHeight * .5, 90);
          if (!scored) { scored = true; addScore(15); }
        }
      } else {
        btn.classList.add('bad');
        setTimeout(() => btn.classList.remove('bad'), 420);
        verdict.className = 'verdict bad';
        verdict.textContent = next === 0 ? 'לא מזה מתחילים' : 'מה בא ישר מעל ' + PARTS[next - 1].name + '?';
      }
    }

    launch.addEventListener('click', () => {
      launch.disabled = true;
      Countdown.run(() => {
        const s = Stage3D.inst('build'); if (s) s.launch();
        FX.rain(140);
        verdict.className = 'verdict good';
        verdict.textContent = 'שיגור מוצלח';
      });
    });
    reset.addEventListener('click', () => {
      next = 0; launch.disabled = true; build();
      const s = Stage3D.inst('build'); if (s) s.reset();
      verdict.className = 'verdict';
      verdict.textContent = 'מה נמצא בתחתית של כל רקטה?';
    });

    build();
    return {};
  })();

  /* ---------- ציר הזמן ---------- */
  Ctl.history = (function () {
    const ERAS = [
      { y: '1232', n: 'חץ האש הסיני',
        t: 'לוחמים סינים מילאו קנה במבוק באבק שריפה וקשרו אותו לחץ. האבק בער, הגזים יצאו מהקצה, והחץ טס בכוחות עצמו. זו הרקטה הראשונה בעולם — והעיקרון שלה לא השתנה מאז.' },
      { y: '1926', n: 'הרקטה של גודארד',
        t: 'שימו לב שהמנוע יושב דווקא בראש ולא בתחתית — גודארד חשב שכך הרקטה תיגרר ישר, כמו בלון שמושכים בחוט. זה לא עבד, וכל הרקטות מאז שמות את המנוע למטה. היא עלתה 12 מטר, עפה שתי שניות וחצי ונפלה בשדה כרוב.' },
      { y: '1942', n: 'V-2',
        t: 'הרקטה הראשונה שהגיעה עד לחלל — 188 קילומטר. היא נבנתה בגרמניה הנאצית ככלי נשק, בעבודת כפייה של אסירים שרבים מהם מתו. אחרי המלחמה המדענים והתוכניות התחלקו בין אמריקה לרוסיה, ומשם התחיל המרוץ לחלל.' },
      { y: '1957', n: 'ספוטניק 1',
        t: 'כדור מתכת בגודל כדורסל עם ארבע אנטנות — החפץ הראשון שבני אדם שלחו להקיף את כדור הארץ. כל שעה וחצי הוא השלים סיבוב שלם, ושידר צפצוף שכל אחד בעולם יכול היה לקלוט ברדיו.' },
      { y: '1969', n: 'סטרן 5',
        t: 'הרקטה הגדולה ביותר שהטיסה בני אדם: גובה של בניין בן 36 קומות. כמעט כל משקלה היה דלק, והוא נשרף כולו בתוך 12 דקות. היא לקחה שלושה אנשים אל הירח והחזירה אותם.' },
      { y: '2015', n: 'פאלקון 9',
        t: 'בפעם הראשונה בהיסטוריה, רקטה סובבה את עצמה באוויר, הדליקה מנועים כדי לבלום, ונחתה בעמידה על ארבע רגליים. עד אז כל רקטה שימשה פעם אחת בלבד. מאותו רגע אפשר לתדלק ולשגר שוב.' },
      { y: 'מחר', n: 'סטארשיפ',
        t: 'הרקטה הגדולה והחזקה ביותר שנבנתה אי פעם — 121 מטר, גבוהה יותר מסטרן 5. היא עשויה מפלדת אל-חלד, שני החלקים שלה אמורים לחזור ולנחות, והיא נבנתה כדי לקחת אנשים למאדים. זה הפרק שעדיין נכתב.' },
    ];
    const list = $('#hi-list'), title = $('#hi-title'), text = $('#hi-text');
    let cur = -1, visited = 0;

    ERAS.forEach((e, i) => {
      const b = document.createElement('button');
      b.innerHTML = `<span class="yr">${e.y}</span><span>${e.n}</span>`;
      b.addEventListener('click', () => show(i));
      list.appendChild(b);
    });
    const items = $$('button', list);

    function show(i) {
      cur = i;
      items.forEach((b, k) => b.classList.toggle('on', k === i));
      title.textContent = ERAS[i].y + ' · ' + ERAS[i].n;
      text.textContent = ERAS[i].t;
      const s = Stage3D.inst('history');
      if (s) s.show(i);
      if (!items[i].dataset.seen) {
        items[i].dataset.seen = '1';
        if (++visited === ERAS.length) { addScore(10); FX.burst(undefined, innerHeight * .5, 80); }
      }
    }
    return { enter() { show(cur < 0 ? 0 : cur); } };
  })();

  /* ---------- רקטה מול טיל ---------- */
  Ctl.guided = (function () {
    const bPlain = $('#gd-plain'), bGuided = $('#gd-guided');
    const go = $('#gd-go'), verdict = $('#gd-verdict');
    let guided = false, scoredHit = false, scoredMiss = false;

    function setMode(v) {
      guided = v;
      bPlain.classList.toggle('on', !v);
      bGuided.classList.toggle('on', v);
      const s = Stage3D.inst('guided');
      if (s) { s.reset(); s.setGuided(v); }
      verdict.className = 'verdict';
      verdict.textContent = v ? 'עם מוח בראש. האם תפגע?' : 'בלי הגה ובלי עיניים. האם תפגע?';
    }
    bPlain.addEventListener('click', () => setMode(false));
    bGuided.addEventListener('click', () => setMode(true));

    go.addEventListener('click', () => {
      const s = Stage3D.inst('guided'); if (!s) return;
      if (s.state !== 'idle') s.reset();
      s.setGuided(guided);
      go.disabled = true;
      Countdown.run(() => {
        s.launch();
        s.onResult = (hit) => {
          go.disabled = false;
          if (hit) {
            verdict.className = 'verdict good';
            verdict.textContent = 'פגיעה. המוח תיקן את הכיוון תוך כדי טיסה.';
            FX.burst(undefined, innerHeight * .45, 90);
            if (!scoredHit) { scoredHit = true; addScore(10); }
          } else {
            verdict.className = 'verdict bad';
            verdict.textContent = 'החטאה. כוח המשיכה והרוח הסיטו אותה, ואין לה איך לתקן.';
            if (!scoredMiss) { scoredMiss = true; addScore(5); }
          }
        };
      });
      setTimeout(() => { go.disabled = false; }, 9000);
    });

    setMode(false);
    return { enter() { const s = Stage3D.inst('guided'); if (s) { s.reset(); s.setGuided(guided); } } };
  })();

  /* ---------- רקטת הבקבוק ---------- */
  Ctl.bottle = (function () {
    const bExp = $('#bo-explode');
    const wa = $('#bo-water'), waOut = $('#bo-w');
    function sync() {
      waOut.textContent = wa.value + '%';
      const s = Stage3D.inst('bottle');
      if (s) s.setWater(wa.value / 100);
    }
    wa.addEventListener('input', sync);
    bExp.addEventListener('click', () => {
      const s = Stage3D.inst('bottle'); if (!s) return;
      const now = !s.exploded;
      s.setExploded(now);
      bExp.textContent = now ? 'הרכיבו בחזרה' : 'פרקו את הרקטה';
    });
    return {
      enter() {
        sync();
        const s = Stage3D.inst('bottle');
        if (s) bExp.textContent = s.exploded ? 'הרכיבו בחזרה' : 'פרקו את הרקטה';
      },
    };
  })();

  /* ---------- שיגורים אמיתיים ---------- */
  Ctl.videos = (function () {
    // ← כאן מדביקים מזהי יוטיוב. המזהה הוא מה שמופיע אחרי v= בכתובת.
    //   דוגמה: https://www.youtube.com/watch?v=ABCdefGH123  ->  yt: 'ABCdefGH123'
    //   אם משאירים ריק, השקף ינסה לנגן את הקובץ המקומי מהתיקייה video/.
    const CLIPS = [
      { yt: '', f: 'video/artemis.mp4', n: 'ארטמיס 1',
        t: 'נובמבר 2022. רקטת SLS — הרקטה החזקה ביותר שנאס״א שיגרה אי פעם — יוצאת לדרך אל הירח. שני מנועי העזר מייצרים כל אחד כוח של יותר מכל מנועי סטרן 5 יחד.' },
      { yt: '', f: 'video/saturn5.mp4', n: 'אפולו 11',
        t: 'יולי 1969. סטרן 5 מתרוממת עם שלושה אנשים בדרך לירח. שימו לב כמה זמן לוקח לה בכלל להתחיל לזוז — היא שוקלת כמעט 3,000 טון.' },
      { yt: '', f: 'video/falcon9.mp4', n: 'נחיתת פאלקון 9',
        t: 'רקטה חוזרת מהחלל, מסובבת את עצמה, מדליקה מנועים כדי לבלום ונוחתת בעמידה. בדיוק מה שראינו בציר הזמן — הפעם באמת.' },
    ];
    const vid = $('#vid'), listEl = $('#vid-list'), missing = $('#vid-missing'), pathEl = $('#vid-path');
    const title = $('#vid-title'), text = $('#vid-text');
    let cur = -1;

    CLIPS.forEach((c, i) => {
      const b = document.createElement('button');
      b.className = 'tg';
      b.textContent = c.n;
      b.addEventListener('click', () => play(i));
      listEl.appendChild(b);
    });
    const btns = $$('.tg', listEl);

    vid.addEventListener('error', () => { missing.classList.add('show'); });
    vid.addEventListener('loadeddata', () => { missing.classList.remove('show'); });

    const frame = document.createElement('iframe');
    frame.id = 'vid-frame';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    frame.allowFullscreen = true;
    frame.style.cssText = 'width:100%;height:100%;border:0;display:none';
    vid.parentNode.insertBefore(frame, vid);

    function play(i) {
      cur = i;
      btns.forEach((b, k) => b.classList.toggle('on', k === i));
      const c = CLIPS[i];
      title.textContent = c.n;
      text.textContent = c.t;
      missing.classList.remove('show');
      if (c.yt) {
        // הטמעה מיוטיוב — דורש אינטרנט בכיתה
        vid.style.display = 'none';
        vid.removeAttribute('src');
        frame.style.display = 'block';
        frame.src = 'https://www.youtube-nocookie.com/embed/' + c.yt +
                    '?rel=0&modestbranding=1&playsinline=1';
      } else {
        frame.style.display = 'none';
        frame.removeAttribute('src');
        vid.style.display = 'block';
        pathEl.textContent = c.f;
        vid.src = c.f;
        vid.loop = true;
        vid.muted = true;
        vid.play().catch(() => {});
      }
    }

    return {
      enter() { if (cur < 0) play(0); else if (!CLIPS[cur].yt) vid.play().catch(() => {}); },
      leave() { vid.pause(); frame.removeAttribute('src'); },
    };
  })();

  /* ---------- סיום ---------- */
  Ctl.finale = { enter() { setTimeout(() => FX.rain(160), 350); } };

  /* ============================================================
     הפעלה
     ============================================================ */
  function boot() {
    if (!window.THREE) {
      $('#loader').innerHTML = '<div class="lw"><p style="color:#e0364c">שגיאה בטעינת מנוע התלת־ממד</p></div>';
      return;
    }
    try { Stage3D.init(); }
    catch (e) {
      console.error(e);
      $('#loader').innerHTML = '<div class="lw"><p style="color:#e0364c">הדפדפן לא תומך ב־WebGL</p></div>';
      return;
    }
    go(0);
    setTimeout(() => $('#loader').classList.add('hide'), 600);
    setTimeout(() => { const l = $('#loader'); if (l) l.remove(); }, 1300);
  }

  if (document.readyState === 'complete') boot();
  else addEventListener('load', boot);
})();
