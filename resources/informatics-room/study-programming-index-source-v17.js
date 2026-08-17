/* 情報Ⅰ＜プログラミング編＞ v17 — 48講目次検索を教材整合データへ固定 */
(() => {
  const root=document.querySelector('#programmingCurriculum');
  if(!root)return;
  const source=window.PROGRAM_SOURCE_V9||{};
  const clean=(id,value)=>{
    let s=String(value||'');
    // lesson.html の v16 横断校正と同じ学習順を、目次検索にも反映する。
    if(id==='p4')s=s.replace(/論理値/g,'True / False');
    if(id==='p15'||id==='p19')s=s.replace(/実引数|仮引数/g,'引数');
    if(id==='p30')s=s.replace(/バブルソート型|バブルソート/g,'隣接比較・交換');
    return s;
  };
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
    ].filter(Boolean).map(x=>clean(id,x)).join(' ');
  });
  window.PROGRAMMING_INDEX_SOURCE_V17=true;
})();
