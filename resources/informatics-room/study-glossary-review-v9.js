/* 情報Ⅰ v9 — 用語一覧をランダム想起練習へ */
(() => {
  const KEY='tabito-info-glossary-review-v9';
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(_){return{};}};
  const save=v=>{try{localStorage.setItem(KEY,JSON.stringify(v));}catch(_){}};
  const list=document.querySelector('#glossaryList'); if(!list)return;
  function collect(){return [...list.querySelectorAll('.tool-glossary-row')].map(row=>({term:row.querySelector('.tool-glossary-term strong')?.textContent.trim()||'',desc:row.querySelector('p')?.textContent.trim()||'',href:row.querySelector('a')?.getAttribute('href')||''})).filter(x=>x.term&&x.desc);}
  let items=collect(); if(!items.length)return;
  let current=null,revealed=false;
  const host=document.createElement('section');host.className='glossary-review-v9';host.innerHTML=`<header><div><span>RECALL</span><h2>用語を見て、説明を思い出す</h2></div><p>定義を開く前に、30秒以内で「何か・何と違うか・例」を自分の言葉で説明します。</p></header><div class="glossary-card-v9"><small data-glossary-progress></small><strong data-glossary-term></strong><div data-glossary-answer hidden><p></p><a>元のPARTへ →</a></div><div class="glossary-card-actions-v9"><button type="button" data-glossary-reveal>定義を見る</button><button type="button" data-glossary-known hidden>説明できた</button><button type="button" data-glossary-review hidden>要復習</button><button type="button" data-glossary-next>次の用語</button></div></div>`;
  document.querySelector('.tool-glossary-toolbar')?.insertAdjacentElement('beforebegin',host);
  const term=host.querySelector('[data-glossary-term]'),ans=host.querySelector('[data-glossary-answer]'),progress=host.querySelector('[data-glossary-progress]');
  const reveal=host.querySelector('[data-glossary-reveal]'),known=host.querySelector('[data-glossary-known]'),review=host.querySelector('[data-glossary-review]');
  function updateProgress(){const s=read(),k=Object.values(s).filter(x=>x==='known').length,r=Object.values(s).filter(x=>x==='review').length;progress.textContent=`説明できた ${k} / 要復習 ${r} / 全 ${items.length}`;}
  function pick(preferReview=false){const s=read();let pool=preferReview?items.filter(x=>s[x.term]==='review'):items;if(!pool.length)pool=items;const candidates=current&&pool.length>1?pool.filter(x=>x.term!==current.term):pool;current=candidates[Math.floor(Math.random()*candidates.length)];revealed=false;term.textContent=current.term;ans.hidden=true;ans.querySelector('p').textContent=current.desc;const a=ans.querySelector('a');a.href=current.href;reveal.hidden=false;known.hidden=true;review.hidden=true;updateProgress();}
  reveal.addEventListener('click',()=>{revealed=true;ans.hidden=false;reveal.hidden=true;known.hidden=false;review.hidden=false;});
  known.addEventListener('click',()=>{const s=read();s[current.term]='known';save(s);pick(false);});
  review.addEventListener('click',()=>{const s=read();s[current.term]='review';save(s);pick(true);});
  host.querySelector('[data-glossary-next]').addEventListener('click',()=>pick(false));
  const input=document.querySelector('#glossarySearch');input?.addEventListener('input',()=>requestAnimationFrame(()=>{const now=collect();if(now.length)items=now;}));
  pick(false);
})();