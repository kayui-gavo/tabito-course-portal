/* 情報Ⅰ glossary v12 — 原教材の見出し・学習目標を使って重要語と補助語を分ける */
(() => {
  const list=document.querySelector('#glossaryList');
  const toolbar=document.querySelector('.tool-glossary-toolbar');
  if(!list||!toolbar)return;
  const lessons=()=>window.STUDY_MAIN||[];
  const master=()=>window.SOURCE_MASTER_V7||{};
  const enrich=()=>typeof STUDY_ENRICH!=='undefined'?STUDY_ENRICH:{};
  const norm=s=>String(s||'').toLowerCase().replace(/[\s　（）()・「」『』.,:;\-_/]/g,'');
  const microFormats=new Set([
    'plan','do','check','act','bmp','png','gif','jpeg','jpg','wav','flac','mp3','midi','mp4','pdf','txt','csv','exe','zip','docx','xlsx',
    '==','!=','>','<','>=','<=','+','-','*','/','//','%','**','=', '.bmp','.png','.gif','.jpeg','.jpg','.wav','.flac','.mp3','.midi','.mp4','.pdf','.txt','.csv','.exe','.zip','.docx','.xlsx'
  ]);
  const notationLike=term=>{
    const t=String(term||'').trim();
    const l=t.toLowerCase();
    if(microFormats.has(l))return true;
    if(/^\.[a-z0-9]{2,6}$/i.test(t))return true;
    if(/^[=!<>+\-*\/%]{1,3}$/.test(t))return true;
    return false;
  };
  const lessonById=id=>lessons().find(x=>x.id===id);
  const sourceOrder=(id,term)=>{
    const terms=[...(enrich()[id]?.terms||[]),...(lessonById(id)?.terms||[])];
    const n=norm(term);const i=terms.findIndex(x=>norm(x)===n);return i<0?999:i;
  };
  function score(id,term){
    if(notationLike(term))return -9;
    const lesson=lessonById(id);const data=master()[id]||{};const n=norm(term);
    if(!lesson||!n)return 0;
    let s=0;
    if(norm(lesson.title).includes(n)||n.includes(norm(lesson.title)))s+=5;
    for(const [title] of data.sections||[])if(norm(title).includes(n)||n.includes(norm(title)))s+=4;
    for(const point of lesson.points||[])if(norm(point.title).includes(n)||n.includes(norm(point.title)))s+=3;
    for(const goal of lesson.goals||[])if(norm(goal).includes(n))s+=2;
    const sourceText=[...(data.sections||[]).flatMap(x=>x),data.exam||''].join(' ');
    const hits=(norm(sourceText).match(new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'g'))||[]).length;
    if(hits>=3)s+=2; else if(hits>=1)s+=1;
    return s;
  }
  let mode='core';
  const panel=document.createElement('section');
  panel.className='glossary-curation-v12';
  panel.innerHTML=`<div><span>STUDY PRIORITY</span><strong>まず覚える語と、参照用の細かな語を分ける</strong><p>PART名・節見出し・学習目標・要点見出しに結び付く語を「重要語」として先に表示します。拡張子・演算子・細かな構成語は「補助語」に残し、教材情報そのものは削除しません。</p></div><div class="glossary-curation-actions-v12" role="group" aria-label="用語の重要度で絞り込む"><button type="button" data-glossary-mode="core">重要語</button><button type="button" data-glossary-mode="support">補助語</button><button type="button" data-glossary-mode="all">すべて</button></div><small data-glossary-curation-count></small>`;
  toolbar.insertAdjacentElement('beforebegin',panel);
  const modeButtons=[...panel.querySelectorAll('[data-glossary-mode]')];
  const badge=panel.querySelector('[data-glossary-curation-count]');
  function classify(){
    const rows=[...list.querySelectorAll('.tool-glossary-row')];
    const byLesson=new Map();
    rows.forEach(row=>{
      const id=row.dataset.sourceMaster||'';const term=row.querySelector('.tool-glossary-term strong')?.textContent.trim()||'';
      const s=score(id,term);row.dataset.glossaryScore=String(s);row.dataset.glossaryPriority=s>=3?'core':'support';
      row.classList.toggle('is-glossary-core-v12',s>=3);row.classList.toggle('is-glossary-support-v12',s<3);
      let marker=row.querySelector('.glossary-priority-v12');
      if(!marker){marker=document.createElement('em');marker.className='glossary-priority-v12';row.querySelector('.tool-glossary-term')?.appendChild(marker);}
      marker.textContent=s>=3?'重要':'補助';
      if(!byLesson.has(id))byLesson.set(id,[]);byLesson.get(id).push({row,term,score:s,order:sourceOrder(id,term)});
    });
    // 各PARTで重要語が極端に少なくならないよう、教材中の用語順から最低3語を残す。
    byLesson.forEach(items=>{
      const core=items.filter(x=>x.row.dataset.glossaryPriority==='core');
      if(core.length>=3)return;
      items.filter(x=>!notationLike(x.term)).sort((a,b)=>a.order-b.order||b.score-a.score).slice(0,3).forEach(x=>{
        x.row.dataset.glossaryPriority='core';x.row.classList.add('is-glossary-core-v12');x.row.classList.remove('is-glossary-support-v12');
        const marker=x.row.querySelector('.glossary-priority-v12');if(marker)marker.textContent='重要';
      });
    });
    apply();
  }
  function apply(){
    const rows=[...list.querySelectorAll('.tool-glossary-row')];
    rows.forEach(row=>{row.hidden=mode!=='all'&&row.dataset.glossaryPriority!==mode;});
    const total=rows.length,core=rows.filter(x=>x.dataset.glossaryPriority==='core').length,support=total-core,visible=rows.filter(x=>!x.hidden).length;
    modeButtons.forEach(b=>b.classList.toggle('is-active',b.dataset.glossaryMode===mode));
    const counter=document.querySelector('#glossaryCount');if(counter)counter.textContent=`${visible}語`;
    if(badge)badge.textContent=`重要語 ${core} / 補助語 ${support} / 全 ${total}`;
    window.GLOSSARY_CURATION_V12={mode,counts:{core,support,total,visible},visibleItems:()=>rows.filter(x=>!x.hidden).map(row=>({term:row.querySelector('.tool-glossary-term strong')?.textContent.trim()||'',desc:row.querySelector('p')?.textContent.trim()||'',href:row.querySelector('a')?.getAttribute('href')||''})).filter(x=>x.term&&x.desc),setMode:setMode};
    window.dispatchEvent(new CustomEvent('glossary-curation-change',{detail:window.GLOSSARY_CURATION_V12.counts}));
  }
  function setMode(next){mode=['core','support','all'].includes(next)?next:'core';apply();}
  modeButtons.forEach(button=>button.addEventListener('click',()=>setMode(button.dataset.glossaryMode)));
  const input=document.querySelector('#glossarySearch');input?.addEventListener('input',()=>requestAnimationFrame(classify));
  new MutationObserver(()=>requestAnimationFrame(classify)).observe(list,{childList:true,subtree:true});
  classify();
})();