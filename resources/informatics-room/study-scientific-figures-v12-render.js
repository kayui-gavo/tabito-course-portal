/* 情報Ⅰ v13 — 高精細教材図版を学習ページへ組み込む */
(() => {
  const baseRender=window.renderStudyLesson;
  const idNow=()=>new URLSearchParams(location.search).get('id')||'';
  function insert(){
    const id=idNow(),config=window.SCIENTIFIC_FIGURES_V12?.[id];if(!config||document.querySelector(`[data-figure-v12="${id}"]`))return;
    const lesson=typeof studyLessonById==='function'?studyLessonById(id):null;if(!lesson||lesson.track!=='main')return;
    const old=document.querySelector('.et-figure-v4,.et-figure-v3');
    const legacyV11=[...document.querySelectorAll(`.scientific-figure-v11[data-figure-id="${CSS.escape(id)}"]`)];
    const section=window.SCIENTIFIC_V12.makeSection(id,config);
    if(old){old.insertAdjacentElement('afterend',section);old.classList.add('is-superseded-v12');}
    else if(legacyV11[0])legacyV11[0].insertAdjacentElement('afterend',section);
    else{const target=document.querySelector('#points,.lesson-goals,.lesson-paper');target?.insertAdjacentElement('afterend',section);}
    legacyV11.forEach(node=>{node.hidden=true;node.setAttribute('aria-hidden','true');node.classList.add('is-superseded-v13');});
    window.SCIENTIFIC_V12.bindSection(section,config);
  }
  window.SCIENTIFIC_FIGURE_V12_COUNT=Object.keys(window.SCIENTIFIC_FIGURES_V12||{}).length;
  window.renderStudyLesson=function renderScientificV12(){baseRender();insert();};
})();