/* 情報Ⅰ＜プログラミング編＞ v14 — 教材の「実行結果」とWeb標準出力の差を明示 */
(() => {
  const ids=new Set(['p15','p19','p20','p21','p22','p26']);
  const baseRender=window.renderStudyLesson;
  function insert(){
    const id=new URLSearchParams(location.search).get('id')||'';
    if(!ids.has(id)||document.querySelector('[data-runtime-fidelity-v14]'))return;
    const run=document.querySelector('[data-program-run-v10]');
    if(!run)return;
    const note=document.createElement('div');
    note.className='program-run-v10-note program-runtime-fidelity-v14';
    note.dataset.runtimeFidelityV14=id;
    note.innerHTML='<b>教材の「実行結果」とこの実行欄</b><p>この講の教材例は、末尾に書かれた関数呼び出しの戻り値を「実行結果」として示しています。上の例題コードは教材どおりに掲載しています。一方、このWeb実行欄は <code>print()</code> などの標準出力を表示するため、そのまま実行すると「出力はありません」となる場合があります。戻り値をこの欄で確認するときは、最後の関数呼び出しを <code>print(...)</code> で囲んで実行してください。</p>';
    const header=run.querySelector('header');
    if(header)header.insertAdjacentElement('afterend',note);else run.prepend(note);
  }
  window.renderStudyLesson=function renderProgrammingRuntimeFidelityV14(){baseRender();insert();};
})();
