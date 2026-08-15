/* 令和8年度共通テスト『情報Ⅰ』の公式評価を、学習導線へ反映する。 */
(() => {
  function init(){
    const shell=document.querySelector('.tool-shell');
    const intro=shell?.querySelector('.tool-intro');
    if(!shell||!intro||shell.querySelector('.ct-hub-v7'))return;
    intro.insertAdjacentHTML('afterend',`<section class="ct-hub-v7">
      <div class="ct-hub-v7-head"><span>COMMON TEST 2026</span><h2>令和8年度は4大問。知識を場面の中で使う</h2><p>大学入試センターの問題評価・分析では、教科書の基本知識に加え、日常・社会の場面や初見資料を読み、複数の知識を組み合わせて問題を発見・解決し、方法そのものを評価する力が重視されています。</p></div>
      <div class="ct-hub-v7-grid">
        <div><b>第1問｜基礎を横断</b><p>記憶装置、セキュリティ、2進・16進、情報デザイン、電子メールなど。単語ではなく身近な事象へ適用する。</p></div>
        <div><b>第2問｜システム＋画像・論理</b><p>Aは情報システムのデータや認証情報の流れ、Bは画像・階調・ヒストグラム・bit・論理演算を組み合わせて読む。</p></div>
        <div><b>第3問｜プログラム</b><p>待ち時間などのモデルを数値で確認し、配列・条件・反復を追跡し、処理の改善まで考える。</p></div>
        <div><b>第4問｜データ分析</b><p>オープンデータ、欠損、グラフ、散布図、相関、箱ひげ図、回帰を組み合わせ、分析・補正方法が目的に合うか評価する。</p></div>
      </div>
      <p class="ct-hub-v7-source">大学入試センター「令和8年度 大学入学共通テスト問題評価・分析委員会報告書」『情報Ⅰ』高等学校評価・自己評価の内容を学習用に要約。</p>
    </section>`);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();