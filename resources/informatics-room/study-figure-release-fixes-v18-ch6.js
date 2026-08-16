/* 情報Ⅰ v18 — 第6講 図版リリース前の局所修正 */
(() => {
  const K=window.SCIENTIFIC_V12;
  const cfg=K?.registry?.['b6-7'];
  if(!cfg||typeof cfg.draw!=='function')return;
  const original=cfg.draw;
  cfg.draw=(ctx,k)=>{
    const originalText=k.text;
    return original(ctx,{
      ...k,
      text(c,s,x,y,...rest){
        if(s==='比較：6 > 1 → 交換') return originalText(c,s,545,y,...rest);
        return originalText(c,s,x,y,...rest);
      }
    });
  };
})();