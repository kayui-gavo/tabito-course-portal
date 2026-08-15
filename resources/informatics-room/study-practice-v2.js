/* 情報Ⅰ 問題演習 v8
   47PARTの自動採点問題に、原教材の実践問題型を再構成した記述・思考演習も統合する。
   選択・数値入力・文字入力・並べ替え・自己評価型記述を同一UIで扱い、誤答復習を保存する。 */
(() => {
  const lessons = () => STUDY_DATA.mainLessons || [];
  const depth = () => window.ELECTRONIC_DEPTH_V2 || {};
  const finish = () => window.ELECTRONIC_CHALLENGE_V4 || {};
  const sourcePractice = () => window.SOURCE_PRACTICE_V7 || {};
  const WRONG_KEY = 'tabito-info-practice-wrong-v2';

  const esc = value => escapeHTML(value);
  const lessonLabel = lesson => `第${lesson.lecture}講 PART${lesson.part}`;
  const normalize = value => String(value ?? '')
    .trim().toLowerCase().replace(/\s+/g,'')
    .replace(/[，、]/g, ',').replace(/₂/g,'2');

  function readWrong() {
    try { return new Set(JSON.parse(localStorage.getItem(WRONG_KEY) || '[]')); }
    catch (_) { return new Set(); }
  }
  function saveWrong(set) {
    try { localStorage.setItem(WRONG_KEY, JSON.stringify([...set])); } catch (_) {}
  }

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
      (sourcePractice()[lesson.id] || []).forEach((task,index) => out.push({
        id:`${lesson.id}-source-${index}`,lessonId:lesson.id,lecture:lesson.lecture,part:lesson.part,type:'open',
        title:task.title||'',q:task.q,answerText:task.a,why:task.point||'',level:'実践'
      }));
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
    if (item.type === 'open') {
      return `<div class="practice-open-v8">
        <p class="practice-open-v8-note">紙やメモに、根拠を含めて自分の答えを書いてから解答を開いてください。</p>
        <div class="practice-open-v8-actions"><button type="button" data-open-reveal>解答・考え方を見る</button></div>
        <div class="practice-open-v8-answer" data-open-answer hidden><b>解答・考え方</b><p>${esc(item.answerText||'')}</p></div>
        <div class="practice-open-v8-grade" data-open-grade hidden><span>自分の説明と比べて評価</span><button type="button" data-open-good>説明できた</button><button type="button" data-open-review>要復習</button></div>
      </div>`;
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

  function card(item,index,state) {
    const lesson=studyLessonById(item.lessonId);
    const searchable=[item.title||'',item.q,...(item.choices||[]),...(item.items||[]),lesson?.title||'',...(lesson?.terms||[]),item.level].join(' ');
    return `<article class="tool-question-card practice-card-v2 ${item.type==='open'?'is-open-practice ':''}${state.wrong.has(item.id)?'is-in-wrong-book':''}" data-qid="${item.id}" data-lecture="${item.lecture}" data-search="${esc(searchable)}">
      <div class="tool-question-meta"><span>問 ${index+1}</span><a href="${lessonHref(item.lessonId)}">${lessonLabel(lesson)}　${esc(lesson.title)}</a><b class="practice-level-v2">${esc(item.level)}</b></div>
      ${item.title?`<span class="practice-title-v8">${esc(item.title)}</span>`:''}
      <p class="tool-question-text">${esc(item.q)}</p>
      ${answerUI(item)}
      <div class="tool-question-feedback" aria-live="polite"></div>
    </article>`;
  }

  function feedback(card,correct,item) {
    const box=card.querySelector('.tool-question-feedback');
    const open=item.type==='open';
    const head=correct ? (open?'説明できたとして記録しました。':'正解です。') : (open?'要復習として記録しました。':'もう一度確認しましょう。');
    box.className=`tool-question-feedback is-visible ${correct?'is-correct':'is-wrong'}`;
    box.innerHTML=`<strong>${head}</strong><p>${esc(item.why||'本文の該当箇所に戻り、根拠まで確認してください。')}</p><div class="practice-feedback-actions">${!correct?'<button type="button" class="tool-retry" data-practice-retry>もう一度解く</button>':''}<a href="${lessonHref(item.lessonId)}">このPARTの本文へ →</a></div>`;
  }

  function markWrong(state,item,correct,card) {
    if(correct) state.wrong.delete(item.id); else state.wrong.add(item.id);
    saveWrong(state.wrong);
    card.classList.toggle('is-in-wrong-book',!correct);
    updateWrongButton(state);
  }

  function clearCard(card,item,state) {
    state.answers.delete(item.id);
    card.querySelectorAll('.tool-choice').forEach(b=>{b.disabled=false;b.classList.remove('is-correct','is-wrong');});
    const input=card.querySelector('[data-practice-input]'); if(input){input.value='';input.removeAttribute('aria-invalid');}
    const bank=card.querySelector('[data-order-bank]');
    const answer=card.querySelector('[data-order-answer]');
    if(bank&&answer){
      [...bank.querySelectorAll('button'),...answer.querySelectorAll('button')]
        .sort((a,b)=>Number(a.dataset.origin)-Number(b.dataset.origin))
        .forEach(btn=>bank.appendChild(btn));
    }
    const openAnswer=card.querySelector('[data-open-answer]'); if(openAnswer)openAnswer.hidden=true;
    const openGrade=card.querySelector('[data-open-grade]'); if(openGrade)openGrade.hidden=true;
    const reveal=card.querySelector('[data-open-reveal]'); if(reveal)reveal.hidden=false;
    const box=card.querySelector('.tool-question-feedback'); if(box){box.className='tool-question-feedback';box.innerHTML='';}
    updateScore(state);
  }

  function bindCard(card,item,state) {
    const setResult=correct=>{
      state.answers.set(item.id,correct);
      markWrong(state,item,correct,card);
      updateScore(state);
      feedback(card,correct,item);
      card.querySelector('[data-practice-retry]')?.addEventListener('click',()=>clearCard(card,item,state));
    };
    if (item.type === 'open') {
      const reveal=card.querySelector('[data-open-reveal]');
      const answer=card.querySelector('[data-open-answer]');
      const grade=card.querySelector('[data-open-grade]');
      reveal?.addEventListener('click',()=>{reveal.hidden=true;answer.hidden=false;grade.hidden=false;});
      card.querySelector('[data-open-good]')?.addEventListener('click',()=>setResult(true));
      card.querySelector('[data-open-review]')?.addEventListener('click',()=>setResult(false));
      return;
    }
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
      card.querySelector('[data-order-reset]').addEventListener('click',()=>clearCard(card,item,state));
      card.querySelector('[data-order-check]').addEventListener('click',()=>{
        const got=[...answer.querySelectorAll('button')].map(btn=>btn.dataset.orderValue);
        const correct=got.length===item.answer.length&&got.every((x,i)=>x===item.answer[i]);
        setResult(correct);
      });
      return;
    }
    const input=card.querySelector('[data-practice-input]');
    const check=()=>{
      const correct=normalize(input.value)===normalize(item.answer);
      input.setAttribute('aria-invalid',String(!correct));
      setResult(correct);
    };
    card.querySelector('[data-input-check]').addEventListener('click',check);
    input.addEventListener('keydown',e=>{if(e.key==='Enter')check();});
  }

  function updateScore(state) {
    const score=document.querySelector('[data-tool-score]');
    if(!score)return;
    const answered=state.answers.size;
    const correct=[...state.answers.values()].filter(Boolean).length;
    score.innerHTML=`<span>回答・自己評価 ${answered} / ${state.visible.length}</span><strong>定着 ${correct}</strong>`;
    score.classList.toggle('is-complete',answered>0&&answered===state.visible.length);
  }

  function updateWrongButton(state) {
    const btn=document.querySelector('[data-wrong-only]');
    if(!btn)return;
    btn.innerHTML=`要復習だけ <small>${state.wrong.size}</small>`;
    btn.classList.toggle('is-active',state.wrongOnly);
  }

  function visibleItems(state) {
    let data=state.bank;
    if(state.lecture)data=data.filter(q=>q.lecture===state.lecture);
    if(state.mode==='auto')data=data.filter(q=>q.type!=='open');
    if(state.mode==='open')data=data.filter(q=>q.type==='open');
    if(state.wrongOnly)data=data.filter(q=>state.wrong.has(q.id));
    if(state.query){
      const q=normalize(state.query);
      data=data.filter(item=>{
        const lesson=studyLessonById(item.lessonId);
        return normalize([item.title||'',item.q,...(item.choices||[]),...(item.items||[]),lesson?.title||'',...(lesson?.terms||[])].join(' ')).includes(q);
      });
    }
    if(state.random)data=shuffle(data).slice(0,20);
    return data;
  }

  function renderList(state) {
    const root=document.querySelector('#toolQuestionList');
    state.visible=visibleItems(state);
    state.answers.clear();
    root.innerHTML=state.visible.length?state.visible.map((item,index)=>card(item,index,state)).join(''):'<div class="tool-empty">条件に合う問題がありません。</div>';
    document.querySelector('[data-tool-count]').textContent=`${state.visible.length}問`;
    updateScore(state); updateWrongButton(state);
    root.querySelectorAll('.tool-question-card').forEach(node=>{
      const item=state.visible.find(q=>q.id===node.dataset.qid); if(item)bindCard(node,item,state);
    });
  }

  window.renderUnifiedQuestions=function renderUnifiedQuestionsV8(){
    const all=bank();
    const autoCount=all.filter(x=>x.type!=='open').length;
    const openCount=all.filter(x=>x.type==='open').length;
    const params=new URLSearchParams(location.search);
    const lectureParam=Number(params.get('lecture'));
    const state={bank:all,visible:[],lecture:Number.isInteger(lectureParam)&&lectureParam>=1&&lectureParam<=9?lectureParam:0,query:'',random:false,wrongOnly:params.get('wrong')==='1',mode:'all',wrong:readWrong(),answers:new Map()};
    document.body.innerHTML=`${renderStudyHeader('practice')}<main class="study-shell index-shell tool-shell">
      <section class="index-intro compact tool-intro">
        <div><p class="index-kicker">PRACTICE / 本編9講</p><h1>確認問題を、解きながら定着させる。</h1><p class="index-lead">自動採点の確認・仕上げ問題に加え、原教材の実践問題で使う判断・計算・説明の型を再構成した記述・思考演習も収録しています。記述問題は解答を開く前に自分の根拠を書き、「説明できた／要復習」で自己評価します。</p></div>
        <div class="index-progress-box tool-intro-aside"><span>収録問題</span><strong class="tool-big-number">${all.length}</strong><small>自動採点 ${autoCount} / 記述・思考 ${openCount}</small></div>
      </section>
      <section class="tool-practice-guide"><b>解き方</b><span>① 講・形式を選ぶ</span><span>② 根拠を考えて答える</span><span>③ 解説と比較する</span><span>④ 要復習だけ解き直す</span></section>
      <div class="tool-toolbar">
        <div class="tool-filter" role="group" aria-label="講で絞り込む"><button type="button" data-lecture="0">すべて</button>${STUDY_DATA.lectures.map(meta=>`<button type="button" data-lecture="${meta.no}">第${meta.no}講</button>`).join('')}<button type="button" data-random="1">ランダム20問</button><button type="button" data-wrong-only>要復習だけ <small>${state.wrong.size}</small></button></div>
        <div class="tool-mode-filter-v8" role="group" aria-label="問題形式で絞り込む"><button type="button" data-mode="all">全形式</button><button type="button" data-mode="auto">自動採点</button><button type="button" data-mode="open">記述・思考</button></div>
        <label class="tool-search"><span class="sr-only">問題を検索</span><input type="search" id="toolQuestionSearch" placeholder="問題・用語を検索"></label>
      </div>
      <div class="tool-session-bar"><span data-tool-count>${all.length}問</span><div data-tool-score><span>回答・自己評価 0 / 0</span><strong>定着 0</strong></div></div>
      <section class="tool-question-list" id="toolQuestionList"></section>
    </main>`;
    const lectureButtons=[...document.querySelectorAll('[data-lecture]')];
    const modeButtons=[...document.querySelectorAll('[data-mode]')];
    const randomBtn=document.querySelector('[data-random]');
    const wrongBtn=document.querySelector('[data-wrong-only]');
    const search=document.querySelector('#toolQuestionSearch');
    const active=()=>{
      lectureButtons.forEach(b=>b.classList.toggle('is-active',!state.random&&!state.wrongOnly&&Number(b.dataset.lecture)===state.lecture));
      modeButtons.forEach(b=>b.classList.toggle('is-active',b.dataset.mode===state.mode));
      randomBtn.classList.toggle('is-active',state.random); updateWrongButton(state);
    };
    lectureButtons.forEach(btn=>btn.addEventListener('click',()=>{state.lecture=Number(btn.dataset.lecture);state.random=false;state.wrongOnly=false;active();renderList(state);}));
    modeButtons.forEach(btn=>btn.addEventListener('click',()=>{state.mode=btn.dataset.mode;state.random=false;state.wrongOnly=false;active();renderList(state);}));
    randomBtn.addEventListener('click',()=>{state.lecture=0;state.random=true;state.wrongOnly=false;active();renderList(state);});
    wrongBtn.addEventListener('click',()=>{state.wrongOnly=!state.wrongOnly;state.random=false;active();renderList(state);});
    search.addEventListener('input',()=>{state.query=search.value.trim();state.random=false;active();renderList(state);});
    active();renderList(state);
  };
})();