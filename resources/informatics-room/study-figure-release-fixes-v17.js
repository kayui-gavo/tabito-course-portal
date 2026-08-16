/* 情報Ⅰ v17 — 図版リリース前の局所修正 */
(() => {
  const K=window.SCIENTIFIC_V12;
  const cfg=K?.registry?.['b5-2'];
  if(!cfg||typeof cfg.draw!=='function')return;
  const original=cfg.draw;
  cfg.draw=(ctx,k)=>{
    const originalBox=k.box;
    return original(ctx,{
      ...k,
      box(c,x,y,w,h,title,body='',opt={}){
        return originalBox(c,x,y,w,h,title==='デバイス\nドライバ'?'デバイスドライバ':title,body,opt);
      }
    });
  };
})();