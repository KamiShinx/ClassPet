/* ============================================================
   MAKE · שיעור רקטות — מנוע התלת-ממד
   רנדרר יחיד משותף + 7 סצנות תלת-ממד אינטראקטיביות
   ============================================================ */
(function (global) {
  'use strict';

  const C = {
    blue: 0x0094ff,
    blueSoft: 0x4db4ff,
    yellow: 0xffc61e,
    amber: 0xf5a421,
    white: 0xffffff,
    steel: 0xc9d6ea,
    dark: 0x1b2440,
    copper: 0xd08a3e,
    flameCore: 0xfff3c4,
    flame: 0xff8a1e,
  };

  /* ---------------- טקסטורות מחוללות ---------------- */
  function radialTex(stops) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    stops.forEach(([o, col]) => gr.addColorStop(o, col));
    g.fillStyle = gr;
    g.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }
  let TEX_FIRE, TEX_SMOKE, TEX_WATER, TEX_STAR;
  function initTex() {
    TEX_FIRE = radialTex([[0, 'rgba(255,255,235,1)'], [.3, 'rgba(255,205,110,.9)'], [.65, 'rgba(255,120,25,.45)'], [1, 'rgba(255,60,0,0)']]);
    TEX_SMOKE = radialTex([[0, 'rgba(230,238,255,.55)'], [.5, 'rgba(180,200,230,.22)'], [1, 'rgba(150,170,200,0)']]);
    TEX_WATER = radialTex([[0, 'rgba(235,250,255,1)'], [.4, 'rgba(120,200,255,.8)'], [1, 'rgba(0,148,255,0)']]);
    TEX_STAR = radialTex([[0, 'rgba(255,255,255,1)'], [.4, 'rgba(210,230,255,.65)'], [1, 'rgba(160,190,255,0)']]);
  }

  /* ---------------- חומרים ---------------- */
  const M = {
    paint: (col, rough = .42) => new THREE.MeshStandardMaterial({ color: col, roughness: rough, metalness: .18 }),
    metal: (col, rough = .28) => new THREE.MeshStandardMaterial({ color: col, roughness: rough, metalness: .92 }),
    glow: (col, i = 1.5) => new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: i, roughness: 1, metalness: 0 }),
    glass: (col, op = .3) => new THREE.MeshStandardMaterial({
      color: col, transparent: true, opacity: op, roughness: .06, metalness: .1,
      side: THREE.DoubleSide, depthWrite: false,
    }),
  };

  /* ---------------- עזרי גיאומטריה ---------------- */
  function lathe(pts, seg = 48) {
    return new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(p[0], p[1])), seg);
  }

  // סנפיר משולש עם עובי
  function finGeo(h, w, t, sweep = .55) {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(w, -h * sweep * 0.35);
    s.lineTo(w * .82, h * .18);
    s.lineTo(0, h);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: true, bevelSize: t * .3, bevelThickness: t * .3, bevelSegments: 2 });
    g.translate(0, 0, -t / 2);
    return g;
  }

  function addFins(parent, n, geo, mat, radius, y) {
    for (let i = 0; i < n; i++) {
      const f = new THREE.Mesh(geo, mat);
      const a = (i / n) * Math.PI * 2;
      f.position.set(Math.cos(a) * radius, y, Math.sin(a) * radius);
      f.rotation.y = -a + Math.PI / 2;
      f.castShadow = true;
      parent.add(f);
    }
  }

  /* ---------------- מערכת חלקיקים ---------------- */
  class Jet {
    constructor(opts) {
      const o = Object.assign({
        count: 260, tex: TEX_FIRE, size: .38, color: 0xffffff,
        speed: 7, spread: .30, life: .55, dir: new THREE.Vector3(0, -1, 0),
        gravity: 0, blending: THREE.AdditiveBlending, shrink: true,
      }, opts);
      this.o = o;
      const g = new THREE.BufferGeometry();
      this.pos = new Float32Array(o.count * 3);
      this.vel = new Float32Array(o.count * 3);
      this.age = new Float32Array(o.count);
      this.lif = new Float32Array(o.count);
      this.sz = new Float32Array(o.count);
      for (let i = 0; i < o.count; i++) { this.age[i] = Math.random() * o.life; this.lif[i] = o.life; this.sz[i] = o.size; }
      g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
      g.setAttribute('size', new THREE.BufferAttribute(this.sz, 1));
      this.mat = new THREE.PointsMaterial({
        size: o.size, map: o.tex, transparent: true, depthWrite: false,
        blending: o.blending, color: o.color, sizeAttenuation: true, opacity: 1,
      });
      this.points = new THREE.Points(g, this.mat);
      this.points.frustumCulled = false;
      this.on = false;
      this.power = 1;
    }
    reset(i) {
      const o = this.o, s = o.spread;
      this.pos[i * 3] = (Math.random() - .5) * s * .6;
      this.pos[i * 3 + 1] = (Math.random() - .5) * s * .3;
      this.pos[i * 3 + 2] = (Math.random() - .5) * s * .6;
      const sp = o.speed * (.55 + Math.random() * .75) * this.power;
      this.vel[i * 3] = o.dir.x * sp + (Math.random() - .5) * s * 3.2;
      this.vel[i * 3 + 1] = o.dir.y * sp + (Math.random() - .5) * s * 3.2;
      this.vel[i * 3 + 2] = o.dir.z * sp + (Math.random() - .5) * s * 3.2;
      this.age[i] = 0;
      this.lif[i] = o.life * (.6 + Math.random() * .8);
    }
    update(dt) {
      const o = this.o, n = o.count;
      const vis = this.on ? 1 : 0;
      this.mat.opacity += (vis - this.mat.opacity) * Math.min(1, dt * 9);
      this.points.visible = this.mat.opacity > .02;
      if (!this.points.visible) return;
      for (let i = 0; i < n; i++) {
        this.age[i] += dt;
        if (this.age[i] >= this.lif[i]) { if (this.on) this.reset(i); else { this.pos[i * 3 + 1] = 9999; continue; } }
        this.vel[i * 3 + 1] += o.gravity * dt;
        this.pos[i * 3] += this.vel[i * 3] * dt;
        this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
        this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      }
      this.points.geometry.attributes.position.needsUpdate = true;
      this.mat.size = o.size * (o.shrink ? (.7 + this.power * .5) : 1);
    }
    setOn(v) { if (v && !this.on) for (let i = 0; i < this.o.count; i++) this.reset(i); this.on = v; }
  }

  /* ---------------- שדה כוכבים ---------------- */
  function starField(n = 900, r = 220) {
    const g = new THREE.BufferGeometry();
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const t = Math.acos(2 * Math.random() - 1), ph = Math.random() * Math.PI * 2;
      const rr = r * (.55 + Math.random() * .45);
      p[i * 3] = rr * Math.sin(t) * Math.cos(ph);
      p[i * 3 + 1] = rr * Math.cos(t);
      p[i * 3 + 2] = rr * Math.sin(t) * Math.sin(ph);
    }
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    return new THREE.Points(g, new THREE.PointsMaterial({
      size: 1.5, map: TEX_STAR, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, color: 0xbdd6ff, sizeAttenuation: true,
    }));
  }

  /* ---------------- תאורה סטנדרטית ---------------- */
  function lightRig(scene, warm = true) {
    scene.add(new THREE.HemisphereLight(0x9fc4ff, 0x121a30, 1.05));
    const k = new THREE.DirectionalLight(0xffffff, 2.1); k.position.set(5, 8, 6); scene.add(k);
    const f = new THREE.DirectionalLight(C.blue, 1.35); f.position.set(-6, 2, -5); scene.add(f);
    if (warm) { const w = new THREE.PointLight(C.amber, 22, 40); w.position.set(2.5, -2.5, 4); scene.add(w); }
    return k;
  }

  /* ---------------- בקרת מסלול (Orbit) ידנית ---------------- */
  function attachOrbit(cam, dom, target, opt) {
    const o = Object.assign({ minR: 3, maxR: 40, minPol: .12, maxPol: Math.PI - .12, autoRot: .12, damp: .09 }, opt || {});
    const s = {
      r: cam.position.distanceTo(target), az: 0, pol: 1.1,
      tR: 0, tAz: 0, tPol: 0, drag: false, px: 0, py: 0, idle: 0, target: target.clone(),
    };
    const off = cam.position.clone().sub(target);
    s.r = off.length(); s.pol = Math.acos(THREE.MathUtils.clamp(off.y / s.r, -1, 1)); s.az = Math.atan2(off.x, off.z);
    s.tR = s.r; s.tAz = s.az; s.tPol = s.pol;

    const down = e => { s.drag = true; s.idle = 0; s.px = e.clientX; s.py = e.clientY; dom.setPointerCapture && dom.setPointerCapture(e.pointerId); dom.style.cursor = 'grabbing'; };
    const move = e => {
      if (!s.drag) return;
      const dx = e.clientX - s.px, dy = e.clientY - s.py;
      s.px = e.clientX; s.py = e.clientY; s.idle = 0;
      s.tAz -= dx * 0.0075;
      s.tPol = THREE.MathUtils.clamp(s.tPol - dy * 0.006, o.minPol, o.maxPol);
    };
    const up = e => { s.drag = false; dom.style.cursor = 'grab'; };
    const wheel = e => { e.preventDefault(); s.idle = 0; s.tR = THREE.MathUtils.clamp(s.tR * (1 + Math.sign(e.deltaY) * .12), o.minR, o.maxR); };
    dom.addEventListener('pointerdown', down);
    dom.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    dom.addEventListener('wheel', wheel, { passive: false });
    dom.style.cursor = 'grab';
    dom.style.touchAction = 'none';

    return {
      state: s,
      setTarget(v) { s.target.copy(v); },
      setR(v) { s.tR = v; },
      update(dt) {
        s.idle += dt;
        if (!s.drag && s.idle > 2.2 && o.autoRot) s.tAz += o.autoRot * dt;
        s.az += (s.tAz - s.az) * o.damp * 60 * dt;
        s.pol += (s.tPol - s.pol) * o.damp * 60 * dt;
        s.r += (s.tR - s.r) * o.damp * 60 * dt;
        const sp = Math.sin(s.pol);
        cam.position.set(
          s.target.x + s.r * sp * Math.sin(s.az),
          s.target.y + s.r * Math.cos(s.pol),
          s.target.z + s.r * sp * Math.cos(s.az)
        );
        cam.lookAt(s.target);
      },
      dispose() {
        dom.removeEventListener('pointerdown', down);
        dom.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        dom.removeEventListener('wheel', wheel);
      },
    };
  }

  /* ============================================================
     מנהל הבמה — רנדרר יחיד שעובר בין השקפים
     ============================================================ */
  const Stage = {
    renderer: null, canvas: null, scenes: {}, active: null, host: null,
    clock: null, raf: 0, ro: null,

    init() {
      initTex();
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.08;
      this.renderer.localClippingEnabled = true;
      this.canvas = this.renderer.domElement;
      this.clock = new THREE.Clock();
      this.ro = new ResizeObserver(() => this.resize());
      const loop = () => {
        this.raf = requestAnimationFrame(loop);
        const dt = Math.min(this.clock.getDelta(), 0.05);
        const s = this.active;
        if (!s || !this.host) return;
        if (s.orbit) s.orbit.update(dt);
        if (s.update) s.update(dt);
        this.renderer.render(s.scene, s.camera);
      };
      loop();
    },

    register(name, factory) { this.scenes[name] = { factory, inst: null }; },

    mount(name, hostEl) {
      const rec = this.scenes[name];
      if (!rec) { this.host = null; this.active = null; return null; }
      if (this.active && this.active.onLeave) this.active.onLeave();
      if (this.host) this.ro.unobserve(this.host);
      if (!rec.inst) rec.inst = rec.factory(this);
      this.active = rec.inst;
      this.host = hostEl;
      hostEl.appendChild(this.canvas);
      this.ro.observe(hostEl);
      // חיבור בקרת המסלול לאלמנט הנוכחי
      if (this.active.attachOrbitTo) this.active.attachOrbitTo(this.canvas);
      this.resize();
      if (this.active.onEnter) this.active.onEnter();
      return this.active;
    },

    unmount() {
      if (this.active && this.active.onLeave) this.active.onLeave();
      if (this.host) this.ro.unobserve(this.host);
      if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
      this.host = null; this.active = null;
    },

    resize() {
      if (!this.host || !this.active) return;
      const w = this.host.clientWidth, h = this.host.clientHeight;
      if (w < 8 || h < 8) return;
      this.renderer.setSize(w, h, false);
      const c = this.active.camera;
      c.aspect = w / h; c.updateProjectionMatrix();
      if (this.active.onResize) this.active.onResize(w, h);
    },

    get instance() { return this.active; },
    inst(name) { const r = this.scenes[name]; return r && r.inst; },
  };

  /* ---------------- תוויות HTML מוקרנות מהתלת-ממד ---------------- */
  function Labeller(stageHostGetter) {
    const items = [];
    let layer = null;
    return {
      add(text, pos, cls) {
        const el = document.createElement('div');
        el.className = 'l3d ' + (cls || '');
        el.innerHTML = text;
        items.push({ el, pos: pos.clone(), shown: true });
        return items[items.length - 1];
      },
      mountTo(host) {
        layer = host.querySelector('.labels');
        if (!layer) { layer = document.createElement('div'); layer.className = 'labels'; host.appendChild(layer); }
        layer.innerHTML = '';
        items.forEach(i => layer.appendChild(i.el));
      },
      project(cam, host) {
        if (!host) return;
        const w = host.clientWidth, h = host.clientHeight;
        const v = new THREE.Vector3();
        items.forEach(i => {
          if (!i.shown) { i.el.style.opacity = 0; return; }
          v.copy(i.pos).project(cam);
          const inFront = v.z < 1;
          i.el.style.opacity = inFront ? 1 : 0;
          if (!inFront) return;
          // מצמידים את התווית לגבולות הבמה כדי שלא תיחתך בקצה
          const bw = i.el.offsetWidth || 120, bh = i.el.offsetHeight || 34;
          const x = THREE.MathUtils.clamp((v.x * .5 + .5) * w, bw / 2 + 6, w - bw / 2 - 6);
          const y = THREE.MathUtils.clamp((-v.y * .5 + .5) * h, bh / 2 + 6, h - bh / 2 - 6);
          i.el.style.transform = `translate(-50%,-50%) translate(${x}px, ${y}px)`;
        });
      },
      items,
    };
  }

  /* ============================================================
     בונה רקטה כללי (משמש בכמה סצנות)
     ============================================================ */
  function buildRocket(opt) {
    const o = Object.assign({
      r: .62, bodyH: 4.2, noseH: 1.5, finN: 4, finH: 1.25, finW: 1.0,
      body: C.white, accent: C.blue, nose: C.yellow, window: true,
    }, opt || {});
    const g = new THREE.Group();
    const bodyMat = M.paint(o.body, .34);
    const accMat = M.paint(o.accent, .3);
    const noseMat = M.paint(o.nose, .28);
    const metalMat = M.metal(C.steel, .22);

    // גוף
    const body = new THREE.Mesh(new THREE.CylinderGeometry(o.r, o.r, o.bodyH, 40, 1, true), bodyMat);
    body.material.side = THREE.DoubleSide;
    body.position.y = o.bodyH / 2;
    g.add(body);

    // פסי מותג
    [0.28, 0.62].forEach((f, i) => {
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(o.r * 1.012, o.r * 1.012, o.bodyH * .075, 40, 1, true), i ? accMat : M.paint(C.amber, .3));
      ring.material.side = THREE.DoubleSide;
      ring.position.y = o.bodyH * f;
      g.add(ring);
    });

    // חרטום
    const nose = new THREE.Mesh(lathe(
      Array.from({ length: 14 }, (_, i) => {
        const t = i / 13;
        return [o.r * Math.cos(t * Math.PI / 2) * (1 - .04 * t), o.bodyH + o.noseH * t];
      }), 40), noseMat);
    g.add(nose);

    // חלון
    if (o.window) {
      const win = new THREE.Mesh(new THREE.SphereGeometry(o.r * .32, 22, 16), M.glass(0x9fe0ff, .55));
      win.position.set(0, o.bodyH * .78, o.r * .93);
      g.add(win);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(o.r * .33, o.r * .055, 10, 26), metalMat);
      rim.position.copy(win.position); rim.position.z = o.r * .9;
      g.add(rim);
    }

    // חצאית מנוע + פעמון
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(o.r, o.r * 1.06, .3, 40), accMat);
    skirt.position.y = .15; g.add(skirt);

    const bellPts = [];
    for (let i = 0; i <= 16; i++) {
      const t = i / 16;
      const rr = o.r * (.34 + .62 * Math.pow(t, 1.9));
      bellPts.push([rr, -t * o.r * 1.5]);
    }
    const bell = new THREE.Mesh(lathe(bellPts, 40), metalMat);
    bell.material.side = THREE.DoubleSide;
    g.add(bell);

    // סנפירים
    const fg = finGeo(o.finH, o.finW, .07);
    addFins(g, o.finN, fg, accMat, o.r * .88, .05);

    g.userData.exitY = -o.r * 1.5;
    g.userData.exitR = o.r * .96;
    return g;
  }

  /* ============================================================
     סצנה 1 — פתיחה: רקטה בחלל
     ============================================================ */
  Stage.register('hero', (S) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1.6, .1, 800);
    camera.position.set(0, 3, 13);
    lightRig(scene);
    scene.add(starField(1100, 240));

    const root = new THREE.Group(); scene.add(root);
    const rocket = buildRocket({ r: .72, bodyH: 4.6, noseH: 1.8, finH: 1.5, finW: 1.15 });
    rocket.position.y = -2.4;
    root.add(rocket);

    const jet = new Jet({ count: 340, size: .55, speed: 11, spread: .34, life: .5, color: 0xffd9a0 });
    jet.points.position.set(0, -2.4 + rocket.userData.exitY, 0);
    root.add(jet.points);
    jet.setOn(true);

    const smoke = new Jet({ count: 150, tex: TEX_SMOKE, size: 1.1, speed: 5.5, spread: .7, life: 1.5, color: 0x9fb6d8, blending: THREE.NormalBlending });
    smoke.points.position.copy(jet.points.position);
    root.add(smoke.points);
    smoke.setOn(true);

    // כוכב לכת מרחוק
    const planet = new THREE.Mesh(new THREE.SphereGeometry(26, 60, 40), new THREE.MeshStandardMaterial({ color: 0x1b4a8f, roughness: .95, metalness: 0 }));
    planet.position.set(-24, -33, -26); scene.add(planet);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(27.4, 48, 32), new THREE.MeshBasicMaterial({ color: C.blue, transparent: true, opacity: .12, side: THREE.BackSide }));
    halo.position.copy(planet.position); scene.add(halo);

    // ירח רחוק ברקע (עומק בלבד — לא חוצה את המצלמה)
    const moon = new THREE.Mesh(new THREE.SphereGeometry(2.4, 40, 28), new THREE.MeshStandardMaterial({ color: 0xd9dde6, roughness: 1 }));
    moon.position.set(17, 10, -26);
    scene.add(moon);

    let t = 0, orbit = null;
    return {
      scene, camera,
      attachOrbitTo(dom) { if (orbit) orbit.dispose(); orbit = attachOrbit(camera, dom, new THREE.Vector3(0, .2, 0), { minR: 7, maxR: 26, autoRot: .16 }); this.orbit = orbit; },
      onEnter() { jet.setOn(true); smoke.setOn(true); },
      update(dt) {
        t += dt;
        root.rotation.y += dt * .12;
        rocket.rotation.z = Math.sin(t * .8) * .05;
        rocket.position.y = -2.4 + Math.sin(t * 1.1) * .18;
        jet.points.position.y = rocket.position.y + rocket.userData.exitY;
        smoke.points.position.y = jet.points.position.y;
        jet.power = .9 + Math.sin(t * 9) * .12;
        jet.update(dt); smoke.update(dt);
        moon.rotation.y += dt * .05;
      },
    };
  });

  /* ============================================================
     סצנה 2 — חוק ניוטון השלישי: הבלון
     ============================================================ */
  Stage.register('newton', (S) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1.6, .1, 500);
    camera.position.set(0, 1.2, 14);
    lightRig(scene, true);
    const pl = new THREE.PointLight(0xfff0d0, 34, 60); pl.position.set(-4, 4, 6); scene.add(pl);
    scene.add(starField(500, 120));

    const balloon = new THREE.Group(); scene.add(balloon);
    const skin = new THREE.Mesh(new THREE.SphereGeometry(1, 42, 32), new THREE.MeshStandardMaterial({
      color: C.yellow, roughness: .22, metalness: .06,
    }));
    balloon.add(skin);
    const shine = new THREE.Mesh(new THREE.SphereGeometry(1.004, 42, 32), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .1 }));
    balloon.add(shine);
    // צוואר
    const neck = new THREE.Mesh(lathe([[.30, 0], [.22, -.35], [.28, -.62], [.2, -.7]], 26), M.paint(C.amber, .3));
    neck.material.side = THREE.DoubleSide;
    neck.position.y = -.92; balloon.add(neck);
    // פרצוף
    const eyeG = new THREE.SphereGeometry(.11, 18, 14), eyeM = new THREE.MeshStandardMaterial({ color: 0x101828, roughness: .3 });
    [-.3, .3].forEach(x => { const e = new THREE.Mesh(eyeG, eyeM); e.position.set(x, .22, .93); balloon.add(e); });
    const mouth = new THREE.Mesh(new THREE.TorusGeometry(.24, .045, 8, 22, Math.PI), eyeM);
    mouth.position.set(0, -.05, .92); mouth.rotation.z = Math.PI; balloon.add(mouth);

    // סילון אוויר
    const air = new Jet({
      count: 300, tex: TEX_WATER, size: .3, speed: 13, spread: .28, life: .45,
      color: 0xbfe8ff, dir: new THREE.Vector3(0, -1, 0),
    });
    balloon.add(air.points);
    air.points.position.y = -1.62;

    // חצים: פעולה / תגובה — חצים תלת-ממדיים אמיתיים (גליל + חרוט)
    function makeArrow(col, up) {
      const g = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: .55, roughness: .4 });
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, 1.7, 16), mat);
      shaft.position.y = up * .85; g.add(shaft);
      const head = new THREE.Mesh(new THREE.ConeGeometry(.34, .85, 22), mat);
      head.position.y = up * 2.1; head.rotation.x = up > 0 ? 0 : Math.PI; g.add(head);
      return g;
    }
    const arrowGas = makeArrow(0xff5c6e, -1);
    const arrowRock = makeArrow(0x2fd07a, 1);
    balloon.add(arrowGas); balloon.add(arrowRock);
    arrowGas.visible = arrowRock.visible = false;

    const labels = Labeller();
    const lGas = labels.add('פעולה — האוויר יוצא למטה', new THREE.Vector3(0, 0, 0), 'red');
    const lRock = labels.add('תגובה — הבלון עף למעלה', new THREE.Vector3(0, 0, 0), 'green');

    let inflate = 0.55;      // 0..1
    let flying = false, air_left = 0, vel = new THREE.Vector3(), t = 0, orbit = null;
    const home = new THREE.Vector3(0, .4, 0);

    function api() { return Stage.inst('newton'); }

    return {
      scene, camera, labels,
      attachOrbitTo(dom) { if (orbit) orbit.dispose(); orbit = attachOrbit(camera, dom, new THREE.Vector3(0, .3, 0), { minR: 9, maxR: 24, autoRot: .1 }); this.orbit = orbit; },
      onEnter() { labels.mountTo(Stage.host); },
      setInflate(v) { inflate = v; },
      release() {
        if (flying) return;
        flying = true; air_left = inflate;
        vel.set((Math.random() - .5) * .6, 2.5, (Math.random() - .5) * .6);
        air.setOn(true);
        arrowGas.visible = arrowRock.visible = true;
      },
      reset() {
        flying = false; air.setOn(false); vel.set(0, 0, 0);
        balloon.position.copy(home); balloon.rotation.set(0, 0, 0);
        arrowGas.visible = arrowRock.visible = false;
      },
      get flying() { return flying; },
      update(dt) {
        t += dt;
        const target = flying ? Math.max(.16, air_left) : inflate;
        const sc = .55 + target * 1.15;
        skin.scale.lerp(new THREE.Vector3(sc, sc * (1 - target * .1), sc), Math.min(1, dt * 7));
        shine.scale.copy(skin.scale);
        neck.position.y = -(skin.scale.y * .92);
        air.points.position.y = -(skin.scale.y * 1.62);
        arrowGas.position.y = -(skin.scale.y * 1.7);
        arrowRock.position.y = skin.scale.y * 1.1;

        if (flying) {
          air_left = Math.max(0, air_left - dt * .42);
          const thrust = air_left > 0 ? 15 * (0.35 + air_left) : 0;
          // הדחף בכיוון "למעלה" של הבלון
          const up = new THREE.Vector3(0, 1, 0).applyQuaternion(balloon.quaternion);
          vel.addScaledVector(up, thrust * dt);
          vel.y -= 3.2 * dt;                       // כבידה קלה
          vel.multiplyScalar(1 - 1.4 * dt);        // גרר
          balloon.position.addScaledVector(vel, dt);
          // תנודתיות אופיינית לבלון משוחרר
          balloon.rotation.x += (Math.sin(t * 11) * 1.1 + (Math.random() - .5) * 1.4) * dt;
          balloon.rotation.z += (Math.cos(t * 9.4) * 1.1 + (Math.random() - .5) * 1.4) * dt;
          air.power = .4 + air_left;
          // גבולות הבמה — שומרים על הבלון בתוך הפריים
          ['x', 'y', 'z'].forEach(a => {
            const lim = a === 'y' ? 2.2 : 3.0;
            if (balloon.position[a] > lim) { balloon.position[a] = lim; vel[a] *= -.55; }
            if (balloon.position[a] < -lim) { balloon.position[a] = -lim; vel[a] *= -.55; }
          });
          if (air_left <= 0 && vel.length() < .45) {
            flying = false; air.setOn(false);
            arrowGas.visible = arrowRock.visible = false;
            if (this.onLand) this.onLand();
          }
        } else {
          balloon.position.lerp(home, Math.min(1, dt * 3));
          balloon.rotation.x *= (1 - dt * 3); balloon.rotation.z *= (1 - dt * 3);
          balloon.position.y = home.y + Math.sin(t * 1.4) * .1;
        }
        air.update(dt);

        // עדכון מיקומי תוויות
        lGas.shown = lRock.shown = arrowGas.visible;
        lGas.pos.copy(balloon.position).add(new THREE.Vector3(0, -skin.scale.y * 1.7 - 2.6, 0));
        lRock.pos.copy(balloon.position).add(new THREE.Vector3(0, skin.scale.y * 1.1 + 2.7, 0));
        labels.project(camera, Stage.host);
      },
    };
  });

  /* ============================================================
     סצנה 3 — מנוע רקטי בחתך + פירוק
     ============================================================ */
  Stage.register('engine', (S) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1.6, .1, 500);
    camera.position.set(9, 3.5, 15);
    lightRig(scene);
    const rim = new THREE.PointLight(C.blue, 40, 50); rim.position.set(-8, 4, -6); scene.add(rim);
    scene.add(starField(400, 140));

    const root = new THREE.Group(); scene.add(root);

    // מישור חיתוך — מייצר חתך אמיתי של המעטפת
    const clip = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
    function shellMat(col, rough, metal) {
      return new THREE.MeshStandardMaterial({
        color: col, roughness: rough, metalness: metal,
        side: THREE.DoubleSide, clippingPlanes: [clip], clipShadows: true,
      });
    }
    let cutOn = true;
    function setCut(v) { cutOn = v; clip.constant = v ? 0 : 60; }

    /* ---- קבוצות חלקים (לפירוק) ---- */
    const gTankOx = new THREE.Group();   // מיכל מחמצן (עליון)
    const gTankFu = new THREE.Group();   // מיכל דלק
    const gPump = new THREE.Group();     // משאבות
    const gChamber = new THREE.Group();  // תא בעירה + גרון
    const gNozzle = new THREE.Group();   // פעמון הסילון
    root.add(gTankOx, gTankFu, gPump, gChamber, gNozzle);

    const oxMat = shellMat(0x6fc4ff, .3, .35);
    const fuMat = shellMat(0xffc61e, .32, .3);
    const steelMat = shellMat(C.steel, .24, .95);
    const copperMat = shellMat(C.copper, .3, .9);

    // מיכל מחמצן
    const oxShell = new THREE.Mesh(lathe([[0, 1.5], [.95, 1.28], [1.05, .9], [1.05, -.9], [.95, -1.28], [0, -1.5]], 44), oxMat);
    gTankOx.add(oxShell);
    const oxLiquid = new THREE.Mesh(lathe([[0, 1.05], [.92, .85], [.98, -.85], [0, -1.32]], 40), new THREE.MeshStandardMaterial({
      color: 0x0fa8ff, emissive: 0x0a4f8a, emissiveIntensity: .5, roughness: .1, metalness: 0,
      transparent: true, opacity: .85, side: THREE.DoubleSide, clippingPlanes: [clip],
    }));
    gTankOx.add(oxLiquid);
    gTankOx.position.y = 5.3;

    // מיכל דלק
    const fuShell = new THREE.Mesh(lathe([[0, 1.35], [.95, 1.15], [1.05, .8], [1.05, -.8], [.95, -1.15], [0, -1.35]], 44), fuMat);
    gTankFu.add(fuShell);
    const fuLiquid = new THREE.Mesh(lathe([[0, .95], [.92, .78], [.98, -.75], [0, -1.2]], 40), new THREE.MeshStandardMaterial({
      color: 0xff9d1c, emissive: 0x7a3d00, emissiveIntensity: .5, roughness: .12,
      transparent: true, opacity: .85, side: THREE.DoubleSide, clippingPlanes: [clip],
    }));
    gTankFu.add(fuLiquid);
    gTankFu.position.y = 2.5;

    // משאבות טורבו
    const pumpBody = new THREE.Mesh(new THREE.CylinderGeometry(.62, .72, .8, 30), steelMat);
    gPump.add(pumpBody);
    const turb = new THREE.Group(); gPump.add(turb);
    for (let i = 0; i < 9; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(.5, .05, .16), copperMat);
      b.position.set(Math.cos(i / 9 * Math.PI * 2) * .3, .18, Math.sin(i / 9 * Math.PI * 2) * .3);
      b.rotation.y = -i / 9 * Math.PI * 2; b.rotation.z = .5;
      turb.add(b);
    }
    // צנרת
    [[-1, 0x6fc4ff], [1, 0xffc61e]].forEach(([s, col]) => {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(.11, .11, 2.0, 14), shellMat(col, .3, .8));
      pipe.position.set(s * .95, .7, 0); pipe.rotation.z = s * .22;
      gPump.add(pipe);
    });
    gPump.position.y = .55;

    // תא בעירה + גרון (חתך אמיתי)
    const chamberProfile = [
      [.86, 1.05], [.86, .35], [.80, .05], [.52, -.3], [.40, -.55], [.40, -.72],
    ];
    const chamber = new THREE.Mesh(lathe(chamberProfile, 48), steelMat);
    gChamber.add(chamber);
    // מעטפת קירור
    const jacket = new THREE.Mesh(lathe(chamberProfile.map(p => [p[0] + .09, p[1]]), 48), copperMat);
    jacket.material = shellMat(C.copper, .35, .9);
    gChamber.add(jacket);
    // לוח מזרקים
    const inj = new THREE.Mesh(new THREE.CylinderGeometry(.86, .86, .12, 40), copperMat);
    inj.position.y = 1.0; gChamber.add(inj);
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2, rr = .28 + (i % 3) * .2;
      const h = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, .2, 8), new THREE.MeshStandardMaterial({ color: 0x2a3550, roughness: .5, clippingPlanes: [clip] }));
      h.position.set(Math.cos(a) * rr, .95, Math.sin(a) * rr);
      gChamber.add(h);
    }
    // להבת פנים (בעירה)
    const burn = new THREE.Mesh(lathe([[0, .95], [.74, .5], [.7, .05], [.44, -.32], [.3, -.7], [0, -.72]], 32),
      new THREE.MeshBasicMaterial({ color: 0xffd88a, transparent: true, opacity: .0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false, clippingPlanes: [clip] }));
    gChamber.add(burn);
    // האור יושב על ה-root ולא בתוך תא הבעירה, כדי שימשיך לעבוד גם במצב דלק מוצק
    const burnLight = new THREE.PointLight(0xffb040, 0, 9); root.add(burnLight);
    gChamber.position.y = -1.35;

    // פעמון סילון
    const bellPts = [];
    for (let i = 0; i <= 22; i++) { const t = i / 22; bellPts.push([.40 + 1.35 * Math.pow(t, 1.75), -t * 2.5]); }
    const bell = new THREE.Mesh(lathe(bellPts, 52), steelMat);
    gNozzle.add(bell);
    // צלעות קירור
    const ribMat = shellMat(0x9fb0cc, .35, .9);
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2;
      const pts = bellPts.map(p => new THREE.Vector3(Math.cos(a) * (p[0] + .045), p[1], Math.sin(a) * (p[0] + .045)));
      const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 20, .05, 6, false), ribMat);
      gNozzle.add(tube);
    }
    gNozzle.position.y = -2.07;

    /* ---- מצב "דלק מוצק": מארז אחד עם גרגר דלק וקדח כוכב ---- */
    const gSolid = new THREE.Group(); root.add(gSolid); gSolid.visible = false;
    const caseMat = shellMat(0x8e9bb2, .3, .9);
    const solidCase = new THREE.Mesh(lathe([[0, 2.6], [.9, 2.45], [.96, 2.1], [.96, -2.1], [.9, -2.35], [.5, -2.6]], 44), caseMat);
    gSolid.add(solidCase);
    // גרגר הדלק — חתך אמיתי עם קדח בצורת כוכב
    (function grain() {
      const outer = new THREE.Shape();
      outer.absarc(0, 0, .86, 0, Math.PI * 2, false);
      const hole = new THREE.Path();
      const P = 7, ri = .17, ro = .44;
      for (let i = 0; i <= P * 2; i++) {
        const a = (i / (P * 2)) * Math.PI * 2;
        const r = i % 2 ? ri : ro;
        const x = Math.cos(a) * r, y = Math.sin(a) * r;
        if (i === 0) hole.moveTo(x, y); else hole.lineTo(x, y);
      }
      outer.holes.push(hole);
      const g = new THREE.ExtrudeGeometry(outer, { depth: 4.2, bevelEnabled: false, curveSegments: 40 });
      g.rotateX(-Math.PI / 2);      // ההוצאה היא לאורך Z; אחרי הסיבוב היא לאורך Y ‎(0..4.2)
      g.translate(0, -2.1, 0);      // ממרכזים סביב y=0
      const m = new THREE.MeshStandardMaterial({
        color: 0x6b5a4a, roughness: .95, metalness: .04,
        side: THREE.DoubleSide, clippingPlanes: [clip],
      });
      const mesh = new THREE.Mesh(g, m);
      gSolid.add(mesh);
      // להבה בתוך הקדח
      const gb = new THREE.Mesh(new THREE.CylinderGeometry(.42, .5, 4.2, 26, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xffd070, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false, clippingPlanes: [clip] }));
      gSolid.add(gb);
      gSolid.userData.burn = gb;
    })();
    // מצת בראש המארז
    const igniter = new THREE.Mesh(new THREE.CylinderGeometry(.2, .28, .5, 20), copperMat);
    igniter.position.y = 2.6; gSolid.add(igniter);
    gSolid.position.y = 1.0;

    // סילון יציאה
    const jet = new Jet({ count: 420, size: .5, speed: 17, spread: .6, life: .6, color: 0xffe2b0 });
    const jetSmoke = new Jet({ count: 180, tex: TEX_SMOKE, size: 1.5, speed: 8, spread: .95, life: 1.5, color: 0xa8bcd8, blending: THREE.NormalBlending });
    root.add(jet.points, jetSmoke.points);
    const diamond = new THREE.Group(); root.add(diamond);
    for (let i = 0; i < 5; i++) {
      const d = new THREE.Mesh(new THREE.SphereGeometry(.28 - i * .03, 16, 12),
        new THREE.MeshBasicMaterial({ color: 0xcfe6ff, transparent: true, opacity: .0, blending: THREE.AdditiveBlending, depthWrite: false }));
      d.scale.y = 2.0; d.position.y = -5.6 - i * .85;
      diamond.add(d);
    }

    /* ---- תוויות ---- */
    const labels = Labeller();
    const L = {
      ox: labels.add('מיכל <b>מחמצן</b><small>חמצן נוזלי — במקום אוויר</small>', new THREE.Vector3(1.4, 5.3, 0), 'blue'),
      fu: labels.add('מיכל <b>דלק</b><small>מה שנשרף</small>', new THREE.Vector3(1.4, 2.5, 0), 'yellow'),
      pump: labels.add('<b>משאבות</b><small>דוחפות פנימה בעוצמה</small>', new THREE.Vector3(1.7, .55, 0), ''),
      ch: labels.add('<b>תא בעירה</b><small>3,000° — כאן הכול מתפוצץ</small>', new THREE.Vector3(1.6, -1.0, 0), 'red'),
      th: labels.add('<b>הגרון</b><small>הצוואר הצר — כאן הגז מאיץ</small>', new THREE.Vector3(1.2, -2.1, 0), 'red'),
      nz: labels.add('<b>פעמון הסילון</b><small>מכוון את הגז החוצה = דחף</small>', new THREE.Vector3(2.4, -3.6, 0), 'green'),
      sol: labels.add('<b>גרגר דלק מוצק</b><small>נשרף מהקדח כלפי חוץ — כמו נר ענק</small>', new THREE.Vector3(1.6, 1.0, 0), 'yellow'),
      ign: labels.add('<b>מצת</b><small>מדליק פעם אחת — ואין דרך חזרה</small>', new THREE.Vector3(1.5, 3.6, 0), 'red'),
    };
    L.sol.shown = L.ign.shown = false;

    let explode = 0, ignition = false, t = 0, orbit = null, solid = false, labelsOn = true;
    const basePos = { ox: 5.3, fu: 2.5, pump: .55, ch: -1.35, nz: -2.07 };

    return {
      scene, camera, labels,
      attachOrbitTo(dom) { if (orbit) orbit.dispose(); orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 1.0, 0), { minR: 11, maxR: 44, autoRot: .13 }); this.orbit = orbit; },
      onEnter() { labels.mountTo(Stage.host); },
      onLeave() { },
      setExplode(v) {
        explode = v;
        // מרחיקים את המצלמה רק כשהמחוון זז, כדי לא להילחם בזום של המשתמש
        if (orbit) { orbit.state.tR = 18 + v * 11; orbit.state.target.y = .9 + v * .6; }
      },
      setCut(v) { setCut(v); },
      setIgnition(v) { ignition = v; jet.setOn(v); jetSmoke.setOn(v); },
      setLabels(v) { labelsOn = v; this.applyLabels(); },
      // מעבר בין מנוע דלק נוזלי למנוע דלק מוצק
      setSolid(v) {
        solid = v;
        [gTankOx, gTankFu, gPump].forEach(g => g.visible = !v);
        gChamber.visible = !v;
        gSolid.visible = v;
        this.applyLabels();
      },
      applyLabels() {
        const on = labelsOn;
        L.ox.shown = L.fu.shown = L.pump.shown = L.ch.shown = on && !solid;
        L.sol.shown = L.ign.shown = on && solid;
        L.th.shown = L.nz.shown = on;
      },
      get solid() { return solid; },
      get ignition() { return ignition; },
      update(dt) {
        t += dt;
        const e = explode;
        gTankOx.position.y = basePos.ox + e * 3.2;
        gTankFu.position.y = basePos.fu + e * 1.6;
        gPump.position.y = basePos.pump + e * .35;
        gChamber.position.y = basePos.ch - e * .9;
        gNozzle.position.y = basePos.nz - e * 3.2;
        gSolid.position.y = 1.0 + e * 2.2;
        jacket.visible = !solid && e > .04;

        // תוויות עוקבות אחרי החלקים
        L.ox.pos.set(1.45, gTankOx.position.y, 0);
        L.fu.pos.set(1.45, gTankFu.position.y, 0);
        L.pump.pos.set(1.75, gPump.position.y, 0);
        L.ch.pos.set(1.75, gChamber.position.y + .75, 0);
        L.th.pos.set(-1.35, solid ? gSolid.position.y - 2.6 : gChamber.position.y - .72, 0);
        L.nz.pos.set(2.55, gNozzle.position.y - 1.9, 0);
        L.sol.pos.set(1.7, gSolid.position.y + .4, 0);
        L.ign.pos.set(1.5, gSolid.position.y + 2.7, 0);

        turb.rotation.y += dt * (ignition ? 26 : 1.2);
        const burnT = ignition ? 1 : 0;
        burn.material.opacity += (burnT * .82 - burn.material.opacity) * Math.min(1, dt * 6);
        burn.material.color.setHSL(.09, 1, .62 + Math.sin(t * 30) * .06);
        const sb = gSolid.userData.burn;
        sb.material.opacity += ((ignition ? .55 : 0) - sb.material.opacity) * Math.min(1, dt * 6);
        burnLight.intensity += ((ignition ? 55 : 0) - burnLight.intensity) * Math.min(1, dt * 6);
        burnLight.position.y = solid ? gSolid.position.y : gChamber.position.y;

        const exitY = gNozzle.position.y - 2.5;
        jet.points.position.set(0, exitY, 0);
        jetSmoke.points.position.set(0, exitY - .5, 0);
        jet.power = .92 + Math.sin(t * 24) * .08;
        jet.update(dt); jetSmoke.update(dt);
        diamond.children.forEach((d, i) => {
          const target = ignition ? .5 - i * .07 : 0;
          d.material.opacity += (target - d.material.opacity) * Math.min(1, dt * 6);
          d.position.y = exitY - .8 - i * .85;
        });
        // רעידות בהצתה
        root.position.x = ignition ? (Math.random() - .5) * .045 : 0;
        root.position.z = ignition ? (Math.random() - .5) * .045 : 0;

        labels.project(camera, Stage.host);
      },
    };
  });

  /* ============================================================
     סצנה 4 — משחק ההרכבה
     ============================================================ */
  Stage.register('build', (S) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1.6, .1, 500);
    camera.position.set(2, 2, 13);
    lightRig(scene);
    scene.add(starField(500, 150));

    const root = new THREE.Group(); scene.add(root);
    root.position.y = -3.2;

    // כן שיגור
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.1, .5, 40), M.paint(0x263453, .8));
    pad.position.y = -.25; root.add(pad);
    const padRing = new THREE.Mesh(new THREE.TorusGeometry(2.65, .09, 10, 48), M.glow(C.blue, .85));
    padRing.rotation.x = Math.PI / 2; padRing.position.y = .02; root.add(padRing);

    const R = .78;
    const parts = [];

    function reg(g, targetY) { g.userData.targetY = targetY; g.visible = false; root.add(g); parts.push(g); return g; }

    // 1. מנוע + סנפירים
    const pEngine = new THREE.Group();
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 1.05, .9, 40), M.paint(C.blue, .3));
    skirt.position.y = .45; pEngine.add(skirt);
    const bp = []; for (let i = 0; i <= 16; i++) { const t = i / 16; bp.push([R * (.32 + .6 * Math.pow(t, 1.8)), -t * 1.15]); }
    const bell4 = new THREE.Mesh(lathe(bp, 40), M.metal(C.steel, .22)); bell4.material.side = THREE.DoubleSide;
    pEngine.add(bell4);
    addFins(pEngine, 4, finGeo(1.5, 1.25, .09), M.paint(C.amber, .32), R * .86, .12);
    reg(pEngine, 1.2);

    // 2. מיכל דלק
    const pTank = new THREE.Group();
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 2.2, 40), M.paint(C.white, .34));
    pTank.add(tank);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.015, R * 1.015, .3, 40), M.paint(C.amber, .3));
    band.position.y = -.7; pTank.add(band);
    reg(pTank, 2.4);

    // 3. תא מטען
    const pCargo = new THREE.Group();
    const cargo = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 1.7, 40), M.paint(C.white, .34));
    pCargo.add(cargo);
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.015, R * 1.015, .34, 40), M.paint(C.blue, .3));
    stripe.position.y = .4; pCargo.add(stripe);
    const win = new THREE.Mesh(new THREE.SphereGeometry(.3, 22, 16), M.glass(0x9fe0ff, .6));
    win.position.set(0, -.2, R * .92); pCargo.add(win);
    reg(pCargo, 4.35);

    // 4. חרטום
    const pNose = new THREE.Group();
    const nose = new THREE.Mesh(lathe(Array.from({ length: 16 }, (_, i) => {
      const t = i / 15; return [R * Math.cos(t * Math.PI / 2), 1.9 * t];
    }), 40), M.paint(C.yellow, .28));
    pNose.add(nose);
    reg(pNose, 5.2);

    const jet = new Jet({ count: 380, size: .55, speed: 15, spread: .45, life: .55, color: 0xffdca8 });
    const smoke = new Jet({ count: 220, tex: TEX_SMOKE, size: 1.7, speed: 7, spread: 1.4, life: 1.8, color: 0xa8bcd8, blending: THREE.NormalBlending });
    root.add(jet.points, smoke.points);

    const labels = Labeller();
    const nameOf = ['מקטע ההנעה', 'מיכלי הדלק', 'המטען המועיל', 'החרטום'];
    const lbls = parts.map((p, i) => labels.add(nameOf[i], new THREE.Vector3(0, 0, 0), 'sm'));
    lbls.forEach(l => l.shown = false);

    let placed = 0, t = 0, orbit = null, launching = false, lv = 0;

    return {
      scene, camera, labels,
      attachOrbitTo(dom) { if (orbit) orbit.dispose(); orbit = attachOrbit(camera, dom, new THREE.Vector3(0, .5, 0), { minR: 8, maxR: 26, autoRot: .1 }); this.orbit = orbit; },
      onEnter() { labels.mountTo(Stage.host); },
      place(i) {
        const p = parts[i];
        p.visible = true;
        p.position.set(0, p.userData.targetY + 9, 0);
        p.rotation.y = Math.PI * 1.5;
        p.userData.dropping = true;
        lbls[i].shown = true;
        placed++;
      },
      reset() {
        parts.forEach(p => { p.visible = false; p.userData.dropping = false; });
        lbls.forEach(l => l.shown = false);
        placed = 0; launching = false; lv = 0;
        root.position.y = -3.2;
        jet.setOn(false); smoke.setOn(false);
      },
      launch() {
        if (launching) return;
        launching = true; lv = 0;
        jet.setOn(true); smoke.setOn(true);
      },
      update(dt) {
        t += dt;
        padRing.material.emissiveIntensity = .6 + Math.sin(t * 3) * .3;
        parts.forEach((p, i) => {
          if (!p.visible) return;
          p.position.y += (p.userData.targetY - p.position.y) * Math.min(1, dt * 7);
          p.rotation.y += (0 - p.rotation.y) * Math.min(1, dt * 6);
          lbls[i].pos.set(R * 1.25, root.position.y + p.position.y, 0);
        });
        if (launching) {
          lv += dt * 5.5;
          root.position.y += lv * dt;
          root.position.x = (Math.random() - .5) * .06;
          jet.power = 1.1;
          if (root.position.y > 26) { root.position.y = -3.2; }
        }
        const bottom = parts[0].visible ? parts[0].position.y - 1.15 : 0;
        jet.points.position.set(0, bottom, 0);
        smoke.points.position.set(0, bottom - .4, 0);
        jet.update(dt); smoke.update(dt);
        labels.project(camera, Stage.host);
      },
      get placed() { return placed; },
    };
  });

  /* ============================================================
     סצנה 5 — היסטוריה: 6 רקטות
     ============================================================ */
  Stage.register('history', (S) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1.6, .1, 500);
    camera.position.set(0, 1.6, 14);
    lightRig(scene);
    scene.add(starField(600, 170));

    const stand = new THREE.Group(); scene.add(stand);
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(3.6, 3.9, .22, 56), M.paint(0x1c2949, .85));
    disc.position.y = -4.2; stand.add(disc);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.65, .055, 8, 64), M.glow(C.blue, .8));
    ring.rotation.x = Math.PI / 2; ring.position.y = -4.06; stand.add(ring);

    const holder = new THREE.Group(); holder.position.y = -4.0; scene.add(holder);

    /* --- מודלים --- */
    const models = [];
    function push(g) { g.visible = false; holder.add(g); models.push(g); return g; }

    // 1232 — חץ אש סיני
    (function () {
      const g = new THREE.Group();
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(.07, .09, 6, 14), M.paint(0x8d6236, .8));
      shaft.position.y = 3; g.add(shaft);
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(.3, .34, 1.5, 20), M.paint(0x6f4a24, .85));
      tube.position.y = 2.1; g.add(tube);
      for (let i = 0; i < 3; i++) {
        const b = new THREE.Mesh(new THREE.TorusGeometry(.33, .04, 8, 22), M.paint(0x3d2a14, .9));
        b.rotation.x = Math.PI / 2; b.position.y = 1.6 + i * .5; g.add(b);
      }
      const tip = new THREE.Mesh(new THREE.ConeGeometry(.16, .7, 14), M.metal(0xb9c4d6, .35));
      tip.position.y = 6.3; g.add(tip);
      for (let i = 0; i < 3; i++) {
        const f = new THREE.Mesh(new THREE.BoxGeometry(.02, .55, .38), M.paint(0xe8e2d4, .8));
        const a = i / 3 * Math.PI * 2;
        f.position.set(Math.cos(a) * .13, 5.35, Math.sin(a) * .13); f.rotation.y = -a;
        g.add(f);
      }
      push(g);
    })();

    // 1926 — רקטת הדלק הנוזלי של גודארד
    (function () {
      const g = new THREE.Group();
      const frame = M.metal(0x9fb0c9, .38);
      // מנוע בראש
      const eng = new THREE.Mesh(lathe([[.16, .8], [.16, .2], [.42, -.35]], 24), M.metal(0xd9dfe9, .3));
      eng.material.side = THREE.DoubleSide; eng.position.y = 5.6; g.add(eng);
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2;
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, 4.6, 8), frame);
        rod.position.set(Math.cos(a) * .42, 3.2, Math.sin(a) * .42); g.add(rod);
      }
      const t1 = new THREE.Mesh(new THREE.CylinderGeometry(.34, .34, 1.5, 22), M.metal(0xbfc9d8, .35));
      t1.position.y = 1.6; g.add(t1);
      const t2 = new THREE.Mesh(new THREE.CylinderGeometry(.28, .28, 1.1, 22), M.paint(0x5b6d8c, .5));
      t2.position.y = 3.1; g.add(t2);
      const cone = new THREE.Mesh(new THREE.ConeGeometry(.4, .7, 22), M.metal(0xd9dfe9, .3));
      cone.position.y = .5; cone.rotation.x = Math.PI; g.add(cone);
      push(g);
    })();

    // 1942 — V-2
    (function () {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(.6, .6, 5, 36), M.paint(0xe8ecf3, .4));
      body.position.y = 3.1; g.add(body);
      const boat = new THREE.Mesh(new THREE.CylinderGeometry(.6, .38, 1.1, 36), M.paint(0xe8ecf3, .4));
      boat.position.y = .05; g.add(boat);
      const nose = new THREE.Mesh(lathe(Array.from({ length: 14 }, (_, i) => { const t = i / 13; return [.6 * Math.cos(t * Math.PI / 2), 5.6 + 2.0 * t]; }), 36), M.paint(0xe8ecf3, .4));
      g.add(nose);
      // תבנית שחור-לבן קלאסית
      for (let i = 0; i < 4; i++) {
        const q = new THREE.Mesh(new THREE.CylinderGeometry(.605, .605, 2.4, 20, 1, true, i * Math.PI / 2, Math.PI / 2),
          new THREE.MeshStandardMaterial({ color: i % 2 ? 0x1a1f2b : 0xe8ecf3, roughness: .45, side: THREE.DoubleSide }));
        q.position.y = 4.6; g.add(q);
      }
      const bell = new THREE.Mesh(lathe([[.2, .1], [.28, -.35], [.45, -.85]], 30), M.metal(0x6c7688, .4));
      bell.material.side = THREE.DoubleSide; bell.position.y = -.4; g.add(bell);
      addFins(g, 4, finGeo(2.0, 1.4, .1), M.paint(0xd7dce6, .45), .5, .0);
      push(g);
    })();

    // 1957 — ספוטניק 1
    (function () {
      const g = new THREE.Group();
      const ball = new THREE.Mesh(new THREE.SphereGeometry(1.15, 44, 32), M.metal(0xe3e9f2, .12));
      ball.position.y = 3.2; g.add(ball);
      const seam = new THREE.Mesh(new THREE.TorusGeometry(1.15, .035, 8, 48), M.metal(0x93a0b5, .3));
      seam.rotation.x = Math.PI / 2; seam.position.y = 3.2; g.add(seam);
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2 + .4;
        const ant = new THREE.Mesh(new THREE.CylinderGeometry(.035, .015, 4.4, 8), M.metal(0xb8c2d2, .3));
        ant.position.set(Math.cos(a) * 1.5, 1.7, Math.sin(a) * 1.5);
        ant.rotation.z = Math.cos(a) * .55; ant.rotation.x = -Math.sin(a) * .55;
        g.add(ant);
      }
      const glowS = new THREE.Mesh(new THREE.SphereGeometry(1.45, 32, 24), new THREE.MeshBasicMaterial({ color: C.blue, transparent: true, opacity: .1, side: THREE.BackSide }));
      glowS.position.y = 3.2; g.add(glowS);
      push(g);
    })();

    // 1969 — סטרן 5 / אפולו 11
    (function () {
      const g = new THREE.Group();
      const white = M.paint(0xf2f5fa, .42), black = M.paint(0x1a1f2b, .5);
      const s1 = new THREE.Mesh(new THREE.CylinderGeometry(.85, .85, 2.6, 40), white); s1.position.y = 1.5; g.add(s1);
      const s2 = new THREE.Mesh(new THREE.CylinderGeometry(.85, .85, 2.0, 40), white); s2.position.y = 4.05; g.add(s2);
      const inter = new THREE.Mesh(new THREE.CylinderGeometry(.62, .85, .8, 40), white); inter.position.y = 5.45; g.add(inter);
      const s3 = new THREE.Mesh(new THREE.CylinderGeometry(.62, .62, 1.6, 40), white); s3.position.y = 6.6; g.add(s3);
      const csm = new THREE.Mesh(new THREE.CylinderGeometry(.3, .48, 1.0, 30), M.metal(0xc4cddd, .25)); csm.position.y = 7.85; g.add(csm);
      const esc = new THREE.Mesh(new THREE.ConeGeometry(.3, .9, 24), M.paint(0xe23c3c, .5)); esc.position.y = 8.75; g.add(esc);
      const tow = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, 1.2, 8), M.metal(0xd0d8e6)); tow.position.y = 9.6; g.add(tow);
      [[.9, 2.55], [.35, 3.9], [.35, 5.0]].forEach(([h, y]) => {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(.86, .86, h, 40), black); b.position.y = y; g.add(b);
      });
      addFins(g, 4, finGeo(1.0, .8, .08), black, .8, .1);
      for (let i = 0; i < 5; i++) {
        const a = i === 4 ? 0 : (i / 4) * Math.PI * 2, rr = i === 4 ? 0 : .42;
        const b = new THREE.Mesh(lathe([[.1, .1], [.16, -.16], [.28, -.5]], 20), M.metal(0x5c6779, .4));
        b.material.side = THREE.DoubleSide;
        b.position.set(Math.cos(a) * rr, .2, Math.sin(a) * rr); g.add(b);
      }
      push(g);
    })();

    // 2015 — פאלקון 9 (נוחתת)
    (function () {
      const g = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 7.4, 40), M.paint(0xf4f7fc, .38));
      body.position.y = 4.1; g.add(body);
      const inter = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, .7, 40), M.paint(0x11151f, .55)); inter.position.y = 7.9; g.add(inter);
      const fair = new THREE.Mesh(lathe(Array.from({ length: 14 }, (_, i) => { const t = i / 13; return [.5 * Math.cos(t * Math.PI / 2 * .98), 8.3 + 1.9 * t]; }), 40), M.paint(0xf4f7fc, .38));
      g.add(fair);
      // רגלי נחיתה
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2 + .78;
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(.075, .1, 2.5, 10), M.paint(0x11151f, .5));
        leg.position.set(Math.cos(a) * .82, .78, Math.sin(a) * .82);
        leg.rotation.z = -Math.cos(a) * .55; leg.rotation.x = Math.sin(a) * .55;
        g.add(leg);
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(.26, .26, .1, 14), M.metal(0x8f9aad));
        foot.position.set(Math.cos(a) * 1.5, .06, Math.sin(a) * 1.5); g.add(foot);
        // סנפירי רשת
        const gf = new THREE.Mesh(new THREE.BoxGeometry(.06, .55, .42), M.metal(0x9aa5b8, .5));
        gf.position.set(Math.cos(a) * .56, 7.2, Math.sin(a) * .56); gf.rotation.y = -a; g.add(gf);
      }
      for (let i = 0; i < 9; i++) {
        const a = i === 8 ? 0 : (i / 8) * Math.PI * 2, rr = i === 8 ? 0 : .3;
        const b = new THREE.Mesh(lathe([[.07, .05], [.1, -.1], [.16, -.32]], 16), M.metal(0x4d5666, .4));
        b.material.side = THREE.DoubleSide;
        b.position.set(Math.cos(a) * rr, .3, Math.sin(a) * rr); g.add(b);
      }
      const lj = new Jet({ count: 160, size: .3, speed: 8, spread: .22, life: .35, color: 0xbfe0ff });
      lj.points.position.y = -.05; g.add(lj.points); lj.setOn(true);
      g.userData.jet = lj;
      push(g);
    })();

    let cur = -1, t = 0, orbit = null, anim = 0;
    const fits = [1.0, 1.05, .95, 1.35, .72, .82]; // מקדם קנה מידה לכל דגם

    return {
      scene, camera,
      attachOrbitTo(dom) { if (orbit) orbit.dispose(); orbit = attachOrbit(camera, dom, new THREE.Vector3(0, -.2, 0), { minR: 8, maxR: 30, autoRot: .18 }); this.orbit = orbit; },
      show(i) {
        if (i === cur) return;
        models.forEach((m, k) => { m.visible = k === i; });
        cur = i; anim = 0;
        const s = fits[i];
        holder.scale.setScalar(s);
      },
      update(dt) {
        t += dt; anim += dt;
        ring.material.emissiveIntensity = .55 + Math.sin(t * 2.4) * .3;
        disc.rotation.y += dt * .15;
        holder.rotation.y += dt * .35;
        const m = models[cur];
        if (m) {
          const k = Math.min(1, anim * 2.4);
          const ease = 1 - Math.pow(1 - k, 3);
          m.position.y = (1 - ease) * 9;
          m.scale.setScalar(.4 + ease * .6);
          if (m.userData.jet) m.userData.jet.update(dt);
        }
      },
    };
  });

  /* ============================================================
     סצנה 6 — רקטת הבקבוק: דיאגרמה מפורקת
     ============================================================ */
  Stage.register('bottle', (S) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1.6, .1, 500);
    camera.position.set(7, 3, 16);
    lightRig(scene);
    const fill = new THREE.PointLight(0xbfe4ff, 30, 60); fill.position.set(-6, 4, 6); scene.add(fill);
    scene.add(starField(400, 140));

    const root = new THREE.Group(); scene.add(root);

    // PET שקוף — בלי transmission (יקר ומחזיר אפור על רקע כהה)
    const petMat = new THREE.MeshPhysicalMaterial({
      color: 0xcdeeff, roughness: .05, metalness: 0,
      transparent: true, opacity: .26, side: THREE.DoubleSide, depthWrite: false,
      clearcoat: 1, clearcoatRoughness: .04,
    });

    // פרופיל בקבוק (הפוך — הפייה למטה)
    const bp = [
      [0, 5.2], [1.05, 4.95], [1.15, 4.4], [1.15, 1.0], [1.05, .55],
      [.62, .25], [.42, .0], [.4, -.5], [.46, -.62], [.4, -.75],
    ];
    const gBottle = new THREE.Group(); root.add(gBottle);
    const bottle = new THREE.Mesh(lathe(bp, 52), petMat);
    gBottle.add(bottle);
    // חריצי הבסיס האופייניים
    const base = new THREE.Mesh(lathe([[0, 5.35], [.55, 5.34], [.95, 5.16], [1.06, 4.95]], 52), new THREE.MeshStandardMaterial({ color: 0xcfe6f7, roughness: .25, transparent: true, opacity: .3, side: THREE.DoubleSide, depthWrite: false }));
    gBottle.add(base);

    // מים
    const gWater = new THREE.Group(); root.add(gWater);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x11a6ff, emissive: 0x0b4d80, emissiveIntensity: .35,
      roughness: .05, metalness: 0, transparent: true, opacity: .8, side: THREE.DoubleSide,
    });
    let waterMesh = null, waterTopY = 1.0;
    // כמעט כל הנפח של הבקבוק נמצא בגוף הגלילי (y≈1.0..4.95) ולא בצוואר,
    // ולכן מפלס המים נגזר מהמילוי של הגוף — לא מגובה כולל של הבקבוק.
    function rebuildWater(frac) {
      if (waterMesh) { gWater.remove(waterMesh); waterMesh.geometry.dispose(); }
      const topY = waterTopY = 1.0 + THREE.MathUtils.clamp(frac, 0, 1) * 3.9;
      const pts = bp.filter(p => p[1] <= topY).map(p => [p[0] * .95, p[1]]);
      if (pts.length < 2) return;
      pts.push([1.15 * .95, topY], [0, topY]);
      waterMesh = new THREE.Mesh(lathe(pts, 48), waterMat);
      gWater.add(waterMesh);
    }
    rebuildWater(.33);

    // אוויר דחוס (בועות)
    const gAir = new THREE.Group(); root.add(gAir);
    const bubbles = [];
    for (let i = 0; i < 40; i++) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(.06 + Math.random() * .07, 12, 8),
        new THREE.MeshBasicMaterial({ color: 0xdff4ff, transparent: true, opacity: .5 }));
      b.userData.p = Math.random();
      gAir.add(b); bubbles.push(b);
    }

    // פקק / שסתום
    const gCap = new THREE.Group(); root.add(gCap);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(.44, .44, .5, 26), M.paint(0xff5c6e, .4));
    cap.position.y = -1.0; gCap.add(cap);
    const nozzlePipe = new THREE.Mesh(new THREE.CylinderGeometry(.14, .14, 1.5, 18), M.metal(0xb8c3d4, .3));
    nozzlePipe.position.y = -1.9; gCap.add(nozzlePipe);
    const gauge = new THREE.Mesh(new THREE.CylinderGeometry(.35, .35, .12, 24), M.metal(0xd6dde8, .25));
    gauge.rotation.z = Math.PI / 2; gauge.position.set(.7, -2.35, 0); gCap.add(gauge);
    const hose = new THREE.Mesh(new THREE.TorusGeometry(.8, .07, 8, 30, Math.PI * .8), M.paint(0x1b2440, .6));
    hose.position.set(.75, -2.9, 0); hose.rotation.z = -.6; gCap.add(hose);

    // סנפירים
    const gFins = new THREE.Group(); root.add(gFins);
    addFins(gFins, 3, finGeo(1.9, 1.35, .06), M.paint(C.blue, .35), 1.0, .5);

    // חרטום
    const gNose = new THREE.Group(); root.add(gNose);
    const cone = new THREE.Mesh(lathe(Array.from({ length: 16 }, (_, i) => {
      const t = i / 15; return [1.12 * Math.cos(t * Math.PI / 2), 5.35 + 2.1 * t];
    }), 44), M.paint(C.yellow, .3));
    gNose.add(cone);
    const clay = new THREE.Mesh(new THREE.SphereGeometry(.55, 22, 16), M.paint(0xb06a3a, .8));
    clay.position.y = 5.9; clay.scale.y = .7; gNose.add(clay);

    // סילון מים
    const wjet = new Jet({ count: 260, tex: TEX_WATER, size: .32, speed: 16, spread: .2, life: .5, color: 0xa8e0ff });
    wjet.points.position.y = -.9; root.add(wjet.points);

    const labels = Labeller();
    const L = [
      labels.add('<b>חרטום + משקולת</b><small>מייצב וחודר אוויר</small>', new THREE.Vector3(0, 0, 0), 'yellow'),
      labels.add('<b>אוויר דחוס</b><small>הקפיץ — כאן נשמרת האנרגיה</small>', new THREE.Vector3(0, 0, 0), 'blue'),
      labels.add('<b>מים</b><small>הדלק! הם נזרקים החוצה</small>', new THREE.Vector3(0, 0, 0), 'blue'),
      labels.add('<b>סנפירים</b><small>שומרים על מסלול ישר</small>', new THREE.Vector3(0, 0, 0), ''),
      labels.add('<b>פקק ושסתום</b><small>הפייה — כאן הכול יוצא</small>', new THREE.Vector3(0, 0, 0), 'red'),
      labels.add('<b>משאבה + מד לחץ</b><small>ככל שיותר לחץ — יותר גובה</small>', new THREE.Vector3(0, 0, 0), 'green'),
    ];

    let explode = 0, waterFrac = .33, t = 0, orbit = null, spray = false;

    return {
      scene, camera, labels,
      attachOrbitTo(dom) { if (orbit) orbit.dispose(); orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 2.2, 0), { minR: 11, maxR: 42, autoRot: .12 }); this.orbit = orbit; },
      onEnter() { labels.mountTo(Stage.host); },
      setExplode(v) {
        explode = v;
        if (orbit) { orbit.state.tR = 17 + v * 13; orbit.state.target.y = 2.2 + v * .4; }
      },
      setWater(f) { waterFrac = f; rebuildWater(f); },
      setSpray(v) { spray = v; wjet.setOn(v); },
      setLabels(v) { L.forEach(l => l.shown = v); },
      update(dt) {
        t += dt;
        const e = explode;
        gNose.position.y = e * 3.0;
        gBottle.position.y = 0;
        gWater.position.x = -e * 4.6;
        gAir.position.x = e * 4.6;
        gFins.position.z = -e * 4.0;
        gCap.position.y = -e * 2.4;

        // בועות אוויר מעל מפלס המים
        const airBase = waterTopY;
        const airH = Math.max(.4, 5.0 - airBase);
        bubbles.forEach((b, i) => {
          b.userData.p += dt * (.12 + (i % 5) * .03);
          if (b.userData.p > 1) b.userData.p -= 1;
          const p = b.userData.p;
          const a = i * 2.399;
          const rr = .35 + (i % 7) * .11;
          b.position.set(Math.cos(a + t * .4) * rr, airBase + .2 + p * airH, Math.sin(a + t * .4) * rr);
          b.material.opacity = .18 + .35 * Math.sin(p * Math.PI);
        });

        root.rotation.z = Math.sin(t * .5) * .015;
        wjet.points.position.y = gCap.position.y - .9;
        wjet.update(dt);

        // מיקומי תוויות
        L[0].pos.set(1.5, 6.6 + gNose.position.y, 0);
        L[1].pos.set(1.5 + gAir.position.x, airBase + airH * .55, 0);
        L[2].pos.set(-1.6 + gWater.position.x, (airBase + .3) * .5, 0);
        L[3].pos.set(1.4, 1.0, -2.0 + gFins.position.z);
        L[4].pos.set(-1.8, -1.0 + gCap.position.y, 0);
        L[5].pos.set(2.6, -3.0 + gCap.position.y, 0);
        labels.project(camera, Stage.host);
      },
    };
  });

  /* ============================================================
     סצנה 7 — סימולטור שיגור רקטת מים
     ============================================================ */
  Stage.register('sim', (S) => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1.6, .1, 3000);
    camera.position.set(3.5, 3, 13);
    lightRig(scene);
    scene.background = null;
    scene.fog = new THREE.Fog(0x0a1024, 60, 400);

    // קרקע
    const ground = new THREE.Mesh(new THREE.CircleGeometry(400, 64), new THREE.MeshStandardMaterial({ color: 0x16305a, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2; scene.add(ground);
    const grid = new THREE.GridHelper(400, 60, C.blue, 0x1d2c50);
    grid.material.transparent = true; grid.material.opacity = .3; grid.position.y = .02; scene.add(grid);

    // סרגל גובה
    const ruler = new THREE.Group(); scene.add(ruler);
    for (let m = 10; m <= 120; m += 10) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(3.2, .12, .12), new THREE.MeshBasicMaterial({ color: m % 50 === 0 ? C.yellow : 0x40608f }));
      bar.position.set(-7, m, 0); ruler.add(bar);
    }
    const pole = new THREE.Mesh(new THREE.BoxGeometry(.1, 130, .1), new THREE.MeshBasicMaterial({ color: 0x2b4470 }));
    pole.position.set(-7, 65, 0); ruler.add(pole);

    // כן שיגור
    const pad = new THREE.Group(); scene.add(pad);
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, .3, 30), M.paint(0x24345a, .8));
    plate.position.y = .15; pad.add(plate);
    for (let i = 0; i < 3; i++) {
      const a = i / 3 * Math.PI * 2;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, 2.2, 8), M.metal(0x8fa0bb, .4));
      leg.position.set(Math.cos(a) * 1.1, 1.1, Math.sin(a) * 1.1);
      leg.rotation.z = -Math.cos(a) * .18; leg.rotation.x = Math.sin(a) * .18;
      pad.add(leg);
    }

    // רקטת בקבוק
    const rocket = new THREE.Group(); scene.add(rocket);
    const petMat = new THREE.MeshPhysicalMaterial({
      color: 0xdff2ff, roughness: .07, metalness: 0, transmission: .8, thickness: .3,
      transparent: true, opacity: .38, side: THREE.DoubleSide,
    });
    const bp2 = [[0, 3.5], [.72, 3.3], [.78, 2.9], [.78, .7], [.7, .4], [.42, .18], [.28, 0], [.28, -.3]];
    const shell = new THREE.Mesh(lathe(bp2, 44), petMat); rocket.add(shell);
    const water2 = new THREE.Mesh(lathe([[0, -.3], [.28, -.3], [.7, .4], [.78, 1.6], [0, 1.6]], 40), new THREE.MeshStandardMaterial({
      color: 0x11a6ff, emissive: 0x0a4a7d, emissiveIntensity: .4, roughness: .05,
      transparent: true, opacity: .82, side: THREE.DoubleSide,
    }));
    rocket.add(water2);
    const cone2 = new THREE.Mesh(lathe(Array.from({ length: 14 }, (_, i) => { const t = i / 13; return [.76 * Math.cos(t * Math.PI / 2), 3.55 + 1.35 * t]; }), 40), M.paint(C.yellow, .3));
    rocket.add(cone2);
    addFins(rocket, 3, finGeo(1.25, .9, .05), M.paint(C.blue, .35), .72, .35);

    const wjet = new Jet({ count: 320, tex: TEX_WATER, size: .38, speed: 26, spread: .22, life: .45, color: 0xa8e6ff });
    const mist = new Jet({ count: 200, tex: TEX_SMOKE, size: 1.2, speed: 9, spread: 1.0, life: 1.2, color: 0xbcd4ee, blending: THREE.NormalBlending });
    scene.add(wjet.points, mist.points);

    const labels = Labeller();
    const lAlt = labels.add('<b class="alt">0</b> מ׳', new THREE.Vector3(0, 0, 0), 'alt');
    const lApex = labels.add('שיא!', new THREE.Vector3(0, 0, 0), 'apex');
    lApex.shown = false;

    let t = 0, orbit = null;
    let st = 'idle';      // idle | thrust | coast | fall | done
    let y = 0, v = 0, apex = 0, burn = 0, burnT = 0, tilt = 0, best = 0;
    let cfg = { water: .33, bar: 6 };
    let dvTarget = 0;

    // ---- מודל פיזיקלי מפושט של רקטת מים ----
    function physics(waterFrac, bar) {
      const V = 0.0015;                    // בקבוק 1.5 ליטר
      const Va = V * (1 - waterFrac);      // נפח אוויר
      const mw = waterFrac * V * 1000;     // מסת מים (ק"ג)
      const mDry = 0.11;                   // בקבוק + סנפירים + חרטום
      const P1 = bar * 1e5 + 1e5;          // לחץ מוחלט
      // עבודת התפשטות איזותרמית של האוויר, פחות עבודה נגד האטמוספרה
      let W = P1 * Va * Math.log(V / Math.max(Va, 1e-6)) - 1e5 * (V - Va);
      W = Math.max(0, W) * 0.72;           // נצילות (חיכוך, סילון לא אידיאלי)
      const p = Math.sqrt(2 * mw * W);     // תנע המים = תנע הרקטה
      const mAvg = mDry + mw * 0.5;
      const dv = p / mAvg;
      const veJet = Math.sqrt(2 * bar * 1e5 / 1000);
      const A = Math.PI * 0.011 * 0.011;
      const tb = Math.max(0.05, mw / Math.max(0.1, 1000 * A * veJet));  // זמן בעירה
      const drag = 0.46;                   // מקדם אובדן לגרר
      const h = Math.max(0, (dv * dv) / (2 * 9.81) * drag - 0.5 * 9.81 * tb * tb);
      return { dv, h, tb, mw, W };
    }

    // גוף הבקבוק אחיד בין y=0.7 ל-y=2.9, אז המפלס נגזר מהמילוי של הגוף
    function waterLevel(f) {
      water2.scale.y = Math.max(0.001, (0.7 + THREE.MathUtils.clamp(f, 0, 1) * 2.2) / 1.6);
      water2.visible = f > 0.005;
    }

    return {
      scene, camera, labels,
      attachOrbitTo(dom) { if (orbit) orbit.dispose(); orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 3, 0), { minR: 9, maxR: 90, autoRot: .06, maxPol: Math.PI / 2 - .02 }); this.orbit = orbit; },
      onEnter() { labels.mountTo(Stage.host); },
      preview(waterFrac, bar) {
        cfg.water = waterFrac; cfg.bar = bar;
        if (st === 'idle') waterLevel(waterFrac);
        return physics(waterFrac, bar);
      },
      launch() {
        if (st !== 'idle') return null;
        const r = physics(cfg.water, cfg.bar);
        dvTarget = r.dv; burn = 0; burnT = r.tb * 6;   // מותחים ויזואלית
        y = 0; v = 0; apex = 0; tilt = (Math.random() - .5) * .05;
        st = 'thrust';
        wjet.setOn(true); mist.setOn(true);
        lApex.shown = false;
        return r;
      },
      reset() {
        st = 'idle'; y = 0; v = 0; apex = 0;
        rocket.position.set(0, 1.6, 0); rocket.rotation.set(0, 0, 0);
        wjet.setOn(false); mist.setOn(false);
        waterLevel(cfg.water);
        if (orbit) { orbit.setTarget(new THREE.Vector3(0, 3, 0)); orbit.setR(14); }
        lApex.shown = false;
      },
      get state() { return st; },
      get apex() { return apex; },
      update(dt) {
        t += dt;
        if (st === 'idle') {
          rocket.position.set(0, 1.6, 0);
        } else if (st === 'thrust') {
          burn += dt;
          const k = burn / burnT;
          v += (dvTarget / burnT) * dt;
          y += v * dt;
          waterLevel(cfg.water * Math.max(0, 1 - k));
          wjet.power = 1.3 * (1 - k * .55);
          if (k >= 1) { st = 'coast'; wjet.setOn(false); mist.setOn(false); waterLevel(0); }
        } else if (st === 'coast' || st === 'fall') {
          v -= 9.81 * dt;
          v -= Math.sign(v) * 0.02 * v * v * dt;   // גרר ריבועי — בקבוק הוא גוף לא אווירודינמי
          y += v * dt;
          if (v < 0 && st === 'coast') st = 'fall';
          if (y <= 0) { y = 0; v = 0; st = 'done'; if (this.onLand) this.onLand(apex); }
        }
        apex = Math.max(apex, y);
        if (st !== 'idle') {
          rocket.position.set(Math.sin(t * .8) * tilt * y * .04, 1.6 + y, 0);
          rocket.rotation.z = -tilt * 2 + (st === 'fall' ? Math.min(2.6, (apex - y) * .05) : 0);
        }
        wjet.points.position.set(rocket.position.x, rocket.position.y - .4, 0);
        mist.points.position.copy(wjet.points.position);
        wjet.update(dt); mist.update(dt);

        // המצלמה עוקבת אחרי הרקטה בפועל, ומתרחקת מעט כדי לשמור על תחושת גובה
        if (orbit) {
          const camY = st === 'idle' ? 3 : Math.max(3, 1.6 + y);
          const tg = orbit.state.target;
          tg.y += (camY - tg.y) * Math.min(1, dt * 9);
          const wantR = st === 'idle' ? 14 : THREE.MathUtils.clamp(14 + y * .12, 14, 28);
          orbit.state.tR += (wantR - orbit.state.tR) * Math.min(1, dt * 2);
        }

        lAlt.shown = st !== 'idle';
        lAlt.pos.copy(rocket.position).add(new THREE.Vector3(2.2, 1.5, 0));
        const el = lAlt.el.querySelector('.alt'); if (el) el.textContent = Math.round(y);
        if (apex > 1 && (st === 'fall' || st === 'done')) {
          lApex.shown = true;
          lApex.pos.set(-7, 1.6 + apex, 0);
          lApex.el.innerHTML = 'שיא: <b>' + Math.round(apex) + '</b> מ׳';
        }
        labels.project(camera, Stage.host);
      },
    };
  });

  global.Stage3D = Stage;
  global.RocketColors = C;
})(window);
