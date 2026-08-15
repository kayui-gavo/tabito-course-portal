/* 情報Ⅰ＜プログラミング編＞ v12 — 高価値講の図版カバレッジ監査 */
(() => {
  const expected=['p29','p39','p40','p41','p42','p43','p44','p45','p46','p47','p48'];
  const first=new Set(['p39','p44','p46','p47','p48']);
  const second=new Set(['p29','p40','p41','p42','p43','p45']);
  const missing=expected.filter(id=>!first.has(id)&&!second.has(id));
  const report={expectedCount:expected.length,firstFigureCount:window.PROGRAM_FIGURE_V12_COUNT||0,secondFigureCount:window.PROGRAM_FIGURE_V12B_COUNT||0,coveredCount:expected.length-missing.length,missing};
  window.INFORMATION_PROGRAM_FIGURE_AUDIT_V12=report;
  if(report.firstFigureCount!==5||report.secondFigureCount!==6||missing.length) console.warn('[情報Ⅰ プログラミング図版監査 v12]',report);
})();