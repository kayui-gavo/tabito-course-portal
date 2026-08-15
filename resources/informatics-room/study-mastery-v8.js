/* 情報Ⅰ v8 — 各PARTの原教材項目を「説明できるか」で自己点検する */
(() => {
  const baseRender=window.renderStudyLesson;
  const KEY='tabito-info-mastery-v8';
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}');}catch(_){return{};}};
  const save=value=>{try{localStorage.setItem(KEY,JSON.stringify(value));}catch(_){}};
  const current=()=>{
    const id=new URLSearchParams(location.search).get('id')||'b1-1';
    return {id,lesson:typeof studyLessonById==='function'?studyLessonById(id):null};
  };
  function render(id,lesson){
    if(!lesson||lesson.track!=='main'||document.querySelector('.mastery-v8'))return;
    const sections=(window.SOURCE_MASTER_V7||{})[id]?.sections||[];
    if(!sections.length)return;
    const state=read();
    const checked=new Set(state[id]||[]);
    const html=`<details class="mastery-v8" data-mastery-v8>
      <summary><div><span>到達チェック</span><strong>このPARTを自分の言葉で説明できるか</strong></div><b data-mastery-count>${checked.size} / ${sections.length}</b></summary>
      <div class="mastery-v8-body">
        <p>本文を読み終えたら、答えを見ずに各項目を30秒ほどで説明してください。「知っている」ではなく、例・違い・理由まで言えた項目だけチェックします。</p>
        <div class="mastery-v8-grid">${sections.map(([title],i)=>`<label><input type="checkbox" value="${i}" ${checked.has(i)?'checked':''}><span>${escapeHTML(title)}</span></label>`).join('')}</div>
      </div>
    </details>`;
    const cue=document.querySelector('.et-study-cue-v3')||document.querySelector('.lesson-goals');
    cue?.insertAdjacentHTML('afterend',html);
    const root=document.querySelector('[data-mastery-v8]');
    const count=root?.querySelector('[data-mastery-count]');
    const update=()=>{
      const selected=[...root.querySelectorAll('input:checked')].map(x=>Number(x.value));
      const all=read(); all[id]=selected; save(all);
      if(count)count.textContent=`${selected.length} / ${sections.length}`;
      root.classList.toggle('is-complete',selected.length===sections.length);
    };
    root?.querySelectorAll('input').forEach(input=>input.addEventListener('change',update));
    update();
  }
  window.renderStudyLesson=function renderMasteryV8(){
    baseRender();
    const {id,lesson}=current();
    render(id,lesson);
  };
})();