/* ============================================================
   pet-render.js — Pet + world rendering
   ============================================================ */

function renderPetView(container, studentState, shopItems) {
  var equipped = studentState.equipped_items || [];
  var hasBgStars = equipped.indexOf('bg_stars') !== -1;

  var skyGradient = hasBgStars
    ? 'linear-gradient(180deg, #0c1445 0%, #1a237e 40%, #283593 100%)'
    : 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 60%, #E0F7FA 100%)';

  var starsHtml = '';
  if (hasBgStars) {
    for (var i = 0; i < 20; i++) {
      var x = Math.floor(Math.random() * 95);
      var y = Math.floor(Math.random() * 50);
      var size = Math.random() > 0.7 ? 3 : 2;
      starsHtml += '<div style="position:absolute;left:' + x + '%;top:' + y + '%;width:' + size + 'px;height:' + size + 'px;background:#fff;border-radius:50%;opacity:' + (0.5 + Math.random() * 0.5).toFixed(2) + ';"></div>';
    }
  }

  var html = '<div class="pet-world" style="position:relative;width:100%;height:100%;overflow:hidden;background:' + skyGradient + ';">';

  if (hasBgStars) html += starsHtml;

  // Sun or moon
  if (!hasBgStars) {
    html += '<div style="position:absolute;top:8px;left:8px;font-size:1.8rem;">\u2600\uFE0F</div>';
  } else {
    html += '<div style="position:absolute;top:8px;left:8px;font-size:1.5rem;">\uD83C\uDF19</div>';
  }

  // Speech bubble
  html += '<div class="speech-bubble" id="petSpeech"></div>';

  // Pet container
  html += '<div class="pet-container" style="position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;">';

  // Collect equipped cosmetics (excluding background)
  var itemsOn = [];
  if (shopItems) {
    equipped.forEach(function(itemId) {
      if (itemId === 'bg_stars') return;
      var item = shopItems.find(function(si) { return si.id === itemId; });
      if (item) itemsOn.push(item);
    });
    itemsOn.sort(function(a, b) { return (a.layer_z || 0) - (b.layer_z || 0); });
  }

  // The egg pet
  html += '<div class="pet-egg-wrapper" id="petEgg" style="position:relative;width:60px;height:76px;">';
  html += '<div style="width:60px;height:76px;background:#fff;border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;border:3px solid var(--lcd-dark);position:relative;animation:eggJump 2s ease-in-out infinite;box-shadow:inset -4px -6px 12px rgba(0,0,0,0.1);">';
  html += '<div style="position:absolute;top:14px;left:8px;width:12px;height:12px;background:var(--egg);border-radius:50%;opacity:0.8;"></div>';
  html += '<div style="position:absolute;bottom:16px;right:10px;width:8px;height:8px;background:var(--candy-blue);border-radius:50%;opacity:0.8;"></div>';
  html += '<div style="position:absolute;top:22px;right:12px;width:6px;height:6px;background:var(--candy-yellow);border-radius:50%;opacity:0.6;"></div>';
  html += '<div style="position:absolute;top:30%;left:50%;transform:translateX(-50%);font-size:0.6rem;color:var(--lcd-dark);font-family:monospace;white-space:nowrap;">\u25CF\u203F\u25CF</div>';
  html += '</div>';

  // Equipped cosmetics layered on pet
  itemsOn.forEach(function(item) {
    html += '<div class="cosmetic" style="position:absolute;z-index:' + (item.layer_z || 0) + ';top:' + (item.offset_y || 0) + 'px;left:50%;transform:translateX(-50%);margin-left:' + (item.offset_x || 0) + 'px;font-size:1.8rem;pointer-events:none;filter:drop-shadow(1px 1px 1px rgba(0,0,0,0.2));">' + (item.emoji || '') + '</div>';
  });

  html += '</div>'; // pet-egg-wrapper
  html += '</div>'; // pet-container

  // Grass floor
  html += '<div style="position:absolute;bottom:0;left:0;right:0;height:40px;background:linear-gradient(180deg,#4CAF50 0%,#388E3C 100%);border-top:3px solid #2E7D32;"></div>';
  html += '<div style="position:absolute;bottom:32px;left:15%;font-size:0.8rem;">\uD83C\uDF3F</div>';
  html += '<div style="position:absolute;bottom:34px;right:20%;font-size:0.7rem;">\uD83C\uDF3F</div>';

  html += '</div>'; // pet-world

  container.innerHTML = html;
  startSpeechBubbleCycle();
}

var speechTimer;
function startSpeechBubbleCycle() {
  clearInterval(speechTimer);
  showRandomSpeech();
  speechTimer = setInterval(showRandomSpeech, 15000);
}

function showRandomSpeech() {
  var bubble = document.getElementById('petSpeech');
  if (!bubble) return;
  bubble.textContent = randomEncouragement();
  bubble.style.display = 'block';
  bubble.style.animation = 'none';
  bubble.offsetHeight;
  bubble.style.animation = 'bubblePop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards';
  setTimeout(function() {
    if (bubble) bubble.style.animation = 'bubbleFadeOut 0.4s forwards';
  }, 4000);
}

function petJumpAnimation() {
  var egg = document.getElementById('petEgg');
  if (!egg) return;
  egg.style.animation = 'none';
  egg.offsetHeight;
  egg.style.animation = 'petJump 0.5s ease-out';
  setTimeout(function() { if (egg) egg.style.animation = ''; }, 500);
}
