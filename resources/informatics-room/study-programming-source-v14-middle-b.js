/* 情報Ⅰ＜プログラミング編＞ v14b — 中級第25〜33講をKZC72000本文・確認問題・解答へ逐講再整合 */
(() => {
  const lessons=window.STUDY_PROGRAMMING||[];
  const source=window.PROGRAM_SOURCE_V9||{};
  const get=id=>lessons.find(x=>x.id===id);
  const setLesson=(id,patch)=>{const x=get(id);if(x)Object.assign(x,patch);};
  const setSource=(id,core,read,pitfall,drill)=>{if(!source[id])source[id]={};Object.assign(source[id],{core,read,pitfall,drill});};

  setLesson('p25',{
    title:'for文とif文の入れ子',
    goals:['forの各反復でif条件を判定する流れを追える','条件を満たす要素だけを累積処理できる'],
    lead:'教材は入れ子forで6組の (i,j) を作って i==j を判定する例と，1〜nのうち奇数だけを合計する確認問題を扱います。',
    points:[
      {title:'例題の6組',body:'i=0,1,2 と j=0,1 の全6組を順に作り，各組で i==j が True ならA，FalseならBを表示します。'},
      {title:'奇数の判定',body:'確認問題では i%2==1 が True のときだけ total=total+i とし，n=5なら1+3+5=9です。'},
      {title:'Falseでも反復は続く',body:'if条件がFalseでも for 文そのものは終わらず，次の i または j へ進みます。'}
    ],
    code:"for i in range(3):\n    for j in range(2):\n        if i == j:\n            print('A')\n        else:\n            print('B')",
    quiz:{question:'1からnまでの奇数の合計を作るとき，if i%2==1 の中で total に加える値はどれですか。',choices:['i','i+1','n','total'],answer:0,explanation:'教材確認問題の正解は①。奇数と判定された現在の i を total に加え，n=5なら9になります。'},
    terms:['for文の入れ子','if文','余り','奇数','累積']
  });
  setSource('p25','教材例は i=0..2，j=0..1 の6組で i==j を判定しA/Bを表示。確認問題は1〜nを走査し奇数 i だけ total に加える。','外側・内側の値の組と，各組でのif条件の真偽を分けて追う。確認問題では i と total の2列を作る。','if がFalseでも for は終わらず次の反復へ進む。偶数の回は total が変わらない。','例題の6組とA/B，確認問題の i=1..5 と total=1,1,4,4,9 を表にする。');

  setLesson('p26',{
    title:'最大値と最小値',
    goals:['配列先頭を暫定の最小値・最大値として使える','比較条件に応じて候補値を更新する処理を追える'],
    lead:'教材は同じ Numbers=[90,80,55,77,92] を1回走査し，例題で最小値，確認問題で最大値を求めます。',
    points:[
      {title:'最小値',body:'min_value=Numbers[0] から始め，num<min_value のときだけ min_value=num と更新します。結果は55です。'},
      {title:'最大値',body:'確認問題では max_value=Numbers[0] から始め，num>max_value のとき更新します。結果は92です。'},
      {title:'先頭を初期候補にする',body:'0などの固定値ではなく，配列に実際に含まれる先頭要素を候補にしてから比較を始めます。'}
    ],
    code:'def find_min(Numbers):\n    min_value = Numbers[0]\n    for num in Numbers:\n        if num < min_value:\n            min_value = num\n    return min_value\n\nNumbers = [90, 80, 55, 77, 92]\nfind_min(Numbers)',
    quiz:{question:'同じ配列から最大値を求めるとき，max_value を更新する if 条件はどれですか。',choices:['num > max_value','num < max_value','num == max_value','num <= max_value'],answer:0,explanation:'教材確認問題の正解は①。現在の候補より大きい num を見つけたときだけ max_value を更新します。'},
    terms:['最大値','最小値','候補値','比較','更新']
  });
  setSource('p26','教材例は Numbers=[90,80,55,77,92] の最小値55，確認問題は同じ配列の最大値92。','Numbers[0] を初期候補にし，各 num と比較して条件を満たす回だけ候補を更新する。','最小値と最大値でアルゴリズムの骨格は同じ。比較演算子 < と > の向きだけが変わる。','90,80,55,77,92を順に読み，min候補とmax候補が変わる回を印で分ける。');

  setLesson('p27',{
    title:'カウントダウン',
    goals:['whileの条件判定・表示・更新の順序を追える','境界値が表示されるかどうかを判断できる'],
    lead:'教材は count を1ずつ減らしながら，while 条件が True の間だけ表示するカウントダウンを扱います。',
    points:[
      {title:'例題',body:'count=10，while count>5 なので，10,9,8,7,6を表示したあと count=5 で条件がFalseになり終了します。'},
      {title:'確認問題',body:'count=5，while count>0 の中で count=count-1 と更新すると，5,4,3,2,1を表示します。'},
      {title:'更新後に再判定',body:'表示→1減らす→while条件へ戻る，という順序で読むと最後の値を判断できます。'}
    ],
    code:'count = 10\nwhile count > 5:\n    print(count)\n    count = count - 1',
    quiz:{question:'count=5 から 5,4,3,2,1 と表示するため，ループ末尾の count= ___ に入る式はどれですか。',choices:['count + 1','count - 1','count','1 - count'],answer:1,explanation:'教材確認問題の正解は②。各反復で count を1ずつ減らします。'},
    terms:['while','カウントダウン','条件式','更新','境界']
  });
  setSource('p27','教材例は count=10, while count>5 で10〜6を表示。確認問題は count=5, while count>0 で5〜1を表示し，更新式 count-1 を選ぶ。','毎回「条件確認→print→countを1減らす→条件へ戻る」の順で追う。','例題では5を表示しない。6を表示後にcountが5となり，次の条件がFalseになる。','条件前count・表示・更新後countの3列で例題と確認問題を追う。');

  setLesson('p28',{
    title:'while文とif文の入れ子',
    goals:['whileの反復条件とifの分岐条件を分けて読める','更新式によって反復が終了することを説明できる'],
    lead:'教材は while で値を順に動かし，各反復の中で if を使って特定の値だけ別の表示に置き換える例を扱います。',
    points:[
      {title:'例題',body:"i=1〜10を反復し，i%3==0 のとき 'Oh!'，それ以外は i を表示します。"},
      {title:'確認問題',body:"x=0〜4を反復し，x==3 のときだけ 'Three'，それ以外は x を表示するため，出力は0,1,2,Three,4です。"},
      {title:'更新を忘れない',body:'各反復の最後で i=i+1 または x=x+1 とすることで，while の条件がいずれFalseになります。'}
    ],
    code:"i = 1\nwhile i <= 10:\n    if i % 3 == 0:\n        print('Oh!')\n    else:\n        print(i)\n    i = i + 1",
    quiz:{question:"x=0，while x<5 の中で x==3 のとき 'Three'，それ以外は x を表示すると，出力はどれですか。",choices:['0,1,2,Three,4','1,2,3,4,5','0,1,2,3,4','1,2,Three,4,5'],answer:0,explanation:'教材確認問題の正解は①。x=3の回だけ Three に置き換わり，x=5ではwhile条件がFalseなので表示されません。'},
    terms:['while文の入れ子','if文','反復','分岐','更新']
  });
  setSource('p28','教材例は i=1〜10 をwhileで回し，3の倍数だけOh!。確認問題は x=0〜4 を回し，x==3だけThree。','while が反復範囲，if が各反復の出力内容を決める。最後の更新式で次の状態へ進む。','更新式を忘れると停止しない。例題の3の倍数判定と確認問題のx==3を混同しない。','例題の10出力と確認問題の5出力を順に再現する。');

  setLesson('p29',{
    title:'10進法から2進法への変換',
    goals:['2で割った余りを使う10進→2進変換を説明できる','while内の余り・文字列・商の更新を追える'],
    lead:'教材は10進整数を2で割り続け，余りを文字列の左側へつなぎ，商を次の num として更新して2進文字列を作ります。',
    points:[
      {title:'余りを求める',body:'例題 num=10 では remainder=num%2 とし，2で割った余り0または1を得ます。'},
      {title:'左側へつなぐ',body:'binary=str(remainder)+binary とするため，下位bitから得た余りを前へ付け，最終的に1010になります。'},
      {title:'商で更新',body:'確認問題 num=26 では num=num//2 として商を次の値にし，最終的に11010を得ます。'}
    ],
    code:"num = 10\nbinary = ''\nwhile num > 0:\n    remainder = num % 2\n    binary = str(remainder) + binary\n    num = num // 2\nprint(binary)",
    quiz:{question:'num=26 を2進文字列へ変換するループで，次の num に更新する式はどれですか。',choices:['num / 2','num // 2','num * 2','num % 2'],answer:1,explanation:'教材確認問題の正解は②。商が0になるまで整数商 num//2 で更新します。'},
    terms:['10進法','2進法','余り','整数商','str']
  });
  setSource('p29','教材例は num=10→1010 で remainder=num%2。確認問題は num=26→11010 で更新式 num=num//2。','各反復で num / remainder / binary / 更新後num を順に追う。','余りは下位bitから得るため，教材コードでは str(remainder)+binary と左側へ追加する。','10と26について4列の変化表を作る。');

  setLesson('p30',{
    title:'ソート（並べ替え）',
    goals:['隣接要素の比較・交換を繰り返す処理を追える','昇順と降順で比較条件が逆になることを説明できる'],
    lead:'教材は Numbers=[3,1,4,1,5] を隣り合う要素同士で比較・交換し，昇順へ並べる処理を扱います。確認問題は同じ構造を降順へ変えます。',
    points:[
      {title:'昇順の比較',body:'例題では Numbers[j]>Numbers[j+1] のとき交換し，最終的に [1,1,3,4,5] になります。'},
      {title:'比較範囲',body:'内側ループは range(len(Numbers)-i-1) とし，すでに右端へ確定した要素を次の周回では比較対象から外します。'},
      {title:'降順へ変更',body:'確認問題では比較条件だけを Numbers[j]<Numbers[j+1] に逆転し，[5,4,3,1,1] にします。'}
    ],
    code:'Numbers = [3, 1, 4, 1, 5]\nfor i in range(len(Numbers)):\n    for j in range(len(Numbers) - i - 1):\n        if Numbers[j] > Numbers[j + 1]:\n            temp = Numbers[j]\n            Numbers[j] = Numbers[j + 1]\n            Numbers[j + 1] = temp\nprint(Numbers)',
    quiz:{question:'同じ処理を降順にするため，4行目の if 条件に入るものはどれですか。',choices:['Numbers[j-1] > Numbers[j]','Numbers[j-1] < Numbers[j]','Numbers[j] > Numbers[j+1]','Numbers[j] < Numbers[j+1]'],answer:3,explanation:'教材確認問題の正解は④。左の値が右より小さいとき交換すれば，大きい値が左へ移動して降順になります。'},
    terms:['ソート','並べ替え','昇順','降順','比較','交換']
  });
  setSource('p30','教材例は Numbers=[3,1,4,1,5] を隣接比較で昇順 [1,1,3,4,5]。確認問題は比較条件を逆にして降順 [5,4,3,1,1]。','外側 i，内側 j，Numbers[j] と Numbers[j+1] の比較，交換後の配列を1周ずつ追う。','昇順・降順で二重for全体を作り直す必要はなく，教材確認問題では比較条件の向きが中心。','1周目の j=0,1,2,3 を手で追い，各比較後の配列と右端へ確定する値を書く。');

  setLesson('p31',{
    title:'配列への要素の追加',
    goals:['append()で配列末尾へ1要素を追加できる','メソッド呼び出しの括弧と文字列の引用符を正しく読める'],
    lead:'教材は Python の配列末尾へ新しい要素を追加する append() メソッドを扱います。',
    points:[
      {title:'append()',body:'例題では Numbers=[1,2,3] に Numbers.append(4) として4を末尾へ追加し，[1,2,3,4] にします。'},
      {title:'文字列の追加',body:"確認問題では Subjects=['国語','数学'] に Subjects.append('英語') とします。"},
      {title:'書式を区別',body:'append は丸括弧で値を渡します。文字列を追加する場合は引用符も必要です。'}
    ],
    code:'Numbers = [1, 2, 3]\nNumbers.append(4)\nprint(Numbers)',
    quiz:{question:"Subjects=['国語','数学'] に文字列 '英語' を末尾へ追加する書き方はどれですか。",choices:["Subjects.add('英語')","Subjects.append(英語)","Subjects.append('英語')","Subjects.insert('英語')"],answer:2,explanation:'教材確認問題の正解は③。配列末尾への追加は append() を使い，文字列は引用符で囲みます。'},
    terms:['append','配列','要素','メソッド','文字列']
  });
  setSource('p31','教材例は Numbers=[1,2,3] に4を追加。確認問題は Subjects=[国語,数学] に文字列「英語」を追加。','配列名.append(追加する値) の形を読み，追加前後の配列を比較する。','Numbers.add(4) や Numbers.append[4] ではない。文字列は引用符なしにしない。','数値配列への4の追加と，科目配列への英語の追加を並べる。');

  setLesson('p32',{
    title:'2次元配列の応用',
    goals:['2次元配列の同じ列にある対応データを組にして読める','lenで横方向の要素数を取得して反復回数へ使える'],
    lead:'教材は2次元配列の0行目と1行目を同じ列 i で参照し，科目名と点数，果物名と個数のような対応するデータを組にして表示します。',
    points:[
      {title:'横の個数を数える',body:'Score[0] には科目名が3個あるので num=len(Score[0]) とし，i=0,1,2を反復します。'},
      {title:'同じ列を組にする',body:"Score[0][i] と Score[1][i] を同じ i で参照し，'国語 85点' のように対応付けます。"},
      {title:'確認問題',body:'Fruits_and_numbers では len(Fruits_and_numbers[1])=3 とし，個数行と果物名行を同じ列で表示します。'}
    ],
    code:"Score = [\n    ['国語', '数学', '英語'],\n    [85, 92, 100]\n]\nnum = len(Score[0])\nfor i in range(num):\n    print(Score[0][i], 'の点数は', Score[1][i], '点')",
    quiz:{question:'Fruits_and_numbers の3組を全部表示するため num=len( ___ ) に入るものはどれですか。',choices:['num','Fruits_and_numbers','Fruits_and_numbers[1]','Fruits_and_numbers[1][0]'],answer:2,explanation:'教材確認問題の正解は③。Fruits_and_numbers[1] は個数の3要素を持つ行なので len(...) は3になります。'},
    terms:['2次元配列','len','行','列','対応データ']
  });
  setSource('p32','教材例は Score[0]=[国語,数学,英語]，Score[1]=[85,92,100]。確認問題は果物名と個数の2行を同じ列で対応させる。','num=len(Score[0]) のように横方向の組数を得て，i=0,1,2について両方の行の同じ列を読む。','len(Score) は行数2であり，横の組数3ではない。何を数えたいのかを先に決める。','i=0,1,2で Score[0][i] と Score[1][i]，確認問題でも2行の対応を表にする。');

  setLesson('p33',{
    title:'辞書型',
    goals:['辞書型のキーと値の対応を説明できる','キーを [] に指定して対応する値を取り出せる'],
    lead:'教材は辞書型をキーと値の組として扱い，位置番号ではなくキーを指定して値を取り出す方法を確認します。',
    points:[
      {title:'キーと値',body:"教材例 person では 'name'→'太郎'，'age'→20，'country'→'日本' の対応を持ちます。"},
      {title:'キーで取り出す',body:"print(person['name']) とすると，キー 'name' に対応する値 '太郎' が表示されます。"},
      {title:'値を計算に使う',body:"確認問題では fruits['apple']=100 と fruits['cherry']=300 を加え，total=400を表示します。"}
    ],
    code:"person = {\n    'name': '太郎',\n    'age': 20,\n    'country': '日本'\n}\nprint(person['name'])",
    quiz:{question:"fruits={'apple':100,'banana':200,'cherry':300} のとき fruits['apple']+fruits['cherry'] の結果はどれですか。",choices:['300','400','500','600'],answer:1,explanation:'教材確認問題の正解は②。キー apple と cherry に対応する値100と300を取り出して加えるため400です。'},
    terms:['辞書型','キー','値']
  });
  setSource('p33','教材例は person[\'name\']→太郎。確認問題は fruits[\'apple\']+fruits[\'cherry\']=100+300=400。','配列の位置番号ではなく，辞書では対応するキーを [] に指定して値を取り出す。','キーと値を逆に読まない。教材の範囲では辞書型のキー参照に集中し，JSONなど別概念へ広げない。','person と fruits をキー列・値列の2列表に直して指定キーの値を答える。');
})();
