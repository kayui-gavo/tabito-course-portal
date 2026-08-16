/* 情報Ⅰ v13 — visual/runtime layout audit
   学生画面には表示しない。ブラウザ描画後に横はみ出し・図版・ARIA・重複IDを検査する。 */
(() => {
  function audit(){
    if(!document.querySelector('.lesson-paper'))return;
    const figures=[...document.querySelectorAll('.scientific-figure-v12,.scientific-figure-v11')];
    const duplicateIds=[];const seen=new Set();
    document.querySelectorAll('[id]').forEach(node=>{if(seen.has(node.id))duplicateIds.push(node.id);else seen.add(node.id);});
    const figureIssues=[];
    figures.forEach((fig,index)=>{
      const canvas=fig.querySelector('canvas'),viewport=fig.querySelector('.figure-canvas-viewport-v13'),caption=fig.querySelector('figcaption'),question=fig.querySelector('.scientific-question-v12'),summary=fig.querySelector('.figure-text-summary-v12');
      if(!canvas)figureIssues.push({index,type:'missing-canvas'});
      if(canvas&&!viewport)figureIssues.push({index,type:'missing-canvas-viewport'});
      if(!caption)figureIssues.push({index,type:'missing-caption'});
      if(!question)figureIssues.push({index,type:'missing-recall-question'});
      if(!summary)figureIssues.push({index,type:'missing-text-summary'});
      if(canvas&&canvas.getAttribute('role')!=='img')figureIssues.push({index,type:'missing-image-role'});
      if(canvas&&!canvas.getAttribute('aria-describedby'))figureIssues.push({index,type:'missing-description-link'});
      if(viewport&&viewport.scrollWidth>viewport.clientWidth+4&&!fig.querySelector('.figure-scroll-hint-v13.is-visible'))figureIssues.push({index,type:'scroll-hint-not-visible'});
    });
    const tinyTargets=[...document.querySelectorAll('.scientific-question-v12 button,.figure-selfcheck-v12 button,.practice-rubric-status-v13 button,.program-figlab-v12 button')]
      .filter(node=>{const r=node.getBoundingClientRect();return r.width>0&&r.height>0&&r.height<28;})
      .map(node=>({text:(node.textContent||'').trim().slice(0,40),height:Math.round(node.getBoundingClientRect().height)}));
    const globalOverflow=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-window.innerWidth;
    const report={
      viewport:{width:window.innerWidth,height:window.innerHeight},
      globalHorizontalOverflowPx:Math.max(0,Math.round(globalOverflow)),
      figureCount:figures.length,
      figureIssues,
      duplicateIds:[...new Set(duplicateIds)],
      tinyTargets,
      oldReadingProgressVisible:!!document.querySelector('.lesson-reading-progress')&&getComputedStyle(document.querySelector('.lesson-reading-progress')).display!=='none',
      productionNavCount:document.querySelectorAll('.lesson-nav-v13').length,
      practiceRubricCount:document.querySelectorAll('.practice-rubric-v13').length
    };
    report.ok=report.globalHorizontalOverflowPx<=4&&!figureIssues.length&&!report.duplicateIds.length&&!tinyTargets.length&&!report.oldReadingProgressVisible&&report.productionNavCount===1;
    window.INFORMATION_LAYOUT_AUDIT_V13=report;
    if(!report.ok)console.warn('[情報Ⅰ レイアウト監査 v13]',report);
  }
  function run(){requestAnimationFrame(()=>requestAnimationFrame(audit));setTimeout(audit,260);}
  window.runInformationLayoutAuditV13=run;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();