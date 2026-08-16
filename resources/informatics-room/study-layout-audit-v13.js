/* 情報Ⅰ v13 — visual/runtime layout audit
   学生画面には表示しない。ブラウザ描画後に横はみ出し・文字重なり・図版・ARIA・重複IDを検査する。 */
(() => {
  const visible=node=>{if(!node)return false;const r=node.getBoundingClientRect(),s=getComputedStyle(node);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden';};
  const intersects=(a,b)=>{
    const A=a.getBoundingClientRect(),B=b.getBoundingClientRect();
    const w=Math.max(0,Math.min(A.right,B.right)-Math.max(A.left,B.left));
    const h=Math.max(0,Math.min(A.bottom,B.bottom)-Math.max(A.top,B.top));
    return {w,h,area:w*h,A,B};
  };
  function knownOverlapPairs(){
    const out=[];
    document.querySelectorAll('.scientific-figure-head-v12,.scientific-figure-head-v11').forEach((head,index)=>{
      const title=head.querySelector('h3'),button=head.querySelector('button');if(!visible(title)||!visible(button))return;const hit=intersects(title,button);if(hit.w>2&&hit.h>2)out.push({scope:`figure-head-${index}`,a:(title.textContent||'').trim().slice(0,60),b:(button.textContent||'').trim(),w:Math.round(hit.w),h:Math.round(hit.h)});
    });
    document.querySelectorAll('.figure-lab-v12>header,.program-figlab-v12>header').forEach((head,index)=>{
      const title=head.querySelector('h3'),lead=head.querySelector('p');if(!visible(title)||!visible(lead))return;const hit=intersects(title,lead);if(hit.w>2&&hit.h>2)out.push({scope:`lab-head-${index}`,a:(title.textContent||'').trim().slice(0,60),b:(lead.textContent||'').trim().slice(0,60),w:Math.round(hit.w),h:Math.round(hit.h)});
    });
    return out;
  }
  function clippedTextNodes(){
    const selector='.lesson-paper h1,.lesson-paper h2,.lesson-paper h3,.lesson-paper p,.lesson-paper li,.lesson-paper summary,.lesson-paper button,.lesson-paper label,.lesson-paper strong,.lesson-paper figcaption';
    return [...document.querySelectorAll(selector)].filter(node=>{
      if(!visible(node)||node.closest('pre,.code-block,.figure-canvas-viewport-v13'))return false;
      const style=getComputedStyle(node);if(style.whiteSpace==='nowrap'&&node.closest('.lesson-nav-v13'))return false;
      return node.scrollWidth>node.clientWidth+3||node.scrollHeight>node.clientHeight+3&&['hidden','clip'].includes(style.overflowY);
    }).slice(0,40).map(node=>({tag:node.tagName.toLowerCase(),className:String(node.className||'').slice(0,80),text:(node.textContent||'').trim().replace(/\s+/g,' ').slice(0,90),client:[node.clientWidth,node.clientHeight],scroll:[node.scrollWidth,node.scrollHeight]}));
  }
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
    const canvasAudit=window.INFORMATION_CANVAS_TEXT_AUDIT_V13||{};
    const canvasTextIssues=Object.entries(canvasAudit).filter(([,q])=>q&&(q.truncated?.length||q.shrunk?.some(x=>Number(x.to)<9))).map(([id,q])=>({id,truncated:q.truncated||[],tooSmall:(q.shrunk||[]).filter(x=>Number(x.to)<9)}));
    const overlaps=knownOverlapPairs(),clipped=clippedTextNodes();
    const globalOverflow=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-window.innerWidth;
    const report={
      viewport:{width:window.innerWidth,height:window.innerHeight},
      globalHorizontalOverflowPx:Math.max(0,Math.round(globalOverflow)),
      figureCount:figures.length,
      figureIssues,
      canvasTextIssues,
      overlappingTextPairs:overlaps,
      clippedTextNodes:clipped,
      duplicateIds:[...new Set(duplicateIds)],
      tinyTargets,
      oldReadingProgressVisible:!!document.querySelector('.lesson-reading-progress')&&getComputedStyle(document.querySelector('.lesson-reading-progress')).display!=='none',
      productionNavCount:document.querySelectorAll('.lesson-nav-v13').length,
      practiceRubricCount:document.querySelectorAll('.practice-rubric-v13').length
    };
    report.ok=report.globalHorizontalOverflowPx<=4&&!figureIssues.length&&!canvasTextIssues.length&&!overlaps.length&&!clipped.length&&!report.duplicateIds.length&&!tinyTargets.length&&!report.oldReadingProgressVisible&&report.productionNavCount===1;
    window.INFORMATION_LAYOUT_AUDIT_V13=report;
    if(!report.ok)console.warn('[情報Ⅰ レイアウト監査 v13]',report);
  }
  function run(){requestAnimationFrame(()=>requestAnimationFrame(audit));setTimeout(audit,260);setTimeout(audit,900);}
  window.runInformationLayoutAuditV13=run;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();