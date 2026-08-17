/* 情報Ⅰ v11 — 用語一覧そのものを最新SOURCE_MASTERから構成 */
(() => {
  const baseRender=window.renderUnifiedGlossary;
  const lessons=()=>window.STUDY_DATA?.mainLessons||[];
  const master=()=>window.SOURCE_MASTER_V7||{};
  const norm=s=>String(s||'').replace(/[（）()・\s]/g,'').toLowerCase();
  const lectureLabel=lesson=>`第${lesson.lecture}講 PART${lesson.part}`;

  function sourceDescription(lesson,term){
    const sections=master()[lesson.id]?.sections||[];
    const target=norm(term);
    const exact=sections.find(([title])=>norm(title)===target);
    const titleHit=sections.find(([title])=>norm(title).includes(target)||target.includes(norm(title)));
    const bodyHit=sections.find(([,body])=>norm(body).includes(target));
    const hit=exact||titleHit||bodyHit;
    if(hit?.[1])return hit[1];
    const point=(lesson.points||[]).find(p=>p.title.includes(term)||p.body.includes(term))||(lesson.points||[])[0];
    return point?.body||lesson.lead||'';
  }

  function items(){
    const map=new Map();
    lessons().forEach(lesson=>{
      (lesson.terms||[]).forEach(term=>{
        if(map.has(term))return;
        map.set(term,{term,desc:sourceDescription(lesson,term),lesson});
      });
    });
    return [...map.values()].sort((a,b)=>a.term.localeCompare(b.term,'ja'));
  }

  window.renderUnifiedGlossary=function renderUnifiedGlossarySourceV11(){
    if(typeof renderStudyHeader!=='function'||typeof escapeHTML!=='function'||typeof lessonHref!=='function')return baseRender?.();
    const data=items();
    const params=new URLSearchParams(location.search);
    const initial=params.get('q')||'';
    document.body.innerHTML=`${renderStudyHeader('glossary')}<main class="study-shell index-shell tool-shell">
      <section class="index-intro compact tool-intro">
        <div><p class="index-kicker">GLOSSARY / 本編9講</p><h1>用語一覧</h1><p class="index-lead">本編47PARTに登場する用語を、最新の原教材照合本文と一緒に探せます。用語だけを丸暗記せず、元のPARTへ戻って前後の関係まで確認してください。</p></div>
        <div class="index-progress-box tool-intro-aside"><span>収録語</span><strong class="tool-big-number">${data.length}</strong><small>教材9講・47PARTから整理</small></div>
      </section>
      <div class="tool-glossary-toolbar"><label class="tool-search wide"><input id="glossarySearch" type="search" value="${escapeHTML(initial)}" placeholder="用語を検索　例：標本化、著作権、相関係数"></label><span id="glossaryCount">${data.length}語</span></div>
      <div class="tool-glossary-list" id="glossaryList"></div>
    </main>`;
    const list=document.querySelector('#glossaryList');
    const input=document.querySelector('#glossarySearch');
    const counter=document.querySelector('#glossaryCount');
    const render=()=>{
      const q=input.value.trim().toLowerCase().replace(/\s+/g,'');
      const visible=data.filter(item=>!q||`${item.term}${item.desc}${item.lesson.title}`.toLowerCase().replace(/\s+/g,'').includes(q));
      counter.textContent=`${visible.length}語`;
      list.innerHTML=visible.map(item=>`<article class="tool-glossary-row" data-source-master="${escapeHTML(item.lesson.id)}"><div class="tool-glossary-term"><strong>${escapeHTML(item.term)}</strong><span>${lectureLabel(item.lesson)}</span></div><p>${escapeHTML(item.desc)}</p><a href="${lessonHref(item.lesson.id)}">${escapeHTML(item.lesson.title)}で確認 →</a></article>`).join('')||'<div class="tool-empty">該当する用語がありません。</div>';
    };
    input.addEventListener('input',render);render();
  };
  window.GLOSSARY_SOURCE_RENDER_V11=true;
})();
