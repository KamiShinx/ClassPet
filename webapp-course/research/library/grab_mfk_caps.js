// Paste into the browser pane (javascript_tool) on any youtube.com/watch page. For "made for kids" videos yt-dlp
// can't fetch. Patches fetch/XHR, reloads the caption module per video so the player re-requests its (token-signed)
// timedtext, and parses the json3 into caps-format text in window.__out[id]. Read it back in chunks.
// Change LANG to 'iw' for the Hebrew track.
const ids = [/* 'Dxcc6ycZ73M', ... */], LANG = 'en';
window.__caps = [];
if (!window.__patched) { window.__patched = true;
  const of = window.fetch; window.fetch = async function(...a) { const r = await of.apply(this, a); try { const u = (a[0]?.url || a[0] || '') + ''; if (u.includes('timedtext')) r.clone().text().then(t => window.__caps.push([u, t])); } catch(e){} return r; };
  const oo = XMLHttpRequest.prototype.open; XMLHttpRequest.prototype.open = function(m, u) { this.__u = u; return oo.apply(this, arguments); };
  const os = XMLHttpRequest.prototype.send; XMLHttpRequest.prototype.send = function() { this.addEventListener('load', () => { if ((this.__u+'').includes('timedtext')) window.__caps.push([this.__u, this.responseText]); }); return os.apply(this, arguments); };
}
const f = t => `${Math.floor(t/3600)}:${String(Math.floor(t%3600/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`;
const parse = raw => { const j = JSON.parse(raw); const out = []; let ct = null, cur = [];
  for (const ev of j.events || []) { if (!ev.segs) continue; const s = ev.segs.map(x => x.utf8).join('').replace(/\s+/g,' ').trim(); if (!s) continue;
    const t = Math.floor(ev.tStartMs/1000); if (ct === null) ct = t; cur.push(s); if (t - ct >= 30) { out.push(`[${f(ct)}] ${cur.join(' ')}`); ct = null; cur = []; } }
  if (cur.length) out.push(`[${f(ct||0)}] ${cur.join(' ')}`); return out.join('\n'); };
const mp = document.querySelector('#movie_player'); window.__out = {}; const res = [];
for (const id of ids) {
  window.__caps = []; mp.loadVideoById(id); await new Promise(r => setTimeout(r, 4000));
  mp.unloadModule('captions'); await new Promise(r => setTimeout(r, 500)); mp.loadModule('captions'); mp.setOption('captions', 'track', {languageCode: LANG});
  let hit; for (let k = 0; k < 16 && !hit; k++) { await new Promise(r => setTimeout(r, 500)); hit = window.__caps.find(([u, t]) => u.includes('v=' + id) && t.length > 100); }
  if (!hit) { res.push([id, 'MISS']); continue; }
  const d = mp.getVideoData(), dur = mp.getDuration();
  window.__out[id] = `# ${d.title}\n# channel: ${d.author} | id: ${id} | ${(dur/60).toFixed(1)} min | source: YouTube captions (browser)\n\n${parse(hit[1])}\n`;
  res.push([id, d.title, window.__out[id].length]);
}
mp.pauseVideo(); res
