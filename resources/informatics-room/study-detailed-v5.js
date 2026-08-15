/* 情報Ⅰ 電子教材 v7 — 原教材逐PART再照合版
   SOURCE_MASTER_V7を優先し、v3本文と重なる説明は繰り返さず、
   教材にしかない定義・補足・具体例・注意点を自学ノートへ残す。 */
(() => {
  const baseRender = window.renderStudyLesson;
  const depth = window.ELECTRONIC_DEPTH_V2 || {};
  const master = () => window.SOURCE_MASTER_V7 || {};

  function currentLesson() {
    const id = new URLSearchParams(location.search).get('id') || 'b1-1';
    return studyLessonById(id);
  }
  function normalizeText(text) {
    return String(text || '').replace(/\s+/g, '').replace(/[、。，．・（）()「」『』：:；;→/]/g, '');
  }
  function grams(text) {
    const s=normalizeText(text),set=new Set();
    for(let i=0;i<s.length-1;i++) set.add(s.slice(i,i+2));
    return set;
  }
  function similarity(a,b) {
    const A=grams(a),B=grams(b); if(!A.size||!B.size)return 0;
    let hit=0; A.forEach(g=>{if(B.has(g))hit++;});
    return hit/Math.min(A.size,B.size);
  }
  function v3Sections(lesson) {
    return ((window.ELECTRONIC_TEXTBOOK_V3 || {})[lesson.id]?.sections || []);
  }
  function isNearDuplicate(body, proseSections) {
    const p=normalizeText(body); if(!p)return true;
    return proseSections.some(section=>{
      const s=normalizeText(section.body); if(!s)return false;
      if(p.length>=22 && (s.includes(p.slice(0,22))||p.includes(s.slice(0,22))))return true;
      return similarity(p,s)>=.72;
    });
  }
  function noteBlocks(lesson) {
    const source=master()[lesson.id]?.sections;
    const raw=(source?.length ? source.map(([title,body])=>({title,body})) : (lesson.points||[]));
    const prose=v3Sections(lesson);
    return raw.filter(point=>!isNearDuplicate(point.body,prose));
  }
  function termKeys(term) {
    const raw=String(term||'').trim();
    const noParen=raw.replace(/[（(][^）)]*[）)]/g,'').trim();
    const parts=raw.split(/[（(／/・]/).map(x=>x.trim()).filter(Boolean);
    return [...new Set([raw,noParen,...parts].filter(x=>x.length>=2))];
  }
  function sourceTexts(lesson) {
    return [
      ...(master()[lesson.id]?.sections||[]).map(x=>x[1]),
      ...v3Sections(lesson).map(x=>x.body),
      ...(lesson.points||[]).map(x=>x.body),
      lesson.lead,lesson.note
    ].filter(Boolean);
  }
  function termDefinition(lesson,term) {
    const keys=termKeys(term);
    for(const text of sourceTexts(lesson)) {
      const sentences=String(text).split('。').map(x=>x.trim()).filter(Boolean);
      const hit=sentences.find(sentence=>keys.some(key=>sentence.includes(key)));
      if(hit)return `${hit}。`;
    }
    return lesson.lead||'';
  }
  function dictionaryHTML(lesson,terms) {
    if(!terms.length)return'';
    return `<details class="et-detail-v5-dictionary">
      <summary><span>用語を1語ずつ確認する</span><b>${terms.length}語</b></summary>
      <dl>${terms.map(term=>`<div><dt>${escapeHTML(term)}</dt><dd>${escapeHTML(termDefinition(lesson,term))}</dd></div>`).join('')}</dl>
    </details>`;
  }
  function detailHTML(lesson) {
    const d=depth[lesson.id]||{};
    const notes=noteBlocks(lesson);
    const terms=lesson.terms||[];
    const exam=master()[lesson.id]?.exam||'';
    return `<div class="et-detail-v5" data-et-detail-v5>
      <div class="et-detail-v5-head">
        <div><span>DETAILS</span><h3>定義・具体例・補足を整理する</h3></div>
        <p>上の本文で全体の流れをつかんだら、ここで細かな定義、数値例、注意点まで確認します。同じ説明は繰り返さず、本文に入りきらなかった内容だけを補います。</p>
      </div>
      ${notes.length?`<div class="et-detail-v5-notes">${notes.map((point,i)=>`<section class="et-detail-v5-note"><div class="et-detail-v5-index">${String(i+1).padStart(2,'0')}</div><div><h4>${escapeHTML(point.title)}</h4><p>${escapeHTML(point.body)}</p></div></section>`).join('')}</div>`:''}
      ${(d.focus||d.trap)?`<div class="et-detail-v5-reading">${d.focus?`<section><b>理解の軸</b><p>${escapeHTML(d.focus)}</p></section>`:''}${d.trap?`<section><b>混同しやすいところ</b><p>${escapeHTML(d.trap)}</p></section>`:''}</div>`:''}
      ${lesson.note?`<aside class="et-detail-v5-caution"><b>注意</b><p>${escapeHTML(lesson.note)}</p></aside>`:''}
      ${exam?`<aside class="et-common-test-v7"><b>共通テストにつなげる</b><p>${escapeHTML(exam)}</p></aside>`:''}
      ${terms.length?`<div class="et-detail-v5-terms"><div class="et-detail-v5-terms-title"><b>このPARTで説明できるようにする用語</b><span>${terms.length}語</span></div><div>${terms.map(term=>`<a href="glossary.html?q=${encodeURIComponent(term)}">${escapeHTML(term)}</a>`).join('')}</div></div>`:''}
      ${dictionaryHTML(lesson,terms)}
    </div>`;
  }
  function insertDetail(lesson) {
    const section=document.querySelector('#points');
    if(!section||section.querySelector('[data-et-detail-v5]'))return;
    const checkpoint=section.querySelector('.et-checkpoint-v3');
    if(checkpoint)checkpoint.insertAdjacentHTML('beforebegin',detailHTML(lesson));
    else section.insertAdjacentHTML('beforeend',detailHTML(lesson));
  }
  function polishSectionCopy() {
    const section=document.querySelector('#points'); if(!section)return;
    const intro=section.querySelector('.et-body-intro');
    if(intro)intro.textContent='まず連続した本文で概念の流れをつかみ、その後の「詳しく確認」で定義・具体例・数値例・注意点まで補います。太字の用語を覚えるだけでなく、なぜそう判断できるかを自分のことばで説明できる状態を目指します。';
    const label=section.querySelector('.lesson-section-label'); if(label)label.textContent='本文';
    const heading=section.querySelector('h2'); if(heading)heading.textContent='本文・要点を詳しく読む';
  }
  function addGlossaryLink() {
    const terms=document.querySelector('.lesson-terms');
    if(!terms||terms.querySelector('.et-v5-glossary-link'))return;
    const summary=terms.querySelector('summary'); if(!summary)return;
    const a=document.createElement('a'); a.className='et-v5-glossary-link'; a.href='glossary.html'; a.textContent='用語一覧へ';
    a.addEventListener('click',e=>e.stopPropagation()); summary.appendChild(a);
  }
  window.renderStudyLesson=function renderStudyLessonV7Detail(){
    baseRender();
    const lesson=currentLesson(); if(!lesson||lesson.track!=='main')return;
    document.body.classList.add('electronic-textbook-v5','source-audited-v7');
    polishSectionCopy(); insertDetail(lesson); addGlossaryLink();
    requestAnimationFrame(()=>document.querySelectorAll('.lesson-route').forEach(node=>node.remove()));
  };
})();