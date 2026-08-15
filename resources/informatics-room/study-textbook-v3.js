/* 情報Ⅰ 電子教材 v3 renderer
   既存v1/v2を土台に、47PARTの本文と実践問題を教材単位で置き換える。 */
(() => {
  const baseRender = window.renderStudyLesson;
  const dataMap = window.ELECTRONIC_TEXTBOOK_V3 || {};

  const current = () => {
    const id = new URLSearchParams(location.search).get('id') || 'b1-1';
    return studyLessonById(id);
  };

  function textSectionsHTML(data) {
    return `<section class="lesson-section et-textbook-body-v3" id="points">
      <p class="lesson-section-label">TEXT</p>
      <h2>本文を読む</h2>
      <p class="et-body-intro">図で全体像をつかんだら、定義・区別・手順を文章で確認します。用語だけを切り離して暗記せず、前後の関係まで説明できる状態を目指します。</p>
      <div class="et-textbook-sections">
        ${data.sections.map((section, index) => `<section class="et-textbook-section">
          <div class="et-section-no">${String(index + 1).padStart(2, '0')}</div>
          <div class="et-section-copy">
            <h3>${escapeHTML(section.title)}</h3>
            <p>${escapeHTML(section.body)}</p>
          </div>
        </section>`).join('')}
      </div>
      <aside class="et-checkpoint-v3"><b>ここを説明できればOK</b><p>${escapeHTML(data.checkpoint)}</p></aside>
    </section>`;
  }

  function practicalHTML(data) {
    const p = data.practical;
    return `<section class="lesson-section et-practical-section-v3" id="example">
      <p class="lesson-section-label">PRACTICE</p>
      <h2>教材型の改編例題</h2>
      <p class="et-body-intro">すぐに答えを開かず、まず自分のことば・式・図で考えてから確認します。</p>
      <article class="et-practical-v3">
        <header><span>例題</span><strong>${escapeHTML(p.title)}</strong></header>
        <div class="et-practical-prompt">${escapeHTML(p.prompt)}</div>
        <details class="et-hints-v3">
          <summary>考える手順を見る</summary>
          <ol>${p.steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol>
        </details>
        <details class="et-answer-v3">
          <summary>答え・解説を見る</summary>
          <p>${escapeHTML(p.answer)}</p>
        </details>
      </article>
    </section>`;
  }

  function annotateFigure(data) {
    const figure = document.querySelector('.et-figure');
    if (!figure || figure.querySelector('.et-figure-note-v3')) return;
    figure.insertAdjacentHTML('afterend', `<p class="et-figure-note-v3"><b>図の読み方</b>${escapeHTML(data.figureNote)}</p>`);
  }

  function replaceBody(data) {
    const old = document.querySelector('#points');
    if (old) old.outerHTML = textSectionsHTML(data);
  }

  function replacePractice(data) {
    const old = document.querySelector('#example');
    if (old) old.outerHTML = practicalHTML(data);
  }

  function polishRoute() {
    const route = document.querySelector('.et-route');
    if (!route) return;
    const labels = ['目標', '図解', '本文', '例題', '確認', 'まとめ'];
    route.querySelectorAll('a').forEach((a, i) => {
      const span = a.querySelector('span');
      if (span && labels[i]) span.textContent = labels[i];
    });
  }

  function addStudyCue() {
    const lead = document.querySelector('.lesson-lead');
    const route = document.querySelector('.et-route');
    if (!lead || !route || document.querySelector('.et-study-cue-v3')) return;
    route.insertAdjacentHTML('beforebegin', `<div class="et-study-cue-v3"><span>このPARTは</span><b>図で関係をつかむ → 本文で定義する → 例題で使う → 3問で確認</b></div>`);
  }

  function markAdvanced(lesson) {
    if (!lesson.advanced) return;
    const kicker = document.querySelector('.lesson-kicker');
    if (kicker && !document.querySelector('.et-advanced-badge-v3')) {
      kicker.insertAdjacentHTML('afterend', '<span class="et-advanced-badge-v3">発展</span>');
    }
  }

  window.renderStudyLesson = function renderStudyLessonV3() {
    baseRender();
    const lesson = current();
    if (!lesson || lesson.track !== 'main') return;
    const data = dataMap[lesson.id];
    if (!data) return;

    document.body.classList.add('electronic-textbook-v3');
    annotateFigure(data);
    replaceBody(data);
    replacePractice(data);
    polishRoute();
    addStudyCue();
    markAdvanced(lesson);

    // student-ui.js may add its old four-step route afterwards; only the six-step textbook route is kept.
    requestAnimationFrame(() => {
      document.querySelectorAll('.lesson-route').forEach(node => node.remove());
    });
  };

  const expected = (window.STUDY_MAIN || []).length;
  window.ELECTRONIC_TEXTBOOK_V3_COUNT = Object.keys(dataMap).length;
  if (expected && window.ELECTRONIC_TEXTBOOK_V3_COUNT !== expected) {
    console.warn(`[情報Ⅰ v3] ${window.ELECTRONIC_TEXTBOOK_V3_COUNT}/${expected} PART に本文データがあります。`);
  }
})();