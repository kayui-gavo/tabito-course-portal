/* 情報Ⅰ＜プログラミング編＞ v17 — 48講目次検索を教材整合データへ固定 */
(() => {
  const root=document.querySelector('#programmingCurriculum');
  if(!root)return;
  const source=window.PROGRAM_SOURCE_V9||{};
  root.querySelectorAll('.curriculum-row').forEach(row=>{
    const href=row.getAttribute('href')||'';
    const id=new URL(href,location.href).searchParams.get('id');
    const lesson=id&&typeof studyLessonById==='function'?studyLessonById(id):null;
    if(!lesson)return;
    const d=source[id]||{};
    row.dataset.search=[
      lesson.title,
      lesson.lead,
      ...(lesson.goals||[]),
      ...(lesson.terms||[]),
      ...(lesson.points||[]).flatMap(x=>[x.title,x.body]),
      d.core||'',d.read||'',d.pitfall||'',d.drill||''
    ].filter(Boolean).join(' ');
  });
  window.PROGRAMMING_INDEX_SOURCE_V17=true;
})();
