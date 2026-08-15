/* 情報Ⅰ v12 — 47PART専用図版カバレッジ監査 */
(() => {
  const mainIds=(window.STUDY_MAIN||[]).map(x=>x.id);
  const v12=new Set(Object.keys(window.SCIENTIFIC_FIGURES_V12||{}));
  const v11Main=new Set(['b3-4','b5-1','b5-3','b6-1','b8-1','b8-2','b8-3','b8-5','b8-7','b9-4']);
  const covered=mainIds.filter(id=>v12.has(id)||v11Main.has(id));
  const missing=mainIds.filter(id=>!v12.has(id)&&!v11Main.has(id));
  const duplicate=mainIds.filter(id=>v12.has(id)&&v11Main.has(id));
  const report={mainCount:mainIds.length,v12Count:v12.size,v11MainCount:v11Main.size,coveredCount:covered.length,missing,duplicate};
  window.INFORMATION_FIGURE_AUDIT_V12=report;
  if(mainIds.length!==47||covered.length!==47||missing.length||duplicate.length) console.warn('[情報Ⅰ 図版監査 v12]',report);
})();