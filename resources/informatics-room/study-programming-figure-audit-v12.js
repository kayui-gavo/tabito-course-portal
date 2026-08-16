/* 情報Ⅰ＜プログラミング編＞ v12 — 全48講の専用図版カバレッジ監査 */
(() => {
  const setA=new Set(['p39','p44','p46','p47','p48']);
  const setB=new Set(['p29','p40','p41','p42','p43','p45']);
  const setC=new Set(['p30','p31','p32','p33','p34','p35','p36','p37','p38']);
  const setD=new Set(['p15','p16','p17','p18','p19','p20','p21']);
  const setE=new Set(['p22','p23','p24','p25','p26','p27','p28']);
  const setF=new Set(['p1','p2','p3','p4','p5','p6','p7']);
  const setG=new Set(['p8','p9','p10','p11','p12','p13','p14']);
  const expected=Array.from({length:48},(_,i)=>`p${i+1}`);
  const all=new Set([...setA,...setB,...setC,...setD,...setE,...setF,...setG]);
  const missing=expected.filter(id=>!all.has(id));
  const unexpected=[...all].filter(id=>!expected.includes(id));
  const report={
    expectedCount:expected.length,
    figureCounts:{v12a:window.PROGRAM_FIGURE_V12_COUNT||0,v12b:window.PROGRAM_FIGURE_V12B_COUNT||0,v12c:window.PROGRAM_FIGURE_V12C_COUNT||0,v12d:window.PROGRAM_FIGURE_V12D_COUNT||0,v12e:window.PROGRAM_FIGURE_V12E_COUNT||0,v12f:window.PROGRAM_FIGURE_V12F_COUNT||0,v12g:window.PROGRAM_FIGURE_V12G_COUNT||0},
    coveredCount:all.size,missing,unexpected
  };
  window.INFORMATION_PROGRAM_FIGURE_AUDIT_V12=report;
  const c=report.figureCounts;
  if(c.v12a!==5||c.v12b!==6||c.v12c!==9||c.v12d!==7||c.v12e!==7||c.v12f!==7||c.v12g!==7||all.size!==48||missing.length||unexpected.length) console.warn('[情報Ⅰ プログラミング図版監査 v12]',report);
})();