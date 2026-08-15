/* 情報Ⅰ＜プログラミング編＞ v9 — source-order / source-model micro fixes */
(() => {
  const p=window.PROGRAM_SOURCE_V9||{};
  if(p.p16)p.p16.drill='4要素のおみくじ配列で、random.randint(0,3) の結果を添字として1要素を取り出す流れを追う。';
  if(p.p45){
    p.p45.core='グラフ理論の教材例では、A〜Dの友人関係を0/1の2次元配列で表し、Data[i][j]==1 を「iとjが友人」として読む。';
    p.p45.read='Human.index(name) で調べたい人の添字を得て、その人に対応する Data[name_index] の行を左から走査する。';
    p.p45.pitfall='教材の友人関係は相互的な関係なので表は対称になる。SNSの一方向フォロー関係のような有向グラフへ勝手に読み替えない。';
    p.p45.drill='A〜Dの友人関係表について、Bの行で1になっている列を探し、Friends配列へ対応する人名を追加する流れを追う。';
  }
})();