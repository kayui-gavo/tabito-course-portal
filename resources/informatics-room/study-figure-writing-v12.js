/* 情報Ⅰ v12 — 図版の「考える」を記述式の想起練習へ */
(() => {
  const baseRender=window.renderStudyLesson;
  const DRAFT_KEY='tabito-info-figure-drafts-v12', REVIEW_KEY='tabito-info-figure-review-v12';
  const load=(key)=>{try{return JSON.parse(localStorage.getItem(key)||'{}');}catch(_){return{};}};
  const save=(key,v)=>{try{localStorage.setItem(key,JSON.stringify(v));}catch(_){}};
  function enhance(){
    const lessonId=new URLSearchParams(location.search).get('id')||'';
    document.querySelectorAll('.scientific-figure-v12').forEach((fig,idx)=>{
      const details=fig.querySelector('.scientific-question-v12');if(!details||details.querySelector('.figure-writing-v12'))return;
      const key=`${lessonId}:${fig.dataset.figureV12||fig.dataset.programFigureV12||fig.dataset.programFigureV12b||idx}`;
      const drafts=load(DRAFT_KEY), reviews=load(REVIEW_KEY), current=drafts[key]||'', status=reviews[key]||'';
      const block=document.createElement('div');block.className='figure-writing-v12';block.innerHTML=`<label><span>自分の説明</span><textarea rows="3" placeholder="図の数値・方向・条件を使って、答えを見る前に説明する。"></textarea><small><b data-figure-char>0</b>字</small></label><div class="figure-selfcheck-v12"><span>答えを見た後</span><button type="button" data-figure-review="mastered" class="${status==='mastered'?'is-selected':''}">説明できた</button><button type="button" data-figure-review="review" class="${status==='review'?'is-selected':''}">要復習</button></div>`;
      const answerButton=details.querySelector('[data-v12-answer]');details.insertBefore(block,answerButton);
      const ta=block.querySelector('textarea'),count=block.querySelector('[data-figure-char]');ta.value=current;count.textContent=String(current.length);
      ta.addEventListener('input',()=>{const all=load(DRAFT_KEY);all[key]=ta.value;save(DRAFT_KEY,all);count.textContent=String(ta.value.length);block.classList.toggle('is-ready',ta.value.trim().length>=12);});
      block.classList.toggle('is-ready',current.trim().length>=12);
      answerButton.addEventListener('click',()=>{if(ta.value.trim().length<12)block.classList.add('needs-writing');else block.classList.remove('needs-writing');});
      block.querySelectorAll('[data-figure-review]').forEach(btn=>btn.addEventListener('click',()=>{const all=load(REVIEW_KEY),val=btn.dataset.figureReview;all[key]=all[key]===val?'':val;save(REVIEW_KEY,all);block.querySelectorAll('[data-figure-review]').forEach(x=>x.classList.toggle('is-selected',all[key]===x.dataset.figureReview));}));
    });
  }
  window.renderStudyLesson=function renderFigureWritingV12(){baseRender();enhance();};
})();