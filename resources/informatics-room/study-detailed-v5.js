/* 情報Ⅰ 電子教材 v5 — 自学用詳細ノート
   v3/v4の本文・図解・例題を残しつつ、教材由来の要点データを本文に統合する。
   47PARTすべてで「定義→具体例→混同しやすい点→用語確認」まで読める構成。 */
(() => {
  const baseRender = window.renderStudyLesson;
  const depth = window.ELECTRONIC_DEPTH_V2 || {};

  function currentLesson() {
    const id = new URLSearchParams(location.search).get('id') || 'b1-1';
    return studyLessonById(id);
  }

  function normalizeText(text) {
    return String(text || '').replace(/\s+/g, '').replace(/[、。，．・（）()「」『』：:；;]/g, '');
  }

  function grams(text) {
    const s=normalizeText(text);
    const set=new Set();
    for(let i=0;i<s.length-1;i++)set.add(s.slice(i,i+2));
    return set;
  }

  function similarity(a,b) {
    const A=grams(a),B=grams(b);
    if(!A.size||!B.size)return 0;
    let hit=0; A.forEach(g=>{if(B.has(g))hit++;});
    return hit/Math.min(A.size,B.size);
  }

  function isNearDuplicate(point, proseSections) {
    const p = normalizeText(point.body);
    if (!p) return true;
    return proseSections.some(section => {
      const s = normalizeText(section.body);
      if (!s) return false;
      if (p.length>=18 && (s.includes(p.slice(0,18)) || p.includes(s.slice(0,18)))) return true;
      return similarity(p,s) >= .68;
    });
  }

  function noteBlocks(lesson) {
    const v3 = (window.ELECTRONIC_TEXTBOOK_V3 || {})[lesson.id];
    const prose = v3?.sections || [];
    return (lesson.points || []).filter(point => !isNearDuplicate(point, prose));
  }

  function termKeys(term) {
    const raw = String(term || '').trim();
    const noParen = raw.replace(/[（(][^）)]*[）)]/g, '').trim();
    const parts = raw.split(/[（(／/・]/).map(x => x.trim()).filter(Boolean);
    return [...new Set([raw, noParen, ...parts].filter(x => x.length >= 2))];
  }

  function termDefinition(lesson, term) {
    const v3 = (window.ELECTRONIC_TEXTBOOK_V3 || {})[lesson.id];
    const texts = [
      ...(v3?.sections || []).map(x => x.body),
      ...(lesson.points || []).map(x => x.body),
      lesson.lead,
      lesson.note
    ].filter(Boolean);
    const keys = termKeys(term);
    for (const text of texts) {
      const sentences = String(text).split('。').map(x => x.trim()).filter(Boolean);
      const hit = sentences.find(sentence => keys.some(key => sentence.includes(key)));
      if (hit) return `${hit}。`;
    }
    const point = (lesson.points || []).find(x => keys.some(key => x.title.includes(key) || x.body.includes(key)));
    return point?.body || lesson.lead || '';
  }

  function dictionaryHTML(lesson, terms) {
    if (!terms.length) return '';
    return `<details class="et-detail-v5-dictionary">
      <summary><span>用語を1語ずつ確認する</span><b>${terms.length}語</b></summary>
      <dl>${terms.map(term => `<div><dt>${escapeHTML(term)}</dt><dd>${escapeHTML(termDefinition(lesson, term))}</dd></div>`).join('')}</dl>
    </details>`;
  }

  function detailHTML(lesson) {
    const d = depth[lesson.id] || {};
    const notes = noteBlocks(lesson);
    const terms = lesson.terms || [];
    return `<div class="et-detail-v5" data-et-detail-v5>
      <div class="et-detail-v5-head">
        <div><span>教科書ノート</span><h3>定義・補足をもう一段詳しく</h3></div>
        <p>上の本文と重なる説明は繰り返さず、教材にある補足事項・具体例・注意点を追加で確認します。最後の用語一覧では、各語を本文の文脈に戻して確認できます。</p>
      </div>
      ${notes.length ? `<div class="et-detail-v5-notes">
        ${notes.map((point, i) => `<section class="et-detail-v5-note">
          <div class="et-detail-v5-index">${String(i + 1).padStart(2, '0')}</div>
          <div><h4>${escapeHTML(point.title)}</h4><p>${escapeHTML(point.body)}</p></div>
        </section>`).join('')}
      </div>` : ''}
      ${(d.focus || d.trap) ? `<div class="et-detail-v5-reading">
        ${d.focus ? `<section><b>理解の軸</b><p>${escapeHTML(d.focus)}</p></section>` : ''}
        ${d.trap ? `<section><b>混同しやすいところ</b><p>${escapeHTML(d.trap)}</p></section>` : ''}
      </div>` : ''}
      ${lesson.note ? `<aside class="et-detail-v5-caution"><b>教科書上の注意</b><p>${escapeHTML(lesson.note)}</p></aside>` : ''}
      ${terms.length ? `<div class="et-detail-v5-terms">
        <div class="et-detail-v5-terms-title"><b>このPARTで説明できるようにする用語</b><span>${terms.length}語</span></div>
        <div>${terms.map(term => `<a href="glossary.html?q=${encodeURIComponent(term)}">${escapeHTML(term)}</a>`).join('')}</div>
      </div>` : ''}
      ${dictionaryHTML(lesson, terms)}
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
    if (intro) intro.textContent = '最初の本文で概念の流れをつかみ、その後の「教科書ノート」で補足・具体例・注意点を確認します。太字の用語だけを暗記せず、なぜそう判断できるかまで自分のことばで説明できる状態を目指します。';
    const label = section.querySelector('.lesson-section-label');
    if (label) label.textContent = '本文';
    const heading = section.querySelector('h2');
    if (heading) heading.textContent = '本文・要点を詳しく読む';
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