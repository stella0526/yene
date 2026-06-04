/* ═══════════════════════════════════════
   Yene Cart — localStorage 기반 장바구니
═══════════════════════════════════════ */
(function () {
  const KEY = 'yene_cart';

  /* ── 기본 CRUD ── */
  function getCart() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }
  function saveCart(cart) {
    localStorage.setItem(KEY, JSON.stringify(cart));
  }
  window.YeneCart = {
    get: getCart,
    add: function (item) {
      var cart = getCart();
      var found = cart.find(function (c) { return c.id === item.id; });
      if (found) { found.qty += (item.qty || 1); }
      else { cart.push(Object.assign({ qty: 1 }, item)); }
      saveCart(cart);
      updateBadge();
    },
    remove: function (id) {
      saveCart(getCart().filter(function (c) { return c.id !== id; }));
      updateBadge();
    },
    setQty: function (id, qty) {
      var cart = getCart();
      var item = cart.find(function (c) { return c.id === id; });
      if (item) { item.qty = qty; saveCart(cart); updateBadge(); }
    },
    clear: function () { saveCart([]); updateBadge(); },
    count: function () {
      return getCart().reduce(function (s, c) { return s + (c.qty || 1); }, 0);
    }
  };

  /* ── 헤더 배지 업데이트 ── */
  function updateBadge() {
    var count = window.YeneCart.count();
    var link = document.querySelector('.header-actions a[aria-label*="장바구니"]');
    if (!link) return;
    var badge = link.querySelector('.cart-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-badge';
      badge.setAttribute('aria-hidden', 'true');
      link.appendChild(badge);
    }
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
    link.setAttribute('aria-label', '장바구니' + (count > 0 ? ' (' + count + '개)' : ''));
  }

  document.addEventListener('DOMContentLoaded', updateBadge);
})();
