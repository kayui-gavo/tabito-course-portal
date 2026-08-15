/* 情報Ⅰ 教材データ整合性チェック v7
   学生画面には表示せず、47PART / 48講と全教材レイヤーの欠落をconsoleで検出する。 */
(() => {
  const main=window.STUDY_MAIN||[];
  const programming=window.STUDY_PROGRAMMING||[];
  const mainIds=main.map(x=>x.id);
  const source=window.SOURCE_MASTER_V7||{};
  const sourcePractice=window.SOURCE_PRACTICE_V7||{};
  const auditMap=window.SOURCE_AUDIT_MAP_V7||{};
  const required={
    v3:window.ELECTRONIC_TEXTBOOK_V3||{},
    figures:window.ELECTRONIC_FIGURES_V4||{},
    practice:window.ELECTRONIC_PRACTICE_V4||{},
    challenge:window.ELECTRONIC_CHALLENGE_V4||{},
    depth:window.ELECTRONIC_DEPTH_V2||{},
    sourceMaster:source,
    sourcePractice,
    auditMap
  };
  const missing={};
  Object.entries(required).forEach(([name,map])=>{missing[name]=mainIds.filter(id=>!map[id]);});
  const incompleteSource=mainIds.filter(id=>{
    const item=source[id];
    return !item||!Array.isArray(item.sections)||item.sections.length<3||!item.exam;
  });
  const incompleteSourcePractice=mainIds.filter(id=>{
    const tasks=sourcePractice[id];
    return !Array.isArray(tasks)||tasks.length<2||tasks.some(t=>!t.title||!t.q||!t.a||!t.point);
  });
  const invalidAuditRange=mainIds.filter(id=>{
    const r=auditMap[id];
    return !Array.isArray(r)||r.length!==2||!Number.isInteger(r[0])||!Number.isInteger(r[1])||r[0]>r[1];
  });
  const report={
    mainCount:main.length,
    programmingCount:programming.length,
    sourceMasterCount:Object.keys(source).length,
    sourcePracticeCount:Object.keys(sourcePractice).length,
    sourceAuditMapCount:Object.keys(auditMap).length,
    sourceCheckCount:window.SOURCE_CHECK_V7_COUNT||0,
    missing,
    incompleteSource,
    incompleteSourcePractice,
    invalidAuditRange
  };
  window.INFORMATION_TEXTBOOK_AUDIT_V7=report;
  const hasProblem=main.length!==47||programming.length!==48||Object.keys(source).length!==47||Object.keys(sourcePractice).length!==47||Object.keys(auditMap).length!==47||(window.SOURCE_CHECK_V7_COUNT||0)!==47||Object.values(missing).some(list=>list.length)||incompleteSource.length||incompleteSourcePractice.length||invalidAuditRange.length;
  if(hasProblem) console.warn('[情報Ⅰ 教材整合性 v7]',report);
})();