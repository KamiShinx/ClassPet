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

  /* ---------- השמש ---------- */
  Ctl.star = (function () {
    const bE = $('#sn-earth'), bC = $('#sn-cut');
    bE.addEventListener('click', () => {
      const s = Stage3D.inst('sun'); if (!s) return;
      const v = !s.earthOn; s.setEarth(v); bE.classList.toggle('on', v);
    });
    bC.addEventListener('click', () => {
      const s = Stage3D.inst('sun'); if (!s) return;
      const v = !s.cutOn; s.setCut(v); bC.classList.toggle('on', v);
    });
    return {
      enter() {
        const s = Stage3D.inst('sun'); if (!s) return;
        bE.classList.toggle('on', s.earthOn);
        bC.classList.toggle('on', s.cutOn);
      },
    };
  })();

  /* ---------- לידת כוכב ---------- */
  Ctl.birth = (function () {
    const sl = $('#bi-slider'), out = $('#bi-out'), verdict = $('#bi-verdict');
    let scored = false;
    function sync() {
      const v = sl.value / 100;
      out.textContent = sl.value + '%';
      const s = Stage3D.inst('birth');
      if (s) s.setCollapse(v);
      if (v >= .995) {
        verdict.className = 'verdict good';
        verdict.textContent = 'נדלק! נולד כוכב חדש';
      } else if (v > .6) {
        verdict.className = 'verdict';
        verdict.textContent = 'מתחמם… עוד קצת';
      } else if (v > .2) {
        verdict.className = 'verdict';
        verdict.textContent = 'הענן מתכווץ';
      } else {
        verdict.className = 'verdict';
        verdict.textContent = 'גררו את המחוון עד הסוף';
      }
    }
    sl.addEventListener('input', sync);
    return {
      enter() {
        sync();
        const s = Stage3D.inst('birth');
        if (s) s.onIgnite = () => {
          FX.burst(undefined, innerHeight * .45, 110);
          if (!scored) { scored = true; addScore(10); }
        };
      },
    };
  })();

  /* ---------- מחזור החיים ---------- */
  Ctl.life = (function () {
    const SMALL = [
      { k: 'nebula', n: 'ענן גז', ref: false,
        t: 'הכול מתחיל כאן: ענן ענק של גז ואבק שמרחף בחלל, קר וחשוך.' },
      { k: 'main', n: 'כוכב רגיל', ref: false,
        t: 'הענן התכווץ ונדלק. מעכשיו הכוכב יאיר בשקט מיליארדי שנים. השמש שלנו נמצאת בדיוק בשלב הזה.' },
      { k: 'giant', n: 'ענק אדום', ref: true,
        t: 'הדלק במרכז נגמר, והכוכב מתנפח עד פי מאה מגודלו. הוא נראה אדום כי פני השטח שלו התקררו.' },
      { k: 'dwarf', n: 'ננס לבן', ref: true,
        t: 'השכבות החיצוניות נושרות, ונשארת רק הליבה: גחלת לוהטת בגודל כדור הארץ, שתתקרר לאט במשך מיליארדי שנים.' },
    ];
    const BIG = [
      { k: 'nebula', n: 'ענן גז', ref: false,
        t: 'אותה התחלה בדיוק — רק שהפעם נדחס לענן הרבה יותר חומר.' },
      { k: 'supergiant', n: 'על-ענק אדום', ref: true,
        t: 'כוכב ענק חי מהר ומת צעיר. הוא שורף את הדלק שלו בקצב מטורף ומתנפח לגודל בלתי נתפס.' },
      { k: 'supernova', n: 'סופרנובה', ref: false,
        t: 'המרכז קורס בבת אחת והכוכב מתפוצץ. לכמה ימים הוא מאיר יותר מכל הכוכבים בגלקסיה שלו יחד, ומפזר בחלל את כל החומרים שיצר.' },
      { k: 'neutron', n: 'כוכב נויטרונים', ref: false,
        t: 'מה שנשאר מהמרכז: כדור בקוטר של עיר אחת, אבל כבד יותר מהשמש. כפית ממנו הייתה שוקלת כמו הר.' },
      { k: 'blackhole', n: 'חור שחור', ref: false,
        t: 'ואם הכוכב היה גדול במיוחד, המרכז ממשיך לקרוס בלי לעצור — עד שנוצר חור שחור.' },
    ];
    const bS = $('#lf-small'), bB = $('#lf-big');
    const list = $('#lf-list'), title = $('#lf-title'), text = $('#lf-text');
    let big = false, cur = 0, seen = 0, done = false;

    function render() {
      const data = big ? BIG : SMALL;
      list.innerHTML = '';
      data.forEach((e, i) => {
        const b = document.createElement('button');
        b.className = 'tl-item' + (i === cur ? ' on' : '');
        b.innerHTML = '<span class="yr">' + (i + 1) + '</span><span class="nm">' + e.n + '</span>';
        b.addEventListener('click', () => pick(i));
        list.appendChild(b);
      });
    }
    function pick(i) {
      const data = big ? BIG : SMALL;
      cur = Math.min(i, data.length - 1);
      const e = data[cur];
      title.textContent = e.n;
      text.textContent = e.t;
      const s = Stage3D.inst('lifecycle');
      if (s) s.show(e.k, e.ref);
      render();
      const id = (big ? 'b' : 's') + cur;
      if (!pick.seen) pick.seen = {};
      if (!pick.seen[id]) {
        pick.seen[id] = 1;
        seen++;
        if (seen >= 9 && !done) { done = true; addScore(10); FX.burst(undefined, innerHeight * .5, 80); }
      }
    }
    function setPath(v) { big = v; cur = 0; bS.classList.toggle('on', !v); bB.classList.toggle('on', v); pick(0); }
    bS.addEventListener('click', () => setPath(false));
    bB.addEventListener('click', () => setPath(true));
    render();
    return { enter() { pick(cur); } };
  })();

  /* ---------- חור שחור ---------- */
  Ctl.blackhole = (function () {
    const bThrow = $('#bh-throw'), bReset = $('#bh-reset');
    let scored = false;
    bThrow.addEventListener('click', () => {
      const s = Stage3D.inst('blackhole'); if (!s) return;
      s.reset(); s.throwStar();
      bThrow.disabled = true;
      s.onGone = () => {
        bThrow.disabled = false;
        if (!scored) { scored = true; addScore(5); }
      };
      setTimeout(() => { bThrow.disabled = false; }, 12000);
    });
    bReset.addEventListener('click', () => {
      const s = Stage3D.inst('blackhole'); if (s) s.reset();
      bThrow.disabled = false;
    });
    return { enter() { const s = Stage3D.inst('blackhole'); if (s) s.reset(); } };
  })();

  /* ---------- העתיד של השמש ---------- */
  Ctl.future = (function () {
    const STEPS = [
      { k: 'nebula', n: 'לפני 4.6 מיליארד שנה', ref: false,
        t: 'ענן גז ואבק התכווץ, נדלק, והשמש נולדה. משאריות אותו ענן נוצרו כדור הארץ וכל כוכבי הלכת.' },
      { k: 'main', n: 'היום', ref: false,
        t: 'השמש נמצאת בערך באמצע החיים שלה, ומאירה בדיוק אותו הדבר כבר מיליארדי שנים.' },
      { k: 'giant', n: 'בעוד 5 מיליארד שנה', ref: true,
        t: 'הדלק במרכז ייגמר. השמש תתנפח לענק אדום ותבלע את כוכב חמה ואת נוגה, וכדור הארץ ייעשה חם מכדי לחיות בו.' },
      { k: 'dwarf', n: 'בעוד 8 מיליארד שנה', ref: true,
        t: 'השכבות החיצוניות ייפרשו החוצה, ומה שיישאר יהיה ננס לבן קטן וחיוור בגודל כדור הארץ.' },
    ];
    const list = $('#fu-list'), title = $('#fu-title'), text = $('#fu-text');
    let cur = 1;
    STEPS.forEach((e, i) => {
      const b = document.createElement('button');
      b.className = 'tl-item';
      b.innerHTML = '<span class="nm">' + e.n + '</span>';
      b.addEventListener('click', () => pick(i));
      list.appendChild(b);
    });
    const items = $$('.tl-item', list);
    function pick(i) {
      cur = i;
      items.forEach((b, k) => b.classList.toggle('on', k === i));
      title.textContent = STEPS[i].n;
      text.textContent = STEPS[i].t;
      const s = Stage3D.inst('lifecycle');
      if (s) s.show(STEPS[i].k, STEPS[i].ref);
    }
    return { enter() { pick(cur); } };
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
