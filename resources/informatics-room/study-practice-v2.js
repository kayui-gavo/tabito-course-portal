/* 情報Ⅰ 問題演習 v2
   本編47PARTの確認問題に、各PARTの仕上げ問題も統合する。
   選択・数値入力・文字入力・並べ替えを同一UIで扱う。 */
(() => {
  const lessons = () => STUDY_DATA.mainLessons || [];
  const depth = () => window.ELECTRONIC_DEPTH_V2 || {};
  const finish = () => window.ELECTRONIC_CHALLENGE_V4 || {};

  const esc = value => escapeHTML(value);
  const lessonLabel = lesson => `第${lesson.lecture}講 PART${lesson.part}`;
  const normalize = value => String(value ?? '')
    .trim().toLowerCase().replace(/\s+/g,'')
    .replace(/[，、]/g, ',').replace(/₂/g,'2');

  function bestExplanation(lesson) {
    const correct = lesson.quiz?.choices?.[lesson.quiz.answer] || '';
    const hit = (lesson.points || []).find(point => point.title.includes(correct) || point.body.includes(correct));
    return hit?.body || lesson.quiz?.explanation || '';
  }

  function bank() {
    const out = [];
    lessons().forEach(lesson => {
      if (lesson.quiz?.choices?.length) {
        out.push({id:`${lesson.id}-base`,lessonId:lesson.id,lecture:lesson.lecture,part:lesson.part,type:'choice',q:lesson.quiz.question,choices:lesson.quiz.choices,answer:lesson.quiz.answer,why:bestExplanation(lesson),level:'基本'});
      }
      (depth()[lesson.id]?.qs || []).forEach((q,index) => out.push({id:`${lesson.id}-d${index}`,lessonId:lesson.id,lecture:lesson.lecture,part:lesson.part,type:'choice',q:q.q,choices:q.choices,answer:q.answer,why:q.why||'',level:'確認'}));
      const c = finish()[lesson.id];
      if (c) out.push({id:`${lesson.id}-finish`,lessonId:lesson.id,lecture:lesson.lecture,part:lesson.part,type:c.type,q:c.q,choices:c.choices||[],items:c.items||[],answer:c.answer,why:c.why||'',level:'仕上げ'});
    });
    return out;
  }

  function shuffle(items) {
    const copy = items.slice();
    for (let i=copy.length-1;i>0;i--) {
      const j=Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }

  function answerUI(item) {
    if (item.type === 'choice') {
      return `<div class="tool-choice-list">${item.choices.map((choice,i)=>`<button type="button" class="tool-choice" data-choice="${i}"><i>${i+1}</i><span>${esc(choice)}</span></button>`).join('')}</div>`;
    }
    if (item.type === 'order') {
      return `<div class="practice-order-v2">
        <p class="practice-order-note">下の項目を、正しい順にクリックしてください。</p>
        <div class="practice-order-bank" data-order-bank>${item.items.map((value,i)=>`<button type="button" data-order-value="${esc(value)}" data-origin="${i}">${esc(value)}</button>`).join('')}</div>
        <div class="practice-order-answer" data-order-answer><span>選んだ順</span></div>
        <div class="practice-input-actions"><button type="button" data-order-check>答え合わせ</button><button type="button" class="is-secondary" data-order-reset>やり直す</button></div>
      </div>`;
    }
    const mode = item.type === 'number' ? 'decimal' : 'text';
    const placeholder = item.type === 'number' ? '数値を入力' : '答えを入力';
    return `<div class="practice-input-v2"><input type="text" inputmode="${mode}" data-practice-input placeholder="${placeholder}"><button type="button" data-input-check>答え合わせ</button></div>`;
  }

  function card(item,index) {
    const lesson=studyLessonById(item.lessonId);
    const searchable=[item.q,...(item.choices||[]),...(item.items||[]),lesson?.title||'',item.level].join(' ');
    return `<article class="tool-question-card practice-card-v2" data-qid="${item.id}" data-lecture="${item.lecture}" data-search="${esc(searchable)}">
      <div class="tool-question-meta"><span>問 ${index+1}</span><a href="${lessonHref(item.lessonId)}">${lessonLabel(lesson)}　${esc(lesson.title)}</a><b class="practice-level-v2">${esc(item.level)}</b></div>
      <p class="tool-question-text">${esc(item.q)}</p>
      ${answerUI(item)}
      <div class="tool-question-feedback" aria-live="polite"></div>
    </article>`;
  }

  function feedback(card,correct,item) {
    const box=card.querySelector('.tool-question-feedback');
    box.className=`tool-question-feedback is-visible ${correct?'is-correct':'is-wrong'}`;
    box.innerHTML=`<strong>${correct?'正解です。':'もう一度確認しましょう。'}</strong><p>${esc(item.why||'本文の該当箇所に戻り、根拠まで確認してください。')}</p>${!correct?`<p class="practice-back-v2"><a href="${lessonHref(item.lessonId)}">このPARTの本文へ戻る →</a></p>`:''}`;
  }

  function bindCard(card,item,state) {
    const setResult=correct=>{state.answers.set(item.id,correct);updateScore(state);feedback(card,correct,item);};
    if (item.type === 'choice') {
      const buttons=[...card.querySelectorAll('[data-choice]')];
      buttons.forEach(button=>button.addEventListener('click',()=>{
        if (buttons.some(x=>x.disabled)) return;
        const picked=Number(button.dataset.choice);
        buttons.forEach(x=>x.disabled=true);
        buttons[item.answer]?.classList.add('is-correct');
        if (picked!==item.answer) button.classList.add('is-wrong');
        setResult(picked===item.answer);
      }));
      return;
    }
    if (item.type === 'order') {
      const bank=card.querySelector('[data-order-bank]');
      const answer=card.querySelector('[data-order-answer]');
      const move=e=>{
        const btn=e.target.closest('button[data-order-value]'); if(!btn)return;
        (btn.parentElement===bank?answer:bank).appendChild(btn);
      };
      bank.addEventListener('click',move); answer.addEventListener('click',move);
      card.querySelector('[data-order-reset]').addEventListener('click',()=>{
        [...bank.querySelectorAll('button'),...answer.querySelectorAll('button')]
          .sort((a,b)=>Number(a.dataset.origin)-Number(b.dataset.origin))
          .forEach(btn=>bank.appendChild(btn));
        state.answers.delete(item.id); updateScore(state);
        const box=card.querySelector('.tool-question-feedback'); box.className='tool-question-feedback'; box.innerHTML='';
      });
      card.querySelector('[data-order-check]').addEventListener('click',()=>{
        const got=[...answer.querySelectorAll('button')].map(btn=>btn.dataset.orderValue);
        const correct=got.length===item.answer.length&&got.every((x,i)=>x===item.answer[i]);
        setResult(correct);
      });
      return;
    }
    const input=card.querySelector('[data-practice-input]');
    const check=()=>setResult(normalize(input.value)===normalize(item.answer));
    card.querySelector('[data-input-check]').addEventListener('click',check);
    input.addEventListener('keydown',e=>{if(e.key==='Enter')check();});
  }

  function updateScore(state) {
    const score=document.querySelector('[data-tool-score]');
    if(!score)return;
    const answered=state.answers.size;
    const correct=[...state.answers.values()].filter(Boolean).length;
    score.innerHTML=`<span>回答 ${answered} / ${state.visible.length}</span><strong>正解 ${correct}</strong>`;
    score.classList.toggle('is-complete',answered>0&&answered===state.visible.length);
  }

  function visibleItems(state) {
    let data=state.bank;
    if(state.lecture)data=data.filter(q=>q.lecture===state.lecture);
    if(state.query){
      const q=normalize(state.query);
      data=data.filter(item=>{
        const lesson=studyLessonById(item.lessonId);
        return normalize([item.q,...(item.choices||[]),...(item.items||[]),lesson?.title||''].join(' ')).includes(q);
      });
    }
    if(state.random)data=shuffle(data).slice(0,20);
    return data;
  }

  function renderList(state) {
    const root=document.querySelector('#toolQuestionList');
    state.visible=visibleItems(state);
    state.answers.clear();
    root.innerHTML=state.visible.length?state.visible.map(card).join(''):'<div class="tool-empty">条件に合う問題がありません。</div>';
    document.querySelector('[data-tool-count]').textContent=`${state.visible.length}問`;
    updateScore(state);
    root.querySelectorAll('.tool-question-card').forEach(node=>{
      const item=state.visible.find(q=>q.id===node.dataset.qid); if(item)bindCard(node,item,state);
    });
  }

  window.renderUnifiedQuestions=function renderUnifiedQuestionsV2(){
    const all=bank();
    const params=new URLSearchParams(location.search);
    const lectureParam=Number(params.get('lecture'));
    const state={bank:all,visible:[],lecture:Number.isInteger(lectureParam)&&lectureParam>=1&&lectureParam<=9?lectureParam:0,query:'',random:false,answers:new Map()};
    document.body.innerHTML=`${renderStudyHeader('practice')}<main class="study-shell index-shell tool-shell">
      <section class="index-intro compact tool-intro">
        <div><p class="index-kicker">PRACTICE / 本編9講</p><h1>確認問題を、解きながら定着させる。</h1><p class="index-lead">本編47PARTの確認問題と仕上げ問題をまとめています。四択だけでなく、数値入力・文字入力・並べ替えも使って、用語の暗記から一段進んだ理解を確認します。</p></div>
        <div class="index-progress-box tool-intro-aside"><span>収録問題</span><strong class="tool-big-number">${all.length}</strong><small>教材9講・47PARTから構成</small></div>
      </section>
      <section class="tool-practice-guide"><b>解き方</b><span>① 講を選ぶ</span><span>② 根拠を考えて答える</span><span>③ 解説を読む</span><span>④ 間違えたPARTへ戻る</span></section>
      <div class="tool-toolbar">
        <div class="tool-filter" role="group" aria-label="講で絞り込む"><button type="button" data-lecture="0">すべて</button>${STUDY_DATA.lectures.map(meta=>`<button type="button" data-lecture="${meta.no}">第${meta.no}講</button>`).join('')}<button type="button" data-random="1">ランダム20問</button></div>
        <label class="tool-search"><span class="sr-only">問題を検索</span><input type="search" id="toolQuestionSearch" placeholder="問題・用語を検索"></label>
      </div>
      <div class="tool-session-bar"><span data-tool-count>${all.length}問</span><div data-tool-score><span>回答 0 / 0</span><strong>正解 0</strong></div></div>
      <section class="tool-question-list" id="toolQuestionList"></section>
    </main>`;
    const lectureButtons=[...document.querySelectorAll('[data-lecture]')];
    const randomBtn=document.querySelector('[data-random]');
    const search=document.querySelector('#toolQuestionSearch');
    const active=()=>{lectureButtons.forEach(b=>b.classList.toggle('is-active',!state.random&&Number(b.dataset.lecture)===state.lecture));randomBtn.classList.toggle('is-active',state.random);};
    lectureButtons.forEach(btn=>btn.addEventListener('click',()=>{state.lecture=Number(btn.dataset.lecture);state.random=false;active();renderList(state);}));
    randomBtn.addEventListener('click',()=>{state.lecture=0;state.random=true;active();renderList(state);});
    search.addEventListener('input',()=>{state.query=search.value.trim();state.random=false;active();renderList(state);});
    active();renderList(state);
  };
})();