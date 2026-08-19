/* 情報Ⅰ exam v23 — 原教材実践問題とWeb独自確認問題の出自を明確化 */
(() => {
  const intro=document.querySelector('.index-intro .index-lead');
  if(intro)intro.textContent='本編47PARTの確認・仕上げ問題と、原教材の実践問題を同じ学習導線から使えます。原教材実践は設問・条件・数値に沿って収録し、教材で解答が省略されている課題はWeb側でも一つの模範解答へ固定していません。共通テスト型演習・短縮模試は、知識を組み合わせて使うためのWeb学習用演習として区別して利用できます。';
  window.EXAM_SOURCE_COPY_V23=true;
})();