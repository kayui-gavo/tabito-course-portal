/* 情報Ⅰ 電子教材 v5 — 自学用詳細ノート
   v3/v4の本文・図解・例題を残しつつ、教材由来の要点データを再び本文に統合する。
   47PARTすべてで「定義→具体例→混同しやすい点→用語確認」まで読める構成。 */
(() => {
  const baseRender = window.renderStudyLesson;
  const depth = window.ELECTRONIC_DEPTH_V2 || {};

  function currentLesson() {
    const id = new URLSearchParams(location.search).get('id') || 'b1-1';
    return studyLessonById(id);
  }

  function normalizeText(text) {
    return String(text || '').replace(/\s+/g, '').replace(/[、。，．・（）()「」『』]/g, '');
  }

  function isNearDuplicate(point, proseSections) {
    const p = normalizeText(point.body);
    if (!p) return true;
    return proseSections.some(section => {
      const s = normalizeText(section.body);
      if (!s) return false;
      const head = p.slice(0, Math.min(32, p.length));
      return head.length >= 12 && s.includes(head);
    });
  }

  function noteBlocks(lesson) {
    const v3 = (window.ELECTRONIC_TEXTBOOK_V3 || {})[lesson.id];
    const prose = v3?.sections || [];
    const all = lesson.points || [];
    const filtered = all.filter(point => !isNearDuplicate(point, prose));
    // v3本文と重なる場合でも、定義一覧として最低2項目は残す。
    return filtered.length >= 2 ? filtered : all;
  }

  function detailHTML(lesson) {
    const d = depth[lesson.id] || {};
    const notes = noteBlocks(lesson);
    const terms = lesson.terms || [];
    return `<div class="et-detail-v5" data-et-detail-v5>
      <div class="et-detail-v5-head">
        <div><span>TEXTBOOK NOTES</span><h3>教科書ノートでもう一段詳しく</h3></div>
        <p>本文で流れを理解したあと、教科書の定義・補足・具体例を細かく確認します。ここまで説明できれば、このPARTを自力で復習できます。</p>
      </div>
      <div class="et-detail-v5-notes">
        ${notes.map((point, i) => `<section class="et-detail-v5-note">
          <div class="et-detail-v5-index">${String(i + 1).padStart(2, '0')}</div>
          <div><h4>${escapeHTML(point.title)}</h4><p>${escapeHTML(point.body)}</p></div>
        </section>`).join('')}
      </div>
      ${(d.focus || d.trap) ? `<div class="et-detail-v5-reading">
        ${d.focus ? `<section><b>理解の軸</b><p>${escapeHTML(d.focus)}</p></section>` : ''}
        ${d.trap ? `<section><b>混同しやすいところ</b><p>${escapeHTML(d.trap)}</p></section>` : ''}
      </div>` : ''}
      ${terms.length ? `<div class="et-detail-v5-terms">
        <div class="et-detail-v5-terms-title"><b>このPARTで説明できるようにする用語</b><span>${terms.length}語</span></div>
        <div>${terms.map(term => `<a href="glossary.html?q=${encodeURIComponent(term)}">${escapeHTML(term)}</a>`).join('')}</div>
      </div>` : ''}
    </div>`;
  }

  function insertDetail(lesson) {
    const section = document.querySelector('#points');
    if (!section || section.querySelector('[data-et-detail-v5]')) return;
    const checkpoint = section.querySelector('.et-checkpoint-v3');
    if (checkpoint) checkpoint.insertAdjacentHTML('beforebegin', detailHTML(lesson));
    else section.insertAdjacentHTML('beforeend', detailHTML(lesson));
  }

  function polishSectionCopy() {
    const section = document.querySelector('#points');
    if (!section) return;
    const intro = section.querySelector('.et-body-intro');
    if (intro) intro.textContent = '最初の本文では概念の流れをつかみ、その後の「教科書ノート」で定義・具体例・補足まで確認します。太字の用語だけを暗記せず、なぜそう判断できるかまで自分のことばで説明できる状態を目指します。';
    const label = section.querySelector('.lesson-section-label');
    if (label) label.textContent = 'TEXTBOOK';
    const heading = section.querySelector('h2');
    if (heading) heading.textContent = '本文・知識点を詳しく読む';
  }

  function addGlossaryLink() {
    const terms = document.querySelector('.lesson-terms');
    if (!terms || terms.querySelector('.et-v5-glossary-link')) return;
    const summary = terms.querySelector('summary');
    if (!summary) return;
    const a = document.createElement('a');
    a.className = 'et-v5-glossary-link';
    a.href = 'glossary.html';
    a.textContent = '用語一覧へ';
    a.addEventListener('click', e => e.stopPropagation());
    summary.appendChild(a);
  }

  window.renderStudyLesson = function renderStudyLessonV5() {
    baseRender();
    const lesson = currentLesson();
    if (!lesson || lesson.track !== 'main') return;
    document.body.classList.add('electronic-textbook-v5');
    polishSectionCopy();
    insertDetail(lesson);
    addGlossaryLink();
    requestAnimationFrame(() => document.querySelectorAll('.lesson-route').forEach(node => node.remove()));
  };
})();