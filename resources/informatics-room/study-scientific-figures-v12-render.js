/* 情報Ⅰ v14 — 高精細教材図版を学習ページへ組み込む */
(() => {
  const baseRender=window.renderStudyLesson;
  const idNow=()=>new URLSearchParams(location.search).get('id')||'';
  function insert(){
    const id=idNow(),config=window.SCIENTIFIC_FIGURES_V12?.[id];if(!config||document.querySelector(`[data-figure-v12="${id}"]`))return;
    const lesson=typeof studyLessonById==='function'?studyLessonById(id):null;if(!lesson||lesson.track!=='main')return;
    const old=document.querySelector('.et-figure-v4,.et-figure-v3');
    const legacyV11=[...document.querySelectorAll(`.scientific-figure-v11[data-figure-id="${CSS.escape(id)}"]`)];
    const section=window.SCIENTIFIC_V12.makeSection(id,config);
    const paper=document.querySelector('.lesson-paper');
    const goals=paper?.querySelector('.lesson-goals');

    /*
      v11/v12の旧挿入先の一部は .lesson-layout 直下にあり、CSS Grid の
      サイドバー列へ自動配置されるケースがあった。教材の読む順序を
      「目標→核心図→本文」に固定し、図版は必ず本文用紙の中へ置く。
    */
    if(paper){
      if(goals)goals.insertAdjacentElement('afterend',section);
      else paper.insertAdjacentElement('afterbegin',section);
    }else if(old){
      old.insertAdjacentElement('afterend',section);
    }else if(legacyV11[0]){
      legacyV11[0].insertAdjacentElement('afterend',section);
    }

    if(old)old.classList.add('is-superseded-v12');
    legacyV11.forEach(node=>{node.hidden=true;node.setAttribute('aria-hidden','true');node.classList.add('is-superseded-v13');});
    window.SCIENTIFIC_V12.bindSection(section,config);
  }
  window.SCIENTIFIC_FIGURE_V12_COUNT=Object.keys(window.SCIENTIFIC_FIGURES_V12||{}).length;
  window.renderStudyLesson=function renderScientificV12(){baseRender();insert();};
})();