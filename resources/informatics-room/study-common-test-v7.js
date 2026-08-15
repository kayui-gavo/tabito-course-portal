/* 共通テスト対策 v7
   原教材のPython学習を、大学入試センター独自プログラム表記の読解へ橋渡しする。 */
(() => {
  const baseRender=window.renderStudyLesson;
  function current(){
    const id=new URLSearchParams(location.search).get('id')||'';
    return typeof studyLessonById==='function'?studyLessonById(id):null;
  }
  function mainBridge(lesson){
    if(lesson.track!=='main'||lesson.lecture!==6||lesson.part<2)return;
    const box=document.querySelector('.et-common-test-v7');
    if(!box||box.querySelector('.ct-notation-v7'))return;
    box.insertAdjacentHTML('beforeend','<p class="ct-notation-v7"><strong>表記について：</strong>共通テストのプログラミング問題では、特定の言語の文法暗記ではなく、初見でも読める大学入試センター独自のプログラム表記が用いられます。Pythonで学んだ「変数・条件・反復・配列・関数」を、記号が変わっても処理の意味で読み替えられるようにしてください。</p>');
  }
  function programmingBridge(lesson){
    if(lesson.track!=='programming')return;
    const anchor=document.querySelector('.program-source-flow-v6')||document.querySelector('.lesson-goals');
    if(!anchor||document.querySelector('.common-test-code-v7'))return;
    anchor.insertAdjacentHTML('afterend',`<aside class="common-test-code-v7"><div><b>共通テストへの読み替え</b><span>Pythonの書式そのものを暗記するのではなく、処理の意味を読みます。</span></div><ol><li>代入：右辺を計算して変数を更新する</li><li>条件：真偽を判定し、進む処理を選ぶ</li><li>反復：何回/どの条件まで繰り返すかを追う</li><li>配列・関数：添字、引数、戻り値の変化を表にして追う</li></ol></aside>`);
  }
  window.renderStudyLesson=function renderCommonTestBridgeV7(){
    baseRender();
    const lesson=current(); if(!lesson)return;
    mainBridge(lesson); programmingBridge(lesson);
  };
})();