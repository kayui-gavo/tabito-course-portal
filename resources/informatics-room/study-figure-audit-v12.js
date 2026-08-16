/* 情報Ⅰ v13 — 47PART専用図版カバレッジ監査 */
(() => {
  const mainIds=(window.STUDY_MAIN||[]).map(x=>x.id);
  const registry=new Set(Object.keys(window.SCIENTIFIC_FIGURES_V12||{}));
  const covered=mainIds.filter(id=>registry.has(id));
  const missing=mainIds.filter(id=>!registry.has(id));
  const unexpected=[...registry].filter(id=>!mainIds.includes(id));
  const report={mainCount:mainIds.length,registryCount:registry.size,coveredCount:covered.length,missing,unexpected,legacyMigrated:window.SCIENTIFIC_LEGACY_MIGRATED_V13||[]};
  window.INFORMATION_FIGURE_AUDIT_V12=report;
  if(mainIds.length!==47||covered.length!==47||missing.length||unexpected.length)console.warn('[情報Ⅰ 図版監査 v13]',report);
})();