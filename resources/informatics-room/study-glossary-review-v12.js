/* 情報Ⅰ glossary recall v12 — 現在表示中の重要語／補助語だけから想起練習 */
(() => {
  const old=document.querySelector('.glossary-review-v9');old?.remove();
  const panel=document.querySelector('.glossary-curation-v12');
  const toolbar=document.querySelector('.tool-glossary-toolbar');
  const anchor=panel||toolbar;if(!anchor)return;
  const KEY='tabito-info-glossary-review-v9';
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(_){return{};}};
  const save=v=>{try{localStorage.setItem(KEY,JSON.stringify(v));}catch(_){}};
  const host=document.createElement('section');
  host.className='glossary-review-v9 glossary-review-v12';
  host.innerHTML=`<header><div><span>RECALL</span><h2>表示中の用語を見て、説明を思い出す</h2></div><p>定義を開く前に、30秒以内で「何か・何と違うか・例」を自分の言葉で説明します。重要語／補助語の絞り込みに合わせて出題範囲も切り替わります。</p></header><div class="glossary-card-v9"><small data-glossary-progress></small><strong data-glossary-term></strong><div data-glossary-answer hidden><p></p><a>元のPARTへ →</a></div><div class="glossary-card-actions-v9"><button type="button" data-glossary-reveal>定義を見る</button><button type="button" data-glossary-known hidden>説明できた</button><button type="button" data-glossary-review hidden>要復習</button><button type="button" data-glossary-next>次の用語</button></div></div>`;
  anchor.insertAdjacentElement('beforebegin',host);
  const term=host.querySelector('[data-glossary-term]'),ans=host.querySelector('[data-glossary-answer]'),progress=host.querySelector('[data-glossary-progress]');
  const reveal=host.querySelector('[data-glossary-reveal]'),known=host.querySelector('[data-glossary-known]'),review=host.querySelector('[data-glossary-review]');
  let current=null;
  const pool=()=>window.GLOSSARY_CURATION_V12?.visibleItems?.()||[];
  function updateProgress(){
    const items=pool(),state=read(),keys=new Set(items.map(x=>x.term));
    const k=Object.entries(state).filter(([name,v])=>keys.has(name)&&v==='known').length;
    const r=Object.entries(state).filter(([name,v])=>keys.has(name)&&v==='review').length;
    progress.textContent=`説明できた ${k} / 要復習 ${r} / 対象 ${items.length}`;
  }
  function pick(preferReview=false){
    const items=pool();const state=read();
    if(!items.length){current=null;term.textContent='条件に合う用語がありません';ans.hidden=true;reveal.hidden=true;known.hidden=true;review.hidden=true;updateProgress();return;}
    let candidates=preferReview?items.filter(x=>state[x.term]==='review'):items;
    if(!candidates.length)candidates=items;
    if(current&&candidates.length>1)candidates=candidates.filter(x=>x.term!==current.term);
    current=candidates[Math.floor(Math.random()*candidates.length)];
    term.textContent=current.term;ans.hidden=true;ans.querySelector('p').textContent=current.desc;const a=ans.querySelector('a');a.href=current.href;
    reveal.hidden=false;known.hidden=true;review.hidden=true;updateProgress();
  }
  reveal.addEventListener('click',()=>{if(!current)return;ans.hidden=false;reveal.hidden=true;known.hidden=false;review.hidden=false;});
  known.addEventListener('click',()=>{if(!current)return;const state=read();state[current.term]='known';save(state);pick(false);});
  review.addEventListener('click',()=>{if(!current)return;const state=read();state[current.term]='review';save(state);pick(true);});
  host.querySelector('[data-glossary-next]').addEventListener('click',()=>pick(false));
  window.addEventListener('glossary-curation-change',()=>pick(false));
  pick(false);
  window.GLOSSARY_RECALL_V12=true;
})();