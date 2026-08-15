/* 令和8年度共通テスト『情報Ⅰ』の公式評価を、学習導線へ反映する。 */
(() => {
  function init(){
    const shell=document.querySelector('.tool-shell');
    const intro=shell?.querySelector('.tool-intro');
    if(!shell||!intro||shell.querySelector('.ct-hub-v7'))return;
    intro.insertAdjacentHTML('afterend',`<section class="ct-hub-v7">
      <div class="ct-hub-v7-head"><span>COMMON TEST</span><h2>本番は「覚えた語を答える」だけではない</h2><p>大学入試センターの令和8年度評価では、教科書の基本知識に加え、身近な場面や初見資料を読み、知識を組み合わせて問題を発見・解決する力が重視されています。</p></div>
      <div class="ct-hub-v7-grid">
        <div><b>幅広い基礎</b><p>記憶装置、セキュリティ、2進・16進、情報デザイン、メールなどを場面と結び付ける。</p></div>
        <div><b>システムの流れ</b><p>情報システムを比較し、データや認証情報がどこを通るかを図から追う。</p></div>
        <div><b>デジタル表現×論理</b><p>画像・階調・ヒストグラム・bit・論理演算を、提示された処理の目的に合わせて使う。</p></div>
        <div><b>プログラムを追って改善</b><p>初見の表記でも、変数・配列・条件・反復を手で追い、処理の改善まで考える。</p></div>
        <div><b>データ分析を評価</b><p>欠損、グラフ、散布図、相関、箱ひげ図、回帰を組み合わせ、分析方法が目的に合うか判断する。</p></div>
      </div>
      <p class="ct-hub-v7-source">大学入試センター「令和8年度 大学入学共通テスト問題評価・分析委員会報告書（情報Ⅰ）」の評価内容を学習用に要約。</p>
    </section>`);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();