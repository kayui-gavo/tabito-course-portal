/* 情報Ⅰ v12 — Canvas教材図版のアクセシビリティ補強 */
(() => {
  const baseRender=window.renderStudyLesson;
  function enhanceFigure(fig,index){
    if(fig.dataset.a11yV12==='1')return;fig.dataset.a11yV12='1';
    const title=fig.querySelector('h3')?.textContent.trim()||`教材図版 ${index+1}`;
    const caption=fig.querySelector('figcaption')?.textContent.trim()||'';
    const question=fig.querySelector('.scientific-question-v12>p')?.textContent.trim()||'';
    const canvas=fig.querySelector('canvas');
    const titleId=`figure-title-v12-${index}-${Math.random().toString(36).slice(2,7)}`;
    const descId=`figure-desc-v12-${index}-${Math.random().toString(36).slice(2,7)}`;
    const h=fig.querySelector('h3');if(h)h.id=titleId;
    const details=document.createElement('details');details.className='figure-text-summary-v12';details.id=descId;details.innerHTML=`<summary>図を文章で確認する</summary><p><b>図の主題：</b>${title}</p>${caption?`<p><b>読み方：</b>${caption}</p>`:''}${question?`<p><b>考えるポイント：</b>${question}</p>`:''}`;
    const cap=fig.querySelector('figcaption');(cap||canvas)?.insertAdjacentElement('afterend',details);
    if(canvas){canvas.setAttribute('role','img');canvas.setAttribute('aria-labelledby',titleId);canvas.setAttribute('aria-describedby',descId);canvas.tabIndex=-1;}
    const expand=fig.querySelector('[data-v12-expand],.scientific-figure-head-v11 button');if(expand)expand.setAttribute('aria-label',`${title} を拡大して見る`);
  }
  function enhanceLiveRegions(){
    document.querySelectorAll('.pf-result-v12c,.pf-score-stats-v12c,.figure-lab-result-v12,[data-program-run-output],.source-wireless-result-v10').forEach(node=>{if(!node.hasAttribute('aria-live')){node.setAttribute('aria-live','polite');node.setAttribute('aria-atomic','true');}});
  }
  function init(){document.querySelectorAll('.scientific-figure-v12,.scientific-figure-v11').forEach(enhanceFigure);enhanceLiveRegions();}
  window.renderStudyLesson=function renderFigureAccessibilityV12(){baseRender();init();};
})();