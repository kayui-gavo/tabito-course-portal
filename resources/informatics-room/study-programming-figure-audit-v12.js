/* 情報Ⅰ＜プログラミング編＞ v12 — 中級以降の図版カバレッジ監査 */
(() => {
  const setA=new Set(['p39','p44','p46','p47','p48']);
  const setB=new Set(['p29','p40','p41','p42','p43','p45']);
  const setC=new Set(['p30','p31','p32','p33','p34','p35','p36','p37','p38']);
  const setD=new Set(['p15','p16','p17','p18','p19','p20','p21']);
  const setE=new Set(['p22','p23','p24','p25','p26','p27','p28']);
  const expected=Array.from({length:34},(_,i)=>`p${i+15}`);
  const all=new Set([...setA,...setB,...setC,...setD,...setE]);
  const missing=expected.filter(id=>!all.has(id));
  const unexpected=[...all].filter(id=>!expected.includes(id));
  const report={
    expectedCount:expected.length,
    figureCounts:{v12a:window.PROGRAM_FIGURE_V12_COUNT||0,v12b:window.PROGRAM_FIGURE_V12B_COUNT||0,v12c:window.PROGRAM_FIGURE_V12C_COUNT||0,v12d:window.PROGRAM_FIGURE_V12D_COUNT||0,v12e:window.PROGRAM_FIGURE_V12E_COUNT||0},
    coveredCount:all.size,missing,unexpected
  };
  window.INFORMATION_PROGRAM_FIGURE_AUDIT_V12=report;
  const counts=report.figureCounts;
  if(counts.v12a!==5||counts.v12b!==6||counts.v12c!==9||counts.v12d!==7||counts.v12e!==7||all.size!==34||missing.length||unexpected.length) console.warn('[情報Ⅰ プログラミング図版監査 v12]',report);
})();