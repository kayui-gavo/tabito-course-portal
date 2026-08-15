/* 情報Ⅰ 教材データ整合性チェック v6
   学生画面には表示せず、47PART / 48講と教材レイヤーの欠落だけをconsoleで検出する。 */
(() => {
  const main=window.STUDY_MAIN||[];
  const programming=window.STUDY_PROGRAMMING||[];
  const mainIds=main.map(x=>x.id);
  const required={
    v3:window.ELECTRONIC_TEXTBOOK_V3||{},
    figures:window.ELECTRONIC_FIGURES_V4||{},
    practice:window.ELECTRONIC_PRACTICE_V4||{},
    challenge:window.ELECTRONIC_CHALLENGE_V4||{},
    depth:window.ELECTRONIC_DEPTH_V2||{}
  };
  const missing={};
  Object.entries(required).forEach(([name,map])=>{
    missing[name]=mainIds.filter(id=>!map[id]);
  });
  const report={
    mainCount:main.length,
    programmingCount:programming.length,
    missing
  };
  window.INFORMATION_TEXTBOOK_AUDIT_V6=report;
  const hasProblem=main.length!==47||programming.length!==48||Object.values(missing).some(list=>list.length);
  if(hasProblem) console.warn('[情報Ⅰ 教材整合性]',report);
})();