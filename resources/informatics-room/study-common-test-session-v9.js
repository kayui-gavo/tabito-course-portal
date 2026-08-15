/* 情報Ⅰ v9 — 共通テスト型総合演習を答案作成→自己採点のセッションへ */
(() => {
  const KEY='tabito-info-ct-session-v9';
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(_){return{};}};
  const save=v=>{try{localStorage.setItem(KEY,JSON.stringify(v));}catch(_){}};
  const sets=[...document.querySelectorAll('.ct-set-v7')];
  if(!sets.length)return;
  const state=read();
  const all=[];
  sets.forEach((set,si)=>{
    set.querySelectorAll('.ct-set-questions>li').forEach((li,qi)=>{
      const id=`s${si+1}q${qi+1}`; all.push(id);
      const p=li.querySelector(':scope>p'); const details=li.querySelector(':scope>details');
      const work=document.createElement('div'); work.className='ct-work-v9';
      work.innerHTML=`<label><span>自分の答案</span><textarea rows="4" placeholder="結論＋根拠を書く"></textarea><small data-count>0文字 / 自動保存</small></label><div class="ct-grade-v9" hidden><span>模範解答と比較</span><button type="button" data-grade="ok">説明できた</button><button type="button" data-grade="review">要復習</button></div>`;
      p?.insertAdjacentElement('afterend',work);
      const textarea=work.querySelector('textarea'),count=work.querySelector('[data-count]'),grade=work.querySelector('.ct-grade-v9');
      textarea.value=state[id]?.text||''; count.textContent=`${textarea.value.length}文字 / 自動保存`;
      if(state[id]?.grade){grade.hidden=false;grade.querySelectorAll('button').forEach(b=>b.classList.toggle('is-active',b.dataset.grade===state[id].grade));}
      textarea.addEventListener('input',()=>{const s=read();s[id]={...(s[id]||{}),text:textarea.value};save(s);count.textContent=`${textarea.value.length}文字 / 自動保存`;update();});
      details?.addEventListener('toggle',()=>{if(details.open)grade.hidden=false;});
      grade.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{const s=read();s[id]={...(s[id]||{}),text:textarea.value,grade:btn.dataset.grade};save(s);grade.querySelectorAll('button').forEach(b=>b.classList.toggle('is-active',b===btn));update();}));
    });
  });
  const summary=document.createElement('div');summary.className='ct-session-v9';summary.innerHTML='<div><span>SESSION</span><b>答案を作ってから解答を開く</b></div><div data-session-status></div>';
  document.querySelector('.ct-sets-v7-head')?.insertAdjacentElement('afterend',summary);
  function update(){const s=read();const written=all.filter(id=>(s[id]?.text||'').trim()).length,ok=all.filter(id=>s[id]?.grade==='ok').length,review=all.filter(id=>s[id]?.grade==='review').length;summary.querySelector('[data-session-status]').innerHTML=`<span>答案 ${written}/${all.length}</span><strong>定着 ${ok}</strong><b>要復習 ${review}</b>`;}
  update();
})();