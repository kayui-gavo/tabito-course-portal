/* 情報Ⅰ＜プログラミング編＞ v14a — 中級第15〜24講をKZC72000本文・確認問題・解答へ逐講再整合 */
(() => {
  const lessons=window.STUDY_PROGRAMMING||[];
  const source=window.PROGRAM_SOURCE_V9||{};
  const get=id=>lessons.find(x=>x.id===id);
  const setLesson=(id,patch)=>{const x=get(id);if(x)Object.assign(x,patch);};
  const setSource=(id,core,read,pitfall,drill)=>{if(!source[id])source[id]={};Object.assign(source[id],{core,read,pitfall,drill});};

  setLesson('p15',{
    title:'関数',
    goals:['def・引数・returnの役割をコード上で区別できる','関数呼び出しに与えた値から戻り値を追える'],
    lead:'教材は double(x) と add(a,b) の2例で，関数に値を渡し，関数内部で計算し，return で結果を返す流れを確認します。',
    points:[
      {title:'def で関数を定義',body:'教材例1は def double(x): と定義し，y=2*x を計算して return y とします。double(10) の結果は20です。'},
      {title:'複数の引数',body:'教材例2は def add(a,b): とし，x=a+b を return します。add(1,2) の結果は3です。'},
      {title:'戻り値を追う',body:'関数名だけを見るのではなく，呼び出し時の値を引数へ入れ，return の式まで順に計算します。'}
    ],
    code:'def double(x):\n    y = 2 * x\n    return y\n\ndouble(10)',
    quiz:{question:'def multiply(a,b): return a*b と定義したとき，multiply(3,5) の実行結果として最も適切なものはどれですか。',choices:['8','15','-2','2'],answer:1,explanation:'教材確認問題の正解は②。multiply 関数は2つの引数の積を戻すため，3×5=15です。'},
    terms:['関数','def','引数','戻り値','return']
  });
  setSource('p15','教材例1は double(10)→20，例2は add(1,2)→3。確認問題は multiply(3,5)→15。','呼び出し時の実引数を仮引数へ対応させ，関数内部の代入を追って return の値まで進む。','関数定義と関数呼び出しを混同しない。return が返す値と print による標準出力は役割が異なる。','double(10)，add(1,2)，multiply(3,5) を「引数→関数内計算→戻り値」の3列で追う。');

  setLesson('p16',{
    title:'配列と乱数',
    goals:['randintで生成した整数を配列の添字として使える','配列の要素数と乱数の範囲を対応させられる'],
    lead:'教材はじゃんけんの3要素配列と random.randint(0,2) を組み合わせ，乱数をそのまま添字として使って1要素を選びます。',
    points:[
      {title:'候補を配列に入れる',body:"Janken=['グー','チョキ','パー'] の3要素を index 0,1,2 で扱います。"},
      {title:'乱数を添字へ',body:'number=random.randint(0,2) で0〜2の整数を1つ得て，Janken[number] を参照します。'},
      {title:'要素数に合わせる',body:'確認問題のおみくじは4要素なので randint(0,3) とし，Omikuji[number] を出力します。'}
    ],
    code:"import random\n\nJanken = ['グー', 'チョキ', 'パー']\nnumber = random.randint(0, 2)\nprint(Janken[number])",
    quiz:{question:"Omikuji=['大吉','中吉','小吉','凶']，number=random.randint(0,3) のとき，4種類からランダムに1つ表示する print の中身はどれですか。",choices:['Omikuji','number','random','Omikuji[number]'],answer:3,explanation:'教材確認問題の正解は④。0〜3の乱数を配列 Omikuji の添字に指定します。'},
    terms:['配列','random.randint','乱数','添字']
  });
  setSource('p16','教材例は Janken=[グー,チョキ,パー] と random.randint(0,2)。確認問題は4要素の Omikuji と randint(0,3)，print(Omikuji[number])。','乱数の値域を配列の有効な添字0〜n-1へ対応させ，乱数値ではなく配列の要素が出力されることを追う。','4要素なら添字は0〜3。randint の上端も含まれるため，0〜4にしない。','Janken と Omikuji について index と要素の対応表を作る。');

  setLesson('p17',{
    title:'2次元配列',
    goals:['2次元配列の第1添字と第2添字の役割を区別できる','表と [行][列] の指定を対応させられる'],
    lead:'教材の Students_and_scores は0行目に氏名，1〜3行目に3科目の得点を置き，2つの添字でセルを指定します。',
    points:[
      {title:'第1添字は行',body:'Students_and_scores[2] は2つめの科目の得点行 [90,88,95] を指します。'},
      {title:'第2添字は列',body:'その行の [1] は Bob の列なので Students_and_scores[2][1]=88 です。'},
      {title:'氏名行がある',body:'確認問題の Alice の3つめの科目78は，科目行が index 3，Alice列が index 0 なので [3][0] です。'}
    ],
    code:"Students_and_scores = [\n    ['Alice', 'Bob', 'Charlie'],\n    [85, 92, 100],\n    [90, 88, 95],\n    [78, 81, 76]\n]\nvalue = Students_and_scores[2][1]\nprint(value)",
    quiz:{question:'Alice の3つめの科目の得点78を取り出す指定はどれですか。',choices:['Students_and_scores[3][1]','Students_and_scores[2][1]','Students_and_scores[3][0]','Students_and_scores[2][0]'],answer:2,explanation:'教材確認問題の正解は③。3つめの科目は行index 3，Aliceは列index 0です。'},
    terms:['2次元配列','行','列','添字','インデックス']
  });
  setSource('p17','教材例は Students_and_scores[2][1]→Bobの2科目目88。確認問題は [3][0]→Aliceの3科目目78。','配列全体を表に書き換え，第1添字で行，第2添字で列を選ぶ。氏名行を含む実際の配列構造を先に確認する。','「人間の3番目だから index2」と機械的に決めない。氏名行がindex0にあるため3科目目は行index3。','4行×3列の表へ行・列indexを書き，教材の2セルを交点で確認する。');

  setLesson('p18',{
    title:'input と random.choice',
    goals:['inputで利用者の入力を受け取れる','random.choiceへ候補配列を渡して1要素を選べる'],
    lead:'教材は利用者の手を input で受け取り，コンピュータ側は候補配列から random.choice で1要素を選ぶ構成を扱います。',
    points:[
      {title:'利用者側',body:"user_choice=input('グー,チョキ,パーのどれかを入力：') として入力値を受け取ります。"},
      {title:'コンピュータ側',body:'Computer_choices の3要素から random.choice(Computer_choices) で1要素を選びます。'},
      {title:'候補配列を渡す',body:'確認問題でも random.choice(Obj) とし，〇・△・×が入った配列 Obj を引数にします。'}
    ],
    code:"import random\n\nuser_choice = input('グー,チョキ,パーのどれかを入力：')\nComputer_choices = ['グー', 'チョキ', 'パー']\ncomputer_choice = random.choice(Computer_choices)\nprint('あなたの手：', user_choice)\nprint('コンピュータの手：', computer_choice)",
    quiz:{question:"Obj=['〇','△','×'] からコンピュータがランダムに1つ選ぶ random.choice( ___ ) の空欄はどれですか。",choices:['user_obj','Obj','computer_obj','random'],answer:1,explanation:'教材確認問題の正解は②。random.choice の引数には候補を持つ配列 Obj を指定します。'},
    terms:['input','random.choice','配列','入力']
  });
  setSource('p18','教材例は input で利用者のじゃんけんの手を受け取り，Computer_choices を random.choice へ渡す。確認問題は同型を〇・△・×の Obj へ置き換える。','利用者が決める値とコンピュータが候補配列から選ぶ値を別変数として追う。','random.choice(user_choice) ではない。choice の引数は候補が並んだ配列。','inputで決まる変数・choiceへ渡す配列・choiceの結果変数の3つを対応させる。');

  setLesson('p19',{
    title:'引数が配列の関数',
    goals:['配列を関数の引数として渡せる','forで配列の全要素を処理して戻り値を求められる'],
    lead:'教材は Numbers を calculate_sum(Numbers) で関数へ渡し，仮引数 Arr を for で走査して合計を返します。',
    points:[
      {title:'配列を渡す',body:'呼び出し側の Numbers が関数内の仮引数 Arr に渡されます。変数名が違っても同じ配列データを処理できます。'},
      {title:'全要素を累積',body:'for num in Arr で要素を1つずつ取り出し，total=total+num として合計します。'},
      {title:'return で合計を返す',body:'例題 [85,92,100] の合計は277。確認問題 [12,14,15,21,25] の合計は87です。'}
    ],
    code:'def calculate_sum(Arr):\n    total = 0\n    for num in Arr:\n        total = total + num\n    return total\n\nNumbers = [85, 92, 100]\ncalculate_sum(Numbers)',
    quiz:{question:'Numbers=[12,14,15,21,25] の合計を result に入れる式はどれですか。',choices:['calculate_sum(Numbers)','total','calculate_sum(total)','Numbers'],answer:0,explanation:'教材確認問題の正解は①。calculate_sum に配列 Numbers を渡すと戻り値87が result に入ります。'},
    terms:['配列','引数','仮引数','for','return','累積']
  });
  setSource('p19','教材例は Numbers=[85,92,100] を calculate_sum(Numbers) で渡して合計277。確認問題は [12,14,15,21,25] を同じ関数へ渡して87。','Numbers と関数内 Arr の対応，for num in Arr，total の累積，return の順に追う。','関数内で外側の変数名 Numbers を使う必要はない。教材解答本文には選択肢番号の誤記があるが，問題欄と正解欄では calculate_sum(Numbers) が①。','85→92→100 と 12→14→15→21→25 の2つの累積表を作る。');

  setLesson('p20',{
    title:'1からnまでの和',
    goals:['range(1,n+1) で1からnまでを生成できる','累積変数 total へ各 i を加える処理を追える'],
    lead:'教材は1からnまでの整数を range で生成し，forで total に順に加える関数を作ります。n=5なら15です。',
    points:[
      {title:'n を含める',body:'range の終了値は含まれないため，1からnまでなら range(1,n+1) とします。'},
      {title:'累積する',body:'total は0から始め，各反復で total=total+i と更新します。'},
      {title:'n=5 の変化',body:'i=1,2,3,4,5 に対して total は1,3,6,10,15と変化します。'}
    ],
    code:'def calculate_sum(n):\n    total = 0\n    for i in range(1, n + 1):\n        total = total + i\n    return total\n\nn = 5\ncalculate_sum(n)',
    quiz:{question:'for i in range(1,n+1) の中で1からnまでの合計を作る代入式はどれですか。',choices:['total = i','total = total','total = total - i','total = total + i'],answer:3,explanation:'教材確認問題の正解は④。各 i をそれまでの合計 total に加えます。'},
    terms:['range','for','累積','total','return']
  });
  setSource('p20','教材例と確認問題はともに1からnまでの和。例題は range(1,n+1)，確認問題は total=total+i を問う。n=5なら15。','range の終了値を含まない性質と，total の累積更新を分けて確認する。','range(1,n) ではnを落とす。total=i と毎回上書きするのでもない。','n=5について i と total の変化を 1→1, 2→3, 3→6, 4→10, 5→15 と追う。');

  setLesson('p21',{
    title:'○以上○以下の判定',
    goals:['if-elif-else を上から評価して範囲を分類できる','前の条件がFalseだった事実を次の条件に利用できる'],
    lead:'教材は身長をS/M/L，確認問題では得点をA/B/Cへ分類し，境界を上から順に判定する書き方を扱います。',
    points:[
      {title:'身長の例',body:'h<150 ならS，それがFalseで h<160 ならM，それ以外はLです。'},
      {title:'得点の確認問題',body:'score>=60 ならA，それがFalseで score>=50 ならB，それ以外はCです。'},
      {title:'条件の順序',body:'elif に「50以上60未満」を全部書かなくても，先の score>=60 がFalseだったことから60未満が確定しています。'}
    ],
    code:"def check_size(h):\n    if h < 150:\n        return 'S'\n    elif h < 160:\n        return 'M'\n    else:\n        return 'L'\n\nh = 145\ncheck_size(h)",
    quiz:{question:'score が60以上ならA，50以上60未満ならB，それ以外Cとする組合せはどれですか。',choices:['if score>=60 / elif score>=50','if score>=50 / elif score>=60','if score>=50 / elif score<60','if score>60 / elif score>=50 and score<=60'],answer:0,explanation:'教材確認問題の正解は①。上から評価するため，2つめの score>=50 はすでに60未満の場合だけ判定されます。'},
    terms:['範囲判定','if','elif','else','以上','未満','境界値']
  });
  setSource('p21','教材例は身長 h を150未満S，150以上160未満M，160以上L。確認問題は score を60以上A，50以上60未満B，それ以外C。','if/elif は上から順に評価し，先の条件がFalseだった事実を使って次の範囲を読む。','境界150/160，50/60を確認する。毎回 and で範囲を完全記述しなくてもよい。','h=149,150,159,160 と score=49,50,59,60 を入れて止まる枝を表にする。');

  setLesson('p22',{
    title:'2つの数字の並べ替え',
    goals:['2値の並びが目標順と逆かを条件式で判定できる','temp を使う交換処理を順に追える'],
    lead:'教材は2つの値だけを並べ替える基本処理を使い，昇順と降順で比較条件の向きが変わることを確認します。',
    points:[
      {title:'昇順',body:'例題 Arr=[5,2] では Arr[0]>Arr[1] のとき交換して [2,5] にします。'},
      {title:'temp で交換',body:'temp=Arr[0] → Arr[0]=Arr[1] → Arr[1]=temp の順で，一方の値を失わず入れ替えます。'},
      {title:'降順',body:'確認問題 a=2,b=5 では a<b のとき交換し，結果 (5,2) にします。'}
    ],
    code:'def sort_Arr(Arr):\n    if Arr[0] > Arr[1]:\n        temp = Arr[0]\n        Arr[0] = Arr[1]\n        Arr[1] = temp\n    return Arr\n\nArr1 = [5, 2]\nsort_Arr(Arr1)',
    quiz:{question:'a=2,b=5 を大きい順に並べる関数で，交換を行う if 条件はどれですか。',choices:['a < b','a > b','2 < 5','2 > 5'],answer:0,explanation:'教材確認問題の正解は①。現在 a<b なら大きい値bが右側にあり，降順にするため交換が必要です。'},
    terms:['並べ替え','昇順','降順','temp','交換']
  });
  setSource('p22','教材例は Arr=[5,2] を昇順へ並べるため Arr[0]>Arr[1] のとき交換。確認問題は a=2,b=5 を降順へ並べるため a<b のとき交換。','目標順と現在の2値を比べ，逆なら temp→代入→復元の3段階で入れ替える。','昇順・降順で交換処理そのものは同じ。違うのは交換が必要になる比較条件。','[5,2]→[2,5] と (2,5)→(5,2) の両方で交換前・temp・交換後を書く。');

  setLesson('p23',{
    title:'合計と平均',
    goals:['forで配列の合計を累積できる','平均を合計÷要素数で求められる'],
    lead:'教材は Data=[10,20,30,40,50] を1回走査して合計150を作り，len(Data)=5で割って平均30を求めます。',
    points:[
      {title:'合計',body:'total=0 から始め，for num in Data の各反復で total=total+num とします。'},
      {title:'要素数',body:'len(Data) はデータ個数5を返します。num は現在取り出している値なので役割が違います。'},
      {title:'平均',body:'data_average=total/len(Data) より150÷5=30です。確認問題は合計を作る式 total+num を問います。'}
    ],
    code:'Data = [10, 20, 30, 40, 50]\ntotal = 0\nfor num in Data:\n    total = total + num\ndata_average = total / len(Data)\nprint(data_average)',
    quiz:{question:'配列 Data の要素の合計を求める for 文の中で，total に代入する式はどれですか。',choices:['total + num','total * num','Data[num]','num'],answer:0,explanation:'教材確認問題の正解は①。各要素 num を現在の合計 total に加え，最終的に150になります。'},
    terms:['合計','平均','len','累積','要素数']
  });
  setSource('p23','教材例は Data=[10,20,30,40,50] の平均を total/len(Data) で求め30。確認問題は同じ走査で合計150を作る total=total+num。','合計の累積と要素数 len(Data) を別々に確認し，最後に割る。','total/num ではない。最後の num=50 は要素数ではない。','total を0→10→30→60→100→150と追い，最後に150/5を計算する。');

  setLesson('p24',{
    title:'for文の入れ子',
    goals:['外側forと内側forの反復順を説明できる','rangeの範囲から入れ子の実行回数を求められる'],
    lead:'教材は九九を使い，外側の i を1つ固定している間に内側の j が1〜9を一巡する入れ子構造を扱います。',
    points:[
      {title:'n段まで',body:'例題は外側 i を range(1,n+1)，内側 j を range(1,10) とします。n=3なら3段×9個=27回です。'},
      {title:'反復順',body:'i=1 のまま j=1〜9，次に i=2 で j=1〜9，という順に進みます。'},
      {title:'九九全体',body:'確認問題では i も j も range(1,10) とし，1×1から9×9まで81通りを表示します。'}
    ],
    code:"def kakezan(n):\n    for i in range(1, n + 1):\n        for j in range(1, 10):\n            value = i * j\n            print(i, '×', j, '＝', value)\n\nn = 3\nkakezan(n)",
    quiz:{question:'1×1から9×9まで全て表示するため，2つの for 文に共通して入れる range はどれですか。',choices:['range(0,9)','range(1,9)','range(1,10)','range(2,10)'],answer:2,explanation:'教材確認問題の正解は③。1から9までを含めるため range(1,10) とします。'},
    terms:['for文の入れ子','外側ループ','内側ループ','range','九九']
  });
  setSource('p24','教材例はn段までの九九。外側 i は range(1,n+1)，内側 j は range(1,10)。確認問題は両方 range(1,10) で九九全体。','外側 i を固定したまま内側 j が1〜9を一巡し，その後 i が次へ進む。','range(1,9) では9を含まない。実行回数は外側回数×内側回数。','n=3 の27組を i=1の9組→i=2の9組→i=3の9組の順に書く。');
})();
