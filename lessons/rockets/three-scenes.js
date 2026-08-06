/* ============================================================
   MAKE · שיעור רקטות — מנוע התלת-ממד (עיצוב בהיר)
   רנדרר יחיד משותף + סצנות אינטראקטיביות
   ============================================================ */
(function (global) {
  'use strict';

  const C = {
    blue: 0x0094ff,
    blueDeep: 0x0069c4,
    amber: 0xf5a421,
    yellow: 0xffc61e,
    body: 0xf2f6fc,
    bodyDark: 0xd2dceb,
    metal: 0xc2cfe0,
    dark: 0x2b3a52,
    copper: 0xc9803a,
  };

  /* ---------------- טקסטורות ---------------- */
  function radialTex(stops) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    stops.forEach(([o, col]) => gr.addColorStop(o, col));
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }
  let TEX_FIRE, TEX_SMOKE, TEX_WATER, TEX_SHADOW;
  function initTex() {
    TEX_FIRE = radialTex([[0, 'rgba(255,255,240,1)'], [.28, 'rgba(255,196,90,.95)'], [.62, 'rgba(255,110,20,.5)'], [1, 'rgba(255,60,0,0)']]);
    TEX_SMOKE = radialTex([[0, 'rgba(150,168,192,.5)'], [.5, 'rgba(170,186,208,.22)'], [1, 'rgba(190,205,225,0)']]);
    TEX_WATER = radialTex([[0, 'rgba(210,240,255,1)'], [.4, 'rgba(80,180,255,.85)'], [1, 'rgba(0,148,255,0)']]);
    TEX_SHADOW = radialTex([[0, 'rgba(40,70,110,.42)'], [.45, 'rgba(40,70,110,.2)'], [1, 'rgba(40,70,110,0)']]);
  }

  /* ---------------- חומרים ---------------- */
  const M = {
    paint: (col, rough = .45) => new THREE.MeshStandardMaterial({ color: col, roughness: rough, metalness: .1 }),
    metal: (col, rough = .3) => new THREE.MeshStandardMaterial({ color: col, roughness: rough, metalness: .85 }),
    glow: (col, i = 1) => new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: i, roughness: 1, metalness: 0 }),
    glass: (col, op = .35) => new THREE.MeshStandardMaterial({
      color: col, transparent: true, opacity: op, roughness: .05, metalness: .1,
      side: THREE.DoubleSide, depthWrite: false,
    }),
  };

  function lathe(pts, seg = 48) {
    return new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(p[0], p[1])), seg);
  }

  function finGeo(h, w, t, sweep = .55) {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(w, -h * sweep * .35);
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
      parent.add(f);
    }
  }

  /* צל מגע רך — מקרקע את המודל על רקע בהיר */
  function shadowDisc(r) {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(r * 2, r * 2),
      new THREE.MeshBasicMaterial({ map: TEX_SHADOW, transparent: true, depthWrite: false })
    );
    m.rotation.x = -Math.PI / 2;
    return m;
  }

  /* ---------------- תאורה לרקע בהיר ---------------- */
  function lightRig(scene) {
    // תאורת חלל: שמיים בהירים מלמעלה, כחול עמוק מלמטה, ומילוי חם קדמי
    scene.add(new THREE.HemisphereLight(0xdfeeff, 0x0e2044, 1.15));
    const k = new THREE.DirectionalLight(0xffffff, 2.4); k.position.set(6, 10, 8); scene.add(k);
    const f = new THREE.DirectionalLight(0x4aa8ff, 1.5); f.position.set(-8, 3, -6); scene.add(f);
    const w = new THREE.DirectionalLight(0xffc98a, .7); w.position.set(2, -5, 5); scene.add(w);
    return k;
  }

  /* ---------------- חלקיקים ---------------- */
  class Jet {
    constructor(opts) {
      const o = Object.assign({
        count: 260, tex: TEX_FIRE, size: .38, color: 0xffffff,
        speed: 7, spread: .30, life: .55, dir: new THREE.Vector3(0, -1, 0),
        gravity: 0, blending: THREE.AdditiveBlending,
      }, opts);
      this.o = o;
      const g = new THREE.BufferGeometry();
      this.pos = new Float32Array(o.count * 3);
      this.vel = new Float32Array(o.count * 3);
      this.age = new Float32Array(o.count);
      this.lif = new Float32Array(o.count);
      for (let i = 0; i < o.count; i++) { this.age[i] = Math.random() * o.life; this.lif[i] = o.life; }
      g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3));
      this.mat = new THREE.PointsMaterial({
        size: o.size, map: o.tex, transparent: true, depthWrite: false,
        blending: o.blending, color: o.color, sizeAttenuation: true, opacity: 0,
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
      this.mat.opacity += ((this.on ? 1 : 0) - this.mat.opacity) * Math.min(1, dt * 9);
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
    }
    setOn(v) { if (v && !this.on) for (let i = 0; i < this.o.count; i++) this.reset(i); this.on = v; }
  }

  /* ---------------- בקרת מסלול ---------------- */
  function attachOrbit(cam, dom, target, opt) {
    const o = Object.assign({ minR: 3, maxR: 60, minPol: .12, maxPol: Math.PI - .12, autoRot: .12, damp: .09 }, opt || {});
    const s = { r: 0, az: 0, pol: 1.1, tR: 0, tAz: 0, tPol: 0, drag: false, px: 0, py: 0, idle: 0, target: target.clone() };
    const off = cam.position.clone().sub(target);
    s.r = off.length(); s.pol = Math.acos(THREE.MathUtils.clamp(off.y / s.r, -1, 1)); s.az = Math.atan2(off.x, off.z);
    s.tR = s.r; s.tAz = s.az; s.tPol = s.pol;

    const down = e => { s.drag = true; s.idle = 0; s.px = e.clientX; s.py = e.clientY; dom.setPointerCapture && dom.setPointerCapture(e.pointerId); dom.style.cursor = 'grabbing'; };
    const move = e => {
      if (!s.drag) return;
      const dx = e.clientX - s.px, dy = e.clientY - s.py;
      s.px = e.clientX; s.py = e.clientY; s.idle = 0;
      s.tAz -= dx * .0075;
      s.tPol = THREE.MathUtils.clamp(s.tPol - dy * .006, o.minPol, o.maxPol);
    };
    const up = () => { s.drag = false; dom.style.cursor = 'grab'; };
    const wheel = e => { e.preventDefault(); s.idle = 0; s.tR = THREE.MathUtils.clamp(s.tR * (1 + Math.sign(e.deltaY) * .12), o.minR, o.maxR); };
    dom.addEventListener('pointerdown', down);
    dom.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    dom.addEventListener('wheel', wheel, { passive: false });
    dom.style.cursor = 'grab';
    dom.style.touchAction = 'none';

    return {
      state: s,
      focus(pos, r) { s.target.copy(pos); if (r) s.tR = r; s.idle = 0; },
      update(dt) {
        s.idle += dt;
        if (!s.drag && s.idle > 2.4 && o.autoRot) s.tAz += o.autoRot * dt;
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
     מנהל הבמה
     ============================================================ */
  const Stage = {
    renderer: null, canvas: null, scenes: {}, active: null, host: null,
    clock: null, ro: null,

    init() {
      initTex();
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.0;
      this.renderer.localClippingEnabled = true;
      this.canvas = this.renderer.domElement;
      this.clock = new THREE.Clock();
      this.ro = new ResizeObserver(() => this.resize());
      const loop = () => {
        requestAnimationFrame(loop);
        const dt = Math.min(this.clock.getDelta(), .05);
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
    },

    inst(name) { const r = this.scenes[name]; return r && r.inst; },
  };

  /* ---------------- תוויות מוקרנות ---------------- */
  function Labeller() {
    const items = [];
    let layer = null;
    return {
      add(text, pos, cls) {
        const el = document.createElement('div');
        el.className = 'l3d ' + (cls || '');
        el.innerHTML = text;
        const it = { el, pos: pos.clone(), shown: true };
        items.push(it);
        return it;
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
          const bw = i.el.offsetWidth || 120, bh = i.el.offsetHeight || 34;
          const x = THREE.MathUtils.clamp((v.x * .5 + .5) * w, bw / 2 + 6, w - bw / 2 - 6);
          const y = THREE.MathUtils.clamp((-v.y * .5 + .5) * h, bh / 2 + 6, h - bh / 2 - 6);
          i.el.style.transform = `translate(-50%,-50%) translate(${x}px, ${y}px)`;
        });
      },
      items,
    };
  }

  /* ---------------- רקטה גנרית ---------------- */
  function buildRocket(opt) {
    const o = Object.assign({ r: .72, bodyH: 4.6, noseH: 1.8, finN: 4, finH: 1.5, finW: 1.15 }, opt || {});
    const g = new THREE.Group();
    const bodyMat = M.paint(C.body, .4);
    const blueMat = M.paint(C.blue, .35);
    const amberMat = M.paint(C.amber, .35);
    const metalMat = M.metal(C.metal, .25);

    const body = new THREE.Mesh(new THREE.CylinderGeometry(o.r, o.r, o.bodyH, 44, 1, true), bodyMat);
    body.material.side = THREE.DoubleSide;
    body.position.y = o.bodyH / 2;
    g.add(body);

    [[.28, amberMat], [.62, blueMat]].forEach(([f, m]) => {
      const ring = new THREE.Mesh(new THREE.CylinderGeometry(o.r * 1.014, o.r * 1.014, o.bodyH * .08, 44, 1, true), m);
      ring.material.side = THREE.DoubleSide;
      ring.position.y = o.bodyH * f;
      g.add(ring);
    });

    const nose = new THREE.Mesh(lathe(
      Array.from({ length: 15 }, (_, i) => {
        const t = i / 14;
        return [o.r * Math.cos(t * Math.PI / 2) * (1 - .04 * t), o.bodyH + o.noseH * t];
      }), 44), M.paint(C.yellow, .35));
    g.add(nose);

    const win = new THREE.Mesh(new THREE.SphereGeometry(o.r * .3, 22, 16), M.glass(0x7fd0ff, .6));
    win.position.set(0, o.bodyH * .78, o.r * .93);
    g.add(win);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(o.r * .31, o.r * .055, 10, 26), metalMat);
    rim.position.set(0, o.bodyH * .78, o.r * .9);
    g.add(rim);

    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(o.r, o.r * 1.06, .3, 44), blueMat);
    skirt.position.y = .15; g.add(skirt);

    const bellPts = [];
    for (let i = 0; i <= 16; i++) { const t = i / 16; bellPts.push([o.r * (.34 + .62 * Math.pow(t, 1.9)), -t * o.r * 1.5]); }
    const bell = new THREE.Mesh(lathe(bellPts, 44), metalMat);
    bell.material.side = THREE.DoubleSide;
    g.add(bell);

    addFins(g, o.finN, finGeo(o.finH, o.finW, .08), blueMat, o.r * .88, .05);
    g.userData.exitY = -o.r * 1.5;
    return g;
  }

  /* ============================================================
     פתיחה — רקטה בחלל
     ============================================================ */
  Stage.register('hero', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1.6, .1, 800);
    camera.position.set(0, 3, 14);
    lightRig(scene);

    const root = new THREE.Group(); scene.add(root);
    const rocket = buildRocket({});
    rocket.position.y = -2.4;
    root.add(rocket);

    const jet = new Jet({ count: 340, size: .5, speed: 11, spread: .34, life: .5, color: 0xffc98a });
    jet.points.position.set(0, -2.4 + rocket.userData.exitY, 0);
    root.add(jet.points);
    jet.setOn(true);

    const smoke = new Jet({
      count: 150, tex: TEX_SMOKE, size: 1.2, speed: 5.5, spread: .7, life: 1.6,
      color: 0x9fb4d0, blending: THREE.NormalBlending,
    });
    smoke.points.position.copy(jet.points.position);
    root.add(smoke.points);
    smoke.setOn(true);

    // כדור הארץ מרחוק — נותן עומק בלי להכביד
    const planet = new THREE.Mesh(new THREE.SphereGeometry(30, 60, 40), M.paint(0x4a97e0, .95));
    planet.position.set(-34, -48, -44); scene.add(planet);
    const moon = new THREE.Mesh(new THREE.SphereGeometry(2.2, 40, 28), M.paint(0xdde3ec, 1));
    moon.position.set(16, 11, -30); scene.add(moon);

    let t = 0, orbit = null;
    return {
      scene, camera,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, .2, 0), { minR: 8, maxR: 28, autoRot: .16 });
        this.orbit = orbit;
      },
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
     חוק ניוטון השלישי — הבלון
     ============================================================ */
  Stage.register('newton', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1.6, .1, 500);
    camera.position.set(0, 1.2, 14);
    lightRig(scene);

    const balloon = new THREE.Group(); scene.add(balloon);

    // כל מה שמתנפח יושב בקבוצה אחת — כך הפרצוף גדל עם הבלון ולא נבלע בתוכו
    const skin = new THREE.Group(); balloon.add(skin);
    const shell = new THREE.Mesh(new THREE.SphereGeometry(1, 44, 32), M.paint(C.yellow, .3));
    skin.add(shell);
    const gloss = new THREE.Mesh(new THREE.SphereGeometry(1.004, 44, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: .12 }));
    skin.add(gloss);

    const face = new THREE.Group(); skin.add(face);
    const eyeM = M.paint(0x1a2740, .3);
    const eyeG = new THREE.SphereGeometry(.11, 18, 14);
    [-.3, .3].forEach(x => { const e = new THREE.Mesh(eyeG, eyeM); e.position.set(x, .22, .93); face.add(e); });
    const mouth = new THREE.Mesh(new THREE.TorusGeometry(.24, .045, 8, 22, Math.PI), eyeM);
    mouth.position.set(0, -.05, .92); mouth.rotation.z = Math.PI; face.add(mouth);

    const neck = new THREE.Mesh(lathe([[.30, 0], [.22, -.35], [.28, -.62], [.2, -.7]], 26), M.paint(C.amber, .35));
    neck.material.side = THREE.DoubleSide;
    balloon.add(neck);

    const air = new Jet({
      count: 300, tex: TEX_WATER, size: .3, speed: 13, spread: .28, life: .45,
      color: 0x8fd6ff, dir: new THREE.Vector3(0, -1, 0),
    });
    balloon.add(air.points);

    function makeArrow(col, up) {
      const g = new THREE.Group();
      const mat = M.paint(col, .35);
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, 1.7, 16), mat);
      shaft.position.y = up * .85; g.add(shaft);
      const head = new THREE.Mesh(new THREE.ConeGeometry(.34, .85, 22), mat);
      head.position.y = up * 2.1; head.rotation.x = up > 0 ? 0 : Math.PI; g.add(head);
      return g;
    }
    const arrowGas = makeArrow(0xe0364c, -1);
    const arrowUp = makeArrow(0x1a9e5c, 1);
    balloon.add(arrowGas, arrowUp);
    arrowGas.visible = arrowUp.visible = false;

    const labels = Labeller();
    const lGas = labels.add('האוויר יוצא למטה', new THREE.Vector3(0, 0, 0), 'red');
    const lUp = labels.add('הבלון עף למעלה', new THREE.Vector3(0, 0, 0), 'green');

    let inflate = .55, flying = false, airLeft = 0, t = 0, orbit = null;
    const vel = new THREE.Vector3();
    const home = new THREE.Vector3(0, .4, 0);

    return {
      scene, camera, labels,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, .3, 0), { minR: 9, maxR: 24, autoRot: .1 });
        this.orbit = orbit;
      },
      onEnter() { labels.mountTo(Stage.host); },
      setInflate(v) { inflate = v; },
      release() {
        if (flying) return;
        flying = true; airLeft = inflate;
        vel.set((Math.random() - .5) * .6, 2.5, (Math.random() - .5) * .6);
        air.setOn(true);
        arrowGas.visible = arrowUp.visible = true;
      },
      reset() {
        flying = false; air.setOn(false); vel.set(0, 0, 0);
        balloon.position.copy(home); balloon.rotation.set(0, 0, 0);
        arrowGas.visible = arrowUp.visible = false;
      },
      update(dt) {
        t += dt;
        const target = flying ? Math.max(.16, airLeft) : inflate;
        const sc = .55 + target * 1.15;
        skin.scale.lerp(new THREE.Vector3(sc, sc * (1 - target * .1), sc), Math.min(1, dt * 7));
        const sy = skin.scale.y;
        neck.position.y = -sy * .92;
        air.points.position.y = -sy * 1.62;
        arrowGas.position.y = -sy * 1.7;
        arrowUp.position.y = sy * 1.1;

        if (flying) {
          airLeft = Math.max(0, airLeft - dt * .42);
          const thrust = airLeft > 0 ? 15 * (.35 + airLeft) : 0;
          const up = new THREE.Vector3(0, 1, 0).applyQuaternion(balloon.quaternion);
          vel.addScaledVector(up, thrust * dt);
          vel.y -= 3.2 * dt;
          vel.multiplyScalar(1 - 1.4 * dt);
          balloon.position.addScaledVector(vel, dt);
          balloon.rotation.x += (Math.sin(t * 11) * 1.1 + (Math.random() - .5) * 1.4) * dt;
          balloon.rotation.z += (Math.cos(t * 9.4) * 1.1 + (Math.random() - .5) * 1.4) * dt;
          air.power = .4 + airLeft;
          ['x', 'y', 'z'].forEach(a => {
            const lim = a === 'y' ? 2.2 : 3.0;
            if (balloon.position[a] > lim) { balloon.position[a] = lim; vel[a] *= -.55; }
            if (balloon.position[a] < -lim) { balloon.position[a] = -lim; vel[a] *= -.55; }
          });
          if (airLeft <= 0 && vel.length() < .45) {
            flying = false; air.setOn(false);
            arrowGas.visible = arrowUp.visible = false;
            if (this.onLand) this.onLand();
          }
        } else {
          balloon.position.lerp(home, Math.min(1, dt * 3));
          balloon.rotation.x *= (1 - dt * 3);
          balloon.rotation.z *= (1 - dt * 3);
          balloon.position.y = home.y + Math.sin(t * 1.4) * .1;
        }
        air.update(dt);

        lGas.shown = lUp.shown = arrowGas.visible;
        lGas.pos.copy(balloon.position).add(new THREE.Vector3(0, -sy * 1.7 - 2.6, 0));
        lUp.pos.copy(balloon.position).add(new THREE.Vector3(0, sy * 1.1 + 2.7, 0));
        labels.project(camera, Stage.host);
      },
    };
  });

  /* ============================================================
     מנוע רקטי — מעטפת, פירוק, ובחירת חלקים
     ============================================================ */
  Stage.register('engine', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1.6, .1, 500);
    camera.position.set(9, 3.5, 17);
    lightRig(scene);

    const root = new THREE.Group(); scene.add(root);

    const clip = new THREE.Plane(new THREE.Vector3(0, 0, -1), 0);
    function cutMat(col, rough, metal) {
      return new THREE.MeshStandardMaterial({
        color: col, roughness: rough, metalness: metal,
        side: THREE.DoubleSide, clippingPlanes: [clip],
      });
    }

    /* --- מעטפת חיצונית: הגוף שעוטף את הכול --- */
    const gShell = new THREE.Group(); root.add(gShell);
    const shellMat = new THREE.MeshStandardMaterial({
      color: C.body, roughness: .4, metalness: .12, side: THREE.DoubleSide,
      transparent: true, opacity: 1,
    });
    const shellBody = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 9.4, 52, 1, true), shellMat);
    shellBody.position.y = 1.6; gShell.add(shellBody);
    const shellNose = new THREE.Mesh(lathe(
      Array.from({ length: 16 }, (_, i) => { const t = i / 15; return [1.5 * Math.cos(t * Math.PI / 2), 6.3 + 2.6 * t]; }), 52), shellMat);
    gShell.add(shellNose);
    const shellSkirt = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.72, 1.2, 52, 1, true), shellMat);
    shellSkirt.position.y = -3.7; gShell.add(shellSkirt);
    [[3.9, C.blue], [0.4, C.amber]].forEach(([y, col]) => {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(1.515, 1.515, .55, 52, 1, true), M.paint(col, .35));
      b.material.side = THREE.DoubleSide; b.position.y = y; gShell.add(b);
    });
    addFins(gShell, 4, finGeo(2.0, 1.5, .12), M.paint(C.blue, .35), 1.5, -4.2);

    /* --- חלקים פנימיים --- */
    const gOx = new THREE.Group(), gFuel = new THREE.Group(), gPump = new THREE.Group();
    const gChamber = new THREE.Group(), gThroat = new THREE.Group(), gNozzle = new THREE.Group();
    root.add(gOx, gFuel, gPump, gChamber, gThroat, gNozzle);

    const oxMat = cutMat(0x5ec0ff, .3, .35);
    const fuMat = cutMat(0xffc61e, .32, .3);
    const steelMat = cutMat(C.metal, .25, .9);
    const copperMat = cutMat(C.copper, .3, .85);

    const oxShell = new THREE.Mesh(lathe([[0, 1.5], [1.15, 1.28], [1.28, .9], [1.28, -.9], [1.15, -1.28], [0, -1.5]], 46), oxMat);
    gOx.add(oxShell);
    gOx.add(new THREE.Mesh(lathe([[0, 1.05], [1.1, .85], [1.2, -.85], [0, -1.32]], 42), new THREE.MeshStandardMaterial({
      color: 0x0aa0ff, emissive: 0x06537f, emissiveIntensity: .45, roughness: .1,
      transparent: true, opacity: .8, side: THREE.DoubleSide, clippingPlanes: [clip],
    })));
    gOx.position.y = 5.3;

    const fuShell = new THREE.Mesh(lathe([[0, 1.35], [1.15, 1.15], [1.28, .8], [1.28, -.8], [1.15, -1.15], [0, -1.35]], 46), fuMat);
    gFuel.add(fuShell);
    gFuel.add(new THREE.Mesh(lathe([[0, .95], [1.1, .78], [1.2, -.75], [0, -1.2]], 42), new THREE.MeshStandardMaterial({
      color: 0xff9d1c, emissive: 0x8a4400, emissiveIntensity: .45, roughness: .12,
      transparent: true, opacity: .8, side: THREE.DoubleSide, clippingPlanes: [clip],
    })));
    gFuel.position.y = 2.5;

    const pumpBody = new THREE.Mesh(new THREE.CylinderGeometry(.66, .78, .85, 32), steelMat);
    gPump.add(pumpBody);
    const turb = new THREE.Group(); gPump.add(turb);
    for (let i = 0; i < 10; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(.52, .05, .17), copperMat);
      const a = i / 10 * Math.PI * 2;
      b.position.set(Math.cos(a) * .32, .2, Math.sin(a) * .32);
      b.rotation.y = -a; b.rotation.z = .5;
      turb.add(b);
    }
    [[-1, 0x5ec0ff], [1, 0xffc61e]].forEach(([s, col]) => {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(.12, .12, 2.1, 14), cutMat(col, .3, .75));
      pipe.position.set(s * 1.0, .75, 0); pipe.rotation.z = s * .22;
      gPump.add(pipe);
    });
    gPump.position.y = .55;

    // תא בעירה
    const chamberProfile = [[.9, 1.1], [.9, .35], [.84, .05], [.56, -.3]];
    gChamber.add(new THREE.Mesh(lathe(chamberProfile, 48), steelMat));
    const jacket = new THREE.Mesh(lathe(chamberProfile.map(p => [p[0] + .1, p[1]]), 48), copperMat);
    gChamber.add(jacket);
    const inj = new THREE.Mesh(new THREE.CylinderGeometry(.9, .9, .13, 44), copperMat);
    inj.position.y = 1.05; gChamber.add(inj);
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2, rr = .28 + (i % 3) * .21;
      const h = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, .22, 8), cutMat(0x33425e, .5, .3));
      h.position.set(Math.cos(a) * rr, .98, Math.sin(a) * rr);
      gChamber.add(h);
    }
    const burn = new THREE.Mesh(lathe([[0, 1.0], [.78, .5], [.74, .05], [.48, -.32], [0, -.4]], 32),
      new THREE.MeshBasicMaterial({ color: 0xffd88a, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false, clippingPlanes: [clip] }));
    gChamber.add(burn);
    gChamber.position.y = -1.35;

    // גרון — חלק נפרד כדי שאפשר יהיה לבחור בו
    gThroat.add(new THREE.Mesh(lathe([[.56, .06], [.42, -.14], [.40, -.34], [.44, -.5]], 48), steelMat));
    gThroat.position.y = -1.35;

    // פעמון
    const bellPts = [];
    for (let i = 0; i <= 22; i++) { const t = i / 22; bellPts.push([.44 + 1.45 * Math.pow(t, 1.75), -t * 2.6]); }
    gNozzle.add(new THREE.Mesh(lathe(bellPts, 54), steelMat));
    const ribMat = cutMat(0x93a4bd, .35, .85);
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2;
      const pts = bellPts.map(p => new THREE.Vector3(Math.cos(a) * (p[0] + .05), p[1], Math.sin(a) * (p[0] + .05)));
      gNozzle.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 20, .05, 6, false), ribMat));
    }
    gNozzle.position.y = -1.85;

    /* --- דלק מוצק --- */
    const gSolid = new THREE.Group(); root.add(gSolid); gSolid.visible = false;
    gSolid.add(new THREE.Mesh(lathe([[0, 2.6], [1.15, 2.45], [1.24, 2.1], [1.24, -2.1], [1.15, -2.35], [.55, -2.6]], 46), cutMat(0x8ea0ba, .3, .85)));
    (function grain() {
      const outer = new THREE.Shape();
      outer.absarc(0, 0, 1.1, 0, Math.PI * 2, false);
      const hole = new THREE.Path();
      const P = 7, ri = .2, ro = .56;
      for (let i = 0; i <= P * 2; i++) {
        const a = (i / (P * 2)) * Math.PI * 2, r = i % 2 ? ri : ro;
        const x = Math.cos(a) * r, y = Math.sin(a) * r;
        if (i === 0) hole.moveTo(x, y); else hole.lineTo(x, y);
      }
      outer.holes.push(hole);
      const g = new THREE.ExtrudeGeometry(outer, { depth: 4.2, bevelEnabled: false, curveSegments: 40 });
      g.rotateX(-Math.PI / 2);
      g.translate(0, -2.1, 0);
      gSolid.add(new THREE.Mesh(g, cutMat(0x6b5a4a, .95, .05)));
      const gb = new THREE.Mesh(new THREE.CylinderGeometry(.54, .62, 4.2, 26, 1, true),
        new THREE.MeshBasicMaterial({ color: 0xffd070, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false, clippingPlanes: [clip] }));
      gSolid.add(gb);
      gSolid.userData.burn = gb;
    })();
    gSolid.position.y = 1.0;

    const jet = new Jet({ count: 420, size: .5, speed: 17, spread: .6, life: .6, color: 0xffc98a });
    const jetSmoke = new Jet({ count: 180, tex: TEX_SMOKE, size: 1.5, speed: 8, spread: .95, life: 1.5, color: 0x9fb4d0, blending: THREE.NormalBlending });
    root.add(jet.points, jetSmoke.points);
    const burnLight = new THREE.PointLight(0xffb040, 0, 9); root.add(burnLight);

    /* --- מיפוי חלקים לבחירה --- */
    const PARTS = {
      shell:   { g: gShell,   y: () => 0,                  r: 26, base: 0 },
      ox:      { g: gOx,      y: () => gOx.position.y,     r: 13, base: 5.3 },
      fuel:    { g: gFuel,    y: () => gFuel.position.y,   r: 13, base: 2.5 },
      pump:    { g: gPump,    y: () => gPump.position.y,   r: 10, base: .55 },
      chamber: { g: gChamber, y: () => gChamber.position.y, r: 11, base: -1.35 },
      throat:  { g: gThroat,  y: () => gThroat.position.y, r: 8,  base: -1.35 },
      nozzle:  { g: gNozzle,  y: () => gNozzle.position.y - 1.3, r: 14, base: -1.85 },
      solid:   { g: gSolid,   y: () => gSolid.position.y,  r: 16, base: 1.0 },
    };
    function eachMat(g, fn) { g.traverse(o => { if (o.material) fn(o.material); }); }

    let explode = 0, explodeTarget = 0, ignition = false, solid = false;
    let selected = null, t = 0, orbit = null;

    /* המעטפת שקופה למחצה כברירת מחדל — כך רואים גם אותה וגם את הפנים.
       היא נעשית אטומה רק כשבוחרים אותה או כשמפרקים אותה החוצה. */
    function applySelection() {
      Object.entries(PARTS).forEach(([key, p]) => {
        let f;
        if (key === 'shell') {
          if (selected === 'shell') f = 1;
          else if (explodeTarget > .5) f = .8;
          else if (selected) f = .10;
          else f = .26;
        } else {
          f = (selected && selected !== key) ? .2 : 1;
        }
        eachMat(p.g, m => {
          if (m.userData.baseOpacity === undefined) m.userData.baseOpacity = m.opacity;
          m.transparent = true;
          m.opacity = m.userData.baseOpacity * f;
          m.depthWrite = m.opacity > .85;
        });
      });
    }
    applySelection();

    return {
      scene, camera,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 1, 0), { minR: 8, maxR: 60, autoRot: .12 });
        this.orbit = orbit;
      },
      setExploded(v) {
        explodeTarget = v ? 1 : 0;
        applySelection();
        if (orbit && !selected) orbit.focus(new THREE.Vector3(0, v ? 1.6 : 1, 0), v ? 32 : 22);
      },
      get exploded() { return explodeTarget > .5; },
      select(key) {
        selected = key;
        applySelection();
        const p = PARTS[key];
        if (p && orbit) orbit.focus(new THREE.Vector3(0, p.y(), 0), p.r);
      },
      clearSelection() { selected = null; applySelection(); if (orbit) orbit.focus(new THREE.Vector3(0, 1, 0), explodeTarget > .5 ? 32 : 22); },
      setIgnition(v) { ignition = v; jet.setOn(v); jetSmoke.setOn(v); },
      get ignition() { return ignition; },
      setSolid(v) {
        solid = v;
        [gOx, gFuel, gPump, gChamber].forEach(g => g.visible = !v);
        gSolid.visible = v;
      },
      get solid() { return solid; },
      update(dt) {
        t += dt;
        explode += (explodeTarget - explode) * Math.min(1, dt * 3.2);
        const e = explode;

        gOx.position.y = 5.3 + e * 3.4;
        gFuel.position.y = 2.5 + e * 1.7;
        gPump.position.y = .55 + e * .4;
        gChamber.position.y = -1.35 - e * 1.0;
        gThroat.position.y = -1.35 - e * 1.9;
        gNozzle.position.y = -1.85 - e * 3.4;
        gSolid.position.y = 1.0 + e * 2.4;
        gShell.position.x = e * 5.6;
        gShell.rotation.z = -e * .28;

        turb.rotation.y += dt * (ignition ? 26 : 1.4);
        burn.material.opacity += ((ignition && !solid ? .8 : 0) - burn.material.opacity) * Math.min(1, dt * 6);
        const sb = gSolid.userData.burn;
        sb.material.opacity += ((ignition && solid ? .55 : 0) - sb.material.opacity) * Math.min(1, dt * 6);
        burnLight.intensity += ((ignition ? 45 : 0) - burnLight.intensity) * Math.min(1, dt * 6);
        burnLight.position.y = solid ? gSolid.position.y : gChamber.position.y;

        const exitY = gNozzle.position.y - 2.6;
        jet.points.position.set(0, exitY, 0);
        jetSmoke.points.position.set(0, exitY - .5, 0);
        jet.power = .92 + Math.sin(t * 24) * .08;
        jet.update(dt); jetSmoke.update(dt);

        root.position.x = ignition ? (Math.random() - .5) * .04 : 0;
        root.position.z = ignition ? (Math.random() - .5) * .04 : 0;
      },
    };
  });

  /* ============================================================
     משחק ההרכבה
     ============================================================ */
  Stage.register('build', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1.6, .1, 500);
    camera.position.set(2, 2, 14);
    lightRig(scene);

    const root = new THREE.Group(); scene.add(root);
    root.position.y = -3.2;
    // הרקטה יושבת בקבוצה משלה — הכן נשאר על הקרקע כשמשגרים
    const rig = new THREE.Group(); root.add(rig);

    const pad = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.1, .5, 44), M.paint(0x46618a, .8));
    pad.position.y = -.25; root.add(pad);
    const padRing = new THREE.Mesh(new THREE.TorusGeometry(2.65, .1, 10, 52), M.glow(C.blue, .5));
    padRing.rotation.x = Math.PI / 2; padRing.position.y = .02; root.add(padRing);
    const sh = shadowDisc(4.2); sh.position.y = -.48; root.add(sh);

    const R = .78;
    const parts = [];
    function reg(g, targetY) { g.userData.targetY = targetY; g.visible = false; rig.add(g); parts.push(g); return g; }

    const pEngine = new THREE.Group();
    const skirt = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 1.05, .9, 44), M.paint(C.blue, .35));
    skirt.position.y = .45; pEngine.add(skirt);
    const bp = []; for (let i = 0; i <= 16; i++) { const t = i / 16; bp.push([R * (.32 + .6 * Math.pow(t, 1.8)), -t * 1.15]); }
    const bell = new THREE.Mesh(lathe(bp, 44), M.metal(C.metal, .25));
    bell.material.side = THREE.DoubleSide; pEngine.add(bell);
    addFins(pEngine, 4, finGeo(1.5, 1.25, .1), M.paint(C.amber, .35), R * .86, .12);
    reg(pEngine, 1.2);

    const pTank = new THREE.Group();
    pTank.add(new THREE.Mesh(new THREE.CylinderGeometry(R, R, 2.2, 44), M.paint(C.body, .4)));
    const band = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.015, R * 1.015, .32, 44), M.paint(C.amber, .35));
    band.position.y = -.7; pTank.add(band);
    reg(pTank, 2.4);

    const pCargo = new THREE.Group();
    pCargo.add(new THREE.Mesh(new THREE.CylinderGeometry(R, R, 1.7, 44), M.paint(C.body, .4)));
    const stripe = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.015, R * 1.015, .36, 44), M.paint(C.blue, .35));
    stripe.position.y = .4; pCargo.add(stripe);
    const win = new THREE.Mesh(new THREE.SphereGeometry(.3, 22, 16), M.glass(0x7fd0ff, .65));
    win.position.set(0, -.2, R * .92); pCargo.add(win);
    reg(pCargo, 4.35);

    const pNose = new THREE.Group();
    pNose.add(new THREE.Mesh(lathe(Array.from({ length: 16 }, (_, i) => {
      const t = i / 15; return [R * Math.cos(t * Math.PI / 2), 1.9 * t];
    }), 44), M.paint(C.yellow, .35)));
    reg(pNose, 5.2);

    const jet = new Jet({ count: 380, size: .55, speed: 15, spread: .45, life: .55, color: 0xffc98a });
    const smoke = new Jet({ count: 220, tex: TEX_SMOKE, size: 1.7, speed: 7, spread: 1.4, life: 1.8, color: 0x9fb4d0, blending: THREE.NormalBlending });
    rig.add(jet.points, smoke.points);

    const labels = Labeller();
    const nameOf = ['מקטע ההנעה', 'מיכלי הדלק', 'המטען המועיל', 'החרטום'];
    const lbls = parts.map((p, i) => labels.add(nameOf[i], new THREE.Vector3(), 'sm'));
    lbls.forEach(l => l.shown = false);

    let placed = 0, t = 0, orbit = null, launching = false, lv = 0;

    return {
      scene, camera, labels,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, .5, 0), { minR: 8, maxR: 28, autoRot: .1 });
        this.orbit = orbit;
      },
      onEnter() { labels.mountTo(Stage.host); },
      place(i) {
        const p = parts[i];
        p.visible = true;
        p.position.set(0, p.userData.targetY + 9, 0);
        p.rotation.y = Math.PI * 1.5;
        lbls[i].shown = true;
        placed++;
      },
      reset() {
        parts.forEach(p => p.visible = false);
        lbls.forEach(l => l.shown = false);
        placed = 0; launching = false; lv = 0;
        rig.position.y = 0; rig.position.x = 0;
        jet.setOn(false); smoke.setOn(false);
      },
      launch() { if (!launching) { launching = true; lv = 0; jet.setOn(true); smoke.setOn(true); } },
      update(dt) {
        t += dt;
        padRing.material.emissiveIntensity = .35 + Math.sin(t * 3) * .2;
        parts.forEach((p, i) => {
          if (!p.visible) return;
          p.position.y += (p.userData.targetY - p.position.y) * Math.min(1, dt * 7);
          p.rotation.y += (0 - p.rotation.y) * Math.min(1, dt * 6);
          lbls[i].pos.set(R * 1.25, root.position.y + rig.position.y + p.position.y, 0);
        });
        if (launching) {
          // עולה, יוצא מהפריים, ואז חוזר בשקט לכן — בלי לגרור את הקרקע איתו
          lv += dt * 5.0;
          rig.position.y += lv * dt;
          rig.position.x = (Math.random() - .5) * .05;
          if (rig.position.y > 30) {
            launching = false; lv = 0;
            rig.position.set(0, 0, 0);
            jet.setOn(false); smoke.setOn(false);
            if (this.onLandBack) this.onLandBack();
          }
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
     היסטוריה — 6 דגמים, כל אחד עם אנימציה משלו
     ============================================================ */
  Stage.register('history', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1.6, .1, 500);
    camera.position.set(0, 1.6, 15);
    lightRig(scene);

    const disc = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.85, .2, 60), M.paint(0x2b4670, .85));
    disc.position.y = -4.2; scene.add(disc);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.64, .05, 8, 64), M.glow(C.blue, .5));
    ring.rotation.x = Math.PI / 2; ring.position.y = -4.08; scene.add(ring);
    const sh = shadowDisc(3.6); sh.position.y = -4.09; scene.add(sh);

    const holder = new THREE.Group(); holder.position.y = -4.0; scene.add(holder);

    const models = [];
    function push(g, anim) { g.visible = false; g.userData.anim = anim; holder.add(g); models.push(g); return g; }

    /* 1232 — חץ אש: טס בקשת ומתחיל מחדש */
    (function () {
      const g = new THREE.Group();
      const arrow = new THREE.Group(); g.add(arrow);
      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(.07, .09, 6, 14), M.paint(0x9b7444, .8));
      shaft.position.y = 3; arrow.add(shaft);
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(.3, .34, 1.5, 20), M.paint(0x7a5228, .85));
      tube.position.y = 2.1; arrow.add(tube);
      for (let i = 0; i < 3; i++) {
        const b = new THREE.Mesh(new THREE.TorusGeometry(.33, .04, 8, 22), M.paint(0x4a3418, .9));
        b.rotation.x = Math.PI / 2; b.position.y = 1.6 + i * .5; arrow.add(b);
      }
      const tip = new THREE.Mesh(new THREE.ConeGeometry(.16, .7, 14), M.metal(0xa8b6c9, .35));
      tip.position.y = 6.3; arrow.add(tip);
      for (let i = 0; i < 3; i++) {
        const f = new THREE.Mesh(new THREE.BoxGeometry(.02, .55, .38), M.paint(0xe0d7c4, .8));
        const a = i / 3 * Math.PI * 2;
        f.position.set(Math.cos(a) * .13, 5.35, Math.sin(a) * .13); f.rotation.y = -a;
        arrow.add(f);
      }
      const fire = new Jet({ count: 150, size: .35, speed: 7, spread: .22, life: .35, color: 0xffb060 });
      fire.points.position.y = 1.2; arrow.add(fire.points); fire.setOn(true);
      push(g, (dt, t) => {
        fire.update(dt);
        const p = (t * .38) % 1;
        arrow.position.set(-1.8 + p * 3.6, Math.sin(p * Math.PI) * 1.4, 0);
        arrow.rotation.z = -Math.atan2(1, Math.cos(p * Math.PI) * 1.1) + Math.PI / 2;
      });
    })();

    /* 1926 — גודארד: מתרומם קצת, רוטט, נופל, ומתחיל שוב */
    (function () {
      const g = new THREE.Group();
      const rig = new THREE.Group(); g.add(rig);
      const frame = M.metal(0x8fa3bc, .4);
      const eng = new THREE.Mesh(lathe([[.16, .8], [.16, .2], [.42, -.35]], 24), M.metal(0xc6cfdd, .3));
      eng.material.side = THREE.DoubleSide; eng.position.y = 5.6; rig.add(eng);
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2;
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, 4.6, 8), frame);
        rod.position.set(Math.cos(a) * .42, 3.2, Math.sin(a) * .42); rig.add(rod);
      }
      const t1 = new THREE.Mesh(new THREE.CylinderGeometry(.34, .34, 1.5, 22), M.metal(0xafbccd, .35));
      t1.position.y = 1.6; rig.add(t1);
      const t2 = new THREE.Mesh(new THREE.CylinderGeometry(.28, .28, 1.1, 22), M.paint(0x54688a, .5));
      t2.position.y = 3.1; rig.add(t2);
      const cone = new THREE.Mesh(new THREE.ConeGeometry(.4, .7, 22), M.metal(0xc6cfdd, .3));
      cone.position.y = .5; cone.rotation.x = Math.PI; rig.add(cone);
      const fire = new Jet({ count: 130, size: .32, speed: 7, spread: .22, life: .34, color: 0xffcf90 });
      fire.points.position.y = 5.05; rig.add(fire.points); fire.setOn(true);
      // המנוע של גודארד ישב בראש והלהבה ירדה החוצה כלפי מטה סביב המבנה
      fire.o.dir.set(0, -1, 0);
      push(g, (dt, t) => {
        fire.update(dt);
        const p = (t * .35) % 1;
        rig.position.y = Math.sin(p * Math.PI) * 1.3;
        rig.rotation.z = Math.sin(t * 7) * .07 * Math.sin(p * Math.PI);
        rig.rotation.x = Math.cos(t * 6.2) * .05 * Math.sin(p * Math.PI);
      });
    })();

    /* 1942 — V-2: מטפסת ומסתובבת סביב צירה */
    (function () {
      const g = new THREE.Group();
      const rig = new THREE.Group(); g.add(rig);
      const white = M.paint(0xeef2f8, .4), black = M.paint(0x333d4d, .5);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(.6, .6, 5, 36), white);
      body.position.y = 3.1; rig.add(body);
      const boat = new THREE.Mesh(new THREE.CylinderGeometry(.6, .38, 1.1, 36), white);
      boat.position.y = .05; rig.add(boat);
      rig.add(new THREE.Mesh(lathe(Array.from({ length: 14 }, (_, i) => {
        const t = i / 13; return [.6 * Math.cos(t * Math.PI / 2), 5.6 + 2.0 * t];
      }), 36), white));
      for (let i = 0; i < 4; i++) {
        const q = new THREE.Mesh(new THREE.CylinderGeometry(.605, .605, 2.4, 20, 1, true, i * Math.PI / 2, Math.PI / 2),
          new THREE.MeshStandardMaterial({ color: i % 2 ? 0x333d4d : 0xeef2f8, roughness: .45, side: THREE.DoubleSide }));
        q.position.y = 4.6; rig.add(q);
      }
      const bell = new THREE.Mesh(lathe([[.2, .1], [.28, -.35], [.45, -.85]], 30), M.metal(0x7d8a9c, .4));
      bell.material.side = THREE.DoubleSide; bell.position.y = -.4; rig.add(bell);
      addFins(rig, 4, finGeo(2.0, 1.4, .1), M.paint(0xdfe5ee, .45), .5, 0);
      const fire = new Jet({ count: 260, size: .45, speed: 12, spread: .3, life: .45, color: 0xffbe72 });
      fire.points.position.y = -1.3; rig.add(fire.points); fire.setOn(true);
      push(g, (dt, t) => {
        fire.update(dt);
        const p = (t * .3) % 1;
        rig.position.y = 1.5 + p * 1.8;
        rig.rotation.y += dt * 1.6;
        rig.rotation.z = Math.sin(t * 1.4) * .05;
      });
    })();

    /* 1957 — ספוטניק: מסתובב, אנטנות רוטטות, משדר ביפ */
    (function () {
      const g = new THREE.Group();
      const sat = new THREE.Group(); g.add(sat);
      const ball = new THREE.Mesh(new THREE.SphereGeometry(1.15, 44, 32), M.metal(0xd4dce8, .12));
      sat.add(ball);
      const seam = new THREE.Mesh(new THREE.TorusGeometry(1.15, .035, 8, 48), M.metal(0x8494a8, .3));
      seam.rotation.x = Math.PI / 2; sat.add(seam);
      const ants = [];
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2 + .4;
        const ant = new THREE.Mesh(new THREE.CylinderGeometry(.035, .015, 4.4, 8), M.metal(0xa5b2c4, .3));
        ant.position.set(Math.cos(a) * 1.5, -1.5, Math.sin(a) * 1.5);
        ant.rotation.z = Math.cos(a) * .55; ant.rotation.x = -Math.sin(a) * .55;
        sat.add(ant); ants.push({ m: ant, base: ant.rotation.z, a });
      }
      const beacon = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 24),
        new THREE.MeshBasicMaterial({ color: C.blue, transparent: true, opacity: .1, side: THREE.BackSide }));
      sat.add(beacon);
      sat.position.y = 4.4;
      push(g, (dt, t) => {
        sat.rotation.y += dt * .9;
        sat.rotation.x = Math.sin(t * .4) * .25;
        sat.position.x = Math.sin(t * .5) * .9;
        sat.position.y = 4.4 + Math.cos(t * .7) * .35;
        const beep = Math.max(0, Math.sin(t * 4.2));
        beacon.material.opacity = .06 + beep * .22;
        ants.forEach((o, i) => { o.m.rotation.z = o.base + Math.sin(t * 9 + i) * .04; });
      });
    })();

    /* 1969 — סטרן 5: שיגור איטי וכבד */
    (function () {
      const g = new THREE.Group();
      const rig = new THREE.Group(); g.add(rig);
      const white = M.paint(0xf1f5fa, .42), black = M.paint(0x333d4d, .5);
      const s1 = new THREE.Mesh(new THREE.CylinderGeometry(.85, .85, 2.6, 40), white); s1.position.y = 1.5; rig.add(s1);
      const s2 = new THREE.Mesh(new THREE.CylinderGeometry(.85, .85, 2.0, 40), white); s2.position.y = 4.05; rig.add(s2);
      const inter = new THREE.Mesh(new THREE.CylinderGeometry(.62, .85, .8, 40), white); inter.position.y = 5.45; rig.add(inter);
      const s3 = new THREE.Mesh(new THREE.CylinderGeometry(.62, .62, 1.6, 40), white); s3.position.y = 6.6; rig.add(s3);
      const csm = new THREE.Mesh(new THREE.CylinderGeometry(.3, .48, 1.0, 30), M.metal(0xb6c2d3, .25)); csm.position.y = 7.85; rig.add(csm);
      const esc = new THREE.Mesh(new THREE.ConeGeometry(.3, .9, 24), M.paint(0xd4344a, .5)); esc.position.y = 8.75; rig.add(esc);
      const tow = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, 1.2, 8), M.metal(0xc2ccdb)); tow.position.y = 9.6; rig.add(tow);
      [[.9, 2.55], [.35, 3.9], [.35, 5.0]].forEach(([h, y]) => {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(.86, .86, h, 40), black); b.position.y = y; rig.add(b);
      });
      addFins(rig, 4, finGeo(1.0, .8, .08), black, .8, .1);
      for (let i = 0; i < 5; i++) {
        const a = i === 4 ? 0 : (i / 4) * Math.PI * 2, rr = i === 4 ? 0 : .42;
        const b = new THREE.Mesh(lathe([[.1, .1], [.16, -.16], [.28, -.5]], 20), M.metal(0x6c7a90, .4));
        b.material.side = THREE.DoubleSide;
        b.position.set(Math.cos(a) * rr, .2, Math.sin(a) * rr); rig.add(b);
      }
      const fire = new Jet({ count: 420, size: .7, speed: 15, spread: .55, life: .6, color: 0xffb45a });
      const smk = new Jet({ count: 240, tex: TEX_SMOKE, size: 2.2, speed: 6, spread: 1.6, life: 2.0, color: 0x9fb4d0, blending: THREE.NormalBlending });
      fire.points.position.y = -.9; smk.points.position.y = -1.3;
      rig.add(fire.points, smk.points); fire.setOn(true); smk.setOn(true);
      push(g, (dt, t) => {
        fire.update(dt); smk.update(dt);
        const p = (t * .18) % 1;
        rig.position.y = .4 + Math.pow(p, 2.2) * 2.6;
        rig.position.x = (Math.random() - .5) * .05;
        rig.rotation.y += dt * .1;
      });
    })();

    /* 2015 — פאלקון 9: נוחתת, רגליים נפרשות */
    (function () {
      const g = new THREE.Group();
      const rig = new THREE.Group(); g.add(rig);
      const body = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 7.4, 40), M.paint(0xf2f6fb, .4));
      body.position.y = 4.1; rig.add(body);
      const inter = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, .7, 40), M.paint(0x232c3a, .55)); inter.position.y = 7.9; rig.add(inter);
      rig.add(new THREE.Mesh(lathe(Array.from({ length: 14 }, (_, i) => {
        const t = i / 13; return [.5 * Math.cos(t * Math.PI / 2 * .98), 8.3 + 1.9 * t];
      }), 40), M.paint(0xf2f6fb, .4)));
      const legs = [];
      for (let i = 0; i < 4; i++) {
        const a = i / 4 * Math.PI * 2 + .78;
        const pivot = new THREE.Group();
        pivot.position.set(Math.cos(a) * .5, .55, Math.sin(a) * .5);
        pivot.rotation.y = -a;
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(.075, .1, 2.5, 10), M.paint(0x232c3a, .5));
        leg.position.set(0, -1.1, .35); leg.rotation.x = .3;
        pivot.add(leg);
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(.26, .26, .1, 14), M.metal(0x8090a5));
        foot.position.set(0, -2.2, .95); pivot.add(foot);
        rig.add(pivot); legs.push(pivot);
        const gf = new THREE.Mesh(new THREE.BoxGeometry(.06, .55, .42), M.metal(0x8e9bb0, .5));
        gf.position.set(Math.cos(a) * .56, 7.2, Math.sin(a) * .56); gf.rotation.y = -a; rig.add(gf);
      }
      for (let i = 0; i < 9; i++) {
        const a = i === 8 ? 0 : (i / 8) * Math.PI * 2, rr = i === 8 ? 0 : .3;
        const b = new THREE.Mesh(lathe([[.07, .05], [.1, -.1], [.16, -.32]], 16), M.metal(0x5d6a7d, .4));
        b.material.side = THREE.DoubleSide;
        b.position.set(Math.cos(a) * rr, .3, Math.sin(a) * rr); rig.add(b);
      }
      const retro = new Jet({ count: 220, size: .38, speed: 9, spread: .26, life: .35, color: 0xffc98a });
      retro.points.position.y = -.2; rig.add(retro.points);
      push(g, (dt, t) => {
        retro.update(dt);
        const p = (t * .16) % 1;
        if (p < .70) {
          // ירידה מבוקרת: מאט ככל שמתקרב, רגליים נפרשות בדרך
          const k = p / .70;
          const ease = 1 - Math.pow(1 - k, 2.2);
          rig.position.y = 7.5 * (1 - ease) + .15;
          retro.setOn(k > .25);
          retro.power = .5 + k * .9;
          legs.forEach(l => l.rotation.x = -THREE.MathUtils.clamp((k - .45) / .35, 0, 1) * .95);
        } else {
          // נחתה — עומדת בשקט לרגע לפני שמתחילה שוב
          rig.position.y = .15;
          retro.setOn(false);
          legs.forEach(l => l.rotation.x = -.95);
        }
      });
    })();

    /* העתיד — סטארשיפ: הרקטה הגדולה ביותר שנבנתה אי פעם */
    (function () {
      const g = new THREE.Group();
      const rig = new THREE.Group(); g.add(rig);
      const steel = M.metal(0xc8d4e4, .28);
      const booster = new THREE.Mesh(new THREE.CylinderGeometry(.8, .8, 6.2, 44), steel);
      booster.position.y = 3.2; rig.add(booster);
      const ship = new THREE.Mesh(new THREE.CylinderGeometry(.8, .8, 4.0, 44), steel);
      ship.position.y = 8.4; rig.add(ship);
      rig.add(new THREE.Mesh(lathe(Array.from({ length: 16 }, (_, i) => {
        const t = i / 15; return [.8 * Math.cos(t * Math.PI / 2 * .96), 10.4 + 2.3 * t];
      }), 44), steel));
      // כנפוני ההיגוי האופייניים
      [[-1, 6.7, 1.1], [1, 6.7, 1.1], [-1, 10.6, .8], [1, 10.6, .8]].forEach(([sx, y, sz]) => {
        const f = new THREE.Mesh(new THREE.BoxGeometry(.12, 1.5 * sz, 1.0 * sz), M.paint(0x2b3a52, .5));
        f.position.set(sx * .82, y, -.2); rig.add(f);
      });
      const belt = new THREE.Mesh(new THREE.CylinderGeometry(.815, .815, .35, 44), M.paint(C.dark, .5));
      belt.position.y = 6.35; rig.add(belt);
      for (let i = 0; i < 9; i++) {
        const a = i === 8 ? 0 : (i / 8) * Math.PI * 2, rr = i === 8 ? 0 : .48;
        const b = new THREE.Mesh(lathe([[.1, .08], [.15, -.12], [.24, -.42], [0, -.44]], 18), M.metal(0x6f7f96, .35));
        b.material.side = THREE.DoubleSide;
        b.position.set(Math.cos(a) * rr, .1, Math.sin(a) * rr); rig.add(b);
      }
      const fire = new Jet({ count: 460, size: .7, speed: 17, spread: .6, life: .6, color: 0x9fd0ff });
      const smk = new Jet({ count: 240, tex: TEX_SMOKE, size: 2.2, speed: 6, spread: 1.7, life: 2.0, color: 0x9fb4d0, blending: THREE.NormalBlending });
      fire.points.position.y = -.6; smk.points.position.y = -1.1;
      rig.add(fire.points, smk.points); fire.setOn(true); smk.setOn(true);
      push(g, (dt, tt) => {
        fire.update(dt); smk.update(dt);
        const p = (tt * .16) % 1;
        rig.position.y = .3 + Math.pow(p, 2.2) * 3.0;
        rig.position.x = (Math.random() - .5) * .05;
      });
    })();

    let cur = -1, t = 0, orbit = null, anim = 0;
    // קנה מידה + מרחק מצלמה לכל דגם, כדי שכל אחד ימלא את הבמה כמו שצריך
    const fits  = [1.25, 1.30, 1.15, 1.30, .85, 1.00, .82];
    const dist  = [15,   16,   19,   14,   19,  21,   21 ];
    const camY  = [.2,   1.2,  1.8,  1.2,  1.6, 1.5,  1.6];

    return {
      scene, camera,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, -.4, 0), { minR: 8, maxR: 34, autoRot: .16 });
        this.orbit = orbit;
        if (cur >= 0) orbit.focus(new THREE.Vector3(0, camY[cur], 0), dist[cur]);
      },
      show(i) {
        if (i === cur) return;
        models.forEach((m, k) => m.visible = k === i);
        cur = i; anim = 0;
        holder.scale.setScalar(fits[i]);
        if (orbit) orbit.focus(new THREE.Vector3(0, camY[i], 0), dist[i]);
      },
      update(dt) {
        t += dt; anim += dt;
        ring.material.emissiveIntensity = .35 + Math.sin(t * 2.4) * .18;
        disc.rotation.y += dt * .15;
        const m = models[cur];
        if (m) {
          const k = Math.min(1, anim * 2.4), ease = 1 - Math.pow(1 - k, 3);
          m.scale.setScalar(.4 + ease * .6);
          if (m.userData.anim) m.userData.anim(dt, t);
        }
      },
    };
  });

  /* ============================================================
     רקטה מול טיל מונחה
     ============================================================ */
  Stage.register('guided', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1.6, .1, 600);
    camera.position.set(0, 6, 28);
    lightRig(scene);

    const ground = new THREE.Mesh(new THREE.CircleGeometry(120, 56), M.paint(0x14294d, 1));
    ground.rotation.x = -Math.PI / 2; scene.add(ground);
    const grid = new THREE.GridHelper(120, 30, 0x4aa8ff, 0x2a4a80);
    grid.material.transparent = true; grid.material.opacity = .5; grid.position.y = .02; scene.add(grid);

    const START = new THREE.Vector3(-11, 1.6, 0);
    const TARGET = new THREE.Vector3(11, 8.0, 0);

    const pad = new THREE.Group(); scene.add(pad);
    pad.position.set(START.x, 0, 0);
    const padBase = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, .4, 26), M.paint(0x46618a, .8));
    padBase.position.y = .2; pad.add(padBase);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(.16, 3.4, .16), M.metal(0x8494a8, .4));
    rail.position.y = 1.9; rail.rotation.z = -.42; pad.add(rail);

    const targetG = new THREE.Group(); scene.add(targetG);
    targetG.position.copy(TARGET);
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.5, .16, 12, 44), M.glow(C.amber, .7));
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(.85, .12, 12, 36), M.glow(0xe0364c, .7));
    const bull = new THREE.Mesh(new THREE.SphereGeometry(.34, 20, 14), M.glow(0xffffff, 1.1));
    targetG.add(ring1, ring2, bull);

    const rocket = new THREE.Group(); scene.add(rocket);
    const R = .34;
    rocket.add(new THREE.Mesh(new THREE.CylinderGeometry(R, R, 2.4, 26), M.paint(C.body, .4)));
    const payload = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.02, R * 1.02, .7, 26), M.paint(C.blue, .35));
    payload.position.y = .55; rocket.add(payload);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(R, 1.1, 26), M.paint(C.yellow, .35));
    nose.position.y = 1.75; rocket.add(nose);
    addFins(rocket, 4, finGeo(.85, .6, .05), M.paint(C.amber, .35), R * .9, -1.2);

    const brain = new THREE.Mesh(new THREE.SphereGeometry(.18, 18, 12), M.glow(0x2ec4ff, 1.4));
    brain.position.y = 2.15; rocket.add(brain);
    const canards = new THREE.Group(); rocket.add(canards);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const cv = new THREE.Mesh(new THREE.BoxGeometry(.06, .3, .42), M.paint(0x9fb4cd, .4));
      cv.position.set(Math.cos(a) * R, 1.05, Math.sin(a) * R);
      cv.rotation.y = -a;
      canards.add(cv);
    }

    const jet = new Jet({ count: 220, size: .3, speed: 12, spread: .2, life: .38, color: 0xffc98a });
    const trail = new Jet({ count: 160, tex: TEX_SMOKE, size: .7, speed: 2.2, spread: .3, life: 1.6, color: 0x9fb4d0, blending: THREE.NormalBlending });
    const boom = new Jet({ count: 260, size: .55, speed: 12, spread: 1.0, life: .7, color: 0xffc07a, dir: new THREE.Vector3(0, .2, 0), gravity: -4 });
    scene.add(jet.points, trail.points, boom.points);
    const shock = new THREE.Mesh(new THREE.TorusGeometry(1, .12, 10, 40),
      new THREE.MeshBasicMaterial({ color: 0xffb45a, transparent: true, opacity: 0, depthWrite: false }));
    scene.add(shock);

    let guided = false, st = 'idle', t = 0, orbit = null, boomT = 0;
    const pos = new THREE.Vector3(), vel = new THREE.Vector3();
    const WIND = new THREE.Vector3(0, 0, 3.6);

    function rest() { rocket.position.copy(START); rocket.rotation.set(0, 0, -.42); }
    rest();
    function aim(dir) {
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      rocket.quaternion.slerp(q, .35);
    }

    return {
      scene, camera,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 5, 0), { minR: 16, maxR: 60, autoRot: .05, maxPol: Math.PI / 2 - .05 });
        this.orbit = orbit;
      },
      setGuided(v) { guided = v; brain.visible = v; canards.visible = v; },
      launch() {
        if (st === 'fly') return;
        st = 'fly'; boomT = 0;
        pos.copy(START);
        vel.copy(TARGET).sub(START).normalize().multiplyScalar(17);
        jet.setOn(true); trail.setOn(true);
        shock.material.opacity = 0; shock.scale.setScalar(1);
      },
      reset() {
        st = 'idle'; rest();
        jet.setOn(false); trail.setOn(false); boom.setOn(false);
        shock.material.opacity = 0; rocket.visible = true;
      },
      get state() { return st; },
      update(dt) {
        t += dt;
        ring1.rotation.z += dt * .5; ring2.rotation.z -= dt * .8;
        targetG.rotation.y = Math.sin(t * .3) * .25;
        bull.material.emissiveIntensity = .9 + Math.sin(t * 4) * .4;
        if (guided) brain.material.emissiveIntensity = st === 'fly' ? (1 + Math.sin(t * 22) * 1.2) : 1.4;

        if (st === 'fly') {
          if (guided) {
            const want = TARGET.clone().sub(pos).normalize().multiplyScalar(vel.length());
            vel.lerp(want, Math.min(1, dt * 4.2));
            canards.rotation.y = Math.sin(t * 18) * .18;
          }
          vel.y -= 9.81 * dt;
          vel.addScaledVector(WIND, dt);
          pos.addScaledVector(vel, dt);
          rocket.position.copy(pos);
          aim(vel);
          const d = pos.distanceTo(TARGET);
          if (d < 1.5) {
            st = 'hit';
            jet.setOn(false); trail.setOn(false);
            boom.points.position.copy(TARGET); boom.setOn(true); boomT = 0;
            shock.position.copy(TARGET); shock.material.opacity = .9; shock.scale.setScalar(1);
            rocket.visible = false;
            if (this.onResult) this.onResult(true);
          } else if (pos.y < .3 || pos.x > 26 || Math.abs(pos.z) > 22) {
            st = 'miss'; jet.setOn(false);
            if (this.onResult) this.onResult(false);
          }
        } else if (st === 'hit') {
          boomT += dt;
          shock.scale.setScalar(1 + boomT * 12);
          shock.material.opacity = Math.max(0, .9 - boomT * 1.4);
          shock.lookAt(camera.position);
          if (boomT > 1.4) { boom.setOn(false); rocket.visible = true; }
        } else if (st === 'idle') {
          rocket.position.lerp(START, Math.min(1, dt * 4));
        }

        const back = new THREE.Vector3(0, -1.4, 0).applyQuaternion(rocket.quaternion).add(rocket.position);
        jet.points.position.copy(back);
        trail.points.position.copy(back);
        jet.update(dt); trail.update(dt); boom.update(dt);
      },
    };
  });

  /* ============================================================
     רקטת הבקבוק — דיאגרמה מפורקת
     ============================================================ */
  Stage.register('bottle', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1.6, .1, 500);
    camera.position.set(7, 3, 18);
    lightRig(scene);

    const root = new THREE.Group(); scene.add(root);

    const petMat = new THREE.MeshPhysicalMaterial({
      color: 0x9fd8f5, roughness: .05, metalness: 0,
      transparent: true, opacity: .34, side: THREE.DoubleSide, depthWrite: false,
      clearcoat: 1, clearcoatRoughness: .04,
    });

    const bp = [
      [0, 5.2], [1.05, 4.95], [1.15, 4.4], [1.15, 1.0], [1.05, .55],
      [.62, .25], [.42, .0], [.4, -.5], [.46, -.62], [.4, -.75],
    ];
    const gBottle = new THREE.Group(); root.add(gBottle);
    gBottle.add(new THREE.Mesh(lathe(bp, 52), petMat));
    gBottle.add(new THREE.Mesh(lathe([[0, 5.35], [.55, 5.34], [.95, 5.16], [1.06, 4.95]], 52),
      new THREE.MeshStandardMaterial({ color: 0xa8d8f0, roughness: .25, transparent: true, opacity: .35, side: THREE.DoubleSide, depthWrite: false })));

    const gWater = new THREE.Group(); root.add(gWater);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0aa0ff, emissive: 0x064e7c, emissiveIntensity: .3,
      roughness: .05, transparent: true, opacity: .82, side: THREE.DoubleSide,
    });
    let waterMesh = null, waterTopY = 1.0;
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

    const gAir = new THREE.Group(); root.add(gAir);
    const bubbles = [];
    for (let i = 0; i < 40; i++) {
      const b = new THREE.Mesh(new THREE.SphereGeometry(.07 + Math.random() * .07, 12, 8),
        new THREE.MeshBasicMaterial({ color: 0x4fb8ff, transparent: true, opacity: .5 }));
      b.userData.p = Math.random();
      gAir.add(b); bubbles.push(b);
    }

    const gCap = new THREE.Group(); root.add(gCap);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(.44, .44, .5, 26), M.paint(0xe0364c, .4));
    cap.position.y = -1.0; gCap.add(cap);
    const nozzlePipe = new THREE.Mesh(new THREE.CylinderGeometry(.14, .14, 1.5, 18), M.metal(0xa5b2c4, .3));
    nozzlePipe.position.y = -1.9; gCap.add(nozzlePipe);
    const gauge = new THREE.Mesh(new THREE.CylinderGeometry(.35, .35, .12, 24), M.metal(0xc6cfdd, .25));
    gauge.rotation.z = Math.PI / 2; gauge.position.set(.7, -2.35, 0); gCap.add(gauge);
    const hose = new THREE.Mesh(new THREE.TorusGeometry(.8, .07, 8, 30, Math.PI * .8), M.paint(0x2b3a52, .6));
    hose.position.set(.75, -2.9, 0); hose.rotation.z = -.6; gCap.add(hose);

    const gFins = new THREE.Group(); root.add(gFins);
    addFins(gFins, 3, finGeo(1.9, 1.35, .07), M.paint(C.blue, .35), 1.0, .5);

    const gNose = new THREE.Group(); root.add(gNose);
    gNose.add(new THREE.Mesh(lathe(Array.from({ length: 16 }, (_, i) => {
      const t = i / 15; return [1.12 * Math.cos(t * Math.PI / 2), 5.35 + 2.1 * t];
    }), 44), M.paint(C.yellow, .35)));
    const clay = new THREE.Mesh(new THREE.SphereGeometry(.55, 22, 16), M.paint(0xb06a3a, .8));
    clay.position.y = 5.9; clay.scale.y = .7; gNose.add(clay);

    const labels = Labeller();
    const L = [
      labels.add('חרטום<small>כובד בראש מייצב את המעוף</small>', new THREE.Vector3(), 'yellow'),
      labels.add('אוויר דחוס<small>הקפיץ</small>', new THREE.Vector3(), 'blue'),
      labels.add('מים<small>הדלק</small>', new THREE.Vector3(), 'blue'),
      labels.add('סנפירים<small>שומרים על מסלול ישר</small>', new THREE.Vector3(), ''),
      labels.add('פקק ושסתום<small>כאן הכול יוצא</small>', new THREE.Vector3(), 'red'),
      labels.add('משאבה<small>דוחסת את האוויר פנימה</small>', new THREE.Vector3(), 'green'),
    ];

    let explode = 0, explodeTarget = 0, waterFrac = .33, t = 0, orbit = null;

    return {
      scene, camera, labels,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 2.2, 0), { minR: 11, maxR: 46, autoRot: .12 });
        this.orbit = orbit;
      },
      onEnter() { labels.mountTo(Stage.host); },
      setExploded(v) {
        explodeTarget = v ? 1 : 0;
        if (orbit) orbit.focus(new THREE.Vector3(0, v ? 2.6 : 2.2, 0), v ? 30 : 19);
      },
      get exploded() { return explodeTarget > .5; },
      setWater(f) { waterFrac = f; rebuildWater(f); },
      update(dt) {
        t += dt;
        explode += (explodeTarget - explode) * Math.min(1, dt * 3.2);
        const e = explode;
        gNose.position.y = e * 3.0;
        gWater.position.x = -e * 4.6;
        gAir.position.x = e * 4.6;
        gFins.position.z = -e * 4.0;
        gCap.position.y = -e * 2.4;

        const airBase = waterTopY;
        const airH = Math.max(.4, 5.0 - airBase);
        bubbles.forEach((b, i) => {
          b.userData.p += dt * (.12 + (i % 5) * .03);
          if (b.userData.p > 1) b.userData.p -= 1;
          const p = b.userData.p, a = i * 2.399, rr = .35 + (i % 7) * .11;
          b.position.set(Math.cos(a + t * .4) * rr, airBase + .2 + p * airH, Math.sin(a + t * .4) * rr);
          b.material.opacity = .2 + .4 * Math.sin(p * Math.PI);
        });

        root.rotation.z = Math.sin(t * .5) * .015;

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

  global.Stage3D = Stage;
})(window);
