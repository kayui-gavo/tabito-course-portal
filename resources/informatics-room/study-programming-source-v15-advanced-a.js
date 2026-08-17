/* 情報Ⅰ＜プログラミング編＞ v15a — 上級第34〜41講をKZC72000本文・確認問題・解答へ逐講再整合 */
(() => {
  const lessons=window.STUDY_PROGRAMMING||[];
  const source=window.PROGRAM_SOURCE_V9||{};
  const advanced=window.PROGRAM_ADVANCED_V9||{};
  const get=id=>lessons.find(x=>x.id===id);
  const setLesson=(id,patch)=>{const x=get(id);if(x)Object.assign(x,patch);};
  const setSource=(id,core,read,pitfall,drill)=>{if(!source[id])source[id]={};Object.assign(source[id],{core,read,pitfall,drill});};
  const setAdvanced=(id,patch)=>{if(!advanced[id])advanced[id]={};Object.assign(advanced[id],patch);};

  setLesson('p34',{
    title:'コインの枚数',
    goals:['大きい額面から // で必要枚数を求められる','% で残額を更新し，次の額面へ渡す流れを追える'],
    lead:'教材は ATM で12,346円を引き出す場面を使い，紙幣・硬貨の枚数合計が最少になるよう，大きい額面から「商＝枚数」「余り＝残額」を順に求めます。',
    points:[
      {title:'額面は降順',body:'Okane=[10000,5000,1000,500,100,50,10,5,1] とし，大きい額面から順に処理します。'},
      {title:'// は枚数',body:'各額面 Okane[i] について hikidashi // Okane[i] がその額面で使える枚数です。教材例では12,346円から1万円札1枚，千円札2枚…と求めます。'},
      {title:'% は次へ渡す残額',body:'枚数を求めた直後に hikidashi = hikidashi % Okane[i] と更新し，残額だけを次の小さい額面へ渡します。'}
    ],
    code:"Okane = [10000, 5000, 1000, 500, 100, 50, 10, 5, 1]\nMaisuu = [0, 0, 0, 0, 0, 0, 0, 0, 0]\nhikidashi = int(input('引き出し金額を入力してください：'))\n\nfor i in range(len(Okane)):\n    okane_count = hikidashi // Okane[i]\n    Maisuu[i] = okane_count\n    hikidashi = hikidashi % Okane[i]\n\nfor i in range(len(Okane)):\n    print(Okane[i], '円 :', Maisuu[i], '枚')",
    quiz:{question:'教材確認問題では，Okashi=[350,170,90,55,30,20] を高い順に買います。Kosuu[i]=kingaku//Okashi[i] のあと，次の価格へ渡す残額を求める式はどれですか。',choices:['Kosuu[i] * kingaku','kingaku * Okashi[i]','Okashi[i] % kingaku','kingaku % Okashi[i]'],answer:3,explanation:'教材解答の正解は④。各価格で買える個数を // で求めたあと，% で残った予算を次の価格へ渡します。'},
    terms:['商','余り','//','%','残額','降順']
  });
  setSource('p34','例題はATMで12,346円を最少枚数の紙幣・硬貨へ分解する。Okaneは10000〜1円を降順に保持し，枚数はhikidashi//Okane[i]，残額はhikidashi%Okane[i]。確認問題は350,170,90,55,30,20円のお菓子を高い順に買い，残額更新は④ kingaku % Okashi[i]。','各反復を「現在の残額→//で個数→%で新しい残額」の3列で追う。','// と % の役割を逆にしない。額面・価格が降順であることが，教材の貪欲な処理を成立させる前提。','12,346円について10000円から1円まで，枚数と更新後残額を表にする。');
  setAdvanced('p34',{title:'ATMの金額を大きい額面から分解する',conditions:['Okaneは10000円から1円まで降順','//で現在の額面の枚数を求める','%で残額を更新して次の額面へ進む'],code:get('p34')?.code||'',focus:'hikidashi が各周回後にいくらへ変わるかを追う。',check:'12,346円が教材の実行例どおりの枚数へ分解される理由を説明できる。'});

  setLesson('p35',{
    title:'駐車料金の判定',
    goals:['基本時間までと超過時間の料金を分けて式にできる','境界条件 parked_jikan<=2 を正しく読める'],
    lead:'教材の駐車場は最初の2時間まで500円，それを超えた分は1時間400円です。5時間なら500+3×400=1,700円となります。',
    points:[
      {title:'基本料金の範囲',body:'parked_jikan<=kihon_jikan のときは，駐車時間にかかわらず基本料金500円です。'},
      {title:'超過時間だけを課金',body:'2時間を超えたときは parked_jikan-kihon_jikan が超過時間です。ここだけに400円/時を掛けます。'},
      {title:'基本料金を最後に足す',body:'教材例の式は kihon_ryoukin + (parked_jikan-kihon_jikan)*jikan_ryoukin。5時間なら1,700円です。'}
    ],
    code:"kihon_ryoukin = 500\njikan_ryoukin = 400\nkihon_jikan = 2\nshiharai_ryoukin = 0\nparked_jikan = int(input('駐車した時間を整数値で入力してください：'))\n\nif parked_jikan <= kihon_jikan:\n    shiharai_ryoukin = kihon_ryoukin\nelse:\n    shiharai_ryoukin = kihon_ryoukin + (parked_jikan - kihon_jikan) * jikan_ryoukin\n\nprint('駐車料金', shiharai_ryoukin, '円')",
    quiz:{question:'教材確認問題のタクシーは2kmまで500円，それ以降1kmごと300円です。2kmを超えたときの乗車料金の式はどれですか。',choices:['jousya_kyori - hatsunori_kyori * kiro_ryoukin + hatsunori_ryoukin','(jousya_kyori + hatsunori_kyori) * kiro_ryoukin + hatsunori_ryoukin','(jousya_kyori - hatsunori_kyori) * kiro_ryoukin + hatsunori_ryoukin','(jousya_kyori + hatsunori_kyori) / kiro_ryoukin * hatsunori_ryoukin'],answer:2,explanation:'教材解答の正解は③。初乗り距離を超えた分だけ300円/kmを掛け，初乗り料金500円を加えます。5kmなら1,400円です。'},
    terms:['基本料金','超過時間','境界条件','if-else']
  });
  setSource('p35','例題は駐車場：最初の2時間まで500円，以後1時間400円。5時間なら1,700円。確認問題はタクシー：2kmまで500円，以後1km300円。正解③ (jousya_kyori-hatsunori_kyori)*kiro_ryoukin+hatsunori_ryoukin。','「全時間」と「基本分を除いた超過分」を区別し，境界2で場合分けする。','超過料金だけを計算して基本料金を落とさない。また (a-b)*rate の括弧を外さない。','1時間・2時間・3時間・5時間で駐車料金を手計算し，ifの枝と一致させる。');
  setAdvanced('p35',{title:'2時間まで500円，超過1時間400円を式にする',conditions:['2時間以下は500円','2時間超は超過時間×400円を加算','5時間なら1,700円'],code:get('p35')?.code||'',focus:'parked_jikan-kihon_jikan が「超過時間」になることを確認する。',check:'境界2時間の前後で使う式を説明できる。'});

  setLesson('p36',{
    title:'割引のある料金',
    goals:['購入個数から割引率を決定できる','合計金額×(1-割引率) を正しく組み立てられる'],
    lead:'教材は駄菓子屋の購入個数に応じて，3〜4個なら5%，5個以上なら10%を合計金額から割り引く例を扱います。',
    points:[
      {title:'sum と len',body:'goukei_kakaku=sum(Okashi) で購入額の合計，okashi_kosuu=len(Okashi) で購入個数を求めます。'},
      {title:'割引率を分岐で決める',body:'3個または4個は0.05，5個以上は0.10，それ以外は0.00です。教材は or を使って3個・4個を一つの枝にまとめます。'},
      {title:'支払額は残る割合を掛ける',body:'割引後金額は goukei_kakaku*(1-waribiki_ritsu)。割引率そのものを掛けると「値引き額」になってしまいます。'}
    ],
    code:"Okashi = [140, 160, 170, 140]\ngoukei_kakaku = sum(Okashi)\nokashi_kosuu = len(Okashi)\nwaribiki_ritsu = 0.00\n\nif okashi_kosuu == 3 or okashi_kosuu == 4:\n    waribiki_ritsu = 0.05\nelif okashi_kosuu >= 5:\n    waribiki_ritsu = 0.10\nelse:\n    waribiki_ritsu = 0.00\n\nwaribiki_kakaku = goukei_kakaku * (1 - waribiki_ritsu)\nprint('合計金額 :', int(waribiki_kakaku), '円')",
    quiz:{question:'教材確認問題では，基本料金500円＋100円/kWhの電気料金全体から，使用量に応じたdiscount_rateを割り引きます。denki_ryoukin の式はどれですか。',choices:['(kihon_ryoukin + ryoukin_kwh * denryoku) * (1 - discount_rate)','(kihon_ryoukin + ryoukin_kwh * denryoku) * discount_rate','kihon_ryoukin + ryoukin_kwh * denryoku * (1 - discount_rate)','(kihon_ryoukin + ryoukin_kwh * denryoku) * (discount_rate - 1)'],answer:0,explanation:'教材解答の正解は①。基本料金と従量料金を先に合計し，その全体へ (1-discount_rate) を掛けます。200kWhなら20,500円×0.85=17,425円です。'},
    terms:['sum関数','len関数','割引率','or','elif']
  });
  setSource('p36','例題はOkashi=[140,160,170,140]，3〜4個は5%，5個以上は10%割引。割引後は goukei_kakaku*(1-waribiki_ritsu)。確認問題は基本500円＋100円/kWh，100〜199kWhは10%，200kWh以上15%割引。正解①。','「通常合計→割引率の決定→残る割合を掛ける」の順に追う。','goukei_kakaku*waribiki_ritsu は値引き額であり支払額ではない。確認問題では基本料金にも割引がかかるため括弧が必要。','購入個数2,3,4,5でwaribiki_ritsuの枝を確認する。');
  setAdvanced('p36',{title:'購入個数で割引率を決め，合計金額へ適用する',conditions:['sumで合計，lenで個数','3〜4個5%，5個以上10%','支払額は合計×(1-割引率)'],code:get('p36')?.code||'',focus:'割引率が決まる枝と，割引を適用する式を分けて追う。',check:'割引額と割引後金額を混同せず説明できる。'});

  setLesson('p37',{
    title:'テストの集計',
    goals:['配列の得点をfor文で合計できる','round(平均,1) の意味を教材の表記どおり読める'],
    lead:'教材は9回分のテスト得点を配列 Tensuu に入れ，合計点を反復で求めた後，平均点を round 関数で小数第1位まで表示します。',
    points:[
      {title:'合計を累積',body:'goukei=0 から始め，for i in range(num) で goukei=goukei+Tensuu[i] と更新します。教材の9得点の合計は758点です。'},
      {title:'平均は合計÷個数',body:'num=len(Tensuu) なので，平均は goukei/num。教材例では758÷9=84.222…です。'},
      {title:'round(...,1)',body:'教材は「小数点以下第2位を四捨五入」とし，round(goukei/num,1) で84.2点とします。'}
    ],
    code:"Tensuu = [85, 90, 78, 88, 76, 94, 89, 75, 83]\nnum = len(Tensuu)\ngoukei = 0\nheikin = 0\n\nfor i in range(num):\n    goukei = goukei + Tensuu[i]\n\nheikin = round(goukei / num, 1)\nprint('合計点 :', goukei, '点')\nprint('平均点 :', heikin, '点')",
    quiz:{question:'同じ Tensuu から最高点を求める教材確認問題で，saikou を更新する条件はどれですか。',choices:['Tensuu[i] < saikou','Tensuu[i] > saikou','Tensuu[i] > goukei','Tensuu[i] == saikou'],answer:1,explanation:'教材解答の正解は②。現在の得点 Tensuu[i] がこれまでの最高点 saikou より大きいときだけ更新します。'},
    terms:['累積','平均','round関数','最高値']
  });
  setSource('p37','例題Tensuu=[85,90,78,88,76,94,89,75,83]。forで合計758，round(goukei/num,1)で平均84.2。確認問題は最高点更新条件② Tensuu[i] > saikou。','goukei と saikou はどちらも反復で更新するが，前者は毎回加算，後者は条件成立時だけ置換する。','round(x,1) は小数第1位まで残す指定。最高点を goukei と比較しない。','各得点についてgoukeiとsaikouの2列を作り，最終値を求める。');
  setAdvanced('p37',{title:'9回のテストを合計・平均へ集計する',conditions:['Tensuuを順に加算','要素数はlen','平均はround(...,1)'],code:get('p37')?.code||'',focus:'goukeiが9回の反復でどう増えるかを追う。',check:'合計758点，平均84.2点になる過程を説明できる。'});

  setLesson('p38',{
    title:'じゃんけん',
    goals:['グー0・チョキ1・パー2の対応から勝敗を数値で判定できる','差を3で循環させる確認問題の式を追える'],
    lead:'教材は自分の手を入力，相手の手を0〜2の乱数とし，グー=0・チョキ=1・パー=2へ置き換えて勝敗条件を数値で整理します。',
    points:[
      {title:'例題は差 jibun-aite',body:'差が -1 または 2 なら「勝ち」，1または-2なら「負け」，0なら「あいこ」とする表を作って判定します。'},
      {title:'乱数の相手',body:'aite=random.randint(0,2) なので，相手の手はJanken[0]〜Janken[2]のいずれかです。'},
      {title:'確認問題は剰余で0〜2へ',body:'(jibun-aite+3)%3 とすると結果を0,1,2へそろえられ，2=勝ち，1=負け，0=引き分けとして判定できます。'}
    ],
    code:"import random\nJanken = ['グー', 'チョキ', 'パー']\nprint('ジャンケンの手の数字を入力してください。グー：0，チョキ：1，パー：2')\njibun = int(input())\naite = random.randint(0, 2)\nkeisan = jibun - aite\n\nif keisan == -1 or keisan == 2:\n    print('勝ち')\nelif keisan == 1 or keisan == -2:\n    print('負け')\nelse:\n    print('あいこ')\nprint('自分の手：', Janken[jibun], '相手の手：', Janken[aite])",
    quiz:{question:'教材確認問題では keisan が2なら勝ち，1なら負け，0なら引き分けとなるようにします。keisan の式はどれですか。',choices:['jibun - aite','jibun - aite + 3','(jibun - aite + 3) % 3','(jibun - aite + 2) % 3'],answer:2,explanation:'教材解答の正解は③。(jibun-aite+3)%3 により差を0〜2の3値へ循環させます。'},
    terms:['random.randint','剰余','じゃんけん','勝敗判定']
  });
  setSource('p38','例題はJanken=[グー,チョキ,パー]を0,1,2へ対応し，keisan=jibun-aite。勝ち=-1または2，負け=1または-2，あいこ=0。確認問題は keisan=(jibun-aite+3)%3，正解③。','3×3の勝敗表と数値表を対応させ，9組を同じ規則へ圧縮する。','例題と確認問題ではkeisanの定義が違う。確認問題の0/1/2判定を例題の単純差へそのまま当てはめない。','全9組について(jibun-aite+3)%3を計算し，0/1/2と勝敗を対応させる。');
  setAdvanced('p38',{title:'じゃんけんの9通りを数値規則へまとめる',conditions:['グー0・チョキ1・パー2','相手は0〜2の乱数','差から勝ち・負け・あいこを判定'],code:get('p38')?.code||'',focus:'jibun-aite の値が -2〜2 のどれになり，どの勝敗へ入るかを表で追う。',check:'確認問題の (差+3)%3 が0〜2にそろえる理由を説明できる。'});

  setLesson('p39',{
    title:'サイコロの出目',
    goals:['出目1〜6を配列添字0〜5へ対応させられる','試行回数に対する出現回数から百分率を求められる'],
    lead:'教材は六面サイコロを100,000回振るシミュレーションで，各出目の回数と確率を集計します。表示値は乱数なので実行ごとに変化します。',
    points:[
      {title:'出目と添字の1ずれ',body:'deme は1〜6ですが Deme_kaisuu の添字は0〜5なので，出目demeは Deme_kaisuu[deme-1] に対応します。'},
      {title:'出た回数を1増やす',body:'各試行で Deme_kaisuu[deme-1]=Deme_kaisuu[deme-1]+1 と更新します。6要素の合計は100,000回になります。'},
      {title:'確率を百分率へ',body:'各出目の確率は Deme_kaisuu[i]/kaisuu*100。教材の表示例では各出目がおよそ16〜17%になっています。'}
    ],
    code:"import random\nkaisuu = 100000\nDeme_kaisuu = [0, 0, 0, 0, 0, 0]\n\nfor i in range(kaisuu):\n    deme = random.randint(1, 6)\n    Deme_kaisuu[deme - 1] = Deme_kaisuu[deme - 1] + 1\n\nfor i in range(6):\n    kakuritsu = Deme_kaisuu[i] / kaisuu * 100\n    print('出目', i + 1, ':', Deme_kaisuu[i], '回', '確率 :', kakuritsu, '％')",
    quiz:{question:'教材確認問題ではサイコロ2個を100,000回振り，合計8になった回数を deme_kaisuu とします。確率(%)を求める式はどれですか。',choices:['kakuritsu = deme_kaisuu / kaisuu','kakuritsu = kaisuu / deme_kaisuu * 100','deme_kaisuu = kakuritsu / kaisuu * 100','kakuritsu = deme_kaisuu / kaisuu * 100'],answer:3,explanation:'教材解答の正解は④。該当回数÷総試行回数で割合を求め，100を掛けて百分率にします。'},
    terms:['シミュレーション','乱数','出現回数','確率','百分率']
  });
  setSource('p39','例題は六面サイコロ100,000回。Deme_kaisuu[deme-1]を1増やし，確率は回数/100000*100。教材の表示例は乱数による一例。確認問題は2個の合計8の確率で，正解④ deme_kaisuu/kaisuu*100。','乱数生成→該当カウンタ更新→最後に割合計算の3段階で読む。','demeをそのまま添字にすると出目6でindex 6となるため不正。1〜6を0〜5へずらす。表示例の具体的回数を固定値と考えない。','少ない試行回数10回で出目列を仮定し，Deme_kaisuuを手で更新する。');
  setAdvanced('p39',{title:'10万回のサイコロを6個のカウンタへ集計する',conditions:['randint(1,6)で出目','添字はdeme-1','回数/総試行×100で確率'],code:get('p39')?.code||'',focus:'出目と配列添字の1ずれを固定して追う。',check:'6カウンタの合計が常にkaisuuになることを説明できる。'});

  setLesson('p40',{
    title:'中央値の判定',
    goals:['データ数の偶奇で中央値の求め方を分けられる','第1四分位数を下位半分の中央値としてコードで求められる'],
    lead:'教材は昇順データの中央値を，個数が奇数なら中央1要素，偶数なら中央2要素の平均として場合分けします。確認問題では同じ考え方を第1四分位数へ広げます。',
    points:[
      {title:'偶数個の中央値',body:'n%2==0 のとき中央は Data[n//2-1] と Data[n//2]。教材例 [1,3,7,9] では (3+7)/2=5です。'},
      {title:'奇数個の中央値',body:'奇数個なら Data[n//2] が中央です。教材の説明例 [1,3,6,7,9] では6です。'},
      {title:'第1四分位数',body:'確認問題では左半分 Left_data を作り，その要素数が偶数なら中央2要素の平均をとります。'}
    ],
    code:"Data = [1, 3, 7, 9]\ncenter = 0\nn = len(Data)\n\nif n % 2 == 0:\n    center = (Data[n // 2 - 1] + Data[n // 2]) / 2\nelse:\n    center = Data[n // 2]\n\nprint('中央値：', int(center))",
    quiz:{question:'教材確認問題の Left_data の要素数 left_n が偶数のとき，第1四分位数を求める式はどれですか。',choices:['Left_data[left_n // 2 + 1] + Left_data[left_n // 2]','Left_data[left_n // 2] / 2','(Left_data[left_n // 2 - 1] + Left_data[left_n // 2]) / 2','Left_data[left_n - 1] + Left_data[left_n]'],answer:2,explanation:'教材解答の正解は③。偶数個の中央値と同じく，中央の2要素を足して2で割ります。'},
    terms:['中央値','第1四分位数','偶数','奇数','//','%']
  });
  setSource('p40','例題は昇順Data=[1,3,7,9]，偶数個なら(Data[n//2-1]+Data[n//2])/2，奇数個ならData[n//2]。確認問題は第1四分位数で左半分の中央値を求め，正解③。','n%2で偶奇を判定し，添字n//2を基準に中央位置を決める。','教材は入力データを「昇順」として与えている。未整列データをこの式へ直接入れない。偶数個で中央1要素だけを取らない。','奇数5個・偶数4個・下位半分4個の3ケースで中央添字を図示する。');
  setAdvanced('p40',{title:'データ数の偶奇から中央値の添字を決める',conditions:['データは昇順','偶数個は中央2要素の平均','奇数個はData[n//2]'],code:get('p40')?.code||'',focus:'n//2 を基準に偶数個だけ左隣 n//2-1 も使う。',check:'[1,3,7,9]の中央値5を添字から説明できる。'});

  setLesson('p41',{
    title:'素数判定',
    goals:['2以上number-1以下で割り切れる数を調べて素数判定できる','2数が互いに素かを共通の約数から判定できる'],
    lead:'教材は「1より大きく，1とその数でしか割り切れない」を素数の定義として，2からnumber-1まで順に割り切れるか調べるプログラムを扱います。',
    points:[
      {title:'余り0なら約数',body:'number%i==0 が見つかれば，1とnumber以外の約数が存在するので sosuu_flag=1 とします。'},
      {title:'最後のflagで判定',body:'反復後も sosuu_flag==0 なら素数，1なら素数ではないと表示します。'},
      {title:'互いに素',body:'確認問題は2つの数が同じiで両方割り切れるかを and で調べ，1以外の共通約数がなければ互いに素とします。'}
    ],
    code:"number = int(input('2以上の自然数（正の整数）を入力してください。'))\nsosuu_flag = 0\n\nfor i in range(2, number):\n    if number % i == 0:\n        sosuu_flag = 1\n\nif sosuu_flag == 0:\n    print(number, 'は素数です。')\nelse:\n    print(number, 'は素数ではありません。')",
    quiz:{question:'教材確認問題で number1 と number2 に1以外の共通約数 i がある条件はどれですか。',choices:['number1 % i == 0 and number2 % i == 0','number1 % i == 0 or number2 % i == 0','number1 % i == 0 not number2 % i == 0','number1 % i != 0 and number2 % i != 0'],answer:0,explanation:'教材解答の正解は①。共通約数なので，i が両方の整数を割り切る必要があり and を使います。'},
    terms:['素数','約数','互いに素','最大公約数','and']
  });
  setSource('p41','例題は入力numberを2〜number-1で割り，number%i==0ならsosuu_flag=1。反復後flag=0なら素数。確認問題は2数が互いに素かを調べ，共通約数条件は① number1%i==0 and number2%i==0。','候補iごとに余りを見て「割り切れるか」だけを判定し，flagの最終値を読む。','orでは片方だけ割り切れても成立してしまい，共通約数にならない。教材例は途中でbreakせず最後まで調べる。','12と25，12と18の2組で共通約数の有無を手で追う。');
  setAdvanced('p41',{title:'2からnumber-1まで割って素数を判定する',conditions:['余り0なら約数あり','flagを1へ更新','最後まで0なら素数'],code:get('p41')?.code||'',focus:'各iで number%i が0になるかを追う。',check:'素数と合成数でflagの最終値が異なる理由を説明できる。'});
})();