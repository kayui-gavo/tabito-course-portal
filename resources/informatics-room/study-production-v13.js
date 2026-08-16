/* 情報Ⅰ v13 — production post-render runtime
   図版の横スクロール、想起記述、アクセシビリティ、章内ナビを一本化。 */
(() => {
  const baseRender=window.renderStudyLesson;
  const DRAFT_KEY='tabito-info-figure-drafts-v12',REVIEW_KEY='tabito-info-figure-review-v12';
  const load=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}');}catch(_){return{};}};
  const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(_){}};
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const idNow=()=>new URLSearchParams(location.search).get('id')||'';
  const lessonNow=()=>typeof studyLessonById==='function'?studyLessonById(idNow()):null;

  function wrapCanvas(fig,index){
    const canvas=fig.querySelector(':scope > canvas');if(!canvas||canvas.closest('.figure-canvas-viewport-v13'))return;
    const viewport=document.createElement('div');viewport.className='figure-canvas-viewport-v13';canvas.before(viewport);viewport.appendChild(canvas);
    const hint=document.createElement('p');hint.className='figure-scroll-hint-v13';hint.textContent='図が画面より大きい場合は、ここだけ横にスクロールできます。';viewport.insertAdjacentElement('afterend',hint);
    const update=()=>{const scrollable=viewport.scrollWidth>viewport.clientWidth+4;viewport.dataset.scrollable=scrollable?'1':'0';hint.classList.toggle('is-visible',scrollable);};
    requestAnimationFrame(update);setTimeout(update,120);addEventListener('resize',update,{passive:true});canvas.dataset.figureCanvasV13=String(index);
  }

  function addWriting(){
    const lessonId=idNow();
    document.querySelectorAll('.scientific-figure-v12').forEach((fig,idx)=>{
      const details=fig.querySelector('.scientific-question-v12');if(!details||details.querySelector('.figure-writing-v12'))return;
      const answer=details.querySelector('[data-v12-answer]');if(!answer)return;
      const figureId=fig.dataset.figureV12||fig.dataset.programFigureV12||fig.dataset.programFigureV12b||fig.dataset.programFigureV12c||fig.dataset.programFigureV12d||fig.dataset.programFigureV12e||fig.dataset.programFigureV12f||fig.dataset.programFigureV12g||`figure-${idx}`;
      const key=`${lessonId}:${figureId}`,drafts=load(DRAFT_KEY),reviews=load(REVIEW_KEY),current=drafts[key]||'',status=reviews[key]||'';
      const block=document.createElement('div');block.className='figure-writing-v12';
      block.innerHTML=`<label><span>自分の説明</span><textarea rows="3" placeholder="図の数値・方向・条件を使って、答えを見る前に説明する。"></textarea><small><b data-figure-char>0</b>字</small></label><div class="figure-selfcheck-v12"><span>答えを見た後</span><button type="button" data-figure-review="mastered" class="${status==='mastered'?'is-selected':''}">説明できた</button><button type="button" data-figure-review="review" class="${status==='review'?'is-selected':''}">要復習</button></div>`;
      details.insertBefore(block,answer);
      const ta=block.querySelector('textarea'),count=block.querySelector('[data-figure-char]');ta.value=current;count.textContent=String(current.length);block.classList.toggle('is-ready',current.trim().length>=12);
      ta.addEventListener('input',()=>{const all=load(DRAFT_KEY);all[key]=ta.value;save(DRAFT_KEY,all);count.textContent=String(ta.value.length);block.classList.toggle('is-ready',ta.value.trim().length>=12);block.classList.remove('needs-writing');});
      answer.addEventListener('click',()=>block.classList.toggle('needs-writing',ta.value.trim().length<12));
      block.querySelectorAll('[data-figure-review]').forEach(btn=>btn.addEventListener('click',()=>{const all=load(REVIEW_KEY),v=btn.dataset.figureReview;all[key]=all[key]===v?'':v;save(REVIEW_KEY,all);block.querySelectorAll('[data-figure-review]').forEach(x=>x.classList.toggle('is-selected',all[key]===x.dataset.figureReview));}));
    });
  }

  function addA11y(){
    document.querySelectorAll('.scientific-figure-v12').forEach((fig,index)=>{
      if(fig.dataset.a11yV13==='1')return;fig.dataset.a11yV13='1';
      const title=fig.querySelector('h3')?.textContent.trim()||`教材図版 ${index+1}`,caption=fig.querySelector('figcaption')?.textContent.trim()||'',question=fig.querySelector('.scientific-question-v12>p')?.textContent.trim()||'',canvas=fig.querySelector('canvas');
      const titleId=`figure-title-v13-${index}`,descId=`figure-desc-v13-${index}`;const h=fig.querySelector('h3');if(h)h.id=titleId;
      const details=document.createElement('details');details.className='figure-text-summary-v12';details.id=descId;details.innerHTML=`<summary>図を文章で確認する</summary><p><b>図の主題：</b>${esc(title)}</p>${caption?`<p><b>読み方：</b>${esc(caption)}</p>`:''}${question?`<p><b>考えるポイント：</b>${esc(question)}</p>`:''}`;
      const cap=fig.querySelector('figcaption');(cap||fig.querySelector('.figure-canvas-viewport-v13')||canvas)?.insertAdjacentElement('afterend',details);
      if(canvas){canvas.setAttribute('role','img');canvas.setAttribute('aria-labelledby',titleId);canvas.setAttribute('aria-describedby',descId);canvas.tabIndex=-1;}
      const expand=fig.querySelector('[data-v12-expand]');if(expand)expand.setAttribute('aria-label',`${title} を拡大して見る`);
    });
    document.querySelectorAll('.pf-result-v12c,.pf-score-stats-v12c,.figure-lab-result-v12,[data-program-run-output],.source-wireless-result-v10,.pd-result,.pe-logic-results').forEach(node=>{if(!node.hasAttribute('aria-live')){node.setAttribute('aria-live','polite');node.setAttribute('aria-atomic','true');}});
  }

  function navTargets(lesson){
    const unique=items=>{const seen=new Set();return items.filter(x=>x.node&&!seen.has(x.node)&&(seen.add(x.node),true));};
    const main=[['要点',document.querySelector('#points,.lesson-goals')],['図解',document.querySelector('.scientific-figure-v12')],['本文',document.querySelector('.et-textbook-sections,.et-detail-v5-reading')],['操作',document.querySelector('.figure-lab-v12,[data-transfer-lab-v10],.source-wireless-v10,[data-micro-lab-v9b],[data-micro-lab-v9]')],['例題',document.querySelector('#example,.et-practice-v4')],['実践',document.querySelector('.et-source-practice-v7,.source-practice-v7')],['確認',document.querySelector('#check,.et-check-v3')]];
    const prog=[['要点',document.querySelector('.program-text-v6,#points')],['図解',document.querySelector('.scientific-figure-v12')],['追跡',document.querySelector('.program-figlab-v12')],['例題',document.querySelector('.program-example-v6,#example')],['コード読解',document.querySelector('[data-program-lab-v9]')],['Python実行',document.querySelector('[data-program-run-v10]')],['応用',document.querySelector('[data-program-middle-v9],[data-program-advanced-v9]')],['確認',document.querySelector('#check,.et-check-v3')]];
    return unique(lesson?.track==='programming'?prog:main);
  }

  function addNav(){
    const lesson=lessonNow(),paper=document.querySelector('.lesson-paper');if(!lesson||!paper||document.querySelector('.lesson-nav-v13'))return;const items=navTargets(lesson);if(items.length<3)return;
    items.forEach((item,i)=>{if(!item.node.id)item.node.id=`study-section-v13-${i}`;});
    const nav=document.createElement('nav');nav.className='lesson-nav-v13';nav.setAttribute('aria-label','このページの学習ナビゲーション');nav.innerHTML=`<div class="lesson-nav-progress-v13"><i data-read-progress-v13></i></div><div class="lesson-nav-inner-v13"><span>${lesson.track==='programming'?'この講':'このPART'}</span>${items.map(item=>`<a href="#${item.node.id}">${item.label}</a>`).join('')}<button type="button" data-to-top-v13>↑ 上へ</button></div>`;
    const header=document.querySelector('.study-header');(header||paper).insertAdjacentElement(header?'afterend':'beforebegin',nav);nav.querySelector('[data-to-top-v13]').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));const progress=nav.querySelector('[data-read-progress-v13]');
    const paint=()=>{const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);progress.style.width=`${Math.min(100,Math.max(0,scrollY/max*100))}%`;let best=null,bestY=-Infinity;items.forEach(item=>{const y=item.node.getBoundingClientRect().top;if(y<=165&&y>bestY){best=item;bestY=y;}});nav.querySelectorAll('a').forEach((a,i)=>a.classList.toggle('is-active',items[i]===best));};addEventListener('scroll',paint,{passive:true});addEventListener('resize',paint,{passive:true});paint();
  }

  function copyPolish(){const cue=document.querySelector('.et-study-cue-v3 b');if(cue)cue.textContent='図で関係をつかむ → 図の下で自分の言葉にする → 本文で細部を読む → 操作・実行して確かめる → 例題・実践演習 → 到達チェック';const lead=document.querySelector('.et-check-head p');if(lead)lead.textContent='単語暗記だけでなく、資料の読み取り・場面への適用・計算・分類まで確認します。3問のあと、仕上げ問題にも挑戦してください。';}

  function postRender(){document.querySelectorAll('.scientific-figure-v12').forEach(wrapCanvas);addWriting();addA11y();addNav();copyPolish();}
  window.renderStudyLesson=function renderStudyProductionV13(){baseRender();postRender();};
  window.STUDY_PRODUCTION_V13=true;
})();