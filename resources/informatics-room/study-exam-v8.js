/* 情報Ⅰ v8 — 問題演習ハブから自動採点／記述・思考へ分岐 */
(() => {
  function init(){
    const grid=document.querySelector('.tool-route-grid');
    if(!grid||grid.querySelector('[data-v8-open-route]'))return;
    grid.classList.add('has-v8');
    grid.insertAdjacentHTML('beforeend',`<a href="questions.html?mode=open" class="tool-route-card" data-v8-open-route><small>04</small><strong>記述・思考演習</strong><p>原教材の実践問題で使う判断・計算・説明の型を、自分の言葉で解く。</p><span>記述演習へ →</span></a>`);

    const source=window.SOURCE_PRACTICE_V7||{};
    document.querySelectorAll('.tool-lecture-row').forEach((row,index)=>{
      const lecture=index+1;
      const lessons=(STUDY_DATA.mainLessons||[]).filter(x=>x.lecture===lecture);
      const open=lessons.reduce((sum,lesson)=>sum+(source[lesson.id]?.length||0),0);
      const p=row.querySelector('p');
      if(p)p.textContent=`${lessons.length} PART / 自動採点 約${lessons.length*4}問 + 記述${open}問`;
      const actions=row.querySelector('.tool-lecture-actions');
      if(actions&&!actions.querySelector('[data-v8-open-link]'))actions.insertAdjacentHTML('beforeend',`<a data-v8-open-link href="questions.html?lecture=${lecture}&mode=open">記述演習</a>`);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();