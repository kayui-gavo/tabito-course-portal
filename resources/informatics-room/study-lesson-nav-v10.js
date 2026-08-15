/* 情報Ⅰ v10 — 長い電子教材を迷わず読める章内ナビ */
(() => {
  const baseRender=window.renderStudyLesson;
  const current=()=>{const id=new URLSearchParams(location.search).get('id')||'';return typeof studyLessonById==='function'?studyLessonById(id):null;};
  const unique=(items)=>{const seen=new Set();return items.filter(x=>x.node&&!seen.has(x.node)&&(seen.add(x.node),true));};
  function targets(lesson){
    const main=[
      ['要点',document.querySelector('#points,.lesson-goals')],
      ['図解',document.querySelector('.et-figure-v4,.et-figure-v3')],
      ['本文',document.querySelector('.et-textbook-sections,.et-detail-v5-reading')],
      ['操作',document.querySelector('[data-transfer-lab-v10],[data-micro-lab-v9b],[data-micro-lab-v9]')],
      ['例題',document.querySelector('#example,.et-practice-v4')],
      ['実践',document.querySelector('.source-practice-v7,.et-source-practice-v7')],
      ['確認',document.querySelector('#check,.et-check-v3')]
    ];
    const prog=[
      ['要点',document.querySelector('.program-text-v6,#points')],
      ['例題',document.querySelector('.program-example-v6,#example')],
      ['コード読解',document.querySelector('[data-program-lab-v9]')],
      ['Python実行',document.querySelector('[data-program-run-v10]')],
      ['応用',document.querySelector('[data-program-middle-v9],[data-program-advanced-v9]')],
      ['確認',document.querySelector('#check,.et-check-v3')]
    ];
    return unique(lesson?.track==='programming'?prog:main);
  }
  function init(){
    const lesson=current();const paper=document.querySelector('.lesson-paper');if(!lesson||!paper||document.querySelector('.lesson-nav-v10'))return;
    const items=targets(lesson);if(items.length<3)return;
    items.forEach((item,i)=>{if(!item.node.id)item.node.id=`study-section-v10-${i}`;});
    const nav=document.createElement('nav');nav.className='lesson-nav-v10';nav.setAttribute('aria-label','このページの学習ナビゲーション');nav.innerHTML=`<div class="lesson-nav-progress-v10"><i data-read-progress></i></div><div class="lesson-nav-inner-v10"><span>${lesson.track==='programming'?'この講':'このPART'}</span>${items.map(item=>`<a href="#${item.node.id}">${item.label}</a>`).join('')}<button type="button" data-to-top>↑ 上へ</button></div>`;
    const header=document.querySelector('.lesson-header,.study-header');
    (header||paper).insertAdjacentElement(header?'afterend':'beforebegin',nav);
    nav.querySelector('[data-to-top]').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.querySelectorAll('a').forEach(x=>x.classList.remove('is-active'));a.classList.add('is-active');}));
    const progress=nav.querySelector('[data-read-progress]');
    const paint=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.width=`${Math.min(100,Math.max(0,scrollY/max*100))}%`;let best=null,bestY=-Infinity;items.forEach(item=>{const y=item.node.getBoundingClientRect().top;if(y<=140&&y>bestY){best=item;bestY=y;}});nav.querySelectorAll('a').forEach((a,i)=>a.classList.toggle('is-active',items[i]===best));};
    addEventListener('scroll',paint,{passive:true});addEventListener('resize',paint,{passive:true});paint();
  }
  window.renderStudyLesson=function renderLessonNavV10(){baseRender();init();};
})();