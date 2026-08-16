/* 情報Ⅰ v14 — QAで検出した図中文字衝突の局所修正 */
(() => {
  const config=window.SCIENTIFIC_FIGURES_V12?.['b3-7'];
  if(!config||typeof config.draw!=='function')return;
  const draw=config.draw;
  config.draw=(ctx,k)=>{
    const text=k.text;
    const patched={...k,text(c,s,x,y,...rest){
      // ランレングス4組目の「100」と右側の「16 bit」が3pxだけ接触していた。
      if(s==='16 bit'&&x===1090&&y===355)x=1150;
      return text(c,s,x,y,...rest);
    }};
    return draw(ctx,patched);
  };
})();