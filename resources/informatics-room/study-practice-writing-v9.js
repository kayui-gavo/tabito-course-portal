/* 情報Ⅰ v9 — 記述・思考演習を「書いてから比較する」形式へ */
(() => {
  const KEY='tabito-info-open-drafts-v9';
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(_){return{};}};
  const save=v=>{try{localStorage.setItem(KEY,JSON.stringify(v));}catch(_){}};
  function enhance(card){
    if(card.dataset.writingV9)return; card.dataset.writingV9='1';
    const qid=card.dataset.qid||'';
    const host=card.querySelector('.practice-open-v8'); if(!host)return;
    const note=host.querySelector('.practice-open-v8-note');
    const box=document.createElement('label');box.className='practice-writing-v9';
    box.innerHTML='<span>自分の解答・根拠</span><textarea rows="5" placeholder="結論だけでなく、「なぜそう判断したか」まで書く"></textarea><small><b data-write-count>0</b>文字 / この端末に自動保存</small>';
    note?.insertAdjacentElement('afterend',box);
    const textarea=box.querySelector('textarea'),count=box.querySelector('[data-write-count]');
    const state=read();textarea.value=state[qid]||'';
    const update=()=>{count.textContent=textarea.value.length;const all=read();all[qid]=textarea.value;save(all);card.classList.toggle('has-written-v9',textarea.value.trim().length>=12);};
    textarea.addEventListener('input',update);update();
    const reveal=host.querySelector('[data-open-reveal]');
    reveal?.addEventListener('click',()=>{
      if(textarea.value.trim().length<12){box.classList.add('needs-writing-v9');setTimeout(()=>box.classList.remove('needs-writing-v9'),800);}
    },{capture:true});
    const answer=host.querySelector('[data-open-answer]');
    if(answer){const h=document.createElement('small');h.className='practice-compare-v9';h.textContent='上の自分の答案と比べ、結論・根拠・用語の3点を確認してください。';answer.appendChild(h);}
  }
  const init=()=>document.querySelectorAll('.tool-question-card.is-open-practice').forEach(enhance);
  init();
  const root=document.querySelector('#toolQuestionList');
  if(root)new MutationObserver(()=>requestAnimationFrame(init)).observe(root,{childList:true,subtree:true});
})();