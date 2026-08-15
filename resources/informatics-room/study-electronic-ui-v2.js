/* 情報Ⅰ 電子教材 v2 — v1レンダラーの後に47PARTをさらに自学向けへ精修する。 */
(() => {
  const baseRender = window.renderStudyLesson;
  const depth = window.ELECTRONIC_DEPTH_V2 || {};

  function currentLesson(){
    const id=new URLSearchParams(location.search).get('id') || 'b1-1';
    return studyLessonById(id);
  }

  function openerHTML(data){
    return `<div class="et-opener" id="opener"><small>まず考えてみよう</small><p>${escapeHTML(data.opener)}</p></div>`;
  }

  function readingGuideHTML(data){
    return `<div class="et-reading-guide">
      <div><b>このPARTの読み方</b><p>${escapeHTML(data.focus)}</p></div>
      <div><b>混同しやすいところ</b><p>${escapeHTML(data.trap)}</p></div>
    </div>`;
  }

  function sourceBadge(lesson){
    return `<div class="et-source-badge"><b>教材準拠</b><span>${escapeHTML(lesson.source)} の用語・定義・扱う範囲に沿って、文章・図解・例題・確認問題をWeb自学向けに再構成しています。</span></div>`;
  }

  function allQuestions(lesson,data){
    const original={q:lesson.quiz.question,choices:lesson.quiz.choices,answer:lesson.quiz.answer,why:lesson.quiz.explanation};
    return [original,...(data.qs||[])];
  }

  function checkHTML(lesson,data){
    const qs=allQuestions(lesson,data);
    return `<section class="lesson-section et-check-v2" id="check">
      <p class="lesson-section-label">CHECK</p>
      <h2>確認問題</h2>
      <div class="et-check-head"><p>暗記できたかではなく、用語を場面に当てはめられるかを3問で確認します。間違えた問題は、その場で解き直せます。</p></div>
      <div class="et-qstack">
        ${qs.map((q,qi)=>`<div class="et-qcard" data-q="${qi}" data-answer="${q.answer}">
          <div class="et-qcard-head"><b>${qi+1}</b><span>${escapeHTML(q.q)}</span></div>
          <div class="et-qchoices">${q.choices.map((choice,ci)=>`<button class="et-qchoice" type="button" data-choice="${ci}"><i>${ci+1}</i><span>${escapeHTML(choice)}</span></button>`).join('')}</div>
          <div class="et-qfeedback" data-feedback></div>
        </div>`).join('')}
      </div>
      <div class="et-check-score" data-check-score><span>このPARTの確認</span><strong>0 / ${qs.length} 正解</strong></div>
    </section>`;
  }

  function bindChecks(lesson,data){
    const section=document.querySelector('.et-check-v2');
    if(!section)return;
    const qs=allQuestions(lesson,data);
    const solved=new Map();
    const score=section.querySelector('[data-check-score]');
    const updateScore=()=>{
      const correct=[...solved.values()].filter(Boolean).length;
      score.querySelector('strong').textContent=`${correct} / ${qs.length} 正解`;
      score.classList.toggle('is-complete',correct===qs.length);
    };
    section.querySelectorAll('.et-qcard').forEach(card=>{
      const qi=Number(card.dataset.q), q=qs[qi];
      const buttons=[...card.querySelectorAll('.et-qchoice')];
      const feedback=card.querySelector('[data-feedback]');
      const answer=Number(card.dataset.answer);
      const reset=()=>{
        buttons.forEach(btn=>{btn.disabled=false;btn.classList.remove('is-correct','is-wrong');});
        feedback.classList.remove('is-visible'); feedback.innerHTML=''; solved.delete(qi); updateScore();
      };
      buttons.forEach(btn=>btn.addEventListener('click',()=>{
        if(buttons.some(x=>x.disabled))return;
        const choice=Number(btn.dataset.choice);
        buttons.forEach(x=>x.disabled=true);
        buttons[answer].classList.add('is-correct');
        if(choice!==answer)btn.classList.add('is-wrong');
        const correct=choice===answer;
        solved.set(qi,correct);
        feedback.innerHTML=`<strong>${correct?'正解です。':`正解は ${answer+1} です。`}</strong> ${escapeHTML(q.why || '')}${!correct?'<br><button type="button" class="et-qretry">もう一度解く</button>':''}`;
        feedback.classList.add('is-visible');
        feedback.querySelector('.et-qretry')?.addEventListener('click',reset);
        updateScore();
      }));
    });
  }

  function enhanceBody(lesson,data){
    const paper=document.querySelector('.lesson-paper');
    if(!paper)return;
    const goals=paper.querySelector('.lesson-goals');
    const terms=paper.querySelector('.lesson-terms');
    const anchor=terms || goals;
    if(anchor && !paper.querySelector('.et-opener')) anchor.insertAdjacentHTML('afterend',openerHTML(data));

    [...paper.querySelectorAll('#points .concept-block')].forEach((block,i)=>{
      const h3=block.querySelector('h3');
      if(h3)h3.setAttribute('data-et-index',String(i+1).padStart(2,'0'));
    });
    const pointsSection=paper.querySelector('#points');
    if(pointsSection){
      const label=pointsSection.querySelector('.lesson-section-label');
      const heading=pointsSection.querySelector('h2');
      const lead=pointsSection.querySelector('.et-section-lead');
      if(label)label.textContent='TEXT';
      if(heading)heading.textContent='本文を読む';
      if(lead)lead.textContent='図で全体像をつかんだら、教材の定義・区別・手順を文章で確認します。太字の用語だけを覚えるのではなく、前後の関係まで説明できる状態を目指します。';
      if(!pointsSection.querySelector('.et-reading-guide')) pointsSection.insertAdjacentHTML('beforeend',readingGuideHTML(data));
    }

    const routeText=paper.querySelector('.et-route a[href="#points"] span');
    if(routeText)routeText.textContent='本文';

    const oldCheck=paper.querySelector('#check');
    if(oldCheck) oldCheck.outerHTML=checkHTML(lesson,data);
    const src=paper.querySelector('.lesson-source');
    if(src){src.insertAdjacentHTML('beforebegin',sourceBadge(lesson));src.remove();}
  }

  window.renderStudyLesson=function renderStudyLessonV2(){
    baseRender();
    const lesson=currentLesson();
    if(!lesson || lesson.track!=='main')return;
    const data=depth[lesson.id];
    if(!data)return;
    document.body.classList.add('electronic-textbook-v2');
    enhanceBody(lesson,data);
    bindChecks(lesson,data);
  };
})();
