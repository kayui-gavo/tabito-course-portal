/* 情報Ⅰ v13 — 全ページ共通の文字重なり・横はみ出し監査（console only） */
(() => {
  const visible=n=>{if(!n)return false;const r=n.getBoundingClientRect(),s=getComputedStyle(n);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden';};
  const hit=(a,b)=>{const A=a.getBoundingClientRect(),B=b.getBoundingClientRect();return {w:Math.max(0,Math.min(A.right,B.right)-Math.max(A.left,B.left)),h:Math.max(0,Math.min(A.bottom,B.bottom)-Math.max(A.top,B.top))};};
  function audit(){
    const overflow=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth;
    const clipped=[...document.querySelectorAll('h1,h2,h3,p,a,button,label,summary,figcaption,.curriculum-title,.tool-question-text,.tool-glossary-row strong')].filter(n=>{
      if(!visible(n)||n.closest('pre,.code-block,.figure-canvas-viewport-v13,.lesson-nav-v13'))return false;
      const s=getComputedStyle(n);if(s.whiteSpace==='nowrap'&&n.closest('.study-nav,.lesson-nav-v13'))return false;
      return n.scrollWidth>n.clientWidth+3||(['hidden','clip'].includes(s.overflowY)&&n.scrollHeight>n.clientHeight+3);
    }).slice(0,50).map(n=>({tag:n.tagName.toLowerCase(),className:String(n.className||'').slice(0,70),text:(n.textContent||'').trim().replace(/\s+/g,' ').slice(0,90),client:[n.clientWidth,n.clientHeight],scroll:[n.scrollWidth,n.scrollHeight]}));
    const overlaps=[];
    const pairs=[
      ['.index-intro h1','.index-progress-box','index-intro'],
      ['.tool-toolbar .tool-filter','.tool-toolbar .tool-search','tool-toolbar'],
      ['.tool-session-bar>span','.tool-session-bar>[data-tool-score]','tool-session'],
      ['.mini-mock-v10>header>div:first-child','.mini-mock-clock','mock-header']
    ];
    pairs.forEach(([aSel,bSel,name])=>{const a=document.querySelector(aSel),b=document.querySelector(bSel);if(!visible(a)||!visible(b))return;const x=hit(a,b);if(x.w>2&&x.h>2)overlaps.push({scope:name,w:Math.round(x.w),h:Math.round(x.h)});});
    const duplicateIds=[];const ids=new Set();document.querySelectorAll('[id]').forEach(n=>{if(ids.has(n.id))duplicateIds.push(n.id);else ids.add(n.id);});
    const report={path:location.pathname+location.search,viewport:[innerWidth,innerHeight],globalHorizontalOverflowPx:Math.max(0,Math.round(overflow)),clippedTextNodes:clipped,overlappingPairs:overlaps,duplicateIds:[...new Set(duplicateIds)]};
    report.ok=report.globalHorizontalOverflowPx<=4&&!clipped.length&&!overlaps.length&&!report.duplicateIds.length;
    window.INFORMATION_PAGE_AUDIT_V13=report;if(!report.ok)console.warn('[情報Ⅰ ページ監査 v13]',report);
  }
  function run(){requestAnimationFrame(()=>requestAnimationFrame(audit));setTimeout(audit,300);setTimeout(audit,1000);if(document.fonts?.ready)document.fonts.ready.then(()=>setTimeout(audit,40));}
  window.runInformationPageAuditV13=run;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();