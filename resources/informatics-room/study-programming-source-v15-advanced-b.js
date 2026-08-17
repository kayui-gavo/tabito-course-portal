/* 情報Ⅰ＜プログラミング編＞ v15b — 上級第42〜48講をKZC72000本文・確認問題・解答へ逐講再整合 */
(() => {
  const lessons=window.STUDY_PROGRAMMING||[];
  const source=window.PROGRAM_SOURCE_V9||{};
  const advanced=window.PROGRAM_ADVANCED_V9||{};
  const get=id=>lessons.find(x=>x.id===id);
  const setLesson=(id,patch)=>{const x=get(id);if(x)Object.assign(x,patch);};
  const setSource=(id,core,read,pitfall,drill)=>{if(!source[id])source[id]={};Object.assign(source[id],{core,read,pitfall,drill});};
  const setAdvanced=(id,patch)=>{if(!advanced[id])advanced[id]={};Object.assign(advanced[id],patch);};

  setLesson('p42',{
    title:'素因数分解',
    goals:['平方根までの探索で約数をペアとして列挙できる','確認問題の while 文で素因数を順に取り出せる'],
    lead:'教材の第42講は「素因数分解」という題ですが，例題ではまず36の約数を平方根まで調べてペアで列挙し，確認問題で入力整数を素因数分解します。',
    points:[
      {title:'例題は約数の列挙',body:'i を1から int(number**0.5) まで調べ，number%i==0 なら i と pair_yakusuu=number//i を約数として追加します。'},
      {title:'平方数の重複を避ける',body:'i==pair_yakusuu のときは同じ約数なので2回追加しません。最後に Yakusuu.sort() で昇順へ並べます。'},
      {title:'確認問題で素因数分解',body:'i=2 から始め，割り切れないときだけ i を1増やし，割り切れるときは number=number//i として同じ i をもう一度試します。'}
    ],
    code:"number = 36\nYakusuu = []\n\nfor i in range(1, int(number ** 0.5) + 1):\n    if number % i == 0:\n        Yakusuu.append(i)\n        pair_yakusuu = number // i\n        if i != pair_yakusuu:\n            Yakusuu.append(pair_yakusuu)\n\nYakusuu.sort()\nprint(number, 'の約数 :', Yakusuu)",
    quiz:{question:'教材確認問題の素因数分解で，while i*i<=number の中で「現在の i では割り切れないので次の候補へ進む」条件はどれですか。',choices:['number % i != 0','number % i == 0','number / i > 0','number // i == 1'],answer:0,explanation:'教材解答の正解は①。余りが0でないときだけ i=i+1 とし，割り切れるときは number を i で割って同じ i を続けて試します。'},
    terms:['約数','素因数分解','平方根','pair_yakusuu','sort']
  });
  setSource('p42','題名は「素因数分解」。例題はnumber=36の約数列挙で，1〜√numberを調べ，割り切れればiとnumber//iを追加してsort。確認問題は素因数分解で，割り切れない条件① number%i!=0 のときiを増やす。','例題は「約数がペアで現れる」こと，確認問題は「同じ素因数で割れる間は候補を進めない」ことを分けて読む。','例題と確認問題の処理目的を混同しない。教材の章題は素因数分解だが例題コード自体は約数列挙。','36の約数ペア (1,36),(2,18),(3,12),(4,9),(6,6) を書き，重複条件を確認する。');
  setAdvanced('p42',{title:'平方根までの約数探索から素因数分解へつなぐ',conditions:['例題は約数をペアで列挙','平方根まで調べればよい','確認問題は割り切れる間同じ因数を使う'],code:get('p42')?.code||'',focus:'例題と確認問題が別アルゴリズムであることを明確に分ける。',check:'36の約数列挙と，素因数分解のwhile処理をそれぞれ説明できる。'});

  setLesson('p43',{
    title:'倍数の判定・FizzBuzz',
    goals:['% と and で複数の倍数・偶奇条件を同時に判定できる','FizzBuzzで複合条件を先に置く理由を説明できる'],
    lead:'教材例題は1〜100について「5の倍数かつ偶数なら five_even」「7の倍数かつ奇数なら seven_odd」と表示し，確認問題でFizzBuzzへ発展します。',
    points:[
      {title:'例題の複合条件',body:'5の倍数かつ偶数は i%5==0 and i%2==0，7の倍数かつ奇数は i%7==0 and i%2==1 です。'},
      {title:'どれでもなければ数字',body:'if・elif のどちらにも当てはまらない場合だけ else で i 自身を表示します。'},
      {title:'FizzBuzzは両方を最初に',body:'3と5の両方の倍数を最初に判定しないと，15のような数が先にFizzまたはBuzzへ入ってしまいます。'}
    ],
    code:"for i in range(1, 101):\n    if i % 5 == 0 and i % 2 == 0:\n        print('five_even')\n    elif i % 7 == 0 and i % 2 == 1:\n        print('seven_odd')\n    else:\n        print(i)",
    quiz:{question:'教材確認問題のFizzBuzzで，FizzBuzzを表示する最初の条件はどれですか。',choices:['i % 3 == 0 or i % 5 == 0','i % 3 != 0 and i % 5 != 0','i / 3 == 0 not i / 5 == 0','i % 3 == 0 and i % 5 == 0'],answer:3,explanation:'教材解答の正解は④。3の倍数かつ5の倍数なので and で両方の余りが0になる条件を組み合わせます。'},
    terms:['倍数','偶数','奇数','and','FizzBuzz']
  });
  setSource('p43','例題は1〜100で5の倍数かつ偶数→five_even，7の倍数かつ奇数→seven_odd，その他は数字。確認問題FizzBuzzは3と5両方の倍数を最初に判定し，正解④ i%3==0 and i%5==0。','%で倍数と偶奇を判定し，andで同時成立を作る。FizzBuzzは条件順も処理の一部。','複合条件を後ろに置くと15が先の単独条件へ入る。orは「どちらか一方」でも成立するのでFizzBuzz条件にはならない。','1〜20を手で分類し，15でどのifが最初に成立するか確認する。');
  setAdvanced('p43',{title:'倍数・偶奇の複合条件からFizzBuzzへ',conditions:['%で倍数判定','andで条件を同時成立','FizzBuzzは複合条件を先に'],code:get('p43')?.code||'',focus:'各if/elifがどの整数集合を表すかを読む。',check:'15でFizzBuzz条件を先に置く必要を説明できる。'});

  setLesson('p44',{
    title:'バブルソート・選択ソート',
    goals:['バブルソートの隣接比較と交換を追える','選択ソートで未確定部分の最小値の添字を更新できる'],
    lead:'教材は例題で交換法（バブルソート），確認問題で選択法（選択ソート）を扱い，どちらも [64,34,25,12,22,11,90] を昇順へ並べます。',
    points:[
      {title:'バブルソート',body:'左から隣接する Data[j] と Data[j+1] を比較し，左が大きければ temp を使って交換します。各周回で大きい値が右へ確定していきます。'},
      {title:'交換の3行',body:'temp=Data[j]，Data[j]=Data[j+1]，Data[j+1]=temp の順で，元の左要素を失わず入れ替えます。'},
      {title:'選択ソート',body:'未確定部分から最小値の位置 min_index を探し，Data[j] < Data[min_index] のとき min_index=j と更新します。'}
    ],
    code:"Data = [64, 34, 25, 12, 22, 11, 90]\nn = len(Data)\n\nfor i in range(n):\n    for j in range(n - i - 1):\n        if Data[j] > Data[j + 1]:\n            temp = Data[j]\n            Data[j] = Data[j + 1]\n            Data[j + 1] = temp\n\nprint('並べ替え後 :', Data)",
    quiz:{question:'教材確認問題の選択ソートで，現在の最小値より小さい要素を見つけて min_index を更新する条件はどれですか。',choices:['Data[j] < Data[min_index]','Data[j] > Data[min_index]','Data[j] < Data[i]','Data[j] != Data[min_index]'],answer:0,explanation:'教材解答の正解は①。未確定部分を走査し，現在の最小候補 Data[min_index] より小さい Data[j] を見つけたときに更新します。'},
    terms:['バブルソート','交換法','選択ソート','選択法','min_index']
  });
  setSource('p44','例題は交換法（バブルソート）でData=[64,34,25,12,22,11,90]を昇順。空欄は交換処理 Data[j]=Data[j+1]。確認問題は選択法で最小候補を探し，正解① Data[j] < Data[min_index]。','バブルは「隣接比較→交換」，選択は「未確定範囲から最小位置探索→先頭と交換」。','2つのソートを一つのアルゴリズムとして混ぜない。バブルの内側range(n-i-1)と選択のrange(i+1,n)は意味が異なる。','同じ小配列[3,4,2]を両方式で1周ずつ追い，確定する位置を比較する。');
  setAdvanced('p44',{title:'交換法と選択法を教材の2題で比較する',conditions:['例題は隣接比較のバブルソート','確認問題は最小値探索の選択ソート','どちらも昇順だが確定の仕方が異なる'],code:get('p44')?.code||'',focus:'バブルでは右端，選択では左端に何が確定するかを見る。',check:'2方式の比較対象と交換タイミングの違いを説明できる。'});

  setLesson('p45',{
    title:'グラフ理論',
    goals:['無向の友人関係を対称な隣接行列として読める','有向SNSで行方向と列方向を区別してフォロー関係を読める'],
    lead:'教材例題はA〜Dの「友人関係」を無向グラフと2次元配列で表し，確認問題で矢印をもつSNSの有向グラフへ進みます。ここでは無向と有向を混同しないことが最重要です。',
    points:[
      {title:'例題：無向の友人関係',body:'友人関係は相互なので Data は対称です。AとBが友人なら Data[A][B]=1 であり Data[B][A]=1 でもあります。'},
      {title:'確認問題：行は「その人がフォロー」',body:'Data[name_index][i]==1 は，入力した人から i へ矢印が出ているので「その人がフォローしている相手」を ToFollow に追加します。'},
      {title:'列は「その人をフォロー」',body:'Data[i][name_index]==1 は i から入力した人へ矢印が入るので「その人をフォローしている人」を FromFollow に追加します。'}
    ],
    code:"Data = [\n    [0, 1, 1, 0], # A\n    [1, 0, 1, 1], # B\n    [1, 1, 0, 0], # C\n    [0, 1, 0, 0]  # D\n]\nHuman = ['A', 'B', 'C', 'D']\nFriends = []\nname = input('AからDの中で，友人関係を知りたい人を入力してください：')\nname_index = Human.index(name)\n\nfor i in range(len(Data)):\n    if Data[name_index][i] == 1:\n        Friends.append(Human[i])\n\nprint(name, 'の友達は', Friends)",
    quiz:{question:'教材確認問題の有向SNSで，入力した人をフォローしている人（FromFollow）を見つける条件はどれですか。',choices:['Data[name_index][i] == 0','Data[i][name_index] != 1','Data[i][name_index] == 1','FromFollow[i] == name'],answer:2,explanation:'教材解答の正解は③。列 Data[i][name_index] を見ると，i から入力した人へ向かう矢印，つまり「入力した人をフォローしている人」を読めます。'},
    terms:['グラフ理論','無向グラフ','有向グラフ','隣接行列','ToFollow','FromFollow']
  });
  setSource('p45','例題は無向の友人関係。Data=[[0,1,1,0],[1,0,1,1],[1,1,0,0],[0,1,0,0]]で対称。確認問題は有向SNS。Data[name_index][i]==1は本人がiをフォロー，Data[i][name_index]==1はiが本人をフォロー。確認問題の空欄は③ Data[i][name_index]==1。','例題（相互・対称）と確認問題（方向あり）を必ず別物として読む。確認問題では行=外向き，列=内向き。','無向の例題が対称だからといって，有向SNSでも行と列を同じ意味にしない。結果が偶然同じ集合でも読んだ方向は別。','確認問題DataでA,B,C,DそれぞれについてToFollowとFromFollowを行・列から別々に求める。');
  setAdvanced('p45',{title:'無向の友人関係から有向SNSへ',conditions:['例題の友人関係は相互で行列が対称','確認問題は矢印をもつ有向関係','行=本人がフォロー，列=本人をフォロー'],code:"Data = [\n [0,1,1,0],\n [1,0,0,1],\n [0,0,0,0],\n [1,1,0,0]\n]\nHuman = ['A','B','C','D']\nToFollow = []\nFromFollow = []\nname = 'B'\nname_index = Human.index(name)\nfor i in range(len(Data)):\n    if Data[name_index][i] == 1:\n        ToFollow.append(Human[i])\n    if Data[i][name_index] == 1:\n        FromFollow.append(Human[i])\nprint(ToFollow)\nprint(FromFollow)",focus:'Data[name_index][i] と Data[i][name_index] を必ず向き付きで読む。',check:'無向グラフの対称性と，有向グラフの行・列の違いを説明できる。'});

  setLesson('p46',{
    title:'待ち行列',
    goals:['座席ごとの残り滞在時間を1分ごとに更新できる','確認問題で信号周期と渋滞台数の更新式を追える'],
    lead:'教材例題は8席のラーメン店の待ち行列を30分間シミュレーションし，確認問題では10秒刻みの交通信号シミュレーションへ発展します。',
    points:[
      {title:'例題：座席配列は残り時間',body:'seats の各要素は，その客が店を出るまでの残り時間です。0より大きい席は1分経過するたび seats[i]=seats[i]-1 と更新します。'},
      {title:'空席へ待ち客を入れる',body:'seats[i]==0 で waiting>0 なら total_time=13 を入れ，waiting を1減らします。seats.count(0) から着席人数も求めます。'},
      {title:'確認問題：青と赤で更新式を分ける',body:'青信号では wait=max(wait+arrive-passtime,0)，赤信号では wait=wait+arrive。信号周期内の位置 mod で青か赤かを決めます。'}
    ],
    code:"import random\nseats = [0, 0, 0, 0, 0, 0, 0, 0]\nseats_num = len(seats)\ncook_time = 3\neat_time = 10\ntotal_time = cook_time + eat_time\nwaiting = 0\n\nfor minute in range(30):\n    arrival = random.randint(0, 2)\n    waiting = waiting + arrival\n    for i in range(seats_num):\n        if seats[i] > 0:\n            seats[i] = seats[i] - 1\n        elif waiting > 0:\n            seats[i] = total_time\n            waiting = waiting - 1\n    print(minute + 1, '分 : 到着客 :', arrival, '行列客 :', waiting, '席に座っている客 :', seats_num - seats.count(0))",
    quiz:{question:'教材確認問題の交通シミュレーションで青信号のとき，最大10台を通過させた後の渋滞台数を0未満にしない式 max( ___ ,0) の中身はどれですか。',choices:['wait + arrive - passtime','wait + arrive','wait + arrive + passtime','arrive - passtime'],answer:0,explanation:'教材解答の正解は①。現在の渋滞 wait に新規到着 arrive を加え，通過可能台数 passtime を引きます。結果が負なら max(...,0) で0にします。'},
    terms:['待ち行列','シミュレーション','seats.count','max関数','信号周期']
  });
  setSource('p46','例題は8席ラーメン店。調理3分＋食事10分=13分，毎分0〜2人到着，seats各要素は残り時間で，使用中はseats[i]-1，空席かつ待ち客ありなら13を代入。確認問題は交通渋滞：10秒に5〜10台到着，青60秒/赤30秒，青でwait=max(wait+arrive-passtime,0)，正解①。','例題は「席ごとの状態」，確認問題は「全体の待ち台数」を時間刻みで更新する。どちらも状態を次時刻へ受け渡すシミュレーション。','例題で使用中の席を増やさない。確認問題では赤信号時にpasstimeを引かない。教材掲載の乱数実行結果は一例で固定値ではない。','固定arrival列を仮定し，3分程度だけseatsとwaitingを手で更新する。');
  setAdvanced('p46',{title:'待ち行列を時刻ごとの状態更新として読む',conditions:['例題は8席・残り時間・待ち人数','毎分到着を加えて席を更新','確認問題は青/赤でwait更新式を切り替える'],code:get('p46')?.code||'',focus:'状態更新の順序「到着→各席の時間更新/着席→表示」を追う。',check:'ラーメン店と交通渋滞の両方を「状態を次時刻へ渡す」モデルとして説明できる。'});

  setLesson('p47',{
    title:'パリティチェック',
    goals:['偶数パリティのパリティビットを1の個数から決められる','JANコードのチェックディジット計算を奇数桁和・偶数桁和へ分けて追える'],
    lead:'教材例題は偶数パリティによる誤り検出，確認問題は13桁JANコードのチェックディジットによる誤りチェックを扱います。',
    points:[
      {title:'偶数パリティ',body:'末尾のパリティビットを除いた1の個数 count が偶数なら parity_bit=0，奇数なら1にして，全体の1の個数を偶数にします。'},
      {title:'末尾と比較',body:'求めた parity_bit と bit_retsu[-1] を比較し，一致すれば正しい，不一致なら正しいパリティビットを表示します。'},
      {title:'JANの重み付き合計',body:'確認問題では先頭12桁について奇数桁の和 odd_sum，偶数桁の和 even_sum を求め，total=odd_sum+even_sum*3 とします。'}
    ],
    code:"count = 0\nbit_retsu = input('パリティビットを含めたビット列を入力してください : ')\n\nfor i in range(len(bit_retsu) - 1):\n    if bit_retsu[i] == '1':\n        count = count + 1\n\nif count % 2 == 0:\n    parity_bit = '0'\nelse:\n    parity_bit = '1'\n\nif parity_bit == bit_retsu[-1]:\n    print('ビット列は正しいです。パリティビット :', parity_bit)\nelse:\n    print('ビット列は誤っています。正しいパリティビットは', parity_bit, 'です。')",
    quiz:{question:'教材確認問題の13桁JANコードで，先頭12桁からチェックディジットを求めるための total の式はどれですか。',choices:['odd_sum * 3 + even_sum','odd_sum + even_sum * 3','odd_sum * even_sum','odd_sum + 3 + even_sum'],answer:1,explanation:'教材解答の正解は②。奇数桁の和はそのまま，偶数桁の和を3倍して加えます。'},
    terms:['偶数パリティ','パリティビット','誤り検出','JANコード','チェックディジット']
  });
  setSource('p47','例題は偶数パリティ。末尾を除く1の数countが偶数なら0，奇数なら1を正しいparity_bitとし，入力末尾と比較。確認問題は13桁JANコード。先頭12桁の奇数桁和odd_sumと偶数桁和even_sumを求め，正解② total=odd_sum+even_sum*3。','パリティでは「末尾を除いて数える→必要なbitを決める→末尾と比較」。JANでは「12桁を位置の奇偶で分ける→重み3→1の位からcheck_digit」。','配列添字i=0はコードの1桁目（奇数桁）に対応する。JAN確認問題では末尾13桁目を合計に入れない。','10100と10001でcount・parity_bit・末尾比較を手で確認する。');
  setAdvanced('p47',{title:'偶数パリティで誤りを検出する',conditions:['末尾を除く1の数を数える','偶数ならparity 0，奇数なら1','求めたbitと末尾を比較'],code:get('p47')?.code||'',focus:'countに含める範囲が len(bit_retsu)-1 までである点を確認する。',check:'10100と10001が正しい偶数パリティになる理由を説明できる。'});

  setLesson('p48',{
    title:'すごろくゲーム',
    goals:['1ターンの位置更新・イベント判定・ゴール判定を順に追える','確認問題で毎回変わるお化け位置と現在位置を比較できる'],
    lead:'教材は0マス目から開始し，六面サイコロで進み，10マス目の罠なら5マス戻り，20マス目以上でゴールする1人用すごろくを作ります。確認問題では15〜17マス目のどこかに毎回お化けが出現します。',
    points:[
      {title:'まず出目だけ進む',body:'各ターンで roll=random.randint(1,6) を得たら player_position=player_position+roll として現在位置を更新します。'},
      {title:'罠は「ちょうど10」',body:'player_position==trap_position のときだけ5マス戻ります。10を通過しただけでは罠は発動しません。'},
      {title:'20以上でゴール',body:'while の条件は player_position<goal_position。各ターン後に20以上ならゴール表示し，roll_count で振った回数を示します。'}
    ],
    code:"import random\nplayer_position = 0\ntrap_position = 10\ngoal_position = 20\nroll_count = 0\n\nwhile player_position < goal_position:\n    input('サイコロを振ってください (Enterを押す)！')\n    roll = random.randint(1, 6)\n    player_position = player_position + roll\n    print('サイコロの出目：', roll, player_position, 'マス目に移動しました。')\n    roll_count = roll_count + 1\n    if player_position == trap_position:\n        print('移動先に罠がありました！ここから5マス戻ります！')\n        player_position = player_position - 5\n    if player_position >= goal_position:\n        print('ゴールに到達しました！おめでとうございます！')\n        print('合計でサイコロを', roll_count, '回振りました。')\n\nprint('ゲーム終了！')",
    quiz:{question:'教材確認問題では毎回 ghost_position=random.choice([15,16,17]) とします。お化けに遭遇する条件はどれですか。',choices:['player_position < ghost_position','player_position > ghost_position','player_position == ghost_position','player_position != ghost_position'],answer:2,explanation:'教材解答の正解は③。現在位置が，そのターンにランダムに選ばれたお化け位置とちょうど一致したときだけ5マス戻ります。'},
    terms:['while文','random.randint','random.choice','状態更新','ゴール判定']
  });
  setSource('p48','例題は0開始，六面サイコロ，10マス目に止まると5戻る，20以上でゴール，roll_countを表示。空欄は④ player_position=player_position+roll。確認問題は毎回15,16,17からghost_positionをrandom.choiceし，遭遇条件は③ player_position==ghost_position。','1ターンを「入力→出目→位置更新→回数更新→イベント判定→ゴール判定」に分解する。','罠/お化けは「通過」ではなく位置が等しいときだけ発動。確認問題ではghost_positionが毎ターンrandom.choiceで変わる。','固定した出目列を仮定し，player_positionとroll_countをターン表で追う。');
  setAdvanced('p48',{title:'罠のある1人用すごろくを教材条件どおり実行する',conditions:['0からサイコロ分進む','10にちょうど止まれば5戻る','20以上でゴールし回数を表示'],code:get('p48')?.code||'',focus:'位置更新のあとに罠判定，そのあとにゴール判定を行う順序を追う。',check:'「10に止まる」と「10を越える」を区別し，確認問題の毎回変わるghost_positionも説明できる。'});
})();