/* 情報Ⅰ v13 — 最終描画フェイルセーフ
   すべての後処理が終わった時点で、章内ナビとプログラミング図版の最終修正を必ず適用する。 */
(() => {
  const idNow=()=>new URLSearchParams(location.search).get('id')||'';
  const lessonNow=()=>typeof studyLessonById==='function'?studyLessonById(idNow()):null;

  function applyProgramFigureOverride(){
    const id=idNow(),config=window.PROGRAM_FIGURE_OVERRIDES_V13?.[id];if(!config||!window.SCIENTIFIC_V12)return;
    const fig=document.querySelector(`[data-program-figure-v12="${id}"],[data-program-figure-v12b="${id}"],[data-program-figure-v12c="${id}"],[data-program-figure-v12d="${id}"],[data-program-figure-v12e="${id}"],[data-program-figure-v12f="${id}"],[data-program-figure-v12g="${id}"]`);
    if(!fig||fig.dataset.v13OverrideApplied==='1')return;
    const canvas=fig.querySelector('canvas');if(!canvas)return;
    const report=window.SCIENTIFIC_V12.renderCanvas(canvas,config);
    (window.INFORMATION_CANVAS_TEXT_AUDIT_V13=window.INFORMATION_CANVAS_TEXT_AUDIT_V13||{})[id]=report;
    fig.dataset.v13OverrideApplied='1';
  }

  const unique=items=>{const seen=new Set();return items.filter(x=>x.node&&!seen.has(x.node)&&(seen.add(x.node),true));};
  function targets(programming){
    const main=[['要点',document.querySelector('#points,.lesson-goals')],['図解',document.querySelector('.scientific-figure-v12')],['本文',document.querySelector('.et-textbook-sections,.et-detail-v5-reading,.lesson-section')],['操作',document.querySelector('.figure-lab-v12,[data-transfer-lab-v10],.source-wireless-v10,[data-micro-lab-v9b],[data-micro-lab-v9]')],['例題',document.querySelector('#example,.et-practice-v4,.example-box')],['実践',document.querySelector('.et-source-practice-v7,.source-practice-v7')],['確認',document.querySelector('#check,.et-check-v3')]];
    const prog=[['要点',document.querySelector('.program-text-v6,#points,.lesson-goals')],['図解',document.querySelector('.scientific-figure-v12')],['追跡',document.querySelector('.program-figlab-v12')],['例題',document.querySelector('.program-example-v6,#example,.example-box')],['コード読解',document.querySelector('[data-program-lab-v9],.code-block')],['Python実行',document.querySelector('[data-program-run-v10]')],['応用',document.querySelector('[data-program-middle-v9],[data-program-advanced-v9]')],['確認',document.querySelector('#check,.et-check-v3')]];
    return unique(programming?prog:main);
  }

  function ensureNav(){
    if(document.querySelector('.lesson-nav-v13'))return;
    const paper=document.querySelector('.lesson-paper');if(!paper)return;
    const lesson=lessonNow(),programming=lesson?.track==='programming'||/^p\d+$/.test(idNow()),items=targets(programming);if(items.length<3)return;
    items.forEach((item,i)=>{if(!item.node.id)item.node.id=`study-section-v13-${i}`;});
    const nav=document.createElement('nav');nav.className='lesson-nav-v13';nav.setAttribute('aria-label','このページの学習ナビゲーション');nav.innerHTML=`<div class="lesson-nav-progress-v13"><i data-read-progress-v13></i></div><div class="lesson-nav-inner-v13"><span>${programming?'この講':'このPART'}</span>${items.map(item=>`<a href="#${item.node.id}">${item.label}</a>`).join('')}<button type="button" data-to-top-v13>↑ 上へ</button></div>`;
    const header=document.querySelector('.study-header');(header||paper).insertAdjacentElement(header?'afterend':'beforebegin',nav);
    nav.querySelector('[data-to-top-v13]').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    const progress=nav.querySelector('[data-read-progress-v13]');
    const paint=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.width=`${Math.min(100,Math.max(0,scrollY/max*100))}%`;let best=-1,bestY=-Infinity;items.forEach((item,i)=>{const y=item.node.getBoundingClientRect().top;if(y<=165&&y>bestY){best=i;bestY=y;}});nav.querySelectorAll('a').forEach((a,i)=>a.classList.toggle('is-active',i===best));};
    addEventListener('scroll',paint,{passive:true});addEventListener('resize',paint,{passive:true});paint();
  }

  function ensure(){applyProgramFigureOverride();ensureNav();}
  window.ensureStudyProductionV13=ensure;
  ensure();requestAnimationFrame(ensure);setTimeout(ensure,40);setTimeout(ensure,180);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensure,{once:true});
})();