/* 情報Ⅰ＜プログラミング編＞ v13 — 初級第1〜14講をKZC72000本文・確認問題・解答へ逐講再整合 */
(() => {
  const lessons=window.STUDY_PROGRAMMING||[];
  const source=window.PROGRAM_SOURCE_V9||{};
  const get=id=>lessons.find(x=>x.id===id);
  const setLesson=(id,patch)=>{const x=get(id);if(x)Object.assign(x,patch);};
  const setSource=(id,core,read,pitfall,drill)=>{
    if(!source[id])source[id]={};
    Object.assign(source[id],{core,read,pitfall,drill});
  };

  setLesson('p1',{
    title:'print関数',
    goals:['print関数で文字列・数値・変数の値を表示できる','引用符で囲んだ文字列と変数名を区別できる'],
    lead:'教材は print 関数を「( ) の中に指定した値を表示する」関数として導入し，文字列・整数・変数の値の3種類を並べて確認します。',
    points:[
      {title:'文字列を表示',body:"文字列は引用符で囲みます。教材例 print('shibuya') の実行結果は shibuya です。"},
      {title:'数値を表示',body:'数値は引用符なしで指定できます。教材例 print(109) の実行結果は 109 です。'},
      {title:'変数の値を表示',body:"chimei='shibuya' のあと print(chimei) と書くと，変数 chimei に代入された値 shibuya が表示されます。"}
    ],
    code:"# 文字列型\nprint('shibuya')\n\n# 整数型\nprint(109)\n\n# 変数に代入して出力\nchimei = 'shibuya'\nprint(chimei)",
    quiz:{question:"変数 name に 'Tokyo' が代入されています。この変数の値を print 関数で表示する書き方として最も適切なものはどれですか。",choices:['print(Tokyo)',"print('Tokyo')",'print(name)',"print('name')"],answer:2,explanation:'教材確認問題の正解は③。print(name) とすると，変数 name に代入された値 Tokyo が表示されます。'},
    terms:['print関数','文字列型','整数型','変数']
  });
  setSource('p1',
    "教材例は print('shibuya')，print(109)，chimei='shibuya'→print(chimei) の3種類。確認問題は name='Tokyo' の値を表示する print(name) を選ぶ。",
    'printの丸括弧内が「文字列そのもの」「数値」「変数名」のどれかを先に判定し，変数なら代入された値へ置き換えて出力を読む。',
    "print('name') は文字列 name を表示し，print(name) は変数 name の値を表示する。引用符の有無を見落とさない。",
    "教材例の4つの出力対象 shibuya / 109 / chimei / name について，引用符あり・なしで何が表示されるかを書き分ける。"
  );

  setLesson('p2',{
    title:'四則演算',
    goals:['Pythonの +・-・*・/ を四則演算へ対応できる','文章で与えられた代金を演算式へ直せる'],
    lead:'教材は a=5，b=3 を使い，足し算・引き算・掛け算・割り算の演算子，書き方，実行結果を対応させます。',
    points:[
      {title:'四つの演算子',body:'足し算は +，引き算は -，掛け算は *（アスタリスク），割り算は /（スラッシュ）です。'},
      {title:'教材例 a=5, b=3',body:'a+b=8，a-b=2，a*b=15，a/b=1.6666666666666667 と表示されます。'},
      {title:'文章を式へ',body:'確認問題では，りんご200円×3＋みかん100円×2から割引50円を引くので，200×3+100×2-50=750円です。'}
    ],
    code:'a = 5\nb = 3\n\n# 足し算\nprint(a + b)\n# 引き算\nprint(a - b)\n# 掛け算\nprint(a * b)\n# 割り算\nprint(a / b)',
    quiz:{question:'りんご200円を3個，みかん100円を2個買い，50円の割引クーポンを使います。print(ringo*3 + mikan*2 ___ waribiki) の空欄はどれですか。',choices:['+','-','*','/'],answer:1,explanation:'教材確認問題の正解は②。商品代の合計から割引額を引くため - を使い，支払額は750円です。'},
    terms:['足し算','引き算','掛け算','割り算','+','-','*','/']
  });
  setSource('p2',
    '教材例は a=5,b=3 で +,-,*,/ の4演算と実行結果を確認する。確認問題は200円のりんご3個＋100円のみかん2個−50円割引＝750円。',
    '文章中の「商品代」「個数」「割引」を式の各項へ対応させ，掛け算で各商品の小計を作ってから合計し，最後に割引を引く。',
    'Pythonの掛け算は × ではなく *，割り算は ÷ ではなく /。割引は商品代へ足すのではなく差し引く。',
    '200*3，100*2，-50 の3項を別々に計算してから，教材確認問題の750円へ合成する。'
  );

  setLesson('p3',{
    title:'累乗・商・余り',
    goals:['**・//・% の意味を区別できる','整数の割り算から商と余りを求められる'],
    lead:'教材は a=5，b=3 で累乗・商・余りを並べ，**・//・% の3演算子を区別します。',
    points:[
      {title:'累乗 **',body:'a ** b は a の b 乗。教材例では 5 ** 3 = 125 です。'},
      {title:'商 //',body:'a // b は割り算の商。教材例では 5 // 3 = 1 です。'},
      {title:'余り %',body:'a % b は割り算の余り。教材例では 5 % 3 = 2 です。確認問題の25÷7では商3，余り4です。'}
    ],
    code:'a = 5\nb = 3\n\n# 累乗\nprint(a ** b)\n# 商\nprint(a // b)\n# 余り\nprint(a % b)',
    quiz:{question:'25を7で割った商 q と余り r を正しく求める組合せはどれですか。',choices:['q=25//7, r=25/7','q=25/7, r=25%7','q=25/7, r=25//7','q=25//7, r=25%7'],answer:3,explanation:'教材確認問題の正解は④。// で商3，% で余り4を求めます。'},
    terms:['累乗','商','余り','**','//','%']
  });
  setSource('p3',
    '教材例は5**3=125，5//3=1，5%3=2。確認問題は25÷7について q=25//7，r=25%7 とし「商3 余り4」を表示する。',
    '整数 a を b で割った関係 a=b×商+余り と対応させ，// が商，% が余りを返すことを確認する。',
    '/ は通常の割り算であり商を整数として取り出す // とは異なる。教材解答では print の複数引数が空白で区切って表示される点も説明されている。',
    '25=7×3+4 と式にしてから，// と % がどちらの値を返すかを対応させる。'
  );

  setLesson('p4',{
    title:'比較演算子',
    goals:['>・<・==・!=・>=・<= を日本語の比較表現へ対応できる','比較式の結果を True / False で判断できる'],
    lead:'教材は a=5，b=3 を使って6種類の比較演算子を一度に比較し，結果が True または False になることを確認します。',
    points:[
      {title:'大小と等号',body:'> は「より大きい」，< は「より小さい」，>= は「以上」，<= は「以下」です。'},
      {title:'等しい・等しくない',body:'== は「等しい」，!= は「等しくない」を表します。'},
      {title:'結果は論理値',body:'教材例 a=5,b=3 では a>b，a!=b，a>=b が True，a<b，a==b，a<=b が False です。'}
    ],
    code:'a = 5\nb = 3\nprint(a > b)\nprint(a < b)\nprint(a == b)\nprint(a != b)\nprint(a >= b)\nprint(a <= b)',
    quiz:{question:'a=7，b=2 のとき a != b の結果として最も適切なものはどれですか。',choices:['True','False','5','3'],answer:0,explanation:'教材確認問題の正解は①。7と2は等しくないため a != b は True です。'},
    terms:['比較演算子','True','False','>','<','==','!=','>=','<=']
  });
  setSource('p4',
    '教材例は a=5,b=3 で >,<,==,!=,>=,<= の6比較を実行する。確認問題は a=7,b=2 の a!=b が True になることを問う。',
    '比較演算子の左右の値を先に確定し，日本語の「より大きい／より小さい／等しい／等しくない／以上／以下」へ置き換えて真偽を判断する。',
    '!= の ! を見落とさない。比較式は差の値などではなく True / False を返す。',
    'a=7,b=2 に対して教材の6演算子を全部当て，True/Falseの一覧を作る。'
  );

  setLesson('p5',{
    title:'配列',
    goals:['教材における配列の意味を説明できる','0から始まる添字で要素を取り出せる'],
    lead:'教材では配列を「並べた同一の型のデータを扱うための変数」と説明し，Pythonでは添字が0から始まることを重点として扱います。',
    points:[
      {title:'配列',body:'教材例 Num=[1,2,3,4,5] のように，複数のデータを並べて扱います。'},
      {title:'添字（インデックス）',body:'配列からデータを取り出す位置を添字（インデックス）で指定します。Pythonでは先頭が0です。'},
      {title:'先頭と末尾',body:'教材例では Num[0]=1，Num[4]=5。確認問題 Numbers[2] は左から3番目の値3を指します。'}
    ],
    code:'Num = [1, 2, 3, 4, 5]\nprint(Num)\nprint(Num[0])\nprint(Num[4])',
    quiz:{question:'Numbers=[1,2,3,4,5] のとき print(Numbers[2]) の実行結果はどれですか。',choices:['1','2','3','4'],answer:2,explanation:'教材確認問題の正解は③。添字は0から始まるため index 2 は左から3番目で，値は3です。'},
    terms:['配列','添字','インデックス']
  });
  setSource('p5',
    '教材は配列を「並べた同一の型のデータを扱うための変数」と説明し，Num=[1,2,3,4,5] を例示する。確認問題は Numbers[2]→3。',
    '配列の見た目の「1番目，2番目…」とPythonの添字「0,1…」を上下に並べ，1ずれを明示して読む。',
    'Pythonでは添字が1ではなく0から始まる。3番目の要素を取り出すとき [3] ではなく [2]。',
    'Numの5要素について「左から何番目／index／値」の3列を作り，Num[0], Numbers[2], Num[4] を指さして確認する。'
  );

  setLesson('p6',{
    title:'乱数',
    goals:['教材における乱数の意味を説明できる','random.randint(a,b) で整数乱数を生成できる'],
    lead:'教材は乱数を「一定の確率分布に従って生成される数値」とし，Pythonでは random モジュールを呼び出して利用すると説明します。',
    points:[
      {title:'randomモジュール',body:'最初に import random として乱数機能を利用できるようにします。'},
      {title:'randint',body:'教材例 random.randint(1,10) は1から10の間の整数をランダムに生成します。'},
      {title:'実行ごとに変わる',body:'教材は実行結果8を例示しつつ，「実行するたびに結果は異なる」と注記しています。確認問題ではサイコロを1〜6で表します。'}
    ],
    code:'import random\n\n# 1から10の間でランダムな整数を生成\nrandom_int = random.randint(1, 10)\nprint(random_int)',
    quiz:{question:'サイコロを模倣して random.____(1,6) と書くとき，空欄に入る関数名はどれですか。',choices:['randint','randrange','randomint','randomfloat'],answer:0,explanation:'教材確認問題の正解は① randint。1〜6の整数乱数を生成します。'},
    terms:['乱数','randomモジュール','randint']
  });
  setSource('p6',
    '教材は random モジュールを import し，random.randint(1,10) で整数乱数を生成する。確認問題はサイコロとして random.randint(1,6) を完成させる。',
    'まず乱数として必要な値の範囲を確定し，その範囲を randint の2引数へ対応させる。',
    '教材例の実行結果8や解答例の2は固定値ではない。乱数なので実行ごとに結果が異なり得る。',
    'サイコロなら1〜6，1〜10の整数なら1〜10というように，現実の候補範囲を randint の引数へ置き換える。'
  );

  setLesson('p7',{
    title:'len関数',
    goals:['len関数で文字列の長さを取得できる','len関数で配列の要素数を取得できる'],
    lead:'教材は len 関数を，指定した配列や文字列などの長さを取得する関数として導入し，文字列と配列の2例を扱います。',
    points:[
      {title:'文字列の長さ',body:"教材例 len('Hello, world!') の結果は13です。空白や記号も文字列の長さに含まれます。"},
      {title:'配列の要素数',body:'教材例 Numbers=[1,2,3,4,5] では len(Numbers)=5 です。'},
      {title:'確認問題',body:"Animals=['cat','dog','fish','bird'] は4要素なので len(Animals)=4 です。"}
    ],
    code:"print(len('Hello, world!'))\n\nNumbers = [1, 2, 3, 4, 5]\nprint(len(Numbers))",
    quiz:{question:"Animals=['cat','dog','fish','bird'] の要素数を求める書き方はどれですか。",choices:['Animals.length()','len(Animals)','length(Animals)','sizeof(Animals)'],answer:1,explanation:'教材確認問題の正解は② len(Animals)。配列の要素数4を取得します。'},
    terms:['len関数','文字列の長さ','配列の要素数']
  });
  setSource('p7',
    "教材例は len('Hello, world!')=13 と len([1,2,3,4,5])=5。確認問題は4要素のAnimalsに len(Animals) を使う。",
    'lenの引数が文字列なら文字数，配列なら要素数として読む。何を数えているかを引数の型から判断する。',
    'len(Animals) が返すのは要素数4であり，最後の添字3ではない。教材確認問題の他言語風の書き方を選ばない。',
    "'Hello, world!' を1文字ずつ数え，Animalsは4要素を書き出して，lenの結果を実データから確かめる。"
  );

  setLesson('p8',{
    title:'range関数',
    goals:['range関数の1・2・3引数の意味を説明できる','start・end・stepから生成される整数列を判断できる'],
    lead:'教材は range(end)，range(start,end)，range(start,end,step) を表で比較し，終了値 end を含まない整数列を作ることを学びます。',
    points:[
      {title:'引数1個',body:'range(5) は0から4まで。教材では list(range(5)) → [0,1,2,3,4] と確認します。'},
      {title:'引数2個',body:'range(3,8) は3から7までで，[3,4,5,6,7] です。'},
      {title:'引数3個',body:'range(2,10,2) は2から2ずつ増え，[2,4,6,8]。確認問題の [1,4,7,10,13,16,19] は range(1,20,3) です。'}
    ],
    code:'print(list(range(5)))\nprint(list(range(3, 8)))\nprint(list(range(2, 10, 2)))',
    quiz:{question:'[1,4,7,10,13,16,19] を生成する range として最も適切なものはどれですか。',choices:['range(1,19,2)','range(1,19,4)','range(1,20,2)','range(1,20,3)'],answer:3,explanation:'教材確認問題の正解は④。開始値1，20未満，間隔3なので range(1,20,3) です。'},
    terms:['range関数','start','end','step','list関数']
  });
  setSource('p8',
    '教材は range(5)→[0,1,2,3,4]，range(3,8)→[3,4,5,6,7]，range(2,10,2)→[2,4,6,8] の3形を比較する。確認問題は range(1,20,3)。',
    '引数を start / end / step に分け，startからstepずつ増やしてend未満の値だけを書き出す。',
    '終了値endは含まれない。確認問題で19を含めるにはendを20にする。',
    '[1,4,7,10,13,16,19] から「最初1」「差3」「最後19」を読み，endは19より大きい最初の境界20と決める。'
  );

  setLesson('p9',{
    title:'for文',
    goals:['for文が並びの各要素について処理を反復することを説明できる','range関数とfor文を組み合わせて出力を追える'],
    lead:'教材はまず配列 [0,1,2,3,4] を直接 for 文で回し，次に range(5) が同じ並びを作ることを対応させます。',
    points:[
      {title:'配列を順に取り出す',body:'for i in [0,1,2,3,4]: とすると，iへ0,1,2,3,4が順に入り，print(i) が5回実行されます。'},
      {title:'rangeと組み合わせる',body:'for i in range(5): も同じく0,1,2,3,4を順に出力します。'},
      {title:'確認問題',body:'[2,4,6,8] と同じ出力にするには for i in range(2,9,2): とします。'}
    ],
    code:'for i in range(5):\n    print(i)',
    quiz:{question:'for i in [2,4,6,8]: print(i) と同じ出力になる range はどれですか。',choices:['range(2,10,1)','range(2,9,2)','range(2,8,2)','range(1,9,2)'],answer:1,explanation:'教材確認問題の正解は②。range(2,9,2) は2,4,6,8を生成します。'},
    terms:['for文','反復','range関数','インデント']
  });
  setSource('p9',
    '教材は for i in [0,1,2,3,4] と for i in range(5) が同じ0〜4を出力することを示す。確認問題は [2,4,6,8] と同じ range(2,9,2) を選ぶ。',
    'in の右側で用意された値を1つずつ i へ入れ，そのたびにインデントされたprintを実行すると読む。',
    'rangeの終了値は含まれないため，8まで2刻みで出すとき end は9にできる。range(2,8,2) では8が落ちる。',
    'iの値を反復ごとに縦に並べ，2→4→6→8の4回だけprintが行われることを確認する。'
  );

  setLesson('p10',{
    title:'if文',
    goals:['if文の条件式と実行ブロックを区別できる','条件がFalseのとき何も実行されない場合を判断できる'],
    lead:'教材は if 文を「条件式が True であれば，インデントされたブロック内の処理を実行する制御構文」と定義します。',
    points:[
      {title:'Trueの場合',body:"教材例 x=11 では x>10 が True なので「11 は 10 より大きい」と表示します。"},
      {title:'Falseの場合',body:'if だけの構文では条件が False ならそのブロックを実行せず，後続処理へ進みます。'},
      {title:'確認問題',body:'x=3 では x>10 が False なので，ifブロックは実行されず何も表示されません。'}
    ],
    code:"x = 11\nif x > 10:\n    print(x, 'は10より大きい')",
    quiz:{question:'x=3 として if x>10: の中だけに print があるとき，実行結果はどれですか。',choices:['「3は10より大きい」と表示','「3は10より小さい」と表示','何も表示されない','エラーが発生する'],answer:2,explanation:'教材確認問題の正解は③。x>10 は False なので if ブロックは実行されません。'},
    terms:['if文','条件式','True','False','インデント']
  });
  setSource('p10',
    '教材例は x=11，if x>10 がTrueなので表示する。確認問題は x=3 で同じ条件がFalseとなり，ifブロックが実行されないため何も表示されない。',
    '条件式を先に True / False にし，Trueなら字下げ部分を実行，Falseなら字下げ部分を飛ばす。',
    'Falseのとき「反対の内容」が自動表示されるわけではない。elseがなければ，その分岐では何も実行されない。',
    'x=11とx=3を同じ if x>10 に入れ，条件判定と実行行を2列で比較する。'
  );

  setLesson('p11',{
    title:'if-else文',
    goals:['if-else文でTrue側とFalse側を追える','境界値がどちらの分岐へ入るか判断できる'],
    lead:'教材は if-else 文を，条件式が True なら if ブロック，False なら else ブロックを実行する二者択一の制御構文として扱います。',
    points:[
      {title:'教材例 x=5',body:"if x>10 は False なので else へ進み，「5 は 10 以下」と表示します。"},
      {title:'二者択一',body:'if と else の両方を実行するのではなく，条件の真偽に応じてどちらか一方だけを実行します。'},
      {title:'確認問題 x=10',body:"if x<10 は False なので else へ進み，「10 は 10 以上」と表示します。"}
    ],
    code:"x = 5\nif x > 10:\n    print(x, 'は10より大きい')\nelse:\n    print(x, 'は10以下')",
    quiz:{question:'x=10，if x<10: … else: … のプログラムではどの結果になりますか。',choices:['「10は10以上」と表示','「10は10より小さい」と表示','何も表示されない','エラーが発生する'],answer:0,explanation:'教材確認問題の正解は①。10<10 は False なので else ブロックが実行されます。'},
    terms:['if-else文','True','False','else','インデント']
  });
  setSource('p11',
    '教材例は x=5 で if x>10 がFalseとなり elseから「5は10以下」。確認問題は x=10 で if x<10 がFalseとなり「10は10以上」。',
    '条件を一度だけ判定し，Trueならif側，Falseならelse側へ進む。境界値が比較演算子のどちら側に入るかを見る。',
    'x=10について x<10 はFalse。< と <= を取り違えると境界値10の分岐を誤る。',
    'x=9,10,11を if x<10 に入れて，if/elseのどちらへ進むかを並べる。'
  );

  setLesson('p12',{
    title:'if-elif-else文',
    goals:['複数条件を上から順に評価できる','最初にTrueになった分岐だけが実行されることを説明できる'],
    lead:'教材は if-elif-else 文を，複数の条件を順番に評価し，最初に True となる条件のブロックだけを実行する構文として扱います。',
    points:[
      {title:'上から順に判定',body:'if の条件が False のときにだけ次の elif を判定します。'},
      {title:'最初のTrueで決定',body:"教材例 x=12 では最初の x>10 が True なので「12 は 10 より大きい」と表示し，以降へ進みません。"},
      {title:'確認問題 x=10',body:"x<10 は False，次の x==10 が True なので「10 は 10 に等しい」と表示します。"}
    ],
    code:"x = 12\nif x > 10:\n    print(x, 'は10より大きい')\nelif x == 10:\n    print(x, 'は10に等しい')\nelse:\n    print(x, 'は10より小さい')",
    quiz:{question:'x=10 のとき if x<10 / elif x==10 / else のどこが実行されますか。',choices:['何も表示されない','elseで「10は10より大きい」','ifで「10は10より小さい」','elifで「10は10に等しい」'],answer:3,explanation:'教材確認問題の正解は④。最初の条件はFalse，elif条件がTrueなのでelifブロックが実行されます。'},
    terms:['if-elif-else文','elif','条件式','True','False']
  });
  setSource('p12',
    '教材例は x=12 で if x>10 が最初にTrue。確認問題は x=10 で if x<10 がFalse，elif x==10 がTrueとなる。',
    '上から条件を1つずつ評価し，最初のTrueに到達した時点で実行する枝が決まる。',
    '複数の条件を独立したif文のように全部判定するのではない。最初にTrueになった後のelif/elseは実行しない。',
    'x=9,10,11を確認問題の3分岐へ入れ，上からどこで判定が止まるかを矢印で追う。'
  );

  setLesson('p13',{
    title:'while文',
    goals:['while文の継続条件を毎回判定できる','条件に関係する変数の更新を追って停止時点を判断できる'],
    lead:'教材は while 文を，指定された条件式が True である間，インデントされたブロック内の処理を繰り返す制御文として扱います。',
    points:[
      {title:'教材例',body:'count=1 から while count<=5 の間，countを表示して1ずつ増やすので1,2,3,4,5を出力します。'},
      {title:'終了条件',body:'countが6になると count<=5 が False になり，ループを終了します。'},
      {title:'確認問題',body:"count<=3 の間 print('Hello') と count=count+1 を行うので，Helloは3回表示されます。"}
    ],
    code:'count = 1\nwhile count <= 5:\n    print(count)\n    count = count + 1',
    quiz:{question:"count=1，while count<=3 の中で print('Hello') の後 count=count+1 とすると，Helloは何回表示されますか。",choices:['無限に出力','3回','2回','1回'],answer:1,explanation:'教材確認問題の正解は②。count=1,2,3 の3回だけ条件がTrueで，count=4でFalseとなります。'},
    terms:['while文','ループ','条件式','True','False','更新']
  });
  setSource('p13',
    '教材例は count=1 から count<=5 の間1〜5を表示して毎回+1。確認問題は count<=3 の間Helloを3回表示する。解答は4回目の条件判定 count=4→False まで表で追う。',
    '毎回「条件判定時のcount → 条件のTrue/False → 出力 → countを+1」の順で追う。',
    '更新式を実行した後に次の条件判定へ戻る。確認問題では3回目の出力後にcount=4となり，4回目は出力せず終了する。',
    '教材解答と同じ4行の追跡表を作り，最後のFalse判定も1行として書く。'
  );

  setLesson('p14',{
    title:'論理演算子',
    goals:['and・or・not の意味を True / False で説明できる','複数の論理値を論理演算して結果を判断できる'],
    lead:'教材は論理積 and，論理和 or，否定 not を True / False の具体例で導入します。',
    points:[
      {title:'and（論理積）',body:'and の前後がともに True のとき True。教材例 True and False は False です。'},
      {title:'or（論理和）',body:'or の前後のどちらか片方でも True なら True。教材例 True or False は True です。'},
      {title:'not（否定）',body:'not は論理値を反転します。教材例 not(True) は False。確認問題 True or True は True です。'}
    ],
    code:'a = True\nb = False\nprint(a and b)\nprint(a or b)\nprint(not(a))',
    quiz:{question:'a=True，b=True のとき result=a or b の値はどれですか。',choices:['True','False','None','0'],answer:0,explanation:'教材確認問題の正解は①。orは少なくとも一方がTrueならTrueで，ここでは両方ともTrueです。'},
    terms:['論理演算子','論理積','and','論理和','or','否定','not','True','False']
  });
  setSource('p14',
    '教材は論理積and，論理和or，否定notを扱う。例は True and False→False，True or False→True，not(True)→False。確認問題は True or True→True。',
    'まずa,bをTrue/Falseへ確定し，and/orなら2値を組み合わせ，notなら1値を反転して結果を求める。',
    '教材の「1×0」「1+0」はTrue/Falseをイメージするための補助。実際の問題では各論理演算子の定義で判定する。',
    'False/False，False/True，True/False，True/True の4組についてandとorを表にし，TrueとFalseにnotを適用する。'
  );
})();