/* 情報Ⅰ v12-f — プログラミング基礎概念の高精細教材図版 */
(() => {
  const K=window.SCIENTIFIC_V12;if(!K)return;const {register}=K;

  register('b6-2',{
    title:'プログラミングの3基本処理：順次・反復・分岐を状態変化で読む',height:760,
    caption:'原教材のmicro:bit例を、単なる記号ではなく「どの順に実行されるか」「どこで戻るか」「どこで分かれるか」で整理する。',
    question:'「変数aが5以上になるまでaに1を足し続ける」は、3基本処理のどれですか。',
    answer:'反復処理。条件を満たすまで同じ更新を繰り返すため。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'プログラミングの基本','順次・反復・分岐は、どんなプログラムでも繰り返し現れる基本構造。変数の値がどう変わるかとセットで読む。');
      const cols=[['順次処理',45,C.blue],['反復処理',425,C.teal],['分岐処理',805,C.orange]];
      cols.forEach(([title,x,col])=>{rr(ctx,x,135,330,470,'#fff','#d7e1e6',12);text(ctx,title,x+20,175,18,col,700);});
      // 順次
      box(ctx,120,220,180,54,'Aボタンを押す','');box(ctx,120,310,180,54,'ハートを表示','');box(ctx,120,400,180,54,'音を鳴らす','');arrow(ctx,210,274,210,310,C.blue);arrow(ctx,210,364,210,400,C.blue);text(ctx,'上から順に1回ずつ',210,515,11,C.gray,700,'center');
      // 反復
      box(ctx,505,210,170,52,'i = 0','初期値');rr(ctx,530,305,120,72,'#fff8f0','#e3d2bf',8);text(ctx,'i ≤ 2 ?',590,340,13,C.navy,700,'center','middle');box(ctx,500,425,180,56,'iを表示','');box(ctx,500,510,180,56,'i = i + 1','');arrow(ctx,590,262,590,305,C.teal);arrow(ctx,590,377,590,425,C.teal);arrow(ctx,590,481,590,510,C.teal);arrow(ctx,500,538,455,538,C.teal);arrow(ctx,455,538,455,340,C.teal);arrow(ctx,455,340,530,340,C.teal);text(ctx,'条件がTrueの間戻る',590,590,11,C.gray,700,'center');
      // 分岐
      rr(ctx,905,245,130,74,'#fff8f0','#e3d2bf',8);text(ctx,'a ≥ 10 ?',970,282,13,C.navy,700,'center','middle');box(ctx,835,405,120,58,'合格','True側',{fill:'#eef6fa'});box(ctx,995,405,120,58,'不合格','False側',{fill:'#fff'});arrow(ctx,930,319,895,405,C.orange);arrow(ctx,1010,319,1055,405,C.orange);text(ctx,'実行する枝は1つ',970,515,11,C.gray,700,'center');
      rr(ctx,45,645,1090,55,'#f5f9fb','#d5e2e8',9);text(ctx,'変数',70,673,11,C.blue,700);wrap(ctx,'データを記憶するメモリ領域。代入によって値が更新され、その値が次の処理や条件判定に使われる。',125,660,960,20,11,C.gray,400);
    }
  });

  register('b6-3',{
    title:'無線ネットワークプログラミング：group番号と双方向通信',height:740,
    caption:'micro:bitでは同じ無線groupに属する端末同士で通信する。教材では0〜255のgroup番号、玄関チャイム、レストランのテーブル別呼び出しを扱う。',
    question:'送信側と受信側でgroup番号が異なると、同じ場所にあっても通信できないのはなぜですか。',
    answer:'無線通信ではgroup番号が通信相手のグループを識別する条件になっており、異なるgroupのデータを受信対象にしないため。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head}=k;head(ctx,'ネットワークを利用したプログラミング','無線では「誰でも同じ電波を受ける」ではなく、group番号をそろえて同じ論理ネットワーク内でデータをやり取りする。');
      text(ctx,'A　玄関チャイム',45,120,16,C.navy,700);box(ctx,45,160,250,110,'玄関のmicro:bit','group = 192\nAボタン → メッセージ送信',{fill:'#eef6fa',stroke:'#bfd1db'});box(ctx,430,160,280,110,'リビングのmicro:bit','group = 192\n受信 → チャイム + ♥ 表示',{fill:'#f8fafb'});arrow(ctx,295,215,430,215,C.blue,3);text(ctx,'同じgroup',362,195,10,C.blue,700,'center');
      box(ctx,835,160,300,110,'別groupのmicro:bit','group = 12\n192の通信は受信しない',{fill:'#fff8f0',stroke:'#e3d2bf'});line(ctx,710,215,835,215,C.orange,2,[8,6]);text(ctx,'groupが違う',772,195,10,C.orange,700,'center');
      text(ctx,'B　テーブル別・双方向通信',45,340,16,C.navy,700);['Table 1','Table 2','Table 3'].forEach((s,i)=>{box(ctx,45+i*205,390,170,88,s,'Aボタンで自分の番号を送信',{fill:'#fff'});arrow(ctx,215+i*205,434,690,434,C.blue,1.5);});box(ctx,690,380,210,108,'店員側受信機','受信したテーブル番号を表示\nメロディを鳴らす',{fill:'#eef6fa'});box(ctx,950,380,185,108,'返信','PLEASE WAIT\nを送信',{fill:'#f4f9f7'});arrow(ctx,900,434,950,434,C.teal);arrow(ctx,1042,488,1042,555,C.teal);arrow(ctx,1042,555,130,555,C.teal);text(ctx,'返信を各テーブル側で受信',430,582,11,C.teal,700,'center');
      rr(ctx,45,635,1090,54,'#f5f9fb','#d5e2e8',9);text(ctx,'POINT',70,662,11,C.blue,700);wrap(ctx,'group番号は0〜255。通信の「送信」「受信」「返信」を別々のイベントとして考える。',135,649,960,20,11,C.gray,400);
    }
  });

  register('b6-4',{
    title:'変数の型と関数：値・型・変換・演算結果を対応させる',height:720,
    caption:'整数・浮動小数点・文字列・Boolを混同すると、連結や計算でエラーが起きる。int/str/floatは「値の型を変える関数」として読む。',
    question:'print("年齢" + 15) がそのままではエラーになるのはなぜですか。',
    answer:'"年齢"はstr型、15はint型で、異なる型をそのまま+で連結できないため。str(15)のように型をそろえる。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,table}=k;head(ctx,'変数の型と関数','同じ見た目の「15」でも、整数15と文字列"15"ではコンピュータ上の扱いが違う。');
      text(ctx,'A　代表的な型',45,120,16,C.navy,700);const rows=[['int','15','整数として計算'],['float','3.14','小数を含む数値'],['str','"15"','文字の並び'],['bool','True / False','条件判定の結果']];table(ctx,45,155,620,220,['型','例','主な役割'],rows,{fs:10,headFill:'#eff5f8'});
      text(ctx,'B　型変換',725,120,16,C.navy,700);box(ctx,725,160,160,64,'"15"','str',{fill:'#fff'});box(ctx,965,160,160,64,'15','int',{fill:'#eef6fa'});arrow(ctx,885,192,965,192,C.blue);text(ctx,'int()',925,175,10,C.blue,700,'center');box(ctx,725,280,160,64,'15','int',{fill:'#eef6fa'});box(ctx,965,280,160,64,'"15"','str',{fill:'#fff'});arrow(ctx,885,312,965,312,C.teal);text(ctx,'str()',925,295,10,C.teal,700,'center');
      text(ctx,'C　算術演算子',45,455,16,C.navy,700);const ops=[['+','加算'],['-','減算'],['*','乗算'],['/','除算'],['//','商'],['%','余り'],['**','累乗']];ops.forEach((o,i)=>box(ctx,45+i*150,490,130,68,o[0],o[1],{fill:i===4||i===5?'#fff8f0':'#fff'}));
      rr(ctx,45,605,1080,60,'#f5f9fb','#d5e2e8',9);text(ctx,'例',70,635,11,C.orange,700);wrap(ctx,'10 // 3 = 3、10 % 3 = 1。商と余りは、回数・桁・周期を扱うプログラムでも頻出する。',115,620,970,20,11,C.gray,400);
    }
  });

  register('b6-5',{
    title:'モジュール・for文・if文：外部機能と制御構造をコードの位置で読む',height:760,
    caption:'importで機能を取り込み、forで反復、if/elif/elseで分岐する。比較演算子の結果はTrue/False。',
    question:'range(1,11) が1〜10を生成し、11を含まない点が重要なのはなぜですか。',
    answer:'Pythonのrangeは終了値を含まないため。range(1,11)は1以上11未満、つまり1〜10を生成する。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,table}=k;head(ctx,'モジュールとfor文・if文','コードの各行を「機能を取り込む」「繰り返す」「条件で選ぶ」に分けると、長いプログラムも読みやすい。');
      text(ctx,'A　import：必要な道具を読み込む',45,120,16,C.navy,700);const mods=[['random','乱数','random.randint(1,10)'],['math','数学','math.pi / math.sqrt(3)'],['json','JSON操作','json.loads()'],['pandas','表データ','read_csv()'],['matplotlib','グラフ','plot()']];table(ctx,45,155,1090,180,['モジュール','役割','例'],mods,{fs:10,headFill:'#eff5f8'});
      text(ctx,'B　for：回数・要素を順に進める',45,385,16,C.navy,700);box(ctx,45,420,345,105,'for i in range(1, 11):','i = 1,2,3,...,10\n11は含まれない',{fill:'#eef6fa',stroke:'#bfd1db'});arrow(ctx,390,472,470,472,C.blue);['1','2','3','…','10'].forEach((s,i)=>{rr(ctx,490+i*75,445,55,55,'#fff','#d6e1e6',8);text(ctx,s,517+i*75,473,13,C.navy,700,'center','middle');});
      text(ctx,'C　if / elif / else：上から条件を判定',45,585,16,C.navy,700);rr(ctx,45,620,1090,84,'#f8fafb','#d7e1e6',10);text(ctx,'age ≤ 12',100,648,11,C.blue,700);text(ctx,'→ 小学生',215,648,11,C.dark,700);text(ctx,'age ≤ 15',390,648,11,C.teal,700);text(ctx,'→ 中学生',505,648,11,C.dark,700);text(ctx,'それ以外',675,648,11,C.orange,700);text(ctx,'→ 高校生',790,648,11,C.dark,700);wrap(ctx,'elifは「前の条件が成立しなかった場合」にだけ次を判定する。',900,635,210,19,10,C.gray,400);
    }
  });

  register('b6-7',{
    title:'論理演算子と関数：条件を組み合わせ、処理を名前付きで再利用する',height:740,
    caption:'and/or/notはBool値を組み合わせる。関数はdefで定義し、引数を受け取り、returnで戻り値を呼び出し元へ返す。',
    question:'x=3のとき「x>2 and x<4」がTrueになる理由を、2つの条件に分けて説明してください。',
    answer:'x>2がTrue、x<4もTrueで、andは両方がTrueのときだけTrueになるため。',
    draw(ctx,k){const {C,text,wrap,rr,box,line,arrow,head,table}=k;head(ctx,'論理演算子と関数','複雑な条件を小さなTrue/Falseへ分け、繰り返し使う処理は関数へまとめる。');
      text(ctx,'A　and / or / not',45,120,16,C.navy,700);const rows=[['True','True','True','True'],['True','False','False','True'],['False','True','False','True'],['False','False','False','False']];table(ctx,45,155,560,220,['A','B','A and B','A or B'],rows,{fs:10,headFill:'#eff5f8'});box(ctx,650,155,225,100,'not True','→ False',{fill:'#fff8f0'});box(ctx,910,155,225,100,'not False','→ True',{fill:'#f4f9f7'});rr(ctx,650,290,485,85,'#f8fafb','#d7e1e6',8);text(ctx,'比較演算子',675,320,11,C.blue,700);wrap(ctx,'==  !=  >  <  >=  <= の結果もTrue / False。',775,306,330,20,11,C.gray,400);
      text(ctx,'B　関数：入力 → 処理 → 戻り値',45,445,16,C.navy,700);box(ctx,45,485,250,105,'呼び出し','baigaeshi(3)\n引数 3',{fill:'#eef6fa'});box(ctx,430,485,320,105,'def baigaeshi(x):','y = 2 * x\nreturn y',{fill:'#f8fafb'});box(ctx,890,485,245,105,'戻り値','6',{fill:'#f4f9f7'});arrow(ctx,295,538,430,538,C.blue);arrow(ctx,750,538,890,538,C.teal);text(ctx,'引数',360,518,10,C.blue,700,'center');text(ctx,'return',820,518,10,C.teal,700,'center');
      rr(ctx,45,635,1090,58,'#f5f9fb','#d5e2e8',9);text(ctx,'POINT',70,664,11,C.blue,700);wrap(ctx,'「関数名」と「変数名」を混同しない。関数は処理のまとまり、引数は関数内で受け取る値、戻り値は呼び出し元へ返す結果。',135,650,960,20,11,C.gray,400);
    }
  });
})();