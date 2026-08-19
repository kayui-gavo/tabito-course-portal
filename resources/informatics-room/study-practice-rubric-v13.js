/* 情報Ⅰ v13 — 記述実践演習：自分の解答→解答例→観点別セルフチェック */
(() => {
  const baseRender=window.renderStudyLesson;
  const DRAFT='tabito-info-practice-drafts-v13',STATUS='tabito-info-practice-status-v13',CHECK='tabito-info-practice-check-v13';
  const load=(k)=>{try{return JSON.parse(localStorage.getItem(k)||'{}');}catch(_){return{};}};
  const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(_){}};
  const lessonId=()=>new URLSearchParams(location.search).get('id')||'';

  function enhance(){
    document.querySelectorAll('.et-source-practice-v7-list article').forEach((article,index)=>{
      if(article.querySelector('.practice-rubric-v13'))return;
      const details=article.querySelector('details'),point=article.querySelector('.et-source-practice-v7-point')?.textContent.replace('確認する力','').trim()||'';
      if(!details)return;
      const key=`${lessonId()}:${index}`;const drafts=load(DRAFT),statuses=load(STATUS),checks=load(CHECK);const current=drafts[key]||'',status=statuses[key]||'',done=checks[key]||{};
      const block=document.createElement('section');block.className='practice-rubric-v13';
      block.innerHTML=`<label><span>まず自分で解答する</span><textarea rows="4" placeholder="結論だけでなく、条件・数値・用語を使って理由まで書く。"></textarea><small><b data-practice-chars>0</b>字</small></label><p class="practice-rubric-hint-v13" hidden>解答例を開く前に、まず短くてもよいので自分の考えを書いてみましょう。</p><div class="practice-rubric-check-v13"><strong>解答例を見た後の3点チェック</strong><label><input type="checkbox" data-rubric="answer" ${done.answer?'checked':''}>問いに直接答える結論が一致している</label><label><input type="checkbox" data-rubric="reason" ${done.reason?'checked':''}>条件・数値・資料、または因果関係を根拠として使えている</label><label><input type="checkbox" data-rubric="skill" ${done.skill?'checked':''}>この問題の「確認する力」${point?`（${point}）`:''}を自分の言葉で説明できる</label></div><div class="practice-rubric-status-v13"><button type="button" data-practice-status="mastered" class="${status==='mastered'?'is-selected':''}">自力で説明できた</button><button type="button" data-practice-status="review" class="${status==='review'?'is-selected':''}">もう一度解く</button></div>`;
      details.insertAdjacentElement('beforebegin',block);
      const ta=block.querySelector('textarea'),chars=block.querySelector('[data-practice-chars]'),hint=block.querySelector('.practice-rubric-hint-v13');ta.value=current;chars.textContent=String(current.length);
      ta.addEventListener('input',()=>{const all=load(DRAFT);all[key]=ta.value;save(DRAFT,all);chars.textContent=String(ta.value.length);block.classList.remove('needs-writing');hint.hidden=true;});
      block.querySelectorAll('[data-rubric]').forEach(input=>input.addEventListener('change',()=>{const all=load(CHECK),state=all[key]||{};state[input.dataset.rubric]=input.checked;all[key]=state;save(CHECK,all);}));
      block.querySelectorAll('[data-practice-status]').forEach(btn=>btn.addEventListener('click',()=>{const all=load(STATUS),value=btn.dataset.practiceStatus;all[key]=all[key]===value?'':value;save(STATUS,all);block.querySelectorAll('[data-practice-status]').forEach(x=>x.classList.toggle('is-selected',all[key]===x.dataset.practiceStatus));}));
      details.addEventListener('toggle',()=>{const warn=details.open&&ta.value.trim().length<12;block.classList.toggle('needs-writing',warn);hint.hidden=!warn;});
    });
  }

  window.renderStudyLesson=function renderPracticeRubricV13(){baseRender();enhance();};
  window.PRACTICE_RUBRIC_V13=true;
})();

/* lesson.html は既存の互換性レイヤーを維持したまま、新しい source-practice overlay を
   parser 同期で後置ロードする。最終 renderStudyLesson() より前に必ず評価される。 */
[
  ['SOURCE_PRACTICE_CH3_FIDELITY_V15','study-source-practice-v15-ch3-fidelity.js'],
  ['SOURCE_PRACTICE_CH4_FIDELITY_V16','study-source-practice-v16-ch4-fidelity.js']
].forEach(([flag,src])=>{
  if(!window[flag])document.write(`<script src="${src}"><\/script>`);
});
