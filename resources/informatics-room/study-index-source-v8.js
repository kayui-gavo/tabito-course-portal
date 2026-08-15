/* 情報Ⅰ v8 — 目次検索を本文・追加用語・原教材詳細まで広げる */
(() => {
  document.querySelectorAll('#mainCurriculum .curriculum-row').forEach(row=>{
    const href=row.getAttribute('href')||'';
    const id=new URL(href,location.href).searchParams.get('id');
    const lesson=id&&typeof studyLessonById==='function'?studyLessonById(id):null;
    if(!lesson)return;
    const source=(window.SOURCE_MASTER_V7||{})[id];
    const extra=[
      ...(lesson.terms||[]),
      ...(lesson.extraPoints||[]).flatMap(x=>[x.title,x.body]),
      ...(source?.sections||[]).flatMap(x=>x),
      source?.exam||''
    ].filter(Boolean).join(' ');
    row.dataset.search=`${row.dataset.search||''} ${extra}`;
  });
})();