/* 情報Ⅰ v7 — 原教材実践問題の型を47PARTへ接続する */
(() => {
  const baseRender=window.renderStudyLesson;
  const data=()=>window.SOURCE_PRACTICE_V7||{};
  function current(){
    const id=new URLSearchParams(location.search).get('id')||'b1-1';
    return {id,lesson:typeof studyLessonById==='function'?studyLessonById(id):null};
  }
  function blockHTML(tasks){
    return `<div class="et-source-practice-v7" data-source-practice-v7>
      <div class="et-source-practice-v7-head"><div><span>PRACTICE</span><h3>実践演習でもう一段使ってみる</h3></div><p>このPARTで学んだ内容を、数値や場面を変えた問題でも使えるか確かめます。先に自力で考えてから解答を開いてください。</p></div>
      <div class="et-source-practice-v7-list">${tasks.map((task,i)=>`<article>
        <header><b>${String(i+1).padStart(2,'0')}</b><strong>${escapeHTML(task.title)}</strong></header>
        <p class="et-source-practice-v7-q">${escapeHTML(task.q)}</p>
        <details><summary>解答・考え方を確認する</summary><p>${escapeHTML(task.a)}</p></details>
        <p class="et-source-practice-v7-point"><span>確認する力</span>${escapeHTML(task.point)}</p>
      </article>`).join('')}</div>
    </div>`;
  }
  function insert(id){
    const tasks=data()[id]||[];
    const section=document.querySelector('#example');
    if(!section||!tasks.length||section.querySelector('[data-source-practice-v7]'))return;
    section.insertAdjacentHTML('beforeend',blockHTML(tasks));
  }
  window.renderStudyLesson=function renderSourcePracticeV7(){
    baseRender();
    const {id,lesson}=current();
    if(!lesson||lesson.track!=='main')return;
    insert(id);
  };
})();