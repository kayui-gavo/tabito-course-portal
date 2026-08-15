/* 情報Ⅰ＜プログラミング編＞ v12 — 高価値講の図版カバレッジ監査 */
(() => {
  const first=new Set(['p39','p44','p46','p47','p48']);
  const second=new Set(['p29','p40','p41','p42','p43','p45']);
  const third=new Set(['p30','p31','p32','p33','p34','p35','p36','p37','p38']);
  const expected=[...third,...second,...first];
  const all=new Set([...first,...second,...third]);
  const missing=expected.filter(id=>!all.has(id));
  const duplicate=expected.filter((id,i)=>expected.indexOf(id)!==i);
  const report={expectedCount:expected.length,firstFigureCount:window.PROGRAM_FIGURE_V12_COUNT||0,secondFigureCount:window.PROGRAM_FIGURE_V12B_COUNT||0,thirdFigureCount:window.PROGRAM_FIGURE_V12C_COUNT||0,interactiveThirdCount:window.PROGRAM_FIGLAB_V12C_COUNT||0,coveredCount:all.size,missing,duplicate};
  window.INFORMATION_PROGRAM_FIGURE_AUDIT_V12=report;
  if(report.firstFigureCount!==5||report.secondFigureCount!==6||report.thirdFigureCount!==9||all.size!==20||missing.length||duplicate.length) console.warn('[情報Ⅰ プログラミング図版監査 v12]',report);
})();