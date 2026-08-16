/* 情報Ⅰ v13 — 本編の電子教材レンダラーがbodyを再構成した直後に章内ナビを復元する。 */
(() => {
  const baseRender=window.renderStudyLesson;
  function ensureMainNav(){
    const id=new URLSearchParams(location.search).get('id')||'b1-1';
    const lesson=typeof studyLessonById==='function'?studyLessonById(id):null;
    if(!lesson||lesson.track!=='main'||document.querySelector('.lesson-nav-v13'))return;
    const paper=document.querySelector('.lesson-paper');if(!paper)return;
    const candidates=[
      ['目標',document.querySelector('#goals,#points,.lesson-goals')],
      ['図解',document.querySelector('.scientific-figure-v12,#figure,.et-figure-section')],
      ['要点',document.querySelector('#points')],
      ['例題',document.querySelector('#example,.et-worked-section')],
      ['実践',document.querySelector('.et-source-practice-v7,.source-practice-v7')],
      ['確認',document.querySelector('#check,.et-check-v3')],
      ['まとめ',document.querySelector('#summary,.et-summary-section')]
    ];
    const seen=new Set(),items=candidates.filter(([,node])=>node&&!seen.has(node)&&(seen.add(node),true));
    if(items.length<3)return;
    items.forEach(([label,node],i)=>{if(!node.id)node.id=`study-section-main-v13-${i}`;});
    const nav=document.createElement('nav');
    nav.className='lesson-nav-v13 lesson-nav-v13-main';
    nav.setAttribute('aria-label','このPARTの学習ナビゲーション');
    nav.innerHTML=`<div class="lesson-nav-progress-v13"><i data-read-progress-v13></i></div><div class="lesson-nav-inner-v13"><span>このPART</span>${items.map(([label,node])=>`<a href="#${node.id}">${label}</a>`).join('')}<button type="button" data-to-top-v13>↑ 上へ</button></div>`;
    const header=document.querySelector('.study-header');(header||paper).insertAdjacentElement(header?'afterend':'beforebegin',nav);
    nav.querySelector('[data-to-top-v13]').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
    const progress=nav.querySelector('[data-read-progress-v13]'),links=[...nav.querySelectorAll('a')];
    const paint=()=>{
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);if(progress)progress.style.width=`${Math.min(100,Math.max(0,scrollY/max*100))}%`;
      let best=-1,bestY=-Infinity;items.forEach(([,node],i)=>{const y=node.getBoundingClientRect().top;if(y<=165&&y>bestY){best=i;bestY=y;}});links.forEach((a,i)=>a.classList.toggle('is-active',i===best));
    };
    addEventListener('scroll',paint,{passive:true});addEventListener('resize',paint,{passive:true});paint();
  }
  window.renderStudyLesson=function renderMainNavV13(){baseRender();ensureMainNav();};
  window.ensureMainLessonNavV13=ensureMainNav;
})();
