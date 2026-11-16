// Every Hebrew string a lesson step shows, for niqqud and for translation.
const fs = require('fs'), vm = require('vm');
const HUB = require('path').join(__dirname, '..', '..', 'hub') + '/';
const ctx = { console, setTimeout, fetch: () => Promise.reject(), localStorage: { getItem: () => null, setItem(){} } };
ctx.window = ctx; ctx.document = { createElement: () => ({ getContext: () => ({}), style: {} }), head: { appendChild(){} }, querySelector: () => null, addEventListener(){} };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(HUB + 'content.js', 'utf8'), ctx);
const H = ctx.HUB, out = [];
const add = (n, i, f, s) => { if (typeof s === 'string' && /[\u0590-\u05ff]/.test(s)) out.push({ n, i, f, s }); };
for (const n of Object.keys(H.LESSONS)) {
  const L = H.LESSONS[n];
  add(n, -1, 'title', L.title); add(n, -1, 'unit', L.unit);
  (L.stations || []).forEach((s, k) => add(n, -1, 'station' + k, s[0]));
  Object.entries(L.groups || {}).forEach(([k, v]) => add(n, -1, 'group.' + k, v));
  L.steps.forEach((s, i) => {
    ['title', 'body', 'expect', 'note', 'tab'].forEach(f => add(n, i, f, s[f]));
    (s.hints || []).forEach((h, k) => add(n, i, 'hint' + k, h));
    (s.stuck || []).forEach(([q, a], k) => { add(n, i, 'stuckq' + k, q); add(n, i, 'stucka' + k, a); });
  });
  (L.challenges || []).forEach(c => { add(n, -2, 'ch.' + c.id + '.t', c.t); add(n, -2, 'ch.' + c.id + '.d', c.d); });
}
fs.writeFileSync(process.argv[2], JSON.stringify(out, null, 0));
console.log(out.length, 'strings', out.reduce((a, x) => a + x.s.length, 0), 'chars');
