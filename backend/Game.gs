/* ============================================================
   Game.gs — Pure game logic
   ============================================================ */

function calcLevel(stars, starsPerLevel, maxLevel) {
  starsPerLevel = starsPerLevel || 100;
  maxLevel = maxLevel || 200;
  return Math.min(maxLevel, Math.floor(stars / starsPerLevel) + 1);
}

function awardCoins(currentCoins, delta) {
  return Math.max(0, currentCoins + delta);
}

function awardStars(currentStars, delta) {
  return currentStars + Math.max(0, delta);
}

function validateBuy(student, item, inventory, config) {
  var coins = parseInt(student.coins) || 0;
  var stars = parseInt(student.stars) || 0;
  var price = parseInt(item.price_coins) || 0;
  var reqLevel = parseInt(item.required_level) || 1;
  var level = calcLevel(stars, parseInt(config.stars_per_level) || 100, parseInt(config.max_level) || 200);

  var owned = inventory.some(function(inv) { return inv.item_id === item.id; });
  if (owned) return { ok: false, error: 'Already owned' };
  if (level < reqLevel) return { ok: false, error: 'Level too low (need ' + reqLevel + ')' };
  if (coins < price) return { ok: false, error: 'Not enough coins (need ' + price + ')' };
  return { ok: true };
}
