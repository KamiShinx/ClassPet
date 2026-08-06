/* ============================================================
   MAKE · חיים של כוכב — מנוע התלת-ממד
   ============================================================ */
(function (global) {
  'use strict';

  /* ---------------- טקסטורות מחוללות ---------------- */
  function radialTex(stops, size) {
    const c = document.createElement('canvas');
    c.width = c.height = size || 64;
    const g = c.getContext('2d');
    const r = c.width / 2;
    const gr = g.createRadialGradient(r, r, 0, r, r, r);
    stops.forEach(([o, col]) => gr.addColorStop(o, col));
    g.fillStyle = gr; g.fillRect(0, 0, c.width, c.height);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  /* רעש ערכי פשוט — נותן פני שטח סוערים לשמש בלי קבצים חיצוניים */
  function noiseTex(size, oct, warm) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const img = g.createImageData(size, size);
    const grids = [];
    for (let o = 0; o < oct; o++) {
      const n = 4 << o;
      const grid = new Float32Array(n * n);
      for (let i = 0; i < n * n; i++) grid[i] = Math.random();
      grids.push({ n, grid });
    }
    const smooth = t => t * t * (3 - 2 * t);
    function sample(gr, x, y) {
      const n = gr.n;
      const fx = x * n, fy = y * n;
      const x0 = Math.floor(fx) % n, y0 = Math.floor(fy) % n;
      const x1 = (x0 + 1) % n, y1 = (y0 + 1) % n;
      const tx = smooth(fx - Math.floor(fx)), ty = smooth(fy - Math.floor(fy));
      const a = gr.grid[y0 * n + x0], b = gr.grid[y0 * n + x1];
      const cc = gr.grid[y1 * n + x0], d = gr.grid[y1 * n + x1];
      return (a * (1 - tx) + b * tx) * (1 - ty) + (cc * (1 - tx) + d * tx) * ty;
    }
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let v = 0, amp = 1, tot = 0;
        for (let o = 0; o < oct; o++) {
          v += sample(grids[o], x / size, y / size) * amp;
          tot += amp; amp *= .55;
        }
        v /= tot;
        const i = (y * size + x) * 4;
        if (warm) {
          img.data[i] = 255;
          img.data[i + 1] = 90 + v * 150;
          img.data[i + 2] = 10 + v * 70;
        } else {
          img.data[i] = img.data[i + 1] = img.data[i + 2] = v * 255;
        }
        img.data[i + 3] = 255;
      }
    }
    g.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    return t;
  }

  let TEX_GLOW, TEX_DUST, TEX_SPARK, TEX_SUN, TEX_SHADOW;
  function initTex() {
    TEX_GLOW = radialTex([[0, 'rgba(255,255,255,1)'], [.3, 'rgba(255,220,140,.8)'], [1, 'rgba(255,150,40,0)']], 128);
    TEX_DUST = radialTex([[0, 'rgba(190,170,220,.7)'], [.5, 'rgba(150,140,200,.25)'], [1, 'rgba(120,120,180,0)']]);
    TEX_SPARK = radialTex([[0, 'rgba(255,255,255,1)'], [.4, 'rgba(255,210,140,.7)'], [1, 'rgba(255,160,60,0)']]);
    TEX_SUN = noiseTex(256, 5, true);
    TEX_SHADOW = radialTex([[0, 'rgba(40,70,110,.4)'], [.45, 'rgba(40,70,110,.18)'], [1, 'rgba(40,70,110,0)']]);
  }

  const M = {
    paint: (col, rough = .45) => new THREE.MeshStandardMaterial({ color: col, roughness: rough, metalness: .1 }),
    glow: (col, i = 1) => new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: i, roughness: 1, metalness: 0 }),
  };

  function lightRig(scene) {
    // תאורת חלל — הבמה כהה, אז מילוי עדין וקונטרסט חזק
    scene.add(new THREE.HemisphereLight(0xdfeeff, 0x0e2044, 1.0));
    const k = new THREE.DirectionalLight(0xffffff, 2.0); k.position.set(6, 10, 8); scene.add(k);
    const f = new THREE.DirectionalLight(0x4aa8ff, 1.3); f.position.set(-8, 3, -6); scene.add(f);
    return k;
  }

  /* גוף זוהר: ליבה + הילה — קריא היטב על רקע בהיר */
  function glowBall(r, color, glowColor, intensity, textured) {
    const g = new THREE.Group();
    const mat = M.glow(color, intensity || 1);
    if (textured !== false) {
      // מפת רעש על הפליטה — בלעדיה הכוכב נראה כמו עיגול שטוח על רקע לבן
      mat.emissiveMap = TEX_SUN;
      mat.emissive = new THREE.Color(0xffffff);
      mat.color = new THREE.Color(color);
    }
    const core = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 34), mat);
    g.add(core);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX_GLOW, color: glowColor || color, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: .6,
    }));
    halo.scale.setScalar(r * 4.4);
    g.add(halo);
    g.userData.core = core;
    g.userData.halo = halo;
    return g;
  }

  function attachOrbit(cam, dom, target, opt) {
    const o = Object.assign({ minR: 3, maxR: 90, minPol: .12, maxPol: Math.PI - .12, autoRot: .12, damp: .09 }, opt || {});
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

  /* ---------------- מנהל הבמה ---------------- */
  const Stage = {
    renderer: null, canvas: null, scenes: {}, active: null, host: null, clock: null, ro: null,
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

  function Labeller() {
    const items = [];
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
        let layer = host.querySelector('.labels');
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
    };
  }

  /* ============================================================
     השמש
     ============================================================ */
  Stage.register('sun', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1.6, .1, 900);
    camera.position.set(0, 2, 27);
    lightRig(scene);

    const root = new THREE.Group(); scene.add(root);

    const clip = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
    const surf = new THREE.MeshStandardMaterial({
      color: 0x8a3800, emissive: 0xffc060, emissiveMap: TEX_SUN, emissiveIntensity: .95,
      roughness: 1, metalness: 0, side: THREE.DoubleSide,
    });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(5, 72, 48), surf);
    root.add(sun);

    const corona = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX_GLOW, color: 0xffb24a, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: .8,
    }));
    corona.scale.setScalar(19); root.add(corona);

    // התלקחויות — קשתות שיוצאות מהפנים וחוזרות
    const flares = [];
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + .4;
      const tilt = (Math.random() - .5) * 1.2;
      const pts = [];
      for (let k = 0; k <= 20; k++) {
        const t = k / 20;
        const rr = 5 + Math.sin(t * Math.PI) * (1.6 + Math.random() * .3);
        const ang = a + (t - .5) * .55;
        pts.push(new THREE.Vector3(Math.cos(ang) * rr, Math.sin(t * Math.PI) * 1.6 + tilt * 2, Math.sin(ang) * rr));
      }
      const tube = new THREE.Mesh(
        new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 26, .17, 8, false),
        new THREE.MeshBasicMaterial({ color: 0xff8a20, transparent: true, opacity: .7, depthWrite: false })
      );
      root.add(tube); flares.push({ m: tube, ph: Math.random() * 6 });
    }

    // ליבה (נגלית בחתך)
    const coreClipped = [clip];
    const core = new THREE.Mesh(new THREE.SphereGeometry(1.5, 40, 28),
      new THREE.MeshBasicMaterial({ color: 0xffffff, clippingPlanes: coreClipped }));
    const zone = new THREE.Mesh(new THREE.SphereGeometry(3.4, 48, 32),
      new THREE.MeshBasicMaterial({ color: 0xffd36b, transparent: true, opacity: .55, clippingPlanes: coreClipped, side: THREE.DoubleSide }));
    root.add(core, zone);
    core.visible = zone.visible = false;

    // כדור הארץ להשוואה
    const earth = new THREE.Group();
    const eBall = new THREE.Mesh(new THREE.SphereGeometry(.0459 * 5, 30, 22), M.glow(0x4aa8ff, .8));
    earth.add(eBall);
    // כדור הארץ קטן פי 109 מהשמש — בלי סימון הוא פשוט לא נראה
    const eRing = new THREE.Mesh(new THREE.RingGeometry(.5, .55, 48),
      new THREE.MeshBasicMaterial({ color: 0x0094ff, transparent: true, opacity: .9, side: THREE.DoubleSide }));
    earth.add(eRing);
    earth.position.set(9.5, -3.2, 0);
    earth.visible = false;
    root.add(earth);

    const labels = Labeller();
    const lSun = labels.add('השמש', new THREE.Vector3(0, 6.4, 0), 'yellow');
    const lEarth = labels.add('כדור הארץ<small>קטן פי 109 מהשמש</small>', new THREE.Vector3(9.5, -2.1, 0), 'blue');
    const lCore = labels.add('הליבה<small>15 מיליון מעלות</small>', new THREE.Vector3(-1.4, 1.6, 0), 'red');
    lEarth.shown = false; lCore.shown = false;

    let t = 0, orbit = null, cut = false;

    return {
      scene, camera, labels,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 0, 0), { minR: 12, maxR: 60, autoRot: .1 });
        this.orbit = orbit;
      },
      onEnter() { labels.mountTo(Stage.host); },
      setEarth(v) {
        earth.visible = v; lEarth.shown = v;
        if (orbit) orbit.focus(new THREE.Vector3(v ? 3 : 0, v ? -1 : 0, 0), v ? 26 : 20);
      },
      setCut(v) {
        cut = v;
        core.visible = zone.visible = v;
        lCore.shown = v;
        surf.clippingPlanes = v ? [clip] : null;
        surf.needsUpdate = true;
      },
      get earthOn() { return earth.visible; },
      get cutOn() { return cut; },
      update(dt) {
        t += dt;
        sun.rotation.y += dt * .05;
        TEX_SUN.offset.x += dt * .008;
        TEX_SUN.offset.y = Math.sin(t * .1) * .02;
        surf.emissiveIntensity = .92 + Math.sin(t * 1.7) * .06;
        corona.scale.setScalar(19 + Math.sin(t * .9) * .5);
        flares.forEach((f, i) => {
          f.m.material.opacity = .35 + Math.abs(Math.sin(t * .7 + f.ph)) * .5;
          f.m.scale.setScalar(1 + Math.sin(t * .8 + f.ph) * .05);
        });
        if (earth.visible) {
          eBall.rotation.y += dt * .5;
          eRing.lookAt(camera.position);
          eRing.scale.setScalar(1 + Math.sin(t * 2.2) * .07);
        }
        labels.project(camera, Stage.host);
      },
    };
  });

  /* ============================================================
     לידת כוכב — ענן שמתכווץ ונדלק
     ============================================================ */
  Stage.register('birth', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1.6, .1, 900);
    camera.position.set(0, 3, 32);
    lightRig(scene);

    const root = new THREE.Group(); scene.add(root);

    const N = 900;
    const home = new Float32Array(N * 3);
    const pos = new Float32Array(N * 3);
    const spin = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const th = Math.acos(2 * Math.random() - 1), ph = Math.random() * Math.PI * 2;
      const r = 13 * Math.pow(Math.random(), .45);
      home[i * 3] = r * Math.sin(th) * Math.cos(ph);
      home[i * 3 + 1] = r * Math.sin(th) * Math.sin(ph) * .6;
      home[i * 3 + 2] = r * Math.cos(th);
      spin[i] = .1 + Math.random() * .5;
    }
    pos.set(home);
    const cloudGeo = new THREE.BufferGeometry();
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const cloudMat = new THREE.PointsMaterial({
      size: 2.6, map: TEX_DUST, transparent: true, depthWrite: false,
      blending: THREE.NormalBlending, color: 0x9d8fd0, opacity: .55, sizeAttenuation: true,
    });
    const cloud = new THREE.Points(cloudGeo, cloudMat);
    cloud.frustumCulled = false;
    root.add(cloud);

    const star = glowBall(1, 0xfff0c0, 0xffc04a, 1.2, false);
    star.scale.setScalar(.01);
    root.add(star);

    const labels = Labeller();
    const lCloud = labels.add('ענן גז ואבק', new THREE.Vector3(0, 9, 0), 'blue');
    const lStar = labels.add('כוכב חדש!', new THREE.Vector3(0, 5, 0), 'yellow');
    lStar.shown = false;

    let k = 0, t = 0, orbit = null, flash = 0;

    return {
      scene, camera, labels,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 0, 0), { minR: 12, maxR: 70, autoRot: .08 });
        this.orbit = orbit;
      },
      onEnter() { labels.mountTo(Stage.host); },
      setCollapse(v) {
        const was = k;
        k = v;
        if (v >= .995 && was < .995) { flash = 1; if (this.onIgnite) this.onIgnite(); }
      },
      get ignited() { return k >= .995; },
      update(dt) {
        t += dt;
        const ease = Math.pow(k, 1.6);
        const p = cloudGeo.attributes.position.array;
        for (let i = 0; i < N; i++) {
          const a = t * spin[i] * (.3 + ease * 2.2);
          const ca = Math.cos(a), sa = Math.sin(a);
          const hx = home[i * 3], hy = home[i * 3 + 1], hz = home[i * 3 + 2];
          const rx = hx * ca - hz * sa, rz = hx * sa + hz * ca;
          const shrink = 1 - ease * .93;
          p[i * 3] = rx * shrink;
          p[i * 3 + 1] = hy * shrink * (1 - ease * .5);
          p[i * 3 + 2] = rz * shrink;
        }
        cloudGeo.attributes.position.needsUpdate = true;

        // הענן מתחמם ככל שהוא נדחס
        cloudMat.color.setHSL(.72 - k * .62, .55 + k * .4, .55 + k * .1);
        cloudMat.opacity = .55 - k * .25;
        cloudMat.size = 2.6 - k * 1.1;

        star.scale.setScalar(.01 + Math.pow(k, 2.4) * 2.6);
        star.userData.core.material.emissiveIntensity = .4 + k * 1.6 + flash * 3;
        star.userData.halo.material.opacity = Math.min(1, k * k * 1.2 + flash);
        star.userData.halo.scale.setScalar((.01 + Math.pow(k, 2.4) * 2.6) * 4.4 * (1 + flash * .8));
        flash = Math.max(0, flash - dt * 1.6);

        lCloud.shown = k < .9;
        lStar.shown = k >= .9;
        lStar.pos.set(0, 2 + Math.pow(k, 2.4) * 3.4, 0);
        labels.project(camera, Stage.host);
      },
    };
  });

  /* ============================================================
     מחזור החיים — שלב אחד בכל פעם
     ============================================================ */
  Stage.register('lifecycle', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1.6, .1, 900);
    camera.position.set(0, 3, 30);
    lightRig(scene);

    const holder = new THREE.Group(); scene.add(holder);
    const stages = {};
    function reg(key, g, anim) { g.visible = false; g.userData.anim = anim; holder.add(g); stages[key] = g; return g; }

    /* ערפילית */
    (function () {
      const g = new THREE.Group();
      const N = 600, p = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const th = Math.acos(2 * Math.random() - 1), ph = Math.random() * Math.PI * 2;
        const r = 8 * Math.pow(Math.random(), .5);
        p[i * 3] = r * Math.sin(th) * Math.cos(ph);
        p[i * 3 + 1] = r * Math.sin(th) * Math.sin(ph) * .7;
        p[i * 3 + 2] = r * Math.cos(th);
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(p, 3));
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({
        size: 2.4, map: TEX_DUST, transparent: true, depthWrite: false,
        color: 0x9d8fd0, opacity: .6, sizeAttenuation: true,
      }));
      pts.frustumCulled = false;
      g.add(pts);
      reg('nebula', g, (dt) => { g.rotation.y += dt * .12; });
    })();

    /* כוכב רגיל */
    (function () {
      const g = glowBall(2.6, 0xffd04a, 0xffb030, 1.3);
      reg('main', g, (dt, t) => {
        g.userData.core.material.emissiveIntensity = 1.25 + Math.sin(t * 2) * .08;
        g.rotation.y += dt * .2;
      });
    })();

    /* ענק אדום */
    (function () {
      const g = glowBall(7.6, 0xff5a2a, 0xff6a2a, .9);
      reg('giant', g, (dt, t) => {
        const s = 1 + Math.sin(t * .8) * .04;
        g.userData.core.scale.setScalar(s);
        g.userData.halo.scale.setScalar(7.6 * 4.4 * s);
        g.rotation.y += dt * .08;
      });
    })();

    /* ננס לבן */
    (function () {
      const g = glowBall(.55, 0xdff2ff, 0x9fd8ff, 2.4, false);
      reg('dwarf', g, (dt, t) => {
        g.userData.halo.material.opacity = .7 + Math.sin(t * 3) * .12;
      });
    })();

    /* על-ענק אדום */
    (function () {
      const g = glowBall(10.5, 0xff4a1e, 0xff5a20, .8);
      reg('supergiant', g, (dt, t) => {
        const s = 1 + Math.sin(t * .55) * .05;
        g.userData.core.scale.setScalar(s);
        g.userData.halo.scale.setScalar(10.5 * 4.4 * s);
      });
    })();

    /* סופרנובה — פעימה חוזרת */
    (function () {
      const g = new THREE.Group();
      const coreB = glowBall(1.4, 0xffffff, 0xfff0b0, 3);
      g.add(coreB);
      const shell = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 28),
        new THREE.MeshBasicMaterial({ color: 0xffb060, transparent: true, opacity: .5, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false }));
      g.add(shell);
      const N = 500, p = new Float32Array(N * 3), dir = [];
      for (let i = 0; i < N; i++) {
        const th = Math.acos(2 * Math.random() - 1), ph = Math.random() * Math.PI * 2;
        dir.push(new THREE.Vector3(Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th))
          .multiplyScalar(.6 + Math.random() * .8));
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(p, 3));
      const debris = new THREE.Points(geo, new THREE.PointsMaterial({
        size: 1.1, map: TEX_SPARK, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, color: 0xffc070, sizeAttenuation: true,
      }));
      debris.frustumCulled = false;
      g.add(debris);
      // מתנגן מרגע הבחירה, כדי שתמיד רואים את ההתפוצצות מההתחלה
      reg('supernova', g, (dt, t, since) => {
        const c = ((since || 0) * .25) % 1;
        const r = c * 13;
        shell.scale.setScalar(Math.max(.01, r));
        shell.material.opacity = Math.max(0, .55 * (1 - c));
        coreB.scale.setScalar(Math.max(.35, 1 - c * .6));
        coreB.userData.core.material.emissiveIntensity = 2.4 + (c < .1 ? 7 : 0);
        const a = geo.attributes.position.array;
        for (let i = 0; i < N; i++) {
          a[i * 3] = dir[i].x * r; a[i * 3 + 1] = dir[i].y * r; a[i * 3 + 2] = dir[i].z * r;
        }
        geo.attributes.position.needsUpdate = true;
        debris.material.opacity = Math.max(.15, 1 - c * .85);
      });
    })();

    /* כוכב נויטרונים — קטן, מסתובב מהר, עם אלומות */
    (function () {
      const g = new THREE.Group();
      const b = glowBall(.4, 0xeaf6ff, 0x7fd0ff, 3, false);
      g.add(b);
      const beams = new THREE.Group(); g.add(beams);
      [1, -1].forEach(s => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(1.5, 9, 26, 1, true),
          new THREE.MeshBasicMaterial({ color: 0x7fd0ff, transparent: true, opacity: .3, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
        cone.position.y = s * 4.5;
        cone.rotation.x = s > 0 ? Math.PI : 0;
        beams.add(cone);
      });
      beams.rotation.z = .5;
      reg('neutron', g, (dt, t) => {
        beams.rotation.y += dt * 5;
        b.userData.halo.material.opacity = .6 + Math.abs(Math.sin(t * 6)) * .35;
      });
    })();

    /* חור שחור */
    (function () {
      const g = new THREE.Group();
      const hor = new THREE.Mesh(new THREE.SphereGeometry(1.9, 48, 34),
        new THREE.MeshBasicMaterial({ color: 0x05070d }));
      g.add(hor);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.35, .09, 12, 90),
        new THREE.MeshBasicMaterial({ color: 0xffd48a, transparent: true, opacity: .95, blending: THREE.AdditiveBlending, depthWrite: false }));
      ring.rotation.x = Math.PI / 2; g.add(ring);
      const disk = new THREE.Mesh(new THREE.RingGeometry(2.6, 7.2, 96, 1),
        new THREE.MeshBasicMaterial({ map: TEX_GLOW, color: 0xffa63c, transparent: true, opacity: .8, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
      disk.rotation.x = -Math.PI / 2.35; g.add(disk);
      reg('blackhole', g, (dt) => { disk.rotation.z += dt * .55; });
    })();

    /* שמש בקנה מידה אמיתי לצד הגוף — הדרך היחידה שהגודל באמת מורגש */
    const refSun = glowBall(2.6, 0xffd04a, 0xffb030, 1.1);
    refSun.visible = false;
    scene.add(refSun);

    const labels = Labeller();
    const lRef = labels.add('השמש שלנו<small>באותו קנה מידה</small>', new THREE.Vector3(0, 0, 0), 'yellow');
    const lObj = labels.add('', new THREE.Vector3(0, 0, 0), 'blue');
    lRef.shown = false; lObj.shown = false;

    // לכל שלב: רדיוס, מרחק מצלמה בלי השוואה, ומרחק כשמציגים גם את השמש
    const CONF = {
      nebula:     { r: 8,    dist: 30, cmp: 30, name: '' },
      main:       { r: 2.6,  dist: 15, cmp: 15, name: 'כוכב כמו השמש' },
      giant:      { r: 7.6,  dist: 34, cmp: 44, name: 'ענק אדום' },
      dwarf:      { r: .55,  dist: 7,  cmp: 20, name: 'ננס לבן' },
      supergiant: { r: 10.5, dist: 46, cmp: 58, name: 'על-ענק אדום' },
      supernova:  { r: 13,   dist: 34, cmp: 34, name: '' },
      neutron:    { r: .4,   dist: 22, cmp: 20, name: 'כוכב נויטרונים' },
      blackhole:  { r: 1.9,  dist: 26, cmp: 24, name: 'חור שחור' },
    };

    let cur = null, t = 0, orbit = null, anim = 0;

    return {
      scene, camera, labels,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 0, 0), { minR: 5, maxR: 90, autoRot: .1 });
        this.orbit = orbit;
        if (cur) { const c = CONF[cur]; orbit.focus(new THREE.Vector3(0, 0, 0), c ? c.dist : 24); }
      },
      onEnter() { labels.mountTo(Stage.host); },
      show(key, showRef) {
        Object.entries(stages).forEach(([k, g]) => g.visible = (k === key));
        cur = key; anim = 0;
        const c = CONF[key] || { r: 3, dist: 24, cmp: 24, name: '' };
        refSun.visible = !!showRef;
        lRef.shown = !!showRef;
        lObj.shown = !!showRef && !!c.name;
        lObj.el.innerHTML = c.name;
        if (showRef) {
          // מרווח בין השניים לפי הגודל של הגוף המוצג
          const gap = Math.max(2.4, c.r * .35);
          const x = -(c.r + 2.6 + gap);
          refSun.position.set(x, 0, 0);
          lRef.pos.set(x, -2.6 - 1.4, 0);
          lObj.pos.set(0, c.r + 1.2, 0);
          if (orbit) orbit.focus(new THREE.Vector3(x / 2, 0, 0), c.cmp);
        } else {
          refSun.position.set(0, 0, 0);
          if (orbit) orbit.focus(new THREE.Vector3(0, 0, 0), c.dist);
        }
      },
      update(dt) {
        t += dt; anim += dt;
        const g = stages[cur];
        if (g && g.userData.anim) g.userData.anim(dt, t, anim);
        if (refSun.visible) {
          refSun.rotation.y += dt * .2;
          refSun.userData.core.material.emissiveIntensity = 1.05 + Math.sin(t * 2) * .07;
        }
        labels.project(camera, Stage.host);
      },
    };
  });

  /* ============================================================
     חור שחור — סצנה ייעודית עם כוכב שאפשר לזרוק פנימה
     ============================================================ */
  Stage.register('blackhole', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1.6, .1, 900);
    camera.position.set(0, 7, 30);
    lightRig(scene);

    const root = new THREE.Group(); scene.add(root);

    const R = 2.4;
    const horizon = new THREE.Mesh(new THREE.SphereGeometry(R, 52, 36),
      new THREE.MeshBasicMaterial({ color: 0x05070d }));
    root.add(horizon);

    // טבעת הפוטונים
    const photon = new THREE.Mesh(new THREE.TorusGeometry(R * 1.22, .07, 12, 100),
      new THREE.MeshBasicMaterial({ color: 0xfff0c0, transparent: true, opacity: .95, blending: THREE.AdditiveBlending, depthWrite: false }));
    photon.rotation.x = Math.PI / 2;
    root.add(photon);

    // דיסקת צבירה
    const disk = new THREE.Mesh(new THREE.RingGeometry(R * 1.35, R * 4.4, 128, 1),
      new THREE.MeshBasicMaterial({ map: TEX_GLOW, color: 0xff9020, transparent: true, opacity: .55, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    disk.rotation.x = -Math.PI / 2.5;
    root.add(disk);
    const disk2 = new THREE.Mesh(new THREE.RingGeometry(R * 1.5, R * 3.4, 128, 1),
      new THREE.MeshBasicMaterial({ map: TEX_GLOW, color: 0xffd070, transparent: true, opacity: .5, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    disk2.rotation.x = -Math.PI / 2.5;
    root.add(disk2);

    // אופק האירועים — קו מקווקו
    const horizLine = new THREE.Mesh(new THREE.TorusGeometry(R * 1.02, .035, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xe0364c, transparent: true, opacity: .9 }));
    horizLine.rotation.x = Math.PI / 2;
    root.add(horizLine);

    // כוכב שנזרק פנימה
    const star = glowBall(.75, 0xfff0c0, 0xffc04a, 1.6, false);
    star.visible = false;
    root.add(star);
    const trailGeo = new THREE.BufferGeometry();
    const TN = 160, tp = new Float32Array(TN * 3);
    trailGeo.setAttribute('position', new THREE.BufferAttribute(tp, 3));
    const trail = new THREE.Points(trailGeo, new THREE.PointsMaterial({
      size: .55, map: TEX_SPARK, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, color: 0xffc070, opacity: .9, sizeAttenuation: true,
    }));
    trail.frustumCulled = false;
    root.add(trail);

    const labels = Labeller();
    const lHor = labels.add('אופק האירועים<small>מכאן אין חזרה</small>', new THREE.Vector3(0, 0, 0), 'red');
    const lDisk = labels.add('חומר שנשאב פנימה<small>מתחמם וזוהר</small>', new THREE.Vector3(0, 0, 0), 'yellow');

    let t = 0, orbit = null, st = 'idle', ang = 0, rad = 0, tIdx = 0;

    return {
      scene, camera, labels,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 0, 0), { minR: 12, maxR: 70, autoRot: .09, maxPol: Math.PI - .3 });
        this.orbit = orbit;
      },
      onEnter() { labels.mountTo(Stage.host); },
      throwStar() {
        if (st === 'fall') return;
        st = 'fall'; ang = 0; rad = 15; tIdx = 0;
        star.visible = true;
        for (let i = 0; i < TN; i++) { tp[i * 3] = tp[i * 3 + 1] = tp[i * 3 + 2] = 9999; }
      },
      reset() { st = 'idle'; star.visible = false; for (let i = 0; i < TN; i++) tp[i * 3 + 1] = 9999; trailGeo.attributes.position.needsUpdate = true; },
      get state() { return st; },
      update(dt) {
        t += dt;
        disk.rotation.z += dt * .5;
        disk2.rotation.z += dt * .78;
        photon.material.opacity = .85 + Math.sin(t * 2) * .12;

        if (st === 'fall') {
          // ספירלה פנימה — מהר יותר ככל שמתקרבים
          const speed = .6 + (16 / Math.max(rad, 1.2)) * .5;
          ang += speed * dt;
          rad -= dt * (1.2 + (14 - Math.min(rad, 14)) * .35);
          const y = Math.max(0, (rad - R) * .12);
          star.position.set(Math.cos(ang) * rad, y, Math.sin(ang) * rad * .55);
          // מתמתח ככל שמתקרב (ספגטיפיקציה)
          const s = THREE.MathUtils.clamp((8 - rad) / 6, 0, 1);
          star.scale.set(1 - s * .7, 1 + s * 2.4, 1 - s * .7);
          star.userData.halo.material.opacity = .85 * (1 - s * .5);
          tp[tIdx * 3] = star.position.x; tp[tIdx * 3 + 1] = star.position.y; tp[tIdx * 3 + 2] = star.position.z;
          tIdx = (tIdx + 1) % TN;
          trailGeo.attributes.position.needsUpdate = true;
          if (rad <= R * .92) {
            st = 'gone'; star.visible = false;
            if (this.onGone) this.onGone();
          }
        }

        lHor.pos.set(0, R * 1.15, R * 1.1);
        lDisk.pos.set(R * 3.6, -.9, 0);
        labels.project(camera, Stage.host);
      },
    };
  });


  /* ============================================================
     שכבות השמש — חתך אמיתי
     ============================================================ */
  Stage.register('layers', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1.6, .1, 900);
    camera.position.set(11, 5, 20);
    lightRig(scene);

    const root = new THREE.Group(); scene.add(root);
    const clip = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);

    // מבפנים החוצה
    const SHELLS = [
      { k: 'core',  r: 1.9, col: 0xfff4d0, op: 1,   emis: 2.4 },
      { k: 'rad',   r: 3.5, col: 0xffd06a, op: .95, emis: 1.1 },
      { k: 'conv',  r: 4.6, col: 0xff9a34, op: .95, emis: .9 },
      { k: 'photo', r: 5.0, col: 0xff7a18, op: 1,   emis: 1.3 },
    ];
    const meshes = {};
    SHELLS.forEach(sh => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(sh.r, 64, 44), new THREE.MeshStandardMaterial({
        color: sh.col, emissive: sh.col, emissiveIntensity: sh.emis,
        roughness: 1, metalness: 0, side: THREE.DoubleSide,
        transparent: true, opacity: sh.op, clippingPlanes: [clip],
      }));
      root.add(m); meshes[sh.k] = m;
    });
    // מרקם על פני השטח
    meshes.photo.material.emissiveMap = TEX_SUN;
    meshes.conv.material.emissiveMap = TEX_SUN;

    // קורונה
    const corona = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX_GLOW, color: 0xffb24a, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: .55,
    }));
    corona.scale.setScalar(18); root.add(corona);
    meshes.corona = corona;

    const labels = Labeller();
    const L = {
      core:  labels.add('הליבה', new THREE.Vector3(-1.0, .9, 0), 'red'),
      rad:   labels.add('אזור הקרינה', new THREE.Vector3(-2.7, 1.6, 0), 'yellow'),
      conv:  labels.add('אזור ההסעה', new THREE.Vector3(-4.1, 2.4, 0), ''),
      photo: labels.add('פני השטח', new THREE.Vector3(-4.6, -2.6, 0), 'yellow'),
      corona: labels.add('הקורונה', new THREE.Vector3(-7.6, 5.2, 0), 'blue'),
    };

    let t = 0, orbit = null, sel = null;

    return {
      scene, camera, labels,
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 0, 0), { minR: 10, maxR: 50, autoRot: .08 });
        this.orbit = orbit;
      },
      onEnter() { labels.mountTo(Stage.host); },
      select(key) {
        sel = key;
        SHELLS.forEach(sh => {
          const m = meshes[sh.k];
          const dim = sel && sel !== sh.k;
          m.material.opacity = dim ? sh.op * .22 : sh.op;
          m.material.emissiveIntensity = (sel === sh.k ? sh.emis * 1.5 : sh.emis);
        });
        corona.material.opacity = sel === 'corona' ? .95 : (sel ? .18 : .55);
        Object.entries(L).forEach(([k, l]) => l.shown = !sel || sel === k);
      },
      update(dt) {
        t += dt;
        root.rotation.y += dt * .05;
        TEX_SUN.offset.x += dt * .006;
        corona.scale.setScalar(18 + Math.sin(t * .9) * .6);
        labels.project(camera, Stage.host);
      },
    };
  });

  /* ============================================================
     קנה מידה — זום רציף החוצה. גלגלת העכבר מרחיקה, והיחסים
     נשמרים כל הדרך, כך שהתחושה של "כמה זה גדול" לא נשברת.
     ============================================================ */
  Stage.register('scale', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1.6, .01, 5000);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);
    lightRig(scene);

    // רדיוסים אמיתיים במטרים. הטווח הוא שמונה סדרי גודל,
    // ולכן לא מרימים מצלמה אלא מחשבים כל גוף מחדש לפי רוחב התצוגה.
    const R_EARTH = 6.371e6;
    const BODIES = [
      { n: 'הירח',          r: 1.737e6,  c: 0xc9cbd2, glow: 0x9aa0ad, lit: false },
      { n: 'כדור הארץ',     r: R_EARTH,  c: 0x2f7fd4, glow: 0x4aa8ff, lit: false },
      { n: 'צדק',           r: 6.991e7,  c: 0xd8a878, glow: 0xc09060, lit: false },
      { n: 'השמש',          r: 6.957e8,  c: 0xffb020, glow: 0xffa030, lit: true  },
      { n: 'סיריוס',        r: 1.19e9,   c: 0xd6e8ff, glow: 0x9fd0ff, lit: true  },
      { n: 'ארקטורוס',      r: 1.78e10,  c: 0xffb469, glow: 0xff9a40, lit: true  },
      { n: 'בטלגזה',        r: 5.32e11,  c: 0xff5528, glow: 0xff5a24, lit: true  },
      { n: 'סטפנסון 2-18',  r: 1.50e12,  c: 0xff3a18, glow: 0xff4418, lit: true  },
      { n: 'TON 618',       r: 1.95e14,  c: 0x05070d, glow: 0x000000, lit: false, hole: true },
    ];

    // כל גוף נבנה ברדיוס 1 ומוקטן/מוגדל בכל פריים
    const objs = BODIES.map(b => {
      const g = new THREE.Group();
      let core;
      if (b.hole) {
        core = new THREE.Mesh(new THREE.SphereGeometry(1, 56, 40), new THREE.MeshBasicMaterial({ color: 0x05070d }));
        g.add(core);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(1.22, .045, 12, 96),
          new THREE.MeshBasicMaterial({ color: 0xffd48a, transparent: true, opacity: .95, blending: THREE.AdditiveBlending, depthWrite: false }));
        ring.rotation.x = Math.PI / 2.1; g.add(ring);
        const disk = new THREE.Mesh(new THREE.RingGeometry(1.4, 3.6, 96, 1),
          new THREE.MeshBasicMaterial({ map: TEX_GLOW, color: 0xff9020, transparent: true, opacity: .5, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
        disk.rotation.x = -Math.PI / 2.4; g.add(disk);
        g.userData.disk = disk;
      } else if (b.lit) {
        const mat = M.glow(b.c, 1.1);
        mat.emissiveMap = TEX_SUN;
        mat.emissive = new THREE.Color(0xffffff);
        mat.color = new THREE.Color(b.c);
        core = new THREE.Mesh(new THREE.SphereGeometry(1, 56, 40), mat);
        g.add(core);
        const halo = new THREE.Sprite(new THREE.SpriteMaterial({
          map: TEX_GLOW, color: b.glow, transparent: true,
          blending: THREE.AdditiveBlending, depthWrite: false, opacity: .5,
        }));
        halo.scale.setScalar(4.2); g.add(halo);
      } else {
        core = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 34), M.paint(b.c, .85));
        g.add(core);
      }
      g.userData.core = core;
      g.visible = false;
      scene.add(g);
      return g;
    });

    const labels = Labeller();
    const L = BODIES.map(b => { const l = labels.add(b.n, new THREE.Vector3(), b.hole ? 'red' : 'blue'); l.shown = false; return l; });

    // z = log10 של רוחב התצוגה במטרים
    const Z_MIN = Math.log10(BODIES[0].r * 2.9);
    const Z_MAX = Math.log10(BODIES[BODIES.length - 1].r * 2.8);
    let z = Z_MIN, zT = Z_MIN, t = 0, host = null, dom = null;

    // חצי-רוחב התצוגה ביחידות עולם, במרחק מצלמה קבוע
    const VIEW = Math.tan(THREE.MathUtils.degToRad(42) / 2) * 10;

    function onWheel(e) {
      e.preventDefault();
      zT = THREE.MathUtils.clamp(zT + Math.sign(e.deltaY) * .12, Z_MIN, Z_MAX);
    }
    let px = 0, drag = false;
    const down = e => { drag = true; px = e.clientY; };
    const move = e => { if (!drag) return; zT = THREE.MathUtils.clamp(zT + (e.clientY - px) * .006, Z_MIN, Z_MAX); px = e.clientY; };
    const up = () => { drag = false; };

    return {
      scene, camera, labels,
      attachOrbitTo(el) {
        if (dom) {
          dom.removeEventListener('wheel', onWheel);
          dom.removeEventListener('pointerdown', down);
          dom.removeEventListener('pointermove', move);
        }
        dom = el;
        dom.addEventListener('wheel', onWheel, { passive: false });
        dom.addEventListener('pointerdown', down);
        dom.addEventListener('pointermove', move);
        window.addEventListener('pointerup', up);
        dom.style.cursor = 'ns-resize';
        dom.style.touchAction = 'none';
      },
      onEnter() { host = Stage.host; labels.mountTo(host); },
      get zoom() { return (z - Z_MIN) / (Z_MAX - Z_MIN); },
      // 0..1 לאורך כל הטווח
      setZoom(v) { zT = Z_MIN + THREE.MathUtils.clamp(v, 0, 1) * (Z_MAX - Z_MIN); },
      step(dir) { zT = THREE.MathUtils.clamp(zT + dir * (Z_MAX - Z_MIN) / 8, Z_MIN, Z_MAX); },
      // שם הגוף שהכי "ממלא" את המסך כרגע — לשימוש בטקסט שלצד הבמה
      // הגוף הגדול ביותר שנכנס כרגע בשלמותו — הוא "הכוכב של הרגע"
      get focus() {
        const half = Math.pow(10, z) / 2;
        let best = 0;
        BODIES.forEach((b, i) => { if (b.r / half <= .78) best = i; });
        return { i: best, name: BODIES[best].n };
      },
      update(dt) {
        t += dt;
        z += (zT - z) * Math.min(1, dt * 4);
        const half = Math.pow(10, z) / 2;       // חצי רוחב התצוגה במטרים
        const k = VIEW / half;                  // מטרים -> יחידות עולם

        // הגדול ביותר שנכנס בשלמותו תופס עד 0.78 מחצי-הגובה.
        // כל מה שגדול מזה פשוט עוד לא "הגיע התור שלו".
        const FIT = VIEW * .78;
        const FLOOR = -VIEW * .80;
        objs.forEach((g, i) => {
          const b = BODIES[i];
          const rr = b.r * k;
          const vis = rr > VIEW * .0035 && rr <= FIT;
          g.visible = vis;
          if (!vis) { L[i].shown = false; return; }
          g.scale.setScalar(rr);
          // כולם יושבים על אותו קו תחתון — ההשוואה מיידית
          g.position.set(0, FLOOR + rr, -i * .002);
          g.rotation.y += dt * .05 / Math.max(.12, rr / VIEW);
          if (g.userData.disk) g.userData.disk.rotation.z += dt * .35;
          // תווית רק למי שגדול מספיק כדי לזהות, וצמודה לראש הגוף
          L[i].shown = rr > VIEW * .028;
          L[i].pos.set(0, FLOOR + rr * 2 + VIEW * .07, 0);
        });
        labels.project(camera, host);
      },
    };
  });

  /* ============================================================
     והשמש שלנו? — מערכת שמש מיניאטורית שנוסעת בזמן
     ============================================================ */
  Stage.register('future', () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1.6, .1, 900);
    camera.position.set(0, 13, 24);
    lightRig(scene);

    const root = new THREE.Group(); scene.add(root);
    const ORIGIN = new THREE.Vector3(0, 0, 0);
    const lerp = THREE.MathUtils.lerp;
    const ease = u => u * u * (3 - 2 * u);
    const c01 = v => Math.max(0, Math.min(1, v));

    const AU = 7;          // יחידות תלת-ממד לכל יחידה אסטרונומית
    const GIANT_R = 5.6;   // הענק האדום כמעט נוגע במסלול כדור הארץ (רדיוס 7)
    const C_BURN = new THREE.Color(0xff9a3c);

    /* ---- ארבעת הפנימיים: המרחקים נכונים יחסית, הגדלים מוגזמים בכוונה ---- */
    const PDEF = [
      { n: 'כוכב חמה', au: .39,  r: .42, col: 0x9c948c, ph: .5 },
      { n: 'נוגה',      au: .72,  r: .60, col: 0xf0d49a, ph: 2.2 },
      { n: 'כדור הארץ', au: 1,    r: .68, col: 0x3f9bea, ph: 4.1 },
      { n: 'מאדים',     au: 1.52, r: .48, col: 0xd4653c, ph: 5.6 },
    ];
    const planets = PDEF.map(d => {
      const R = d.au * AU;
      const mat = new THREE.MeshStandardMaterial({
        color: d.col, emissive: new THREE.Color(d.col), emissiveIntensity: .4,
        roughness: .8, metalness: .05, transparent: true, opacity: 1,
      });
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(d.r, 30, 22), mat);
      root.add(mesh);
      // טבעת מסלול — בלעדיה קשה להבין מי מקיף את מי
      const pts = [];
      for (let k = 0; k <= 140; k++) {
        const a = k / 140 * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * R, 0, Math.sin(a) * R));
      }
      const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: 0x6aa6e0, transparent: true, opacity: .3, depthWrite: false }));
      root.add(ring);
      // הפנימיים מקיפים מהר יותר — בדיוק כמו במערכת האמיתית
      return { d, R, mesh, mat, ring, ang: d.ph, spd: .45 / d.au, burn: 0, col: new THREE.Color(d.col) };
    });
    const earth = planets[2];

    /* ---- סימון כדור הארץ: טבעת שתמיד פונה למצלמה ותמיד נראית ---- */
    const eRing = new THREE.Mesh(new THREE.RingGeometry(1.12, 1.3, 48),
      new THREE.MeshBasicMaterial({
        color: 0x4ab4ff, transparent: true, opacity: .85, side: THREE.DoubleSide,
        depthWrite: false, depthTest: false,
      }));
    eRing.renderOrder = 6;
    root.add(eRing);

    /* ---- השמש. רדיוס הגאומטריה 1, והסקייל הוא שמשתנה ---- */
    const sun = glowBall(1, 0xffd04a, 0xffb030, 1.25);
    sun.userData.core.material.transparent = true;
    // בלי כתיבה למאגר העומק — אחרת המעבר לננס הלבן נראה ככתם כהה
    sun.userData.core.material.depthWrite = false;
    sun.userData.core.renderOrder = 1;
    root.add(sun);

    /* ---- הננס הלבן: גוף נפרד שנחשף כשהשמש מתכווצת ---- */
    const dwarf = glowBall(1, 0xeaf6ff, 0xa8e0ff, 3, false);
    dwarf.userData.core.material.transparent = true;
    dwarf.userData.core.material.depthWrite = false;
    dwarf.userData.core.renderOrder = 2;
    dwarf.visible = false;
    root.add(dwarf);

    /* ---- קליפת הגז שנפרשת החוצה בסוף: טבעת רכה שמתרחבת ומתפוגגת ---- */
    const TEX_RING = radialTex([
      [0, 'rgba(255,160,80,0)'], [.62, 'rgba(255,150,70,.10)'],
      [.85, 'rgba(255,180,110,.95)'], [.97, 'rgba(255,140,70,.20)'], [1, 'rgba(255,120,50,0)'],
    ], 256);
    const shell = new THREE.Sprite(new THREE.SpriteMaterial({
      map: TEX_RING, color: 0xffb070, transparent: true,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0,
    }));
    shell.visible = false; root.add(shell);

    const PUFF_N = 520;
    const puffDir = [], puffPos = new Float32Array(PUFF_N * 3);
    for (let i = 0; i < PUFF_N; i++) {
      const th = Math.acos(2 * Math.random() - 1), ph = Math.random() * Math.PI * 2;
      puffDir.push(new THREE.Vector3(
        Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph) * .75, Math.cos(th)
      ).multiplyScalar(.78 + Math.random() * .42));
    }
    const puffGeo = new THREE.BufferGeometry();
    puffGeo.setAttribute('position', new THREE.BufferAttribute(puffPos, 3));
    const puff = new THREE.Points(puffGeo, new THREE.PointsMaterial({
      size: 1.5, map: TEX_SPARK, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, color: 0xffb066, opacity: 0, sizeAttenuation: true,
    }));
    puff.frustumCulled = false; puff.visible = false;
    root.add(puff);

    /* ---- ענן הלידה: הגז והאבק שמהם נבנתה כל המערכת ---- */
    const CN = 760;
    const cHome = new Float32Array(CN * 3);
    const cPos = new Float32Array(CN * 3);
    for (let i = 0; i < CN; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2 + 11 * Math.pow(Math.random(), .55);
      cHome[i * 3] = Math.cos(a) * r;
      cHome[i * 3 + 1] = (Math.random() - .5) * 5 * Math.max(.15, 1 - r / 15);
      cHome[i * 3 + 2] = Math.sin(a) * r;
    }
    cPos.set(cHome);
    const cloudGeo = new THREE.BufferGeometry();
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3));
    const cloud = new THREE.Points(cloudGeo, new THREE.PointsMaterial({
      size: 2.3, map: TEX_DUST, transparent: true, depthWrite: false,
      color: 0x9d8fd0, opacity: 0, sizeAttenuation: true,
    }));
    cloud.frustumCulled = false; cloud.visible = false;
    root.add(cloud);

    /* ---- קו ההשוואה בין הננס הלבן לכדור הארץ ---- */
    const cmp = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
      new THREE.LineBasicMaterial({ color: 0x7fe0b0, transparent: true, opacity: 0, depthWrite: false })
    );
    cmp.visible = false; root.add(cmp);

    /* ---- תוויות ---- */
    const labels = Labeller();
    const lSun = labels.add('', new THREE.Vector3(), 'yellow');
    const lEarth = labels.add('כדור הארץ', new THREE.Vector3(), 'blue');
    const lMerc = labels.add('כוכב חמה', new THREE.Vector3(), 'sm');
    const lVen = labels.add('נוגה', new THREE.Vector3(), 'sm');
    const lCmp = labels.add('אותו גודל!', new THREE.Vector3(), 'green sm');
    lCmp.shown = false;

    /* ---- ארבע נקודות הזמן. כל שורה = איך נראה הסוף של אותו שלב ---- */
    const STATES = [
      { dur: 4.4, mode: 'birth', name: 'השמש נדלקת', sub: 'כוכב חדש',
        sunR: 1.05, ei: .92, emis: 0xffc070, haloK: 4.2, haloOp: .6, halo: 0xffa838,
        dwarf: 0, form: 1, cloud: .34, dist: 33, earth: 0x3f9bea, eat: [0, 0, 0, 0] },
      { dur: 2.8, mode: 'plain', name: 'השמש היום', sub: 'צהובה ורגועה',
        sunR: 1.3, ei: 1.05, emis: 0xffdf9a, haloK: 4.4, haloOp: .66, halo: 0xffb030,
        dwarf: 0, form: 1, cloud: 0, dist: 28, earth: 0x3f9bea, eat: [0, 0, 0, 0] },
      { dur: 5.4, mode: 'grow', name: 'ענק אדום', sub: 'בלעה את חמה ואת נוגה',
        sunR: GIANT_R, ei: .5, emis: 0xff5f2c, haloK: 2.25, haloOp: .45, halo: 0xff5a2a,
        dwarf: 0, form: 1, cloud: 0, dist: 30, earth: 0xc2612a, eat: [1, 1, 0, 0] },
      { dur: 5.4, mode: 'puff', name: 'ננס לבן', sub: 'בגודל כדור הארץ',
        sunR: .68, ei: .9, emis: 0xffd0a0, haloK: 3, haloOp: .12, halo: 0xffc070,
        dwarf: 1, form: 1, cloud: 0, dist: 27, earth: 0x9a8b80, eat: [1, 1, 0, 0] },
    ];
    // נקודת הפתיחה של השלב הראשון: עוד אין שמש, רק ענן
    const SEED0 = { name: 'ענן גז ואבק', sub: 'עוד אין שמש',
      sunR: .05, ei: .35, emis: 0xff6a20, haloK: 3, haloOp: .06, halo: 0xff7a30,
      dwarf: 0, form: 0, cloud: 1, dist: 36, earth: 0x3f9bea, eat: [0, 0, 0, 0] };

    [SEED0].concat(STATES).forEach(s => {
      s.emisC = new THREE.Color(s.emis);
      s.haloC = new THREE.Color(s.halo);
      s.earthC = new THREE.Color(s.earth);
    });
    function cloneP(s) {
      return {
        name: s.name, sub: s.sub, sunR: s.sunR, ei: s.ei, haloK: s.haloK, haloOp: s.haloOp,
        dwarf: s.dwarf, form: s.form, cloud: s.cloud, dist: s.dist,
        emisC: s.emisC.clone(), haloC: s.haloC.clone(), earthC: s.earthC.clone(), eat: s.eat.slice(),
      };
    }
    const seedOf = i => cloneP(i === 0 ? SEED0 : STATES[i - 1]);

    const live = cloneP(STATES[1]);
    let from = cloneP(STATES[0]);
    let cur = 1, since = 99, t = 0, orbit = null;
    const tmpV = new THREE.Vector3(), tmpV2 = new THREE.Vector3();

    function select(i) {
      i = Math.max(0, Math.min(STATES.length - 1, i));
      // אין יציאה מוקדמת: לחיצה חוזרת חייבת להריץ את האנימציה מחדש
      const smooth = (i === cur + 1);
      from = smooth ? cloneP(live) : seedOf(i);
      if (!smooth) planets.forEach((p, k) => { p.burn = from.eat[k]; });
      cur = i; since = 0;
      if (orbit) orbit.focus(ORIGIN, STATES[i].dist);
    }

    return {
      scene, camera, labels,
      count: STATES.length,
      get index() { return cur; },
      attachOrbitTo(dom) {
        if (orbit) orbit.dispose();
        orbit = attachOrbit(camera, dom, new THREE.Vector3(0, 0, 0), { minR: 12, maxR: 80, autoRot: .06, maxPol: Math.PI - .3 });
        this.orbit = orbit;
        // מבט מלמעלה-באלכסון: כך המסלולים נקראים והענק האדום לא מסתיר את כדור הארץ
        orbit.state.tPol = .40;
        orbit.focus(ORIGIN, STATES[cur].dist);
      },
      onEnter() { labels.mountTo(Stage.host); },
      select,
      update(dt) {
        t += dt; since += dt;
        const S = STATES[cur];
        const u = c01(since / S.dur), e = ease(u);

        /* ---- ערכי הביניים: הכול נגזר מהזמן שעבר מאז הבחירה ---- */
        let sunR;
        if (S.mode === 'puff') {
          // קודם הקליפה נפרשת, ורק אחר כך הליבה מתכווצת
          sunR = lerp(from.sunR, S.sunR, ease(c01((u - .10) / .70)));
        } else {
          sunR = lerp(from.sunR, S.sunR, e);
        }
        const ei = lerp(from.ei, S.ei, e);
        const haloK = lerp(from.haloK, S.haloK, e);
        const haloOp = lerp(from.haloOp, S.haloOp, e);
        const form = lerp(from.form, S.form, e);
        const cloudA = lerp(from.cloud, S.cloud, e);
        const dist = lerp(from.dist, S.dist, e);
        const dwarfMix = S.mode === 'puff'
          ? lerp(from.dwarf, S.dwarf, ease(c01((u - .48) / .32)))
          : lerp(from.dwarf, S.dwarf, e);
        live.sunR = sunR; live.ei = ei; live.haloK = haloK; live.haloOp = haloOp;
        live.form = form; live.cloud = cloudA; live.dist = dist; live.dwarf = dwarfMix;
        live.emisC.copy(from.emisC).lerp(S.emisC, e);
        live.haloC.copy(from.haloC).lerp(S.haloC, e);
        live.earthC.copy(from.earthC).lerp(S.earthC, e);
        live.eat = S.eat.slice();
        live.name = u < .4 ? from.name : S.name;
        live.sub = u < .4 ? from.sub : S.sub;

        // הבזק ההידלקות
        const flash = S.mode === 'birth' ? Math.max(0, 1 - Math.abs(u - .42) / .16) : 0;

        /* ---- השמש ---- */
        const sMat = sun.userData.core.material;
        TEX_SUN.offset.x += dt * .006;
        sun.userData.core.rotation.y += dt * .06;
        sun.userData.core.scale.setScalar(sunR * (1 + Math.sin(t * 1.6) * .012));
        sMat.emissive.copy(live.emisC);
        sMat.color.copy(live.emisC);
        sMat.emissiveIntensity = ei + flash * 3.2;
        sMat.opacity = 1 - dwarfMix;
        sun.userData.halo.material.color.copy(live.haloC);
        sun.userData.halo.material.opacity = (haloOp + flash * .5) * (1 - dwarfMix);
        sun.userData.halo.scale.setScalar(sunR * haloK * (1 + flash * .6));
        sun.visible = dwarfMix < .995 && sunR > .02;

        /* ---- הננס הלבן ---- */
        dwarf.visible = dwarfMix > .005;
        if (dwarf.visible) {
          dwarf.userData.core.scale.setScalar(sunR);
          dwarf.userData.core.material.opacity = dwarfMix;
          dwarf.userData.core.material.emissiveIntensity = 3;
          dwarf.userData.halo.material.opacity = dwarfMix * (.75 + Math.sin(t * 3) * .12);
          dwarf.userData.halo.scale.setScalar(sunR * 6);
        }

        /* ---- קליפת הגז שנפרשת ---- */
        if (S.mode === 'puff') {
          const q = c01(u / .82);
          const rr = lerp(GIANT_R * .95, 12.5, 1 - Math.pow(1 - q, 1.8));
          shell.visible = q < .999;
          shell.scale.setScalar(Math.max(.01, rr * 2.35));
          shell.material.opacity = .8 * Math.pow(1 - q, 1.6);
          puff.visible = shell.visible;
          const a = puffGeo.attributes.position.array;
          for (let i = 0; i < PUFF_N; i++) {
            a[i * 3] = puffDir[i].x * rr;
            a[i * 3 + 1] = puffDir[i].y * rr;
            a[i * 3 + 2] = puffDir[i].z * rr;
          }
          puffGeo.attributes.position.needsUpdate = true;
          puff.material.opacity = .85 * Math.pow(1 - q, 1.4);
        } else {
          shell.visible = false; puff.visible = false;
        }

        /* ---- ענן הלידה ---- */
        cloud.visible = cloudA > .02;
        if (cloud.visible) {
          const shrink = .45 + cloudA * .55;
          const a = cloudGeo.attributes.position.array;
          const sp = t * .1;
          for (let i = 0; i < CN; i++) {
            const hx = cHome[i * 3], hy = cHome[i * 3 + 1], hz = cHome[i * 3 + 2];
            const ca = Math.cos(sp), sa = Math.sin(sp);
            a[i * 3] = (hx * ca - hz * sa) * shrink;
            a[i * 3 + 1] = hy * shrink;
            a[i * 3 + 2] = (hx * sa + hz * ca) * shrink;
          }
          cloudGeo.attributes.position.needsUpdate = true;
          cloud.material.opacity = cloudA * .6;
        }

        /* ---- כוכבי הלכת: מקיפים תמיד, גם באמצע מעבר ---- */
        const settle = 1 + (1 - ease(form)) * .28;
        planets.forEach((p, i) => {
          p.ang += p.spd * dt;
          const want = S.eat[i];
          if (want > p.burn) {
            // בשלב הענק הבליעה קורית בדיוק כשפני השמש מגיעים למסלול
            const reached = S.mode === 'grow' ? (sunR > p.R * .90) : (u > .12);
            if (reached) p.burn = Math.min(1, p.burn + dt * 1.4);
          } else if (want < p.burn) {
            p.burn = Math.max(0, p.burn - dt * 1.2);
          }
          const b = p.burn;
          const rr = p.R * settle;
          p.mesh.position.set(Math.cos(p.ang) * rr, (1 - ease(form)) * Math.sin(p.ang * 3 + i) * .9, Math.sin(p.ang) * rr);
          p.mesh.rotation.y += dt * .6;
          p.mesh.scale.setScalar(Math.max(.02, 1 - b * .7));
          p.mesh.visible = b < .99 && form > .02;
          const base = (i === 2) ? live.earthC : p.col;
          p.mat.color.copy(base).lerp(C_BURN, b * .85);
          p.mat.emissive.copy(base).lerp(C_BURN, b);
          p.mat.emissiveIntensity = .4 + b * 2.6;
          p.mat.opacity = form * (1 - b);
          p.ring.material.opacity = form * (.3 - b * .2);
          p.ring.material.color.setHex(b > .5 ? 0x8a6a5a : 0x6aa6e0);
          p.ring.visible = form > .04;
        });

        /* ---- הסימון של כדור הארץ ---- */
        eRing.position.copy(earth.mesh.position);
        eRing.lookAt(camera.position);
        eRing.scale.setScalar(1 + Math.sin(t * 2.2) * .07);
        eRing.material.opacity = form * .85;
        eRing.visible = form > .05;

        /* ---- קו ההשוואה ננס-לבן / כדור הארץ ---- */
        const showCmp = dwarfMix > .7;
        cmp.visible = showCmp;
        if (showCmp) {
          const a = cmp.geometry.attributes.position.array;
          a[0] = 0; a[1] = 0; a[2] = 0;
          a[3] = earth.mesh.position.x; a[4] = earth.mesh.position.y; a[5] = earth.mesh.position.z;
          cmp.geometry.attributes.position.needsUpdate = true;
          cmp.material.opacity = (dwarfMix - .7) / .3 * .55;
        }

        /* ---- מצלמה: מתאימה את עצמה לגודל הנוכחי ---- */
        if (orbit && u < 1) orbit.focus(ORIGIN, dist);

        /* ---- תוויות ---- */
        // "מעלה" של המסך בעולם — כך התווית תמיד יושבת מעל הגוף ולא עליו
        const up = tmpV.set(0, 1, 0).applyQuaternion(camera.quaternion);
        lSun.el.innerHTML = live.name + '<small>' + live.sub + '</small>';
        // תווית השמש יושבת תמיד בצד ההפוך לכדור הארץ — כך השתיים לא נדרסות
        lSun.pos.copy(tmpV2.copy(earth.mesh.position).setY(0).normalize())
          .multiplyScalar(-(Math.max(sunR, 1.7) + 2.6)).addScaledVector(up, -1.5);
        lEarth.pos.copy(earth.mesh.position).multiplyScalar(1.18).addScaledVector(up, .9);
        lEarth.shown = form > .5;
        // חמה ונוגה מסומנים רק כשהם רלוונטיים — אחרת הבמה מתמלאת בתוויות
        const inner = (cur === 1 || cur === 2);
        lMerc.pos.copy(planets[0].mesh.position).multiplyScalar(1.45).addScaledVector(up, 1.2);
        lMerc.shown = inner && form > .6 && planets[0].burn < .3;
        lVen.pos.copy(planets[1].mesh.position).multiplyScalar(1.25).addScaledVector(up, 1.2);
        lVen.shown = inner && form > .6 && planets[1].burn < .3;
        lCmp.shown = showCmp;
        lCmp.pos.set(earth.mesh.position.x * .5, .9, earth.mesh.position.z * .5);
        labels.project(camera, Stage.host);
      },
    };
  });

  global.Stage3D = Stage;
})(window);
