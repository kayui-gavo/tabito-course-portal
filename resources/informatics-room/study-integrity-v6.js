/* 情報Ⅰ 教材データ整合性チェック v13
   学生画面には表示せず、47PART / 48講 / 図版 / 実行環境 / production runtime の欠落をconsoleで検出する。 */
(() => {
  const main=window.STUDY_MAIN||[],programming=window.STUDY_PROGRAMMING||[];
  const mainIds=main.map(x=>x.id),programmingIds=programming.map(x=>x.id);
  const source=window.SOURCE_MASTER_V7||{},sourcePractice=window.SOURCE_PRACTICE_V7||{},auditMap=window.SOURCE_AUDIT_MAP_V7||{},programSource=window.PROGRAM_SOURCE_V9||{},middle=window.PROGRAM_MIDDLE_V9||{},advanced=window.PROGRAM_ADVANCED_V9||{};
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
  const inter={p1to14:window.PROGRAM_FIGLAB_V12E_COUNT||0,p16to28:window.PROGRAM_FIGLAB_V12D_COUNT||0,p30to38:window.PROGRAM_FIGLAB_V12C_COUNT||0};inter.total=inter.p1to14+inter.p16to28+inter.p30to38;
  const runtime={python:window.PROGRAM_RUNNER_V10===true,production:window.STUDY_PRODUCTION_V13===true,practiceRubric:window.PRACTICE_RUBRIC_V13===true};
  const report={mainCount:main.length,programmingCount:programming.length,sourceMasterCount:Object.keys(source).length,sourcePracticeCount:Object.keys(sourcePractice).length,sourceAuditMapCount:Object.keys(auditMap).length,sourceCheckCount:window.SOURCE_CHECK_V7_COUNT||0,programmingSourceCount:Object.keys(programSource).length,middleProgrammingCount:Object.keys(middle).length,advancedProgrammingCount:Object.keys(advanced).length,runtime,mainFigureCovered:figureAudit.coveredCount||0,mainFigureMissing:figureAudit.missing||[],mainFigureDuplicate:figureAudit.duplicate||[],programmingFigureCovered:programFigureAudit.coveredCount||0,programmingFigureExpected:programFigureAudit.expectedCount||0,programmingFigureMissing:programFigureAudit.missing||[],programmingFigureUnexpected:programFigureAudit.unexpected||[],programmingFigureInteractives:inter,missing,missingProgrammingSource,missingMiddle,missingAdvanced,incompleteSource,incompleteSourcePractice,incompleteProgrammingSource,incompleteMiddle,incompleteAdvanced,invalidAuditRange};
  window.INFORMATION_TEXTBOOK_AUDIT_V13=report;
  const figureProblem=report.mainFigureCovered!==47||report.mainFigureMissing.length||report.mainFigureDuplicate.length||report.programmingFigureCovered!==48||report.programmingFigureExpected!==48||report.programmingFigureMissing.length||report.programmingFigureUnexpected.length||inter.p1to14!==8||inter.p16to28!==8||inter.p30to38!==7||inter.total!==23;
  const runtimeProblem=!runtime.python||!runtime.production||!runtime.practiceRubric;
  const hasProblem=main.length!==47||programming.length!==48||middleIds.length!==19||advancedIds.length!==15||Object.keys(source).length!==47||Object.keys(sourcePractice).length!==47||Object.keys(auditMap).length!==47||(window.SOURCE_CHECK_V7_COUNT||0)!==47||Object.keys(programSource).length!==48||Object.keys(middle).length!==19||Object.keys(advanced).length!==15||runtimeProblem||figureProblem||Object.values(missing).some(list=>list.length)||missingProgrammingSource.length||missingMiddle.length||missingAdvanced.length||incompleteSource.length||incompleteSourcePractice.length||incompleteProgrammingSource.length||incompleteMiddle.length||incompleteAdvanced.length||invalidAuditRange.length;
  if(hasProblem) console.warn('[情報Ⅰ 教材整合性 v13]',report);
})();