/* 情報Ⅰ 学習ツール v1
   問題演習・共通テスト対策・用語一覧を本編と同じUI/データへ統合する。 */
(() => {
  const lessons = () => STUDY_DATA.mainLessons || [];
  const depth = () => window.ELECTRONIC_DEPTH_V2 || {};

  function pageIntro(kicker, title, lead, aside = '') {
    return `<section class="index-intro compact tool-intro">
      <div><p class="index-kicker">${escapeHTML(kicker)}</p><h1>${escapeHTML(title)}</h1><p class="index-lead">${escapeHTML(lead)}</p></div>
      ${aside ? `<div class="index-progress-box tool-intro-aside">${aside}</div>` : '<div></div>'}
    </section>`;
  }

  function lectureLabel(lesson) {
    return `第${lesson.lecture}講 PART${lesson.part}`;
  }

  function bestExplanation(lesson) {
    const correct = lesson.quiz?.choices?.[lesson.quiz.answer] || '';
    const hit = (lesson.points || []).find(point => point.title.includes(correct) || point.body.includes(correct));
    return hit?.body || lesson.quiz?.explanation || '';
  }

  function buildQuestionBank() {
    const bank = [];
    lessons().forEach(lesson => {
      if (lesson.quiz?.choices?.length) {
        bank.push({
          id:`${lesson.id}-base`, lessonId:lesson.id, lecture:lesson.lecture, part:lesson.part,
          question:lesson.quiz.question, choices:lesson.quiz.choices, answer:lesson.quiz.answer,
          why:bestExplanation(lesson)
        });
      }
      (depth()[lesson.id]?.qs || []).forEach((q, index) => bank.push({
        id:`${lesson.id}-d${index}`, lessonId:lesson.id, lecture:lesson.lecture, part:lesson.part,
        question:q.q, choices:q.choices, answer:q.answer, why:q.why || ''
      }));
    });
    return bank;
  }

  function shuffle(array) {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function questionCard(q, index) {
    const lesson = studyLessonById(q.lessonId);
    return `<article class="tool-question-card" data-qid="${q.id}" data-lecture="${q.lecture}" data-search="${escapeHTML([q.question,...q.choices,lesson?.title||''].join(' '))}">
      <div class="tool-question-meta"><span>問 ${index + 1}</span><a href="${lessonHref(q.lessonId)}">${lectureLabel(lesson)}　${escapeHTML(lesson.title)}</a></div>
      <p class="tool-question-text">${escapeHTML(q.question)}</p>
      <div class="tool-choice-list">
        ${q.choices.map((choice, ci) => `<button type="button" class="tool-choice" data-choice="${ci}"><i>${ci + 1}</i><span>${escapeHTML(choice)}</span></button>`).join('')}
      </div>
      <div class="tool-question-feedback" aria-live="polite"></div>
    </article>`;
  }

  function renderQuestionList(root, state) {
    let data = state.bank;
    if (state.lecture) data = data.filter(q => q.lecture === state.lecture);
    if (state.query) {
      const norm = state.query.toLowerCase().replace(/\s+/g,'');
      data = data.filter(q => {
        const lesson = studyLessonById(q.lessonId);
        return [q.question,...q.choices,lesson?.title||''].join(' ').toLowerCase().replace(/\s+/g,'').includes(norm);
      });
    }
    if (state.random) data = shuffle(data).slice(0, 20);
    state.visible = data;
    root.innerHTML = data.length
      ? data.map(questionCard).join('')
      : '<div class="tool-empty">条件に合う問題がありません。</div>';
    const count = document.querySelector('[data-tool-count]');
    if (count) count.textContent = `${data.length}問`;
    state.answers.clear();
    updateScore(state);
    bindQuestionCards(root, state);
  }

  function updateScore(state) {
    const el = document.querySelector('[data-tool-score]');
    if (!el) return;
    const answered = state.answers.size;
    const correct = [...state.answers.values()].filter(Boolean).length;
    el.innerHTML = `<span>回答 ${answered} / ${state.visible.length}</span><strong>正解 ${correct}</strong>`;
    el.classList.toggle('is-complete', answered > 0 && answered === state.visible.length);
  }

  function bindQuestionCards(root, state) {
    root.querySelectorAll('.tool-question-card').forEach(card => {
      const q = state.visible.find(item => item.id === card.dataset.qid);
      if (!q) return;
      const buttons = [...card.querySelectorAll('.tool-choice')];
      const feedback = card.querySelector('.tool-question-feedback');
      const reset = () => {
        buttons.forEach(b => { b.disabled = false; b.classList.remove('is-correct','is-wrong'); });
        feedback.className = 'tool-question-feedback';
        feedback.innerHTML = '';
        state.answers.delete(q.id);
        updateScore(state);
      };
      buttons.forEach(button => button.addEventListener('click', () => {
        if (buttons.some(b => b.disabled)) return;
        const chosen = Number(button.dataset.choice);
        const correct = chosen === q.answer;
        buttons.forEach(b => b.disabled = true);
        buttons[q.answer].classList.add('is-correct');
        if (!correct) button.classList.add('is-wrong');
        state.answers.set(q.id, correct);
        feedback.className = `tool-question-feedback is-visible ${correct?'is-correct':'is-wrong'}`;
        feedback.innerHTML = `<strong>${correct?'正解です。':`正解は ${q.answer + 1} です。`}</strong><p>${escapeHTML(q.why)}</p>${!correct?'<button type="button" class="tool-retry">もう一度解く</button>':''}`;
        feedback.querySelector('.tool-retry')?.addEventListener('click', reset);
        updateScore(state);
      }));
    });
  }

  window.renderUnifiedQuestions = function renderUnifiedQuestions() {
    const bank = buildQuestionBank();
    const params = new URLSearchParams(location.search);
    const lectureParam = Number(params.get('lecture'));
    const state = {bank, visible:[], lecture:Number.isInteger(lectureParam)&&lectureParam>=1&&lectureParam<=9?lectureParam:0, query:'', random:false, answers:new Map()};
    document.body.innerHTML = `${renderStudyHeader('practice')}<main class="study-shell index-shell tool-shell">
      ${pageIntro('PRACTICE / 本編9講','確認問題を、解きながら定着させる。','本編47PARTの教材型確認問題をまとめて解けます。用語の暗記だけでなく、具体的な場面への当てはめまで確認します。',`<span>問題数</span><strong class="tool-big-number">${bank.length}</strong><small>本編47PARTから出題</small>`)}
      <section class="tool-practice-guide"><b>解き方</b><span>① 講を選ぶ</span><span>② 先に自分で答える</span><span>③ 解説を読む</span><span>④ 間違えたらその場で解き直す</span></section>
      <div class="tool-toolbar">
        <div class="tool-filter" role="group" aria-label="講で絞り込む">
          <button type="button" data-lecture="0">すべて</button>
          ${STUDY_DATA.lectures.map(meta => `<button type="button" data-lecture="${meta.no}">第${meta.no}講</button>`).join('')}
          <button type="button" data-random="1">ランダム20問</button>
        </div>
        <label class="tool-search"><span class="sr-only">問題を検索</span><input type="search" id="toolQuestionSearch" placeholder="問題・用語を検索"></label>
      </div>
      <div class="tool-session-bar"><span data-tool-count>${bank.length}問</span><div data-tool-score><span>回答 0 / 0</span><strong>正解 0</strong></div></div>
      <section class="tool-question-list" id="toolQuestionList"></section>
    </main>`;
    const root = document.querySelector('#toolQuestionList');
    const buttons = [...document.querySelectorAll('[data-lecture]')];
    const randomBtn = document.querySelector('[data-random]');
    const search = document.querySelector('#toolQuestionSearch');
    const applyActive = () => {
      buttons.forEach(b => b.classList.toggle('is-active', !state.random && Number(b.dataset.lecture) === state.lecture));
      randomBtn?.classList.toggle('is-active', state.random);
    };
    buttons.forEach(button => button.addEventListener('click', () => {
      state.lecture = Number(button.dataset.lecture); state.random = false; applyActive(); renderQuestionList(root,state);
    }));
    randomBtn?.addEventListener('click', () => { state.lecture=0; state.random=true; applyActive(); renderQuestionList(root,state); });
    search?.addEventListener('input', () => { state.query=search.value.trim(); state.random=false; applyActive(); renderQuestionList(root,state); });
    applyActive(); renderQuestionList(root,state);
  };

  window.renderUnifiedExam = function renderUnifiedExam() {
    document.body.innerHTML = `${renderStudyHeader('practice')}<main class="study-shell index-shell tool-shell">
      ${pageIntro('COMMON TEST / 情報Ⅰ','問題演習','知識点を読んだ後は、講別に確認問題を解き、間違えたPARTへすぐ戻れるようにします。現在の演習は、提供教材の実践問題・確認問題の型をWeb向けに改編した学習用問題です。')}
      <section class="tool-route-grid">
        <a href="questions.html" class="tool-route-card"><small>01</small><strong>全範囲を刷る</strong><p>本編47PARTの確認問題をまとめて解く。</p><span>問題一覧へ →</span></a>
        <a href="questions.html?lecture=6" class="tool-route-card"><small>02</small><strong>アルゴリズム・プログラミング</strong><p>第6講だけに絞って解く。</p><span>第6講の問題へ →</span></a>
        <a href="questions.html?lecture=9" class="tool-route-card"><small>03</small><strong>データの活用</strong><p>尺度・代表値・相関・回帰を続けて確認。</p><span>第9講の問題へ →</span></a>
      </section>
      <div class="curriculum-toolbar tool-section-title"><div><p class="section-label">9 LECTURES</p><h2>講ごとに復習する</h2></div><p>「問題を解く」から入って、分からなかったら「本文へ戻る」の順でも使えます。</p></div>
      <div class="tool-lecture-list">
        ${STUDY_DATA.lectures.map(meta => {
          const first = lessons().find(x => x.lecture === meta.no);
          const count = lessons().filter(x => x.lecture === meta.no).length * 3;
          return `<section class="tool-lecture-row"><div class="tool-lecture-no"><span>第</span><b>${meta.no}</b><span>講</span></div><div><h3>${escapeHTML(meta.title)}</h3><p>${lessons().filter(x=>x.lecture===meta.no).length} PART / 約${count}問</p></div><div class="tool-lecture-actions"><a href="questions.html?lecture=${meta.no}">問題を解く</a>${first?`<a href="${lessonHref(first.id)}">本文から読む</a>`:''}</div></section>`;
        }).join('')}
      </div>
      <section class="tool-note-panel"><div><span>HOW TO USE</span><h2>自学では「読む → 解く → 戻る」を短く回す</h2></div><p>一度で全部覚える必要はありません。本文を読んだ直後に確認問題を解き、根拠を説明できなかった問題だけPART本文へ戻ると、知識点と問題形式が結び付きます。</p></section>
    </main>`;
  };

  function glossaryItems() {
    const map = new Map();
    lessons().forEach(lesson => {
      (lesson.terms || []).forEach(term => {
        if (map.has(term)) return;
        const point = (lesson.points || []).find(p => p.title.includes(term) || p.body.includes(term)) || (lesson.points || [])[0];
        map.set(term, {term, desc:point?.body || lesson.lead || '', lesson});
      });
    });
    return [...map.values()].sort((a,b) => a.term.localeCompare(b.term,'ja'));
  }

  window.renderUnifiedGlossary = function renderUnifiedGlossary() {
    const items = glossaryItems();
    const params = new URLSearchParams(location.search);
    const initial = params.get('q') || '';
    document.body.innerHTML = `${renderStudyHeader('glossary')}<main class="study-shell index-shell tool-shell">
      ${pageIntro('GLOSSARY / 本編9講','用語一覧','本編47PARTに登場する用語を、関連する本文と一緒に探せます。用語だけを丸暗記するのではなく、必ず元のPARTへ戻って前後の関係まで確認してください。',`<span>収録語</span><strong class="tool-big-number">${items.length}</strong><small>教材9講・47PARTから整理</small>`)}
      <div class="tool-glossary-toolbar"><label class="tool-search wide"><input id="glossarySearch" type="search" value="${escapeHTML(initial)}" placeholder="用語を検索　例：標本化、著作権、相関係数"></label><span id="glossaryCount">${items.length}語</span></div>
      <div class="tool-glossary-list" id="glossaryList"></div>
    </main>`;
    const list = document.querySelector('#glossaryList');
    const input = document.querySelector('#glossarySearch');
    const counter = document.querySelector('#glossaryCount');
    const render = () => {
      const q = input.value.trim().toLowerCase().replace(/\s+/g,'');
      const visible = items.filter(item => !q || `${item.term}${item.desc}${item.lesson.title}`.toLowerCase().replace(/\s+/g,'').includes(q));
      counter.textContent = `${visible.length}語`;
      list.innerHTML = visible.map(item => `<article class="tool-glossary-row"><div class="tool-glossary-term"><strong>${escapeHTML(item.term)}</strong><span>${lectureLabel(item.lesson)}</span></div><p>${escapeHTML(item.desc)}</p><a href="${lessonHref(item.lesson.id)}">${escapeHTML(item.lesson.title)}で確認 →</a></article>`).join('') || '<div class="tool-empty">該当する用語がありません。</div>';
    };
    input.addEventListener('input', render); render();
  };
})();