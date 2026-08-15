/* 情報Ⅰ v10 — 令和8年度共通テスト公式分析から学習重点を可視化 */
(() => {
  function init(){
    const root=document.querySelector('.tool-shell');if(!root||document.querySelector('.exam-focus-v10'))return;
    const anchor=document.querySelector('.tool-route-grid')||document.querySelector('.ct-hub-v7');if(!anchor)return;
    anchor.insertAdjacentHTML('afterend',`<section class="exam-focus-v10">
      <header><span>R8 OFFICIAL ANALYSIS</span><h2>正答率が落ちたところを、優先して鍛える</h2><p>令和8年度の大学入試センター自己評価では、表面的な用語理解より「仕組みを深く理解して使う」力で差がついたと分析されています。</p></header>
      <div class="exam-focus-grid-v10">
        <a href="lesson.html?id=b5-1"><b>記憶装置</b><strong>用語→役割・容量・保存期間</strong><p>主記憶と補助記憶を、実際の利用場面から判断する。</p></a>
        <a href="lesson.html?id=b8-3"><b>メール</b><strong>SMTP / POP / IMAPを流れで</strong><p>どのサーバがいつ失敗を検出するかまで追える理解へ。</p></a>
        <a href="programming.html"><b>プログラム</b><strong>実行結果より「状態更新」</strong><p>配列・反復・分岐を手で追い、改善理由まで説明する。</p></a>
        <a href="lesson.html?id=b9-4"><b>データ分析</b><strong>計算→妥当性評価</strong><p>回帰・補正を計算した後、その方法が目的に合うか評価する。</p></a>
      </div>
    </section>`);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();