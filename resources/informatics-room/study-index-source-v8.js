/* 情報Ⅰ v9 — 目次検索を最新SOURCE_MASTERへ固定 */
(() => {
  document.querySelectorAll('#mainCurriculum .curriculum-row').forEach(row=>{
    const href=row.getAttribute('href')||'';
    const id=new URL(href,location.href).searchParams.get('id');
    const lesson=id&&typeof studyLessonById==='function'?studyLessonById(id):null;
    if(!lesson)return;
    const source=(window.SOURCE_MASTER_V7||{})[id];
    row.dataset.search=[
      lesson.title,
      lesson.lead,
      ...(lesson.goals||[]),
      ...(lesson.terms||[]),
      ...(lesson.extraPoints||[]).flatMap(x=>[x.title,x.body]),
      ...(source?.sections||[]).flatMap(x=>x),
      source?.exam||''
    ].filter(Boolean).join(' ');
  });
  window.INDEX_SOURCE_V9=true;
})();
