/* 情報Ⅰ v17 Chapter 5 targeted figure fix */
(() => {
  const K = window.SCIENTIFIC_V12;
  const cfg = K?.registry?.['b5-2'];
  if (!cfg || typeof cfg.draw !== 'function') return;
  const original = cfg.draw;
  cfg.draw = (ctx, k) => {
    const originalBox = k.box;
    const patched = {
      ...k,
      box(c, x, y, w, h, title, body = '', opt = {}) {
        const safeTitle = title === 'デバイス\nドライバ' ? 'デバイスドライバ' : title;
        return originalBox(c, x, y, w, h, safeTitle, body, opt);
      }
    };
    return original(ctx, patched);
  };
})();