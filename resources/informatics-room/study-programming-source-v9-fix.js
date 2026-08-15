/* 情報Ⅰ＜プログラミング編＞ v12 — source-order / source-model micro fixes */
(() => {
  const p=window.PROGRAM_SOURCE_V9||{};
  if(p.p16)p.p16.drill='4要素のおみくじ配列で、random.randint(0,3) の結果を添字として1要素を取り出す流れを追う。';
  if(p.p45){
    p.p45.core='第45講は二段階で学ぶ。例題ではA〜Dの相互的な友人関係を0/1の2次元配列で表し、確認問題では矢印をもつ有向グラフへ発展してSNSのフォロー関係を扱う。';
    p.p45.read='友人関係では Human.index(name) で得た name_index の行 Data[name_index][i] を走査する。SNSでは、その行を見ると「その人がフォローしている相手」、列 Data[i][name_index] を見ると「その人をフォローしている相手」になる。';
    p.p45.pitfall='例題の友人関係は相互的なので隣接行列が対称だが、確認問題のSNSフォローは方向をもつため一般には対称とは限らない。「行」と「列」を入れ替えると矢印の向きも逆になる。';
    p.p45.drill='まず例題の友人関係でBの行からFriendsを求め、次に確認問題のSNS表でBについてToFollowとFromFollowをそれぞれ行・列から求める。';
  }
  if(p.p46){
    p.p46.core='教材の渋滞シミュレーションでは、10秒ごとのランダムな到着台数と信号周期を組み合わせ、青信号と赤信号で待ち台数 wait の更新式を切り替える。';
    p.p46.read='tから信号周期内の位置modを求め、blue_flagを判定する。青なら max(wait+arrive-passtime,0)、赤なら wait+arrive として時刻ごとの状態を更新する。';
    p.p46.pitfall='到着台数 arrive と、すでに待っている台数 wait を混同しない。青信号でも待ち台数を負にしてはいけないため max(...,0) を使う。';
    p.p46.drill='各10秒について「直前wait・arrive・青/赤・更新後wait」の4列を作り、教材の実行結果を数行だけ手で再現する。';
  }
  if(p.p47){
    p.p47.core='第47講の例題は偶数パリティによる誤り検出を扱う。ビット列中の1の個数が偶数になるよう末尾のパリティビットを決め、受信した末尾bitと比較する。確認問題では同じ「検査用の値を計算して照合する」考え方をJANコードのチェックディジットへ発展させる。';
    p.p47.read='例題では最後の1bitを除いて1の個数countを数え、count%2==0ならparity_bit=0、奇数なら1とする。確認問題では13桁JANの先頭12桁について、人間の奇数桁（Pythonではindex 0,2,4,...）の和と偶数桁の和×3からcheck_digitを求める。';
    p.p47.pitfall='「第47講=JANコードだけ」ではない。例題の主題はパリティチェックで、JANは確認問題の応用。またPythonのindexは0始まりなので、indexが偶数の要素が人間の1,3,5,...桁に対応する。';
    p.p47.drill='1010に偶数パリティを付けて10100となる理由を説明した後、JAN 1234567890123について odd_sum + even_sum*3 → 1の位 → check_digit の流れを追う。';
  }
  if(p.p48){
    p.p48.core='第48講も二段階。例題は0マス開始、10マス目の固定罠で5マス戻り、20マス目以上でゴールする1人用すごろく。確認問題では罠を発展させ、15・16・17の候補からrandom.choiceで毎回お化け位置を選び、player_position==ghost_positionで遭遇判定する。';
    p.p48.read='例題は「出目→player_position更新→roll_count更新→固定罠判定→ゴール判定」。確認問題では位置更新後に ghost_position=random.choice(Ghostpositions) を実行し、そのターンのお化け位置と一致するかを判定する。';
    p.p48.pitfall='例題の罠は player_position==10、確認問題のお化けは player_position==ghost_position。どちらも「以上」ではなく「その位置に止まったか」を等号で判定する。ゴール条件だけは20以上。';
    p.p48.drill='まず固定罠10の例題を固定した出目列で追い、その後 Ghostpositions=[15,16,17] と仮定して「移動後位置→今回のお化け位置→遭遇有無→5マス戻る」の表を作る。';
  }
})();