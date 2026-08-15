/* 情報Ⅰ＜プログラミング編＞ v11 — advanced source-alignment fixes */
(() => {
  const a=window.PROGRAM_ADVANCED_V9||{};
  if(a.p44){
    a.p44.title='バブルソートと選択ソートを「何が確定するか」で比較する';
    a.p44.conditions=['バブルソートは隣接要素を比較・交換する','選択ソートは未確定部分から最小値を探す','各周回後にどの位置が確定したかを確認する'];
    a.p44.code=`# バブルソート\nA = [5,2,4,1]\nfor end in range(len(A)-1,0,-1):\n    for i in range(end):\n        if A[i] > A[i+1]:\n            A[i], A[i+1] = A[i+1], A[i]\nprint(A)\n\n# 選択ソート\nB = [5,2,4,1]\nfor i in range(len(B)-1):\n    min_index = i\n    for j in range(i+1,len(B)):\n        if B[j] < B[min_index]:\n            min_index = j\n    B[i], B[min_index] = B[min_index], B[i]\nprint(B)`;
    a.p44.focus='バブルソートでは右側の最大値、選択ソートでは左側の最小値が、1周ごとに確定していく点を比べる。';
    a.p44.check='どちらも [1,2,4,5] になるが、「隣接比較」と「最小値選択」という処理の違いを途中配列で説明できる。';
  }
  if(a.p45){
    a.p45.title='有向グラフでSNSのフォロー方向を読み分ける';
    a.p45.conditions=['確認問題では矢印の先を「フォローしている相手」とする','Data[name_index][i]==1 はその人から外へ出る関係を読む','Data[i][name_index]==1 はその人へ入ってくる関係を読む'];
    a.p45.code=`Data = [\n [0,1,1,0], # A\n [1,0,0,1], # B\n [0,0,0,0], # C\n [1,1,0,0]  # D\n]\nHuman = ['A','B','C','D']\nToFollow = []\nFromFollow = []\nname = 'B'\nname_index = Human.index(name)\nfor i in range(len(Data)):\n    if Data[name_index][i] == 1:\n        ToFollow.append(Human[i])\n    if Data[i][name_index] == 1:\n        FromFollow.append(Human[i])\nprint(ToFollow)\nprint(FromFollow)`;
    a.p45.focus='同じ name_index でも、Data[name_index][i] は行、Data[i][name_index] は列を見る。向きをもつグラフではこの2つを区別する。';
    a.p45.check='Bがフォローしている人は A・D、Bをフォローしている人も A・D。結果が同じでも、行と列から別々に求めたことを説明できる。';
  }
  if(a.p46){
    a.p46.title='交通信号と到着台数から渋滞をシミュレーションする';
    a.p46.conditions=['10秒ごとに5〜10台がランダムに到着する','青信号では到着分を加えて通過可能台数を引き、待ち台数を0未満にしない','赤信号では通過できないため到着台数をそのまま待ち台数へ加える'];
    a.p46.code=`import random\ntotaltime = 18\npasstime = 10\nsignal_b = 6\nsignal_r = 3\nwait = 0\nfor t in range(1, totaltime + 1):\n    arrive = random.randint(5, 10)\n    mod = (t - 1) % (signal_b + signal_r) + 1\n    blue_flag = (mod <= signal_b)\n    if blue_flag:\n        wait = max(wait + arrive - passtime, 0)\n    else:\n        wait = wait + arrive\n    print(t * 10, arrive, wait)`;
    a.p46.focus='教材の中心は、時刻tから信号周期内の位置modを求め、青/赤でwaitの更新式を切り替えること。各時刻で「到着前wait→arrive加算→通過後wait」を追う。';
    a.p46.check='青信号の更新が max(wait + arrive - passtime, 0)、赤信号の更新が wait + arrive になる理由を、車の流れから説明できる。';
  }
  if(a.p48){
    a.p48.title='罠のある1人用すごろくゲーム';
    a.p48.conditions=['六面サイコロの出目だけ現在位置を進める','10マス目にちょうど止まると5マス戻る','20マス目以上へ到達したらゴールとし、振った回数を出力する'];
    a.p48.code=`import random\nplayer_position = 0\ntrap_position = 10\ngoal_position = 20\nroll_count = 0\nwhile player_position < goal_position:\n    roll = random.randint(1, 6)\n    player_position = player_position + roll\n    roll_count = roll_count + 1\n    if player_position == trap_position:\n        player_position = player_position - 5\n    if player_position >= goal_position:\n        break\nprint(roll_count, player_position)`;
    a.p48.focus='1ターンを「出目→位置更新→回数更新→罠判定→ゴール判定」に分け、罠の処理後の位置を次の反復へ渡す。';
    a.p48.check='教材条件の「10マス目で5マス戻る」「20以上でゴール」をコードの条件式と対応させられる。';
  }
})();