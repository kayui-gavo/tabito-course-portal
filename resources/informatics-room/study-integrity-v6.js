/* 情報Ⅰ 教材データ整合性チェック v7
   学生画面には表示せず、47PART / 48講と全教材レイヤーの欠落をconsoleで検出する。 */
(() => {
  const main=window.STUDY_MAIN||[];
  const programming=window.STUDY_PROGRAMMING||[];
  const mainIds=main.map(x=>x.id);
  const source=window.SOURCE_MASTER_V7||{};
  const required={
    v3:window.ELECTRONIC_TEXTBOOK_V3||{},
    figures:window.ELECTRONIC_FIGURES_V4||{},
    practice:window.ELECTRONIC_PRACTICE_V4||{},
    challenge:window.ELECTRONIC_CHALLENGE_V4||{},
    depth:window.ELECTRONIC_DEPTH_V2||{},
    sourceMaster:source
  };
  const missing={};
  Object.entries(required).forEach(([name,map])=>{missing[name]=mainIds.filter(id=>!map[id]);});
  const incompleteSource=mainIds.filter(id=>{
    const item=source[id];
    return !item||!Array.isArray(item.sections)||item.sections.length<3||!item.exam;
  });
  const report={
    mainCount:main.length,
    programmingCount:programming.length,
    sourceMasterCount:Object.keys(source).length,
    sourceCheckCount:window.SOURCE_CHECK_V7_COUNT||0,
    missing,
    incompleteSource
  };
  window.INFORMATION_TEXTBOOK_AUDIT_V7=report;
  const hasProblem=main.length!==47||programming.length!==48||Object.keys(source).length!==47||(window.SOURCE_CHECK_V7_COUNT||0)!==47||Object.values(missing).some(list=>list.length)||incompleteSource.length;
  if(hasProblem) console.warn('[情報Ⅰ 教材整合性 v7]',report);
})();