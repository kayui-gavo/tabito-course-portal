/* 情報Ⅰ 電子教材 v4 renderer
   v3本文を土台に、全47PARTの図解・第2例題・仕上げ問題を個別データで描画する。 */
(() => {
  const baseRender=window.renderStudyLesson;
  const figures=window.ELECTRONIC_FIGURES_V4||{};
  const practices=window.ELECTRONIC_PRACTICE_V4||{};
  const challenges=window.ELECTRONIC_CHALLENGE_V4||{};
  const interactiveIds=new Set(['b1-2','b1-5','b1-6','b3-2','b3-4','b3-5','b5-3','b7-2','b8-7','b9-3','b9-4']);

  const current=()=>{
    const id=new URLSearchParams(location.search).get('id')||'b1-1';
    return {id,lesson:studyLessonById(id)};
  };

  function diagramHTML(spec,companion=false){
    const items=(spec.items||[]).map(item=>{
      const head=Array.isArray(item)?item[0]:String(item);
      const body=Array.isArray(item)?item[1]:'';
      return `<div class="et-v4-item"><strong>${escapeHTML(head)}</strong>${body?`<p>${escapeHTML(body)}</p>`:''}</div>`;
    }).join('');
    return `<div class="${companion?'et-v4-companion ':''}et-v4-diagram et-v4-${escapeHTML(spec.type||'flow')}">
      <div class="et-v4-diagram-head"><b>${companion?'要点を関係で整理':'図解'}</b><span>SOURCE MAP</span></div>
      <div class="et-v4-items">${items}</div>
      ${spec.note?`<p class="et-v4-note">${escapeHTML(spec.note)}</p>`:''}
    </div>`;
  }

  function upgradeFigure(id,spec){
    const figure=document.querySelector('.et-figure');
    if(!figure||!spec)return;
    if(interactiveIds.has(id)){
      if(!figure.querySelector('.et-v4-companion')) figure.insertAdjacentHTML('beforeend',diagramHTML(spec,true));
    }else{
      figure.innerHTML=`<figcaption>${escapeHTML(spec.title)}</figcaption>${diagramHTML(spec,false)}`;
    }
    const note=document.querySelector('.et-figure-note-v3 b');
    if(note)note.textContent='図の読み方';
  }

  function practiceHTML(p){
    return `<div class="et-v4-more-label">もう1題</div>
      <article class="et-practical-v4">
        <header><span>例題 2</span><strong>${escapeHTML(p.title)}</strong></header>
        <div class="et-v4-prompt">${escapeHTML(p.prompt)}</div>
        <details><summary>考える手順を見る</summary><ol>${p.steps.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ol></details>
        <details><summary>答え・解説を見る</summary><p>${escapeHTML(p.answer)}</p></details>
        <p class="et-v4-skill"><b>この問題で確認する力：</b> ${escapeHTML(p.skill||'')}</p>
      </article>`;
  }

  function addSecondPractice(p){
    const section=document.querySelector('#example');
    if(!section||!p||section.querySelector('.et-practical-v4'))return;
    section.insertAdjacentHTML('beforeend',practiceHTML(p));
  }

  function challengeBody(c){
    if(c.type==='choice'){
      return `<div class="et-v4-choice-grid">${c.choices.map((x,i)=>`<button type="button" class="et-v4-choice" data-v4-choice="${i}"><i>${i+1}</i><span>${escapeHTML(x)}</span></button>`).join('')}</div>`;
    }
    if(c.type==='order'){
      return `<div class="et-v4-order" data-v4-order>
        <div class="et-v4-order-bank" data-v4-bank>${c.items.map((x,i)=>`<button type="button" data-value="${escapeHTML(x)}" data-original="${i}">${escapeHTML(x)}</button>`).join('')}</div>
        <div class="et-v4-order-answer" data-v4-answer></div>
        <div class="et-v4-order-actions"><button type="button" class="et-v4-check-btn" data-v4-order-check>答え合わせ</button><button type="button" class="et-v4-reset-btn" data-v4-order-reset>やり直す</button></div>
      </div>`;
    }
    const type=c.type==='number'?'text':'text';
    const placeholder=c.type==='number'?'答えを入力':'答えを入力';
    return `<div class="et-v4-input-row"><input type="${type}" inputmode="${c.type==='number'?'decimal':'text'}" placeholder="${placeholder}" data-v4-input><button type="button" class="et-v4-check-btn" data-v4-input-check>答え合わせ</button></div>`;
  }

  function challengeHTML(c){
    return `<div class="et-v4-challenge" data-v4-challenge data-type="${escapeHTML(c.type)}">
      <div class="et-v4-challenge-head"><b>＋1</b><span>仕上げ問題</span></div>
      <p class="et-v4-challenge-question">${escapeHTML(c.q)}</p>
      ${challengeBody(c)}
      <p class="et-v4-feedback" data-v4-feedback></p>
    </div>`;
  }

  function addChallenge(c){
    const section=document.querySelector('.et-check-v2');
    if(!section||!c||section.querySelector('[data-v4-challenge]'))return;
    const score=section.querySelector('.et-check-score');
    if(score)score.insertAdjacentHTML('beforebegin',challengeHTML(c));
    else section.insertAdjacentHTML('beforeend',challengeHTML(c));
  }

  function norm(value){
    return String(value??'').trim().toLowerCase().replace(/\s+/g,'').replace(/[，、]/g,',').replace(/₂/g,'2');
  }

  function showFeedback(root,correct,c){
    const f=root.querySelector('[data-v4-feedback]');
    if(!f)return;
    f.textContent=`${correct?'正解です。':'もう一度、本文と図解を確認しましょう。'} ${c.why||''}`;
    f.className=`et-v4-feedback is-visible ${correct?'is-correct':'is-wrong'}`;
  }

  function bindChallenge(c){
    const root=document.querySelector('[data-v4-challenge]');
    if(!root||!c)return;
    if(c.type==='choice'){
      const buttons=[...root.querySelectorAll('[data-v4-choice]')];
      buttons.forEach(btn=>btn.addEventListener('click',()=>{
        if(buttons.some(x=>x.disabled))return;
        const chosen=Number(btn.dataset.v4Choice);
        buttons.forEach(x=>x.disabled=true);
        buttons[c.answer]?.classList.add('is-correct');
        if(chosen!==c.answer)btn.classList.add('is-wrong');
        showFeedback(root,chosen===c.answer,c);
      }));
      return;
    }
    if(c.type==='order'){
      const bank=root.querySelector('[data-v4-bank]');
      const answer=root.querySelector('[data-v4-answer]');
      const reset=()=>{
        const buttons=[...bank.querySelectorAll('button'),...answer.querySelectorAll('button')].sort((a,b)=>Number(a.dataset.original)-Number(b.dataset.original));
        buttons.forEach(b=>bank.appendChild(b));
        const f=root.querySelector('[data-v4-feedback]'); if(f){f.className='et-v4-feedback';f.textContent='';}
      };
      const move=e=>{
        const btn=e.target.closest('button[data-value]'); if(!btn)return;
        (btn.parentElement===bank?answer:bank).appendChild(btn);
      };
      bank.addEventListener('click',move);answer.addEventListener('click',move);
      root.querySelector('[data-v4-order-reset]')?.addEventListener('click',reset);
      root.querySelector('[data-v4-order-check]')?.addEventListener('click',()=>{
        const got=[...answer.querySelectorAll('button')].map(b=>b.dataset.value);
        const correct=got.length===c.answer.length&&got.every((x,i)=>x===c.answer[i]);
        showFeedback(root,correct,c);
      });
      return;
    }
    const input=root.querySelector('[data-v4-input]');
    const check=()=>{
      const correct=norm(input.value)===norm(c.answer);
      input.setAttribute('aria-invalid',String(!correct));
      showFeedback(root,correct,c);
    };
    root.querySelector('[data-v4-input-check]')?.addEventListener('click',check);
    input?.addEventListener('keydown',e=>{if(e.key==='Enter')check();});
  }

  function addPartStatus(id){
    const paper=document.querySelector('.lesson-paper');
    if(!paper||paper.querySelector('.et-v4-status'))return;
    const cue=paper.querySelector('.et-study-cue-v3');
    if(!cue)return;
    cue.insertAdjacentHTML('afterend',`<div class="et-v4-status" style="margin:-12px 0 22px;color:#71838e;font-size:9px;text-align:right">本文・図解・例題・確認問題：PART別編集済み</div>`);
  }

  window.renderStudyLesson=function renderStudyLessonV4(){
    baseRender();
    const {id,lesson}=current();
    if(!lesson||lesson.track!=='main')return;
    const f=figures[id],p=practices[id],c=challenges[id];
    if(!f||!p||!c)return;
    document.body.classList.add('electronic-textbook-v4');
    upgradeFigure(id,f);
    addSecondPractice(p);
    addChallenge(c);
    bindChallenge(c);
    addPartStatus(id);
    requestAnimationFrame(()=>document.querySelectorAll('.lesson-route').forEach(n=>n.remove()));
  };

  const expected=(window.STUDY_MAIN||[]).length;
  window.ELECTRONIC_V4_COUNTS={figures:Object.keys(figures).length,practices:Object.keys(practices).length,challenges:Object.keys(challenges).length,expected};
  if(expected&&Object.values(window.ELECTRONIC_V4_COUNTS).slice(0,3).some(n=>n!==expected)) console.warn('[情報Ⅰ v4] 47PARTデータの不足があります。',window.ELECTRONIC_V4_COUNTS);
})();