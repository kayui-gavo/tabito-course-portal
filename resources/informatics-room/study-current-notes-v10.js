/* 情報Ⅰ v10 — 原教材と2026年現在の制度・共通テスト表記を区別して補足 */
(() => {
  const baseRender=window.renderStudyLesson;
  function current(){const id=new URLSearchParams(location.search).get('id')||'';return {id,lesson:typeof studyLessonById==='function'?studyLessonById(id):null};}
  function note(title,body){return `<aside class="current-note-v10"><span>2026 UPDATE</span><div><b>${escapeHTML(title)}</b><p>${escapeHTML(body)}</p></div></aside>`;}
  window.renderStudyLesson=function renderCurrentNotesV10(){
    baseRender();
    const {id,lesson}=current();if(!lesson)return;
    if(id==='b2-2'&&!document.querySelector('.current-note-v10')){
      const points=document.querySelector('#points')||document.querySelector('.lesson-paper');
      points?.insertAdjacentHTML('beforeend',note('法律名は現在の名称も確認する','原教材にある「プロバイダ責任制限法」は現在「情報流通プラットフォーム対処法」と呼ばれます。教材の旧称も試験資料で見かける可能性があるため、旧称と現名称を対応させて覚えます。'));
    }
    if(lesson.track==='programming'&&!document.querySelector('.ct-notation-v10')){
      const source=document.querySelector('[data-program-source-v9]')||document.querySelector('#points');
      source?.insertAdjacentHTML('afterend',`<aside class="current-note-v10 ct-notation-v10"><span>COMMON TEST</span><div><b>本番ではPythonの綴りを暗記する試験ではない</b><p>共通テストのプログラミング問題は大学入試センター独自のプログラム表記を使います。この講ではPythonで動きを確かめつつ、代入・条件分岐・反復・配列・関数という処理の意味へ読み替えることを優先します。</p></div></aside>`);
    }
  };
})();