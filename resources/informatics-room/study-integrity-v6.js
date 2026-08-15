/* 情報Ⅰ 教材データ整合性チェック v12
   学生画面には表示せず、47PART / 48講 / 図版 / 実行環境の欠落をconsoleで検出する。 */
(() => {
  const main=window.STUDY_MAIN||[];
  const programming=window.STUDY_PROGRAMMING||[];
  const mainIds=main.map(x=>x.id);
  const programmingIds=programming.map(x=>x.id);
  const source=window.SOURCE_MASTER_V7||{};
  const sourcePractice=window.SOURCE_PRACTICE_V7||{};
  const auditMap=window.SOURCE_AUDIT_MAP_V7||{};
  const programSource=window.PROGRAM_SOURCE_V9||{};
  const middle=window.PROGRAM_MIDDLE_V9||{};
  const advanced=window.PROGRAM_ADVANCED_V9||{};
  const required={v3:window.ELECTRONIC_TEXTBOOK_V3||{},figures:window.ELECTRONIC_FIGURES_V4||{},practice:window.ELECTRONIC_PRACTICE_V4||{},challenge:window.ELECTRONIC_CHALLENGE_V4||{},depth:window.ELECTRONIC_DEPTH_V2||{},sourceMaster:source,sourcePractice,auditMap};
  const missing={};Object.entries(required).forEach(([name,map])=>{missing[name]=mainIds.filter(id=>!map[id]);});
  const missingProgrammingSource=programmingIds.filter(id=>!programSource[id]);
  const middleIds=programming.filter(x=>x.level==='中級').map(x=>x.id),advancedIds=programming.filter(x=>x.level==='上級').map(x=>x.id);
  const missingMiddle=middleIds.filter(id=>!middle[id]),missingAdvanced=advancedIds.filter(id=>!advanced[id]);
  const incompleteSource=mainIds.filter(id=>{const item=source[id];return !item||!Array.isArray(item.sections)||item.sections.length<3||!item.exam;});
  const incompleteSourcePractice=mainIds.filter(id=>{const tasks=sourcePractice[id];return !Array.isArray(tasks)||tasks.length<2||tasks.some(t=>!t.title||!t.q||!t.a||!t.point);});
  const incompleteProgrammingSource=programmingIds.filter(id=>{const item=programSource[id];return !item||!item.core||!item.read||!item.pitfall||!item.drill;});
  const incompleteMiddle=middleIds.filter(id=>{const item=middle[id];return !item||!item.title||!item.code||!item.q||!item.a||!item.point;});
  const incompleteAdvanced=advancedIds.filter(id=>{const item=advanced[id];return !item||!item.title||!Array.isArray(item.conditions)||item.conditions.length<3||!item.code||!item.focus||!item.check;});
  const invalidAuditRange=mainIds.filter(id=>{const r=auditMap[id];return !Array.isArray(r)||r.length!==2||!Number.isInteger(r[0])||!Number.isInteger(r[1])||r[0]>r[1];});
  const figureAudit=window.INFORMATION_FIGURE_AUDIT_V12||{},programFigureAudit=window.INFORMATION_PROGRAM_FIGURE_AUDIT_V12||{};
  const report={
    mainCount:main.length,programmingCount:programming.length,sourceMasterCount:Object.keys(source).length,sourcePracticeCount:Object.keys(sourcePractice).length,sourceAuditMapCount:Object.keys(auditMap).length,sourceCheckCount:window.SOURCE_CHECK_V7_COUNT||0,
    programmingSourceCount:Object.keys(programSource).length,middleProgrammingCount:Object.keys(middle).length,advancedProgrammingCount:Object.keys(advanced).length,pythonRunnerLoaded:window.PROGRAM_RUNNER_V10===true,
    mainFigureCovered:figureAudit.coveredCount||0,mainFigureMissing:figureAudit.missing||[],mainFigureDuplicate:figureAudit.duplicate||[],
    programmingFigureCovered:programFigureAudit.coveredCount||0,programmingFigureExpected:programFigureAudit.expectedCount||0,programmingFigureMissing:programFigureAudit.missing||[],programmingFigureUnexpected:programFigureAudit.unexpected||[],
    programmingFigureInteractives:{p30to38:window.PROGRAM_FIGLAB_V12C_COUNT||0,p16to28:window.PROGRAM_FIGLAB_V12D_COUNT||0,total:(window.PROGRAM_FIGLAB_V12C_COUNT||0)+(window.PROGRAM_FIGLAB_V12D_COUNT||0)},
    missing,missingProgrammingSource,missingMiddle,missingAdvanced,incompleteSource,incompleteSourcePractice,incompleteProgrammingSource,incompleteMiddle,incompleteAdvanced,invalidAuditRange
  };
  window.INFORMATION_TEXTBOOK_AUDIT_V12=report;
  const figureProblem=report.mainFigureCovered!==47||report.mainFigureMissing.length||report.mainFigureDuplicate.length||report.programmingFigureCovered!==34||report.programmingFigureExpected!==34||report.programmingFigureMissing.length||report.programmingFigureUnexpected.length||report.programmingFigureInteractives.p30to38!==7||report.programmingFigureInteractives.p16to28!==8;
  const hasProblem=main.length!==47||programming.length!==48||middleIds.length!==19||advancedIds.length!==15||Object.keys(source).length!==47||Object.keys(sourcePractice).length!==47||Object.keys(auditMap).length!==47||(window.SOURCE_CHECK_V7_COUNT||0)!==47||Object.keys(programSource).length!==48||Object.keys(middle).length!==19||Object.keys(advanced).length!==15||window.PROGRAM_RUNNER_V10!==true||figureProblem||Object.values(missing).some(list=>list.length)||missingProgrammingSource.length||missingMiddle.length||missingAdvanced.length||incompleteSource.length||incompleteSourcePractice.length||incompleteProgrammingSource.length||incompleteMiddle.length||incompleteAdvanced.length||invalidAuditRange.length;
  if(hasProblem) console.warn('[情報Ⅰ 教材整合性 v12]',report);
})();